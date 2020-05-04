import * as actionTypes from './actionTypes';
import firebase from '../config/fireBase';
export const setAuth = () => {
  console.log('go action set auth');
  return {
    type: actionTypes.SET_AUTH,
  };
};
export const removeAuth = () => {
  console.log('go action set auth');
  return {
    type: actionTypes.REMOVE_AUTH,
  };
};

// export const getToken = token => {
//   return {
//     type: GET_TOKEN,
//     token,
//   };
// };

// export const setUser = user => {
//   return {
//     type: SET_USER,
//     user,
//   };
// };

// export const logout = () => {
//   return {
//     type: LOGOUT,
//   };
// };

// export const updateEmail = email => {
//   return {
//     type: UPDATE_EMAIL,
//     payload: email,
//   };
// };

// export const updatePassword = password => {
//   return {
//     type: UPDATE_PASSWORD,
//     payload: password,
//   };
// };

export const signin = (email, password, callback) => async (dispatch) => {
  try {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        dispatch({type: SIGNIN_SUCCESS});
        callback();
      })
      .catch(() => {
        dispatch({
          type: SIGNIN_ERROR,
          payload: 'Invalid login credentials',
        });
      });
  } catch (err) {
    dispatch({type: SIGNIN_ERROR, payload: 'Invalid login credentials'});
  }
};

export const signup = (email, password) => async (dispatch) => {
  try {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((dataBeforeEmail) => {
        firebase.auth().onAuthStateChanged(function (user) {
          user.sendEmailVerification();
        });
      })
      .then((dataAfterEmail) => {
        firebase.auth().onAuthStateChanged(function (user) {
          if (user.emailVerified) {
            // Email is verified
            dispatch({
              type: SIGNUP_SUCCESS,
              payload:
                'Your account was successfully created! Now you need to verify your e-mail address, please go check your inbox.',
            });
          } else {
            // Email is not verified
            dispatch({
              type: SIGNUP_ERROR,
              payload:
                "Something went wrong, we couldn't create your account. Please try again.",
            });
          }
        });
      })
      .catch(function (error) {
        dispatch({
          type: SIGNUP_ERROR,
          payload:
            "Something went wrong, we couldn't create your account. Please try again.",
        });
      });
  } catch (err) {
    dispatch({
      type: SIGNUP_ERROR,
      payload:
        "Something went wrong, we couldn't create your account. Please try again.",
    });
  }
};
