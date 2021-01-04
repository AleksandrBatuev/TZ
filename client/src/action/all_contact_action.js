export function all_contact_fetch_data_success(all_contact) {
    return {
      type: 'ALL_CONTACT_FETCH_DATA_SACCESS',
      all_contact
    }
  }
  export function all_contact_fetch_data(url) {
    return (dispatch) => {
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      })
      .then(res => res.json())
      .then(all_contact => dispatch(all_contact_fetch_data_success(all_contact)))
    }
  }
  