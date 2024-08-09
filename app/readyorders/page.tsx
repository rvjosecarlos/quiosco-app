"use client"
import useSWR from "swr";
import Logo from "@/components/UI/Logo";
import { OrderWithProducts } from "../src/types";

export default function ReadyOrdersPage(){
    const url = '/readyorders/api';
    const fetcher = () => fetch(url).then( result => result.json() ).then( res => res );
    const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
        refreshInterval: 30000
    });

    if(isLoading) return <p>Cargando...</p>
    if(data) return(
        <>
            <h1 className="text-5xl font-black text-center mt-10">Ordenes listas</h1>
            <Logo />
            <div className="p-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    data.length ? 
                        data.map( orderReady => 
                            <div
                                key={orderReady.id}
                            >
                                <div 
                                    className="bg-white rounded-md shadow p-5"
                                >
                                    <p className="text-lg">Nombre: <span className="text-2xl font-bold">{ orderReady.name }</span></p>
                                    <ul className="border-t border-slate-300 mt-5">
                                        {
                                            orderReady.orderProducts.map( product => 
                                                <li 
                                                    className="mt-5"
                                                    key={product.id}
                                                >
                                                    <span className="font-black">{product.quantity}{' '}</span>{product.product.name}
                                                </li>
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                        )
                    :
                        <p>No hay ordenes listas</p>
                }
            </div>
        </>
    );
}