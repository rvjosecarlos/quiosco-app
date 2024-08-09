"use client";
import { ProductSchema } from "@/app/src/schema";
import { toast } from "react-toastify";
import ImageUpload from "./ImageUpload";
import { createProduct } from "@/actions/create-product-actions";
import { useRouter } from "next/navigation";

export default function AddProductForm({children}: {children: React.ReactNode}){
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        const data = {
            name: formData.get('name'),
            price: formData.get('price'),
            categoryId: formData.get('categoryId'),
            urlImage: formData.get('imageUrl')
        };
        const result = ProductSchema.safeParse(data);
        if( !result.success ){
            result.error.issues.forEach( issue => toast.error(issue.message) );
            return;
        };
        
        const res = await createProduct(result.data);
        if( res.error ){
            toast.error(res.error);
            return;
        };

        toast.success(res.success);
        router.push('/admin/products');
    };

    return(
        <form 
            action={handleSubmit}
            className=" space-y-5"
        >
            { children }
            <ImageUpload />
            <input type="submit" 
                value="Registrar Producto"
                className=" bg-blue-700 uppercase text-white px-3 py-2 w-full font-bold cursor-pointer"
            />
        </form>
    );
};