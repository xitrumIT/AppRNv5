import React, {Component} from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';

const slides = [
  {
    key: 1,
    title: 'Title 1',
    text: 'Description Say something cool',
    image: require('../../assets/1.png'),
    backgroundColor: '#0cc99d',
    // titleStyle: styles.title,
    // textStyle: styles.text,
    // height: 20,
    // width: 20,
  },
  {
    key: 2,
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('../../assets/2.png'),
    backgroundColor: '#febe29',
    // titleStyle: styles.title,
    // textStyle: styles.text,
    // imageStyle: styles.image,
  },
  {
    key: 3,
    title: 'Rocket guy',
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require('../../assets/3.png'),
    backgroundColor: '#22bcb5',
    // titleStyle: styles.title,
    // textStyle: styles.text,
    // imageStyle: styles.image,
  },
];

export class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
    };
  }
  // Walkthrough Screen
  _renderItem = ({item}) => {
    return (
      <View
        style={[
          styles.slide,
          {
            backgroundColor: item.backgroundColor,
          },
        ]}>
        <Text style={styles.title}>{item.title}</Text>
        <Image style={styles.image} source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({showRealApp: true});
  };
  render() {
    if (this.state.showRealApp) {
      return (
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.Container}>
            <ImageBackground
              resizeMode={'cover'} // or cover
              style={{flex: 1}} // must be passed from the parent, the number may vary depending upon your screen size
              source={require('../../assets/c7.jpg')}>
              <View>
                <Text
                  style={{
                    marginTop: width * 0.2,
                    // marginLeft: 45,
                    // alignItems: 'center',
                    // justifyContent: 'center',
                    color: '#eb8c00',
                    fontSize: 24,
                    textAlign: 'center',
                  }}>
                  Vui lòng đăng nhập để sử dụng dịch vụ
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={require('../../assets/stb.png')}
                  style={styles.Image}
                  resizeMode="cover"
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Login')}
                  style={[
                    styles.Button,
                    {
                      borderColor: 'orange',
                      borderWidth: 1,
                      borderRadius: 30,
                      marginTop: 15,
                    },
                  ]}>
                  <Text style={{color: 'orange'}}>Đăng nhập</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Register')}
                  style={[
                    styles.Button,
                    {
                      borderColor: 'orange',
                      borderWidth: 1,
                      borderRadius: 30,
                      marginTop: 15,
                    },
                  ]}>
                  <Text style={{color: 'orange'}}>Đăng ký</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <AppIntroSlider
          renderItem={this._renderItem}
          data={slides}
          onDone={this._onDone}
        />
      );
    }
  }
}
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    //flexDirection:'row',

    // justifyContent: 'center',
  },
  Header: {
    marginTop: 20,
    position: 'absolute',
  },
  Tabbar: {
    flex: 1,
    margin: width * 0.3,
    paddingHorizontal: 30,
  },
  Image: {
    height: width * 0.5,
    width: width * 0.5,
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    marginVertical: 60,
    // marginHorizontal: 80
    // marginStart: 85,
    // marginTop: 15,
  },
  TitleTab: {
    color: 'grey',
    //backgroundColor:'red',
    marginTop: 20,
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 25,
  },
  Button: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'green',
    height: width * 0.11,
    width: width * 0.45,
    // borderRadius: 10,
    //marginLeft: 30,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingBottom: 96, // Add padding to offset large buttons and pagination in bottom of page
  },
  image: {
    // flex: 1,
    height: width * 1,
    width: width * 1,
    // justifyContent: 'center',
    // marginTop: 32,
  },
  title: {
    fontSize: 25,
    color: 'green',
    textAlign: 'center',
  },
  text: {
    fontSize: 25,
    color: '#500653',
    textAlign: 'center',
  },
});
