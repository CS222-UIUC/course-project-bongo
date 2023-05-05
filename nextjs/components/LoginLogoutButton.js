import React from 'react';

export default class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = { isLoggedIn: false };
  }

  componentDidUpdate(prevProps) {
    if (this.props.isLoggedIn !== prevProps.isLoggedIn) {
      this.setState({ isLoggedIn: this.props.isLoggedIn });
    }
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
    this.props.onLogout();
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton form={this.props.form} onClick={this.props.onClick} />;
    }

    return <div>{button}</div>;
  }
}

function LoginButton(props) {
  return (
    <button type={props.form ? 'submit' : 'button'} onClick={props.onClick} className="btn">
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick} className="btn btn--alt">
      Logout
    </button>
  );
}
