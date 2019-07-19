import React, { Component } from 'react';
import { TextInput, View, FlatList, ScrollView, Dimensions, Image, Text, TouchableOpacity, AsyncStorage, Modal,StyleSheet } from 'react-native';
import ActivityIndicators from '../../Components/loader';
import API from '../../services/apiRequest';
import { Actions } from 'react-native-router-flux';
const { height, width } = Dimensions.get('window');

export default class AssetsFilter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isRememberMe: true,
            loading: false,
            AssetsList: [],
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
        // console.log('resp>>>>123___', this.props.item)
        API('/Asset/GetAssets', 'GET', null, this.state.token).then(resp => {
            console.log('resp>>>>123___',resp)
            this.setState({loading:false})

            this.setState({ AssetsList: resp })
        })

    }

    onClickAssets = (assetID) =>{


        this.setState({ loading: true,image:undefined })
        fetch(`https://crm-web-webapi.azurewebsites.net/Asset/GetAssetMainPicture?assetId='${assetID}`,
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

    }

    renderItem = ({ item,index }) => {
        console.log('a>>>',item)
        return (
            <View>
                <TouchableOpacity onPress={() => this.setState({details:this.state.details === index ? -1 : index},()=>{this.state.details !== -1 ? this.onClickAssets(item.AssetId):null})} style={{ flexDirection: 'row', height: height * 0.075, width, justifyContent: 'center' }}>
                    <View style={{ justifyContent: 'space-between', width, flexDirection: 'row', paddingHorizontal: 20 }}>
                        <View style={{ justifyContent: 'center', width: width * 0.15 }}>
                            <Image style={{ height: 37.5, width: 37.5, alignSelf: 'center' }} source={require('../../assets/assets.png')} />
                        </View>
                        <View style={{ width: width * 0.75, justifyContent: 'center', borderBottomWidth: 1, borderColor: 'gray', marginLeft: 20 }}>
                            <Text style={{ fontSize: 16 }}>{item.AssetDescription}</Text>
                            <Text>{item.AssetTypeName}</Text>
                        </View>
                    </View>

                </TouchableOpacity>
                {this.state.details === index ?
                <View style={{backgroundColor:'#fff',elevation:10,shadowOffset: { width: 10, height: 10 },alignSelf:'center',marginTop:20,padding:20,width:width*0.9}}>
                           {this.state.image ? <Image style={{height:175,width:'100%', alignSelf:'center'}} source={{uri:this.state.image}} /> :null}

                    <Text style={{ color: '#000', fontSize: 20, marginVertical: 10 }}>Assets Details</Text>
                                <Text style={{ fontSize: 15, color: '#000' }}>{item.CompanyName ? item.CompanyName : ''}</Text>
                                <Text style={{ fontSize: 15, color: '#000' }}>{`${item.LocationNote ? item.LocationNote : ''} ${item.LocationName}`}</Text>
                                <Text style={{ fontSize: 15, color: '#000' }}>{`Unit: ${item.UnitNumber ? item.UnitNumber : ''}`}</Text>

                                <View style={{width:'100%',borderWidth:1,height:height/4,marginTop:20}}>
                                    <View style={{borderWidth:1,height:height/24,width:'100%',flexDirection:'row'}}>
                                        <View style={{width:'50%',borderRightWidth:2,justifyContent:'center',paddingHorizontal:10}}><Text style={{fontWeight:'bold',color:'#000'}}>Make</Text></View>
                                        <View style={{width:'50%',paddingHorizontal:10,justifyContent:'center'}}><Text>{item.MakeName}</Text></View>
                                    </View>
                                    <View style={{borderWidth:1,height:height/24,width:'100%',flexDirection:'row'}}>
                                        <View style={{width:'50%',borderRightWidth:2,justifyContent:'center',paddingHorizontal:10}}><Text style={{fontWeight:'bold',color:'#000'}}>Model</Text></View>
                                        <View style={{width:'50%',paddingHorizontal:10,justifyContent:'center'}}><Text>{item.Model}</Text></View>
                                    </View>
                                    <View style={{borderWidth:1,height:height/24,width:'100%',flexDirection:'row'}}>
                                        <View style={{width:'50%',borderRightWidth:2,justifyContent:'center',paddingHorizontal:10}}><Text style={{fontWeight:'bold',color:'#000'}}>Year</Text></View>
                                        <View style={{width:'50%',paddingHorizontal:10,justifyContent:'center'}}><Text>{item.Year}</Text></View>
                                    </View>
                                    <View style={{borderWidth:1,height:height/24,width:'100%',flexDirection:'row'}}>
                                        <View style={{width:'50%',borderRightWidth:2,justifyContent:'center',paddingHorizontal:10}}><Text style={{fontWeight:'bold',color:'#000'}}>Serial</Text></View>
                                        <View style={{width:'50%',paddingHorizontal:10,justifyContent:'center'}}><Text>{item.SerialNumber}</Text></View>
                                    </View>
                                    <View style={{borderWidth:1,height:height/24,width:'100%',flexDirection:'row'}}>
                                        <View style={{width:'50%',borderRightWidth:2,justifyContent:'center',paddingHorizontal:10}}><Text style={{color:'#000'}}>Last Known SMU</Text></View>
                                        <View style={{width:'50%',paddingHorizontal:10,justifyContent:'center'}}><Text>{item.LastKnownSMU}</Text></View>
                                    </View>
                                    <View style={{borderWidth:1,height:height/24,width:'100%',flexDirection:'row'}}>
                                        <View style={{width:'50%',borderRightWidth:2,justifyContent:'center',paddingHorizontal:10}}><Text style={{color:'#000'}}>Last SMU Date</Text></View>
                                        <View style={{width:'50%',paddingHorizontal:10,justifyContent:'center'}}><Text>{item.LastSMUDate}</Text></View>
                                    </View>

                                </View>
                                
                </View>
                :<View />} 
                            </View>
        )

    }


    search = (text) =>{


        console.log('SearchTest>>>',text)


        let arr =[];

          text = text.toUpperCase();

            this.state.AssetsList.map(item=>{

                console.log('item>>>search',item)


                if (item.AssetDescription.toUpperCase().indexOf(text) > -1)
                {

                    console.log('item>>>searchResult',item)

                    arr.push(item);

                }


              

            })

            this.setState({AssetsList1:arr})

            

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

                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 20 }}>All Assets</Text>

                </View>
                    <Text style={{alignSelf:"center",marginTop:10,fontSize:18}}>Search by name</Text>
                <View style={{height:40,width:width*0.75,borderColor:'lightgray',alignSelf:'center',backgroundColor:'#fff',borderWidth:1,marginVertical:10,justifyContent:'space-between',alignItems:'center',flexDirection:'row',paddingHorizontal:10,elevation:10,shadowOffset: { width: 10, height: 10 },}}>
                   <Image style={{height:18,width:18}} source={require('../../assets/search.png')} />
                   <View style={{height:'100%',justifyContent:'center'}}><TextInput style={{fontSize:18,width:width*0.5}} placeholder='Search' onChangeText={(search)=>{this.setState({search},()=>this.search(this.state.search)) }} value={this.state.search} /></View>
                   <TouchableOpacity><Text onPress={()=>{this.setState({search:''},()=>{this.search(this.state.search)})}} style={{fontSize:20}}>X</Text></TouchableOpacity>
                </View>

              

                {this.state.AssetsList1?

                        <FlatList
                        data={this.state.AssetsList1}
                        renderItem={this.renderItem}
                        showsVerticalScrollIndicator={false}
                        extraData={this.state}
                        />
                   : this.state.AssetsList.length ?
                    <FlatList
                        data={this.state.AssetsList}
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
