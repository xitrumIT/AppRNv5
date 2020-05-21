import React, {Fragment, Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  Button,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import {CustomHeader} from '../Drawer/CustomHeader';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/storage';
import AsyncStorage from '@react-native-community/async-storage';
// import FirebaseClient from '../../services/fireBase';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RNFetchBlob from 'rn-fetch-blob';
import uuidv4 from 'uuid';

try {
  firebase.initializeApp({
    apiKey: 'AIzaSyAUeJYixybjHlvcgLwuFR6hNsGrU3KedpM',
    authDomain: 'apprnv5.firebaseapp.com',
    databaseURL: 'https://apprnv5.firebaseio.com',
    projectId: 'apprnv5',
    storageBucket: 'apprnv5.appspot.com',
    messagingSenderId: '936413085866',
  });
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error raised', err.stack);
  }
}

const storage = firebase.storage();
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export class HomeScreenDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader title="Home Detail" navigation={this.props.navigation} />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({});
