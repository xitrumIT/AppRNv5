import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {CustomHeader} from '../Drawer/CustomHeader.js';
import {RVText} from '../../core';

console.disableYellowBox = true;
export class HomeScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader
          title="Home"
          isHome={true}
          navigation={this.props.navigation}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{marginTop: 20}}
            onPress={() => this.props.navigation.navigate('HomeDetail')}>
            <RVText content="Go Home Detail!" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginTop: 20}}
            onPress={() => this.props.navigation.navigate('Login')}
            title="Go back from ProfileScreen"></TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
