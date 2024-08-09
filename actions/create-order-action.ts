"use server"
import { prismaClient } from "@/app/src/lib/prisma";
import { orderSchema } from "@/app/src/schema";

export async function createOrder( data: unknown ){
    const result = orderSchema.safeParse(data);
    if( !result.success ){
        return {
            errors: result.error.issues
        }
    };
    try{
        await prismaClient.order.create({
            data: {
                name: result.data.name,
                total: result.data.total,
                orderProducts: {
                    create: result.data.order.map( producto => ({ 
                        productId: producto.id, 
                        quantity: producto.quantity 
                    }))
                }
            }
        });
        return {
            success: 'Orden confirmada'
        }
    }
    catch(error){
        console.log(error);
        return {
            errors: [{ message: 'Error al guardar la orden'}]
        }
    }
};