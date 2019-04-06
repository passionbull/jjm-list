import React, { Component } from 'react';
import {
    Text,
    View,
} from 'react-native';
  


export default class HolderListItem extends React.PureComponent {
    _onPress = () => {
    };

    render() {
      return (
          <View style={{flex: 1, flexDirection: 'row', paddingTop: 5,}}>
            <View style={{flex: 1, borderWidth: 0.1}}>
              <Text style={{flex: 1, color: 'black', fontSize: 15, padding: 3}}>{this.props.holderID+'-'+this.props.account}</Text>
            </View>
  
            <View style={{flex: 1, borderWidth:0.1}}>
              <Text style={{flex: 1, color: 'black', fontSize: 15, padding: 3}}>{this.props.balance}</Text>
            </View>
  
            <View style={{flex: 0.5, borderWidth:0.1}}>
              <Text style={{flex: 1, color: 'black', fontSize: 15, padding: 3, paddingLeft:10}}>{(100*this.props.rate).toFixed(3)}%</Text>
            </View>

            <View style={{flex: 0.5, borderWidth:0.1}}>
              <Text style={{flex: 1, color: 'black', fontSize: 15, padding: 3, paddingLeft:10}}>{this.props.voting_rate}%</Text>
            </View>

            <View style={{flex: 0.5, borderWidth:0.1}}>
              <Text style={{flex: 1, color: 'black', fontSize: 15, padding: 3, paddingLeft:10}}>{this.props.voted === undefined? '':''+this.props.voted}</Text>
            </View>

            <View style={{flex: 1, borderWidth:0.1}}>
              <Text style={{flex: 1, color: 'black', fontSize: 15, padding: 3, paddingLeft:10}}>{this.props.voted === undefined? '':this.props.latestLink}</Text>
            </View>


          </View>
  
        );
    }
}