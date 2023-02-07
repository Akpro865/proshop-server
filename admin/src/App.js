import Topbar from './comps/Topbar'
import Sidebar from './comps/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './comps/Dashboard'
import Products from './comps/Products'
import AddProduct from './comps/AddProduct'
import Orders from './comps/Orders'
import Order from './comps/Order'
import Categories from './comps/Categories'
import Users from './comps/Users'
import Login from './comps/Login'
import EditProduct from './comps/EditProduct'

export default function App() {
  return (
    <>
     <Topbar />      
     <div className='flex'>
      <Sidebar />
      <div className='w-4/5'>
       <Routes>
        <Route exact path='/' element={<Dashboard />} />
        <Route path='/products' element={<Products />} />
        <Route path='/newproduct' element={<AddProduct />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/order/:id' element={<Order />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/users' element={<Users />} /> 
        <Route path='/login' element={<Login />} />       
        <Route path='/:id/editproduct' element={<EditProduct />} />
       </Routes>       
      </div>
     </div>     
    </>
  )
}

