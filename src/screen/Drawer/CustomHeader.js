import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export class CustomHeader extends Component {
  render() {
    let {navigation, isHome, title} = this.props;
    return (
      <View style={styles.header}>
        <View style={styles.menu}>
          {isHome ? (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Feather
                name="menu"
                size={35}
                style={{width: 35, height: 40, marginLeft: 5}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => navigation.goBack()}>
              <FontAwesome5
                name="angle-left"
                size={35}
                style={{width: 35, height: 35, marginLeft: 5}}
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={{flex: 10, justifyContent: 'center'}}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.basket}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            //shopping card
            onPress={() => navigation.push('HomeApp')}>
            <Feather
              name="shopping-cart"
              size={28}
              style={{width: 35, height: 30}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#ffffff',
  },
  menu: {flex: 1, justifyContent: 'center'},
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 23,
    color: '#4fc182',
    fontFamily: 'Comfortaa-Light.ttf',
  },
  basket: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 5,
  },
});
