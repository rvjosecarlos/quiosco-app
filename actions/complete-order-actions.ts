"use server"
import { prismaClient } from "@/app/src/lib/prisma";
import { OrderIdSchema } from "@/app/src/schema";
import { revalidatePath } from "next/cache";

export async function completeOrder( formData: FormData ){
    try{
        const orderId = formData.get('orderId')!;
        const result = OrderIdSchema.safeParse({orderId});
        if( result.success ){
            await prismaClient.order.update({
                where: {
                    id: result.data.orderId
                },
                data: {
                    status: true,
                    orderReadyAt: new Date()
                }
            });
            revalidatePath('/admin/orders');
        }
    }
    catch(error){
        console.log(error);
    }
};