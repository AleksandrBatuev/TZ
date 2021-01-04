export function user_info(state_user_info = [], action) {
    switch (action.type) {
      case 'USER_INFO_FETCH_DATA_SACCESS':
        return action.user_info;
      default:
        return state_user_info;
    }
  }