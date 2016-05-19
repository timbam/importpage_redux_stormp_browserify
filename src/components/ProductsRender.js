import React from 'react';
import { Link } from 'react-router';

export default (props) => {
      var productNodes = props.products.map((product, index) => {
        var imgSource = product.paths[0];
        return (
          <div key={product._id} className={'col-xs-6 col-sm-6 col-md-5'}>
            <div className='thumbnail animated jumbotron'>
                <h3 className="text-center" >{product.name}</h3>
              <Link to={`/products/${product._id}`} className='caption holdImg'>
                <img src={imgSource} />
                 <article>{product.description}</article>
              </Link>
                <h4>
                  <button className='btn btn-transparent' href='/' onClick={props.onRemoveProduct.bind(this, product._id)} ><strong>Delete {product.name}</strong></button>
                </h4>
            </div>
          </div>
        );
      });

    return (
      <div className='container'>
        <div className='row'>
          {productNodes}
        </div>
      </div>
    );
}