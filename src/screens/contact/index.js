import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ScrollView, Dimensions, Image, Text, TouchableOpacity, AsyncStorage, Modal } from 'react-native';
import ActivityIndicators from '../../Components/loader';
import API from '../../services/apiRequest';
import { Actions } from 'react-native-router-flux';
const { height, width } = Dimensions.get('window');

export default class Contact extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isRememberMe: true,
            loading: false,
            ContactList: [],
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

        this.setState({loading:true})
        console.log('resp>>>>123___', this.props.item)
        API(`Lookup/GetCompanyContacts?companyId=${this.props.item.CompanyId}`, 'GET', null, this.state.token).then(resp => {
            console.log('resp>>>>123>>>contact', resp)
            this.setState({loading:false})
            this.setState({ ContactList: resp })
        })


    }

    renderItem = ({ item,index }) => {
        console.log('a>>>',item)
        return (
            <View>
                <TouchableOpacity onPress={() => Actions.ContactDetails({item:item})} style={{ flexDirection: 'row', height: height * 0.075, width, justifyContent: 'center' }}>
                    <View style={{ justifyContent: 'space-between', width, flexDirection: 'row', paddingHorizontal: 20 }}>
                        <View style={{ justifyContent: 'center', width: width * 0.15 }}>
                            <Image style={{ height: 37.5, width: 37.5, alignSelf: 'center' }} source={require('../../assets/contact.png')} />
                        </View>
                        <View style={{ width: width * 0.75, justifyContent: 'center', borderBottomWidth: 1, borderColor: 'gray', marginLeft: 20}}>
                            <Text style={{ fontSize: 18 }}>{item.FirstName +' '+ item.LastName}</Text>
                            <Text>{item.ContactTypeName}</Text>
                        </View>
                    </View>

                </TouchableOpacity>
                {this.state.details === index ?
                <View style={{borderWidth:1,alignSelf:'center',marginTop:20,padding:20}}>

                    <Text style={{ color: '#000', fontSize: 20, marginVertical: 10 }}>Contact Details</Text>
                                <Text style={{ fontSize: 15, color: '#000' }}>{this.props.item.CompanyName ? this.props.item.CompanyName : ''}</Text>
                                <Text style={{ fontSize: 15, color: '#000' }}>{this.props.item.Address1 ? this.props.item.Address1 : ''}</Text>
                                <Text style={{ fontSize: 15, color: '#000' }}>{`${this.props.item.City ? this.props.item.City : ''}, ${this.props.item.Country ? this.props.item.Country : ''}`}</Text>
                                <Text style={{ fontSize: 15, color: '#000' }}>{this.props.item.PostalCode ? this.props.item.PostalCode : ''}</Text>
                                <Text style={{ fontSize: 15, color: '#000' }}>{this.props.item.PhoneNumber ? this.props.item.PhoneNumber : ''}</Text>
                                
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
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', }}>Contact list</Text>

                    <View style={{ alignItems: "center", height: '100%', flexDirection: 'row', width: '20%', justifyContent: 'space-between',alignItems:'center' }}>
                       <TouchableOpacity style={{height:'100%',justifyContent:'center'}} onPress={()=>{Actions.ContactFilter({item:this.props.item})}}>
                           <Image style={{ height: 25, width: 25 }} source={require('../../assets/filter.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity style={{height:'100%',justifyContent:'center'}} onPress={()=>Actions.pop()}><Text style={{fontSize:20,color:'#fff'}}>X</Text></TouchableOpacity>


                        {/* <Image style={{ height: 25, width: 25 }} source={require('../../assets/logout.png')} /> */}
                    </View>
                </View>

                <Text style={{fontSize:23,fontWeight:'bold',alignSelf:'center',color:'#000',marginVertical:20}}>ARM Utilities</Text>
                       
                        {this.state.ContactList.length ?
                            <FlatList
                                data={this.state.ContactList}
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
