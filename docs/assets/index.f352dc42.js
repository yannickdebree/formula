(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerpolicy&&(o.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?o.credentials="include":i.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();var kt=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */var Ft;(function(r){(function(t){var e=typeof kt=="object"?kt:typeof self=="object"?self:typeof this=="object"?this:Function("return this;")(),n=i(r);typeof e.Reflect>"u"?e.Reflect=r:n=i(e.Reflect,n),t(n);function i(o,u){return function(l,h){typeof o[l]!="function"&&Object.defineProperty(o,l,{configurable:!0,writable:!0,value:h}),u&&u(l,h)}}})(function(t){var e=Object.prototype.hasOwnProperty,n=typeof Symbol=="function",i=n&&typeof Symbol.toPrimitive<"u"?Symbol.toPrimitive:"@@toPrimitive",o=n&&typeof Symbol.iterator<"u"?Symbol.iterator:"@@iterator",u=typeof Object.create=="function",l={__proto__:[]}instanceof Array,h=!u&&!l,w={create:u?function(){return ot(Object.create(null))}:l?function(){return ot({__proto__:null})}:function(){return ot({})},has:h?function(s,a){return e.call(s,a)}:function(s,a){return a in s},get:h?function(s,a){return e.call(s,a)?s[a]:void 0}:function(s,a){return s[a]}},_=Object.getPrototypeOf(Function),M=typeof process=="object"&&process.env&&process.env.REFLECT_METADATA_USE_MAP_POLYFILL==="true",I=!M&&typeof Map=="function"&&typeof Map.prototype.entries=="function"?Map:we(),C=!M&&typeof Set=="function"&&typeof Set.prototype.entries=="function"?Set:_e(),rt=!M&&typeof WeakMap=="function"?WeakMap:ge(),x=new rt;function Zt(s,a,f,c){if(g(f)){if(!At(s))throw new TypeError;if(!Ct(a))throw new TypeError;return ae(s,a)}else{if(!At(s))throw new TypeError;if(!E(a))throw new TypeError;if(!E(c)&&!g(c)&&!U(c))throw new TypeError;return U(c)&&(c=void 0),f=O(f),ue(s,a,f,c)}}t("decorate",Zt);function Jt(s,a){function f(c,p){if(!E(c))throw new TypeError;if(!g(p)&&!ve(p))throw new TypeError;Ot(s,a,c,p)}return f}t("metadata",Jt);function Kt(s,a,f,c){if(!E(f))throw new TypeError;return g(c)||(c=O(c)),Ot(s,a,f,c)}t("defineMetadata",Kt);function te(s,a,f){if(!E(a))throw new TypeError;return g(f)||(f=O(f)),St(s,a,f)}t("hasMetadata",te);function ee(s,a,f){if(!E(a))throw new TypeError;return g(f)||(f=O(f)),nt(s,a,f)}t("hasOwnMetadata",ee);function re(s,a,f){if(!E(a))throw new TypeError;return g(f)||(f=O(f)),xt(s,a,f)}t("getMetadata",re);function ne(s,a,f){if(!E(a))throw new TypeError;return g(f)||(f=O(f)),Pt(s,a,f)}t("getOwnMetadata",ne);function ie(s,a){if(!E(s))throw new TypeError;return g(a)||(a=O(a)),Tt(s,a)}t("getMetadataKeys",ie);function oe(s,a){if(!E(s))throw new TypeError;return g(a)||(a=O(a)),It(s,a)}t("getOwnMetadataKeys",oe);function se(s,a,f){if(!E(a))throw new TypeError;g(f)||(f=O(f));var c=L(a,f,!1);if(g(c)||!c.delete(s))return!1;if(c.size>0)return!0;var p=x.get(a);return p.delete(f),p.size>0||x.delete(a),!0}t("deleteMetadata",se);function ae(s,a){for(var f=s.length-1;f>=0;--f){var c=s[f],p=c(a);if(!g(p)&&!U(p)){if(!Ct(p))throw new TypeError;a=p}}return a}function ue(s,a,f,c){for(var p=s.length-1;p>=0;--p){var S=s[p],d=S(a,f,c);if(!g(d)&&!U(d)){if(!E(d))throw new TypeError;c=d}}return c}function L(s,a,f){var c=x.get(s);if(g(c)){if(!f)return;c=new I,x.set(s,c)}var p=c.get(a);if(g(p)){if(!f)return;p=new I,c.set(a,p)}return p}function St(s,a,f){var c=nt(s,a,f);if(c)return!0;var p=it(a);return U(p)?!1:St(s,p,f)}function nt(s,a,f){var c=L(a,f,!1);return g(c)?!1:he(c.has(s))}function xt(s,a,f){var c=nt(s,a,f);if(c)return Pt(s,a,f);var p=it(a);if(!U(p))return xt(s,p,f)}function Pt(s,a,f){var c=L(a,f,!1);if(!g(c))return c.get(s)}function Ot(s,a,f,c){var p=L(f,c,!0);p.set(s,a)}function Tt(s,a){var f=It(s,a),c=it(s);if(c===null)return f;var p=Tt(c,a);if(p.length<=0)return f;if(f.length<=0)return p;for(var S=new C,d=[],y=0,v=f;y<v.length;y++){var m=v[y],b=S.has(m);b||(S.add(m),d.push(m))}for(var j=0,Ut=p;j<Ut.length;j++){var m=Ut[j],b=S.has(m);b||(S.add(m),d.push(m))}return d}function It(s,a){var f=[],c=L(s,a,!1);if(g(c))return f;for(var p=c.keys(),S=de(p),d=0;;){var y=me(S);if(!y)return f.length=d,f;var v=ye(y);try{f[d]=v}catch(m){try{be(S)}finally{throw m}}d++}}function jt(s){if(s===null)return 1;switch(typeof s){case"undefined":return 0;case"boolean":return 2;case"string":return 3;case"symbol":return 4;case"number":return 5;case"object":return s===null?1:6;default:return 6}}function g(s){return s===void 0}function U(s){return s===null}function fe(s){return typeof s=="symbol"}function E(s){return typeof s=="object"?s!==null:typeof s=="function"}function ce(s,a){switch(jt(s)){case 0:return s;case 1:return s;case 2:return s;case 3:return s;case 4:return s;case 5:return s}var f=a===3?"string":a===5?"number":"default",c=Mt(s,i);if(c!==void 0){var p=c.call(s,f);if(E(p))throw new TypeError;return p}return le(s,f==="default"?"number":f)}function le(s,a){if(a==="string"){var f=s.toString;if(k(f)){var c=f.call(s);if(!E(c))return c}var p=s.valueOf;if(k(p)){var c=p.call(s);if(!E(c))return c}}else{var p=s.valueOf;if(k(p)){var c=p.call(s);if(!E(c))return c}var S=s.toString;if(k(S)){var c=S.call(s);if(!E(c))return c}}throw new TypeError}function he(s){return!!s}function pe(s){return""+s}function O(s){var a=ce(s,3);return fe(a)?a:pe(a)}function At(s){return Array.isArray?Array.isArray(s):s instanceof Object?s instanceof Array:Object.prototype.toString.call(s)==="[object Array]"}function k(s){return typeof s=="function"}function Ct(s){return typeof s=="function"}function ve(s){switch(jt(s)){case 3:return!0;case 4:return!0;default:return!1}}function Mt(s,a){var f=s[a];if(f!=null){if(!k(f))throw new TypeError;return f}}function de(s){var a=Mt(s,o);if(!k(a))throw new TypeError;var f=a.call(s);if(!E(f))throw new TypeError;return f}function ye(s){return s.value}function me(s){var a=s.next();return a.done?!1:a}function be(s){var a=s.return;a&&a.call(s)}function it(s){var a=Object.getPrototypeOf(s);if(typeof s!="function"||s===_||a!==_)return a;var f=s.prototype,c=f&&Object.getPrototypeOf(f);if(c==null||c===Object.prototype)return a;var p=c.constructor;return typeof p!="function"||p===s?a:p}function we(){var s={},a=[],f=function(){function d(y,v,m){this._index=0,this._keys=y,this._values=v,this._selector=m}return d.prototype["@@iterator"]=function(){return this},d.prototype[o]=function(){return this},d.prototype.next=function(){var y=this._index;if(y>=0&&y<this._keys.length){var v=this._selector(this._keys[y],this._values[y]);return y+1>=this._keys.length?(this._index=-1,this._keys=a,this._values=a):this._index++,{value:v,done:!1}}return{value:void 0,done:!0}},d.prototype.throw=function(y){throw this._index>=0&&(this._index=-1,this._keys=a,this._values=a),y},d.prototype.return=function(y){return this._index>=0&&(this._index=-1,this._keys=a,this._values=a),{value:y,done:!0}},d}();return function(){function d(){this._keys=[],this._values=[],this._cacheKey=s,this._cacheIndex=-2}return Object.defineProperty(d.prototype,"size",{get:function(){return this._keys.length},enumerable:!0,configurable:!0}),d.prototype.has=function(y){return this._find(y,!1)>=0},d.prototype.get=function(y){var v=this._find(y,!1);return v>=0?this._values[v]:void 0},d.prototype.set=function(y,v){var m=this._find(y,!0);return this._values[m]=v,this},d.prototype.delete=function(y){var v=this._find(y,!1);if(v>=0){for(var m=this._keys.length,b=v+1;b<m;b++)this._keys[b-1]=this._keys[b],this._values[b-1]=this._values[b];return this._keys.length--,this._values.length--,y===this._cacheKey&&(this._cacheKey=s,this._cacheIndex=-2),!0}return!1},d.prototype.clear=function(){this._keys.length=0,this._values.length=0,this._cacheKey=s,this._cacheIndex=-2},d.prototype.keys=function(){return new f(this._keys,this._values,c)},d.prototype.values=function(){return new f(this._keys,this._values,p)},d.prototype.entries=function(){return new f(this._keys,this._values,S)},d.prototype["@@iterator"]=function(){return this.entries()},d.prototype[o]=function(){return this.entries()},d.prototype._find=function(y,v){return this._cacheKey!==y&&(this._cacheIndex=this._keys.indexOf(this._cacheKey=y)),this._cacheIndex<0&&v&&(this._cacheIndex=this._keys.length,this._keys.push(y),this._values.push(void 0)),this._cacheIndex},d}();function c(d,y){return d}function p(d,y){return y}function S(d,y){return[d,y]}}function _e(){return function(){function s(){this._map=new I}return Object.defineProperty(s.prototype,"size",{get:function(){return this._map.size},enumerable:!0,configurable:!0}),s.prototype.has=function(a){return this._map.has(a)},s.prototype.add=function(a){return this._map.set(a,a),this},s.prototype.delete=function(a){return this._map.delete(a)},s.prototype.clear=function(){this._map.clear()},s.prototype.keys=function(){return this._map.keys()},s.prototype.values=function(){return this._map.values()},s.prototype.entries=function(){return this._map.entries()},s.prototype["@@iterator"]=function(){return this.keys()},s.prototype[o]=function(){return this.keys()},s}()}function ge(){var s=16,a=w.create(),f=c();return function(){function v(){this._key=c()}return v.prototype.has=function(m){var b=p(m,!1);return b!==void 0?w.has(b,this._key):!1},v.prototype.get=function(m){var b=p(m,!1);return b!==void 0?w.get(b,this._key):void 0},v.prototype.set=function(m,b){var j=p(m,!0);return j[this._key]=b,this},v.prototype.delete=function(m){var b=p(m,!1);return b!==void 0?delete b[this._key]:!1},v.prototype.clear=function(){this._key=c()},v}();function c(){var v;do v="@@WeakMap@@"+y();while(w.has(a,v));return a[v]=!0,v}function p(v,m){if(!e.call(v,f)){if(!m)return;Object.defineProperty(v,f,{value:w.create()})}return v[f]}function S(v,m){for(var b=0;b<m;++b)v[b]=Math.random()*255|0;return v}function d(v){return typeof Uint8Array=="function"?typeof crypto<"u"?crypto.getRandomValues(new Uint8Array(v)):typeof msCrypto<"u"?msCrypto.getRandomValues(new Uint8Array(v)):S(new Uint8Array(v),v):S(new Array(v),v)}function y(){var v=d(s);v[6]=v[6]&79|64,v[8]=v[8]&191|128;for(var m="",b=0;b<s;++b){var j=v[b];(b===4||b===6||b===8)&&(m+="-"),j<16&&(m+="0"),m+=j.toString(16).toLowerCase()}return m}}function ot(s){return s.__=void 0,delete s.__,s}})})(Ft||(Ft={}));var ct=function(r,t){return ct=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])},ct(r,t)};function D(r,t){if(typeof t!="function"&&t!==null)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");ct(r,t);function e(){this.constructor=r}r.prototype=t===null?Object.create(t):(e.prototype=t.prototype,new e)}function lt(r){var t=typeof Symbol=="function"&&Symbol.iterator,e=t&&r[t],n=0;if(e)return e.call(r);if(r&&typeof r.length=="number")return{next:function(){return r&&n>=r.length&&(r=void 0),{value:r&&r[n++],done:!r}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function X(r,t){var e=typeof Symbol=="function"&&r[Symbol.iterator];if(!e)return r;var n=e.call(r),i,o=[],u;try{for(;(t===void 0||t-- >0)&&!(i=n.next()).done;)o.push(i.value)}catch(l){u={error:l}}finally{try{i&&!i.done&&(e=n.return)&&e.call(n)}finally{if(u)throw u.error}}return o}function G(r,t,e){if(e||arguments.length===2)for(var n=0,i=t.length,o;n<i;n++)(o||!(n in t))&&(o||(o=Array.prototype.slice.call(t,0,n)),o[n]=t[n]);return r.concat(o||Array.prototype.slice.call(t))}function P(r){return typeof r=="function"}function wt(r){var t=function(n){Error.call(n),n.stack=new Error().stack},e=r(t);return e.prototype=Object.create(Error.prototype),e.prototype.constructor=e,e}var st=wt(function(r){return function(e){r(this),this.message=e?e.length+` errors occurred during unsubscription:
`+e.map(function(n,i){return i+1+") "+n.toString()}).join(`
  `):"",this.name="UnsubscriptionError",this.errors=e}});function ht(r,t){if(r){var e=r.indexOf(t);0<=e&&r.splice(e,1)}}var tt=function(){function r(t){this.initialTeardown=t,this.closed=!1,this._parentage=null,this._finalizers=null}return r.prototype.unsubscribe=function(){var t,e,n,i,o;if(!this.closed){this.closed=!0;var u=this._parentage;if(u)if(this._parentage=null,Array.isArray(u))try{for(var l=lt(u),h=l.next();!h.done;h=l.next()){var w=h.value;w.remove(this)}}catch(x){t={error:x}}finally{try{h&&!h.done&&(e=l.return)&&e.call(l)}finally{if(t)throw t.error}}else u.remove(this);var _=this.initialTeardown;if(P(_))try{_()}catch(x){o=x instanceof st?x.errors:[x]}var M=this._finalizers;if(M){this._finalizers=null;try{for(var I=lt(M),C=I.next();!C.done;C=I.next()){var rt=C.value;try{Rt(rt)}catch(x){o=o!=null?o:[],x instanceof st?o=G(G([],X(o)),X(x.errors)):o.push(x)}}}catch(x){n={error:x}}finally{try{C&&!C.done&&(i=I.return)&&i.call(I)}finally{if(n)throw n.error}}}if(o)throw new st(o)}},r.prototype.add=function(t){var e;if(t&&t!==this)if(this.closed)Rt(t);else{if(t instanceof r){if(t.closed||t._hasParent(this))return;t._addParent(this)}(this._finalizers=(e=this._finalizers)!==null&&e!==void 0?e:[]).push(t)}},r.prototype._hasParent=function(t){var e=this._parentage;return e===t||Array.isArray(e)&&e.includes(t)},r.prototype._addParent=function(t){var e=this._parentage;this._parentage=Array.isArray(e)?(e.push(t),e):e?[e,t]:t},r.prototype._removeParent=function(t){var e=this._parentage;e===t?this._parentage=null:Array.isArray(e)&&ht(e,t)},r.prototype.remove=function(t){var e=this._finalizers;e&&ht(e,t),t instanceof r&&t._removeParent(this)},r.EMPTY=function(){var t=new r;return t.closed=!0,t}(),r}(),Yt=tt.EMPTY;function Ht(r){return r instanceof tt||r&&"closed"in r&&P(r.remove)&&P(r.add)&&P(r.unsubscribe)}function Rt(r){P(r)?r():r.unsubscribe()}var et={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1},Q={setTimeout:function(r,t){for(var e=[],n=2;n<arguments.length;n++)e[n-2]=arguments[n];var i=Q.delegate;return i!=null&&i.setTimeout?i.setTimeout.apply(i,G([r,t],X(e))):setTimeout.apply(void 0,G([r,t],X(e)))},clearTimeout:function(r){var t=Q.delegate;return((t==null?void 0:t.clearTimeout)||clearTimeout)(r)},delegate:void 0};function Ee(r){Q.setTimeout(function(){throw r})}function Dt(){}var Se=function(){return _t("C",void 0,void 0)}();function xe(r){return _t("E",void 0,r)}function Pe(r){return _t("N",r,void 0)}function _t(r,t,e){return{kind:r,value:t,error:e}}var Y=null;function q(r){if(et.useDeprecatedSynchronousErrorHandling){var t=!Y;if(t&&(Y={errorThrown:!1,error:null}),r(),t){var e=Y,n=e.errorThrown,i=e.error;if(Y=null,n)throw i}}else r()}var gt=function(r){D(t,r);function t(e){var n=r.call(this)||this;return n.isStopped=!1,e?(n.destination=e,Ht(e)&&e.add(n)):n.destination=je,n}return t.create=function(e,n,i){return new pt(e,n,i)},t.prototype.next=function(e){this.isStopped?ut(Pe(e),this):this._next(e)},t.prototype.error=function(e){this.isStopped?ut(xe(e),this):(this.isStopped=!0,this._error(e))},t.prototype.complete=function(){this.isStopped?ut(Se,this):(this.isStopped=!0,this._complete())},t.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,r.prototype.unsubscribe.call(this),this.destination=null)},t.prototype._next=function(e){this.destination.next(e)},t.prototype._error=function(e){try{this.destination.error(e)}finally{this.unsubscribe()}},t.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},t}(tt),Oe=Function.prototype.bind;function at(r,t){return Oe.call(r,t)}var Te=function(){function r(t){this.partialObserver=t}return r.prototype.next=function(t){var e=this.partialObserver;if(e.next)try{e.next(t)}catch(n){H(n)}},r.prototype.error=function(t){var e=this.partialObserver;if(e.error)try{e.error(t)}catch(n){H(n)}else H(t)},r.prototype.complete=function(){var t=this.partialObserver;if(t.complete)try{t.complete()}catch(e){H(e)}},r}(),pt=function(r){D(t,r);function t(e,n,i){var o=r.call(this)||this,u;if(P(e)||!e)u={next:e!=null?e:void 0,error:n!=null?n:void 0,complete:i!=null?i:void 0};else{var l;o&&et.useDeprecatedNextContext?(l=Object.create(e),l.unsubscribe=function(){return o.unsubscribe()},u={next:e.next&&at(e.next,l),error:e.error&&at(e.error,l),complete:e.complete&&at(e.complete,l)}):u=e}return o.destination=new Te(u),o}return t}(gt);function H(r){Ee(r)}function Ie(r){throw r}function ut(r,t){var e=et.onStoppedNotification;e&&Q.setTimeout(function(){return e(r,t)})}var je={closed:!0,next:Dt,error:Ie,complete:Dt},Ae=function(){return typeof Symbol=="function"&&Symbol.observable||"@@observable"}();function qt(r){return r}function Ce(r){return r.length===0?qt:r.length===1?r[0]:function(e){return r.reduce(function(n,i){return i(n)},e)}}var vt=function(){function r(t){t&&(this._subscribe=t)}return r.prototype.lift=function(t){var e=new r;return e.source=this,e.operator=t,e},r.prototype.subscribe=function(t,e,n){var i=this,o=Ue(t)?t:new pt(t,e,n);return q(function(){var u=i,l=u.operator,h=u.source;o.add(l?l.call(o,h):h?i._subscribe(o):i._trySubscribe(o))}),o},r.prototype._trySubscribe=function(t){try{return this._subscribe(t)}catch(e){t.error(e)}},r.prototype.forEach=function(t,e){var n=this;return e=Lt(e),new e(function(i,o){var u=new pt({next:function(l){try{t(l)}catch(h){o(h),u.unsubscribe()}},error:o,complete:i});n.subscribe(u)})},r.prototype._subscribe=function(t){var e;return(e=this.source)===null||e===void 0?void 0:e.subscribe(t)},r.prototype[Ae]=function(){return this},r.prototype.pipe=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return Ce(t)(this)},r.prototype.toPromise=function(t){var e=this;return t=Lt(t),new t(function(n,i){var o;e.subscribe(function(u){return o=u},function(u){return i(u)},function(){return n(o)})})},r.create=function(t){return new r(t)},r}();function Lt(r){var t;return(t=r!=null?r:et.Promise)!==null&&t!==void 0?t:Promise}function Me(r){return r&&P(r.next)&&P(r.error)&&P(r.complete)}function Ue(r){return r&&r instanceof gt||Me(r)&&Ht(r)}function ke(r){return P(r==null?void 0:r.lift)}function V(r){return function(t){if(ke(t))return t.lift(function(e){try{return r(e,this)}catch(n){this.error(n)}});throw new TypeError("Unable to lift unknown Observable type")}}function $(r,t,e,n,i){return new Fe(r,t,e,n,i)}var Fe=function(r){D(t,r);function t(e,n,i,o,u,l){var h=r.call(this,e)||this;return h.onFinalize=u,h.shouldUnsubscribe=l,h._next=n?function(w){try{n(w)}catch(_){e.error(_)}}:r.prototype._next,h._error=o?function(w){try{o(w)}catch(_){e.error(_)}finally{this.unsubscribe()}}:r.prototype._error,h._complete=i?function(){try{i()}catch(w){e.error(w)}finally{this.unsubscribe()}}:r.prototype._complete,h}return t.prototype.unsubscribe=function(){var e;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){var n=this.closed;r.prototype.unsubscribe.call(this),!n&&((e=this.onFinalize)===null||e===void 0||e.call(this))}},t}(gt),Re=wt(function(r){return function(){r(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"}}),Bt=function(r){D(t,r);function t(){var e=r.call(this)||this;return e.closed=!1,e.currentObservers=null,e.observers=[],e.isStopped=!1,e.hasError=!1,e.thrownError=null,e}return t.prototype.lift=function(e){var n=new Nt(this,this);return n.operator=e,n},t.prototype._throwIfClosed=function(){if(this.closed)throw new Re},t.prototype.next=function(e){var n=this;q(function(){var i,o;if(n._throwIfClosed(),!n.isStopped){n.currentObservers||(n.currentObservers=Array.from(n.observers));try{for(var u=lt(n.currentObservers),l=u.next();!l.done;l=u.next()){var h=l.value;h.next(e)}}catch(w){i={error:w}}finally{try{l&&!l.done&&(o=u.return)&&o.call(u)}finally{if(i)throw i.error}}}})},t.prototype.error=function(e){var n=this;q(function(){if(n._throwIfClosed(),!n.isStopped){n.hasError=n.isStopped=!0,n.thrownError=e;for(var i=n.observers;i.length;)i.shift().error(e)}})},t.prototype.complete=function(){var e=this;q(function(){if(e._throwIfClosed(),!e.isStopped){e.isStopped=!0;for(var n=e.observers;n.length;)n.shift().complete()}})},t.prototype.unsubscribe=function(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null},Object.defineProperty(t.prototype,"observed",{get:function(){var e;return((e=this.observers)===null||e===void 0?void 0:e.length)>0},enumerable:!1,configurable:!0}),t.prototype._trySubscribe=function(e){return this._throwIfClosed(),r.prototype._trySubscribe.call(this,e)},t.prototype._subscribe=function(e){return this._throwIfClosed(),this._checkFinalizedStatuses(e),this._innerSubscribe(e)},t.prototype._innerSubscribe=function(e){var n=this,i=this,o=i.hasError,u=i.isStopped,l=i.observers;return o||u?Yt:(this.currentObservers=null,l.push(e),new tt(function(){n.currentObservers=null,ht(l,e)}))},t.prototype._checkFinalizedStatuses=function(e){var n=this,i=n.hasError,o=n.thrownError,u=n.isStopped;i?e.error(o):u&&e.complete()},t.prototype.asObservable=function(){var e=new vt;return e.source=this,e},t.create=function(e,n){return new Nt(e,n)},t}(vt),Nt=function(r){D(t,r);function t(e,n){var i=r.call(this)||this;return i.destination=e,i.source=n,i}return t.prototype.next=function(e){var n,i;(i=(n=this.destination)===null||n===void 0?void 0:n.next)===null||i===void 0||i.call(n,e)},t.prototype.error=function(e){var n,i;(i=(n=this.destination)===null||n===void 0?void 0:n.error)===null||i===void 0||i.call(n,e)},t.prototype.complete=function(){var e,n;(n=(e=this.destination)===null||e===void 0?void 0:e.complete)===null||n===void 0||n.call(e)},t.prototype._subscribe=function(e){var n,i;return(i=(n=this.source)===null||n===void 0?void 0:n.subscribe(e))!==null&&i!==void 0?i:Yt},t}(Bt),Xt={now:function(){return(Xt.delegate||Date).now()},delegate:void 0},De=function(r){D(t,r);function t(e,n,i){e===void 0&&(e=1/0),n===void 0&&(n=1/0),i===void 0&&(i=Xt);var o=r.call(this)||this;return o._bufferSize=e,o._windowTime=n,o._timestampProvider=i,o._buffer=[],o._infiniteTimeWindow=!0,o._infiniteTimeWindow=n===1/0,o._bufferSize=Math.max(1,e),o._windowTime=Math.max(1,n),o}return t.prototype.next=function(e){var n=this,i=n.isStopped,o=n._buffer,u=n._infiniteTimeWindow,l=n._timestampProvider,h=n._windowTime;i||(o.push(e),!u&&o.push(l.now()+h)),this._trimBuffer(),r.prototype.next.call(this,e)},t.prototype._subscribe=function(e){this._throwIfClosed(),this._trimBuffer();for(var n=this._innerSubscribe(e),i=this,o=i._infiniteTimeWindow,u=i._buffer,l=u.slice(),h=0;h<l.length&&!e.closed;h+=o?1:2)e.next(l[h]);return this._checkFinalizedStatuses(e),n},t.prototype._trimBuffer=function(){var e=this,n=e._bufferSize,i=e._timestampProvider,o=e._buffer,u=e._infiniteTimeWindow,l=(u?1:2)*n;if(n<1/0&&l<o.length&&o.splice(0,o.length-l),!u){for(var h=i.now(),w=0,_=1;_<o.length&&o[_]<=h;_+=2)w=_;w&&o.splice(0,w+1)}},t}(Bt),Le=new vt(function(r){return r.complete()}),Gt=wt(function(r){return function(){r(this),this.name="EmptyError",this.message="no elements in sequence"}});function dt(r,t){return V(function(e,n){var i=0;e.subscribe($(n,function(o){n.next(r.call(t,o,i++))}))})}function Ne(r,t){return V(function(e,n){var i=0;e.subscribe($(n,function(o){return r.call(t,o,i++)&&n.next(o)}))})}function We(r){return V(function(t,e){var n=!1;t.subscribe($(e,function(i){n=!0,e.next(i)},function(){n||e.next(r),e.complete()}))})}function Ve(r){return r<=0?function(){return Le}:V(function(t,e){var n=0;t.subscribe($(e,function(i){++n<=r&&(e.next(i),r<=n&&e.complete())}))})}function $e(r){return r===void 0&&(r=ze),V(function(t,e){var n=!1;t.subscribe($(e,function(i){n=!0,e.next(i)},function(){return n?e.complete():e.error(r())}))})}function ze(){return new Gt}function Ye(r,t){var e=arguments.length>=2;return function(n){return n.pipe(r?Ne(function(i,o){return r(i,o,n)}):qt,Ve(1),e?We(t):$e(function(){return new Gt}))}}var W=function(){function r(t){this.name=t}return r}(),He=globalThis&&globalThis.__extends||function(){var r=function(t,e){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(n[o]=i[o])},r(t,e)};return function(t,e){r(t,e);function n(){this.constructor=t}t.prototype=e===null?Object.create(e):(n.prototype=e.prototype,new n)}}(),Wt=function(r){He(t,r);function t(e){var n,i,o=r.call(this)||this;return o.name="ServiceNotFoundError",o.normalizedIdentifier="<UNKNOWN_IDENTIFIER>",typeof e=="string"?o.normalizedIdentifier=e:e instanceof W?o.normalizedIdentifier="Token<"+(e.name||"UNSET_NAME")+">":e&&(e.name||((n=e.prototype)===null||n===void 0?void 0:n.name))&&(o.normalizedIdentifier="MaybeConstructable<"+e.name+">"||"MaybeConstructable<"+((i=e.prototype)===null||i===void 0?void 0:i.name)+">"),o}return Object.defineProperty(t.prototype,"message",{get:function(){return'Service with "'+this.normalizedIdentifier+'" identifier was not found in the container. Register it before usage via explicitly calling the "Container.set" function or using the "@Service()" decorator.'},enumerable:!1,configurable:!0}),t}(Error),qe=globalThis&&globalThis.__extends||function(){var r=function(t,e){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(n[o]=i[o])},r(t,e)};return function(t,e){r(t,e);function n(){this.constructor=t}t.prototype=e===null?Object.create(e):(n.prototype=e.prototype,new n)}}(),Vt=function(r){qe(t,r);function t(e){var n,i,o=r.call(this)||this;return o.name="CannotInstantiateValueError",o.normalizedIdentifier="<UNKNOWN_IDENTIFIER>",typeof e=="string"?o.normalizedIdentifier=e:e instanceof W?o.normalizedIdentifier="Token<"+(e.name||"UNSET_NAME")+">":e&&(e.name||((n=e.prototype)===null||n===void 0?void 0:n.name))&&(o.normalizedIdentifier="MaybeConstructable<"+e.name+">"||"MaybeConstructable<"+((i=e.prototype)===null||i===void 0?void 0:i.name)+">"),o}return Object.defineProperty(t.prototype,"message",{get:function(){return'Cannot instantiate the requested value for the "'+this.normalizedIdentifier+`" identifier. The related metadata doesn't contain a factory or a type to instantiate.`},enumerable:!1,configurable:!0}),t}(Error),A=Symbol("EMPTY_VALUE"),F=globalThis&&globalThis.__assign||function(){return F=Object.assign||function(r){for(var t,e=1,n=arguments.length;e<n;e++){t=arguments[e];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(r[i]=t[i])}return r},F.apply(this,arguments)},Be=globalThis&&globalThis.__spreadArrays||function(){for(var r=0,t=0,e=arguments.length;t<e;t++)r+=arguments[t].length;for(var n=Array(r),i=0,t=0;t<e;t++)for(var o=arguments[t],u=0,l=o.length;u<l;u++,i++)n[i]=o[u];return n},$t=function(){function r(t){this.services=[],this.id=t}return r.prototype.has=function(t){return!!this.findService(t)},r.prototype.get=function(t){var e=N.of(void 0),n=e.findService(t),i=this.findService(t);if(n&&n.global===!0)return this.getServiceValue(n);if(i)return this.getServiceValue(i);if(n&&this!==e){var o=F({},n);o.value=A,this.set(o);var u=this.getServiceValue(o);return this.set(F(F({},o),{value:u})),u}if(n)return this.getServiceValue(n);throw new Wt(t)},r.prototype.getMany=function(t){var e=this;return this.findAllServices(t).map(function(n){return e.getServiceValue(n)})},r.prototype.set=function(t,e){var n=this;if(t instanceof Array)return t.forEach(function(u){return n.set(u)}),this;if(typeof t=="string"||t instanceof W)return this.set({id:t,type:null,value:e,factory:void 0,global:!1,multiple:!1,eager:!1,transient:!1});if(typeof t=="function")return this.set({id:t,type:t,value:e,factory:void 0,global:!1,multiple:!1,eager:!1,transient:!1});var i=F({id:new W("UNREACHABLE"),type:null,factory:void 0,value:A,global:!1,multiple:!1,eager:!1,transient:!1},t),o=this.findService(i.id);return o&&o.multiple!==!0?Object.assign(o,i):this.services.push(i),i.eager&&this.get(i.id),this},r.prototype.remove=function(t){var e=this;return Array.isArray(t)?t.forEach(function(n){return e.remove(n)}):this.services=this.services.filter(function(n){return n.id===t?(e.destroyServiceInstance(n),!1):!0}),this},r.prototype.reset=function(t){var e=this;switch(t===void 0&&(t={strategy:"resetValue"}),t.strategy){case"resetValue":this.services.forEach(function(n){return e.destroyServiceInstance(n)});break;case"resetServices":this.services.forEach(function(n){return e.destroyServiceInstance(n)}),this.services=[];break;default:throw new Error("Received invalid reset strategy.")}return this},r.prototype.findAllServices=function(t){return this.services.filter(function(e){return e.id===t})},r.prototype.findService=function(t){return this.services.find(function(e){return e.id===t})},r.prototype.getServiceValue=function(t){var e,n=A;if(t.value!==A)return t.value;if(!t.factory&&!t.type)throw new Vt(t.id);if(t.factory)if(t.factory instanceof Array){var i=void 0;try{i=this.get(t.factory[0])}catch(h){if(h instanceof Wt)i=new t.factory[0];else throw h}n=i[t.factory[1]](this,t.id)}else n=t.factory(this,t.id);if(!t.factory&&t.type){var o=t.type,u=((e=Reflect)===null||e===void 0?void 0:e.getMetadata("design:paramtypes",o))||[],l=this.initializeParams(o,u);l.push(this),n=new(o.bind.apply(o,Be([void 0],l)))}if(!t.transient&&n!==A&&(t.value=n),n===A)throw new Vt(t.id);return t.type&&this.applyPropertyHandlers(t.type,n),n},r.prototype.initializeParams=function(t,e){var n=this;return e.map(function(i,o){var u=N.handlers.find(function(l){return(l.object===t||l.object===Object.getPrototypeOf(t))&&l.index===o});if(u)return u.value(n);if(i&&i.name&&!n.isPrimitiveParamType(i.name))return n.get(i)})},r.prototype.isPrimitiveParamType=function(t){return["string","boolean","number","object"].includes(t.toLowerCase())},r.prototype.applyPropertyHandlers=function(t,e){var n=this;N.handlers.forEach(function(i){typeof i.index!="number"&&(i.object.constructor!==t&&!(t.prototype instanceof i.object.constructor)||i.propertyName&&(e[i.propertyName]=i.value(n)))})},r.prototype.destroyServiceInstance=function(t,e){e===void 0&&(e=!1);var n=e||!!t.type||!!t.factory;if(n){if(typeof(t==null?void 0:t.value).destroy=="function")try{t.value.destroy()}catch{}t.value=A}},r}(),N=function(){function r(){}return r.of=function(t){if(t===void 0&&(t="default"),t==="default")return this.globalInstance;var e=this.instances.find(function(n){return n.id===t});return e||(e=new $t(t),this.instances.push(e)),e},r.has=function(t){return this.globalInstance.has(t)},r.get=function(t){return this.globalInstance.get(t)},r.getMany=function(t){return this.globalInstance.getMany(t)},r.set=function(t,e){return this.globalInstance.set(t,e),this},r.remove=function(t){return this.globalInstance.remove(t),this},r.reset=function(t){if(t===void 0&&(t="default"),t=="default")this.globalInstance.reset(),this.instances.forEach(function(n){return n.reset()});else{var e=this.instances.find(function(n){return n.id===t});e&&(e.reset(),this.instances.splice(this.instances.indexOf(e),1))}return this},r.registerHandler=function(t){return this.handlers.push(t),this},r.import=function(t){return this},r.handlers=[],r.globalInstance=new $t("default"),r.instances=[],r}();function z(r){return function(t){var e={id:t,type:t,factory:void 0,multiple:!1,global:!1,eager:!1,transient:!1,value:A};r instanceof W||typeof r=="string"?e.id=r:r&&(e.id=r.id||t,e.factory=r.factory||void 0,e.multiple=r.multiple||!1,e.global=r.global||!1,e.eager=r.eager||!1,e.transient=r.transient||!1),N.set(e)}}const zt=N;var Xe=Object.defineProperty,Ge=Object.getOwnPropertyDescriptor,Qe=(r,t,e,n)=>{for(var i=n>1?void 0:n?Ge(t,e):t,o=r.length-1,u;o>=0;o--)(u=r[o])&&(i=(n?u(t,e,i):u(i))||i);return n&&i&&Xe(t,e,i),i};let Z=class{encode(r){return btoa(r)}decode(r){return atob(r)}};Z=Qe([z()],Z);class Ze{constructor(t){this.controllers=t}run(){window.addEventListener("DOMContentLoaded",()=>{zt.set(Window,window),this.controllers.forEach(t=>{const e=zt.get(t);e.onInit&&e.onInit()})})}}class Je{constructor(t,e,n){this.height=t,this.width=e,this.ratio=n}getRatio(){return this.ratio}setRatio(t){this.ratio=t}}const Ke="Free mathematic formula drawer",Qt=["ratio","center"];class yt extends Error{}class tr{constructor(t,e){this.name=t,this.content=e}}class R{constructor(t){this.value=t}}class er{constructor(t,e){this.x=t,this.y=e}}class rr{constructor(t,e){this.unit=t,this.pixelsPeerUnit=e}}class T{constructor(t){this.value=t}}function nr(r,t){return new T((r.value-t.width.value/2)/t.getRatio().pixelsPeerUnit)}function ft(r,t){return new R(t.width.value/2+r.value*t.getRatio().pixelsPeerUnit)}function B(r,t){const e=r.value*t.getRatio().pixelsPeerUnit;return new R(t.height.value/2+(e===0?e:-1*e))}class ir extends er{constructor({offsetX:t,offsetY:e}){super(t,e)}}function or(r,t){return new Promise(e=>{const n=new Array,i=new Function(`return function(x) { return ${r.content.toLowerCase().replace(/\s/g,"").trim()}; }`)();for(let o=0;o<t.width.value+1;++o){const u=nr(new R(o),t),l=i(u.value),h=B(new R(l),t).value;h>0&&h<t.height.value&&n.push(new ir({offsetX:o,offsetY:h}))}e(n)})}function sr(r,t){return Promise.all(r.map(e=>or(e,t))).then(e=>e.reduce((n,i)=>n.concat(i),new Array))}function Et(r){return r.reduce((t,e)=>({...t,...e}),{})}var ar=Object.defineProperty,ur=Object.getOwnPropertyDescriptor,fr=(r,t,e,n)=>{for(var i=n>1?void 0:n?ur(t,e):t,o=r.length-1,u;o>=0;o--)(u=r[o])&&(i=(n?u(t,e,i):u(i))||i);return n&&i&&ar(t,e,i),i};let J=class{constructor(r){this.encoder=r.get(Z)}getFiltredQueryParams(r,t){return Et(Object.keys(r).filter(t).map(e=>({[e]:this.encoder.decode(r[e])})))}};J=fr([z()],J);var cr=Object.defineProperty,lr=Object.getOwnPropertyDescriptor,hr=(r,t,e,n)=>{for(var i=n>1?void 0:n?lr(t,e):t,o=r.length-1,u;o>=0;o--)(u=r[o])&&(i=(n?u(t,e,i):u(i))||i);return n&&i&&cr(t,e,i),i};let K=class{constructor(r){this.queryParams$=new De(1),this.window=r.get(Window);const t=new URLSearchParams(this.window.location.search).entries();let e=t.next();const n=[];for(;!e.done;)n.push(e.value),e=t.next();this.queryParams$.next(Et(n.sort((i,o)=>o[0].localeCompare(i[0])).map(i=>({[i[0]]:i[1]}))))}navigate(r){const t=new URL(this.window.location.href);Object.keys(r).forEach(e=>{t.searchParams.set(e,r[e])}),this.window.history.pushState(null,Ke,t.pathname+t.search),this.queryParams$.next(r)}};K=hr([z()],K);var pr=Object.defineProperty,vr=Object.getOwnPropertyDescriptor,dr=(r,t,e,n)=>{for(var i=n>1?void 0:n?vr(t,e):t,o=r.length-1,u;o>=0;o--)(u=r[o])&&(i=(n?u(t,e,i):u(i))||i);return n&&i&&pr(t,e,i),i};let mt=class{constructor(r){this.formulas=new Array,this.center={x:new T(0),y:new T(0)},this.router=r.get(K),this.queryParamsAnalyzer=r.get(J);const e=r.get(Window).document.querySelector("canvas");if(!e)throw new yt;const n=e.getContext("2d");if(!n)throw new yt;this.context=n,this.canvasState=new Je(new R(e.height=e.offsetHeight),new R(e.width=e.offsetWidth),new rr(1,100))}onInit(){this.router.queryParams$.pipe(dt(r=>this.queryParamsAnalyzer.getFiltredQueryParams(r,t=>!Qt.includes(t)))).subscribe(r=>{this.formulas=[],Object.keys(r).forEach(t=>{this.formulas.push(new tr(t,r[t]))}),this.draw()})}async draw(){await Promise.all([new Promise(r=>{this.context.clearRect(0,0,this.canvasState.width.value,this.canvasState.height.value),this.drawDefaultMark(),r()}),sr(this.formulas,this.canvasState).then(r=>{r.forEach(({x:t,y:e})=>{this.context.fillRect(t,e,1,1)})})]).catch(()=>{alert("Invalid operation")})}drawDefaultMark(){const r=this.canvasState.width,t=this.canvasState.height,e=this.center.x.value-r.value/2<0,n=this.center.y.value-t.value/2<0,i=this.center.x.value+r.value/2>0,o=this.center.y.value+t.value/2>0;if(e&&i){this.context.beginPath(),this.context.strokeStyle="red",this.context.lineWidth=1;const h=this.center.x.value>=0?this.center.x:new T(-this.center.x.value),w=ft(h,this.canvasState);this.context.moveTo(w.value,0),this.context.lineTo(w.value,t.value),this.context.stroke()}if(n&&o){this.context.beginPath(),this.context.strokeStyle="grey",this.context.lineWidth=1;const h=this.center.y.value>=0?this.center.y:new T(-this.center.y.value),w=B(h,this.canvasState);this.context.moveTo(0,w.value),this.context.lineTo(r.value,w.value),this.context.stroke()}const u=this.computeMiddleOfUnitsOnAxe(r);for(let h=0-u;h<u;h=h+this.canvasState.getRatio().unit){this.context.beginPath(),this.context.strokeStyle="#000000",this.context.font="12px Arial";const w=ft(new T(h),this.canvasState),_=B(new T(0),this.canvasState);this.context.fillText(h.toString(),w.value-18,_.value-6),this.context.fillRect(w.value,_.value-5,1,10)}const l=this.computeMiddleOfUnitsOnAxe(t);for(let h=0-l;h<l;h=h+this.canvasState.getRatio().unit){this.context.beginPath(),this.context.strokeStyle="#000000",this.context.font="12px Arial";const w=ft(new T(0),this.canvasState),_=B(new T(h),this.canvasState);this.context.fillText(h.toString(),w.value-18,_.value-6),this.context.fillRect(w.value-5,_.value,10,1)}}computeMiddleOfUnitsOnAxe(r){return Math.ceil(Math.ceil(r.value/this.canvasState.getRatio().pixelsPeerUnit)/2)}};mt=dr([z()],mt);var yr=Object.defineProperty,mr=Object.getOwnPropertyDescriptor,br=(r,t,e,n)=>{for(var i=n>1?void 0:n?mr(t,e):t,o=r.length-1,u;o>=0;o--)(u=r[o])&&(i=(n?u(t,e,i):u(i))||i);return n&&i&&yr(t,e,i),i};let bt=class{constructor(r){this.textareas=new Array,this.router=r.get(K),this.encoder=r.get(Z),this.queryParamsAnalyzer=r.get(J);const t=r.get(Window);this.document=t.document;const e=this.document.querySelector("form");if(!e)throw new yt;this.form=e}onInit(){this.router.queryParams$.pipe(Ye(),dt(r=>this.queryParamsAnalyzer.getFiltredQueryParams(r,t=>!Qt.includes(t))),dt(r=>Object.keys(r).length>0?r:{f:""})).subscribe(r=>{Object.keys(r).forEach(t=>{this.createFormulaField({key:t,queryParams:r})})}),this.form.addEventListener("submit",r=>{r.preventDefault();const t=Et(this.textareas.sort((e,n)=>e.name.localeCompare(n.name)).map(e=>({[e.name]:this.encoder.encode(e.value)})));this.router.navigate(t)})}createFormulaField({key:r,queryParams:t}){const e=this.document.createElement("div"),n=this.document.createElement("label");n.textContent=`${r}(x) = `,n.htmlFor=r,e.appendChild(n);const i=this.document.createElement("textarea");i.name=r;const o=t[r];i.value=o,i.placeholder="Formula",i.rows=o.split(`
`).length,i.addEventListener("keypress",u=>{u.code==="Enter"&&(u.shiftKey||(u.preventDefault(),this.form.dispatchEvent(new SubmitEvent("submit"))))}),i.addEventListener("keyup",()=>{const l=i.value.split(`
`).length-i.rows;if(l!==0)for(let h=0;h<Math.abs(l);++h){if(l>0){i.rows++;return}i.rows--}}),e.appendChild(i),this.textareas.push(i),this.form.prepend(e)}};bt=br([z()],bt);new Ze([bt,mt]).run();
