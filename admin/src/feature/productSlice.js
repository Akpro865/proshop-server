import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { url } from '../network'

const initialState = {
	products: [],
	product: {}
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async()=>{
  try{
		const { data } = await url.get('/api/products')
		return data
	} catch(err) {
		console.log(err)
	}
})

export const createProduct = createAsyncThunk('products/creteProduct', async({token, details})=>{
	console.log(details)
	try{
		const { data } = await url.post('/api/products/new', details, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
	}catch(err){
		console.log(err)
	}
})
export const fetchProduct = createAsyncThunk('products/fetchProduct', async(id)=>{	
  try{
		const { data } = await url.get(`/api/products/${id}`)
		return data
	} catch(err) {
		console.log(err)
	}
})

export const updateProduct = createAsyncThunk('products/updateProduct', async({token, id, details})=>{
	try{
		const { data } = await url.put(`/api/products/${id}/edit`, details, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
	}catch(err){
		console.log(err)
	}
})

export const ProductSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		resetProduct: (state)=>{
			state.product = {}
		}
	},
	extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, {payload}) => {
        state.products = payload
      })
      .addCase(fetchProduct.fulfilled, (state, {payload}) => {
        state.product = payload
      })
    }
})

export const { resetProduct } = ProductSlice.actions
export const getProducts  = (state)=>state.products.products
export const getProduct  = (state)=>state.products.product
export default ProductSlice.reducer