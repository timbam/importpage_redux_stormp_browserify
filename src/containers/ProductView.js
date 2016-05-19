import React from 'react';
import { connect } from 'react-redux';
import { getProduct, addToCart } from '../actions/index.js';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import cookie from 'react-cookie';

import ProductRender from '../components/ProductRender';

class ProductView extends React.Component {
  componentWillMount() {
    this.props.getProduct(this.props.params.id); 
  }

  onAddToCart(id) {
    var { product } = this.props;
    var cartProduct = {
      id: product._id,
      name: product.name,
      price: product.price,
      count: 1
    };
    this.props.addToCart(cartProduct);
  }

  render(){
    var { product } = this.props;
    cookie.save('cart_products', this.props.cart.productsAdded);
    if(!product) {
      return(
        <div>Loading..</div>
      );
    }
    if(product){
      return(
        <ProductRender product={product} addToCart={this.onAddToCart.bind(this)}  />
      );
    }
  }
}

function mapStateToProps(state) {
  return { product : state.products.product, cart : state.cart };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getProduct, addToCart }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductView);