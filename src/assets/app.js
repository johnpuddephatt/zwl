!function(t){var e={};function n(i){if(e[i])return e[i].exports;var s=e[i]={i:i,l:!1,exports:{}};return t[i].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)n.d(i,s,function(e){return t[e]}.bind(null,s));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=0)}([function(t,e,n){n(1),t.exports=n(3)},function(t,e,n){"use strict";n(2);var i=new SplitType(".home-hero__title",{split:"lines",tagName:"span"}),s=new SplitType(".project__title",{split:"lines",tagName:"span"});window.addEventListener("resize",(function(){i.revert(),s.revert(),new SplitType(".home-hero__title",{split:"lines",tagName:"span"}),new SplitType(".project__title",{split:"lines",tagName:"span"})}))},function(t,e,n){var i,s;void 0===(s="function"==typeof(i=function(){window.SplitType=function(t,e,n){if(e.addEventListener&&Function.prototype.bind){var i="splitType"+1*new Date,s={},l=0,r=Array.prototype.push,o=Array.prototype.slice,p=Object.keys,a=(Object.prototype.hasOwnProperty,Object.defineProperty),f=(Object.defineProperties,Object.getOwnPropertyDescriptor),c=e.createDocumentFragment.bind(e),u=e.createTextNode.bind(e),h={splitClass:"",lineClass:"line",wordClass:"word",charClass:"char",split:"lines, words, chars",position:"relative",absolute:!1,tagName:"div",DEBUG:!1};return a(O,"defaults",{get:function(){return h},set:function(t){h=b(h,t)}}),O.prototype.split=function(e){this.revert(),this.lines=[],this.words=[],this.chars=[];var i=[t.pageXoffset,t.pageYoffset];e!==n&&(this.settings=b(this.settings,e)),m(this.elements,(function(t){x.call(this,t),v(t).isSplit=!0}),this),this.isSplit=!0,t.scrollTo.apply(t,i),m(this.elements,(function(t){for(var e=v(t).nodes||[],n=0,i=e.length;n<i;n++)w(e[n])}))},O.prototype.revert=function(){this.isSplit&&(this.lines=this.words=this.chars=null),m(this.elements,(function(t){v(t).isSplit&&v(t).html&&(t.innerHTML=v(t).html,t.style.height=v(t).cssHeight||"",t.style.width=v(t).cssWidth||"",this.isSplit=!1)}),this)},O}function d(t){return null!==t&&"object"==typeof t}function y(t){return d(t)&&"number"==typeof t.length&&t.length>0}function g(t){return d(t)&&/^(1|3|11)$/.test(t.nodeType)}function m(t,e,n){for(var i=Object(t),s=y(i)?i:function(t){return d(t)&&"[object Object]"===Object.prototype.toString.call(t)}(i)?p(i):[i],l=parseInt(s.length)||0,r=0;r<l;r++)e.call(n,s[r],r,i)}function b(t,e){return t=Object(t),e=Object(e),Object.getOwnPropertyNames(t).reduce((function(n,i){return a(n,i,f(e,i)||f(t,i))}),{})}function v(t,e,r){var o,p={};return d(t)&&(o=t[i]||(t[i]=++l),p=s[o]||(s[o]={})),r===n?e===n?p:p[e]:e!==n?(p[e]=r,r):void 0}function w(t){var e=t&&t[i];e&&(delete t[e],delete s[e])}function C(t,i){var s=e.createElement(t);return i===n?s:(m(i,(function(t){var e=i[t];if(null!==e)switch(t){case"textContent":s.textContent=e;break;case"innerHTML":s.innerHTML=e;break;case"children":m(e,(function(t){g(t)&&s.appendChild(t)}));break;default:s.setAttribute(t,e)}})),s)}function x(e){var n,i,s,l,p=this.settings,a=p.tagName,f="B"+1*new Date+"R",h=p.split,d=-1!==h.indexOf("lines"),y=-1!==h.indexOf("words"),g=-1!==h.indexOf("chars"),b="absolute"===p.position||!0===p.absolute,w=C("div"),x=[],O=[];if(l=d?C("div"):c(),w.innerHTML=e.innerHTML.replace(/<br\s*\/?>/g," "+f+" "),n=w.textContent.replace(/\s+/g," ").trim().split(" ").map((function(t){if(t===f)return l.appendChild(C("br")),null;if(g){var e=t.split("").map((function(t){return C(a,{class:p.charClass+" "+p.splitClass,style:"display: inline-block;",textContent:t})}));r.apply(O,e)}return y||d?(s=C(a,{class:p.wordClass+" "+p.splitClass,style:"display: inline-block; position:"+(y?"relative":"static;"),children:g?e:null,textContent:g?null:t}),l.appendChild(s)):m(e,(function(t){l.appendChild(t)})),l.appendChild(u(" ")),s}),this).filter((function(t){return t})),e.innerHTML="",e.appendChild(l),r.apply(this.words,n),r.apply(this.chars,O),b||d){var j,T,S,_,E,H,L,M,P,N,k,A=[];L=v(e).nodes=e.getElementsByTagName(a),M=e.parentElement,P=e.nextElementSibling,N=t.getComputedStyle(e),k=N.textAlign,b&&(_={left:l.offsetLeft,top:l.offsetTop,width:l.offsetWidth},H=e.offsetWidth,E=e.offsetHeight,v(e).cssWidth=e.style.width,v(e).cssHeight=e.style.height),m(L,(function(t){if(t!==l){var e,n=t.parentElement===l;d&&n&&((e=v(t).top=t.offsetTop)!==T&&(T=e,A.push(j=[])),j.push(t)),b&&(v(t).top=e||t.offsetTop,v(t).left=t.offsetLeft,v(t).width=t.offsetWidth,v(t).height=S||(S=t.offsetHeight))}})),M.removeChild(e),d&&(l=c(),x=A.map((function(t){return l.appendChild(i=C(a,{class:p.lineClass+" "+p.splitClass,style:"display: block; text-align:"+k+"; width: 100%;"})),b&&(v(i).type="line",v(i).top=v(t[0]).top,v(i).height=S),m(t,(function(t){y?i.appendChild(t):g?o.call(t.children).forEach((function(t){i.appendChild(t)})):i.appendChild(u(t.textContent)),i.appendChild(u(" "))})),i})),e.replaceChild(l,e.firstChild),r.apply(this.lines,x)),b&&(e.style.width=e.style.width||H+"px",e.style.height=E+"px",m(L,(function(t){var e="line"===v(t).type,n=!e&&"line"===v(t.parentElement).type;t.style.top=n?0:v(t).top+"px",t.style.left=e?_.left+"px":(n?v(t).left-_.left:v(t).left)+"px",t.style.height=v(t).height+"px",t.style.width=e?_.width+"px":v(t).width+"px",t.style.position="absolute"}))),P?M.insertBefore(e,P):M.appendChild(e)}}function O(t,n){if(!(this instanceof O))return new O(t,n);this.isSplit=!1,this.settings=b(h,n),this.elements=function(t){var n,i,s,l,r,p,a=[];if("string"==typeof t&&(n=t.trim(),t="#"!==n[0]||/[^\w]/.test(i=n.slice(1))?e.querySelectorAll(n):e.getElementById(i)),n||g(t))return g(t)?[t]:o.call(t);if(y(t))for(r=0,s=t.length;r<s;r++)if(y(t[r]))for(p=0,l=t[r].length;p<l;p++)g(t[r][p])&&a.push(t[r][p]);else g(t[r])&&a.push(t[r]);return a}(t),this.elements.length&&(this.originals=this.elements.map((function(t){return v(t).html=v(t).html||t.innerHTML})),this.split())}}(window,document)})?i.call(e,n,e,t):i)||(t.exports=s)},function(t,e){}]);