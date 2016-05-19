import React from 'react';

export default (props) => {
  var { product } = props;
  var imgSource = product.paths[0];
  return (
    <div className="ViewProduct"  >
      <div className="col-sm-5 col-md-5 col-xs-12 VPholdImg">
        <img className="vpImg" src={imgSource}/>
      </div>
      <div className="col-sm-5 col-md-5 col-xs-8">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      </div>
      <div className="col-sm-2 col-md-2 col-xs-4 VPRightCol">
      <h2>Buy this product</h2>
      <p>{product.price} </p>
      <button className="btn" onClick={props.addToCart.bind(this, product._id)} >Add to cart</button>
      </div>
    </div>
  );
}