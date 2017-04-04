import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  StyleSheet,
  MapView,
} from 'react-native'
import { StackNavigator } from 'react-navigation';
import { SideMenu, List, ListItem } from 'react-native-elements'
import WelcomeModal from './components/WelcomeModal'
// import menu from './menu';

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
          <WelcomeModal/>

          <Button
              onPress={() => navigate('Chat', { name: 'Cheerio'})}
              title="Chat with Cheerio"

          />

          <Button
              onPress={() => navigate('Chat', { name: 'StatueMaster'})}
              title="Chat with StatueMaster"
          />

          <Button
              onPress={() => navigate('Chat', { name: 'Superman'})}
              title="Chat with Superman"
          />
          <MapView
              style={styles.map}
              onRegionChange={() => {}}
              onRegionChangeComplete={() => {}}
              showsUserLocation={true} >
          </MapView>
        </View>
    );
  }
}


// Class name is name used for StackNavigator navigation
class ChatScreen extends React.Component {
  static navigationOptions = {
    // Nav options can be defined as a function of the navigation prop:
    title: ({ state }) => `${state.params.name}`,
  };
  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;
    return (
        <View>
          <Text>Hello, the title comes from params from homepage</Text>
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

