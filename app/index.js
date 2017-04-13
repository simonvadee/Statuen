import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  StyleSheet,
  Navigator,
  Dimensions
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

import WelcomeModal from './components/WelcomeModal'
import Menu from './components/Menu';
import ChatScreen from './components/Chat';
import Map from './components/Map'

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
  },
  tabbar: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 40,
    width: Dimensions.get('window').width
  },
});

class HomeScreen extends React.Component {
  state = {
    index: 0,
    routes: [
    { key: '1', title: 'HomeScreen', icon: 'map-marker'},
    { key: '2', title: 'ChatScreen', icon: 'wechat'},
    ],
  };

  _goTo = (index) => {
    this.setState({index})
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
      return ( <Map navigator={this._goTo}/> );
      case '2':
      return ( <ChatScreen/> );
      default:
      return null;
    }
  };

  render() {
    return (
      <TabViewAnimated
      initialLayout={initialLayout}
      style={styles.container}
      navigationState={this.state}
      renderScene={this._renderScene}
      renderHeader={this._renderHeader}
      onRequestChangeTab={this._handleChangeTab}
      />
      );
  }
}


AppRegistry.registerComponent('TalkingStatuesApp', () => HomeScreen);

