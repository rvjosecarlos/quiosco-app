import { z } from "zod";

export const orderSchema = z.object({
    name: z.string().min(1, 'Debe especificar un nombre'),
    total: z.number().min(1, 'Agregue al menos un producto a la orden'),
    order: z.array(z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        subtotal: z.number()
    }))
});

export const OrderIdSchema = z.object({
    orderId: z.string()
                .transform( value => parseInt(value) )
                .refine( value => value > 0, { message: 'Hay errores' } )
})

export const SearchFormSchema = z.object({
    search: z.string()
                .trim()
                .min(1, { message: 'La búsqueda no puede ir vacía' })
});

export type SearchForm = z.infer<typeof SearchFormSchema>;

export const ProductSchema = z.object({
    name: z.string()
        .trim()
        .min(1, { message: 'El Nombre del Producto no puede ir vacio'}),
    price: z.string()
        .trim()
        .transform((value) => parseFloat(value)) 
        .refine((value) => value > 0, { message: 'Precio no válido' })
        .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
    categoryId: z.string()
        .trim()
        .transform((value) => parseInt(value)) 
        .refine((value) => value > 0, { message: 'La Categoría es Obligatoria' })
        .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
    urlImage: z.string()
        .min(1, { message: 'Debe establecer una imagen' })
});