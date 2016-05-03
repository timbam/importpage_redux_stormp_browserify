import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { LoginLink, LogoutLink, NotAuthenticated, Authenticated } from 'react-stormpath';
import { searchProduct } from '../actions/index.js';
import { browserHistory } from 'react-router'

class Navbar extends React.Component {
  static contextTypes = {
    user: React.PropTypes.object,
    router: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = { term: ''};
  }
  updateSearchQuery(event) {
    this.setState({term: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.searchProduct(this.state.term).
    then(() => {
      browserHistory.push('/products/search?name=' + this.state.term);
      this.setState({ term: ''});
    });
  }

  render(){
    console.log(this.context.user);
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
              <div className="navbar-header">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand" href="/">Quality Foods</a>
              </div>
              <div className="collapse navbar-collapse" id="myNavbar">
                  <ul className="nav navbar-nav">
                      <li className="dropdown">
                          <a className="dropdown-toggle" data-toggle="dropdown" href="#">By Category
                              <span className="caret"></span></a>
                          <ul className="dropdown-menu">
                              <li><a href="#">Hams</a></li>
                              <li><a href="#">Olive oil</a></li>
                              <li><a href="#">Cheese</a></li>
                          </ul>
                      </li>
                      <li className="dropdown">
                          <a className="dropdown-toggle" data-toggle="dropdown" href="#">France
                              <span className="caret"></span></a>
                          <ul className="dropdown-menu">
                              <li><a href="#">Sud-Ouest</a></li>
                              <li><a href="#">etc</a></li>
                              <li><a href="#">Page 1-3</a></li>
                          </ul>
                      </li>
                      <li className="dropdown">
                          <a className="dropdown-toggle" data-toggle="dropdown" href="#">Italy
                              <span className="caret"></span></a>
                          <ul className="dropdown-menu">
                              <li><a href="#">Page 1-1</a></li>
                              <li><a href="#">Page 1-2</a></li>
                              <li><a href="#">Page 1-3</a></li>
                          </ul>
                      </li>
                      <li className="dropdown">
                          <a className="dropdown-toggle" data-toggle="dropdown" href="#">Spain
                              <span className="caret"></span></a>
                          <ul className="dropdown-menu">
                              <li><a href="#">Page 1-1</a></li>
                              <li><a href="#">Page 1-2</a></li>
                              <li><a href="#">Page 1-3</a></li>
                          </ul>
                      </li>
                  </ul>
                  <ul className="nav navbar-nav navbar-right">
                    <NotAuthenticated>
                      <li> <a href="/login"><span className="glyphicon glyphicon-log-in"></span> Log In </a></li>
                    </NotAuthenticated>
                    <NotAuthenticated>
                      <li><a href="/register"><span className="glyphicon glyphicon-align-left" aria-hidden="true"></span> Sign Up</a></li>
                    </NotAuthenticated>
                    <Authenticated>
                      <li><a href="/add"><span className="glyphicon glyphicon-plus"></span> Add a product</a></li>
                    </Authenticated>
                    <Authenticated>
                        <li><LogoutLink><span className="glyphicon glyphicon-log-out"></span> Log Out</LogoutLink></li>
                    </Authenticated>
                      {/*<li><a href="/add"><span className="glyphicon glyphicon-shopping-cart"></span> Your items</a></li>*/}
                  </ul>
                  <ul className="nav navbar-left animated">
                    <li>
                    <form ref='searchForm' className='navbar-form' onSubmit={this.handleSubmit.bind(this)}>
                      <div className='input-group'>
                        <input 
                        type='text' 
                        className='form-control' 
                        placeholder='Search for products' 
                        value={this.state.term} 
                        onChange={this.updateSearchQuery.bind(this)} />
                        <span className='input-group-btn'>
                          <button className='btn btn-default' onClick={this.handleSubmit.bind(this)}><span className='glyphicon glyphicon-search'></span></button>
                        </span>
                      </div>
                    </form>            
                    </li>
                  </ul>
                 </div>
          </div>
      </nav>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchProduct }, dispatch);
}

export default connect(null, mapDispatchToProps)(Navbar);