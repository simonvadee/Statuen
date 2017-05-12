import React, { Component } from 'react';
import {
	View,
	Text,
  	ScrollView,
  	StyleSheet,
  	Image,
} from 'react-native'

const styles = StyleSheet.create({

  aboutText: {
    fontSize: 16,
	textAlign: 'center',
    padding:20,
  },
  aboutHeader: {
    fontSize: 24,
    textAlign: 'center',

  },
  aboutImages:{
    flex: 5,
    padding:20,
    flexDirection: 'row',
    justifyContent: 'space-between',


  }
})

export default class AboutScreen extends Component {

	render() {
		return (
			<ScrollView style={{flex:1, flexDirection:'column'}}>
				<View style={{flex:5, backgroundColor:'white'}}>
					<Text style={styles.aboutHeader}>{`
Talking Statues
by Team EPS
www.talkingstatues.xyz
Version 0.1
					`}</Text>
				</View>
				<View style={{flex:5}}>
					<Text style={styles.aboutText}>{`
This application was made as a project for the Trans-National Creative Exchange (TNCE) in 2017. The aim of TNCE is to be an international platform supporting the emerging creative talent from Europe and China.
					`}</Text>
				</View>
				<View style={{flex:3, backgroundColor:'white'}}>
					<Text style={styles.aboutText}>
						Talking Statues
						Talking statues is a multi-platform application made by Team EPS intended to make art interactive by using beacons (small wireless locating devices).

						Team EPS
						A group consisting of 6 international students studying at The Hague University of Applied Sciences.

					</Text>
				</View>
				<View style={{flex:3, backgroundColor:'white'}}>
					<Text style={styles.aboutHeader}>{`
Thank you
Airbnb maps API
Estimote
Chatterbot
React Native
Gifted Chat
					`}</Text>
				</View>
				<View style={styles.aboutImages}>
					<Image
							style={{width: 50, height: 50}}
							source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
					/>
					<Image
							style={{width: 50, height: 50}}
							source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
					/>
					<Image
							style={{width: 50, height: 50}}
							source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
					/>
					<Image
							style={{width: 50, height: 50}}
							source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
					/>
				</View>
			</ScrollView>
		);
	}
}