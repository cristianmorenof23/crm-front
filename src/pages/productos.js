import Layout from "../components/Layout"
import { gql, useQuery } from "@apollo/client"
import Producto from "@/components/Producto";
import Spinner from "@/components/Spinner";
import Link from "next/link";


const OBTENER_PRODUCTOS = gql`
    query obtenerProductos {
        obtenerProductos {
            id
            nombre
            precio
            existencia
        }
    }
    `;

export default function Productos() {

    // consultar los productos
    const { data, loading, error } = useQuery(OBTENER_PRODUCTOS)
    // console.log(data);
    // console.log(loading);
    // console.log(error);

    if (loading) {
        <Spinner/>
    }

    return (
        <div>
            <Layout>
                <h1 className="text-3xl text-gray-800 font-light text-focus-in">Productos</h1>

                <Link href="/nuevoproducto" className='bg-yellow-400 py-2 px-5 mt-3 mb-3 rounded hover:bg-yellow-600 transition inline-block text-white text-sm uppercase font-bold'>
                    Nuevo Producto
                </Link>


                <table className="table-auto shadow-md mt-10 w-full w-lg">
                    <thead className="bg-gray-800">
                        <tr className="text-white">
                            <th className="w-1/5 py-2">Nombre</th>
                            <th className="w-1/5 py-2">Existencia</th>
                            <th className="w-1/5 py-2">Precio</th>
                            <th className="w-1/5 py-2">Eliminar</th>
                            <th className="w-1/5 py-2">Editar</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white">
                        {data?.obtenerProductos && data.obtenerProductos.map((producto) => (
                            <Producto key={producto.id} producto={producto} />
                        ))}
                    </tbody>
                </table>
            </Layout>
        </div>
    )
}
