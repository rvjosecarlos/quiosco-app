"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminRouteProps = {
    link : {
        url: string,
        text: string,
        blank: boolean
    }
}

export default function AdminRoute( {link}: AdminRouteProps ){
    const pathName = usePathname();
    const isActive = pathName.startsWith(link.url);

    return (
        <Link
            href={link.url}
            target={ link.blank ? '_blank' : '_self' }
            className={` ${ isActive ? 'bg-amber-500' : '' } hover:bg-amber-200 font-bold text-lg border-t border-gray-200 p-3 last-of-type:border-b`}
        >
            { link.text }
        </Link>
    )
};