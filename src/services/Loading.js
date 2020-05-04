import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';

import AnimatedLoader from 'react-native-animated-loader';

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        isLoading: !this.state.isLoading,
      });
    }, 3000);
  }

  render() {
    const {isLoading} = this.state;
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <AnimatedLoader
            visible={isLoading}
            overlayColor="rgba(255,255,255,0.75)"
            source={require('../assets/4854-dropping.json')}
            animationStyle={styles.lottie}
            speed={1}
          />
        </View>
      );
    }
  }
}
const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  lottie: {
    width: width * 0.9,
    height: width * 0.9,
  },
});
