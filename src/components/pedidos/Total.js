import React, { useContext } from 'react'
import PedidoContext from '../../../context/pedidos/PedidoContext'

const Total = () => {

    const pedidoConext = useContext(PedidoContext)
    const { total } = pedidoConext


    return (
        <div className='flex items-center mt-5 justify-between bg-white p-3 border-solid border-2 border-gray-200 rounded'>
            <h2 className='text-gray-800 text-lg'>Total a pagar: {total} </h2>
            <p className='text-gray-800 mt-0'>$ </p>
        </div>
    )
}

export default Total