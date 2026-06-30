function Wv(r,e){for(var t=0;t<e.length;t++){const s=e[t];if(typeof s!="string"&&!Array.isArray(s)){for(const o in s)if(o!=="default"&&!(o in r)){const l=Object.getOwnPropertyDescriptor(s,o);l&&Object.defineProperty(r,o,l.get?l:{enumerable:!0,get:()=>s[o]})}}}return Object.freeze(Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function t(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(o){if(o.ep)return;o.ep=!0;const l=t(o);fetch(o.href,l)}})();function fg(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Iu={exports:{}},Vo={},Nu={exports:{}},gt={};var vp;function jv(){if(vp)return gt;vp=1;var r=Symbol.for("react.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),u=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),m=Symbol.iterator;function _(I){return I===null||typeof I!="object"?null:(I=m&&I[m]||I["@@iterator"],typeof I=="function"?I:null)}var S={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},E=Object.assign,M={};function x(I,G,V){this.props=I,this.context=G,this.refs=M,this.updater=V||S}x.prototype.isReactComponent={},x.prototype.setState=function(I,G){if(typeof I!="object"&&typeof I!="function"&&I!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,I,G,"setState")},x.prototype.forceUpdate=function(I){this.updater.enqueueForceUpdate(this,I,"forceUpdate")};function y(){}y.prototype=x.prototype;function w(I,G,V){this.props=I,this.context=G,this.refs=M,this.updater=V||S}var R=w.prototype=new y;R.constructor=w,E(R,x.prototype),R.isPureReactComponent=!0;var b=Array.isArray,z=Object.prototype.hasOwnProperty,k={current:null},N={key:!0,ref:!0,__self:!0,__source:!0};function fe(I,G,V){var Q,he={},_e=null,Me=null;if(G!=null)for(Q in G.ref!==void 0&&(Me=G.ref),G.key!==void 0&&(_e=""+G.key),G)z.call(G,Q)&&!N.hasOwnProperty(Q)&&(he[Q]=G[Q]);var Te=arguments.length-2;if(Te===1)he.children=V;else if(1<Te){for(var pe=Array(Te),de=0;de<Te;de++)pe[de]=arguments[de+2];he.children=pe}if(I&&I.defaultProps)for(Q in Te=I.defaultProps,Te)he[Q]===void 0&&(he[Q]=Te[Q]);return{$$typeof:r,type:I,key:_e,ref:Me,props:he,_owner:k.current}}function C(I,G){return{$$typeof:r,type:I.type,key:G,ref:I.ref,props:I.props,_owner:I._owner}}function L(I){return typeof I=="object"&&I!==null&&I.$$typeof===r}function ie(I){var G={"=":"=0",":":"=2"};return"$"+I.replace(/[=:]/g,function(V){return G[V]})}var se=/\/+/g;function re(I,G){return typeof I=="object"&&I!==null&&I.key!=null?ie(""+I.key):G.toString(36)}function B(I,G,V,Q,he){var _e=typeof I;(_e==="undefined"||_e==="boolean")&&(I=null);var Me=!1;if(I===null)Me=!0;else switch(_e){case"string":case"number":Me=!0;break;case"object":switch(I.$$typeof){case r:case e:Me=!0}}if(Me)return Me=I,he=he(Me),I=Q===""?"."+re(Me,0):Q,b(he)?(V="",I!=null&&(V=I.replace(se,"$&/")+"/"),B(he,G,V,"",function(de){return de})):he!=null&&(L(he)&&(he=C(he,V+(!he.key||Me&&Me.key===he.key?"":(""+he.key).replace(se,"$&/")+"/")+I)),G.push(he)),1;if(Me=0,Q=Q===""?".":Q+":",b(I))for(var Te=0;Te<I.length;Te++){_e=I[Te];var pe=Q+re(_e,Te);Me+=B(_e,G,V,pe,he)}else if(pe=_(I),typeof pe=="function")for(I=pe.call(I),Te=0;!(_e=I.next()).done;)_e=_e.value,pe=Q+re(_e,Te++),Me+=B(_e,G,V,pe,he);else if(_e==="object")throw G=String(I),Error("Objects are not valid as a React child (found: "+(G==="[object Object]"?"object with keys {"+Object.keys(I).join(", ")+"}":G)+"). If you meant to render a collection of children, use an array instead.");return Me}function H(I,G,V){if(I==null)return I;var Q=[],he=0;return B(I,Q,"","",function(_e){return G.call(V,_e,he++)}),Q}function $(I){if(I._status===-1){var G=I._result;G=G(),G.then(function(V){(I._status===0||I._status===-1)&&(I._status=1,I._result=V)},function(V){(I._status===0||I._status===-1)&&(I._status=2,I._result=V)}),I._status===-1&&(I._status=0,I._result=G)}if(I._status===1)return I._result.default;throw I._result}var Z={current:null},U={transition:null},Y={ReactCurrentDispatcher:Z,ReactCurrentBatchConfig:U,ReactCurrentOwner:k};function W(){throw Error("act(...) is not supported in production builds of React.")}return gt.Children={map:H,forEach:function(I,G,V){H(I,function(){G.apply(this,arguments)},V)},count:function(I){var G=0;return H(I,function(){G++}),G},toArray:function(I){return H(I,function(G){return G})||[]},only:function(I){if(!L(I))throw Error("React.Children.only expected to receive a single React element child.");return I}},gt.Component=x,gt.Fragment=t,gt.Profiler=o,gt.PureComponent=w,gt.StrictMode=s,gt.Suspense=f,gt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Y,gt.act=W,gt.cloneElement=function(I,G,V){if(I==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+I+".");var Q=E({},I.props),he=I.key,_e=I.ref,Me=I._owner;if(G!=null){if(G.ref!==void 0&&(_e=G.ref,Me=k.current),G.key!==void 0&&(he=""+G.key),I.type&&I.type.defaultProps)var Te=I.type.defaultProps;for(pe in G)z.call(G,pe)&&!N.hasOwnProperty(pe)&&(Q[pe]=G[pe]===void 0&&Te!==void 0?Te[pe]:G[pe])}var pe=arguments.length-2;if(pe===1)Q.children=V;else if(1<pe){Te=Array(pe);for(var de=0;de<pe;de++)Te[de]=arguments[de+2];Q.children=Te}return{$$typeof:r,type:I.type,key:he,ref:_e,props:Q,_owner:Me}},gt.createContext=function(I){return I={$$typeof:u,_currentValue:I,_currentValue2:I,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},I.Provider={$$typeof:l,_context:I},I.Consumer=I},gt.createElement=fe,gt.createFactory=function(I){var G=fe.bind(null,I);return G.type=I,G},gt.createRef=function(){return{current:null}},gt.forwardRef=function(I){return{$$typeof:d,render:I}},gt.isValidElement=L,gt.lazy=function(I){return{$$typeof:g,_payload:{_status:-1,_result:I},_init:$}},gt.memo=function(I,G){return{$$typeof:p,type:I,compare:G===void 0?null:G}},gt.startTransition=function(I){var G=U.transition;U.transition={};try{I()}finally{U.transition=G}},gt.unstable_act=W,gt.useCallback=function(I,G){return Z.current.useCallback(I,G)},gt.useContext=function(I){return Z.current.useContext(I)},gt.useDebugValue=function(){},gt.useDeferredValue=function(I){return Z.current.useDeferredValue(I)},gt.useEffect=function(I,G){return Z.current.useEffect(I,G)},gt.useId=function(){return Z.current.useId()},gt.useImperativeHandle=function(I,G,V){return Z.current.useImperativeHandle(I,G,V)},gt.useInsertionEffect=function(I,G){return Z.current.useInsertionEffect(I,G)},gt.useLayoutEffect=function(I,G){return Z.current.useLayoutEffect(I,G)},gt.useMemo=function(I,G){return Z.current.useMemo(I,G)},gt.useReducer=function(I,G,V){return Z.current.useReducer(I,G,V)},gt.useRef=function(I){return Z.current.useRef(I)},gt.useState=function(I){return Z.current.useState(I)},gt.useSyncExternalStore=function(I,G,V){return Z.current.useSyncExternalStore(I,G,V)},gt.useTransition=function(){return Z.current.useTransition()},gt.version="18.3.1",gt}var _p;function Ud(){return _p||(_p=1,Nu.exports=jv()),Nu.exports}var xp;function Xv(){if(xp)return Vo;xp=1;var r=Ud(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,o=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function u(d,f,p){var g,m={},_=null,S=null;p!==void 0&&(_=""+p),f.key!==void 0&&(_=""+f.key),f.ref!==void 0&&(S=f.ref);for(g in f)s.call(f,g)&&!l.hasOwnProperty(g)&&(m[g]=f[g]);if(d&&d.defaultProps)for(g in f=d.defaultProps,f)m[g]===void 0&&(m[g]=f[g]);return{$$typeof:e,type:d,key:_,ref:S,props:m,_owner:o.current}}return Vo.Fragment=t,Vo.jsx=u,Vo.jsxs=u,Vo}var yp;function Yv(){return yp||(yp=1,Iu.exports=Xv()),Iu.exports}var O=Yv(),ge=Ud();const hg=fg(ge),qv=Wv({__proto__:null,default:hg},[ge]);var gl={},Uu={exports:{}},Nn={},Ou={exports:{}},Fu={};var Sp;function $v(){return Sp||(Sp=1,(function(r){function e(U,Y){var W=U.length;U.push(Y);e:for(;0<W;){var I=W-1>>>1,G=U[I];if(0<o(G,Y))U[I]=Y,U[W]=G,W=I;else break e}}function t(U){return U.length===0?null:U[0]}function s(U){if(U.length===0)return null;var Y=U[0],W=U.pop();if(W!==Y){U[0]=W;e:for(var I=0,G=U.length,V=G>>>1;I<V;){var Q=2*(I+1)-1,he=U[Q],_e=Q+1,Me=U[_e];if(0>o(he,W))_e<G&&0>o(Me,he)?(U[I]=Me,U[_e]=W,I=_e):(U[I]=he,U[Q]=W,I=Q);else if(_e<G&&0>o(Me,W))U[I]=Me,U[_e]=W,I=_e;else break e}}return Y}function o(U,Y){var W=U.sortIndex-Y.sortIndex;return W!==0?W:U.id-Y.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;r.unstable_now=function(){return l.now()}}else{var u=Date,d=u.now();r.unstable_now=function(){return u.now()-d}}var f=[],p=[],g=1,m=null,_=3,S=!1,E=!1,M=!1,x=typeof setTimeout=="function"?setTimeout:null,y=typeof clearTimeout=="function"?clearTimeout:null,w=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function R(U){for(var Y=t(p);Y!==null;){if(Y.callback===null)s(p);else if(Y.startTime<=U)s(p),Y.sortIndex=Y.expirationTime,e(f,Y);else break;Y=t(p)}}function b(U){if(M=!1,R(U),!E)if(t(f)!==null)E=!0,$(z);else{var Y=t(p);Y!==null&&Z(b,Y.startTime-U)}}function z(U,Y){E=!1,M&&(M=!1,y(fe),fe=-1),S=!0;var W=_;try{for(R(Y),m=t(f);m!==null&&(!(m.expirationTime>Y)||U&&!ie());){var I=m.callback;if(typeof I=="function"){m.callback=null,_=m.priorityLevel;var G=I(m.expirationTime<=Y);Y=r.unstable_now(),typeof G=="function"?m.callback=G:m===t(f)&&s(f),R(Y)}else s(f);m=t(f)}if(m!==null)var V=!0;else{var Q=t(p);Q!==null&&Z(b,Q.startTime-Y),V=!1}return V}finally{m=null,_=W,S=!1}}var k=!1,N=null,fe=-1,C=5,L=-1;function ie(){return!(r.unstable_now()-L<C)}function se(){if(N!==null){var U=r.unstable_now();L=U;var Y=!0;try{Y=N(!0,U)}finally{Y?re():(k=!1,N=null)}}else k=!1}var re;if(typeof w=="function")re=function(){w(se)};else if(typeof MessageChannel<"u"){var B=new MessageChannel,H=B.port2;B.port1.onmessage=se,re=function(){H.postMessage(null)}}else re=function(){x(se,0)};function $(U){N=U,k||(k=!0,re())}function Z(U,Y){fe=x(function(){U(r.unstable_now())},Y)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(U){U.callback=null},r.unstable_continueExecution=function(){E||S||(E=!0,$(z))},r.unstable_forceFrameRate=function(U){0>U||125<U?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):C=0<U?Math.floor(1e3/U):5},r.unstable_getCurrentPriorityLevel=function(){return _},r.unstable_getFirstCallbackNode=function(){return t(f)},r.unstable_next=function(U){switch(_){case 1:case 2:case 3:var Y=3;break;default:Y=_}var W=_;_=Y;try{return U()}finally{_=W}},r.unstable_pauseExecution=function(){},r.unstable_requestPaint=function(){},r.unstable_runWithPriority=function(U,Y){switch(U){case 1:case 2:case 3:case 4:case 5:break;default:U=3}var W=_;_=U;try{return Y()}finally{_=W}},r.unstable_scheduleCallback=function(U,Y,W){var I=r.unstable_now();switch(typeof W=="object"&&W!==null?(W=W.delay,W=typeof W=="number"&&0<W?I+W:I):W=I,U){case 1:var G=-1;break;case 2:G=250;break;case 5:G=1073741823;break;case 4:G=1e4;break;default:G=5e3}return G=W+G,U={id:g++,callback:Y,priorityLevel:U,startTime:W,expirationTime:G,sortIndex:-1},W>I?(U.sortIndex=W,e(p,U),t(f)===null&&U===t(p)&&(M?(y(fe),fe=-1):M=!0,Z(b,W-I))):(U.sortIndex=G,e(f,U),E||S||(E=!0,$(z))),U},r.unstable_shouldYield=ie,r.unstable_wrapCallback=function(U){var Y=_;return function(){var W=_;_=Y;try{return U.apply(this,arguments)}finally{_=W}}}})(Fu)),Fu}var Mp;function Kv(){return Mp||(Mp=1,Ou.exports=$v()),Ou.exports}var Ep;function Zv(){if(Ep)return Nn;Ep=1;var r=Ud(),e=Kv();function t(n){for(var i="https://reactjs.org/docs/error-decoder.html?invariant="+n,a=1;a<arguments.length;a++)i+="&args[]="+encodeURIComponent(arguments[a]);return"Minified React error #"+n+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var s=new Set,o={};function l(n,i){u(n,i),u(n+"Capture",i)}function u(n,i){for(o[n]=i,n=0;n<i.length;n++)s.add(i[n])}var d=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),f=Object.prototype.hasOwnProperty,p=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,g={},m={};function _(n){return f.call(m,n)?!0:f.call(g,n)?!1:p.test(n)?m[n]=!0:(g[n]=!0,!1)}function S(n,i,a,c){if(a!==null&&a.type===0)return!1;switch(typeof i){case"function":case"symbol":return!0;case"boolean":return c?!1:a!==null?!a.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function E(n,i,a,c){if(i===null||typeof i>"u"||S(n,i,a,c))return!0;if(c)return!1;if(a!==null)switch(a.type){case 3:return!i;case 4:return i===!1;case 5:return isNaN(i);case 6:return isNaN(i)||1>i}return!1}function M(n,i,a,c,h,v,T){this.acceptsBooleans=i===2||i===3||i===4,this.attributeName=c,this.attributeNamespace=h,this.mustUseProperty=a,this.propertyName=n,this.type=i,this.sanitizeURL=v,this.removeEmptyString=T}var x={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){x[n]=new M(n,0,!1,n,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var i=n[0];x[i]=new M(i,1,!1,n[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(n){x[n]=new M(n,2,!1,n.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){x[n]=new M(n,2,!1,n,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){x[n]=new M(n,3,!1,n.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(n){x[n]=new M(n,3,!0,n,null,!1,!1)}),["capture","download"].forEach(function(n){x[n]=new M(n,4,!1,n,null,!1,!1)}),["cols","rows","size","span"].forEach(function(n){x[n]=new M(n,6,!1,n,null,!1,!1)}),["rowSpan","start"].forEach(function(n){x[n]=new M(n,5,!1,n.toLowerCase(),null,!1,!1)});var y=/[\-:]([a-z])/g;function w(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var i=n.replace(y,w);x[i]=new M(i,1,!1,n,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var i=n.replace(y,w);x[i]=new M(i,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(n){var i=n.replace(y,w);x[i]=new M(i,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(n){x[n]=new M(n,1,!1,n.toLowerCase(),null,!1,!1)}),x.xlinkHref=new M("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(n){x[n]=new M(n,1,!1,n.toLowerCase(),null,!0,!0)});function R(n,i,a,c){var h=x.hasOwnProperty(i)?x[i]:null;(h!==null?h.type!==0:c||!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(E(i,a,h,c)&&(a=null),c||h===null?_(i)&&(a===null?n.removeAttribute(i):n.setAttribute(i,""+a)):h.mustUseProperty?n[h.propertyName]=a===null?h.type===3?!1:"":a:(i=h.attributeName,c=h.attributeNamespace,a===null?n.removeAttribute(i):(h=h.type,a=h===3||h===4&&a===!0?"":""+a,c?n.setAttributeNS(c,i,a):n.setAttribute(i,a))))}var b=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,z=Symbol.for("react.element"),k=Symbol.for("react.portal"),N=Symbol.for("react.fragment"),fe=Symbol.for("react.strict_mode"),C=Symbol.for("react.profiler"),L=Symbol.for("react.provider"),ie=Symbol.for("react.context"),se=Symbol.for("react.forward_ref"),re=Symbol.for("react.suspense"),B=Symbol.for("react.suspense_list"),H=Symbol.for("react.memo"),$=Symbol.for("react.lazy"),Z=Symbol.for("react.offscreen"),U=Symbol.iterator;function Y(n){return n===null||typeof n!="object"?null:(n=U&&n[U]||n["@@iterator"],typeof n=="function"?n:null)}var W=Object.assign,I;function G(n){if(I===void 0)try{throw Error()}catch(a){var i=a.stack.trim().match(/\n( *(at )?)/);I=i&&i[1]||""}return`
`+I+n}var V=!1;function Q(n,i){if(!n||V)return"";V=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(i)if(i=function(){throw Error()},Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(oe){var c=oe}Reflect.construct(n,[],i)}else{try{i.call()}catch(oe){c=oe}n.call(i.prototype)}else{try{throw Error()}catch(oe){c=oe}n()}}catch(oe){if(oe&&c&&typeof oe.stack=="string"){for(var h=oe.stack.split(`
`),v=c.stack.split(`
`),T=h.length-1,F=v.length-1;1<=T&&0<=F&&h[T]!==v[F];)F--;for(;1<=T&&0<=F;T--,F--)if(h[T]!==v[F]){if(T!==1||F!==1)do if(T--,F--,0>F||h[T]!==v[F]){var j=`
`+h[T].replace(" at new "," at ");return n.displayName&&j.includes("<anonymous>")&&(j=j.replace("<anonymous>",n.displayName)),j}while(1<=T&&0<=F);break}}}finally{V=!1,Error.prepareStackTrace=a}return(n=n?n.displayName||n.name:"")?G(n):""}function he(n){switch(n.tag){case 5:return G(n.type);case 16:return G("Lazy");case 13:return G("Suspense");case 19:return G("SuspenseList");case 0:case 2:case 15:return n=Q(n.type,!1),n;case 11:return n=Q(n.type.render,!1),n;case 1:return n=Q(n.type,!0),n;default:return""}}function _e(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case N:return"Fragment";case k:return"Portal";case C:return"Profiler";case fe:return"StrictMode";case re:return"Suspense";case B:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case ie:return(n.displayName||"Context")+".Consumer";case L:return(n._context.displayName||"Context")+".Provider";case se:var i=n.render;return n=n.displayName,n||(n=i.displayName||i.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case H:return i=n.displayName||null,i!==null?i:_e(n.type)||"Memo";case $:i=n._payload,n=n._init;try{return _e(n(i))}catch{}}return null}function Me(n){var i=n.type;switch(n.tag){case 24:return"Cache";case 9:return(i.displayName||"Context")+".Consumer";case 10:return(i._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=i.render,n=n.displayName||n.name||"",i.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return _e(i);case 8:return i===fe?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof i=="function")return i.displayName||i.name||null;if(typeof i=="string")return i}return null}function Te(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function pe(n){var i=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function de(n){var i=pe(n)?"checked":"value",a=Object.getOwnPropertyDescriptor(n.constructor.prototype,i),c=""+n[i];if(!n.hasOwnProperty(i)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var h=a.get,v=a.set;return Object.defineProperty(n,i,{configurable:!0,get:function(){return h.call(this)},set:function(T){c=""+T,v.call(this,T)}}),Object.defineProperty(n,i,{enumerable:a.enumerable}),{getValue:function(){return c},setValue:function(T){c=""+T},stopTracking:function(){n._valueTracker=null,delete n[i]}}}}function Ie(n){n._valueTracker||(n._valueTracker=de(n))}function K(n){if(!n)return!1;var i=n._valueTracker;if(!i)return!0;var a=i.getValue(),c="";return n&&(c=pe(n)?n.checked?"true":"false":n.value),n=c,n!==a?(i.setValue(n),!0):!1}function Je(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function Fe(n,i){var a=i.checked;return W({},i,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:a??n._wrapperState.initialChecked})}function Ve(n,i){var a=i.defaultValue==null?"":i.defaultValue,c=i.checked!=null?i.checked:i.defaultChecked;a=Te(i.value!=null?i.value:a),n._wrapperState={initialChecked:c,initialValue:a,controlled:i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null}}function Re(n,i){i=i.checked,i!=null&&R(n,"checked",i,!1)}function rt(n,i){Re(n,i);var a=Te(i.value),c=i.type;if(a!=null)c==="number"?(a===0&&n.value===""||n.value!=a)&&(n.value=""+a):n.value!==""+a&&(n.value=""+a);else if(c==="submit"||c==="reset"){n.removeAttribute("value");return}i.hasOwnProperty("value")?P(n,i.type,a):i.hasOwnProperty("defaultValue")&&P(n,i.type,Te(i.defaultValue)),i.checked==null&&i.defaultChecked!=null&&(n.defaultChecked=!!i.defaultChecked)}function Be(n,i,a){if(i.hasOwnProperty("value")||i.hasOwnProperty("defaultValue")){var c=i.type;if(!(c!=="submit"&&c!=="reset"||i.value!==void 0&&i.value!==null))return;i=""+n._wrapperState.initialValue,a||i===n.value||(n.value=i),n.defaultValue=i}a=n.name,a!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,a!==""&&(n.name=a)}function P(n,i,a){(i!=="number"||Je(n.ownerDocument)!==n)&&(a==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+a&&(n.defaultValue=""+a))}var A=Array.isArray;function te(n,i,a,c){if(n=n.options,i){i={};for(var h=0;h<a.length;h++)i["$"+a[h]]=!0;for(a=0;a<n.length;a++)h=i.hasOwnProperty("$"+n[a].value),n[a].selected!==h&&(n[a].selected=h),h&&c&&(n[a].defaultSelected=!0)}else{for(a=""+Te(a),i=null,h=0;h<n.length;h++){if(n[h].value===a){n[h].selected=!0,c&&(n[h].defaultSelected=!0);return}i!==null||n[h].disabled||(i=n[h])}i!==null&&(i.selected=!0)}}function xe(n,i){if(i.dangerouslySetInnerHTML!=null)throw Error(t(91));return W({},i,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function me(n,i){var a=i.value;if(a==null){if(a=i.children,i=i.defaultValue,a!=null){if(i!=null)throw Error(t(92));if(A(a)){if(1<a.length)throw Error(t(93));a=a[0]}i=a}i==null&&(i=""),a=i}n._wrapperState={initialValue:Te(a)}}function ve(n,i){var a=Te(i.value),c=Te(i.defaultValue);a!=null&&(a=""+a,a!==n.value&&(n.value=a),i.defaultValue==null&&n.defaultValue!==a&&(n.defaultValue=a)),c!=null&&(n.defaultValue=""+c)}function Le(n){var i=n.textContent;i===n._wrapperState.initialValue&&i!==""&&i!==null&&(n.value=i)}function Ae(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ze(n,i){return n==null||n==="http://www.w3.org/1999/xhtml"?Ae(i):n==="http://www.w3.org/2000/svg"&&i==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var $e,at=(function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(i,a,c,h){MSApp.execUnsafeLocalFunction(function(){return n(i,a,c,h)})}:n})(function(n,i){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=i;else{for($e=$e||document.createElement("div"),$e.innerHTML="<svg>"+i.valueOf().toString()+"</svg>",i=$e.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;i.firstChild;)n.appendChild(i.firstChild)}});function Se(n,i){if(i){var a=n.firstChild;if(a&&a===n.lastChild&&a.nodeType===3){a.nodeValue=i;return}}n.textContent=i}var pt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},dt=["Webkit","ms","Moz","O"];Object.keys(pt).forEach(function(n){dt.forEach(function(i){i=i+n.charAt(0).toUpperCase()+n.substring(1),pt[i]=pt[n]})});function it(n,i,a){return i==null||typeof i=="boolean"||i===""?"":a||typeof i!="number"||i===0||pt.hasOwnProperty(n)&&pt[n]?(""+i).trim():i+"px"}function qe(n,i){n=n.style;for(var a in i)if(i.hasOwnProperty(a)){var c=a.indexOf("--")===0,h=it(a,i[a],c);a==="float"&&(a="cssFloat"),c?n.setProperty(a,h):n[a]=h}}var Ge=W({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function tt(n,i){if(i){if(Ge[n]&&(i.children!=null||i.dangerouslySetInnerHTML!=null))throw Error(t(137,n));if(i.dangerouslySetInnerHTML!=null){if(i.children!=null)throw Error(t(60));if(typeof i.dangerouslySetInnerHTML!="object"||!("__html"in i.dangerouslySetInnerHTML))throw Error(t(61))}if(i.style!=null&&typeof i.style!="object")throw Error(t(62))}}function mt(n,i){if(n.indexOf("-")===-1)return typeof i.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Rt=null;function ct(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var be=null,X=null,Pe=null;function Ne(n){if(n=Ro(n)){if(typeof be!="function")throw Error(t(280));var i=n.stateNode;i&&(i=Pa(i),be(n.stateNode,n.type,i))}}function nt(n){X?Pe?Pe.push(n):Pe=[n]:X=n}function Ke(){if(X){var n=X,i=Pe;if(Pe=X=null,Ne(n),i)for(n=0;n<i.length;n++)Ne(i[n])}}function Tt(n,i){return n(i)}function wt(){}var Bt=!1;function Jt(n,i,a){if(Bt)return n(i,a);Bt=!0;try{return Tt(n,i,a)}finally{Bt=!1,(X!==null||Pe!==null)&&(wt(),Ke())}}function yt(n,i){var a=n.stateNode;if(a===null)return null;var c=Pa(a);if(c===null)return null;a=c[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(c=!c.disabled)||(n=n.type,c=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!c;break e;default:n=!1}if(n)return null;if(a&&typeof a!="function")throw Error(t(231,i,typeof a));return a}var Yt=!1;if(d)try{var dn={};Object.defineProperty(dn,"passive",{get:function(){Yt=!0}}),window.addEventListener("test",dn,dn),window.removeEventListener("test",dn,dn)}catch{Yt=!1}function ua(n,i,a,c,h,v,T,F,j){var oe=Array.prototype.slice.call(arguments,3);try{i.apply(a,oe)}catch(Ee){this.onError(Ee)}}var Pr=!1,Ai=null,Dr=!1,qi=null,da={onError:function(n){Pr=!0,Ai=n}};function fa(n,i,a,c,h,v,T,F,j){Pr=!1,Ai=null,ua.apply(da,arguments)}function tc(n,i,a,c,h,v,T,F,j){if(fa.apply(this,arguments),Pr){if(Pr){var oe=Ai;Pr=!1,Ai=null}else throw Error(t(198));Dr||(Dr=!0,qi=oe)}}function Ci(n){var i=n,a=n;if(n.alternate)for(;i.return;)i=i.return;else{n=i;do i=n,(i.flags&4098)!==0&&(a=i.return),n=i.return;while(n)}return i.tag===3?a:null}function ha(n){if(n.tag===13){var i=n.memoizedState;if(i===null&&(n=n.alternate,n!==null&&(i=n.memoizedState)),i!==null)return i.dehydrated}return null}function D(n){if(Ci(n)!==n)throw Error(t(188))}function ee(n){var i=n.alternate;if(!i){if(i=Ci(n),i===null)throw Error(t(188));return i!==n?null:n}for(var a=n,c=i;;){var h=a.return;if(h===null)break;var v=h.alternate;if(v===null){if(c=h.return,c!==null){a=c;continue}break}if(h.child===v.child){for(v=h.child;v;){if(v===a)return D(h),n;if(v===c)return D(h),i;v=v.sibling}throw Error(t(188))}if(a.return!==c.return)a=h,c=v;else{for(var T=!1,F=h.child;F;){if(F===a){T=!0,a=h,c=v;break}if(F===c){T=!0,c=h,a=v;break}F=F.sibling}if(!T){for(F=v.child;F;){if(F===a){T=!0,a=v,c=h;break}if(F===c){T=!0,c=v,a=h;break}F=F.sibling}if(!T)throw Error(t(189))}}if(a.alternate!==c)throw Error(t(190))}if(a.tag!==3)throw Error(t(188));return a.stateNode.current===a?n:i}function le(n){return n=ee(n),n!==null?ue(n):null}function ue(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var i=ue(n);if(i!==null)return i;n=n.sibling}return null}var ae=e.unstable_scheduleCallback,Ue=e.unstable_cancelCallback,Ye=e.unstable_shouldYield,et=e.unstable_requestPaint,ke=e.unstable_now,ut=e.unstable_getCurrentPriorityLevel,ot=e.unstable_ImmediatePriority,lt=e.unstable_UserBlockingPriority,bt=e.unstable_NormalPriority,xn=e.unstable_LowPriority,Gt=e.unstable_IdlePriority,Cn=null,_t=null;function ft(n){if(_t&&typeof _t.onCommitFiberRoot=="function")try{_t.onCommitFiberRoot(Cn,n,void 0,(n.current.flags&128)===128)}catch{}}var yn=Math.clz32?Math.clz32:pa,Nt=Math.log,Ri=Math.LN2;function pa(n){return n>>>=0,n===0?32:31-(Nt(n)/Ri|0)|0}var vi=64,$i=4194304;function zt(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function qn(n,i){var a=n.pendingLanes;if(a===0)return 0;var c=0,h=n.suspendedLanes,v=n.pingedLanes,T=a&268435455;if(T!==0){var F=T&~h;F!==0?c=zt(F):(v&=T,v!==0&&(c=zt(v)))}else T=a&~h,T!==0?c=zt(T):v!==0&&(c=zt(v));if(c===0)return 0;if(i!==0&&i!==c&&(i&h)===0&&(h=c&-c,v=i&-i,h>=v||h===16&&(v&4194240)!==0))return i;if((c&4)!==0&&(c|=a&16),i=n.entangledLanes,i!==0)for(n=n.entanglements,i&=c;0<i;)a=31-yn(i),h=1<<a,c|=n[a],i&=~h;return c}function co(n,i){switch(n){case 1:case 2:case 4:return i+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Rn(n,i){for(var a=n.suspendedLanes,c=n.pingedLanes,h=n.expirationTimes,v=n.pendingLanes;0<v;){var T=31-yn(v),F=1<<T,j=h[T];j===-1?((F&a)===0||(F&c)!==0)&&(h[T]=co(F,i)):j<=i&&(n.expiredLanes|=F),v&=~F}}function Ir(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function ma(){var n=vi;return vi<<=1,(vi&4194240)===0&&(vi=64),n}function ls(n){for(var i=[],a=0;31>a;a++)i.push(n);return i}function uo(n,i,a){n.pendingLanes|=i,i!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,i=31-yn(i),n[i]=a}function d0(n,i){var a=n.pendingLanes&~i;n.pendingLanes=i,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=i,n.mutableReadLanes&=i,n.entangledLanes&=i,i=n.entanglements;var c=n.eventTimes;for(n=n.expirationTimes;0<a;){var h=31-yn(a),v=1<<h;i[h]=0,c[h]=-1,n[h]=-1,a&=~v}}function nc(n,i){var a=n.entangledLanes|=i;for(n=n.entanglements;a;){var c=31-yn(a),h=1<<c;h&i|n[c]&i&&(n[c]|=i),a&=~h}}var At=0;function qd(n){return n&=-n,1<n?4<n?(n&268435455)!==0?16:536870912:4:1}var $d,ic,Kd,Zd,Qd,rc=!1,ga=[],Ki=null,Zi=null,Qi=null,fo=new Map,ho=new Map,Ji=[],f0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Jd(n,i){switch(n){case"focusin":case"focusout":Ki=null;break;case"dragenter":case"dragleave":Zi=null;break;case"mouseover":case"mouseout":Qi=null;break;case"pointerover":case"pointerout":fo.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":ho.delete(i.pointerId)}}function po(n,i,a,c,h,v){return n===null||n.nativeEvent!==v?(n={blockedOn:i,domEventName:a,eventSystemFlags:c,nativeEvent:v,targetContainers:[h]},i!==null&&(i=Ro(i),i!==null&&ic(i)),n):(n.eventSystemFlags|=c,i=n.targetContainers,h!==null&&i.indexOf(h)===-1&&i.push(h),n)}function h0(n,i,a,c,h){switch(i){case"focusin":return Ki=po(Ki,n,i,a,c,h),!0;case"dragenter":return Zi=po(Zi,n,i,a,c,h),!0;case"mouseover":return Qi=po(Qi,n,i,a,c,h),!0;case"pointerover":var v=h.pointerId;return fo.set(v,po(fo.get(v)||null,n,i,a,c,h)),!0;case"gotpointercapture":return v=h.pointerId,ho.set(v,po(ho.get(v)||null,n,i,a,c,h)),!0}return!1}function ef(n){var i=Nr(n.target);if(i!==null){var a=Ci(i);if(a!==null){if(i=a.tag,i===13){if(i=ha(a),i!==null){n.blockedOn=i,Qd(n.priority,function(){Kd(a)});return}}else if(i===3&&a.stateNode.current.memoizedState.isDehydrated){n.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}n.blockedOn=null}function va(n){if(n.blockedOn!==null)return!1;for(var i=n.targetContainers;0<i.length;){var a=oc(n.domEventName,n.eventSystemFlags,i[0],n.nativeEvent);if(a===null){a=n.nativeEvent;var c=new a.constructor(a.type,a);Rt=c,a.target.dispatchEvent(c),Rt=null}else return i=Ro(a),i!==null&&ic(i),n.blockedOn=a,!1;i.shift()}return!0}function tf(n,i,a){va(n)&&a.delete(i)}function p0(){rc=!1,Ki!==null&&va(Ki)&&(Ki=null),Zi!==null&&va(Zi)&&(Zi=null),Qi!==null&&va(Qi)&&(Qi=null),fo.forEach(tf),ho.forEach(tf)}function mo(n,i){n.blockedOn===i&&(n.blockedOn=null,rc||(rc=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,p0)))}function go(n){function i(h){return mo(h,n)}if(0<ga.length){mo(ga[0],n);for(var a=1;a<ga.length;a++){var c=ga[a];c.blockedOn===n&&(c.blockedOn=null)}}for(Ki!==null&&mo(Ki,n),Zi!==null&&mo(Zi,n),Qi!==null&&mo(Qi,n),fo.forEach(i),ho.forEach(i),a=0;a<Ji.length;a++)c=Ji[a],c.blockedOn===n&&(c.blockedOn=null);for(;0<Ji.length&&(a=Ji[0],a.blockedOn===null);)ef(a),a.blockedOn===null&&Ji.shift()}var cs=b.ReactCurrentBatchConfig,_a=!0;function m0(n,i,a,c){var h=At,v=cs.transition;cs.transition=null;try{At=1,sc(n,i,a,c)}finally{At=h,cs.transition=v}}function g0(n,i,a,c){var h=At,v=cs.transition;cs.transition=null;try{At=4,sc(n,i,a,c)}finally{At=h,cs.transition=v}}function sc(n,i,a,c){if(_a){var h=oc(n,i,a,c);if(h===null)Ec(n,i,c,xa,a),Jd(n,c);else if(h0(h,n,i,a,c))c.stopPropagation();else if(Jd(n,c),i&4&&-1<f0.indexOf(n)){for(;h!==null;){var v=Ro(h);if(v!==null&&$d(v),v=oc(n,i,a,c),v===null&&Ec(n,i,c,xa,a),v===h)break;h=v}h!==null&&c.stopPropagation()}else Ec(n,i,c,null,a)}}var xa=null;function oc(n,i,a,c){if(xa=null,n=ct(c),n=Nr(n),n!==null)if(i=Ci(n),i===null)n=null;else if(a=i.tag,a===13){if(n=ha(i),n!==null)return n;n=null}else if(a===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;n=null}else i!==n&&(n=null);return xa=n,null}function nf(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(ut()){case ot:return 1;case lt:return 4;case bt:case xn:return 16;case Gt:return 536870912;default:return 16}default:return 16}}var er=null,ac=null,ya=null;function rf(){if(ya)return ya;var n,i=ac,a=i.length,c,h="value"in er?er.value:er.textContent,v=h.length;for(n=0;n<a&&i[n]===h[n];n++);var T=a-n;for(c=1;c<=T&&i[a-c]===h[v-c];c++);return ya=h.slice(n,1<c?1-c:void 0)}function Sa(n){var i=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&i===13&&(n=13)):n=i,n===10&&(n=13),32<=n||n===13?n:0}function Ma(){return!0}function sf(){return!1}function Gn(n){function i(a,c,h,v,T){this._reactName=a,this._targetInst=h,this.type=c,this.nativeEvent=v,this.target=T,this.currentTarget=null;for(var F in n)n.hasOwnProperty(F)&&(a=n[F],this[F]=a?a(v):v[F]);return this.isDefaultPrevented=(v.defaultPrevented!=null?v.defaultPrevented:v.returnValue===!1)?Ma:sf,this.isPropagationStopped=sf,this}return W(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Ma)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Ma)},persist:function(){},isPersistent:Ma}),i}var us={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},lc=Gn(us),vo=W({},us,{view:0,detail:0}),v0=Gn(vo),cc,uc,_o,Ea=W({},vo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:fc,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==_o&&(_o&&n.type==="mousemove"?(cc=n.screenX-_o.screenX,uc=n.screenY-_o.screenY):uc=cc=0,_o=n),cc)},movementY:function(n){return"movementY"in n?n.movementY:uc}}),of=Gn(Ea),_0=W({},Ea,{dataTransfer:0}),x0=Gn(_0),y0=W({},vo,{relatedTarget:0}),dc=Gn(y0),S0=W({},us,{animationName:0,elapsedTime:0,pseudoElement:0}),M0=Gn(S0),E0=W({},us,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),T0=Gn(E0),w0=W({},us,{data:0}),af=Gn(w0),A0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},C0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},R0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function b0(n){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(n):(n=R0[n])?!!i[n]:!1}function fc(){return b0}var L0=W({},vo,{key:function(n){if(n.key){var i=A0[n.key]||n.key;if(i!=="Unidentified")return i}return n.type==="keypress"?(n=Sa(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?C0[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:fc,charCode:function(n){return n.type==="keypress"?Sa(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?Sa(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),P0=Gn(L0),D0=W({},Ea,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),lf=Gn(D0),I0=W({},vo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:fc}),N0=Gn(I0),U0=W({},us,{propertyName:0,elapsedTime:0,pseudoElement:0}),O0=Gn(U0),F0=W({},Ea,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),k0=Gn(F0),B0=[9,13,27,32],hc=d&&"CompositionEvent"in window,xo=null;d&&"documentMode"in document&&(xo=document.documentMode);var z0=d&&"TextEvent"in window&&!xo,cf=d&&(!hc||xo&&8<xo&&11>=xo),uf=" ",df=!1;function ff(n,i){switch(n){case"keyup":return B0.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function hf(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var ds=!1;function H0(n,i){switch(n){case"compositionend":return hf(i);case"keypress":return i.which!==32?null:(df=!0,uf);case"textInput":return n=i.data,n===uf&&df?null:n;default:return null}}function G0(n,i){if(ds)return n==="compositionend"||!hc&&ff(n,i)?(n=rf(),ya=ac=er=null,ds=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return cf&&i.locale!=="ko"?null:i.data;default:return null}}var V0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function pf(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i==="input"?!!V0[n.type]:i==="textarea"}function mf(n,i,a,c){nt(c),i=Ra(i,"onChange"),0<i.length&&(a=new lc("onChange","change",null,a,c),n.push({event:a,listeners:i}))}var yo=null,So=null;function W0(n){If(n,0)}function Ta(n){var i=gs(n);if(K(i))return n}function j0(n,i){if(n==="change")return i}var gf=!1;if(d){var pc;if(d){var mc="oninput"in document;if(!mc){var vf=document.createElement("div");vf.setAttribute("oninput","return;"),mc=typeof vf.oninput=="function"}pc=mc}else pc=!1;gf=pc&&(!document.documentMode||9<document.documentMode)}function _f(){yo&&(yo.detachEvent("onpropertychange",xf),So=yo=null)}function xf(n){if(n.propertyName==="value"&&Ta(So)){var i=[];mf(i,So,n,ct(n)),Jt(W0,i)}}function X0(n,i,a){n==="focusin"?(_f(),yo=i,So=a,yo.attachEvent("onpropertychange",xf)):n==="focusout"&&_f()}function Y0(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return Ta(So)}function q0(n,i){if(n==="click")return Ta(i)}function $0(n,i){if(n==="input"||n==="change")return Ta(i)}function K0(n,i){return n===i&&(n!==0||1/n===1/i)||n!==n&&i!==i}var si=typeof Object.is=="function"?Object.is:K0;function Mo(n,i){if(si(n,i))return!0;if(typeof n!="object"||n===null||typeof i!="object"||i===null)return!1;var a=Object.keys(n),c=Object.keys(i);if(a.length!==c.length)return!1;for(c=0;c<a.length;c++){var h=a[c];if(!f.call(i,h)||!si(n[h],i[h]))return!1}return!0}function yf(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function Sf(n,i){var a=yf(n);n=0;for(var c;a;){if(a.nodeType===3){if(c=n+a.textContent.length,n<=i&&c>=i)return{node:a,offset:i-n};n=c}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=yf(a)}}function Mf(n,i){return n&&i?n===i?!0:n&&n.nodeType===3?!1:i&&i.nodeType===3?Mf(n,i.parentNode):"contains"in n?n.contains(i):n.compareDocumentPosition?!!(n.compareDocumentPosition(i)&16):!1:!1}function Ef(){for(var n=window,i=Je();i instanceof n.HTMLIFrameElement;){try{var a=typeof i.contentWindow.location.href=="string"}catch{a=!1}if(a)n=i.contentWindow;else break;i=Je(n.document)}return i}function gc(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i&&(i==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||i==="textarea"||n.contentEditable==="true")}function Z0(n){var i=Ef(),a=n.focusedElem,c=n.selectionRange;if(i!==a&&a&&a.ownerDocument&&Mf(a.ownerDocument.documentElement,a)){if(c!==null&&gc(a)){if(i=c.start,n=c.end,n===void 0&&(n=i),"selectionStart"in a)a.selectionStart=i,a.selectionEnd=Math.min(n,a.value.length);else if(n=(i=a.ownerDocument||document)&&i.defaultView||window,n.getSelection){n=n.getSelection();var h=a.textContent.length,v=Math.min(c.start,h);c=c.end===void 0?v:Math.min(c.end,h),!n.extend&&v>c&&(h=c,c=v,v=h),h=Sf(a,v);var T=Sf(a,c);h&&T&&(n.rangeCount!==1||n.anchorNode!==h.node||n.anchorOffset!==h.offset||n.focusNode!==T.node||n.focusOffset!==T.offset)&&(i=i.createRange(),i.setStart(h.node,h.offset),n.removeAllRanges(),v>c?(n.addRange(i),n.extend(T.node,T.offset)):(i.setEnd(T.node,T.offset),n.addRange(i)))}}for(i=[],n=a;n=n.parentNode;)n.nodeType===1&&i.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof a.focus=="function"&&a.focus(),a=0;a<i.length;a++)n=i[a],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var Q0=d&&"documentMode"in document&&11>=document.documentMode,fs=null,vc=null,Eo=null,_c=!1;function Tf(n,i,a){var c=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;_c||fs==null||fs!==Je(c)||(c=fs,"selectionStart"in c&&gc(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}),Eo&&Mo(Eo,c)||(Eo=c,c=Ra(vc,"onSelect"),0<c.length&&(i=new lc("onSelect","select",null,i,a),n.push({event:i,listeners:c}),i.target=fs)))}function wa(n,i){var a={};return a[n.toLowerCase()]=i.toLowerCase(),a["Webkit"+n]="webkit"+i,a["Moz"+n]="moz"+i,a}var hs={animationend:wa("Animation","AnimationEnd"),animationiteration:wa("Animation","AnimationIteration"),animationstart:wa("Animation","AnimationStart"),transitionend:wa("Transition","TransitionEnd")},xc={},wf={};d&&(wf=document.createElement("div").style,"AnimationEvent"in window||(delete hs.animationend.animation,delete hs.animationiteration.animation,delete hs.animationstart.animation),"TransitionEvent"in window||delete hs.transitionend.transition);function Aa(n){if(xc[n])return xc[n];if(!hs[n])return n;var i=hs[n],a;for(a in i)if(i.hasOwnProperty(a)&&a in wf)return xc[n]=i[a];return n}var Af=Aa("animationend"),Cf=Aa("animationiteration"),Rf=Aa("animationstart"),bf=Aa("transitionend"),Lf=new Map,Pf="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function tr(n,i){Lf.set(n,i),l(i,[n])}for(var yc=0;yc<Pf.length;yc++){var Sc=Pf[yc],J0=Sc.toLowerCase(),ev=Sc[0].toUpperCase()+Sc.slice(1);tr(J0,"on"+ev)}tr(Af,"onAnimationEnd"),tr(Cf,"onAnimationIteration"),tr(Rf,"onAnimationStart"),tr("dblclick","onDoubleClick"),tr("focusin","onFocus"),tr("focusout","onBlur"),tr(bf,"onTransitionEnd"),u("onMouseEnter",["mouseout","mouseover"]),u("onMouseLeave",["mouseout","mouseover"]),u("onPointerEnter",["pointerout","pointerover"]),u("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var To="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),tv=new Set("cancel close invalid load scroll toggle".split(" ").concat(To));function Df(n,i,a){var c=n.type||"unknown-event";n.currentTarget=a,tc(c,i,void 0,n),n.currentTarget=null}function If(n,i){i=(i&4)!==0;for(var a=0;a<n.length;a++){var c=n[a],h=c.event;c=c.listeners;e:{var v=void 0;if(i)for(var T=c.length-1;0<=T;T--){var F=c[T],j=F.instance,oe=F.currentTarget;if(F=F.listener,j!==v&&h.isPropagationStopped())break e;Df(h,F,oe),v=j}else for(T=0;T<c.length;T++){if(F=c[T],j=F.instance,oe=F.currentTarget,F=F.listener,j!==v&&h.isPropagationStopped())break e;Df(h,F,oe),v=j}}}if(Dr)throw n=qi,Dr=!1,qi=null,n}function Pt(n,i){var a=i[bc];a===void 0&&(a=i[bc]=new Set);var c=n+"__bubble";a.has(c)||(Nf(i,n,2,!1),a.add(c))}function Mc(n,i,a){var c=0;i&&(c|=4),Nf(a,n,c,i)}var Ca="_reactListening"+Math.random().toString(36).slice(2);function wo(n){if(!n[Ca]){n[Ca]=!0,s.forEach(function(a){a!=="selectionchange"&&(tv.has(a)||Mc(a,!1,n),Mc(a,!0,n))});var i=n.nodeType===9?n:n.ownerDocument;i===null||i[Ca]||(i[Ca]=!0,Mc("selectionchange",!1,i))}}function Nf(n,i,a,c){switch(nf(i)){case 1:var h=m0;break;case 4:h=g0;break;default:h=sc}a=h.bind(null,i,a,n),h=void 0,!Yt||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(h=!0),c?h!==void 0?n.addEventListener(i,a,{capture:!0,passive:h}):n.addEventListener(i,a,!0):h!==void 0?n.addEventListener(i,a,{passive:h}):n.addEventListener(i,a,!1)}function Ec(n,i,a,c,h){var v=c;if((i&1)===0&&(i&2)===0&&c!==null)e:for(;;){if(c===null)return;var T=c.tag;if(T===3||T===4){var F=c.stateNode.containerInfo;if(F===h||F.nodeType===8&&F.parentNode===h)break;if(T===4)for(T=c.return;T!==null;){var j=T.tag;if((j===3||j===4)&&(j=T.stateNode.containerInfo,j===h||j.nodeType===8&&j.parentNode===h))return;T=T.return}for(;F!==null;){if(T=Nr(F),T===null)return;if(j=T.tag,j===5||j===6){c=v=T;continue e}F=F.parentNode}}c=c.return}Jt(function(){var oe=v,Ee=ct(a),we=[];e:{var ye=Lf.get(n);if(ye!==void 0){var Oe=lc,We=n;switch(n){case"keypress":if(Sa(a)===0)break e;case"keydown":case"keyup":Oe=P0;break;case"focusin":We="focus",Oe=dc;break;case"focusout":We="blur",Oe=dc;break;case"beforeblur":case"afterblur":Oe=dc;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":Oe=of;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":Oe=x0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":Oe=N0;break;case Af:case Cf:case Rf:Oe=M0;break;case bf:Oe=O0;break;case"scroll":Oe=v0;break;case"wheel":Oe=k0;break;case"copy":case"cut":case"paste":Oe=T0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":Oe=lf}var je=(i&4)!==0,Vt=!je&&n==="scroll",J=je?ye!==null?ye+"Capture":null:ye;je=[];for(var q=oe,ne;q!==null;){ne=q;var Ce=ne.stateNode;if(ne.tag===5&&Ce!==null&&(ne=Ce,J!==null&&(Ce=yt(q,J),Ce!=null&&je.push(Ao(q,Ce,ne)))),Vt)break;q=q.return}0<je.length&&(ye=new Oe(ye,We,null,a,Ee),we.push({event:ye,listeners:je}))}}if((i&7)===0){e:{if(ye=n==="mouseover"||n==="pointerover",Oe=n==="mouseout"||n==="pointerout",ye&&a!==Rt&&(We=a.relatedTarget||a.fromElement)&&(Nr(We)||We[bi]))break e;if((Oe||ye)&&(ye=Ee.window===Ee?Ee:(ye=Ee.ownerDocument)?ye.defaultView||ye.parentWindow:window,Oe?(We=a.relatedTarget||a.toElement,Oe=oe,We=We?Nr(We):null,We!==null&&(Vt=Ci(We),We!==Vt||We.tag!==5&&We.tag!==6)&&(We=null)):(Oe=null,We=oe),Oe!==We)){if(je=of,Ce="onMouseLeave",J="onMouseEnter",q="mouse",(n==="pointerout"||n==="pointerover")&&(je=lf,Ce="onPointerLeave",J="onPointerEnter",q="pointer"),Vt=Oe==null?ye:gs(Oe),ne=We==null?ye:gs(We),ye=new je(Ce,q+"leave",Oe,a,Ee),ye.target=Vt,ye.relatedTarget=ne,Ce=null,Nr(Ee)===oe&&(je=new je(J,q+"enter",We,a,Ee),je.target=ne,je.relatedTarget=Vt,Ce=je),Vt=Ce,Oe&&We)t:{for(je=Oe,J=We,q=0,ne=je;ne;ne=ps(ne))q++;for(ne=0,Ce=J;Ce;Ce=ps(Ce))ne++;for(;0<q-ne;)je=ps(je),q--;for(;0<ne-q;)J=ps(J),ne--;for(;q--;){if(je===J||J!==null&&je===J.alternate)break t;je=ps(je),J=ps(J)}je=null}else je=null;Oe!==null&&Uf(we,ye,Oe,je,!1),We!==null&&Vt!==null&&Uf(we,Vt,We,je,!0)}}e:{if(ye=oe?gs(oe):window,Oe=ye.nodeName&&ye.nodeName.toLowerCase(),Oe==="select"||Oe==="input"&&ye.type==="file")var Xe=j0;else if(pf(ye))if(gf)Xe=$0;else{Xe=Y0;var Ze=X0}else(Oe=ye.nodeName)&&Oe.toLowerCase()==="input"&&(ye.type==="checkbox"||ye.type==="radio")&&(Xe=q0);if(Xe&&(Xe=Xe(n,oe))){mf(we,Xe,a,Ee);break e}Ze&&Ze(n,ye,oe),n==="focusout"&&(Ze=ye._wrapperState)&&Ze.controlled&&ye.type==="number"&&P(ye,"number",ye.value)}switch(Ze=oe?gs(oe):window,n){case"focusin":(pf(Ze)||Ze.contentEditable==="true")&&(fs=Ze,vc=oe,Eo=null);break;case"focusout":Eo=vc=fs=null;break;case"mousedown":_c=!0;break;case"contextmenu":case"mouseup":case"dragend":_c=!1,Tf(we,a,Ee);break;case"selectionchange":if(Q0)break;case"keydown":case"keyup":Tf(we,a,Ee)}var Qe;if(hc)e:{switch(n){case"compositionstart":var st="onCompositionStart";break e;case"compositionend":st="onCompositionEnd";break e;case"compositionupdate":st="onCompositionUpdate";break e}st=void 0}else ds?ff(n,a)&&(st="onCompositionEnd"):n==="keydown"&&a.keyCode===229&&(st="onCompositionStart");st&&(cf&&a.locale!=="ko"&&(ds||st!=="onCompositionStart"?st==="onCompositionEnd"&&ds&&(Qe=rf()):(er=Ee,ac="value"in er?er.value:er.textContent,ds=!0)),Ze=Ra(oe,st),0<Ze.length&&(st=new af(st,n,null,a,Ee),we.push({event:st,listeners:Ze}),Qe?st.data=Qe:(Qe=hf(a),Qe!==null&&(st.data=Qe)))),(Qe=z0?H0(n,a):G0(n,a))&&(oe=Ra(oe,"onBeforeInput"),0<oe.length&&(Ee=new af("onBeforeInput","beforeinput",null,a,Ee),we.push({event:Ee,listeners:oe}),Ee.data=Qe))}If(we,i)})}function Ao(n,i,a){return{instance:n,listener:i,currentTarget:a}}function Ra(n,i){for(var a=i+"Capture",c=[];n!==null;){var h=n,v=h.stateNode;h.tag===5&&v!==null&&(h=v,v=yt(n,a),v!=null&&c.unshift(Ao(n,v,h)),v=yt(n,i),v!=null&&c.push(Ao(n,v,h))),n=n.return}return c}function ps(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function Uf(n,i,a,c,h){for(var v=i._reactName,T=[];a!==null&&a!==c;){var F=a,j=F.alternate,oe=F.stateNode;if(j!==null&&j===c)break;F.tag===5&&oe!==null&&(F=oe,h?(j=yt(a,v),j!=null&&T.unshift(Ao(a,j,F))):h||(j=yt(a,v),j!=null&&T.push(Ao(a,j,F)))),a=a.return}T.length!==0&&n.push({event:i,listeners:T})}var nv=/\r\n?/g,iv=/\u0000|\uFFFD/g;function Of(n){return(typeof n=="string"?n:""+n).replace(nv,`
`).replace(iv,"")}function ba(n,i,a){if(i=Of(i),Of(n)!==i&&a)throw Error(t(425))}function La(){}var Tc=null,wc=null;function Ac(n,i){return n==="textarea"||n==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var Cc=typeof setTimeout=="function"?setTimeout:void 0,rv=typeof clearTimeout=="function"?clearTimeout:void 0,Ff=typeof Promise=="function"?Promise:void 0,sv=typeof queueMicrotask=="function"?queueMicrotask:typeof Ff<"u"?function(n){return Ff.resolve(null).then(n).catch(ov)}:Cc;function ov(n){setTimeout(function(){throw n})}function Rc(n,i){var a=i,c=0;do{var h=a.nextSibling;if(n.removeChild(a),h&&h.nodeType===8)if(a=h.data,a==="/$"){if(c===0){n.removeChild(h),go(i);return}c--}else a!=="$"&&a!=="$?"&&a!=="$!"||c++;a=h}while(a);go(i)}function nr(n){for(;n!=null;n=n.nextSibling){var i=n.nodeType;if(i===1||i===3)break;if(i===8){if(i=n.data,i==="$"||i==="$!"||i==="$?")break;if(i==="/$")return null}}return n}function kf(n){n=n.previousSibling;for(var i=0;n;){if(n.nodeType===8){var a=n.data;if(a==="$"||a==="$!"||a==="$?"){if(i===0)return n;i--}else a==="/$"&&i++}n=n.previousSibling}return null}var ms=Math.random().toString(36).slice(2),_i="__reactFiber$"+ms,Co="__reactProps$"+ms,bi="__reactContainer$"+ms,bc="__reactEvents$"+ms,av="__reactListeners$"+ms,lv="__reactHandles$"+ms;function Nr(n){var i=n[_i];if(i)return i;for(var a=n.parentNode;a;){if(i=a[bi]||a[_i]){if(a=i.alternate,i.child!==null||a!==null&&a.child!==null)for(n=kf(n);n!==null;){if(a=n[_i])return a;n=kf(n)}return i}n=a,a=n.parentNode}return null}function Ro(n){return n=n[_i]||n[bi],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function gs(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(t(33))}function Pa(n){return n[Co]||null}var Lc=[],vs=-1;function ir(n){return{current:n}}function Dt(n){0>vs||(n.current=Lc[vs],Lc[vs]=null,vs--)}function Lt(n,i){vs++,Lc[vs]=n.current,n.current=i}var rr={},fn=ir(rr),bn=ir(!1),Ur=rr;function _s(n,i){var a=n.type.contextTypes;if(!a)return rr;var c=n.stateNode;if(c&&c.__reactInternalMemoizedUnmaskedChildContext===i)return c.__reactInternalMemoizedMaskedChildContext;var h={},v;for(v in a)h[v]=i[v];return c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=i,n.__reactInternalMemoizedMaskedChildContext=h),h}function Ln(n){return n=n.childContextTypes,n!=null}function Da(){Dt(bn),Dt(fn)}function Bf(n,i,a){if(fn.current!==rr)throw Error(t(168));Lt(fn,i),Lt(bn,a)}function zf(n,i,a){var c=n.stateNode;if(i=i.childContextTypes,typeof c.getChildContext!="function")return a;c=c.getChildContext();for(var h in c)if(!(h in i))throw Error(t(108,Me(n)||"Unknown",h));return W({},a,c)}function Ia(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||rr,Ur=fn.current,Lt(fn,n),Lt(bn,bn.current),!0}function Hf(n,i,a){var c=n.stateNode;if(!c)throw Error(t(169));a?(n=zf(n,i,Ur),c.__reactInternalMemoizedMergedChildContext=n,Dt(bn),Dt(fn),Lt(fn,n)):Dt(bn),Lt(bn,a)}var Li=null,Na=!1,Pc=!1;function Gf(n){Li===null?Li=[n]:Li.push(n)}function cv(n){Na=!0,Gf(n)}function sr(){if(!Pc&&Li!==null){Pc=!0;var n=0,i=At;try{var a=Li;for(At=1;n<a.length;n++){var c=a[n];do c=c(!0);while(c!==null)}Li=null,Na=!1}catch(h){throw Li!==null&&(Li=Li.slice(n+1)),ae(ot,sr),h}finally{At=i,Pc=!1}}return null}var xs=[],ys=0,Ua=null,Oa=0,$n=[],Kn=0,Or=null,Pi=1,Di="";function Fr(n,i){xs[ys++]=Oa,xs[ys++]=Ua,Ua=n,Oa=i}function Vf(n,i,a){$n[Kn++]=Pi,$n[Kn++]=Di,$n[Kn++]=Or,Or=n;var c=Pi;n=Di;var h=32-yn(c)-1;c&=~(1<<h),a+=1;var v=32-yn(i)+h;if(30<v){var T=h-h%5;v=(c&(1<<T)-1).toString(32),c>>=T,h-=T,Pi=1<<32-yn(i)+h|a<<h|c,Di=v+n}else Pi=1<<v|a<<h|c,Di=n}function Dc(n){n.return!==null&&(Fr(n,1),Vf(n,1,0))}function Ic(n){for(;n===Ua;)Ua=xs[--ys],xs[ys]=null,Oa=xs[--ys],xs[ys]=null;for(;n===Or;)Or=$n[--Kn],$n[Kn]=null,Di=$n[--Kn],$n[Kn]=null,Pi=$n[--Kn],$n[Kn]=null}var Vn=null,Wn=null,Ut=!1,oi=null;function Wf(n,i){var a=ei(5,null,null,0);a.elementType="DELETED",a.stateNode=i,a.return=n,i=n.deletions,i===null?(n.deletions=[a],n.flags|=16):i.push(a)}function jf(n,i){switch(n.tag){case 5:var a=n.type;return i=i.nodeType!==1||a.toLowerCase()!==i.nodeName.toLowerCase()?null:i,i!==null?(n.stateNode=i,Vn=n,Wn=nr(i.firstChild),!0):!1;case 6:return i=n.pendingProps===""||i.nodeType!==3?null:i,i!==null?(n.stateNode=i,Vn=n,Wn=null,!0):!1;case 13:return i=i.nodeType!==8?null:i,i!==null?(a=Or!==null?{id:Pi,overflow:Di}:null,n.memoizedState={dehydrated:i,treeContext:a,retryLane:1073741824},a=ei(18,null,null,0),a.stateNode=i,a.return=n,n.child=a,Vn=n,Wn=null,!0):!1;default:return!1}}function Nc(n){return(n.mode&1)!==0&&(n.flags&128)===0}function Uc(n){if(Ut){var i=Wn;if(i){var a=i;if(!jf(n,i)){if(Nc(n))throw Error(t(418));i=nr(a.nextSibling);var c=Vn;i&&jf(n,i)?Wf(c,a):(n.flags=n.flags&-4097|2,Ut=!1,Vn=n)}}else{if(Nc(n))throw Error(t(418));n.flags=n.flags&-4097|2,Ut=!1,Vn=n}}}function Xf(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;Vn=n}function Fa(n){if(n!==Vn)return!1;if(!Ut)return Xf(n),Ut=!0,!1;var i;if((i=n.tag!==3)&&!(i=n.tag!==5)&&(i=n.type,i=i!=="head"&&i!=="body"&&!Ac(n.type,n.memoizedProps)),i&&(i=Wn)){if(Nc(n))throw Yf(),Error(t(418));for(;i;)Wf(n,i),i=nr(i.nextSibling)}if(Xf(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(t(317));e:{for(n=n.nextSibling,i=0;n;){if(n.nodeType===8){var a=n.data;if(a==="/$"){if(i===0){Wn=nr(n.nextSibling);break e}i--}else a!=="$"&&a!=="$!"&&a!=="$?"||i++}n=n.nextSibling}Wn=null}}else Wn=Vn?nr(n.stateNode.nextSibling):null;return!0}function Yf(){for(var n=Wn;n;)n=nr(n.nextSibling)}function Ss(){Wn=Vn=null,Ut=!1}function Oc(n){oi===null?oi=[n]:oi.push(n)}var uv=b.ReactCurrentBatchConfig;function bo(n,i,a){if(n=a.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(a._owner){if(a=a._owner,a){if(a.tag!==1)throw Error(t(309));var c=a.stateNode}if(!c)throw Error(t(147,n));var h=c,v=""+n;return i!==null&&i.ref!==null&&typeof i.ref=="function"&&i.ref._stringRef===v?i.ref:(i=function(T){var F=h.refs;T===null?delete F[v]:F[v]=T},i._stringRef=v,i)}if(typeof n!="string")throw Error(t(284));if(!a._owner)throw Error(t(290,n))}return n}function ka(n,i){throw n=Object.prototype.toString.call(i),Error(t(31,n==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":n))}function qf(n){var i=n._init;return i(n._payload)}function $f(n){function i(J,q){if(n){var ne=J.deletions;ne===null?(J.deletions=[q],J.flags|=16):ne.push(q)}}function a(J,q){if(!n)return null;for(;q!==null;)i(J,q),q=q.sibling;return null}function c(J,q){for(J=new Map;q!==null;)q.key!==null?J.set(q.key,q):J.set(q.index,q),q=q.sibling;return J}function h(J,q){return J=hr(J,q),J.index=0,J.sibling=null,J}function v(J,q,ne){return J.index=ne,n?(ne=J.alternate,ne!==null?(ne=ne.index,ne<q?(J.flags|=2,q):ne):(J.flags|=2,q)):(J.flags|=1048576,q)}function T(J){return n&&J.alternate===null&&(J.flags|=2),J}function F(J,q,ne,Ce){return q===null||q.tag!==6?(q=Cu(ne,J.mode,Ce),q.return=J,q):(q=h(q,ne),q.return=J,q)}function j(J,q,ne,Ce){var Xe=ne.type;return Xe===N?Ee(J,q,ne.props.children,Ce,ne.key):q!==null&&(q.elementType===Xe||typeof Xe=="object"&&Xe!==null&&Xe.$$typeof===$&&qf(Xe)===q.type)?(Ce=h(q,ne.props),Ce.ref=bo(J,q,ne),Ce.return=J,Ce):(Ce=ll(ne.type,ne.key,ne.props,null,J.mode,Ce),Ce.ref=bo(J,q,ne),Ce.return=J,Ce)}function oe(J,q,ne,Ce){return q===null||q.tag!==4||q.stateNode.containerInfo!==ne.containerInfo||q.stateNode.implementation!==ne.implementation?(q=Ru(ne,J.mode,Ce),q.return=J,q):(q=h(q,ne.children||[]),q.return=J,q)}function Ee(J,q,ne,Ce,Xe){return q===null||q.tag!==7?(q=jr(ne,J.mode,Ce,Xe),q.return=J,q):(q=h(q,ne),q.return=J,q)}function we(J,q,ne){if(typeof q=="string"&&q!==""||typeof q=="number")return q=Cu(""+q,J.mode,ne),q.return=J,q;if(typeof q=="object"&&q!==null){switch(q.$$typeof){case z:return ne=ll(q.type,q.key,q.props,null,J.mode,ne),ne.ref=bo(J,null,q),ne.return=J,ne;case k:return q=Ru(q,J.mode,ne),q.return=J,q;case $:var Ce=q._init;return we(J,Ce(q._payload),ne)}if(A(q)||Y(q))return q=jr(q,J.mode,ne,null),q.return=J,q;ka(J,q)}return null}function ye(J,q,ne,Ce){var Xe=q!==null?q.key:null;if(typeof ne=="string"&&ne!==""||typeof ne=="number")return Xe!==null?null:F(J,q,""+ne,Ce);if(typeof ne=="object"&&ne!==null){switch(ne.$$typeof){case z:return ne.key===Xe?j(J,q,ne,Ce):null;case k:return ne.key===Xe?oe(J,q,ne,Ce):null;case $:return Xe=ne._init,ye(J,q,Xe(ne._payload),Ce)}if(A(ne)||Y(ne))return Xe!==null?null:Ee(J,q,ne,Ce,null);ka(J,ne)}return null}function Oe(J,q,ne,Ce,Xe){if(typeof Ce=="string"&&Ce!==""||typeof Ce=="number")return J=J.get(ne)||null,F(q,J,""+Ce,Xe);if(typeof Ce=="object"&&Ce!==null){switch(Ce.$$typeof){case z:return J=J.get(Ce.key===null?ne:Ce.key)||null,j(q,J,Ce,Xe);case k:return J=J.get(Ce.key===null?ne:Ce.key)||null,oe(q,J,Ce,Xe);case $:var Ze=Ce._init;return Oe(J,q,ne,Ze(Ce._payload),Xe)}if(A(Ce)||Y(Ce))return J=J.get(ne)||null,Ee(q,J,Ce,Xe,null);ka(q,Ce)}return null}function We(J,q,ne,Ce){for(var Xe=null,Ze=null,Qe=q,st=q=0,nn=null;Qe!==null&&st<ne.length;st++){Qe.index>st?(nn=Qe,Qe=null):nn=Qe.sibling;var St=ye(J,Qe,ne[st],Ce);if(St===null){Qe===null&&(Qe=nn);break}n&&Qe&&St.alternate===null&&i(J,Qe),q=v(St,q,st),Ze===null?Xe=St:Ze.sibling=St,Ze=St,Qe=nn}if(st===ne.length)return a(J,Qe),Ut&&Fr(J,st),Xe;if(Qe===null){for(;st<ne.length;st++)Qe=we(J,ne[st],Ce),Qe!==null&&(q=v(Qe,q,st),Ze===null?Xe=Qe:Ze.sibling=Qe,Ze=Qe);return Ut&&Fr(J,st),Xe}for(Qe=c(J,Qe);st<ne.length;st++)nn=Oe(Qe,J,st,ne[st],Ce),nn!==null&&(n&&nn.alternate!==null&&Qe.delete(nn.key===null?st:nn.key),q=v(nn,q,st),Ze===null?Xe=nn:Ze.sibling=nn,Ze=nn);return n&&Qe.forEach(function(pr){return i(J,pr)}),Ut&&Fr(J,st),Xe}function je(J,q,ne,Ce){var Xe=Y(ne);if(typeof Xe!="function")throw Error(t(150));if(ne=Xe.call(ne),ne==null)throw Error(t(151));for(var Ze=Xe=null,Qe=q,st=q=0,nn=null,St=ne.next();Qe!==null&&!St.done;st++,St=ne.next()){Qe.index>st?(nn=Qe,Qe=null):nn=Qe.sibling;var pr=ye(J,Qe,St.value,Ce);if(pr===null){Qe===null&&(Qe=nn);break}n&&Qe&&pr.alternate===null&&i(J,Qe),q=v(pr,q,st),Ze===null?Xe=pr:Ze.sibling=pr,Ze=pr,Qe=nn}if(St.done)return a(J,Qe),Ut&&Fr(J,st),Xe;if(Qe===null){for(;!St.done;st++,St=ne.next())St=we(J,St.value,Ce),St!==null&&(q=v(St,q,st),Ze===null?Xe=St:Ze.sibling=St,Ze=St);return Ut&&Fr(J,st),Xe}for(Qe=c(J,Qe);!St.done;st++,St=ne.next())St=Oe(Qe,J,st,St.value,Ce),St!==null&&(n&&St.alternate!==null&&Qe.delete(St.key===null?st:St.key),q=v(St,q,st),Ze===null?Xe=St:Ze.sibling=St,Ze=St);return n&&Qe.forEach(function(Vv){return i(J,Vv)}),Ut&&Fr(J,st),Xe}function Vt(J,q,ne,Ce){if(typeof ne=="object"&&ne!==null&&ne.type===N&&ne.key===null&&(ne=ne.props.children),typeof ne=="object"&&ne!==null){switch(ne.$$typeof){case z:e:{for(var Xe=ne.key,Ze=q;Ze!==null;){if(Ze.key===Xe){if(Xe=ne.type,Xe===N){if(Ze.tag===7){a(J,Ze.sibling),q=h(Ze,ne.props.children),q.return=J,J=q;break e}}else if(Ze.elementType===Xe||typeof Xe=="object"&&Xe!==null&&Xe.$$typeof===$&&qf(Xe)===Ze.type){a(J,Ze.sibling),q=h(Ze,ne.props),q.ref=bo(J,Ze,ne),q.return=J,J=q;break e}a(J,Ze);break}else i(J,Ze);Ze=Ze.sibling}ne.type===N?(q=jr(ne.props.children,J.mode,Ce,ne.key),q.return=J,J=q):(Ce=ll(ne.type,ne.key,ne.props,null,J.mode,Ce),Ce.ref=bo(J,q,ne),Ce.return=J,J=Ce)}return T(J);case k:e:{for(Ze=ne.key;q!==null;){if(q.key===Ze)if(q.tag===4&&q.stateNode.containerInfo===ne.containerInfo&&q.stateNode.implementation===ne.implementation){a(J,q.sibling),q=h(q,ne.children||[]),q.return=J,J=q;break e}else{a(J,q);break}else i(J,q);q=q.sibling}q=Ru(ne,J.mode,Ce),q.return=J,J=q}return T(J);case $:return Ze=ne._init,Vt(J,q,Ze(ne._payload),Ce)}if(A(ne))return We(J,q,ne,Ce);if(Y(ne))return je(J,q,ne,Ce);ka(J,ne)}return typeof ne=="string"&&ne!==""||typeof ne=="number"?(ne=""+ne,q!==null&&q.tag===6?(a(J,q.sibling),q=h(q,ne),q.return=J,J=q):(a(J,q),q=Cu(ne,J.mode,Ce),q.return=J,J=q),T(J)):a(J,q)}return Vt}var Ms=$f(!0),Kf=$f(!1),Ba=ir(null),za=null,Es=null,Fc=null;function kc(){Fc=Es=za=null}function Bc(n){var i=Ba.current;Dt(Ba),n._currentValue=i}function zc(n,i,a){for(;n!==null;){var c=n.alternate;if((n.childLanes&i)!==i?(n.childLanes|=i,c!==null&&(c.childLanes|=i)):c!==null&&(c.childLanes&i)!==i&&(c.childLanes|=i),n===a)break;n=n.return}}function Ts(n,i){za=n,Fc=Es=null,n=n.dependencies,n!==null&&n.firstContext!==null&&((n.lanes&i)!==0&&(Pn=!0),n.firstContext=null)}function Zn(n){var i=n._currentValue;if(Fc!==n)if(n={context:n,memoizedValue:i,next:null},Es===null){if(za===null)throw Error(t(308));Es=n,za.dependencies={lanes:0,firstContext:n}}else Es=Es.next=n;return i}var kr=null;function Hc(n){kr===null?kr=[n]:kr.push(n)}function Zf(n,i,a,c){var h=i.interleaved;return h===null?(a.next=a,Hc(i)):(a.next=h.next,h.next=a),i.interleaved=a,Ii(n,c)}function Ii(n,i){n.lanes|=i;var a=n.alternate;for(a!==null&&(a.lanes|=i),a=n,n=n.return;n!==null;)n.childLanes|=i,a=n.alternate,a!==null&&(a.childLanes|=i),a=n,n=n.return;return a.tag===3?a.stateNode:null}var or=!1;function Gc(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Qf(n,i){n=n.updateQueue,i.updateQueue===n&&(i.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function Ni(n,i){return{eventTime:n,lane:i,tag:0,payload:null,callback:null,next:null}}function ar(n,i,a){var c=n.updateQueue;if(c===null)return null;if(c=c.shared,(xt&2)!==0){var h=c.pending;return h===null?i.next=i:(i.next=h.next,h.next=i),c.pending=i,Ii(n,a)}return h=c.interleaved,h===null?(i.next=i,Hc(c)):(i.next=h.next,h.next=i),c.interleaved=i,Ii(n,a)}function Ha(n,i,a){if(i=i.updateQueue,i!==null&&(i=i.shared,(a&4194240)!==0)){var c=i.lanes;c&=n.pendingLanes,a|=c,i.lanes=a,nc(n,a)}}function Jf(n,i){var a=n.updateQueue,c=n.alternate;if(c!==null&&(c=c.updateQueue,a===c)){var h=null,v=null;if(a=a.firstBaseUpdate,a!==null){do{var T={eventTime:a.eventTime,lane:a.lane,tag:a.tag,payload:a.payload,callback:a.callback,next:null};v===null?h=v=T:v=v.next=T,a=a.next}while(a!==null);v===null?h=v=i:v=v.next=i}else h=v=i;a={baseState:c.baseState,firstBaseUpdate:h,lastBaseUpdate:v,shared:c.shared,effects:c.effects},n.updateQueue=a;return}n=a.lastBaseUpdate,n===null?a.firstBaseUpdate=i:n.next=i,a.lastBaseUpdate=i}function Ga(n,i,a,c){var h=n.updateQueue;or=!1;var v=h.firstBaseUpdate,T=h.lastBaseUpdate,F=h.shared.pending;if(F!==null){h.shared.pending=null;var j=F,oe=j.next;j.next=null,T===null?v=oe:T.next=oe,T=j;var Ee=n.alternate;Ee!==null&&(Ee=Ee.updateQueue,F=Ee.lastBaseUpdate,F!==T&&(F===null?Ee.firstBaseUpdate=oe:F.next=oe,Ee.lastBaseUpdate=j))}if(v!==null){var we=h.baseState;T=0,Ee=oe=j=null,F=v;do{var ye=F.lane,Oe=F.eventTime;if((c&ye)===ye){Ee!==null&&(Ee=Ee.next={eventTime:Oe,lane:0,tag:F.tag,payload:F.payload,callback:F.callback,next:null});e:{var We=n,je=F;switch(ye=i,Oe=a,je.tag){case 1:if(We=je.payload,typeof We=="function"){we=We.call(Oe,we,ye);break e}we=We;break e;case 3:We.flags=We.flags&-65537|128;case 0:if(We=je.payload,ye=typeof We=="function"?We.call(Oe,we,ye):We,ye==null)break e;we=W({},we,ye);break e;case 2:or=!0}}F.callback!==null&&F.lane!==0&&(n.flags|=64,ye=h.effects,ye===null?h.effects=[F]:ye.push(F))}else Oe={eventTime:Oe,lane:ye,tag:F.tag,payload:F.payload,callback:F.callback,next:null},Ee===null?(oe=Ee=Oe,j=we):Ee=Ee.next=Oe,T|=ye;if(F=F.next,F===null){if(F=h.shared.pending,F===null)break;ye=F,F=ye.next,ye.next=null,h.lastBaseUpdate=ye,h.shared.pending=null}}while(!0);if(Ee===null&&(j=we),h.baseState=j,h.firstBaseUpdate=oe,h.lastBaseUpdate=Ee,i=h.shared.interleaved,i!==null){h=i;do T|=h.lane,h=h.next;while(h!==i)}else v===null&&(h.shared.lanes=0);Hr|=T,n.lanes=T,n.memoizedState=we}}function eh(n,i,a){if(n=i.effects,i.effects=null,n!==null)for(i=0;i<n.length;i++){var c=n[i],h=c.callback;if(h!==null){if(c.callback=null,c=a,typeof h!="function")throw Error(t(191,h));h.call(c)}}}var Lo={},xi=ir(Lo),Po=ir(Lo),Do=ir(Lo);function Br(n){if(n===Lo)throw Error(t(174));return n}function Vc(n,i){switch(Lt(Do,i),Lt(Po,n),Lt(xi,Lo),n=i.nodeType,n){case 9:case 11:i=(i=i.documentElement)?i.namespaceURI:ze(null,"");break;default:n=n===8?i.parentNode:i,i=n.namespaceURI||null,n=n.tagName,i=ze(i,n)}Dt(xi),Lt(xi,i)}function ws(){Dt(xi),Dt(Po),Dt(Do)}function th(n){Br(Do.current);var i=Br(xi.current),a=ze(i,n.type);i!==a&&(Lt(Po,n),Lt(xi,a))}function Wc(n){Po.current===n&&(Dt(xi),Dt(Po))}var Ft=ir(0);function Va(n){for(var i=n;i!==null;){if(i.tag===13){var a=i.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||a.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var jc=[];function Xc(){for(var n=0;n<jc.length;n++)jc[n]._workInProgressVersionPrimary=null;jc.length=0}var Wa=b.ReactCurrentDispatcher,Yc=b.ReactCurrentBatchConfig,zr=0,kt=null,qt=null,en=null,ja=!1,Io=!1,No=0,dv=0;function hn(){throw Error(t(321))}function qc(n,i){if(i===null)return!1;for(var a=0;a<i.length&&a<n.length;a++)if(!si(n[a],i[a]))return!1;return!0}function $c(n,i,a,c,h,v){if(zr=v,kt=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,Wa.current=n===null||n.memoizedState===null?mv:gv,n=a(c,h),Io){v=0;do{if(Io=!1,No=0,25<=v)throw Error(t(301));v+=1,en=qt=null,i.updateQueue=null,Wa.current=vv,n=a(c,h)}while(Io)}if(Wa.current=qa,i=qt!==null&&qt.next!==null,zr=0,en=qt=kt=null,ja=!1,i)throw Error(t(300));return n}function Kc(){var n=No!==0;return No=0,n}function yi(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return en===null?kt.memoizedState=en=n:en=en.next=n,en}function Qn(){if(qt===null){var n=kt.alternate;n=n!==null?n.memoizedState:null}else n=qt.next;var i=en===null?kt.memoizedState:en.next;if(i!==null)en=i,qt=n;else{if(n===null)throw Error(t(310));qt=n,n={memoizedState:qt.memoizedState,baseState:qt.baseState,baseQueue:qt.baseQueue,queue:qt.queue,next:null},en===null?kt.memoizedState=en=n:en=en.next=n}return en}function Uo(n,i){return typeof i=="function"?i(n):i}function Zc(n){var i=Qn(),a=i.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var c=qt,h=c.baseQueue,v=a.pending;if(v!==null){if(h!==null){var T=h.next;h.next=v.next,v.next=T}c.baseQueue=h=v,a.pending=null}if(h!==null){v=h.next,c=c.baseState;var F=T=null,j=null,oe=v;do{var Ee=oe.lane;if((zr&Ee)===Ee)j!==null&&(j=j.next={lane:0,action:oe.action,hasEagerState:oe.hasEagerState,eagerState:oe.eagerState,next:null}),c=oe.hasEagerState?oe.eagerState:n(c,oe.action);else{var we={lane:Ee,action:oe.action,hasEagerState:oe.hasEagerState,eagerState:oe.eagerState,next:null};j===null?(F=j=we,T=c):j=j.next=we,kt.lanes|=Ee,Hr|=Ee}oe=oe.next}while(oe!==null&&oe!==v);j===null?T=c:j.next=F,si(c,i.memoizedState)||(Pn=!0),i.memoizedState=c,i.baseState=T,i.baseQueue=j,a.lastRenderedState=c}if(n=a.interleaved,n!==null){h=n;do v=h.lane,kt.lanes|=v,Hr|=v,h=h.next;while(h!==n)}else h===null&&(a.lanes=0);return[i.memoizedState,a.dispatch]}function Qc(n){var i=Qn(),a=i.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var c=a.dispatch,h=a.pending,v=i.memoizedState;if(h!==null){a.pending=null;var T=h=h.next;do v=n(v,T.action),T=T.next;while(T!==h);si(v,i.memoizedState)||(Pn=!0),i.memoizedState=v,i.baseQueue===null&&(i.baseState=v),a.lastRenderedState=v}return[v,c]}function nh(){}function ih(n,i){var a=kt,c=Qn(),h=i(),v=!si(c.memoizedState,h);if(v&&(c.memoizedState=h,Pn=!0),c=c.queue,Jc(oh.bind(null,a,c,n),[n]),c.getSnapshot!==i||v||en!==null&&en.memoizedState.tag&1){if(a.flags|=2048,Oo(9,sh.bind(null,a,c,h,i),void 0,null),tn===null)throw Error(t(349));(zr&30)!==0||rh(a,i,h)}return h}function rh(n,i,a){n.flags|=16384,n={getSnapshot:i,value:a},i=kt.updateQueue,i===null?(i={lastEffect:null,stores:null},kt.updateQueue=i,i.stores=[n]):(a=i.stores,a===null?i.stores=[n]:a.push(n))}function sh(n,i,a,c){i.value=a,i.getSnapshot=c,ah(i)&&lh(n)}function oh(n,i,a){return a(function(){ah(i)&&lh(n)})}function ah(n){var i=n.getSnapshot;n=n.value;try{var a=i();return!si(n,a)}catch{return!0}}function lh(n){var i=Ii(n,1);i!==null&&ui(i,n,1,-1)}function ch(n){var i=yi();return typeof n=="function"&&(n=n()),i.memoizedState=i.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Uo,lastRenderedState:n},i.queue=n,n=n.dispatch=pv.bind(null,kt,n),[i.memoizedState,n]}function Oo(n,i,a,c){return n={tag:n,create:i,destroy:a,deps:c,next:null},i=kt.updateQueue,i===null?(i={lastEffect:null,stores:null},kt.updateQueue=i,i.lastEffect=n.next=n):(a=i.lastEffect,a===null?i.lastEffect=n.next=n:(c=a.next,a.next=n,n.next=c,i.lastEffect=n)),n}function uh(){return Qn().memoizedState}function Xa(n,i,a,c){var h=yi();kt.flags|=n,h.memoizedState=Oo(1|i,a,void 0,c===void 0?null:c)}function Ya(n,i,a,c){var h=Qn();c=c===void 0?null:c;var v=void 0;if(qt!==null){var T=qt.memoizedState;if(v=T.destroy,c!==null&&qc(c,T.deps)){h.memoizedState=Oo(i,a,v,c);return}}kt.flags|=n,h.memoizedState=Oo(1|i,a,v,c)}function dh(n,i){return Xa(8390656,8,n,i)}function Jc(n,i){return Ya(2048,8,n,i)}function fh(n,i){return Ya(4,2,n,i)}function hh(n,i){return Ya(4,4,n,i)}function ph(n,i){if(typeof i=="function")return n=n(),i(n),function(){i(null)};if(i!=null)return n=n(),i.current=n,function(){i.current=null}}function mh(n,i,a){return a=a!=null?a.concat([n]):null,Ya(4,4,ph.bind(null,i,n),a)}function eu(){}function gh(n,i){var a=Qn();i=i===void 0?null:i;var c=a.memoizedState;return c!==null&&i!==null&&qc(i,c[1])?c[0]:(a.memoizedState=[n,i],n)}function vh(n,i){var a=Qn();i=i===void 0?null:i;var c=a.memoizedState;return c!==null&&i!==null&&qc(i,c[1])?c[0]:(n=n(),a.memoizedState=[n,i],n)}function _h(n,i,a){return(zr&21)===0?(n.baseState&&(n.baseState=!1,Pn=!0),n.memoizedState=a):(si(a,i)||(a=ma(),kt.lanes|=a,Hr|=a,n.baseState=!0),i)}function fv(n,i){var a=At;At=a!==0&&4>a?a:4,n(!0);var c=Yc.transition;Yc.transition={};try{n(!1),i()}finally{At=a,Yc.transition=c}}function xh(){return Qn().memoizedState}function hv(n,i,a){var c=dr(n);if(a={lane:c,action:a,hasEagerState:!1,eagerState:null,next:null},yh(n))Sh(i,a);else if(a=Zf(n,i,a,c),a!==null){var h=Mn();ui(a,n,c,h),Mh(a,i,c)}}function pv(n,i,a){var c=dr(n),h={lane:c,action:a,hasEagerState:!1,eagerState:null,next:null};if(yh(n))Sh(i,h);else{var v=n.alternate;if(n.lanes===0&&(v===null||v.lanes===0)&&(v=i.lastRenderedReducer,v!==null))try{var T=i.lastRenderedState,F=v(T,a);if(h.hasEagerState=!0,h.eagerState=F,si(F,T)){var j=i.interleaved;j===null?(h.next=h,Hc(i)):(h.next=j.next,j.next=h),i.interleaved=h;return}}catch{}a=Zf(n,i,h,c),a!==null&&(h=Mn(),ui(a,n,c,h),Mh(a,i,c))}}function yh(n){var i=n.alternate;return n===kt||i!==null&&i===kt}function Sh(n,i){Io=ja=!0;var a=n.pending;a===null?i.next=i:(i.next=a.next,a.next=i),n.pending=i}function Mh(n,i,a){if((a&4194240)!==0){var c=i.lanes;c&=n.pendingLanes,a|=c,i.lanes=a,nc(n,a)}}var qa={readContext:Zn,useCallback:hn,useContext:hn,useEffect:hn,useImperativeHandle:hn,useInsertionEffect:hn,useLayoutEffect:hn,useMemo:hn,useReducer:hn,useRef:hn,useState:hn,useDebugValue:hn,useDeferredValue:hn,useTransition:hn,useMutableSource:hn,useSyncExternalStore:hn,useId:hn,unstable_isNewReconciler:!1},mv={readContext:Zn,useCallback:function(n,i){return yi().memoizedState=[n,i===void 0?null:i],n},useContext:Zn,useEffect:dh,useImperativeHandle:function(n,i,a){return a=a!=null?a.concat([n]):null,Xa(4194308,4,ph.bind(null,i,n),a)},useLayoutEffect:function(n,i){return Xa(4194308,4,n,i)},useInsertionEffect:function(n,i){return Xa(4,2,n,i)},useMemo:function(n,i){var a=yi();return i=i===void 0?null:i,n=n(),a.memoizedState=[n,i],n},useReducer:function(n,i,a){var c=yi();return i=a!==void 0?a(i):i,c.memoizedState=c.baseState=i,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:i},c.queue=n,n=n.dispatch=hv.bind(null,kt,n),[c.memoizedState,n]},useRef:function(n){var i=yi();return n={current:n},i.memoizedState=n},useState:ch,useDebugValue:eu,useDeferredValue:function(n){return yi().memoizedState=n},useTransition:function(){var n=ch(!1),i=n[0];return n=fv.bind(null,n[1]),yi().memoizedState=n,[i,n]},useMutableSource:function(){},useSyncExternalStore:function(n,i,a){var c=kt,h=yi();if(Ut){if(a===void 0)throw Error(t(407));a=a()}else{if(a=i(),tn===null)throw Error(t(349));(zr&30)!==0||rh(c,i,a)}h.memoizedState=a;var v={value:a,getSnapshot:i};return h.queue=v,dh(oh.bind(null,c,v,n),[n]),c.flags|=2048,Oo(9,sh.bind(null,c,v,a,i),void 0,null),a},useId:function(){var n=yi(),i=tn.identifierPrefix;if(Ut){var a=Di,c=Pi;a=(c&~(1<<32-yn(c)-1)).toString(32)+a,i=":"+i+"R"+a,a=No++,0<a&&(i+="H"+a.toString(32)),i+=":"}else a=dv++,i=":"+i+"r"+a.toString(32)+":";return n.memoizedState=i},unstable_isNewReconciler:!1},gv={readContext:Zn,useCallback:gh,useContext:Zn,useEffect:Jc,useImperativeHandle:mh,useInsertionEffect:fh,useLayoutEffect:hh,useMemo:vh,useReducer:Zc,useRef:uh,useState:function(){return Zc(Uo)},useDebugValue:eu,useDeferredValue:function(n){var i=Qn();return _h(i,qt.memoizedState,n)},useTransition:function(){var n=Zc(Uo)[0],i=Qn().memoizedState;return[n,i]},useMutableSource:nh,useSyncExternalStore:ih,useId:xh,unstable_isNewReconciler:!1},vv={readContext:Zn,useCallback:gh,useContext:Zn,useEffect:Jc,useImperativeHandle:mh,useInsertionEffect:fh,useLayoutEffect:hh,useMemo:vh,useReducer:Qc,useRef:uh,useState:function(){return Qc(Uo)},useDebugValue:eu,useDeferredValue:function(n){var i=Qn();return qt===null?i.memoizedState=n:_h(i,qt.memoizedState,n)},useTransition:function(){var n=Qc(Uo)[0],i=Qn().memoizedState;return[n,i]},useMutableSource:nh,useSyncExternalStore:ih,useId:xh,unstable_isNewReconciler:!1};function ai(n,i){if(n&&n.defaultProps){i=W({},i),n=n.defaultProps;for(var a in n)i[a]===void 0&&(i[a]=n[a]);return i}return i}function tu(n,i,a,c){i=n.memoizedState,a=a(c,i),a=a==null?i:W({},i,a),n.memoizedState=a,n.lanes===0&&(n.updateQueue.baseState=a)}var $a={isMounted:function(n){return(n=n._reactInternals)?Ci(n)===n:!1},enqueueSetState:function(n,i,a){n=n._reactInternals;var c=Mn(),h=dr(n),v=Ni(c,h);v.payload=i,a!=null&&(v.callback=a),i=ar(n,v,h),i!==null&&(ui(i,n,h,c),Ha(i,n,h))},enqueueReplaceState:function(n,i,a){n=n._reactInternals;var c=Mn(),h=dr(n),v=Ni(c,h);v.tag=1,v.payload=i,a!=null&&(v.callback=a),i=ar(n,v,h),i!==null&&(ui(i,n,h,c),Ha(i,n,h))},enqueueForceUpdate:function(n,i){n=n._reactInternals;var a=Mn(),c=dr(n),h=Ni(a,c);h.tag=2,i!=null&&(h.callback=i),i=ar(n,h,c),i!==null&&(ui(i,n,c,a),Ha(i,n,c))}};function Eh(n,i,a,c,h,v,T){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(c,v,T):i.prototype&&i.prototype.isPureReactComponent?!Mo(a,c)||!Mo(h,v):!0}function Th(n,i,a){var c=!1,h=rr,v=i.contextType;return typeof v=="object"&&v!==null?v=Zn(v):(h=Ln(i)?Ur:fn.current,c=i.contextTypes,v=(c=c!=null)?_s(n,h):rr),i=new i(a,v),n.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=$a,n.stateNode=i,i._reactInternals=n,c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=h,n.__reactInternalMemoizedMaskedChildContext=v),i}function wh(n,i,a,c){n=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(a,c),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(a,c),i.state!==n&&$a.enqueueReplaceState(i,i.state,null)}function nu(n,i,a,c){var h=n.stateNode;h.props=a,h.state=n.memoizedState,h.refs={},Gc(n);var v=i.contextType;typeof v=="object"&&v!==null?h.context=Zn(v):(v=Ln(i)?Ur:fn.current,h.context=_s(n,v)),h.state=n.memoizedState,v=i.getDerivedStateFromProps,typeof v=="function"&&(tu(n,i,v,a),h.state=n.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof h.getSnapshotBeforeUpdate=="function"||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(i=h.state,typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount(),i!==h.state&&$a.enqueueReplaceState(h,h.state,null),Ga(n,a,h,c),h.state=n.memoizedState),typeof h.componentDidMount=="function"&&(n.flags|=4194308)}function As(n,i){try{var a="",c=i;do a+=he(c),c=c.return;while(c);var h=a}catch(v){h=`
Error generating stack: `+v.message+`
`+v.stack}return{value:n,source:i,stack:h,digest:null}}function iu(n,i,a){return{value:n,source:null,stack:a??null,digest:i??null}}function ru(n,i){try{console.error(i.value)}catch(a){setTimeout(function(){throw a})}}var _v=typeof WeakMap=="function"?WeakMap:Map;function Ah(n,i,a){a=Ni(-1,a),a.tag=3,a.payload={element:null};var c=i.value;return a.callback=function(){nl||(nl=!0,xu=c),ru(n,i)},a}function Ch(n,i,a){a=Ni(-1,a),a.tag=3;var c=n.type.getDerivedStateFromError;if(typeof c=="function"){var h=i.value;a.payload=function(){return c(h)},a.callback=function(){ru(n,i)}}var v=n.stateNode;return v!==null&&typeof v.componentDidCatch=="function"&&(a.callback=function(){ru(n,i),typeof c!="function"&&(cr===null?cr=new Set([this]):cr.add(this));var T=i.stack;this.componentDidCatch(i.value,{componentStack:T!==null?T:""})}),a}function Rh(n,i,a){var c=n.pingCache;if(c===null){c=n.pingCache=new _v;var h=new Set;c.set(i,h)}else h=c.get(i),h===void 0&&(h=new Set,c.set(i,h));h.has(a)||(h.add(a),n=Dv.bind(null,n,i,a),i.then(n,n))}function bh(n){do{var i;if((i=n.tag===13)&&(i=n.memoizedState,i=i!==null?i.dehydrated!==null:!0),i)return n;n=n.return}while(n!==null);return null}function Lh(n,i,a,c,h){return(n.mode&1)===0?(n===i?n.flags|=65536:(n.flags|=128,a.flags|=131072,a.flags&=-52805,a.tag===1&&(a.alternate===null?a.tag=17:(i=Ni(-1,1),i.tag=2,ar(a,i,1))),a.lanes|=1),n):(n.flags|=65536,n.lanes=h,n)}var xv=b.ReactCurrentOwner,Pn=!1;function Sn(n,i,a,c){i.child=n===null?Kf(i,null,a,c):Ms(i,n.child,a,c)}function Ph(n,i,a,c,h){a=a.render;var v=i.ref;return Ts(i,h),c=$c(n,i,a,c,v,h),a=Kc(),n!==null&&!Pn?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~h,Ui(n,i,h)):(Ut&&a&&Dc(i),i.flags|=1,Sn(n,i,c,h),i.child)}function Dh(n,i,a,c,h){if(n===null){var v=a.type;return typeof v=="function"&&!Au(v)&&v.defaultProps===void 0&&a.compare===null&&a.defaultProps===void 0?(i.tag=15,i.type=v,Ih(n,i,v,c,h)):(n=ll(a.type,null,c,i,i.mode,h),n.ref=i.ref,n.return=i,i.child=n)}if(v=n.child,(n.lanes&h)===0){var T=v.memoizedProps;if(a=a.compare,a=a!==null?a:Mo,a(T,c)&&n.ref===i.ref)return Ui(n,i,h)}return i.flags|=1,n=hr(v,c),n.ref=i.ref,n.return=i,i.child=n}function Ih(n,i,a,c,h){if(n!==null){var v=n.memoizedProps;if(Mo(v,c)&&n.ref===i.ref)if(Pn=!1,i.pendingProps=c=v,(n.lanes&h)!==0)(n.flags&131072)!==0&&(Pn=!0);else return i.lanes=n.lanes,Ui(n,i,h)}return su(n,i,a,c,h)}function Nh(n,i,a){var c=i.pendingProps,h=c.children,v=n!==null?n.memoizedState:null;if(c.mode==="hidden")if((i.mode&1)===0)i.memoizedState={baseLanes:0,cachePool:null,transitions:null},Lt(Rs,jn),jn|=a;else{if((a&1073741824)===0)return n=v!==null?v.baseLanes|a:a,i.lanes=i.childLanes=1073741824,i.memoizedState={baseLanes:n,cachePool:null,transitions:null},i.updateQueue=null,Lt(Rs,jn),jn|=n,null;i.memoizedState={baseLanes:0,cachePool:null,transitions:null},c=v!==null?v.baseLanes:a,Lt(Rs,jn),jn|=c}else v!==null?(c=v.baseLanes|a,i.memoizedState=null):c=a,Lt(Rs,jn),jn|=c;return Sn(n,i,h,a),i.child}function Uh(n,i){var a=i.ref;(n===null&&a!==null||n!==null&&n.ref!==a)&&(i.flags|=512,i.flags|=2097152)}function su(n,i,a,c,h){var v=Ln(a)?Ur:fn.current;return v=_s(i,v),Ts(i,h),a=$c(n,i,a,c,v,h),c=Kc(),n!==null&&!Pn?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~h,Ui(n,i,h)):(Ut&&c&&Dc(i),i.flags|=1,Sn(n,i,a,h),i.child)}function Oh(n,i,a,c,h){if(Ln(a)){var v=!0;Ia(i)}else v=!1;if(Ts(i,h),i.stateNode===null)Za(n,i),Th(i,a,c),nu(i,a,c,h),c=!0;else if(n===null){var T=i.stateNode,F=i.memoizedProps;T.props=F;var j=T.context,oe=a.contextType;typeof oe=="object"&&oe!==null?oe=Zn(oe):(oe=Ln(a)?Ur:fn.current,oe=_s(i,oe));var Ee=a.getDerivedStateFromProps,we=typeof Ee=="function"||typeof T.getSnapshotBeforeUpdate=="function";we||typeof T.UNSAFE_componentWillReceiveProps!="function"&&typeof T.componentWillReceiveProps!="function"||(F!==c||j!==oe)&&wh(i,T,c,oe),or=!1;var ye=i.memoizedState;T.state=ye,Ga(i,c,T,h),j=i.memoizedState,F!==c||ye!==j||bn.current||or?(typeof Ee=="function"&&(tu(i,a,Ee,c),j=i.memoizedState),(F=or||Eh(i,a,F,c,ye,j,oe))?(we||typeof T.UNSAFE_componentWillMount!="function"&&typeof T.componentWillMount!="function"||(typeof T.componentWillMount=="function"&&T.componentWillMount(),typeof T.UNSAFE_componentWillMount=="function"&&T.UNSAFE_componentWillMount()),typeof T.componentDidMount=="function"&&(i.flags|=4194308)):(typeof T.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=c,i.memoizedState=j),T.props=c,T.state=j,T.context=oe,c=F):(typeof T.componentDidMount=="function"&&(i.flags|=4194308),c=!1)}else{T=i.stateNode,Qf(n,i),F=i.memoizedProps,oe=i.type===i.elementType?F:ai(i.type,F),T.props=oe,we=i.pendingProps,ye=T.context,j=a.contextType,typeof j=="object"&&j!==null?j=Zn(j):(j=Ln(a)?Ur:fn.current,j=_s(i,j));var Oe=a.getDerivedStateFromProps;(Ee=typeof Oe=="function"||typeof T.getSnapshotBeforeUpdate=="function")||typeof T.UNSAFE_componentWillReceiveProps!="function"&&typeof T.componentWillReceiveProps!="function"||(F!==we||ye!==j)&&wh(i,T,c,j),or=!1,ye=i.memoizedState,T.state=ye,Ga(i,c,T,h);var We=i.memoizedState;F!==we||ye!==We||bn.current||or?(typeof Oe=="function"&&(tu(i,a,Oe,c),We=i.memoizedState),(oe=or||Eh(i,a,oe,c,ye,We,j)||!1)?(Ee||typeof T.UNSAFE_componentWillUpdate!="function"&&typeof T.componentWillUpdate!="function"||(typeof T.componentWillUpdate=="function"&&T.componentWillUpdate(c,We,j),typeof T.UNSAFE_componentWillUpdate=="function"&&T.UNSAFE_componentWillUpdate(c,We,j)),typeof T.componentDidUpdate=="function"&&(i.flags|=4),typeof T.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof T.componentDidUpdate!="function"||F===n.memoizedProps&&ye===n.memoizedState||(i.flags|=4),typeof T.getSnapshotBeforeUpdate!="function"||F===n.memoizedProps&&ye===n.memoizedState||(i.flags|=1024),i.memoizedProps=c,i.memoizedState=We),T.props=c,T.state=We,T.context=j,c=oe):(typeof T.componentDidUpdate!="function"||F===n.memoizedProps&&ye===n.memoizedState||(i.flags|=4),typeof T.getSnapshotBeforeUpdate!="function"||F===n.memoizedProps&&ye===n.memoizedState||(i.flags|=1024),c=!1)}return ou(n,i,a,c,v,h)}function ou(n,i,a,c,h,v){Uh(n,i);var T=(i.flags&128)!==0;if(!c&&!T)return h&&Hf(i,a,!1),Ui(n,i,v);c=i.stateNode,xv.current=i;var F=T&&typeof a.getDerivedStateFromError!="function"?null:c.render();return i.flags|=1,n!==null&&T?(i.child=Ms(i,n.child,null,v),i.child=Ms(i,null,F,v)):Sn(n,i,F,v),i.memoizedState=c.state,h&&Hf(i,a,!0),i.child}function Fh(n){var i=n.stateNode;i.pendingContext?Bf(n,i.pendingContext,i.pendingContext!==i.context):i.context&&Bf(n,i.context,!1),Vc(n,i.containerInfo)}function kh(n,i,a,c,h){return Ss(),Oc(h),i.flags|=256,Sn(n,i,a,c),i.child}var au={dehydrated:null,treeContext:null,retryLane:0};function lu(n){return{baseLanes:n,cachePool:null,transitions:null}}function Bh(n,i,a){var c=i.pendingProps,h=Ft.current,v=!1,T=(i.flags&128)!==0,F;if((F=T)||(F=n!==null&&n.memoizedState===null?!1:(h&2)!==0),F?(v=!0,i.flags&=-129):(n===null||n.memoizedState!==null)&&(h|=1),Lt(Ft,h&1),n===null)return Uc(i),n=i.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?((i.mode&1)===0?i.lanes=1:n.data==="$!"?i.lanes=8:i.lanes=1073741824,null):(T=c.children,n=c.fallback,v?(c=i.mode,v=i.child,T={mode:"hidden",children:T},(c&1)===0&&v!==null?(v.childLanes=0,v.pendingProps=T):v=cl(T,c,0,null),n=jr(n,c,a,null),v.return=i,n.return=i,v.sibling=n,i.child=v,i.child.memoizedState=lu(a),i.memoizedState=au,n):cu(i,T));if(h=n.memoizedState,h!==null&&(F=h.dehydrated,F!==null))return yv(n,i,T,c,F,h,a);if(v){v=c.fallback,T=i.mode,h=n.child,F=h.sibling;var j={mode:"hidden",children:c.children};return(T&1)===0&&i.child!==h?(c=i.child,c.childLanes=0,c.pendingProps=j,i.deletions=null):(c=hr(h,j),c.subtreeFlags=h.subtreeFlags&14680064),F!==null?v=hr(F,v):(v=jr(v,T,a,null),v.flags|=2),v.return=i,c.return=i,c.sibling=v,i.child=c,c=v,v=i.child,T=n.child.memoizedState,T=T===null?lu(a):{baseLanes:T.baseLanes|a,cachePool:null,transitions:T.transitions},v.memoizedState=T,v.childLanes=n.childLanes&~a,i.memoizedState=au,c}return v=n.child,n=v.sibling,c=hr(v,{mode:"visible",children:c.children}),(i.mode&1)===0&&(c.lanes=a),c.return=i,c.sibling=null,n!==null&&(a=i.deletions,a===null?(i.deletions=[n],i.flags|=16):a.push(n)),i.child=c,i.memoizedState=null,c}function cu(n,i){return i=cl({mode:"visible",children:i},n.mode,0,null),i.return=n,n.child=i}function Ka(n,i,a,c){return c!==null&&Oc(c),Ms(i,n.child,null,a),n=cu(i,i.pendingProps.children),n.flags|=2,i.memoizedState=null,n}function yv(n,i,a,c,h,v,T){if(a)return i.flags&256?(i.flags&=-257,c=iu(Error(t(422))),Ka(n,i,T,c)):i.memoizedState!==null?(i.child=n.child,i.flags|=128,null):(v=c.fallback,h=i.mode,c=cl({mode:"visible",children:c.children},h,0,null),v=jr(v,h,T,null),v.flags|=2,c.return=i,v.return=i,c.sibling=v,i.child=c,(i.mode&1)!==0&&Ms(i,n.child,null,T),i.child.memoizedState=lu(T),i.memoizedState=au,v);if((i.mode&1)===0)return Ka(n,i,T,null);if(h.data==="$!"){if(c=h.nextSibling&&h.nextSibling.dataset,c)var F=c.dgst;return c=F,v=Error(t(419)),c=iu(v,c,void 0),Ka(n,i,T,c)}if(F=(T&n.childLanes)!==0,Pn||F){if(c=tn,c!==null){switch(T&-T){case 4:h=2;break;case 16:h=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:h=32;break;case 536870912:h=268435456;break;default:h=0}h=(h&(c.suspendedLanes|T))!==0?0:h,h!==0&&h!==v.retryLane&&(v.retryLane=h,Ii(n,h),ui(c,n,h,-1))}return wu(),c=iu(Error(t(421))),Ka(n,i,T,c)}return h.data==="$?"?(i.flags|=128,i.child=n.child,i=Iv.bind(null,n),h._reactRetry=i,null):(n=v.treeContext,Wn=nr(h.nextSibling),Vn=i,Ut=!0,oi=null,n!==null&&($n[Kn++]=Pi,$n[Kn++]=Di,$n[Kn++]=Or,Pi=n.id,Di=n.overflow,Or=i),i=cu(i,c.children),i.flags|=4096,i)}function zh(n,i,a){n.lanes|=i;var c=n.alternate;c!==null&&(c.lanes|=i),zc(n.return,i,a)}function uu(n,i,a,c,h){var v=n.memoizedState;v===null?n.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:c,tail:a,tailMode:h}:(v.isBackwards=i,v.rendering=null,v.renderingStartTime=0,v.last=c,v.tail=a,v.tailMode=h)}function Hh(n,i,a){var c=i.pendingProps,h=c.revealOrder,v=c.tail;if(Sn(n,i,c.children,a),c=Ft.current,(c&2)!==0)c=c&1|2,i.flags|=128;else{if(n!==null&&(n.flags&128)!==0)e:for(n=i.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&zh(n,a,i);else if(n.tag===19)zh(n,a,i);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===i)break e;for(;n.sibling===null;){if(n.return===null||n.return===i)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}c&=1}if(Lt(Ft,c),(i.mode&1)===0)i.memoizedState=null;else switch(h){case"forwards":for(a=i.child,h=null;a!==null;)n=a.alternate,n!==null&&Va(n)===null&&(h=a),a=a.sibling;a=h,a===null?(h=i.child,i.child=null):(h=a.sibling,a.sibling=null),uu(i,!1,h,a,v);break;case"backwards":for(a=null,h=i.child,i.child=null;h!==null;){if(n=h.alternate,n!==null&&Va(n)===null){i.child=h;break}n=h.sibling,h.sibling=a,a=h,h=n}uu(i,!0,a,null,v);break;case"together":uu(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function Za(n,i){(i.mode&1)===0&&n!==null&&(n.alternate=null,i.alternate=null,i.flags|=2)}function Ui(n,i,a){if(n!==null&&(i.dependencies=n.dependencies),Hr|=i.lanes,(a&i.childLanes)===0)return null;if(n!==null&&i.child!==n.child)throw Error(t(153));if(i.child!==null){for(n=i.child,a=hr(n,n.pendingProps),i.child=a,a.return=i;n.sibling!==null;)n=n.sibling,a=a.sibling=hr(n,n.pendingProps),a.return=i;a.sibling=null}return i.child}function Sv(n,i,a){switch(i.tag){case 3:Fh(i),Ss();break;case 5:th(i);break;case 1:Ln(i.type)&&Ia(i);break;case 4:Vc(i,i.stateNode.containerInfo);break;case 10:var c=i.type._context,h=i.memoizedProps.value;Lt(Ba,c._currentValue),c._currentValue=h;break;case 13:if(c=i.memoizedState,c!==null)return c.dehydrated!==null?(Lt(Ft,Ft.current&1),i.flags|=128,null):(a&i.child.childLanes)!==0?Bh(n,i,a):(Lt(Ft,Ft.current&1),n=Ui(n,i,a),n!==null?n.sibling:null);Lt(Ft,Ft.current&1);break;case 19:if(c=(a&i.childLanes)!==0,(n.flags&128)!==0){if(c)return Hh(n,i,a);i.flags|=128}if(h=i.memoizedState,h!==null&&(h.rendering=null,h.tail=null,h.lastEffect=null),Lt(Ft,Ft.current),c)break;return null;case 22:case 23:return i.lanes=0,Nh(n,i,a)}return Ui(n,i,a)}var Gh,du,Vh,Wh;Gh=function(n,i){for(var a=i.child;a!==null;){if(a.tag===5||a.tag===6)n.appendChild(a.stateNode);else if(a.tag!==4&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===i)break;for(;a.sibling===null;){if(a.return===null||a.return===i)return;a=a.return}a.sibling.return=a.return,a=a.sibling}},du=function(){},Vh=function(n,i,a,c){var h=n.memoizedProps;if(h!==c){n=i.stateNode,Br(xi.current);var v=null;switch(a){case"input":h=Fe(n,h),c=Fe(n,c),v=[];break;case"select":h=W({},h,{value:void 0}),c=W({},c,{value:void 0}),v=[];break;case"textarea":h=xe(n,h),c=xe(n,c),v=[];break;default:typeof h.onClick!="function"&&typeof c.onClick=="function"&&(n.onclick=La)}tt(a,c);var T;a=null;for(oe in h)if(!c.hasOwnProperty(oe)&&h.hasOwnProperty(oe)&&h[oe]!=null)if(oe==="style"){var F=h[oe];for(T in F)F.hasOwnProperty(T)&&(a||(a={}),a[T]="")}else oe!=="dangerouslySetInnerHTML"&&oe!=="children"&&oe!=="suppressContentEditableWarning"&&oe!=="suppressHydrationWarning"&&oe!=="autoFocus"&&(o.hasOwnProperty(oe)?v||(v=[]):(v=v||[]).push(oe,null));for(oe in c){var j=c[oe];if(F=h?.[oe],c.hasOwnProperty(oe)&&j!==F&&(j!=null||F!=null))if(oe==="style")if(F){for(T in F)!F.hasOwnProperty(T)||j&&j.hasOwnProperty(T)||(a||(a={}),a[T]="");for(T in j)j.hasOwnProperty(T)&&F[T]!==j[T]&&(a||(a={}),a[T]=j[T])}else a||(v||(v=[]),v.push(oe,a)),a=j;else oe==="dangerouslySetInnerHTML"?(j=j?j.__html:void 0,F=F?F.__html:void 0,j!=null&&F!==j&&(v=v||[]).push(oe,j)):oe==="children"?typeof j!="string"&&typeof j!="number"||(v=v||[]).push(oe,""+j):oe!=="suppressContentEditableWarning"&&oe!=="suppressHydrationWarning"&&(o.hasOwnProperty(oe)?(j!=null&&oe==="onScroll"&&Pt("scroll",n),v||F===j||(v=[])):(v=v||[]).push(oe,j))}a&&(v=v||[]).push("style",a);var oe=v;(i.updateQueue=oe)&&(i.flags|=4)}},Wh=function(n,i,a,c){a!==c&&(i.flags|=4)};function Fo(n,i){if(!Ut)switch(n.tailMode){case"hidden":i=n.tail;for(var a=null;i!==null;)i.alternate!==null&&(a=i),i=i.sibling;a===null?n.tail=null:a.sibling=null;break;case"collapsed":a=n.tail;for(var c=null;a!==null;)a.alternate!==null&&(c=a),a=a.sibling;c===null?i||n.tail===null?n.tail=null:n.tail.sibling=null:c.sibling=null}}function pn(n){var i=n.alternate!==null&&n.alternate.child===n.child,a=0,c=0;if(i)for(var h=n.child;h!==null;)a|=h.lanes|h.childLanes,c|=h.subtreeFlags&14680064,c|=h.flags&14680064,h.return=n,h=h.sibling;else for(h=n.child;h!==null;)a|=h.lanes|h.childLanes,c|=h.subtreeFlags,c|=h.flags,h.return=n,h=h.sibling;return n.subtreeFlags|=c,n.childLanes=a,i}function Mv(n,i,a){var c=i.pendingProps;switch(Ic(i),i.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return pn(i),null;case 1:return Ln(i.type)&&Da(),pn(i),null;case 3:return c=i.stateNode,ws(),Dt(bn),Dt(fn),Xc(),c.pendingContext&&(c.context=c.pendingContext,c.pendingContext=null),(n===null||n.child===null)&&(Fa(i)?i.flags|=4:n===null||n.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,oi!==null&&(Mu(oi),oi=null))),du(n,i),pn(i),null;case 5:Wc(i);var h=Br(Do.current);if(a=i.type,n!==null&&i.stateNode!=null)Vh(n,i,a,c,h),n.ref!==i.ref&&(i.flags|=512,i.flags|=2097152);else{if(!c){if(i.stateNode===null)throw Error(t(166));return pn(i),null}if(n=Br(xi.current),Fa(i)){c=i.stateNode,a=i.type;var v=i.memoizedProps;switch(c[_i]=i,c[Co]=v,n=(i.mode&1)!==0,a){case"dialog":Pt("cancel",c),Pt("close",c);break;case"iframe":case"object":case"embed":Pt("load",c);break;case"video":case"audio":for(h=0;h<To.length;h++)Pt(To[h],c);break;case"source":Pt("error",c);break;case"img":case"image":case"link":Pt("error",c),Pt("load",c);break;case"details":Pt("toggle",c);break;case"input":Ve(c,v),Pt("invalid",c);break;case"select":c._wrapperState={wasMultiple:!!v.multiple},Pt("invalid",c);break;case"textarea":me(c,v),Pt("invalid",c)}tt(a,v),h=null;for(var T in v)if(v.hasOwnProperty(T)){var F=v[T];T==="children"?typeof F=="string"?c.textContent!==F&&(v.suppressHydrationWarning!==!0&&ba(c.textContent,F,n),h=["children",F]):typeof F=="number"&&c.textContent!==""+F&&(v.suppressHydrationWarning!==!0&&ba(c.textContent,F,n),h=["children",""+F]):o.hasOwnProperty(T)&&F!=null&&T==="onScroll"&&Pt("scroll",c)}switch(a){case"input":Ie(c),Be(c,v,!0);break;case"textarea":Ie(c),Le(c);break;case"select":case"option":break;default:typeof v.onClick=="function"&&(c.onclick=La)}c=h,i.updateQueue=c,c!==null&&(i.flags|=4)}else{T=h.nodeType===9?h:h.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=Ae(a)),n==="http://www.w3.org/1999/xhtml"?a==="script"?(n=T.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof c.is=="string"?n=T.createElement(a,{is:c.is}):(n=T.createElement(a),a==="select"&&(T=n,c.multiple?T.multiple=!0:c.size&&(T.size=c.size))):n=T.createElementNS(n,a),n[_i]=i,n[Co]=c,Gh(n,i,!1,!1),i.stateNode=n;e:{switch(T=mt(a,c),a){case"dialog":Pt("cancel",n),Pt("close",n),h=c;break;case"iframe":case"object":case"embed":Pt("load",n),h=c;break;case"video":case"audio":for(h=0;h<To.length;h++)Pt(To[h],n);h=c;break;case"source":Pt("error",n),h=c;break;case"img":case"image":case"link":Pt("error",n),Pt("load",n),h=c;break;case"details":Pt("toggle",n),h=c;break;case"input":Ve(n,c),h=Fe(n,c),Pt("invalid",n);break;case"option":h=c;break;case"select":n._wrapperState={wasMultiple:!!c.multiple},h=W({},c,{value:void 0}),Pt("invalid",n);break;case"textarea":me(n,c),h=xe(n,c),Pt("invalid",n);break;default:h=c}tt(a,h),F=h;for(v in F)if(F.hasOwnProperty(v)){var j=F[v];v==="style"?qe(n,j):v==="dangerouslySetInnerHTML"?(j=j?j.__html:void 0,j!=null&&at(n,j)):v==="children"?typeof j=="string"?(a!=="textarea"||j!=="")&&Se(n,j):typeof j=="number"&&Se(n,""+j):v!=="suppressContentEditableWarning"&&v!=="suppressHydrationWarning"&&v!=="autoFocus"&&(o.hasOwnProperty(v)?j!=null&&v==="onScroll"&&Pt("scroll",n):j!=null&&R(n,v,j,T))}switch(a){case"input":Ie(n),Be(n,c,!1);break;case"textarea":Ie(n),Le(n);break;case"option":c.value!=null&&n.setAttribute("value",""+Te(c.value));break;case"select":n.multiple=!!c.multiple,v=c.value,v!=null?te(n,!!c.multiple,v,!1):c.defaultValue!=null&&te(n,!!c.multiple,c.defaultValue,!0);break;default:typeof h.onClick=="function"&&(n.onclick=La)}switch(a){case"button":case"input":case"select":case"textarea":c=!!c.autoFocus;break e;case"img":c=!0;break e;default:c=!1}}c&&(i.flags|=4)}i.ref!==null&&(i.flags|=512,i.flags|=2097152)}return pn(i),null;case 6:if(n&&i.stateNode!=null)Wh(n,i,n.memoizedProps,c);else{if(typeof c!="string"&&i.stateNode===null)throw Error(t(166));if(a=Br(Do.current),Br(xi.current),Fa(i)){if(c=i.stateNode,a=i.memoizedProps,c[_i]=i,(v=c.nodeValue!==a)&&(n=Vn,n!==null))switch(n.tag){case 3:ba(c.nodeValue,a,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&ba(c.nodeValue,a,(n.mode&1)!==0)}v&&(i.flags|=4)}else c=(a.nodeType===9?a:a.ownerDocument).createTextNode(c),c[_i]=i,i.stateNode=c}return pn(i),null;case 13:if(Dt(Ft),c=i.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(Ut&&Wn!==null&&(i.mode&1)!==0&&(i.flags&128)===0)Yf(),Ss(),i.flags|=98560,v=!1;else if(v=Fa(i),c!==null&&c.dehydrated!==null){if(n===null){if(!v)throw Error(t(318));if(v=i.memoizedState,v=v!==null?v.dehydrated:null,!v)throw Error(t(317));v[_i]=i}else Ss(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;pn(i),v=!1}else oi!==null&&(Mu(oi),oi=null),v=!0;if(!v)return i.flags&65536?i:null}return(i.flags&128)!==0?(i.lanes=a,i):(c=c!==null,c!==(n!==null&&n.memoizedState!==null)&&c&&(i.child.flags|=8192,(i.mode&1)!==0&&(n===null||(Ft.current&1)!==0?$t===0&&($t=3):wu())),i.updateQueue!==null&&(i.flags|=4),pn(i),null);case 4:return ws(),du(n,i),n===null&&wo(i.stateNode.containerInfo),pn(i),null;case 10:return Bc(i.type._context),pn(i),null;case 17:return Ln(i.type)&&Da(),pn(i),null;case 19:if(Dt(Ft),v=i.memoizedState,v===null)return pn(i),null;if(c=(i.flags&128)!==0,T=v.rendering,T===null)if(c)Fo(v,!1);else{if($t!==0||n!==null&&(n.flags&128)!==0)for(n=i.child;n!==null;){if(T=Va(n),T!==null){for(i.flags|=128,Fo(v,!1),c=T.updateQueue,c!==null&&(i.updateQueue=c,i.flags|=4),i.subtreeFlags=0,c=a,a=i.child;a!==null;)v=a,n=c,v.flags&=14680066,T=v.alternate,T===null?(v.childLanes=0,v.lanes=n,v.child=null,v.subtreeFlags=0,v.memoizedProps=null,v.memoizedState=null,v.updateQueue=null,v.dependencies=null,v.stateNode=null):(v.childLanes=T.childLanes,v.lanes=T.lanes,v.child=T.child,v.subtreeFlags=0,v.deletions=null,v.memoizedProps=T.memoizedProps,v.memoizedState=T.memoizedState,v.updateQueue=T.updateQueue,v.type=T.type,n=T.dependencies,v.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),a=a.sibling;return Lt(Ft,Ft.current&1|2),i.child}n=n.sibling}v.tail!==null&&ke()>bs&&(i.flags|=128,c=!0,Fo(v,!1),i.lanes=4194304)}else{if(!c)if(n=Va(T),n!==null){if(i.flags|=128,c=!0,a=n.updateQueue,a!==null&&(i.updateQueue=a,i.flags|=4),Fo(v,!0),v.tail===null&&v.tailMode==="hidden"&&!T.alternate&&!Ut)return pn(i),null}else 2*ke()-v.renderingStartTime>bs&&a!==1073741824&&(i.flags|=128,c=!0,Fo(v,!1),i.lanes=4194304);v.isBackwards?(T.sibling=i.child,i.child=T):(a=v.last,a!==null?a.sibling=T:i.child=T,v.last=T)}return v.tail!==null?(i=v.tail,v.rendering=i,v.tail=i.sibling,v.renderingStartTime=ke(),i.sibling=null,a=Ft.current,Lt(Ft,c?a&1|2:a&1),i):(pn(i),null);case 22:case 23:return Tu(),c=i.memoizedState!==null,n!==null&&n.memoizedState!==null!==c&&(i.flags|=8192),c&&(i.mode&1)!==0?(jn&1073741824)!==0&&(pn(i),i.subtreeFlags&6&&(i.flags|=8192)):pn(i),null;case 24:return null;case 25:return null}throw Error(t(156,i.tag))}function Ev(n,i){switch(Ic(i),i.tag){case 1:return Ln(i.type)&&Da(),n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 3:return ws(),Dt(bn),Dt(fn),Xc(),n=i.flags,(n&65536)!==0&&(n&128)===0?(i.flags=n&-65537|128,i):null;case 5:return Wc(i),null;case 13:if(Dt(Ft),n=i.memoizedState,n!==null&&n.dehydrated!==null){if(i.alternate===null)throw Error(t(340));Ss()}return n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 19:return Dt(Ft),null;case 4:return ws(),null;case 10:return Bc(i.type._context),null;case 22:case 23:return Tu(),null;case 24:return null;default:return null}}var Qa=!1,mn=!1,Tv=typeof WeakSet=="function"?WeakSet:Set,He=null;function Cs(n,i){var a=n.ref;if(a!==null)if(typeof a=="function")try{a(null)}catch(c){Ht(n,i,c)}else a.current=null}function fu(n,i,a){try{a()}catch(c){Ht(n,i,c)}}var jh=!1;function wv(n,i){if(Tc=_a,n=Ef(),gc(n)){if("selectionStart"in n)var a={start:n.selectionStart,end:n.selectionEnd};else e:{a=(a=n.ownerDocument)&&a.defaultView||window;var c=a.getSelection&&a.getSelection();if(c&&c.rangeCount!==0){a=c.anchorNode;var h=c.anchorOffset,v=c.focusNode;c=c.focusOffset;try{a.nodeType,v.nodeType}catch{a=null;break e}var T=0,F=-1,j=-1,oe=0,Ee=0,we=n,ye=null;t:for(;;){for(var Oe;we!==a||h!==0&&we.nodeType!==3||(F=T+h),we!==v||c!==0&&we.nodeType!==3||(j=T+c),we.nodeType===3&&(T+=we.nodeValue.length),(Oe=we.firstChild)!==null;)ye=we,we=Oe;for(;;){if(we===n)break t;if(ye===a&&++oe===h&&(F=T),ye===v&&++Ee===c&&(j=T),(Oe=we.nextSibling)!==null)break;we=ye,ye=we.parentNode}we=Oe}a=F===-1||j===-1?null:{start:F,end:j}}else a=null}a=a||{start:0,end:0}}else a=null;for(wc={focusedElem:n,selectionRange:a},_a=!1,He=i;He!==null;)if(i=He,n=i.child,(i.subtreeFlags&1028)!==0&&n!==null)n.return=i,He=n;else for(;He!==null;){i=He;try{var We=i.alternate;if((i.flags&1024)!==0)switch(i.tag){case 0:case 11:case 15:break;case 1:if(We!==null){var je=We.memoizedProps,Vt=We.memoizedState,J=i.stateNode,q=J.getSnapshotBeforeUpdate(i.elementType===i.type?je:ai(i.type,je),Vt);J.__reactInternalSnapshotBeforeUpdate=q}break;case 3:var ne=i.stateNode.containerInfo;ne.nodeType===1?ne.textContent="":ne.nodeType===9&&ne.documentElement&&ne.removeChild(ne.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(t(163))}}catch(Ce){Ht(i,i.return,Ce)}if(n=i.sibling,n!==null){n.return=i.return,He=n;break}He=i.return}return We=jh,jh=!1,We}function ko(n,i,a){var c=i.updateQueue;if(c=c!==null?c.lastEffect:null,c!==null){var h=c=c.next;do{if((h.tag&n)===n){var v=h.destroy;h.destroy=void 0,v!==void 0&&fu(i,a,v)}h=h.next}while(h!==c)}}function Ja(n,i){if(i=i.updateQueue,i=i!==null?i.lastEffect:null,i!==null){var a=i=i.next;do{if((a.tag&n)===n){var c=a.create;a.destroy=c()}a=a.next}while(a!==i)}}function hu(n){var i=n.ref;if(i!==null){var a=n.stateNode;n.tag,n=a,typeof i=="function"?i(n):i.current=n}}function Xh(n){var i=n.alternate;i!==null&&(n.alternate=null,Xh(i)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(i=n.stateNode,i!==null&&(delete i[_i],delete i[Co],delete i[bc],delete i[av],delete i[lv])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function Yh(n){return n.tag===5||n.tag===3||n.tag===4}function qh(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||Yh(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function pu(n,i,a){var c=n.tag;if(c===5||c===6)n=n.stateNode,i?a.nodeType===8?a.parentNode.insertBefore(n,i):a.insertBefore(n,i):(a.nodeType===8?(i=a.parentNode,i.insertBefore(n,a)):(i=a,i.appendChild(n)),a=a._reactRootContainer,a!=null||i.onclick!==null||(i.onclick=La));else if(c!==4&&(n=n.child,n!==null))for(pu(n,i,a),n=n.sibling;n!==null;)pu(n,i,a),n=n.sibling}function mu(n,i,a){var c=n.tag;if(c===5||c===6)n=n.stateNode,i?a.insertBefore(n,i):a.appendChild(n);else if(c!==4&&(n=n.child,n!==null))for(mu(n,i,a),n=n.sibling;n!==null;)mu(n,i,a),n=n.sibling}var on=null,li=!1;function lr(n,i,a){for(a=a.child;a!==null;)$h(n,i,a),a=a.sibling}function $h(n,i,a){if(_t&&typeof _t.onCommitFiberUnmount=="function")try{_t.onCommitFiberUnmount(Cn,a)}catch{}switch(a.tag){case 5:mn||Cs(a,i);case 6:var c=on,h=li;on=null,lr(n,i,a),on=c,li=h,on!==null&&(li?(n=on,a=a.stateNode,n.nodeType===8?n.parentNode.removeChild(a):n.removeChild(a)):on.removeChild(a.stateNode));break;case 18:on!==null&&(li?(n=on,a=a.stateNode,n.nodeType===8?Rc(n.parentNode,a):n.nodeType===1&&Rc(n,a),go(n)):Rc(on,a.stateNode));break;case 4:c=on,h=li,on=a.stateNode.containerInfo,li=!0,lr(n,i,a),on=c,li=h;break;case 0:case 11:case 14:case 15:if(!mn&&(c=a.updateQueue,c!==null&&(c=c.lastEffect,c!==null))){h=c=c.next;do{var v=h,T=v.destroy;v=v.tag,T!==void 0&&((v&2)!==0||(v&4)!==0)&&fu(a,i,T),h=h.next}while(h!==c)}lr(n,i,a);break;case 1:if(!mn&&(Cs(a,i),c=a.stateNode,typeof c.componentWillUnmount=="function"))try{c.props=a.memoizedProps,c.state=a.memoizedState,c.componentWillUnmount()}catch(F){Ht(a,i,F)}lr(n,i,a);break;case 21:lr(n,i,a);break;case 22:a.mode&1?(mn=(c=mn)||a.memoizedState!==null,lr(n,i,a),mn=c):lr(n,i,a);break;default:lr(n,i,a)}}function Kh(n){var i=n.updateQueue;if(i!==null){n.updateQueue=null;var a=n.stateNode;a===null&&(a=n.stateNode=new Tv),i.forEach(function(c){var h=Nv.bind(null,n,c);a.has(c)||(a.add(c),c.then(h,h))})}}function ci(n,i){var a=i.deletions;if(a!==null)for(var c=0;c<a.length;c++){var h=a[c];try{var v=n,T=i,F=T;e:for(;F!==null;){switch(F.tag){case 5:on=F.stateNode,li=!1;break e;case 3:on=F.stateNode.containerInfo,li=!0;break e;case 4:on=F.stateNode.containerInfo,li=!0;break e}F=F.return}if(on===null)throw Error(t(160));$h(v,T,h),on=null,li=!1;var j=h.alternate;j!==null&&(j.return=null),h.return=null}catch(oe){Ht(h,i,oe)}}if(i.subtreeFlags&12854)for(i=i.child;i!==null;)Zh(i,n),i=i.sibling}function Zh(n,i){var a=n.alternate,c=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(ci(i,n),Si(n),c&4){try{ko(3,n,n.return),Ja(3,n)}catch(je){Ht(n,n.return,je)}try{ko(5,n,n.return)}catch(je){Ht(n,n.return,je)}}break;case 1:ci(i,n),Si(n),c&512&&a!==null&&Cs(a,a.return);break;case 5:if(ci(i,n),Si(n),c&512&&a!==null&&Cs(a,a.return),n.flags&32){var h=n.stateNode;try{Se(h,"")}catch(je){Ht(n,n.return,je)}}if(c&4&&(h=n.stateNode,h!=null)){var v=n.memoizedProps,T=a!==null?a.memoizedProps:v,F=n.type,j=n.updateQueue;if(n.updateQueue=null,j!==null)try{F==="input"&&v.type==="radio"&&v.name!=null&&Re(h,v),mt(F,T);var oe=mt(F,v);for(T=0;T<j.length;T+=2){var Ee=j[T],we=j[T+1];Ee==="style"?qe(h,we):Ee==="dangerouslySetInnerHTML"?at(h,we):Ee==="children"?Se(h,we):R(h,Ee,we,oe)}switch(F){case"input":rt(h,v);break;case"textarea":ve(h,v);break;case"select":var ye=h._wrapperState.wasMultiple;h._wrapperState.wasMultiple=!!v.multiple;var Oe=v.value;Oe!=null?te(h,!!v.multiple,Oe,!1):ye!==!!v.multiple&&(v.defaultValue!=null?te(h,!!v.multiple,v.defaultValue,!0):te(h,!!v.multiple,v.multiple?[]:"",!1))}h[Co]=v}catch(je){Ht(n,n.return,je)}}break;case 6:if(ci(i,n),Si(n),c&4){if(n.stateNode===null)throw Error(t(162));h=n.stateNode,v=n.memoizedProps;try{h.nodeValue=v}catch(je){Ht(n,n.return,je)}}break;case 3:if(ci(i,n),Si(n),c&4&&a!==null&&a.memoizedState.isDehydrated)try{go(i.containerInfo)}catch(je){Ht(n,n.return,je)}break;case 4:ci(i,n),Si(n);break;case 13:ci(i,n),Si(n),h=n.child,h.flags&8192&&(v=h.memoizedState!==null,h.stateNode.isHidden=v,!v||h.alternate!==null&&h.alternate.memoizedState!==null||(_u=ke())),c&4&&Kh(n);break;case 22:if(Ee=a!==null&&a.memoizedState!==null,n.mode&1?(mn=(oe=mn)||Ee,ci(i,n),mn=oe):ci(i,n),Si(n),c&8192){if(oe=n.memoizedState!==null,(n.stateNode.isHidden=oe)&&!Ee&&(n.mode&1)!==0)for(He=n,Ee=n.child;Ee!==null;){for(we=He=Ee;He!==null;){switch(ye=He,Oe=ye.child,ye.tag){case 0:case 11:case 14:case 15:ko(4,ye,ye.return);break;case 1:Cs(ye,ye.return);var We=ye.stateNode;if(typeof We.componentWillUnmount=="function"){c=ye,a=ye.return;try{i=c,We.props=i.memoizedProps,We.state=i.memoizedState,We.componentWillUnmount()}catch(je){Ht(c,a,je)}}break;case 5:Cs(ye,ye.return);break;case 22:if(ye.memoizedState!==null){ep(we);continue}}Oe!==null?(Oe.return=ye,He=Oe):ep(we)}Ee=Ee.sibling}e:for(Ee=null,we=n;;){if(we.tag===5){if(Ee===null){Ee=we;try{h=we.stateNode,oe?(v=h.style,typeof v.setProperty=="function"?v.setProperty("display","none","important"):v.display="none"):(F=we.stateNode,j=we.memoizedProps.style,T=j!=null&&j.hasOwnProperty("display")?j.display:null,F.style.display=it("display",T))}catch(je){Ht(n,n.return,je)}}}else if(we.tag===6){if(Ee===null)try{we.stateNode.nodeValue=oe?"":we.memoizedProps}catch(je){Ht(n,n.return,je)}}else if((we.tag!==22&&we.tag!==23||we.memoizedState===null||we===n)&&we.child!==null){we.child.return=we,we=we.child;continue}if(we===n)break e;for(;we.sibling===null;){if(we.return===null||we.return===n)break e;Ee===we&&(Ee=null),we=we.return}Ee===we&&(Ee=null),we.sibling.return=we.return,we=we.sibling}}break;case 19:ci(i,n),Si(n),c&4&&Kh(n);break;case 21:break;default:ci(i,n),Si(n)}}function Si(n){var i=n.flags;if(i&2){try{e:{for(var a=n.return;a!==null;){if(Yh(a)){var c=a;break e}a=a.return}throw Error(t(160))}switch(c.tag){case 5:var h=c.stateNode;c.flags&32&&(Se(h,""),c.flags&=-33);var v=qh(n);mu(n,v,h);break;case 3:case 4:var T=c.stateNode.containerInfo,F=qh(n);pu(n,F,T);break;default:throw Error(t(161))}}catch(j){Ht(n,n.return,j)}n.flags&=-3}i&4096&&(n.flags&=-4097)}function Av(n,i,a){He=n,Qh(n)}function Qh(n,i,a){for(var c=(n.mode&1)!==0;He!==null;){var h=He,v=h.child;if(h.tag===22&&c){var T=h.memoizedState!==null||Qa;if(!T){var F=h.alternate,j=F!==null&&F.memoizedState!==null||mn;F=Qa;var oe=mn;if(Qa=T,(mn=j)&&!oe)for(He=h;He!==null;)T=He,j=T.child,T.tag===22&&T.memoizedState!==null?tp(h):j!==null?(j.return=T,He=j):tp(h);for(;v!==null;)He=v,Qh(v),v=v.sibling;He=h,Qa=F,mn=oe}Jh(n)}else(h.subtreeFlags&8772)!==0&&v!==null?(v.return=h,He=v):Jh(n)}}function Jh(n){for(;He!==null;){var i=He;if((i.flags&8772)!==0){var a=i.alternate;try{if((i.flags&8772)!==0)switch(i.tag){case 0:case 11:case 15:mn||Ja(5,i);break;case 1:var c=i.stateNode;if(i.flags&4&&!mn)if(a===null)c.componentDidMount();else{var h=i.elementType===i.type?a.memoizedProps:ai(i.type,a.memoizedProps);c.componentDidUpdate(h,a.memoizedState,c.__reactInternalSnapshotBeforeUpdate)}var v=i.updateQueue;v!==null&&eh(i,v,c);break;case 3:var T=i.updateQueue;if(T!==null){if(a=null,i.child!==null)switch(i.child.tag){case 5:a=i.child.stateNode;break;case 1:a=i.child.stateNode}eh(i,T,a)}break;case 5:var F=i.stateNode;if(a===null&&i.flags&4){a=F;var j=i.memoizedProps;switch(i.type){case"button":case"input":case"select":case"textarea":j.autoFocus&&a.focus();break;case"img":j.src&&(a.src=j.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(i.memoizedState===null){var oe=i.alternate;if(oe!==null){var Ee=oe.memoizedState;if(Ee!==null){var we=Ee.dehydrated;we!==null&&go(we)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(t(163))}mn||i.flags&512&&hu(i)}catch(ye){Ht(i,i.return,ye)}}if(i===n){He=null;break}if(a=i.sibling,a!==null){a.return=i.return,He=a;break}He=i.return}}function ep(n){for(;He!==null;){var i=He;if(i===n){He=null;break}var a=i.sibling;if(a!==null){a.return=i.return,He=a;break}He=i.return}}function tp(n){for(;He!==null;){var i=He;try{switch(i.tag){case 0:case 11:case 15:var a=i.return;try{Ja(4,i)}catch(j){Ht(i,a,j)}break;case 1:var c=i.stateNode;if(typeof c.componentDidMount=="function"){var h=i.return;try{c.componentDidMount()}catch(j){Ht(i,h,j)}}var v=i.return;try{hu(i)}catch(j){Ht(i,v,j)}break;case 5:var T=i.return;try{hu(i)}catch(j){Ht(i,T,j)}}}catch(j){Ht(i,i.return,j)}if(i===n){He=null;break}var F=i.sibling;if(F!==null){F.return=i.return,He=F;break}He=i.return}}var Cv=Math.ceil,el=b.ReactCurrentDispatcher,gu=b.ReactCurrentOwner,Jn=b.ReactCurrentBatchConfig,xt=0,tn=null,Wt=null,an=0,jn=0,Rs=ir(0),$t=0,Bo=null,Hr=0,tl=0,vu=0,zo=null,Dn=null,_u=0,bs=1/0,Oi=null,nl=!1,xu=null,cr=null,il=!1,ur=null,rl=0,Ho=0,yu=null,sl=-1,ol=0;function Mn(){return(xt&6)!==0?ke():sl!==-1?sl:sl=ke()}function dr(n){return(n.mode&1)===0?1:(xt&2)!==0&&an!==0?an&-an:uv.transition!==null?(ol===0&&(ol=ma()),ol):(n=At,n!==0||(n=window.event,n=n===void 0?16:nf(n.type)),n)}function ui(n,i,a,c){if(50<Ho)throw Ho=0,yu=null,Error(t(185));uo(n,a,c),((xt&2)===0||n!==tn)&&(n===tn&&((xt&2)===0&&(tl|=a),$t===4&&fr(n,an)),In(n,c),a===1&&xt===0&&(i.mode&1)===0&&(bs=ke()+500,Na&&sr()))}function In(n,i){var a=n.callbackNode;Rn(n,i);var c=qn(n,n===tn?an:0);if(c===0)a!==null&&Ue(a),n.callbackNode=null,n.callbackPriority=0;else if(i=c&-c,n.callbackPriority!==i){if(a!=null&&Ue(a),i===1)n.tag===0?cv(ip.bind(null,n)):Gf(ip.bind(null,n)),sv(function(){(xt&6)===0&&sr()}),a=null;else{switch(qd(c)){case 1:a=ot;break;case 4:a=lt;break;case 16:a=bt;break;case 536870912:a=Gt;break;default:a=bt}a=dp(a,np.bind(null,n))}n.callbackPriority=i,n.callbackNode=a}}function np(n,i){if(sl=-1,ol=0,(xt&6)!==0)throw Error(t(327));var a=n.callbackNode;if(Ls()&&n.callbackNode!==a)return null;var c=qn(n,n===tn?an:0);if(c===0)return null;if((c&30)!==0||(c&n.expiredLanes)!==0||i)i=al(n,c);else{i=c;var h=xt;xt|=2;var v=sp();(tn!==n||an!==i)&&(Oi=null,bs=ke()+500,Vr(n,i));do try{Lv();break}catch(F){rp(n,F)}while(!0);kc(),el.current=v,xt=h,Wt!==null?i=0:(tn=null,an=0,i=$t)}if(i!==0){if(i===2&&(h=Ir(n),h!==0&&(c=h,i=Su(n,h))),i===1)throw a=Bo,Vr(n,0),fr(n,c),In(n,ke()),a;if(i===6)fr(n,c);else{if(h=n.current.alternate,(c&30)===0&&!Rv(h)&&(i=al(n,c),i===2&&(v=Ir(n),v!==0&&(c=v,i=Su(n,v))),i===1))throw a=Bo,Vr(n,0),fr(n,c),In(n,ke()),a;switch(n.finishedWork=h,n.finishedLanes=c,i){case 0:case 1:throw Error(t(345));case 2:Wr(n,Dn,Oi);break;case 3:if(fr(n,c),(c&130023424)===c&&(i=_u+500-ke(),10<i)){if(qn(n,0)!==0)break;if(h=n.suspendedLanes,(h&c)!==c){Mn(),n.pingedLanes|=n.suspendedLanes&h;break}n.timeoutHandle=Cc(Wr.bind(null,n,Dn,Oi),i);break}Wr(n,Dn,Oi);break;case 4:if(fr(n,c),(c&4194240)===c)break;for(i=n.eventTimes,h=-1;0<c;){var T=31-yn(c);v=1<<T,T=i[T],T>h&&(h=T),c&=~v}if(c=h,c=ke()-c,c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3e3>c?3e3:4320>c?4320:1960*Cv(c/1960))-c,10<c){n.timeoutHandle=Cc(Wr.bind(null,n,Dn,Oi),c);break}Wr(n,Dn,Oi);break;case 5:Wr(n,Dn,Oi);break;default:throw Error(t(329))}}}return In(n,ke()),n.callbackNode===a?np.bind(null,n):null}function Su(n,i){var a=zo;return n.current.memoizedState.isDehydrated&&(Vr(n,i).flags|=256),n=al(n,i),n!==2&&(i=Dn,Dn=a,i!==null&&Mu(i)),n}function Mu(n){Dn===null?Dn=n:Dn.push.apply(Dn,n)}function Rv(n){for(var i=n;;){if(i.flags&16384){var a=i.updateQueue;if(a!==null&&(a=a.stores,a!==null))for(var c=0;c<a.length;c++){var h=a[c],v=h.getSnapshot;h=h.value;try{if(!si(v(),h))return!1}catch{return!1}}}if(a=i.child,i.subtreeFlags&16384&&a!==null)a.return=i,i=a;else{if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function fr(n,i){for(i&=~vu,i&=~tl,n.suspendedLanes|=i,n.pingedLanes&=~i,n=n.expirationTimes;0<i;){var a=31-yn(i),c=1<<a;n[a]=-1,i&=~c}}function ip(n){if((xt&6)!==0)throw Error(t(327));Ls();var i=qn(n,0);if((i&1)===0)return In(n,ke()),null;var a=al(n,i);if(n.tag!==0&&a===2){var c=Ir(n);c!==0&&(i=c,a=Su(n,c))}if(a===1)throw a=Bo,Vr(n,0),fr(n,i),In(n,ke()),a;if(a===6)throw Error(t(345));return n.finishedWork=n.current.alternate,n.finishedLanes=i,Wr(n,Dn,Oi),In(n,ke()),null}function Eu(n,i){var a=xt;xt|=1;try{return n(i)}finally{xt=a,xt===0&&(bs=ke()+500,Na&&sr())}}function Gr(n){ur!==null&&ur.tag===0&&(xt&6)===0&&Ls();var i=xt;xt|=1;var a=Jn.transition,c=At;try{if(Jn.transition=null,At=1,n)return n()}finally{At=c,Jn.transition=a,xt=i,(xt&6)===0&&sr()}}function Tu(){jn=Rs.current,Dt(Rs)}function Vr(n,i){n.finishedWork=null,n.finishedLanes=0;var a=n.timeoutHandle;if(a!==-1&&(n.timeoutHandle=-1,rv(a)),Wt!==null)for(a=Wt.return;a!==null;){var c=a;switch(Ic(c),c.tag){case 1:c=c.type.childContextTypes,c!=null&&Da();break;case 3:ws(),Dt(bn),Dt(fn),Xc();break;case 5:Wc(c);break;case 4:ws();break;case 13:Dt(Ft);break;case 19:Dt(Ft);break;case 10:Bc(c.type._context);break;case 22:case 23:Tu()}a=a.return}if(tn=n,Wt=n=hr(n.current,null),an=jn=i,$t=0,Bo=null,vu=tl=Hr=0,Dn=zo=null,kr!==null){for(i=0;i<kr.length;i++)if(a=kr[i],c=a.interleaved,c!==null){a.interleaved=null;var h=c.next,v=a.pending;if(v!==null){var T=v.next;v.next=h,c.next=T}a.pending=c}kr=null}return n}function rp(n,i){do{var a=Wt;try{if(kc(),Wa.current=qa,ja){for(var c=kt.memoizedState;c!==null;){var h=c.queue;h!==null&&(h.pending=null),c=c.next}ja=!1}if(zr=0,en=qt=kt=null,Io=!1,No=0,gu.current=null,a===null||a.return===null){$t=1,Bo=i,Wt=null;break}e:{var v=n,T=a.return,F=a,j=i;if(i=an,F.flags|=32768,j!==null&&typeof j=="object"&&typeof j.then=="function"){var oe=j,Ee=F,we=Ee.tag;if((Ee.mode&1)===0&&(we===0||we===11||we===15)){var ye=Ee.alternate;ye?(Ee.updateQueue=ye.updateQueue,Ee.memoizedState=ye.memoizedState,Ee.lanes=ye.lanes):(Ee.updateQueue=null,Ee.memoizedState=null)}var Oe=bh(T);if(Oe!==null){Oe.flags&=-257,Lh(Oe,T,F,v,i),Oe.mode&1&&Rh(v,oe,i),i=Oe,j=oe;var We=i.updateQueue;if(We===null){var je=new Set;je.add(j),i.updateQueue=je}else We.add(j);break e}else{if((i&1)===0){Rh(v,oe,i),wu();break e}j=Error(t(426))}}else if(Ut&&F.mode&1){var Vt=bh(T);if(Vt!==null){(Vt.flags&65536)===0&&(Vt.flags|=256),Lh(Vt,T,F,v,i),Oc(As(j,F));break e}}v=j=As(j,F),$t!==4&&($t=2),zo===null?zo=[v]:zo.push(v),v=T;do{switch(v.tag){case 3:v.flags|=65536,i&=-i,v.lanes|=i;var J=Ah(v,j,i);Jf(v,J);break e;case 1:F=j;var q=v.type,ne=v.stateNode;if((v.flags&128)===0&&(typeof q.getDerivedStateFromError=="function"||ne!==null&&typeof ne.componentDidCatch=="function"&&(cr===null||!cr.has(ne)))){v.flags|=65536,i&=-i,v.lanes|=i;var Ce=Ch(v,F,i);Jf(v,Ce);break e}}v=v.return}while(v!==null)}ap(a)}catch(Xe){i=Xe,Wt===a&&a!==null&&(Wt=a=a.return);continue}break}while(!0)}function sp(){var n=el.current;return el.current=qa,n===null?qa:n}function wu(){($t===0||$t===3||$t===2)&&($t=4),tn===null||(Hr&268435455)===0&&(tl&268435455)===0||fr(tn,an)}function al(n,i){var a=xt;xt|=2;var c=sp();(tn!==n||an!==i)&&(Oi=null,Vr(n,i));do try{bv();break}catch(h){rp(n,h)}while(!0);if(kc(),xt=a,el.current=c,Wt!==null)throw Error(t(261));return tn=null,an=0,$t}function bv(){for(;Wt!==null;)op(Wt)}function Lv(){for(;Wt!==null&&!Ye();)op(Wt)}function op(n){var i=up(n.alternate,n,jn);n.memoizedProps=n.pendingProps,i===null?ap(n):Wt=i,gu.current=null}function ap(n){var i=n;do{var a=i.alternate;if(n=i.return,(i.flags&32768)===0){if(a=Mv(a,i,jn),a!==null){Wt=a;return}}else{if(a=Ev(a,i),a!==null){a.flags&=32767,Wt=a;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{$t=6,Wt=null;return}}if(i=i.sibling,i!==null){Wt=i;return}Wt=i=n}while(i!==null);$t===0&&($t=5)}function Wr(n,i,a){var c=At,h=Jn.transition;try{Jn.transition=null,At=1,Pv(n,i,a,c)}finally{Jn.transition=h,At=c}return null}function Pv(n,i,a,c){do Ls();while(ur!==null);if((xt&6)!==0)throw Error(t(327));a=n.finishedWork;var h=n.finishedLanes;if(a===null)return null;if(n.finishedWork=null,n.finishedLanes=0,a===n.current)throw Error(t(177));n.callbackNode=null,n.callbackPriority=0;var v=a.lanes|a.childLanes;if(d0(n,v),n===tn&&(Wt=tn=null,an=0),(a.subtreeFlags&2064)===0&&(a.flags&2064)===0||il||(il=!0,dp(bt,function(){return Ls(),null})),v=(a.flags&15990)!==0,(a.subtreeFlags&15990)!==0||v){v=Jn.transition,Jn.transition=null;var T=At;At=1;var F=xt;xt|=4,gu.current=null,wv(n,a),Zh(a,n),Z0(wc),_a=!!Tc,wc=Tc=null,n.current=a,Av(a),et(),xt=F,At=T,Jn.transition=v}else n.current=a;if(il&&(il=!1,ur=n,rl=h),v=n.pendingLanes,v===0&&(cr=null),ft(a.stateNode),In(n,ke()),i!==null)for(c=n.onRecoverableError,a=0;a<i.length;a++)h=i[a],c(h.value,{componentStack:h.stack,digest:h.digest});if(nl)throw nl=!1,n=xu,xu=null,n;return(rl&1)!==0&&n.tag!==0&&Ls(),v=n.pendingLanes,(v&1)!==0?n===yu?Ho++:(Ho=0,yu=n):Ho=0,sr(),null}function Ls(){if(ur!==null){var n=qd(rl),i=Jn.transition,a=At;try{if(Jn.transition=null,At=16>n?16:n,ur===null)var c=!1;else{if(n=ur,ur=null,rl=0,(xt&6)!==0)throw Error(t(331));var h=xt;for(xt|=4,He=n.current;He!==null;){var v=He,T=v.child;if((He.flags&16)!==0){var F=v.deletions;if(F!==null){for(var j=0;j<F.length;j++){var oe=F[j];for(He=oe;He!==null;){var Ee=He;switch(Ee.tag){case 0:case 11:case 15:ko(8,Ee,v)}var we=Ee.child;if(we!==null)we.return=Ee,He=we;else for(;He!==null;){Ee=He;var ye=Ee.sibling,Oe=Ee.return;if(Xh(Ee),Ee===oe){He=null;break}if(ye!==null){ye.return=Oe,He=ye;break}He=Oe}}}var We=v.alternate;if(We!==null){var je=We.child;if(je!==null){We.child=null;do{var Vt=je.sibling;je.sibling=null,je=Vt}while(je!==null)}}He=v}}if((v.subtreeFlags&2064)!==0&&T!==null)T.return=v,He=T;else e:for(;He!==null;){if(v=He,(v.flags&2048)!==0)switch(v.tag){case 0:case 11:case 15:ko(9,v,v.return)}var J=v.sibling;if(J!==null){J.return=v.return,He=J;break e}He=v.return}}var q=n.current;for(He=q;He!==null;){T=He;var ne=T.child;if((T.subtreeFlags&2064)!==0&&ne!==null)ne.return=T,He=ne;else e:for(T=q;He!==null;){if(F=He,(F.flags&2048)!==0)try{switch(F.tag){case 0:case 11:case 15:Ja(9,F)}}catch(Xe){Ht(F,F.return,Xe)}if(F===T){He=null;break e}var Ce=F.sibling;if(Ce!==null){Ce.return=F.return,He=Ce;break e}He=F.return}}if(xt=h,sr(),_t&&typeof _t.onPostCommitFiberRoot=="function")try{_t.onPostCommitFiberRoot(Cn,n)}catch{}c=!0}return c}finally{At=a,Jn.transition=i}}return!1}function lp(n,i,a){i=As(a,i),i=Ah(n,i,1),n=ar(n,i,1),i=Mn(),n!==null&&(uo(n,1,i),In(n,i))}function Ht(n,i,a){if(n.tag===3)lp(n,n,a);else for(;i!==null;){if(i.tag===3){lp(i,n,a);break}else if(i.tag===1){var c=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof c.componentDidCatch=="function"&&(cr===null||!cr.has(c))){n=As(a,n),n=Ch(i,n,1),i=ar(i,n,1),n=Mn(),i!==null&&(uo(i,1,n),In(i,n));break}}i=i.return}}function Dv(n,i,a){var c=n.pingCache;c!==null&&c.delete(i),i=Mn(),n.pingedLanes|=n.suspendedLanes&a,tn===n&&(an&a)===a&&($t===4||$t===3&&(an&130023424)===an&&500>ke()-_u?Vr(n,0):vu|=a),In(n,i)}function cp(n,i){i===0&&((n.mode&1)===0?i=1:(i=$i,$i<<=1,($i&130023424)===0&&($i=4194304)));var a=Mn();n=Ii(n,i),n!==null&&(uo(n,i,a),In(n,a))}function Iv(n){var i=n.memoizedState,a=0;i!==null&&(a=i.retryLane),cp(n,a)}function Nv(n,i){var a=0;switch(n.tag){case 13:var c=n.stateNode,h=n.memoizedState;h!==null&&(a=h.retryLane);break;case 19:c=n.stateNode;break;default:throw Error(t(314))}c!==null&&c.delete(i),cp(n,a)}var up;up=function(n,i,a){if(n!==null)if(n.memoizedProps!==i.pendingProps||bn.current)Pn=!0;else{if((n.lanes&a)===0&&(i.flags&128)===0)return Pn=!1,Sv(n,i,a);Pn=(n.flags&131072)!==0}else Pn=!1,Ut&&(i.flags&1048576)!==0&&Vf(i,Oa,i.index);switch(i.lanes=0,i.tag){case 2:var c=i.type;Za(n,i),n=i.pendingProps;var h=_s(i,fn.current);Ts(i,a),h=$c(null,i,c,n,h,a);var v=Kc();return i.flags|=1,typeof h=="object"&&h!==null&&typeof h.render=="function"&&h.$$typeof===void 0?(i.tag=1,i.memoizedState=null,i.updateQueue=null,Ln(c)?(v=!0,Ia(i)):v=!1,i.memoizedState=h.state!==null&&h.state!==void 0?h.state:null,Gc(i),h.updater=$a,i.stateNode=h,h._reactInternals=i,nu(i,c,n,a),i=ou(null,i,c,!0,v,a)):(i.tag=0,Ut&&v&&Dc(i),Sn(null,i,h,a),i=i.child),i;case 16:c=i.elementType;e:{switch(Za(n,i),n=i.pendingProps,h=c._init,c=h(c._payload),i.type=c,h=i.tag=Ov(c),n=ai(c,n),h){case 0:i=su(null,i,c,n,a);break e;case 1:i=Oh(null,i,c,n,a);break e;case 11:i=Ph(null,i,c,n,a);break e;case 14:i=Dh(null,i,c,ai(c.type,n),a);break e}throw Error(t(306,c,""))}return i;case 0:return c=i.type,h=i.pendingProps,h=i.elementType===c?h:ai(c,h),su(n,i,c,h,a);case 1:return c=i.type,h=i.pendingProps,h=i.elementType===c?h:ai(c,h),Oh(n,i,c,h,a);case 3:e:{if(Fh(i),n===null)throw Error(t(387));c=i.pendingProps,v=i.memoizedState,h=v.element,Qf(n,i),Ga(i,c,null,a);var T=i.memoizedState;if(c=T.element,v.isDehydrated)if(v={element:c,isDehydrated:!1,cache:T.cache,pendingSuspenseBoundaries:T.pendingSuspenseBoundaries,transitions:T.transitions},i.updateQueue.baseState=v,i.memoizedState=v,i.flags&256){h=As(Error(t(423)),i),i=kh(n,i,c,a,h);break e}else if(c!==h){h=As(Error(t(424)),i),i=kh(n,i,c,a,h);break e}else for(Wn=nr(i.stateNode.containerInfo.firstChild),Vn=i,Ut=!0,oi=null,a=Kf(i,null,c,a),i.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(Ss(),c===h){i=Ui(n,i,a);break e}Sn(n,i,c,a)}i=i.child}return i;case 5:return th(i),n===null&&Uc(i),c=i.type,h=i.pendingProps,v=n!==null?n.memoizedProps:null,T=h.children,Ac(c,h)?T=null:v!==null&&Ac(c,v)&&(i.flags|=32),Uh(n,i),Sn(n,i,T,a),i.child;case 6:return n===null&&Uc(i),null;case 13:return Bh(n,i,a);case 4:return Vc(i,i.stateNode.containerInfo),c=i.pendingProps,n===null?i.child=Ms(i,null,c,a):Sn(n,i,c,a),i.child;case 11:return c=i.type,h=i.pendingProps,h=i.elementType===c?h:ai(c,h),Ph(n,i,c,h,a);case 7:return Sn(n,i,i.pendingProps,a),i.child;case 8:return Sn(n,i,i.pendingProps.children,a),i.child;case 12:return Sn(n,i,i.pendingProps.children,a),i.child;case 10:e:{if(c=i.type._context,h=i.pendingProps,v=i.memoizedProps,T=h.value,Lt(Ba,c._currentValue),c._currentValue=T,v!==null)if(si(v.value,T)){if(v.children===h.children&&!bn.current){i=Ui(n,i,a);break e}}else for(v=i.child,v!==null&&(v.return=i);v!==null;){var F=v.dependencies;if(F!==null){T=v.child;for(var j=F.firstContext;j!==null;){if(j.context===c){if(v.tag===1){j=Ni(-1,a&-a),j.tag=2;var oe=v.updateQueue;if(oe!==null){oe=oe.shared;var Ee=oe.pending;Ee===null?j.next=j:(j.next=Ee.next,Ee.next=j),oe.pending=j}}v.lanes|=a,j=v.alternate,j!==null&&(j.lanes|=a),zc(v.return,a,i),F.lanes|=a;break}j=j.next}}else if(v.tag===10)T=v.type===i.type?null:v.child;else if(v.tag===18){if(T=v.return,T===null)throw Error(t(341));T.lanes|=a,F=T.alternate,F!==null&&(F.lanes|=a),zc(T,a,i),T=v.sibling}else T=v.child;if(T!==null)T.return=v;else for(T=v;T!==null;){if(T===i){T=null;break}if(v=T.sibling,v!==null){v.return=T.return,T=v;break}T=T.return}v=T}Sn(n,i,h.children,a),i=i.child}return i;case 9:return h=i.type,c=i.pendingProps.children,Ts(i,a),h=Zn(h),c=c(h),i.flags|=1,Sn(n,i,c,a),i.child;case 14:return c=i.type,h=ai(c,i.pendingProps),h=ai(c.type,h),Dh(n,i,c,h,a);case 15:return Ih(n,i,i.type,i.pendingProps,a);case 17:return c=i.type,h=i.pendingProps,h=i.elementType===c?h:ai(c,h),Za(n,i),i.tag=1,Ln(c)?(n=!0,Ia(i)):n=!1,Ts(i,a),Th(i,c,h),nu(i,c,h,a),ou(null,i,c,!0,n,a);case 19:return Hh(n,i,a);case 22:return Nh(n,i,a)}throw Error(t(156,i.tag))};function dp(n,i){return ae(n,i)}function Uv(n,i,a,c){this.tag=n,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=c,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ei(n,i,a,c){return new Uv(n,i,a,c)}function Au(n){return n=n.prototype,!(!n||!n.isReactComponent)}function Ov(n){if(typeof n=="function")return Au(n)?1:0;if(n!=null){if(n=n.$$typeof,n===se)return 11;if(n===H)return 14}return 2}function hr(n,i){var a=n.alternate;return a===null?(a=ei(n.tag,i,n.key,n.mode),a.elementType=n.elementType,a.type=n.type,a.stateNode=n.stateNode,a.alternate=n,n.alternate=a):(a.pendingProps=i,a.type=n.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=n.flags&14680064,a.childLanes=n.childLanes,a.lanes=n.lanes,a.child=n.child,a.memoizedProps=n.memoizedProps,a.memoizedState=n.memoizedState,a.updateQueue=n.updateQueue,i=n.dependencies,a.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},a.sibling=n.sibling,a.index=n.index,a.ref=n.ref,a}function ll(n,i,a,c,h,v){var T=2;if(c=n,typeof n=="function")Au(n)&&(T=1);else if(typeof n=="string")T=5;else e:switch(n){case N:return jr(a.children,h,v,i);case fe:T=8,h|=8;break;case C:return n=ei(12,a,i,h|2),n.elementType=C,n.lanes=v,n;case re:return n=ei(13,a,i,h),n.elementType=re,n.lanes=v,n;case B:return n=ei(19,a,i,h),n.elementType=B,n.lanes=v,n;case Z:return cl(a,h,v,i);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case L:T=10;break e;case ie:T=9;break e;case se:T=11;break e;case H:T=14;break e;case $:T=16,c=null;break e}throw Error(t(130,n==null?n:typeof n,""))}return i=ei(T,a,i,h),i.elementType=n,i.type=c,i.lanes=v,i}function jr(n,i,a,c){return n=ei(7,n,c,i),n.lanes=a,n}function cl(n,i,a,c){return n=ei(22,n,c,i),n.elementType=Z,n.lanes=a,n.stateNode={isHidden:!1},n}function Cu(n,i,a){return n=ei(6,n,null,i),n.lanes=a,n}function Ru(n,i,a){return i=ei(4,n.children!==null?n.children:[],n.key,i),i.lanes=a,i.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},i}function Fv(n,i,a,c,h){this.tag=i,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ls(0),this.expirationTimes=ls(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ls(0),this.identifierPrefix=c,this.onRecoverableError=h,this.mutableSourceEagerHydrationData=null}function bu(n,i,a,c,h,v,T,F,j){return n=new Fv(n,i,a,F,j),i===1?(i=1,v===!0&&(i|=8)):i=0,v=ei(3,null,null,i),n.current=v,v.stateNode=n,v.memoizedState={element:c,isDehydrated:a,cache:null,transitions:null,pendingSuspenseBoundaries:null},Gc(v),n}function kv(n,i,a){var c=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:k,key:c==null?null:""+c,children:n,containerInfo:i,implementation:a}}function fp(n){if(!n)return rr;n=n._reactInternals;e:{if(Ci(n)!==n||n.tag!==1)throw Error(t(170));var i=n;do{switch(i.tag){case 3:i=i.stateNode.context;break e;case 1:if(Ln(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break e}}i=i.return}while(i!==null);throw Error(t(171))}if(n.tag===1){var a=n.type;if(Ln(a))return zf(n,a,i)}return i}function hp(n,i,a,c,h,v,T,F,j){return n=bu(a,c,!0,n,h,v,T,F,j),n.context=fp(null),a=n.current,c=Mn(),h=dr(a),v=Ni(c,h),v.callback=i??null,ar(a,v,h),n.current.lanes=h,uo(n,h,c),In(n,c),n}function ul(n,i,a,c){var h=i.current,v=Mn(),T=dr(h);return a=fp(a),i.context===null?i.context=a:i.pendingContext=a,i=Ni(v,T),i.payload={element:n},c=c===void 0?null:c,c!==null&&(i.callback=c),n=ar(h,i,T),n!==null&&(ui(n,h,T,v),Ha(n,h,T)),T}function dl(n){return n=n.current,n.child?(n.child.tag===5,n.child.stateNode):null}function pp(n,i){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var a=n.retryLane;n.retryLane=a!==0&&a<i?a:i}}function Lu(n,i){pp(n,i),(n=n.alternate)&&pp(n,i)}function Bv(){return null}var mp=typeof reportError=="function"?reportError:function(n){console.error(n)};function Pu(n){this._internalRoot=n}fl.prototype.render=Pu.prototype.render=function(n){var i=this._internalRoot;if(i===null)throw Error(t(409));ul(n,i,null,null)},fl.prototype.unmount=Pu.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var i=n.containerInfo;Gr(function(){ul(null,n,null,null)}),i[bi]=null}};function fl(n){this._internalRoot=n}fl.prototype.unstable_scheduleHydration=function(n){if(n){var i=Zd();n={blockedOn:null,target:n,priority:i};for(var a=0;a<Ji.length&&i!==0&&i<Ji[a].priority;a++);Ji.splice(a,0,n),a===0&&ef(n)}};function Du(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function hl(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function gp(){}function zv(n,i,a,c,h){if(h){if(typeof c=="function"){var v=c;c=function(){var oe=dl(T);v.call(oe)}}var T=hp(i,c,n,0,null,!1,!1,"",gp);return n._reactRootContainer=T,n[bi]=T.current,wo(n.nodeType===8?n.parentNode:n),Gr(),T}for(;h=n.lastChild;)n.removeChild(h);if(typeof c=="function"){var F=c;c=function(){var oe=dl(j);F.call(oe)}}var j=bu(n,0,!1,null,null,!1,!1,"",gp);return n._reactRootContainer=j,n[bi]=j.current,wo(n.nodeType===8?n.parentNode:n),Gr(function(){ul(i,j,a,c)}),j}function pl(n,i,a,c,h){var v=a._reactRootContainer;if(v){var T=v;if(typeof h=="function"){var F=h;h=function(){var j=dl(T);F.call(j)}}ul(i,T,n,h)}else T=zv(a,i,n,h,c);return dl(T)}$d=function(n){switch(n.tag){case 3:var i=n.stateNode;if(i.current.memoizedState.isDehydrated){var a=zt(i.pendingLanes);a!==0&&(nc(i,a|1),In(i,ke()),(xt&6)===0&&(bs=ke()+500,sr()))}break;case 13:Gr(function(){var c=Ii(n,1);if(c!==null){var h=Mn();ui(c,n,1,h)}}),Lu(n,1)}},ic=function(n){if(n.tag===13){var i=Ii(n,134217728);if(i!==null){var a=Mn();ui(i,n,134217728,a)}Lu(n,134217728)}},Kd=function(n){if(n.tag===13){var i=dr(n),a=Ii(n,i);if(a!==null){var c=Mn();ui(a,n,i,c)}Lu(n,i)}},Zd=function(){return At},Qd=function(n,i){var a=At;try{return At=n,i()}finally{At=a}},be=function(n,i,a){switch(i){case"input":if(rt(n,a),i=a.name,a.type==="radio"&&i!=null){for(a=n;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),i=0;i<a.length;i++){var c=a[i];if(c!==n&&c.form===n.form){var h=Pa(c);if(!h)throw Error(t(90));K(c),rt(c,h)}}}break;case"textarea":ve(n,a);break;case"select":i=a.value,i!=null&&te(n,!!a.multiple,i,!1)}},Tt=Eu,wt=Gr;var Hv={usingClientEntryPoint:!1,Events:[Ro,gs,Pa,nt,Ke,Eu]},Go={findFiberByHostInstance:Nr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Gv={bundleType:Go.bundleType,version:Go.version,rendererPackageName:Go.rendererPackageName,rendererConfig:Go.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:b.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=le(n),n===null?null:n.stateNode},findFiberByHostInstance:Go.findFiberByHostInstance||Bv,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ml=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ml.isDisabled&&ml.supportsFiber)try{Cn=ml.inject(Gv),_t=ml}catch{}}return Nn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Hv,Nn.createPortal=function(n,i){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Du(i))throw Error(t(200));return kv(n,i,null,a)},Nn.createRoot=function(n,i){if(!Du(n))throw Error(t(299));var a=!1,c="",h=mp;return i!=null&&(i.unstable_strictMode===!0&&(a=!0),i.identifierPrefix!==void 0&&(c=i.identifierPrefix),i.onRecoverableError!==void 0&&(h=i.onRecoverableError)),i=bu(n,1,!1,null,null,a,!1,c,h),n[bi]=i.current,wo(n.nodeType===8?n.parentNode:n),new Pu(i)},Nn.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var i=n._reactInternals;if(i===void 0)throw typeof n.render=="function"?Error(t(188)):(n=Object.keys(n).join(","),Error(t(268,n)));return n=le(i),n=n===null?null:n.stateNode,n},Nn.flushSync=function(n){return Gr(n)},Nn.hydrate=function(n,i,a){if(!hl(i))throw Error(t(200));return pl(null,n,i,!0,a)},Nn.hydrateRoot=function(n,i,a){if(!Du(n))throw Error(t(405));var c=a!=null&&a.hydratedSources||null,h=!1,v="",T=mp;if(a!=null&&(a.unstable_strictMode===!0&&(h=!0),a.identifierPrefix!==void 0&&(v=a.identifierPrefix),a.onRecoverableError!==void 0&&(T=a.onRecoverableError)),i=hp(i,null,n,1,a??null,h,!1,v,T),n[bi]=i.current,wo(n),c)for(n=0;n<c.length;n++)a=c[n],h=a._getVersion,h=h(a._source),i.mutableSourceEagerHydrationData==null?i.mutableSourceEagerHydrationData=[a,h]:i.mutableSourceEagerHydrationData.push(a,h);return new fl(i)},Nn.render=function(n,i,a){if(!hl(i))throw Error(t(200));return pl(null,n,i,!1,a)},Nn.unmountComponentAtNode=function(n){if(!hl(n))throw Error(t(40));return n._reactRootContainer?(Gr(function(){pl(null,null,n,!1,function(){n._reactRootContainer=null,n[bi]=null})}),!0):!1},Nn.unstable_batchedUpdates=Eu,Nn.unstable_renderSubtreeIntoContainer=function(n,i,a,c){if(!hl(a))throw Error(t(200));if(n==null||n._reactInternals===void 0)throw Error(t(38));return pl(n,i,a,!1,c)},Nn.version="18.3.1-next-f1338f8080-20240426",Nn}var Tp;function pg(){if(Tp)return Uu.exports;Tp=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),Uu.exports=Zv(),Uu.exports}var wp;function Qv(){if(wp)return gl;wp=1;var r=pg();return gl.createRoot=r.createRoot,gl.hydrateRoot=r.hydrateRoot,gl}var Jv=Qv();const e_=fg(Jv);pg();function Zo(){return Zo=Object.assign?Object.assign.bind():function(r){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(r[s]=t[s])}return r},Zo.apply(this,arguments)}var Sr;(function(r){r.Pop="POP",r.Push="PUSH",r.Replace="REPLACE"})(Sr||(Sr={}));const Ap="popstate";function t_(r){r===void 0&&(r={});function e(s,o){let{pathname:l,search:u,hash:d}=s.location;return Ed("",{pathname:l,search:u,hash:d},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function t(s,o){return typeof o=="string"?o:mg(o)}return i_(e,t,null,r)}function Xt(r,e){if(r===!1||r===null||typeof r>"u")throw new Error(e)}function Od(r,e){if(!r){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function n_(){return Math.random().toString(36).substr(2,8)}function Cp(r,e){return{usr:r.state,key:r.key,idx:e}}function Ed(r,e,t,s){return t===void 0&&(t=null),Zo({pathname:typeof r=="string"?r:r.pathname,search:"",hash:""},typeof e=="string"?so(e):e,{state:t,key:e&&e.key||s||n_()})}function mg(r){let{pathname:e="/",search:t="",hash:s=""}=r;return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),s&&s!=="#"&&(e+=s.charAt(0)==="#"?s:"#"+s),e}function so(r){let e={};if(r){let t=r.indexOf("#");t>=0&&(e.hash=r.substr(t),r=r.substr(0,t));let s=r.indexOf("?");s>=0&&(e.search=r.substr(s),r=r.substr(0,s)),r&&(e.pathname=r)}return e}function i_(r,e,t,s){s===void 0&&(s={});let{window:o=document.defaultView,v5Compat:l=!1}=s,u=o.history,d=Sr.Pop,f=null,p=g();p==null&&(p=0,u.replaceState(Zo({},u.state,{idx:p}),""));function g(){return(u.state||{idx:null}).idx}function m(){d=Sr.Pop;let x=g(),y=x==null?null:x-p;p=x,f&&f({action:d,location:M.location,delta:y})}function _(x,y){d=Sr.Push;let w=Ed(M.location,x,y);p=g()+1;let R=Cp(w,p),b=M.createHref(w);try{u.pushState(R,"",b)}catch(z){if(z instanceof DOMException&&z.name==="DataCloneError")throw z;o.location.assign(b)}l&&f&&f({action:d,location:M.location,delta:1})}function S(x,y){d=Sr.Replace;let w=Ed(M.location,x,y);p=g();let R=Cp(w,p),b=M.createHref(w);u.replaceState(R,"",b),l&&f&&f({action:d,location:M.location,delta:0})}function E(x){let y=o.location.origin!=="null"?o.location.origin:o.location.href,w=typeof x=="string"?x:mg(x);return w=w.replace(/ $/,"%20"),Xt(y,"No window.location.(origin|href) available to create URL for href: "+w),new URL(w,y)}let M={get action(){return d},get location(){return r(o,u)},listen(x){if(f)throw new Error("A history only accepts one active listener");return o.addEventListener(Ap,m),f=x,()=>{o.removeEventListener(Ap,m),f=null}},createHref(x){return e(o,x)},createURL:E,encodeLocation(x){let y=E(x);return{pathname:y.pathname,search:y.search,hash:y.hash}},push:_,replace:S,go(x){return u.go(x)}};return M}var Rp;(function(r){r.data="data",r.deferred="deferred",r.redirect="redirect",r.error="error"})(Rp||(Rp={}));function r_(r,e,t){return t===void 0&&(t="/"),s_(r,e,t)}function s_(r,e,t,s){let o=typeof e=="string"?so(e):e,l=_g(o.pathname||"/",t);if(l==null)return null;let u=gg(r);o_(u);let d=null;for(let f=0;d==null&&f<u.length;++f){let p=__(l);d=m_(u[f],p)}return d}function gg(r,e,t,s){e===void 0&&(e=[]),t===void 0&&(t=[]),s===void 0&&(s="");let o=(l,u,d)=>{let f={relativePath:d===void 0?l.path||"":d,caseSensitive:l.caseSensitive===!0,childrenIndex:u,route:l};f.relativePath.startsWith("/")&&(Xt(f.relativePath.startsWith(s),'Absolute route path "'+f.relativePath+'" nested under path '+('"'+s+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),f.relativePath=f.relativePath.slice(s.length));let p=ts([s,f.relativePath]),g=t.concat(f);l.children&&l.children.length>0&&(Xt(l.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+p+'".')),gg(l.children,e,g,p)),!(l.path==null&&!l.index)&&e.push({path:p,score:h_(p,l.index),routesMeta:g})};return r.forEach((l,u)=>{var d;if(l.path===""||!((d=l.path)!=null&&d.includes("?")))o(l,u);else for(let f of vg(l.path))o(l,u,f)}),e}function vg(r){let e=r.split("/");if(e.length===0)return[];let[t,...s]=e,o=t.endsWith("?"),l=t.replace(/\?$/,"");if(s.length===0)return o?[l,""]:[l];let u=vg(s.join("/")),d=[];return d.push(...u.map(f=>f===""?l:[l,f].join("/"))),o&&d.push(...u),d.map(f=>r.startsWith("/")&&f===""?"/":f)}function o_(r){r.sort((e,t)=>e.score!==t.score?t.score-e.score:p_(e.routesMeta.map(s=>s.childrenIndex),t.routesMeta.map(s=>s.childrenIndex)))}const a_=/^:[\w-]+$/,l_=3,c_=2,u_=1,d_=10,f_=-2,bp=r=>r==="*";function h_(r,e){let t=r.split("/"),s=t.length;return t.some(bp)&&(s+=f_),e&&(s+=c_),t.filter(o=>!bp(o)).reduce((o,l)=>o+(a_.test(l)?l_:l===""?u_:d_),s)}function p_(r,e){return r.length===e.length&&r.slice(0,-1).every((s,o)=>s===e[o])?r[r.length-1]-e[e.length-1]:0}function m_(r,e,t){let{routesMeta:s}=r,o={},l="/",u=[];for(let d=0;d<s.length;++d){let f=s[d],p=d===s.length-1,g=l==="/"?e:e.slice(l.length)||"/",m=g_({path:f.relativePath,caseSensitive:f.caseSensitive,end:p},g),_=f.route;if(!m)return null;Object.assign(o,m.params),u.push({params:o,pathname:ts([l,m.pathname]),pathnameBase:E_(ts([l,m.pathnameBase])),route:_}),m.pathnameBase!=="/"&&(l=ts([l,m.pathnameBase]))}return u}function g_(r,e){typeof r=="string"&&(r={path:r,caseSensitive:!1,end:!0});let[t,s]=v_(r.path,r.caseSensitive,r.end),o=e.match(t);if(!o)return null;let l=o[0],u=l.replace(/(.)\/+$/,"$1"),d=o.slice(1);return{params:s.reduce((p,g,m)=>{let{paramName:_,isOptional:S}=g;if(_==="*"){let M=d[m]||"";u=l.slice(0,l.length-M.length).replace(/(.)\/+$/,"$1")}const E=d[m];return S&&!E?p[_]=void 0:p[_]=(E||"").replace(/%2F/g,"/"),p},{}),pathname:l,pathnameBase:u,pattern:r}}function v_(r,e,t){e===void 0&&(e=!1),t===void 0&&(t=!0),Od(r==="*"||!r.endsWith("*")||r.endsWith("/*"),'Route path "'+r+'" will be treated as if it were '+('"'+r.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+r.replace(/\*$/,"/*")+'".'));let s=[],o="^"+r.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(u,d,f)=>(s.push({paramName:d,isOptional:f!=null}),f?"/?([^\\/]+)?":"/([^\\/]+)"));return r.endsWith("*")?(s.push({paramName:"*"}),o+=r==="*"||r==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):t?o+="\\/*$":r!==""&&r!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,e?void 0:"i"),s]}function __(r){try{return r.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return Od(!1,'The URL path "'+r+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),r}}function _g(r,e){if(e==="/")return r;if(!r.toLowerCase().startsWith(e.toLowerCase()))return null;let t=e.endsWith("/")?e.length-1:e.length,s=r.charAt(t);return s&&s!=="/"?null:r.slice(t)||"/"}const x_=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,y_=r=>x_.test(r);function S_(r,e){e===void 0&&(e="/");let{pathname:t,search:s="",hash:o=""}=typeof r=="string"?so(r):r,l;if(t)if(y_(t))l=t;else{if(t.includes("//")){let u=t;t=t.replace(/\/\/+/g,"/"),Od(!1,"Pathnames cannot have embedded double slashes - normalizing "+(u+" -> "+t))}t.startsWith("/")?l=Lp(t.substring(1),"/"):l=Lp(t,e)}else l=e;return{pathname:l,search:T_(s),hash:w_(o)}}function Lp(r,e){let t=e.replace(/\/+$/,"").split("/");return r.split("/").forEach(o=>{o===".."?t.length>1&&t.pop():o!=="."&&t.push(o)}),t.length>1?t.join("/"):"/"}function ku(r,e,t,s){return"Cannot include a '"+r+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(s)+"].  Please separate it out to the ")+("`to."+t+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function M_(r){return r.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function xg(r,e){let t=M_(r);return e?t.map((s,o)=>o===t.length-1?s.pathname:s.pathnameBase):t.map(s=>s.pathnameBase)}function yg(r,e,t,s){s===void 0&&(s=!1);let o;typeof r=="string"?o=so(r):(o=Zo({},r),Xt(!o.pathname||!o.pathname.includes("?"),ku("?","pathname","search",o)),Xt(!o.pathname||!o.pathname.includes("#"),ku("#","pathname","hash",o)),Xt(!o.search||!o.search.includes("#"),ku("#","search","hash",o)));let l=r===""||o.pathname==="",u=l?"/":o.pathname,d;if(u==null)d=t;else{let m=e.length-1;if(!s&&u.startsWith("..")){let _=u.split("/");for(;_[0]==="..";)_.shift(),m-=1;o.pathname=_.join("/")}d=m>=0?e[m]:"/"}let f=S_(o,d),p=u&&u!=="/"&&u.endsWith("/"),g=(l||u===".")&&t.endsWith("/");return!f.pathname.endsWith("/")&&(p||g)&&(f.pathname+="/"),f}const ts=r=>r.join("/").replace(/\/\/+/g,"/"),E_=r=>r.replace(/\/+$/,"").replace(/^\/*/,"/"),T_=r=>!r||r==="?"?"":r.startsWith("?")?r:"?"+r,w_=r=>!r||r==="#"?"":r.startsWith("#")?r:"#"+r;function A_(r){return r!=null&&typeof r.status=="number"&&typeof r.statusText=="string"&&typeof r.internal=="boolean"&&"data"in r}const Sg=["post","put","patch","delete"];new Set(Sg);const C_=["get",...Sg];new Set(C_);function Qo(){return Qo=Object.assign?Object.assign.bind():function(r){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(r[s]=t[s])}return r},Qo.apply(this,arguments)}const Fd=ge.createContext(null),R_=ge.createContext(null),na=ge.createContext(null),$l=ge.createContext(null),br=ge.createContext({outlet:null,matches:[],isDataRoute:!1}),Mg=ge.createContext(null);function ia(){return ge.useContext($l)!=null}function kd(){return ia()||Xt(!1),ge.useContext($l).location}function Eg(r){ge.useContext(na).static||ge.useLayoutEffect(r)}function ra(){let{isDataRoute:r}=ge.useContext(br);return r?H_():b_()}function b_(){ia()||Xt(!1);let r=ge.useContext(Fd),{basename:e,future:t,navigator:s}=ge.useContext(na),{matches:o}=ge.useContext(br),{pathname:l}=kd(),u=JSON.stringify(xg(o,t.v7_relativeSplatPath)),d=ge.useRef(!1);return Eg(()=>{d.current=!0}),ge.useCallback(function(p,g){if(g===void 0&&(g={}),!d.current)return;if(typeof p=="number"){s.go(p);return}let m=yg(p,JSON.parse(u),l,g.relative==="path");r==null&&e!=="/"&&(m.pathname=m.pathname==="/"?e:ts([e,m.pathname])),(g.replace?s.replace:s.push)(m,g.state,g)},[e,s,u,l,r])}function Tg(){let{matches:r}=ge.useContext(br),e=r[r.length-1];return e?e.params:{}}function L_(r,e){return P_(r,e)}function P_(r,e,t,s){ia()||Xt(!1);let{navigator:o}=ge.useContext(na),{matches:l}=ge.useContext(br),u=l[l.length-1],d=u?u.params:{};u&&u.pathname;let f=u?u.pathnameBase:"/";u&&u.route;let p=kd(),g;if(e){var m;let x=typeof e=="string"?so(e):e;f==="/"||(m=x.pathname)!=null&&m.startsWith(f)||Xt(!1),g=x}else g=p;let _=g.pathname||"/",S=_;if(f!=="/"){let x=f.replace(/^\//,"").split("/");S="/"+_.replace(/^\//,"").split("/").slice(x.length).join("/")}let E=r_(r,{pathname:S}),M=O_(E&&E.map(x=>Object.assign({},x,{params:Object.assign({},d,x.params),pathname:ts([f,o.encodeLocation?o.encodeLocation(x.pathname).pathname:x.pathname]),pathnameBase:x.pathnameBase==="/"?f:ts([f,o.encodeLocation?o.encodeLocation(x.pathnameBase).pathname:x.pathnameBase])})),l,t,s);return e&&M?ge.createElement($l.Provider,{value:{location:Qo({pathname:"/",search:"",hash:"",state:null,key:"default"},g),navigationType:Sr.Pop}},M):M}function D_(){let r=z_(),e=A_(r)?r.status+" "+r.statusText:r instanceof Error?r.message:JSON.stringify(r),t=r instanceof Error?r.stack:null,o={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return ge.createElement(ge.Fragment,null,ge.createElement("h2",null,"Unexpected Application Error!"),ge.createElement("h3",{style:{fontStyle:"italic"}},e),t?ge.createElement("pre",{style:o},t):null,null)}const I_=ge.createElement(D_,null);class N_ extends ge.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return this.state.error!==void 0?ge.createElement(br.Provider,{value:this.props.routeContext},ge.createElement(Mg.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function U_(r){let{routeContext:e,match:t,children:s}=r,o=ge.useContext(Fd);return o&&o.static&&o.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(o.staticContext._deepestRenderedBoundaryId=t.route.id),ge.createElement(br.Provider,{value:e},s)}function O_(r,e,t,s){var o;if(e===void 0&&(e=[]),t===void 0&&(t=null),s===void 0&&(s=null),r==null){var l;if(!t)return null;if(t.errors)r=t.matches;else if((l=s)!=null&&l.v7_partialHydration&&e.length===0&&!t.initialized&&t.matches.length>0)r=t.matches;else return null}let u=r,d=(o=t)==null?void 0:o.errors;if(d!=null){let g=u.findIndex(m=>m.route.id&&d?.[m.route.id]!==void 0);g>=0||Xt(!1),u=u.slice(0,Math.min(u.length,g+1))}let f=!1,p=-1;if(t&&s&&s.v7_partialHydration)for(let g=0;g<u.length;g++){let m=u[g];if((m.route.HydrateFallback||m.route.hydrateFallbackElement)&&(p=g),m.route.id){let{loaderData:_,errors:S}=t,E=m.route.loader&&_[m.route.id]===void 0&&(!S||S[m.route.id]===void 0);if(m.route.lazy||E){f=!0,p>=0?u=u.slice(0,p+1):u=[u[0]];break}}}return u.reduceRight((g,m,_)=>{let S,E=!1,M=null,x=null;t&&(S=d&&m.route.id?d[m.route.id]:void 0,M=m.route.errorElement||I_,f&&(p<0&&_===0?(G_("route-fallback"),E=!0,x=null):p===_&&(E=!0,x=m.route.hydrateFallbackElement||null)));let y=e.concat(u.slice(0,_+1)),w=()=>{let R;return S?R=M:E?R=x:m.route.Component?R=ge.createElement(m.route.Component,null):m.route.element?R=m.route.element:R=g,ge.createElement(U_,{match:m,routeContext:{outlet:g,matches:y,isDataRoute:t!=null},children:R})};return t&&(m.route.ErrorBoundary||m.route.errorElement||_===0)?ge.createElement(N_,{location:t.location,revalidation:t.revalidation,component:M,error:S,children:w(),routeContext:{outlet:null,matches:y,isDataRoute:!0}}):w()},null)}var wg=(function(r){return r.UseBlocker="useBlocker",r.UseRevalidator="useRevalidator",r.UseNavigateStable="useNavigate",r})(wg||{}),Ag=(function(r){return r.UseBlocker="useBlocker",r.UseLoaderData="useLoaderData",r.UseActionData="useActionData",r.UseRouteError="useRouteError",r.UseNavigation="useNavigation",r.UseRouteLoaderData="useRouteLoaderData",r.UseMatches="useMatches",r.UseRevalidator="useRevalidator",r.UseNavigateStable="useNavigate",r.UseRouteId="useRouteId",r})(Ag||{});function F_(r){let e=ge.useContext(Fd);return e||Xt(!1),e}function k_(r){let e=ge.useContext(R_);return e||Xt(!1),e}function B_(r){let e=ge.useContext(br);return e||Xt(!1),e}function Cg(r){let e=B_(),t=e.matches[e.matches.length-1];return t.route.id||Xt(!1),t.route.id}function z_(){var r;let e=ge.useContext(Mg),t=k_(),s=Cg();return e!==void 0?e:(r=t.errors)==null?void 0:r[s]}function H_(){let{router:r}=F_(wg.UseNavigateStable),e=Cg(Ag.UseNavigateStable),t=ge.useRef(!1);return Eg(()=>{t.current=!0}),ge.useCallback(function(o,l){l===void 0&&(l={}),t.current&&(typeof o=="number"?r.navigate(o):r.navigate(o,Qo({fromRouteId:e},l)))},[r,e])}const Pp={};function G_(r,e,t){Pp[r]||(Pp[r]=!0)}function V_(r,e){r?.v7_startTransition,r?.v7_relativeSplatPath}function W_(r){let{to:e,replace:t,state:s,relative:o}=r;ia()||Xt(!1);let{future:l,static:u}=ge.useContext(na),{matches:d}=ge.useContext(br),{pathname:f}=kd(),p=ra(),g=yg(e,xg(d,l.v7_relativeSplatPath),f,o==="path"),m=JSON.stringify(g);return ge.useEffect(()=>p(JSON.parse(m),{replace:t,state:s,relative:o}),[p,m,o,t,s]),null}function qs(r){Xt(!1)}function j_(r){let{basename:e="/",children:t=null,location:s,navigationType:o=Sr.Pop,navigator:l,static:u=!1,future:d}=r;ia()&&Xt(!1);let f=e.replace(/^\/*/,"/"),p=ge.useMemo(()=>({basename:f,navigator:l,static:u,future:Qo({v7_relativeSplatPath:!1},d)}),[f,d,l,u]);typeof s=="string"&&(s=so(s));let{pathname:g="/",search:m="",hash:_="",state:S=null,key:E="default"}=s,M=ge.useMemo(()=>{let x=_g(g,f);return x==null?null:{location:{pathname:x,search:m,hash:_,state:S,key:E},navigationType:o}},[f,g,m,_,S,E,o]);return M==null?null:ge.createElement(na.Provider,{value:p},ge.createElement($l.Provider,{children:t,value:M}))}function X_(r){let{children:e,location:t}=r;return L_(Td(e),t)}new Promise(()=>{});function Td(r,e){e===void 0&&(e=[]);let t=[];return ge.Children.forEach(r,(s,o)=>{if(!ge.isValidElement(s))return;let l=[...e,o];if(s.type===ge.Fragment){t.push.apply(t,Td(s.props.children,l));return}s.type!==qs&&Xt(!1),!s.props.index||!s.props.children||Xt(!1);let u={id:s.props.id||l.join("-"),caseSensitive:s.props.caseSensitive,element:s.props.element,Component:s.props.Component,index:s.props.index,path:s.props.path,loader:s.props.loader,action:s.props.action,errorElement:s.props.errorElement,ErrorBoundary:s.props.ErrorBoundary,hasErrorBoundary:s.props.ErrorBoundary!=null||s.props.errorElement!=null,shouldRevalidate:s.props.shouldRevalidate,handle:s.props.handle,lazy:s.props.lazy};s.props.children&&(u.children=Td(s.props.children,l)),t.push(u)}),t}const Y_="6";try{window.__reactRouterVersion=Y_}catch{}const q_="startTransition",Dp=qv[q_];function $_(r){let{basename:e,children:t,future:s,window:o}=r,l=ge.useRef();l.current==null&&(l.current=t_({window:o,v5Compat:!0}));let u=l.current,[d,f]=ge.useState({action:u.action,location:u.location}),{v7_startTransition:p}=s||{},g=ge.useCallback(m=>{p&&Dp?Dp(()=>f(m)):f(m)},[f,p]);return ge.useLayoutEffect(()=>u.listen(g),[u,g]),ge.useEffect(()=>V_(s),[s]),ge.createElement(j_,{basename:e,children:t,location:d.location,navigationType:d.action,navigator:u,future:s})}var Ip;(function(r){r.UseScrollRestoration="useScrollRestoration",r.UseSubmit="useSubmit",r.UseSubmitFetcher="useSubmitFetcher",r.UseFetcher="useFetcher",r.useViewTransitionState="useViewTransitionState"})(Ip||(Ip={}));var Np;(function(r){r.UseFetcher="useFetcher",r.UseFetchers="useFetchers",r.UseScrollRestoration="useScrollRestoration"})(Np||(Np={}));const K_="worldwright-db",Z_=3,Jo="worlds",ea="index";let Bu=null;function Kl(){return Bu||(Bu=new Promise((r,e)=>{const t=indexedDB.open(K_,Z_);t.onupgradeneeded=()=>{const o=t.result;o.objectStoreNames.contains(Jo)||o.createObjectStore(Jo,{keyPath:"metadata.id"}),o.objectStoreNames.contains(ea)||o.createObjectStore(ea,{keyPath:"id"})},t.onblocked=()=>{e(new Error("Database upgrade blocked. Please close other WorldWright tabs and try again."))};const s=setTimeout(()=>{e(new Error("Opening database timed out. Try reloading or resetting storage."))},5e3);t.onerror=()=>{clearTimeout(s),e(t.error)},t.onsuccess=()=>{clearTimeout(s),r(t.result)}})),Bu}function eo(r,e,t,s){return new Promise((o,l)=>{const u=r.transaction(e,t),d=u.objectStore(e),f=s(d);f.onsuccess=()=>o(f.result),f.onerror=()=>l(f.error),u.onerror=()=>l(u.error)})}function Q_(r){const e=new Date().toISOString(),t=r.metadata.createdAt||e;return{id:r.metadata.id,name:r.metadata.name||"Untitled World",seed:r.metadata.seed||"",createdAt:t,updatedAt:e,version:r.metadata.version||"unknown",styleMode:r.metadata.styleMode||"unknown"}}async function J_(){const r=await Kl();return eo(r,ea,"readonly",e=>e.getAll())}async function zu(r){const e=await Kl();return eo(e,Jo,"readonly",t=>t.get(r))}async function Rg(r){const e=await Kl(),t=Q_(r);return r.metadata.updatedAt=t.updatedAt,await eo(e,Jo,"readwrite",s=>s.put(r)),await eo(e,ea,"readwrite",s=>s.put(t)),r}async function ex(r){const e=await Kl();await eo(e,Jo,"readwrite",t=>t.delete(r)),await eo(e,ea,"readwrite",t=>t.delete(r))}function Up(r){try{return new Date(r).toLocaleString()}catch{return String(r)}}function tx(){const r=ra(),[e,t]=ge.useState([]),[s,o]=ge.useState(!0),[l,u]=ge.useState(null);async function d(){try{o(!0),u(null);const p=await J_();t(p)}catch(p){u(p?.message||String(p))}finally{o(!1)}}ge.useEffect(()=>{d()},[]);const f=async p=>{confirm("Delete this world? This cannot be undone.")&&(await ex(p),await d())};return O.jsxs("div",{style:{padding:24},children:[O.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[O.jsx("h1",{children:"WorldWright"}),O.jsx("button",{onClick:()=>r("/generate"),style:{padding:"10px 16px",borderRadius:12,fontWeight:900,background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",color:"white",border:"none",cursor:"pointer"},children:"+ Generate New World"})]}),O.jsx("div",{style:{marginTop:18},children:s?O.jsx("div",{style:{padding:12},children:"Loading…"}):l?O.jsx("div",{style:{padding:12,color:"#c33"},children:l}):e.length===0?O.jsxs("div",{style:{marginTop:16,padding:18,borderRadius:16,border:"1px solid rgba(0,0,0,0.12)",opacity:.9},children:[O.jsx("div",{style:{fontWeight:900,fontSize:16},children:"No worlds yet."}),O.jsx("div",{style:{marginTop:8,opacity:.8},children:"Create your first world in Generate Mode."}),O.jsx("div",{style:{marginTop:14},children:O.jsx("button",{onClick:()=>r("/generate"),style:{padding:"10px 12px",borderRadius:12,fontWeight:900},children:"Go to Generate"})})]}):O.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))",gap:12},children:e.map(p=>{const g=(p.name||"").trim()||"Untitled World";return O.jsxs("div",{style:{borderRadius:16,border:"1px solid rgba(0,0,0,0.12)",padding:14,display:"flex",flexDirection:"column",gap:10},children:[O.jsx("div",{style:{display:"flex",justifyContent:"space-between",gap:10},children:O.jsxs("div",{style:{minWidth:0},children:[O.jsx("div",{style:{fontWeight:950,fontSize:16,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:g}),O.jsxs("div",{style:{opacity:.7,fontSize:12,marginTop:3},children:[p.styleMode," • ",p.version]})]})}),O.jsxs("div",{style:{opacity:.8,fontSize:12,lineHeight:1.35},children:[O.jsxs("div",{children:[O.jsx("b",{children:"Updated:"})," ",Up(p.updatedAt)]}),O.jsxs("div",{children:[O.jsx("b",{children:"Created:"})," ",Up(p.createdAt)]})]}),O.jsxs("div",{style:{display:"flex",gap:8,marginTop:8},children:[O.jsx("button",{onClick:()=>r(`/create/${p.id}`),style:{flex:1,padding:"10px 10px",borderRadius:12,fontWeight:900},children:"Open (Create)"}),O.jsx("button",{onClick:()=>r(`/sim/${p.id}`),style:{padding:"10px 10px",borderRadius:12,fontWeight:900},children:"Sim"})]}),O.jsx("div",{style:{opacity:.55,fontSize:11,wordBreak:"break-all",marginTop:8},children:p.id}),O.jsx("div",{style:{display:"flex",gap:8,marginTop:10},children:O.jsx("button",{onClick:()=>f(p.id),children:"Delete"})})]},p.id)})})})]})}function nx({groups:r}){return O.jsx("div",{style:{padding:12,display:"flex",flexDirection:"column",gap:14},children:r.map(e=>O.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[O.jsx("div",{style:{fontSize:12,opacity:.8,letterSpacing:.5},children:e.title}),O.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:e.tools.map(t=>O.jsx("button",{onClick:t.onClick,disabled:t.disabled,style:{textAlign:"left",padding:"10px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:t.active?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.92)",opacity:t.disabled?.45:1,cursor:t.disabled?"not-allowed":"pointer"},children:t.label},t.id))})]},e.id))})}function ix({tools:r}){return O.jsx("div",{style:{padding:12,display:"flex",flexDirection:"column",gap:10},children:r.map(e=>O.jsx("button",{onClick:e.onClick,disabled:e.disabled,style:{textAlign:"left",padding:"10px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:e.active?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.92)",opacity:e.disabled?.45:1,cursor:e.disabled?"not-allowed":"pointer"},children:e.label},e.id))})}function rx(r){const{onGoHome:e,worldName:t,mode:s,onModeToggle:o,viewMode:l,onViewModeChange:u,isDirty:d}=r,f=!!o&&(s==="create"||s==="sim"),p=!!u&&s==="create";return O.jsxs("div",{style:{height:54,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 14px",borderBottom:"1px solid rgba(255,255,255,0.10)",background:"rgba(10,12,18,0.96)",color:"rgba(255,255,255,0.92)",boxSizing:"border-box"},children:[O.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[O.jsx("button",{onClick:e,style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Home"}),O.jsxs("div",{style:{display:"flex",flexDirection:"column",lineHeight:1.1},children:[O.jsxs("div",{style:{fontSize:14,fontWeight:650},children:[t||(s?s.toUpperCase():"WORLDWRIGHT"),d?" *":""]}),O.jsx("div",{style:{fontSize:12,opacity:.75},children:d?"Unsaved changes":"Saved"})]})]}),O.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[f&&O.jsx("button",{onClick:o,style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:s==="create"?"Go to Sim":"Go to Create"}),p&&O.jsxs("div",{style:{display:"flex",gap:8},children:[O.jsx("button",{onClick:()=>u?.("GLOBE"),style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:l==="GLOBE"?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Globe"}),O.jsx("button",{onClick:()=>u?.("MAP"),style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:l==="MAP"?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Map"})]}),O.jsx("button",{disabled:!0,style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:"rgba(255,255,255,0.03)",color:"rgba(255,255,255,0.65)",cursor:"not-allowed"},children:"Export"}),O.jsx("button",{disabled:!0,style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:"rgba(255,255,255,0.03)",color:"rgba(255,255,255,0.65)",cursor:"not-allowed"},children:"Settings"})]})]})}function ns(r){const{rightPanel:e,children:t,onGoHome:s,worldName:o,mode:l,onModeToggle:u,viewMode:d,onViewModeChange:f,isDirty:p,toolGroups:g,leftTools:m}=r,_=g&&g.length>0||m&&m.length>0;return O.jsxs("div",{style:{width:"100vw",height:"100vh",background:"rgb(10,12,18)",overflow:"hidden"},children:[O.jsx(rx,{onGoHome:s,worldName:o,mode:l,onModeToggle:u,viewMode:d,onViewModeChange:f,isDirty:p}),O.jsxs("div",{style:{height:"calc(100vh - 54px)",display:"grid",gridTemplateColumns:_?"260px 1fr 320px":"1fr 320px"},children:[_&&O.jsx("div",{style:{borderRight:"1px solid rgba(255,255,255,0.10)",background:"rgba(255,255,255,0.02)",overflow:"auto"},children:g&&g.length>0?O.jsx(nx,{groups:g}):O.jsx(ix,{tools:m||[]})}),O.jsx("div",{style:{position:"relative",overflow:"hidden"},children:t}),O.jsx("div",{style:{borderLeft:"1px solid rgba(255,255,255,0.10)",background:"rgba(255,255,255,0.02)",overflow:"auto"},children:e})]})]})}var yr=(r=>(r.OCEANIC="OCEANIC",r.CONTINENTAL="CONTINENTAL",r))(yr||{}),Mi=(r=>(r.NONE="NONE",r.DIVERGENT="DIVERGENT",r.CONVERGENT="CONVERGENT",r.TRANSFORM="TRANSFORM",r))(Mi||{}),wd=(r=>(r.ROCK="ROCK",r.VOLCANIC="VOLCANIC",r.SAND="SAND",r.ALLUVIAL="ALLUVIAL",r.PEAT="PEAT",r.SALT="SALT",r.PERMAFROST="PERMAFROST",r))(wd||{});function sx(r){return{index:r,baseHeight:0,editHeightDelta:0,simHeightDelta:0,isWater:!1,flowDirection:null,flowAccumulation:0,basinId:null,temperature:.5,rainfall:.5,climateCellId:0,prevailingWind:[0,0],plateId:0,plateType:"CONTINENTAL",boundaryType:"NONE",upliftRate:0,surfaceAge:.5,volcanicActivity:0,baseBiomeId:0,editBiomeId:0,surfaceType:"ROCK",snowCover:0,oceanDepthClass:null}}function Fn(r,e=["LOADED"]){ox(r),lx(r),cx(r),dx(r),ax(r),ux(r)}function ox(r){const e=r.seaLevel;for(const t of r.cells){const s=t.baseHeight+t.editHeightDelta+t.simHeightDelta;t.isWater=s<e}}function ax(r){for(const e of r.cells){const t=e.baseHeight+e.editHeightDelta+e.simHeightDelta,s=Wi(1-e.temperature),o=Wi((t-.15)*1.25),l=Wi(s*.85+o*.35);e.snowCover=l}}function lx(r){const e=r.gridWidth,t=r.gridHeight,s=r.cells,o=r.seaLevel;function l(u,d,f=4){let p=0,g=0;for(let m=-f;m<=f;m++){const _=u+m;if(!(_<0||_>=t))for(let S=-f;S<=f;S++){const E=((d+S)%e+e)%e;g++;const M=_*e+E,x=s[M];x&&x.isWater&&p++}}return g>0?p/g:0}for(let u=0;u<t;u++){const d=90-u/t*180,f=1-Math.abs(d)/90;for(let p=0;p<e;p++){const g=u*e+p,m=s[g];if(!m)continue;const _=m.baseHeight+m.editHeightDelta+m.simHeightDelta,S=Wi((_-o+.5)*.5),E=l(u,p,4),M=Wi(f*.9+(1-S)*.05+E*.05);let x=Wi(E*.6+f*.2+(M>.6?.05:0));x=Wi(x*(1-S*.5)),m.temperature=M,m.rainfall=x}}}function cx(r){const e=r.gridWidth,t=r.gridHeight,s=r.cells;function o(f){const p=s[f];return p?p.baseHeight+p.editHeightDelta+p.simHeightDelta:0}for(const f of s)f.flowDirection===void 0&&(f.flowDirection=null),typeof f.flowAccumulation!="number"&&(f.flowAccumulation=1),f.basinId===void 0&&(f.basinId=null);const l=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];for(let f=0;f<t;f++)for(let p=0;p<e;p++){const g=f*e+p,m=s[g];if(!m)continue;const _=o(g);let S=null,E=_;for(const[M,x]of l){const y=f+M;if(y<0||y>=t)continue;const w=((p+x)%e+e)%e,R=y*e+w,b=o(R);b<E-1e-6&&(E=b,S=R)}m.flowDirection=S}const u=s.map((f,p)=>p).sort((f,p)=>o(p)-o(f));for(const f of u){const p=s[f];if(!p)continue;const g=p.flowDirection;if(g!=null&&g>=0&&g<s.length){const m=s[g];m&&(m.flowAccumulation+=p.flowAccumulation)}}function d(f){let p=f;const g=new Set;for(let m=0;m<1e3;m++){if(g.has(p))return p;g.add(p);const _=s[p];if(!_||_.isWater)return p;const S=_.flowDirection;if(S==null)return p;p=S}return p}for(let f=0;f<s.length;f++)s[f].basinId=d(f)}function ux(r){r.gridWidth,r.gridHeight;const e=r.cells,t=r.seaLevel;for(let s=0;s<e.length;s++){const o=e[s];if(!o)continue;if(o.isWater){o.baseBiomeId=0;continue}if((o.baseHeight+o.editHeightDelta+o.simHeightDelta-t)*.25>.6){o.baseBiomeId=6;continue}const d=Wi(o.temperature),f=Wi(o.rainfall);d<.2?o.baseBiomeId=1:f<.15?o.baseBiomeId=4:d>.6&&f>.6?o.baseBiomeId=5:o.baseBiomeId=3}}function Wi(r){return r<0?0:r>1?1:r}function dx(r){const e=r.cells,t=r.gridWidth,s=r.gridHeight,o=t*s,l=Math.max(20,Math.round(o/4e3)),u=[],d=new Set;let f=1;for(let p=0;p<e.length;p++){const g=e[p];if(!g||g.flowAccumulation<l||d.has(p))continue;const m=[];let _=p;const S=new Set;for(let E=0;E<e.length&&!S.has(_);E++){S.add(_),m.push(_),d.add(_);const M=e[_];if(!M||M.isWater)break;const x=M.flowDirection;if(x==null)break;if(d.has(x)){m.push(x),_=x;break}_=x}if(m.length>=2){const E=m[m.length-1];u.push({id:f++,sourceCellIndex:p,mouthCellIndex:E,path:m})}}r.rivers=u.map(p=>({id:p.id,sourceCellIndex:p.sourceCellIndex,mouthCellIndex:p.mouthCellIndex,path:p.path}))}function bg(r,e=6){const{cells:t,gridWidth:s,gridHeight:o,plates:l}=r,u=[],d=new Array(t.length).fill(-1),f=new Set;for(const M of t)!M.isWater&&M.plateType==="CONTINENTAL"&&f.add(M.plateId);const p=t.filter(M=>!M.isWater);if(p.length===0)return u;const g=Array.from(f),m=[];for(let M=0;M<e;M++){const x=g[M%g.length],y=p.filter(w=>w.plateId===x);if(y.length>0){const w=y[Math.floor(M/e*y.length)];m.push({idx:w.index,countryId:M,plateId:x}),d[w.index]=M}}let _=!0,S=0;const E=s*o;for(;_&&S<E;){_=!1,S++;for(let M=0;M<t.length;M++)if(!t[M].isWater&&d[M]!==-1){const x=Math.floor(M/s),y=M%s,w=d[M],R=m.find(z=>z.countryId===w)?.plateId,b=[[x-1,y],[x+1,y],[x,(y-1+s)%s],[x,(y+1)%s]];for(const[z,k]of b){if(z<0||z>=o)continue;const N=z*s+k;N<0||N>=t.length||t[N].isWater||d[N]===-1&&t[N].plateId===R&&Math.abs(t[M].baseHeight+t[M].editHeightDelta-(t[N].baseHeight+t[N].editHeightDelta))<.35&&(d[N]=d[M],_=!0)}}}for(let M=0;M<e;M++){const x=t.filter((R,b)=>d[b]===M);if(x.length===0)continue;for(let R=0;R<d.length;R++)d[R]===M&&(t[R].countryId=`country_${M}`);const y=fx(x,s,o),w=M/e*360;u.push({id:`country_${M}`,name:hx(M),polygons:[y],color:`hsl(${w}, 65%, 45%)`})}return u}function fx(r,e,t){if(r.length===0)return[];const s=r.map(m=>m.index),o=s.map(m=>Math.floor(m/e)),l=s.map(m=>m%e),u=Math.min(...o),d=Math.max(...o),f=Math.min(...l),p=Math.max(...l),g=[];return g.push({lat:90-u/t*180,lon:f/e*360-180}),g.push({lat:90-u/t*180,lon:(p+1)/e*360-180}),g.push({lat:90-(d+1)/t*180,lon:(p+1)/e*360-180}),g.push({lat:90-(d+1)/t*180,lon:f/e*360-180}),g}function hx(r){const e=["Kingdom","Republic","Empire","Dominion","Territory","Realm","Union"],t=["of the North","of the South","of the East","of the West","the Great","the Ancient","of Fire","of Stone","of the Mountains","of the Plains"],s=e[r%e.length],o=t[r*7%t.length];return`${s} ${o}`}function px(r){const e=vl(r.width,32,1024),t=vl(r.height,16,512),s=vx(r.seed),o=gx(s),l=new Date().toISOString(),u=_n(-.1,.1,Un(r.seaLevel/100)),d=_n(.25,1.35,Un(r.plateActivity/100)),f=_n(.15,.55,Un(r.planetAge/100)),p=_n(.05,.35,Un(r.climateVar/100)),g=_n(.25,1,Un(r.axisTilt/100)),m=new Array(e*t);for(let H=0;H<m.length;H++)m[H]=sx(H);const _=vl(r.continentCount,1,12),S=_+Math.floor(_*1.2),E=[];for(let H=0;H<S;H++)E.push({id:H,type:H<_?yr.CONTINENTAL:yr.OCEANIC,velocity:[_n(-1,1,o()),_n(-1,1,o())]});console.log("[WorldGenerator] Using QUANTILE-BASED continent generation (v2)"),console.log("[WorldGenerator] Target land fraction:",1-r.seaLevel/100);const M=Math.floor(e/4),x=Math.floor(t/4),y=new Float32Array(M*x);for(let H=0;H<x;H++)for(let $=0;$<M;$++){const Z=H*M+$,U=H/(x-1),Y=$/(M-1),W=di(Y*.6,U*.5,o,3)*.5,I=di(Y*1.2+.3,U*.9+.7,o,2),Q=Math.floor(Un((I+1)*.5)*S)%S<_?.6:-.6;y[Z]=Q+W}const w=new Float32Array(M*x);for(let H=0;H<6;H++){for(let $=0;$<y.length;$++)w[$]=y[$];for(let $=1;$<x-1;$++)for(let Z=0;Z<M;Z++){const U=$*M+Z;let Y=0,W=0;for(let I=-1;I<=1;I++)for(let G=-1;G<=1;G++){const V=$+I,Q=(Z+G+M)%M;V>=0&&V<x&&(Y+=w[V*M+Q],W++)}y[U]=Y/W}}const R=1-r.seaLevel/100,b=Array.from(y).sort((H,$)=>H-$),z=Math.floor(b.length*(1-R)),k=b[z];for(let H=0;H<t;H++)for(let $=0;$<e;$++){const Z=H*e+$,U=m[Z],Y=H/(t-1),W=$/(e-1),I=Y*(x-1),G=W*(M-1),V=Math.floor(I),Q=Math.floor(G),he=Math.min(V+1,x-1),_e=(Q+1)%M,Me=I-V,Te=G-Q,pe=y[V*M+Q],de=y[V*M+_e],Ie=y[he*M+Q],K=y[he*M+_e],Je=pe*(1-Te)+de*Te,Fe=Ie*(1-Te)+K*Te,Ve=Je*(1-Me)+Fe*Me,Re=Ve>k,rt=di(W*1.2+.3,Y*.9+.7,o,2),Be=Math.floor(Un((rt+1)*.5)*S)%S;if(U.plateId=Be,U.plateType=Re?yr.CONTINENTAL:yr.OCEANIC,Re){const P=(Ve-k)/(1-k);U.baseHeight=.2+P*.6}else{const P=(k-Ve)/(k+1);U.baseHeight=-.3-P*.5}U.boundaryType=Mi.NONE}const N=new Set;for(let H=0;H<t;H++)for(let $=0;$<e;$++){const Z=H*e+$;if(m[Z].baseHeight>=0)for(let Y=-1;Y<=1;Y++){for(let W=-1;W<=1;W++){if(Y===0&&W===0)continue;const I=H+Y,G=($+W+e)%e;if(I>=0&&I<t){const V=I*e+G;if(m[V]&&m[V].baseHeight<0){N.add(Z);break}}}if(N.has(Z))break}}for(let H=0;H<t;H++)for(let $=0;$<e;$++){const Z=H*e+$,U=m[Z],Y=H/(t-1),W=$/(e-1);if(U.baseHeight>0){const rt=N.has(Z),Be=di(W*2.5,Y*2,o,2)*.15,P=rt?8:5,A=rt?.18:.1,te=di(W*P,Y*P*.8,o,3)*A,xe=rt?.05:.08,me=di(W*8,Y*6.5,o,2)*xe*d,ve=rt?-.03:0,Le=1-f*.4;U.baseHeight+=(Be+te+me+ve)*Le}U.baseHeight=Wo(U.baseHeight,-1.5,1.5);const I=Math.min(Y,1-Y);if(I<.15){const rt=1-I/.15,Be=-.4+(Math.random()*.1-.05);U.baseHeight=_n(U.baseHeight,Be,rt*.8)}U.boundaryType=Mi.NONE;const G=Y*2-1,V=_n(.65,1.25,g),Q=Math.pow(1-Math.abs(G),1/V),he=di(W*4,Y*4,o,2)*p,_e=r.temperatureOffset/100*.6;let Me=0;r.styleMode==="ALIEN"?Me=di(W*8,Y*6,o,2)*.15:r.styleMode==="FANTASY"&&(Me=.08+di(W*3,Y*2.5,o,2)*.12),U.temperature=Un(Q*.75+.05+he*.15+Me+_e);const Te=Math.abs(G),pe=Math.exp(-Math.pow(Te*2.5,2)),de=Math.exp(-Math.pow((Te-.35)*3.5,2)),Ie=Te>.7?(Te-.7)*.4:0,K=_n(.5,1.5,r.moistureLevel/100);let Je=(pe*.6-de*.25+Ie+.25)*K;const Fe=di(W*5,Y*3,o,2)*p;let Ve=0;r.styleMode==="ALIEN"?Ve=di(W*10,Y*7,o,3)*.2:r.styleMode==="FANTASY"&&(Ve=.1),U.rainfall=Un(Je+Fe*.3+Ve);const Re=mx(U.temperature,U.rainfall);U.baseBiomeId=Re,U.editBiomeId=Re,U.surfaceType=U.plateType===yr.OCEANIC?wd.ALLUVIAL:wd.ROCK,U.flowDirection=null,U.flowAccumulation=0,U.basinId=null,U.upliftRate=0,U.surfaceAge=Un(.35+o()*.5),U.volcanicActivity=0}for(let H=0;H<t;H++)for(let $=0;$<e;$++){const Z=H*e+$,U=m[Z],Y=U.plateId,W=(H-1+t)%t,I=(H+1)%t,G=($-1+e)%e,V=($+1)%e,Q=W*e+$,he=I*e+$,_e=H*e+G,Me=H*e+V,Te=new Set;if(Te.add(Y),Te.add(m[Q].plateId),Te.add(m[he].plateId),Te.add(m[_e].plateId),Te.add(m[Me].plateId),Te.size>1){const pe=[m[Q].plateType,m[he].plateType,m[_e].plateType,m[Me].plateType],de=pe.some(Je=>Je===yr.OCEANIC),Ie=pe.some(Je=>Je===yr.CONTINENTAL);de&&Ie?U.boundaryType=Mi.CONVERGENT:U.boundaryType=o()<.5?Mi.DIVERGENT:Mi.TRANSFORM;const K=U.boundaryType===Mi.CONVERGENT?1.2:U.boundaryType===Mi.DIVERGENT?.6:.4;U.upliftRate=Wo(d*.02*K*(.6+o()*.8),0,5),U.volcanicActivity=U.boundaryType===Mi.CONVERGENT&&de?Wo(o()*1.2,0,3):o()*.2}else U.boundaryType=Mi.NONE,U.upliftRate=Wo(.005*(1-f)*(.5+o()*.8),0,.5),U.volcanicActivity=o()*.05}const fe=Un(r.planetAge/100),C=Un(r.erosionIntensity/100),L=(fe+C)/2,ie=Math.max(1,Math.round(_n(1,8,L))),se=_n(.15,.7,L);for(let H=0;H<ie;H++){const $=new Array(m.length);for(let Z=0;Z<t;Z++)for(let U=0;U<e;U++){const Y=Z*e+U,W=m[Y];if(!W)continue;let I=0,G=0;const V=Z-1,Q=Z+1,he=(U-1+e)%e,_e=(U+1)%e;V>=0&&(I+=m[V*e+U].baseHeight,G++),Q<t&&(I+=m[Q*e+U].baseHeight,G++),I+=m[Z*e+he].baseHeight,G++,I+=m[Z*e+_e].baseHeight,G++;const Me=G>0?I/G:W.baseHeight,Te=_n(W.baseHeight,Me,se),pe=W.upliftRate*.005,de=(o()-.5)*.02*(1-fe);$[Y]=Wo(W.baseHeight+pe+de+(Te-W.baseHeight)*.9,-2,2)}for(let Z=0;Z<m.length;Z++)m[Z].baseHeight=$[Z],m[Z].surfaceAge=Un(.2+fe*.7+(o()-.5)*.1)}const re=[];for(let H=0;H<t;H++)for(let $=0;$<e;$++){const Z=H*e+$,U=m[Z];if(!U||U.baseHeight<u)continue;let Y=null,W=U.baseHeight;for(let V=-1;V<=1;V++){const Q=H+V;if(!(Q<0||Q>=t))for(let he=-1;he<=1;he++){if(V===0&&he===0)continue;const _e=($+he+e)%e,Me=Q*e+_e,Te=m[Me].baseHeight;Te<W-1e-6&&(W=Te,Y=Me)}}if(Y!=null&&o()<.06){const V=vl(H+Math.floor((o()-.5)*3),0,t-1),Q=(($+Math.floor((o()-.5)*3))%e+e)%e,he=V*e+Q;he!==Z&&(Y=he)}Y!=null&&(U.flowDirection=Y);const I=Un(U.rainfall||.2),G=Math.max(0,(U.baseHeight-W)*2);U.flowAccumulation=Math.max(1,Math.floor(1+I*8+G*4+Math.floor(o()*3)))}const B={gridWidth:e,gridHeight:t,seaLevel:u,cells:m,plates:E,rivers:re,countries:[],cultures:[],cultureRegions:[],cities:[],locations:[],stickers:[],metadata:{id:`w_${r.styleMode}_${e}x${t}_${s}`,name:"Untitled World",seed:String(r.seed),schemaVersion:"v3",version:"v1.3",styleMode:r.styleMode,gridWidth:e,gridHeight:t,createdAt:l,updatedAt:l,seaLevel:u},parameters:{...r,seaLevel:r.seaLevel}};return Fn(B,["GENERATED"]),B.countries=bg(B,_),B}function mx(r,e){return r<.2?e<.35?1:2:r<.35?e<.35?3:4:r<.6?e<.3?5:e<.6?6:7:e<.25?8:e<.55?9:10}function Un(r){return r<0?0:r>1?1:r}function Wo(r,e,t){return r<e?e:r>t?t:r}function vl(r,e,t){return Math.max(e,Math.min(t,Math.floor(r)))}function _n(r,e,t){return r+(e-r)*t}function gx(r){return function(){let e=r+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function vx(r){if(typeof r=="number")return r>>>0;const e=String(r);let t=2166136261;for(let s=0;s<e.length;s++)t^=e.charCodeAt(s),t=Math.imul(t,16777619);return t>>>0&4294967295}function di(r,e,t,s){let o=1,l=1,u=0,d=0;for(let f=0;f<s;f++)u+=o*_x(r*l,e*l,t),d+=o,o*=.5,l*=2;return u/Math.max(1e-9,d)*2-1}function _x(r,e,t){const s=Math.floor(r),o=Math.floor(e),l=r-s,u=e-o,d=M(s,o),f=M(s+1,o),p=M(s,o+1),g=M(s+1,o+1),m=Op(l),_=Op(u),S=_n(d,f,m),E=_n(p,g,m);return _n(S,E,_);function M(x,y){let w=x*374761393+y*668265263;const R=Math.floor(t()*4294967295);return w=(w^R)>>>0,w=(w^w>>>13)*1274126177,w=w^w>>>16,(w>>>0)/4294967295}}function Op(r){return r*r*(3-2*r)}function Lg(r,e){switch(e.type){case"TERRAIN_STROKE":{const{tool:t,center:s,radius:o,strength:l}=e;if(!r||!Array.isArray(r.cells))return;const u=r.gridWidth,d=r.gridHeight,f=r.cells,p=Math.max(1,Math.floor(Number.isFinite(o)?o:1)),g=Number.isFinite(l)&&l>=0?l:0;let m=0,_=0;if(t==="FLATTEN"||t==="SMOOTH"){for(let S=-p;S<=p;S++){const E=s.row+S;if(!(E<0||E>=d))for(let M=-p;M<=p;M++){if(Math.sqrt(S*S+M*M)>o)continue;const w=((s.col+M)%u+u)%u,R=E*u+w,b=f[R],z=b.baseHeight+(b.editHeightDelta||0);m+=z,_++}}_>0&&(m/=_)}for(let S=-p;S<=p;S++){const E=s.row+S;if(!(E<0||E>=d))for(let M=-p;M<=p;M++){const x=Math.sqrt(S*S+M*M);if(x>o)continue;const w=((s.col+M)%u+u)%u,R=E*u+w,b=f[R],z=(o-x)/o;if(t==="RAISE")b.editHeightDelta=(b.editHeightDelta||0)+g*z;else if(t==="LOWER")b.editHeightDelta=(b.editHeightDelta||0)-g*z;else if(t==="FLATTEN"||t==="SMOOTH"){const k=b.baseHeight+(b.editHeightDelta||0),N=(m-k)*g*z;b.editHeightDelta=(b.editHeightDelta||0)+N}}}return}case"STICKER_APPLY":xx(r,e),Fn(r,["STICKER_EDIT"]);return;case"ADD_CITY":yx(r,e),Fn(r,["TERRAIN_EDIT"]);return;case"ADD_COUNTRY":Sx(r,e),Fn(r,["TERRAIN_EDIT"]);return;case"ADD_RIVER":Ex(r,e),Fn(r,["TERRAIN_EDIT"]);return;case"REMOVE_RIVER":Tx(r,e),Fn(r,["TERRAIN_EDIT"]);return;case"SET_LAKE_LEVEL":wx(r,e),Fn(r,["TERRAIN_EDIT"]);return;default:return}}function xx(r,e){const{sticker:t}=e,{gridWidth:s,gridHeight:o,cells:l}=r,u=t.polygon.map(x=>x.lat),d=t.polygon.map(x=>x.lon),f=Math.min(...u),p=Math.max(...u),g=Math.min(...d),m=Math.max(...d),_=Math.floor((90-p)/180*o),S=Math.ceil((90-f)/180*o),E=Math.floor((g+180)/360*s),M=Math.ceil((m+180)/360*s);for(let x=_;x<=S;x++)for(let y=E;y<=M;y++){const w=(x+o)%o,R=(y+s)%s,b=w*s+R,z=l[b],k=90-w/o*180,N=R/s*360-180;Mx({lat:k,lon:N},t.polygon)&&(t.type==="BIOME"&&t.payload.biomeId!=null&&(z.editBiomeId=t.payload.biomeId),t.type==="CULTURE"&&t.payload.cultureId&&(z.cultureId=t.payload.cultureId),t.type==="HEIGHT"&&typeof t.payload.heightDelta=="number"&&(z.editHeightDelta=(z.editHeightDelta||0)+t.payload.heightDelta))}r.stickers=r.stickers??[],r.stickers.push(t)}function yx(r,e){r.cities=r.cities??[],r.cities.push(e.city)}function Sx(r,e){r.countries=r.countries??[],r.countries.push(e.country)}function Mx(r,e){let t=!1;for(let s=0,o=e.length-1;s<e.length;o=s++){const l=e[s].lon,u=e[s].lat,d=e[o].lon,f=e[o].lat;u>r.lat!=f>r.lat&&r.lon<(d-l)*(r.lat-u)/(f-u+1e-12)+l&&(t=!t)}return t}function Ex(r,e){r.rivers=r.rivers??[],r.rivers.push(e.river)}function Tx(r,e){r.rivers=(r.rivers??[]).filter(t=>t.id!==e.riverId)}function wx(r,e){const t=r.cells[e.cellIndex];if(!t)return;const s=t.basinId,o=t.baseHeight+t.editHeightDelta,l=e.newLevel-o;if(s!=null)for(const u of r.cells)u.basinId===s&&(u.editHeightDelta=(u.editHeightDelta??0)+l)}function _l(r){const e=[],t=r.gridWidth*r.gridHeight;r.cells.length!==t&&e.push(`Cell array size (${r.cells.length}) does not match grid (${r.gridWidth}×${r.gridHeight} = ${t}).`),(typeof r.seaLevel!="number"||Number.isNaN(r.seaLevel))&&e.push("World is missing global seaLevel (number)."),r.metadata||e.push("World metadata is missing."),r.metadata?.id||e.push("World metadata.id is missing."),r.metadata?.schemaVersion||e.push("World metadata.schemaVersion is missing.");for(let s=0;s<r.cells.length;s++){const o=r.cells[s];if(o.index!==s){e.push(`Cell index mismatch at i=${s} (cell.index=${o.index}).`);break}if("seaLevel"in o){e.push("Legacy field detected: cell.seaLevel exists. World should be normalized/migrated.");break}typeof o.baseHeight!="number"&&e.push(`Cell ${s} missing baseHeight.`),typeof o.editHeightDelta!="number"&&e.push(`Cell ${s} missing editHeightDelta.`),typeof o.simHeightDelta!="number"&&e.push(`Cell ${s} missing simHeightDelta.`),typeof o.isWater!="boolean"&&e.push(`Cell ${s} missing isWater.`),o.flowDirection!=null&&typeof o.flowDirection!="number"&&e.push(`Cell ${s} flowDirection invalid type.`),typeof o.flowAccumulation!="number"&&e.push(`Cell ${s} missing flowAccumulation.`),o.basinId!=null&&typeof o.basinId!="number"&&e.push(`Cell ${s} basinId invalid type.`)}for(const s of r.countries)s.id||e.push("A country is missing an id."),(!s.polygons||s.polygons.length===0)&&e.push(`Country ${s.id||"(unknown)"} has no polygons.`);for(const s of r.cities)(s.cellIndex<0||s.cellIndex>=r.cells.length)&&e.push(`City ${s.id||s.name} has invalid cellIndex=${s.cellIndex}.`);return e}function Xr(r){return JSON.parse(JSON.stringify(r))}function Ax(r,e=1){const t=.01*e;for(const s of r.cities)s.population+=s.population*t;for(const s of r.cultures)if(Math.random()<.05){const o=Math.floor(Math.random()*r.cells.length);r.cells[o].isWater||(r.cells[o].cultureId=s.id)}for(const s of r.countries){const o=r.cells.map((l,u)=>({cell:l,idx:u})).filter(l=>l.cell.countryId===s.id);if(o.length>0&&Math.random()<.03){const u=o[Math.floor(Math.random()*o.length)].idx,d=Math.floor(u/r.gridWidth),f=u%r.gridWidth,p=[(d-1+r.gridHeight)%r.gridHeight*r.gridWidth+f,(d+1)%r.gridHeight*r.gridWidth+f,d*r.gridWidth+(f-1+r.gridWidth)%r.gridWidth,d*r.gridWidth+(f+1)%r.gridWidth];for(const g of p){const m=r.cells[g];if(!m.isWater&&!m.countryId){m.countryId=s.id;break}}}}}class Cx{world=null;history=[];historyIndex=-1;listeners=[];dirty=!1;getWorld(){return this.world}subscribe(e){return this.listeners.push(e),e(this.world),()=>{const t=this.listeners.indexOf(e);t>=0&&this.listeners.splice(t,1)}}notify(){for(const e of this.listeners)try{e(this.world)}catch(t){console.error("WorldSession subscriber error:",t)}}isDirty(){return this.dirty}normalizeWorld(e){if(typeof e.seaLevel!="number"){const t=e.metadata?.seaLevel;typeof t=="number"?e.seaLevel=t:e.seaLevel=0}if(Array.isArray(e.cells)){const t=e.gridWidth,s=e.gridHeight;for(let l=0;l<e.cells.length;l++){const u=e.cells[l];u.index=l,u&&Object.prototype.hasOwnProperty.call(u,"seaLevel")&&delete u.seaLevel,typeof u.editHeightDelta!="number"&&(u.editHeightDelta=0),typeof u.simHeightDelta!="number"&&(u.simHeightDelta=0),typeof u.isWater!="boolean"&&(u.isWater=!1),typeof u.temperature!="number"&&(u.temperature=.5),typeof u.rainfall!="number"&&(u.rainfall=.5),typeof u.baseBiomeId!="number"&&(u.baseBiomeId=0),typeof u.editBiomeId!="number"&&(u.editBiomeId=u.baseBiomeId),typeof u.snowCover!="number"&&(u.snowCover=0)}const o=t*s;if(e.cells.length>o)e.cells.length=o;else if(e.cells.length<o)for(let l=e.cells.length;l<o;l++){const u=e.cells[e.cells.length-1];e.cells.push(JSON.parse(JSON.stringify(u)))}}}async createWorld(e){const t=px(e);this.normalizeWorld(t),Fn(t,["GENERATED"]);const s=_l(t);s.length>0&&console.warn("Validation warnings on generated world:",s);try{if(await zu(t.metadata.id)){console.warn(`Generated world id ${t.metadata.id} already exists for seed ${t.metadata.seed}; creating unique id.`);const l=t.metadata.id;let u=1,d=`${l}_dup${u}`;for(;u<1e3&&await zu(d);)u++,d=`${l}_dup${u}`;t.metadata.id=d,t.metadata.name=`${t.metadata.name} (copy)`,t.metadata.createdAt=new Date().toISOString()}}catch(o){console.warn("Could not verify world id uniqueness due to storage error:",o)}this.world=t,this.history=[Xr(t)],this.historyIndex=0,this.dirty=!1,this.notify()}async loadWorld(e){let t=null;if(typeof e=="string"?t=await zu(e):e&&typeof e=="object"&&(t=e),!t)throw new Error("World not found");this.normalizeWorld(t),Fn(t,["LOADED"]);const s=_l(t);s.length>0&&console.warn("Validation warnings on load:",s),this.world=t,this.history=[Xr(t)],this.historyIndex=0,this.dirty=!1,this.notify()}async save(){if(!this.world)throw new Error("No world loaded");const e=await Rg(this.world);return this.world.metadata=e.metadata,this.dirty=!1,this.notify(),e}apply(e){if(!this.world)return;Lg(this.world,e),Fn(this.world,["TERRAIN_EDIT"]);const t=_l(this.world);t.length>0&&console.warn("Validation warnings after edit:",t),this.historyIndex<this.history.length-1&&(this.history=this.history.slice(0,this.historyIndex+1)),this.history.push(Xr(this.world)),this.historyIndex=this.history.length-1,this.dirty=!0,this.notify(),this.dirty=!0,this.notify()}applyLocalEdit(e){!this.world||!e||(this.world=Xr(e),Fn(this.world,["TERRAIN_EDIT"]),this.dirty=!0,this.notify())}undo(){this.historyIndex>0&&(this.historyIndex--,this.world=Xr(this.history[this.historyIndex]),this.dirty=!0,this.notify())}redo(){this.historyIndex<this.history.length-1&&(this.historyIndex++,this.world=Xr(this.history[this.historyIndex]),this.dirty=!0,this.notify())}simulateTick(e=1){if(!this.world)return;Ax(this.world,e),Fn(this.world,["SIM_STEP"]);const t=_l(this.world);t.length>0&&console.warn("Validation warnings after sim tick:",t),this.historyIndex<this.history.length-1&&(this.history=this.history.slice(0,this.historyIndex+1)),this.history.push(Xr(this.world)),this.historyIndex=this.history.length-1,this.dirty=!0,this.notify()}}const ln=new Cx;function Rx(r){const e=r.gridWidth,t=r.gridHeight,s=typeof r.seaLevel=="number"?r.seaLevel:typeof r.metadata?.seaLevel=="number"?r.metadata.seaLevel:0,o=Array.isArray(r.cells)?r.cells:[];function l(m){const _=Hu(Math.round(m[0]*255)),S=Hu(Math.round(m[1]*255)),E=Hu(Math.round(m[2]*255));return[_,S,E,255]}function u(m){if(e===0)return 0;const _=m%e;return _<0?_+e:_}function d(m){return t===0||m<0?0:m>=t?t-1:m}function f(m,_){if(t===0||e===0)return[1,0,1];const S=d(m),E=u(_),M=S*e+E,x=o[M];if(!x)return[1,0,1];const y=typeof x.baseHeight=="number"?x.baseHeight:typeof x.height=="number"?x.height:0,w=typeof x.editHeightDelta=="number"?x.editHeightDelta:0,R=typeof x.simHeightDelta=="number"?x.simHeightDelta:0,b=y+w+R,z=b<s,k=typeof x.rainfall=="number"?Ps(x.rainfall):.5,N=typeof x.temperature=="number"?Ps(x.temperature):.5,fe=typeof x.snowCover=="number"?Ps(x.snowCover):0;if(z){const re=Ps((s-b)*2),B=.2,H=.55,$=.75,Z=.1,U=.35,Y=.6,W=.03,I=.15,G=.4;let V,Q,he;if(re<.4){const _e=re/.4;V=En(B,Z,_e),Q=En(H,U,_e),he=En($,Y,_e)}else{const _e=(re-.4)/.6;V=En(Z,W,_e),Q=En(U,I,_e),he=En(Y,G,_e)}return[V,Q,he]}const C=Ps((b-s)*3);let L=.3,ie=.3,se=.2;if(fe>.6||N<.2&&k>.4||C>.75){const re=Ps(Math.max(fe,C>.75?1:0));L=En(.85,.95,re),ie=En(.88,.96,re),se=En(.92,.98,re)}else if(N<.25)L=.55,ie=.58,se=.52;else if(N<.4&&k>.35)L=.2,ie=.35,se=.22;else if(k<.25||N>.65&&k<.35){const re=1-k;L=En(.7,.85,re),ie=En(.6,.7,re),se=En(.35,.45,re)}else k<.5?(L=.58,ie=.62,se=.35):N>=.4&&N<.65&&k>=.5?(L=.25,ie=.48,se=.22):N>=.65&&k>=.6?(L=.1,ie=.4,se=.15):(L=.35,ie=.5,se=.28);if(C>.3){const re=(C-.3)/.7;L=En(L,.7,re*.35),ie=En(ie,.65,re*.35),se=En(se,.6,re*.35)}return!z&&x.countryId!==void 0&&x.countryId!==null&&[S>0?o[(S-1)*e+E]?.countryId:null,S<t-1?o[(S+1)*e+E]?.countryId:null,o[S*e+u(E-1)]?.countryId,o[S*e+u(E+1)]?.countryId].some(B=>B!==void 0&&B!==x.countryId)&&(L=L*.4,ie=ie*.4,se=se*.4),[L,ie,se]}function p(m,_){return l(f(m,_))}const g=bx(e,t,(m,_)=>{const S=Math.floor(m),E=Math.floor(_);return p(E,S)});return{width:e,height:t,seaLevel:s,rgba:g,colorAt:(m,_)=>{const S=Math.floor(m),E=Math.floor(_);return p(E,S)},minimapColorAt:(m,_)=>{const S=Math.floor(m),E=Math.floor(_);return p(E,S)},sampleGlobeColor:m=>{const _=Number.isInteger(m)?m:-1,S=_<0?-1:Math.floor(_/e),E=_<0?-1:_%e;return p(S,E)},sampleMinimapColor:m=>{const _=Number.isInteger(m)?m:-1,S=_<0?-1:Math.floor(_/e),E=_<0?-1:_%e;return p(S,E)}}}function oo(r){return Rx(r)}function Ps(r){return Number.isFinite(r)?r<0?0:r>1?1:r:0}function Hu(r){return Number.isFinite(r)?r<0?0:r>255?255:r:0}function En(r,e,t){return r+(e-r)*t}function bx(r,e,t){const s=new Uint8ClampedArray(r*e*4);let o=0;for(let l=0;l<e;l++){const u=l+.5;for(let d=0;d<r;d++){const f=d+.5,p=t(f,u);s[o++]=p[0]|0,s[o++]=p[1]|0,s[o++]=p[2]|0,s[o++]=p[3]|0}}return s}function Ot(r,e,t){const s=Math.round(Number.isFinite(r)?r:e);return s<e?e:s>t?t:s}function ti({label:r,children:e}){return O.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:6,marginBottom:14},children:[O.jsx("div",{style:{fontWeight:800,fontSize:12,opacity:.75},children:r}),e]})}function Lx({onGenerate:r,onSave:e,saving:t,disabled:s}){const o=ge.useMemo(()=>({width:256,height:128,seaLevel:50,plateActivity:55,axisTilt:23,planetAge:50,climateVar:35,moistureLevel:50,temperatureOffset:0,erosionIntensity:50,continentCount:5,seed:Math.floor(Math.random()*1e9),styleMode:"EARTHLIKE"}),[]),[l,u]=ge.useState(o);ge.useEffect(()=>{r(l)},[]),ge.useEffect(()=>{const f=setTimeout(()=>{r(l)},300);return()=>clearTimeout(f)},[l]);function d(f,p){u(g=>({...g,[f]:p}))}return O.jsxs("div",{style:{padding:14},children:[O.jsx("div",{style:{fontWeight:900,fontSize:14,marginBottom:12},children:"Generate"}),O.jsx(ti,{label:"Seed",children:O.jsxs("div",{style:{display:"flex",gap:8},children:[O.jsx("input",{value:l.seed,onChange:f=>d("seed",Ot(parseInt(f.target.value||"0",10),0,2147483647)),style:{flex:1,padding:8,borderRadius:10,border:"1px solid rgba(0,0,0,0.15)"},inputMode:"numeric"}),O.jsx("button",{onClick:()=>d("seed",Math.floor(Math.random()*1e9)),style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(0,0,0,0.15)"},children:"Random"})]})}),O.jsx(ti,{label:"Style Mode",children:O.jsxs("select",{value:l.styleMode,onChange:f=>d("styleMode",f.target.value),style:{padding:8,borderRadius:10,border:"1px solid rgba(0,0,0,0.15)"},children:[O.jsx("option",{value:"EARTHLIKE",children:"Earthlike"}),O.jsx("option",{value:"FANTASY",children:"Fantasy"}),O.jsx("option",{value:"STYLIZED",children:"Stylized"}),O.jsx("option",{value:"ALIEN",children:"Alien"})]})}),O.jsxs(ti,{label:`Resolution: ${l.width}×${l.height}`,children:[O.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8},children:[O.jsxs("div",{children:[O.jsx("div",{style:{fontSize:11,opacity:.7,marginBottom:6},children:"Width"}),O.jsx("input",{value:l.width,onChange:f=>d("width",Ot(parseInt(f.target.value||"0",10),64,1024)),style:{width:"100%",padding:8,borderRadius:10,border:"1px solid rgba(0,0,0,0.15)"},inputMode:"numeric"})]}),O.jsxs("div",{children:[O.jsx("div",{style:{fontSize:11,opacity:.7,marginBottom:6},children:"Height"}),O.jsx("input",{value:l.height,onChange:f=>d("height",Ot(parseInt(f.target.value||"0",10),32,1024)),style:{width:"100%",padding:8,borderRadius:10,border:"1px solid rgba(0,0,0,0.15)"},inputMode:"numeric"})]})]}),O.jsx("div",{style:{fontSize:11,opacity:.65,marginTop:6},children:"Note: larger resolutions generate slower (CPU preview)."})]}),O.jsx(ti,{label:`Sea Level (0–100): ${l.seaLevel}`,children:O.jsx("input",{type:"range",min:0,max:100,value:l.seaLevel,onChange:f=>d("seaLevel",Ot(parseInt(f.target.value,10),0,100))})}),O.jsx(ti,{label:`Plate Activity (0–100): ${l.plateActivity}`,children:O.jsx("input",{type:"range",min:0,max:100,value:l.plateActivity,onChange:f=>d("plateActivity",Ot(parseInt(f.target.value,10),0,100))})}),O.jsx(ti,{label:`Axis Tilt (0–100): ${l.axisTilt}`,children:O.jsx("input",{type:"range",min:0,max:100,value:l.axisTilt,onChange:f=>d("axisTilt",Ot(parseInt(f.target.value,10),0,100))})}),O.jsx(ti,{label:`Planet Age (0–100): ${l.planetAge}`,children:O.jsx("input",{type:"range",min:0,max:100,value:l.planetAge,onChange:f=>d("planetAge",Ot(parseInt(f.target.value,10),0,100))})}),O.jsx(ti,{label:`Climate Variability (0–100): ${l.climateVar}`,children:O.jsx("input",{type:"range",min:0,max:100,value:l.climateVar,onChange:f=>d("climateVar",Ot(parseInt(f.target.value,10),0,100))})}),O.jsx(ti,{label:`Moisture Level (0–100): ${l.moistureLevel}`,children:O.jsx("input",{type:"range",min:0,max:100,value:l.moistureLevel,onChange:f=>d("moistureLevel",Ot(parseInt(f.target.value,10),0,100))})}),O.jsx(ti,{label:`Temperature Offset (-50 to +50): ${l.temperatureOffset>0?"+":""}${l.temperatureOffset}`,children:O.jsx("input",{type:"range",min:-50,max:50,value:l.temperatureOffset,onChange:f=>d("temperatureOffset",Ot(parseInt(f.target.value,10),-50,50))})}),O.jsx(ti,{label:`Erosion Intensity (0–100): ${l.erosionIntensity}`,children:O.jsx("input",{type:"range",min:0,max:100,value:l.erosionIntensity,onChange:f=>d("erosionIntensity",Ot(parseInt(f.target.value,10),0,100))})}),O.jsx(ti,{label:`Continent Count (1–12): ${l.continentCount}`,children:O.jsx("input",{type:"range",min:1,max:12,value:l.continentCount,onChange:f=>d("continentCount",Ot(parseInt(f.target.value,10),1,12))})}),O.jsxs("div",{style:{display:"flex",gap:10,marginTop:16},children:[O.jsx("button",{onClick:()=>r({...l,width:Ot(l.width,64,1024),height:Ot(l.height,32,1024),seaLevel:Ot(l.seaLevel,0,100),plateActivity:Ot(l.plateActivity,0,100),axisTilt:Ot(l.axisTilt,0,100),planetAge:Ot(l.planetAge,0,100),climateVar:Ot(l.climateVar,0,100),moistureLevel:Ot(l.moistureLevel,0,100),temperatureOffset:Ot(l.temperatureOffset,-50,50),erosionIntensity:Ot(l.erosionIntensity,0,100),continentCount:Ot(l.continentCount,1,12),seed:typeof l.seed=="string"?l.seed:Ot(l.seed,0,2147483647),styleMode:l.styleMode}),style:{flex:1,padding:"10px 12px",borderRadius:12,border:"1px solid rgba(0,0,0,0.15)",fontWeight:900},children:"Generate"}),O.jsx("button",{onClick:e,disabled:s||t,style:{flex:1,padding:"10px 12px",borderRadius:12,border:"1px solid rgba(0,0,0,0.15)",fontWeight:900,opacity:s||t?.5:1,cursor:s||t?"not-allowed":"pointer"},children:t?"Saving…":"Save → Create"})]}),O.jsx("div",{style:{fontSize:11,opacity:.65,marginTop:10,lineHeight:1.35},children:"Seed + parameters determine the generated world. After Save, Create opens the saved snapshot."})]})}const Bd="160",Px=0,Fp=1,Dx=2,Pg=1,Ix=2,Gi=3,Rr=0,zn=1,Vi=2,Tr=0,Zs=1,kp=2,Bp=3,zp=4,Nx=5,Jr=100,Ux=101,Ox=102,Hp=103,Gp=104,Fx=200,kx=201,Bx=202,zx=203,Ad=204,Cd=205,Hx=206,Gx=207,Vx=208,Wx=209,jx=210,Xx=211,Yx=212,qx=213,$x=214,Kx=0,Zx=1,Qx=2,Vl=3,Jx=4,ey=5,ty=6,ny=7,Dg=0,iy=1,ry=2,wr=0,sy=1,oy=2,ay=3,ly=4,cy=5,uy=6,Ig=300,to=301,no=302,Rd=303,bd=304,Zl=306,Qs=1e3,Bn=1001,Ld=1002,wn=1003,Vp=1004,Gu=1005,An=1006,dy=1007,Ar=1008,Cr=1009,fy=1010,hy=1011,zd=1012,Ng=1013,Mr=1014,Er=1015,ta=1016,Ug=1017,Og=1018,is=1020,py=1021,gi=1023,my=1024,gy=1025,rs=1026,io=1027,vy=1028,Fg=1029,_y=1030,kg=1031,Bg=1033,Vu=33776,Wu=33777,ju=33778,Xu=33779,Wp=35840,jp=35841,Xp=35842,Yp=35843,zg=36196,qp=37492,$p=37496,Kp=37808,Zp=37809,Qp=37810,Jp=37811,em=37812,tm=37813,nm=37814,im=37815,rm=37816,sm=37817,om=37818,am=37819,lm=37820,cm=37821,Yu=36492,um=36494,dm=36495,xy=36283,fm=36284,hm=36285,pm=36286,Hg=3e3,ss=3001,yy=3200,Sy=3201,Gg=0,My=1,ri="",cn="srgb",Yi="srgb-linear",Hd="display-p3",Ql="display-p3-linear",Wl="linear",It="srgb",jl="rec709",Xl="p3",Ds=7680,mm=519,Ey=512,Ty=513,wy=514,Vg=515,Ay=516,Cy=517,Ry=518,by=519,gm=35044,vm="300 es",Pd=1035,ji=2e3,Yl=2001;class ao{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].indexOf(t)===-1&&s[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const s=this._listeners;return s[e]!==void 0&&s[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const o=this._listeners[e];if(o!==void 0){const l=o.indexOf(t);l!==-1&&o.splice(l,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const s=this._listeners[e.type];if(s!==void 0){e.target=this;const o=s.slice(0);for(let l=0,u=o.length;l<u;l++)o[l].call(this,e);e.target=null}}}const gn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],qu=Math.PI/180,Dd=180/Math.PI;function sa(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(gn[r&255]+gn[r>>8&255]+gn[r>>16&255]+gn[r>>24&255]+"-"+gn[e&255]+gn[e>>8&255]+"-"+gn[e>>16&15|64]+gn[e>>24&255]+"-"+gn[t&63|128]+gn[t>>8&255]+"-"+gn[t>>16&255]+gn[t>>24&255]+gn[s&255]+gn[s>>8&255]+gn[s>>16&255]+gn[s>>24&255]).toLowerCase()}function kn(r,e,t){return Math.max(e,Math.min(t,r))}function Ly(r,e){return(r%e+e)%e}function $u(r,e,t){return(1-t)*r+t*e}function _m(r){return(r&r-1)===0&&r!==0}function Id(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function jo(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function On(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class Et{constructor(e=0,t=0){Et.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,s=this.y,o=e.elements;return this.x=o[0]*t+o[3]*s+o[6],this.y=o[1]*t+o[4]*s+o[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(e,Math.min(t,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const s=this.dot(e)/t;return Math.acos(kn(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,s=this.y-e.y;return t*t+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const s=Math.cos(t),o=Math.sin(t),l=this.x-e.x,u=this.y-e.y;return this.x=l*s-u*o+e.x,this.y=l*o+u*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class vt{constructor(e,t,s,o,l,u,d,f,p){vt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,s,o,l,u,d,f,p)}set(e,t,s,o,l,u,d,f,p){const g=this.elements;return g[0]=e,g[1]=o,g[2]=d,g[3]=t,g[4]=l,g[5]=f,g[6]=s,g[7]=u,g[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,s=e.elements;return t[0]=s[0],t[1]=s[1],t[2]=s[2],t[3]=s[3],t[4]=s[4],t[5]=s[5],t[6]=s[6],t[7]=s[7],t[8]=s[8],this}extractBasis(e,t,s){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const s=e.elements,o=t.elements,l=this.elements,u=s[0],d=s[3],f=s[6],p=s[1],g=s[4],m=s[7],_=s[2],S=s[5],E=s[8],M=o[0],x=o[3],y=o[6],w=o[1],R=o[4],b=o[7],z=o[2],k=o[5],N=o[8];return l[0]=u*M+d*w+f*z,l[3]=u*x+d*R+f*k,l[6]=u*y+d*b+f*N,l[1]=p*M+g*w+m*z,l[4]=p*x+g*R+m*k,l[7]=p*y+g*b+m*N,l[2]=_*M+S*w+E*z,l[5]=_*x+S*R+E*k,l[8]=_*y+S*b+E*N,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],s=e[1],o=e[2],l=e[3],u=e[4],d=e[5],f=e[6],p=e[7],g=e[8];return t*u*g-t*d*p-s*l*g+s*d*f+o*l*p-o*u*f}invert(){const e=this.elements,t=e[0],s=e[1],o=e[2],l=e[3],u=e[4],d=e[5],f=e[6],p=e[7],g=e[8],m=g*u-d*p,_=d*f-g*l,S=p*l-u*f,E=t*m+s*_+o*S;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/E;return e[0]=m*M,e[1]=(o*p-g*s)*M,e[2]=(d*s-o*u)*M,e[3]=_*M,e[4]=(g*t-o*f)*M,e[5]=(o*l-d*t)*M,e[6]=S*M,e[7]=(s*f-p*t)*M,e[8]=(u*t-s*l)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,s,o,l,u,d){const f=Math.cos(l),p=Math.sin(l);return this.set(s*f,s*p,-s*(f*u+p*d)+u+e,-o*p,o*f,-o*(-p*u+f*d)+d+t,0,0,1),this}scale(e,t){return this.premultiply(Ku.makeScale(e,t)),this}rotate(e){return this.premultiply(Ku.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ku.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),s=Math.sin(e);return this.set(t,-s,0,s,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,s=e.elements;for(let o=0;o<9;o++)if(t[o]!==s[o])return!1;return!0}fromArray(e,t=0){for(let s=0;s<9;s++)this.elements[s]=e[s+t];return this}toArray(e=[],t=0){const s=this.elements;return e[t]=s[0],e[t+1]=s[1],e[t+2]=s[2],e[t+3]=s[3],e[t+4]=s[4],e[t+5]=s[5],e[t+6]=s[6],e[t+7]=s[7],e[t+8]=s[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ku=new vt;function Wg(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function ql(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Py(){const r=ql("canvas");return r.style.display="block",r}const xm={};function Ko(r){r in xm||(xm[r]=!0,console.warn(r))}const ym=new vt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Sm=new vt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),xl={[Yi]:{transfer:Wl,primaries:jl,toReference:r=>r,fromReference:r=>r},[cn]:{transfer:It,primaries:jl,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[Ql]:{transfer:Wl,primaries:Xl,toReference:r=>r.applyMatrix3(Sm),fromReference:r=>r.applyMatrix3(ym)},[Hd]:{transfer:It,primaries:Xl,toReference:r=>r.convertSRGBToLinear().applyMatrix3(Sm),fromReference:r=>r.applyMatrix3(ym).convertLinearToSRGB()}},Dy=new Set([Yi,Ql]),Ct={enabled:!0,_workingColorSpace:Yi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!Dy.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;const s=xl[e].toReference,o=xl[t].fromReference;return o(s(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this._workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this._workingColorSpace)},getPrimaries:function(r){return xl[r].primaries},getTransfer:function(r){return r===ri?Wl:xl[r].transfer}};function Js(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Zu(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Is;class jg{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Is===void 0&&(Is=ql("canvas")),Is.width=e.width,Is.height=e.height;const s=Is.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),t=Is}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ql("canvas");t.width=e.width,t.height=e.height;const s=t.getContext("2d");s.drawImage(e,0,0,e.width,e.height);const o=s.getImageData(0,0,e.width,e.height),l=o.data;for(let u=0;u<l.length;u++)l[u]=Js(l[u]/255)*255;return s.putImageData(o,0,0),t}else if(e.data){const t=e.data.slice(0);for(let s=0;s<t.length;s++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[s]=Math.floor(Js(t[s]/255)*255):t[s]=Js(t[s]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Iy=0;class Xg{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Iy++}),this.uuid=sa(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const s={uuid:this.uuid,url:""},o=this.data;if(o!==null){let l;if(Array.isArray(o)){l=[];for(let u=0,d=o.length;u<d;u++)o[u].isDataTexture?l.push(Qu(o[u].image)):l.push(Qu(o[u]))}else l=Qu(o);s.url=l}return t||(e.images[this.uuid]=s),s}}function Qu(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?jg.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ny=0;class Hn extends ao{constructor(e=Hn.DEFAULT_IMAGE,t=Hn.DEFAULT_MAPPING,s=Bn,o=Bn,l=An,u=Ar,d=gi,f=Cr,p=Hn.DEFAULT_ANISOTROPY,g=ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ny++}),this.uuid=sa(),this.name="",this.source=new Xg(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=s,this.wrapT=o,this.magFilter=l,this.minFilter=u,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=f,this.offset=new Et(0,0),this.repeat=new Et(1,1),this.center=new Et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new vt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof g=="string"?this.colorSpace=g:(Ko("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=g===ss?cn:ri),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const s={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),t||(e.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ig)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Qs:e.x=e.x-Math.floor(e.x);break;case Bn:e.x=e.x<0?0:1;break;case Ld:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Qs:e.y=e.y-Math.floor(e.y);break;case Bn:e.y=e.y<0?0:1;break;case Ld:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Ko("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===cn?ss:Hg}set encoding(e){Ko("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===ss?cn:ri}}Hn.DEFAULT_IMAGE=null;Hn.DEFAULT_MAPPING=Ig;Hn.DEFAULT_ANISOTROPY=1;class sn{constructor(e=0,t=0,s=0,o=1){sn.prototype.isVector4=!0,this.x=e,this.y=t,this.z=s,this.w=o}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,s,o){return this.x=e,this.y=t,this.z=s,this.w=o,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,s=this.y,o=this.z,l=this.w,u=e.elements;return this.x=u[0]*t+u[4]*s+u[8]*o+u[12]*l,this.y=u[1]*t+u[5]*s+u[9]*o+u[13]*l,this.z=u[2]*t+u[6]*s+u[10]*o+u[14]*l,this.w=u[3]*t+u[7]*s+u[11]*o+u[15]*l,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,s,o,l;const f=e.elements,p=f[0],g=f[4],m=f[8],_=f[1],S=f[5],E=f[9],M=f[2],x=f[6],y=f[10];if(Math.abs(g-_)<.01&&Math.abs(m-M)<.01&&Math.abs(E-x)<.01){if(Math.abs(g+_)<.1&&Math.abs(m+M)<.1&&Math.abs(E+x)<.1&&Math.abs(p+S+y-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const R=(p+1)/2,b=(S+1)/2,z=(y+1)/2,k=(g+_)/4,N=(m+M)/4,fe=(E+x)/4;return R>b&&R>z?R<.01?(s=0,o=.707106781,l=.707106781):(s=Math.sqrt(R),o=k/s,l=N/s):b>z?b<.01?(s=.707106781,o=0,l=.707106781):(o=Math.sqrt(b),s=k/o,l=fe/o):z<.01?(s=.707106781,o=.707106781,l=0):(l=Math.sqrt(z),s=N/l,o=fe/l),this.set(s,o,l,t),this}let w=Math.sqrt((x-E)*(x-E)+(m-M)*(m-M)+(_-g)*(_-g));return Math.abs(w)<.001&&(w=1),this.x=(x-E)/w,this.y=(m-M)/w,this.z=(_-g)/w,this.w=Math.acos((p+S+y-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(e,Math.min(t,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this.z=e.z+(t.z-e.z)*s,this.w=e.w+(t.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Uy extends ao{constructor(e=1,t=1,s={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new sn(0,0,e,t),this.scissorTest=!1,this.viewport=new sn(0,0,e,t);const o={width:e,height:t,depth:1};s.encoding!==void 0&&(Ko("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),s.colorSpace=s.encoding===ss?cn:ri),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:An,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},s),this.texture=new Hn(o,s.mapping,s.wrapS,s.wrapT,s.magFilter,s.minFilter,s.format,s.type,s.anisotropy,s.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=s.generateMipmaps,this.texture.internalFormat=s.internalFormat,this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.depthTexture=s.depthTexture,this.samples=s.samples}setSize(e,t,s=1){(this.width!==e||this.height!==t||this.depth!==s)&&(this.width=e,this.height=t,this.depth=s,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=s,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Xg(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class os extends Uy{constructor(e=1,t=1,s={}){super(e,t,s),this.isWebGLRenderTarget=!0}}class Yg extends Hn{constructor(e=null,t=1,s=1,o=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:s,depth:o},this.magFilter=wn,this.minFilter=wn,this.wrapR=Bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Oy extends Hn{constructor(e=null,t=1,s=1,o=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:s,depth:o},this.magFilter=wn,this.minFilter=wn,this.wrapR=Bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class oa{constructor(e=0,t=0,s=0,o=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=s,this._w=o}static slerpFlat(e,t,s,o,l,u,d){let f=s[o+0],p=s[o+1],g=s[o+2],m=s[o+3];const _=l[u+0],S=l[u+1],E=l[u+2],M=l[u+3];if(d===0){e[t+0]=f,e[t+1]=p,e[t+2]=g,e[t+3]=m;return}if(d===1){e[t+0]=_,e[t+1]=S,e[t+2]=E,e[t+3]=M;return}if(m!==M||f!==_||p!==S||g!==E){let x=1-d;const y=f*_+p*S+g*E+m*M,w=y>=0?1:-1,R=1-y*y;if(R>Number.EPSILON){const z=Math.sqrt(R),k=Math.atan2(z,y*w);x=Math.sin(x*k)/z,d=Math.sin(d*k)/z}const b=d*w;if(f=f*x+_*b,p=p*x+S*b,g=g*x+E*b,m=m*x+M*b,x===1-d){const z=1/Math.sqrt(f*f+p*p+g*g+m*m);f*=z,p*=z,g*=z,m*=z}}e[t]=f,e[t+1]=p,e[t+2]=g,e[t+3]=m}static multiplyQuaternionsFlat(e,t,s,o,l,u){const d=s[o],f=s[o+1],p=s[o+2],g=s[o+3],m=l[u],_=l[u+1],S=l[u+2],E=l[u+3];return e[t]=d*E+g*m+f*S-p*_,e[t+1]=f*E+g*_+p*m-d*S,e[t+2]=p*E+g*S+d*_-f*m,e[t+3]=g*E-d*m-f*_-p*S,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,s,o){return this._x=e,this._y=t,this._z=s,this._w=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const s=e._x,o=e._y,l=e._z,u=e._order,d=Math.cos,f=Math.sin,p=d(s/2),g=d(o/2),m=d(l/2),_=f(s/2),S=f(o/2),E=f(l/2);switch(u){case"XYZ":this._x=_*g*m+p*S*E,this._y=p*S*m-_*g*E,this._z=p*g*E+_*S*m,this._w=p*g*m-_*S*E;break;case"YXZ":this._x=_*g*m+p*S*E,this._y=p*S*m-_*g*E,this._z=p*g*E-_*S*m,this._w=p*g*m+_*S*E;break;case"ZXY":this._x=_*g*m-p*S*E,this._y=p*S*m+_*g*E,this._z=p*g*E+_*S*m,this._w=p*g*m-_*S*E;break;case"ZYX":this._x=_*g*m-p*S*E,this._y=p*S*m+_*g*E,this._z=p*g*E-_*S*m,this._w=p*g*m+_*S*E;break;case"YZX":this._x=_*g*m+p*S*E,this._y=p*S*m+_*g*E,this._z=p*g*E-_*S*m,this._w=p*g*m-_*S*E;break;case"XZY":this._x=_*g*m-p*S*E,this._y=p*S*m-_*g*E,this._z=p*g*E+_*S*m,this._w=p*g*m+_*S*E;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+u)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const s=t/2,o=Math.sin(s);return this._x=e.x*o,this._y=e.y*o,this._z=e.z*o,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,s=t[0],o=t[4],l=t[8],u=t[1],d=t[5],f=t[9],p=t[2],g=t[6],m=t[10],_=s+d+m;if(_>0){const S=.5/Math.sqrt(_+1);this._w=.25/S,this._x=(g-f)*S,this._y=(l-p)*S,this._z=(u-o)*S}else if(s>d&&s>m){const S=2*Math.sqrt(1+s-d-m);this._w=(g-f)/S,this._x=.25*S,this._y=(o+u)/S,this._z=(l+p)/S}else if(d>m){const S=2*Math.sqrt(1+d-s-m);this._w=(l-p)/S,this._x=(o+u)/S,this._y=.25*S,this._z=(f+g)/S}else{const S=2*Math.sqrt(1+m-s-d);this._w=(u-o)/S,this._x=(l+p)/S,this._y=(f+g)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let s=e.dot(t)+1;return s<Number.EPSILON?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(kn(this.dot(e),-1,1)))}rotateTowards(e,t){const s=this.angleTo(e);if(s===0)return this;const o=Math.min(1,t/s);return this.slerp(e,o),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const s=e._x,o=e._y,l=e._z,u=e._w,d=t._x,f=t._y,p=t._z,g=t._w;return this._x=s*g+u*d+o*p-l*f,this._y=o*g+u*f+l*d-s*p,this._z=l*g+u*p+s*f-o*d,this._w=u*g-s*d-o*f-l*p,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const s=this._x,o=this._y,l=this._z,u=this._w;let d=u*e._w+s*e._x+o*e._y+l*e._z;if(d<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,d=-d):this.copy(e),d>=1)return this._w=u,this._x=s,this._y=o,this._z=l,this;const f=1-d*d;if(f<=Number.EPSILON){const S=1-t;return this._w=S*u+t*this._w,this._x=S*s+t*this._x,this._y=S*o+t*this._y,this._z=S*l+t*this._z,this.normalize(),this}const p=Math.sqrt(f),g=Math.atan2(p,d),m=Math.sin((1-t)*g)/p,_=Math.sin(t*g)/p;return this._w=u*m+this._w*_,this._x=s*m+this._x*_,this._y=o*m+this._y*_,this._z=l*m+this._z*_,this._onChangeCallback(),this}slerpQuaternions(e,t,s){return this.copy(e).slerp(t,s)}random(){const e=Math.random(),t=Math.sqrt(1-e),s=Math.sqrt(e),o=2*Math.PI*Math.random(),l=2*Math.PI*Math.random();return this.set(t*Math.cos(o),s*Math.sin(l),s*Math.cos(l),t*Math.sin(o))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class ce{constructor(e=0,t=0,s=0){ce.prototype.isVector3=!0,this.x=e,this.y=t,this.z=s}set(e,t,s){return s===void 0&&(s=this.z),this.x=e,this.y=t,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Mm.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Mm.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,s=this.y,o=this.z,l=e.elements;return this.x=l[0]*t+l[3]*s+l[6]*o,this.y=l[1]*t+l[4]*s+l[7]*o,this.z=l[2]*t+l[5]*s+l[8]*o,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,s=this.y,o=this.z,l=e.elements,u=1/(l[3]*t+l[7]*s+l[11]*o+l[15]);return this.x=(l[0]*t+l[4]*s+l[8]*o+l[12])*u,this.y=(l[1]*t+l[5]*s+l[9]*o+l[13])*u,this.z=(l[2]*t+l[6]*s+l[10]*o+l[14])*u,this}applyQuaternion(e){const t=this.x,s=this.y,o=this.z,l=e.x,u=e.y,d=e.z,f=e.w,p=2*(u*o-d*s),g=2*(d*t-l*o),m=2*(l*s-u*t);return this.x=t+f*p+u*m-d*g,this.y=s+f*g+d*p-l*m,this.z=o+f*m+l*g-u*p,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,s=this.y,o=this.z,l=e.elements;return this.x=l[0]*t+l[4]*s+l[8]*o,this.y=l[1]*t+l[5]*s+l[9]*o,this.z=l[2]*t+l[6]*s+l[10]*o,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(e,Math.min(t,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this.z=e.z+(t.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const s=e.x,o=e.y,l=e.z,u=t.x,d=t.y,f=t.z;return this.x=o*f-l*d,this.y=l*u-s*f,this.z=s*d-o*u,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const s=e.dot(this)/t;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){return Ju.copy(this).projectOnVector(e),this.sub(Ju)}reflect(e){return this.sub(Ju.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const s=this.dot(e)/t;return Math.acos(kn(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,s=this.y-e.y,o=this.z-e.z;return t*t+s*s+o*o}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,s){const o=Math.sin(t)*e;return this.x=o*Math.sin(s),this.y=Math.cos(t)*e,this.z=o*Math.cos(s),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,s){return this.x=e*Math.sin(t),this.y=s,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),o=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=s,this.z=o,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,s=Math.sqrt(1-e**2);return this.x=s*Math.cos(t),this.y=s*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ju=new ce,Mm=new oa;class aa{constructor(e=new ce(1/0,1/0,1/0),t=new ce(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,s=e.length;t<s;t+=3)this.expandByPoint(fi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,s=e.count;t<s;t++)this.expandByPoint(fi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,s=e.length;t<s;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const s=fi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(s),this.max.copy(e).add(s),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const l=s.getAttribute("position");if(t===!0&&l!==void 0&&e.isInstancedMesh!==!0)for(let u=0,d=l.count;u<d;u++)e.isMesh===!0?e.getVertexPosition(u,fi):fi.fromBufferAttribute(l,u),fi.applyMatrix4(e.matrixWorld),this.expandByPoint(fi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),yl.copy(e.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),yl.copy(s.boundingBox)),yl.applyMatrix4(e.matrixWorld),this.union(yl)}const o=e.children;for(let l=0,u=o.length;l<u;l++)this.expandByObject(o[l],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,fi),fi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,s;return e.normal.x>0?(t=e.normal.x*this.min.x,s=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,s=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,s+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,s+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,s+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,s+=e.normal.z*this.min.z),t<=-e.constant&&s>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Xo),Sl.subVectors(this.max,Xo),Ns.subVectors(e.a,Xo),Us.subVectors(e.b,Xo),Os.subVectors(e.c,Xo),mr.subVectors(Us,Ns),gr.subVectors(Os,Us),Yr.subVectors(Ns,Os);let t=[0,-mr.z,mr.y,0,-gr.z,gr.y,0,-Yr.z,Yr.y,mr.z,0,-mr.x,gr.z,0,-gr.x,Yr.z,0,-Yr.x,-mr.y,mr.x,0,-gr.y,gr.x,0,-Yr.y,Yr.x,0];return!ed(t,Ns,Us,Os,Sl)||(t=[1,0,0,0,1,0,0,0,1],!ed(t,Ns,Us,Os,Sl))?!1:(Ml.crossVectors(mr,gr),t=[Ml.x,Ml.y,Ml.z],ed(t,Ns,Us,Os,Sl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,fi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(fi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Fi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Fi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Fi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Fi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Fi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Fi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Fi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Fi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Fi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Fi=[new ce,new ce,new ce,new ce,new ce,new ce,new ce,new ce],fi=new ce,yl=new aa,Ns=new ce,Us=new ce,Os=new ce,mr=new ce,gr=new ce,Yr=new ce,Xo=new ce,Sl=new ce,Ml=new ce,qr=new ce;function ed(r,e,t,s,o){for(let l=0,u=r.length-3;l<=u;l+=3){qr.fromArray(r,l);const d=o.x*Math.abs(qr.x)+o.y*Math.abs(qr.y)+o.z*Math.abs(qr.z),f=e.dot(qr),p=t.dot(qr),g=s.dot(qr);if(Math.max(-Math.max(f,p,g),Math.min(f,p,g))>d)return!1}return!0}const Fy=new aa,Yo=new ce,td=new ce;class Gd{constructor(e=new ce,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const s=this.center;t!==void 0?s.copy(t):Fy.setFromPoints(e).getCenter(s);let o=0;for(let l=0,u=e.length;l<u;l++)o=Math.max(o,s.distanceToSquared(e[l]));return this.radius=Math.sqrt(o),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const s=this.center.distanceToSquared(e);return t.copy(e),s>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Yo.subVectors(e,this.center);const t=Yo.lengthSq();if(t>this.radius*this.radius){const s=Math.sqrt(t),o=(s-this.radius)*.5;this.center.addScaledVector(Yo,o/s),this.radius+=o}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(td.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Yo.copy(e.center).add(td)),this.expandByPoint(Yo.copy(e.center).sub(td))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ki=new ce,nd=new ce,El=new ce,vr=new ce,id=new ce,Tl=new ce,rd=new ce;class ky{constructor(e=new ce,t=new ce(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ki)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const s=t.dot(this.direction);return s<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ki.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ki.copy(this.origin).addScaledVector(this.direction,t),ki.distanceToSquared(e))}distanceSqToSegment(e,t,s,o){nd.copy(e).add(t).multiplyScalar(.5),El.copy(t).sub(e).normalize(),vr.copy(this.origin).sub(nd);const l=e.distanceTo(t)*.5,u=-this.direction.dot(El),d=vr.dot(this.direction),f=-vr.dot(El),p=vr.lengthSq(),g=Math.abs(1-u*u);let m,_,S,E;if(g>0)if(m=u*f-d,_=u*d-f,E=l*g,m>=0)if(_>=-E)if(_<=E){const M=1/g;m*=M,_*=M,S=m*(m+u*_+2*d)+_*(u*m+_+2*f)+p}else _=l,m=Math.max(0,-(u*_+d)),S=-m*m+_*(_+2*f)+p;else _=-l,m=Math.max(0,-(u*_+d)),S=-m*m+_*(_+2*f)+p;else _<=-E?(m=Math.max(0,-(-u*l+d)),_=m>0?-l:Math.min(Math.max(-l,-f),l),S=-m*m+_*(_+2*f)+p):_<=E?(m=0,_=Math.min(Math.max(-l,-f),l),S=_*(_+2*f)+p):(m=Math.max(0,-(u*l+d)),_=m>0?l:Math.min(Math.max(-l,-f),l),S=-m*m+_*(_+2*f)+p);else _=u>0?-l:l,m=Math.max(0,-(u*_+d)),S=-m*m+_*(_+2*f)+p;return s&&s.copy(this.origin).addScaledVector(this.direction,m),o&&o.copy(nd).addScaledVector(El,_),S}intersectSphere(e,t){ki.subVectors(e.center,this.origin);const s=ki.dot(this.direction),o=ki.dot(ki)-s*s,l=e.radius*e.radius;if(o>l)return null;const u=Math.sqrt(l-o),d=s-u,f=s+u;return f<0?null:d<0?this.at(f,t):this.at(d,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(e.normal)+e.constant)/t;return s>=0?s:null}intersectPlane(e,t){const s=this.distanceToPlane(e);return s===null?null:this.at(s,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let s,o,l,u,d,f;const p=1/this.direction.x,g=1/this.direction.y,m=1/this.direction.z,_=this.origin;return p>=0?(s=(e.min.x-_.x)*p,o=(e.max.x-_.x)*p):(s=(e.max.x-_.x)*p,o=(e.min.x-_.x)*p),g>=0?(l=(e.min.y-_.y)*g,u=(e.max.y-_.y)*g):(l=(e.max.y-_.y)*g,u=(e.min.y-_.y)*g),s>u||l>o||((l>s||isNaN(s))&&(s=l),(u<o||isNaN(o))&&(o=u),m>=0?(d=(e.min.z-_.z)*m,f=(e.max.z-_.z)*m):(d=(e.max.z-_.z)*m,f=(e.min.z-_.z)*m),s>f||d>o)||((d>s||s!==s)&&(s=d),(f<o||o!==o)&&(o=f),o<0)?null:this.at(s>=0?s:o,t)}intersectsBox(e){return this.intersectBox(e,ki)!==null}intersectTriangle(e,t,s,o,l){id.subVectors(t,e),Tl.subVectors(s,e),rd.crossVectors(id,Tl);let u=this.direction.dot(rd),d;if(u>0){if(o)return null;d=1}else if(u<0)d=-1,u=-u;else return null;vr.subVectors(this.origin,e);const f=d*this.direction.dot(Tl.crossVectors(vr,Tl));if(f<0)return null;const p=d*this.direction.dot(id.cross(vr));if(p<0||f+p>u)return null;const g=-d*vr.dot(rd);return g<0?null:this.at(g/u,l)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Kt{constructor(e,t,s,o,l,u,d,f,p,g,m,_,S,E,M,x){Kt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,s,o,l,u,d,f,p,g,m,_,S,E,M,x)}set(e,t,s,o,l,u,d,f,p,g,m,_,S,E,M,x){const y=this.elements;return y[0]=e,y[4]=t,y[8]=s,y[12]=o,y[1]=l,y[5]=u,y[9]=d,y[13]=f,y[2]=p,y[6]=g,y[10]=m,y[14]=_,y[3]=S,y[7]=E,y[11]=M,y[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Kt().fromArray(this.elements)}copy(e){const t=this.elements,s=e.elements;return t[0]=s[0],t[1]=s[1],t[2]=s[2],t[3]=s[3],t[4]=s[4],t[5]=s[5],t[6]=s[6],t[7]=s[7],t[8]=s[8],t[9]=s[9],t[10]=s[10],t[11]=s[11],t[12]=s[12],t[13]=s[13],t[14]=s[14],t[15]=s[15],this}copyPosition(e){const t=this.elements,s=e.elements;return t[12]=s[12],t[13]=s[13],t[14]=s[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,s){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this}makeBasis(e,t,s){return this.set(e.x,t.x,s.x,0,e.y,t.y,s.y,0,e.z,t.z,s.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,s=e.elements,o=1/Fs.setFromMatrixColumn(e,0).length(),l=1/Fs.setFromMatrixColumn(e,1).length(),u=1/Fs.setFromMatrixColumn(e,2).length();return t[0]=s[0]*o,t[1]=s[1]*o,t[2]=s[2]*o,t[3]=0,t[4]=s[4]*l,t[5]=s[5]*l,t[6]=s[6]*l,t[7]=0,t[8]=s[8]*u,t[9]=s[9]*u,t[10]=s[10]*u,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,s=e.x,o=e.y,l=e.z,u=Math.cos(s),d=Math.sin(s),f=Math.cos(o),p=Math.sin(o),g=Math.cos(l),m=Math.sin(l);if(e.order==="XYZ"){const _=u*g,S=u*m,E=d*g,M=d*m;t[0]=f*g,t[4]=-f*m,t[8]=p,t[1]=S+E*p,t[5]=_-M*p,t[9]=-d*f,t[2]=M-_*p,t[6]=E+S*p,t[10]=u*f}else if(e.order==="YXZ"){const _=f*g,S=f*m,E=p*g,M=p*m;t[0]=_+M*d,t[4]=E*d-S,t[8]=u*p,t[1]=u*m,t[5]=u*g,t[9]=-d,t[2]=S*d-E,t[6]=M+_*d,t[10]=u*f}else if(e.order==="ZXY"){const _=f*g,S=f*m,E=p*g,M=p*m;t[0]=_-M*d,t[4]=-u*m,t[8]=E+S*d,t[1]=S+E*d,t[5]=u*g,t[9]=M-_*d,t[2]=-u*p,t[6]=d,t[10]=u*f}else if(e.order==="ZYX"){const _=u*g,S=u*m,E=d*g,M=d*m;t[0]=f*g,t[4]=E*p-S,t[8]=_*p+M,t[1]=f*m,t[5]=M*p+_,t[9]=S*p-E,t[2]=-p,t[6]=d*f,t[10]=u*f}else if(e.order==="YZX"){const _=u*f,S=u*p,E=d*f,M=d*p;t[0]=f*g,t[4]=M-_*m,t[8]=E*m+S,t[1]=m,t[5]=u*g,t[9]=-d*g,t[2]=-p*g,t[6]=S*m+E,t[10]=_-M*m}else if(e.order==="XZY"){const _=u*f,S=u*p,E=d*f,M=d*p;t[0]=f*g,t[4]=-m,t[8]=p*g,t[1]=_*m+M,t[5]=u*g,t[9]=S*m-E,t[2]=E*m-S,t[6]=d*g,t[10]=M*m+_}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(By,e,zy)}lookAt(e,t,s){const o=this.elements;return Xn.subVectors(e,t),Xn.lengthSq()===0&&(Xn.z=1),Xn.normalize(),_r.crossVectors(s,Xn),_r.lengthSq()===0&&(Math.abs(s.z)===1?Xn.x+=1e-4:Xn.z+=1e-4,Xn.normalize(),_r.crossVectors(s,Xn)),_r.normalize(),wl.crossVectors(Xn,_r),o[0]=_r.x,o[4]=wl.x,o[8]=Xn.x,o[1]=_r.y,o[5]=wl.y,o[9]=Xn.y,o[2]=_r.z,o[6]=wl.z,o[10]=Xn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const s=e.elements,o=t.elements,l=this.elements,u=s[0],d=s[4],f=s[8],p=s[12],g=s[1],m=s[5],_=s[9],S=s[13],E=s[2],M=s[6],x=s[10],y=s[14],w=s[3],R=s[7],b=s[11],z=s[15],k=o[0],N=o[4],fe=o[8],C=o[12],L=o[1],ie=o[5],se=o[9],re=o[13],B=o[2],H=o[6],$=o[10],Z=o[14],U=o[3],Y=o[7],W=o[11],I=o[15];return l[0]=u*k+d*L+f*B+p*U,l[4]=u*N+d*ie+f*H+p*Y,l[8]=u*fe+d*se+f*$+p*W,l[12]=u*C+d*re+f*Z+p*I,l[1]=g*k+m*L+_*B+S*U,l[5]=g*N+m*ie+_*H+S*Y,l[9]=g*fe+m*se+_*$+S*W,l[13]=g*C+m*re+_*Z+S*I,l[2]=E*k+M*L+x*B+y*U,l[6]=E*N+M*ie+x*H+y*Y,l[10]=E*fe+M*se+x*$+y*W,l[14]=E*C+M*re+x*Z+y*I,l[3]=w*k+R*L+b*B+z*U,l[7]=w*N+R*ie+b*H+z*Y,l[11]=w*fe+R*se+b*$+z*W,l[15]=w*C+R*re+b*Z+z*I,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],s=e[4],o=e[8],l=e[12],u=e[1],d=e[5],f=e[9],p=e[13],g=e[2],m=e[6],_=e[10],S=e[14],E=e[3],M=e[7],x=e[11],y=e[15];return E*(+l*f*m-o*p*m-l*d*_+s*p*_+o*d*S-s*f*S)+M*(+t*f*S-t*p*_+l*u*_-o*u*S+o*p*g-l*f*g)+x*(+t*p*m-t*d*S-l*u*m+s*u*S+l*d*g-s*p*g)+y*(-o*d*g-t*f*m+t*d*_+o*u*m-s*u*_+s*f*g)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,s){const o=this.elements;return e.isVector3?(o[12]=e.x,o[13]=e.y,o[14]=e.z):(o[12]=e,o[13]=t,o[14]=s),this}invert(){const e=this.elements,t=e[0],s=e[1],o=e[2],l=e[3],u=e[4],d=e[5],f=e[6],p=e[7],g=e[8],m=e[9],_=e[10],S=e[11],E=e[12],M=e[13],x=e[14],y=e[15],w=m*x*p-M*_*p+M*f*S-d*x*S-m*f*y+d*_*y,R=E*_*p-g*x*p-E*f*S+u*x*S+g*f*y-u*_*y,b=g*M*p-E*m*p+E*d*S-u*M*S-g*d*y+u*m*y,z=E*m*f-g*M*f-E*d*_+u*M*_+g*d*x-u*m*x,k=t*w+s*R+o*b+l*z;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const N=1/k;return e[0]=w*N,e[1]=(M*_*l-m*x*l-M*o*S+s*x*S+m*o*y-s*_*y)*N,e[2]=(d*x*l-M*f*l+M*o*p-s*x*p-d*o*y+s*f*y)*N,e[3]=(m*f*l-d*_*l-m*o*p+s*_*p+d*o*S-s*f*S)*N,e[4]=R*N,e[5]=(g*x*l-E*_*l+E*o*S-t*x*S-g*o*y+t*_*y)*N,e[6]=(E*f*l-u*x*l-E*o*p+t*x*p+u*o*y-t*f*y)*N,e[7]=(u*_*l-g*f*l+g*o*p-t*_*p-u*o*S+t*f*S)*N,e[8]=b*N,e[9]=(E*m*l-g*M*l-E*s*S+t*M*S+g*s*y-t*m*y)*N,e[10]=(u*M*l-E*d*l+E*s*p-t*M*p-u*s*y+t*d*y)*N,e[11]=(g*d*l-u*m*l-g*s*p+t*m*p+u*s*S-t*d*S)*N,e[12]=z*N,e[13]=(g*M*o-E*m*o+E*s*_-t*M*_-g*s*x+t*m*x)*N,e[14]=(E*d*o-u*M*o-E*s*f+t*M*f+u*s*x-t*d*x)*N,e[15]=(u*m*o-g*d*o+g*s*f-t*m*f-u*s*_+t*d*_)*N,this}scale(e){const t=this.elements,s=e.x,o=e.y,l=e.z;return t[0]*=s,t[4]*=o,t[8]*=l,t[1]*=s,t[5]*=o,t[9]*=l,t[2]*=s,t[6]*=o,t[10]*=l,t[3]*=s,t[7]*=o,t[11]*=l,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],o=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,s,o))}makeTranslation(e,t,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,s,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,t,-s,0,0,s,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),s=Math.sin(e);return this.set(t,0,s,0,0,1,0,0,-s,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),s=Math.sin(e);return this.set(t,-s,0,0,s,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const s=Math.cos(t),o=Math.sin(t),l=1-s,u=e.x,d=e.y,f=e.z,p=l*u,g=l*d;return this.set(p*u+s,p*d-o*f,p*f+o*d,0,p*d+o*f,g*d+s,g*f-o*u,0,p*f-o*d,g*f+o*u,l*f*f+s,0,0,0,0,1),this}makeScale(e,t,s){return this.set(e,0,0,0,0,t,0,0,0,0,s,0,0,0,0,1),this}makeShear(e,t,s,o,l,u){return this.set(1,s,l,0,e,1,u,0,t,o,1,0,0,0,0,1),this}compose(e,t,s){const o=this.elements,l=t._x,u=t._y,d=t._z,f=t._w,p=l+l,g=u+u,m=d+d,_=l*p,S=l*g,E=l*m,M=u*g,x=u*m,y=d*m,w=f*p,R=f*g,b=f*m,z=s.x,k=s.y,N=s.z;return o[0]=(1-(M+y))*z,o[1]=(S+b)*z,o[2]=(E-R)*z,o[3]=0,o[4]=(S-b)*k,o[5]=(1-(_+y))*k,o[6]=(x+w)*k,o[7]=0,o[8]=(E+R)*N,o[9]=(x-w)*N,o[10]=(1-(_+M))*N,o[11]=0,o[12]=e.x,o[13]=e.y,o[14]=e.z,o[15]=1,this}decompose(e,t,s){const o=this.elements;let l=Fs.set(o[0],o[1],o[2]).length();const u=Fs.set(o[4],o[5],o[6]).length(),d=Fs.set(o[8],o[9],o[10]).length();this.determinant()<0&&(l=-l),e.x=o[12],e.y=o[13],e.z=o[14],hi.copy(this);const p=1/l,g=1/u,m=1/d;return hi.elements[0]*=p,hi.elements[1]*=p,hi.elements[2]*=p,hi.elements[4]*=g,hi.elements[5]*=g,hi.elements[6]*=g,hi.elements[8]*=m,hi.elements[9]*=m,hi.elements[10]*=m,t.setFromRotationMatrix(hi),s.x=l,s.y=u,s.z=d,this}makePerspective(e,t,s,o,l,u,d=ji){const f=this.elements,p=2*l/(t-e),g=2*l/(s-o),m=(t+e)/(t-e),_=(s+o)/(s-o);let S,E;if(d===ji)S=-(u+l)/(u-l),E=-2*u*l/(u-l);else if(d===Yl)S=-u/(u-l),E=-u*l/(u-l);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return f[0]=p,f[4]=0,f[8]=m,f[12]=0,f[1]=0,f[5]=g,f[9]=_,f[13]=0,f[2]=0,f[6]=0,f[10]=S,f[14]=E,f[3]=0,f[7]=0,f[11]=-1,f[15]=0,this}makeOrthographic(e,t,s,o,l,u,d=ji){const f=this.elements,p=1/(t-e),g=1/(s-o),m=1/(u-l),_=(t+e)*p,S=(s+o)*g;let E,M;if(d===ji)E=(u+l)*m,M=-2*m;else if(d===Yl)E=l*m,M=-1*m;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return f[0]=2*p,f[4]=0,f[8]=0,f[12]=-_,f[1]=0,f[5]=2*g,f[9]=0,f[13]=-S,f[2]=0,f[6]=0,f[10]=M,f[14]=-E,f[3]=0,f[7]=0,f[11]=0,f[15]=1,this}equals(e){const t=this.elements,s=e.elements;for(let o=0;o<16;o++)if(t[o]!==s[o])return!1;return!0}fromArray(e,t=0){for(let s=0;s<16;s++)this.elements[s]=e[s+t];return this}toArray(e=[],t=0){const s=this.elements;return e[t]=s[0],e[t+1]=s[1],e[t+2]=s[2],e[t+3]=s[3],e[t+4]=s[4],e[t+5]=s[5],e[t+6]=s[6],e[t+7]=s[7],e[t+8]=s[8],e[t+9]=s[9],e[t+10]=s[10],e[t+11]=s[11],e[t+12]=s[12],e[t+13]=s[13],e[t+14]=s[14],e[t+15]=s[15],e}}const Fs=new ce,hi=new Kt,By=new ce(0,0,0),zy=new ce(1,1,1),_r=new ce,wl=new ce,Xn=new ce,Em=new Kt,Tm=new oa;class Jl{constructor(e=0,t=0,s=0,o=Jl.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=s,this._order=o}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,s,o=this._order){return this._x=e,this._y=t,this._z=s,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,s=!0){const o=e.elements,l=o[0],u=o[4],d=o[8],f=o[1],p=o[5],g=o[9],m=o[2],_=o[6],S=o[10];switch(t){case"XYZ":this._y=Math.asin(kn(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-g,S),this._z=Math.atan2(-u,l)):(this._x=Math.atan2(_,p),this._z=0);break;case"YXZ":this._x=Math.asin(-kn(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(d,S),this._z=Math.atan2(f,p)):(this._y=Math.atan2(-m,l),this._z=0);break;case"ZXY":this._x=Math.asin(kn(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(-m,S),this._z=Math.atan2(-u,p)):(this._y=0,this._z=Math.atan2(f,l));break;case"ZYX":this._y=Math.asin(-kn(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(_,S),this._z=Math.atan2(f,l)):(this._x=0,this._z=Math.atan2(-u,p));break;case"YZX":this._z=Math.asin(kn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(-g,p),this._y=Math.atan2(-m,l)):(this._x=0,this._y=Math.atan2(d,S));break;case"XZY":this._z=Math.asin(-kn(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(_,p),this._y=Math.atan2(d,l)):(this._x=Math.atan2(-g,S),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,s===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,s){return Em.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Em,t,s)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Tm.setFromEuler(this),this.setFromQuaternion(Tm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Jl.DEFAULT_ORDER="XYZ";class qg{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Hy=0;const wm=new ce,ks=new oa,Bi=new Kt,Al=new ce,qo=new ce,Gy=new ce,Vy=new oa,Am=new ce(1,0,0),Cm=new ce(0,1,0),Rm=new ce(0,0,1),Wy={type:"added"},jy={type:"removed"};class un extends ao{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Hy++}),this.uuid=sa(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=un.DEFAULT_UP.clone();const e=new ce,t=new Jl,s=new oa,o=new ce(1,1,1);function l(){s.setFromEuler(t,!1)}function u(){t.setFromQuaternion(s,void 0,!1)}t._onChange(l),s._onChange(u),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new Kt},normalMatrix:{value:new vt}}),this.matrix=new Kt,this.matrixWorld=new Kt,this.matrixAutoUpdate=un.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=un.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new qg,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ks.setFromAxisAngle(e,t),this.quaternion.multiply(ks),this}rotateOnWorldAxis(e,t){return ks.setFromAxisAngle(e,t),this.quaternion.premultiply(ks),this}rotateX(e){return this.rotateOnAxis(Am,e)}rotateY(e){return this.rotateOnAxis(Cm,e)}rotateZ(e){return this.rotateOnAxis(Rm,e)}translateOnAxis(e,t){return wm.copy(e).applyQuaternion(this.quaternion),this.position.add(wm.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Am,e)}translateY(e){return this.translateOnAxis(Cm,e)}translateZ(e){return this.translateOnAxis(Rm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Bi.copy(this.matrixWorld).invert())}lookAt(e,t,s){e.isVector3?Al.copy(e):Al.set(e,t,s);const o=this.parent;this.updateWorldMatrix(!0,!1),qo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Bi.lookAt(qo,Al,this.up):Bi.lookAt(Al,qo,this.up),this.quaternion.setFromRotationMatrix(Bi),o&&(Bi.extractRotation(o.matrixWorld),ks.setFromRotationMatrix(Bi),this.quaternion.premultiply(ks.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Wy)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(jy)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Bi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Bi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Bi),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let s=0,o=this.children.length;s<o;s++){const u=this.children[s].getObjectByProperty(e,t);if(u!==void 0)return u}}getObjectsByProperty(e,t,s=[]){this[e]===t&&s.push(this);const o=this.children;for(let l=0,u=o.length;l<u;l++)o[l].getObjectsByProperty(e,t,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qo,e,Gy),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qo,Vy,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let s=0,o=t.length;s<o;s++)t[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let s=0,o=t.length;s<o;s++)t[s].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let s=0,o=t.length;s<o;s++){const l=t[s];(l.matrixWorldAutoUpdate===!0||e===!0)&&l.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const s=this.parent;if(e===!0&&s!==null&&s.matrixWorldAutoUpdate===!0&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const o=this.children;for(let l=0,u=o.length;l<u;l++){const d=o[l];d.matrixWorldAutoUpdate===!0&&d.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",s={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const o={};o.uuid=this.uuid,o.type=this.type,this.name!==""&&(o.name=this.name),this.castShadow===!0&&(o.castShadow=!0),this.receiveShadow===!0&&(o.receiveShadow=!0),this.visible===!1&&(o.visible=!1),this.frustumCulled===!1&&(o.frustumCulled=!1),this.renderOrder!==0&&(o.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(o.matrixAutoUpdate=!1),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.visibility=this._visibility,o.active=this._active,o.bounds=this._bounds.map(d=>({boxInitialized:d.boxInitialized,boxMin:d.box.min.toArray(),boxMax:d.box.max.toArray(),sphereInitialized:d.sphereInitialized,sphereRadius:d.sphere.radius,sphereCenter:d.sphere.center.toArray()})),o.maxGeometryCount=this._maxGeometryCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.geometryCount=this._geometryCount,o.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(o.boundingSphere={center:o.boundingSphere.center.toArray(),radius:o.boundingSphere.radius}),this.boundingBox!==null&&(o.boundingBox={min:o.boundingBox.min.toArray(),max:o.boundingBox.max.toArray()}));function l(d,f){return d[f.uuid]===void 0&&(d[f.uuid]=f.toJSON(e)),f.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=l(e.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const f=d.shapes;if(Array.isArray(f))for(let p=0,g=f.length;p<g;p++){const m=f[p];l(e.shapes,m)}else l(e.shapes,f)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(l(e.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let f=0,p=this.material.length;f<p;f++)d.push(l(e.materials,this.material[f]));o.material=d}else o.material=l(e.materials,this.material);if(this.children.length>0){o.children=[];for(let d=0;d<this.children.length;d++)o.children.push(this.children[d].toJSON(e).object)}if(this.animations.length>0){o.animations=[];for(let d=0;d<this.animations.length;d++){const f=this.animations[d];o.animations.push(l(e.animations,f))}}if(t){const d=u(e.geometries),f=u(e.materials),p=u(e.textures),g=u(e.images),m=u(e.shapes),_=u(e.skeletons),S=u(e.animations),E=u(e.nodes);d.length>0&&(s.geometries=d),f.length>0&&(s.materials=f),p.length>0&&(s.textures=p),g.length>0&&(s.images=g),m.length>0&&(s.shapes=m),_.length>0&&(s.skeletons=_),S.length>0&&(s.animations=S),E.length>0&&(s.nodes=E)}return s.object=o,s;function u(d){const f=[];for(const p in d){const g=d[p];delete g.metadata,f.push(g)}return f}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let s=0;s<e.children.length;s++){const o=e.children[s];this.add(o.clone())}return this}}un.DEFAULT_UP=new ce(0,1,0);un.DEFAULT_MATRIX_AUTO_UPDATE=!0;un.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const pi=new ce,zi=new ce,sd=new ce,Hi=new ce,Bs=new ce,zs=new ce,bm=new ce,od=new ce,ad=new ce,ld=new ce;let Cl=!1;class mi{constructor(e=new ce,t=new ce,s=new ce){this.a=e,this.b=t,this.c=s}static getNormal(e,t,s,o){o.subVectors(s,t),pi.subVectors(e,t),o.cross(pi);const l=o.lengthSq();return l>0?o.multiplyScalar(1/Math.sqrt(l)):o.set(0,0,0)}static getBarycoord(e,t,s,o,l){pi.subVectors(o,t),zi.subVectors(s,t),sd.subVectors(e,t);const u=pi.dot(pi),d=pi.dot(zi),f=pi.dot(sd),p=zi.dot(zi),g=zi.dot(sd),m=u*p-d*d;if(m===0)return l.set(0,0,0),null;const _=1/m,S=(p*f-d*g)*_,E=(u*g-d*f)*_;return l.set(1-S-E,E,S)}static containsPoint(e,t,s,o){return this.getBarycoord(e,t,s,o,Hi)===null?!1:Hi.x>=0&&Hi.y>=0&&Hi.x+Hi.y<=1}static getUV(e,t,s,o,l,u,d,f){return Cl===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Cl=!0),this.getInterpolation(e,t,s,o,l,u,d,f)}static getInterpolation(e,t,s,o,l,u,d,f){return this.getBarycoord(e,t,s,o,Hi)===null?(f.x=0,f.y=0,"z"in f&&(f.z=0),"w"in f&&(f.w=0),null):(f.setScalar(0),f.addScaledVector(l,Hi.x),f.addScaledVector(u,Hi.y),f.addScaledVector(d,Hi.z),f)}static isFrontFacing(e,t,s,o){return pi.subVectors(s,t),zi.subVectors(e,t),pi.cross(zi).dot(o)<0}set(e,t,s){return this.a.copy(e),this.b.copy(t),this.c.copy(s),this}setFromPointsAndIndices(e,t,s,o){return this.a.copy(e[t]),this.b.copy(e[s]),this.c.copy(e[o]),this}setFromAttributeAndIndices(e,t,s,o){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,s),this.c.fromBufferAttribute(e,o),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return pi.subVectors(this.c,this.b),zi.subVectors(this.a,this.b),pi.cross(zi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return mi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return mi.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,s,o,l){return Cl===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Cl=!0),mi.getInterpolation(e,this.a,this.b,this.c,t,s,o,l)}getInterpolation(e,t,s,o,l){return mi.getInterpolation(e,this.a,this.b,this.c,t,s,o,l)}containsPoint(e){return mi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return mi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const s=this.a,o=this.b,l=this.c;let u,d;Bs.subVectors(o,s),zs.subVectors(l,s),od.subVectors(e,s);const f=Bs.dot(od),p=zs.dot(od);if(f<=0&&p<=0)return t.copy(s);ad.subVectors(e,o);const g=Bs.dot(ad),m=zs.dot(ad);if(g>=0&&m<=g)return t.copy(o);const _=f*m-g*p;if(_<=0&&f>=0&&g<=0)return u=f/(f-g),t.copy(s).addScaledVector(Bs,u);ld.subVectors(e,l);const S=Bs.dot(ld),E=zs.dot(ld);if(E>=0&&S<=E)return t.copy(l);const M=S*p-f*E;if(M<=0&&p>=0&&E<=0)return d=p/(p-E),t.copy(s).addScaledVector(zs,d);const x=g*E-S*m;if(x<=0&&m-g>=0&&S-E>=0)return bm.subVectors(l,o),d=(m-g)/(m-g+(S-E)),t.copy(o).addScaledVector(bm,d);const y=1/(x+M+_);return u=M*y,d=_*y,t.copy(s).addScaledVector(Bs,u).addScaledVector(zs,d)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const $g={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},xr={h:0,s:0,l:0},Rl={h:0,s:0,l:0};function cd(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class Mt{constructor(e,t,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,s)}set(e,t,s){if(t===void 0&&s===void 0){const o=e;o&&o.isColor?this.copy(o):typeof o=="number"?this.setHex(o):typeof o=="string"&&this.setStyle(o)}else this.setRGB(e,t,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=cn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ct.toWorkingColorSpace(this,t),this}setRGB(e,t,s,o=Ct.workingColorSpace){return this.r=e,this.g=t,this.b=s,Ct.toWorkingColorSpace(this,o),this}setHSL(e,t,s,o=Ct.workingColorSpace){if(e=Ly(e,1),t=kn(t,0,1),s=kn(s,0,1),t===0)this.r=this.g=this.b=s;else{const l=s<=.5?s*(1+t):s+t-s*t,u=2*s-l;this.r=cd(u,l,e+1/3),this.g=cd(u,l,e),this.b=cd(u,l,e-1/3)}return Ct.toWorkingColorSpace(this,o),this}setStyle(e,t=cn){function s(l){l!==void 0&&parseFloat(l)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let o;if(o=/^(\w+)\(([^\)]*)\)/.exec(e)){let l;const u=o[1],d=o[2];switch(u){case"rgb":case"rgba":if(l=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(l[4]),this.setRGB(Math.min(255,parseInt(l[1],10))/255,Math.min(255,parseInt(l[2],10))/255,Math.min(255,parseInt(l[3],10))/255,t);if(l=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(l[4]),this.setRGB(Math.min(100,parseInt(l[1],10))/100,Math.min(100,parseInt(l[2],10))/100,Math.min(100,parseInt(l[3],10))/100,t);break;case"hsl":case"hsla":if(l=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(l[4]),this.setHSL(parseFloat(l[1])/360,parseFloat(l[2])/100,parseFloat(l[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(o=/^\#([A-Fa-f\d]+)$/.exec(e)){const l=o[1],u=l.length;if(u===3)return this.setRGB(parseInt(l.charAt(0),16)/15,parseInt(l.charAt(1),16)/15,parseInt(l.charAt(2),16)/15,t);if(u===6)return this.setHex(parseInt(l,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=cn){const s=$g[e.toLowerCase()];return s!==void 0?this.setHex(s,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Js(e.r),this.g=Js(e.g),this.b=Js(e.b),this}copyLinearToSRGB(e){return this.r=Zu(e.r),this.g=Zu(e.g),this.b=Zu(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=cn){return Ct.fromWorkingColorSpace(vn.copy(this),e),Math.round(kn(vn.r*255,0,255))*65536+Math.round(kn(vn.g*255,0,255))*256+Math.round(kn(vn.b*255,0,255))}getHexString(e=cn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ct.workingColorSpace){Ct.fromWorkingColorSpace(vn.copy(this),t);const s=vn.r,o=vn.g,l=vn.b,u=Math.max(s,o,l),d=Math.min(s,o,l);let f,p;const g=(d+u)/2;if(d===u)f=0,p=0;else{const m=u-d;switch(p=g<=.5?m/(u+d):m/(2-u-d),u){case s:f=(o-l)/m+(o<l?6:0);break;case o:f=(l-s)/m+2;break;case l:f=(s-o)/m+4;break}f/=6}return e.h=f,e.s=p,e.l=g,e}getRGB(e,t=Ct.workingColorSpace){return Ct.fromWorkingColorSpace(vn.copy(this),t),e.r=vn.r,e.g=vn.g,e.b=vn.b,e}getStyle(e=cn){Ct.fromWorkingColorSpace(vn.copy(this),e);const t=vn.r,s=vn.g,o=vn.b;return e!==cn?`color(${e} ${t.toFixed(3)} ${s.toFixed(3)} ${o.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(s*255)},${Math.round(o*255)})`}offsetHSL(e,t,s){return this.getHSL(xr),this.setHSL(xr.h+e,xr.s+t,xr.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,s){return this.r=e.r+(t.r-e.r)*s,this.g=e.g+(t.g-e.g)*s,this.b=e.b+(t.b-e.b)*s,this}lerpHSL(e,t){this.getHSL(xr),e.getHSL(Rl);const s=$u(xr.h,Rl.h,t),o=$u(xr.s,Rl.s,t),l=$u(xr.l,Rl.l,t);return this.setHSL(s,o,l),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,s=this.g,o=this.b,l=e.elements;return this.r=l[0]*t+l[3]*s+l[6]*o,this.g=l[1]*t+l[4]*s+l[7]*o,this.b=l[2]*t+l[5]*s+l[8]*o,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const vn=new Mt;Mt.NAMES=$g;let Xy=0;class la extends ao{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Xy++}),this.uuid=sa(),this.name="",this.type="Material",this.blending=Zs,this.side=Rr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ad,this.blendDst=Cd,this.blendEquation=Jr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Mt(0,0,0),this.blendAlpha=0,this.depthFunc=Vl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=mm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ds,this.stencilZFail=Ds,this.stencilZPass=Ds,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const s=e[t];if(s===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const o=this[t];if(o===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}o&&o.isColor?o.set(s):o&&o.isVector3&&s&&s.isVector3?o.copy(s):this[t]=s}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const s={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(e).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(e).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(e).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(e).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(e).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==Zs&&(s.blending=this.blending),this.side!==Rr&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==Ad&&(s.blendSrc=this.blendSrc),this.blendDst!==Cd&&(s.blendDst=this.blendDst),this.blendEquation!==Jr&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==Vl&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==mm&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ds&&(s.stencilFail=this.stencilFail),this.stencilZFail!==Ds&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==Ds&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function o(l){const u=[];for(const d in l){const f=l[d];delete f.metadata,u.push(f)}return u}if(t){const l=o(e.textures),u=o(e.images);l.length>0&&(s.textures=l),u.length>0&&(s.images=u)}return s}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let s=null;if(t!==null){const o=t.length;s=new Array(o);for(let l=0;l!==o;++l)s[l]=t[l].clone()}return this.clippingPlanes=s,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Kg extends la{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Mt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Dg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const jt=new ce,bl=new Et;class Ti{constructor(e,t,s=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=s,this.usage=gm,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Er,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,s){e*=this.itemSize,s*=t.itemSize;for(let o=0,l=this.itemSize;o<l;o++)this.array[e+o]=t.array[s+o];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,s=this.count;t<s;t++)bl.fromBufferAttribute(this,t),bl.applyMatrix3(e),this.setXY(t,bl.x,bl.y);else if(this.itemSize===3)for(let t=0,s=this.count;t<s;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix3(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyMatrix4(e){for(let t=0,s=this.count;t<s;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix4(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyNormalMatrix(e){for(let t=0,s=this.count;t<s;t++)jt.fromBufferAttribute(this,t),jt.applyNormalMatrix(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}transformDirection(e){for(let t=0,s=this.count;t<s;t++)jt.fromBufferAttribute(this,t),jt.transformDirection(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let s=this.array[e*this.itemSize+t];return this.normalized&&(s=jo(s,this.array)),s}setComponent(e,t,s){return this.normalized&&(s=On(s,this.array)),this.array[e*this.itemSize+t]=s,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=jo(t,this.array)),t}setX(e,t){return this.normalized&&(t=On(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=jo(t,this.array)),t}setY(e,t){return this.normalized&&(t=On(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=jo(t,this.array)),t}setZ(e,t){return this.normalized&&(t=On(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=jo(t,this.array)),t}setW(e,t){return this.normalized&&(t=On(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,s){return e*=this.itemSize,this.normalized&&(t=On(t,this.array),s=On(s,this.array)),this.array[e+0]=t,this.array[e+1]=s,this}setXYZ(e,t,s,o){return e*=this.itemSize,this.normalized&&(t=On(t,this.array),s=On(s,this.array),o=On(o,this.array)),this.array[e+0]=t,this.array[e+1]=s,this.array[e+2]=o,this}setXYZW(e,t,s,o,l){return e*=this.itemSize,this.normalized&&(t=On(t,this.array),s=On(s,this.array),o=On(o,this.array),l=On(l,this.array)),this.array[e+0]=t,this.array[e+1]=s,this.array[e+2]=o,this.array[e+3]=l,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==gm&&(e.usage=this.usage),e}}class Zg extends Ti{constructor(e,t,s){super(new Uint16Array(e),t,s)}}class Qg extends Ti{constructor(e,t,s){super(new Uint32Array(e),t,s)}}class wi extends Ti{constructor(e,t,s){super(new Float32Array(e),t,s)}}let Yy=0;const ni=new Kt,ud=new un,Hs=new ce,Yn=new aa,$o=new aa,rn=new ce;class Lr extends ao{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Yy++}),this.uuid=sa(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Wg(e)?Qg:Zg)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,s=0){this.groups.push({start:e,count:t,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const l=new vt().getNormalMatrix(e);s.applyNormalMatrix(l),s.needsUpdate=!0}const o=this.attributes.tangent;return o!==void 0&&(o.transformDirection(e),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ni.makeRotationFromQuaternion(e),this.applyMatrix4(ni),this}rotateX(e){return ni.makeRotationX(e),this.applyMatrix4(ni),this}rotateY(e){return ni.makeRotationY(e),this.applyMatrix4(ni),this}rotateZ(e){return ni.makeRotationZ(e),this.applyMatrix4(ni),this}translate(e,t,s){return ni.makeTranslation(e,t,s),this.applyMatrix4(ni),this}scale(e,t,s){return ni.makeScale(e,t,s),this.applyMatrix4(ni),this}lookAt(e){return ud.lookAt(e),ud.updateMatrix(),this.applyMatrix4(ud.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hs).negate(),this.translate(Hs.x,Hs.y,Hs.z),this}setFromPoints(e){const t=[];for(let s=0,o=e.length;s<o;s++){const l=e[s];t.push(l.x,l.y,l.z||0)}return this.setAttribute("position",new wi(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new aa);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new ce(-1/0,-1/0,-1/0),new ce(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const l=t[s];Yn.setFromBufferAttribute(l),this.morphTargetsRelative?(rn.addVectors(this.boundingBox.min,Yn.min),this.boundingBox.expandByPoint(rn),rn.addVectors(this.boundingBox.max,Yn.max),this.boundingBox.expandByPoint(rn)):(this.boundingBox.expandByPoint(Yn.min),this.boundingBox.expandByPoint(Yn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gd);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new ce,1/0);return}if(e){const s=this.boundingSphere.center;if(Yn.setFromBufferAttribute(e),t)for(let l=0,u=t.length;l<u;l++){const d=t[l];$o.setFromBufferAttribute(d),this.morphTargetsRelative?(rn.addVectors(Yn.min,$o.min),Yn.expandByPoint(rn),rn.addVectors(Yn.max,$o.max),Yn.expandByPoint(rn)):(Yn.expandByPoint($o.min),Yn.expandByPoint($o.max))}Yn.getCenter(s);let o=0;for(let l=0,u=e.count;l<u;l++)rn.fromBufferAttribute(e,l),o=Math.max(o,s.distanceToSquared(rn));if(t)for(let l=0,u=t.length;l<u;l++){const d=t[l],f=this.morphTargetsRelative;for(let p=0,g=d.count;p<g;p++)rn.fromBufferAttribute(d,p),f&&(Hs.fromBufferAttribute(e,p),rn.add(Hs)),o=Math.max(o,s.distanceToSquared(rn))}this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=e.array,o=t.position.array,l=t.normal.array,u=t.uv.array,d=o.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ti(new Float32Array(4*d),4));const f=this.getAttribute("tangent").array,p=[],g=[];for(let L=0;L<d;L++)p[L]=new ce,g[L]=new ce;const m=new ce,_=new ce,S=new ce,E=new Et,M=new Et,x=new Et,y=new ce,w=new ce;function R(L,ie,se){m.fromArray(o,L*3),_.fromArray(o,ie*3),S.fromArray(o,se*3),E.fromArray(u,L*2),M.fromArray(u,ie*2),x.fromArray(u,se*2),_.sub(m),S.sub(m),M.sub(E),x.sub(E);const re=1/(M.x*x.y-x.x*M.y);isFinite(re)&&(y.copy(_).multiplyScalar(x.y).addScaledVector(S,-M.y).multiplyScalar(re),w.copy(S).multiplyScalar(M.x).addScaledVector(_,-x.x).multiplyScalar(re),p[L].add(y),p[ie].add(y),p[se].add(y),g[L].add(w),g[ie].add(w),g[se].add(w))}let b=this.groups;b.length===0&&(b=[{start:0,count:s.length}]);for(let L=0,ie=b.length;L<ie;++L){const se=b[L],re=se.start,B=se.count;for(let H=re,$=re+B;H<$;H+=3)R(s[H+0],s[H+1],s[H+2])}const z=new ce,k=new ce,N=new ce,fe=new ce;function C(L){N.fromArray(l,L*3),fe.copy(N);const ie=p[L];z.copy(ie),z.sub(N.multiplyScalar(N.dot(ie))).normalize(),k.crossVectors(fe,ie);const re=k.dot(g[L])<0?-1:1;f[L*4]=z.x,f[L*4+1]=z.y,f[L*4+2]=z.z,f[L*4+3]=re}for(let L=0,ie=b.length;L<ie;++L){const se=b[L],re=se.start,B=se.count;for(let H=re,$=re+B;H<$;H+=3)C(s[H+0]),C(s[H+1]),C(s[H+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new Ti(new Float32Array(t.count*3),3),this.setAttribute("normal",s);else for(let _=0,S=s.count;_<S;_++)s.setXYZ(_,0,0,0);const o=new ce,l=new ce,u=new ce,d=new ce,f=new ce,p=new ce,g=new ce,m=new ce;if(e)for(let _=0,S=e.count;_<S;_+=3){const E=e.getX(_+0),M=e.getX(_+1),x=e.getX(_+2);o.fromBufferAttribute(t,E),l.fromBufferAttribute(t,M),u.fromBufferAttribute(t,x),g.subVectors(u,l),m.subVectors(o,l),g.cross(m),d.fromBufferAttribute(s,E),f.fromBufferAttribute(s,M),p.fromBufferAttribute(s,x),d.add(g),f.add(g),p.add(g),s.setXYZ(E,d.x,d.y,d.z),s.setXYZ(M,f.x,f.y,f.z),s.setXYZ(x,p.x,p.y,p.z)}else for(let _=0,S=t.count;_<S;_+=3)o.fromBufferAttribute(t,_+0),l.fromBufferAttribute(t,_+1),u.fromBufferAttribute(t,_+2),g.subVectors(u,l),m.subVectors(o,l),g.cross(m),s.setXYZ(_+0,g.x,g.y,g.z),s.setXYZ(_+1,g.x,g.y,g.z),s.setXYZ(_+2,g.x,g.y,g.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,s=e.count;t<s;t++)rn.fromBufferAttribute(e,t),rn.normalize(),e.setXYZ(t,rn.x,rn.y,rn.z)}toNonIndexed(){function e(d,f){const p=d.array,g=d.itemSize,m=d.normalized,_=new p.constructor(f.length*g);let S=0,E=0;for(let M=0,x=f.length;M<x;M++){d.isInterleavedBufferAttribute?S=f[M]*d.data.stride+d.offset:S=f[M]*g;for(let y=0;y<g;y++)_[E++]=p[S++]}return new Ti(_,g,m)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Lr,s=this.index.array,o=this.attributes;for(const d in o){const f=o[d],p=e(f,s);t.setAttribute(d,p)}const l=this.morphAttributes;for(const d in l){const f=[],p=l[d];for(let g=0,m=p.length;g<m;g++){const _=p[g],S=e(_,s);f.push(S)}t.morphAttributes[d]=f}t.morphTargetsRelative=this.morphTargetsRelative;const u=this.groups;for(let d=0,f=u.length;d<f;d++){const p=u[d];t.addGroup(p.start,p.count,p.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const f=this.parameters;for(const p in f)f[p]!==void 0&&(e[p]=f[p]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const s=this.attributes;for(const f in s){const p=s[f];e.data.attributes[f]=p.toJSON(e.data)}const o={};let l=!1;for(const f in this.morphAttributes){const p=this.morphAttributes[f],g=[];for(let m=0,_=p.length;m<_;m++){const S=p[m];g.push(S.toJSON(e.data))}g.length>0&&(o[f]=g,l=!0)}l&&(e.data.morphAttributes=o,e.data.morphTargetsRelative=this.morphTargetsRelative);const u=this.groups;u.length>0&&(e.data.groups=JSON.parse(JSON.stringify(u)));const d=this.boundingSphere;return d!==null&&(e.data.boundingSphere={center:d.center.toArray(),radius:d.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const s=e.index;s!==null&&this.setIndex(s.clone(t));const o=e.attributes;for(const p in o){const g=o[p];this.setAttribute(p,g.clone(t))}const l=e.morphAttributes;for(const p in l){const g=[],m=l[p];for(let _=0,S=m.length;_<S;_++)g.push(m[_].clone(t));this.morphAttributes[p]=g}this.morphTargetsRelative=e.morphTargetsRelative;const u=e.groups;for(let p=0,g=u.length;p<g;p++){const m=u[p];this.addGroup(m.start,m.count,m.materialIndex)}const d=e.boundingBox;d!==null&&(this.boundingBox=d.clone());const f=e.boundingSphere;return f!==null&&(this.boundingSphere=f.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Lm=new Kt,$r=new ky,Ll=new Gd,Pm=new ce,Gs=new ce,Vs=new ce,Ws=new ce,dd=new ce,Pl=new ce,Dl=new Et,Il=new Et,Nl=new Et,Dm=new ce,Im=new ce,Nm=new ce,Ul=new ce,Ol=new ce;class Xi extends un{constructor(e=new Lr,t=new Kg){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,s=Object.keys(t);if(s.length>0){const o=t[s[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,u=o.length;l<u;l++){const d=o[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=l}}}}getVertexPosition(e,t){const s=this.geometry,o=s.attributes.position,l=s.morphAttributes.position,u=s.morphTargetsRelative;t.fromBufferAttribute(o,e);const d=this.morphTargetInfluences;if(l&&d){Pl.set(0,0,0);for(let f=0,p=l.length;f<p;f++){const g=d[f],m=l[f];g!==0&&(dd.fromBufferAttribute(m,e),u?Pl.addScaledVector(dd,g):Pl.addScaledVector(dd.sub(t),g))}t.add(Pl)}return t}raycast(e,t){const s=this.geometry,o=this.material,l=this.matrixWorld;o!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),Ll.copy(s.boundingSphere),Ll.applyMatrix4(l),$r.copy(e.ray).recast(e.near),!(Ll.containsPoint($r.origin)===!1&&($r.intersectSphere(Ll,Pm)===null||$r.origin.distanceToSquared(Pm)>(e.far-e.near)**2))&&(Lm.copy(l).invert(),$r.copy(e.ray).applyMatrix4(Lm),!(s.boundingBox!==null&&$r.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(e,t,$r)))}_computeIntersections(e,t,s){let o;const l=this.geometry,u=this.material,d=l.index,f=l.attributes.position,p=l.attributes.uv,g=l.attributes.uv1,m=l.attributes.normal,_=l.groups,S=l.drawRange;if(d!==null)if(Array.isArray(u))for(let E=0,M=_.length;E<M;E++){const x=_[E],y=u[x.materialIndex],w=Math.max(x.start,S.start),R=Math.min(d.count,Math.min(x.start+x.count,S.start+S.count));for(let b=w,z=R;b<z;b+=3){const k=d.getX(b),N=d.getX(b+1),fe=d.getX(b+2);o=Fl(this,y,e,s,p,g,m,k,N,fe),o&&(o.faceIndex=Math.floor(b/3),o.face.materialIndex=x.materialIndex,t.push(o))}}else{const E=Math.max(0,S.start),M=Math.min(d.count,S.start+S.count);for(let x=E,y=M;x<y;x+=3){const w=d.getX(x),R=d.getX(x+1),b=d.getX(x+2);o=Fl(this,u,e,s,p,g,m,w,R,b),o&&(o.faceIndex=Math.floor(x/3),t.push(o))}}else if(f!==void 0)if(Array.isArray(u))for(let E=0,M=_.length;E<M;E++){const x=_[E],y=u[x.materialIndex],w=Math.max(x.start,S.start),R=Math.min(f.count,Math.min(x.start+x.count,S.start+S.count));for(let b=w,z=R;b<z;b+=3){const k=b,N=b+1,fe=b+2;o=Fl(this,y,e,s,p,g,m,k,N,fe),o&&(o.faceIndex=Math.floor(b/3),o.face.materialIndex=x.materialIndex,t.push(o))}}else{const E=Math.max(0,S.start),M=Math.min(f.count,S.start+S.count);for(let x=E,y=M;x<y;x+=3){const w=x,R=x+1,b=x+2;o=Fl(this,u,e,s,p,g,m,w,R,b),o&&(o.faceIndex=Math.floor(x/3),t.push(o))}}}}function qy(r,e,t,s,o,l,u,d){let f;if(e.side===zn?f=s.intersectTriangle(u,l,o,!0,d):f=s.intersectTriangle(o,l,u,e.side===Rr,d),f===null)return null;Ol.copy(d),Ol.applyMatrix4(r.matrixWorld);const p=t.ray.origin.distanceTo(Ol);return p<t.near||p>t.far?null:{distance:p,point:Ol.clone(),object:r}}function Fl(r,e,t,s,o,l,u,d,f,p){r.getVertexPosition(d,Gs),r.getVertexPosition(f,Vs),r.getVertexPosition(p,Ws);const g=qy(r,e,t,s,Gs,Vs,Ws,Ul);if(g){o&&(Dl.fromBufferAttribute(o,d),Il.fromBufferAttribute(o,f),Nl.fromBufferAttribute(o,p),g.uv=mi.getInterpolation(Ul,Gs,Vs,Ws,Dl,Il,Nl,new Et)),l&&(Dl.fromBufferAttribute(l,d),Il.fromBufferAttribute(l,f),Nl.fromBufferAttribute(l,p),g.uv1=mi.getInterpolation(Ul,Gs,Vs,Ws,Dl,Il,Nl,new Et),g.uv2=g.uv1),u&&(Dm.fromBufferAttribute(u,d),Im.fromBufferAttribute(u,f),Nm.fromBufferAttribute(u,p),g.normal=mi.getInterpolation(Ul,Gs,Vs,Ws,Dm,Im,Nm,new ce),g.normal.dot(s.direction)>0&&g.normal.multiplyScalar(-1));const m={a:d,b:f,c:p,normal:new ce,materialIndex:0};mi.getNormal(Gs,Vs,Ws,m.normal),g.face=m}return g}class ca extends Lr{constructor(e=1,t=1,s=1,o=1,l=1,u=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:s,widthSegments:o,heightSegments:l,depthSegments:u};const d=this;o=Math.floor(o),l=Math.floor(l),u=Math.floor(u);const f=[],p=[],g=[],m=[];let _=0,S=0;E("z","y","x",-1,-1,s,t,e,u,l,0),E("z","y","x",1,-1,s,t,-e,u,l,1),E("x","z","y",1,1,e,s,t,o,u,2),E("x","z","y",1,-1,e,s,-t,o,u,3),E("x","y","z",1,-1,e,t,s,o,l,4),E("x","y","z",-1,-1,e,t,-s,o,l,5),this.setIndex(f),this.setAttribute("position",new wi(p,3)),this.setAttribute("normal",new wi(g,3)),this.setAttribute("uv",new wi(m,2));function E(M,x,y,w,R,b,z,k,N,fe,C){const L=b/N,ie=z/fe,se=b/2,re=z/2,B=k/2,H=N+1,$=fe+1;let Z=0,U=0;const Y=new ce;for(let W=0;W<$;W++){const I=W*ie-re;for(let G=0;G<H;G++){const V=G*L-se;Y[M]=V*w,Y[x]=I*R,Y[y]=B,p.push(Y.x,Y.y,Y.z),Y[M]=0,Y[x]=0,Y[y]=k>0?1:-1,g.push(Y.x,Y.y,Y.z),m.push(G/N),m.push(1-W/fe),Z+=1}}for(let W=0;W<fe;W++)for(let I=0;I<N;I++){const G=_+I+H*W,V=_+I+H*(W+1),Q=_+(I+1)+H*(W+1),he=_+(I+1)+H*W;f.push(G,V,he),f.push(V,Q,he),U+=6}d.addGroup(S,U,C),S+=U,_+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ca(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ro(r){const e={};for(const t in r){e[t]={};for(const s in r[t]){const o=r[t][s];o&&(o.isColor||o.isMatrix3||o.isMatrix4||o.isVector2||o.isVector3||o.isVector4||o.isTexture||o.isQuaternion)?o.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][s]=null):e[t][s]=o.clone():Array.isArray(o)?e[t][s]=o.slice():e[t][s]=o}}return e}function Tn(r){const e={};for(let t=0;t<r.length;t++){const s=ro(r[t]);for(const o in s)e[o]=s[o]}return e}function $y(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Jg(r){return r.getRenderTarget()===null?r.outputColorSpace:Ct.workingColorSpace}const Ky={clone:ro,merge:Tn};var Zy=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Qy=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class as extends la{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Zy,this.fragmentShader=Qy,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ro(e.uniforms),this.uniformsGroups=$y(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const o in this.uniforms){const u=this.uniforms[o].value;u&&u.isTexture?t.uniforms[o]={type:"t",value:u.toJSON(e).uuid}:u&&u.isColor?t.uniforms[o]={type:"c",value:u.getHex()}:u&&u.isVector2?t.uniforms[o]={type:"v2",value:u.toArray()}:u&&u.isVector3?t.uniforms[o]={type:"v3",value:u.toArray()}:u&&u.isVector4?t.uniforms[o]={type:"v4",value:u.toArray()}:u&&u.isMatrix3?t.uniforms[o]={type:"m3",value:u.toArray()}:u&&u.isMatrix4?t.uniforms[o]={type:"m4",value:u.toArray()}:t.uniforms[o]={value:u}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const s={};for(const o in this.extensions)this.extensions[o]===!0&&(s[o]=!0);return Object.keys(s).length>0&&(t.extensions=s),t}}class e0 extends un{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Kt,this.projectionMatrix=new Kt,this.projectionMatrixInverse=new Kt,this.coordinateSystem=ji}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class ii extends e0{constructor(e=50,t=1,s=.1,o=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=o,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Dd*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(qu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Dd*2*Math.atan(Math.tan(qu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,s,o,l,u){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=s,this.view.offsetY=o,this.view.width=l,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(qu*.5*this.fov)/this.zoom,s=2*t,o=this.aspect*s,l=-.5*o;const u=this.view;if(this.view!==null&&this.view.enabled){const f=u.fullWidth,p=u.fullHeight;l+=u.offsetX*o/f,t-=u.offsetY*s/p,o*=u.width/f,s*=u.height/p}const d=this.filmOffset;d!==0&&(l+=e*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(l,l+o,t,t-s,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const js=-90,Xs=1;class Jy extends un{constructor(e,t,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const o=new ii(js,Xs,e,t);o.layers=this.layers,this.add(o);const l=new ii(js,Xs,e,t);l.layers=this.layers,this.add(l);const u=new ii(js,Xs,e,t);u.layers=this.layers,this.add(u);const d=new ii(js,Xs,e,t);d.layers=this.layers,this.add(d);const f=new ii(js,Xs,e,t);f.layers=this.layers,this.add(f);const p=new ii(js,Xs,e,t);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[s,o,l,u,d,f]=t;for(const p of t)this.remove(p);if(e===ji)s.up.set(0,1,0),s.lookAt(1,0,0),o.up.set(0,1,0),o.lookAt(-1,0,0),l.up.set(0,0,-1),l.lookAt(0,1,0),u.up.set(0,0,1),u.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),f.up.set(0,1,0),f.lookAt(0,0,-1);else if(e===Yl)s.up.set(0,-1,0),s.lookAt(-1,0,0),o.up.set(0,-1,0),o.lookAt(1,0,0),l.up.set(0,0,1),l.lookAt(0,1,0),u.up.set(0,0,-1),u.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),f.up.set(0,-1,0),f.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const p of t)this.add(p),p.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:o}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[l,u,d,f,p,g]=this.children,m=e.getRenderTarget(),_=e.getActiveCubeFace(),S=e.getActiveMipmapLevel(),E=e.xr.enabled;e.xr.enabled=!1;const M=s.texture.generateMipmaps;s.texture.generateMipmaps=!1,e.setRenderTarget(s,0,o),e.render(t,l),e.setRenderTarget(s,1,o),e.render(t,u),e.setRenderTarget(s,2,o),e.render(t,d),e.setRenderTarget(s,3,o),e.render(t,f),e.setRenderTarget(s,4,o),e.render(t,p),s.texture.generateMipmaps=M,e.setRenderTarget(s,5,o),e.render(t,g),e.setRenderTarget(m,_,S),e.xr.enabled=E,s.texture.needsPMREMUpdate=!0}}class t0 extends Hn{constructor(e,t,s,o,l,u,d,f,p,g){e=e!==void 0?e:[],t=t!==void 0?t:to,super(e,t,s,o,l,u,d,f,p,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class eS extends os{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const s={width:e,height:e,depth:1},o=[s,s,s,s,s,s];t.encoding!==void 0&&(Ko("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===ss?cn:ri),this.texture=new t0(o,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:An}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},o=new ca(5,5,5),l=new as({name:"CubemapFromEquirect",uniforms:ro(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:zn,blending:Tr});l.uniforms.tEquirect.value=t;const u=new Xi(o,l),d=t.minFilter;return t.minFilter===Ar&&(t.minFilter=An),new Jy(1,10,this).update(e,u),t.minFilter=d,u.geometry.dispose(),u.material.dispose(),this}clear(e,t,s,o){const l=e.getRenderTarget();for(let u=0;u<6;u++)e.setRenderTarget(this,u),e.clear(t,s,o);e.setRenderTarget(l)}}const fd=new ce,tS=new ce,nS=new vt;class Zr{constructor(e=new ce(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,s,o){return this.normal.set(e,t,s),this.constant=o,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,s){const o=fd.subVectors(s,t).cross(tS.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(o,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const s=e.delta(fd),o=this.normal.dot(s);if(o===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const l=-(e.start.dot(this.normal)+this.constant)/o;return l<0||l>1?null:t.copy(e.start).addScaledVector(s,l)}intersectsLine(e){const t=this.distanceToPoint(e.start),s=this.distanceToPoint(e.end);return t<0&&s>0||s<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const s=t||nS.getNormalMatrix(e),o=this.coplanarPoint(fd).applyMatrix4(e),l=this.normal.applyMatrix3(s).normalize();return this.constant=-o.dot(l),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Kr=new Gd,kl=new ce;class Vd{constructor(e=new Zr,t=new Zr,s=new Zr,o=new Zr,l=new Zr,u=new Zr){this.planes=[e,t,s,o,l,u]}set(e,t,s,o,l,u){const d=this.planes;return d[0].copy(e),d[1].copy(t),d[2].copy(s),d[3].copy(o),d[4].copy(l),d[5].copy(u),this}copy(e){const t=this.planes;for(let s=0;s<6;s++)t[s].copy(e.planes[s]);return this}setFromProjectionMatrix(e,t=ji){const s=this.planes,o=e.elements,l=o[0],u=o[1],d=o[2],f=o[3],p=o[4],g=o[5],m=o[6],_=o[7],S=o[8],E=o[9],M=o[10],x=o[11],y=o[12],w=o[13],R=o[14],b=o[15];if(s[0].setComponents(f-l,_-p,x-S,b-y).normalize(),s[1].setComponents(f+l,_+p,x+S,b+y).normalize(),s[2].setComponents(f+u,_+g,x+E,b+w).normalize(),s[3].setComponents(f-u,_-g,x-E,b-w).normalize(),s[4].setComponents(f-d,_-m,x-M,b-R).normalize(),t===ji)s[5].setComponents(f+d,_+m,x+M,b+R).normalize();else if(t===Yl)s[5].setComponents(d,m,M,R).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Kr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Kr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Kr)}intersectsSprite(e){return Kr.center.set(0,0,0),Kr.radius=.7071067811865476,Kr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Kr)}intersectsSphere(e){const t=this.planes,s=e.center,o=-e.radius;for(let l=0;l<6;l++)if(t[l].distanceToPoint(s)<o)return!1;return!0}intersectsBox(e){const t=this.planes;for(let s=0;s<6;s++){const o=t[s];if(kl.x=o.normal.x>0?e.max.x:e.min.x,kl.y=o.normal.y>0?e.max.y:e.min.y,kl.z=o.normal.z>0?e.max.z:e.min.z,o.distanceToPoint(kl)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let s=0;s<6;s++)if(t[s].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function n0(){let r=null,e=!1,t=null,s=null;function o(l,u){t(l,u),s=r.requestAnimationFrame(o)}return{start:function(){e!==!0&&t!==null&&(s=r.requestAnimationFrame(o),e=!0)},stop:function(){r.cancelAnimationFrame(s),e=!1},setAnimationLoop:function(l){t=l},setContext:function(l){r=l}}}function iS(r,e){const t=e.isWebGL2,s=new WeakMap;function o(p,g){const m=p.array,_=p.usage,S=m.byteLength,E=r.createBuffer();r.bindBuffer(g,E),r.bufferData(g,m,_),p.onUploadCallback();let M;if(m instanceof Float32Array)M=r.FLOAT;else if(m instanceof Uint16Array)if(p.isFloat16BufferAttribute)if(t)M=r.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else M=r.UNSIGNED_SHORT;else if(m instanceof Int16Array)M=r.SHORT;else if(m instanceof Uint32Array)M=r.UNSIGNED_INT;else if(m instanceof Int32Array)M=r.INT;else if(m instanceof Int8Array)M=r.BYTE;else if(m instanceof Uint8Array)M=r.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)M=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:E,type:M,bytesPerElement:m.BYTES_PER_ELEMENT,version:p.version,size:S}}function l(p,g,m){const _=g.array,S=g._updateRange,E=g.updateRanges;if(r.bindBuffer(m,p),S.count===-1&&E.length===0&&r.bufferSubData(m,0,_),E.length!==0){for(let M=0,x=E.length;M<x;M++){const y=E[M];t?r.bufferSubData(m,y.start*_.BYTES_PER_ELEMENT,_,y.start,y.count):r.bufferSubData(m,y.start*_.BYTES_PER_ELEMENT,_.subarray(y.start,y.start+y.count))}g.clearUpdateRanges()}S.count!==-1&&(t?r.bufferSubData(m,S.offset*_.BYTES_PER_ELEMENT,_,S.offset,S.count):r.bufferSubData(m,S.offset*_.BYTES_PER_ELEMENT,_.subarray(S.offset,S.offset+S.count)),S.count=-1),g.onUploadCallback()}function u(p){return p.isInterleavedBufferAttribute&&(p=p.data),s.get(p)}function d(p){p.isInterleavedBufferAttribute&&(p=p.data);const g=s.get(p);g&&(r.deleteBuffer(g.buffer),s.delete(p))}function f(p,g){if(p.isGLBufferAttribute){const _=s.get(p);(!_||_.version<p.version)&&s.set(p,{buffer:p.buffer,type:p.type,bytesPerElement:p.elementSize,version:p.version});return}p.isInterleavedBufferAttribute&&(p=p.data);const m=s.get(p);if(m===void 0)s.set(p,o(p,g));else if(m.version<p.version){if(m.size!==p.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");l(m.buffer,p,g),m.version=p.version}}return{get:u,remove:d,update:f}}class Wd extends Lr{constructor(e=1,t=1,s=1,o=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:s,heightSegments:o};const l=e/2,u=t/2,d=Math.floor(s),f=Math.floor(o),p=d+1,g=f+1,m=e/d,_=t/f,S=[],E=[],M=[],x=[];for(let y=0;y<g;y++){const w=y*_-u;for(let R=0;R<p;R++){const b=R*m-l;E.push(b,-w,0),M.push(0,0,1),x.push(R/d),x.push(1-y/f)}}for(let y=0;y<f;y++)for(let w=0;w<d;w++){const R=w+p*y,b=w+p*(y+1),z=w+1+p*(y+1),k=w+1+p*y;S.push(R,b,k),S.push(b,z,k)}this.setIndex(S),this.setAttribute("position",new wi(E,3)),this.setAttribute("normal",new wi(M,3)),this.setAttribute("uv",new wi(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wd(e.width,e.height,e.widthSegments,e.heightSegments)}}var rS=`#ifdef USE_ALPHAHASH
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
#endif`,cS=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,uS=`#ifdef USE_AOMAP
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
} // validated`,RS=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,bS=`vec3 transformedNormal = objectNormal;
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
#endif`,cM=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,uM=`#ifdef USE_LOGDEPTHBUF
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
#endif`,RM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,bM=`#ifdef USE_CLEARCOATMAP
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
}`,cE=`#include <common>
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
}`,uE=`#if DEPTH_PACKING == 3200
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
}`,RE=`#define STANDARD
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
}`,bE=`#define TOON
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
}`,ht={alphahash_fragment:rS,alphahash_pars_fragment:sS,alphamap_fragment:oS,alphamap_pars_fragment:aS,alphatest_fragment:lS,alphatest_pars_fragment:cS,aomap_fragment:uS,aomap_pars_fragment:dS,batching_pars_vertex:fS,batching_vertex:hS,begin_vertex:pS,beginnormal_vertex:mS,bsdfs:gS,iridescence_fragment:vS,bumpmap_pars_fragment:_S,clipping_planes_fragment:xS,clipping_planes_pars_fragment:yS,clipping_planes_pars_vertex:SS,clipping_planes_vertex:MS,color_fragment:ES,color_pars_fragment:TS,color_pars_vertex:wS,color_vertex:AS,common:CS,cube_uv_reflection_fragment:RS,defaultnormal_vertex:bS,displacementmap_pars_vertex:LS,displacementmap_vertex:PS,emissivemap_fragment:DS,emissivemap_pars_fragment:IS,colorspace_fragment:NS,colorspace_pars_fragment:US,envmap_fragment:OS,envmap_common_pars_fragment:FS,envmap_pars_fragment:kS,envmap_pars_vertex:BS,envmap_physical_pars_fragment:ZS,envmap_vertex:zS,fog_vertex:HS,fog_pars_vertex:GS,fog_fragment:VS,fog_pars_fragment:WS,gradientmap_pars_fragment:jS,lightmap_fragment:XS,lightmap_pars_fragment:YS,lights_lambert_fragment:qS,lights_lambert_pars_fragment:$S,lights_pars_begin:KS,lights_toon_fragment:QS,lights_toon_pars_fragment:JS,lights_phong_fragment:eM,lights_phong_pars_fragment:tM,lights_physical_fragment:nM,lights_physical_pars_fragment:iM,lights_fragment_begin:rM,lights_fragment_maps:sM,lights_fragment_end:oM,logdepthbuf_fragment:aM,logdepthbuf_pars_fragment:lM,logdepthbuf_pars_vertex:cM,logdepthbuf_vertex:uM,map_fragment:dM,map_pars_fragment:fM,map_particle_fragment:hM,map_particle_pars_fragment:pM,metalnessmap_fragment:mM,metalnessmap_pars_fragment:gM,morphcolor_vertex:vM,morphnormal_vertex:_M,morphtarget_pars_vertex:xM,morphtarget_vertex:yM,normal_fragment_begin:SM,normal_fragment_maps:MM,normal_pars_fragment:EM,normal_pars_vertex:TM,normal_vertex:wM,normalmap_pars_fragment:AM,clearcoat_normal_fragment_begin:CM,clearcoat_normal_fragment_maps:RM,clearcoat_pars_fragment:bM,iridescence_pars_fragment:LM,opaque_fragment:PM,packing:DM,premultiplied_alpha_fragment:IM,project_vertex:NM,dithering_fragment:UM,dithering_pars_fragment:OM,roughnessmap_fragment:FM,roughnessmap_pars_fragment:kM,shadowmap_pars_fragment:BM,shadowmap_pars_vertex:zM,shadowmap_vertex:HM,shadowmask_pars_fragment:GM,skinbase_vertex:VM,skinning_pars_vertex:WM,skinning_vertex:jM,skinnormal_vertex:XM,specularmap_fragment:YM,specularmap_pars_fragment:qM,tonemapping_fragment:$M,tonemapping_pars_fragment:KM,transmission_fragment:ZM,transmission_pars_fragment:QM,uv_pars_fragment:JM,uv_pars_vertex:eE,uv_vertex:tE,worldpos_vertex:nE,background_vert:iE,background_frag:rE,backgroundCube_vert:sE,backgroundCube_frag:oE,cube_vert:aE,cube_frag:lE,depth_vert:cE,depth_frag:uE,distanceRGBA_vert:dE,distanceRGBA_frag:fE,equirect_vert:hE,equirect_frag:pE,linedashed_vert:mE,linedashed_frag:gE,meshbasic_vert:vE,meshbasic_frag:_E,meshlambert_vert:xE,meshlambert_frag:yE,meshmatcap_vert:SE,meshmatcap_frag:ME,meshnormal_vert:EE,meshnormal_frag:TE,meshphong_vert:wE,meshphong_frag:AE,meshphysical_vert:CE,meshphysical_frag:RE,meshtoon_vert:bE,meshtoon_frag:LE,points_vert:PE,points_frag:DE,shadow_vert:IE,shadow_frag:NE,sprite_vert:UE,sprite_frag:OE},De={common:{diffuse:{value:new Mt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new vt},alphaMap:{value:null},alphaMapTransform:{value:new vt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new vt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new vt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new vt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new vt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new vt},normalScale:{value:new Et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new vt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new vt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new vt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new vt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Mt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Mt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new vt},alphaTest:{value:0},uvTransform:{value:new vt}},sprite:{diffuse:{value:new Mt(16777215)},opacity:{value:1},center:{value:new Et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new vt},alphaMap:{value:null},alphaMapTransform:{value:new vt},alphaTest:{value:0}}},Ei={basic:{uniforms:Tn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.fog]),vertexShader:ht.meshbasic_vert,fragmentShader:ht.meshbasic_frag},lambert:{uniforms:Tn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new Mt(0)}}]),vertexShader:ht.meshlambert_vert,fragmentShader:ht.meshlambert_frag},phong:{uniforms:Tn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new Mt(0)},specular:{value:new Mt(1118481)},shininess:{value:30}}]),vertexShader:ht.meshphong_vert,fragmentShader:ht.meshphong_frag},standard:{uniforms:Tn([De.common,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.roughnessmap,De.metalnessmap,De.fog,De.lights,{emissive:{value:new Mt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag},toon:{uniforms:Tn([De.common,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.gradientmap,De.fog,De.lights,{emissive:{value:new Mt(0)}}]),vertexShader:ht.meshtoon_vert,fragmentShader:ht.meshtoon_frag},matcap:{uniforms:Tn([De.common,De.bumpmap,De.normalmap,De.displacementmap,De.fog,{matcap:{value:null}}]),vertexShader:ht.meshmatcap_vert,fragmentShader:ht.meshmatcap_frag},points:{uniforms:Tn([De.points,De.fog]),vertexShader:ht.points_vert,fragmentShader:ht.points_frag},dashed:{uniforms:Tn([De.common,De.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ht.linedashed_vert,fragmentShader:ht.linedashed_frag},depth:{uniforms:Tn([De.common,De.displacementmap]),vertexShader:ht.depth_vert,fragmentShader:ht.depth_frag},normal:{uniforms:Tn([De.common,De.bumpmap,De.normalmap,De.displacementmap,{opacity:{value:1}}]),vertexShader:ht.meshnormal_vert,fragmentShader:ht.meshnormal_frag},sprite:{uniforms:Tn([De.sprite,De.fog]),vertexShader:ht.sprite_vert,fragmentShader:ht.sprite_frag},background:{uniforms:{uvTransform:{value:new vt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ht.background_vert,fragmentShader:ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:ht.backgroundCube_vert,fragmentShader:ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ht.cube_vert,fragmentShader:ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ht.equirect_vert,fragmentShader:ht.equirect_frag},distanceRGBA:{uniforms:Tn([De.common,De.displacementmap,{referencePosition:{value:new ce},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ht.distanceRGBA_vert,fragmentShader:ht.distanceRGBA_frag},shadow:{uniforms:Tn([De.lights,De.fog,{color:{value:new Mt(0)},opacity:{value:1}}]),vertexShader:ht.shadow_vert,fragmentShader:ht.shadow_frag}};Ei.physical={uniforms:Tn([Ei.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new vt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new vt},clearcoatNormalScale:{value:new Et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new vt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new vt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new vt},sheen:{value:0},sheenColor:{value:new Mt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new vt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new vt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new vt},transmissionSamplerSize:{value:new Et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new vt},attenuationDistance:{value:0},attenuationColor:{value:new Mt(0)},specularColor:{value:new Mt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new vt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new vt},anisotropyVector:{value:new Et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new vt}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag};const Bl={r:0,b:0,g:0};function FE(r,e,t,s,o,l,u){const d=new Mt(0);let f=l===!0?0:1,p,g,m=null,_=0,S=null;function E(x,y){let w=!1,R=y.isScene===!0?y.background:null;R&&R.isTexture&&(R=(y.backgroundBlurriness>0?t:e).get(R)),R===null?M(d,f):R&&R.isColor&&(M(R,1),w=!0);const b=r.xr.getEnvironmentBlendMode();b==="additive"?s.buffers.color.setClear(0,0,0,1,u):b==="alpha-blend"&&s.buffers.color.setClear(0,0,0,0,u),(r.autoClear||w)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),R&&(R.isCubeTexture||R.mapping===Zl)?(g===void 0&&(g=new Xi(new ca(1,1,1),new as({name:"BackgroundCubeMaterial",uniforms:ro(Ei.backgroundCube.uniforms),vertexShader:Ei.backgroundCube.vertexShader,fragmentShader:Ei.backgroundCube.fragmentShader,side:zn,depthTest:!1,depthWrite:!1,fog:!1})),g.geometry.deleteAttribute("normal"),g.geometry.deleteAttribute("uv"),g.onBeforeRender=function(z,k,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(g.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),o.update(g)),g.material.uniforms.envMap.value=R,g.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,g.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,g.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,g.material.toneMapped=Ct.getTransfer(R.colorSpace)!==It,(m!==R||_!==R.version||S!==r.toneMapping)&&(g.material.needsUpdate=!0,m=R,_=R.version,S=r.toneMapping),g.layers.enableAll(),x.unshift(g,g.geometry,g.material,0,0,null)):R&&R.isTexture&&(p===void 0&&(p=new Xi(new Wd(2,2),new as({name:"BackgroundMaterial",uniforms:ro(Ei.background.uniforms),vertexShader:Ei.background.vertexShader,fragmentShader:Ei.background.fragmentShader,side:Rr,depthTest:!1,depthWrite:!1,fog:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),o.update(p)),p.material.uniforms.t2D.value=R,p.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,p.material.toneMapped=Ct.getTransfer(R.colorSpace)!==It,R.matrixAutoUpdate===!0&&R.updateMatrix(),p.material.uniforms.uvTransform.value.copy(R.matrix),(m!==R||_!==R.version||S!==r.toneMapping)&&(p.material.needsUpdate=!0,m=R,_=R.version,S=r.toneMapping),p.layers.enableAll(),x.unshift(p,p.geometry,p.material,0,0,null))}function M(x,y){x.getRGB(Bl,Jg(r)),s.buffers.color.setClear(Bl.r,Bl.g,Bl.b,y,u)}return{getClearColor:function(){return d},setClearColor:function(x,y=1){d.set(x),f=y,M(d,f)},getClearAlpha:function(){return f},setClearAlpha:function(x){f=x,M(d,f)},render:E}}function kE(r,e,t,s){const o=r.getParameter(r.MAX_VERTEX_ATTRIBS),l=s.isWebGL2?null:e.get("OES_vertex_array_object"),u=s.isWebGL2||l!==null,d={},f=x(null);let p=f,g=!1;function m(B,H,$,Z,U){let Y=!1;if(u){const W=M(Z,$,H);p!==W&&(p=W,S(p.object)),Y=y(B,Z,$,U),Y&&w(B,Z,$,U)}else{const W=H.wireframe===!0;(p.geometry!==Z.id||p.program!==$.id||p.wireframe!==W)&&(p.geometry=Z.id,p.program=$.id,p.wireframe=W,Y=!0)}U!==null&&t.update(U,r.ELEMENT_ARRAY_BUFFER),(Y||g)&&(g=!1,fe(B,H,$,Z),U!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(U).buffer))}function _(){return s.isWebGL2?r.createVertexArray():l.createVertexArrayOES()}function S(B){return s.isWebGL2?r.bindVertexArray(B):l.bindVertexArrayOES(B)}function E(B){return s.isWebGL2?r.deleteVertexArray(B):l.deleteVertexArrayOES(B)}function M(B,H,$){const Z=$.wireframe===!0;let U=d[B.id];U===void 0&&(U={},d[B.id]=U);let Y=U[H.id];Y===void 0&&(Y={},U[H.id]=Y);let W=Y[Z];return W===void 0&&(W=x(_()),Y[Z]=W),W}function x(B){const H=[],$=[],Z=[];for(let U=0;U<o;U++)H[U]=0,$[U]=0,Z[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:$,attributeDivisors:Z,object:B,attributes:{},index:null}}function y(B,H,$,Z){const U=p.attributes,Y=H.attributes;let W=0;const I=$.getAttributes();for(const G in I)if(I[G].location>=0){const Q=U[G];let he=Y[G];if(he===void 0&&(G==="instanceMatrix"&&B.instanceMatrix&&(he=B.instanceMatrix),G==="instanceColor"&&B.instanceColor&&(he=B.instanceColor)),Q===void 0||Q.attribute!==he||he&&Q.data!==he.data)return!0;W++}return p.attributesNum!==W||p.index!==Z}function w(B,H,$,Z){const U={},Y=H.attributes;let W=0;const I=$.getAttributes();for(const G in I)if(I[G].location>=0){let Q=Y[G];Q===void 0&&(G==="instanceMatrix"&&B.instanceMatrix&&(Q=B.instanceMatrix),G==="instanceColor"&&B.instanceColor&&(Q=B.instanceColor));const he={};he.attribute=Q,Q&&Q.data&&(he.data=Q.data),U[G]=he,W++}p.attributes=U,p.attributesNum=W,p.index=Z}function R(){const B=p.newAttributes;for(let H=0,$=B.length;H<$;H++)B[H]=0}function b(B){z(B,0)}function z(B,H){const $=p.newAttributes,Z=p.enabledAttributes,U=p.attributeDivisors;$[B]=1,Z[B]===0&&(r.enableVertexAttribArray(B),Z[B]=1),U[B]!==H&&((s.isWebGL2?r:e.get("ANGLE_instanced_arrays"))[s.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](B,H),U[B]=H)}function k(){const B=p.newAttributes,H=p.enabledAttributes;for(let $=0,Z=H.length;$<Z;$++)H[$]!==B[$]&&(r.disableVertexAttribArray($),H[$]=0)}function N(B,H,$,Z,U,Y,W){W===!0?r.vertexAttribIPointer(B,H,$,U,Y):r.vertexAttribPointer(B,H,$,Z,U,Y)}function fe(B,H,$,Z){if(s.isWebGL2===!1&&(B.isInstancedMesh||Z.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;R();const U=Z.attributes,Y=$.getAttributes(),W=H.defaultAttributeValues;for(const I in Y){const G=Y[I];if(G.location>=0){let V=U[I];if(V===void 0&&(I==="instanceMatrix"&&B.instanceMatrix&&(V=B.instanceMatrix),I==="instanceColor"&&B.instanceColor&&(V=B.instanceColor)),V!==void 0){const Q=V.normalized,he=V.itemSize,_e=t.get(V);if(_e===void 0)continue;const Me=_e.buffer,Te=_e.type,pe=_e.bytesPerElement,de=s.isWebGL2===!0&&(Te===r.INT||Te===r.UNSIGNED_INT||V.gpuType===Ng);if(V.isInterleavedBufferAttribute){const Ie=V.data,K=Ie.stride,Je=V.offset;if(Ie.isInstancedInterleavedBuffer){for(let Fe=0;Fe<G.locationSize;Fe++)z(G.location+Fe,Ie.meshPerAttribute);B.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=Ie.meshPerAttribute*Ie.count)}else for(let Fe=0;Fe<G.locationSize;Fe++)b(G.location+Fe);r.bindBuffer(r.ARRAY_BUFFER,Me);for(let Fe=0;Fe<G.locationSize;Fe++)N(G.location+Fe,he/G.locationSize,Te,Q,K*pe,(Je+he/G.locationSize*Fe)*pe,de)}else{if(V.isInstancedBufferAttribute){for(let Ie=0;Ie<G.locationSize;Ie++)z(G.location+Ie,V.meshPerAttribute);B.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let Ie=0;Ie<G.locationSize;Ie++)b(G.location+Ie);r.bindBuffer(r.ARRAY_BUFFER,Me);for(let Ie=0;Ie<G.locationSize;Ie++)N(G.location+Ie,he/G.locationSize,Te,Q,he*pe,he/G.locationSize*Ie*pe,de)}}else if(W!==void 0){const Q=W[I];if(Q!==void 0)switch(Q.length){case 2:r.vertexAttrib2fv(G.location,Q);break;case 3:r.vertexAttrib3fv(G.location,Q);break;case 4:r.vertexAttrib4fv(G.location,Q);break;default:r.vertexAttrib1fv(G.location,Q)}}}}k()}function C(){se();for(const B in d){const H=d[B];for(const $ in H){const Z=H[$];for(const U in Z)E(Z[U].object),delete Z[U];delete H[$]}delete d[B]}}function L(B){if(d[B.id]===void 0)return;const H=d[B.id];for(const $ in H){const Z=H[$];for(const U in Z)E(Z[U].object),delete Z[U];delete H[$]}delete d[B.id]}function ie(B){for(const H in d){const $=d[H];if($[B.id]===void 0)continue;const Z=$[B.id];for(const U in Z)E(Z[U].object),delete Z[U];delete $[B.id]}}function se(){re(),g=!0,p!==f&&(p=f,S(p.object))}function re(){f.geometry=null,f.program=null,f.wireframe=!1}return{setup:m,reset:se,resetDefaultState:re,dispose:C,releaseStatesOfGeometry:L,releaseStatesOfProgram:ie,initAttributes:R,enableAttribute:b,disableUnusedAttributes:k}}function BE(r,e,t,s){const o=s.isWebGL2;let l;function u(g){l=g}function d(g,m){r.drawArrays(l,g,m),t.update(m,l,1)}function f(g,m,_){if(_===0)return;let S,E;if(o)S=r,E="drawArraysInstanced";else if(S=e.get("ANGLE_instanced_arrays"),E="drawArraysInstancedANGLE",S===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}S[E](l,g,m,_),t.update(m,l,_)}function p(g,m,_){if(_===0)return;const S=e.get("WEBGL_multi_draw");if(S===null)for(let E=0;E<_;E++)this.render(g[E],m[E]);else{S.multiDrawArraysWEBGL(l,g,0,m,0,_);let E=0;for(let M=0;M<_;M++)E+=m[M];t.update(E,l,1)}}this.setMode=u,this.render=d,this.renderInstances=f,this.renderMultiDraw=p}function zE(r,e,t){let s;function o(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const N=e.get("EXT_texture_filter_anisotropic");s=r.getParameter(N.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function l(N){if(N==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";N="mediump"}return N==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const u=typeof WebGL2RenderingContext<"u"&&r.constructor.name==="WebGL2RenderingContext";let d=t.precision!==void 0?t.precision:"highp";const f=l(d);f!==d&&(console.warn("THREE.WebGLRenderer:",d,"not supported, using",f,"instead."),d=f);const p=u||e.has("WEBGL_draw_buffers"),g=t.logarithmicDepthBuffer===!0,m=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=r.getParameter(r.MAX_TEXTURE_SIZE),E=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),M=r.getParameter(r.MAX_VERTEX_ATTRIBS),x=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),y=r.getParameter(r.MAX_VARYING_VECTORS),w=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),R=_>0,b=u||e.has("OES_texture_float"),z=R&&b,k=u?r.getParameter(r.MAX_SAMPLES):0;return{isWebGL2:u,drawBuffers:p,getMaxAnisotropy:o,getMaxPrecision:l,precision:d,logarithmicDepthBuffer:g,maxTextures:m,maxVertexTextures:_,maxTextureSize:S,maxCubemapSize:E,maxAttributes:M,maxVertexUniforms:x,maxVaryings:y,maxFragmentUniforms:w,vertexTextures:R,floatFragmentTextures:b,floatVertexTextures:z,maxSamples:k}}function HE(r){const e=this;let t=null,s=0,o=!1,l=!1;const u=new Zr,d=new vt,f={value:null,needsUpdate:!1};this.uniform=f,this.numPlanes=0,this.numIntersection=0,this.init=function(m,_){const S=m.length!==0||_||s!==0||o;return o=_,s=m.length,S},this.beginShadows=function(){l=!0,g(null)},this.endShadows=function(){l=!1},this.setGlobalState=function(m,_){t=g(m,_,0)},this.setState=function(m,_,S){const E=m.clippingPlanes,M=m.clipIntersection,x=m.clipShadows,y=r.get(m);if(!o||E===null||E.length===0||l&&!x)l?g(null):p();else{const w=l?0:s,R=w*4;let b=y.clippingState||null;f.value=b,b=g(E,_,R,S);for(let z=0;z!==R;++z)b[z]=t[z];y.clippingState=b,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=w}};function p(){f.value!==t&&(f.value=t,f.needsUpdate=s>0),e.numPlanes=s,e.numIntersection=0}function g(m,_,S,E){const M=m!==null?m.length:0;let x=null;if(M!==0){if(x=f.value,E!==!0||x===null){const y=S+M*4,w=_.matrixWorldInverse;d.getNormalMatrix(w),(x===null||x.length<y)&&(x=new Float32Array(y));for(let R=0,b=S;R!==M;++R,b+=4)u.copy(m[R]).applyMatrix4(w,d),u.normal.toArray(x,b),x[b+3]=u.constant}f.value=x,f.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,x}}function GE(r){let e=new WeakMap;function t(u,d){return d===Rd?u.mapping=to:d===bd&&(u.mapping=no),u}function s(u){if(u&&u.isTexture){const d=u.mapping;if(d===Rd||d===bd)if(e.has(u)){const f=e.get(u).texture;return t(f,u.mapping)}else{const f=u.image;if(f&&f.height>0){const p=new eS(f.height/2);return p.fromEquirectangularTexture(r,u),e.set(u,p),u.addEventListener("dispose",o),t(p.texture,u.mapping)}else return null}}return u}function o(u){const d=u.target;d.removeEventListener("dispose",o);const f=e.get(d);f!==void 0&&(e.delete(d),f.dispose())}function l(){e=new WeakMap}return{get:s,dispose:l}}class i0 extends e0{constructor(e=-1,t=1,s=1,o=-1,l=.1,u=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=s,this.bottom=o,this.near=l,this.far=u,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,s,o,l,u){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=s,this.view.offsetY=o,this.view.width=l,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,o=(this.top+this.bottom)/2;let l=s-e,u=s+e,d=o+t,f=o-t;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;l+=p*this.view.offsetX,u=l+p*this.view.width,d-=g*this.view.offsetY,f=d-g*this.view.height}this.projectionMatrix.makeOrthographic(l,u,d,f,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const $s=4,Um=[.125,.215,.35,.446,.526,.582],es=20,hd=new i0,Om=new Mt;let pd=null,md=0,gd=0;const Qr=(1+Math.sqrt(5))/2,Ys=1/Qr,Fm=[new ce(1,1,1),new ce(-1,1,1),new ce(1,1,-1),new ce(-1,1,-1),new ce(0,Qr,Ys),new ce(0,Qr,-Ys),new ce(Ys,0,Qr),new ce(-Ys,0,Qr),new ce(Qr,Ys,0),new ce(-Qr,Ys,0)];class km{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,s=.1,o=100){pd=this._renderer.getRenderTarget(),md=this._renderer.getActiveCubeFace(),gd=this._renderer.getActiveMipmapLevel(),this._setSize(256);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,s,o,l),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Hm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=zm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(pd,md,gd),e.scissorTest=!1,zl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===to||e.mapping===no?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),pd=this._renderer.getRenderTarget(),md=this._renderer.getActiveCubeFace(),gd=this._renderer.getActiveMipmapLevel();const s=t||this._allocateTargets();return this._textureToCubeUV(e,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,s={magFilter:An,minFilter:An,generateMipmaps:!1,type:ta,format:gi,colorSpace:Yi,depthBuffer:!1},o=Bm(e,t,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Bm(e,t,s);const{_lodMax:l}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=VE(l)),this._blurMaterial=WE(l,e,t)}return o}_compileMaterial(e){const t=new Xi(this._lodPlanes[0],e);this._renderer.compile(t,hd)}_sceneToCubeUV(e,t,s,o){const d=new ii(90,1,t,s),f=[1,-1,1,1,1,1],p=[1,1,1,-1,-1,-1],g=this._renderer,m=g.autoClear,_=g.toneMapping;g.getClearColor(Om),g.toneMapping=wr,g.autoClear=!1;const S=new Kg({name:"PMREM.Background",side:zn,depthWrite:!1,depthTest:!1}),E=new Xi(new ca,S);let M=!1;const x=e.background;x?x.isColor&&(S.color.copy(x),e.background=null,M=!0):(S.color.copy(Om),M=!0);for(let y=0;y<6;y++){const w=y%3;w===0?(d.up.set(0,f[y],0),d.lookAt(p[y],0,0)):w===1?(d.up.set(0,0,f[y]),d.lookAt(0,p[y],0)):(d.up.set(0,f[y],0),d.lookAt(0,0,p[y]));const R=this._cubeSize;zl(o,w*R,y>2?R:0,R,R),g.setRenderTarget(o),M&&g.render(E,d),g.render(e,d)}E.geometry.dispose(),E.material.dispose(),g.toneMapping=_,g.autoClear=m,e.background=x}_textureToCubeUV(e,t){const s=this._renderer,o=e.mapping===to||e.mapping===no;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=Hm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=zm());const l=o?this._cubemapMaterial:this._equirectMaterial,u=new Xi(this._lodPlanes[0],l),d=l.uniforms;d.envMap.value=e;const f=this._cubeSize;zl(t,0,0,3*f,2*f),s.setRenderTarget(t),s.render(u,hd)}_applyPMREM(e){const t=this._renderer,s=t.autoClear;t.autoClear=!1;for(let o=1;o<this._lodPlanes.length;o++){const l=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),u=Fm[(o-1)%Fm.length];this._blur(e,o-1,o,l,u)}t.autoClear=s}_blur(e,t,s,o,l){const u=this._pingPongRenderTarget;this._halfBlur(e,u,t,s,o,"latitudinal",l),this._halfBlur(u,e,s,s,o,"longitudinal",l)}_halfBlur(e,t,s,o,l,u,d){const f=this._renderer,p=this._blurMaterial;u!=="latitudinal"&&u!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const g=3,m=new Xi(this._lodPlanes[o],p),_=p.uniforms,S=this._sizeLods[s]-1,E=isFinite(l)?Math.PI/(2*S):2*Math.PI/(2*es-1),M=l/E,x=isFinite(l)?1+Math.floor(g*M):es;x>es&&console.warn(`sigmaRadians, ${l}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${es}`);const y=[];let w=0;for(let N=0;N<es;++N){const fe=N/M,C=Math.exp(-fe*fe/2);y.push(C),N===0?w+=C:N<x&&(w+=2*C)}for(let N=0;N<y.length;N++)y[N]=y[N]/w;_.envMap.value=e.texture,_.samples.value=x,_.weights.value=y,_.latitudinal.value=u==="latitudinal",d&&(_.poleAxis.value=d);const{_lodMax:R}=this;_.dTheta.value=E,_.mipInt.value=R-s;const b=this._sizeLods[o],z=3*b*(o>R-$s?o-R+$s:0),k=4*(this._cubeSize-b);zl(t,z,k,3*b,2*b),f.setRenderTarget(t),f.render(m,hd)}}function VE(r){const e=[],t=[],s=[];let o=r;const l=r-$s+1+Um.length;for(let u=0;u<l;u++){const d=Math.pow(2,o);t.push(d);let f=1/d;u>r-$s?f=Um[u-r+$s-1]:u===0&&(f=0),s.push(f);const p=1/(d-2),g=-p,m=1+p,_=[g,g,m,g,m,m,g,g,m,m,g,m],S=6,E=6,M=3,x=2,y=1,w=new Float32Array(M*E*S),R=new Float32Array(x*E*S),b=new Float32Array(y*E*S);for(let k=0;k<S;k++){const N=k%3*2/3-1,fe=k>2?0:-1,C=[N,fe,0,N+2/3,fe,0,N+2/3,fe+1,0,N,fe,0,N+2/3,fe+1,0,N,fe+1,0];w.set(C,M*E*k),R.set(_,x*E*k);const L=[k,k,k,k,k,k];b.set(L,y*E*k)}const z=new Lr;z.setAttribute("position",new Ti(w,M)),z.setAttribute("uv",new Ti(R,x)),z.setAttribute("faceIndex",new Ti(b,y)),e.push(z),o>$s&&o--}return{lodPlanes:e,sizeLods:t,sigmas:s}}function Bm(r,e,t){const s=new os(r,e,t);return s.texture.mapping=Zl,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function zl(r,e,t,s,o){r.viewport.set(e,t,s,o),r.scissor.set(e,t,s,o)}function WE(r,e,t){const s=new Float32Array(es),o=new ce(0,1,0);return new as({name:"SphericalGaussianBlur",defines:{n:es,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:o}},vertexShader:jd(),fragmentShader:`

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
		`,blending:Tr,depthTest:!1,depthWrite:!1})}function zm(){return new as({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:jd(),fragmentShader:`

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
		`,blending:Tr,depthTest:!1,depthWrite:!1})}function Hm(){return new as({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:jd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Tr,depthTest:!1,depthWrite:!1})}function jd(){return`

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
	`}function jE(r){let e=new WeakMap,t=null;function s(d){if(d&&d.isTexture){const f=d.mapping,p=f===Rd||f===bd,g=f===to||f===no;if(p||g)if(d.isRenderTargetTexture&&d.needsPMREMUpdate===!0){d.needsPMREMUpdate=!1;let m=e.get(d);return t===null&&(t=new km(r)),m=p?t.fromEquirectangular(d,m):t.fromCubemap(d,m),e.set(d,m),m.texture}else{if(e.has(d))return e.get(d).texture;{const m=d.image;if(p&&m&&m.height>0||g&&m&&o(m)){t===null&&(t=new km(r));const _=p?t.fromEquirectangular(d):t.fromCubemap(d);return e.set(d,_),d.addEventListener("dispose",l),_.texture}else return null}}}return d}function o(d){let f=0;const p=6;for(let g=0;g<p;g++)d[g]!==void 0&&f++;return f===p}function l(d){const f=d.target;f.removeEventListener("dispose",l);const p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function u(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:s,dispose:u}}function XE(r){const e={};function t(s){if(e[s]!==void 0)return e[s];let o;switch(s){case"WEBGL_depth_texture":o=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":o=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":o=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":o=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:o=r.getExtension(s)}return e[s]=o,o}return{has:function(s){return t(s)!==null},init:function(s){s.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(s){const o=t(s);return o===null&&console.warn("THREE.WebGLRenderer: "+s+" extension not supported."),o}}}function YE(r,e,t,s){const o={},l=new WeakMap;function u(m){const _=m.target;_.index!==null&&e.remove(_.index);for(const E in _.attributes)e.remove(_.attributes[E]);for(const E in _.morphAttributes){const M=_.morphAttributes[E];for(let x=0,y=M.length;x<y;x++)e.remove(M[x])}_.removeEventListener("dispose",u),delete o[_.id];const S=l.get(_);S&&(e.remove(S),l.delete(_)),s.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,t.memory.geometries--}function d(m,_){return o[_.id]===!0||(_.addEventListener("dispose",u),o[_.id]=!0,t.memory.geometries++),_}function f(m){const _=m.attributes;for(const E in _)e.update(_[E],r.ARRAY_BUFFER);const S=m.morphAttributes;for(const E in S){const M=S[E];for(let x=0,y=M.length;x<y;x++)e.update(M[x],r.ARRAY_BUFFER)}}function p(m){const _=[],S=m.index,E=m.attributes.position;let M=0;if(S!==null){const w=S.array;M=S.version;for(let R=0,b=w.length;R<b;R+=3){const z=w[R+0],k=w[R+1],N=w[R+2];_.push(z,k,k,N,N,z)}}else if(E!==void 0){const w=E.array;M=E.version;for(let R=0,b=w.length/3-1;R<b;R+=3){const z=R+0,k=R+1,N=R+2;_.push(z,k,k,N,N,z)}}else return;const x=new(Wg(_)?Qg:Zg)(_,1);x.version=M;const y=l.get(m);y&&e.remove(y),l.set(m,x)}function g(m){const _=l.get(m);if(_){const S=m.index;S!==null&&_.version<S.version&&p(m)}else p(m);return l.get(m)}return{get:d,update:f,getWireframeAttribute:g}}function qE(r,e,t,s){const o=s.isWebGL2;let l;function u(S){l=S}let d,f;function p(S){d=S.type,f=S.bytesPerElement}function g(S,E){r.drawElements(l,E,d,S*f),t.update(E,l,1)}function m(S,E,M){if(M===0)return;let x,y;if(o)x=r,y="drawElementsInstanced";else if(x=e.get("ANGLE_instanced_arrays"),y="drawElementsInstancedANGLE",x===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}x[y](l,E,d,S*f,M),t.update(E,l,M)}function _(S,E,M){if(M===0)return;const x=e.get("WEBGL_multi_draw");if(x===null)for(let y=0;y<M;y++)this.render(S[y]/f,E[y]);else{x.multiDrawElementsWEBGL(l,E,0,d,S,0,M);let y=0;for(let w=0;w<M;w++)y+=E[w];t.update(y,l,1)}}this.setMode=u,this.setIndex=p,this.render=g,this.renderInstances=m,this.renderMultiDraw=_}function $E(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function s(l,u,d){switch(t.calls++,u){case r.TRIANGLES:t.triangles+=d*(l/3);break;case r.LINES:t.lines+=d*(l/2);break;case r.LINE_STRIP:t.lines+=d*(l-1);break;case r.LINE_LOOP:t.lines+=d*l;break;case r.POINTS:t.points+=d*l;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",u);break}}function o(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:o,update:s}}function KE(r,e){return r[0]-e[0]}function ZE(r,e){return Math.abs(e[1])-Math.abs(r[1])}function QE(r,e,t){const s={},o=new Float32Array(8),l=new WeakMap,u=new sn,d=[];for(let p=0;p<8;p++)d[p]=[p,0];function f(p,g,m){const _=p.morphTargetInfluences;if(e.isWebGL2===!0){const E=g.morphAttributes.position||g.morphAttributes.normal||g.morphAttributes.color,M=E!==void 0?E.length:0;let x=l.get(g);if(x===void 0||x.count!==M){let H=function(){re.dispose(),l.delete(g),g.removeEventListener("dispose",H)};var S=H;x!==void 0&&x.texture.dispose();const R=g.morphAttributes.position!==void 0,b=g.morphAttributes.normal!==void 0,z=g.morphAttributes.color!==void 0,k=g.morphAttributes.position||[],N=g.morphAttributes.normal||[],fe=g.morphAttributes.color||[];let C=0;R===!0&&(C=1),b===!0&&(C=2),z===!0&&(C=3);let L=g.attributes.position.count*C,ie=1;L>e.maxTextureSize&&(ie=Math.ceil(L/e.maxTextureSize),L=e.maxTextureSize);const se=new Float32Array(L*ie*4*M),re=new Yg(se,L,ie,M);re.type=Er,re.needsUpdate=!0;const B=C*4;for(let $=0;$<M;$++){const Z=k[$],U=N[$],Y=fe[$],W=L*ie*4*$;for(let I=0;I<Z.count;I++){const G=I*B;R===!0&&(u.fromBufferAttribute(Z,I),se[W+G+0]=u.x,se[W+G+1]=u.y,se[W+G+2]=u.z,se[W+G+3]=0),b===!0&&(u.fromBufferAttribute(U,I),se[W+G+4]=u.x,se[W+G+5]=u.y,se[W+G+6]=u.z,se[W+G+7]=0),z===!0&&(u.fromBufferAttribute(Y,I),se[W+G+8]=u.x,se[W+G+9]=u.y,se[W+G+10]=u.z,se[W+G+11]=Y.itemSize===4?u.w:1)}}x={count:M,texture:re,size:new Et(L,ie)},l.set(g,x),g.addEventListener("dispose",H)}let y=0;for(let R=0;R<_.length;R++)y+=_[R];const w=g.morphTargetsRelative?1:1-y;m.getUniforms().setValue(r,"morphTargetBaseInfluence",w),m.getUniforms().setValue(r,"morphTargetInfluences",_),m.getUniforms().setValue(r,"morphTargetsTexture",x.texture,t),m.getUniforms().setValue(r,"morphTargetsTextureSize",x.size)}else{const E=_===void 0?0:_.length;let M=s[g.id];if(M===void 0||M.length!==E){M=[];for(let b=0;b<E;b++)M[b]=[b,0];s[g.id]=M}for(let b=0;b<E;b++){const z=M[b];z[0]=b,z[1]=_[b]}M.sort(ZE);for(let b=0;b<8;b++)b<E&&M[b][1]?(d[b][0]=M[b][0],d[b][1]=M[b][1]):(d[b][0]=Number.MAX_SAFE_INTEGER,d[b][1]=0);d.sort(KE);const x=g.morphAttributes.position,y=g.morphAttributes.normal;let w=0;for(let b=0;b<8;b++){const z=d[b],k=z[0],N=z[1];k!==Number.MAX_SAFE_INTEGER&&N?(x&&g.getAttribute("morphTarget"+b)!==x[k]&&g.setAttribute("morphTarget"+b,x[k]),y&&g.getAttribute("morphNormal"+b)!==y[k]&&g.setAttribute("morphNormal"+b,y[k]),o[b]=N,w+=N):(x&&g.hasAttribute("morphTarget"+b)===!0&&g.deleteAttribute("morphTarget"+b),y&&g.hasAttribute("morphNormal"+b)===!0&&g.deleteAttribute("morphNormal"+b),o[b]=0)}const R=g.morphTargetsRelative?1:1-w;m.getUniforms().setValue(r,"morphTargetBaseInfluence",R),m.getUniforms().setValue(r,"morphTargetInfluences",o)}}return{update:f}}function JE(r,e,t,s){let o=new WeakMap;function l(f){const p=s.render.frame,g=f.geometry,m=e.get(f,g);if(o.get(m)!==p&&(e.update(m),o.set(m,p)),f.isInstancedMesh&&(f.hasEventListener("dispose",d)===!1&&f.addEventListener("dispose",d),o.get(f)!==p&&(t.update(f.instanceMatrix,r.ARRAY_BUFFER),f.instanceColor!==null&&t.update(f.instanceColor,r.ARRAY_BUFFER),o.set(f,p))),f.isSkinnedMesh){const _=f.skeleton;o.get(_)!==p&&(_.update(),o.set(_,p))}return m}function u(){o=new WeakMap}function d(f){const p=f.target;p.removeEventListener("dispose",d),t.remove(p.instanceMatrix),p.instanceColor!==null&&t.remove(p.instanceColor)}return{update:l,dispose:u}}class r0 extends Hn{constructor(e,t,s,o,l,u,d,f,p,g){if(g=g!==void 0?g:rs,g!==rs&&g!==io)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");s===void 0&&g===rs&&(s=Mr),s===void 0&&g===io&&(s=is),super(null,o,l,u,d,f,g,s,p),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=d!==void 0?d:wn,this.minFilter=f!==void 0?f:wn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const s0=new Hn,o0=new r0(1,1);o0.compareFunction=Vg;const a0=new Yg,l0=new Oy,c0=new t0,Gm=[],Vm=[],Wm=new Float32Array(16),jm=new Float32Array(9),Xm=new Float32Array(4);function lo(r,e,t){const s=r[0];if(s<=0||s>0)return r;const o=e*t;let l=Gm[o];if(l===void 0&&(l=new Float32Array(o),Gm[o]=l),e!==0){s.toArray(l,0);for(let u=1,d=0;u!==e;++u)d+=t,r[u].toArray(l,d)}return l}function Zt(r,e){if(r.length!==e.length)return!1;for(let t=0,s=r.length;t<s;t++)if(r[t]!==e[t])return!1;return!0}function Qt(r,e){for(let t=0,s=e.length;t<s;t++)r[t]=e[t]}function ec(r,e){let t=Vm[e];t===void 0&&(t=new Int32Array(e),Vm[e]=t);for(let s=0;s!==e;++s)t[s]=r.allocateTextureUnit();return t}function e1(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function t1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Zt(t,e))return;r.uniform2fv(this.addr,e),Qt(t,e)}}function n1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Zt(t,e))return;r.uniform3fv(this.addr,e),Qt(t,e)}}function i1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Zt(t,e))return;r.uniform4fv(this.addr,e),Qt(t,e)}}function r1(r,e){const t=this.cache,s=e.elements;if(s===void 0){if(Zt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Qt(t,e)}else{if(Zt(t,s))return;Xm.set(s),r.uniformMatrix2fv(this.addr,!1,Xm),Qt(t,s)}}function s1(r,e){const t=this.cache,s=e.elements;if(s===void 0){if(Zt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Qt(t,e)}else{if(Zt(t,s))return;jm.set(s),r.uniformMatrix3fv(this.addr,!1,jm),Qt(t,s)}}function o1(r,e){const t=this.cache,s=e.elements;if(s===void 0){if(Zt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Qt(t,e)}else{if(Zt(t,s))return;Wm.set(s),r.uniformMatrix4fv(this.addr,!1,Wm),Qt(t,s)}}function a1(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function l1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Zt(t,e))return;r.uniform2iv(this.addr,e),Qt(t,e)}}function c1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Zt(t,e))return;r.uniform3iv(this.addr,e),Qt(t,e)}}function u1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Zt(t,e))return;r.uniform4iv(this.addr,e),Qt(t,e)}}function d1(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function f1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Zt(t,e))return;r.uniform2uiv(this.addr,e),Qt(t,e)}}function h1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Zt(t,e))return;r.uniform3uiv(this.addr,e),Qt(t,e)}}function p1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Zt(t,e))return;r.uniform4uiv(this.addr,e),Qt(t,e)}}function m1(r,e,t){const s=this.cache,o=t.allocateTextureUnit();s[0]!==o&&(r.uniform1i(this.addr,o),s[0]=o);const l=this.type===r.SAMPLER_2D_SHADOW?o0:s0;t.setTexture2D(e||l,o)}function g1(r,e,t){const s=this.cache,o=t.allocateTextureUnit();s[0]!==o&&(r.uniform1i(this.addr,o),s[0]=o),t.setTexture3D(e||l0,o)}function v1(r,e,t){const s=this.cache,o=t.allocateTextureUnit();s[0]!==o&&(r.uniform1i(this.addr,o),s[0]=o),t.setTextureCube(e||c0,o)}function _1(r,e,t){const s=this.cache,o=t.allocateTextureUnit();s[0]!==o&&(r.uniform1i(this.addr,o),s[0]=o),t.setTexture2DArray(e||a0,o)}function x1(r){switch(r){case 5126:return e1;case 35664:return t1;case 35665:return n1;case 35666:return i1;case 35674:return r1;case 35675:return s1;case 35676:return o1;case 5124:case 35670:return a1;case 35667:case 35671:return l1;case 35668:case 35672:return c1;case 35669:case 35673:return u1;case 5125:return d1;case 36294:return f1;case 36295:return h1;case 36296:return p1;case 35678:case 36198:case 36298:case 36306:case 35682:return m1;case 35679:case 36299:case 36307:return g1;case 35680:case 36300:case 36308:case 36293:return v1;case 36289:case 36303:case 36311:case 36292:return _1}}function y1(r,e){r.uniform1fv(this.addr,e)}function S1(r,e){const t=lo(e,this.size,2);r.uniform2fv(this.addr,t)}function M1(r,e){const t=lo(e,this.size,3);r.uniform3fv(this.addr,t)}function E1(r,e){const t=lo(e,this.size,4);r.uniform4fv(this.addr,t)}function T1(r,e){const t=lo(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function w1(r,e){const t=lo(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function A1(r,e){const t=lo(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function C1(r,e){r.uniform1iv(this.addr,e)}function R1(r,e){r.uniform2iv(this.addr,e)}function b1(r,e){r.uniform3iv(this.addr,e)}function L1(r,e){r.uniform4iv(this.addr,e)}function P1(r,e){r.uniform1uiv(this.addr,e)}function D1(r,e){r.uniform2uiv(this.addr,e)}function I1(r,e){r.uniform3uiv(this.addr,e)}function N1(r,e){r.uniform4uiv(this.addr,e)}function U1(r,e,t){const s=this.cache,o=e.length,l=ec(t,o);Zt(s,l)||(r.uniform1iv(this.addr,l),Qt(s,l));for(let u=0;u!==o;++u)t.setTexture2D(e[u]||s0,l[u])}function O1(r,e,t){const s=this.cache,o=e.length,l=ec(t,o);Zt(s,l)||(r.uniform1iv(this.addr,l),Qt(s,l));for(let u=0;u!==o;++u)t.setTexture3D(e[u]||l0,l[u])}function F1(r,e,t){const s=this.cache,o=e.length,l=ec(t,o);Zt(s,l)||(r.uniform1iv(this.addr,l),Qt(s,l));for(let u=0;u!==o;++u)t.setTextureCube(e[u]||c0,l[u])}function k1(r,e,t){const s=this.cache,o=e.length,l=ec(t,o);Zt(s,l)||(r.uniform1iv(this.addr,l),Qt(s,l));for(let u=0;u!==o;++u)t.setTexture2DArray(e[u]||a0,l[u])}function B1(r){switch(r){case 5126:return y1;case 35664:return S1;case 35665:return M1;case 35666:return E1;case 35674:return T1;case 35675:return w1;case 35676:return A1;case 5124:case 35670:return C1;case 35667:case 35671:return R1;case 35668:case 35672:return b1;case 35669:case 35673:return L1;case 5125:return P1;case 36294:return D1;case 36295:return I1;case 36296:return N1;case 35678:case 36198:case 36298:case 36306:case 35682:return U1;case 35679:case 36299:case 36307:return O1;case 35680:case 36300:case 36308:case 36293:return F1;case 36289:case 36303:case 36311:case 36292:return k1}}class z1{constructor(e,t,s){this.id=e,this.addr=s,this.cache=[],this.type=t.type,this.setValue=x1(t.type)}}class H1{constructor(e,t,s){this.id=e,this.addr=s,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=B1(t.type)}}class G1{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,s){const o=this.seq;for(let l=0,u=o.length;l!==u;++l){const d=o[l];d.setValue(e,t[d.id],s)}}}const vd=/(\w+)(\])?(\[|\.)?/g;function Ym(r,e){r.seq.push(e),r.map[e.id]=e}function V1(r,e,t){const s=r.name,o=s.length;for(vd.lastIndex=0;;){const l=vd.exec(s),u=vd.lastIndex;let d=l[1];const f=l[2]==="]",p=l[3];if(f&&(d=d|0),p===void 0||p==="["&&u+2===o){Ym(t,p===void 0?new z1(d,r,e):new H1(d,r,e));break}else{let m=t.map[d];m===void 0&&(m=new G1(d),Ym(t,m)),t=m}}}class Gl{constructor(e,t){this.seq=[],this.map={};const s=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<s;++o){const l=e.getActiveUniform(t,o),u=e.getUniformLocation(t,l.name);V1(l,u,this)}}setValue(e,t,s,o){const l=this.map[t];l!==void 0&&l.setValue(e,s,o)}setOptional(e,t,s){const o=t[s];o!==void 0&&this.setValue(e,s,o)}static upload(e,t,s,o){for(let l=0,u=t.length;l!==u;++l){const d=t[l],f=s[d.id];f.needsUpdate!==!1&&d.setValue(e,f.value,o)}}static seqWithValue(e,t){const s=[];for(let o=0,l=e.length;o!==l;++o){const u=e[o];u.id in t&&s.push(u)}return s}}function qm(r,e,t){const s=r.createShader(e);return r.shaderSource(s,t),r.compileShader(s),s}const W1=37297;let j1=0;function X1(r,e){const t=r.split(`
`),s=[],o=Math.max(e-6,0),l=Math.min(e+6,t.length);for(let u=o;u<l;u++){const d=u+1;s.push(`${d===e?">":" "} ${d}: ${t[u]}`)}return s.join(`
`)}function Y1(r){const e=Ct.getPrimaries(Ct.workingColorSpace),t=Ct.getPrimaries(r);let s;switch(e===t?s="":e===Xl&&t===jl?s="LinearDisplayP3ToLinearSRGB":e===jl&&t===Xl&&(s="LinearSRGBToLinearDisplayP3"),r){case Yi:case Ql:return[s,"LinearTransferOETF"];case cn:case Hd:return[s,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[s,"LinearTransferOETF"]}}function $m(r,e,t){const s=r.getShaderParameter(e,r.COMPILE_STATUS),o=r.getShaderInfoLog(e).trim();if(s&&o==="")return"";const l=/ERROR: 0:(\d+)/.exec(o);if(l){const u=parseInt(l[1]);return t.toUpperCase()+`

`+o+`

`+X1(r.getShaderSource(e),u)}else return o}function q1(r,e){const t=Y1(e);return`vec4 ${r}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function $1(r,e){let t;switch(e){case sy:t="Linear";break;case oy:t="Reinhard";break;case ay:t="OptimizedCineon";break;case ly:t="ACESFilmic";break;case uy:t="AgX";break;case cy:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function K1(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.normalMapTangentSpace||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ks).join(`
`)}function Z1(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ks).join(`
`)}function Q1(r){const e=[];for(const t in r){const s=r[t];s!==!1&&e.push("#define "+t+" "+s)}return e.join(`
`)}function J1(r,e){const t={},s=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let o=0;o<s;o++){const l=r.getActiveAttrib(e,o),u=l.name;let d=1;l.type===r.FLOAT_MAT2&&(d=2),l.type===r.FLOAT_MAT3&&(d=3),l.type===r.FLOAT_MAT4&&(d=4),t[u]={type:l.type,location:r.getAttribLocation(e,u),locationSize:d}}return t}function Ks(r){return r!==""}function Km(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Zm(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const eT=/^[ \t]*#include +<([\w\d./]+)>/gm;function Nd(r){return r.replace(eT,nT)}const tT=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function nT(r,e){let t=ht[e];if(t===void 0){const s=tT.get(e);if(s!==void 0)t=ht[s],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,s);else throw new Error("Can not resolve #include <"+e+">")}return Nd(t)}const iT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qm(r){return r.replace(iT,rT)}function rT(r,e,t,s){let o="";for(let l=parseInt(e);l<parseInt(t);l++)o+=s.replace(/\[\s*i\s*\]/g,"[ "+l+" ]").replace(/UNROLLED_LOOP_INDEX/g,l);return o}function Jm(r){let e="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function sT(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Pg?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Ix?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Gi&&(e="SHADOWMAP_TYPE_VSM"),e}function oT(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case to:case no:e="ENVMAP_TYPE_CUBE";break;case Zl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function aT(r){let e="ENVMAP_MODE_REFLECTION";return r.envMap&&r.envMapMode===no&&(e="ENVMAP_MODE_REFRACTION"),e}function lT(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Dg:e="ENVMAP_BLENDING_MULTIPLY";break;case iy:e="ENVMAP_BLENDING_MIX";break;case ry:e="ENVMAP_BLENDING_ADD";break}return e}function cT(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,s=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:s,maxMip:t}}function uT(r,e,t,s){const o=r.getContext(),l=t.defines;let u=t.vertexShader,d=t.fragmentShader;const f=sT(t),p=oT(t),g=aT(t),m=lT(t),_=cT(t),S=t.isWebGL2?"":K1(t),E=Z1(t),M=Q1(l),x=o.createProgram();let y,w,R=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(y=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(Ks).join(`
`),y.length>0&&(y+=`
`),w=[S,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(Ks).join(`
`),w.length>0&&(w+=`
`)):(y=[Jm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+g:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+f:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ks).join(`
`),w=[S,Jm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+p:"",t.envMap?"#define "+g:"",t.envMap?"#define "+m:"",_?"#define CUBEUV_TEXEL_WIDTH "+_.texelWidth:"",_?"#define CUBEUV_TEXEL_HEIGHT "+_.texelHeight:"",_?"#define CUBEUV_MAX_MIP "+_.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+f:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==wr?"#define TONE_MAPPING":"",t.toneMapping!==wr?ht.tonemapping_pars_fragment:"",t.toneMapping!==wr?$1("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ht.colorspace_pars_fragment,q1("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ks).join(`
`)),u=Nd(u),u=Km(u,t),u=Zm(u,t),d=Nd(d),d=Km(d,t),d=Zm(d,t),u=Qm(u),d=Qm(d),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(R=`#version 300 es
`,y=[E,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,w=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===vm?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===vm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+w);const b=R+y+u,z=R+w+d,k=qm(o,o.VERTEX_SHADER,b),N=qm(o,o.FRAGMENT_SHADER,z);o.attachShader(x,k),o.attachShader(x,N),t.index0AttributeName!==void 0?o.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&o.bindAttribLocation(x,0,"position"),o.linkProgram(x);function fe(se){if(r.debug.checkShaderErrors){const re=o.getProgramInfoLog(x).trim(),B=o.getShaderInfoLog(k).trim(),H=o.getShaderInfoLog(N).trim();let $=!0,Z=!0;if(o.getProgramParameter(x,o.LINK_STATUS)===!1)if($=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(o,x,k,N);else{const U=$m(o,k,"vertex"),Y=$m(o,N,"fragment");console.error("THREE.WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(x,o.VALIDATE_STATUS)+`

Program Info Log: `+re+`
`+U+`
`+Y)}else re!==""?console.warn("THREE.WebGLProgram: Program Info Log:",re):(B===""||H==="")&&(Z=!1);Z&&(se.diagnostics={runnable:$,programLog:re,vertexShader:{log:B,prefix:y},fragmentShader:{log:H,prefix:w}})}o.deleteShader(k),o.deleteShader(N),C=new Gl(o,x),L=J1(o,x)}let C;this.getUniforms=function(){return C===void 0&&fe(this),C};let L;this.getAttributes=function(){return L===void 0&&fe(this),L};let ie=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return ie===!1&&(ie=o.getProgramParameter(x,W1)),ie},this.destroy=function(){s.releaseStatesOfProgram(this),o.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=j1++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=k,this.fragmentShader=N,this}let dT=0;class fT{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,s=e.fragmentShader,o=this._getShaderStage(t),l=this._getShaderStage(s),u=this._getShaderCacheForMaterial(e);return u.has(o)===!1&&(u.add(o),o.usedTimes++),u.has(l)===!1&&(u.add(l),l.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const s of t)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let s=t.get(e);return s===void 0&&(s=new Set,t.set(e,s)),s}_getShaderStage(e){const t=this.shaderCache;let s=t.get(e);return s===void 0&&(s=new hT(e),t.set(e,s)),s}}class hT{constructor(e){this.id=dT++,this.code=e,this.usedTimes=0}}function pT(r,e,t,s,o,l,u){const d=new qg,f=new fT,p=[],g=o.isWebGL2,m=o.logarithmicDepthBuffer,_=o.vertexTextures;let S=o.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(C){return C===0?"uv":`uv${C}`}function x(C,L,ie,se,re){const B=se.fog,H=re.geometry,$=C.isMeshStandardMaterial?se.environment:null,Z=(C.isMeshStandardMaterial?t:e).get(C.envMap||$),U=Z&&Z.mapping===Zl?Z.image.height:null,Y=E[C.type];C.precision!==null&&(S=o.getMaxPrecision(C.precision),S!==C.precision&&console.warn("THREE.WebGLProgram.getParameters:",C.precision,"not supported, using",S,"instead."));const W=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,I=W!==void 0?W.length:0;let G=0;H.morphAttributes.position!==void 0&&(G=1),H.morphAttributes.normal!==void 0&&(G=2),H.morphAttributes.color!==void 0&&(G=3);let V,Q,he,_e;if(Y){const Jt=Ei[Y];V=Jt.vertexShader,Q=Jt.fragmentShader}else V=C.vertexShader,Q=C.fragmentShader,f.update(C),he=f.getVertexShaderID(C),_e=f.getFragmentShaderID(C);const Me=r.getRenderTarget(),Te=re.isInstancedMesh===!0,pe=re.isBatchedMesh===!0,de=!!C.map,Ie=!!C.matcap,K=!!Z,Je=!!C.aoMap,Fe=!!C.lightMap,Ve=!!C.bumpMap,Re=!!C.normalMap,rt=!!C.displacementMap,Be=!!C.emissiveMap,P=!!C.metalnessMap,A=!!C.roughnessMap,te=C.anisotropy>0,xe=C.clearcoat>0,me=C.iridescence>0,ve=C.sheen>0,Le=C.transmission>0,Ae=te&&!!C.anisotropyMap,ze=xe&&!!C.clearcoatMap,$e=xe&&!!C.clearcoatNormalMap,at=xe&&!!C.clearcoatRoughnessMap,Se=me&&!!C.iridescenceMap,pt=me&&!!C.iridescenceThicknessMap,dt=ve&&!!C.sheenColorMap,it=ve&&!!C.sheenRoughnessMap,qe=!!C.specularMap,Ge=!!C.specularColorMap,tt=!!C.specularIntensityMap,mt=Le&&!!C.transmissionMap,Rt=Le&&!!C.thicknessMap,ct=!!C.gradientMap,be=!!C.alphaMap,X=C.alphaTest>0,Pe=!!C.alphaHash,Ne=!!C.extensions,nt=!!H.attributes.uv1,Ke=!!H.attributes.uv2,Tt=!!H.attributes.uv3;let wt=wr;return C.toneMapped&&(Me===null||Me.isXRRenderTarget===!0)&&(wt=r.toneMapping),{isWebGL2:g,shaderID:Y,shaderType:C.type,shaderName:C.name,vertexShader:V,fragmentShader:Q,defines:C.defines,customVertexShaderID:he,customFragmentShaderID:_e,isRawShaderMaterial:C.isRawShaderMaterial===!0,glslVersion:C.glslVersion,precision:S,batching:pe,instancing:Te,instancingColor:Te&&re.instanceColor!==null,supportsVertexTextures:_,outputColorSpace:Me===null?r.outputColorSpace:Me.isXRRenderTarget===!0?Me.texture.colorSpace:Yi,map:de,matcap:Ie,envMap:K,envMapMode:K&&Z.mapping,envMapCubeUVHeight:U,aoMap:Je,lightMap:Fe,bumpMap:Ve,normalMap:Re,displacementMap:_&&rt,emissiveMap:Be,normalMapObjectSpace:Re&&C.normalMapType===My,normalMapTangentSpace:Re&&C.normalMapType===Gg,metalnessMap:P,roughnessMap:A,anisotropy:te,anisotropyMap:Ae,clearcoat:xe,clearcoatMap:ze,clearcoatNormalMap:$e,clearcoatRoughnessMap:at,iridescence:me,iridescenceMap:Se,iridescenceThicknessMap:pt,sheen:ve,sheenColorMap:dt,sheenRoughnessMap:it,specularMap:qe,specularColorMap:Ge,specularIntensityMap:tt,transmission:Le,transmissionMap:mt,thicknessMap:Rt,gradientMap:ct,opaque:C.transparent===!1&&C.blending===Zs,alphaMap:be,alphaTest:X,alphaHash:Pe,combine:C.combine,mapUv:de&&M(C.map.channel),aoMapUv:Je&&M(C.aoMap.channel),lightMapUv:Fe&&M(C.lightMap.channel),bumpMapUv:Ve&&M(C.bumpMap.channel),normalMapUv:Re&&M(C.normalMap.channel),displacementMapUv:rt&&M(C.displacementMap.channel),emissiveMapUv:Be&&M(C.emissiveMap.channel),metalnessMapUv:P&&M(C.metalnessMap.channel),roughnessMapUv:A&&M(C.roughnessMap.channel),anisotropyMapUv:Ae&&M(C.anisotropyMap.channel),clearcoatMapUv:ze&&M(C.clearcoatMap.channel),clearcoatNormalMapUv:$e&&M(C.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:at&&M(C.clearcoatRoughnessMap.channel),iridescenceMapUv:Se&&M(C.iridescenceMap.channel),iridescenceThicknessMapUv:pt&&M(C.iridescenceThicknessMap.channel),sheenColorMapUv:dt&&M(C.sheenColorMap.channel),sheenRoughnessMapUv:it&&M(C.sheenRoughnessMap.channel),specularMapUv:qe&&M(C.specularMap.channel),specularColorMapUv:Ge&&M(C.specularColorMap.channel),specularIntensityMapUv:tt&&M(C.specularIntensityMap.channel),transmissionMapUv:mt&&M(C.transmissionMap.channel),thicknessMapUv:Rt&&M(C.thicknessMap.channel),alphaMapUv:be&&M(C.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(Re||te),vertexColors:C.vertexColors,vertexAlphas:C.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,vertexUv1s:nt,vertexUv2s:Ke,vertexUv3s:Tt,pointsUvs:re.isPoints===!0&&!!H.attributes.uv&&(de||be),fog:!!B,useFog:C.fog===!0,fogExp2:B&&B.isFogExp2,flatShading:C.flatShading===!0,sizeAttenuation:C.sizeAttenuation===!0,logarithmicDepthBuffer:m,skinning:re.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:I,morphTextureStride:G,numDirLights:L.directional.length,numPointLights:L.point.length,numSpotLights:L.spot.length,numSpotLightMaps:L.spotLightMap.length,numRectAreaLights:L.rectArea.length,numHemiLights:L.hemi.length,numDirLightShadows:L.directionalShadowMap.length,numPointLightShadows:L.pointShadowMap.length,numSpotLightShadows:L.spotShadowMap.length,numSpotLightShadowsWithMaps:L.numSpotLightShadowsWithMaps,numLightProbes:L.numLightProbes,numClippingPlanes:u.numPlanes,numClipIntersection:u.numIntersection,dithering:C.dithering,shadowMapEnabled:r.shadowMap.enabled&&ie.length>0,shadowMapType:r.shadowMap.type,toneMapping:wt,useLegacyLights:r._useLegacyLights,decodeVideoTexture:de&&C.map.isVideoTexture===!0&&Ct.getTransfer(C.map.colorSpace)===It,premultipliedAlpha:C.premultipliedAlpha,doubleSided:C.side===Vi,flipSided:C.side===zn,useDepthPacking:C.depthPacking>=0,depthPacking:C.depthPacking||0,index0AttributeName:C.index0AttributeName,extensionDerivatives:Ne&&C.extensions.derivatives===!0,extensionFragDepth:Ne&&C.extensions.fragDepth===!0,extensionDrawBuffers:Ne&&C.extensions.drawBuffers===!0,extensionShaderTextureLOD:Ne&&C.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Ne&&C.extensions.clipCullDistance&&s.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:g||s.has("EXT_frag_depth"),rendererExtensionDrawBuffers:g||s.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:g||s.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:s.has("KHR_parallel_shader_compile"),customProgramCacheKey:C.customProgramCacheKey()}}function y(C){const L=[];if(C.shaderID?L.push(C.shaderID):(L.push(C.customVertexShaderID),L.push(C.customFragmentShaderID)),C.defines!==void 0)for(const ie in C.defines)L.push(ie),L.push(C.defines[ie]);return C.isRawShaderMaterial===!1&&(w(L,C),R(L,C),L.push(r.outputColorSpace)),L.push(C.customProgramCacheKey),L.join()}function w(C,L){C.push(L.precision),C.push(L.outputColorSpace),C.push(L.envMapMode),C.push(L.envMapCubeUVHeight),C.push(L.mapUv),C.push(L.alphaMapUv),C.push(L.lightMapUv),C.push(L.aoMapUv),C.push(L.bumpMapUv),C.push(L.normalMapUv),C.push(L.displacementMapUv),C.push(L.emissiveMapUv),C.push(L.metalnessMapUv),C.push(L.roughnessMapUv),C.push(L.anisotropyMapUv),C.push(L.clearcoatMapUv),C.push(L.clearcoatNormalMapUv),C.push(L.clearcoatRoughnessMapUv),C.push(L.iridescenceMapUv),C.push(L.iridescenceThicknessMapUv),C.push(L.sheenColorMapUv),C.push(L.sheenRoughnessMapUv),C.push(L.specularMapUv),C.push(L.specularColorMapUv),C.push(L.specularIntensityMapUv),C.push(L.transmissionMapUv),C.push(L.thicknessMapUv),C.push(L.combine),C.push(L.fogExp2),C.push(L.sizeAttenuation),C.push(L.morphTargetsCount),C.push(L.morphAttributeCount),C.push(L.numDirLights),C.push(L.numPointLights),C.push(L.numSpotLights),C.push(L.numSpotLightMaps),C.push(L.numHemiLights),C.push(L.numRectAreaLights),C.push(L.numDirLightShadows),C.push(L.numPointLightShadows),C.push(L.numSpotLightShadows),C.push(L.numSpotLightShadowsWithMaps),C.push(L.numLightProbes),C.push(L.shadowMapType),C.push(L.toneMapping),C.push(L.numClippingPlanes),C.push(L.numClipIntersection),C.push(L.depthPacking)}function R(C,L){d.disableAll(),L.isWebGL2&&d.enable(0),L.supportsVertexTextures&&d.enable(1),L.instancing&&d.enable(2),L.instancingColor&&d.enable(3),L.matcap&&d.enable(4),L.envMap&&d.enable(5),L.normalMapObjectSpace&&d.enable(6),L.normalMapTangentSpace&&d.enable(7),L.clearcoat&&d.enable(8),L.iridescence&&d.enable(9),L.alphaTest&&d.enable(10),L.vertexColors&&d.enable(11),L.vertexAlphas&&d.enable(12),L.vertexUv1s&&d.enable(13),L.vertexUv2s&&d.enable(14),L.vertexUv3s&&d.enable(15),L.vertexTangents&&d.enable(16),L.anisotropy&&d.enable(17),L.alphaHash&&d.enable(18),L.batching&&d.enable(19),C.push(d.mask),d.disableAll(),L.fog&&d.enable(0),L.useFog&&d.enable(1),L.flatShading&&d.enable(2),L.logarithmicDepthBuffer&&d.enable(3),L.skinning&&d.enable(4),L.morphTargets&&d.enable(5),L.morphNormals&&d.enable(6),L.morphColors&&d.enable(7),L.premultipliedAlpha&&d.enable(8),L.shadowMapEnabled&&d.enable(9),L.useLegacyLights&&d.enable(10),L.doubleSided&&d.enable(11),L.flipSided&&d.enable(12),L.useDepthPacking&&d.enable(13),L.dithering&&d.enable(14),L.transmission&&d.enable(15),L.sheen&&d.enable(16),L.opaque&&d.enable(17),L.pointsUvs&&d.enable(18),L.decodeVideoTexture&&d.enable(19),C.push(d.mask)}function b(C){const L=E[C.type];let ie;if(L){const se=Ei[L];ie=Ky.clone(se.uniforms)}else ie=C.uniforms;return ie}function z(C,L){let ie;for(let se=0,re=p.length;se<re;se++){const B=p[se];if(B.cacheKey===L){ie=B,++ie.usedTimes;break}}return ie===void 0&&(ie=new uT(r,L,C,l),p.push(ie)),ie}function k(C){if(--C.usedTimes===0){const L=p.indexOf(C);p[L]=p[p.length-1],p.pop(),C.destroy()}}function N(C){f.remove(C)}function fe(){f.dispose()}return{getParameters:x,getProgramCacheKey:y,getUniforms:b,acquireProgram:z,releaseProgram:k,releaseShaderCache:N,programs:p,dispose:fe}}function mT(){let r=new WeakMap;function e(l){let u=r.get(l);return u===void 0&&(u={},r.set(l,u)),u}function t(l){r.delete(l)}function s(l,u,d){r.get(l)[u]=d}function o(){r=new WeakMap}return{get:e,remove:t,update:s,dispose:o}}function gT(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function eg(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function tg(){const r=[];let e=0;const t=[],s=[],o=[];function l(){e=0,t.length=0,s.length=0,o.length=0}function u(m,_,S,E,M,x){let y=r[e];return y===void 0?(y={id:m.id,object:m,geometry:_,material:S,groupOrder:E,renderOrder:m.renderOrder,z:M,group:x},r[e]=y):(y.id=m.id,y.object=m,y.geometry=_,y.material=S,y.groupOrder=E,y.renderOrder=m.renderOrder,y.z=M,y.group=x),e++,y}function d(m,_,S,E,M,x){const y=u(m,_,S,E,M,x);S.transmission>0?s.push(y):S.transparent===!0?o.push(y):t.push(y)}function f(m,_,S,E,M,x){const y=u(m,_,S,E,M,x);S.transmission>0?s.unshift(y):S.transparent===!0?o.unshift(y):t.unshift(y)}function p(m,_){t.length>1&&t.sort(m||gT),s.length>1&&s.sort(_||eg),o.length>1&&o.sort(_||eg)}function g(){for(let m=e,_=r.length;m<_;m++){const S=r[m];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:t,transmissive:s,transparent:o,init:l,push:d,unshift:f,finish:g,sort:p}}function vT(){let r=new WeakMap;function e(s,o){const l=r.get(s);let u;return l===void 0?(u=new tg,r.set(s,[u])):o>=l.length?(u=new tg,l.push(u)):u=l[o],u}function t(){r=new WeakMap}return{get:e,dispose:t}}function _T(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new ce,color:new Mt};break;case"SpotLight":t={position:new ce,direction:new ce,color:new Mt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new ce,color:new Mt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new ce,skyColor:new Mt,groundColor:new Mt};break;case"RectAreaLight":t={color:new Mt,position:new ce,halfWidth:new ce,halfHeight:new ce};break}return r[e.id]=t,t}}}function xT(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let yT=0;function ST(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function MT(r,e){const t=new _T,s=xT(),o={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let g=0;g<9;g++)o.probe.push(new ce);const l=new ce,u=new Kt,d=new Kt;function f(g,m){let _=0,S=0,E=0;for(let se=0;se<9;se++)o.probe[se].set(0,0,0);let M=0,x=0,y=0,w=0,R=0,b=0,z=0,k=0,N=0,fe=0,C=0;g.sort(ST);const L=m===!0?Math.PI:1;for(let se=0,re=g.length;se<re;se++){const B=g[se],H=B.color,$=B.intensity,Z=B.distance,U=B.shadow&&B.shadow.map?B.shadow.map.texture:null;if(B.isAmbientLight)_+=H.r*$*L,S+=H.g*$*L,E+=H.b*$*L;else if(B.isLightProbe){for(let Y=0;Y<9;Y++)o.probe[Y].addScaledVector(B.sh.coefficients[Y],$);C++}else if(B.isDirectionalLight){const Y=t.get(B);if(Y.color.copy(B.color).multiplyScalar(B.intensity*L),B.castShadow){const W=B.shadow,I=s.get(B);I.shadowBias=W.bias,I.shadowNormalBias=W.normalBias,I.shadowRadius=W.radius,I.shadowMapSize=W.mapSize,o.directionalShadow[M]=I,o.directionalShadowMap[M]=U,o.directionalShadowMatrix[M]=B.shadow.matrix,b++}o.directional[M]=Y,M++}else if(B.isSpotLight){const Y=t.get(B);Y.position.setFromMatrixPosition(B.matrixWorld),Y.color.copy(H).multiplyScalar($*L),Y.distance=Z,Y.coneCos=Math.cos(B.angle),Y.penumbraCos=Math.cos(B.angle*(1-B.penumbra)),Y.decay=B.decay,o.spot[y]=Y;const W=B.shadow;if(B.map&&(o.spotLightMap[N]=B.map,N++,W.updateMatrices(B),B.castShadow&&fe++),o.spotLightMatrix[y]=W.matrix,B.castShadow){const I=s.get(B);I.shadowBias=W.bias,I.shadowNormalBias=W.normalBias,I.shadowRadius=W.radius,I.shadowMapSize=W.mapSize,o.spotShadow[y]=I,o.spotShadowMap[y]=U,k++}y++}else if(B.isRectAreaLight){const Y=t.get(B);Y.color.copy(H).multiplyScalar($),Y.halfWidth.set(B.width*.5,0,0),Y.halfHeight.set(0,B.height*.5,0),o.rectArea[w]=Y,w++}else if(B.isPointLight){const Y=t.get(B);if(Y.color.copy(B.color).multiplyScalar(B.intensity*L),Y.distance=B.distance,Y.decay=B.decay,B.castShadow){const W=B.shadow,I=s.get(B);I.shadowBias=W.bias,I.shadowNormalBias=W.normalBias,I.shadowRadius=W.radius,I.shadowMapSize=W.mapSize,I.shadowCameraNear=W.camera.near,I.shadowCameraFar=W.camera.far,o.pointShadow[x]=I,o.pointShadowMap[x]=U,o.pointShadowMatrix[x]=B.shadow.matrix,z++}o.point[x]=Y,x++}else if(B.isHemisphereLight){const Y=t.get(B);Y.skyColor.copy(B.color).multiplyScalar($*L),Y.groundColor.copy(B.groundColor).multiplyScalar($*L),o.hemi[R]=Y,R++}}w>0&&(e.isWebGL2?r.has("OES_texture_float_linear")===!0?(o.rectAreaLTC1=De.LTC_FLOAT_1,o.rectAreaLTC2=De.LTC_FLOAT_2):(o.rectAreaLTC1=De.LTC_HALF_1,o.rectAreaLTC2=De.LTC_HALF_2):r.has("OES_texture_float_linear")===!0?(o.rectAreaLTC1=De.LTC_FLOAT_1,o.rectAreaLTC2=De.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(o.rectAreaLTC1=De.LTC_HALF_1,o.rectAreaLTC2=De.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),o.ambient[0]=_,o.ambient[1]=S,o.ambient[2]=E;const ie=o.hash;(ie.directionalLength!==M||ie.pointLength!==x||ie.spotLength!==y||ie.rectAreaLength!==w||ie.hemiLength!==R||ie.numDirectionalShadows!==b||ie.numPointShadows!==z||ie.numSpotShadows!==k||ie.numSpotMaps!==N||ie.numLightProbes!==C)&&(o.directional.length=M,o.spot.length=y,o.rectArea.length=w,o.point.length=x,o.hemi.length=R,o.directionalShadow.length=b,o.directionalShadowMap.length=b,o.pointShadow.length=z,o.pointShadowMap.length=z,o.spotShadow.length=k,o.spotShadowMap.length=k,o.directionalShadowMatrix.length=b,o.pointShadowMatrix.length=z,o.spotLightMatrix.length=k+N-fe,o.spotLightMap.length=N,o.numSpotLightShadowsWithMaps=fe,o.numLightProbes=C,ie.directionalLength=M,ie.pointLength=x,ie.spotLength=y,ie.rectAreaLength=w,ie.hemiLength=R,ie.numDirectionalShadows=b,ie.numPointShadows=z,ie.numSpotShadows=k,ie.numSpotMaps=N,ie.numLightProbes=C,o.version=yT++)}function p(g,m){let _=0,S=0,E=0,M=0,x=0;const y=m.matrixWorldInverse;for(let w=0,R=g.length;w<R;w++){const b=g[w];if(b.isDirectionalLight){const z=o.directional[_];z.direction.setFromMatrixPosition(b.matrixWorld),l.setFromMatrixPosition(b.target.matrixWorld),z.direction.sub(l),z.direction.transformDirection(y),_++}else if(b.isSpotLight){const z=o.spot[E];z.position.setFromMatrixPosition(b.matrixWorld),z.position.applyMatrix4(y),z.direction.setFromMatrixPosition(b.matrixWorld),l.setFromMatrixPosition(b.target.matrixWorld),z.direction.sub(l),z.direction.transformDirection(y),E++}else if(b.isRectAreaLight){const z=o.rectArea[M];z.position.setFromMatrixPosition(b.matrixWorld),z.position.applyMatrix4(y),d.identity(),u.copy(b.matrixWorld),u.premultiply(y),d.extractRotation(u),z.halfWidth.set(b.width*.5,0,0),z.halfHeight.set(0,b.height*.5,0),z.halfWidth.applyMatrix4(d),z.halfHeight.applyMatrix4(d),M++}else if(b.isPointLight){const z=o.point[S];z.position.setFromMatrixPosition(b.matrixWorld),z.position.applyMatrix4(y),S++}else if(b.isHemisphereLight){const z=o.hemi[x];z.direction.setFromMatrixPosition(b.matrixWorld),z.direction.transformDirection(y),x++}}}return{setup:f,setupView:p,state:o}}function ng(r,e){const t=new MT(r,e),s=[],o=[];function l(){s.length=0,o.length=0}function u(m){s.push(m)}function d(m){o.push(m)}function f(m){t.setup(s,m)}function p(m){t.setupView(s,m)}return{init:l,state:{lightsArray:s,shadowsArray:o,lights:t},setupLights:f,setupLightsView:p,pushLight:u,pushShadow:d}}function ET(r,e){let t=new WeakMap;function s(l,u=0){const d=t.get(l);let f;return d===void 0?(f=new ng(r,e),t.set(l,[f])):u>=d.length?(f=new ng(r,e),d.push(f)):f=d[u],f}function o(){t=new WeakMap}return{get:s,dispose:o}}class TT extends la{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=yy,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class wT extends la{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const AT=`void main() {
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
}`;function RT(r,e,t){let s=new Vd;const o=new Et,l=new Et,u=new sn,d=new TT({depthPacking:Sy}),f=new wT,p={},g=t.maxTextureSize,m={[Rr]:zn,[zn]:Rr,[Vi]:Vi},_=new as({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Et},radius:{value:4}},vertexShader:AT,fragmentShader:CT}),S=_.clone();S.defines.HORIZONTAL_PASS=1;const E=new Lr;E.setAttribute("position",new Ti(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new Xi(E,_),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Pg;let y=this.type;this.render=function(k,N,fe){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||k.length===0)return;const C=r.getRenderTarget(),L=r.getActiveCubeFace(),ie=r.getActiveMipmapLevel(),se=r.state;se.setBlending(Tr),se.buffers.color.setClear(1,1,1,1),se.buffers.depth.setTest(!0),se.setScissorTest(!1);const re=y!==Gi&&this.type===Gi,B=y===Gi&&this.type!==Gi;for(let H=0,$=k.length;H<$;H++){const Z=k[H],U=Z.shadow;if(U===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;o.copy(U.mapSize);const Y=U.getFrameExtents();if(o.multiply(Y),l.copy(U.mapSize),(o.x>g||o.y>g)&&(o.x>g&&(l.x=Math.floor(g/Y.x),o.x=l.x*Y.x,U.mapSize.x=l.x),o.y>g&&(l.y=Math.floor(g/Y.y),o.y=l.y*Y.y,U.mapSize.y=l.y)),U.map===null||re===!0||B===!0){const I=this.type!==Gi?{minFilter:wn,magFilter:wn}:{};U.map!==null&&U.map.dispose(),U.map=new os(o.x,o.y,I),U.map.texture.name=Z.name+".shadowMap",U.camera.updateProjectionMatrix()}r.setRenderTarget(U.map),r.clear();const W=U.getViewportCount();for(let I=0;I<W;I++){const G=U.getViewport(I);u.set(l.x*G.x,l.y*G.y,l.x*G.z,l.y*G.w),se.viewport(u),U.updateMatrices(Z,I),s=U.getFrustum(),b(N,fe,U.camera,Z,this.type)}U.isPointLightShadow!==!0&&this.type===Gi&&w(U,fe),U.needsUpdate=!1}y=this.type,x.needsUpdate=!1,r.setRenderTarget(C,L,ie)};function w(k,N){const fe=e.update(M);_.defines.VSM_SAMPLES!==k.blurSamples&&(_.defines.VSM_SAMPLES=k.blurSamples,S.defines.VSM_SAMPLES=k.blurSamples,_.needsUpdate=!0,S.needsUpdate=!0),k.mapPass===null&&(k.mapPass=new os(o.x,o.y)),_.uniforms.shadow_pass.value=k.map.texture,_.uniforms.resolution.value=k.mapSize,_.uniforms.radius.value=k.radius,r.setRenderTarget(k.mapPass),r.clear(),r.renderBufferDirect(N,null,fe,_,M,null),S.uniforms.shadow_pass.value=k.mapPass.texture,S.uniforms.resolution.value=k.mapSize,S.uniforms.radius.value=k.radius,r.setRenderTarget(k.map),r.clear(),r.renderBufferDirect(N,null,fe,S,M,null)}function R(k,N,fe,C){let L=null;const ie=fe.isPointLight===!0?k.customDistanceMaterial:k.customDepthMaterial;if(ie!==void 0)L=ie;else if(L=fe.isPointLight===!0?f:d,r.localClippingEnabled&&N.clipShadows===!0&&Array.isArray(N.clippingPlanes)&&N.clippingPlanes.length!==0||N.displacementMap&&N.displacementScale!==0||N.alphaMap&&N.alphaTest>0||N.map&&N.alphaTest>0){const se=L.uuid,re=N.uuid;let B=p[se];B===void 0&&(B={},p[se]=B);let H=B[re];H===void 0&&(H=L.clone(),B[re]=H,N.addEventListener("dispose",z)),L=H}if(L.visible=N.visible,L.wireframe=N.wireframe,C===Gi?L.side=N.shadowSide!==null?N.shadowSide:N.side:L.side=N.shadowSide!==null?N.shadowSide:m[N.side],L.alphaMap=N.alphaMap,L.alphaTest=N.alphaTest,L.map=N.map,L.clipShadows=N.clipShadows,L.clippingPlanes=N.clippingPlanes,L.clipIntersection=N.clipIntersection,L.displacementMap=N.displacementMap,L.displacementScale=N.displacementScale,L.displacementBias=N.displacementBias,L.wireframeLinewidth=N.wireframeLinewidth,L.linewidth=N.linewidth,fe.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const se=r.properties.get(L);se.light=fe}return L}function b(k,N,fe,C,L){if(k.visible===!1)return;if(k.layers.test(N.layers)&&(k.isMesh||k.isLine||k.isPoints)&&(k.castShadow||k.receiveShadow&&L===Gi)&&(!k.frustumCulled||s.intersectsObject(k))){k.modelViewMatrix.multiplyMatrices(fe.matrixWorldInverse,k.matrixWorld);const re=e.update(k),B=k.material;if(Array.isArray(B)){const H=re.groups;for(let $=0,Z=H.length;$<Z;$++){const U=H[$],Y=B[U.materialIndex];if(Y&&Y.visible){const W=R(k,Y,C,L);k.onBeforeShadow(r,k,N,fe,re,W,U),r.renderBufferDirect(fe,null,re,W,k,U),k.onAfterShadow(r,k,N,fe,re,W,U)}}}else if(B.visible){const H=R(k,B,C,L);k.onBeforeShadow(r,k,N,fe,re,H,null),r.renderBufferDirect(fe,null,re,H,k,null),k.onAfterShadow(r,k,N,fe,re,H,null)}}const se=k.children;for(let re=0,B=se.length;re<B;re++)b(se[re],N,fe,C,L)}function z(k){k.target.removeEventListener("dispose",z);for(const fe in p){const C=p[fe],L=k.target.uuid;L in C&&(C[L].dispose(),delete C[L])}}}function bT(r,e,t){const s=t.isWebGL2;function o(){let X=!1;const Pe=new sn;let Ne=null;const nt=new sn(0,0,0,0);return{setMask:function(Ke){Ne!==Ke&&!X&&(r.colorMask(Ke,Ke,Ke,Ke),Ne=Ke)},setLocked:function(Ke){X=Ke},setClear:function(Ke,Tt,wt,Bt,Jt){Jt===!0&&(Ke*=Bt,Tt*=Bt,wt*=Bt),Pe.set(Ke,Tt,wt,Bt),nt.equals(Pe)===!1&&(r.clearColor(Ke,Tt,wt,Bt),nt.copy(Pe))},reset:function(){X=!1,Ne=null,nt.set(-1,0,0,0)}}}function l(){let X=!1,Pe=null,Ne=null,nt=null;return{setTest:function(Ke){Ke?pe(r.DEPTH_TEST):de(r.DEPTH_TEST)},setMask:function(Ke){Pe!==Ke&&!X&&(r.depthMask(Ke),Pe=Ke)},setFunc:function(Ke){if(Ne!==Ke){switch(Ke){case Kx:r.depthFunc(r.NEVER);break;case Zx:r.depthFunc(r.ALWAYS);break;case Qx:r.depthFunc(r.LESS);break;case Vl:r.depthFunc(r.LEQUAL);break;case Jx:r.depthFunc(r.EQUAL);break;case ey:r.depthFunc(r.GEQUAL);break;case ty:r.depthFunc(r.GREATER);break;case ny:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Ne=Ke}},setLocked:function(Ke){X=Ke},setClear:function(Ke){nt!==Ke&&(r.clearDepth(Ke),nt=Ke)},reset:function(){X=!1,Pe=null,Ne=null,nt=null}}}function u(){let X=!1,Pe=null,Ne=null,nt=null,Ke=null,Tt=null,wt=null,Bt=null,Jt=null;return{setTest:function(yt){X||(yt?pe(r.STENCIL_TEST):de(r.STENCIL_TEST))},setMask:function(yt){Pe!==yt&&!X&&(r.stencilMask(yt),Pe=yt)},setFunc:function(yt,Yt,dn){(Ne!==yt||nt!==Yt||Ke!==dn)&&(r.stencilFunc(yt,Yt,dn),Ne=yt,nt=Yt,Ke=dn)},setOp:function(yt,Yt,dn){(Tt!==yt||wt!==Yt||Bt!==dn)&&(r.stencilOp(yt,Yt,dn),Tt=yt,wt=Yt,Bt=dn)},setLocked:function(yt){X=yt},setClear:function(yt){Jt!==yt&&(r.clearStencil(yt),Jt=yt)},reset:function(){X=!1,Pe=null,Ne=null,nt=null,Ke=null,Tt=null,wt=null,Bt=null,Jt=null}}}const d=new o,f=new l,p=new u,g=new WeakMap,m=new WeakMap;let _={},S={},E=new WeakMap,M=[],x=null,y=!1,w=null,R=null,b=null,z=null,k=null,N=null,fe=null,C=new Mt(0,0,0),L=0,ie=!1,se=null,re=null,B=null,H=null,$=null;const Z=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let U=!1,Y=0;const W=r.getParameter(r.VERSION);W.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(W)[1]),U=Y>=1):W.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),U=Y>=2);let I=null,G={};const V=r.getParameter(r.SCISSOR_BOX),Q=r.getParameter(r.VIEWPORT),he=new sn().fromArray(V),_e=new sn().fromArray(Q);function Me(X,Pe,Ne,nt){const Ke=new Uint8Array(4),Tt=r.createTexture();r.bindTexture(X,Tt),r.texParameteri(X,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(X,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let wt=0;wt<Ne;wt++)s&&(X===r.TEXTURE_3D||X===r.TEXTURE_2D_ARRAY)?r.texImage3D(Pe,0,r.RGBA,1,1,nt,0,r.RGBA,r.UNSIGNED_BYTE,Ke):r.texImage2D(Pe+wt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Ke);return Tt}const Te={};Te[r.TEXTURE_2D]=Me(r.TEXTURE_2D,r.TEXTURE_2D,1),Te[r.TEXTURE_CUBE_MAP]=Me(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),s&&(Te[r.TEXTURE_2D_ARRAY]=Me(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Te[r.TEXTURE_3D]=Me(r.TEXTURE_3D,r.TEXTURE_3D,1,1)),d.setClear(0,0,0,1),f.setClear(1),p.setClear(0),pe(r.DEPTH_TEST),f.setFunc(Vl),Be(!1),P(Fp),pe(r.CULL_FACE),Re(Tr);function pe(X){_[X]!==!0&&(r.enable(X),_[X]=!0)}function de(X){_[X]!==!1&&(r.disable(X),_[X]=!1)}function Ie(X,Pe){return S[X]!==Pe?(r.bindFramebuffer(X,Pe),S[X]=Pe,s&&(X===r.DRAW_FRAMEBUFFER&&(S[r.FRAMEBUFFER]=Pe),X===r.FRAMEBUFFER&&(S[r.DRAW_FRAMEBUFFER]=Pe)),!0):!1}function K(X,Pe){let Ne=M,nt=!1;if(X)if(Ne=E.get(Pe),Ne===void 0&&(Ne=[],E.set(Pe,Ne)),X.isWebGLMultipleRenderTargets){const Ke=X.texture;if(Ne.length!==Ke.length||Ne[0]!==r.COLOR_ATTACHMENT0){for(let Tt=0,wt=Ke.length;Tt<wt;Tt++)Ne[Tt]=r.COLOR_ATTACHMENT0+Tt;Ne.length=Ke.length,nt=!0}}else Ne[0]!==r.COLOR_ATTACHMENT0&&(Ne[0]=r.COLOR_ATTACHMENT0,nt=!0);else Ne[0]!==r.BACK&&(Ne[0]=r.BACK,nt=!0);nt&&(t.isWebGL2?r.drawBuffers(Ne):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(Ne))}function Je(X){return x!==X?(r.useProgram(X),x=X,!0):!1}const Fe={[Jr]:r.FUNC_ADD,[Ux]:r.FUNC_SUBTRACT,[Ox]:r.FUNC_REVERSE_SUBTRACT};if(s)Fe[Hp]=r.MIN,Fe[Gp]=r.MAX;else{const X=e.get("EXT_blend_minmax");X!==null&&(Fe[Hp]=X.MIN_EXT,Fe[Gp]=X.MAX_EXT)}const Ve={[Fx]:r.ZERO,[kx]:r.ONE,[Bx]:r.SRC_COLOR,[Ad]:r.SRC_ALPHA,[jx]:r.SRC_ALPHA_SATURATE,[Vx]:r.DST_COLOR,[Hx]:r.DST_ALPHA,[zx]:r.ONE_MINUS_SRC_COLOR,[Cd]:r.ONE_MINUS_SRC_ALPHA,[Wx]:r.ONE_MINUS_DST_COLOR,[Gx]:r.ONE_MINUS_DST_ALPHA,[Xx]:r.CONSTANT_COLOR,[Yx]:r.ONE_MINUS_CONSTANT_COLOR,[qx]:r.CONSTANT_ALPHA,[$x]:r.ONE_MINUS_CONSTANT_ALPHA};function Re(X,Pe,Ne,nt,Ke,Tt,wt,Bt,Jt,yt){if(X===Tr){y===!0&&(de(r.BLEND),y=!1);return}if(y===!1&&(pe(r.BLEND),y=!0),X!==Nx){if(X!==w||yt!==ie){if((R!==Jr||k!==Jr)&&(r.blendEquation(r.FUNC_ADD),R=Jr,k=Jr),yt)switch(X){case Zs:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case kp:r.blendFunc(r.ONE,r.ONE);break;case Bp:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case zp:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}else switch(X){case Zs:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case kp:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Bp:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case zp:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}b=null,z=null,N=null,fe=null,C.set(0,0,0),L=0,w=X,ie=yt}return}Ke=Ke||Pe,Tt=Tt||Ne,wt=wt||nt,(Pe!==R||Ke!==k)&&(r.blendEquationSeparate(Fe[Pe],Fe[Ke]),R=Pe,k=Ke),(Ne!==b||nt!==z||Tt!==N||wt!==fe)&&(r.blendFuncSeparate(Ve[Ne],Ve[nt],Ve[Tt],Ve[wt]),b=Ne,z=nt,N=Tt,fe=wt),(Bt.equals(C)===!1||Jt!==L)&&(r.blendColor(Bt.r,Bt.g,Bt.b,Jt),C.copy(Bt),L=Jt),w=X,ie=!1}function rt(X,Pe){X.side===Vi?de(r.CULL_FACE):pe(r.CULL_FACE);let Ne=X.side===zn;Pe&&(Ne=!Ne),Be(Ne),X.blending===Zs&&X.transparent===!1?Re(Tr):Re(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),f.setFunc(X.depthFunc),f.setTest(X.depthTest),f.setMask(X.depthWrite),d.setMask(X.colorWrite);const nt=X.stencilWrite;p.setTest(nt),nt&&(p.setMask(X.stencilWriteMask),p.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),p.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),te(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?pe(r.SAMPLE_ALPHA_TO_COVERAGE):de(r.SAMPLE_ALPHA_TO_COVERAGE)}function Be(X){se!==X&&(X?r.frontFace(r.CW):r.frontFace(r.CCW),se=X)}function P(X){X!==Px?(pe(r.CULL_FACE),X!==re&&(X===Fp?r.cullFace(r.BACK):X===Dx?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):de(r.CULL_FACE),re=X}function A(X){X!==B&&(U&&r.lineWidth(X),B=X)}function te(X,Pe,Ne){X?(pe(r.POLYGON_OFFSET_FILL),(H!==Pe||$!==Ne)&&(r.polygonOffset(Pe,Ne),H=Pe,$=Ne)):de(r.POLYGON_OFFSET_FILL)}function xe(X){X?pe(r.SCISSOR_TEST):de(r.SCISSOR_TEST)}function me(X){X===void 0&&(X=r.TEXTURE0+Z-1),I!==X&&(r.activeTexture(X),I=X)}function ve(X,Pe,Ne){Ne===void 0&&(I===null?Ne=r.TEXTURE0+Z-1:Ne=I);let nt=G[Ne];nt===void 0&&(nt={type:void 0,texture:void 0},G[Ne]=nt),(nt.type!==X||nt.texture!==Pe)&&(I!==Ne&&(r.activeTexture(Ne),I=Ne),r.bindTexture(X,Pe||Te[X]),nt.type=X,nt.texture=Pe)}function Le(){const X=G[I];X!==void 0&&X.type!==void 0&&(r.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function Ae(){try{r.compressedTexImage2D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function ze(){try{r.compressedTexImage3D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function $e(){try{r.texSubImage2D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function at(){try{r.texSubImage3D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Se(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function pt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function dt(){try{r.texStorage2D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function it(){try{r.texStorage3D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function qe(){try{r.texImage2D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Ge(){try{r.texImage3D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function tt(X){he.equals(X)===!1&&(r.scissor(X.x,X.y,X.z,X.w),he.copy(X))}function mt(X){_e.equals(X)===!1&&(r.viewport(X.x,X.y,X.z,X.w),_e.copy(X))}function Rt(X,Pe){let Ne=m.get(Pe);Ne===void 0&&(Ne=new WeakMap,m.set(Pe,Ne));let nt=Ne.get(X);nt===void 0&&(nt=r.getUniformBlockIndex(Pe,X.name),Ne.set(X,nt))}function ct(X,Pe){const nt=m.get(Pe).get(X);g.get(Pe)!==nt&&(r.uniformBlockBinding(Pe,nt,X.__bindingPointIndex),g.set(Pe,nt))}function be(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),s===!0&&(r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),_={},I=null,G={},S={},E=new WeakMap,M=[],x=null,y=!1,w=null,R=null,b=null,z=null,k=null,N=null,fe=null,C=new Mt(0,0,0),L=0,ie=!1,se=null,re=null,B=null,H=null,$=null,he.set(0,0,r.canvas.width,r.canvas.height),_e.set(0,0,r.canvas.width,r.canvas.height),d.reset(),f.reset(),p.reset()}return{buffers:{color:d,depth:f,stencil:p},enable:pe,disable:de,bindFramebuffer:Ie,drawBuffers:K,useProgram:Je,setBlending:Re,setMaterial:rt,setFlipSided:Be,setCullFace:P,setLineWidth:A,setPolygonOffset:te,setScissorTest:xe,activeTexture:me,bindTexture:ve,unbindTexture:Le,compressedTexImage2D:Ae,compressedTexImage3D:ze,texImage2D:qe,texImage3D:Ge,updateUBOMapping:Rt,uniformBlockBinding:ct,texStorage2D:dt,texStorage3D:it,texSubImage2D:$e,texSubImage3D:at,compressedTexSubImage2D:Se,compressedTexSubImage3D:pt,scissor:tt,viewport:mt,reset:be}}function LT(r,e,t,s,o,l,u){const d=o.isWebGL2,f=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),g=new WeakMap;let m;const _=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(P,A){return S?new OffscreenCanvas(P,A):ql("canvas")}function M(P,A,te,xe){let me=1;if((P.width>xe||P.height>xe)&&(me=xe/Math.max(P.width,P.height)),me<1||A===!0)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap){const ve=A?Id:Math.floor,Le=ve(me*P.width),Ae=ve(me*P.height);m===void 0&&(m=E(Le,Ae));const ze=te?E(Le,Ae):m;return ze.width=Le,ze.height=Ae,ze.getContext("2d").drawImage(P,0,0,Le,Ae),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+P.width+"x"+P.height+") to ("+Le+"x"+Ae+")."),ze}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+P.width+"x"+P.height+")."),P;return P}function x(P){return _m(P.width)&&_m(P.height)}function y(P){return d?!1:P.wrapS!==Bn||P.wrapT!==Bn||P.minFilter!==wn&&P.minFilter!==An}function w(P,A){return P.generateMipmaps&&A&&P.minFilter!==wn&&P.minFilter!==An}function R(P){r.generateMipmap(P)}function b(P,A,te,xe,me=!1){if(d===!1)return A;if(P!==null){if(r[P]!==void 0)return r[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let ve=A;if(A===r.RED&&(te===r.FLOAT&&(ve=r.R32F),te===r.HALF_FLOAT&&(ve=r.R16F),te===r.UNSIGNED_BYTE&&(ve=r.R8)),A===r.RED_INTEGER&&(te===r.UNSIGNED_BYTE&&(ve=r.R8UI),te===r.UNSIGNED_SHORT&&(ve=r.R16UI),te===r.UNSIGNED_INT&&(ve=r.R32UI),te===r.BYTE&&(ve=r.R8I),te===r.SHORT&&(ve=r.R16I),te===r.INT&&(ve=r.R32I)),A===r.RG&&(te===r.FLOAT&&(ve=r.RG32F),te===r.HALF_FLOAT&&(ve=r.RG16F),te===r.UNSIGNED_BYTE&&(ve=r.RG8)),A===r.RGBA){const Le=me?Wl:Ct.getTransfer(xe);te===r.FLOAT&&(ve=r.RGBA32F),te===r.HALF_FLOAT&&(ve=r.RGBA16F),te===r.UNSIGNED_BYTE&&(ve=Le===It?r.SRGB8_ALPHA8:r.RGBA8),te===r.UNSIGNED_SHORT_4_4_4_4&&(ve=r.RGBA4),te===r.UNSIGNED_SHORT_5_5_5_1&&(ve=r.RGB5_A1)}return(ve===r.R16F||ve===r.R32F||ve===r.RG16F||ve===r.RG32F||ve===r.RGBA16F||ve===r.RGBA32F)&&e.get("EXT_color_buffer_float"),ve}function z(P,A,te){return w(P,te)===!0||P.isFramebufferTexture&&P.minFilter!==wn&&P.minFilter!==An?Math.log2(Math.max(A.width,A.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?A.mipmaps.length:1}function k(P){return P===wn||P===Vp||P===Gu?r.NEAREST:r.LINEAR}function N(P){const A=P.target;A.removeEventListener("dispose",N),C(A),A.isVideoTexture&&g.delete(A)}function fe(P){const A=P.target;A.removeEventListener("dispose",fe),ie(A)}function C(P){const A=s.get(P);if(A.__webglInit===void 0)return;const te=P.source,xe=_.get(te);if(xe){const me=xe[A.__cacheKey];me.usedTimes--,me.usedTimes===0&&L(P),Object.keys(xe).length===0&&_.delete(te)}s.remove(P)}function L(P){const A=s.get(P);r.deleteTexture(A.__webglTexture);const te=P.source,xe=_.get(te);delete xe[A.__cacheKey],u.memory.textures--}function ie(P){const A=P.texture,te=s.get(P),xe=s.get(A);if(xe.__webglTexture!==void 0&&(r.deleteTexture(xe.__webglTexture),u.memory.textures--),P.depthTexture&&P.depthTexture.dispose(),P.isWebGLCubeRenderTarget)for(let me=0;me<6;me++){if(Array.isArray(te.__webglFramebuffer[me]))for(let ve=0;ve<te.__webglFramebuffer[me].length;ve++)r.deleteFramebuffer(te.__webglFramebuffer[me][ve]);else r.deleteFramebuffer(te.__webglFramebuffer[me]);te.__webglDepthbuffer&&r.deleteRenderbuffer(te.__webglDepthbuffer[me])}else{if(Array.isArray(te.__webglFramebuffer))for(let me=0;me<te.__webglFramebuffer.length;me++)r.deleteFramebuffer(te.__webglFramebuffer[me]);else r.deleteFramebuffer(te.__webglFramebuffer);if(te.__webglDepthbuffer&&r.deleteRenderbuffer(te.__webglDepthbuffer),te.__webglMultisampledFramebuffer&&r.deleteFramebuffer(te.__webglMultisampledFramebuffer),te.__webglColorRenderbuffer)for(let me=0;me<te.__webglColorRenderbuffer.length;me++)te.__webglColorRenderbuffer[me]&&r.deleteRenderbuffer(te.__webglColorRenderbuffer[me]);te.__webglDepthRenderbuffer&&r.deleteRenderbuffer(te.__webglDepthRenderbuffer)}if(P.isWebGLMultipleRenderTargets)for(let me=0,ve=A.length;me<ve;me++){const Le=s.get(A[me]);Le.__webglTexture&&(r.deleteTexture(Le.__webglTexture),u.memory.textures--),s.remove(A[me])}s.remove(A),s.remove(P)}let se=0;function re(){se=0}function B(){const P=se;return P>=o.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+o.maxTextures),se+=1,P}function H(P){const A=[];return A.push(P.wrapS),A.push(P.wrapT),A.push(P.wrapR||0),A.push(P.magFilter),A.push(P.minFilter),A.push(P.anisotropy),A.push(P.internalFormat),A.push(P.format),A.push(P.type),A.push(P.generateMipmaps),A.push(P.premultiplyAlpha),A.push(P.flipY),A.push(P.unpackAlignment),A.push(P.colorSpace),A.join()}function $(P,A){const te=s.get(P);if(P.isVideoTexture&&rt(P),P.isRenderTargetTexture===!1&&P.version>0&&te.__version!==P.version){const xe=P.image;if(xe===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(xe.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{he(te,P,A);return}}t.bindTexture(r.TEXTURE_2D,te.__webglTexture,r.TEXTURE0+A)}function Z(P,A){const te=s.get(P);if(P.version>0&&te.__version!==P.version){he(te,P,A);return}t.bindTexture(r.TEXTURE_2D_ARRAY,te.__webglTexture,r.TEXTURE0+A)}function U(P,A){const te=s.get(P);if(P.version>0&&te.__version!==P.version){he(te,P,A);return}t.bindTexture(r.TEXTURE_3D,te.__webglTexture,r.TEXTURE0+A)}function Y(P,A){const te=s.get(P);if(P.version>0&&te.__version!==P.version){_e(te,P,A);return}t.bindTexture(r.TEXTURE_CUBE_MAP,te.__webglTexture,r.TEXTURE0+A)}const W={[Qs]:r.REPEAT,[Bn]:r.CLAMP_TO_EDGE,[Ld]:r.MIRRORED_REPEAT},I={[wn]:r.NEAREST,[Vp]:r.NEAREST_MIPMAP_NEAREST,[Gu]:r.NEAREST_MIPMAP_LINEAR,[An]:r.LINEAR,[dy]:r.LINEAR_MIPMAP_NEAREST,[Ar]:r.LINEAR_MIPMAP_LINEAR},G={[Ey]:r.NEVER,[by]:r.ALWAYS,[Ty]:r.LESS,[Vg]:r.LEQUAL,[wy]:r.EQUAL,[Ry]:r.GEQUAL,[Ay]:r.GREATER,[Cy]:r.NOTEQUAL};function V(P,A,te){if(te?(r.texParameteri(P,r.TEXTURE_WRAP_S,W[A.wrapS]),r.texParameteri(P,r.TEXTURE_WRAP_T,W[A.wrapT]),(P===r.TEXTURE_3D||P===r.TEXTURE_2D_ARRAY)&&r.texParameteri(P,r.TEXTURE_WRAP_R,W[A.wrapR]),r.texParameteri(P,r.TEXTURE_MAG_FILTER,I[A.magFilter]),r.texParameteri(P,r.TEXTURE_MIN_FILTER,I[A.minFilter])):(r.texParameteri(P,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(P,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),(P===r.TEXTURE_3D||P===r.TEXTURE_2D_ARRAY)&&r.texParameteri(P,r.TEXTURE_WRAP_R,r.CLAMP_TO_EDGE),(A.wrapS!==Bn||A.wrapT!==Bn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(P,r.TEXTURE_MAG_FILTER,k(A.magFilter)),r.texParameteri(P,r.TEXTURE_MIN_FILTER,k(A.minFilter)),A.minFilter!==wn&&A.minFilter!==An&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),A.compareFunction&&(r.texParameteri(P,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(P,r.TEXTURE_COMPARE_FUNC,G[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const xe=e.get("EXT_texture_filter_anisotropic");if(A.magFilter===wn||A.minFilter!==Gu&&A.minFilter!==Ar||A.type===Er&&e.has("OES_texture_float_linear")===!1||d===!1&&A.type===ta&&e.has("OES_texture_half_float_linear")===!1)return;(A.anisotropy>1||s.get(A).__currentAnisotropy)&&(r.texParameterf(P,xe.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,o.getMaxAnisotropy())),s.get(A).__currentAnisotropy=A.anisotropy)}}function Q(P,A){let te=!1;P.__webglInit===void 0&&(P.__webglInit=!0,A.addEventListener("dispose",N));const xe=A.source;let me=_.get(xe);me===void 0&&(me={},_.set(xe,me));const ve=H(A);if(ve!==P.__cacheKey){me[ve]===void 0&&(me[ve]={texture:r.createTexture(),usedTimes:0},u.memory.textures++,te=!0),me[ve].usedTimes++;const Le=me[P.__cacheKey];Le!==void 0&&(me[P.__cacheKey].usedTimes--,Le.usedTimes===0&&L(A)),P.__cacheKey=ve,P.__webglTexture=me[ve].texture}return te}function he(P,A,te){let xe=r.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(xe=r.TEXTURE_2D_ARRAY),A.isData3DTexture&&(xe=r.TEXTURE_3D);const me=Q(P,A),ve=A.source;t.bindTexture(xe,P.__webglTexture,r.TEXTURE0+te);const Le=s.get(ve);if(ve.version!==Le.__version||me===!0){t.activeTexture(r.TEXTURE0+te);const Ae=Ct.getPrimaries(Ct.workingColorSpace),ze=A.colorSpace===ri?null:Ct.getPrimaries(A.colorSpace),$e=A.colorSpace===ri||Ae===ze?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,$e);const at=y(A)&&x(A.image)===!1;let Se=M(A.image,at,!1,o.maxTextureSize);Se=Be(A,Se);const pt=x(Se)||d,dt=l.convert(A.format,A.colorSpace);let it=l.convert(A.type),qe=b(A.internalFormat,dt,it,A.colorSpace,A.isVideoTexture);V(xe,A,pt);let Ge;const tt=A.mipmaps,mt=d&&A.isVideoTexture!==!0&&qe!==zg,Rt=Le.__version===void 0||me===!0,ct=z(A,Se,pt);if(A.isDepthTexture)qe=r.DEPTH_COMPONENT,d?A.type===Er?qe=r.DEPTH_COMPONENT32F:A.type===Mr?qe=r.DEPTH_COMPONENT24:A.type===is?qe=r.DEPTH24_STENCIL8:qe=r.DEPTH_COMPONENT16:A.type===Er&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),A.format===rs&&qe===r.DEPTH_COMPONENT&&A.type!==zd&&A.type!==Mr&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),A.type=Mr,it=l.convert(A.type)),A.format===io&&qe===r.DEPTH_COMPONENT&&(qe=r.DEPTH_STENCIL,A.type!==is&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),A.type=is,it=l.convert(A.type))),Rt&&(mt?t.texStorage2D(r.TEXTURE_2D,1,qe,Se.width,Se.height):t.texImage2D(r.TEXTURE_2D,0,qe,Se.width,Se.height,0,dt,it,null));else if(A.isDataTexture)if(tt.length>0&&pt){mt&&Rt&&t.texStorage2D(r.TEXTURE_2D,ct,qe,tt[0].width,tt[0].height);for(let be=0,X=tt.length;be<X;be++)Ge=tt[be],mt?t.texSubImage2D(r.TEXTURE_2D,be,0,0,Ge.width,Ge.height,dt,it,Ge.data):t.texImage2D(r.TEXTURE_2D,be,qe,Ge.width,Ge.height,0,dt,it,Ge.data);A.generateMipmaps=!1}else mt?(Rt&&t.texStorage2D(r.TEXTURE_2D,ct,qe,Se.width,Se.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,Se.width,Se.height,dt,it,Se.data)):t.texImage2D(r.TEXTURE_2D,0,qe,Se.width,Se.height,0,dt,it,Se.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){mt&&Rt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ct,qe,tt[0].width,tt[0].height,Se.depth);for(let be=0,X=tt.length;be<X;be++)Ge=tt[be],A.format!==gi?dt!==null?mt?t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,be,0,0,0,Ge.width,Ge.height,Se.depth,dt,Ge.data,0,0):t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,be,qe,Ge.width,Ge.height,Se.depth,0,Ge.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):mt?t.texSubImage3D(r.TEXTURE_2D_ARRAY,be,0,0,0,Ge.width,Ge.height,Se.depth,dt,it,Ge.data):t.texImage3D(r.TEXTURE_2D_ARRAY,be,qe,Ge.width,Ge.height,Se.depth,0,dt,it,Ge.data)}else{mt&&Rt&&t.texStorage2D(r.TEXTURE_2D,ct,qe,tt[0].width,tt[0].height);for(let be=0,X=tt.length;be<X;be++)Ge=tt[be],A.format!==gi?dt!==null?mt?t.compressedTexSubImage2D(r.TEXTURE_2D,be,0,0,Ge.width,Ge.height,dt,Ge.data):t.compressedTexImage2D(r.TEXTURE_2D,be,qe,Ge.width,Ge.height,0,Ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):mt?t.texSubImage2D(r.TEXTURE_2D,be,0,0,Ge.width,Ge.height,dt,it,Ge.data):t.texImage2D(r.TEXTURE_2D,be,qe,Ge.width,Ge.height,0,dt,it,Ge.data)}else if(A.isDataArrayTexture)mt?(Rt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ct,qe,Se.width,Se.height,Se.depth),t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,Se.width,Se.height,Se.depth,dt,it,Se.data)):t.texImage3D(r.TEXTURE_2D_ARRAY,0,qe,Se.width,Se.height,Se.depth,0,dt,it,Se.data);else if(A.isData3DTexture)mt?(Rt&&t.texStorage3D(r.TEXTURE_3D,ct,qe,Se.width,Se.height,Se.depth),t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,Se.width,Se.height,Se.depth,dt,it,Se.data)):t.texImage3D(r.TEXTURE_3D,0,qe,Se.width,Se.height,Se.depth,0,dt,it,Se.data);else if(A.isFramebufferTexture){if(Rt)if(mt)t.texStorage2D(r.TEXTURE_2D,ct,qe,Se.width,Se.height);else{let be=Se.width,X=Se.height;for(let Pe=0;Pe<ct;Pe++)t.texImage2D(r.TEXTURE_2D,Pe,qe,be,X,0,dt,it,null),be>>=1,X>>=1}}else if(tt.length>0&&pt){mt&&Rt&&t.texStorage2D(r.TEXTURE_2D,ct,qe,tt[0].width,tt[0].height);for(let be=0,X=tt.length;be<X;be++)Ge=tt[be],mt?t.texSubImage2D(r.TEXTURE_2D,be,0,0,dt,it,Ge):t.texImage2D(r.TEXTURE_2D,be,qe,dt,it,Ge);A.generateMipmaps=!1}else mt?(Rt&&t.texStorage2D(r.TEXTURE_2D,ct,qe,Se.width,Se.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,dt,it,Se)):t.texImage2D(r.TEXTURE_2D,0,qe,dt,it,Se);w(A,pt)&&R(xe),Le.__version=ve.version,A.onUpdate&&A.onUpdate(A)}P.__version=A.version}function _e(P,A,te){if(A.image.length!==6)return;const xe=Q(P,A),me=A.source;t.bindTexture(r.TEXTURE_CUBE_MAP,P.__webglTexture,r.TEXTURE0+te);const ve=s.get(me);if(me.version!==ve.__version||xe===!0){t.activeTexture(r.TEXTURE0+te);const Le=Ct.getPrimaries(Ct.workingColorSpace),Ae=A.colorSpace===ri?null:Ct.getPrimaries(A.colorSpace),ze=A.colorSpace===ri||Le===Ae?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ze);const $e=A.isCompressedTexture||A.image[0].isCompressedTexture,at=A.image[0]&&A.image[0].isDataTexture,Se=[];for(let be=0;be<6;be++)!$e&&!at?Se[be]=M(A.image[be],!1,!0,o.maxCubemapSize):Se[be]=at?A.image[be].image:A.image[be],Se[be]=Be(A,Se[be]);const pt=Se[0],dt=x(pt)||d,it=l.convert(A.format,A.colorSpace),qe=l.convert(A.type),Ge=b(A.internalFormat,it,qe,A.colorSpace),tt=d&&A.isVideoTexture!==!0,mt=ve.__version===void 0||xe===!0;let Rt=z(A,pt,dt);V(r.TEXTURE_CUBE_MAP,A,dt);let ct;if($e){tt&&mt&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Rt,Ge,pt.width,pt.height);for(let be=0;be<6;be++){ct=Se[be].mipmaps;for(let X=0;X<ct.length;X++){const Pe=ct[X];A.format!==gi?it!==null?tt?t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+be,X,0,0,Pe.width,Pe.height,it,Pe.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+be,X,Ge,Pe.width,Pe.height,0,Pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):tt?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+be,X,0,0,Pe.width,Pe.height,it,qe,Pe.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+be,X,Ge,Pe.width,Pe.height,0,it,qe,Pe.data)}}}else{ct=A.mipmaps,tt&&mt&&(ct.length>0&&Rt++,t.texStorage2D(r.TEXTURE_CUBE_MAP,Rt,Ge,Se[0].width,Se[0].height));for(let be=0;be<6;be++)if(at){tt?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,0,0,Se[be].width,Se[be].height,it,qe,Se[be].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,Ge,Se[be].width,Se[be].height,0,it,qe,Se[be].data);for(let X=0;X<ct.length;X++){const Ne=ct[X].image[be].image;tt?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+be,X+1,0,0,Ne.width,Ne.height,it,qe,Ne.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+be,X+1,Ge,Ne.width,Ne.height,0,it,qe,Ne.data)}}else{tt?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,0,0,it,qe,Se[be]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,Ge,it,qe,Se[be]);for(let X=0;X<ct.length;X++){const Pe=ct[X];tt?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+be,X+1,0,0,it,qe,Pe.image[be]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+be,X+1,Ge,it,qe,Pe.image[be])}}}w(A,dt)&&R(r.TEXTURE_CUBE_MAP),ve.__version=me.version,A.onUpdate&&A.onUpdate(A)}P.__version=A.version}function Me(P,A,te,xe,me,ve){const Le=l.convert(te.format,te.colorSpace),Ae=l.convert(te.type),ze=b(te.internalFormat,Le,Ae,te.colorSpace);if(!s.get(A).__hasExternalTextures){const at=Math.max(1,A.width>>ve),Se=Math.max(1,A.height>>ve);me===r.TEXTURE_3D||me===r.TEXTURE_2D_ARRAY?t.texImage3D(me,ve,ze,at,Se,A.depth,0,Le,Ae,null):t.texImage2D(me,ve,ze,at,Se,0,Le,Ae,null)}t.bindFramebuffer(r.FRAMEBUFFER,P),Re(A)?f.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,xe,me,s.get(te).__webglTexture,0,Ve(A)):(me===r.TEXTURE_2D||me>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&me<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,xe,me,s.get(te).__webglTexture,ve),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Te(P,A,te){if(r.bindRenderbuffer(r.RENDERBUFFER,P),A.depthBuffer&&!A.stencilBuffer){let xe=d===!0?r.DEPTH_COMPONENT24:r.DEPTH_COMPONENT16;if(te||Re(A)){const me=A.depthTexture;me&&me.isDepthTexture&&(me.type===Er?xe=r.DEPTH_COMPONENT32F:me.type===Mr&&(xe=r.DEPTH_COMPONENT24));const ve=Ve(A);Re(A)?f.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ve,xe,A.width,A.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,ve,xe,A.width,A.height)}else r.renderbufferStorage(r.RENDERBUFFER,xe,A.width,A.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,P)}else if(A.depthBuffer&&A.stencilBuffer){const xe=Ve(A);te&&Re(A)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,xe,r.DEPTH24_STENCIL8,A.width,A.height):Re(A)?f.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,xe,r.DEPTH24_STENCIL8,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,P)}else{const xe=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let me=0;me<xe.length;me++){const ve=xe[me],Le=l.convert(ve.format,ve.colorSpace),Ae=l.convert(ve.type),ze=b(ve.internalFormat,Le,Ae,ve.colorSpace),$e=Ve(A);te&&Re(A)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,$e,ze,A.width,A.height):Re(A)?f.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,$e,ze,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,ze,A.width,A.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function pe(P,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,P),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!s.get(A.depthTexture).__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),$(A.depthTexture,0);const xe=s.get(A.depthTexture).__webglTexture,me=Ve(A);if(A.depthTexture.format===rs)Re(A)?f.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,xe,0,me):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,xe,0);else if(A.depthTexture.format===io)Re(A)?f.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,xe,0,me):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,xe,0);else throw new Error("Unknown depthTexture format")}function de(P){const A=s.get(P),te=P.isWebGLCubeRenderTarget===!0;if(P.depthTexture&&!A.__autoAllocateDepthBuffer){if(te)throw new Error("target.depthTexture not supported in Cube render targets");pe(A.__webglFramebuffer,P)}else if(te){A.__webglDepthbuffer=[];for(let xe=0;xe<6;xe++)t.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer[xe]),A.__webglDepthbuffer[xe]=r.createRenderbuffer(),Te(A.__webglDepthbuffer[xe],P,!1)}else t.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer=r.createRenderbuffer(),Te(A.__webglDepthbuffer,P,!1);t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ie(P,A,te){const xe=s.get(P);A!==void 0&&Me(xe.__webglFramebuffer,P,P.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),te!==void 0&&de(P)}function K(P){const A=P.texture,te=s.get(P),xe=s.get(A);P.addEventListener("dispose",fe),P.isWebGLMultipleRenderTargets!==!0&&(xe.__webglTexture===void 0&&(xe.__webglTexture=r.createTexture()),xe.__version=A.version,u.memory.textures++);const me=P.isWebGLCubeRenderTarget===!0,ve=P.isWebGLMultipleRenderTargets===!0,Le=x(P)||d;if(me){te.__webglFramebuffer=[];for(let Ae=0;Ae<6;Ae++)if(d&&A.mipmaps&&A.mipmaps.length>0){te.__webglFramebuffer[Ae]=[];for(let ze=0;ze<A.mipmaps.length;ze++)te.__webglFramebuffer[Ae][ze]=r.createFramebuffer()}else te.__webglFramebuffer[Ae]=r.createFramebuffer()}else{if(d&&A.mipmaps&&A.mipmaps.length>0){te.__webglFramebuffer=[];for(let Ae=0;Ae<A.mipmaps.length;Ae++)te.__webglFramebuffer[Ae]=r.createFramebuffer()}else te.__webglFramebuffer=r.createFramebuffer();if(ve)if(o.drawBuffers){const Ae=P.texture;for(let ze=0,$e=Ae.length;ze<$e;ze++){const at=s.get(Ae[ze]);at.__webglTexture===void 0&&(at.__webglTexture=r.createTexture(),u.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(d&&P.samples>0&&Re(P)===!1){const Ae=ve?A:[A];te.__webglMultisampledFramebuffer=r.createFramebuffer(),te.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,te.__webglMultisampledFramebuffer);for(let ze=0;ze<Ae.length;ze++){const $e=Ae[ze];te.__webglColorRenderbuffer[ze]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,te.__webglColorRenderbuffer[ze]);const at=l.convert($e.format,$e.colorSpace),Se=l.convert($e.type),pt=b($e.internalFormat,at,Se,$e.colorSpace,P.isXRRenderTarget===!0),dt=Ve(P);r.renderbufferStorageMultisample(r.RENDERBUFFER,dt,pt,P.width,P.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ze,r.RENDERBUFFER,te.__webglColorRenderbuffer[ze])}r.bindRenderbuffer(r.RENDERBUFFER,null),P.depthBuffer&&(te.__webglDepthRenderbuffer=r.createRenderbuffer(),Te(te.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(me){t.bindTexture(r.TEXTURE_CUBE_MAP,xe.__webglTexture),V(r.TEXTURE_CUBE_MAP,A,Le);for(let Ae=0;Ae<6;Ae++)if(d&&A.mipmaps&&A.mipmaps.length>0)for(let ze=0;ze<A.mipmaps.length;ze++)Me(te.__webglFramebuffer[Ae][ze],P,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,ze);else Me(te.__webglFramebuffer[Ae],P,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0);w(A,Le)&&R(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ve){const Ae=P.texture;for(let ze=0,$e=Ae.length;ze<$e;ze++){const at=Ae[ze],Se=s.get(at);t.bindTexture(r.TEXTURE_2D,Se.__webglTexture),V(r.TEXTURE_2D,at,Le),Me(te.__webglFramebuffer,P,at,r.COLOR_ATTACHMENT0+ze,r.TEXTURE_2D,0),w(at,Le)&&R(r.TEXTURE_2D)}t.unbindTexture()}else{let Ae=r.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(d?Ae=P.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(Ae,xe.__webglTexture),V(Ae,A,Le),d&&A.mipmaps&&A.mipmaps.length>0)for(let ze=0;ze<A.mipmaps.length;ze++)Me(te.__webglFramebuffer[ze],P,A,r.COLOR_ATTACHMENT0,Ae,ze);else Me(te.__webglFramebuffer,P,A,r.COLOR_ATTACHMENT0,Ae,0);w(A,Le)&&R(Ae),t.unbindTexture()}P.depthBuffer&&de(P)}function Je(P){const A=x(P)||d,te=P.isWebGLMultipleRenderTargets===!0?P.texture:[P.texture];for(let xe=0,me=te.length;xe<me;xe++){const ve=te[xe];if(w(ve,A)){const Le=P.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,Ae=s.get(ve).__webglTexture;t.bindTexture(Le,Ae),R(Le),t.unbindTexture()}}}function Fe(P){if(d&&P.samples>0&&Re(P)===!1){const A=P.isWebGLMultipleRenderTargets?P.texture:[P.texture],te=P.width,xe=P.height;let me=r.COLOR_BUFFER_BIT;const ve=[],Le=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ae=s.get(P),ze=P.isWebGLMultipleRenderTargets===!0;if(ze)for(let $e=0;$e<A.length;$e++)t.bindFramebuffer(r.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+$e,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,Ae.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+$e,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer);for(let $e=0;$e<A.length;$e++){ve.push(r.COLOR_ATTACHMENT0+$e),P.depthBuffer&&ve.push(Le);const at=Ae.__ignoreDepthValues!==void 0?Ae.__ignoreDepthValues:!1;if(at===!1&&(P.depthBuffer&&(me|=r.DEPTH_BUFFER_BIT),P.stencilBuffer&&(me|=r.STENCIL_BUFFER_BIT)),ze&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Ae.__webglColorRenderbuffer[$e]),at===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[Le]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[Le])),ze){const Se=s.get(A[$e]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Se,0)}r.blitFramebuffer(0,0,te,xe,0,0,te,xe,me,r.NEAREST),p&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ve)}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ze)for(let $e=0;$e<A.length;$e++){t.bindFramebuffer(r.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+$e,r.RENDERBUFFER,Ae.__webglColorRenderbuffer[$e]);const at=s.get(A[$e]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,Ae.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+$e,r.TEXTURE_2D,at,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer)}}function Ve(P){return Math.min(o.maxSamples,P.samples)}function Re(P){const A=s.get(P);return d&&P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function rt(P){const A=u.render.frame;g.get(P)!==A&&(g.set(P,A),P.update())}function Be(P,A){const te=P.colorSpace,xe=P.format,me=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||P.format===Pd||te!==Yi&&te!==ri&&(Ct.getTransfer(te)===It?d===!1?e.has("EXT_sRGB")===!0&&xe===gi?(P.format=Pd,P.minFilter=An,P.generateMipmaps=!1):A=jg.sRGBToLinear(A):(xe!==gi||me!==Cr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",te)),A}this.allocateTextureUnit=B,this.resetTextureUnits=re,this.setTexture2D=$,this.setTexture2DArray=Z,this.setTexture3D=U,this.setTextureCube=Y,this.rebindTextures=Ie,this.setupRenderTarget=K,this.updateRenderTargetMipmap=Je,this.updateMultisampleRenderTarget=Fe,this.setupDepthRenderbuffer=de,this.setupFrameBufferTexture=Me,this.useMultisampledRTT=Re}function PT(r,e,t){const s=t.isWebGL2;function o(l,u=ri){let d;const f=Ct.getTransfer(u);if(l===Cr)return r.UNSIGNED_BYTE;if(l===Ug)return r.UNSIGNED_SHORT_4_4_4_4;if(l===Og)return r.UNSIGNED_SHORT_5_5_5_1;if(l===fy)return r.BYTE;if(l===hy)return r.SHORT;if(l===zd)return r.UNSIGNED_SHORT;if(l===Ng)return r.INT;if(l===Mr)return r.UNSIGNED_INT;if(l===Er)return r.FLOAT;if(l===ta)return s?r.HALF_FLOAT:(d=e.get("OES_texture_half_float"),d!==null?d.HALF_FLOAT_OES:null);if(l===py)return r.ALPHA;if(l===gi)return r.RGBA;if(l===my)return r.LUMINANCE;if(l===gy)return r.LUMINANCE_ALPHA;if(l===rs)return r.DEPTH_COMPONENT;if(l===io)return r.DEPTH_STENCIL;if(l===Pd)return d=e.get("EXT_sRGB"),d!==null?d.SRGB_ALPHA_EXT:null;if(l===vy)return r.RED;if(l===Fg)return r.RED_INTEGER;if(l===_y)return r.RG;if(l===kg)return r.RG_INTEGER;if(l===Bg)return r.RGBA_INTEGER;if(l===Vu||l===Wu||l===ju||l===Xu)if(f===It)if(d=e.get("WEBGL_compressed_texture_s3tc_srgb"),d!==null){if(l===Vu)return d.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(l===Wu)return d.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(l===ju)return d.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(l===Xu)return d.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(d=e.get("WEBGL_compressed_texture_s3tc"),d!==null){if(l===Vu)return d.COMPRESSED_RGB_S3TC_DXT1_EXT;if(l===Wu)return d.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(l===ju)return d.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(l===Xu)return d.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(l===Wp||l===jp||l===Xp||l===Yp)if(d=e.get("WEBGL_compressed_texture_pvrtc"),d!==null){if(l===Wp)return d.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(l===jp)return d.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(l===Xp)return d.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(l===Yp)return d.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(l===zg)return d=e.get("WEBGL_compressed_texture_etc1"),d!==null?d.COMPRESSED_RGB_ETC1_WEBGL:null;if(l===qp||l===$p)if(d=e.get("WEBGL_compressed_texture_etc"),d!==null){if(l===qp)return f===It?d.COMPRESSED_SRGB8_ETC2:d.COMPRESSED_RGB8_ETC2;if(l===$p)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:d.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(l===Kp||l===Zp||l===Qp||l===Jp||l===em||l===tm||l===nm||l===im||l===rm||l===sm||l===om||l===am||l===lm||l===cm)if(d=e.get("WEBGL_compressed_texture_astc"),d!==null){if(l===Kp)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:d.COMPRESSED_RGBA_ASTC_4x4_KHR;if(l===Zp)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:d.COMPRESSED_RGBA_ASTC_5x4_KHR;if(l===Qp)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:d.COMPRESSED_RGBA_ASTC_5x5_KHR;if(l===Jp)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:d.COMPRESSED_RGBA_ASTC_6x5_KHR;if(l===em)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:d.COMPRESSED_RGBA_ASTC_6x6_KHR;if(l===tm)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:d.COMPRESSED_RGBA_ASTC_8x5_KHR;if(l===nm)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:d.COMPRESSED_RGBA_ASTC_8x6_KHR;if(l===im)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:d.COMPRESSED_RGBA_ASTC_8x8_KHR;if(l===rm)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:d.COMPRESSED_RGBA_ASTC_10x5_KHR;if(l===sm)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:d.COMPRESSED_RGBA_ASTC_10x6_KHR;if(l===om)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:d.COMPRESSED_RGBA_ASTC_10x8_KHR;if(l===am)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:d.COMPRESSED_RGBA_ASTC_10x10_KHR;if(l===lm)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:d.COMPRESSED_RGBA_ASTC_12x10_KHR;if(l===cm)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:d.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(l===Yu||l===um||l===dm)if(d=e.get("EXT_texture_compression_bptc"),d!==null){if(l===Yu)return f===It?d.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:d.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(l===um)return d.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(l===dm)return d.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(l===xy||l===fm||l===hm||l===pm)if(d=e.get("EXT_texture_compression_rgtc"),d!==null){if(l===Yu)return d.COMPRESSED_RED_RGTC1_EXT;if(l===fm)return d.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(l===hm)return d.COMPRESSED_RED_GREEN_RGTC2_EXT;if(l===pm)return d.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return l===is?s?r.UNSIGNED_INT_24_8:(d=e.get("WEBGL_depth_texture"),d!==null?d.UNSIGNED_INT_24_8_WEBGL:null):r[l]!==void 0?r[l]:null}return{convert:o}}class DT extends ii{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Hl extends un{constructor(){super(),this.isGroup=!0,this.type="Group"}}const IT={type:"move"};class _d{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Hl,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Hl,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new ce,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new ce),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Hl,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new ce,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new ce),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const s of e.hand.values())this._getHandJoint(t,s)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,s){let o=null,l=null,u=null;const d=this._targetRay,f=this._grip,p=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(p&&e.hand){u=!0;for(const M of e.hand.values()){const x=t.getJointPose(M,s),y=this._getHandJoint(p,M);x!==null&&(y.matrix.fromArray(x.transform.matrix),y.matrix.decompose(y.position,y.rotation,y.scale),y.matrixWorldNeedsUpdate=!0,y.jointRadius=x.radius),y.visible=x!==null}const g=p.joints["index-finger-tip"],m=p.joints["thumb-tip"],_=g.position.distanceTo(m.position),S=.02,E=.005;p.inputState.pinching&&_>S+E?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!p.inputState.pinching&&_<=S-E&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else f!==null&&e.gripSpace&&(l=t.getPose(e.gripSpace,s),l!==null&&(f.matrix.fromArray(l.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,l.linearVelocity?(f.hasLinearVelocity=!0,f.linearVelocity.copy(l.linearVelocity)):f.hasLinearVelocity=!1,l.angularVelocity?(f.hasAngularVelocity=!0,f.angularVelocity.copy(l.angularVelocity)):f.hasAngularVelocity=!1));d!==null&&(o=t.getPose(e.targetRaySpace,s),o===null&&l!==null&&(o=l),o!==null&&(d.matrix.fromArray(o.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,o.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(o.linearVelocity)):d.hasLinearVelocity=!1,o.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(o.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(IT)))}return d!==null&&(d.visible=o!==null),f!==null&&(f.visible=l!==null),p!==null&&(p.visible=u!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const s=new Hl;s.matrixAutoUpdate=!1,s.visible=!1,e.joints[t.jointName]=s,e.add(s)}return e.joints[t.jointName]}}class NT extends ao{constructor(e,t){super();const s=this;let o=null,l=1,u=null,d="local-floor",f=1,p=null,g=null,m=null,_=null,S=null,E=null;const M=t.getContextAttributes();let x=null,y=null;const w=[],R=[],b=new Et;let z=null;const k=new ii;k.layers.enable(1),k.viewport=new sn;const N=new ii;N.layers.enable(2),N.viewport=new sn;const fe=[k,N],C=new DT;C.layers.enable(1),C.layers.enable(2);let L=null,ie=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let Q=w[V];return Q===void 0&&(Q=new _d,w[V]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(V){let Q=w[V];return Q===void 0&&(Q=new _d,w[V]=Q),Q.getGripSpace()},this.getHand=function(V){let Q=w[V];return Q===void 0&&(Q=new _d,w[V]=Q),Q.getHandSpace()};function se(V){const Q=R.indexOf(V.inputSource);if(Q===-1)return;const he=w[Q];he!==void 0&&(he.update(V.inputSource,V.frame,p||u),he.dispatchEvent({type:V.type,data:V.inputSource}))}function re(){o.removeEventListener("select",se),o.removeEventListener("selectstart",se),o.removeEventListener("selectend",se),o.removeEventListener("squeeze",se),o.removeEventListener("squeezestart",se),o.removeEventListener("squeezeend",se),o.removeEventListener("end",re),o.removeEventListener("inputsourceschange",B);for(let V=0;V<w.length;V++){const Q=R[V];Q!==null&&(R[V]=null,w[V].disconnect(Q))}L=null,ie=null,e.setRenderTarget(x),S=null,_=null,m=null,o=null,y=null,G.stop(),s.isPresenting=!1,e.setPixelRatio(z),e.setSize(b.width,b.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){l=V,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){d=V,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||u},this.setReferenceSpace=function(V){p=V},this.getBaseLayer=function(){return _!==null?_:S},this.getBinding=function(){return m},this.getFrame=function(){return E},this.getSession=function(){return o},this.setSession=async function(V){if(o=V,o!==null){if(x=e.getRenderTarget(),o.addEventListener("select",se),o.addEventListener("selectstart",se),o.addEventListener("selectend",se),o.addEventListener("squeeze",se),o.addEventListener("squeezestart",se),o.addEventListener("squeezeend",se),o.addEventListener("end",re),o.addEventListener("inputsourceschange",B),M.xrCompatible!==!0&&await t.makeXRCompatible(),z=e.getPixelRatio(),e.getSize(b),o.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const Q={antialias:o.renderState.layers===void 0?M.antialias:!0,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:l};S=new XRWebGLLayer(o,t,Q),o.updateRenderState({baseLayer:S}),e.setPixelRatio(1),e.setSize(S.framebufferWidth,S.framebufferHeight,!1),y=new os(S.framebufferWidth,S.framebufferHeight,{format:gi,type:Cr,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil})}else{let Q=null,he=null,_e=null;M.depth&&(_e=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Q=M.stencil?io:rs,he=M.stencil?is:Mr);const Me={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:l};m=new XRWebGLBinding(o,t),_=m.createProjectionLayer(Me),o.updateRenderState({layers:[_]}),e.setPixelRatio(1),e.setSize(_.textureWidth,_.textureHeight,!1),y=new os(_.textureWidth,_.textureHeight,{format:gi,type:Cr,depthTexture:new r0(_.textureWidth,_.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0});const Te=e.properties.get(y);Te.__ignoreDepthValues=_.ignoreDepthValues}y.isXRRenderTarget=!0,this.setFoveation(f),p=null,u=await o.requestReferenceSpace(d),G.setContext(o),G.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode};function B(V){for(let Q=0;Q<V.removed.length;Q++){const he=V.removed[Q],_e=R.indexOf(he);_e>=0&&(R[_e]=null,w[_e].disconnect(he))}for(let Q=0;Q<V.added.length;Q++){const he=V.added[Q];let _e=R.indexOf(he);if(_e===-1){for(let Te=0;Te<w.length;Te++)if(Te>=R.length){R.push(he),_e=Te;break}else if(R[Te]===null){R[Te]=he,_e=Te;break}if(_e===-1)break}const Me=w[_e];Me&&Me.connect(he)}}const H=new ce,$=new ce;function Z(V,Q,he){H.setFromMatrixPosition(Q.matrixWorld),$.setFromMatrixPosition(he.matrixWorld);const _e=H.distanceTo($),Me=Q.projectionMatrix.elements,Te=he.projectionMatrix.elements,pe=Me[14]/(Me[10]-1),de=Me[14]/(Me[10]+1),Ie=(Me[9]+1)/Me[5],K=(Me[9]-1)/Me[5],Je=(Me[8]-1)/Me[0],Fe=(Te[8]+1)/Te[0],Ve=pe*Je,Re=pe*Fe,rt=_e/(-Je+Fe),Be=rt*-Je;Q.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(Be),V.translateZ(rt),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert();const P=pe+rt,A=de+rt,te=Ve-Be,xe=Re+(_e-Be),me=Ie*de/A*P,ve=K*de/A*P;V.projectionMatrix.makePerspective(te,xe,me,ve,P,A),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}function U(V,Q){Q===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(Q.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(o===null)return;C.near=N.near=k.near=V.near,C.far=N.far=k.far=V.far,(L!==C.near||ie!==C.far)&&(o.updateRenderState({depthNear:C.near,depthFar:C.far}),L=C.near,ie=C.far);const Q=V.parent,he=C.cameras;U(C,Q);for(let _e=0;_e<he.length;_e++)U(he[_e],Q);he.length===2?Z(C,k,N):C.projectionMatrix.copy(k.projectionMatrix),Y(V,C,Q)};function Y(V,Q,he){he===null?V.matrix.copy(Q.matrixWorld):(V.matrix.copy(he.matrixWorld),V.matrix.invert(),V.matrix.multiply(Q.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(Q.projectionMatrix),V.projectionMatrixInverse.copy(Q.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=Dd*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return C},this.getFoveation=function(){if(!(_===null&&S===null))return f},this.setFoveation=function(V){f=V,_!==null&&(_.fixedFoveation=V),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=V)};let W=null;function I(V,Q){if(g=Q.getViewerPose(p||u),E=Q,g!==null){const he=g.views;S!==null&&(e.setRenderTargetFramebuffer(y,S.framebuffer),e.setRenderTarget(y));let _e=!1;he.length!==C.cameras.length&&(C.cameras.length=0,_e=!0);for(let Me=0;Me<he.length;Me++){const Te=he[Me];let pe=null;if(S!==null)pe=S.getViewport(Te);else{const Ie=m.getViewSubImage(_,Te);pe=Ie.viewport,Me===0&&(e.setRenderTargetTextures(y,Ie.colorTexture,_.ignoreDepthValues?void 0:Ie.depthStencilTexture),e.setRenderTarget(y))}let de=fe[Me];de===void 0&&(de=new ii,de.layers.enable(Me),de.viewport=new sn,fe[Me]=de),de.matrix.fromArray(Te.transform.matrix),de.matrix.decompose(de.position,de.quaternion,de.scale),de.projectionMatrix.fromArray(Te.projectionMatrix),de.projectionMatrixInverse.copy(de.projectionMatrix).invert(),de.viewport.set(pe.x,pe.y,pe.width,pe.height),Me===0&&(C.matrix.copy(de.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale)),_e===!0&&C.cameras.push(de)}}for(let he=0;he<w.length;he++){const _e=R[he],Me=w[he];_e!==null&&Me!==void 0&&Me.update(_e,Q,p||u)}W&&W(V,Q),Q.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:Q}),E=null}const G=new n0;G.setAnimationLoop(I),this.setAnimationLoop=function(V){W=V},this.dispose=function(){}}}function UT(r,e){function t(x,y){x.matrixAutoUpdate===!0&&x.updateMatrix(),y.value.copy(x.matrix)}function s(x,y){y.color.getRGB(x.fogColor.value,Jg(r)),y.isFog?(x.fogNear.value=y.near,x.fogFar.value=y.far):y.isFogExp2&&(x.fogDensity.value=y.density)}function o(x,y,w,R,b){y.isMeshBasicMaterial||y.isMeshLambertMaterial?l(x,y):y.isMeshToonMaterial?(l(x,y),m(x,y)):y.isMeshPhongMaterial?(l(x,y),g(x,y)):y.isMeshStandardMaterial?(l(x,y),_(x,y),y.isMeshPhysicalMaterial&&S(x,y,b)):y.isMeshMatcapMaterial?(l(x,y),E(x,y)):y.isMeshDepthMaterial?l(x,y):y.isMeshDistanceMaterial?(l(x,y),M(x,y)):y.isMeshNormalMaterial?l(x,y):y.isLineBasicMaterial?(u(x,y),y.isLineDashedMaterial&&d(x,y)):y.isPointsMaterial?f(x,y,w,R):y.isSpriteMaterial?p(x,y):y.isShadowMaterial?(x.color.value.copy(y.color),x.opacity.value=y.opacity):y.isShaderMaterial&&(y.uniformsNeedUpdate=!1)}function l(x,y){x.opacity.value=y.opacity,y.color&&x.diffuse.value.copy(y.color),y.emissive&&x.emissive.value.copy(y.emissive).multiplyScalar(y.emissiveIntensity),y.map&&(x.map.value=y.map,t(y.map,x.mapTransform)),y.alphaMap&&(x.alphaMap.value=y.alphaMap,t(y.alphaMap,x.alphaMapTransform)),y.bumpMap&&(x.bumpMap.value=y.bumpMap,t(y.bumpMap,x.bumpMapTransform),x.bumpScale.value=y.bumpScale,y.side===zn&&(x.bumpScale.value*=-1)),y.normalMap&&(x.normalMap.value=y.normalMap,t(y.normalMap,x.normalMapTransform),x.normalScale.value.copy(y.normalScale),y.side===zn&&x.normalScale.value.negate()),y.displacementMap&&(x.displacementMap.value=y.displacementMap,t(y.displacementMap,x.displacementMapTransform),x.displacementScale.value=y.displacementScale,x.displacementBias.value=y.displacementBias),y.emissiveMap&&(x.emissiveMap.value=y.emissiveMap,t(y.emissiveMap,x.emissiveMapTransform)),y.specularMap&&(x.specularMap.value=y.specularMap,t(y.specularMap,x.specularMapTransform)),y.alphaTest>0&&(x.alphaTest.value=y.alphaTest);const w=e.get(y).envMap;if(w&&(x.envMap.value=w,x.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=y.reflectivity,x.ior.value=y.ior,x.refractionRatio.value=y.refractionRatio),y.lightMap){x.lightMap.value=y.lightMap;const R=r._useLegacyLights===!0?Math.PI:1;x.lightMapIntensity.value=y.lightMapIntensity*R,t(y.lightMap,x.lightMapTransform)}y.aoMap&&(x.aoMap.value=y.aoMap,x.aoMapIntensity.value=y.aoMapIntensity,t(y.aoMap,x.aoMapTransform))}function u(x,y){x.diffuse.value.copy(y.color),x.opacity.value=y.opacity,y.map&&(x.map.value=y.map,t(y.map,x.mapTransform))}function d(x,y){x.dashSize.value=y.dashSize,x.totalSize.value=y.dashSize+y.gapSize,x.scale.value=y.scale}function f(x,y,w,R){x.diffuse.value.copy(y.color),x.opacity.value=y.opacity,x.size.value=y.size*w,x.scale.value=R*.5,y.map&&(x.map.value=y.map,t(y.map,x.uvTransform)),y.alphaMap&&(x.alphaMap.value=y.alphaMap,t(y.alphaMap,x.alphaMapTransform)),y.alphaTest>0&&(x.alphaTest.value=y.alphaTest)}function p(x,y){x.diffuse.value.copy(y.color),x.opacity.value=y.opacity,x.rotation.value=y.rotation,y.map&&(x.map.value=y.map,t(y.map,x.mapTransform)),y.alphaMap&&(x.alphaMap.value=y.alphaMap,t(y.alphaMap,x.alphaMapTransform)),y.alphaTest>0&&(x.alphaTest.value=y.alphaTest)}function g(x,y){x.specular.value.copy(y.specular),x.shininess.value=Math.max(y.shininess,1e-4)}function m(x,y){y.gradientMap&&(x.gradientMap.value=y.gradientMap)}function _(x,y){x.metalness.value=y.metalness,y.metalnessMap&&(x.metalnessMap.value=y.metalnessMap,t(y.metalnessMap,x.metalnessMapTransform)),x.roughness.value=y.roughness,y.roughnessMap&&(x.roughnessMap.value=y.roughnessMap,t(y.roughnessMap,x.roughnessMapTransform)),e.get(y).envMap&&(x.envMapIntensity.value=y.envMapIntensity)}function S(x,y,w){x.ior.value=y.ior,y.sheen>0&&(x.sheenColor.value.copy(y.sheenColor).multiplyScalar(y.sheen),x.sheenRoughness.value=y.sheenRoughness,y.sheenColorMap&&(x.sheenColorMap.value=y.sheenColorMap,t(y.sheenColorMap,x.sheenColorMapTransform)),y.sheenRoughnessMap&&(x.sheenRoughnessMap.value=y.sheenRoughnessMap,t(y.sheenRoughnessMap,x.sheenRoughnessMapTransform))),y.clearcoat>0&&(x.clearcoat.value=y.clearcoat,x.clearcoatRoughness.value=y.clearcoatRoughness,y.clearcoatMap&&(x.clearcoatMap.value=y.clearcoatMap,t(y.clearcoatMap,x.clearcoatMapTransform)),y.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=y.clearcoatRoughnessMap,t(y.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),y.clearcoatNormalMap&&(x.clearcoatNormalMap.value=y.clearcoatNormalMap,t(y.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(y.clearcoatNormalScale),y.side===zn&&x.clearcoatNormalScale.value.negate())),y.iridescence>0&&(x.iridescence.value=y.iridescence,x.iridescenceIOR.value=y.iridescenceIOR,x.iridescenceThicknessMinimum.value=y.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=y.iridescenceThicknessRange[1],y.iridescenceMap&&(x.iridescenceMap.value=y.iridescenceMap,t(y.iridescenceMap,x.iridescenceMapTransform)),y.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=y.iridescenceThicknessMap,t(y.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),y.transmission>0&&(x.transmission.value=y.transmission,x.transmissionSamplerMap.value=w.texture,x.transmissionSamplerSize.value.set(w.width,w.height),y.transmissionMap&&(x.transmissionMap.value=y.transmissionMap,t(y.transmissionMap,x.transmissionMapTransform)),x.thickness.value=y.thickness,y.thicknessMap&&(x.thicknessMap.value=y.thicknessMap,t(y.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=y.attenuationDistance,x.attenuationColor.value.copy(y.attenuationColor)),y.anisotropy>0&&(x.anisotropyVector.value.set(y.anisotropy*Math.cos(y.anisotropyRotation),y.anisotropy*Math.sin(y.anisotropyRotation)),y.anisotropyMap&&(x.anisotropyMap.value=y.anisotropyMap,t(y.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=y.specularIntensity,x.specularColor.value.copy(y.specularColor),y.specularColorMap&&(x.specularColorMap.value=y.specularColorMap,t(y.specularColorMap,x.specularColorMapTransform)),y.specularIntensityMap&&(x.specularIntensityMap.value=y.specularIntensityMap,t(y.specularIntensityMap,x.specularIntensityMapTransform))}function E(x,y){y.matcap&&(x.matcap.value=y.matcap)}function M(x,y){const w=e.get(y).light;x.referencePosition.value.setFromMatrixPosition(w.matrixWorld),x.nearDistance.value=w.shadow.camera.near,x.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:o}}function OT(r,e,t,s){let o={},l={},u=[];const d=t.isWebGL2?r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS):0;function f(w,R){const b=R.program;s.uniformBlockBinding(w,b)}function p(w,R){let b=o[w.id];b===void 0&&(E(w),b=g(w),o[w.id]=b,w.addEventListener("dispose",x));const z=R.program;s.updateUBOMapping(w,z);const k=e.render.frame;l[w.id]!==k&&(_(w),l[w.id]=k)}function g(w){const R=m();w.__bindingPointIndex=R;const b=r.createBuffer(),z=w.__size,k=w.usage;return r.bindBuffer(r.UNIFORM_BUFFER,b),r.bufferData(r.UNIFORM_BUFFER,z,k),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,R,b),b}function m(){for(let w=0;w<d;w++)if(u.indexOf(w)===-1)return u.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function _(w){const R=o[w.id],b=w.uniforms,z=w.__cache;r.bindBuffer(r.UNIFORM_BUFFER,R);for(let k=0,N=b.length;k<N;k++){const fe=Array.isArray(b[k])?b[k]:[b[k]];for(let C=0,L=fe.length;C<L;C++){const ie=fe[C];if(S(ie,k,C,z)===!0){const se=ie.__offset,re=Array.isArray(ie.value)?ie.value:[ie.value];let B=0;for(let H=0;H<re.length;H++){const $=re[H],Z=M($);typeof $=="number"||typeof $=="boolean"?(ie.__data[0]=$,r.bufferSubData(r.UNIFORM_BUFFER,se+B,ie.__data)):$.isMatrix3?(ie.__data[0]=$.elements[0],ie.__data[1]=$.elements[1],ie.__data[2]=$.elements[2],ie.__data[3]=0,ie.__data[4]=$.elements[3],ie.__data[5]=$.elements[4],ie.__data[6]=$.elements[5],ie.__data[7]=0,ie.__data[8]=$.elements[6],ie.__data[9]=$.elements[7],ie.__data[10]=$.elements[8],ie.__data[11]=0):($.toArray(ie.__data,B),B+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,se,ie.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function S(w,R,b,z){const k=w.value,N=R+"_"+b;if(z[N]===void 0)return typeof k=="number"||typeof k=="boolean"?z[N]=k:z[N]=k.clone(),!0;{const fe=z[N];if(typeof k=="number"||typeof k=="boolean"){if(fe!==k)return z[N]=k,!0}else if(fe.equals(k)===!1)return fe.copy(k),!0}return!1}function E(w){const R=w.uniforms;let b=0;const z=16;for(let N=0,fe=R.length;N<fe;N++){const C=Array.isArray(R[N])?R[N]:[R[N]];for(let L=0,ie=C.length;L<ie;L++){const se=C[L],re=Array.isArray(se.value)?se.value:[se.value];for(let B=0,H=re.length;B<H;B++){const $=re[B],Z=M($),U=b%z;U!==0&&z-U<Z.boundary&&(b+=z-U),se.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),se.__offset=b,b+=Z.storage}}}const k=b%z;return k>0&&(b+=z-k),w.__size=b,w.__cache={},this}function M(w){const R={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(R.boundary=4,R.storage=4):w.isVector2?(R.boundary=8,R.storage=8):w.isVector3||w.isColor?(R.boundary=16,R.storage=12):w.isVector4?(R.boundary=16,R.storage=16):w.isMatrix3?(R.boundary=48,R.storage=48):w.isMatrix4?(R.boundary=64,R.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),R}function x(w){const R=w.target;R.removeEventListener("dispose",x);const b=u.indexOf(R.__bindingPointIndex);u.splice(b,1),r.deleteBuffer(o[R.id]),delete o[R.id],delete l[R.id]}function y(){for(const w in o)r.deleteBuffer(o[w]);u=[],o={},l={}}return{bind:f,update:p,dispose:y}}class u0{constructor(e={}){const{canvas:t=Py(),context:s=null,depth:o=!0,stencil:l=!0,alpha:u=!1,antialias:d=!1,premultipliedAlpha:f=!0,preserveDrawingBuffer:p=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:m=!1}=e;this.isWebGLRenderer=!0;let _;s!==null?_=s.getContextAttributes().alpha:_=u;const S=new Uint32Array(4),E=new Int32Array(4);let M=null,x=null;const y=[],w=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=cn,this._useLegacyLights=!1,this.toneMapping=wr,this.toneMappingExposure=1;const R=this;let b=!1,z=0,k=0,N=null,fe=-1,C=null;const L=new sn,ie=new sn;let se=null;const re=new Mt(0);let B=0,H=t.width,$=t.height,Z=1,U=null,Y=null;const W=new sn(0,0,H,$),I=new sn(0,0,H,$);let G=!1;const V=new Vd;let Q=!1,he=!1,_e=null;const Me=new Kt,Te=new Et,pe=new ce,de={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ie(){return N===null?Z:1}let K=s;function Je(D,ee){for(let le=0;le<D.length;le++){const ue=D[le],ae=t.getContext(ue,ee);if(ae!==null)return ae}return null}try{const D={alpha:!0,depth:o,stencil:l,antialias:d,premultipliedAlpha:f,preserveDrawingBuffer:p,powerPreference:g,failIfMajorPerformanceCaveat:m};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Bd}`),t.addEventListener("webglcontextlost",be,!1),t.addEventListener("webglcontextrestored",X,!1),t.addEventListener("webglcontextcreationerror",Pe,!1),K===null){const ee=["webgl2","webgl","experimental-webgl"];if(R.isWebGL1Renderer===!0&&ee.shift(),K=Je(ee,D),K===null)throw Je(ee)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&K instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),K.getShaderPrecisionFormat===void 0&&(K.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(D){throw console.error("THREE.WebGLRenderer: "+D.message),D}let Fe,Ve,Re,rt,Be,P,A,te,xe,me,ve,Le,Ae,ze,$e,at,Se,pt,dt,it,qe,Ge,tt,mt;function Rt(){Fe=new XE(K),Ve=new zE(K,Fe,e),Fe.init(Ve),Ge=new PT(K,Fe,Ve),Re=new bT(K,Fe,Ve),rt=new $E(K),Be=new mT,P=new LT(K,Fe,Re,Be,Ve,Ge,rt),A=new GE(R),te=new jE(R),xe=new iS(K,Ve),tt=new kE(K,Fe,xe,Ve),me=new YE(K,xe,rt,tt),ve=new JE(K,me,xe,rt),dt=new QE(K,Ve,P),at=new HE(Be),Le=new pT(R,A,te,Fe,Ve,tt,at),Ae=new UT(R,Be),ze=new vT,$e=new ET(Fe,Ve),pt=new FE(R,A,te,Re,ve,_,f),Se=new RT(R,ve,Ve),mt=new OT(K,rt,Ve,Re),it=new BE(K,Fe,rt,Ve),qe=new qE(K,Fe,rt,Ve),rt.programs=Le.programs,R.capabilities=Ve,R.extensions=Fe,R.properties=Be,R.renderLists=ze,R.shadowMap=Se,R.state=Re,R.info=rt}Rt();const ct=new NT(R,K);this.xr=ct,this.getContext=function(){return K},this.getContextAttributes=function(){return K.getContextAttributes()},this.forceContextLoss=function(){const D=Fe.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){const D=Fe.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(D){D!==void 0&&(Z=D,this.setSize(H,$,!1))},this.getSize=function(D){return D.set(H,$)},this.setSize=function(D,ee,le=!0){if(ct.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=D,$=ee,t.width=Math.floor(D*Z),t.height=Math.floor(ee*Z),le===!0&&(t.style.width=D+"px",t.style.height=ee+"px"),this.setViewport(0,0,D,ee)},this.getDrawingBufferSize=function(D){return D.set(H*Z,$*Z).floor()},this.setDrawingBufferSize=function(D,ee,le){H=D,$=ee,Z=le,t.width=Math.floor(D*le),t.height=Math.floor(ee*le),this.setViewport(0,0,D,ee)},this.getCurrentViewport=function(D){return D.copy(L)},this.getViewport=function(D){return D.copy(W)},this.setViewport=function(D,ee,le,ue){D.isVector4?W.set(D.x,D.y,D.z,D.w):W.set(D,ee,le,ue),Re.viewport(L.copy(W).multiplyScalar(Z).floor())},this.getScissor=function(D){return D.copy(I)},this.setScissor=function(D,ee,le,ue){D.isVector4?I.set(D.x,D.y,D.z,D.w):I.set(D,ee,le,ue),Re.scissor(ie.copy(I).multiplyScalar(Z).floor())},this.getScissorTest=function(){return G},this.setScissorTest=function(D){Re.setScissorTest(G=D)},this.setOpaqueSort=function(D){U=D},this.setTransparentSort=function(D){Y=D},this.getClearColor=function(D){return D.copy(pt.getClearColor())},this.setClearColor=function(){pt.setClearColor.apply(pt,arguments)},this.getClearAlpha=function(){return pt.getClearAlpha()},this.setClearAlpha=function(){pt.setClearAlpha.apply(pt,arguments)},this.clear=function(D=!0,ee=!0,le=!0){let ue=0;if(D){let ae=!1;if(N!==null){const Ue=N.texture.format;ae=Ue===Bg||Ue===kg||Ue===Fg}if(ae){const Ue=N.texture.type,Ye=Ue===Cr||Ue===Mr||Ue===zd||Ue===is||Ue===Ug||Ue===Og,et=pt.getClearColor(),ke=pt.getClearAlpha(),ut=et.r,ot=et.g,lt=et.b;Ye?(S[0]=ut,S[1]=ot,S[2]=lt,S[3]=ke,K.clearBufferuiv(K.COLOR,0,S)):(E[0]=ut,E[1]=ot,E[2]=lt,E[3]=ke,K.clearBufferiv(K.COLOR,0,E))}else ue|=K.COLOR_BUFFER_BIT}ee&&(ue|=K.DEPTH_BUFFER_BIT),le&&(ue|=K.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),K.clear(ue)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",be,!1),t.removeEventListener("webglcontextrestored",X,!1),t.removeEventListener("webglcontextcreationerror",Pe,!1),ze.dispose(),$e.dispose(),Be.dispose(),A.dispose(),te.dispose(),ve.dispose(),tt.dispose(),mt.dispose(),Le.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",Jt),ct.removeEventListener("sessionend",yt),_e&&(_e.dispose(),_e=null),Yt.stop()};function be(D){D.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function X(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const D=rt.autoReset,ee=Se.enabled,le=Se.autoUpdate,ue=Se.needsUpdate,ae=Se.type;Rt(),rt.autoReset=D,Se.enabled=ee,Se.autoUpdate=le,Se.needsUpdate=ue,Se.type=ae}function Pe(D){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function Ne(D){const ee=D.target;ee.removeEventListener("dispose",Ne),nt(ee)}function nt(D){Ke(D),Be.remove(D)}function Ke(D){const ee=Be.get(D).programs;ee!==void 0&&(ee.forEach(function(le){Le.releaseProgram(le)}),D.isShaderMaterial&&Le.releaseShaderCache(D))}this.renderBufferDirect=function(D,ee,le,ue,ae,Ue){ee===null&&(ee=de);const Ye=ae.isMesh&&ae.matrixWorld.determinant()<0,et=tc(D,ee,le,ue,ae);Re.setMaterial(ue,Ye);let ke=le.index,ut=1;if(ue.wireframe===!0){if(ke=me.getWireframeAttribute(le),ke===void 0)return;ut=2}const ot=le.drawRange,lt=le.attributes.position;let bt=ot.start*ut,xn=(ot.start+ot.count)*ut;Ue!==null&&(bt=Math.max(bt,Ue.start*ut),xn=Math.min(xn,(Ue.start+Ue.count)*ut)),ke!==null?(bt=Math.max(bt,0),xn=Math.min(xn,ke.count)):lt!=null&&(bt=Math.max(bt,0),xn=Math.min(xn,lt.count));const Gt=xn-bt;if(Gt<0||Gt===1/0)return;tt.setup(ae,ue,et,le,ke);let Cn,_t=it;if(ke!==null&&(Cn=xe.get(ke),_t=qe,_t.setIndex(Cn)),ae.isMesh)ue.wireframe===!0?(Re.setLineWidth(ue.wireframeLinewidth*Ie()),_t.setMode(K.LINES)):_t.setMode(K.TRIANGLES);else if(ae.isLine){let ft=ue.linewidth;ft===void 0&&(ft=1),Re.setLineWidth(ft*Ie()),ae.isLineSegments?_t.setMode(K.LINES):ae.isLineLoop?_t.setMode(K.LINE_LOOP):_t.setMode(K.LINE_STRIP)}else ae.isPoints?_t.setMode(K.POINTS):ae.isSprite&&_t.setMode(K.TRIANGLES);if(ae.isBatchedMesh)_t.renderMultiDraw(ae._multiDrawStarts,ae._multiDrawCounts,ae._multiDrawCount);else if(ae.isInstancedMesh)_t.renderInstances(bt,Gt,ae.count);else if(le.isInstancedBufferGeometry){const ft=le._maxInstanceCount!==void 0?le._maxInstanceCount:1/0,yn=Math.min(le.instanceCount,ft);_t.renderInstances(bt,Gt,yn)}else _t.render(bt,Gt)};function Tt(D,ee,le){D.transparent===!0&&D.side===Vi&&D.forceSinglePass===!1?(D.side=zn,D.needsUpdate=!0,qi(D,ee,le),D.side=Rr,D.needsUpdate=!0,qi(D,ee,le),D.side=Vi):qi(D,ee,le)}this.compile=function(D,ee,le=null){le===null&&(le=D),x=$e.get(le),x.init(),w.push(x),le.traverseVisible(function(ae){ae.isLight&&ae.layers.test(ee.layers)&&(x.pushLight(ae),ae.castShadow&&x.pushShadow(ae))}),D!==le&&D.traverseVisible(function(ae){ae.isLight&&ae.layers.test(ee.layers)&&(x.pushLight(ae),ae.castShadow&&x.pushShadow(ae))}),x.setupLights(R._useLegacyLights);const ue=new Set;return D.traverse(function(ae){const Ue=ae.material;if(Ue)if(Array.isArray(Ue))for(let Ye=0;Ye<Ue.length;Ye++){const et=Ue[Ye];Tt(et,le,ae),ue.add(et)}else Tt(Ue,le,ae),ue.add(Ue)}),w.pop(),x=null,ue},this.compileAsync=function(D,ee,le=null){const ue=this.compile(D,ee,le);return new Promise(ae=>{function Ue(){if(ue.forEach(function(Ye){Be.get(Ye).currentProgram.isReady()&&ue.delete(Ye)}),ue.size===0){ae(D);return}setTimeout(Ue,10)}Fe.get("KHR_parallel_shader_compile")!==null?Ue():setTimeout(Ue,10)})};let wt=null;function Bt(D){wt&&wt(D)}function Jt(){Yt.stop()}function yt(){Yt.start()}const Yt=new n0;Yt.setAnimationLoop(Bt),typeof self<"u"&&Yt.setContext(self),this.setAnimationLoop=function(D){wt=D,ct.setAnimationLoop(D),D===null?Yt.stop():Yt.start()},ct.addEventListener("sessionstart",Jt),ct.addEventListener("sessionend",yt),this.render=function(D,ee){if(ee!==void 0&&ee.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),ee.parent===null&&ee.matrixWorldAutoUpdate===!0&&ee.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(ee),ee=ct.getCamera()),D.isScene===!0&&D.onBeforeRender(R,D,ee,N),x=$e.get(D,w.length),x.init(),w.push(x),Me.multiplyMatrices(ee.projectionMatrix,ee.matrixWorldInverse),V.setFromProjectionMatrix(Me),he=this.localClippingEnabled,Q=at.init(this.clippingPlanes,he),M=ze.get(D,y.length),M.init(),y.push(M),dn(D,ee,0,R.sortObjects),M.finish(),R.sortObjects===!0&&M.sort(U,Y),this.info.render.frame++,Q===!0&&at.beginShadows();const le=x.state.shadowsArray;if(Se.render(le,D,ee),Q===!0&&at.endShadows(),this.info.autoReset===!0&&this.info.reset(),pt.render(M,D),x.setupLights(R._useLegacyLights),ee.isArrayCamera){const ue=ee.cameras;for(let ae=0,Ue=ue.length;ae<Ue;ae++){const Ye=ue[ae];ua(M,D,Ye,Ye.viewport)}}else ua(M,D,ee);N!==null&&(P.updateMultisampleRenderTarget(N),P.updateRenderTargetMipmap(N)),D.isScene===!0&&D.onAfterRender(R,D,ee),tt.resetDefaultState(),fe=-1,C=null,w.pop(),w.length>0?x=w[w.length-1]:x=null,y.pop(),y.length>0?M=y[y.length-1]:M=null};function dn(D,ee,le,ue){if(D.visible===!1)return;if(D.layers.test(ee.layers)){if(D.isGroup)le=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(ee);else if(D.isLight)x.pushLight(D),D.castShadow&&x.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||V.intersectsSprite(D)){ue&&pe.setFromMatrixPosition(D.matrixWorld).applyMatrix4(Me);const Ye=ve.update(D),et=D.material;et.visible&&M.push(D,Ye,et,le,pe.z,null)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||V.intersectsObject(D))){const Ye=ve.update(D),et=D.material;if(ue&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),pe.copy(D.boundingSphere.center)):(Ye.boundingSphere===null&&Ye.computeBoundingSphere(),pe.copy(Ye.boundingSphere.center)),pe.applyMatrix4(D.matrixWorld).applyMatrix4(Me)),Array.isArray(et)){const ke=Ye.groups;for(let ut=0,ot=ke.length;ut<ot;ut++){const lt=ke[ut],bt=et[lt.materialIndex];bt&&bt.visible&&M.push(D,Ye,bt,le,pe.z,lt)}}else et.visible&&M.push(D,Ye,et,le,pe.z,null)}}const Ue=D.children;for(let Ye=0,et=Ue.length;Ye<et;Ye++)dn(Ue[Ye],ee,le,ue)}function ua(D,ee,le,ue){const ae=D.opaque,Ue=D.transmissive,Ye=D.transparent;x.setupLightsView(le),Q===!0&&at.setGlobalState(R.clippingPlanes,le),Ue.length>0&&Pr(ae,Ue,ee,le),ue&&Re.viewport(L.copy(ue)),ae.length>0&&Ai(ae,ee,le),Ue.length>0&&Ai(Ue,ee,le),Ye.length>0&&Ai(Ye,ee,le),Re.buffers.depth.setTest(!0),Re.buffers.depth.setMask(!0),Re.buffers.color.setMask(!0),Re.setPolygonOffset(!1)}function Pr(D,ee,le,ue){if((le.isScene===!0?le.overrideMaterial:null)!==null)return;const Ue=Ve.isWebGL2;_e===null&&(_e=new os(1,1,{generateMipmaps:!0,type:Fe.has("EXT_color_buffer_half_float")?ta:Cr,minFilter:Ar,samples:Ue?4:0})),R.getDrawingBufferSize(Te),Ue?_e.setSize(Te.x,Te.y):_e.setSize(Id(Te.x),Id(Te.y));const Ye=R.getRenderTarget();R.setRenderTarget(_e),R.getClearColor(re),B=R.getClearAlpha(),B<1&&R.setClearColor(16777215,.5),R.clear();const et=R.toneMapping;R.toneMapping=wr,Ai(D,le,ue),P.updateMultisampleRenderTarget(_e),P.updateRenderTargetMipmap(_e);let ke=!1;for(let ut=0,ot=ee.length;ut<ot;ut++){const lt=ee[ut],bt=lt.object,xn=lt.geometry,Gt=lt.material,Cn=lt.group;if(Gt.side===Vi&&bt.layers.test(ue.layers)){const _t=Gt.side;Gt.side=zn,Gt.needsUpdate=!0,Dr(bt,le,ue,xn,Gt,Cn),Gt.side=_t,Gt.needsUpdate=!0,ke=!0}}ke===!0&&(P.updateMultisampleRenderTarget(_e),P.updateRenderTargetMipmap(_e)),R.setRenderTarget(Ye),R.setClearColor(re,B),R.toneMapping=et}function Ai(D,ee,le){const ue=ee.isScene===!0?ee.overrideMaterial:null;for(let ae=0,Ue=D.length;ae<Ue;ae++){const Ye=D[ae],et=Ye.object,ke=Ye.geometry,ut=ue===null?Ye.material:ue,ot=Ye.group;et.layers.test(le.layers)&&Dr(et,ee,le,ke,ut,ot)}}function Dr(D,ee,le,ue,ae,Ue){D.onBeforeRender(R,ee,le,ue,ae,Ue),D.modelViewMatrix.multiplyMatrices(le.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),ae.onBeforeRender(R,ee,le,ue,D,Ue),ae.transparent===!0&&ae.side===Vi&&ae.forceSinglePass===!1?(ae.side=zn,ae.needsUpdate=!0,R.renderBufferDirect(le,ee,ue,ae,D,Ue),ae.side=Rr,ae.needsUpdate=!0,R.renderBufferDirect(le,ee,ue,ae,D,Ue),ae.side=Vi):R.renderBufferDirect(le,ee,ue,ae,D,Ue),D.onAfterRender(R,ee,le,ue,ae,Ue)}function qi(D,ee,le){ee.isScene!==!0&&(ee=de);const ue=Be.get(D),ae=x.state.lights,Ue=x.state.shadowsArray,Ye=ae.state.version,et=Le.getParameters(D,ae.state,Ue,ee,le),ke=Le.getProgramCacheKey(et);let ut=ue.programs;ue.environment=D.isMeshStandardMaterial?ee.environment:null,ue.fog=ee.fog,ue.envMap=(D.isMeshStandardMaterial?te:A).get(D.envMap||ue.environment),ut===void 0&&(D.addEventListener("dispose",Ne),ut=new Map,ue.programs=ut);let ot=ut.get(ke);if(ot!==void 0){if(ue.currentProgram===ot&&ue.lightsStateVersion===Ye)return fa(D,et),ot}else et.uniforms=Le.getUniforms(D),D.onBuild(le,et,R),D.onBeforeCompile(et,R),ot=Le.acquireProgram(et,ke),ut.set(ke,ot),ue.uniforms=et.uniforms;const lt=ue.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(lt.clippingPlanes=at.uniform),fa(D,et),ue.needsLights=ha(D),ue.lightsStateVersion=Ye,ue.needsLights&&(lt.ambientLightColor.value=ae.state.ambient,lt.lightProbe.value=ae.state.probe,lt.directionalLights.value=ae.state.directional,lt.directionalLightShadows.value=ae.state.directionalShadow,lt.spotLights.value=ae.state.spot,lt.spotLightShadows.value=ae.state.spotShadow,lt.rectAreaLights.value=ae.state.rectArea,lt.ltc_1.value=ae.state.rectAreaLTC1,lt.ltc_2.value=ae.state.rectAreaLTC2,lt.pointLights.value=ae.state.point,lt.pointLightShadows.value=ae.state.pointShadow,lt.hemisphereLights.value=ae.state.hemi,lt.directionalShadowMap.value=ae.state.directionalShadowMap,lt.directionalShadowMatrix.value=ae.state.directionalShadowMatrix,lt.spotShadowMap.value=ae.state.spotShadowMap,lt.spotLightMatrix.value=ae.state.spotLightMatrix,lt.spotLightMap.value=ae.state.spotLightMap,lt.pointShadowMap.value=ae.state.pointShadowMap,lt.pointShadowMatrix.value=ae.state.pointShadowMatrix),ue.currentProgram=ot,ue.uniformsList=null,ot}function da(D){if(D.uniformsList===null){const ee=D.currentProgram.getUniforms();D.uniformsList=Gl.seqWithValue(ee.seq,D.uniforms)}return D.uniformsList}function fa(D,ee){const le=Be.get(D);le.outputColorSpace=ee.outputColorSpace,le.batching=ee.batching,le.instancing=ee.instancing,le.instancingColor=ee.instancingColor,le.skinning=ee.skinning,le.morphTargets=ee.morphTargets,le.morphNormals=ee.morphNormals,le.morphColors=ee.morphColors,le.morphTargetsCount=ee.morphTargetsCount,le.numClippingPlanes=ee.numClippingPlanes,le.numIntersection=ee.numClipIntersection,le.vertexAlphas=ee.vertexAlphas,le.vertexTangents=ee.vertexTangents,le.toneMapping=ee.toneMapping}function tc(D,ee,le,ue,ae){ee.isScene!==!0&&(ee=de),P.resetTextureUnits();const Ue=ee.fog,Ye=ue.isMeshStandardMaterial?ee.environment:null,et=N===null?R.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:Yi,ke=(ue.isMeshStandardMaterial?te:A).get(ue.envMap||Ye),ut=ue.vertexColors===!0&&!!le.attributes.color&&le.attributes.color.itemSize===4,ot=!!le.attributes.tangent&&(!!ue.normalMap||ue.anisotropy>0),lt=!!le.morphAttributes.position,bt=!!le.morphAttributes.normal,xn=!!le.morphAttributes.color;let Gt=wr;ue.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(Gt=R.toneMapping);const Cn=le.morphAttributes.position||le.morphAttributes.normal||le.morphAttributes.color,_t=Cn!==void 0?Cn.length:0,ft=Be.get(ue),yn=x.state.lights;if(Q===!0&&(he===!0||D!==C)){const Rn=D===C&&ue.id===fe;at.setState(ue,D,Rn)}let Nt=!1;ue.version===ft.__version?(ft.needsLights&&ft.lightsStateVersion!==yn.state.version||ft.outputColorSpace!==et||ae.isBatchedMesh&&ft.batching===!1||!ae.isBatchedMesh&&ft.batching===!0||ae.isInstancedMesh&&ft.instancing===!1||!ae.isInstancedMesh&&ft.instancing===!0||ae.isSkinnedMesh&&ft.skinning===!1||!ae.isSkinnedMesh&&ft.skinning===!0||ae.isInstancedMesh&&ft.instancingColor===!0&&ae.instanceColor===null||ae.isInstancedMesh&&ft.instancingColor===!1&&ae.instanceColor!==null||ft.envMap!==ke||ue.fog===!0&&ft.fog!==Ue||ft.numClippingPlanes!==void 0&&(ft.numClippingPlanes!==at.numPlanes||ft.numIntersection!==at.numIntersection)||ft.vertexAlphas!==ut||ft.vertexTangents!==ot||ft.morphTargets!==lt||ft.morphNormals!==bt||ft.morphColors!==xn||ft.toneMapping!==Gt||Ve.isWebGL2===!0&&ft.morphTargetsCount!==_t)&&(Nt=!0):(Nt=!0,ft.__version=ue.version);let Ri=ft.currentProgram;Nt===!0&&(Ri=qi(ue,ee,ae));let pa=!1,vi=!1,$i=!1;const zt=Ri.getUniforms(),qn=ft.uniforms;if(Re.useProgram(Ri.program)&&(pa=!0,vi=!0,$i=!0),ue.id!==fe&&(fe=ue.id,vi=!0),pa||C!==D){zt.setValue(K,"projectionMatrix",D.projectionMatrix),zt.setValue(K,"viewMatrix",D.matrixWorldInverse);const Rn=zt.map.cameraPosition;Rn!==void 0&&Rn.setValue(K,pe.setFromMatrixPosition(D.matrixWorld)),Ve.logarithmicDepthBuffer&&zt.setValue(K,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),(ue.isMeshPhongMaterial||ue.isMeshToonMaterial||ue.isMeshLambertMaterial||ue.isMeshBasicMaterial||ue.isMeshStandardMaterial||ue.isShaderMaterial)&&zt.setValue(K,"isOrthographic",D.isOrthographicCamera===!0),C!==D&&(C=D,vi=!0,$i=!0)}if(ae.isSkinnedMesh){zt.setOptional(K,ae,"bindMatrix"),zt.setOptional(K,ae,"bindMatrixInverse");const Rn=ae.skeleton;Rn&&(Ve.floatVertexTextures?(Rn.boneTexture===null&&Rn.computeBoneTexture(),zt.setValue(K,"boneTexture",Rn.boneTexture,P)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}ae.isBatchedMesh&&(zt.setOptional(K,ae,"batchingTexture"),zt.setValue(K,"batchingTexture",ae._matricesTexture,P));const co=le.morphAttributes;if((co.position!==void 0||co.normal!==void 0||co.color!==void 0&&Ve.isWebGL2===!0)&&dt.update(ae,le,Ri),(vi||ft.receiveShadow!==ae.receiveShadow)&&(ft.receiveShadow=ae.receiveShadow,zt.setValue(K,"receiveShadow",ae.receiveShadow)),ue.isMeshGouraudMaterial&&ue.envMap!==null&&(qn.envMap.value=ke,qn.flipEnvMap.value=ke.isCubeTexture&&ke.isRenderTargetTexture===!1?-1:1),vi&&(zt.setValue(K,"toneMappingExposure",R.toneMappingExposure),ft.needsLights&&Ci(qn,$i),Ue&&ue.fog===!0&&Ae.refreshFogUniforms(qn,Ue),Ae.refreshMaterialUniforms(qn,ue,Z,$,_e),Gl.upload(K,da(ft),qn,P)),ue.isShaderMaterial&&ue.uniformsNeedUpdate===!0&&(Gl.upload(K,da(ft),qn,P),ue.uniformsNeedUpdate=!1),ue.isSpriteMaterial&&zt.setValue(K,"center",ae.center),zt.setValue(K,"modelViewMatrix",ae.modelViewMatrix),zt.setValue(K,"normalMatrix",ae.normalMatrix),zt.setValue(K,"modelMatrix",ae.matrixWorld),ue.isShaderMaterial||ue.isRawShaderMaterial){const Rn=ue.uniformsGroups;for(let Ir=0,ma=Rn.length;Ir<ma;Ir++)if(Ve.isWebGL2){const ls=Rn[Ir];mt.update(ls,Ri),mt.bind(ls,Ri)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Ri}function Ci(D,ee){D.ambientLightColor.needsUpdate=ee,D.lightProbe.needsUpdate=ee,D.directionalLights.needsUpdate=ee,D.directionalLightShadows.needsUpdate=ee,D.pointLights.needsUpdate=ee,D.pointLightShadows.needsUpdate=ee,D.spotLights.needsUpdate=ee,D.spotLightShadows.needsUpdate=ee,D.rectAreaLights.needsUpdate=ee,D.hemisphereLights.needsUpdate=ee}function ha(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(D,ee,le){Be.get(D.texture).__webglTexture=ee,Be.get(D.depthTexture).__webglTexture=le;const ue=Be.get(D);ue.__hasExternalTextures=!0,ue.__hasExternalTextures&&(ue.__autoAllocateDepthBuffer=le===void 0,ue.__autoAllocateDepthBuffer||Fe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ue.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(D,ee){const le=Be.get(D);le.__webglFramebuffer=ee,le.__useDefaultFramebuffer=ee===void 0},this.setRenderTarget=function(D,ee=0,le=0){N=D,z=ee,k=le;let ue=!0,ae=null,Ue=!1,Ye=!1;if(D){const ke=Be.get(D);ke.__useDefaultFramebuffer!==void 0?(Re.bindFramebuffer(K.FRAMEBUFFER,null),ue=!1):ke.__webglFramebuffer===void 0?P.setupRenderTarget(D):ke.__hasExternalTextures&&P.rebindTextures(D,Be.get(D.texture).__webglTexture,Be.get(D.depthTexture).__webglTexture);const ut=D.texture;(ut.isData3DTexture||ut.isDataArrayTexture||ut.isCompressedArrayTexture)&&(Ye=!0);const ot=Be.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray(ot[ee])?ae=ot[ee][le]:ae=ot[ee],Ue=!0):Ve.isWebGL2&&D.samples>0&&P.useMultisampledRTT(D)===!1?ae=Be.get(D).__webglMultisampledFramebuffer:Array.isArray(ot)?ae=ot[le]:ae=ot,L.copy(D.viewport),ie.copy(D.scissor),se=D.scissorTest}else L.copy(W).multiplyScalar(Z).floor(),ie.copy(I).multiplyScalar(Z).floor(),se=G;if(Re.bindFramebuffer(K.FRAMEBUFFER,ae)&&Ve.drawBuffers&&ue&&Re.drawBuffers(D,ae),Re.viewport(L),Re.scissor(ie),Re.setScissorTest(se),Ue){const ke=Be.get(D.texture);K.framebufferTexture2D(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ke.__webglTexture,le)}else if(Ye){const ke=Be.get(D.texture),ut=ee||0;K.framebufferTextureLayer(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0,ke.__webglTexture,le||0,ut)}fe=-1},this.readRenderTargetPixels=function(D,ee,le,ue,ae,Ue,Ye){if(!(D&&D.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let et=Be.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Ye!==void 0&&(et=et[Ye]),et){Re.bindFramebuffer(K.FRAMEBUFFER,et);try{const ke=D.texture,ut=ke.format,ot=ke.type;if(ut!==gi&&Ge.convert(ut)!==K.getParameter(K.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const lt=ot===ta&&(Fe.has("EXT_color_buffer_half_float")||Ve.isWebGL2&&Fe.has("EXT_color_buffer_float"));if(ot!==Cr&&Ge.convert(ot)!==K.getParameter(K.IMPLEMENTATION_COLOR_READ_TYPE)&&!(ot===Er&&(Ve.isWebGL2||Fe.has("OES_texture_float")||Fe.has("WEBGL_color_buffer_float")))&&!lt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}ee>=0&&ee<=D.width-ue&&le>=0&&le<=D.height-ae&&K.readPixels(ee,le,ue,ae,Ge.convert(ut),Ge.convert(ot),Ue)}finally{const ke=N!==null?Be.get(N).__webglFramebuffer:null;Re.bindFramebuffer(K.FRAMEBUFFER,ke)}}},this.copyFramebufferToTexture=function(D,ee,le=0){const ue=Math.pow(2,-le),ae=Math.floor(ee.image.width*ue),Ue=Math.floor(ee.image.height*ue);P.setTexture2D(ee,0),K.copyTexSubImage2D(K.TEXTURE_2D,le,0,0,D.x,D.y,ae,Ue),Re.unbindTexture()},this.copyTextureToTexture=function(D,ee,le,ue=0){const ae=ee.image.width,Ue=ee.image.height,Ye=Ge.convert(le.format),et=Ge.convert(le.type);P.setTexture2D(le,0),K.pixelStorei(K.UNPACK_FLIP_Y_WEBGL,le.flipY),K.pixelStorei(K.UNPACK_PREMULTIPLY_ALPHA_WEBGL,le.premultiplyAlpha),K.pixelStorei(K.UNPACK_ALIGNMENT,le.unpackAlignment),ee.isDataTexture?K.texSubImage2D(K.TEXTURE_2D,ue,D.x,D.y,ae,Ue,Ye,et,ee.image.data):ee.isCompressedTexture?K.compressedTexSubImage2D(K.TEXTURE_2D,ue,D.x,D.y,ee.mipmaps[0].width,ee.mipmaps[0].height,Ye,ee.mipmaps[0].data):K.texSubImage2D(K.TEXTURE_2D,ue,D.x,D.y,Ye,et,ee.image),ue===0&&le.generateMipmaps&&K.generateMipmap(K.TEXTURE_2D),Re.unbindTexture()},this.copyTextureToTexture3D=function(D,ee,le,ue,ae=0){if(R.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Ue=D.max.x-D.min.x+1,Ye=D.max.y-D.min.y+1,et=D.max.z-D.min.z+1,ke=Ge.convert(ue.format),ut=Ge.convert(ue.type);let ot;if(ue.isData3DTexture)P.setTexture3D(ue,0),ot=K.TEXTURE_3D;else if(ue.isDataArrayTexture||ue.isCompressedArrayTexture)P.setTexture2DArray(ue,0),ot=K.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}K.pixelStorei(K.UNPACK_FLIP_Y_WEBGL,ue.flipY),K.pixelStorei(K.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ue.premultiplyAlpha),K.pixelStorei(K.UNPACK_ALIGNMENT,ue.unpackAlignment);const lt=K.getParameter(K.UNPACK_ROW_LENGTH),bt=K.getParameter(K.UNPACK_IMAGE_HEIGHT),xn=K.getParameter(K.UNPACK_SKIP_PIXELS),Gt=K.getParameter(K.UNPACK_SKIP_ROWS),Cn=K.getParameter(K.UNPACK_SKIP_IMAGES),_t=le.isCompressedTexture?le.mipmaps[ae]:le.image;K.pixelStorei(K.UNPACK_ROW_LENGTH,_t.width),K.pixelStorei(K.UNPACK_IMAGE_HEIGHT,_t.height),K.pixelStorei(K.UNPACK_SKIP_PIXELS,D.min.x),K.pixelStorei(K.UNPACK_SKIP_ROWS,D.min.y),K.pixelStorei(K.UNPACK_SKIP_IMAGES,D.min.z),le.isDataTexture||le.isData3DTexture?K.texSubImage3D(ot,ae,ee.x,ee.y,ee.z,Ue,Ye,et,ke,ut,_t.data):le.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),K.compressedTexSubImage3D(ot,ae,ee.x,ee.y,ee.z,Ue,Ye,et,ke,_t.data)):K.texSubImage3D(ot,ae,ee.x,ee.y,ee.z,Ue,Ye,et,ke,ut,_t),K.pixelStorei(K.UNPACK_ROW_LENGTH,lt),K.pixelStorei(K.UNPACK_IMAGE_HEIGHT,bt),K.pixelStorei(K.UNPACK_SKIP_PIXELS,xn),K.pixelStorei(K.UNPACK_SKIP_ROWS,Gt),K.pixelStorei(K.UNPACK_SKIP_IMAGES,Cn),ae===0&&ue.generateMipmaps&&K.generateMipmap(ot),Re.unbindTexture()},this.initTexture=function(D){D.isCubeTexture?P.setTextureCube(D,0):D.isData3DTexture?P.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?P.setTexture2DArray(D,0):P.setTexture2D(D,0),Re.unbindTexture()},this.resetState=function(){z=0,k=0,N=null,Re.reset(),tt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ji}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Hd?"display-p3":"srgb",t.unpackColorSpace=Ct.workingColorSpace===Ql?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===cn?ss:Hg}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===ss?cn:Yi}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class FT extends u0{}FT.prototype.isWebGL1Renderer=!0;class kT extends un{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class xd extends Hn{constructor(e,t,s,o,l,u,d,f,p){super(e,t,s,o,l,u,d,f,p),this.isCanvasTexture=!0,this.needsUpdate=!0}}class BT extends la{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Mt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Mt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Gg,this.normalScale=new Et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Xd extends un{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Mt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class zT extends Xd{constructor(e,t,s){super(e,s),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(un.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Mt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const yd=new Kt,ig=new ce,rg=new ce;class HT{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Et(512,512),this.map=null,this.mapPass=null,this.matrix=new Kt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Vd,this._frameExtents=new Et(1,1),this._viewportCount=1,this._viewports=[new sn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,s=this.matrix;ig.setFromMatrixPosition(e.matrixWorld),t.position.copy(ig),rg.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(rg),t.updateMatrixWorld(),yd.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(yd),s.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),s.multiply(yd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class GT extends HT{constructor(){super(new i0(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class VT extends Xd{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(un.DEFAULT_UP),this.updateMatrix(),this.target=new un,this.shadow=new GT}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class WT extends Xd{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Bd}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Bd);function sg(r,e=.3){const t=r.gridWidth,s=r.gridHeight,o=Array.isArray(r.cells)?r.cells:[],l=new Uint8ClampedArray(t*s*4);function u(p,g){if(s===0||t===0)return 0;const m=Math.max(0,Math.min(s-1,p));let _=g%t;_<0&&(_+=t);const S=m*t+_,E=o[S];if(!E)return 0;const M=typeof E.baseHeight=="number"?E.baseHeight:typeof E.height=="number"?E.height:0,x=typeof E.editHeightDelta=="number"?E.editHeightDelta:0,y=typeof E.simHeightDelta=="number"?E.simHeightDelta:0;return M+x+y}function d(p,g){u(p,g);const m=u(p,g-1),_=u(p,g+1),S=u(p-1,g),E=u(p+1,g),M=(_-m)*e,x=(E-S)*e,y=-M,w=-x,R=1,b=Math.sqrt(y*y+w*w+R*R);return b<1e-8?[0,0,1]:[y/b,w/b,R/b]}let f=0;for(let p=0;p<s;p++)for(let g=0;g<t;g++){const[m,_,S]=d(p,g);l[f++]=Math.round((m*.5+.5)*255),l[f++]=Math.round((_*.5+.5)*255),l[f++]=Math.round((S*.5+.5)*255),l[f++]=255}return{width:t,height:s,rgba:l}}function og(r){const e=document.createElement("canvas");e.width=r.width,e.height=r.height;const t=e.getContext("2d");if(!t)throw new Error("Failed to create canvas 2D context for normal map");const s=t.createImageData(r.width,r.height);return s.data.set(r.rgba),t.putImageData(s,0,0),e}function Yd({world:r,preview:e,className:t,style:s}){const o=ge.useRef(null),l=ge.useRef(null),u=ge.useRef(null),d=ge.useRef({x:0,y:0});return ge.useEffect(()=>{const f=o.current;if(!f)return;const p=f.clientWidth||800,g=f.clientHeight||600,m=new kT;let _=u.current;_?(_.aspect=p/g,_.updateProjectionMatrix()):(_=new ii(45,p/g,.1,100),_.position.set(0,0,2.6),u.current=_);const S=new u0({antialias:!0,alpha:!0});S.setPixelRatio(window.devicePixelRatio||1),S.setSize(p,g,!1),f.appendChild(S.domElement);const E=new zT(16777215,4473924,.6);m.add(E);const M=new VT(16777215,1);M.position.set(5,3,5),m.add(M);const x=new WT(16777215,.2);m.add(x);const y=document.createElement("canvas");l.current=y;function w(){let pe=e;if(!pe&&r&&(console.log("[Globe3D] Generating preview from world"),pe=oo(r)),!pe)throw new Error("No preview available");console.log("[Globe3D] Creating texture from preview:",pe.width,"x",pe.height,"rgba buffer:",pe.rgba instanceof Uint8ClampedArray);const de=pe.width,Ie=pe.height;if(pe.rgba&&pe.rgba instanceof Uint8ClampedArray){y.width=de,y.height=Ie;const Je=y.getContext("2d");if(!Je)throw new Error("Failed to create texture canvas 2D context");const Fe=new ImageData(pe.rgba,de,Ie);Je.putImageData(Fe,0,0);const Ve=Je.getImageData(0,0,de,Ie),Re=Ve.data;let rt=0,Be=0,P=0;for(let me=0;me<de;me++){const ve=me*4;rt+=Re[ve],Be+=Re[ve+1],P+=Re[ve+2]}rt=Math.round(rt/de),Be=Math.round(Be/de),P=Math.round(P/de);for(let me=0;me<de;me++){const ve=me*4;Re[ve]=rt,Re[ve+1]=Be,Re[ve+2]=P}let A=0,te=0,xe=0;for(let me=0;me<de;me++){const ve=((Ie-1)*de+me)*4;A+=Re[ve],te+=Re[ve+1],xe+=Re[ve+2]}A=Math.round(A/de),te=Math.round(te/de),xe=Math.round(xe/de);for(let me=0;me<de;me++){const ve=((Ie-1)*de+me)*4;Re[ve]=A,Re[ve+1]=te,Re[ve+2]=xe}Je.putImageData(Ve,0,0)}else{y.width=de,y.height=Ie;const Je=y.getContext("2d");if(!Je)throw new Error("Failed to create texture canvas 2D context");const Fe=Je.createImageData(de,Ie),Ve=Fe.data,Re=.5/Ie;for(let Le=0;Le<Ie;Le++){const Ae=Le/(Ie-1),$e=Math.max(Re,Math.min(1-Re,Ae))*(Ie-1),at=Math.floor($e),Se=Math.max(0,Math.min(Ie-1,at));for(let pt=0;pt<de;pt++){const it=pt/de*de,qe=Math.floor(it)%de,Ge=Se*de+qe,tt=pe.sampleGlobeColor?pe.sampleGlobeColor(Ge):[255,0,255,255],mt=(Le*de+pt)*4;Ve[mt+0]=tt[0],Ve[mt+1]=tt[1],Ve[mt+2]=tt[2],Ve[mt+3]=tt[3]}}Je.putImageData(Fe,0,0);const rt=Je.getImageData(0,0,de,Ie),Be=rt.data;let P=0,A=0,te=0;for(let Le=0;Le<de;Le++){const Ae=Le*4;P+=Be[Ae],A+=Be[Ae+1],te+=Be[Ae+2]}P=Math.round(P/de),A=Math.round(A/de),te=Math.round(te/de);for(let Le=0;Le<de;Le++){const Ae=Le*4;Be[Ae]=P,Be[Ae+1]=A,Be[Ae+2]=te}let xe=0,me=0,ve=0;for(let Le=0;Le<de;Le++){const Ae=((Ie-1)*de+Le)*4;xe+=Be[Ae],me+=Be[Ae+1],ve+=Be[Ae+2]}xe=Math.round(xe/de),me=Math.round(me/de),ve=Math.round(ve/de);for(let Le=0;Le<de;Le++){const Ae=((Ie-1)*de+Le)*4;Be[Ae]=xe,Be[Ae+1]=me,Be[Ae+2]=ve}Je.putImageData(rt,0,0)}const K=new xd(y);return K.wrapS=Qs,K.wrapT=Bn,K.magFilter=An,K.minFilter=Ar,K.generateMipmaps=!0,K.anisotropy=S.capabilities.getMaxAnisotropy(),K.flipY=!1,K.needsUpdate=!0,K}const R=w();let b=null;if(r)try{const pe=sg(r,.3),de=og(pe);b=new xd(de),b.wrapS=Qs,b.wrapT=Bn,b.magFilter=An,b.minFilter=Ar,b.generateMipmaps=!0,b.anisotropy=S.capabilities.getMaxAnisotropy(),b.flipY=!1,b.needsUpdate=!0}catch(pe){console.warn("[Globe3D] Failed to generate normal map:",pe)}const z=128,k=64,N=new Lr,fe=[],C=[],L=[],ie=[];for(let pe=0;pe<=k;pe++){const de=pe/k,Ie=de*Math.PI;for(let K=0;K<=z;K++){const Je=K/z,Fe=Je*Math.PI*2,Ve=-Math.sin(Ie)*Math.cos(Fe),Re=Math.cos(Ie),rt=Math.sin(Ie)*Math.sin(Fe);fe.push(Ve,Re,rt),C.push(Ve,Re,rt),L.push(Je,de)}}for(let pe=0;pe<k;pe++)for(let de=0;de<z;de++){const Ie=pe*(z+1)+de,K=Ie+z+1,Je=Ie+1,Fe=K+1;ie.push(Ie,K,Je),ie.push(K,Fe,Je)}N.setIndex(ie),N.setAttribute("position",new wi(fe,3)),N.setAttribute("normal",new wi(C,3)),N.setAttribute("uv",new wi(L,2));const se=new BT({map:R,normalMap:b,metalness:0,roughness:.9,flatShading:!1}),re=new Xi(N,se);re.rotation.x=d.current.x,re.rotation.y=d.current.y,m.add(re);let B=null;performance.now();let H=!1,$=0,Z=0,U=0,Y=0;function W(){const pe=o.current;if(!pe||!_)return;const de=pe.clientWidth||800,Ie=pe.clientHeight||600;_.aspect=de/Ie,_.updateProjectionMatrix(),S.setSize(de,Ie,!1)}window.addEventListener("resize",W);function I(){_&&((Math.abs(U)>1e-5||Math.abs(Y)>1e-5)&&(re.rotation.y+=U,re.rotation.x=Math.max(Math.min(re.rotation.x+Y,Math.PI/2-.1),-Math.PI/2+.1),d.current.x=re.rotation.x,d.current.y=re.rotation.y,U*=.92,Y*=.92),S.render(m,_),B=requestAnimationFrame(I))}I();const G=()=>{try{const pe=w();if(se.map&&se.map.dispose(),se.map=pe,r){const de=sg(r,.3),Ie=og(de),K=new xd(Ie);K.wrapS=Qs,K.wrapT=Bn,K.magFilter=An,K.minFilter=Ar,K.generateMipmaps=!0,K.anisotropy=S.capabilities.getMaxAnisotropy(),K.flipY=!1,K.needsUpdate=!0,se.normalMap&&se.normalMap.dispose(),se.normalMap=K}se.needsUpdate=!0}catch{}},V=S.domElement;function Q(pe){const de=V.getBoundingClientRect();return{x:pe.clientX-de.left,y:pe.clientY-de.top}}function he(pe){H=!0,V.setPointerCapture(pe.pointerId);const de=Q(pe);$=de.x,Z=de.y,U=0,Y=0}function _e(pe){if(!H)return;const de=Q(pe),Ie=de.x-$,K=de.y-Z;$=de.x,Z=de.y;const Je=.0025;re.rotation.y+=-Ie*Je,re.rotation.x+=-K*Je,re.rotation.x=Math.max(Math.min(re.rotation.x,Math.PI/2-.1),-Math.PI/2+.1),d.current.x=re.rotation.x,d.current.y=re.rotation.y,U=-Ie*Je*.6+U*.4,Y=-K*Je*.6+Y*.4}function Me(pe){H=!1;try{V.releasePointerCapture(pe.pointerId)}catch{}}function Te(pe){if(!_)return;pe.preventDefault();const de=pe.deltaY>0?.2:-.2;_.position.z=Math.max(1.6,Math.min(6,_.position.z+de))}return V.addEventListener("pointerdown",he),V.addEventListener("pointermove",_e),V.addEventListener("pointerup",Me),V.addEventListener("pointercancel",Me),V.addEventListener("wheel",Te,{passive:!1}),G(),()=>{B&&cancelAnimationFrame(B),window.removeEventListener("resize",W);try{V.removeEventListener("pointerdown",he),V.removeEventListener("pointermove",_e),V.removeEventListener("pointerup",Me),V.removeEventListener("pointercancel",Me),V.removeEventListener("wheel",Te)}catch{}try{S.dispose()}catch{}S.domElement&&S.domElement.parentElement&&S.domElement.parentElement.removeChild(S.domElement)}},[r,e]),O.jsx("div",{ref:o,className:t,style:{width:"100%",height:"100%",...s}})}function jT({world:r,error:e}){const t=ge.useMemo(()=>r?oo(r):null,[r]),s=ge.useMemo(()=>r?r.metadata:null,[r]);return O.jsxs("div",{style:{position:"absolute",inset:0,display:"flex",flexDirection:"column",background:"#000"},children:[O.jsxs("div",{style:{padding:12,display:"flex",justifyContent:"space-between",gap:10,background:"rgba(0,0,0,0.7)"},children:[O.jsx("div",{style:{fontWeight:900,color:"#fff"},children:"World Preview"}),s&&O.jsxs("div",{style:{fontSize:12,opacity:.75,color:"#fff"},children:[s.styleMode," • ",s.gridWidth,"×",s.gridHeight," • seed ",s.seed]})]}),e?O.jsx("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",color:"#f66",padding:20},children:e}):r?O.jsx("div",{style:{flex:1,position:"relative"},children:O.jsx(Yd,{world:r,preview:t,style:{width:"100%",height:"100%"}})}):O.jsx("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,0.6)",fontSize:16},children:"Configure parameters and click Generate"})]})}function XT(){const r=ra(),[e,t]=ge.useState(null),[s,o]=ge.useState(!1),[l,u]=ge.useState(null);ge.useMemo(()=>e?oo(e):null,[e]);async function d(m){u(null);try{await ln.createWorld(m);const _=ln.getWorld();t(_)}catch(_){console.error(_),u(_?.message||"Generate failed.")}}async function f(){if(e){o(!0),u(null);try{const m=await Rg(e);r(`/create/${m.metadata.id}`)}catch(m){console.error(m),u(m?.message||"Save failed.")}finally{o(!1)}}}const p=[{id:"generate",title:"Generate",tools:[{id:"gen",label:"Generate",disabled:!0},{id:"save",label:s?"Saving…":"Save → Create",disabled:!e||s,onClick:f}]}],g=O.jsx(Lx,{onGenerate:d,onSave:f,saving:s,disabled:!e});return O.jsx(ns,{mode:"generate",onGoHome:()=>r("/"),worldName:e?.metadata?.name||"Generate",isDirty:!0,rightPanel:g,toolGroups:p,children:O.jsx(jT,{world:e,error:l})})}function YT(r,e){const t=r.getContext("2d");if(!t)return;const s=oo(e),o=s.width,l=s.height,u=2;r.width=o*u,r.height=l*u;const d=t.createImageData(o,l),f=d.data;for(let M=0;M<l;M++)for(let x=0;x<o;x++){const y=s.minimapColorAt(x,M),w=(M*o+x)*4;f[w+0]=y[0],f[w+1]=y[1],f[w+2]=y[2],f[w+3]=y[3]}const p=document.createElement("canvas");p.width=o,p.height=l;const g=p.getContext("2d");if(!g)return;g.putImageData(d,0,0),t.imageSmoothingEnabled=!1,t.clearRect(0,0,r.width,r.height),t.drawImage(p,0,0,o*u,l*u);const m=Math.max(20,Math.floor(o*u*.25)),_=Math.max(16,Math.floor(l*u*.25)),S=Math.floor((o*u-m)/2),E=Math.floor((l*u-_)/2);t.strokeStyle="rgba(255,255,255,0.95)",t.lineWidth=2,t.strokeRect(S+.5,E+.5,m,_),t.strokeStyle="rgba(0,0,0,0.55)",t.lineWidth=1,t.strokeRect(S+1.5,E+1.5,m-2,_-2)}function qT({world:r}){const e=ge.useRef(null);return ge.useEffect(()=>{if(e.current)try{YT(e.current,r)}catch(t){console.error("Minimap draw failed:",t)}},[r]),O.jsx("div",{style:{position:"absolute",inset:0},children:O.jsx("canvas",{ref:e,style:{width:"100%",height:"100%",display:"block",background:"#111"}})})}class $T{constructor(e,t,s){this.world=e,this.onStateChange=t,this.onWorldChange=s,this.state={enabled:!1,tool:"RAISE",brushParams:{shape:"CIRCLE",falloff:"SOFT",radius:10,strength:.5},isDrawing:!1}}state;actionHistory=[];pendingStrokeSamples=[];recomputeThrottleTimer=null;lastApplyTime=0;setTool(e){this.state.tool=e,this.state.enabled=!0,this.notifyStateChange()}disable(){this.state.enabled=!1,this.state.isDrawing=!1,this.notifyStateChange()}setBrushParams(e){this.state.brushParams={...this.state.brushParams,...e},this.notifyStateChange()}getState(){return{...this.state}}setWorld(e){this.world=e}startStroke(e,t){!this.state.enabled||!this.world||(this.state.isDrawing=!0,this.actionHistory=[],this.applyBrushAtCell(e,t))}continueStroke(e,t){!this.state.isDrawing||!this.state.enabled||!this.world||this.applyBrushAtCell(e,t)}endStroke(){this.recomputeThrottleTimer&&(clearTimeout(this.recomputeThrottleTimer),this.recomputeThrottleTimer=null),this.flushPendingStrokes(),this.state.isDrawing=!1,this.notifyStateChange()}applyBrushAtCell(e,t){if(!this.world)return;if(this.pendingStrokeSamples.push({row:e,col:t}),performance.now()-this.lastApplyTime<100&&this.state.isDrawing){this.recomputeThrottleTimer||(this.recomputeThrottleTimer=window.setTimeout(()=>{this.flushPendingStrokes()},100));return}this.flushPendingStrokes()}flushPendingStrokes(){if(!this.world||this.pendingStrokeSamples.length===0){this.pendingStrokeSamples=[],this.recomputeThrottleTimer=null;return}for(const e of this.pendingStrokeSamples){const t={type:"TERRAIN_STROKE",tool:this.state.tool,center:{row:e.row,col:e.col},radius:this.state.brushParams.radius,strength:this.state.brushParams.strength*.3};Lg(this.world,t),this.actionHistory.push(t)}Fn(this.world,["TERRAIN_EDIT"]),this.lastApplyTime=performance.now(),this.onWorldChange(this.world),this.pendingStrokeSamples=[],this.recomputeThrottleTimer=null}notifyStateChange(){this.onStateChange(this.getState())}}function KT(r,e){const t=r.getContext("2d");if(!t)return;const s=oo(e),o=s.width,l=s.height,d=Math.max(1,Math.floor(1100/o));r.width=o*d,r.height=l*d;const f=t.createImageData(o,l),p=f.data;for(let _=0;_<l;_++)for(let S=0;S<o;S++){const E=s.minimapColorAt(S,_),M=(_*o+S)*4;p[M+0]=E[0],p[M+1]=E[1],p[M+2]=E[2],p[M+3]=E[3]}const g=document.createElement("canvas");g.width=o,g.height=l;const m=g.getContext("2d");m&&(m.putImageData(f,0,0),t.imageSmoothingEnabled=!1,t.clearRect(0,0,r.width,r.height),t.drawImage(g,0,0,o*d,l*d))}function ag(r,e,t,s){if(!t)return null;const o=t.getBoundingClientRect(),l=r-o.left,u=e-o.top,d=l/o.width,f=u/o.height,p=Math.floor(d*s.gridWidth),g=Math.floor(f*s.gridHeight);return g<0||g>=s.gridHeight||p<0||p>=s.gridWidth?null:{row:g,col:p}}function ZT({world:r,activeTerrainTool:e,onWorldChange:t}){const s=ge.useRef(null),o=ge.useRef(null),[l,u]=ge.useState(null);ge.useEffect(()=>{o.current=new $T(r,u,t),e&&o.current.setTool(e)},[r,t]),ge.useEffect(()=>{e&&o.current?o.current.setTool(e):!e&&o.current&&o.current.disable()},[e]),ge.useEffect(()=>{const m=s.current;if(m)try{KT(m,r)}catch(_){console.error("Create viewport draw failed:",_)}},[r]);const d=m=>{const _=s.current;if(!_||!o.current)return;const S=ag(m.clientX,m.clientY,_,r);S&&o.current.startStroke(S.row,S.col)},f=m=>{const _=s.current;if(!_||!o.current)return;const S=ag(m.clientX,m.clientY,_,r);S&&o.current.continueStroke(S.row,S.col)},p=()=>{o.current&&o.current.endStroke()},g=()=>{o.current&&o.current.endStroke()};return O.jsxs("div",{style:{position:"absolute",inset:0,overflow:"auto"},children:[O.jsxs("div",{style:{padding:12,fontWeight:900},children:["Create View",l?.enabled&&O.jsxs("span",{style:{marginLeft:12,fontSize:12,opacity:.7},children:["Tool: ",l.tool," | Radius: ",l.brushParams.radius]})]}),O.jsxs("div",{style:{padding:12},children:[O.jsx("canvas",{ref:s,onMouseDown:d,onMouseMove:f,onMouseUp:p,onMouseLeave:g,style:{width:"100%",maxWidth:1200,borderRadius:12,border:"1px solid rgba(0,0,0,0.15)",background:"#111",display:"block",cursor:l?.enabled?"crosshair":"default"}}),O.jsx("div",{style:{fontSize:11,opacity:.65,marginTop:8},children:l?.enabled?`Terrain brush active: ${l.tool.toUpperCase()} - click and drag to paint.`:"Select a terrain tool above to start editing."})]})]})}function Sd(r,e,t,s=256,o=128){const l=r-t.left,u=e-t.top,d=l/t.width*360-180;return{lat:90-u/t.height*180,lon:d}}function Md(r,e,t){const s=t.left+(e+180)/360*t.width,o=t.top+(90-r)/180*t.height;return{x:s,y:o}}function lg(r,e,t){let s=-1,o=t;for(let l=0;l<e.length;l++){const u=Math.sqrt(Math.pow(r.lat-e[l].lat,2)+Math.pow(r.lon-e[l].lon,2));u<o&&(o=u,s=l)}return s>=0?s:null}function cg(r,e,t,s,o){const l=t.map(u=>({lat:(u.lat+90)/180,lon:(u.lon+180)/360}));return{id:r,name:`${e} Sticker`,type:e,mode:s,polygon:l,falloff:0,payload:o}}function ug(r,e){r.stickers||(r.stickers=[]),r.stickers.push(e);const{gridWidth:t,gridHeight:s}=r;for(let o=0;o<s;o++)for(let l=0;l<t;l++){const u=o/s,d=l/t;if(QT(u,d,e.polygon)){const f=o*t+l,p=r.cells[f];if(!p)continue;e.type==="BIOME"&&e.payload.biomeId?p.editBiomeId=e.payload.biomeId:e.type==="HEIGHT"&&e.payload.heightDelta?p.editHeightDelta=Math.max(-1,Math.min(1,p.editHeightDelta+e.payload.heightDelta)):e.type==="CULTURE"&&e.payload.cultureId&&(p.cultureId=e.payload.cultureId)}}}function QT(r,e,t){if(t.length<3)return!1;let s=!1;for(let o=0,l=t.length-1;o<t.length;l=o++){const u=t[o].lon,d=t[o].lat,f=t[l].lon,p=t[l].lat;d>r!=p>r&&e<(f-u)*(r-d)/(p-d)+u&&(s=!s)}return s}function JT(r,e,t){const s=[];let o=!0;return r===1?e>.3&&(s.push("Tundra is unusually warm at this temperature."),o=!1):r===5?e<.55&&(s.push("Jungle is unusually cold at this temperature."),o=!1):r===4&&t>.3&&(s.push("Deserts are typically dry. This location has high rainfall."),o=!1),r===3?t<.25&&(s.push("Forests require substantial moisture. This area is drier than typical."),o=!1):r===4&&t>.2&&(s.push("Deserts are arid. This rainfall level is too high for a desert."),o=!1),e<.15&&r===5&&(s.push("Jungles cannot exist in polar regions."),o=!1),e>.85&&r===1&&(s.push("Tundra cannot exist in tropical regions."),o=!1),s.length===0&&o&&s.push("✓ This placement is realistic for the local climate."),{isValid:o,warnings:s}}function ew({biomeType:r,temperature:e,rainfall:t,warnings:s,onApply:o,onCancel:l}){const u=s.some(d=>!d.startsWith("✓"));return O.jsx("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1e4},onClick:l,children:O.jsxs("div",{style:{background:"rgba(20, 20, 30, 0.95)",border:"1px solid rgba(100, 180, 255, 0.3)",borderRadius:12,padding:24,maxWidth:400,color:"rgba(255,255,255,0.88)",backdropFilter:"blur(8px)"},onClick:d=>d.stopPropagation(),children:[O.jsxs("h3",{style:{margin:"0 0 12px 0",fontSize:16,color:"rgba(100, 200, 255, 0.9)"},children:["Place ",r," Biome?"]}),O.jsxs("div",{style:{fontSize:12,opacity:.75,marginBottom:16},children:[O.jsxs("div",{children:["Temperature: ",(e*100).toFixed(0),"%"]}),O.jsxs("div",{children:["Rainfall: ",(t*100).toFixed(0),"%"]})]}),O.jsx("div",{style:{background:"rgba(0,0,0,0.3)",border:`1px solid ${u?"rgba(255, 100, 100, 0.3)":"rgba(100, 200, 100, 0.3)"}`,borderRadius:8,padding:12,marginBottom:16,fontSize:12,lineHeight:1.6},children:s.map((d,f)=>O.jsx("div",{style:{color:d.startsWith("✓")?"rgba(100, 200, 100, 0.8)":"rgba(255, 150, 100, 0.9)"},children:d},f))}),O.jsxs("div",{style:{display:"flex",gap:10,justifyContent:"flex-end"},children:[O.jsx("button",{onClick:l,style:{padding:"8px 12px",borderRadius:6,border:"1px solid rgba(255,255,255,0.2)",background:"rgba(255,255,255,0.05)",color:"rgba(255,255,255,0.75)",cursor:"pointer",fontSize:12},children:"Cancel"}),O.jsx("button",{onClick:o,style:{padding:"8px 12px",borderRadius:6,border:"1px solid rgba(100, 180, 255, 0.4)",background:u?"rgba(200, 100, 100, 0.2)":"rgba(100, 180, 255, 0.15)",color:"rgba(100, 200, 255, 0.9)",cursor:"pointer",fontSize:12},children:u?"Place Anyway (Override)":"Place"})]})]})})}function tw({world:r,activeStickerTool:e,onStickerCreated:t,onCancel:s}){const o=ge.useRef(null),l=ge.useRef(null),[u,d]=ge.useState([]),[f,p]=ge.useState(null),[g,m]=ge.useState(null),[_,S]=ge.useState(!1);ge.useEffect(()=>{const w=o.current,R=l.current;if(!w||!R)return;const b=w.getContext("2d");if(!b)return;const z=R.getBoundingClientRect();if(w.width=z.width,w.height=z.height,b.fillStyle="rgba(0,0,0,0.1)",b.fillRect(0,0,w.width,w.height),u.length>0){b.strokeStyle="rgba(100, 200, 255, 0.8)",b.fillStyle="rgba(100, 200, 255, 0.15)",b.lineWidth=3,b.beginPath();const k=u[0],N=Md(k.lat,k.lon,z);b.moveTo(N.x-z.left,N.y-z.top);for(let fe=1;fe<u.length;fe++){const C=u[fe],L=Md(C.lat,C.lon,z);b.lineTo(L.x-z.left,L.y-z.top)}u.length>2&&b.lineTo(N.x-z.left,N.y-z.top),b.fill(),b.stroke();for(let fe=0;fe<u.length;fe++){const C=u[fe],L=Md(C.lat,C.lon,z);b.fillStyle=fe===0?"rgba(100, 255, 100, 0.95)":"rgba(255, 100, 100, 0.95)",b.strokeStyle="rgba(255, 255, 255, 0.9)",b.lineWidth=2,b.beginPath(),b.arc(L.x-z.left,L.y-z.top,7,0,Math.PI*2),b.fill(),b.stroke()}}},[u]);const E=w=>{if(!r||!e||!l.current)return;const R=l.current.getBoundingClientRect(),b=Sd(w.clientX,w.clientY,R,r.gridWidth,r.gridHeight);if(u.length>=3&&lg(b,u,8)===0){const k=`sticker_${Date.now()}`;let N={};if(e==="BIOME"){N.biomeId=5;const C=u.reduce((B,H)=>B+H.lat,0)/u.length,L=u.reduce((B,H)=>B+H.lon,0)/u.length,ie=Math.floor((90-C)/180*(r?.gridHeight||128)),se=Math.floor((L+180)/360*(r?.gridWidth||256)),re=ie*(r?.gridWidth||256)+se;if(r&&r.cells[re]){const B=r.cells[re],H=JT(N.biomeId,B.temperature,B.rainfall);m({stickerId:k,payload:N,temperature:B.temperature,rainfall:B.rainfall,validation:H}),S(!0);return}}else e==="CULTURE"?N.cultureId="culture_0":e==="HEIGHT"&&(N.heightDelta=.3);const fe=cg(k,e,u,"OVERRIDE",N);r&&(ug(r,fe),t?.(r)),d([]);return}d([...u,b])},M=w=>{if(f===null||!l.current)return;const R=l.current.getBoundingClientRect(),b=Sd(w.clientX,w.clientY,R,r?.gridWidth||256,r?.gridHeight||128),z=[...u];z[f]=b,d(z)},x=w=>{if(!l.current)return;const R=l.current.getBoundingClientRect(),b=Sd(w.clientX,w.clientY,R,r?.gridWidth||256,r?.gridHeight||128),z=lg(b,u,8);z!==null&&p(z)},y=()=>{p(null)};return e?O.jsxs("div",{ref:l,style:{position:"absolute",inset:0,zIndex:1e3,cursor:"crosshair"},children:[O.jsx("canvas",{ref:o,onClick:E,onMouseMove:M,onMouseDown:x,onMouseUp:y,onMouseLeave:y,style:{position:"absolute",inset:0,display:"block"}}),O.jsxs("div",{style:{position:"absolute",top:16,left:16,background:"rgba(0,0,0,0.85)",color:"rgba(255,255,255,0.95)",padding:"14px 16px",borderRadius:8,fontSize:12,zIndex:1001,maxWidth:320,border:"1px solid rgba(100,200,255,0.3)"},children:[O.jsxs("div",{style:{fontWeight:700,marginBottom:8,color:"rgba(100,200,255,0.95)"},children:[e==="BIOME"&&"🌍 Biome Sticker",e==="CULTURE"&&"👥 Culture Zone",e==="HEIGHT"&&"⛏️ Terrain Sticker"]}),O.jsx("div",{style:{opacity:.85,marginBottom:10,lineHeight:1.5},children:"Click to place vertices. Close polygon by clicking first vertex (green dot)."}),O.jsxs("div",{style:{fontSize:11,opacity:.7,marginBottom:10},children:["Vertices: ",u.length]}),O.jsxs("div",{style:{display:"flex",gap:8},children:[O.jsx("button",{onClick:()=>{d([]),s?.()},style:{padding:"6px 12px",borderRadius:6,border:"1px solid rgba(255,100,100,0.3)",background:"rgba(255,100,100,0.1)",color:"rgba(255,150,150,0.95)",cursor:"pointer",fontSize:11,fontWeight:600},children:"Cancel"}),u.length>0&&O.jsx("button",{onClick:()=>{d(u.slice(0,-1))},style:{padding:"6px 12px",borderRadius:6,border:"1px solid rgba(200,200,100,0.3)",background:"rgba(200,200,100,0.1)",color:"rgba(255,255,150,0.95)",cursor:"pointer",fontSize:11,fontWeight:600},children:"Undo Vertex"})]})]}),_&&g&&O.jsx(ew,{biomeType:e==="BIOME"?"Biome":e||"",temperature:g.temperature,rainfall:g.rainfall,warnings:g.validation.warnings,onApply:()=>{const w=cg(g.stickerId,e,u,"OVERRIDE",g.payload);r&&(ug(r,w),d([]),m(null),S(!1),t?.(r))},onCancel:()=>{m(null),S(!1)}})]}):null}function nw(){const r=ra(),{worldId:e}=Tg(),[t,s]=ge.useState(!0),[o,l]=ge.useState(null),[u,d]=ge.useState(null),[f,p]=ge.useState(!1),[g,m]=ge.useState("GLOBE"),[_,S]=ge.useState(null),[E,M]=ge.useState(null),[x,y]=ge.useState(null),[w,R]=ge.useState(ln.getWorld());ge.useEffect(()=>ln.subscribe(B=>R(B)),[]),ge.useEffect(()=>{let re=!0;return(async()=>{if(!e){re&&(l("Missing worldId in route."),s(!1));return}s(!0),l(null);try{await ln.loadWorld(e)}catch(B){console.error(B),re&&l(B?.message||"Failed to load world.")}finally{re&&s(!1)}})(),()=>{re=!1}},[e]);const b=ge.useMemo(()=>w?oo(w):null,[w]);async function z(){d(null),p(!0);try{await ln.save()}catch(re){console.error(re),d(re?.message||"Save failed.")}finally{p(!1)}}const k=re=>{ln.applyLocalEdit(re)},N=()=>{if(w)try{const re=Math.floor(Math.random()*4)+5,B=bg(w,re);if(!B||B.length===0){console.error("[Generate Countries] No countries generated - check world has land cells"),alert("Failed to generate countries. Ensure the world has sufficient land mass.");return}const H={...w,countries:B};ln.applyLocalEdit(H),console.log(`[Generate Countries] Successfully generated ${B.length} countries`)}catch(re){console.error("[Generate Countries] Error:",re),alert(`Failed to generate countries: ${re}`)}},fe=()=>{if(!w)return;const re=w.cells.filter(U=>!U.isWater);if(re.length===0)return;const B=re[Math.floor(Math.random()*re.length)];Math.floor(B.index/w.gridWidth),B.index%w.gridWidth;let H="TOWN";re.find(U=>{const Y=U.index,W=Math.floor(Y/w.gridWidth),I=Y%w.gridWidth;for(let G=-1;G<=1;G++)for(let V=-1;V<=1;V++){const Q=W+G,he=((I+V)%w.gridWidth+w.gridWidth)%w.gridWidth,_e=Q*w.gridWidth+he;if(w.cells[_e]?.isWater)return!0}return!1})&&(H="PORT");const Z={id:`city_${Date.now()}`,name:"City",cellIndex:B.index,population:1e3,type:H,populationTier:2,isCapital:!1,economicRoles:["TRADE"],tags:[],description:"",countryId:w.countries?.[0]?.id,cultureId:w.cultures?.[0]?.id};w.cities=w.cities||[],w.cities.push(Z),Fn(w,["TERRAIN_EDIT"]),k(w)},C=[{id:"terrain",title:"Terrain",tools:[{id:"raise",label:"Raise",disabled:!w,active:_==="RAISE",onClick:()=>S(_==="RAISE"?null:"RAISE")},{id:"lower",label:"Lower",disabled:!w,active:_==="LOWER",onClick:()=>S(_==="LOWER"?null:"LOWER")},{id:"smooth",label:"Smooth",disabled:!w,active:_==="SMOOTH",onClick:()=>S(_==="SMOOTH"?null:"SMOOTH")},{id:"flatten",label:"Flatten",disabled:!w,active:_==="FLATTEN",onClick:()=>S(_==="FLATTEN"?null:"FLATTEN")}]},{id:"biomes",title:"Biomes",tools:[{id:"paint_biome",label:"Paint Biome",disabled:!w,active:E==="BIOME",onClick:()=>M(E==="BIOME"?null:"BIOME")},{id:"paint_height",label:"Raise/Lower",disabled:!w,active:E==="HEIGHT",onClick:()=>M(E==="HEIGHT"?null:"HEIGHT")}]},{id:"water",title:"Water",tools:[{id:"river_add",label:"Add River",disabled:!w,active:x==="ADD_RIVER",onClick:()=>y(x==="ADD_RIVER"?null:"ADD_RIVER")},{id:"river_edit",label:"Edit River",disabled:!w,active:x==="EDIT_RIVER",onClick:()=>y(x==="EDIT_RIVER"?null:"EDIT_RIVER")},{id:"lake_add",label:"Set Lake Level",disabled:!w,active:x==="ADD_LAKE",onClick:()=>y(x==="ADD_LAKE"?null:"ADD_LAKE")}]},{id:"volcano",title:"Volcano",tools:[{id:"add_volcano",label:"Add Volcano",disabled:!0}]},{id:"countries",title:"Countries & Borders",tools:[{id:"gen_countries",label:"Generate Countries",disabled:!w,onClick:()=>N()},{id:"edit_border",label:"Edit Border",disabled:!0}]},{id:"culture",title:"Culture",tools:[{id:"add_culture",label:"Add Culture Zone",disabled:!w,active:E==="CULTURE",onClick:()=>M(E==="CULTURE"?null:"CULTURE")}]},{id:"cities",title:"Cities",tools:[{id:"add_city",label:"Add City",disabled:!w,onClick:()=>fe()}]}],L=O.jsxs("div",{style:{padding:14,color:"rgba(255,255,255,0.88)"},children:[O.jsx("h3",{style:{margin:"6px 0 10px 0"},children:"Create"}),O.jsxs("div",{style:{display:"flex",gap:10,marginBottom:12},children:[O.jsx("button",{onClick:z,disabled:!w||t||f,style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:!w||t||f?"not-allowed":"pointer",opacity:!w||t||f?.5:1},children:f?"Saving…":"Save"}),O.jsx("button",{onClick:()=>r(`/sim/${e}`),disabled:!e,style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:e?"pointer":"not-allowed",opacity:e?1:.5},children:"Go to Sim"})]}),u&&O.jsxs("div",{style:{marginBottom:12,padding:10,borderRadius:10,border:"1px solid rgba(255,90,90,0.35)",background:"rgba(255,90,90,0.08)",color:"rgba(255,255,255,0.92)",fontSize:12,lineHeight:1.4},children:[O.jsx("b",{children:"Save failed:"})," ",u]}),O.jsx("div",{style:{fontSize:12,opacity:.8,lineHeight:1.4},children:"Tool implementations come after Phase 1 stability. For now these are blueprint-accurate categories."})]});function ie(re,B){const H=re?.width,$=re?.height,Z=re?.rgba;return!H||!$?O.jsx("div",{style:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",padding:12,color:"rgba(255,255,255,0.85)",fontSize:13},children:"Generating preview…"}):Z&&Z instanceof Uint8ClampedArray?O.jsx("canvas",{width:H,height:$,ref:U=>{if(!U)return;const Y=U.getContext("2d");if(Y)try{const W=new ImageData(Z,H,$);Y.putImageData(W,0,0)}catch(W){console.error("Preview render failed:",W)}},style:{width:"100%",height:"100%",imageRendering:"auto"}}):O.jsx("div",{style:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",padding:12,color:"rgba(255,255,255,0.85)",fontSize:13},children:"No preview available"})}if(t)return O.jsx(ns,{mode:"create",onGoHome:()=>r("/"),worldName:w?.metadata?.name||"Loading…",isDirty:ln.isDirty(),onModeToggle:()=>r(`/sim/${e}`),viewMode:g,onViewModeChange:m,rightPanel:L,toolGroups:C,children:O.jsx("div",{style:{padding:20,color:"rgba(255,255,255,0.85)"},children:"Loading world…"})});if(o)return O.jsx(ns,{mode:"create",onGoHome:()=>r("/"),worldName:"Load Error",isDirty:!1,viewMode:g,onViewModeChange:m,rightPanel:O.jsxs("div",{style:{padding:14,color:"rgba(255,255,255,0.9)"},children:[O.jsx("h3",{style:{margin:"6px 0 10px 0"},children:"Could not load world"}),O.jsx("div",{style:{opacity:.85,marginBottom:12},children:o}),O.jsxs("div",{style:{display:"flex",gap:10,flexWrap:"wrap"},children:[O.jsx("button",{onClick:()=>r("/"),style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Back to Home"}),O.jsx("button",{onClick:()=>r("/generate"),style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Go to Generate"}),O.jsx("button",{onClick:()=>window.location.reload(),style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Reload"})]})]}),children:O.jsx("div",{style:{padding:20}})});const se=g==="GLOBE";return O.jsx(ns,{mode:"create",onGoHome:()=>r("/"),worldName:w?.metadata?.name||"Create",isDirty:ln.isDirty(),onModeToggle:()=>r(`/sim/${e}`),viewMode:g,onViewModeChange:m,rightPanel:L,toolGroups:C,children:O.jsxs("div",{style:{width:"100%",height:"100%",position:"relative"},children:[g==="GLOBE"&&w?O.jsx("div",{style:{width:"100%",height:"100%"},children:O.jsx(Yd,{world:w,preview:b})}):w?O.jsx(ZT,{world:w,activeTerrainTool:_,onWorldChange:k}):ie(b),E&&O.jsx(tw,{world:w,activeStickerTool:E,onStickerCreated:()=>{M(null),k(w)},onCancel:()=>M(null)}),w&&se&&O.jsx("div",{style:{position:"absolute",left:16,bottom:16,width:220,height:140,borderRadius:12,overflow:"hidden",border:"1px solid rgba(255,255,255,0.18)",background:"rgba(0,0,0,0.35)",boxShadow:"0 10px 25px rgba(0,0,0,0.35)"},title:"Minimap (Create + Globe only)",children:O.jsx(qT,{world:w})})]})})}function iw(r,e){const t=[];for(const s of r.cities)Math.random()<.1&&t.push({id:`city_growth_${s.id}`,type:"CITY_GROWTH",year:e,title:`${s.name} is growing`,description:`Population in ${s.name} has increased significantly.`,affectedCityIds:[s.id],options:[{label:"Accept growth",description:"Population increases by 20%",effect:o=>{const l=o.cities.find(u=>u.id===s.id);l&&(l.population*=1.2)}}],severity:"MINOR",automaticallyResolve:!0});if(r.countries.length>1&&Math.random()<.05){const s=r.countries.sort(()=>Math.random()-.5);s.length>=2&&t.push({id:`war_${e}`,type:"WAR_DECLARATION",year:e,title:`War between ${s[0].name} and ${s[1].name}`,description:"Border tensions have escalated into open conflict.",affectedCountryIds:[s[0].id,s[1].id],options:[{label:"Let conflict resolve naturally",description:"Outcome depends on military strength",effect:o=>{}}],severity:"MAJOR"})}if(r.cultures.length>0&&Math.random()<.03){const s=r.cultures[Math.floor(Math.random()*r.cultures.length)];t.push({id:`culture_split_${s.id}`,type:"CULTURE_SPLIT",year:e,title:`${s.name} culture is fragmenting`,description:`Isolated regions of ${s.name} have begun to diverge culturally.`,affectedCultureIds:[s.id],options:[{label:"Accept split",description:"Creates a new sub-culture",effect:o=>{const l={...s,id:`${s.id}_split`,name:`${s.name} (Reformed)`};o.cultures.push(l)}}],severity:"MODERATE"})}if(Math.random()<.08){const s=Math.random()<.5?"DROUGHT":"PLAGUE",o=s==="DROUGHT"?"Severe drought in the south":"Plague outbreak in the cities";t.push({id:`disaster_${e}`,type:s,year:e,title:o,description:s==="DROUGHT"?"Agricultural output has dropped significantly due to lack of rain.":"A deadly plague is spreading through major population centers.",affectedCityIds:r.cities.slice(0,Math.floor(r.cities.length/3)).map(l=>l.id),options:[{label:"Accept losses",description:"Population affected by disaster",effect:l=>{}}],severity:"MAJOR"})}return t}function dg(r,e,t){return e<0||e>=r.options.length?!1:(r.options[e].effect(t),!0)}function rw(r,e=0,t=`Branch ${new Date().toISOString()}`){return{id:`branch_${Date.now()}`,name:t,baseWorldId:r.metadata.id,worldSnapshot:JSON.parse(JSON.stringify(r)),startYear:e,currentYear:e,eventHistory:[],createdAt:new Date().toISOString(),isPromoted:!1}}const sw=({events:r,onResolveEvent:e,onAutoResolveAll:t})=>{const[s,o]=ge.useState(r.length>0?r[0].id:null),l=r.find(u=>u.id===s);return O.jsxs("div",{style:{position:"fixed",right:20,top:180,width:320,maxHeight:500,backgroundColor:"#222",border:"2px solid #666",borderRadius:8,boxShadow:"0 4px 12px rgba(0,0,0,0.5)",display:"flex",flexDirection:"column",fontFamily:"monospace",fontSize:"12px",zIndex:1e3},children:[O.jsxs("div",{style:{padding:"8px 12px",backgroundColor:"#111",borderBottom:"1px solid #666",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[O.jsxs("span",{style:{color:"#fff",fontWeight:"bold"},children:["Inbox (",r.length,")"]}),r.length>0&&O.jsx("button",{onClick:t,style:{padding:"2px 6px",backgroundColor:"#444",color:"#fff",border:"1px solid #666",borderRadius:3,cursor:"pointer",fontSize:"10px"},children:"Auto-Resolve All"})]}),O.jsx("div",{style:{overflowY:"auto",flex:1,maxHeight:200},children:r.length===0?O.jsx("div",{style:{padding:"12px",color:"#888",textAlign:"center"},children:"No pending decisions"}):r.map(u=>O.jsxs("div",{onClick:()=>o(u.id),style:{padding:"8px 12px",borderBottom:"1px solid #444",cursor:"pointer",backgroundColor:u.id===s?"#333":"transparent",transition:"background-color 0.2s"},onMouseEnter:d=>{u.id!==s&&(d.currentTarget.style.backgroundColor="#2a2a2a")},onMouseLeave:d=>{u.id!==s&&(d.currentTarget.style.backgroundColor="transparent")},children:[O.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4},children:[O.jsx("span",{style:{color:u.severity==="MAJOR"?"#ff6b6b":u.severity==="MODERATE"?"#ffd93d":"#88ff88",fontWeight:"bold",flex:1},children:u.title}),O.jsxs("span",{style:{color:"#888",fontSize:"10px"},children:["Y",u.year]})]}),O.jsx("div",{style:{color:"#aaa",fontSize:"11px"},children:u.type})]},u.id))}),l&&O.jsxs("div",{style:{borderTop:"1px solid #666",padding:"12px"},children:[O.jsxs("div",{style:{marginBottom:8,color:"#fff"},children:[O.jsx("div",{style:{fontWeight:"bold",color:l.severity==="MAJOR"?"#ff6b6b":l.severity==="MODERATE"?"#ffd93d":"#88ff88",marginBottom:4},children:l.title}),O.jsx("div",{style:{color:"#aaa",fontSize:"11px",marginBottom:8},children:l.description})]}),O.jsx("div",{style:{display:"flex",flexDirection:"column",gap:6},children:l.options.map((u,d)=>O.jsxs("button",{onClick:()=>{e(l.id,d),o(null)},style:{padding:"6px 8px",backgroundColor:"#444",color:"#fff",border:"1px solid #666",borderRadius:4,cursor:"pointer",fontSize:"11px",textAlign:"left",transition:"all 0.2s"},onMouseEnter:f=>{f.currentTarget.style.backgroundColor="#555"},onMouseLeave:f=>{f.currentTarget.style.backgroundColor="#444"},children:[O.jsx("div",{style:{fontWeight:"bold"},children:u.label}),O.jsx("div",{style:{color:"#aaa",fontSize:"10px"},children:u.description})]},d))})]})]})},ow=({history:r})=>O.jsxs("div",{style:{position:"fixed",left:20,top:180,width:280,maxHeight:400,backgroundColor:"#222",border:"2px solid #666",borderRadius:8,boxShadow:"0 4px 12px rgba(0,0,0,0.5)",fontFamily:"monospace",fontSize:"11px",zIndex:1e3,overflowY:"auto"},children:[O.jsxs("div",{style:{padding:"8px 12px",backgroundColor:"#111",borderBottom:"1px solid #666",fontWeight:"bold",color:"#fff",position:"sticky",top:0},children:["Event History (",r.length,")"]}),O.jsx("div",{style:{padding:8},children:r.length===0?O.jsx("div",{style:{color:"#888",textAlign:"center",padding:12},children:"No events yet"}):r.slice().reverse().map((e,t)=>O.jsxs("div",{style:{marginBottom:8,padding:8,backgroundColor:"rgba(255,255,255,0.03)",borderRadius:6,borderLeft:e.event.severity==="MAJOR"?"3px solid #ff6b6b":e.event.severity==="MODERATE"?"3px solid #ffd93d":"3px solid #88ff88"},children:[O.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:4},children:[O.jsx("span",{style:{fontWeight:"bold",color:"#fff"},children:e.event.title}),O.jsxs("span",{style:{color:"#888",fontSize:10},children:["Y",e.resolvedYear]})]}),O.jsx("div",{style:{color:"#aaa",fontSize:10,marginBottom:4},children:e.event.description}),O.jsxs("div",{style:{color:"#88ff88",fontSize:10,fontStyle:"italic"},children:["→ ",e.event.options[e.chosenOption]?.label]})]},t))})]});function aw(){const r=ra(),{worldId:e}=Tg(),[t,s]=ge.useState(!0),[o,l]=ge.useState(null),[u,d]=ge.useState(ln.getWorld());ge.useEffect(()=>ln.subscribe(L=>d(L)),[]);const[f,p]=ge.useState(0),[g,m]=ge.useState([]),[_,S]=ge.useState([]),[E,M]=ge.useState(!1),[x,y]=ge.useState([]),[w,R]=ge.useState(!1);ge.useEffect(()=>{let C=!0;return(async()=>{if(!e){C&&(l("Missing worldId in route."),s(!1));return}s(!0),l(null);try{await ln.loadWorld(e)}catch(L){console.error(L),C&&l(L?.message||"Failed to load world.")}finally{C&&s(!1)}})(),()=>{C=!1}},[e]);const b=()=>{if(!u)return;const C=f+1;p(C);const L=iw(u,C);m(ie=>[...ie,...L])},z=(C,L)=>{const ie=g.find(se=>se.id===C);!ie||!u||(dg(ie,L,u),ln.applyLocalEdit(u),m(se=>se.filter(re=>re.id!==C)),y(se=>[...se,{event:ie,chosenOption:L,resolvedYear:f}]))},k=()=>{if(u){for(const C of g)C.automaticallyResolve&&C.options.length>0&&dg(C,0,u);ln.applyLocalEdit(u),m(C=>C.filter(L=>!L.automaticallyResolve||L.options.length===0))}},N=C=>{if(!u)return;const L=rw(u,f,C);S(ie=>[...ie,L]),M(!1)},fe=O.jsxs("div",{style:{padding:14,color:"rgba(255,255,255,0.88)"},children:[O.jsxs("h3",{style:{margin:"6px 0 10px 0"},children:["Sim Year ",f]}),O.jsxs("div",{style:{display:"flex",gap:10,marginBottom:12},children:[O.jsx("button",{onClick:b,disabled:!u||t,style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:!u||t?"not-allowed":"pointer",opacity:!u||t?.5:1},children:"Tick"}),O.jsx("button",{onClick:()=>r(`/create/${e}`),disabled:!e,style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:e?"pointer":"not-allowed",opacity:e?1:.5},children:"Back to Create"})]}),O.jsxs("div",{style:{marginBottom:12,borderTop:"1px solid rgba(255,255,255,0.1)",paddingTop:10},children:[O.jsxs("button",{onClick:()=>R(!w),style:{padding:"8px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(100,150,255,0.15)",color:"rgba(150,200,255,0.9)",cursor:"pointer",fontSize:12,width:"100%",marginBottom:8},children:[w?"Hide":"Show"," History (",x.length,")"]}),O.jsxs("button",{onClick:()=>M(!E),style:{padding:"8px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(100,150,255,0.15)",color:"rgba(150,200,255,0.9)",cursor:"pointer",fontSize:12,width:"100%",marginBottom:8},children:["Branches (",_.length,")"]}),E&&O.jsxs("div",{style:{fontSize:11,backgroundColor:"rgba(0,0,0,0.3)",padding:8,borderRadius:6,marginBottom:8},children:[_.map(C=>O.jsxs("div",{style:{padding:4,marginBottom:4,backgroundColor:"rgba(255,255,255,0.05)",borderRadius:4,borderLeft:C.isPromoted?"2px solid #88ff88":"2px solid #888"},children:[O.jsx("div",{style:{fontWeight:"bold"},children:C.name}),O.jsxs("div",{style:{fontSize:10,opacity:.7},children:["Y",C.currentYear]})]},C.id)),O.jsx("input",{type:"text",placeholder:"Branch name…",onKeyPress:C=>{C.key==="Enter"&&C.currentTarget.value&&(N(C.currentTarget.value),C.currentTarget.value="")},style:{width:"100%",padding:"4px 6px",borderRadius:4,border:"1px solid rgba(255,255,255,0.1)",backgroundColor:"rgba(0,0,0,0.3)",color:"rgba(255,255,255,0.9)",fontSize:11}})]})]}),O.jsx("div",{style:{fontSize:12,opacity:.8,lineHeight:1.4},children:"Culture, Trade, and Route overlays coming soon."})]});return t?O.jsx(ns,{mode:"sim",onGoHome:()=>r("/"),worldName:u?.metadata?.name||"Loading…",isDirty:ln.isDirty(),onModeToggle:()=>r(`/create/${e}`),rightPanel:fe,leftTools:[{id:"overview",label:"Overview",disabled:!0},{id:"culture",label:"Culture",disabled:!0},{id:"trade",label:"Trade",disabled:!0},{id:"routes",label:"Routes",disabled:!0}],children:O.jsx("div",{style:{padding:20,color:"rgba(255,255,255,0.85)"},children:"Loading world…"})}):o?O.jsx(ns,{mode:"sim",onGoHome:()=>r("/"),worldName:"Load Error",isDirty:!1,rightPanel:O.jsxs("div",{style:{padding:14,color:"rgba(255,255,255,0.9)"},children:[O.jsx("h3",{style:{margin:"6px 0 10px 0"},children:"Could not load world"}),O.jsx("div",{style:{opacity:.85,marginBottom:12},children:o}),O.jsxs("div",{style:{display:"flex",gap:10},children:[O.jsx("button",{onClick:()=>r("/"),style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Back to Home"}),O.jsx("button",{onClick:()=>r("/generate"),style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Go to Generate"}),O.jsx("button",{onClick:()=>window.location.reload(),style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Reload"})]})]}),children:O.jsx("div",{style:{padding:20,color:"rgba(255,255,255,0.85)"}})}):O.jsx(ns,{mode:"sim",onGoHome:()=>r("/"),worldName:u?.metadata?.name||"Sim",isDirty:ln.isDirty(),onModeToggle:()=>r(`/create/${e}`),rightPanel:fe,toolGroups:[{id:"sim",title:"Sim Tools",tools:[{id:"overview",label:"Overview",disabled:!0},{id:"culture",label:"Culture",disabled:!0},{id:"trade",label:"Trade",disabled:!0},{id:"routes",label:"Routes",disabled:!0}]}],children:O.jsx("div",{style:{width:"100%",height:"100%",position:"relative"},children:u?O.jsxs(O.Fragment,{children:[O.jsx(Yd,{world:u,className:""}),O.jsx(sw,{events:g,onResolveEvent:z,onAutoResolveAll:k}),w&&O.jsx(ow,{history:x})]}):O.jsx("div",{style:{padding:20,color:"rgba(255,255,255,0.85)"},children:"No world loaded."})})})}function lw(){return O.jsxs(X_,{children:[O.jsx(qs,{path:"/",element:O.jsx(tx,{})}),O.jsx(qs,{path:"/generate",element:O.jsx(XT,{})}),O.jsx(qs,{path:"/create/:worldId",element:O.jsx(nw,{})}),O.jsx(qs,{path:"/sim/:worldId",element:O.jsx(aw,{})}),O.jsx(qs,{path:"*",element:O.jsx(W_,{to:"/",replace:!0})})]})}e_.createRoot(document.getElementById("root")).render(O.jsx(hg.StrictMode,{children:O.jsx($_,{children:O.jsx(lw,{})})}));
