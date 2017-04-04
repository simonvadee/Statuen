import React, {Component} from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  Modal,
  TextInput,
  Image,
  Dimensions,

} from 'react-native'
import styles from '../style';



export default class WelcomeModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }
  state = {
    modalVisible: true,
  }


  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  render() {
    console.log('Rendering Modal');
    var viewportWidth = Dimensions.get('window').width; //full width
    var viewportHeight = Dimensions.get('window').height; //full height

    return(

        <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {alert("Modal has been closed.")}}
        >
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',

          }}>
            <View style={{width: viewportWidth, height:100, backgroundColor: 'powderblue', paddingTop:40}} >
              <TextInput
                placeholder="Input username"
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
              />
              <Image
                  source={require('../src/avatar.png')}
                  style={styles.avatar}
              />

            </View>
            <View style={{width: viewportWidth, height: 50, backgroundColor: 'white'}} />
            
            <View style={{}} >
              <Button
                  style={styles.alignBottom}
                  title="Submit"
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible)
                  }}
              />
            </View>
          </View>




        </Modal>
    );
  }
}
module.exports = WelcomeModal;
AppRegistry.registerComponent('WelcomeModal', () => WelcomeModal);