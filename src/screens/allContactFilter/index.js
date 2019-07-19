import React, { Component } from 'react';
import { TextInput, View, FlatList, ScrollView, Dimensions, Image, Text, TouchableOpacity, AsyncStorage, Modal,StyleSheet } from 'react-native';
import ActivityIndicators from '../../Components/loader';
import API from '../../services/apiRequest';
import { Actions } from 'react-native-router-flux';
const { height, width } = Dimensions.get('window');

export default class ContactFilter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isRememberMe: true,
            loading: false,
            ContactList: [],
            modalVisible: false,
            details: -1,
            search:''
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
        console.log('resp>>>>123___', this.props.item)
        API('/Contact/GetContacts', 'GET', null, this.state.token).then(resp => {
            console.log('resp>>>>>', resp)
            this.setState({loading:false})

            this.setState({ ContactList: resp })
        })

    }

    renderItem = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => Actions.ContactDetails({ item: item })} style={{ flexDirection: 'row', height: height * 0.075, width, justifyContent: 'center' }}>
                    <View style={{ justifyContent: 'space-between', width, flexDirection: 'row', paddingHorizontal: 20 }}>
                        <View style={{ justifyContent: 'center', width: width * 0.15 }}>
                            <Image style={{ height: 37.5, width: 37.5, alignSelf: 'center' }} source={require('../../assets/contact.png')} />
                        </View>
                        <View style={{ width: width * 0.75, justifyContent: 'center', borderBottomWidth: 1, borderColor: 'gray', marginLeft: 20 }}>
                            <Text style={{ fontSize: 18 }}>{item.FirstName + ' ' + item.LastName}</Text>
                            <Text>{item.Title}</Text>
                        </View>
                    </View>

                </TouchableOpacity>
                {this.state.details === index ?
                    <View style={{ backgroundColor:'#fff',elevation:10,shadowOffset: { width: 10, height: 10 }, alignSelf: 'center', marginTop: 20, padding: 20 }}>

                        <Text style={{ color: '#000', fontSize: 20, marginVertical: 10 }}>Contact Details</Text>
                        <Text style={{ fontSize: 15, color: '#000' }}>{this.props.item.CompanyName ? this.props.item.CompanyName : ''}</Text>
                        <Text style={{ fontSize: 15, color: '#000' }}>{this.props.item.Address1 ? this.props.item.Address1 : ''}</Text>
                        <Text style={{ fontSize: 15, color: '#000' }}>{`${this.props.item.City ? this.props.item.City : ''}, ${this.props.item.Country ? this.props.item.Country : ''}`}</Text>
                        <Text style={{ fontSize: 15, color: '#000' }}>{this.props.item.PostalCode ? this.props.item.PostalCode : ''}</Text>
                        <Text style={{ fontSize: 15, color: '#000' }}>{this.props.item.PhoneNumber ? this.props.item.PhoneNumber : ''}</Text>

                    </View>
                    : <View />}
            </View>
        )

    }

    search = (text) =>{


        console.log('SearchTest>>>',text)


        let arr =[];

          text = text.toUpperCase();

            this.state.ContactList.map(item=>{

                console.log('item>>>search',item)


                if ((item.FirstName.toUpperCase().indexOf(text) > -1)||item.LastName.toUpperCase().indexOf(text) > -1)
                {

                    console.log('item>>>searchResult',item)

                    arr.push(item);

                }


              

            })

            this.setState({ContactList1:arr})

            

    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                {this.state.loading ?
                    <ActivityIndicators />
                    : null}

                <View style={{ width, height: height * 0.075, backgroundColor: '#ff3300', paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
                   <TouchableOpacity onPress={()=>Actions.pop()}><Image style={{ height: 25, width: 25 }} source={require('../../assets/back.png')} />
                   </TouchableOpacity>

                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 20 }}>All Contacts</Text>

                </View>
                    <Text style={{alignSelf:"center",marginTop:10,fontSize:18}}>Search by name</Text>
                <View style={{height:40,width:width*0.75,borderColor:'lightgray',alignSelf:'center',backgroundColor:'#fff',borderWidth:1,marginVertical:10,justifyContent:'space-between',alignItems:'center',flexDirection:'row',paddingHorizontal:10,elevation:10,shadowOffset: { width: 10, height: 10 },}}>
                   <Image style={{height:18,width:18}} source={require('../../assets/search.png')} />
                   <View style={{height:'100%',justifyContent:'center'}}><TextInput style={{fontSize:18,width:width*0.5}} placeholder='Search' onChangeText={(search)=>{this.setState({search},()=>this.search(this.state.search)) }} value={this.state.search} /></View>
                   <TouchableOpacity><Text onPress={()=>{this.setState({search:''},()=>{this.search(this.state.search)})}} style={{fontSize:20}}>X</Text></TouchableOpacity>
                </View>

              

                {this.state.ContactList1?

                        <FlatList
                        data={this.state.ContactList1}
                        renderItem={this.renderItem}
                        showsVerticalScrollIndicator={false}
                        />
                   : this.state.ContactList.length ?
                    <FlatList
                        data={this.state.ContactList}
                        renderItem={this.renderItem}
                        showsVerticalScrollIndicator={false}
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
