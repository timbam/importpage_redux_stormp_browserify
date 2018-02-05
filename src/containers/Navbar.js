import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
// import { LoginLink, LogoutLink, NotAuthenticated, Authenticated } from 'react-stormpath';
import { searchProduct } from '../actions/index.js';
import { browserHistory, Link } from 'react-router-dom';

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { term: ''};
  }
  updateSearchQuery(event) {
    this.setState({term: event.target.value});
  }

  componentWillMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(e){
    console.log(e.srcElement.scrollingElement.scrollTop);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.searchProduct(this.state.term).
    then(() => {
      // this.props.history.push('/products/search?name=' + this.state.term);
      this.setState({ term: ''});
    });
  }

  render(){
    var sum = 0;
    var cartProducts = this.props.cart.productsAdded.map((product) => {
      sum = sum + product.count;
    });
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
              <div className="navbar-header">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                  </button>
                  <Link className="navbar-brand" to="/">Quality Foods</Link>
              </div>
              <div className="collapse navbar-collapse" id="myNavbar">
                  <ul className="nav navbar-nav">
                      {/* <li className="dropdown">
                          <a className="dropdown-toggle" data-toggle="dropdown" href="#">By Category
                              <span className="caret"></span></a>
                          <ul className="dropdown-menu">
                              <li><a href="#">Hams</a></li>
                              <li><a href="#">Olive oil</a></li>
                              <li><a href="#">Cheese</a></li>
                          </ul>
                      </li> */}
                      <li className="dropdown">
                          <a className="dropdown-toggle" data-toggle="dropdown" href="#">Country
                              <span className="caret"></span></a>
                          <ul className="dropdown-menu">
                            <table className="table">
                              <thead className="dropdown-table" >
                                <tr>
                                  <th><a href="#">France</a></th>
                                  <th><a href="#">Italy</a></th>
                                  <th><a href="#">Spain</a></th>
                                </tr>
                              </thead>
                              <tbody className="dropdown-table" >
                                <tr>
                                  <td><a href="#">Sud-Ouest</a></td>
                                  <td><a href="#">Florence</a></td>
                                  <td><a href="#">Cataluna</a></td>
                                </tr>
                                <tr>
                                  <td><a href="#">Alpes</a></td>
                                  <td><a href="#">Cecily</a></td>
                                  <td><a href="#">Basque Country</a></td>
                                </tr>
                              </tbody>
                            </table>
                          </ul>
                      </li>
                  </ul>
                  <ul className="nav navbar-nav navbar-right">
                      {/* <li><Link to="/register"><span className="glyphicon glyphicon-align-left" aria-hidden="true"></span> Sign Up</Link></li> */}
                      {/* <li><Link to="/profile"><span className="glyphicon glyphicon-user"></span> Your Profile </Link></li>
                      <li><Link><span className="glyphicon glyphicon-log-out"></span> Log Out</Link></li> */}
                      <li>
                        <Link to="/add">Add items</Link>
                      </li>
                      <li><Link to="/cart"><span className="glyphicon glyphicon-shopping-cart"><span className="navbar-sum">{sum}</span></span></Link></li>
                  </ul>
                      <form ref='searchForm' className='form-inline input-group' onSubmit={this.handleSubmit.bind(this)}>
                            <input
                            type='text'
                            className='form-control searchBar'
                            placeholder='Search for products'
                            value={this.state.term}
                            onChange={this.updateSearchQuery.bind(this)}
                            onSubmit={this.handleSubmit.bind(this)}
                           />
                            {/* <span className='input-group-btn'>
                              <button className='btn btn-default' onClick={this.handleSubmit.bind(this)}><span className='glyphicon glyphicon-search'></span></button>
                            </span> */}
                      </form>
                 </div>
          </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { cart: state.cart };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchProduct }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(Navbar);
