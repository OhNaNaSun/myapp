var Zepto=function(){function t(t){return null==t?t+"":U[J.call(t)]||"object"}function e(e){return"function"==t(e)}function n(t){return null!=t&&t==t.window}function r(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function i(e){return"object"==t(e)}function o(t){return i(t)&&!n(t)&&Object.getPrototypeOf(t)==Object.prototype}function a(t){return"number"==typeof t.length}function s(t){return P.call(t,function(t){return null!=t})}function u(t){return t.length>0?j.fn.concat.apply([],t):t}function c(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function l(t){return t in $?$[t]:$[t]=RegExp("(^|\\s)"+t+"(\\s|$)")}function f(t,e){return"number"!=typeof e||D[c(t)]?e:e+"px"}function h(t){var e,n;return L[t]||(e=A.createElement(t),A.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),L[t]=n),L[t]}function p(t){return"children"in t?O.call(t.children):j.map(t.childNodes,function(t){return 1==t.nodeType?t:w})}function d(t,e,n){for(E in e)n&&(o(e[E])||G(e[E]))?(o(e[E])&&!o(t[E])&&(t[E]={}),G(e[E])&&!G(t[E])&&(t[E]=[]),d(t[E],e[E],n)):e[E]!==w&&(t[E]=e[E])}function m(t,e){return null==e?j(t):j(t).filter(e)}function g(t,n,r,i){return e(n)?n.call(t,r,i):n}function v(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function y(t,e){var n=t.className||"",r=n&&n.baseVal!==w;return e===w?r?n.baseVal:n:(r?n.baseVal=e:t.className=e,w)}function x(t){var e;try{return t?"true"==t||("false"==t?!1:"null"==t?null:/^0/.test(t)||isNaN(e=Number(t))?/^[\[\{]/.test(t)?j.parseJSON(t):t:e):t}catch(n){return t}}function b(t,e){e(t);for(var n=0,r=t.childNodes.length;r>n;n++)b(t.childNodes[n],e)}var w,E,j,T,N,C,S=[],O=S.slice,P=S.filter,A=window.document,L={},$={},D={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},R=/^\s*<(\w+|!)[^>]*>/,M=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,Z=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,k=/^(?:body|html)$/i,z=/([A-Z])/g,F=["val","css","html","text","data","width","height","offset"],_=["after","prepend","before","append"],q=A.createElement("table"),H=A.createElement("tr"),I={tr:A.createElement("tbody"),tbody:q,thead:q,tfoot:q,td:H,th:H,"*":A.createElement("div")},V=/complete|loaded|interactive/,B=/^[\w-]*$/,U={},J=U.toString,X={},W=A.createElement("div"),Y={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},G=Array.isArray||function(t){return t instanceof Array};return X.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var r,i=t.parentNode,o=!i;return o&&(i=W).appendChild(t),r=~X.qsa(i,e).indexOf(t),o&&W.removeChild(t),r},N=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},C=function(t){return P.call(t,function(e,n){return t.indexOf(e)==n})},X.fragment=function(t,e,n){var r,i,a;return M.test(t)&&(r=j(A.createElement(RegExp.$1))),r||(t.replace&&(t=t.replace(Z,"<$1></$2>")),e===w&&(e=R.test(t)&&RegExp.$1),e in I||(e="*"),a=I[e],a.innerHTML=""+t,r=j.each(O.call(a.childNodes),function(){a.removeChild(this)})),o(n)&&(i=j(r),j.each(n,function(t,e){F.indexOf(t)>-1?i[t](e):i.attr(t,e)})),r},X.Z=function(t,e){return t=t||[],t.__proto__=j.fn,t.selector=e||"",t},X.isZ=function(t){return t instanceof X.Z},X.init=function(t,n){var r;if(!t)return X.Z();if("string"==typeof t)if(t=t.trim(),"<"==t[0]&&R.test(t))r=X.fragment(t,RegExp.$1,n),t=null;else{if(n!==w)return j(n).find(t);r=X.qsa(A,t)}else{if(e(t))return j(A).ready(t);if(X.isZ(t))return t;if(G(t))r=s(t);else if(i(t))r=[t],t=null;else if(R.test(t))r=X.fragment(t.trim(),RegExp.$1,n),t=null;else{if(n!==w)return j(n).find(t);r=X.qsa(A,t)}}return X.Z(r,t)},j=function(t,e){return X.init(t,e)},j.extend=function(t){var e,n=O.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){d(t,n,e)}),t},X.qsa=function(t,e){var n,i="#"==e[0],o=!i&&"."==e[0],a=i||o?e.slice(1):e,s=B.test(a);return r(t)&&s&&i?(n=t.getElementById(a))?[n]:[]:1!==t.nodeType&&9!==t.nodeType?[]:O.call(s&&!i?o?t.getElementsByClassName(a):t.getElementsByTagName(e):t.querySelectorAll(e))},j.contains=A.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){for(;e&&(e=e.parentNode);)if(e===t)return!0;return!1},j.type=t,j.isFunction=e,j.isWindow=n,j.isArray=G,j.isPlainObject=o,j.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},j.inArray=function(t,e,n){return S.indexOf.call(e,t,n)},j.camelCase=N,j.trim=function(t){return null==t?"":String.prototype.trim.call(t)},j.uuid=0,j.support={},j.expr={},j.map=function(t,e){var n,r,i,o=[];if(a(t))for(r=0;t.length>r;r++)n=e(t[r],r),null!=n&&o.push(n);else for(i in t)n=e(t[i],i),null!=n&&o.push(n);return u(o)},j.each=function(t,e){var n,r;if(a(t)){for(n=0;t.length>n;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(r in t)if(e.call(t[r],r,t[r])===!1)return t;return t},j.grep=function(t,e){return P.call(t,e)},window.JSON&&(j.parseJSON=JSON.parse),j.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){U["[object "+e+"]"]=e.toLowerCase()}),j.fn={forEach:S.forEach,reduce:S.reduce,push:S.push,sort:S.sort,indexOf:S.indexOf,concat:S.concat,map:function(t){return j(j.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return j(O.apply(this,arguments))},ready:function(t){return V.test(A.readyState)&&A.body?t(j):A.addEventListener("DOMContentLoaded",function(){t(j)},!1),this},get:function(t){return t===w?O.call(this):this[t>=0?t:t+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return S.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return e(t)?this.not(this.not(t)):j(P.call(this,function(e){return X.matches(e,t)}))},add:function(t,e){return j(C(this.concat(j(t,e))))},is:function(t){return this.length>0&&X.matches(this[0],t)},not:function(t){var n=[];if(e(t)&&t.call!==w)this.each(function(e){t.call(this,e)||n.push(this)});else{var r="string"==typeof t?this.filter(t):a(t)&&e(t.item)?O.call(t):j(t);this.forEach(function(t){0>r.indexOf(t)&&n.push(t)})}return j(n)},has:function(t){return this.filter(function(){return i(t)?j.contains(this,t):j(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!i(t)?t:j(t)},last:function(){var t=this[this.length-1];return t&&!i(t)?t:j(t)},find:function(t){var e,n=this;return e=t?"object"==typeof t?j(t).filter(function(){var t=this;return S.some.call(n,function(e){return j.contains(e,t)})}):1==this.length?j(X.qsa(this[0],t)):this.map(function(){return X.qsa(this,t)}):[]},closest:function(t,e){var n=this[0],i=!1;for("object"==typeof t&&(i=j(t));n&&!(i?i.indexOf(n)>=0:X.matches(n,t));)n=n!==e&&!r(n)&&n.parentNode;return j(n)},parents:function(t){for(var e=[],n=this;n.length>0;)n=j.map(n,function(t){return(t=t.parentNode)&&!r(t)&&0>e.indexOf(t)?(e.push(t),t):w});return m(e,t)},parent:function(t){return m(C(this.pluck("parentNode")),t)},children:function(t){return m(this.map(function(){return p(this)}),t)},contents:function(){return this.map(function(){return O.call(this.childNodes)})},siblings:function(t){return m(this.map(function(t,e){return P.call(p(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return j.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=h(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var n=e(t);if(this[0]&&!n)var r=j(t).get(0),i=r.parentNode||this.length>1;return this.each(function(e){j(this).wrapAll(n?t.call(this,e):i?r.cloneNode(!0):r)})},wrapAll:function(t){if(this[0]){j(this[0]).before(t=j(t));for(var e;(e=t.children()).length;)t=e.first();j(t).append(this)}return this},wrapInner:function(t){var n=e(t);return this.each(function(e){var r=j(this),i=r.contents(),o=n?t.call(this,e):t;i.length?i.wrapAll(o):r.append(o)})},unwrap:function(){return this.parent().each(function(){j(this).replaceWith(j(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(t){return this.each(function(){var e=j(this);(t===w?"none"==e.css("display"):t)?e.show():e.hide()})},prev:function(t){return j(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return j(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(e){var n=this.innerHTML;j(this).empty().append(g(this,t,e,n))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(e){var n=g(this,t,e,this.textContent);this.textContent=null==n?"":""+n}):0 in this?this[0].textContent:null},attr:function(t,e){var n;return"string"!=typeof t||1 in arguments?this.each(function(n){if(1===this.nodeType)if(i(t))for(E in t)v(this,E,t[E]);else v(this,t,g(this,e,n,this.getAttribute(t)))}):this.length&&1===this[0].nodeType?!(n=this[0].getAttribute(t))&&t in this[0]?this[0][t]:n:w},removeAttr:function(t){return this.each(function(){1===this.nodeType&&v(this,t)})},prop:function(t,e){return t=Y[t]||t,1 in arguments?this.each(function(n){this[t]=g(this,e,n,this[t])}):this[0]&&this[0][t]},data:function(t,e){var n="data-"+t.replace(z,"-$1").toLowerCase(),r=1 in arguments?this.attr(n,e):this.attr(n);return null!==r?x(r):w},val:function(t){return 0 in arguments?this.each(function(e){this.value=g(this,t,e,this.value)}):this[0]&&(this[0].multiple?j(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(t){if(t)return this.each(function(e){var n=j(this),r=g(this,t,e,n.offset()),i=n.offsetParent().offset(),o={top:r.top-i.top,left:r.left-i.left};"static"==n.css("position")&&(o.position="relative"),n.css(o)});if(!this.length)return null;var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(e,n){if(2>arguments.length){var r=this[0],i=getComputedStyle(r,"");if(!r)return;if("string"==typeof e)return r.style[N(e)]||i.getPropertyValue(e);if(G(e)){var o={};return j.each(e,function(t,e){o[e]=r.style[N(e)]||i.getPropertyValue(e)}),o}}var a="";if("string"==t(e))n||0===n?a=c(e)+":"+f(e,n):this.each(function(){this.style.removeProperty(c(e))});else for(E in e)e[E]||0===e[E]?a+=c(E)+":"+f(E,e[E])+";":this.each(function(){this.style.removeProperty(c(E))});return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(j(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?S.some.call(this,function(t){return this.test(y(t))},l(t)):!1},addClass:function(t){return t?this.each(function(e){if("className"in this){T=[];var n=y(this),r=g(this,t,e,n);r.split(/\s+/g).forEach(function(t){j(this).hasClass(t)||T.push(t)},this),T.length&&y(this,n+(n?" ":"")+T.join(" "))}}):this},removeClass:function(t){return this.each(function(e){if("className"in this){if(t===w)return y(this,"");T=y(this),g(this,t,e,T).split(/\s+/g).forEach(function(t){T=T.replace(l(t)," ")}),y(this,T.trim())}})},toggleClass:function(t,e){return t?this.each(function(n){var r=j(this),i=g(this,t,n,y(this));i.split(/\s+/g).forEach(function(t){(e===w?!r.hasClass(t):e)?r.addClass(t):r.removeClass(t)})}):this},scrollTop:function(t){if(this.length){var e="scrollTop"in this[0];return t===w?e?this[0].scrollTop:this[0].pageYOffset:this.each(e?function(){this.scrollTop=t}:function(){this.scrollTo(this.scrollX,t)})}},scrollLeft:function(t){if(this.length){var e="scrollLeft"in this[0];return t===w?e?this[0].scrollLeft:this[0].pageXOffset:this.each(e?function(){this.scrollLeft=t}:function(){this.scrollTo(t,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),n=this.offset(),r=k.test(e[0].nodeName)?{top:0,left:0}:e.offset();return n.top-=parseFloat(j(t).css("margin-top"))||0,n.left-=parseFloat(j(t).css("margin-left"))||0,r.top+=parseFloat(j(e[0]).css("border-top-width"))||0,r.left+=parseFloat(j(e[0]).css("border-left-width"))||0,{top:n.top-r.top,left:n.left-r.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||A.body;t&&!k.test(t.nodeName)&&"static"==j(t).css("position");)t=t.offsetParent;return t})}},j.fn.detach=j.fn.remove,["width","height"].forEach(function(t){var e=t.replace(/./,function(t){return t[0].toUpperCase()});j.fn[t]=function(i){var o,a=this[0];return i===w?n(a)?a["inner"+e]:r(a)?a.documentElement["scroll"+e]:(o=this.offset())&&o[t]:this.each(function(e){a=j(this),a.css(t,g(this,i,e,a[t]()))})}}),_.forEach(function(e,n){var r=n%2;j.fn[e]=function(){var e,i,o=j.map(arguments,function(n){return e=t(n),"object"==e||"array"==e||null==n?n:X.fragment(n)}),a=this.length>1;return 1>o.length?this:this.each(function(t,e){i=r?e:e.parentNode,e=0==n?e.nextSibling:1==n?e.firstChild:2==n?e:null;var s=j.contains(A.documentElement,i);o.forEach(function(t){if(a)t=t.cloneNode(!0);else if(!i)return j(t).remove();i.insertBefore(t,e),s&&b(t,function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},j.fn[r?e+"To":"insert"+(n?"Before":"After")]=function(t){return j(t)[e](this),this}}),X.Z.prototype=j.fn,X.uniq=C,X.deserializeValue=x,j.zepto=X,j}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){function e(e,n,r){var i=t.Event(n);return t(e).trigger(i,r),!i.isDefaultPrevented()}function n(t,n,r,i){return t.global?e(n||y,r,i):void 0}function r(e){e.global&&0===t.active++&&n(e,null,"ajaxStart")}function i(e){e.global&&!--t.active&&n(e,null,"ajaxStop")}function o(t,e){var r=e.context;return e.beforeSend.call(r,t,e)===!1||n(e,r,"ajaxBeforeSend",[t,e])===!1?!1:(n(e,r,"ajaxSend",[t,e]),void 0)}function a(t,e,r,i){var o=r.context,a="success";r.success.call(o,t,a,e),i&&i.resolveWith(o,[t,a,e]),n(r,o,"ajaxSuccess",[e,r,t]),u(a,e,r)}function s(t,e,r,i,o){var a=i.context;i.error.call(a,r,e,t),o&&o.rejectWith(a,[r,e,t]),n(i,a,"ajaxError",[r,i,t||e]),u(e,r,i)}function u(t,e,r){var o=r.context;r.complete.call(o,e,t),n(r,o,"ajaxComplete",[e,r]),i(r)}function c(){}function l(t){return t&&(t=t.split(";",2)[0]),t&&(t==j?"html":t==E?"json":b.test(t)?"script":w.test(t)&&"xml")||"text"}function f(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function h(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=f(e.url,e.data),e.data=void 0)}function p(e,n,r,i){return t.isFunction(n)&&(i=r,r=n,n=void 0),t.isFunction(r)||(i=r,r=void 0),{url:e,data:n,success:r,dataType:i}}function d(e,n,r,i){var o,a=t.isArray(n),s=t.isPlainObject(n);t.each(n,function(n,u){o=t.type(u),i&&(n=r?i:i+"["+(s||"object"==o||"array"==o?n:"")+"]"),!i&&a?e.add(u.name,u.value):"array"==o||!r&&"object"==o?d(e,u,r,n):e.add(n,u)})}var m,g,v=0,y=window.document,x=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,b=/^(?:text|application)\/javascript/i,w=/^(?:text|application)\/xml/i,E="application/json",j="text/html",T=/^\s*$/;t.active=0,t.ajaxJSONP=function(e,n){if(!("type"in e))return t.ajax(e);var r,i,u=e.jsonpCallback,c=(t.isFunction(u)?u():u)||"jsonp"+ ++v,l=y.createElement("script"),f=window[c],h=function(e){t(l).triggerHandler("error",e||"abort")},p={abort:h};return n&&n.promise(p),t(l).on("load error",function(o,u){clearTimeout(i),t(l).off().remove(),"error"!=o.type&&r?a(r[0],p,e,n):s(null,u||"error",p,e,n),window[c]=f,r&&t.isFunction(f)&&f(r[0]),f=r=void 0}),o(p,e)===!1?(h("abort"),p):(window[c]=function(){r=arguments},l.src=e.url.replace(/\?(.+)=\?/,"?$1="+c),y.head.appendChild(l),e.timeout>0&&(i=setTimeout(function(){h("timeout")},e.timeout)),p)},t.ajaxSettings={type:"GET",beforeSend:c,success:c,error:c,complete:c,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:E,xml:"application/xml, text/xml",html:j,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(e){var n=t.extend({},e||{}),i=t.Deferred&&t.Deferred();for(m in t.ajaxSettings)void 0===n[m]&&(n[m]=t.ajaxSettings[m]);r(n),n.crossDomain||(n.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(n.url)&&RegExp.$2!=window.location.host),n.url||(n.url=""+window.location),h(n);var u=n.dataType,p=/\?.+=\?/.test(n.url);if(p&&(u="jsonp"),n.cache!==!1&&(e&&e.cache===!0||"script"!=u&&"jsonp"!=u)||(n.url=f(n.url,"_="+Date.now())),"jsonp"==u)return p||(n.url=f(n.url,n.jsonp?n.jsonp+"=?":n.jsonp===!1?"":"callback=?")),t.ajaxJSONP(n,i);var d,v=n.accepts[u],y={},x=function(t,e){y[t.toLowerCase()]=[t,e]},b=/^([\w-]+:)\/\//.test(n.url)?RegExp.$1:window.location.protocol,w=n.xhr(),E=w.setRequestHeader;if(i&&i.promise(w),n.crossDomain||x("X-Requested-With","XMLHttpRequest"),x("Accept",v||"*/*"),(v=n.mimeType||v)&&(v.indexOf(",")>-1&&(v=v.split(",",2)[0]),w.overrideMimeType&&w.overrideMimeType(v)),(n.contentType||n.contentType!==!1&&n.data&&"GET"!=n.type.toUpperCase())&&x("Content-Type",n.contentType||"application/x-www-form-urlencoded"),n.headers)for(g in n.headers)x(g,n.headers[g]);if(w.setRequestHeader=x,w.onreadystatechange=function(){if(4==w.readyState){w.onreadystatechange=c,clearTimeout(d);var e,r=!1;if(w.status>=200&&300>w.status||304==w.status||0==w.status&&"file:"==b){u=u||l(n.mimeType||w.getResponseHeader("content-type")),e=w.responseText;try{"script"==u?(1,eval)(e):"xml"==u?e=w.responseXML:"json"==u&&(e=T.test(e)?null:t.parseJSON(e))}catch(o){r=o}r?s(r,"parsererror",w,n,i):a(e,w,n,i)}else s(w.statusText||null,w.status?"error":"abort",w,n,i)}},o(w,n)===!1)return w.abort(),s(null,"abort",w,n,i),w;if(n.xhrFields)for(g in n.xhrFields)w[g]=n.xhrFields[g];var j="async"in n?n.async:!0;w.open(n.type,n.url,j,n.username,n.password);for(g in y)E.apply(w,y[g]);return n.timeout>0&&(d=setTimeout(function(){w.onreadystatechange=c,w.abort(),s(null,"timeout",w,n,i)},n.timeout)),w.send(n.data?n.data:null),w},t.get=function(){return t.ajax(p.apply(null,arguments))},t.post=function(){var e=p.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=p.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,r){if(!this.length)return this;var i,o=this,a=e.split(/\s/),s=p(e,n,r),u=s.success;return a.length>1&&(s.url=a[0],i=a[1]),s.success=function(e){o.html(i?t("<div>").html(e.replace(x,"")).find(i):e),u&&u.apply(o,arguments)},t.ajax(s),this};var N=encodeURIComponent;t.param=function(t,e){var n=[];return n.add=function(t,e){this.push(N(t)+"="+N(e))},d(n,t,e),n.join("&").replace(/%20/g,"+")}}(Zepto),function(t){function e(t){return t._zid||(t._zid=h++)}function n(t,n,o,a){if(n=r(n),n.ns)var s=i(n.ns);return(g[e(t)]||[]).filter(function(t){return!(!t||n.e&&t.e!=n.e||n.ns&&!s.test(t.ns)||o&&e(t.fn)!==e(o)||a&&t.sel!=a)})}function r(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function i(t){return RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function o(t,e){return t.del&&!y&&t.e in x||!!e}function a(t){return b[t]||y&&x[t]||t}function s(n,i,s,u,l,h,p){var d=e(n),m=g[d]||(g[d]=[]);i.split(/\s/).forEach(function(e){if("ready"==e)return t(document).ready(s);var i=r(e);i.fn=s,i.sel=l,i.e in b&&(s=function(e){var n=e.relatedTarget;return!n||n!==this&&!t.contains(this,n)?i.fn.apply(this,arguments):f}),i.del=h;var d=h||s;i.proxy=function(t){if(t=c(t),!t.isImmediatePropagationStopped()){t.data=u;var e=d.apply(n,t._args==f?[t]:[t].concat(t._args));return e===!1&&(t.preventDefault(),t.stopPropagation()),e}},i.i=m.length,m.push(i),"addEventListener"in n&&n.addEventListener(a(i.e),i.proxy,o(i,p))})}function u(t,r,i,s,u){var c=e(t);(r||"").split(/\s/).forEach(function(e){n(t,e,i,s).forEach(function(e){delete g[c][e.i],"removeEventListener"in t&&t.removeEventListener(a(e.e),e.proxy,o(e,u))})})}function c(e,n){return(n||!e.isDefaultPrevented)&&(n||(n=e),t.each(T,function(t,r){var i=n[t];e[t]=function(){return this[r]=w,i&&i.apply(n,arguments)},e[r]=E}),(n.defaultPrevented!==f?n.defaultPrevented:"returnValue"in n?n.returnValue===!1:n.getPreventDefault&&n.getPreventDefault())&&(e.isDefaultPrevented=w)),e}function l(t){var e,n={originalEvent:t};for(e in t)j.test(e)||t[e]===f||(n[e]=t[e]);return c(n,t)}var f,h=1,p=Array.prototype.slice,d=t.isFunction,m=function(t){return"string"==typeof t},g={},v={},y="onfocusin"in window,x={focus:"focusin",blur:"focusout"},b={mouseenter:"mouseover",mouseleave:"mouseout"};v.click=v.mousedown=v.mouseup=v.mousemove="MouseEvents",t.event={add:s,remove:u},t.proxy=function(n,r){var i=2 in arguments&&p.call(arguments,2);if(d(n)){var o=function(){return n.apply(r,i?i.concat(p.call(arguments)):arguments)};return o._zid=e(n),o}if(m(r))return i?(i.unshift(n[r],n),t.proxy.apply(null,i)):t.proxy(n[r],n);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,r){return this.on(t,e,n,r,1)};var w=function(){return!0},E=function(){return!1},j=/^([A-Z]|returnValue$|layer[XY]$)/,T={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,n,r,i,o){var a,c,h=this;return e&&!m(e)?(t.each(e,function(t,e){h.on(t,n,r,e,o)}),h):(m(n)||d(i)||i===!1||(i=r,r=n,n=f),(d(r)||r===!1)&&(i=r,r=f),i===!1&&(i=E),h.each(function(h,d){o&&(a=function(t){return u(d,t.type,i),i.apply(this,arguments)}),n&&(c=function(e){var r,o=t(e.target).closest(n,d).get(0);return o&&o!==d?(r=t.extend(l(e),{currentTarget:o,liveFired:d}),(a||i).apply(o,[r].concat(p.call(arguments,1)))):f}),s(d,e,i,r,n,c||a)}))},t.fn.off=function(e,n,r){var i=this;return e&&!m(e)?(t.each(e,function(t,e){i.off(t,n,e)}),i):(m(n)||d(r)||r===!1||(r=n,n=f),r===!1&&(r=E),i.each(function(){u(this,e,r,n)}))},t.fn.trigger=function(e,n){return e=m(e)||t.isPlainObject(e)?t.Event(e):c(e),e._args=n,this.each(function(){"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,r){var i,o;return this.each(function(a,s){i=l(m(e)?t.Event(e):e),i._args=r,i.target=s,t.each(n(s,e.type||e),function(t,e){return o=e.proxy(i),i.isImmediatePropagationStopped()?!1:f})}),o},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return t?this.bind(e,t):this.trigger(e)}}),["focus","blur"].forEach(function(e){t.fn[e]=function(t){return t?this.bind(e,t):this.each(function(){try{this[e]()}catch(t){}}),this}}),t.Event=function(t,e){m(t)||(e=t,t=e.type);var n=document.createEvent(v[t]||"Events"),r=!0;if(e)for(var i in e)"bubbles"==i?r=!!e[i]:n[i]=e[i];return n.initEvent(t,r,!0),c(n)}}(Zepto),function(t){t.fn.serializeArray=function(){var e,n,r=[];return t([].slice.call(this.get(0).elements)).each(function(){e=t(this),n=e.attr("type"),this.name&&"fieldset"!=this.nodeName.toLowerCase()&&!this.disabled&&"submit"!=n&&"reset"!=n&&"button"!=n&&("radio"!=n&&"checkbox"!=n||this.checked)&&r.push({name:e.attr("name"),value:e.val()})}),r},t.fn.serialize=function(){var t=[];return this.serializeArray().forEach(function(e){t.push(encodeURIComponent(e.name)+"="+encodeURIComponent(e.value))}),t.join("&")},t.fn.submit=function(e){if(e)this.bind("submit",e);else if(this.length){var n=t.Event("submit");this.eq(0).trigger(n),n.isDefaultPrevented()||this.get(0).submit()}return this}}(Zepto);

// 添加 animate 动画效果控制库
//     Zepto.js
//     (c) 2010-2015 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

;(function($, undefined){
  var prefix = '', eventPrefix,
    vendors = { Webkit: 'webkit', Moz: '', O: 'o' },
    testEl = document.createElement('div'),
    supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
    transform,
    transitionProperty, transitionDuration, transitionTiming, transitionDelay,
    animationName, animationDuration, animationTiming, animationDelay,
    cssReset = {}

  function dasherize(str) { return str.replace(/([a-z])([A-Z])/, '$1-$2').toLowerCase() }
  function normalizeEvent(name) { return eventPrefix ? eventPrefix + name : name.toLowerCase() }

  $.each(vendors, function(vendor, event){
    if (testEl.style[vendor + 'TransitionProperty'] !== undefined) {
      prefix = '-' + vendor.toLowerCase() + '-'
      eventPrefix = event
      return false
    }
  })

  transform = prefix + 'transform'
  cssReset[transitionProperty = prefix + 'transition-property'] =
  cssReset[transitionDuration = prefix + 'transition-duration'] =
  cssReset[transitionDelay    = prefix + 'transition-delay'] =
  cssReset[transitionTiming   = prefix + 'transition-timing-function'] =
  cssReset[animationName      = prefix + 'animation-name'] =
  cssReset[animationDuration  = prefix + 'animation-duration'] =
  cssReset[animationDelay     = prefix + 'animation-delay'] =
  cssReset[animationTiming    = prefix + 'animation-timing-function'] = ''

  $.fx = {
    off: (eventPrefix === undefined && testEl.style.transitionProperty === undefined),
    speeds: { _default: 400, fast: 200, slow: 600 },
    cssPrefix: prefix,
    transitionEnd: normalizeEvent('TransitionEnd'),
    animationEnd: normalizeEvent('AnimationEnd')
  }

  $.fn.animate = function(properties, duration, ease, callback, delay){
    if ($.isFunction(duration))
      callback = duration, ease = undefined, duration = undefined
    if ($.isFunction(ease))
      callback = ease, ease = undefined
    if ($.isPlainObject(duration))
      ease = duration.easing, callback = duration.complete, delay = duration.delay, duration = duration.duration
    if (duration) duration = (typeof duration == 'number' ? duration :
                    ($.fx.speeds[duration] || $.fx.speeds._default)) / 1000
    if (delay) delay = parseFloat(delay) / 1000
    return this.anim(properties, duration, ease, callback, delay)
  }

  $.fn.anim = function(properties, duration, ease, callback, delay){
    var key, cssValues = {}, cssProperties, transforms = '',
        that = this, wrappedCallback, endEvent = $.fx.transitionEnd,
        fired = false

    if (duration === undefined) duration = $.fx.speeds._default / 1000
    if (delay === undefined) delay = 0
    if ($.fx.off) duration = 0

    if (typeof properties == 'string') {
      // keyframe animation
      cssValues[animationName] = properties
      cssValues[animationDuration] = duration + 's'
      cssValues[animationDelay] = delay + 's'
      cssValues[animationTiming] = (ease || 'linear')
      endEvent = $.fx.animationEnd
    } else {
      cssProperties = []
      // CSS transitions
      for (key in properties)
        if (supportedTransforms.test(key)) transforms += key + '(' + properties[key] + ') '
        else cssValues[key] = properties[key], cssProperties.push(dasherize(key))

      if (transforms) cssValues[transform] = transforms, cssProperties.push(transform)
      if (duration > 0 && typeof properties === 'object') {
        cssValues[transitionProperty] = cssProperties.join(', ')
        cssValues[transitionDuration] = duration + 's'
        cssValues[transitionDelay] = delay + 's'
        cssValues[transitionTiming] = (ease || 'linear')
      }
    }

    wrappedCallback = function(event){
      if (typeof event !== 'undefined') {
        if (event.target !== event.currentTarget) return // makes sure the event didn't bubble from "below"
        $(event.target).unbind(endEvent, wrappedCallback)
      } else
        $(this).unbind(endEvent, wrappedCallback) // triggered by setTimeout

      fired = true
      $(this).css(cssReset)
      callback && callback.call(this)
    }
    if (duration > 0){
      this.bind(endEvent, wrappedCallback)
      // transitionEnd is not always firing on older Android phones
      // so make sure it gets fired
      setTimeout(function(){
        if (fired) return
        wrappedCallback.call(that)
      }, ((duration + delay) * 1000) + 25)
    }

    // trigger page reflow so new elements can animate
    this.size() && this.get(0).clientLeft

    this.css(cssValues)

    if (duration <= 0) setTimeout(function() {
      that.each(function(){ wrappedCallback.call(this) })
    }, 0)

    return this
  }

  testEl = null
})(Zepto)


// 添加图片lazy load 效果库
/*!
 * author:jieyou
 * see https://github.com/jieyou/lazyload
 * part of the code fork from tuupola's https://github.com/tuupola/jquery_lazyload
 */
;(function(factory){
    if(typeof define === 'function' && define.amd){ // AMD
        // you may need to change `define([------>'jquery'<------], factory)` 
        // if you use zepto, change it rely name, such as `define(['zepto'], factory)`
        // if your jquery|zepto lib is in other path, change it such as `define(['lib\jquery.min'], factory)`
        define(['jquery'], factory)
    }else{ // Global
        factory(window.jQuery || window.Zepto)
    }
})(function($,undefined){
    var w = window,
        $window = $(w),
        defaultOptions = {
            // 默认情况下，图像会在出现在屏幕上时被加载。如果你想的图像更早地加载，
            // 可以使用threshold参数。设置threshold为200，将导致图像在它离视窗边缘还有200px时开始加载。
            threshold                   : 0,
            // 在页面滚动后，该插件将所有未加载的图像循环一遍。并在循环检查图像是否在视窗中。默认情况下，
            // 发现第一个位于视窗外的图片时，循环停止。这是基于以下的假设：页面上图像的顺序与它们在HTML代码中的顺序是一致的。
            // 然而对于某些布局，这可能是错误的。你可以通过设置failure_limit参数来控制循环终止的行为（failure_limit参数的数值为最多允许多少张图片被检查出位于视窗外后停止检查循环中剩余未检查的图片）。
            failure_limit               : 0,
            // 指定触发什么事件时，开始加载真实的图片。你可以使用jQuery中已有的事件，如click或mouseover。
            // 你也可以使用自定义的事件如sporty或foobar。当事件是`scroll`或类似事件类型时，还需要检查图像是否已出现在视窗中。
            event                       : 'scroll',
            // 默认情况下插件在等待图片完全加载后调用show()。你可以使用想要的任何效果。下面的代码使用了fadeIn效果。你可以在demo页面中查看该效果。
            effect                      : 'show',
            // 上述效果（`effect`）函数的参数数组。举两个例子，如果`effect`参数设置为`show`且`effect_params`参数设置为[400]，将会调用`$element.show(400)`，
            // 即在400ms后显示图片；如果`effect`参数设置为`fadein`且`effect_params`参数设置为[400,completeFunction]，将会调用`fadein(400,completeFunction)`，即在400ms内渐入显示图片，并在渐入动画完成时调用`completeFunction`。
            effect_params               : null,
            // 你可以将改插件运用在某个容器内，如一个有滚动条的div。只需要传递容器的jQuery对象。我们有在纵向和横向滚动的容器中使用插件的两个demo。
            container                   : w,
            // 默认情况下，图片的真实url被设置在`data-original`属性内，你可以通过修改下面这个值来改变这个属性名
            //（如`url`，这样插件将在`data-url`属性中查找图片的真实地址）注意下面这个值是不用包含`data-`头的。
            data_attribute              : 'original',
            // 当你将图片懒加载技术与`srcset`一起使用时，你不能将`srcset`的值直接写在`srcset`内，否则会导致图片立即加载。
            // 默认情况下，你应该写在属性`data-original-srcset`内，这样lazyload插件会帮你在合适的时候将它的赋值到`srcset`上。
            // 你可以通过修改下面这个值来改变这个属性名。注意下面这个值是不用包含`data-`头的。
            // http://www.webkit.org/demos/srcset/
            data_srcset_attribute       : 'original-srcset',
            // 由于display:none时，jQuery/Zepto中的$(selector).offset().top/left属性始终为0，(http://bugs.jquery.com/ticket/3037)
            // 因此该属性为false并且图片一开始display:none时，由于无法得到该标签距离文档顶部的实际像素数，
            // 图片在一开始就会被加载上来，违背了lazyload的初衷。因此该版本中删掉了该属性。
            // lazyload不会去管display:none的图片，可能会出现当将display:none改变为其它值，图片仍然没有被加载的情况，
            // 但是只要滑动滚轮触发scroll或event中设定的事件，图片还是可以被加载出来的，remove_invisible.html展示了这一场景
            //skip_invisible              : true,
            // 当图片在视窗中出现时回调。`this`指向出现的图片元素的节点，参数为尚未出现的图片的数量和配置参数对象。
            appear                      : emptyFn,
            // 当图片加载完毕时回调。`this`指向出现的图片元素的节点，参数为尚未出现的图片的数量和配置参数对象。
            load                        : emptyFn,
            // 在大多数情况下，页面只能纵向滚动。此时，只需要检查图片的竖直位置是否出现在视图中即可。如果这样做能提高性能。
            // 你可以在只能纵向滚动的页面中将`vertical_only`参数设置为true
            vertical_only               : false,
            // 在参数`event`设置为`scroll`的情况下，除了iOS以外的设备，用户一次滚屏会触发多次scroll事件，
            // 而实际上我们无需在每一次scroll事件中检查图片是否已经出现在视窗中，通过这个参数设置两次检查之间最少的间隔时间，
            // 用来提高性能。当设置为0时，则为没有最少间隔时间，每一次scroll事件触发时都检测
            minimum_interval            : 300,
            // 和上面那个参数相关，iOS设备上，用户一次滚屏只会触发一次scroll事件，于是没有必要规定最小的检查之间的间隔。
            // 设置为false将忽略上面的检查间隔参数`minimum_interval`，设置为true则会处理上面的间隔参数
            use_minimum_interval_in_ios : false,
            // 重写图片的原始url。回调函数中，`this`指向出现的图片元素的节点，参数第一项为当前元素的jQuery|Zepto对象，第二项为当前元素的图片的原始url
            url_rewriter_fn             : emptyFn,
            // 不使用假图片预加载（详见上面“高级”中的“不使用假图片预加载”）
            no_fake_img_loader          : false,
            // 如果一个img元素没有指定src属性，我们使用这个placeholder。
            // https://css-tricks.com/data-uris/
            placeholder_data_img        : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC',
            // for IE6\7 that does not support data image
            placeholder_real_img        : 'http://ditu.baidu.cn/yyfm/lazyload/0.0.1/img/placeholder.png'
            // todo : 将某些属性用global来配置，而不是每次在$(selector).lazyload({})内配置
        },
        isIOS = (/(?:iphone|ipod|ipad).*os/gi).test(navigator.appVersion),
        isIOS5 = isIOS && (/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion),
        type // function

    function emptyFn(){}

    type = (function(){
        var object_prototype_toString = Object.prototype.toString
        return function(obj){
            // todo: compare the speeds of replace string twice or replace a regExp
            return object_prototype_toString.call(obj).replace('[object ','').replace(']','')
        }
    })()

    function belowthefold($element, options){
        var fold
        if(options._$container == $window){
            fold = ('innerHeight' in w ? w.innerHeight : $window.height()) + $window.scrollTop()
        }else{
            fold = options._$container.offset().top + options._$container.height()
        }
        return fold <= $element.offset().top - options.threshold
    }

    function rightoffold($element, options){
        var fold
        if(options._$container == $window){
            // Zepto do not support `$window.scrollLeft()` yet.
            fold = $window.width() + ($.fn.scrollLeft?$window.scrollLeft():w.pageXOffset)
        }else{
            fold = options._$container.offset().left + options._$container.width()
        }
        return fold <= $element.offset().left - options.threshold
    }

    function abovethetop($element, options){
        var fold
        if(options._$container == $window){
            fold = $window.scrollTop()
        }else{
            fold = options._$container.offset().top
        }
        // console.log('abovethetop fold '+ fold)
        // console.log('abovethetop $element.height() '+ $element.height())
        return fold >= $element.offset().top + options.threshold  + $element.height()
    }

    function leftofbegin($element, options){
        var fold
        if(options._$container == $window){
            // Zepto do not support `$window.scrollLeft()` yet.
            fold = $.fn.scrollLeft?$window.scrollLeft():w.pageXOffset
        }else{
            fold = options._$container.offset().left
        }
        return fold >= $element.offset().left + options.threshold + $element.width()
    }

    function checkAppear($elements, options){
        var counter = 0
        $elements.each(function(i,e){
            var $element = $elements.eq(i)
            if(($element.width() <= 0 && $element.height() <= 0) || $element.css('display') === 'none'){
                return
            }
            function appear(){
                $element.trigger('_lazyload_appear')
                // if we found an image we'll load, reset the counter 
                counter = 0
            }
            // If vertical_only is set to true, only check the vertical to decide appear or not
            // In most situations, page can only scroll vertically, set vertical_only to true will improve performance
            if(options.vertical_only){
                if(abovethetop($element, options)){
                    // Nothing. 
                }else if(!belowthefold($element, options)){
                    appear()
                }else{
                    if(++counter > options.failure_limit){
                        return false
                    }
                }
            }else{
                if(abovethetop($element, options) || leftofbegin($element, options)){
                    // Nothing. 
                }else if(!belowthefold($element, options) && !rightoffold($element, options)){
                    appear()
                }else{
                    if(++counter > options.failure_limit){
                        return false
                    }
                }
            }
        })
    }

    // Remove image from array so it is not looped next time. 
    function getUnloadElements($elements){
        return $elements.filter(function(i,e){
            return !$elements.eq(i)._lazyload_loadStarted
        })
    }

    if(!$.fn.hasOwnProperty('lazyload')){

        $.fn.lazyload = function(options){
            var $elements = this,
                isScrollEvent,
                isScrollTypeEvent,
                scrollTimer = null,
                hasMinimumInterval

            if(!$.isPlainObject(options)){
                options = {}
            }

            $.each(defaultOptions,function(k,v){
                if($.inArray(k,['threshold','failure_limit','minimum_interval']) != -1){ // these params can be a string
                    if(type(options[k]) == 'String'){
                        options[k] = parseInt(options[k],10)
                    }else{
                        options[k] = v
                    }
                }else if(k == 'container'){ // options.container can be a seletor string \ dom \ jQuery object
                    if(options.hasOwnProperty(k)){   
                        if(options[k] == w || options[k] == document){
                            options._$container = $window
                        }else{
                            options._$container = $(options[k])
                        }
                    }else{
                        options._$container = $window
                    }
                    delete options.container
                }else if(defaultOptions.hasOwnProperty(k) && (!options.hasOwnProperty(k) || (type(options[k]) != type(defaultOptions[k])))){
                    options[k] = v
                }
            })

            isScrollEvent = options.event == 'scroll'

            // isScrollTypeEvent. contains custom scrollEvent . Such as 'scrollstart' & 'scrollstop'
            isScrollTypeEvent = isScrollEvent || options.event == 'scrollstart' || options.event == 'scrollstop'

            $elements.each(function(i,e){
                var element = this,
                    $element = $elements.eq(i),
                    placeholderSrc = $element.attr('src'),
                    originalSrcInAttr = $element.attr('data-'+options.data_attribute), // `data-original` attribute value
                    originalSrc = options.url_rewriter_fn == emptyFn?
                        originalSrcInAttr:
                        options.url_rewriter_fn.call(element,$element,originalSrcInAttr),
                    originalSrcset = $element.attr('data-'+options.data_srcset_attribute),
                    isImg = $element.is('img')

                if($element._lazyload_loadStarted == true || placeholderSrc == originalSrc){
                    $element._lazyload_loadStarted = true
                    $elements = getUnloadElements($elements)
                    return
                }

                $element._lazyload_loadStarted = false

                // If element is an img and no src attribute given, use placeholder. 
                if(isImg && !placeholderSrc){
                    // For browsers that do not support data image.
                    $element.one('error',function(){ // `on` -> `one` : IE6 triggered twice error event sometimes
                        $element.attr('src',options.placeholder_real_img)
                    }).attr('src',options.placeholder_data_img)
                }
                
                // When appear is triggered load original image. 
                $element.one('_lazyload_appear',function(){
                    var effectParamsIsArray = $.isArray(options.effect_params),
                        effectIsNotImmediacyShow
                    function loadFunc(){
                        // In most situations, the effect is immediacy show, at this time there is no need to hide element first
                        // Hide this element may cause css reflow, call it as less as possible
                        if(effectIsNotImmediacyShow){
                            // todo: opacity:0 for fadeIn effect
                            $element.hide()
                        }
                        if(isImg){
                            // attr srcset first
                            if(originalSrcset){
                                $element.attr('srcset', originalSrcset)
                            }
                            if(originalSrc){
                                $element.attr('src', originalSrc)
                            }
                        }else{
                            $element.css('background-image','url("' + originalSrc + '")')
                        }
                        if(effectIsNotImmediacyShow){
                            $element[options.effect].apply($element,effectParamsIsArray?options.effect_params:[])
                        }
                        $elements = getUnloadElements($elements)
                    }
                    if(!$element._lazyload_loadStarted){
                        effectIsNotImmediacyShow = (options.effect != 'show' && $.fn[options.effect] && (!options.effect_params || (effectParamsIsArray && options.effect_params.length == 0)))
                        if(options.appear != emptyFn){
                            options.appear.call(element, $elements.length, options)
                        }
                        $element._lazyload_loadStarted = true
                        if(options.no_fake_img_loader || originalSrcset){
                            if(options.load != emptyFn){
                                $element.one('load',function(){
                                    options.load.call(element, $elements.length, options)
                                })
                            }
                            loadFunc()
                        }else{
                            $('<img />').one('load', function(){ // `on` -> `one` : IE6 triggered twice load event sometimes
                                loadFunc()
                                if(options.load != emptyFn){
                                    options.load.call(element, $elements.length, options)
                                }
                            }).attr('src',originalSrc)
                        }
                    }
                })

                // When wanted event is triggered load original image 
                // by triggering appear.                              
                if (!isScrollTypeEvent){
                    $element.on(options.event, function(){
                        if (!$element._lazyload_loadStarted){
                            $element.trigger('_lazyload_appear')
                        }
                    })
                }
            })

            // Fire one scroll event per scroll. Not one scroll event per image. 
            if(isScrollTypeEvent){
                hasMinimumInterval = options.minimum_interval != 0
                options._$container.on(options.event, function(){
                    // desktop and Android device triggered many times `scroll` event in once user scrolling
                    if(isScrollEvent && hasMinimumInterval && (!isIOS || options.use_minimum_interval_in_ios)){
                        if(!scrollTimer){
                            scrollTimer = setTimeout(function(){
                                checkAppear($elements, options)
                                scrollTimer = null
                            },options.minimum_interval) // only check once in 300ms
                        }
                    }else{
                        return checkAppear($elements, options)
                    }
                })
            }

            // Check if something appears when window is resized. 
            // Force initial check if images should appear when window onload. 
            $window.on('resize load', function(){
                checkAppear($elements, options)
            })
                  
            // With IOS5 force loading images when navigating with back button. 
            // Non optimal workaround. 
            if(isIOS5){
                $window.on('pageshow', function(e){
                    if(e.originalEvent && e.originalEvent.persisted){
                        $elements.trigger('_lazyload_appear')
                    }
                })
            }

            // Force initial check if images should appear. 
            $(function(){
                checkAppear($elements, options)
            })
            
            return this
        }
    }
})