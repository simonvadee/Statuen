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
        if (AbstractBeacon.all_beacons[i].fields.uuid.toLowerCase() == beacon_uuid.toLowerCase()) {
          return AbstractBeacon.all_beacons[i].fields.slug_statue;
        }
      }
    }
    return null;
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
          console.info('Searching for Beacons in this Region: ' +data.region.identifier);
          for (let i = 0; i < data.beacons.length; i++) {
            let statue_slug = null;
            if ((statue_slug = AbstractBeacon.isBeaconKnown(data.beacons[i].uuid)) != null) {
              if (AbstractBeacon.active_beacons.indexOf(data.beacons[i].uuid) < 0) {
                AbstractBeacon.active_beacons.push(data.beacons[i].uuid);
                console.log("NEW BEACONS INSERTED", statue_slug)
                PushNotification.localNotification({
                  title: "<Statuen>",
                  message: "There is a statue nearby :)", // (required)
                  date: Date.now(),
                  category: 'OK',
                  userInfo: {slug:  statue_slug} //statue_slug
                });
              }
            }
          }
        }
    );
  }
}
