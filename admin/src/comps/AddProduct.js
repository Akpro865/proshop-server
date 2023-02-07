import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../feature/authSlice'
import '../styles/index.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Toast from './Toast'
import axios from 'axios'
import { createProduct } from '../feature/productSlice'

export default function AddProduct(){
	const [name, setName] = useState("")
	const [brand, setBrand] = useState("")
	const [category, setCategory] = useState("")
	const [desc, setDesc] = useState("")
	const [price, setPrice] = useState(0)
	const [InStock, setInstock] = useState(0)
	const [file, setFile] = useState(null)

	const navigate = useNavigate()
	const user = useSelector(getUser)
	const dispatch = useDispatch()
	const toastId = useRef(null)

	useEffect(()=>{
		if(!user) navigate('/login')
	}, [user, navigate])		

	const handleCreate = async()=>{
		const data = new FormData()
    	data.append("file", file)
    	data.append("upload_preset", "akshop")
		try{
			const res = await axios.post("https://api.cloudinary.com/v1_1/dzyhtuc5s/image/upload", data)

			const { url } = await res.data
			const details = { name, brand, desc, category, price, InStock, img: url }
			console.log(details)			

			await dispatch(createProduct({token: user.accessToken, details}))
			toastId.current = toast.success("product added successfully!")
			navigate('/products')

			//handleUplod()		 
		}catch(err){
		 	console.log(err)
		}
	}

	// const details = { name, brand, desc, category, price, InStock, img }
	// console.log(details)

	// const handleUplod = async()=>{
	// 	if(!name || !brand || !desc || !category || !price || !InStock || !img) {
	// 			toastId.current = toast.error('please add all details')
	// 		}
	// 	try{
	// 		await url.post('/api/products/new', details, {
	// 		headers: {
	// 			Authorization: `Bearer ${user.accessToken}`
	// 		}
	// 		})
	// 		toastId.current = toast.success("product added successfully!")
	// 		navigate('/products')
	// 	}catch(err){
	// 		toastId.current = toast.error(err.message)
	// 	    console.log(err)
	// 	}
	//}
		
	return(
	 <div>
	  <Toast />
	  <h3 className='m-2 font-bold text-2xl flex justify-center text-gray-700'>Add New Product</h3>
	  <div className='flex justify-center'>
	   <div className='w-2/4 flex flex-col boxshado bg-green-5 rounded'>
	    <div className='flex flex-col'>
	     <label className='font-semibold my-1'>Name</label>
	     <input onChange={(e)=>setName(e.target.value)} className='w-full h-11 pl-1 border rounded outline-none' placeholder='your name'/>
	    </div>
	    <div className='flex flex-col'>
	     <label className='font-semibold my-1'>Brand</label>
	     <input onChange={(e)=>setBrand(e.target.value)} className='w-full h-11 pl-1 border rounded outline-none' placeholder='brand name'/>
	    </div>
	    <div className='flex flex-col'>
	     <label className='font-semibold my-1'>Category</label>
	     <input onChange={(e)=>setCategory(e.target.value)} className='w-full h-11 pl-1 border rounded outline-none' placeholder='brand name'/>
	    </div>
	    <div className='flex flex-col'>
	     <label className='font-semibold my-1'>Price</label>
	     <input onChange={(e)=>setPrice(Number(e.target.value))} className='w-full h-11 pl-1 border rounded outline-none' placeholder='price'/>
	    </div>
	    <div className='flex flex-col'>
	     <label className='font-semibold my-1'>Count in Stock</label>
	     <input onChange={(e)=>setInstock(Number(e.target.value))} className='w-full h-11 pl-1 border rounded outline-none' placeholder='stock'/>
	    </div>
	    <div className='flex flex-col'>
	     <label className='font-semibold my-1'>Description</label>
	     <textarea onChange={(e)=>setDesc(e.target.value)} className='w-full pl-1 h-20 border rounded outline-none' placeholder='write something here..'/>
	    </div>
	    <div className='flex flex-col'>
	     <label className='font-semibold my-1'>image</label>
	     <input type='file' onChange={(e)=>setFile(e.target.files[0])} className='w-full border rounded outline-none' placeholder='stock'/>
	    </div>
	    <div className='flex mt-3 justify-center'>
	     <button onClick={handleCreate} className='px-10 py-2.5 rounded bg-green-500 font-bold text-white'>Upload</button>
	    </div>
	   </div>
	  </div>
	 </div>
	)
}