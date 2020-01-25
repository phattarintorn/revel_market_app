import React from 'react';
import {
    ActivityIndicator,
    Alert,
    Image, 
    StatusBar, 
    StyleSheet,
    ScrollView, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View, 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import NetworkFailed from '../../component/NetworkFailed';
import NotFound from '../../component/NotFound';

import UserModel from '../../models/UserModel'

var user_model = new UserModel

export class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            alert: '',
            username: 'admin',
            password: '123456',
        }
    }

    componentDidMount() {
       
    }

    _getLogin(){
        if (this.state.username.length == 0) {
            Alert.alert("แจ้งเตือน","กรุณาระบุบัญชีผู้ใช้");
        }else if(this.state.password.length == 0){
            Alert.alert("แจ้งเตือน","กรุณากรอกรหัสผ่าน");
        }else{
            this.setState({
                loading: true,
                alert: '',
            }, () => {
                user_model.getLogin(this.state.username,this.state.password).then((response) => {
                    console.log('[_getLogin] response:',response);

                    if (response == false) {
                        this.setState({
                            loading: false,
                            alert: 'network-failed',
                        });
                    }else if (response.data.length == 0) {
                        this.setState({
                            loading: false,
                            alert: 'not-found',
                        });
                    }else{
                        this.setState({
                            loading: false,
                        },() => {
                            Alert.alert("Function","_getLogin");
                        });
                    }
                });
            });
        }
    }

    render() {
        var display = [];
        if (this.state.loading) {
            display.push(
                <View style={{ flexDirection: "row", justifyContent: "center", flex: 1, backgroundColor: '#a278b5', borderRadius: 2, padding: 10, }}>
                    <ActivityIndicator size="small" color="#fff"/>
                </View>
            )
        }else{
            display.push(
                <TouchableOpacity style={{ flex: 1, backgroundColor: '#a278b5', borderRadius: 2, padding: 10, }} onPress={() => this._getLogin()}>
                    <Text style={{ alignSelf: "center", fontSize: 16, color: '#fff', }}>LOGIN</Text>
                </TouchableOpacity>
            )
        }

        if (this.state.alert == 'network-failed') {
            display.push(<NetworkFailed/>);
        }else if (this.state.alert == 'not-found') {
            display.push(<NotFound/>);
        }

        return (
            <ScrollView style={{ backgroundColor: "#fbdff0", }}>
                <StatusBar hidden={true} />
                <View style={{ padding: 36, }}>
                    <Image resizeMode="contain" source={require('../../images/xiao.jpg')}
                    style={{width:200,height:200, marginTop: 54, alignSelf: 'center', }}></Image>
                    <View style={[ styles.row_underline, { marginTop: 30, marginBottom: 16, }]}>
                        <Icon name="email-outline" style = {styles.login_icon}/>
                        <TextInput placeholder = "Email Address"
                            placeholderTextColor = "#3e206d"
                            underlineColorAndroid = 'transparent'
                            style={{ color: '#a4b4fb', flex: 1, fontSize: 16, paddingLeft: 12, }}
                            value={this.state.username}
                            onChangeText={
                                (val) => { 
                                    this.setState({ 
                                        username: val
                                    }) 
                                }}
                        />
                    </View>
                    <View style={[ styles.row_underline, { marginBottom: 24, }]}>
                        <Icon name="lock-outline" style={styles.login_icon}/>
                        <TextInput placeholder = "Password"
                            placeholderTextColor = "#3e206d"
                            underlineColorAndroid = 'transparent'
                            secureTextEntry={true}
                            style={{ color: '#a4b4fb', flex: 1, fontSize: 16, paddingLeft: 12, }}
                           value={this.state.password}
                           onChangeText={
                            (val) => { 
                                this.setState({ 
                                    password: val
                                }) 
                            }}
                        />
                    </View>
                    {display}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    row_underline: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: '#3e206d',
    },  
    login_icon: {
        alignSelf: 'center',
        fontSize: 20,
        color: '#916dd5',
    },
});