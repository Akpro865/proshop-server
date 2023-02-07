import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { url } from '../network'

const currentLocalPay = localStorage.getItem('currentPay') ? JSON.parse(localStorage.getItem('currentPay')) : null

const initialState = {
	orders: null,
	allOrders: [],
}



export const fetchOrders = createAsyncThunk('order/fetchOrders', async({id, token})=>{
	console.log(id, token)
  try{
		const { data } = await url.get(`/api/orders/${id}`, {headers: {
			Authorization: `Bearer ${token}`,
		}})
		return data
	} catch(err) {
		console.log(err) 
	}
})

// get admin orders
export const fetchAllOrders = createAsyncThunk('order/fetchAllOrders', async(token)=>{
	console.log(token)
  try{
		const { data } = await url.get(`/api/orders`, {headers: {
			Authorization: `Bearer ${token}`,
		}})
		return data
	} catch(err) {
		console.log(err)
	}
})

export const SetDeilivered = createAsyncThunk('order/setDelivered', async({token, id})=>{
	try{
		await url.put(`/api/orders/${id}/delivered`, {headers: {
			Authorization: `Bearer ${token}`,
		}})
	}catch(err){
		console.log(err)
	}
})


export const OrderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, {payload}) => {        
				state.orders = payload
        console.log(payload)        
      })
      .addCase(fetchAllOrders.fulfilled, (state, {payload}) => {        
				state.allOrders = payload
        console.log(payload)        
      })
    }
})


export const getOrders  = (state)=>state.order.orders
export const getAllOrders  = (state)=>state.order.allOrders
export default OrderSlice.reducer