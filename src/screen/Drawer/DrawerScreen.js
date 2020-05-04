import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  StyleSheet,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
export class DrawerScreen extends Component {
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

  render() {
    this.state = {
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid,
      email: firebase.auth().currentUser.email,
      phoneNumber: firebase.auth().currentUser.phoneNumber,
      photoURL: firebase.auth().currentUser.photoURL,
    };
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.User}>
          <Image
            style={{height: 200, width: 200, borderRadius: 120}}
            source={
              this.state.photoURL
                ? {uri: this.state.photoURL}
                : require('../../assets/userdefault.png')
            }
          />

          <Text style={styles.textUser}>{this.state.displayName}</Text>
          <Text style={styles.textEmail}>{this.state.email}</Text>
        </View>
        <ScrollView style={{marginLeft: 5, flex: 1}}>
          <TouchableOpacity
            style={{marginTop: 25, justifyContent: 'center'}}
            onPress={() => this.props.navigation.navigate('MenuTab')}>
            <Feather name="calendar" size={30} style={styles.icon}></Feather>
            <Text style={styles.title}>My Oders</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Touch}
            onPress={() => this.props.navigation.navigate('Notifications')}>
            <Feather name="bell" size={30} style={styles.icon}></Feather>
            <Text style={styles.title}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Touch}
            onPress={() => this.props.navigation.navigate('Notifications')}>
            <Feather name="user" size={30} style={styles.icon}></Feather>
            <Text style={styles.title}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Touch}
            onPress={() => this.props.navigation.navigate('Notifications')}>
            <Feather name="map-pin" size={30} style={styles.icon}></Feather>
            <Text style={styles.title}>Address</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Touch}
            onPress={() => this.props.navigation.navigate('Notifications')}>
            <Feather name="help-circle" size={30} style={styles.icon}></Feather>
            <Text style={styles.title}>Help</Text>
          </TouchableOpacity>
        </ScrollView>

        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            marginBottom: 8,
            height: 30,
          }}
          onPress={() => this.props.navigation.navigate('Login')}>
          <Feather
            name="log-out"
            size={30}
            style={{
              color: '#4fc182',
            }}></Feather>
          <Text style={{fontSize: 18, marginLeft: 20, fontWeight: 'bold'}}>
            Logout
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  User: {
    height: (height * 1) / 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ab684d',
    flexDirection: 'column',
  },
  textUser: {
    color: 'white',
    fontSize: 21,
    fontWeight: 'bold',
    marginTop: 8,
    fontFamily: 'SVN-Newton.ttf',
  },
  textEmail: {color: 'white', fontSize: 19},
  title: {marginLeft: 80, fontSize: 17, fontWeight: 'bold', color: '#4c4c4c'},
  icon: {marginLeft: 2, position: 'absolute', color: '#4fc182'},
  Touch: {marginTop: 45, justifyContent: 'center', height: 30},
});
