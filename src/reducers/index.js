import { combineReducers } from 'redux';
import ProductsReducer from './reducer_products';
import CartReducer from './reducer_cart';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  products: ProductsReducer,
  form: formReducer,
  cart: CartReducer
});

export default rootReducer;
