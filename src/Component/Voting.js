import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';


export default class Voting extends Component {
 
    state = {
    }

    render() {
        return (

        <View style={{flex: 1,}}>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20, paddingLeft: 10, paddingTop: 20, paddingBottom:3}}>Voting</Text>
        </View>

        )
    }

    componentDidMount(){
    }
}
// export default withRouter(Home);