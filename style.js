import {StyleSheet} from 'react-native';

module.exports = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  map: {
    height: 500,
    top: 120,
    bottom: 0,
    right: 0,
    left: 0,
    position: 'absolute',
  },
  alignBottom: {
    position: 'absolute',
    bottom:0,
    left:0,
  },
  avatar: {
    width: 50,
    height: 50,
    position: 'absolute',
    right:20,
    top: 20,
  }
});
