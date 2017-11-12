import React from 'react';

export default (props) => {
  var {cart} = props;
  var sum = 0;
  var cartProducts = cart.map((product) => {
    sum = sum + product.price * product.count;
    console.log(product);
    return (
        <tr key={product.id}>
          <td><img src={product.pathThumb} /> {product.name}</td>
          <td>{product.price}</td>
          <td>{product.count} 
          <button onClick={props.removeFromCart.bind(this, product.id)} className="btn btn-link" ><span className="glyphicon glyphicon-minus"></span> </button>
          <button className="btn btn-link" onClick={props.addToCart.bind(this, product)} > <span className="glyphicon glyphicon-plus"></span></button> 
          </td>
          <td>{product.price * product.count}</td>
          <td><button className="btn btn-link" onClick={props.removeItemFromCart.bind(this, product.id)} ><span className="glyphicon glyphicon-remove"></span> Remove Product</button></td>
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
              <th>Individual Price</th>
              <th>Number of Items</th>
              <th>Sum</th>
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