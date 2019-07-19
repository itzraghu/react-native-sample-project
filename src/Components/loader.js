import React, { Component } from 'react'
import {
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native'
const { height, width } = Dimensions.get('window');

export default class ActivityIndicators extends Component {
  render() {
    return (
      <View style={[styles.container]}>
          <View style={{justifyContent:'center',backgroundColor:'#fff',width:width/2,paddingVertical:20,flexDirection:'row',}}>
        <ActivityIndicator size='small' color="#0000ff" />
        <View style={{height:30,justifyContent:'center',paddingLeft:20}}>
        <Text>Please wait...</Text>
        </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height,width,
    justifyContent: 'center',position:'absolute',alignItems:'center',zIndex:11,backgroundColor:'rgba(0,0,0,.5)'

  },

})

AppRegistry.registerComponent('App', () => App)
