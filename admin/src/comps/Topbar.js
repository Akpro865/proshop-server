import { MdOutlineNotifications, MdOutlineDarkMode }  from 'react-icons/md'
import { FiSettings } from 'react-icons/fi'
import profile from '../assets/profile.jpg'


function Topbar() {
  return (
  	<div className='bg-green-50 h-14 w-full sticky top-0 left-0 z-50'>
  	 <div className='h-full px-10 flex justify-between items-center'>
	    <div className='text-2xl font-bold text-indigo-800'>
	     	AkDashboard
	    </div>
	    <div className='flex gap-2 items-center'>
	      <div className='relative'>
	    	 <MdOutlineNotifications className='bg-cyan-100 rounded-full mx-1 cursor-pointer text-2xl text-blue-800'/>
	    	</div>
	    	<span className='cursor-pointer absolute h-4 w-4 text-xs rounded-full flex items-center justify-center top-1 bg-red-300'>2</span>	    	
	    	<MdOutlineDarkMode className='cursor-pointer text-2xl rounded-full text-blue-800 hover:shadow'/>
	    	<FiSettings className='cursor-pointer text-xl mx-1 rounded-full text-blue-800 hover:shadow hover:bg-green-100'/>
	    	<div className='border mx-2 h-full h-10 borde-blue-300'></div>
	    	<img src={profile} alt='profile' className='cursor-pointer h-9 w-9 rounded-full object-cover' />
	 	</div>
     </div>
    </div>
  )
}

export default Topbar