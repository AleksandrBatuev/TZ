import React from 'react';
import { Link } from 'react-router-dom';
import '../../style.css';
import Button from '../button/button.js';
import { read_cookie, delete_cookie } from 'sfcookies';
import { connect } from 'react-redux';
import { exit_fetch_data } from '../../action/exit_action.js';

class Header extends React.Component {

    componentDidUpdate(prevProps) {
        if (prevProps.exit !== this.props.exit && this.props.exit.answer === 'ОК') {
            const cookie_key = 'Cookie';
            delete_cookie(cookie_key);
            window.location.assign('http://localhost:3000')
        }
    }

    clik_exit = () => {
        const cookie_key = 'Cookie';
        const data = {
            sess: read_cookie(cookie_key)
        };
        this.props.featchData_exit('http://localhost:3001/exit', data);
      }

    render() {
        if (window.location.href === 'http://localhost:3000/' ||
            window.location.href === 'http://localhost:3000/login' ||
            window.location.href === 'http://localhost:3000/registration') {
            return (
                <div className='header'>
                    <div className='center'>
                        <Link to='/registration' className='header_button'>Регистрация</Link>
                        <Link to='/login' className='header_button'>Авторизация</Link>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='header'>
                    <div className='center'>
                        <Link to = '/account' className = 'header_button'>Аккаунт</Link>
                        <Link to = '/contacts' className = 'header_button'>Контакты</Link>
                        <Link to = '/favorites' className = 'header_button'>Избранное</Link>
                        <Button onClick = {this.clik_exit} className = 'exit_button'>Выход</Button>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        exit: state.exit
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      featchData_exit: (url, data) => dispatch(exit_fetch_data(url, data))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Header);