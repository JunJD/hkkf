"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[616],{317:function(e,t,n){n.d(t,{Z:function(){return c}});n(331);var r=n(6059),a=n.n(r),s=(n(2791),n(6871)),i=n(184);var c=function(e){var t=e.children,n=e.onLeftClick,r=e.className,c=e.rightContent,l=(0,s.s0)();return(0,i.jsx)(a(),{className:["navBar",r||""].join(" "),mode:"light",icon:(0,i.jsx)("i",{className:"iconfont icon-back"}),onLeftClick:n||function(){return l(-1)},rightContent:c,children:t})}},3616:function(e,t,n){n.r(t),n.d(t,{default:function(){return j}});n(6953);var r=n(8453),a=n.n(r),s=(n(7765),n(1675)),i=n.n(s),c=n(5861),l=n(5671),o=n(3144),u=n(136),f=n(9388),d=n(7757),h=n.n(d),m=n(2791),p=n(4569),v=n.n(p),y=n(317),N=n(184),j=function(e){(0,u.Z)(n,e);var t=(0,f.Z)(n);function n(){var e;(0,l.Z)(this,n);for(var r=arguments.length,a=new Array(r),s=0;s<r;s++)a[s]=arguments[s];return(e=t.call.apply(t,[this].concat(a))).state={news:[]},e}return(0,o.Z)(n,[{key:"getNews",value:function(){var e=(0,c.Z)(h().mark((function e(){var t,n,r;return h().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=JSON.parse(localStorage.getItem("hkzf_city")),n=t.value,e.next=3,v().get("http://localhost:8080/home/news",{params:{area:n}});case 3:r=e.sent,this.setState((function(){return{news:r.data.body}}));case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"renderNews",value:function(){return this.state.news.map((function(e){return(0,N.jsxs)("div",{className:"news-item",children:[(0,N.jsx)("div",{className:"imgwrap",children:(0,N.jsx)("img",{className:"img",src:"http://localhost:8080".concat(e.imgSrc),alt:""})}),(0,N.jsxs)(i(),{className:"content",direction:"column",justify:"between",children:[(0,N.jsx)("h3",{className:"title",children:e.title}),(0,N.jsxs)(i(),{className:"info",justify:"between",children:[(0,N.jsx)("span",{children:e.from}),(0,N.jsx)("span",{children:e.date})]})]})]},e.id)}))}},{key:"render",value:function(){return(0,N.jsx)("div",{className:"New",children:(0,N.jsxs)("div",{className:"news",children:[(0,N.jsx)(y.Z,{children:"\u8d44\u8baf"}),(0,N.jsx)(a(),{size:"md",children:this.renderNews()})]})})}},{key:"componentDidMount",value:function(){this.getNews()}}]),n}(m.Component)},6059:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=u(n(2836)),a=u(n(5053)),s=u(n(2749)),i=u(n(4976)),c=u(n(2455)),l=u(n(1694)),o=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(2791));function u(e){return e&&e.__esModule?e:{default:e}}var f=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&(n[r[a]]=e[r[a]])}return n},d=function(e){function t(){return(0,a.default)(this,t),(0,i.default)(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return(0,c.default)(t,e),(0,s.default)(t,[{key:"render",value:function(){var e=this.props,t=e.prefixCls,n=e.className,a=e.children,s=e.mode,i=e.icon,c=e.onLeftClick,u=e.leftContent,d=e.rightContent,h=f(e,["prefixCls","className","children","mode","icon","onLeftClick","leftContent","rightContent"]);return o.createElement("div",(0,r.default)({},h,{className:(0,l.default)(n,t,t+"-"+s)}),o.createElement("div",{className:t+"-left",role:"button",onClick:c},i?o.createElement("span",{className:t+"-left-icon","aria-hidden":"true"},i):null,u),o.createElement("div",{className:t+"-title"},a),o.createElement("div",{className:t+"-right"},d))}}]),t}(o.Component);t.default=d,d.defaultProps={prefixCls:"am-navbar",mode:"dark",onLeftClick:function(){}},e.exports=t.default},331:function(e,t,n){n(6993),n(5764)},5764:function(e,t,n){n.r(t),t.default={}}}]);
//# sourceMappingURL=616.a701494f.chunk.js.map