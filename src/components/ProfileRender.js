import React from 'react';
import { UserProfileForm, Authenticated } from 'react-stormpath';
import { Link } from 'react-router';



export default (props) => {
  return(
    <div>
      <UserProfileForm>
          <div className='sp-update-profile-form'>
          <div className="row">
            <div className="col-xs-12">
              <div className="form-horizontal">
                <div className="form-group">
                  <label htmlFor="givenName" className="col-xs-12 col-sm-4 control-label">First name</label>
                  <div className="col-xs-12 col-sm-4">
                    <input type="text" className="form-control" id="givenName" name="givenName" placeholder="First name" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="surname" className="col-xs-12 col-sm-4 control-label">Last name</label>
                  <div className="col-xs-12 col-sm-4">
                    <input type="text" className="form-control" id="surname" name="surname" placeholder="Last name" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="col-xs-12 col-sm-4 control-label">Email</label>
                  <div className="col-xs-12 col-sm-4">
                    <input type="email" className="form-control" id="email" name="email" placeholder="Email" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="col-xs-12 col-sm-4 control-label">New Password</label>
                  <div className="col-xs-12 col-sm-4">
                    <input type="password" className="form-control" id="password" name="password" placeholder="New Password" onChange={ props.onPasswordChanged.bind(this) } />
                  </div>
                </div>
                <div >
                  { props.showPasswordVerification ?
                      <div className="form-group">
                        <label htmlFor="password" className="col-xs-12 col-sm-4 control-label">Existing password</label>
                        <div className="col-xs-12 col-sm-4">
                          <input type="password" className="form-control" id="existingPassword" name="existingPassword" placeholder="Existing password" required />
                        </div>
                      </div>
                    :
                      null
                  }
                </div>
                <div key="update-button" className="form-group">
                  <div className="col-sm-offset-4 col-sm-4">
                    <p className="alert alert-danger" spIf="form.error"><span spBind="form.errorMessage" /></p>
                    <p className="alert alert-success" spIf="form.successful">Profile updated.</p>
                    <button type="submit" className="btn btn-primary">
                      <span spIf="!form.processing">Update</span>
                      <span spIf="form.processing">Updating...</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserProfileForm>

      <Authenticated inGroup="Importer">
        <Link to="/add" className="btn btn-default">Add a product</Link>
      </Authenticated>
      <h6>Things to add to this page:</h6>
      <p>Delivery address (Multiple?) </p>
      <p>Card details. Best practices??</p>
    </div>
  );
}