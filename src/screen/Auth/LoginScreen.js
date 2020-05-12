import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Image,
  Animated,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import AnimatedLoader from 'react-native-animated-loader';
import {connect} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/database';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      token: '',
      error: '',
      isLoading: false,
      userInfo: null,
      loggedIn: false,
      errorMessage: '',
      gettingLoginStatus: true,
      hidePassword: true,
    };
  }

  componentDidMount() {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '936413085866-r3nje604gfl9q7uvgrcdjafq20prvcr5.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      //hostedDomain: '', // specifies a hosted domain restriction
      //loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceCodeForRefreshToken: true, // [Android] related to serverAuthCode, read the docs link below *.
      //accountName: '', // [Android] specifies an account name on the device that should be used
      //iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
    setInterval(() => {
      this.setState({
        isLoading: !this.state.isLoading,
      });
    }, 300000);
  }

  _signInGG = async () => {
    try {
      // add any configuration settings here:
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({userInfo: userInfo, loggedIn: true});
      console.log(userInfo);
      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(
        userInfo.idToken,
        userInfo.accessToken,
      );
      // login with credential
      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCredential(credential);
      this.onLoginSuccess();
      console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('user cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
        console.log('operation (f.e. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('play services not available or outdated');
      } else {
        // some other error happened
        console.log('some other error happened');
      }
    }
  };

  _signInFB = async () => {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw new Error('User cancelled the login process');
    }
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw new Error('Something went wrong obtaining access token');
    }
    const credential = firebase.auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    await firebase.auth().signInWithCredential(credential);
    this.onLoginSuccess();
  };

  handleLogin = async () => {
    const {email, password} = this.state;
    var check_email = RegExp('^[A-Z0-9._-]+@[A-Z0-9.-]+.[A-Z0-9.-]+$');
    if (password.length <= 5) {
      alert('Password > 5');
      return;
    }
    // if (!check_email.test(email)) {
    //   alert('Email have @');
    // } else
    else if (email === '' && password === '') {
      Alert.alert('Enter details to signin!');
    } else {
      this.setState({
        isLoading: true,
      }),
        3000;
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log(res);
          console.log('User logged-in successfully!');
          this.setState({
            isLoading: false,
            email: '',
            password: '',
          });
          //this.props.navigation.navigate('HomeApp');
          this.onLoginSuccess();
        })
        .catch((error) => this.setState({errorMessage: error.message}));
    }
  };

  onLoginSuccess() {
    this.props.navigation.navigate('HomeApp');
  }
  onLoginFailure(errorMessage) {
    this.setState({error: errorMessage, isLoading: false});
  }

  setPasswordVisibility = () => {
    this.setState({hidePassword: !this.state.hidePassword});
  };

  render() {
    const {isLoading} = this.state;
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <AnimatedLoader
            visible={isLoading}
            overlayColor="rgba(255,255,255,0.75)"
            source={require('../../assets/data.json')}
            animationStyle={styles.lottie}
            speed={1}
          />
          {/* <ActivityIndicator size="large" color="#9E9E9E" /> */}
        </View>
      );
    }
    const {email, password} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          {/* <Text style={styles.header}> Đăng nhập</Text> */}
          <Image
            source={require('../../assets/avatar2.png')}
            style={styles.Image}
          />
          <View
            style={{
              height: 60,
              alignSelf: 'stretch',
              marginBottom: 10,
              borderRadius: 10,
            }}>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              //onChangeText={value => this.setState({username: value})}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
              //onChangeText={this.props.email}
              underlineColorAndroid="transparent"
            />
          </View>
          <View
            style={{
              height: 60,
              alignSelf: 'stretch',
              marginBottom: 10,
              borderRadius: 10,
            }}>
            <TextInput
              returnKeyType="go"
              secureTextEntry={this.state.hidePassword}
              keyboardType="default"
              style={styles.textInput}
              placeholder="Password"
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              // onChangeText={this.props.password}
              underlineColorAndroid="transparent"
            />
            <TouchableOpacity
              // activeOpacity={0.8}
              style={styles.showPassword}
              onPress={this.setPasswordVisibility}>
              <Image
                source={
                  this.state.hidePassword
                    ? require('../../assets/hide.png')
                    : require('../../assets/show.png')
                }
                style={styles.buttonImage}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.btnLogin}
            onPress={() => this.handleLogin()}>
            <Text style={styles.textLogin}>Đăng nhập</Text>
          </TouchableOpacity>

          <View
            style={{
              // flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
            }}>
            <View style={{flex: 1, marginLeft: 13}}>
              <Text
                onPress={() => this.props.navigation.navigate('Register')}
                style={
                  (styles.textSignup,
                  {
                    fontWeight: 'bold',
                    color: '#f0f0f0',
                    fontSize: 19,
                    alignSelf: 'flex-start',
                    // alignItems: 'flex-end',
                  })
                }>
                Đăng ký!
              </Text>
            </View>

            <View style={{flex: 1, marginRight: 12}}>
              <Text
                onPress={() => this.props.navigation.navigate('ForgotPassword')}
                style={{
                  fontWeight: 'bold',
                  color: '#f0f0f0',
                  fontSize: 19,
                  alignSelf: 'flex-end',
                }}>
                Quên mật khẩu!
              </Text>
            </View>
          </View>
          <Text
            style={{
              marginTop: 5,
              color: '#f0f0f0',
              fontSize: 20,
              // alignSelf: 'stretch',
              alignItems: 'center',
              marginLeft: 15,
            }}>
            ------------------------ Hoặc --------------------------
          </Text>
          <TouchableOpacity
            style={styles.btnLoginGG}
            onPress={() => this._signInGG()}>
            <Image
              source={require('../../assets/google.png')}
              style={{
                position: 'absolute',
                height: 40,
                width: 40,
                marginTop: 10,
                alignSelf: 'flex-start',
              }}
            />
            <Text style={{color: '#696969'}}>Đăng nhập với Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnLoginFB}
            onPress={() => this._signInFB()}>
            <Image
              source={require('../../assets/facebook.png')}
              style={{
                position: 'absolute',
                height: 40,
                width: 40,
                alignSelf: 'flex-start',
              }}
            />
            <Text style={{color: '#f0f0f0'}}>Đăng nhập với Facebook</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#597073',
    // paddingHorizontal: 40,
  },
  wrapper: {
    flex: 1,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  textInput: {
    //flex:1,
    height: 60,
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#cccccc',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  showPassword: {
    position: 'absolute',
    right: width * 0.05,
    height: 60,
    width: 40,
    justifyContent: 'center',
    // height: 1,
    // width: 1,
    // padding: 2,
  },
  buttonImage: {
    resizeMode: 'contain',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  btnLogin: {
    alignSelf: 'stretch',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ff7373',
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },

  btnLoginGG: {
    alignSelf: 'stretch',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
  btnLoginFB: {
    alignSelf: 'stretch',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#3b5998',
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
  textLogin: {
    color: '#fff',
    fontSize: 20,
  },
  textSignup: {
    color: '#cccccc',
    textAlign: 'center',
  },
  Image: {
    //marginTop: 10,
    marginBottom: 20,
    width: width * 0.3,
    height: width * 0.4,
    //margin: width * 0.8,
  },
  lottie: {
    width: width * 0.9,
    height: width * 0.9,
  },
});
// lấy state từ store redux
function mapStateToProps(state) {
  return {
    // state: state từ store,
    // authReducer: reducer được import trong index combineReducers
    // auth: lấy từ state trong authReducer
  };
}

// gửi action lên reducer
function mapDispatchToProps(dispatch) {
  return {
    // setToken là action
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
