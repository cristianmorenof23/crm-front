import React, {useState, useEffect, useContext} from 'react'
import Select from 'react-select'
import Layout from '../Layout'
import { gql, useQuery } from '@apollo/client'
import Spinner from '../Spinner'
import PedidoContext from '../../../context/pedidos/PedidoContext'

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

const AsignarProductos = () => {

    // state local del componente
    const [ productos, setProductos ] = useState([])

    // Context de productos
    const pedidoContext = useContext(PedidoContext)
    const {agregarProductos} = pedidoContext


    // consulta a la base de datos
    const { data, loading, error } = useQuery(OBTENER_PRODUCTOS)

    // console.log(data);
    // console.log(loading);
    // console.log(error);

    useEffect(() => {
        // Funcion para pasar a pedido state
        agregarProductos(productos)
    }, [productos])

    const seleccionarProducto = producto  => {
        //console.log(producto)
        setProductos(producto)
    }

    if (loading) {
        return <Spinner/>
    }
    const { obtenerProductos } = data

    return (
        <>
            <p className='mt-10 my-2 bg-white border-l-4 border-yellow-400 text-gray-700 p-2 text-sm font-bold'>2.- Selecciona o busca los productos</p>
            <Select
                className='mt-3'
                options={obtenerProductos}
                onChange={opcion => seleccionarProducto(opcion)}
                isMulti={true}
                placeholder='Busque o Seleccione el Producto'
                getOptionValue={opciones => opciones.id}
                getOptionLabel={opciones => `${opciones.nombre} - ${opciones.existencia} Disponibles`}
                noOptionsMessage={() => "No hay resultados"}
            />
        </>
    )
}

export default AsignarProductos