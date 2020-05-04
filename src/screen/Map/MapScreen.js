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
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/storage';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export class MapScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader
          title="Map"
          isHome={true}
          navigation={this.props.navigation}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Man hinh Map</Text>
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
});
