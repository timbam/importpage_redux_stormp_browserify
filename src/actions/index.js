import axios from 'axios';

export const SEARCH_PRODUCT = 'SEARCH_PRODUCT';
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCT = 'GET_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
// export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE';
export const CHECKOUT_REQUEST = 'CHECKOUT_REQUEST';

export function searchProduct(payload) {
  const request = axios.get('/api/products/search?name=' + payload); 
  return {
    type: SEARCH_PRODUCT,
    payload: request
  };
}

export function getAllProducts() {
  const request = axios.get('/api/products/'); 
  return {
    type: GET_PRODUCTS,
    payload: request
  };
}

export function getProduct(id) {
  const request = axios.get('/api/products/' + id); 
  return {
    type: GET_PRODUCT,
    payload: request
  };
}

export function createProduct(form) {
  // Options for Axios to correctly pass the post request
  var opts = {
  transformRequest: function(data) { return data; }
};
  const request = axios.post('/api/upload', form, opts);
  return {
    type: CREATE_PRODUCT,
    payload: request
  };
}

export function removeProduct(id) {
  const request = axios.post('/api/remove', {id:id});

  return {
    type: REMOVE_PRODUCT,
    payload: request
  };
}

// export function addToCart(productId) { 
//   return {
//     type: ADD_TO_CART,
//     payload: productId
//   };
// }

export function addToCart(product) {
  return {
    type: ADD_TO_CART,
    payload: product
  };
}

export function removeFromCart(id) {
  return {
    type: REMOVE_FROM_CART,
    payload: id
  };
}

export function checkOutReq() {
  return{
    type: CHECKOUT_REQUEST
  };
}

export function checkOutFail() {
  return{
    type: CHECKOUT_FAILURE
  };
}