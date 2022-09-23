import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      const productCheck = state.find(product => product.id === action.payload.id);
      if (productCheck) {
        productCheck.amount += (parseInt(action.payload.amount))
      } else {
        state.push({ id: action.payload.id, amount: (parseInt(action.payload.amount)) });
      }
      toast.success("Product(en) toegevoegd!")
    },
    changeProduct: (state, action) => {
      const productToChange = state.find(product => product.id === action.payload.id);
      if (productToChange && action.payload.action === "inc") {
        productToChange.amount += 1
      } else if (productToChange && action.payload.action === "dec" && productToChange.amount > 1) {
        productToChange.amount -= 1
      }
    },
    removeProduct: (state, action) => {
      const productToRemove = state.find(product => product.id === action.payload.id);
      if (productToRemove) {
        state.splice(state.indexOf(productToRemove), 1);
      }
    },
    clearCart: () => {
      return [];
    }
  },
})

export const { addProduct, removeProduct, clearCart, changeProduct } = cartSlice.actions;

export default cartSlice.reducer;