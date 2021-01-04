export function all_contact(state_all_contact = [], action) {
    switch (action.type) {
      case 'ALL_CONTACT_FETCH_DATA_SACCESS':
        return action.all_contact;
      default:
        return state_all_contact;
    }
  }