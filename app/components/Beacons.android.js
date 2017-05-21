import React, { Component } from 'react';
import {
	DeviceEventEmitter,
	Platform
} from 'react-native'

import Beacons from 'react-native-beacons-manager'

import PushNotification from 'react-native-push-notification'

export default class AbstractBeacon {


	isBeaconKnown(beacon_uuid) {
		for (let i = 0; i < this.beacons.lenght; i++) {
			if (this.beacons[i].uuid == beacon_uuid)
				console.log("beacon ".concat(beacon_uuid).concat(" is known"));
			return true;
		}
		return false;
	}

	static init() {

		fetch('http://api.talkingstatues.xyz/beacons')
		.then((response) => response.json())
		.then((data) => {
			console.log("///", data)
			this.beacons = JSON.parse(data.latest_beacon_list);
			// console.log('------- this beacons :: ', this.beacons)
		})
		.catch((error) => console.log(error));

		PushNotification.localNotificationSchedule({
		  message: "My Notification Message", // (required)
		  date: new Date(Date.now() + (2 * 1000)), // in 60 secs
		  actions: '["OK"]',
		  tag: 'OK',
		  category: 'OK'
		});


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
				for (let i = 0; i < data.beacons.length; i++) {
					if (isKnown(data.beacons[i].uuid)) {
						console.log('beaconsDidRange data: ', data.beacons[0]);
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
		});
	}
}