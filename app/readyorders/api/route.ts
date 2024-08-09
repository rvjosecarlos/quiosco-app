import { prismaClient } from "@/app/src/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(){
    try{
        const readyOrders = await prismaClient.order.findMany({
            where: {
                status: true
            },
            take: 6,
            orderBy: {
                orderReadyAt: "desc"
            },
            include: {
                orderProducts: {
                    include: {
                        product: true
                    }
                }
            }
        });
        return Response.json(readyOrders);
    }
    catch(error){
        console.log(error);
        return Response.json([]);
    }
};