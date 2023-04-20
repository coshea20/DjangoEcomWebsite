import { createStore } from 'vuex'

export default createStore({
  state: {
    cart: {
      items: [],
    },
    isAuthenticated: false,
    token: '',
    isLoading: false
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('cart')) {
        state.cart = JSON.parse(localStorage.getItem('cart'))
      } else {
        //This line of code stores the state.cart object in the browser's local storage, as a stringified JSON object.
        //This allows the cart information to persist across page refreshes and sessions.
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }

      if (localStorage.getItem('tokent')) {
        state.token = localStorage.getItem('token')
        state.isAuthenticated = true
      } else {
        state.token = ''
        state.isAuthenticated = false
      }
    },
    addToCart(state, item) {
      //This code filters the state.cart.items array to find if any item with the
      //same product id as item already exists in the cart.
      //The callback function inside the filter() method is checking if the id of the product
      //of the current item being iterated in the loop is equal to the id of the product of any existing item in the cart.
      const exists = state.cart.items.filter(i => i.product.id === item.product.id)

      if (exists.length) {
        //This code takes the first object in the array exists, access its quantity property, converts it to an integer using 
        //the parseInt() method, and adds it to the quantity property of the item object (also converted to an integer using parseInt()).
        //The resulting sum is then assigned back to the quantity property of the first object in the exists array. 
        //This effectively adds the item quantity to the existing quantity of the first matching object in the exists array.
        exists[0].quantity = parseInt(exists[0].quantity) + parseInt(item.quantity)
      } else {
        state.cart.items.push(item)
      }

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    //This mutation updates the value of the isLoading state property. 
    //The value of isLoading is set to the value of status passed in as the second argument.
    setIsLoading(state, status) {
      state.isLoading = status
    },
    setToken(state, token) {
        state.token = token
        state.isAuthenticated = true
    },
    removeToken(state, token) {
        state.token = ''
        state.isAuthenticated = false
    },

  },
  actions: {
  },
  modules: {
  }
})
