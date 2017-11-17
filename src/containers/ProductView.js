import React from 'react';
import { connect } from 'react-redux';
import { getProduct, addToCart } from '../actions/index.js';
import { bindActionCreators } from 'redux';
// import cookie from 'react-cookie';

import ProductRender from '../components/ProductRender';
import ImageBox from '../components/ImageBox';

class ProductView extends React.Component {
  componentWillMount() {
    this.props.getProduct(this.props.match.params.id);
  }

  onAddToCart(id) {
    var { product } = this.props;
    var cartProduct = {
      id: product._id,
      name: product.name,
      price: product.price,
      count: 1,
      pathThumb: product.pathsThumb[0]
    };
    this.props.addToCart(cartProduct);
  }

  render(){
    // cookie.save('cart_products', this.props.cart.productsAdded); // Save state to cookie
    var { product } = this.props;

    // const images = [
    //   {
    //     original: 'http://lorempixel.com/1000/600/nature/1/',
    //     thumbnail: 'http://lorempixel.com/250/150/nature/1/',
    //     originalClass: 'featured-slide',
    //     thumbnailClass: 'featured-thumb',
    //     originalAlt: 'original-alt',
    //     thumbnailAlt: 'thumbnail-alt',
    //     description: 'Optional description...',
    //     srcSet: 'Optional srcset (responsive images src)',
    //     size: '500'
    //   },
    //   {
    //     original: 'http://lorempixel.com/1000/600/nature/2/',
    //     thumbnail: 'http://lorempixel.com/250/150/nature/2/'
    //   }
    // ]
    if(!product) {
      return(
        <div>Loading..</div>
      );
    }
    if(product){
    var images = [];
    for(var i = 0; i < product.paths.length; i++) {
      images.push({
        original: product.paths[i],
        thumbnail: product.pathsThumb[i],
        originalClass: 'featured-slide',
        thumbnailClass: 'featured-thumb',
        originalAlt: 'original-alt',
        thumbnailAlt: 'thumbnail-alt'
      });
    }
      return(
        <div>
          <ProductRender
          product={product}
          addToCart={this.onAddToCart.bind(this)}
          images={images}
            />
        </div>
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
