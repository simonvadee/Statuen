import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Navigator
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'


import MapView from 'react-native-maps';
import HomeScreen from '../index'

import CustomCallout from './CustomCallout'

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
  
  trigger_menu() {
    console.log("triggering menu")
  }

  render_map = (route, navigator) => {
    return (
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
        <MapView.Callout
        tooltip={true}
        onPress={() =>
         {this.props.navigator(1)}
       }>
       <CustomCallout>
        <Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
        />
       <Text>Test</Text>
       </CustomCallout>
       </MapView.Callout>
       </MapView.Marker>
       ))}
      </MapView>
      );
  }
// Class is currently unused, semi prepared 
  render(){
  return(
      <Navigator
      navigationBar={
        <Navigator.NavigationBar
        routeMapper={{
          LeftButton: (route, navigator, index, navState) => {},
        //   { return (
        //     <Icon.Button
        //     name="bars"
        //     size={25}
        //     padding={15}
        //     color="#000000"
        //     backgroundColor='rgba(31, 103, 158, 0.3)'
        //     onPress={this.trigger_menu}
        //     borderRadius={60}
        //     iconStyle={{marginLeft: 5, marginRight: 5}}
        //     />);
        // },
          RightButton: (route, navigator, index, navState) =>
          {},
          Title: (route, navigator, index, navState) =>
          {},
        }}
        style={{backgroundColor: 'rgba(0, 0, 0, 0.0)'}}
        />
      }
      renderScene={this.render_map}
      />
    );
}
}