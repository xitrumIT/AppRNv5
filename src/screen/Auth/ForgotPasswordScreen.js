import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {CustomHeader} from '../Drawer/CustomHeader';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

export class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  onResetPasswordPress = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(
        () => {
          Alert.alert('Password khôi phục đã được gửi về email.');
          this.props.navigation.navigate('Login');
        },
        (error) => {
          Alert.alert(error.message);
        },
      );
  };

  componentDidMount() {}

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#59b18c" />
        </View>
      );
    }
    const {email, password} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader
          title="Forgot Password"
          navigation={this.props.navigation}
        />
        <View style={styles.container}>
          {/* <Text style={styles.header}> Đăng nhập</Text> */}
          <Image
            source={require('../../assets/key.png')}
            style={styles.Image}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Điền vào email đã đăng ký"
            //onChangeText={value => this.setState({username: value})}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            //onChangeText={this.props.email}
            underlineColorAndroid="transparent"
          />

          <TouchableOpacity
            style={styles.btnLogin}
            onPress={() => this.onResetPasswordPress()}>
            <Text style={styles.textLogin}>Khôi phục mật khẩu</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  text: {
    color: '#333',
    fontSize: 24,
    marginLeft: 25,
  },
  buttonContainer: {
    margin: 25,
  },
  Image: {
    //marginTop: 10,
    marginBottom: 20,
    width: width * 0.3,
    height: width * 0.3,
    //margin: width * 0.8,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#597073',
    // paddingHorizontal: 40,
  },
  textLogin: {
    color: '#fff',
    fontSize: 19,
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
  btnLogin: {
    alignSelf: 'stretch',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ff7373',
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
});
