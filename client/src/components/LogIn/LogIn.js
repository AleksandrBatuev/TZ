import React from 'react';
import '../../style.css';
import { connect } from 'react-redux';
import Button from '../button/button.js';
import md5 from 'md5';
import { bake_cookie } from 'sfcookies';
import { auth_fetch_data } from '../../action/auth_action.js';

class LogIn extends React.Component {

  state = {
    email: '',
    password: '',
    error_valid: '',
    email_valid: false
  }

  componentDidUpdate(prevProps) {
    if (prevProps.auth !== this.props.auth && this.props.auth.answer) {
      this.setState({error_valid: this.props.auth.answer});
    } else if (prevProps.auth !== this.props.auth && this.props.auth) {
      const cookie_key = 'Cookie';
      bake_cookie(cookie_key, this.props.auth.session_user);
      window.location.assign('http://server/account')
      //this.props.history.push('/account');;
    }
  }

  Auth_click = () => {
    if (this.state.email && this.state.password && !this.state.error_valid) {
      const data = {
        email: this.state.email,
        pass: md5(this.state.password)
      };
      this.props.featchData_auth('http://server/API/auth/auth.php', data);
      this.setState({email: '', password: ''});
    }
  };

  handle_user_input = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value },
      () => { this.validate_field(name, value) });
  }

  validate_field(fieldName, value) {
    let fielf_error_valid = this.state.error_valid;
    let email_valid = this.state.email_valid;
    switch (fieldName) {
      case 'email':
        email_valid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fielf_error_valid = email_valid ? '' : ' Некорректный email';
        break;
      default:
        break;
    }
    this.setState({ error_valid: fielf_error_valid, email_valid: email_valid });
  }

  render() {
    const { email, password, error_valid } = this.state;
    return (
      <div className='auth_window'>
        <p className='auth_text'>Авторизация</p>
        <form>
          <input className='input' onChange={this.handle_user_input} name="email" value={email} placeholder="e-mail" />
          <input className='input' type="password" name="password" onChange={this.handle_user_input} value={password} placeholder="Пароль" />
        </form>
        <Button  className='reg_button' onClick={this.Auth_click}>Вход</Button>
        <p className='error_valid' >{error_valid}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    featchData_auth: (url, data) => dispatch(auth_fetch_data(url, data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
