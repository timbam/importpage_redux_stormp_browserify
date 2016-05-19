import React from 'react';
import { UserProfileForm, Authenticated } from 'react-stormpath';
import { Link } from 'react-router';

export default (props) => {
  return(
    <div>
      <UserProfileForm />
      <Authenticated inGroup="Importer">
      <Link to="/add" className="btn btn-default">Add a product</Link>
      </Authenticated>
      <h6>Things to add to this page:</h6>
      <p>Delivery address (Multiple?) </p>
      <p>Card details. Best practices??</p>
    </div>
  );
}