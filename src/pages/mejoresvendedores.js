import React, {useEffect}from 'react'
import Layout from '@/components/Layout'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { gql, useQuery } from '@apollo/client';
import Spinner from '@/components/Spinner';

const MEJORES_VENDEDORES = gql`
    query mejoresVendedores {
        mejoresVendedores {
            vendedor {
                nombre
                email
            }
            total
        }
    }
`;



const MejoresVendedores = () => {


    const { data, loading, error, startPolling, stopPolling} = useQuery(MEJORES_VENDEDORES)

    useEffect(() => {
        startPolling(1000) // Vuelve a consultar la BD despues de 1 seg

        return () => {
            stopPolling()
        }
    }, [startPolling, startPolling])

    if (loading) {
        return <Spinner />; // Debes retornar el Spinner mientras se carga la consulta.
    }

    if (error) {
        console.error(error);
        return <div>Error al cargar los datos</div>; // Manejar el error si ocurre.
    }

    const { mejoresVendedores } = data;

    const vendedorGrafica = [];

    mejoresVendedores.map((vendedor, index) => {
        vendedorGrafica[index] = {
            ...vendedor.vendedor[0],
            total: vendedor.total
        }
    })

    // console.log(data);
    // console.log(loading);
    // console.log(error);


    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Mejores Vendedores</h1>

            <ResponsiveContainer
                width={'99%'}
                height={550}
            >
                <BarChart
                    className="mt-10"
                    width={500}
                    height={300}
                    data={vendedorGrafica}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nombre" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#3182CE" />
                </BarChart>
            </ResponsiveContainer>
        </Layout>
    );
}

export default MejoresVendedores