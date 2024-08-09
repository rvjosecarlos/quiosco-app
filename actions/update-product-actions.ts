"use server"
import { prismaClient } from "@/app/src/lib/prisma";
import { Products } from "@prisma/client";
import { revalidatePath } from "next/cache";


export default async function updateProduct( data: Products ){
    try{
        await prismaClient.products.update({
            where:{
                id: data.id
            },
            data
        })
        revalidatePath('admin/products');
        return {
            success: 'Producto actualizado'
        }
    }
    catch(error){
        console.log(error);
        return {
            error: 'Error al actualizar el producto'
        }
    }
}