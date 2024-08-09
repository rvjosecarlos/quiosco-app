import { create } from "zustand";
import { OrderItem } from "./types";
import { Products } from "@prisma/client";

interface Store {
    order: OrderItem[]
    addProduct: (product: Products) => void
    increaseQuantity: ( id: Products['id'] ) => void
    decreaseQuantity: ( id: Products['id'] ) => void
    deleteProduct: ( id: Products['id'] ) => void
    clearOrder: () => void
};

export const useStore = create<Store>((set, get) => ({
    order: [],
    addProduct: (product) => {
        let newOrder: OrderItem[] = [];
        if( get().order.find( orderProduct => orderProduct.id === product.id ) ){
            newOrder = get().order.map( orderProduct => orderProduct.id === product.id && orderProduct.quantity < 5 ? {
                        ...orderProduct,
                        quantity: orderProduct.quantity + 1,
                        subtotal: orderProduct.price * ( orderProduct.quantity + 1 )
                    }
                :
                    orderProduct);
        }
        else{
            const { id, price, name } = product
            newOrder = [ ...get().order, {
                id,
                price,
                name,
                quantity: 1,
                subtotal: price
            }]
        }
        set({ order: newOrder });
    },
    increaseQuantity: (id) => {
        console.log('Se incrementa');
        set( state => ({
            ...state,
            order: state.order.map( product => product.id === id ? {
                ...product,
                quantity: product.quantity + 1,
                subtotal: product.price * (product.quantity + 1)
            } 
            :
            product
        )
        }));
    },
    decreaseQuantity: (id) => {
        set( state => ({
            order: state.order.map( product => product.id === id ? {
                ...product,
                quantity: product.quantity - 1,
                subtotal: product.price * ( product.quantity - 1 )
            }
            :
            product
        )
        }));
    },
    deleteProduct: (id) => {
        set( state => ({
            order: state.order.filter( product => product.id !== id )
        }));
    },
    clearOrder: () => set({ order: [] })
}));