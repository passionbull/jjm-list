import React, { Component } from 'react';
import {
  Text, Button, FlatList,
  View, AsyncStorage
} from 'react-native';
import steemConnect from '../Steem/steemConnect';
import steem from 'steem'
import VotingListItem from '../View/VotingListItem';
import steemController from '../Steem/steemController'
var sc = new steemController();

export default class Voting extends Component {
    state = {
        modalVisible: false,
        sign_in: false,
        lp:'',la:'',
        all_post:[]
    }

    onPressButton1 = () => {
        // Go to Commit screen
        if(this.state.sign_in === false)
            this.getLoginURL();
        else
            this.revokeToken();
    }
    onPressButton2 = async () => {
        const size = 10;
        sc.getPosting(size,this, this.state.lp, this.state.la).then(function(posting){
            console.log('post',posting.posts);
            var lp = posting.last_permlink;
            var la = posting.last_author;
            var _all_post = posting.this.state.all_post.concat(posting.posts);
            console.log('length',_all_post);
            posting.this.setState({lp,la,all_post:_all_post});
        });
    }
    onPressButton3 = () => {
        var _all_post = this.state.all_post;
        for (const post of _all_post) {
            sc.getVotingInfo(post);
        }
    }

    getReculsivePosting(author, start_author= '', start_permlink = ''){
        const size = 10;
        var query = {
            'tag': author,
            'limit': size,
            'start_author': start_author,
            'start_permlink': start_permlink
        };
        var that = this;
        var dt = new Date();  
        dt.setDate(dt.getDate() - 6);
        var startFrom = dt.toISOString().split('.')[0];
        sc.getDiscussionsByBlog(query).then(function(response) {
            var length_posts = response.length
            for (const post of response) {
                if(post.author === query.tag){
                    if(post.created > startFrom)
                        console.log(post);
                }
            }
            if(length_posts < size || response[length_posts-1].created< startFrom){      
                return;     
            } 
            var start_author= response[length_posts-1].author;
            var start_permlink= response[length_posts-1].permlink;
            that.getReculsivePosting(author, start_author, start_permlink);
        });
    }

    render() {
        return (
        <View style={{flex: 1,}}>
            <View style={{flex: 1, flexDirection: 'row', width:500, paddingLeft: 10, paddingTop: 20}}>
                <View style={{flex: 1.2,paddingRight: 10}}>
                    <Button style={{}} title={this.state.sign_in === false? 'Sign in with SteemConnect':'Sign out'} onPress={this.onPressButton1}/>
                </View>
                <View style={{flex: 1,paddingRight: 10}}>
                    <Button style={{}} title='Get Posts' onPress={this.onPressButton2}/>
                </View>
                <View style={{flex: 1,}}>
                    <Button style={{}} title='Check Voted' onPress={this.onPressButton3}/>
                </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row', paddingLeft: 10, paddingTop: 20}}>
                <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20, paddingLeft: 10, paddingTop: 20, paddingBottom:3}}>Voting List:</Text>
                <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15, paddingLeft: 10, paddingTop: 20, paddingBottom:3}}>{this.state.all_post.length}</Text>
            </View>
            <View style={{flex: 1, paddingLeft: 20}}>
                <View style={{flex: 1, flexDirection: 'row', paddingTop: 30, paddingLeft: 20}}>
                    <Text style={{flex: 0.5, color: 'black', fontWeight: 'bold', fontSize: 20, padding: 3}}>Account</Text>
                    <Text style={{flex: 1, color: 'black', fontWeight: 'bold', fontSize: 20, padding: 3}}>Title</Text>
                    <Text style={{flex: 1, color: 'black', fontWeight: 'bold', fontSize: 20, padding: 3}}>Link</Text>
                    <Text style={{flex: 1, color: 'black', fontWeight: 'bold', fontSize: 20, padding: 3}}>Date</Text>
                    <Text style={{flex: 1,color: 'black', fontWeight: 'bold', fontSize: 20, padding: 3}}>Voted</Text>
                </View>
                <FlatList
                    data= {this.state.all_post}
                    renderItem={({item}) => <VotingListItem id={item.id} author ={item.author} permlink = {item.permlink} title = {item.title} created = {item.created} voted = {item.voted}/>}
                    />
            </View>

        </View>
        )
    }

    componentDidMount(){
        var link = window.location.href;
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
        this.getReculsivePosting('jacobyu');
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