import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  Dimensions,
  Animated,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {CustomHeader} from '../Drawer/CustomHeader';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import AnimatedLoader from 'react-native-animated-loader';

export class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      token: '',
      isLoading: false,
      hidePassword: true,
      hideConfirmPass: true,
    };
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  focusNextField(nextField) {
    this.refs[nextField].focus();
  }
  showPassword = () => {
    this.setState({hidePassword: !this.state.hidePassword});
  };
  showConfirmPassword = () => {
    this.setState({hideConfirmPass: !this.state.hideConfirmPass});
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({
        isLoading: !this.state.isLoading,
      });
    }, 30000);
  }

  handleSignUp = async () => {
    if (this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signup!');
    } else {
      this.setState({
        isLoading: true,
      });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          res.user.updateProfile({
            username: this.state.username,
          });
          console.log('User registered successfully!');
          this.setState({
            isLoading: false,
            username: '',
            email: '',
            password: '',
          });
          Alert.alert('Registered successfully!');
          this.props.navigation.navigate('HomeApp');
        })
        //.catch(error => this.setState({errorMessage: error.message}));
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
          console.error(error);
        });
    }
  };

  render() {
    const {isLoading} = this.state;
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <AnimatedLoader
            visible={isLoading}
            overlayColor="rgba(255,255,255,0.75)"
            source={require('../../assets/loading-animation.json')}
            animationStyle={styles.lottie}
            speed={1}
          />
        </View>
      );
    }
    return (
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader title="Register" navigation={this.props.navigation} />
        <View style={styles.container}>
          {/* <Text style={styles.header}> Đăng ký</Text> */}
          <Image
            source={require('../../assets/reg.png')}
            style={styles.Image}
          />
          <View style={styles.viewInput}>
            <TextInput
              ref="1"
              style={styles.textInput}
              placeholder="Username"
              onChangeText={(val) => this.updateInputVal(val, 'username')}
              value={this.state.username}
              underlineColorAndroid="transparent"
              blurOnSubmit={false}
              onSubmitEditing={() => this.focusNextField('2')}
            />
          </View>
          <View style={styles.viewInput}>
            <TextInput
              ref="2"
              style={styles.textInput}
              placeholder="Email"
              onChangeText={(val) => this.updateInputVal(val, 'email')}
              value={this.state.email}
              underlineColorAndroid="transparent"
              keyboardType="email-address"
              blurOnSubmit={false}
              onSubmitEditing={() => this.focusNextField('3')}
            />
          </View>
          <View style={styles.viewInput}>
            <TextInput
              ref="3"
              secureTextEntry={this.state.hidePassword}
              style={styles.textInput}
              placeholder="Password"
              onChangeText={(val) => this.updateInputVal(val, 'password')}
              value={this.state.password}
              underlineColorAndroid="transparent"
              blurOnSubmit={false}
              onSubmitEditing={() => this.focusNextField('4')}
            />
            <TouchableOpacity
              // activeOpacity={0.8}
              style={styles.showPassword}
              onPress={this.showPassword}>
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
          <View style={styles.viewInput}>
            <TextInput
              ref="4"
              secureTextEntry={this.state.hideConfirmPass}
              style={styles.textInput}
              placeholder="Confirm Password"
              onChangeText={(val) =>
                this.updateInputVal(val, 'confirmPassword')
              }
              value={this.state.confirmPassword}
              underlineColorAndroid="transparent"
              blurOnSubmit={true}
              returnKeyType="done"
            />
            <TouchableOpacity
              // activeOpacity={0.8}
              style={styles.showPassword}
              onPress={this.showConfirmPassword}>
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
          <TouchableOpacity style={styles.btnLogin} onPress={this.handleSignUp}>
            <Text style={styles.textLogin}>Đăng ký</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 10,
            }}>
            <Text style={styles.textSignup}>
              Đăng nhập nếu bạn đã có tài khoản!
            </Text>
            <Text
              onPress={() => this.props.navigation.navigate('Login')}
              style={[
                styles.textSignup,
                {
                  fontWeight: 'bold',
                  color: '#2f3d4c',
                },
              ]}>
              {' '}
              Đăng nhập
            </Text>
          </View>
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
  lottie: {
    width: width / 2,
    height: width / 2,
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
  header: {
    fontSize: 30,
    marginBottom: 60,
    color: '#d10000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  viewInput: {
    height: 70,
    alignSelf: 'stretch',
    marginBottom: 10,
    borderRadius: 10,
  },
  textInput: {
    height: 60,
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#cccccc',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  btnLogin: {
    alignSelf: 'stretch',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#2f3d4c',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  textLogin: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'SVN-Newton.ttf',
  },
  textSignup: {
    color: '#e5e5e5',
    fontSize: 15,
  },
  Image: {
    //marginTop: 10,
    marginVertical: 20,
    width: width * 0.99,
    height: width * 0.41,
    //margin: width * 0.8,
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
});
