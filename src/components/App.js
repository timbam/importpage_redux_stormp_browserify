import React from 'react';
import Navbar from '../containers/Navbar';

export default class App extends React.Component {
  render() {
    return (
      <div>
        yoyo
        {/* <Navbar history={this.props.history} /> */}
        {this.props.children}
      </div>
    );
  }
}
