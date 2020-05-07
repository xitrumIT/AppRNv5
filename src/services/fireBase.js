import firebase from '@react-native-firebase/storage';
import '@react-native-firebase/auth';
import '@react-native-firebase/database';

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

// let app = firebase.initializeApp(firebaseConfig);
// export const db = app.database();
// export const auth = firebase.auth();
// export const storage = firebase.storage();

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig).firestore()
  : firebase.app().firestore();
