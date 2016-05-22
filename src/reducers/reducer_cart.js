import { ADD_TO_CART, REMOVE_FROM_CART, CHECKOUT_FAILURE, CHECKOUT_REQUEST } from '../actions/index.js';
import cookie from 'react-cookie';
import _ from 'lodash';

const INITIAL_STATE = {
  // addedIds: (cookie.load('cart_addedIds') || []), 
  // quantityById: (cookie.load('cart_quantity') || {}),
  productsAdded: (cookie.load('cart_products') || [])
}
const EMPTY_STATE = {
  productsAdded: []
}


function productsAdded(state = INITIAL_STATE.productsAdded, action) {
  switch (action.type) {
    case ADD_TO_CART:
      var index = _.findIndex(state, function(o) {
        return o.id == action.payload.id;
      });
      if(index !== -1) {
        return state.map((product, i) => {
          if(i == index) {
            return Object.assign({}, product, {
              count: (state[index].count + 1)
            });
          }
          return product;
        })
      }
      return [ ...state, action.payload];
    case REMOVE_FROM_CART:
      var index = _.findIndex(state, function(o) {
        return o.id == action.payload;
      });
      if(index !== -1) {
        return state.map((product, i) => {
          if(i == index) {
            return Object.assign({}, product, {
              count: (state[index].count > 0 ? state[index].count - 1 : 0)
            })
          }
          return product;
        })
      }
    default:
      return state;
  }
}

export default function cart(state = INITIAL_STATE, action) {
  switch (action.type) {
    // Checkout not in play yet..

    case CHECKOUT_REQUEST:
      return EMPTY_STATE;
    // case CHECKOUT_FAILURE:
    //   return action.cart
    default:
      return {
        // addedIds: addedIds(state.addedIds, action),
        // quantityById: quantityById(state.quantityById, action),
        productsAdded: productsAdded(state.productsAdded, action)
      }
  }
}

export function getQuantity(state, productId) {
  return state.quantityById[productId] || 0;
}

export function getAddedIds(state) {
  return state.addedIds;
}


// function addedIds(state = INITIAL_STATE.addedIds, action){
//   switch (action.type) {
//     case ADD_TO_CART:
//       if (state.indexOf(action.payload) !== -1) {
//         return state;
//       };
//       return [ ...state, action.payload];
//     default:
//         return state;
//   }
// }

// function quantityById(state = INITIAL_STATE.quantityById, action) {
//   switch (action.type) {
//     case ADD_TO_CART:
//       const productId = action.payload;
//       return Object.assign({}, state, {
//         [productId]: (state[productId] || 0) + 1
//       })
//     default:
//       return state;
//   }
// }