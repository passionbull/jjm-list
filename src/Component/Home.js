import React, { Component } from 'react';
import {
  Text,
  View,
  Button, StyleSheet, FlatList
} from 'react-native';
import SSC from 'sscjs';
import { withRouter } from '../Utils/Routing';
// import { Table, Row, Rows } from 'react-native-table-component';
import HolderListItem from '../View/HolderListItem';

class Home extends Component {
 
    state = {
        holders: [],
        symbol: '',
        maintainer: ['virus707', 'goldenticket', 'jjm13'],
        sum_balance:'',
        tableHead: ['Account', 'Balance', 'Rate'],
        tableData:[]
    }

    onPressButton1 = () => {
        // Go to Commit screen
        this.props.history.push('/voting');
    }
    onPressButton2 = () => {
        // Go to Commit screen
        this.props.history.push('/payout');
    }

    render() {
        return (

        <View style={{flex: 1,}}>
            <View style={{flex: 1, flexDirection: 'row', width:240, paddingLeft: 20, paddingTop: 20}}>
                <View style={{flex: 1,paddingRight:10}}>
                    <Button style={{}} title='Voting list' onPress={this.onPressButton1}/>
                </View>
                <View style={{flex: 1,}}>
                    <Button style={{}} title='Payout' onPress={this.onPressButton2}/>
                </View>
            </View>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20, paddingLeft: 20, paddingTop: 20, paddingBottom:3}}>Token Info</Text>
            <Text style={{color: 'black', fontSize: 15, paddingLeft: 20, paddingBottom: 5}}>Last: {this.state.lastPrice} STEEM, 24h Vol: {this.state.volume} STEEM, Bid: {this.state.highestBid} STEEM, Ask: {this.state.lowestAsk} STEEM</Text>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16, paddingLeft: 20, paddingBottom: 3}}>총 홀더 수 : {this.state.holders.length}</Text>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16, paddingLeft: 20}}>유통물량 : {(this.state.sum_balance*1).toFixed(2)} JJM</Text>
            <View style={{flex: 1, flexDirection: 'row', paddingTop: 30, paddingLeft: 20}}>
            <Text style={{flex: 1, color: 'black', fontWeight: 'bold', fontSize: 20, padding: 3}}>Account</Text>
            <Text style={{flex: 1, color: 'black', fontWeight: 'bold', fontSize: 20, padding: 3}}>Balance</Text>
            <Text style={{flex: 1,color: 'black', fontWeight: 'bold', fontSize: 20, padding: 3}}>Rate</Text>
            </View>
            <View style={{flex: 1, paddingLeft: 20}}>
            <FlatList
                data= {this.state.holders_data}
                renderItem={({item}) => <HolderListItem id={item.id} account ={item.account} balance = {item.balance} rate = {item.rate}/>}
                />
            </View>

            {/* <View style={{flex: 1,paddingLeft: 10}}>
                <Table style={{}} borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <Row data={this.state.tableHead} style={styles.head} textStyle={{ margin: 6, fontWeight:'bold', fontSize: 18 }}/>
                    <Rows data={this.state.tableData} textStyle={styles.text}/>
                </Table>
            </View> */}
        </View>

        )
    }


    sscLoad = (symbol= 'JJM') =>{
        const ssc = new SSC('https://api.steem-engine.com/rpc/');
        ssc.stream((err, res) => {
            // console.log(err, res);
        });
    
        ssc.find('market', 'metrics', {'symbol':symbol}, 1000, 0, [], (err, result) => {
          this.setState({
            lastPrice: result[0].lastPrice,
            volume: result[0].volume,
            highestBid: result[0].highestBid,
            lowestAsk: result[0].lowestAsk
          });
        });
    
    
        ssc.find('tokens', 'balances', {'symbol':symbol}, 1000, 0, [], (err, result) => {
          var tHolders = []
          var tData = []
          var tTableData = []
    
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
          this.setState({sum_balance: sumBalance});
    
          
          /// calculate rate
          for (const holder of tHolders) {
            holder.rate = holder.balance / sumBalance;
    
            for (const mt of this.state.maintainer) {
              if(holder.account === mt) 
                holder.rate = 0;
            }
            tData.push({account: holder.account, balance: (holder.balance*1).toFixed(2)+' '+symbol, rate: (holder.rate*1).toFixed(3)})
            tTableData.push([holder.account, (holder.balance*1).toFixed(2)+' '+symbol, (holder.rate*1).toFixed(3)])
          }
          this.setState({holders: tHolders, holders_data: tData, sum_balance: sumBalance,
                            tableData:tTableData
                        });
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
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff'},
    text: { margin: 6 }
  });
 
export default withRouter(Home);