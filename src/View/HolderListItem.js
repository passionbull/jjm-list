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
              <Text style={{flex: 1, color: 'black', fontSize: 15, padding: 3}}>{this.props.account}</Text>
            </View>
  
            <View style={{flex: 1, borderWidth:0.1}}>
              <Text style={{flex: 1, color: 'black', fontSize: 15, padding: 3}}>{this.props.balance}</Text>
            </View>
  
            <View style={{flex: 1, borderWidth:0.1}}>
              <Text style={{flex: 1, color: 'black', fontSize: 15, padding: 3, paddingLeft:10}}>{1*this.props.rate}</Text>
            </View>
          </View>
  
        );
    }
}