import React from 'react';
import {
    Text,
    View,
} from 'react-native';
  


export default class VotingListItem extends React.PureComponent {
    _onPress = () => {
    };

    render() {
        var dt = new Date(this.props.created);
        var koreaTime = new Date(dt.setHours(dt.getHours() +18)).toISOString().split('.')[0];
        return (
          <View style={{flex: 1, flexDirection: 'row', paddingTop: 5,}}>
            <View style={{flex: 0.5, borderWidth: 0.1}}>
              <Text style={{flex: 1, color: 'black', fontSize: 15, padding: 3}}>{this.props.author}</Text>
            </View>
            <View style={{flex: 1, borderWidth:0.1}}>
              <Text style={{flex: 1, color: this.props.voted === false? 'black': 'black', fontSize: 15, padding: 3, paddingLeft:10} } onPress={()=>{window.open('https://busy.org/@'+this.props.author+'/'+this.props.permlink)} }>{this.props.title}</Text>
            </View>
            <View style={{flex: 1, borderWidth:0.1}}>
              <Text style={{flex: 1, color: 'black', fontSize: 15, padding: 3}}>{'https://busy.org/@'+this.props.author+'/'+this.props.permlink}</Text>
            </View>
            <View style={{flex: 1, borderWidth:0.1}}>
              <Text style={{flex: 1, color: 'black', fontSize: 15, padding: 3}}>{koreaTime}</Text>
            </View>
            <View style={{flex: 1, borderWidth:0.1}}>
              <Text style={{flex: 1, color: this.props.voted === false? 'black': 'black', fontSize: 15, padding: 3}}>{this.props.voted === false? '': ''}</Text>
            </View>
          </View>
        );
    }
}
