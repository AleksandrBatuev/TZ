export function add_to_fav(state_add_to_fav = [], action) {
    switch (action.type) {
      case 'ADD_TO_FAV_FETCH_DATA_SACCESS':
        return action.add_to_fav;
      default:
        return state_add_to_fav;
    }
  }