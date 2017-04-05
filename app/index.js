import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  StyleSheet,
} from 'react-native'

import { StackNavigator } from 'react-navigation';

import WelcomeModal from './components/WelcomeModal'
import Menu from './components/Menu';
import ChatScreen from './components/Chat';
import Map from './components/Map'

import styles from './style';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    console.log('We are ready to render Main page');

    const { navigate } = this.props.navigation;
    return (
        <View>
          <Button
              onPress={() => navigate('Chat', { name: 'Superman'})}
              title="Chat with Superman"
          />
          <Map 
          navigator={navigate}
          />
        </View>
    );
  }
}

// Remember to add new screens here, match name with class.
const TalkingStatuesApp = StackNavigator({
  Home: { screen: HomeScreen },
  Chat: { screen: ChatScreen },
});



AppRegistry.registerComponent('TalkingStatuesApp', () => TalkingStatuesApp);

