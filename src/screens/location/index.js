import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ScrollView, Dimensions, Image, Text, TouchableOpacity, AsyncStorage, Modal } from 'react-native';
import ActivityIndicators from '../../Components/loader';
import API from '../../services/apiRequest';
import { Actions } from 'react-native-router-flux';
const { height, width } = Dimensions.get('window');

export default class Location extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isRememberMe: true,
            loading: false,
            locationList: [],
            modalVisible: false,
            details:-1
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('token').then(token => {
            console.log('>>>>>>', token)
            this.setState({ token }, () => this.initialData())
        })



    }
    initialData = () => {

         console.log('resp>>>>123___', this.props.item)
        this.setState({loading:true})
        API(`Lookup/GetLocations?companyId=${this.props.item.CompanyId}`, 'GET', null, this.state.token).then(resp => {
            console.log('resp>>>>123', resp)
            this.setState({ locationList: resp,loading:false })
        })


    }

    renderItem = ({ item,index }) => {
        console.log('item>>>',item)
        return (
            <View>
                <TouchableOpacity onPress={() => this.setState({details:this.state.details === index ? -1 : index})} style={{ flexDirection: 'row', height: height * 0.075, width, justifyContent: 'center' }}>
                    <View style={{ justifyContent: 'space-between', width, flexDirection: 'row', paddingHorizontal: 20 }}>
                        <View style={{ justifyContent: 'center', width: width * 0.15 }}>
                            <Image style={{ height: 37.5, width: 37.5, alignSelf: 'center' }} source={require('../../assets/location.png')} />
                        </View>
                        <View style={{ width: width * 0.75, justifyContent: 'center', borderBottomWidth: 1, borderColor: 'gray', marginLeft: 20 }}>
                            <Text style={{ fontSize: 18 }}>{item.LocationName}</Text>
                            {/* <Text>{item.CompanyTypeName}</Text> */}
                        </View>
                    </View>

                </TouchableOpacity>
                {this.state.details === index ?
                <View style={{backgroundColor:'#fff',alignSelf:'center',marginTop:20,padding:20,width:'90%',elevation:10,shadowOffset: { width: 10, height: 10 },}}>

                    <Text style={{ color: '#000', fontSize: 22, marginVertical: 10 }}>Location Details</Text>
                                <Text style={{ fontSize: 15, color: '#000' }}>{item.CompanyName ? this.props.item.CompanyName : ''}</Text>
                                <Text style={{ fontSize: 15, color: '#000' }}>{item.Address1 ? this.props.item.Address1 : ''}</Text>
                                <Text style={{ fontSize: 15, color: '#000' }}>{`${item.City ? item.City : ''}, ${item.Country ?item.Country : ''}`}</Text>
                                <Text style={{ fontSize: 15, color: '#000' }}>{item.PostalCode ? item.PostalCode : ''}</Text>
                                <Text style={{ fontSize: 15, color: '#000' }}>{`Phone: ${item.PhoneNumber ? item.PhoneNumber : ''}`}</Text>
                                <Text style={{ fontSize: 15, color: '#000' }}>{`latitude: ${item.Latitude ? item.Latitude : ''}`}</Text>
                                <Text style={{ fontSize: 15, color: '#000' }}>{`logitude: ${item.Longitude ? item.Longitude : ''}`}</Text>


                </View>
                :<View />} 
                            </View>
        )

    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                {this.state.loading ?
                    <ActivityIndicators />
                    : null}

                <View style={{ width, height: height * 0.075, backgroundColor: 'rgb(62,66,71)', justifyContent: 'space-between', paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', }}>Location Details</Text>


                    <TouchableOpacity onPress={()=>Actions.pop()}><Text style={{fontSize:24,color:'#fff'}}>x</Text></TouchableOpacity>

                </View>
                       
                        {this.state.locationList.length ?
                            <FlatList
                                data={this.state.locationList}
                                renderItem={this.renderItem}
                                showsVerticalScrollIndicator={false}
                                extraData={this.state}
                            />
                            : null}

            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100
    },
    textInput: {
        fontSize: 16,
        height: 40,
        color: '#fff'
    },
    inputLayout: {
        marginTop: 16,
        marginHorizontal: 36,
        width: '95%',
        alignSelf: 'center'
    }
});
