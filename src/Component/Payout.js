import React, { Component } from 'react';
import {
  Text, Button,
  View, AsyncStorage
} from 'react-native';
import steemConnect from '../Steem/steemConnect';




export default class Payout extends Component {

    
    state = {
        modalVisible: false,
        sign_in: false,
        _that: this
    }

    onPressButton1 = () => {
        // Go to Commit screen
        if(this.state.sign_in === false)
            this.getLoginURL();
        else
            this.revokeToken();
    }

    render() {
        return (
        <View style={{flex: 1,}}>
            <View style={{flex: 1, flexDirection: 'row', width:150, paddingLeft: 10, paddingTop: 20}}>
                <View style={{flex: 1,}}>
                    <Button style={{}} title={this.state.sign_in === false? 'Sign in with SteemConnect':'Sign out'} onPress={this.onPressButton1}/>
                </View>
            </View>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20, paddingLeft: 10, paddingTop: 20, paddingBottom:3}}>Payout</Text>
        </View>
        )
    }

    componentDidMount(){
        var link = window.location.href;
        console.log('xxx',link);
        this.checkToken(link);

        this.getAsyncToken().then((token) => {
            if(token === null)
            {
                this.setState({sign_in:false});
            }
            else
            {
                // AccessToken 셋팅
                steemConnect.setAccessToken(token);
                // 계정 정보 조회
                steemConnect.me().then(({ account }) => {
                    const { profile }  = JSON.parse(account.json_metadata);
                    console.log('profile', profile);
                    this.setState({sign_in:true});
                }).catch(function(e){
                });
            }
        });


    }

    getLoginURL = () =>{
        let link = steemConnect.getLoginURL();
        window.location.href = link;
    }

    revokeToken = () =>{
        steemConnect.revokeToken(function (err,res){
            console.log(res);
            AsyncStorage.removeItem('token');
        })
        this.setState({sign_in:false});
    }

    checkToken = (url) => {
        if (url.indexOf('?access_token') > -1) {
          try {
            const tokens = {};
            // 콜백 URL에서 accessToken 정보 추출하기
            let params = url.split('?')[1];
            params = params.split('&');
            params.forEach(e => {
              const [key, val] = e.split('=');
              tokens[key] = val;
            });
            console.log('tokens:', tokens);
            AsyncStorage.setItem('token', tokens.access_token);
          } catch (error) {
            console.log(error);
          }
        }
      };
    getAsyncToken = async () => {
        try {
            const value = await AsyncStorage.getItem('token');
            return await value;
        } catch (e) {
            console.warn(e)
            return null
        }
    };      
    

}
// export default withRouter(Home);