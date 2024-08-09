"use client"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { SearchFormSchema } from "@/app/src/schema";


export default function ProductSearchForm(){

    const router = useRouter();

    const handleSubmitForm = (formData: FormData) => {
        const searchData = formData.get('search');
        const result = SearchFormSchema.safeParse({search: searchData});
        if( !result.success ){
            result.error.issues.forEach( issue => toast.error(issue.message) );
            return;
        };
        router.push(`/admin/products/search?search=${result.data.search}`);
    };

    return (
        <form action={handleSubmitForm}>
            <input 
                type="text"
                placeholder="Buscar Producto"
                className="p-1 shadow-sm"
                name="search"
            />
            <input 
                type="submit" 
                value="Buscar"
                className="bg-blue-700 py-1 px-2 text-white shadow-sm cursor-pointer hover:bg-blue-900"
            />
        </form>
    );
}