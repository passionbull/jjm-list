(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{149:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.register=function(e){if("serviceWorker"in navigator){var t=new URL("/jjm-list",window.location.href);if(t.origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/jjm-list","/service-worker.js");n?(!function(e,t){fetch(e).then(function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):o(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):o(t,e)})}},t.unregister=function(){"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})};var n=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function o(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}},81:function(e,t,n){e.exports=n(82)},82:function(e,t,n){var o=n(47),a=n(48),r=a(n(1)),i=a(n(16));n(86);var l=a(n(88)),c=o(n(149));i.default.render(r.default.createElement(l.default,null),document.getElementById("root")),c.unregister()},86:function(e,t,n){},88:function(e,t,n){(function(e){var o=n(47),a=n(48);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n(90)),i=a(n(91)),l=a(n(92)),c=a(n(95)),f=a(n(96)),d=o(n(1)),s=n(150),u=a(n(123)),h=function(e){function t(){var e,n;(0,r.default)(this,t);for(var o=arguments.length,a=new Array(o),i=0;i<o;i++)a[i]=arguments[i];return(n=(0,l.default)(this,(e=(0,c.default)(t)).call.apply(e,[this].concat(a))))._onPress=function(){},n}return(0,f.default)(t,e),(0,i.default)(t,[{key:"render",value:function(){return d.default.createElement(s.View,{style:{flex:1,flexDirection:"row",paddingTop:5}},d.default.createElement(s.View,{style:{flex:1,borderWidth:.1}},d.default.createElement(s.Text,{style:{flex:1,color:"black",fontSize:15,padding:3}},this.props.account)),d.default.createElement(s.View,{style:{flex:1,borderWidth:.1}},d.default.createElement(s.Text,{style:{flex:1,color:"black",fontSize:15,padding:3}},this.props.balance)),d.default.createElement(s.View,{style:{flex:1,borderWidth:.1}},d.default.createElement(s.Text,{style:{flex:1,color:"black",fontSize:15,padding:3,paddingLeft:10}},1*this.props.rate)))}}]),t}(d.default.PureComponent),m=function(e){function t(){var e,n;(0,r.default)(this,t);for(var o=arguments.length,a=new Array(o),i=0;i<o;i++)a[i]=arguments[i];return(n=(0,l.default)(this,(e=(0,c.default)(t)).call.apply(e,[this].concat(a)))).state={holders:[],symbol:"",maintainer:["virus707","goldenticket","jjm13"],real_maintainer:[],sum_balance:""},n.sscLoad=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"JJM",t=new u.default("https://api.steem-engine.com/rpc/");t.stream(function(e,t){}),t.find("market","metrics",{symbol:e},1e3,0,[],function(e,t){n.setState({lastPrice:t[0].lastPrice,volume:t[0].volume,highestBid:t[0].highestBid,lowestAsk:t[0].lowestAsk})}),t.find("tokens","balances",{symbol:e},1e3,0,[],function(t,o){var a=[],r=[];o.sort(function(e,t){return t.balance-e.balance});var i=!0,l=!1,c=void 0;try{for(var f,d=o["function"===typeof Symbol&&"function"===typeof Symbol&&"function"===typeof Symbol?Symbol.iterator:"@@iterator"]();!(i=(f=d.next()).done);i=!0){var s=f.value;a.push(s)}}catch(t){l=!0,c=t}finally{try{i||null==d.return||d.return()}finally{if(l)throw c}}console.log(a);for(var u=0,h=a,m=0;m<h.length;m++){u+=1*h[m].balance}var b=!0,g=!1,y=void 0;try{for(var p,v=n.state.maintainer["function"===typeof Symbol&&"function"===typeof Symbol&&"function"===typeof Symbol?Symbol.iterator:"@@iterator"]();!(b=(p=v.next()).done);b=!0){var w=p.value,S=n.findAccount(a,w);void 0!==S&&(u-=S.balance)}}catch(t){g=!0,y=t}finally{try{b||null==v.return||v.return()}finally{if(g)throw y}}console.log("sum balance : "+u),n.setState({sum_balance:u});for(var k=a,x=0;x<k.length;x++){var E=k[x];E.rate=E.balance/u;var T=!0,W=!1,z=void 0;try{for(var A,B=n.state.maintainer["function"===typeof Symbol&&"function"===typeof Symbol&&"function"===typeof Symbol?Symbol.iterator:"@@iterator"]();!(T=(A=B.next()).done);T=!0){var _=A.value;E.account===_&&(E.rate=0)}}catch(t){W=!0,z=t}finally{try{T||null==B.return||B.return()}finally{if(W)throw z}}E.account,(1*E.balance).toFixed(2);r.push({account:E.account,balance:(1*E.balance).toFixed(2)+" "+e,rate:(1*E.rate).toFixed(3)})}n.setState({holders:a,holders_data:r,sum_balance:u})})},n.findAccount=function(e,t){return e.find(function(e){return e.account===t})},n.onClick=function(){n.sscLoad(n.state.symbol)},n}return(0,f.default)(t,e),(0,i.default)(t,[{key:"componentDidMount",value:function(){this.setState({symbol:"JJM"}),this.sscLoad("JJM")}},{key:"render",value:function(){return d.default.createElement(s.View,{style:{flex:1}},d.default.createElement(s.Text,{style:{color:"black",fontWeight:"bold",fontSize:20,paddingTop:20,paddingBottom:3}},"Token Info"),d.default.createElement(s.Text,{style:{color:"black",fontSize:15,paddingBottom:5}},"Last: ",this.state.lastPrice," STEEM, 24h Vol: ",this.state.volume," STEEM, Bid: ",this.state.highestBid," STEEM, Ask: ",this.state.lowestAsk," STEEM"),d.default.createElement(s.Text,{style:{color:"black",fontWeight:"bold",fontSize:16,paddingBottom:3}},"\ucd1d \ud640\ub354 \uc218 : ",this.state.holders.length),d.default.createElement(s.Text,{style:{color:"black",fontWeight:"bold",fontSize:16}},"\uc720\ud1b5\ubb3c\ub7c9 : ",(1*this.state.sum_balance).toFixed(2)," JJM"),d.default.createElement(s.View,{style:{flex:1,flexDirection:"row",paddingTop:30}},d.default.createElement(s.Text,{style:{flex:1,color:"black",fontWeight:"bold",fontSize:20,padding:3}},"Account"),d.default.createElement(s.Text,{style:{flex:1,color:"black",fontWeight:"bold",fontSize:20,padding:3}},"Balance"),d.default.createElement(s.Text,{style:{flex:1,color:"black",fontWeight:"bold",fontSize:20,padding:3}},"Rate")),d.default.createElement(s.FlatList,{data:this.state.holders_data,renderItem:function(e){var t=e.item;return d.default.createElement(h,{id:t.id,account:t.account,balance:t.balance,rate:t.rate})}}))}}]),t}(d.Component),b=(s.StyleSheet.create({container:{flex:1,backgroundColor:"#fff",alignItems:"center",justifyContent:"center"},logo:{width:300,height:300},title:{fontWeight:"bold",fontSize:16},button:{borderRadius:3,padding:20,marginVertical:10,marginTop:10,backgroundColor:"#1B95E0"},button2:{borderRadius:3,padding:20,marginVertical:10,marginTop:10,backgroundColor:"#1B05E0"},buttonText:{color:"#fff",fontWeight:"bold",fontSize:16},listView:{borderBottomColor:"black",borderBottomWidth:1},item:{padding:5,fontSize:18,height:30},item2:{padding:5,fontSize:18,height:30,fontWeight:"bold"}}),function(){return function(){return m}});"web"===s.Platform.OS&&(b=n(147).hot);var g=b(e)(m);t.default=g}).call(this,n(89)(e))}},[[81,2,1]]]);
//# sourceMappingURL=main.e4018029.chunk.js.map