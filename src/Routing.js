
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView,Image } from 'react-native';
// import firebase, { Firebase } from 'react-native-firebase';
import { Router, Scene, Stack } from 'react-native-router-flux';
import CompanyList from './screens/CompanyList';
import Contacts from './screens/Contacts';
import Assets from './screens/Assets';
import CompanyDetails from './screens/companyDetails';
import Login from './screens/Login';
import Location from './screens/location';
import Contact from './screens/contact';
import ContactDetails from './screens/contactDetails';
import CompanyAssets from './screens/companyAssets/companyAssets';
import ContactFilter from './screens/allContactFilter';
import AssetsFilter from './screens/allAssetsFilter';
import CompanyFilter from './screens/companyFilter';
// import Location from './screens/location'

// class TabIcon extends Component {
//     render() {
//       var color = this.props.selected ? '#00f240' : '#301c2a';

//       return (
//         <View style={{flex:1, flexDirection:'row', alignItems:'center', alignSelf:'center', justifyContent: 'center'}}>
//         <Image style={{height:20,width:20,tintColor:'#fff'}} source={require('./assets/globe.png')} />
//           <Text style={{color: color, fontSize: 12 ,color:'#fff',marginLeft:5}}>Companies</Text>
//         </View>
//       );
//     }
//   }

const TabIcon= ({ title, focused }) => {

    console.log('test>>>',title,focused)
    // var color = this.props.selected ? '#00f240' : '#301c2a';
    return (
        <View style={{flex:1, flexDirection:'row', alignItems:'center', alignSelf:'center', justifyContent: 'center'}}>
        <Image style={{height:15,width:15,tintColor:focused ? '#fff': '#a9a9a9'}} source={require('./assets/globe.png')} />
        <Text style={{color:focused ? '#fff': '#a9a9a9', fontSize: 12 ,marginLeft:5}}>Companies</Text>
        </View>
        )
}

const TabIcon1= ({ title, focused }) => {

    console.log('test>>>1',title,focused)
    // var color = this.props.selected ? '#00f240' : '#301c2a';
    return (
        <View style={{flex:1, flexDirection:'row', alignItems:'center', alignSelf:'center', justifyContent: 'center'}}>
        <Image style={{height:20,width:20,tintColor:focused ? '#fff': '#a9a9a9'}} source={require('./assets/contact.png')} />
        <Text style={{color:focused ? '#fff': '#a9a9a9', fontSize: 12 ,marginLeft:5}}>Contacts</Text>
        </View>
        )
}

const TabIcon2= ({ title, focused }) => {

    console.log('test>>>2',title,focused)
    // var color = this.props.selected ? '#00f240' : '#301c2a';
    return (
        <View style={{flex:1, flexDirection:'row', alignItems:'center', alignSelf:'center', justifyContent: 'center'}}>
        <Image style={{height:20,width:20}} source={require('./assets/assets.png')} />
        <Text style={{color:focused ? '#fff': '#a9a9a9', fontSize: 12 ,marginLeft:5}}>Asstes</Text>
        </View>
        )
}


export default class Routing extends Component {

    render() {
        return (
            <Router>
            <Stack key="root" hideNavBar={true}>
            <Scene key="CompanyDetails" component={CompanyDetails} title="CompanyDetails" />
            <Scene key="login" component={Login} title="login" initial />
            
            <Scene key="Location" component={Location} title="Location" />
            <Scene key="Contact" component={Contact} title="Contact" />
            <Scene key="CompanyAssets" component={CompanyAssets} title="Contact" />

            <Scene key="ContactDetails" component={ContactDetails} title="ContactDetails" />
            <Scene key="ContactFilter" component={ContactFilter} title="ContactFilter" />

            <Scene key="AssetsFilter" component={AssetsFilter} title="AssetsFilter" />
            <Scene key="CompanyFilter" component={CompanyFilter} title="CompanyFilter" />


            <Scene key='tabs' tabs tabBarStyle={{backgroundColor:'rgb(62,66,71)',}} >
            <Scene initial key="Companies" icon={TabIcon}  component={CompanyList} title=" " hideNavBar={true} showLabel={false}  />
            <Scene key="Contacts" icon={TabIcon1} component={Contacts} title=" " hideNavBar={true} showLabel={false}/>
            <Scene key="Asstes" icon={TabIcon2} component={Assets} title=" " hideNavBar={true} showLabel={false} />
            </Scene>
            </Stack>
            </Router>
            );
        }
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
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
