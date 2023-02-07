import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { url } from '../network'

const initialState = {
	users: []
}

export const getUsers = createAsyncThunk('/user/getUsers', async(token)=>{
	try{
		const { data } = await url.get('/api/user', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		return data
	}catch(err){
		console.log(err)
	}	
})

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, {payload}) => {
      	console.log(payload)
        state.users = payload
      })
    }
})

export default userSlice.reducer