import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

const SignInPage = ({ history }) =>
<div class = "container"  style={{display: 'block', width: 350, marginTop: 115, marginBottom: 115, marginLeft: 'auto', marginRight: 'auto'}} >    
    <h1>Sign In</h1>
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />    
  </div>

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (  
      <div class = "container"  style={{display: 'block', width: 350, marginTop: 15, marginBottom: 15, marginLeft: 'auto', marginRight: 'auto'}} >
     
      <form onSubmit={this.onSubmit}>
 
        <div class="form-group">
        <input
          class="form-control" 
          value={email}
          onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
         <br/>
        <input
          value={password}
          onChange={event => this.setState(updateByPropertyName('password', event.target.value))}
          type="password"
          class="form-control" 
          placeholder="Password"
        />
         </div>
        <button disabled={isInvalid} type="submit" class="btn btn-primary" style={{width: 320}}>
          Sign In
        </button>

        { error && <p>{error.message}</p> }
      </form>
      </div>
    );
  }
}

export default withRouter(SignInPage);

export { SignInForm};
