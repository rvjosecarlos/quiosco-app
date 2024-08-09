import Link from "next/link";

export default function ProductPagination({ currentPage, totalProducts, take }: { currentPage: number, totalProducts: number, take: number }){
    const nextPage = currentPage + 1;
    const previousPage = currentPage - 1;
    const totalPaginas = Math.ceil(totalProducts/take)
    const pages = Array.from({ length: totalPaginas }, (v, i) => i + 1 );
    return(
        <nav className="flex justify-center mt-10">
            <Link
                href={currentPage > 1 ? `/admin/products?page=${previousPage}` : '' }
                className=" font-black  text-lg bg-white px-5 py-3 border border-gray-100 shadow-sm hover:bg-amber-400 transition-colors"
            >
                &#5130;
            </Link>
            {
                pages.map( page => 
                    <>
                        <Link
                            key={page}
                            href={`/admin/products?page=${page}`}
                            className={`${currentPage === page ? 'bg-amber-300 font-bold' : 'bg-white'} px-5 py-3 border border-gray-100 shadow-sm hover:bg-amber-400 transition-colors`}
                        >
                            {page}
                        </Link>
                    </>
                )
            }      
            <Link
                href={totalPaginas !== currentPage ? `/admin/products?page=${nextPage}` : '' }
                className=" font-black text-lg bg-white px-5 py-3 border border-gray-100 shadow-sm hover:bg-amber-400 transition-colors"
            >
                &#5125;
            </Link>
        </nav>
    );
}