import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useMutation, gql } from '@apollo/client'
import Swal from 'sweetalert2';
import { useState } from 'react';
import Link from 'next/link';

const NUEVA_CUENTA = gql`
    mutation nuevoUsuario($input: UsuarioInput){
        nuevoUsuario(input: $input){
            id
            nombre
            apellido
            email
        }
    }

`

const NuevaCuenta = () => {

    // State para el mensaje
    const [mensaje, guardarMensaje] = useState(null)

    // Mutation para crear cuenta
    const [nuevoUsuario] = useMutation(NUEVA_CUENTA)

    // Routing
    const router = useRouter()


    // Validacion del formulario
    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre es obligatorio'),
            apellido: Yup.string().required('El apellido es obligatorio'),
            email: Yup.string().email('El email no es valido').required('El email es obligatorio'),
            password: Yup.string().required('El password no puede ir vacio').min(6, 'El password debe ser al menos de 6 caracteres')
        }),
        onSubmit: async (valores) => {

            const { nombre, apellido, email, password } = valores

            try {
                const { data } = await nuevoUsuario({
                    variables: {
                        input: {
                            nombre,
                            apellido,
                            email,
                            password
                        }
                    }
                })

                // Usuario creado correctamente
                guardarMensaje(`Se creo correctamente el Usuario: ${data.nuevoUsuario.nombre}`)

                // redireccionar usuario para iniciar sesion
                setTimeout(() => {
                    guardarMensaje(null)
                    router.push('/login')
                }, 2500);


            } catch (error) {
                guardarMensaje(error.message.replace('GraphQL error:', ''))

                setTimeout(() => {
                    guardarMensaje(null)
                }, 3000);
            }
        }
    })

    const mostrarMesaje = () => {
        Swal.fire({
            position: 'center',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        })

    }



    return (

        <>
            <Layout>

                {mensaje && mostrarMesaje()}

                <div className='text-center text-2xl text-black font-bold'>Crear Nueva Cuenta</div>

                <div className='flex justify-center mt-5'>
                    <div className='w-full max-w-sm'>
                        <form
                            className='bg-white rounded shadow-md px-8 pt-6 pb-6 mb-4'
                            onSubmit={formik.handleSubmit}
                        >

                            {formik.touched.nombre && formik.errors.nombre ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2'>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.nombre}</p>
                                </div>
                            ) : null}

                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nombre'>
                                    Nombre
                                </label>

                                <input
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Nombre del Usuario' id='nombre' value={formik.values.nombre} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                />

                                {formik.touched.apellido && formik.errors.apellido ? (
                                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2'>
                                        <p className='font-bold'>Error</p>
                                        <p>{formik.errors.apellido}</p>
                                    </div>
                                ) : null}

                            </div>
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='apellido'>
                                    Apellido
                                </label>

                                <input
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Apellido del Usuario' id='apellido' value={formik.values.apellido} onChange={formik.handleChange}
                                />
                            </div>

                            {formik.touched.email && formik.errors.email ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2'>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.email}</p>
                                </div>
                            ) : null}

                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                                    Email
                                </label>

                                <input
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Email del Usuario' id='email' value={formik.values.email} onChange={formik.handleChange}
                                />
                            </div>

                            {formik.touched.password && formik.errors.password ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2'>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.password}</p>
                                </div>
                            ) : null}

                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                                    Password
                                </label>

                                <input
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Password del Usuario' id='password' type='password' value={formik.values.password} onChange={formik.handleChange}
                                />
                            </div>

                            <input
                                type='submit'
                                className='bg-white rounded hover:bg-gray-800 hover:text-white w-full p-2 text-black uppercase font-bold cursor-pointer transition-colors'
                                value='Crear Cuenta'
                            />

                        </form>

                        <nav className='lg:flex lg:justify-between'>
                            <Link
                                href='/login'
                                className="block text-center my-5 text-slate-500 uppercase text-sm"
                            >¿Ya tienes una cuenta? Inicia Sesion</Link>
                        </nav>
                    </div>
                </div>
            </Layout>
        </>

    )
}

export default NuevaCuenta



// QUERY, useQuery =  con data accedemos a la informacion, con loading cambia el state de true a false cuando se cargue algo.. podemos usar un spinner mientras se cargando los datos, 