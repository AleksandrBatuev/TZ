import React from 'react';
import { connect } from 'react-redux';
import { read_cookie } from 'sfcookies';
import '../../style.css';
import Button from '../button/button.js';
import { all_contact_fetch_data } from '../../action/all_contact_action.js';
import { add_to_fav_fetch_data } from '../../action/add_to_fav_action.js';
import { fav_list_fetch_data } from '../../action/fav_list_action.js';

class Contacts extends React.Component {

    refrash_data = () => {
        const cookie_key = 'Cookie';
        if (read_cookie(cookie_key).length !== 0) {
            const cookie_key = 'Cookie';
            const data = {
                sess: read_cookie(cookie_key)
            };
            this.props.featchData_fav_list('http://localhost:3001/fav_list', data);
            this.props.featchData_all_contact('http://localhost:3001/all_contact');
        } else if (read_cookie(cookie_key).length === 0) {
            window.location.assign('http://localhost:3000')
        }
    }

    componentDidMount() {
        this.refrash_data();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.all_contact.length === 0) {
            this.refrash_data();
        }
    }

    clik_fav = (e) => {
        const cookie_key = 'Cookie';
        let id = e.target.id;
        const data = {
            sess: read_cookie(cookie_key),
            id: id
        }
        this.props.featchData_add_to_fav('http://localhost:3001/add_to_fav', data);
        this.props.featchData_fav_list('http://localhost:3001/fav_list', data);
    }

    render() {
        const { all_contact, fav_list } = this.props;
        return (
            <div className='account_window'>
                {all_contact.map((contact, index) => {
                    return (
                        <div key={index}>
                            <hr />
                            <div className='contact_blok'>
                                <div className='contact_blok_p'>
                                    <p>{contact.first_name}</p>
                                </div>
                                <div className='contact_blok_p_two'>
                                    <p>{contact.last_name}</p>
                                </div>
                                {fav_list.reduce(( fav, i) => {
                                    if (fav_list.some(i => i.first_name === contact.first_name && i.last_name === contact.last_name)) {
                                        return (
                                            <div key={i}>
                                                <p className='fav_check'>Добавлен</p>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div key={i} >
                                                <Button onClick={this.clik_fav} className='contact_button' id={contact.id} disabled={false} >Добавить в избранное</Button>
                                            </div>
                                        )
                                    }
                                })}
                                {fav_list === [] &&
                                    <Button onClick={this.clik_fav} className='contact_button' id={contact.id} disabled={false} >Добавить в избранное</Button>
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        all_contact: state.all_contact,
        fav_list: state.fav_list
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        featchData_all_contact: (url) => dispatch(all_contact_fetch_data(url)),
        featchData_add_to_fav: (url, data) => dispatch(add_to_fav_fetch_data(url, data)),
        featchData_fav_list: (url, data) => dispatch(fav_list_fetch_data(url, data))
    };
};

export default (connect(mapStateToProps, mapDispatchToProps)(Contacts));
