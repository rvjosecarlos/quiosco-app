"use client";
import { useParams } from "next/navigation";
import { Category } from "@prisma/client"
import Link from "next/link";
import Image from "next/image";

type CategoryIconProps = {
    categoria: Category
}

export default function CategoryIcon({ categoria }: CategoryIconProps){
    const params = useParams<{category: Category['slug']}>();

    return (
        <div className={`w-full border-t border-gray-200 p-3 last-of-type:border-b  hover:bg-orange-200 transition-colors ${ params.category === categoria.slug ? 'bg-orange-400' : '' }`}>
            <Link 
                className=" flex items-center gap-4"
                href={`/order/${categoria.slug}`}
            >    
                <div className="relative w-16 h-16">
                    <Image 
                        fill
                        src={`/icon_${categoria.slug}.svg`}
                        alt="Categoria"
                    />
                </div> 
                <p className="text-xl font-bold">{ categoria.name }</p>
            </Link>
        </div>
    )
}