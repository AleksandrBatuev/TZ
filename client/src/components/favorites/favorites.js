import React from 'react';
import { connect } from 'react-redux';
import { read_cookie } from 'sfcookies';
import '../../style.css';
import { fav_list_fetch_data } from '../../action/fav_list_action.js';

class Favorites extends React.Component {

    refrash_data = () => {
        const cookie_key = 'Cookie';
        if (read_cookie(cookie_key).length !== 0) {
            let data = {
                sess: read_cookie(cookie_key)
            }
            this.props.featchData_fav_list('http://localhost:3001/fav_list', data);
        } else if (read_cookie(cookie_key).length === 0) {
            window.location.assign('http://localhost:3000')
        }
    }

    componentDidMount() {
        this.refrash_data();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.fav_list.length === 0) {
            this.refrash_data();
        }
    }

    render() {
        const { fav_list } = this.props;
        return (
            <div className='account_window'>
                <div>
                {
                    fav_list.map((e, i) => {
                        return (
                            <div key={i}>
                                <hr />
                                <div className='contact_blok'>
                                    <div className='contact_blok_p'>
                                        <p>{e.first_name}</p>
                                    </div>
                                    <div className='contact_blok_p_two'>
                                        <p>{e.last_name}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        fav_list: state.fav_list
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        featchData_fav_list: (url, data) => dispatch(fav_list_fetch_data(url, data))
    };
};

export default (connect(mapStateToProps, mapDispatchToProps)(Favorites));
