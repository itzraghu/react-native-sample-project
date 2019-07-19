import React, { Component } from 'react';
import { TextInput, View, FlatList, ScrollView, Dimensions, Image, Text, TouchableOpacity, AsyncStorage, Modal, StyleSheet } from 'react-native';
import ActivityIndicators from '../../Components/loader';
import API from '../../services/apiRequest';
import { Actions } from 'react-native-router-flux';
const { height, width } = Dimensions.get('window');

export default class CompanyFilter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isRememberMe: true,
            loading: false,
            CompanyList: [],
            modalVisible: false,
            details: -1,
            search: '',
            tab: null
        }
    }

    componentDidMount() {

        AsyncStorage.getItem('token').then(token => {
            console.log('>>>>>>', token)
            this.setState({ token }, () => this.initialData())
        })

    

    }

    initialData =()=>{

        API('Company/GetCompanies', 'GET', null, this.state.token).then(resp => {
            console.log('resp>>>>>', resp)
            this.setState({loading:false})
            this.setState({ CompanyList: resp })
        })
    }


    renderItem = ({ item,index }) => {
        console.log('a>>>123',item)
        return (
            <View sty={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', height: 'auto', width, justifyContent: 'center' }}>
                        <View style={{ width,  paddingHorizontal: 20 }}>
                            {/* <View style={{ justifyContent: 'center', width: width * 0.15 }}>
                                <Image style={{ height: 37.5, width: 37.5, alignSelf: 'center' }} source={require('../../assets/bgLoginBottom.jpg')} />
                            </View> */}
                            {
                                (this.state.tab === null)||(this.state.tab === false) ?
                            
                            <TouchableOpacity onPress={()=>{this.state.details !== index ? this.setState({details:index}):this.setState({details:-1})}} style={{ width: width * 0.75, justifyContent: 'center', borderBottomWidth: 1, borderColor: 'gray', marginLeft: 20,marginTop:10,height:50 }}>
                                <Text style={{ fontSize: 18 }}>{item.CompanyName}</Text>
                               {this.state.tab === false ? <Text>{item.CompanyTypeName}</Text> :null}
                            </TouchableOpacity>
                            :
                            this.state.tab === true ?
                            <TouchableOpacity onPress={()=>{this.state.details !== index ? this.setState({details:index}):this.setState({details:-1})}} style={{ width: width * 0.75, justifyContent: 'center', borderBottomWidth: 0, borderColor: 'gray', marginLeft: 20,marginTop:10 }}>

                            <Text style={{ fontSize: 18, color: '#000',fontWeight:'bold' }}>{item.CompanyName ? item.CompanyName : ''}</Text>
                            <Text style={{ fontSize: 15, color: '#000' }}>{item.Country ? item.Country : ''}</Text>
                            <Text style={{ fontSize: 15, color: '#000' }}>{item.LocationName ? item.LocationName : ''}</Text>
                            <Text style={{ fontSize: 15, color: '#000' }}>{item.PostalCode ? item.PostalCode : ''}</Text>
                            </TouchableOpacity>
                            :null
                            }
                        </View>
                    </View>
                    {this.state.details === index ?
                    <View style={{ padding: 20 }}>
                        <View style={{ flex: 1, padding: 15, elevation: 10,backgroundColor:'#fff',shadowOffset: { width: 5, height: 5 }}}>

                            <View style={{ flex: 1, paddingLeft: 30 }}>
                                <Text style={{ color: '#000', fontSize: 20, marginVertical: 10 }}>Company Details</Text>
                                <Text style={{ fontSize: 15, color: '#000' }}>{item.CompanyName ? item.CompanyName : ''}</Text>
                                <Text style={{ fontSize: 15, color: '#000' }}>{item.Address1 ? item.Address1 : ''}</Text>
                                <Text style={{ fontSize: 15, color: '#000' }}>{`${item.City ? item.City : ''}, ${item.Country ? item.Country : ''}`}</Text>
                                <Text style={{ fontSize: 15, color: '#000' }}>{item.PostalCode ? item.PostalCode : ''}</Text>
                                <Text style={{ fontSize: 15, color: '#000' }}>{`Phone: ${item.PhoneNumber ? item.PhoneNumber : ''}`}</Text>
                            </View>

                            <View style={{ flex: 1, paddingVertical: 25, }}>
                                <TouchableOpacity onPress={() => {Actions.Location({item:item})}} style={{ backgroundColor: 'rgb(62,66,71)', flex: 1, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 19, color: '#fff' }}>VIEW LIST  OF ALL LOCATION</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {Actions.Contact({item:item})}} style={{ backgroundColor: 'rgb(62,66,71)', flex: 1, height: 40, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 19, color: '#fff' }}>VIEW LIST OF ALL CONTACTS</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {Actions.CompanyAssets({item:item})}} style={{ backgroundColor: 'rgb(62,66,71)', flex: 1, height: 40, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 19, color: '#fff' }}>VIEW LIST OF ALL ASSETS</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                    :null}



                </View>
        )

    }


    search = (text) =>{


        console.log('SearchTest>>>',text)


        let arr =[];

          text = text.toUpperCase();

            this.state.CompanyList.map(item=>{

                console.log('item>>>search',item)


                if(this.state.tab === null)
                {
                    if (item.CompanyName.toUpperCase().indexOf(text) > -1)  arr.push(item);

                }
                else if(this.state.tab === true)
                {
                    if (item.LocationName.toUpperCase().indexOf(text) > -1)  arr.push(item);

                }
                else if(this.state.tab === false)
                {
                    if (item.CompanyTypeName.toUpperCase().indexOf(text) > -1)  arr.push(item);

                }

            })

            this.setState({CompanyList1:arr})

            

    }




    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                {this.state.loading ?
                    <ActivityIndicators />
                    : null}

                <View style={{ width, height: height * 0.075, backgroundColor: '#ff3300', paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
                    {/* <TouchableOpacity onPress={()=>Actions.pop()}><Image style={{ height: 25, width: 25 }} source={require('../../assets/back.png')} /> */}
                    {/* </TouchableOpacity> */}

                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 20 }}>Filter</Text>

                </View>
                <View style={{ height: height * 0.075, width, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={()=>{this.setState({tab:null})}} style={{ width: width / 3,borderBottomWidth:this.state.tab === null ? 3:0, justifyContent: 'center', borderColor: '#ff3300' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', alignSelf: 'center', color: '#000' }}>Name</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.setState({tab:true})}} style={{ width: width / 3, borderBottomWidth:this.state.tab === true ? 3:0, justifyContent: 'center', borderColor: '#ff3300' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', alignSelf: 'center', color: '#000' }}>Location</Text>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.setState({tab:false})}} style={{ width: width / 3, borderBottomWidth:this.state.tab === false ? 3:0, justifyContent: 'center', borderColor: '#ff3300' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', alignSelf: 'center', color: '#000' }}>Company Type</Text>

                    </TouchableOpacity>
                </View>

                <View>
                <View style={{height:40,width:width*0.75,borderColor:'lightgray',alignSelf:'center',backgroundColor:'#fff',borderWidth:1,marginVertical:15,justifyContent:'space-between',alignItems:'center',flexDirection:'row',paddingHorizontal:10,elevation:10,shadowOffset: { width: 10, height: 10 }}}>
                   <Image style={{height:18,width:18}} source={require('../../assets/search.png')} />
                   <View style={{height:'100%',justifyContent:'center'}}><TextInput style={{fontSize:18,width:width*0.5}} placeholder='Search' onChangeText={(search)=>{this.setState({search},()=>this.search(this.state.search)) }} value={this.state.search} /></View>
                   <TouchableOpacity><Text onPress={()=>{this.setState({search:''},()=>{this.search(this.state.search)})}} style={{fontSize:20}}>X</Text></TouchableOpacity>
                </View>
                </View>

                {this.state.CompanyList1?

                    <FlatList
                    data={this.state.CompanyList1}
                    renderItem={this.renderItem}
                    showsVerticalScrollIndicator={false}
                    extraData={this.state}
                    />
                    : this.state.CompanyList.length ?
                    <FlatList
                        data={this.state.CompanyList}
                        renderItem={this.renderItem}
                        showsVerticalScrollIndicator={false}
                        extraData={this.state}

                    />
                    :null
                }


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
