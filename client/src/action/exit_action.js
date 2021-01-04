export function exit_fetch_data_success(exit) {
    return {
      type: 'EXIT_FETCH_DATA_SACCESS',
      exit
    }
  }
  export function exit_fetch_data(url, data) {
    return (dispatch) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(exit => dispatch(exit_fetch_data_success(exit)))
    }
  }