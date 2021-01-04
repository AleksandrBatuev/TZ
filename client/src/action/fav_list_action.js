export function fav_list_fetch_data_success(fav_list) {
    return {
      type: 'FAV_LIST_FETCH_DATA_SACCESS',
      fav_list
    }
  }
  export function fav_list_fetch_data(url, data) {
    return (dispatch) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(fav_list => dispatch(fav_list_fetch_data_success(fav_list)))
    }
  }
  