import firebase from '@react-native-firebase/storage';
import '@react-native-firebase/auth';

// import 'firebase/auth';
// import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAUeJYixybjHlvcgLwuFR6hNsGrU3KedpM',
  authDomain: 'apprnv5.firebaseapp.com',
  databaseURL: 'https://apprnv5.firebaseio.com',
  projectId: 'apprnv5',
  storageBucket: 'apprnv5.appspot.com',
  messagingSenderId: '936413085866',
  appId: '1:936413085866:web:be0125b1c93360884990d3',
  measurementId: 'G-MXEB27X8ZW',
};

// export const Firebase = firebase.initializeApp(firebaseConfig);

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig).firestore()
  : firebase.app().firestore();
