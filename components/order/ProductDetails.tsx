import { useStore } from "@/app/src/store"
import { OrderItem } from "@/app/src/types"
import { formatCurrency } from "@/app/src/utils"
import { XCircleIcon, MinusIcon, PlusIcon } from "@heroicons/react/16/solid"
import { useMemo } from "react"

type ProductDetailsProps = {
    item: OrderItem
}

const MIN_ITEM = 1;
const MAX_ITEM = 5;

export function ProductDetails({ item }: ProductDetailsProps){
    const increaseQuantity = useStore( state => state.increaseQuantity );
    const decreaseQuantity = useStore( state => state.decreaseQuantity );
    const deleteProduct = useStore( state => state.deleteProduct );
    const max = useMemo( () => item.quantity >= MAX_ITEM, [item]);
    const min = useMemo( () => item.quantity <= MIN_ITEM, [item]);

    return (
        <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <p className="text-xl font-bold">{item.name} </p>

                    <button
                        type="button"
                        onClick={() => deleteProduct(item.id)}
                    >
                        <XCircleIcon className="text-red-600 h-8 w-8"/>
                    </button>
                </div>
                <p className="text-2xl text-amber-500 font-black">
                    {formatCurrency(item.price)}
                </p>
                <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
                    <button
                        type="button"
                        onClick={() => decreaseQuantity( item.id )}
                        disabled={min}
                    >
                        <MinusIcon className="h-6 w-6"/>
                    </button>

                    <p className="text-lg font-black ">
                        {item.quantity}
                    </p>

                    <button
                        type="button"
                        onClick={() => increaseQuantity(item.id)}
                        disabled={max}
                    >
                        <PlusIcon className="h-6 w-6"/>
                    </button>
                </div>
                <p className="text-xl font-black text-gray-700">
                    Subtotal: {''}
                    <span className="font-normal"> 
                        { formatCurrency(item.subtotal) }
                    </span>
                </p>
            </div>
        </div>
    )
}