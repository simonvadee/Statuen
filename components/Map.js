export default class Map extends Component{
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
                                 {navigate('Chat', {})}
                                 }/>
              </MapView.Marker>
          ))}
        </MapView>
    );
  }
}