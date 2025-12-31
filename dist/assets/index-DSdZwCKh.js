function Wv(r,e){for(var t=0;t<e.length;t++){const s=e[t];if(typeof s!="string"&&!Array.isArray(s)){for(const o in s)if(o!=="default"&&!(o in r)){const l=Object.getOwnPropertyDescriptor(s,o);l&&Object.defineProperty(r,o,l.get?l:{enumerable:!0,get:()=>s[o]})}}}return Object.freeze(Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function t(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(o){if(o.ep)return;o.ep=!0;const l=t(o);fetch(o.href,l)}})();function fg(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Uc={exports:{}},Go={},Oc={exports:{}},ft={};var _p;function jv(){if(_p)return ft;_p=1;var r=Symbol.for("react.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),c=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),h=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),m=Symbol.iterator;function _(D){return D===null||typeof D!="object"?null:(D=m&&D[m]||D["@@iterator"],typeof D=="function"?D:null)}var S={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},w=Object.assign,M={};function x(D,G,X){this.props=D,this.context=G,this.refs=M,this.updater=X||S}x.prototype.isReactComponent={},x.prototype.setState=function(D,G){if(typeof D!="object"&&typeof D!="function"&&D!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,D,G,"setState")},x.prototype.forceUpdate=function(D){this.updater.enqueueForceUpdate(this,D,"forceUpdate")};function y(){}y.prototype=x.prototype;function A(D,G,X){this.props=D,this.context=G,this.refs=M,this.updater=X||S}var b=A.prototype=new y;b.constructor=A,w(b,x.prototype),b.isPureReactComponent=!0;var L=Array.isArray,B=Object.prototype.hasOwnProperty,U={current:null},I={key:!0,ref:!0,__self:!0,__source:!0};function Q(D,G,X){var te,he={},ve=null,Me=null;if(G!=null)for(te in G.ref!==void 0&&(Me=G.ref),G.key!==void 0&&(ve=""+G.key),G)B.call(G,te)&&!I.hasOwnProperty(te)&&(he[te]=G[te]);var we=arguments.length-2;if(we===1)he.children=X;else if(1<we){for(var Pe=Array(we),Le=0;Le<we;Le++)Pe[Le]=arguments[Le+2];he.children=Pe}if(D&&D.defaultProps)for(te in we=D.defaultProps,we)he[te]===void 0&&(he[te]=we[te]);return{$$typeof:r,type:D,key:ve,ref:Me,props:he,_owner:U.current}}function E(D,G){return{$$typeof:r,type:D.type,key:G,ref:D.ref,props:D.props,_owner:D._owner}}function C(D){return typeof D=="object"&&D!==null&&D.$$typeof===r}function $(D){var G={"=":"=0",":":"=2"};return"$"+D.replace(/[=:]/g,function(X){return G[X]})}var oe=/\/+/g;function de(D,G){return typeof D=="object"&&D!==null&&D.key!=null?$(""+D.key):G.toString(36)}function k(D,G,X,te,he){var ve=typeof D;(ve==="undefined"||ve==="boolean")&&(D=null);var Me=!1;if(D===null)Me=!0;else switch(ve){case"string":case"number":Me=!0;break;case"object":switch(D.$$typeof){case r:case e:Me=!0}}if(Me)return Me=D,he=he(Me),D=te===""?"."+de(Me,0):te,L(he)?(X="",D!=null&&(X=D.replace(oe,"$&/")+"/"),k(he,G,X,"",function(Le){return Le})):he!=null&&(C(he)&&(he=E(he,X+(!he.key||Me&&Me.key===he.key?"":(""+he.key).replace(oe,"$&/")+"/")+D)),G.push(he)),1;if(Me=0,te=te===""?".":te+":",L(D))for(var we=0;we<D.length;we++){ve=D[we];var Pe=te+de(ve,we);Me+=k(ve,G,X,Pe,he)}else if(Pe=_(D),typeof Pe=="function")for(D=Pe.call(D),we=0;!(ve=D.next()).done;)ve=ve.value,Pe=te+de(ve,we++),Me+=k(ve,G,X,Pe,he);else if(ve==="object")throw G=String(D),Error("Objects are not valid as a React child (found: "+(G==="[object Object]"?"object with keys {"+Object.keys(D).join(", ")+"}":G)+"). If you meant to render a collection of children, use an array instead.");return Me}function Y(D,G,X){if(D==null)return D;var te=[],he=0;return k(D,te,"","",function(ve){return G.call(X,ve,he++)}),te}function J(D){if(D._status===-1){var G=D._result;G=G(),G.then(function(X){(D._status===0||D._status===-1)&&(D._status=1,D._result=X)},function(X){(D._status===0||D._status===-1)&&(D._status=2,D._result=X)}),D._status===-1&&(D._status=0,D._result=G)}if(D._status===1)return D._result.default;throw D._result}var ae={current:null},W={transition:null},q={ReactCurrentDispatcher:ae,ReactCurrentBatchConfig:W,ReactCurrentOwner:U};function z(){throw Error("act(...) is not supported in production builds of React.")}return ft.Children={map:Y,forEach:function(D,G,X){Y(D,function(){G.apply(this,arguments)},X)},count:function(D){var G=0;return Y(D,function(){G++}),G},toArray:function(D){return Y(D,function(G){return G})||[]},only:function(D){if(!C(D))throw Error("React.Children.only expected to receive a single React element child.");return D}},ft.Component=x,ft.Fragment=t,ft.Profiler=o,ft.PureComponent=A,ft.StrictMode=s,ft.Suspense=f,ft.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=q,ft.act=z,ft.cloneElement=function(D,G,X){if(D==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+D+".");var te=w({},D.props),he=D.key,ve=D.ref,Me=D._owner;if(G!=null){if(G.ref!==void 0&&(ve=G.ref,Me=U.current),G.key!==void 0&&(he=""+G.key),D.type&&D.type.defaultProps)var we=D.type.defaultProps;for(Pe in G)B.call(G,Pe)&&!I.hasOwnProperty(Pe)&&(te[Pe]=G[Pe]===void 0&&we!==void 0?we[Pe]:G[Pe])}var Pe=arguments.length-2;if(Pe===1)te.children=X;else if(1<Pe){we=Array(Pe);for(var Le=0;Le<Pe;Le++)we[Le]=arguments[Le+2];te.children=we}return{$$typeof:r,type:D.type,key:he,ref:ve,props:te,_owner:Me}},ft.createContext=function(D){return D={$$typeof:c,_currentValue:D,_currentValue2:D,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},D.Provider={$$typeof:l,_context:D},D.Consumer=D},ft.createElement=Q,ft.createFactory=function(D){var G=Q.bind(null,D);return G.type=D,G},ft.createRef=function(){return{current:null}},ft.forwardRef=function(D){return{$$typeof:d,render:D}},ft.isValidElement=C,ft.lazy=function(D){return{$$typeof:g,_payload:{_status:-1,_result:D},_init:J}},ft.memo=function(D,G){return{$$typeof:h,type:D,compare:G===void 0?null:G}},ft.startTransition=function(D){var G=W.transition;W.transition={};try{D()}finally{W.transition=G}},ft.unstable_act=z,ft.useCallback=function(D,G){return ae.current.useCallback(D,G)},ft.useContext=function(D){return ae.current.useContext(D)},ft.useDebugValue=function(){},ft.useDeferredValue=function(D){return ae.current.useDeferredValue(D)},ft.useEffect=function(D,G){return ae.current.useEffect(D,G)},ft.useId=function(){return ae.current.useId()},ft.useImperativeHandle=function(D,G,X){return ae.current.useImperativeHandle(D,G,X)},ft.useInsertionEffect=function(D,G){return ae.current.useInsertionEffect(D,G)},ft.useLayoutEffect=function(D,G){return ae.current.useLayoutEffect(D,G)},ft.useMemo=function(D,G){return ae.current.useMemo(D,G)},ft.useReducer=function(D,G,X){return ae.current.useReducer(D,G,X)},ft.useRef=function(D){return ae.current.useRef(D)},ft.useState=function(D){return ae.current.useState(D)},ft.useSyncExternalStore=function(D,G,X){return ae.current.useSyncExternalStore(D,G,X)},ft.useTransition=function(){return ae.current.useTransition()},ft.version="18.3.1",ft}var xp;function Ud(){return xp||(xp=1,Oc.exports=jv()),Oc.exports}var yp;function Xv(){if(yp)return Go;yp=1;var r=Ud(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,o=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(d,f,h){var g,m={},_=null,S=null;h!==void 0&&(_=""+h),f.key!==void 0&&(_=""+f.key),f.ref!==void 0&&(S=f.ref);for(g in f)s.call(f,g)&&!l.hasOwnProperty(g)&&(m[g]=f[g]);if(d&&d.defaultProps)for(g in f=d.defaultProps,f)m[g]===void 0&&(m[g]=f[g]);return{$$typeof:e,type:d,key:_,ref:S,props:m,_owner:o.current}}return Go.Fragment=t,Go.jsx=c,Go.jsxs=c,Go}var Sp;function Yv(){return Sp||(Sp=1,Uc.exports=Xv()),Uc.exports}var O=Yv(),fe=Ud();const hg=fg(fe),qv=Wv({__proto__:null,default:hg},[fe]);var vl={},Fc={exports:{}},Nn={},kc={exports:{}},Bc={};var Mp;function $v(){return Mp||(Mp=1,(function(r){function e(W,q){var z=W.length;W.push(q);e:for(;0<z;){var D=z-1>>>1,G=W[D];if(0<o(G,q))W[D]=q,W[z]=G,z=D;else break e}}function t(W){return W.length===0?null:W[0]}function s(W){if(W.length===0)return null;var q=W[0],z=W.pop();if(z!==q){W[0]=z;e:for(var D=0,G=W.length,X=G>>>1;D<X;){var te=2*(D+1)-1,he=W[te],ve=te+1,Me=W[ve];if(0>o(he,z))ve<G&&0>o(Me,he)?(W[D]=Me,W[ve]=z,D=ve):(W[D]=he,W[te]=z,D=te);else if(ve<G&&0>o(Me,z))W[D]=Me,W[ve]=z,D=ve;else break e}}return q}function o(W,q){var z=W.sortIndex-q.sortIndex;return z!==0?z:W.id-q.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;r.unstable_now=function(){return l.now()}}else{var c=Date,d=c.now();r.unstable_now=function(){return c.now()-d}}var f=[],h=[],g=1,m=null,_=3,S=!1,w=!1,M=!1,x=typeof setTimeout=="function"?setTimeout:null,y=typeof clearTimeout=="function"?clearTimeout:null,A=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function b(W){for(var q=t(h);q!==null;){if(q.callback===null)s(h);else if(q.startTime<=W)s(h),q.sortIndex=q.expirationTime,e(f,q);else break;q=t(h)}}function L(W){if(M=!1,b(W),!w)if(t(f)!==null)w=!0,J(B);else{var q=t(h);q!==null&&ae(L,q.startTime-W)}}function B(W,q){w=!1,M&&(M=!1,y(Q),Q=-1),S=!0;var z=_;try{for(b(q),m=t(f);m!==null&&(!(m.expirationTime>q)||W&&!$());){var D=m.callback;if(typeof D=="function"){m.callback=null,_=m.priorityLevel;var G=D(m.expirationTime<=q);q=r.unstable_now(),typeof G=="function"?m.callback=G:m===t(f)&&s(f),b(q)}else s(f);m=t(f)}if(m!==null)var X=!0;else{var te=t(h);te!==null&&ae(L,te.startTime-q),X=!1}return X}finally{m=null,_=z,S=!1}}var U=!1,I=null,Q=-1,E=5,C=-1;function $(){return!(r.unstable_now()-C<E)}function oe(){if(I!==null){var W=r.unstable_now();C=W;var q=!0;try{q=I(!0,W)}finally{q?de():(U=!1,I=null)}}else U=!1}var de;if(typeof A=="function")de=function(){A(oe)};else if(typeof MessageChannel<"u"){var k=new MessageChannel,Y=k.port2;k.port1.onmessage=oe,de=function(){Y.postMessage(null)}}else de=function(){x(oe,0)};function J(W){I=W,U||(U=!0,de())}function ae(W,q){Q=x(function(){W(r.unstable_now())},q)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(W){W.callback=null},r.unstable_continueExecution=function(){w||S||(w=!0,J(B))},r.unstable_forceFrameRate=function(W){0>W||125<W?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):E=0<W?Math.floor(1e3/W):5},r.unstable_getCurrentPriorityLevel=function(){return _},r.unstable_getFirstCallbackNode=function(){return t(f)},r.unstable_next=function(W){switch(_){case 1:case 2:case 3:var q=3;break;default:q=_}var z=_;_=q;try{return W()}finally{_=z}},r.unstable_pauseExecution=function(){},r.unstable_requestPaint=function(){},r.unstable_runWithPriority=function(W,q){switch(W){case 1:case 2:case 3:case 4:case 5:break;default:W=3}var z=_;_=W;try{return q()}finally{_=z}},r.unstable_scheduleCallback=function(W,q,z){var D=r.unstable_now();switch(typeof z=="object"&&z!==null?(z=z.delay,z=typeof z=="number"&&0<z?D+z:D):z=D,W){case 1:var G=-1;break;case 2:G=250;break;case 5:G=1073741823;break;case 4:G=1e4;break;default:G=5e3}return G=z+G,W={id:g++,callback:q,priorityLevel:W,startTime:z,expirationTime:G,sortIndex:-1},z>D?(W.sortIndex=z,e(h,W),t(f)===null&&W===t(h)&&(M?(y(Q),Q=-1):M=!0,ae(L,z-D))):(W.sortIndex=G,e(f,W),w||S||(w=!0,J(B))),W},r.unstable_shouldYield=$,r.unstable_wrapCallback=function(W){var q=_;return function(){var z=_;_=q;try{return W.apply(this,arguments)}finally{_=z}}}})(Bc)),Bc}var Ep;function Kv(){return Ep||(Ep=1,kc.exports=$v()),kc.exports}var Tp;function Zv(){if(Tp)return Nn;Tp=1;var r=Ud(),e=Kv();function t(n){for(var i="https://reactjs.org/docs/error-decoder.html?invariant="+n,a=1;a<arguments.length;a++)i+="&args[]="+encodeURIComponent(arguments[a]);return"Minified React error #"+n+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var s=new Set,o={};function l(n,i){c(n,i),c(n+"Capture",i)}function c(n,i){for(o[n]=i,n=0;n<i.length;n++)s.add(i[n])}var d=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),f=Object.prototype.hasOwnProperty,h=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,g={},m={};function _(n){return f.call(m,n)?!0:f.call(g,n)?!1:h.test(n)?m[n]=!0:(g[n]=!0,!1)}function S(n,i,a,u){if(a!==null&&a.type===0)return!1;switch(typeof i){case"function":case"symbol":return!0;case"boolean":return u?!1:a!==null?!a.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function w(n,i,a,u){if(i===null||typeof i>"u"||S(n,i,a,u))return!0;if(u)return!1;if(a!==null)switch(a.type){case 3:return!i;case 4:return i===!1;case 5:return isNaN(i);case 6:return isNaN(i)||1>i}return!1}function M(n,i,a,u,p,v,T){this.acceptsBooleans=i===2||i===3||i===4,this.attributeName=u,this.attributeNamespace=p,this.mustUseProperty=a,this.propertyName=n,this.type=i,this.sanitizeURL=v,this.removeEmptyString=T}var x={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){x[n]=new M(n,0,!1,n,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var i=n[0];x[i]=new M(i,1,!1,n[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(n){x[n]=new M(n,2,!1,n.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){x[n]=new M(n,2,!1,n,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){x[n]=new M(n,3,!1,n.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(n){x[n]=new M(n,3,!0,n,null,!1,!1)}),["capture","download"].forEach(function(n){x[n]=new M(n,4,!1,n,null,!1,!1)}),["cols","rows","size","span"].forEach(function(n){x[n]=new M(n,6,!1,n,null,!1,!1)}),["rowSpan","start"].forEach(function(n){x[n]=new M(n,5,!1,n.toLowerCase(),null,!1,!1)});var y=/[\-:]([a-z])/g;function A(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var i=n.replace(y,A);x[i]=new M(i,1,!1,n,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var i=n.replace(y,A);x[i]=new M(i,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(n){var i=n.replace(y,A);x[i]=new M(i,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(n){x[n]=new M(n,1,!1,n.toLowerCase(),null,!1,!1)}),x.xlinkHref=new M("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(n){x[n]=new M(n,1,!1,n.toLowerCase(),null,!0,!0)});function b(n,i,a,u){var p=x.hasOwnProperty(i)?x[i]:null;(p!==null?p.type!==0:u||!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(w(i,a,p,u)&&(a=null),u||p===null?_(i)&&(a===null?n.removeAttribute(i):n.setAttribute(i,""+a)):p.mustUseProperty?n[p.propertyName]=a===null?p.type===3?!1:"":a:(i=p.attributeName,u=p.attributeNamespace,a===null?n.removeAttribute(i):(p=p.type,a=p===3||p===4&&a===!0?"":""+a,u?n.setAttributeNS(u,i,a):n.setAttribute(i,a))))}var L=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,B=Symbol.for("react.element"),U=Symbol.for("react.portal"),I=Symbol.for("react.fragment"),Q=Symbol.for("react.strict_mode"),E=Symbol.for("react.profiler"),C=Symbol.for("react.provider"),$=Symbol.for("react.context"),oe=Symbol.for("react.forward_ref"),de=Symbol.for("react.suspense"),k=Symbol.for("react.suspense_list"),Y=Symbol.for("react.memo"),J=Symbol.for("react.lazy"),ae=Symbol.for("react.offscreen"),W=Symbol.iterator;function q(n){return n===null||typeof n!="object"?null:(n=W&&n[W]||n["@@iterator"],typeof n=="function"?n:null)}var z=Object.assign,D;function G(n){if(D===void 0)try{throw Error()}catch(a){var i=a.stack.trim().match(/\n( *(at )?)/);D=i&&i[1]||""}return`
`+D+n}var X=!1;function te(n,i){if(!n||X)return"";X=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(i)if(i=function(){throw Error()},Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(re){var u=re}Reflect.construct(n,[],i)}else{try{i.call()}catch(re){u=re}n.call(i.prototype)}else{try{throw Error()}catch(re){u=re}n()}}catch(re){if(re&&u&&typeof re.stack=="string"){for(var p=re.stack.split(`
`),v=u.stack.split(`
`),T=p.length-1,F=v.length-1;1<=T&&0<=F&&p[T]!==v[F];)F--;for(;1<=T&&0<=F;T--,F--)if(p[T]!==v[F]){if(T!==1||F!==1)do if(T--,F--,0>F||p[T]!==v[F]){var H=`
`+p[T].replace(" at new "," at ");return n.displayName&&H.includes("<anonymous>")&&(H=H.replace("<anonymous>",n.displayName)),H}while(1<=T&&0<=F);break}}}finally{X=!1,Error.prepareStackTrace=a}return(n=n?n.displayName||n.name:"")?G(n):""}function he(n){switch(n.tag){case 5:return G(n.type);case 16:return G("Lazy");case 13:return G("Suspense");case 19:return G("SuspenseList");case 0:case 2:case 15:return n=te(n.type,!1),n;case 11:return n=te(n.type.render,!1),n;case 1:return n=te(n.type,!0),n;default:return""}}function ve(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case I:return"Fragment";case U:return"Portal";case E:return"Profiler";case Q:return"StrictMode";case de:return"Suspense";case k:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case $:return(n.displayName||"Context")+".Consumer";case C:return(n._context.displayName||"Context")+".Provider";case oe:var i=n.render;return n=n.displayName,n||(n=i.displayName||i.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case Y:return i=n.displayName||null,i!==null?i:ve(n.type)||"Memo";case J:i=n._payload,n=n._init;try{return ve(n(i))}catch{}}return null}function Me(n){var i=n.type;switch(n.tag){case 24:return"Cache";case 9:return(i.displayName||"Context")+".Consumer";case 10:return(i._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=i.render,n=n.displayName||n.name||"",i.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ve(i);case 8:return i===Q?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof i=="function")return i.displayName||i.name||null;if(typeof i=="string")return i}return null}function we(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function Pe(n){var i=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Le(n){var i=Pe(n)?"checked":"value",a=Object.getOwnPropertyDescriptor(n.constructor.prototype,i),u=""+n[i];if(!n.hasOwnProperty(i)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var p=a.get,v=a.set;return Object.defineProperty(n,i,{configurable:!0,get:function(){return p.call(this)},set:function(T){u=""+T,v.call(this,T)}}),Object.defineProperty(n,i,{enumerable:a.enumerable}),{getValue:function(){return u},setValue:function(T){u=""+T},stopTracking:function(){n._valueTracker=null,delete n[i]}}}}function et(n){n._valueTracker||(n._valueTracker=Le(n))}function ie(n){if(!n)return!1;var i=n._valueTracker;if(!i)return!0;var a=i.getValue(),u="";return n&&(u=Pe(n)?n.checked?"true":"false":n.value),n=u,n!==a?(i.setValue(n),!0):!1}function kt(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function We(n,i){var a=i.checked;return z({},i,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:a??n._wrapperState.initialChecked})}function Ze(n,i){var a=i.defaultValue==null?"":i.defaultValue,u=i.checked!=null?i.checked:i.defaultChecked;a=we(i.value!=null?i.value:a),n._wrapperState={initialChecked:u,initialValue:a,controlled:i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null}}function Be(n,i){i=i.checked,i!=null&&b(n,"checked",i,!1)}function Mt(n,i){Be(n,i);var a=we(i.value),u=i.type;if(a!=null)u==="number"?(a===0&&n.value===""||n.value!=a)&&(n.value=""+a):n.value!==""+a&&(n.value=""+a);else if(u==="submit"||u==="reset"){n.removeAttribute("value");return}i.hasOwnProperty("value")?N(n,i.type,a):i.hasOwnProperty("defaultValue")&&N(n,i.type,we(i.defaultValue)),i.checked==null&&i.defaultChecked!=null&&(n.defaultChecked=!!i.defaultChecked)}function st(n,i,a){if(i.hasOwnProperty("value")||i.hasOwnProperty("defaultValue")){var u=i.type;if(!(u!=="submit"&&u!=="reset"||i.value!==void 0&&i.value!==null))return;i=""+n._wrapperState.initialValue,a||i===n.value||(n.value=i),n.defaultValue=i}a=n.name,a!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,a!==""&&(n.name=a)}function N(n,i,a){(i!=="number"||kt(n.ownerDocument)!==n)&&(a==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+a&&(n.defaultValue=""+a))}var R=Array.isArray;function ne(n,i,a,u){if(n=n.options,i){i={};for(var p=0;p<a.length;p++)i["$"+a[p]]=!0;for(a=0;a<n.length;a++)p=i.hasOwnProperty("$"+n[a].value),n[a].selected!==p&&(n[a].selected=p),p&&u&&(n[a].defaultSelected=!0)}else{for(a=""+we(a),i=null,p=0;p<n.length;p++){if(n[p].value===a){n[p].selected=!0,u&&(n[p].defaultSelected=!0);return}i!==null||n[p].disabled||(i=n[p])}i!==null&&(i.selected=!0)}}function ye(n,i){if(i.dangerouslySetInnerHTML!=null)throw Error(t(91));return z({},i,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function _e(n,i){var a=i.value;if(a==null){if(a=i.children,i=i.defaultValue,a!=null){if(i!=null)throw Error(t(92));if(R(a)){if(1<a.length)throw Error(t(93));a=a[0]}i=a}i==null&&(i=""),a=i}n._wrapperState={initialValue:we(a)}}function Se(n,i){var a=we(i.value),u=we(i.defaultValue);a!=null&&(a=""+a,a!==n.value&&(n.value=a),i.defaultValue==null&&n.defaultValue!==a&&(n.defaultValue=a)),u!=null&&(n.defaultValue=""+u)}function Ge(n){var i=n.textContent;i===n._wrapperState.initialValue&&i!==""&&i!==null&&(n.value=i)}function Re(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Oe(n,i){return n==null||n==="http://www.w3.org/1999/xhtml"?Re(i):n==="http://www.w3.org/2000/svg"&&i==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var Xe,ot=(function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(i,a,u,p){MSApp.execUnsafeLocalFunction(function(){return n(i,a,u,p)})}:n})(function(n,i){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=i;else{for(Xe=Xe||document.createElement("div"),Xe.innerHTML="<svg>"+i.valueOf().toString()+"</svg>",i=Xe.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;i.firstChild;)n.appendChild(i.firstChild)}});function ge(n,i){if(i){var a=n.firstChild;if(a&&a===n.lastChild&&a.nodeType===3){a.nodeValue=i;return}}n.textContent=i}var pt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},dt=["Webkit","ms","Moz","O"];Object.keys(pt).forEach(function(n){dt.forEach(function(i){i=i+n.charAt(0).toUpperCase()+n.substring(1),pt[i]=pt[n]})});function tt(n,i,a){return i==null||typeof i=="boolean"||i===""?"":a||typeof i!="number"||i===0||pt.hasOwnProperty(n)&&pt[n]?(""+i).trim():i+"px"}function je(n,i){n=n.style;for(var a in i)if(i.hasOwnProperty(a)){var u=a.indexOf("--")===0,p=tt(a,i[a],u);a==="float"&&(a="cssFloat"),u?n.setProperty(a,p):n[a]=p}}var ke=z({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function it(n,i){if(i){if(ke[n]&&(i.children!=null||i.dangerouslySetInnerHTML!=null))throw Error(t(137,n));if(i.dangerouslySetInnerHTML!=null){if(i.children!=null)throw Error(t(60));if(typeof i.dangerouslySetInnerHTML!="object"||!("__html"in i.dangerouslySetInnerHTML))throw Error(t(61))}if(i.style!=null&&typeof i.style!="object")throw Error(t(62))}}function gt(n,i){if(n.indexOf("-")===-1)return typeof i.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ct=null;function at(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var Te=null,V=null,Ae=null;function be(n){if(n=Co(n)){if(typeof Te!="function")throw Error(t(280));var i=n.stateNode;i&&(i=Da(i),Te(n.stateNode,n.type,i))}}function Qe(n){V?Ae?Ae.push(n):Ae=[n]:V=n}function Ye(){if(V){var n=V,i=Ae;if(Ae=V=null,be(n),i)for(n=0;n<i.length;n++)be(i[n])}}function Et(n,i){return n(i)}function Tt(){}var Bt=!1;function Jt(n,i,a){if(Bt)return n(i,a);Bt=!0;try{return Et(n,i,a)}finally{Bt=!1,(V!==null||Ae!==null)&&(Tt(),Ye())}}function _t(n,i){var a=n.stateNode;if(a===null)return null;var u=Da(a);if(u===null)return null;a=u[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(u=!u.disabled)||(n=n.type,u=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!u;break e;default:n=!1}if(n)return null;if(a&&typeof a!="function")throw Error(t(231,i,typeof a));return a}var Yt=!1;if(d)try{var cn={};Object.defineProperty(cn,"passive",{get:function(){Yt=!0}}),window.addEventListener("test",cn,cn),window.removeEventListener("test",cn,cn)}catch{Yt=!1}function da(n,i,a,u,p,v,T,F,H){var re=Array.prototype.slice.call(arguments,3);try{i.apply(a,re)}catch(me){this.onError(me)}}var Pr=!1,Ci=null,Dr=!1,Ki=null,fa={onError:function(n){Pr=!0,Ci=n}};function ha(n,i,a,u,p,v,T,F,H){Pr=!1,Ci=null,da.apply(fa,arguments)}function iu(n,i,a,u,p,v,T,F,H){if(ha.apply(this,arguments),Pr){if(Pr){var re=Ci;Pr=!1,Ci=null}else throw Error(t(198));Dr||(Dr=!0,Ki=re)}}function bi(n){var i=n,a=n;if(n.alternate)for(;i.return;)i=i.return;else{n=i;do i=n,(i.flags&4098)!==0&&(a=i.return),n=i.return;while(n)}return i.tag===3?a:null}function pa(n){if(n.tag===13){var i=n.memoizedState;if(i===null&&(n=n.alternate,n!==null&&(i=n.memoizedState)),i!==null)return i.dehydrated}return null}function P(n){if(bi(n)!==n)throw Error(t(188))}function Z(n){var i=n.alternate;if(!i){if(i=bi(n),i===null)throw Error(t(188));return i!==n?null:n}for(var a=n,u=i;;){var p=a.return;if(p===null)break;var v=p.alternate;if(v===null){if(u=p.return,u!==null){a=u;continue}break}if(p.child===v.child){for(v=p.child;v;){if(v===a)return P(p),n;if(v===u)return P(p),i;v=v.sibling}throw Error(t(188))}if(a.return!==u.return)a=p,u=v;else{for(var T=!1,F=p.child;F;){if(F===a){T=!0,a=p,u=v;break}if(F===u){T=!0,u=p,a=v;break}F=F.sibling}if(!T){for(F=v.child;F;){if(F===a){T=!0,a=v,u=p;break}if(F===u){T=!0,u=v,a=p;break}F=F.sibling}if(!T)throw Error(t(189))}}if(a.alternate!==u)throw Error(t(190))}if(a.tag!==3)throw Error(t(188));return a.stateNode.current===a?n:i}function le(n){return n=Z(n),n!==null?ce(n):null}function ce(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var i=ce(n);if(i!==null)return i;n=n.sibling}return null}var se=e.unstable_scheduleCallback,De=e.unstable_cancelCallback,Ve=e.unstable_shouldYield,Ke=e.unstable_requestPaint,Ne=e.unstable_now,lt=e.unstable_getCurrentPriorityLevel,nt=e.unstable_ImmediatePriority,rt=e.unstable_UserBlockingPriority,bt=e.unstable_NormalPriority,xn=e.unstable_LowPriority,Gt=e.unstable_IdlePriority,Cn=null,mt=null;function ut(n){if(mt&&typeof mt.onCommitFiberRoot=="function")try{mt.onCommitFiberRoot(Cn,n,void 0,(n.current.flags&128)===128)}catch{}}var yn=Math.clz32?Math.clz32:ma,It=Math.log,Ri=Math.LN2;function ma(n){return n>>>=0,n===0?32:31-(It(n)/Ri|0)|0}var xi=64,Zi=4194304;function zt(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function $n(n,i){var a=n.pendingLanes;if(a===0)return 0;var u=0,p=n.suspendedLanes,v=n.pingedLanes,T=a&268435455;if(T!==0){var F=T&~p;F!==0?u=zt(F):(v&=T,v!==0&&(u=zt(v)))}else T=a&~p,T!==0?u=zt(T):v!==0&&(u=zt(v));if(u===0)return 0;if(i!==0&&i!==u&&(i&p)===0&&(p=u&-u,v=i&-i,p>=v||p===16&&(v&4194240)!==0))return i;if((u&4)!==0&&(u|=a&16),i=n.entangledLanes,i!==0)for(n=n.entanglements,i&=u;0<i;)a=31-yn(i),p=1<<a,u|=n[a],i&=~p;return u}function lo(n,i){switch(n){case 1:case 2:case 4:return i+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function bn(n,i){for(var a=n.suspendedLanes,u=n.pingedLanes,p=n.expirationTimes,v=n.pendingLanes;0<v;){var T=31-yn(v),F=1<<T,H=p[T];H===-1?((F&a)===0||(F&u)!==0)&&(p[T]=lo(F,i)):H<=i&&(n.expiredLanes|=F),v&=~F}}function Ir(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function ga(){var n=xi;return xi<<=1,(xi&4194240)===0&&(xi=64),n}function as(n){for(var i=[],a=0;31>a;a++)i.push(n);return i}function uo(n,i,a){n.pendingLanes|=i,i!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,i=31-yn(i),n[i]=a}function d0(n,i){var a=n.pendingLanes&~i;n.pendingLanes=i,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=i,n.mutableReadLanes&=i,n.entangledLanes&=i,i=n.entanglements;var u=n.eventTimes;for(n=n.expirationTimes;0<a;){var p=31-yn(a),v=1<<p;i[p]=0,u[p]=-1,n[p]=-1,a&=~v}}function ru(n,i){var a=n.entangledLanes|=i;for(n=n.entanglements;a;){var u=31-yn(a),p=1<<u;p&i|n[u]&i&&(n[u]|=i),a&=~p}}var wt=0;function $d(n){return n&=-n,1<n?4<n?(n&268435455)!==0?16:536870912:4:1}var Kd,su,Zd,Qd,Jd,ou=!1,va=[],Qi=null,Ji=null,er=null,co=new Map,fo=new Map,tr=[],f0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ef(n,i){switch(n){case"focusin":case"focusout":Qi=null;break;case"dragenter":case"dragleave":Ji=null;break;case"mouseover":case"mouseout":er=null;break;case"pointerover":case"pointerout":co.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":fo.delete(i.pointerId)}}function ho(n,i,a,u,p,v){return n===null||n.nativeEvent!==v?(n={blockedOn:i,domEventName:a,eventSystemFlags:u,nativeEvent:v,targetContainers:[p]},i!==null&&(i=Co(i),i!==null&&su(i)),n):(n.eventSystemFlags|=u,i=n.targetContainers,p!==null&&i.indexOf(p)===-1&&i.push(p),n)}function h0(n,i,a,u,p){switch(i){case"focusin":return Qi=ho(Qi,n,i,a,u,p),!0;case"dragenter":return Ji=ho(Ji,n,i,a,u,p),!0;case"mouseover":return er=ho(er,n,i,a,u,p),!0;case"pointerover":var v=p.pointerId;return co.set(v,ho(co.get(v)||null,n,i,a,u,p)),!0;case"gotpointercapture":return v=p.pointerId,fo.set(v,ho(fo.get(v)||null,n,i,a,u,p)),!0}return!1}function tf(n){var i=Nr(n.target);if(i!==null){var a=bi(i);if(a!==null){if(i=a.tag,i===13){if(i=pa(a),i!==null){n.blockedOn=i,Jd(n.priority,function(){Zd(a)});return}}else if(i===3&&a.stateNode.current.memoizedState.isDehydrated){n.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}n.blockedOn=null}function _a(n){if(n.blockedOn!==null)return!1;for(var i=n.targetContainers;0<i.length;){var a=lu(n.domEventName,n.eventSystemFlags,i[0],n.nativeEvent);if(a===null){a=n.nativeEvent;var u=new a.constructor(a.type,a);Ct=u,a.target.dispatchEvent(u),Ct=null}else return i=Co(a),i!==null&&su(i),n.blockedOn=a,!1;i.shift()}return!0}function nf(n,i,a){_a(n)&&a.delete(i)}function p0(){ou=!1,Qi!==null&&_a(Qi)&&(Qi=null),Ji!==null&&_a(Ji)&&(Ji=null),er!==null&&_a(er)&&(er=null),co.forEach(nf),fo.forEach(nf)}function po(n,i){n.blockedOn===i&&(n.blockedOn=null,ou||(ou=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,p0)))}function mo(n){function i(p){return po(p,n)}if(0<va.length){po(va[0],n);for(var a=1;a<va.length;a++){var u=va[a];u.blockedOn===n&&(u.blockedOn=null)}}for(Qi!==null&&po(Qi,n),Ji!==null&&po(Ji,n),er!==null&&po(er,n),co.forEach(i),fo.forEach(i),a=0;a<tr.length;a++)u=tr[a],u.blockedOn===n&&(u.blockedOn=null);for(;0<tr.length&&(a=tr[0],a.blockedOn===null);)tf(a),a.blockedOn===null&&tr.shift()}var ls=L.ReactCurrentBatchConfig,xa=!0;function m0(n,i,a,u){var p=wt,v=ls.transition;ls.transition=null;try{wt=1,au(n,i,a,u)}finally{wt=p,ls.transition=v}}function g0(n,i,a,u){var p=wt,v=ls.transition;ls.transition=null;try{wt=4,au(n,i,a,u)}finally{wt=p,ls.transition=v}}function au(n,i,a,u){if(xa){var p=lu(n,i,a,u);if(p===null)wu(n,i,u,ya,a),ef(n,u);else if(h0(p,n,i,a,u))u.stopPropagation();else if(ef(n,u),i&4&&-1<f0.indexOf(n)){for(;p!==null;){var v=Co(p);if(v!==null&&Kd(v),v=lu(n,i,a,u),v===null&&wu(n,i,u,ya,a),v===p)break;p=v}p!==null&&u.stopPropagation()}else wu(n,i,u,null,a)}}var ya=null;function lu(n,i,a,u){if(ya=null,n=at(u),n=Nr(n),n!==null)if(i=bi(n),i===null)n=null;else if(a=i.tag,a===13){if(n=pa(i),n!==null)return n;n=null}else if(a===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;n=null}else i!==n&&(n=null);return ya=n,null}function rf(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(lt()){case nt:return 1;case rt:return 4;case bt:case xn:return 16;case Gt:return 536870912;default:return 16}default:return 16}}var nr=null,uu=null,Sa=null;function sf(){if(Sa)return Sa;var n,i=uu,a=i.length,u,p="value"in nr?nr.value:nr.textContent,v=p.length;for(n=0;n<a&&i[n]===p[n];n++);var T=a-n;for(u=1;u<=T&&i[a-u]===p[v-u];u++);return Sa=p.slice(n,1<u?1-u:void 0)}function Ma(n){var i=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&i===13&&(n=13)):n=i,n===10&&(n=13),32<=n||n===13?n:0}function Ea(){return!0}function of(){return!1}function zn(n){function i(a,u,p,v,T){this._reactName=a,this._targetInst=p,this.type=u,this.nativeEvent=v,this.target=T,this.currentTarget=null;for(var F in n)n.hasOwnProperty(F)&&(a=n[F],this[F]=a?a(v):v[F]);return this.isDefaultPrevented=(v.defaultPrevented!=null?v.defaultPrevented:v.returnValue===!1)?Ea:of,this.isPropagationStopped=of,this}return z(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Ea)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Ea)},persist:function(){},isPersistent:Ea}),i}var us={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},cu=zn(us),go=z({},us,{view:0,detail:0}),v0=zn(go),du,fu,vo,Ta=z({},go,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:pu,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==vo&&(vo&&n.type==="mousemove"?(du=n.screenX-vo.screenX,fu=n.screenY-vo.screenY):fu=du=0,vo=n),du)},movementY:function(n){return"movementY"in n?n.movementY:fu}}),af=zn(Ta),_0=z({},Ta,{dataTransfer:0}),x0=zn(_0),y0=z({},go,{relatedTarget:0}),hu=zn(y0),S0=z({},us,{animationName:0,elapsedTime:0,pseudoElement:0}),M0=zn(S0),E0=z({},us,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),T0=zn(E0),w0=z({},us,{data:0}),lf=zn(w0),A0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},C0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},b0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function R0(n){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(n):(n=b0[n])?!!i[n]:!1}function pu(){return R0}var L0=z({},go,{key:function(n){if(n.key){var i=A0[n.key]||n.key;if(i!=="Unidentified")return i}return n.type==="keypress"?(n=Ma(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?C0[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:pu,charCode:function(n){return n.type==="keypress"?Ma(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?Ma(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),P0=zn(L0),D0=z({},Ta,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),uf=zn(D0),I0=z({},go,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:pu}),N0=zn(I0),U0=z({},us,{propertyName:0,elapsedTime:0,pseudoElement:0}),O0=zn(U0),F0=z({},Ta,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),k0=zn(F0),B0=[9,13,27,32],mu=d&&"CompositionEvent"in window,_o=null;d&&"documentMode"in document&&(_o=document.documentMode);var z0=d&&"TextEvent"in window&&!_o,cf=d&&(!mu||_o&&8<_o&&11>=_o),df=" ",ff=!1;function hf(n,i){switch(n){case"keyup":return B0.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function pf(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var cs=!1;function H0(n,i){switch(n){case"compositionend":return pf(i);case"keypress":return i.which!==32?null:(ff=!0,df);case"textInput":return n=i.data,n===df&&ff?null:n;default:return null}}function G0(n,i){if(cs)return n==="compositionend"||!mu&&hf(n,i)?(n=sf(),Sa=uu=nr=null,cs=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return cf&&i.locale!=="ko"?null:i.data;default:return null}}var V0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function mf(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i==="input"?!!V0[n.type]:i==="textarea"}function gf(n,i,a,u){Qe(u),i=Ra(i,"onChange"),0<i.length&&(a=new cu("onChange","change",null,a,u),n.push({event:a,listeners:i}))}var xo=null,yo=null;function W0(n){Nf(n,0)}function wa(n){var i=ms(n);if(ie(i))return n}function j0(n,i){if(n==="change")return i}var vf=!1;if(d){var gu;if(d){var vu="oninput"in document;if(!vu){var _f=document.createElement("div");_f.setAttribute("oninput","return;"),vu=typeof _f.oninput=="function"}gu=vu}else gu=!1;vf=gu&&(!document.documentMode||9<document.documentMode)}function xf(){xo&&(xo.detachEvent("onpropertychange",yf),yo=xo=null)}function yf(n){if(n.propertyName==="value"&&wa(yo)){var i=[];gf(i,yo,n,at(n)),Jt(W0,i)}}function X0(n,i,a){n==="focusin"?(xf(),xo=i,yo=a,xo.attachEvent("onpropertychange",yf)):n==="focusout"&&xf()}function Y0(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return wa(yo)}function q0(n,i){if(n==="click")return wa(i)}function $0(n,i){if(n==="input"||n==="change")return wa(i)}function K0(n,i){return n===i&&(n!==0||1/n===1/i)||n!==n&&i!==i}var ai=typeof Object.is=="function"?Object.is:K0;function So(n,i){if(ai(n,i))return!0;if(typeof n!="object"||n===null||typeof i!="object"||i===null)return!1;var a=Object.keys(n),u=Object.keys(i);if(a.length!==u.length)return!1;for(u=0;u<a.length;u++){var p=a[u];if(!f.call(i,p)||!ai(n[p],i[p]))return!1}return!0}function Sf(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function Mf(n,i){var a=Sf(n);n=0;for(var u;a;){if(a.nodeType===3){if(u=n+a.textContent.length,n<=i&&u>=i)return{node:a,offset:i-n};n=u}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=Sf(a)}}function Ef(n,i){return n&&i?n===i?!0:n&&n.nodeType===3?!1:i&&i.nodeType===3?Ef(n,i.parentNode):"contains"in n?n.contains(i):n.compareDocumentPosition?!!(n.compareDocumentPosition(i)&16):!1:!1}function Tf(){for(var n=window,i=kt();i instanceof n.HTMLIFrameElement;){try{var a=typeof i.contentWindow.location.href=="string"}catch{a=!1}if(a)n=i.contentWindow;else break;i=kt(n.document)}return i}function _u(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i&&(i==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||i==="textarea"||n.contentEditable==="true")}function Z0(n){var i=Tf(),a=n.focusedElem,u=n.selectionRange;if(i!==a&&a&&a.ownerDocument&&Ef(a.ownerDocument.documentElement,a)){if(u!==null&&_u(a)){if(i=u.start,n=u.end,n===void 0&&(n=i),"selectionStart"in a)a.selectionStart=i,a.selectionEnd=Math.min(n,a.value.length);else if(n=(i=a.ownerDocument||document)&&i.defaultView||window,n.getSelection){n=n.getSelection();var p=a.textContent.length,v=Math.min(u.start,p);u=u.end===void 0?v:Math.min(u.end,p),!n.extend&&v>u&&(p=u,u=v,v=p),p=Mf(a,v);var T=Mf(a,u);p&&T&&(n.rangeCount!==1||n.anchorNode!==p.node||n.anchorOffset!==p.offset||n.focusNode!==T.node||n.focusOffset!==T.offset)&&(i=i.createRange(),i.setStart(p.node,p.offset),n.removeAllRanges(),v>u?(n.addRange(i),n.extend(T.node,T.offset)):(i.setEnd(T.node,T.offset),n.addRange(i)))}}for(i=[],n=a;n=n.parentNode;)n.nodeType===1&&i.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof a.focus=="function"&&a.focus(),a=0;a<i.length;a++)n=i[a],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var Q0=d&&"documentMode"in document&&11>=document.documentMode,ds=null,xu=null,Mo=null,yu=!1;function wf(n,i,a){var u=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;yu||ds==null||ds!==kt(u)||(u=ds,"selectionStart"in u&&_u(u)?u={start:u.selectionStart,end:u.selectionEnd}:(u=(u.ownerDocument&&u.ownerDocument.defaultView||window).getSelection(),u={anchorNode:u.anchorNode,anchorOffset:u.anchorOffset,focusNode:u.focusNode,focusOffset:u.focusOffset}),Mo&&So(Mo,u)||(Mo=u,u=Ra(xu,"onSelect"),0<u.length&&(i=new cu("onSelect","select",null,i,a),n.push({event:i,listeners:u}),i.target=ds)))}function Aa(n,i){var a={};return a[n.toLowerCase()]=i.toLowerCase(),a["Webkit"+n]="webkit"+i,a["Moz"+n]="moz"+i,a}var fs={animationend:Aa("Animation","AnimationEnd"),animationiteration:Aa("Animation","AnimationIteration"),animationstart:Aa("Animation","AnimationStart"),transitionend:Aa("Transition","TransitionEnd")},Su={},Af={};d&&(Af=document.createElement("div").style,"AnimationEvent"in window||(delete fs.animationend.animation,delete fs.animationiteration.animation,delete fs.animationstart.animation),"TransitionEvent"in window||delete fs.transitionend.transition);function Ca(n){if(Su[n])return Su[n];if(!fs[n])return n;var i=fs[n],a;for(a in i)if(i.hasOwnProperty(a)&&a in Af)return Su[n]=i[a];return n}var Cf=Ca("animationend"),bf=Ca("animationiteration"),Rf=Ca("animationstart"),Lf=Ca("transitionend"),Pf=new Map,Df="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function ir(n,i){Pf.set(n,i),l(i,[n])}for(var Mu=0;Mu<Df.length;Mu++){var Eu=Df[Mu],J0=Eu.toLowerCase(),ev=Eu[0].toUpperCase()+Eu.slice(1);ir(J0,"on"+ev)}ir(Cf,"onAnimationEnd"),ir(bf,"onAnimationIteration"),ir(Rf,"onAnimationStart"),ir("dblclick","onDoubleClick"),ir("focusin","onFocus"),ir("focusout","onBlur"),ir(Lf,"onTransitionEnd"),c("onMouseEnter",["mouseout","mouseover"]),c("onMouseLeave",["mouseout","mouseover"]),c("onPointerEnter",["pointerout","pointerover"]),c("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Eo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),tv=new Set("cancel close invalid load scroll toggle".split(" ").concat(Eo));function If(n,i,a){var u=n.type||"unknown-event";n.currentTarget=a,iu(u,i,void 0,n),n.currentTarget=null}function Nf(n,i){i=(i&4)!==0;for(var a=0;a<n.length;a++){var u=n[a],p=u.event;u=u.listeners;e:{var v=void 0;if(i)for(var T=u.length-1;0<=T;T--){var F=u[T],H=F.instance,re=F.currentTarget;if(F=F.listener,H!==v&&p.isPropagationStopped())break e;If(p,F,re),v=H}else for(T=0;T<u.length;T++){if(F=u[T],H=F.instance,re=F.currentTarget,F=F.listener,H!==v&&p.isPropagationStopped())break e;If(p,F,re),v=H}}}if(Dr)throw n=Ki,Dr=!1,Ki=null,n}function Lt(n,i){var a=i[Pu];a===void 0&&(a=i[Pu]=new Set);var u=n+"__bubble";a.has(u)||(Uf(i,n,2,!1),a.add(u))}function Tu(n,i,a){var u=0;i&&(u|=4),Uf(a,n,u,i)}var ba="_reactListening"+Math.random().toString(36).slice(2);function To(n){if(!n[ba]){n[ba]=!0,s.forEach(function(a){a!=="selectionchange"&&(tv.has(a)||Tu(a,!1,n),Tu(a,!0,n))});var i=n.nodeType===9?n:n.ownerDocument;i===null||i[ba]||(i[ba]=!0,Tu("selectionchange",!1,i))}}function Uf(n,i,a,u){switch(rf(i)){case 1:var p=m0;break;case 4:p=g0;break;default:p=au}a=p.bind(null,i,a,n),p=void 0,!Yt||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(p=!0),u?p!==void 0?n.addEventListener(i,a,{capture:!0,passive:p}):n.addEventListener(i,a,!0):p!==void 0?n.addEventListener(i,a,{passive:p}):n.addEventListener(i,a,!1)}function wu(n,i,a,u,p){var v=u;if((i&1)===0&&(i&2)===0&&u!==null)e:for(;;){if(u===null)return;var T=u.tag;if(T===3||T===4){var F=u.stateNode.containerInfo;if(F===p||F.nodeType===8&&F.parentNode===p)break;if(T===4)for(T=u.return;T!==null;){var H=T.tag;if((H===3||H===4)&&(H=T.stateNode.containerInfo,H===p||H.nodeType===8&&H.parentNode===p))return;T=T.return}for(;F!==null;){if(T=Nr(F),T===null)return;if(H=T.tag,H===5||H===6){u=v=T;continue e}F=F.parentNode}}u=u.return}Jt(function(){var re=v,me=at(a),xe=[];e:{var pe=Pf.get(n);if(pe!==void 0){var Ie=cu,Fe=n;switch(n){case"keypress":if(Ma(a)===0)break e;case"keydown":case"keyup":Ie=P0;break;case"focusin":Fe="focus",Ie=hu;break;case"focusout":Fe="blur",Ie=hu;break;case"beforeblur":case"afterblur":Ie=hu;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":Ie=af;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":Ie=x0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":Ie=N0;break;case Cf:case bf:case Rf:Ie=M0;break;case Lf:Ie=O0;break;case"scroll":Ie=v0;break;case"wheel":Ie=k0;break;case"copy":case"cut":case"paste":Ie=T0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":Ie=uf}var ze=(i&4)!==0,Vt=!ze&&n==="scroll",K=ze?pe!==null?pe+"Capture":null:pe;ze=[];for(var j=re,ee;j!==null;){ee=j;var Ee=ee.stateNode;if(ee.tag===5&&Ee!==null&&(ee=Ee,K!==null&&(Ee=_t(j,K),Ee!=null&&ze.push(wo(j,Ee,ee)))),Vt)break;j=j.return}0<ze.length&&(pe=new Ie(pe,Fe,null,a,me),xe.push({event:pe,listeners:ze}))}}if((i&7)===0){e:{if(pe=n==="mouseover"||n==="pointerover",Ie=n==="mouseout"||n==="pointerout",pe&&a!==Ct&&(Fe=a.relatedTarget||a.fromElement)&&(Nr(Fe)||Fe[Li]))break e;if((Ie||pe)&&(pe=me.window===me?me:(pe=me.ownerDocument)?pe.defaultView||pe.parentWindow:window,Ie?(Fe=a.relatedTarget||a.toElement,Ie=re,Fe=Fe?Nr(Fe):null,Fe!==null&&(Vt=bi(Fe),Fe!==Vt||Fe.tag!==5&&Fe.tag!==6)&&(Fe=null)):(Ie=null,Fe=re),Ie!==Fe)){if(ze=af,Ee="onMouseLeave",K="onMouseEnter",j="mouse",(n==="pointerout"||n==="pointerover")&&(ze=uf,Ee="onPointerLeave",K="onPointerEnter",j="pointer"),Vt=Ie==null?pe:ms(Ie),ee=Fe==null?pe:ms(Fe),pe=new ze(Ee,j+"leave",Ie,a,me),pe.target=Vt,pe.relatedTarget=ee,Ee=null,Nr(me)===re&&(ze=new ze(K,j+"enter",Fe,a,me),ze.target=ee,ze.relatedTarget=Vt,Ee=ze),Vt=Ee,Ie&&Fe)t:{for(ze=Ie,K=Fe,j=0,ee=ze;ee;ee=hs(ee))j++;for(ee=0,Ee=K;Ee;Ee=hs(Ee))ee++;for(;0<j-ee;)ze=hs(ze),j--;for(;0<ee-j;)K=hs(K),ee--;for(;j--;){if(ze===K||K!==null&&ze===K.alternate)break t;ze=hs(ze),K=hs(K)}ze=null}else ze=null;Ie!==null&&Of(xe,pe,Ie,ze,!1),Fe!==null&&Vt!==null&&Of(xe,Vt,Fe,ze,!0)}}e:{if(pe=re?ms(re):window,Ie=pe.nodeName&&pe.nodeName.toLowerCase(),Ie==="select"||Ie==="input"&&pe.type==="file")var He=j0;else if(mf(pe))if(vf)He=$0;else{He=Y0;var qe=X0}else(Ie=pe.nodeName)&&Ie.toLowerCase()==="input"&&(pe.type==="checkbox"||pe.type==="radio")&&(He=q0);if(He&&(He=He(n,re))){gf(xe,He,a,me);break e}qe&&qe(n,pe,re),n==="focusout"&&(qe=pe._wrapperState)&&qe.controlled&&pe.type==="number"&&N(pe,"number",pe.value)}switch(qe=re?ms(re):window,n){case"focusin":(mf(qe)||qe.contentEditable==="true")&&(ds=qe,xu=re,Mo=null);break;case"focusout":Mo=xu=ds=null;break;case"mousedown":yu=!0;break;case"contextmenu":case"mouseup":case"dragend":yu=!1,wf(xe,a,me);break;case"selectionchange":if(Q0)break;case"keydown":case"keyup":wf(xe,a,me)}var $e;if(mu)e:{switch(n){case"compositionstart":var Je="onCompositionStart";break e;case"compositionend":Je="onCompositionEnd";break e;case"compositionupdate":Je="onCompositionUpdate";break e}Je=void 0}else cs?hf(n,a)&&(Je="onCompositionEnd"):n==="keydown"&&a.keyCode===229&&(Je="onCompositionStart");Je&&(cf&&a.locale!=="ko"&&(cs||Je!=="onCompositionStart"?Je==="onCompositionEnd"&&cs&&($e=sf()):(nr=me,uu="value"in nr?nr.value:nr.textContent,cs=!0)),qe=Ra(re,Je),0<qe.length&&(Je=new lf(Je,n,null,a,me),xe.push({event:Je,listeners:qe}),$e?Je.data=$e:($e=pf(a),$e!==null&&(Je.data=$e)))),($e=z0?H0(n,a):G0(n,a))&&(re=Ra(re,"onBeforeInput"),0<re.length&&(me=new lf("onBeforeInput","beforeinput",null,a,me),xe.push({event:me,listeners:re}),me.data=$e))}Nf(xe,i)})}function wo(n,i,a){return{instance:n,listener:i,currentTarget:a}}function Ra(n,i){for(var a=i+"Capture",u=[];n!==null;){var p=n,v=p.stateNode;p.tag===5&&v!==null&&(p=v,v=_t(n,a),v!=null&&u.unshift(wo(n,v,p)),v=_t(n,i),v!=null&&u.push(wo(n,v,p))),n=n.return}return u}function hs(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function Of(n,i,a,u,p){for(var v=i._reactName,T=[];a!==null&&a!==u;){var F=a,H=F.alternate,re=F.stateNode;if(H!==null&&H===u)break;F.tag===5&&re!==null&&(F=re,p?(H=_t(a,v),H!=null&&T.unshift(wo(a,H,F))):p||(H=_t(a,v),H!=null&&T.push(wo(a,H,F)))),a=a.return}T.length!==0&&n.push({event:i,listeners:T})}var nv=/\r\n?/g,iv=/\u0000|\uFFFD/g;function Ff(n){return(typeof n=="string"?n:""+n).replace(nv,`
`).replace(iv,"")}function La(n,i,a){if(i=Ff(i),Ff(n)!==i&&a)throw Error(t(425))}function Pa(){}var Au=null,Cu=null;function bu(n,i){return n==="textarea"||n==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var Ru=typeof setTimeout=="function"?setTimeout:void 0,rv=typeof clearTimeout=="function"?clearTimeout:void 0,kf=typeof Promise=="function"?Promise:void 0,sv=typeof queueMicrotask=="function"?queueMicrotask:typeof kf<"u"?function(n){return kf.resolve(null).then(n).catch(ov)}:Ru;function ov(n){setTimeout(function(){throw n})}function Lu(n,i){var a=i,u=0;do{var p=a.nextSibling;if(n.removeChild(a),p&&p.nodeType===8)if(a=p.data,a==="/$"){if(u===0){n.removeChild(p),mo(i);return}u--}else a!=="$"&&a!=="$?"&&a!=="$!"||u++;a=p}while(a);mo(i)}function rr(n){for(;n!=null;n=n.nextSibling){var i=n.nodeType;if(i===1||i===3)break;if(i===8){if(i=n.data,i==="$"||i==="$!"||i==="$?")break;if(i==="/$")return null}}return n}function Bf(n){n=n.previousSibling;for(var i=0;n;){if(n.nodeType===8){var a=n.data;if(a==="$"||a==="$!"||a==="$?"){if(i===0)return n;i--}else a==="/$"&&i++}n=n.previousSibling}return null}var ps=Math.random().toString(36).slice(2),yi="__reactFiber$"+ps,Ao="__reactProps$"+ps,Li="__reactContainer$"+ps,Pu="__reactEvents$"+ps,av="__reactListeners$"+ps,lv="__reactHandles$"+ps;function Nr(n){var i=n[yi];if(i)return i;for(var a=n.parentNode;a;){if(i=a[Li]||a[yi]){if(a=i.alternate,i.child!==null||a!==null&&a.child!==null)for(n=Bf(n);n!==null;){if(a=n[yi])return a;n=Bf(n)}return i}n=a,a=n.parentNode}return null}function Co(n){return n=n[yi]||n[Li],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function ms(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(t(33))}function Da(n){return n[Ao]||null}var Du=[],gs=-1;function sr(n){return{current:n}}function Pt(n){0>gs||(n.current=Du[gs],Du[gs]=null,gs--)}function Rt(n,i){gs++,Du[gs]=n.current,n.current=i}var or={},dn=sr(or),Rn=sr(!1),Ur=or;function vs(n,i){var a=n.type.contextTypes;if(!a)return or;var u=n.stateNode;if(u&&u.__reactInternalMemoizedUnmaskedChildContext===i)return u.__reactInternalMemoizedMaskedChildContext;var p={},v;for(v in a)p[v]=i[v];return u&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=i,n.__reactInternalMemoizedMaskedChildContext=p),p}function Ln(n){return n=n.childContextTypes,n!=null}function Ia(){Pt(Rn),Pt(dn)}function zf(n,i,a){if(dn.current!==or)throw Error(t(168));Rt(dn,i),Rt(Rn,a)}function Hf(n,i,a){var u=n.stateNode;if(i=i.childContextTypes,typeof u.getChildContext!="function")return a;u=u.getChildContext();for(var p in u)if(!(p in i))throw Error(t(108,Me(n)||"Unknown",p));return z({},a,u)}function Na(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||or,Ur=dn.current,Rt(dn,n),Rt(Rn,Rn.current),!0}function Gf(n,i,a){var u=n.stateNode;if(!u)throw Error(t(169));a?(n=Hf(n,i,Ur),u.__reactInternalMemoizedMergedChildContext=n,Pt(Rn),Pt(dn),Rt(dn,n)):Pt(Rn),Rt(Rn,a)}var Pi=null,Ua=!1,Iu=!1;function Vf(n){Pi===null?Pi=[n]:Pi.push(n)}function uv(n){Ua=!0,Vf(n)}function ar(){if(!Iu&&Pi!==null){Iu=!0;var n=0,i=wt;try{var a=Pi;for(wt=1;n<a.length;n++){var u=a[n];do u=u(!0);while(u!==null)}Pi=null,Ua=!1}catch(p){throw Pi!==null&&(Pi=Pi.slice(n+1)),se(nt,ar),p}finally{wt=i,Iu=!1}}return null}var _s=[],xs=0,Oa=null,Fa=0,Kn=[],Zn=0,Or=null,Di=1,Ii="";function Fr(n,i){_s[xs++]=Fa,_s[xs++]=Oa,Oa=n,Fa=i}function Wf(n,i,a){Kn[Zn++]=Di,Kn[Zn++]=Ii,Kn[Zn++]=Or,Or=n;var u=Di;n=Ii;var p=32-yn(u)-1;u&=~(1<<p),a+=1;var v=32-yn(i)+p;if(30<v){var T=p-p%5;v=(u&(1<<T)-1).toString(32),u>>=T,p-=T,Di=1<<32-yn(i)+p|a<<p|u,Ii=v+n}else Di=1<<v|a<<p|u,Ii=n}function Nu(n){n.return!==null&&(Fr(n,1),Wf(n,1,0))}function Uu(n){for(;n===Oa;)Oa=_s[--xs],_s[xs]=null,Fa=_s[--xs],_s[xs]=null;for(;n===Or;)Or=Kn[--Zn],Kn[Zn]=null,Ii=Kn[--Zn],Kn[Zn]=null,Di=Kn[--Zn],Kn[Zn]=null}var Hn=null,Gn=null,Nt=!1,li=null;function jf(n,i){var a=ti(5,null,null,0);a.elementType="DELETED",a.stateNode=i,a.return=n,i=n.deletions,i===null?(n.deletions=[a],n.flags|=16):i.push(a)}function Xf(n,i){switch(n.tag){case 5:var a=n.type;return i=i.nodeType!==1||a.toLowerCase()!==i.nodeName.toLowerCase()?null:i,i!==null?(n.stateNode=i,Hn=n,Gn=rr(i.firstChild),!0):!1;case 6:return i=n.pendingProps===""||i.nodeType!==3?null:i,i!==null?(n.stateNode=i,Hn=n,Gn=null,!0):!1;case 13:return i=i.nodeType!==8?null:i,i!==null?(a=Or!==null?{id:Di,overflow:Ii}:null,n.memoizedState={dehydrated:i,treeContext:a,retryLane:1073741824},a=ti(18,null,null,0),a.stateNode=i,a.return=n,n.child=a,Hn=n,Gn=null,!0):!1;default:return!1}}function Ou(n){return(n.mode&1)!==0&&(n.flags&128)===0}function Fu(n){if(Nt){var i=Gn;if(i){var a=i;if(!Xf(n,i)){if(Ou(n))throw Error(t(418));i=rr(a.nextSibling);var u=Hn;i&&Xf(n,i)?jf(u,a):(n.flags=n.flags&-4097|2,Nt=!1,Hn=n)}}else{if(Ou(n))throw Error(t(418));n.flags=n.flags&-4097|2,Nt=!1,Hn=n}}}function Yf(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;Hn=n}function ka(n){if(n!==Hn)return!1;if(!Nt)return Yf(n),Nt=!0,!1;var i;if((i=n.tag!==3)&&!(i=n.tag!==5)&&(i=n.type,i=i!=="head"&&i!=="body"&&!bu(n.type,n.memoizedProps)),i&&(i=Gn)){if(Ou(n))throw qf(),Error(t(418));for(;i;)jf(n,i),i=rr(i.nextSibling)}if(Yf(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(t(317));e:{for(n=n.nextSibling,i=0;n;){if(n.nodeType===8){var a=n.data;if(a==="/$"){if(i===0){Gn=rr(n.nextSibling);break e}i--}else a!=="$"&&a!=="$!"&&a!=="$?"||i++}n=n.nextSibling}Gn=null}}else Gn=Hn?rr(n.stateNode.nextSibling):null;return!0}function qf(){for(var n=Gn;n;)n=rr(n.nextSibling)}function ys(){Gn=Hn=null,Nt=!1}function ku(n){li===null?li=[n]:li.push(n)}var cv=L.ReactCurrentBatchConfig;function bo(n,i,a){if(n=a.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(a._owner){if(a=a._owner,a){if(a.tag!==1)throw Error(t(309));var u=a.stateNode}if(!u)throw Error(t(147,n));var p=u,v=""+n;return i!==null&&i.ref!==null&&typeof i.ref=="function"&&i.ref._stringRef===v?i.ref:(i=function(T){var F=p.refs;T===null?delete F[v]:F[v]=T},i._stringRef=v,i)}if(typeof n!="string")throw Error(t(284));if(!a._owner)throw Error(t(290,n))}return n}function Ba(n,i){throw n=Object.prototype.toString.call(i),Error(t(31,n==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":n))}function $f(n){var i=n._init;return i(n._payload)}function Kf(n){function i(K,j){if(n){var ee=K.deletions;ee===null?(K.deletions=[j],K.flags|=16):ee.push(j)}}function a(K,j){if(!n)return null;for(;j!==null;)i(K,j),j=j.sibling;return null}function u(K,j){for(K=new Map;j!==null;)j.key!==null?K.set(j.key,j):K.set(j.index,j),j=j.sibling;return K}function p(K,j){return K=mr(K,j),K.index=0,K.sibling=null,K}function v(K,j,ee){return K.index=ee,n?(ee=K.alternate,ee!==null?(ee=ee.index,ee<j?(K.flags|=2,j):ee):(K.flags|=2,j)):(K.flags|=1048576,j)}function T(K){return n&&K.alternate===null&&(K.flags|=2),K}function F(K,j,ee,Ee){return j===null||j.tag!==6?(j=Rc(ee,K.mode,Ee),j.return=K,j):(j=p(j,ee),j.return=K,j)}function H(K,j,ee,Ee){var He=ee.type;return He===I?me(K,j,ee.props.children,Ee,ee.key):j!==null&&(j.elementType===He||typeof He=="object"&&He!==null&&He.$$typeof===J&&$f(He)===j.type)?(Ee=p(j,ee.props),Ee.ref=bo(K,j,ee),Ee.return=K,Ee):(Ee=ul(ee.type,ee.key,ee.props,null,K.mode,Ee),Ee.ref=bo(K,j,ee),Ee.return=K,Ee)}function re(K,j,ee,Ee){return j===null||j.tag!==4||j.stateNode.containerInfo!==ee.containerInfo||j.stateNode.implementation!==ee.implementation?(j=Lc(ee,K.mode,Ee),j.return=K,j):(j=p(j,ee.children||[]),j.return=K,j)}function me(K,j,ee,Ee,He){return j===null||j.tag!==7?(j=jr(ee,K.mode,Ee,He),j.return=K,j):(j=p(j,ee),j.return=K,j)}function xe(K,j,ee){if(typeof j=="string"&&j!==""||typeof j=="number")return j=Rc(""+j,K.mode,ee),j.return=K,j;if(typeof j=="object"&&j!==null){switch(j.$$typeof){case B:return ee=ul(j.type,j.key,j.props,null,K.mode,ee),ee.ref=bo(K,null,j),ee.return=K,ee;case U:return j=Lc(j,K.mode,ee),j.return=K,j;case J:var Ee=j._init;return xe(K,Ee(j._payload),ee)}if(R(j)||q(j))return j=jr(j,K.mode,ee,null),j.return=K,j;Ba(K,j)}return null}function pe(K,j,ee,Ee){var He=j!==null?j.key:null;if(typeof ee=="string"&&ee!==""||typeof ee=="number")return He!==null?null:F(K,j,""+ee,Ee);if(typeof ee=="object"&&ee!==null){switch(ee.$$typeof){case B:return ee.key===He?H(K,j,ee,Ee):null;case U:return ee.key===He?re(K,j,ee,Ee):null;case J:return He=ee._init,pe(K,j,He(ee._payload),Ee)}if(R(ee)||q(ee))return He!==null?null:me(K,j,ee,Ee,null);Ba(K,ee)}return null}function Ie(K,j,ee,Ee,He){if(typeof Ee=="string"&&Ee!==""||typeof Ee=="number")return K=K.get(ee)||null,F(j,K,""+Ee,He);if(typeof Ee=="object"&&Ee!==null){switch(Ee.$$typeof){case B:return K=K.get(Ee.key===null?ee:Ee.key)||null,H(j,K,Ee,He);case U:return K=K.get(Ee.key===null?ee:Ee.key)||null,re(j,K,Ee,He);case J:var qe=Ee._init;return Ie(K,j,ee,qe(Ee._payload),He)}if(R(Ee)||q(Ee))return K=K.get(ee)||null,me(j,K,Ee,He,null);Ba(j,Ee)}return null}function Fe(K,j,ee,Ee){for(var He=null,qe=null,$e=j,Je=j=0,nn=null;$e!==null&&Je<ee.length;Je++){$e.index>Je?(nn=$e,$e=null):nn=$e.sibling;var xt=pe(K,$e,ee[Je],Ee);if(xt===null){$e===null&&($e=nn);break}n&&$e&&xt.alternate===null&&i(K,$e),j=v(xt,j,Je),qe===null?He=xt:qe.sibling=xt,qe=xt,$e=nn}if(Je===ee.length)return a(K,$e),Nt&&Fr(K,Je),He;if($e===null){for(;Je<ee.length;Je++)$e=xe(K,ee[Je],Ee),$e!==null&&(j=v($e,j,Je),qe===null?He=$e:qe.sibling=$e,qe=$e);return Nt&&Fr(K,Je),He}for($e=u(K,$e);Je<ee.length;Je++)nn=Ie($e,K,Je,ee[Je],Ee),nn!==null&&(n&&nn.alternate!==null&&$e.delete(nn.key===null?Je:nn.key),j=v(nn,j,Je),qe===null?He=nn:qe.sibling=nn,qe=nn);return n&&$e.forEach(function(gr){return i(K,gr)}),Nt&&Fr(K,Je),He}function ze(K,j,ee,Ee){var He=q(ee);if(typeof He!="function")throw Error(t(150));if(ee=He.call(ee),ee==null)throw Error(t(151));for(var qe=He=null,$e=j,Je=j=0,nn=null,xt=ee.next();$e!==null&&!xt.done;Je++,xt=ee.next()){$e.index>Je?(nn=$e,$e=null):nn=$e.sibling;var gr=pe(K,$e,xt.value,Ee);if(gr===null){$e===null&&($e=nn);break}n&&$e&&gr.alternate===null&&i(K,$e),j=v(gr,j,Je),qe===null?He=gr:qe.sibling=gr,qe=gr,$e=nn}if(xt.done)return a(K,$e),Nt&&Fr(K,Je),He;if($e===null){for(;!xt.done;Je++,xt=ee.next())xt=xe(K,xt.value,Ee),xt!==null&&(j=v(xt,j,Je),qe===null?He=xt:qe.sibling=xt,qe=xt);return Nt&&Fr(K,Je),He}for($e=u(K,$e);!xt.done;Je++,xt=ee.next())xt=Ie($e,K,Je,xt.value,Ee),xt!==null&&(n&&xt.alternate!==null&&$e.delete(xt.key===null?Je:xt.key),j=v(xt,j,Je),qe===null?He=xt:qe.sibling=xt,qe=xt);return n&&$e.forEach(function(Vv){return i(K,Vv)}),Nt&&Fr(K,Je),He}function Vt(K,j,ee,Ee){if(typeof ee=="object"&&ee!==null&&ee.type===I&&ee.key===null&&(ee=ee.props.children),typeof ee=="object"&&ee!==null){switch(ee.$$typeof){case B:e:{for(var He=ee.key,qe=j;qe!==null;){if(qe.key===He){if(He=ee.type,He===I){if(qe.tag===7){a(K,qe.sibling),j=p(qe,ee.props.children),j.return=K,K=j;break e}}else if(qe.elementType===He||typeof He=="object"&&He!==null&&He.$$typeof===J&&$f(He)===qe.type){a(K,qe.sibling),j=p(qe,ee.props),j.ref=bo(K,qe,ee),j.return=K,K=j;break e}a(K,qe);break}else i(K,qe);qe=qe.sibling}ee.type===I?(j=jr(ee.props.children,K.mode,Ee,ee.key),j.return=K,K=j):(Ee=ul(ee.type,ee.key,ee.props,null,K.mode,Ee),Ee.ref=bo(K,j,ee),Ee.return=K,K=Ee)}return T(K);case U:e:{for(qe=ee.key;j!==null;){if(j.key===qe)if(j.tag===4&&j.stateNode.containerInfo===ee.containerInfo&&j.stateNode.implementation===ee.implementation){a(K,j.sibling),j=p(j,ee.children||[]),j.return=K,K=j;break e}else{a(K,j);break}else i(K,j);j=j.sibling}j=Lc(ee,K.mode,Ee),j.return=K,K=j}return T(K);case J:return qe=ee._init,Vt(K,j,qe(ee._payload),Ee)}if(R(ee))return Fe(K,j,ee,Ee);if(q(ee))return ze(K,j,ee,Ee);Ba(K,ee)}return typeof ee=="string"&&ee!==""||typeof ee=="number"?(ee=""+ee,j!==null&&j.tag===6?(a(K,j.sibling),j=p(j,ee),j.return=K,K=j):(a(K,j),j=Rc(ee,K.mode,Ee),j.return=K,K=j),T(K)):a(K,j)}return Vt}var Ss=Kf(!0),Zf=Kf(!1),za=sr(null),Ha=null,Ms=null,Bu=null;function zu(){Bu=Ms=Ha=null}function Hu(n){var i=za.current;Pt(za),n._currentValue=i}function Gu(n,i,a){for(;n!==null;){var u=n.alternate;if((n.childLanes&i)!==i?(n.childLanes|=i,u!==null&&(u.childLanes|=i)):u!==null&&(u.childLanes&i)!==i&&(u.childLanes|=i),n===a)break;n=n.return}}function Es(n,i){Ha=n,Bu=Ms=null,n=n.dependencies,n!==null&&n.firstContext!==null&&((n.lanes&i)!==0&&(Pn=!0),n.firstContext=null)}function Qn(n){var i=n._currentValue;if(Bu!==n)if(n={context:n,memoizedValue:i,next:null},Ms===null){if(Ha===null)throw Error(t(308));Ms=n,Ha.dependencies={lanes:0,firstContext:n}}else Ms=Ms.next=n;return i}var kr=null;function Vu(n){kr===null?kr=[n]:kr.push(n)}function Qf(n,i,a,u){var p=i.interleaved;return p===null?(a.next=a,Vu(i)):(a.next=p.next,p.next=a),i.interleaved=a,Ni(n,u)}function Ni(n,i){n.lanes|=i;var a=n.alternate;for(a!==null&&(a.lanes|=i),a=n,n=n.return;n!==null;)n.childLanes|=i,a=n.alternate,a!==null&&(a.childLanes|=i),a=n,n=n.return;return a.tag===3?a.stateNode:null}var lr=!1;function Wu(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Jf(n,i){n=n.updateQueue,i.updateQueue===n&&(i.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function Ui(n,i){return{eventTime:n,lane:i,tag:0,payload:null,callback:null,next:null}}function ur(n,i,a){var u=n.updateQueue;if(u===null)return null;if(u=u.shared,(vt&2)!==0){var p=u.pending;return p===null?i.next=i:(i.next=p.next,p.next=i),u.pending=i,Ni(n,a)}return p=u.interleaved,p===null?(i.next=i,Vu(u)):(i.next=p.next,p.next=i),u.interleaved=i,Ni(n,a)}function Ga(n,i,a){if(i=i.updateQueue,i!==null&&(i=i.shared,(a&4194240)!==0)){var u=i.lanes;u&=n.pendingLanes,a|=u,i.lanes=a,ru(n,a)}}function eh(n,i){var a=n.updateQueue,u=n.alternate;if(u!==null&&(u=u.updateQueue,a===u)){var p=null,v=null;if(a=a.firstBaseUpdate,a!==null){do{var T={eventTime:a.eventTime,lane:a.lane,tag:a.tag,payload:a.payload,callback:a.callback,next:null};v===null?p=v=T:v=v.next=T,a=a.next}while(a!==null);v===null?p=v=i:v=v.next=i}else p=v=i;a={baseState:u.baseState,firstBaseUpdate:p,lastBaseUpdate:v,shared:u.shared,effects:u.effects},n.updateQueue=a;return}n=a.lastBaseUpdate,n===null?a.firstBaseUpdate=i:n.next=i,a.lastBaseUpdate=i}function Va(n,i,a,u){var p=n.updateQueue;lr=!1;var v=p.firstBaseUpdate,T=p.lastBaseUpdate,F=p.shared.pending;if(F!==null){p.shared.pending=null;var H=F,re=H.next;H.next=null,T===null?v=re:T.next=re,T=H;var me=n.alternate;me!==null&&(me=me.updateQueue,F=me.lastBaseUpdate,F!==T&&(F===null?me.firstBaseUpdate=re:F.next=re,me.lastBaseUpdate=H))}if(v!==null){var xe=p.baseState;T=0,me=re=H=null,F=v;do{var pe=F.lane,Ie=F.eventTime;if((u&pe)===pe){me!==null&&(me=me.next={eventTime:Ie,lane:0,tag:F.tag,payload:F.payload,callback:F.callback,next:null});e:{var Fe=n,ze=F;switch(pe=i,Ie=a,ze.tag){case 1:if(Fe=ze.payload,typeof Fe=="function"){xe=Fe.call(Ie,xe,pe);break e}xe=Fe;break e;case 3:Fe.flags=Fe.flags&-65537|128;case 0:if(Fe=ze.payload,pe=typeof Fe=="function"?Fe.call(Ie,xe,pe):Fe,pe==null)break e;xe=z({},xe,pe);break e;case 2:lr=!0}}F.callback!==null&&F.lane!==0&&(n.flags|=64,pe=p.effects,pe===null?p.effects=[F]:pe.push(F))}else Ie={eventTime:Ie,lane:pe,tag:F.tag,payload:F.payload,callback:F.callback,next:null},me===null?(re=me=Ie,H=xe):me=me.next=Ie,T|=pe;if(F=F.next,F===null){if(F=p.shared.pending,F===null)break;pe=F,F=pe.next,pe.next=null,p.lastBaseUpdate=pe,p.shared.pending=null}}while(!0);if(me===null&&(H=xe),p.baseState=H,p.firstBaseUpdate=re,p.lastBaseUpdate=me,i=p.shared.interleaved,i!==null){p=i;do T|=p.lane,p=p.next;while(p!==i)}else v===null&&(p.shared.lanes=0);Hr|=T,n.lanes=T,n.memoizedState=xe}}function th(n,i,a){if(n=i.effects,i.effects=null,n!==null)for(i=0;i<n.length;i++){var u=n[i],p=u.callback;if(p!==null){if(u.callback=null,u=a,typeof p!="function")throw Error(t(191,p));p.call(u)}}}var Ro={},Si=sr(Ro),Lo=sr(Ro),Po=sr(Ro);function Br(n){if(n===Ro)throw Error(t(174));return n}function ju(n,i){switch(Rt(Po,i),Rt(Lo,n),Rt(Si,Ro),n=i.nodeType,n){case 9:case 11:i=(i=i.documentElement)?i.namespaceURI:Oe(null,"");break;default:n=n===8?i.parentNode:i,i=n.namespaceURI||null,n=n.tagName,i=Oe(i,n)}Pt(Si),Rt(Si,i)}function Ts(){Pt(Si),Pt(Lo),Pt(Po)}function nh(n){Br(Po.current);var i=Br(Si.current),a=Oe(i,n.type);i!==a&&(Rt(Lo,n),Rt(Si,a))}function Xu(n){Lo.current===n&&(Pt(Si),Pt(Lo))}var Ot=sr(0);function Wa(n){for(var i=n;i!==null;){if(i.tag===13){var a=i.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||a.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var Yu=[];function qu(){for(var n=0;n<Yu.length;n++)Yu[n]._workInProgressVersionPrimary=null;Yu.length=0}var ja=L.ReactCurrentDispatcher,$u=L.ReactCurrentBatchConfig,zr=0,Ft=null,qt=null,en=null,Xa=!1,Do=!1,Io=0,dv=0;function fn(){throw Error(t(321))}function Ku(n,i){if(i===null)return!1;for(var a=0;a<i.length&&a<n.length;a++)if(!ai(n[a],i[a]))return!1;return!0}function Zu(n,i,a,u,p,v){if(zr=v,Ft=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,ja.current=n===null||n.memoizedState===null?mv:gv,n=a(u,p),Do){v=0;do{if(Do=!1,Io=0,25<=v)throw Error(t(301));v+=1,en=qt=null,i.updateQueue=null,ja.current=vv,n=a(u,p)}while(Do)}if(ja.current=$a,i=qt!==null&&qt.next!==null,zr=0,en=qt=Ft=null,Xa=!1,i)throw Error(t(300));return n}function Qu(){var n=Io!==0;return Io=0,n}function Mi(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return en===null?Ft.memoizedState=en=n:en=en.next=n,en}function Jn(){if(qt===null){var n=Ft.alternate;n=n!==null?n.memoizedState:null}else n=qt.next;var i=en===null?Ft.memoizedState:en.next;if(i!==null)en=i,qt=n;else{if(n===null)throw Error(t(310));qt=n,n={memoizedState:qt.memoizedState,baseState:qt.baseState,baseQueue:qt.baseQueue,queue:qt.queue,next:null},en===null?Ft.memoizedState=en=n:en=en.next=n}return en}function No(n,i){return typeof i=="function"?i(n):i}function Ju(n){var i=Jn(),a=i.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var u=qt,p=u.baseQueue,v=a.pending;if(v!==null){if(p!==null){var T=p.next;p.next=v.next,v.next=T}u.baseQueue=p=v,a.pending=null}if(p!==null){v=p.next,u=u.baseState;var F=T=null,H=null,re=v;do{var me=re.lane;if((zr&me)===me)H!==null&&(H=H.next={lane:0,action:re.action,hasEagerState:re.hasEagerState,eagerState:re.eagerState,next:null}),u=re.hasEagerState?re.eagerState:n(u,re.action);else{var xe={lane:me,action:re.action,hasEagerState:re.hasEagerState,eagerState:re.eagerState,next:null};H===null?(F=H=xe,T=u):H=H.next=xe,Ft.lanes|=me,Hr|=me}re=re.next}while(re!==null&&re!==v);H===null?T=u:H.next=F,ai(u,i.memoizedState)||(Pn=!0),i.memoizedState=u,i.baseState=T,i.baseQueue=H,a.lastRenderedState=u}if(n=a.interleaved,n!==null){p=n;do v=p.lane,Ft.lanes|=v,Hr|=v,p=p.next;while(p!==n)}else p===null&&(a.lanes=0);return[i.memoizedState,a.dispatch]}function ec(n){var i=Jn(),a=i.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var u=a.dispatch,p=a.pending,v=i.memoizedState;if(p!==null){a.pending=null;var T=p=p.next;do v=n(v,T.action),T=T.next;while(T!==p);ai(v,i.memoizedState)||(Pn=!0),i.memoizedState=v,i.baseQueue===null&&(i.baseState=v),a.lastRenderedState=v}return[v,u]}function ih(){}function rh(n,i){var a=Ft,u=Jn(),p=i(),v=!ai(u.memoizedState,p);if(v&&(u.memoizedState=p,Pn=!0),u=u.queue,tc(ah.bind(null,a,u,n),[n]),u.getSnapshot!==i||v||en!==null&&en.memoizedState.tag&1){if(a.flags|=2048,Uo(9,oh.bind(null,a,u,p,i),void 0,null),tn===null)throw Error(t(349));(zr&30)!==0||sh(a,i,p)}return p}function sh(n,i,a){n.flags|=16384,n={getSnapshot:i,value:a},i=Ft.updateQueue,i===null?(i={lastEffect:null,stores:null},Ft.updateQueue=i,i.stores=[n]):(a=i.stores,a===null?i.stores=[n]:a.push(n))}function oh(n,i,a,u){i.value=a,i.getSnapshot=u,lh(i)&&uh(n)}function ah(n,i,a){return a(function(){lh(i)&&uh(n)})}function lh(n){var i=n.getSnapshot;n=n.value;try{var a=i();return!ai(n,a)}catch{return!0}}function uh(n){var i=Ni(n,1);i!==null&&fi(i,n,1,-1)}function ch(n){var i=Mi();return typeof n=="function"&&(n=n()),i.memoizedState=i.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:No,lastRenderedState:n},i.queue=n,n=n.dispatch=pv.bind(null,Ft,n),[i.memoizedState,n]}function Uo(n,i,a,u){return n={tag:n,create:i,destroy:a,deps:u,next:null},i=Ft.updateQueue,i===null?(i={lastEffect:null,stores:null},Ft.updateQueue=i,i.lastEffect=n.next=n):(a=i.lastEffect,a===null?i.lastEffect=n.next=n:(u=a.next,a.next=n,n.next=u,i.lastEffect=n)),n}function dh(){return Jn().memoizedState}function Ya(n,i,a,u){var p=Mi();Ft.flags|=n,p.memoizedState=Uo(1|i,a,void 0,u===void 0?null:u)}function qa(n,i,a,u){var p=Jn();u=u===void 0?null:u;var v=void 0;if(qt!==null){var T=qt.memoizedState;if(v=T.destroy,u!==null&&Ku(u,T.deps)){p.memoizedState=Uo(i,a,v,u);return}}Ft.flags|=n,p.memoizedState=Uo(1|i,a,v,u)}function fh(n,i){return Ya(8390656,8,n,i)}function tc(n,i){return qa(2048,8,n,i)}function hh(n,i){return qa(4,2,n,i)}function ph(n,i){return qa(4,4,n,i)}function mh(n,i){if(typeof i=="function")return n=n(),i(n),function(){i(null)};if(i!=null)return n=n(),i.current=n,function(){i.current=null}}function gh(n,i,a){return a=a!=null?a.concat([n]):null,qa(4,4,mh.bind(null,i,n),a)}function nc(){}function vh(n,i){var a=Jn();i=i===void 0?null:i;var u=a.memoizedState;return u!==null&&i!==null&&Ku(i,u[1])?u[0]:(a.memoizedState=[n,i],n)}function _h(n,i){var a=Jn();i=i===void 0?null:i;var u=a.memoizedState;return u!==null&&i!==null&&Ku(i,u[1])?u[0]:(n=n(),a.memoizedState=[n,i],n)}function xh(n,i,a){return(zr&21)===0?(n.baseState&&(n.baseState=!1,Pn=!0),n.memoizedState=a):(ai(a,i)||(a=ga(),Ft.lanes|=a,Hr|=a,n.baseState=!0),i)}function fv(n,i){var a=wt;wt=a!==0&&4>a?a:4,n(!0);var u=$u.transition;$u.transition={};try{n(!1),i()}finally{wt=a,$u.transition=u}}function yh(){return Jn().memoizedState}function hv(n,i,a){var u=hr(n);if(a={lane:u,action:a,hasEagerState:!1,eagerState:null,next:null},Sh(n))Mh(i,a);else if(a=Qf(n,i,a,u),a!==null){var p=Mn();fi(a,n,u,p),Eh(a,i,u)}}function pv(n,i,a){var u=hr(n),p={lane:u,action:a,hasEagerState:!1,eagerState:null,next:null};if(Sh(n))Mh(i,p);else{var v=n.alternate;if(n.lanes===0&&(v===null||v.lanes===0)&&(v=i.lastRenderedReducer,v!==null))try{var T=i.lastRenderedState,F=v(T,a);if(p.hasEagerState=!0,p.eagerState=F,ai(F,T)){var H=i.interleaved;H===null?(p.next=p,Vu(i)):(p.next=H.next,H.next=p),i.interleaved=p;return}}catch{}a=Qf(n,i,p,u),a!==null&&(p=Mn(),fi(a,n,u,p),Eh(a,i,u))}}function Sh(n){var i=n.alternate;return n===Ft||i!==null&&i===Ft}function Mh(n,i){Do=Xa=!0;var a=n.pending;a===null?i.next=i:(i.next=a.next,a.next=i),n.pending=i}function Eh(n,i,a){if((a&4194240)!==0){var u=i.lanes;u&=n.pendingLanes,a|=u,i.lanes=a,ru(n,a)}}var $a={readContext:Qn,useCallback:fn,useContext:fn,useEffect:fn,useImperativeHandle:fn,useInsertionEffect:fn,useLayoutEffect:fn,useMemo:fn,useReducer:fn,useRef:fn,useState:fn,useDebugValue:fn,useDeferredValue:fn,useTransition:fn,useMutableSource:fn,useSyncExternalStore:fn,useId:fn,unstable_isNewReconciler:!1},mv={readContext:Qn,useCallback:function(n,i){return Mi().memoizedState=[n,i===void 0?null:i],n},useContext:Qn,useEffect:fh,useImperativeHandle:function(n,i,a){return a=a!=null?a.concat([n]):null,Ya(4194308,4,mh.bind(null,i,n),a)},useLayoutEffect:function(n,i){return Ya(4194308,4,n,i)},useInsertionEffect:function(n,i){return Ya(4,2,n,i)},useMemo:function(n,i){var a=Mi();return i=i===void 0?null:i,n=n(),a.memoizedState=[n,i],n},useReducer:function(n,i,a){var u=Mi();return i=a!==void 0?a(i):i,u.memoizedState=u.baseState=i,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:i},u.queue=n,n=n.dispatch=hv.bind(null,Ft,n),[u.memoizedState,n]},useRef:function(n){var i=Mi();return n={current:n},i.memoizedState=n},useState:ch,useDebugValue:nc,useDeferredValue:function(n){return Mi().memoizedState=n},useTransition:function(){var n=ch(!1),i=n[0];return n=fv.bind(null,n[1]),Mi().memoizedState=n,[i,n]},useMutableSource:function(){},useSyncExternalStore:function(n,i,a){var u=Ft,p=Mi();if(Nt){if(a===void 0)throw Error(t(407));a=a()}else{if(a=i(),tn===null)throw Error(t(349));(zr&30)!==0||sh(u,i,a)}p.memoizedState=a;var v={value:a,getSnapshot:i};return p.queue=v,fh(ah.bind(null,u,v,n),[n]),u.flags|=2048,Uo(9,oh.bind(null,u,v,a,i),void 0,null),a},useId:function(){var n=Mi(),i=tn.identifierPrefix;if(Nt){var a=Ii,u=Di;a=(u&~(1<<32-yn(u)-1)).toString(32)+a,i=":"+i+"R"+a,a=Io++,0<a&&(i+="H"+a.toString(32)),i+=":"}else a=dv++,i=":"+i+"r"+a.toString(32)+":";return n.memoizedState=i},unstable_isNewReconciler:!1},gv={readContext:Qn,useCallback:vh,useContext:Qn,useEffect:tc,useImperativeHandle:gh,useInsertionEffect:hh,useLayoutEffect:ph,useMemo:_h,useReducer:Ju,useRef:dh,useState:function(){return Ju(No)},useDebugValue:nc,useDeferredValue:function(n){var i=Jn();return xh(i,qt.memoizedState,n)},useTransition:function(){var n=Ju(No)[0],i=Jn().memoizedState;return[n,i]},useMutableSource:ih,useSyncExternalStore:rh,useId:yh,unstable_isNewReconciler:!1},vv={readContext:Qn,useCallback:vh,useContext:Qn,useEffect:tc,useImperativeHandle:gh,useInsertionEffect:hh,useLayoutEffect:ph,useMemo:_h,useReducer:ec,useRef:dh,useState:function(){return ec(No)},useDebugValue:nc,useDeferredValue:function(n){var i=Jn();return qt===null?i.memoizedState=n:xh(i,qt.memoizedState,n)},useTransition:function(){var n=ec(No)[0],i=Jn().memoizedState;return[n,i]},useMutableSource:ih,useSyncExternalStore:rh,useId:yh,unstable_isNewReconciler:!1};function ui(n,i){if(n&&n.defaultProps){i=z({},i),n=n.defaultProps;for(var a in n)i[a]===void 0&&(i[a]=n[a]);return i}return i}function ic(n,i,a,u){i=n.memoizedState,a=a(u,i),a=a==null?i:z({},i,a),n.memoizedState=a,n.lanes===0&&(n.updateQueue.baseState=a)}var Ka={isMounted:function(n){return(n=n._reactInternals)?bi(n)===n:!1},enqueueSetState:function(n,i,a){n=n._reactInternals;var u=Mn(),p=hr(n),v=Ui(u,p);v.payload=i,a!=null&&(v.callback=a),i=ur(n,v,p),i!==null&&(fi(i,n,p,u),Ga(i,n,p))},enqueueReplaceState:function(n,i,a){n=n._reactInternals;var u=Mn(),p=hr(n),v=Ui(u,p);v.tag=1,v.payload=i,a!=null&&(v.callback=a),i=ur(n,v,p),i!==null&&(fi(i,n,p,u),Ga(i,n,p))},enqueueForceUpdate:function(n,i){n=n._reactInternals;var a=Mn(),u=hr(n),p=Ui(a,u);p.tag=2,i!=null&&(p.callback=i),i=ur(n,p,u),i!==null&&(fi(i,n,u,a),Ga(i,n,u))}};function Th(n,i,a,u,p,v,T){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(u,v,T):i.prototype&&i.prototype.isPureReactComponent?!So(a,u)||!So(p,v):!0}function wh(n,i,a){var u=!1,p=or,v=i.contextType;return typeof v=="object"&&v!==null?v=Qn(v):(p=Ln(i)?Ur:dn.current,u=i.contextTypes,v=(u=u!=null)?vs(n,p):or),i=new i(a,v),n.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Ka,n.stateNode=i,i._reactInternals=n,u&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=p,n.__reactInternalMemoizedMaskedChildContext=v),i}function Ah(n,i,a,u){n=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(a,u),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(a,u),i.state!==n&&Ka.enqueueReplaceState(i,i.state,null)}function rc(n,i,a,u){var p=n.stateNode;p.props=a,p.state=n.memoizedState,p.refs={},Wu(n);var v=i.contextType;typeof v=="object"&&v!==null?p.context=Qn(v):(v=Ln(i)?Ur:dn.current,p.context=vs(n,v)),p.state=n.memoizedState,v=i.getDerivedStateFromProps,typeof v=="function"&&(ic(n,i,v,a),p.state=n.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof p.getSnapshotBeforeUpdate=="function"||typeof p.UNSAFE_componentWillMount!="function"&&typeof p.componentWillMount!="function"||(i=p.state,typeof p.componentWillMount=="function"&&p.componentWillMount(),typeof p.UNSAFE_componentWillMount=="function"&&p.UNSAFE_componentWillMount(),i!==p.state&&Ka.enqueueReplaceState(p,p.state,null),Va(n,a,p,u),p.state=n.memoizedState),typeof p.componentDidMount=="function"&&(n.flags|=4194308)}function ws(n,i){try{var a="",u=i;do a+=he(u),u=u.return;while(u);var p=a}catch(v){p=`
Error generating stack: `+v.message+`
`+v.stack}return{value:n,source:i,stack:p,digest:null}}function sc(n,i,a){return{value:n,source:null,stack:a??null,digest:i??null}}function oc(n,i){try{console.error(i.value)}catch(a){setTimeout(function(){throw a})}}var _v=typeof WeakMap=="function"?WeakMap:Map;function Ch(n,i,a){a=Ui(-1,a),a.tag=3,a.payload={element:null};var u=i.value;return a.callback=function(){il||(il=!0,Sc=u),oc(n,i)},a}function bh(n,i,a){a=Ui(-1,a),a.tag=3;var u=n.type.getDerivedStateFromError;if(typeof u=="function"){var p=i.value;a.payload=function(){return u(p)},a.callback=function(){oc(n,i)}}var v=n.stateNode;return v!==null&&typeof v.componentDidCatch=="function"&&(a.callback=function(){oc(n,i),typeof u!="function"&&(dr===null?dr=new Set([this]):dr.add(this));var T=i.stack;this.componentDidCatch(i.value,{componentStack:T!==null?T:""})}),a}function Rh(n,i,a){var u=n.pingCache;if(u===null){u=n.pingCache=new _v;var p=new Set;u.set(i,p)}else p=u.get(i),p===void 0&&(p=new Set,u.set(i,p));p.has(a)||(p.add(a),n=Dv.bind(null,n,i,a),i.then(n,n))}function Lh(n){do{var i;if((i=n.tag===13)&&(i=n.memoizedState,i=i!==null?i.dehydrated!==null:!0),i)return n;n=n.return}while(n!==null);return null}function Ph(n,i,a,u,p){return(n.mode&1)===0?(n===i?n.flags|=65536:(n.flags|=128,a.flags|=131072,a.flags&=-52805,a.tag===1&&(a.alternate===null?a.tag=17:(i=Ui(-1,1),i.tag=2,ur(a,i,1))),a.lanes|=1),n):(n.flags|=65536,n.lanes=p,n)}var xv=L.ReactCurrentOwner,Pn=!1;function Sn(n,i,a,u){i.child=n===null?Zf(i,null,a,u):Ss(i,n.child,a,u)}function Dh(n,i,a,u,p){a=a.render;var v=i.ref;return Es(i,p),u=Zu(n,i,a,u,v,p),a=Qu(),n!==null&&!Pn?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~p,Oi(n,i,p)):(Nt&&a&&Nu(i),i.flags|=1,Sn(n,i,u,p),i.child)}function Ih(n,i,a,u,p){if(n===null){var v=a.type;return typeof v=="function"&&!bc(v)&&v.defaultProps===void 0&&a.compare===null&&a.defaultProps===void 0?(i.tag=15,i.type=v,Nh(n,i,v,u,p)):(n=ul(a.type,null,u,i,i.mode,p),n.ref=i.ref,n.return=i,i.child=n)}if(v=n.child,(n.lanes&p)===0){var T=v.memoizedProps;if(a=a.compare,a=a!==null?a:So,a(T,u)&&n.ref===i.ref)return Oi(n,i,p)}return i.flags|=1,n=mr(v,u),n.ref=i.ref,n.return=i,i.child=n}function Nh(n,i,a,u,p){if(n!==null){var v=n.memoizedProps;if(So(v,u)&&n.ref===i.ref)if(Pn=!1,i.pendingProps=u=v,(n.lanes&p)!==0)(n.flags&131072)!==0&&(Pn=!0);else return i.lanes=n.lanes,Oi(n,i,p)}return ac(n,i,a,u,p)}function Uh(n,i,a){var u=i.pendingProps,p=u.children,v=n!==null?n.memoizedState:null;if(u.mode==="hidden")if((i.mode&1)===0)i.memoizedState={baseLanes:0,cachePool:null,transitions:null},Rt(Cs,Vn),Vn|=a;else{if((a&1073741824)===0)return n=v!==null?v.baseLanes|a:a,i.lanes=i.childLanes=1073741824,i.memoizedState={baseLanes:n,cachePool:null,transitions:null},i.updateQueue=null,Rt(Cs,Vn),Vn|=n,null;i.memoizedState={baseLanes:0,cachePool:null,transitions:null},u=v!==null?v.baseLanes:a,Rt(Cs,Vn),Vn|=u}else v!==null?(u=v.baseLanes|a,i.memoizedState=null):u=a,Rt(Cs,Vn),Vn|=u;return Sn(n,i,p,a),i.child}function Oh(n,i){var a=i.ref;(n===null&&a!==null||n!==null&&n.ref!==a)&&(i.flags|=512,i.flags|=2097152)}function ac(n,i,a,u,p){var v=Ln(a)?Ur:dn.current;return v=vs(i,v),Es(i,p),a=Zu(n,i,a,u,v,p),u=Qu(),n!==null&&!Pn?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~p,Oi(n,i,p)):(Nt&&u&&Nu(i),i.flags|=1,Sn(n,i,a,p),i.child)}function Fh(n,i,a,u,p){if(Ln(a)){var v=!0;Na(i)}else v=!1;if(Es(i,p),i.stateNode===null)Qa(n,i),wh(i,a,u),rc(i,a,u,p),u=!0;else if(n===null){var T=i.stateNode,F=i.memoizedProps;T.props=F;var H=T.context,re=a.contextType;typeof re=="object"&&re!==null?re=Qn(re):(re=Ln(a)?Ur:dn.current,re=vs(i,re));var me=a.getDerivedStateFromProps,xe=typeof me=="function"||typeof T.getSnapshotBeforeUpdate=="function";xe||typeof T.UNSAFE_componentWillReceiveProps!="function"&&typeof T.componentWillReceiveProps!="function"||(F!==u||H!==re)&&Ah(i,T,u,re),lr=!1;var pe=i.memoizedState;T.state=pe,Va(i,u,T,p),H=i.memoizedState,F!==u||pe!==H||Rn.current||lr?(typeof me=="function"&&(ic(i,a,me,u),H=i.memoizedState),(F=lr||Th(i,a,F,u,pe,H,re))?(xe||typeof T.UNSAFE_componentWillMount!="function"&&typeof T.componentWillMount!="function"||(typeof T.componentWillMount=="function"&&T.componentWillMount(),typeof T.UNSAFE_componentWillMount=="function"&&T.UNSAFE_componentWillMount()),typeof T.componentDidMount=="function"&&(i.flags|=4194308)):(typeof T.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=u,i.memoizedState=H),T.props=u,T.state=H,T.context=re,u=F):(typeof T.componentDidMount=="function"&&(i.flags|=4194308),u=!1)}else{T=i.stateNode,Jf(n,i),F=i.memoizedProps,re=i.type===i.elementType?F:ui(i.type,F),T.props=re,xe=i.pendingProps,pe=T.context,H=a.contextType,typeof H=="object"&&H!==null?H=Qn(H):(H=Ln(a)?Ur:dn.current,H=vs(i,H));var Ie=a.getDerivedStateFromProps;(me=typeof Ie=="function"||typeof T.getSnapshotBeforeUpdate=="function")||typeof T.UNSAFE_componentWillReceiveProps!="function"&&typeof T.componentWillReceiveProps!="function"||(F!==xe||pe!==H)&&Ah(i,T,u,H),lr=!1,pe=i.memoizedState,T.state=pe,Va(i,u,T,p);var Fe=i.memoizedState;F!==xe||pe!==Fe||Rn.current||lr?(typeof Ie=="function"&&(ic(i,a,Ie,u),Fe=i.memoizedState),(re=lr||Th(i,a,re,u,pe,Fe,H)||!1)?(me||typeof T.UNSAFE_componentWillUpdate!="function"&&typeof T.componentWillUpdate!="function"||(typeof T.componentWillUpdate=="function"&&T.componentWillUpdate(u,Fe,H),typeof T.UNSAFE_componentWillUpdate=="function"&&T.UNSAFE_componentWillUpdate(u,Fe,H)),typeof T.componentDidUpdate=="function"&&(i.flags|=4),typeof T.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof T.componentDidUpdate!="function"||F===n.memoizedProps&&pe===n.memoizedState||(i.flags|=4),typeof T.getSnapshotBeforeUpdate!="function"||F===n.memoizedProps&&pe===n.memoizedState||(i.flags|=1024),i.memoizedProps=u,i.memoizedState=Fe),T.props=u,T.state=Fe,T.context=H,u=re):(typeof T.componentDidUpdate!="function"||F===n.memoizedProps&&pe===n.memoizedState||(i.flags|=4),typeof T.getSnapshotBeforeUpdate!="function"||F===n.memoizedProps&&pe===n.memoizedState||(i.flags|=1024),u=!1)}return lc(n,i,a,u,v,p)}function lc(n,i,a,u,p,v){Oh(n,i);var T=(i.flags&128)!==0;if(!u&&!T)return p&&Gf(i,a,!1),Oi(n,i,v);u=i.stateNode,xv.current=i;var F=T&&typeof a.getDerivedStateFromError!="function"?null:u.render();return i.flags|=1,n!==null&&T?(i.child=Ss(i,n.child,null,v),i.child=Ss(i,null,F,v)):Sn(n,i,F,v),i.memoizedState=u.state,p&&Gf(i,a,!0),i.child}function kh(n){var i=n.stateNode;i.pendingContext?zf(n,i.pendingContext,i.pendingContext!==i.context):i.context&&zf(n,i.context,!1),ju(n,i.containerInfo)}function Bh(n,i,a,u,p){return ys(),ku(p),i.flags|=256,Sn(n,i,a,u),i.child}var uc={dehydrated:null,treeContext:null,retryLane:0};function cc(n){return{baseLanes:n,cachePool:null,transitions:null}}function zh(n,i,a){var u=i.pendingProps,p=Ot.current,v=!1,T=(i.flags&128)!==0,F;if((F=T)||(F=n!==null&&n.memoizedState===null?!1:(p&2)!==0),F?(v=!0,i.flags&=-129):(n===null||n.memoizedState!==null)&&(p|=1),Rt(Ot,p&1),n===null)return Fu(i),n=i.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?((i.mode&1)===0?i.lanes=1:n.data==="$!"?i.lanes=8:i.lanes=1073741824,null):(T=u.children,n=u.fallback,v?(u=i.mode,v=i.child,T={mode:"hidden",children:T},(u&1)===0&&v!==null?(v.childLanes=0,v.pendingProps=T):v=cl(T,u,0,null),n=jr(n,u,a,null),v.return=i,n.return=i,v.sibling=n,i.child=v,i.child.memoizedState=cc(a),i.memoizedState=uc,n):dc(i,T));if(p=n.memoizedState,p!==null&&(F=p.dehydrated,F!==null))return yv(n,i,T,u,F,p,a);if(v){v=u.fallback,T=i.mode,p=n.child,F=p.sibling;var H={mode:"hidden",children:u.children};return(T&1)===0&&i.child!==p?(u=i.child,u.childLanes=0,u.pendingProps=H,i.deletions=null):(u=mr(p,H),u.subtreeFlags=p.subtreeFlags&14680064),F!==null?v=mr(F,v):(v=jr(v,T,a,null),v.flags|=2),v.return=i,u.return=i,u.sibling=v,i.child=u,u=v,v=i.child,T=n.child.memoizedState,T=T===null?cc(a):{baseLanes:T.baseLanes|a,cachePool:null,transitions:T.transitions},v.memoizedState=T,v.childLanes=n.childLanes&~a,i.memoizedState=uc,u}return v=n.child,n=v.sibling,u=mr(v,{mode:"visible",children:u.children}),(i.mode&1)===0&&(u.lanes=a),u.return=i,u.sibling=null,n!==null&&(a=i.deletions,a===null?(i.deletions=[n],i.flags|=16):a.push(n)),i.child=u,i.memoizedState=null,u}function dc(n,i){return i=cl({mode:"visible",children:i},n.mode,0,null),i.return=n,n.child=i}function Za(n,i,a,u){return u!==null&&ku(u),Ss(i,n.child,null,a),n=dc(i,i.pendingProps.children),n.flags|=2,i.memoizedState=null,n}function yv(n,i,a,u,p,v,T){if(a)return i.flags&256?(i.flags&=-257,u=sc(Error(t(422))),Za(n,i,T,u)):i.memoizedState!==null?(i.child=n.child,i.flags|=128,null):(v=u.fallback,p=i.mode,u=cl({mode:"visible",children:u.children},p,0,null),v=jr(v,p,T,null),v.flags|=2,u.return=i,v.return=i,u.sibling=v,i.child=u,(i.mode&1)!==0&&Ss(i,n.child,null,T),i.child.memoizedState=cc(T),i.memoizedState=uc,v);if((i.mode&1)===0)return Za(n,i,T,null);if(p.data==="$!"){if(u=p.nextSibling&&p.nextSibling.dataset,u)var F=u.dgst;return u=F,v=Error(t(419)),u=sc(v,u,void 0),Za(n,i,T,u)}if(F=(T&n.childLanes)!==0,Pn||F){if(u=tn,u!==null){switch(T&-T){case 4:p=2;break;case 16:p=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:p=32;break;case 536870912:p=268435456;break;default:p=0}p=(p&(u.suspendedLanes|T))!==0?0:p,p!==0&&p!==v.retryLane&&(v.retryLane=p,Ni(n,p),fi(u,n,p,-1))}return Cc(),u=sc(Error(t(421))),Za(n,i,T,u)}return p.data==="$?"?(i.flags|=128,i.child=n.child,i=Iv.bind(null,n),p._reactRetry=i,null):(n=v.treeContext,Gn=rr(p.nextSibling),Hn=i,Nt=!0,li=null,n!==null&&(Kn[Zn++]=Di,Kn[Zn++]=Ii,Kn[Zn++]=Or,Di=n.id,Ii=n.overflow,Or=i),i=dc(i,u.children),i.flags|=4096,i)}function Hh(n,i,a){n.lanes|=i;var u=n.alternate;u!==null&&(u.lanes|=i),Gu(n.return,i,a)}function fc(n,i,a,u,p){var v=n.memoizedState;v===null?n.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:u,tail:a,tailMode:p}:(v.isBackwards=i,v.rendering=null,v.renderingStartTime=0,v.last=u,v.tail=a,v.tailMode=p)}function Gh(n,i,a){var u=i.pendingProps,p=u.revealOrder,v=u.tail;if(Sn(n,i,u.children,a),u=Ot.current,(u&2)!==0)u=u&1|2,i.flags|=128;else{if(n!==null&&(n.flags&128)!==0)e:for(n=i.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&Hh(n,a,i);else if(n.tag===19)Hh(n,a,i);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===i)break e;for(;n.sibling===null;){if(n.return===null||n.return===i)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}u&=1}if(Rt(Ot,u),(i.mode&1)===0)i.memoizedState=null;else switch(p){case"forwards":for(a=i.child,p=null;a!==null;)n=a.alternate,n!==null&&Wa(n)===null&&(p=a),a=a.sibling;a=p,a===null?(p=i.child,i.child=null):(p=a.sibling,a.sibling=null),fc(i,!1,p,a,v);break;case"backwards":for(a=null,p=i.child,i.child=null;p!==null;){if(n=p.alternate,n!==null&&Wa(n)===null){i.child=p;break}n=p.sibling,p.sibling=a,a=p,p=n}fc(i,!0,a,null,v);break;case"together":fc(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function Qa(n,i){(i.mode&1)===0&&n!==null&&(n.alternate=null,i.alternate=null,i.flags|=2)}function Oi(n,i,a){if(n!==null&&(i.dependencies=n.dependencies),Hr|=i.lanes,(a&i.childLanes)===0)return null;if(n!==null&&i.child!==n.child)throw Error(t(153));if(i.child!==null){for(n=i.child,a=mr(n,n.pendingProps),i.child=a,a.return=i;n.sibling!==null;)n=n.sibling,a=a.sibling=mr(n,n.pendingProps),a.return=i;a.sibling=null}return i.child}function Sv(n,i,a){switch(i.tag){case 3:kh(i),ys();break;case 5:nh(i);break;case 1:Ln(i.type)&&Na(i);break;case 4:ju(i,i.stateNode.containerInfo);break;case 10:var u=i.type._context,p=i.memoizedProps.value;Rt(za,u._currentValue),u._currentValue=p;break;case 13:if(u=i.memoizedState,u!==null)return u.dehydrated!==null?(Rt(Ot,Ot.current&1),i.flags|=128,null):(a&i.child.childLanes)!==0?zh(n,i,a):(Rt(Ot,Ot.current&1),n=Oi(n,i,a),n!==null?n.sibling:null);Rt(Ot,Ot.current&1);break;case 19:if(u=(a&i.childLanes)!==0,(n.flags&128)!==0){if(u)return Gh(n,i,a);i.flags|=128}if(p=i.memoizedState,p!==null&&(p.rendering=null,p.tail=null,p.lastEffect=null),Rt(Ot,Ot.current),u)break;return null;case 22:case 23:return i.lanes=0,Uh(n,i,a)}return Oi(n,i,a)}var Vh,hc,Wh,jh;Vh=function(n,i){for(var a=i.child;a!==null;){if(a.tag===5||a.tag===6)n.appendChild(a.stateNode);else if(a.tag!==4&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===i)break;for(;a.sibling===null;){if(a.return===null||a.return===i)return;a=a.return}a.sibling.return=a.return,a=a.sibling}},hc=function(){},Wh=function(n,i,a,u){var p=n.memoizedProps;if(p!==u){n=i.stateNode,Br(Si.current);var v=null;switch(a){case"input":p=We(n,p),u=We(n,u),v=[];break;case"select":p=z({},p,{value:void 0}),u=z({},u,{value:void 0}),v=[];break;case"textarea":p=ye(n,p),u=ye(n,u),v=[];break;default:typeof p.onClick!="function"&&typeof u.onClick=="function"&&(n.onclick=Pa)}it(a,u);var T;a=null;for(re in p)if(!u.hasOwnProperty(re)&&p.hasOwnProperty(re)&&p[re]!=null)if(re==="style"){var F=p[re];for(T in F)F.hasOwnProperty(T)&&(a||(a={}),a[T]="")}else re!=="dangerouslySetInnerHTML"&&re!=="children"&&re!=="suppressContentEditableWarning"&&re!=="suppressHydrationWarning"&&re!=="autoFocus"&&(o.hasOwnProperty(re)?v||(v=[]):(v=v||[]).push(re,null));for(re in u){var H=u[re];if(F=p?.[re],u.hasOwnProperty(re)&&H!==F&&(H!=null||F!=null))if(re==="style")if(F){for(T in F)!F.hasOwnProperty(T)||H&&H.hasOwnProperty(T)||(a||(a={}),a[T]="");for(T in H)H.hasOwnProperty(T)&&F[T]!==H[T]&&(a||(a={}),a[T]=H[T])}else a||(v||(v=[]),v.push(re,a)),a=H;else re==="dangerouslySetInnerHTML"?(H=H?H.__html:void 0,F=F?F.__html:void 0,H!=null&&F!==H&&(v=v||[]).push(re,H)):re==="children"?typeof H!="string"&&typeof H!="number"||(v=v||[]).push(re,""+H):re!=="suppressContentEditableWarning"&&re!=="suppressHydrationWarning"&&(o.hasOwnProperty(re)?(H!=null&&re==="onScroll"&&Lt("scroll",n),v||F===H||(v=[])):(v=v||[]).push(re,H))}a&&(v=v||[]).push("style",a);var re=v;(i.updateQueue=re)&&(i.flags|=4)}},jh=function(n,i,a,u){a!==u&&(i.flags|=4)};function Oo(n,i){if(!Nt)switch(n.tailMode){case"hidden":i=n.tail;for(var a=null;i!==null;)i.alternate!==null&&(a=i),i=i.sibling;a===null?n.tail=null:a.sibling=null;break;case"collapsed":a=n.tail;for(var u=null;a!==null;)a.alternate!==null&&(u=a),a=a.sibling;u===null?i||n.tail===null?n.tail=null:n.tail.sibling=null:u.sibling=null}}function hn(n){var i=n.alternate!==null&&n.alternate.child===n.child,a=0,u=0;if(i)for(var p=n.child;p!==null;)a|=p.lanes|p.childLanes,u|=p.subtreeFlags&14680064,u|=p.flags&14680064,p.return=n,p=p.sibling;else for(p=n.child;p!==null;)a|=p.lanes|p.childLanes,u|=p.subtreeFlags,u|=p.flags,p.return=n,p=p.sibling;return n.subtreeFlags|=u,n.childLanes=a,i}function Mv(n,i,a){var u=i.pendingProps;switch(Uu(i),i.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return hn(i),null;case 1:return Ln(i.type)&&Ia(),hn(i),null;case 3:return u=i.stateNode,Ts(),Pt(Rn),Pt(dn),qu(),u.pendingContext&&(u.context=u.pendingContext,u.pendingContext=null),(n===null||n.child===null)&&(ka(i)?i.flags|=4:n===null||n.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,li!==null&&(Tc(li),li=null))),hc(n,i),hn(i),null;case 5:Xu(i);var p=Br(Po.current);if(a=i.type,n!==null&&i.stateNode!=null)Wh(n,i,a,u,p),n.ref!==i.ref&&(i.flags|=512,i.flags|=2097152);else{if(!u){if(i.stateNode===null)throw Error(t(166));return hn(i),null}if(n=Br(Si.current),ka(i)){u=i.stateNode,a=i.type;var v=i.memoizedProps;switch(u[yi]=i,u[Ao]=v,n=(i.mode&1)!==0,a){case"dialog":Lt("cancel",u),Lt("close",u);break;case"iframe":case"object":case"embed":Lt("load",u);break;case"video":case"audio":for(p=0;p<Eo.length;p++)Lt(Eo[p],u);break;case"source":Lt("error",u);break;case"img":case"image":case"link":Lt("error",u),Lt("load",u);break;case"details":Lt("toggle",u);break;case"input":Ze(u,v),Lt("invalid",u);break;case"select":u._wrapperState={wasMultiple:!!v.multiple},Lt("invalid",u);break;case"textarea":_e(u,v),Lt("invalid",u)}it(a,v),p=null;for(var T in v)if(v.hasOwnProperty(T)){var F=v[T];T==="children"?typeof F=="string"?u.textContent!==F&&(v.suppressHydrationWarning!==!0&&La(u.textContent,F,n),p=["children",F]):typeof F=="number"&&u.textContent!==""+F&&(v.suppressHydrationWarning!==!0&&La(u.textContent,F,n),p=["children",""+F]):o.hasOwnProperty(T)&&F!=null&&T==="onScroll"&&Lt("scroll",u)}switch(a){case"input":et(u),st(u,v,!0);break;case"textarea":et(u),Ge(u);break;case"select":case"option":break;default:typeof v.onClick=="function"&&(u.onclick=Pa)}u=p,i.updateQueue=u,u!==null&&(i.flags|=4)}else{T=p.nodeType===9?p:p.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=Re(a)),n==="http://www.w3.org/1999/xhtml"?a==="script"?(n=T.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof u.is=="string"?n=T.createElement(a,{is:u.is}):(n=T.createElement(a),a==="select"&&(T=n,u.multiple?T.multiple=!0:u.size&&(T.size=u.size))):n=T.createElementNS(n,a),n[yi]=i,n[Ao]=u,Vh(n,i,!1,!1),i.stateNode=n;e:{switch(T=gt(a,u),a){case"dialog":Lt("cancel",n),Lt("close",n),p=u;break;case"iframe":case"object":case"embed":Lt("load",n),p=u;break;case"video":case"audio":for(p=0;p<Eo.length;p++)Lt(Eo[p],n);p=u;break;case"source":Lt("error",n),p=u;break;case"img":case"image":case"link":Lt("error",n),Lt("load",n),p=u;break;case"details":Lt("toggle",n),p=u;break;case"input":Ze(n,u),p=We(n,u),Lt("invalid",n);break;case"option":p=u;break;case"select":n._wrapperState={wasMultiple:!!u.multiple},p=z({},u,{value:void 0}),Lt("invalid",n);break;case"textarea":_e(n,u),p=ye(n,u),Lt("invalid",n);break;default:p=u}it(a,p),F=p;for(v in F)if(F.hasOwnProperty(v)){var H=F[v];v==="style"?je(n,H):v==="dangerouslySetInnerHTML"?(H=H?H.__html:void 0,H!=null&&ot(n,H)):v==="children"?typeof H=="string"?(a!=="textarea"||H!=="")&&ge(n,H):typeof H=="number"&&ge(n,""+H):v!=="suppressContentEditableWarning"&&v!=="suppressHydrationWarning"&&v!=="autoFocus"&&(o.hasOwnProperty(v)?H!=null&&v==="onScroll"&&Lt("scroll",n):H!=null&&b(n,v,H,T))}switch(a){case"input":et(n),st(n,u,!1);break;case"textarea":et(n),Ge(n);break;case"option":u.value!=null&&n.setAttribute("value",""+we(u.value));break;case"select":n.multiple=!!u.multiple,v=u.value,v!=null?ne(n,!!u.multiple,v,!1):u.defaultValue!=null&&ne(n,!!u.multiple,u.defaultValue,!0);break;default:typeof p.onClick=="function"&&(n.onclick=Pa)}switch(a){case"button":case"input":case"select":case"textarea":u=!!u.autoFocus;break e;case"img":u=!0;break e;default:u=!1}}u&&(i.flags|=4)}i.ref!==null&&(i.flags|=512,i.flags|=2097152)}return hn(i),null;case 6:if(n&&i.stateNode!=null)jh(n,i,n.memoizedProps,u);else{if(typeof u!="string"&&i.stateNode===null)throw Error(t(166));if(a=Br(Po.current),Br(Si.current),ka(i)){if(u=i.stateNode,a=i.memoizedProps,u[yi]=i,(v=u.nodeValue!==a)&&(n=Hn,n!==null))switch(n.tag){case 3:La(u.nodeValue,a,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&La(u.nodeValue,a,(n.mode&1)!==0)}v&&(i.flags|=4)}else u=(a.nodeType===9?a:a.ownerDocument).createTextNode(u),u[yi]=i,i.stateNode=u}return hn(i),null;case 13:if(Pt(Ot),u=i.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(Nt&&Gn!==null&&(i.mode&1)!==0&&(i.flags&128)===0)qf(),ys(),i.flags|=98560,v=!1;else if(v=ka(i),u!==null&&u.dehydrated!==null){if(n===null){if(!v)throw Error(t(318));if(v=i.memoizedState,v=v!==null?v.dehydrated:null,!v)throw Error(t(317));v[yi]=i}else ys(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;hn(i),v=!1}else li!==null&&(Tc(li),li=null),v=!0;if(!v)return i.flags&65536?i:null}return(i.flags&128)!==0?(i.lanes=a,i):(u=u!==null,u!==(n!==null&&n.memoizedState!==null)&&u&&(i.child.flags|=8192,(i.mode&1)!==0&&(n===null||(Ot.current&1)!==0?$t===0&&($t=3):Cc())),i.updateQueue!==null&&(i.flags|=4),hn(i),null);case 4:return Ts(),hc(n,i),n===null&&To(i.stateNode.containerInfo),hn(i),null;case 10:return Hu(i.type._context),hn(i),null;case 17:return Ln(i.type)&&Ia(),hn(i),null;case 19:if(Pt(Ot),v=i.memoizedState,v===null)return hn(i),null;if(u=(i.flags&128)!==0,T=v.rendering,T===null)if(u)Oo(v,!1);else{if($t!==0||n!==null&&(n.flags&128)!==0)for(n=i.child;n!==null;){if(T=Wa(n),T!==null){for(i.flags|=128,Oo(v,!1),u=T.updateQueue,u!==null&&(i.updateQueue=u,i.flags|=4),i.subtreeFlags=0,u=a,a=i.child;a!==null;)v=a,n=u,v.flags&=14680066,T=v.alternate,T===null?(v.childLanes=0,v.lanes=n,v.child=null,v.subtreeFlags=0,v.memoizedProps=null,v.memoizedState=null,v.updateQueue=null,v.dependencies=null,v.stateNode=null):(v.childLanes=T.childLanes,v.lanes=T.lanes,v.child=T.child,v.subtreeFlags=0,v.deletions=null,v.memoizedProps=T.memoizedProps,v.memoizedState=T.memoizedState,v.updateQueue=T.updateQueue,v.type=T.type,n=T.dependencies,v.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),a=a.sibling;return Rt(Ot,Ot.current&1|2),i.child}n=n.sibling}v.tail!==null&&Ne()>bs&&(i.flags|=128,u=!0,Oo(v,!1),i.lanes=4194304)}else{if(!u)if(n=Wa(T),n!==null){if(i.flags|=128,u=!0,a=n.updateQueue,a!==null&&(i.updateQueue=a,i.flags|=4),Oo(v,!0),v.tail===null&&v.tailMode==="hidden"&&!T.alternate&&!Nt)return hn(i),null}else 2*Ne()-v.renderingStartTime>bs&&a!==1073741824&&(i.flags|=128,u=!0,Oo(v,!1),i.lanes=4194304);v.isBackwards?(T.sibling=i.child,i.child=T):(a=v.last,a!==null?a.sibling=T:i.child=T,v.last=T)}return v.tail!==null?(i=v.tail,v.rendering=i,v.tail=i.sibling,v.renderingStartTime=Ne(),i.sibling=null,a=Ot.current,Rt(Ot,u?a&1|2:a&1),i):(hn(i),null);case 22:case 23:return Ac(),u=i.memoizedState!==null,n!==null&&n.memoizedState!==null!==u&&(i.flags|=8192),u&&(i.mode&1)!==0?(Vn&1073741824)!==0&&(hn(i),i.subtreeFlags&6&&(i.flags|=8192)):hn(i),null;case 24:return null;case 25:return null}throw Error(t(156,i.tag))}function Ev(n,i){switch(Uu(i),i.tag){case 1:return Ln(i.type)&&Ia(),n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 3:return Ts(),Pt(Rn),Pt(dn),qu(),n=i.flags,(n&65536)!==0&&(n&128)===0?(i.flags=n&-65537|128,i):null;case 5:return Xu(i),null;case 13:if(Pt(Ot),n=i.memoizedState,n!==null&&n.dehydrated!==null){if(i.alternate===null)throw Error(t(340));ys()}return n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 19:return Pt(Ot),null;case 4:return Ts(),null;case 10:return Hu(i.type._context),null;case 22:case 23:return Ac(),null;case 24:return null;default:return null}}var Ja=!1,pn=!1,Tv=typeof WeakSet=="function"?WeakSet:Set,Ue=null;function As(n,i){var a=n.ref;if(a!==null)if(typeof a=="function")try{a(null)}catch(u){Ht(n,i,u)}else a.current=null}function pc(n,i,a){try{a()}catch(u){Ht(n,i,u)}}var Xh=!1;function wv(n,i){if(Au=xa,n=Tf(),_u(n)){if("selectionStart"in n)var a={start:n.selectionStart,end:n.selectionEnd};else e:{a=(a=n.ownerDocument)&&a.defaultView||window;var u=a.getSelection&&a.getSelection();if(u&&u.rangeCount!==0){a=u.anchorNode;var p=u.anchorOffset,v=u.focusNode;u=u.focusOffset;try{a.nodeType,v.nodeType}catch{a=null;break e}var T=0,F=-1,H=-1,re=0,me=0,xe=n,pe=null;t:for(;;){for(var Ie;xe!==a||p!==0&&xe.nodeType!==3||(F=T+p),xe!==v||u!==0&&xe.nodeType!==3||(H=T+u),xe.nodeType===3&&(T+=xe.nodeValue.length),(Ie=xe.firstChild)!==null;)pe=xe,xe=Ie;for(;;){if(xe===n)break t;if(pe===a&&++re===p&&(F=T),pe===v&&++me===u&&(H=T),(Ie=xe.nextSibling)!==null)break;xe=pe,pe=xe.parentNode}xe=Ie}a=F===-1||H===-1?null:{start:F,end:H}}else a=null}a=a||{start:0,end:0}}else a=null;for(Cu={focusedElem:n,selectionRange:a},xa=!1,Ue=i;Ue!==null;)if(i=Ue,n=i.child,(i.subtreeFlags&1028)!==0&&n!==null)n.return=i,Ue=n;else for(;Ue!==null;){i=Ue;try{var Fe=i.alternate;if((i.flags&1024)!==0)switch(i.tag){case 0:case 11:case 15:break;case 1:if(Fe!==null){var ze=Fe.memoizedProps,Vt=Fe.memoizedState,K=i.stateNode,j=K.getSnapshotBeforeUpdate(i.elementType===i.type?ze:ui(i.type,ze),Vt);K.__reactInternalSnapshotBeforeUpdate=j}break;case 3:var ee=i.stateNode.containerInfo;ee.nodeType===1?ee.textContent="":ee.nodeType===9&&ee.documentElement&&ee.removeChild(ee.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(t(163))}}catch(Ee){Ht(i,i.return,Ee)}if(n=i.sibling,n!==null){n.return=i.return,Ue=n;break}Ue=i.return}return Fe=Xh,Xh=!1,Fe}function Fo(n,i,a){var u=i.updateQueue;if(u=u!==null?u.lastEffect:null,u!==null){var p=u=u.next;do{if((p.tag&n)===n){var v=p.destroy;p.destroy=void 0,v!==void 0&&pc(i,a,v)}p=p.next}while(p!==u)}}function el(n,i){if(i=i.updateQueue,i=i!==null?i.lastEffect:null,i!==null){var a=i=i.next;do{if((a.tag&n)===n){var u=a.create;a.destroy=u()}a=a.next}while(a!==i)}}function mc(n){var i=n.ref;if(i!==null){var a=n.stateNode;n.tag,n=a,typeof i=="function"?i(n):i.current=n}}function Yh(n){var i=n.alternate;i!==null&&(n.alternate=null,Yh(i)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(i=n.stateNode,i!==null&&(delete i[yi],delete i[Ao],delete i[Pu],delete i[av],delete i[lv])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function qh(n){return n.tag===5||n.tag===3||n.tag===4}function $h(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||qh(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function gc(n,i,a){var u=n.tag;if(u===5||u===6)n=n.stateNode,i?a.nodeType===8?a.parentNode.insertBefore(n,i):a.insertBefore(n,i):(a.nodeType===8?(i=a.parentNode,i.insertBefore(n,a)):(i=a,i.appendChild(n)),a=a._reactRootContainer,a!=null||i.onclick!==null||(i.onclick=Pa));else if(u!==4&&(n=n.child,n!==null))for(gc(n,i,a),n=n.sibling;n!==null;)gc(n,i,a),n=n.sibling}function vc(n,i,a){var u=n.tag;if(u===5||u===6)n=n.stateNode,i?a.insertBefore(n,i):a.appendChild(n);else if(u!==4&&(n=n.child,n!==null))for(vc(n,i,a),n=n.sibling;n!==null;)vc(n,i,a),n=n.sibling}var on=null,ci=!1;function cr(n,i,a){for(a=a.child;a!==null;)Kh(n,i,a),a=a.sibling}function Kh(n,i,a){if(mt&&typeof mt.onCommitFiberUnmount=="function")try{mt.onCommitFiberUnmount(Cn,a)}catch{}switch(a.tag){case 5:pn||As(a,i);case 6:var u=on,p=ci;on=null,cr(n,i,a),on=u,ci=p,on!==null&&(ci?(n=on,a=a.stateNode,n.nodeType===8?n.parentNode.removeChild(a):n.removeChild(a)):on.removeChild(a.stateNode));break;case 18:on!==null&&(ci?(n=on,a=a.stateNode,n.nodeType===8?Lu(n.parentNode,a):n.nodeType===1&&Lu(n,a),mo(n)):Lu(on,a.stateNode));break;case 4:u=on,p=ci,on=a.stateNode.containerInfo,ci=!0,cr(n,i,a),on=u,ci=p;break;case 0:case 11:case 14:case 15:if(!pn&&(u=a.updateQueue,u!==null&&(u=u.lastEffect,u!==null))){p=u=u.next;do{var v=p,T=v.destroy;v=v.tag,T!==void 0&&((v&2)!==0||(v&4)!==0)&&pc(a,i,T),p=p.next}while(p!==u)}cr(n,i,a);break;case 1:if(!pn&&(As(a,i),u=a.stateNode,typeof u.componentWillUnmount=="function"))try{u.props=a.memoizedProps,u.state=a.memoizedState,u.componentWillUnmount()}catch(F){Ht(a,i,F)}cr(n,i,a);break;case 21:cr(n,i,a);break;case 22:a.mode&1?(pn=(u=pn)||a.memoizedState!==null,cr(n,i,a),pn=u):cr(n,i,a);break;default:cr(n,i,a)}}function Zh(n){var i=n.updateQueue;if(i!==null){n.updateQueue=null;var a=n.stateNode;a===null&&(a=n.stateNode=new Tv),i.forEach(function(u){var p=Nv.bind(null,n,u);a.has(u)||(a.add(u),u.then(p,p))})}}function di(n,i){var a=i.deletions;if(a!==null)for(var u=0;u<a.length;u++){var p=a[u];try{var v=n,T=i,F=T;e:for(;F!==null;){switch(F.tag){case 5:on=F.stateNode,ci=!1;break e;case 3:on=F.stateNode.containerInfo,ci=!0;break e;case 4:on=F.stateNode.containerInfo,ci=!0;break e}F=F.return}if(on===null)throw Error(t(160));Kh(v,T,p),on=null,ci=!1;var H=p.alternate;H!==null&&(H.return=null),p.return=null}catch(re){Ht(p,i,re)}}if(i.subtreeFlags&12854)for(i=i.child;i!==null;)Qh(i,n),i=i.sibling}function Qh(n,i){var a=n.alternate,u=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(di(i,n),Ei(n),u&4){try{Fo(3,n,n.return),el(3,n)}catch(ze){Ht(n,n.return,ze)}try{Fo(5,n,n.return)}catch(ze){Ht(n,n.return,ze)}}break;case 1:di(i,n),Ei(n),u&512&&a!==null&&As(a,a.return);break;case 5:if(di(i,n),Ei(n),u&512&&a!==null&&As(a,a.return),n.flags&32){var p=n.stateNode;try{ge(p,"")}catch(ze){Ht(n,n.return,ze)}}if(u&4&&(p=n.stateNode,p!=null)){var v=n.memoizedProps,T=a!==null?a.memoizedProps:v,F=n.type,H=n.updateQueue;if(n.updateQueue=null,H!==null)try{F==="input"&&v.type==="radio"&&v.name!=null&&Be(p,v),gt(F,T);var re=gt(F,v);for(T=0;T<H.length;T+=2){var me=H[T],xe=H[T+1];me==="style"?je(p,xe):me==="dangerouslySetInnerHTML"?ot(p,xe):me==="children"?ge(p,xe):b(p,me,xe,re)}switch(F){case"input":Mt(p,v);break;case"textarea":Se(p,v);break;case"select":var pe=p._wrapperState.wasMultiple;p._wrapperState.wasMultiple=!!v.multiple;var Ie=v.value;Ie!=null?ne(p,!!v.multiple,Ie,!1):pe!==!!v.multiple&&(v.defaultValue!=null?ne(p,!!v.multiple,v.defaultValue,!0):ne(p,!!v.multiple,v.multiple?[]:"",!1))}p[Ao]=v}catch(ze){Ht(n,n.return,ze)}}break;case 6:if(di(i,n),Ei(n),u&4){if(n.stateNode===null)throw Error(t(162));p=n.stateNode,v=n.memoizedProps;try{p.nodeValue=v}catch(ze){Ht(n,n.return,ze)}}break;case 3:if(di(i,n),Ei(n),u&4&&a!==null&&a.memoizedState.isDehydrated)try{mo(i.containerInfo)}catch(ze){Ht(n,n.return,ze)}break;case 4:di(i,n),Ei(n);break;case 13:di(i,n),Ei(n),p=n.child,p.flags&8192&&(v=p.memoizedState!==null,p.stateNode.isHidden=v,!v||p.alternate!==null&&p.alternate.memoizedState!==null||(yc=Ne())),u&4&&Zh(n);break;case 22:if(me=a!==null&&a.memoizedState!==null,n.mode&1?(pn=(re=pn)||me,di(i,n),pn=re):di(i,n),Ei(n),u&8192){if(re=n.memoizedState!==null,(n.stateNode.isHidden=re)&&!me&&(n.mode&1)!==0)for(Ue=n,me=n.child;me!==null;){for(xe=Ue=me;Ue!==null;){switch(pe=Ue,Ie=pe.child,pe.tag){case 0:case 11:case 14:case 15:Fo(4,pe,pe.return);break;case 1:As(pe,pe.return);var Fe=pe.stateNode;if(typeof Fe.componentWillUnmount=="function"){u=pe,a=pe.return;try{i=u,Fe.props=i.memoizedProps,Fe.state=i.memoizedState,Fe.componentWillUnmount()}catch(ze){Ht(u,a,ze)}}break;case 5:As(pe,pe.return);break;case 22:if(pe.memoizedState!==null){tp(xe);continue}}Ie!==null?(Ie.return=pe,Ue=Ie):tp(xe)}me=me.sibling}e:for(me=null,xe=n;;){if(xe.tag===5){if(me===null){me=xe;try{p=xe.stateNode,re?(v=p.style,typeof v.setProperty=="function"?v.setProperty("display","none","important"):v.display="none"):(F=xe.stateNode,H=xe.memoizedProps.style,T=H!=null&&H.hasOwnProperty("display")?H.display:null,F.style.display=tt("display",T))}catch(ze){Ht(n,n.return,ze)}}}else if(xe.tag===6){if(me===null)try{xe.stateNode.nodeValue=re?"":xe.memoizedProps}catch(ze){Ht(n,n.return,ze)}}else if((xe.tag!==22&&xe.tag!==23||xe.memoizedState===null||xe===n)&&xe.child!==null){xe.child.return=xe,xe=xe.child;continue}if(xe===n)break e;for(;xe.sibling===null;){if(xe.return===null||xe.return===n)break e;me===xe&&(me=null),xe=xe.return}me===xe&&(me=null),xe.sibling.return=xe.return,xe=xe.sibling}}break;case 19:di(i,n),Ei(n),u&4&&Zh(n);break;case 21:break;default:di(i,n),Ei(n)}}function Ei(n){var i=n.flags;if(i&2){try{e:{for(var a=n.return;a!==null;){if(qh(a)){var u=a;break e}a=a.return}throw Error(t(160))}switch(u.tag){case 5:var p=u.stateNode;u.flags&32&&(ge(p,""),u.flags&=-33);var v=$h(n);vc(n,v,p);break;case 3:case 4:var T=u.stateNode.containerInfo,F=$h(n);gc(n,F,T);break;default:throw Error(t(161))}}catch(H){Ht(n,n.return,H)}n.flags&=-3}i&4096&&(n.flags&=-4097)}function Av(n,i,a){Ue=n,Jh(n)}function Jh(n,i,a){for(var u=(n.mode&1)!==0;Ue!==null;){var p=Ue,v=p.child;if(p.tag===22&&u){var T=p.memoizedState!==null||Ja;if(!T){var F=p.alternate,H=F!==null&&F.memoizedState!==null||pn;F=Ja;var re=pn;if(Ja=T,(pn=H)&&!re)for(Ue=p;Ue!==null;)T=Ue,H=T.child,T.tag===22&&T.memoizedState!==null?np(p):H!==null?(H.return=T,Ue=H):np(p);for(;v!==null;)Ue=v,Jh(v),v=v.sibling;Ue=p,Ja=F,pn=re}ep(n)}else(p.subtreeFlags&8772)!==0&&v!==null?(v.return=p,Ue=v):ep(n)}}function ep(n){for(;Ue!==null;){var i=Ue;if((i.flags&8772)!==0){var a=i.alternate;try{if((i.flags&8772)!==0)switch(i.tag){case 0:case 11:case 15:pn||el(5,i);break;case 1:var u=i.stateNode;if(i.flags&4&&!pn)if(a===null)u.componentDidMount();else{var p=i.elementType===i.type?a.memoizedProps:ui(i.type,a.memoizedProps);u.componentDidUpdate(p,a.memoizedState,u.__reactInternalSnapshotBeforeUpdate)}var v=i.updateQueue;v!==null&&th(i,v,u);break;case 3:var T=i.updateQueue;if(T!==null){if(a=null,i.child!==null)switch(i.child.tag){case 5:a=i.child.stateNode;break;case 1:a=i.child.stateNode}th(i,T,a)}break;case 5:var F=i.stateNode;if(a===null&&i.flags&4){a=F;var H=i.memoizedProps;switch(i.type){case"button":case"input":case"select":case"textarea":H.autoFocus&&a.focus();break;case"img":H.src&&(a.src=H.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(i.memoizedState===null){var re=i.alternate;if(re!==null){var me=re.memoizedState;if(me!==null){var xe=me.dehydrated;xe!==null&&mo(xe)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(t(163))}pn||i.flags&512&&mc(i)}catch(pe){Ht(i,i.return,pe)}}if(i===n){Ue=null;break}if(a=i.sibling,a!==null){a.return=i.return,Ue=a;break}Ue=i.return}}function tp(n){for(;Ue!==null;){var i=Ue;if(i===n){Ue=null;break}var a=i.sibling;if(a!==null){a.return=i.return,Ue=a;break}Ue=i.return}}function np(n){for(;Ue!==null;){var i=Ue;try{switch(i.tag){case 0:case 11:case 15:var a=i.return;try{el(4,i)}catch(H){Ht(i,a,H)}break;case 1:var u=i.stateNode;if(typeof u.componentDidMount=="function"){var p=i.return;try{u.componentDidMount()}catch(H){Ht(i,p,H)}}var v=i.return;try{mc(i)}catch(H){Ht(i,v,H)}break;case 5:var T=i.return;try{mc(i)}catch(H){Ht(i,T,H)}}}catch(H){Ht(i,i.return,H)}if(i===n){Ue=null;break}var F=i.sibling;if(F!==null){F.return=i.return,Ue=F;break}Ue=i.return}}var Cv=Math.ceil,tl=L.ReactCurrentDispatcher,_c=L.ReactCurrentOwner,ei=L.ReactCurrentBatchConfig,vt=0,tn=null,Wt=null,an=0,Vn=0,Cs=sr(0),$t=0,ko=null,Hr=0,nl=0,xc=0,Bo=null,Dn=null,yc=0,bs=1/0,Fi=null,il=!1,Sc=null,dr=null,rl=!1,fr=null,sl=0,zo=0,Mc=null,ol=-1,al=0;function Mn(){return(vt&6)!==0?Ne():ol!==-1?ol:ol=Ne()}function hr(n){return(n.mode&1)===0?1:(vt&2)!==0&&an!==0?an&-an:cv.transition!==null?(al===0&&(al=ga()),al):(n=wt,n!==0||(n=window.event,n=n===void 0?16:rf(n.type)),n)}function fi(n,i,a,u){if(50<zo)throw zo=0,Mc=null,Error(t(185));uo(n,a,u),((vt&2)===0||n!==tn)&&(n===tn&&((vt&2)===0&&(nl|=a),$t===4&&pr(n,an)),In(n,u),a===1&&vt===0&&(i.mode&1)===0&&(bs=Ne()+500,Ua&&ar()))}function In(n,i){var a=n.callbackNode;bn(n,i);var u=$n(n,n===tn?an:0);if(u===0)a!==null&&De(a),n.callbackNode=null,n.callbackPriority=0;else if(i=u&-u,n.callbackPriority!==i){if(a!=null&&De(a),i===1)n.tag===0?uv(rp.bind(null,n)):Vf(rp.bind(null,n)),sv(function(){(vt&6)===0&&ar()}),a=null;else{switch($d(u)){case 1:a=nt;break;case 4:a=rt;break;case 16:a=bt;break;case 536870912:a=Gt;break;default:a=bt}a=fp(a,ip.bind(null,n))}n.callbackPriority=i,n.callbackNode=a}}function ip(n,i){if(ol=-1,al=0,(vt&6)!==0)throw Error(t(327));var a=n.callbackNode;if(Rs()&&n.callbackNode!==a)return null;var u=$n(n,n===tn?an:0);if(u===0)return null;if((u&30)!==0||(u&n.expiredLanes)!==0||i)i=ll(n,u);else{i=u;var p=vt;vt|=2;var v=op();(tn!==n||an!==i)&&(Fi=null,bs=Ne()+500,Vr(n,i));do try{Lv();break}catch(F){sp(n,F)}while(!0);zu(),tl.current=v,vt=p,Wt!==null?i=0:(tn=null,an=0,i=$t)}if(i!==0){if(i===2&&(p=Ir(n),p!==0&&(u=p,i=Ec(n,p))),i===1)throw a=ko,Vr(n,0),pr(n,u),In(n,Ne()),a;if(i===6)pr(n,u);else{if(p=n.current.alternate,(u&30)===0&&!bv(p)&&(i=ll(n,u),i===2&&(v=Ir(n),v!==0&&(u=v,i=Ec(n,v))),i===1))throw a=ko,Vr(n,0),pr(n,u),In(n,Ne()),a;switch(n.finishedWork=p,n.finishedLanes=u,i){case 0:case 1:throw Error(t(345));case 2:Wr(n,Dn,Fi);break;case 3:if(pr(n,u),(u&130023424)===u&&(i=yc+500-Ne(),10<i)){if($n(n,0)!==0)break;if(p=n.suspendedLanes,(p&u)!==u){Mn(),n.pingedLanes|=n.suspendedLanes&p;break}n.timeoutHandle=Ru(Wr.bind(null,n,Dn,Fi),i);break}Wr(n,Dn,Fi);break;case 4:if(pr(n,u),(u&4194240)===u)break;for(i=n.eventTimes,p=-1;0<u;){var T=31-yn(u);v=1<<T,T=i[T],T>p&&(p=T),u&=~v}if(u=p,u=Ne()-u,u=(120>u?120:480>u?480:1080>u?1080:1920>u?1920:3e3>u?3e3:4320>u?4320:1960*Cv(u/1960))-u,10<u){n.timeoutHandle=Ru(Wr.bind(null,n,Dn,Fi),u);break}Wr(n,Dn,Fi);break;case 5:Wr(n,Dn,Fi);break;default:throw Error(t(329))}}}return In(n,Ne()),n.callbackNode===a?ip.bind(null,n):null}function Ec(n,i){var a=Bo;return n.current.memoizedState.isDehydrated&&(Vr(n,i).flags|=256),n=ll(n,i),n!==2&&(i=Dn,Dn=a,i!==null&&Tc(i)),n}function Tc(n){Dn===null?Dn=n:Dn.push.apply(Dn,n)}function bv(n){for(var i=n;;){if(i.flags&16384){var a=i.updateQueue;if(a!==null&&(a=a.stores,a!==null))for(var u=0;u<a.length;u++){var p=a[u],v=p.getSnapshot;p=p.value;try{if(!ai(v(),p))return!1}catch{return!1}}}if(a=i.child,i.subtreeFlags&16384&&a!==null)a.return=i,i=a;else{if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function pr(n,i){for(i&=~xc,i&=~nl,n.suspendedLanes|=i,n.pingedLanes&=~i,n=n.expirationTimes;0<i;){var a=31-yn(i),u=1<<a;n[a]=-1,i&=~u}}function rp(n){if((vt&6)!==0)throw Error(t(327));Rs();var i=$n(n,0);if((i&1)===0)return In(n,Ne()),null;var a=ll(n,i);if(n.tag!==0&&a===2){var u=Ir(n);u!==0&&(i=u,a=Ec(n,u))}if(a===1)throw a=ko,Vr(n,0),pr(n,i),In(n,Ne()),a;if(a===6)throw Error(t(345));return n.finishedWork=n.current.alternate,n.finishedLanes=i,Wr(n,Dn,Fi),In(n,Ne()),null}function wc(n,i){var a=vt;vt|=1;try{return n(i)}finally{vt=a,vt===0&&(bs=Ne()+500,Ua&&ar())}}function Gr(n){fr!==null&&fr.tag===0&&(vt&6)===0&&Rs();var i=vt;vt|=1;var a=ei.transition,u=wt;try{if(ei.transition=null,wt=1,n)return n()}finally{wt=u,ei.transition=a,vt=i,(vt&6)===0&&ar()}}function Ac(){Vn=Cs.current,Pt(Cs)}function Vr(n,i){n.finishedWork=null,n.finishedLanes=0;var a=n.timeoutHandle;if(a!==-1&&(n.timeoutHandle=-1,rv(a)),Wt!==null)for(a=Wt.return;a!==null;){var u=a;switch(Uu(u),u.tag){case 1:u=u.type.childContextTypes,u!=null&&Ia();break;case 3:Ts(),Pt(Rn),Pt(dn),qu();break;case 5:Xu(u);break;case 4:Ts();break;case 13:Pt(Ot);break;case 19:Pt(Ot);break;case 10:Hu(u.type._context);break;case 22:case 23:Ac()}a=a.return}if(tn=n,Wt=n=mr(n.current,null),an=Vn=i,$t=0,ko=null,xc=nl=Hr=0,Dn=Bo=null,kr!==null){for(i=0;i<kr.length;i++)if(a=kr[i],u=a.interleaved,u!==null){a.interleaved=null;var p=u.next,v=a.pending;if(v!==null){var T=v.next;v.next=p,u.next=T}a.pending=u}kr=null}return n}function sp(n,i){do{var a=Wt;try{if(zu(),ja.current=$a,Xa){for(var u=Ft.memoizedState;u!==null;){var p=u.queue;p!==null&&(p.pending=null),u=u.next}Xa=!1}if(zr=0,en=qt=Ft=null,Do=!1,Io=0,_c.current=null,a===null||a.return===null){$t=1,ko=i,Wt=null;break}e:{var v=n,T=a.return,F=a,H=i;if(i=an,F.flags|=32768,H!==null&&typeof H=="object"&&typeof H.then=="function"){var re=H,me=F,xe=me.tag;if((me.mode&1)===0&&(xe===0||xe===11||xe===15)){var pe=me.alternate;pe?(me.updateQueue=pe.updateQueue,me.memoizedState=pe.memoizedState,me.lanes=pe.lanes):(me.updateQueue=null,me.memoizedState=null)}var Ie=Lh(T);if(Ie!==null){Ie.flags&=-257,Ph(Ie,T,F,v,i),Ie.mode&1&&Rh(v,re,i),i=Ie,H=re;var Fe=i.updateQueue;if(Fe===null){var ze=new Set;ze.add(H),i.updateQueue=ze}else Fe.add(H);break e}else{if((i&1)===0){Rh(v,re,i),Cc();break e}H=Error(t(426))}}else if(Nt&&F.mode&1){var Vt=Lh(T);if(Vt!==null){(Vt.flags&65536)===0&&(Vt.flags|=256),Ph(Vt,T,F,v,i),ku(ws(H,F));break e}}v=H=ws(H,F),$t!==4&&($t=2),Bo===null?Bo=[v]:Bo.push(v),v=T;do{switch(v.tag){case 3:v.flags|=65536,i&=-i,v.lanes|=i;var K=Ch(v,H,i);eh(v,K);break e;case 1:F=H;var j=v.type,ee=v.stateNode;if((v.flags&128)===0&&(typeof j.getDerivedStateFromError=="function"||ee!==null&&typeof ee.componentDidCatch=="function"&&(dr===null||!dr.has(ee)))){v.flags|=65536,i&=-i,v.lanes|=i;var Ee=bh(v,F,i);eh(v,Ee);break e}}v=v.return}while(v!==null)}lp(a)}catch(He){i=He,Wt===a&&a!==null&&(Wt=a=a.return);continue}break}while(!0)}function op(){var n=tl.current;return tl.current=$a,n===null?$a:n}function Cc(){($t===0||$t===3||$t===2)&&($t=4),tn===null||(Hr&268435455)===0&&(nl&268435455)===0||pr(tn,an)}function ll(n,i){var a=vt;vt|=2;var u=op();(tn!==n||an!==i)&&(Fi=null,Vr(n,i));do try{Rv();break}catch(p){sp(n,p)}while(!0);if(zu(),vt=a,tl.current=u,Wt!==null)throw Error(t(261));return tn=null,an=0,$t}function Rv(){for(;Wt!==null;)ap(Wt)}function Lv(){for(;Wt!==null&&!Ve();)ap(Wt)}function ap(n){var i=dp(n.alternate,n,Vn);n.memoizedProps=n.pendingProps,i===null?lp(n):Wt=i,_c.current=null}function lp(n){var i=n;do{var a=i.alternate;if(n=i.return,(i.flags&32768)===0){if(a=Mv(a,i,Vn),a!==null){Wt=a;return}}else{if(a=Ev(a,i),a!==null){a.flags&=32767,Wt=a;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{$t=6,Wt=null;return}}if(i=i.sibling,i!==null){Wt=i;return}Wt=i=n}while(i!==null);$t===0&&($t=5)}function Wr(n,i,a){var u=wt,p=ei.transition;try{ei.transition=null,wt=1,Pv(n,i,a,u)}finally{ei.transition=p,wt=u}return null}function Pv(n,i,a,u){do Rs();while(fr!==null);if((vt&6)!==0)throw Error(t(327));a=n.finishedWork;var p=n.finishedLanes;if(a===null)return null;if(n.finishedWork=null,n.finishedLanes=0,a===n.current)throw Error(t(177));n.callbackNode=null,n.callbackPriority=0;var v=a.lanes|a.childLanes;if(d0(n,v),n===tn&&(Wt=tn=null,an=0),(a.subtreeFlags&2064)===0&&(a.flags&2064)===0||rl||(rl=!0,fp(bt,function(){return Rs(),null})),v=(a.flags&15990)!==0,(a.subtreeFlags&15990)!==0||v){v=ei.transition,ei.transition=null;var T=wt;wt=1;var F=vt;vt|=4,_c.current=null,wv(n,a),Qh(a,n),Z0(Cu),xa=!!Au,Cu=Au=null,n.current=a,Av(a),Ke(),vt=F,wt=T,ei.transition=v}else n.current=a;if(rl&&(rl=!1,fr=n,sl=p),v=n.pendingLanes,v===0&&(dr=null),ut(a.stateNode),In(n,Ne()),i!==null)for(u=n.onRecoverableError,a=0;a<i.length;a++)p=i[a],u(p.value,{componentStack:p.stack,digest:p.digest});if(il)throw il=!1,n=Sc,Sc=null,n;return(sl&1)!==0&&n.tag!==0&&Rs(),v=n.pendingLanes,(v&1)!==0?n===Mc?zo++:(zo=0,Mc=n):zo=0,ar(),null}function Rs(){if(fr!==null){var n=$d(sl),i=ei.transition,a=wt;try{if(ei.transition=null,wt=16>n?16:n,fr===null)var u=!1;else{if(n=fr,fr=null,sl=0,(vt&6)!==0)throw Error(t(331));var p=vt;for(vt|=4,Ue=n.current;Ue!==null;){var v=Ue,T=v.child;if((Ue.flags&16)!==0){var F=v.deletions;if(F!==null){for(var H=0;H<F.length;H++){var re=F[H];for(Ue=re;Ue!==null;){var me=Ue;switch(me.tag){case 0:case 11:case 15:Fo(8,me,v)}var xe=me.child;if(xe!==null)xe.return=me,Ue=xe;else for(;Ue!==null;){me=Ue;var pe=me.sibling,Ie=me.return;if(Yh(me),me===re){Ue=null;break}if(pe!==null){pe.return=Ie,Ue=pe;break}Ue=Ie}}}var Fe=v.alternate;if(Fe!==null){var ze=Fe.child;if(ze!==null){Fe.child=null;do{var Vt=ze.sibling;ze.sibling=null,ze=Vt}while(ze!==null)}}Ue=v}}if((v.subtreeFlags&2064)!==0&&T!==null)T.return=v,Ue=T;else e:for(;Ue!==null;){if(v=Ue,(v.flags&2048)!==0)switch(v.tag){case 0:case 11:case 15:Fo(9,v,v.return)}var K=v.sibling;if(K!==null){K.return=v.return,Ue=K;break e}Ue=v.return}}var j=n.current;for(Ue=j;Ue!==null;){T=Ue;var ee=T.child;if((T.subtreeFlags&2064)!==0&&ee!==null)ee.return=T,Ue=ee;else e:for(T=j;Ue!==null;){if(F=Ue,(F.flags&2048)!==0)try{switch(F.tag){case 0:case 11:case 15:el(9,F)}}catch(He){Ht(F,F.return,He)}if(F===T){Ue=null;break e}var Ee=F.sibling;if(Ee!==null){Ee.return=F.return,Ue=Ee;break e}Ue=F.return}}if(vt=p,ar(),mt&&typeof mt.onPostCommitFiberRoot=="function")try{mt.onPostCommitFiberRoot(Cn,n)}catch{}u=!0}return u}finally{wt=a,ei.transition=i}}return!1}function up(n,i,a){i=ws(a,i),i=Ch(n,i,1),n=ur(n,i,1),i=Mn(),n!==null&&(uo(n,1,i),In(n,i))}function Ht(n,i,a){if(n.tag===3)up(n,n,a);else for(;i!==null;){if(i.tag===3){up(i,n,a);break}else if(i.tag===1){var u=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof u.componentDidCatch=="function"&&(dr===null||!dr.has(u))){n=ws(a,n),n=bh(i,n,1),i=ur(i,n,1),n=Mn(),i!==null&&(uo(i,1,n),In(i,n));break}}i=i.return}}function Dv(n,i,a){var u=n.pingCache;u!==null&&u.delete(i),i=Mn(),n.pingedLanes|=n.suspendedLanes&a,tn===n&&(an&a)===a&&($t===4||$t===3&&(an&130023424)===an&&500>Ne()-yc?Vr(n,0):xc|=a),In(n,i)}function cp(n,i){i===0&&((n.mode&1)===0?i=1:(i=Zi,Zi<<=1,(Zi&130023424)===0&&(Zi=4194304)));var a=Mn();n=Ni(n,i),n!==null&&(uo(n,i,a),In(n,a))}function Iv(n){var i=n.memoizedState,a=0;i!==null&&(a=i.retryLane),cp(n,a)}function Nv(n,i){var a=0;switch(n.tag){case 13:var u=n.stateNode,p=n.memoizedState;p!==null&&(a=p.retryLane);break;case 19:u=n.stateNode;break;default:throw Error(t(314))}u!==null&&u.delete(i),cp(n,a)}var dp;dp=function(n,i,a){if(n!==null)if(n.memoizedProps!==i.pendingProps||Rn.current)Pn=!0;else{if((n.lanes&a)===0&&(i.flags&128)===0)return Pn=!1,Sv(n,i,a);Pn=(n.flags&131072)!==0}else Pn=!1,Nt&&(i.flags&1048576)!==0&&Wf(i,Fa,i.index);switch(i.lanes=0,i.tag){case 2:var u=i.type;Qa(n,i),n=i.pendingProps;var p=vs(i,dn.current);Es(i,a),p=Zu(null,i,u,n,p,a);var v=Qu();return i.flags|=1,typeof p=="object"&&p!==null&&typeof p.render=="function"&&p.$$typeof===void 0?(i.tag=1,i.memoizedState=null,i.updateQueue=null,Ln(u)?(v=!0,Na(i)):v=!1,i.memoizedState=p.state!==null&&p.state!==void 0?p.state:null,Wu(i),p.updater=Ka,i.stateNode=p,p._reactInternals=i,rc(i,u,n,a),i=lc(null,i,u,!0,v,a)):(i.tag=0,Nt&&v&&Nu(i),Sn(null,i,p,a),i=i.child),i;case 16:u=i.elementType;e:{switch(Qa(n,i),n=i.pendingProps,p=u._init,u=p(u._payload),i.type=u,p=i.tag=Ov(u),n=ui(u,n),p){case 0:i=ac(null,i,u,n,a);break e;case 1:i=Fh(null,i,u,n,a);break e;case 11:i=Dh(null,i,u,n,a);break e;case 14:i=Ih(null,i,u,ui(u.type,n),a);break e}throw Error(t(306,u,""))}return i;case 0:return u=i.type,p=i.pendingProps,p=i.elementType===u?p:ui(u,p),ac(n,i,u,p,a);case 1:return u=i.type,p=i.pendingProps,p=i.elementType===u?p:ui(u,p),Fh(n,i,u,p,a);case 3:e:{if(kh(i),n===null)throw Error(t(387));u=i.pendingProps,v=i.memoizedState,p=v.element,Jf(n,i),Va(i,u,null,a);var T=i.memoizedState;if(u=T.element,v.isDehydrated)if(v={element:u,isDehydrated:!1,cache:T.cache,pendingSuspenseBoundaries:T.pendingSuspenseBoundaries,transitions:T.transitions},i.updateQueue.baseState=v,i.memoizedState=v,i.flags&256){p=ws(Error(t(423)),i),i=Bh(n,i,u,a,p);break e}else if(u!==p){p=ws(Error(t(424)),i),i=Bh(n,i,u,a,p);break e}else for(Gn=rr(i.stateNode.containerInfo.firstChild),Hn=i,Nt=!0,li=null,a=Zf(i,null,u,a),i.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(ys(),u===p){i=Oi(n,i,a);break e}Sn(n,i,u,a)}i=i.child}return i;case 5:return nh(i),n===null&&Fu(i),u=i.type,p=i.pendingProps,v=n!==null?n.memoizedProps:null,T=p.children,bu(u,p)?T=null:v!==null&&bu(u,v)&&(i.flags|=32),Oh(n,i),Sn(n,i,T,a),i.child;case 6:return n===null&&Fu(i),null;case 13:return zh(n,i,a);case 4:return ju(i,i.stateNode.containerInfo),u=i.pendingProps,n===null?i.child=Ss(i,null,u,a):Sn(n,i,u,a),i.child;case 11:return u=i.type,p=i.pendingProps,p=i.elementType===u?p:ui(u,p),Dh(n,i,u,p,a);case 7:return Sn(n,i,i.pendingProps,a),i.child;case 8:return Sn(n,i,i.pendingProps.children,a),i.child;case 12:return Sn(n,i,i.pendingProps.children,a),i.child;case 10:e:{if(u=i.type._context,p=i.pendingProps,v=i.memoizedProps,T=p.value,Rt(za,u._currentValue),u._currentValue=T,v!==null)if(ai(v.value,T)){if(v.children===p.children&&!Rn.current){i=Oi(n,i,a);break e}}else for(v=i.child,v!==null&&(v.return=i);v!==null;){var F=v.dependencies;if(F!==null){T=v.child;for(var H=F.firstContext;H!==null;){if(H.context===u){if(v.tag===1){H=Ui(-1,a&-a),H.tag=2;var re=v.updateQueue;if(re!==null){re=re.shared;var me=re.pending;me===null?H.next=H:(H.next=me.next,me.next=H),re.pending=H}}v.lanes|=a,H=v.alternate,H!==null&&(H.lanes|=a),Gu(v.return,a,i),F.lanes|=a;break}H=H.next}}else if(v.tag===10)T=v.type===i.type?null:v.child;else if(v.tag===18){if(T=v.return,T===null)throw Error(t(341));T.lanes|=a,F=T.alternate,F!==null&&(F.lanes|=a),Gu(T,a,i),T=v.sibling}else T=v.child;if(T!==null)T.return=v;else for(T=v;T!==null;){if(T===i){T=null;break}if(v=T.sibling,v!==null){v.return=T.return,T=v;break}T=T.return}v=T}Sn(n,i,p.children,a),i=i.child}return i;case 9:return p=i.type,u=i.pendingProps.children,Es(i,a),p=Qn(p),u=u(p),i.flags|=1,Sn(n,i,u,a),i.child;case 14:return u=i.type,p=ui(u,i.pendingProps),p=ui(u.type,p),Ih(n,i,u,p,a);case 15:return Nh(n,i,i.type,i.pendingProps,a);case 17:return u=i.type,p=i.pendingProps,p=i.elementType===u?p:ui(u,p),Qa(n,i),i.tag=1,Ln(u)?(n=!0,Na(i)):n=!1,Es(i,a),wh(i,u,p),rc(i,u,p,a),lc(null,i,u,!0,n,a);case 19:return Gh(n,i,a);case 22:return Uh(n,i,a)}throw Error(t(156,i.tag))};function fp(n,i){return se(n,i)}function Uv(n,i,a,u){this.tag=n,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=u,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ti(n,i,a,u){return new Uv(n,i,a,u)}function bc(n){return n=n.prototype,!(!n||!n.isReactComponent)}function Ov(n){if(typeof n=="function")return bc(n)?1:0;if(n!=null){if(n=n.$$typeof,n===oe)return 11;if(n===Y)return 14}return 2}function mr(n,i){var a=n.alternate;return a===null?(a=ti(n.tag,i,n.key,n.mode),a.elementType=n.elementType,a.type=n.type,a.stateNode=n.stateNode,a.alternate=n,n.alternate=a):(a.pendingProps=i,a.type=n.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=n.flags&14680064,a.childLanes=n.childLanes,a.lanes=n.lanes,a.child=n.child,a.memoizedProps=n.memoizedProps,a.memoizedState=n.memoizedState,a.updateQueue=n.updateQueue,i=n.dependencies,a.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},a.sibling=n.sibling,a.index=n.index,a.ref=n.ref,a}function ul(n,i,a,u,p,v){var T=2;if(u=n,typeof n=="function")bc(n)&&(T=1);else if(typeof n=="string")T=5;else e:switch(n){case I:return jr(a.children,p,v,i);case Q:T=8,p|=8;break;case E:return n=ti(12,a,i,p|2),n.elementType=E,n.lanes=v,n;case de:return n=ti(13,a,i,p),n.elementType=de,n.lanes=v,n;case k:return n=ti(19,a,i,p),n.elementType=k,n.lanes=v,n;case ae:return cl(a,p,v,i);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case C:T=10;break e;case $:T=9;break e;case oe:T=11;break e;case Y:T=14;break e;case J:T=16,u=null;break e}throw Error(t(130,n==null?n:typeof n,""))}return i=ti(T,a,i,p),i.elementType=n,i.type=u,i.lanes=v,i}function jr(n,i,a,u){return n=ti(7,n,u,i),n.lanes=a,n}function cl(n,i,a,u){return n=ti(22,n,u,i),n.elementType=ae,n.lanes=a,n.stateNode={isHidden:!1},n}function Rc(n,i,a){return n=ti(6,n,null,i),n.lanes=a,n}function Lc(n,i,a){return i=ti(4,n.children!==null?n.children:[],n.key,i),i.lanes=a,i.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},i}function Fv(n,i,a,u,p){this.tag=i,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=as(0),this.expirationTimes=as(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=as(0),this.identifierPrefix=u,this.onRecoverableError=p,this.mutableSourceEagerHydrationData=null}function Pc(n,i,a,u,p,v,T,F,H){return n=new Fv(n,i,a,F,H),i===1?(i=1,v===!0&&(i|=8)):i=0,v=ti(3,null,null,i),n.current=v,v.stateNode=n,v.memoizedState={element:u,isDehydrated:a,cache:null,transitions:null,pendingSuspenseBoundaries:null},Wu(v),n}function kv(n,i,a){var u=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:U,key:u==null?null:""+u,children:n,containerInfo:i,implementation:a}}function hp(n){if(!n)return or;n=n._reactInternals;e:{if(bi(n)!==n||n.tag!==1)throw Error(t(170));var i=n;do{switch(i.tag){case 3:i=i.stateNode.context;break e;case 1:if(Ln(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break e}}i=i.return}while(i!==null);throw Error(t(171))}if(n.tag===1){var a=n.type;if(Ln(a))return Hf(n,a,i)}return i}function pp(n,i,a,u,p,v,T,F,H){return n=Pc(a,u,!0,n,p,v,T,F,H),n.context=hp(null),a=n.current,u=Mn(),p=hr(a),v=Ui(u,p),v.callback=i??null,ur(a,v,p),n.current.lanes=p,uo(n,p,u),In(n,u),n}function dl(n,i,a,u){var p=i.current,v=Mn(),T=hr(p);return a=hp(a),i.context===null?i.context=a:i.pendingContext=a,i=Ui(v,T),i.payload={element:n},u=u===void 0?null:u,u!==null&&(i.callback=u),n=ur(p,i,T),n!==null&&(fi(n,p,T,v),Ga(n,p,T)),T}function fl(n){return n=n.current,n.child?(n.child.tag===5,n.child.stateNode):null}function mp(n,i){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var a=n.retryLane;n.retryLane=a!==0&&a<i?a:i}}function Dc(n,i){mp(n,i),(n=n.alternate)&&mp(n,i)}function Bv(){return null}var gp=typeof reportError=="function"?reportError:function(n){console.error(n)};function Ic(n){this._internalRoot=n}hl.prototype.render=Ic.prototype.render=function(n){var i=this._internalRoot;if(i===null)throw Error(t(409));dl(n,i,null,null)},hl.prototype.unmount=Ic.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var i=n.containerInfo;Gr(function(){dl(null,n,null,null)}),i[Li]=null}};function hl(n){this._internalRoot=n}hl.prototype.unstable_scheduleHydration=function(n){if(n){var i=Qd();n={blockedOn:null,target:n,priority:i};for(var a=0;a<tr.length&&i!==0&&i<tr[a].priority;a++);tr.splice(a,0,n),a===0&&tf(n)}};function Nc(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function pl(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function vp(){}function zv(n,i,a,u,p){if(p){if(typeof u=="function"){var v=u;u=function(){var re=fl(T);v.call(re)}}var T=pp(i,u,n,0,null,!1,!1,"",vp);return n._reactRootContainer=T,n[Li]=T.current,To(n.nodeType===8?n.parentNode:n),Gr(),T}for(;p=n.lastChild;)n.removeChild(p);if(typeof u=="function"){var F=u;u=function(){var re=fl(H);F.call(re)}}var H=Pc(n,0,!1,null,null,!1,!1,"",vp);return n._reactRootContainer=H,n[Li]=H.current,To(n.nodeType===8?n.parentNode:n),Gr(function(){dl(i,H,a,u)}),H}function ml(n,i,a,u,p){var v=a._reactRootContainer;if(v){var T=v;if(typeof p=="function"){var F=p;p=function(){var H=fl(T);F.call(H)}}dl(i,T,n,p)}else T=zv(a,i,n,p,u);return fl(T)}Kd=function(n){switch(n.tag){case 3:var i=n.stateNode;if(i.current.memoizedState.isDehydrated){var a=zt(i.pendingLanes);a!==0&&(ru(i,a|1),In(i,Ne()),(vt&6)===0&&(bs=Ne()+500,ar()))}break;case 13:Gr(function(){var u=Ni(n,1);if(u!==null){var p=Mn();fi(u,n,1,p)}}),Dc(n,1)}},su=function(n){if(n.tag===13){var i=Ni(n,134217728);if(i!==null){var a=Mn();fi(i,n,134217728,a)}Dc(n,134217728)}},Zd=function(n){if(n.tag===13){var i=hr(n),a=Ni(n,i);if(a!==null){var u=Mn();fi(a,n,i,u)}Dc(n,i)}},Qd=function(){return wt},Jd=function(n,i){var a=wt;try{return wt=n,i()}finally{wt=a}},Te=function(n,i,a){switch(i){case"input":if(Mt(n,a),i=a.name,a.type==="radio"&&i!=null){for(a=n;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),i=0;i<a.length;i++){var u=a[i];if(u!==n&&u.form===n.form){var p=Da(u);if(!p)throw Error(t(90));ie(u),Mt(u,p)}}}break;case"textarea":Se(n,a);break;case"select":i=a.value,i!=null&&ne(n,!!a.multiple,i,!1)}},Et=wc,Tt=Gr;var Hv={usingClientEntryPoint:!1,Events:[Co,ms,Da,Qe,Ye,wc]},Ho={findFiberByHostInstance:Nr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Gv={bundleType:Ho.bundleType,version:Ho.version,rendererPackageName:Ho.rendererPackageName,rendererConfig:Ho.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:L.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=le(n),n===null?null:n.stateNode},findFiberByHostInstance:Ho.findFiberByHostInstance||Bv,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var gl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!gl.isDisabled&&gl.supportsFiber)try{Cn=gl.inject(Gv),mt=gl}catch{}}return Nn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Hv,Nn.createPortal=function(n,i){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Nc(i))throw Error(t(200));return kv(n,i,null,a)},Nn.createRoot=function(n,i){if(!Nc(n))throw Error(t(299));var a=!1,u="",p=gp;return i!=null&&(i.unstable_strictMode===!0&&(a=!0),i.identifierPrefix!==void 0&&(u=i.identifierPrefix),i.onRecoverableError!==void 0&&(p=i.onRecoverableError)),i=Pc(n,1,!1,null,null,a,!1,u,p),n[Li]=i.current,To(n.nodeType===8?n.parentNode:n),new Ic(i)},Nn.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var i=n._reactInternals;if(i===void 0)throw typeof n.render=="function"?Error(t(188)):(n=Object.keys(n).join(","),Error(t(268,n)));return n=le(i),n=n===null?null:n.stateNode,n},Nn.flushSync=function(n){return Gr(n)},Nn.hydrate=function(n,i,a){if(!pl(i))throw Error(t(200));return ml(null,n,i,!0,a)},Nn.hydrateRoot=function(n,i,a){if(!Nc(n))throw Error(t(405));var u=a!=null&&a.hydratedSources||null,p=!1,v="",T=gp;if(a!=null&&(a.unstable_strictMode===!0&&(p=!0),a.identifierPrefix!==void 0&&(v=a.identifierPrefix),a.onRecoverableError!==void 0&&(T=a.onRecoverableError)),i=pp(i,null,n,1,a??null,p,!1,v,T),n[Li]=i.current,To(n),u)for(n=0;n<u.length;n++)a=u[n],p=a._getVersion,p=p(a._source),i.mutableSourceEagerHydrationData==null?i.mutableSourceEagerHydrationData=[a,p]:i.mutableSourceEagerHydrationData.push(a,p);return new hl(i)},Nn.render=function(n,i,a){if(!pl(i))throw Error(t(200));return ml(null,n,i,!1,a)},Nn.unmountComponentAtNode=function(n){if(!pl(n))throw Error(t(40));return n._reactRootContainer?(Gr(function(){ml(null,null,n,!1,function(){n._reactRootContainer=null,n[Li]=null})}),!0):!1},Nn.unstable_batchedUpdates=wc,Nn.unstable_renderSubtreeIntoContainer=function(n,i,a,u){if(!pl(a))throw Error(t(200));if(n==null||n._reactInternals===void 0)throw Error(t(38));return ml(n,i,a,!1,u)},Nn.version="18.3.1-next-f1338f8080-20240426",Nn}var wp;function pg(){if(wp)return Fc.exports;wp=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),Fc.exports=Zv(),Fc.exports}var Ap;function Qv(){if(Ap)return vl;Ap=1;var r=pg();return vl.createRoot=r.createRoot,vl.hydrateRoot=r.hydrateRoot,vl}var Jv=Qv();const e_=fg(Jv);pg();function Ko(){return Ko=Object.assign?Object.assign.bind():function(r){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(r[s]=t[s])}return r},Ko.apply(this,arguments)}var Mr;(function(r){r.Pop="POP",r.Push="PUSH",r.Replace="REPLACE"})(Mr||(Mr={}));const Cp="popstate";function t_(r){r===void 0&&(r={});function e(s,o){let{pathname:l,search:c,hash:d}=s.location;return Td("",{pathname:l,search:c,hash:d},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function t(s,o){return typeof o=="string"?o:mg(o)}return i_(e,t,null,r)}function Xt(r,e){if(r===!1||r===null||typeof r>"u")throw new Error(e)}function Od(r,e){if(!r){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function n_(){return Math.random().toString(36).substr(2,8)}function bp(r,e){return{usr:r.state,key:r.key,idx:e}}function Td(r,e,t,s){return t===void 0&&(t=null),Ko({pathname:typeof r=="string"?r:r.pathname,search:"",hash:""},typeof e=="string"?ro(e):e,{state:t,key:e&&e.key||s||n_()})}function mg(r){let{pathname:e="/",search:t="",hash:s=""}=r;return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),s&&s!=="#"&&(e+=s.charAt(0)==="#"?s:"#"+s),e}function ro(r){let e={};if(r){let t=r.indexOf("#");t>=0&&(e.hash=r.substr(t),r=r.substr(0,t));let s=r.indexOf("?");s>=0&&(e.search=r.substr(s),r=r.substr(0,s)),r&&(e.pathname=r)}return e}function i_(r,e,t,s){s===void 0&&(s={});let{window:o=document.defaultView,v5Compat:l=!1}=s,c=o.history,d=Mr.Pop,f=null,h=g();h==null&&(h=0,c.replaceState(Ko({},c.state,{idx:h}),""));function g(){return(c.state||{idx:null}).idx}function m(){d=Mr.Pop;let x=g(),y=x==null?null:x-h;h=x,f&&f({action:d,location:M.location,delta:y})}function _(x,y){d=Mr.Push;let A=Td(M.location,x,y);h=g()+1;let b=bp(A,h),L=M.createHref(A);try{c.pushState(b,"",L)}catch(B){if(B instanceof DOMException&&B.name==="DataCloneError")throw B;o.location.assign(L)}l&&f&&f({action:d,location:M.location,delta:1})}function S(x,y){d=Mr.Replace;let A=Td(M.location,x,y);h=g();let b=bp(A,h),L=M.createHref(A);c.replaceState(b,"",L),l&&f&&f({action:d,location:M.location,delta:0})}function w(x){let y=o.location.origin!=="null"?o.location.origin:o.location.href,A=typeof x=="string"?x:mg(x);return A=A.replace(/ $/,"%20"),Xt(y,"No window.location.(origin|href) available to create URL for href: "+A),new URL(A,y)}let M={get action(){return d},get location(){return r(o,c)},listen(x){if(f)throw new Error("A history only accepts one active listener");return o.addEventListener(Cp,m),f=x,()=>{o.removeEventListener(Cp,m),f=null}},createHref(x){return e(o,x)},createURL:w,encodeLocation(x){let y=w(x);return{pathname:y.pathname,search:y.search,hash:y.hash}},push:_,replace:S,go(x){return c.go(x)}};return M}var Rp;(function(r){r.data="data",r.deferred="deferred",r.redirect="redirect",r.error="error"})(Rp||(Rp={}));function r_(r,e,t){return t===void 0&&(t="/"),s_(r,e,t)}function s_(r,e,t,s){let o=typeof e=="string"?ro(e):e,l=_g(o.pathname||"/",t);if(l==null)return null;let c=gg(r);o_(c);let d=null;for(let f=0;d==null&&f<c.length;++f){let h=__(l);d=m_(c[f],h)}return d}function gg(r,e,t,s){e===void 0&&(e=[]),t===void 0&&(t=[]),s===void 0&&(s="");let o=(l,c,d)=>{let f={relativePath:d===void 0?l.path||"":d,caseSensitive:l.caseSensitive===!0,childrenIndex:c,route:l};f.relativePath.startsWith("/")&&(Xt(f.relativePath.startsWith(s),'Absolute route path "'+f.relativePath+'" nested under path '+('"'+s+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),f.relativePath=f.relativePath.slice(s.length));let h=es([s,f.relativePath]),g=t.concat(f);l.children&&l.children.length>0&&(Xt(l.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+h+'".')),gg(l.children,e,g,h)),!(l.path==null&&!l.index)&&e.push({path:h,score:h_(h,l.index),routesMeta:g})};return r.forEach((l,c)=>{var d;if(l.path===""||!((d=l.path)!=null&&d.includes("?")))o(l,c);else for(let f of vg(l.path))o(l,c,f)}),e}function vg(r){let e=r.split("/");if(e.length===0)return[];let[t,...s]=e,o=t.endsWith("?"),l=t.replace(/\?$/,"");if(s.length===0)return o?[l,""]:[l];let c=vg(s.join("/")),d=[];return d.push(...c.map(f=>f===""?l:[l,f].join("/"))),o&&d.push(...c),d.map(f=>r.startsWith("/")&&f===""?"/":f)}function o_(r){r.sort((e,t)=>e.score!==t.score?t.score-e.score:p_(e.routesMeta.map(s=>s.childrenIndex),t.routesMeta.map(s=>s.childrenIndex)))}const a_=/^:[\w-]+$/,l_=3,u_=2,c_=1,d_=10,f_=-2,Lp=r=>r==="*";function h_(r,e){let t=r.split("/"),s=t.length;return t.some(Lp)&&(s+=f_),e&&(s+=u_),t.filter(o=>!Lp(o)).reduce((o,l)=>o+(a_.test(l)?l_:l===""?c_:d_),s)}function p_(r,e){return r.length===e.length&&r.slice(0,-1).every((s,o)=>s===e[o])?r[r.length-1]-e[e.length-1]:0}function m_(r,e,t){let{routesMeta:s}=r,o={},l="/",c=[];for(let d=0;d<s.length;++d){let f=s[d],h=d===s.length-1,g=l==="/"?e:e.slice(l.length)||"/",m=g_({path:f.relativePath,caseSensitive:f.caseSensitive,end:h},g),_=f.route;if(!m)return null;Object.assign(o,m.params),c.push({params:o,pathname:es([l,m.pathname]),pathnameBase:E_(es([l,m.pathnameBase])),route:_}),m.pathnameBase!=="/"&&(l=es([l,m.pathnameBase]))}return c}function g_(r,e){typeof r=="string"&&(r={path:r,caseSensitive:!1,end:!0});let[t,s]=v_(r.path,r.caseSensitive,r.end),o=e.match(t);if(!o)return null;let l=o[0],c=l.replace(/(.)\/+$/,"$1"),d=o.slice(1);return{params:s.reduce((h,g,m)=>{let{paramName:_,isOptional:S}=g;if(_==="*"){let M=d[m]||"";c=l.slice(0,l.length-M.length).replace(/(.)\/+$/,"$1")}const w=d[m];return S&&!w?h[_]=void 0:h[_]=(w||"").replace(/%2F/g,"/"),h},{}),pathname:l,pathnameBase:c,pattern:r}}function v_(r,e,t){e===void 0&&(e=!1),t===void 0&&(t=!0),Od(r==="*"||!r.endsWith("*")||r.endsWith("/*"),'Route path "'+r+'" will be treated as if it were '+('"'+r.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+r.replace(/\*$/,"/*")+'".'));let s=[],o="^"+r.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(c,d,f)=>(s.push({paramName:d,isOptional:f!=null}),f?"/?([^\\/]+)?":"/([^\\/]+)"));return r.endsWith("*")?(s.push({paramName:"*"}),o+=r==="*"||r==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):t?o+="\\/*$":r!==""&&r!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,e?void 0:"i"),s]}function __(r){try{return r.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return Od(!1,'The URL path "'+r+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),r}}function _g(r,e){if(e==="/")return r;if(!r.toLowerCase().startsWith(e.toLowerCase()))return null;let t=e.endsWith("/")?e.length-1:e.length,s=r.charAt(t);return s&&s!=="/"?null:r.slice(t)||"/"}const x_=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,y_=r=>x_.test(r);function S_(r,e){e===void 0&&(e="/");let{pathname:t,search:s="",hash:o=""}=typeof r=="string"?ro(r):r,l;if(t)if(y_(t))l=t;else{if(t.includes("//")){let c=t;t=t.replace(/\/\/+/g,"/"),Od(!1,"Pathnames cannot have embedded double slashes - normalizing "+(c+" -> "+t))}t.startsWith("/")?l=Pp(t.substring(1),"/"):l=Pp(t,e)}else l=e;return{pathname:l,search:T_(s),hash:w_(o)}}function Pp(r,e){let t=e.replace(/\/+$/,"").split("/");return r.split("/").forEach(o=>{o===".."?t.length>1&&t.pop():o!=="."&&t.push(o)}),t.length>1?t.join("/"):"/"}function zc(r,e,t,s){return"Cannot include a '"+r+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(s)+"].  Please separate it out to the ")+("`to."+t+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function M_(r){return r.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function xg(r,e){let t=M_(r);return e?t.map((s,o)=>o===t.length-1?s.pathname:s.pathnameBase):t.map(s=>s.pathnameBase)}function yg(r,e,t,s){s===void 0&&(s=!1);let o;typeof r=="string"?o=ro(r):(o=Ko({},r),Xt(!o.pathname||!o.pathname.includes("?"),zc("?","pathname","search",o)),Xt(!o.pathname||!o.pathname.includes("#"),zc("#","pathname","hash",o)),Xt(!o.search||!o.search.includes("#"),zc("#","search","hash",o)));let l=r===""||o.pathname==="",c=l?"/":o.pathname,d;if(c==null)d=t;else{let m=e.length-1;if(!s&&c.startsWith("..")){let _=c.split("/");for(;_[0]==="..";)_.shift(),m-=1;o.pathname=_.join("/")}d=m>=0?e[m]:"/"}let f=S_(o,d),h=c&&c!=="/"&&c.endsWith("/"),g=(l||c===".")&&t.endsWith("/");return!f.pathname.endsWith("/")&&(h||g)&&(f.pathname+="/"),f}const es=r=>r.join("/").replace(/\/\/+/g,"/"),E_=r=>r.replace(/\/+$/,"").replace(/^\/*/,"/"),T_=r=>!r||r==="?"?"":r.startsWith("?")?r:"?"+r,w_=r=>!r||r==="#"?"":r.startsWith("#")?r:"#"+r;function A_(r){return r!=null&&typeof r.status=="number"&&typeof r.statusText=="string"&&typeof r.internal=="boolean"&&"data"in r}const Sg=["post","put","patch","delete"];new Set(Sg);const C_=["get",...Sg];new Set(C_);function Zo(){return Zo=Object.assign?Object.assign.bind():function(r){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(r[s]=t[s])}return r},Zo.apply(this,arguments)}const Fd=fe.createContext(null),b_=fe.createContext(null),ia=fe.createContext(null),Zl=fe.createContext(null),Rr=fe.createContext({outlet:null,matches:[],isDataRoute:!1}),Mg=fe.createContext(null);function ra(){return fe.useContext(Zl)!=null}function kd(){return ra()||Xt(!1),fe.useContext(Zl).location}function Eg(r){fe.useContext(ia).static||fe.useLayoutEffect(r)}function sa(){let{isDataRoute:r}=fe.useContext(Rr);return r?H_():R_()}function R_(){ra()||Xt(!1);let r=fe.useContext(Fd),{basename:e,future:t,navigator:s}=fe.useContext(ia),{matches:o}=fe.useContext(Rr),{pathname:l}=kd(),c=JSON.stringify(xg(o,t.v7_relativeSplatPath)),d=fe.useRef(!1);return Eg(()=>{d.current=!0}),fe.useCallback(function(h,g){if(g===void 0&&(g={}),!d.current)return;if(typeof h=="number"){s.go(h);return}let m=yg(h,JSON.parse(c),l,g.relative==="path");r==null&&e!=="/"&&(m.pathname=m.pathname==="/"?e:es([e,m.pathname])),(g.replace?s.replace:s.push)(m,g.state,g)},[e,s,c,l,r])}function Tg(){let{matches:r}=fe.useContext(Rr),e=r[r.length-1];return e?e.params:{}}function L_(r,e){return P_(r,e)}function P_(r,e,t,s){ra()||Xt(!1);let{navigator:o}=fe.useContext(ia),{matches:l}=fe.useContext(Rr),c=l[l.length-1],d=c?c.params:{};c&&c.pathname;let f=c?c.pathnameBase:"/";c&&c.route;let h=kd(),g;if(e){var m;let x=typeof e=="string"?ro(e):e;f==="/"||(m=x.pathname)!=null&&m.startsWith(f)||Xt(!1),g=x}else g=h;let _=g.pathname||"/",S=_;if(f!=="/"){let x=f.replace(/^\//,"").split("/");S="/"+_.replace(/^\//,"").split("/").slice(x.length).join("/")}let w=r_(r,{pathname:S}),M=O_(w&&w.map(x=>Object.assign({},x,{params:Object.assign({},d,x.params),pathname:es([f,o.encodeLocation?o.encodeLocation(x.pathname).pathname:x.pathname]),pathnameBase:x.pathnameBase==="/"?f:es([f,o.encodeLocation?o.encodeLocation(x.pathnameBase).pathname:x.pathnameBase])})),l,t,s);return e&&M?fe.createElement(Zl.Provider,{value:{location:Zo({pathname:"/",search:"",hash:"",state:null,key:"default"},g),navigationType:Mr.Pop}},M):M}function D_(){let r=z_(),e=A_(r)?r.status+" "+r.statusText:r instanceof Error?r.message:JSON.stringify(r),t=r instanceof Error?r.stack:null,o={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return fe.createElement(fe.Fragment,null,fe.createElement("h2",null,"Unexpected Application Error!"),fe.createElement("h3",{style:{fontStyle:"italic"}},e),t?fe.createElement("pre",{style:o},t):null,null)}const I_=fe.createElement(D_,null);class N_ extends fe.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return this.state.error!==void 0?fe.createElement(Rr.Provider,{value:this.props.routeContext},fe.createElement(Mg.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function U_(r){let{routeContext:e,match:t,children:s}=r,o=fe.useContext(Fd);return o&&o.static&&o.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(o.staticContext._deepestRenderedBoundaryId=t.route.id),fe.createElement(Rr.Provider,{value:e},s)}function O_(r,e,t,s){var o;if(e===void 0&&(e=[]),t===void 0&&(t=null),s===void 0&&(s=null),r==null){var l;if(!t)return null;if(t.errors)r=t.matches;else if((l=s)!=null&&l.v7_partialHydration&&e.length===0&&!t.initialized&&t.matches.length>0)r=t.matches;else return null}let c=r,d=(o=t)==null?void 0:o.errors;if(d!=null){let g=c.findIndex(m=>m.route.id&&d?.[m.route.id]!==void 0);g>=0||Xt(!1),c=c.slice(0,Math.min(c.length,g+1))}let f=!1,h=-1;if(t&&s&&s.v7_partialHydration)for(let g=0;g<c.length;g++){let m=c[g];if((m.route.HydrateFallback||m.route.hydrateFallbackElement)&&(h=g),m.route.id){let{loaderData:_,errors:S}=t,w=m.route.loader&&_[m.route.id]===void 0&&(!S||S[m.route.id]===void 0);if(m.route.lazy||w){f=!0,h>=0?c=c.slice(0,h+1):c=[c[0]];break}}}return c.reduceRight((g,m,_)=>{let S,w=!1,M=null,x=null;t&&(S=d&&m.route.id?d[m.route.id]:void 0,M=m.route.errorElement||I_,f&&(h<0&&_===0?(G_("route-fallback"),w=!0,x=null):h===_&&(w=!0,x=m.route.hydrateFallbackElement||null)));let y=e.concat(c.slice(0,_+1)),A=()=>{let b;return S?b=M:w?b=x:m.route.Component?b=fe.createElement(m.route.Component,null):m.route.element?b=m.route.element:b=g,fe.createElement(U_,{match:m,routeContext:{outlet:g,matches:y,isDataRoute:t!=null},children:b})};return t&&(m.route.ErrorBoundary||m.route.errorElement||_===0)?fe.createElement(N_,{location:t.location,revalidation:t.revalidation,component:M,error:S,children:A(),routeContext:{outlet:null,matches:y,isDataRoute:!0}}):A()},null)}var wg=(function(r){return r.UseBlocker="useBlocker",r.UseRevalidator="useRevalidator",r.UseNavigateStable="useNavigate",r})(wg||{}),Ag=(function(r){return r.UseBlocker="useBlocker",r.UseLoaderData="useLoaderData",r.UseActionData="useActionData",r.UseRouteError="useRouteError",r.UseNavigation="useNavigation",r.UseRouteLoaderData="useRouteLoaderData",r.UseMatches="useMatches",r.UseRevalidator="useRevalidator",r.UseNavigateStable="useNavigate",r.UseRouteId="useRouteId",r})(Ag||{});function F_(r){let e=fe.useContext(Fd);return e||Xt(!1),e}function k_(r){let e=fe.useContext(b_);return e||Xt(!1),e}function B_(r){let e=fe.useContext(Rr);return e||Xt(!1),e}function Cg(r){let e=B_(),t=e.matches[e.matches.length-1];return t.route.id||Xt(!1),t.route.id}function z_(){var r;let e=fe.useContext(Mg),t=k_(),s=Cg();return e!==void 0?e:(r=t.errors)==null?void 0:r[s]}function H_(){let{router:r}=F_(wg.UseNavigateStable),e=Cg(Ag.UseNavigateStable),t=fe.useRef(!1);return Eg(()=>{t.current=!0}),fe.useCallback(function(o,l){l===void 0&&(l={}),t.current&&(typeof o=="number"?r.navigate(o):r.navigate(o,Zo({fromRouteId:e},l)))},[r,e])}const Dp={};function G_(r,e,t){Dp[r]||(Dp[r]=!0)}function V_(r,e){r?.v7_startTransition,r?.v7_relativeSplatPath}function W_(r){let{to:e,replace:t,state:s,relative:o}=r;ra()||Xt(!1);let{future:l,static:c}=fe.useContext(ia),{matches:d}=fe.useContext(Rr),{pathname:f}=kd(),h=sa(),g=yg(e,xg(d,l.v7_relativeSplatPath),f,o==="path"),m=JSON.stringify(g);return fe.useEffect(()=>h(JSON.parse(m),{replace:t,state:s,relative:o}),[h,m,o,t,s]),null}function qs(r){Xt(!1)}function j_(r){let{basename:e="/",children:t=null,location:s,navigationType:o=Mr.Pop,navigator:l,static:c=!1,future:d}=r;ra()&&Xt(!1);let f=e.replace(/^\/*/,"/"),h=fe.useMemo(()=>({basename:f,navigator:l,static:c,future:Zo({v7_relativeSplatPath:!1},d)}),[f,d,l,c]);typeof s=="string"&&(s=ro(s));let{pathname:g="/",search:m="",hash:_="",state:S=null,key:w="default"}=s,M=fe.useMemo(()=>{let x=_g(g,f);return x==null?null:{location:{pathname:x,search:m,hash:_,state:S,key:w},navigationType:o}},[f,g,m,_,S,w,o]);return M==null?null:fe.createElement(ia.Provider,{value:h},fe.createElement(Zl.Provider,{children:t,value:M}))}function X_(r){let{children:e,location:t}=r;return L_(wd(e),t)}new Promise(()=>{});function wd(r,e){e===void 0&&(e=[]);let t=[];return fe.Children.forEach(r,(s,o)=>{if(!fe.isValidElement(s))return;let l=[...e,o];if(s.type===fe.Fragment){t.push.apply(t,wd(s.props.children,l));return}s.type!==qs&&Xt(!1),!s.props.index||!s.props.children||Xt(!1);let c={id:s.props.id||l.join("-"),caseSensitive:s.props.caseSensitive,element:s.props.element,Component:s.props.Component,index:s.props.index,path:s.props.path,loader:s.props.loader,action:s.props.action,errorElement:s.props.errorElement,ErrorBoundary:s.props.ErrorBoundary,hasErrorBoundary:s.props.ErrorBoundary!=null||s.props.errorElement!=null,shouldRevalidate:s.props.shouldRevalidate,handle:s.props.handle,lazy:s.props.lazy};s.props.children&&(c.children=wd(s.props.children,l)),t.push(c)}),t}const Y_="6";try{window.__reactRouterVersion=Y_}catch{}const q_="startTransition",Ip=qv[q_];function $_(r){let{basename:e,children:t,future:s,window:o}=r,l=fe.useRef();l.current==null&&(l.current=t_({window:o,v5Compat:!0}));let c=l.current,[d,f]=fe.useState({action:c.action,location:c.location}),{v7_startTransition:h}=s||{},g=fe.useCallback(m=>{h&&Ip?Ip(()=>f(m)):f(m)},[f,h]);return fe.useLayoutEffect(()=>c.listen(g),[c,g]),fe.useEffect(()=>V_(s),[s]),fe.createElement(j_,{basename:e,children:t,location:d.location,navigationType:d.action,navigator:c,future:s})}var Np;(function(r){r.UseScrollRestoration="useScrollRestoration",r.UseSubmit="useSubmit",r.UseSubmitFetcher="useSubmitFetcher",r.UseFetcher="useFetcher",r.useViewTransitionState="useViewTransitionState"})(Np||(Np={}));var Up;(function(r){r.UseFetcher="useFetcher",r.UseFetchers="useFetchers",r.UseScrollRestoration="useScrollRestoration"})(Up||(Up={}));const K_="worldwright-db",Z_=3,Qo="worlds",Jo="index";let Hc=null;function Ql(){return Hc||(Hc=new Promise((r,e)=>{const t=indexedDB.open(K_,Z_);t.onupgradeneeded=()=>{const o=t.result;o.objectStoreNames.contains(Qo)||o.createObjectStore(Qo,{keyPath:"metadata.id"}),o.objectStoreNames.contains(Jo)||o.createObjectStore(Jo,{keyPath:"id"})},t.onblocked=()=>{e(new Error("Database upgrade blocked. Please close other WorldWright tabs and try again."))};const s=setTimeout(()=>{e(new Error("Opening database timed out. Try reloading or resetting storage."))},5e3);t.onerror=()=>{clearTimeout(s),e(t.error)},t.onsuccess=()=>{clearTimeout(s),r(t.result)}})),Hc}function Js(r,e,t,s){return new Promise((o,l)=>{const c=r.transaction(e,t),d=c.objectStore(e),f=s(d);f.onsuccess=()=>o(f.result),f.onerror=()=>l(f.error),c.onerror=()=>l(c.error)})}function Q_(r){const e=new Date().toISOString(),t=r.metadata.createdAt||e;return{id:r.metadata.id,name:r.metadata.name||"Untitled World",seed:r.metadata.seed||"",createdAt:t,updatedAt:e,version:r.metadata.version||"unknown",styleMode:r.metadata.styleMode||"unknown"}}async function J_(){const r=await Ql();return Js(r,Jo,"readonly",e=>e.getAll())}async function Gc(r){const e=await Ql();return Js(e,Qo,"readonly",t=>t.get(r))}async function bg(r){const e=await Ql(),t=Q_(r);return r.metadata.updatedAt=t.updatedAt,await Js(e,Qo,"readwrite",s=>s.put(r)),await Js(e,Jo,"readwrite",s=>s.put(t)),r}async function ex(r){const e=await Ql();await Js(e,Qo,"readwrite",t=>t.delete(r)),await Js(e,Jo,"readwrite",t=>t.delete(r))}function Op(r){try{return new Date(r).toLocaleString()}catch{return String(r)}}function tx(){const r=sa(),[e,t]=fe.useState([]),[s,o]=fe.useState(!0),[l,c]=fe.useState(null);async function d(){try{o(!0),c(null);const h=await J_();t(h)}catch(h){c(h?.message||String(h))}finally{o(!1)}}fe.useEffect(()=>{d()},[]);const f=async h=>{confirm("Delete this world? This cannot be undone.")&&(await ex(h),await d())};return O.jsxs("div",{style:{padding:24},children:[O.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[O.jsx("h1",{children:"WorldWright"}),O.jsx("button",{onClick:()=>r("/generate"),style:{padding:"10px 16px",borderRadius:12,fontWeight:900,background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",color:"white",border:"none",cursor:"pointer"},children:"+ Generate New World"})]}),O.jsx("div",{style:{marginTop:18},children:s?O.jsx("div",{style:{padding:12},children:"Loading…"}):l?O.jsx("div",{style:{padding:12,color:"#c33"},children:l}):e.length===0?O.jsxs("div",{style:{marginTop:16,padding:18,borderRadius:16,border:"1px solid rgba(0,0,0,0.12)",opacity:.9},children:[O.jsx("div",{style:{fontWeight:900,fontSize:16},children:"No worlds yet."}),O.jsx("div",{style:{marginTop:8,opacity:.8},children:"Create your first world in Generate Mode."}),O.jsx("div",{style:{marginTop:14},children:O.jsx("button",{onClick:()=>r("/generate"),style:{padding:"10px 12px",borderRadius:12,fontWeight:900},children:"Go to Generate"})})]}):O.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))",gap:12},children:e.map(h=>{const g=(h.name||"").trim()||"Untitled World";return O.jsxs("div",{style:{borderRadius:16,border:"1px solid rgba(0,0,0,0.12)",padding:14,display:"flex",flexDirection:"column",gap:10},children:[O.jsx("div",{style:{display:"flex",justifyContent:"space-between",gap:10},children:O.jsxs("div",{style:{minWidth:0},children:[O.jsx("div",{style:{fontWeight:950,fontSize:16,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:g}),O.jsxs("div",{style:{opacity:.7,fontSize:12,marginTop:3},children:[h.styleMode," • ",h.version]})]})}),O.jsxs("div",{style:{opacity:.8,fontSize:12,lineHeight:1.35},children:[O.jsxs("div",{children:[O.jsx("b",{children:"Updated:"})," ",Op(h.updatedAt)]}),O.jsxs("div",{children:[O.jsx("b",{children:"Created:"})," ",Op(h.createdAt)]})]}),O.jsxs("div",{style:{display:"flex",gap:8,marginTop:8},children:[O.jsx("button",{onClick:()=>r(`/create/${h.id}`),style:{flex:1,padding:"10px 10px",borderRadius:12,fontWeight:900},children:"Open (Create)"}),O.jsx("button",{onClick:()=>r(`/sim/${h.id}`),style:{padding:"10px 10px",borderRadius:12,fontWeight:900},children:"Sim"})]}),O.jsx("div",{style:{opacity:.55,fontSize:11,wordBreak:"break-all",marginTop:8},children:h.id}),O.jsx("div",{style:{display:"flex",gap:8,marginTop:10},children:O.jsx("button",{onClick:()=>f(h.id),children:"Delete"})})]},h.id)})})})]})}function nx({groups:r}){return O.jsx("div",{style:{padding:12,display:"flex",flexDirection:"column",gap:14},children:r.map(e=>O.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[O.jsx("div",{style:{fontSize:12,opacity:.8,letterSpacing:.5},children:e.title}),O.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:e.tools.map(t=>O.jsx("button",{onClick:t.onClick,disabled:t.disabled,style:{textAlign:"left",padding:"10px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:t.active?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.92)",opacity:t.disabled?.45:1,cursor:t.disabled?"not-allowed":"pointer"},children:t.label},t.id))})]},e.id))})}function ix({tools:r}){return O.jsx("div",{style:{padding:12,display:"flex",flexDirection:"column",gap:10},children:r.map(e=>O.jsx("button",{onClick:e.onClick,disabled:e.disabled,style:{textAlign:"left",padding:"10px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:e.active?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.92)",opacity:e.disabled?.45:1,cursor:e.disabled?"not-allowed":"pointer"},children:e.label},e.id))})}function rx(r){const{onGoHome:e,worldName:t,mode:s,onModeToggle:o,viewMode:l,onViewModeChange:c,isDirty:d}=r,f=!!o&&(s==="create"||s==="sim"),h=!!c&&s==="create";return O.jsxs("div",{style:{height:54,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 14px",borderBottom:"1px solid rgba(255,255,255,0.10)",background:"rgba(10,12,18,0.96)",color:"rgba(255,255,255,0.92)",boxSizing:"border-box"},children:[O.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[O.jsx("button",{onClick:e,style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Home"}),O.jsxs("div",{style:{display:"flex",flexDirection:"column",lineHeight:1.1},children:[O.jsxs("div",{style:{fontSize:14,fontWeight:650},children:[t||(s?s.toUpperCase():"WORLDWRIGHT"),d?" *":""]}),O.jsx("div",{style:{fontSize:12,opacity:.75},children:d?"Unsaved changes":"Saved"})]})]}),O.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[f&&O.jsx("button",{onClick:o,style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:s==="create"?"Go to Sim":"Go to Create"}),h&&O.jsxs("div",{style:{display:"flex",gap:8},children:[O.jsx("button",{onClick:()=>c?.("GLOBE"),style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:l==="GLOBE"?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Globe"}),O.jsx("button",{onClick:()=>c?.("MAP"),style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:l==="MAP"?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Map"})]}),O.jsx("button",{disabled:!0,style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:"rgba(255,255,255,0.03)",color:"rgba(255,255,255,0.65)",cursor:"not-allowed"},children:"Export"}),O.jsx("button",{disabled:!0,style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:"rgba(255,255,255,0.03)",color:"rgba(255,255,255,0.65)",cursor:"not-allowed"},children:"Settings"})]})]})}function ts(r){const{rightPanel:e,children:t,onGoHome:s,worldName:o,mode:l,onModeToggle:c,viewMode:d,onViewModeChange:f,isDirty:h,toolGroups:g,leftTools:m}=r,_=g&&g.length>0||m&&m.length>0;return O.jsxs("div",{style:{width:"100vw",height:"100vh",background:"rgb(10,12,18)",overflow:"hidden"},children:[O.jsx(rx,{onGoHome:s,worldName:o,mode:l,onModeToggle:c,viewMode:d,onViewModeChange:f,isDirty:h}),O.jsxs("div",{style:{height:"calc(100vh - 54px)",display:"grid",gridTemplateColumns:_?"260px 1fr 320px":"1fr 320px"},children:[_&&O.jsx("div",{style:{borderRight:"1px solid rgba(255,255,255,0.10)",background:"rgba(255,255,255,0.02)",overflow:"auto"},children:g&&g.length>0?O.jsx(nx,{groups:g}):O.jsx(ix,{tools:m||[]})}),O.jsx("div",{style:{position:"relative",overflow:"hidden"},children:t}),O.jsx("div",{style:{borderLeft:"1px solid rgba(255,255,255,0.10)",background:"rgba(255,255,255,0.02)",overflow:"auto"},children:e})]})]})}var Wi;(function(r){r.OCEANIC="OCEANIC",r.CONTINENTAL="CONTINENTAL"})(Wi||(Wi={}));var gi;(function(r){r.NONE="NONE",r.DIVERGENT="DIVERGENT",r.CONVERGENT="CONVERGENT",r.TRANSFORM="TRANSFORM"})(gi||(gi={}));var ea;(function(r){r.ROCK="ROCK",r.VOLCANIC="VOLCANIC",r.SAND="SAND",r.ALLUVIAL="ALLUVIAL",r.PEAT="PEAT",r.SALT="SALT",r.PERMAFROST="PERMAFROST"})(ea||(ea={}));var Fp;(function(r){r.TRENCH="TRENCH",r.ABYSSAL="ABYSSAL",r.RIDGE="RIDGE",r.SHELF="SHELF",r.SLOPE="SLOPE"})(Fp||(Fp={}));function sx(r){return{index:r,baseHeight:0,editHeightDelta:0,simHeightDelta:0,isWater:!1,flowDirection:null,flowAccumulation:0,basinId:null,temperature:.5,rainfall:.5,climateCellId:0,prevailingWind:[0,0],plateId:0,plateType:Wi.CONTINENTAL,boundaryType:gi.NONE,upliftRate:0,surfaceAge:.5,volcanicActivity:0,baseBiomeId:0,editBiomeId:0,surfaceType:ea.ROCK,snowCover:0,oceanDepthClass:null}}function An(r,e=["LOADED"]){ox(r),lx(r),ux(r),dx(r),ax(r),cx(r)}function ox(r){const e=r.seaLevel;for(const t of r.cells){const s=t.baseHeight+t.editHeightDelta+t.simHeightDelta;t.isWater=s<e}}function ax(r){for(const e of r.cells){const t=e.baseHeight+e.editHeightDelta+e.simHeightDelta,s=Xi(1-e.temperature),o=Xi((t-.15)*1.25),l=Xi(s*.85+o*.35);e.snowCover=l}}function lx(r){const e=r.gridWidth,t=r.gridHeight,s=r.cells,o=r.seaLevel;function l(c,d,f=4){let h=0,g=0;for(let m=-f;m<=f;m++){const _=c+m;if(!(_<0||_>=t))for(let S=-f;S<=f;S++){const w=((d+S)%e+e)%e;g++;const M=_*e+w,x=s[M];x&&x.isWater&&h++}}return g>0?h/g:0}for(let c=0;c<t;c++){const d=90-c/t*180,f=1-Math.abs(d)/90;for(let h=0;h<e;h++){const g=c*e+h,m=s[g];if(!m)continue;const _=m.baseHeight+m.editHeightDelta+m.simHeightDelta,S=Xi((_-o+.5)*.5),w=l(c,h,4),M=Xi(f*.9+(1-S)*.05+w*.05);let x=Xi(w*.6+f*.2+(M>.6?.05:0));x=Xi(x*(1-S*.5)),m.temperature=M,m.rainfall=x}}}function ux(r){const e=r.gridWidth,t=r.gridHeight,s=r.cells;function o(f){const h=s[f];return h?h.baseHeight+h.editHeightDelta+h.simHeightDelta:0}for(const f of s)f.flowDirection===void 0&&(f.flowDirection=null),typeof f.flowAccumulation!="number"&&(f.flowAccumulation=1),f.basinId===void 0&&(f.basinId=null);const l=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];for(let f=0;f<t;f++)for(let h=0;h<e;h++){const g=f*e+h,m=s[g];if(!m)continue;const _=o(g);let S=null,w=_;for(const[M,x]of l){const y=f+M;if(y<0||y>=t)continue;const A=((h+x)%e+e)%e,b=y*e+A,L=o(b);L<w-1e-6&&(w=L,S=b)}m.flowDirection=S}const c=s.map((f,h)=>h).sort((f,h)=>o(h)-o(f));for(const f of c){const h=s[f];if(!h)continue;const g=h.flowDirection;if(g!=null&&g>=0&&g<s.length){const m=s[g];m&&(m.flowAccumulation+=h.flowAccumulation)}}function d(f){let h=f;const g=new Set;for(let m=0;m<1e3;m++){if(g.has(h))return h;g.add(h);const _=s[h];if(!_||_.isWater)return h;const S=_.flowDirection;if(S==null)return h;h=S}return h}for(let f=0;f<s.length;f++)s[f].basinId=d(f)}function cx(r){r.gridWidth,r.gridHeight;const e=r.cells,t=r.seaLevel;for(let s=0;s<e.length;s++){const o=e[s];if(!o)continue;if(o.isWater){o.baseBiomeId=0;continue}if((o.baseHeight+o.editHeightDelta+o.simHeightDelta-t)*.25>.6){o.baseBiomeId=6;continue}const d=Xi(o.temperature),f=Xi(o.rainfall);d<.2?o.baseBiomeId=1:f<.15?o.baseBiomeId=4:d>.6&&f>.6?o.baseBiomeId=5:o.baseBiomeId=3}}function Xi(r){return r<0?0:r>1?1:r}function dx(r){const e=r.cells,t=r.gridWidth,s=r.gridHeight,o=t*s,l=Math.max(20,Math.round(o/4e3)),c=[],d=new Set;let f=1;for(let h=0;h<e.length;h++){const g=e[h];if(!g||g.flowAccumulation<l||d.has(h))continue;const m=[];let _=h;const S=new Set;for(let w=0;w<e.length&&!S.has(_);w++){S.add(_),m.push(_),d.add(_);const M=e[_];if(!M||M.isWater)break;const x=M.flowDirection;if(x==null)break;if(d.has(x)){m.push(x),_=x;break}_=x}if(m.length>=2){const w=m[m.length-1];c.push({id:f++,sourceCellIndex:h,mouthCellIndex:w,path:m})}}r.rivers=c.map(h=>({id:h.id,sourceCellIndex:h.sourceCellIndex,mouthCellIndex:h.mouthCellIndex,path:h.path}))}function Rg(r,e=6){const{cells:t,gridWidth:s,gridHeight:o,plates:l}=r,c=[],d=new Array(t.length).fill(-1),f=new Set;for(const M of t)!M.isWater&&M.plateType==="CONTINENTAL"&&f.add(M.plateId);const h=t.filter(M=>!M.isWater);if(h.length===0)return c;const g=Array.from(f),m=[];for(let M=0;M<e;M++){const x=g[M%g.length],y=h.filter(A=>A.plateId===x);if(y.length>0){const A=y[Math.floor(M/e*y.length)];m.push({idx:A.index,countryId:M,plateId:x}),d[A.index]=M}}let _=!0,S=0;const w=s*o;for(;_&&S<w;){_=!1,S++;for(let M=0;M<t.length;M++)if(!t[M].isWater&&d[M]!==-1){const x=Math.floor(M/s),y=M%s,A=d[M],b=m.find(B=>B.countryId===A)?.plateId,L=[[x-1,y],[x+1,y],[x,(y-1+s)%s],[x,(y+1)%s]];for(const[B,U]of L){if(B<0||B>=o)continue;const I=B*s+U;I<0||I>=t.length||t[I].isWater||d[I]===-1&&t[I].plateId===b&&Math.abs(t[M].baseHeight+t[M].editHeightDelta-(t[I].baseHeight+t[I].editHeightDelta))<.35&&(d[I]=d[M],_=!0)}}}for(let M=0;M<e;M++){const x=t.filter((b,L)=>d[L]===M);if(x.length===0)continue;const y=fx(x,s,o),A=M/e*360;c.push({id:`country_${M}`,name:hx(M),polygons:[y],color:`hsl(${A}, 65%, 45%)`})}return c}function fx(r,e,t){if(r.length===0)return[];const s=r.map(m=>m.index),o=s.map(m=>Math.floor(m/e)),l=s.map(m=>m%e),c=Math.min(...o),d=Math.max(...o),f=Math.min(...l),h=Math.max(...l),g=[];return g.push({lat:90-c/t*180,lon:f/e*360-180}),g.push({lat:90-c/t*180,lon:(h+1)/e*360-180}),g.push({lat:90-(d+1)/t*180,lon:(h+1)/e*360-180}),g.push({lat:90-(d+1)/t*180,lon:f/e*360-180}),g}function hx(r){const e=["Kingdom","Republic","Empire","Dominion","Territory","Realm","Union"],t=["of the North","of the South","of the East","of the West","the Great","the Ancient","of Fire","of Stone","of the Mountains","of the Plains"],s=e[r%e.length],o=t[r*7%t.length];return`${s} ${o}`}function px(r){const e=_l(r.width,32,1024),t=_l(r.height,16,512),s=vx(r.seed),o=gx(s),l=new Date().toISOString(),c=vn(-.75,0,Wn(r.seaLevel/100)),d=vn(.25,1.35,Wn(r.plateActivity/100)),f=vn(.15,.55,Wn(r.planetAge/100)),h=vn(.05,.35,Wn(r.climateVar/100)),g=vn(.25,1,Wn(r.axisTilt/100)),m=new Array(e*t);for(let U=0;U<m.length;U++)m[U]=sx(U);const _=_l(r.continentCount,1,12),S=_+Math.floor(_*1.2),w=[];for(let U=0;U<S;U++)w.push({id:U,type:U<_?Wi.CONTINENTAL:Wi.OCEANIC,velocity:[vn(-1,1,o()),vn(-1,1,o())]});for(let U=0;U<t;U++)for(let I=0;I<e;I++){const Q=U*e+I,E=m[Q],C=U/(t-1),$=I/(e-1),oe=jn($*1.4,C*1,o,2),de=Math.floor(Wn((oe+1)*.5)*S)%S;E.plateId=de,E.plateType=w[de].type;const k=jn($*.1,C*.08,o,2)*1,Y=jn($*.35,C*.25,o,2)*.5,J=jn($*1,C*.75,o,2)*.15,ae=jn($*3,C*2.5,o,2)*.08;let W;E.plateType===Wi.CONTINENTAL?W=.4+jn($*.2+E.plateId*.8,C*.15+E.plateId*.9,o,1)*.45:W=-.85+jn($*.3,C*.2,o,1)*.15;const q=jn($*4,C*3.5,o,2)*d*.15,z=W+k+Y+J+ae+q*(1-f*.4);E.baseHeight=Vo(z*1,-1.5,1.3);const D=Math.max(0,1-Math.pow(Math.abs(C*2-1)-.85,2)*8);D>.1&&(E.baseHeight=vn(E.baseHeight,-.3-Math.random()*.1,D*.5)),E.boundaryType=gi.NONE;const G=C*2-1,X=vn(.65,1.25,g),te=1-Math.pow(Math.abs(G),X),he=jn($*4,C*4,o,2)*h,ve=r.temperatureOffset/100*.6;let Me=0;r.styleMode==="ALIEN"?Me=jn($*8,C*6,o,2)*.15:r.styleMode==="FANTASY"&&(Me=.08+jn($*3,C*2.5,o,2)*.12),E.temperature=Wn(te*.8+.12+he*.22+Me+ve);const we=Math.abs(G),Pe=Math.exp(-Math.pow(we*2.5,2)),Le=Math.exp(-Math.pow((we-.35)*3.5,2)),et=we>.7?(we-.7)*.4:0,ie=vn(.5,1.5,r.moistureLevel/100);let kt=(Pe*.6-Le*.25+et+.25)*ie;const We=jn($*5,C*3,o,2)*h;let Ze=0;r.styleMode==="ALIEN"?Ze=jn($*10,C*7,o,3)*.2:r.styleMode==="FANTASY"&&(Ze=.1),E.rainfall=Wn(kt+We*.3+Ze);const Be=mx(E.temperature,E.rainfall);E.baseBiomeId=Be,E.editBiomeId=Be,E.surfaceType=E.plateType===Wi.OCEANIC?ea.ALLUVIAL:ea.ROCK,E.flowDirection=null,E.flowAccumulation=0,E.basinId=null,E.upliftRate=0,E.surfaceAge=Wn(.35+o()*.5),E.volcanicActivity=0}for(let U=0;U<t;U++)for(let I=0;I<e;I++){const Q=U*e+I,E=m[Q],C=E.plateId,$=(U-1+t)%t,oe=(U+1)%t,de=(I-1+e)%e,k=(I+1)%e,Y=$*e+I,J=oe*e+I,ae=U*e+de,W=U*e+k,q=new Set;if(q.add(C),q.add(m[Y].plateId),q.add(m[J].plateId),q.add(m[ae].plateId),q.add(m[W].plateId),q.size>1){const z=[m[Y].plateType,m[J].plateType,m[ae].plateType,m[W].plateType],D=z.some(te=>te===Wi.OCEANIC),G=z.some(te=>te===Wi.CONTINENTAL);D&&G?E.boundaryType=gi.CONVERGENT:E.boundaryType=o()<.5?gi.DIVERGENT:gi.TRANSFORM;const X=E.boundaryType===gi.CONVERGENT?1.2:E.boundaryType===gi.DIVERGENT?.6:.4;E.upliftRate=Vo(d*.02*X*(.6+o()*.8),0,5),E.volcanicActivity=E.boundaryType===gi.CONVERGENT&&D?Vo(o()*1.2,0,3):o()*.2}else E.boundaryType=gi.NONE,E.upliftRate=Vo(.005*(1-f)*(.5+o()*.8),0,.5),E.volcanicActivity=o()*.05}const M=Wn(r.planetAge/100),x=Wn(r.erosionIntensity/100),y=(M+x)/2,A=Math.max(1,Math.round(vn(1,8,y))),b=vn(.15,.7,y);for(let U=0;U<A;U++){const I=new Array(m.length);for(let Q=0;Q<t;Q++)for(let E=0;E<e;E++){const C=Q*e+E,$=m[C];if(!$)continue;let oe=0,de=0;const k=Q-1,Y=Q+1,J=(E-1+e)%e,ae=(E+1)%e;k>=0&&(oe+=m[k*e+E].baseHeight,de++),Y<t&&(oe+=m[Y*e+E].baseHeight,de++),oe+=m[Q*e+J].baseHeight,de++,oe+=m[Q*e+ae].baseHeight,de++;const W=de>0?oe/de:$.baseHeight,q=vn($.baseHeight,W,b),z=$.upliftRate*.005,D=(o()-.5)*.02*(1-M);I[C]=Vo($.baseHeight+z+D+(q-$.baseHeight)*.9,-2,2)}for(let Q=0;Q<m.length;Q++)m[Q].baseHeight=I[Q],m[Q].surfaceAge=Wn(.2+M*.7+(o()-.5)*.1)}const L=[];for(let U=0;U<t;U++)for(let I=0;I<e;I++){const Q=U*e+I,E=m[Q];if(!E||E.baseHeight<c)continue;let C=null,$=E.baseHeight;for(let k=-1;k<=1;k++){const Y=U+k;if(!(Y<0||Y>=t))for(let J=-1;J<=1;J++){if(k===0&&J===0)continue;const ae=(I+J+e)%e,W=Y*e+ae,q=m[W].baseHeight;q<$-1e-6&&($=q,C=W)}}if(C!=null&&o()<.06){const k=_l(U+Math.floor((o()-.5)*3),0,t-1),Y=((I+Math.floor((o()-.5)*3))%e+e)%e,J=k*e+Y;J!==Q&&(C=J)}C!=null&&(E.flowDirection=C);const oe=Wn(E.rainfall||.2),de=Math.max(0,(E.baseHeight-$)*2);E.flowAccumulation=Math.max(1,Math.floor(1+oe*8+de*4+Math.floor(o()*3)))}const B={gridWidth:e,gridHeight:t,seaLevel:c,cells:m,plates:w,rivers:L,countries:[],cultures:[],cultureRegions:[],cities:[],locations:[],stickers:[],metadata:{id:`w_${r.styleMode}_${e}x${t}_${s}`,name:"Untitled World",seed:String(r.seed),schemaVersion:"v3",version:"v1.3",styleMode:r.styleMode,gridWidth:e,gridHeight:t,createdAt:l,updatedAt:l,seaLevel:c},parameters:{...r,seaLevel:r.seaLevel}};return An(B,["GENERATED"]),B.countries=Rg(B,_),B}function mx(r,e){return r<.2?e<.35?1:2:r<.35?e<.35?3:4:r<.6?e<.3?5:e<.6?6:7:e<.25?8:e<.55?9:10}function Wn(r){return r<0?0:r>1?1:r}function Vo(r,e,t){return r<e?e:r>t?t:r}function _l(r,e,t){return Math.max(e,Math.min(t,Math.floor(r)))}function vn(r,e,t){return r+(e-r)*t}function gx(r){return function(){let e=r+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function vx(r){if(typeof r=="number")return r>>>0;const e=String(r);let t=2166136261;for(let s=0;s<e.length;s++)t^=e.charCodeAt(s),t=Math.imul(t,16777619);return t>>>0&4294967295}function jn(r,e,t,s){let o=1,l=1,c=0,d=0;for(let f=0;f<s;f++)c+=o*_x(r*l,e*l,t),d+=o,o*=.5,l*=2;return c/Math.max(1e-9,d)*2-1}function _x(r,e,t){const s=Math.floor(r),o=Math.floor(e),l=r-s,c=e-o,d=M(s,o),f=M(s+1,o),h=M(s,o+1),g=M(s+1,o+1),m=kp(l),_=kp(c),S=vn(d,f,m),w=vn(h,g,m);return vn(S,w,_);function M(x,y){let A=x*374761393+y*668265263;const b=Math.floor(t()*4294967295);return A=(A^b)>>>0,A=(A^A>>>13)*1274126177,A=A^A>>>16,(A>>>0)/4294967295}}function kp(r){return r*r*(3-2*r)}function Lg(r,e){switch(e.type){case"TERRAIN_STROKE":{const{tool:t,center:s,radius:o,strength:l}=e;if(!r||!Array.isArray(r.cells))return;const c=r.gridWidth,d=r.gridHeight,f=r.cells,h=Math.max(1,Math.floor(Number.isFinite(o)?o:1)),g=Number.isFinite(l)&&l>=0?l:0;let m=0,_=0;if(t==="FLATTEN"||t==="SMOOTH"){for(let S=-h;S<=h;S++){const w=s.row+S;if(!(w<0||w>=d))for(let M=-h;M<=h;M++){if(Math.sqrt(S*S+M*M)>o)continue;const A=((s.col+M)%c+c)%c,b=w*c+A,L=f[b],B=L.baseHeight+(L.editHeightDelta||0);m+=B,_++}}_>0&&(m/=_)}for(let S=-h;S<=h;S++){const w=s.row+S;if(!(w<0||w>=d))for(let M=-h;M<=h;M++){const x=Math.sqrt(S*S+M*M);if(x>o)continue;const A=((s.col+M)%c+c)%c,b=w*c+A,L=f[b],B=(o-x)/o;if(t==="RAISE")L.editHeightDelta=(L.editHeightDelta||0)+g*B;else if(t==="LOWER")L.editHeightDelta=(L.editHeightDelta||0)-g*B;else if(t==="FLATTEN"||t==="SMOOTH"){const U=L.baseHeight+(L.editHeightDelta||0),I=(m-U)*g*B;L.editHeightDelta=(L.editHeightDelta||0)+I}}}return}case"STICKER_APPLY":xx(r,e),An(r,["STICKER_EDIT"]);return;case"ADD_CITY":yx(r,e),An(r,["TERRAIN_EDIT"]);return;case"ADD_COUNTRY":Sx(r,e),An(r,["TERRAIN_EDIT"]);return;case"ADD_RIVER":Ex(r,e),An(r,["TERRAIN_EDIT"]);return;case"REMOVE_RIVER":Tx(r,e),An(r,["TERRAIN_EDIT"]);return;case"SET_LAKE_LEVEL":wx(r,e),An(r,["TERRAIN_EDIT"]);return;default:return}}function xx(r,e){const{sticker:t}=e,{gridWidth:s,gridHeight:o,cells:l}=r,c=t.polygon.map(x=>x.lat),d=t.polygon.map(x=>x.lon),f=Math.min(...c),h=Math.max(...c),g=Math.min(...d),m=Math.max(...d),_=Math.floor((90-h)/180*o),S=Math.ceil((90-f)/180*o),w=Math.floor((g+180)/360*s),M=Math.ceil((m+180)/360*s);for(let x=_;x<=S;x++)for(let y=w;y<=M;y++){const A=(x+o)%o,b=(y+s)%s,L=A*s+b,B=l[L],U=90-A/o*180,I=b/s*360-180;Mx({lat:U,lon:I},t.polygon)&&(t.type==="BIOME"&&t.payload.biomeId!=null&&(B.editBiomeId=t.payload.biomeId),t.type==="CULTURE"&&t.payload.cultureId&&(B.cultureId=t.payload.cultureId),t.type==="HEIGHT"&&typeof t.payload.heightDelta=="number"&&(B.editHeightDelta=(B.editHeightDelta||0)+t.payload.heightDelta))}r.stickers=r.stickers??[],r.stickers.push(t)}function yx(r,e){r.cities=r.cities??[],r.cities.push(e.city)}function Sx(r,e){r.countries=r.countries??[],r.countries.push(e.country)}function Mx(r,e){let t=!1;for(let s=0,o=e.length-1;s<e.length;o=s++){const l=e[s].lon,c=e[s].lat,d=e[o].lon,f=e[o].lat;c>r.lat!=f>r.lat&&r.lon<(d-l)*(r.lat-c)/(f-c+1e-12)+l&&(t=!t)}return t}function Ex(r,e){r.rivers=r.rivers??[],r.rivers.push(e.river)}function Tx(r,e){r.rivers=(r.rivers??[]).filter(t=>t.id!==e.riverId)}function wx(r,e){const t=r.cells[e.cellIndex];if(!t)return;const s=t.basinId,o=t.baseHeight+t.editHeightDelta,l=e.newLevel-o;if(s!=null)for(const c of r.cells)c.basinId===s&&(c.editHeightDelta=(c.editHeightDelta??0)+l)}function xl(r){const e=[],t=r.gridWidth*r.gridHeight;r.cells.length!==t&&e.push(`Cell array size (${r.cells.length}) does not match grid (${r.gridWidth}×${r.gridHeight} = ${t}).`),(typeof r.seaLevel!="number"||Number.isNaN(r.seaLevel))&&e.push("World is missing global seaLevel (number)."),r.metadata||e.push("World metadata is missing."),r.metadata?.id||e.push("World metadata.id is missing."),r.metadata?.schemaVersion||e.push("World metadata.schemaVersion is missing.");for(let s=0;s<r.cells.length;s++){const o=r.cells[s];if(o.index!==s){e.push(`Cell index mismatch at i=${s} (cell.index=${o.index}).`);break}if("seaLevel"in o){e.push("Legacy field detected: cell.seaLevel exists. World should be normalized/migrated.");break}typeof o.baseHeight!="number"&&e.push(`Cell ${s} missing baseHeight.`),typeof o.editHeightDelta!="number"&&e.push(`Cell ${s} missing editHeightDelta.`),typeof o.simHeightDelta!="number"&&e.push(`Cell ${s} missing simHeightDelta.`),typeof o.isWater!="boolean"&&e.push(`Cell ${s} missing isWater.`),o.flowDirection!=null&&typeof o.flowDirection!="number"&&e.push(`Cell ${s} flowDirection invalid type.`),typeof o.flowAccumulation!="number"&&e.push(`Cell ${s} missing flowAccumulation.`),o.basinId!=null&&typeof o.basinId!="number"&&e.push(`Cell ${s} basinId invalid type.`)}for(const s of r.countries)s.id||e.push("A country is missing an id."),(!s.polygons||s.polygons.length===0)&&e.push(`Country ${s.id||"(unknown)"} has no polygons.`);for(const s of r.cities)(s.cellIndex<0||s.cellIndex>=r.cells.length)&&e.push(`City ${s.id||s.name} has invalid cellIndex=${s.cellIndex}.`);return e}function Ls(r){return JSON.parse(JSON.stringify(r))}function Ax(r,e=1){const t=.01*e;for(const s of r.cities)s.population+=s.population*t;for(const s of r.cultures)if(Math.random()<.05){const o=Math.floor(Math.random()*r.cells.length);r.cells[o].isWater||(r.cells[o].cultureId=s.id)}for(const s of r.countries){const o=r.cells.map((l,c)=>({cell:l,idx:c})).filter(l=>l.cell.countryId===s.id);if(o.length>0&&Math.random()<.03){const c=o[Math.floor(Math.random()*o.length)].idx,d=Math.floor(c/r.gridWidth),f=c%r.gridWidth,h=[(d-1+r.gridHeight)%r.gridHeight*r.gridWidth+f,(d+1)%r.gridHeight*r.gridWidth+f,d*r.gridWidth+(f-1+r.gridWidth)%r.gridWidth,d*r.gridWidth+(f+1)%r.gridWidth];for(const g of h){const m=r.cells[g];if(!m.isWater&&!m.countryId){m.countryId=s.id;break}}}}}class Cx{constructor(){Object.defineProperty(this,"world",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"history",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"historyIndex",{enumerable:!0,configurable:!0,writable:!0,value:-1}),Object.defineProperty(this,"listeners",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"dirty",{enumerable:!0,configurable:!0,writable:!0,value:!1})}getWorld(){return this.world}subscribe(e){return this.listeners.push(e),e(this.world),()=>{const t=this.listeners.indexOf(e);t>=0&&this.listeners.splice(t,1)}}notify(){for(const e of this.listeners)try{e(this.world)}catch(t){console.error("WorldSession subscriber error:",t)}}isDirty(){return this.dirty}normalizeWorld(e){if(typeof e.seaLevel!="number"){const t=e.metadata?.seaLevel;typeof t=="number"?e.seaLevel=t:e.seaLevel=0}if(Array.isArray(e.cells)){const t=e.gridWidth,s=e.gridHeight;for(let l=0;l<e.cells.length;l++){const c=e.cells[l];c.index=l,c&&Object.prototype.hasOwnProperty.call(c,"seaLevel")&&delete c.seaLevel,typeof c.editHeightDelta!="number"&&(c.editHeightDelta=0),typeof c.simHeightDelta!="number"&&(c.simHeightDelta=0),typeof c.isWater!="boolean"&&(c.isWater=!1),typeof c.temperature!="number"&&(c.temperature=.5),typeof c.rainfall!="number"&&(c.rainfall=.5),typeof c.baseBiomeId!="number"&&(c.baseBiomeId=0),typeof c.editBiomeId!="number"&&(c.editBiomeId=c.baseBiomeId),typeof c.snowCover!="number"&&(c.snowCover=0)}const o=t*s;if(e.cells.length>o)e.cells.length=o;else if(e.cells.length<o)for(let l=e.cells.length;l<o;l++){const c=e.cells[e.cells.length-1];e.cells.push(JSON.parse(JSON.stringify(c)))}}}async createWorld(e){const t=px(e);this.normalizeWorld(t),An(t,["GENERATED"]);const s=xl(t);s.length>0&&console.warn("Validation warnings on generated world:",s);try{if(await Gc(t.metadata.id)){console.warn(`Generated world id ${t.metadata.id} already exists for seed ${t.metadata.seed}; creating unique id.`);const l=t.metadata.id;let c=1,d=`${l}_dup${c}`;for(;c<1e3&&await Gc(d);)c++,d=`${l}_dup${c}`;t.metadata.id=d,t.metadata.name=`${t.metadata.name} (copy)`,t.metadata.createdAt=new Date().toISOString()}}catch(o){console.warn("Could not verify world id uniqueness due to storage error:",o)}this.world=t,this.history=[Ls(t)],this.historyIndex=0,this.dirty=!1,this.notify()}async loadWorld(e){let t=null;if(typeof e=="string"?t=await Gc(e):e&&typeof e=="object"&&(t=e),!t)throw new Error("World not found");this.normalizeWorld(t),An(t,["LOADED"]);const s=xl(t);s.length>0&&console.warn("Validation warnings on load:",s),this.world=t,this.history=[Ls(t)],this.historyIndex=0,this.dirty=!1,this.notify()}async save(){if(!this.world)throw new Error("No world loaded");const e=await bg(this.world);return this.world.metadata=e.metadata,this.dirty=!1,this.notify(),e}apply(e){if(!this.world)return;Lg(this.world,e),An(this.world,["TERRAIN_EDIT"]);const t=xl(this.world);t.length>0&&console.warn("Validation warnings after edit:",t),this.historyIndex<this.history.length-1&&(this.history=this.history.slice(0,this.historyIndex+1)),this.history.push(Ls(this.world)),this.historyIndex=this.history.length-1,this.dirty=!0,this.notify(),this.dirty=!0,this.notify()}applyLocalEdit(e){!this.world||!e||(this.world=e,An(this.world,["TERRAIN_EDIT"]),this.dirty=!0,this.notify())}undo(){this.historyIndex>0&&(this.historyIndex--,this.world=Ls(this.history[this.historyIndex]),this.dirty=!0,this.notify())}redo(){this.historyIndex<this.history.length-1&&(this.historyIndex++,this.world=Ls(this.history[this.historyIndex]),this.dirty=!0,this.notify())}simulateTick(e=1){if(!this.world)return;Ax(this.world,e),An(this.world,["SIM_STEP"]);const t=xl(this.world);t.length>0&&console.warn("Validation warnings after sim tick:",t),this.historyIndex<this.history.length-1&&(this.history=this.history.slice(0,this.historyIndex+1)),this.history.push(Ls(this.world)),this.historyIndex=this.history.length-1,this.dirty=!0,this.notify()}}const _n=new Cx;function bx(r){const e=r.gridWidth,t=r.gridHeight,s=typeof r.seaLevel=="number"?r.seaLevel:typeof r.metadata?.seaLevel=="number"?r.metadata.seaLevel:0,o=Array.isArray(r.cells)?r.cells:[];function l(h){const g=Vc(Math.round(h[0]*255)),m=Vc(Math.round(h[1]*255)),_=Vc(Math.round(h[2]*255));return[g,m,_,255]}function c(h,g){if(h<0||h>=t||g<0||g>=e)return[1,0,1];const m=h*e+g,_=o[m];if(!_)return[1,0,1];const S=typeof _.baseHeight=="number"?_.baseHeight:typeof _.height=="number"?_.height:0,w=typeof _.editHeightDelta=="number"?_.editHeightDelta:0,M=typeof _.simHeightDelta=="number"?_.simHeightDelta:0,x=S+w+M,y=x<s,A=typeof _.rainfall=="number"?Xn(_.rainfall):.5,b=typeof _.temperature=="number"?Xn(_.temperature):.5,L=typeof _.snowCover=="number"?Xn(_.snowCover):0;let B=1;if(h>0&&g>0){const C=o[(h-1)*e+(g-1)];if(C){const $=(typeof C.baseHeight=="number"?C.baseHeight:0)+(typeof C.editHeightDelta=="number"?C.editHeightDelta:0)+(typeof C.simHeightDelta=="number"?C.simHeightDelta:0),oe=(x-$)*6;B=Xn(.7+oe*.3)}}if(y){const C=Xn((s-x)*2),$=.2,oe=.55,de=.75,k=.1,Y=.35,J=.6,ae=.03,W=.15,q=.4;let z,D,G;if(C<.4){const X=C/.4;z=En($,k,X),D=En(oe,Y,X),G=En(de,J,X)}else{const X=(C-.4)/.6;z=En(k,ae,X),D=En(Y,W,X),G=En(J,q,X)}return z=Xn(z*B),D=Xn(D*B),G=Xn(G*B),[z,D,G]}const U=Xn((x-s)*3);let I=.3,Q=.3,E=.2;if(L>.6||b<.2&&A>.4||U>.75){const C=Xn(Math.max(L,U>.75?1:0));I=En(.85,.95,C),Q=En(.88,.96,C),E=En(.92,.98,C)}else if(b<.25)I=.55,Q=.58,E=.52;else if(b<.4&&A>.35)I=.2,Q=.35,E=.22;else if(A<.25||b>.65&&A<.35){const C=1-A;I=En(.7,.85,C),Q=En(.6,.7,C),E=En(.35,.45,C)}else A<.5?(I=.58,Q=.62,E=.35):b>=.4&&b<.65&&A>=.5?(I=.25,Q=.48,E=.22):b>=.65&&A>=.6?(I=.1,Q=.4,E=.15):(I=.35,Q=.5,E=.28);if(U>.3){const C=(U-.3)/.7;I=En(I,.7,C*.35),Q=En(Q,.65,C*.35),E=En(E,.6,C*.35)}return I=Xn(I*B),Q=Xn(Q*B),E=Xn(E*B),[I,Q,E]}function d(h,g){return l(c(h,g))}const f=Rx(e,t,(h,g)=>{const m=Math.floor(Ps(h,0,e-1)),_=Math.floor(Ps(g,0,t-1));return d(_,m)});return{width:e,height:t,seaLevel:s,rgba:f,colorAt:(h,g)=>{const m=Math.floor(Ps(h,0,e-1)),_=Math.floor(Ps(g,0,t-1));return d(_,m)},minimapColorAt:(h,g)=>{const m=Math.floor(Ps(h,0,e-1)),_=Math.floor(Ps(g,0,t-1));return d(_,m)},sampleGlobeColor:h=>{const g=Number.isInteger(h)?h:-1,m=g<0?-1:Math.floor(g/e),_=g<0?-1:g%e;return d(m,_)},sampleMinimapColor:h=>{const g=Number.isInteger(h)?h:-1,m=g<0?-1:Math.floor(g/e),_=g<0?-1:g%e;return d(m,_)}}}function so(r){return bx(r)}function Xn(r){return Number.isFinite(r)?r<0?0:r>1?1:r:0}function Vc(r){return Number.isFinite(r)?r<0?0:r>255?255:r:0}function Ps(r,e,t){return!Number.isFinite(r)||r<e?e:r>t?t:r}function En(r,e,t){return r+(e-r)*t}function Rx(r,e,t){const s=new Uint8ClampedArray(r*e*4);let o=0;for(let l=0;l<e;l++){const c=l+.5;for(let d=0;d<r;d++){const f=d+.5,h=t(f,c);s[o++]=h[0]|0,s[o++]=h[1]|0,s[o++]=h[2]|0,s[o++]=h[3]|0}}return s}function Ut(r,e,t){const s=Math.round(Number.isFinite(r)?r:e);return s<e?e:s>t?t:s}function ni({label:r,children:e}){return O.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:6,marginBottom:14},children:[O.jsx("div",{style:{fontWeight:800,fontSize:12,opacity:.75},children:r}),e]})}function Lx({onGenerate:r,onSave:e,saving:t,disabled:s}){const o=fe.useMemo(()=>({width:256,height:128,seaLevel:50,plateActivity:55,axisTilt:23,planetAge:50,climateVar:35,moistureLevel:50,temperatureOffset:0,erosionIntensity:50,continentCount:5,seed:Math.floor(Math.random()*1e9),styleMode:"EARTHLIKE"}),[]),[l,c]=fe.useState(o);fe.useEffect(()=>{r(l)},[]),fe.useEffect(()=>{const f=setTimeout(()=>{r(l)},300);return()=>clearTimeout(f)},[l]);function d(f,h){c(g=>({...g,[f]:h}))}return O.jsxs("div",{style:{padding:14},children:[O.jsx("div",{style:{fontWeight:900,fontSize:14,marginBottom:12},children:"Generate"}),O.jsx(ni,{label:"Seed",children:O.jsxs("div",{style:{display:"flex",gap:8},children:[O.jsx("input",{value:l.seed,onChange:f=>d("seed",Ut(parseInt(f.target.value||"0",10),0,2147483647)),style:{flex:1,padding:8,borderRadius:10,border:"1px solid rgba(0,0,0,0.15)"},inputMode:"numeric"}),O.jsx("button",{onClick:()=>d("seed",Math.floor(Math.random()*1e9)),style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(0,0,0,0.15)"},children:"Random"})]})}),O.jsx(ni,{label:"Style Mode",children:O.jsxs("select",{value:l.styleMode,onChange:f=>d("styleMode",f.target.value),style:{padding:8,borderRadius:10,border:"1px solid rgba(0,0,0,0.15)"},children:[O.jsx("option",{value:"EARTHLIKE",children:"Earthlike"}),O.jsx("option",{value:"FANTASY",children:"Fantasy"}),O.jsx("option",{value:"STYLIZED",children:"Stylized"}),O.jsx("option",{value:"ALIEN",children:"Alien"})]})}),O.jsxs(ni,{label:`Resolution: ${l.width}×${l.height}`,children:[O.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8},children:[O.jsxs("div",{children:[O.jsx("div",{style:{fontSize:11,opacity:.7,marginBottom:6},children:"Width"}),O.jsx("input",{value:l.width,onChange:f=>d("width",Ut(parseInt(f.target.value||"0",10),64,1024)),style:{width:"100%",padding:8,borderRadius:10,border:"1px solid rgba(0,0,0,0.15)"},inputMode:"numeric"})]}),O.jsxs("div",{children:[O.jsx("div",{style:{fontSize:11,opacity:.7,marginBottom:6},children:"Height"}),O.jsx("input",{value:l.height,onChange:f=>d("height",Ut(parseInt(f.target.value||"0",10),32,1024)),style:{width:"100%",padding:8,borderRadius:10,border:"1px solid rgba(0,0,0,0.15)"},inputMode:"numeric"})]})]}),O.jsx("div",{style:{fontSize:11,opacity:.65,marginTop:6},children:"Note: larger resolutions generate slower (CPU preview)."})]}),O.jsx(ni,{label:`Sea Level (0–100): ${l.seaLevel}`,children:O.jsx("input",{type:"range",min:0,max:100,value:l.seaLevel,onChange:f=>d("seaLevel",Ut(parseInt(f.target.value,10),0,100))})}),O.jsx(ni,{label:`Plate Activity (0–100): ${l.plateActivity}`,children:O.jsx("input",{type:"range",min:0,max:100,value:l.plateActivity,onChange:f=>d("plateActivity",Ut(parseInt(f.target.value,10),0,100))})}),O.jsx(ni,{label:`Axis Tilt (0–100): ${l.axisTilt}`,children:O.jsx("input",{type:"range",min:0,max:100,value:l.axisTilt,onChange:f=>d("axisTilt",Ut(parseInt(f.target.value,10),0,100))})}),O.jsx(ni,{label:`Planet Age (0–100): ${l.planetAge}`,children:O.jsx("input",{type:"range",min:0,max:100,value:l.planetAge,onChange:f=>d("planetAge",Ut(parseInt(f.target.value,10),0,100))})}),O.jsx(ni,{label:`Climate Variability (0–100): ${l.climateVar}`,children:O.jsx("input",{type:"range",min:0,max:100,value:l.climateVar,onChange:f=>d("climateVar",Ut(parseInt(f.target.value,10),0,100))})}),O.jsx(ni,{label:`Moisture Level (0–100): ${l.moistureLevel}`,children:O.jsx("input",{type:"range",min:0,max:100,value:l.moistureLevel,onChange:f=>d("moistureLevel",Ut(parseInt(f.target.value,10),0,100))})}),O.jsx(ni,{label:`Temperature Offset (-50 to +50): ${l.temperatureOffset>0?"+":""}${l.temperatureOffset}`,children:O.jsx("input",{type:"range",min:-50,max:50,value:l.temperatureOffset,onChange:f=>d("temperatureOffset",Ut(parseInt(f.target.value,10),-50,50))})}),O.jsx(ni,{label:`Erosion Intensity (0–100): ${l.erosionIntensity}`,children:O.jsx("input",{type:"range",min:0,max:100,value:l.erosionIntensity,onChange:f=>d("erosionIntensity",Ut(parseInt(f.target.value,10),0,100))})}),O.jsx(ni,{label:`Continent Count (1–12): ${l.continentCount}`,children:O.jsx("input",{type:"range",min:1,max:12,value:l.continentCount,onChange:f=>d("continentCount",Ut(parseInt(f.target.value,10),1,12))})}),O.jsxs("div",{style:{display:"flex",gap:10,marginTop:16},children:[O.jsx("button",{onClick:()=>r({...l,width:Ut(l.width,64,1024),height:Ut(l.height,32,1024),seaLevel:Ut(l.seaLevel,0,100),plateActivity:Ut(l.plateActivity,0,100),axisTilt:Ut(l.axisTilt,0,100),planetAge:Ut(l.planetAge,0,100),climateVar:Ut(l.climateVar,0,100),moistureLevel:Ut(l.moistureLevel,0,100),temperatureOffset:Ut(l.temperatureOffset,-50,50),erosionIntensity:Ut(l.erosionIntensity,0,100),continentCount:Ut(l.continentCount,1,12),seed:typeof l.seed=="string"?l.seed:Ut(l.seed,0,2147483647),styleMode:l.styleMode}),style:{flex:1,padding:"10px 12px",borderRadius:12,border:"1px solid rgba(0,0,0,0.15)",fontWeight:900},children:"Generate"}),O.jsx("button",{onClick:e,disabled:s||t,style:{flex:1,padding:"10px 12px",borderRadius:12,border:"1px solid rgba(0,0,0,0.15)",fontWeight:900,opacity:s||t?.5:1,cursor:s||t?"not-allowed":"pointer"},children:t?"Saving…":"Save → Create"})]}),O.jsx("div",{style:{fontSize:11,opacity:.65,marginTop:10,lineHeight:1.35},children:"Seed + parameters determine the generated world. After Save, Create opens the saved snapshot."})]})}const Bd="160",Px=0,Bp=1,Dx=2,Pg=1,Ix=2,Vi=3,br=0,kn=1,ji=2,wr=0,Zs=1,zp=2,Hp=3,Gp=4,Nx=5,Qr=100,Ux=101,Ox=102,Vp=103,Wp=104,Fx=200,kx=201,Bx=202,zx=203,Ad=204,Cd=205,Hx=206,Gx=207,Vx=208,Wx=209,jx=210,Xx=211,Yx=212,qx=213,$x=214,Kx=0,Zx=1,Qx=2,Wl=3,Jx=4,ey=5,ty=6,ny=7,Dg=0,iy=1,ry=2,Ar=0,sy=1,oy=2,ay=3,ly=4,uy=5,cy=6,Ig=300,eo=301,to=302,bd=303,Rd=304,Jl=306,jl=1e3,si=1001,Ld=1002,wn=1003,jp=1004,Wc=1005,On=1006,dy=1007,ta=1008,Cr=1009,fy=1010,hy=1011,zd=1012,Ng=1013,Er=1014,Tr=1015,na=1016,Ug=1017,Og=1018,ns=1020,py=1021,_i=1023,my=1024,gy=1025,is=1026,no=1027,vy=1028,Fg=1029,_y=1030,kg=1031,Bg=1033,jc=33776,Xc=33777,Yc=33778,qc=33779,Xp=35840,Yp=35841,qp=35842,$p=35843,zg=36196,Kp=37492,Zp=37496,Qp=37808,Jp=37809,em=37810,tm=37811,nm=37812,im=37813,rm=37814,sm=37815,om=37816,am=37817,lm=37818,um=37819,cm=37820,dm=37821,$c=36492,fm=36494,hm=36495,xy=36283,pm=36284,mm=36285,gm=36286,Hg=3e3,rs=3001,yy=3200,Sy=3201,Gg=0,My=1,oi="",ln="srgb",$i="srgb-linear",Hd="display-p3",eu="display-p3-linear",Xl="linear",Dt="srgb",Yl="rec709",ql="p3",Ds=7680,vm=519,Ey=512,Ty=513,wy=514,Vg=515,Ay=516,Cy=517,by=518,Ry=519,_m=35044,xm="300 es",Pd=1035,Yi=2e3,$l=2001;class oo{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].indexOf(t)===-1&&s[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const s=this._listeners;return s[e]!==void 0&&s[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const o=this._listeners[e];if(o!==void 0){const l=o.indexOf(t);l!==-1&&o.splice(l,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const s=this._listeners[e.type];if(s!==void 0){e.target=this;const o=s.slice(0);for(let l=0,c=o.length;l<c;l++)o[l].call(this,e);e.target=null}}}const mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Kc=Math.PI/180,Dd=180/Math.PI;function oa(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(mn[r&255]+mn[r>>8&255]+mn[r>>16&255]+mn[r>>24&255]+"-"+mn[e&255]+mn[e>>8&255]+"-"+mn[e>>16&15|64]+mn[e>>24&255]+"-"+mn[t&63|128]+mn[t>>8&255]+"-"+mn[t>>16&255]+mn[t>>24&255]+mn[s&255]+mn[s>>8&255]+mn[s>>16&255]+mn[s>>24&255]).toLowerCase()}function Fn(r,e,t){return Math.max(e,Math.min(t,r))}function Ly(r,e){return(r%e+e)%e}function Zc(r,e,t){return(1-t)*r+t*e}function ym(r){return(r&r-1)===0&&r!==0}function Id(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Wo(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Un(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class St{constructor(e=0,t=0){St.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,s=this.y,o=e.elements;return this.x=o[0]*t+o[3]*s+o[6],this.y=o[1]*t+o[4]*s+o[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(e,Math.min(t,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const s=this.dot(e)/t;return Math.acos(Fn(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,s=this.y-e.y;return t*t+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const s=Math.cos(t),o=Math.sin(t),l=this.x-e.x,c=this.y-e.y;return this.x=l*s-c*o+e.x,this.y=l*o+c*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ht{constructor(e,t,s,o,l,c,d,f,h){ht.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,s,o,l,c,d,f,h)}set(e,t,s,o,l,c,d,f,h){const g=this.elements;return g[0]=e,g[1]=o,g[2]=d,g[3]=t,g[4]=l,g[5]=f,g[6]=s,g[7]=c,g[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,s=e.elements;return t[0]=s[0],t[1]=s[1],t[2]=s[2],t[3]=s[3],t[4]=s[4],t[5]=s[5],t[6]=s[6],t[7]=s[7],t[8]=s[8],this}extractBasis(e,t,s){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const s=e.elements,o=t.elements,l=this.elements,c=s[0],d=s[3],f=s[6],h=s[1],g=s[4],m=s[7],_=s[2],S=s[5],w=s[8],M=o[0],x=o[3],y=o[6],A=o[1],b=o[4],L=o[7],B=o[2],U=o[5],I=o[8];return l[0]=c*M+d*A+f*B,l[3]=c*x+d*b+f*U,l[6]=c*y+d*L+f*I,l[1]=h*M+g*A+m*B,l[4]=h*x+g*b+m*U,l[7]=h*y+g*L+m*I,l[2]=_*M+S*A+w*B,l[5]=_*x+S*b+w*U,l[8]=_*y+S*L+w*I,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],s=e[1],o=e[2],l=e[3],c=e[4],d=e[5],f=e[6],h=e[7],g=e[8];return t*c*g-t*d*h-s*l*g+s*d*f+o*l*h-o*c*f}invert(){const e=this.elements,t=e[0],s=e[1],o=e[2],l=e[3],c=e[4],d=e[5],f=e[6],h=e[7],g=e[8],m=g*c-d*h,_=d*f-g*l,S=h*l-c*f,w=t*m+s*_+o*S;if(w===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/w;return e[0]=m*M,e[1]=(o*h-g*s)*M,e[2]=(d*s-o*c)*M,e[3]=_*M,e[4]=(g*t-o*f)*M,e[5]=(o*l-d*t)*M,e[6]=S*M,e[7]=(s*f-h*t)*M,e[8]=(c*t-s*l)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,s,o,l,c,d){const f=Math.cos(l),h=Math.sin(l);return this.set(s*f,s*h,-s*(f*c+h*d)+c+e,-o*h,o*f,-o*(-h*c+f*d)+d+t,0,0,1),this}scale(e,t){return this.premultiply(Qc.makeScale(e,t)),this}rotate(e){return this.premultiply(Qc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Qc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),s=Math.sin(e);return this.set(t,-s,0,s,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,s=e.elements;for(let o=0;o<9;o++)if(t[o]!==s[o])return!1;return!0}fromArray(e,t=0){for(let s=0;s<9;s++)this.elements[s]=e[s+t];return this}toArray(e=[],t=0){const s=this.elements;return e[t]=s[0],e[t+1]=s[1],e[t+2]=s[2],e[t+3]=s[3],e[t+4]=s[4],e[t+5]=s[5],e[t+6]=s[6],e[t+7]=s[7],e[t+8]=s[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Qc=new ht;function Wg(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Kl(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Py(){const r=Kl("canvas");return r.style.display="block",r}const Sm={};function $o(r){r in Sm||(Sm[r]=!0,console.warn(r))}const Mm=new ht().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Em=new ht().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),yl={[$i]:{transfer:Xl,primaries:Yl,toReference:r=>r,fromReference:r=>r},[ln]:{transfer:Dt,primaries:Yl,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[eu]:{transfer:Xl,primaries:ql,toReference:r=>r.applyMatrix3(Em),fromReference:r=>r.applyMatrix3(Mm)},[Hd]:{transfer:Dt,primaries:ql,toReference:r=>r.convertSRGBToLinear().applyMatrix3(Em),fromReference:r=>r.applyMatrix3(Mm).convertLinearToSRGB()}},Dy=new Set([$i,eu]),At={enabled:!0,_workingColorSpace:$i,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!Dy.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;const s=yl[e].toReference,o=yl[t].fromReference;return o(s(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this._workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this._workingColorSpace)},getPrimaries:function(r){return yl[r].primaries},getTransfer:function(r){return r===oi?Xl:yl[r].transfer}};function Qs(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Jc(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Is;class jg{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Is===void 0&&(Is=Kl("canvas")),Is.width=e.width,Is.height=e.height;const s=Is.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),t=Is}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Kl("canvas");t.width=e.width,t.height=e.height;const s=t.getContext("2d");s.drawImage(e,0,0,e.width,e.height);const o=s.getImageData(0,0,e.width,e.height),l=o.data;for(let c=0;c<l.length;c++)l[c]=Qs(l[c]/255)*255;return s.putImageData(o,0,0),t}else if(e.data){const t=e.data.slice(0);for(let s=0;s<t.length;s++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[s]=Math.floor(Qs(t[s]/255)*255):t[s]=Qs(t[s]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Iy=0;class Xg{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Iy++}),this.uuid=oa(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const s={uuid:this.uuid,url:""},o=this.data;if(o!==null){let l;if(Array.isArray(o)){l=[];for(let c=0,d=o.length;c<d;c++)o[c].isDataTexture?l.push(ed(o[c].image)):l.push(ed(o[c]))}else l=ed(o);s.url=l}return t||(e.images[this.uuid]=s),s}}function ed(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?jg.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ny=0;class Bn extends oo{constructor(e=Bn.DEFAULT_IMAGE,t=Bn.DEFAULT_MAPPING,s=si,o=si,l=On,c=ta,d=_i,f=Cr,h=Bn.DEFAULT_ANISOTROPY,g=oi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ny++}),this.uuid=oa(),this.name="",this.source=new Xg(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=s,this.wrapT=o,this.magFilter=l,this.minFilter=c,this.anisotropy=h,this.format=d,this.internalFormat=null,this.type=f,this.offset=new St(0,0),this.repeat=new St(1,1),this.center=new St(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof g=="string"?this.colorSpace=g:($o("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=g===rs?ln:oi),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const s={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),t||(e.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ig)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case jl:e.x=e.x-Math.floor(e.x);break;case si:e.x=e.x<0?0:1;break;case Ld:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case jl:e.y=e.y-Math.floor(e.y);break;case si:e.y=e.y<0?0:1;break;case Ld:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return $o("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===ln?rs:Hg}set encoding(e){$o("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===rs?ln:oi}}Bn.DEFAULT_IMAGE=null;Bn.DEFAULT_MAPPING=Ig;Bn.DEFAULT_ANISOTROPY=1;class sn{constructor(e=0,t=0,s=0,o=1){sn.prototype.isVector4=!0,this.x=e,this.y=t,this.z=s,this.w=o}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,s,o){return this.x=e,this.y=t,this.z=s,this.w=o,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,s=this.y,o=this.z,l=this.w,c=e.elements;return this.x=c[0]*t+c[4]*s+c[8]*o+c[12]*l,this.y=c[1]*t+c[5]*s+c[9]*o+c[13]*l,this.z=c[2]*t+c[6]*s+c[10]*o+c[14]*l,this.w=c[3]*t+c[7]*s+c[11]*o+c[15]*l,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,s,o,l;const f=e.elements,h=f[0],g=f[4],m=f[8],_=f[1],S=f[5],w=f[9],M=f[2],x=f[6],y=f[10];if(Math.abs(g-_)<.01&&Math.abs(m-M)<.01&&Math.abs(w-x)<.01){if(Math.abs(g+_)<.1&&Math.abs(m+M)<.1&&Math.abs(w+x)<.1&&Math.abs(h+S+y-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(h+1)/2,L=(S+1)/2,B=(y+1)/2,U=(g+_)/4,I=(m+M)/4,Q=(w+x)/4;return b>L&&b>B?b<.01?(s=0,o=.707106781,l=.707106781):(s=Math.sqrt(b),o=U/s,l=I/s):L>B?L<.01?(s=.707106781,o=0,l=.707106781):(o=Math.sqrt(L),s=U/o,l=Q/o):B<.01?(s=.707106781,o=.707106781,l=0):(l=Math.sqrt(B),s=I/l,o=Q/l),this.set(s,o,l,t),this}let A=Math.sqrt((x-w)*(x-w)+(m-M)*(m-M)+(_-g)*(_-g));return Math.abs(A)<.001&&(A=1),this.x=(x-w)/A,this.y=(m-M)/A,this.z=(_-g)/A,this.w=Math.acos((h+S+y-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(e,Math.min(t,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this.z=e.z+(t.z-e.z)*s,this.w=e.w+(t.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Uy extends oo{constructor(e=1,t=1,s={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new sn(0,0,e,t),this.scissorTest=!1,this.viewport=new sn(0,0,e,t);const o={width:e,height:t,depth:1};s.encoding!==void 0&&($o("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),s.colorSpace=s.encoding===rs?ln:oi),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:On,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},s),this.texture=new Bn(o,s.mapping,s.wrapS,s.wrapT,s.magFilter,s.minFilter,s.format,s.type,s.anisotropy,s.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=s.generateMipmaps,this.texture.internalFormat=s.internalFormat,this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.depthTexture=s.depthTexture,this.samples=s.samples}setSize(e,t,s=1){(this.width!==e||this.height!==t||this.depth!==s)&&(this.width=e,this.height=t,this.depth=s,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=s,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Xg(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ss extends Uy{constructor(e=1,t=1,s={}){super(e,t,s),this.isWebGLRenderTarget=!0}}class Yg extends Bn{constructor(e=null,t=1,s=1,o=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:s,depth:o},this.magFilter=wn,this.minFilter=wn,this.wrapR=si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Oy extends Bn{constructor(e=null,t=1,s=1,o=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:s,depth:o},this.magFilter=wn,this.minFilter=wn,this.wrapR=si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class aa{constructor(e=0,t=0,s=0,o=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=s,this._w=o}static slerpFlat(e,t,s,o,l,c,d){let f=s[o+0],h=s[o+1],g=s[o+2],m=s[o+3];const _=l[c+0],S=l[c+1],w=l[c+2],M=l[c+3];if(d===0){e[t+0]=f,e[t+1]=h,e[t+2]=g,e[t+3]=m;return}if(d===1){e[t+0]=_,e[t+1]=S,e[t+2]=w,e[t+3]=M;return}if(m!==M||f!==_||h!==S||g!==w){let x=1-d;const y=f*_+h*S+g*w+m*M,A=y>=0?1:-1,b=1-y*y;if(b>Number.EPSILON){const B=Math.sqrt(b),U=Math.atan2(B,y*A);x=Math.sin(x*U)/B,d=Math.sin(d*U)/B}const L=d*A;if(f=f*x+_*L,h=h*x+S*L,g=g*x+w*L,m=m*x+M*L,x===1-d){const B=1/Math.sqrt(f*f+h*h+g*g+m*m);f*=B,h*=B,g*=B,m*=B}}e[t]=f,e[t+1]=h,e[t+2]=g,e[t+3]=m}static multiplyQuaternionsFlat(e,t,s,o,l,c){const d=s[o],f=s[o+1],h=s[o+2],g=s[o+3],m=l[c],_=l[c+1],S=l[c+2],w=l[c+3];return e[t]=d*w+g*m+f*S-h*_,e[t+1]=f*w+g*_+h*m-d*S,e[t+2]=h*w+g*S+d*_-f*m,e[t+3]=g*w-d*m-f*_-h*S,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,s,o){return this._x=e,this._y=t,this._z=s,this._w=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const s=e._x,o=e._y,l=e._z,c=e._order,d=Math.cos,f=Math.sin,h=d(s/2),g=d(o/2),m=d(l/2),_=f(s/2),S=f(o/2),w=f(l/2);switch(c){case"XYZ":this._x=_*g*m+h*S*w,this._y=h*S*m-_*g*w,this._z=h*g*w+_*S*m,this._w=h*g*m-_*S*w;break;case"YXZ":this._x=_*g*m+h*S*w,this._y=h*S*m-_*g*w,this._z=h*g*w-_*S*m,this._w=h*g*m+_*S*w;break;case"ZXY":this._x=_*g*m-h*S*w,this._y=h*S*m+_*g*w,this._z=h*g*w+_*S*m,this._w=h*g*m-_*S*w;break;case"ZYX":this._x=_*g*m-h*S*w,this._y=h*S*m+_*g*w,this._z=h*g*w-_*S*m,this._w=h*g*m+_*S*w;break;case"YZX":this._x=_*g*m+h*S*w,this._y=h*S*m+_*g*w,this._z=h*g*w-_*S*m,this._w=h*g*m-_*S*w;break;case"XZY":this._x=_*g*m-h*S*w,this._y=h*S*m-_*g*w,this._z=h*g*w+_*S*m,this._w=h*g*m+_*S*w;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+c)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const s=t/2,o=Math.sin(s);return this._x=e.x*o,this._y=e.y*o,this._z=e.z*o,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,s=t[0],o=t[4],l=t[8],c=t[1],d=t[5],f=t[9],h=t[2],g=t[6],m=t[10],_=s+d+m;if(_>0){const S=.5/Math.sqrt(_+1);this._w=.25/S,this._x=(g-f)*S,this._y=(l-h)*S,this._z=(c-o)*S}else if(s>d&&s>m){const S=2*Math.sqrt(1+s-d-m);this._w=(g-f)/S,this._x=.25*S,this._y=(o+c)/S,this._z=(l+h)/S}else if(d>m){const S=2*Math.sqrt(1+d-s-m);this._w=(l-h)/S,this._x=(o+c)/S,this._y=.25*S,this._z=(f+g)/S}else{const S=2*Math.sqrt(1+m-s-d);this._w=(c-o)/S,this._x=(l+h)/S,this._y=(f+g)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let s=e.dot(t)+1;return s<Number.EPSILON?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Fn(this.dot(e),-1,1)))}rotateTowards(e,t){const s=this.angleTo(e);if(s===0)return this;const o=Math.min(1,t/s);return this.slerp(e,o),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const s=e._x,o=e._y,l=e._z,c=e._w,d=t._x,f=t._y,h=t._z,g=t._w;return this._x=s*g+c*d+o*h-l*f,this._y=o*g+c*f+l*d-s*h,this._z=l*g+c*h+s*f-o*d,this._w=c*g-s*d-o*f-l*h,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const s=this._x,o=this._y,l=this._z,c=this._w;let d=c*e._w+s*e._x+o*e._y+l*e._z;if(d<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,d=-d):this.copy(e),d>=1)return this._w=c,this._x=s,this._y=o,this._z=l,this;const f=1-d*d;if(f<=Number.EPSILON){const S=1-t;return this._w=S*c+t*this._w,this._x=S*s+t*this._x,this._y=S*o+t*this._y,this._z=S*l+t*this._z,this.normalize(),this}const h=Math.sqrt(f),g=Math.atan2(h,d),m=Math.sin((1-t)*g)/h,_=Math.sin(t*g)/h;return this._w=c*m+this._w*_,this._x=s*m+this._x*_,this._y=o*m+this._y*_,this._z=l*m+this._z*_,this._onChangeCallback(),this}slerpQuaternions(e,t,s){return this.copy(e).slerp(t,s)}random(){const e=Math.random(),t=Math.sqrt(1-e),s=Math.sqrt(e),o=2*Math.PI*Math.random(),l=2*Math.PI*Math.random();return this.set(t*Math.cos(o),s*Math.sin(l),s*Math.cos(l),t*Math.sin(o))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class ue{constructor(e=0,t=0,s=0){ue.prototype.isVector3=!0,this.x=e,this.y=t,this.z=s}set(e,t,s){return s===void 0&&(s=this.z),this.x=e,this.y=t,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Tm.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Tm.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,s=this.y,o=this.z,l=e.elements;return this.x=l[0]*t+l[3]*s+l[6]*o,this.y=l[1]*t+l[4]*s+l[7]*o,this.z=l[2]*t+l[5]*s+l[8]*o,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,s=this.y,o=this.z,l=e.elements,c=1/(l[3]*t+l[7]*s+l[11]*o+l[15]);return this.x=(l[0]*t+l[4]*s+l[8]*o+l[12])*c,this.y=(l[1]*t+l[5]*s+l[9]*o+l[13])*c,this.z=(l[2]*t+l[6]*s+l[10]*o+l[14])*c,this}applyQuaternion(e){const t=this.x,s=this.y,o=this.z,l=e.x,c=e.y,d=e.z,f=e.w,h=2*(c*o-d*s),g=2*(d*t-l*o),m=2*(l*s-c*t);return this.x=t+f*h+c*m-d*g,this.y=s+f*g+d*h-l*m,this.z=o+f*m+l*g-c*h,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,s=this.y,o=this.z,l=e.elements;return this.x=l[0]*t+l[4]*s+l[8]*o,this.y=l[1]*t+l[5]*s+l[9]*o,this.z=l[2]*t+l[6]*s+l[10]*o,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(e,Math.min(t,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this.z=e.z+(t.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const s=e.x,o=e.y,l=e.z,c=t.x,d=t.y,f=t.z;return this.x=o*f-l*d,this.y=l*c-s*f,this.z=s*d-o*c,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const s=e.dot(this)/t;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){return td.copy(this).projectOnVector(e),this.sub(td)}reflect(e){return this.sub(td.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const s=this.dot(e)/t;return Math.acos(Fn(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,s=this.y-e.y,o=this.z-e.z;return t*t+s*s+o*o}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,s){const o=Math.sin(t)*e;return this.x=o*Math.sin(s),this.y=Math.cos(t)*e,this.z=o*Math.cos(s),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,s){return this.x=e*Math.sin(t),this.y=s,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),o=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=s,this.z=o,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,s=Math.sqrt(1-e**2);return this.x=s*Math.cos(t),this.y=s*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const td=new ue,Tm=new aa;class la{constructor(e=new ue(1/0,1/0,1/0),t=new ue(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,s=e.length;t<s;t+=3)this.expandByPoint(hi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,s=e.count;t<s;t++)this.expandByPoint(hi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,s=e.length;t<s;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const s=hi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(s),this.max.copy(e).add(s),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const l=s.getAttribute("position");if(t===!0&&l!==void 0&&e.isInstancedMesh!==!0)for(let c=0,d=l.count;c<d;c++)e.isMesh===!0?e.getVertexPosition(c,hi):hi.fromBufferAttribute(l,c),hi.applyMatrix4(e.matrixWorld),this.expandByPoint(hi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Sl.copy(e.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),Sl.copy(s.boundingBox)),Sl.applyMatrix4(e.matrixWorld),this.union(Sl)}const o=e.children;for(let l=0,c=o.length;l<c;l++)this.expandByObject(o[l],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,hi),hi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,s;return e.normal.x>0?(t=e.normal.x*this.min.x,s=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,s=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,s+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,s+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,s+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,s+=e.normal.z*this.min.z),t<=-e.constant&&s>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(jo),Ml.subVectors(this.max,jo),Ns.subVectors(e.a,jo),Us.subVectors(e.b,jo),Os.subVectors(e.c,jo),vr.subVectors(Us,Ns),_r.subVectors(Os,Us),Xr.subVectors(Ns,Os);let t=[0,-vr.z,vr.y,0,-_r.z,_r.y,0,-Xr.z,Xr.y,vr.z,0,-vr.x,_r.z,0,-_r.x,Xr.z,0,-Xr.x,-vr.y,vr.x,0,-_r.y,_r.x,0,-Xr.y,Xr.x,0];return!nd(t,Ns,Us,Os,Ml)||(t=[1,0,0,0,1,0,0,0,1],!nd(t,Ns,Us,Os,Ml))?!1:(El.crossVectors(vr,_r),t=[El.x,El.y,El.z],nd(t,Ns,Us,Os,Ml))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,hi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(hi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ki[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ki[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ki[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ki[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ki[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ki[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ki[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ki[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ki),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ki=[new ue,new ue,new ue,new ue,new ue,new ue,new ue,new ue],hi=new ue,Sl=new la,Ns=new ue,Us=new ue,Os=new ue,vr=new ue,_r=new ue,Xr=new ue,jo=new ue,Ml=new ue,El=new ue,Yr=new ue;function nd(r,e,t,s,o){for(let l=0,c=r.length-3;l<=c;l+=3){Yr.fromArray(r,l);const d=o.x*Math.abs(Yr.x)+o.y*Math.abs(Yr.y)+o.z*Math.abs(Yr.z),f=e.dot(Yr),h=t.dot(Yr),g=s.dot(Yr);if(Math.max(-Math.max(f,h,g),Math.min(f,h,g))>d)return!1}return!0}const Fy=new la,Xo=new ue,id=new ue;class Gd{constructor(e=new ue,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const s=this.center;t!==void 0?s.copy(t):Fy.setFromPoints(e).getCenter(s);let o=0;for(let l=0,c=e.length;l<c;l++)o=Math.max(o,s.distanceToSquared(e[l]));return this.radius=Math.sqrt(o),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const s=this.center.distanceToSquared(e);return t.copy(e),s>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Xo.subVectors(e,this.center);const t=Xo.lengthSq();if(t>this.radius*this.radius){const s=Math.sqrt(t),o=(s-this.radius)*.5;this.center.addScaledVector(Xo,o/s),this.radius+=o}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(id.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Xo.copy(e.center).add(id)),this.expandByPoint(Xo.copy(e.center).sub(id))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Bi=new ue,rd=new ue,Tl=new ue,xr=new ue,sd=new ue,wl=new ue,od=new ue;class ky{constructor(e=new ue,t=new ue(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Bi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const s=t.dot(this.direction);return s<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Bi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Bi.copy(this.origin).addScaledVector(this.direction,t),Bi.distanceToSquared(e))}distanceSqToSegment(e,t,s,o){rd.copy(e).add(t).multiplyScalar(.5),Tl.copy(t).sub(e).normalize(),xr.copy(this.origin).sub(rd);const l=e.distanceTo(t)*.5,c=-this.direction.dot(Tl),d=xr.dot(this.direction),f=-xr.dot(Tl),h=xr.lengthSq(),g=Math.abs(1-c*c);let m,_,S,w;if(g>0)if(m=c*f-d,_=c*d-f,w=l*g,m>=0)if(_>=-w)if(_<=w){const M=1/g;m*=M,_*=M,S=m*(m+c*_+2*d)+_*(c*m+_+2*f)+h}else _=l,m=Math.max(0,-(c*_+d)),S=-m*m+_*(_+2*f)+h;else _=-l,m=Math.max(0,-(c*_+d)),S=-m*m+_*(_+2*f)+h;else _<=-w?(m=Math.max(0,-(-c*l+d)),_=m>0?-l:Math.min(Math.max(-l,-f),l),S=-m*m+_*(_+2*f)+h):_<=w?(m=0,_=Math.min(Math.max(-l,-f),l),S=_*(_+2*f)+h):(m=Math.max(0,-(c*l+d)),_=m>0?l:Math.min(Math.max(-l,-f),l),S=-m*m+_*(_+2*f)+h);else _=c>0?-l:l,m=Math.max(0,-(c*_+d)),S=-m*m+_*(_+2*f)+h;return s&&s.copy(this.origin).addScaledVector(this.direction,m),o&&o.copy(rd).addScaledVector(Tl,_),S}intersectSphere(e,t){Bi.subVectors(e.center,this.origin);const s=Bi.dot(this.direction),o=Bi.dot(Bi)-s*s,l=e.radius*e.radius;if(o>l)return null;const c=Math.sqrt(l-o),d=s-c,f=s+c;return f<0?null:d<0?this.at(f,t):this.at(d,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(e.normal)+e.constant)/t;return s>=0?s:null}intersectPlane(e,t){const s=this.distanceToPlane(e);return s===null?null:this.at(s,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let s,o,l,c,d,f;const h=1/this.direction.x,g=1/this.direction.y,m=1/this.direction.z,_=this.origin;return h>=0?(s=(e.min.x-_.x)*h,o=(e.max.x-_.x)*h):(s=(e.max.x-_.x)*h,o=(e.min.x-_.x)*h),g>=0?(l=(e.min.y-_.y)*g,c=(e.max.y-_.y)*g):(l=(e.max.y-_.y)*g,c=(e.min.y-_.y)*g),s>c||l>o||((l>s||isNaN(s))&&(s=l),(c<o||isNaN(o))&&(o=c),m>=0?(d=(e.min.z-_.z)*m,f=(e.max.z-_.z)*m):(d=(e.max.z-_.z)*m,f=(e.min.z-_.z)*m),s>f||d>o)||((d>s||s!==s)&&(s=d),(f<o||o!==o)&&(o=f),o<0)?null:this.at(s>=0?s:o,t)}intersectsBox(e){return this.intersectBox(e,Bi)!==null}intersectTriangle(e,t,s,o,l){sd.subVectors(t,e),wl.subVectors(s,e),od.crossVectors(sd,wl);let c=this.direction.dot(od),d;if(c>0){if(o)return null;d=1}else if(c<0)d=-1,c=-c;else return null;xr.subVectors(this.origin,e);const f=d*this.direction.dot(wl.crossVectors(xr,wl));if(f<0)return null;const h=d*this.direction.dot(sd.cross(xr));if(h<0||f+h>c)return null;const g=-d*xr.dot(od);return g<0?null:this.at(g/c,l)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Kt{constructor(e,t,s,o,l,c,d,f,h,g,m,_,S,w,M,x){Kt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,s,o,l,c,d,f,h,g,m,_,S,w,M,x)}set(e,t,s,o,l,c,d,f,h,g,m,_,S,w,M,x){const y=this.elements;return y[0]=e,y[4]=t,y[8]=s,y[12]=o,y[1]=l,y[5]=c,y[9]=d,y[13]=f,y[2]=h,y[6]=g,y[10]=m,y[14]=_,y[3]=S,y[7]=w,y[11]=M,y[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Kt().fromArray(this.elements)}copy(e){const t=this.elements,s=e.elements;return t[0]=s[0],t[1]=s[1],t[2]=s[2],t[3]=s[3],t[4]=s[4],t[5]=s[5],t[6]=s[6],t[7]=s[7],t[8]=s[8],t[9]=s[9],t[10]=s[10],t[11]=s[11],t[12]=s[12],t[13]=s[13],t[14]=s[14],t[15]=s[15],this}copyPosition(e){const t=this.elements,s=e.elements;return t[12]=s[12],t[13]=s[13],t[14]=s[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,s){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this}makeBasis(e,t,s){return this.set(e.x,t.x,s.x,0,e.y,t.y,s.y,0,e.z,t.z,s.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,s=e.elements,o=1/Fs.setFromMatrixColumn(e,0).length(),l=1/Fs.setFromMatrixColumn(e,1).length(),c=1/Fs.setFromMatrixColumn(e,2).length();return t[0]=s[0]*o,t[1]=s[1]*o,t[2]=s[2]*o,t[3]=0,t[4]=s[4]*l,t[5]=s[5]*l,t[6]=s[6]*l,t[7]=0,t[8]=s[8]*c,t[9]=s[9]*c,t[10]=s[10]*c,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,s=e.x,o=e.y,l=e.z,c=Math.cos(s),d=Math.sin(s),f=Math.cos(o),h=Math.sin(o),g=Math.cos(l),m=Math.sin(l);if(e.order==="XYZ"){const _=c*g,S=c*m,w=d*g,M=d*m;t[0]=f*g,t[4]=-f*m,t[8]=h,t[1]=S+w*h,t[5]=_-M*h,t[9]=-d*f,t[2]=M-_*h,t[6]=w+S*h,t[10]=c*f}else if(e.order==="YXZ"){const _=f*g,S=f*m,w=h*g,M=h*m;t[0]=_+M*d,t[4]=w*d-S,t[8]=c*h,t[1]=c*m,t[5]=c*g,t[9]=-d,t[2]=S*d-w,t[6]=M+_*d,t[10]=c*f}else if(e.order==="ZXY"){const _=f*g,S=f*m,w=h*g,M=h*m;t[0]=_-M*d,t[4]=-c*m,t[8]=w+S*d,t[1]=S+w*d,t[5]=c*g,t[9]=M-_*d,t[2]=-c*h,t[6]=d,t[10]=c*f}else if(e.order==="ZYX"){const _=c*g,S=c*m,w=d*g,M=d*m;t[0]=f*g,t[4]=w*h-S,t[8]=_*h+M,t[1]=f*m,t[5]=M*h+_,t[9]=S*h-w,t[2]=-h,t[6]=d*f,t[10]=c*f}else if(e.order==="YZX"){const _=c*f,S=c*h,w=d*f,M=d*h;t[0]=f*g,t[4]=M-_*m,t[8]=w*m+S,t[1]=m,t[5]=c*g,t[9]=-d*g,t[2]=-h*g,t[6]=S*m+w,t[10]=_-M*m}else if(e.order==="XZY"){const _=c*f,S=c*h,w=d*f,M=d*h;t[0]=f*g,t[4]=-m,t[8]=h*g,t[1]=_*m+M,t[5]=c*g,t[9]=S*m-w,t[2]=w*m-S,t[6]=d*g,t[10]=M*m+_}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(By,e,zy)}lookAt(e,t,s){const o=this.elements;return Yn.subVectors(e,t),Yn.lengthSq()===0&&(Yn.z=1),Yn.normalize(),yr.crossVectors(s,Yn),yr.lengthSq()===0&&(Math.abs(s.z)===1?Yn.x+=1e-4:Yn.z+=1e-4,Yn.normalize(),yr.crossVectors(s,Yn)),yr.normalize(),Al.crossVectors(Yn,yr),o[0]=yr.x,o[4]=Al.x,o[8]=Yn.x,o[1]=yr.y,o[5]=Al.y,o[9]=Yn.y,o[2]=yr.z,o[6]=Al.z,o[10]=Yn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const s=e.elements,o=t.elements,l=this.elements,c=s[0],d=s[4],f=s[8],h=s[12],g=s[1],m=s[5],_=s[9],S=s[13],w=s[2],M=s[6],x=s[10],y=s[14],A=s[3],b=s[7],L=s[11],B=s[15],U=o[0],I=o[4],Q=o[8],E=o[12],C=o[1],$=o[5],oe=o[9],de=o[13],k=o[2],Y=o[6],J=o[10],ae=o[14],W=o[3],q=o[7],z=o[11],D=o[15];return l[0]=c*U+d*C+f*k+h*W,l[4]=c*I+d*$+f*Y+h*q,l[8]=c*Q+d*oe+f*J+h*z,l[12]=c*E+d*de+f*ae+h*D,l[1]=g*U+m*C+_*k+S*W,l[5]=g*I+m*$+_*Y+S*q,l[9]=g*Q+m*oe+_*J+S*z,l[13]=g*E+m*de+_*ae+S*D,l[2]=w*U+M*C+x*k+y*W,l[6]=w*I+M*$+x*Y+y*q,l[10]=w*Q+M*oe+x*J+y*z,l[14]=w*E+M*de+x*ae+y*D,l[3]=A*U+b*C+L*k+B*W,l[7]=A*I+b*$+L*Y+B*q,l[11]=A*Q+b*oe+L*J+B*z,l[15]=A*E+b*de+L*ae+B*D,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],s=e[4],o=e[8],l=e[12],c=e[1],d=e[5],f=e[9],h=e[13],g=e[2],m=e[6],_=e[10],S=e[14],w=e[3],M=e[7],x=e[11],y=e[15];return w*(+l*f*m-o*h*m-l*d*_+s*h*_+o*d*S-s*f*S)+M*(+t*f*S-t*h*_+l*c*_-o*c*S+o*h*g-l*f*g)+x*(+t*h*m-t*d*S-l*c*m+s*c*S+l*d*g-s*h*g)+y*(-o*d*g-t*f*m+t*d*_+o*c*m-s*c*_+s*f*g)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,s){const o=this.elements;return e.isVector3?(o[12]=e.x,o[13]=e.y,o[14]=e.z):(o[12]=e,o[13]=t,o[14]=s),this}invert(){const e=this.elements,t=e[0],s=e[1],o=e[2],l=e[3],c=e[4],d=e[5],f=e[6],h=e[7],g=e[8],m=e[9],_=e[10],S=e[11],w=e[12],M=e[13],x=e[14],y=e[15],A=m*x*h-M*_*h+M*f*S-d*x*S-m*f*y+d*_*y,b=w*_*h-g*x*h-w*f*S+c*x*S+g*f*y-c*_*y,L=g*M*h-w*m*h+w*d*S-c*M*S-g*d*y+c*m*y,B=w*m*f-g*M*f-w*d*_+c*M*_+g*d*x-c*m*x,U=t*A+s*b+o*L+l*B;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/U;return e[0]=A*I,e[1]=(M*_*l-m*x*l-M*o*S+s*x*S+m*o*y-s*_*y)*I,e[2]=(d*x*l-M*f*l+M*o*h-s*x*h-d*o*y+s*f*y)*I,e[3]=(m*f*l-d*_*l-m*o*h+s*_*h+d*o*S-s*f*S)*I,e[4]=b*I,e[5]=(g*x*l-w*_*l+w*o*S-t*x*S-g*o*y+t*_*y)*I,e[6]=(w*f*l-c*x*l-w*o*h+t*x*h+c*o*y-t*f*y)*I,e[7]=(c*_*l-g*f*l+g*o*h-t*_*h-c*o*S+t*f*S)*I,e[8]=L*I,e[9]=(w*m*l-g*M*l-w*s*S+t*M*S+g*s*y-t*m*y)*I,e[10]=(c*M*l-w*d*l+w*s*h-t*M*h-c*s*y+t*d*y)*I,e[11]=(g*d*l-c*m*l-g*s*h+t*m*h+c*s*S-t*d*S)*I,e[12]=B*I,e[13]=(g*M*o-w*m*o+w*s*_-t*M*_-g*s*x+t*m*x)*I,e[14]=(w*d*o-c*M*o-w*s*f+t*M*f+c*s*x-t*d*x)*I,e[15]=(c*m*o-g*d*o+g*s*f-t*m*f-c*s*_+t*d*_)*I,this}scale(e){const t=this.elements,s=e.x,o=e.y,l=e.z;return t[0]*=s,t[4]*=o,t[8]*=l,t[1]*=s,t[5]*=o,t[9]*=l,t[2]*=s,t[6]*=o,t[10]*=l,t[3]*=s,t[7]*=o,t[11]*=l,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],o=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,s,o))}makeTranslation(e,t,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,s,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,t,-s,0,0,s,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),s=Math.sin(e);return this.set(t,0,s,0,0,1,0,0,-s,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),s=Math.sin(e);return this.set(t,-s,0,0,s,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const s=Math.cos(t),o=Math.sin(t),l=1-s,c=e.x,d=e.y,f=e.z,h=l*c,g=l*d;return this.set(h*c+s,h*d-o*f,h*f+o*d,0,h*d+o*f,g*d+s,g*f-o*c,0,h*f-o*d,g*f+o*c,l*f*f+s,0,0,0,0,1),this}makeScale(e,t,s){return this.set(e,0,0,0,0,t,0,0,0,0,s,0,0,0,0,1),this}makeShear(e,t,s,o,l,c){return this.set(1,s,l,0,e,1,c,0,t,o,1,0,0,0,0,1),this}compose(e,t,s){const o=this.elements,l=t._x,c=t._y,d=t._z,f=t._w,h=l+l,g=c+c,m=d+d,_=l*h,S=l*g,w=l*m,M=c*g,x=c*m,y=d*m,A=f*h,b=f*g,L=f*m,B=s.x,U=s.y,I=s.z;return o[0]=(1-(M+y))*B,o[1]=(S+L)*B,o[2]=(w-b)*B,o[3]=0,o[4]=(S-L)*U,o[5]=(1-(_+y))*U,o[6]=(x+A)*U,o[7]=0,o[8]=(w+b)*I,o[9]=(x-A)*I,o[10]=(1-(_+M))*I,o[11]=0,o[12]=e.x,o[13]=e.y,o[14]=e.z,o[15]=1,this}decompose(e,t,s){const o=this.elements;let l=Fs.set(o[0],o[1],o[2]).length();const c=Fs.set(o[4],o[5],o[6]).length(),d=Fs.set(o[8],o[9],o[10]).length();this.determinant()<0&&(l=-l),e.x=o[12],e.y=o[13],e.z=o[14],pi.copy(this);const h=1/l,g=1/c,m=1/d;return pi.elements[0]*=h,pi.elements[1]*=h,pi.elements[2]*=h,pi.elements[4]*=g,pi.elements[5]*=g,pi.elements[6]*=g,pi.elements[8]*=m,pi.elements[9]*=m,pi.elements[10]*=m,t.setFromRotationMatrix(pi),s.x=l,s.y=c,s.z=d,this}makePerspective(e,t,s,o,l,c,d=Yi){const f=this.elements,h=2*l/(t-e),g=2*l/(s-o),m=(t+e)/(t-e),_=(s+o)/(s-o);let S,w;if(d===Yi)S=-(c+l)/(c-l),w=-2*c*l/(c-l);else if(d===$l)S=-c/(c-l),w=-c*l/(c-l);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return f[0]=h,f[4]=0,f[8]=m,f[12]=0,f[1]=0,f[5]=g,f[9]=_,f[13]=0,f[2]=0,f[6]=0,f[10]=S,f[14]=w,f[3]=0,f[7]=0,f[11]=-1,f[15]=0,this}makeOrthographic(e,t,s,o,l,c,d=Yi){const f=this.elements,h=1/(t-e),g=1/(s-o),m=1/(c-l),_=(t+e)*h,S=(s+o)*g;let w,M;if(d===Yi)w=(c+l)*m,M=-2*m;else if(d===$l)w=l*m,M=-1*m;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return f[0]=2*h,f[4]=0,f[8]=0,f[12]=-_,f[1]=0,f[5]=2*g,f[9]=0,f[13]=-S,f[2]=0,f[6]=0,f[10]=M,f[14]=-w,f[3]=0,f[7]=0,f[11]=0,f[15]=1,this}equals(e){const t=this.elements,s=e.elements;for(let o=0;o<16;o++)if(t[o]!==s[o])return!1;return!0}fromArray(e,t=0){for(let s=0;s<16;s++)this.elements[s]=e[s+t];return this}toArray(e=[],t=0){const s=this.elements;return e[t]=s[0],e[t+1]=s[1],e[t+2]=s[2],e[t+3]=s[3],e[t+4]=s[4],e[t+5]=s[5],e[t+6]=s[6],e[t+7]=s[7],e[t+8]=s[8],e[t+9]=s[9],e[t+10]=s[10],e[t+11]=s[11],e[t+12]=s[12],e[t+13]=s[13],e[t+14]=s[14],e[t+15]=s[15],e}}const Fs=new ue,pi=new Kt,By=new ue(0,0,0),zy=new ue(1,1,1),yr=new ue,Al=new ue,Yn=new ue,wm=new Kt,Am=new aa;class tu{constructor(e=0,t=0,s=0,o=tu.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=s,this._order=o}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,s,o=this._order){return this._x=e,this._y=t,this._z=s,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,s=!0){const o=e.elements,l=o[0],c=o[4],d=o[8],f=o[1],h=o[5],g=o[9],m=o[2],_=o[6],S=o[10];switch(t){case"XYZ":this._y=Math.asin(Fn(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-g,S),this._z=Math.atan2(-c,l)):(this._x=Math.atan2(_,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Fn(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(d,S),this._z=Math.atan2(f,h)):(this._y=Math.atan2(-m,l),this._z=0);break;case"ZXY":this._x=Math.asin(Fn(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(-m,S),this._z=Math.atan2(-c,h)):(this._y=0,this._z=Math.atan2(f,l));break;case"ZYX":this._y=Math.asin(-Fn(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(_,S),this._z=Math.atan2(f,l)):(this._x=0,this._z=Math.atan2(-c,h));break;case"YZX":this._z=Math.asin(Fn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(-g,h),this._y=Math.atan2(-m,l)):(this._x=0,this._y=Math.atan2(d,S));break;case"XZY":this._z=Math.asin(-Fn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(_,h),this._y=Math.atan2(d,l)):(this._x=Math.atan2(-g,S),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,s===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,s){return wm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(wm,t,s)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Am.setFromEuler(this),this.setFromQuaternion(Am,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}tu.DEFAULT_ORDER="XYZ";class qg{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Hy=0;const Cm=new ue,ks=new aa,zi=new Kt,Cl=new ue,Yo=new ue,Gy=new ue,Vy=new aa,bm=new ue(1,0,0),Rm=new ue(0,1,0),Lm=new ue(0,0,1),Wy={type:"added"},jy={type:"removed"};class un extends oo{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Hy++}),this.uuid=oa(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=un.DEFAULT_UP.clone();const e=new ue,t=new tu,s=new aa,o=new ue(1,1,1);function l(){s.setFromEuler(t,!1)}function c(){t.setFromQuaternion(s,void 0,!1)}t._onChange(l),s._onChange(c),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new Kt},normalMatrix:{value:new ht}}),this.matrix=new Kt,this.matrixWorld=new Kt,this.matrixAutoUpdate=un.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=un.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new qg,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ks.setFromAxisAngle(e,t),this.quaternion.multiply(ks),this}rotateOnWorldAxis(e,t){return ks.setFromAxisAngle(e,t),this.quaternion.premultiply(ks),this}rotateX(e){return this.rotateOnAxis(bm,e)}rotateY(e){return this.rotateOnAxis(Rm,e)}rotateZ(e){return this.rotateOnAxis(Lm,e)}translateOnAxis(e,t){return Cm.copy(e).applyQuaternion(this.quaternion),this.position.add(Cm.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(bm,e)}translateY(e){return this.translateOnAxis(Rm,e)}translateZ(e){return this.translateOnAxis(Lm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(zi.copy(this.matrixWorld).invert())}lookAt(e,t,s){e.isVector3?Cl.copy(e):Cl.set(e,t,s);const o=this.parent;this.updateWorldMatrix(!0,!1),Yo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?zi.lookAt(Yo,Cl,this.up):zi.lookAt(Cl,Yo,this.up),this.quaternion.setFromRotationMatrix(zi),o&&(zi.extractRotation(o.matrixWorld),ks.setFromRotationMatrix(zi),this.quaternion.premultiply(ks.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Wy)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(jy)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),zi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),zi.multiply(e.parent.matrixWorld)),e.applyMatrix4(zi),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let s=0,o=this.children.length;s<o;s++){const c=this.children[s].getObjectByProperty(e,t);if(c!==void 0)return c}}getObjectsByProperty(e,t,s=[]){this[e]===t&&s.push(this);const o=this.children;for(let l=0,c=o.length;l<c;l++)o[l].getObjectsByProperty(e,t,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yo,e,Gy),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yo,Vy,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let s=0,o=t.length;s<o;s++)t[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let s=0,o=t.length;s<o;s++)t[s].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let s=0,o=t.length;s<o;s++){const l=t[s];(l.matrixWorldAutoUpdate===!0||e===!0)&&l.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const s=this.parent;if(e===!0&&s!==null&&s.matrixWorldAutoUpdate===!0&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const o=this.children;for(let l=0,c=o.length;l<c;l++){const d=o[l];d.matrixWorldAutoUpdate===!0&&d.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",s={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const o={};o.uuid=this.uuid,o.type=this.type,this.name!==""&&(o.name=this.name),this.castShadow===!0&&(o.castShadow=!0),this.receiveShadow===!0&&(o.receiveShadow=!0),this.visible===!1&&(o.visible=!1),this.frustumCulled===!1&&(o.frustumCulled=!1),this.renderOrder!==0&&(o.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(o.matrixAutoUpdate=!1),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.visibility=this._visibility,o.active=this._active,o.bounds=this._bounds.map(d=>({boxInitialized:d.boxInitialized,boxMin:d.box.min.toArray(),boxMax:d.box.max.toArray(),sphereInitialized:d.sphereInitialized,sphereRadius:d.sphere.radius,sphereCenter:d.sphere.center.toArray()})),o.maxGeometryCount=this._maxGeometryCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.geometryCount=this._geometryCount,o.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(o.boundingSphere={center:o.boundingSphere.center.toArray(),radius:o.boundingSphere.radius}),this.boundingBox!==null&&(o.boundingBox={min:o.boundingBox.min.toArray(),max:o.boundingBox.max.toArray()}));function l(d,f){return d[f.uuid]===void 0&&(d[f.uuid]=f.toJSON(e)),f.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=l(e.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const f=d.shapes;if(Array.isArray(f))for(let h=0,g=f.length;h<g;h++){const m=f[h];l(e.shapes,m)}else l(e.shapes,f)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(l(e.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let f=0,h=this.material.length;f<h;f++)d.push(l(e.materials,this.material[f]));o.material=d}else o.material=l(e.materials,this.material);if(this.children.length>0){o.children=[];for(let d=0;d<this.children.length;d++)o.children.push(this.children[d].toJSON(e).object)}if(this.animations.length>0){o.animations=[];for(let d=0;d<this.animations.length;d++){const f=this.animations[d];o.animations.push(l(e.animations,f))}}if(t){const d=c(e.geometries),f=c(e.materials),h=c(e.textures),g=c(e.images),m=c(e.shapes),_=c(e.skeletons),S=c(e.animations),w=c(e.nodes);d.length>0&&(s.geometries=d),f.length>0&&(s.materials=f),h.length>0&&(s.textures=h),g.length>0&&(s.images=g),m.length>0&&(s.shapes=m),_.length>0&&(s.skeletons=_),S.length>0&&(s.animations=S),w.length>0&&(s.nodes=w)}return s.object=o,s;function c(d){const f=[];for(const h in d){const g=d[h];delete g.metadata,f.push(g)}return f}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let s=0;s<e.children.length;s++){const o=e.children[s];this.add(o.clone())}return this}}un.DEFAULT_UP=new ue(0,1,0);un.DEFAULT_MATRIX_AUTO_UPDATE=!0;un.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const mi=new ue,Hi=new ue,ad=new ue,Gi=new ue,Bs=new ue,zs=new ue,Pm=new ue,ld=new ue,ud=new ue,cd=new ue;let bl=!1;class vi{constructor(e=new ue,t=new ue,s=new ue){this.a=e,this.b=t,this.c=s}static getNormal(e,t,s,o){o.subVectors(s,t),mi.subVectors(e,t),o.cross(mi);const l=o.lengthSq();return l>0?o.multiplyScalar(1/Math.sqrt(l)):o.set(0,0,0)}static getBarycoord(e,t,s,o,l){mi.subVectors(o,t),Hi.subVectors(s,t),ad.subVectors(e,t);const c=mi.dot(mi),d=mi.dot(Hi),f=mi.dot(ad),h=Hi.dot(Hi),g=Hi.dot(ad),m=c*h-d*d;if(m===0)return l.set(0,0,0),null;const _=1/m,S=(h*f-d*g)*_,w=(c*g-d*f)*_;return l.set(1-S-w,w,S)}static containsPoint(e,t,s,o){return this.getBarycoord(e,t,s,o,Gi)===null?!1:Gi.x>=0&&Gi.y>=0&&Gi.x+Gi.y<=1}static getUV(e,t,s,o,l,c,d,f){return bl===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),bl=!0),this.getInterpolation(e,t,s,o,l,c,d,f)}static getInterpolation(e,t,s,o,l,c,d,f){return this.getBarycoord(e,t,s,o,Gi)===null?(f.x=0,f.y=0,"z"in f&&(f.z=0),"w"in f&&(f.w=0),null):(f.setScalar(0),f.addScaledVector(l,Gi.x),f.addScaledVector(c,Gi.y),f.addScaledVector(d,Gi.z),f)}static isFrontFacing(e,t,s,o){return mi.subVectors(s,t),Hi.subVectors(e,t),mi.cross(Hi).dot(o)<0}set(e,t,s){return this.a.copy(e),this.b.copy(t),this.c.copy(s),this}setFromPointsAndIndices(e,t,s,o){return this.a.copy(e[t]),this.b.copy(e[s]),this.c.copy(e[o]),this}setFromAttributeAndIndices(e,t,s,o){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,s),this.c.fromBufferAttribute(e,o),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return mi.subVectors(this.c,this.b),Hi.subVectors(this.a,this.b),mi.cross(Hi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return vi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return vi.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,s,o,l){return bl===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),bl=!0),vi.getInterpolation(e,this.a,this.b,this.c,t,s,o,l)}getInterpolation(e,t,s,o,l){return vi.getInterpolation(e,this.a,this.b,this.c,t,s,o,l)}containsPoint(e){return vi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return vi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const s=this.a,o=this.b,l=this.c;let c,d;Bs.subVectors(o,s),zs.subVectors(l,s),ld.subVectors(e,s);const f=Bs.dot(ld),h=zs.dot(ld);if(f<=0&&h<=0)return t.copy(s);ud.subVectors(e,o);const g=Bs.dot(ud),m=zs.dot(ud);if(g>=0&&m<=g)return t.copy(o);const _=f*m-g*h;if(_<=0&&f>=0&&g<=0)return c=f/(f-g),t.copy(s).addScaledVector(Bs,c);cd.subVectors(e,l);const S=Bs.dot(cd),w=zs.dot(cd);if(w>=0&&S<=w)return t.copy(l);const M=S*h-f*w;if(M<=0&&h>=0&&w<=0)return d=h/(h-w),t.copy(s).addScaledVector(zs,d);const x=g*w-S*m;if(x<=0&&m-g>=0&&S-w>=0)return Pm.subVectors(l,o),d=(m-g)/(m-g+(S-w)),t.copy(o).addScaledVector(Pm,d);const y=1/(x+M+_);return c=M*y,d=_*y,t.copy(s).addScaledVector(Bs,c).addScaledVector(zs,d)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const $g={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Sr={h:0,s:0,l:0},Rl={h:0,s:0,l:0};function dd(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class yt{constructor(e,t,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,s)}set(e,t,s){if(t===void 0&&s===void 0){const o=e;o&&o.isColor?this.copy(o):typeof o=="number"?this.setHex(o):typeof o=="string"&&this.setStyle(o)}else this.setRGB(e,t,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ln){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,At.toWorkingColorSpace(this,t),this}setRGB(e,t,s,o=At.workingColorSpace){return this.r=e,this.g=t,this.b=s,At.toWorkingColorSpace(this,o),this}setHSL(e,t,s,o=At.workingColorSpace){if(e=Ly(e,1),t=Fn(t,0,1),s=Fn(s,0,1),t===0)this.r=this.g=this.b=s;else{const l=s<=.5?s*(1+t):s+t-s*t,c=2*s-l;this.r=dd(c,l,e+1/3),this.g=dd(c,l,e),this.b=dd(c,l,e-1/3)}return At.toWorkingColorSpace(this,o),this}setStyle(e,t=ln){function s(l){l!==void 0&&parseFloat(l)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let o;if(o=/^(\w+)\(([^\)]*)\)/.exec(e)){let l;const c=o[1],d=o[2];switch(c){case"rgb":case"rgba":if(l=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(l[4]),this.setRGB(Math.min(255,parseInt(l[1],10))/255,Math.min(255,parseInt(l[2],10))/255,Math.min(255,parseInt(l[3],10))/255,t);if(l=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(l[4]),this.setRGB(Math.min(100,parseInt(l[1],10))/100,Math.min(100,parseInt(l[2],10))/100,Math.min(100,parseInt(l[3],10))/100,t);break;case"hsl":case"hsla":if(l=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(l[4]),this.setHSL(parseFloat(l[1])/360,parseFloat(l[2])/100,parseFloat(l[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(o=/^\#([A-Fa-f\d]+)$/.exec(e)){const l=o[1],c=l.length;if(c===3)return this.setRGB(parseInt(l.charAt(0),16)/15,parseInt(l.charAt(1),16)/15,parseInt(l.charAt(2),16)/15,t);if(c===6)return this.setHex(parseInt(l,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ln){const s=$g[e.toLowerCase()];return s!==void 0?this.setHex(s,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Qs(e.r),this.g=Qs(e.g),this.b=Qs(e.b),this}copyLinearToSRGB(e){return this.r=Jc(e.r),this.g=Jc(e.g),this.b=Jc(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ln){return At.fromWorkingColorSpace(gn.copy(this),e),Math.round(Fn(gn.r*255,0,255))*65536+Math.round(Fn(gn.g*255,0,255))*256+Math.round(Fn(gn.b*255,0,255))}getHexString(e=ln){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=At.workingColorSpace){At.fromWorkingColorSpace(gn.copy(this),t);const s=gn.r,o=gn.g,l=gn.b,c=Math.max(s,o,l),d=Math.min(s,o,l);let f,h;const g=(d+c)/2;if(d===c)f=0,h=0;else{const m=c-d;switch(h=g<=.5?m/(c+d):m/(2-c-d),c){case s:f=(o-l)/m+(o<l?6:0);break;case o:f=(l-s)/m+2;break;case l:f=(s-o)/m+4;break}f/=6}return e.h=f,e.s=h,e.l=g,e}getRGB(e,t=At.workingColorSpace){return At.fromWorkingColorSpace(gn.copy(this),t),e.r=gn.r,e.g=gn.g,e.b=gn.b,e}getStyle(e=ln){At.fromWorkingColorSpace(gn.copy(this),e);const t=gn.r,s=gn.g,o=gn.b;return e!==ln?`color(${e} ${t.toFixed(3)} ${s.toFixed(3)} ${o.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(s*255)},${Math.round(o*255)})`}offsetHSL(e,t,s){return this.getHSL(Sr),this.setHSL(Sr.h+e,Sr.s+t,Sr.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,s){return this.r=e.r+(t.r-e.r)*s,this.g=e.g+(t.g-e.g)*s,this.b=e.b+(t.b-e.b)*s,this}lerpHSL(e,t){this.getHSL(Sr),e.getHSL(Rl);const s=Zc(Sr.h,Rl.h,t),o=Zc(Sr.s,Rl.s,t),l=Zc(Sr.l,Rl.l,t);return this.setHSL(s,o,l),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,s=this.g,o=this.b,l=e.elements;return this.r=l[0]*t+l[3]*s+l[6]*o,this.g=l[1]*t+l[4]*s+l[7]*o,this.b=l[2]*t+l[5]*s+l[8]*o,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const gn=new yt;yt.NAMES=$g;let Xy=0;class ua extends oo{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Xy++}),this.uuid=oa(),this.name="",this.type="Material",this.blending=Zs,this.side=br,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ad,this.blendDst=Cd,this.blendEquation=Qr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new yt(0,0,0),this.blendAlpha=0,this.depthFunc=Wl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=vm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ds,this.stencilZFail=Ds,this.stencilZPass=Ds,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const s=e[t];if(s===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const o=this[t];if(o===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}o&&o.isColor?o.set(s):o&&o.isVector3&&s&&s.isVector3?o.copy(s):this[t]=s}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const s={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(e).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(e).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(e).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(e).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(e).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==Zs&&(s.blending=this.blending),this.side!==br&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==Ad&&(s.blendSrc=this.blendSrc),this.blendDst!==Cd&&(s.blendDst=this.blendDst),this.blendEquation!==Qr&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==Wl&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==vm&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ds&&(s.stencilFail=this.stencilFail),this.stencilZFail!==Ds&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==Ds&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function o(l){const c=[];for(const d in l){const f=l[d];delete f.metadata,c.push(f)}return c}if(t){const l=o(e.textures),c=o(e.images);l.length>0&&(s.textures=l),c.length>0&&(s.images=c)}return s}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let s=null;if(t!==null){const o=t.length;s=new Array(o);for(let l=0;l!==o;++l)s[l]=t[l].clone()}return this.clippingPlanes=s,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Kg extends ua{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Dg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const jt=new ue,Ll=new St;class wi{constructor(e,t,s=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=s,this.usage=_m,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Tr,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,s){e*=this.itemSize,s*=t.itemSize;for(let o=0,l=this.itemSize;o<l;o++)this.array[e+o]=t.array[s+o];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,s=this.count;t<s;t++)Ll.fromBufferAttribute(this,t),Ll.applyMatrix3(e),this.setXY(t,Ll.x,Ll.y);else if(this.itemSize===3)for(let t=0,s=this.count;t<s;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix3(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyMatrix4(e){for(let t=0,s=this.count;t<s;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix4(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyNormalMatrix(e){for(let t=0,s=this.count;t<s;t++)jt.fromBufferAttribute(this,t),jt.applyNormalMatrix(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}transformDirection(e){for(let t=0,s=this.count;t<s;t++)jt.fromBufferAttribute(this,t),jt.transformDirection(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let s=this.array[e*this.itemSize+t];return this.normalized&&(s=Wo(s,this.array)),s}setComponent(e,t,s){return this.normalized&&(s=Un(s,this.array)),this.array[e*this.itemSize+t]=s,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Wo(t,this.array)),t}setX(e,t){return this.normalized&&(t=Un(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Wo(t,this.array)),t}setY(e,t){return this.normalized&&(t=Un(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Wo(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Un(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Wo(t,this.array)),t}setW(e,t){return this.normalized&&(t=Un(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,s){return e*=this.itemSize,this.normalized&&(t=Un(t,this.array),s=Un(s,this.array)),this.array[e+0]=t,this.array[e+1]=s,this}setXYZ(e,t,s,o){return e*=this.itemSize,this.normalized&&(t=Un(t,this.array),s=Un(s,this.array),o=Un(o,this.array)),this.array[e+0]=t,this.array[e+1]=s,this.array[e+2]=o,this}setXYZW(e,t,s,o,l){return e*=this.itemSize,this.normalized&&(t=Un(t,this.array),s=Un(s,this.array),o=Un(o,this.array),l=Un(l,this.array)),this.array[e+0]=t,this.array[e+1]=s,this.array[e+2]=o,this.array[e+3]=l,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==_m&&(e.usage=this.usage),e}}class Zg extends wi{constructor(e,t,s){super(new Uint16Array(e),t,s)}}class Qg extends wi{constructor(e,t,s){super(new Uint32Array(e),t,s)}}class Ai extends wi{constructor(e,t,s){super(new Float32Array(e),t,s)}}let Yy=0;const ii=new Kt,fd=new un,Hs=new ue,qn=new la,qo=new la,rn=new ue;class Lr extends oo{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Yy++}),this.uuid=oa(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Wg(e)?Qg:Zg)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,s=0){this.groups.push({start:e,count:t,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const l=new ht().getNormalMatrix(e);s.applyNormalMatrix(l),s.needsUpdate=!0}const o=this.attributes.tangent;return o!==void 0&&(o.transformDirection(e),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ii.makeRotationFromQuaternion(e),this.applyMatrix4(ii),this}rotateX(e){return ii.makeRotationX(e),this.applyMatrix4(ii),this}rotateY(e){return ii.makeRotationY(e),this.applyMatrix4(ii),this}rotateZ(e){return ii.makeRotationZ(e),this.applyMatrix4(ii),this}translate(e,t,s){return ii.makeTranslation(e,t,s),this.applyMatrix4(ii),this}scale(e,t,s){return ii.makeScale(e,t,s),this.applyMatrix4(ii),this}lookAt(e){return fd.lookAt(e),fd.updateMatrix(),this.applyMatrix4(fd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hs).negate(),this.translate(Hs.x,Hs.y,Hs.z),this}setFromPoints(e){const t=[];for(let s=0,o=e.length;s<o;s++){const l=e[s];t.push(l.x,l.y,l.z||0)}return this.setAttribute("position",new Ai(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new la);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new ue(-1/0,-1/0,-1/0),new ue(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const l=t[s];qn.setFromBufferAttribute(l),this.morphTargetsRelative?(rn.addVectors(this.boundingBox.min,qn.min),this.boundingBox.expandByPoint(rn),rn.addVectors(this.boundingBox.max,qn.max),this.boundingBox.expandByPoint(rn)):(this.boundingBox.expandByPoint(qn.min),this.boundingBox.expandByPoint(qn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gd);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new ue,1/0);return}if(e){const s=this.boundingSphere.center;if(qn.setFromBufferAttribute(e),t)for(let l=0,c=t.length;l<c;l++){const d=t[l];qo.setFromBufferAttribute(d),this.morphTargetsRelative?(rn.addVectors(qn.min,qo.min),qn.expandByPoint(rn),rn.addVectors(qn.max,qo.max),qn.expandByPoint(rn)):(qn.expandByPoint(qo.min),qn.expandByPoint(qo.max))}qn.getCenter(s);let o=0;for(let l=0,c=e.count;l<c;l++)rn.fromBufferAttribute(e,l),o=Math.max(o,s.distanceToSquared(rn));if(t)for(let l=0,c=t.length;l<c;l++){const d=t[l],f=this.morphTargetsRelative;for(let h=0,g=d.count;h<g;h++)rn.fromBufferAttribute(d,h),f&&(Hs.fromBufferAttribute(e,h),rn.add(Hs)),o=Math.max(o,s.distanceToSquared(rn))}this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=e.array,o=t.position.array,l=t.normal.array,c=t.uv.array,d=o.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new wi(new Float32Array(4*d),4));const f=this.getAttribute("tangent").array,h=[],g=[];for(let C=0;C<d;C++)h[C]=new ue,g[C]=new ue;const m=new ue,_=new ue,S=new ue,w=new St,M=new St,x=new St,y=new ue,A=new ue;function b(C,$,oe){m.fromArray(o,C*3),_.fromArray(o,$*3),S.fromArray(o,oe*3),w.fromArray(c,C*2),M.fromArray(c,$*2),x.fromArray(c,oe*2),_.sub(m),S.sub(m),M.sub(w),x.sub(w);const de=1/(M.x*x.y-x.x*M.y);isFinite(de)&&(y.copy(_).multiplyScalar(x.y).addScaledVector(S,-M.y).multiplyScalar(de),A.copy(S).multiplyScalar(M.x).addScaledVector(_,-x.x).multiplyScalar(de),h[C].add(y),h[$].add(y),h[oe].add(y),g[C].add(A),g[$].add(A),g[oe].add(A))}let L=this.groups;L.length===0&&(L=[{start:0,count:s.length}]);for(let C=0,$=L.length;C<$;++C){const oe=L[C],de=oe.start,k=oe.count;for(let Y=de,J=de+k;Y<J;Y+=3)b(s[Y+0],s[Y+1],s[Y+2])}const B=new ue,U=new ue,I=new ue,Q=new ue;function E(C){I.fromArray(l,C*3),Q.copy(I);const $=h[C];B.copy($),B.sub(I.multiplyScalar(I.dot($))).normalize(),U.crossVectors(Q,$);const de=U.dot(g[C])<0?-1:1;f[C*4]=B.x,f[C*4+1]=B.y,f[C*4+2]=B.z,f[C*4+3]=de}for(let C=0,$=L.length;C<$;++C){const oe=L[C],de=oe.start,k=oe.count;for(let Y=de,J=de+k;Y<J;Y+=3)E(s[Y+0]),E(s[Y+1]),E(s[Y+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new wi(new Float32Array(t.count*3),3),this.setAttribute("normal",s);else for(let _=0,S=s.count;_<S;_++)s.setXYZ(_,0,0,0);const o=new ue,l=new ue,c=new ue,d=new ue,f=new ue,h=new ue,g=new ue,m=new ue;if(e)for(let _=0,S=e.count;_<S;_+=3){const w=e.getX(_+0),M=e.getX(_+1),x=e.getX(_+2);o.fromBufferAttribute(t,w),l.fromBufferAttribute(t,M),c.fromBufferAttribute(t,x),g.subVectors(c,l),m.subVectors(o,l),g.cross(m),d.fromBufferAttribute(s,w),f.fromBufferAttribute(s,M),h.fromBufferAttribute(s,x),d.add(g),f.add(g),h.add(g),s.setXYZ(w,d.x,d.y,d.z),s.setXYZ(M,f.x,f.y,f.z),s.setXYZ(x,h.x,h.y,h.z)}else for(let _=0,S=t.count;_<S;_+=3)o.fromBufferAttribute(t,_+0),l.fromBufferAttribute(t,_+1),c.fromBufferAttribute(t,_+2),g.subVectors(c,l),m.subVectors(o,l),g.cross(m),s.setXYZ(_+0,g.x,g.y,g.z),s.setXYZ(_+1,g.x,g.y,g.z),s.setXYZ(_+2,g.x,g.y,g.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,s=e.count;t<s;t++)rn.fromBufferAttribute(e,t),rn.normalize(),e.setXYZ(t,rn.x,rn.y,rn.z)}toNonIndexed(){function e(d,f){const h=d.array,g=d.itemSize,m=d.normalized,_=new h.constructor(f.length*g);let S=0,w=0;for(let M=0,x=f.length;M<x;M++){d.isInterleavedBufferAttribute?S=f[M]*d.data.stride+d.offset:S=f[M]*g;for(let y=0;y<g;y++)_[w++]=h[S++]}return new wi(_,g,m)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Lr,s=this.index.array,o=this.attributes;for(const d in o){const f=o[d],h=e(f,s);t.setAttribute(d,h)}const l=this.morphAttributes;for(const d in l){const f=[],h=l[d];for(let g=0,m=h.length;g<m;g++){const _=h[g],S=e(_,s);f.push(S)}t.morphAttributes[d]=f}t.morphTargetsRelative=this.morphTargetsRelative;const c=this.groups;for(let d=0,f=c.length;d<f;d++){const h=c[d];t.addGroup(h.start,h.count,h.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const f=this.parameters;for(const h in f)f[h]!==void 0&&(e[h]=f[h]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const s=this.attributes;for(const f in s){const h=s[f];e.data.attributes[f]=h.toJSON(e.data)}const o={};let l=!1;for(const f in this.morphAttributes){const h=this.morphAttributes[f],g=[];for(let m=0,_=h.length;m<_;m++){const S=h[m];g.push(S.toJSON(e.data))}g.length>0&&(o[f]=g,l=!0)}l&&(e.data.morphAttributes=o,e.data.morphTargetsRelative=this.morphTargetsRelative);const c=this.groups;c.length>0&&(e.data.groups=JSON.parse(JSON.stringify(c)));const d=this.boundingSphere;return d!==null&&(e.data.boundingSphere={center:d.center.toArray(),radius:d.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const s=e.index;s!==null&&this.setIndex(s.clone(t));const o=e.attributes;for(const h in o){const g=o[h];this.setAttribute(h,g.clone(t))}const l=e.morphAttributes;for(const h in l){const g=[],m=l[h];for(let _=0,S=m.length;_<S;_++)g.push(m[_].clone(t));this.morphAttributes[h]=g}this.morphTargetsRelative=e.morphTargetsRelative;const c=e.groups;for(let h=0,g=c.length;h<g;h++){const m=c[h];this.addGroup(m.start,m.count,m.materialIndex)}const d=e.boundingBox;d!==null&&(this.boundingBox=d.clone());const f=e.boundingSphere;return f!==null&&(this.boundingSphere=f.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Dm=new Kt,qr=new ky,Pl=new Gd,Im=new ue,Gs=new ue,Vs=new ue,Ws=new ue,hd=new ue,Dl=new ue,Il=new St,Nl=new St,Ul=new St,Nm=new ue,Um=new ue,Om=new ue,Ol=new ue,Fl=new ue;class qi extends un{constructor(e=new Lr,t=new Kg){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,s=Object.keys(t);if(s.length>0){const o=t[s[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,c=o.length;l<c;l++){const d=o[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=l}}}}getVertexPosition(e,t){const s=this.geometry,o=s.attributes.position,l=s.morphAttributes.position,c=s.morphTargetsRelative;t.fromBufferAttribute(o,e);const d=this.morphTargetInfluences;if(l&&d){Dl.set(0,0,0);for(let f=0,h=l.length;f<h;f++){const g=d[f],m=l[f];g!==0&&(hd.fromBufferAttribute(m,e),c?Dl.addScaledVector(hd,g):Dl.addScaledVector(hd.sub(t),g))}t.add(Dl)}return t}raycast(e,t){const s=this.geometry,o=this.material,l=this.matrixWorld;o!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),Pl.copy(s.boundingSphere),Pl.applyMatrix4(l),qr.copy(e.ray).recast(e.near),!(Pl.containsPoint(qr.origin)===!1&&(qr.intersectSphere(Pl,Im)===null||qr.origin.distanceToSquared(Im)>(e.far-e.near)**2))&&(Dm.copy(l).invert(),qr.copy(e.ray).applyMatrix4(Dm),!(s.boundingBox!==null&&qr.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(e,t,qr)))}_computeIntersections(e,t,s){let o;const l=this.geometry,c=this.material,d=l.index,f=l.attributes.position,h=l.attributes.uv,g=l.attributes.uv1,m=l.attributes.normal,_=l.groups,S=l.drawRange;if(d!==null)if(Array.isArray(c))for(let w=0,M=_.length;w<M;w++){const x=_[w],y=c[x.materialIndex],A=Math.max(x.start,S.start),b=Math.min(d.count,Math.min(x.start+x.count,S.start+S.count));for(let L=A,B=b;L<B;L+=3){const U=d.getX(L),I=d.getX(L+1),Q=d.getX(L+2);o=kl(this,y,e,s,h,g,m,U,I,Q),o&&(o.faceIndex=Math.floor(L/3),o.face.materialIndex=x.materialIndex,t.push(o))}}else{const w=Math.max(0,S.start),M=Math.min(d.count,S.start+S.count);for(let x=w,y=M;x<y;x+=3){const A=d.getX(x),b=d.getX(x+1),L=d.getX(x+2);o=kl(this,c,e,s,h,g,m,A,b,L),o&&(o.faceIndex=Math.floor(x/3),t.push(o))}}else if(f!==void 0)if(Array.isArray(c))for(let w=0,M=_.length;w<M;w++){const x=_[w],y=c[x.materialIndex],A=Math.max(x.start,S.start),b=Math.min(f.count,Math.min(x.start+x.count,S.start+S.count));for(let L=A,B=b;L<B;L+=3){const U=L,I=L+1,Q=L+2;o=kl(this,y,e,s,h,g,m,U,I,Q),o&&(o.faceIndex=Math.floor(L/3),o.face.materialIndex=x.materialIndex,t.push(o))}}else{const w=Math.max(0,S.start),M=Math.min(f.count,S.start+S.count);for(let x=w,y=M;x<y;x+=3){const A=x,b=x+1,L=x+2;o=kl(this,c,e,s,h,g,m,A,b,L),o&&(o.faceIndex=Math.floor(x/3),t.push(o))}}}}function qy(r,e,t,s,o,l,c,d){let f;if(e.side===kn?f=s.intersectTriangle(c,l,o,!0,d):f=s.intersectTriangle(o,l,c,e.side===br,d),f===null)return null;Fl.copy(d),Fl.applyMatrix4(r.matrixWorld);const h=t.ray.origin.distanceTo(Fl);return h<t.near||h>t.far?null:{distance:h,point:Fl.clone(),object:r}}function kl(r,e,t,s,o,l,c,d,f,h){r.getVertexPosition(d,Gs),r.getVertexPosition(f,Vs),r.getVertexPosition(h,Ws);const g=qy(r,e,t,s,Gs,Vs,Ws,Ol);if(g){o&&(Il.fromBufferAttribute(o,d),Nl.fromBufferAttribute(o,f),Ul.fromBufferAttribute(o,h),g.uv=vi.getInterpolation(Ol,Gs,Vs,Ws,Il,Nl,Ul,new St)),l&&(Il.fromBufferAttribute(l,d),Nl.fromBufferAttribute(l,f),Ul.fromBufferAttribute(l,h),g.uv1=vi.getInterpolation(Ol,Gs,Vs,Ws,Il,Nl,Ul,new St),g.uv2=g.uv1),c&&(Nm.fromBufferAttribute(c,d),Um.fromBufferAttribute(c,f),Om.fromBufferAttribute(c,h),g.normal=vi.getInterpolation(Ol,Gs,Vs,Ws,Nm,Um,Om,new ue),g.normal.dot(s.direction)>0&&g.normal.multiplyScalar(-1));const m={a:d,b:f,c:h,normal:new ue,materialIndex:0};vi.getNormal(Gs,Vs,Ws,m.normal),g.face=m}return g}class ca extends Lr{constructor(e=1,t=1,s=1,o=1,l=1,c=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:s,widthSegments:o,heightSegments:l,depthSegments:c};const d=this;o=Math.floor(o),l=Math.floor(l),c=Math.floor(c);const f=[],h=[],g=[],m=[];let _=0,S=0;w("z","y","x",-1,-1,s,t,e,c,l,0),w("z","y","x",1,-1,s,t,-e,c,l,1),w("x","z","y",1,1,e,s,t,o,c,2),w("x","z","y",1,-1,e,s,-t,o,c,3),w("x","y","z",1,-1,e,t,s,o,l,4),w("x","y","z",-1,-1,e,t,-s,o,l,5),this.setIndex(f),this.setAttribute("position",new Ai(h,3)),this.setAttribute("normal",new Ai(g,3)),this.setAttribute("uv",new Ai(m,2));function w(M,x,y,A,b,L,B,U,I,Q,E){const C=L/I,$=B/Q,oe=L/2,de=B/2,k=U/2,Y=I+1,J=Q+1;let ae=0,W=0;const q=new ue;for(let z=0;z<J;z++){const D=z*$-de;for(let G=0;G<Y;G++){const X=G*C-oe;q[M]=X*A,q[x]=D*b,q[y]=k,h.push(q.x,q.y,q.z),q[M]=0,q[x]=0,q[y]=U>0?1:-1,g.push(q.x,q.y,q.z),m.push(G/I),m.push(1-z/Q),ae+=1}}for(let z=0;z<Q;z++)for(let D=0;D<I;D++){const G=_+D+Y*z,X=_+D+Y*(z+1),te=_+(D+1)+Y*(z+1),he=_+(D+1)+Y*z;f.push(G,X,he),f.push(X,te,he),W+=6}d.addGroup(S,W,E),S+=W,_+=ae}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ca(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function io(r){const e={};for(const t in r){e[t]={};for(const s in r[t]){const o=r[t][s];o&&(o.isColor||o.isMatrix3||o.isMatrix4||o.isVector2||o.isVector3||o.isVector4||o.isTexture||o.isQuaternion)?o.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][s]=null):e[t][s]=o.clone():Array.isArray(o)?e[t][s]=o.slice():e[t][s]=o}}return e}function Tn(r){const e={};for(let t=0;t<r.length;t++){const s=io(r[t]);for(const o in s)e[o]=s[o]}return e}function $y(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Jg(r){return r.getRenderTarget()===null?r.outputColorSpace:At.workingColorSpace}const Ky={clone:io,merge:Tn};var Zy=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Qy=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class os extends ua{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Zy,this.fragmentShader=Qy,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=io(e.uniforms),this.uniformsGroups=$y(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const o in this.uniforms){const c=this.uniforms[o].value;c&&c.isTexture?t.uniforms[o]={type:"t",value:c.toJSON(e).uuid}:c&&c.isColor?t.uniforms[o]={type:"c",value:c.getHex()}:c&&c.isVector2?t.uniforms[o]={type:"v2",value:c.toArray()}:c&&c.isVector3?t.uniforms[o]={type:"v3",value:c.toArray()}:c&&c.isVector4?t.uniforms[o]={type:"v4",value:c.toArray()}:c&&c.isMatrix3?t.uniforms[o]={type:"m3",value:c.toArray()}:c&&c.isMatrix4?t.uniforms[o]={type:"m4",value:c.toArray()}:t.uniforms[o]={value:c}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const s={};for(const o in this.extensions)this.extensions[o]===!0&&(s[o]=!0);return Object.keys(s).length>0&&(t.extensions=s),t}}class e0 extends un{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Kt,this.projectionMatrix=new Kt,this.projectionMatrixInverse=new Kt,this.coordinateSystem=Yi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class ri extends e0{constructor(e=50,t=1,s=.1,o=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=o,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Dd*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Kc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Dd*2*Math.atan(Math.tan(Kc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,s,o,l,c){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=s,this.view.offsetY=o,this.view.width=l,this.view.height=c,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Kc*.5*this.fov)/this.zoom,s=2*t,o=this.aspect*s,l=-.5*o;const c=this.view;if(this.view!==null&&this.view.enabled){const f=c.fullWidth,h=c.fullHeight;l+=c.offsetX*o/f,t-=c.offsetY*s/h,o*=c.width/f,s*=c.height/h}const d=this.filmOffset;d!==0&&(l+=e*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(l,l+o,t,t-s,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const js=-90,Xs=1;class Jy extends un{constructor(e,t,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const o=new ri(js,Xs,e,t);o.layers=this.layers,this.add(o);const l=new ri(js,Xs,e,t);l.layers=this.layers,this.add(l);const c=new ri(js,Xs,e,t);c.layers=this.layers,this.add(c);const d=new ri(js,Xs,e,t);d.layers=this.layers,this.add(d);const f=new ri(js,Xs,e,t);f.layers=this.layers,this.add(f);const h=new ri(js,Xs,e,t);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[s,o,l,c,d,f]=t;for(const h of t)this.remove(h);if(e===Yi)s.up.set(0,1,0),s.lookAt(1,0,0),o.up.set(0,1,0),o.lookAt(-1,0,0),l.up.set(0,0,-1),l.lookAt(0,1,0),c.up.set(0,0,1),c.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),f.up.set(0,1,0),f.lookAt(0,0,-1);else if(e===$l)s.up.set(0,-1,0),s.lookAt(-1,0,0),o.up.set(0,-1,0),o.lookAt(1,0,0),l.up.set(0,0,1),l.lookAt(0,1,0),c.up.set(0,0,-1),c.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),f.up.set(0,-1,0),f.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const h of t)this.add(h),h.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:o}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[l,c,d,f,h,g]=this.children,m=e.getRenderTarget(),_=e.getActiveCubeFace(),S=e.getActiveMipmapLevel(),w=e.xr.enabled;e.xr.enabled=!1;const M=s.texture.generateMipmaps;s.texture.generateMipmaps=!1,e.setRenderTarget(s,0,o),e.render(t,l),e.setRenderTarget(s,1,o),e.render(t,c),e.setRenderTarget(s,2,o),e.render(t,d),e.setRenderTarget(s,3,o),e.render(t,f),e.setRenderTarget(s,4,o),e.render(t,h),s.texture.generateMipmaps=M,e.setRenderTarget(s,5,o),e.render(t,g),e.setRenderTarget(m,_,S),e.xr.enabled=w,s.texture.needsPMREMUpdate=!0}}class t0 extends Bn{constructor(e,t,s,o,l,c,d,f,h,g){e=e!==void 0?e:[],t=t!==void 0?t:eo,super(e,t,s,o,l,c,d,f,h,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class eS extends ss{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const s={width:e,height:e,depth:1},o=[s,s,s,s,s,s];t.encoding!==void 0&&($o("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===rs?ln:oi),this.texture=new t0(o,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:On}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},o=new ca(5,5,5),l=new os({name:"CubemapFromEquirect",uniforms:io(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:kn,blending:wr});l.uniforms.tEquirect.value=t;const c=new qi(o,l),d=t.minFilter;return t.minFilter===ta&&(t.minFilter=On),new Jy(1,10,this).update(e,c),t.minFilter=d,c.geometry.dispose(),c.material.dispose(),this}clear(e,t,s,o){const l=e.getRenderTarget();for(let c=0;c<6;c++)e.setRenderTarget(this,c),e.clear(t,s,o);e.setRenderTarget(l)}}const pd=new ue,tS=new ue,nS=new ht;class Kr{constructor(e=new ue(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,s,o){return this.normal.set(e,t,s),this.constant=o,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,s){const o=pd.subVectors(s,t).cross(tS.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(o,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const s=e.delta(pd),o=this.normal.dot(s);if(o===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const l=-(e.start.dot(this.normal)+this.constant)/o;return l<0||l>1?null:t.copy(e.start).addScaledVector(s,l)}intersectsLine(e){const t=this.distanceToPoint(e.start),s=this.distanceToPoint(e.end);return t<0&&s>0||s<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const s=t||nS.getNormalMatrix(e),o=this.coplanarPoint(pd).applyMatrix4(e),l=this.normal.applyMatrix3(s).normalize();return this.constant=-o.dot(l),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const $r=new Gd,Bl=new ue;class Vd{constructor(e=new Kr,t=new Kr,s=new Kr,o=new Kr,l=new Kr,c=new Kr){this.planes=[e,t,s,o,l,c]}set(e,t,s,o,l,c){const d=this.planes;return d[0].copy(e),d[1].copy(t),d[2].copy(s),d[3].copy(o),d[4].copy(l),d[5].copy(c),this}copy(e){const t=this.planes;for(let s=0;s<6;s++)t[s].copy(e.planes[s]);return this}setFromProjectionMatrix(e,t=Yi){const s=this.planes,o=e.elements,l=o[0],c=o[1],d=o[2],f=o[3],h=o[4],g=o[5],m=o[6],_=o[7],S=o[8],w=o[9],M=o[10],x=o[11],y=o[12],A=o[13],b=o[14],L=o[15];if(s[0].setComponents(f-l,_-h,x-S,L-y).normalize(),s[1].setComponents(f+l,_+h,x+S,L+y).normalize(),s[2].setComponents(f+c,_+g,x+w,L+A).normalize(),s[3].setComponents(f-c,_-g,x-w,L-A).normalize(),s[4].setComponents(f-d,_-m,x-M,L-b).normalize(),t===Yi)s[5].setComponents(f+d,_+m,x+M,L+b).normalize();else if(t===$l)s[5].setComponents(d,m,M,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),$r.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),$r.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere($r)}intersectsSprite(e){return $r.center.set(0,0,0),$r.radius=.7071067811865476,$r.applyMatrix4(e.matrixWorld),this.intersectsSphere($r)}intersectsSphere(e){const t=this.planes,s=e.center,o=-e.radius;for(let l=0;l<6;l++)if(t[l].distanceToPoint(s)<o)return!1;return!0}intersectsBox(e){const t=this.planes;for(let s=0;s<6;s++){const o=t[s];if(Bl.x=o.normal.x>0?e.max.x:e.min.x,Bl.y=o.normal.y>0?e.max.y:e.min.y,Bl.z=o.normal.z>0?e.max.z:e.min.z,o.distanceToPoint(Bl)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let s=0;s<6;s++)if(t[s].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function n0(){let r=null,e=!1,t=null,s=null;function o(l,c){t(l,c),s=r.requestAnimationFrame(o)}return{start:function(){e!==!0&&t!==null&&(s=r.requestAnimationFrame(o),e=!0)},stop:function(){r.cancelAnimationFrame(s),e=!1},setAnimationLoop:function(l){t=l},setContext:function(l){r=l}}}function iS(r,e){const t=e.isWebGL2,s=new WeakMap;function o(h,g){const m=h.array,_=h.usage,S=m.byteLength,w=r.createBuffer();r.bindBuffer(g,w),r.bufferData(g,m,_),h.onUploadCallback();let M;if(m instanceof Float32Array)M=r.FLOAT;else if(m instanceof Uint16Array)if(h.isFloat16BufferAttribute)if(t)M=r.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else M=r.UNSIGNED_SHORT;else if(m instanceof Int16Array)M=r.SHORT;else if(m instanceof Uint32Array)M=r.UNSIGNED_INT;else if(m instanceof Int32Array)M=r.INT;else if(m instanceof Int8Array)M=r.BYTE;else if(m instanceof Uint8Array)M=r.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)M=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:w,type:M,bytesPerElement:m.BYTES_PER_ELEMENT,version:h.version,size:S}}function l(h,g,m){const _=g.array,S=g._updateRange,w=g.updateRanges;if(r.bindBuffer(m,h),S.count===-1&&w.length===0&&r.bufferSubData(m,0,_),w.length!==0){for(let M=0,x=w.length;M<x;M++){const y=w[M];t?r.bufferSubData(m,y.start*_.BYTES_PER_ELEMENT,_,y.start,y.count):r.bufferSubData(m,y.start*_.BYTES_PER_ELEMENT,_.subarray(y.start,y.start+y.count))}g.clearUpdateRanges()}S.count!==-1&&(t?r.bufferSubData(m,S.offset*_.BYTES_PER_ELEMENT,_,S.offset,S.count):r.bufferSubData(m,S.offset*_.BYTES_PER_ELEMENT,_.subarray(S.offset,S.offset+S.count)),S.count=-1),g.onUploadCallback()}function c(h){return h.isInterleavedBufferAttribute&&(h=h.data),s.get(h)}function d(h){h.isInterleavedBufferAttribute&&(h=h.data);const g=s.get(h);g&&(r.deleteBuffer(g.buffer),s.delete(h))}function f(h,g){if(h.isGLBufferAttribute){const _=s.get(h);(!_||_.version<h.version)&&s.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}h.isInterleavedBufferAttribute&&(h=h.data);const m=s.get(h);if(m===void 0)s.set(h,o(h,g));else if(m.version<h.version){if(m.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");l(m.buffer,h,g),m.version=h.version}}return{get:c,remove:d,update:f}}class Wd extends Lr{constructor(e=1,t=1,s=1,o=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:s,heightSegments:o};const l=e/2,c=t/2,d=Math.floor(s),f=Math.floor(o),h=d+1,g=f+1,m=e/d,_=t/f,S=[],w=[],M=[],x=[];for(let y=0;y<g;y++){const A=y*_-c;for(let b=0;b<h;b++){const L=b*m-l;w.push(L,-A,0),M.push(0,0,1),x.push(b/d),x.push(1-y/f)}}for(let y=0;y<f;y++)for(let A=0;A<d;A++){const b=A+h*y,L=A+h*(y+1),B=A+1+h*(y+1),U=A+1+h*y;S.push(b,L,U),S.push(L,B,U)}this.setIndex(S),this.setAttribute("position",new Ai(w,3)),this.setAttribute("normal",new Ai(M,3)),this.setAttribute("uv",new Ai(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wd(e.width,e.height,e.widthSegments,e.heightSegments)}}var rS=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,sS=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,oS=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,aS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,lS=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,uS=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,cS=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,dS=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,fS=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,hS=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,pS=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,mS=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,gS=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,vS=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,_S=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,xS=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,yS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,SS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,MS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ES=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,TS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,wS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,AS=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,CS=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,bS=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,RS=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,LS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,PS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,DS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,IS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,NS="gl_FragColor = linearToOutputTexel( gl_FragColor );",US=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,OS=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,FS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,kS=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,BS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,zS=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,HS=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,GS=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,VS=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,WS=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,jS=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,XS=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,YS=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qS=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,$S=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,KS=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,ZS=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,QS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,JS=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,eM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,tM=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,nM=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,iM=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,rM=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,sM=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,oM=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,aM=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,lM=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,uM=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,cM=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,dM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,fM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,hM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,pM=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,mM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,gM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,vM=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,_M=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,xM=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,yM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,SM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,MM=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,EM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,TM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,AM=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,CM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,bM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,RM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,LM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,PM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,DM=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,IM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,NM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,UM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,OM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,FM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,kM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,BM=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,zM=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,HM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,GM=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,VM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,WM=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,jM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,XM=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,YM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,qM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$M=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,KM=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ZM=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,QM=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,JM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,eE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,tE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,nE=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const iE=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,rE=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,oE=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,aE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lE=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,cE=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,dE=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,fE=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,hE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,pE=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mE=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,gE=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,_E=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xE=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yE=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,SE=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ME=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,EE=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,TE=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,wE=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,AE=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,CE=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,bE=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,RE=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,LE=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,PE=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,DE=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,IE=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,NE=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,UE=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,OE=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ct={alphahash_fragment:rS,alphahash_pars_fragment:sS,alphamap_fragment:oS,alphamap_pars_fragment:aS,alphatest_fragment:lS,alphatest_pars_fragment:uS,aomap_fragment:cS,aomap_pars_fragment:dS,batching_pars_vertex:fS,batching_vertex:hS,begin_vertex:pS,beginnormal_vertex:mS,bsdfs:gS,iridescence_fragment:vS,bumpmap_pars_fragment:_S,clipping_planes_fragment:xS,clipping_planes_pars_fragment:yS,clipping_planes_pars_vertex:SS,clipping_planes_vertex:MS,color_fragment:ES,color_pars_fragment:TS,color_pars_vertex:wS,color_vertex:AS,common:CS,cube_uv_reflection_fragment:bS,defaultnormal_vertex:RS,displacementmap_pars_vertex:LS,displacementmap_vertex:PS,emissivemap_fragment:DS,emissivemap_pars_fragment:IS,colorspace_fragment:NS,colorspace_pars_fragment:US,envmap_fragment:OS,envmap_common_pars_fragment:FS,envmap_pars_fragment:kS,envmap_pars_vertex:BS,envmap_physical_pars_fragment:ZS,envmap_vertex:zS,fog_vertex:HS,fog_pars_vertex:GS,fog_fragment:VS,fog_pars_fragment:WS,gradientmap_pars_fragment:jS,lightmap_fragment:XS,lightmap_pars_fragment:YS,lights_lambert_fragment:qS,lights_lambert_pars_fragment:$S,lights_pars_begin:KS,lights_toon_fragment:QS,lights_toon_pars_fragment:JS,lights_phong_fragment:eM,lights_phong_pars_fragment:tM,lights_physical_fragment:nM,lights_physical_pars_fragment:iM,lights_fragment_begin:rM,lights_fragment_maps:sM,lights_fragment_end:oM,logdepthbuf_fragment:aM,logdepthbuf_pars_fragment:lM,logdepthbuf_pars_vertex:uM,logdepthbuf_vertex:cM,map_fragment:dM,map_pars_fragment:fM,map_particle_fragment:hM,map_particle_pars_fragment:pM,metalnessmap_fragment:mM,metalnessmap_pars_fragment:gM,morphcolor_vertex:vM,morphnormal_vertex:_M,morphtarget_pars_vertex:xM,morphtarget_vertex:yM,normal_fragment_begin:SM,normal_fragment_maps:MM,normal_pars_fragment:EM,normal_pars_vertex:TM,normal_vertex:wM,normalmap_pars_fragment:AM,clearcoat_normal_fragment_begin:CM,clearcoat_normal_fragment_maps:bM,clearcoat_pars_fragment:RM,iridescence_pars_fragment:LM,opaque_fragment:PM,packing:DM,premultiplied_alpha_fragment:IM,project_vertex:NM,dithering_fragment:UM,dithering_pars_fragment:OM,roughnessmap_fragment:FM,roughnessmap_pars_fragment:kM,shadowmap_pars_fragment:BM,shadowmap_pars_vertex:zM,shadowmap_vertex:HM,shadowmask_pars_fragment:GM,skinbase_vertex:VM,skinning_pars_vertex:WM,skinning_vertex:jM,skinnormal_vertex:XM,specularmap_fragment:YM,specularmap_pars_fragment:qM,tonemapping_fragment:$M,tonemapping_pars_fragment:KM,transmission_fragment:ZM,transmission_pars_fragment:QM,uv_pars_fragment:JM,uv_pars_vertex:eE,uv_vertex:tE,worldpos_vertex:nE,background_vert:iE,background_frag:rE,backgroundCube_vert:sE,backgroundCube_frag:oE,cube_vert:aE,cube_frag:lE,depth_vert:uE,depth_frag:cE,distanceRGBA_vert:dE,distanceRGBA_frag:fE,equirect_vert:hE,equirect_frag:pE,linedashed_vert:mE,linedashed_frag:gE,meshbasic_vert:vE,meshbasic_frag:_E,meshlambert_vert:xE,meshlambert_frag:yE,meshmatcap_vert:SE,meshmatcap_frag:ME,meshnormal_vert:EE,meshnormal_frag:TE,meshphong_vert:wE,meshphong_frag:AE,meshphysical_vert:CE,meshphysical_frag:bE,meshtoon_vert:RE,meshtoon_frag:LE,points_vert:PE,points_frag:DE,shadow_vert:IE,shadow_frag:NE,sprite_vert:UE,sprite_frag:OE},Ce={common:{diffuse:{value:new yt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ht},alphaMap:{value:null},alphaMapTransform:{value:new ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ht}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ht},normalScale:{value:new St(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new yt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new yt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ht},alphaTest:{value:0},uvTransform:{value:new ht}},sprite:{diffuse:{value:new yt(16777215)},opacity:{value:1},center:{value:new St(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ht},alphaMap:{value:null},alphaMapTransform:{value:new ht},alphaTest:{value:0}}},Ti={basic:{uniforms:Tn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.fog]),vertexShader:ct.meshbasic_vert,fragmentShader:ct.meshbasic_frag},lambert:{uniforms:Tn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new yt(0)}}]),vertexShader:ct.meshlambert_vert,fragmentShader:ct.meshlambert_frag},phong:{uniforms:Tn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new yt(0)},specular:{value:new yt(1118481)},shininess:{value:30}}]),vertexShader:ct.meshphong_vert,fragmentShader:ct.meshphong_frag},standard:{uniforms:Tn([Ce.common,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.roughnessmap,Ce.metalnessmap,Ce.fog,Ce.lights,{emissive:{value:new yt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ct.meshphysical_vert,fragmentShader:ct.meshphysical_frag},toon:{uniforms:Tn([Ce.common,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.gradientmap,Ce.fog,Ce.lights,{emissive:{value:new yt(0)}}]),vertexShader:ct.meshtoon_vert,fragmentShader:ct.meshtoon_frag},matcap:{uniforms:Tn([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,{matcap:{value:null}}]),vertexShader:ct.meshmatcap_vert,fragmentShader:ct.meshmatcap_frag},points:{uniforms:Tn([Ce.points,Ce.fog]),vertexShader:ct.points_vert,fragmentShader:ct.points_frag},dashed:{uniforms:Tn([Ce.common,Ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ct.linedashed_vert,fragmentShader:ct.linedashed_frag},depth:{uniforms:Tn([Ce.common,Ce.displacementmap]),vertexShader:ct.depth_vert,fragmentShader:ct.depth_frag},normal:{uniforms:Tn([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,{opacity:{value:1}}]),vertexShader:ct.meshnormal_vert,fragmentShader:ct.meshnormal_frag},sprite:{uniforms:Tn([Ce.sprite,Ce.fog]),vertexShader:ct.sprite_vert,fragmentShader:ct.sprite_frag},background:{uniforms:{uvTransform:{value:new ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ct.background_vert,fragmentShader:ct.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:ct.backgroundCube_vert,fragmentShader:ct.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ct.cube_vert,fragmentShader:ct.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ct.equirect_vert,fragmentShader:ct.equirect_frag},distanceRGBA:{uniforms:Tn([Ce.common,Ce.displacementmap,{referencePosition:{value:new ue},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ct.distanceRGBA_vert,fragmentShader:ct.distanceRGBA_frag},shadow:{uniforms:Tn([Ce.lights,Ce.fog,{color:{value:new yt(0)},opacity:{value:1}}]),vertexShader:ct.shadow_vert,fragmentShader:ct.shadow_frag}};Ti.physical={uniforms:Tn([Ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ht},clearcoatNormalScale:{value:new St(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ht},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ht},sheen:{value:0},sheenColor:{value:new yt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ht},transmissionSamplerSize:{value:new St},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ht},attenuationDistance:{value:0},attenuationColor:{value:new yt(0)},specularColor:{value:new yt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ht},anisotropyVector:{value:new St},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ht}}]),vertexShader:ct.meshphysical_vert,fragmentShader:ct.meshphysical_frag};const zl={r:0,b:0,g:0};function FE(r,e,t,s,o,l,c){const d=new yt(0);let f=l===!0?0:1,h,g,m=null,_=0,S=null;function w(x,y){let A=!1,b=y.isScene===!0?y.background:null;b&&b.isTexture&&(b=(y.backgroundBlurriness>0?t:e).get(b)),b===null?M(d,f):b&&b.isColor&&(M(b,1),A=!0);const L=r.xr.getEnvironmentBlendMode();L==="additive"?s.buffers.color.setClear(0,0,0,1,c):L==="alpha-blend"&&s.buffers.color.setClear(0,0,0,0,c),(r.autoClear||A)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),b&&(b.isCubeTexture||b.mapping===Jl)?(g===void 0&&(g=new qi(new ca(1,1,1),new os({name:"BackgroundCubeMaterial",uniforms:io(Ti.backgroundCube.uniforms),vertexShader:Ti.backgroundCube.vertexShader,fragmentShader:Ti.backgroundCube.fragmentShader,side:kn,depthTest:!1,depthWrite:!1,fog:!1})),g.geometry.deleteAttribute("normal"),g.geometry.deleteAttribute("uv"),g.onBeforeRender=function(B,U,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(g.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),o.update(g)),g.material.uniforms.envMap.value=b,g.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,g.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,g.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,g.material.toneMapped=At.getTransfer(b.colorSpace)!==Dt,(m!==b||_!==b.version||S!==r.toneMapping)&&(g.material.needsUpdate=!0,m=b,_=b.version,S=r.toneMapping),g.layers.enableAll(),x.unshift(g,g.geometry,g.material,0,0,null)):b&&b.isTexture&&(h===void 0&&(h=new qi(new Wd(2,2),new os({name:"BackgroundMaterial",uniforms:io(Ti.background.uniforms),vertexShader:Ti.background.vertexShader,fragmentShader:Ti.background.fragmentShader,side:br,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),o.update(h)),h.material.uniforms.t2D.value=b,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.toneMapped=At.getTransfer(b.colorSpace)!==Dt,b.matrixAutoUpdate===!0&&b.updateMatrix(),h.material.uniforms.uvTransform.value.copy(b.matrix),(m!==b||_!==b.version||S!==r.toneMapping)&&(h.material.needsUpdate=!0,m=b,_=b.version,S=r.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null))}function M(x,y){x.getRGB(zl,Jg(r)),s.buffers.color.setClear(zl.r,zl.g,zl.b,y,c)}return{getClearColor:function(){return d},setClearColor:function(x,y=1){d.set(x),f=y,M(d,f)},getClearAlpha:function(){return f},setClearAlpha:function(x){f=x,M(d,f)},render:w}}function kE(r,e,t,s){const o=r.getParameter(r.MAX_VERTEX_ATTRIBS),l=s.isWebGL2?null:e.get("OES_vertex_array_object"),c=s.isWebGL2||l!==null,d={},f=x(null);let h=f,g=!1;function m(k,Y,J,ae,W){let q=!1;if(c){const z=M(ae,J,Y);h!==z&&(h=z,S(h.object)),q=y(k,ae,J,W),q&&A(k,ae,J,W)}else{const z=Y.wireframe===!0;(h.geometry!==ae.id||h.program!==J.id||h.wireframe!==z)&&(h.geometry=ae.id,h.program=J.id,h.wireframe=z,q=!0)}W!==null&&t.update(W,r.ELEMENT_ARRAY_BUFFER),(q||g)&&(g=!1,Q(k,Y,J,ae),W!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function _(){return s.isWebGL2?r.createVertexArray():l.createVertexArrayOES()}function S(k){return s.isWebGL2?r.bindVertexArray(k):l.bindVertexArrayOES(k)}function w(k){return s.isWebGL2?r.deleteVertexArray(k):l.deleteVertexArrayOES(k)}function M(k,Y,J){const ae=J.wireframe===!0;let W=d[k.id];W===void 0&&(W={},d[k.id]=W);let q=W[Y.id];q===void 0&&(q={},W[Y.id]=q);let z=q[ae];return z===void 0&&(z=x(_()),q[ae]=z),z}function x(k){const Y=[],J=[],ae=[];for(let W=0;W<o;W++)Y[W]=0,J[W]=0,ae[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:Y,enabledAttributes:J,attributeDivisors:ae,object:k,attributes:{},index:null}}function y(k,Y,J,ae){const W=h.attributes,q=Y.attributes;let z=0;const D=J.getAttributes();for(const G in D)if(D[G].location>=0){const te=W[G];let he=q[G];if(he===void 0&&(G==="instanceMatrix"&&k.instanceMatrix&&(he=k.instanceMatrix),G==="instanceColor"&&k.instanceColor&&(he=k.instanceColor)),te===void 0||te.attribute!==he||he&&te.data!==he.data)return!0;z++}return h.attributesNum!==z||h.index!==ae}function A(k,Y,J,ae){const W={},q=Y.attributes;let z=0;const D=J.getAttributes();for(const G in D)if(D[G].location>=0){let te=q[G];te===void 0&&(G==="instanceMatrix"&&k.instanceMatrix&&(te=k.instanceMatrix),G==="instanceColor"&&k.instanceColor&&(te=k.instanceColor));const he={};he.attribute=te,te&&te.data&&(he.data=te.data),W[G]=he,z++}h.attributes=W,h.attributesNum=z,h.index=ae}function b(){const k=h.newAttributes;for(let Y=0,J=k.length;Y<J;Y++)k[Y]=0}function L(k){B(k,0)}function B(k,Y){const J=h.newAttributes,ae=h.enabledAttributes,W=h.attributeDivisors;J[k]=1,ae[k]===0&&(r.enableVertexAttribArray(k),ae[k]=1),W[k]!==Y&&((s.isWebGL2?r:e.get("ANGLE_instanced_arrays"))[s.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](k,Y),W[k]=Y)}function U(){const k=h.newAttributes,Y=h.enabledAttributes;for(let J=0,ae=Y.length;J<ae;J++)Y[J]!==k[J]&&(r.disableVertexAttribArray(J),Y[J]=0)}function I(k,Y,J,ae,W,q,z){z===!0?r.vertexAttribIPointer(k,Y,J,W,q):r.vertexAttribPointer(k,Y,J,ae,W,q)}function Q(k,Y,J,ae){if(s.isWebGL2===!1&&(k.isInstancedMesh||ae.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;b();const W=ae.attributes,q=J.getAttributes(),z=Y.defaultAttributeValues;for(const D in q){const G=q[D];if(G.location>=0){let X=W[D];if(X===void 0&&(D==="instanceMatrix"&&k.instanceMatrix&&(X=k.instanceMatrix),D==="instanceColor"&&k.instanceColor&&(X=k.instanceColor)),X!==void 0){const te=X.normalized,he=X.itemSize,ve=t.get(X);if(ve===void 0)continue;const Me=ve.buffer,we=ve.type,Pe=ve.bytesPerElement,Le=s.isWebGL2===!0&&(we===r.INT||we===r.UNSIGNED_INT||X.gpuType===Ng);if(X.isInterleavedBufferAttribute){const et=X.data,ie=et.stride,kt=X.offset;if(et.isInstancedInterleavedBuffer){for(let We=0;We<G.locationSize;We++)B(G.location+We,et.meshPerAttribute);k.isInstancedMesh!==!0&&ae._maxInstanceCount===void 0&&(ae._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let We=0;We<G.locationSize;We++)L(G.location+We);r.bindBuffer(r.ARRAY_BUFFER,Me);for(let We=0;We<G.locationSize;We++)I(G.location+We,he/G.locationSize,we,te,ie*Pe,(kt+he/G.locationSize*We)*Pe,Le)}else{if(X.isInstancedBufferAttribute){for(let et=0;et<G.locationSize;et++)B(G.location+et,X.meshPerAttribute);k.isInstancedMesh!==!0&&ae._maxInstanceCount===void 0&&(ae._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let et=0;et<G.locationSize;et++)L(G.location+et);r.bindBuffer(r.ARRAY_BUFFER,Me);for(let et=0;et<G.locationSize;et++)I(G.location+et,he/G.locationSize,we,te,he*Pe,he/G.locationSize*et*Pe,Le)}}else if(z!==void 0){const te=z[D];if(te!==void 0)switch(te.length){case 2:r.vertexAttrib2fv(G.location,te);break;case 3:r.vertexAttrib3fv(G.location,te);break;case 4:r.vertexAttrib4fv(G.location,te);break;default:r.vertexAttrib1fv(G.location,te)}}}}U()}function E(){oe();for(const k in d){const Y=d[k];for(const J in Y){const ae=Y[J];for(const W in ae)w(ae[W].object),delete ae[W];delete Y[J]}delete d[k]}}function C(k){if(d[k.id]===void 0)return;const Y=d[k.id];for(const J in Y){const ae=Y[J];for(const W in ae)w(ae[W].object),delete ae[W];delete Y[J]}delete d[k.id]}function $(k){for(const Y in d){const J=d[Y];if(J[k.id]===void 0)continue;const ae=J[k.id];for(const W in ae)w(ae[W].object),delete ae[W];delete J[k.id]}}function oe(){de(),g=!0,h!==f&&(h=f,S(h.object))}function de(){f.geometry=null,f.program=null,f.wireframe=!1}return{setup:m,reset:oe,resetDefaultState:de,dispose:E,releaseStatesOfGeometry:C,releaseStatesOfProgram:$,initAttributes:b,enableAttribute:L,disableUnusedAttributes:U}}function BE(r,e,t,s){const o=s.isWebGL2;let l;function c(g){l=g}function d(g,m){r.drawArrays(l,g,m),t.update(m,l,1)}function f(g,m,_){if(_===0)return;let S,w;if(o)S=r,w="drawArraysInstanced";else if(S=e.get("ANGLE_instanced_arrays"),w="drawArraysInstancedANGLE",S===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}S[w](l,g,m,_),t.update(m,l,_)}function h(g,m,_){if(_===0)return;const S=e.get("WEBGL_multi_draw");if(S===null)for(let w=0;w<_;w++)this.render(g[w],m[w]);else{S.multiDrawArraysWEBGL(l,g,0,m,0,_);let w=0;for(let M=0;M<_;M++)w+=m[M];t.update(w,l,1)}}this.setMode=c,this.render=d,this.renderInstances=f,this.renderMultiDraw=h}function zE(r,e,t){let s;function o(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const I=e.get("EXT_texture_filter_anisotropic");s=r.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function l(I){if(I==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const c=typeof WebGL2RenderingContext<"u"&&r.constructor.name==="WebGL2RenderingContext";let d=t.precision!==void 0?t.precision:"highp";const f=l(d);f!==d&&(console.warn("THREE.WebGLRenderer:",d,"not supported, using",f,"instead."),d=f);const h=c||e.has("WEBGL_draw_buffers"),g=t.logarithmicDepthBuffer===!0,m=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=r.getParameter(r.MAX_TEXTURE_SIZE),w=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),M=r.getParameter(r.MAX_VERTEX_ATTRIBS),x=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),y=r.getParameter(r.MAX_VARYING_VECTORS),A=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),b=_>0,L=c||e.has("OES_texture_float"),B=b&&L,U=c?r.getParameter(r.MAX_SAMPLES):0;return{isWebGL2:c,drawBuffers:h,getMaxAnisotropy:o,getMaxPrecision:l,precision:d,logarithmicDepthBuffer:g,maxTextures:m,maxVertexTextures:_,maxTextureSize:S,maxCubemapSize:w,maxAttributes:M,maxVertexUniforms:x,maxVaryings:y,maxFragmentUniforms:A,vertexTextures:b,floatFragmentTextures:L,floatVertexTextures:B,maxSamples:U}}function HE(r){const e=this;let t=null,s=0,o=!1,l=!1;const c=new Kr,d=new ht,f={value:null,needsUpdate:!1};this.uniform=f,this.numPlanes=0,this.numIntersection=0,this.init=function(m,_){const S=m.length!==0||_||s!==0||o;return o=_,s=m.length,S},this.beginShadows=function(){l=!0,g(null)},this.endShadows=function(){l=!1},this.setGlobalState=function(m,_){t=g(m,_,0)},this.setState=function(m,_,S){const w=m.clippingPlanes,M=m.clipIntersection,x=m.clipShadows,y=r.get(m);if(!o||w===null||w.length===0||l&&!x)l?g(null):h();else{const A=l?0:s,b=A*4;let L=y.clippingState||null;f.value=L,L=g(w,_,b,S);for(let B=0;B!==b;++B)L[B]=t[B];y.clippingState=L,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=A}};function h(){f.value!==t&&(f.value=t,f.needsUpdate=s>0),e.numPlanes=s,e.numIntersection=0}function g(m,_,S,w){const M=m!==null?m.length:0;let x=null;if(M!==0){if(x=f.value,w!==!0||x===null){const y=S+M*4,A=_.matrixWorldInverse;d.getNormalMatrix(A),(x===null||x.length<y)&&(x=new Float32Array(y));for(let b=0,L=S;b!==M;++b,L+=4)c.copy(m[b]).applyMatrix4(A,d),c.normal.toArray(x,L),x[L+3]=c.constant}f.value=x,f.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,x}}function GE(r){let e=new WeakMap;function t(c,d){return d===bd?c.mapping=eo:d===Rd&&(c.mapping=to),c}function s(c){if(c&&c.isTexture){const d=c.mapping;if(d===bd||d===Rd)if(e.has(c)){const f=e.get(c).texture;return t(f,c.mapping)}else{const f=c.image;if(f&&f.height>0){const h=new eS(f.height/2);return h.fromEquirectangularTexture(r,c),e.set(c,h),c.addEventListener("dispose",o),t(h.texture,c.mapping)}else return null}}return c}function o(c){const d=c.target;d.removeEventListener("dispose",o);const f=e.get(d);f!==void 0&&(e.delete(d),f.dispose())}function l(){e=new WeakMap}return{get:s,dispose:l}}class i0 extends e0{constructor(e=-1,t=1,s=1,o=-1,l=.1,c=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=s,this.bottom=o,this.near=l,this.far=c,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,s,o,l,c){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=s,this.view.offsetY=o,this.view.width=l,this.view.height=c,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,o=(this.top+this.bottom)/2;let l=s-e,c=s+e,d=o+t,f=o-t;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;l+=h*this.view.offsetX,c=l+h*this.view.width,d-=g*this.view.offsetY,f=d-g*this.view.height}this.projectionMatrix.makeOrthographic(l,c,d,f,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const $s=4,Fm=[.125,.215,.35,.446,.526,.582],Jr=20,md=new i0,km=new yt;let gd=null,vd=0,_d=0;const Zr=(1+Math.sqrt(5))/2,Ys=1/Zr,Bm=[new ue(1,1,1),new ue(-1,1,1),new ue(1,1,-1),new ue(-1,1,-1),new ue(0,Zr,Ys),new ue(0,Zr,-Ys),new ue(Ys,0,Zr),new ue(-Ys,0,Zr),new ue(Zr,Ys,0),new ue(-Zr,Ys,0)];class zm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,s=.1,o=100){gd=this._renderer.getRenderTarget(),vd=this._renderer.getActiveCubeFace(),_d=this._renderer.getActiveMipmapLevel(),this._setSize(256);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,s,o,l),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Gm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(gd,vd,_d),e.scissorTest=!1,Hl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===eo||e.mapping===to?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),gd=this._renderer.getRenderTarget(),vd=this._renderer.getActiveCubeFace(),_d=this._renderer.getActiveMipmapLevel();const s=t||this._allocateTargets();return this._textureToCubeUV(e,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,s={magFilter:On,minFilter:On,generateMipmaps:!1,type:na,format:_i,colorSpace:$i,depthBuffer:!1},o=Hm(e,t,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Hm(e,t,s);const{_lodMax:l}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=VE(l)),this._blurMaterial=WE(l,e,t)}return o}_compileMaterial(e){const t=new qi(this._lodPlanes[0],e);this._renderer.compile(t,md)}_sceneToCubeUV(e,t,s,o){const d=new ri(90,1,t,s),f=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],g=this._renderer,m=g.autoClear,_=g.toneMapping;g.getClearColor(km),g.toneMapping=Ar,g.autoClear=!1;const S=new Kg({name:"PMREM.Background",side:kn,depthWrite:!1,depthTest:!1}),w=new qi(new ca,S);let M=!1;const x=e.background;x?x.isColor&&(S.color.copy(x),e.background=null,M=!0):(S.color.copy(km),M=!0);for(let y=0;y<6;y++){const A=y%3;A===0?(d.up.set(0,f[y],0),d.lookAt(h[y],0,0)):A===1?(d.up.set(0,0,f[y]),d.lookAt(0,h[y],0)):(d.up.set(0,f[y],0),d.lookAt(0,0,h[y]));const b=this._cubeSize;Hl(o,A*b,y>2?b:0,b,b),g.setRenderTarget(o),M&&g.render(w,d),g.render(e,d)}w.geometry.dispose(),w.material.dispose(),g.toneMapping=_,g.autoClear=m,e.background=x}_textureToCubeUV(e,t){const s=this._renderer,o=e.mapping===eo||e.mapping===to;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Gm());const l=o?this._cubemapMaterial:this._equirectMaterial,c=new qi(this._lodPlanes[0],l),d=l.uniforms;d.envMap.value=e;const f=this._cubeSize;Hl(t,0,0,3*f,2*f),s.setRenderTarget(t),s.render(c,md)}_applyPMREM(e){const t=this._renderer,s=t.autoClear;t.autoClear=!1;for(let o=1;o<this._lodPlanes.length;o++){const l=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),c=Bm[(o-1)%Bm.length];this._blur(e,o-1,o,l,c)}t.autoClear=s}_blur(e,t,s,o,l){const c=this._pingPongRenderTarget;this._halfBlur(e,c,t,s,o,"latitudinal",l),this._halfBlur(c,e,s,s,o,"longitudinal",l)}_halfBlur(e,t,s,o,l,c,d){const f=this._renderer,h=this._blurMaterial;c!=="latitudinal"&&c!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const g=3,m=new qi(this._lodPlanes[o],h),_=h.uniforms,S=this._sizeLods[s]-1,w=isFinite(l)?Math.PI/(2*S):2*Math.PI/(2*Jr-1),M=l/w,x=isFinite(l)?1+Math.floor(g*M):Jr;x>Jr&&console.warn(`sigmaRadians, ${l}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${Jr}`);const y=[];let A=0;for(let I=0;I<Jr;++I){const Q=I/M,E=Math.exp(-Q*Q/2);y.push(E),I===0?A+=E:I<x&&(A+=2*E)}for(let I=0;I<y.length;I++)y[I]=y[I]/A;_.envMap.value=e.texture,_.samples.value=x,_.weights.value=y,_.latitudinal.value=c==="latitudinal",d&&(_.poleAxis.value=d);const{_lodMax:b}=this;_.dTheta.value=w,_.mipInt.value=b-s;const L=this._sizeLods[o],B=3*L*(o>b-$s?o-b+$s:0),U=4*(this._cubeSize-L);Hl(t,B,U,3*L,2*L),f.setRenderTarget(t),f.render(m,md)}}function VE(r){const e=[],t=[],s=[];let o=r;const l=r-$s+1+Fm.length;for(let c=0;c<l;c++){const d=Math.pow(2,o);t.push(d);let f=1/d;c>r-$s?f=Fm[c-r+$s-1]:c===0&&(f=0),s.push(f);const h=1/(d-2),g=-h,m=1+h,_=[g,g,m,g,m,m,g,g,m,m,g,m],S=6,w=6,M=3,x=2,y=1,A=new Float32Array(M*w*S),b=new Float32Array(x*w*S),L=new Float32Array(y*w*S);for(let U=0;U<S;U++){const I=U%3*2/3-1,Q=U>2?0:-1,E=[I,Q,0,I+2/3,Q,0,I+2/3,Q+1,0,I,Q,0,I+2/3,Q+1,0,I,Q+1,0];A.set(E,M*w*U),b.set(_,x*w*U);const C=[U,U,U,U,U,U];L.set(C,y*w*U)}const B=new Lr;B.setAttribute("position",new wi(A,M)),B.setAttribute("uv",new wi(b,x)),B.setAttribute("faceIndex",new wi(L,y)),e.push(B),o>$s&&o--}return{lodPlanes:e,sizeLods:t,sigmas:s}}function Hm(r,e,t){const s=new ss(r,e,t);return s.texture.mapping=Jl,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function Hl(r,e,t,s,o){r.viewport.set(e,t,s,o),r.scissor.set(e,t,s,o)}function WE(r,e,t){const s=new Float32Array(Jr),o=new ue(0,1,0);return new os({name:"SphericalGaussianBlur",defines:{n:Jr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:o}},vertexShader:jd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:wr,depthTest:!1,depthWrite:!1})}function Gm(){return new os({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:jd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:wr,depthTest:!1,depthWrite:!1})}function Vm(){return new os({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:jd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wr,depthTest:!1,depthWrite:!1})}function jd(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function jE(r){let e=new WeakMap,t=null;function s(d){if(d&&d.isTexture){const f=d.mapping,h=f===bd||f===Rd,g=f===eo||f===to;if(h||g)if(d.isRenderTargetTexture&&d.needsPMREMUpdate===!0){d.needsPMREMUpdate=!1;let m=e.get(d);return t===null&&(t=new zm(r)),m=h?t.fromEquirectangular(d,m):t.fromCubemap(d,m),e.set(d,m),m.texture}else{if(e.has(d))return e.get(d).texture;{const m=d.image;if(h&&m&&m.height>0||g&&m&&o(m)){t===null&&(t=new zm(r));const _=h?t.fromEquirectangular(d):t.fromCubemap(d);return e.set(d,_),d.addEventListener("dispose",l),_.texture}else return null}}}return d}function o(d){let f=0;const h=6;for(let g=0;g<h;g++)d[g]!==void 0&&f++;return f===h}function l(d){const f=d.target;f.removeEventListener("dispose",l);const h=e.get(f);h!==void 0&&(e.delete(f),h.dispose())}function c(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:s,dispose:c}}function XE(r){const e={};function t(s){if(e[s]!==void 0)return e[s];let o;switch(s){case"WEBGL_depth_texture":o=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":o=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":o=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":o=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:o=r.getExtension(s)}return e[s]=o,o}return{has:function(s){return t(s)!==null},init:function(s){s.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(s){const o=t(s);return o===null&&console.warn("THREE.WebGLRenderer: "+s+" extension not supported."),o}}}function YE(r,e,t,s){const o={},l=new WeakMap;function c(m){const _=m.target;_.index!==null&&e.remove(_.index);for(const w in _.attributes)e.remove(_.attributes[w]);for(const w in _.morphAttributes){const M=_.morphAttributes[w];for(let x=0,y=M.length;x<y;x++)e.remove(M[x])}_.removeEventListener("dispose",c),delete o[_.id];const S=l.get(_);S&&(e.remove(S),l.delete(_)),s.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,t.memory.geometries--}function d(m,_){return o[_.id]===!0||(_.addEventListener("dispose",c),o[_.id]=!0,t.memory.geometries++),_}function f(m){const _=m.attributes;for(const w in _)e.update(_[w],r.ARRAY_BUFFER);const S=m.morphAttributes;for(const w in S){const M=S[w];for(let x=0,y=M.length;x<y;x++)e.update(M[x],r.ARRAY_BUFFER)}}function h(m){const _=[],S=m.index,w=m.attributes.position;let M=0;if(S!==null){const A=S.array;M=S.version;for(let b=0,L=A.length;b<L;b+=3){const B=A[b+0],U=A[b+1],I=A[b+2];_.push(B,U,U,I,I,B)}}else if(w!==void 0){const A=w.array;M=w.version;for(let b=0,L=A.length/3-1;b<L;b+=3){const B=b+0,U=b+1,I=b+2;_.push(B,U,U,I,I,B)}}else return;const x=new(Wg(_)?Qg:Zg)(_,1);x.version=M;const y=l.get(m);y&&e.remove(y),l.set(m,x)}function g(m){const _=l.get(m);if(_){const S=m.index;S!==null&&_.version<S.version&&h(m)}else h(m);return l.get(m)}return{get:d,update:f,getWireframeAttribute:g}}function qE(r,e,t,s){const o=s.isWebGL2;let l;function c(S){l=S}let d,f;function h(S){d=S.type,f=S.bytesPerElement}function g(S,w){r.drawElements(l,w,d,S*f),t.update(w,l,1)}function m(S,w,M){if(M===0)return;let x,y;if(o)x=r,y="drawElementsInstanced";else if(x=e.get("ANGLE_instanced_arrays"),y="drawElementsInstancedANGLE",x===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}x[y](l,w,d,S*f,M),t.update(w,l,M)}function _(S,w,M){if(M===0)return;const x=e.get("WEBGL_multi_draw");if(x===null)for(let y=0;y<M;y++)this.render(S[y]/f,w[y]);else{x.multiDrawElementsWEBGL(l,w,0,d,S,0,M);let y=0;for(let A=0;A<M;A++)y+=w[A];t.update(y,l,1)}}this.setMode=c,this.setIndex=h,this.render=g,this.renderInstances=m,this.renderMultiDraw=_}function $E(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function s(l,c,d){switch(t.calls++,c){case r.TRIANGLES:t.triangles+=d*(l/3);break;case r.LINES:t.lines+=d*(l/2);break;case r.LINE_STRIP:t.lines+=d*(l-1);break;case r.LINE_LOOP:t.lines+=d*l;break;case r.POINTS:t.points+=d*l;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",c);break}}function o(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:o,update:s}}function KE(r,e){return r[0]-e[0]}function ZE(r,e){return Math.abs(e[1])-Math.abs(r[1])}function QE(r,e,t){const s={},o=new Float32Array(8),l=new WeakMap,c=new sn,d=[];for(let h=0;h<8;h++)d[h]=[h,0];function f(h,g,m){const _=h.morphTargetInfluences;if(e.isWebGL2===!0){const w=g.morphAttributes.position||g.morphAttributes.normal||g.morphAttributes.color,M=w!==void 0?w.length:0;let x=l.get(g);if(x===void 0||x.count!==M){let Y=function(){de.dispose(),l.delete(g),g.removeEventListener("dispose",Y)};var S=Y;x!==void 0&&x.texture.dispose();const b=g.morphAttributes.position!==void 0,L=g.morphAttributes.normal!==void 0,B=g.morphAttributes.color!==void 0,U=g.morphAttributes.position||[],I=g.morphAttributes.normal||[],Q=g.morphAttributes.color||[];let E=0;b===!0&&(E=1),L===!0&&(E=2),B===!0&&(E=3);let C=g.attributes.position.count*E,$=1;C>e.maxTextureSize&&($=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);const oe=new Float32Array(C*$*4*M),de=new Yg(oe,C,$,M);de.type=Tr,de.needsUpdate=!0;const k=E*4;for(let J=0;J<M;J++){const ae=U[J],W=I[J],q=Q[J],z=C*$*4*J;for(let D=0;D<ae.count;D++){const G=D*k;b===!0&&(c.fromBufferAttribute(ae,D),oe[z+G+0]=c.x,oe[z+G+1]=c.y,oe[z+G+2]=c.z,oe[z+G+3]=0),L===!0&&(c.fromBufferAttribute(W,D),oe[z+G+4]=c.x,oe[z+G+5]=c.y,oe[z+G+6]=c.z,oe[z+G+7]=0),B===!0&&(c.fromBufferAttribute(q,D),oe[z+G+8]=c.x,oe[z+G+9]=c.y,oe[z+G+10]=c.z,oe[z+G+11]=q.itemSize===4?c.w:1)}}x={count:M,texture:de,size:new St(C,$)},l.set(g,x),g.addEventListener("dispose",Y)}let y=0;for(let b=0;b<_.length;b++)y+=_[b];const A=g.morphTargetsRelative?1:1-y;m.getUniforms().setValue(r,"morphTargetBaseInfluence",A),m.getUniforms().setValue(r,"morphTargetInfluences",_),m.getUniforms().setValue(r,"morphTargetsTexture",x.texture,t),m.getUniforms().setValue(r,"morphTargetsTextureSize",x.size)}else{const w=_===void 0?0:_.length;let M=s[g.id];if(M===void 0||M.length!==w){M=[];for(let L=0;L<w;L++)M[L]=[L,0];s[g.id]=M}for(let L=0;L<w;L++){const B=M[L];B[0]=L,B[1]=_[L]}M.sort(ZE);for(let L=0;L<8;L++)L<w&&M[L][1]?(d[L][0]=M[L][0],d[L][1]=M[L][1]):(d[L][0]=Number.MAX_SAFE_INTEGER,d[L][1]=0);d.sort(KE);const x=g.morphAttributes.position,y=g.morphAttributes.normal;let A=0;for(let L=0;L<8;L++){const B=d[L],U=B[0],I=B[1];U!==Number.MAX_SAFE_INTEGER&&I?(x&&g.getAttribute("morphTarget"+L)!==x[U]&&g.setAttribute("morphTarget"+L,x[U]),y&&g.getAttribute("morphNormal"+L)!==y[U]&&g.setAttribute("morphNormal"+L,y[U]),o[L]=I,A+=I):(x&&g.hasAttribute("morphTarget"+L)===!0&&g.deleteAttribute("morphTarget"+L),y&&g.hasAttribute("morphNormal"+L)===!0&&g.deleteAttribute("morphNormal"+L),o[L]=0)}const b=g.morphTargetsRelative?1:1-A;m.getUniforms().setValue(r,"morphTargetBaseInfluence",b),m.getUniforms().setValue(r,"morphTargetInfluences",o)}}return{update:f}}function JE(r,e,t,s){let o=new WeakMap;function l(f){const h=s.render.frame,g=f.geometry,m=e.get(f,g);if(o.get(m)!==h&&(e.update(m),o.set(m,h)),f.isInstancedMesh&&(f.hasEventListener("dispose",d)===!1&&f.addEventListener("dispose",d),o.get(f)!==h&&(t.update(f.instanceMatrix,r.ARRAY_BUFFER),f.instanceColor!==null&&t.update(f.instanceColor,r.ARRAY_BUFFER),o.set(f,h))),f.isSkinnedMesh){const _=f.skeleton;o.get(_)!==h&&(_.update(),o.set(_,h))}return m}function c(){o=new WeakMap}function d(f){const h=f.target;h.removeEventListener("dispose",d),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:l,dispose:c}}class r0 extends Bn{constructor(e,t,s,o,l,c,d,f,h,g){if(g=g!==void 0?g:is,g!==is&&g!==no)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");s===void 0&&g===is&&(s=Er),s===void 0&&g===no&&(s=ns),super(null,o,l,c,d,f,g,s,h),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=d!==void 0?d:wn,this.minFilter=f!==void 0?f:wn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const s0=new Bn,o0=new r0(1,1);o0.compareFunction=Vg;const a0=new Yg,l0=new Oy,u0=new t0,Wm=[],jm=[],Xm=new Float32Array(16),Ym=new Float32Array(9),qm=new Float32Array(4);function ao(r,e,t){const s=r[0];if(s<=0||s>0)return r;const o=e*t;let l=Wm[o];if(l===void 0&&(l=new Float32Array(o),Wm[o]=l),e!==0){s.toArray(l,0);for(let c=1,d=0;c!==e;++c)d+=t,r[c].toArray(l,d)}return l}function Zt(r,e){if(r.length!==e.length)return!1;for(let t=0,s=r.length;t<s;t++)if(r[t]!==e[t])return!1;return!0}function Qt(r,e){for(let t=0,s=e.length;t<s;t++)r[t]=e[t]}function nu(r,e){let t=jm[e];t===void 0&&(t=new Int32Array(e),jm[e]=t);for(let s=0;s!==e;++s)t[s]=r.allocateTextureUnit();return t}function e1(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function t1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Zt(t,e))return;r.uniform2fv(this.addr,e),Qt(t,e)}}function n1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Zt(t,e))return;r.uniform3fv(this.addr,e),Qt(t,e)}}function i1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Zt(t,e))return;r.uniform4fv(this.addr,e),Qt(t,e)}}function r1(r,e){const t=this.cache,s=e.elements;if(s===void 0){if(Zt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Qt(t,e)}else{if(Zt(t,s))return;qm.set(s),r.uniformMatrix2fv(this.addr,!1,qm),Qt(t,s)}}function s1(r,e){const t=this.cache,s=e.elements;if(s===void 0){if(Zt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Qt(t,e)}else{if(Zt(t,s))return;Ym.set(s),r.uniformMatrix3fv(this.addr,!1,Ym),Qt(t,s)}}function o1(r,e){const t=this.cache,s=e.elements;if(s===void 0){if(Zt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Qt(t,e)}else{if(Zt(t,s))return;Xm.set(s),r.uniformMatrix4fv(this.addr,!1,Xm),Qt(t,s)}}function a1(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function l1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Zt(t,e))return;r.uniform2iv(this.addr,e),Qt(t,e)}}function u1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Zt(t,e))return;r.uniform3iv(this.addr,e),Qt(t,e)}}function c1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Zt(t,e))return;r.uniform4iv(this.addr,e),Qt(t,e)}}function d1(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function f1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Zt(t,e))return;r.uniform2uiv(this.addr,e),Qt(t,e)}}function h1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Zt(t,e))return;r.uniform3uiv(this.addr,e),Qt(t,e)}}function p1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Zt(t,e))return;r.uniform4uiv(this.addr,e),Qt(t,e)}}function m1(r,e,t){const s=this.cache,o=t.allocateTextureUnit();s[0]!==o&&(r.uniform1i(this.addr,o),s[0]=o);const l=this.type===r.SAMPLER_2D_SHADOW?o0:s0;t.setTexture2D(e||l,o)}function g1(r,e,t){const s=this.cache,o=t.allocateTextureUnit();s[0]!==o&&(r.uniform1i(this.addr,o),s[0]=o),t.setTexture3D(e||l0,o)}function v1(r,e,t){const s=this.cache,o=t.allocateTextureUnit();s[0]!==o&&(r.uniform1i(this.addr,o),s[0]=o),t.setTextureCube(e||u0,o)}function _1(r,e,t){const s=this.cache,o=t.allocateTextureUnit();s[0]!==o&&(r.uniform1i(this.addr,o),s[0]=o),t.setTexture2DArray(e||a0,o)}function x1(r){switch(r){case 5126:return e1;case 35664:return t1;case 35665:return n1;case 35666:return i1;case 35674:return r1;case 35675:return s1;case 35676:return o1;case 5124:case 35670:return a1;case 35667:case 35671:return l1;case 35668:case 35672:return u1;case 35669:case 35673:return c1;case 5125:return d1;case 36294:return f1;case 36295:return h1;case 36296:return p1;case 35678:case 36198:case 36298:case 36306:case 35682:return m1;case 35679:case 36299:case 36307:return g1;case 35680:case 36300:case 36308:case 36293:return v1;case 36289:case 36303:case 36311:case 36292:return _1}}function y1(r,e){r.uniform1fv(this.addr,e)}function S1(r,e){const t=ao(e,this.size,2);r.uniform2fv(this.addr,t)}function M1(r,e){const t=ao(e,this.size,3);r.uniform3fv(this.addr,t)}function E1(r,e){const t=ao(e,this.size,4);r.uniform4fv(this.addr,t)}function T1(r,e){const t=ao(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function w1(r,e){const t=ao(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function A1(r,e){const t=ao(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function C1(r,e){r.uniform1iv(this.addr,e)}function b1(r,e){r.uniform2iv(this.addr,e)}function R1(r,e){r.uniform3iv(this.addr,e)}function L1(r,e){r.uniform4iv(this.addr,e)}function P1(r,e){r.uniform1uiv(this.addr,e)}function D1(r,e){r.uniform2uiv(this.addr,e)}function I1(r,e){r.uniform3uiv(this.addr,e)}function N1(r,e){r.uniform4uiv(this.addr,e)}function U1(r,e,t){const s=this.cache,o=e.length,l=nu(t,o);Zt(s,l)||(r.uniform1iv(this.addr,l),Qt(s,l));for(let c=0;c!==o;++c)t.setTexture2D(e[c]||s0,l[c])}function O1(r,e,t){const s=this.cache,o=e.length,l=nu(t,o);Zt(s,l)||(r.uniform1iv(this.addr,l),Qt(s,l));for(let c=0;c!==o;++c)t.setTexture3D(e[c]||l0,l[c])}function F1(r,e,t){const s=this.cache,o=e.length,l=nu(t,o);Zt(s,l)||(r.uniform1iv(this.addr,l),Qt(s,l));for(let c=0;c!==o;++c)t.setTextureCube(e[c]||u0,l[c])}function k1(r,e,t){const s=this.cache,o=e.length,l=nu(t,o);Zt(s,l)||(r.uniform1iv(this.addr,l),Qt(s,l));for(let c=0;c!==o;++c)t.setTexture2DArray(e[c]||a0,l[c])}function B1(r){switch(r){case 5126:return y1;case 35664:return S1;case 35665:return M1;case 35666:return E1;case 35674:return T1;case 35675:return w1;case 35676:return A1;case 5124:case 35670:return C1;case 35667:case 35671:return b1;case 35668:case 35672:return R1;case 35669:case 35673:return L1;case 5125:return P1;case 36294:return D1;case 36295:return I1;case 36296:return N1;case 35678:case 36198:case 36298:case 36306:case 35682:return U1;case 35679:case 36299:case 36307:return O1;case 35680:case 36300:case 36308:case 36293:return F1;case 36289:case 36303:case 36311:case 36292:return k1}}class z1{constructor(e,t,s){this.id=e,this.addr=s,this.cache=[],this.type=t.type,this.setValue=x1(t.type)}}class H1{constructor(e,t,s){this.id=e,this.addr=s,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=B1(t.type)}}class G1{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,s){const o=this.seq;for(let l=0,c=o.length;l!==c;++l){const d=o[l];d.setValue(e,t[d.id],s)}}}const xd=/(\w+)(\])?(\[|\.)?/g;function $m(r,e){r.seq.push(e),r.map[e.id]=e}function V1(r,e,t){const s=r.name,o=s.length;for(xd.lastIndex=0;;){const l=xd.exec(s),c=xd.lastIndex;let d=l[1];const f=l[2]==="]",h=l[3];if(f&&(d=d|0),h===void 0||h==="["&&c+2===o){$m(t,h===void 0?new z1(d,r,e):new H1(d,r,e));break}else{let m=t.map[d];m===void 0&&(m=new G1(d),$m(t,m)),t=m}}}class Vl{constructor(e,t){this.seq=[],this.map={};const s=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<s;++o){const l=e.getActiveUniform(t,o),c=e.getUniformLocation(t,l.name);V1(l,c,this)}}setValue(e,t,s,o){const l=this.map[t];l!==void 0&&l.setValue(e,s,o)}setOptional(e,t,s){const o=t[s];o!==void 0&&this.setValue(e,s,o)}static upload(e,t,s,o){for(let l=0,c=t.length;l!==c;++l){const d=t[l],f=s[d.id];f.needsUpdate!==!1&&d.setValue(e,f.value,o)}}static seqWithValue(e,t){const s=[];for(let o=0,l=e.length;o!==l;++o){const c=e[o];c.id in t&&s.push(c)}return s}}function Km(r,e,t){const s=r.createShader(e);return r.shaderSource(s,t),r.compileShader(s),s}const W1=37297;let j1=0;function X1(r,e){const t=r.split(`
`),s=[],o=Math.max(e-6,0),l=Math.min(e+6,t.length);for(let c=o;c<l;c++){const d=c+1;s.push(`${d===e?">":" "} ${d}: ${t[c]}`)}return s.join(`
`)}function Y1(r){const e=At.getPrimaries(At.workingColorSpace),t=At.getPrimaries(r);let s;switch(e===t?s="":e===ql&&t===Yl?s="LinearDisplayP3ToLinearSRGB":e===Yl&&t===ql&&(s="LinearSRGBToLinearDisplayP3"),r){case $i:case eu:return[s,"LinearTransferOETF"];case ln:case Hd:return[s,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[s,"LinearTransferOETF"]}}function Zm(r,e,t){const s=r.getShaderParameter(e,r.COMPILE_STATUS),o=r.getShaderInfoLog(e).trim();if(s&&o==="")return"";const l=/ERROR: 0:(\d+)/.exec(o);if(l){const c=parseInt(l[1]);return t.toUpperCase()+`

`+o+`

`+X1(r.getShaderSource(e),c)}else return o}function q1(r,e){const t=Y1(e);return`vec4 ${r}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function $1(r,e){let t;switch(e){case sy:t="Linear";break;case oy:t="Reinhard";break;case ay:t="OptimizedCineon";break;case ly:t="ACESFilmic";break;case cy:t="AgX";break;case uy:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function K1(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.normalMapTangentSpace||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ks).join(`
`)}function Z1(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ks).join(`
`)}function Q1(r){const e=[];for(const t in r){const s=r[t];s!==!1&&e.push("#define "+t+" "+s)}return e.join(`
`)}function J1(r,e){const t={},s=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let o=0;o<s;o++){const l=r.getActiveAttrib(e,o),c=l.name;let d=1;l.type===r.FLOAT_MAT2&&(d=2),l.type===r.FLOAT_MAT3&&(d=3),l.type===r.FLOAT_MAT4&&(d=4),t[c]={type:l.type,location:r.getAttribLocation(e,c),locationSize:d}}return t}function Ks(r){return r!==""}function Qm(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Jm(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const eT=/^[ \t]*#include +<([\w\d./]+)>/gm;function Nd(r){return r.replace(eT,nT)}const tT=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function nT(r,e){let t=ct[e];if(t===void 0){const s=tT.get(e);if(s!==void 0)t=ct[s],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,s);else throw new Error("Can not resolve #include <"+e+">")}return Nd(t)}const iT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function eg(r){return r.replace(iT,rT)}function rT(r,e,t,s){let o="";for(let l=parseInt(e);l<parseInt(t);l++)o+=s.replace(/\[\s*i\s*\]/g,"[ "+l+" ]").replace(/UNROLLED_LOOP_INDEX/g,l);return o}function tg(r){let e="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function sT(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Pg?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Ix?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Vi&&(e="SHADOWMAP_TYPE_VSM"),e}function oT(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case eo:case to:e="ENVMAP_TYPE_CUBE";break;case Jl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function aT(r){let e="ENVMAP_MODE_REFLECTION";return r.envMap&&r.envMapMode===to&&(e="ENVMAP_MODE_REFRACTION"),e}function lT(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Dg:e="ENVMAP_BLENDING_MULTIPLY";break;case iy:e="ENVMAP_BLENDING_MIX";break;case ry:e="ENVMAP_BLENDING_ADD";break}return e}function uT(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,s=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:s,maxMip:t}}function cT(r,e,t,s){const o=r.getContext(),l=t.defines;let c=t.vertexShader,d=t.fragmentShader;const f=sT(t),h=oT(t),g=aT(t),m=lT(t),_=uT(t),S=t.isWebGL2?"":K1(t),w=Z1(t),M=Q1(l),x=o.createProgram();let y,A,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(y=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(Ks).join(`
`),y.length>0&&(y+=`
`),A=[S,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(Ks).join(`
`),A.length>0&&(A+=`
`)):(y=[tg(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+g:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+f:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ks).join(`
`),A=[S,tg(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.envMap?"#define "+g:"",t.envMap?"#define "+m:"",_?"#define CUBEUV_TEXEL_WIDTH "+_.texelWidth:"",_?"#define CUBEUV_TEXEL_HEIGHT "+_.texelHeight:"",_?"#define CUBEUV_MAX_MIP "+_.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+f:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ar?"#define TONE_MAPPING":"",t.toneMapping!==Ar?ct.tonemapping_pars_fragment:"",t.toneMapping!==Ar?$1("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ct.colorspace_pars_fragment,q1("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ks).join(`
`)),c=Nd(c),c=Qm(c,t),c=Jm(c,t),d=Nd(d),d=Qm(d,t),d=Jm(d,t),c=eg(c),d=eg(d),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,y=[w,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,A=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===xm?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===xm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+A);const L=b+y+c,B=b+A+d,U=Km(o,o.VERTEX_SHADER,L),I=Km(o,o.FRAGMENT_SHADER,B);o.attachShader(x,U),o.attachShader(x,I),t.index0AttributeName!==void 0?o.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&o.bindAttribLocation(x,0,"position"),o.linkProgram(x);function Q(oe){if(r.debug.checkShaderErrors){const de=o.getProgramInfoLog(x).trim(),k=o.getShaderInfoLog(U).trim(),Y=o.getShaderInfoLog(I).trim();let J=!0,ae=!0;if(o.getProgramParameter(x,o.LINK_STATUS)===!1)if(J=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(o,x,U,I);else{const W=Zm(o,U,"vertex"),q=Zm(o,I,"fragment");console.error("THREE.WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(x,o.VALIDATE_STATUS)+`

Program Info Log: `+de+`
`+W+`
`+q)}else de!==""?console.warn("THREE.WebGLProgram: Program Info Log:",de):(k===""||Y==="")&&(ae=!1);ae&&(oe.diagnostics={runnable:J,programLog:de,vertexShader:{log:k,prefix:y},fragmentShader:{log:Y,prefix:A}})}o.deleteShader(U),o.deleteShader(I),E=new Vl(o,x),C=J1(o,x)}let E;this.getUniforms=function(){return E===void 0&&Q(this),E};let C;this.getAttributes=function(){return C===void 0&&Q(this),C};let $=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return $===!1&&($=o.getProgramParameter(x,W1)),$},this.destroy=function(){s.releaseStatesOfProgram(this),o.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=j1++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=U,this.fragmentShader=I,this}let dT=0;class fT{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,s=e.fragmentShader,o=this._getShaderStage(t),l=this._getShaderStage(s),c=this._getShaderCacheForMaterial(e);return c.has(o)===!1&&(c.add(o),o.usedTimes++),c.has(l)===!1&&(c.add(l),l.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const s of t)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let s=t.get(e);return s===void 0&&(s=new Set,t.set(e,s)),s}_getShaderStage(e){const t=this.shaderCache;let s=t.get(e);return s===void 0&&(s=new hT(e),t.set(e,s)),s}}class hT{constructor(e){this.id=dT++,this.code=e,this.usedTimes=0}}function pT(r,e,t,s,o,l,c){const d=new qg,f=new fT,h=[],g=o.isWebGL2,m=o.logarithmicDepthBuffer,_=o.vertexTextures;let S=o.precision;const w={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(E){return E===0?"uv":`uv${E}`}function x(E,C,$,oe,de){const k=oe.fog,Y=de.geometry,J=E.isMeshStandardMaterial?oe.environment:null,ae=(E.isMeshStandardMaterial?t:e).get(E.envMap||J),W=ae&&ae.mapping===Jl?ae.image.height:null,q=w[E.type];E.precision!==null&&(S=o.getMaxPrecision(E.precision),S!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",S,"instead."));const z=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,D=z!==void 0?z.length:0;let G=0;Y.morphAttributes.position!==void 0&&(G=1),Y.morphAttributes.normal!==void 0&&(G=2),Y.morphAttributes.color!==void 0&&(G=3);let X,te,he,ve;if(q){const Jt=Ti[q];X=Jt.vertexShader,te=Jt.fragmentShader}else X=E.vertexShader,te=E.fragmentShader,f.update(E),he=f.getVertexShaderID(E),ve=f.getFragmentShaderID(E);const Me=r.getRenderTarget(),we=de.isInstancedMesh===!0,Pe=de.isBatchedMesh===!0,Le=!!E.map,et=!!E.matcap,ie=!!ae,kt=!!E.aoMap,We=!!E.lightMap,Ze=!!E.bumpMap,Be=!!E.normalMap,Mt=!!E.displacementMap,st=!!E.emissiveMap,N=!!E.metalnessMap,R=!!E.roughnessMap,ne=E.anisotropy>0,ye=E.clearcoat>0,_e=E.iridescence>0,Se=E.sheen>0,Ge=E.transmission>0,Re=ne&&!!E.anisotropyMap,Oe=ye&&!!E.clearcoatMap,Xe=ye&&!!E.clearcoatNormalMap,ot=ye&&!!E.clearcoatRoughnessMap,ge=_e&&!!E.iridescenceMap,pt=_e&&!!E.iridescenceThicknessMap,dt=Se&&!!E.sheenColorMap,tt=Se&&!!E.sheenRoughnessMap,je=!!E.specularMap,ke=!!E.specularColorMap,it=!!E.specularIntensityMap,gt=Ge&&!!E.transmissionMap,Ct=Ge&&!!E.thicknessMap,at=!!E.gradientMap,Te=!!E.alphaMap,V=E.alphaTest>0,Ae=!!E.alphaHash,be=!!E.extensions,Qe=!!Y.attributes.uv1,Ye=!!Y.attributes.uv2,Et=!!Y.attributes.uv3;let Tt=Ar;return E.toneMapped&&(Me===null||Me.isXRRenderTarget===!0)&&(Tt=r.toneMapping),{isWebGL2:g,shaderID:q,shaderType:E.type,shaderName:E.name,vertexShader:X,fragmentShader:te,defines:E.defines,customVertexShaderID:he,customFragmentShaderID:ve,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:S,batching:Pe,instancing:we,instancingColor:we&&de.instanceColor!==null,supportsVertexTextures:_,outputColorSpace:Me===null?r.outputColorSpace:Me.isXRRenderTarget===!0?Me.texture.colorSpace:$i,map:Le,matcap:et,envMap:ie,envMapMode:ie&&ae.mapping,envMapCubeUVHeight:W,aoMap:kt,lightMap:We,bumpMap:Ze,normalMap:Be,displacementMap:_&&Mt,emissiveMap:st,normalMapObjectSpace:Be&&E.normalMapType===My,normalMapTangentSpace:Be&&E.normalMapType===Gg,metalnessMap:N,roughnessMap:R,anisotropy:ne,anisotropyMap:Re,clearcoat:ye,clearcoatMap:Oe,clearcoatNormalMap:Xe,clearcoatRoughnessMap:ot,iridescence:_e,iridescenceMap:ge,iridescenceThicknessMap:pt,sheen:Se,sheenColorMap:dt,sheenRoughnessMap:tt,specularMap:je,specularColorMap:ke,specularIntensityMap:it,transmission:Ge,transmissionMap:gt,thicknessMap:Ct,gradientMap:at,opaque:E.transparent===!1&&E.blending===Zs,alphaMap:Te,alphaTest:V,alphaHash:Ae,combine:E.combine,mapUv:Le&&M(E.map.channel),aoMapUv:kt&&M(E.aoMap.channel),lightMapUv:We&&M(E.lightMap.channel),bumpMapUv:Ze&&M(E.bumpMap.channel),normalMapUv:Be&&M(E.normalMap.channel),displacementMapUv:Mt&&M(E.displacementMap.channel),emissiveMapUv:st&&M(E.emissiveMap.channel),metalnessMapUv:N&&M(E.metalnessMap.channel),roughnessMapUv:R&&M(E.roughnessMap.channel),anisotropyMapUv:Re&&M(E.anisotropyMap.channel),clearcoatMapUv:Oe&&M(E.clearcoatMap.channel),clearcoatNormalMapUv:Xe&&M(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ot&&M(E.clearcoatRoughnessMap.channel),iridescenceMapUv:ge&&M(E.iridescenceMap.channel),iridescenceThicknessMapUv:pt&&M(E.iridescenceThicknessMap.channel),sheenColorMapUv:dt&&M(E.sheenColorMap.channel),sheenRoughnessMapUv:tt&&M(E.sheenRoughnessMap.channel),specularMapUv:je&&M(E.specularMap.channel),specularColorMapUv:ke&&M(E.specularColorMap.channel),specularIntensityMapUv:it&&M(E.specularIntensityMap.channel),transmissionMapUv:gt&&M(E.transmissionMap.channel),thicknessMapUv:Ct&&M(E.thicknessMap.channel),alphaMapUv:Te&&M(E.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(Be||ne),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,vertexUv1s:Qe,vertexUv2s:Ye,vertexUv3s:Et,pointsUvs:de.isPoints===!0&&!!Y.attributes.uv&&(Le||Te),fog:!!k,useFog:E.fog===!0,fogExp2:k&&k.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:m,skinning:de.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:D,morphTextureStride:G,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:E.dithering,shadowMapEnabled:r.shadowMap.enabled&&$.length>0,shadowMapType:r.shadowMap.type,toneMapping:Tt,useLegacyLights:r._useLegacyLights,decodeVideoTexture:Le&&E.map.isVideoTexture===!0&&At.getTransfer(E.map.colorSpace)===Dt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===ji,flipSided:E.side===kn,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionDerivatives:be&&E.extensions.derivatives===!0,extensionFragDepth:be&&E.extensions.fragDepth===!0,extensionDrawBuffers:be&&E.extensions.drawBuffers===!0,extensionShaderTextureLOD:be&&E.extensions.shaderTextureLOD===!0,extensionClipCullDistance:be&&E.extensions.clipCullDistance&&s.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:g||s.has("EXT_frag_depth"),rendererExtensionDrawBuffers:g||s.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:g||s.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:s.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()}}function y(E){const C=[];if(E.shaderID?C.push(E.shaderID):(C.push(E.customVertexShaderID),C.push(E.customFragmentShaderID)),E.defines!==void 0)for(const $ in E.defines)C.push($),C.push(E.defines[$]);return E.isRawShaderMaterial===!1&&(A(C,E),b(C,E),C.push(r.outputColorSpace)),C.push(E.customProgramCacheKey),C.join()}function A(E,C){E.push(C.precision),E.push(C.outputColorSpace),E.push(C.envMapMode),E.push(C.envMapCubeUVHeight),E.push(C.mapUv),E.push(C.alphaMapUv),E.push(C.lightMapUv),E.push(C.aoMapUv),E.push(C.bumpMapUv),E.push(C.normalMapUv),E.push(C.displacementMapUv),E.push(C.emissiveMapUv),E.push(C.metalnessMapUv),E.push(C.roughnessMapUv),E.push(C.anisotropyMapUv),E.push(C.clearcoatMapUv),E.push(C.clearcoatNormalMapUv),E.push(C.clearcoatRoughnessMapUv),E.push(C.iridescenceMapUv),E.push(C.iridescenceThicknessMapUv),E.push(C.sheenColorMapUv),E.push(C.sheenRoughnessMapUv),E.push(C.specularMapUv),E.push(C.specularColorMapUv),E.push(C.specularIntensityMapUv),E.push(C.transmissionMapUv),E.push(C.thicknessMapUv),E.push(C.combine),E.push(C.fogExp2),E.push(C.sizeAttenuation),E.push(C.morphTargetsCount),E.push(C.morphAttributeCount),E.push(C.numDirLights),E.push(C.numPointLights),E.push(C.numSpotLights),E.push(C.numSpotLightMaps),E.push(C.numHemiLights),E.push(C.numRectAreaLights),E.push(C.numDirLightShadows),E.push(C.numPointLightShadows),E.push(C.numSpotLightShadows),E.push(C.numSpotLightShadowsWithMaps),E.push(C.numLightProbes),E.push(C.shadowMapType),E.push(C.toneMapping),E.push(C.numClippingPlanes),E.push(C.numClipIntersection),E.push(C.depthPacking)}function b(E,C){d.disableAll(),C.isWebGL2&&d.enable(0),C.supportsVertexTextures&&d.enable(1),C.instancing&&d.enable(2),C.instancingColor&&d.enable(3),C.matcap&&d.enable(4),C.envMap&&d.enable(5),C.normalMapObjectSpace&&d.enable(6),C.normalMapTangentSpace&&d.enable(7),C.clearcoat&&d.enable(8),C.iridescence&&d.enable(9),C.alphaTest&&d.enable(10),C.vertexColors&&d.enable(11),C.vertexAlphas&&d.enable(12),C.vertexUv1s&&d.enable(13),C.vertexUv2s&&d.enable(14),C.vertexUv3s&&d.enable(15),C.vertexTangents&&d.enable(16),C.anisotropy&&d.enable(17),C.alphaHash&&d.enable(18),C.batching&&d.enable(19),E.push(d.mask),d.disableAll(),C.fog&&d.enable(0),C.useFog&&d.enable(1),C.flatShading&&d.enable(2),C.logarithmicDepthBuffer&&d.enable(3),C.skinning&&d.enable(4),C.morphTargets&&d.enable(5),C.morphNormals&&d.enable(6),C.morphColors&&d.enable(7),C.premultipliedAlpha&&d.enable(8),C.shadowMapEnabled&&d.enable(9),C.useLegacyLights&&d.enable(10),C.doubleSided&&d.enable(11),C.flipSided&&d.enable(12),C.useDepthPacking&&d.enable(13),C.dithering&&d.enable(14),C.transmission&&d.enable(15),C.sheen&&d.enable(16),C.opaque&&d.enable(17),C.pointsUvs&&d.enable(18),C.decodeVideoTexture&&d.enable(19),E.push(d.mask)}function L(E){const C=w[E.type];let $;if(C){const oe=Ti[C];$=Ky.clone(oe.uniforms)}else $=E.uniforms;return $}function B(E,C){let $;for(let oe=0,de=h.length;oe<de;oe++){const k=h[oe];if(k.cacheKey===C){$=k,++$.usedTimes;break}}return $===void 0&&($=new cT(r,C,E,l),h.push($)),$}function U(E){if(--E.usedTimes===0){const C=h.indexOf(E);h[C]=h[h.length-1],h.pop(),E.destroy()}}function I(E){f.remove(E)}function Q(){f.dispose()}return{getParameters:x,getProgramCacheKey:y,getUniforms:L,acquireProgram:B,releaseProgram:U,releaseShaderCache:I,programs:h,dispose:Q}}function mT(){let r=new WeakMap;function e(l){let c=r.get(l);return c===void 0&&(c={},r.set(l,c)),c}function t(l){r.delete(l)}function s(l,c,d){r.get(l)[c]=d}function o(){r=new WeakMap}return{get:e,remove:t,update:s,dispose:o}}function gT(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function ng(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function ig(){const r=[];let e=0;const t=[],s=[],o=[];function l(){e=0,t.length=0,s.length=0,o.length=0}function c(m,_,S,w,M,x){let y=r[e];return y===void 0?(y={id:m.id,object:m,geometry:_,material:S,groupOrder:w,renderOrder:m.renderOrder,z:M,group:x},r[e]=y):(y.id=m.id,y.object=m,y.geometry=_,y.material=S,y.groupOrder=w,y.renderOrder=m.renderOrder,y.z=M,y.group=x),e++,y}function d(m,_,S,w,M,x){const y=c(m,_,S,w,M,x);S.transmission>0?s.push(y):S.transparent===!0?o.push(y):t.push(y)}function f(m,_,S,w,M,x){const y=c(m,_,S,w,M,x);S.transmission>0?s.unshift(y):S.transparent===!0?o.unshift(y):t.unshift(y)}function h(m,_){t.length>1&&t.sort(m||gT),s.length>1&&s.sort(_||ng),o.length>1&&o.sort(_||ng)}function g(){for(let m=e,_=r.length;m<_;m++){const S=r[m];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:t,transmissive:s,transparent:o,init:l,push:d,unshift:f,finish:g,sort:h}}function vT(){let r=new WeakMap;function e(s,o){const l=r.get(s);let c;return l===void 0?(c=new ig,r.set(s,[c])):o>=l.length?(c=new ig,l.push(c)):c=l[o],c}function t(){r=new WeakMap}return{get:e,dispose:t}}function _T(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new ue,color:new yt};break;case"SpotLight":t={position:new ue,direction:new ue,color:new yt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new ue,color:new yt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new ue,skyColor:new yt,groundColor:new yt};break;case"RectAreaLight":t={color:new yt,position:new ue,halfWidth:new ue,halfHeight:new ue};break}return r[e.id]=t,t}}}function xT(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let yT=0;function ST(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function MT(r,e){const t=new _T,s=xT(),o={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let g=0;g<9;g++)o.probe.push(new ue);const l=new ue,c=new Kt,d=new Kt;function f(g,m){let _=0,S=0,w=0;for(let oe=0;oe<9;oe++)o.probe[oe].set(0,0,0);let M=0,x=0,y=0,A=0,b=0,L=0,B=0,U=0,I=0,Q=0,E=0;g.sort(ST);const C=m===!0?Math.PI:1;for(let oe=0,de=g.length;oe<de;oe++){const k=g[oe],Y=k.color,J=k.intensity,ae=k.distance,W=k.shadow&&k.shadow.map?k.shadow.map.texture:null;if(k.isAmbientLight)_+=Y.r*J*C,S+=Y.g*J*C,w+=Y.b*J*C;else if(k.isLightProbe){for(let q=0;q<9;q++)o.probe[q].addScaledVector(k.sh.coefficients[q],J);E++}else if(k.isDirectionalLight){const q=t.get(k);if(q.color.copy(k.color).multiplyScalar(k.intensity*C),k.castShadow){const z=k.shadow,D=s.get(k);D.shadowBias=z.bias,D.shadowNormalBias=z.normalBias,D.shadowRadius=z.radius,D.shadowMapSize=z.mapSize,o.directionalShadow[M]=D,o.directionalShadowMap[M]=W,o.directionalShadowMatrix[M]=k.shadow.matrix,L++}o.directional[M]=q,M++}else if(k.isSpotLight){const q=t.get(k);q.position.setFromMatrixPosition(k.matrixWorld),q.color.copy(Y).multiplyScalar(J*C),q.distance=ae,q.coneCos=Math.cos(k.angle),q.penumbraCos=Math.cos(k.angle*(1-k.penumbra)),q.decay=k.decay,o.spot[y]=q;const z=k.shadow;if(k.map&&(o.spotLightMap[I]=k.map,I++,z.updateMatrices(k),k.castShadow&&Q++),o.spotLightMatrix[y]=z.matrix,k.castShadow){const D=s.get(k);D.shadowBias=z.bias,D.shadowNormalBias=z.normalBias,D.shadowRadius=z.radius,D.shadowMapSize=z.mapSize,o.spotShadow[y]=D,o.spotShadowMap[y]=W,U++}y++}else if(k.isRectAreaLight){const q=t.get(k);q.color.copy(Y).multiplyScalar(J),q.halfWidth.set(k.width*.5,0,0),q.halfHeight.set(0,k.height*.5,0),o.rectArea[A]=q,A++}else if(k.isPointLight){const q=t.get(k);if(q.color.copy(k.color).multiplyScalar(k.intensity*C),q.distance=k.distance,q.decay=k.decay,k.castShadow){const z=k.shadow,D=s.get(k);D.shadowBias=z.bias,D.shadowNormalBias=z.normalBias,D.shadowRadius=z.radius,D.shadowMapSize=z.mapSize,D.shadowCameraNear=z.camera.near,D.shadowCameraFar=z.camera.far,o.pointShadow[x]=D,o.pointShadowMap[x]=W,o.pointShadowMatrix[x]=k.shadow.matrix,B++}o.point[x]=q,x++}else if(k.isHemisphereLight){const q=t.get(k);q.skyColor.copy(k.color).multiplyScalar(J*C),q.groundColor.copy(k.groundColor).multiplyScalar(J*C),o.hemi[b]=q,b++}}A>0&&(e.isWebGL2?r.has("OES_texture_float_linear")===!0?(o.rectAreaLTC1=Ce.LTC_FLOAT_1,o.rectAreaLTC2=Ce.LTC_FLOAT_2):(o.rectAreaLTC1=Ce.LTC_HALF_1,o.rectAreaLTC2=Ce.LTC_HALF_2):r.has("OES_texture_float_linear")===!0?(o.rectAreaLTC1=Ce.LTC_FLOAT_1,o.rectAreaLTC2=Ce.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(o.rectAreaLTC1=Ce.LTC_HALF_1,o.rectAreaLTC2=Ce.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),o.ambient[0]=_,o.ambient[1]=S,o.ambient[2]=w;const $=o.hash;($.directionalLength!==M||$.pointLength!==x||$.spotLength!==y||$.rectAreaLength!==A||$.hemiLength!==b||$.numDirectionalShadows!==L||$.numPointShadows!==B||$.numSpotShadows!==U||$.numSpotMaps!==I||$.numLightProbes!==E)&&(o.directional.length=M,o.spot.length=y,o.rectArea.length=A,o.point.length=x,o.hemi.length=b,o.directionalShadow.length=L,o.directionalShadowMap.length=L,o.pointShadow.length=B,o.pointShadowMap.length=B,o.spotShadow.length=U,o.spotShadowMap.length=U,o.directionalShadowMatrix.length=L,o.pointShadowMatrix.length=B,o.spotLightMatrix.length=U+I-Q,o.spotLightMap.length=I,o.numSpotLightShadowsWithMaps=Q,o.numLightProbes=E,$.directionalLength=M,$.pointLength=x,$.spotLength=y,$.rectAreaLength=A,$.hemiLength=b,$.numDirectionalShadows=L,$.numPointShadows=B,$.numSpotShadows=U,$.numSpotMaps=I,$.numLightProbes=E,o.version=yT++)}function h(g,m){let _=0,S=0,w=0,M=0,x=0;const y=m.matrixWorldInverse;for(let A=0,b=g.length;A<b;A++){const L=g[A];if(L.isDirectionalLight){const B=o.directional[_];B.direction.setFromMatrixPosition(L.matrixWorld),l.setFromMatrixPosition(L.target.matrixWorld),B.direction.sub(l),B.direction.transformDirection(y),_++}else if(L.isSpotLight){const B=o.spot[w];B.position.setFromMatrixPosition(L.matrixWorld),B.position.applyMatrix4(y),B.direction.setFromMatrixPosition(L.matrixWorld),l.setFromMatrixPosition(L.target.matrixWorld),B.direction.sub(l),B.direction.transformDirection(y),w++}else if(L.isRectAreaLight){const B=o.rectArea[M];B.position.setFromMatrixPosition(L.matrixWorld),B.position.applyMatrix4(y),d.identity(),c.copy(L.matrixWorld),c.premultiply(y),d.extractRotation(c),B.halfWidth.set(L.width*.5,0,0),B.halfHeight.set(0,L.height*.5,0),B.halfWidth.applyMatrix4(d),B.halfHeight.applyMatrix4(d),M++}else if(L.isPointLight){const B=o.point[S];B.position.setFromMatrixPosition(L.matrixWorld),B.position.applyMatrix4(y),S++}else if(L.isHemisphereLight){const B=o.hemi[x];B.direction.setFromMatrixPosition(L.matrixWorld),B.direction.transformDirection(y),x++}}}return{setup:f,setupView:h,state:o}}function rg(r,e){const t=new MT(r,e),s=[],o=[];function l(){s.length=0,o.length=0}function c(m){s.push(m)}function d(m){o.push(m)}function f(m){t.setup(s,m)}function h(m){t.setupView(s,m)}return{init:l,state:{lightsArray:s,shadowsArray:o,lights:t},setupLights:f,setupLightsView:h,pushLight:c,pushShadow:d}}function ET(r,e){let t=new WeakMap;function s(l,c=0){const d=t.get(l);let f;return d===void 0?(f=new rg(r,e),t.set(l,[f])):c>=d.length?(f=new rg(r,e),d.push(f)):f=d[c],f}function o(){t=new WeakMap}return{get:s,dispose:o}}class TT extends ua{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=yy,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class wT extends ua{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const AT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,CT=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function bT(r,e,t){let s=new Vd;const o=new St,l=new St,c=new sn,d=new TT({depthPacking:Sy}),f=new wT,h={},g=t.maxTextureSize,m={[br]:kn,[kn]:br,[ji]:ji},_=new os({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new St},radius:{value:4}},vertexShader:AT,fragmentShader:CT}),S=_.clone();S.defines.HORIZONTAL_PASS=1;const w=new Lr;w.setAttribute("position",new wi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new qi(w,_),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Pg;let y=this.type;this.render=function(U,I,Q){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||U.length===0)return;const E=r.getRenderTarget(),C=r.getActiveCubeFace(),$=r.getActiveMipmapLevel(),oe=r.state;oe.setBlending(wr),oe.buffers.color.setClear(1,1,1,1),oe.buffers.depth.setTest(!0),oe.setScissorTest(!1);const de=y!==Vi&&this.type===Vi,k=y===Vi&&this.type!==Vi;for(let Y=0,J=U.length;Y<J;Y++){const ae=U[Y],W=ae.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",ae,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;o.copy(W.mapSize);const q=W.getFrameExtents();if(o.multiply(q),l.copy(W.mapSize),(o.x>g||o.y>g)&&(o.x>g&&(l.x=Math.floor(g/q.x),o.x=l.x*q.x,W.mapSize.x=l.x),o.y>g&&(l.y=Math.floor(g/q.y),o.y=l.y*q.y,W.mapSize.y=l.y)),W.map===null||de===!0||k===!0){const D=this.type!==Vi?{minFilter:wn,magFilter:wn}:{};W.map!==null&&W.map.dispose(),W.map=new ss(o.x,o.y,D),W.map.texture.name=ae.name+".shadowMap",W.camera.updateProjectionMatrix()}r.setRenderTarget(W.map),r.clear();const z=W.getViewportCount();for(let D=0;D<z;D++){const G=W.getViewport(D);c.set(l.x*G.x,l.y*G.y,l.x*G.z,l.y*G.w),oe.viewport(c),W.updateMatrices(ae,D),s=W.getFrustum(),L(I,Q,W.camera,ae,this.type)}W.isPointLightShadow!==!0&&this.type===Vi&&A(W,Q),W.needsUpdate=!1}y=this.type,x.needsUpdate=!1,r.setRenderTarget(E,C,$)};function A(U,I){const Q=e.update(M);_.defines.VSM_SAMPLES!==U.blurSamples&&(_.defines.VSM_SAMPLES=U.blurSamples,S.defines.VSM_SAMPLES=U.blurSamples,_.needsUpdate=!0,S.needsUpdate=!0),U.mapPass===null&&(U.mapPass=new ss(o.x,o.y)),_.uniforms.shadow_pass.value=U.map.texture,_.uniforms.resolution.value=U.mapSize,_.uniforms.radius.value=U.radius,r.setRenderTarget(U.mapPass),r.clear(),r.renderBufferDirect(I,null,Q,_,M,null),S.uniforms.shadow_pass.value=U.mapPass.texture,S.uniforms.resolution.value=U.mapSize,S.uniforms.radius.value=U.radius,r.setRenderTarget(U.map),r.clear(),r.renderBufferDirect(I,null,Q,S,M,null)}function b(U,I,Q,E){let C=null;const $=Q.isPointLight===!0?U.customDistanceMaterial:U.customDepthMaterial;if($!==void 0)C=$;else if(C=Q.isPointLight===!0?f:d,r.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0){const oe=C.uuid,de=I.uuid;let k=h[oe];k===void 0&&(k={},h[oe]=k);let Y=k[de];Y===void 0&&(Y=C.clone(),k[de]=Y,I.addEventListener("dispose",B)),C=Y}if(C.visible=I.visible,C.wireframe=I.wireframe,E===Vi?C.side=I.shadowSide!==null?I.shadowSide:I.side:C.side=I.shadowSide!==null?I.shadowSide:m[I.side],C.alphaMap=I.alphaMap,C.alphaTest=I.alphaTest,C.map=I.map,C.clipShadows=I.clipShadows,C.clippingPlanes=I.clippingPlanes,C.clipIntersection=I.clipIntersection,C.displacementMap=I.displacementMap,C.displacementScale=I.displacementScale,C.displacementBias=I.displacementBias,C.wireframeLinewidth=I.wireframeLinewidth,C.linewidth=I.linewidth,Q.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const oe=r.properties.get(C);oe.light=Q}return C}function L(U,I,Q,E,C){if(U.visible===!1)return;if(U.layers.test(I.layers)&&(U.isMesh||U.isLine||U.isPoints)&&(U.castShadow||U.receiveShadow&&C===Vi)&&(!U.frustumCulled||s.intersectsObject(U))){U.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,U.matrixWorld);const de=e.update(U),k=U.material;if(Array.isArray(k)){const Y=de.groups;for(let J=0,ae=Y.length;J<ae;J++){const W=Y[J],q=k[W.materialIndex];if(q&&q.visible){const z=b(U,q,E,C);U.onBeforeShadow(r,U,I,Q,de,z,W),r.renderBufferDirect(Q,null,de,z,U,W),U.onAfterShadow(r,U,I,Q,de,z,W)}}}else if(k.visible){const Y=b(U,k,E,C);U.onBeforeShadow(r,U,I,Q,de,Y,null),r.renderBufferDirect(Q,null,de,Y,U,null),U.onAfterShadow(r,U,I,Q,de,Y,null)}}const oe=U.children;for(let de=0,k=oe.length;de<k;de++)L(oe[de],I,Q,E,C)}function B(U){U.target.removeEventListener("dispose",B);for(const Q in h){const E=h[Q],C=U.target.uuid;C in E&&(E[C].dispose(),delete E[C])}}}function RT(r,e,t){const s=t.isWebGL2;function o(){let V=!1;const Ae=new sn;let be=null;const Qe=new sn(0,0,0,0);return{setMask:function(Ye){be!==Ye&&!V&&(r.colorMask(Ye,Ye,Ye,Ye),be=Ye)},setLocked:function(Ye){V=Ye},setClear:function(Ye,Et,Tt,Bt,Jt){Jt===!0&&(Ye*=Bt,Et*=Bt,Tt*=Bt),Ae.set(Ye,Et,Tt,Bt),Qe.equals(Ae)===!1&&(r.clearColor(Ye,Et,Tt,Bt),Qe.copy(Ae))},reset:function(){V=!1,be=null,Qe.set(-1,0,0,0)}}}function l(){let V=!1,Ae=null,be=null,Qe=null;return{setTest:function(Ye){Ye?Pe(r.DEPTH_TEST):Le(r.DEPTH_TEST)},setMask:function(Ye){Ae!==Ye&&!V&&(r.depthMask(Ye),Ae=Ye)},setFunc:function(Ye){if(be!==Ye){switch(Ye){case Kx:r.depthFunc(r.NEVER);break;case Zx:r.depthFunc(r.ALWAYS);break;case Qx:r.depthFunc(r.LESS);break;case Wl:r.depthFunc(r.LEQUAL);break;case Jx:r.depthFunc(r.EQUAL);break;case ey:r.depthFunc(r.GEQUAL);break;case ty:r.depthFunc(r.GREATER);break;case ny:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}be=Ye}},setLocked:function(Ye){V=Ye},setClear:function(Ye){Qe!==Ye&&(r.clearDepth(Ye),Qe=Ye)},reset:function(){V=!1,Ae=null,be=null,Qe=null}}}function c(){let V=!1,Ae=null,be=null,Qe=null,Ye=null,Et=null,Tt=null,Bt=null,Jt=null;return{setTest:function(_t){V||(_t?Pe(r.STENCIL_TEST):Le(r.STENCIL_TEST))},setMask:function(_t){Ae!==_t&&!V&&(r.stencilMask(_t),Ae=_t)},setFunc:function(_t,Yt,cn){(be!==_t||Qe!==Yt||Ye!==cn)&&(r.stencilFunc(_t,Yt,cn),be=_t,Qe=Yt,Ye=cn)},setOp:function(_t,Yt,cn){(Et!==_t||Tt!==Yt||Bt!==cn)&&(r.stencilOp(_t,Yt,cn),Et=_t,Tt=Yt,Bt=cn)},setLocked:function(_t){V=_t},setClear:function(_t){Jt!==_t&&(r.clearStencil(_t),Jt=_t)},reset:function(){V=!1,Ae=null,be=null,Qe=null,Ye=null,Et=null,Tt=null,Bt=null,Jt=null}}}const d=new o,f=new l,h=new c,g=new WeakMap,m=new WeakMap;let _={},S={},w=new WeakMap,M=[],x=null,y=!1,A=null,b=null,L=null,B=null,U=null,I=null,Q=null,E=new yt(0,0,0),C=0,$=!1,oe=null,de=null,k=null,Y=null,J=null;const ae=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,q=0;const z=r.getParameter(r.VERSION);z.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(z)[1]),W=q>=1):z.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),W=q>=2);let D=null,G={};const X=r.getParameter(r.SCISSOR_BOX),te=r.getParameter(r.VIEWPORT),he=new sn().fromArray(X),ve=new sn().fromArray(te);function Me(V,Ae,be,Qe){const Ye=new Uint8Array(4),Et=r.createTexture();r.bindTexture(V,Et),r.texParameteri(V,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(V,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Tt=0;Tt<be;Tt++)s&&(V===r.TEXTURE_3D||V===r.TEXTURE_2D_ARRAY)?r.texImage3D(Ae,0,r.RGBA,1,1,Qe,0,r.RGBA,r.UNSIGNED_BYTE,Ye):r.texImage2D(Ae+Tt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Ye);return Et}const we={};we[r.TEXTURE_2D]=Me(r.TEXTURE_2D,r.TEXTURE_2D,1),we[r.TEXTURE_CUBE_MAP]=Me(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),s&&(we[r.TEXTURE_2D_ARRAY]=Me(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),we[r.TEXTURE_3D]=Me(r.TEXTURE_3D,r.TEXTURE_3D,1,1)),d.setClear(0,0,0,1),f.setClear(1),h.setClear(0),Pe(r.DEPTH_TEST),f.setFunc(Wl),st(!1),N(Bp),Pe(r.CULL_FACE),Be(wr);function Pe(V){_[V]!==!0&&(r.enable(V),_[V]=!0)}function Le(V){_[V]!==!1&&(r.disable(V),_[V]=!1)}function et(V,Ae){return S[V]!==Ae?(r.bindFramebuffer(V,Ae),S[V]=Ae,s&&(V===r.DRAW_FRAMEBUFFER&&(S[r.FRAMEBUFFER]=Ae),V===r.FRAMEBUFFER&&(S[r.DRAW_FRAMEBUFFER]=Ae)),!0):!1}function ie(V,Ae){let be=M,Qe=!1;if(V)if(be=w.get(Ae),be===void 0&&(be=[],w.set(Ae,be)),V.isWebGLMultipleRenderTargets){const Ye=V.texture;if(be.length!==Ye.length||be[0]!==r.COLOR_ATTACHMENT0){for(let Et=0,Tt=Ye.length;Et<Tt;Et++)be[Et]=r.COLOR_ATTACHMENT0+Et;be.length=Ye.length,Qe=!0}}else be[0]!==r.COLOR_ATTACHMENT0&&(be[0]=r.COLOR_ATTACHMENT0,Qe=!0);else be[0]!==r.BACK&&(be[0]=r.BACK,Qe=!0);Qe&&(t.isWebGL2?r.drawBuffers(be):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(be))}function kt(V){return x!==V?(r.useProgram(V),x=V,!0):!1}const We={[Qr]:r.FUNC_ADD,[Ux]:r.FUNC_SUBTRACT,[Ox]:r.FUNC_REVERSE_SUBTRACT};if(s)We[Vp]=r.MIN,We[Wp]=r.MAX;else{const V=e.get("EXT_blend_minmax");V!==null&&(We[Vp]=V.MIN_EXT,We[Wp]=V.MAX_EXT)}const Ze={[Fx]:r.ZERO,[kx]:r.ONE,[Bx]:r.SRC_COLOR,[Ad]:r.SRC_ALPHA,[jx]:r.SRC_ALPHA_SATURATE,[Vx]:r.DST_COLOR,[Hx]:r.DST_ALPHA,[zx]:r.ONE_MINUS_SRC_COLOR,[Cd]:r.ONE_MINUS_SRC_ALPHA,[Wx]:r.ONE_MINUS_DST_COLOR,[Gx]:r.ONE_MINUS_DST_ALPHA,[Xx]:r.CONSTANT_COLOR,[Yx]:r.ONE_MINUS_CONSTANT_COLOR,[qx]:r.CONSTANT_ALPHA,[$x]:r.ONE_MINUS_CONSTANT_ALPHA};function Be(V,Ae,be,Qe,Ye,Et,Tt,Bt,Jt,_t){if(V===wr){y===!0&&(Le(r.BLEND),y=!1);return}if(y===!1&&(Pe(r.BLEND),y=!0),V!==Nx){if(V!==A||_t!==$){if((b!==Qr||U!==Qr)&&(r.blendEquation(r.FUNC_ADD),b=Qr,U=Qr),_t)switch(V){case Zs:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case zp:r.blendFunc(r.ONE,r.ONE);break;case Hp:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Gp:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}else switch(V){case Zs:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case zp:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Hp:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Gp:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}L=null,B=null,I=null,Q=null,E.set(0,0,0),C=0,A=V,$=_t}return}Ye=Ye||Ae,Et=Et||be,Tt=Tt||Qe,(Ae!==b||Ye!==U)&&(r.blendEquationSeparate(We[Ae],We[Ye]),b=Ae,U=Ye),(be!==L||Qe!==B||Et!==I||Tt!==Q)&&(r.blendFuncSeparate(Ze[be],Ze[Qe],Ze[Et],Ze[Tt]),L=be,B=Qe,I=Et,Q=Tt),(Bt.equals(E)===!1||Jt!==C)&&(r.blendColor(Bt.r,Bt.g,Bt.b,Jt),E.copy(Bt),C=Jt),A=V,$=!1}function Mt(V,Ae){V.side===ji?Le(r.CULL_FACE):Pe(r.CULL_FACE);let be=V.side===kn;Ae&&(be=!be),st(be),V.blending===Zs&&V.transparent===!1?Be(wr):Be(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),f.setFunc(V.depthFunc),f.setTest(V.depthTest),f.setMask(V.depthWrite),d.setMask(V.colorWrite);const Qe=V.stencilWrite;h.setTest(Qe),Qe&&(h.setMask(V.stencilWriteMask),h.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),h.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),ne(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?Pe(r.SAMPLE_ALPHA_TO_COVERAGE):Le(r.SAMPLE_ALPHA_TO_COVERAGE)}function st(V){oe!==V&&(V?r.frontFace(r.CW):r.frontFace(r.CCW),oe=V)}function N(V){V!==Px?(Pe(r.CULL_FACE),V!==de&&(V===Bp?r.cullFace(r.BACK):V===Dx?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Le(r.CULL_FACE),de=V}function R(V){V!==k&&(W&&r.lineWidth(V),k=V)}function ne(V,Ae,be){V?(Pe(r.POLYGON_OFFSET_FILL),(Y!==Ae||J!==be)&&(r.polygonOffset(Ae,be),Y=Ae,J=be)):Le(r.POLYGON_OFFSET_FILL)}function ye(V){V?Pe(r.SCISSOR_TEST):Le(r.SCISSOR_TEST)}function _e(V){V===void 0&&(V=r.TEXTURE0+ae-1),D!==V&&(r.activeTexture(V),D=V)}function Se(V,Ae,be){be===void 0&&(D===null?be=r.TEXTURE0+ae-1:be=D);let Qe=G[be];Qe===void 0&&(Qe={type:void 0,texture:void 0},G[be]=Qe),(Qe.type!==V||Qe.texture!==Ae)&&(D!==be&&(r.activeTexture(be),D=be),r.bindTexture(V,Ae||we[V]),Qe.type=V,Qe.texture=Ae)}function Ge(){const V=G[D];V!==void 0&&V.type!==void 0&&(r.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function Re(){try{r.compressedTexImage2D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Oe(){try{r.compressedTexImage3D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Xe(){try{r.texSubImage2D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ot(){try{r.texSubImage3D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ge(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function pt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function dt(){try{r.texStorage2D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function tt(){try{r.texStorage3D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function je(){try{r.texImage2D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ke(){try{r.texImage3D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function it(V){he.equals(V)===!1&&(r.scissor(V.x,V.y,V.z,V.w),he.copy(V))}function gt(V){ve.equals(V)===!1&&(r.viewport(V.x,V.y,V.z,V.w),ve.copy(V))}function Ct(V,Ae){let be=m.get(Ae);be===void 0&&(be=new WeakMap,m.set(Ae,be));let Qe=be.get(V);Qe===void 0&&(Qe=r.getUniformBlockIndex(Ae,V.name),be.set(V,Qe))}function at(V,Ae){const Qe=m.get(Ae).get(V);g.get(Ae)!==Qe&&(r.uniformBlockBinding(Ae,Qe,V.__bindingPointIndex),g.set(Ae,Qe))}function Te(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),s===!0&&(r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),_={},D=null,G={},S={},w=new WeakMap,M=[],x=null,y=!1,A=null,b=null,L=null,B=null,U=null,I=null,Q=null,E=new yt(0,0,0),C=0,$=!1,oe=null,de=null,k=null,Y=null,J=null,he.set(0,0,r.canvas.width,r.canvas.height),ve.set(0,0,r.canvas.width,r.canvas.height),d.reset(),f.reset(),h.reset()}return{buffers:{color:d,depth:f,stencil:h},enable:Pe,disable:Le,bindFramebuffer:et,drawBuffers:ie,useProgram:kt,setBlending:Be,setMaterial:Mt,setFlipSided:st,setCullFace:N,setLineWidth:R,setPolygonOffset:ne,setScissorTest:ye,activeTexture:_e,bindTexture:Se,unbindTexture:Ge,compressedTexImage2D:Re,compressedTexImage3D:Oe,texImage2D:je,texImage3D:ke,updateUBOMapping:Ct,uniformBlockBinding:at,texStorage2D:dt,texStorage3D:tt,texSubImage2D:Xe,texSubImage3D:ot,compressedTexSubImage2D:ge,compressedTexSubImage3D:pt,scissor:it,viewport:gt,reset:Te}}function LT(r,e,t,s,o,l,c){const d=o.isWebGL2,f=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),g=new WeakMap;let m;const _=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function w(N,R){return S?new OffscreenCanvas(N,R):Kl("canvas")}function M(N,R,ne,ye){let _e=1;if((N.width>ye||N.height>ye)&&(_e=ye/Math.max(N.width,N.height)),_e<1||R===!0)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap){const Se=R?Id:Math.floor,Ge=Se(_e*N.width),Re=Se(_e*N.height);m===void 0&&(m=w(Ge,Re));const Oe=ne?w(Ge,Re):m;return Oe.width=Ge,Oe.height=Re,Oe.getContext("2d").drawImage(N,0,0,Ge,Re),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+N.width+"x"+N.height+") to ("+Ge+"x"+Re+")."),Oe}else return"data"in N&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+N.width+"x"+N.height+")."),N;return N}function x(N){return ym(N.width)&&ym(N.height)}function y(N){return d?!1:N.wrapS!==si||N.wrapT!==si||N.minFilter!==wn&&N.minFilter!==On}function A(N,R){return N.generateMipmaps&&R&&N.minFilter!==wn&&N.minFilter!==On}function b(N){r.generateMipmap(N)}function L(N,R,ne,ye,_e=!1){if(d===!1)return R;if(N!==null){if(r[N]!==void 0)return r[N];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let Se=R;if(R===r.RED&&(ne===r.FLOAT&&(Se=r.R32F),ne===r.HALF_FLOAT&&(Se=r.R16F),ne===r.UNSIGNED_BYTE&&(Se=r.R8)),R===r.RED_INTEGER&&(ne===r.UNSIGNED_BYTE&&(Se=r.R8UI),ne===r.UNSIGNED_SHORT&&(Se=r.R16UI),ne===r.UNSIGNED_INT&&(Se=r.R32UI),ne===r.BYTE&&(Se=r.R8I),ne===r.SHORT&&(Se=r.R16I),ne===r.INT&&(Se=r.R32I)),R===r.RG&&(ne===r.FLOAT&&(Se=r.RG32F),ne===r.HALF_FLOAT&&(Se=r.RG16F),ne===r.UNSIGNED_BYTE&&(Se=r.RG8)),R===r.RGBA){const Ge=_e?Xl:At.getTransfer(ye);ne===r.FLOAT&&(Se=r.RGBA32F),ne===r.HALF_FLOAT&&(Se=r.RGBA16F),ne===r.UNSIGNED_BYTE&&(Se=Ge===Dt?r.SRGB8_ALPHA8:r.RGBA8),ne===r.UNSIGNED_SHORT_4_4_4_4&&(Se=r.RGBA4),ne===r.UNSIGNED_SHORT_5_5_5_1&&(Se=r.RGB5_A1)}return(Se===r.R16F||Se===r.R32F||Se===r.RG16F||Se===r.RG32F||Se===r.RGBA16F||Se===r.RGBA32F)&&e.get("EXT_color_buffer_float"),Se}function B(N,R,ne){return A(N,ne)===!0||N.isFramebufferTexture&&N.minFilter!==wn&&N.minFilter!==On?Math.log2(Math.max(R.width,R.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?R.mipmaps.length:1}function U(N){return N===wn||N===jp||N===Wc?r.NEAREST:r.LINEAR}function I(N){const R=N.target;R.removeEventListener("dispose",I),E(R),R.isVideoTexture&&g.delete(R)}function Q(N){const R=N.target;R.removeEventListener("dispose",Q),$(R)}function E(N){const R=s.get(N);if(R.__webglInit===void 0)return;const ne=N.source,ye=_.get(ne);if(ye){const _e=ye[R.__cacheKey];_e.usedTimes--,_e.usedTimes===0&&C(N),Object.keys(ye).length===0&&_.delete(ne)}s.remove(N)}function C(N){const R=s.get(N);r.deleteTexture(R.__webglTexture);const ne=N.source,ye=_.get(ne);delete ye[R.__cacheKey],c.memory.textures--}function $(N){const R=N.texture,ne=s.get(N),ye=s.get(R);if(ye.__webglTexture!==void 0&&(r.deleteTexture(ye.__webglTexture),c.memory.textures--),N.depthTexture&&N.depthTexture.dispose(),N.isWebGLCubeRenderTarget)for(let _e=0;_e<6;_e++){if(Array.isArray(ne.__webglFramebuffer[_e]))for(let Se=0;Se<ne.__webglFramebuffer[_e].length;Se++)r.deleteFramebuffer(ne.__webglFramebuffer[_e][Se]);else r.deleteFramebuffer(ne.__webglFramebuffer[_e]);ne.__webglDepthbuffer&&r.deleteRenderbuffer(ne.__webglDepthbuffer[_e])}else{if(Array.isArray(ne.__webglFramebuffer))for(let _e=0;_e<ne.__webglFramebuffer.length;_e++)r.deleteFramebuffer(ne.__webglFramebuffer[_e]);else r.deleteFramebuffer(ne.__webglFramebuffer);if(ne.__webglDepthbuffer&&r.deleteRenderbuffer(ne.__webglDepthbuffer),ne.__webglMultisampledFramebuffer&&r.deleteFramebuffer(ne.__webglMultisampledFramebuffer),ne.__webglColorRenderbuffer)for(let _e=0;_e<ne.__webglColorRenderbuffer.length;_e++)ne.__webglColorRenderbuffer[_e]&&r.deleteRenderbuffer(ne.__webglColorRenderbuffer[_e]);ne.__webglDepthRenderbuffer&&r.deleteRenderbuffer(ne.__webglDepthRenderbuffer)}if(N.isWebGLMultipleRenderTargets)for(let _e=0,Se=R.length;_e<Se;_e++){const Ge=s.get(R[_e]);Ge.__webglTexture&&(r.deleteTexture(Ge.__webglTexture),c.memory.textures--),s.remove(R[_e])}s.remove(R),s.remove(N)}let oe=0;function de(){oe=0}function k(){const N=oe;return N>=o.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+N+" texture units while this GPU supports only "+o.maxTextures),oe+=1,N}function Y(N){const R=[];return R.push(N.wrapS),R.push(N.wrapT),R.push(N.wrapR||0),R.push(N.magFilter),R.push(N.minFilter),R.push(N.anisotropy),R.push(N.internalFormat),R.push(N.format),R.push(N.type),R.push(N.generateMipmaps),R.push(N.premultiplyAlpha),R.push(N.flipY),R.push(N.unpackAlignment),R.push(N.colorSpace),R.join()}function J(N,R){const ne=s.get(N);if(N.isVideoTexture&&Mt(N),N.isRenderTargetTexture===!1&&N.version>0&&ne.__version!==N.version){const ye=N.image;if(ye===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ye.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{he(ne,N,R);return}}t.bindTexture(r.TEXTURE_2D,ne.__webglTexture,r.TEXTURE0+R)}function ae(N,R){const ne=s.get(N);if(N.version>0&&ne.__version!==N.version){he(ne,N,R);return}t.bindTexture(r.TEXTURE_2D_ARRAY,ne.__webglTexture,r.TEXTURE0+R)}function W(N,R){const ne=s.get(N);if(N.version>0&&ne.__version!==N.version){he(ne,N,R);return}t.bindTexture(r.TEXTURE_3D,ne.__webglTexture,r.TEXTURE0+R)}function q(N,R){const ne=s.get(N);if(N.version>0&&ne.__version!==N.version){ve(ne,N,R);return}t.bindTexture(r.TEXTURE_CUBE_MAP,ne.__webglTexture,r.TEXTURE0+R)}const z={[jl]:r.REPEAT,[si]:r.CLAMP_TO_EDGE,[Ld]:r.MIRRORED_REPEAT},D={[wn]:r.NEAREST,[jp]:r.NEAREST_MIPMAP_NEAREST,[Wc]:r.NEAREST_MIPMAP_LINEAR,[On]:r.LINEAR,[dy]:r.LINEAR_MIPMAP_NEAREST,[ta]:r.LINEAR_MIPMAP_LINEAR},G={[Ey]:r.NEVER,[Ry]:r.ALWAYS,[Ty]:r.LESS,[Vg]:r.LEQUAL,[wy]:r.EQUAL,[by]:r.GEQUAL,[Ay]:r.GREATER,[Cy]:r.NOTEQUAL};function X(N,R,ne){if(ne?(r.texParameteri(N,r.TEXTURE_WRAP_S,z[R.wrapS]),r.texParameteri(N,r.TEXTURE_WRAP_T,z[R.wrapT]),(N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY)&&r.texParameteri(N,r.TEXTURE_WRAP_R,z[R.wrapR]),r.texParameteri(N,r.TEXTURE_MAG_FILTER,D[R.magFilter]),r.texParameteri(N,r.TEXTURE_MIN_FILTER,D[R.minFilter])):(r.texParameteri(N,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(N,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),(N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY)&&r.texParameteri(N,r.TEXTURE_WRAP_R,r.CLAMP_TO_EDGE),(R.wrapS!==si||R.wrapT!==si)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(N,r.TEXTURE_MAG_FILTER,U(R.magFilter)),r.texParameteri(N,r.TEXTURE_MIN_FILTER,U(R.minFilter)),R.minFilter!==wn&&R.minFilter!==On&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),R.compareFunction&&(r.texParameteri(N,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(N,r.TEXTURE_COMPARE_FUNC,G[R.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ye=e.get("EXT_texture_filter_anisotropic");if(R.magFilter===wn||R.minFilter!==Wc&&R.minFilter!==ta||R.type===Tr&&e.has("OES_texture_float_linear")===!1||d===!1&&R.type===na&&e.has("OES_texture_half_float_linear")===!1)return;(R.anisotropy>1||s.get(R).__currentAnisotropy)&&(r.texParameterf(N,ye.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(R.anisotropy,o.getMaxAnisotropy())),s.get(R).__currentAnisotropy=R.anisotropy)}}function te(N,R){let ne=!1;N.__webglInit===void 0&&(N.__webglInit=!0,R.addEventListener("dispose",I));const ye=R.source;let _e=_.get(ye);_e===void 0&&(_e={},_.set(ye,_e));const Se=Y(R);if(Se!==N.__cacheKey){_e[Se]===void 0&&(_e[Se]={texture:r.createTexture(),usedTimes:0},c.memory.textures++,ne=!0),_e[Se].usedTimes++;const Ge=_e[N.__cacheKey];Ge!==void 0&&(_e[N.__cacheKey].usedTimes--,Ge.usedTimes===0&&C(R)),N.__cacheKey=Se,N.__webglTexture=_e[Se].texture}return ne}function he(N,R,ne){let ye=r.TEXTURE_2D;(R.isDataArrayTexture||R.isCompressedArrayTexture)&&(ye=r.TEXTURE_2D_ARRAY),R.isData3DTexture&&(ye=r.TEXTURE_3D);const _e=te(N,R),Se=R.source;t.bindTexture(ye,N.__webglTexture,r.TEXTURE0+ne);const Ge=s.get(Se);if(Se.version!==Ge.__version||_e===!0){t.activeTexture(r.TEXTURE0+ne);const Re=At.getPrimaries(At.workingColorSpace),Oe=R.colorSpace===oi?null:At.getPrimaries(R.colorSpace),Xe=R.colorSpace===oi||Re===Oe?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,R.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,R.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Xe);const ot=y(R)&&x(R.image)===!1;let ge=M(R.image,ot,!1,o.maxTextureSize);ge=st(R,ge);const pt=x(ge)||d,dt=l.convert(R.format,R.colorSpace);let tt=l.convert(R.type),je=L(R.internalFormat,dt,tt,R.colorSpace,R.isVideoTexture);X(ye,R,pt);let ke;const it=R.mipmaps,gt=d&&R.isVideoTexture!==!0&&je!==zg,Ct=Ge.__version===void 0||_e===!0,at=B(R,ge,pt);if(R.isDepthTexture)je=r.DEPTH_COMPONENT,d?R.type===Tr?je=r.DEPTH_COMPONENT32F:R.type===Er?je=r.DEPTH_COMPONENT24:R.type===ns?je=r.DEPTH24_STENCIL8:je=r.DEPTH_COMPONENT16:R.type===Tr&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),R.format===is&&je===r.DEPTH_COMPONENT&&R.type!==zd&&R.type!==Er&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),R.type=Er,tt=l.convert(R.type)),R.format===no&&je===r.DEPTH_COMPONENT&&(je=r.DEPTH_STENCIL,R.type!==ns&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),R.type=ns,tt=l.convert(R.type))),Ct&&(gt?t.texStorage2D(r.TEXTURE_2D,1,je,ge.width,ge.height):t.texImage2D(r.TEXTURE_2D,0,je,ge.width,ge.height,0,dt,tt,null));else if(R.isDataTexture)if(it.length>0&&pt){gt&&Ct&&t.texStorage2D(r.TEXTURE_2D,at,je,it[0].width,it[0].height);for(let Te=0,V=it.length;Te<V;Te++)ke=it[Te],gt?t.texSubImage2D(r.TEXTURE_2D,Te,0,0,ke.width,ke.height,dt,tt,ke.data):t.texImage2D(r.TEXTURE_2D,Te,je,ke.width,ke.height,0,dt,tt,ke.data);R.generateMipmaps=!1}else gt?(Ct&&t.texStorage2D(r.TEXTURE_2D,at,je,ge.width,ge.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,ge.width,ge.height,dt,tt,ge.data)):t.texImage2D(r.TEXTURE_2D,0,je,ge.width,ge.height,0,dt,tt,ge.data);else if(R.isCompressedTexture)if(R.isCompressedArrayTexture){gt&&Ct&&t.texStorage3D(r.TEXTURE_2D_ARRAY,at,je,it[0].width,it[0].height,ge.depth);for(let Te=0,V=it.length;Te<V;Te++)ke=it[Te],R.format!==_i?dt!==null?gt?t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Te,0,0,0,ke.width,ke.height,ge.depth,dt,ke.data,0,0):t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Te,je,ke.width,ke.height,ge.depth,0,ke.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):gt?t.texSubImage3D(r.TEXTURE_2D_ARRAY,Te,0,0,0,ke.width,ke.height,ge.depth,dt,tt,ke.data):t.texImage3D(r.TEXTURE_2D_ARRAY,Te,je,ke.width,ke.height,ge.depth,0,dt,tt,ke.data)}else{gt&&Ct&&t.texStorage2D(r.TEXTURE_2D,at,je,it[0].width,it[0].height);for(let Te=0,V=it.length;Te<V;Te++)ke=it[Te],R.format!==_i?dt!==null?gt?t.compressedTexSubImage2D(r.TEXTURE_2D,Te,0,0,ke.width,ke.height,dt,ke.data):t.compressedTexImage2D(r.TEXTURE_2D,Te,je,ke.width,ke.height,0,ke.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):gt?t.texSubImage2D(r.TEXTURE_2D,Te,0,0,ke.width,ke.height,dt,tt,ke.data):t.texImage2D(r.TEXTURE_2D,Te,je,ke.width,ke.height,0,dt,tt,ke.data)}else if(R.isDataArrayTexture)gt?(Ct&&t.texStorage3D(r.TEXTURE_2D_ARRAY,at,je,ge.width,ge.height,ge.depth),t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,ge.width,ge.height,ge.depth,dt,tt,ge.data)):t.texImage3D(r.TEXTURE_2D_ARRAY,0,je,ge.width,ge.height,ge.depth,0,dt,tt,ge.data);else if(R.isData3DTexture)gt?(Ct&&t.texStorage3D(r.TEXTURE_3D,at,je,ge.width,ge.height,ge.depth),t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,ge.width,ge.height,ge.depth,dt,tt,ge.data)):t.texImage3D(r.TEXTURE_3D,0,je,ge.width,ge.height,ge.depth,0,dt,tt,ge.data);else if(R.isFramebufferTexture){if(Ct)if(gt)t.texStorage2D(r.TEXTURE_2D,at,je,ge.width,ge.height);else{let Te=ge.width,V=ge.height;for(let Ae=0;Ae<at;Ae++)t.texImage2D(r.TEXTURE_2D,Ae,je,Te,V,0,dt,tt,null),Te>>=1,V>>=1}}else if(it.length>0&&pt){gt&&Ct&&t.texStorage2D(r.TEXTURE_2D,at,je,it[0].width,it[0].height);for(let Te=0,V=it.length;Te<V;Te++)ke=it[Te],gt?t.texSubImage2D(r.TEXTURE_2D,Te,0,0,dt,tt,ke):t.texImage2D(r.TEXTURE_2D,Te,je,dt,tt,ke);R.generateMipmaps=!1}else gt?(Ct&&t.texStorage2D(r.TEXTURE_2D,at,je,ge.width,ge.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,dt,tt,ge)):t.texImage2D(r.TEXTURE_2D,0,je,dt,tt,ge);A(R,pt)&&b(ye),Ge.__version=Se.version,R.onUpdate&&R.onUpdate(R)}N.__version=R.version}function ve(N,R,ne){if(R.image.length!==6)return;const ye=te(N,R),_e=R.source;t.bindTexture(r.TEXTURE_CUBE_MAP,N.__webglTexture,r.TEXTURE0+ne);const Se=s.get(_e);if(_e.version!==Se.__version||ye===!0){t.activeTexture(r.TEXTURE0+ne);const Ge=At.getPrimaries(At.workingColorSpace),Re=R.colorSpace===oi?null:At.getPrimaries(R.colorSpace),Oe=R.colorSpace===oi||Ge===Re?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,R.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,R.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Oe);const Xe=R.isCompressedTexture||R.image[0].isCompressedTexture,ot=R.image[0]&&R.image[0].isDataTexture,ge=[];for(let Te=0;Te<6;Te++)!Xe&&!ot?ge[Te]=M(R.image[Te],!1,!0,o.maxCubemapSize):ge[Te]=ot?R.image[Te].image:R.image[Te],ge[Te]=st(R,ge[Te]);const pt=ge[0],dt=x(pt)||d,tt=l.convert(R.format,R.colorSpace),je=l.convert(R.type),ke=L(R.internalFormat,tt,je,R.colorSpace),it=d&&R.isVideoTexture!==!0,gt=Se.__version===void 0||ye===!0;let Ct=B(R,pt,dt);X(r.TEXTURE_CUBE_MAP,R,dt);let at;if(Xe){it&&gt&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Ct,ke,pt.width,pt.height);for(let Te=0;Te<6;Te++){at=ge[Te].mipmaps;for(let V=0;V<at.length;V++){const Ae=at[V];R.format!==_i?tt!==null?it?t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,V,0,0,Ae.width,Ae.height,tt,Ae.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,V,ke,Ae.width,Ae.height,0,Ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):it?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,V,0,0,Ae.width,Ae.height,tt,je,Ae.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,V,ke,Ae.width,Ae.height,0,tt,je,Ae.data)}}}else{at=R.mipmaps,it&&gt&&(at.length>0&&Ct++,t.texStorage2D(r.TEXTURE_CUBE_MAP,Ct,ke,ge[0].width,ge[0].height));for(let Te=0;Te<6;Te++)if(ot){it?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,0,0,ge[Te].width,ge[Te].height,tt,je,ge[Te].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,ke,ge[Te].width,ge[Te].height,0,tt,je,ge[Te].data);for(let V=0;V<at.length;V++){const be=at[V].image[Te].image;it?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,V+1,0,0,be.width,be.height,tt,je,be.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,V+1,ke,be.width,be.height,0,tt,je,be.data)}}else{it?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,0,0,tt,je,ge[Te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,ke,tt,je,ge[Te]);for(let V=0;V<at.length;V++){const Ae=at[V];it?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,V+1,0,0,tt,je,Ae.image[Te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Te,V+1,ke,tt,je,Ae.image[Te])}}}A(R,dt)&&b(r.TEXTURE_CUBE_MAP),Se.__version=_e.version,R.onUpdate&&R.onUpdate(R)}N.__version=R.version}function Me(N,R,ne,ye,_e,Se){const Ge=l.convert(ne.format,ne.colorSpace),Re=l.convert(ne.type),Oe=L(ne.internalFormat,Ge,Re,ne.colorSpace);if(!s.get(R).__hasExternalTextures){const ot=Math.max(1,R.width>>Se),ge=Math.max(1,R.height>>Se);_e===r.TEXTURE_3D||_e===r.TEXTURE_2D_ARRAY?t.texImage3D(_e,Se,Oe,ot,ge,R.depth,0,Ge,Re,null):t.texImage2D(_e,Se,Oe,ot,ge,0,Ge,Re,null)}t.bindFramebuffer(r.FRAMEBUFFER,N),Be(R)?f.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ye,_e,s.get(ne).__webglTexture,0,Ze(R)):(_e===r.TEXTURE_2D||_e>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&_e<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ye,_e,s.get(ne).__webglTexture,Se),t.bindFramebuffer(r.FRAMEBUFFER,null)}function we(N,R,ne){if(r.bindRenderbuffer(r.RENDERBUFFER,N),R.depthBuffer&&!R.stencilBuffer){let ye=d===!0?r.DEPTH_COMPONENT24:r.DEPTH_COMPONENT16;if(ne||Be(R)){const _e=R.depthTexture;_e&&_e.isDepthTexture&&(_e.type===Tr?ye=r.DEPTH_COMPONENT32F:_e.type===Er&&(ye=r.DEPTH_COMPONENT24));const Se=Ze(R);Be(R)?f.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Se,ye,R.width,R.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,Se,ye,R.width,R.height)}else r.renderbufferStorage(r.RENDERBUFFER,ye,R.width,R.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,N)}else if(R.depthBuffer&&R.stencilBuffer){const ye=Ze(R);ne&&Be(R)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,ye,r.DEPTH24_STENCIL8,R.width,R.height):Be(R)?f.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ye,r.DEPTH24_STENCIL8,R.width,R.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,N)}else{const ye=R.isWebGLMultipleRenderTargets===!0?R.texture:[R.texture];for(let _e=0;_e<ye.length;_e++){const Se=ye[_e],Ge=l.convert(Se.format,Se.colorSpace),Re=l.convert(Se.type),Oe=L(Se.internalFormat,Ge,Re,Se.colorSpace),Xe=Ze(R);ne&&Be(R)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Xe,Oe,R.width,R.height):Be(R)?f.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Xe,Oe,R.width,R.height):r.renderbufferStorage(r.RENDERBUFFER,Oe,R.width,R.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Pe(N,R){if(R&&R.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,N),!(R.depthTexture&&R.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!s.get(R.depthTexture).__webglTexture||R.depthTexture.image.width!==R.width||R.depthTexture.image.height!==R.height)&&(R.depthTexture.image.width=R.width,R.depthTexture.image.height=R.height,R.depthTexture.needsUpdate=!0),J(R.depthTexture,0);const ye=s.get(R.depthTexture).__webglTexture,_e=Ze(R);if(R.depthTexture.format===is)Be(R)?f.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ye,0,_e):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ye,0);else if(R.depthTexture.format===no)Be(R)?f.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ye,0,_e):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ye,0);else throw new Error("Unknown depthTexture format")}function Le(N){const R=s.get(N),ne=N.isWebGLCubeRenderTarget===!0;if(N.depthTexture&&!R.__autoAllocateDepthBuffer){if(ne)throw new Error("target.depthTexture not supported in Cube render targets");Pe(R.__webglFramebuffer,N)}else if(ne){R.__webglDepthbuffer=[];for(let ye=0;ye<6;ye++)t.bindFramebuffer(r.FRAMEBUFFER,R.__webglFramebuffer[ye]),R.__webglDepthbuffer[ye]=r.createRenderbuffer(),we(R.__webglDepthbuffer[ye],N,!1)}else t.bindFramebuffer(r.FRAMEBUFFER,R.__webglFramebuffer),R.__webglDepthbuffer=r.createRenderbuffer(),we(R.__webglDepthbuffer,N,!1);t.bindFramebuffer(r.FRAMEBUFFER,null)}function et(N,R,ne){const ye=s.get(N);R!==void 0&&Me(ye.__webglFramebuffer,N,N.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),ne!==void 0&&Le(N)}function ie(N){const R=N.texture,ne=s.get(N),ye=s.get(R);N.addEventListener("dispose",Q),N.isWebGLMultipleRenderTargets!==!0&&(ye.__webglTexture===void 0&&(ye.__webglTexture=r.createTexture()),ye.__version=R.version,c.memory.textures++);const _e=N.isWebGLCubeRenderTarget===!0,Se=N.isWebGLMultipleRenderTargets===!0,Ge=x(N)||d;if(_e){ne.__webglFramebuffer=[];for(let Re=0;Re<6;Re++)if(d&&R.mipmaps&&R.mipmaps.length>0){ne.__webglFramebuffer[Re]=[];for(let Oe=0;Oe<R.mipmaps.length;Oe++)ne.__webglFramebuffer[Re][Oe]=r.createFramebuffer()}else ne.__webglFramebuffer[Re]=r.createFramebuffer()}else{if(d&&R.mipmaps&&R.mipmaps.length>0){ne.__webglFramebuffer=[];for(let Re=0;Re<R.mipmaps.length;Re++)ne.__webglFramebuffer[Re]=r.createFramebuffer()}else ne.__webglFramebuffer=r.createFramebuffer();if(Se)if(o.drawBuffers){const Re=N.texture;for(let Oe=0,Xe=Re.length;Oe<Xe;Oe++){const ot=s.get(Re[Oe]);ot.__webglTexture===void 0&&(ot.__webglTexture=r.createTexture(),c.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(d&&N.samples>0&&Be(N)===!1){const Re=Se?R:[R];ne.__webglMultisampledFramebuffer=r.createFramebuffer(),ne.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,ne.__webglMultisampledFramebuffer);for(let Oe=0;Oe<Re.length;Oe++){const Xe=Re[Oe];ne.__webglColorRenderbuffer[Oe]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,ne.__webglColorRenderbuffer[Oe]);const ot=l.convert(Xe.format,Xe.colorSpace),ge=l.convert(Xe.type),pt=L(Xe.internalFormat,ot,ge,Xe.colorSpace,N.isXRRenderTarget===!0),dt=Ze(N);r.renderbufferStorageMultisample(r.RENDERBUFFER,dt,pt,N.width,N.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Oe,r.RENDERBUFFER,ne.__webglColorRenderbuffer[Oe])}r.bindRenderbuffer(r.RENDERBUFFER,null),N.depthBuffer&&(ne.__webglDepthRenderbuffer=r.createRenderbuffer(),we(ne.__webglDepthRenderbuffer,N,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(_e){t.bindTexture(r.TEXTURE_CUBE_MAP,ye.__webglTexture),X(r.TEXTURE_CUBE_MAP,R,Ge);for(let Re=0;Re<6;Re++)if(d&&R.mipmaps&&R.mipmaps.length>0)for(let Oe=0;Oe<R.mipmaps.length;Oe++)Me(ne.__webglFramebuffer[Re][Oe],N,R,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,Oe);else Me(ne.__webglFramebuffer[Re],N,R,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0);A(R,Ge)&&b(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Se){const Re=N.texture;for(let Oe=0,Xe=Re.length;Oe<Xe;Oe++){const ot=Re[Oe],ge=s.get(ot);t.bindTexture(r.TEXTURE_2D,ge.__webglTexture),X(r.TEXTURE_2D,ot,Ge),Me(ne.__webglFramebuffer,N,ot,r.COLOR_ATTACHMENT0+Oe,r.TEXTURE_2D,0),A(ot,Ge)&&b(r.TEXTURE_2D)}t.unbindTexture()}else{let Re=r.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(d?Re=N.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(Re,ye.__webglTexture),X(Re,R,Ge),d&&R.mipmaps&&R.mipmaps.length>0)for(let Oe=0;Oe<R.mipmaps.length;Oe++)Me(ne.__webglFramebuffer[Oe],N,R,r.COLOR_ATTACHMENT0,Re,Oe);else Me(ne.__webglFramebuffer,N,R,r.COLOR_ATTACHMENT0,Re,0);A(R,Ge)&&b(Re),t.unbindTexture()}N.depthBuffer&&Le(N)}function kt(N){const R=x(N)||d,ne=N.isWebGLMultipleRenderTargets===!0?N.texture:[N.texture];for(let ye=0,_e=ne.length;ye<_e;ye++){const Se=ne[ye];if(A(Se,R)){const Ge=N.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,Re=s.get(Se).__webglTexture;t.bindTexture(Ge,Re),b(Ge),t.unbindTexture()}}}function We(N){if(d&&N.samples>0&&Be(N)===!1){const R=N.isWebGLMultipleRenderTargets?N.texture:[N.texture],ne=N.width,ye=N.height;let _e=r.COLOR_BUFFER_BIT;const Se=[],Ge=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Re=s.get(N),Oe=N.isWebGLMultipleRenderTargets===!0;if(Oe)for(let Xe=0;Xe<R.length;Xe++)t.bindFramebuffer(r.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Xe,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,Re.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Xe,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,Re.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Re.__webglFramebuffer);for(let Xe=0;Xe<R.length;Xe++){Se.push(r.COLOR_ATTACHMENT0+Xe),N.depthBuffer&&Se.push(Ge);const ot=Re.__ignoreDepthValues!==void 0?Re.__ignoreDepthValues:!1;if(ot===!1&&(N.depthBuffer&&(_e|=r.DEPTH_BUFFER_BIT),N.stencilBuffer&&(_e|=r.STENCIL_BUFFER_BIT)),Oe&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Re.__webglColorRenderbuffer[Xe]),ot===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[Ge]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[Ge])),Oe){const ge=s.get(R[Xe]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,ge,0)}r.blitFramebuffer(0,0,ne,ye,0,0,ne,ye,_e,r.NEAREST),h&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Se)}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),Oe)for(let Xe=0;Xe<R.length;Xe++){t.bindFramebuffer(r.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Xe,r.RENDERBUFFER,Re.__webglColorRenderbuffer[Xe]);const ot=s.get(R[Xe]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,Re.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Xe,r.TEXTURE_2D,ot,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Re.__webglMultisampledFramebuffer)}}function Ze(N){return Math.min(o.maxSamples,N.samples)}function Be(N){const R=s.get(N);return d&&N.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&R.__useRenderToTexture!==!1}function Mt(N){const R=c.render.frame;g.get(N)!==R&&(g.set(N,R),N.update())}function st(N,R){const ne=N.colorSpace,ye=N.format,_e=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||N.format===Pd||ne!==$i&&ne!==oi&&(At.getTransfer(ne)===Dt?d===!1?e.has("EXT_sRGB")===!0&&ye===_i?(N.format=Pd,N.minFilter=On,N.generateMipmaps=!1):R=jg.sRGBToLinear(R):(ye!==_i||_e!==Cr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",ne)),R}this.allocateTextureUnit=k,this.resetTextureUnits=de,this.setTexture2D=J,this.setTexture2DArray=ae,this.setTexture3D=W,this.setTextureCube=q,this.rebindTextures=et,this.setupRenderTarget=ie,this.updateRenderTargetMipmap=kt,this.updateMultisampleRenderTarget=We,this.setupDepthRenderbuffer=Le,this.setupFrameBufferTexture=Me,this.useMultisampledRTT=Be}function PT(r,e,t){const s=t.isWebGL2;function o(l,c=oi){let d;const f=At.getTransfer(c);if(l===Cr)return r.UNSIGNED_BYTE;if(l===Ug)return r.UNSIGNED_SHORT_4_4_4_4;if(l===Og)return r.UNSIGNED_SHORT_5_5_5_1;if(l===fy)return r.BYTE;if(l===hy)return r.SHORT;if(l===zd)return r.UNSIGNED_SHORT;if(l===Ng)return r.INT;if(l===Er)return r.UNSIGNED_INT;if(l===Tr)return r.FLOAT;if(l===na)return s?r.HALF_FLOAT:(d=e.get("OES_texture_half_float"),d!==null?d.HALF_FLOAT_OES:null);if(l===py)return r.ALPHA;if(l===_i)return r.RGBA;if(l===my)return r.LUMINANCE;if(l===gy)return r.LUMINANCE_ALPHA;if(l===is)return r.DEPTH_COMPONENT;if(l===no)return r.DEPTH_STENCIL;if(l===Pd)return d=e.get("EXT_sRGB"),d!==null?d.SRGB_ALPHA_EXT:null;if(l===vy)return r.RED;if(l===Fg)return r.RED_INTEGER;if(l===_y)return r.RG;if(l===kg)return r.RG_INTEGER;if(l===Bg)return r.RGBA_INTEGER;if(l===jc||l===Xc||l===Yc||l===qc)if(f===Dt)if(d=e.get("WEBGL_compressed_texture_s3tc_srgb"),d!==null){if(l===jc)return d.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(l===Xc)return d.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(l===Yc)return d.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(l===qc)return d.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(d=e.get("WEBGL_compressed_texture_s3tc"),d!==null){if(l===jc)return d.COMPRESSED_RGB_S3TC_DXT1_EXT;if(l===Xc)return d.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(l===Yc)return d.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(l===qc)return d.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(l===Xp||l===Yp||l===qp||l===$p)if(d=e.get("WEBGL_compressed_texture_pvrtc"),d!==null){if(l===Xp)return d.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(l===Yp)return d.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(l===qp)return d.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(l===$p)return d.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(l===zg)return d=e.get("WEBGL_compressed_texture_etc1"),d!==null?d.COMPRESSED_RGB_ETC1_WEBGL:null;if(l===Kp||l===Zp)if(d=e.get("WEBGL_compressed_texture_etc"),d!==null){if(l===Kp)return f===Dt?d.COMPRESSED_SRGB8_ETC2:d.COMPRESSED_RGB8_ETC2;if(l===Zp)return f===Dt?d.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:d.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(l===Qp||l===Jp||l===em||l===tm||l===nm||l===im||l===rm||l===sm||l===om||l===am||l===lm||l===um||l===cm||l===dm)if(d=e.get("WEBGL_compressed_texture_astc"),d!==null){if(l===Qp)return f===Dt?d.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:d.COMPRESSED_RGBA_ASTC_4x4_KHR;if(l===Jp)return f===Dt?d.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:d.COMPRESSED_RGBA_ASTC_5x4_KHR;if(l===em)return f===Dt?d.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:d.COMPRESSED_RGBA_ASTC_5x5_KHR;if(l===tm)return f===Dt?d.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:d.COMPRESSED_RGBA_ASTC_6x5_KHR;if(l===nm)return f===Dt?d.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:d.COMPRESSED_RGBA_ASTC_6x6_KHR;if(l===im)return f===Dt?d.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:d.COMPRESSED_RGBA_ASTC_8x5_KHR;if(l===rm)return f===Dt?d.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:d.COMPRESSED_RGBA_ASTC_8x6_KHR;if(l===sm)return f===Dt?d.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:d.COMPRESSED_RGBA_ASTC_8x8_KHR;if(l===om)return f===Dt?d.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:d.COMPRESSED_RGBA_ASTC_10x5_KHR;if(l===am)return f===Dt?d.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:d.COMPRESSED_RGBA_ASTC_10x6_KHR;if(l===lm)return f===Dt?d.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:d.COMPRESSED_RGBA_ASTC_10x8_KHR;if(l===um)return f===Dt?d.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:d.COMPRESSED_RGBA_ASTC_10x10_KHR;if(l===cm)return f===Dt?d.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:d.COMPRESSED_RGBA_ASTC_12x10_KHR;if(l===dm)return f===Dt?d.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:d.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(l===$c||l===fm||l===hm)if(d=e.get("EXT_texture_compression_bptc"),d!==null){if(l===$c)return f===Dt?d.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:d.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(l===fm)return d.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(l===hm)return d.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(l===xy||l===pm||l===mm||l===gm)if(d=e.get("EXT_texture_compression_rgtc"),d!==null){if(l===$c)return d.COMPRESSED_RED_RGTC1_EXT;if(l===pm)return d.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(l===mm)return d.COMPRESSED_RED_GREEN_RGTC2_EXT;if(l===gm)return d.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return l===ns?s?r.UNSIGNED_INT_24_8:(d=e.get("WEBGL_depth_texture"),d!==null?d.UNSIGNED_INT_24_8_WEBGL:null):r[l]!==void 0?r[l]:null}return{convert:o}}class DT extends ri{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Gl extends un{constructor(){super(),this.isGroup=!0,this.type="Group"}}const IT={type:"move"};class yd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Gl,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Gl,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new ue,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new ue),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Gl,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new ue,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new ue),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const s of e.hand.values())this._getHandJoint(t,s)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,s){let o=null,l=null,c=null;const d=this._targetRay,f=this._grip,h=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(h&&e.hand){c=!0;for(const M of e.hand.values()){const x=t.getJointPose(M,s),y=this._getHandJoint(h,M);x!==null&&(y.matrix.fromArray(x.transform.matrix),y.matrix.decompose(y.position,y.rotation,y.scale),y.matrixWorldNeedsUpdate=!0,y.jointRadius=x.radius),y.visible=x!==null}const g=h.joints["index-finger-tip"],m=h.joints["thumb-tip"],_=g.position.distanceTo(m.position),S=.02,w=.005;h.inputState.pinching&&_>S+w?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!h.inputState.pinching&&_<=S-w&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else f!==null&&e.gripSpace&&(l=t.getPose(e.gripSpace,s),l!==null&&(f.matrix.fromArray(l.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,l.linearVelocity?(f.hasLinearVelocity=!0,f.linearVelocity.copy(l.linearVelocity)):f.hasLinearVelocity=!1,l.angularVelocity?(f.hasAngularVelocity=!0,f.angularVelocity.copy(l.angularVelocity)):f.hasAngularVelocity=!1));d!==null&&(o=t.getPose(e.targetRaySpace,s),o===null&&l!==null&&(o=l),o!==null&&(d.matrix.fromArray(o.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,o.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(o.linearVelocity)):d.hasLinearVelocity=!1,o.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(o.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(IT)))}return d!==null&&(d.visible=o!==null),f!==null&&(f.visible=l!==null),h!==null&&(h.visible=c!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const s=new Gl;s.matrixAutoUpdate=!1,s.visible=!1,e.joints[t.jointName]=s,e.add(s)}return e.joints[t.jointName]}}class NT extends oo{constructor(e,t){super();const s=this;let o=null,l=1,c=null,d="local-floor",f=1,h=null,g=null,m=null,_=null,S=null,w=null;const M=t.getContextAttributes();let x=null,y=null;const A=[],b=[],L=new St;let B=null;const U=new ri;U.layers.enable(1),U.viewport=new sn;const I=new ri;I.layers.enable(2),I.viewport=new sn;const Q=[U,I],E=new DT;E.layers.enable(1),E.layers.enable(2);let C=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let te=A[X];return te===void 0&&(te=new yd,A[X]=te),te.getTargetRaySpace()},this.getControllerGrip=function(X){let te=A[X];return te===void 0&&(te=new yd,A[X]=te),te.getGripSpace()},this.getHand=function(X){let te=A[X];return te===void 0&&(te=new yd,A[X]=te),te.getHandSpace()};function oe(X){const te=b.indexOf(X.inputSource);if(te===-1)return;const he=A[te];he!==void 0&&(he.update(X.inputSource,X.frame,h||c),he.dispatchEvent({type:X.type,data:X.inputSource}))}function de(){o.removeEventListener("select",oe),o.removeEventListener("selectstart",oe),o.removeEventListener("selectend",oe),o.removeEventListener("squeeze",oe),o.removeEventListener("squeezestart",oe),o.removeEventListener("squeezeend",oe),o.removeEventListener("end",de),o.removeEventListener("inputsourceschange",k);for(let X=0;X<A.length;X++){const te=b[X];te!==null&&(b[X]=null,A[X].disconnect(te))}C=null,$=null,e.setRenderTarget(x),S=null,_=null,m=null,o=null,y=null,G.stop(),s.isPresenting=!1,e.setPixelRatio(B),e.setSize(L.width,L.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){l=X,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){d=X,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||c},this.setReferenceSpace=function(X){h=X},this.getBaseLayer=function(){return _!==null?_:S},this.getBinding=function(){return m},this.getFrame=function(){return w},this.getSession=function(){return o},this.setSession=async function(X){if(o=X,o!==null){if(x=e.getRenderTarget(),o.addEventListener("select",oe),o.addEventListener("selectstart",oe),o.addEventListener("selectend",oe),o.addEventListener("squeeze",oe),o.addEventListener("squeezestart",oe),o.addEventListener("squeezeend",oe),o.addEventListener("end",de),o.addEventListener("inputsourceschange",k),M.xrCompatible!==!0&&await t.makeXRCompatible(),B=e.getPixelRatio(),e.getSize(L),o.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const te={antialias:o.renderState.layers===void 0?M.antialias:!0,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:l};S=new XRWebGLLayer(o,t,te),o.updateRenderState({baseLayer:S}),e.setPixelRatio(1),e.setSize(S.framebufferWidth,S.framebufferHeight,!1),y=new ss(S.framebufferWidth,S.framebufferHeight,{format:_i,type:Cr,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil})}else{let te=null,he=null,ve=null;M.depth&&(ve=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,te=M.stencil?no:is,he=M.stencil?ns:Er);const Me={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:l};m=new XRWebGLBinding(o,t),_=m.createProjectionLayer(Me),o.updateRenderState({layers:[_]}),e.setPixelRatio(1),e.setSize(_.textureWidth,_.textureHeight,!1),y=new ss(_.textureWidth,_.textureHeight,{format:_i,type:Cr,depthTexture:new r0(_.textureWidth,_.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0});const we=e.properties.get(y);we.__ignoreDepthValues=_.ignoreDepthValues}y.isXRRenderTarget=!0,this.setFoveation(f),h=null,c=await o.requestReferenceSpace(d),G.setContext(o),G.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode};function k(X){for(let te=0;te<X.removed.length;te++){const he=X.removed[te],ve=b.indexOf(he);ve>=0&&(b[ve]=null,A[ve].disconnect(he))}for(let te=0;te<X.added.length;te++){const he=X.added[te];let ve=b.indexOf(he);if(ve===-1){for(let we=0;we<A.length;we++)if(we>=b.length){b.push(he),ve=we;break}else if(b[we]===null){b[we]=he,ve=we;break}if(ve===-1)break}const Me=A[ve];Me&&Me.connect(he)}}const Y=new ue,J=new ue;function ae(X,te,he){Y.setFromMatrixPosition(te.matrixWorld),J.setFromMatrixPosition(he.matrixWorld);const ve=Y.distanceTo(J),Me=te.projectionMatrix.elements,we=he.projectionMatrix.elements,Pe=Me[14]/(Me[10]-1),Le=Me[14]/(Me[10]+1),et=(Me[9]+1)/Me[5],ie=(Me[9]-1)/Me[5],kt=(Me[8]-1)/Me[0],We=(we[8]+1)/we[0],Ze=Pe*kt,Be=Pe*We,Mt=ve/(-kt+We),st=Mt*-kt;te.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(st),X.translateZ(Mt),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert();const N=Pe+Mt,R=Le+Mt,ne=Ze-st,ye=Be+(ve-st),_e=et*Le/R*N,Se=ie*Le/R*N;X.projectionMatrix.makePerspective(ne,ye,_e,Se,N,R),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}function W(X,te){te===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(te.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(o===null)return;E.near=I.near=U.near=X.near,E.far=I.far=U.far=X.far,(C!==E.near||$!==E.far)&&(o.updateRenderState({depthNear:E.near,depthFar:E.far}),C=E.near,$=E.far);const te=X.parent,he=E.cameras;W(E,te);for(let ve=0;ve<he.length;ve++)W(he[ve],te);he.length===2?ae(E,U,I):E.projectionMatrix.copy(U.projectionMatrix),q(X,E,te)};function q(X,te,he){he===null?X.matrix.copy(te.matrixWorld):(X.matrix.copy(he.matrixWorld),X.matrix.invert(),X.matrix.multiply(te.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(te.projectionMatrix),X.projectionMatrixInverse.copy(te.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Dd*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(_===null&&S===null))return f},this.setFoveation=function(X){f=X,_!==null&&(_.fixedFoveation=X),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=X)};let z=null;function D(X,te){if(g=te.getViewerPose(h||c),w=te,g!==null){const he=g.views;S!==null&&(e.setRenderTargetFramebuffer(y,S.framebuffer),e.setRenderTarget(y));let ve=!1;he.length!==E.cameras.length&&(E.cameras.length=0,ve=!0);for(let Me=0;Me<he.length;Me++){const we=he[Me];let Pe=null;if(S!==null)Pe=S.getViewport(we);else{const et=m.getViewSubImage(_,we);Pe=et.viewport,Me===0&&(e.setRenderTargetTextures(y,et.colorTexture,_.ignoreDepthValues?void 0:et.depthStencilTexture),e.setRenderTarget(y))}let Le=Q[Me];Le===void 0&&(Le=new ri,Le.layers.enable(Me),Le.viewport=new sn,Q[Me]=Le),Le.matrix.fromArray(we.transform.matrix),Le.matrix.decompose(Le.position,Le.quaternion,Le.scale),Le.projectionMatrix.fromArray(we.projectionMatrix),Le.projectionMatrixInverse.copy(Le.projectionMatrix).invert(),Le.viewport.set(Pe.x,Pe.y,Pe.width,Pe.height),Me===0&&(E.matrix.copy(Le.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),ve===!0&&E.cameras.push(Le)}}for(let he=0;he<A.length;he++){const ve=b[he],Me=A[he];ve!==null&&Me!==void 0&&Me.update(ve,te,h||c)}z&&z(X,te),te.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:te}),w=null}const G=new n0;G.setAnimationLoop(D),this.setAnimationLoop=function(X){z=X},this.dispose=function(){}}}function UT(r,e){function t(x,y){x.matrixAutoUpdate===!0&&x.updateMatrix(),y.value.copy(x.matrix)}function s(x,y){y.color.getRGB(x.fogColor.value,Jg(r)),y.isFog?(x.fogNear.value=y.near,x.fogFar.value=y.far):y.isFogExp2&&(x.fogDensity.value=y.density)}function o(x,y,A,b,L){y.isMeshBasicMaterial||y.isMeshLambertMaterial?l(x,y):y.isMeshToonMaterial?(l(x,y),m(x,y)):y.isMeshPhongMaterial?(l(x,y),g(x,y)):y.isMeshStandardMaterial?(l(x,y),_(x,y),y.isMeshPhysicalMaterial&&S(x,y,L)):y.isMeshMatcapMaterial?(l(x,y),w(x,y)):y.isMeshDepthMaterial?l(x,y):y.isMeshDistanceMaterial?(l(x,y),M(x,y)):y.isMeshNormalMaterial?l(x,y):y.isLineBasicMaterial?(c(x,y),y.isLineDashedMaterial&&d(x,y)):y.isPointsMaterial?f(x,y,A,b):y.isSpriteMaterial?h(x,y):y.isShadowMaterial?(x.color.value.copy(y.color),x.opacity.value=y.opacity):y.isShaderMaterial&&(y.uniformsNeedUpdate=!1)}function l(x,y){x.opacity.value=y.opacity,y.color&&x.diffuse.value.copy(y.color),y.emissive&&x.emissive.value.copy(y.emissive).multiplyScalar(y.emissiveIntensity),y.map&&(x.map.value=y.map,t(y.map,x.mapTransform)),y.alphaMap&&(x.alphaMap.value=y.alphaMap,t(y.alphaMap,x.alphaMapTransform)),y.bumpMap&&(x.bumpMap.value=y.bumpMap,t(y.bumpMap,x.bumpMapTransform),x.bumpScale.value=y.bumpScale,y.side===kn&&(x.bumpScale.value*=-1)),y.normalMap&&(x.normalMap.value=y.normalMap,t(y.normalMap,x.normalMapTransform),x.normalScale.value.copy(y.normalScale),y.side===kn&&x.normalScale.value.negate()),y.displacementMap&&(x.displacementMap.value=y.displacementMap,t(y.displacementMap,x.displacementMapTransform),x.displacementScale.value=y.displacementScale,x.displacementBias.value=y.displacementBias),y.emissiveMap&&(x.emissiveMap.value=y.emissiveMap,t(y.emissiveMap,x.emissiveMapTransform)),y.specularMap&&(x.specularMap.value=y.specularMap,t(y.specularMap,x.specularMapTransform)),y.alphaTest>0&&(x.alphaTest.value=y.alphaTest);const A=e.get(y).envMap;if(A&&(x.envMap.value=A,x.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=y.reflectivity,x.ior.value=y.ior,x.refractionRatio.value=y.refractionRatio),y.lightMap){x.lightMap.value=y.lightMap;const b=r._useLegacyLights===!0?Math.PI:1;x.lightMapIntensity.value=y.lightMapIntensity*b,t(y.lightMap,x.lightMapTransform)}y.aoMap&&(x.aoMap.value=y.aoMap,x.aoMapIntensity.value=y.aoMapIntensity,t(y.aoMap,x.aoMapTransform))}function c(x,y){x.diffuse.value.copy(y.color),x.opacity.value=y.opacity,y.map&&(x.map.value=y.map,t(y.map,x.mapTransform))}function d(x,y){x.dashSize.value=y.dashSize,x.totalSize.value=y.dashSize+y.gapSize,x.scale.value=y.scale}function f(x,y,A,b){x.diffuse.value.copy(y.color),x.opacity.value=y.opacity,x.size.value=y.size*A,x.scale.value=b*.5,y.map&&(x.map.value=y.map,t(y.map,x.uvTransform)),y.alphaMap&&(x.alphaMap.value=y.alphaMap,t(y.alphaMap,x.alphaMapTransform)),y.alphaTest>0&&(x.alphaTest.value=y.alphaTest)}function h(x,y){x.diffuse.value.copy(y.color),x.opacity.value=y.opacity,x.rotation.value=y.rotation,y.map&&(x.map.value=y.map,t(y.map,x.mapTransform)),y.alphaMap&&(x.alphaMap.value=y.alphaMap,t(y.alphaMap,x.alphaMapTransform)),y.alphaTest>0&&(x.alphaTest.value=y.alphaTest)}function g(x,y){x.specular.value.copy(y.specular),x.shininess.value=Math.max(y.shininess,1e-4)}function m(x,y){y.gradientMap&&(x.gradientMap.value=y.gradientMap)}function _(x,y){x.metalness.value=y.metalness,y.metalnessMap&&(x.metalnessMap.value=y.metalnessMap,t(y.metalnessMap,x.metalnessMapTransform)),x.roughness.value=y.roughness,y.roughnessMap&&(x.roughnessMap.value=y.roughnessMap,t(y.roughnessMap,x.roughnessMapTransform)),e.get(y).envMap&&(x.envMapIntensity.value=y.envMapIntensity)}function S(x,y,A){x.ior.value=y.ior,y.sheen>0&&(x.sheenColor.value.copy(y.sheenColor).multiplyScalar(y.sheen),x.sheenRoughness.value=y.sheenRoughness,y.sheenColorMap&&(x.sheenColorMap.value=y.sheenColorMap,t(y.sheenColorMap,x.sheenColorMapTransform)),y.sheenRoughnessMap&&(x.sheenRoughnessMap.value=y.sheenRoughnessMap,t(y.sheenRoughnessMap,x.sheenRoughnessMapTransform))),y.clearcoat>0&&(x.clearcoat.value=y.clearcoat,x.clearcoatRoughness.value=y.clearcoatRoughness,y.clearcoatMap&&(x.clearcoatMap.value=y.clearcoatMap,t(y.clearcoatMap,x.clearcoatMapTransform)),y.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=y.clearcoatRoughnessMap,t(y.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),y.clearcoatNormalMap&&(x.clearcoatNormalMap.value=y.clearcoatNormalMap,t(y.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(y.clearcoatNormalScale),y.side===kn&&x.clearcoatNormalScale.value.negate())),y.iridescence>0&&(x.iridescence.value=y.iridescence,x.iridescenceIOR.value=y.iridescenceIOR,x.iridescenceThicknessMinimum.value=y.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=y.iridescenceThicknessRange[1],y.iridescenceMap&&(x.iridescenceMap.value=y.iridescenceMap,t(y.iridescenceMap,x.iridescenceMapTransform)),y.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=y.iridescenceThicknessMap,t(y.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),y.transmission>0&&(x.transmission.value=y.transmission,x.transmissionSamplerMap.value=A.texture,x.transmissionSamplerSize.value.set(A.width,A.height),y.transmissionMap&&(x.transmissionMap.value=y.transmissionMap,t(y.transmissionMap,x.transmissionMapTransform)),x.thickness.value=y.thickness,y.thicknessMap&&(x.thicknessMap.value=y.thicknessMap,t(y.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=y.attenuationDistance,x.attenuationColor.value.copy(y.attenuationColor)),y.anisotropy>0&&(x.anisotropyVector.value.set(y.anisotropy*Math.cos(y.anisotropyRotation),y.anisotropy*Math.sin(y.anisotropyRotation)),y.anisotropyMap&&(x.anisotropyMap.value=y.anisotropyMap,t(y.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=y.specularIntensity,x.specularColor.value.copy(y.specularColor),y.specularColorMap&&(x.specularColorMap.value=y.specularColorMap,t(y.specularColorMap,x.specularColorMapTransform)),y.specularIntensityMap&&(x.specularIntensityMap.value=y.specularIntensityMap,t(y.specularIntensityMap,x.specularIntensityMapTransform))}function w(x,y){y.matcap&&(x.matcap.value=y.matcap)}function M(x,y){const A=e.get(y).light;x.referencePosition.value.setFromMatrixPosition(A.matrixWorld),x.nearDistance.value=A.shadow.camera.near,x.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:o}}function OT(r,e,t,s){let o={},l={},c=[];const d=t.isWebGL2?r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS):0;function f(A,b){const L=b.program;s.uniformBlockBinding(A,L)}function h(A,b){let L=o[A.id];L===void 0&&(w(A),L=g(A),o[A.id]=L,A.addEventListener("dispose",x));const B=b.program;s.updateUBOMapping(A,B);const U=e.render.frame;l[A.id]!==U&&(_(A),l[A.id]=U)}function g(A){const b=m();A.__bindingPointIndex=b;const L=r.createBuffer(),B=A.__size,U=A.usage;return r.bindBuffer(r.UNIFORM_BUFFER,L),r.bufferData(r.UNIFORM_BUFFER,B,U),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,b,L),L}function m(){for(let A=0;A<d;A++)if(c.indexOf(A)===-1)return c.push(A),A;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function _(A){const b=o[A.id],L=A.uniforms,B=A.__cache;r.bindBuffer(r.UNIFORM_BUFFER,b);for(let U=0,I=L.length;U<I;U++){const Q=Array.isArray(L[U])?L[U]:[L[U]];for(let E=0,C=Q.length;E<C;E++){const $=Q[E];if(S($,U,E,B)===!0){const oe=$.__offset,de=Array.isArray($.value)?$.value:[$.value];let k=0;for(let Y=0;Y<de.length;Y++){const J=de[Y],ae=M(J);typeof J=="number"||typeof J=="boolean"?($.__data[0]=J,r.bufferSubData(r.UNIFORM_BUFFER,oe+k,$.__data)):J.isMatrix3?($.__data[0]=J.elements[0],$.__data[1]=J.elements[1],$.__data[2]=J.elements[2],$.__data[3]=0,$.__data[4]=J.elements[3],$.__data[5]=J.elements[4],$.__data[6]=J.elements[5],$.__data[7]=0,$.__data[8]=J.elements[6],$.__data[9]=J.elements[7],$.__data[10]=J.elements[8],$.__data[11]=0):(J.toArray($.__data,k),k+=ae.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,oe,$.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function S(A,b,L,B){const U=A.value,I=b+"_"+L;if(B[I]===void 0)return typeof U=="number"||typeof U=="boolean"?B[I]=U:B[I]=U.clone(),!0;{const Q=B[I];if(typeof U=="number"||typeof U=="boolean"){if(Q!==U)return B[I]=U,!0}else if(Q.equals(U)===!1)return Q.copy(U),!0}return!1}function w(A){const b=A.uniforms;let L=0;const B=16;for(let I=0,Q=b.length;I<Q;I++){const E=Array.isArray(b[I])?b[I]:[b[I]];for(let C=0,$=E.length;C<$;C++){const oe=E[C],de=Array.isArray(oe.value)?oe.value:[oe.value];for(let k=0,Y=de.length;k<Y;k++){const J=de[k],ae=M(J),W=L%B;W!==0&&B-W<ae.boundary&&(L+=B-W),oe.__data=new Float32Array(ae.storage/Float32Array.BYTES_PER_ELEMENT),oe.__offset=L,L+=ae.storage}}}const U=L%B;return U>0&&(L+=B-U),A.__size=L,A.__cache={},this}function M(A){const b={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(b.boundary=4,b.storage=4):A.isVector2?(b.boundary=8,b.storage=8):A.isVector3||A.isColor?(b.boundary=16,b.storage=12):A.isVector4?(b.boundary=16,b.storage=16):A.isMatrix3?(b.boundary=48,b.storage=48):A.isMatrix4?(b.boundary=64,b.storage=64):A.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",A),b}function x(A){const b=A.target;b.removeEventListener("dispose",x);const L=c.indexOf(b.__bindingPointIndex);c.splice(L,1),r.deleteBuffer(o[b.id]),delete o[b.id],delete l[b.id]}function y(){for(const A in o)r.deleteBuffer(o[A]);c=[],o={},l={}}return{bind:f,update:h,dispose:y}}class c0{constructor(e={}){const{canvas:t=Py(),context:s=null,depth:o=!0,stencil:l=!0,alpha:c=!1,antialias:d=!1,premultipliedAlpha:f=!0,preserveDrawingBuffer:h=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:m=!1}=e;this.isWebGLRenderer=!0;let _;s!==null?_=s.getContextAttributes().alpha:_=c;const S=new Uint32Array(4),w=new Int32Array(4);let M=null,x=null;const y=[],A=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ln,this._useLegacyLights=!1,this.toneMapping=Ar,this.toneMappingExposure=1;const b=this;let L=!1,B=0,U=0,I=null,Q=-1,E=null;const C=new sn,$=new sn;let oe=null;const de=new yt(0);let k=0,Y=t.width,J=t.height,ae=1,W=null,q=null;const z=new sn(0,0,Y,J),D=new sn(0,0,Y,J);let G=!1;const X=new Vd;let te=!1,he=!1,ve=null;const Me=new Kt,we=new St,Pe=new ue,Le={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function et(){return I===null?ae:1}let ie=s;function kt(P,Z){for(let le=0;le<P.length;le++){const ce=P[le],se=t.getContext(ce,Z);if(se!==null)return se}return null}try{const P={alpha:!0,depth:o,stencil:l,antialias:d,premultipliedAlpha:f,preserveDrawingBuffer:h,powerPreference:g,failIfMajorPerformanceCaveat:m};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Bd}`),t.addEventListener("webglcontextlost",Te,!1),t.addEventListener("webglcontextrestored",V,!1),t.addEventListener("webglcontextcreationerror",Ae,!1),ie===null){const Z=["webgl2","webgl","experimental-webgl"];if(b.isWebGL1Renderer===!0&&Z.shift(),ie=kt(Z,P),ie===null)throw kt(Z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&ie instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),ie.getShaderPrecisionFormat===void 0&&(ie.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(P){throw console.error("THREE.WebGLRenderer: "+P.message),P}let We,Ze,Be,Mt,st,N,R,ne,ye,_e,Se,Ge,Re,Oe,Xe,ot,ge,pt,dt,tt,je,ke,it,gt;function Ct(){We=new XE(ie),Ze=new zE(ie,We,e),We.init(Ze),ke=new PT(ie,We,Ze),Be=new RT(ie,We,Ze),Mt=new $E(ie),st=new mT,N=new LT(ie,We,Be,st,Ze,ke,Mt),R=new GE(b),ne=new jE(b),ye=new iS(ie,Ze),it=new kE(ie,We,ye,Ze),_e=new YE(ie,ye,Mt,it),Se=new JE(ie,_e,ye,Mt),dt=new QE(ie,Ze,N),ot=new HE(st),Ge=new pT(b,R,ne,We,Ze,it,ot),Re=new UT(b,st),Oe=new vT,Xe=new ET(We,Ze),pt=new FE(b,R,ne,Be,Se,_,f),ge=new bT(b,Se,Ze),gt=new OT(ie,Mt,Ze,Be),tt=new BE(ie,We,Mt,Ze),je=new qE(ie,We,Mt,Ze),Mt.programs=Ge.programs,b.capabilities=Ze,b.extensions=We,b.properties=st,b.renderLists=Oe,b.shadowMap=ge,b.state=Be,b.info=Mt}Ct();const at=new NT(b,ie);this.xr=at,this.getContext=function(){return ie},this.getContextAttributes=function(){return ie.getContextAttributes()},this.forceContextLoss=function(){const P=We.get("WEBGL_lose_context");P&&P.loseContext()},this.forceContextRestore=function(){const P=We.get("WEBGL_lose_context");P&&P.restoreContext()},this.getPixelRatio=function(){return ae},this.setPixelRatio=function(P){P!==void 0&&(ae=P,this.setSize(Y,J,!1))},this.getSize=function(P){return P.set(Y,J)},this.setSize=function(P,Z,le=!0){if(at.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=P,J=Z,t.width=Math.floor(P*ae),t.height=Math.floor(Z*ae),le===!0&&(t.style.width=P+"px",t.style.height=Z+"px"),this.setViewport(0,0,P,Z)},this.getDrawingBufferSize=function(P){return P.set(Y*ae,J*ae).floor()},this.setDrawingBufferSize=function(P,Z,le){Y=P,J=Z,ae=le,t.width=Math.floor(P*le),t.height=Math.floor(Z*le),this.setViewport(0,0,P,Z)},this.getCurrentViewport=function(P){return P.copy(C)},this.getViewport=function(P){return P.copy(z)},this.setViewport=function(P,Z,le,ce){P.isVector4?z.set(P.x,P.y,P.z,P.w):z.set(P,Z,le,ce),Be.viewport(C.copy(z).multiplyScalar(ae).floor())},this.getScissor=function(P){return P.copy(D)},this.setScissor=function(P,Z,le,ce){P.isVector4?D.set(P.x,P.y,P.z,P.w):D.set(P,Z,le,ce),Be.scissor($.copy(D).multiplyScalar(ae).floor())},this.getScissorTest=function(){return G},this.setScissorTest=function(P){Be.setScissorTest(G=P)},this.setOpaqueSort=function(P){W=P},this.setTransparentSort=function(P){q=P},this.getClearColor=function(P){return P.copy(pt.getClearColor())},this.setClearColor=function(){pt.setClearColor.apply(pt,arguments)},this.getClearAlpha=function(){return pt.getClearAlpha()},this.setClearAlpha=function(){pt.setClearAlpha.apply(pt,arguments)},this.clear=function(P=!0,Z=!0,le=!0){let ce=0;if(P){let se=!1;if(I!==null){const De=I.texture.format;se=De===Bg||De===kg||De===Fg}if(se){const De=I.texture.type,Ve=De===Cr||De===Er||De===zd||De===ns||De===Ug||De===Og,Ke=pt.getClearColor(),Ne=pt.getClearAlpha(),lt=Ke.r,nt=Ke.g,rt=Ke.b;Ve?(S[0]=lt,S[1]=nt,S[2]=rt,S[3]=Ne,ie.clearBufferuiv(ie.COLOR,0,S)):(w[0]=lt,w[1]=nt,w[2]=rt,w[3]=Ne,ie.clearBufferiv(ie.COLOR,0,w))}else ce|=ie.COLOR_BUFFER_BIT}Z&&(ce|=ie.DEPTH_BUFFER_BIT),le&&(ce|=ie.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ie.clear(ce)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Te,!1),t.removeEventListener("webglcontextrestored",V,!1),t.removeEventListener("webglcontextcreationerror",Ae,!1),Oe.dispose(),Xe.dispose(),st.dispose(),R.dispose(),ne.dispose(),Se.dispose(),it.dispose(),gt.dispose(),Ge.dispose(),at.dispose(),at.removeEventListener("sessionstart",Jt),at.removeEventListener("sessionend",_t),ve&&(ve.dispose(),ve=null),Yt.stop()};function Te(P){P.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function V(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;const P=Mt.autoReset,Z=ge.enabled,le=ge.autoUpdate,ce=ge.needsUpdate,se=ge.type;Ct(),Mt.autoReset=P,ge.enabled=Z,ge.autoUpdate=le,ge.needsUpdate=ce,ge.type=se}function Ae(P){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function be(P){const Z=P.target;Z.removeEventListener("dispose",be),Qe(Z)}function Qe(P){Ye(P),st.remove(P)}function Ye(P){const Z=st.get(P).programs;Z!==void 0&&(Z.forEach(function(le){Ge.releaseProgram(le)}),P.isShaderMaterial&&Ge.releaseShaderCache(P))}this.renderBufferDirect=function(P,Z,le,ce,se,De){Z===null&&(Z=Le);const Ve=se.isMesh&&se.matrixWorld.determinant()<0,Ke=iu(P,Z,le,ce,se);Be.setMaterial(ce,Ve);let Ne=le.index,lt=1;if(ce.wireframe===!0){if(Ne=_e.getWireframeAttribute(le),Ne===void 0)return;lt=2}const nt=le.drawRange,rt=le.attributes.position;let bt=nt.start*lt,xn=(nt.start+nt.count)*lt;De!==null&&(bt=Math.max(bt,De.start*lt),xn=Math.min(xn,(De.start+De.count)*lt)),Ne!==null?(bt=Math.max(bt,0),xn=Math.min(xn,Ne.count)):rt!=null&&(bt=Math.max(bt,0),xn=Math.min(xn,rt.count));const Gt=xn-bt;if(Gt<0||Gt===1/0)return;it.setup(se,ce,Ke,le,Ne);let Cn,mt=tt;if(Ne!==null&&(Cn=ye.get(Ne),mt=je,mt.setIndex(Cn)),se.isMesh)ce.wireframe===!0?(Be.setLineWidth(ce.wireframeLinewidth*et()),mt.setMode(ie.LINES)):mt.setMode(ie.TRIANGLES);else if(se.isLine){let ut=ce.linewidth;ut===void 0&&(ut=1),Be.setLineWidth(ut*et()),se.isLineSegments?mt.setMode(ie.LINES):se.isLineLoop?mt.setMode(ie.LINE_LOOP):mt.setMode(ie.LINE_STRIP)}else se.isPoints?mt.setMode(ie.POINTS):se.isSprite&&mt.setMode(ie.TRIANGLES);if(se.isBatchedMesh)mt.renderMultiDraw(se._multiDrawStarts,se._multiDrawCounts,se._multiDrawCount);else if(se.isInstancedMesh)mt.renderInstances(bt,Gt,se.count);else if(le.isInstancedBufferGeometry){const ut=le._maxInstanceCount!==void 0?le._maxInstanceCount:1/0,yn=Math.min(le.instanceCount,ut);mt.renderInstances(bt,Gt,yn)}else mt.render(bt,Gt)};function Et(P,Z,le){P.transparent===!0&&P.side===ji&&P.forceSinglePass===!1?(P.side=kn,P.needsUpdate=!0,Ki(P,Z,le),P.side=br,P.needsUpdate=!0,Ki(P,Z,le),P.side=ji):Ki(P,Z,le)}this.compile=function(P,Z,le=null){le===null&&(le=P),x=Xe.get(le),x.init(),A.push(x),le.traverseVisible(function(se){se.isLight&&se.layers.test(Z.layers)&&(x.pushLight(se),se.castShadow&&x.pushShadow(se))}),P!==le&&P.traverseVisible(function(se){se.isLight&&se.layers.test(Z.layers)&&(x.pushLight(se),se.castShadow&&x.pushShadow(se))}),x.setupLights(b._useLegacyLights);const ce=new Set;return P.traverse(function(se){const De=se.material;if(De)if(Array.isArray(De))for(let Ve=0;Ve<De.length;Ve++){const Ke=De[Ve];Et(Ke,le,se),ce.add(Ke)}else Et(De,le,se),ce.add(De)}),A.pop(),x=null,ce},this.compileAsync=function(P,Z,le=null){const ce=this.compile(P,Z,le);return new Promise(se=>{function De(){if(ce.forEach(function(Ve){st.get(Ve).currentProgram.isReady()&&ce.delete(Ve)}),ce.size===0){se(P);return}setTimeout(De,10)}We.get("KHR_parallel_shader_compile")!==null?De():setTimeout(De,10)})};let Tt=null;function Bt(P){Tt&&Tt(P)}function Jt(){Yt.stop()}function _t(){Yt.start()}const Yt=new n0;Yt.setAnimationLoop(Bt),typeof self<"u"&&Yt.setContext(self),this.setAnimationLoop=function(P){Tt=P,at.setAnimationLoop(P),P===null?Yt.stop():Yt.start()},at.addEventListener("sessionstart",Jt),at.addEventListener("sessionend",_t),this.render=function(P,Z){if(Z!==void 0&&Z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),Z.parent===null&&Z.matrixWorldAutoUpdate===!0&&Z.updateMatrixWorld(),at.enabled===!0&&at.isPresenting===!0&&(at.cameraAutoUpdate===!0&&at.updateCamera(Z),Z=at.getCamera()),P.isScene===!0&&P.onBeforeRender(b,P,Z,I),x=Xe.get(P,A.length),x.init(),A.push(x),Me.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),X.setFromProjectionMatrix(Me),he=this.localClippingEnabled,te=ot.init(this.clippingPlanes,he),M=Oe.get(P,y.length),M.init(),y.push(M),cn(P,Z,0,b.sortObjects),M.finish(),b.sortObjects===!0&&M.sort(W,q),this.info.render.frame++,te===!0&&ot.beginShadows();const le=x.state.shadowsArray;if(ge.render(le,P,Z),te===!0&&ot.endShadows(),this.info.autoReset===!0&&this.info.reset(),pt.render(M,P),x.setupLights(b._useLegacyLights),Z.isArrayCamera){const ce=Z.cameras;for(let se=0,De=ce.length;se<De;se++){const Ve=ce[se];da(M,P,Ve,Ve.viewport)}}else da(M,P,Z);I!==null&&(N.updateMultisampleRenderTarget(I),N.updateRenderTargetMipmap(I)),P.isScene===!0&&P.onAfterRender(b,P,Z),it.resetDefaultState(),Q=-1,E=null,A.pop(),A.length>0?x=A[A.length-1]:x=null,y.pop(),y.length>0?M=y[y.length-1]:M=null};function cn(P,Z,le,ce){if(P.visible===!1)return;if(P.layers.test(Z.layers)){if(P.isGroup)le=P.renderOrder;else if(P.isLOD)P.autoUpdate===!0&&P.update(Z);else if(P.isLight)x.pushLight(P),P.castShadow&&x.pushShadow(P);else if(P.isSprite){if(!P.frustumCulled||X.intersectsSprite(P)){ce&&Pe.setFromMatrixPosition(P.matrixWorld).applyMatrix4(Me);const Ve=Se.update(P),Ke=P.material;Ke.visible&&M.push(P,Ve,Ke,le,Pe.z,null)}}else if((P.isMesh||P.isLine||P.isPoints)&&(!P.frustumCulled||X.intersectsObject(P))){const Ve=Se.update(P),Ke=P.material;if(ce&&(P.boundingSphere!==void 0?(P.boundingSphere===null&&P.computeBoundingSphere(),Pe.copy(P.boundingSphere.center)):(Ve.boundingSphere===null&&Ve.computeBoundingSphere(),Pe.copy(Ve.boundingSphere.center)),Pe.applyMatrix4(P.matrixWorld).applyMatrix4(Me)),Array.isArray(Ke)){const Ne=Ve.groups;for(let lt=0,nt=Ne.length;lt<nt;lt++){const rt=Ne[lt],bt=Ke[rt.materialIndex];bt&&bt.visible&&M.push(P,Ve,bt,le,Pe.z,rt)}}else Ke.visible&&M.push(P,Ve,Ke,le,Pe.z,null)}}const De=P.children;for(let Ve=0,Ke=De.length;Ve<Ke;Ve++)cn(De[Ve],Z,le,ce)}function da(P,Z,le,ce){const se=P.opaque,De=P.transmissive,Ve=P.transparent;x.setupLightsView(le),te===!0&&ot.setGlobalState(b.clippingPlanes,le),De.length>0&&Pr(se,De,Z,le),ce&&Be.viewport(C.copy(ce)),se.length>0&&Ci(se,Z,le),De.length>0&&Ci(De,Z,le),Ve.length>0&&Ci(Ve,Z,le),Be.buffers.depth.setTest(!0),Be.buffers.depth.setMask(!0),Be.buffers.color.setMask(!0),Be.setPolygonOffset(!1)}function Pr(P,Z,le,ce){if((le.isScene===!0?le.overrideMaterial:null)!==null)return;const De=Ze.isWebGL2;ve===null&&(ve=new ss(1,1,{generateMipmaps:!0,type:We.has("EXT_color_buffer_half_float")?na:Cr,minFilter:ta,samples:De?4:0})),b.getDrawingBufferSize(we),De?ve.setSize(we.x,we.y):ve.setSize(Id(we.x),Id(we.y));const Ve=b.getRenderTarget();b.setRenderTarget(ve),b.getClearColor(de),k=b.getClearAlpha(),k<1&&b.setClearColor(16777215,.5),b.clear();const Ke=b.toneMapping;b.toneMapping=Ar,Ci(P,le,ce),N.updateMultisampleRenderTarget(ve),N.updateRenderTargetMipmap(ve);let Ne=!1;for(let lt=0,nt=Z.length;lt<nt;lt++){const rt=Z[lt],bt=rt.object,xn=rt.geometry,Gt=rt.material,Cn=rt.group;if(Gt.side===ji&&bt.layers.test(ce.layers)){const mt=Gt.side;Gt.side=kn,Gt.needsUpdate=!0,Dr(bt,le,ce,xn,Gt,Cn),Gt.side=mt,Gt.needsUpdate=!0,Ne=!0}}Ne===!0&&(N.updateMultisampleRenderTarget(ve),N.updateRenderTargetMipmap(ve)),b.setRenderTarget(Ve),b.setClearColor(de,k),b.toneMapping=Ke}function Ci(P,Z,le){const ce=Z.isScene===!0?Z.overrideMaterial:null;for(let se=0,De=P.length;se<De;se++){const Ve=P[se],Ke=Ve.object,Ne=Ve.geometry,lt=ce===null?Ve.material:ce,nt=Ve.group;Ke.layers.test(le.layers)&&Dr(Ke,Z,le,Ne,lt,nt)}}function Dr(P,Z,le,ce,se,De){P.onBeforeRender(b,Z,le,ce,se,De),P.modelViewMatrix.multiplyMatrices(le.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),se.onBeforeRender(b,Z,le,ce,P,De),se.transparent===!0&&se.side===ji&&se.forceSinglePass===!1?(se.side=kn,se.needsUpdate=!0,b.renderBufferDirect(le,Z,ce,se,P,De),se.side=br,se.needsUpdate=!0,b.renderBufferDirect(le,Z,ce,se,P,De),se.side=ji):b.renderBufferDirect(le,Z,ce,se,P,De),P.onAfterRender(b,Z,le,ce,se,De)}function Ki(P,Z,le){Z.isScene!==!0&&(Z=Le);const ce=st.get(P),se=x.state.lights,De=x.state.shadowsArray,Ve=se.state.version,Ke=Ge.getParameters(P,se.state,De,Z,le),Ne=Ge.getProgramCacheKey(Ke);let lt=ce.programs;ce.environment=P.isMeshStandardMaterial?Z.environment:null,ce.fog=Z.fog,ce.envMap=(P.isMeshStandardMaterial?ne:R).get(P.envMap||ce.environment),lt===void 0&&(P.addEventListener("dispose",be),lt=new Map,ce.programs=lt);let nt=lt.get(Ne);if(nt!==void 0){if(ce.currentProgram===nt&&ce.lightsStateVersion===Ve)return ha(P,Ke),nt}else Ke.uniforms=Ge.getUniforms(P),P.onBuild(le,Ke,b),P.onBeforeCompile(Ke,b),nt=Ge.acquireProgram(Ke,Ne),lt.set(Ne,nt),ce.uniforms=Ke.uniforms;const rt=ce.uniforms;return(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)&&(rt.clippingPlanes=ot.uniform),ha(P,Ke),ce.needsLights=pa(P),ce.lightsStateVersion=Ve,ce.needsLights&&(rt.ambientLightColor.value=se.state.ambient,rt.lightProbe.value=se.state.probe,rt.directionalLights.value=se.state.directional,rt.directionalLightShadows.value=se.state.directionalShadow,rt.spotLights.value=se.state.spot,rt.spotLightShadows.value=se.state.spotShadow,rt.rectAreaLights.value=se.state.rectArea,rt.ltc_1.value=se.state.rectAreaLTC1,rt.ltc_2.value=se.state.rectAreaLTC2,rt.pointLights.value=se.state.point,rt.pointLightShadows.value=se.state.pointShadow,rt.hemisphereLights.value=se.state.hemi,rt.directionalShadowMap.value=se.state.directionalShadowMap,rt.directionalShadowMatrix.value=se.state.directionalShadowMatrix,rt.spotShadowMap.value=se.state.spotShadowMap,rt.spotLightMatrix.value=se.state.spotLightMatrix,rt.spotLightMap.value=se.state.spotLightMap,rt.pointShadowMap.value=se.state.pointShadowMap,rt.pointShadowMatrix.value=se.state.pointShadowMatrix),ce.currentProgram=nt,ce.uniformsList=null,nt}function fa(P){if(P.uniformsList===null){const Z=P.currentProgram.getUniforms();P.uniformsList=Vl.seqWithValue(Z.seq,P.uniforms)}return P.uniformsList}function ha(P,Z){const le=st.get(P);le.outputColorSpace=Z.outputColorSpace,le.batching=Z.batching,le.instancing=Z.instancing,le.instancingColor=Z.instancingColor,le.skinning=Z.skinning,le.morphTargets=Z.morphTargets,le.morphNormals=Z.morphNormals,le.morphColors=Z.morphColors,le.morphTargetsCount=Z.morphTargetsCount,le.numClippingPlanes=Z.numClippingPlanes,le.numIntersection=Z.numClipIntersection,le.vertexAlphas=Z.vertexAlphas,le.vertexTangents=Z.vertexTangents,le.toneMapping=Z.toneMapping}function iu(P,Z,le,ce,se){Z.isScene!==!0&&(Z=Le),N.resetTextureUnits();const De=Z.fog,Ve=ce.isMeshStandardMaterial?Z.environment:null,Ke=I===null?b.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:$i,Ne=(ce.isMeshStandardMaterial?ne:R).get(ce.envMap||Ve),lt=ce.vertexColors===!0&&!!le.attributes.color&&le.attributes.color.itemSize===4,nt=!!le.attributes.tangent&&(!!ce.normalMap||ce.anisotropy>0),rt=!!le.morphAttributes.position,bt=!!le.morphAttributes.normal,xn=!!le.morphAttributes.color;let Gt=Ar;ce.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(Gt=b.toneMapping);const Cn=le.morphAttributes.position||le.morphAttributes.normal||le.morphAttributes.color,mt=Cn!==void 0?Cn.length:0,ut=st.get(ce),yn=x.state.lights;if(te===!0&&(he===!0||P!==E)){const bn=P===E&&ce.id===Q;ot.setState(ce,P,bn)}let It=!1;ce.version===ut.__version?(ut.needsLights&&ut.lightsStateVersion!==yn.state.version||ut.outputColorSpace!==Ke||se.isBatchedMesh&&ut.batching===!1||!se.isBatchedMesh&&ut.batching===!0||se.isInstancedMesh&&ut.instancing===!1||!se.isInstancedMesh&&ut.instancing===!0||se.isSkinnedMesh&&ut.skinning===!1||!se.isSkinnedMesh&&ut.skinning===!0||se.isInstancedMesh&&ut.instancingColor===!0&&se.instanceColor===null||se.isInstancedMesh&&ut.instancingColor===!1&&se.instanceColor!==null||ut.envMap!==Ne||ce.fog===!0&&ut.fog!==De||ut.numClippingPlanes!==void 0&&(ut.numClippingPlanes!==ot.numPlanes||ut.numIntersection!==ot.numIntersection)||ut.vertexAlphas!==lt||ut.vertexTangents!==nt||ut.morphTargets!==rt||ut.morphNormals!==bt||ut.morphColors!==xn||ut.toneMapping!==Gt||Ze.isWebGL2===!0&&ut.morphTargetsCount!==mt)&&(It=!0):(It=!0,ut.__version=ce.version);let Ri=ut.currentProgram;It===!0&&(Ri=Ki(ce,Z,se));let ma=!1,xi=!1,Zi=!1;const zt=Ri.getUniforms(),$n=ut.uniforms;if(Be.useProgram(Ri.program)&&(ma=!0,xi=!0,Zi=!0),ce.id!==Q&&(Q=ce.id,xi=!0),ma||E!==P){zt.setValue(ie,"projectionMatrix",P.projectionMatrix),zt.setValue(ie,"viewMatrix",P.matrixWorldInverse);const bn=zt.map.cameraPosition;bn!==void 0&&bn.setValue(ie,Pe.setFromMatrixPosition(P.matrixWorld)),Ze.logarithmicDepthBuffer&&zt.setValue(ie,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2)),(ce.isMeshPhongMaterial||ce.isMeshToonMaterial||ce.isMeshLambertMaterial||ce.isMeshBasicMaterial||ce.isMeshStandardMaterial||ce.isShaderMaterial)&&zt.setValue(ie,"isOrthographic",P.isOrthographicCamera===!0),E!==P&&(E=P,xi=!0,Zi=!0)}if(se.isSkinnedMesh){zt.setOptional(ie,se,"bindMatrix"),zt.setOptional(ie,se,"bindMatrixInverse");const bn=se.skeleton;bn&&(Ze.floatVertexTextures?(bn.boneTexture===null&&bn.computeBoneTexture(),zt.setValue(ie,"boneTexture",bn.boneTexture,N)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}se.isBatchedMesh&&(zt.setOptional(ie,se,"batchingTexture"),zt.setValue(ie,"batchingTexture",se._matricesTexture,N));const lo=le.morphAttributes;if((lo.position!==void 0||lo.normal!==void 0||lo.color!==void 0&&Ze.isWebGL2===!0)&&dt.update(se,le,Ri),(xi||ut.receiveShadow!==se.receiveShadow)&&(ut.receiveShadow=se.receiveShadow,zt.setValue(ie,"receiveShadow",se.receiveShadow)),ce.isMeshGouraudMaterial&&ce.envMap!==null&&($n.envMap.value=Ne,$n.flipEnvMap.value=Ne.isCubeTexture&&Ne.isRenderTargetTexture===!1?-1:1),xi&&(zt.setValue(ie,"toneMappingExposure",b.toneMappingExposure),ut.needsLights&&bi($n,Zi),De&&ce.fog===!0&&Re.refreshFogUniforms($n,De),Re.refreshMaterialUniforms($n,ce,ae,J,ve),Vl.upload(ie,fa(ut),$n,N)),ce.isShaderMaterial&&ce.uniformsNeedUpdate===!0&&(Vl.upload(ie,fa(ut),$n,N),ce.uniformsNeedUpdate=!1),ce.isSpriteMaterial&&zt.setValue(ie,"center",se.center),zt.setValue(ie,"modelViewMatrix",se.modelViewMatrix),zt.setValue(ie,"normalMatrix",se.normalMatrix),zt.setValue(ie,"modelMatrix",se.matrixWorld),ce.isShaderMaterial||ce.isRawShaderMaterial){const bn=ce.uniformsGroups;for(let Ir=0,ga=bn.length;Ir<ga;Ir++)if(Ze.isWebGL2){const as=bn[Ir];gt.update(as,Ri),gt.bind(as,Ri)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Ri}function bi(P,Z){P.ambientLightColor.needsUpdate=Z,P.lightProbe.needsUpdate=Z,P.directionalLights.needsUpdate=Z,P.directionalLightShadows.needsUpdate=Z,P.pointLights.needsUpdate=Z,P.pointLightShadows.needsUpdate=Z,P.spotLights.needsUpdate=Z,P.spotLightShadows.needsUpdate=Z,P.rectAreaLights.needsUpdate=Z,P.hemisphereLights.needsUpdate=Z}function pa(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(P,Z,le){st.get(P.texture).__webglTexture=Z,st.get(P.depthTexture).__webglTexture=le;const ce=st.get(P);ce.__hasExternalTextures=!0,ce.__hasExternalTextures&&(ce.__autoAllocateDepthBuffer=le===void 0,ce.__autoAllocateDepthBuffer||We.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ce.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(P,Z){const le=st.get(P);le.__webglFramebuffer=Z,le.__useDefaultFramebuffer=Z===void 0},this.setRenderTarget=function(P,Z=0,le=0){I=P,B=Z,U=le;let ce=!0,se=null,De=!1,Ve=!1;if(P){const Ne=st.get(P);Ne.__useDefaultFramebuffer!==void 0?(Be.bindFramebuffer(ie.FRAMEBUFFER,null),ce=!1):Ne.__webglFramebuffer===void 0?N.setupRenderTarget(P):Ne.__hasExternalTextures&&N.rebindTextures(P,st.get(P.texture).__webglTexture,st.get(P.depthTexture).__webglTexture);const lt=P.texture;(lt.isData3DTexture||lt.isDataArrayTexture||lt.isCompressedArrayTexture)&&(Ve=!0);const nt=st.get(P).__webglFramebuffer;P.isWebGLCubeRenderTarget?(Array.isArray(nt[Z])?se=nt[Z][le]:se=nt[Z],De=!0):Ze.isWebGL2&&P.samples>0&&N.useMultisampledRTT(P)===!1?se=st.get(P).__webglMultisampledFramebuffer:Array.isArray(nt)?se=nt[le]:se=nt,C.copy(P.viewport),$.copy(P.scissor),oe=P.scissorTest}else C.copy(z).multiplyScalar(ae).floor(),$.copy(D).multiplyScalar(ae).floor(),oe=G;if(Be.bindFramebuffer(ie.FRAMEBUFFER,se)&&Ze.drawBuffers&&ce&&Be.drawBuffers(P,se),Be.viewport(C),Be.scissor($),Be.setScissorTest(oe),De){const Ne=st.get(P.texture);ie.framebufferTexture2D(ie.FRAMEBUFFER,ie.COLOR_ATTACHMENT0,ie.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Ne.__webglTexture,le)}else if(Ve){const Ne=st.get(P.texture),lt=Z||0;ie.framebufferTextureLayer(ie.FRAMEBUFFER,ie.COLOR_ATTACHMENT0,Ne.__webglTexture,le||0,lt)}Q=-1},this.readRenderTargetPixels=function(P,Z,le,ce,se,De,Ve){if(!(P&&P.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ke=st.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&Ve!==void 0&&(Ke=Ke[Ve]),Ke){Be.bindFramebuffer(ie.FRAMEBUFFER,Ke);try{const Ne=P.texture,lt=Ne.format,nt=Ne.type;if(lt!==_i&&ke.convert(lt)!==ie.getParameter(ie.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const rt=nt===na&&(We.has("EXT_color_buffer_half_float")||Ze.isWebGL2&&We.has("EXT_color_buffer_float"));if(nt!==Cr&&ke.convert(nt)!==ie.getParameter(ie.IMPLEMENTATION_COLOR_READ_TYPE)&&!(nt===Tr&&(Ze.isWebGL2||We.has("OES_texture_float")||We.has("WEBGL_color_buffer_float")))&&!rt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Z>=0&&Z<=P.width-ce&&le>=0&&le<=P.height-se&&ie.readPixels(Z,le,ce,se,ke.convert(lt),ke.convert(nt),De)}finally{const Ne=I!==null?st.get(I).__webglFramebuffer:null;Be.bindFramebuffer(ie.FRAMEBUFFER,Ne)}}},this.copyFramebufferToTexture=function(P,Z,le=0){const ce=Math.pow(2,-le),se=Math.floor(Z.image.width*ce),De=Math.floor(Z.image.height*ce);N.setTexture2D(Z,0),ie.copyTexSubImage2D(ie.TEXTURE_2D,le,0,0,P.x,P.y,se,De),Be.unbindTexture()},this.copyTextureToTexture=function(P,Z,le,ce=0){const se=Z.image.width,De=Z.image.height,Ve=ke.convert(le.format),Ke=ke.convert(le.type);N.setTexture2D(le,0),ie.pixelStorei(ie.UNPACK_FLIP_Y_WEBGL,le.flipY),ie.pixelStorei(ie.UNPACK_PREMULTIPLY_ALPHA_WEBGL,le.premultiplyAlpha),ie.pixelStorei(ie.UNPACK_ALIGNMENT,le.unpackAlignment),Z.isDataTexture?ie.texSubImage2D(ie.TEXTURE_2D,ce,P.x,P.y,se,De,Ve,Ke,Z.image.data):Z.isCompressedTexture?ie.compressedTexSubImage2D(ie.TEXTURE_2D,ce,P.x,P.y,Z.mipmaps[0].width,Z.mipmaps[0].height,Ve,Z.mipmaps[0].data):ie.texSubImage2D(ie.TEXTURE_2D,ce,P.x,P.y,Ve,Ke,Z.image),ce===0&&le.generateMipmaps&&ie.generateMipmap(ie.TEXTURE_2D),Be.unbindTexture()},this.copyTextureToTexture3D=function(P,Z,le,ce,se=0){if(b.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const De=P.max.x-P.min.x+1,Ve=P.max.y-P.min.y+1,Ke=P.max.z-P.min.z+1,Ne=ke.convert(ce.format),lt=ke.convert(ce.type);let nt;if(ce.isData3DTexture)N.setTexture3D(ce,0),nt=ie.TEXTURE_3D;else if(ce.isDataArrayTexture||ce.isCompressedArrayTexture)N.setTexture2DArray(ce,0),nt=ie.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}ie.pixelStorei(ie.UNPACK_FLIP_Y_WEBGL,ce.flipY),ie.pixelStorei(ie.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ce.premultiplyAlpha),ie.pixelStorei(ie.UNPACK_ALIGNMENT,ce.unpackAlignment);const rt=ie.getParameter(ie.UNPACK_ROW_LENGTH),bt=ie.getParameter(ie.UNPACK_IMAGE_HEIGHT),xn=ie.getParameter(ie.UNPACK_SKIP_PIXELS),Gt=ie.getParameter(ie.UNPACK_SKIP_ROWS),Cn=ie.getParameter(ie.UNPACK_SKIP_IMAGES),mt=le.isCompressedTexture?le.mipmaps[se]:le.image;ie.pixelStorei(ie.UNPACK_ROW_LENGTH,mt.width),ie.pixelStorei(ie.UNPACK_IMAGE_HEIGHT,mt.height),ie.pixelStorei(ie.UNPACK_SKIP_PIXELS,P.min.x),ie.pixelStorei(ie.UNPACK_SKIP_ROWS,P.min.y),ie.pixelStorei(ie.UNPACK_SKIP_IMAGES,P.min.z),le.isDataTexture||le.isData3DTexture?ie.texSubImage3D(nt,se,Z.x,Z.y,Z.z,De,Ve,Ke,Ne,lt,mt.data):le.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),ie.compressedTexSubImage3D(nt,se,Z.x,Z.y,Z.z,De,Ve,Ke,Ne,mt.data)):ie.texSubImage3D(nt,se,Z.x,Z.y,Z.z,De,Ve,Ke,Ne,lt,mt),ie.pixelStorei(ie.UNPACK_ROW_LENGTH,rt),ie.pixelStorei(ie.UNPACK_IMAGE_HEIGHT,bt),ie.pixelStorei(ie.UNPACK_SKIP_PIXELS,xn),ie.pixelStorei(ie.UNPACK_SKIP_ROWS,Gt),ie.pixelStorei(ie.UNPACK_SKIP_IMAGES,Cn),se===0&&ce.generateMipmaps&&ie.generateMipmap(nt),Be.unbindTexture()},this.initTexture=function(P){P.isCubeTexture?N.setTextureCube(P,0):P.isData3DTexture?N.setTexture3D(P,0):P.isDataArrayTexture||P.isCompressedArrayTexture?N.setTexture2DArray(P,0):N.setTexture2D(P,0),Be.unbindTexture()},this.resetState=function(){B=0,U=0,I=null,Be.reset(),it.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Yi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Hd?"display-p3":"srgb",t.unpackColorSpace=At.workingColorSpace===eu?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===ln?rs:Hg}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===rs?ln:$i}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class FT extends c0{}FT.prototype.isWebGL1Renderer=!0;class kT extends un{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class BT extends Bn{constructor(e,t,s,o,l,c,d,f,h){super(e,t,s,o,l,c,d,f,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Xd extends Lr{constructor(e=1,t=32,s=16,o=0,l=Math.PI*2,c=0,d=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:s,phiStart:o,phiLength:l,thetaStart:c,thetaLength:d},t=Math.max(3,Math.floor(t)),s=Math.max(2,Math.floor(s));const f=Math.min(c+d,Math.PI);let h=0;const g=[],m=new ue,_=new ue,S=[],w=[],M=[],x=[];for(let y=0;y<=s;y++){const A=[],b=y/s;let L=0;y===0&&c===0?L=.5/t:y===s&&f===Math.PI&&(L=-.5/t);for(let B=0;B<=t;B++){const U=B/t;m.x=-e*Math.cos(o+U*l)*Math.sin(c+b*d),m.y=e*Math.cos(c+b*d),m.z=e*Math.sin(o+U*l)*Math.sin(c+b*d),w.push(m.x,m.y,m.z),_.copy(m).normalize(),M.push(_.x,_.y,_.z),x.push(U+L,1-b),A.push(h++)}g.push(A)}for(let y=0;y<s;y++)for(let A=0;A<t;A++){const b=g[y][A+1],L=g[y][A],B=g[y+1][A],U=g[y+1][A+1];(y!==0||c>0)&&S.push(b,L,U),(y!==s-1||f<Math.PI)&&S.push(L,B,U)}this.setIndex(S),this.setAttribute("position",new Ai(w,3)),this.setAttribute("normal",new Ai(M,3)),this.setAttribute("uv",new Ai(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xd(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class zT extends ua{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new yt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new yt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Gg,this.normalScale=new St(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Yd extends un{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new yt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class HT extends Yd{constructor(e,t,s){super(e,s),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(un.DEFAULT_UP),this.updateMatrix(),this.groundColor=new yt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Sd=new Kt,sg=new ue,og=new ue;class GT{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new St(512,512),this.map=null,this.mapPass=null,this.matrix=new Kt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Vd,this._frameExtents=new St(1,1),this._viewportCount=1,this._viewports=[new sn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,s=this.matrix;sg.setFromMatrixPosition(e.matrixWorld),t.position.copy(sg),og.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(og),t.updateMatrixWorld(),Sd.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Sd),s.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),s.multiply(Sd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class VT extends GT{constructor(){super(new i0(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class WT extends Yd{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(un.DEFAULT_UP),this.updateMatrix(),this.target=new un,this.shadow=new VT}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class jT extends Yd{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Bd}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Bd);function qd({world:r,preview:e,className:t,style:s}){const o=fe.useRef(null),l=fe.useRef(null);return fe.useEffect(()=>{const c=o.current;if(!c)return;const d=c.clientWidth||800,f=c.clientHeight||600,h=new kT,g=new ri(45,d/f,.1,100);g.position.set(0,0,2.6);const m=new c0({antialias:!0,alpha:!0});m.setPixelRatio(window.devicePixelRatio||1),m.setSize(d,f,!1),c.appendChild(m.domElement);const _=new HT(16777215,4473924,1.2);h.add(_);const S=new WT(16777215,.8);S.position.set(5,3,5),h.add(S);const w=new jT(16777215,.3);h.add(w);const M=document.createElement("canvas");l.current=M;function x(){let z=e;if(!z&&r&&(z=so(r)),!z)throw new Error("No preview available");const D=z.width,G=z.height;M.width=D,M.height=G;const X=M.getContext("2d");if(!X)throw new Error("Failed to create texture canvas 2D context");if(z.rgba&&z.rgba instanceof Uint8ClampedArray){const he=new ImageData(z.rgba,D,G);X.putImageData(he,0,0)}else{const he=X.createImageData(D,G),ve=he.data;for(let Me=0;Me<G;Me++)for(let we=0;we<D;we++){const Pe=Me*D+we,Le=Pe*4;try{const et=z.sampleGlobeColor?z.sampleGlobeColor(Pe):[255,0,255,255];ve[Le+0]=et[0],ve[Le+1]=et[1],ve[Le+2]=et[2],ve[Le+3]=et[3]??255}catch{ve[Le+0]=255,ve[Le+1]=0,ve[Le+2]=255,ve[Le+3]=255}}X.putImageData(he,0,0)}const te=new BT(M);return te.wrapS=jl,te.wrapT=si,te.minFilter=On,te.magFilter=On,te.flipY=!1,te.needsUpdate=!0,te}const y=x(),A=new Xd(1,128,128),b=new zT({map:y,metalness:0,roughness:.8,flatShading:!1}),L=new qi(A,b);h.add(L);let B=null;performance.now();let U=!1,I=0,Q=0,E=0,C=0;function $(){const z=o.current;if(!z)return;const D=z.clientWidth||800,G=z.clientHeight||600;g.aspect=D/G,g.updateProjectionMatrix(),m.setSize(D,G,!1)}window.addEventListener("resize",$);function oe(){(Math.abs(E)>1e-5||Math.abs(C)>1e-5)&&(L.rotation.y+=E,L.rotation.x=Math.max(Math.min(L.rotation.x+C,Math.PI/2-.1),-Math.PI/2+.1),E*=.92,C*=.92),m.render(h,g),B=requestAnimationFrame(oe)}oe();const de=()=>{try{const z=x();b.map&&b.map.dispose(),b.map=z,b.needsUpdate=!0}catch{}},k=m.domElement;function Y(z){const D=k.getBoundingClientRect();return{x:z.clientX-D.left,y:z.clientY-D.top}}function J(z){U=!0,k.setPointerCapture(z.pointerId);const D=Y(z);I=D.x,Q=D.y,E=0,C=0}function ae(z){if(!U)return;const D=Y(z),G=D.x-I,X=D.y-Q;I=D.x,Q=D.y;const te=.0025;L.rotation.y+=-G*te,L.rotation.x+=-X*te,L.rotation.x=Math.max(Math.min(L.rotation.x,Math.PI/2-.1),-Math.PI/2+.1),E=-G*te*.6+E*.4,C=-X*te*.6+C*.4}function W(z){U=!1;try{k.releasePointerCapture(z.pointerId)}catch{}}function q(z){z.preventDefault();const D=z.deltaY>0?.2:-.2;g.position.z=Math.max(1.6,Math.min(6,g.position.z+D))}return k.addEventListener("pointerdown",J),k.addEventListener("pointermove",ae),k.addEventListener("pointerup",W),k.addEventListener("pointercancel",W),k.addEventListener("wheel",q,{passive:!1}),de(),()=>{B&&cancelAnimationFrame(B),window.removeEventListener("resize",$);try{k.removeEventListener("pointerdown",J),k.removeEventListener("pointermove",ae),k.removeEventListener("pointerup",W),k.removeEventListener("pointercancel",W),k.removeEventListener("wheel",q)}catch{}try{m.dispose()}catch{}m.domElement&&m.domElement.parentElement&&m.domElement.parentElement.removeChild(m.domElement)}},[r,e]),O.jsx("div",{ref:o,className:t,style:{width:"100%",height:"100%",...s}})}function XT({world:r,error:e}){const t=fe.useMemo(()=>r?so(r):null,[r]),s=fe.useMemo(()=>r?r.metadata:null,[r]);return O.jsxs("div",{style:{position:"absolute",inset:0,display:"flex",flexDirection:"column",background:"#000"},children:[O.jsxs("div",{style:{padding:12,display:"flex",justifyContent:"space-between",gap:10,background:"rgba(0,0,0,0.7)"},children:[O.jsx("div",{style:{fontWeight:900,color:"#fff"},children:"World Preview"}),s&&O.jsxs("div",{style:{fontSize:12,opacity:.75,color:"#fff"},children:[s.styleMode," • ",s.gridWidth,"×",s.gridHeight," • seed ",s.seed]})]}),e?O.jsx("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",color:"#f66",padding:20},children:e}):r?O.jsx("div",{style:{flex:1,position:"relative"},children:O.jsx(qd,{world:r,preview:t,style:{width:"100%",height:"100%"}})}):O.jsx("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,0.6)",fontSize:16},children:"Configure parameters and click Generate"})]})}function YT(){const r=sa(),[e,t]=fe.useState(null),[s,o]=fe.useState(!1),[l,c]=fe.useState(null);fe.useMemo(()=>e?so(e):null,[e]);async function d(m){c(null);try{await _n.createWorld(m);const _=_n.getWorld();t(_)}catch(_){console.error(_),c(_?.message||"Generate failed.")}}async function f(){if(e){o(!0),c(null);try{const m=await bg(e);r(`/create/${m.metadata.id}`)}catch(m){console.error(m),c(m?.message||"Save failed.")}finally{o(!1)}}}const h=[{id:"generate",title:"Generate",tools:[{id:"gen",label:"Generate",disabled:!0},{id:"save",label:s?"Saving…":"Save → Create",disabled:!e||s,onClick:f}]}],g=O.jsx(Lx,{onGenerate:d,onSave:f,saving:s,disabled:!e});return O.jsx(ts,{mode:"generate",onGoHome:()=>r("/"),worldName:e?.metadata?.name||"Generate",isDirty:!0,rightPanel:g,toolGroups:h,children:O.jsx(XT,{world:e,error:l})})}function qT(r,e){const t=r.getContext("2d");if(!t)return;const s=so(e),o=s.width,l=s.height,c=2;r.width=o*c,r.height=l*c;const d=t.createImageData(o,l),f=d.data;for(let M=0;M<l;M++)for(let x=0;x<o;x++){const y=s.minimapColorAt(x,M),A=(M*o+x)*4;f[A+0]=y[0],f[A+1]=y[1],f[A+2]=y[2],f[A+3]=y[3]}const h=document.createElement("canvas");h.width=o,h.height=l;const g=h.getContext("2d");if(!g)return;g.putImageData(d,0,0),t.imageSmoothingEnabled=!1,t.clearRect(0,0,r.width,r.height),t.drawImage(h,0,0,o*c,l*c);const m=Math.max(20,Math.floor(o*c*.25)),_=Math.max(16,Math.floor(l*c*.25)),S=Math.floor((o*c-m)/2),w=Math.floor((l*c-_)/2);t.strokeStyle="rgba(255,255,255,0.95)",t.lineWidth=2,t.strokeRect(S+.5,w+.5,m,_),t.strokeStyle="rgba(0,0,0,0.55)",t.lineWidth=1,t.strokeRect(S+1.5,w+1.5,m-2,_-2)}function $T({world:r}){const e=fe.useRef(null);return fe.useEffect(()=>{if(e.current)try{qT(e.current,r)}catch(t){console.error("Minimap draw failed:",t)}},[r]),O.jsx("div",{style:{position:"absolute",inset:0},children:O.jsx("canvas",{ref:e,style:{width:"100%",height:"100%",display:"block",background:"#111"}})})}class KT{constructor(e,t,s){Object.defineProperty(this,"world",{enumerable:!0,configurable:!0,writable:!0,value:e}),Object.defineProperty(this,"onStateChange",{enumerable:!0,configurable:!0,writable:!0,value:t}),Object.defineProperty(this,"onWorldChange",{enumerable:!0,configurable:!0,writable:!0,value:s}),Object.defineProperty(this,"state",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"actionHistory",{enumerable:!0,configurable:!0,writable:!0,value:[]}),this.state={enabled:!1,tool:"RAISE",brushParams:{shape:"CIRCLE",falloff:"SOFT",radius:10,strength:.5},isDrawing:!1}}setTool(e){this.state.tool=e,this.state.enabled=!0,this.notifyStateChange()}disable(){this.state.enabled=!1,this.state.isDrawing=!1,this.notifyStateChange()}setBrushParams(e){this.state.brushParams={...this.state.brushParams,...e},this.notifyStateChange()}getState(){return{...this.state}}setWorld(e){this.world=e}startStroke(e,t){!this.state.enabled||!this.world||(this.state.isDrawing=!0,this.actionHistory=[],this.applyBrushAtCell(e,t))}continueStroke(e,t){!this.state.isDrawing||!this.state.enabled||!this.world||this.applyBrushAtCell(e,t)}endStroke(){this.state.isDrawing=!1,this.notifyStateChange()}applyBrushAtCell(e,t){if(!this.world)return;const s={type:"TERRAIN_STROKE",tool:this.state.tool,center:{row:e,col:t},radius:this.state.brushParams.radius,strength:this.state.brushParams.strength};Lg(this.world,s),An(this.world,["TERRAIN_EDIT"]),this.state.lastAppliedStroke=s,this.actionHistory.push(s),this.onWorldChange(this.world)}notifyStateChange(){this.onStateChange(this.getState())}}function ZT(r,e){const t=r.getContext("2d");if(!t)return;const s=so(e),o=s.width,l=s.height,d=Math.max(1,Math.floor(1100/o));r.width=o*d,r.height=l*d;const f=t.createImageData(o,l),h=f.data;for(let _=0;_<l;_++)for(let S=0;S<o;S++){const w=s.minimapColorAt(S,_),M=(_*o+S)*4;h[M+0]=w[0],h[M+1]=w[1],h[M+2]=w[2],h[M+3]=w[3]}const g=document.createElement("canvas");g.width=o,g.height=l;const m=g.getContext("2d");m&&(m.putImageData(f,0,0),t.imageSmoothingEnabled=!1,t.clearRect(0,0,r.width,r.height),t.drawImage(g,0,0,o*d,l*d))}function ag(r,e,t,s){if(!t)return null;const o=t.getBoundingClientRect(),l=r-o.left,c=e-o.top,d=l/o.width,f=c/o.height,h=Math.floor(d*s.gridWidth),g=Math.floor(f*s.gridHeight);return g<0||g>=s.gridHeight||h<0||h>=s.gridWidth?null:{row:g,col:h}}function QT({world:r,activeTerrainTool:e,onWorldChange:t}){const s=fe.useRef(null),o=fe.useRef(null),[l,c]=fe.useState(null);fe.useEffect(()=>{o.current=new KT(r,c,t),e&&o.current.setTool(e)},[r,t]),fe.useEffect(()=>{e&&o.current?o.current.setTool(e):!e&&o.current&&o.current.disable()},[e]),fe.useEffect(()=>{const m=s.current;if(m)try{ZT(m,r)}catch(_){console.error("Create viewport draw failed:",_)}},[r]);const d=m=>{const _=s.current;if(!_||!o.current)return;const S=ag(m.clientX,m.clientY,_,r);S&&o.current.startStroke(S.row,S.col)},f=m=>{const _=s.current;if(!_||!o.current)return;const S=ag(m.clientX,m.clientY,_,r);S&&o.current.continueStroke(S.row,S.col)},h=()=>{o.current&&o.current.endStroke()},g=()=>{o.current&&o.current.endStroke()};return O.jsxs("div",{style:{position:"absolute",inset:0,overflow:"auto"},children:[O.jsxs("div",{style:{padding:12,fontWeight:900},children:["Create View",l?.enabled&&O.jsxs("span",{style:{marginLeft:12,fontSize:12,opacity:.7},children:["Tool: ",l.tool," | Radius: ",l.brushParams.radius]})]}),O.jsxs("div",{style:{padding:12},children:[O.jsx("canvas",{ref:s,onMouseDown:d,onMouseMove:f,onMouseUp:h,onMouseLeave:g,style:{width:"100%",maxWidth:1200,borderRadius:12,border:"1px solid rgba(0,0,0,0.15)",background:"#111",display:"block",cursor:l?.enabled?"crosshair":"default"}}),O.jsx("div",{style:{fontSize:11,opacity:.65,marginTop:8},children:l?.enabled?`Terrain brush active: ${l.tool.toUpperCase()} - click and drag to paint.`:"Select a terrain tool above to start editing."})]})]})}function Md(r,e,t,s=256,o=128){const l=r-t.left,c=e-t.top,d=l/t.width*360-180;return{lat:90-c/t.height*180,lon:d}}function Ed(r,e,t){const s=t.left+(e+180)/360*t.width,o=t.top+(90-r)/180*t.height;return{x:s,y:o}}function lg(r,e,t){let s=-1,o=t;for(let l=0;l<e.length;l++){const c=Math.sqrt(Math.pow(r.lat-e[l].lat,2)+Math.pow(r.lon-e[l].lon,2));c<o&&(o=c,s=l)}return s>=0?s:null}function ug(r,e,t,s,o){const l=t.map(c=>({lat:(c.lat+90)/180,lon:(c.lon+180)/360}));return{id:r,name:`${e} Sticker`,type:e,mode:s,polygon:l,falloff:0,payload:o}}function cg(r,e){r.stickers||(r.stickers=[]),r.stickers.push(e);const{gridWidth:t,gridHeight:s}=r;for(let o=0;o<s;o++)for(let l=0;l<t;l++){const c=o/s,d=l/t;if(JT(c,d,e.polygon)){const f=o*t+l,h=r.cells[f];if(!h)continue;e.type==="BIOME"&&e.payload.biomeId?h.editBiomeId=e.payload.biomeId:e.type==="HEIGHT"&&e.payload.heightDelta?h.editHeightDelta=Math.max(-1,Math.min(1,h.editHeightDelta+e.payload.heightDelta)):e.type==="CULTURE"&&e.payload.cultureId&&(h.cultureId=e.payload.cultureId)}}}function JT(r,e,t){if(t.length<3)return!1;let s=!1;for(let o=0,l=t.length-1;o<t.length;l=o++){const c=t[o].lon,d=t[o].lat,f=t[l].lon,h=t[l].lat;d>r!=h>r&&e<(f-c)*(r-d)/(h-d)+c&&(s=!s)}return s}function ew(r,e,t){const s=[];let o=!0;return r===1?e>.3&&(s.push("Tundra is unusually warm at this temperature."),o=!1):r===5?e<.55&&(s.push("Jungle is unusually cold at this temperature."),o=!1):r===4&&t>.3&&(s.push("Deserts are typically dry. This location has high rainfall."),o=!1),r===3?t<.25&&(s.push("Forests require substantial moisture. This area is drier than typical."),o=!1):r===4&&t>.2&&(s.push("Deserts are arid. This rainfall level is too high for a desert."),o=!1),e<.15&&r===5&&(s.push("Jungles cannot exist in polar regions."),o=!1),e>.85&&r===1&&(s.push("Tundra cannot exist in tropical regions."),o=!1),s.length===0&&o&&s.push("✓ This placement is realistic for the local climate."),{isValid:o,warnings:s}}function tw({biomeType:r,temperature:e,rainfall:t,warnings:s,onApply:o,onCancel:l}){const c=s.some(d=>!d.startsWith("✓"));return O.jsx("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1e4},onClick:l,children:O.jsxs("div",{style:{background:"rgba(20, 20, 30, 0.95)",border:"1px solid rgba(100, 180, 255, 0.3)",borderRadius:12,padding:24,maxWidth:400,color:"rgba(255,255,255,0.88)",backdropFilter:"blur(8px)"},onClick:d=>d.stopPropagation(),children:[O.jsxs("h3",{style:{margin:"0 0 12px 0",fontSize:16,color:"rgba(100, 200, 255, 0.9)"},children:["Place ",r," Biome?"]}),O.jsxs("div",{style:{fontSize:12,opacity:.75,marginBottom:16},children:[O.jsxs("div",{children:["Temperature: ",(e*100).toFixed(0),"%"]}),O.jsxs("div",{children:["Rainfall: ",(t*100).toFixed(0),"%"]})]}),O.jsx("div",{style:{background:"rgba(0,0,0,0.3)",border:`1px solid ${c?"rgba(255, 100, 100, 0.3)":"rgba(100, 200, 100, 0.3)"}`,borderRadius:8,padding:12,marginBottom:16,fontSize:12,lineHeight:1.6},children:s.map((d,f)=>O.jsx("div",{style:{color:d.startsWith("✓")?"rgba(100, 200, 100, 0.8)":"rgba(255, 150, 100, 0.9)"},children:d},f))}),O.jsxs("div",{style:{display:"flex",gap:10,justifyContent:"flex-end"},children:[O.jsx("button",{onClick:l,style:{padding:"8px 12px",borderRadius:6,border:"1px solid rgba(255,255,255,0.2)",background:"rgba(255,255,255,0.05)",color:"rgba(255,255,255,0.75)",cursor:"pointer",fontSize:12},children:"Cancel"}),O.jsx("button",{onClick:o,style:{padding:"8px 12px",borderRadius:6,border:"1px solid rgba(100, 180, 255, 0.4)",background:c?"rgba(200, 100, 100, 0.2)":"rgba(100, 180, 255, 0.15)",color:"rgba(100, 200, 255, 0.9)",cursor:"pointer",fontSize:12},children:c?"Place Anyway (Override)":"Place"})]})]})})}function nw({world:r,activeStickerTool:e,onStickerCreated:t,onCancel:s}){const o=fe.useRef(null),l=fe.useRef(null),[c,d]=fe.useState([]),[f,h]=fe.useState(null),[g,m]=fe.useState(null),[_,S]=fe.useState(!1);fe.useEffect(()=>{const A=o.current,b=l.current;if(!A||!b)return;const L=A.getContext("2d");if(!L)return;const B=b.getBoundingClientRect();if(A.width=B.width,A.height=B.height,L.fillStyle="rgba(0,0,0,0.1)",L.fillRect(0,0,A.width,A.height),c.length>0){L.strokeStyle="rgba(100, 200, 255, 0.8)",L.fillStyle="rgba(100, 200, 255, 0.15)",L.lineWidth=3,L.beginPath();const U=c[0],I=Ed(U.lat,U.lon,B);L.moveTo(I.x-B.left,I.y-B.top);for(let Q=1;Q<c.length;Q++){const E=c[Q],C=Ed(E.lat,E.lon,B);L.lineTo(C.x-B.left,C.y-B.top)}c.length>2&&L.lineTo(I.x-B.left,I.y-B.top),L.fill(),L.stroke();for(let Q=0;Q<c.length;Q++){const E=c[Q],C=Ed(E.lat,E.lon,B);L.fillStyle=Q===0?"rgba(100, 255, 100, 0.95)":"rgba(255, 100, 100, 0.95)",L.strokeStyle="rgba(255, 255, 255, 0.9)",L.lineWidth=2,L.beginPath(),L.arc(C.x-B.left,C.y-B.top,7,0,Math.PI*2),L.fill(),L.stroke()}}},[c]);const w=A=>{if(!r||!e||!l.current)return;const b=l.current.getBoundingClientRect(),L=Md(A.clientX,A.clientY,b,r.gridWidth,r.gridHeight);if(c.length>=3&&lg(L,c,8)===0){const U=`sticker_${Date.now()}`;let I={};if(e==="BIOME"){I.biomeId=5;const E=c.reduce((k,Y)=>k+Y.lat,0)/c.length,C=c.reduce((k,Y)=>k+Y.lon,0)/c.length,$=Math.floor((90-E)/180*(r?.gridHeight||128)),oe=Math.floor((C+180)/360*(r?.gridWidth||256)),de=$*(r?.gridWidth||256)+oe;if(r&&r.cells[de]){const k=r.cells[de],Y=ew(I.biomeId,k.temperature,k.rainfall);m({stickerId:U,payload:I,temperature:k.temperature,rainfall:k.rainfall,validation:Y}),S(!0);return}}else e==="CULTURE"?I.cultureId="culture_0":e==="HEIGHT"&&(I.heightDelta=.3);const Q=ug(U,e,c,"OVERRIDE",I);cg(r,Q),d([]),t?.(r);return}d([...c,L])},M=A=>{if(f===null||!l.current)return;const b=l.current.getBoundingClientRect(),L=Md(A.clientX,A.clientY,b,r?.gridWidth||256,r?.gridHeight||128),B=[...c];B[f]=L,d(B)},x=A=>{if(!l.current)return;const b=l.current.getBoundingClientRect(),L=Md(A.clientX,A.clientY,b,r?.gridWidth||256,r?.gridHeight||128),B=lg(L,c,8);B!==null&&h(B)},y=()=>{h(null)};return e?O.jsxs("div",{ref:l,style:{position:"absolute",inset:0,zIndex:1e3,cursor:"crosshair"},children:[O.jsx("canvas",{ref:o,onClick:w,onMouseMove:M,onMouseDown:x,onMouseUp:y,onMouseLeave:y,style:{position:"absolute",inset:0,display:"block"}}),O.jsxs("div",{style:{position:"absolute",top:16,left:16,background:"rgba(0,0,0,0.85)",color:"rgba(255,255,255,0.95)",padding:"14px 16px",borderRadius:8,fontSize:12,zIndex:1001,maxWidth:320,border:"1px solid rgba(100,200,255,0.3)"},children:[O.jsxs("div",{style:{fontWeight:700,marginBottom:8,color:"rgba(100,200,255,0.95)"},children:[e==="BIOME"&&"🌍 Biome Sticker",e==="CULTURE"&&"👥 Culture Zone",e==="HEIGHT"&&"⛏️ Terrain Sticker"]}),O.jsx("div",{style:{opacity:.85,marginBottom:10,lineHeight:1.5},children:"Click to place vertices. Close polygon by clicking first vertex (green dot)."}),O.jsxs("div",{style:{fontSize:11,opacity:.7,marginBottom:10},children:["Vertices: ",c.length]}),O.jsxs("div",{style:{display:"flex",gap:8},children:[O.jsx("button",{onClick:()=>{d([]),s?.()},style:{padding:"6px 12px",borderRadius:6,border:"1px solid rgba(255,100,100,0.3)",background:"rgba(255,100,100,0.1)",color:"rgba(255,150,150,0.95)",cursor:"pointer",fontSize:11,fontWeight:600},children:"Cancel"}),c.length>0&&O.jsx("button",{onClick:()=>{d(c.slice(0,-1))},style:{padding:"6px 12px",borderRadius:6,border:"1px solid rgba(200,200,100,0.3)",background:"rgba(200,200,100,0.1)",color:"rgba(255,255,150,0.95)",cursor:"pointer",fontSize:11,fontWeight:600},children:"Undo Vertex"})]})]}),_&&g&&O.jsx(tw,{biomeType:e==="BIOME"?"Biome":e||"",temperature:g.temperature,rainfall:g.rainfall,warnings:g.validation.warnings,onApply:()=>{const A=ug(g.stickerId,e,c,"OVERRIDE",g.payload);r&&(cg(r,A),d([]),m(null),S(!1),t?.(r))},onCancel:()=>{m(null),S(!1)}})]}):null}function iw(){const r=sa(),{worldId:e}=Tg(),[t,s]=fe.useState(!0),[o,l]=fe.useState(null),[c,d]=fe.useState(null),[f,h]=fe.useState(!1),[g,m]=fe.useState("GLOBE"),[_,S]=fe.useState(null),[w,M]=fe.useState(null),[x,y]=fe.useState(null),[A,b]=fe.useState(_n.getWorld());fe.useEffect(()=>_n.subscribe(k=>b(k)),[]),fe.useEffect(()=>{let de=!0;return(async()=>{if(!e){de&&(l("Missing worldId in route."),s(!1));return}s(!0),l(null);try{await _n.loadWorld(e)}catch(k){console.error(k),de&&l(k?.message||"Failed to load world.")}finally{de&&s(!1)}})(),()=>{de=!1}},[e]);const L=fe.useMemo(()=>A?so(A):null,[A]);async function B(){d(null),h(!0);try{await _n.save()}catch(de){console.error(de),d(de?.message||"Save failed.")}finally{h(!1)}}const U=de=>{_n.applyLocalEdit(de)},I=()=>{if(!A)return;const de=Math.floor(Math.random()*4)+5,k=Rg(A,de);A.countries=k,An(A,["TERRAIN_EDIT"]),U(A)},Q=()=>{if(!A)return;const de=A.cells.filter(W=>!W.isWater);if(de.length===0)return;const k=de[Math.floor(Math.random()*de.length)];Math.floor(k.index/A.gridWidth),k.index%A.gridWidth;let Y="TOWN";de.find(W=>{const q=W.index,z=Math.floor(q/A.gridWidth),D=q%A.gridWidth;for(let G=-1;G<=1;G++)for(let X=-1;X<=1;X++){const te=z+G,he=((D+X)%A.gridWidth+A.gridWidth)%A.gridWidth,ve=te*A.gridWidth+he;if(A.cells[ve]?.isWater)return!0}return!1})&&(Y="PORT");const ae={id:`city_${Date.now()}`,name:"City",cellIndex:k.index,population:1e3,type:Y,populationTier:2,isCapital:!1,economicRoles:["TRADE"],tags:[],description:"",countryId:A.countries?.[0]?.id,cultureId:A.cultures?.[0]?.id};A.cities=A.cities||[],A.cities.push(ae),An(A,["TERRAIN_EDIT"]),U(A)},E=[{id:"terrain",title:"Terrain",tools:[{id:"raise",label:"Raise",disabled:!A,active:_==="RAISE",onClick:()=>S(_==="RAISE"?null:"RAISE")},{id:"lower",label:"Lower",disabled:!A,active:_==="LOWER",onClick:()=>S(_==="LOWER"?null:"LOWER")},{id:"smooth",label:"Smooth",disabled:!A,active:_==="SMOOTH",onClick:()=>S(_==="SMOOTH"?null:"SMOOTH")},{id:"flatten",label:"Flatten",disabled:!A,active:_==="FLATTEN",onClick:()=>S(_==="FLATTEN"?null:"FLATTEN")}]},{id:"biomes",title:"Biomes",tools:[{id:"paint_biome",label:"Paint Biome",disabled:!A,active:w==="BIOME",onClick:()=>M(w==="BIOME"?null:"BIOME")},{id:"paint_height",label:"Raise/Lower",disabled:!A,active:w==="HEIGHT",onClick:()=>M(w==="HEIGHT"?null:"HEIGHT")}]},{id:"water",title:"Water",tools:[{id:"river_add",label:"Add River",disabled:!A,active:x==="ADD_RIVER",onClick:()=>y(x==="ADD_RIVER"?null:"ADD_RIVER")},{id:"river_edit",label:"Edit River",disabled:!A,active:x==="EDIT_RIVER",onClick:()=>y(x==="EDIT_RIVER"?null:"EDIT_RIVER")},{id:"lake_add",label:"Set Lake Level",disabled:!A,active:x==="ADD_LAKE",onClick:()=>y(x==="ADD_LAKE"?null:"ADD_LAKE")}]},{id:"volcano",title:"Volcano",tools:[{id:"add_volcano",label:"Add Volcano",disabled:!0}]},{id:"countries",title:"Countries & Borders",tools:[{id:"gen_countries",label:"Generate Countries",disabled:!A,onClick:()=>I()},{id:"edit_border",label:"Edit Border",disabled:!0}]},{id:"culture",title:"Culture",tools:[{id:"add_culture",label:"Add Culture Zone",disabled:!A,active:w==="CULTURE",onClick:()=>M(w==="CULTURE"?null:"CULTURE")}]},{id:"cities",title:"Cities",tools:[{id:"add_city",label:"Add City",disabled:!A,onClick:()=>Q()}]}],C=O.jsxs("div",{style:{padding:14,color:"rgba(255,255,255,0.88)"},children:[O.jsx("h3",{style:{margin:"6px 0 10px 0"},children:"Create"}),O.jsxs("div",{style:{display:"flex",gap:10,marginBottom:12},children:[O.jsx("button",{onClick:B,disabled:!A||t||f,style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:!A||t||f?"not-allowed":"pointer",opacity:!A||t||f?.5:1},children:f?"Saving…":"Save"}),O.jsx("button",{onClick:()=>r(`/sim/${e}`),disabled:!e,style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:e?"pointer":"not-allowed",opacity:e?1:.5},children:"Go to Sim"})]}),c&&O.jsxs("div",{style:{marginBottom:12,padding:10,borderRadius:10,border:"1px solid rgba(255,90,90,0.35)",background:"rgba(255,90,90,0.08)",color:"rgba(255,255,255,0.92)",fontSize:12,lineHeight:1.4},children:[O.jsx("b",{children:"Save failed:"})," ",c]}),O.jsx("div",{style:{fontSize:12,opacity:.8,lineHeight:1.4},children:"Tool implementations come after Phase 1 stability. For now these are blueprint-accurate categories."})]});function $(de,k){const Y=de?.width,J=de?.height,ae=de?.rgba;return!Y||!J?O.jsx("div",{style:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",padding:12,color:"rgba(255,255,255,0.85)",fontSize:13},children:"Generating preview…"}):ae&&ae instanceof Uint8ClampedArray?O.jsx("canvas",{width:Y,height:J,ref:W=>{if(!W)return;const q=W.getContext("2d");if(q)try{const z=new ImageData(ae,Y,J);q.putImageData(z,0,0)}catch(z){console.error("Preview render failed:",z)}},style:{width:"100%",height:"100%",imageRendering:"auto"}}):O.jsx("div",{style:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",padding:12,color:"rgba(255,255,255,0.85)",fontSize:13},children:"No preview available"})}if(t)return O.jsx(ts,{mode:"create",onGoHome:()=>r("/"),worldName:A?.metadata?.name||"Loading…",isDirty:_n.isDirty(),onModeToggle:()=>r(`/sim/${e}`),viewMode:g,onViewModeChange:m,rightPanel:C,toolGroups:E,children:O.jsx("div",{style:{padding:20,color:"rgba(255,255,255,0.85)"},children:"Loading world…"})});if(o)return O.jsx(ts,{mode:"create",onGoHome:()=>r("/"),worldName:"Load Error",isDirty:!1,viewMode:g,onViewModeChange:m,rightPanel:O.jsxs("div",{style:{padding:14,color:"rgba(255,255,255,0.9)"},children:[O.jsx("h3",{style:{margin:"6px 0 10px 0"},children:"Could not load world"}),O.jsx("div",{style:{opacity:.85,marginBottom:12},children:o}),O.jsxs("div",{style:{display:"flex",gap:10,flexWrap:"wrap"},children:[O.jsx("button",{onClick:()=>r("/"),style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Back to Home"}),O.jsx("button",{onClick:()=>r("/generate"),style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Go to Generate"}),O.jsx("button",{onClick:()=>window.location.reload(),style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Reload"})]})]}),children:O.jsx("div",{style:{padding:20}})});const oe=g==="GLOBE";return O.jsx(ts,{mode:"create",onGoHome:()=>r("/"),worldName:A?.metadata?.name||"Create",isDirty:_n.isDirty(),onModeToggle:()=>r(`/sim/${e}`),viewMode:g,onViewModeChange:m,rightPanel:C,toolGroups:E,children:O.jsxs("div",{style:{width:"100%",height:"100%",position:"relative"},children:[g==="GLOBE"&&A?O.jsx("div",{style:{width:"100%",height:"100%"},children:O.jsx(qd,{world:A,preview:L})}):A?O.jsx(QT,{world:A,activeTerrainTool:_,onWorldChange:U}):$(L),w&&O.jsx(nw,{world:A,activeStickerTool:w,onStickerCreated:()=>{M(null),U(A)},onCancel:()=>M(null)}),A&&oe&&O.jsx("div",{style:{position:"absolute",left:16,bottom:16,width:220,height:140,borderRadius:12,overflow:"hidden",border:"1px solid rgba(255,255,255,0.18)",background:"rgba(0,0,0,0.35)",boxShadow:"0 10px 25px rgba(0,0,0,0.35)"},title:"Minimap (Create + Globe only)",children:O.jsx($T,{world:A})})]})})}function rw(r,e){const t=[];for(const s of r.cities)Math.random()<.1&&t.push({id:`city_growth_${s.id}`,type:"CITY_GROWTH",year:e,title:`${s.name} is growing`,description:`Population in ${s.name} has increased significantly.`,affectedCityIds:[s.id],options:[{label:"Accept growth",description:"Population increases by 20%",effect:o=>{const l=o.cities.find(c=>c.id===s.id);l&&(l.population*=1.2)}}],severity:"MINOR",automaticallyResolve:!0});if(r.countries.length>1&&Math.random()<.05){const s=r.countries.sort(()=>Math.random()-.5);s.length>=2&&t.push({id:`war_${e}`,type:"WAR_DECLARATION",year:e,title:`War between ${s[0].name} and ${s[1].name}`,description:"Border tensions have escalated into open conflict.",affectedCountryIds:[s[0].id,s[1].id],options:[{label:"Let conflict resolve naturally",description:"Outcome depends on military strength",effect:o=>{}}],severity:"MAJOR"})}if(r.cultures.length>0&&Math.random()<.03){const s=r.cultures[Math.floor(Math.random()*r.cultures.length)];t.push({id:`culture_split_${s.id}`,type:"CULTURE_SPLIT",year:e,title:`${s.name} culture is fragmenting`,description:`Isolated regions of ${s.name} have begun to diverge culturally.`,affectedCultureIds:[s.id],options:[{label:"Accept split",description:"Creates a new sub-culture",effect:o=>{const l={...s,id:`${s.id}_split`,name:`${s.name} (Reformed)`};o.cultures.push(l)}}],severity:"MODERATE"})}if(Math.random()<.08){const s=Math.random()<.5?"DROUGHT":"PLAGUE",o=s==="DROUGHT"?"Severe drought in the south":"Plague outbreak in the cities";t.push({id:`disaster_${e}`,type:s,year:e,title:o,description:s==="DROUGHT"?"Agricultural output has dropped significantly due to lack of rain.":"A deadly plague is spreading through major population centers.",affectedCityIds:r.cities.slice(0,Math.floor(r.cities.length/3)).map(l=>l.id),options:[{label:"Accept losses",description:"Population affected by disaster",effect:l=>{}}],severity:"MAJOR"})}return t}function dg(r,e,t){return e<0||e>=r.options.length?!1:(r.options[e].effect(t),!0)}function sw(r,e=0,t=`Branch ${new Date().toISOString()}`){return{id:`branch_${Date.now()}`,name:t,baseWorldId:r.metadata.id,worldSnapshot:JSON.parse(JSON.stringify(r)),startYear:e,currentYear:e,eventHistory:[],createdAt:new Date().toISOString(),isPromoted:!1}}const ow=({events:r,onResolveEvent:e,onAutoResolveAll:t})=>{const[s,o]=fe.useState(r.length>0?r[0].id:null),l=r.find(c=>c.id===s);return O.jsxs("div",{style:{position:"fixed",right:20,top:180,width:320,maxHeight:500,backgroundColor:"#222",border:"2px solid #666",borderRadius:8,boxShadow:"0 4px 12px rgba(0,0,0,0.5)",display:"flex",flexDirection:"column",fontFamily:"monospace",fontSize:"12px",zIndex:1e3},children:[O.jsxs("div",{style:{padding:"8px 12px",backgroundColor:"#111",borderBottom:"1px solid #666",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[O.jsxs("span",{style:{color:"#fff",fontWeight:"bold"},children:["Inbox (",r.length,")"]}),r.length>0&&O.jsx("button",{onClick:t,style:{padding:"2px 6px",backgroundColor:"#444",color:"#fff",border:"1px solid #666",borderRadius:3,cursor:"pointer",fontSize:"10px"},children:"Auto-Resolve All"})]}),O.jsx("div",{style:{overflowY:"auto",flex:1,maxHeight:200},children:r.length===0?O.jsx("div",{style:{padding:"12px",color:"#888",textAlign:"center"},children:"No pending decisions"}):r.map(c=>O.jsxs("div",{onClick:()=>o(c.id),style:{padding:"8px 12px",borderBottom:"1px solid #444",cursor:"pointer",backgroundColor:c.id===s?"#333":"transparent",transition:"background-color 0.2s"},onMouseEnter:d=>{c.id!==s&&(d.currentTarget.style.backgroundColor="#2a2a2a")},onMouseLeave:d=>{c.id!==s&&(d.currentTarget.style.backgroundColor="transparent")},children:[O.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4},children:[O.jsx("span",{style:{color:c.severity==="MAJOR"?"#ff6b6b":c.severity==="MODERATE"?"#ffd93d":"#88ff88",fontWeight:"bold",flex:1},children:c.title}),O.jsxs("span",{style:{color:"#888",fontSize:"10px"},children:["Y",c.year]})]}),O.jsx("div",{style:{color:"#aaa",fontSize:"11px"},children:c.type})]},c.id))}),l&&O.jsxs("div",{style:{borderTop:"1px solid #666",padding:"12px"},children:[O.jsxs("div",{style:{marginBottom:8,color:"#fff"},children:[O.jsx("div",{style:{fontWeight:"bold",color:l.severity==="MAJOR"?"#ff6b6b":l.severity==="MODERATE"?"#ffd93d":"#88ff88",marginBottom:4},children:l.title}),O.jsx("div",{style:{color:"#aaa",fontSize:"11px",marginBottom:8},children:l.description})]}),O.jsx("div",{style:{display:"flex",flexDirection:"column",gap:6},children:l.options.map((c,d)=>O.jsxs("button",{onClick:()=>{e(l.id,d),o(null)},style:{padding:"6px 8px",backgroundColor:"#444",color:"#fff",border:"1px solid #666",borderRadius:4,cursor:"pointer",fontSize:"11px",textAlign:"left",transition:"all 0.2s"},onMouseEnter:f=>{f.currentTarget.style.backgroundColor="#555"},onMouseLeave:f=>{f.currentTarget.style.backgroundColor="#444"},children:[O.jsx("div",{style:{fontWeight:"bold"},children:c.label}),O.jsx("div",{style:{color:"#aaa",fontSize:"10px"},children:c.description})]},d))})]})]})},aw=({history:r})=>O.jsxs("div",{style:{position:"fixed",left:20,top:180,width:280,maxHeight:400,backgroundColor:"#222",border:"2px solid #666",borderRadius:8,boxShadow:"0 4px 12px rgba(0,0,0,0.5)",fontFamily:"monospace",fontSize:"11px",zIndex:1e3,overflowY:"auto"},children:[O.jsxs("div",{style:{padding:"8px 12px",backgroundColor:"#111",borderBottom:"1px solid #666",fontWeight:"bold",color:"#fff",position:"sticky",top:0},children:["Event History (",r.length,")"]}),O.jsx("div",{style:{padding:8},children:r.length===0?O.jsx("div",{style:{color:"#888",textAlign:"center",padding:12},children:"No events yet"}):r.slice().reverse().map((e,t)=>O.jsxs("div",{style:{marginBottom:8,padding:8,backgroundColor:"rgba(255,255,255,0.03)",borderRadius:6,borderLeft:e.event.severity==="MAJOR"?"3px solid #ff6b6b":e.event.severity==="MODERATE"?"3px solid #ffd93d":"3px solid #88ff88"},children:[O.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:4},children:[O.jsx("span",{style:{fontWeight:"bold",color:"#fff"},children:e.event.title}),O.jsxs("span",{style:{color:"#888",fontSize:10},children:["Y",e.resolvedYear]})]}),O.jsx("div",{style:{color:"#aaa",fontSize:10,marginBottom:4},children:e.event.description}),O.jsxs("div",{style:{color:"#88ff88",fontSize:10,fontStyle:"italic"},children:["→ ",e.event.options[e.chosenOption]?.label]})]},t))})]});function lw(){const r=sa(),{worldId:e}=Tg(),[t,s]=fe.useState(!0),[o,l]=fe.useState(null),[c,d]=fe.useState(_n.getWorld());fe.useEffect(()=>_n.subscribe(C=>d(C)),[]);const[f,h]=fe.useState(0),[g,m]=fe.useState([]),[_,S]=fe.useState([]),[w,M]=fe.useState(!1),[x,y]=fe.useState([]),[A,b]=fe.useState(!1);fe.useEffect(()=>{let E=!0;return(async()=>{if(!e){E&&(l("Missing worldId in route."),s(!1));return}s(!0),l(null);try{await _n.loadWorld(e)}catch(C){console.error(C),E&&l(C?.message||"Failed to load world.")}finally{E&&s(!1)}})(),()=>{E=!1}},[e]);const L=()=>{if(!c)return;const E=f+1;h(E);const C=rw(c,E);m($=>[...$,...C])},B=(E,C)=>{const $=g.find(oe=>oe.id===E);!$||!c||(dg($,C,c),_n.applyLocalEdit(c),m(oe=>oe.filter(de=>de.id!==E)),y(oe=>[...oe,{event:$,chosenOption:C,resolvedYear:f}]))},U=()=>{if(c){for(const E of g)E.automaticallyResolve&&E.options.length>0&&dg(E,0,c);_n.applyLocalEdit(c),m(E=>E.filter(C=>!C.automaticallyResolve||C.options.length===0))}},I=E=>{if(!c)return;const C=sw(c,f,E);S($=>[...$,C]),M(!1)},Q=O.jsxs("div",{style:{padding:14,color:"rgba(255,255,255,0.88)"},children:[O.jsxs("h3",{style:{margin:"6px 0 10px 0"},children:["Sim Year ",f]}),O.jsxs("div",{style:{display:"flex",gap:10,marginBottom:12},children:[O.jsx("button",{onClick:L,disabled:!c||t,style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:!c||t?"not-allowed":"pointer",opacity:!c||t?.5:1},children:"Tick"}),O.jsx("button",{onClick:()=>r(`/create/${e}`),disabled:!e,style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:e?"pointer":"not-allowed",opacity:e?1:.5},children:"Back to Create"})]}),O.jsxs("div",{style:{marginBottom:12,borderTop:"1px solid rgba(255,255,255,0.1)",paddingTop:10},children:[O.jsxs("button",{onClick:()=>b(!A),style:{padding:"8px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(100,150,255,0.15)",color:"rgba(150,200,255,0.9)",cursor:"pointer",fontSize:12,width:"100%",marginBottom:8},children:[A?"Hide":"Show"," History (",x.length,")"]}),O.jsxs("button",{onClick:()=>M(!w),style:{padding:"8px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(100,150,255,0.15)",color:"rgba(150,200,255,0.9)",cursor:"pointer",fontSize:12,width:"100%",marginBottom:8},children:["Branches (",_.length,")"]}),w&&O.jsxs("div",{style:{fontSize:11,backgroundColor:"rgba(0,0,0,0.3)",padding:8,borderRadius:6,marginBottom:8},children:[_.map(E=>O.jsxs("div",{style:{padding:4,marginBottom:4,backgroundColor:"rgba(255,255,255,0.05)",borderRadius:4,borderLeft:E.isPromoted?"2px solid #88ff88":"2px solid #888"},children:[O.jsx("div",{style:{fontWeight:"bold"},children:E.name}),O.jsxs("div",{style:{fontSize:10,opacity:.7},children:["Y",E.currentYear]})]},E.id)),O.jsx("input",{type:"text",placeholder:"Branch name…",onKeyPress:E=>{E.key==="Enter"&&E.currentTarget.value&&(I(E.currentTarget.value),E.currentTarget.value="")},style:{width:"100%",padding:"4px 6px",borderRadius:4,border:"1px solid rgba(255,255,255,0.1)",backgroundColor:"rgba(0,0,0,0.3)",color:"rgba(255,255,255,0.9)",fontSize:11}})]})]}),O.jsx("div",{style:{fontSize:12,opacity:.8,lineHeight:1.4},children:"Culture, Trade, and Route overlays coming soon."})]});return t?O.jsx(ts,{mode:"sim",onGoHome:()=>r("/"),worldName:c?.metadata?.name||"Loading…",isDirty:_n.isDirty(),onModeToggle:()=>r(`/create/${e}`),rightPanel:Q,leftTools:[{id:"overview",label:"Overview",disabled:!0},{id:"culture",label:"Culture",disabled:!0},{id:"trade",label:"Trade",disabled:!0},{id:"routes",label:"Routes",disabled:!0}],children:O.jsx("div",{style:{padding:20,color:"rgba(255,255,255,0.85)"},children:"Loading world…"})}):o?O.jsx(ts,{mode:"sim",onGoHome:()=>r("/"),worldName:"Load Error",isDirty:!1,rightPanel:O.jsxs("div",{style:{padding:14,color:"rgba(255,255,255,0.9)"},children:[O.jsx("h3",{style:{margin:"6px 0 10px 0"},children:"Could not load world"}),O.jsx("div",{style:{opacity:.85,marginBottom:12},children:o}),O.jsxs("div",{style:{display:"flex",gap:10},children:[O.jsx("button",{onClick:()=>r("/"),style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Back to Home"}),O.jsx("button",{onClick:()=>r("/generate"),style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Go to Generate"}),O.jsx("button",{onClick:()=>window.location.reload(),style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Reload"})]})]}),children:O.jsx("div",{style:{padding:20,color:"rgba(255,255,255,0.85)"}})}):O.jsx(ts,{mode:"sim",onGoHome:()=>r("/"),worldName:c?.metadata?.name||"Sim",isDirty:_n.isDirty(),onModeToggle:()=>r(`/create/${e}`),rightPanel:Q,toolGroups:[{id:"sim",title:"Sim Tools",tools:[{id:"overview",label:"Overview",disabled:!0},{id:"culture",label:"Culture",disabled:!0},{id:"trade",label:"Trade",disabled:!0},{id:"routes",label:"Routes",disabled:!0}]}],children:O.jsx("div",{style:{width:"100%",height:"100%",position:"relative"},children:c?O.jsxs(O.Fragment,{children:[O.jsx(qd,{world:c,className:""}),O.jsx(ow,{events:g,onResolveEvent:B,onAutoResolveAll:U}),A&&O.jsx(aw,{history:x})]}):O.jsx("div",{style:{padding:20,color:"rgba(255,255,255,0.85)"},children:"No world loaded."})})})}function uw(){return O.jsxs(X_,{children:[O.jsx(qs,{path:"/",element:O.jsx(tx,{})}),O.jsx(qs,{path:"/generate",element:O.jsx(YT,{})}),O.jsx(qs,{path:"/create/:worldId",element:O.jsx(iw,{})}),O.jsx(qs,{path:"/sim/:worldId",element:O.jsx(lw,{})}),O.jsx(qs,{path:"*",element:O.jsx(W_,{to:"/",replace:!0})})]})}e_.createRoot(document.getElementById("root")).render(O.jsx(hg.StrictMode,{children:O.jsx($_,{children:O.jsx(uw,{})})}));
