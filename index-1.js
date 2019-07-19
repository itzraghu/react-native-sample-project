import React, { Component } from 'react';
import { StyleSheet, View, TextInput, FlatList, Dimensions, Image, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { TextInputLayout } from 'rn-textinputlayout';
import { thisExpression } from '@babel/types';
import ActivityIndicator from '../../Components/loader';
import ActivityIndicators from '../../Components/loader';
import API from '../../services/apiRequest';
import { Actions } from 'react-native-router-flux';
const { height, width } = Dimensions.get('window');

export default class CompanyList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isRememberMe: true,
            loading: false,
            CompanyList: []
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
        API('Company/GetCompanies', 'GET', null, this.state.token).then(resp => {
            console.log('resp>>>>>', resp)
            this.setState({loading:false})
            this.setState({ CompanyList: resp })
        })

    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={()=>Actions.CompanyDetails({item:item})} style={{ flexDirection: 'row', height: height * 0.075, width, justifyContent: 'center' }}>
            <View style={{ justifyContent: 'space-between', width, flexDirection: 'row', paddingHorizontal: 20 }}>
            <View style={{ justifyContent: 'center', width: width * 0.15 }}>
            <Image style={{ height: 37.5, width: 37.5, alignSelf: 'center' }} source={require('../../assets/1.png')} />
            </View>
            <View style={{ width: width * 0.75, justifyContent: 'center', borderBottomWidth: 1, borderColor: 'gray', marginLeft: 20 }}>
            <Text style={{ fontSize: 18 }}>{item.CompanyName}</Text>
            <Text>{item.CompanyTypeName}</Text>
            </View>
            </View>
            </TouchableOpacity>
            )

    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {this.state.loading ?
                <ActivityIndicators />
                : null}

                <View style={{ width, height: height * 0.075, backgroundColor: 'rgb(62,66,71)', justifyContent: 'space-between', paddingHorizontal: 20, flexDirection: 'row',alignItems:'center' }}>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', }}>Vizybility</Text>

                <View style={{ alignItems: "center", height: '100%',flexDirection:'row' ,width:'30%',justifyContent:'space-between'}}>
                <TouchableOpacity onPress={()=>{Actions.CompanyFilter()}}><Image style={{ height: 25, width: 25 }} source={require('../../assets/filter.png')} /></TouchableOpacity>

                <TouchableOpacity onPress={()=>{Actions.login()}}><Image style={{ height: 25, width: 25 }} source={require('../../assets/logout.png')} /></TouchableOpacity>
                </View>
                </View>

                {this.state.CompanyList.length ?
                    <FlatList
                    data={this.state.CompanyList}
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
