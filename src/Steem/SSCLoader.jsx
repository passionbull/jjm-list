import SSC from "sscjs";
import axios from "axios";

export default class SSCLoader {
  constructor() {
    // this.token_info = {};
    this.maintainer = ["null"];
    this.ssc = new SSC("https://api.steem-engine.com/rpc/");
    // this.getTokenInfo("RORS").then(info => {
    //   // console.log('all  suplly', info[0].supply)
    //   // console.log('circulating', info[0].circulatingSupply)
    //   // console.log('staked', info[0].totalStaked)
    //   // console.log('balance??', info[0].circulatingSupply*1 - info[0].totalStaked*1)
    // });
    // this.getHoldersAsync("RORS").then(r => {
    //   console.log('r',r)});
  }

  getUserBalance(account = "jacobyu", symbol = "RORS") {
    this.ssc
      .findOne("tokens", "balances", {
        account,
        symbol
      })
      .then(data => {
        console.log("Balance", data);
      });
  }

  async callApi(url, params) {
    return await axios({
      url,
      method: "GET",
      params
    })
      .then(response => {
        // console.log(response.data);
        return response.data;
      })
      .catch(err => {
        console.error(`Could not fetch data, url: ${url}`);
        return {};
      });
  }

  async getSteemEngineAccountHistoryAsync(account, token) {
    return this.callApi("https://api.steem-engine.com/accounts/history", {
      account,
      limit: 100,
      offset: 0,
      type: "user",
      symbol: token,
      v: new Date().getTime()
    });
  }

  getTokenInfo(symbol) {
    var ssc = this.ssc;
    return new Promise((resolve, reject) => {
      ssc.find(
        "tokens",
        "tokens",
        { symbol: symbol },
        1000,
        0,
        [],
        (err, result) => {
          console.log(result);
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  }

  getInfo(symbol) {
    var ssc = this.ssc;
    var token_info = {};
    ssc.stream((err, res) => {});

    return new Promise((resolve, reject) => {
      ssc.find(
        "market",
        "metrics",
        { symbol: symbol },
        1000,
        0,
        [],
        (err, result) => {
          token_info = {
            lastPrice: result[0].lastPrice,
            volume: result[0].volume,
            highestBid: result[0].highestBid,
            lowestAsk: result[0].lowestAsk
          };
          if (err) reject(err);
          resolve(token_info);
        }
      );
    });
  }

  async getHoldersAsync(symbol) {
    var ssc = this.ssc;
    var holders_info = [];
    var cnt = 500;
    var getCnt = 0;
    while (true) {
      var holders = await this.getHolderOnce(symbol, getCnt * cnt, cnt);
      getCnt = getCnt + 1;
      holders_info = holders_info.concat(holders);
      if (holders.length < cnt) {
        return holders_info;
      }
    }
  }

  async getHolderOnce(symbol, offset = 0, limit = 100) {
    return new Promise((resolve, reject) => {
      this.ssc.find(
        "tokens",
        "balances",
        { symbol: symbol },
        limit,
        offset,
        [],
        (err, result) => {
          // console.log("limit", limit);
          // console.log("offset", offset);
          // console.log("result", result);
          resolve(result);
        }
      );
    });
  }

  getHolders(symbol) {
    var ssc = this.ssc;
    var holders_info = [];
    var holders = [];
    return new Promise((resolve, reject) => {
      this.getHoldersAsync(symbol).then(result => {
        // filtering balance more than 0
        console.log("getHolders", result);
        if (result[0].stake === undefined) /// should check.. and change
        {
          result = result.filter(item => item.account != "null");
          result = result.filter(item => item.balance * 1 > 0);
          result.sort(function(a, b) {
            return b.balance - a.balance;
          });
        } else {
          result = result.filter(item => item.account != "null");
          result = result.filter(item => item.stake * 1 + item.balance * 1 > 0);
          result.sort(function(a, b) {
            var b_sum = b.balance * 1 + b.stake * 1;
            var a_sum = a.balance * 1 + a.stake * 1;
            return b_sum - a_sum;
          });
        }
        var sumBalance = 0;
        var sumStake = 0;
        var sumStakeBalance = 0;
        /// add all balances
        for (const holder of result) {
          sumBalance = sumBalance + 1 * holder.balance;
          sumStake = sumStake + 1 * holder.stake;
        }
        /// remove maintainer balances
        for (const mt of this.maintainer) {
          var maintainer = this.findAccount(result, mt);
          if (maintainer !== undefined)
            sumBalance = sumBalance - maintainer.balance;
        }

        holders_info.push(sumBalance);
        sumStakeBalance = sumBalance * 1 + sumStake * 1;
        if (isNaN(sumStake)) {
          sumStakeBalance = sumBalance;
          sumStake = 0;
        }

        /// calculate rate
        var holder_id = 0;
        for (const holder of result) {
          holder_id = holder_id + 1;
          holder.rate = holder.balance / sumBalance;
          for (const mt of this.maintainer) {
            if (holder.account === mt) holder.rate = 0;
          }
          var voting_rate = 1;
          if (holder.balance / 1000 > 45) voting_rate = voting_rate + 45;
          else voting_rate = voting_rate + Math.floor(holder.balance / 1000);

          if (holder.stake == undefined) {
            holders.push({
              account: holder.account,
              sum: holder.balance * 1,
              stake: 0,
              balance: holder.balance,
              delegated: 0,
              received: 0,
              pending_unstake: 0,
              rate: holder.rate * 1,
              voting_rate: voting_rate,
              hid: holder_id
            });
          } else {
            var delegated = 0;
            var received = 0;
            var stake_with_delegated = holder.stake * 1;

            if (holder.delegationsIn != undefined) {
              stake_with_delegated =
                stake_with_delegated + holder.delegationsIn * 1;
            }

            if (holder.delegatedStake == undefined) {
              delegated = holder.delegationsOut;
            }
            if (holder.receivedStake == undefined) {
              received = holder.delegationsIn;
            }

            holders.push({
              account: holder.account,
              sum: holder.balance * 1 + holder.stake * 1,
              stake: stake_with_delegated,
              balance: holder.balance,
              delegated,
              received,
              pending_unstake: holder.pendingUnstake,
              rate: holder.rate * 1,
              voting_rate: voting_rate,
              hid: holder_id
            });
          }
        }
        // if (err) reject(err);
        holders_info.push(holders);
        holders_info.push(sumStake);
        holders_info.push(sumStakeBalance);

        resolve(holders_info);
      });
    });
  }

  findAccount = (holders, account) => {
    return holders.find(function(a) {
      return a.account === account;
    });
  };
}
