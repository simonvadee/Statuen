import React, { Component } from 'react';
import {
	DeviceEventEmitter,
	Platform
} from 'react-native'

import Beacons from 'react-native-beacons-manager'

export default class AbstractBeacon {
	constructor(props) {
	}

	static init() {
		const region = {
			identifier: "test",
			uuid: "B9407F30-F5F8-466E-AFF9-25556B57FE6D"
		}
		Beacons.requestAlwaysAuthorization();
		Beacons.startRangingBeaconsInRegion(region);
		Beacons.startUpdatingLocation();

		DeviceEventEmitter.addListener(
			'beaconsDidRange',
			({region: {identifier, uid}}, beacons) => {
				console.log('beaconsDidRange these beacons: ', beacons);
			});
	}
}