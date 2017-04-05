import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  StyleSheet,
} from 'react-native'

import MapView from 'react-native-maps';

import { StackNavigator } from 'react-navigation';

import WelcomeModal from './components/WelcomeModal'
import Menu from './components/Menu';
import ChatScreen from './components/Chat';

import styles from './style';

// Map markers etc
const LATITUDE_DELTA_DEFAULT = 0.02;
const LONGITUDE_DELTA_DEFAULT = 0.02;

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
  constructor(props) {
    super(props);
    this.state = {markers : statues_location};

    console.log(this.state.markers);
  }
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
              onPress={() => navigate('Chat', { name: 'Superman'})}
              title="Chat with Superman"
          />
          <MapView
              region={{
                latitude: 52.079875,
                longitude: 4.315880,
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
                >
                  <MapView.Callout tooltip
                                   onPress={() =>
                                   {navigate('Chat', {name: marker.description})
                                     console.log("Trying to navigate from map pin")}
                                   }/>
                </MapView.Marker>
            ))}
          </MapView>
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

