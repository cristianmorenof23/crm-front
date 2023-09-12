import Link from "next/link"
import { useRouter } from "next/router"

export default function Sidebar() {

    // routing de next
    const router = useRouter()


    return (
        <aside className="bg-gray-800  sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
            <div>
                <Link href="/" className="text-white text-3xl font-black">CRM Clientes</Link>
            </div>

            <nav className="mt-8 list-none">
                <li className={router.pathname === "/" ? "bg-blue-500  rounded mb-2" : ""}>
                    <Link href="/" className="tracking-wide mb-2 block text-white cursor-pointer px-3 py-2 rounded font-semibold text-lg transition hover:text-black  hover:bg-blue-500  hover:-translate-y-1 hover:scale-110">
                        Clientes
                    </Link>
                </li>

                <li className={router.pathname === "/pedidos" ? "bg-pink-500  rounded mb-2" : ""}>
                    <Link href="/pedidos" className="tracking-wide mb-2 block text-white cursor-pointer px-3 py-2 rounded font-semibold text-lg transition hover:text-black  hover:bg-pink-500  hover:-translate-y-1 hover:scale-110">
                        Pedidos
                    </Link>
                </li>

                <li className={router.pathname === "/productos" ? "bg-yellow-500  rounded mb-2" : ""}>
                    <Link href="/productos" className="tracking-wide mb-2 block text-white cursor-pointer px-3 py-2 rounded font-semibold text-lg transition hover:text-black  hover:bg-yellow-500  hover:-translate-y-1 hover:scale-110">
                        Productos
                    </Link>
                </li>
            </nav>


            <div className="sm:mt-10">
                <Link href="/" className="text-white text-3xl font-black">Otras Opciones</Link>
            </div>

            <nav className="mt-5 list-none">
                <li className={router.pathname === "/mejoresvendedores" ? "bg-blue-500  rounded mb-2" : ""}>
                    <Link href="/mejoresvendedores" className="tracking-wide mb-2 block text-white cursor-pointer px-3 py-2 rounded font-semibold text-lg transition hover:text-black  hover:bg-blue-500  hover:-translate-y-1 hover:scale-110">
                        Mejores Vendedores
                    </Link>
                </li>

                <li className={router.pathname === "/mejoresclientes" ? "bg-blue-500  rounded mb-2" : ""}>
                    <Link href="/mejoresclientes" className="tracking-wide mb-2 block text-white cursor-pointer px-3 py-2 rounded font-semibold text-lg transition hover:text-black  hover:bg-blue-500  hover:-translate-y-1 hover:scale-110">
                        Mejores Clientes
                    </Link>
                </li>
            </nav>
        </aside>
    )
}