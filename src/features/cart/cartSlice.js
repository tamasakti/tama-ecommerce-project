import { createSlice } from "@reduxjs/toolkit";

const initilState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initilState,
  reducers: {
    add: (state, action) => {
      const newItem = action.payload;
      const selectCartIndex = state.items.findIndex(
        (product) => product.id === newItem.id,
      );

      if (selectCartIndex !== -1) {
        state.items[selectCartIndex].quantity += 1;
        state.items[selectCartIndex].totalPrice =
        state.items[selectCartIndex].quantity * newItem.price;

      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }
      
    },
    substractQUantity : (state, action) => {
        const currItems = action.payload
        const selectCartIndex = state.items.findIndex((product) => product.id === currItems.id)
        const subtractItems = currItems.quantity -1

        if(subtractItems < 1) {
            state.items[selectCartIndex].quantity = 0
            state.items.splice(selectCartIndex, 1)
        } else {
            state.items[selectCartIndex].quantity -= 1
            state.items[selectCartIndex].totalPrice = state.items[selectCartIndex].totalPrice - currItems.price
        }
        
    }
  },
  updateTotalPrice : (state, action) => {
    const dataUpdated = action.payload
    const dataConcat = [...state, dataUpdated]
    state.items = dataConcat  
  
  }
});

export const { add, addQuantity, substractQUantity, updateTotalPrice } = cartSlice.actions; // 👈 multiple function
export default cartSlice.reducer;
//Selector
export const selectCartItems = state => state.cart.items
export const selectCartTotalItems = state => state.cart.items.reduce((total, item) => total + item.quantity, 0)
export const selectTotalPricecs = state => state.cart.items.reduce((total, item) => total + item.price, 0)
export const selectSubstractPrices = state => state.cart.items.reduce((total, item) => total - item.price, 0)
export const totalPriceUpdated = state => state.cart.items.reduce((total, item) => total + item.totalPrice, 0)