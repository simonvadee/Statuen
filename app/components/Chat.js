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

  componentDidMount() {
  	console.log("DID MOUNT");
  }

  componentDidUpdate() {
  	console.log("DID UPDATE");
  }

  componentWillMount() {
  	console.log("WILL MOUNT");
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
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  constructor(props) {
    super(props);
    this.state = {messages: []};
    this.onSend = this.onSend.bind(this);
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