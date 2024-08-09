import { prismaClient } from "@/app/src/lib/prisma";
import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/UI/Heading";
import { Category } from "@prisma/client";

const getProducts = async (categoria: Category['slug']) => {
    const productos = await prismaClient.products.findMany({
        where: {
            category: {
                slug: categoria
            }
        }
    });
    return productos;
}

export default async function OrderPage({ params }: { params: { category: Category['slug'] } }){
    const productos = await getProducts(params.category);
    return (
        <>
            <Heading>Elige y personaliza tu pedido a continuación:</Heading>
            <div className=" grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start">            
                {
                    productos.map( producto => <ProductCard key={producto.id} producto={producto} /> )
                }
            </div>
        </>
    );
};