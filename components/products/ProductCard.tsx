import Image from "next/image";
import { Products } from "@prisma/client";
import { formatCurrency, getImageUrl } from "@/app/src/utils";
import AddButton from "./AddButton";

type ProductCardProps = {
    producto: Products
}

export default function ProductCard({ producto }: ProductCardProps){
    const image = getImageUrl(producto.image);

    return (
        <div className="border bg-white">
            <Image 
                src={image}
                alt="Producto img"
                width={400}
                height={500}
                quality={80}
            />
            <div className="p-5">
                <h3 className="text-2xl font-bold">{producto.name}</h3>
                <p className="text-4xl mt-5 font-black text-amber-500">{formatCurrency(producto.price)}</p>
                <AddButton product={producto}/>
            </div>
        </div>
    );
}