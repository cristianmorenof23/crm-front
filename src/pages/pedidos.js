import Layout from "../components/Layout"
import Link from "next/link"
import { gql, useQuery } from "@apollo/client"
import Spinner from "@/components/Spinner"
import Pedido from "@/components/Pedido"

const OBTENER_PEDIDOS = gql`
    query obtenerPedidosVendedor {
        obtenerPedidosVendedor {
            id
            pedido {
                id
                cantidad
                nombre
            }
            cliente {
                id
                nombre
                apellido
                email
                telefono
            }
            vendedor
            total
            estado
            }
        }
`


export default function Pedidos() {

    const { data, loading, error } = useQuery(OBTENER_PEDIDOS)
    // console.log(loading);
    // console.log(data);
    // console.log(error);

    if (loading) return <Spinner />

    const { obtenerPedidosVendedor } = data;


    return (
        <div>
            <Layout>
                <h1 className="text-3xl text-gray-800 font-light text-focus-in">Pedidos</h1>

                <Link href="/nuevopedido" className="bg-pink-400 py-2 px-5 mt-3 mb-3 rounded hover:bg-pink-600 transition inline-block text-white text-sm uppercase font-bold">
                    Nuevo Pedido
                </Link>

                {obtenerPedidosVendedor.length === 0 ? (
                    <p className="mt-5 text-center text-2xl">No hay pedidos aún</p>
                ) : (
                    obtenerPedidosVendedor.map(pedido => (
                        <Pedido
                            key={pedido.id}
                            pedido={pedido}
                        />
                    ))
                )}
            </Layout>
        </div>
    )
}
