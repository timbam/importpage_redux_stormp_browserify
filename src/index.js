import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
// import ReactStormpath, { HomeRoute, Router, AuthenticatedRoute } from 'react-stormpath';
import ReduxPromise from 'redux-promise';

// reducers, Components & Containers
import reducers from './reducers';
import Navbar from './containers/Navbar';
import App from './components/App';
// import LoginPage from './components/LoginPage';
// import RegistrationPage from './components/RegistrationPage';
import Home from './containers/Home';
import ProductAdd from './containers/ProductAdd';
import ProductView from './containers/ProductView';
import CartView from './containers/CartView';
// import Profile from './containers/Profile';

// const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const createStoreWithMiddleware = compose(
      applyMiddleware(ReduxPromise),
      window.devToolsExtension ? window.devToolsExtension() : f => f
      )(createStore);
// const store = createStore(reducers, compose(
//       applyMiddleware(ReduxPromise),
//       window.devToolsExtension ? window.devToolsExtension() : f => f
//     ));
// useRouterHistory creates a composable higher-order function

// ReactStormpath.init({
//   dispatcher: {
//     type: 'redux',
//     store: createStoreWithMiddleware(reducers)
//   }
// })

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
     <Router>
       <div>
         <Route path="/" component={Navbar} />
         <Route exact path="/" component={Home} />
         <Route path="/add" component={ProductAdd} />
         <Route path="/cart" component={CartView} />
         <Route path="/products/:id" component={ProductView} />
       </div>
      {/* <Route component={Home}> */}


        {/* <Route path="/products/search" component={Home} />
        <Route path="/register" component={RegistrationPage} />
        <Route path="/login" component={LoginPage} />
        {/* <AuthenticatedRoute path="/add" inGroup="Importer" component={ProductAdd} />
        <AuthenticatedRoute path="/profile" component={Profile} /> */}
      {/* </Route> */}
     </Router>
  </Provider>
, document.querySelector('.container'));
