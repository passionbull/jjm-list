(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{149:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.register=function(e){if("serviceWorker"in navigator){var t=new URL("/jjm-list",window.location.href);if(t.origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/jjm-list","/service-worker.js");n?(!function(e,t){fetch(e).then(function(n){var r=n.headers.get("content-type");404===n.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):o(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):o(t,e)})}},t.unregister=function(){"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})};var n=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function o(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}},81:function(e,t,n){e.exports=n(82)},82:function(e,t,n){var o=n(47),r=n(48),a=r(n(1)),i=r(n(16));n(86);var l=r(n(88)),c=o(n(149));i.default.render(a.default.createElement(l.default,null),document.getElementById("root")),c.unregister()},86:function(e,t,n){},88:function(e,t,n){(function(e){var o=n(47),r=n(48);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(90)),i=r(n(91)),l=r(n(92)),c=r(n(95)),u=r(n(96)),f=o(n(1)),s=n(150),d=r(n(123)),h=function(e){function t(){var e,n;(0,a.default)(this,t);for(var o=arguments.length,r=new Array(o),i=0;i<o;i++)r[i]=arguments[i];return(n=(0,l.default)(this,(e=(0,c.default)(t)).call.apply(e,[this].concat(r))))._onPress=function(){},n}return(0,u.default)(t,e),(0,i.default)(t,[{key:"render",value:function(){return f.default.createElement(s.View,{style:m.listView},f.default.createElement(s.Text,{style:m.item},this.props.title),f.default.createElement(s.Text,{style:m.item2},1*this.props.rate))}}]),t}(f.default.PureComponent),v=function(e){function t(){var e,n;(0,a.default)(this,t);for(var o=arguments.length,r=new Array(o),i=0;i<o;i++)r[i]=arguments[i];return(n=(0,l.default)(this,(e=(0,c.default)(t)).call.apply(e,[this].concat(r)))).state={holders:[],symbol:"",maintainer:["virus707","goldenticket","jjm13"],real_maintainer:[],sum_balance:""},n.sscLoad=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"JJM",t=new d.default("https://api.steem-engine.com/rpc/");t.stream(function(e,t){}),t.find("tokens","balances",{symbol:e},1e3,0,[],function(t,o){var r=[],a=[];o.sort(function(e,t){return t.balance-e.balance});var i=!0,l=!1,c=void 0;try{for(var u,f=o["function"===typeof Symbol&&"function"===typeof Symbol&&"function"===typeof Symbol?Symbol.iterator:"@@iterator"]();!(i=(u=f.next()).done);i=!0){var s=u.value;r.push(s)}}catch(t){l=!0,c=t}finally{try{i||null==f.return||f.return()}finally{if(l)throw c}}console.log(r);for(var d=0,h=r,v=0;v<h.length;v++){d+=1*h[v].balance}var m=!0,y=!1,b=void 0;try{for(var g,p=n.state.maintainer["function"===typeof Symbol&&"function"===typeof Symbol&&"function"===typeof Symbol?Symbol.iterator:"@@iterator"]();!(m=(g=p.next()).done);m=!0){var w=g.value,S=n.findAccount(r,w);void 0!==S&&(d-=S.balance)}}catch(t){y=!0,b=t}finally{try{m||null==p.return||p.return()}finally{if(y)throw b}}console.log("sum balance : "+d),n.setState({sum_balance:d});for(var k=r,W=0;W<k.length;W++){var x=k[W];x.rate=x.balance/d;var E=!0,_=!1,j=void 0;try{for(var C,J=n.state.maintainer["function"===typeof Symbol&&"function"===typeof Symbol&&"function"===typeof Symbol?Symbol.iterator:"@@iterator"]();!(E=(C=J.next()).done);E=!0){var A=C.value;x.account===A&&(x.rate=0)}}catch(t){_=!0,j=t}finally{try{E||null==J.return||J.return()}finally{if(_)throw j}}var T=x.account+": "+(1*x.balance).toFixed(2)+" "+e;a.push({key:T,rate:(1*x.rate).toFixed(3)})}n.setState({holders:r,holders_data:a,sum_balance:d})})},n.findAccount=function(e,t){return e.find(function(e){return e.account===t})},n.onClick=function(){n.sscLoad(n.state.symbol)},n}return(0,u.default)(t,e),(0,i.default)(t,[{key:"componentDidMount",value:function(){this.setState({symbol:"JJM"}),this.sscLoad("JJM")}},{key:"render",value:function(){return f.default.createElement(s.View,{style:m.container},f.default.createElement(s.Text,{style:{color:"black",fontWeight:"bold",fontSize:16}},"\ucd1d \ud640\ub354 \uc218 : ",this.state.holders.length),f.default.createElement(s.Text,{style:{color:"black",fontWeight:"bold",fontSize:16}},"\uc720\ud1b5\ubb3c\ub7c9 : ",(1*this.state.sum_balance).toFixed(2)," JJM"),f.default.createElement(s.FlatList,{data:this.state.holders_data,renderItem:function(e){var t=e.item;return f.default.createElement(h,{id:t.id,title:t.key,rate:t.rate})}}))}}]),t}(f.Component),m=s.StyleSheet.create({container:{flex:1,backgroundColor:"#fff",alignItems:"center",justifyContent:"center"},logo:{width:300,height:300},title:{fontWeight:"bold",fontSize:16},button:{borderRadius:3,padding:20,marginVertical:10,marginTop:10,backgroundColor:"#1B95E0"},button2:{borderRadius:3,padding:20,marginVertical:10,marginTop:10,backgroundColor:"#1B05E0"},buttonText:{color:"#fff",fontWeight:"bold",fontSize:16},listView:{borderBottomColor:"black",borderBottomWidth:1},item:{padding:5,fontSize:18,height:30},item2:{padding:5,fontSize:18,height:30,fontWeight:"bold"}}),y=function(){return function(){return v}};"web"===s.Platform.OS&&(y=n(147).hot);var b=y(e)(v);t.default=b}).call(this,n(89)(e))}},[[81,2,1]]]);
//# sourceMappingURL=main.ae4df777.chunk.js.map