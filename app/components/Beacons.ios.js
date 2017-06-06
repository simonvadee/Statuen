import React, { Component } from 'react';
import { DeviceEventEmitter } from 'react-native'
import Beacons from 'react-native-beacons-manager'
import PushNotification from 'react-native-push-notification'


export default class AbstractBeacon {

	
	static all_beacons = null;
	static active_beacons = [];

	static isBeaconKnown(beacon_uuid) {
		if (AbstractBeacon.all_beacons != null) {
			for (let i = 0; i < AbstractBeacon.all_beacons.length; i++) {
				if (AbstractBeacon.all_beacons[i].fields.uuid.toLowerCase() == beacon_uuid)
					return true;
			}
		}
		return false;
	}

	static init() {

	// Define a region which can be identifier + uuid,
	// identifier + uuid + major or identifier + uuid + major + minor
	// (minor and major properties are numbers)
	fetch('http://api.talkingstatues.xyz/beacons')
	.then((response) => response.json())
	.then((data) => {
		AbstractBeacon.all_beacons = JSON.parse(data.latest_beacon_list);
		console.log("FECTHED", AbstractBeacon.all_beacons);
	})
	.catch((error) => console.log(error));

	const region = {
		identifier: 'Den Haag',
		uuid: 'C0ADED37-FAD3-4925-BC99-DDC85C275B8F'
	};
	// Request for authorization while the app is open
	Beacons.requestWhenInUseAuthorization();

	Beacons.startMonitoringForRegion(region);
	Beacons.startRangingBeaconsInRegion(region);

	Beacons.startUpdatingLocation();

	// Listen for beacon changes
	const subscription = DeviceEventEmitter.addListener(
		'beaconsDidRange',
		(data) => {
			console.info('Searching for Beacons in this Region: ' +ndata.region.identifier);
			for (let i = 0; i < data.beacons.length; i++) {
				if (AbstractBeacon.isBeaconKnown(data.beacons[i].uuid)) {
					if (AbstractBeacon.active_beacons.indexOf(data.beacons[i].uuid) < 0) {
						AbstractBeacon.active_beacons.push(data.beacons[i].uuid);
						console.log("NEW BEACONS INSERTED")
						PushNotification.localNotification({
							title: "<Statuen>",
							message: "There is a statue nearby :)", // (required)
							date: Date.now(),
							category: 'OK'
						});

					}
				}
			}

		}
		);
}
}
