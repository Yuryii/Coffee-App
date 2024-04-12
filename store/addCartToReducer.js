import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchDataFromFirebase } from './rootReducer'
import app from '../data/firebaseConfig';
import getCartData from '../data/data/getCartData';
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
}

export const addCartToReducer = createSlice({
  name: 'addCartToReducer',
  initialState,
  reducers: {
    addSizeS: (state, action) => {
      let id = action.payload.idCoffee;
      const coffee = state.coffeData.find(item => item.id === id)
      const coffeeHasBeenAddedToCart = state.cart.find(item => item.id === id)
      if (!coffeeHasBeenAddedToCart) {
        const coffeeS = coffee.price.filter(item => item.size === 'S')
        const newCoffee = { ...coffee, price: [coffeeS[0]] };
        state.cart = [...state.cart, newCoffee];
      }
      else {
        const hasCoffeeAddedToCartSizeS = coffeeHasBeenAddedToCart.price.some(item => item.size === 'S');
        if (hasCoffeeAddedToCartSizeS) {
          alert('Sản phẩm với size này đã có rồi - tăng số lượng thêm 1');
          return state;
        }
        else {
          // Thêm size mới vào cùng sản phẩm
          let sizeS = coffee.price[0];
          const updatedCart = state.cart.map(item => {
            if (item.id === id) {
              return { ...item, price: [...item.price, sizeS] };
            }
            return item;
          });
          state.cart = updatedCart;
        }
      }
    }
    ,
    addSizeM: (state, action) => {
      let id = action.payload.idCoffee;
      const coffee = state.coffeData.find(item => item.id === id)
      coffeeHasBeenAddedToCart = state.cart.find(item => item.id === id)
      if (!coffeeHasBeenAddedToCart) {
        const coffeeM = coffee.price.filter(item => item.size === 'M')
        const newCoffee = { ...coffee, price: [coffeeM[0]] }
        state.cart = [...state.cart, newCoffee]
      }
      else {
        const hasCoffeeAddedToCartSizeM = coffeeHasBeenAddedToCart.price.some(item => item.size === 'M')
        if (hasCoffeeAddedToCartSizeM) {
          alert('san pham voi size nay da co roi- tang so luong them 1')
          return state;
        }
        else {
          // add size moi vao cung san pham
          const newCoffee = state.coffeData.find(item => item.id === id)
          const coffeeM = newCoffee.price.filter(item => item.size === 'M')
          const index = state.cart.findIndex(item => item.id === id)
          state.cart[index].price = [...state.cart[index].price, coffeeM[0]]

        }
      }
      const db = getFirestore(app);
      const email = state.user.email;
      const cartCollectionRef = collection(db, 'cart');
      state.cart.forEach(async (item) => {
        await addDoc(cartCollectionRef, { idProduct: item.id, email: email, price: item.price });
      });
    },
    addSizeL: (state, action) => {
      let id = action.payload.idCoffee;
      const coffee = state.coffees.find(item => item.id === id)
      coffeeHasBeenAddedToCart = state.cart.find(item => item.id === id)
      if (!coffeeHasBeenAddedToCart) {
        const coffeeM = coffee.price.filter(item => item.size === 'L')
        const newCoffee = { ...coffee, price: [coffeeM[0]] }
        state.cart = [...state.cart, newCoffee]
      }
      else {
        const hasCoffeeAddedToCartSizeM = coffeeHasBeenAddedToCart.price.some(item => item.size === 'L')
        if (hasCoffeeAddedToCartSizeM) {
          alert('san pham voi size nay da co roi- tang so luong them 1')
          return state;
        }
        else {
          // add size moi vao cung san pham
          const newCoffee = state.coffees.find(item => item.id === id)
          const coffeeM = newCoffee.price.filter(item => item.size === 'L')
          const index = state.cart.findIndex(item => item.id === id)
          state.cart[index].price = [...state.cart[index].price, coffeeM[0]]

        }
      }
    },
    addSize250gm: (state, action) => {
      let id = action.payload.idBean;
      const coffee = state.beans.find(item => item.id === id)
      coffeeHasBeenAddedToCart = state.cart.find(item => item.id === id)
      if (!coffeeHasBeenAddedToCart) {
        const coffeeM = coffee.price.filter(item => item.size === '250gm')
        const newCoffee = { ...coffee, price: [coffeeM[0]] }
        state.cart = [...state.cart, newCoffee]
      }
      else {
        const hasCoffeeAddedToCartSizeM = coffeeHasBeenAddedToCart.price.some(item => item.size === '250gm')
        if (hasCoffeeAddedToCartSizeM) {
          alert('san pham voi size nay da co roi- tang so luong them 1')
          return state;
        }
        else {
          // add size moi vao cung san pham
          const newCoffee = state.coffees.find(item => item.id === id)
          const coffeeM = newCoffee.price.filter(item => item.size === '250gm')
          const index = state.cart.findIndex(item => item.id === id)
          state.cart[index].price = [...state.cart[index].price, coffeeM[0]]

        }
      }
    },
    addSize500gm: (state, action) => {
      let id = action.payload.idBean;
      const coffee = state.beans.find(item => item.id === id)
      coffeeHasBeenAddedToCart = state.cart.find(item => item.id === id)
      if (!coffeeHasBeenAddedToCart) {
        const coffeeM = coffee.price.filter(item => item.size === '500gm')
        const newCoffee = { ...coffee, price: [coffeeM[0]] }
        state.cart = [...state.cart, newCoffee]
      }
      else {
        const hasCoffeeAddedToCartSizeM = coffeeHasBeenAddedToCart.price.some(item => item.size === '500gm')
        if (hasCoffeeAddedToCartSizeM) {
          alert('san pham voi size nay da co roi- tang so luong them 1')
          return state;
        }
        else {
          // add size moi vao cung san pham
          const newCoffee = state.coffees.find(item => item.id === id)
          const coffeeM = newCoffee.price.filter(item => item.size === '500gm')
          const index = state.cart.findIndex(item => item.id === id)
          state.cart[index].price = [...state.cart[index].price, coffeeM[0]]

        }
      }
    },
    addSize1000gm: (state, action) => {
      let id = action.payload.idBean;
      const coffee = state.beans.find(item => item.id === id)
      coffeeHasBeenAddedToCart = state.cart.find(item => item.id === id)
      if (!coffeeHasBeenAddedToCart) {
        const coffeeM = coffee.price.filter(item => item.size === '1000gm')
        const newCoffee = { ...coffee, price: [coffeeM[0]] }
        state.cart = [...state.cart, newCoffee]
      }
      else {
        const hasCoffeeAddedToCartSizeM = coffeeHasBeenAddedToCart.price.some(item => item.size === '1000gm')
        if (hasCoffeeAddedToCartSizeM) {
          alert('san pham voi size nay da co roi- tang so luong them 1')
          return state;
        }
        else {
          // add size moi vao cung san pham
          const newCoffee = state.coffees.find(item => item.id === id)
          const coffeeM = newCoffee.price.filter(item => item.size === '1000gm')
          const index = state.cart.findIndex(item => item.id === id)
          state.cart[index].price = [...state.cart[index].price, coffeeM[0]]

        }
      }
    },
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
        state.cart = action.payload;
      })
      .addCase(fetchCartFromFirebase.rejected, (state, action) => {
        state.errorCart = 'failed';
        state.errorCart = action.error.message;
      })
  }
})

// Action creators are generated for each case reducer function
export const { addSizeS, addSizeM, addSizeL, addSize250gm, getUser } = addCartToReducer.actions

export default addCartToReducer.reducer