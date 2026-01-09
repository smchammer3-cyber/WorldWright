function Hv(r,e){for(var t=0;t<e.length;t++){const s=e[t];if(typeof s!="string"&&!Array.isArray(s)){for(const o in s)if(o!=="default"&&!(o in r)){const l=Object.getOwnPropertyDescriptor(s,o);l&&Object.defineProperty(r,o,l.get?l:{enumerable:!0,get:()=>s[o]})}}}return Object.freeze(Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function t(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(o){if(o.ep)return;o.ep=!0;const l=t(o);fetch(o.href,l)}})();function cg(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Iu={exports:{}},Go={},Nu={exports:{}},pt={};var gp;function Gv(){if(gp)return pt;gp=1;var r=Symbol.for("react.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),u=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),m=Symbol.iterator;function _(I){return I===null||typeof I!="object"?null:(I=m&&I[m]||I["@@iterator"],typeof I=="function"?I:null)}var S={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},E=Object.assign,M={};function x(I,z,Y){this.props=I,this.context=z,this.refs=M,this.updater=Y||S}x.prototype.isReactComponent={},x.prototype.setState=function(I,z){if(typeof I!="object"&&typeof I!="function"&&I!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,I,z,"setState")},x.prototype.forceUpdate=function(I){this.updater.enqueueForceUpdate(this,I,"forceUpdate")};function y(){}y.prototype=x.prototype;function w(I,z,Y){this.props=I,this.context=z,this.refs=M,this.updater=Y||S}var R=w.prototype=new y;R.constructor=w,E(R,x.prototype),R.isPureReactComponent=!0;var b=Array.isArray,G=Object.prototype.hasOwnProperty,B={current:null},U={key:!0,ref:!0,__self:!0,__source:!0};function he(I,z,Y){var Q,pe={},xe=null,ye=null;if(z!=null)for(Q in z.ref!==void 0&&(ye=z.ref),z.key!==void 0&&(xe=""+z.key),z)G.call(z,Q)&&!U.hasOwnProperty(Q)&&(pe[Q]=z[Q]);var ue=arguments.length-2;if(ue===1)pe.children=Y;else if(1<ue){for(var fe=Array(ue),Te=0;Te<ue;Te++)fe[Te]=arguments[Te+2];pe.children=fe}if(I&&I.defaultProps)for(Q in ue=I.defaultProps,ue)pe[Q]===void 0&&(pe[Q]=ue[Q]);return{$$typeof:r,type:I,key:xe,ref:ye,props:pe,_owner:B.current}}function C(I,z){return{$$typeof:r,type:I.type,key:z,ref:I.ref,props:I.props,_owner:I._owner}}function D(I){return typeof I=="object"&&I!==null&&I.$$typeof===r}function te(I){var z={"=":"=0",":":"=2"};return"$"+I.replace(/[=:]/g,function(Y){return z[Y]})}var ie=/\/+/g;function ae(I,z){return typeof I=="object"&&I!==null&&I.key!=null?te(""+I.key):z.toString(36)}function k(I,z,Y,Q,pe){var xe=typeof I;(xe==="undefined"||xe==="boolean")&&(I=null);var ye=!1;if(I===null)ye=!0;else switch(xe){case"string":case"number":ye=!0;break;case"object":switch(I.$$typeof){case r:case e:ye=!0}}if(ye)return ye=I,pe=pe(ye),I=Q===""?"."+ae(ye,0):Q,b(pe)?(Y="",I!=null&&(Y=I.replace(ie,"$&/")+"/"),k(pe,z,Y,"",function(Te){return Te})):pe!=null&&(D(pe)&&(pe=C(pe,Y+(!pe.key||ye&&ye.key===pe.key?"":(""+pe.key).replace(ie,"$&/")+"/")+I)),z.push(pe)),1;if(ye=0,Q=Q===""?".":Q+":",b(I))for(var ue=0;ue<I.length;ue++){xe=I[ue];var fe=Q+ae(xe,ue);ye+=k(xe,z,Y,fe,pe)}else if(fe=_(I),typeof fe=="function")for(I=fe.call(I),ue=0;!(xe=I.next()).done;)xe=xe.value,fe=Q+ae(xe,ue++),ye+=k(xe,z,Y,fe,pe);else if(xe==="object")throw z=String(I),Error("Objects are not valid as a React child (found: "+(z==="[object Object]"?"object with keys {"+Object.keys(I).join(", ")+"}":z)+"). If you meant to render a collection of children, use an array instead.");return ye}function H(I,z,Y){if(I==null)return I;var Q=[],pe=0;return k(I,Q,"","",function(xe){return z.call(Y,xe,pe++)}),Q}function q(I){if(I._status===-1){var z=I._result;z=z(),z.then(function(Y){(I._status===0||I._status===-1)&&(I._status=1,I._result=Y)},function(Y){(I._status===0||I._status===-1)&&(I._status=2,I._result=Y)}),I._status===-1&&(I._status=0,I._result=z)}if(I._status===1)return I._result.default;throw I._result}var K={current:null},N={transition:null},X={ReactCurrentDispatcher:K,ReactCurrentBatchConfig:N,ReactCurrentOwner:B};function V(){throw Error("act(...) is not supported in production builds of React.")}return pt.Children={map:H,forEach:function(I,z,Y){H(I,function(){z.apply(this,arguments)},Y)},count:function(I){var z=0;return H(I,function(){z++}),z},toArray:function(I){return H(I,function(z){return z})||[]},only:function(I){if(!D(I))throw Error("React.Children.only expected to receive a single React element child.");return I}},pt.Component=x,pt.Fragment=t,pt.Profiler=o,pt.PureComponent=w,pt.StrictMode=s,pt.Suspense=f,pt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=X,pt.act=V,pt.cloneElement=function(I,z,Y){if(I==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+I+".");var Q=E({},I.props),pe=I.key,xe=I.ref,ye=I._owner;if(z!=null){if(z.ref!==void 0&&(xe=z.ref,ye=B.current),z.key!==void 0&&(pe=""+z.key),I.type&&I.type.defaultProps)var ue=I.type.defaultProps;for(fe in z)G.call(z,fe)&&!U.hasOwnProperty(fe)&&(Q[fe]=z[fe]===void 0&&ue!==void 0?ue[fe]:z[fe])}var fe=arguments.length-2;if(fe===1)Q.children=Y;else if(1<fe){ue=Array(fe);for(var Te=0;Te<fe;Te++)ue[Te]=arguments[Te+2];Q.children=ue}return{$$typeof:r,type:I.type,key:pe,ref:xe,props:Q,_owner:ye}},pt.createContext=function(I){return I={$$typeof:u,_currentValue:I,_currentValue2:I,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},I.Provider={$$typeof:l,_context:I},I.Consumer=I},pt.createElement=he,pt.createFactory=function(I){var z=he.bind(null,I);return z.type=I,z},pt.createRef=function(){return{current:null}},pt.forwardRef=function(I){return{$$typeof:d,render:I}},pt.isValidElement=D,pt.lazy=function(I){return{$$typeof:g,_payload:{_status:-1,_result:I},_init:q}},pt.memo=function(I,z){return{$$typeof:p,type:I,compare:z===void 0?null:z}},pt.startTransition=function(I){var z=N.transition;N.transition={};try{I()}finally{N.transition=z}},pt.unstable_act=V,pt.useCallback=function(I,z){return K.current.useCallback(I,z)},pt.useContext=function(I){return K.current.useContext(I)},pt.useDebugValue=function(){},pt.useDeferredValue=function(I){return K.current.useDeferredValue(I)},pt.useEffect=function(I,z){return K.current.useEffect(I,z)},pt.useId=function(){return K.current.useId()},pt.useImperativeHandle=function(I,z,Y){return K.current.useImperativeHandle(I,z,Y)},pt.useInsertionEffect=function(I,z){return K.current.useInsertionEffect(I,z)},pt.useLayoutEffect=function(I,z){return K.current.useLayoutEffect(I,z)},pt.useMemo=function(I,z){return K.current.useMemo(I,z)},pt.useReducer=function(I,z,Y){return K.current.useReducer(I,z,Y)},pt.useRef=function(I){return K.current.useRef(I)},pt.useState=function(I){return K.current.useState(I)},pt.useSyncExternalStore=function(I,z,Y){return K.current.useSyncExternalStore(I,z,Y)},pt.useTransition=function(){return K.current.useTransition()},pt.version="18.3.1",pt}var vp;function Nd(){return vp||(vp=1,Nu.exports=Gv()),Nu.exports}var _p;function Vv(){if(_p)return Go;_p=1;var r=Nd(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,o=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function u(d,f,p){var g,m={},_=null,S=null;p!==void 0&&(_=""+p),f.key!==void 0&&(_=""+f.key),f.ref!==void 0&&(S=f.ref);for(g in f)s.call(f,g)&&!l.hasOwnProperty(g)&&(m[g]=f[g]);if(d&&d.defaultProps)for(g in f=d.defaultProps,f)m[g]===void 0&&(m[g]=f[g]);return{$$typeof:e,type:d,key:_,ref:S,props:m,_owner:o.current}}return Go.Fragment=t,Go.jsx=u,Go.jsxs=u,Go}var xp;function Wv(){return xp||(xp=1,Iu.exports=Vv()),Iu.exports}var O=Wv(),ve=Nd();const ug=cg(ve),jv=Hv({__proto__:null,default:ug},[ve]);var ml={},Uu={exports:{}},In={},Ou={exports:{}},Fu={};var yp;function Xv(){return yp||(yp=1,(function(r){function e(N,X){var V=N.length;N.push(X);e:for(;0<V;){var I=V-1>>>1,z=N[I];if(0<o(z,X))N[I]=X,N[V]=z,V=I;else break e}}function t(N){return N.length===0?null:N[0]}function s(N){if(N.length===0)return null;var X=N[0],V=N.pop();if(V!==X){N[0]=V;e:for(var I=0,z=N.length,Y=z>>>1;I<Y;){var Q=2*(I+1)-1,pe=N[Q],xe=Q+1,ye=N[xe];if(0>o(pe,V))xe<z&&0>o(ye,pe)?(N[I]=ye,N[xe]=V,I=xe):(N[I]=pe,N[Q]=V,I=Q);else if(xe<z&&0>o(ye,V))N[I]=ye,N[xe]=V,I=xe;else break e}}return X}function o(N,X){var V=N.sortIndex-X.sortIndex;return V!==0?V:N.id-X.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;r.unstable_now=function(){return l.now()}}else{var u=Date,d=u.now();r.unstable_now=function(){return u.now()-d}}var f=[],p=[],g=1,m=null,_=3,S=!1,E=!1,M=!1,x=typeof setTimeout=="function"?setTimeout:null,y=typeof clearTimeout=="function"?clearTimeout:null,w=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function R(N){for(var X=t(p);X!==null;){if(X.callback===null)s(p);else if(X.startTime<=N)s(p),X.sortIndex=X.expirationTime,e(f,X);else break;X=t(p)}}function b(N){if(M=!1,R(N),!E)if(t(f)!==null)E=!0,q(G);else{var X=t(p);X!==null&&K(b,X.startTime-N)}}function G(N,X){E=!1,M&&(M=!1,y(he),he=-1),S=!0;var V=_;try{for(R(X),m=t(f);m!==null&&(!(m.expirationTime>X)||N&&!te());){var I=m.callback;if(typeof I=="function"){m.callback=null,_=m.priorityLevel;var z=I(m.expirationTime<=X);X=r.unstable_now(),typeof z=="function"?m.callback=z:m===t(f)&&s(f),R(X)}else s(f);m=t(f)}if(m!==null)var Y=!0;else{var Q=t(p);Q!==null&&K(b,Q.startTime-X),Y=!1}return Y}finally{m=null,_=V,S=!1}}var B=!1,U=null,he=-1,C=5,D=-1;function te(){return!(r.unstable_now()-D<C)}function ie(){if(U!==null){var N=r.unstable_now();D=N;var X=!0;try{X=U(!0,N)}finally{X?ae():(B=!1,U=null)}}else B=!1}var ae;if(typeof w=="function")ae=function(){w(ie)};else if(typeof MessageChannel<"u"){var k=new MessageChannel,H=k.port2;k.port1.onmessage=ie,ae=function(){H.postMessage(null)}}else ae=function(){x(ie,0)};function q(N){U=N,B||(B=!0,ae())}function K(N,X){he=x(function(){N(r.unstable_now())},X)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(N){N.callback=null},r.unstable_continueExecution=function(){E||S||(E=!0,q(G))},r.unstable_forceFrameRate=function(N){0>N||125<N?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):C=0<N?Math.floor(1e3/N):5},r.unstable_getCurrentPriorityLevel=function(){return _},r.unstable_getFirstCallbackNode=function(){return t(f)},r.unstable_next=function(N){switch(_){case 1:case 2:case 3:var X=3;break;default:X=_}var V=_;_=X;try{return N()}finally{_=V}},r.unstable_pauseExecution=function(){},r.unstable_requestPaint=function(){},r.unstable_runWithPriority=function(N,X){switch(N){case 1:case 2:case 3:case 4:case 5:break;default:N=3}var V=_;_=N;try{return X()}finally{_=V}},r.unstable_scheduleCallback=function(N,X,V){var I=r.unstable_now();switch(typeof V=="object"&&V!==null?(V=V.delay,V=typeof V=="number"&&0<V?I+V:I):V=I,N){case 1:var z=-1;break;case 2:z=250;break;case 5:z=1073741823;break;case 4:z=1e4;break;default:z=5e3}return z=V+z,N={id:g++,callback:X,priorityLevel:N,startTime:V,expirationTime:z,sortIndex:-1},V>I?(N.sortIndex=V,e(p,N),t(f)===null&&N===t(p)&&(M?(y(he),he=-1):M=!0,K(b,V-I))):(N.sortIndex=z,e(f,N),E||S||(E=!0,q(G))),N},r.unstable_shouldYield=te,r.unstable_wrapCallback=function(N){var X=_;return function(){var V=_;_=X;try{return N.apply(this,arguments)}finally{_=V}}}})(Fu)),Fu}var Sp;function Yv(){return Sp||(Sp=1,Ou.exports=Xv()),Ou.exports}var Mp;function qv(){if(Mp)return In;Mp=1;var r=Nd(),e=Yv();function t(n){for(var i="https://reactjs.org/docs/error-decoder.html?invariant="+n,a=1;a<arguments.length;a++)i+="&args[]="+encodeURIComponent(arguments[a]);return"Minified React error #"+n+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var s=new Set,o={};function l(n,i){u(n,i),u(n+"Capture",i)}function u(n,i){for(o[n]=i,n=0;n<i.length;n++)s.add(i[n])}var d=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),f=Object.prototype.hasOwnProperty,p=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,g={},m={};function _(n){return f.call(m,n)?!0:f.call(g,n)?!1:p.test(n)?m[n]=!0:(g[n]=!0,!1)}function S(n,i,a,c){if(a!==null&&a.type===0)return!1;switch(typeof i){case"function":case"symbol":return!0;case"boolean":return c?!1:a!==null?!a.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function E(n,i,a,c){if(i===null||typeof i>"u"||S(n,i,a,c))return!0;if(c)return!1;if(a!==null)switch(a.type){case 3:return!i;case 4:return i===!1;case 5:return isNaN(i);case 6:return isNaN(i)||1>i}return!1}function M(n,i,a,c,h,v,T){this.acceptsBooleans=i===2||i===3||i===4,this.attributeName=c,this.attributeNamespace=h,this.mustUseProperty=a,this.propertyName=n,this.type=i,this.sanitizeURL=v,this.removeEmptyString=T}var x={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){x[n]=new M(n,0,!1,n,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var i=n[0];x[i]=new M(i,1,!1,n[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(n){x[n]=new M(n,2,!1,n.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){x[n]=new M(n,2,!1,n,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){x[n]=new M(n,3,!1,n.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(n){x[n]=new M(n,3,!0,n,null,!1,!1)}),["capture","download"].forEach(function(n){x[n]=new M(n,4,!1,n,null,!1,!1)}),["cols","rows","size","span"].forEach(function(n){x[n]=new M(n,6,!1,n,null,!1,!1)}),["rowSpan","start"].forEach(function(n){x[n]=new M(n,5,!1,n.toLowerCase(),null,!1,!1)});var y=/[\-:]([a-z])/g;function w(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var i=n.replace(y,w);x[i]=new M(i,1,!1,n,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var i=n.replace(y,w);x[i]=new M(i,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(n){var i=n.replace(y,w);x[i]=new M(i,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(n){x[n]=new M(n,1,!1,n.toLowerCase(),null,!1,!1)}),x.xlinkHref=new M("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(n){x[n]=new M(n,1,!1,n.toLowerCase(),null,!0,!0)});function R(n,i,a,c){var h=x.hasOwnProperty(i)?x[i]:null;(h!==null?h.type!==0:c||!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(E(i,a,h,c)&&(a=null),c||h===null?_(i)&&(a===null?n.removeAttribute(i):n.setAttribute(i,""+a)):h.mustUseProperty?n[h.propertyName]=a===null?h.type===3?!1:"":a:(i=h.attributeName,c=h.attributeNamespace,a===null?n.removeAttribute(i):(h=h.type,a=h===3||h===4&&a===!0?"":""+a,c?n.setAttributeNS(c,i,a):n.setAttribute(i,a))))}var b=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,G=Symbol.for("react.element"),B=Symbol.for("react.portal"),U=Symbol.for("react.fragment"),he=Symbol.for("react.strict_mode"),C=Symbol.for("react.profiler"),D=Symbol.for("react.provider"),te=Symbol.for("react.context"),ie=Symbol.for("react.forward_ref"),ae=Symbol.for("react.suspense"),k=Symbol.for("react.suspense_list"),H=Symbol.for("react.memo"),q=Symbol.for("react.lazy"),K=Symbol.for("react.offscreen"),N=Symbol.iterator;function X(n){return n===null||typeof n!="object"?null:(n=N&&n[N]||n["@@iterator"],typeof n=="function"?n:null)}var V=Object.assign,I;function z(n){if(I===void 0)try{throw Error()}catch(a){var i=a.stack.trim().match(/\n( *(at )?)/);I=i&&i[1]||""}return`
`+I+n}var Y=!1;function Q(n,i){if(!n||Y)return"";Y=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(i)if(i=function(){throw Error()},Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(se){var c=se}Reflect.construct(n,[],i)}else{try{i.call()}catch(se){c=se}n.call(i.prototype)}else{try{throw Error()}catch(se){c=se}n()}}catch(se){if(se&&c&&typeof se.stack=="string"){for(var h=se.stack.split(`
`),v=c.stack.split(`
`),T=h.length-1,F=v.length-1;1<=T&&0<=F&&h[T]!==v[F];)F--;for(;1<=T&&0<=F;T--,F--)if(h[T]!==v[F]){if(T!==1||F!==1)do if(T--,F--,0>F||h[T]!==v[F]){var W=`
`+h[T].replace(" at new "," at ");return n.displayName&&W.includes("<anonymous>")&&(W=W.replace("<anonymous>",n.displayName)),W}while(1<=T&&0<=F);break}}}finally{Y=!1,Error.prepareStackTrace=a}return(n=n?n.displayName||n.name:"")?z(n):""}function pe(n){switch(n.tag){case 5:return z(n.type);case 16:return z("Lazy");case 13:return z("Suspense");case 19:return z("SuspenseList");case 0:case 2:case 15:return n=Q(n.type,!1),n;case 11:return n=Q(n.type.render,!1),n;case 1:return n=Q(n.type,!0),n;default:return""}}function xe(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case U:return"Fragment";case B:return"Portal";case C:return"Profiler";case he:return"StrictMode";case ae:return"Suspense";case k:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case te:return(n.displayName||"Context")+".Consumer";case D:return(n._context.displayName||"Context")+".Provider";case ie:var i=n.render;return n=n.displayName,n||(n=i.displayName||i.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case H:return i=n.displayName||null,i!==null?i:xe(n.type)||"Memo";case q:i=n._payload,n=n._init;try{return xe(n(i))}catch{}}return null}function ye(n){var i=n.type;switch(n.tag){case 24:return"Cache";case 9:return(i.displayName||"Context")+".Consumer";case 10:return(i._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=i.render,n=n.displayName||n.name||"",i.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return xe(i);case 8:return i===he?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof i=="function")return i.displayName||i.name||null;if(typeof i=="string")return i}return null}function ue(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function fe(n){var i=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Te(n){var i=fe(n)?"checked":"value",a=Object.getOwnPropertyDescriptor(n.constructor.prototype,i),c=""+n[i];if(!n.hasOwnProperty(i)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var h=a.get,v=a.set;return Object.defineProperty(n,i,{configurable:!0,get:function(){return h.call(this)},set:function(T){c=""+T,v.call(this,T)}}),Object.defineProperty(n,i,{enumerable:a.enumerable}),{getValue:function(){return c},setValue:function(T){c=""+T},stopTracking:function(){n._valueTracker=null,delete n[i]}}}}function Ge(n){n._valueTracker||(n._valueTracker=Te(n))}function Z(n){if(!n)return!1;var i=n._valueTracker;if(!i)return!0;var a=i.getValue(),c="";return n&&(c=fe(n)?n.checked?"true":"false":n.value),n=c,n!==a?(i.setValue(n),!0):!1}function ht(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function Fe(n,i){var a=i.checked;return V({},i,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:a??n._wrapperState.initialChecked})}function Ne(n,i){var a=i.defaultValue==null?"":i.defaultValue,c=i.checked!=null?i.checked:i.defaultChecked;a=ue(i.value!=null?i.value:a),n._wrapperState={initialChecked:c,initialValue:a,controlled:i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null}}function Pe(n,i){i=i.checked,i!=null&&R(n,"checked",i,!1)}function $e(n,i){Pe(n,i);var a=ue(i.value),c=i.type;if(a!=null)c==="number"?(a===0&&n.value===""||n.value!=a)&&(n.value=""+a):n.value!==""+a&&(n.value=""+a);else if(c==="submit"||c==="reset"){n.removeAttribute("value");return}i.hasOwnProperty("value")?L(n,i.type,a):i.hasOwnProperty("defaultValue")&&L(n,i.type,ue(i.defaultValue)),i.checked==null&&i.defaultChecked!=null&&(n.defaultChecked=!!i.defaultChecked)}function Xe(n,i,a){if(i.hasOwnProperty("value")||i.hasOwnProperty("defaultValue")){var c=i.type;if(!(c!=="submit"&&c!=="reset"||i.value!==void 0&&i.value!==null))return;i=""+n._wrapperState.initialValue,a||i===n.value||(n.value=i),n.defaultValue=i}a=n.name,a!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,a!==""&&(n.name=a)}function L(n,i,a){(i!=="number"||ht(n.ownerDocument)!==n)&&(a==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+a&&(n.defaultValue=""+a))}var A=Array.isArray;function ne(n,i,a,c){if(n=n.options,i){i={};for(var h=0;h<a.length;h++)i["$"+a[h]]=!0;for(a=0;a<n.length;a++)h=i.hasOwnProperty("$"+n[a].value),n[a].selected!==h&&(n[a].selected=h),h&&c&&(n[a].defaultSelected=!0)}else{for(a=""+ue(a),i=null,h=0;h<n.length;h++){if(n[h].value===a){n[h].selected=!0,c&&(n[h].defaultSelected=!0);return}i!==null||n[h].disabled||(i=n[h])}i!==null&&(i.selected=!0)}}function ge(n,i){if(i.dangerouslySetInnerHTML!=null)throw Error(t(91));return V({},i,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function me(n,i){var a=i.value;if(a==null){if(a=i.children,i=i.defaultValue,a!=null){if(i!=null)throw Error(t(92));if(A(a)){if(1<a.length)throw Error(t(93));a=a[0]}i=a}i==null&&(i=""),a=i}n._wrapperState={initialValue:ue(a)}}function _e(n,i){var a=ue(i.value),c=ue(i.defaultValue);a!=null&&(a=""+a,a!==n.value&&(n.value=a),i.defaultValue==null&&n.defaultValue!==a&&(n.defaultValue=a)),c!=null&&(n.defaultValue=""+c)}function Le(n){var i=n.textContent;i===n._wrapperState.initialValue&&i!==""&&i!==null&&(n.value=i)}function Ie(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Be(n,i){return n==null||n==="http://www.w3.org/1999/xhtml"?Ie(i):n==="http://www.w3.org/2000/svg"&&i==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var Ke,ot=(function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(i,a,c,h){MSApp.execUnsafeLocalFunction(function(){return n(i,a,c,h)})}:n})(function(n,i){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=i;else{for(Ke=Ke||document.createElement("div"),Ke.innerHTML="<svg>"+i.valueOf().toString()+"</svg>",i=Ke.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;i.firstChild;)n.appendChild(i.firstChild)}});function Se(n,i){if(i){var a=n.firstChild;if(a&&a===n.lastChild&&a.nodeType===3){a.nodeValue=i;return}}n.textContent=i}var gt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},ct=["Webkit","ms","Moz","O"];Object.keys(gt).forEach(function(n){ct.forEach(function(i){i=i+n.charAt(0).toUpperCase()+n.substring(1),gt[i]=gt[n]})});function it(n,i,a){return i==null||typeof i=="boolean"||i===""?"":a||typeof i!="number"||i===0||gt.hasOwnProperty(n)&&gt[n]?(""+i).trim():i+"px"}function qe(n,i){n=n.style;for(var a in i)if(i.hasOwnProperty(a)){var c=a.indexOf("--")===0,h=it(a,i[a],c);a==="float"&&(a="cssFloat"),c?n.setProperty(a,h):n[a]=h}}var ke=V({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function tt(n,i){if(i){if(ke[n]&&(i.children!=null||i.dangerouslySetInnerHTML!=null))throw Error(t(137,n));if(i.dangerouslySetInnerHTML!=null){if(i.children!=null)throw Error(t(60));if(typeof i.dangerouslySetInnerHTML!="object"||!("__html"in i.dangerouslySetInnerHTML))throw Error(t(61))}if(i.style!=null&&typeof i.style!="object")throw Error(t(62))}}function _t(n,i){if(n.indexOf("-")===-1)return typeof i.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Rt=null;function lt(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var Ce=null,j=null,Re=null;function De(n){if(n=Co(n)){if(typeof Ce!="function")throw Error(t(280));var i=n.stateNode;i&&(i=La(i),Ce(n.stateNode,n.type,i))}}function nt(n){j?Re?Re.push(n):Re=[n]:j=n}function Ze(){if(j){var n=j,i=Re;if(Re=j=null,De(n),i)for(n=0;n<i.length;n++)De(i[n])}}function Tt(n,i){return n(i)}function wt(){}var Bt=!1;function Jt(n,i,a){if(Bt)return n(i,a);Bt=!0;try{return Tt(n,i,a)}finally{Bt=!1,(j!==null||Re!==null)&&(wt(),Ze())}}function yt(n,i){var a=n.stateNode;if(a===null)return null;var c=La(a);if(c===null)return null;a=c[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(c=!c.disabled)||(n=n.type,c=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!c;break e;default:n=!1}if(n)return null;if(a&&typeof a!="function")throw Error(t(231,i,typeof a));return a}var Yt=!1;if(d)try{var dn={};Object.defineProperty(dn,"passive",{get:function(){Yt=!0}}),window.addEventListener("test",dn,dn),window.removeEventListener("test",dn,dn)}catch{Yt=!1}function ca(n,i,a,c,h,v,T,F,W){var se=Array.prototype.slice.call(arguments,3);try{i.apply(a,se)}catch(Ee){this.onError(Ee)}}var Pr=!1,Ci=null,Dr=!1,$i=null,ua={onError:function(n){Pr=!0,Ci=n}};function da(n,i,a,c,h,v,T,F,W){Pr=!1,Ci=null,ca.apply(ua,arguments)}function tc(n,i,a,c,h,v,T,F,W){if(da.apply(this,arguments),Pr){if(Pr){var se=Ci;Pr=!1,Ci=null}else throw Error(t(198));Dr||(Dr=!0,$i=se)}}function Ri(n){var i=n,a=n;if(n.alternate)for(;i.return;)i=i.return;else{n=i;do i=n,(i.flags&4098)!==0&&(a=i.return),n=i.return;while(n)}return i.tag===3?a:null}function fa(n){if(n.tag===13){var i=n.memoizedState;if(i===null&&(n=n.alternate,n!==null&&(i=n.memoizedState)),i!==null)return i.dehydrated}return null}function P(n){if(Ri(n)!==n)throw Error(t(188))}function ee(n){var i=n.alternate;if(!i){if(i=Ri(n),i===null)throw Error(t(188));return i!==n?null:n}for(var a=n,c=i;;){var h=a.return;if(h===null)break;var v=h.alternate;if(v===null){if(c=h.return,c!==null){a=c;continue}break}if(h.child===v.child){for(v=h.child;v;){if(v===a)return P(h),n;if(v===c)return P(h),i;v=v.sibling}throw Error(t(188))}if(a.return!==c.return)a=h,c=v;else{for(var T=!1,F=h.child;F;){if(F===a){T=!0,a=h,c=v;break}if(F===c){T=!0,c=h,a=v;break}F=F.sibling}if(!T){for(F=v.child;F;){if(F===a){T=!0,a=v,c=h;break}if(F===c){T=!0,c=v,a=h;break}F=F.sibling}if(!T)throw Error(t(189))}}if(a.alternate!==c)throw Error(t(190))}if(a.tag!==3)throw Error(t(188));return a.stateNode.current===a?n:i}function le(n){return n=ee(n),n!==null?de(n):null}function de(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var i=de(n);if(i!==null)return i;n=n.sibling}return null}var oe=e.unstable_scheduleCallback,Ue=e.unstable_cancelCallback,Ye=e.unstable_shouldYield,et=e.unstable_requestPaint,ze=e.unstable_now,ut=e.unstable_getCurrentPriorityLevel,st=e.unstable_ImmediatePriority,at=e.unstable_UserBlockingPriority,bt=e.unstable_NormalPriority,xn=e.unstable_LowPriority,Gt=e.unstable_IdlePriority,An=null,vt=null;function dt(n){if(vt&&typeof vt.onCommitFiberRoot=="function")try{vt.onCommitFiberRoot(An,n,void 0,(n.current.flags&128)===128)}catch{}}var yn=Math.clz32?Math.clz32:ha,Nt=Math.log,bi=Math.LN2;function ha(n){return n>>>=0,n===0?32:31-(Nt(n)/bi|0)|0}var _i=64,Ki=4194304;function zt(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function qn(n,i){var a=n.pendingLanes;if(a===0)return 0;var c=0,h=n.suspendedLanes,v=n.pingedLanes,T=a&268435455;if(T!==0){var F=T&~h;F!==0?c=zt(F):(v&=T,v!==0&&(c=zt(v)))}else T=a&~h,T!==0?c=zt(T):v!==0&&(c=zt(v));if(c===0)return 0;if(i!==0&&i!==c&&(i&h)===0&&(h=c&-c,v=i&-i,h>=v||h===16&&(v&4194240)!==0))return i;if((c&4)!==0&&(c|=a&16),i=n.entangledLanes,i!==0)for(n=n.entanglements,i&=c;0<i;)a=31-yn(i),h=1<<a,c|=n[a],i&=~h;return c}function lo(n,i){switch(n){case 1:case 2:case 4:return i+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Cn(n,i){for(var a=n.suspendedLanes,c=n.pingedLanes,h=n.expirationTimes,v=n.pendingLanes;0<v;){var T=31-yn(v),F=1<<T,W=h[T];W===-1?((F&a)===0||(F&c)!==0)&&(h[T]=lo(F,i)):W<=i&&(n.expiredLanes|=F),v&=~F}}function Ir(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function pa(){var n=_i;return _i<<=1,(_i&4194240)===0&&(_i=64),n}function ls(n){for(var i=[],a=0;31>a;a++)i.push(n);return i}function co(n,i,a){n.pendingLanes|=i,i!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,i=31-yn(i),n[i]=a}function l0(n,i){var a=n.pendingLanes&~i;n.pendingLanes=i,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=i,n.mutableReadLanes&=i,n.entangledLanes&=i,i=n.entanglements;var c=n.eventTimes;for(n=n.expirationTimes;0<a;){var h=31-yn(a),v=1<<h;i[h]=0,c[h]=-1,n[h]=-1,a&=~v}}function nc(n,i){var a=n.entangledLanes|=i;for(n=n.entanglements;a;){var c=31-yn(a),h=1<<c;h&i|n[c]&i&&(n[c]|=i),a&=~h}}var At=0;function Yd(n){return n&=-n,1<n?4<n?(n&268435455)!==0?16:536870912:4:1}var qd,ic,$d,Kd,Zd,rc=!1,ma=[],Zi=null,Qi=null,Ji=null,uo=new Map,fo=new Map,er=[],c0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Qd(n,i){switch(n){case"focusin":case"focusout":Zi=null;break;case"dragenter":case"dragleave":Qi=null;break;case"mouseover":case"mouseout":Ji=null;break;case"pointerover":case"pointerout":uo.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":fo.delete(i.pointerId)}}function ho(n,i,a,c,h,v){return n===null||n.nativeEvent!==v?(n={blockedOn:i,domEventName:a,eventSystemFlags:c,nativeEvent:v,targetContainers:[h]},i!==null&&(i=Co(i),i!==null&&ic(i)),n):(n.eventSystemFlags|=c,i=n.targetContainers,h!==null&&i.indexOf(h)===-1&&i.push(h),n)}function u0(n,i,a,c,h){switch(i){case"focusin":return Zi=ho(Zi,n,i,a,c,h),!0;case"dragenter":return Qi=ho(Qi,n,i,a,c,h),!0;case"mouseover":return Ji=ho(Ji,n,i,a,c,h),!0;case"pointerover":var v=h.pointerId;return uo.set(v,ho(uo.get(v)||null,n,i,a,c,h)),!0;case"gotpointercapture":return v=h.pointerId,fo.set(v,ho(fo.get(v)||null,n,i,a,c,h)),!0}return!1}function Jd(n){var i=Nr(n.target);if(i!==null){var a=Ri(i);if(a!==null){if(i=a.tag,i===13){if(i=fa(a),i!==null){n.blockedOn=i,Zd(n.priority,function(){$d(a)});return}}else if(i===3&&a.stateNode.current.memoizedState.isDehydrated){n.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}n.blockedOn=null}function ga(n){if(n.blockedOn!==null)return!1;for(var i=n.targetContainers;0<i.length;){var a=oc(n.domEventName,n.eventSystemFlags,i[0],n.nativeEvent);if(a===null){a=n.nativeEvent;var c=new a.constructor(a.type,a);Rt=c,a.target.dispatchEvent(c),Rt=null}else return i=Co(a),i!==null&&ic(i),n.blockedOn=a,!1;i.shift()}return!0}function ef(n,i,a){ga(n)&&a.delete(i)}function d0(){rc=!1,Zi!==null&&ga(Zi)&&(Zi=null),Qi!==null&&ga(Qi)&&(Qi=null),Ji!==null&&ga(Ji)&&(Ji=null),uo.forEach(ef),fo.forEach(ef)}function po(n,i){n.blockedOn===i&&(n.blockedOn=null,rc||(rc=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,d0)))}function mo(n){function i(h){return po(h,n)}if(0<ma.length){po(ma[0],n);for(var a=1;a<ma.length;a++){var c=ma[a];c.blockedOn===n&&(c.blockedOn=null)}}for(Zi!==null&&po(Zi,n),Qi!==null&&po(Qi,n),Ji!==null&&po(Ji,n),uo.forEach(i),fo.forEach(i),a=0;a<er.length;a++)c=er[a],c.blockedOn===n&&(c.blockedOn=null);for(;0<er.length&&(a=er[0],a.blockedOn===null);)Jd(a),a.blockedOn===null&&er.shift()}var cs=b.ReactCurrentBatchConfig,va=!0;function f0(n,i,a,c){var h=At,v=cs.transition;cs.transition=null;try{At=1,sc(n,i,a,c)}finally{At=h,cs.transition=v}}function h0(n,i,a,c){var h=At,v=cs.transition;cs.transition=null;try{At=4,sc(n,i,a,c)}finally{At=h,cs.transition=v}}function sc(n,i,a,c){if(va){var h=oc(n,i,a,c);if(h===null)Ec(n,i,c,_a,a),Qd(n,c);else if(u0(h,n,i,a,c))c.stopPropagation();else if(Qd(n,c),i&4&&-1<c0.indexOf(n)){for(;h!==null;){var v=Co(h);if(v!==null&&qd(v),v=oc(n,i,a,c),v===null&&Ec(n,i,c,_a,a),v===h)break;h=v}h!==null&&c.stopPropagation()}else Ec(n,i,c,null,a)}}var _a=null;function oc(n,i,a,c){if(_a=null,n=lt(c),n=Nr(n),n!==null)if(i=Ri(n),i===null)n=null;else if(a=i.tag,a===13){if(n=fa(i),n!==null)return n;n=null}else if(a===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;n=null}else i!==n&&(n=null);return _a=n,null}function tf(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(ut()){case st:return 1;case at:return 4;case bt:case xn:return 16;case Gt:return 536870912;default:return 16}default:return 16}}var tr=null,ac=null,xa=null;function nf(){if(xa)return xa;var n,i=ac,a=i.length,c,h="value"in tr?tr.value:tr.textContent,v=h.length;for(n=0;n<a&&i[n]===h[n];n++);var T=a-n;for(c=1;c<=T&&i[a-c]===h[v-c];c++);return xa=h.slice(n,1<c?1-c:void 0)}function ya(n){var i=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&i===13&&(n=13)):n=i,n===10&&(n=13),32<=n||n===13?n:0}function Sa(){return!0}function rf(){return!1}function zn(n){function i(a,c,h,v,T){this._reactName=a,this._targetInst=h,this.type=c,this.nativeEvent=v,this.target=T,this.currentTarget=null;for(var F in n)n.hasOwnProperty(F)&&(a=n[F],this[F]=a?a(v):v[F]);return this.isDefaultPrevented=(v.defaultPrevented!=null?v.defaultPrevented:v.returnValue===!1)?Sa:rf,this.isPropagationStopped=rf,this}return V(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Sa)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Sa)},persist:function(){},isPersistent:Sa}),i}var us={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},lc=zn(us),go=V({},us,{view:0,detail:0}),p0=zn(go),cc,uc,vo,Ma=V({},go,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:fc,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==vo&&(vo&&n.type==="mousemove"?(cc=n.screenX-vo.screenX,uc=n.screenY-vo.screenY):uc=cc=0,vo=n),cc)},movementY:function(n){return"movementY"in n?n.movementY:uc}}),sf=zn(Ma),m0=V({},Ma,{dataTransfer:0}),g0=zn(m0),v0=V({},go,{relatedTarget:0}),dc=zn(v0),_0=V({},us,{animationName:0,elapsedTime:0,pseudoElement:0}),x0=zn(_0),y0=V({},us,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),S0=zn(y0),M0=V({},us,{data:0}),of=zn(M0),E0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},T0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},w0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function A0(n){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(n):(n=w0[n])?!!i[n]:!1}function fc(){return A0}var C0=V({},go,{key:function(n){if(n.key){var i=E0[n.key]||n.key;if(i!=="Unidentified")return i}return n.type==="keypress"?(n=ya(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?T0[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:fc,charCode:function(n){return n.type==="keypress"?ya(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?ya(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),R0=zn(C0),b0=V({},Ma,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),af=zn(b0),L0=V({},go,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:fc}),P0=zn(L0),D0=V({},us,{propertyName:0,elapsedTime:0,pseudoElement:0}),I0=zn(D0),N0=V({},Ma,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),U0=zn(N0),O0=[9,13,27,32],hc=d&&"CompositionEvent"in window,_o=null;d&&"documentMode"in document&&(_o=document.documentMode);var F0=d&&"TextEvent"in window&&!_o,lf=d&&(!hc||_o&&8<_o&&11>=_o),cf=" ",uf=!1;function df(n,i){switch(n){case"keyup":return O0.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ff(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var ds=!1;function k0(n,i){switch(n){case"compositionend":return ff(i);case"keypress":return i.which!==32?null:(uf=!0,cf);case"textInput":return n=i.data,n===cf&&uf?null:n;default:return null}}function B0(n,i){if(ds)return n==="compositionend"||!hc&&df(n,i)?(n=nf(),xa=ac=tr=null,ds=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return lf&&i.locale!=="ko"?null:i.data;default:return null}}var z0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function hf(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i==="input"?!!z0[n.type]:i==="textarea"}function pf(n,i,a,c){nt(c),i=Ca(i,"onChange"),0<i.length&&(a=new lc("onChange","change",null,a,c),n.push({event:a,listeners:i}))}var xo=null,yo=null;function H0(n){Df(n,0)}function Ea(n){var i=gs(n);if(Z(i))return n}function G0(n,i){if(n==="change")return i}var mf=!1;if(d){var pc;if(d){var mc="oninput"in document;if(!mc){var gf=document.createElement("div");gf.setAttribute("oninput","return;"),mc=typeof gf.oninput=="function"}pc=mc}else pc=!1;mf=pc&&(!document.documentMode||9<document.documentMode)}function vf(){xo&&(xo.detachEvent("onpropertychange",_f),yo=xo=null)}function _f(n){if(n.propertyName==="value"&&Ea(yo)){var i=[];pf(i,yo,n,lt(n)),Jt(H0,i)}}function V0(n,i,a){n==="focusin"?(vf(),xo=i,yo=a,xo.attachEvent("onpropertychange",_f)):n==="focusout"&&vf()}function W0(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return Ea(yo)}function j0(n,i){if(n==="click")return Ea(i)}function X0(n,i){if(n==="input"||n==="change")return Ea(i)}function Y0(n,i){return n===i&&(n!==0||1/n===1/i)||n!==n&&i!==i}var oi=typeof Object.is=="function"?Object.is:Y0;function So(n,i){if(oi(n,i))return!0;if(typeof n!="object"||n===null||typeof i!="object"||i===null)return!1;var a=Object.keys(n),c=Object.keys(i);if(a.length!==c.length)return!1;for(c=0;c<a.length;c++){var h=a[c];if(!f.call(i,h)||!oi(n[h],i[h]))return!1}return!0}function xf(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function yf(n,i){var a=xf(n);n=0;for(var c;a;){if(a.nodeType===3){if(c=n+a.textContent.length,n<=i&&c>=i)return{node:a,offset:i-n};n=c}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=xf(a)}}function Sf(n,i){return n&&i?n===i?!0:n&&n.nodeType===3?!1:i&&i.nodeType===3?Sf(n,i.parentNode):"contains"in n?n.contains(i):n.compareDocumentPosition?!!(n.compareDocumentPosition(i)&16):!1:!1}function Mf(){for(var n=window,i=ht();i instanceof n.HTMLIFrameElement;){try{var a=typeof i.contentWindow.location.href=="string"}catch{a=!1}if(a)n=i.contentWindow;else break;i=ht(n.document)}return i}function gc(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i&&(i==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||i==="textarea"||n.contentEditable==="true")}function q0(n){var i=Mf(),a=n.focusedElem,c=n.selectionRange;if(i!==a&&a&&a.ownerDocument&&Sf(a.ownerDocument.documentElement,a)){if(c!==null&&gc(a)){if(i=c.start,n=c.end,n===void 0&&(n=i),"selectionStart"in a)a.selectionStart=i,a.selectionEnd=Math.min(n,a.value.length);else if(n=(i=a.ownerDocument||document)&&i.defaultView||window,n.getSelection){n=n.getSelection();var h=a.textContent.length,v=Math.min(c.start,h);c=c.end===void 0?v:Math.min(c.end,h),!n.extend&&v>c&&(h=c,c=v,v=h),h=yf(a,v);var T=yf(a,c);h&&T&&(n.rangeCount!==1||n.anchorNode!==h.node||n.anchorOffset!==h.offset||n.focusNode!==T.node||n.focusOffset!==T.offset)&&(i=i.createRange(),i.setStart(h.node,h.offset),n.removeAllRanges(),v>c?(n.addRange(i),n.extend(T.node,T.offset)):(i.setEnd(T.node,T.offset),n.addRange(i)))}}for(i=[],n=a;n=n.parentNode;)n.nodeType===1&&i.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof a.focus=="function"&&a.focus(),a=0;a<i.length;a++)n=i[a],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var $0=d&&"documentMode"in document&&11>=document.documentMode,fs=null,vc=null,Mo=null,_c=!1;function Ef(n,i,a){var c=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;_c||fs==null||fs!==ht(c)||(c=fs,"selectionStart"in c&&gc(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}),Mo&&So(Mo,c)||(Mo=c,c=Ca(vc,"onSelect"),0<c.length&&(i=new lc("onSelect","select",null,i,a),n.push({event:i,listeners:c}),i.target=fs)))}function Ta(n,i){var a={};return a[n.toLowerCase()]=i.toLowerCase(),a["Webkit"+n]="webkit"+i,a["Moz"+n]="moz"+i,a}var hs={animationend:Ta("Animation","AnimationEnd"),animationiteration:Ta("Animation","AnimationIteration"),animationstart:Ta("Animation","AnimationStart"),transitionend:Ta("Transition","TransitionEnd")},xc={},Tf={};d&&(Tf=document.createElement("div").style,"AnimationEvent"in window||(delete hs.animationend.animation,delete hs.animationiteration.animation,delete hs.animationstart.animation),"TransitionEvent"in window||delete hs.transitionend.transition);function wa(n){if(xc[n])return xc[n];if(!hs[n])return n;var i=hs[n],a;for(a in i)if(i.hasOwnProperty(a)&&a in Tf)return xc[n]=i[a];return n}var wf=wa("animationend"),Af=wa("animationiteration"),Cf=wa("animationstart"),Rf=wa("transitionend"),bf=new Map,Lf="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function nr(n,i){bf.set(n,i),l(i,[n])}for(var yc=0;yc<Lf.length;yc++){var Sc=Lf[yc],K0=Sc.toLowerCase(),Z0=Sc[0].toUpperCase()+Sc.slice(1);nr(K0,"on"+Z0)}nr(wf,"onAnimationEnd"),nr(Af,"onAnimationIteration"),nr(Cf,"onAnimationStart"),nr("dblclick","onDoubleClick"),nr("focusin","onFocus"),nr("focusout","onBlur"),nr(Rf,"onTransitionEnd"),u("onMouseEnter",["mouseout","mouseover"]),u("onMouseLeave",["mouseout","mouseover"]),u("onPointerEnter",["pointerout","pointerover"]),u("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Eo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Q0=new Set("cancel close invalid load scroll toggle".split(" ").concat(Eo));function Pf(n,i,a){var c=n.type||"unknown-event";n.currentTarget=a,tc(c,i,void 0,n),n.currentTarget=null}function Df(n,i){i=(i&4)!==0;for(var a=0;a<n.length;a++){var c=n[a],h=c.event;c=c.listeners;e:{var v=void 0;if(i)for(var T=c.length-1;0<=T;T--){var F=c[T],W=F.instance,se=F.currentTarget;if(F=F.listener,W!==v&&h.isPropagationStopped())break e;Pf(h,F,se),v=W}else for(T=0;T<c.length;T++){if(F=c[T],W=F.instance,se=F.currentTarget,F=F.listener,W!==v&&h.isPropagationStopped())break e;Pf(h,F,se),v=W}}}if(Dr)throw n=$i,Dr=!1,$i=null,n}function Pt(n,i){var a=i[bc];a===void 0&&(a=i[bc]=new Set);var c=n+"__bubble";a.has(c)||(If(i,n,2,!1),a.add(c))}function Mc(n,i,a){var c=0;i&&(c|=4),If(a,n,c,i)}var Aa="_reactListening"+Math.random().toString(36).slice(2);function To(n){if(!n[Aa]){n[Aa]=!0,s.forEach(function(a){a!=="selectionchange"&&(Q0.has(a)||Mc(a,!1,n),Mc(a,!0,n))});var i=n.nodeType===9?n:n.ownerDocument;i===null||i[Aa]||(i[Aa]=!0,Mc("selectionchange",!1,i))}}function If(n,i,a,c){switch(tf(i)){case 1:var h=f0;break;case 4:h=h0;break;default:h=sc}a=h.bind(null,i,a,n),h=void 0,!Yt||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(h=!0),c?h!==void 0?n.addEventListener(i,a,{capture:!0,passive:h}):n.addEventListener(i,a,!0):h!==void 0?n.addEventListener(i,a,{passive:h}):n.addEventListener(i,a,!1)}function Ec(n,i,a,c,h){var v=c;if((i&1)===0&&(i&2)===0&&c!==null)e:for(;;){if(c===null)return;var T=c.tag;if(T===3||T===4){var F=c.stateNode.containerInfo;if(F===h||F.nodeType===8&&F.parentNode===h)break;if(T===4)for(T=c.return;T!==null;){var W=T.tag;if((W===3||W===4)&&(W=T.stateNode.containerInfo,W===h||W.nodeType===8&&W.parentNode===h))return;T=T.return}for(;F!==null;){if(T=Nr(F),T===null)return;if(W=T.tag,W===5||W===6){c=v=T;continue e}F=F.parentNode}}c=c.return}Jt(function(){var se=v,Ee=lt(a),we=[];e:{var Me=bf.get(n);if(Me!==void 0){var Oe=lc,Ve=n;switch(n){case"keypress":if(ya(a)===0)break e;case"keydown":case"keyup":Oe=R0;break;case"focusin":Ve="focus",Oe=dc;break;case"focusout":Ve="blur",Oe=dc;break;case"beforeblur":case"afterblur":Oe=dc;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":Oe=sf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":Oe=g0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":Oe=P0;break;case wf:case Af:case Cf:Oe=x0;break;case Rf:Oe=I0;break;case"scroll":Oe=p0;break;case"wheel":Oe=U0;break;case"copy":case"cut":case"paste":Oe=S0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":Oe=af}var We=(i&4)!==0,Vt=!We&&n==="scroll",J=We?Me!==null?Me+"Capture":null:Me;We=[];for(var $=se,re;$!==null;){re=$;var Ae=re.stateNode;if(re.tag===5&&Ae!==null&&(re=Ae,J!==null&&(Ae=yt($,J),Ae!=null&&We.push(wo($,Ae,re)))),Vt)break;$=$.return}0<We.length&&(Me=new Oe(Me,Ve,null,a,Ee),we.push({event:Me,listeners:We}))}}if((i&7)===0){e:{if(Me=n==="mouseover"||n==="pointerover",Oe=n==="mouseout"||n==="pointerout",Me&&a!==Rt&&(Ve=a.relatedTarget||a.fromElement)&&(Nr(Ve)||Ve[Li]))break e;if((Oe||Me)&&(Me=Ee.window===Ee?Ee:(Me=Ee.ownerDocument)?Me.defaultView||Me.parentWindow:window,Oe?(Ve=a.relatedTarget||a.toElement,Oe=se,Ve=Ve?Nr(Ve):null,Ve!==null&&(Vt=Ri(Ve),Ve!==Vt||Ve.tag!==5&&Ve.tag!==6)&&(Ve=null)):(Oe=null,Ve=se),Oe!==Ve)){if(We=sf,Ae="onMouseLeave",J="onMouseEnter",$="mouse",(n==="pointerout"||n==="pointerover")&&(We=af,Ae="onPointerLeave",J="onPointerEnter",$="pointer"),Vt=Oe==null?Me:gs(Oe),re=Ve==null?Me:gs(Ve),Me=new We(Ae,$+"leave",Oe,a,Ee),Me.target=Vt,Me.relatedTarget=re,Ae=null,Nr(Ee)===se&&(We=new We(J,$+"enter",Ve,a,Ee),We.target=re,We.relatedTarget=Vt,Ae=We),Vt=Ae,Oe&&Ve)t:{for(We=Oe,J=Ve,$=0,re=We;re;re=ps(re))$++;for(re=0,Ae=J;Ae;Ae=ps(Ae))re++;for(;0<$-re;)We=ps(We),$--;for(;0<re-$;)J=ps(J),re--;for(;$--;){if(We===J||J!==null&&We===J.alternate)break t;We=ps(We),J=ps(J)}We=null}else We=null;Oe!==null&&Nf(we,Me,Oe,We,!1),Ve!==null&&Vt!==null&&Nf(we,Vt,Ve,We,!0)}}e:{if(Me=se?gs(se):window,Oe=Me.nodeName&&Me.nodeName.toLowerCase(),Oe==="select"||Oe==="input"&&Me.type==="file")var je=G0;else if(hf(Me))if(mf)je=X0;else{je=W0;var Qe=V0}else(Oe=Me.nodeName)&&Oe.toLowerCase()==="input"&&(Me.type==="checkbox"||Me.type==="radio")&&(je=j0);if(je&&(je=je(n,se))){pf(we,je,a,Ee);break e}Qe&&Qe(n,Me,se),n==="focusout"&&(Qe=Me._wrapperState)&&Qe.controlled&&Me.type==="number"&&L(Me,"number",Me.value)}switch(Qe=se?gs(se):window,n){case"focusin":(hf(Qe)||Qe.contentEditable==="true")&&(fs=Qe,vc=se,Mo=null);break;case"focusout":Mo=vc=fs=null;break;case"mousedown":_c=!0;break;case"contextmenu":case"mouseup":case"dragend":_c=!1,Ef(we,a,Ee);break;case"selectionchange":if($0)break;case"keydown":case"keyup":Ef(we,a,Ee)}var Je;if(hc)e:{switch(n){case"compositionstart":var rt="onCompositionStart";break e;case"compositionend":rt="onCompositionEnd";break e;case"compositionupdate":rt="onCompositionUpdate";break e}rt=void 0}else ds?df(n,a)&&(rt="onCompositionEnd"):n==="keydown"&&a.keyCode===229&&(rt="onCompositionStart");rt&&(lf&&a.locale!=="ko"&&(ds||rt!=="onCompositionStart"?rt==="onCompositionEnd"&&ds&&(Je=nf()):(tr=Ee,ac="value"in tr?tr.value:tr.textContent,ds=!0)),Qe=Ca(se,rt),0<Qe.length&&(rt=new of(rt,n,null,a,Ee),we.push({event:rt,listeners:Qe}),Je?rt.data=Je:(Je=ff(a),Je!==null&&(rt.data=Je)))),(Je=F0?k0(n,a):B0(n,a))&&(se=Ca(se,"onBeforeInput"),0<se.length&&(Ee=new of("onBeforeInput","beforeinput",null,a,Ee),we.push({event:Ee,listeners:se}),Ee.data=Je))}Df(we,i)})}function wo(n,i,a){return{instance:n,listener:i,currentTarget:a}}function Ca(n,i){for(var a=i+"Capture",c=[];n!==null;){var h=n,v=h.stateNode;h.tag===5&&v!==null&&(h=v,v=yt(n,a),v!=null&&c.unshift(wo(n,v,h)),v=yt(n,i),v!=null&&c.push(wo(n,v,h))),n=n.return}return c}function ps(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function Nf(n,i,a,c,h){for(var v=i._reactName,T=[];a!==null&&a!==c;){var F=a,W=F.alternate,se=F.stateNode;if(W!==null&&W===c)break;F.tag===5&&se!==null&&(F=se,h?(W=yt(a,v),W!=null&&T.unshift(wo(a,W,F))):h||(W=yt(a,v),W!=null&&T.push(wo(a,W,F)))),a=a.return}T.length!==0&&n.push({event:i,listeners:T})}var J0=/\r\n?/g,ev=/\u0000|\uFFFD/g;function Uf(n){return(typeof n=="string"?n:""+n).replace(J0,`
`).replace(ev,"")}function Ra(n,i,a){if(i=Uf(i),Uf(n)!==i&&a)throw Error(t(425))}function ba(){}var Tc=null,wc=null;function Ac(n,i){return n==="textarea"||n==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var Cc=typeof setTimeout=="function"?setTimeout:void 0,tv=typeof clearTimeout=="function"?clearTimeout:void 0,Of=typeof Promise=="function"?Promise:void 0,nv=typeof queueMicrotask=="function"?queueMicrotask:typeof Of<"u"?function(n){return Of.resolve(null).then(n).catch(iv)}:Cc;function iv(n){setTimeout(function(){throw n})}function Rc(n,i){var a=i,c=0;do{var h=a.nextSibling;if(n.removeChild(a),h&&h.nodeType===8)if(a=h.data,a==="/$"){if(c===0){n.removeChild(h),mo(i);return}c--}else a!=="$"&&a!=="$?"&&a!=="$!"||c++;a=h}while(a);mo(i)}function ir(n){for(;n!=null;n=n.nextSibling){var i=n.nodeType;if(i===1||i===3)break;if(i===8){if(i=n.data,i==="$"||i==="$!"||i==="$?")break;if(i==="/$")return null}}return n}function Ff(n){n=n.previousSibling;for(var i=0;n;){if(n.nodeType===8){var a=n.data;if(a==="$"||a==="$!"||a==="$?"){if(i===0)return n;i--}else a==="/$"&&i++}n=n.previousSibling}return null}var ms=Math.random().toString(36).slice(2),xi="__reactFiber$"+ms,Ao="__reactProps$"+ms,Li="__reactContainer$"+ms,bc="__reactEvents$"+ms,rv="__reactListeners$"+ms,sv="__reactHandles$"+ms;function Nr(n){var i=n[xi];if(i)return i;for(var a=n.parentNode;a;){if(i=a[Li]||a[xi]){if(a=i.alternate,i.child!==null||a!==null&&a.child!==null)for(n=Ff(n);n!==null;){if(a=n[xi])return a;n=Ff(n)}return i}n=a,a=n.parentNode}return null}function Co(n){return n=n[xi]||n[Li],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function gs(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(t(33))}function La(n){return n[Ao]||null}var Lc=[],vs=-1;function rr(n){return{current:n}}function Dt(n){0>vs||(n.current=Lc[vs],Lc[vs]=null,vs--)}function Lt(n,i){vs++,Lc[vs]=n.current,n.current=i}var sr={},fn=rr(sr),Rn=rr(!1),Ur=sr;function _s(n,i){var a=n.type.contextTypes;if(!a)return sr;var c=n.stateNode;if(c&&c.__reactInternalMemoizedUnmaskedChildContext===i)return c.__reactInternalMemoizedMaskedChildContext;var h={},v;for(v in a)h[v]=i[v];return c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=i,n.__reactInternalMemoizedMaskedChildContext=h),h}function bn(n){return n=n.childContextTypes,n!=null}function Pa(){Dt(Rn),Dt(fn)}function kf(n,i,a){if(fn.current!==sr)throw Error(t(168));Lt(fn,i),Lt(Rn,a)}function Bf(n,i,a){var c=n.stateNode;if(i=i.childContextTypes,typeof c.getChildContext!="function")return a;c=c.getChildContext();for(var h in c)if(!(h in i))throw Error(t(108,ye(n)||"Unknown",h));return V({},a,c)}function Da(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||sr,Ur=fn.current,Lt(fn,n),Lt(Rn,Rn.current),!0}function zf(n,i,a){var c=n.stateNode;if(!c)throw Error(t(169));a?(n=Bf(n,i,Ur),c.__reactInternalMemoizedMergedChildContext=n,Dt(Rn),Dt(fn),Lt(fn,n)):Dt(Rn),Lt(Rn,a)}var Pi=null,Ia=!1,Pc=!1;function Hf(n){Pi===null?Pi=[n]:Pi.push(n)}function ov(n){Ia=!0,Hf(n)}function or(){if(!Pc&&Pi!==null){Pc=!0;var n=0,i=At;try{var a=Pi;for(At=1;n<a.length;n++){var c=a[n];do c=c(!0);while(c!==null)}Pi=null,Ia=!1}catch(h){throw Pi!==null&&(Pi=Pi.slice(n+1)),oe(st,or),h}finally{At=i,Pc=!1}}return null}var xs=[],ys=0,Na=null,Ua=0,$n=[],Kn=0,Or=null,Di=1,Ii="";function Fr(n,i){xs[ys++]=Ua,xs[ys++]=Na,Na=n,Ua=i}function Gf(n,i,a){$n[Kn++]=Di,$n[Kn++]=Ii,$n[Kn++]=Or,Or=n;var c=Di;n=Ii;var h=32-yn(c)-1;c&=~(1<<h),a+=1;var v=32-yn(i)+h;if(30<v){var T=h-h%5;v=(c&(1<<T)-1).toString(32),c>>=T,h-=T,Di=1<<32-yn(i)+h|a<<h|c,Ii=v+n}else Di=1<<v|a<<h|c,Ii=n}function Dc(n){n.return!==null&&(Fr(n,1),Gf(n,1,0))}function Ic(n){for(;n===Na;)Na=xs[--ys],xs[ys]=null,Ua=xs[--ys],xs[ys]=null;for(;n===Or;)Or=$n[--Kn],$n[Kn]=null,Ii=$n[--Kn],$n[Kn]=null,Di=$n[--Kn],$n[Kn]=null}var Hn=null,Gn=null,Ut=!1,ai=null;function Vf(n,i){var a=ei(5,null,null,0);a.elementType="DELETED",a.stateNode=i,a.return=n,i=n.deletions,i===null?(n.deletions=[a],n.flags|=16):i.push(a)}function Wf(n,i){switch(n.tag){case 5:var a=n.type;return i=i.nodeType!==1||a.toLowerCase()!==i.nodeName.toLowerCase()?null:i,i!==null?(n.stateNode=i,Hn=n,Gn=ir(i.firstChild),!0):!1;case 6:return i=n.pendingProps===""||i.nodeType!==3?null:i,i!==null?(n.stateNode=i,Hn=n,Gn=null,!0):!1;case 13:return i=i.nodeType!==8?null:i,i!==null?(a=Or!==null?{id:Di,overflow:Ii}:null,n.memoizedState={dehydrated:i,treeContext:a,retryLane:1073741824},a=ei(18,null,null,0),a.stateNode=i,a.return=n,n.child=a,Hn=n,Gn=null,!0):!1;default:return!1}}function Nc(n){return(n.mode&1)!==0&&(n.flags&128)===0}function Uc(n){if(Ut){var i=Gn;if(i){var a=i;if(!Wf(n,i)){if(Nc(n))throw Error(t(418));i=ir(a.nextSibling);var c=Hn;i&&Wf(n,i)?Vf(c,a):(n.flags=n.flags&-4097|2,Ut=!1,Hn=n)}}else{if(Nc(n))throw Error(t(418));n.flags=n.flags&-4097|2,Ut=!1,Hn=n}}}function jf(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;Hn=n}function Oa(n){if(n!==Hn)return!1;if(!Ut)return jf(n),Ut=!0,!1;var i;if((i=n.tag!==3)&&!(i=n.tag!==5)&&(i=n.type,i=i!=="head"&&i!=="body"&&!Ac(n.type,n.memoizedProps)),i&&(i=Gn)){if(Nc(n))throw Xf(),Error(t(418));for(;i;)Vf(n,i),i=ir(i.nextSibling)}if(jf(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(t(317));e:{for(n=n.nextSibling,i=0;n;){if(n.nodeType===8){var a=n.data;if(a==="/$"){if(i===0){Gn=ir(n.nextSibling);break e}i--}else a!=="$"&&a!=="$!"&&a!=="$?"||i++}n=n.nextSibling}Gn=null}}else Gn=Hn?ir(n.stateNode.nextSibling):null;return!0}function Xf(){for(var n=Gn;n;)n=ir(n.nextSibling)}function Ss(){Gn=Hn=null,Ut=!1}function Oc(n){ai===null?ai=[n]:ai.push(n)}var av=b.ReactCurrentBatchConfig;function Ro(n,i,a){if(n=a.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(a._owner){if(a=a._owner,a){if(a.tag!==1)throw Error(t(309));var c=a.stateNode}if(!c)throw Error(t(147,n));var h=c,v=""+n;return i!==null&&i.ref!==null&&typeof i.ref=="function"&&i.ref._stringRef===v?i.ref:(i=function(T){var F=h.refs;T===null?delete F[v]:F[v]=T},i._stringRef=v,i)}if(typeof n!="string")throw Error(t(284));if(!a._owner)throw Error(t(290,n))}return n}function Fa(n,i){throw n=Object.prototype.toString.call(i),Error(t(31,n==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":n))}function Yf(n){var i=n._init;return i(n._payload)}function qf(n){function i(J,$){if(n){var re=J.deletions;re===null?(J.deletions=[$],J.flags|=16):re.push($)}}function a(J,$){if(!n)return null;for(;$!==null;)i(J,$),$=$.sibling;return null}function c(J,$){for(J=new Map;$!==null;)$.key!==null?J.set($.key,$):J.set($.index,$),$=$.sibling;return J}function h(J,$){return J=pr(J,$),J.index=0,J.sibling=null,J}function v(J,$,re){return J.index=re,n?(re=J.alternate,re!==null?(re=re.index,re<$?(J.flags|=2,$):re):(J.flags|=2,$)):(J.flags|=1048576,$)}function T(J){return n&&J.alternate===null&&(J.flags|=2),J}function F(J,$,re,Ae){return $===null||$.tag!==6?($=Cu(re,J.mode,Ae),$.return=J,$):($=h($,re),$.return=J,$)}function W(J,$,re,Ae){var je=re.type;return je===U?Ee(J,$,re.props.children,Ae,re.key):$!==null&&($.elementType===je||typeof je=="object"&&je!==null&&je.$$typeof===q&&Yf(je)===$.type)?(Ae=h($,re.props),Ae.ref=Ro(J,$,re),Ae.return=J,Ae):(Ae=al(re.type,re.key,re.props,null,J.mode,Ae),Ae.ref=Ro(J,$,re),Ae.return=J,Ae)}function se(J,$,re,Ae){return $===null||$.tag!==4||$.stateNode.containerInfo!==re.containerInfo||$.stateNode.implementation!==re.implementation?($=Ru(re,J.mode,Ae),$.return=J,$):($=h($,re.children||[]),$.return=J,$)}function Ee(J,$,re,Ae,je){return $===null||$.tag!==7?($=jr(re,J.mode,Ae,je),$.return=J,$):($=h($,re),$.return=J,$)}function we(J,$,re){if(typeof $=="string"&&$!==""||typeof $=="number")return $=Cu(""+$,J.mode,re),$.return=J,$;if(typeof $=="object"&&$!==null){switch($.$$typeof){case G:return re=al($.type,$.key,$.props,null,J.mode,re),re.ref=Ro(J,null,$),re.return=J,re;case B:return $=Ru($,J.mode,re),$.return=J,$;case q:var Ae=$._init;return we(J,Ae($._payload),re)}if(A($)||X($))return $=jr($,J.mode,re,null),$.return=J,$;Fa(J,$)}return null}function Me(J,$,re,Ae){var je=$!==null?$.key:null;if(typeof re=="string"&&re!==""||typeof re=="number")return je!==null?null:F(J,$,""+re,Ae);if(typeof re=="object"&&re!==null){switch(re.$$typeof){case G:return re.key===je?W(J,$,re,Ae):null;case B:return re.key===je?se(J,$,re,Ae):null;case q:return je=re._init,Me(J,$,je(re._payload),Ae)}if(A(re)||X(re))return je!==null?null:Ee(J,$,re,Ae,null);Fa(J,re)}return null}function Oe(J,$,re,Ae,je){if(typeof Ae=="string"&&Ae!==""||typeof Ae=="number")return J=J.get(re)||null,F($,J,""+Ae,je);if(typeof Ae=="object"&&Ae!==null){switch(Ae.$$typeof){case G:return J=J.get(Ae.key===null?re:Ae.key)||null,W($,J,Ae,je);case B:return J=J.get(Ae.key===null?re:Ae.key)||null,se($,J,Ae,je);case q:var Qe=Ae._init;return Oe(J,$,re,Qe(Ae._payload),je)}if(A(Ae)||X(Ae))return J=J.get(re)||null,Ee($,J,Ae,je,null);Fa($,Ae)}return null}function Ve(J,$,re,Ae){for(var je=null,Qe=null,Je=$,rt=$=0,nn=null;Je!==null&&rt<re.length;rt++){Je.index>rt?(nn=Je,Je=null):nn=Je.sibling;var St=Me(J,Je,re[rt],Ae);if(St===null){Je===null&&(Je=nn);break}n&&Je&&St.alternate===null&&i(J,Je),$=v(St,$,rt),Qe===null?je=St:Qe.sibling=St,Qe=St,Je=nn}if(rt===re.length)return a(J,Je),Ut&&Fr(J,rt),je;if(Je===null){for(;rt<re.length;rt++)Je=we(J,re[rt],Ae),Je!==null&&($=v(Je,$,rt),Qe===null?je=Je:Qe.sibling=Je,Qe=Je);return Ut&&Fr(J,rt),je}for(Je=c(J,Je);rt<re.length;rt++)nn=Oe(Je,J,rt,re[rt],Ae),nn!==null&&(n&&nn.alternate!==null&&Je.delete(nn.key===null?rt:nn.key),$=v(nn,$,rt),Qe===null?je=nn:Qe.sibling=nn,Qe=nn);return n&&Je.forEach(function(mr){return i(J,mr)}),Ut&&Fr(J,rt),je}function We(J,$,re,Ae){var je=X(re);if(typeof je!="function")throw Error(t(150));if(re=je.call(re),re==null)throw Error(t(151));for(var Qe=je=null,Je=$,rt=$=0,nn=null,St=re.next();Je!==null&&!St.done;rt++,St=re.next()){Je.index>rt?(nn=Je,Je=null):nn=Je.sibling;var mr=Me(J,Je,St.value,Ae);if(mr===null){Je===null&&(Je=nn);break}n&&Je&&mr.alternate===null&&i(J,Je),$=v(mr,$,rt),Qe===null?je=mr:Qe.sibling=mr,Qe=mr,Je=nn}if(St.done)return a(J,Je),Ut&&Fr(J,rt),je;if(Je===null){for(;!St.done;rt++,St=re.next())St=we(J,St.value,Ae),St!==null&&($=v(St,$,rt),Qe===null?je=St:Qe.sibling=St,Qe=St);return Ut&&Fr(J,rt),je}for(Je=c(J,Je);!St.done;rt++,St=re.next())St=Oe(Je,J,rt,St.value,Ae),St!==null&&(n&&St.alternate!==null&&Je.delete(St.key===null?rt:St.key),$=v(St,$,rt),Qe===null?je=St:Qe.sibling=St,Qe=St);return n&&Je.forEach(function(zv){return i(J,zv)}),Ut&&Fr(J,rt),je}function Vt(J,$,re,Ae){if(typeof re=="object"&&re!==null&&re.type===U&&re.key===null&&(re=re.props.children),typeof re=="object"&&re!==null){switch(re.$$typeof){case G:e:{for(var je=re.key,Qe=$;Qe!==null;){if(Qe.key===je){if(je=re.type,je===U){if(Qe.tag===7){a(J,Qe.sibling),$=h(Qe,re.props.children),$.return=J,J=$;break e}}else if(Qe.elementType===je||typeof je=="object"&&je!==null&&je.$$typeof===q&&Yf(je)===Qe.type){a(J,Qe.sibling),$=h(Qe,re.props),$.ref=Ro(J,Qe,re),$.return=J,J=$;break e}a(J,Qe);break}else i(J,Qe);Qe=Qe.sibling}re.type===U?($=jr(re.props.children,J.mode,Ae,re.key),$.return=J,J=$):(Ae=al(re.type,re.key,re.props,null,J.mode,Ae),Ae.ref=Ro(J,$,re),Ae.return=J,J=Ae)}return T(J);case B:e:{for(Qe=re.key;$!==null;){if($.key===Qe)if($.tag===4&&$.stateNode.containerInfo===re.containerInfo&&$.stateNode.implementation===re.implementation){a(J,$.sibling),$=h($,re.children||[]),$.return=J,J=$;break e}else{a(J,$);break}else i(J,$);$=$.sibling}$=Ru(re,J.mode,Ae),$.return=J,J=$}return T(J);case q:return Qe=re._init,Vt(J,$,Qe(re._payload),Ae)}if(A(re))return Ve(J,$,re,Ae);if(X(re))return We(J,$,re,Ae);Fa(J,re)}return typeof re=="string"&&re!==""||typeof re=="number"?(re=""+re,$!==null&&$.tag===6?(a(J,$.sibling),$=h($,re),$.return=J,J=$):(a(J,$),$=Cu(re,J.mode,Ae),$.return=J,J=$),T(J)):a(J,$)}return Vt}var Ms=qf(!0),$f=qf(!1),ka=rr(null),Ba=null,Es=null,Fc=null;function kc(){Fc=Es=Ba=null}function Bc(n){var i=ka.current;Dt(ka),n._currentValue=i}function zc(n,i,a){for(;n!==null;){var c=n.alternate;if((n.childLanes&i)!==i?(n.childLanes|=i,c!==null&&(c.childLanes|=i)):c!==null&&(c.childLanes&i)!==i&&(c.childLanes|=i),n===a)break;n=n.return}}function Ts(n,i){Ba=n,Fc=Es=null,n=n.dependencies,n!==null&&n.firstContext!==null&&((n.lanes&i)!==0&&(Ln=!0),n.firstContext=null)}function Zn(n){var i=n._currentValue;if(Fc!==n)if(n={context:n,memoizedValue:i,next:null},Es===null){if(Ba===null)throw Error(t(308));Es=n,Ba.dependencies={lanes:0,firstContext:n}}else Es=Es.next=n;return i}var kr=null;function Hc(n){kr===null?kr=[n]:kr.push(n)}function Kf(n,i,a,c){var h=i.interleaved;return h===null?(a.next=a,Hc(i)):(a.next=h.next,h.next=a),i.interleaved=a,Ni(n,c)}function Ni(n,i){n.lanes|=i;var a=n.alternate;for(a!==null&&(a.lanes|=i),a=n,n=n.return;n!==null;)n.childLanes|=i,a=n.alternate,a!==null&&(a.childLanes|=i),a=n,n=n.return;return a.tag===3?a.stateNode:null}var ar=!1;function Gc(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Zf(n,i){n=n.updateQueue,i.updateQueue===n&&(i.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function Ui(n,i){return{eventTime:n,lane:i,tag:0,payload:null,callback:null,next:null}}function lr(n,i,a){var c=n.updateQueue;if(c===null)return null;if(c=c.shared,(xt&2)!==0){var h=c.pending;return h===null?i.next=i:(i.next=h.next,h.next=i),c.pending=i,Ni(n,a)}return h=c.interleaved,h===null?(i.next=i,Hc(c)):(i.next=h.next,h.next=i),c.interleaved=i,Ni(n,a)}function za(n,i,a){if(i=i.updateQueue,i!==null&&(i=i.shared,(a&4194240)!==0)){var c=i.lanes;c&=n.pendingLanes,a|=c,i.lanes=a,nc(n,a)}}function Qf(n,i){var a=n.updateQueue,c=n.alternate;if(c!==null&&(c=c.updateQueue,a===c)){var h=null,v=null;if(a=a.firstBaseUpdate,a!==null){do{var T={eventTime:a.eventTime,lane:a.lane,tag:a.tag,payload:a.payload,callback:a.callback,next:null};v===null?h=v=T:v=v.next=T,a=a.next}while(a!==null);v===null?h=v=i:v=v.next=i}else h=v=i;a={baseState:c.baseState,firstBaseUpdate:h,lastBaseUpdate:v,shared:c.shared,effects:c.effects},n.updateQueue=a;return}n=a.lastBaseUpdate,n===null?a.firstBaseUpdate=i:n.next=i,a.lastBaseUpdate=i}function Ha(n,i,a,c){var h=n.updateQueue;ar=!1;var v=h.firstBaseUpdate,T=h.lastBaseUpdate,F=h.shared.pending;if(F!==null){h.shared.pending=null;var W=F,se=W.next;W.next=null,T===null?v=se:T.next=se,T=W;var Ee=n.alternate;Ee!==null&&(Ee=Ee.updateQueue,F=Ee.lastBaseUpdate,F!==T&&(F===null?Ee.firstBaseUpdate=se:F.next=se,Ee.lastBaseUpdate=W))}if(v!==null){var we=h.baseState;T=0,Ee=se=W=null,F=v;do{var Me=F.lane,Oe=F.eventTime;if((c&Me)===Me){Ee!==null&&(Ee=Ee.next={eventTime:Oe,lane:0,tag:F.tag,payload:F.payload,callback:F.callback,next:null});e:{var Ve=n,We=F;switch(Me=i,Oe=a,We.tag){case 1:if(Ve=We.payload,typeof Ve=="function"){we=Ve.call(Oe,we,Me);break e}we=Ve;break e;case 3:Ve.flags=Ve.flags&-65537|128;case 0:if(Ve=We.payload,Me=typeof Ve=="function"?Ve.call(Oe,we,Me):Ve,Me==null)break e;we=V({},we,Me);break e;case 2:ar=!0}}F.callback!==null&&F.lane!==0&&(n.flags|=64,Me=h.effects,Me===null?h.effects=[F]:Me.push(F))}else Oe={eventTime:Oe,lane:Me,tag:F.tag,payload:F.payload,callback:F.callback,next:null},Ee===null?(se=Ee=Oe,W=we):Ee=Ee.next=Oe,T|=Me;if(F=F.next,F===null){if(F=h.shared.pending,F===null)break;Me=F,F=Me.next,Me.next=null,h.lastBaseUpdate=Me,h.shared.pending=null}}while(!0);if(Ee===null&&(W=we),h.baseState=W,h.firstBaseUpdate=se,h.lastBaseUpdate=Ee,i=h.shared.interleaved,i!==null){h=i;do T|=h.lane,h=h.next;while(h!==i)}else v===null&&(h.shared.lanes=0);Hr|=T,n.lanes=T,n.memoizedState=we}}function Jf(n,i,a){if(n=i.effects,i.effects=null,n!==null)for(i=0;i<n.length;i++){var c=n[i],h=c.callback;if(h!==null){if(c.callback=null,c=a,typeof h!="function")throw Error(t(191,h));h.call(c)}}}var bo={},yi=rr(bo),Lo=rr(bo),Po=rr(bo);function Br(n){if(n===bo)throw Error(t(174));return n}function Vc(n,i){switch(Lt(Po,i),Lt(Lo,n),Lt(yi,bo),n=i.nodeType,n){case 9:case 11:i=(i=i.documentElement)?i.namespaceURI:Be(null,"");break;default:n=n===8?i.parentNode:i,i=n.namespaceURI||null,n=n.tagName,i=Be(i,n)}Dt(yi),Lt(yi,i)}function ws(){Dt(yi),Dt(Lo),Dt(Po)}function eh(n){Br(Po.current);var i=Br(yi.current),a=Be(i,n.type);i!==a&&(Lt(Lo,n),Lt(yi,a))}function Wc(n){Lo.current===n&&(Dt(yi),Dt(Lo))}var Ft=rr(0);function Ga(n){for(var i=n;i!==null;){if(i.tag===13){var a=i.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||a.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var jc=[];function Xc(){for(var n=0;n<jc.length;n++)jc[n]._workInProgressVersionPrimary=null;jc.length=0}var Va=b.ReactCurrentDispatcher,Yc=b.ReactCurrentBatchConfig,zr=0,kt=null,qt=null,en=null,Wa=!1,Do=!1,Io=0,lv=0;function hn(){throw Error(t(321))}function qc(n,i){if(i===null)return!1;for(var a=0;a<i.length&&a<n.length;a++)if(!oi(n[a],i[a]))return!1;return!0}function $c(n,i,a,c,h,v){if(zr=v,kt=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,Va.current=n===null||n.memoizedState===null?fv:hv,n=a(c,h),Do){v=0;do{if(Do=!1,Io=0,25<=v)throw Error(t(301));v+=1,en=qt=null,i.updateQueue=null,Va.current=pv,n=a(c,h)}while(Do)}if(Va.current=Ya,i=qt!==null&&qt.next!==null,zr=0,en=qt=kt=null,Wa=!1,i)throw Error(t(300));return n}function Kc(){var n=Io!==0;return Io=0,n}function Si(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return en===null?kt.memoizedState=en=n:en=en.next=n,en}function Qn(){if(qt===null){var n=kt.alternate;n=n!==null?n.memoizedState:null}else n=qt.next;var i=en===null?kt.memoizedState:en.next;if(i!==null)en=i,qt=n;else{if(n===null)throw Error(t(310));qt=n,n={memoizedState:qt.memoizedState,baseState:qt.baseState,baseQueue:qt.baseQueue,queue:qt.queue,next:null},en===null?kt.memoizedState=en=n:en=en.next=n}return en}function No(n,i){return typeof i=="function"?i(n):i}function Zc(n){var i=Qn(),a=i.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var c=qt,h=c.baseQueue,v=a.pending;if(v!==null){if(h!==null){var T=h.next;h.next=v.next,v.next=T}c.baseQueue=h=v,a.pending=null}if(h!==null){v=h.next,c=c.baseState;var F=T=null,W=null,se=v;do{var Ee=se.lane;if((zr&Ee)===Ee)W!==null&&(W=W.next={lane:0,action:se.action,hasEagerState:se.hasEagerState,eagerState:se.eagerState,next:null}),c=se.hasEagerState?se.eagerState:n(c,se.action);else{var we={lane:Ee,action:se.action,hasEagerState:se.hasEagerState,eagerState:se.eagerState,next:null};W===null?(F=W=we,T=c):W=W.next=we,kt.lanes|=Ee,Hr|=Ee}se=se.next}while(se!==null&&se!==v);W===null?T=c:W.next=F,oi(c,i.memoizedState)||(Ln=!0),i.memoizedState=c,i.baseState=T,i.baseQueue=W,a.lastRenderedState=c}if(n=a.interleaved,n!==null){h=n;do v=h.lane,kt.lanes|=v,Hr|=v,h=h.next;while(h!==n)}else h===null&&(a.lanes=0);return[i.memoizedState,a.dispatch]}function Qc(n){var i=Qn(),a=i.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var c=a.dispatch,h=a.pending,v=i.memoizedState;if(h!==null){a.pending=null;var T=h=h.next;do v=n(v,T.action),T=T.next;while(T!==h);oi(v,i.memoizedState)||(Ln=!0),i.memoizedState=v,i.baseQueue===null&&(i.baseState=v),a.lastRenderedState=v}return[v,c]}function th(){}function nh(n,i){var a=kt,c=Qn(),h=i(),v=!oi(c.memoizedState,h);if(v&&(c.memoizedState=h,Ln=!0),c=c.queue,Jc(sh.bind(null,a,c,n),[n]),c.getSnapshot!==i||v||en!==null&&en.memoizedState.tag&1){if(a.flags|=2048,Uo(9,rh.bind(null,a,c,h,i),void 0,null),tn===null)throw Error(t(349));(zr&30)!==0||ih(a,i,h)}return h}function ih(n,i,a){n.flags|=16384,n={getSnapshot:i,value:a},i=kt.updateQueue,i===null?(i={lastEffect:null,stores:null},kt.updateQueue=i,i.stores=[n]):(a=i.stores,a===null?i.stores=[n]:a.push(n))}function rh(n,i,a,c){i.value=a,i.getSnapshot=c,oh(i)&&ah(n)}function sh(n,i,a){return a(function(){oh(i)&&ah(n)})}function oh(n){var i=n.getSnapshot;n=n.value;try{var a=i();return!oi(n,a)}catch{return!0}}function ah(n){var i=Ni(n,1);i!==null&&di(i,n,1,-1)}function lh(n){var i=Si();return typeof n=="function"&&(n=n()),i.memoizedState=i.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:No,lastRenderedState:n},i.queue=n,n=n.dispatch=dv.bind(null,kt,n),[i.memoizedState,n]}function Uo(n,i,a,c){return n={tag:n,create:i,destroy:a,deps:c,next:null},i=kt.updateQueue,i===null?(i={lastEffect:null,stores:null},kt.updateQueue=i,i.lastEffect=n.next=n):(a=i.lastEffect,a===null?i.lastEffect=n.next=n:(c=a.next,a.next=n,n.next=c,i.lastEffect=n)),n}function ch(){return Qn().memoizedState}function ja(n,i,a,c){var h=Si();kt.flags|=n,h.memoizedState=Uo(1|i,a,void 0,c===void 0?null:c)}function Xa(n,i,a,c){var h=Qn();c=c===void 0?null:c;var v=void 0;if(qt!==null){var T=qt.memoizedState;if(v=T.destroy,c!==null&&qc(c,T.deps)){h.memoizedState=Uo(i,a,v,c);return}}kt.flags|=n,h.memoizedState=Uo(1|i,a,v,c)}function uh(n,i){return ja(8390656,8,n,i)}function Jc(n,i){return Xa(2048,8,n,i)}function dh(n,i){return Xa(4,2,n,i)}function fh(n,i){return Xa(4,4,n,i)}function hh(n,i){if(typeof i=="function")return n=n(),i(n),function(){i(null)};if(i!=null)return n=n(),i.current=n,function(){i.current=null}}function ph(n,i,a){return a=a!=null?a.concat([n]):null,Xa(4,4,hh.bind(null,i,n),a)}function eu(){}function mh(n,i){var a=Qn();i=i===void 0?null:i;var c=a.memoizedState;return c!==null&&i!==null&&qc(i,c[1])?c[0]:(a.memoizedState=[n,i],n)}function gh(n,i){var a=Qn();i=i===void 0?null:i;var c=a.memoizedState;return c!==null&&i!==null&&qc(i,c[1])?c[0]:(n=n(),a.memoizedState=[n,i],n)}function vh(n,i,a){return(zr&21)===0?(n.baseState&&(n.baseState=!1,Ln=!0),n.memoizedState=a):(oi(a,i)||(a=pa(),kt.lanes|=a,Hr|=a,n.baseState=!0),i)}function cv(n,i){var a=At;At=a!==0&&4>a?a:4,n(!0);var c=Yc.transition;Yc.transition={};try{n(!1),i()}finally{At=a,Yc.transition=c}}function _h(){return Qn().memoizedState}function uv(n,i,a){var c=fr(n);if(a={lane:c,action:a,hasEagerState:!1,eagerState:null,next:null},xh(n))yh(i,a);else if(a=Kf(n,i,a,c),a!==null){var h=Mn();di(a,n,c,h),Sh(a,i,c)}}function dv(n,i,a){var c=fr(n),h={lane:c,action:a,hasEagerState:!1,eagerState:null,next:null};if(xh(n))yh(i,h);else{var v=n.alternate;if(n.lanes===0&&(v===null||v.lanes===0)&&(v=i.lastRenderedReducer,v!==null))try{var T=i.lastRenderedState,F=v(T,a);if(h.hasEagerState=!0,h.eagerState=F,oi(F,T)){var W=i.interleaved;W===null?(h.next=h,Hc(i)):(h.next=W.next,W.next=h),i.interleaved=h;return}}catch{}a=Kf(n,i,h,c),a!==null&&(h=Mn(),di(a,n,c,h),Sh(a,i,c))}}function xh(n){var i=n.alternate;return n===kt||i!==null&&i===kt}function yh(n,i){Do=Wa=!0;var a=n.pending;a===null?i.next=i:(i.next=a.next,a.next=i),n.pending=i}function Sh(n,i,a){if((a&4194240)!==0){var c=i.lanes;c&=n.pendingLanes,a|=c,i.lanes=a,nc(n,a)}}var Ya={readContext:Zn,useCallback:hn,useContext:hn,useEffect:hn,useImperativeHandle:hn,useInsertionEffect:hn,useLayoutEffect:hn,useMemo:hn,useReducer:hn,useRef:hn,useState:hn,useDebugValue:hn,useDeferredValue:hn,useTransition:hn,useMutableSource:hn,useSyncExternalStore:hn,useId:hn,unstable_isNewReconciler:!1},fv={readContext:Zn,useCallback:function(n,i){return Si().memoizedState=[n,i===void 0?null:i],n},useContext:Zn,useEffect:uh,useImperativeHandle:function(n,i,a){return a=a!=null?a.concat([n]):null,ja(4194308,4,hh.bind(null,i,n),a)},useLayoutEffect:function(n,i){return ja(4194308,4,n,i)},useInsertionEffect:function(n,i){return ja(4,2,n,i)},useMemo:function(n,i){var a=Si();return i=i===void 0?null:i,n=n(),a.memoizedState=[n,i],n},useReducer:function(n,i,a){var c=Si();return i=a!==void 0?a(i):i,c.memoizedState=c.baseState=i,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:i},c.queue=n,n=n.dispatch=uv.bind(null,kt,n),[c.memoizedState,n]},useRef:function(n){var i=Si();return n={current:n},i.memoizedState=n},useState:lh,useDebugValue:eu,useDeferredValue:function(n){return Si().memoizedState=n},useTransition:function(){var n=lh(!1),i=n[0];return n=cv.bind(null,n[1]),Si().memoizedState=n,[i,n]},useMutableSource:function(){},useSyncExternalStore:function(n,i,a){var c=kt,h=Si();if(Ut){if(a===void 0)throw Error(t(407));a=a()}else{if(a=i(),tn===null)throw Error(t(349));(zr&30)!==0||ih(c,i,a)}h.memoizedState=a;var v={value:a,getSnapshot:i};return h.queue=v,uh(sh.bind(null,c,v,n),[n]),c.flags|=2048,Uo(9,rh.bind(null,c,v,a,i),void 0,null),a},useId:function(){var n=Si(),i=tn.identifierPrefix;if(Ut){var a=Ii,c=Di;a=(c&~(1<<32-yn(c)-1)).toString(32)+a,i=":"+i+"R"+a,a=Io++,0<a&&(i+="H"+a.toString(32)),i+=":"}else a=lv++,i=":"+i+"r"+a.toString(32)+":";return n.memoizedState=i},unstable_isNewReconciler:!1},hv={readContext:Zn,useCallback:mh,useContext:Zn,useEffect:Jc,useImperativeHandle:ph,useInsertionEffect:dh,useLayoutEffect:fh,useMemo:gh,useReducer:Zc,useRef:ch,useState:function(){return Zc(No)},useDebugValue:eu,useDeferredValue:function(n){var i=Qn();return vh(i,qt.memoizedState,n)},useTransition:function(){var n=Zc(No)[0],i=Qn().memoizedState;return[n,i]},useMutableSource:th,useSyncExternalStore:nh,useId:_h,unstable_isNewReconciler:!1},pv={readContext:Zn,useCallback:mh,useContext:Zn,useEffect:Jc,useImperativeHandle:ph,useInsertionEffect:dh,useLayoutEffect:fh,useMemo:gh,useReducer:Qc,useRef:ch,useState:function(){return Qc(No)},useDebugValue:eu,useDeferredValue:function(n){var i=Qn();return qt===null?i.memoizedState=n:vh(i,qt.memoizedState,n)},useTransition:function(){var n=Qc(No)[0],i=Qn().memoizedState;return[n,i]},useMutableSource:th,useSyncExternalStore:nh,useId:_h,unstable_isNewReconciler:!1};function li(n,i){if(n&&n.defaultProps){i=V({},i),n=n.defaultProps;for(var a in n)i[a]===void 0&&(i[a]=n[a]);return i}return i}function tu(n,i,a,c){i=n.memoizedState,a=a(c,i),a=a==null?i:V({},i,a),n.memoizedState=a,n.lanes===0&&(n.updateQueue.baseState=a)}var qa={isMounted:function(n){return(n=n._reactInternals)?Ri(n)===n:!1},enqueueSetState:function(n,i,a){n=n._reactInternals;var c=Mn(),h=fr(n),v=Ui(c,h);v.payload=i,a!=null&&(v.callback=a),i=lr(n,v,h),i!==null&&(di(i,n,h,c),za(i,n,h))},enqueueReplaceState:function(n,i,a){n=n._reactInternals;var c=Mn(),h=fr(n),v=Ui(c,h);v.tag=1,v.payload=i,a!=null&&(v.callback=a),i=lr(n,v,h),i!==null&&(di(i,n,h,c),za(i,n,h))},enqueueForceUpdate:function(n,i){n=n._reactInternals;var a=Mn(),c=fr(n),h=Ui(a,c);h.tag=2,i!=null&&(h.callback=i),i=lr(n,h,c),i!==null&&(di(i,n,c,a),za(i,n,c))}};function Mh(n,i,a,c,h,v,T){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(c,v,T):i.prototype&&i.prototype.isPureReactComponent?!So(a,c)||!So(h,v):!0}function Eh(n,i,a){var c=!1,h=sr,v=i.contextType;return typeof v=="object"&&v!==null?v=Zn(v):(h=bn(i)?Ur:fn.current,c=i.contextTypes,v=(c=c!=null)?_s(n,h):sr),i=new i(a,v),n.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=qa,n.stateNode=i,i._reactInternals=n,c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=h,n.__reactInternalMemoizedMaskedChildContext=v),i}function Th(n,i,a,c){n=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(a,c),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(a,c),i.state!==n&&qa.enqueueReplaceState(i,i.state,null)}function nu(n,i,a,c){var h=n.stateNode;h.props=a,h.state=n.memoizedState,h.refs={},Gc(n);var v=i.contextType;typeof v=="object"&&v!==null?h.context=Zn(v):(v=bn(i)?Ur:fn.current,h.context=_s(n,v)),h.state=n.memoizedState,v=i.getDerivedStateFromProps,typeof v=="function"&&(tu(n,i,v,a),h.state=n.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof h.getSnapshotBeforeUpdate=="function"||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(i=h.state,typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount(),i!==h.state&&qa.enqueueReplaceState(h,h.state,null),Ha(n,a,h,c),h.state=n.memoizedState),typeof h.componentDidMount=="function"&&(n.flags|=4194308)}function As(n,i){try{var a="",c=i;do a+=pe(c),c=c.return;while(c);var h=a}catch(v){h=`
Error generating stack: `+v.message+`
`+v.stack}return{value:n,source:i,stack:h,digest:null}}function iu(n,i,a){return{value:n,source:null,stack:a??null,digest:i??null}}function ru(n,i){try{console.error(i.value)}catch(a){setTimeout(function(){throw a})}}var mv=typeof WeakMap=="function"?WeakMap:Map;function wh(n,i,a){a=Ui(-1,a),a.tag=3,a.payload={element:null};var c=i.value;return a.callback=function(){tl||(tl=!0,xu=c),ru(n,i)},a}function Ah(n,i,a){a=Ui(-1,a),a.tag=3;var c=n.type.getDerivedStateFromError;if(typeof c=="function"){var h=i.value;a.payload=function(){return c(h)},a.callback=function(){ru(n,i)}}var v=n.stateNode;return v!==null&&typeof v.componentDidCatch=="function"&&(a.callback=function(){ru(n,i),typeof c!="function"&&(ur===null?ur=new Set([this]):ur.add(this));var T=i.stack;this.componentDidCatch(i.value,{componentStack:T!==null?T:""})}),a}function Ch(n,i,a){var c=n.pingCache;if(c===null){c=n.pingCache=new mv;var h=new Set;c.set(i,h)}else h=c.get(i),h===void 0&&(h=new Set,c.set(i,h));h.has(a)||(h.add(a),n=bv.bind(null,n,i,a),i.then(n,n))}function Rh(n){do{var i;if((i=n.tag===13)&&(i=n.memoizedState,i=i!==null?i.dehydrated!==null:!0),i)return n;n=n.return}while(n!==null);return null}function bh(n,i,a,c,h){return(n.mode&1)===0?(n===i?n.flags|=65536:(n.flags|=128,a.flags|=131072,a.flags&=-52805,a.tag===1&&(a.alternate===null?a.tag=17:(i=Ui(-1,1),i.tag=2,lr(a,i,1))),a.lanes|=1),n):(n.flags|=65536,n.lanes=h,n)}var gv=b.ReactCurrentOwner,Ln=!1;function Sn(n,i,a,c){i.child=n===null?$f(i,null,a,c):Ms(i,n.child,a,c)}function Lh(n,i,a,c,h){a=a.render;var v=i.ref;return Ts(i,h),c=$c(n,i,a,c,v,h),a=Kc(),n!==null&&!Ln?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~h,Oi(n,i,h)):(Ut&&a&&Dc(i),i.flags|=1,Sn(n,i,c,h),i.child)}function Ph(n,i,a,c,h){if(n===null){var v=a.type;return typeof v=="function"&&!Au(v)&&v.defaultProps===void 0&&a.compare===null&&a.defaultProps===void 0?(i.tag=15,i.type=v,Dh(n,i,v,c,h)):(n=al(a.type,null,c,i,i.mode,h),n.ref=i.ref,n.return=i,i.child=n)}if(v=n.child,(n.lanes&h)===0){var T=v.memoizedProps;if(a=a.compare,a=a!==null?a:So,a(T,c)&&n.ref===i.ref)return Oi(n,i,h)}return i.flags|=1,n=pr(v,c),n.ref=i.ref,n.return=i,i.child=n}function Dh(n,i,a,c,h){if(n!==null){var v=n.memoizedProps;if(So(v,c)&&n.ref===i.ref)if(Ln=!1,i.pendingProps=c=v,(n.lanes&h)!==0)(n.flags&131072)!==0&&(Ln=!0);else return i.lanes=n.lanes,Oi(n,i,h)}return su(n,i,a,c,h)}function Ih(n,i,a){var c=i.pendingProps,h=c.children,v=n!==null?n.memoizedState:null;if(c.mode==="hidden")if((i.mode&1)===0)i.memoizedState={baseLanes:0,cachePool:null,transitions:null},Lt(Rs,Vn),Vn|=a;else{if((a&1073741824)===0)return n=v!==null?v.baseLanes|a:a,i.lanes=i.childLanes=1073741824,i.memoizedState={baseLanes:n,cachePool:null,transitions:null},i.updateQueue=null,Lt(Rs,Vn),Vn|=n,null;i.memoizedState={baseLanes:0,cachePool:null,transitions:null},c=v!==null?v.baseLanes:a,Lt(Rs,Vn),Vn|=c}else v!==null?(c=v.baseLanes|a,i.memoizedState=null):c=a,Lt(Rs,Vn),Vn|=c;return Sn(n,i,h,a),i.child}function Nh(n,i){var a=i.ref;(n===null&&a!==null||n!==null&&n.ref!==a)&&(i.flags|=512,i.flags|=2097152)}function su(n,i,a,c,h){var v=bn(a)?Ur:fn.current;return v=_s(i,v),Ts(i,h),a=$c(n,i,a,c,v,h),c=Kc(),n!==null&&!Ln?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~h,Oi(n,i,h)):(Ut&&c&&Dc(i),i.flags|=1,Sn(n,i,a,h),i.child)}function Uh(n,i,a,c,h){if(bn(a)){var v=!0;Da(i)}else v=!1;if(Ts(i,h),i.stateNode===null)Ka(n,i),Eh(i,a,c),nu(i,a,c,h),c=!0;else if(n===null){var T=i.stateNode,F=i.memoizedProps;T.props=F;var W=T.context,se=a.contextType;typeof se=="object"&&se!==null?se=Zn(se):(se=bn(a)?Ur:fn.current,se=_s(i,se));var Ee=a.getDerivedStateFromProps,we=typeof Ee=="function"||typeof T.getSnapshotBeforeUpdate=="function";we||typeof T.UNSAFE_componentWillReceiveProps!="function"&&typeof T.componentWillReceiveProps!="function"||(F!==c||W!==se)&&Th(i,T,c,se),ar=!1;var Me=i.memoizedState;T.state=Me,Ha(i,c,T,h),W=i.memoizedState,F!==c||Me!==W||Rn.current||ar?(typeof Ee=="function"&&(tu(i,a,Ee,c),W=i.memoizedState),(F=ar||Mh(i,a,F,c,Me,W,se))?(we||typeof T.UNSAFE_componentWillMount!="function"&&typeof T.componentWillMount!="function"||(typeof T.componentWillMount=="function"&&T.componentWillMount(),typeof T.UNSAFE_componentWillMount=="function"&&T.UNSAFE_componentWillMount()),typeof T.componentDidMount=="function"&&(i.flags|=4194308)):(typeof T.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=c,i.memoizedState=W),T.props=c,T.state=W,T.context=se,c=F):(typeof T.componentDidMount=="function"&&(i.flags|=4194308),c=!1)}else{T=i.stateNode,Zf(n,i),F=i.memoizedProps,se=i.type===i.elementType?F:li(i.type,F),T.props=se,we=i.pendingProps,Me=T.context,W=a.contextType,typeof W=="object"&&W!==null?W=Zn(W):(W=bn(a)?Ur:fn.current,W=_s(i,W));var Oe=a.getDerivedStateFromProps;(Ee=typeof Oe=="function"||typeof T.getSnapshotBeforeUpdate=="function")||typeof T.UNSAFE_componentWillReceiveProps!="function"&&typeof T.componentWillReceiveProps!="function"||(F!==we||Me!==W)&&Th(i,T,c,W),ar=!1,Me=i.memoizedState,T.state=Me,Ha(i,c,T,h);var Ve=i.memoizedState;F!==we||Me!==Ve||Rn.current||ar?(typeof Oe=="function"&&(tu(i,a,Oe,c),Ve=i.memoizedState),(se=ar||Mh(i,a,se,c,Me,Ve,W)||!1)?(Ee||typeof T.UNSAFE_componentWillUpdate!="function"&&typeof T.componentWillUpdate!="function"||(typeof T.componentWillUpdate=="function"&&T.componentWillUpdate(c,Ve,W),typeof T.UNSAFE_componentWillUpdate=="function"&&T.UNSAFE_componentWillUpdate(c,Ve,W)),typeof T.componentDidUpdate=="function"&&(i.flags|=4),typeof T.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof T.componentDidUpdate!="function"||F===n.memoizedProps&&Me===n.memoizedState||(i.flags|=4),typeof T.getSnapshotBeforeUpdate!="function"||F===n.memoizedProps&&Me===n.memoizedState||(i.flags|=1024),i.memoizedProps=c,i.memoizedState=Ve),T.props=c,T.state=Ve,T.context=W,c=se):(typeof T.componentDidUpdate!="function"||F===n.memoizedProps&&Me===n.memoizedState||(i.flags|=4),typeof T.getSnapshotBeforeUpdate!="function"||F===n.memoizedProps&&Me===n.memoizedState||(i.flags|=1024),c=!1)}return ou(n,i,a,c,v,h)}function ou(n,i,a,c,h,v){Nh(n,i);var T=(i.flags&128)!==0;if(!c&&!T)return h&&zf(i,a,!1),Oi(n,i,v);c=i.stateNode,gv.current=i;var F=T&&typeof a.getDerivedStateFromError!="function"?null:c.render();return i.flags|=1,n!==null&&T?(i.child=Ms(i,n.child,null,v),i.child=Ms(i,null,F,v)):Sn(n,i,F,v),i.memoizedState=c.state,h&&zf(i,a,!0),i.child}function Oh(n){var i=n.stateNode;i.pendingContext?kf(n,i.pendingContext,i.pendingContext!==i.context):i.context&&kf(n,i.context,!1),Vc(n,i.containerInfo)}function Fh(n,i,a,c,h){return Ss(),Oc(h),i.flags|=256,Sn(n,i,a,c),i.child}var au={dehydrated:null,treeContext:null,retryLane:0};function lu(n){return{baseLanes:n,cachePool:null,transitions:null}}function kh(n,i,a){var c=i.pendingProps,h=Ft.current,v=!1,T=(i.flags&128)!==0,F;if((F=T)||(F=n!==null&&n.memoizedState===null?!1:(h&2)!==0),F?(v=!0,i.flags&=-129):(n===null||n.memoizedState!==null)&&(h|=1),Lt(Ft,h&1),n===null)return Uc(i),n=i.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?((i.mode&1)===0?i.lanes=1:n.data==="$!"?i.lanes=8:i.lanes=1073741824,null):(T=c.children,n=c.fallback,v?(c=i.mode,v=i.child,T={mode:"hidden",children:T},(c&1)===0&&v!==null?(v.childLanes=0,v.pendingProps=T):v=ll(T,c,0,null),n=jr(n,c,a,null),v.return=i,n.return=i,v.sibling=n,i.child=v,i.child.memoizedState=lu(a),i.memoizedState=au,n):cu(i,T));if(h=n.memoizedState,h!==null&&(F=h.dehydrated,F!==null))return vv(n,i,T,c,F,h,a);if(v){v=c.fallback,T=i.mode,h=n.child,F=h.sibling;var W={mode:"hidden",children:c.children};return(T&1)===0&&i.child!==h?(c=i.child,c.childLanes=0,c.pendingProps=W,i.deletions=null):(c=pr(h,W),c.subtreeFlags=h.subtreeFlags&14680064),F!==null?v=pr(F,v):(v=jr(v,T,a,null),v.flags|=2),v.return=i,c.return=i,c.sibling=v,i.child=c,c=v,v=i.child,T=n.child.memoizedState,T=T===null?lu(a):{baseLanes:T.baseLanes|a,cachePool:null,transitions:T.transitions},v.memoizedState=T,v.childLanes=n.childLanes&~a,i.memoizedState=au,c}return v=n.child,n=v.sibling,c=pr(v,{mode:"visible",children:c.children}),(i.mode&1)===0&&(c.lanes=a),c.return=i,c.sibling=null,n!==null&&(a=i.deletions,a===null?(i.deletions=[n],i.flags|=16):a.push(n)),i.child=c,i.memoizedState=null,c}function cu(n,i){return i=ll({mode:"visible",children:i},n.mode,0,null),i.return=n,n.child=i}function $a(n,i,a,c){return c!==null&&Oc(c),Ms(i,n.child,null,a),n=cu(i,i.pendingProps.children),n.flags|=2,i.memoizedState=null,n}function vv(n,i,a,c,h,v,T){if(a)return i.flags&256?(i.flags&=-257,c=iu(Error(t(422))),$a(n,i,T,c)):i.memoizedState!==null?(i.child=n.child,i.flags|=128,null):(v=c.fallback,h=i.mode,c=ll({mode:"visible",children:c.children},h,0,null),v=jr(v,h,T,null),v.flags|=2,c.return=i,v.return=i,c.sibling=v,i.child=c,(i.mode&1)!==0&&Ms(i,n.child,null,T),i.child.memoizedState=lu(T),i.memoizedState=au,v);if((i.mode&1)===0)return $a(n,i,T,null);if(h.data==="$!"){if(c=h.nextSibling&&h.nextSibling.dataset,c)var F=c.dgst;return c=F,v=Error(t(419)),c=iu(v,c,void 0),$a(n,i,T,c)}if(F=(T&n.childLanes)!==0,Ln||F){if(c=tn,c!==null){switch(T&-T){case 4:h=2;break;case 16:h=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:h=32;break;case 536870912:h=268435456;break;default:h=0}h=(h&(c.suspendedLanes|T))!==0?0:h,h!==0&&h!==v.retryLane&&(v.retryLane=h,Ni(n,h),di(c,n,h,-1))}return wu(),c=iu(Error(t(421))),$a(n,i,T,c)}return h.data==="$?"?(i.flags|=128,i.child=n.child,i=Lv.bind(null,n),h._reactRetry=i,null):(n=v.treeContext,Gn=ir(h.nextSibling),Hn=i,Ut=!0,ai=null,n!==null&&($n[Kn++]=Di,$n[Kn++]=Ii,$n[Kn++]=Or,Di=n.id,Ii=n.overflow,Or=i),i=cu(i,c.children),i.flags|=4096,i)}function Bh(n,i,a){n.lanes|=i;var c=n.alternate;c!==null&&(c.lanes|=i),zc(n.return,i,a)}function uu(n,i,a,c,h){var v=n.memoizedState;v===null?n.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:c,tail:a,tailMode:h}:(v.isBackwards=i,v.rendering=null,v.renderingStartTime=0,v.last=c,v.tail=a,v.tailMode=h)}function zh(n,i,a){var c=i.pendingProps,h=c.revealOrder,v=c.tail;if(Sn(n,i,c.children,a),c=Ft.current,(c&2)!==0)c=c&1|2,i.flags|=128;else{if(n!==null&&(n.flags&128)!==0)e:for(n=i.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&Bh(n,a,i);else if(n.tag===19)Bh(n,a,i);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===i)break e;for(;n.sibling===null;){if(n.return===null||n.return===i)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}c&=1}if(Lt(Ft,c),(i.mode&1)===0)i.memoizedState=null;else switch(h){case"forwards":for(a=i.child,h=null;a!==null;)n=a.alternate,n!==null&&Ga(n)===null&&(h=a),a=a.sibling;a=h,a===null?(h=i.child,i.child=null):(h=a.sibling,a.sibling=null),uu(i,!1,h,a,v);break;case"backwards":for(a=null,h=i.child,i.child=null;h!==null;){if(n=h.alternate,n!==null&&Ga(n)===null){i.child=h;break}n=h.sibling,h.sibling=a,a=h,h=n}uu(i,!0,a,null,v);break;case"together":uu(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function Ka(n,i){(i.mode&1)===0&&n!==null&&(n.alternate=null,i.alternate=null,i.flags|=2)}function Oi(n,i,a){if(n!==null&&(i.dependencies=n.dependencies),Hr|=i.lanes,(a&i.childLanes)===0)return null;if(n!==null&&i.child!==n.child)throw Error(t(153));if(i.child!==null){for(n=i.child,a=pr(n,n.pendingProps),i.child=a,a.return=i;n.sibling!==null;)n=n.sibling,a=a.sibling=pr(n,n.pendingProps),a.return=i;a.sibling=null}return i.child}function _v(n,i,a){switch(i.tag){case 3:Oh(i),Ss();break;case 5:eh(i);break;case 1:bn(i.type)&&Da(i);break;case 4:Vc(i,i.stateNode.containerInfo);break;case 10:var c=i.type._context,h=i.memoizedProps.value;Lt(ka,c._currentValue),c._currentValue=h;break;case 13:if(c=i.memoizedState,c!==null)return c.dehydrated!==null?(Lt(Ft,Ft.current&1),i.flags|=128,null):(a&i.child.childLanes)!==0?kh(n,i,a):(Lt(Ft,Ft.current&1),n=Oi(n,i,a),n!==null?n.sibling:null);Lt(Ft,Ft.current&1);break;case 19:if(c=(a&i.childLanes)!==0,(n.flags&128)!==0){if(c)return zh(n,i,a);i.flags|=128}if(h=i.memoizedState,h!==null&&(h.rendering=null,h.tail=null,h.lastEffect=null),Lt(Ft,Ft.current),c)break;return null;case 22:case 23:return i.lanes=0,Ih(n,i,a)}return Oi(n,i,a)}var Hh,du,Gh,Vh;Hh=function(n,i){for(var a=i.child;a!==null;){if(a.tag===5||a.tag===6)n.appendChild(a.stateNode);else if(a.tag!==4&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===i)break;for(;a.sibling===null;){if(a.return===null||a.return===i)return;a=a.return}a.sibling.return=a.return,a=a.sibling}},du=function(){},Gh=function(n,i,a,c){var h=n.memoizedProps;if(h!==c){n=i.stateNode,Br(yi.current);var v=null;switch(a){case"input":h=Fe(n,h),c=Fe(n,c),v=[];break;case"select":h=V({},h,{value:void 0}),c=V({},c,{value:void 0}),v=[];break;case"textarea":h=ge(n,h),c=ge(n,c),v=[];break;default:typeof h.onClick!="function"&&typeof c.onClick=="function"&&(n.onclick=ba)}tt(a,c);var T;a=null;for(se in h)if(!c.hasOwnProperty(se)&&h.hasOwnProperty(se)&&h[se]!=null)if(se==="style"){var F=h[se];for(T in F)F.hasOwnProperty(T)&&(a||(a={}),a[T]="")}else se!=="dangerouslySetInnerHTML"&&se!=="children"&&se!=="suppressContentEditableWarning"&&se!=="suppressHydrationWarning"&&se!=="autoFocus"&&(o.hasOwnProperty(se)?v||(v=[]):(v=v||[]).push(se,null));for(se in c){var W=c[se];if(F=h?.[se],c.hasOwnProperty(se)&&W!==F&&(W!=null||F!=null))if(se==="style")if(F){for(T in F)!F.hasOwnProperty(T)||W&&W.hasOwnProperty(T)||(a||(a={}),a[T]="");for(T in W)W.hasOwnProperty(T)&&F[T]!==W[T]&&(a||(a={}),a[T]=W[T])}else a||(v||(v=[]),v.push(se,a)),a=W;else se==="dangerouslySetInnerHTML"?(W=W?W.__html:void 0,F=F?F.__html:void 0,W!=null&&F!==W&&(v=v||[]).push(se,W)):se==="children"?typeof W!="string"&&typeof W!="number"||(v=v||[]).push(se,""+W):se!=="suppressContentEditableWarning"&&se!=="suppressHydrationWarning"&&(o.hasOwnProperty(se)?(W!=null&&se==="onScroll"&&Pt("scroll",n),v||F===W||(v=[])):(v=v||[]).push(se,W))}a&&(v=v||[]).push("style",a);var se=v;(i.updateQueue=se)&&(i.flags|=4)}},Vh=function(n,i,a,c){a!==c&&(i.flags|=4)};function Oo(n,i){if(!Ut)switch(n.tailMode){case"hidden":i=n.tail;for(var a=null;i!==null;)i.alternate!==null&&(a=i),i=i.sibling;a===null?n.tail=null:a.sibling=null;break;case"collapsed":a=n.tail;for(var c=null;a!==null;)a.alternate!==null&&(c=a),a=a.sibling;c===null?i||n.tail===null?n.tail=null:n.tail.sibling=null:c.sibling=null}}function pn(n){var i=n.alternate!==null&&n.alternate.child===n.child,a=0,c=0;if(i)for(var h=n.child;h!==null;)a|=h.lanes|h.childLanes,c|=h.subtreeFlags&14680064,c|=h.flags&14680064,h.return=n,h=h.sibling;else for(h=n.child;h!==null;)a|=h.lanes|h.childLanes,c|=h.subtreeFlags,c|=h.flags,h.return=n,h=h.sibling;return n.subtreeFlags|=c,n.childLanes=a,i}function xv(n,i,a){var c=i.pendingProps;switch(Ic(i),i.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return pn(i),null;case 1:return bn(i.type)&&Pa(),pn(i),null;case 3:return c=i.stateNode,ws(),Dt(Rn),Dt(fn),Xc(),c.pendingContext&&(c.context=c.pendingContext,c.pendingContext=null),(n===null||n.child===null)&&(Oa(i)?i.flags|=4:n===null||n.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,ai!==null&&(Mu(ai),ai=null))),du(n,i),pn(i),null;case 5:Wc(i);var h=Br(Po.current);if(a=i.type,n!==null&&i.stateNode!=null)Gh(n,i,a,c,h),n.ref!==i.ref&&(i.flags|=512,i.flags|=2097152);else{if(!c){if(i.stateNode===null)throw Error(t(166));return pn(i),null}if(n=Br(yi.current),Oa(i)){c=i.stateNode,a=i.type;var v=i.memoizedProps;switch(c[xi]=i,c[Ao]=v,n=(i.mode&1)!==0,a){case"dialog":Pt("cancel",c),Pt("close",c);break;case"iframe":case"object":case"embed":Pt("load",c);break;case"video":case"audio":for(h=0;h<Eo.length;h++)Pt(Eo[h],c);break;case"source":Pt("error",c);break;case"img":case"image":case"link":Pt("error",c),Pt("load",c);break;case"details":Pt("toggle",c);break;case"input":Ne(c,v),Pt("invalid",c);break;case"select":c._wrapperState={wasMultiple:!!v.multiple},Pt("invalid",c);break;case"textarea":me(c,v),Pt("invalid",c)}tt(a,v),h=null;for(var T in v)if(v.hasOwnProperty(T)){var F=v[T];T==="children"?typeof F=="string"?c.textContent!==F&&(v.suppressHydrationWarning!==!0&&Ra(c.textContent,F,n),h=["children",F]):typeof F=="number"&&c.textContent!==""+F&&(v.suppressHydrationWarning!==!0&&Ra(c.textContent,F,n),h=["children",""+F]):o.hasOwnProperty(T)&&F!=null&&T==="onScroll"&&Pt("scroll",c)}switch(a){case"input":Ge(c),Xe(c,v,!0);break;case"textarea":Ge(c),Le(c);break;case"select":case"option":break;default:typeof v.onClick=="function"&&(c.onclick=ba)}c=h,i.updateQueue=c,c!==null&&(i.flags|=4)}else{T=h.nodeType===9?h:h.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=Ie(a)),n==="http://www.w3.org/1999/xhtml"?a==="script"?(n=T.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof c.is=="string"?n=T.createElement(a,{is:c.is}):(n=T.createElement(a),a==="select"&&(T=n,c.multiple?T.multiple=!0:c.size&&(T.size=c.size))):n=T.createElementNS(n,a),n[xi]=i,n[Ao]=c,Hh(n,i,!1,!1),i.stateNode=n;e:{switch(T=_t(a,c),a){case"dialog":Pt("cancel",n),Pt("close",n),h=c;break;case"iframe":case"object":case"embed":Pt("load",n),h=c;break;case"video":case"audio":for(h=0;h<Eo.length;h++)Pt(Eo[h],n);h=c;break;case"source":Pt("error",n),h=c;break;case"img":case"image":case"link":Pt("error",n),Pt("load",n),h=c;break;case"details":Pt("toggle",n),h=c;break;case"input":Ne(n,c),h=Fe(n,c),Pt("invalid",n);break;case"option":h=c;break;case"select":n._wrapperState={wasMultiple:!!c.multiple},h=V({},c,{value:void 0}),Pt("invalid",n);break;case"textarea":me(n,c),h=ge(n,c),Pt("invalid",n);break;default:h=c}tt(a,h),F=h;for(v in F)if(F.hasOwnProperty(v)){var W=F[v];v==="style"?qe(n,W):v==="dangerouslySetInnerHTML"?(W=W?W.__html:void 0,W!=null&&ot(n,W)):v==="children"?typeof W=="string"?(a!=="textarea"||W!=="")&&Se(n,W):typeof W=="number"&&Se(n,""+W):v!=="suppressContentEditableWarning"&&v!=="suppressHydrationWarning"&&v!=="autoFocus"&&(o.hasOwnProperty(v)?W!=null&&v==="onScroll"&&Pt("scroll",n):W!=null&&R(n,v,W,T))}switch(a){case"input":Ge(n),Xe(n,c,!1);break;case"textarea":Ge(n),Le(n);break;case"option":c.value!=null&&n.setAttribute("value",""+ue(c.value));break;case"select":n.multiple=!!c.multiple,v=c.value,v!=null?ne(n,!!c.multiple,v,!1):c.defaultValue!=null&&ne(n,!!c.multiple,c.defaultValue,!0);break;default:typeof h.onClick=="function"&&(n.onclick=ba)}switch(a){case"button":case"input":case"select":case"textarea":c=!!c.autoFocus;break e;case"img":c=!0;break e;default:c=!1}}c&&(i.flags|=4)}i.ref!==null&&(i.flags|=512,i.flags|=2097152)}return pn(i),null;case 6:if(n&&i.stateNode!=null)Vh(n,i,n.memoizedProps,c);else{if(typeof c!="string"&&i.stateNode===null)throw Error(t(166));if(a=Br(Po.current),Br(yi.current),Oa(i)){if(c=i.stateNode,a=i.memoizedProps,c[xi]=i,(v=c.nodeValue!==a)&&(n=Hn,n!==null))switch(n.tag){case 3:Ra(c.nodeValue,a,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&Ra(c.nodeValue,a,(n.mode&1)!==0)}v&&(i.flags|=4)}else c=(a.nodeType===9?a:a.ownerDocument).createTextNode(c),c[xi]=i,i.stateNode=c}return pn(i),null;case 13:if(Dt(Ft),c=i.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(Ut&&Gn!==null&&(i.mode&1)!==0&&(i.flags&128)===0)Xf(),Ss(),i.flags|=98560,v=!1;else if(v=Oa(i),c!==null&&c.dehydrated!==null){if(n===null){if(!v)throw Error(t(318));if(v=i.memoizedState,v=v!==null?v.dehydrated:null,!v)throw Error(t(317));v[xi]=i}else Ss(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;pn(i),v=!1}else ai!==null&&(Mu(ai),ai=null),v=!0;if(!v)return i.flags&65536?i:null}return(i.flags&128)!==0?(i.lanes=a,i):(c=c!==null,c!==(n!==null&&n.memoizedState!==null)&&c&&(i.child.flags|=8192,(i.mode&1)!==0&&(n===null||(Ft.current&1)!==0?$t===0&&($t=3):wu())),i.updateQueue!==null&&(i.flags|=4),pn(i),null);case 4:return ws(),du(n,i),n===null&&To(i.stateNode.containerInfo),pn(i),null;case 10:return Bc(i.type._context),pn(i),null;case 17:return bn(i.type)&&Pa(),pn(i),null;case 19:if(Dt(Ft),v=i.memoizedState,v===null)return pn(i),null;if(c=(i.flags&128)!==0,T=v.rendering,T===null)if(c)Oo(v,!1);else{if($t!==0||n!==null&&(n.flags&128)!==0)for(n=i.child;n!==null;){if(T=Ga(n),T!==null){for(i.flags|=128,Oo(v,!1),c=T.updateQueue,c!==null&&(i.updateQueue=c,i.flags|=4),i.subtreeFlags=0,c=a,a=i.child;a!==null;)v=a,n=c,v.flags&=14680066,T=v.alternate,T===null?(v.childLanes=0,v.lanes=n,v.child=null,v.subtreeFlags=0,v.memoizedProps=null,v.memoizedState=null,v.updateQueue=null,v.dependencies=null,v.stateNode=null):(v.childLanes=T.childLanes,v.lanes=T.lanes,v.child=T.child,v.subtreeFlags=0,v.deletions=null,v.memoizedProps=T.memoizedProps,v.memoizedState=T.memoizedState,v.updateQueue=T.updateQueue,v.type=T.type,n=T.dependencies,v.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),a=a.sibling;return Lt(Ft,Ft.current&1|2),i.child}n=n.sibling}v.tail!==null&&ze()>bs&&(i.flags|=128,c=!0,Oo(v,!1),i.lanes=4194304)}else{if(!c)if(n=Ga(T),n!==null){if(i.flags|=128,c=!0,a=n.updateQueue,a!==null&&(i.updateQueue=a,i.flags|=4),Oo(v,!0),v.tail===null&&v.tailMode==="hidden"&&!T.alternate&&!Ut)return pn(i),null}else 2*ze()-v.renderingStartTime>bs&&a!==1073741824&&(i.flags|=128,c=!0,Oo(v,!1),i.lanes=4194304);v.isBackwards?(T.sibling=i.child,i.child=T):(a=v.last,a!==null?a.sibling=T:i.child=T,v.last=T)}return v.tail!==null?(i=v.tail,v.rendering=i,v.tail=i.sibling,v.renderingStartTime=ze(),i.sibling=null,a=Ft.current,Lt(Ft,c?a&1|2:a&1),i):(pn(i),null);case 22:case 23:return Tu(),c=i.memoizedState!==null,n!==null&&n.memoizedState!==null!==c&&(i.flags|=8192),c&&(i.mode&1)!==0?(Vn&1073741824)!==0&&(pn(i),i.subtreeFlags&6&&(i.flags|=8192)):pn(i),null;case 24:return null;case 25:return null}throw Error(t(156,i.tag))}function yv(n,i){switch(Ic(i),i.tag){case 1:return bn(i.type)&&Pa(),n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 3:return ws(),Dt(Rn),Dt(fn),Xc(),n=i.flags,(n&65536)!==0&&(n&128)===0?(i.flags=n&-65537|128,i):null;case 5:return Wc(i),null;case 13:if(Dt(Ft),n=i.memoizedState,n!==null&&n.dehydrated!==null){if(i.alternate===null)throw Error(t(340));Ss()}return n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 19:return Dt(Ft),null;case 4:return ws(),null;case 10:return Bc(i.type._context),null;case 22:case 23:return Tu(),null;case 24:return null;default:return null}}var Za=!1,mn=!1,Sv=typeof WeakSet=="function"?WeakSet:Set,He=null;function Cs(n,i){var a=n.ref;if(a!==null)if(typeof a=="function")try{a(null)}catch(c){Ht(n,i,c)}else a.current=null}function fu(n,i,a){try{a()}catch(c){Ht(n,i,c)}}var Wh=!1;function Mv(n,i){if(Tc=va,n=Mf(),gc(n)){if("selectionStart"in n)var a={start:n.selectionStart,end:n.selectionEnd};else e:{a=(a=n.ownerDocument)&&a.defaultView||window;var c=a.getSelection&&a.getSelection();if(c&&c.rangeCount!==0){a=c.anchorNode;var h=c.anchorOffset,v=c.focusNode;c=c.focusOffset;try{a.nodeType,v.nodeType}catch{a=null;break e}var T=0,F=-1,W=-1,se=0,Ee=0,we=n,Me=null;t:for(;;){for(var Oe;we!==a||h!==0&&we.nodeType!==3||(F=T+h),we!==v||c!==0&&we.nodeType!==3||(W=T+c),we.nodeType===3&&(T+=we.nodeValue.length),(Oe=we.firstChild)!==null;)Me=we,we=Oe;for(;;){if(we===n)break t;if(Me===a&&++se===h&&(F=T),Me===v&&++Ee===c&&(W=T),(Oe=we.nextSibling)!==null)break;we=Me,Me=we.parentNode}we=Oe}a=F===-1||W===-1?null:{start:F,end:W}}else a=null}a=a||{start:0,end:0}}else a=null;for(wc={focusedElem:n,selectionRange:a},va=!1,He=i;He!==null;)if(i=He,n=i.child,(i.subtreeFlags&1028)!==0&&n!==null)n.return=i,He=n;else for(;He!==null;){i=He;try{var Ve=i.alternate;if((i.flags&1024)!==0)switch(i.tag){case 0:case 11:case 15:break;case 1:if(Ve!==null){var We=Ve.memoizedProps,Vt=Ve.memoizedState,J=i.stateNode,$=J.getSnapshotBeforeUpdate(i.elementType===i.type?We:li(i.type,We),Vt);J.__reactInternalSnapshotBeforeUpdate=$}break;case 3:var re=i.stateNode.containerInfo;re.nodeType===1?re.textContent="":re.nodeType===9&&re.documentElement&&re.removeChild(re.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(t(163))}}catch(Ae){Ht(i,i.return,Ae)}if(n=i.sibling,n!==null){n.return=i.return,He=n;break}He=i.return}return Ve=Wh,Wh=!1,Ve}function Fo(n,i,a){var c=i.updateQueue;if(c=c!==null?c.lastEffect:null,c!==null){var h=c=c.next;do{if((h.tag&n)===n){var v=h.destroy;h.destroy=void 0,v!==void 0&&fu(i,a,v)}h=h.next}while(h!==c)}}function Qa(n,i){if(i=i.updateQueue,i=i!==null?i.lastEffect:null,i!==null){var a=i=i.next;do{if((a.tag&n)===n){var c=a.create;a.destroy=c()}a=a.next}while(a!==i)}}function hu(n){var i=n.ref;if(i!==null){var a=n.stateNode;n.tag,n=a,typeof i=="function"?i(n):i.current=n}}function jh(n){var i=n.alternate;i!==null&&(n.alternate=null,jh(i)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(i=n.stateNode,i!==null&&(delete i[xi],delete i[Ao],delete i[bc],delete i[rv],delete i[sv])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function Xh(n){return n.tag===5||n.tag===3||n.tag===4}function Yh(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||Xh(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function pu(n,i,a){var c=n.tag;if(c===5||c===6)n=n.stateNode,i?a.nodeType===8?a.parentNode.insertBefore(n,i):a.insertBefore(n,i):(a.nodeType===8?(i=a.parentNode,i.insertBefore(n,a)):(i=a,i.appendChild(n)),a=a._reactRootContainer,a!=null||i.onclick!==null||(i.onclick=ba));else if(c!==4&&(n=n.child,n!==null))for(pu(n,i,a),n=n.sibling;n!==null;)pu(n,i,a),n=n.sibling}function mu(n,i,a){var c=n.tag;if(c===5||c===6)n=n.stateNode,i?a.insertBefore(n,i):a.appendChild(n);else if(c!==4&&(n=n.child,n!==null))for(mu(n,i,a),n=n.sibling;n!==null;)mu(n,i,a),n=n.sibling}var on=null,ci=!1;function cr(n,i,a){for(a=a.child;a!==null;)qh(n,i,a),a=a.sibling}function qh(n,i,a){if(vt&&typeof vt.onCommitFiberUnmount=="function")try{vt.onCommitFiberUnmount(An,a)}catch{}switch(a.tag){case 5:mn||Cs(a,i);case 6:var c=on,h=ci;on=null,cr(n,i,a),on=c,ci=h,on!==null&&(ci?(n=on,a=a.stateNode,n.nodeType===8?n.parentNode.removeChild(a):n.removeChild(a)):on.removeChild(a.stateNode));break;case 18:on!==null&&(ci?(n=on,a=a.stateNode,n.nodeType===8?Rc(n.parentNode,a):n.nodeType===1&&Rc(n,a),mo(n)):Rc(on,a.stateNode));break;case 4:c=on,h=ci,on=a.stateNode.containerInfo,ci=!0,cr(n,i,a),on=c,ci=h;break;case 0:case 11:case 14:case 15:if(!mn&&(c=a.updateQueue,c!==null&&(c=c.lastEffect,c!==null))){h=c=c.next;do{var v=h,T=v.destroy;v=v.tag,T!==void 0&&((v&2)!==0||(v&4)!==0)&&fu(a,i,T),h=h.next}while(h!==c)}cr(n,i,a);break;case 1:if(!mn&&(Cs(a,i),c=a.stateNode,typeof c.componentWillUnmount=="function"))try{c.props=a.memoizedProps,c.state=a.memoizedState,c.componentWillUnmount()}catch(F){Ht(a,i,F)}cr(n,i,a);break;case 21:cr(n,i,a);break;case 22:a.mode&1?(mn=(c=mn)||a.memoizedState!==null,cr(n,i,a),mn=c):cr(n,i,a);break;default:cr(n,i,a)}}function $h(n){var i=n.updateQueue;if(i!==null){n.updateQueue=null;var a=n.stateNode;a===null&&(a=n.stateNode=new Sv),i.forEach(function(c){var h=Pv.bind(null,n,c);a.has(c)||(a.add(c),c.then(h,h))})}}function ui(n,i){var a=i.deletions;if(a!==null)for(var c=0;c<a.length;c++){var h=a[c];try{var v=n,T=i,F=T;e:for(;F!==null;){switch(F.tag){case 5:on=F.stateNode,ci=!1;break e;case 3:on=F.stateNode.containerInfo,ci=!0;break e;case 4:on=F.stateNode.containerInfo,ci=!0;break e}F=F.return}if(on===null)throw Error(t(160));qh(v,T,h),on=null,ci=!1;var W=h.alternate;W!==null&&(W.return=null),h.return=null}catch(se){Ht(h,i,se)}}if(i.subtreeFlags&12854)for(i=i.child;i!==null;)Kh(i,n),i=i.sibling}function Kh(n,i){var a=n.alternate,c=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(ui(i,n),Mi(n),c&4){try{Fo(3,n,n.return),Qa(3,n)}catch(We){Ht(n,n.return,We)}try{Fo(5,n,n.return)}catch(We){Ht(n,n.return,We)}}break;case 1:ui(i,n),Mi(n),c&512&&a!==null&&Cs(a,a.return);break;case 5:if(ui(i,n),Mi(n),c&512&&a!==null&&Cs(a,a.return),n.flags&32){var h=n.stateNode;try{Se(h,"")}catch(We){Ht(n,n.return,We)}}if(c&4&&(h=n.stateNode,h!=null)){var v=n.memoizedProps,T=a!==null?a.memoizedProps:v,F=n.type,W=n.updateQueue;if(n.updateQueue=null,W!==null)try{F==="input"&&v.type==="radio"&&v.name!=null&&Pe(h,v),_t(F,T);var se=_t(F,v);for(T=0;T<W.length;T+=2){var Ee=W[T],we=W[T+1];Ee==="style"?qe(h,we):Ee==="dangerouslySetInnerHTML"?ot(h,we):Ee==="children"?Se(h,we):R(h,Ee,we,se)}switch(F){case"input":$e(h,v);break;case"textarea":_e(h,v);break;case"select":var Me=h._wrapperState.wasMultiple;h._wrapperState.wasMultiple=!!v.multiple;var Oe=v.value;Oe!=null?ne(h,!!v.multiple,Oe,!1):Me!==!!v.multiple&&(v.defaultValue!=null?ne(h,!!v.multiple,v.defaultValue,!0):ne(h,!!v.multiple,v.multiple?[]:"",!1))}h[Ao]=v}catch(We){Ht(n,n.return,We)}}break;case 6:if(ui(i,n),Mi(n),c&4){if(n.stateNode===null)throw Error(t(162));h=n.stateNode,v=n.memoizedProps;try{h.nodeValue=v}catch(We){Ht(n,n.return,We)}}break;case 3:if(ui(i,n),Mi(n),c&4&&a!==null&&a.memoizedState.isDehydrated)try{mo(i.containerInfo)}catch(We){Ht(n,n.return,We)}break;case 4:ui(i,n),Mi(n);break;case 13:ui(i,n),Mi(n),h=n.child,h.flags&8192&&(v=h.memoizedState!==null,h.stateNode.isHidden=v,!v||h.alternate!==null&&h.alternate.memoizedState!==null||(_u=ze())),c&4&&$h(n);break;case 22:if(Ee=a!==null&&a.memoizedState!==null,n.mode&1?(mn=(se=mn)||Ee,ui(i,n),mn=se):ui(i,n),Mi(n),c&8192){if(se=n.memoizedState!==null,(n.stateNode.isHidden=se)&&!Ee&&(n.mode&1)!==0)for(He=n,Ee=n.child;Ee!==null;){for(we=He=Ee;He!==null;){switch(Me=He,Oe=Me.child,Me.tag){case 0:case 11:case 14:case 15:Fo(4,Me,Me.return);break;case 1:Cs(Me,Me.return);var Ve=Me.stateNode;if(typeof Ve.componentWillUnmount=="function"){c=Me,a=Me.return;try{i=c,Ve.props=i.memoizedProps,Ve.state=i.memoizedState,Ve.componentWillUnmount()}catch(We){Ht(c,a,We)}}break;case 5:Cs(Me,Me.return);break;case 22:if(Me.memoizedState!==null){Jh(we);continue}}Oe!==null?(Oe.return=Me,He=Oe):Jh(we)}Ee=Ee.sibling}e:for(Ee=null,we=n;;){if(we.tag===5){if(Ee===null){Ee=we;try{h=we.stateNode,se?(v=h.style,typeof v.setProperty=="function"?v.setProperty("display","none","important"):v.display="none"):(F=we.stateNode,W=we.memoizedProps.style,T=W!=null&&W.hasOwnProperty("display")?W.display:null,F.style.display=it("display",T))}catch(We){Ht(n,n.return,We)}}}else if(we.tag===6){if(Ee===null)try{we.stateNode.nodeValue=se?"":we.memoizedProps}catch(We){Ht(n,n.return,We)}}else if((we.tag!==22&&we.tag!==23||we.memoizedState===null||we===n)&&we.child!==null){we.child.return=we,we=we.child;continue}if(we===n)break e;for(;we.sibling===null;){if(we.return===null||we.return===n)break e;Ee===we&&(Ee=null),we=we.return}Ee===we&&(Ee=null),we.sibling.return=we.return,we=we.sibling}}break;case 19:ui(i,n),Mi(n),c&4&&$h(n);break;case 21:break;default:ui(i,n),Mi(n)}}function Mi(n){var i=n.flags;if(i&2){try{e:{for(var a=n.return;a!==null;){if(Xh(a)){var c=a;break e}a=a.return}throw Error(t(160))}switch(c.tag){case 5:var h=c.stateNode;c.flags&32&&(Se(h,""),c.flags&=-33);var v=Yh(n);mu(n,v,h);break;case 3:case 4:var T=c.stateNode.containerInfo,F=Yh(n);pu(n,F,T);break;default:throw Error(t(161))}}catch(W){Ht(n,n.return,W)}n.flags&=-3}i&4096&&(n.flags&=-4097)}function Ev(n,i,a){He=n,Zh(n)}function Zh(n,i,a){for(var c=(n.mode&1)!==0;He!==null;){var h=He,v=h.child;if(h.tag===22&&c){var T=h.memoizedState!==null||Za;if(!T){var F=h.alternate,W=F!==null&&F.memoizedState!==null||mn;F=Za;var se=mn;if(Za=T,(mn=W)&&!se)for(He=h;He!==null;)T=He,W=T.child,T.tag===22&&T.memoizedState!==null?ep(h):W!==null?(W.return=T,He=W):ep(h);for(;v!==null;)He=v,Zh(v),v=v.sibling;He=h,Za=F,mn=se}Qh(n)}else(h.subtreeFlags&8772)!==0&&v!==null?(v.return=h,He=v):Qh(n)}}function Qh(n){for(;He!==null;){var i=He;if((i.flags&8772)!==0){var a=i.alternate;try{if((i.flags&8772)!==0)switch(i.tag){case 0:case 11:case 15:mn||Qa(5,i);break;case 1:var c=i.stateNode;if(i.flags&4&&!mn)if(a===null)c.componentDidMount();else{var h=i.elementType===i.type?a.memoizedProps:li(i.type,a.memoizedProps);c.componentDidUpdate(h,a.memoizedState,c.__reactInternalSnapshotBeforeUpdate)}var v=i.updateQueue;v!==null&&Jf(i,v,c);break;case 3:var T=i.updateQueue;if(T!==null){if(a=null,i.child!==null)switch(i.child.tag){case 5:a=i.child.stateNode;break;case 1:a=i.child.stateNode}Jf(i,T,a)}break;case 5:var F=i.stateNode;if(a===null&&i.flags&4){a=F;var W=i.memoizedProps;switch(i.type){case"button":case"input":case"select":case"textarea":W.autoFocus&&a.focus();break;case"img":W.src&&(a.src=W.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(i.memoizedState===null){var se=i.alternate;if(se!==null){var Ee=se.memoizedState;if(Ee!==null){var we=Ee.dehydrated;we!==null&&mo(we)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(t(163))}mn||i.flags&512&&hu(i)}catch(Me){Ht(i,i.return,Me)}}if(i===n){He=null;break}if(a=i.sibling,a!==null){a.return=i.return,He=a;break}He=i.return}}function Jh(n){for(;He!==null;){var i=He;if(i===n){He=null;break}var a=i.sibling;if(a!==null){a.return=i.return,He=a;break}He=i.return}}function ep(n){for(;He!==null;){var i=He;try{switch(i.tag){case 0:case 11:case 15:var a=i.return;try{Qa(4,i)}catch(W){Ht(i,a,W)}break;case 1:var c=i.stateNode;if(typeof c.componentDidMount=="function"){var h=i.return;try{c.componentDidMount()}catch(W){Ht(i,h,W)}}var v=i.return;try{hu(i)}catch(W){Ht(i,v,W)}break;case 5:var T=i.return;try{hu(i)}catch(W){Ht(i,T,W)}}}catch(W){Ht(i,i.return,W)}if(i===n){He=null;break}var F=i.sibling;if(F!==null){F.return=i.return,He=F;break}He=i.return}}var Tv=Math.ceil,Ja=b.ReactCurrentDispatcher,gu=b.ReactCurrentOwner,Jn=b.ReactCurrentBatchConfig,xt=0,tn=null,Wt=null,an=0,Vn=0,Rs=rr(0),$t=0,ko=null,Hr=0,el=0,vu=0,Bo=null,Pn=null,_u=0,bs=1/0,Fi=null,tl=!1,xu=null,ur=null,nl=!1,dr=null,il=0,zo=0,yu=null,rl=-1,sl=0;function Mn(){return(xt&6)!==0?ze():rl!==-1?rl:rl=ze()}function fr(n){return(n.mode&1)===0?1:(xt&2)!==0&&an!==0?an&-an:av.transition!==null?(sl===0&&(sl=pa()),sl):(n=At,n!==0||(n=window.event,n=n===void 0?16:tf(n.type)),n)}function di(n,i,a,c){if(50<zo)throw zo=0,yu=null,Error(t(185));co(n,a,c),((xt&2)===0||n!==tn)&&(n===tn&&((xt&2)===0&&(el|=a),$t===4&&hr(n,an)),Dn(n,c),a===1&&xt===0&&(i.mode&1)===0&&(bs=ze()+500,Ia&&or()))}function Dn(n,i){var a=n.callbackNode;Cn(n,i);var c=qn(n,n===tn?an:0);if(c===0)a!==null&&Ue(a),n.callbackNode=null,n.callbackPriority=0;else if(i=c&-c,n.callbackPriority!==i){if(a!=null&&Ue(a),i===1)n.tag===0?ov(np.bind(null,n)):Hf(np.bind(null,n)),nv(function(){(xt&6)===0&&or()}),a=null;else{switch(Yd(c)){case 1:a=st;break;case 4:a=at;break;case 16:a=bt;break;case 536870912:a=Gt;break;default:a=bt}a=up(a,tp.bind(null,n))}n.callbackPriority=i,n.callbackNode=a}}function tp(n,i){if(rl=-1,sl=0,(xt&6)!==0)throw Error(t(327));var a=n.callbackNode;if(Ls()&&n.callbackNode!==a)return null;var c=qn(n,n===tn?an:0);if(c===0)return null;if((c&30)!==0||(c&n.expiredLanes)!==0||i)i=ol(n,c);else{i=c;var h=xt;xt|=2;var v=rp();(tn!==n||an!==i)&&(Fi=null,bs=ze()+500,Vr(n,i));do try{Cv();break}catch(F){ip(n,F)}while(!0);kc(),Ja.current=v,xt=h,Wt!==null?i=0:(tn=null,an=0,i=$t)}if(i!==0){if(i===2&&(h=Ir(n),h!==0&&(c=h,i=Su(n,h))),i===1)throw a=ko,Vr(n,0),hr(n,c),Dn(n,ze()),a;if(i===6)hr(n,c);else{if(h=n.current.alternate,(c&30)===0&&!wv(h)&&(i=ol(n,c),i===2&&(v=Ir(n),v!==0&&(c=v,i=Su(n,v))),i===1))throw a=ko,Vr(n,0),hr(n,c),Dn(n,ze()),a;switch(n.finishedWork=h,n.finishedLanes=c,i){case 0:case 1:throw Error(t(345));case 2:Wr(n,Pn,Fi);break;case 3:if(hr(n,c),(c&130023424)===c&&(i=_u+500-ze(),10<i)){if(qn(n,0)!==0)break;if(h=n.suspendedLanes,(h&c)!==c){Mn(),n.pingedLanes|=n.suspendedLanes&h;break}n.timeoutHandle=Cc(Wr.bind(null,n,Pn,Fi),i);break}Wr(n,Pn,Fi);break;case 4:if(hr(n,c),(c&4194240)===c)break;for(i=n.eventTimes,h=-1;0<c;){var T=31-yn(c);v=1<<T,T=i[T],T>h&&(h=T),c&=~v}if(c=h,c=ze()-c,c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3e3>c?3e3:4320>c?4320:1960*Tv(c/1960))-c,10<c){n.timeoutHandle=Cc(Wr.bind(null,n,Pn,Fi),c);break}Wr(n,Pn,Fi);break;case 5:Wr(n,Pn,Fi);break;default:throw Error(t(329))}}}return Dn(n,ze()),n.callbackNode===a?tp.bind(null,n):null}function Su(n,i){var a=Bo;return n.current.memoizedState.isDehydrated&&(Vr(n,i).flags|=256),n=ol(n,i),n!==2&&(i=Pn,Pn=a,i!==null&&Mu(i)),n}function Mu(n){Pn===null?Pn=n:Pn.push.apply(Pn,n)}function wv(n){for(var i=n;;){if(i.flags&16384){var a=i.updateQueue;if(a!==null&&(a=a.stores,a!==null))for(var c=0;c<a.length;c++){var h=a[c],v=h.getSnapshot;h=h.value;try{if(!oi(v(),h))return!1}catch{return!1}}}if(a=i.child,i.subtreeFlags&16384&&a!==null)a.return=i,i=a;else{if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function hr(n,i){for(i&=~vu,i&=~el,n.suspendedLanes|=i,n.pingedLanes&=~i,n=n.expirationTimes;0<i;){var a=31-yn(i),c=1<<a;n[a]=-1,i&=~c}}function np(n){if((xt&6)!==0)throw Error(t(327));Ls();var i=qn(n,0);if((i&1)===0)return Dn(n,ze()),null;var a=ol(n,i);if(n.tag!==0&&a===2){var c=Ir(n);c!==0&&(i=c,a=Su(n,c))}if(a===1)throw a=ko,Vr(n,0),hr(n,i),Dn(n,ze()),a;if(a===6)throw Error(t(345));return n.finishedWork=n.current.alternate,n.finishedLanes=i,Wr(n,Pn,Fi),Dn(n,ze()),null}function Eu(n,i){var a=xt;xt|=1;try{return n(i)}finally{xt=a,xt===0&&(bs=ze()+500,Ia&&or())}}function Gr(n){dr!==null&&dr.tag===0&&(xt&6)===0&&Ls();var i=xt;xt|=1;var a=Jn.transition,c=At;try{if(Jn.transition=null,At=1,n)return n()}finally{At=c,Jn.transition=a,xt=i,(xt&6)===0&&or()}}function Tu(){Vn=Rs.current,Dt(Rs)}function Vr(n,i){n.finishedWork=null,n.finishedLanes=0;var a=n.timeoutHandle;if(a!==-1&&(n.timeoutHandle=-1,tv(a)),Wt!==null)for(a=Wt.return;a!==null;){var c=a;switch(Ic(c),c.tag){case 1:c=c.type.childContextTypes,c!=null&&Pa();break;case 3:ws(),Dt(Rn),Dt(fn),Xc();break;case 5:Wc(c);break;case 4:ws();break;case 13:Dt(Ft);break;case 19:Dt(Ft);break;case 10:Bc(c.type._context);break;case 22:case 23:Tu()}a=a.return}if(tn=n,Wt=n=pr(n.current,null),an=Vn=i,$t=0,ko=null,vu=el=Hr=0,Pn=Bo=null,kr!==null){for(i=0;i<kr.length;i++)if(a=kr[i],c=a.interleaved,c!==null){a.interleaved=null;var h=c.next,v=a.pending;if(v!==null){var T=v.next;v.next=h,c.next=T}a.pending=c}kr=null}return n}function ip(n,i){do{var a=Wt;try{if(kc(),Va.current=Ya,Wa){for(var c=kt.memoizedState;c!==null;){var h=c.queue;h!==null&&(h.pending=null),c=c.next}Wa=!1}if(zr=0,en=qt=kt=null,Do=!1,Io=0,gu.current=null,a===null||a.return===null){$t=1,ko=i,Wt=null;break}e:{var v=n,T=a.return,F=a,W=i;if(i=an,F.flags|=32768,W!==null&&typeof W=="object"&&typeof W.then=="function"){var se=W,Ee=F,we=Ee.tag;if((Ee.mode&1)===0&&(we===0||we===11||we===15)){var Me=Ee.alternate;Me?(Ee.updateQueue=Me.updateQueue,Ee.memoizedState=Me.memoizedState,Ee.lanes=Me.lanes):(Ee.updateQueue=null,Ee.memoizedState=null)}var Oe=Rh(T);if(Oe!==null){Oe.flags&=-257,bh(Oe,T,F,v,i),Oe.mode&1&&Ch(v,se,i),i=Oe,W=se;var Ve=i.updateQueue;if(Ve===null){var We=new Set;We.add(W),i.updateQueue=We}else Ve.add(W);break e}else{if((i&1)===0){Ch(v,se,i),wu();break e}W=Error(t(426))}}else if(Ut&&F.mode&1){var Vt=Rh(T);if(Vt!==null){(Vt.flags&65536)===0&&(Vt.flags|=256),bh(Vt,T,F,v,i),Oc(As(W,F));break e}}v=W=As(W,F),$t!==4&&($t=2),Bo===null?Bo=[v]:Bo.push(v),v=T;do{switch(v.tag){case 3:v.flags|=65536,i&=-i,v.lanes|=i;var J=wh(v,W,i);Qf(v,J);break e;case 1:F=W;var $=v.type,re=v.stateNode;if((v.flags&128)===0&&(typeof $.getDerivedStateFromError=="function"||re!==null&&typeof re.componentDidCatch=="function"&&(ur===null||!ur.has(re)))){v.flags|=65536,i&=-i,v.lanes|=i;var Ae=Ah(v,F,i);Qf(v,Ae);break e}}v=v.return}while(v!==null)}op(a)}catch(je){i=je,Wt===a&&a!==null&&(Wt=a=a.return);continue}break}while(!0)}function rp(){var n=Ja.current;return Ja.current=Ya,n===null?Ya:n}function wu(){($t===0||$t===3||$t===2)&&($t=4),tn===null||(Hr&268435455)===0&&(el&268435455)===0||hr(tn,an)}function ol(n,i){var a=xt;xt|=2;var c=rp();(tn!==n||an!==i)&&(Fi=null,Vr(n,i));do try{Av();break}catch(h){ip(n,h)}while(!0);if(kc(),xt=a,Ja.current=c,Wt!==null)throw Error(t(261));return tn=null,an=0,$t}function Av(){for(;Wt!==null;)sp(Wt)}function Cv(){for(;Wt!==null&&!Ye();)sp(Wt)}function sp(n){var i=cp(n.alternate,n,Vn);n.memoizedProps=n.pendingProps,i===null?op(n):Wt=i,gu.current=null}function op(n){var i=n;do{var a=i.alternate;if(n=i.return,(i.flags&32768)===0){if(a=xv(a,i,Vn),a!==null){Wt=a;return}}else{if(a=yv(a,i),a!==null){a.flags&=32767,Wt=a;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{$t=6,Wt=null;return}}if(i=i.sibling,i!==null){Wt=i;return}Wt=i=n}while(i!==null);$t===0&&($t=5)}function Wr(n,i,a){var c=At,h=Jn.transition;try{Jn.transition=null,At=1,Rv(n,i,a,c)}finally{Jn.transition=h,At=c}return null}function Rv(n,i,a,c){do Ls();while(dr!==null);if((xt&6)!==0)throw Error(t(327));a=n.finishedWork;var h=n.finishedLanes;if(a===null)return null;if(n.finishedWork=null,n.finishedLanes=0,a===n.current)throw Error(t(177));n.callbackNode=null,n.callbackPriority=0;var v=a.lanes|a.childLanes;if(l0(n,v),n===tn&&(Wt=tn=null,an=0),(a.subtreeFlags&2064)===0&&(a.flags&2064)===0||nl||(nl=!0,up(bt,function(){return Ls(),null})),v=(a.flags&15990)!==0,(a.subtreeFlags&15990)!==0||v){v=Jn.transition,Jn.transition=null;var T=At;At=1;var F=xt;xt|=4,gu.current=null,Mv(n,a),Kh(a,n),q0(wc),va=!!Tc,wc=Tc=null,n.current=a,Ev(a),et(),xt=F,At=T,Jn.transition=v}else n.current=a;if(nl&&(nl=!1,dr=n,il=h),v=n.pendingLanes,v===0&&(ur=null),dt(a.stateNode),Dn(n,ze()),i!==null)for(c=n.onRecoverableError,a=0;a<i.length;a++)h=i[a],c(h.value,{componentStack:h.stack,digest:h.digest});if(tl)throw tl=!1,n=xu,xu=null,n;return(il&1)!==0&&n.tag!==0&&Ls(),v=n.pendingLanes,(v&1)!==0?n===yu?zo++:(zo=0,yu=n):zo=0,or(),null}function Ls(){if(dr!==null){var n=Yd(il),i=Jn.transition,a=At;try{if(Jn.transition=null,At=16>n?16:n,dr===null)var c=!1;else{if(n=dr,dr=null,il=0,(xt&6)!==0)throw Error(t(331));var h=xt;for(xt|=4,He=n.current;He!==null;){var v=He,T=v.child;if((He.flags&16)!==0){var F=v.deletions;if(F!==null){for(var W=0;W<F.length;W++){var se=F[W];for(He=se;He!==null;){var Ee=He;switch(Ee.tag){case 0:case 11:case 15:Fo(8,Ee,v)}var we=Ee.child;if(we!==null)we.return=Ee,He=we;else for(;He!==null;){Ee=He;var Me=Ee.sibling,Oe=Ee.return;if(jh(Ee),Ee===se){He=null;break}if(Me!==null){Me.return=Oe,He=Me;break}He=Oe}}}var Ve=v.alternate;if(Ve!==null){var We=Ve.child;if(We!==null){Ve.child=null;do{var Vt=We.sibling;We.sibling=null,We=Vt}while(We!==null)}}He=v}}if((v.subtreeFlags&2064)!==0&&T!==null)T.return=v,He=T;else e:for(;He!==null;){if(v=He,(v.flags&2048)!==0)switch(v.tag){case 0:case 11:case 15:Fo(9,v,v.return)}var J=v.sibling;if(J!==null){J.return=v.return,He=J;break e}He=v.return}}var $=n.current;for(He=$;He!==null;){T=He;var re=T.child;if((T.subtreeFlags&2064)!==0&&re!==null)re.return=T,He=re;else e:for(T=$;He!==null;){if(F=He,(F.flags&2048)!==0)try{switch(F.tag){case 0:case 11:case 15:Qa(9,F)}}catch(je){Ht(F,F.return,je)}if(F===T){He=null;break e}var Ae=F.sibling;if(Ae!==null){Ae.return=F.return,He=Ae;break e}He=F.return}}if(xt=h,or(),vt&&typeof vt.onPostCommitFiberRoot=="function")try{vt.onPostCommitFiberRoot(An,n)}catch{}c=!0}return c}finally{At=a,Jn.transition=i}}return!1}function ap(n,i,a){i=As(a,i),i=wh(n,i,1),n=lr(n,i,1),i=Mn(),n!==null&&(co(n,1,i),Dn(n,i))}function Ht(n,i,a){if(n.tag===3)ap(n,n,a);else for(;i!==null;){if(i.tag===3){ap(i,n,a);break}else if(i.tag===1){var c=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof c.componentDidCatch=="function"&&(ur===null||!ur.has(c))){n=As(a,n),n=Ah(i,n,1),i=lr(i,n,1),n=Mn(),i!==null&&(co(i,1,n),Dn(i,n));break}}i=i.return}}function bv(n,i,a){var c=n.pingCache;c!==null&&c.delete(i),i=Mn(),n.pingedLanes|=n.suspendedLanes&a,tn===n&&(an&a)===a&&($t===4||$t===3&&(an&130023424)===an&&500>ze()-_u?Vr(n,0):vu|=a),Dn(n,i)}function lp(n,i){i===0&&((n.mode&1)===0?i=1:(i=Ki,Ki<<=1,(Ki&130023424)===0&&(Ki=4194304)));var a=Mn();n=Ni(n,i),n!==null&&(co(n,i,a),Dn(n,a))}function Lv(n){var i=n.memoizedState,a=0;i!==null&&(a=i.retryLane),lp(n,a)}function Pv(n,i){var a=0;switch(n.tag){case 13:var c=n.stateNode,h=n.memoizedState;h!==null&&(a=h.retryLane);break;case 19:c=n.stateNode;break;default:throw Error(t(314))}c!==null&&c.delete(i),lp(n,a)}var cp;cp=function(n,i,a){if(n!==null)if(n.memoizedProps!==i.pendingProps||Rn.current)Ln=!0;else{if((n.lanes&a)===0&&(i.flags&128)===0)return Ln=!1,_v(n,i,a);Ln=(n.flags&131072)!==0}else Ln=!1,Ut&&(i.flags&1048576)!==0&&Gf(i,Ua,i.index);switch(i.lanes=0,i.tag){case 2:var c=i.type;Ka(n,i),n=i.pendingProps;var h=_s(i,fn.current);Ts(i,a),h=$c(null,i,c,n,h,a);var v=Kc();return i.flags|=1,typeof h=="object"&&h!==null&&typeof h.render=="function"&&h.$$typeof===void 0?(i.tag=1,i.memoizedState=null,i.updateQueue=null,bn(c)?(v=!0,Da(i)):v=!1,i.memoizedState=h.state!==null&&h.state!==void 0?h.state:null,Gc(i),h.updater=qa,i.stateNode=h,h._reactInternals=i,nu(i,c,n,a),i=ou(null,i,c,!0,v,a)):(i.tag=0,Ut&&v&&Dc(i),Sn(null,i,h,a),i=i.child),i;case 16:c=i.elementType;e:{switch(Ka(n,i),n=i.pendingProps,h=c._init,c=h(c._payload),i.type=c,h=i.tag=Iv(c),n=li(c,n),h){case 0:i=su(null,i,c,n,a);break e;case 1:i=Uh(null,i,c,n,a);break e;case 11:i=Lh(null,i,c,n,a);break e;case 14:i=Ph(null,i,c,li(c.type,n),a);break e}throw Error(t(306,c,""))}return i;case 0:return c=i.type,h=i.pendingProps,h=i.elementType===c?h:li(c,h),su(n,i,c,h,a);case 1:return c=i.type,h=i.pendingProps,h=i.elementType===c?h:li(c,h),Uh(n,i,c,h,a);case 3:e:{if(Oh(i),n===null)throw Error(t(387));c=i.pendingProps,v=i.memoizedState,h=v.element,Zf(n,i),Ha(i,c,null,a);var T=i.memoizedState;if(c=T.element,v.isDehydrated)if(v={element:c,isDehydrated:!1,cache:T.cache,pendingSuspenseBoundaries:T.pendingSuspenseBoundaries,transitions:T.transitions},i.updateQueue.baseState=v,i.memoizedState=v,i.flags&256){h=As(Error(t(423)),i),i=Fh(n,i,c,a,h);break e}else if(c!==h){h=As(Error(t(424)),i),i=Fh(n,i,c,a,h);break e}else for(Gn=ir(i.stateNode.containerInfo.firstChild),Hn=i,Ut=!0,ai=null,a=$f(i,null,c,a),i.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(Ss(),c===h){i=Oi(n,i,a);break e}Sn(n,i,c,a)}i=i.child}return i;case 5:return eh(i),n===null&&Uc(i),c=i.type,h=i.pendingProps,v=n!==null?n.memoizedProps:null,T=h.children,Ac(c,h)?T=null:v!==null&&Ac(c,v)&&(i.flags|=32),Nh(n,i),Sn(n,i,T,a),i.child;case 6:return n===null&&Uc(i),null;case 13:return kh(n,i,a);case 4:return Vc(i,i.stateNode.containerInfo),c=i.pendingProps,n===null?i.child=Ms(i,null,c,a):Sn(n,i,c,a),i.child;case 11:return c=i.type,h=i.pendingProps,h=i.elementType===c?h:li(c,h),Lh(n,i,c,h,a);case 7:return Sn(n,i,i.pendingProps,a),i.child;case 8:return Sn(n,i,i.pendingProps.children,a),i.child;case 12:return Sn(n,i,i.pendingProps.children,a),i.child;case 10:e:{if(c=i.type._context,h=i.pendingProps,v=i.memoizedProps,T=h.value,Lt(ka,c._currentValue),c._currentValue=T,v!==null)if(oi(v.value,T)){if(v.children===h.children&&!Rn.current){i=Oi(n,i,a);break e}}else for(v=i.child,v!==null&&(v.return=i);v!==null;){var F=v.dependencies;if(F!==null){T=v.child;for(var W=F.firstContext;W!==null;){if(W.context===c){if(v.tag===1){W=Ui(-1,a&-a),W.tag=2;var se=v.updateQueue;if(se!==null){se=se.shared;var Ee=se.pending;Ee===null?W.next=W:(W.next=Ee.next,Ee.next=W),se.pending=W}}v.lanes|=a,W=v.alternate,W!==null&&(W.lanes|=a),zc(v.return,a,i),F.lanes|=a;break}W=W.next}}else if(v.tag===10)T=v.type===i.type?null:v.child;else if(v.tag===18){if(T=v.return,T===null)throw Error(t(341));T.lanes|=a,F=T.alternate,F!==null&&(F.lanes|=a),zc(T,a,i),T=v.sibling}else T=v.child;if(T!==null)T.return=v;else for(T=v;T!==null;){if(T===i){T=null;break}if(v=T.sibling,v!==null){v.return=T.return,T=v;break}T=T.return}v=T}Sn(n,i,h.children,a),i=i.child}return i;case 9:return h=i.type,c=i.pendingProps.children,Ts(i,a),h=Zn(h),c=c(h),i.flags|=1,Sn(n,i,c,a),i.child;case 14:return c=i.type,h=li(c,i.pendingProps),h=li(c.type,h),Ph(n,i,c,h,a);case 15:return Dh(n,i,i.type,i.pendingProps,a);case 17:return c=i.type,h=i.pendingProps,h=i.elementType===c?h:li(c,h),Ka(n,i),i.tag=1,bn(c)?(n=!0,Da(i)):n=!1,Ts(i,a),Eh(i,c,h),nu(i,c,h,a),ou(null,i,c,!0,n,a);case 19:return zh(n,i,a);case 22:return Ih(n,i,a)}throw Error(t(156,i.tag))};function up(n,i){return oe(n,i)}function Dv(n,i,a,c){this.tag=n,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=c,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ei(n,i,a,c){return new Dv(n,i,a,c)}function Au(n){return n=n.prototype,!(!n||!n.isReactComponent)}function Iv(n){if(typeof n=="function")return Au(n)?1:0;if(n!=null){if(n=n.$$typeof,n===ie)return 11;if(n===H)return 14}return 2}function pr(n,i){var a=n.alternate;return a===null?(a=ei(n.tag,i,n.key,n.mode),a.elementType=n.elementType,a.type=n.type,a.stateNode=n.stateNode,a.alternate=n,n.alternate=a):(a.pendingProps=i,a.type=n.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=n.flags&14680064,a.childLanes=n.childLanes,a.lanes=n.lanes,a.child=n.child,a.memoizedProps=n.memoizedProps,a.memoizedState=n.memoizedState,a.updateQueue=n.updateQueue,i=n.dependencies,a.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},a.sibling=n.sibling,a.index=n.index,a.ref=n.ref,a}function al(n,i,a,c,h,v){var T=2;if(c=n,typeof n=="function")Au(n)&&(T=1);else if(typeof n=="string")T=5;else e:switch(n){case U:return jr(a.children,h,v,i);case he:T=8,h|=8;break;case C:return n=ei(12,a,i,h|2),n.elementType=C,n.lanes=v,n;case ae:return n=ei(13,a,i,h),n.elementType=ae,n.lanes=v,n;case k:return n=ei(19,a,i,h),n.elementType=k,n.lanes=v,n;case K:return ll(a,h,v,i);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case D:T=10;break e;case te:T=9;break e;case ie:T=11;break e;case H:T=14;break e;case q:T=16,c=null;break e}throw Error(t(130,n==null?n:typeof n,""))}return i=ei(T,a,i,h),i.elementType=n,i.type=c,i.lanes=v,i}function jr(n,i,a,c){return n=ei(7,n,c,i),n.lanes=a,n}function ll(n,i,a,c){return n=ei(22,n,c,i),n.elementType=K,n.lanes=a,n.stateNode={isHidden:!1},n}function Cu(n,i,a){return n=ei(6,n,null,i),n.lanes=a,n}function Ru(n,i,a){return i=ei(4,n.children!==null?n.children:[],n.key,i),i.lanes=a,i.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},i}function Nv(n,i,a,c,h){this.tag=i,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ls(0),this.expirationTimes=ls(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ls(0),this.identifierPrefix=c,this.onRecoverableError=h,this.mutableSourceEagerHydrationData=null}function bu(n,i,a,c,h,v,T,F,W){return n=new Nv(n,i,a,F,W),i===1?(i=1,v===!0&&(i|=8)):i=0,v=ei(3,null,null,i),n.current=v,v.stateNode=n,v.memoizedState={element:c,isDehydrated:a,cache:null,transitions:null,pendingSuspenseBoundaries:null},Gc(v),n}function Uv(n,i,a){var c=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:B,key:c==null?null:""+c,children:n,containerInfo:i,implementation:a}}function dp(n){if(!n)return sr;n=n._reactInternals;e:{if(Ri(n)!==n||n.tag!==1)throw Error(t(170));var i=n;do{switch(i.tag){case 3:i=i.stateNode.context;break e;case 1:if(bn(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break e}}i=i.return}while(i!==null);throw Error(t(171))}if(n.tag===1){var a=n.type;if(bn(a))return Bf(n,a,i)}return i}function fp(n,i,a,c,h,v,T,F,W){return n=bu(a,c,!0,n,h,v,T,F,W),n.context=dp(null),a=n.current,c=Mn(),h=fr(a),v=Ui(c,h),v.callback=i??null,lr(a,v,h),n.current.lanes=h,co(n,h,c),Dn(n,c),n}function cl(n,i,a,c){var h=i.current,v=Mn(),T=fr(h);return a=dp(a),i.context===null?i.context=a:i.pendingContext=a,i=Ui(v,T),i.payload={element:n},c=c===void 0?null:c,c!==null&&(i.callback=c),n=lr(h,i,T),n!==null&&(di(n,h,T,v),za(n,h,T)),T}function ul(n){return n=n.current,n.child?(n.child.tag===5,n.child.stateNode):null}function hp(n,i){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var a=n.retryLane;n.retryLane=a!==0&&a<i?a:i}}function Lu(n,i){hp(n,i),(n=n.alternate)&&hp(n,i)}function Ov(){return null}var pp=typeof reportError=="function"?reportError:function(n){console.error(n)};function Pu(n){this._internalRoot=n}dl.prototype.render=Pu.prototype.render=function(n){var i=this._internalRoot;if(i===null)throw Error(t(409));cl(n,i,null,null)},dl.prototype.unmount=Pu.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var i=n.containerInfo;Gr(function(){cl(null,n,null,null)}),i[Li]=null}};function dl(n){this._internalRoot=n}dl.prototype.unstable_scheduleHydration=function(n){if(n){var i=Kd();n={blockedOn:null,target:n,priority:i};for(var a=0;a<er.length&&i!==0&&i<er[a].priority;a++);er.splice(a,0,n),a===0&&Jd(n)}};function Du(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function fl(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function mp(){}function Fv(n,i,a,c,h){if(h){if(typeof c=="function"){var v=c;c=function(){var se=ul(T);v.call(se)}}var T=fp(i,c,n,0,null,!1,!1,"",mp);return n._reactRootContainer=T,n[Li]=T.current,To(n.nodeType===8?n.parentNode:n),Gr(),T}for(;h=n.lastChild;)n.removeChild(h);if(typeof c=="function"){var F=c;c=function(){var se=ul(W);F.call(se)}}var W=bu(n,0,!1,null,null,!1,!1,"",mp);return n._reactRootContainer=W,n[Li]=W.current,To(n.nodeType===8?n.parentNode:n),Gr(function(){cl(i,W,a,c)}),W}function hl(n,i,a,c,h){var v=a._reactRootContainer;if(v){var T=v;if(typeof h=="function"){var F=h;h=function(){var W=ul(T);F.call(W)}}cl(i,T,n,h)}else T=Fv(a,i,n,h,c);return ul(T)}qd=function(n){switch(n.tag){case 3:var i=n.stateNode;if(i.current.memoizedState.isDehydrated){var a=zt(i.pendingLanes);a!==0&&(nc(i,a|1),Dn(i,ze()),(xt&6)===0&&(bs=ze()+500,or()))}break;case 13:Gr(function(){var c=Ni(n,1);if(c!==null){var h=Mn();di(c,n,1,h)}}),Lu(n,1)}},ic=function(n){if(n.tag===13){var i=Ni(n,134217728);if(i!==null){var a=Mn();di(i,n,134217728,a)}Lu(n,134217728)}},$d=function(n){if(n.tag===13){var i=fr(n),a=Ni(n,i);if(a!==null){var c=Mn();di(a,n,i,c)}Lu(n,i)}},Kd=function(){return At},Zd=function(n,i){var a=At;try{return At=n,i()}finally{At=a}},Ce=function(n,i,a){switch(i){case"input":if($e(n,a),i=a.name,a.type==="radio"&&i!=null){for(a=n;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),i=0;i<a.length;i++){var c=a[i];if(c!==n&&c.form===n.form){var h=La(c);if(!h)throw Error(t(90));Z(c),$e(c,h)}}}break;case"textarea":_e(n,a);break;case"select":i=a.value,i!=null&&ne(n,!!a.multiple,i,!1)}},Tt=Eu,wt=Gr;var kv={usingClientEntryPoint:!1,Events:[Co,gs,La,nt,Ze,Eu]},Ho={findFiberByHostInstance:Nr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Bv={bundleType:Ho.bundleType,version:Ho.version,rendererPackageName:Ho.rendererPackageName,rendererConfig:Ho.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:b.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=le(n),n===null?null:n.stateNode},findFiberByHostInstance:Ho.findFiberByHostInstance||Ov,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var pl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!pl.isDisabled&&pl.supportsFiber)try{An=pl.inject(Bv),vt=pl}catch{}}return In.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=kv,In.createPortal=function(n,i){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Du(i))throw Error(t(200));return Uv(n,i,null,a)},In.createRoot=function(n,i){if(!Du(n))throw Error(t(299));var a=!1,c="",h=pp;return i!=null&&(i.unstable_strictMode===!0&&(a=!0),i.identifierPrefix!==void 0&&(c=i.identifierPrefix),i.onRecoverableError!==void 0&&(h=i.onRecoverableError)),i=bu(n,1,!1,null,null,a,!1,c,h),n[Li]=i.current,To(n.nodeType===8?n.parentNode:n),new Pu(i)},In.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var i=n._reactInternals;if(i===void 0)throw typeof n.render=="function"?Error(t(188)):(n=Object.keys(n).join(","),Error(t(268,n)));return n=le(i),n=n===null?null:n.stateNode,n},In.flushSync=function(n){return Gr(n)},In.hydrate=function(n,i,a){if(!fl(i))throw Error(t(200));return hl(null,n,i,!0,a)},In.hydrateRoot=function(n,i,a){if(!Du(n))throw Error(t(405));var c=a!=null&&a.hydratedSources||null,h=!1,v="",T=pp;if(a!=null&&(a.unstable_strictMode===!0&&(h=!0),a.identifierPrefix!==void 0&&(v=a.identifierPrefix),a.onRecoverableError!==void 0&&(T=a.onRecoverableError)),i=fp(i,null,n,1,a??null,h,!1,v,T),n[Li]=i.current,To(n),c)for(n=0;n<c.length;n++)a=c[n],h=a._getVersion,h=h(a._source),i.mutableSourceEagerHydrationData==null?i.mutableSourceEagerHydrationData=[a,h]:i.mutableSourceEagerHydrationData.push(a,h);return new dl(i)},In.render=function(n,i,a){if(!fl(i))throw Error(t(200));return hl(null,n,i,!1,a)},In.unmountComponentAtNode=function(n){if(!fl(n))throw Error(t(40));return n._reactRootContainer?(Gr(function(){hl(null,null,n,!1,function(){n._reactRootContainer=null,n[Li]=null})}),!0):!1},In.unstable_batchedUpdates=Eu,In.unstable_renderSubtreeIntoContainer=function(n,i,a,c){if(!fl(a))throw Error(t(200));if(n==null||n._reactInternals===void 0)throw Error(t(38));return hl(n,i,a,!1,c)},In.version="18.3.1-next-f1338f8080-20240426",In}var Ep;function dg(){if(Ep)return Uu.exports;Ep=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),Uu.exports=qv(),Uu.exports}var Tp;function $v(){if(Tp)return ml;Tp=1;var r=dg();return ml.createRoot=r.createRoot,ml.hydrateRoot=r.hydrateRoot,ml}var Kv=$v();const Zv=cg(Kv);dg();function Ko(){return Ko=Object.assign?Object.assign.bind():function(r){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(r[s]=t[s])}return r},Ko.apply(this,arguments)}var Mr;(function(r){r.Pop="POP",r.Push="PUSH",r.Replace="REPLACE"})(Mr||(Mr={}));const wp="popstate";function Qv(r){r===void 0&&(r={});function e(s,o){let{pathname:l,search:u,hash:d}=s.location;return Md("",{pathname:l,search:u,hash:d},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function t(s,o){return typeof o=="string"?o:fg(o)}return e_(e,t,null,r)}function Xt(r,e){if(r===!1||r===null||typeof r>"u")throw new Error(e)}function Ud(r,e){if(!r){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function Jv(){return Math.random().toString(36).substr(2,8)}function Ap(r,e){return{usr:r.state,key:r.key,idx:e}}function Md(r,e,t,s){return t===void 0&&(t=null),Ko({pathname:typeof r=="string"?r:r.pathname,search:"",hash:""},typeof e=="string"?ro(e):e,{state:t,key:e&&e.key||s||Jv()})}function fg(r){let{pathname:e="/",search:t="",hash:s=""}=r;return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),s&&s!=="#"&&(e+=s.charAt(0)==="#"?s:"#"+s),e}function ro(r){let e={};if(r){let t=r.indexOf("#");t>=0&&(e.hash=r.substr(t),r=r.substr(0,t));let s=r.indexOf("?");s>=0&&(e.search=r.substr(s),r=r.substr(0,s)),r&&(e.pathname=r)}return e}function e_(r,e,t,s){s===void 0&&(s={});let{window:o=document.defaultView,v5Compat:l=!1}=s,u=o.history,d=Mr.Pop,f=null,p=g();p==null&&(p=0,u.replaceState(Ko({},u.state,{idx:p}),""));function g(){return(u.state||{idx:null}).idx}function m(){d=Mr.Pop;let x=g(),y=x==null?null:x-p;p=x,f&&f({action:d,location:M.location,delta:y})}function _(x,y){d=Mr.Push;let w=Md(M.location,x,y);p=g()+1;let R=Ap(w,p),b=M.createHref(w);try{u.pushState(R,"",b)}catch(G){if(G instanceof DOMException&&G.name==="DataCloneError")throw G;o.location.assign(b)}l&&f&&f({action:d,location:M.location,delta:1})}function S(x,y){d=Mr.Replace;let w=Md(M.location,x,y);p=g();let R=Ap(w,p),b=M.createHref(w);u.replaceState(R,"",b),l&&f&&f({action:d,location:M.location,delta:0})}function E(x){let y=o.location.origin!=="null"?o.location.origin:o.location.href,w=typeof x=="string"?x:fg(x);return w=w.replace(/ $/,"%20"),Xt(y,"No window.location.(origin|href) available to create URL for href: "+w),new URL(w,y)}let M={get action(){return d},get location(){return r(o,u)},listen(x){if(f)throw new Error("A history only accepts one active listener");return o.addEventListener(wp,m),f=x,()=>{o.removeEventListener(wp,m),f=null}},createHref(x){return e(o,x)},createURL:E,encodeLocation(x){let y=E(x);return{pathname:y.pathname,search:y.search,hash:y.hash}},push:_,replace:S,go(x){return u.go(x)}};return M}var Cp;(function(r){r.data="data",r.deferred="deferred",r.redirect="redirect",r.error="error"})(Cp||(Cp={}));function t_(r,e,t){return t===void 0&&(t="/"),n_(r,e,t)}function n_(r,e,t,s){let o=typeof e=="string"?ro(e):e,l=mg(o.pathname||"/",t);if(l==null)return null;let u=hg(r);i_(u);let d=null;for(let f=0;d==null&&f<u.length;++f){let p=m_(l);d=f_(u[f],p)}return d}function hg(r,e,t,s){e===void 0&&(e=[]),t===void 0&&(t=[]),s===void 0&&(s="");let o=(l,u,d)=>{let f={relativePath:d===void 0?l.path||"":d,caseSensitive:l.caseSensitive===!0,childrenIndex:u,route:l};f.relativePath.startsWith("/")&&(Xt(f.relativePath.startsWith(s),'Absolute route path "'+f.relativePath+'" nested under path '+('"'+s+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),f.relativePath=f.relativePath.slice(s.length));let p=ts([s,f.relativePath]),g=t.concat(f);l.children&&l.children.length>0&&(Xt(l.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+p+'".')),hg(l.children,e,g,p)),!(l.path==null&&!l.index)&&e.push({path:p,score:u_(p,l.index),routesMeta:g})};return r.forEach((l,u)=>{var d;if(l.path===""||!((d=l.path)!=null&&d.includes("?")))o(l,u);else for(let f of pg(l.path))o(l,u,f)}),e}function pg(r){let e=r.split("/");if(e.length===0)return[];let[t,...s]=e,o=t.endsWith("?"),l=t.replace(/\?$/,"");if(s.length===0)return o?[l,""]:[l];let u=pg(s.join("/")),d=[];return d.push(...u.map(f=>f===""?l:[l,f].join("/"))),o&&d.push(...u),d.map(f=>r.startsWith("/")&&f===""?"/":f)}function i_(r){r.sort((e,t)=>e.score!==t.score?t.score-e.score:d_(e.routesMeta.map(s=>s.childrenIndex),t.routesMeta.map(s=>s.childrenIndex)))}const r_=/^:[\w-]+$/,s_=3,o_=2,a_=1,l_=10,c_=-2,Rp=r=>r==="*";function u_(r,e){let t=r.split("/"),s=t.length;return t.some(Rp)&&(s+=c_),e&&(s+=o_),t.filter(o=>!Rp(o)).reduce((o,l)=>o+(r_.test(l)?s_:l===""?a_:l_),s)}function d_(r,e){return r.length===e.length&&r.slice(0,-1).every((s,o)=>s===e[o])?r[r.length-1]-e[e.length-1]:0}function f_(r,e,t){let{routesMeta:s}=r,o={},l="/",u=[];for(let d=0;d<s.length;++d){let f=s[d],p=d===s.length-1,g=l==="/"?e:e.slice(l.length)||"/",m=h_({path:f.relativePath,caseSensitive:f.caseSensitive,end:p},g),_=f.route;if(!m)return null;Object.assign(o,m.params),u.push({params:o,pathname:ts([l,m.pathname]),pathnameBase:y_(ts([l,m.pathnameBase])),route:_}),m.pathnameBase!=="/"&&(l=ts([l,m.pathnameBase]))}return u}function h_(r,e){typeof r=="string"&&(r={path:r,caseSensitive:!1,end:!0});let[t,s]=p_(r.path,r.caseSensitive,r.end),o=e.match(t);if(!o)return null;let l=o[0],u=l.replace(/(.)\/+$/,"$1"),d=o.slice(1);return{params:s.reduce((p,g,m)=>{let{paramName:_,isOptional:S}=g;if(_==="*"){let M=d[m]||"";u=l.slice(0,l.length-M.length).replace(/(.)\/+$/,"$1")}const E=d[m];return S&&!E?p[_]=void 0:p[_]=(E||"").replace(/%2F/g,"/"),p},{}),pathname:l,pathnameBase:u,pattern:r}}function p_(r,e,t){e===void 0&&(e=!1),t===void 0&&(t=!0),Ud(r==="*"||!r.endsWith("*")||r.endsWith("/*"),'Route path "'+r+'" will be treated as if it were '+('"'+r.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+r.replace(/\*$/,"/*")+'".'));let s=[],o="^"+r.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(u,d,f)=>(s.push({paramName:d,isOptional:f!=null}),f?"/?([^\\/]+)?":"/([^\\/]+)"));return r.endsWith("*")?(s.push({paramName:"*"}),o+=r==="*"||r==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):t?o+="\\/*$":r!==""&&r!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,e?void 0:"i"),s]}function m_(r){try{return r.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return Ud(!1,'The URL path "'+r+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),r}}function mg(r,e){if(e==="/")return r;if(!r.toLowerCase().startsWith(e.toLowerCase()))return null;let t=e.endsWith("/")?e.length-1:e.length,s=r.charAt(t);return s&&s!=="/"?null:r.slice(t)||"/"}const g_=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,v_=r=>g_.test(r);function __(r,e){e===void 0&&(e="/");let{pathname:t,search:s="",hash:o=""}=typeof r=="string"?ro(r):r,l;if(t)if(v_(t))l=t;else{if(t.includes("//")){let u=t;t=t.replace(/\/\/+/g,"/"),Ud(!1,"Pathnames cannot have embedded double slashes - normalizing "+(u+" -> "+t))}t.startsWith("/")?l=bp(t.substring(1),"/"):l=bp(t,e)}else l=e;return{pathname:l,search:S_(s),hash:M_(o)}}function bp(r,e){let t=e.replace(/\/+$/,"").split("/");return r.split("/").forEach(o=>{o===".."?t.length>1&&t.pop():o!=="."&&t.push(o)}),t.length>1?t.join("/"):"/"}function ku(r,e,t,s){return"Cannot include a '"+r+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(s)+"].  Please separate it out to the ")+("`to."+t+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function x_(r){return r.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function gg(r,e){let t=x_(r);return e?t.map((s,o)=>o===t.length-1?s.pathname:s.pathnameBase):t.map(s=>s.pathnameBase)}function vg(r,e,t,s){s===void 0&&(s=!1);let o;typeof r=="string"?o=ro(r):(o=Ko({},r),Xt(!o.pathname||!o.pathname.includes("?"),ku("?","pathname","search",o)),Xt(!o.pathname||!o.pathname.includes("#"),ku("#","pathname","hash",o)),Xt(!o.search||!o.search.includes("#"),ku("#","search","hash",o)));let l=r===""||o.pathname==="",u=l?"/":o.pathname,d;if(u==null)d=t;else{let m=e.length-1;if(!s&&u.startsWith("..")){let _=u.split("/");for(;_[0]==="..";)_.shift(),m-=1;o.pathname=_.join("/")}d=m>=0?e[m]:"/"}let f=__(o,d),p=u&&u!=="/"&&u.endsWith("/"),g=(l||u===".")&&t.endsWith("/");return!f.pathname.endsWith("/")&&(p||g)&&(f.pathname+="/"),f}const ts=r=>r.join("/").replace(/\/\/+/g,"/"),y_=r=>r.replace(/\/+$/,"").replace(/^\/*/,"/"),S_=r=>!r||r==="?"?"":r.startsWith("?")?r:"?"+r,M_=r=>!r||r==="#"?"":r.startsWith("#")?r:"#"+r;function E_(r){return r!=null&&typeof r.status=="number"&&typeof r.statusText=="string"&&typeof r.internal=="boolean"&&"data"in r}const _g=["post","put","patch","delete"];new Set(_g);const T_=["get",..._g];new Set(T_);function Zo(){return Zo=Object.assign?Object.assign.bind():function(r){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(r[s]=t[s])}return r},Zo.apply(this,arguments)}const Od=ve.createContext(null),w_=ve.createContext(null),ta=ve.createContext(null),$l=ve.createContext(null),br=ve.createContext({outlet:null,matches:[],isDataRoute:!1}),xg=ve.createContext(null);function na(){return ve.useContext($l)!=null}function Fd(){return na()||Xt(!1),ve.useContext($l).location}function yg(r){ve.useContext(ta).static||ve.useLayoutEffect(r)}function ia(){let{isDataRoute:r}=ve.useContext(br);return r?k_():A_()}function A_(){na()||Xt(!1);let r=ve.useContext(Od),{basename:e,future:t,navigator:s}=ve.useContext(ta),{matches:o}=ve.useContext(br),{pathname:l}=Fd(),u=JSON.stringify(gg(o,t.v7_relativeSplatPath)),d=ve.useRef(!1);return yg(()=>{d.current=!0}),ve.useCallback(function(p,g){if(g===void 0&&(g={}),!d.current)return;if(typeof p=="number"){s.go(p);return}let m=vg(p,JSON.parse(u),l,g.relative==="path");r==null&&e!=="/"&&(m.pathname=m.pathname==="/"?e:ts([e,m.pathname])),(g.replace?s.replace:s.push)(m,g.state,g)},[e,s,u,l,r])}function Sg(){let{matches:r}=ve.useContext(br),e=r[r.length-1];return e?e.params:{}}function C_(r,e){return R_(r,e)}function R_(r,e,t,s){na()||Xt(!1);let{navigator:o}=ve.useContext(ta),{matches:l}=ve.useContext(br),u=l[l.length-1],d=u?u.params:{};u&&u.pathname;let f=u?u.pathnameBase:"/";u&&u.route;let p=Fd(),g;if(e){var m;let x=typeof e=="string"?ro(e):e;f==="/"||(m=x.pathname)!=null&&m.startsWith(f)||Xt(!1),g=x}else g=p;let _=g.pathname||"/",S=_;if(f!=="/"){let x=f.replace(/^\//,"").split("/");S="/"+_.replace(/^\//,"").split("/").slice(x.length).join("/")}let E=t_(r,{pathname:S}),M=I_(E&&E.map(x=>Object.assign({},x,{params:Object.assign({},d,x.params),pathname:ts([f,o.encodeLocation?o.encodeLocation(x.pathname).pathname:x.pathname]),pathnameBase:x.pathnameBase==="/"?f:ts([f,o.encodeLocation?o.encodeLocation(x.pathnameBase).pathname:x.pathnameBase])})),l,t,s);return e&&M?ve.createElement($l.Provider,{value:{location:Zo({pathname:"/",search:"",hash:"",state:null,key:"default"},g),navigationType:Mr.Pop}},M):M}function b_(){let r=F_(),e=E_(r)?r.status+" "+r.statusText:r instanceof Error?r.message:JSON.stringify(r),t=r instanceof Error?r.stack:null,o={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return ve.createElement(ve.Fragment,null,ve.createElement("h2",null,"Unexpected Application Error!"),ve.createElement("h3",{style:{fontStyle:"italic"}},e),t?ve.createElement("pre",{style:o},t):null,null)}const L_=ve.createElement(b_,null);class P_ extends ve.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return this.state.error!==void 0?ve.createElement(br.Provider,{value:this.props.routeContext},ve.createElement(xg.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function D_(r){let{routeContext:e,match:t,children:s}=r,o=ve.useContext(Od);return o&&o.static&&o.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(o.staticContext._deepestRenderedBoundaryId=t.route.id),ve.createElement(br.Provider,{value:e},s)}function I_(r,e,t,s){var o;if(e===void 0&&(e=[]),t===void 0&&(t=null),s===void 0&&(s=null),r==null){var l;if(!t)return null;if(t.errors)r=t.matches;else if((l=s)!=null&&l.v7_partialHydration&&e.length===0&&!t.initialized&&t.matches.length>0)r=t.matches;else return null}let u=r,d=(o=t)==null?void 0:o.errors;if(d!=null){let g=u.findIndex(m=>m.route.id&&d?.[m.route.id]!==void 0);g>=0||Xt(!1),u=u.slice(0,Math.min(u.length,g+1))}let f=!1,p=-1;if(t&&s&&s.v7_partialHydration)for(let g=0;g<u.length;g++){let m=u[g];if((m.route.HydrateFallback||m.route.hydrateFallbackElement)&&(p=g),m.route.id){let{loaderData:_,errors:S}=t,E=m.route.loader&&_[m.route.id]===void 0&&(!S||S[m.route.id]===void 0);if(m.route.lazy||E){f=!0,p>=0?u=u.slice(0,p+1):u=[u[0]];break}}}return u.reduceRight((g,m,_)=>{let S,E=!1,M=null,x=null;t&&(S=d&&m.route.id?d[m.route.id]:void 0,M=m.route.errorElement||L_,f&&(p<0&&_===0?(B_("route-fallback"),E=!0,x=null):p===_&&(E=!0,x=m.route.hydrateFallbackElement||null)));let y=e.concat(u.slice(0,_+1)),w=()=>{let R;return S?R=M:E?R=x:m.route.Component?R=ve.createElement(m.route.Component,null):m.route.element?R=m.route.element:R=g,ve.createElement(D_,{match:m,routeContext:{outlet:g,matches:y,isDataRoute:t!=null},children:R})};return t&&(m.route.ErrorBoundary||m.route.errorElement||_===0)?ve.createElement(P_,{location:t.location,revalidation:t.revalidation,component:M,error:S,children:w(),routeContext:{outlet:null,matches:y,isDataRoute:!0}}):w()},null)}var Mg=(function(r){return r.UseBlocker="useBlocker",r.UseRevalidator="useRevalidator",r.UseNavigateStable="useNavigate",r})(Mg||{}),Eg=(function(r){return r.UseBlocker="useBlocker",r.UseLoaderData="useLoaderData",r.UseActionData="useActionData",r.UseRouteError="useRouteError",r.UseNavigation="useNavigation",r.UseRouteLoaderData="useRouteLoaderData",r.UseMatches="useMatches",r.UseRevalidator="useRevalidator",r.UseNavigateStable="useNavigate",r.UseRouteId="useRouteId",r})(Eg||{});function N_(r){let e=ve.useContext(Od);return e||Xt(!1),e}function U_(r){let e=ve.useContext(w_);return e||Xt(!1),e}function O_(r){let e=ve.useContext(br);return e||Xt(!1),e}function Tg(r){let e=O_(),t=e.matches[e.matches.length-1];return t.route.id||Xt(!1),t.route.id}function F_(){var r;let e=ve.useContext(xg),t=U_(),s=Tg();return e!==void 0?e:(r=t.errors)==null?void 0:r[s]}function k_(){let{router:r}=N_(Mg.UseNavigateStable),e=Tg(Eg.UseNavigateStable),t=ve.useRef(!1);return yg(()=>{t.current=!0}),ve.useCallback(function(o,l){l===void 0&&(l={}),t.current&&(typeof o=="number"?r.navigate(o):r.navigate(o,Zo({fromRouteId:e},l)))},[r,e])}const Lp={};function B_(r,e,t){Lp[r]||(Lp[r]=!0)}function z_(r,e){r?.v7_startTransition,r?.v7_relativeSplatPath}function H_(r){let{to:e,replace:t,state:s,relative:o}=r;na()||Xt(!1);let{future:l,static:u}=ve.useContext(ta),{matches:d}=ve.useContext(br),{pathname:f}=Fd(),p=ia(),g=vg(e,gg(d,l.v7_relativeSplatPath),f,o==="path"),m=JSON.stringify(g);return ve.useEffect(()=>p(JSON.parse(m),{replace:t,state:s,relative:o}),[p,m,o,t,s]),null}function Ys(r){Xt(!1)}function G_(r){let{basename:e="/",children:t=null,location:s,navigationType:o=Mr.Pop,navigator:l,static:u=!1,future:d}=r;na()&&Xt(!1);let f=e.replace(/^\/*/,"/"),p=ve.useMemo(()=>({basename:f,navigator:l,static:u,future:Zo({v7_relativeSplatPath:!1},d)}),[f,d,l,u]);typeof s=="string"&&(s=ro(s));let{pathname:g="/",search:m="",hash:_="",state:S=null,key:E="default"}=s,M=ve.useMemo(()=>{let x=mg(g,f);return x==null?null:{location:{pathname:x,search:m,hash:_,state:S,key:E},navigationType:o}},[f,g,m,_,S,E,o]);return M==null?null:ve.createElement(ta.Provider,{value:p},ve.createElement($l.Provider,{children:t,value:M}))}function V_(r){let{children:e,location:t}=r;return C_(Ed(e),t)}new Promise(()=>{});function Ed(r,e){e===void 0&&(e=[]);let t=[];return ve.Children.forEach(r,(s,o)=>{if(!ve.isValidElement(s))return;let l=[...e,o];if(s.type===ve.Fragment){t.push.apply(t,Ed(s.props.children,l));return}s.type!==Ys&&Xt(!1),!s.props.index||!s.props.children||Xt(!1);let u={id:s.props.id||l.join("-"),caseSensitive:s.props.caseSensitive,element:s.props.element,Component:s.props.Component,index:s.props.index,path:s.props.path,loader:s.props.loader,action:s.props.action,errorElement:s.props.errorElement,ErrorBoundary:s.props.ErrorBoundary,hasErrorBoundary:s.props.ErrorBoundary!=null||s.props.errorElement!=null,shouldRevalidate:s.props.shouldRevalidate,handle:s.props.handle,lazy:s.props.lazy};s.props.children&&(u.children=Ed(s.props.children,l)),t.push(u)}),t}const W_="6";try{window.__reactRouterVersion=W_}catch{}const j_="startTransition",Pp=jv[j_];function X_(r){let{basename:e,children:t,future:s,window:o}=r,l=ve.useRef();l.current==null&&(l.current=Qv({window:o,v5Compat:!0}));let u=l.current,[d,f]=ve.useState({action:u.action,location:u.location}),{v7_startTransition:p}=s||{},g=ve.useCallback(m=>{p&&Pp?Pp(()=>f(m)):f(m)},[f,p]);return ve.useLayoutEffect(()=>u.listen(g),[u,g]),ve.useEffect(()=>z_(s),[s]),ve.createElement(G_,{basename:e,children:t,location:d.location,navigationType:d.action,navigator:u,future:s})}var Dp;(function(r){r.UseScrollRestoration="useScrollRestoration",r.UseSubmit="useSubmit",r.UseSubmitFetcher="useSubmitFetcher",r.UseFetcher="useFetcher",r.useViewTransitionState="useViewTransitionState"})(Dp||(Dp={}));var Ip;(function(r){r.UseFetcher="useFetcher",r.UseFetchers="useFetchers",r.UseScrollRestoration="useScrollRestoration"})(Ip||(Ip={}));const Y_="worldwright-db",q_=3,Qo="worlds",Jo="index";let Bu=null;function Kl(){return Bu||(Bu=new Promise((r,e)=>{const t=indexedDB.open(Y_,q_);t.onupgradeneeded=()=>{const o=t.result;o.objectStoreNames.contains(Qo)||o.createObjectStore(Qo,{keyPath:"metadata.id"}),o.objectStoreNames.contains(Jo)||o.createObjectStore(Jo,{keyPath:"id"})},t.onblocked=()=>{e(new Error("Database upgrade blocked. Please close other WorldWright tabs and try again."))};const s=setTimeout(()=>{e(new Error("Opening database timed out. Try reloading or resetting storage."))},5e3);t.onerror=()=>{clearTimeout(s),e(t.error)},t.onsuccess=()=>{clearTimeout(s),r(t.result)}})),Bu}function Qs(r,e,t,s){return new Promise((o,l)=>{const u=r.transaction(e,t),d=u.objectStore(e),f=s(d);f.onsuccess=()=>o(f.result),f.onerror=()=>l(f.error),u.onerror=()=>l(u.error)})}function $_(r){const e=new Date().toISOString(),t=r.metadata.createdAt||e;return{id:r.metadata.id,name:r.metadata.name||"Untitled World",seed:r.metadata.seed||"",createdAt:t,updatedAt:e,version:r.metadata.version||"unknown",styleMode:r.metadata.styleMode||"unknown"}}async function K_(){const r=await Kl();return Qs(r,Jo,"readonly",e=>e.getAll())}async function zu(r){const e=await Kl();return Qs(e,Qo,"readonly",t=>t.get(r))}async function wg(r){const e=await Kl(),t=$_(r);return r.metadata.updatedAt=t.updatedAt,await Qs(e,Qo,"readwrite",s=>s.put(r)),await Qs(e,Jo,"readwrite",s=>s.put(t)),r}async function Z_(r){const e=await Kl();await Qs(e,Qo,"readwrite",t=>t.delete(r)),await Qs(e,Jo,"readwrite",t=>t.delete(r))}function Np(r){try{return new Date(r).toLocaleString()}catch{return String(r)}}function Q_(){const r=ia(),[e,t]=ve.useState([]),[s,o]=ve.useState(!0),[l,u]=ve.useState(null);async function d(){try{o(!0),u(null);const p=await K_();t(p)}catch(p){u(p?.message||String(p))}finally{o(!1)}}ve.useEffect(()=>{d()},[]);const f=async p=>{confirm("Delete this world? This cannot be undone.")&&(await Z_(p),await d())};return O.jsxs("div",{style:{padding:24},children:[O.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[O.jsx("h1",{children:"WorldWright"}),O.jsx("button",{onClick:()=>r("/generate"),style:{padding:"10px 16px",borderRadius:12,fontWeight:900,background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",color:"white",border:"none",cursor:"pointer"},children:"+ Generate New World"})]}),O.jsx("div",{style:{marginTop:18},children:s?O.jsx("div",{style:{padding:12},children:"Loading…"}):l?O.jsx("div",{style:{padding:12,color:"#c33"},children:l}):e.length===0?O.jsxs("div",{style:{marginTop:16,padding:18,borderRadius:16,border:"1px solid rgba(0,0,0,0.12)",opacity:.9},children:[O.jsx("div",{style:{fontWeight:900,fontSize:16},children:"No worlds yet."}),O.jsx("div",{style:{marginTop:8,opacity:.8},children:"Create your first world in Generate Mode."}),O.jsx("div",{style:{marginTop:14},children:O.jsx("button",{onClick:()=>r("/generate"),style:{padding:"10px 12px",borderRadius:12,fontWeight:900},children:"Go to Generate"})})]}):O.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))",gap:12},children:e.map(p=>{const g=(p.name||"").trim()||"Untitled World";return O.jsxs("div",{style:{borderRadius:16,border:"1px solid rgba(0,0,0,0.12)",padding:14,display:"flex",flexDirection:"column",gap:10},children:[O.jsx("div",{style:{display:"flex",justifyContent:"space-between",gap:10},children:O.jsxs("div",{style:{minWidth:0},children:[O.jsx("div",{style:{fontWeight:950,fontSize:16,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:g}),O.jsxs("div",{style:{opacity:.7,fontSize:12,marginTop:3},children:[p.styleMode," • ",p.version]})]})}),O.jsxs("div",{style:{opacity:.8,fontSize:12,lineHeight:1.35},children:[O.jsxs("div",{children:[O.jsx("b",{children:"Updated:"})," ",Np(p.updatedAt)]}),O.jsxs("div",{children:[O.jsx("b",{children:"Created:"})," ",Np(p.createdAt)]})]}),O.jsxs("div",{style:{display:"flex",gap:8,marginTop:8},children:[O.jsx("button",{onClick:()=>r(`/create/${p.id}`),style:{flex:1,padding:"10px 10px",borderRadius:12,fontWeight:900},children:"Open (Create)"}),O.jsx("button",{onClick:()=>r(`/sim/${p.id}`),style:{padding:"10px 10px",borderRadius:12,fontWeight:900},children:"Sim"})]}),O.jsx("div",{style:{opacity:.55,fontSize:11,wordBreak:"break-all",marginTop:8},children:p.id}),O.jsx("div",{style:{display:"flex",gap:8,marginTop:10},children:O.jsx("button",{onClick:()=>f(p.id),children:"Delete"})})]},p.id)})})})]})}function J_({groups:r}){return O.jsx("div",{style:{padding:12,display:"flex",flexDirection:"column",gap:14},children:r.map(e=>O.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[O.jsx("div",{style:{fontSize:12,opacity:.8,letterSpacing:.5},children:e.title}),O.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:e.tools.map(t=>O.jsx("button",{onClick:t.onClick,disabled:t.disabled,style:{textAlign:"left",padding:"10px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:t.active?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.92)",opacity:t.disabled?.45:1,cursor:t.disabled?"not-allowed":"pointer"},children:t.label},t.id))})]},e.id))})}function ex({tools:r}){return O.jsx("div",{style:{padding:12,display:"flex",flexDirection:"column",gap:10},children:r.map(e=>O.jsx("button",{onClick:e.onClick,disabled:e.disabled,style:{textAlign:"left",padding:"10px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:e.active?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.92)",opacity:e.disabled?.45:1,cursor:e.disabled?"not-allowed":"pointer"},children:e.label},e.id))})}function tx(r){const{onGoHome:e,worldName:t,mode:s,onModeToggle:o,viewMode:l,onViewModeChange:u,isDirty:d}=r,f=!!o&&(s==="create"||s==="sim"),p=!!u&&s==="create";return O.jsxs("div",{style:{height:54,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 14px",borderBottom:"1px solid rgba(255,255,255,0.10)",background:"rgba(10,12,18,0.96)",color:"rgba(255,255,255,0.92)",boxSizing:"border-box"},children:[O.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[O.jsx("button",{onClick:e,style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Home"}),O.jsxs("div",{style:{display:"flex",flexDirection:"column",lineHeight:1.1},children:[O.jsxs("div",{style:{fontSize:14,fontWeight:650},children:[t||(s?s.toUpperCase():"WORLDWRIGHT"),d?" *":""]}),O.jsx("div",{style:{fontSize:12,opacity:.75},children:d?"Unsaved changes":"Saved"})]})]}),O.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[f&&O.jsx("button",{onClick:o,style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:s==="create"?"Go to Sim":"Go to Create"}),p&&O.jsxs("div",{style:{display:"flex",gap:8},children:[O.jsx("button",{onClick:()=>u?.("GLOBE"),style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:l==="GLOBE"?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Globe"}),O.jsx("button",{onClick:()=>u?.("MAP"),style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:l==="MAP"?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Map"})]}),O.jsx("button",{disabled:!0,style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:"rgba(255,255,255,0.03)",color:"rgba(255,255,255,0.65)",cursor:"not-allowed"},children:"Export"}),O.jsx("button",{disabled:!0,style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:"rgba(255,255,255,0.03)",color:"rgba(255,255,255,0.65)",cursor:"not-allowed"},children:"Settings"})]})]})}function ns(r){const{rightPanel:e,children:t,onGoHome:s,worldName:o,mode:l,onModeToggle:u,viewMode:d,onViewModeChange:f,isDirty:p,toolGroups:g,leftTools:m}=r,_=g&&g.length>0||m&&m.length>0;return O.jsxs("div",{style:{width:"100vw",height:"100vh",background:"rgb(10,12,18)",overflow:"hidden"},children:[O.jsx(tx,{onGoHome:s,worldName:o,mode:l,onModeToggle:u,viewMode:d,onViewModeChange:f,isDirty:p}),O.jsxs("div",{style:{height:"calc(100vh - 54px)",display:"grid",gridTemplateColumns:_?"260px 1fr 320px":"1fr 320px"},children:[_&&O.jsx("div",{style:{borderRight:"1px solid rgba(255,255,255,0.10)",background:"rgba(255,255,255,0.02)",overflow:"auto"},children:g&&g.length>0?O.jsx(J_,{groups:g}):O.jsx(ex,{tools:m||[]})}),O.jsx("div",{style:{position:"relative",overflow:"hidden"},children:t}),O.jsx("div",{style:{borderLeft:"1px solid rgba(255,255,255,0.10)",background:"rgba(255,255,255,0.02)",overflow:"auto"},children:e})]})]})}var Sr=(r=>(r.OCEANIC="OCEANIC",r.CONTINENTAL="CONTINENTAL",r))(Sr||{}),Ei=(r=>(r.NONE="NONE",r.DIVERGENT="DIVERGENT",r.CONVERGENT="CONVERGENT",r.TRANSFORM="TRANSFORM",r))(Ei||{}),Td=(r=>(r.ROCK="ROCK",r.VOLCANIC="VOLCANIC",r.SAND="SAND",r.ALLUVIAL="ALLUVIAL",r.PEAT="PEAT",r.SALT="SALT",r.PERMAFROST="PERMAFROST",r))(Td||{});function nx(r){return{index:r,baseHeight:0,editHeightDelta:0,simHeightDelta:0,isWater:!1,flowDirection:null,flowAccumulation:0,basinId:null,temperature:.5,rainfall:.5,climateCellId:0,prevailingWind:[0,0],plateId:0,plateType:"CONTINENTAL",boundaryType:"NONE",upliftRate:0,surfaceAge:.5,volcanicActivity:0,baseBiomeId:0,editBiomeId:0,surfaceType:"ROCK",snowCover:0,oceanDepthClass:null}}function On(r,e=["LOADED"]){ix(r),sx(r),ox(r),lx(r),rx(r),ax(r)}function ix(r){const e=r.seaLevel;for(const t of r.cells){const s=t.baseHeight+t.editHeightDelta+t.simHeightDelta;t.isWater=s<e}}function rx(r){for(const e of r.cells){const t=e.baseHeight+e.editHeightDelta+e.simHeightDelta,s=ji(1-e.temperature),o=ji((t-.15)*1.25),l=ji(s*.85+o*.35);e.snowCover=l}}function sx(r){const e=r.gridWidth,t=r.gridHeight,s=r.cells,o=r.seaLevel;function l(u,d,f=4){let p=0,g=0;for(let m=-f;m<=f;m++){const _=u+m;if(!(_<0||_>=t))for(let S=-f;S<=f;S++){const E=((d+S)%e+e)%e;g++;const M=_*e+E,x=s[M];x&&x.isWater&&p++}}return g>0?p/g:0}for(let u=0;u<t;u++){const d=90-u/t*180,f=1-Math.abs(d)/90;for(let p=0;p<e;p++){const g=u*e+p,m=s[g];if(!m)continue;const _=m.baseHeight+m.editHeightDelta+m.simHeightDelta,S=ji((_-o+.5)*.5),E=l(u,p,4),M=ji(f*.9+(1-S)*.05+E*.05);let x=ji(E*.6+f*.2+(M>.6?.05:0));x=ji(x*(1-S*.5)),m.temperature=M,m.rainfall=x}}}function ox(r){const e=r.gridWidth,t=r.gridHeight,s=r.cells;function o(f){const p=s[f];return p?p.baseHeight+p.editHeightDelta+p.simHeightDelta:0}for(const f of s)f.flowDirection===void 0&&(f.flowDirection=null),typeof f.flowAccumulation!="number"&&(f.flowAccumulation=1),f.basinId===void 0&&(f.basinId=null);const l=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];for(let f=0;f<t;f++)for(let p=0;p<e;p++){const g=f*e+p,m=s[g];if(!m)continue;const _=o(g);let S=null,E=_;for(const[M,x]of l){const y=f+M;if(y<0||y>=t)continue;const w=((p+x)%e+e)%e,R=y*e+w,b=o(R);b<E-1e-6&&(E=b,S=R)}m.flowDirection=S}const u=s.map((f,p)=>p).sort((f,p)=>o(p)-o(f));for(const f of u){const p=s[f];if(!p)continue;const g=p.flowDirection;if(g!=null&&g>=0&&g<s.length){const m=s[g];m&&(m.flowAccumulation+=p.flowAccumulation)}}function d(f){let p=f;const g=new Set;for(let m=0;m<1e3;m++){if(g.has(p))return p;g.add(p);const _=s[p];if(!_||_.isWater)return p;const S=_.flowDirection;if(S==null)return p;p=S}return p}for(let f=0;f<s.length;f++)s[f].basinId=d(f)}function ax(r){r.gridWidth,r.gridHeight;const e=r.cells,t=r.seaLevel;for(let s=0;s<e.length;s++){const o=e[s];if(!o)continue;if(o.isWater){o.baseBiomeId=0;continue}if((o.baseHeight+o.editHeightDelta+o.simHeightDelta-t)*.25>.6){o.baseBiomeId=6;continue}const d=ji(o.temperature),f=ji(o.rainfall);d<.2?o.baseBiomeId=1:f<.15?o.baseBiomeId=4:d>.6&&f>.6?o.baseBiomeId=5:o.baseBiomeId=3}}function ji(r){return r<0?0:r>1?1:r}function lx(r){const e=r.cells,t=r.gridWidth,s=r.gridHeight,o=t*s,l=Math.max(20,Math.round(o/4e3)),u=[],d=new Set;let f=1;for(let p=0;p<e.length;p++){const g=e[p];if(!g||g.flowAccumulation<l||d.has(p))continue;const m=[];let _=p;const S=new Set;for(let E=0;E<e.length&&!S.has(_);E++){S.add(_),m.push(_),d.add(_);const M=e[_];if(!M||M.isWater)break;const x=M.flowDirection;if(x==null)break;if(d.has(x)){m.push(x),_=x;break}_=x}if(m.length>=2){const E=m[m.length-1];u.push({id:f++,sourceCellIndex:p,mouthCellIndex:E,path:m})}}r.rivers=u.map(p=>({id:p.id,sourceCellIndex:p.sourceCellIndex,mouthCellIndex:p.mouthCellIndex,path:p.path}))}function Ag(r,e=6){const{cells:t,gridWidth:s,gridHeight:o,plates:l}=r,u=[],d=new Array(t.length).fill(-1),f=new Set;for(const M of t)!M.isWater&&M.plateType==="CONTINENTAL"&&f.add(M.plateId);const p=t.filter(M=>!M.isWater);if(p.length===0)return u;const g=Array.from(f),m=[];for(let M=0;M<e;M++){const x=g[M%g.length],y=p.filter(w=>w.plateId===x);if(y.length>0){const w=y[Math.floor(M/e*y.length)];m.push({idx:w.index,countryId:M,plateId:x}),d[w.index]=M}}let _=!0,S=0;const E=s*o;for(;_&&S<E;){_=!1,S++;for(let M=0;M<t.length;M++)if(!t[M].isWater&&d[M]!==-1){const x=Math.floor(M/s),y=M%s,w=d[M],R=m.find(G=>G.countryId===w)?.plateId,b=[[x-1,y],[x+1,y],[x,(y-1+s)%s],[x,(y+1)%s]];for(const[G,B]of b){if(G<0||G>=o)continue;const U=G*s+B;U<0||U>=t.length||t[U].isWater||d[U]===-1&&t[U].plateId===R&&Math.abs(t[M].baseHeight+t[M].editHeightDelta-(t[U].baseHeight+t[U].editHeightDelta))<.35&&(d[U]=d[M],_=!0)}}}for(let M=0;M<e;M++){const x=t.filter((R,b)=>d[b]===M);if(x.length===0)continue;for(let R=0;R<d.length;R++)d[R]===M&&(t[R].countryId=`country_${M}`);const y=cx(x,s,o),w=M/e*360;u.push({id:`country_${M}`,name:ux(M),polygons:[y],color:`hsl(${w}, 65%, 45%)`})}return u}function cx(r,e,t){if(r.length===0)return[];const s=r.map(m=>m.index),o=s.map(m=>Math.floor(m/e)),l=s.map(m=>m%e),u=Math.min(...o),d=Math.max(...o),f=Math.min(...l),p=Math.max(...l),g=[];return g.push({lat:90-u/t*180,lon:f/e*360-180}),g.push({lat:90-u/t*180,lon:(p+1)/e*360-180}),g.push({lat:90-(d+1)/t*180,lon:(p+1)/e*360-180}),g.push({lat:90-(d+1)/t*180,lon:f/e*360-180}),g}function ux(r){const e=["Kingdom","Republic","Empire","Dominion","Territory","Realm","Union"],t=["of the North","of the South","of the East","of the West","the Great","the Ancient","of Fire","of Stone","of the Mountains","of the Plains"],s=e[r%e.length],o=t[r*7%t.length];return`${s} ${o}`}function dx(r){const e=gl(r.width,32,1024),t=gl(r.height,16,512),s=px(r.seed),o=hx(s),l=new Date().toISOString(),u=_n(-.1,.1,Nn(r.seaLevel/100)),d=_n(.25,1.35,Nn(r.plateActivity/100)),f=_n(.15,.55,Nn(r.planetAge/100)),p=_n(.05,.35,Nn(r.climateVar/100)),g=_n(.25,1,Nn(r.axisTilt/100)),m=new Array(e*t);for(let H=0;H<m.length;H++)m[H]=nx(H);const _=gl(r.continentCount,1,12),S=_+Math.floor(_*1.2),E=[];for(let H=0;H<S;H++)E.push({id:H,type:H<_?Sr.CONTINENTAL:Sr.OCEANIC,velocity:[_n(-1,1,o()),_n(-1,1,o())]});console.log("[WorldGenerator] Using QUANTILE-BASED continent generation (v2)"),console.log("[WorldGenerator] Target land fraction:",1-r.seaLevel/100);const M=Math.floor(e/4),x=Math.floor(t/4),y=new Float32Array(M*x);for(let H=0;H<x;H++)for(let q=0;q<M;q++){const K=H*M+q,N=H/(x-1),X=q/(M-1),V=fi(X*.6,N*.5,o,3)*.5,I=fi(X*1.2+.3,N*.9+.7,o,2),Q=Math.floor(Nn((I+1)*.5)*S)%S<_?.6:-.6;y[K]=Q+V}const w=new Float32Array(M*x);for(let H=0;H<6;H++){for(let q=0;q<y.length;q++)w[q]=y[q];for(let q=1;q<x-1;q++)for(let K=0;K<M;K++){const N=q*M+K;let X=0,V=0;for(let I=-1;I<=1;I++)for(let z=-1;z<=1;z++){const Y=q+I,Q=(K+z+M)%M;Y>=0&&Y<x&&(X+=w[Y*M+Q],V++)}y[N]=X/V}}const R=1-r.seaLevel/100,b=Array.from(y).sort((H,q)=>H-q),G=Math.floor(b.length*(1-R)),B=b[G];for(let H=0;H<t;H++)for(let q=0;q<e;q++){const K=H*e+q,N=m[K],X=H/(t-1),V=q/(e-1),I=X*(x-1),z=V*(M-1),Y=Math.floor(I),Q=Math.floor(z),pe=Math.min(Y+1,x-1),xe=(Q+1)%M,ye=I-Y,ue=z-Q,fe=y[Y*M+Q],Te=y[Y*M+xe],Ge=y[pe*M+Q],Z=y[pe*M+xe],ht=fe*(1-ue)+Te*ue,Fe=Ge*(1-ue)+Z*ue,Ne=ht*(1-ye)+Fe*ye,Pe=Ne>B,$e=fi(V*1.2+.3,X*.9+.7,o,2),Xe=Math.floor(Nn(($e+1)*.5)*S)%S;if(N.plateId=Xe,N.plateType=Pe?Sr.CONTINENTAL:Sr.OCEANIC,Pe){const L=(Ne-B)/(1-B);N.baseHeight=.2+L*.6}else{const L=(B-Ne)/(B+1);N.baseHeight=-.3-L*.5}N.boundaryType=Ei.NONE}const U=new Set;for(let H=0;H<t;H++)for(let q=0;q<e;q++){const K=H*e+q;if(m[K].baseHeight>=0)for(let X=-1;X<=1;X++){for(let V=-1;V<=1;V++){if(X===0&&V===0)continue;const I=H+X,z=(q+V+e)%e;if(I>=0&&I<t){const Y=I*e+z;if(m[Y]&&m[Y].baseHeight<0){U.add(K);break}}}if(U.has(K))break}}for(let H=0;H<t;H++)for(let q=0;q<e;q++){const K=H*e+q,N=m[K],X=H/(t-1),V=q/(e-1);if(N.baseHeight>0){const $e=U.has(K),Xe=fi(V*2.5,X*2,o,2)*.15,L=$e?8:5,A=$e?.18:.1,ne=fi(V*L,X*L*.8,o,3)*A,ge=$e?.05:.08,me=fi(V*8,X*6.5,o,2)*ge*d,_e=$e?-.03:0,Le=1-f*.4;N.baseHeight+=(Xe+ne+me+_e)*Le}N.baseHeight=Vo(N.baseHeight,-1.5,1.5);const I=Math.min(X,1-X);if(I<.15){const $e=1-I/.15,Xe=-.4+(Math.random()*.1-.05);N.baseHeight=_n(N.baseHeight,Xe,$e*.8)}N.boundaryType=Ei.NONE;const z=X*2-1,Y=_n(.65,1.25,g),Q=Math.pow(1-Math.abs(z),1/Y),pe=fi(V*4,X*4,o,2)*p,xe=r.temperatureOffset/100*.6;let ye=0;r.styleMode==="ALIEN"?ye=fi(V*8,X*6,o,2)*.15:r.styleMode==="FANTASY"&&(ye=.08+fi(V*3,X*2.5,o,2)*.12),N.temperature=Nn(Q*.75+.05+pe*.15+ye+xe);const ue=Math.abs(z),fe=Math.exp(-Math.pow(ue*2.5,2)),Te=Math.exp(-Math.pow((ue-.35)*3.5,2)),Ge=ue>.7?(ue-.7)*.4:0,Z=_n(.5,1.5,r.moistureLevel/100);let ht=(fe*.6-Te*.25+Ge+.25)*Z;const Fe=fi(V*5,X*3,o,2)*p;let Ne=0;r.styleMode==="ALIEN"?Ne=fi(V*10,X*7,o,3)*.2:r.styleMode==="FANTASY"&&(Ne=.1),N.rainfall=Nn(ht+Fe*.3+Ne);const Pe=fx(N.temperature,N.rainfall);N.baseBiomeId=Pe,N.editBiomeId=Pe,N.surfaceType=N.plateType===Sr.OCEANIC?Td.ALLUVIAL:Td.ROCK,N.flowDirection=null,N.flowAccumulation=0,N.basinId=null,N.upliftRate=0,N.surfaceAge=Nn(.35+o()*.5),N.volcanicActivity=0}for(let H=0;H<t;H++)for(let q=0;q<e;q++){const K=H*e+q,N=m[K],X=N.plateId,V=(H-1+t)%t,I=(H+1)%t,z=(q-1+e)%e,Y=(q+1)%e,Q=V*e+q,pe=I*e+q,xe=H*e+z,ye=H*e+Y,ue=new Set;if(ue.add(X),ue.add(m[Q].plateId),ue.add(m[pe].plateId),ue.add(m[xe].plateId),ue.add(m[ye].plateId),ue.size>1){const fe=[m[Q].plateType,m[pe].plateType,m[xe].plateType,m[ye].plateType],Te=fe.some(ht=>ht===Sr.OCEANIC),Ge=fe.some(ht=>ht===Sr.CONTINENTAL);Te&&Ge?N.boundaryType=Ei.CONVERGENT:N.boundaryType=o()<.5?Ei.DIVERGENT:Ei.TRANSFORM;const Z=N.boundaryType===Ei.CONVERGENT?1.2:N.boundaryType===Ei.DIVERGENT?.6:.4;N.upliftRate=Vo(d*.02*Z*(.6+o()*.8),0,5),N.volcanicActivity=N.boundaryType===Ei.CONVERGENT&&Te?Vo(o()*1.2,0,3):o()*.2}else N.boundaryType=Ei.NONE,N.upliftRate=Vo(.005*(1-f)*(.5+o()*.8),0,.5),N.volcanicActivity=o()*.05}const he=Nn(r.planetAge/100),C=Nn(r.erosionIntensity/100),D=(he+C)/2,te=Math.max(1,Math.round(_n(1,8,D))),ie=_n(.15,.7,D);for(let H=0;H<te;H++){const q=new Array(m.length);for(let K=0;K<t;K++)for(let N=0;N<e;N++){const X=K*e+N,V=m[X];if(!V)continue;let I=0,z=0;const Y=K-1,Q=K+1,pe=(N-1+e)%e,xe=(N+1)%e;Y>=0&&(I+=m[Y*e+N].baseHeight,z++),Q<t&&(I+=m[Q*e+N].baseHeight,z++),I+=m[K*e+pe].baseHeight,z++,I+=m[K*e+xe].baseHeight,z++;const ye=z>0?I/z:V.baseHeight,ue=_n(V.baseHeight,ye,ie),fe=V.upliftRate*.005,Te=(o()-.5)*.02*(1-he);q[X]=Vo(V.baseHeight+fe+Te+(ue-V.baseHeight)*.9,-2,2)}for(let K=0;K<m.length;K++)m[K].baseHeight=q[K],m[K].surfaceAge=Nn(.2+he*.7+(o()-.5)*.1)}const ae=[];for(let H=0;H<t;H++)for(let q=0;q<e;q++){const K=H*e+q,N=m[K];if(!N||N.baseHeight<u)continue;let X=null,V=N.baseHeight;for(let Y=-1;Y<=1;Y++){const Q=H+Y;if(!(Q<0||Q>=t))for(let pe=-1;pe<=1;pe++){if(Y===0&&pe===0)continue;const xe=(q+pe+e)%e,ye=Q*e+xe,ue=m[ye].baseHeight;ue<V-1e-6&&(V=ue,X=ye)}}if(X!=null&&o()<.06){const Y=gl(H+Math.floor((o()-.5)*3),0,t-1),Q=((q+Math.floor((o()-.5)*3))%e+e)%e,pe=Y*e+Q;pe!==K&&(X=pe)}X!=null&&(N.flowDirection=X);const I=Nn(N.rainfall||.2),z=Math.max(0,(N.baseHeight-V)*2);N.flowAccumulation=Math.max(1,Math.floor(1+I*8+z*4+Math.floor(o()*3)))}const k={gridWidth:e,gridHeight:t,seaLevel:u,cells:m,plates:E,rivers:ae,countries:[],cultures:[],cultureRegions:[],cities:[],locations:[],stickers:[],metadata:{id:`w_${r.styleMode}_${e}x${t}_${s}`,name:"Untitled World",seed:String(r.seed),schemaVersion:"v3",version:"v1.3",styleMode:r.styleMode,gridWidth:e,gridHeight:t,createdAt:l,updatedAt:l,seaLevel:u},parameters:{...r,seaLevel:r.seaLevel}};return On(k,["GENERATED"]),k.countries=Ag(k,_),k}function fx(r,e){return r<.2?e<.35?1:2:r<.35?e<.35?3:4:r<.6?e<.3?5:e<.6?6:7:e<.25?8:e<.55?9:10}function Nn(r){return r<0?0:r>1?1:r}function Vo(r,e,t){return r<e?e:r>t?t:r}function gl(r,e,t){return Math.max(e,Math.min(t,Math.floor(r)))}function _n(r,e,t){return r+(e-r)*t}function hx(r){return function(){let e=r+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function px(r){if(typeof r=="number")return r>>>0;const e=String(r);let t=2166136261;for(let s=0;s<e.length;s++)t^=e.charCodeAt(s),t=Math.imul(t,16777619);return t>>>0&4294967295}function fi(r,e,t,s){let o=1,l=1,u=0,d=0;for(let f=0;f<s;f++)u+=o*mx(r*l,e*l,t),d+=o,o*=.5,l*=2;return u/Math.max(1e-9,d)*2-1}function mx(r,e,t){const s=Math.floor(r),o=Math.floor(e),l=r-s,u=e-o,d=M(s,o),f=M(s+1,o),p=M(s,o+1),g=M(s+1,o+1),m=Up(l),_=Up(u),S=_n(d,f,m),E=_n(p,g,m);return _n(S,E,_);function M(x,y){let w=x*374761393+y*668265263;const R=Math.floor(t()*4294967295);return w=(w^R)>>>0,w=(w^w>>>13)*1274126177,w=w^w>>>16,(w>>>0)/4294967295}}function Up(r){return r*r*(3-2*r)}function Cg(r,e){switch(e.type){case"TERRAIN_STROKE":{const{tool:t,center:s,radius:o,strength:l}=e;if(!r||!Array.isArray(r.cells))return;const u=r.gridWidth,d=r.gridHeight,f=r.cells,p=Math.max(1,Math.floor(Number.isFinite(o)?o:1)),g=Number.isFinite(l)&&l>=0?l:0;let m=0,_=0;if(t==="FLATTEN"||t==="SMOOTH"){for(let S=-p;S<=p;S++){const E=s.row+S;if(!(E<0||E>=d))for(let M=-p;M<=p;M++){if(Math.sqrt(S*S+M*M)>o)continue;const w=((s.col+M)%u+u)%u,R=E*u+w,b=f[R],G=b.baseHeight+(b.editHeightDelta||0);m+=G,_++}}_>0&&(m/=_)}for(let S=-p;S<=p;S++){const E=s.row+S;if(!(E<0||E>=d))for(let M=-p;M<=p;M++){const x=Math.sqrt(S*S+M*M);if(x>o)continue;const w=((s.col+M)%u+u)%u,R=E*u+w,b=f[R],G=(o-x)/o;if(t==="RAISE")b.editHeightDelta=(b.editHeightDelta||0)+g*G;else if(t==="LOWER")b.editHeightDelta=(b.editHeightDelta||0)-g*G;else if(t==="FLATTEN"||t==="SMOOTH"){const B=b.baseHeight+(b.editHeightDelta||0),U=(m-B)*g*G;b.editHeightDelta=(b.editHeightDelta||0)+U}}}return}case"STICKER_APPLY":gx(r,e),On(r,["STICKER_EDIT"]);return;case"ADD_CITY":vx(r,e),On(r,["TERRAIN_EDIT"]);return;case"ADD_COUNTRY":_x(r,e),On(r,["TERRAIN_EDIT"]);return;case"ADD_RIVER":yx(r,e),On(r,["TERRAIN_EDIT"]);return;case"REMOVE_RIVER":Sx(r,e),On(r,["TERRAIN_EDIT"]);return;case"SET_LAKE_LEVEL":Mx(r,e),On(r,["TERRAIN_EDIT"]);return;default:return}}function gx(r,e){const{sticker:t}=e,{gridWidth:s,gridHeight:o,cells:l}=r,u=t.polygon.map(x=>x.lat),d=t.polygon.map(x=>x.lon),f=Math.min(...u),p=Math.max(...u),g=Math.min(...d),m=Math.max(...d),_=Math.floor((90-p)/180*o),S=Math.ceil((90-f)/180*o),E=Math.floor((g+180)/360*s),M=Math.ceil((m+180)/360*s);for(let x=_;x<=S;x++)for(let y=E;y<=M;y++){const w=(x+o)%o,R=(y+s)%s,b=w*s+R,G=l[b],B=90-w/o*180,U=R/s*360-180;xx({lat:B,lon:U},t.polygon)&&(t.type==="BIOME"&&t.payload.biomeId!=null&&(G.editBiomeId=t.payload.biomeId),t.type==="CULTURE"&&t.payload.cultureId&&(G.cultureId=t.payload.cultureId),t.type==="HEIGHT"&&typeof t.payload.heightDelta=="number"&&(G.editHeightDelta=(G.editHeightDelta||0)+t.payload.heightDelta))}r.stickers=r.stickers??[],r.stickers.push(t)}function vx(r,e){r.cities=r.cities??[],r.cities.push(e.city)}function _x(r,e){r.countries=r.countries??[],r.countries.push(e.country)}function xx(r,e){let t=!1;for(let s=0,o=e.length-1;s<e.length;o=s++){const l=e[s].lon,u=e[s].lat,d=e[o].lon,f=e[o].lat;u>r.lat!=f>r.lat&&r.lon<(d-l)*(r.lat-u)/(f-u+1e-12)+l&&(t=!t)}return t}function yx(r,e){r.rivers=r.rivers??[],r.rivers.push(e.river)}function Sx(r,e){r.rivers=(r.rivers??[]).filter(t=>t.id!==e.riverId)}function Mx(r,e){const t=r.cells[e.cellIndex];if(!t)return;const s=t.basinId,o=t.baseHeight+t.editHeightDelta,l=e.newLevel-o;if(s!=null)for(const u of r.cells)u.basinId===s&&(u.editHeightDelta=(u.editHeightDelta??0)+l)}function vl(r){const e=[],t=r.gridWidth*r.gridHeight;r.cells.length!==t&&e.push(`Cell array size (${r.cells.length}) does not match grid (${r.gridWidth}×${r.gridHeight} = ${t}).`),(typeof r.seaLevel!="number"||Number.isNaN(r.seaLevel))&&e.push("World is missing global seaLevel (number)."),r.metadata||e.push("World metadata is missing."),r.metadata?.id||e.push("World metadata.id is missing."),r.metadata?.schemaVersion||e.push("World metadata.schemaVersion is missing.");for(let s=0;s<r.cells.length;s++){const o=r.cells[s];if(o.index!==s){e.push(`Cell index mismatch at i=${s} (cell.index=${o.index}).`);break}if("seaLevel"in o){e.push("Legacy field detected: cell.seaLevel exists. World should be normalized/migrated.");break}typeof o.baseHeight!="number"&&e.push(`Cell ${s} missing baseHeight.`),typeof o.editHeightDelta!="number"&&e.push(`Cell ${s} missing editHeightDelta.`),typeof o.simHeightDelta!="number"&&e.push(`Cell ${s} missing simHeightDelta.`),typeof o.isWater!="boolean"&&e.push(`Cell ${s} missing isWater.`),o.flowDirection!=null&&typeof o.flowDirection!="number"&&e.push(`Cell ${s} flowDirection invalid type.`),typeof o.flowAccumulation!="number"&&e.push(`Cell ${s} missing flowAccumulation.`),o.basinId!=null&&typeof o.basinId!="number"&&e.push(`Cell ${s} basinId invalid type.`)}for(const s of r.countries)s.id||e.push("A country is missing an id."),(!s.polygons||s.polygons.length===0)&&e.push(`Country ${s.id||"(unknown)"} has no polygons.`);for(const s of r.cities)(s.cellIndex<0||s.cellIndex>=r.cells.length)&&e.push(`City ${s.id||s.name} has invalid cellIndex=${s.cellIndex}.`);return e}function Xr(r){return JSON.parse(JSON.stringify(r))}function Ex(r,e=1){const t=.01*e;for(const s of r.cities)s.population+=s.population*t;for(const s of r.cultures)if(Math.random()<.05){const o=Math.floor(Math.random()*r.cells.length);r.cells[o].isWater||(r.cells[o].cultureId=s.id)}for(const s of r.countries){const o=r.cells.map((l,u)=>({cell:l,idx:u})).filter(l=>l.cell.countryId===s.id);if(o.length>0&&Math.random()<.03){const u=o[Math.floor(Math.random()*o.length)].idx,d=Math.floor(u/r.gridWidth),f=u%r.gridWidth,p=[(d-1+r.gridHeight)%r.gridHeight*r.gridWidth+f,(d+1)%r.gridHeight*r.gridWidth+f,d*r.gridWidth+(f-1+r.gridWidth)%r.gridWidth,d*r.gridWidth+(f+1)%r.gridWidth];for(const g of p){const m=r.cells[g];if(!m.isWater&&!m.countryId){m.countryId=s.id;break}}}}}class Tx{world=null;history=[];historyIndex=-1;listeners=[];dirty=!1;getWorld(){return this.world}subscribe(e){return this.listeners.push(e),e(this.world),()=>{const t=this.listeners.indexOf(e);t>=0&&this.listeners.splice(t,1)}}notify(){for(const e of this.listeners)try{e(this.world)}catch(t){console.error("WorldSession subscriber error:",t)}}isDirty(){return this.dirty}normalizeWorld(e){if(typeof e.seaLevel!="number"){const t=e.metadata?.seaLevel;typeof t=="number"?e.seaLevel=t:e.seaLevel=0}if(Array.isArray(e.cells)){const t=e.gridWidth,s=e.gridHeight;for(let l=0;l<e.cells.length;l++){const u=e.cells[l];u.index=l,u&&Object.prototype.hasOwnProperty.call(u,"seaLevel")&&delete u.seaLevel,typeof u.editHeightDelta!="number"&&(u.editHeightDelta=0),typeof u.simHeightDelta!="number"&&(u.simHeightDelta=0),typeof u.isWater!="boolean"&&(u.isWater=!1),typeof u.temperature!="number"&&(u.temperature=.5),typeof u.rainfall!="number"&&(u.rainfall=.5),typeof u.baseBiomeId!="number"&&(u.baseBiomeId=0),typeof u.editBiomeId!="number"&&(u.editBiomeId=u.baseBiomeId),typeof u.snowCover!="number"&&(u.snowCover=0)}const o=t*s;if(e.cells.length>o)e.cells.length=o;else if(e.cells.length<o)for(let l=e.cells.length;l<o;l++){const u=e.cells[e.cells.length-1];e.cells.push(JSON.parse(JSON.stringify(u)))}}}async createWorld(e){const t=dx(e);this.normalizeWorld(t),On(t,["GENERATED"]);const s=vl(t);s.length>0&&console.warn("Validation warnings on generated world:",s);try{if(await zu(t.metadata.id)){console.warn(`Generated world id ${t.metadata.id} already exists for seed ${t.metadata.seed}; creating unique id.`);const l=t.metadata.id;let u=1,d=`${l}_dup${u}`;for(;u<1e3&&await zu(d);)u++,d=`${l}_dup${u}`;t.metadata.id=d,t.metadata.name=`${t.metadata.name} (copy)`,t.metadata.createdAt=new Date().toISOString()}}catch(o){console.warn("Could not verify world id uniqueness due to storage error:",o)}this.world=t,this.history=[Xr(t)],this.historyIndex=0,this.dirty=!1,this.notify()}async loadWorld(e){let t=null;if(typeof e=="string"?t=await zu(e):e&&typeof e=="object"&&(t=e),!t)throw new Error("World not found");this.normalizeWorld(t),On(t,["LOADED"]);const s=vl(t);s.length>0&&console.warn("Validation warnings on load:",s),this.world=t,this.history=[Xr(t)],this.historyIndex=0,this.dirty=!1,this.notify()}async save(){if(!this.world)throw new Error("No world loaded");const e=await wg(this.world);return this.world.metadata=e.metadata,this.dirty=!1,this.notify(),e}apply(e){if(!this.world)return;Cg(this.world,e),On(this.world,["TERRAIN_EDIT"]);const t=vl(this.world);t.length>0&&console.warn("Validation warnings after edit:",t),this.historyIndex<this.history.length-1&&(this.history=this.history.slice(0,this.historyIndex+1)),this.history.push(Xr(this.world)),this.historyIndex=this.history.length-1,this.dirty=!0,this.notify(),this.dirty=!0,this.notify()}applyLocalEdit(e){!this.world||!e||(this.world=Xr(e),On(this.world,["TERRAIN_EDIT"]),this.dirty=!0,this.notify())}undo(){this.historyIndex>0&&(this.historyIndex--,this.world=Xr(this.history[this.historyIndex]),this.dirty=!0,this.notify())}redo(){this.historyIndex<this.history.length-1&&(this.historyIndex++,this.world=Xr(this.history[this.historyIndex]),this.dirty=!0,this.notify())}simulateTick(e=1){if(!this.world)return;Ex(this.world,e),On(this.world,["SIM_STEP"]);const t=vl(this.world);t.length>0&&console.warn("Validation warnings after sim tick:",t),this.historyIndex<this.history.length-1&&(this.history=this.history.slice(0,this.historyIndex+1)),this.history.push(Xr(this.world)),this.historyIndex=this.history.length-1,this.dirty=!0,this.notify()}}const ln=new Tx;function wx(r){const e=r.gridWidth,t=r.gridHeight,s=typeof r.seaLevel=="number"?r.seaLevel:typeof r.metadata?.seaLevel=="number"?r.metadata.seaLevel:0,o=Array.isArray(r.cells)?r.cells:[];function l(m){const _=Hu(Math.round(m[0]*255)),S=Hu(Math.round(m[1]*255)),E=Hu(Math.round(m[2]*255));return[_,S,E,255]}function u(m){if(e===0)return 0;const _=m%e;return _<0?_+e:_}function d(m){return t===0||m<0?0:m>=t?t-1:m}function f(m,_){if(t===0||e===0)return[1,0,1];const S=d(m),E=u(_),M=S*e+E,x=o[M];if(!x)return[1,0,1];const y=typeof x.baseHeight=="number"?x.baseHeight:typeof x.height=="number"?x.height:0,w=typeof x.editHeightDelta=="number"?x.editHeightDelta:0,R=typeof x.simHeightDelta=="number"?x.simHeightDelta:0,b=y+w+R,G=b<s,B=typeof x.rainfall=="number"?Wn(x.rainfall):.5,U=typeof x.temperature=="number"?Wn(x.temperature):.5,he=typeof x.snowCover=="number"?Wn(x.snowCover):0;let C=1;if(m>0&&_>0){const k=o[(m-1)*e+(_-1)];if(k){const H=(typeof k.baseHeight=="number"?k.baseHeight:0)+(typeof k.editHeightDelta=="number"?k.editHeightDelta:0)+(typeof k.simHeightDelta=="number"?k.simHeightDelta:0),q=(b-H)*6;C=Wn(.7+q*.3)}}if(G){const k=Wn((s-b)*2),H=.2,q=.55,K=.75,N=.1,X=.35,V=.6,I=.03,z=.15,Y=.4;let Q,pe,xe;if(k<.4){const ye=k/.4;Q=En(H,N,ye),pe=En(q,X,ye),xe=En(K,V,ye)}else{const ye=(k-.4)/.6;Q=En(N,I,ye),pe=En(X,z,ye),xe=En(V,Y,ye)}return Q=Wn(Q*C),pe=Wn(pe*C),xe=Wn(xe*C),[Q,pe,xe]}const D=Wn((b-s)*3);let te=.3,ie=.3,ae=.2;if(he>.6||U<.2&&B>.4||D>.75){const k=Wn(Math.max(he,D>.75?1:0));te=En(.85,.95,k),ie=En(.88,.96,k),ae=En(.92,.98,k)}else if(U<.25)te=.55,ie=.58,ae=.52;else if(U<.4&&B>.35)te=.2,ie=.35,ae=.22;else if(B<.25||U>.65&&B<.35){const k=1-B;te=En(.7,.85,k),ie=En(.6,.7,k),ae=En(.35,.45,k)}else B<.5?(te=.58,ie=.62,ae=.35):U>=.4&&U<.65&&B>=.5?(te=.25,ie=.48,ae=.22):U>=.65&&B>=.6?(te=.1,ie=.4,ae=.15):(te=.35,ie=.5,ae=.28);if(D>.3){const k=(D-.3)/.7;te=En(te,.7,k*.35),ie=En(ie,.65,k*.35),ae=En(ae,.6,k*.35)}return te=Wn(te*C),ie=Wn(ie*C),ae=Wn(ae*C),!G&&x.countryId!==void 0&&x.countryId!==null&&[S>0?o[(S-1)*e+E]?.countryId:null,S<t-1?o[(S+1)*e+E]?.countryId:null,o[S*e+u(E-1)]?.countryId,o[S*e+u(E+1)]?.countryId].some(H=>H!==void 0&&H!==x.countryId)&&(te=te*.4,ie=ie*.4,ae=ae*.4),[te,ie,ae]}function p(m,_){return l(f(m,_))}const g=Ax(e,t,(m,_)=>{const S=Math.floor(m),E=Math.floor(_);return p(E,S)});return{width:e,height:t,seaLevel:s,rgba:g,colorAt:(m,_)=>{const S=Math.floor(m),E=Math.floor(_);return p(E,S)},minimapColorAt:(m,_)=>{const S=Math.floor(m),E=Math.floor(_);return p(E,S)},sampleGlobeColor:m=>{const _=Number.isInteger(m)?m:-1,S=_<0?-1:Math.floor(_/e),E=_<0?-1:_%e;return p(S,E)},sampleMinimapColor:m=>{const _=Number.isInteger(m)?m:-1,S=_<0?-1:Math.floor(_/e),E=_<0?-1:_%e;return p(S,E)}}}function so(r){return wx(r)}function Wn(r){return Number.isFinite(r)?r<0?0:r>1?1:r:0}function Hu(r){return Number.isFinite(r)?r<0?0:r>255?255:r:0}function En(r,e,t){return r+(e-r)*t}function Ax(r,e,t){const s=new Uint8ClampedArray(r*e*4);let o=0;for(let l=0;l<e;l++){const u=l+.5;for(let d=0;d<r;d++){const f=d+.5,p=t(f,u);s[o++]=p[0]|0,s[o++]=p[1]|0,s[o++]=p[2]|0,s[o++]=p[3]|0}}return s}function Ot(r,e,t){const s=Math.round(Number.isFinite(r)?r:e);return s<e?e:s>t?t:s}function ti({label:r,children:e}){return O.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:6,marginBottom:14},children:[O.jsx("div",{style:{fontWeight:800,fontSize:12,opacity:.75},children:r}),e]})}function Cx({onGenerate:r,onSave:e,saving:t,disabled:s}){const o=ve.useMemo(()=>({width:256,height:128,seaLevel:50,plateActivity:55,axisTilt:23,planetAge:50,climateVar:35,moistureLevel:50,temperatureOffset:0,erosionIntensity:50,continentCount:5,seed:Math.floor(Math.random()*1e9),styleMode:"EARTHLIKE"}),[]),[l,u]=ve.useState(o);ve.useEffect(()=>{r(l)},[]),ve.useEffect(()=>{const f=setTimeout(()=>{r(l)},300);return()=>clearTimeout(f)},[l]);function d(f,p){u(g=>({...g,[f]:p}))}return O.jsxs("div",{style:{padding:14},children:[O.jsx("div",{style:{fontWeight:900,fontSize:14,marginBottom:12},children:"Generate"}),O.jsx(ti,{label:"Seed",children:O.jsxs("div",{style:{display:"flex",gap:8},children:[O.jsx("input",{value:l.seed,onChange:f=>d("seed",Ot(parseInt(f.target.value||"0",10),0,2147483647)),style:{flex:1,padding:8,borderRadius:10,border:"1px solid rgba(0,0,0,0.15)"},inputMode:"numeric"}),O.jsx("button",{onClick:()=>d("seed",Math.floor(Math.random()*1e9)),style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(0,0,0,0.15)"},children:"Random"})]})}),O.jsx(ti,{label:"Style Mode",children:O.jsxs("select",{value:l.styleMode,onChange:f=>d("styleMode",f.target.value),style:{padding:8,borderRadius:10,border:"1px solid rgba(0,0,0,0.15)"},children:[O.jsx("option",{value:"EARTHLIKE",children:"Earthlike"}),O.jsx("option",{value:"FANTASY",children:"Fantasy"}),O.jsx("option",{value:"STYLIZED",children:"Stylized"}),O.jsx("option",{value:"ALIEN",children:"Alien"})]})}),O.jsxs(ti,{label:`Resolution: ${l.width}×${l.height}`,children:[O.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8},children:[O.jsxs("div",{children:[O.jsx("div",{style:{fontSize:11,opacity:.7,marginBottom:6},children:"Width"}),O.jsx("input",{value:l.width,onChange:f=>d("width",Ot(parseInt(f.target.value||"0",10),64,1024)),style:{width:"100%",padding:8,borderRadius:10,border:"1px solid rgba(0,0,0,0.15)"},inputMode:"numeric"})]}),O.jsxs("div",{children:[O.jsx("div",{style:{fontSize:11,opacity:.7,marginBottom:6},children:"Height"}),O.jsx("input",{value:l.height,onChange:f=>d("height",Ot(parseInt(f.target.value||"0",10),32,1024)),style:{width:"100%",padding:8,borderRadius:10,border:"1px solid rgba(0,0,0,0.15)"},inputMode:"numeric"})]})]}),O.jsx("div",{style:{fontSize:11,opacity:.65,marginTop:6},children:"Note: larger resolutions generate slower (CPU preview)."})]}),O.jsx(ti,{label:`Sea Level (0–100): ${l.seaLevel}`,children:O.jsx("input",{type:"range",min:0,max:100,value:l.seaLevel,onChange:f=>d("seaLevel",Ot(parseInt(f.target.value,10),0,100))})}),O.jsx(ti,{label:`Plate Activity (0–100): ${l.plateActivity}`,children:O.jsx("input",{type:"range",min:0,max:100,value:l.plateActivity,onChange:f=>d("plateActivity",Ot(parseInt(f.target.value,10),0,100))})}),O.jsx(ti,{label:`Axis Tilt (0–100): ${l.axisTilt}`,children:O.jsx("input",{type:"range",min:0,max:100,value:l.axisTilt,onChange:f=>d("axisTilt",Ot(parseInt(f.target.value,10),0,100))})}),O.jsx(ti,{label:`Planet Age (0–100): ${l.planetAge}`,children:O.jsx("input",{type:"range",min:0,max:100,value:l.planetAge,onChange:f=>d("planetAge",Ot(parseInt(f.target.value,10),0,100))})}),O.jsx(ti,{label:`Climate Variability (0–100): ${l.climateVar}`,children:O.jsx("input",{type:"range",min:0,max:100,value:l.climateVar,onChange:f=>d("climateVar",Ot(parseInt(f.target.value,10),0,100))})}),O.jsx(ti,{label:`Moisture Level (0–100): ${l.moistureLevel}`,children:O.jsx("input",{type:"range",min:0,max:100,value:l.moistureLevel,onChange:f=>d("moistureLevel",Ot(parseInt(f.target.value,10),0,100))})}),O.jsx(ti,{label:`Temperature Offset (-50 to +50): ${l.temperatureOffset>0?"+":""}${l.temperatureOffset}`,children:O.jsx("input",{type:"range",min:-50,max:50,value:l.temperatureOffset,onChange:f=>d("temperatureOffset",Ot(parseInt(f.target.value,10),-50,50))})}),O.jsx(ti,{label:`Erosion Intensity (0–100): ${l.erosionIntensity}`,children:O.jsx("input",{type:"range",min:0,max:100,value:l.erosionIntensity,onChange:f=>d("erosionIntensity",Ot(parseInt(f.target.value,10),0,100))})}),O.jsx(ti,{label:`Continent Count (1–12): ${l.continentCount}`,children:O.jsx("input",{type:"range",min:1,max:12,value:l.continentCount,onChange:f=>d("continentCount",Ot(parseInt(f.target.value,10),1,12))})}),O.jsxs("div",{style:{display:"flex",gap:10,marginTop:16},children:[O.jsx("button",{onClick:()=>r({...l,width:Ot(l.width,64,1024),height:Ot(l.height,32,1024),seaLevel:Ot(l.seaLevel,0,100),plateActivity:Ot(l.plateActivity,0,100),axisTilt:Ot(l.axisTilt,0,100),planetAge:Ot(l.planetAge,0,100),climateVar:Ot(l.climateVar,0,100),moistureLevel:Ot(l.moistureLevel,0,100),temperatureOffset:Ot(l.temperatureOffset,-50,50),erosionIntensity:Ot(l.erosionIntensity,0,100),continentCount:Ot(l.continentCount,1,12),seed:typeof l.seed=="string"?l.seed:Ot(l.seed,0,2147483647),styleMode:l.styleMode}),style:{flex:1,padding:"10px 12px",borderRadius:12,border:"1px solid rgba(0,0,0,0.15)",fontWeight:900},children:"Generate"}),O.jsx("button",{onClick:e,disabled:s||t,style:{flex:1,padding:"10px 12px",borderRadius:12,border:"1px solid rgba(0,0,0,0.15)",fontWeight:900,opacity:s||t?.5:1,cursor:s||t?"not-allowed":"pointer"},children:t?"Saving…":"Save → Create"})]}),O.jsx("div",{style:{fontSize:11,opacity:.65,marginTop:10,lineHeight:1.35},children:"Seed + parameters determine the generated world. After Save, Create opens the saved snapshot."})]})}const kd="160",Rx=0,Op=1,bx=2,Rg=1,Lx=2,Vi=3,Rr=0,kn=1,Wi=2,wr=0,Ks=1,Fp=2,kp=3,Bp=4,Px=5,Jr=100,Dx=101,Ix=102,zp=103,Hp=104,Nx=200,Ux=201,Ox=202,Fx=203,wd=204,Ad=205,kx=206,Bx=207,zx=208,Hx=209,Gx=210,Vx=211,Wx=212,jx=213,Xx=214,Yx=0,qx=1,$x=2,Gl=3,Kx=4,Zx=5,Qx=6,Jx=7,bg=0,ey=1,ty=2,Ar=0,ny=1,iy=2,ry=3,sy=4,oy=5,ay=6,Lg=300,Js=301,eo=302,Cd=303,Rd=304,Zl=306,Vl=1e3,ri=1001,bd=1002,wn=1003,Gp=1004,Gu=1005,Yn=1006,ly=1007,to=1008,Cr=1009,cy=1010,uy=1011,Bd=1012,Pg=1013,Er=1014,Tr=1015,ea=1016,Dg=1017,Ig=1018,is=1020,dy=1021,vi=1023,fy=1024,hy=1025,rs=1026,no=1027,py=1028,Ng=1029,my=1030,Ug=1031,Og=1033,Vu=33776,Wu=33777,ju=33778,Xu=33779,Vp=35840,Wp=35841,jp=35842,Xp=35843,Fg=36196,Yp=37492,qp=37496,$p=37808,Kp=37809,Zp=37810,Qp=37811,Jp=37812,em=37813,tm=37814,nm=37815,im=37816,rm=37817,sm=37818,om=37819,am=37820,lm=37821,Yu=36492,cm=36494,um=36495,gy=36283,dm=36284,fm=36285,hm=36286,kg=3e3,ss=3001,vy=3200,_y=3201,Bg=0,xy=1,si="",cn="srgb",qi="srgb-linear",zd="display-p3",Ql="display-p3-linear",Wl="linear",It="srgb",jl="rec709",Xl="p3",Ps=7680,pm=519,yy=512,Sy=513,My=514,zg=515,Ey=516,Ty=517,wy=518,Ay=519,mm=35044,gm="300 es",Ld=1035,Xi=2e3,Yl=2001;class oo{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].indexOf(t)===-1&&s[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const s=this._listeners;return s[e]!==void 0&&s[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const o=this._listeners[e];if(o!==void 0){const l=o.indexOf(t);l!==-1&&o.splice(l,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const s=this._listeners[e.type];if(s!==void 0){e.target=this;const o=s.slice(0);for(let l=0,u=o.length;l<u;l++)o[l].call(this,e);e.target=null}}}const gn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],qu=Math.PI/180,Pd=180/Math.PI;function ra(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(gn[r&255]+gn[r>>8&255]+gn[r>>16&255]+gn[r>>24&255]+"-"+gn[e&255]+gn[e>>8&255]+"-"+gn[e>>16&15|64]+gn[e>>24&255]+"-"+gn[t&63|128]+gn[t>>8&255]+"-"+gn[t>>16&255]+gn[t>>24&255]+gn[s&255]+gn[s>>8&255]+gn[s>>16&255]+gn[s>>24&255]).toLowerCase()}function Fn(r,e,t){return Math.max(e,Math.min(t,r))}function Cy(r,e){return(r%e+e)%e}function $u(r,e,t){return(1-t)*r+t*e}function vm(r){return(r&r-1)===0&&r!==0}function Dd(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Wo(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Un(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class Et{constructor(e=0,t=0){Et.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,s=this.y,o=e.elements;return this.x=o[0]*t+o[3]*s+o[6],this.y=o[1]*t+o[4]*s+o[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(e,Math.min(t,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const s=this.dot(e)/t;return Math.acos(Fn(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,s=this.y-e.y;return t*t+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const s=Math.cos(t),o=Math.sin(t),l=this.x-e.x,u=this.y-e.y;return this.x=l*s-u*o+e.x,this.y=l*o+u*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class mt{constructor(e,t,s,o,l,u,d,f,p){mt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,s,o,l,u,d,f,p)}set(e,t,s,o,l,u,d,f,p){const g=this.elements;return g[0]=e,g[1]=o,g[2]=d,g[3]=t,g[4]=l,g[5]=f,g[6]=s,g[7]=u,g[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,s=e.elements;return t[0]=s[0],t[1]=s[1],t[2]=s[2],t[3]=s[3],t[4]=s[4],t[5]=s[5],t[6]=s[6],t[7]=s[7],t[8]=s[8],this}extractBasis(e,t,s){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const s=e.elements,o=t.elements,l=this.elements,u=s[0],d=s[3],f=s[6],p=s[1],g=s[4],m=s[7],_=s[2],S=s[5],E=s[8],M=o[0],x=o[3],y=o[6],w=o[1],R=o[4],b=o[7],G=o[2],B=o[5],U=o[8];return l[0]=u*M+d*w+f*G,l[3]=u*x+d*R+f*B,l[6]=u*y+d*b+f*U,l[1]=p*M+g*w+m*G,l[4]=p*x+g*R+m*B,l[7]=p*y+g*b+m*U,l[2]=_*M+S*w+E*G,l[5]=_*x+S*R+E*B,l[8]=_*y+S*b+E*U,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],s=e[1],o=e[2],l=e[3],u=e[4],d=e[5],f=e[6],p=e[7],g=e[8];return t*u*g-t*d*p-s*l*g+s*d*f+o*l*p-o*u*f}invert(){const e=this.elements,t=e[0],s=e[1],o=e[2],l=e[3],u=e[4],d=e[5],f=e[6],p=e[7],g=e[8],m=g*u-d*p,_=d*f-g*l,S=p*l-u*f,E=t*m+s*_+o*S;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/E;return e[0]=m*M,e[1]=(o*p-g*s)*M,e[2]=(d*s-o*u)*M,e[3]=_*M,e[4]=(g*t-o*f)*M,e[5]=(o*l-d*t)*M,e[6]=S*M,e[7]=(s*f-p*t)*M,e[8]=(u*t-s*l)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,s,o,l,u,d){const f=Math.cos(l),p=Math.sin(l);return this.set(s*f,s*p,-s*(f*u+p*d)+u+e,-o*p,o*f,-o*(-p*u+f*d)+d+t,0,0,1),this}scale(e,t){return this.premultiply(Ku.makeScale(e,t)),this}rotate(e){return this.premultiply(Ku.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ku.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),s=Math.sin(e);return this.set(t,-s,0,s,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,s=e.elements;for(let o=0;o<9;o++)if(t[o]!==s[o])return!1;return!0}fromArray(e,t=0){for(let s=0;s<9;s++)this.elements[s]=e[s+t];return this}toArray(e=[],t=0){const s=this.elements;return e[t]=s[0],e[t+1]=s[1],e[t+2]=s[2],e[t+3]=s[3],e[t+4]=s[4],e[t+5]=s[5],e[t+6]=s[6],e[t+7]=s[7],e[t+8]=s[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ku=new mt;function Hg(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function ql(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Ry(){const r=ql("canvas");return r.style.display="block",r}const _m={};function $o(r){r in _m||(_m[r]=!0,console.warn(r))}const xm=new mt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ym=new mt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),_l={[qi]:{transfer:Wl,primaries:jl,toReference:r=>r,fromReference:r=>r},[cn]:{transfer:It,primaries:jl,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[Ql]:{transfer:Wl,primaries:Xl,toReference:r=>r.applyMatrix3(ym),fromReference:r=>r.applyMatrix3(xm)},[zd]:{transfer:It,primaries:Xl,toReference:r=>r.convertSRGBToLinear().applyMatrix3(ym),fromReference:r=>r.applyMatrix3(xm).convertLinearToSRGB()}},by=new Set([qi,Ql]),Ct={enabled:!0,_workingColorSpace:qi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!by.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;const s=_l[e].toReference,o=_l[t].fromReference;return o(s(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this._workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this._workingColorSpace)},getPrimaries:function(r){return _l[r].primaries},getTransfer:function(r){return r===si?Wl:_l[r].transfer}};function Zs(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Zu(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Ds;class Gg{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ds===void 0&&(Ds=ql("canvas")),Ds.width=e.width,Ds.height=e.height;const s=Ds.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),t=Ds}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ql("canvas");t.width=e.width,t.height=e.height;const s=t.getContext("2d");s.drawImage(e,0,0,e.width,e.height);const o=s.getImageData(0,0,e.width,e.height),l=o.data;for(let u=0;u<l.length;u++)l[u]=Zs(l[u]/255)*255;return s.putImageData(o,0,0),t}else if(e.data){const t=e.data.slice(0);for(let s=0;s<t.length;s++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[s]=Math.floor(Zs(t[s]/255)*255):t[s]=Zs(t[s]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ly=0;class Vg{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ly++}),this.uuid=ra(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const s={uuid:this.uuid,url:""},o=this.data;if(o!==null){let l;if(Array.isArray(o)){l=[];for(let u=0,d=o.length;u<d;u++)o[u].isDataTexture?l.push(Qu(o[u].image)):l.push(Qu(o[u]))}else l=Qu(o);s.url=l}return t||(e.images[this.uuid]=s),s}}function Qu(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Gg.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Py=0;class Bn extends oo{constructor(e=Bn.DEFAULT_IMAGE,t=Bn.DEFAULT_MAPPING,s=ri,o=ri,l=Yn,u=to,d=vi,f=Cr,p=Bn.DEFAULT_ANISOTROPY,g=si){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Py++}),this.uuid=ra(),this.name="",this.source=new Vg(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=s,this.wrapT=o,this.magFilter=l,this.minFilter=u,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=f,this.offset=new Et(0,0),this.repeat=new Et(1,1),this.center=new Et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new mt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof g=="string"?this.colorSpace=g:($o("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=g===ss?cn:si),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const s={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),t||(e.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Lg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Vl:e.x=e.x-Math.floor(e.x);break;case ri:e.x=e.x<0?0:1;break;case bd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Vl:e.y=e.y-Math.floor(e.y);break;case ri:e.y=e.y<0?0:1;break;case bd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return $o("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===cn?ss:kg}set encoding(e){$o("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===ss?cn:si}}Bn.DEFAULT_IMAGE=null;Bn.DEFAULT_MAPPING=Lg;Bn.DEFAULT_ANISOTROPY=1;class sn{constructor(e=0,t=0,s=0,o=1){sn.prototype.isVector4=!0,this.x=e,this.y=t,this.z=s,this.w=o}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,s,o){return this.x=e,this.y=t,this.z=s,this.w=o,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,s=this.y,o=this.z,l=this.w,u=e.elements;return this.x=u[0]*t+u[4]*s+u[8]*o+u[12]*l,this.y=u[1]*t+u[5]*s+u[9]*o+u[13]*l,this.z=u[2]*t+u[6]*s+u[10]*o+u[14]*l,this.w=u[3]*t+u[7]*s+u[11]*o+u[15]*l,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,s,o,l;const f=e.elements,p=f[0],g=f[4],m=f[8],_=f[1],S=f[5],E=f[9],M=f[2],x=f[6],y=f[10];if(Math.abs(g-_)<.01&&Math.abs(m-M)<.01&&Math.abs(E-x)<.01){if(Math.abs(g+_)<.1&&Math.abs(m+M)<.1&&Math.abs(E+x)<.1&&Math.abs(p+S+y-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const R=(p+1)/2,b=(S+1)/2,G=(y+1)/2,B=(g+_)/4,U=(m+M)/4,he=(E+x)/4;return R>b&&R>G?R<.01?(s=0,o=.707106781,l=.707106781):(s=Math.sqrt(R),o=B/s,l=U/s):b>G?b<.01?(s=.707106781,o=0,l=.707106781):(o=Math.sqrt(b),s=B/o,l=he/o):G<.01?(s=.707106781,o=.707106781,l=0):(l=Math.sqrt(G),s=U/l,o=he/l),this.set(s,o,l,t),this}let w=Math.sqrt((x-E)*(x-E)+(m-M)*(m-M)+(_-g)*(_-g));return Math.abs(w)<.001&&(w=1),this.x=(x-E)/w,this.y=(m-M)/w,this.z=(_-g)/w,this.w=Math.acos((p+S+y-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(e,Math.min(t,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this.z=e.z+(t.z-e.z)*s,this.w=e.w+(t.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Dy extends oo{constructor(e=1,t=1,s={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new sn(0,0,e,t),this.scissorTest=!1,this.viewport=new sn(0,0,e,t);const o={width:e,height:t,depth:1};s.encoding!==void 0&&($o("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),s.colorSpace=s.encoding===ss?cn:si),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Yn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},s),this.texture=new Bn(o,s.mapping,s.wrapS,s.wrapT,s.magFilter,s.minFilter,s.format,s.type,s.anisotropy,s.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=s.generateMipmaps,this.texture.internalFormat=s.internalFormat,this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.depthTexture=s.depthTexture,this.samples=s.samples}setSize(e,t,s=1){(this.width!==e||this.height!==t||this.depth!==s)&&(this.width=e,this.height=t,this.depth=s,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=s,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Vg(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class os extends Dy{constructor(e=1,t=1,s={}){super(e,t,s),this.isWebGLRenderTarget=!0}}class Wg extends Bn{constructor(e=null,t=1,s=1,o=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:s,depth:o},this.magFilter=wn,this.minFilter=wn,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Iy extends Bn{constructor(e=null,t=1,s=1,o=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:s,depth:o},this.magFilter=wn,this.minFilter=wn,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class sa{constructor(e=0,t=0,s=0,o=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=s,this._w=o}static slerpFlat(e,t,s,o,l,u,d){let f=s[o+0],p=s[o+1],g=s[o+2],m=s[o+3];const _=l[u+0],S=l[u+1],E=l[u+2],M=l[u+3];if(d===0){e[t+0]=f,e[t+1]=p,e[t+2]=g,e[t+3]=m;return}if(d===1){e[t+0]=_,e[t+1]=S,e[t+2]=E,e[t+3]=M;return}if(m!==M||f!==_||p!==S||g!==E){let x=1-d;const y=f*_+p*S+g*E+m*M,w=y>=0?1:-1,R=1-y*y;if(R>Number.EPSILON){const G=Math.sqrt(R),B=Math.atan2(G,y*w);x=Math.sin(x*B)/G,d=Math.sin(d*B)/G}const b=d*w;if(f=f*x+_*b,p=p*x+S*b,g=g*x+E*b,m=m*x+M*b,x===1-d){const G=1/Math.sqrt(f*f+p*p+g*g+m*m);f*=G,p*=G,g*=G,m*=G}}e[t]=f,e[t+1]=p,e[t+2]=g,e[t+3]=m}static multiplyQuaternionsFlat(e,t,s,o,l,u){const d=s[o],f=s[o+1],p=s[o+2],g=s[o+3],m=l[u],_=l[u+1],S=l[u+2],E=l[u+3];return e[t]=d*E+g*m+f*S-p*_,e[t+1]=f*E+g*_+p*m-d*S,e[t+2]=p*E+g*S+d*_-f*m,e[t+3]=g*E-d*m-f*_-p*S,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,s,o){return this._x=e,this._y=t,this._z=s,this._w=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const s=e._x,o=e._y,l=e._z,u=e._order,d=Math.cos,f=Math.sin,p=d(s/2),g=d(o/2),m=d(l/2),_=f(s/2),S=f(o/2),E=f(l/2);switch(u){case"XYZ":this._x=_*g*m+p*S*E,this._y=p*S*m-_*g*E,this._z=p*g*E+_*S*m,this._w=p*g*m-_*S*E;break;case"YXZ":this._x=_*g*m+p*S*E,this._y=p*S*m-_*g*E,this._z=p*g*E-_*S*m,this._w=p*g*m+_*S*E;break;case"ZXY":this._x=_*g*m-p*S*E,this._y=p*S*m+_*g*E,this._z=p*g*E+_*S*m,this._w=p*g*m-_*S*E;break;case"ZYX":this._x=_*g*m-p*S*E,this._y=p*S*m+_*g*E,this._z=p*g*E-_*S*m,this._w=p*g*m+_*S*E;break;case"YZX":this._x=_*g*m+p*S*E,this._y=p*S*m+_*g*E,this._z=p*g*E-_*S*m,this._w=p*g*m-_*S*E;break;case"XZY":this._x=_*g*m-p*S*E,this._y=p*S*m-_*g*E,this._z=p*g*E+_*S*m,this._w=p*g*m+_*S*E;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+u)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const s=t/2,o=Math.sin(s);return this._x=e.x*o,this._y=e.y*o,this._z=e.z*o,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,s=t[0],o=t[4],l=t[8],u=t[1],d=t[5],f=t[9],p=t[2],g=t[6],m=t[10],_=s+d+m;if(_>0){const S=.5/Math.sqrt(_+1);this._w=.25/S,this._x=(g-f)*S,this._y=(l-p)*S,this._z=(u-o)*S}else if(s>d&&s>m){const S=2*Math.sqrt(1+s-d-m);this._w=(g-f)/S,this._x=.25*S,this._y=(o+u)/S,this._z=(l+p)/S}else if(d>m){const S=2*Math.sqrt(1+d-s-m);this._w=(l-p)/S,this._x=(o+u)/S,this._y=.25*S,this._z=(f+g)/S}else{const S=2*Math.sqrt(1+m-s-d);this._w=(u-o)/S,this._x=(l+p)/S,this._y=(f+g)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let s=e.dot(t)+1;return s<Number.EPSILON?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Fn(this.dot(e),-1,1)))}rotateTowards(e,t){const s=this.angleTo(e);if(s===0)return this;const o=Math.min(1,t/s);return this.slerp(e,o),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const s=e._x,o=e._y,l=e._z,u=e._w,d=t._x,f=t._y,p=t._z,g=t._w;return this._x=s*g+u*d+o*p-l*f,this._y=o*g+u*f+l*d-s*p,this._z=l*g+u*p+s*f-o*d,this._w=u*g-s*d-o*f-l*p,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const s=this._x,o=this._y,l=this._z,u=this._w;let d=u*e._w+s*e._x+o*e._y+l*e._z;if(d<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,d=-d):this.copy(e),d>=1)return this._w=u,this._x=s,this._y=o,this._z=l,this;const f=1-d*d;if(f<=Number.EPSILON){const S=1-t;return this._w=S*u+t*this._w,this._x=S*s+t*this._x,this._y=S*o+t*this._y,this._z=S*l+t*this._z,this.normalize(),this}const p=Math.sqrt(f),g=Math.atan2(p,d),m=Math.sin((1-t)*g)/p,_=Math.sin(t*g)/p;return this._w=u*m+this._w*_,this._x=s*m+this._x*_,this._y=o*m+this._y*_,this._z=l*m+this._z*_,this._onChangeCallback(),this}slerpQuaternions(e,t,s){return this.copy(e).slerp(t,s)}random(){const e=Math.random(),t=Math.sqrt(1-e),s=Math.sqrt(e),o=2*Math.PI*Math.random(),l=2*Math.PI*Math.random();return this.set(t*Math.cos(o),s*Math.sin(l),s*Math.cos(l),t*Math.sin(o))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class ce{constructor(e=0,t=0,s=0){ce.prototype.isVector3=!0,this.x=e,this.y=t,this.z=s}set(e,t,s){return s===void 0&&(s=this.z),this.x=e,this.y=t,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Sm.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Sm.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,s=this.y,o=this.z,l=e.elements;return this.x=l[0]*t+l[3]*s+l[6]*o,this.y=l[1]*t+l[4]*s+l[7]*o,this.z=l[2]*t+l[5]*s+l[8]*o,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,s=this.y,o=this.z,l=e.elements,u=1/(l[3]*t+l[7]*s+l[11]*o+l[15]);return this.x=(l[0]*t+l[4]*s+l[8]*o+l[12])*u,this.y=(l[1]*t+l[5]*s+l[9]*o+l[13])*u,this.z=(l[2]*t+l[6]*s+l[10]*o+l[14])*u,this}applyQuaternion(e){const t=this.x,s=this.y,o=this.z,l=e.x,u=e.y,d=e.z,f=e.w,p=2*(u*o-d*s),g=2*(d*t-l*o),m=2*(l*s-u*t);return this.x=t+f*p+u*m-d*g,this.y=s+f*g+d*p-l*m,this.z=o+f*m+l*g-u*p,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,s=this.y,o=this.z,l=e.elements;return this.x=l[0]*t+l[4]*s+l[8]*o,this.y=l[1]*t+l[5]*s+l[9]*o,this.z=l[2]*t+l[6]*s+l[10]*o,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(e,Math.min(t,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this.z=e.z+(t.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const s=e.x,o=e.y,l=e.z,u=t.x,d=t.y,f=t.z;return this.x=o*f-l*d,this.y=l*u-s*f,this.z=s*d-o*u,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const s=e.dot(this)/t;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){return Ju.copy(this).projectOnVector(e),this.sub(Ju)}reflect(e){return this.sub(Ju.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const s=this.dot(e)/t;return Math.acos(Fn(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,s=this.y-e.y,o=this.z-e.z;return t*t+s*s+o*o}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,s){const o=Math.sin(t)*e;return this.x=o*Math.sin(s),this.y=Math.cos(t)*e,this.z=o*Math.cos(s),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,s){return this.x=e*Math.sin(t),this.y=s,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),o=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=s,this.z=o,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,s=Math.sqrt(1-e**2);return this.x=s*Math.cos(t),this.y=s*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ju=new ce,Sm=new sa;class oa{constructor(e=new ce(1/0,1/0,1/0),t=new ce(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,s=e.length;t<s;t+=3)this.expandByPoint(hi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,s=e.count;t<s;t++)this.expandByPoint(hi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,s=e.length;t<s;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const s=hi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(s),this.max.copy(e).add(s),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const l=s.getAttribute("position");if(t===!0&&l!==void 0&&e.isInstancedMesh!==!0)for(let u=0,d=l.count;u<d;u++)e.isMesh===!0?e.getVertexPosition(u,hi):hi.fromBufferAttribute(l,u),hi.applyMatrix4(e.matrixWorld),this.expandByPoint(hi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),xl.copy(e.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),xl.copy(s.boundingBox)),xl.applyMatrix4(e.matrixWorld),this.union(xl)}const o=e.children;for(let l=0,u=o.length;l<u;l++)this.expandByObject(o[l],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,hi),hi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,s;return e.normal.x>0?(t=e.normal.x*this.min.x,s=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,s=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,s+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,s+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,s+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,s+=e.normal.z*this.min.z),t<=-e.constant&&s>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(jo),yl.subVectors(this.max,jo),Is.subVectors(e.a,jo),Ns.subVectors(e.b,jo),Us.subVectors(e.c,jo),gr.subVectors(Ns,Is),vr.subVectors(Us,Ns),Yr.subVectors(Is,Us);let t=[0,-gr.z,gr.y,0,-vr.z,vr.y,0,-Yr.z,Yr.y,gr.z,0,-gr.x,vr.z,0,-vr.x,Yr.z,0,-Yr.x,-gr.y,gr.x,0,-vr.y,vr.x,0,-Yr.y,Yr.x,0];return!ed(t,Is,Ns,Us,yl)||(t=[1,0,0,0,1,0,0,0,1],!ed(t,Is,Ns,Us,yl))?!1:(Sl.crossVectors(gr,vr),t=[Sl.x,Sl.y,Sl.z],ed(t,Is,Ns,Us,yl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,hi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(hi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ki[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ki[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ki[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ki[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ki[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ki[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ki[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ki[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ki),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ki=[new ce,new ce,new ce,new ce,new ce,new ce,new ce,new ce],hi=new ce,xl=new oa,Is=new ce,Ns=new ce,Us=new ce,gr=new ce,vr=new ce,Yr=new ce,jo=new ce,yl=new ce,Sl=new ce,qr=new ce;function ed(r,e,t,s,o){for(let l=0,u=r.length-3;l<=u;l+=3){qr.fromArray(r,l);const d=o.x*Math.abs(qr.x)+o.y*Math.abs(qr.y)+o.z*Math.abs(qr.z),f=e.dot(qr),p=t.dot(qr),g=s.dot(qr);if(Math.max(-Math.max(f,p,g),Math.min(f,p,g))>d)return!1}return!0}const Ny=new oa,Xo=new ce,td=new ce;class Hd{constructor(e=new ce,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const s=this.center;t!==void 0?s.copy(t):Ny.setFromPoints(e).getCenter(s);let o=0;for(let l=0,u=e.length;l<u;l++)o=Math.max(o,s.distanceToSquared(e[l]));return this.radius=Math.sqrt(o),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const s=this.center.distanceToSquared(e);return t.copy(e),s>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Xo.subVectors(e,this.center);const t=Xo.lengthSq();if(t>this.radius*this.radius){const s=Math.sqrt(t),o=(s-this.radius)*.5;this.center.addScaledVector(Xo,o/s),this.radius+=o}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(td.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Xo.copy(e.center).add(td)),this.expandByPoint(Xo.copy(e.center).sub(td))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Bi=new ce,nd=new ce,Ml=new ce,_r=new ce,id=new ce,El=new ce,rd=new ce;class Uy{constructor(e=new ce,t=new ce(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Bi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const s=t.dot(this.direction);return s<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Bi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Bi.copy(this.origin).addScaledVector(this.direction,t),Bi.distanceToSquared(e))}distanceSqToSegment(e,t,s,o){nd.copy(e).add(t).multiplyScalar(.5),Ml.copy(t).sub(e).normalize(),_r.copy(this.origin).sub(nd);const l=e.distanceTo(t)*.5,u=-this.direction.dot(Ml),d=_r.dot(this.direction),f=-_r.dot(Ml),p=_r.lengthSq(),g=Math.abs(1-u*u);let m,_,S,E;if(g>0)if(m=u*f-d,_=u*d-f,E=l*g,m>=0)if(_>=-E)if(_<=E){const M=1/g;m*=M,_*=M,S=m*(m+u*_+2*d)+_*(u*m+_+2*f)+p}else _=l,m=Math.max(0,-(u*_+d)),S=-m*m+_*(_+2*f)+p;else _=-l,m=Math.max(0,-(u*_+d)),S=-m*m+_*(_+2*f)+p;else _<=-E?(m=Math.max(0,-(-u*l+d)),_=m>0?-l:Math.min(Math.max(-l,-f),l),S=-m*m+_*(_+2*f)+p):_<=E?(m=0,_=Math.min(Math.max(-l,-f),l),S=_*(_+2*f)+p):(m=Math.max(0,-(u*l+d)),_=m>0?l:Math.min(Math.max(-l,-f),l),S=-m*m+_*(_+2*f)+p);else _=u>0?-l:l,m=Math.max(0,-(u*_+d)),S=-m*m+_*(_+2*f)+p;return s&&s.copy(this.origin).addScaledVector(this.direction,m),o&&o.copy(nd).addScaledVector(Ml,_),S}intersectSphere(e,t){Bi.subVectors(e.center,this.origin);const s=Bi.dot(this.direction),o=Bi.dot(Bi)-s*s,l=e.radius*e.radius;if(o>l)return null;const u=Math.sqrt(l-o),d=s-u,f=s+u;return f<0?null:d<0?this.at(f,t):this.at(d,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(e.normal)+e.constant)/t;return s>=0?s:null}intersectPlane(e,t){const s=this.distanceToPlane(e);return s===null?null:this.at(s,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let s,o,l,u,d,f;const p=1/this.direction.x,g=1/this.direction.y,m=1/this.direction.z,_=this.origin;return p>=0?(s=(e.min.x-_.x)*p,o=(e.max.x-_.x)*p):(s=(e.max.x-_.x)*p,o=(e.min.x-_.x)*p),g>=0?(l=(e.min.y-_.y)*g,u=(e.max.y-_.y)*g):(l=(e.max.y-_.y)*g,u=(e.min.y-_.y)*g),s>u||l>o||((l>s||isNaN(s))&&(s=l),(u<o||isNaN(o))&&(o=u),m>=0?(d=(e.min.z-_.z)*m,f=(e.max.z-_.z)*m):(d=(e.max.z-_.z)*m,f=(e.min.z-_.z)*m),s>f||d>o)||((d>s||s!==s)&&(s=d),(f<o||o!==o)&&(o=f),o<0)?null:this.at(s>=0?s:o,t)}intersectsBox(e){return this.intersectBox(e,Bi)!==null}intersectTriangle(e,t,s,o,l){id.subVectors(t,e),El.subVectors(s,e),rd.crossVectors(id,El);let u=this.direction.dot(rd),d;if(u>0){if(o)return null;d=1}else if(u<0)d=-1,u=-u;else return null;_r.subVectors(this.origin,e);const f=d*this.direction.dot(El.crossVectors(_r,El));if(f<0)return null;const p=d*this.direction.dot(id.cross(_r));if(p<0||f+p>u)return null;const g=-d*_r.dot(rd);return g<0?null:this.at(g/u,l)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Kt{constructor(e,t,s,o,l,u,d,f,p,g,m,_,S,E,M,x){Kt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,s,o,l,u,d,f,p,g,m,_,S,E,M,x)}set(e,t,s,o,l,u,d,f,p,g,m,_,S,E,M,x){const y=this.elements;return y[0]=e,y[4]=t,y[8]=s,y[12]=o,y[1]=l,y[5]=u,y[9]=d,y[13]=f,y[2]=p,y[6]=g,y[10]=m,y[14]=_,y[3]=S,y[7]=E,y[11]=M,y[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Kt().fromArray(this.elements)}copy(e){const t=this.elements,s=e.elements;return t[0]=s[0],t[1]=s[1],t[2]=s[2],t[3]=s[3],t[4]=s[4],t[5]=s[5],t[6]=s[6],t[7]=s[7],t[8]=s[8],t[9]=s[9],t[10]=s[10],t[11]=s[11],t[12]=s[12],t[13]=s[13],t[14]=s[14],t[15]=s[15],this}copyPosition(e){const t=this.elements,s=e.elements;return t[12]=s[12],t[13]=s[13],t[14]=s[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,s){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this}makeBasis(e,t,s){return this.set(e.x,t.x,s.x,0,e.y,t.y,s.y,0,e.z,t.z,s.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,s=e.elements,o=1/Os.setFromMatrixColumn(e,0).length(),l=1/Os.setFromMatrixColumn(e,1).length(),u=1/Os.setFromMatrixColumn(e,2).length();return t[0]=s[0]*o,t[1]=s[1]*o,t[2]=s[2]*o,t[3]=0,t[4]=s[4]*l,t[5]=s[5]*l,t[6]=s[6]*l,t[7]=0,t[8]=s[8]*u,t[9]=s[9]*u,t[10]=s[10]*u,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,s=e.x,o=e.y,l=e.z,u=Math.cos(s),d=Math.sin(s),f=Math.cos(o),p=Math.sin(o),g=Math.cos(l),m=Math.sin(l);if(e.order==="XYZ"){const _=u*g,S=u*m,E=d*g,M=d*m;t[0]=f*g,t[4]=-f*m,t[8]=p,t[1]=S+E*p,t[5]=_-M*p,t[9]=-d*f,t[2]=M-_*p,t[6]=E+S*p,t[10]=u*f}else if(e.order==="YXZ"){const _=f*g,S=f*m,E=p*g,M=p*m;t[0]=_+M*d,t[4]=E*d-S,t[8]=u*p,t[1]=u*m,t[5]=u*g,t[9]=-d,t[2]=S*d-E,t[6]=M+_*d,t[10]=u*f}else if(e.order==="ZXY"){const _=f*g,S=f*m,E=p*g,M=p*m;t[0]=_-M*d,t[4]=-u*m,t[8]=E+S*d,t[1]=S+E*d,t[5]=u*g,t[9]=M-_*d,t[2]=-u*p,t[6]=d,t[10]=u*f}else if(e.order==="ZYX"){const _=u*g,S=u*m,E=d*g,M=d*m;t[0]=f*g,t[4]=E*p-S,t[8]=_*p+M,t[1]=f*m,t[5]=M*p+_,t[9]=S*p-E,t[2]=-p,t[6]=d*f,t[10]=u*f}else if(e.order==="YZX"){const _=u*f,S=u*p,E=d*f,M=d*p;t[0]=f*g,t[4]=M-_*m,t[8]=E*m+S,t[1]=m,t[5]=u*g,t[9]=-d*g,t[2]=-p*g,t[6]=S*m+E,t[10]=_-M*m}else if(e.order==="XZY"){const _=u*f,S=u*p,E=d*f,M=d*p;t[0]=f*g,t[4]=-m,t[8]=p*g,t[1]=_*m+M,t[5]=u*g,t[9]=S*m-E,t[2]=E*m-S,t[6]=d*g,t[10]=M*m+_}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Oy,e,Fy)}lookAt(e,t,s){const o=this.elements;return jn.subVectors(e,t),jn.lengthSq()===0&&(jn.z=1),jn.normalize(),xr.crossVectors(s,jn),xr.lengthSq()===0&&(Math.abs(s.z)===1?jn.x+=1e-4:jn.z+=1e-4,jn.normalize(),xr.crossVectors(s,jn)),xr.normalize(),Tl.crossVectors(jn,xr),o[0]=xr.x,o[4]=Tl.x,o[8]=jn.x,o[1]=xr.y,o[5]=Tl.y,o[9]=jn.y,o[2]=xr.z,o[6]=Tl.z,o[10]=jn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const s=e.elements,o=t.elements,l=this.elements,u=s[0],d=s[4],f=s[8],p=s[12],g=s[1],m=s[5],_=s[9],S=s[13],E=s[2],M=s[6],x=s[10],y=s[14],w=s[3],R=s[7],b=s[11],G=s[15],B=o[0],U=o[4],he=o[8],C=o[12],D=o[1],te=o[5],ie=o[9],ae=o[13],k=o[2],H=o[6],q=o[10],K=o[14],N=o[3],X=o[7],V=o[11],I=o[15];return l[0]=u*B+d*D+f*k+p*N,l[4]=u*U+d*te+f*H+p*X,l[8]=u*he+d*ie+f*q+p*V,l[12]=u*C+d*ae+f*K+p*I,l[1]=g*B+m*D+_*k+S*N,l[5]=g*U+m*te+_*H+S*X,l[9]=g*he+m*ie+_*q+S*V,l[13]=g*C+m*ae+_*K+S*I,l[2]=E*B+M*D+x*k+y*N,l[6]=E*U+M*te+x*H+y*X,l[10]=E*he+M*ie+x*q+y*V,l[14]=E*C+M*ae+x*K+y*I,l[3]=w*B+R*D+b*k+G*N,l[7]=w*U+R*te+b*H+G*X,l[11]=w*he+R*ie+b*q+G*V,l[15]=w*C+R*ae+b*K+G*I,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],s=e[4],o=e[8],l=e[12],u=e[1],d=e[5],f=e[9],p=e[13],g=e[2],m=e[6],_=e[10],S=e[14],E=e[3],M=e[7],x=e[11],y=e[15];return E*(+l*f*m-o*p*m-l*d*_+s*p*_+o*d*S-s*f*S)+M*(+t*f*S-t*p*_+l*u*_-o*u*S+o*p*g-l*f*g)+x*(+t*p*m-t*d*S-l*u*m+s*u*S+l*d*g-s*p*g)+y*(-o*d*g-t*f*m+t*d*_+o*u*m-s*u*_+s*f*g)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,s){const o=this.elements;return e.isVector3?(o[12]=e.x,o[13]=e.y,o[14]=e.z):(o[12]=e,o[13]=t,o[14]=s),this}invert(){const e=this.elements,t=e[0],s=e[1],o=e[2],l=e[3],u=e[4],d=e[5],f=e[6],p=e[7],g=e[8],m=e[9],_=e[10],S=e[11],E=e[12],M=e[13],x=e[14],y=e[15],w=m*x*p-M*_*p+M*f*S-d*x*S-m*f*y+d*_*y,R=E*_*p-g*x*p-E*f*S+u*x*S+g*f*y-u*_*y,b=g*M*p-E*m*p+E*d*S-u*M*S-g*d*y+u*m*y,G=E*m*f-g*M*f-E*d*_+u*M*_+g*d*x-u*m*x,B=t*w+s*R+o*b+l*G;if(B===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/B;return e[0]=w*U,e[1]=(M*_*l-m*x*l-M*o*S+s*x*S+m*o*y-s*_*y)*U,e[2]=(d*x*l-M*f*l+M*o*p-s*x*p-d*o*y+s*f*y)*U,e[3]=(m*f*l-d*_*l-m*o*p+s*_*p+d*o*S-s*f*S)*U,e[4]=R*U,e[5]=(g*x*l-E*_*l+E*o*S-t*x*S-g*o*y+t*_*y)*U,e[6]=(E*f*l-u*x*l-E*o*p+t*x*p+u*o*y-t*f*y)*U,e[7]=(u*_*l-g*f*l+g*o*p-t*_*p-u*o*S+t*f*S)*U,e[8]=b*U,e[9]=(E*m*l-g*M*l-E*s*S+t*M*S+g*s*y-t*m*y)*U,e[10]=(u*M*l-E*d*l+E*s*p-t*M*p-u*s*y+t*d*y)*U,e[11]=(g*d*l-u*m*l-g*s*p+t*m*p+u*s*S-t*d*S)*U,e[12]=G*U,e[13]=(g*M*o-E*m*o+E*s*_-t*M*_-g*s*x+t*m*x)*U,e[14]=(E*d*o-u*M*o-E*s*f+t*M*f+u*s*x-t*d*x)*U,e[15]=(u*m*o-g*d*o+g*s*f-t*m*f-u*s*_+t*d*_)*U,this}scale(e){const t=this.elements,s=e.x,o=e.y,l=e.z;return t[0]*=s,t[4]*=o,t[8]*=l,t[1]*=s,t[5]*=o,t[9]*=l,t[2]*=s,t[6]*=o,t[10]*=l,t[3]*=s,t[7]*=o,t[11]*=l,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],o=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,s,o))}makeTranslation(e,t,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,s,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,t,-s,0,0,s,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),s=Math.sin(e);return this.set(t,0,s,0,0,1,0,0,-s,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),s=Math.sin(e);return this.set(t,-s,0,0,s,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const s=Math.cos(t),o=Math.sin(t),l=1-s,u=e.x,d=e.y,f=e.z,p=l*u,g=l*d;return this.set(p*u+s,p*d-o*f,p*f+o*d,0,p*d+o*f,g*d+s,g*f-o*u,0,p*f-o*d,g*f+o*u,l*f*f+s,0,0,0,0,1),this}makeScale(e,t,s){return this.set(e,0,0,0,0,t,0,0,0,0,s,0,0,0,0,1),this}makeShear(e,t,s,o,l,u){return this.set(1,s,l,0,e,1,u,0,t,o,1,0,0,0,0,1),this}compose(e,t,s){const o=this.elements,l=t._x,u=t._y,d=t._z,f=t._w,p=l+l,g=u+u,m=d+d,_=l*p,S=l*g,E=l*m,M=u*g,x=u*m,y=d*m,w=f*p,R=f*g,b=f*m,G=s.x,B=s.y,U=s.z;return o[0]=(1-(M+y))*G,o[1]=(S+b)*G,o[2]=(E-R)*G,o[3]=0,o[4]=(S-b)*B,o[5]=(1-(_+y))*B,o[6]=(x+w)*B,o[7]=0,o[8]=(E+R)*U,o[9]=(x-w)*U,o[10]=(1-(_+M))*U,o[11]=0,o[12]=e.x,o[13]=e.y,o[14]=e.z,o[15]=1,this}decompose(e,t,s){const o=this.elements;let l=Os.set(o[0],o[1],o[2]).length();const u=Os.set(o[4],o[5],o[6]).length(),d=Os.set(o[8],o[9],o[10]).length();this.determinant()<0&&(l=-l),e.x=o[12],e.y=o[13],e.z=o[14],pi.copy(this);const p=1/l,g=1/u,m=1/d;return pi.elements[0]*=p,pi.elements[1]*=p,pi.elements[2]*=p,pi.elements[4]*=g,pi.elements[5]*=g,pi.elements[6]*=g,pi.elements[8]*=m,pi.elements[9]*=m,pi.elements[10]*=m,t.setFromRotationMatrix(pi),s.x=l,s.y=u,s.z=d,this}makePerspective(e,t,s,o,l,u,d=Xi){const f=this.elements,p=2*l/(t-e),g=2*l/(s-o),m=(t+e)/(t-e),_=(s+o)/(s-o);let S,E;if(d===Xi)S=-(u+l)/(u-l),E=-2*u*l/(u-l);else if(d===Yl)S=-u/(u-l),E=-u*l/(u-l);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return f[0]=p,f[4]=0,f[8]=m,f[12]=0,f[1]=0,f[5]=g,f[9]=_,f[13]=0,f[2]=0,f[6]=0,f[10]=S,f[14]=E,f[3]=0,f[7]=0,f[11]=-1,f[15]=0,this}makeOrthographic(e,t,s,o,l,u,d=Xi){const f=this.elements,p=1/(t-e),g=1/(s-o),m=1/(u-l),_=(t+e)*p,S=(s+o)*g;let E,M;if(d===Xi)E=(u+l)*m,M=-2*m;else if(d===Yl)E=l*m,M=-1*m;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return f[0]=2*p,f[4]=0,f[8]=0,f[12]=-_,f[1]=0,f[5]=2*g,f[9]=0,f[13]=-S,f[2]=0,f[6]=0,f[10]=M,f[14]=-E,f[3]=0,f[7]=0,f[11]=0,f[15]=1,this}equals(e){const t=this.elements,s=e.elements;for(let o=0;o<16;o++)if(t[o]!==s[o])return!1;return!0}fromArray(e,t=0){for(let s=0;s<16;s++)this.elements[s]=e[s+t];return this}toArray(e=[],t=0){const s=this.elements;return e[t]=s[0],e[t+1]=s[1],e[t+2]=s[2],e[t+3]=s[3],e[t+4]=s[4],e[t+5]=s[5],e[t+6]=s[6],e[t+7]=s[7],e[t+8]=s[8],e[t+9]=s[9],e[t+10]=s[10],e[t+11]=s[11],e[t+12]=s[12],e[t+13]=s[13],e[t+14]=s[14],e[t+15]=s[15],e}}const Os=new ce,pi=new Kt,Oy=new ce(0,0,0),Fy=new ce(1,1,1),xr=new ce,Tl=new ce,jn=new ce,Mm=new Kt,Em=new sa;class Jl{constructor(e=0,t=0,s=0,o=Jl.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=s,this._order=o}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,s,o=this._order){return this._x=e,this._y=t,this._z=s,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,s=!0){const o=e.elements,l=o[0],u=o[4],d=o[8],f=o[1],p=o[5],g=o[9],m=o[2],_=o[6],S=o[10];switch(t){case"XYZ":this._y=Math.asin(Fn(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-g,S),this._z=Math.atan2(-u,l)):(this._x=Math.atan2(_,p),this._z=0);break;case"YXZ":this._x=Math.asin(-Fn(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(d,S),this._z=Math.atan2(f,p)):(this._y=Math.atan2(-m,l),this._z=0);break;case"ZXY":this._x=Math.asin(Fn(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(-m,S),this._z=Math.atan2(-u,p)):(this._y=0,this._z=Math.atan2(f,l));break;case"ZYX":this._y=Math.asin(-Fn(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(_,S),this._z=Math.atan2(f,l)):(this._x=0,this._z=Math.atan2(-u,p));break;case"YZX":this._z=Math.asin(Fn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(-g,p),this._y=Math.atan2(-m,l)):(this._x=0,this._y=Math.atan2(d,S));break;case"XZY":this._z=Math.asin(-Fn(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(_,p),this._y=Math.atan2(d,l)):(this._x=Math.atan2(-g,S),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,s===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,s){return Mm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Mm,t,s)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Em.setFromEuler(this),this.setFromQuaternion(Em,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Jl.DEFAULT_ORDER="XYZ";class jg{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let ky=0;const Tm=new ce,Fs=new sa,zi=new Kt,wl=new ce,Yo=new ce,By=new ce,zy=new sa,wm=new ce(1,0,0),Am=new ce(0,1,0),Cm=new ce(0,0,1),Hy={type:"added"},Gy={type:"removed"};class un extends oo{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ky++}),this.uuid=ra(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=un.DEFAULT_UP.clone();const e=new ce,t=new Jl,s=new sa,o=new ce(1,1,1);function l(){s.setFromEuler(t,!1)}function u(){t.setFromQuaternion(s,void 0,!1)}t._onChange(l),s._onChange(u),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new Kt},normalMatrix:{value:new mt}}),this.matrix=new Kt,this.matrixWorld=new Kt,this.matrixAutoUpdate=un.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=un.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new jg,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Fs.setFromAxisAngle(e,t),this.quaternion.multiply(Fs),this}rotateOnWorldAxis(e,t){return Fs.setFromAxisAngle(e,t),this.quaternion.premultiply(Fs),this}rotateX(e){return this.rotateOnAxis(wm,e)}rotateY(e){return this.rotateOnAxis(Am,e)}rotateZ(e){return this.rotateOnAxis(Cm,e)}translateOnAxis(e,t){return Tm.copy(e).applyQuaternion(this.quaternion),this.position.add(Tm.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(wm,e)}translateY(e){return this.translateOnAxis(Am,e)}translateZ(e){return this.translateOnAxis(Cm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(zi.copy(this.matrixWorld).invert())}lookAt(e,t,s){e.isVector3?wl.copy(e):wl.set(e,t,s);const o=this.parent;this.updateWorldMatrix(!0,!1),Yo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?zi.lookAt(Yo,wl,this.up):zi.lookAt(wl,Yo,this.up),this.quaternion.setFromRotationMatrix(zi),o&&(zi.extractRotation(o.matrixWorld),Fs.setFromRotationMatrix(zi),this.quaternion.premultiply(Fs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Hy)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Gy)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),zi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),zi.multiply(e.parent.matrixWorld)),e.applyMatrix4(zi),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let s=0,o=this.children.length;s<o;s++){const u=this.children[s].getObjectByProperty(e,t);if(u!==void 0)return u}}getObjectsByProperty(e,t,s=[]){this[e]===t&&s.push(this);const o=this.children;for(let l=0,u=o.length;l<u;l++)o[l].getObjectsByProperty(e,t,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yo,e,By),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yo,zy,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let s=0,o=t.length;s<o;s++)t[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let s=0,o=t.length;s<o;s++)t[s].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let s=0,o=t.length;s<o;s++){const l=t[s];(l.matrixWorldAutoUpdate===!0||e===!0)&&l.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const s=this.parent;if(e===!0&&s!==null&&s.matrixWorldAutoUpdate===!0&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const o=this.children;for(let l=0,u=o.length;l<u;l++){const d=o[l];d.matrixWorldAutoUpdate===!0&&d.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",s={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const o={};o.uuid=this.uuid,o.type=this.type,this.name!==""&&(o.name=this.name),this.castShadow===!0&&(o.castShadow=!0),this.receiveShadow===!0&&(o.receiveShadow=!0),this.visible===!1&&(o.visible=!1),this.frustumCulled===!1&&(o.frustumCulled=!1),this.renderOrder!==0&&(o.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(o.matrixAutoUpdate=!1),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.visibility=this._visibility,o.active=this._active,o.bounds=this._bounds.map(d=>({boxInitialized:d.boxInitialized,boxMin:d.box.min.toArray(),boxMax:d.box.max.toArray(),sphereInitialized:d.sphereInitialized,sphereRadius:d.sphere.radius,sphereCenter:d.sphere.center.toArray()})),o.maxGeometryCount=this._maxGeometryCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.geometryCount=this._geometryCount,o.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(o.boundingSphere={center:o.boundingSphere.center.toArray(),radius:o.boundingSphere.radius}),this.boundingBox!==null&&(o.boundingBox={min:o.boundingBox.min.toArray(),max:o.boundingBox.max.toArray()}));function l(d,f){return d[f.uuid]===void 0&&(d[f.uuid]=f.toJSON(e)),f.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=l(e.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const f=d.shapes;if(Array.isArray(f))for(let p=0,g=f.length;p<g;p++){const m=f[p];l(e.shapes,m)}else l(e.shapes,f)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(l(e.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let f=0,p=this.material.length;f<p;f++)d.push(l(e.materials,this.material[f]));o.material=d}else o.material=l(e.materials,this.material);if(this.children.length>0){o.children=[];for(let d=0;d<this.children.length;d++)o.children.push(this.children[d].toJSON(e).object)}if(this.animations.length>0){o.animations=[];for(let d=0;d<this.animations.length;d++){const f=this.animations[d];o.animations.push(l(e.animations,f))}}if(t){const d=u(e.geometries),f=u(e.materials),p=u(e.textures),g=u(e.images),m=u(e.shapes),_=u(e.skeletons),S=u(e.animations),E=u(e.nodes);d.length>0&&(s.geometries=d),f.length>0&&(s.materials=f),p.length>0&&(s.textures=p),g.length>0&&(s.images=g),m.length>0&&(s.shapes=m),_.length>0&&(s.skeletons=_),S.length>0&&(s.animations=S),E.length>0&&(s.nodes=E)}return s.object=o,s;function u(d){const f=[];for(const p in d){const g=d[p];delete g.metadata,f.push(g)}return f}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let s=0;s<e.children.length;s++){const o=e.children[s];this.add(o.clone())}return this}}un.DEFAULT_UP=new ce(0,1,0);un.DEFAULT_MATRIX_AUTO_UPDATE=!0;un.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const mi=new ce,Hi=new ce,sd=new ce,Gi=new ce,ks=new ce,Bs=new ce,Rm=new ce,od=new ce,ad=new ce,ld=new ce;let Al=!1;class gi{constructor(e=new ce,t=new ce,s=new ce){this.a=e,this.b=t,this.c=s}static getNormal(e,t,s,o){o.subVectors(s,t),mi.subVectors(e,t),o.cross(mi);const l=o.lengthSq();return l>0?o.multiplyScalar(1/Math.sqrt(l)):o.set(0,0,0)}static getBarycoord(e,t,s,o,l){mi.subVectors(o,t),Hi.subVectors(s,t),sd.subVectors(e,t);const u=mi.dot(mi),d=mi.dot(Hi),f=mi.dot(sd),p=Hi.dot(Hi),g=Hi.dot(sd),m=u*p-d*d;if(m===0)return l.set(0,0,0),null;const _=1/m,S=(p*f-d*g)*_,E=(u*g-d*f)*_;return l.set(1-S-E,E,S)}static containsPoint(e,t,s,o){return this.getBarycoord(e,t,s,o,Gi)===null?!1:Gi.x>=0&&Gi.y>=0&&Gi.x+Gi.y<=1}static getUV(e,t,s,o,l,u,d,f){return Al===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Al=!0),this.getInterpolation(e,t,s,o,l,u,d,f)}static getInterpolation(e,t,s,o,l,u,d,f){return this.getBarycoord(e,t,s,o,Gi)===null?(f.x=0,f.y=0,"z"in f&&(f.z=0),"w"in f&&(f.w=0),null):(f.setScalar(0),f.addScaledVector(l,Gi.x),f.addScaledVector(u,Gi.y),f.addScaledVector(d,Gi.z),f)}static isFrontFacing(e,t,s,o){return mi.subVectors(s,t),Hi.subVectors(e,t),mi.cross(Hi).dot(o)<0}set(e,t,s){return this.a.copy(e),this.b.copy(t),this.c.copy(s),this}setFromPointsAndIndices(e,t,s,o){return this.a.copy(e[t]),this.b.copy(e[s]),this.c.copy(e[o]),this}setFromAttributeAndIndices(e,t,s,o){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,s),this.c.fromBufferAttribute(e,o),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return mi.subVectors(this.c,this.b),Hi.subVectors(this.a,this.b),mi.cross(Hi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return gi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return gi.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,s,o,l){return Al===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Al=!0),gi.getInterpolation(e,this.a,this.b,this.c,t,s,o,l)}getInterpolation(e,t,s,o,l){return gi.getInterpolation(e,this.a,this.b,this.c,t,s,o,l)}containsPoint(e){return gi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return gi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const s=this.a,o=this.b,l=this.c;let u,d;ks.subVectors(o,s),Bs.subVectors(l,s),od.subVectors(e,s);const f=ks.dot(od),p=Bs.dot(od);if(f<=0&&p<=0)return t.copy(s);ad.subVectors(e,o);const g=ks.dot(ad),m=Bs.dot(ad);if(g>=0&&m<=g)return t.copy(o);const _=f*m-g*p;if(_<=0&&f>=0&&g<=0)return u=f/(f-g),t.copy(s).addScaledVector(ks,u);ld.subVectors(e,l);const S=ks.dot(ld),E=Bs.dot(ld);if(E>=0&&S<=E)return t.copy(l);const M=S*p-f*E;if(M<=0&&p>=0&&E<=0)return d=p/(p-E),t.copy(s).addScaledVector(Bs,d);const x=g*E-S*m;if(x<=0&&m-g>=0&&S-E>=0)return Rm.subVectors(l,o),d=(m-g)/(m-g+(S-E)),t.copy(o).addScaledVector(Rm,d);const y=1/(x+M+_);return u=M*y,d=_*y,t.copy(s).addScaledVector(ks,u).addScaledVector(Bs,d)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Xg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yr={h:0,s:0,l:0},Cl={h:0,s:0,l:0};function cd(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class Mt{constructor(e,t,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,s)}set(e,t,s){if(t===void 0&&s===void 0){const o=e;o&&o.isColor?this.copy(o):typeof o=="number"?this.setHex(o):typeof o=="string"&&this.setStyle(o)}else this.setRGB(e,t,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=cn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ct.toWorkingColorSpace(this,t),this}setRGB(e,t,s,o=Ct.workingColorSpace){return this.r=e,this.g=t,this.b=s,Ct.toWorkingColorSpace(this,o),this}setHSL(e,t,s,o=Ct.workingColorSpace){if(e=Cy(e,1),t=Fn(t,0,1),s=Fn(s,0,1),t===0)this.r=this.g=this.b=s;else{const l=s<=.5?s*(1+t):s+t-s*t,u=2*s-l;this.r=cd(u,l,e+1/3),this.g=cd(u,l,e),this.b=cd(u,l,e-1/3)}return Ct.toWorkingColorSpace(this,o),this}setStyle(e,t=cn){function s(l){l!==void 0&&parseFloat(l)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let o;if(o=/^(\w+)\(([^\)]*)\)/.exec(e)){let l;const u=o[1],d=o[2];switch(u){case"rgb":case"rgba":if(l=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(l[4]),this.setRGB(Math.min(255,parseInt(l[1],10))/255,Math.min(255,parseInt(l[2],10))/255,Math.min(255,parseInt(l[3],10))/255,t);if(l=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(l[4]),this.setRGB(Math.min(100,parseInt(l[1],10))/100,Math.min(100,parseInt(l[2],10))/100,Math.min(100,parseInt(l[3],10))/100,t);break;case"hsl":case"hsla":if(l=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(l[4]),this.setHSL(parseFloat(l[1])/360,parseFloat(l[2])/100,parseFloat(l[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(o=/^\#([A-Fa-f\d]+)$/.exec(e)){const l=o[1],u=l.length;if(u===3)return this.setRGB(parseInt(l.charAt(0),16)/15,parseInt(l.charAt(1),16)/15,parseInt(l.charAt(2),16)/15,t);if(u===6)return this.setHex(parseInt(l,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=cn){const s=Xg[e.toLowerCase()];return s!==void 0?this.setHex(s,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Zs(e.r),this.g=Zs(e.g),this.b=Zs(e.b),this}copyLinearToSRGB(e){return this.r=Zu(e.r),this.g=Zu(e.g),this.b=Zu(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=cn){return Ct.fromWorkingColorSpace(vn.copy(this),e),Math.round(Fn(vn.r*255,0,255))*65536+Math.round(Fn(vn.g*255,0,255))*256+Math.round(Fn(vn.b*255,0,255))}getHexString(e=cn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ct.workingColorSpace){Ct.fromWorkingColorSpace(vn.copy(this),t);const s=vn.r,o=vn.g,l=vn.b,u=Math.max(s,o,l),d=Math.min(s,o,l);let f,p;const g=(d+u)/2;if(d===u)f=0,p=0;else{const m=u-d;switch(p=g<=.5?m/(u+d):m/(2-u-d),u){case s:f=(o-l)/m+(o<l?6:0);break;case o:f=(l-s)/m+2;break;case l:f=(s-o)/m+4;break}f/=6}return e.h=f,e.s=p,e.l=g,e}getRGB(e,t=Ct.workingColorSpace){return Ct.fromWorkingColorSpace(vn.copy(this),t),e.r=vn.r,e.g=vn.g,e.b=vn.b,e}getStyle(e=cn){Ct.fromWorkingColorSpace(vn.copy(this),e);const t=vn.r,s=vn.g,o=vn.b;return e!==cn?`color(${e} ${t.toFixed(3)} ${s.toFixed(3)} ${o.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(s*255)},${Math.round(o*255)})`}offsetHSL(e,t,s){return this.getHSL(yr),this.setHSL(yr.h+e,yr.s+t,yr.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,s){return this.r=e.r+(t.r-e.r)*s,this.g=e.g+(t.g-e.g)*s,this.b=e.b+(t.b-e.b)*s,this}lerpHSL(e,t){this.getHSL(yr),e.getHSL(Cl);const s=$u(yr.h,Cl.h,t),o=$u(yr.s,Cl.s,t),l=$u(yr.l,Cl.l,t);return this.setHSL(s,o,l),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,s=this.g,o=this.b,l=e.elements;return this.r=l[0]*t+l[3]*s+l[6]*o,this.g=l[1]*t+l[4]*s+l[7]*o,this.b=l[2]*t+l[5]*s+l[8]*o,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const vn=new Mt;Mt.NAMES=Xg;let Vy=0;class aa extends oo{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Vy++}),this.uuid=ra(),this.name="",this.type="Material",this.blending=Ks,this.side=Rr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=wd,this.blendDst=Ad,this.blendEquation=Jr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Mt(0,0,0),this.blendAlpha=0,this.depthFunc=Gl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=pm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ps,this.stencilZFail=Ps,this.stencilZPass=Ps,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const s=e[t];if(s===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const o=this[t];if(o===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}o&&o.isColor?o.set(s):o&&o.isVector3&&s&&s.isVector3?o.copy(s):this[t]=s}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const s={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(e).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(e).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(e).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(e).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(e).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==Ks&&(s.blending=this.blending),this.side!==Rr&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==wd&&(s.blendSrc=this.blendSrc),this.blendDst!==Ad&&(s.blendDst=this.blendDst),this.blendEquation!==Jr&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==Gl&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==pm&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ps&&(s.stencilFail=this.stencilFail),this.stencilZFail!==Ps&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==Ps&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function o(l){const u=[];for(const d in l){const f=l[d];delete f.metadata,u.push(f)}return u}if(t){const l=o(e.textures),u=o(e.images);l.length>0&&(s.textures=l),u.length>0&&(s.images=u)}return s}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let s=null;if(t!==null){const o=t.length;s=new Array(o);for(let l=0;l!==o;++l)s[l]=t[l].clone()}return this.clippingPlanes=s,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Yg extends aa{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Mt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=bg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const jt=new ce,Rl=new Et;class wi{constructor(e,t,s=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=s,this.usage=mm,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Tr,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,s){e*=this.itemSize,s*=t.itemSize;for(let o=0,l=this.itemSize;o<l;o++)this.array[e+o]=t.array[s+o];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,s=this.count;t<s;t++)Rl.fromBufferAttribute(this,t),Rl.applyMatrix3(e),this.setXY(t,Rl.x,Rl.y);else if(this.itemSize===3)for(let t=0,s=this.count;t<s;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix3(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyMatrix4(e){for(let t=0,s=this.count;t<s;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix4(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyNormalMatrix(e){for(let t=0,s=this.count;t<s;t++)jt.fromBufferAttribute(this,t),jt.applyNormalMatrix(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}transformDirection(e){for(let t=0,s=this.count;t<s;t++)jt.fromBufferAttribute(this,t),jt.transformDirection(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let s=this.array[e*this.itemSize+t];return this.normalized&&(s=Wo(s,this.array)),s}setComponent(e,t,s){return this.normalized&&(s=Un(s,this.array)),this.array[e*this.itemSize+t]=s,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Wo(t,this.array)),t}setX(e,t){return this.normalized&&(t=Un(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Wo(t,this.array)),t}setY(e,t){return this.normalized&&(t=Un(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Wo(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Un(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Wo(t,this.array)),t}setW(e,t){return this.normalized&&(t=Un(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,s){return e*=this.itemSize,this.normalized&&(t=Un(t,this.array),s=Un(s,this.array)),this.array[e+0]=t,this.array[e+1]=s,this}setXYZ(e,t,s,o){return e*=this.itemSize,this.normalized&&(t=Un(t,this.array),s=Un(s,this.array),o=Un(o,this.array)),this.array[e+0]=t,this.array[e+1]=s,this.array[e+2]=o,this}setXYZW(e,t,s,o,l){return e*=this.itemSize,this.normalized&&(t=Un(t,this.array),s=Un(s,this.array),o=Un(o,this.array),l=Un(l,this.array)),this.array[e+0]=t,this.array[e+1]=s,this.array[e+2]=o,this.array[e+3]=l,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==mm&&(e.usage=this.usage),e}}class qg extends wi{constructor(e,t,s){super(new Uint16Array(e),t,s)}}class $g extends wi{constructor(e,t,s){super(new Uint32Array(e),t,s)}}class Ai extends wi{constructor(e,t,s){super(new Float32Array(e),t,s)}}let Wy=0;const ni=new Kt,ud=new un,zs=new ce,Xn=new oa,qo=new oa,rn=new ce;class Lr extends oo{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Wy++}),this.uuid=ra(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Hg(e)?$g:qg)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,s=0){this.groups.push({start:e,count:t,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const l=new mt().getNormalMatrix(e);s.applyNormalMatrix(l),s.needsUpdate=!0}const o=this.attributes.tangent;return o!==void 0&&(o.transformDirection(e),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ni.makeRotationFromQuaternion(e),this.applyMatrix4(ni),this}rotateX(e){return ni.makeRotationX(e),this.applyMatrix4(ni),this}rotateY(e){return ni.makeRotationY(e),this.applyMatrix4(ni),this}rotateZ(e){return ni.makeRotationZ(e),this.applyMatrix4(ni),this}translate(e,t,s){return ni.makeTranslation(e,t,s),this.applyMatrix4(ni),this}scale(e,t,s){return ni.makeScale(e,t,s),this.applyMatrix4(ni),this}lookAt(e){return ud.lookAt(e),ud.updateMatrix(),this.applyMatrix4(ud.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(zs).negate(),this.translate(zs.x,zs.y,zs.z),this}setFromPoints(e){const t=[];for(let s=0,o=e.length;s<o;s++){const l=e[s];t.push(l.x,l.y,l.z||0)}return this.setAttribute("position",new Ai(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new oa);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new ce(-1/0,-1/0,-1/0),new ce(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const l=t[s];Xn.setFromBufferAttribute(l),this.morphTargetsRelative?(rn.addVectors(this.boundingBox.min,Xn.min),this.boundingBox.expandByPoint(rn),rn.addVectors(this.boundingBox.max,Xn.max),this.boundingBox.expandByPoint(rn)):(this.boundingBox.expandByPoint(Xn.min),this.boundingBox.expandByPoint(Xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Hd);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new ce,1/0);return}if(e){const s=this.boundingSphere.center;if(Xn.setFromBufferAttribute(e),t)for(let l=0,u=t.length;l<u;l++){const d=t[l];qo.setFromBufferAttribute(d),this.morphTargetsRelative?(rn.addVectors(Xn.min,qo.min),Xn.expandByPoint(rn),rn.addVectors(Xn.max,qo.max),Xn.expandByPoint(rn)):(Xn.expandByPoint(qo.min),Xn.expandByPoint(qo.max))}Xn.getCenter(s);let o=0;for(let l=0,u=e.count;l<u;l++)rn.fromBufferAttribute(e,l),o=Math.max(o,s.distanceToSquared(rn));if(t)for(let l=0,u=t.length;l<u;l++){const d=t[l],f=this.morphTargetsRelative;for(let p=0,g=d.count;p<g;p++)rn.fromBufferAttribute(d,p),f&&(zs.fromBufferAttribute(e,p),rn.add(zs)),o=Math.max(o,s.distanceToSquared(rn))}this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=e.array,o=t.position.array,l=t.normal.array,u=t.uv.array,d=o.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new wi(new Float32Array(4*d),4));const f=this.getAttribute("tangent").array,p=[],g=[];for(let D=0;D<d;D++)p[D]=new ce,g[D]=new ce;const m=new ce,_=new ce,S=new ce,E=new Et,M=new Et,x=new Et,y=new ce,w=new ce;function R(D,te,ie){m.fromArray(o,D*3),_.fromArray(o,te*3),S.fromArray(o,ie*3),E.fromArray(u,D*2),M.fromArray(u,te*2),x.fromArray(u,ie*2),_.sub(m),S.sub(m),M.sub(E),x.sub(E);const ae=1/(M.x*x.y-x.x*M.y);isFinite(ae)&&(y.copy(_).multiplyScalar(x.y).addScaledVector(S,-M.y).multiplyScalar(ae),w.copy(S).multiplyScalar(M.x).addScaledVector(_,-x.x).multiplyScalar(ae),p[D].add(y),p[te].add(y),p[ie].add(y),g[D].add(w),g[te].add(w),g[ie].add(w))}let b=this.groups;b.length===0&&(b=[{start:0,count:s.length}]);for(let D=0,te=b.length;D<te;++D){const ie=b[D],ae=ie.start,k=ie.count;for(let H=ae,q=ae+k;H<q;H+=3)R(s[H+0],s[H+1],s[H+2])}const G=new ce,B=new ce,U=new ce,he=new ce;function C(D){U.fromArray(l,D*3),he.copy(U);const te=p[D];G.copy(te),G.sub(U.multiplyScalar(U.dot(te))).normalize(),B.crossVectors(he,te);const ae=B.dot(g[D])<0?-1:1;f[D*4]=G.x,f[D*4+1]=G.y,f[D*4+2]=G.z,f[D*4+3]=ae}for(let D=0,te=b.length;D<te;++D){const ie=b[D],ae=ie.start,k=ie.count;for(let H=ae,q=ae+k;H<q;H+=3)C(s[H+0]),C(s[H+1]),C(s[H+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new wi(new Float32Array(t.count*3),3),this.setAttribute("normal",s);else for(let _=0,S=s.count;_<S;_++)s.setXYZ(_,0,0,0);const o=new ce,l=new ce,u=new ce,d=new ce,f=new ce,p=new ce,g=new ce,m=new ce;if(e)for(let _=0,S=e.count;_<S;_+=3){const E=e.getX(_+0),M=e.getX(_+1),x=e.getX(_+2);o.fromBufferAttribute(t,E),l.fromBufferAttribute(t,M),u.fromBufferAttribute(t,x),g.subVectors(u,l),m.subVectors(o,l),g.cross(m),d.fromBufferAttribute(s,E),f.fromBufferAttribute(s,M),p.fromBufferAttribute(s,x),d.add(g),f.add(g),p.add(g),s.setXYZ(E,d.x,d.y,d.z),s.setXYZ(M,f.x,f.y,f.z),s.setXYZ(x,p.x,p.y,p.z)}else for(let _=0,S=t.count;_<S;_+=3)o.fromBufferAttribute(t,_+0),l.fromBufferAttribute(t,_+1),u.fromBufferAttribute(t,_+2),g.subVectors(u,l),m.subVectors(o,l),g.cross(m),s.setXYZ(_+0,g.x,g.y,g.z),s.setXYZ(_+1,g.x,g.y,g.z),s.setXYZ(_+2,g.x,g.y,g.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,s=e.count;t<s;t++)rn.fromBufferAttribute(e,t),rn.normalize(),e.setXYZ(t,rn.x,rn.y,rn.z)}toNonIndexed(){function e(d,f){const p=d.array,g=d.itemSize,m=d.normalized,_=new p.constructor(f.length*g);let S=0,E=0;for(let M=0,x=f.length;M<x;M++){d.isInterleavedBufferAttribute?S=f[M]*d.data.stride+d.offset:S=f[M]*g;for(let y=0;y<g;y++)_[E++]=p[S++]}return new wi(_,g,m)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Lr,s=this.index.array,o=this.attributes;for(const d in o){const f=o[d],p=e(f,s);t.setAttribute(d,p)}const l=this.morphAttributes;for(const d in l){const f=[],p=l[d];for(let g=0,m=p.length;g<m;g++){const _=p[g],S=e(_,s);f.push(S)}t.morphAttributes[d]=f}t.morphTargetsRelative=this.morphTargetsRelative;const u=this.groups;for(let d=0,f=u.length;d<f;d++){const p=u[d];t.addGroup(p.start,p.count,p.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const f=this.parameters;for(const p in f)f[p]!==void 0&&(e[p]=f[p]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const s=this.attributes;for(const f in s){const p=s[f];e.data.attributes[f]=p.toJSON(e.data)}const o={};let l=!1;for(const f in this.morphAttributes){const p=this.morphAttributes[f],g=[];for(let m=0,_=p.length;m<_;m++){const S=p[m];g.push(S.toJSON(e.data))}g.length>0&&(o[f]=g,l=!0)}l&&(e.data.morphAttributes=o,e.data.morphTargetsRelative=this.morphTargetsRelative);const u=this.groups;u.length>0&&(e.data.groups=JSON.parse(JSON.stringify(u)));const d=this.boundingSphere;return d!==null&&(e.data.boundingSphere={center:d.center.toArray(),radius:d.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const s=e.index;s!==null&&this.setIndex(s.clone(t));const o=e.attributes;for(const p in o){const g=o[p];this.setAttribute(p,g.clone(t))}const l=e.morphAttributes;for(const p in l){const g=[],m=l[p];for(let _=0,S=m.length;_<S;_++)g.push(m[_].clone(t));this.morphAttributes[p]=g}this.morphTargetsRelative=e.morphTargetsRelative;const u=e.groups;for(let p=0,g=u.length;p<g;p++){const m=u[p];this.addGroup(m.start,m.count,m.materialIndex)}const d=e.boundingBox;d!==null&&(this.boundingBox=d.clone());const f=e.boundingSphere;return f!==null&&(this.boundingSphere=f.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const bm=new Kt,$r=new Uy,bl=new Hd,Lm=new ce,Hs=new ce,Gs=new ce,Vs=new ce,dd=new ce,Ll=new ce,Pl=new Et,Dl=new Et,Il=new Et,Pm=new ce,Dm=new ce,Im=new ce,Nl=new ce,Ul=new ce;class Yi extends un{constructor(e=new Lr,t=new Yg){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,s=Object.keys(t);if(s.length>0){const o=t[s[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,u=o.length;l<u;l++){const d=o[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=l}}}}getVertexPosition(e,t){const s=this.geometry,o=s.attributes.position,l=s.morphAttributes.position,u=s.morphTargetsRelative;t.fromBufferAttribute(o,e);const d=this.morphTargetInfluences;if(l&&d){Ll.set(0,0,0);for(let f=0,p=l.length;f<p;f++){const g=d[f],m=l[f];g!==0&&(dd.fromBufferAttribute(m,e),u?Ll.addScaledVector(dd,g):Ll.addScaledVector(dd.sub(t),g))}t.add(Ll)}return t}raycast(e,t){const s=this.geometry,o=this.material,l=this.matrixWorld;o!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),bl.copy(s.boundingSphere),bl.applyMatrix4(l),$r.copy(e.ray).recast(e.near),!(bl.containsPoint($r.origin)===!1&&($r.intersectSphere(bl,Lm)===null||$r.origin.distanceToSquared(Lm)>(e.far-e.near)**2))&&(bm.copy(l).invert(),$r.copy(e.ray).applyMatrix4(bm),!(s.boundingBox!==null&&$r.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(e,t,$r)))}_computeIntersections(e,t,s){let o;const l=this.geometry,u=this.material,d=l.index,f=l.attributes.position,p=l.attributes.uv,g=l.attributes.uv1,m=l.attributes.normal,_=l.groups,S=l.drawRange;if(d!==null)if(Array.isArray(u))for(let E=0,M=_.length;E<M;E++){const x=_[E],y=u[x.materialIndex],w=Math.max(x.start,S.start),R=Math.min(d.count,Math.min(x.start+x.count,S.start+S.count));for(let b=w,G=R;b<G;b+=3){const B=d.getX(b),U=d.getX(b+1),he=d.getX(b+2);o=Ol(this,y,e,s,p,g,m,B,U,he),o&&(o.faceIndex=Math.floor(b/3),o.face.materialIndex=x.materialIndex,t.push(o))}}else{const E=Math.max(0,S.start),M=Math.min(d.count,S.start+S.count);for(let x=E,y=M;x<y;x+=3){const w=d.getX(x),R=d.getX(x+1),b=d.getX(x+2);o=Ol(this,u,e,s,p,g,m,w,R,b),o&&(o.faceIndex=Math.floor(x/3),t.push(o))}}else if(f!==void 0)if(Array.isArray(u))for(let E=0,M=_.length;E<M;E++){const x=_[E],y=u[x.materialIndex],w=Math.max(x.start,S.start),R=Math.min(f.count,Math.min(x.start+x.count,S.start+S.count));for(let b=w,G=R;b<G;b+=3){const B=b,U=b+1,he=b+2;o=Ol(this,y,e,s,p,g,m,B,U,he),o&&(o.faceIndex=Math.floor(b/3),o.face.materialIndex=x.materialIndex,t.push(o))}}else{const E=Math.max(0,S.start),M=Math.min(f.count,S.start+S.count);for(let x=E,y=M;x<y;x+=3){const w=x,R=x+1,b=x+2;o=Ol(this,u,e,s,p,g,m,w,R,b),o&&(o.faceIndex=Math.floor(x/3),t.push(o))}}}}function jy(r,e,t,s,o,l,u,d){let f;if(e.side===kn?f=s.intersectTriangle(u,l,o,!0,d):f=s.intersectTriangle(o,l,u,e.side===Rr,d),f===null)return null;Ul.copy(d),Ul.applyMatrix4(r.matrixWorld);const p=t.ray.origin.distanceTo(Ul);return p<t.near||p>t.far?null:{distance:p,point:Ul.clone(),object:r}}function Ol(r,e,t,s,o,l,u,d,f,p){r.getVertexPosition(d,Hs),r.getVertexPosition(f,Gs),r.getVertexPosition(p,Vs);const g=jy(r,e,t,s,Hs,Gs,Vs,Nl);if(g){o&&(Pl.fromBufferAttribute(o,d),Dl.fromBufferAttribute(o,f),Il.fromBufferAttribute(o,p),g.uv=gi.getInterpolation(Nl,Hs,Gs,Vs,Pl,Dl,Il,new Et)),l&&(Pl.fromBufferAttribute(l,d),Dl.fromBufferAttribute(l,f),Il.fromBufferAttribute(l,p),g.uv1=gi.getInterpolation(Nl,Hs,Gs,Vs,Pl,Dl,Il,new Et),g.uv2=g.uv1),u&&(Pm.fromBufferAttribute(u,d),Dm.fromBufferAttribute(u,f),Im.fromBufferAttribute(u,p),g.normal=gi.getInterpolation(Nl,Hs,Gs,Vs,Pm,Dm,Im,new ce),g.normal.dot(s.direction)>0&&g.normal.multiplyScalar(-1));const m={a:d,b:f,c:p,normal:new ce,materialIndex:0};gi.getNormal(Hs,Gs,Vs,m.normal),g.face=m}return g}class la extends Lr{constructor(e=1,t=1,s=1,o=1,l=1,u=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:s,widthSegments:o,heightSegments:l,depthSegments:u};const d=this;o=Math.floor(o),l=Math.floor(l),u=Math.floor(u);const f=[],p=[],g=[],m=[];let _=0,S=0;E("z","y","x",-1,-1,s,t,e,u,l,0),E("z","y","x",1,-1,s,t,-e,u,l,1),E("x","z","y",1,1,e,s,t,o,u,2),E("x","z","y",1,-1,e,s,-t,o,u,3),E("x","y","z",1,-1,e,t,s,o,l,4),E("x","y","z",-1,-1,e,t,-s,o,l,5),this.setIndex(f),this.setAttribute("position",new Ai(p,3)),this.setAttribute("normal",new Ai(g,3)),this.setAttribute("uv",new Ai(m,2));function E(M,x,y,w,R,b,G,B,U,he,C){const D=b/U,te=G/he,ie=b/2,ae=G/2,k=B/2,H=U+1,q=he+1;let K=0,N=0;const X=new ce;for(let V=0;V<q;V++){const I=V*te-ae;for(let z=0;z<H;z++){const Y=z*D-ie;X[M]=Y*w,X[x]=I*R,X[y]=k,p.push(X.x,X.y,X.z),X[M]=0,X[x]=0,X[y]=B>0?1:-1,g.push(X.x,X.y,X.z),m.push(z/U),m.push(1-V/he),K+=1}}for(let V=0;V<he;V++)for(let I=0;I<U;I++){const z=_+I+H*V,Y=_+I+H*(V+1),Q=_+(I+1)+H*(V+1),pe=_+(I+1)+H*V;f.push(z,Y,pe),f.push(Y,Q,pe),N+=6}d.addGroup(S,N,C),S+=N,_+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new la(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function io(r){const e={};for(const t in r){e[t]={};for(const s in r[t]){const o=r[t][s];o&&(o.isColor||o.isMatrix3||o.isMatrix4||o.isVector2||o.isVector3||o.isVector4||o.isTexture||o.isQuaternion)?o.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][s]=null):e[t][s]=o.clone():Array.isArray(o)?e[t][s]=o.slice():e[t][s]=o}}return e}function Tn(r){const e={};for(let t=0;t<r.length;t++){const s=io(r[t]);for(const o in s)e[o]=s[o]}return e}function Xy(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Kg(r){return r.getRenderTarget()===null?r.outputColorSpace:Ct.workingColorSpace}const Yy={clone:io,merge:Tn};var qy=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,$y=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class as extends aa{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=qy,this.fragmentShader=$y,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=io(e.uniforms),this.uniformsGroups=Xy(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const o in this.uniforms){const u=this.uniforms[o].value;u&&u.isTexture?t.uniforms[o]={type:"t",value:u.toJSON(e).uuid}:u&&u.isColor?t.uniforms[o]={type:"c",value:u.getHex()}:u&&u.isVector2?t.uniforms[o]={type:"v2",value:u.toArray()}:u&&u.isVector3?t.uniforms[o]={type:"v3",value:u.toArray()}:u&&u.isVector4?t.uniforms[o]={type:"v4",value:u.toArray()}:u&&u.isMatrix3?t.uniforms[o]={type:"m3",value:u.toArray()}:u&&u.isMatrix4?t.uniforms[o]={type:"m4",value:u.toArray()}:t.uniforms[o]={value:u}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const s={};for(const o in this.extensions)this.extensions[o]===!0&&(s[o]=!0);return Object.keys(s).length>0&&(t.extensions=s),t}}class Zg extends un{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Kt,this.projectionMatrix=new Kt,this.projectionMatrixInverse=new Kt,this.coordinateSystem=Xi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class ii extends Zg{constructor(e=50,t=1,s=.1,o=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=o,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Pd*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(qu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Pd*2*Math.atan(Math.tan(qu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,s,o,l,u){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=s,this.view.offsetY=o,this.view.width=l,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(qu*.5*this.fov)/this.zoom,s=2*t,o=this.aspect*s,l=-.5*o;const u=this.view;if(this.view!==null&&this.view.enabled){const f=u.fullWidth,p=u.fullHeight;l+=u.offsetX*o/f,t-=u.offsetY*s/p,o*=u.width/f,s*=u.height/p}const d=this.filmOffset;d!==0&&(l+=e*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(l,l+o,t,t-s,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ws=-90,js=1;class Ky extends un{constructor(e,t,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const o=new ii(Ws,js,e,t);o.layers=this.layers,this.add(o);const l=new ii(Ws,js,e,t);l.layers=this.layers,this.add(l);const u=new ii(Ws,js,e,t);u.layers=this.layers,this.add(u);const d=new ii(Ws,js,e,t);d.layers=this.layers,this.add(d);const f=new ii(Ws,js,e,t);f.layers=this.layers,this.add(f);const p=new ii(Ws,js,e,t);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[s,o,l,u,d,f]=t;for(const p of t)this.remove(p);if(e===Xi)s.up.set(0,1,0),s.lookAt(1,0,0),o.up.set(0,1,0),o.lookAt(-1,0,0),l.up.set(0,0,-1),l.lookAt(0,1,0),u.up.set(0,0,1),u.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),f.up.set(0,1,0),f.lookAt(0,0,-1);else if(e===Yl)s.up.set(0,-1,0),s.lookAt(-1,0,0),o.up.set(0,-1,0),o.lookAt(1,0,0),l.up.set(0,0,1),l.lookAt(0,1,0),u.up.set(0,0,-1),u.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),f.up.set(0,-1,0),f.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const p of t)this.add(p),p.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:o}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[l,u,d,f,p,g]=this.children,m=e.getRenderTarget(),_=e.getActiveCubeFace(),S=e.getActiveMipmapLevel(),E=e.xr.enabled;e.xr.enabled=!1;const M=s.texture.generateMipmaps;s.texture.generateMipmaps=!1,e.setRenderTarget(s,0,o),e.render(t,l),e.setRenderTarget(s,1,o),e.render(t,u),e.setRenderTarget(s,2,o),e.render(t,d),e.setRenderTarget(s,3,o),e.render(t,f),e.setRenderTarget(s,4,o),e.render(t,p),s.texture.generateMipmaps=M,e.setRenderTarget(s,5,o),e.render(t,g),e.setRenderTarget(m,_,S),e.xr.enabled=E,s.texture.needsPMREMUpdate=!0}}class Qg extends Bn{constructor(e,t,s,o,l,u,d,f,p,g){e=e!==void 0?e:[],t=t!==void 0?t:Js,super(e,t,s,o,l,u,d,f,p,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Zy extends os{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const s={width:e,height:e,depth:1},o=[s,s,s,s,s,s];t.encoding!==void 0&&($o("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===ss?cn:si),this.texture=new Qg(o,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Yn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},o=new la(5,5,5),l=new as({name:"CubemapFromEquirect",uniforms:io(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:kn,blending:wr});l.uniforms.tEquirect.value=t;const u=new Yi(o,l),d=t.minFilter;return t.minFilter===to&&(t.minFilter=Yn),new Ky(1,10,this).update(e,u),t.minFilter=d,u.geometry.dispose(),u.material.dispose(),this}clear(e,t,s,o){const l=e.getRenderTarget();for(let u=0;u<6;u++)e.setRenderTarget(this,u),e.clear(t,s,o);e.setRenderTarget(l)}}const fd=new ce,Qy=new ce,Jy=new mt;class Zr{constructor(e=new ce(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,s,o){return this.normal.set(e,t,s),this.constant=o,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,s){const o=fd.subVectors(s,t).cross(Qy.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(o,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const s=e.delta(fd),o=this.normal.dot(s);if(o===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const l=-(e.start.dot(this.normal)+this.constant)/o;return l<0||l>1?null:t.copy(e.start).addScaledVector(s,l)}intersectsLine(e){const t=this.distanceToPoint(e.start),s=this.distanceToPoint(e.end);return t<0&&s>0||s<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const s=t||Jy.getNormalMatrix(e),o=this.coplanarPoint(fd).applyMatrix4(e),l=this.normal.applyMatrix3(s).normalize();return this.constant=-o.dot(l),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Kr=new Hd,Fl=new ce;class Gd{constructor(e=new Zr,t=new Zr,s=new Zr,o=new Zr,l=new Zr,u=new Zr){this.planes=[e,t,s,o,l,u]}set(e,t,s,o,l,u){const d=this.planes;return d[0].copy(e),d[1].copy(t),d[2].copy(s),d[3].copy(o),d[4].copy(l),d[5].copy(u),this}copy(e){const t=this.planes;for(let s=0;s<6;s++)t[s].copy(e.planes[s]);return this}setFromProjectionMatrix(e,t=Xi){const s=this.planes,o=e.elements,l=o[0],u=o[1],d=o[2],f=o[3],p=o[4],g=o[5],m=o[6],_=o[7],S=o[8],E=o[9],M=o[10],x=o[11],y=o[12],w=o[13],R=o[14],b=o[15];if(s[0].setComponents(f-l,_-p,x-S,b-y).normalize(),s[1].setComponents(f+l,_+p,x+S,b+y).normalize(),s[2].setComponents(f+u,_+g,x+E,b+w).normalize(),s[3].setComponents(f-u,_-g,x-E,b-w).normalize(),s[4].setComponents(f-d,_-m,x-M,b-R).normalize(),t===Xi)s[5].setComponents(f+d,_+m,x+M,b+R).normalize();else if(t===Yl)s[5].setComponents(d,m,M,R).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Kr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Kr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Kr)}intersectsSprite(e){return Kr.center.set(0,0,0),Kr.radius=.7071067811865476,Kr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Kr)}intersectsSphere(e){const t=this.planes,s=e.center,o=-e.radius;for(let l=0;l<6;l++)if(t[l].distanceToPoint(s)<o)return!1;return!0}intersectsBox(e){const t=this.planes;for(let s=0;s<6;s++){const o=t[s];if(Fl.x=o.normal.x>0?e.max.x:e.min.x,Fl.y=o.normal.y>0?e.max.y:e.min.y,Fl.z=o.normal.z>0?e.max.z:e.min.z,o.distanceToPoint(Fl)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let s=0;s<6;s++)if(t[s].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Jg(){let r=null,e=!1,t=null,s=null;function o(l,u){t(l,u),s=r.requestAnimationFrame(o)}return{start:function(){e!==!0&&t!==null&&(s=r.requestAnimationFrame(o),e=!0)},stop:function(){r.cancelAnimationFrame(s),e=!1},setAnimationLoop:function(l){t=l},setContext:function(l){r=l}}}function eS(r,e){const t=e.isWebGL2,s=new WeakMap;function o(p,g){const m=p.array,_=p.usage,S=m.byteLength,E=r.createBuffer();r.bindBuffer(g,E),r.bufferData(g,m,_),p.onUploadCallback();let M;if(m instanceof Float32Array)M=r.FLOAT;else if(m instanceof Uint16Array)if(p.isFloat16BufferAttribute)if(t)M=r.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else M=r.UNSIGNED_SHORT;else if(m instanceof Int16Array)M=r.SHORT;else if(m instanceof Uint32Array)M=r.UNSIGNED_INT;else if(m instanceof Int32Array)M=r.INT;else if(m instanceof Int8Array)M=r.BYTE;else if(m instanceof Uint8Array)M=r.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)M=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:E,type:M,bytesPerElement:m.BYTES_PER_ELEMENT,version:p.version,size:S}}function l(p,g,m){const _=g.array,S=g._updateRange,E=g.updateRanges;if(r.bindBuffer(m,p),S.count===-1&&E.length===0&&r.bufferSubData(m,0,_),E.length!==0){for(let M=0,x=E.length;M<x;M++){const y=E[M];t?r.bufferSubData(m,y.start*_.BYTES_PER_ELEMENT,_,y.start,y.count):r.bufferSubData(m,y.start*_.BYTES_PER_ELEMENT,_.subarray(y.start,y.start+y.count))}g.clearUpdateRanges()}S.count!==-1&&(t?r.bufferSubData(m,S.offset*_.BYTES_PER_ELEMENT,_,S.offset,S.count):r.bufferSubData(m,S.offset*_.BYTES_PER_ELEMENT,_.subarray(S.offset,S.offset+S.count)),S.count=-1),g.onUploadCallback()}function u(p){return p.isInterleavedBufferAttribute&&(p=p.data),s.get(p)}function d(p){p.isInterleavedBufferAttribute&&(p=p.data);const g=s.get(p);g&&(r.deleteBuffer(g.buffer),s.delete(p))}function f(p,g){if(p.isGLBufferAttribute){const _=s.get(p);(!_||_.version<p.version)&&s.set(p,{buffer:p.buffer,type:p.type,bytesPerElement:p.elementSize,version:p.version});return}p.isInterleavedBufferAttribute&&(p=p.data);const m=s.get(p);if(m===void 0)s.set(p,o(p,g));else if(m.version<p.version){if(m.size!==p.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");l(m.buffer,p,g),m.version=p.version}}return{get:u,remove:d,update:f}}class Vd extends Lr{constructor(e=1,t=1,s=1,o=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:s,heightSegments:o};const l=e/2,u=t/2,d=Math.floor(s),f=Math.floor(o),p=d+1,g=f+1,m=e/d,_=t/f,S=[],E=[],M=[],x=[];for(let y=0;y<g;y++){const w=y*_-u;for(let R=0;R<p;R++){const b=R*m-l;E.push(b,-w,0),M.push(0,0,1),x.push(R/d),x.push(1-y/f)}}for(let y=0;y<f;y++)for(let w=0;w<d;w++){const R=w+p*y,b=w+p*(y+1),G=w+1+p*(y+1),B=w+1+p*y;S.push(R,b,B),S.push(b,G,B)}this.setIndex(S),this.setAttribute("position",new Ai(E,3)),this.setAttribute("normal",new Ai(M,3)),this.setAttribute("uv",new Ai(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vd(e.width,e.height,e.widthSegments,e.heightSegments)}}var tS=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,nS=`#ifdef USE_ALPHAHASH
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
#endif`,iS=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,rS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sS=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,oS=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aS=`#ifdef USE_AOMAP
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
#endif`,lS=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,cS=`#ifdef USE_BATCHING
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
#endif`,uS=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,dS=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,fS=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,hS=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,pS=`#ifdef USE_IRIDESCENCE
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
#endif`,mS=`#ifdef USE_BUMPMAP
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
#endif`,gS=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,vS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_S=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,xS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,yS=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,SS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,MS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,ES=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,TS=`#define PI 3.141592653589793
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
} // validated`,wS=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,AS=`vec3 transformedNormal = objectNormal;
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
#endif`,CS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,RS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,bS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,LS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,PS="gl_FragColor = linearToOutputTexel( gl_FragColor );",DS=`
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
}`,IS=`#ifdef USE_ENVMAP
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
#endif`,NS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,US=`#ifdef USE_ENVMAP
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
#endif`,OS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,FS=`#ifdef USE_ENVMAP
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
#endif`,kS=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,BS=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,zS=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,HS=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,GS=`#ifdef USE_GRADIENTMAP
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
}`,VS=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,WS=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,jS=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,XS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,YS=`uniform bool receiveShadow;
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
#endif`,qS=`#ifdef USE_ENVMAP
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
#endif`,$S=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,KS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ZS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,QS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,JS=`PhysicalMaterial material;
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
#endif`,eM=`struct PhysicalMaterial {
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
}`,tM=`
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
#endif`,nM=`#if defined( RE_IndirectDiffuse )
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
#endif`,iM=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,rM=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sM=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,oM=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,aM=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,lM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,cM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,uM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,dM=`#if defined( USE_POINTS_UV )
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
#endif`,fM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,hM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,pM=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,mM=`#ifdef USE_MORPHNORMALS
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
#endif`,gM=`#ifdef USE_MORPHTARGETS
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
#endif`,vM=`#ifdef USE_MORPHTARGETS
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
#endif`,_M=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,xM=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,yM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,SM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,MM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,EM=`#ifdef USE_NORMALMAP
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
#endif`,TM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,wM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,AM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,CM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,RM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,bM=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,LM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,PM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,DM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,IM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,NM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,UM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,OM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,FM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,kM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,BM=`float getShadowMask() {
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
}`,zM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,HM=`#ifdef USE_SKINNING
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
#endif`,GM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,VM=`#ifdef USE_SKINNING
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
#endif`,WM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,jM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,XM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,YM=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,qM=`#ifdef USE_TRANSMISSION
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
#endif`,$M=`#ifdef USE_TRANSMISSION
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
#endif`,KM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ZM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,QM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,JM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const eE=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,tE=`uniform sampler2D t2D;
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
}`,nE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,iE=`#ifdef ENVMAP_TYPE_CUBE
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
}`,rE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sE=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,oE=`#include <common>
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
}`,aE=`#if DEPTH_PACKING == 3200
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
}`,lE=`#define DISTANCE
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
}`,cE=`#define DISTANCE
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
}`,uE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,dE=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fE=`uniform float scale;
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
}`,hE=`uniform vec3 diffuse;
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
}`,pE=`#include <common>
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
}`,mE=`uniform vec3 diffuse;
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
}`,gE=`#define LAMBERT
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
}`,vE=`#define LAMBERT
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
}`,_E=`#define MATCAP
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
}`,xE=`#define MATCAP
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
}`,yE=`#define NORMAL
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
}`,SE=`#define NORMAL
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
}`,ME=`#define PHONG
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
}`,EE=`#define PHONG
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
}`,TE=`#define STANDARD
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
}`,wE=`#define STANDARD
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
}`,AE=`#define TOON
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
}`,CE=`#define TOON
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
}`,RE=`uniform float size;
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
}`,bE=`uniform vec3 diffuse;
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
}`,LE=`#include <common>
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
}`,PE=`uniform vec3 color;
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
}`,DE=`uniform float rotation;
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
}`,IE=`uniform vec3 diffuse;
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
}`,ft={alphahash_fragment:tS,alphahash_pars_fragment:nS,alphamap_fragment:iS,alphamap_pars_fragment:rS,alphatest_fragment:sS,alphatest_pars_fragment:oS,aomap_fragment:aS,aomap_pars_fragment:lS,batching_pars_vertex:cS,batching_vertex:uS,begin_vertex:dS,beginnormal_vertex:fS,bsdfs:hS,iridescence_fragment:pS,bumpmap_pars_fragment:mS,clipping_planes_fragment:gS,clipping_planes_pars_fragment:vS,clipping_planes_pars_vertex:_S,clipping_planes_vertex:xS,color_fragment:yS,color_pars_fragment:SS,color_pars_vertex:MS,color_vertex:ES,common:TS,cube_uv_reflection_fragment:wS,defaultnormal_vertex:AS,displacementmap_pars_vertex:CS,displacementmap_vertex:RS,emissivemap_fragment:bS,emissivemap_pars_fragment:LS,colorspace_fragment:PS,colorspace_pars_fragment:DS,envmap_fragment:IS,envmap_common_pars_fragment:NS,envmap_pars_fragment:US,envmap_pars_vertex:OS,envmap_physical_pars_fragment:qS,envmap_vertex:FS,fog_vertex:kS,fog_pars_vertex:BS,fog_fragment:zS,fog_pars_fragment:HS,gradientmap_pars_fragment:GS,lightmap_fragment:VS,lightmap_pars_fragment:WS,lights_lambert_fragment:jS,lights_lambert_pars_fragment:XS,lights_pars_begin:YS,lights_toon_fragment:$S,lights_toon_pars_fragment:KS,lights_phong_fragment:ZS,lights_phong_pars_fragment:QS,lights_physical_fragment:JS,lights_physical_pars_fragment:eM,lights_fragment_begin:tM,lights_fragment_maps:nM,lights_fragment_end:iM,logdepthbuf_fragment:rM,logdepthbuf_pars_fragment:sM,logdepthbuf_pars_vertex:oM,logdepthbuf_vertex:aM,map_fragment:lM,map_pars_fragment:cM,map_particle_fragment:uM,map_particle_pars_fragment:dM,metalnessmap_fragment:fM,metalnessmap_pars_fragment:hM,morphcolor_vertex:pM,morphnormal_vertex:mM,morphtarget_pars_vertex:gM,morphtarget_vertex:vM,normal_fragment_begin:_M,normal_fragment_maps:xM,normal_pars_fragment:yM,normal_pars_vertex:SM,normal_vertex:MM,normalmap_pars_fragment:EM,clearcoat_normal_fragment_begin:TM,clearcoat_normal_fragment_maps:wM,clearcoat_pars_fragment:AM,iridescence_pars_fragment:CM,opaque_fragment:RM,packing:bM,premultiplied_alpha_fragment:LM,project_vertex:PM,dithering_fragment:DM,dithering_pars_fragment:IM,roughnessmap_fragment:NM,roughnessmap_pars_fragment:UM,shadowmap_pars_fragment:OM,shadowmap_pars_vertex:FM,shadowmap_vertex:kM,shadowmask_pars_fragment:BM,skinbase_vertex:zM,skinning_pars_vertex:HM,skinning_vertex:GM,skinnormal_vertex:VM,specularmap_fragment:WM,specularmap_pars_fragment:jM,tonemapping_fragment:XM,tonemapping_pars_fragment:YM,transmission_fragment:qM,transmission_pars_fragment:$M,uv_pars_fragment:KM,uv_pars_vertex:ZM,uv_vertex:QM,worldpos_vertex:JM,background_vert:eE,background_frag:tE,backgroundCube_vert:nE,backgroundCube_frag:iE,cube_vert:rE,cube_frag:sE,depth_vert:oE,depth_frag:aE,distanceRGBA_vert:lE,distanceRGBA_frag:cE,equirect_vert:uE,equirect_frag:dE,linedashed_vert:fE,linedashed_frag:hE,meshbasic_vert:pE,meshbasic_frag:mE,meshlambert_vert:gE,meshlambert_frag:vE,meshmatcap_vert:_E,meshmatcap_frag:xE,meshnormal_vert:yE,meshnormal_frag:SE,meshphong_vert:ME,meshphong_frag:EE,meshphysical_vert:TE,meshphysical_frag:wE,meshtoon_vert:AE,meshtoon_frag:CE,points_vert:RE,points_frag:bE,shadow_vert:LE,shadow_frag:PE,sprite_vert:DE,sprite_frag:IE},be={common:{diffuse:{value:new Mt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new mt},alphaMap:{value:null},alphaMapTransform:{value:new mt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new mt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new mt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new mt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new mt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new mt},normalScale:{value:new Et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new mt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new mt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new mt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new mt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Mt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Mt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new mt},alphaTest:{value:0},uvTransform:{value:new mt}},sprite:{diffuse:{value:new Mt(16777215)},opacity:{value:1},center:{value:new Et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new mt},alphaMap:{value:null},alphaMapTransform:{value:new mt},alphaTest:{value:0}}},Ti={basic:{uniforms:Tn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:ft.meshbasic_vert,fragmentShader:ft.meshbasic_frag},lambert:{uniforms:Tn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new Mt(0)}}]),vertexShader:ft.meshlambert_vert,fragmentShader:ft.meshlambert_frag},phong:{uniforms:Tn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new Mt(0)},specular:{value:new Mt(1118481)},shininess:{value:30}}]),vertexShader:ft.meshphong_vert,fragmentShader:ft.meshphong_frag},standard:{uniforms:Tn([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new Mt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ft.meshphysical_vert,fragmentShader:ft.meshphysical_frag},toon:{uniforms:Tn([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new Mt(0)}}]),vertexShader:ft.meshtoon_vert,fragmentShader:ft.meshtoon_frag},matcap:{uniforms:Tn([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:ft.meshmatcap_vert,fragmentShader:ft.meshmatcap_frag},points:{uniforms:Tn([be.points,be.fog]),vertexShader:ft.points_vert,fragmentShader:ft.points_frag},dashed:{uniforms:Tn([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ft.linedashed_vert,fragmentShader:ft.linedashed_frag},depth:{uniforms:Tn([be.common,be.displacementmap]),vertexShader:ft.depth_vert,fragmentShader:ft.depth_frag},normal:{uniforms:Tn([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:ft.meshnormal_vert,fragmentShader:ft.meshnormal_frag},sprite:{uniforms:Tn([be.sprite,be.fog]),vertexShader:ft.sprite_vert,fragmentShader:ft.sprite_frag},background:{uniforms:{uvTransform:{value:new mt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ft.background_vert,fragmentShader:ft.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:ft.backgroundCube_vert,fragmentShader:ft.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ft.cube_vert,fragmentShader:ft.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ft.equirect_vert,fragmentShader:ft.equirect_frag},distanceRGBA:{uniforms:Tn([be.common,be.displacementmap,{referencePosition:{value:new ce},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ft.distanceRGBA_vert,fragmentShader:ft.distanceRGBA_frag},shadow:{uniforms:Tn([be.lights,be.fog,{color:{value:new Mt(0)},opacity:{value:1}}]),vertexShader:ft.shadow_vert,fragmentShader:ft.shadow_frag}};Ti.physical={uniforms:Tn([Ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new mt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new mt},clearcoatNormalScale:{value:new Et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new mt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new mt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new mt},sheen:{value:0},sheenColor:{value:new Mt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new mt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new mt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new mt},transmissionSamplerSize:{value:new Et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new mt},attenuationDistance:{value:0},attenuationColor:{value:new Mt(0)},specularColor:{value:new Mt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new mt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new mt},anisotropyVector:{value:new Et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new mt}}]),vertexShader:ft.meshphysical_vert,fragmentShader:ft.meshphysical_frag};const kl={r:0,b:0,g:0};function NE(r,e,t,s,o,l,u){const d=new Mt(0);let f=l===!0?0:1,p,g,m=null,_=0,S=null;function E(x,y){let w=!1,R=y.isScene===!0?y.background:null;R&&R.isTexture&&(R=(y.backgroundBlurriness>0?t:e).get(R)),R===null?M(d,f):R&&R.isColor&&(M(R,1),w=!0);const b=r.xr.getEnvironmentBlendMode();b==="additive"?s.buffers.color.setClear(0,0,0,1,u):b==="alpha-blend"&&s.buffers.color.setClear(0,0,0,0,u),(r.autoClear||w)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),R&&(R.isCubeTexture||R.mapping===Zl)?(g===void 0&&(g=new Yi(new la(1,1,1),new as({name:"BackgroundCubeMaterial",uniforms:io(Ti.backgroundCube.uniforms),vertexShader:Ti.backgroundCube.vertexShader,fragmentShader:Ti.backgroundCube.fragmentShader,side:kn,depthTest:!1,depthWrite:!1,fog:!1})),g.geometry.deleteAttribute("normal"),g.geometry.deleteAttribute("uv"),g.onBeforeRender=function(G,B,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(g.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),o.update(g)),g.material.uniforms.envMap.value=R,g.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,g.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,g.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,g.material.toneMapped=Ct.getTransfer(R.colorSpace)!==It,(m!==R||_!==R.version||S!==r.toneMapping)&&(g.material.needsUpdate=!0,m=R,_=R.version,S=r.toneMapping),g.layers.enableAll(),x.unshift(g,g.geometry,g.material,0,0,null)):R&&R.isTexture&&(p===void 0&&(p=new Yi(new Vd(2,2),new as({name:"BackgroundMaterial",uniforms:io(Ti.background.uniforms),vertexShader:Ti.background.vertexShader,fragmentShader:Ti.background.fragmentShader,side:Rr,depthTest:!1,depthWrite:!1,fog:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),o.update(p)),p.material.uniforms.t2D.value=R,p.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,p.material.toneMapped=Ct.getTransfer(R.colorSpace)!==It,R.matrixAutoUpdate===!0&&R.updateMatrix(),p.material.uniforms.uvTransform.value.copy(R.matrix),(m!==R||_!==R.version||S!==r.toneMapping)&&(p.material.needsUpdate=!0,m=R,_=R.version,S=r.toneMapping),p.layers.enableAll(),x.unshift(p,p.geometry,p.material,0,0,null))}function M(x,y){x.getRGB(kl,Kg(r)),s.buffers.color.setClear(kl.r,kl.g,kl.b,y,u)}return{getClearColor:function(){return d},setClearColor:function(x,y=1){d.set(x),f=y,M(d,f)},getClearAlpha:function(){return f},setClearAlpha:function(x){f=x,M(d,f)},render:E}}function UE(r,e,t,s){const o=r.getParameter(r.MAX_VERTEX_ATTRIBS),l=s.isWebGL2?null:e.get("OES_vertex_array_object"),u=s.isWebGL2||l!==null,d={},f=x(null);let p=f,g=!1;function m(k,H,q,K,N){let X=!1;if(u){const V=M(K,q,H);p!==V&&(p=V,S(p.object)),X=y(k,K,q,N),X&&w(k,K,q,N)}else{const V=H.wireframe===!0;(p.geometry!==K.id||p.program!==q.id||p.wireframe!==V)&&(p.geometry=K.id,p.program=q.id,p.wireframe=V,X=!0)}N!==null&&t.update(N,r.ELEMENT_ARRAY_BUFFER),(X||g)&&(g=!1,he(k,H,q,K),N!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(N).buffer))}function _(){return s.isWebGL2?r.createVertexArray():l.createVertexArrayOES()}function S(k){return s.isWebGL2?r.bindVertexArray(k):l.bindVertexArrayOES(k)}function E(k){return s.isWebGL2?r.deleteVertexArray(k):l.deleteVertexArrayOES(k)}function M(k,H,q){const K=q.wireframe===!0;let N=d[k.id];N===void 0&&(N={},d[k.id]=N);let X=N[H.id];X===void 0&&(X={},N[H.id]=X);let V=X[K];return V===void 0&&(V=x(_()),X[K]=V),V}function x(k){const H=[],q=[],K=[];for(let N=0;N<o;N++)H[N]=0,q[N]=0,K[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:q,attributeDivisors:K,object:k,attributes:{},index:null}}function y(k,H,q,K){const N=p.attributes,X=H.attributes;let V=0;const I=q.getAttributes();for(const z in I)if(I[z].location>=0){const Q=N[z];let pe=X[z];if(pe===void 0&&(z==="instanceMatrix"&&k.instanceMatrix&&(pe=k.instanceMatrix),z==="instanceColor"&&k.instanceColor&&(pe=k.instanceColor)),Q===void 0||Q.attribute!==pe||pe&&Q.data!==pe.data)return!0;V++}return p.attributesNum!==V||p.index!==K}function w(k,H,q,K){const N={},X=H.attributes;let V=0;const I=q.getAttributes();for(const z in I)if(I[z].location>=0){let Q=X[z];Q===void 0&&(z==="instanceMatrix"&&k.instanceMatrix&&(Q=k.instanceMatrix),z==="instanceColor"&&k.instanceColor&&(Q=k.instanceColor));const pe={};pe.attribute=Q,Q&&Q.data&&(pe.data=Q.data),N[z]=pe,V++}p.attributes=N,p.attributesNum=V,p.index=K}function R(){const k=p.newAttributes;for(let H=0,q=k.length;H<q;H++)k[H]=0}function b(k){G(k,0)}function G(k,H){const q=p.newAttributes,K=p.enabledAttributes,N=p.attributeDivisors;q[k]=1,K[k]===0&&(r.enableVertexAttribArray(k),K[k]=1),N[k]!==H&&((s.isWebGL2?r:e.get("ANGLE_instanced_arrays"))[s.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](k,H),N[k]=H)}function B(){const k=p.newAttributes,H=p.enabledAttributes;for(let q=0,K=H.length;q<K;q++)H[q]!==k[q]&&(r.disableVertexAttribArray(q),H[q]=0)}function U(k,H,q,K,N,X,V){V===!0?r.vertexAttribIPointer(k,H,q,N,X):r.vertexAttribPointer(k,H,q,K,N,X)}function he(k,H,q,K){if(s.isWebGL2===!1&&(k.isInstancedMesh||K.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;R();const N=K.attributes,X=q.getAttributes(),V=H.defaultAttributeValues;for(const I in X){const z=X[I];if(z.location>=0){let Y=N[I];if(Y===void 0&&(I==="instanceMatrix"&&k.instanceMatrix&&(Y=k.instanceMatrix),I==="instanceColor"&&k.instanceColor&&(Y=k.instanceColor)),Y!==void 0){const Q=Y.normalized,pe=Y.itemSize,xe=t.get(Y);if(xe===void 0)continue;const ye=xe.buffer,ue=xe.type,fe=xe.bytesPerElement,Te=s.isWebGL2===!0&&(ue===r.INT||ue===r.UNSIGNED_INT||Y.gpuType===Pg);if(Y.isInterleavedBufferAttribute){const Ge=Y.data,Z=Ge.stride,ht=Y.offset;if(Ge.isInstancedInterleavedBuffer){for(let Fe=0;Fe<z.locationSize;Fe++)G(z.location+Fe,Ge.meshPerAttribute);k.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=Ge.meshPerAttribute*Ge.count)}else for(let Fe=0;Fe<z.locationSize;Fe++)b(z.location+Fe);r.bindBuffer(r.ARRAY_BUFFER,ye);for(let Fe=0;Fe<z.locationSize;Fe++)U(z.location+Fe,pe/z.locationSize,ue,Q,Z*fe,(ht+pe/z.locationSize*Fe)*fe,Te)}else{if(Y.isInstancedBufferAttribute){for(let Ge=0;Ge<z.locationSize;Ge++)G(z.location+Ge,Y.meshPerAttribute);k.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let Ge=0;Ge<z.locationSize;Ge++)b(z.location+Ge);r.bindBuffer(r.ARRAY_BUFFER,ye);for(let Ge=0;Ge<z.locationSize;Ge++)U(z.location+Ge,pe/z.locationSize,ue,Q,pe*fe,pe/z.locationSize*Ge*fe,Te)}}else if(V!==void 0){const Q=V[I];if(Q!==void 0)switch(Q.length){case 2:r.vertexAttrib2fv(z.location,Q);break;case 3:r.vertexAttrib3fv(z.location,Q);break;case 4:r.vertexAttrib4fv(z.location,Q);break;default:r.vertexAttrib1fv(z.location,Q)}}}}B()}function C(){ie();for(const k in d){const H=d[k];for(const q in H){const K=H[q];for(const N in K)E(K[N].object),delete K[N];delete H[q]}delete d[k]}}function D(k){if(d[k.id]===void 0)return;const H=d[k.id];for(const q in H){const K=H[q];for(const N in K)E(K[N].object),delete K[N];delete H[q]}delete d[k.id]}function te(k){for(const H in d){const q=d[H];if(q[k.id]===void 0)continue;const K=q[k.id];for(const N in K)E(K[N].object),delete K[N];delete q[k.id]}}function ie(){ae(),g=!0,p!==f&&(p=f,S(p.object))}function ae(){f.geometry=null,f.program=null,f.wireframe=!1}return{setup:m,reset:ie,resetDefaultState:ae,dispose:C,releaseStatesOfGeometry:D,releaseStatesOfProgram:te,initAttributes:R,enableAttribute:b,disableUnusedAttributes:B}}function OE(r,e,t,s){const o=s.isWebGL2;let l;function u(g){l=g}function d(g,m){r.drawArrays(l,g,m),t.update(m,l,1)}function f(g,m,_){if(_===0)return;let S,E;if(o)S=r,E="drawArraysInstanced";else if(S=e.get("ANGLE_instanced_arrays"),E="drawArraysInstancedANGLE",S===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}S[E](l,g,m,_),t.update(m,l,_)}function p(g,m,_){if(_===0)return;const S=e.get("WEBGL_multi_draw");if(S===null)for(let E=0;E<_;E++)this.render(g[E],m[E]);else{S.multiDrawArraysWEBGL(l,g,0,m,0,_);let E=0;for(let M=0;M<_;M++)E+=m[M];t.update(E,l,1)}}this.setMode=u,this.render=d,this.renderInstances=f,this.renderMultiDraw=p}function FE(r,e,t){let s;function o(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const U=e.get("EXT_texture_filter_anisotropic");s=r.getParameter(U.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function l(U){if(U==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";U="mediump"}return U==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const u=typeof WebGL2RenderingContext<"u"&&r.constructor.name==="WebGL2RenderingContext";let d=t.precision!==void 0?t.precision:"highp";const f=l(d);f!==d&&(console.warn("THREE.WebGLRenderer:",d,"not supported, using",f,"instead."),d=f);const p=u||e.has("WEBGL_draw_buffers"),g=t.logarithmicDepthBuffer===!0,m=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=r.getParameter(r.MAX_TEXTURE_SIZE),E=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),M=r.getParameter(r.MAX_VERTEX_ATTRIBS),x=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),y=r.getParameter(r.MAX_VARYING_VECTORS),w=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),R=_>0,b=u||e.has("OES_texture_float"),G=R&&b,B=u?r.getParameter(r.MAX_SAMPLES):0;return{isWebGL2:u,drawBuffers:p,getMaxAnisotropy:o,getMaxPrecision:l,precision:d,logarithmicDepthBuffer:g,maxTextures:m,maxVertexTextures:_,maxTextureSize:S,maxCubemapSize:E,maxAttributes:M,maxVertexUniforms:x,maxVaryings:y,maxFragmentUniforms:w,vertexTextures:R,floatFragmentTextures:b,floatVertexTextures:G,maxSamples:B}}function kE(r){const e=this;let t=null,s=0,o=!1,l=!1;const u=new Zr,d=new mt,f={value:null,needsUpdate:!1};this.uniform=f,this.numPlanes=0,this.numIntersection=0,this.init=function(m,_){const S=m.length!==0||_||s!==0||o;return o=_,s=m.length,S},this.beginShadows=function(){l=!0,g(null)},this.endShadows=function(){l=!1},this.setGlobalState=function(m,_){t=g(m,_,0)},this.setState=function(m,_,S){const E=m.clippingPlanes,M=m.clipIntersection,x=m.clipShadows,y=r.get(m);if(!o||E===null||E.length===0||l&&!x)l?g(null):p();else{const w=l?0:s,R=w*4;let b=y.clippingState||null;f.value=b,b=g(E,_,R,S);for(let G=0;G!==R;++G)b[G]=t[G];y.clippingState=b,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=w}};function p(){f.value!==t&&(f.value=t,f.needsUpdate=s>0),e.numPlanes=s,e.numIntersection=0}function g(m,_,S,E){const M=m!==null?m.length:0;let x=null;if(M!==0){if(x=f.value,E!==!0||x===null){const y=S+M*4,w=_.matrixWorldInverse;d.getNormalMatrix(w),(x===null||x.length<y)&&(x=new Float32Array(y));for(let R=0,b=S;R!==M;++R,b+=4)u.copy(m[R]).applyMatrix4(w,d),u.normal.toArray(x,b),x[b+3]=u.constant}f.value=x,f.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,x}}function BE(r){let e=new WeakMap;function t(u,d){return d===Cd?u.mapping=Js:d===Rd&&(u.mapping=eo),u}function s(u){if(u&&u.isTexture){const d=u.mapping;if(d===Cd||d===Rd)if(e.has(u)){const f=e.get(u).texture;return t(f,u.mapping)}else{const f=u.image;if(f&&f.height>0){const p=new Zy(f.height/2);return p.fromEquirectangularTexture(r,u),e.set(u,p),u.addEventListener("dispose",o),t(p.texture,u.mapping)}else return null}}return u}function o(u){const d=u.target;d.removeEventListener("dispose",o);const f=e.get(d);f!==void 0&&(e.delete(d),f.dispose())}function l(){e=new WeakMap}return{get:s,dispose:l}}class e0 extends Zg{constructor(e=-1,t=1,s=1,o=-1,l=.1,u=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=s,this.bottom=o,this.near=l,this.far=u,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,s,o,l,u){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=s,this.view.offsetY=o,this.view.width=l,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,o=(this.top+this.bottom)/2;let l=s-e,u=s+e,d=o+t,f=o-t;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;l+=p*this.view.offsetX,u=l+p*this.view.width,d-=g*this.view.offsetY,f=d-g*this.view.height}this.projectionMatrix.makeOrthographic(l,u,d,f,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const qs=4,Nm=[.125,.215,.35,.446,.526,.582],es=20,hd=new e0,Um=new Mt;let pd=null,md=0,gd=0;const Qr=(1+Math.sqrt(5))/2,Xs=1/Qr,Om=[new ce(1,1,1),new ce(-1,1,1),new ce(1,1,-1),new ce(-1,1,-1),new ce(0,Qr,Xs),new ce(0,Qr,-Xs),new ce(Xs,0,Qr),new ce(-Xs,0,Qr),new ce(Qr,Xs,0),new ce(-Qr,Xs,0)];class Fm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,s=.1,o=100){pd=this._renderer.getRenderTarget(),md=this._renderer.getActiveCubeFace(),gd=this._renderer.getActiveMipmapLevel(),this._setSize(256);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,s,o,l),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=zm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Bm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(pd,md,gd),e.scissorTest=!1,Bl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Js||e.mapping===eo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),pd=this._renderer.getRenderTarget(),md=this._renderer.getActiveCubeFace(),gd=this._renderer.getActiveMipmapLevel();const s=t||this._allocateTargets();return this._textureToCubeUV(e,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,s={magFilter:Yn,minFilter:Yn,generateMipmaps:!1,type:ea,format:vi,colorSpace:qi,depthBuffer:!1},o=km(e,t,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=km(e,t,s);const{_lodMax:l}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=zE(l)),this._blurMaterial=HE(l,e,t)}return o}_compileMaterial(e){const t=new Yi(this._lodPlanes[0],e);this._renderer.compile(t,hd)}_sceneToCubeUV(e,t,s,o){const d=new ii(90,1,t,s),f=[1,-1,1,1,1,1],p=[1,1,1,-1,-1,-1],g=this._renderer,m=g.autoClear,_=g.toneMapping;g.getClearColor(Um),g.toneMapping=Ar,g.autoClear=!1;const S=new Yg({name:"PMREM.Background",side:kn,depthWrite:!1,depthTest:!1}),E=new Yi(new la,S);let M=!1;const x=e.background;x?x.isColor&&(S.color.copy(x),e.background=null,M=!0):(S.color.copy(Um),M=!0);for(let y=0;y<6;y++){const w=y%3;w===0?(d.up.set(0,f[y],0),d.lookAt(p[y],0,0)):w===1?(d.up.set(0,0,f[y]),d.lookAt(0,p[y],0)):(d.up.set(0,f[y],0),d.lookAt(0,0,p[y]));const R=this._cubeSize;Bl(o,w*R,y>2?R:0,R,R),g.setRenderTarget(o),M&&g.render(E,d),g.render(e,d)}E.geometry.dispose(),E.material.dispose(),g.toneMapping=_,g.autoClear=m,e.background=x}_textureToCubeUV(e,t){const s=this._renderer,o=e.mapping===Js||e.mapping===eo;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=zm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Bm());const l=o?this._cubemapMaterial:this._equirectMaterial,u=new Yi(this._lodPlanes[0],l),d=l.uniforms;d.envMap.value=e;const f=this._cubeSize;Bl(t,0,0,3*f,2*f),s.setRenderTarget(t),s.render(u,hd)}_applyPMREM(e){const t=this._renderer,s=t.autoClear;t.autoClear=!1;for(let o=1;o<this._lodPlanes.length;o++){const l=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),u=Om[(o-1)%Om.length];this._blur(e,o-1,o,l,u)}t.autoClear=s}_blur(e,t,s,o,l){const u=this._pingPongRenderTarget;this._halfBlur(e,u,t,s,o,"latitudinal",l),this._halfBlur(u,e,s,s,o,"longitudinal",l)}_halfBlur(e,t,s,o,l,u,d){const f=this._renderer,p=this._blurMaterial;u!=="latitudinal"&&u!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const g=3,m=new Yi(this._lodPlanes[o],p),_=p.uniforms,S=this._sizeLods[s]-1,E=isFinite(l)?Math.PI/(2*S):2*Math.PI/(2*es-1),M=l/E,x=isFinite(l)?1+Math.floor(g*M):es;x>es&&console.warn(`sigmaRadians, ${l}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${es}`);const y=[];let w=0;for(let U=0;U<es;++U){const he=U/M,C=Math.exp(-he*he/2);y.push(C),U===0?w+=C:U<x&&(w+=2*C)}for(let U=0;U<y.length;U++)y[U]=y[U]/w;_.envMap.value=e.texture,_.samples.value=x,_.weights.value=y,_.latitudinal.value=u==="latitudinal",d&&(_.poleAxis.value=d);const{_lodMax:R}=this;_.dTheta.value=E,_.mipInt.value=R-s;const b=this._sizeLods[o],G=3*b*(o>R-qs?o-R+qs:0),B=4*(this._cubeSize-b);Bl(t,G,B,3*b,2*b),f.setRenderTarget(t),f.render(m,hd)}}function zE(r){const e=[],t=[],s=[];let o=r;const l=r-qs+1+Nm.length;for(let u=0;u<l;u++){const d=Math.pow(2,o);t.push(d);let f=1/d;u>r-qs?f=Nm[u-r+qs-1]:u===0&&(f=0),s.push(f);const p=1/(d-2),g=-p,m=1+p,_=[g,g,m,g,m,m,g,g,m,m,g,m],S=6,E=6,M=3,x=2,y=1,w=new Float32Array(M*E*S),R=new Float32Array(x*E*S),b=new Float32Array(y*E*S);for(let B=0;B<S;B++){const U=B%3*2/3-1,he=B>2?0:-1,C=[U,he,0,U+2/3,he,0,U+2/3,he+1,0,U,he,0,U+2/3,he+1,0,U,he+1,0];w.set(C,M*E*B),R.set(_,x*E*B);const D=[B,B,B,B,B,B];b.set(D,y*E*B)}const G=new Lr;G.setAttribute("position",new wi(w,M)),G.setAttribute("uv",new wi(R,x)),G.setAttribute("faceIndex",new wi(b,y)),e.push(G),o>qs&&o--}return{lodPlanes:e,sizeLods:t,sigmas:s}}function km(r,e,t){const s=new os(r,e,t);return s.texture.mapping=Zl,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function Bl(r,e,t,s,o){r.viewport.set(e,t,s,o),r.scissor.set(e,t,s,o)}function HE(r,e,t){const s=new Float32Array(es),o=new ce(0,1,0);return new as({name:"SphericalGaussianBlur",defines:{n:es,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:o}},vertexShader:Wd(),fragmentShader:`

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
		`,blending:wr,depthTest:!1,depthWrite:!1})}function Bm(){return new as({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Wd(),fragmentShader:`

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
		`,blending:wr,depthTest:!1,depthWrite:!1})}function zm(){return new as({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Wd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wr,depthTest:!1,depthWrite:!1})}function Wd(){return`

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
	`}function GE(r){let e=new WeakMap,t=null;function s(d){if(d&&d.isTexture){const f=d.mapping,p=f===Cd||f===Rd,g=f===Js||f===eo;if(p||g)if(d.isRenderTargetTexture&&d.needsPMREMUpdate===!0){d.needsPMREMUpdate=!1;let m=e.get(d);return t===null&&(t=new Fm(r)),m=p?t.fromEquirectangular(d,m):t.fromCubemap(d,m),e.set(d,m),m.texture}else{if(e.has(d))return e.get(d).texture;{const m=d.image;if(p&&m&&m.height>0||g&&m&&o(m)){t===null&&(t=new Fm(r));const _=p?t.fromEquirectangular(d):t.fromCubemap(d);return e.set(d,_),d.addEventListener("dispose",l),_.texture}else return null}}}return d}function o(d){let f=0;const p=6;for(let g=0;g<p;g++)d[g]!==void 0&&f++;return f===p}function l(d){const f=d.target;f.removeEventListener("dispose",l);const p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function u(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:s,dispose:u}}function VE(r){const e={};function t(s){if(e[s]!==void 0)return e[s];let o;switch(s){case"WEBGL_depth_texture":o=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":o=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":o=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":o=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:o=r.getExtension(s)}return e[s]=o,o}return{has:function(s){return t(s)!==null},init:function(s){s.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(s){const o=t(s);return o===null&&console.warn("THREE.WebGLRenderer: "+s+" extension not supported."),o}}}function WE(r,e,t,s){const o={},l=new WeakMap;function u(m){const _=m.target;_.index!==null&&e.remove(_.index);for(const E in _.attributes)e.remove(_.attributes[E]);for(const E in _.morphAttributes){const M=_.morphAttributes[E];for(let x=0,y=M.length;x<y;x++)e.remove(M[x])}_.removeEventListener("dispose",u),delete o[_.id];const S=l.get(_);S&&(e.remove(S),l.delete(_)),s.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,t.memory.geometries--}function d(m,_){return o[_.id]===!0||(_.addEventListener("dispose",u),o[_.id]=!0,t.memory.geometries++),_}function f(m){const _=m.attributes;for(const E in _)e.update(_[E],r.ARRAY_BUFFER);const S=m.morphAttributes;for(const E in S){const M=S[E];for(let x=0,y=M.length;x<y;x++)e.update(M[x],r.ARRAY_BUFFER)}}function p(m){const _=[],S=m.index,E=m.attributes.position;let M=0;if(S!==null){const w=S.array;M=S.version;for(let R=0,b=w.length;R<b;R+=3){const G=w[R+0],B=w[R+1],U=w[R+2];_.push(G,B,B,U,U,G)}}else if(E!==void 0){const w=E.array;M=E.version;for(let R=0,b=w.length/3-1;R<b;R+=3){const G=R+0,B=R+1,U=R+2;_.push(G,B,B,U,U,G)}}else return;const x=new(Hg(_)?$g:qg)(_,1);x.version=M;const y=l.get(m);y&&e.remove(y),l.set(m,x)}function g(m){const _=l.get(m);if(_){const S=m.index;S!==null&&_.version<S.version&&p(m)}else p(m);return l.get(m)}return{get:d,update:f,getWireframeAttribute:g}}function jE(r,e,t,s){const o=s.isWebGL2;let l;function u(S){l=S}let d,f;function p(S){d=S.type,f=S.bytesPerElement}function g(S,E){r.drawElements(l,E,d,S*f),t.update(E,l,1)}function m(S,E,M){if(M===0)return;let x,y;if(o)x=r,y="drawElementsInstanced";else if(x=e.get("ANGLE_instanced_arrays"),y="drawElementsInstancedANGLE",x===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}x[y](l,E,d,S*f,M),t.update(E,l,M)}function _(S,E,M){if(M===0)return;const x=e.get("WEBGL_multi_draw");if(x===null)for(let y=0;y<M;y++)this.render(S[y]/f,E[y]);else{x.multiDrawElementsWEBGL(l,E,0,d,S,0,M);let y=0;for(let w=0;w<M;w++)y+=E[w];t.update(y,l,1)}}this.setMode=u,this.setIndex=p,this.render=g,this.renderInstances=m,this.renderMultiDraw=_}function XE(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function s(l,u,d){switch(t.calls++,u){case r.TRIANGLES:t.triangles+=d*(l/3);break;case r.LINES:t.lines+=d*(l/2);break;case r.LINE_STRIP:t.lines+=d*(l-1);break;case r.LINE_LOOP:t.lines+=d*l;break;case r.POINTS:t.points+=d*l;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",u);break}}function o(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:o,update:s}}function YE(r,e){return r[0]-e[0]}function qE(r,e){return Math.abs(e[1])-Math.abs(r[1])}function $E(r,e,t){const s={},o=new Float32Array(8),l=new WeakMap,u=new sn,d=[];for(let p=0;p<8;p++)d[p]=[p,0];function f(p,g,m){const _=p.morphTargetInfluences;if(e.isWebGL2===!0){const E=g.morphAttributes.position||g.morphAttributes.normal||g.morphAttributes.color,M=E!==void 0?E.length:0;let x=l.get(g);if(x===void 0||x.count!==M){let H=function(){ae.dispose(),l.delete(g),g.removeEventListener("dispose",H)};var S=H;x!==void 0&&x.texture.dispose();const R=g.morphAttributes.position!==void 0,b=g.morphAttributes.normal!==void 0,G=g.morphAttributes.color!==void 0,B=g.morphAttributes.position||[],U=g.morphAttributes.normal||[],he=g.morphAttributes.color||[];let C=0;R===!0&&(C=1),b===!0&&(C=2),G===!0&&(C=3);let D=g.attributes.position.count*C,te=1;D>e.maxTextureSize&&(te=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);const ie=new Float32Array(D*te*4*M),ae=new Wg(ie,D,te,M);ae.type=Tr,ae.needsUpdate=!0;const k=C*4;for(let q=0;q<M;q++){const K=B[q],N=U[q],X=he[q],V=D*te*4*q;for(let I=0;I<K.count;I++){const z=I*k;R===!0&&(u.fromBufferAttribute(K,I),ie[V+z+0]=u.x,ie[V+z+1]=u.y,ie[V+z+2]=u.z,ie[V+z+3]=0),b===!0&&(u.fromBufferAttribute(N,I),ie[V+z+4]=u.x,ie[V+z+5]=u.y,ie[V+z+6]=u.z,ie[V+z+7]=0),G===!0&&(u.fromBufferAttribute(X,I),ie[V+z+8]=u.x,ie[V+z+9]=u.y,ie[V+z+10]=u.z,ie[V+z+11]=X.itemSize===4?u.w:1)}}x={count:M,texture:ae,size:new Et(D,te)},l.set(g,x),g.addEventListener("dispose",H)}let y=0;for(let R=0;R<_.length;R++)y+=_[R];const w=g.morphTargetsRelative?1:1-y;m.getUniforms().setValue(r,"morphTargetBaseInfluence",w),m.getUniforms().setValue(r,"morphTargetInfluences",_),m.getUniforms().setValue(r,"morphTargetsTexture",x.texture,t),m.getUniforms().setValue(r,"morphTargetsTextureSize",x.size)}else{const E=_===void 0?0:_.length;let M=s[g.id];if(M===void 0||M.length!==E){M=[];for(let b=0;b<E;b++)M[b]=[b,0];s[g.id]=M}for(let b=0;b<E;b++){const G=M[b];G[0]=b,G[1]=_[b]}M.sort(qE);for(let b=0;b<8;b++)b<E&&M[b][1]?(d[b][0]=M[b][0],d[b][1]=M[b][1]):(d[b][0]=Number.MAX_SAFE_INTEGER,d[b][1]=0);d.sort(YE);const x=g.morphAttributes.position,y=g.morphAttributes.normal;let w=0;for(let b=0;b<8;b++){const G=d[b],B=G[0],U=G[1];B!==Number.MAX_SAFE_INTEGER&&U?(x&&g.getAttribute("morphTarget"+b)!==x[B]&&g.setAttribute("morphTarget"+b,x[B]),y&&g.getAttribute("morphNormal"+b)!==y[B]&&g.setAttribute("morphNormal"+b,y[B]),o[b]=U,w+=U):(x&&g.hasAttribute("morphTarget"+b)===!0&&g.deleteAttribute("morphTarget"+b),y&&g.hasAttribute("morphNormal"+b)===!0&&g.deleteAttribute("morphNormal"+b),o[b]=0)}const R=g.morphTargetsRelative?1:1-w;m.getUniforms().setValue(r,"morphTargetBaseInfluence",R),m.getUniforms().setValue(r,"morphTargetInfluences",o)}}return{update:f}}function KE(r,e,t,s){let o=new WeakMap;function l(f){const p=s.render.frame,g=f.geometry,m=e.get(f,g);if(o.get(m)!==p&&(e.update(m),o.set(m,p)),f.isInstancedMesh&&(f.hasEventListener("dispose",d)===!1&&f.addEventListener("dispose",d),o.get(f)!==p&&(t.update(f.instanceMatrix,r.ARRAY_BUFFER),f.instanceColor!==null&&t.update(f.instanceColor,r.ARRAY_BUFFER),o.set(f,p))),f.isSkinnedMesh){const _=f.skeleton;o.get(_)!==p&&(_.update(),o.set(_,p))}return m}function u(){o=new WeakMap}function d(f){const p=f.target;p.removeEventListener("dispose",d),t.remove(p.instanceMatrix),p.instanceColor!==null&&t.remove(p.instanceColor)}return{update:l,dispose:u}}class t0 extends Bn{constructor(e,t,s,o,l,u,d,f,p,g){if(g=g!==void 0?g:rs,g!==rs&&g!==no)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");s===void 0&&g===rs&&(s=Er),s===void 0&&g===no&&(s=is),super(null,o,l,u,d,f,g,s,p),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=d!==void 0?d:wn,this.minFilter=f!==void 0?f:wn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const n0=new Bn,i0=new t0(1,1);i0.compareFunction=zg;const r0=new Wg,s0=new Iy,o0=new Qg,Hm=[],Gm=[],Vm=new Float32Array(16),Wm=new Float32Array(9),jm=new Float32Array(4);function ao(r,e,t){const s=r[0];if(s<=0||s>0)return r;const o=e*t;let l=Hm[o];if(l===void 0&&(l=new Float32Array(o),Hm[o]=l),e!==0){s.toArray(l,0);for(let u=1,d=0;u!==e;++u)d+=t,r[u].toArray(l,d)}return l}function Zt(r,e){if(r.length!==e.length)return!1;for(let t=0,s=r.length;t<s;t++)if(r[t]!==e[t])return!1;return!0}function Qt(r,e){for(let t=0,s=e.length;t<s;t++)r[t]=e[t]}function ec(r,e){let t=Gm[e];t===void 0&&(t=new Int32Array(e),Gm[e]=t);for(let s=0;s!==e;++s)t[s]=r.allocateTextureUnit();return t}function ZE(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function QE(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Zt(t,e))return;r.uniform2fv(this.addr,e),Qt(t,e)}}function JE(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Zt(t,e))return;r.uniform3fv(this.addr,e),Qt(t,e)}}function e1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Zt(t,e))return;r.uniform4fv(this.addr,e),Qt(t,e)}}function t1(r,e){const t=this.cache,s=e.elements;if(s===void 0){if(Zt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Qt(t,e)}else{if(Zt(t,s))return;jm.set(s),r.uniformMatrix2fv(this.addr,!1,jm),Qt(t,s)}}function n1(r,e){const t=this.cache,s=e.elements;if(s===void 0){if(Zt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Qt(t,e)}else{if(Zt(t,s))return;Wm.set(s),r.uniformMatrix3fv(this.addr,!1,Wm),Qt(t,s)}}function i1(r,e){const t=this.cache,s=e.elements;if(s===void 0){if(Zt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Qt(t,e)}else{if(Zt(t,s))return;Vm.set(s),r.uniformMatrix4fv(this.addr,!1,Vm),Qt(t,s)}}function r1(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function s1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Zt(t,e))return;r.uniform2iv(this.addr,e),Qt(t,e)}}function o1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Zt(t,e))return;r.uniform3iv(this.addr,e),Qt(t,e)}}function a1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Zt(t,e))return;r.uniform4iv(this.addr,e),Qt(t,e)}}function l1(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function c1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Zt(t,e))return;r.uniform2uiv(this.addr,e),Qt(t,e)}}function u1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Zt(t,e))return;r.uniform3uiv(this.addr,e),Qt(t,e)}}function d1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Zt(t,e))return;r.uniform4uiv(this.addr,e),Qt(t,e)}}function f1(r,e,t){const s=this.cache,o=t.allocateTextureUnit();s[0]!==o&&(r.uniform1i(this.addr,o),s[0]=o);const l=this.type===r.SAMPLER_2D_SHADOW?i0:n0;t.setTexture2D(e||l,o)}function h1(r,e,t){const s=this.cache,o=t.allocateTextureUnit();s[0]!==o&&(r.uniform1i(this.addr,o),s[0]=o),t.setTexture3D(e||s0,o)}function p1(r,e,t){const s=this.cache,o=t.allocateTextureUnit();s[0]!==o&&(r.uniform1i(this.addr,o),s[0]=o),t.setTextureCube(e||o0,o)}function m1(r,e,t){const s=this.cache,o=t.allocateTextureUnit();s[0]!==o&&(r.uniform1i(this.addr,o),s[0]=o),t.setTexture2DArray(e||r0,o)}function g1(r){switch(r){case 5126:return ZE;case 35664:return QE;case 35665:return JE;case 35666:return e1;case 35674:return t1;case 35675:return n1;case 35676:return i1;case 5124:case 35670:return r1;case 35667:case 35671:return s1;case 35668:case 35672:return o1;case 35669:case 35673:return a1;case 5125:return l1;case 36294:return c1;case 36295:return u1;case 36296:return d1;case 35678:case 36198:case 36298:case 36306:case 35682:return f1;case 35679:case 36299:case 36307:return h1;case 35680:case 36300:case 36308:case 36293:return p1;case 36289:case 36303:case 36311:case 36292:return m1}}function v1(r,e){r.uniform1fv(this.addr,e)}function _1(r,e){const t=ao(e,this.size,2);r.uniform2fv(this.addr,t)}function x1(r,e){const t=ao(e,this.size,3);r.uniform3fv(this.addr,t)}function y1(r,e){const t=ao(e,this.size,4);r.uniform4fv(this.addr,t)}function S1(r,e){const t=ao(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function M1(r,e){const t=ao(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function E1(r,e){const t=ao(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function T1(r,e){r.uniform1iv(this.addr,e)}function w1(r,e){r.uniform2iv(this.addr,e)}function A1(r,e){r.uniform3iv(this.addr,e)}function C1(r,e){r.uniform4iv(this.addr,e)}function R1(r,e){r.uniform1uiv(this.addr,e)}function b1(r,e){r.uniform2uiv(this.addr,e)}function L1(r,e){r.uniform3uiv(this.addr,e)}function P1(r,e){r.uniform4uiv(this.addr,e)}function D1(r,e,t){const s=this.cache,o=e.length,l=ec(t,o);Zt(s,l)||(r.uniform1iv(this.addr,l),Qt(s,l));for(let u=0;u!==o;++u)t.setTexture2D(e[u]||n0,l[u])}function I1(r,e,t){const s=this.cache,o=e.length,l=ec(t,o);Zt(s,l)||(r.uniform1iv(this.addr,l),Qt(s,l));for(let u=0;u!==o;++u)t.setTexture3D(e[u]||s0,l[u])}function N1(r,e,t){const s=this.cache,o=e.length,l=ec(t,o);Zt(s,l)||(r.uniform1iv(this.addr,l),Qt(s,l));for(let u=0;u!==o;++u)t.setTextureCube(e[u]||o0,l[u])}function U1(r,e,t){const s=this.cache,o=e.length,l=ec(t,o);Zt(s,l)||(r.uniform1iv(this.addr,l),Qt(s,l));for(let u=0;u!==o;++u)t.setTexture2DArray(e[u]||r0,l[u])}function O1(r){switch(r){case 5126:return v1;case 35664:return _1;case 35665:return x1;case 35666:return y1;case 35674:return S1;case 35675:return M1;case 35676:return E1;case 5124:case 35670:return T1;case 35667:case 35671:return w1;case 35668:case 35672:return A1;case 35669:case 35673:return C1;case 5125:return R1;case 36294:return b1;case 36295:return L1;case 36296:return P1;case 35678:case 36198:case 36298:case 36306:case 35682:return D1;case 35679:case 36299:case 36307:return I1;case 35680:case 36300:case 36308:case 36293:return N1;case 36289:case 36303:case 36311:case 36292:return U1}}class F1{constructor(e,t,s){this.id=e,this.addr=s,this.cache=[],this.type=t.type,this.setValue=g1(t.type)}}class k1{constructor(e,t,s){this.id=e,this.addr=s,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=O1(t.type)}}class B1{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,s){const o=this.seq;for(let l=0,u=o.length;l!==u;++l){const d=o[l];d.setValue(e,t[d.id],s)}}}const vd=/(\w+)(\])?(\[|\.)?/g;function Xm(r,e){r.seq.push(e),r.map[e.id]=e}function z1(r,e,t){const s=r.name,o=s.length;for(vd.lastIndex=0;;){const l=vd.exec(s),u=vd.lastIndex;let d=l[1];const f=l[2]==="]",p=l[3];if(f&&(d=d|0),p===void 0||p==="["&&u+2===o){Xm(t,p===void 0?new F1(d,r,e):new k1(d,r,e));break}else{let m=t.map[d];m===void 0&&(m=new B1(d),Xm(t,m)),t=m}}}class Hl{constructor(e,t){this.seq=[],this.map={};const s=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<s;++o){const l=e.getActiveUniform(t,o),u=e.getUniformLocation(t,l.name);z1(l,u,this)}}setValue(e,t,s,o){const l=this.map[t];l!==void 0&&l.setValue(e,s,o)}setOptional(e,t,s){const o=t[s];o!==void 0&&this.setValue(e,s,o)}static upload(e,t,s,o){for(let l=0,u=t.length;l!==u;++l){const d=t[l],f=s[d.id];f.needsUpdate!==!1&&d.setValue(e,f.value,o)}}static seqWithValue(e,t){const s=[];for(let o=0,l=e.length;o!==l;++o){const u=e[o];u.id in t&&s.push(u)}return s}}function Ym(r,e,t){const s=r.createShader(e);return r.shaderSource(s,t),r.compileShader(s),s}const H1=37297;let G1=0;function V1(r,e){const t=r.split(`
`),s=[],o=Math.max(e-6,0),l=Math.min(e+6,t.length);for(let u=o;u<l;u++){const d=u+1;s.push(`${d===e?">":" "} ${d}: ${t[u]}`)}return s.join(`
`)}function W1(r){const e=Ct.getPrimaries(Ct.workingColorSpace),t=Ct.getPrimaries(r);let s;switch(e===t?s="":e===Xl&&t===jl?s="LinearDisplayP3ToLinearSRGB":e===jl&&t===Xl&&(s="LinearSRGBToLinearDisplayP3"),r){case qi:case Ql:return[s,"LinearTransferOETF"];case cn:case zd:return[s,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[s,"LinearTransferOETF"]}}function qm(r,e,t){const s=r.getShaderParameter(e,r.COMPILE_STATUS),o=r.getShaderInfoLog(e).trim();if(s&&o==="")return"";const l=/ERROR: 0:(\d+)/.exec(o);if(l){const u=parseInt(l[1]);return t.toUpperCase()+`

`+o+`

`+V1(r.getShaderSource(e),u)}else return o}function j1(r,e){const t=W1(e);return`vec4 ${r}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function X1(r,e){let t;switch(e){case ny:t="Linear";break;case iy:t="Reinhard";break;case ry:t="OptimizedCineon";break;case sy:t="ACESFilmic";break;case ay:t="AgX";break;case oy:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Y1(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.normalMapTangentSpace||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter($s).join(`
`)}function q1(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter($s).join(`
`)}function $1(r){const e=[];for(const t in r){const s=r[t];s!==!1&&e.push("#define "+t+" "+s)}return e.join(`
`)}function K1(r,e){const t={},s=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let o=0;o<s;o++){const l=r.getActiveAttrib(e,o),u=l.name;let d=1;l.type===r.FLOAT_MAT2&&(d=2),l.type===r.FLOAT_MAT3&&(d=3),l.type===r.FLOAT_MAT4&&(d=4),t[u]={type:l.type,location:r.getAttribLocation(e,u),locationSize:d}}return t}function $s(r){return r!==""}function $m(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Km(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Z1=/^[ \t]*#include +<([\w\d./]+)>/gm;function Id(r){return r.replace(Z1,J1)}const Q1=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function J1(r,e){let t=ft[e];if(t===void 0){const s=Q1.get(e);if(s!==void 0)t=ft[s],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,s);else throw new Error("Can not resolve #include <"+e+">")}return Id(t)}const eT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Zm(r){return r.replace(eT,tT)}function tT(r,e,t,s){let o="";for(let l=parseInt(e);l<parseInt(t);l++)o+=s.replace(/\[\s*i\s*\]/g,"[ "+l+" ]").replace(/UNROLLED_LOOP_INDEX/g,l);return o}function Qm(r){let e="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function nT(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Rg?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Lx?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Vi&&(e="SHADOWMAP_TYPE_VSM"),e}function iT(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Js:case eo:e="ENVMAP_TYPE_CUBE";break;case Zl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function rT(r){let e="ENVMAP_MODE_REFLECTION";return r.envMap&&r.envMapMode===eo&&(e="ENVMAP_MODE_REFRACTION"),e}function sT(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case bg:e="ENVMAP_BLENDING_MULTIPLY";break;case ey:e="ENVMAP_BLENDING_MIX";break;case ty:e="ENVMAP_BLENDING_ADD";break}return e}function oT(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,s=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:s,maxMip:t}}function aT(r,e,t,s){const o=r.getContext(),l=t.defines;let u=t.vertexShader,d=t.fragmentShader;const f=nT(t),p=iT(t),g=rT(t),m=sT(t),_=oT(t),S=t.isWebGL2?"":Y1(t),E=q1(t),M=$1(l),x=o.createProgram();let y,w,R=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(y=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter($s).join(`
`),y.length>0&&(y+=`
`),w=[S,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter($s).join(`
`),w.length>0&&(w+=`
`)):(y=[Qm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+g:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+f:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($s).join(`
`),w=[S,Qm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+p:"",t.envMap?"#define "+g:"",t.envMap?"#define "+m:"",_?"#define CUBEUV_TEXEL_WIDTH "+_.texelWidth:"",_?"#define CUBEUV_TEXEL_HEIGHT "+_.texelHeight:"",_?"#define CUBEUV_MAX_MIP "+_.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+f:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ar?"#define TONE_MAPPING":"",t.toneMapping!==Ar?ft.tonemapping_pars_fragment:"",t.toneMapping!==Ar?X1("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ft.colorspace_pars_fragment,j1("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter($s).join(`
`)),u=Id(u),u=$m(u,t),u=Km(u,t),d=Id(d),d=$m(d,t),d=Km(d,t),u=Zm(u),d=Zm(d),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(R=`#version 300 es
`,y=[E,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,w=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===gm?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===gm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+w);const b=R+y+u,G=R+w+d,B=Ym(o,o.VERTEX_SHADER,b),U=Ym(o,o.FRAGMENT_SHADER,G);o.attachShader(x,B),o.attachShader(x,U),t.index0AttributeName!==void 0?o.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&o.bindAttribLocation(x,0,"position"),o.linkProgram(x);function he(ie){if(r.debug.checkShaderErrors){const ae=o.getProgramInfoLog(x).trim(),k=o.getShaderInfoLog(B).trim(),H=o.getShaderInfoLog(U).trim();let q=!0,K=!0;if(o.getProgramParameter(x,o.LINK_STATUS)===!1)if(q=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(o,x,B,U);else{const N=qm(o,B,"vertex"),X=qm(o,U,"fragment");console.error("THREE.WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(x,o.VALIDATE_STATUS)+`

Program Info Log: `+ae+`
`+N+`
`+X)}else ae!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ae):(k===""||H==="")&&(K=!1);K&&(ie.diagnostics={runnable:q,programLog:ae,vertexShader:{log:k,prefix:y},fragmentShader:{log:H,prefix:w}})}o.deleteShader(B),o.deleteShader(U),C=new Hl(o,x),D=K1(o,x)}let C;this.getUniforms=function(){return C===void 0&&he(this),C};let D;this.getAttributes=function(){return D===void 0&&he(this),D};let te=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return te===!1&&(te=o.getProgramParameter(x,H1)),te},this.destroy=function(){s.releaseStatesOfProgram(this),o.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=G1++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=B,this.fragmentShader=U,this}let lT=0;class cT{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,s=e.fragmentShader,o=this._getShaderStage(t),l=this._getShaderStage(s),u=this._getShaderCacheForMaterial(e);return u.has(o)===!1&&(u.add(o),o.usedTimes++),u.has(l)===!1&&(u.add(l),l.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const s of t)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let s=t.get(e);return s===void 0&&(s=new Set,t.set(e,s)),s}_getShaderStage(e){const t=this.shaderCache;let s=t.get(e);return s===void 0&&(s=new uT(e),t.set(e,s)),s}}class uT{constructor(e){this.id=lT++,this.code=e,this.usedTimes=0}}function dT(r,e,t,s,o,l,u){const d=new jg,f=new cT,p=[],g=o.isWebGL2,m=o.logarithmicDepthBuffer,_=o.vertexTextures;let S=o.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(C){return C===0?"uv":`uv${C}`}function x(C,D,te,ie,ae){const k=ie.fog,H=ae.geometry,q=C.isMeshStandardMaterial?ie.environment:null,K=(C.isMeshStandardMaterial?t:e).get(C.envMap||q),N=K&&K.mapping===Zl?K.image.height:null,X=E[C.type];C.precision!==null&&(S=o.getMaxPrecision(C.precision),S!==C.precision&&console.warn("THREE.WebGLProgram.getParameters:",C.precision,"not supported, using",S,"instead."));const V=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,I=V!==void 0?V.length:0;let z=0;H.morphAttributes.position!==void 0&&(z=1),H.morphAttributes.normal!==void 0&&(z=2),H.morphAttributes.color!==void 0&&(z=3);let Y,Q,pe,xe;if(X){const Jt=Ti[X];Y=Jt.vertexShader,Q=Jt.fragmentShader}else Y=C.vertexShader,Q=C.fragmentShader,f.update(C),pe=f.getVertexShaderID(C),xe=f.getFragmentShaderID(C);const ye=r.getRenderTarget(),ue=ae.isInstancedMesh===!0,fe=ae.isBatchedMesh===!0,Te=!!C.map,Ge=!!C.matcap,Z=!!K,ht=!!C.aoMap,Fe=!!C.lightMap,Ne=!!C.bumpMap,Pe=!!C.normalMap,$e=!!C.displacementMap,Xe=!!C.emissiveMap,L=!!C.metalnessMap,A=!!C.roughnessMap,ne=C.anisotropy>0,ge=C.clearcoat>0,me=C.iridescence>0,_e=C.sheen>0,Le=C.transmission>0,Ie=ne&&!!C.anisotropyMap,Be=ge&&!!C.clearcoatMap,Ke=ge&&!!C.clearcoatNormalMap,ot=ge&&!!C.clearcoatRoughnessMap,Se=me&&!!C.iridescenceMap,gt=me&&!!C.iridescenceThicknessMap,ct=_e&&!!C.sheenColorMap,it=_e&&!!C.sheenRoughnessMap,qe=!!C.specularMap,ke=!!C.specularColorMap,tt=!!C.specularIntensityMap,_t=Le&&!!C.transmissionMap,Rt=Le&&!!C.thicknessMap,lt=!!C.gradientMap,Ce=!!C.alphaMap,j=C.alphaTest>0,Re=!!C.alphaHash,De=!!C.extensions,nt=!!H.attributes.uv1,Ze=!!H.attributes.uv2,Tt=!!H.attributes.uv3;let wt=Ar;return C.toneMapped&&(ye===null||ye.isXRRenderTarget===!0)&&(wt=r.toneMapping),{isWebGL2:g,shaderID:X,shaderType:C.type,shaderName:C.name,vertexShader:Y,fragmentShader:Q,defines:C.defines,customVertexShaderID:pe,customFragmentShaderID:xe,isRawShaderMaterial:C.isRawShaderMaterial===!0,glslVersion:C.glslVersion,precision:S,batching:fe,instancing:ue,instancingColor:ue&&ae.instanceColor!==null,supportsVertexTextures:_,outputColorSpace:ye===null?r.outputColorSpace:ye.isXRRenderTarget===!0?ye.texture.colorSpace:qi,map:Te,matcap:Ge,envMap:Z,envMapMode:Z&&K.mapping,envMapCubeUVHeight:N,aoMap:ht,lightMap:Fe,bumpMap:Ne,normalMap:Pe,displacementMap:_&&$e,emissiveMap:Xe,normalMapObjectSpace:Pe&&C.normalMapType===xy,normalMapTangentSpace:Pe&&C.normalMapType===Bg,metalnessMap:L,roughnessMap:A,anisotropy:ne,anisotropyMap:Ie,clearcoat:ge,clearcoatMap:Be,clearcoatNormalMap:Ke,clearcoatRoughnessMap:ot,iridescence:me,iridescenceMap:Se,iridescenceThicknessMap:gt,sheen:_e,sheenColorMap:ct,sheenRoughnessMap:it,specularMap:qe,specularColorMap:ke,specularIntensityMap:tt,transmission:Le,transmissionMap:_t,thicknessMap:Rt,gradientMap:lt,opaque:C.transparent===!1&&C.blending===Ks,alphaMap:Ce,alphaTest:j,alphaHash:Re,combine:C.combine,mapUv:Te&&M(C.map.channel),aoMapUv:ht&&M(C.aoMap.channel),lightMapUv:Fe&&M(C.lightMap.channel),bumpMapUv:Ne&&M(C.bumpMap.channel),normalMapUv:Pe&&M(C.normalMap.channel),displacementMapUv:$e&&M(C.displacementMap.channel),emissiveMapUv:Xe&&M(C.emissiveMap.channel),metalnessMapUv:L&&M(C.metalnessMap.channel),roughnessMapUv:A&&M(C.roughnessMap.channel),anisotropyMapUv:Ie&&M(C.anisotropyMap.channel),clearcoatMapUv:Be&&M(C.clearcoatMap.channel),clearcoatNormalMapUv:Ke&&M(C.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ot&&M(C.clearcoatRoughnessMap.channel),iridescenceMapUv:Se&&M(C.iridescenceMap.channel),iridescenceThicknessMapUv:gt&&M(C.iridescenceThicknessMap.channel),sheenColorMapUv:ct&&M(C.sheenColorMap.channel),sheenRoughnessMapUv:it&&M(C.sheenRoughnessMap.channel),specularMapUv:qe&&M(C.specularMap.channel),specularColorMapUv:ke&&M(C.specularColorMap.channel),specularIntensityMapUv:tt&&M(C.specularIntensityMap.channel),transmissionMapUv:_t&&M(C.transmissionMap.channel),thicknessMapUv:Rt&&M(C.thicknessMap.channel),alphaMapUv:Ce&&M(C.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(Pe||ne),vertexColors:C.vertexColors,vertexAlphas:C.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,vertexUv1s:nt,vertexUv2s:Ze,vertexUv3s:Tt,pointsUvs:ae.isPoints===!0&&!!H.attributes.uv&&(Te||Ce),fog:!!k,useFog:C.fog===!0,fogExp2:k&&k.isFogExp2,flatShading:C.flatShading===!0,sizeAttenuation:C.sizeAttenuation===!0,logarithmicDepthBuffer:m,skinning:ae.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:I,morphTextureStride:z,numDirLights:D.directional.length,numPointLights:D.point.length,numSpotLights:D.spot.length,numSpotLightMaps:D.spotLightMap.length,numRectAreaLights:D.rectArea.length,numHemiLights:D.hemi.length,numDirLightShadows:D.directionalShadowMap.length,numPointLightShadows:D.pointShadowMap.length,numSpotLightShadows:D.spotShadowMap.length,numSpotLightShadowsWithMaps:D.numSpotLightShadowsWithMaps,numLightProbes:D.numLightProbes,numClippingPlanes:u.numPlanes,numClipIntersection:u.numIntersection,dithering:C.dithering,shadowMapEnabled:r.shadowMap.enabled&&te.length>0,shadowMapType:r.shadowMap.type,toneMapping:wt,useLegacyLights:r._useLegacyLights,decodeVideoTexture:Te&&C.map.isVideoTexture===!0&&Ct.getTransfer(C.map.colorSpace)===It,premultipliedAlpha:C.premultipliedAlpha,doubleSided:C.side===Wi,flipSided:C.side===kn,useDepthPacking:C.depthPacking>=0,depthPacking:C.depthPacking||0,index0AttributeName:C.index0AttributeName,extensionDerivatives:De&&C.extensions.derivatives===!0,extensionFragDepth:De&&C.extensions.fragDepth===!0,extensionDrawBuffers:De&&C.extensions.drawBuffers===!0,extensionShaderTextureLOD:De&&C.extensions.shaderTextureLOD===!0,extensionClipCullDistance:De&&C.extensions.clipCullDistance&&s.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:g||s.has("EXT_frag_depth"),rendererExtensionDrawBuffers:g||s.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:g||s.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:s.has("KHR_parallel_shader_compile"),customProgramCacheKey:C.customProgramCacheKey()}}function y(C){const D=[];if(C.shaderID?D.push(C.shaderID):(D.push(C.customVertexShaderID),D.push(C.customFragmentShaderID)),C.defines!==void 0)for(const te in C.defines)D.push(te),D.push(C.defines[te]);return C.isRawShaderMaterial===!1&&(w(D,C),R(D,C),D.push(r.outputColorSpace)),D.push(C.customProgramCacheKey),D.join()}function w(C,D){C.push(D.precision),C.push(D.outputColorSpace),C.push(D.envMapMode),C.push(D.envMapCubeUVHeight),C.push(D.mapUv),C.push(D.alphaMapUv),C.push(D.lightMapUv),C.push(D.aoMapUv),C.push(D.bumpMapUv),C.push(D.normalMapUv),C.push(D.displacementMapUv),C.push(D.emissiveMapUv),C.push(D.metalnessMapUv),C.push(D.roughnessMapUv),C.push(D.anisotropyMapUv),C.push(D.clearcoatMapUv),C.push(D.clearcoatNormalMapUv),C.push(D.clearcoatRoughnessMapUv),C.push(D.iridescenceMapUv),C.push(D.iridescenceThicknessMapUv),C.push(D.sheenColorMapUv),C.push(D.sheenRoughnessMapUv),C.push(D.specularMapUv),C.push(D.specularColorMapUv),C.push(D.specularIntensityMapUv),C.push(D.transmissionMapUv),C.push(D.thicknessMapUv),C.push(D.combine),C.push(D.fogExp2),C.push(D.sizeAttenuation),C.push(D.morphTargetsCount),C.push(D.morphAttributeCount),C.push(D.numDirLights),C.push(D.numPointLights),C.push(D.numSpotLights),C.push(D.numSpotLightMaps),C.push(D.numHemiLights),C.push(D.numRectAreaLights),C.push(D.numDirLightShadows),C.push(D.numPointLightShadows),C.push(D.numSpotLightShadows),C.push(D.numSpotLightShadowsWithMaps),C.push(D.numLightProbes),C.push(D.shadowMapType),C.push(D.toneMapping),C.push(D.numClippingPlanes),C.push(D.numClipIntersection),C.push(D.depthPacking)}function R(C,D){d.disableAll(),D.isWebGL2&&d.enable(0),D.supportsVertexTextures&&d.enable(1),D.instancing&&d.enable(2),D.instancingColor&&d.enable(3),D.matcap&&d.enable(4),D.envMap&&d.enable(5),D.normalMapObjectSpace&&d.enable(6),D.normalMapTangentSpace&&d.enable(7),D.clearcoat&&d.enable(8),D.iridescence&&d.enable(9),D.alphaTest&&d.enable(10),D.vertexColors&&d.enable(11),D.vertexAlphas&&d.enable(12),D.vertexUv1s&&d.enable(13),D.vertexUv2s&&d.enable(14),D.vertexUv3s&&d.enable(15),D.vertexTangents&&d.enable(16),D.anisotropy&&d.enable(17),D.alphaHash&&d.enable(18),D.batching&&d.enable(19),C.push(d.mask),d.disableAll(),D.fog&&d.enable(0),D.useFog&&d.enable(1),D.flatShading&&d.enable(2),D.logarithmicDepthBuffer&&d.enable(3),D.skinning&&d.enable(4),D.morphTargets&&d.enable(5),D.morphNormals&&d.enable(6),D.morphColors&&d.enable(7),D.premultipliedAlpha&&d.enable(8),D.shadowMapEnabled&&d.enable(9),D.useLegacyLights&&d.enable(10),D.doubleSided&&d.enable(11),D.flipSided&&d.enable(12),D.useDepthPacking&&d.enable(13),D.dithering&&d.enable(14),D.transmission&&d.enable(15),D.sheen&&d.enable(16),D.opaque&&d.enable(17),D.pointsUvs&&d.enable(18),D.decodeVideoTexture&&d.enable(19),C.push(d.mask)}function b(C){const D=E[C.type];let te;if(D){const ie=Ti[D];te=Yy.clone(ie.uniforms)}else te=C.uniforms;return te}function G(C,D){let te;for(let ie=0,ae=p.length;ie<ae;ie++){const k=p[ie];if(k.cacheKey===D){te=k,++te.usedTimes;break}}return te===void 0&&(te=new aT(r,D,C,l),p.push(te)),te}function B(C){if(--C.usedTimes===0){const D=p.indexOf(C);p[D]=p[p.length-1],p.pop(),C.destroy()}}function U(C){f.remove(C)}function he(){f.dispose()}return{getParameters:x,getProgramCacheKey:y,getUniforms:b,acquireProgram:G,releaseProgram:B,releaseShaderCache:U,programs:p,dispose:he}}function fT(){let r=new WeakMap;function e(l){let u=r.get(l);return u===void 0&&(u={},r.set(l,u)),u}function t(l){r.delete(l)}function s(l,u,d){r.get(l)[u]=d}function o(){r=new WeakMap}return{get:e,remove:t,update:s,dispose:o}}function hT(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Jm(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function eg(){const r=[];let e=0;const t=[],s=[],o=[];function l(){e=0,t.length=0,s.length=0,o.length=0}function u(m,_,S,E,M,x){let y=r[e];return y===void 0?(y={id:m.id,object:m,geometry:_,material:S,groupOrder:E,renderOrder:m.renderOrder,z:M,group:x},r[e]=y):(y.id=m.id,y.object=m,y.geometry=_,y.material=S,y.groupOrder=E,y.renderOrder=m.renderOrder,y.z=M,y.group=x),e++,y}function d(m,_,S,E,M,x){const y=u(m,_,S,E,M,x);S.transmission>0?s.push(y):S.transparent===!0?o.push(y):t.push(y)}function f(m,_,S,E,M,x){const y=u(m,_,S,E,M,x);S.transmission>0?s.unshift(y):S.transparent===!0?o.unshift(y):t.unshift(y)}function p(m,_){t.length>1&&t.sort(m||hT),s.length>1&&s.sort(_||Jm),o.length>1&&o.sort(_||Jm)}function g(){for(let m=e,_=r.length;m<_;m++){const S=r[m];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:t,transmissive:s,transparent:o,init:l,push:d,unshift:f,finish:g,sort:p}}function pT(){let r=new WeakMap;function e(s,o){const l=r.get(s);let u;return l===void 0?(u=new eg,r.set(s,[u])):o>=l.length?(u=new eg,l.push(u)):u=l[o],u}function t(){r=new WeakMap}return{get:e,dispose:t}}function mT(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new ce,color:new Mt};break;case"SpotLight":t={position:new ce,direction:new ce,color:new Mt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new ce,color:new Mt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new ce,skyColor:new Mt,groundColor:new Mt};break;case"RectAreaLight":t={color:new Mt,position:new ce,halfWidth:new ce,halfHeight:new ce};break}return r[e.id]=t,t}}}function gT(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let vT=0;function _T(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function xT(r,e){const t=new mT,s=gT(),o={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let g=0;g<9;g++)o.probe.push(new ce);const l=new ce,u=new Kt,d=new Kt;function f(g,m){let _=0,S=0,E=0;for(let ie=0;ie<9;ie++)o.probe[ie].set(0,0,0);let M=0,x=0,y=0,w=0,R=0,b=0,G=0,B=0,U=0,he=0,C=0;g.sort(_T);const D=m===!0?Math.PI:1;for(let ie=0,ae=g.length;ie<ae;ie++){const k=g[ie],H=k.color,q=k.intensity,K=k.distance,N=k.shadow&&k.shadow.map?k.shadow.map.texture:null;if(k.isAmbientLight)_+=H.r*q*D,S+=H.g*q*D,E+=H.b*q*D;else if(k.isLightProbe){for(let X=0;X<9;X++)o.probe[X].addScaledVector(k.sh.coefficients[X],q);C++}else if(k.isDirectionalLight){const X=t.get(k);if(X.color.copy(k.color).multiplyScalar(k.intensity*D),k.castShadow){const V=k.shadow,I=s.get(k);I.shadowBias=V.bias,I.shadowNormalBias=V.normalBias,I.shadowRadius=V.radius,I.shadowMapSize=V.mapSize,o.directionalShadow[M]=I,o.directionalShadowMap[M]=N,o.directionalShadowMatrix[M]=k.shadow.matrix,b++}o.directional[M]=X,M++}else if(k.isSpotLight){const X=t.get(k);X.position.setFromMatrixPosition(k.matrixWorld),X.color.copy(H).multiplyScalar(q*D),X.distance=K,X.coneCos=Math.cos(k.angle),X.penumbraCos=Math.cos(k.angle*(1-k.penumbra)),X.decay=k.decay,o.spot[y]=X;const V=k.shadow;if(k.map&&(o.spotLightMap[U]=k.map,U++,V.updateMatrices(k),k.castShadow&&he++),o.spotLightMatrix[y]=V.matrix,k.castShadow){const I=s.get(k);I.shadowBias=V.bias,I.shadowNormalBias=V.normalBias,I.shadowRadius=V.radius,I.shadowMapSize=V.mapSize,o.spotShadow[y]=I,o.spotShadowMap[y]=N,B++}y++}else if(k.isRectAreaLight){const X=t.get(k);X.color.copy(H).multiplyScalar(q),X.halfWidth.set(k.width*.5,0,0),X.halfHeight.set(0,k.height*.5,0),o.rectArea[w]=X,w++}else if(k.isPointLight){const X=t.get(k);if(X.color.copy(k.color).multiplyScalar(k.intensity*D),X.distance=k.distance,X.decay=k.decay,k.castShadow){const V=k.shadow,I=s.get(k);I.shadowBias=V.bias,I.shadowNormalBias=V.normalBias,I.shadowRadius=V.radius,I.shadowMapSize=V.mapSize,I.shadowCameraNear=V.camera.near,I.shadowCameraFar=V.camera.far,o.pointShadow[x]=I,o.pointShadowMap[x]=N,o.pointShadowMatrix[x]=k.shadow.matrix,G++}o.point[x]=X,x++}else if(k.isHemisphereLight){const X=t.get(k);X.skyColor.copy(k.color).multiplyScalar(q*D),X.groundColor.copy(k.groundColor).multiplyScalar(q*D),o.hemi[R]=X,R++}}w>0&&(e.isWebGL2?r.has("OES_texture_float_linear")===!0?(o.rectAreaLTC1=be.LTC_FLOAT_1,o.rectAreaLTC2=be.LTC_FLOAT_2):(o.rectAreaLTC1=be.LTC_HALF_1,o.rectAreaLTC2=be.LTC_HALF_2):r.has("OES_texture_float_linear")===!0?(o.rectAreaLTC1=be.LTC_FLOAT_1,o.rectAreaLTC2=be.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(o.rectAreaLTC1=be.LTC_HALF_1,o.rectAreaLTC2=be.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),o.ambient[0]=_,o.ambient[1]=S,o.ambient[2]=E;const te=o.hash;(te.directionalLength!==M||te.pointLength!==x||te.spotLength!==y||te.rectAreaLength!==w||te.hemiLength!==R||te.numDirectionalShadows!==b||te.numPointShadows!==G||te.numSpotShadows!==B||te.numSpotMaps!==U||te.numLightProbes!==C)&&(o.directional.length=M,o.spot.length=y,o.rectArea.length=w,o.point.length=x,o.hemi.length=R,o.directionalShadow.length=b,o.directionalShadowMap.length=b,o.pointShadow.length=G,o.pointShadowMap.length=G,o.spotShadow.length=B,o.spotShadowMap.length=B,o.directionalShadowMatrix.length=b,o.pointShadowMatrix.length=G,o.spotLightMatrix.length=B+U-he,o.spotLightMap.length=U,o.numSpotLightShadowsWithMaps=he,o.numLightProbes=C,te.directionalLength=M,te.pointLength=x,te.spotLength=y,te.rectAreaLength=w,te.hemiLength=R,te.numDirectionalShadows=b,te.numPointShadows=G,te.numSpotShadows=B,te.numSpotMaps=U,te.numLightProbes=C,o.version=vT++)}function p(g,m){let _=0,S=0,E=0,M=0,x=0;const y=m.matrixWorldInverse;for(let w=0,R=g.length;w<R;w++){const b=g[w];if(b.isDirectionalLight){const G=o.directional[_];G.direction.setFromMatrixPosition(b.matrixWorld),l.setFromMatrixPosition(b.target.matrixWorld),G.direction.sub(l),G.direction.transformDirection(y),_++}else if(b.isSpotLight){const G=o.spot[E];G.position.setFromMatrixPosition(b.matrixWorld),G.position.applyMatrix4(y),G.direction.setFromMatrixPosition(b.matrixWorld),l.setFromMatrixPosition(b.target.matrixWorld),G.direction.sub(l),G.direction.transformDirection(y),E++}else if(b.isRectAreaLight){const G=o.rectArea[M];G.position.setFromMatrixPosition(b.matrixWorld),G.position.applyMatrix4(y),d.identity(),u.copy(b.matrixWorld),u.premultiply(y),d.extractRotation(u),G.halfWidth.set(b.width*.5,0,0),G.halfHeight.set(0,b.height*.5,0),G.halfWidth.applyMatrix4(d),G.halfHeight.applyMatrix4(d),M++}else if(b.isPointLight){const G=o.point[S];G.position.setFromMatrixPosition(b.matrixWorld),G.position.applyMatrix4(y),S++}else if(b.isHemisphereLight){const G=o.hemi[x];G.direction.setFromMatrixPosition(b.matrixWorld),G.direction.transformDirection(y),x++}}}return{setup:f,setupView:p,state:o}}function tg(r,e){const t=new xT(r,e),s=[],o=[];function l(){s.length=0,o.length=0}function u(m){s.push(m)}function d(m){o.push(m)}function f(m){t.setup(s,m)}function p(m){t.setupView(s,m)}return{init:l,state:{lightsArray:s,shadowsArray:o,lights:t},setupLights:f,setupLightsView:p,pushLight:u,pushShadow:d}}function yT(r,e){let t=new WeakMap;function s(l,u=0){const d=t.get(l);let f;return d===void 0?(f=new tg(r,e),t.set(l,[f])):u>=d.length?(f=new tg(r,e),d.push(f)):f=d[u],f}function o(){t=new WeakMap}return{get:s,dispose:o}}class ST extends aa{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=vy,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class MT extends aa{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const ET=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,TT=`uniform sampler2D shadow_pass;
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
}`;function wT(r,e,t){let s=new Gd;const o=new Et,l=new Et,u=new sn,d=new ST({depthPacking:_y}),f=new MT,p={},g=t.maxTextureSize,m={[Rr]:kn,[kn]:Rr,[Wi]:Wi},_=new as({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Et},radius:{value:4}},vertexShader:ET,fragmentShader:TT}),S=_.clone();S.defines.HORIZONTAL_PASS=1;const E=new Lr;E.setAttribute("position",new wi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new Yi(E,_),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Rg;let y=this.type;this.render=function(B,U,he){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||B.length===0)return;const C=r.getRenderTarget(),D=r.getActiveCubeFace(),te=r.getActiveMipmapLevel(),ie=r.state;ie.setBlending(wr),ie.buffers.color.setClear(1,1,1,1),ie.buffers.depth.setTest(!0),ie.setScissorTest(!1);const ae=y!==Vi&&this.type===Vi,k=y===Vi&&this.type!==Vi;for(let H=0,q=B.length;H<q;H++){const K=B[H],N=K.shadow;if(N===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;o.copy(N.mapSize);const X=N.getFrameExtents();if(o.multiply(X),l.copy(N.mapSize),(o.x>g||o.y>g)&&(o.x>g&&(l.x=Math.floor(g/X.x),o.x=l.x*X.x,N.mapSize.x=l.x),o.y>g&&(l.y=Math.floor(g/X.y),o.y=l.y*X.y,N.mapSize.y=l.y)),N.map===null||ae===!0||k===!0){const I=this.type!==Vi?{minFilter:wn,magFilter:wn}:{};N.map!==null&&N.map.dispose(),N.map=new os(o.x,o.y,I),N.map.texture.name=K.name+".shadowMap",N.camera.updateProjectionMatrix()}r.setRenderTarget(N.map),r.clear();const V=N.getViewportCount();for(let I=0;I<V;I++){const z=N.getViewport(I);u.set(l.x*z.x,l.y*z.y,l.x*z.z,l.y*z.w),ie.viewport(u),N.updateMatrices(K,I),s=N.getFrustum(),b(U,he,N.camera,K,this.type)}N.isPointLightShadow!==!0&&this.type===Vi&&w(N,he),N.needsUpdate=!1}y=this.type,x.needsUpdate=!1,r.setRenderTarget(C,D,te)};function w(B,U){const he=e.update(M);_.defines.VSM_SAMPLES!==B.blurSamples&&(_.defines.VSM_SAMPLES=B.blurSamples,S.defines.VSM_SAMPLES=B.blurSamples,_.needsUpdate=!0,S.needsUpdate=!0),B.mapPass===null&&(B.mapPass=new os(o.x,o.y)),_.uniforms.shadow_pass.value=B.map.texture,_.uniforms.resolution.value=B.mapSize,_.uniforms.radius.value=B.radius,r.setRenderTarget(B.mapPass),r.clear(),r.renderBufferDirect(U,null,he,_,M,null),S.uniforms.shadow_pass.value=B.mapPass.texture,S.uniforms.resolution.value=B.mapSize,S.uniforms.radius.value=B.radius,r.setRenderTarget(B.map),r.clear(),r.renderBufferDirect(U,null,he,S,M,null)}function R(B,U,he,C){let D=null;const te=he.isPointLight===!0?B.customDistanceMaterial:B.customDepthMaterial;if(te!==void 0)D=te;else if(D=he.isPointLight===!0?f:d,r.localClippingEnabled&&U.clipShadows===!0&&Array.isArray(U.clippingPlanes)&&U.clippingPlanes.length!==0||U.displacementMap&&U.displacementScale!==0||U.alphaMap&&U.alphaTest>0||U.map&&U.alphaTest>0){const ie=D.uuid,ae=U.uuid;let k=p[ie];k===void 0&&(k={},p[ie]=k);let H=k[ae];H===void 0&&(H=D.clone(),k[ae]=H,U.addEventListener("dispose",G)),D=H}if(D.visible=U.visible,D.wireframe=U.wireframe,C===Vi?D.side=U.shadowSide!==null?U.shadowSide:U.side:D.side=U.shadowSide!==null?U.shadowSide:m[U.side],D.alphaMap=U.alphaMap,D.alphaTest=U.alphaTest,D.map=U.map,D.clipShadows=U.clipShadows,D.clippingPlanes=U.clippingPlanes,D.clipIntersection=U.clipIntersection,D.displacementMap=U.displacementMap,D.displacementScale=U.displacementScale,D.displacementBias=U.displacementBias,D.wireframeLinewidth=U.wireframeLinewidth,D.linewidth=U.linewidth,he.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const ie=r.properties.get(D);ie.light=he}return D}function b(B,U,he,C,D){if(B.visible===!1)return;if(B.layers.test(U.layers)&&(B.isMesh||B.isLine||B.isPoints)&&(B.castShadow||B.receiveShadow&&D===Vi)&&(!B.frustumCulled||s.intersectsObject(B))){B.modelViewMatrix.multiplyMatrices(he.matrixWorldInverse,B.matrixWorld);const ae=e.update(B),k=B.material;if(Array.isArray(k)){const H=ae.groups;for(let q=0,K=H.length;q<K;q++){const N=H[q],X=k[N.materialIndex];if(X&&X.visible){const V=R(B,X,C,D);B.onBeforeShadow(r,B,U,he,ae,V,N),r.renderBufferDirect(he,null,ae,V,B,N),B.onAfterShadow(r,B,U,he,ae,V,N)}}}else if(k.visible){const H=R(B,k,C,D);B.onBeforeShadow(r,B,U,he,ae,H,null),r.renderBufferDirect(he,null,ae,H,B,null),B.onAfterShadow(r,B,U,he,ae,H,null)}}const ie=B.children;for(let ae=0,k=ie.length;ae<k;ae++)b(ie[ae],U,he,C,D)}function G(B){B.target.removeEventListener("dispose",G);for(const he in p){const C=p[he],D=B.target.uuid;D in C&&(C[D].dispose(),delete C[D])}}}function AT(r,e,t){const s=t.isWebGL2;function o(){let j=!1;const Re=new sn;let De=null;const nt=new sn(0,0,0,0);return{setMask:function(Ze){De!==Ze&&!j&&(r.colorMask(Ze,Ze,Ze,Ze),De=Ze)},setLocked:function(Ze){j=Ze},setClear:function(Ze,Tt,wt,Bt,Jt){Jt===!0&&(Ze*=Bt,Tt*=Bt,wt*=Bt),Re.set(Ze,Tt,wt,Bt),nt.equals(Re)===!1&&(r.clearColor(Ze,Tt,wt,Bt),nt.copy(Re))},reset:function(){j=!1,De=null,nt.set(-1,0,0,0)}}}function l(){let j=!1,Re=null,De=null,nt=null;return{setTest:function(Ze){Ze?fe(r.DEPTH_TEST):Te(r.DEPTH_TEST)},setMask:function(Ze){Re!==Ze&&!j&&(r.depthMask(Ze),Re=Ze)},setFunc:function(Ze){if(De!==Ze){switch(Ze){case Yx:r.depthFunc(r.NEVER);break;case qx:r.depthFunc(r.ALWAYS);break;case $x:r.depthFunc(r.LESS);break;case Gl:r.depthFunc(r.LEQUAL);break;case Kx:r.depthFunc(r.EQUAL);break;case Zx:r.depthFunc(r.GEQUAL);break;case Qx:r.depthFunc(r.GREATER);break;case Jx:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}De=Ze}},setLocked:function(Ze){j=Ze},setClear:function(Ze){nt!==Ze&&(r.clearDepth(Ze),nt=Ze)},reset:function(){j=!1,Re=null,De=null,nt=null}}}function u(){let j=!1,Re=null,De=null,nt=null,Ze=null,Tt=null,wt=null,Bt=null,Jt=null;return{setTest:function(yt){j||(yt?fe(r.STENCIL_TEST):Te(r.STENCIL_TEST))},setMask:function(yt){Re!==yt&&!j&&(r.stencilMask(yt),Re=yt)},setFunc:function(yt,Yt,dn){(De!==yt||nt!==Yt||Ze!==dn)&&(r.stencilFunc(yt,Yt,dn),De=yt,nt=Yt,Ze=dn)},setOp:function(yt,Yt,dn){(Tt!==yt||wt!==Yt||Bt!==dn)&&(r.stencilOp(yt,Yt,dn),Tt=yt,wt=Yt,Bt=dn)},setLocked:function(yt){j=yt},setClear:function(yt){Jt!==yt&&(r.clearStencil(yt),Jt=yt)},reset:function(){j=!1,Re=null,De=null,nt=null,Ze=null,Tt=null,wt=null,Bt=null,Jt=null}}}const d=new o,f=new l,p=new u,g=new WeakMap,m=new WeakMap;let _={},S={},E=new WeakMap,M=[],x=null,y=!1,w=null,R=null,b=null,G=null,B=null,U=null,he=null,C=new Mt(0,0,0),D=0,te=!1,ie=null,ae=null,k=null,H=null,q=null;const K=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let N=!1,X=0;const V=r.getParameter(r.VERSION);V.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(V)[1]),N=X>=1):V.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),N=X>=2);let I=null,z={};const Y=r.getParameter(r.SCISSOR_BOX),Q=r.getParameter(r.VIEWPORT),pe=new sn().fromArray(Y),xe=new sn().fromArray(Q);function ye(j,Re,De,nt){const Ze=new Uint8Array(4),Tt=r.createTexture();r.bindTexture(j,Tt),r.texParameteri(j,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(j,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let wt=0;wt<De;wt++)s&&(j===r.TEXTURE_3D||j===r.TEXTURE_2D_ARRAY)?r.texImage3D(Re,0,r.RGBA,1,1,nt,0,r.RGBA,r.UNSIGNED_BYTE,Ze):r.texImage2D(Re+wt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Ze);return Tt}const ue={};ue[r.TEXTURE_2D]=ye(r.TEXTURE_2D,r.TEXTURE_2D,1),ue[r.TEXTURE_CUBE_MAP]=ye(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),s&&(ue[r.TEXTURE_2D_ARRAY]=ye(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),ue[r.TEXTURE_3D]=ye(r.TEXTURE_3D,r.TEXTURE_3D,1,1)),d.setClear(0,0,0,1),f.setClear(1),p.setClear(0),fe(r.DEPTH_TEST),f.setFunc(Gl),Xe(!1),L(Op),fe(r.CULL_FACE),Pe(wr);function fe(j){_[j]!==!0&&(r.enable(j),_[j]=!0)}function Te(j){_[j]!==!1&&(r.disable(j),_[j]=!1)}function Ge(j,Re){return S[j]!==Re?(r.bindFramebuffer(j,Re),S[j]=Re,s&&(j===r.DRAW_FRAMEBUFFER&&(S[r.FRAMEBUFFER]=Re),j===r.FRAMEBUFFER&&(S[r.DRAW_FRAMEBUFFER]=Re)),!0):!1}function Z(j,Re){let De=M,nt=!1;if(j)if(De=E.get(Re),De===void 0&&(De=[],E.set(Re,De)),j.isWebGLMultipleRenderTargets){const Ze=j.texture;if(De.length!==Ze.length||De[0]!==r.COLOR_ATTACHMENT0){for(let Tt=0,wt=Ze.length;Tt<wt;Tt++)De[Tt]=r.COLOR_ATTACHMENT0+Tt;De.length=Ze.length,nt=!0}}else De[0]!==r.COLOR_ATTACHMENT0&&(De[0]=r.COLOR_ATTACHMENT0,nt=!0);else De[0]!==r.BACK&&(De[0]=r.BACK,nt=!0);nt&&(t.isWebGL2?r.drawBuffers(De):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(De))}function ht(j){return x!==j?(r.useProgram(j),x=j,!0):!1}const Fe={[Jr]:r.FUNC_ADD,[Dx]:r.FUNC_SUBTRACT,[Ix]:r.FUNC_REVERSE_SUBTRACT};if(s)Fe[zp]=r.MIN,Fe[Hp]=r.MAX;else{const j=e.get("EXT_blend_minmax");j!==null&&(Fe[zp]=j.MIN_EXT,Fe[Hp]=j.MAX_EXT)}const Ne={[Nx]:r.ZERO,[Ux]:r.ONE,[Ox]:r.SRC_COLOR,[wd]:r.SRC_ALPHA,[Gx]:r.SRC_ALPHA_SATURATE,[zx]:r.DST_COLOR,[kx]:r.DST_ALPHA,[Fx]:r.ONE_MINUS_SRC_COLOR,[Ad]:r.ONE_MINUS_SRC_ALPHA,[Hx]:r.ONE_MINUS_DST_COLOR,[Bx]:r.ONE_MINUS_DST_ALPHA,[Vx]:r.CONSTANT_COLOR,[Wx]:r.ONE_MINUS_CONSTANT_COLOR,[jx]:r.CONSTANT_ALPHA,[Xx]:r.ONE_MINUS_CONSTANT_ALPHA};function Pe(j,Re,De,nt,Ze,Tt,wt,Bt,Jt,yt){if(j===wr){y===!0&&(Te(r.BLEND),y=!1);return}if(y===!1&&(fe(r.BLEND),y=!0),j!==Px){if(j!==w||yt!==te){if((R!==Jr||B!==Jr)&&(r.blendEquation(r.FUNC_ADD),R=Jr,B=Jr),yt)switch(j){case Ks:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Fp:r.blendFunc(r.ONE,r.ONE);break;case kp:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Bp:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",j);break}else switch(j){case Ks:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Fp:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case kp:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Bp:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",j);break}b=null,G=null,U=null,he=null,C.set(0,0,0),D=0,w=j,te=yt}return}Ze=Ze||Re,Tt=Tt||De,wt=wt||nt,(Re!==R||Ze!==B)&&(r.blendEquationSeparate(Fe[Re],Fe[Ze]),R=Re,B=Ze),(De!==b||nt!==G||Tt!==U||wt!==he)&&(r.blendFuncSeparate(Ne[De],Ne[nt],Ne[Tt],Ne[wt]),b=De,G=nt,U=Tt,he=wt),(Bt.equals(C)===!1||Jt!==D)&&(r.blendColor(Bt.r,Bt.g,Bt.b,Jt),C.copy(Bt),D=Jt),w=j,te=!1}function $e(j,Re){j.side===Wi?Te(r.CULL_FACE):fe(r.CULL_FACE);let De=j.side===kn;Re&&(De=!De),Xe(De),j.blending===Ks&&j.transparent===!1?Pe(wr):Pe(j.blending,j.blendEquation,j.blendSrc,j.blendDst,j.blendEquationAlpha,j.blendSrcAlpha,j.blendDstAlpha,j.blendColor,j.blendAlpha,j.premultipliedAlpha),f.setFunc(j.depthFunc),f.setTest(j.depthTest),f.setMask(j.depthWrite),d.setMask(j.colorWrite);const nt=j.stencilWrite;p.setTest(nt),nt&&(p.setMask(j.stencilWriteMask),p.setFunc(j.stencilFunc,j.stencilRef,j.stencilFuncMask),p.setOp(j.stencilFail,j.stencilZFail,j.stencilZPass)),ne(j.polygonOffset,j.polygonOffsetFactor,j.polygonOffsetUnits),j.alphaToCoverage===!0?fe(r.SAMPLE_ALPHA_TO_COVERAGE):Te(r.SAMPLE_ALPHA_TO_COVERAGE)}function Xe(j){ie!==j&&(j?r.frontFace(r.CW):r.frontFace(r.CCW),ie=j)}function L(j){j!==Rx?(fe(r.CULL_FACE),j!==ae&&(j===Op?r.cullFace(r.BACK):j===bx?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Te(r.CULL_FACE),ae=j}function A(j){j!==k&&(N&&r.lineWidth(j),k=j)}function ne(j,Re,De){j?(fe(r.POLYGON_OFFSET_FILL),(H!==Re||q!==De)&&(r.polygonOffset(Re,De),H=Re,q=De)):Te(r.POLYGON_OFFSET_FILL)}function ge(j){j?fe(r.SCISSOR_TEST):Te(r.SCISSOR_TEST)}function me(j){j===void 0&&(j=r.TEXTURE0+K-1),I!==j&&(r.activeTexture(j),I=j)}function _e(j,Re,De){De===void 0&&(I===null?De=r.TEXTURE0+K-1:De=I);let nt=z[De];nt===void 0&&(nt={type:void 0,texture:void 0},z[De]=nt),(nt.type!==j||nt.texture!==Re)&&(I!==De&&(r.activeTexture(De),I=De),r.bindTexture(j,Re||ue[j]),nt.type=j,nt.texture=Re)}function Le(){const j=z[I];j!==void 0&&j.type!==void 0&&(r.bindTexture(j.type,null),j.type=void 0,j.texture=void 0)}function Ie(){try{r.compressedTexImage2D.apply(r,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function Be(){try{r.compressedTexImage3D.apply(r,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function Ke(){try{r.texSubImage2D.apply(r,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function ot(){try{r.texSubImage3D.apply(r,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function Se(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function gt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function ct(){try{r.texStorage2D.apply(r,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function it(){try{r.texStorage3D.apply(r,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function qe(){try{r.texImage2D.apply(r,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function ke(){try{r.texImage3D.apply(r,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function tt(j){pe.equals(j)===!1&&(r.scissor(j.x,j.y,j.z,j.w),pe.copy(j))}function _t(j){xe.equals(j)===!1&&(r.viewport(j.x,j.y,j.z,j.w),xe.copy(j))}function Rt(j,Re){let De=m.get(Re);De===void 0&&(De=new WeakMap,m.set(Re,De));let nt=De.get(j);nt===void 0&&(nt=r.getUniformBlockIndex(Re,j.name),De.set(j,nt))}function lt(j,Re){const nt=m.get(Re).get(j);g.get(Re)!==nt&&(r.uniformBlockBinding(Re,nt,j.__bindingPointIndex),g.set(Re,nt))}function Ce(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),s===!0&&(r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),_={},I=null,z={},S={},E=new WeakMap,M=[],x=null,y=!1,w=null,R=null,b=null,G=null,B=null,U=null,he=null,C=new Mt(0,0,0),D=0,te=!1,ie=null,ae=null,k=null,H=null,q=null,pe.set(0,0,r.canvas.width,r.canvas.height),xe.set(0,0,r.canvas.width,r.canvas.height),d.reset(),f.reset(),p.reset()}return{buffers:{color:d,depth:f,stencil:p},enable:fe,disable:Te,bindFramebuffer:Ge,drawBuffers:Z,useProgram:ht,setBlending:Pe,setMaterial:$e,setFlipSided:Xe,setCullFace:L,setLineWidth:A,setPolygonOffset:ne,setScissorTest:ge,activeTexture:me,bindTexture:_e,unbindTexture:Le,compressedTexImage2D:Ie,compressedTexImage3D:Be,texImage2D:qe,texImage3D:ke,updateUBOMapping:Rt,uniformBlockBinding:lt,texStorage2D:ct,texStorage3D:it,texSubImage2D:Ke,texSubImage3D:ot,compressedTexSubImage2D:Se,compressedTexSubImage3D:gt,scissor:tt,viewport:_t,reset:Ce}}function CT(r,e,t,s,o,l,u){const d=o.isWebGL2,f=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),g=new WeakMap;let m;const _=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(L,A){return S?new OffscreenCanvas(L,A):ql("canvas")}function M(L,A,ne,ge){let me=1;if((L.width>ge||L.height>ge)&&(me=ge/Math.max(L.width,L.height)),me<1||A===!0)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap){const _e=A?Dd:Math.floor,Le=_e(me*L.width),Ie=_e(me*L.height);m===void 0&&(m=E(Le,Ie));const Be=ne?E(Le,Ie):m;return Be.width=Le,Be.height=Ie,Be.getContext("2d").drawImage(L,0,0,Le,Ie),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+L.width+"x"+L.height+") to ("+Le+"x"+Ie+")."),Be}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+L.width+"x"+L.height+")."),L;return L}function x(L){return vm(L.width)&&vm(L.height)}function y(L){return d?!1:L.wrapS!==ri||L.wrapT!==ri||L.minFilter!==wn&&L.minFilter!==Yn}function w(L,A){return L.generateMipmaps&&A&&L.minFilter!==wn&&L.minFilter!==Yn}function R(L){r.generateMipmap(L)}function b(L,A,ne,ge,me=!1){if(d===!1)return A;if(L!==null){if(r[L]!==void 0)return r[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let _e=A;if(A===r.RED&&(ne===r.FLOAT&&(_e=r.R32F),ne===r.HALF_FLOAT&&(_e=r.R16F),ne===r.UNSIGNED_BYTE&&(_e=r.R8)),A===r.RED_INTEGER&&(ne===r.UNSIGNED_BYTE&&(_e=r.R8UI),ne===r.UNSIGNED_SHORT&&(_e=r.R16UI),ne===r.UNSIGNED_INT&&(_e=r.R32UI),ne===r.BYTE&&(_e=r.R8I),ne===r.SHORT&&(_e=r.R16I),ne===r.INT&&(_e=r.R32I)),A===r.RG&&(ne===r.FLOAT&&(_e=r.RG32F),ne===r.HALF_FLOAT&&(_e=r.RG16F),ne===r.UNSIGNED_BYTE&&(_e=r.RG8)),A===r.RGBA){const Le=me?Wl:Ct.getTransfer(ge);ne===r.FLOAT&&(_e=r.RGBA32F),ne===r.HALF_FLOAT&&(_e=r.RGBA16F),ne===r.UNSIGNED_BYTE&&(_e=Le===It?r.SRGB8_ALPHA8:r.RGBA8),ne===r.UNSIGNED_SHORT_4_4_4_4&&(_e=r.RGBA4),ne===r.UNSIGNED_SHORT_5_5_5_1&&(_e=r.RGB5_A1)}return(_e===r.R16F||_e===r.R32F||_e===r.RG16F||_e===r.RG32F||_e===r.RGBA16F||_e===r.RGBA32F)&&e.get("EXT_color_buffer_float"),_e}function G(L,A,ne){return w(L,ne)===!0||L.isFramebufferTexture&&L.minFilter!==wn&&L.minFilter!==Yn?Math.log2(Math.max(A.width,A.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?A.mipmaps.length:1}function B(L){return L===wn||L===Gp||L===Gu?r.NEAREST:r.LINEAR}function U(L){const A=L.target;A.removeEventListener("dispose",U),C(A),A.isVideoTexture&&g.delete(A)}function he(L){const A=L.target;A.removeEventListener("dispose",he),te(A)}function C(L){const A=s.get(L);if(A.__webglInit===void 0)return;const ne=L.source,ge=_.get(ne);if(ge){const me=ge[A.__cacheKey];me.usedTimes--,me.usedTimes===0&&D(L),Object.keys(ge).length===0&&_.delete(ne)}s.remove(L)}function D(L){const A=s.get(L);r.deleteTexture(A.__webglTexture);const ne=L.source,ge=_.get(ne);delete ge[A.__cacheKey],u.memory.textures--}function te(L){const A=L.texture,ne=s.get(L),ge=s.get(A);if(ge.__webglTexture!==void 0&&(r.deleteTexture(ge.__webglTexture),u.memory.textures--),L.depthTexture&&L.depthTexture.dispose(),L.isWebGLCubeRenderTarget)for(let me=0;me<6;me++){if(Array.isArray(ne.__webglFramebuffer[me]))for(let _e=0;_e<ne.__webglFramebuffer[me].length;_e++)r.deleteFramebuffer(ne.__webglFramebuffer[me][_e]);else r.deleteFramebuffer(ne.__webglFramebuffer[me]);ne.__webglDepthbuffer&&r.deleteRenderbuffer(ne.__webglDepthbuffer[me])}else{if(Array.isArray(ne.__webglFramebuffer))for(let me=0;me<ne.__webglFramebuffer.length;me++)r.deleteFramebuffer(ne.__webglFramebuffer[me]);else r.deleteFramebuffer(ne.__webglFramebuffer);if(ne.__webglDepthbuffer&&r.deleteRenderbuffer(ne.__webglDepthbuffer),ne.__webglMultisampledFramebuffer&&r.deleteFramebuffer(ne.__webglMultisampledFramebuffer),ne.__webglColorRenderbuffer)for(let me=0;me<ne.__webglColorRenderbuffer.length;me++)ne.__webglColorRenderbuffer[me]&&r.deleteRenderbuffer(ne.__webglColorRenderbuffer[me]);ne.__webglDepthRenderbuffer&&r.deleteRenderbuffer(ne.__webglDepthRenderbuffer)}if(L.isWebGLMultipleRenderTargets)for(let me=0,_e=A.length;me<_e;me++){const Le=s.get(A[me]);Le.__webglTexture&&(r.deleteTexture(Le.__webglTexture),u.memory.textures--),s.remove(A[me])}s.remove(A),s.remove(L)}let ie=0;function ae(){ie=0}function k(){const L=ie;return L>=o.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+o.maxTextures),ie+=1,L}function H(L){const A=[];return A.push(L.wrapS),A.push(L.wrapT),A.push(L.wrapR||0),A.push(L.magFilter),A.push(L.minFilter),A.push(L.anisotropy),A.push(L.internalFormat),A.push(L.format),A.push(L.type),A.push(L.generateMipmaps),A.push(L.premultiplyAlpha),A.push(L.flipY),A.push(L.unpackAlignment),A.push(L.colorSpace),A.join()}function q(L,A){const ne=s.get(L);if(L.isVideoTexture&&$e(L),L.isRenderTargetTexture===!1&&L.version>0&&ne.__version!==L.version){const ge=L.image;if(ge===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ge.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{pe(ne,L,A);return}}t.bindTexture(r.TEXTURE_2D,ne.__webglTexture,r.TEXTURE0+A)}function K(L,A){const ne=s.get(L);if(L.version>0&&ne.__version!==L.version){pe(ne,L,A);return}t.bindTexture(r.TEXTURE_2D_ARRAY,ne.__webglTexture,r.TEXTURE0+A)}function N(L,A){const ne=s.get(L);if(L.version>0&&ne.__version!==L.version){pe(ne,L,A);return}t.bindTexture(r.TEXTURE_3D,ne.__webglTexture,r.TEXTURE0+A)}function X(L,A){const ne=s.get(L);if(L.version>0&&ne.__version!==L.version){xe(ne,L,A);return}t.bindTexture(r.TEXTURE_CUBE_MAP,ne.__webglTexture,r.TEXTURE0+A)}const V={[Vl]:r.REPEAT,[ri]:r.CLAMP_TO_EDGE,[bd]:r.MIRRORED_REPEAT},I={[wn]:r.NEAREST,[Gp]:r.NEAREST_MIPMAP_NEAREST,[Gu]:r.NEAREST_MIPMAP_LINEAR,[Yn]:r.LINEAR,[ly]:r.LINEAR_MIPMAP_NEAREST,[to]:r.LINEAR_MIPMAP_LINEAR},z={[yy]:r.NEVER,[Ay]:r.ALWAYS,[Sy]:r.LESS,[zg]:r.LEQUAL,[My]:r.EQUAL,[wy]:r.GEQUAL,[Ey]:r.GREATER,[Ty]:r.NOTEQUAL};function Y(L,A,ne){if(ne?(r.texParameteri(L,r.TEXTURE_WRAP_S,V[A.wrapS]),r.texParameteri(L,r.TEXTURE_WRAP_T,V[A.wrapT]),(L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY)&&r.texParameteri(L,r.TEXTURE_WRAP_R,V[A.wrapR]),r.texParameteri(L,r.TEXTURE_MAG_FILTER,I[A.magFilter]),r.texParameteri(L,r.TEXTURE_MIN_FILTER,I[A.minFilter])):(r.texParameteri(L,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(L,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),(L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY)&&r.texParameteri(L,r.TEXTURE_WRAP_R,r.CLAMP_TO_EDGE),(A.wrapS!==ri||A.wrapT!==ri)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(L,r.TEXTURE_MAG_FILTER,B(A.magFilter)),r.texParameteri(L,r.TEXTURE_MIN_FILTER,B(A.minFilter)),A.minFilter!==wn&&A.minFilter!==Yn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),A.compareFunction&&(r.texParameteri(L,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(L,r.TEXTURE_COMPARE_FUNC,z[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ge=e.get("EXT_texture_filter_anisotropic");if(A.magFilter===wn||A.minFilter!==Gu&&A.minFilter!==to||A.type===Tr&&e.has("OES_texture_float_linear")===!1||d===!1&&A.type===ea&&e.has("OES_texture_half_float_linear")===!1)return;(A.anisotropy>1||s.get(A).__currentAnisotropy)&&(r.texParameterf(L,ge.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,o.getMaxAnisotropy())),s.get(A).__currentAnisotropy=A.anisotropy)}}function Q(L,A){let ne=!1;L.__webglInit===void 0&&(L.__webglInit=!0,A.addEventListener("dispose",U));const ge=A.source;let me=_.get(ge);me===void 0&&(me={},_.set(ge,me));const _e=H(A);if(_e!==L.__cacheKey){me[_e]===void 0&&(me[_e]={texture:r.createTexture(),usedTimes:0},u.memory.textures++,ne=!0),me[_e].usedTimes++;const Le=me[L.__cacheKey];Le!==void 0&&(me[L.__cacheKey].usedTimes--,Le.usedTimes===0&&D(A)),L.__cacheKey=_e,L.__webglTexture=me[_e].texture}return ne}function pe(L,A,ne){let ge=r.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(ge=r.TEXTURE_2D_ARRAY),A.isData3DTexture&&(ge=r.TEXTURE_3D);const me=Q(L,A),_e=A.source;t.bindTexture(ge,L.__webglTexture,r.TEXTURE0+ne);const Le=s.get(_e);if(_e.version!==Le.__version||me===!0){t.activeTexture(r.TEXTURE0+ne);const Ie=Ct.getPrimaries(Ct.workingColorSpace),Be=A.colorSpace===si?null:Ct.getPrimaries(A.colorSpace),Ke=A.colorSpace===si||Ie===Be?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ke);const ot=y(A)&&x(A.image)===!1;let Se=M(A.image,ot,!1,o.maxTextureSize);Se=Xe(A,Se);const gt=x(Se)||d,ct=l.convert(A.format,A.colorSpace);let it=l.convert(A.type),qe=b(A.internalFormat,ct,it,A.colorSpace,A.isVideoTexture);Y(ge,A,gt);let ke;const tt=A.mipmaps,_t=d&&A.isVideoTexture!==!0&&qe!==Fg,Rt=Le.__version===void 0||me===!0,lt=G(A,Se,gt);if(A.isDepthTexture)qe=r.DEPTH_COMPONENT,d?A.type===Tr?qe=r.DEPTH_COMPONENT32F:A.type===Er?qe=r.DEPTH_COMPONENT24:A.type===is?qe=r.DEPTH24_STENCIL8:qe=r.DEPTH_COMPONENT16:A.type===Tr&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),A.format===rs&&qe===r.DEPTH_COMPONENT&&A.type!==Bd&&A.type!==Er&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),A.type=Er,it=l.convert(A.type)),A.format===no&&qe===r.DEPTH_COMPONENT&&(qe=r.DEPTH_STENCIL,A.type!==is&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),A.type=is,it=l.convert(A.type))),Rt&&(_t?t.texStorage2D(r.TEXTURE_2D,1,qe,Se.width,Se.height):t.texImage2D(r.TEXTURE_2D,0,qe,Se.width,Se.height,0,ct,it,null));else if(A.isDataTexture)if(tt.length>0&&gt){_t&&Rt&&t.texStorage2D(r.TEXTURE_2D,lt,qe,tt[0].width,tt[0].height);for(let Ce=0,j=tt.length;Ce<j;Ce++)ke=tt[Ce],_t?t.texSubImage2D(r.TEXTURE_2D,Ce,0,0,ke.width,ke.height,ct,it,ke.data):t.texImage2D(r.TEXTURE_2D,Ce,qe,ke.width,ke.height,0,ct,it,ke.data);A.generateMipmaps=!1}else _t?(Rt&&t.texStorage2D(r.TEXTURE_2D,lt,qe,Se.width,Se.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,Se.width,Se.height,ct,it,Se.data)):t.texImage2D(r.TEXTURE_2D,0,qe,Se.width,Se.height,0,ct,it,Se.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){_t&&Rt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,lt,qe,tt[0].width,tt[0].height,Se.depth);for(let Ce=0,j=tt.length;Ce<j;Ce++)ke=tt[Ce],A.format!==vi?ct!==null?_t?t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Ce,0,0,0,ke.width,ke.height,Se.depth,ct,ke.data,0,0):t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Ce,qe,ke.width,ke.height,Se.depth,0,ke.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):_t?t.texSubImage3D(r.TEXTURE_2D_ARRAY,Ce,0,0,0,ke.width,ke.height,Se.depth,ct,it,ke.data):t.texImage3D(r.TEXTURE_2D_ARRAY,Ce,qe,ke.width,ke.height,Se.depth,0,ct,it,ke.data)}else{_t&&Rt&&t.texStorage2D(r.TEXTURE_2D,lt,qe,tt[0].width,tt[0].height);for(let Ce=0,j=tt.length;Ce<j;Ce++)ke=tt[Ce],A.format!==vi?ct!==null?_t?t.compressedTexSubImage2D(r.TEXTURE_2D,Ce,0,0,ke.width,ke.height,ct,ke.data):t.compressedTexImage2D(r.TEXTURE_2D,Ce,qe,ke.width,ke.height,0,ke.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):_t?t.texSubImage2D(r.TEXTURE_2D,Ce,0,0,ke.width,ke.height,ct,it,ke.data):t.texImage2D(r.TEXTURE_2D,Ce,qe,ke.width,ke.height,0,ct,it,ke.data)}else if(A.isDataArrayTexture)_t?(Rt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,lt,qe,Se.width,Se.height,Se.depth),t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,Se.width,Se.height,Se.depth,ct,it,Se.data)):t.texImage3D(r.TEXTURE_2D_ARRAY,0,qe,Se.width,Se.height,Se.depth,0,ct,it,Se.data);else if(A.isData3DTexture)_t?(Rt&&t.texStorage3D(r.TEXTURE_3D,lt,qe,Se.width,Se.height,Se.depth),t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,Se.width,Se.height,Se.depth,ct,it,Se.data)):t.texImage3D(r.TEXTURE_3D,0,qe,Se.width,Se.height,Se.depth,0,ct,it,Se.data);else if(A.isFramebufferTexture){if(Rt)if(_t)t.texStorage2D(r.TEXTURE_2D,lt,qe,Se.width,Se.height);else{let Ce=Se.width,j=Se.height;for(let Re=0;Re<lt;Re++)t.texImage2D(r.TEXTURE_2D,Re,qe,Ce,j,0,ct,it,null),Ce>>=1,j>>=1}}else if(tt.length>0&&gt){_t&&Rt&&t.texStorage2D(r.TEXTURE_2D,lt,qe,tt[0].width,tt[0].height);for(let Ce=0,j=tt.length;Ce<j;Ce++)ke=tt[Ce],_t?t.texSubImage2D(r.TEXTURE_2D,Ce,0,0,ct,it,ke):t.texImage2D(r.TEXTURE_2D,Ce,qe,ct,it,ke);A.generateMipmaps=!1}else _t?(Rt&&t.texStorage2D(r.TEXTURE_2D,lt,qe,Se.width,Se.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,ct,it,Se)):t.texImage2D(r.TEXTURE_2D,0,qe,ct,it,Se);w(A,gt)&&R(ge),Le.__version=_e.version,A.onUpdate&&A.onUpdate(A)}L.__version=A.version}function xe(L,A,ne){if(A.image.length!==6)return;const ge=Q(L,A),me=A.source;t.bindTexture(r.TEXTURE_CUBE_MAP,L.__webglTexture,r.TEXTURE0+ne);const _e=s.get(me);if(me.version!==_e.__version||ge===!0){t.activeTexture(r.TEXTURE0+ne);const Le=Ct.getPrimaries(Ct.workingColorSpace),Ie=A.colorSpace===si?null:Ct.getPrimaries(A.colorSpace),Be=A.colorSpace===si||Le===Ie?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Be);const Ke=A.isCompressedTexture||A.image[0].isCompressedTexture,ot=A.image[0]&&A.image[0].isDataTexture,Se=[];for(let Ce=0;Ce<6;Ce++)!Ke&&!ot?Se[Ce]=M(A.image[Ce],!1,!0,o.maxCubemapSize):Se[Ce]=ot?A.image[Ce].image:A.image[Ce],Se[Ce]=Xe(A,Se[Ce]);const gt=Se[0],ct=x(gt)||d,it=l.convert(A.format,A.colorSpace),qe=l.convert(A.type),ke=b(A.internalFormat,it,qe,A.colorSpace),tt=d&&A.isVideoTexture!==!0,_t=_e.__version===void 0||ge===!0;let Rt=G(A,gt,ct);Y(r.TEXTURE_CUBE_MAP,A,ct);let lt;if(Ke){tt&&_t&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Rt,ke,gt.width,gt.height);for(let Ce=0;Ce<6;Ce++){lt=Se[Ce].mipmaps;for(let j=0;j<lt.length;j++){const Re=lt[j];A.format!==vi?it!==null?tt?t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,j,0,0,Re.width,Re.height,it,Re.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,j,ke,Re.width,Re.height,0,Re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):tt?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,j,0,0,Re.width,Re.height,it,qe,Re.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,j,ke,Re.width,Re.height,0,it,qe,Re.data)}}}else{lt=A.mipmaps,tt&&_t&&(lt.length>0&&Rt++,t.texStorage2D(r.TEXTURE_CUBE_MAP,Rt,ke,Se[0].width,Se[0].height));for(let Ce=0;Ce<6;Ce++)if(ot){tt?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,0,0,0,Se[Ce].width,Se[Ce].height,it,qe,Se[Ce].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,0,ke,Se[Ce].width,Se[Ce].height,0,it,qe,Se[Ce].data);for(let j=0;j<lt.length;j++){const De=lt[j].image[Ce].image;tt?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,j+1,0,0,De.width,De.height,it,qe,De.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,j+1,ke,De.width,De.height,0,it,qe,De.data)}}else{tt?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,0,0,0,it,qe,Se[Ce]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,0,ke,it,qe,Se[Ce]);for(let j=0;j<lt.length;j++){const Re=lt[j];tt?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,j+1,0,0,it,qe,Re.image[Ce]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,j+1,ke,it,qe,Re.image[Ce])}}}w(A,ct)&&R(r.TEXTURE_CUBE_MAP),_e.__version=me.version,A.onUpdate&&A.onUpdate(A)}L.__version=A.version}function ye(L,A,ne,ge,me,_e){const Le=l.convert(ne.format,ne.colorSpace),Ie=l.convert(ne.type),Be=b(ne.internalFormat,Le,Ie,ne.colorSpace);if(!s.get(A).__hasExternalTextures){const ot=Math.max(1,A.width>>_e),Se=Math.max(1,A.height>>_e);me===r.TEXTURE_3D||me===r.TEXTURE_2D_ARRAY?t.texImage3D(me,_e,Be,ot,Se,A.depth,0,Le,Ie,null):t.texImage2D(me,_e,Be,ot,Se,0,Le,Ie,null)}t.bindFramebuffer(r.FRAMEBUFFER,L),Pe(A)?f.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ge,me,s.get(ne).__webglTexture,0,Ne(A)):(me===r.TEXTURE_2D||me>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&me<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ge,me,s.get(ne).__webglTexture,_e),t.bindFramebuffer(r.FRAMEBUFFER,null)}function ue(L,A,ne){if(r.bindRenderbuffer(r.RENDERBUFFER,L),A.depthBuffer&&!A.stencilBuffer){let ge=d===!0?r.DEPTH_COMPONENT24:r.DEPTH_COMPONENT16;if(ne||Pe(A)){const me=A.depthTexture;me&&me.isDepthTexture&&(me.type===Tr?ge=r.DEPTH_COMPONENT32F:me.type===Er&&(ge=r.DEPTH_COMPONENT24));const _e=Ne(A);Pe(A)?f.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,_e,ge,A.width,A.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,_e,ge,A.width,A.height)}else r.renderbufferStorage(r.RENDERBUFFER,ge,A.width,A.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,L)}else if(A.depthBuffer&&A.stencilBuffer){const ge=Ne(A);ne&&Pe(A)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,ge,r.DEPTH24_STENCIL8,A.width,A.height):Pe(A)?f.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ge,r.DEPTH24_STENCIL8,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,L)}else{const ge=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let me=0;me<ge.length;me++){const _e=ge[me],Le=l.convert(_e.format,_e.colorSpace),Ie=l.convert(_e.type),Be=b(_e.internalFormat,Le,Ie,_e.colorSpace),Ke=Ne(A);ne&&Pe(A)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ke,Be,A.width,A.height):Pe(A)?f.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ke,Be,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,Be,A.width,A.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function fe(L,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,L),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!s.get(A.depthTexture).__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),q(A.depthTexture,0);const ge=s.get(A.depthTexture).__webglTexture,me=Ne(A);if(A.depthTexture.format===rs)Pe(A)?f.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ge,0,me):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ge,0);else if(A.depthTexture.format===no)Pe(A)?f.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ge,0,me):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ge,0);else throw new Error("Unknown depthTexture format")}function Te(L){const A=s.get(L),ne=L.isWebGLCubeRenderTarget===!0;if(L.depthTexture&&!A.__autoAllocateDepthBuffer){if(ne)throw new Error("target.depthTexture not supported in Cube render targets");fe(A.__webglFramebuffer,L)}else if(ne){A.__webglDepthbuffer=[];for(let ge=0;ge<6;ge++)t.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer[ge]),A.__webglDepthbuffer[ge]=r.createRenderbuffer(),ue(A.__webglDepthbuffer[ge],L,!1)}else t.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer=r.createRenderbuffer(),ue(A.__webglDepthbuffer,L,!1);t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ge(L,A,ne){const ge=s.get(L);A!==void 0&&ye(ge.__webglFramebuffer,L,L.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),ne!==void 0&&Te(L)}function Z(L){const A=L.texture,ne=s.get(L),ge=s.get(A);L.addEventListener("dispose",he),L.isWebGLMultipleRenderTargets!==!0&&(ge.__webglTexture===void 0&&(ge.__webglTexture=r.createTexture()),ge.__version=A.version,u.memory.textures++);const me=L.isWebGLCubeRenderTarget===!0,_e=L.isWebGLMultipleRenderTargets===!0,Le=x(L)||d;if(me){ne.__webglFramebuffer=[];for(let Ie=0;Ie<6;Ie++)if(d&&A.mipmaps&&A.mipmaps.length>0){ne.__webglFramebuffer[Ie]=[];for(let Be=0;Be<A.mipmaps.length;Be++)ne.__webglFramebuffer[Ie][Be]=r.createFramebuffer()}else ne.__webglFramebuffer[Ie]=r.createFramebuffer()}else{if(d&&A.mipmaps&&A.mipmaps.length>0){ne.__webglFramebuffer=[];for(let Ie=0;Ie<A.mipmaps.length;Ie++)ne.__webglFramebuffer[Ie]=r.createFramebuffer()}else ne.__webglFramebuffer=r.createFramebuffer();if(_e)if(o.drawBuffers){const Ie=L.texture;for(let Be=0,Ke=Ie.length;Be<Ke;Be++){const ot=s.get(Ie[Be]);ot.__webglTexture===void 0&&(ot.__webglTexture=r.createTexture(),u.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(d&&L.samples>0&&Pe(L)===!1){const Ie=_e?A:[A];ne.__webglMultisampledFramebuffer=r.createFramebuffer(),ne.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,ne.__webglMultisampledFramebuffer);for(let Be=0;Be<Ie.length;Be++){const Ke=Ie[Be];ne.__webglColorRenderbuffer[Be]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,ne.__webglColorRenderbuffer[Be]);const ot=l.convert(Ke.format,Ke.colorSpace),Se=l.convert(Ke.type),gt=b(Ke.internalFormat,ot,Se,Ke.colorSpace,L.isXRRenderTarget===!0),ct=Ne(L);r.renderbufferStorageMultisample(r.RENDERBUFFER,ct,gt,L.width,L.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Be,r.RENDERBUFFER,ne.__webglColorRenderbuffer[Be])}r.bindRenderbuffer(r.RENDERBUFFER,null),L.depthBuffer&&(ne.__webglDepthRenderbuffer=r.createRenderbuffer(),ue(ne.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(me){t.bindTexture(r.TEXTURE_CUBE_MAP,ge.__webglTexture),Y(r.TEXTURE_CUBE_MAP,A,Le);for(let Ie=0;Ie<6;Ie++)if(d&&A.mipmaps&&A.mipmaps.length>0)for(let Be=0;Be<A.mipmaps.length;Be++)ye(ne.__webglFramebuffer[Ie][Be],L,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Ie,Be);else ye(ne.__webglFramebuffer[Ie],L,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Ie,0);w(A,Le)&&R(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(_e){const Ie=L.texture;for(let Be=0,Ke=Ie.length;Be<Ke;Be++){const ot=Ie[Be],Se=s.get(ot);t.bindTexture(r.TEXTURE_2D,Se.__webglTexture),Y(r.TEXTURE_2D,ot,Le),ye(ne.__webglFramebuffer,L,ot,r.COLOR_ATTACHMENT0+Be,r.TEXTURE_2D,0),w(ot,Le)&&R(r.TEXTURE_2D)}t.unbindTexture()}else{let Ie=r.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(d?Ie=L.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(Ie,ge.__webglTexture),Y(Ie,A,Le),d&&A.mipmaps&&A.mipmaps.length>0)for(let Be=0;Be<A.mipmaps.length;Be++)ye(ne.__webglFramebuffer[Be],L,A,r.COLOR_ATTACHMENT0,Ie,Be);else ye(ne.__webglFramebuffer,L,A,r.COLOR_ATTACHMENT0,Ie,0);w(A,Le)&&R(Ie),t.unbindTexture()}L.depthBuffer&&Te(L)}function ht(L){const A=x(L)||d,ne=L.isWebGLMultipleRenderTargets===!0?L.texture:[L.texture];for(let ge=0,me=ne.length;ge<me;ge++){const _e=ne[ge];if(w(_e,A)){const Le=L.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,Ie=s.get(_e).__webglTexture;t.bindTexture(Le,Ie),R(Le),t.unbindTexture()}}}function Fe(L){if(d&&L.samples>0&&Pe(L)===!1){const A=L.isWebGLMultipleRenderTargets?L.texture:[L.texture],ne=L.width,ge=L.height;let me=r.COLOR_BUFFER_BIT;const _e=[],Le=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ie=s.get(L),Be=L.isWebGLMultipleRenderTargets===!0;if(Be)for(let Ke=0;Ke<A.length;Ke++)t.bindFramebuffer(r.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ke,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,Ie.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ke,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ie.__webglFramebuffer);for(let Ke=0;Ke<A.length;Ke++){_e.push(r.COLOR_ATTACHMENT0+Ke),L.depthBuffer&&_e.push(Le);const ot=Ie.__ignoreDepthValues!==void 0?Ie.__ignoreDepthValues:!1;if(ot===!1&&(L.depthBuffer&&(me|=r.DEPTH_BUFFER_BIT),L.stencilBuffer&&(me|=r.STENCIL_BUFFER_BIT)),Be&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Ie.__webglColorRenderbuffer[Ke]),ot===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[Le]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[Le])),Be){const Se=s.get(A[Ke]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Se,0)}r.blitFramebuffer(0,0,ne,ge,0,0,ne,ge,me,r.NEAREST),p&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,_e)}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),Be)for(let Ke=0;Ke<A.length;Ke++){t.bindFramebuffer(r.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ke,r.RENDERBUFFER,Ie.__webglColorRenderbuffer[Ke]);const ot=s.get(A[Ke]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,Ie.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ke,r.TEXTURE_2D,ot,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer)}}function Ne(L){return Math.min(o.maxSamples,L.samples)}function Pe(L){const A=s.get(L);return d&&L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function $e(L){const A=u.render.frame;g.get(L)!==A&&(g.set(L,A),L.update())}function Xe(L,A){const ne=L.colorSpace,ge=L.format,me=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||L.format===Ld||ne!==qi&&ne!==si&&(Ct.getTransfer(ne)===It?d===!1?e.has("EXT_sRGB")===!0&&ge===vi?(L.format=Ld,L.minFilter=Yn,L.generateMipmaps=!1):A=Gg.sRGBToLinear(A):(ge!==vi||me!==Cr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",ne)),A}this.allocateTextureUnit=k,this.resetTextureUnits=ae,this.setTexture2D=q,this.setTexture2DArray=K,this.setTexture3D=N,this.setTextureCube=X,this.rebindTextures=Ge,this.setupRenderTarget=Z,this.updateRenderTargetMipmap=ht,this.updateMultisampleRenderTarget=Fe,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=ye,this.useMultisampledRTT=Pe}function RT(r,e,t){const s=t.isWebGL2;function o(l,u=si){let d;const f=Ct.getTransfer(u);if(l===Cr)return r.UNSIGNED_BYTE;if(l===Dg)return r.UNSIGNED_SHORT_4_4_4_4;if(l===Ig)return r.UNSIGNED_SHORT_5_5_5_1;if(l===cy)return r.BYTE;if(l===uy)return r.SHORT;if(l===Bd)return r.UNSIGNED_SHORT;if(l===Pg)return r.INT;if(l===Er)return r.UNSIGNED_INT;if(l===Tr)return r.FLOAT;if(l===ea)return s?r.HALF_FLOAT:(d=e.get("OES_texture_half_float"),d!==null?d.HALF_FLOAT_OES:null);if(l===dy)return r.ALPHA;if(l===vi)return r.RGBA;if(l===fy)return r.LUMINANCE;if(l===hy)return r.LUMINANCE_ALPHA;if(l===rs)return r.DEPTH_COMPONENT;if(l===no)return r.DEPTH_STENCIL;if(l===Ld)return d=e.get("EXT_sRGB"),d!==null?d.SRGB_ALPHA_EXT:null;if(l===py)return r.RED;if(l===Ng)return r.RED_INTEGER;if(l===my)return r.RG;if(l===Ug)return r.RG_INTEGER;if(l===Og)return r.RGBA_INTEGER;if(l===Vu||l===Wu||l===ju||l===Xu)if(f===It)if(d=e.get("WEBGL_compressed_texture_s3tc_srgb"),d!==null){if(l===Vu)return d.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(l===Wu)return d.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(l===ju)return d.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(l===Xu)return d.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(d=e.get("WEBGL_compressed_texture_s3tc"),d!==null){if(l===Vu)return d.COMPRESSED_RGB_S3TC_DXT1_EXT;if(l===Wu)return d.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(l===ju)return d.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(l===Xu)return d.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(l===Vp||l===Wp||l===jp||l===Xp)if(d=e.get("WEBGL_compressed_texture_pvrtc"),d!==null){if(l===Vp)return d.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(l===Wp)return d.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(l===jp)return d.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(l===Xp)return d.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(l===Fg)return d=e.get("WEBGL_compressed_texture_etc1"),d!==null?d.COMPRESSED_RGB_ETC1_WEBGL:null;if(l===Yp||l===qp)if(d=e.get("WEBGL_compressed_texture_etc"),d!==null){if(l===Yp)return f===It?d.COMPRESSED_SRGB8_ETC2:d.COMPRESSED_RGB8_ETC2;if(l===qp)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:d.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(l===$p||l===Kp||l===Zp||l===Qp||l===Jp||l===em||l===tm||l===nm||l===im||l===rm||l===sm||l===om||l===am||l===lm)if(d=e.get("WEBGL_compressed_texture_astc"),d!==null){if(l===$p)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:d.COMPRESSED_RGBA_ASTC_4x4_KHR;if(l===Kp)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:d.COMPRESSED_RGBA_ASTC_5x4_KHR;if(l===Zp)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:d.COMPRESSED_RGBA_ASTC_5x5_KHR;if(l===Qp)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:d.COMPRESSED_RGBA_ASTC_6x5_KHR;if(l===Jp)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:d.COMPRESSED_RGBA_ASTC_6x6_KHR;if(l===em)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:d.COMPRESSED_RGBA_ASTC_8x5_KHR;if(l===tm)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:d.COMPRESSED_RGBA_ASTC_8x6_KHR;if(l===nm)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:d.COMPRESSED_RGBA_ASTC_8x8_KHR;if(l===im)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:d.COMPRESSED_RGBA_ASTC_10x5_KHR;if(l===rm)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:d.COMPRESSED_RGBA_ASTC_10x6_KHR;if(l===sm)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:d.COMPRESSED_RGBA_ASTC_10x8_KHR;if(l===om)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:d.COMPRESSED_RGBA_ASTC_10x10_KHR;if(l===am)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:d.COMPRESSED_RGBA_ASTC_12x10_KHR;if(l===lm)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:d.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(l===Yu||l===cm||l===um)if(d=e.get("EXT_texture_compression_bptc"),d!==null){if(l===Yu)return f===It?d.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:d.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(l===cm)return d.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(l===um)return d.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(l===gy||l===dm||l===fm||l===hm)if(d=e.get("EXT_texture_compression_rgtc"),d!==null){if(l===Yu)return d.COMPRESSED_RED_RGTC1_EXT;if(l===dm)return d.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(l===fm)return d.COMPRESSED_RED_GREEN_RGTC2_EXT;if(l===hm)return d.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return l===is?s?r.UNSIGNED_INT_24_8:(d=e.get("WEBGL_depth_texture"),d!==null?d.UNSIGNED_INT_24_8_WEBGL:null):r[l]!==void 0?r[l]:null}return{convert:o}}class bT extends ii{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class zl extends un{constructor(){super(),this.isGroup=!0,this.type="Group"}}const LT={type:"move"};class _d{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new zl,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new zl,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new ce,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new ce),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new zl,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new ce,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new ce),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const s of e.hand.values())this._getHandJoint(t,s)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,s){let o=null,l=null,u=null;const d=this._targetRay,f=this._grip,p=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(p&&e.hand){u=!0;for(const M of e.hand.values()){const x=t.getJointPose(M,s),y=this._getHandJoint(p,M);x!==null&&(y.matrix.fromArray(x.transform.matrix),y.matrix.decompose(y.position,y.rotation,y.scale),y.matrixWorldNeedsUpdate=!0,y.jointRadius=x.radius),y.visible=x!==null}const g=p.joints["index-finger-tip"],m=p.joints["thumb-tip"],_=g.position.distanceTo(m.position),S=.02,E=.005;p.inputState.pinching&&_>S+E?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!p.inputState.pinching&&_<=S-E&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else f!==null&&e.gripSpace&&(l=t.getPose(e.gripSpace,s),l!==null&&(f.matrix.fromArray(l.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,l.linearVelocity?(f.hasLinearVelocity=!0,f.linearVelocity.copy(l.linearVelocity)):f.hasLinearVelocity=!1,l.angularVelocity?(f.hasAngularVelocity=!0,f.angularVelocity.copy(l.angularVelocity)):f.hasAngularVelocity=!1));d!==null&&(o=t.getPose(e.targetRaySpace,s),o===null&&l!==null&&(o=l),o!==null&&(d.matrix.fromArray(o.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,o.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(o.linearVelocity)):d.hasLinearVelocity=!1,o.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(o.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(LT)))}return d!==null&&(d.visible=o!==null),f!==null&&(f.visible=l!==null),p!==null&&(p.visible=u!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const s=new zl;s.matrixAutoUpdate=!1,s.visible=!1,e.joints[t.jointName]=s,e.add(s)}return e.joints[t.jointName]}}class PT extends oo{constructor(e,t){super();const s=this;let o=null,l=1,u=null,d="local-floor",f=1,p=null,g=null,m=null,_=null,S=null,E=null;const M=t.getContextAttributes();let x=null,y=null;const w=[],R=[],b=new Et;let G=null;const B=new ii;B.layers.enable(1),B.viewport=new sn;const U=new ii;U.layers.enable(2),U.viewport=new sn;const he=[B,U],C=new bT;C.layers.enable(1),C.layers.enable(2);let D=null,te=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let Q=w[Y];return Q===void 0&&(Q=new _d,w[Y]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(Y){let Q=w[Y];return Q===void 0&&(Q=new _d,w[Y]=Q),Q.getGripSpace()},this.getHand=function(Y){let Q=w[Y];return Q===void 0&&(Q=new _d,w[Y]=Q),Q.getHandSpace()};function ie(Y){const Q=R.indexOf(Y.inputSource);if(Q===-1)return;const pe=w[Q];pe!==void 0&&(pe.update(Y.inputSource,Y.frame,p||u),pe.dispatchEvent({type:Y.type,data:Y.inputSource}))}function ae(){o.removeEventListener("select",ie),o.removeEventListener("selectstart",ie),o.removeEventListener("selectend",ie),o.removeEventListener("squeeze",ie),o.removeEventListener("squeezestart",ie),o.removeEventListener("squeezeend",ie),o.removeEventListener("end",ae),o.removeEventListener("inputsourceschange",k);for(let Y=0;Y<w.length;Y++){const Q=R[Y];Q!==null&&(R[Y]=null,w[Y].disconnect(Q))}D=null,te=null,e.setRenderTarget(x),S=null,_=null,m=null,o=null,y=null,z.stop(),s.isPresenting=!1,e.setPixelRatio(G),e.setSize(b.width,b.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){l=Y,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){d=Y,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||u},this.setReferenceSpace=function(Y){p=Y},this.getBaseLayer=function(){return _!==null?_:S},this.getBinding=function(){return m},this.getFrame=function(){return E},this.getSession=function(){return o},this.setSession=async function(Y){if(o=Y,o!==null){if(x=e.getRenderTarget(),o.addEventListener("select",ie),o.addEventListener("selectstart",ie),o.addEventListener("selectend",ie),o.addEventListener("squeeze",ie),o.addEventListener("squeezestart",ie),o.addEventListener("squeezeend",ie),o.addEventListener("end",ae),o.addEventListener("inputsourceschange",k),M.xrCompatible!==!0&&await t.makeXRCompatible(),G=e.getPixelRatio(),e.getSize(b),o.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const Q={antialias:o.renderState.layers===void 0?M.antialias:!0,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:l};S=new XRWebGLLayer(o,t,Q),o.updateRenderState({baseLayer:S}),e.setPixelRatio(1),e.setSize(S.framebufferWidth,S.framebufferHeight,!1),y=new os(S.framebufferWidth,S.framebufferHeight,{format:vi,type:Cr,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil})}else{let Q=null,pe=null,xe=null;M.depth&&(xe=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Q=M.stencil?no:rs,pe=M.stencil?is:Er);const ye={colorFormat:t.RGBA8,depthFormat:xe,scaleFactor:l};m=new XRWebGLBinding(o,t),_=m.createProjectionLayer(ye),o.updateRenderState({layers:[_]}),e.setPixelRatio(1),e.setSize(_.textureWidth,_.textureHeight,!1),y=new os(_.textureWidth,_.textureHeight,{format:vi,type:Cr,depthTexture:new t0(_.textureWidth,_.textureHeight,pe,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0});const ue=e.properties.get(y);ue.__ignoreDepthValues=_.ignoreDepthValues}y.isXRRenderTarget=!0,this.setFoveation(f),p=null,u=await o.requestReferenceSpace(d),z.setContext(o),z.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode};function k(Y){for(let Q=0;Q<Y.removed.length;Q++){const pe=Y.removed[Q],xe=R.indexOf(pe);xe>=0&&(R[xe]=null,w[xe].disconnect(pe))}for(let Q=0;Q<Y.added.length;Q++){const pe=Y.added[Q];let xe=R.indexOf(pe);if(xe===-1){for(let ue=0;ue<w.length;ue++)if(ue>=R.length){R.push(pe),xe=ue;break}else if(R[ue]===null){R[ue]=pe,xe=ue;break}if(xe===-1)break}const ye=w[xe];ye&&ye.connect(pe)}}const H=new ce,q=new ce;function K(Y,Q,pe){H.setFromMatrixPosition(Q.matrixWorld),q.setFromMatrixPosition(pe.matrixWorld);const xe=H.distanceTo(q),ye=Q.projectionMatrix.elements,ue=pe.projectionMatrix.elements,fe=ye[14]/(ye[10]-1),Te=ye[14]/(ye[10]+1),Ge=(ye[9]+1)/ye[5],Z=(ye[9]-1)/ye[5],ht=(ye[8]-1)/ye[0],Fe=(ue[8]+1)/ue[0],Ne=fe*ht,Pe=fe*Fe,$e=xe/(-ht+Fe),Xe=$e*-ht;Q.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Xe),Y.translateZ($e),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert();const L=fe+$e,A=Te+$e,ne=Ne-Xe,ge=Pe+(xe-Xe),me=Ge*Te/A*L,_e=Z*Te/A*L;Y.projectionMatrix.makePerspective(ne,ge,me,_e,L,A),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}function N(Y,Q){Q===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(Q.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(o===null)return;C.near=U.near=B.near=Y.near,C.far=U.far=B.far=Y.far,(D!==C.near||te!==C.far)&&(o.updateRenderState({depthNear:C.near,depthFar:C.far}),D=C.near,te=C.far);const Q=Y.parent,pe=C.cameras;N(C,Q);for(let xe=0;xe<pe.length;xe++)N(pe[xe],Q);pe.length===2?K(C,B,U):C.projectionMatrix.copy(B.projectionMatrix),X(Y,C,Q)};function X(Y,Q,pe){pe===null?Y.matrix.copy(Q.matrixWorld):(Y.matrix.copy(pe.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(Q.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(Q.projectionMatrix),Y.projectionMatrixInverse.copy(Q.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Pd*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return C},this.getFoveation=function(){if(!(_===null&&S===null))return f},this.setFoveation=function(Y){f=Y,_!==null&&(_.fixedFoveation=Y),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=Y)};let V=null;function I(Y,Q){if(g=Q.getViewerPose(p||u),E=Q,g!==null){const pe=g.views;S!==null&&(e.setRenderTargetFramebuffer(y,S.framebuffer),e.setRenderTarget(y));let xe=!1;pe.length!==C.cameras.length&&(C.cameras.length=0,xe=!0);for(let ye=0;ye<pe.length;ye++){const ue=pe[ye];let fe=null;if(S!==null)fe=S.getViewport(ue);else{const Ge=m.getViewSubImage(_,ue);fe=Ge.viewport,ye===0&&(e.setRenderTargetTextures(y,Ge.colorTexture,_.ignoreDepthValues?void 0:Ge.depthStencilTexture),e.setRenderTarget(y))}let Te=he[ye];Te===void 0&&(Te=new ii,Te.layers.enable(ye),Te.viewport=new sn,he[ye]=Te),Te.matrix.fromArray(ue.transform.matrix),Te.matrix.decompose(Te.position,Te.quaternion,Te.scale),Te.projectionMatrix.fromArray(ue.projectionMatrix),Te.projectionMatrixInverse.copy(Te.projectionMatrix).invert(),Te.viewport.set(fe.x,fe.y,fe.width,fe.height),ye===0&&(C.matrix.copy(Te.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale)),xe===!0&&C.cameras.push(Te)}}for(let pe=0;pe<w.length;pe++){const xe=R[pe],ye=w[pe];xe!==null&&ye!==void 0&&ye.update(xe,Q,p||u)}V&&V(Y,Q),Q.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:Q}),E=null}const z=new Jg;z.setAnimationLoop(I),this.setAnimationLoop=function(Y){V=Y},this.dispose=function(){}}}function DT(r,e){function t(x,y){x.matrixAutoUpdate===!0&&x.updateMatrix(),y.value.copy(x.matrix)}function s(x,y){y.color.getRGB(x.fogColor.value,Kg(r)),y.isFog?(x.fogNear.value=y.near,x.fogFar.value=y.far):y.isFogExp2&&(x.fogDensity.value=y.density)}function o(x,y,w,R,b){y.isMeshBasicMaterial||y.isMeshLambertMaterial?l(x,y):y.isMeshToonMaterial?(l(x,y),m(x,y)):y.isMeshPhongMaterial?(l(x,y),g(x,y)):y.isMeshStandardMaterial?(l(x,y),_(x,y),y.isMeshPhysicalMaterial&&S(x,y,b)):y.isMeshMatcapMaterial?(l(x,y),E(x,y)):y.isMeshDepthMaterial?l(x,y):y.isMeshDistanceMaterial?(l(x,y),M(x,y)):y.isMeshNormalMaterial?l(x,y):y.isLineBasicMaterial?(u(x,y),y.isLineDashedMaterial&&d(x,y)):y.isPointsMaterial?f(x,y,w,R):y.isSpriteMaterial?p(x,y):y.isShadowMaterial?(x.color.value.copy(y.color),x.opacity.value=y.opacity):y.isShaderMaterial&&(y.uniformsNeedUpdate=!1)}function l(x,y){x.opacity.value=y.opacity,y.color&&x.diffuse.value.copy(y.color),y.emissive&&x.emissive.value.copy(y.emissive).multiplyScalar(y.emissiveIntensity),y.map&&(x.map.value=y.map,t(y.map,x.mapTransform)),y.alphaMap&&(x.alphaMap.value=y.alphaMap,t(y.alphaMap,x.alphaMapTransform)),y.bumpMap&&(x.bumpMap.value=y.bumpMap,t(y.bumpMap,x.bumpMapTransform),x.bumpScale.value=y.bumpScale,y.side===kn&&(x.bumpScale.value*=-1)),y.normalMap&&(x.normalMap.value=y.normalMap,t(y.normalMap,x.normalMapTransform),x.normalScale.value.copy(y.normalScale),y.side===kn&&x.normalScale.value.negate()),y.displacementMap&&(x.displacementMap.value=y.displacementMap,t(y.displacementMap,x.displacementMapTransform),x.displacementScale.value=y.displacementScale,x.displacementBias.value=y.displacementBias),y.emissiveMap&&(x.emissiveMap.value=y.emissiveMap,t(y.emissiveMap,x.emissiveMapTransform)),y.specularMap&&(x.specularMap.value=y.specularMap,t(y.specularMap,x.specularMapTransform)),y.alphaTest>0&&(x.alphaTest.value=y.alphaTest);const w=e.get(y).envMap;if(w&&(x.envMap.value=w,x.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=y.reflectivity,x.ior.value=y.ior,x.refractionRatio.value=y.refractionRatio),y.lightMap){x.lightMap.value=y.lightMap;const R=r._useLegacyLights===!0?Math.PI:1;x.lightMapIntensity.value=y.lightMapIntensity*R,t(y.lightMap,x.lightMapTransform)}y.aoMap&&(x.aoMap.value=y.aoMap,x.aoMapIntensity.value=y.aoMapIntensity,t(y.aoMap,x.aoMapTransform))}function u(x,y){x.diffuse.value.copy(y.color),x.opacity.value=y.opacity,y.map&&(x.map.value=y.map,t(y.map,x.mapTransform))}function d(x,y){x.dashSize.value=y.dashSize,x.totalSize.value=y.dashSize+y.gapSize,x.scale.value=y.scale}function f(x,y,w,R){x.diffuse.value.copy(y.color),x.opacity.value=y.opacity,x.size.value=y.size*w,x.scale.value=R*.5,y.map&&(x.map.value=y.map,t(y.map,x.uvTransform)),y.alphaMap&&(x.alphaMap.value=y.alphaMap,t(y.alphaMap,x.alphaMapTransform)),y.alphaTest>0&&(x.alphaTest.value=y.alphaTest)}function p(x,y){x.diffuse.value.copy(y.color),x.opacity.value=y.opacity,x.rotation.value=y.rotation,y.map&&(x.map.value=y.map,t(y.map,x.mapTransform)),y.alphaMap&&(x.alphaMap.value=y.alphaMap,t(y.alphaMap,x.alphaMapTransform)),y.alphaTest>0&&(x.alphaTest.value=y.alphaTest)}function g(x,y){x.specular.value.copy(y.specular),x.shininess.value=Math.max(y.shininess,1e-4)}function m(x,y){y.gradientMap&&(x.gradientMap.value=y.gradientMap)}function _(x,y){x.metalness.value=y.metalness,y.metalnessMap&&(x.metalnessMap.value=y.metalnessMap,t(y.metalnessMap,x.metalnessMapTransform)),x.roughness.value=y.roughness,y.roughnessMap&&(x.roughnessMap.value=y.roughnessMap,t(y.roughnessMap,x.roughnessMapTransform)),e.get(y).envMap&&(x.envMapIntensity.value=y.envMapIntensity)}function S(x,y,w){x.ior.value=y.ior,y.sheen>0&&(x.sheenColor.value.copy(y.sheenColor).multiplyScalar(y.sheen),x.sheenRoughness.value=y.sheenRoughness,y.sheenColorMap&&(x.sheenColorMap.value=y.sheenColorMap,t(y.sheenColorMap,x.sheenColorMapTransform)),y.sheenRoughnessMap&&(x.sheenRoughnessMap.value=y.sheenRoughnessMap,t(y.sheenRoughnessMap,x.sheenRoughnessMapTransform))),y.clearcoat>0&&(x.clearcoat.value=y.clearcoat,x.clearcoatRoughness.value=y.clearcoatRoughness,y.clearcoatMap&&(x.clearcoatMap.value=y.clearcoatMap,t(y.clearcoatMap,x.clearcoatMapTransform)),y.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=y.clearcoatRoughnessMap,t(y.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),y.clearcoatNormalMap&&(x.clearcoatNormalMap.value=y.clearcoatNormalMap,t(y.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(y.clearcoatNormalScale),y.side===kn&&x.clearcoatNormalScale.value.negate())),y.iridescence>0&&(x.iridescence.value=y.iridescence,x.iridescenceIOR.value=y.iridescenceIOR,x.iridescenceThicknessMinimum.value=y.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=y.iridescenceThicknessRange[1],y.iridescenceMap&&(x.iridescenceMap.value=y.iridescenceMap,t(y.iridescenceMap,x.iridescenceMapTransform)),y.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=y.iridescenceThicknessMap,t(y.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),y.transmission>0&&(x.transmission.value=y.transmission,x.transmissionSamplerMap.value=w.texture,x.transmissionSamplerSize.value.set(w.width,w.height),y.transmissionMap&&(x.transmissionMap.value=y.transmissionMap,t(y.transmissionMap,x.transmissionMapTransform)),x.thickness.value=y.thickness,y.thicknessMap&&(x.thicknessMap.value=y.thicknessMap,t(y.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=y.attenuationDistance,x.attenuationColor.value.copy(y.attenuationColor)),y.anisotropy>0&&(x.anisotropyVector.value.set(y.anisotropy*Math.cos(y.anisotropyRotation),y.anisotropy*Math.sin(y.anisotropyRotation)),y.anisotropyMap&&(x.anisotropyMap.value=y.anisotropyMap,t(y.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=y.specularIntensity,x.specularColor.value.copy(y.specularColor),y.specularColorMap&&(x.specularColorMap.value=y.specularColorMap,t(y.specularColorMap,x.specularColorMapTransform)),y.specularIntensityMap&&(x.specularIntensityMap.value=y.specularIntensityMap,t(y.specularIntensityMap,x.specularIntensityMapTransform))}function E(x,y){y.matcap&&(x.matcap.value=y.matcap)}function M(x,y){const w=e.get(y).light;x.referencePosition.value.setFromMatrixPosition(w.matrixWorld),x.nearDistance.value=w.shadow.camera.near,x.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:o}}function IT(r,e,t,s){let o={},l={},u=[];const d=t.isWebGL2?r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS):0;function f(w,R){const b=R.program;s.uniformBlockBinding(w,b)}function p(w,R){let b=o[w.id];b===void 0&&(E(w),b=g(w),o[w.id]=b,w.addEventListener("dispose",x));const G=R.program;s.updateUBOMapping(w,G);const B=e.render.frame;l[w.id]!==B&&(_(w),l[w.id]=B)}function g(w){const R=m();w.__bindingPointIndex=R;const b=r.createBuffer(),G=w.__size,B=w.usage;return r.bindBuffer(r.UNIFORM_BUFFER,b),r.bufferData(r.UNIFORM_BUFFER,G,B),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,R,b),b}function m(){for(let w=0;w<d;w++)if(u.indexOf(w)===-1)return u.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function _(w){const R=o[w.id],b=w.uniforms,G=w.__cache;r.bindBuffer(r.UNIFORM_BUFFER,R);for(let B=0,U=b.length;B<U;B++){const he=Array.isArray(b[B])?b[B]:[b[B]];for(let C=0,D=he.length;C<D;C++){const te=he[C];if(S(te,B,C,G)===!0){const ie=te.__offset,ae=Array.isArray(te.value)?te.value:[te.value];let k=0;for(let H=0;H<ae.length;H++){const q=ae[H],K=M(q);typeof q=="number"||typeof q=="boolean"?(te.__data[0]=q,r.bufferSubData(r.UNIFORM_BUFFER,ie+k,te.__data)):q.isMatrix3?(te.__data[0]=q.elements[0],te.__data[1]=q.elements[1],te.__data[2]=q.elements[2],te.__data[3]=0,te.__data[4]=q.elements[3],te.__data[5]=q.elements[4],te.__data[6]=q.elements[5],te.__data[7]=0,te.__data[8]=q.elements[6],te.__data[9]=q.elements[7],te.__data[10]=q.elements[8],te.__data[11]=0):(q.toArray(te.__data,k),k+=K.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,ie,te.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function S(w,R,b,G){const B=w.value,U=R+"_"+b;if(G[U]===void 0)return typeof B=="number"||typeof B=="boolean"?G[U]=B:G[U]=B.clone(),!0;{const he=G[U];if(typeof B=="number"||typeof B=="boolean"){if(he!==B)return G[U]=B,!0}else if(he.equals(B)===!1)return he.copy(B),!0}return!1}function E(w){const R=w.uniforms;let b=0;const G=16;for(let U=0,he=R.length;U<he;U++){const C=Array.isArray(R[U])?R[U]:[R[U]];for(let D=0,te=C.length;D<te;D++){const ie=C[D],ae=Array.isArray(ie.value)?ie.value:[ie.value];for(let k=0,H=ae.length;k<H;k++){const q=ae[k],K=M(q),N=b%G;N!==0&&G-N<K.boundary&&(b+=G-N),ie.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),ie.__offset=b,b+=K.storage}}}const B=b%G;return B>0&&(b+=G-B),w.__size=b,w.__cache={},this}function M(w){const R={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(R.boundary=4,R.storage=4):w.isVector2?(R.boundary=8,R.storage=8):w.isVector3||w.isColor?(R.boundary=16,R.storage=12):w.isVector4?(R.boundary=16,R.storage=16):w.isMatrix3?(R.boundary=48,R.storage=48):w.isMatrix4?(R.boundary=64,R.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),R}function x(w){const R=w.target;R.removeEventListener("dispose",x);const b=u.indexOf(R.__bindingPointIndex);u.splice(b,1),r.deleteBuffer(o[R.id]),delete o[R.id],delete l[R.id]}function y(){for(const w in o)r.deleteBuffer(o[w]);u=[],o={},l={}}return{bind:f,update:p,dispose:y}}class a0{constructor(e={}){const{canvas:t=Ry(),context:s=null,depth:o=!0,stencil:l=!0,alpha:u=!1,antialias:d=!1,premultipliedAlpha:f=!0,preserveDrawingBuffer:p=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:m=!1}=e;this.isWebGLRenderer=!0;let _;s!==null?_=s.getContextAttributes().alpha:_=u;const S=new Uint32Array(4),E=new Int32Array(4);let M=null,x=null;const y=[],w=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=cn,this._useLegacyLights=!1,this.toneMapping=Ar,this.toneMappingExposure=1;const R=this;let b=!1,G=0,B=0,U=null,he=-1,C=null;const D=new sn,te=new sn;let ie=null;const ae=new Mt(0);let k=0,H=t.width,q=t.height,K=1,N=null,X=null;const V=new sn(0,0,H,q),I=new sn(0,0,H,q);let z=!1;const Y=new Gd;let Q=!1,pe=!1,xe=null;const ye=new Kt,ue=new Et,fe=new ce,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ge(){return U===null?K:1}let Z=s;function ht(P,ee){for(let le=0;le<P.length;le++){const de=P[le],oe=t.getContext(de,ee);if(oe!==null)return oe}return null}try{const P={alpha:!0,depth:o,stencil:l,antialias:d,premultipliedAlpha:f,preserveDrawingBuffer:p,powerPreference:g,failIfMajorPerformanceCaveat:m};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${kd}`),t.addEventListener("webglcontextlost",Ce,!1),t.addEventListener("webglcontextrestored",j,!1),t.addEventListener("webglcontextcreationerror",Re,!1),Z===null){const ee=["webgl2","webgl","experimental-webgl"];if(R.isWebGL1Renderer===!0&&ee.shift(),Z=ht(ee,P),Z===null)throw ht(ee)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&Z instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),Z.getShaderPrecisionFormat===void 0&&(Z.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(P){throw console.error("THREE.WebGLRenderer: "+P.message),P}let Fe,Ne,Pe,$e,Xe,L,A,ne,ge,me,_e,Le,Ie,Be,Ke,ot,Se,gt,ct,it,qe,ke,tt,_t;function Rt(){Fe=new VE(Z),Ne=new FE(Z,Fe,e),Fe.init(Ne),ke=new RT(Z,Fe,Ne),Pe=new AT(Z,Fe,Ne),$e=new XE(Z),Xe=new fT,L=new CT(Z,Fe,Pe,Xe,Ne,ke,$e),A=new BE(R),ne=new GE(R),ge=new eS(Z,Ne),tt=new UE(Z,Fe,ge,Ne),me=new WE(Z,ge,$e,tt),_e=new KE(Z,me,ge,$e),ct=new $E(Z,Ne,L),ot=new kE(Xe),Le=new dT(R,A,ne,Fe,Ne,tt,ot),Ie=new DT(R,Xe),Be=new pT,Ke=new yT(Fe,Ne),gt=new NE(R,A,ne,Pe,_e,_,f),Se=new wT(R,_e,Ne),_t=new IT(Z,$e,Ne,Pe),it=new OE(Z,Fe,$e,Ne),qe=new jE(Z,Fe,$e,Ne),$e.programs=Le.programs,R.capabilities=Ne,R.extensions=Fe,R.properties=Xe,R.renderLists=Be,R.shadowMap=Se,R.state=Pe,R.info=$e}Rt();const lt=new PT(R,Z);this.xr=lt,this.getContext=function(){return Z},this.getContextAttributes=function(){return Z.getContextAttributes()},this.forceContextLoss=function(){const P=Fe.get("WEBGL_lose_context");P&&P.loseContext()},this.forceContextRestore=function(){const P=Fe.get("WEBGL_lose_context");P&&P.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(P){P!==void 0&&(K=P,this.setSize(H,q,!1))},this.getSize=function(P){return P.set(H,q)},this.setSize=function(P,ee,le=!0){if(lt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=P,q=ee,t.width=Math.floor(P*K),t.height=Math.floor(ee*K),le===!0&&(t.style.width=P+"px",t.style.height=ee+"px"),this.setViewport(0,0,P,ee)},this.getDrawingBufferSize=function(P){return P.set(H*K,q*K).floor()},this.setDrawingBufferSize=function(P,ee,le){H=P,q=ee,K=le,t.width=Math.floor(P*le),t.height=Math.floor(ee*le),this.setViewport(0,0,P,ee)},this.getCurrentViewport=function(P){return P.copy(D)},this.getViewport=function(P){return P.copy(V)},this.setViewport=function(P,ee,le,de){P.isVector4?V.set(P.x,P.y,P.z,P.w):V.set(P,ee,le,de),Pe.viewport(D.copy(V).multiplyScalar(K).floor())},this.getScissor=function(P){return P.copy(I)},this.setScissor=function(P,ee,le,de){P.isVector4?I.set(P.x,P.y,P.z,P.w):I.set(P,ee,le,de),Pe.scissor(te.copy(I).multiplyScalar(K).floor())},this.getScissorTest=function(){return z},this.setScissorTest=function(P){Pe.setScissorTest(z=P)},this.setOpaqueSort=function(P){N=P},this.setTransparentSort=function(P){X=P},this.getClearColor=function(P){return P.copy(gt.getClearColor())},this.setClearColor=function(){gt.setClearColor.apply(gt,arguments)},this.getClearAlpha=function(){return gt.getClearAlpha()},this.setClearAlpha=function(){gt.setClearAlpha.apply(gt,arguments)},this.clear=function(P=!0,ee=!0,le=!0){let de=0;if(P){let oe=!1;if(U!==null){const Ue=U.texture.format;oe=Ue===Og||Ue===Ug||Ue===Ng}if(oe){const Ue=U.texture.type,Ye=Ue===Cr||Ue===Er||Ue===Bd||Ue===is||Ue===Dg||Ue===Ig,et=gt.getClearColor(),ze=gt.getClearAlpha(),ut=et.r,st=et.g,at=et.b;Ye?(S[0]=ut,S[1]=st,S[2]=at,S[3]=ze,Z.clearBufferuiv(Z.COLOR,0,S)):(E[0]=ut,E[1]=st,E[2]=at,E[3]=ze,Z.clearBufferiv(Z.COLOR,0,E))}else de|=Z.COLOR_BUFFER_BIT}ee&&(de|=Z.DEPTH_BUFFER_BIT),le&&(de|=Z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Z.clear(de)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ce,!1),t.removeEventListener("webglcontextrestored",j,!1),t.removeEventListener("webglcontextcreationerror",Re,!1),Be.dispose(),Ke.dispose(),Xe.dispose(),A.dispose(),ne.dispose(),_e.dispose(),tt.dispose(),_t.dispose(),Le.dispose(),lt.dispose(),lt.removeEventListener("sessionstart",Jt),lt.removeEventListener("sessionend",yt),xe&&(xe.dispose(),xe=null),Yt.stop()};function Ce(P){P.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function j(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const P=$e.autoReset,ee=Se.enabled,le=Se.autoUpdate,de=Se.needsUpdate,oe=Se.type;Rt(),$e.autoReset=P,Se.enabled=ee,Se.autoUpdate=le,Se.needsUpdate=de,Se.type=oe}function Re(P){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function De(P){const ee=P.target;ee.removeEventListener("dispose",De),nt(ee)}function nt(P){Ze(P),Xe.remove(P)}function Ze(P){const ee=Xe.get(P).programs;ee!==void 0&&(ee.forEach(function(le){Le.releaseProgram(le)}),P.isShaderMaterial&&Le.releaseShaderCache(P))}this.renderBufferDirect=function(P,ee,le,de,oe,Ue){ee===null&&(ee=Te);const Ye=oe.isMesh&&oe.matrixWorld.determinant()<0,et=tc(P,ee,le,de,oe);Pe.setMaterial(de,Ye);let ze=le.index,ut=1;if(de.wireframe===!0){if(ze=me.getWireframeAttribute(le),ze===void 0)return;ut=2}const st=le.drawRange,at=le.attributes.position;let bt=st.start*ut,xn=(st.start+st.count)*ut;Ue!==null&&(bt=Math.max(bt,Ue.start*ut),xn=Math.min(xn,(Ue.start+Ue.count)*ut)),ze!==null?(bt=Math.max(bt,0),xn=Math.min(xn,ze.count)):at!=null&&(bt=Math.max(bt,0),xn=Math.min(xn,at.count));const Gt=xn-bt;if(Gt<0||Gt===1/0)return;tt.setup(oe,de,et,le,ze);let An,vt=it;if(ze!==null&&(An=ge.get(ze),vt=qe,vt.setIndex(An)),oe.isMesh)de.wireframe===!0?(Pe.setLineWidth(de.wireframeLinewidth*Ge()),vt.setMode(Z.LINES)):vt.setMode(Z.TRIANGLES);else if(oe.isLine){let dt=de.linewidth;dt===void 0&&(dt=1),Pe.setLineWidth(dt*Ge()),oe.isLineSegments?vt.setMode(Z.LINES):oe.isLineLoop?vt.setMode(Z.LINE_LOOP):vt.setMode(Z.LINE_STRIP)}else oe.isPoints?vt.setMode(Z.POINTS):oe.isSprite&&vt.setMode(Z.TRIANGLES);if(oe.isBatchedMesh)vt.renderMultiDraw(oe._multiDrawStarts,oe._multiDrawCounts,oe._multiDrawCount);else if(oe.isInstancedMesh)vt.renderInstances(bt,Gt,oe.count);else if(le.isInstancedBufferGeometry){const dt=le._maxInstanceCount!==void 0?le._maxInstanceCount:1/0,yn=Math.min(le.instanceCount,dt);vt.renderInstances(bt,Gt,yn)}else vt.render(bt,Gt)};function Tt(P,ee,le){P.transparent===!0&&P.side===Wi&&P.forceSinglePass===!1?(P.side=kn,P.needsUpdate=!0,$i(P,ee,le),P.side=Rr,P.needsUpdate=!0,$i(P,ee,le),P.side=Wi):$i(P,ee,le)}this.compile=function(P,ee,le=null){le===null&&(le=P),x=Ke.get(le),x.init(),w.push(x),le.traverseVisible(function(oe){oe.isLight&&oe.layers.test(ee.layers)&&(x.pushLight(oe),oe.castShadow&&x.pushShadow(oe))}),P!==le&&P.traverseVisible(function(oe){oe.isLight&&oe.layers.test(ee.layers)&&(x.pushLight(oe),oe.castShadow&&x.pushShadow(oe))}),x.setupLights(R._useLegacyLights);const de=new Set;return P.traverse(function(oe){const Ue=oe.material;if(Ue)if(Array.isArray(Ue))for(let Ye=0;Ye<Ue.length;Ye++){const et=Ue[Ye];Tt(et,le,oe),de.add(et)}else Tt(Ue,le,oe),de.add(Ue)}),w.pop(),x=null,de},this.compileAsync=function(P,ee,le=null){const de=this.compile(P,ee,le);return new Promise(oe=>{function Ue(){if(de.forEach(function(Ye){Xe.get(Ye).currentProgram.isReady()&&de.delete(Ye)}),de.size===0){oe(P);return}setTimeout(Ue,10)}Fe.get("KHR_parallel_shader_compile")!==null?Ue():setTimeout(Ue,10)})};let wt=null;function Bt(P){wt&&wt(P)}function Jt(){Yt.stop()}function yt(){Yt.start()}const Yt=new Jg;Yt.setAnimationLoop(Bt),typeof self<"u"&&Yt.setContext(self),this.setAnimationLoop=function(P){wt=P,lt.setAnimationLoop(P),P===null?Yt.stop():Yt.start()},lt.addEventListener("sessionstart",Jt),lt.addEventListener("sessionend",yt),this.render=function(P,ee){if(ee!==void 0&&ee.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),ee.parent===null&&ee.matrixWorldAutoUpdate===!0&&ee.updateMatrixWorld(),lt.enabled===!0&&lt.isPresenting===!0&&(lt.cameraAutoUpdate===!0&&lt.updateCamera(ee),ee=lt.getCamera()),P.isScene===!0&&P.onBeforeRender(R,P,ee,U),x=Ke.get(P,w.length),x.init(),w.push(x),ye.multiplyMatrices(ee.projectionMatrix,ee.matrixWorldInverse),Y.setFromProjectionMatrix(ye),pe=this.localClippingEnabled,Q=ot.init(this.clippingPlanes,pe),M=Be.get(P,y.length),M.init(),y.push(M),dn(P,ee,0,R.sortObjects),M.finish(),R.sortObjects===!0&&M.sort(N,X),this.info.render.frame++,Q===!0&&ot.beginShadows();const le=x.state.shadowsArray;if(Se.render(le,P,ee),Q===!0&&ot.endShadows(),this.info.autoReset===!0&&this.info.reset(),gt.render(M,P),x.setupLights(R._useLegacyLights),ee.isArrayCamera){const de=ee.cameras;for(let oe=0,Ue=de.length;oe<Ue;oe++){const Ye=de[oe];ca(M,P,Ye,Ye.viewport)}}else ca(M,P,ee);U!==null&&(L.updateMultisampleRenderTarget(U),L.updateRenderTargetMipmap(U)),P.isScene===!0&&P.onAfterRender(R,P,ee),tt.resetDefaultState(),he=-1,C=null,w.pop(),w.length>0?x=w[w.length-1]:x=null,y.pop(),y.length>0?M=y[y.length-1]:M=null};function dn(P,ee,le,de){if(P.visible===!1)return;if(P.layers.test(ee.layers)){if(P.isGroup)le=P.renderOrder;else if(P.isLOD)P.autoUpdate===!0&&P.update(ee);else if(P.isLight)x.pushLight(P),P.castShadow&&x.pushShadow(P);else if(P.isSprite){if(!P.frustumCulled||Y.intersectsSprite(P)){de&&fe.setFromMatrixPosition(P.matrixWorld).applyMatrix4(ye);const Ye=_e.update(P),et=P.material;et.visible&&M.push(P,Ye,et,le,fe.z,null)}}else if((P.isMesh||P.isLine||P.isPoints)&&(!P.frustumCulled||Y.intersectsObject(P))){const Ye=_e.update(P),et=P.material;if(de&&(P.boundingSphere!==void 0?(P.boundingSphere===null&&P.computeBoundingSphere(),fe.copy(P.boundingSphere.center)):(Ye.boundingSphere===null&&Ye.computeBoundingSphere(),fe.copy(Ye.boundingSphere.center)),fe.applyMatrix4(P.matrixWorld).applyMatrix4(ye)),Array.isArray(et)){const ze=Ye.groups;for(let ut=0,st=ze.length;ut<st;ut++){const at=ze[ut],bt=et[at.materialIndex];bt&&bt.visible&&M.push(P,Ye,bt,le,fe.z,at)}}else et.visible&&M.push(P,Ye,et,le,fe.z,null)}}const Ue=P.children;for(let Ye=0,et=Ue.length;Ye<et;Ye++)dn(Ue[Ye],ee,le,de)}function ca(P,ee,le,de){const oe=P.opaque,Ue=P.transmissive,Ye=P.transparent;x.setupLightsView(le),Q===!0&&ot.setGlobalState(R.clippingPlanes,le),Ue.length>0&&Pr(oe,Ue,ee,le),de&&Pe.viewport(D.copy(de)),oe.length>0&&Ci(oe,ee,le),Ue.length>0&&Ci(Ue,ee,le),Ye.length>0&&Ci(Ye,ee,le),Pe.buffers.depth.setTest(!0),Pe.buffers.depth.setMask(!0),Pe.buffers.color.setMask(!0),Pe.setPolygonOffset(!1)}function Pr(P,ee,le,de){if((le.isScene===!0?le.overrideMaterial:null)!==null)return;const Ue=Ne.isWebGL2;xe===null&&(xe=new os(1,1,{generateMipmaps:!0,type:Fe.has("EXT_color_buffer_half_float")?ea:Cr,minFilter:to,samples:Ue?4:0})),R.getDrawingBufferSize(ue),Ue?xe.setSize(ue.x,ue.y):xe.setSize(Dd(ue.x),Dd(ue.y));const Ye=R.getRenderTarget();R.setRenderTarget(xe),R.getClearColor(ae),k=R.getClearAlpha(),k<1&&R.setClearColor(16777215,.5),R.clear();const et=R.toneMapping;R.toneMapping=Ar,Ci(P,le,de),L.updateMultisampleRenderTarget(xe),L.updateRenderTargetMipmap(xe);let ze=!1;for(let ut=0,st=ee.length;ut<st;ut++){const at=ee[ut],bt=at.object,xn=at.geometry,Gt=at.material,An=at.group;if(Gt.side===Wi&&bt.layers.test(de.layers)){const vt=Gt.side;Gt.side=kn,Gt.needsUpdate=!0,Dr(bt,le,de,xn,Gt,An),Gt.side=vt,Gt.needsUpdate=!0,ze=!0}}ze===!0&&(L.updateMultisampleRenderTarget(xe),L.updateRenderTargetMipmap(xe)),R.setRenderTarget(Ye),R.setClearColor(ae,k),R.toneMapping=et}function Ci(P,ee,le){const de=ee.isScene===!0?ee.overrideMaterial:null;for(let oe=0,Ue=P.length;oe<Ue;oe++){const Ye=P[oe],et=Ye.object,ze=Ye.geometry,ut=de===null?Ye.material:de,st=Ye.group;et.layers.test(le.layers)&&Dr(et,ee,le,ze,ut,st)}}function Dr(P,ee,le,de,oe,Ue){P.onBeforeRender(R,ee,le,de,oe,Ue),P.modelViewMatrix.multiplyMatrices(le.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),oe.onBeforeRender(R,ee,le,de,P,Ue),oe.transparent===!0&&oe.side===Wi&&oe.forceSinglePass===!1?(oe.side=kn,oe.needsUpdate=!0,R.renderBufferDirect(le,ee,de,oe,P,Ue),oe.side=Rr,oe.needsUpdate=!0,R.renderBufferDirect(le,ee,de,oe,P,Ue),oe.side=Wi):R.renderBufferDirect(le,ee,de,oe,P,Ue),P.onAfterRender(R,ee,le,de,oe,Ue)}function $i(P,ee,le){ee.isScene!==!0&&(ee=Te);const de=Xe.get(P),oe=x.state.lights,Ue=x.state.shadowsArray,Ye=oe.state.version,et=Le.getParameters(P,oe.state,Ue,ee,le),ze=Le.getProgramCacheKey(et);let ut=de.programs;de.environment=P.isMeshStandardMaterial?ee.environment:null,de.fog=ee.fog,de.envMap=(P.isMeshStandardMaterial?ne:A).get(P.envMap||de.environment),ut===void 0&&(P.addEventListener("dispose",De),ut=new Map,de.programs=ut);let st=ut.get(ze);if(st!==void 0){if(de.currentProgram===st&&de.lightsStateVersion===Ye)return da(P,et),st}else et.uniforms=Le.getUniforms(P),P.onBuild(le,et,R),P.onBeforeCompile(et,R),st=Le.acquireProgram(et,ze),ut.set(ze,st),de.uniforms=et.uniforms;const at=de.uniforms;return(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)&&(at.clippingPlanes=ot.uniform),da(P,et),de.needsLights=fa(P),de.lightsStateVersion=Ye,de.needsLights&&(at.ambientLightColor.value=oe.state.ambient,at.lightProbe.value=oe.state.probe,at.directionalLights.value=oe.state.directional,at.directionalLightShadows.value=oe.state.directionalShadow,at.spotLights.value=oe.state.spot,at.spotLightShadows.value=oe.state.spotShadow,at.rectAreaLights.value=oe.state.rectArea,at.ltc_1.value=oe.state.rectAreaLTC1,at.ltc_2.value=oe.state.rectAreaLTC2,at.pointLights.value=oe.state.point,at.pointLightShadows.value=oe.state.pointShadow,at.hemisphereLights.value=oe.state.hemi,at.directionalShadowMap.value=oe.state.directionalShadowMap,at.directionalShadowMatrix.value=oe.state.directionalShadowMatrix,at.spotShadowMap.value=oe.state.spotShadowMap,at.spotLightMatrix.value=oe.state.spotLightMatrix,at.spotLightMap.value=oe.state.spotLightMap,at.pointShadowMap.value=oe.state.pointShadowMap,at.pointShadowMatrix.value=oe.state.pointShadowMatrix),de.currentProgram=st,de.uniformsList=null,st}function ua(P){if(P.uniformsList===null){const ee=P.currentProgram.getUniforms();P.uniformsList=Hl.seqWithValue(ee.seq,P.uniforms)}return P.uniformsList}function da(P,ee){const le=Xe.get(P);le.outputColorSpace=ee.outputColorSpace,le.batching=ee.batching,le.instancing=ee.instancing,le.instancingColor=ee.instancingColor,le.skinning=ee.skinning,le.morphTargets=ee.morphTargets,le.morphNormals=ee.morphNormals,le.morphColors=ee.morphColors,le.morphTargetsCount=ee.morphTargetsCount,le.numClippingPlanes=ee.numClippingPlanes,le.numIntersection=ee.numClipIntersection,le.vertexAlphas=ee.vertexAlphas,le.vertexTangents=ee.vertexTangents,le.toneMapping=ee.toneMapping}function tc(P,ee,le,de,oe){ee.isScene!==!0&&(ee=Te),L.resetTextureUnits();const Ue=ee.fog,Ye=de.isMeshStandardMaterial?ee.environment:null,et=U===null?R.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:qi,ze=(de.isMeshStandardMaterial?ne:A).get(de.envMap||Ye),ut=de.vertexColors===!0&&!!le.attributes.color&&le.attributes.color.itemSize===4,st=!!le.attributes.tangent&&(!!de.normalMap||de.anisotropy>0),at=!!le.morphAttributes.position,bt=!!le.morphAttributes.normal,xn=!!le.morphAttributes.color;let Gt=Ar;de.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(Gt=R.toneMapping);const An=le.morphAttributes.position||le.morphAttributes.normal||le.morphAttributes.color,vt=An!==void 0?An.length:0,dt=Xe.get(de),yn=x.state.lights;if(Q===!0&&(pe===!0||P!==C)){const Cn=P===C&&de.id===he;ot.setState(de,P,Cn)}let Nt=!1;de.version===dt.__version?(dt.needsLights&&dt.lightsStateVersion!==yn.state.version||dt.outputColorSpace!==et||oe.isBatchedMesh&&dt.batching===!1||!oe.isBatchedMesh&&dt.batching===!0||oe.isInstancedMesh&&dt.instancing===!1||!oe.isInstancedMesh&&dt.instancing===!0||oe.isSkinnedMesh&&dt.skinning===!1||!oe.isSkinnedMesh&&dt.skinning===!0||oe.isInstancedMesh&&dt.instancingColor===!0&&oe.instanceColor===null||oe.isInstancedMesh&&dt.instancingColor===!1&&oe.instanceColor!==null||dt.envMap!==ze||de.fog===!0&&dt.fog!==Ue||dt.numClippingPlanes!==void 0&&(dt.numClippingPlanes!==ot.numPlanes||dt.numIntersection!==ot.numIntersection)||dt.vertexAlphas!==ut||dt.vertexTangents!==st||dt.morphTargets!==at||dt.morphNormals!==bt||dt.morphColors!==xn||dt.toneMapping!==Gt||Ne.isWebGL2===!0&&dt.morphTargetsCount!==vt)&&(Nt=!0):(Nt=!0,dt.__version=de.version);let bi=dt.currentProgram;Nt===!0&&(bi=$i(de,ee,oe));let ha=!1,_i=!1,Ki=!1;const zt=bi.getUniforms(),qn=dt.uniforms;if(Pe.useProgram(bi.program)&&(ha=!0,_i=!0,Ki=!0),de.id!==he&&(he=de.id,_i=!0),ha||C!==P){zt.setValue(Z,"projectionMatrix",P.projectionMatrix),zt.setValue(Z,"viewMatrix",P.matrixWorldInverse);const Cn=zt.map.cameraPosition;Cn!==void 0&&Cn.setValue(Z,fe.setFromMatrixPosition(P.matrixWorld)),Ne.logarithmicDepthBuffer&&zt.setValue(Z,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2)),(de.isMeshPhongMaterial||de.isMeshToonMaterial||de.isMeshLambertMaterial||de.isMeshBasicMaterial||de.isMeshStandardMaterial||de.isShaderMaterial)&&zt.setValue(Z,"isOrthographic",P.isOrthographicCamera===!0),C!==P&&(C=P,_i=!0,Ki=!0)}if(oe.isSkinnedMesh){zt.setOptional(Z,oe,"bindMatrix"),zt.setOptional(Z,oe,"bindMatrixInverse");const Cn=oe.skeleton;Cn&&(Ne.floatVertexTextures?(Cn.boneTexture===null&&Cn.computeBoneTexture(),zt.setValue(Z,"boneTexture",Cn.boneTexture,L)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}oe.isBatchedMesh&&(zt.setOptional(Z,oe,"batchingTexture"),zt.setValue(Z,"batchingTexture",oe._matricesTexture,L));const lo=le.morphAttributes;if((lo.position!==void 0||lo.normal!==void 0||lo.color!==void 0&&Ne.isWebGL2===!0)&&ct.update(oe,le,bi),(_i||dt.receiveShadow!==oe.receiveShadow)&&(dt.receiveShadow=oe.receiveShadow,zt.setValue(Z,"receiveShadow",oe.receiveShadow)),de.isMeshGouraudMaterial&&de.envMap!==null&&(qn.envMap.value=ze,qn.flipEnvMap.value=ze.isCubeTexture&&ze.isRenderTargetTexture===!1?-1:1),_i&&(zt.setValue(Z,"toneMappingExposure",R.toneMappingExposure),dt.needsLights&&Ri(qn,Ki),Ue&&de.fog===!0&&Ie.refreshFogUniforms(qn,Ue),Ie.refreshMaterialUniforms(qn,de,K,q,xe),Hl.upload(Z,ua(dt),qn,L)),de.isShaderMaterial&&de.uniformsNeedUpdate===!0&&(Hl.upload(Z,ua(dt),qn,L),de.uniformsNeedUpdate=!1),de.isSpriteMaterial&&zt.setValue(Z,"center",oe.center),zt.setValue(Z,"modelViewMatrix",oe.modelViewMatrix),zt.setValue(Z,"normalMatrix",oe.normalMatrix),zt.setValue(Z,"modelMatrix",oe.matrixWorld),de.isShaderMaterial||de.isRawShaderMaterial){const Cn=de.uniformsGroups;for(let Ir=0,pa=Cn.length;Ir<pa;Ir++)if(Ne.isWebGL2){const ls=Cn[Ir];_t.update(ls,bi),_t.bind(ls,bi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return bi}function Ri(P,ee){P.ambientLightColor.needsUpdate=ee,P.lightProbe.needsUpdate=ee,P.directionalLights.needsUpdate=ee,P.directionalLightShadows.needsUpdate=ee,P.pointLights.needsUpdate=ee,P.pointLightShadows.needsUpdate=ee,P.spotLights.needsUpdate=ee,P.spotLightShadows.needsUpdate=ee,P.rectAreaLights.needsUpdate=ee,P.hemisphereLights.needsUpdate=ee}function fa(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return G},this.getActiveMipmapLevel=function(){return B},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(P,ee,le){Xe.get(P.texture).__webglTexture=ee,Xe.get(P.depthTexture).__webglTexture=le;const de=Xe.get(P);de.__hasExternalTextures=!0,de.__hasExternalTextures&&(de.__autoAllocateDepthBuffer=le===void 0,de.__autoAllocateDepthBuffer||Fe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),de.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(P,ee){const le=Xe.get(P);le.__webglFramebuffer=ee,le.__useDefaultFramebuffer=ee===void 0},this.setRenderTarget=function(P,ee=0,le=0){U=P,G=ee,B=le;let de=!0,oe=null,Ue=!1,Ye=!1;if(P){const ze=Xe.get(P);ze.__useDefaultFramebuffer!==void 0?(Pe.bindFramebuffer(Z.FRAMEBUFFER,null),de=!1):ze.__webglFramebuffer===void 0?L.setupRenderTarget(P):ze.__hasExternalTextures&&L.rebindTextures(P,Xe.get(P.texture).__webglTexture,Xe.get(P.depthTexture).__webglTexture);const ut=P.texture;(ut.isData3DTexture||ut.isDataArrayTexture||ut.isCompressedArrayTexture)&&(Ye=!0);const st=Xe.get(P).__webglFramebuffer;P.isWebGLCubeRenderTarget?(Array.isArray(st[ee])?oe=st[ee][le]:oe=st[ee],Ue=!0):Ne.isWebGL2&&P.samples>0&&L.useMultisampledRTT(P)===!1?oe=Xe.get(P).__webglMultisampledFramebuffer:Array.isArray(st)?oe=st[le]:oe=st,D.copy(P.viewport),te.copy(P.scissor),ie=P.scissorTest}else D.copy(V).multiplyScalar(K).floor(),te.copy(I).multiplyScalar(K).floor(),ie=z;if(Pe.bindFramebuffer(Z.FRAMEBUFFER,oe)&&Ne.drawBuffers&&de&&Pe.drawBuffers(P,oe),Pe.viewport(D),Pe.scissor(te),Pe.setScissorTest(ie),Ue){const ze=Xe.get(P.texture);Z.framebufferTexture2D(Z.FRAMEBUFFER,Z.COLOR_ATTACHMENT0,Z.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ze.__webglTexture,le)}else if(Ye){const ze=Xe.get(P.texture),ut=ee||0;Z.framebufferTextureLayer(Z.FRAMEBUFFER,Z.COLOR_ATTACHMENT0,ze.__webglTexture,le||0,ut)}he=-1},this.readRenderTargetPixels=function(P,ee,le,de,oe,Ue,Ye){if(!(P&&P.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let et=Xe.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&Ye!==void 0&&(et=et[Ye]),et){Pe.bindFramebuffer(Z.FRAMEBUFFER,et);try{const ze=P.texture,ut=ze.format,st=ze.type;if(ut!==vi&&ke.convert(ut)!==Z.getParameter(Z.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const at=st===ea&&(Fe.has("EXT_color_buffer_half_float")||Ne.isWebGL2&&Fe.has("EXT_color_buffer_float"));if(st!==Cr&&ke.convert(st)!==Z.getParameter(Z.IMPLEMENTATION_COLOR_READ_TYPE)&&!(st===Tr&&(Ne.isWebGL2||Fe.has("OES_texture_float")||Fe.has("WEBGL_color_buffer_float")))&&!at){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}ee>=0&&ee<=P.width-de&&le>=0&&le<=P.height-oe&&Z.readPixels(ee,le,de,oe,ke.convert(ut),ke.convert(st),Ue)}finally{const ze=U!==null?Xe.get(U).__webglFramebuffer:null;Pe.bindFramebuffer(Z.FRAMEBUFFER,ze)}}},this.copyFramebufferToTexture=function(P,ee,le=0){const de=Math.pow(2,-le),oe=Math.floor(ee.image.width*de),Ue=Math.floor(ee.image.height*de);L.setTexture2D(ee,0),Z.copyTexSubImage2D(Z.TEXTURE_2D,le,0,0,P.x,P.y,oe,Ue),Pe.unbindTexture()},this.copyTextureToTexture=function(P,ee,le,de=0){const oe=ee.image.width,Ue=ee.image.height,Ye=ke.convert(le.format),et=ke.convert(le.type);L.setTexture2D(le,0),Z.pixelStorei(Z.UNPACK_FLIP_Y_WEBGL,le.flipY),Z.pixelStorei(Z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,le.premultiplyAlpha),Z.pixelStorei(Z.UNPACK_ALIGNMENT,le.unpackAlignment),ee.isDataTexture?Z.texSubImage2D(Z.TEXTURE_2D,de,P.x,P.y,oe,Ue,Ye,et,ee.image.data):ee.isCompressedTexture?Z.compressedTexSubImage2D(Z.TEXTURE_2D,de,P.x,P.y,ee.mipmaps[0].width,ee.mipmaps[0].height,Ye,ee.mipmaps[0].data):Z.texSubImage2D(Z.TEXTURE_2D,de,P.x,P.y,Ye,et,ee.image),de===0&&le.generateMipmaps&&Z.generateMipmap(Z.TEXTURE_2D),Pe.unbindTexture()},this.copyTextureToTexture3D=function(P,ee,le,de,oe=0){if(R.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Ue=P.max.x-P.min.x+1,Ye=P.max.y-P.min.y+1,et=P.max.z-P.min.z+1,ze=ke.convert(de.format),ut=ke.convert(de.type);let st;if(de.isData3DTexture)L.setTexture3D(de,0),st=Z.TEXTURE_3D;else if(de.isDataArrayTexture||de.isCompressedArrayTexture)L.setTexture2DArray(de,0),st=Z.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}Z.pixelStorei(Z.UNPACK_FLIP_Y_WEBGL,de.flipY),Z.pixelStorei(Z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,de.premultiplyAlpha),Z.pixelStorei(Z.UNPACK_ALIGNMENT,de.unpackAlignment);const at=Z.getParameter(Z.UNPACK_ROW_LENGTH),bt=Z.getParameter(Z.UNPACK_IMAGE_HEIGHT),xn=Z.getParameter(Z.UNPACK_SKIP_PIXELS),Gt=Z.getParameter(Z.UNPACK_SKIP_ROWS),An=Z.getParameter(Z.UNPACK_SKIP_IMAGES),vt=le.isCompressedTexture?le.mipmaps[oe]:le.image;Z.pixelStorei(Z.UNPACK_ROW_LENGTH,vt.width),Z.pixelStorei(Z.UNPACK_IMAGE_HEIGHT,vt.height),Z.pixelStorei(Z.UNPACK_SKIP_PIXELS,P.min.x),Z.pixelStorei(Z.UNPACK_SKIP_ROWS,P.min.y),Z.pixelStorei(Z.UNPACK_SKIP_IMAGES,P.min.z),le.isDataTexture||le.isData3DTexture?Z.texSubImage3D(st,oe,ee.x,ee.y,ee.z,Ue,Ye,et,ze,ut,vt.data):le.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),Z.compressedTexSubImage3D(st,oe,ee.x,ee.y,ee.z,Ue,Ye,et,ze,vt.data)):Z.texSubImage3D(st,oe,ee.x,ee.y,ee.z,Ue,Ye,et,ze,ut,vt),Z.pixelStorei(Z.UNPACK_ROW_LENGTH,at),Z.pixelStorei(Z.UNPACK_IMAGE_HEIGHT,bt),Z.pixelStorei(Z.UNPACK_SKIP_PIXELS,xn),Z.pixelStorei(Z.UNPACK_SKIP_ROWS,Gt),Z.pixelStorei(Z.UNPACK_SKIP_IMAGES,An),oe===0&&de.generateMipmaps&&Z.generateMipmap(st),Pe.unbindTexture()},this.initTexture=function(P){P.isCubeTexture?L.setTextureCube(P,0):P.isData3DTexture?L.setTexture3D(P,0):P.isDataArrayTexture||P.isCompressedArrayTexture?L.setTexture2DArray(P,0):L.setTexture2D(P,0),Pe.unbindTexture()},this.resetState=function(){G=0,B=0,U=null,Pe.reset(),tt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Xi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===zd?"display-p3":"srgb",t.unpackColorSpace=Ct.workingColorSpace===Ql?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===cn?ss:kg}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===ss?cn:qi}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class NT extends a0{}NT.prototype.isWebGL1Renderer=!0;class UT extends un{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class OT extends Bn{constructor(e,t,s,o,l,u,d,f,p){super(e,t,s,o,l,u,d,f,p),this.isCanvasTexture=!0,this.needsUpdate=!0}}class FT extends aa{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Mt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Mt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Bg,this.normalScale=new Et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class jd extends un{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Mt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class kT extends jd{constructor(e,t,s){super(e,s),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(un.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Mt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const xd=new Kt,ng=new ce,ig=new ce;class BT{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Et(512,512),this.map=null,this.mapPass=null,this.matrix=new Kt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Gd,this._frameExtents=new Et(1,1),this._viewportCount=1,this._viewports=[new sn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,s=this.matrix;ng.setFromMatrixPosition(e.matrixWorld),t.position.copy(ng),ig.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ig),t.updateMatrixWorld(),xd.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xd),s.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),s.multiply(xd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class zT extends BT{constructor(){super(new e0(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class HT extends jd{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(un.DEFAULT_UP),this.updateMatrix(),this.target=new un,this.shadow=new zT}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class GT extends jd{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:kd}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=kd);function Xd({world:r,preview:e,className:t,style:s}){const o=ve.useRef(null),l=ve.useRef(null),u=ve.useRef(null),d=ve.useRef({x:0,y:0});return ve.useEffect(()=>{const f=o.current;if(!f)return;const p=f.clientWidth||800,g=f.clientHeight||600,m=new UT;let _=u.current;_?(_.aspect=p/g,_.updateProjectionMatrix()):(_=new ii(45,p/g,.1,100),_.position.set(0,0,2.6),u.current=_);const S=new a0({antialias:!0,alpha:!0});S.setPixelRatio(window.devicePixelRatio||1),S.setSize(p,g,!1),f.appendChild(S.domElement);const E=new kT(16777215,4473924,1.2);m.add(E);const M=new HT(16777215,.8);M.position.set(5,3,5),m.add(M);const x=new GT(16777215,.3);m.add(x);const y=document.createElement("canvas");l.current=y;function w(){let ue=e;if(!ue&&r&&(console.log("[Globe3D] Generating preview from world"),ue=so(r)),!ue)throw new Error("No preview available");console.log("[Globe3D] Creating texture from preview:",ue.width,"x",ue.height,"rgba buffer:",ue.rgba instanceof Uint8ClampedArray);const fe=ue.width,Te=ue.height;if(ue.rgba&&ue.rgba instanceof Uint8ClampedArray){y.width=fe,y.height=Te;const Z=y.getContext("2d");if(!Z)throw new Error("Failed to create texture canvas 2D context");const ht=new ImageData(ue.rgba,fe,Te);Z.putImageData(ht,0,0);const Fe=Z.getImageData(0,0,fe,Te),Ne=Fe.data;let Pe=0,$e=0,Xe=0;for(let ge=0;ge<fe;ge++){const me=ge*4;Pe+=Ne[me],$e+=Ne[me+1],Xe+=Ne[me+2]}Pe=Math.round(Pe/fe),$e=Math.round($e/fe),Xe=Math.round(Xe/fe);for(let ge=0;ge<fe;ge++){const me=ge*4;Ne[me]=Pe,Ne[me+1]=$e,Ne[me+2]=Xe}let L=0,A=0,ne=0;for(let ge=0;ge<fe;ge++){const me=((Te-1)*fe+ge)*4;L+=Ne[me],A+=Ne[me+1],ne+=Ne[me+2]}L=Math.round(L/fe),A=Math.round(A/fe),ne=Math.round(ne/fe);for(let ge=0;ge<fe;ge++){const me=((Te-1)*fe+ge)*4;Ne[me]=L,Ne[me+1]=A,Ne[me+2]=ne}Z.putImageData(Fe,0,0)}else{y.width=fe,y.height=Te;const Z=y.getContext("2d");if(!Z)throw new Error("Failed to create texture canvas 2D context");const ht=Z.createImageData(fe,Te),Fe=ht.data,Ne=.5/Te;for(let _e=0;_e<Te;_e++){const Le=_e/(Te-1),Be=Math.max(Ne,Math.min(1-Ne,Le))*(Te-1),Ke=Math.floor(Be),ot=Math.max(0,Math.min(Te-1,Ke));for(let Se=0;Se<fe;Se++){const ct=Se/fe*fe,it=Math.floor(ct)%fe,qe=ot*fe+it,ke=ue.sampleGlobeColor?ue.sampleGlobeColor(qe):[255,0,255,255],tt=(_e*fe+Se)*4;Fe[tt+0]=ke[0],Fe[tt+1]=ke[1],Fe[tt+2]=ke[2],Fe[tt+3]=ke[3]}}Z.putImageData(ht,0,0);const Pe=Z.getImageData(0,0,fe,Te),$e=Pe.data;let Xe=0,L=0,A=0;for(let _e=0;_e<fe;_e++){const Le=_e*4;Xe+=$e[Le],L+=$e[Le+1],A+=$e[Le+2]}Xe=Math.round(Xe/fe),L=Math.round(L/fe),A=Math.round(A/fe);for(let _e=0;_e<fe;_e++){const Le=_e*4;$e[Le]=Xe,$e[Le+1]=L,$e[Le+2]=A}let ne=0,ge=0,me=0;for(let _e=0;_e<fe;_e++){const Le=((Te-1)*fe+_e)*4;ne+=$e[Le],ge+=$e[Le+1],me+=$e[Le+2]}ne=Math.round(ne/fe),ge=Math.round(ge/fe),me=Math.round(me/fe);for(let _e=0;_e<fe;_e++){const Le=((Te-1)*fe+_e)*4;$e[Le]=ne,$e[Le+1]=ge,$e[Le+2]=me}Z.putImageData(Pe,0,0)}const Ge=new OT(y);return Ge.wrapS=Vl,Ge.wrapT=ri,Ge.magFilter=Yn,Ge.minFilter=to,Ge.generateMipmaps=!0,Ge.anisotropy=S.capabilities.getMaxAnisotropy(),Ge.flipY=!1,Ge.needsUpdate=!0,Ge}const R=w(),b=128,G=64,B=new Lr,U=[],he=[],C=[],D=[];for(let ue=0;ue<=G;ue++){const fe=ue/G,Te=fe*Math.PI;for(let Ge=0;Ge<=b;Ge++){const Z=Ge/b,ht=Z*Math.PI*2,Fe=-Math.sin(Te)*Math.cos(ht),Ne=Math.cos(Te),Pe=Math.sin(Te)*Math.sin(ht);U.push(Fe,Ne,Pe),he.push(Fe,Ne,Pe),C.push(Z,fe)}}for(let ue=0;ue<G;ue++)for(let fe=0;fe<b;fe++){const Te=ue*(b+1)+fe,Ge=Te+b+1,Z=Te+1,ht=Ge+1;D.push(Te,Ge,Z),D.push(Ge,ht,Z)}B.setIndex(D),B.setAttribute("position",new Ai(U,3)),B.setAttribute("normal",new Ai(he,3)),B.setAttribute("uv",new Ai(C,2));const te=new FT({map:R,metalness:0,roughness:.8,flatShading:!1}),ie=new Yi(B,te);ie.rotation.x=d.current.x,ie.rotation.y=d.current.y,m.add(ie);let ae=null;performance.now();let k=!1,H=0,q=0,K=0,N=0;function X(){const ue=o.current;if(!ue||!_)return;const fe=ue.clientWidth||800,Te=ue.clientHeight||600;_.aspect=fe/Te,_.updateProjectionMatrix(),S.setSize(fe,Te,!1)}window.addEventListener("resize",X);function V(){_&&((Math.abs(K)>1e-5||Math.abs(N)>1e-5)&&(ie.rotation.y+=K,ie.rotation.x=Math.max(Math.min(ie.rotation.x+N,Math.PI/2-.1),-Math.PI/2+.1),d.current.x=ie.rotation.x,d.current.y=ie.rotation.y,K*=.92,N*=.92),S.render(m,_),ae=requestAnimationFrame(V))}V();const I=()=>{try{const ue=w();te.map&&te.map.dispose(),te.map=ue,te.needsUpdate=!0}catch{}},z=S.domElement;function Y(ue){const fe=z.getBoundingClientRect();return{x:ue.clientX-fe.left,y:ue.clientY-fe.top}}function Q(ue){k=!0,z.setPointerCapture(ue.pointerId);const fe=Y(ue);H=fe.x,q=fe.y,K=0,N=0}function pe(ue){if(!k)return;const fe=Y(ue),Te=fe.x-H,Ge=fe.y-q;H=fe.x,q=fe.y;const Z=.0025;ie.rotation.y+=-Te*Z,ie.rotation.x+=-Ge*Z,ie.rotation.x=Math.max(Math.min(ie.rotation.x,Math.PI/2-.1),-Math.PI/2+.1),d.current.x=ie.rotation.x,d.current.y=ie.rotation.y,K=-Te*Z*.6+K*.4,N=-Ge*Z*.6+N*.4}function xe(ue){k=!1;try{z.releasePointerCapture(ue.pointerId)}catch{}}function ye(ue){if(!_)return;ue.preventDefault();const fe=ue.deltaY>0?.2:-.2;_.position.z=Math.max(1.6,Math.min(6,_.position.z+fe))}return z.addEventListener("pointerdown",Q),z.addEventListener("pointermove",pe),z.addEventListener("pointerup",xe),z.addEventListener("pointercancel",xe),z.addEventListener("wheel",ye,{passive:!1}),I(),()=>{ae&&cancelAnimationFrame(ae),window.removeEventListener("resize",X);try{z.removeEventListener("pointerdown",Q),z.removeEventListener("pointermove",pe),z.removeEventListener("pointerup",xe),z.removeEventListener("pointercancel",xe),z.removeEventListener("wheel",ye)}catch{}try{S.dispose()}catch{}S.domElement&&S.domElement.parentElement&&S.domElement.parentElement.removeChild(S.domElement)}},[r,e]),O.jsx("div",{ref:o,className:t,style:{width:"100%",height:"100%",...s}})}function VT({world:r,error:e}){const t=ve.useMemo(()=>r?so(r):null,[r]),s=ve.useMemo(()=>r?r.metadata:null,[r]);return O.jsxs("div",{style:{position:"absolute",inset:0,display:"flex",flexDirection:"column",background:"#000"},children:[O.jsxs("div",{style:{padding:12,display:"flex",justifyContent:"space-between",gap:10,background:"rgba(0,0,0,0.7)"},children:[O.jsx("div",{style:{fontWeight:900,color:"#fff"},children:"World Preview"}),s&&O.jsxs("div",{style:{fontSize:12,opacity:.75,color:"#fff"},children:[s.styleMode," • ",s.gridWidth,"×",s.gridHeight," • seed ",s.seed]})]}),e?O.jsx("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",color:"#f66",padding:20},children:e}):r?O.jsx("div",{style:{flex:1,position:"relative"},children:O.jsx(Xd,{world:r,preview:t,style:{width:"100%",height:"100%"}})}):O.jsx("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,0.6)",fontSize:16},children:"Configure parameters and click Generate"})]})}function WT(){const r=ia(),[e,t]=ve.useState(null),[s,o]=ve.useState(!1),[l,u]=ve.useState(null);ve.useMemo(()=>e?so(e):null,[e]);async function d(m){u(null);try{await ln.createWorld(m);const _=ln.getWorld();t(_)}catch(_){console.error(_),u(_?.message||"Generate failed.")}}async function f(){if(e){o(!0),u(null);try{const m=await wg(e);r(`/create/${m.metadata.id}`)}catch(m){console.error(m),u(m?.message||"Save failed.")}finally{o(!1)}}}const p=[{id:"generate",title:"Generate",tools:[{id:"gen",label:"Generate",disabled:!0},{id:"save",label:s?"Saving…":"Save → Create",disabled:!e||s,onClick:f}]}],g=O.jsx(Cx,{onGenerate:d,onSave:f,saving:s,disabled:!e});return O.jsx(ns,{mode:"generate",onGoHome:()=>r("/"),worldName:e?.metadata?.name||"Generate",isDirty:!0,rightPanel:g,toolGroups:p,children:O.jsx(VT,{world:e,error:l})})}function jT(r,e){const t=r.getContext("2d");if(!t)return;const s=so(e),o=s.width,l=s.height,u=2;r.width=o*u,r.height=l*u;const d=t.createImageData(o,l),f=d.data;for(let M=0;M<l;M++)for(let x=0;x<o;x++){const y=s.minimapColorAt(x,M),w=(M*o+x)*4;f[w+0]=y[0],f[w+1]=y[1],f[w+2]=y[2],f[w+3]=y[3]}const p=document.createElement("canvas");p.width=o,p.height=l;const g=p.getContext("2d");if(!g)return;g.putImageData(d,0,0),t.imageSmoothingEnabled=!1,t.clearRect(0,0,r.width,r.height),t.drawImage(p,0,0,o*u,l*u);const m=Math.max(20,Math.floor(o*u*.25)),_=Math.max(16,Math.floor(l*u*.25)),S=Math.floor((o*u-m)/2),E=Math.floor((l*u-_)/2);t.strokeStyle="rgba(255,255,255,0.95)",t.lineWidth=2,t.strokeRect(S+.5,E+.5,m,_),t.strokeStyle="rgba(0,0,0,0.55)",t.lineWidth=1,t.strokeRect(S+1.5,E+1.5,m-2,_-2)}function XT({world:r}){const e=ve.useRef(null);return ve.useEffect(()=>{if(e.current)try{jT(e.current,r)}catch(t){console.error("Minimap draw failed:",t)}},[r]),O.jsx("div",{style:{position:"absolute",inset:0},children:O.jsx("canvas",{ref:e,style:{width:"100%",height:"100%",display:"block",background:"#111"}})})}class YT{constructor(e,t,s){this.world=e,this.onStateChange=t,this.onWorldChange=s,this.state={enabled:!1,tool:"RAISE",brushParams:{shape:"CIRCLE",falloff:"SOFT",radius:10,strength:.5},isDrawing:!1}}state;actionHistory=[];pendingStrokeSamples=[];recomputeThrottleTimer=null;lastApplyTime=0;setTool(e){this.state.tool=e,this.state.enabled=!0,this.notifyStateChange()}disable(){this.state.enabled=!1,this.state.isDrawing=!1,this.notifyStateChange()}setBrushParams(e){this.state.brushParams={...this.state.brushParams,...e},this.notifyStateChange()}getState(){return{...this.state}}setWorld(e){this.world=e}startStroke(e,t){!this.state.enabled||!this.world||(this.state.isDrawing=!0,this.actionHistory=[],this.applyBrushAtCell(e,t))}continueStroke(e,t){!this.state.isDrawing||!this.state.enabled||!this.world||this.applyBrushAtCell(e,t)}endStroke(){this.recomputeThrottleTimer&&(clearTimeout(this.recomputeThrottleTimer),this.recomputeThrottleTimer=null),this.flushPendingStrokes(),this.state.isDrawing=!1,this.notifyStateChange()}applyBrushAtCell(e,t){if(!this.world)return;if(this.pendingStrokeSamples.push({row:e,col:t}),performance.now()-this.lastApplyTime<100&&this.state.isDrawing){this.recomputeThrottleTimer||(this.recomputeThrottleTimer=window.setTimeout(()=>{this.flushPendingStrokes()},100));return}this.flushPendingStrokes()}flushPendingStrokes(){if(!this.world||this.pendingStrokeSamples.length===0){this.pendingStrokeSamples=[],this.recomputeThrottleTimer=null;return}for(const e of this.pendingStrokeSamples){const t={type:"TERRAIN_STROKE",tool:this.state.tool,center:{row:e.row,col:e.col},radius:this.state.brushParams.radius,strength:this.state.brushParams.strength*.3};Cg(this.world,t),this.actionHistory.push(t)}On(this.world,["TERRAIN_EDIT"]),this.lastApplyTime=performance.now(),this.onWorldChange(this.world),this.pendingStrokeSamples=[],this.recomputeThrottleTimer=null}notifyStateChange(){this.onStateChange(this.getState())}}function qT(r,e){const t=r.getContext("2d");if(!t)return;const s=so(e),o=s.width,l=s.height,d=Math.max(1,Math.floor(1100/o));r.width=o*d,r.height=l*d;const f=t.createImageData(o,l),p=f.data;for(let _=0;_<l;_++)for(let S=0;S<o;S++){const E=s.minimapColorAt(S,_),M=(_*o+S)*4;p[M+0]=E[0],p[M+1]=E[1],p[M+2]=E[2],p[M+3]=E[3]}const g=document.createElement("canvas");g.width=o,g.height=l;const m=g.getContext("2d");m&&(m.putImageData(f,0,0),t.imageSmoothingEnabled=!1,t.clearRect(0,0,r.width,r.height),t.drawImage(g,0,0,o*d,l*d))}function rg(r,e,t,s){if(!t)return null;const o=t.getBoundingClientRect(),l=r-o.left,u=e-o.top,d=l/o.width,f=u/o.height,p=Math.floor(d*s.gridWidth),g=Math.floor(f*s.gridHeight);return g<0||g>=s.gridHeight||p<0||p>=s.gridWidth?null:{row:g,col:p}}function $T({world:r,activeTerrainTool:e,onWorldChange:t}){const s=ve.useRef(null),o=ve.useRef(null),[l,u]=ve.useState(null);ve.useEffect(()=>{o.current=new YT(r,u,t),e&&o.current.setTool(e)},[r,t]),ve.useEffect(()=>{e&&o.current?o.current.setTool(e):!e&&o.current&&o.current.disable()},[e]),ve.useEffect(()=>{const m=s.current;if(m)try{qT(m,r)}catch(_){console.error("Create viewport draw failed:",_)}},[r]);const d=m=>{const _=s.current;if(!_||!o.current)return;const S=rg(m.clientX,m.clientY,_,r);S&&o.current.startStroke(S.row,S.col)},f=m=>{const _=s.current;if(!_||!o.current)return;const S=rg(m.clientX,m.clientY,_,r);S&&o.current.continueStroke(S.row,S.col)},p=()=>{o.current&&o.current.endStroke()},g=()=>{o.current&&o.current.endStroke()};return O.jsxs("div",{style:{position:"absolute",inset:0,overflow:"auto"},children:[O.jsxs("div",{style:{padding:12,fontWeight:900},children:["Create View",l?.enabled&&O.jsxs("span",{style:{marginLeft:12,fontSize:12,opacity:.7},children:["Tool: ",l.tool," | Radius: ",l.brushParams.radius]})]}),O.jsxs("div",{style:{padding:12},children:[O.jsx("canvas",{ref:s,onMouseDown:d,onMouseMove:f,onMouseUp:p,onMouseLeave:g,style:{width:"100%",maxWidth:1200,borderRadius:12,border:"1px solid rgba(0,0,0,0.15)",background:"#111",display:"block",cursor:l?.enabled?"crosshair":"default"}}),O.jsx("div",{style:{fontSize:11,opacity:.65,marginTop:8},children:l?.enabled?`Terrain brush active: ${l.tool.toUpperCase()} - click and drag to paint.`:"Select a terrain tool above to start editing."})]})]})}function yd(r,e,t,s=256,o=128){const l=r-t.left,u=e-t.top,d=l/t.width*360-180;return{lat:90-u/t.height*180,lon:d}}function Sd(r,e,t){const s=t.left+(e+180)/360*t.width,o=t.top+(90-r)/180*t.height;return{x:s,y:o}}function sg(r,e,t){let s=-1,o=t;for(let l=0;l<e.length;l++){const u=Math.sqrt(Math.pow(r.lat-e[l].lat,2)+Math.pow(r.lon-e[l].lon,2));u<o&&(o=u,s=l)}return s>=0?s:null}function og(r,e,t,s,o){const l=t.map(u=>({lat:(u.lat+90)/180,lon:(u.lon+180)/360}));return{id:r,name:`${e} Sticker`,type:e,mode:s,polygon:l,falloff:0,payload:o}}function ag(r,e){r.stickers||(r.stickers=[]),r.stickers.push(e);const{gridWidth:t,gridHeight:s}=r;for(let o=0;o<s;o++)for(let l=0;l<t;l++){const u=o/s,d=l/t;if(KT(u,d,e.polygon)){const f=o*t+l,p=r.cells[f];if(!p)continue;e.type==="BIOME"&&e.payload.biomeId?p.editBiomeId=e.payload.biomeId:e.type==="HEIGHT"&&e.payload.heightDelta?p.editHeightDelta=Math.max(-1,Math.min(1,p.editHeightDelta+e.payload.heightDelta)):e.type==="CULTURE"&&e.payload.cultureId&&(p.cultureId=e.payload.cultureId)}}}function KT(r,e,t){if(t.length<3)return!1;let s=!1;for(let o=0,l=t.length-1;o<t.length;l=o++){const u=t[o].lon,d=t[o].lat,f=t[l].lon,p=t[l].lat;d>r!=p>r&&e<(f-u)*(r-d)/(p-d)+u&&(s=!s)}return s}function ZT(r,e,t){const s=[];let o=!0;return r===1?e>.3&&(s.push("Tundra is unusually warm at this temperature."),o=!1):r===5?e<.55&&(s.push("Jungle is unusually cold at this temperature."),o=!1):r===4&&t>.3&&(s.push("Deserts are typically dry. This location has high rainfall."),o=!1),r===3?t<.25&&(s.push("Forests require substantial moisture. This area is drier than typical."),o=!1):r===4&&t>.2&&(s.push("Deserts are arid. This rainfall level is too high for a desert."),o=!1),e<.15&&r===5&&(s.push("Jungles cannot exist in polar regions."),o=!1),e>.85&&r===1&&(s.push("Tundra cannot exist in tropical regions."),o=!1),s.length===0&&o&&s.push("✓ This placement is realistic for the local climate."),{isValid:o,warnings:s}}function QT({biomeType:r,temperature:e,rainfall:t,warnings:s,onApply:o,onCancel:l}){const u=s.some(d=>!d.startsWith("✓"));return O.jsx("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1e4},onClick:l,children:O.jsxs("div",{style:{background:"rgba(20, 20, 30, 0.95)",border:"1px solid rgba(100, 180, 255, 0.3)",borderRadius:12,padding:24,maxWidth:400,color:"rgba(255,255,255,0.88)",backdropFilter:"blur(8px)"},onClick:d=>d.stopPropagation(),children:[O.jsxs("h3",{style:{margin:"0 0 12px 0",fontSize:16,color:"rgba(100, 200, 255, 0.9)"},children:["Place ",r," Biome?"]}),O.jsxs("div",{style:{fontSize:12,opacity:.75,marginBottom:16},children:[O.jsxs("div",{children:["Temperature: ",(e*100).toFixed(0),"%"]}),O.jsxs("div",{children:["Rainfall: ",(t*100).toFixed(0),"%"]})]}),O.jsx("div",{style:{background:"rgba(0,0,0,0.3)",border:`1px solid ${u?"rgba(255, 100, 100, 0.3)":"rgba(100, 200, 100, 0.3)"}`,borderRadius:8,padding:12,marginBottom:16,fontSize:12,lineHeight:1.6},children:s.map((d,f)=>O.jsx("div",{style:{color:d.startsWith("✓")?"rgba(100, 200, 100, 0.8)":"rgba(255, 150, 100, 0.9)"},children:d},f))}),O.jsxs("div",{style:{display:"flex",gap:10,justifyContent:"flex-end"},children:[O.jsx("button",{onClick:l,style:{padding:"8px 12px",borderRadius:6,border:"1px solid rgba(255,255,255,0.2)",background:"rgba(255,255,255,0.05)",color:"rgba(255,255,255,0.75)",cursor:"pointer",fontSize:12},children:"Cancel"}),O.jsx("button",{onClick:o,style:{padding:"8px 12px",borderRadius:6,border:"1px solid rgba(100, 180, 255, 0.4)",background:u?"rgba(200, 100, 100, 0.2)":"rgba(100, 180, 255, 0.15)",color:"rgba(100, 200, 255, 0.9)",cursor:"pointer",fontSize:12},children:u?"Place Anyway (Override)":"Place"})]})]})})}function JT({world:r,activeStickerTool:e,onStickerCreated:t,onCancel:s}){const o=ve.useRef(null),l=ve.useRef(null),[u,d]=ve.useState([]),[f,p]=ve.useState(null),[g,m]=ve.useState(null),[_,S]=ve.useState(!1);ve.useEffect(()=>{const w=o.current,R=l.current;if(!w||!R)return;const b=w.getContext("2d");if(!b)return;const G=R.getBoundingClientRect();if(w.width=G.width,w.height=G.height,b.fillStyle="rgba(0,0,0,0.1)",b.fillRect(0,0,w.width,w.height),u.length>0){b.strokeStyle="rgba(100, 200, 255, 0.8)",b.fillStyle="rgba(100, 200, 255, 0.15)",b.lineWidth=3,b.beginPath();const B=u[0],U=Sd(B.lat,B.lon,G);b.moveTo(U.x-G.left,U.y-G.top);for(let he=1;he<u.length;he++){const C=u[he],D=Sd(C.lat,C.lon,G);b.lineTo(D.x-G.left,D.y-G.top)}u.length>2&&b.lineTo(U.x-G.left,U.y-G.top),b.fill(),b.stroke();for(let he=0;he<u.length;he++){const C=u[he],D=Sd(C.lat,C.lon,G);b.fillStyle=he===0?"rgba(100, 255, 100, 0.95)":"rgba(255, 100, 100, 0.95)",b.strokeStyle="rgba(255, 255, 255, 0.9)",b.lineWidth=2,b.beginPath(),b.arc(D.x-G.left,D.y-G.top,7,0,Math.PI*2),b.fill(),b.stroke()}}},[u]);const E=w=>{if(!r||!e||!l.current)return;const R=l.current.getBoundingClientRect(),b=yd(w.clientX,w.clientY,R,r.gridWidth,r.gridHeight);if(u.length>=3&&sg(b,u,8)===0){const B=`sticker_${Date.now()}`;let U={};if(e==="BIOME"){U.biomeId=5;const C=u.reduce((k,H)=>k+H.lat,0)/u.length,D=u.reduce((k,H)=>k+H.lon,0)/u.length,te=Math.floor((90-C)/180*(r?.gridHeight||128)),ie=Math.floor((D+180)/360*(r?.gridWidth||256)),ae=te*(r?.gridWidth||256)+ie;if(r&&r.cells[ae]){const k=r.cells[ae],H=ZT(U.biomeId,k.temperature,k.rainfall);m({stickerId:B,payload:U,temperature:k.temperature,rainfall:k.rainfall,validation:H}),S(!0);return}}else e==="CULTURE"?U.cultureId="culture_0":e==="HEIGHT"&&(U.heightDelta=.3);const he=og(B,e,u,"OVERRIDE",U);r&&(ag(r,he),t?.(r)),d([]);return}d([...u,b])},M=w=>{if(f===null||!l.current)return;const R=l.current.getBoundingClientRect(),b=yd(w.clientX,w.clientY,R,r?.gridWidth||256,r?.gridHeight||128),G=[...u];G[f]=b,d(G)},x=w=>{if(!l.current)return;const R=l.current.getBoundingClientRect(),b=yd(w.clientX,w.clientY,R,r?.gridWidth||256,r?.gridHeight||128),G=sg(b,u,8);G!==null&&p(G)},y=()=>{p(null)};return e?O.jsxs("div",{ref:l,style:{position:"absolute",inset:0,zIndex:1e3,cursor:"crosshair"},children:[O.jsx("canvas",{ref:o,onClick:E,onMouseMove:M,onMouseDown:x,onMouseUp:y,onMouseLeave:y,style:{position:"absolute",inset:0,display:"block"}}),O.jsxs("div",{style:{position:"absolute",top:16,left:16,background:"rgba(0,0,0,0.85)",color:"rgba(255,255,255,0.95)",padding:"14px 16px",borderRadius:8,fontSize:12,zIndex:1001,maxWidth:320,border:"1px solid rgba(100,200,255,0.3)"},children:[O.jsxs("div",{style:{fontWeight:700,marginBottom:8,color:"rgba(100,200,255,0.95)"},children:[e==="BIOME"&&"🌍 Biome Sticker",e==="CULTURE"&&"👥 Culture Zone",e==="HEIGHT"&&"⛏️ Terrain Sticker"]}),O.jsx("div",{style:{opacity:.85,marginBottom:10,lineHeight:1.5},children:"Click to place vertices. Close polygon by clicking first vertex (green dot)."}),O.jsxs("div",{style:{fontSize:11,opacity:.7,marginBottom:10},children:["Vertices: ",u.length]}),O.jsxs("div",{style:{display:"flex",gap:8},children:[O.jsx("button",{onClick:()=>{d([]),s?.()},style:{padding:"6px 12px",borderRadius:6,border:"1px solid rgba(255,100,100,0.3)",background:"rgba(255,100,100,0.1)",color:"rgba(255,150,150,0.95)",cursor:"pointer",fontSize:11,fontWeight:600},children:"Cancel"}),u.length>0&&O.jsx("button",{onClick:()=>{d(u.slice(0,-1))},style:{padding:"6px 12px",borderRadius:6,border:"1px solid rgba(200,200,100,0.3)",background:"rgba(200,200,100,0.1)",color:"rgba(255,255,150,0.95)",cursor:"pointer",fontSize:11,fontWeight:600},children:"Undo Vertex"})]})]}),_&&g&&O.jsx(QT,{biomeType:e==="BIOME"?"Biome":e||"",temperature:g.temperature,rainfall:g.rainfall,warnings:g.validation.warnings,onApply:()=>{const w=og(g.stickerId,e,u,"OVERRIDE",g.payload);r&&(ag(r,w),d([]),m(null),S(!1),t?.(r))},onCancel:()=>{m(null),S(!1)}})]}):null}function ew(){const r=ia(),{worldId:e}=Sg(),[t,s]=ve.useState(!0),[o,l]=ve.useState(null),[u,d]=ve.useState(null),[f,p]=ve.useState(!1),[g,m]=ve.useState("GLOBE"),[_,S]=ve.useState(null),[E,M]=ve.useState(null),[x,y]=ve.useState(null),[w,R]=ve.useState(ln.getWorld());ve.useEffect(()=>ln.subscribe(k=>R(k)),[]),ve.useEffect(()=>{let ae=!0;return(async()=>{if(!e){ae&&(l("Missing worldId in route."),s(!1));return}s(!0),l(null);try{await ln.loadWorld(e)}catch(k){console.error(k),ae&&l(k?.message||"Failed to load world.")}finally{ae&&s(!1)}})(),()=>{ae=!1}},[e]);const b=ve.useMemo(()=>w?so(w):null,[w]);async function G(){d(null),p(!0);try{await ln.save()}catch(ae){console.error(ae),d(ae?.message||"Save failed.")}finally{p(!1)}}const B=ae=>{ln.applyLocalEdit(ae)},U=()=>{if(w)try{const ae=Math.floor(Math.random()*4)+5,k=Ag(w,ae);if(!k||k.length===0){console.error("[Generate Countries] No countries generated - check world has land cells"),alert("Failed to generate countries. Ensure the world has sufficient land mass.");return}const H={...w,countries:k};ln.applyLocalEdit(H),console.log(`[Generate Countries] Successfully generated ${k.length} countries`)}catch(ae){console.error("[Generate Countries] Error:",ae),alert(`Failed to generate countries: ${ae}`)}},he=()=>{if(!w)return;const ae=w.cells.filter(N=>!N.isWater);if(ae.length===0)return;const k=ae[Math.floor(Math.random()*ae.length)];Math.floor(k.index/w.gridWidth),k.index%w.gridWidth;let H="TOWN";ae.find(N=>{const X=N.index,V=Math.floor(X/w.gridWidth),I=X%w.gridWidth;for(let z=-1;z<=1;z++)for(let Y=-1;Y<=1;Y++){const Q=V+z,pe=((I+Y)%w.gridWidth+w.gridWidth)%w.gridWidth,xe=Q*w.gridWidth+pe;if(w.cells[xe]?.isWater)return!0}return!1})&&(H="PORT");const K={id:`city_${Date.now()}`,name:"City",cellIndex:k.index,population:1e3,type:H,populationTier:2,isCapital:!1,economicRoles:["TRADE"],tags:[],description:"",countryId:w.countries?.[0]?.id,cultureId:w.cultures?.[0]?.id};w.cities=w.cities||[],w.cities.push(K),On(w,["TERRAIN_EDIT"]),B(w)},C=[{id:"terrain",title:"Terrain",tools:[{id:"raise",label:"Raise",disabled:!w,active:_==="RAISE",onClick:()=>S(_==="RAISE"?null:"RAISE")},{id:"lower",label:"Lower",disabled:!w,active:_==="LOWER",onClick:()=>S(_==="LOWER"?null:"LOWER")},{id:"smooth",label:"Smooth",disabled:!w,active:_==="SMOOTH",onClick:()=>S(_==="SMOOTH"?null:"SMOOTH")},{id:"flatten",label:"Flatten",disabled:!w,active:_==="FLATTEN",onClick:()=>S(_==="FLATTEN"?null:"FLATTEN")}]},{id:"biomes",title:"Biomes",tools:[{id:"paint_biome",label:"Paint Biome",disabled:!w,active:E==="BIOME",onClick:()=>M(E==="BIOME"?null:"BIOME")},{id:"paint_height",label:"Raise/Lower",disabled:!w,active:E==="HEIGHT",onClick:()=>M(E==="HEIGHT"?null:"HEIGHT")}]},{id:"water",title:"Water",tools:[{id:"river_add",label:"Add River",disabled:!w,active:x==="ADD_RIVER",onClick:()=>y(x==="ADD_RIVER"?null:"ADD_RIVER")},{id:"river_edit",label:"Edit River",disabled:!w,active:x==="EDIT_RIVER",onClick:()=>y(x==="EDIT_RIVER"?null:"EDIT_RIVER")},{id:"lake_add",label:"Set Lake Level",disabled:!w,active:x==="ADD_LAKE",onClick:()=>y(x==="ADD_LAKE"?null:"ADD_LAKE")}]},{id:"volcano",title:"Volcano",tools:[{id:"add_volcano",label:"Add Volcano",disabled:!0}]},{id:"countries",title:"Countries & Borders",tools:[{id:"gen_countries",label:"Generate Countries",disabled:!w,onClick:()=>U()},{id:"edit_border",label:"Edit Border",disabled:!0}]},{id:"culture",title:"Culture",tools:[{id:"add_culture",label:"Add Culture Zone",disabled:!w,active:E==="CULTURE",onClick:()=>M(E==="CULTURE"?null:"CULTURE")}]},{id:"cities",title:"Cities",tools:[{id:"add_city",label:"Add City",disabled:!w,onClick:()=>he()}]}],D=O.jsxs("div",{style:{padding:14,color:"rgba(255,255,255,0.88)"},children:[O.jsx("h3",{style:{margin:"6px 0 10px 0"},children:"Create"}),O.jsxs("div",{style:{display:"flex",gap:10,marginBottom:12},children:[O.jsx("button",{onClick:G,disabled:!w||t||f,style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:!w||t||f?"not-allowed":"pointer",opacity:!w||t||f?.5:1},children:f?"Saving…":"Save"}),O.jsx("button",{onClick:()=>r(`/sim/${e}`),disabled:!e,style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:e?"pointer":"not-allowed",opacity:e?1:.5},children:"Go to Sim"})]}),u&&O.jsxs("div",{style:{marginBottom:12,padding:10,borderRadius:10,border:"1px solid rgba(255,90,90,0.35)",background:"rgba(255,90,90,0.08)",color:"rgba(255,255,255,0.92)",fontSize:12,lineHeight:1.4},children:[O.jsx("b",{children:"Save failed:"})," ",u]}),O.jsx("div",{style:{fontSize:12,opacity:.8,lineHeight:1.4},children:"Tool implementations come after Phase 1 stability. For now these are blueprint-accurate categories."})]});function te(ae,k){const H=ae?.width,q=ae?.height,K=ae?.rgba;return!H||!q?O.jsx("div",{style:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",padding:12,color:"rgba(255,255,255,0.85)",fontSize:13},children:"Generating preview…"}):K&&K instanceof Uint8ClampedArray?O.jsx("canvas",{width:H,height:q,ref:N=>{if(!N)return;const X=N.getContext("2d");if(X)try{const V=new ImageData(K,H,q);X.putImageData(V,0,0)}catch(V){console.error("Preview render failed:",V)}},style:{width:"100%",height:"100%",imageRendering:"auto"}}):O.jsx("div",{style:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",padding:12,color:"rgba(255,255,255,0.85)",fontSize:13},children:"No preview available"})}if(t)return O.jsx(ns,{mode:"create",onGoHome:()=>r("/"),worldName:w?.metadata?.name||"Loading…",isDirty:ln.isDirty(),onModeToggle:()=>r(`/sim/${e}`),viewMode:g,onViewModeChange:m,rightPanel:D,toolGroups:C,children:O.jsx("div",{style:{padding:20,color:"rgba(255,255,255,0.85)"},children:"Loading world…"})});if(o)return O.jsx(ns,{mode:"create",onGoHome:()=>r("/"),worldName:"Load Error",isDirty:!1,viewMode:g,onViewModeChange:m,rightPanel:O.jsxs("div",{style:{padding:14,color:"rgba(255,255,255,0.9)"},children:[O.jsx("h3",{style:{margin:"6px 0 10px 0"},children:"Could not load world"}),O.jsx("div",{style:{opacity:.85,marginBottom:12},children:o}),O.jsxs("div",{style:{display:"flex",gap:10,flexWrap:"wrap"},children:[O.jsx("button",{onClick:()=>r("/"),style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Back to Home"}),O.jsx("button",{onClick:()=>r("/generate"),style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Go to Generate"}),O.jsx("button",{onClick:()=>window.location.reload(),style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Reload"})]})]}),children:O.jsx("div",{style:{padding:20}})});const ie=g==="GLOBE";return O.jsx(ns,{mode:"create",onGoHome:()=>r("/"),worldName:w?.metadata?.name||"Create",isDirty:ln.isDirty(),onModeToggle:()=>r(`/sim/${e}`),viewMode:g,onViewModeChange:m,rightPanel:D,toolGroups:C,children:O.jsxs("div",{style:{width:"100%",height:"100%",position:"relative"},children:[g==="GLOBE"&&w?O.jsx("div",{style:{width:"100%",height:"100%"},children:O.jsx(Xd,{world:w,preview:b})}):w?O.jsx($T,{world:w,activeTerrainTool:_,onWorldChange:B}):te(b),E&&O.jsx(JT,{world:w,activeStickerTool:E,onStickerCreated:()=>{M(null),B(w)},onCancel:()=>M(null)}),w&&ie&&O.jsx("div",{style:{position:"absolute",left:16,bottom:16,width:220,height:140,borderRadius:12,overflow:"hidden",border:"1px solid rgba(255,255,255,0.18)",background:"rgba(0,0,0,0.35)",boxShadow:"0 10px 25px rgba(0,0,0,0.35)"},title:"Minimap (Create + Globe only)",children:O.jsx(XT,{world:w})})]})})}function tw(r,e){const t=[];for(const s of r.cities)Math.random()<.1&&t.push({id:`city_growth_${s.id}`,type:"CITY_GROWTH",year:e,title:`${s.name} is growing`,description:`Population in ${s.name} has increased significantly.`,affectedCityIds:[s.id],options:[{label:"Accept growth",description:"Population increases by 20%",effect:o=>{const l=o.cities.find(u=>u.id===s.id);l&&(l.population*=1.2)}}],severity:"MINOR",automaticallyResolve:!0});if(r.countries.length>1&&Math.random()<.05){const s=r.countries.sort(()=>Math.random()-.5);s.length>=2&&t.push({id:`war_${e}`,type:"WAR_DECLARATION",year:e,title:`War between ${s[0].name} and ${s[1].name}`,description:"Border tensions have escalated into open conflict.",affectedCountryIds:[s[0].id,s[1].id],options:[{label:"Let conflict resolve naturally",description:"Outcome depends on military strength",effect:o=>{}}],severity:"MAJOR"})}if(r.cultures.length>0&&Math.random()<.03){const s=r.cultures[Math.floor(Math.random()*r.cultures.length)];t.push({id:`culture_split_${s.id}`,type:"CULTURE_SPLIT",year:e,title:`${s.name} culture is fragmenting`,description:`Isolated regions of ${s.name} have begun to diverge culturally.`,affectedCultureIds:[s.id],options:[{label:"Accept split",description:"Creates a new sub-culture",effect:o=>{const l={...s,id:`${s.id}_split`,name:`${s.name} (Reformed)`};o.cultures.push(l)}}],severity:"MODERATE"})}if(Math.random()<.08){const s=Math.random()<.5?"DROUGHT":"PLAGUE",o=s==="DROUGHT"?"Severe drought in the south":"Plague outbreak in the cities";t.push({id:`disaster_${e}`,type:s,year:e,title:o,description:s==="DROUGHT"?"Agricultural output has dropped significantly due to lack of rain.":"A deadly plague is spreading through major population centers.",affectedCityIds:r.cities.slice(0,Math.floor(r.cities.length/3)).map(l=>l.id),options:[{label:"Accept losses",description:"Population affected by disaster",effect:l=>{}}],severity:"MAJOR"})}return t}function lg(r,e,t){return e<0||e>=r.options.length?!1:(r.options[e].effect(t),!0)}function nw(r,e=0,t=`Branch ${new Date().toISOString()}`){return{id:`branch_${Date.now()}`,name:t,baseWorldId:r.metadata.id,worldSnapshot:JSON.parse(JSON.stringify(r)),startYear:e,currentYear:e,eventHistory:[],createdAt:new Date().toISOString(),isPromoted:!1}}const iw=({events:r,onResolveEvent:e,onAutoResolveAll:t})=>{const[s,o]=ve.useState(r.length>0?r[0].id:null),l=r.find(u=>u.id===s);return O.jsxs("div",{style:{position:"fixed",right:20,top:180,width:320,maxHeight:500,backgroundColor:"#222",border:"2px solid #666",borderRadius:8,boxShadow:"0 4px 12px rgba(0,0,0,0.5)",display:"flex",flexDirection:"column",fontFamily:"monospace",fontSize:"12px",zIndex:1e3},children:[O.jsxs("div",{style:{padding:"8px 12px",backgroundColor:"#111",borderBottom:"1px solid #666",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[O.jsxs("span",{style:{color:"#fff",fontWeight:"bold"},children:["Inbox (",r.length,")"]}),r.length>0&&O.jsx("button",{onClick:t,style:{padding:"2px 6px",backgroundColor:"#444",color:"#fff",border:"1px solid #666",borderRadius:3,cursor:"pointer",fontSize:"10px"},children:"Auto-Resolve All"})]}),O.jsx("div",{style:{overflowY:"auto",flex:1,maxHeight:200},children:r.length===0?O.jsx("div",{style:{padding:"12px",color:"#888",textAlign:"center"},children:"No pending decisions"}):r.map(u=>O.jsxs("div",{onClick:()=>o(u.id),style:{padding:"8px 12px",borderBottom:"1px solid #444",cursor:"pointer",backgroundColor:u.id===s?"#333":"transparent",transition:"background-color 0.2s"},onMouseEnter:d=>{u.id!==s&&(d.currentTarget.style.backgroundColor="#2a2a2a")},onMouseLeave:d=>{u.id!==s&&(d.currentTarget.style.backgroundColor="transparent")},children:[O.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4},children:[O.jsx("span",{style:{color:u.severity==="MAJOR"?"#ff6b6b":u.severity==="MODERATE"?"#ffd93d":"#88ff88",fontWeight:"bold",flex:1},children:u.title}),O.jsxs("span",{style:{color:"#888",fontSize:"10px"},children:["Y",u.year]})]}),O.jsx("div",{style:{color:"#aaa",fontSize:"11px"},children:u.type})]},u.id))}),l&&O.jsxs("div",{style:{borderTop:"1px solid #666",padding:"12px"},children:[O.jsxs("div",{style:{marginBottom:8,color:"#fff"},children:[O.jsx("div",{style:{fontWeight:"bold",color:l.severity==="MAJOR"?"#ff6b6b":l.severity==="MODERATE"?"#ffd93d":"#88ff88",marginBottom:4},children:l.title}),O.jsx("div",{style:{color:"#aaa",fontSize:"11px",marginBottom:8},children:l.description})]}),O.jsx("div",{style:{display:"flex",flexDirection:"column",gap:6},children:l.options.map((u,d)=>O.jsxs("button",{onClick:()=>{e(l.id,d),o(null)},style:{padding:"6px 8px",backgroundColor:"#444",color:"#fff",border:"1px solid #666",borderRadius:4,cursor:"pointer",fontSize:"11px",textAlign:"left",transition:"all 0.2s"},onMouseEnter:f=>{f.currentTarget.style.backgroundColor="#555"},onMouseLeave:f=>{f.currentTarget.style.backgroundColor="#444"},children:[O.jsx("div",{style:{fontWeight:"bold"},children:u.label}),O.jsx("div",{style:{color:"#aaa",fontSize:"10px"},children:u.description})]},d))})]})]})},rw=({history:r})=>O.jsxs("div",{style:{position:"fixed",left:20,top:180,width:280,maxHeight:400,backgroundColor:"#222",border:"2px solid #666",borderRadius:8,boxShadow:"0 4px 12px rgba(0,0,0,0.5)",fontFamily:"monospace",fontSize:"11px",zIndex:1e3,overflowY:"auto"},children:[O.jsxs("div",{style:{padding:"8px 12px",backgroundColor:"#111",borderBottom:"1px solid #666",fontWeight:"bold",color:"#fff",position:"sticky",top:0},children:["Event History (",r.length,")"]}),O.jsx("div",{style:{padding:8},children:r.length===0?O.jsx("div",{style:{color:"#888",textAlign:"center",padding:12},children:"No events yet"}):r.slice().reverse().map((e,t)=>O.jsxs("div",{style:{marginBottom:8,padding:8,backgroundColor:"rgba(255,255,255,0.03)",borderRadius:6,borderLeft:e.event.severity==="MAJOR"?"3px solid #ff6b6b":e.event.severity==="MODERATE"?"3px solid #ffd93d":"3px solid #88ff88"},children:[O.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:4},children:[O.jsx("span",{style:{fontWeight:"bold",color:"#fff"},children:e.event.title}),O.jsxs("span",{style:{color:"#888",fontSize:10},children:["Y",e.resolvedYear]})]}),O.jsx("div",{style:{color:"#aaa",fontSize:10,marginBottom:4},children:e.event.description}),O.jsxs("div",{style:{color:"#88ff88",fontSize:10,fontStyle:"italic"},children:["→ ",e.event.options[e.chosenOption]?.label]})]},t))})]});function sw(){const r=ia(),{worldId:e}=Sg(),[t,s]=ve.useState(!0),[o,l]=ve.useState(null),[u,d]=ve.useState(ln.getWorld());ve.useEffect(()=>ln.subscribe(D=>d(D)),[]);const[f,p]=ve.useState(0),[g,m]=ve.useState([]),[_,S]=ve.useState([]),[E,M]=ve.useState(!1),[x,y]=ve.useState([]),[w,R]=ve.useState(!1);ve.useEffect(()=>{let C=!0;return(async()=>{if(!e){C&&(l("Missing worldId in route."),s(!1));return}s(!0),l(null);try{await ln.loadWorld(e)}catch(D){console.error(D),C&&l(D?.message||"Failed to load world.")}finally{C&&s(!1)}})(),()=>{C=!1}},[e]);const b=()=>{if(!u)return;const C=f+1;p(C);const D=tw(u,C);m(te=>[...te,...D])},G=(C,D)=>{const te=g.find(ie=>ie.id===C);!te||!u||(lg(te,D,u),ln.applyLocalEdit(u),m(ie=>ie.filter(ae=>ae.id!==C)),y(ie=>[...ie,{event:te,chosenOption:D,resolvedYear:f}]))},B=()=>{if(u){for(const C of g)C.automaticallyResolve&&C.options.length>0&&lg(C,0,u);ln.applyLocalEdit(u),m(C=>C.filter(D=>!D.automaticallyResolve||D.options.length===0))}},U=C=>{if(!u)return;const D=nw(u,f,C);S(te=>[...te,D]),M(!1)},he=O.jsxs("div",{style:{padding:14,color:"rgba(255,255,255,0.88)"},children:[O.jsxs("h3",{style:{margin:"6px 0 10px 0"},children:["Sim Year ",f]}),O.jsxs("div",{style:{display:"flex",gap:10,marginBottom:12},children:[O.jsx("button",{onClick:b,disabled:!u||t,style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:!u||t?"not-allowed":"pointer",opacity:!u||t?.5:1},children:"Tick"}),O.jsx("button",{onClick:()=>r(`/create/${e}`),disabled:!e,style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:e?"pointer":"not-allowed",opacity:e?1:.5},children:"Back to Create"})]}),O.jsxs("div",{style:{marginBottom:12,borderTop:"1px solid rgba(255,255,255,0.1)",paddingTop:10},children:[O.jsxs("button",{onClick:()=>R(!w),style:{padding:"8px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(100,150,255,0.15)",color:"rgba(150,200,255,0.9)",cursor:"pointer",fontSize:12,width:"100%",marginBottom:8},children:[w?"Hide":"Show"," History (",x.length,")"]}),O.jsxs("button",{onClick:()=>M(!E),style:{padding:"8px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(100,150,255,0.15)",color:"rgba(150,200,255,0.9)",cursor:"pointer",fontSize:12,width:"100%",marginBottom:8},children:["Branches (",_.length,")"]}),E&&O.jsxs("div",{style:{fontSize:11,backgroundColor:"rgba(0,0,0,0.3)",padding:8,borderRadius:6,marginBottom:8},children:[_.map(C=>O.jsxs("div",{style:{padding:4,marginBottom:4,backgroundColor:"rgba(255,255,255,0.05)",borderRadius:4,borderLeft:C.isPromoted?"2px solid #88ff88":"2px solid #888"},children:[O.jsx("div",{style:{fontWeight:"bold"},children:C.name}),O.jsxs("div",{style:{fontSize:10,opacity:.7},children:["Y",C.currentYear]})]},C.id)),O.jsx("input",{type:"text",placeholder:"Branch name…",onKeyPress:C=>{C.key==="Enter"&&C.currentTarget.value&&(U(C.currentTarget.value),C.currentTarget.value="")},style:{width:"100%",padding:"4px 6px",borderRadius:4,border:"1px solid rgba(255,255,255,0.1)",backgroundColor:"rgba(0,0,0,0.3)",color:"rgba(255,255,255,0.9)",fontSize:11}})]})]}),O.jsx("div",{style:{fontSize:12,opacity:.8,lineHeight:1.4},children:"Culture, Trade, and Route overlays coming soon."})]});return t?O.jsx(ns,{mode:"sim",onGoHome:()=>r("/"),worldName:u?.metadata?.name||"Loading…",isDirty:ln.isDirty(),onModeToggle:()=>r(`/create/${e}`),rightPanel:he,leftTools:[{id:"overview",label:"Overview",disabled:!0},{id:"culture",label:"Culture",disabled:!0},{id:"trade",label:"Trade",disabled:!0},{id:"routes",label:"Routes",disabled:!0}],children:O.jsx("div",{style:{padding:20,color:"rgba(255,255,255,0.85)"},children:"Loading world…"})}):o?O.jsx(ns,{mode:"sim",onGoHome:()=>r("/"),worldName:"Load Error",isDirty:!1,rightPanel:O.jsxs("div",{style:{padding:14,color:"rgba(255,255,255,0.9)"},children:[O.jsx("h3",{style:{margin:"6px 0 10px 0"},children:"Could not load world"}),O.jsx("div",{style:{opacity:.85,marginBottom:12},children:o}),O.jsxs("div",{style:{display:"flex",gap:10},children:[O.jsx("button",{onClick:()=>r("/"),style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Back to Home"}),O.jsx("button",{onClick:()=>r("/generate"),style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Go to Generate"}),O.jsx("button",{onClick:()=>window.location.reload(),style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Reload"})]})]}),children:O.jsx("div",{style:{padding:20,color:"rgba(255,255,255,0.85)"}})}):O.jsx(ns,{mode:"sim",onGoHome:()=>r("/"),worldName:u?.metadata?.name||"Sim",isDirty:ln.isDirty(),onModeToggle:()=>r(`/create/${e}`),rightPanel:he,toolGroups:[{id:"sim",title:"Sim Tools",tools:[{id:"overview",label:"Overview",disabled:!0},{id:"culture",label:"Culture",disabled:!0},{id:"trade",label:"Trade",disabled:!0},{id:"routes",label:"Routes",disabled:!0}]}],children:O.jsx("div",{style:{width:"100%",height:"100%",position:"relative"},children:u?O.jsxs(O.Fragment,{children:[O.jsx(Xd,{world:u,className:""}),O.jsx(iw,{events:g,onResolveEvent:G,onAutoResolveAll:B}),w&&O.jsx(rw,{history:x})]}):O.jsx("div",{style:{padding:20,color:"rgba(255,255,255,0.85)"},children:"No world loaded."})})})}function ow(){return O.jsxs(V_,{children:[O.jsx(Ys,{path:"/",element:O.jsx(Q_,{})}),O.jsx(Ys,{path:"/generate",element:O.jsx(WT,{})}),O.jsx(Ys,{path:"/create/:worldId",element:O.jsx(ew,{})}),O.jsx(Ys,{path:"/sim/:worldId",element:O.jsx(sw,{})}),O.jsx(Ys,{path:"*",element:O.jsx(H_,{to:"/",replace:!0})})]})}Zv.createRoot(document.getElementById("root")).render(O.jsx(ug.StrictMode,{children:O.jsx(X_,{children:O.jsx(ow,{})})}));
