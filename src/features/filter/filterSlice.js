import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    category : []
}

export const filterSlice = createSlice({
    name : "filter",
    initialState,
    reducers : {
        dataProducts : (state, action) => {
            const payload = action.payload;
            state.category = payload 
        }
    }
})

export const {dataProducts} = filterSlice.actions
export default filterSlice.reducer

export const selectExpensive = state => state.filter.category