import React, { Component } from 'react';
import {
  Link,
  withRouter,
} from 'react-router-dom';

import { auth, db } from '../../firebase';
import * as routes from '../../constants/routes';

const SignUpPage = ({ history }) =>
<div class = "container"  style={{display: 'block', width: 350, marginTop: 115, marginBottom: 115, marginLeft: 'auto', marginRight: 'auto'}} >
    <h1>SignUp</h1>
    <SignUpForm history={history} />
  </div>

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {

        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(updateByPropertyName('error', error));
          });

      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      username === '' ||
      email === '';

    return (
      <div class = "container"  style={{display: 'block', width: 350, marginTop: 15, marginBottom: 15, marginLeft: 'auto', marginRight: 'auto'}} >
      <div class="form-group">
      <form onSubmit={this.onSubmit}>
        <input
          value={username}
          class="form-control" 
          onChange={event => this.setState(updateByPropertyName('username', event.target.value))}
          type="text"
          placeholder="Full Name"
        />
         <br/>
        <input
          value={email}
          class="form-control" 
          onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
         <br/>
        <input
          value={passwordOne}
          class="form-control" 
          onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
          type="password"
          placeholder="Password"
        />
         <br/>
        <input
          value={passwordTwo}
          class="form-control" 
          onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm Password"
        />
         <br/>
        <button  class="btn btn-primary" type="submit">
        {/* disabled={isInvalid} */}
          Sign Up
        </button>

        { error && <p>{error.message}</p> }
      </form>
      </div>
      </div>
    );
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};