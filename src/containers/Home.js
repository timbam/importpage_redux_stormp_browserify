import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { getAllProducts, removeProduct, searchProduct } from '../actions/index';
import ProductsRender from '../components/ProductsRender';
import cookie from 'react-cookie';

class Home extends React.Component {
  static contextTypes = {
    user: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  }
  componentWillMount() {
    // If a search has been done, render search results. If not, render all products (Or top 20 or something)
    if(this.props.location.query.name !== undefined){
      this.props.searchProduct(this.props.location.query.name);
    }
    else if(this.props.products <= 0){
    this.props.getAllProducts();      
    };
  }

  componentWillUnmount() {
  }
  onRemoveProduct(id) {
    this.props.removeProduct(id);
  }

  render() {
      if(!this.props.products){
        return (
          <div className='container'>
            <div className='row'>
              <div className="jumbotron"> 
               Loading..
              </div>
            </div>
          </div>
        );
      }
      return(
      <ProductsRender products={this.props.products} onRemoveProduct={this.onRemoveProduct.bind(this)} />
      );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAllProducts, removeProduct, searchProduct }, dispatch);
}

function mapStateToProps(state) {
  return { products : state.products.product_array };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);