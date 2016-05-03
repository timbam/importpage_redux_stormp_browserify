import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { getAllProducts, removeProduct } from '../actions/index';
import RenderProducts from '../components/RenderProducts';

class Home extends React.Component {
  static contextTypes = {
    user: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if(this.props.products.length <= 0){
    this.props.getAllProducts();      
    };
  }

  onRemoveProduct(id) {
    this.props.removeProduct(id);
  }

  render() {
    console.log(this.context.user);
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
      <RenderProducts products={this.props.products} onRemoveProduct={this.onRemoveProduct.bind(this)} />
      );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAllProducts, removeProduct }, dispatch);
}

function mapStateToProps(state) {
  return { products : state.products.product_array };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);