import { useState } from 'react'
import { BiHomeAlt, BiCategoryAlt, BiPurchaseTagAlt, BiUser } from 'react-icons/bi'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { BsCart3 } from 'react-icons/bs'
import { AiOutlineShop } from 'react-icons/ai'
import { FaMoneyCheckAlt } from 'react-icons/fa'
import '../styles/index.css'
import { NavLink } from 'react-router-dom'

export default function Sidebar(){
	return(
	 <div className='w-1/5 fullScreen top-14 left-0 sticky z-50 border-r'>
	 <NavLink to='/' activeClassName='active'>
	  <div className={`flex pl-6 py-3 cursor-pointer rounded hover:bg-cyan-50`}>
	   <div><BiHomeAlt className='text-2xl text-blue-600 mr-3 rounded hover:bg-cyan-50'/></div>	   
	   <div className='flex items-end'>Dashboard</div>
	  </div>
	 </NavLink>

	 <NavLink to='/products' activeClassName='active'>
	  <div className='flex items-center pl-6 py-3 cursor-pointer rounded hover:bg-cyan-50'>
	   <div><HiOutlineShoppingBag className='text-2xl text-blue-600 mr-3'/></div>	   
	   <span>Products</span>
	  </div>
	 </NavLink>

	 <NavLink to='/newproduct' activeClassName='active'>
	  <div className='flex items-center pl-6 py-3 cursor-pointer rounded hover:bg-cyan-50'>
	   <div><BsCart3 className='text-2xl text-blue-600 mr-3'/></div>	   
	   <span>New Product</span>
	  </div>
	 </NavLink>
	 <NavLink to='/orders' activeClassName='active'>
	  <div className='flex items-center pl-6 py-3 cursor-pointer rounded hover:bg-cyan-50'>
	   <div><BiCategoryAlt className='text-2xl text-blue-600 mr-3'/></div>	   
	   <span>Orders</span>
	  </div>
	 </NavLink>

	 <NavLink to='/categories' activeClassName='active'>
	  <div className='flex items-center pl-6 py-3 cursor-pointer rounded hover:bg-cyan-50'>
	   <div><BiPurchaseTagAlt className='text-2xl text-blue-600 mr-3'/></div>	   
	   <span>Categories</span>
	  </div>
	 </NavLink>

	 <NavLink to='/users' activeClassName='active'>
	  <div className='flex items-center pl-6 py-3 cursor-pointer rounded hover:bg-cyan-50'>
	   <div><BiUser className='text-2xl text-blue-600 mr-3'/></div>	   
	   <span>Users</span>
	  </div>
	 </NavLink>

	  <div className='flex items-center pl-6 py-3 cursor-pointer rounded hover:bg-cyan-50'>
	   <div><AiOutlineShop className='text-2xl text-blue-600 mr-3'/></div>	   
	   <span>Sellers</span>
	  </div>

	  <div className='flex items-center pl-6 py-3 cursor-pointer rounded hover:bg-cyan-50'>
	   <div><FaMoneyCheckAlt className='text-2xl text-blue-600 mr-3'/></div>	   
	   <span>Transactions</span>
	  </div>
	 </div>
	)
}