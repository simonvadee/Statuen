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
    paddingTop:0,
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
  },
  bannerImage:{
    position: 'relative',
    top:0,
    left:0,
    width:null,
    height:150,
    resizeMode:'contain',
  },
  sideBySideImage:{
    width:null,
    height:150,
    resizeMode:'contain',
    flex:.5,
  },
  imageText:{
    paddingLeft:40,
    paddingRight:40,
    fontSize:10,
  },
  multipleSidebySide:{
    paddingLeft:20,
    paddingRight:20,
  }
})

export default class AboutScreen extends Component {

  render() {

    return (
			<ScrollView style={{flex:1, flexDirection:'column'}}>
				<View style={{flex:5, backgroundColor:'white'}}>
					<Text style={styles.aboutHeader}>{`
Statuen
by Team EPS
www.talkingstatues.xyz
Version 0.1
					`}</Text>
					<Image
							style={styles.bannerImage}
							source={require('./TeamEPS.png')}
					/>
					<Text style={styles.imageText}>
						Team EPS consists of 6 international students studying at The Hague University of Applied Sciences.
					</Text>

				</View>
				<View style={{flex:5}}>
					<Text style={styles.aboutText}>{`
This application was made as a project for the Trans-National Creative Exchange (TNCE) in 2017. The aim of TNCE is to be an international platform supporting the emerging creative talent from Europe and China.`}</Text>
					<View style={{paddingLeft:20, paddingRight:20, flex:1, flexDirection:'row'}}>
						<View style={{flex:1}}>
							<Image
									style={styles.sideBySideImage}
									source={require('./logo_tnce.png')}
							/>
						</View>
						<View style={{flex:3}}>
							<Image
									style={styles.sideBySideImage}
									source={require('./logo_CE.png')}
							/>
						</View>
					</View>
				</View>
				<View style={{flex:3, backgroundColor:'white'}}>
					<Text style={styles.aboutText}>
						Statuen is a multi-platform application made by Team EPS intended to make art interactive by using beacons (small wireless locating devices).
					</Text>
				</View>
				<View style={{paddingLeft:20, paddingRight:20, flex:1, flexDirection:'row'}}>
					<View style={{flex:1}}>
						<Image
								style={styles.sideBySideImage}
								source={require('./logo_eps.png')}
						/>
					</View>
					<View style={{flex:3}}>
						<Image
								style={styles.sideBySideImage}
								source={require('./logo_hhs.png')}
						/>
					</View>
				</View>
				<View style={{flex:3, backgroundColor:'white'}}>
					<Text style={styles.aboutHeader}>
						Thank you
					</Text>
					<Text style={styles.aboutText}>
                      {`Airbnb maps API
Estimote
Chatterbot
React Native
Gifted Chat`}		</Text>
				</View>
				<View style={styles.aboutImages}>
					<Image
							style={{width: 50, height: 50}}
							source={require('./AirBnB.png')}
					/>
					<Image
							style={{width: 50, height: 50}}
							source={require('./logo_estimote.png')}
					/>
					<Image
							style={{width: 50, height: 50}}
							source={require('./chatterbot.png')}
					/>
					<Image
							style={{width: 50, height: 50}}
							source={require('./React-native-icon.svg.png')}
					/>

				</View>

			</ScrollView>
    );
  }
}