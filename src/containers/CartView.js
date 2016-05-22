import React from 'react';
import { connect } from 'react-redux';
import { addToCart, removeFromCart, checkOutReq } from '../actions/index.js';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import cookie from 'react-cookie';

import CartRender from '../components/CartRender';

class CartView extends React.Component {
  onAddToCart(product) {
    this.props.addToCart(product);
  }
  onRemoveFromCart(id) {
    this.props.removeFromCart(id);
  }

  onCheckOutReq() {
    this.props.checkOutReq();
  }
  render(){
    var {cart} = this.props;
    cookie.save('cart_products', this.props.cart);
    if(!cart) {
      return (
        <div>Loading..</div>
      );
    }
    if(cart) {
      return(
        <CartRender cart={cart} 
        addToCart={this.onAddToCart.bind(this)} 
        removeFromCart={this.onRemoveFromCart.bind(this)}
        checkOutReq={this.onCheckOutReq.bind(this)} />
      );
    }
  }
}

function mapStateToProps( state ) {
  return { cart : state.cart.productsAdded };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addToCart, removeFromCart, checkOutReq }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CartView);