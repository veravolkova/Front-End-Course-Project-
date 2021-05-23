import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';

const Navigation = ({ authUser }) =>
  <div>
    { authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    }
  </div>

const NavigationAuth = () =>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
<div className="collapse navbar-collapse" id="navbarNav">
  <ul className="navbar-nav">
    <li className="nav-item active"><Link to={routes.LANDING} className="nav-link">Landing</Link></li>        
    <li className="nav-item"><Link to={routes.HOME} className="nav-link">Home</Link></li>
    <li className="nav-item"><Link to={routes.ACCOUNT} className="nav-link">Account</Link></li>
    <li className="nav-item"><Link to={routes.CUSTOMER} className="nav-link">Customers</Link></li>
    <li className="nav-item"><Link to={routes.TRAINING} className="nav-link">Trainings</Link></li>
    <li className="nav-item"><Link to={routes.CALENDAR} className="nav-link">Calendar</Link></li> 
   
    <li className="nav-item" style= {{marginLeft: 580}}><SignOutButton /></li>
    
   </ul>
  </div>
</nav>

const NavigationNonAuth = () =>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
<div className="collapse navbar-collapse" id="navbarNav">
  <ul className="navbar-nav">
    <li className="nav-item active"><Link to={routes.LANDING} className="nav-link">Landing</Link></li>
    <li className="nav-item"><Link to={routes.SIGN_IN} className="nav-link">Sign In</Link></li>
    </ul>
  </div>
</nav>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);
