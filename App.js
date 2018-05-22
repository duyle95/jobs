import { Notifications } from 'expo';
import React, { Component } from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { View, YellowBox, Alert } from 'react-native';
import { Provider } from 'react-redux';
import { Icon } from 'react-native-elements';

import registerForNotifications from './services/push_notifications';
import store from './store';
import ReviewScreen from './screens/ReviewScreen';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);

export default class App extends Component {
  componentDidMount() {
    registerForNotifications();
    Notifications.addListener((notification) => {
      const { data: { text }, origin } = notification;

      if (origin === 'received' && text) {
        Alert.alert(
          'New Push Notifications',
          text,
          [{ text: 'Ok.' }]
        );
      }
    });
  }

  render() {
    const MainNavigator = createBottomTabNavigator(
      {
        welcome: { screen: WelcomeScreen },
        auth: { screen: AuthScreen },
        main: {
          screen: createBottomTabNavigator(
            {
              map: { screen: MapScreen },
              deck: { screen: DeckScreen },
              review: {
                screen: createStackNavigator({
                  review: { screen: ReviewScreen },
                  settings: { screen: SettingsScreen },
                }),
                navigationOptions: {
                  title: 'Review',
                  tabBarIcon: ({ tintColor }) => {
                    return <Icon name="favorite" size={30} color={tintColor} />;
                  },
                },
              },
            },
            {
              tabBarOptions: {},
            }
          ),
        },
      },
      {
        navigationOptions: {
          tabBarVisible: false,
        },
        lazy: true,
      }
    );

    return (
      <Provider store={store}>
          <View style={styles.container}>
            <MainNavigator />
          </View>
      </Provider>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
};
