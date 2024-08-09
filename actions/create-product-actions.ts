"use server";
import { prismaClient } from "@/app/src/lib/prisma";
import { ProductSchema } from "@/app/src/schema";

export async function createProduct(formData: unknown){
    try{
        const result = ProductSchema.safeParse(formData);
        if( !result.success ){
            return {
                error: 'Error en los datos de formulario'
            }
        };
        const { name, price, urlImage: image, categoryId } = result.data;
        await prismaClient.products.create({
            data:{
                name,
                price,
                image,
                categoryId
            }
        });
        return {
            success: 'Producto agregado'
        }
    }
    catch(error){
        console.log(error);
        return {
            error: 'Error al agregar el producto'
        }
    }
};