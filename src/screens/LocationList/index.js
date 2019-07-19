import React, { Component } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Dimensions, Image, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { TextInputLayout } from 'rn-textinputlayout';
import { thisExpression } from '@babel/types';
import ActivityIndicator from '../../Components/loader';
import ActivityIndicators from '../../Components/loader';
import API from '../../services/apiRequest';
const { height, width } = Dimensions.get('window');

export default class LocationList extends Component {

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
        // this.setState({ loading: true })
     

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
