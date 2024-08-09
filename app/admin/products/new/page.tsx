import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";
import Heading from "@/components/UI/Heading";

export default function CreateProductPage(){
    return(
        <>
            <Heading>Nuevo Producto</Heading>
            <div className=" bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
                <AddProductForm>
                    <ProductForm />
                </AddProductForm>
            </div>
        </>
    );
}