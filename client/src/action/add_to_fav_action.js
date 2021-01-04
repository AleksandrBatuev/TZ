export function add_to_fav_fetch_data_success(add_to_fav) {
    return {
      type: 'ADD_TO_FAV_FETCH_DATA_SACCESS',
      add_to_fav
    }
  }
  export function add_to_fav_fetch_data(url, data) {
    return (dispatch) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(add_to_fav => dispatch(add_to_fav_fetch_data_success(add_to_fav)))
    }
  }
  