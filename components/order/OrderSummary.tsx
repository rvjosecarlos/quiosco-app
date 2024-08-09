"use client"
import { useStore } from "@/app/src/store";
import { ProductDetails } from "./ProductDetails";
import React, { useMemo } from "react";
import { formatCurrency } from "@/app/src/utils";
import { createOrder } from "@/actions/create-order-action"; 
import { orderSchema } from "@/app/src/schema";
import { toast } from "react-toastify";

export default function OrderSummary(){
    const order = useStore( state => state.order );
    const total = useMemo( () => order.reduce(( total, product ) => total + product.subtotal, 0), [order]);
    const clearOrder = useStore( state => state.clearOrder );

    const handleOrderSubmit = async (formData: FormData) => {
        const data = {
            name: formData.get('name'),
            total,
            order
        };
        const result = orderSchema.safeParse(data);
        if( !result.success ){
            result.error.issues.forEach( problema => toast.error(problema.message) );
            return;
        };
        const response = await createOrder(result.data);
        if( response && response.errors ){
            response.errors.forEach( problema => toast.error(problema.message));
            return;
        }
        toast.success(response.success);
        clearOrder();
    }

    return(
        <aside className="lg:h-screen lg:overflow-y-scroll md: w-64 lg:w-96 p-5">
            <h1 className="text-4xl text-center font-black">Mi orden</h1>
            {
                order.length === 0 ? 
                    <p className="text-center my-10">La orden esta vacía</p>                    
                :
                    <div className="mt-5">
                        {
                            order.map( item => <ProductDetails key={item.id} item={item}/>)
                        }
                        <p className="text-2xl mt-20 text-center">
                            Total a pagar: {' '}
                            <span className="font-bold text-2xl">{ formatCurrency(total) }</span>
                        </p>
                        <form 
                            action={handleOrderSubmit}
                            className="mt-5 space-y-5"
                        >
                            <input 
                                type="text"
                                name="name"
                                className="w-full p-3"
                                placeholder="Nombre"                 
                            />
                            <input 
                                type="submit" 
                                value="Confirmar orden"
                                className="w-full bg-black p-3 text-white font-bold uppercase hover:bg-amber-600 transition-colors cursor-pointer"
                            />
                        </form>
                    </div>
            }      
        </aside>
    );
};