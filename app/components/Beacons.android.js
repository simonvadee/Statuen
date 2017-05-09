import React, { Component } from 'react';
import {
	DeviceEventEmitter,
	Platform
} from 'react-native'

import Beacons from 'react-native-beacons-manager'

export default class AbstractBeacon {
	constructor(props) {
	// fetch all beacons ans store them like : {beacon-uuid : statue-id}

	// fetch('http://talkingstatues.xyz/api/fetchAllBeacons')
	// .then((response) => response.json())
	// .then((data) => {
	// 	this.beacons = JSON.parse(data.allBeacons);
	// })
	// .catch((error) => console.log(error));
	}

	static init() {

		Beacons.checkTransmissionSupported();
		Beacons.detectEstimotes();
		Beacons
		.startRangingBeaconsInRegion("identifier", null)
		.then(() => console.log('Beacons ranging started succesfully'))
		.catch(error => console.log(`Beacons ranging not started, error: ${error}`));

		DeviceEventEmitter.addListener(
			'beaconsDidRange',
			(data) => {
				// if beacon detected and uuid of beacon belongs to the pre-fetched beacons, then send push notification 
				if (data.beacons.length > 0) {
					console.log('beaconsDidRange data: ', data.beacons[0].distance);
					// fetch('http://talkingstatues.xyz/api/beaconsDetected')
					// .then((response) => response.json())
					// .then((data) => {
					// 	this.statuesDetected = JSON.parse(data.beaconMatches);
					// 	for match in matches:
					// 		send push notificaction with link on the chat
					// })
					// .catch((error) => console.log(error));
				}
			}
			);
	}
}