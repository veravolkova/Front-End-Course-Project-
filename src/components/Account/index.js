import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import withAuthorization from '../Session/withAuthorization';

const AccountPage = ({ authUser }) =>
  <div>
    <h3>Account: {authUser.email}</h3>
    <br></br>
    <h4>Restore Password:</h4>
    <PasswordForgetForm />
    <h4>Change Password:</h4>
    <PasswordChangeForm />
  </div>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(AccountPage);