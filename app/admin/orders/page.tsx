"use client"
import useSWR from "swr";
import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/UI/Heading";
import { OrderWithProducts } from "@/app/src/types";


export default function OrdersPage(){
    const url = '/admin/orders/api';
    const fetcher = () => fetch(url).then( result => result.json() ).then( res => res );
    const { data, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
        refreshInterval: 30000
    });

    if(isLoading) return <p>Cargando...</p>
    if(data) return (
        <>
            <Heading>Administrar Órdenes</Heading>
            { data.length ? 
                <div className=" grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
                    { 
                        data.map( orden => 
                            <div key={orden.id}>
                                <OrderCard 
                                    order={orden}
                                />
                            </div>
                        )                    
                    }
                </div>
                :
                <p className="text-xl font to-black text-center">No hay órdenes pendientes</p>
            }
        </>
    )
};