import { prismaClient } from "@/app/src/lib/prisma";
import { SearchForm } from "@/app/src/schema";
import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/UI/Heading";

type ResultSearchPageProps = {
    searchParams: SearchForm
}

async function getSearchProducts( search: string ){
    try{
        const products = await prismaClient.products.findMany({
            include: {
                category: true
            },
            where: {
                name: {
                    contains: search,
                    mode: 'insensitive'
                }
            }
        });
        return products;
    }
    catch(error){
        console.log(error);
        return []
    };
};

export default async function ResultSearchPage({ searchParams }: ResultSearchPageProps){
    const search = searchParams.search!;
    const products = await getSearchProducts(search);
    return(
        <>
            <Heading>Resultados de búsqueda: {search}</Heading>
            <div className="flex justify-end">
                <ProductSearchForm />
            </div>
            <ProductTable 
                products={products}
            />
        </>
    );
}