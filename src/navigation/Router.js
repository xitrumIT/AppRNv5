import * as React from 'react';
import {Platform, Image, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {DrawerScreen} from '../screen/Drawer';
import {HomeScreen, HomeScreenDetail} from '../screen/Home';
import {SettingsScreen, SettingsScreenDetail} from '../screen/Settings';
import {ChatScreen} from '../screen/Chat';
import {MapScreen} from '../screen/Map';
import {NotificationsScreen} from '../screen/Notification';
import AnimatedTabBar, {
  TabsConfig,
  BubbleTabConfig,
} from '@gorhom/animated-tabbar';
import LoginScreen from '../screen/Auth/LoginScreen';
import {
  RegisterScreen,
  WelcomeScreen,
  ForgotPasswordScreen,
} from '../screen/Auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
// Intro Slider
const tabs: TabsConfig<BubbleTabConfig> = {
  Home: {
    labelStyle: {
      color: '#5B37B7',
      fontSize: 20,
      fontWeight: 'bold',
    },
    icon: {
      component: (
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
          size={25}
          color="#5B37B7"
        />
      ),
      activeColor: '#5B37B7',
      inactiveColor: '#000000',
    },
    background: {
      activeColor: '#dfd7f3',
      inactiveColor: 'rgba(223,215,243,0)',
    },
  },
  Chat: {
    labelStyle: {
      color: '#2bc565',
      fontSize: 20,
      fontWeight: 'bold',
    },
    icon: {
      component: (
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-chatbubbles' : 'md-chatbubbles'}
          size={25}
          color="#2bc565"
        />
      ),
      activeColor: '#2bc565',
      inactiveColor: '#000000',
    },
    background: {
      activeColor: '#d4f3e0',
      inactiveColor: 'rgba(207,235,239,0)',
    },
  },
  Map: {
    labelStyle: {
      color: '#E90C43',
      fontSize: 20,
      fontWeight: 'bold',
    },
    icon: {
      component: (
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-navigate' : 'md-navigate'}
          size={25}
          color="#E90C43"
        />
      ),
      activeColor: '#E90C43',
      inactiveColor: '#000000',
    },
    background: {
      activeColor: '#faced9',
      inactiveColor: 'rgba(207,235,239,0)',
    },
  },
  Settings: {
    labelStyle: {
      color: '#1194AA',
      fontSize: 20,
      fontWeight: 'bold',
    },
    icon: {
      component: (
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
          size={25}
          color="#1194AA"
        />
      ),
      activeColor: '#1194AA',
      inactiveColor: '#000000',
    },
    background: {
      activeColor: '#cfebef',
      inactiveColor: 'rgba(207,235,239,0)',
    },
  },
};
const Tab = createBottomTabNavigator();

const navOptionHandler = () => ({
  headerShown: false,
});

const StackHome = createStackNavigator();

function HomeStack({navigation, route}) {
  if (
    route.state &&
    route.state.routeNames[route.state.index] === 'HomeDetail'
  ) {
    navigation.setOptions({tabBarVisible: false});
  } else {
    navigation.setOptions({tabBarVisible: true});
  }
  return (
    <StackHome.Navigator initialRouteName="Home">
      <StackHome.Screen
        name="Home"
        component={HomeScreen}
        options={navOptionHandler}
      />
      <StackHome.Screen
        name="HomeDetail"
        component={HomeScreenDetail}
        options={navOptionHandler}
      />
    </StackHome.Navigator>
  );
}

const StackSetting = createStackNavigator();

function SettingStack({navigation, route}) {
  if (route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false});
  } else {
    navigation.setOptions({tabBarVisible: true});
  }
  return (
    <StackSetting.Navigator initialRouteName="Setting">
      <StackSetting.Screen
        name="Setting"
        component={SettingsScreen}
        options={navOptionHandler}
      />
      <StackSetting.Screen
        name="SettingDetail"
        component={SettingsScreenDetail}
        options={navOptionHandler}
      />
    </StackSetting.Navigator>
  );
}
const StackChat = createStackNavigator();

function ChatStack({navigation, route}) {
  if (route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false});
  } else {
    navigation.setOptions({tabBarVisible: true});
  }
  return (
    <StackChat.Navigator initialRouteName="Chat">
      <StackChat.Screen
        name="Chat"
        component={ChatScreen}
        options={navOptionHandler}
      />
    </StackChat.Navigator>
  );
}
const StackMap = createStackNavigator();

function MapStack({navigation, route}) {
  if (route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false});
  } else {
    navigation.setOptions({tabBarVisible: true});
  }
  return (
    <StackMap.Navigator initialRouteName="Map">
      <StackMap.Screen
        name="Map"
        component={MapScreen}
        options={navOptionHandler}
      />
    </StackMap.Navigator>
  );
}

function TabNavigator(navigation) {
  return (
    // <Tab.Navigator
    //   screenOptions={({route}) => ({
    //     tabBarIcon: ({focused, color, size}) => {
    //       let iconName;
    //       if (route.name === 'Home') {
    //         iconName = focused ? 'ios-home' : 'md-home';
    //       } else if (route.name === 'Settings') {
    //         iconName = focused ? 'ios-settings' : 'md-settings';
    //       }

    //       // You can return any component that you like here!
    //       return <Ionicons name={iconName} size={size} color={color} />;
    //     },
    //   })}
    //   tabBarOptions={{
    //     activeTintColor: '#ff4040',
    //     inactiveTintColor: 'black',
    //   }}>
    <Tab.Navigator
      tabBar={(props) => <AnimatedTabBar tabs={tabs} {...props} />}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Chat" component={ChatStack} />
      <Tab.Screen name="Map" component={MapStack} />
      <Tab.Screen name="Settings" component={SettingStack} />
    </Tab.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function DrawerNavigator({navigation}) {
  return (
    <Drawer.Navigator
      initialRouteName="MenuTab"
      drawerContent={() => <DrawerScreen navigation={navigation} />}>
      <Drawer.Screen name="MenuTab" component={TabNavigator} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  );
}

const StackApp = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StackApp.Navigator initialRouteName="Welcome">
        <StackApp.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={navOptionHandler}
        />
        <StackApp.Screen
          name="HomeApp"
          component={DrawerNavigator}
          options={navOptionHandler}
        />
        <StackApp.Screen
          name="Login"
          component={LoginScreen}
          options={navOptionHandler}
        />
        <StackApp.Screen
          name="Register"
          component={RegisterScreen}
          options={navOptionHandler}
        />
        <StackApp.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={navOptionHandler}
        />
      </StackApp.Navigator>
    </NavigationContainer>
  );
}
