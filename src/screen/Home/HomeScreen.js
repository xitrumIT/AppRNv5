import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {CustomHeader} from '../Drawer/CustomHeader.js';
import {SearchBar} from 'react-native-elements';

import {BorderlessButton} from 'react-native-gesture-handler';

console.disableYellowBox = true;
export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }
  updateSearch = (search) => {
    this.setState({search});
  };

  render() {
    const {search} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader
          title="Home"
          isHome={true}
          navigation={this.props.navigation}
        />
        <SearchBar
          placeholder="Search here...."
          onChangeText={this.updateSearch}
          value={search}
          // inputContainerStyle={{backgroundColor: 'white'}}
          cancelButtonTitle="Cancel"
          searchIcon={{size: 24}}
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
            <Text style={{fontFamily: 'Roboto.ttf'}}>Go Home Detail!</Text>
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
