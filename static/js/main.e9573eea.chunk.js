(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,function(e,t,a){e.exports=a.p+"static/media/left-arrow.22408d0b.svg"},function(e,t,a){e.exports=a.p+"static/media/right-arrow.8447d8f3.svg"},,,function(e,t,a){e.exports=a(20)},,,,,,function(e,t,a){},function(e,t,a){},,function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),s=a(3),i=a.n(s),o=(a(17),a(4)),l=a(5),d=a(9),c=a(6),m=a(10),h=a(7),u=a.n(h),v=a(8),f=a.n(v),p=(a(18),a(0)),y=a.n(p),b=["na","mo","tu","we","th","fr","st","su"],E=function(e){return!y.a.isMoment(e)||7!==e.isoWeekday()&&6!==e.isoWeekday()},k=function(e,t,a){if("string"===typeof e){var n=!0;if(e.match(/noAdj/i)&&(n=!1),e.match(/^\d+d/i)){var r=Number(e.match(/^\d+/));for(t.add(Number(r),"d");n&&!a(t);)t.add(1,"d");return t}if(e.match(/^\d+bd/i)){for(var s=Number(e.match(/^\d+/)),i=0;i<s;)t.add(1,"d"),a(t)&&i++;return t}if(e.match(/^\d+m/i)){var o=Number(e.match(/^\d+/));t=t.add(o,"M")}var l=e.match(/\d+(su|mo|tu|we|th|fr|st)/i);if(null!==l)for(var d=l[0],c=y()(t.format("YYYY-MM-01"),"YYYY-MM-DD"),m=b[c.isoWeekday()],h=(t.month(),0);h<=5;){if(b[c.isoWeekday()]===m&&h++,d==h+b[c.isoWeekday()]){t=c;break}c.add(1,"d")}else if(e.match(/^\d+m\d+$/i))for(var u=e.match(/\d+$/);u>0;u--){var v=y()(t.format("YYYY-MM-")+u,"YYYY-MM-DD");if(y.a.isMoment(v)&&v.isValid()){t=v;break}}return n&&(t=function(e,t){for(var a=e.month(),n=e.clone();!t(e);)e.add(1,"d");if(a!=e.month())for(e=n;!t(e);)e.subtract(1,"d");return e}(t,a)),t}return e},N="YYYY-MM-01",M=["January","February","March","April","May","June","July","August","September","October","November","December"],Y=function(e){function t(e){var a,n,r;return Object(o.a)(this,t),a=Object(d.a)(this,Object(c.a)(t).call(this,e)),n=void 0===e.dateFormat?"YYYY-MM-DD":e.dateFormat,r=void 0===e.defaultValue?y()():y()(e.defaultValue,e.dateFormat),void 0===e.baseDate?y()():y()(e.baseDate,e.dateFormat),a.state={dateFormat:n,value:r.format(n),macro:"",calender:r.format(N),open:!1},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"nextMonth",value:function(e){var t=y()(this.state.calender,N);t=t.add(1,"months"),this.setState({calender:t.format(N)})}},{key:"prevMonth",value:function(e){var t=y()(this.state.calender,N);t=t.subtract(1,"months"),this.setState({calender:t.format(N)})}},{key:"selectedDate",value:function(e){var t=y()(e.currentTarget.id,this.state.dateFormat);this.setState({value:t.format(this.state.dateFormat),calender:t.format(N),macro:""})}},{key:"monthSelected",value:function(e){y()(e.currentTarget.value,N);this.setState({calender:e.currentTarget.value})}},{key:"doClickCalendar",value:function(){this.setState({open:!this.state.open})}},{key:"handleInputChange",value:function(e){var t=e.target.value;if("string"===typeof t&&t.match(/^\d{4}-\d{2}-\d{2}$/)){var a=y()(t,this.state.dateFormat);this.setState({value:a.format(this.state.dateFormat),calender:a.format(N),macro:""})}else this.setState({value:e.target.value})}},{key:"handleKeyPress",value:function(e){console.log("key:"+e.key);var t,a=this.state.value,n=void 0===this.props.macro2date?k:this.props.macro2date,r=void 0===this.props.isBizDate?E:this.props.isBizDate;"Enter"==e.key?(t=n(a,y()(this.state.baseDate,this.state.defaultFormat),r),y.a.isMoment(t)?this.setState({value:t.format(this.state.dateFormat),calender:t.format(N),macro:a}):this.setState({value:a})):"string"===typeof a&&a.match(/^\d{4}-\d{2}-\d{2}$/)&&(t=y()(a,this.state.dateFormat),this.setState({value:t.format(this.state.dateFormat),calender:t.format(N),macro:""}))}},{key:"handleBlur",value:function(e){var t=void 0===this.props.macro2date?k:this.props.macro2date,a=void 0===this.props.isBizDate?E:this.props.isBizDate,n=this.state.value,r=t(n,y()(this.state.baseDate,this.state.defaultFormat),a);"string"===typeof n&&n.match(/^\d{4}-\d{2}-\d{2}$/)&&(r=y()(n,this.state.dateFormat),n=""),y.a.isMoment(r)?this.setState({value:r.format(this.state.dateFormat),calender:r.format(N),macro:n}):this.setState({value:n})}},{key:"renderCalendar",value:function(){var e,t=this,a=y()(this.state.calender,this.state.dateFormat),n=void 0===this.props.isBizDate?E:this.props.isBizDate;e=r.a.createElement("div",{className:"header"},r.a.createElement("div",{className:"hcell"},"Su"),r.a.createElement("div",{className:"hcell"},"Mo"),r.a.createElement("div",{className:"hcell"},"Tu"),r.a.createElement("div",{className:"hcell"},"We"),r.a.createElement("div",{className:"hcell"},"Th"),r.a.createElement("div",{className:"hcell"},"Fr"),r.a.createElement("div",{className:"hcell"},"Sa"));var s=[],i=a.clone();i.subtract(3,"months");for(var o=0;o<12;o++)s[o]=i.clone(),i=i.add(1,"months");for(var l,d=s.map(function(e){return r.a.createElement("option",{value:e.format(N)},M[e.month()]+" "+e.year())}),c=a.startOf("month"),m=c.month();0!=c.day();)c=c.subtract(1,"days");for(var h=[],v=0;v<42;v++)h[v]=c.clone(),c.add(1,"days");l=h.map(function(e){var a="rcell";return n(e)||(a+=" off"),m!=e.month()&&(a+=" not-this-month"),e.format(t.state.dateFormat)===t.state.value&&(a+=" selected-date"),r.a.createElement("div",{className:a,id:e.format(t.state.dateFormat),onClick:t.selectedDate.bind(t)},e.format("D"))});var p=this.state.calender;return r.a.createElement("div",{className:"calender",id:"calender"},r.a.createElement("div",{className:"control"},r.a.createElement("div",{className:"button-prev",onClick:this.prevMonth.bind(this)},r.a.createElement("img",{src:u.a,className:"arrow",alt:"previous month"})),r.a.createElement("select",{name:"select-month",value:p,onChange:this.monthSelected.bind(this)},d),r.a.createElement("div",{className:"button-next",onClick:this.nextMonth.bind(this)},r.a.createElement("img",{src:f.a,className:"arrow",alt:"next month"}))),r.a.createElement("div",{className:"main"},e,l))}},{key:"handleOnFocus",value:function(e){this.props.openOnFocus&&this.doClickCalendar()}},{key:"renderDateInput",value:function(){return r.a.createElement("div",{className:"field-component"},r.a.createElement("div",{className:"input-field-box"},r.a.createElement("input",{type:"text",className:"input-field",onKeyPress:this.handleKeyPress.bind(this),onBlur:this.handleBlur.bind(this),onFocus:this.handleOnFocus.bind(this),onChange:this.handleInputChange.bind(this),value:this.state.value})),r.a.createElement("div",{className:"button-open",onClick:this.doClickCalendar.bind(this)},"O"))}},{key:"render",value:function(){var e,t;return e=this.renderDateInput(),this.state.open&&(t=this.renderCalendar()),r.a.createElement("div",{className:"calender-input-field"},e,t)}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var D=r.a.createElement("div",{className:"title"},"Macro Date Input"),F=r.a.createElement("div",{className:"sample"},r.a.createElement(Y,{isBizDate:function(e){var t="MM/DD/YYYY",a={};if(a["01/01/2019"]=y()("01/01/2019",t),a["01/14/2019"]=y()("01/14/2019",t),a["02/11/2019"]=y()("02/11/2019",t),a["03/21/2019"]=y()("03/21/2019",t),a["04/29/2019"]=y()("04/29/2019",t),a["04/30/2019"]=y()("04/30/2019",t),a["05/01/2019"]=y()("05/01/2019",t),a["05/02/2019"]=y()("05/02/2019",t),a["05/03/2019"]=y()("05/03/2019",t),a["05/06/2019"]=y()("05/06/2019",t),a["07/15/2019"]=y()("07/15/2019",t),a["08/12/2019"]=y()("08/12/2019",t),a["09/16/2019"]=y()("09/16/2019",t),a["09/23/2019"]=y()("09/23/2019",t),a["10/14/2019"]=y()("10/14/2019",t),a["10/22/2019"]=y()("10/22/2019",t),a["11/04/2019"]=y()("11/04/2019",t),a["11/23/2019"]=y()("11/23/2019",t),y.a.isMoment(e)){if(7===e.isoWeekday()||6===e.isoWeekday())return!1;if(a[e.format(t)])return!1}return!0}})),g=r.a.createElement("div",{className:"descr"},"This function resolves a macro if it contains, for example;",r.a.createElement("li",null,"2d -> 2 days"),r.a.createElement("li",null,"2bd -> 2 bisiness days"),r.a.createElement("li",null,"2m -> the month after next month"),r.a.createElement("li",null,"2m2tu -> the second Tuesday of the month after next month"),r.a.createElement("li",null,"2m2 -> the second day of the month after next month"),r.a.createElement("li",null,"1m31 -> the last day of the next month"),'Also it accepts noAdj option. The default behavior is it escapes holidays, Saturday or Sunday. This option disable this default behavior. For example, "2m2tu noAdj".');i.a.render(r.a.createElement("div",{className:"main"},D,F,g),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[11,1,2]]]);
//# sourceMappingURL=main.e9573eea.chunk.js.map