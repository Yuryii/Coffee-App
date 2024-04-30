import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchDataFromFirebase } from './rootReducer'
import app from '../data/firebaseConfig';
import getCartData from '../data/data/getCartData';
import { increment } from 'firebase/firestore';
export const fetchCartFromFirebase = createAsyncThunk(
  'data/cartData',
  async (email) => {
    const response = await getCartData(email);
    return response;
  }
);

const initialState = {
  data: [],
  coffeData: [],
  beansData: [],
  cart: [],
  status: 'idle',
  error: null,
  statusCart: 'idle',
  errorCart: null,
  coffeeSearched: [],
  beansSearched: [],
}

export const addCartToReducer = createSlice({
  name: 'addCartToReducer',
  initialState,
  reducers: {
    resetState: () => initialState,
    deleteAllCart: (state) => {
      state.cart = [];
    },
    addCoffeeSize: (state, action) => {
      const size = action.payload.size;
      let id = action.payload.idCoffee;
      const coffee = state.coffeData.find(item => item.id === id)
      coffeeHasBeenAddedToCart = state.cart.find(item => item.id === id)
      if (!coffeeHasBeenAddedToCart) {
        const coffeeM = coffee.price.filter(item => item.size === size)
        const newPrice = [{ ...coffeeM[0], quantity: 1 }]
        const newCoffee = { ...coffee, price: newPrice };
        state.cart = [...state.cart, newCoffee]
      }
      else {
        const hasCoffeeAddedToCartSizeM = coffeeHasBeenAddedToCart.price.some(item => item.size === size)
        if (hasCoffeeAddedToCartSizeM) {
          alert('san pham voi size nay da co roi- tang so luong them 1')
          return state;
        }
        else {
          // add size moi vao cung san pham
          const newCoffee = state.coffeData.find(item => item.id === id)
          const coffeeM = newCoffee.price.filter(item => item.size === size)
          const price = { ...coffeeM[0], quantity: 1 }
          const index = state.cart.findIndex(item => item.id === id)
          state.cart[index].price = [...state.cart[index].price, price]

        }
      }
    },
    addBeanSize: (state, action) => {
      const size = action.payload.size;
      let id = action.payload.idBean;
      const coffee = state.beansData.find(item => item.id === id)
      coffeeHasBeenAddedToCart = state.cart.find(item => item.id === id)
      if (!coffeeHasBeenAddedToCart) {
        const coffeeM = coffee.price.filter(item => item.size === size)
        const newPrice = [{ ...coffeeM[0], quantity: 1 }]
        const newCoffee = { ...coffee, price: newPrice };
        state.cart = [...state.cart, newCoffee]
      }
      else {
        const hasCoffeeAddedToCartSizeM = coffeeHasBeenAddedToCart.price.some(item => item.size === size)
        if (hasCoffeeAddedToCartSizeM) {
          alert('san pham voi size nay da co roi- tang so luong them 1')
          return state;
        }
        else {
          // add size moi vao cung san pham
          const newCoffee = state.beansData.find(item => item.id === id)
          const coffeeM = newCoffee.price.filter(item => item.size === size)
          const price = { ...coffeeM[0], quantity: 1 }
          const index = state.cart.findIndex(item => item.id === id)
          state.cart[index].price = [...state.cart[index].price, price]

        }
      }
    },
    deleteItem: (state, action) => {
      const id = action.payload.id;
      state.cart = state.cart.filter(item => item.id !== id);
    },
    incrementQuantity: (state, action) => {
      const size = action.payload.size;
      const id = action.payload.id;
      const index = state.cart.findIndex(item => item.id === id);
      const price = state.cart[index].price;
      const indexPrice = price.findIndex(item => item.size === size);
      state.cart[index].price[indexPrice].quantity += 1///;
    },
    decrementQuantity: (state, action) => {
      const id = action.payload.id;
      const index = state.cart.findIndex(item => item.id === id);

      // Check if item exists in the cart
      if (index !== -1) {
        const price = state.cart[index].price;
        const indexPrice = price.findIndex(item => item.size === action.payload.size);
        if (state.cart[index].price.length === 1) {
          if (state.cart[index].price[indexPrice].quantity === 1) {
            // delele item in cart
            state.cart = state.cart.filter(item => item.id !== id);
          }
          else {
            state.cart[index].price[indexPrice].quantity -= 1;
          }
        }
        else {
          if (state.cart[index].price[indexPrice].quantity === 1) {
            // delete size in item
            state.cart[index].price = state.cart[index].price.filter(item => item.size !== action.payload.size);
          }
          else {
            // decreate quantity
            state.cart[index].price[indexPrice].quantity -= 1;
          }
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataFromFirebase.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDataFromFirebase.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.coffeData = state.data.filter((item) => item.type === 'Coffee');
        state.beansData = state.data.filter((item) => item.type === 'Bean');
      })
      .addCase(fetchDataFromFirebase.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCartFromFirebase.pending, (state) => {
        state.statusCart = 'loading';
      })
      .addCase(fetchCartFromFirebase.fulfilled, (state, action) => {
        state.statusCart = 'succeeded';
        const cartData = action.payload;
        state.cart = cartData[0].cart;
      })
      .addCase(fetchCartFromFirebase.rejected, (state, action) => {
        state.errorCart = 'failed';
        state.errorCart = action.error.message;
      })
  }
})

// Action creators are generated for each case reducer function
export const { getUser, resetState, deleteItem, incrementQuantity, decrementQuantity, addBeanSize, addCoffeeSize, deleteAllCart } = addCartToReducer.actions

export default addCartToReducer.reducer