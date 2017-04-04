import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  StyleSheet
} from 'react-native'

import MapView from 'react-native-maps';

import { StackNavigator } from 'react-navigation';

const LATITUDE_DELTA_DEFAULT = 0.1;
const LONGITUDE_DELTA_DEFAULT = 0.1;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
});

const statues_location = [
    {latlng: {
      latitude: 52.079875,
      longitude: 4.315880},
      title: "test",
      description: "test"},
    {latlng: {
      latitude: 52.082937,
      longitude: 4.314736},
      title: "test",
      description: "test"},
    {latlng: {
      latitude: 52.080756,
      longitude: 4.312053},
      title: "test",
      description: "test"},
    {latlng: {
      latitude: 52.080173,
      longitude: 4.309923},
      title: "test",
      description: "test"},
    {latlng: {
      latitude: 52.079281,
      longitude: 4.312103},
      title: "test",
      description: "test"}
    ]

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  constructor(props) {
    super(props);
    this.state = {markers : statues_location};

    console.log(this.state.markers);
    }
    render() {
      const { navigate } = this.props.navigation;
      console.log(this.state.markers);
      return (
        <View style={styles.container}>

        <MapView
        region={{
          latitude: 52.071000,
          longitude: 4.301627,
          latitudeDelta: LATITUDE_DELTA_DEFAULT,
          longitudeDelta: LONGITUDE_DELTA_DEFAULT,
        }}
        style={styles.map}
        onRegionChange={() => {}}
        onRegionChangeComplete={() => {}}
        showsUserLocation={true}
        >
        {this.state.markers.map((marker, index) => (
          <MapView.Marker
          key={index}
          coordinate={marker.latlng}
          title={marker.title}
          description={marker.description}
          />
          ))}
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
