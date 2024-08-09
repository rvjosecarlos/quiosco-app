import { prismaClient } from "@/app/src/lib/prisma";  
import CategoryIcon from "../UI/CategoryIcon";
import Logo from "../UI/Logo";

async function getCategories(){
    return await prismaClient.category.findMany();
};

export default async function OrderSidebar(){
    const categorias = await getCategories();

    return(
        <aside className="md:w-72 bg-white">
            <Logo />
            <nav className="mt-10">
                {
                    categorias.map( categoria => <CategoryIcon key={categoria.id} categoria={categoria}/> )
                }
            </nav>
        </aside>
    );
};