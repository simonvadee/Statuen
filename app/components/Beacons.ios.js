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
			uuid: "b9407f30-f5f8-466e-aff9-25556b57fe6d"
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