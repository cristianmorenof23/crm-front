import Spinner from "@/components/Spinner"
import Layout from "../components/Layout"
import { gql, useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import client from "../../config/apollo"
import Link from "next/link"
import Cliente from "@/components/Cliente"


const OBTENER_CLIENTES_USUARIO = gql`
    query obtenerClientesVendedor {
        obtenerClientesVendedor {
            id
            nombre
            apellido
            empresa
            email
        }
    }
`;


export default function Index() {

    const router = useRouter();

    // Consulta de Apollo
    const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);

    if (loading) return <Spinner />

    // if( !data.obtenerClientesVendedor ) {
    //     client.clearStore()
    //     router.push('/login')
    // }

    return (
        <div>
            <Layout>
                <h1 className="text-3xl text-gray-800 font-light text-focus-in">Clientes</h1>
                <Link href="/nuevocliente" className="bg-blue-400 py-2 px-5 mt-3 mb-3 rounded hover:bg-blue-800 transition inline-block text-white text-sm uppercase font-bold w-full lg:w-auto text-center">
                    Nuevo Cliente
                </Link>

                <div className="overflow-x-scroll">
                    <table className="table-auto shadow-md mt-10 w-full w-lg">
                        <thead className="bg-gray-800">
                            <tr className="text-white">
                                <th className="w-1/5 py-2">Nombre</th>
                                <th className="w-1/5 py-2">Empresa</th>
                                <th className="w-1/5 py-2">Email</th>
                                <th className="w-1/5 py-2">Eliminar</th>
                                <th className="w-1/5 py-2">Editar</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white">
                            {data?.obtenerClientesVendedor && data.obtenerClientesVendedor.map((cliente) => (
                                <Cliente key={cliente.id} cliente={cliente} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </Layout>
        </div>
    )
}
