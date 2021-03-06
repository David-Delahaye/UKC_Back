import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import {connect} from 'react-redux';
import {logoutUser} from '../actions/authActions'
import PropTypes from 'prop-types';
import nav from "../modules/nav/nav.module.css";
import Logo from "../images/Logo.png"

class Nav extends Component {
  constructor(props){
    super(props)
    this.state={
      phone: window.innerWidth <= 760,
    }
  }

  showMenu = (e) => {
    console.log('clicked');
    console.log(window.innerWidth)
    const menu = document.querySelector('#menu');
    const burger = document.querySelector('#burger');
    console.log(menu);   
    burger.classList.toggle(nav.closedBurger) 
    menu.classList.toggle(nav.closed) 
  }

  
  logout = async ()=>{
    this.showMenu();
    this.props.logoutUser();
    this.setState({redirect:'/sites'})
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
}

resize() {
    this.setState({phone: window.innerWidth <= 760});
    console.log(this.state.phone);
    
}

componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this));
}

render(){
  const phoneMenu = (
  <div id='menu' className={nav.rightNav + ' ' + nav.phoneMenu + ' ' + nav.closed}>
    <Link onClick={(e) => {this.showMenu(e)}} to="/sites">All Plants</Link>
    <Link onClick={(e) => {this.showMenu(e)}} to="/sites/new">Add Plant</Link>
    <div className={nav.user}>
      <Link>Logged in as {this.props.user.username}</Link>
      <Link onClick={(e) => {this.logout(e)}} to="/sites">Logout</Link>
    </div>
  </div>
  )

  const phoneMenuGuest = (
    <div id='menu' className={nav.rightNav + ' ' + nav.phoneMenu + ' ' + nav.closed}>
      <Link onClick={(e) => {this.showMenu(e)}} to="/sites">All Plants</Link>
      <div className={nav.user}>
        <Link onClick={(e) => {this.showMenu(e)}} to="/login">Login</Link>
        <Link onClick={(e) => {this.showMenu(e)}} to="/register">Register</Link>
      </div>
  </div>
  )

  const menu = (
    <div id='menu' className={nav.rightNav}>
      <Link to="/sites">All Plants</Link>
      <Link to="/sites/new">Add Plant</Link>
      <Link>Logged in as {this.props.user.username}</Link>
      <Logout/>
    </div>
    )
  
    const menuGuest = (
      <div id='menu' className={nav.rightNav}>
        <Link to="/sites">All Plant</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
    </div>
    )

    if (this.state.phone){
    return(
      <nav>
        <Link to="/">UKH <img className='logo'src={Logo}/></Link>
        <div id='burger' className={nav.burger} onClick={(e) => {this.showMenu(e)}}>
          <div/>
          <div/>
          <div/>
        </div>
        {this.props.user.username !== 'guest' ? phoneMenu : phoneMenuGuest}
      </nav>
    )
    }else{
      return(
        <nav>
        <Link to="/">UKH <img className='logo'src={Logo}/></Link>
        {this.props.user.username !== 'guest' ? menu : menuGuest}
      </nav>
      )
    }
}
}

Nav.propTypes = {
  user : PropTypes.object.isRequired,
  logoutUser : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, {logoutUser})(Nav);

