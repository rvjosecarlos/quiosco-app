import { Order, OrderProducts, Products } from "@prisma/client";

export type OrderItem = Pick<Products, 'id' | 'name' | 'price'> & {
    quantity: number,
    subtotal: number
};

export type OrderWithProducts = Order & {
    orderProducts: ( OrderProducts & {
        product: Products
    })[]
};