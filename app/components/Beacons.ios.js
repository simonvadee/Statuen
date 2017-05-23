import React, { Component } from 'react';
import { DeviceEventEmitter } from 'react-native'
import Beacons from 'react-native-beacons-manager'
import PushNotification from 'react-native-push-notification'


export default class AbstractBeacon {

	static init() {
// Define a region which can be identifier + uuid,
// identifier + uuid + major or identifier + uuid + major + minor
// (minor and major properties are numbers)
const region = {
	identifier: 'Den Haag',
	uuid: 'C0ADED37-FAD3-4925-BC99-DDC85C275B8F'
};

const regionDarkBlue = {
	identifier: 'DarkBlue',
	uuid: '670AF0E7-C115-CD7B-11C8-1051D8D390F1'
};

    // ======================= Push notifications =======================

    // ======================= End =======================


// Request for authorization while the app is open
Beacons.requestWhenInUseAuthorization();

Beacons.startMonitoringForRegion(region);
Beacons.startRangingBeaconsInRegion(region);

    // Beacons.startMonitoringForRegion(regionDarkBlue);
    // Beacons.startRangingBeaconsInRegion(regionDarkBlue);

Beacons.startUpdatingLocation();

// Listen for beacon changes
const subscription = DeviceEventEmitter.addListener(
	'beaconsDidRange',
	(data) => {
		console.info("================================");
		console.info('Searching for Beacons in this Region: ' +data.region.identifier);
		if(data.beacons.length > 0){
			console.info('uuid: ' +data.beacons[0].uuid);
			console.info('proximity: ' +data.beacons[0].proximity);
			console.info('Major: ' +data.beacons[0].major);
			console.info('Minor: ' +data.beacons[0].minor);

			PushNotification.localNotification({
				title: "<Statuen>",
				message: "There is a statue nearby :)", // (required)
				date: Date.now(),
				category: 'OK'
			});
			switch(data.beacons[0].minor){
				case 22078:
				console.info("Blueberry Beacon detected");
				break;
				case 38732:
				console.info("ICE Beacon detected (Light blue)");
				break;
				case 9360:
				console.info("Mint Beacon detected (Greenish)")
				break;
				default:
				console.info("No valid beacons detected");
			}

            // console.debug(data.beacons);
        } else{
        	console.info("No beacons detected")
        }
    }
    );
}
}
