"use client";
import { ProductSchema } from "@/app/src/schema";
import { toast } from "react-toastify";
import ImageUpload from "./ImageUpload";
import { createProduct } from "@/actions/create-product-actions";
import { useParams, useRouter } from "next/navigation";
import { Products } from "@prisma/client";
import updateProduct from "@/actions/update-product-actions";

export default function EditProductForm({children, image}: {children: React.ReactNode, image: Products['image']}){
    const router = useRouter();
    const params = useParams();
    const productId = params.productId

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
        
        const newProduct: Products = {
            id: +productId,
            name: result.data.name,
            price: result.data.price,
            categoryId: result.data.categoryId,
            image: result.data.urlImage
        };
        const res = await updateProduct(newProduct);
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
            <ImageUpload 
                image={image}
            />
            <input type="submit" 
                value="Registrar Producto"
                className=" bg-blue-700 uppercase text-white px-3 py-2 w-full font-bold cursor-pointer"
            />
        </form>
    );
};