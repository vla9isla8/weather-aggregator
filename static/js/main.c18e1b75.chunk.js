(this["webpackJsonpweatcher-aggregator"]=this["webpackJsonpweatcher-aggregator"]||[]).push([[0],{101:function(e,t,n){},117:function(e,t){},119:function(e,t){},131:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(8),o=n.n(c),i=(n(101),n(10)),u=n.n(i),s=n(37),l=n(64),f=n(83),p=n(16),h=n(66),d=n(160),g=n(170),m=n(163),v=n(168),w=n(44),b=n(164),y=n(165),k=n(166),E=n(167),j=n(21),O=n(38),x=function e(t,n,r,a){Object(j.a)(this,e),this.date=t,this.tempreratureDay=n,this.tempreratureNight=r,this.description=a};function W(e,t){return S.apply(this,arguments)}function S(){return(S=Object(p.a)(u.a.mark((function e(t,r){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([n.e(3),n.e(4)]).then(n.t.bind(null,199,7));case 2:return(a=e.sent).setLang("ru"),a.setUnits("metric"),a.setCity(t),a.setAPPID(r),e.abrupt("return",new Promise((function(e,t){return a.getWeatherForecastForDays(5,(function(n,r){n?t(n):e(r)}))})));case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var A=function(){function e(t){Object(j.a)(this,e),this.apiKey=t,this.name="OpenWeather"}return Object(O.a)(e,[{key:"getWeather",value:function(){var e=Object(p.a)(u.a.mark((function e(t){var n,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,W(t,this.apiKey);case 3:return n=e.sent,r=n.list,e.abrupt("return",r.map((function(e){return new x(new Date(parseInt("".concat(e.dt,"000"))),e.temp.day,e.temp.night,e.weather[0].description)})));case 8:return e.prev=8,e.t0=e.catch(0),console.error(e.t0),e.abrupt("return",null);case 12:case"end":return e.stop()}}),e,this,[[0,8]])})));return function(t){return e.apply(this,arguments)}}()}]),e}(),C=n(84),D=n.n(C);function P(e){return F.apply(this,arguments)}function F(){return(F=Object(p.a)(u.a.mark((function e(t){var n,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://weather.service.msn.com/data.aspx?weasearchstr=".concat(t,"&culture=ru-RU&weadegreetype=C&src=outlook"));case 2:return n=e.sent,e.t0=D.a,e.next=6,n.text();case 6:return e.t1=e.sent,e.t2={charkey:"C$",attrkey:"A$",explicitArray:!0,mergeAttrs:!0},e.next=10,e.t0.parseStringPromise.call(e.t0,e.t1,e.t2);case 10:return r=e.sent,e.abrupt("return",r.weatherdata.weather[0]);case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var I=function(){function e(){Object(j.a)(this,e),this.name="MSN"}return Object(O.a)(e,[{key:"getWeather",value:function(){var e=Object(p.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,P(t);case 3:return n=e.sent,console.log(n),e.abrupt("return",n.forecast.map((function(e){return new x(new Date(e.date[0]),parseFloat(e.high[0]),parseFloat(e.low[0]),e.skytextday[0])})));case 8:return e.prev=8,e.t0=e.catch(0),console.error(e.t0),e.abrupt("return",null);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}()}]),e}(),N=[new A("6d0e27996f99802be89d9575a5dfb7ca"),new I];var U=function(){var e=Object(r.useState)({}),t=Object(h.a)(e,2),n=t[0],c=t[1],o=Object(r.useState)(localStorage.getItem("city")||""),i=Object(h.a)(o,2),j=i[0],O=i[1],x=Object(r.useCallback)((function(e){var t=e.target.value;localStorage.setItem("city",t),O(t)}),[]);return Object(r.useEffect)((function(){var e=!1;return function(){var t=Object(p.a)(u.a.mark((function t(){var n,r,a;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=Object(f.a)(N);try{for(a=function(){var t=r.value;t.getWeather(j).then((function(n){e||c((function(e){return Object(l.a)(Object(l.a)({},e),{},Object(s.a)({},t.name,n||[]))}))}))},n.s();!(r=n.n()).done;)a()}catch(o){n.e(o)}finally{n.f()}case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()(),function(){e=!0}}),[j]),a.a.createElement(a.a.Fragment,null,a.a.createElement(d.a,null),a.a.createElement(g.a,{display:"flex",flexDirection:"column",height:1,overflow:"hidden"},a.a.createElement(g.a,{padding:3},a.a.createElement(m.a,null,a.a.createElement(v.a,{name:"city",label:"\u0413\u043e\u0440\u043e\u0434",value:j,onChange:x}))),a.a.createElement(g.a,{flex:1,overflow:"auto"},Object.keys(n).map((function(e){return a.a.createElement(g.a,{key:e,padding:3},a.a.createElement(w.a,{variant:"h4"},e),a.a.createElement(g.a,{paddingTop:3},a.a.createElement(b.a,{container:!0,spacing:2},n[e].map((function(e,t){return a.a.createElement(b.a,{item:!0,key:t},a.a.createElement(y.a,null,a.a.createElement(k.a,{title:e.date.toLocaleDateString()}),a.a.createElement(E.a,null,a.a.createElement(w.a,{variant:"subtitle1"},e.description),a.a.createElement(w.a,{variant:"subtitle2"},"\u0414\u043d\u0435\u043c: ",e.tempreratureDay),a.a.createElement(w.a,{variant:"subtitle2"},"\u041d\u043e\u0447\u044c\u044e: ",e.tempreratureNight))))})))))})))))},L=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function R(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}o.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(U,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/weather-aggregator",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/weather-aggregator","/service-worker.js");L?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var r=n.headers.get("content-type");404===n.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):R(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):R(t,e)}))}}()},96:function(e,t,n){e.exports=n(131)}},[[96,1,2]]]);
//# sourceMappingURL=main.c18e1b75.chunk.js.map