import * as actionTypes from '../actions/actionTypes';

const initialAuthState = {
  isLogin: '',
};

export default (state = initialAuthState, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTH:
      return {...state, isLogin: true};
    case actionTypes.REMOVE_AUTH:
      return {...state, isLogin: false};

    default:
      return state;
  }
};
