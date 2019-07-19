import React, { Component } from 'react';
import { StyleSheet, View, TextInput, ImageBackground, Dimensions , Image ,Text ,TouchableOpacity ,AsyncStorage} from 'react-native';
import { TextInputLayout } from 'rn-textinputlayout';
import ActivityIndicators from '../../Components/loader';
import { Actions } from 'react-native-router-flux';
const { height, width } = Dimensions.get('window');

export default class Login extends Component {

    constructor(props){
        super(props);

        this.state={
            isRememberMe:false,
            loading:false,
            user_id:'shubhanshujaiswal123@gmail.com',
            password:'wdFVXzN?',
            // user_id:'',
            // password:''
        }
    }
    componentDidMount = () =>{

        AsyncStorage.getItem('user_credentials').then(resp=>{

            if(resp)
            {
                resp=JSON.parse(resp)
                this.setState({user_id : resp.user_id , password : resp.password, isRememberMe : true})
            }
        })


    }

    Login = () =>{

        this.setState({loading:true})
        var parameter = new URLSearchParams();
        parameter.append('username',`${this.state.user_id}`);
        parameter.append('password',`${this.state.password}`);
        parameter.append('grant_type','password');
        parameter.append('ApplicationId','ca7b86d6-2953-4ff0-8847-b75906e94842');
        parameter.append('client_secret','mmAm#GKxXeyz7rtP8htzU8r5y8kdg0YloqlSfH9#Vo9uSbq7zFZaIvvP4EE@Dh');
        parameter.append('client_id','viz-auth-serv-client');
        parameter.append('scope','viz-crm-web-api-resource');


        fetch('https://sts.vizybility.net/connect/token',
            {
                method: 'POST',
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
              },
                body: parameter.toString(),
              json: true,
            }
        ).then(resp=>resp.json().then(res=>{

            console.log('resp>>>>login',res)

            console.log(res)
            if(res.error)
            {
                this.setState({loading:false},()=>{
                    alert(res.error_description)
                })
            }
            else{
               
                AsyncStorage.setItem('token',res.access_token)
                setTimeout(() => {
                    this.setState({loading:false})
                    Actions.tabs()
                    if(this.state.isRememberMe)
                    {
                        var user_credentials ={
                            user_id:this.state.user_id,
                            password:this.state.password
                        }

                        AsyncStorage.setItem('user_credentials',JSON.stringify(user_credentials))
                    }
                    else{
                        AsyncStorage.clear();
                    }
                }, 250);
            }
        }))


    }
    render() {
        return (
            <View style={{ flex: 1, padding: 10 }}>
                {this.state.loading ?
                <ActivityIndicators />
                :null}
                <ImageBackground style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} source={require('../../assets/bg.jpg')} />
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View>
                        <Image style={{width:width/2,height:(width/3),alignSelf:'center'}} source={require('../../assets/logo-in-white.png')} />
                        <TextInputLayout
                           focusColor='#fff'
                            style={styles.inputLayout} >
                            <TextInput
                                style={styles.textInput}
                                placeholder={'User Id'}
                                value={this.state.user_id}
                                onChangeText={(user_id)=>this.setState({user_id})}
                            />
                        </TextInputLayout>
                        <TextInputLayout
                            focusColor='#fff'
                            style={styles.inputLayout} >
                            <TextInput
                                style={styles.textInput}
                                placeholder={'Password'}
                                secureTextEntry
                                value={this.state.password}
                                onChangeText={(password)=>this.setState({password})}

                            />
                        </TextInputLayout>
                        <TouchableOpacity onPress={()=>this.Login()} style={{width:'95%',height:50,backgroundColor:'#b20000',borderRadius:7.5,alignSelf:'center',marginTop:50,alignItems:'center',justifyContent:'center'}}>
                            <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>Login</Text>
                        </TouchableOpacity>
                        <View style={{flexDirection:'row',justifyContent:'center',marginTop:20,justifyContent:'space-between',width:'50%',alignSelf:'center'}}>
                            <TouchableOpacity
                            onPress={()=>{this.setState({isRememberMe:!this.state.isRememberMe})}}
                            >
                                <Image style={{height:20,width:20,backgroundColor:this.state.isRememberMe ?'#b20000':'#fff',borderRadius:4}} source={ this.state.isRememberMe ?  require('../../assets/checked.png') : require('../../assets/unchecked.png')} />
                            </TouchableOpacity>
                            <Text style={{color:'#fff' ,fontWeight:'bold',fontSize:20}}>Remember Me</Text>
                        </View>
                        <Image style={{height:50,width:50,alignSelf:'center',marginTop:20}} source={require('../../assets/logo_circle.png')} />
                    </View>
                </View>
            </View>
        );
    }of
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100
    },
    textInput: {
        fontSize: 16,
        height: 40,
        color:'#fff'
    },
    inputLayout: {
        marginTop: 16,
        marginHorizontal: 36,
        width:'95%',
        alignSelf:'center'
    }
});
