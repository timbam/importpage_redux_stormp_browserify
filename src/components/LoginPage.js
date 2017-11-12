import React from 'react';
import ReactStormpath, { LoginForm } from 'react-stormpath';

export default class LoginPage extends React.Component {
  onFormSubmit(e, next) {
    console.log('form submitted', e.data);
    next();
  }

  render(){
    return (
      <LoginForm onSubmit={this.onFormSubmit.bind(this)} />
    );
  }
}