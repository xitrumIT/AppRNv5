import React, {Component} from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Alert,
  SafeAreaView,
  Animated,
  ActivityIndicator,
} from 'react-native';

import {CustomHeader} from '../Drawer/CustomHeader';
import ImagePicker from 'react-native-image-picker';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/storage';
// import FirebaseClient from '../../services/fireBase';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RNFetchBlob from 'react-native-fetch-blob';

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
const FirebaseClient = {
  apiKey: 'AIzaSyAUeJYixybjHlvcgLwuFR6hNsGrU3KedpM',
  authDomain: 'apprnv5.firebaseapp.com',
  databaseURL: 'https://apprnv5.firebaseio.com',
  projectId: 'apprnv5',
  storageBucket: 'apprnv5.appspot.com',
};
firebase.initializeApp(FirebaseClient);

export class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      imgSource: '',
      image_uri: 'https://avatars0.githubusercontent.com/u/12028011?v=3&s=200',
    };
    this.getImage = this.getImage.bind(this);
  }
  componentDidMount() {}

  signOutUser = async () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // this.props.removeAuth();
        this.props.navigation.navigate('Login');
      })
      .catch((error) => this.setState({errorMessage: error.message}));
  };
  // signOut = async () => {
  //   try {
  //     await GoogleSignin.revokeAccess();
  //     await GoogleSignin.signOut();
  //     this.setState({user: null, loggedIn: false});
  //     this.props.navigation.navigate('Login'); // Remember to remove the user from your app's state as well
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  uploadImage(uri, mime = 'application/octet-stream') {
    return new Promise((resolve, reject) => {
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      let uploadBlob = null;

      const imageRef = firebase.storage().ref('images').child('image_001');

      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, {type: `${mime};BASE64`});
        })
        .then((blob) => {
          uploadBlob = blob;
          return imageRef.put(blob, {contentType: mime});
        })
        .then(() => {
          uploadBlob.close();
          return imageRef.getDownloadURL();
        })
        .then((url) => {
          resolve(url);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getImage() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // let source = { uri: response.uri };
        // this.setState({image_uri: response.uri})

        // You can also display the image using data:
        // let image_uri = { uri: 'data:image/jpeg;base64,' + response.data };

        this.uploadImage(response.uri)
          .then((url) => {
            alert('uploaded');
            this.setState({image_uri: url});
          })
          .catch((error) => console.log(error));
      }
    });
  }
  
  render() {   
    this.state = {
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid,
      email: firebase.auth().currentUser.email,
      phoneNumber: firebase.auth().currentUser.phoneNumber,
      photoURL: firebase.auth().currentUser.photoURL,
    };
    
    console.log(firebase.auth().currentUser.photoURL);
    // let img =
    //   this.state.avatarSource == this.state.avatarSource ? (
    //     <Image
    //       source={require('../../assets/userdefault.png')}
    //       style={styles.avatar}
    //     />
    //   ) : (
    //     <Image source={this.state.avatarSource} style={styles.avatar} />
    //   );
    return (
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader
          title="Setting"
          isHome={true}
          navigation={this.props.navigation}
        />
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              style={{flex: 1}}
              source={require('../../assets/unnamed.jpg')}
            />
          </View>

          <View style={{flex: 1.3}}>
            <View style={styles.body}>
              <Image
                style={styles.avatar}
                source={
                  this.state.image_uri
                    ? {uri: this.state.image_uri}
                    : require('../../assets/userdefault.png')
                }
              />
              <Feather
                name="camera"
                size={32}
                style={{
                  marginLeft: width * 0.57,
                  position: 'absolute',
                  color: '#07d65d',
                  marginTop: -10,
                }}
                onPress={this.getImage}
              />

              <View style={styles.bodyContent}>
                <View style={styles.info}>
                  <Text style={styles.title}>Tên:</Text>
                  <Text style={styles.name}>{this.state.displayName}</Text>
                  <View style={styles.line}></View>
                </View>

                <View style={styles.info}>
                  <Text style={styles.title}>Email:</Text>
                  <Text style={styles.name}>{this.state.email}</Text>
                  <View style={styles.line}></View>
                </View>
                <View style={styles.info}>
                  <Text style={styles.title}>Điện thoại:</Text>
                  <Text style={styles.name}>{this.state.phoneNumber}</Text>
                  <View style={styles.line}></View>
                </View>
                <View style={styles.info}>
                  <Text style={styles.title}>Địa chỉ:</Text>
                  <Text style={styles.name}>{this.state.phoneNumber}</Text>
                  <View style={styles.line}></View>
                </View>
                <TouchableOpacity
                  style={styles.btnLogout}
                  onPress={() => this.signOutUser()}>
                  <Text style={styles.textLogout}>Đăng xuất</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    flex: 0.6,
    backgroundColor: '#9bcd9b',
    // height: 200,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 150,
    borderWidth: 5,
    borderColor: '#ffffff',
    alignSelf: 'center',
    position: 'absolute',
    marginTop: height * -0.2,
  },
  body: {
    // flex: 1.1,
    //justifyContent:'space-around',
    marginVertical: 40,
    backgroundColor: 'white',
    borderRadius: 15,
    marginHorizontal: 15,
    marginVertical: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 15,
    shadowOpacity: 3.0,
    elevation: 8,
  },
  bodyContent: {
    marginVertical: 30,
    marginHorizontal: 15,

    // flex: 1,
    // marginLeft: 10,
    //alignItems: 'center',
    //padding: 30,
  },
  info: {
    flexDirection: 'column',
    margin: 10,
    justifyContent: 'space-around',
    //marginLeft: 20,
    // marginTop: 10,
    // marginHorizontal: -15,
    //alignItems: 'center',
    // borderWidth: 1,
    height: 60,
  },
  title: {
    fontSize: 22,
    color: '#446b75',
    // fontWeight: '600',
    // borderColor: 'gray',
    // borderRadius: 15,
    // borderWidth: 1,
  },
  name: {
    marginTop: 10,
    fontSize: 22,
    color: 'black',
    // fontWeight: '200',
    width: width * 0.9,
    // borderColor: 'gray',
    // borderRadius: 15,
    // borderWidth: 1,
  },
  line: {
    borderWidth: 1,
    borderColor: '#446b75',
    marginVertical: 10,
  },
  btnLogout: {
    // marginTop: height * 0.04,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#2f3d4c',
    borderRadius: 10,
    // justifyContent: 'space-between',
    // marginBottom: 20,
    // marginHorizontal: 10,
  },
  textLogout: {
    color: '#fff',
    fontSize: 20,
  },
});
const mapStateToProps = (state) => ({
  //token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  // removeAuth: () => dispatch(removeAuth()),
});
