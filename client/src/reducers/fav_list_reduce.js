export function fav_list(state_fav_list = [], action) {
    switch (action.type) {
      case 'FAV_LIST_FETCH_DATA_SACCESS':
        return action.fav_list;
      default:
        return state_fav_list;
    }
  }