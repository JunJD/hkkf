(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[165],{165:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return b}});var a=n(1413),o=(n(3264),n(5229)),i=n.n(o),r=n(5861),s=n(5671),l=n(3144),u=n(136),c=n(9388),f=n(7757),p=n.n(f),h=n(2791),d=n(5633),m="Search_root__voF82",v="Search_tips__P486Q",y="Search_tip__07kj3",C=n(6871),g=n(184),_=function(e){(0,u.Z)(n,e);var t=(0,c.Z)(n);function n(){var e;(0,s.Z)(this,n);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(e=t.call.apply(t,[this].concat(o))).cityId=(0,d.hw)().value,e.timerId=null,e.state={searchTxt:"",tipsList:[]},e.onTipsClick=function(t){e.props.navigate("/rent/add",{replace:!0,state:{name:t.communityName,id:t.community}})},e.renderTips=function(){return e.state.tipsList.map((function(t){return(0,g.jsx)("li",{className:y,onClick:function(){return e.onTipsClick(t)},children:t.communityName},t.community)}))},e.handleSearchTxt=function(t){if(e.setState({searchTxt:t}),!t)return e.setState({tipsList:[]});clearTimeout(e.timerId),e.timerId=setTimeout((0,r.Z)(p().mark((function n(){var a;return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,d.bl.get("/area/community",{params:{name:t,id:e.cityId}});case 2:a=n.sent,e.setState({tipsList:a.data.body});case 4:case"end":return n.stop()}}),n)}))),500)},e}return(0,l.Z)(n,[{key:"render",value:function(){var e=this.props.navigate,t=this.state.searchTxt;return(0,g.jsxs)("div",{className:m,children:[(0,g.jsx)(i(),{placeholder:"\u8bf7\u8f93\u5165\u5c0f\u533a\u6216\u5730\u5740",value:t,onChange:this.handleSearchTxt,showCancelButton:!0,onCancel:function(){return e("/rent/add",{replace:!0})}}),(0,g.jsx)("ul",{className:v,children:this.renderTips()})]})}}]),n}(h.Component);function b(e){var t=(0,C.s0)();return(0,g.jsx)(_,(0,a.Z)((0,a.Z)({},e),{},{navigate:t}))}},5895:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,o=n(2836),i=(a=o)&&a.__esModule?a:{default:a};t.getComponentLocale=function(e,t,n,a){var o={};if(t&&t.antLocale&&t.antLocale[n])o=t.antLocale[n];else{var r=a();o=r.default||r}var s=(0,i.default)({},o);e.locale&&(s=(0,i.default)({},s,e.locale),e.locale.lang&&(s.lang=(0,i.default)({},o.lang,e.locale.lang)));return s},t.getLocaleCode=function(e){var t=e.antLocale&&e.antLocale.locale;if(e.antLocale&&e.antLocale.exist&&!t)return"zh-cn";return t}},3273:function(e,t){"use strict";function n(){}Object.defineProperty(t,"__esModule",{value:!0});t.defaultProps={prefixCls:"am-search",placeholder:"",onSubmit:n,onChange:n,onFocus:n,onBlur:n,onClear:n,showCancelButton:!1,disabled:!1}},5229:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=y(n(2836)),o=y(n(4333)),i=y(n(5053)),r=y(n(2749)),s=y(n(4976)),l=y(n(2455)),u=y(n(1694)),c=v(n(2791)),f=v(n(2007)),p=y(n(381)),h=y(n(6530)),d=n(5895),m=n(3273);function v(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function y(e){return e&&e.__esModule?e:{default:e}}var C=function(e){function t(e){(0,i.default)(this,t);var n=(0,s.default)(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));n.onSubmit=function(e){e.preventDefault(),n.props.onSubmit&&n.props.onSubmit(n.state.value||""),n.inputRef&&n.inputRef.blur()},n.onChange=function(e){n.state.focus||n.setState({focus:!0});var t=e.target.value;"value"in n.props||n.setState({value:t}),n.props.onChange&&n.props.onChange(t)},n.onFocus=function(){n.setState({focus:!0}),n.firstFocus=!0,n.props.onFocus&&n.props.onFocus()},n.onBlur=function(){var e;n.onBlurTimeout=(e=function(){n.blurFromOnClear||document.activeElement!==n.inputRef&&n.setState({focus:!1}),n.blurFromOnClear=!1},window.requestAnimationFrame?window.requestAnimationFrame(e):window.setTimeout(e,1)),n.props.onBlur&&(setTimeout((function(){document.body&&(document.body.scrollTop=document.body.scrollTop)}),100),n.props.onBlur())},n.onClear=function(){n.doClear()},n.doClear=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];n.blurFromOnClear=e,"value"in n.props||n.setState({value:""}),n.props.onClear&&n.props.onClear(""),n.props.onChange&&n.props.onChange(""),e&&n.focus()},n.onCancel=function(){n.props.onCancel?n.props.onCancel(n.state.value||""):n.doClear(!1)},n.focus=function(){n.inputRef&&n.inputRef.focus()};var a=void 0;return a="value"in e?e.value||"":"defaultValue"in e?e.defaultValue:"",n.state={value:a,focus:!1},n}return(0,l.default)(t,e),(0,r.default)(t,[{key:"componentDidMount",value:function(){if(this.rightBtnRef){var e=window.getComputedStyle(this.rightBtnRef);this.rightBtnInitMarginleft=e.marginLeft}this.componentDidUpdate()}},{key:"componentDidUpdate",value:function(){if(this.syntheticPhRef)if(this.inputContainerRef&&this.inputContainerRef.className.indexOf(this.props.prefixCls+"-start")>-1){if(this.syntheticPhContainerRef){var e=this.syntheticPhContainerRef.getBoundingClientRect().width;this.syntheticPhRef.style.width=Math.ceil(e)+"px"}!this.props.showCancelButton&&this.rightBtnRef&&(this.rightBtnRef.style.marginRight="0")}else this.syntheticPhRef.style.width="100%",!this.props.showCancelButton&&this.rightBtnRef&&(this.rightBtnRef.style.marginRight="-"+(this.rightBtnRef.offsetWidth+(null!=this.rightBtnInitMarginleft?parseInt(this.rightBtnInitMarginleft,10):0))+"px")}},{key:"componentWillReceiveProps",value:function(e){"value"in e&&e.value!==this.state.value&&this.setState({value:e.value})}},{key:"componentWillUnmount",value:function(){var e;this.onBlurTimeout&&(e=this.onBlurTimeout,window.cancelAnimationFrame?window.cancelAnimationFrame(e):window.clearTimeout(e),this.onBlurTimeout=null)}},{key:"render",value:function(){var e,t=this,i=this.props,r=i.prefixCls,s=i.showCancelButton,l=i.disabled,f=i.placeholder,m=i.className,v=i.style,y=i.maxLength,C=(0,d.getComponentLocale)(this.props,this.context,"SearchBar",(function(){return n(2871)})).cancelText,g=this.state,_=g.value,b=g.focus,T=(0,u.default)(r,m,(0,o.default)({},r+"-start",!!(b||_&&_.length>0))),w=(0,u.default)(r+"-clear",(0,o.default)({},r+"-clear-show",!!(b&&_&&_.length>0))),R=(0,u.default)(r+"-cancel",(e={},(0,o.default)(e,r+"-cancel-show",!!(s||b||_&&_.length>0)),(0,o.default)(e,r+"-cancel-anim",this.firstFocus),e));return c.createElement("form",{onSubmit:this.onSubmit,className:T,style:v,ref:function(e){return t.inputContainerRef=e},action:"#"},c.createElement("div",{className:r+"-input"},c.createElement("div",{className:r+"-synthetic-ph",ref:function(e){return t.syntheticPhRef=e}},c.createElement("span",{className:r+"-synthetic-ph-container",ref:function(e){return t.syntheticPhContainerRef=e}},c.createElement("i",{className:r+"-synthetic-ph-icon"}),c.createElement("span",{className:r+"-synthetic-ph-placeholder",style:{visibility:f&&!_?"visible":"hidden"}},f))),c.createElement("input",(0,a.default)({type:"search",className:r+"-value",value:_,disabled:l,placeholder:f,onChange:this.onChange,onFocus:this.onFocus,onBlur:this.onBlur,ref:function(e){return t.inputRef=e},maxLength:y},(0,h.default)(this.props))),c.createElement(p.default,{activeClassName:r+"-clear-active"},c.createElement("a",{onClick:this.onClear,className:w}))),c.createElement("div",{className:R,onClick:this.onCancel,ref:function(e){return t.rightBtnRef=e}},this.props.cancelText||C))}}]),t}(c.Component);t.default=C,C.defaultProps=m.defaultProps,C.contextTypes={antLocale:f.object},e.exports=t.default},2871:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={cancelText:"\u53d6\u6d88"},e.exports=t.default},3264:function(e,t,n){"use strict";n(6993),n(4801)},888:function(e,t,n){"use strict";var a=n(9047);function o(){}function i(){}i.resetWarningCache=o,e.exports=function(){function e(e,t,n,o,i,r){if(r!==a){var s=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw s.name="Invariant Violation",s}}function t(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:i,resetWarningCache:o};return n.PropTypes=n,n}},2007:function(e,t,n){e.exports=n(888)()},9047:function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},4801:function(e,t,n){"use strict";n.r(t),t.default={}}}]);
//# sourceMappingURL=165.6b50f969.chunk.js.map