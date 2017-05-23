import React, { Component } from 'react';
import {
	DeviceEventEmitter,
} from 'react-native'

import Beacons from 'react-native-beacons-manager'

import PushNotification from 'react-native-push-notification'

export default class AbstractBeacon {

	static all_beacons = null;
	static active_beacons = [];

	static isBeaconKnown(beacon_uuid) {
		if (AbstractBeacon.all_beacons != null) {
			for (let i = 0; i < AbstractBeacon.all_beacons.length; i++) {
				if (AbstractBeacon.all_beacons[i].fields.uuid == beacon_uuid)
					return true;
			}
		}
		return false;
	}

	static init() {

		fetch('http://api.talkingstatues.xyz/beacons')
		.then((response) => response.json())
		.then((data) => {
			AbstractBeacon.all_beacons = JSON.parse(data.latest_beacon_list);
			// console.log("FECTHED", AbstractBeacon.all_beacons);
		})
		.catch((error) => console.log(error));

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
				console.log(data.beacons);
				for (let i = 0; i < data.beacons.length; i++) {
					if (AbstractBeacon.isBeaconKnown(data.beacons[i].uuid)) {
						console.log('beaconsDidRange data: ', data.beacons[i]);
						if (AbstractBeacon.active_beacons.indexOf(data.beacons[i].uuid) < 0) {
							AbstractBeacon.active_beacons.push(data.beacons[i].uuid);
							console.log("NEW BEACONS INSERTED")
							PushNotification.localNotification({
								title: "<Statuen>",
								message: "There is a statue nearby :)", // (required)
								date: Date.now(),
								actions: '["Chat !"]',
								tag: 'OK',
								category: 'OK'
							});
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
				}
			});
	}
}