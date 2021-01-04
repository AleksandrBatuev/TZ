import { combineReducers } from 'redux';
import { user } from './new_reduce.js';
import { auth } from './auth_reduce.js';
import { exit } from './exit_reduce.js';
import { user_info } from './user_info_reduce.js';
import { all_contact } from './all_contact_reduce.js';
import { add_to_fav } from './add_to_fav_reduce.js';
import { fav_list } from './fav_list_reduce.js';

const root_reducer = combineReducers ({
  user,
  auth,
  exit,
  user_info,
  all_contact,
  add_to_fav,
  fav_list
});

export default root_reducer;
