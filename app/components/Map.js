import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions
} from 'react-native'

import { StackNavigator } from 'react-navigation';

import MapView from 'react-native-maps';
import HomeScreen from '../index'

styles = StyleSheet.create({
  map: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    flex:1,
    position: 'absolute',
  }
});

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

export default class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {markers : statues_location};
  }

 // Class is currently unused, semi prepared
  render(){
    return(
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
              >
                <MapView.Callout tooltip
                                 onPress={() =>
                                 {this.props.navigator('Chat', {name: marker.title})}
                                 }/>
              </MapView.Marker>
          ))}
        </MapView>
    );
  }
}