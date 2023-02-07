import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './categorySlice'
import productReducer from './productSlice'
import authReducer from './authSlice'
import userReducer from './userSlice'
import orderReducer from './orderSlice'

const userFromLocal = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')) : null

const preloadedState = {
	auth: {
		user: userFromLocal
	}
}


const store = configureStore({
	reducer: {
		categories: categoryReducer,
		products: productReducer,
		auth: authReducer,
		user: userReducer,
		order: orderReducer
	},
	preloadedState
})

export default store