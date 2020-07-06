import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

import Nav from './components/Nav';
import NewSite from './components/NewSite';
import Sites from './components/Sites';
import Site from './components/Site';
import Login from './components/Login';
import Register from './components/Register';

import {connect} from 'react-redux';
import {fetchUser} from './actions/authActions'
import PropTypes from 'prop-types';


class App extends Component{
  componentDidMount(){
    this.props.fetchUser();
  }

  render(){
    return(
        <Router>
          <Nav/>
          <div>{this.props.message.content}</div>
          <Switch>
            <Route path="/new">
              <NewSite />
            </Route>
            <Route path="/index">
              <Sites />
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/register">
              <Register/>
            </Route>
            <Route path="/sites/:site">
              <Site/>
            </Route>
          </Switch>
        </Router>
    )
  }
}

App.propTypes = {
  fetchUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  message: state.messages.item
})

export default connect(mapStateToProps, {fetchUser})(App);

