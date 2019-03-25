import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableHighlight, TouchableOpacity,
  FlatList
} from 'react-native';
import SSC from 'sscjs';



class MyListItem extends React.PureComponent {
  _onPress = () => {
  };
  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={styles.listView}>
          <Text style={styles.item}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

class App extends Component {
  state = {
    holders: [],
    holders_data: [],
    symbol: ''
  }


  sscLoad = (symbol= 'JJM') =>{
    const ssc = new SSC('https://api.steem-engine.com/rpc/');
    ssc.stream((err, res) => {
        // console.log(err, res);
    });
    ssc.find('tokens', 'balances', {'symbol':symbol}, 1000, 0, [], (err, result) => {
      var tHolders = []
      var tData = []

      result.sort(function (a,b){
        return b.balance - a.balance;
      });

      for (var holder of result) {
        tHolders.push(holder)
        var text = holder.account+': '+holder.balance+' '+symbol
        tData.push({key: text})
      }
      console.log(tHolders);

      this.setState({holders: tHolders,
      holders_data: tData});
    })

  }

  componentDidMount(){
    var symbol = 'JJM'
    this.setState({symbol});
    this.sscLoad(symbol);
  }

  onClick = () => {
    this.sscLoad('JJM');
  }

  render() {

    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={this.onClick}
          style={styles.button}
          underlayColor={'#0A84D0'}
        >
          <Text style={styles.buttonText}>Get {this.state.symbol} List</Text>
        </TouchableHighlight>
        <FlatList
          data= {this.state.holders_data}
          // renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
          renderItem={({item}) => <MyListItem id={item.id} title ={item.key}/>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 300,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    borderRadius: 3,
    padding: 20,
    marginVertical: 10,
    marginTop: 10,
    backgroundColor: '#1B95E0',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listView:{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  item: {
    padding: 5,
    fontSize: 18,
    height: 30,
  },
});

let hotWrapper = () => () => App;
if (Platform.OS === 'web') {
  const { hot } = require('react-hot-loader');
  hotWrapper = hot;
}
export default hotWrapper(module)(App);
