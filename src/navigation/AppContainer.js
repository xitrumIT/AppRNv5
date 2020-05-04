import React from 'react';

import {Button, View, Text, BackHandler, Alert} from 'react-native';

import NavigationService from './NavigationServiceV5';
import TopLevelNavigator from './Router';

export default class AppWithNavigationState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLeftDrawerOpened: false,
      isRightDrawerOpened: false,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    Alert.alert(
      'Exit App',
      'Do you want to exit?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );
    return true;
    // this.AlertPro.open();
    // <AlertPro
    //   ref={(ref) => {
    //     this.AlertPro = ref;
    //   }}
    //   onConfirm={() => this.AlertPro.close()}
    //   title="Thoát ứng dụng"
    //   message="Bạn có muốn thoát ứng dụng"
    //   textCancel="Cancel"
    //   textConfirm="OK"
    //   customStyles={{
    //     mask: {
    //       backgroundColor: 'transparent',
    //     },
    //     container: {
    //       borderWidth: 1,
    //       borderColor: '#9900cc',
    //       shadowColor: '#000000',
    //       shadowOpacity: 0.1,
    //       shadowRadius: 10,
    //     },
    //     buttonCancel: {
    //       backgroundColor: '#f8ef76',
    //     },
    //     buttonConfirm: {
    //       backgroundColor: '#4da6ff',
    //     },
    //   }}
    // />;
  }

  render() {
    return (
      <TopLevelNavigator
        ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
