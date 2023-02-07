import { FaUser } from 'react-icons/fa'
import { MdLocalShipping, MdLocationPin } from 'react-icons/md'
import { getUser } from '../feature/authSlice'
import { getOrders, fetchOrders, orderPay, SetDeilivered } from '../feature/orderSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { url } from '../network'
import moment from 'moment'

export default function Order(){

	const dispatch = useDispatch()
	const order = useSelector(getOrders)
	const user = useSelector(getUser)
	const { id } = useParams()

	console.log(order)

	useEffect(()=>{
		const orderFunc = async()=>{
	  		const res = await dispatch(fetchOrders({id, token: user.accessToken}))	  		
	    }
	    orderFunc()
	}, [])

	const shippingPrice = order ? order.shippingPrice : 0
	const tax = order ? order.taxPrice : 0
	const total = order ? order.totalPrice : 0	

	const handleDelivery = async()=>{
		await dispatch(SetDeilivered({token:user.accessToken, id}))
		window.location.reload(false)
	}
	return (
	 <div>
	  <div className='flex justify-evenly bg-emerald-100 mx-3 items-center my-2 rounded  py-7'> 
	   <div className='1 flex p-3'>
	    <FaUser className='h-16 w-16 bg-emerald-200 text-emerald-700 rounded-full p-4 m-2 mx-6 font-bold text-2xl'/>
	    <div className='flex flex-col'>
	     <h3 className='font-bold'>Customer info</h3>
	     <span>{user.name}</span>
	     <span>{user.email}</span>
	    </div>
	   </div>
	   <div className='2 flex'>
	    <MdLocalShipping className='h-16 w-16 bg-emerald-200 text-emerald-700 rounded-full p-4 m-2 mx-6 font-bold text-2xl'/>
	    <div className='flex flex-col '>	     
	     <h3 className='font-bold'>shipping details</h3>
	     <span>{order && order.shippingAddress.city}</span>
	     <span>method: online</span>
	     {order && order.isPaid ? <span className='px-3 py-2 rounded text-green-600 mt-1 text-center bg-green-300'>paid on {moment(order.createdAt).format("MMM Do YY")}</span> : <span className='px-3 py-2 rounded text-red-600 bg-red-200 mt-1 text-center'>not paid</span>}
	    </div>
	   </div>
	   <div className='3 flex'>
	    <MdLocationPin className='h-16 w-16 bg-emerald-200 text-emerald-700 rounded-full p-4 m-2 mx-6 font-bold text-2xl'/>
	    <div className='flex flex-col'>
	     <h3 className='font-bold'>delivery address</h3>
	     <span>{order && order.shippingAddress.address}</span>
	     <span>{order && order.shippingAddress.city}</span>
	     <span>{order && order.shippingAddress.country}</span>
	     <span>{order && order.shippingAddress.postalCose}</span>
	     {order && order.isDelivered ? <span className='px-3 py-2 rounded text-green-600 mt-1 text-center bg-green-300'>paid on {moment(order.deliveredAt).format("MMM Do YY")}</span> : <span className='px-3 py-2 rounded text-red-600 mt-1 text-center bg-red-200'>not delivered</span>}
	    </div>
	   </div>
	  </div>
	  <div className='flex m-3'>
	   <div className='w-4/6 m-2'>
	    <div className='flex justify-around basis-2/3 font-medium border-b'>
	    	<h4 className='basis-1/3'>product</h4>
	    	<div className='basis-2/3 flex'>
	         <h4 className='w-1/2'>name</h4>
	         <h4 className='w-1/2'>price</h4>
	         <h4 className='w-1/2'>quatity</h4>
	        </div>
	    </div>
	    { order ? ( order.orderItems.map((product, i)=>(
	      <div key={i} className='flex py-2 px-2 my-2 w-full justify-evenly border-b'>
	       <div className='w-1/3 flex justify-center items-center'>
	        <img src={product.img} className='h-24'/>
	       </div>
	       <div className='flex justify-around basis-2/3'>
	        <h4 className='w-1/2'>{product.name}</h4>
	        <h4 className='w-1/2'>₹{product.price}</h4>
	        <h4 className='w-1/2'>{product.qty}</h4>
	       </div>
	      </div>
	    )) ) : null }
	   </div>

	   <div className='w-2/6'>
	    <div className='m-3 border rounded'>
	     <button onClick={handleDelivery} className='w-full rounded py-2.5 px-2 font-bold text-white bg-black'>Mark as delivered</button>
	    </div>
	   </div>
	  </div>
	 </div>
	)
}