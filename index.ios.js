import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  StyleSheet,
  MapView,
} from 'react-native'
import { StackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
    map: {
        height: 500,
        top: 120,
        bottom: 0,
        right: 0,
        left: 0,
        position: 'absolute',
    },
});

AppRegistry.registerComponent('TalkingStatuesApp', () => TalkingStatuesApp);
