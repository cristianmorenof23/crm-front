import Head from "next/head"
import Sidebar from "./Sidebar"
import Header from "./Header"
import { useRouter } from "next/router"



export default function Layout({ children }) {

    // hook de routing
    const rounter = useRouter()

    return (
        <>

            <Head>
                <title>CRM - Administración de Clientes</title>
            </Head>


                {rounter.pathname === '/login' || rounter.pathname === '/nuevacuenta' ? (
                    <div className="bg-slate-300 min-h-screen flex flex-col justify-center">
                        <div>
                            {children}
                        </div>

                    </div>

                ) : (
                    <div className="bg-gray-200">
                        <div className="sm:flex min-h-screen">
                            <Sidebar />

                            <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
                                <Header/>
                                {children}
                            </main>

                        </div>

                    </div>
                )}

        </>
    )
}