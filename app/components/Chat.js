import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native'

import { GiftedChat } from 'react-native-gifted-chat';

// ON ANDROID, BLANK SCREEN UNTIL WE CLICK ON THE INPUT --> TO FIX !!!!!!

// Class name is name used for StackNavigator navigation
export default class ChatScreen extends Component {
  static navigationOptions = {
    // Nav options can be defined as a function of the navigation prop:
    title: ({ state }) => `${state.params.name}`,
  };

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
    };

    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);

    this._isAlright = null;
  }

  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      };
    })
  }

  componentDidMount() {
   console.log("DID MOUNT");
 }

 componentDidUpdate() {
   console.log("DID UPDATE");
 }

 componentWillMount() {
   console.log("WILL MOUNT");
   this._isMounted = true;
   this.setState({
    messages: [
    {
      _id: 1,
      text: 'Hello developer',
      createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://facebook.github.io/react/img/logo_og.png',
      },
    },
    ],
  });
 }

 onSend(messages = []) {
  for (let i = 0; i < messages.length; i++) {
    fetch('http://api.talkingstatues.xyz/api/chatterbot/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: messages[i].text,
      })
    })
    .then((response) => response.json())
    .then((data) => {
      let response = [{
        _id: this.state.messages.length + 1,
        text: data.text,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://facebook.github.io/react/img/logo_og.png',
        },
      }];

      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, response),
        };
      });
    })
    .catch((error) => console.log(error));
  }

  this.setState((previousState) => {
    return {
      messages: GiftedChat.append(previousState.messages, messages),
    };
  });
}

render() {
 console.log("RENDERING NOW")
 return (
   <GiftedChat
   messages={this.state.messages}
   onSend={this.onSend}
   user={{
    _id: 1,
  }}
  />
  );
}
}