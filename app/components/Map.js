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
  },
    header: {
    fontSize:16,
    textAlign: 'center',
      marginBottom:6,


  },
});

// Map markers etc
const LATITUDE_DELTA_DEFAULT = 0.02;
const LONGITUDE_DELTA_DEFAULT = 0.02;

const statues_location = [
  {latlng: {
    latitude: 52.079875,
    longitude: 4.315880},
    title: "Really long statue name",
    description: "test",
    img_url: "https://scontent-ams3-1.xx.fbcdn.net/v/t1.0-9/17523650_253318928466104_510830095466575552_n.jpg?oh=a2d2a4bc1706285a101ccf1a78b39c0a&oe=598AC27C"},
  {latlng: {
    latitude: 52.082937,
    longitude: 4.314736},
    title: "Statue2",
    description: "test",
    img_url: "https://digventures.com/wp-content/uploads/2014/11/statue-selfie-Getty-museum-520x600.jpg"},
  {latlng: {
    latitude: 52.080756,
    longitude: 4.312053},
    title: "Statue3",
    description: "test",
    img_url: "https://digventures.com/wp-content/uploads/2014/11/statue-selfie-Getty-museum-520x600.jpg"},
  {latlng: {
    latitude: 52.080173,
    longitude: 4.309923},
    title: "Statue4",
    description: "test",
    img_url: "https://3.bp.blogspot.com/-pb530UhjJi0/V8madVrx1RI/AAAAAAAAITQ/MXJlk7oEyws62hau9UAqQgff87fWej-tgCLcB/s1600/MoscowAug-12.jpg"},
  {latlng: {
    latitude: 52.079281,
    longitude: 4.312103},
    title: "Statue5",
    description: "test",
    img_url: "https://3.bp.blogspot.com/-pb530UhjJi0/V8madVrx1RI/AAAAAAAAITQ/MXJlk7oEyws62hau9UAqQgff87fWej-tgCLcB/s1600/MoscowAug-12.jpg"},
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
                <MapView.Callout
                    tooltip={true}
                    onPress={() =>
                    {this.props.navigator(1)}
                    }>
                  <CustomCallout>
                    <Text style={styles.header}>{marker.title}</Text>
                    <Image
                        style={{resizeMode: 'contain', height:100}}
                        source={{uri: marker.img_url}}
                    />
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