import React from 'react'
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';
// Router nos permite pasar parametros en la url
import Router from 'next/router';

const ELIMINAR_CLIENTE = gql`
    mutation eliminarCliente($id: ID!) {
        eliminarCliente(id:$id) 
    }
`;

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



const Cliente = ({ cliente }) => {

    // mutation para eliminar cliente
    const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE, {
        update(cache) {
            // obtener una copia del objeto de cache
            const { obtenerClientesVendedor } = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO });

            // Reescribir el cache
            cache.writeQuery({
                query: OBTENER_CLIENTES_USUARIO,
                data: {
                    obtenerClientesVendedor: obtenerClientesVendedor.filter(clienteActual => clienteActual.id !== id)
                }
            })
        }
    });

    const { nombre, apellido, empresa, email, id } = cliente;

    // Elimina un cliente
    const confirmarEliminarCliente = (id) => {
        Swal.fire({
            title: '¿Deseas eliminar a este cliente?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'No, Cancelar'
        }).then(async (result) => {
            if (result.value) {

                try {
                    // Eliminar por ID
                    const { data } = await eliminarCliente({
                        variables: {
                            id
                        }
                    });
                    // console.log(data);

                    // Mostrar una alerta
                    Swal.fire(
                        'Eliminado!',
                        data.eliminarCliente,
                        'success'
                    )
                } catch (error) {
                    console.log(error);
                }
            }
        })
    }

    // Editar un cliente 
    const editarCliente = (id) => {
        Router.push({
            pathname: "/editarcliente/[id",
            query: { id }
        })
    }


    return (
        <tr>
            <td className="border px-4 py-2">{nombre} {apellido}</td>
            <td className="border px-4 py-2">{empresa}</td>
            <td className="border px-4 py-2">{email}</td>
            <td className="border px-4 py-2">
                <button
                    type='button'
                    className='flex justify-center items-center bg-red-400 py-2 px-4 rounded w-full hover:bg-red-700 cursor-pointer text-white shadow text-xs uppercase font-bold'
                    onClick={() => confirmarEliminarCliente(id)}
                >
                    Eliminar
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>

                </button>
            </td>
            <td className="border px-4 py-2">
                <button
                    type='button'
                    className='flex justify-center items-center bg-green-400 py-2 px-4 rounded w-full hover:bg-green-700 cursor-pointer text-white shadow text-xs uppercase font-bold'
                onClick={() => editarCliente(id) }
                >
                    Editar
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>


                </button>
            </td>
        </tr>
    )
}

export default Cliente