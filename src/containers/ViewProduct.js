import React from 'react';
import { connect } from 'react-redux';
import { getProduct } from '../actions/index.js';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import RenderProduct from '../components/RenderProduct';

class ViewProduct extends React.Component {
  componentWillMount() {
    this.props.getProduct(this.props.params.id);  
  }

  render(){
    var { product } = this.props;
    if(!product) {
      return(
        <div>Loading..</div>
      );
    }
    if(product){
      return(
        <RenderProduct product={product} />
      );
    }
  }
}

function mapStateToProps(state) {
  return { product : state.products.product };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getProduct }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewProduct);