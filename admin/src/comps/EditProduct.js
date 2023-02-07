import { useState, useEffect, useRef } from 'react'
import { url } from '../network'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../feature/authSlice'
import { updateProduct, resetProduct, getProduct, fetchProduct } from '../feature/productSlice'
import '../styles/index.css'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import Toast from './Toast'

export default function EditProduct(){	
	const product = useSelector(getProduct)
	console.log(product)
	const [name, setName] = useState("")
	const [brand, setBrand] = useState("")
	const [category, setCategory] = useState("")
	const [desc, setDesc] = useState("")
	const [price, setPrice] = useState(0)
	const [InStock, setInstock] = useState(0)
	const [img, setImg] = useState("")

	// const [name, setName] = useState()
	// const [brand, setBrand] = useState()
	// const [category, setCategory] = useState()
	// const [desc, setDesc] = useState()
	// const [price, setPrice] = useState()
	// const [InStock, setInstock] = useState()
	// const [img, setImg] = useState()

	const dispatch = useDispatch()	
	const navigate = useNavigate()
	const { id } = useParams()
	const user = useSelector(getUser)		
	const toastId = useRef(null)

	useEffect(()=>{
		if(!user) navigate('/login')
		if(!product.name || product._id !== id){
		 dispatch(fetchProduct(id))		
		}else{
		 setName(product.name)
		 setBrand(product.brand)
		 setCategory(product.category)
		 setDesc(product.desc)
		 setPrice(product.price)
		 setInstock(product.InStock)
		 setImg(product.img)
		}
		// return ()=>{
		// 	dispatch(resetProduct())
		// }			
	}, [user, navigate, dispatch, id, product])		

	const details = { name, brand, desc, category, price, InStock, img }	

	console.log("details", details)

	const handleUpdate = ()=>{
		try{			
			dispatch(updateProduct({token: user.accessToken, id, details }))
			toastId.current = toast.success("product updated successfully!")
			navigate('/products')
		}catch(err){
			toastId.current = toast.error(err.message)
		}
	}
	
	return(
	 <div>
	  <Toast />	  
	  {product ? (
	  	<div className='flex justify-center'>
	   <div className='w-2/4 flex flex-col boxshado bg-green-5 rounded'>
	    <div className='flex flex-col'>
	     <label className='font-semibold my-1'>Name</label>
	     <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full h-11 pl-1 border rounded outline-none' placeholder='your name'/>
	    </div>
	    <div className='flex flex-col'>
	     <label className='font-semibold my-1'>Brand</label>
	     <input onChange={(e)=>setBrand(e.target.value)} value={brand} className='w-full h-11 pl-1 border rounded outline-none' placeholder='brand name'/>
	    </div>
	    <div className='flex flex-col'>
	     <label className='font-semibold my-1'>Category</label>
	     <input onChange={(e)=>setCategory(e.target.value)} value={category} className='w-full h-11 pl-1 border rounded outline-none' placeholder='brand name'/>
	    </div>
	    <div className='flex flex-col'>
	     <label className='font-semibold my-1'>Price</label>
	     <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full h-11 pl-1 border rounded outline-none' placeholder='price'/>
	    </div>
	    <div className='flex flex-col'>
	     <label className='font-semibold my-1'>Count in Stock</label>
	     <input onChange={(e)=>setInstock(e.target.value)} value={InStock} className='w-full h-11 pl-1 border rounded outline-none' placeholder='stock'/>
	    </div>
	    <div className='flex flex-col'>
	     <label className='font-semibold my-1'>Description</label>
	     <textarea onChange={(e)=>setDesc(e.target.value)} value={desc} className='w-full pl-1 h-20 border rounded outline-none' placeholder='write something here..'/>
	    </div>
	    <div className='flex flex-col'>
	     <label className='font-semibold my-1'>img url</label>
	     <input onChange={(e)=>setImg(e.target.value)} value={img} className='w-full h-11 pl-1 border rounded outline-none' placeholder='stock'/>
	    </div>
	    <div className='flex flex-col'>
	     <label className='font-semibold my-1'>image</label>
	     <input type='file' className='w-full border rounded outline-none' placeholder='stock'/>
	    </div>
	    <div className='flex mt-3 justify-center'>
	     <button onClick={handleUpdate} className='px-10 py-2.5 rounded bg-green-500 font-bold text-white'>Update</button>
	    </div>
	   </div>
	  </div>
	  ) : (
	   <h2>Loading</h2>
	  )}	  
	 </div>
	)
}