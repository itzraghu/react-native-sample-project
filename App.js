
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,SafeAreaView} from 'react-native';
// import firebase, { Firebase } from 'react-native-firebase';
import Routing from './src/Routing';

export default class App extends Component {


  componentDidMount = () =>{
    // firebase.messaging().getToken()
    // .then(fcmToken => {
    //   if (fcmToken) {
    //     console.log(fcmToken)
    //     // user has a device token
    //   } else {
    //     // user doesn't have a device token yet
    //   }
    // });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
      <View style={{ flex:1 }}>
      <Routing />
      </View>
      </SafeAreaView>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
