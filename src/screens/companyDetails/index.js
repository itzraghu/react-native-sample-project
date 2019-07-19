import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ScrollView, Dimensions, Image, Text, TouchableOpacity, AsyncStorage, Modal } from 'react-native';
import ActivityIndicators from '../../Components/loader';
import API from '../../services/apiRequest';
import { Actions } from 'react-native-router-flux';
const { height, width } = Dimensions.get('window');

export default class CompanyDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isRememberMe: true,
            loading: false,
            locationList: [],
            modalVisible: false,
            details:false
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('token').then(token => {
            console.log('>>>>>>', token)
            this.setState({ token }, () => this.initialData())
        })



    }
    initialData = () => {
        this.setState({ loading: true })
        fetch(`https://crm-web-webapi.azurewebsites.net/Company/GetCompanyPicture?companyId='${this.props.item.CompanyId}`,
            {
                method: 'GET',
                headers: {
                     Accept:'application/json',
                    'Authorization': `Bearer ${this.state.token}`,
                }
            }
        ).then(resp => resp.json().then((image)=>{
            this.setState({loading:false})
            this.setState({image})
        })
            
           
            // resp.json().then(rsp=>{ console.log('rsp>>>',rsp)})
         

        )


        API(`Lookup/GetCompanyContacts?companyId=${this.props.item.CompanyId}`, 'GET', null, this.state.token).then(resp => {
            console.log('resp>>>>123', resp)
            this.setState({ locationList: resp })
        })


    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                {this.state.loading ?
                    <ActivityIndicators />
                    : null}

                <View style={{ width, height: height * 0.075, backgroundColor: 'rgb(62,66,71)', justifyContent: 'space-between', paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', }}>Vizybility</Text>

                    <View style={{ alignItems: "center", height: '100%', flexDirection: 'row', width: '30%', justifyContent: 'space-between' }}>
                        <Image style={{ height: 25, width: 25 }} source={require('../../assets/filter.png')} />

                        <TouchableOpacity onPress={()=>Actions.login()}><Image style={{ height: 25, width: 25 }} source={require('../../assets/logout.png')} /></TouchableOpacity>
                    </View>
                </View>
                <ScrollView sty={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', height: height * 0.075, width, justifyContent: 'center' }}>
                        <View style={{ justifyContent: 'space-between', width, flexDirection: 'row', paddingHorizontal: 20 }}>
                            <View style={{ justifyContent: 'center', width: width * 0.15 }}>
                                <Image style={{ height: 37.5, width: 37.5, alignSelf: 'center' }} source={require('../../assets/1.png')} />
                            </View>
                            <View style={{ width: width * 0.75, justifyContent: 'center', borderBottomWidth: 1, borderColor: 'gray', marginLeft: 20 }}>
                                <Text style={{ fontSize: 18 }}>{this.props.item.CompanyName}</Text>
                                <Text>{this.props.item.CompanyTypeName}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ padding: 20 }}>
                        <View style={{ flex: 1, padding: 15, elevation:this.state.loading ? 0: 10, shadowColor: 'gray', shadowOpacity: 0.5, backgroundColor:'#fff',shadowOffset: { width: 5, height: 5 },}}>

                           {this.state.image ? <Image style={{height:175,width:'90%', alignSelf:'center'}} source={{uri:this.state.image}} /> :null}
                            <View style={{ flex: 1, paddingLeft: 30 }}>
                                <Text style={{ color: '#000', fontSize: 20, marginVertical: 10 }}>Company Details</Text>
                                <Text style={{ fontSize: 15, color: '#000' }}>{this.props.item.CompanyName ? this.props.item.CompanyName : ''}</Text>
                                <Text style={{ fontSize: 15, color: '#000' }}>{this.props.item.Address1 ? this.props.item.Address1 : ''}</Text>
                                <Text style={{ fontSize: 15, color: '#000' }}>{`${this.props.item.City ? this.props.item.City : ''}, ${this.props.item.Country ? this.props.item.Country : ''}`}</Text>
                                <Text style={{ fontSize: 15, color: '#000' }}>{this.props.item.PostalCode ? this.props.item.PostalCode : ''}</Text>
                                <Text style={{ fontSize: 15, color: '#000' }}>{`Phone: ${this.props.item.PhoneNumber ? this.props.item.PhoneNumber : ''}`}</Text>
                            </View>

                            <View style={{ flex: 1, paddingVertical: 30, }}>
                                <TouchableOpacity onPress={() => {Actions.Location({item:this.props.item})}} style={{ backgroundColor: 'rgb(62,66,71)', flex: 1, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 19, color: '#fff' }}>VIEW LIST  OF ALL LOCATION</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {Actions.Contact({item:this.props.item})}} style={{ backgroundColor: 'rgb(62,66,71)', flex: 1, height: 40, marginTop: 5, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 19, color: '#fff' }}>VIEW LIST OF ALL CONTACTS</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {Actions.CompanyAssets({item:this.props.item})}} style={{ backgroundColor: 'rgb(62,66,71)', flex: 1, height: 40, marginTop: 5, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 19, color: '#fff' }}>VIEW LIST OF ALL ASSETS</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>



                </ScrollView>
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
