# TalkingStatuesApp
Main smartphone application for THUAS EPS 2017

## Installation instruction

### Setup node js enviroment
- Optional Install Homebrew on MacOS
- Install android studio as well as an AVD emulator for ease of testing
- Install xcode 
- Setup node.js 
Follow [tutorial here](https://facebook.github.io/react-native/docs/getting-started.html) or google 

### Git and fetch requisites
Clone the project
```
git clone https://github.com/NeskireDK/TalkingStatuesApp
```

Download dependensies
```
npm install
```
Link dependensies to iOS and android project
```
react-native link
```

## Run app
Running on iOS
```
react-native run-ios
```
Running on Android 
```
react-native run-android
```

Running via device, easiest to open appropiate project file (ios example /ios/*.xcodeproject) for ios / android in either android studio or xcode, select device via build options / run.
 
 ### Logging / debugging 
 iOS debug
 ```
 react-native log-ios
 ```
  Android debug
  ```
  react-native log-android
  ```
  