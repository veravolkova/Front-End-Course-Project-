import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

const PasswordForgetPage = () =>
<div class = "container"  style={{display: 'block', width: 350, marginTop: 115, marginBottom: 115, marginLeft: 'auto', marginRight: 'auto'}} > 
    <h2>Forgot password?</h2> 
    <PasswordForgetForm />
  </div>

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    return (
      <div class = "container"  style={{display: 'block', width: 350, marginTop: 15, marginBottom: 15, marginLeft: 'auto', marginRight: 'auto'}} >
      <div class="container">
      <form onSubmit={this.onSubmit} >
       <div class="form-horizontal">
        <input
          class="form-control" 
          style={{width: 320}}
          value={this.state.email}
          onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
          type="text"
          placeholder="Email Address"        />
        
        <button  type="submit" class="btn btn-primary"  style={{width: 320, marginTop: 8}} >
         {/* disabled={isInvalid} */}
          Reset My Password
        </button>

        { error && <p>{error.message}</p> }
        </div>
      </form>
      </div>
      </div>
    );
  }
}

const PasswordForgetLink = () =>
  <p>
    <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};
