import { completeOrder } from "@/actions/complete-order-actions"
import { OrderWithProducts } from "@/app/src/types"
import { formatCurrency } from "@/app/src/utils"

type OrderCardProps = {
    order: OrderWithProducts
}

export default function OrderCard({ order }: OrderCardProps) {

    return (
        <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6  lg:mt-0 lg:p-8 space-y-4 shadow-lg"
        >
            <p className='text-2xl font-medium text-gray-900'>Cliente: { order.name }</p>
            <p className='text-lg font-medium text-gray-900'>Productos Ordenados:</p>
            <dl className="mt-6 space-y-4">
                {
                    order.orderProducts.map( producto => 
                        <div key={producto.id} className="flex gap-5">
                            <dt className="font-black text-2xl">{producto.quantity}</dt>
                            <dd>{producto.product.name}</dd>
                        </div>
                    )
                }
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-900">Total a Pagar:</dt>
                    <dd className="text-base font-medium text-gray-900">{formatCurrency(order.total)}</dd>
                </div>
            </dl>

            <form
                action={completeOrder}
            >
                <input 
                    type="hidden"
                    value={order.id}
                    name="orderId" 
                />
                <input
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                    value='Marcar Orden Completada'
                />
            </form>
        </section>
    )
}