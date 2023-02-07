import { BiCategoryAlt,  BiUser } from 'react-icons/bi'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import '../styles/index.css'

export default function DashCards(){
	return(
	 <>
	 <h2 className='m-2 font-bold text-xl text-gray-700'>Dashboard</h2>
	 <div className='p-3 flex justify-around'>	  
	  <div className='boxshadow flex py-6 px-12 bg-green-100 rounded'>
	   <div className=''><HiOutlineShoppingBag className='text-5xl p-2 rounded-full text-green-400 bg-green-200 mr-3'/></div>	   
	   <div>
 	    <div>Total Products</div>
 	    <div className='font-bold text-2xl flex justify-center'>34</div>
 	   </div>
	  </div>

	  <div className='boxshadow flex py-6 px-12 bg-yellow-50 rounded'>
	   <div><BiCategoryAlt className='text-5xl p-2 rounded-full text-yellow-500 bg-yellow-200 mr-3'/></div>	   
	   <div>
 	    <div>Total Orders</div>
 	    <div className='font-bold text-2xl flex justify-center'>15</div>
 	   </div>
	  </div>

	  <div className='boxshadow flex py-6 px-12 bg-blue-50 rounded'>
	   <div><BiUser className='text-5xl p-2 rounded-full text-blue-400 bg-blue-200 mr-3'/></div>	   
	   <div>
 	    <div>Total Users</div>
 	    <div className='font-bold text-2xl flex justify-center'>22</div>
 	   </div>
	  </div>
	 </div>
	</>
	)
}