import { GET_PRODUCTS, GET_PRODUCT, CREATE_PRODUCT, REMOVE_PRODUCT, SEARCH_PRODUCT } from '../actions/index';

const INITIAL_STATE = {product_array: [], product: null };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, product_array: action.payload.data };
    case REMOVE_PRODUCT:
      return { ...state, product_array: action.payload.data };
    case SEARCH_PRODUCT:
      return { ...state, product_array: action.payload.data };      
    case GET_PRODUCT:
      return { ...state, product: action.payload.data };
    default:
      return state;
  }
}