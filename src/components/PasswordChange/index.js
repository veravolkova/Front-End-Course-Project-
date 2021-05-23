import React, { Component } from 'react';
import { auth } from '../../firebase';

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    auth.doPasswordUpdate(passwordOne)
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
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '';

    return (
      <div class="container" style={{ display: 'block', width: 350, marginTop: 15, marginBottom: 15, marginLeft: 'auto', marginRight: 'auto' }} >
        <div class="container">
          <form onSubmit={this.onSubmit} class="form-inline">
            <div class="form-group mb-2">
              <input
                class="form-control"
                style={{ width: 320 }}
                value={passwordOne}
                onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
                type="password"
                placeholder="New Password"
              />
            </div>

            <div class="form-group mb-2">
              <input
                class="form-control"
                style={{ width: 320 }}
                value={passwordTwo}
                onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
                type="password"
                placeholder="Confirm New Password"
              />
            </div>
            <div class="form-group mb-2">
              <button type="submit" style={{ width: 320 }} class="btn btn-primary">
                Reset My Password
        </button>
            </div>

            {error && <p>{error.message}</p>}
          </form>
        </div>
      </div>
    );
  }
}

export default PasswordChangeForm;