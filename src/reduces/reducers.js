import * as actionTypes from '../actions/actionTypes';

const initialAuthState = {
  isLogin: '',
  user: '',
  email: '',
  password: '',
  error: '',
};

export default (state = initialAuthState, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTH:
      return {...state, isLogin: true};
    case actionTypes.REMOVE_AUTH:
      return {...state, isLogin: false};
    case actionTypes.EMAIL_CHANGED:
      return {...state, email: action.payload};
    default:
      return state;
  }
};
