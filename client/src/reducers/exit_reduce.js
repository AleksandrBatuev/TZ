export function exit(state_exit = [], action) {
    switch (action.type) {
      case 'EXIT_FETCH_DATA_SACCESS':
        return action.exit;
      default:
        return state_exit;
    }
  }
  