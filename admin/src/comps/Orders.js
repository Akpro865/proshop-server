import { BsSearch } from 'react-icons/bs'
import { useEffect } from 'react'
import { getUser } from '../feature/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { fetchAllOrders, getAllOrders } from '../feature/orderSlice'
import moment from 'moment'

export default function Orders(){

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const user = useSelector(getUser)
	const orders= useSelector(getAllOrders)
	console.log(orders, user)

	useEffect(()=>{
	 if(!user) navigate('/login')
	 dispatch(fetchAllOrders(user.accessToken))
	}, [user])

	return(
	 <div>
	   <div className='m-2 flex justify-between bg-cyan-0 rounded p-1 items-center'>
		   <div className='border flex w-80 rounded ml-5 overflow-hidden justify-between'>
		    <input className='outline-none h-10 w-full pl-1' placeholder='seach here...'l/>
		    <span className='bg-green-400 flex items-center font-bold cursor-pointer justify-center px-4'><BsSearch className='text-xl text-white font-bold'/></span>	    
		   </div>
		   <div className=''>
		    <select className='mx-4 p-2.5 bg-white border rounded outline-none'>
		     <option>All Category</option>
		     <option>Electronics</option>
		     <option>Grocery</option>
		     <option>Beauty</option>
		    </select>
		    <select className='mx-4 p-2.5 bg-white border rounded outline-none'>
		     <option>Latest</option>
		     <option>Oldest</option>
		     <option>Name</option>
		    </select>
		   </div>
	  </div>

	  <div className='mx-8 shadow rounded'>
	        <div className='flex bg-green-500 text-white p-3 font-bold'>
	         <div className='w-2/6'>order id</div>
	         <div className='w-1/6'>is Paid</div>
	         <div className='w-1/6'>Paid At</div>
	         <div className='w-1/6'>status</div>
	         <div className='w-1/6'>total</div>
	        </div>
	        <div className=''>	 
	          {
	          	orders && orders.map((order,i)=>(
	          	 <div key={i} className={`flex ${order.isPaid ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600'} w-full p-4 border-b`}>
	          	  <Link to={`/order/${order._id}`} className='w-2/6'>
 	          	   <div>{order._id}</div>
	          	  </Link>
	          	  <div  className='w-1/6'>{order.isPaid ? <span>paid</span> : <span>not paid</span>}</div>
	          	  <div  className='w-1/6'>{order.isPaid ? <span>paid at ({moment(order.paidAt).format("MMM Do YY")})</span> : <span>on ({moment(order.createdAt).format("MMM Do YY")}</span>})</div>
	          	  <div  className='w-1/6'>{order.isDelivered ? <span>delivered</span> : <span>not delivered</span>}</div>
	          	  <div className='w-1/6'>{order.totalPrice}</div>
	          	 </div>
	          	))
	          }       	          
	        </div>
	      </div>
	 </div>
	)
}