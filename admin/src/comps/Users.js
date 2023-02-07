import profile from '../assets/profile.jpg'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUsers } from '../feature/userSlice'
import { getUser } from '../feature/authSlice'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

export default function Users(){

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const localuser = useSelector(getUser)
	const { users } = useSelector(state=>state.user)
	console.log(users)

	useEffect(()=>{
	 if(!localuser) navigate('/login')
	 if(localuser) dispatch(getUsers(localuser.accessToken))	 
	}, [localuser, dispatch, navigate])

	return(
	 <div className='bg-sky-50'>

	  <h2 className='ml-2 py-3 font-bold text-gray-700'>Customers</h2>	  
	  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
	  {users && users.map((user, i)=> (
	  	<div className='w-64 m-2 rounded-xl overflow-hidden bg-white' key={i}>
	    <div className='bg-green-200 py-10 relative'>
	    <img src={profile} className='h-20 w-20 -bottom-7 left-24 object-cover rounded-full absolute '/>
	    </div>
	    

	    <div className='flex bg-white flex-col justify-center items-center'>
	     <h5 className='mt-7 font-semibold'>{user.name}</h5>	     
	     <h5 className='mt-1'>{user.email}</h5>
	     {/* <h6>{moment(order.paidAt).format("MMM Do YY")}</h6> ) */}
	     <h6 className='text-gray-700 mt-1'>
	      {user.isAdmin ? (<span>Admin</span>) : (<span>customer</span>)}
	     </h6>	     
	    </div>
	    <h6 className='text-gray-700 text-xs mt-1 flex justify-end pb-2 pr-3'>may 12 2022</h6>
	   </div>
	  ) 
	 )}
	 

	  </div>

	 </div>
	)
}