import React from 'react';
import ImageGallery from 'react-image-gallery';
import ImageBox from './ImageBox';

export default (props) => {
  var { product } = props;
  var imgSource = product.paths[0];
  console.log(product);
  return (
    <div className="ViewProduct"  >
      <div className="col-sm-5 col-md-5 col-xs-12">
        <ImageBox className="ImageBox" images={props.images} />
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