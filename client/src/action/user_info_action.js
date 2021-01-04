export function user_info_fetch_data_success(user_info) {
    return {
      type: 'USER_INFO_FETCH_DATA_SACCESS',
      user_info
    }
  }
  export function user_info_fetch_data(url, data) {
    return (dispatch) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(user_info => dispatch(user_info_fetch_data_success(user_info)))
    }
  }
  