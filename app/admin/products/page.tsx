import { prismaClient } from "@/app/src/lib/prisma";
import ProductPagination from "@/components/products/ProductPagination";
import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/UI/Heading";
import Link from "next/link";

async function getProductsCount() {
        return await prismaClient.products.count();
};

async function getProducts(page: number, skip: number ){
    try{
        const productList = await prismaClient.products.findMany({
            take: page,
            skip,
            include: {
                category: true
            }
        });
        return productList;
    }
    catch(error){
        console.log(error);
        return [];
    }
};

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>;

export default async function ProductsPage({searchParams}: { searchParams: { page: string } }){

    const page = +searchParams.page && +searchParams.page > 0 ? +searchParams.page : 1;
    const take = 10;
    const skip = ( page - 1 ) * 10;

    const productsData = getProducts(take, skip);
    const productsCountData = getProductsCount();
    const [ productList, productsCount ] = await Promise.all([productsData, productsCountData]);

    return(
        <>
            <Heading>Admintrar productos</Heading>
            <div className="flex items-center justify-between">
                <Link
                    href={'/admin/products/new'}
                    className="bg-amber-500 py-3 px-5 font-bold"
                >
                    Crear producto
                </Link>
                <ProductSearchForm />
            </div>
            <ProductTable 
                products={productList}
            />
            <ProductPagination 
                currentPage={page}
                totalProducts={productsCount}
                take={take}
            />
        </>
    )
}