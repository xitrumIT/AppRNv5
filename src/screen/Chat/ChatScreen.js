import React, {Component} from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Alert,
  SafeAreaView,
  Animated,
  ActivityIndicator,
} from 'react-native';

import {CustomHeader} from '../Drawer/CustomHeader';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/storage';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export class ChatScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader
          title="Chat"
          isHome={true}
          navigation={this.props.navigation}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Man hinh chat</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});
// import React, {Component} from 'react';
// import {View, Text} from 'react-native';
// import {Icon} from 'native-base';
// import firebase from 'react-native-firebase';
// import {GiftedChat} from 'react-native-gifted-chat';
// import {Dialog, TouchableEffect} from 'react-native-simple-dialogs';
// import DocumentPicker from 'react-native-document-picker';
// import ImagePicker from 'react-native-image-picker';

// var name, uid, email;
// const options = {
//   title: 'Select Image',
//   // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
//   storageOptions: {
//     skipBackup: true,
//     path: 'images',
//   },
// };

// class ChatScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       messages: [],
//       dialogVisible: false,
//     };
//     // const { navigation } = this.props;
//     this.user = firebase.auth().currentUser;
//     console.log('User:' + this.user);
//     const {navigation} = this.props;
//     uid = navigation.getParam('userID', 'NO-ID');
//     email = navigation.getParam('email', 'NO-ID');
//     this.chatRef = this.getRef().child('chat/' + this.generateChatId());
//     this.chatRefData = this.chatRef.orderByChild('order');
//     this.onSend = this.onSend.bind(this);
//     // console.log("User: reciever " + navigation.getParam('email', 'NO-ID'));
//   }

//   generateChatId() {
//     if (this.user.uid > uid) return `${this.user.uid}-${uid}`;
//     else return `${uid}-${this.user.uid}`;
//   }

//   getRef() {
//     return firebase.database().ref();
//   }
//   listenForItems(chatRef) {
//     chatRef.limitToLast(20).on('value', (snap) => {
//       // get children as an array
//       var items = [];
//       snap.forEach((child) => {
//         //var name = child.val().uid == this.user.uid ? this.user.name : name1;
//         items.push({
//           _id: child.val().createdAt,
//           text: child.val().text,
//           createdAt: new Date(child.val().createdAt),
//           image: child.val().image,
//           file: child.val().file,
//           user: {
//             _id: child.val().uid,
//             avatar: 'avatar',
//           },
//         });
//       });

//       // this.setState(previousState => ({
//       //             messages: GiftedChat.append(previousState.messages, messages),
//       //         }))
//       this.setState({
//         messages: items,
//       });
//     });
//   }
//   componentDidMount() {
//     this.listenForItems(this.chatRefData);
//   }
//   componentWillUnmount() {
//     this.chatRefData.off();
//   }

//   onSend(messages = []) {
//     // this.setState({
//     //     messages: GiftedChat.append(this.state.messages, messages),
//     // });
//     console.log('btn Click');
//     // var imageUri = this.state.avatarSource == null ? '' : this.state.avatarSource;
//     // var fileUri = this.state.fileSource == null ? '' : this.state.fileSource;
//     messages.forEach((message) => {
//       //var message = message[0];

//       var now = new Date().getTime();
//       this.chatRef.push({
//         _id: now,
//         text: message.text,
//         createdAt: now,
//         uid: this.user.uid,
//         fuid: uid,
//         email: email,
//         file: message.file,
//         image: message.image,
//         order: -1 * now,
//       });
//     });
//   }
//   render() {
//     return (
//       <View style={{flex: 1}}>
//         <Dialog
//           visible={this.state.dialogVisible}
//           title="Select the file type"
//           onTouchOutside={() => this.setState({dialogVisible: false})}>
//           <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//             <TouchableEffect onPress={this.filePicker.bind(this)}>
//               <Text>File</Text>
//             </TouchableEffect>
//             <TouchableEffect onPress={this.imagePicker.bind(this)}>
//               <Text>Image</Text>
//             </TouchableEffect>
//           </View>
//         </Dialog>

//         <Text onPress={() => this.props.navigation.goBack()}>BACK</Text>
//         <GiftedChat
//           messages={this.state.messages}
//           onSend={this.onSend.bind(this)}
//           alwaysShowSend
//           renderActions={() => {
//             return (
//               <Icon
//                 style={{fontSize: 20, marginBottom: 12, marginStart: 5}}
//                 name="paperclip"
//                 type="AntDesign"
//                 onPress={this.openPicker.bind(this)}
//               />
//             );
//           }}
//           user={{
//             _id: this.user.uid,
//           }}
//         />
//       </View>
//     );
//   }
//   openPicker = () => {
//     // alert('Picker click');
//     this.setState({dialogVisible: true});
//   };
//   filePicker = () => {
//     this.setState({dialogVisible: false});
//     try {
//       const res = DocumentPicker.pick({
//         type: [DocumentPicker.types.allFiles],
//       }).then((response) => {
//         console.log('Uploaded file in response ', response.uri);
//         var now = new Date().getTime();
//         this.chatRef.push({
//           _id: now,
//           text: response.uri,
//           createdAt: now,
//           uid: this.user.uid,
//           fuid: uid,
//           email: email,
//           file: response.uri,
//           image: '',
//           order: -1 * now,
//         });
//       });
//       console.log('Uploaded file is ', res);
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         // User cancelled the picker, exit any dialogs or menus and move on
//       } else {
//         throw err;
//       }
//     }
//   };
//   imagePicker = () => {
//     // this.setState({ dialogVisible : false});
//     ImagePicker.showImagePicker(options, (response) => {
//       console.log('Response = ', response);
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else {
//         const source = {uri: response.uri};
//         console.log('Data in response ==> ', response.uri);
//         this.setState({
//           dialogVisible: false,
//         });
//         var now = new Date().getTime();
//         this.chatRef.push({
//           _id: now,
//           text: '',
//           createdAt: now,
//           uid: this.user.uid,
//           fuid: uid,
//           email: email,
//           file: '',
//           image: response.uri,
//           order: -1 * now,
//         });
//       }
//     });
//   };
// }
// export default ChatScreen;
