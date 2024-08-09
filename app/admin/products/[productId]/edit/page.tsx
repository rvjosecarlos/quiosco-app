import { prismaClient } from "@/app/src/lib/prisma";
import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import BackButton from "@/components/UI/BackButton";
import Heading from "@/components/UI/Heading";
import { notFound } from "next/navigation";

async function getUniqueProduct( id: number ){
    try{
        const product = await prismaClient.products.findUnique({
            where: {
                id
            }
        });
        console.log('Aqui esta el product' + product?.categoryId);
        if( !product ){
            notFound(); // notFound() lanza una excepcion por esta razon se debe volver a llamar en el catch
        }
        return product;
    }
    catch(error){
        console.log(error);
        notFound();
    }
}

export default async function EditProduct({ params }: { params: {productId: string }}){
    const product = await getUniqueProduct(+params.productId);

    return(
        <>
            <Heading>Editar Producto</Heading>
            <BackButton />
            <div className=" bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
                <EditProductForm
                    image={product.image}
                >
                    <ProductForm 
                        product={product}
                    />
                </EditProductForm>
            </div>
        </>
    );
}