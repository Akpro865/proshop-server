import { BsSearch } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts, fetchProducts } from '../feature/productSlice'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import { toast } from 'react-toastify';
import Toast from './Toast'
import { url } from '../network'
import { getUser } from '../feature/authSlice'

export default function Products(){
	const dispatch = useDispatch()
	const products = useSelector(getProducts)
	const toastId = useRef(null)
	const user = useSelector(getUser)

	useEffect(()=>{	 
	 dispatch(fetchProducts())
	}, [])

	const handleDelete = async(id)=>{
		try{
		 await url.delete(`/api/products`, {
		 	headers: {
		 		Authorization: `Bearer ${user.accessToken}`
		 	},
		 	data: {
		 		id: id
		 	}
		 })

		 toastId.current = toast.success('product deleted successfully')
		 window.location.reload(false)
		}catch(err){
			toastId.current = toast.error(err.message)
			console.log(err)
		}
	}
	return(
	 <div className='m-2'>	
	  <Toast />  
	  <div className='flex justify-between mr-5 my-4'>
	   <h3 className='text-2xl font-bold text-gray-800'>All Products</h3>
	   <div>
	    <button className='bg-green-500 text-white font-bold px-4 py-2 rounded'>Create</button>
	   </div>
	  </div>
	  <div className='my-4 flex justify-between rounded p-3 items-center'>
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

	  <div className='grid rounded lg:grid-cols-4 sm:grid-cols-3 grid-cols-1'>
	   {
	   	products.map((product, i) => (
	   	  
	   	  <div className='border m-3 rounded'>
	   	  <Link to={`/product/${product._id}`} key={i}>
		   	<div className='flex justify-center'>
		   	  <img src={product.img} className='h-40 object-cover hover:scale-100'/>
		   	</div>
		   	<div className='flex flex-col justify-center items-center'>
		   	  <h3 className='my-1 font-bold '>{product.name}</h3>	   	   
		   	  <h3 className='my-1 font-bold text-xl'>₹{product.price}</h3>
		   	</div>
	   	   </Link>
	   	   <div className='flex'>	   	    
	   	    <Link to={`/${product._id}/editproduct`} className='w-1/2 bg-green-100 p-2 cursor-pointer flex justify-center items-center'>
	   	     <div><FaEdit className='text-xl font-bold text-green-400'/></div>
	   	    </Link>	   	    
	   	    <div onClick={()=>handleDelete(product._id)} className='w-1/2 bg-red-100 p-2 cursor-pointer flex justify-center items-center'><AiFillDelete className='text-red-400 text-xl font-bold'/></div>
	   	   </div>
	   	  </div>	   	  
	   	))
	   }
	  </div>
	 </div>
	)
}