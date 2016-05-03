import React from 'react';
import { RegistrationForm } from 'react-stormpath';

export default class RegistrationPage extends React.Component {

  render(){
    return (
      <RegistrationForm className='RegistrationForm' />
    );
  }
}