import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  FlatList
} from 'react-native';
import SSC from 'sscjs';

class HolderListItem extends React.PureComponent {
  _onPress = () => {
  };
  render() {
    return (
        <View style={styles.listView}>
          <Text style={styles.item}>{this.props.title}</Text>
          <Text style={styles.item2}>{1*this.props.rate}</Text>
        </View>
    );
  }
}

class App extends Component {
  state = {
    holders: [],
    symbol: '',
    maintainer: ['virus707', 'goldenticket', 'jjm13'],
    real_maintainer: []
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
      }
      console.log(tHolders);
      var sumBalance = 0;

      /// add all balances
      for (const holder of tHolders) {
          sumBalance = sumBalance + 1*(holder.balance);
      }

      /// remove maintainer balances
      for (const mt of this.state.maintainer) {
        var maintainer = this.findAccount(tHolders,mt);
        if(maintainer !== undefined) 
          sumBalance = sumBalance - maintainer.balance;
      }
      console.log('sum balance : '+ sumBalance);

      
      /// calculate rate
      for (const holder of tHolders) {
        holder.rate = holder.balance / sumBalance;

        for (const mt of this.state.maintainer) {
          if(holder.account === mt) 
            holder.rate = 0;
        }
        var text = holder.account+': '+(holder.balance*1).toFixed(2)+' '+symbol
        tData.push({key: text, rate: (holder.rate*1).toFixed(3)})
      }
      this.setState({holders: tHolders, holders_data: tData});
    })

  }

  findAccount = (holders, account) =>
  {
    return holders.find(function(a){return a.account === account;});
  }

  componentDidMount(){
    var _symbol = 'JJM'
    this.setState({symbol:_symbol});
    this.sscLoad(_symbol);
  }

  onClick = () => {
    this.sscLoad(this.state.symbol);
  }





  render() {
    return (
      <View style={styles.container}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>총 홀더 수 : {this.state.holders.length}</Text>
      {
        /* <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={this.onClick}
          style={styles.button}
          underlayColor={'#0A84D0'}
        >
          <Text style={styles.buttonText}>새로고침 {this.state.symbol} 리스트</Text>
        </TouchableOpacity>
      </View> */}
        <FlatList
          data= {this.state.holders_data}
          renderItem={({item}) => <HolderListItem id={item.id} title ={item.key} rate = {item.rate}/>}
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
  button2: {
    borderRadius: 3,
    padding: 20,
    marginVertical: 10,
    marginTop: 10,
    backgroundColor: '#1B05E0',
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
  item2: {
    padding: 5,
    fontSize: 18,
    height: 30,
    fontWeight: 'bold'
  },
});

let hotWrapper = () => () => App;
if (Platform.OS === 'web') {
  const { hot } = require('react-hot-loader');
  hotWrapper = hot;
}
export default hotWrapper(module)(App);
