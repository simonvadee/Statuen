import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Navigator,
  Platform
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
  },
  header: {
    fontSize:16,
    textAlign: 'center',
    marginBottom:6,
    maxWidth:200,
  },
  imgs: {
    width:null,
    height:200,
  }
});

// Map markers etc
const LATITUDE_DELTA_DEFAULT = 0.05;
const LONGITUDE_DELTA_DEFAULT = 0.05;

export default class Map extends Component {

  watchID: ?number = null;

  constructor(props) {
    super(props);
    this.state = {
      markers_loaded: false,
      region: {
        latitude: 52.079875,
        longitude: 4.314736,
        latitudeDelta: LATITUDE_DELTA_DEFAULT,
        longitudeDelta: LONGITUDE_DELTA_DEFAULT,
      }
    };
  }

  componentWillReceiveProps(props) {
    if (props.statues != undefined) {
      this.setState({
        markers_loaded: true,
        statues: props.statues
      })
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (pos.coords.latitude && pos.coords.longitude) {
            this.setState({
              region : {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                latitudeDelta: LATITUDE_DELTA_DEFAULT,
                longitudeDelta: LONGITUDE_DELTA_DEFAULT,
              }
            });
          }
        },
        (error) => alert(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((pos) => {
      if (pos.coords.latitude && pos.coords.longitude) {
        this.setState({
          region : {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            latitudeDelta: LATITUDE_DELTA_DEFAULT,
            longitudeDelta: LONGITUDE_DELTA_DEFAULT,
          }
        });
      }
    });
  }

  trigger_menu() {
    console.log("triggering menu")
  }

  focus_marker(statue_index) {
    var statue = this.state.statues[statue_index];
    this.setState({
      region : {
        latitude: statue.fields.latitude,
        longitude: statue.fields.longitude,
        latitudeDelta: this.state.region.latitudeDelta,
        longitudeDelta: this.state.region.longitudeDelta,
      }
    })
  }

  display_markers() {
    for (let i = 0; i < this.state.statues.length; i++) {
      // console.log( "http://api.talkingstatues.xyz/pic_folder/".concat(this.state.statues[i].fields.pictures))
    }
    return this.state.statues.map((marker, index) => (
        <MapView.Marker
            key={index}
            coordinate={ marker.fields }
            title={marker.fields.name}
            description={marker.fields.description}
            onPress={() => {
              if (Platform.OS === 'ios') {
                this.focus_marker(index)
              }
            }}
        >
          <MapView.Callout
              tooltip={true}
              onPress={() =>
              {this.props.navigator(1, marker.fields)} // send statue data
              }>
            <CustomCallout>
              <View style={{}}>
                <Text style={styles.header}>{marker.fields.name}</Text>
                <Image
                    style={styles.imgs}
                    // source={require('../src/avatar.png')}
                    source={{uri: "http://api.talkingstatues.xyz/pic_folder/".concat(marker.fields.pictures)}}
                />
              </View>
            </CustomCallout>
          </MapView.Callout>
        </MapView.Marker>
    ))
  }

  render_map = (route, navigator) => {
    if (!this.state.markers_loaded) {
      return (
          <MapView.Animated
              ref='map'
              region={this.state.region}
              style={styles.map}
              onRegionChange={(region) => {
                this.setState({region})
              }}
              onRegionChangeComplete={() => {}}
              showsUserLocation={true}
          >
          </MapView.Animated>
      );
    } else {
      return (
          <MapView.Animated
              ref='map'
              region={this.state.region}
              style={styles.map}
              onRegionChange={(region) => {
                this.setState({region})
              }}
              onRegionChangeComplete={() => {}}
              showsUserLocation={true}
          >
            {  this.display_markers() }
          </MapView.Animated>
      );
    }
  }
// Class is currently unused, semi prepared 
  render(){
    return(
        <Navigator
            navigationBar={
              <Navigator.NavigationBar
                  routeMapper={{
                    LeftButton: (route, navigator, index, navState) => {},
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