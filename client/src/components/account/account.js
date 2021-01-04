import React from 'react';
import { connect } from 'react-redux';
import { read_cookie } from 'sfcookies';
import '../../style.css';
import { user_info_fetch_data } from '../../action/user_info_action.js';

class Account extends React.Component {

  refrash_data = () => {
    const cookie_key = 'Cookie';
    if (read_cookie(cookie_key).length !== 0) {
      let data = {
        sess: read_cookie(cookie_key)
      }
      this.props.featchData_user_info('http://localhost:3001/acc_info', data);
    } else if (read_cookie(cookie_key).length === 0) {
        window.location.assign('http://localhost:3000')
    }
  }

  componentDidMount() {
    this.refrash_data();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user_info.length === 0) {
      this.refrash_data();
    }
  }

  render() {
    const { user_info } = this.props;
    return (
      <div className = 'account_window'>
        <div className = 'user_info_block'>
            <p className = 'user_info_el'>Имя: {user_info.first_name}</p>
            <p className = 'user_info_el'>Фамилия: {user_info.last_name}</p>
            <p className = 'user_info_el'>Прочая информация</p>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    user_info: state.user_info
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    featchData_user_info: (url, data) => dispatch(user_info_fetch_data(url, data))
  };
};

export default (connect(mapStateToProps, mapDispatchToProps)(Account));
