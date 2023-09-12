import React, { useContext, useState } from 'react'
import Layout from '@/components/Layout'
import AsignarCliente from '@/components/pedidos/AsignarCliente'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'


// Context de pedidos
import PedidoContext from '../../context/pedidos/PedidoContext'
import AsignarProductos from '@/components/pedidos/AsignarProductos'
import ResumenPedido from '@/components/pedidos/ResumenPedido'
import Total from '@/components/pedidos/Total'
import { gql, useMutation } from '@apollo/client'


const NUEVO_PEDIDO = gql`
    mutation nuevoPedido($input: PedidoInput){
        nuevoPedido(input: $input){
            id
        }
    }

`

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

const NuevoPedido = () => {

    const router = useRouter()

    const [mensaje, setMensaje] = useState(null)

    // Utilizar context y extraer sus funciones y valores
    const pedidoContext = useContext(PedidoContext)
    const { total, cliente, productos } = pedidoContext

    // Mutation para crear un nuevo pedido
    const [nuevoPedido] = useMutation(NUEVO_PEDIDO, {
        update(cache, { data: { nuevoPedido } }) {
            const { obtenerPedidosVendedor } = cache.readQuery({ query: OBTENER_PEDIDOS });
            cache.writeQuery({
                query: OBTENER_PEDIDOS,
                data: {
                    obtenerPedidosVendedor: [...obtenerPedidosVendedor, nuevoPedido]
                }
            })
        }
    });

    const validarPedido = () => {
        return !productos.every(producto => producto.cantidad > 0) || total === 0 || cliente.length === 0 ? " opacity-50 cursor-not-allowed " : ''
    }

    const crearNuevoPedido = async () => {

        const { id } = cliente

        // Remover lo no deseado de productos
        const pedido = productos.map(({ existencia, __typename, ...producto }) => producto)

        try {
            const { data } = await nuevoPedido({
                variables: {
                    input: {
                        cliente: id,
                        total,
                        pedido
                    }
                }
            })

            // Redireccionar
            router.push('/pedidos')

            // Mostrar Alerta
            Swal.fire({
                position: 'top-end',
                title: 'Correcto',
                text: 'El pedido se registro correctamente',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {
            setMensaje(error.message.replace('GraphQL error: ', ''))

            setTimeout(() => {
                setMensaje(null)
            }, 3000);
        }
    }

    const mostrarMensaje = () => {
        Swal.fire({
            title: 'Error',
            text: mensaje,
            icon: 'info', // Puedes ajustar el ícono según el tipo de mensaje
            confirmButtonText: 'Intentar de Nuevo'
        });
    };


    return (
        <Layout>
            <h1 className='text-3xl text-gray-800 font-light text-focus-in'>Crear Nuevo Pedido</h1>

            {mensaje && mostrarMensaje()}
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <AsignarCliente />
                    <AsignarProductos />
                    <ResumenPedido />
                    <Total />

                    <button
                        type='button'
                        className={` bg-gray-800 w-full rounded mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validarPedido()}`}
                        onClick={() => crearNuevoPedido()}
                    >Registrar Pedido</button>
                </div>
            </div>
        </Layout>
    )
}

export default NuevoPedido