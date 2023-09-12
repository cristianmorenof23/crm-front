import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router'

const OBTENER_USUARIO = gql`
    query obtenerUsuario{
        obtenerUsuario {
            id
            nombre
            apellido
        }
    }
`;


const Header = () => {

    const router = useRouter();

    // query de apollo
    const { data, loading, error } = useQuery(OBTENER_USUARIO);

    // console.log(data)
    // console.log(loading)
    // console.log(error)

    // Proteger que no accedamos a data antes de tener resultados
    if (loading) return null;


    // Si no hay informacion
    if (!data) {
        router.push('/login');
    }

    if (!data || !data.obtenerUsuario) {
        // Si no hay información o no hay usuario, redirige al login
        router.push('/login');
        return null; // Puedes retornar null aquí o algún componente para mostrar mientras carga la información
    }

    const { nombre, apellido } = data.obtenerUsuario

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        router.push('/login');
    }



    return (
        <div className="sm:flex sm:justify-between mb-6">
            <p className="mr-2 mb-5 lg:mb-0 text-2xl font-mono">Hola {nombre} {apellido}</p>

            <button className='bg-blue-400 w-full sm:w-auto font-bold uppercase text-xs rounded py-2 px-4 text-white shadow-md hover:bg-blue-800 transition' onClick={() => cerrarSesion()} type='button'>Cerrar Sesión</button>
        </div>
    )
}

export default Header