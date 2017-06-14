import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  StyleSheet,
  Navigator,
  Dimensions,
  DeviceEventEmitter,
  Platform
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

import PushNotification from 'react-native-push-notification'
import PushNotificationAndroid from 'react-native-push-notification'
import {PushNotificationIOS} from 'react-native';


import Map from './components/Map';
import AbstractBeacon from './components/Beacons'
import WelcomeModal from './components/WelcomeModal'
import ChatScreen from './components/Chat';
import AboutScreen from './components/About/About'


if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
          ? args[number]
          : match
          ;
    });
  };
}

const StatusbarHeight = Platform.OS === 'ios' ? 10 : 0;

var initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const styles = StyleSheet.create({
  initialLayout: {
    height: 0,
    width: Dimensions.get('window').width,
  },
  container: {
    flex: 1,
    paddingTop:StatusbarHeight,

  },
  tabbar: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    height: 50,
    width: Dimensions.get('window').width,
  },
});

class HomeScreen extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: '1', title: '', icon: 'map-marker'},
      { key: '2', title: '', icon: 'wechat'},
      { key: '3', title: '', icon: 'question'},
    ],
  };

  static statues = [];

  constructor(props) {
    super(props)
    AbstractBeacon.init();

    fetch('http://api.talkingstatues.xyz/statues')
        .then((response) => response.json())
        .then((data) => {
          this.setState({"statues": JSON.parse(data.latest_statue_list)});
          HomeScreen.statues = this.state.statues;
          console.log("statues :::::::: ", this.state.statues)
        })
        .catch((error) => console.log(error));

  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      PushNotificationAndroid.registerNotificationActions(['OK']);
    }
    DeviceEventEmitter.addListener('notificationActionReceived', this.handleNotificationCallback);

    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        console.log( 'TOKEN:', token );
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.info("Is platform iOS: " , Platform.OS === 'ios')
        console.log( 'NOTIFICATION:', notification);
        if (Platform.OS === 'ios'){
          DeviceEventEmitter.emit("notificationActionReceived", {dataJSON: '{"slug":"{0}" }'.format(notification.data.slug)})

        }
        if (Platform.OS === 'android')
          DeviceEventEmitter.emit("notificationActionReceived", {dataJSON: '{"action": "{0}", "slug":"{1}" }'.format(notification.tag, notification.slug)})
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }


  findStatue = (slug) => {
    for (let i = 0; i < this.state.statues.length; i++) {
      if (this.state.statues[i].fields.slug == slug)
        return this.state.statues[i].fields
    }
  };

  handleNotificationCallback = (action) => {
    console.log ('+++++++++++== Notification action received: ' + action, action.dataJSON);
    const info = JSON.parse(action.dataJSON);
    var statue_data = this.findStatue(info.slug);
    this._goTo(1, statue_data);
  };

  _goTo = (index, statue) => {
    this.setState({index: index, statue:statue})
  };

  _handleChangeTab = (index) => {
    this.setState({ index });
  };

  _renderIcon = ({ route }: any) => {
    return (
        <Icon
            name={route.icon}
            size={24}
            color='black'
        />
    );
  };

  _renderHeader = (props) => {
    return (
        <TabBar
            {...props}
            renderIcon={this._renderIcon}
            style={styles.tabbar}
        />);
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return ( <Map navigator={this._goTo} statues={this.state.statues} /> );
      case '2':
        return ( <ChatScreen statue={this.state.statue}/> );
      case '3':
        return ( <AboutScreen/> );
      default:
        return null;
    }
  };


  render() {
    return (
        <TabViewAnimated
            initialLayout={initialLayout}
            style={styles.container}
            lazy={true}
            navigationState={this.state}
            renderScene={this._renderScene}
            renderHeader={this._renderHeader}
            onRequestChangeTab={this._handleChangeTab}
        />
    );
  }
}

AppRegistry.registerComponent('TalkingStatuesApp', () => HomeScreen);

