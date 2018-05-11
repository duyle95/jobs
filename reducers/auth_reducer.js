import { FB_LOGIN_SUCCESS, FB_LOGIN_FAIL } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FB_LOGIN_SUCCESS: 
      return { ...state, token: action.payload };
    case FB_LOGIN_FAIL:
      return { ...state, token: null };
    default: 
      return state;
  }
}