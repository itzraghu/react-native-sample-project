import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ScrollView, Dimensions, Image, Text, TouchableOpacity, AsyncStorage, Modal } from 'react-native';
import ActivityIndicators from '../../Components/loader';
import API from '../../services/apiRequest';
import { Actions } from 'react-native-router-flux';
const { height, width } = Dimensions.get('window');

export default class ContactDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isRememberMe: true,
            loading: false,
            ContactList: [],
            modalVisible: false,
            details: -1
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
        fetch(`https://crm-web-webapi.azurewebsites.net/Contact/GetContactPicture?companyId='${this.props.item.CompanyId}`,
            {
                method: 'GET',
                headers: {
                     Accept:'application/json',
                    'Authorization': `Bearer ${this.state.token}`,
                }
            }
        ).then(resp => resp.json().then((image)=>{

            console.log('pic>>>',image)
            this.setState({loading:false})
            this.setState({image})
        })
            
           
            // resp.json().then(rsp=>{ console.log('rsp>>>',rsp)})
         

        )

        console.log('resp>>>>123___', this.props.item)
        API(`Lookup/GetCompanyContacts?companyId=${this.props.item.CompanyId}`, 'GET', null, this.state.token).then(resp => {
            console.log('resp>>>>123>>>contact', resp)
            this.setState({ ContactList: resp })
        })


    }

    
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                {this.state.loading ?
                    <ActivityIndicators />
                    : null}

                <View style={{ width, height: height * 0.075, backgroundColor: '#ff3300', paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
                 <TouchableOpacity onPress={() => { Actions.pop() }}><Image style={{ height: 25, width: 25 }} source={require('../../assets/back.png')} /></TouchableOpacity>

                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 20 }}>Details</Text>

                </View>

                <View style={{
                    elevation: this.state.loading ?0: 10,
                    shadowOffset: this.state.loading ?  { width: 0, height: 0, }: { width: 10, height: 10, },
                    backgroundColor:'#fff',
                    alignSelf: 'center', marginTop: 20, padding: 20
                }}>

                    <Text style={{ color: '#000', fontSize: 20, marginVertical: 10, }}>Contact Details</Text>

                  {this.state.image ?  <Image style={{width:width*0.75,height:200 ,alignSelf:'center'}} source={{uri:this.state.image}} /> :null}

                    <Text style={{ fontSize: 15, color: '#000' ,marginTop:10 }}>{this.props.item.CompanyName ? this.props.item.CompanyName : ''}</Text>
                    <Text style={{ fontSize: 15, color: '#000' }}>{this.props.item.Address1 ? this.props.item.Address1 : ''}</Text>
                    <Text style={{ fontSize: 15, color: '#000' }}>{`${this.props.item.City ? this.props.item.City : ''}, ${this.props.item.Country ? this.props.item.Country : ''}`}</Text>
                    <Text style={{ fontSize: 15, color: '#000' }}>{this.props.item.PostalCode ? this.props.item.PostalCode : ''}</Text>
                    {this.props.item.PhoneNumber ? <Text style={{ fontSize: 15, color: '#000' }}>{this.props.item.PhoneNumber ? this.props.item.PhoneNumber : ''}</Text>:null}
                    <Text style={{ color: 'skyblue',textDecorationLine:'underline' }}>{this.props.item.Email}</Text>
                    <Text style={{fontSize: 15, color: '#000' }}>{`Phone: ${this.props.item.Mobile}`}</Text>

                    <Text style={{ color: '#000', fontSize: 18, marginVertical: 10, fontWeight:'bold' }}>Contact Activities</Text>
                    <View style={{width:width/1.5,flexDirection:'row',borderWidth:1,height:30}}>
                        <View style={{width:'33%',borderColor:'#000',borderWidth:1,height:'100%',justifyContent:'center',paddingLeft:10}}>
                            <Text style={{color:'#000'}}>Date</Text>
                        </View>
                        <View style={{width:'34%',borderColor:'#000',borderWidth:1,height:'100%',justifyContent:'center',paddingLeft:10}}>
                        <Text style={{color:'#000'}}>Subject</Text>
                        </View>
                        <View style={{width:'33%',borderColor:'#000',borderWidth:1,height:'100%',justifyContent:'center',paddingLeft:10}}>
                        <Text style={{color:'#000'}}>Details</Text>
                        </View>

                    </View> 

                </View>
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
