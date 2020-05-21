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
import {connect} from 'react-redux';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/storage';
// import FirebaseClient from '../../services/fireBase';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RNFetchBlob from 'rn-fetch-blob';
import uuid from 'uuid';

console.disableYellowBox = true;
const storage = firebase.storage();

const Fetch = RNFetchBlob.polyfill.Fetch;
// replace built-in fetch
window.fetch = new Fetch({
  // enable this option so that the response data conversion handled automatically
  auto: true,
  // when receiving response data, the module will match its Content-Type header
  // with strings in this array. If it contains any one of string in this array,
  // the response body will be considered as binary data and the data will be stored
  // in file system instead of in memory.
  // By default, it only store response data to file system when Content-Type
  // contains string `application/octet`.
  binaryContentTypes: ['image/', 'video/', 'audio/', 'foo/'],
}).build();
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
      uid: null,
      displayName: '',
      phoneNumber: '',
      birthDate: '',
      photoURL: '',
      image_uri: 'https://avatars0.githubusercontent.com/u/12028011?v=3&s=200',
    };
    this.getImage = this.getImage.bind(this);
  }
  componentDidMount() {}
  getUserData() {
    const user = auth.currentUser;
    if (user != null) {
      this.setState(
        {
          uid: user.uid,
        },
        () => {
          console.log(this.state.uid);
          let dbLocation = '/users/' + this.state.uid + '/';
          db.ref(dbLocation).on('value', (snapshot) => {
            if (snapshot.val() === null) {
              console.log('NOTHING GRABBED IN DATA');
              return null;
            } else {
              const data = snapshot.val();
              this.setState(
                {
                  displayName: data.displayName,
                  username: data.username,
                  phoneNumber: data.phoneNumber,
                  birthDate: data.birthDate,
                  email: data.email,
                  photoURL: data.photoURL,
                },
                () => {
                  if (this.state.photoURL === '') {
                    this.getProfilePhoto();
                  }
                },
              );
              console.log('USER INFO LOADED INTO PROFILE');
            }
          });
        },
      );
    }
  }
  getProfilePhoto() {
    storage
      .ref('profilePics')
      .child(`${this.state.username}.jpg`)
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        this.setState({photoURL: url});
      });
  }
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
  uploadImage(file) {
    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;
    let curUser = firebase.auth().currentUser;

    if (curUser) {
      let curUserId = curUser.uid;

      let uploadBlob = null;
      const imageRef = firebase
        .storage()
        .ref()
        .child('profile_images/' + curUserId + '.jpg');
      let mime = 'image/jpg';

      fs.readFile(file.uri, 'base64')
        .then((data) => {
          console.log('File read');
          return Blob.build(data, {type: `${mime};BASE64`});
        })
        .then((blob) => {
          console.log('uploading...');
          uploadBlob = blob;
          imageRef
            .put(blob, {contentType: mime})
            .then(() => {
              uploadBlob.close();
              console.log('Getting url...');
              imageRef.getDownloadURL().then((url) => {
                console.log(url);
                firebase.firestore().collection('users').doc(curUserId).update({
                  profile_image_url: url,
                });
                console.log('Image updated');
              });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert('Please login...!');
    }
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
        let image_uri = {uri: 'data:image/jpeg;base64,' + response.data};

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
