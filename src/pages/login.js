import Layout from '@/components/Layout';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import Link from 'next/link';
import Spinner from '@/components/Spinner';
import { useRouter } from 'next/router';

const AUTENTICAR_USUARIO = gql`
    mutation autenticarUsuario($input: AutenticarInput) {
        autenticarUsuario(input: $input) {
        token
        }
    }
`;

const Login = () => {
    const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);
    const [showSpinner, setShowSpinner] = useState(false);
    const [showRedirect, setShowRedirect] = useState(false);

    //routing
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('El email no es válido').required('El email no puede estar vacío'),
            password: Yup.string().required('El password es obligatorio'),
        }),
        onSubmit: async (valores) => {
            const { email, password } = valores;
            try {
                setShowSpinner(true); // Mostrar el spinner
                const { data } = await autenticarUsuario({
                    variables: {
                        input: {
                            email,
                            password,
                        },
                    },
                });

                // Guardar token en localstorage
                setTimeout(() => {
                    const { token } = data.autenticarUsuario;
                    localStorage.setItem('token', token);
                }, 1000);

                setShowRedirect(true); // Mostrar la redirección
            } catch (error) {
                mostrarMensaje(error.message.replace('GraphQL error: ', ''));
            } finally {
                setShowSpinner(false); // Ocultar el spinner después de la autenticación exitosa o fallida
            }
        },
    });

    const mostrarMensaje = (mensaje) => {
        Swal.fire({
            position: 'center',
            title: mensaje,
            icon: 'info',
            showConfirmButton: false,
            timer: 1500,
        });
    };

    // Agregar el hook useEffect para manejar la redirección
    useEffect(() => {
        if (showRedirect) {
            router.push('/');
        }
    }, [showRedirect]);

    if (showSpinner) {
        return <Spinner />;
    }

    return (
        <Layout>
            <div className="text-center text-2xl text-black font-bold">Login</div>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-sm">
                    <form className="bg-white rounded shadow-md px-8 pt-6 pb-6 mb-4" onSubmit={formik.handleSubmit}>
                        {formik.errors.email && (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.email}</p>
                            </div>
                        )}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Email del Usuario"
                                id="email"
                                type="email"
                                {...formik.getFieldProps('email')}
                            />
                        </div>

                        {formik.errors.password && (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.password}</p>
                            </div>
                        )}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Password del Usuario"
                                id="password"
                                type="password"
                                {...formik.getFieldProps('password')}
                            />
                        </div>

                        <input
                            type="submit"
                            className="bg-white rounded hover:bg-gray-800 hover:text-white w-full p-2 text-black uppercase font-bold cursor-pointer transition-colors"
                            value="Iniciar Sesión"
                        />
                    </form>
                    <nav className="lg:flex lg:justify-between">
                        <Link href="/nuevacuenta" className="block text-center my-5 text-slate-500 uppercase text-sm">
                            ¿No tienes una cuenta? Registrate
                        </Link>
                    </nav>
                </div>
            </div>
        </Layout>
    );
};

export default Login;
