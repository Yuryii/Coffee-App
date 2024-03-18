import { createSlice } from '@reduxjs/toolkit'
import CoffeeData from "../data/data/CoffeeData";
import BeansData from "../data/data/BeanData";

const initialState = {
  coffees: CoffeeData,
  beans: BeansData,
  cart: []
}

export const addCartToReducer = createSlice({
  name: 'addCartToReducer',
  initialState,
  reducers: {
    addSizeS: (state, action) => {
      let id = action.payload.idCoffee;
      const coffee = state.coffees.find(item => item.id === id)
      const coffeeHasBeenAddedToCart = state.cart.find(item => item.id === id)
      if (!coffeeHasBeenAddedToCart) {
        const coffeeS = coffee.prices.filter(item => item.size === 'S')
        const newCoffee = { ...coffee, prices: [coffeeS[0]] };
        state.cart = [...state.cart, newCoffee];

      }
      else {
        const hasCoffeeAddedToCartSizeS = coffeeHasBeenAddedToCart.prices.some(item => item.size === 'S');
        if (hasCoffeeAddedToCartSizeS) {
          alert('Sản phẩm với size này đã có rồi - tăng số lượng thêm 1');
          return state;
        }
        else {
          // Thêm size mới vào cùng sản phẩm
          let sizeS = coffee.prices[0];
          const updatedCart = state.cart.map(item => {
            if (item.id === id) {
              return { ...item, prices: [...item.prices, sizeS] };
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
      const coffee = state.coffees.find(item => item.id === id)
      coffeeHasBeenAddedToCart = state.cart.find(item => item.id === id)
      if (!coffeeHasBeenAddedToCart) {
        const coffeeM = coffee.prices.filter(item => item.size === 'M')
        const newCoffee = { ...coffee, prices: [coffeeM[0]] }
        state.cart = [...state.cart, newCoffee]
      }
      else {
        const hasCoffeeAddedToCartSizeM = coffeeHasBeenAddedToCart.prices.some(item => item.size === 'M')
        if (hasCoffeeAddedToCartSizeM) {
          alert('san pham voi size nay da co roi- tang so luong them 1')
          return state;
        }
        else {
          // add size moi vao cung san pham
          const newCoffee = state.coffees.find(item => item.id === id)
          const coffeeM = newCoffee.prices.filter(item => item.size === 'M')
          const index = state.cart.findIndex(item => item.id === id)
          state.cart[index].prices = [...state.cart[index].prices, coffeeM[0]]

        }
      }
    },
    addSizeL: (state, action) => {
      let id = action.payload.idCoffee;
      const coffee = state.coffees.find(item => item.id === id)
      coffeeHasBeenAddedToCart = state.cart.find(item => item.id === id)
      if (!coffeeHasBeenAddedToCart) {
        const coffeeM = coffee.prices.filter(item => item.size === 'L')
        const newCoffee = { ...coffee, prices: [coffeeM[0]] }
        state.cart = [...state.cart, newCoffee]
      }
      else {
        const hasCoffeeAddedToCartSizeM = coffeeHasBeenAddedToCart.prices.some(item => item.size === 'L')
        if (hasCoffeeAddedToCartSizeM) {
          alert('san pham voi size nay da co roi- tang so luong them 1')
          return state;
        }
        else {
          // add size moi vao cung san pham
          const newCoffee = state.coffees.find(item => item.id === id)
          const coffeeM = newCoffee.prices.filter(item => item.size === 'L')
          const index = state.cart.findIndex(item => item.id === id)
          state.cart[index].prices = [...state.cart[index].prices, coffeeM[0]]

        }
      }
    },
    addSize250gm: (state, action) => {
      const bean = state.beans.find(item => item.id === action.payload.idBean)
      if (state.cart.some(item => item.id === bean.id && item.prices.size === bean.prices.size)) {
        alert("This bean is already in the cart.")
        return state;
      }
      const bean250mg = bean.prices.filter(item => item.size === '250gm')
      bean.prices = bean250mg[0]
      state.cart = [...state.cart, bean]
    },
  },
})

// Action creators are generated for each case reducer function
export const { addSizeS, addSizeM, addSizeL, addSize250gm } = addCartToReducer.actions

export default addCartToReducer.reducer