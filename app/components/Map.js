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


  },
});

// Map markers etc
const LATITUDE_DELTA_DEFAULT = 0.05;
const LONGITUDE_DELTA_DEFAULT = 0.05;

const statues_location = [
{latlng: {
  latitude: 52.079875,
  longitude: 4.315880},
  title: "Really long statue name",
  description: "test",
  img_url: "https://scontent-ams3-1.xx.fbcdn.net/v/t1.0-9/17523650_253318928466104_510830095466575552_n.jpg?oh=a2d2a4bc1706285a101ccf1a78b39c0a&oe=598AC27C"
},
{latlng: {
  latitude: 52.082937,
  longitude: 4.314736},
  title: "Statue2",
  description: "test",
  img_url: "https://digventures.com/wp-content/uploads/2014/11/statue-selfie-Getty-museum-520x600.jpg"
},
{latlng: {
  latitude: 52.080756,
  longitude: 4.312053},
  title: "Statue3",
  description: "test",
  img_url: "https://digventures.com/wp-content/uploads/2014/11/statue-selfie-Getty-museum-520x600.jpg"
},
{latlng: {
  latitude: 52.080173,
  longitude: 4.309923},
  title: "Statue4",
  description: "test",
  img_url: "https://3.bp.blogspot.com/-pb530UhjJi0/V8madVrx1RI/AAAAAAAAITQ/MXJlk7oEyws62hau9UAqQgff87fWej-tgCLcB/s1600/MoscowAug-12.jpg"
},
{latlng: {
  latitude: 52.079281,
  longitude: 4.312103},
  title: "Statue5",
  description: "test",
  img_url: "https://3.bp.blogspot.com/-pb530UhjJi0/V8madVrx1RI/AAAAAAAAITQ/MXJlk7oEyws62hau9UAqQgff87fWej-tgCLcB/s1600/MoscowAug-12.jpg"
},
]

export default class Map extends Component {

  watchID: ?number = null;

  constructor(props) {
    super(props);
    this.state = {
      markers : props.statues_location,
      markers_loaded: false,
      region: {
        latitude: 52.079875,
        longitude: 4.314736,
        latitudeDelta: LATITUDE_DELTA_DEFAULT,
        longitudeDelta: LONGITUDE_DELTA_DEFAULT,
      }
    };

    fetch('http://talkingstatues.xyz/api/statues')
    .then((response) => response.json())
    .then((data) => {
      this.statues = JSON.parse(data.latest_statue_list);
      this.setState({markers_loaded: true});
    })
    .catch((error) => console.log(error));

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
    var statue = this.statues[statue_index];
    this.setState({
      region : {
        latitude: statue.latlng.latitude,
        longitude: statue.latlng.longitude,
        latitudeDelta: this.state.region.latitudeDelta,
        longitudeDelta: this.state.region.longitudeDelta,
      }
    })
  }

  display_markers() {
    return this.statues.map((marker, index) => (
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
        {this.props.navigator(1)}
      }>
      <CustomCallout>
      <Text style={styles.header}>{marker.fields.title}</Text>
      <Image
      style={{resizeMode: 'contain', height:100}}
      source={{uri: marker.fields.pictures}}
      />
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