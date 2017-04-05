// import React, {Component} from 'react';
// import {
//   AppRegistry,
//   Text,
//   View,
//   Button,
//   Modal,
//
// } from 'react-native'
// import { SideMenu, List, ListItem } from 'react-native-elements'
//
// export default class menu extends Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       isOpen: false,
//
//     }
//   }
//
//
//   // this.toggleSideMenu = this.toggleSideMenu.bind(this)
//
//
//   onSideMenuChange (isOpen: boolean) {
//     this.setState({
//       isOpen: isOpen
//     })
//   }
//
//   toggleSideMenu () {
//     this.setState({
//       isOpen: !this.state.isOpen
//     })
//   }
//
//   render () {
//     return(
//         <View style={{flex: 1, backgroundColor: '#ededed', paddingTop: 50}}>
//           <List containerStyle={{marginBottom: 20}}>
//             {
//               list.map((l, i) => (
//                   <ListItem
//                       roundAvatar
//                       onPress={() => console.log('Pressed')}
//                       avatar={l.avatar_url}
//                       key={i}
//                       title={l.name}
//                       subtitle={l.subtitle}
//                   />
//               ))
//             }
//           </List>
//         </View>
//     )
//
//     return (
//         <SideMenu
//             isOpen={this.state.isOpen}
//             onChange={this.onSideMenuChange.bind(this)}
//             menu={MenuComponent}>
//           <App toggleSideMenu={this.toggleSideMenu.bind(this)} />
//         </SideMenu>
//     )
//   }
// }


import React, {Component} from 'react';
import {
  View,
} from 'react-native'
//import { SideMenu, List, ListItem } from 'react-native-elements'

export default class Menu extends Component{


  render () {
    return(
        <View></View>
    )

  }
}