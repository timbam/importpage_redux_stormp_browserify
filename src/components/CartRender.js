import React from 'react';

export default (props) => {
  var {cart} = props;
  var sum = 0;
  var cartProducts = cart.map((product) => {
    sum = sum + product.price * product.count;
    return (
        <tr key={product.id}>
          <td>{product.name}</td>
          <td>{product.price}</td>
          <td>{product.count} 
          <button className="btn" onClick={props.removeFromCart.bind(this, product.id)} >-</button> 
          <button className="btn" onClick={props.addToCart.bind(this, product)} >+</button> 
          </td>
          <td>{product.price * product.count}</td>
        </tr>
    );
  });

    return (
      <div>
      <h2>Shopping cart</h2>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Number of Items</th>
              <th>Total Sum</th>
            </tr>
          </thead>
          <tbody>
            {cartProducts}
          </tbody>
        </table>
        <h3>Total Sum: {sum} </h3>
        <button className="btn" onClick={props.checkOutReq.bind(this)}>Reset shopping cart</button>
      </div>
    );    
}