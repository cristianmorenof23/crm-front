import React, { useContext, useState, useEffect} from 'react'
import PedidoContext from '../../context/pedidos/PedidoContext'

const ProductoResumen = ({producto}) => {

    const pedidoConext = useContext(PedidoContext)
    const { cantidadProductos, actualizarTotal } = pedidoConext

    const [cantidad, setCantidad] = useState(0)

    useEffect(() =>{
        actualizarCantidad(),
        actualizarTotal()
    }, [cantidad])

    const actualizarCantidad = () => {
        const nuevoProducto = {...producto, cantidad: cantidad}
        cantidadProductos(nuevoProducto);
    }

    const {nombre, precio} = producto

    return (
        <div className='md:flex md:justify-between md:items-center mt-5'>
            <div className='md:w-2/4 mb-2 md:mb-0'>
                <p className='text-sm'>{nombre}</p>
                <p>$ {precio}</p>
            </div>
            <input
                type='number'
                placeholder='Cantidad'
                className='shadow rounded appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4'
                onChange={ e => setCantidad(+e.target.value) }
                value={cantidad}
            />
        </div>
    )
}

export default ProductoResumen