import React from 'react'
import Layout from '@/components/Layout'
import { gql, useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

const NUEVO_PRODUCTO = gql`
    mutation nuevoProducto($input: ProductoInput) {
        nuevoProducto(input: $input) {
            id
            nombre
            existencia
            precio
        }
    }
`;

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


const nuevoproducto = () => {

    // Routing
    const router = useRouter()

    // Mutation de apollo
    const [nuevoProducto] = useMutation(NUEVO_PRODUCTO, {
        update(cache, {data: {nuevoProducto}}) {

            // obtener copia del objeto de cache
            const { obtenerProductos } = cache.readQuery({
                query: OBTENER_PRODUCTOS
            })

            // Reescribir el cache
            cache.writeQuery({
                query: OBTENER_PRODUCTOS,
                data: {
                    obtenerProductos: [...obtenerProductos, nuevoProducto]
                }
            })
        }
    })


    // Formulario para nuevo productos
    const formik = useFormik({
        initialValues: {
            nombre: '',
            existencia: '',
            precio: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre del producto es obligatorio'),
            existencia: Yup.number().required('Agrega una cantidad disponible').positive('No se aceptan numeros negativos').integer('La existencia deben ser numeros enteros'),
            precio: Yup.number().required('El precio es obligatorio').positive('No se aceptan numeros negativos')
        }),
        onSubmit: async (valores) => {
            try {

                const { nombre, existencia, precio } = valores;

                const { data } = await nuevoProducto({
                    variables: {
                        input: {
                            nombre,
                            existencia,
                            precio
                        }
                    }
                })

                // console.log(data);
                // Mostrar una alerta
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Se creo correctamente el producto',
                    showConfirmButton: false,
                    timer: 1500
                })

                // Redireccionar hacia los productos
                setTimeout(() => {
                    router.push('/productos')
                }, 2000);

            } catch (error) {
                console.log(error);
            }
        }
    })



    return (
        <Layout>
            <h1 className='text-3xl text-gray-800 font-light text-focus-in'>Crear Nuevo Producto</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                Nombre
                            </label>

                            {formik.touched.nombre && formik.errors.nombre ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.nombre}</p>
                                </div>
                            ) : null}

                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="nombre"
                                type="text"
                                placeholder="Nombre Produto"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.nombre}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="existencia">
                                Cantidad Disponible
                            </label>

                            {formik.touched.existencia && formik.errors.existencia ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.existencia}</p>
                                </div>
                            ) : null}

                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="existencia"
                                type="number"
                                placeholder="Existencia o cantidad disponible"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.existencia}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">
                                Precio
                            </label>

                            {formik.touched.precio && formik.errors.precio ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.precio}</p>
                                </div>
                            ) : null}

                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="precio"
                                type="number"
                                placeholder="Precio del Producto"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.precio}
                            />
                        </div>

                        <input
                            type="submit"
                            className="rounded cursor-pointer bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                            value="Agregar Nuevo Producto"
                        />

                    </form>
                </div>
            </div>
        </Layout>

    )
}

export default nuevoproducto