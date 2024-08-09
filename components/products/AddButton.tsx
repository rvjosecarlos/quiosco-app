"use client"
import { useStore } from "@/app/src/store";
import { Products } from "@prisma/client";

type AddButtonProps = {
    product: Products
};

export default function AddButton({product}: AddButtonProps){
    const addProduct = useStore( state => state.addProduct );

    return(
        <button
            type="button"
            className=" bg-indigo-700 hover:bg-indigo-900 p-3 uppercase text-white font-bold transition-colors cursor-pointer mt-5 w-full"
            onClick={() => addProduct(product)}
        >
            Agregar
        </button>
    );
};