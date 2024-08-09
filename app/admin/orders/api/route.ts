import { prismaClient } from "@/app/src/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(){
    try{
        const pendingOrders = await prismaClient.order.findMany({
            where: {
                status: false
            },
            include: {
                orderProducts: {
                    include: {
                        product: true
                    }
                }
            }
        });
        return Response.json(pendingOrders);
    }
    catch( error ){
        console.log(error);
        return Response.json([]);
    }
}