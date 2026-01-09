function Vv(r,e){for(var t=0;t<e.length;t++){const s=e[t];if(typeof s!="string"&&!Array.isArray(s)){for(const o in s)if(o!=="default"&&!(o in r)){const l=Object.getOwnPropertyDescriptor(s,o);l&&Object.defineProperty(r,o,l.get?l:{enumerable:!0,get:()=>s[o]})}}}return Object.freeze(Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function t(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(o){if(o.ep)return;o.ep=!0;const l=t(o);fetch(o.href,l)}})();function dg(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Uu={exports:{}},Vo={},Ou={exports:{}},mt={};var vp;function Wv(){if(vp)return mt;vp=1;var r=Symbol.for("react.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),u=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),h=Symbol.for("react.memo"),m=Symbol.for("react.lazy"),g=Symbol.iterator;function _(I){return I===null||typeof I!="object"?null:(I=g&&I[g]||I["@@iterator"],typeof I=="function"?I:null)}var S={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},T=Object.assign,M={};function x(I,G,j){this.props=I,this.context=G,this.refs=M,this.updater=j||S}x.prototype.isReactComponent={},x.prototype.setState=function(I,G){if(typeof I!="object"&&typeof I!="function"&&I!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,I,G,"setState")},x.prototype.forceUpdate=function(I){this.updater.enqueueForceUpdate(this,I,"forceUpdate")};function y(){}y.prototype=x.prototype;function w(I,G,j){this.props=I,this.context=G,this.refs=M,this.updater=j||S}var b=w.prototype=new y;b.constructor=w,T(b,x.prototype),b.isPureReactComponent=!0;var P=Array.isArray,z=Object.prototype.hasOwnProperty,k={current:null},N={key:!0,ref:!0,__self:!0,__source:!0};function oe(I,G,j){var Z,fe={},xe=null,Ee=null;if(G!=null)for(Z in G.ref!==void 0&&(Ee=G.ref),G.key!==void 0&&(xe=""+G.key),G)z.call(G,Z)&&!N.hasOwnProperty(Z)&&(fe[Z]=G[Z]);var Te=arguments.length-2;if(Te===1)fe.children=j;else if(1<Te){for(var Ne=Array(Te),he=0;he<Te;he++)Ne[he]=arguments[he+2];fe.children=Ne}if(I&&I.defaultProps)for(Z in Te=I.defaultProps,Te)fe[Z]===void 0&&(fe[Z]=Te[Z]);return{$$typeof:r,type:I,key:xe,ref:Ee,props:fe,_owner:k.current}}function A(I,G){return{$$typeof:r,type:I.type,key:G,ref:I.ref,props:I.props,_owner:I._owner}}function R(I){return typeof I=="object"&&I!==null&&I.$$typeof===r}function ie(I){var G={"=":"=0",":":"=2"};return"$"+I.replace(/[=:]/g,function(j){return G[j]})}var ue=/\/+/g;function de(I,G){return typeof I=="object"&&I!==null&&I.key!=null?ie(""+I.key):G.toString(36)}function B(I,G,j,Z,fe){var xe=typeof I;(xe==="undefined"||xe==="boolean")&&(I=null);var Ee=!1;if(I===null)Ee=!0;else switch(xe){case"string":case"number":Ee=!0;break;case"object":switch(I.$$typeof){case r:case e:Ee=!0}}if(Ee)return Ee=I,fe=fe(Ee),I=Z===""?"."+de(Ee,0):Z,P(fe)?(j="",I!=null&&(j=I.replace(ue,"$&/")+"/"),B(fe,G,j,"",function(he){return he})):fe!=null&&(R(fe)&&(fe=A(fe,j+(!fe.key||Ee&&Ee.key===fe.key?"":(""+fe.key).replace(ue,"$&/")+"/")+I)),G.push(fe)),1;if(Ee=0,Z=Z===""?".":Z+":",P(I))for(var Te=0;Te<I.length;Te++){xe=I[Te];var Ne=Z+de(xe,Te);Ee+=B(xe,G,j,Ne,fe)}else if(Ne=_(I),typeof Ne=="function")for(I=Ne.call(I),Te=0;!(xe=I.next()).done;)xe=xe.value,Ne=Z+de(xe,Te++),Ee+=B(xe,G,j,Ne,fe);else if(xe==="object")throw G=String(I),Error("Objects are not valid as a React child (found: "+(G==="[object Object]"?"object with keys {"+Object.keys(I).join(", ")+"}":G)+"). If you meant to render a collection of children, use an array instead.");return Ee}function V(I,G,j){if(I==null)return I;var Z=[],fe=0;return B(I,Z,"","",function(xe){return G.call(j,xe,fe++)}),Z}function $(I){if(I._status===-1){var G=I._result;G=G(),G.then(function(j){(I._status===0||I._status===-1)&&(I._status=1,I._result=j)},function(j){(I._status===0||I._status===-1)&&(I._status=2,I._result=j)}),I._status===-1&&(I._status=0,I._result=G)}if(I._status===1)return I._result.default;throw I._result}var Q={current:null},U={transition:null},Y={ReactCurrentDispatcher:Q,ReactCurrentBatchConfig:U,ReactCurrentOwner:k};function H(){throw Error("act(...) is not supported in production builds of React.")}return mt.Children={map:V,forEach:function(I,G,j){V(I,function(){G.apply(this,arguments)},j)},count:function(I){var G=0;return V(I,function(){G++}),G},toArray:function(I){return V(I,function(G){return G})||[]},only:function(I){if(!R(I))throw Error("React.Children.only expected to receive a single React element child.");return I}},mt.Component=x,mt.Fragment=t,mt.Profiler=o,mt.PureComponent=w,mt.StrictMode=s,mt.Suspense=f,mt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Y,mt.act=H,mt.cloneElement=function(I,G,j){if(I==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+I+".");var Z=T({},I.props),fe=I.key,xe=I.ref,Ee=I._owner;if(G!=null){if(G.ref!==void 0&&(xe=G.ref,Ee=k.current),G.key!==void 0&&(fe=""+G.key),I.type&&I.type.defaultProps)var Te=I.type.defaultProps;for(Ne in G)z.call(G,Ne)&&!N.hasOwnProperty(Ne)&&(Z[Ne]=G[Ne]===void 0&&Te!==void 0?Te[Ne]:G[Ne])}var Ne=arguments.length-2;if(Ne===1)Z.children=j;else if(1<Ne){Te=Array(Ne);for(var he=0;he<Ne;he++)Te[he]=arguments[he+2];Z.children=Te}return{$$typeof:r,type:I.type,key:fe,ref:xe,props:Z,_owner:Ee}},mt.createContext=function(I){return I={$$typeof:u,_currentValue:I,_currentValue2:I,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},I.Provider={$$typeof:l,_context:I},I.Consumer=I},mt.createElement=oe,mt.createFactory=function(I){var G=oe.bind(null,I);return G.type=I,G},mt.createRef=function(){return{current:null}},mt.forwardRef=function(I){return{$$typeof:d,render:I}},mt.isValidElement=R,mt.lazy=function(I){return{$$typeof:m,_payload:{_status:-1,_result:I},_init:$}},mt.memo=function(I,G){return{$$typeof:h,type:I,compare:G===void 0?null:G}},mt.startTransition=function(I){var G=U.transition;U.transition={};try{I()}finally{U.transition=G}},mt.unstable_act=H,mt.useCallback=function(I,G){return Q.current.useCallback(I,G)},mt.useContext=function(I){return Q.current.useContext(I)},mt.useDebugValue=function(){},mt.useDeferredValue=function(I){return Q.current.useDeferredValue(I)},mt.useEffect=function(I,G){return Q.current.useEffect(I,G)},mt.useId=function(){return Q.current.useId()},mt.useImperativeHandle=function(I,G,j){return Q.current.useImperativeHandle(I,G,j)},mt.useInsertionEffect=function(I,G){return Q.current.useInsertionEffect(I,G)},mt.useLayoutEffect=function(I,G){return Q.current.useLayoutEffect(I,G)},mt.useMemo=function(I,G){return Q.current.useMemo(I,G)},mt.useReducer=function(I,G,j){return Q.current.useReducer(I,G,j)},mt.useRef=function(I){return Q.current.useRef(I)},mt.useState=function(I){return Q.current.useState(I)},mt.useSyncExternalStore=function(I,G,j){return Q.current.useSyncExternalStore(I,G,j)},mt.useTransition=function(){return Q.current.useTransition()},mt.version="18.3.1",mt}var _p;function Ud(){return _p||(_p=1,Ou.exports=Wv()),Ou.exports}var xp;function jv(){if(xp)return Vo;xp=1;var r=Ud(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,o=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function u(d,f,h){var m,g={},_=null,S=null;h!==void 0&&(_=""+h),f.key!==void 0&&(_=""+f.key),f.ref!==void 0&&(S=f.ref);for(m in f)s.call(f,m)&&!l.hasOwnProperty(m)&&(g[m]=f[m]);if(d&&d.defaultProps)for(m in f=d.defaultProps,f)g[m]===void 0&&(g[m]=f[m]);return{$$typeof:e,type:d,key:_,ref:S,props:g,_owner:o.current}}return Vo.Fragment=t,Vo.jsx=u,Vo.jsxs=u,Vo}var yp;function Xv(){return yp||(yp=1,Uu.exports=jv()),Uu.exports}var O=Xv(),pe=Ud();const fg=dg(pe),Yv=Vv({__proto__:null,default:fg},[pe]);var vl={},Fu={exports:{}},In={},ku={exports:{}},Bu={};var Sp;function qv(){return Sp||(Sp=1,(function(r){function e(U,Y){var H=U.length;U.push(Y);e:for(;0<H;){var I=H-1>>>1,G=U[I];if(0<o(G,Y))U[I]=Y,U[H]=G,H=I;else break e}}function t(U){return U.length===0?null:U[0]}function s(U){if(U.length===0)return null;var Y=U[0],H=U.pop();if(H!==Y){U[0]=H;e:for(var I=0,G=U.length,j=G>>>1;I<j;){var Z=2*(I+1)-1,fe=U[Z],xe=Z+1,Ee=U[xe];if(0>o(fe,H))xe<G&&0>o(Ee,fe)?(U[I]=Ee,U[xe]=H,I=xe):(U[I]=fe,U[Z]=H,I=Z);else if(xe<G&&0>o(Ee,H))U[I]=Ee,U[xe]=H,I=xe;else break e}}return Y}function o(U,Y){var H=U.sortIndex-Y.sortIndex;return H!==0?H:U.id-Y.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;r.unstable_now=function(){return l.now()}}else{var u=Date,d=u.now();r.unstable_now=function(){return u.now()-d}}var f=[],h=[],m=1,g=null,_=3,S=!1,T=!1,M=!1,x=typeof setTimeout=="function"?setTimeout:null,y=typeof clearTimeout=="function"?clearTimeout:null,w=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function b(U){for(var Y=t(h);Y!==null;){if(Y.callback===null)s(h);else if(Y.startTime<=U)s(h),Y.sortIndex=Y.expirationTime,e(f,Y);else break;Y=t(h)}}function P(U){if(M=!1,b(U),!T)if(t(f)!==null)T=!0,$(z);else{var Y=t(h);Y!==null&&Q(P,Y.startTime-U)}}function z(U,Y){T=!1,M&&(M=!1,y(oe),oe=-1),S=!0;var H=_;try{for(b(Y),g=t(f);g!==null&&(!(g.expirationTime>Y)||U&&!ie());){var I=g.callback;if(typeof I=="function"){g.callback=null,_=g.priorityLevel;var G=I(g.expirationTime<=Y);Y=r.unstable_now(),typeof G=="function"?g.callback=G:g===t(f)&&s(f),b(Y)}else s(f);g=t(f)}if(g!==null)var j=!0;else{var Z=t(h);Z!==null&&Q(P,Z.startTime-Y),j=!1}return j}finally{g=null,_=H,S=!1}}var k=!1,N=null,oe=-1,A=5,R=-1;function ie(){return!(r.unstable_now()-R<A)}function ue(){if(N!==null){var U=r.unstable_now();R=U;var Y=!0;try{Y=N(!0,U)}finally{Y?de():(k=!1,N=null)}}else k=!1}var de;if(typeof w=="function")de=function(){w(ue)};else if(typeof MessageChannel<"u"){var B=new MessageChannel,V=B.port2;B.port1.onmessage=ue,de=function(){V.postMessage(null)}}else de=function(){x(ue,0)};function $(U){N=U,k||(k=!0,de())}function Q(U,Y){oe=x(function(){U(r.unstable_now())},Y)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(U){U.callback=null},r.unstable_continueExecution=function(){T||S||(T=!0,$(z))},r.unstable_forceFrameRate=function(U){0>U||125<U?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):A=0<U?Math.floor(1e3/U):5},r.unstable_getCurrentPriorityLevel=function(){return _},r.unstable_getFirstCallbackNode=function(){return t(f)},r.unstable_next=function(U){switch(_){case 1:case 2:case 3:var Y=3;break;default:Y=_}var H=_;_=Y;try{return U()}finally{_=H}},r.unstable_pauseExecution=function(){},r.unstable_requestPaint=function(){},r.unstable_runWithPriority=function(U,Y){switch(U){case 1:case 2:case 3:case 4:case 5:break;default:U=3}var H=_;_=U;try{return Y()}finally{_=H}},r.unstable_scheduleCallback=function(U,Y,H){var I=r.unstable_now();switch(typeof H=="object"&&H!==null?(H=H.delay,H=typeof H=="number"&&0<H?I+H:I):H=I,U){case 1:var G=-1;break;case 2:G=250;break;case 5:G=1073741823;break;case 4:G=1e4;break;default:G=5e3}return G=H+G,U={id:m++,callback:Y,priorityLevel:U,startTime:H,expirationTime:G,sortIndex:-1},H>I?(U.sortIndex=H,e(h,U),t(f)===null&&U===t(h)&&(M?(y(oe),oe=-1):M=!0,Q(P,H-I))):(U.sortIndex=G,e(f,U),T||S||(T=!0,$(z))),U},r.unstable_shouldYield=ie,r.unstable_wrapCallback=function(U){var Y=_;return function(){var H=_;_=Y;try{return U.apply(this,arguments)}finally{_=H}}}})(Bu)),Bu}var Mp;function $v(){return Mp||(Mp=1,ku.exports=qv()),ku.exports}var Ep;function Kv(){if(Ep)return In;Ep=1;var r=Ud(),e=$v();function t(n){for(var i="https://reactjs.org/docs/error-decoder.html?invariant="+n,a=1;a<arguments.length;a++)i+="&args[]="+encodeURIComponent(arguments[a]);return"Minified React error #"+n+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var s=new Set,o={};function l(n,i){u(n,i),u(n+"Capture",i)}function u(n,i){for(o[n]=i,n=0;n<i.length;n++)s.add(i[n])}var d=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),f=Object.prototype.hasOwnProperty,h=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,m={},g={};function _(n){return f.call(g,n)?!0:f.call(m,n)?!1:h.test(n)?g[n]=!0:(m[n]=!0,!1)}function S(n,i,a,c){if(a!==null&&a.type===0)return!1;switch(typeof i){case"function":case"symbol":return!0;case"boolean":return c?!1:a!==null?!a.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function T(n,i,a,c){if(i===null||typeof i>"u"||S(n,i,a,c))return!0;if(c)return!1;if(a!==null)switch(a.type){case 3:return!i;case 4:return i===!1;case 5:return isNaN(i);case 6:return isNaN(i)||1>i}return!1}function M(n,i,a,c,p,v,E){this.acceptsBooleans=i===2||i===3||i===4,this.attributeName=c,this.attributeNamespace=p,this.mustUseProperty=a,this.propertyName=n,this.type=i,this.sanitizeURL=v,this.removeEmptyString=E}var x={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){x[n]=new M(n,0,!1,n,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var i=n[0];x[i]=new M(i,1,!1,n[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(n){x[n]=new M(n,2,!1,n.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){x[n]=new M(n,2,!1,n,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){x[n]=new M(n,3,!1,n.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(n){x[n]=new M(n,3,!0,n,null,!1,!1)}),["capture","download"].forEach(function(n){x[n]=new M(n,4,!1,n,null,!1,!1)}),["cols","rows","size","span"].forEach(function(n){x[n]=new M(n,6,!1,n,null,!1,!1)}),["rowSpan","start"].forEach(function(n){x[n]=new M(n,5,!1,n.toLowerCase(),null,!1,!1)});var y=/[\-:]([a-z])/g;function w(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var i=n.replace(y,w);x[i]=new M(i,1,!1,n,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var i=n.replace(y,w);x[i]=new M(i,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(n){var i=n.replace(y,w);x[i]=new M(i,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(n){x[n]=new M(n,1,!1,n.toLowerCase(),null,!1,!1)}),x.xlinkHref=new M("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(n){x[n]=new M(n,1,!1,n.toLowerCase(),null,!0,!0)});function b(n,i,a,c){var p=x.hasOwnProperty(i)?x[i]:null;(p!==null?p.type!==0:c||!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(T(i,a,p,c)&&(a=null),c||p===null?_(i)&&(a===null?n.removeAttribute(i):n.setAttribute(i,""+a)):p.mustUseProperty?n[p.propertyName]=a===null?p.type===3?!1:"":a:(i=p.attributeName,c=p.attributeNamespace,a===null?n.removeAttribute(i):(p=p.type,a=p===3||p===4&&a===!0?"":""+a,c?n.setAttributeNS(c,i,a):n.setAttribute(i,a))))}var P=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,z=Symbol.for("react.element"),k=Symbol.for("react.portal"),N=Symbol.for("react.fragment"),oe=Symbol.for("react.strict_mode"),A=Symbol.for("react.profiler"),R=Symbol.for("react.provider"),ie=Symbol.for("react.context"),ue=Symbol.for("react.forward_ref"),de=Symbol.for("react.suspense"),B=Symbol.for("react.suspense_list"),V=Symbol.for("react.memo"),$=Symbol.for("react.lazy"),Q=Symbol.for("react.offscreen"),U=Symbol.iterator;function Y(n){return n===null||typeof n!="object"?null:(n=U&&n[U]||n["@@iterator"],typeof n=="function"?n:null)}var H=Object.assign,I;function G(n){if(I===void 0)try{throw Error()}catch(a){var i=a.stack.trim().match(/\n( *(at )?)/);I=i&&i[1]||""}return`
`+I+n}var j=!1;function Z(n,i){if(!n||j)return"";j=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(i)if(i=function(){throw Error()},Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(re){var c=re}Reflect.construct(n,[],i)}else{try{i.call()}catch(re){c=re}n.call(i.prototype)}else{try{throw Error()}catch(re){c=re}n()}}catch(re){if(re&&c&&typeof re.stack=="string"){for(var p=re.stack.split(`
`),v=c.stack.split(`
`),E=p.length-1,F=v.length-1;1<=E&&0<=F&&p[E]!==v[F];)F--;for(;1<=E&&0<=F;E--,F--)if(p[E]!==v[F]){if(E!==1||F!==1)do if(E--,F--,0>F||p[E]!==v[F]){var W=`
`+p[E].replace(" at new "," at ");return n.displayName&&W.includes("<anonymous>")&&(W=W.replace("<anonymous>",n.displayName)),W}while(1<=E&&0<=F);break}}}finally{j=!1,Error.prepareStackTrace=a}return(n=n?n.displayName||n.name:"")?G(n):""}function fe(n){switch(n.tag){case 5:return G(n.type);case 16:return G("Lazy");case 13:return G("Suspense");case 19:return G("SuspenseList");case 0:case 2:case 15:return n=Z(n.type,!1),n;case 11:return n=Z(n.type.render,!1),n;case 1:return n=Z(n.type,!0),n;default:return""}}function xe(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case N:return"Fragment";case k:return"Portal";case A:return"Profiler";case oe:return"StrictMode";case de:return"Suspense";case B:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case ie:return(n.displayName||"Context")+".Consumer";case R:return(n._context.displayName||"Context")+".Provider";case ue:var i=n.render;return n=n.displayName,n||(n=i.displayName||i.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case V:return i=n.displayName||null,i!==null?i:xe(n.type)||"Memo";case $:i=n._payload,n=n._init;try{return xe(n(i))}catch{}}return null}function Ee(n){var i=n.type;switch(n.tag){case 24:return"Cache";case 9:return(i.displayName||"Context")+".Consumer";case 10:return(i._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=i.render,n=n.displayName||n.name||"",i.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return xe(i);case 8:return i===oe?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof i=="function")return i.displayName||i.name||null;if(typeof i=="string")return i}return null}function Te(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function Ne(n){var i=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function he(n){var i=Ne(n)?"checked":"value",a=Object.getOwnPropertyDescriptor(n.constructor.prototype,i),c=""+n[i];if(!n.hasOwnProperty(i)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var p=a.get,v=a.set;return Object.defineProperty(n,i,{configurable:!0,get:function(){return p.call(this)},set:function(E){c=""+E,v.call(this,E)}}),Object.defineProperty(n,i,{enumerable:a.enumerable}),{getValue:function(){return c},setValue:function(E){c=""+E},stopTracking:function(){n._valueTracker=null,delete n[i]}}}}function ve(n){n._valueTracker||(n._valueTracker=he(n))}function K(n){if(!n)return!1;var i=n._valueTracker;if(!i)return!0;var a=i.getValue(),c="";return n&&(c=Ne(n)?n.checked?"true":"false":n.value),n=c,n!==a?(i.setValue(n),!0):!1}function nt(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function Pe(n,i){var a=i.checked;return H({},i,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:a??n._wrapperState.initialChecked})}function Ve(n,i){var a=i.defaultValue==null?"":i.defaultValue,c=i.checked!=null?i.checked:i.defaultChecked;a=Te(i.value!=null?i.value:a),n._wrapperState={initialChecked:c,initialValue:a,controlled:i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null}}function Ue(n,i){i=i.checked,i!=null&&b(n,"checked",i,!1)}function $e(n,i){Ue(n,i);var a=Te(i.value),c=i.type;if(a!=null)c==="number"?(a===0&&n.value===""||n.value!=a)&&(n.value=""+a):n.value!==""+a&&(n.value=""+a);else if(c==="submit"||c==="reset"){n.removeAttribute("value");return}i.hasOwnProperty("value")?L(n,i.type,a):i.hasOwnProperty("defaultValue")&&L(n,i.type,Te(i.defaultValue)),i.checked==null&&i.defaultChecked!=null&&(n.defaultChecked=!!i.defaultChecked)}function Xe(n,i,a){if(i.hasOwnProperty("value")||i.hasOwnProperty("defaultValue")){var c=i.type;if(!(c!=="submit"&&c!=="reset"||i.value!==void 0&&i.value!==null))return;i=""+n._wrapperState.initialValue,a||i===n.value||(n.value=i),n.defaultValue=i}a=n.name,a!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,a!==""&&(n.name=a)}function L(n,i,a){(i!=="number"||nt(n.ownerDocument)!==n)&&(a==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+a&&(n.defaultValue=""+a))}var C=Array.isArray;function te(n,i,a,c){if(n=n.options,i){i={};for(var p=0;p<a.length;p++)i["$"+a[p]]=!0;for(a=0;a<n.length;a++)p=i.hasOwnProperty("$"+n[a].value),n[a].selected!==p&&(n[a].selected=p),p&&c&&(n[a].defaultSelected=!0)}else{for(a=""+Te(a),i=null,p=0;p<n.length;p++){if(n[p].value===a){n[p].selected=!0,c&&(n[p].defaultSelected=!0);return}i!==null||n[p].disabled||(i=n[p])}i!==null&&(i.selected=!0)}}function _e(n,i){if(i.dangerouslySetInnerHTML!=null)throw Error(t(91));return H({},i,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function ge(n,i){var a=i.value;if(a==null){if(a=i.children,i=i.defaultValue,a!=null){if(i!=null)throw Error(t(92));if(C(a)){if(1<a.length)throw Error(t(93));a=a[0]}i=a}i==null&&(i=""),a=i}n._wrapperState={initialValue:Te(a)}}function me(n,i){var a=Te(i.value),c=Te(i.defaultValue);a!=null&&(a=""+a,a!==n.value&&(n.value=a),i.defaultValue==null&&n.defaultValue!==a&&(n.defaultValue=a)),c!=null&&(n.defaultValue=""+c)}function Le(n){var i=n.textContent;i===n._wrapperState.initialValue&&i!==""&&i!==null&&(n.value=i)}function Ae(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function be(n,i){return n==null||n==="http://www.w3.org/1999/xhtml"?Ae(i):n==="http://www.w3.org/2000/svg"&&i==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var Ke,at=(function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(i,a,c,p){MSApp.execUnsafeLocalFunction(function(){return n(i,a,c,p)})}:n})(function(n,i){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=i;else{for(Ke=Ke||document.createElement("div"),Ke.innerHTML="<svg>"+i.valueOf().toString()+"</svg>",i=Ke.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;i.firstChild;)n.appendChild(i.firstChild)}});function Se(n,i){if(i){var a=n.firstChild;if(a&&a===n.lastChild&&a.nodeType===3){a.nodeValue=i;return}}n.textContent=i}var vt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},lt=["Webkit","ms","Moz","O"];Object.keys(vt).forEach(function(n){lt.forEach(function(i){i=i+n.charAt(0).toUpperCase()+n.substring(1),vt[i]=vt[n]})});function it(n,i,a){return i==null||typeof i=="boolean"||i===""?"":a||typeof i!="number"||i===0||vt.hasOwnProperty(n)&&vt[n]?(""+i).trim():i+"px"}function qe(n,i){n=n.style;for(var a in i)if(i.hasOwnProperty(a)){var c=a.indexOf("--")===0,p=it(a,i[a],c);a==="float"&&(a="cssFloat"),c?n.setProperty(a,p):n[a]=p}}var He=H({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function st(n,i){if(i){if(He[n]&&(i.children!=null||i.dangerouslySetInnerHTML!=null))throw Error(t(137,n));if(i.dangerouslySetInnerHTML!=null){if(i.children!=null)throw Error(t(60));if(typeof i.dangerouslySetInnerHTML!="object"||!("__html"in i.dangerouslySetInnerHTML))throw Error(t(61))}if(i.style!=null&&typeof i.style!="object")throw Error(t(62))}}function pt(n,i){if(n.indexOf("-")===-1)return typeof i.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Et=null;function ut(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var Re=null,X=null,De=null;function Oe(n){if(n=bo(n)){if(typeof Re!="function")throw Error(t(280));var i=n.stateNode;i&&(i=Da(i),Re(n.stateNode,n.type,i))}}function tt(n){X?De?De.push(n):De=[n]:X=n}function Ze(){if(X){var n=X,i=De;if(De=X=null,Oe(n),i)for(n=0;n<i.length;n++)Oe(i[n])}}function wt(n,i){return n(i)}function At(){}var Bt=!1;function Jt(n,i,a){if(Bt)return n(i,a);Bt=!0;try{return wt(n,i,a)}finally{Bt=!1,(X!==null||De!==null)&&(At(),Ze())}}function yt(n,i){var a=n.stateNode;if(a===null)return null;var c=Da(a);if(c===null)return null;a=c[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(c=!c.disabled)||(n=n.type,c=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!c;break e;default:n=!1}if(n)return null;if(a&&typeof a!="function")throw Error(t(231,i,typeof a));return a}var Yt=!1;if(d)try{var dn={};Object.defineProperty(dn,"passive",{get:function(){Yt=!0}}),window.addEventListener("test",dn,dn),window.removeEventListener("test",dn,dn)}catch{Yt=!1}function da(n,i,a,c,p,v,E,F,W){var re=Array.prototype.slice.call(arguments,3);try{i.apply(a,re)}catch(Me){this.onError(Me)}}var Pr=!1,bi=null,Dr=!1,Ki=null,fa={onError:function(n){Pr=!0,bi=n}};function ha(n,i,a,c,p,v,E,F,W){Pr=!1,bi=null,da.apply(fa,arguments)}function ic(n,i,a,c,p,v,E,F,W){if(ha.apply(this,arguments),Pr){if(Pr){var re=bi;Pr=!1,bi=null}else throw Error(t(198));Dr||(Dr=!0,Ki=re)}}function Ri(n){var i=n,a=n;if(n.alternate)for(;i.return;)i=i.return;else{n=i;do i=n,(i.flags&4098)!==0&&(a=i.return),n=i.return;while(n)}return i.tag===3?a:null}function pa(n){if(n.tag===13){var i=n.memoizedState;if(i===null&&(n=n.alternate,n!==null&&(i=n.memoizedState)),i!==null)return i.dehydrated}return null}function D(n){if(Ri(n)!==n)throw Error(t(188))}function ee(n){var i=n.alternate;if(!i){if(i=Ri(n),i===null)throw Error(t(188));return i!==n?null:n}for(var a=n,c=i;;){var p=a.return;if(p===null)break;var v=p.alternate;if(v===null){if(c=p.return,c!==null){a=c;continue}break}if(p.child===v.child){for(v=p.child;v;){if(v===a)return D(p),n;if(v===c)return D(p),i;v=v.sibling}throw Error(t(188))}if(a.return!==c.return)a=p,c=v;else{for(var E=!1,F=p.child;F;){if(F===a){E=!0,a=p,c=v;break}if(F===c){E=!0,c=p,a=v;break}F=F.sibling}if(!E){for(F=v.child;F;){if(F===a){E=!0,a=v,c=p;break}if(F===c){E=!0,c=v,a=p;break}F=F.sibling}if(!E)throw Error(t(189))}}if(a.alternate!==c)throw Error(t(190))}if(a.tag!==3)throw Error(t(188));return a.stateNode.current===a?n:i}function ae(n){return n=ee(n),n!==null?ce(n):null}function ce(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var i=ce(n);if(i!==null)return i;n=n.sibling}return null}var se=e.unstable_scheduleCallback,Fe=e.unstable_cancelCallback,Ye=e.unstable_shouldYield,et=e.unstable_requestPaint,Be=e.unstable_now,dt=e.unstable_getCurrentPriorityLevel,ot=e.unstable_ImmediatePriority,ct=e.unstable_UserBlockingPriority,Rt=e.unstable_NormalPriority,xn=e.unstable_LowPriority,Gt=e.unstable_IdlePriority,An=null,_t=null;function ft(n){if(_t&&typeof _t.onCommitFiberRoot=="function")try{_t.onCommitFiberRoot(An,n,void 0,(n.current.flags&128)===128)}catch{}}var yn=Math.clz32?Math.clz32:ma,Nt=Math.log,Li=Math.LN2;function ma(n){return n>>>=0,n===0?32:31-(Nt(n)/Li|0)|0}var xi=64,Zi=4194304;function zt(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function qn(n,i){var a=n.pendingLanes;if(a===0)return 0;var c=0,p=n.suspendedLanes,v=n.pingedLanes,E=a&268435455;if(E!==0){var F=E&~p;F!==0?c=zt(F):(v&=E,v!==0&&(c=zt(v)))}else E=a&~p,E!==0?c=zt(E):v!==0&&(c=zt(v));if(c===0)return 0;if(i!==0&&i!==c&&(i&p)===0&&(p=c&-c,v=i&-i,p>=v||p===16&&(v&4194240)!==0))return i;if((c&4)!==0&&(c|=a&16),i=n.entangledLanes,i!==0)for(n=n.entanglements,i&=c;0<i;)a=31-yn(i),p=1<<a,c|=n[a],i&=~p;return c}function co(n,i){switch(n){case 1:case 2:case 4:return i+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Cn(n,i){for(var a=n.suspendedLanes,c=n.pingedLanes,p=n.expirationTimes,v=n.pendingLanes;0<v;){var E=31-yn(v),F=1<<E,W=p[E];W===-1?((F&a)===0||(F&c)!==0)&&(p[E]=co(F,i)):W<=i&&(n.expiredLanes|=F),v&=~F}}function Ir(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function ga(){var n=xi;return xi<<=1,(xi&4194240)===0&&(xi=64),n}function ls(n){for(var i=[],a=0;31>a;a++)i.push(n);return i}function uo(n,i,a){n.pendingLanes|=i,i!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,i=31-yn(i),n[i]=a}function u0(n,i){var a=n.pendingLanes&~i;n.pendingLanes=i,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=i,n.mutableReadLanes&=i,n.entangledLanes&=i,i=n.entanglements;var c=n.eventTimes;for(n=n.expirationTimes;0<a;){var p=31-yn(a),v=1<<p;i[p]=0,c[p]=-1,n[p]=-1,a&=~v}}function rc(n,i){var a=n.entangledLanes|=i;for(n=n.entanglements;a;){var c=31-yn(a),p=1<<c;p&i|n[c]&i&&(n[c]|=i),a&=~p}}var Ct=0;function qd(n){return n&=-n,1<n?4<n?(n&268435455)!==0?16:536870912:4:1}var $d,sc,Kd,Zd,Qd,oc=!1,va=[],Qi=null,Ji=null,er=null,fo=new Map,ho=new Map,tr=[],d0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Jd(n,i){switch(n){case"focusin":case"focusout":Qi=null;break;case"dragenter":case"dragleave":Ji=null;break;case"mouseover":case"mouseout":er=null;break;case"pointerover":case"pointerout":fo.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":ho.delete(i.pointerId)}}function po(n,i,a,c,p,v){return n===null||n.nativeEvent!==v?(n={blockedOn:i,domEventName:a,eventSystemFlags:c,nativeEvent:v,targetContainers:[p]},i!==null&&(i=bo(i),i!==null&&sc(i)),n):(n.eventSystemFlags|=c,i=n.targetContainers,p!==null&&i.indexOf(p)===-1&&i.push(p),n)}function f0(n,i,a,c,p){switch(i){case"focusin":return Qi=po(Qi,n,i,a,c,p),!0;case"dragenter":return Ji=po(Ji,n,i,a,c,p),!0;case"mouseover":return er=po(er,n,i,a,c,p),!0;case"pointerover":var v=p.pointerId;return fo.set(v,po(fo.get(v)||null,n,i,a,c,p)),!0;case"gotpointercapture":return v=p.pointerId,ho.set(v,po(ho.get(v)||null,n,i,a,c,p)),!0}return!1}function ef(n){var i=Nr(n.target);if(i!==null){var a=Ri(i);if(a!==null){if(i=a.tag,i===13){if(i=pa(a),i!==null){n.blockedOn=i,Qd(n.priority,function(){Kd(a)});return}}else if(i===3&&a.stateNode.current.memoizedState.isDehydrated){n.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}n.blockedOn=null}function _a(n){if(n.blockedOn!==null)return!1;for(var i=n.targetContainers;0<i.length;){var a=lc(n.domEventName,n.eventSystemFlags,i[0],n.nativeEvent);if(a===null){a=n.nativeEvent;var c=new a.constructor(a.type,a);Et=c,a.target.dispatchEvent(c),Et=null}else return i=bo(a),i!==null&&sc(i),n.blockedOn=a,!1;i.shift()}return!0}function tf(n,i,a){_a(n)&&a.delete(i)}function h0(){oc=!1,Qi!==null&&_a(Qi)&&(Qi=null),Ji!==null&&_a(Ji)&&(Ji=null),er!==null&&_a(er)&&(er=null),fo.forEach(tf),ho.forEach(tf)}function mo(n,i){n.blockedOn===i&&(n.blockedOn=null,oc||(oc=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,h0)))}function go(n){function i(p){return mo(p,n)}if(0<va.length){mo(va[0],n);for(var a=1;a<va.length;a++){var c=va[a];c.blockedOn===n&&(c.blockedOn=null)}}for(Qi!==null&&mo(Qi,n),Ji!==null&&mo(Ji,n),er!==null&&mo(er,n),fo.forEach(i),ho.forEach(i),a=0;a<tr.length;a++)c=tr[a],c.blockedOn===n&&(c.blockedOn=null);for(;0<tr.length&&(a=tr[0],a.blockedOn===null);)ef(a),a.blockedOn===null&&tr.shift()}var cs=P.ReactCurrentBatchConfig,xa=!0;function p0(n,i,a,c){var p=Ct,v=cs.transition;cs.transition=null;try{Ct=1,ac(n,i,a,c)}finally{Ct=p,cs.transition=v}}function m0(n,i,a,c){var p=Ct,v=cs.transition;cs.transition=null;try{Ct=4,ac(n,i,a,c)}finally{Ct=p,cs.transition=v}}function ac(n,i,a,c){if(xa){var p=lc(n,i,a,c);if(p===null)wc(n,i,c,ya,a),Jd(n,c);else if(f0(p,n,i,a,c))c.stopPropagation();else if(Jd(n,c),i&4&&-1<d0.indexOf(n)){for(;p!==null;){var v=bo(p);if(v!==null&&$d(v),v=lc(n,i,a,c),v===null&&wc(n,i,c,ya,a),v===p)break;p=v}p!==null&&c.stopPropagation()}else wc(n,i,c,null,a)}}var ya=null;function lc(n,i,a,c){if(ya=null,n=ut(c),n=Nr(n),n!==null)if(i=Ri(n),i===null)n=null;else if(a=i.tag,a===13){if(n=pa(i),n!==null)return n;n=null}else if(a===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;n=null}else i!==n&&(n=null);return ya=n,null}function nf(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(dt()){case ot:return 1;case ct:return 4;case Rt:case xn:return 16;case Gt:return 536870912;default:return 16}default:return 16}}var nr=null,cc=null,Sa=null;function rf(){if(Sa)return Sa;var n,i=cc,a=i.length,c,p="value"in nr?nr.value:nr.textContent,v=p.length;for(n=0;n<a&&i[n]===p[n];n++);var E=a-n;for(c=1;c<=E&&i[a-c]===p[v-c];c++);return Sa=p.slice(n,1<c?1-c:void 0)}function Ma(n){var i=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&i===13&&(n=13)):n=i,n===10&&(n=13),32<=n||n===13?n:0}function Ea(){return!0}function sf(){return!1}function zn(n){function i(a,c,p,v,E){this._reactName=a,this._targetInst=p,this.type=c,this.nativeEvent=v,this.target=E,this.currentTarget=null;for(var F in n)n.hasOwnProperty(F)&&(a=n[F],this[F]=a?a(v):v[F]);return this.isDefaultPrevented=(v.defaultPrevented!=null?v.defaultPrevented:v.returnValue===!1)?Ea:sf,this.isPropagationStopped=sf,this}return H(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Ea)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Ea)},persist:function(){},isPersistent:Ea}),i}var us={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},uc=zn(us),vo=H({},us,{view:0,detail:0}),g0=zn(vo),dc,fc,_o,Ta=H({},vo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:pc,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==_o&&(_o&&n.type==="mousemove"?(dc=n.screenX-_o.screenX,fc=n.screenY-_o.screenY):fc=dc=0,_o=n),dc)},movementY:function(n){return"movementY"in n?n.movementY:fc}}),of=zn(Ta),v0=H({},Ta,{dataTransfer:0}),_0=zn(v0),x0=H({},vo,{relatedTarget:0}),hc=zn(x0),y0=H({},us,{animationName:0,elapsedTime:0,pseudoElement:0}),S0=zn(y0),M0=H({},us,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),E0=zn(M0),T0=H({},us,{data:0}),af=zn(T0),w0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},A0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},C0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function b0(n){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(n):(n=C0[n])?!!i[n]:!1}function pc(){return b0}var R0=H({},vo,{key:function(n){if(n.key){var i=w0[n.key]||n.key;if(i!=="Unidentified")return i}return n.type==="keypress"?(n=Ma(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?A0[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:pc,charCode:function(n){return n.type==="keypress"?Ma(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?Ma(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),L0=zn(R0),P0=H({},Ta,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),lf=zn(P0),D0=H({},vo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:pc}),I0=zn(D0),N0=H({},us,{propertyName:0,elapsedTime:0,pseudoElement:0}),U0=zn(N0),O0=H({},Ta,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),F0=zn(O0),k0=[9,13,27,32],mc=d&&"CompositionEvent"in window,xo=null;d&&"documentMode"in document&&(xo=document.documentMode);var B0=d&&"TextEvent"in window&&!xo,cf=d&&(!mc||xo&&8<xo&&11>=xo),uf=" ",df=!1;function ff(n,i){switch(n){case"keyup":return k0.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function hf(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var ds=!1;function z0(n,i){switch(n){case"compositionend":return hf(i);case"keypress":return i.which!==32?null:(df=!0,uf);case"textInput":return n=i.data,n===uf&&df?null:n;default:return null}}function H0(n,i){if(ds)return n==="compositionend"||!mc&&ff(n,i)?(n=rf(),Sa=cc=nr=null,ds=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return cf&&i.locale!=="ko"?null:i.data;default:return null}}var G0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function pf(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i==="input"?!!G0[n.type]:i==="textarea"}function mf(n,i,a,c){tt(c),i=Ra(i,"onChange"),0<i.length&&(a=new uc("onChange","change",null,a,c),n.push({event:a,listeners:i}))}var yo=null,So=null;function V0(n){If(n,0)}function wa(n){var i=gs(n);if(K(i))return n}function W0(n,i){if(n==="change")return i}var gf=!1;if(d){var gc;if(d){var vc="oninput"in document;if(!vc){var vf=document.createElement("div");vf.setAttribute("oninput","return;"),vc=typeof vf.oninput=="function"}gc=vc}else gc=!1;gf=gc&&(!document.documentMode||9<document.documentMode)}function _f(){yo&&(yo.detachEvent("onpropertychange",xf),So=yo=null)}function xf(n){if(n.propertyName==="value"&&wa(So)){var i=[];mf(i,So,n,ut(n)),Jt(V0,i)}}function j0(n,i,a){n==="focusin"?(_f(),yo=i,So=a,yo.attachEvent("onpropertychange",xf)):n==="focusout"&&_f()}function X0(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return wa(So)}function Y0(n,i){if(n==="click")return wa(i)}function q0(n,i){if(n==="input"||n==="change")return wa(i)}function $0(n,i){return n===i&&(n!==0||1/n===1/i)||n!==n&&i!==i}var ai=typeof Object.is=="function"?Object.is:$0;function Mo(n,i){if(ai(n,i))return!0;if(typeof n!="object"||n===null||typeof i!="object"||i===null)return!1;var a=Object.keys(n),c=Object.keys(i);if(a.length!==c.length)return!1;for(c=0;c<a.length;c++){var p=a[c];if(!f.call(i,p)||!ai(n[p],i[p]))return!1}return!0}function yf(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function Sf(n,i){var a=yf(n);n=0;for(var c;a;){if(a.nodeType===3){if(c=n+a.textContent.length,n<=i&&c>=i)return{node:a,offset:i-n};n=c}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=yf(a)}}function Mf(n,i){return n&&i?n===i?!0:n&&n.nodeType===3?!1:i&&i.nodeType===3?Mf(n,i.parentNode):"contains"in n?n.contains(i):n.compareDocumentPosition?!!(n.compareDocumentPosition(i)&16):!1:!1}function Ef(){for(var n=window,i=nt();i instanceof n.HTMLIFrameElement;){try{var a=typeof i.contentWindow.location.href=="string"}catch{a=!1}if(a)n=i.contentWindow;else break;i=nt(n.document)}return i}function _c(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i&&(i==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||i==="textarea"||n.contentEditable==="true")}function K0(n){var i=Ef(),a=n.focusedElem,c=n.selectionRange;if(i!==a&&a&&a.ownerDocument&&Mf(a.ownerDocument.documentElement,a)){if(c!==null&&_c(a)){if(i=c.start,n=c.end,n===void 0&&(n=i),"selectionStart"in a)a.selectionStart=i,a.selectionEnd=Math.min(n,a.value.length);else if(n=(i=a.ownerDocument||document)&&i.defaultView||window,n.getSelection){n=n.getSelection();var p=a.textContent.length,v=Math.min(c.start,p);c=c.end===void 0?v:Math.min(c.end,p),!n.extend&&v>c&&(p=c,c=v,v=p),p=Sf(a,v);var E=Sf(a,c);p&&E&&(n.rangeCount!==1||n.anchorNode!==p.node||n.anchorOffset!==p.offset||n.focusNode!==E.node||n.focusOffset!==E.offset)&&(i=i.createRange(),i.setStart(p.node,p.offset),n.removeAllRanges(),v>c?(n.addRange(i),n.extend(E.node,E.offset)):(i.setEnd(E.node,E.offset),n.addRange(i)))}}for(i=[],n=a;n=n.parentNode;)n.nodeType===1&&i.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof a.focus=="function"&&a.focus(),a=0;a<i.length;a++)n=i[a],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var Z0=d&&"documentMode"in document&&11>=document.documentMode,fs=null,xc=null,Eo=null,yc=!1;function Tf(n,i,a){var c=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;yc||fs==null||fs!==nt(c)||(c=fs,"selectionStart"in c&&_c(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}),Eo&&Mo(Eo,c)||(Eo=c,c=Ra(xc,"onSelect"),0<c.length&&(i=new uc("onSelect","select",null,i,a),n.push({event:i,listeners:c}),i.target=fs)))}function Aa(n,i){var a={};return a[n.toLowerCase()]=i.toLowerCase(),a["Webkit"+n]="webkit"+i,a["Moz"+n]="moz"+i,a}var hs={animationend:Aa("Animation","AnimationEnd"),animationiteration:Aa("Animation","AnimationIteration"),animationstart:Aa("Animation","AnimationStart"),transitionend:Aa("Transition","TransitionEnd")},Sc={},wf={};d&&(wf=document.createElement("div").style,"AnimationEvent"in window||(delete hs.animationend.animation,delete hs.animationiteration.animation,delete hs.animationstart.animation),"TransitionEvent"in window||delete hs.transitionend.transition);function Ca(n){if(Sc[n])return Sc[n];if(!hs[n])return n;var i=hs[n],a;for(a in i)if(i.hasOwnProperty(a)&&a in wf)return Sc[n]=i[a];return n}var Af=Ca("animationend"),Cf=Ca("animationiteration"),bf=Ca("animationstart"),Rf=Ca("transitionend"),Lf=new Map,Pf="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function ir(n,i){Lf.set(n,i),l(i,[n])}for(var Mc=0;Mc<Pf.length;Mc++){var Ec=Pf[Mc],Q0=Ec.toLowerCase(),J0=Ec[0].toUpperCase()+Ec.slice(1);ir(Q0,"on"+J0)}ir(Af,"onAnimationEnd"),ir(Cf,"onAnimationIteration"),ir(bf,"onAnimationStart"),ir("dblclick","onDoubleClick"),ir("focusin","onFocus"),ir("focusout","onBlur"),ir(Rf,"onTransitionEnd"),u("onMouseEnter",["mouseout","mouseover"]),u("onMouseLeave",["mouseout","mouseover"]),u("onPointerEnter",["pointerout","pointerover"]),u("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var To="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),ev=new Set("cancel close invalid load scroll toggle".split(" ").concat(To));function Df(n,i,a){var c=n.type||"unknown-event";n.currentTarget=a,ic(c,i,void 0,n),n.currentTarget=null}function If(n,i){i=(i&4)!==0;for(var a=0;a<n.length;a++){var c=n[a],p=c.event;c=c.listeners;e:{var v=void 0;if(i)for(var E=c.length-1;0<=E;E--){var F=c[E],W=F.instance,re=F.currentTarget;if(F=F.listener,W!==v&&p.isPropagationStopped())break e;Df(p,F,re),v=W}else for(E=0;E<c.length;E++){if(F=c[E],W=F.instance,re=F.currentTarget,F=F.listener,W!==v&&p.isPropagationStopped())break e;Df(p,F,re),v=W}}}if(Dr)throw n=Ki,Dr=!1,Ki=null,n}function Pt(n,i){var a=i[Pc];a===void 0&&(a=i[Pc]=new Set);var c=n+"__bubble";a.has(c)||(Nf(i,n,2,!1),a.add(c))}function Tc(n,i,a){var c=0;i&&(c|=4),Nf(a,n,c,i)}var ba="_reactListening"+Math.random().toString(36).slice(2);function wo(n){if(!n[ba]){n[ba]=!0,s.forEach(function(a){a!=="selectionchange"&&(ev.has(a)||Tc(a,!1,n),Tc(a,!0,n))});var i=n.nodeType===9?n:n.ownerDocument;i===null||i[ba]||(i[ba]=!0,Tc("selectionchange",!1,i))}}function Nf(n,i,a,c){switch(nf(i)){case 1:var p=p0;break;case 4:p=m0;break;default:p=ac}a=p.bind(null,i,a,n),p=void 0,!Yt||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(p=!0),c?p!==void 0?n.addEventListener(i,a,{capture:!0,passive:p}):n.addEventListener(i,a,!0):p!==void 0?n.addEventListener(i,a,{passive:p}):n.addEventListener(i,a,!1)}function wc(n,i,a,c,p){var v=c;if((i&1)===0&&(i&2)===0&&c!==null)e:for(;;){if(c===null)return;var E=c.tag;if(E===3||E===4){var F=c.stateNode.containerInfo;if(F===p||F.nodeType===8&&F.parentNode===p)break;if(E===4)for(E=c.return;E!==null;){var W=E.tag;if((W===3||W===4)&&(W=E.stateNode.containerInfo,W===p||W.nodeType===8&&W.parentNode===p))return;E=E.return}for(;F!==null;){if(E=Nr(F),E===null)return;if(W=E.tag,W===5||W===6){c=v=E;continue e}F=F.parentNode}}c=c.return}Jt(function(){var re=v,Me=ut(a),we=[];e:{var ye=Lf.get(n);if(ye!==void 0){var ke=uc,Ge=n;switch(n){case"keypress":if(Ma(a)===0)break e;case"keydown":case"keyup":ke=L0;break;case"focusin":Ge="focus",ke=hc;break;case"focusout":Ge="blur",ke=hc;break;case"beforeblur":case"afterblur":ke=hc;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ke=of;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ke=_0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ke=I0;break;case Af:case Cf:case bf:ke=S0;break;case Rf:ke=U0;break;case"scroll":ke=g0;break;case"wheel":ke=F0;break;case"copy":case"cut":case"paste":ke=E0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ke=lf}var We=(i&4)!==0,Vt=!We&&n==="scroll",J=We?ye!==null?ye+"Capture":null:ye;We=[];for(var q=re,ne;q!==null;){ne=q;var Ce=ne.stateNode;if(ne.tag===5&&Ce!==null&&(ne=Ce,J!==null&&(Ce=yt(q,J),Ce!=null&&We.push(Ao(q,Ce,ne)))),Vt)break;q=q.return}0<We.length&&(ye=new ke(ye,Ge,null,a,Me),we.push({event:ye,listeners:We}))}}if((i&7)===0){e:{if(ye=n==="mouseover"||n==="pointerover",ke=n==="mouseout"||n==="pointerout",ye&&a!==Et&&(Ge=a.relatedTarget||a.fromElement)&&(Nr(Ge)||Ge[Pi]))break e;if((ke||ye)&&(ye=Me.window===Me?Me:(ye=Me.ownerDocument)?ye.defaultView||ye.parentWindow:window,ke?(Ge=a.relatedTarget||a.toElement,ke=re,Ge=Ge?Nr(Ge):null,Ge!==null&&(Vt=Ri(Ge),Ge!==Vt||Ge.tag!==5&&Ge.tag!==6)&&(Ge=null)):(ke=null,Ge=re),ke!==Ge)){if(We=of,Ce="onMouseLeave",J="onMouseEnter",q="mouse",(n==="pointerout"||n==="pointerover")&&(We=lf,Ce="onPointerLeave",J="onPointerEnter",q="pointer"),Vt=ke==null?ye:gs(ke),ne=Ge==null?ye:gs(Ge),ye=new We(Ce,q+"leave",ke,a,Me),ye.target=Vt,ye.relatedTarget=ne,Ce=null,Nr(Me)===re&&(We=new We(J,q+"enter",Ge,a,Me),We.target=ne,We.relatedTarget=Vt,Ce=We),Vt=Ce,ke&&Ge)t:{for(We=ke,J=Ge,q=0,ne=We;ne;ne=ps(ne))q++;for(ne=0,Ce=J;Ce;Ce=ps(Ce))ne++;for(;0<q-ne;)We=ps(We),q--;for(;0<ne-q;)J=ps(J),ne--;for(;q--;){if(We===J||J!==null&&We===J.alternate)break t;We=ps(We),J=ps(J)}We=null}else We=null;ke!==null&&Uf(we,ye,ke,We,!1),Ge!==null&&Vt!==null&&Uf(we,Vt,Ge,We,!0)}}e:{if(ye=re?gs(re):window,ke=ye.nodeName&&ye.nodeName.toLowerCase(),ke==="select"||ke==="input"&&ye.type==="file")var je=W0;else if(pf(ye))if(gf)je=q0;else{je=X0;var Qe=j0}else(ke=ye.nodeName)&&ke.toLowerCase()==="input"&&(ye.type==="checkbox"||ye.type==="radio")&&(je=Y0);if(je&&(je=je(n,re))){mf(we,je,a,Me);break e}Qe&&Qe(n,ye,re),n==="focusout"&&(Qe=ye._wrapperState)&&Qe.controlled&&ye.type==="number"&&L(ye,"number",ye.value)}switch(Qe=re?gs(re):window,n){case"focusin":(pf(Qe)||Qe.contentEditable==="true")&&(fs=Qe,xc=re,Eo=null);break;case"focusout":Eo=xc=fs=null;break;case"mousedown":yc=!0;break;case"contextmenu":case"mouseup":case"dragend":yc=!1,Tf(we,a,Me);break;case"selectionchange":if(Z0)break;case"keydown":case"keyup":Tf(we,a,Me)}var Je;if(mc)e:{switch(n){case"compositionstart":var rt="onCompositionStart";break e;case"compositionend":rt="onCompositionEnd";break e;case"compositionupdate":rt="onCompositionUpdate";break e}rt=void 0}else ds?ff(n,a)&&(rt="onCompositionEnd"):n==="keydown"&&a.keyCode===229&&(rt="onCompositionStart");rt&&(cf&&a.locale!=="ko"&&(ds||rt!=="onCompositionStart"?rt==="onCompositionEnd"&&ds&&(Je=rf()):(nr=Me,cc="value"in nr?nr.value:nr.textContent,ds=!0)),Qe=Ra(re,rt),0<Qe.length&&(rt=new af(rt,n,null,a,Me),we.push({event:rt,listeners:Qe}),Je?rt.data=Je:(Je=hf(a),Je!==null&&(rt.data=Je)))),(Je=B0?z0(n,a):H0(n,a))&&(re=Ra(re,"onBeforeInput"),0<re.length&&(Me=new af("onBeforeInput","beforeinput",null,a,Me),we.push({event:Me,listeners:re}),Me.data=Je))}If(we,i)})}function Ao(n,i,a){return{instance:n,listener:i,currentTarget:a}}function Ra(n,i){for(var a=i+"Capture",c=[];n!==null;){var p=n,v=p.stateNode;p.tag===5&&v!==null&&(p=v,v=yt(n,a),v!=null&&c.unshift(Ao(n,v,p)),v=yt(n,i),v!=null&&c.push(Ao(n,v,p))),n=n.return}return c}function ps(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function Uf(n,i,a,c,p){for(var v=i._reactName,E=[];a!==null&&a!==c;){var F=a,W=F.alternate,re=F.stateNode;if(W!==null&&W===c)break;F.tag===5&&re!==null&&(F=re,p?(W=yt(a,v),W!=null&&E.unshift(Ao(a,W,F))):p||(W=yt(a,v),W!=null&&E.push(Ao(a,W,F)))),a=a.return}E.length!==0&&n.push({event:i,listeners:E})}var tv=/\r\n?/g,nv=/\u0000|\uFFFD/g;function Of(n){return(typeof n=="string"?n:""+n).replace(tv,`
`).replace(nv,"")}function La(n,i,a){if(i=Of(i),Of(n)!==i&&a)throw Error(t(425))}function Pa(){}var Ac=null,Cc=null;function bc(n,i){return n==="textarea"||n==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var Rc=typeof setTimeout=="function"?setTimeout:void 0,iv=typeof clearTimeout=="function"?clearTimeout:void 0,Ff=typeof Promise=="function"?Promise:void 0,rv=typeof queueMicrotask=="function"?queueMicrotask:typeof Ff<"u"?function(n){return Ff.resolve(null).then(n).catch(sv)}:Rc;function sv(n){setTimeout(function(){throw n})}function Lc(n,i){var a=i,c=0;do{var p=a.nextSibling;if(n.removeChild(a),p&&p.nodeType===8)if(a=p.data,a==="/$"){if(c===0){n.removeChild(p),go(i);return}c--}else a!=="$"&&a!=="$?"&&a!=="$!"||c++;a=p}while(a);go(i)}function rr(n){for(;n!=null;n=n.nextSibling){var i=n.nodeType;if(i===1||i===3)break;if(i===8){if(i=n.data,i==="$"||i==="$!"||i==="$?")break;if(i==="/$")return null}}return n}function kf(n){n=n.previousSibling;for(var i=0;n;){if(n.nodeType===8){var a=n.data;if(a==="$"||a==="$!"||a==="$?"){if(i===0)return n;i--}else a==="/$"&&i++}n=n.previousSibling}return null}var ms=Math.random().toString(36).slice(2),yi="__reactFiber$"+ms,Co="__reactProps$"+ms,Pi="__reactContainer$"+ms,Pc="__reactEvents$"+ms,ov="__reactListeners$"+ms,av="__reactHandles$"+ms;function Nr(n){var i=n[yi];if(i)return i;for(var a=n.parentNode;a;){if(i=a[Pi]||a[yi]){if(a=i.alternate,i.child!==null||a!==null&&a.child!==null)for(n=kf(n);n!==null;){if(a=n[yi])return a;n=kf(n)}return i}n=a,a=n.parentNode}return null}function bo(n){return n=n[yi]||n[Pi],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function gs(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(t(33))}function Da(n){return n[Co]||null}var Dc=[],vs=-1;function sr(n){return{current:n}}function Dt(n){0>vs||(n.current=Dc[vs],Dc[vs]=null,vs--)}function Lt(n,i){vs++,Dc[vs]=n.current,n.current=i}var or={},fn=sr(or),bn=sr(!1),Ur=or;function _s(n,i){var a=n.type.contextTypes;if(!a)return or;var c=n.stateNode;if(c&&c.__reactInternalMemoizedUnmaskedChildContext===i)return c.__reactInternalMemoizedMaskedChildContext;var p={},v;for(v in a)p[v]=i[v];return c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=i,n.__reactInternalMemoizedMaskedChildContext=p),p}function Rn(n){return n=n.childContextTypes,n!=null}function Ia(){Dt(bn),Dt(fn)}function Bf(n,i,a){if(fn.current!==or)throw Error(t(168));Lt(fn,i),Lt(bn,a)}function zf(n,i,a){var c=n.stateNode;if(i=i.childContextTypes,typeof c.getChildContext!="function")return a;c=c.getChildContext();for(var p in c)if(!(p in i))throw Error(t(108,Ee(n)||"Unknown",p));return H({},a,c)}function Na(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||or,Ur=fn.current,Lt(fn,n),Lt(bn,bn.current),!0}function Hf(n,i,a){var c=n.stateNode;if(!c)throw Error(t(169));a?(n=zf(n,i,Ur),c.__reactInternalMemoizedMergedChildContext=n,Dt(bn),Dt(fn),Lt(fn,n)):Dt(bn),Lt(bn,a)}var Di=null,Ua=!1,Ic=!1;function Gf(n){Di===null?Di=[n]:Di.push(n)}function lv(n){Ua=!0,Gf(n)}function ar(){if(!Ic&&Di!==null){Ic=!0;var n=0,i=Ct;try{var a=Di;for(Ct=1;n<a.length;n++){var c=a[n];do c=c(!0);while(c!==null)}Di=null,Ua=!1}catch(p){throw Di!==null&&(Di=Di.slice(n+1)),se(ot,ar),p}finally{Ct=i,Ic=!1}}return null}var xs=[],ys=0,Oa=null,Fa=0,$n=[],Kn=0,Or=null,Ii=1,Ni="";function Fr(n,i){xs[ys++]=Fa,xs[ys++]=Oa,Oa=n,Fa=i}function Vf(n,i,a){$n[Kn++]=Ii,$n[Kn++]=Ni,$n[Kn++]=Or,Or=n;var c=Ii;n=Ni;var p=32-yn(c)-1;c&=~(1<<p),a+=1;var v=32-yn(i)+p;if(30<v){var E=p-p%5;v=(c&(1<<E)-1).toString(32),c>>=E,p-=E,Ii=1<<32-yn(i)+p|a<<p|c,Ni=v+n}else Ii=1<<v|a<<p|c,Ni=n}function Nc(n){n.return!==null&&(Fr(n,1),Vf(n,1,0))}function Uc(n){for(;n===Oa;)Oa=xs[--ys],xs[ys]=null,Fa=xs[--ys],xs[ys]=null;for(;n===Or;)Or=$n[--Kn],$n[Kn]=null,Ni=$n[--Kn],$n[Kn]=null,Ii=$n[--Kn],$n[Kn]=null}var Hn=null,Gn=null,Ut=!1,li=null;function Wf(n,i){var a=ei(5,null,null,0);a.elementType="DELETED",a.stateNode=i,a.return=n,i=n.deletions,i===null?(n.deletions=[a],n.flags|=16):i.push(a)}function jf(n,i){switch(n.tag){case 5:var a=n.type;return i=i.nodeType!==1||a.toLowerCase()!==i.nodeName.toLowerCase()?null:i,i!==null?(n.stateNode=i,Hn=n,Gn=rr(i.firstChild),!0):!1;case 6:return i=n.pendingProps===""||i.nodeType!==3?null:i,i!==null?(n.stateNode=i,Hn=n,Gn=null,!0):!1;case 13:return i=i.nodeType!==8?null:i,i!==null?(a=Or!==null?{id:Ii,overflow:Ni}:null,n.memoizedState={dehydrated:i,treeContext:a,retryLane:1073741824},a=ei(18,null,null,0),a.stateNode=i,a.return=n,n.child=a,Hn=n,Gn=null,!0):!1;default:return!1}}function Oc(n){return(n.mode&1)!==0&&(n.flags&128)===0}function Fc(n){if(Ut){var i=Gn;if(i){var a=i;if(!jf(n,i)){if(Oc(n))throw Error(t(418));i=rr(a.nextSibling);var c=Hn;i&&jf(n,i)?Wf(c,a):(n.flags=n.flags&-4097|2,Ut=!1,Hn=n)}}else{if(Oc(n))throw Error(t(418));n.flags=n.flags&-4097|2,Ut=!1,Hn=n}}}function Xf(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;Hn=n}function ka(n){if(n!==Hn)return!1;if(!Ut)return Xf(n),Ut=!0,!1;var i;if((i=n.tag!==3)&&!(i=n.tag!==5)&&(i=n.type,i=i!=="head"&&i!=="body"&&!bc(n.type,n.memoizedProps)),i&&(i=Gn)){if(Oc(n))throw Yf(),Error(t(418));for(;i;)Wf(n,i),i=rr(i.nextSibling)}if(Xf(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(t(317));e:{for(n=n.nextSibling,i=0;n;){if(n.nodeType===8){var a=n.data;if(a==="/$"){if(i===0){Gn=rr(n.nextSibling);break e}i--}else a!=="$"&&a!=="$!"&&a!=="$?"||i++}n=n.nextSibling}Gn=null}}else Gn=Hn?rr(n.stateNode.nextSibling):null;return!0}function Yf(){for(var n=Gn;n;)n=rr(n.nextSibling)}function Ss(){Gn=Hn=null,Ut=!1}function kc(n){li===null?li=[n]:li.push(n)}var cv=P.ReactCurrentBatchConfig;function Ro(n,i,a){if(n=a.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(a._owner){if(a=a._owner,a){if(a.tag!==1)throw Error(t(309));var c=a.stateNode}if(!c)throw Error(t(147,n));var p=c,v=""+n;return i!==null&&i.ref!==null&&typeof i.ref=="function"&&i.ref._stringRef===v?i.ref:(i=function(E){var F=p.refs;E===null?delete F[v]:F[v]=E},i._stringRef=v,i)}if(typeof n!="string")throw Error(t(284));if(!a._owner)throw Error(t(290,n))}return n}function Ba(n,i){throw n=Object.prototype.toString.call(i),Error(t(31,n==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":n))}function qf(n){var i=n._init;return i(n._payload)}function $f(n){function i(J,q){if(n){var ne=J.deletions;ne===null?(J.deletions=[q],J.flags|=16):ne.push(q)}}function a(J,q){if(!n)return null;for(;q!==null;)i(J,q),q=q.sibling;return null}function c(J,q){for(J=new Map;q!==null;)q.key!==null?J.set(q.key,q):J.set(q.index,q),q=q.sibling;return J}function p(J,q){return J=mr(J,q),J.index=0,J.sibling=null,J}function v(J,q,ne){return J.index=ne,n?(ne=J.alternate,ne!==null?(ne=ne.index,ne<q?(J.flags|=2,q):ne):(J.flags|=2,q)):(J.flags|=1048576,q)}function E(J){return n&&J.alternate===null&&(J.flags|=2),J}function F(J,q,ne,Ce){return q===null||q.tag!==6?(q=Ru(ne,J.mode,Ce),q.return=J,q):(q=p(q,ne),q.return=J,q)}function W(J,q,ne,Ce){var je=ne.type;return je===N?Me(J,q,ne.props.children,Ce,ne.key):q!==null&&(q.elementType===je||typeof je=="object"&&je!==null&&je.$$typeof===$&&qf(je)===q.type)?(Ce=p(q,ne.props),Ce.ref=Ro(J,q,ne),Ce.return=J,Ce):(Ce=cl(ne.type,ne.key,ne.props,null,J.mode,Ce),Ce.ref=Ro(J,q,ne),Ce.return=J,Ce)}function re(J,q,ne,Ce){return q===null||q.tag!==4||q.stateNode.containerInfo!==ne.containerInfo||q.stateNode.implementation!==ne.implementation?(q=Lu(ne,J.mode,Ce),q.return=J,q):(q=p(q,ne.children||[]),q.return=J,q)}function Me(J,q,ne,Ce,je){return q===null||q.tag!==7?(q=jr(ne,J.mode,Ce,je),q.return=J,q):(q=p(q,ne),q.return=J,q)}function we(J,q,ne){if(typeof q=="string"&&q!==""||typeof q=="number")return q=Ru(""+q,J.mode,ne),q.return=J,q;if(typeof q=="object"&&q!==null){switch(q.$$typeof){case z:return ne=cl(q.type,q.key,q.props,null,J.mode,ne),ne.ref=Ro(J,null,q),ne.return=J,ne;case k:return q=Lu(q,J.mode,ne),q.return=J,q;case $:var Ce=q._init;return we(J,Ce(q._payload),ne)}if(C(q)||Y(q))return q=jr(q,J.mode,ne,null),q.return=J,q;Ba(J,q)}return null}function ye(J,q,ne,Ce){var je=q!==null?q.key:null;if(typeof ne=="string"&&ne!==""||typeof ne=="number")return je!==null?null:F(J,q,""+ne,Ce);if(typeof ne=="object"&&ne!==null){switch(ne.$$typeof){case z:return ne.key===je?W(J,q,ne,Ce):null;case k:return ne.key===je?re(J,q,ne,Ce):null;case $:return je=ne._init,ye(J,q,je(ne._payload),Ce)}if(C(ne)||Y(ne))return je!==null?null:Me(J,q,ne,Ce,null);Ba(J,ne)}return null}function ke(J,q,ne,Ce,je){if(typeof Ce=="string"&&Ce!==""||typeof Ce=="number")return J=J.get(ne)||null,F(q,J,""+Ce,je);if(typeof Ce=="object"&&Ce!==null){switch(Ce.$$typeof){case z:return J=J.get(Ce.key===null?ne:Ce.key)||null,W(q,J,Ce,je);case k:return J=J.get(Ce.key===null?ne:Ce.key)||null,re(q,J,Ce,je);case $:var Qe=Ce._init;return ke(J,q,ne,Qe(Ce._payload),je)}if(C(Ce)||Y(Ce))return J=J.get(ne)||null,Me(q,J,Ce,je,null);Ba(q,Ce)}return null}function Ge(J,q,ne,Ce){for(var je=null,Qe=null,Je=q,rt=q=0,nn=null;Je!==null&&rt<ne.length;rt++){Je.index>rt?(nn=Je,Je=null):nn=Je.sibling;var St=ye(J,Je,ne[rt],Ce);if(St===null){Je===null&&(Je=nn);break}n&&Je&&St.alternate===null&&i(J,Je),q=v(St,q,rt),Qe===null?je=St:Qe.sibling=St,Qe=St,Je=nn}if(rt===ne.length)return a(J,Je),Ut&&Fr(J,rt),je;if(Je===null){for(;rt<ne.length;rt++)Je=we(J,ne[rt],Ce),Je!==null&&(q=v(Je,q,rt),Qe===null?je=Je:Qe.sibling=Je,Qe=Je);return Ut&&Fr(J,rt),je}for(Je=c(J,Je);rt<ne.length;rt++)nn=ke(Je,J,rt,ne[rt],Ce),nn!==null&&(n&&nn.alternate!==null&&Je.delete(nn.key===null?rt:nn.key),q=v(nn,q,rt),Qe===null?je=nn:Qe.sibling=nn,Qe=nn);return n&&Je.forEach(function(gr){return i(J,gr)}),Ut&&Fr(J,rt),je}function We(J,q,ne,Ce){var je=Y(ne);if(typeof je!="function")throw Error(t(150));if(ne=je.call(ne),ne==null)throw Error(t(151));for(var Qe=je=null,Je=q,rt=q=0,nn=null,St=ne.next();Je!==null&&!St.done;rt++,St=ne.next()){Je.index>rt?(nn=Je,Je=null):nn=Je.sibling;var gr=ye(J,Je,St.value,Ce);if(gr===null){Je===null&&(Je=nn);break}n&&Je&&gr.alternate===null&&i(J,Je),q=v(gr,q,rt),Qe===null?je=gr:Qe.sibling=gr,Qe=gr,Je=nn}if(St.done)return a(J,Je),Ut&&Fr(J,rt),je;if(Je===null){for(;!St.done;rt++,St=ne.next())St=we(J,St.value,Ce),St!==null&&(q=v(St,q,rt),Qe===null?je=St:Qe.sibling=St,Qe=St);return Ut&&Fr(J,rt),je}for(Je=c(J,Je);!St.done;rt++,St=ne.next())St=ke(Je,J,rt,St.value,Ce),St!==null&&(n&&St.alternate!==null&&Je.delete(St.key===null?rt:St.key),q=v(St,q,rt),Qe===null?je=St:Qe.sibling=St,Qe=St);return n&&Je.forEach(function(Gv){return i(J,Gv)}),Ut&&Fr(J,rt),je}function Vt(J,q,ne,Ce){if(typeof ne=="object"&&ne!==null&&ne.type===N&&ne.key===null&&(ne=ne.props.children),typeof ne=="object"&&ne!==null){switch(ne.$$typeof){case z:e:{for(var je=ne.key,Qe=q;Qe!==null;){if(Qe.key===je){if(je=ne.type,je===N){if(Qe.tag===7){a(J,Qe.sibling),q=p(Qe,ne.props.children),q.return=J,J=q;break e}}else if(Qe.elementType===je||typeof je=="object"&&je!==null&&je.$$typeof===$&&qf(je)===Qe.type){a(J,Qe.sibling),q=p(Qe,ne.props),q.ref=Ro(J,Qe,ne),q.return=J,J=q;break e}a(J,Qe);break}else i(J,Qe);Qe=Qe.sibling}ne.type===N?(q=jr(ne.props.children,J.mode,Ce,ne.key),q.return=J,J=q):(Ce=cl(ne.type,ne.key,ne.props,null,J.mode,Ce),Ce.ref=Ro(J,q,ne),Ce.return=J,J=Ce)}return E(J);case k:e:{for(Qe=ne.key;q!==null;){if(q.key===Qe)if(q.tag===4&&q.stateNode.containerInfo===ne.containerInfo&&q.stateNode.implementation===ne.implementation){a(J,q.sibling),q=p(q,ne.children||[]),q.return=J,J=q;break e}else{a(J,q);break}else i(J,q);q=q.sibling}q=Lu(ne,J.mode,Ce),q.return=J,J=q}return E(J);case $:return Qe=ne._init,Vt(J,q,Qe(ne._payload),Ce)}if(C(ne))return Ge(J,q,ne,Ce);if(Y(ne))return We(J,q,ne,Ce);Ba(J,ne)}return typeof ne=="string"&&ne!==""||typeof ne=="number"?(ne=""+ne,q!==null&&q.tag===6?(a(J,q.sibling),q=p(q,ne),q.return=J,J=q):(a(J,q),q=Ru(ne,J.mode,Ce),q.return=J,J=q),E(J)):a(J,q)}return Vt}var Ms=$f(!0),Kf=$f(!1),za=sr(null),Ha=null,Es=null,Bc=null;function zc(){Bc=Es=Ha=null}function Hc(n){var i=za.current;Dt(za),n._currentValue=i}function Gc(n,i,a){for(;n!==null;){var c=n.alternate;if((n.childLanes&i)!==i?(n.childLanes|=i,c!==null&&(c.childLanes|=i)):c!==null&&(c.childLanes&i)!==i&&(c.childLanes|=i),n===a)break;n=n.return}}function Ts(n,i){Ha=n,Bc=Es=null,n=n.dependencies,n!==null&&n.firstContext!==null&&((n.lanes&i)!==0&&(Ln=!0),n.firstContext=null)}function Zn(n){var i=n._currentValue;if(Bc!==n)if(n={context:n,memoizedValue:i,next:null},Es===null){if(Ha===null)throw Error(t(308));Es=n,Ha.dependencies={lanes:0,firstContext:n}}else Es=Es.next=n;return i}var kr=null;function Vc(n){kr===null?kr=[n]:kr.push(n)}function Zf(n,i,a,c){var p=i.interleaved;return p===null?(a.next=a,Vc(i)):(a.next=p.next,p.next=a),i.interleaved=a,Ui(n,c)}function Ui(n,i){n.lanes|=i;var a=n.alternate;for(a!==null&&(a.lanes|=i),a=n,n=n.return;n!==null;)n.childLanes|=i,a=n.alternate,a!==null&&(a.childLanes|=i),a=n,n=n.return;return a.tag===3?a.stateNode:null}var lr=!1;function Wc(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Qf(n,i){n=n.updateQueue,i.updateQueue===n&&(i.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function Oi(n,i){return{eventTime:n,lane:i,tag:0,payload:null,callback:null,next:null}}function cr(n,i,a){var c=n.updateQueue;if(c===null)return null;if(c=c.shared,(xt&2)!==0){var p=c.pending;return p===null?i.next=i:(i.next=p.next,p.next=i),c.pending=i,Ui(n,a)}return p=c.interleaved,p===null?(i.next=i,Vc(c)):(i.next=p.next,p.next=i),c.interleaved=i,Ui(n,a)}function Ga(n,i,a){if(i=i.updateQueue,i!==null&&(i=i.shared,(a&4194240)!==0)){var c=i.lanes;c&=n.pendingLanes,a|=c,i.lanes=a,rc(n,a)}}function Jf(n,i){var a=n.updateQueue,c=n.alternate;if(c!==null&&(c=c.updateQueue,a===c)){var p=null,v=null;if(a=a.firstBaseUpdate,a!==null){do{var E={eventTime:a.eventTime,lane:a.lane,tag:a.tag,payload:a.payload,callback:a.callback,next:null};v===null?p=v=E:v=v.next=E,a=a.next}while(a!==null);v===null?p=v=i:v=v.next=i}else p=v=i;a={baseState:c.baseState,firstBaseUpdate:p,lastBaseUpdate:v,shared:c.shared,effects:c.effects},n.updateQueue=a;return}n=a.lastBaseUpdate,n===null?a.firstBaseUpdate=i:n.next=i,a.lastBaseUpdate=i}function Va(n,i,a,c){var p=n.updateQueue;lr=!1;var v=p.firstBaseUpdate,E=p.lastBaseUpdate,F=p.shared.pending;if(F!==null){p.shared.pending=null;var W=F,re=W.next;W.next=null,E===null?v=re:E.next=re,E=W;var Me=n.alternate;Me!==null&&(Me=Me.updateQueue,F=Me.lastBaseUpdate,F!==E&&(F===null?Me.firstBaseUpdate=re:F.next=re,Me.lastBaseUpdate=W))}if(v!==null){var we=p.baseState;E=0,Me=re=W=null,F=v;do{var ye=F.lane,ke=F.eventTime;if((c&ye)===ye){Me!==null&&(Me=Me.next={eventTime:ke,lane:0,tag:F.tag,payload:F.payload,callback:F.callback,next:null});e:{var Ge=n,We=F;switch(ye=i,ke=a,We.tag){case 1:if(Ge=We.payload,typeof Ge=="function"){we=Ge.call(ke,we,ye);break e}we=Ge;break e;case 3:Ge.flags=Ge.flags&-65537|128;case 0:if(Ge=We.payload,ye=typeof Ge=="function"?Ge.call(ke,we,ye):Ge,ye==null)break e;we=H({},we,ye);break e;case 2:lr=!0}}F.callback!==null&&F.lane!==0&&(n.flags|=64,ye=p.effects,ye===null?p.effects=[F]:ye.push(F))}else ke={eventTime:ke,lane:ye,tag:F.tag,payload:F.payload,callback:F.callback,next:null},Me===null?(re=Me=ke,W=we):Me=Me.next=ke,E|=ye;if(F=F.next,F===null){if(F=p.shared.pending,F===null)break;ye=F,F=ye.next,ye.next=null,p.lastBaseUpdate=ye,p.shared.pending=null}}while(!0);if(Me===null&&(W=we),p.baseState=W,p.firstBaseUpdate=re,p.lastBaseUpdate=Me,i=p.shared.interleaved,i!==null){p=i;do E|=p.lane,p=p.next;while(p!==i)}else v===null&&(p.shared.lanes=0);Hr|=E,n.lanes=E,n.memoizedState=we}}function eh(n,i,a){if(n=i.effects,i.effects=null,n!==null)for(i=0;i<n.length;i++){var c=n[i],p=c.callback;if(p!==null){if(c.callback=null,c=a,typeof p!="function")throw Error(t(191,p));p.call(c)}}}var Lo={},Si=sr(Lo),Po=sr(Lo),Do=sr(Lo);function Br(n){if(n===Lo)throw Error(t(174));return n}function jc(n,i){switch(Lt(Do,i),Lt(Po,n),Lt(Si,Lo),n=i.nodeType,n){case 9:case 11:i=(i=i.documentElement)?i.namespaceURI:be(null,"");break;default:n=n===8?i.parentNode:i,i=n.namespaceURI||null,n=n.tagName,i=be(i,n)}Dt(Si),Lt(Si,i)}function ws(){Dt(Si),Dt(Po),Dt(Do)}function th(n){Br(Do.current);var i=Br(Si.current),a=be(i,n.type);i!==a&&(Lt(Po,n),Lt(Si,a))}function Xc(n){Po.current===n&&(Dt(Si),Dt(Po))}var Ft=sr(0);function Wa(n){for(var i=n;i!==null;){if(i.tag===13){var a=i.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||a.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var Yc=[];function qc(){for(var n=0;n<Yc.length;n++)Yc[n]._workInProgressVersionPrimary=null;Yc.length=0}var ja=P.ReactCurrentDispatcher,$c=P.ReactCurrentBatchConfig,zr=0,kt=null,qt=null,en=null,Xa=!1,Io=!1,No=0,uv=0;function hn(){throw Error(t(321))}function Kc(n,i){if(i===null)return!1;for(var a=0;a<i.length&&a<n.length;a++)if(!ai(n[a],i[a]))return!1;return!0}function Zc(n,i,a,c,p,v){if(zr=v,kt=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,ja.current=n===null||n.memoizedState===null?pv:mv,n=a(c,p),Io){v=0;do{if(Io=!1,No=0,25<=v)throw Error(t(301));v+=1,en=qt=null,i.updateQueue=null,ja.current=gv,n=a(c,p)}while(Io)}if(ja.current=$a,i=qt!==null&&qt.next!==null,zr=0,en=qt=kt=null,Xa=!1,i)throw Error(t(300));return n}function Qc(){var n=No!==0;return No=0,n}function Mi(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return en===null?kt.memoizedState=en=n:en=en.next=n,en}function Qn(){if(qt===null){var n=kt.alternate;n=n!==null?n.memoizedState:null}else n=qt.next;var i=en===null?kt.memoizedState:en.next;if(i!==null)en=i,qt=n;else{if(n===null)throw Error(t(310));qt=n,n={memoizedState:qt.memoizedState,baseState:qt.baseState,baseQueue:qt.baseQueue,queue:qt.queue,next:null},en===null?kt.memoizedState=en=n:en=en.next=n}return en}function Uo(n,i){return typeof i=="function"?i(n):i}function Jc(n){var i=Qn(),a=i.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var c=qt,p=c.baseQueue,v=a.pending;if(v!==null){if(p!==null){var E=p.next;p.next=v.next,v.next=E}c.baseQueue=p=v,a.pending=null}if(p!==null){v=p.next,c=c.baseState;var F=E=null,W=null,re=v;do{var Me=re.lane;if((zr&Me)===Me)W!==null&&(W=W.next={lane:0,action:re.action,hasEagerState:re.hasEagerState,eagerState:re.eagerState,next:null}),c=re.hasEagerState?re.eagerState:n(c,re.action);else{var we={lane:Me,action:re.action,hasEagerState:re.hasEagerState,eagerState:re.eagerState,next:null};W===null?(F=W=we,E=c):W=W.next=we,kt.lanes|=Me,Hr|=Me}re=re.next}while(re!==null&&re!==v);W===null?E=c:W.next=F,ai(c,i.memoizedState)||(Ln=!0),i.memoizedState=c,i.baseState=E,i.baseQueue=W,a.lastRenderedState=c}if(n=a.interleaved,n!==null){p=n;do v=p.lane,kt.lanes|=v,Hr|=v,p=p.next;while(p!==n)}else p===null&&(a.lanes=0);return[i.memoizedState,a.dispatch]}function eu(n){var i=Qn(),a=i.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var c=a.dispatch,p=a.pending,v=i.memoizedState;if(p!==null){a.pending=null;var E=p=p.next;do v=n(v,E.action),E=E.next;while(E!==p);ai(v,i.memoizedState)||(Ln=!0),i.memoizedState=v,i.baseQueue===null&&(i.baseState=v),a.lastRenderedState=v}return[v,c]}function nh(){}function ih(n,i){var a=kt,c=Qn(),p=i(),v=!ai(c.memoizedState,p);if(v&&(c.memoizedState=p,Ln=!0),c=c.queue,tu(oh.bind(null,a,c,n),[n]),c.getSnapshot!==i||v||en!==null&&en.memoizedState.tag&1){if(a.flags|=2048,Oo(9,sh.bind(null,a,c,p,i),void 0,null),tn===null)throw Error(t(349));(zr&30)!==0||rh(a,i,p)}return p}function rh(n,i,a){n.flags|=16384,n={getSnapshot:i,value:a},i=kt.updateQueue,i===null?(i={lastEffect:null,stores:null},kt.updateQueue=i,i.stores=[n]):(a=i.stores,a===null?i.stores=[n]:a.push(n))}function sh(n,i,a,c){i.value=a,i.getSnapshot=c,ah(i)&&lh(n)}function oh(n,i,a){return a(function(){ah(i)&&lh(n)})}function ah(n){var i=n.getSnapshot;n=n.value;try{var a=i();return!ai(n,a)}catch{return!0}}function lh(n){var i=Ui(n,1);i!==null&&fi(i,n,1,-1)}function ch(n){var i=Mi();return typeof n=="function"&&(n=n()),i.memoizedState=i.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Uo,lastRenderedState:n},i.queue=n,n=n.dispatch=hv.bind(null,kt,n),[i.memoizedState,n]}function Oo(n,i,a,c){return n={tag:n,create:i,destroy:a,deps:c,next:null},i=kt.updateQueue,i===null?(i={lastEffect:null,stores:null},kt.updateQueue=i,i.lastEffect=n.next=n):(a=i.lastEffect,a===null?i.lastEffect=n.next=n:(c=a.next,a.next=n,n.next=c,i.lastEffect=n)),n}function uh(){return Qn().memoizedState}function Ya(n,i,a,c){var p=Mi();kt.flags|=n,p.memoizedState=Oo(1|i,a,void 0,c===void 0?null:c)}function qa(n,i,a,c){var p=Qn();c=c===void 0?null:c;var v=void 0;if(qt!==null){var E=qt.memoizedState;if(v=E.destroy,c!==null&&Kc(c,E.deps)){p.memoizedState=Oo(i,a,v,c);return}}kt.flags|=n,p.memoizedState=Oo(1|i,a,v,c)}function dh(n,i){return Ya(8390656,8,n,i)}function tu(n,i){return qa(2048,8,n,i)}function fh(n,i){return qa(4,2,n,i)}function hh(n,i){return qa(4,4,n,i)}function ph(n,i){if(typeof i=="function")return n=n(),i(n),function(){i(null)};if(i!=null)return n=n(),i.current=n,function(){i.current=null}}function mh(n,i,a){return a=a!=null?a.concat([n]):null,qa(4,4,ph.bind(null,i,n),a)}function nu(){}function gh(n,i){var a=Qn();i=i===void 0?null:i;var c=a.memoizedState;return c!==null&&i!==null&&Kc(i,c[1])?c[0]:(a.memoizedState=[n,i],n)}function vh(n,i){var a=Qn();i=i===void 0?null:i;var c=a.memoizedState;return c!==null&&i!==null&&Kc(i,c[1])?c[0]:(n=n(),a.memoizedState=[n,i],n)}function _h(n,i,a){return(zr&21)===0?(n.baseState&&(n.baseState=!1,Ln=!0),n.memoizedState=a):(ai(a,i)||(a=ga(),kt.lanes|=a,Hr|=a,n.baseState=!0),i)}function dv(n,i){var a=Ct;Ct=a!==0&&4>a?a:4,n(!0);var c=$c.transition;$c.transition={};try{n(!1),i()}finally{Ct=a,$c.transition=c}}function xh(){return Qn().memoizedState}function fv(n,i,a){var c=hr(n);if(a={lane:c,action:a,hasEagerState:!1,eagerState:null,next:null},yh(n))Sh(i,a);else if(a=Zf(n,i,a,c),a!==null){var p=Mn();fi(a,n,c,p),Mh(a,i,c)}}function hv(n,i,a){var c=hr(n),p={lane:c,action:a,hasEagerState:!1,eagerState:null,next:null};if(yh(n))Sh(i,p);else{var v=n.alternate;if(n.lanes===0&&(v===null||v.lanes===0)&&(v=i.lastRenderedReducer,v!==null))try{var E=i.lastRenderedState,F=v(E,a);if(p.hasEagerState=!0,p.eagerState=F,ai(F,E)){var W=i.interleaved;W===null?(p.next=p,Vc(i)):(p.next=W.next,W.next=p),i.interleaved=p;return}}catch{}a=Zf(n,i,p,c),a!==null&&(p=Mn(),fi(a,n,c,p),Mh(a,i,c))}}function yh(n){var i=n.alternate;return n===kt||i!==null&&i===kt}function Sh(n,i){Io=Xa=!0;var a=n.pending;a===null?i.next=i:(i.next=a.next,a.next=i),n.pending=i}function Mh(n,i,a){if((a&4194240)!==0){var c=i.lanes;c&=n.pendingLanes,a|=c,i.lanes=a,rc(n,a)}}var $a={readContext:Zn,useCallback:hn,useContext:hn,useEffect:hn,useImperativeHandle:hn,useInsertionEffect:hn,useLayoutEffect:hn,useMemo:hn,useReducer:hn,useRef:hn,useState:hn,useDebugValue:hn,useDeferredValue:hn,useTransition:hn,useMutableSource:hn,useSyncExternalStore:hn,useId:hn,unstable_isNewReconciler:!1},pv={readContext:Zn,useCallback:function(n,i){return Mi().memoizedState=[n,i===void 0?null:i],n},useContext:Zn,useEffect:dh,useImperativeHandle:function(n,i,a){return a=a!=null?a.concat([n]):null,Ya(4194308,4,ph.bind(null,i,n),a)},useLayoutEffect:function(n,i){return Ya(4194308,4,n,i)},useInsertionEffect:function(n,i){return Ya(4,2,n,i)},useMemo:function(n,i){var a=Mi();return i=i===void 0?null:i,n=n(),a.memoizedState=[n,i],n},useReducer:function(n,i,a){var c=Mi();return i=a!==void 0?a(i):i,c.memoizedState=c.baseState=i,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:i},c.queue=n,n=n.dispatch=fv.bind(null,kt,n),[c.memoizedState,n]},useRef:function(n){var i=Mi();return n={current:n},i.memoizedState=n},useState:ch,useDebugValue:nu,useDeferredValue:function(n){return Mi().memoizedState=n},useTransition:function(){var n=ch(!1),i=n[0];return n=dv.bind(null,n[1]),Mi().memoizedState=n,[i,n]},useMutableSource:function(){},useSyncExternalStore:function(n,i,a){var c=kt,p=Mi();if(Ut){if(a===void 0)throw Error(t(407));a=a()}else{if(a=i(),tn===null)throw Error(t(349));(zr&30)!==0||rh(c,i,a)}p.memoizedState=a;var v={value:a,getSnapshot:i};return p.queue=v,dh(oh.bind(null,c,v,n),[n]),c.flags|=2048,Oo(9,sh.bind(null,c,v,a,i),void 0,null),a},useId:function(){var n=Mi(),i=tn.identifierPrefix;if(Ut){var a=Ni,c=Ii;a=(c&~(1<<32-yn(c)-1)).toString(32)+a,i=":"+i+"R"+a,a=No++,0<a&&(i+="H"+a.toString(32)),i+=":"}else a=uv++,i=":"+i+"r"+a.toString(32)+":";return n.memoizedState=i},unstable_isNewReconciler:!1},mv={readContext:Zn,useCallback:gh,useContext:Zn,useEffect:tu,useImperativeHandle:mh,useInsertionEffect:fh,useLayoutEffect:hh,useMemo:vh,useReducer:Jc,useRef:uh,useState:function(){return Jc(Uo)},useDebugValue:nu,useDeferredValue:function(n){var i=Qn();return _h(i,qt.memoizedState,n)},useTransition:function(){var n=Jc(Uo)[0],i=Qn().memoizedState;return[n,i]},useMutableSource:nh,useSyncExternalStore:ih,useId:xh,unstable_isNewReconciler:!1},gv={readContext:Zn,useCallback:gh,useContext:Zn,useEffect:tu,useImperativeHandle:mh,useInsertionEffect:fh,useLayoutEffect:hh,useMemo:vh,useReducer:eu,useRef:uh,useState:function(){return eu(Uo)},useDebugValue:nu,useDeferredValue:function(n){var i=Qn();return qt===null?i.memoizedState=n:_h(i,qt.memoizedState,n)},useTransition:function(){var n=eu(Uo)[0],i=Qn().memoizedState;return[n,i]},useMutableSource:nh,useSyncExternalStore:ih,useId:xh,unstable_isNewReconciler:!1};function ci(n,i){if(n&&n.defaultProps){i=H({},i),n=n.defaultProps;for(var a in n)i[a]===void 0&&(i[a]=n[a]);return i}return i}function iu(n,i,a,c){i=n.memoizedState,a=a(c,i),a=a==null?i:H({},i,a),n.memoizedState=a,n.lanes===0&&(n.updateQueue.baseState=a)}var Ka={isMounted:function(n){return(n=n._reactInternals)?Ri(n)===n:!1},enqueueSetState:function(n,i,a){n=n._reactInternals;var c=Mn(),p=hr(n),v=Oi(c,p);v.payload=i,a!=null&&(v.callback=a),i=cr(n,v,p),i!==null&&(fi(i,n,p,c),Ga(i,n,p))},enqueueReplaceState:function(n,i,a){n=n._reactInternals;var c=Mn(),p=hr(n),v=Oi(c,p);v.tag=1,v.payload=i,a!=null&&(v.callback=a),i=cr(n,v,p),i!==null&&(fi(i,n,p,c),Ga(i,n,p))},enqueueForceUpdate:function(n,i){n=n._reactInternals;var a=Mn(),c=hr(n),p=Oi(a,c);p.tag=2,i!=null&&(p.callback=i),i=cr(n,p,c),i!==null&&(fi(i,n,c,a),Ga(i,n,c))}};function Eh(n,i,a,c,p,v,E){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(c,v,E):i.prototype&&i.prototype.isPureReactComponent?!Mo(a,c)||!Mo(p,v):!0}function Th(n,i,a){var c=!1,p=or,v=i.contextType;return typeof v=="object"&&v!==null?v=Zn(v):(p=Rn(i)?Ur:fn.current,c=i.contextTypes,v=(c=c!=null)?_s(n,p):or),i=new i(a,v),n.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Ka,n.stateNode=i,i._reactInternals=n,c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=p,n.__reactInternalMemoizedMaskedChildContext=v),i}function wh(n,i,a,c){n=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(a,c),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(a,c),i.state!==n&&Ka.enqueueReplaceState(i,i.state,null)}function ru(n,i,a,c){var p=n.stateNode;p.props=a,p.state=n.memoizedState,p.refs={},Wc(n);var v=i.contextType;typeof v=="object"&&v!==null?p.context=Zn(v):(v=Rn(i)?Ur:fn.current,p.context=_s(n,v)),p.state=n.memoizedState,v=i.getDerivedStateFromProps,typeof v=="function"&&(iu(n,i,v,a),p.state=n.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof p.getSnapshotBeforeUpdate=="function"||typeof p.UNSAFE_componentWillMount!="function"&&typeof p.componentWillMount!="function"||(i=p.state,typeof p.componentWillMount=="function"&&p.componentWillMount(),typeof p.UNSAFE_componentWillMount=="function"&&p.UNSAFE_componentWillMount(),i!==p.state&&Ka.enqueueReplaceState(p,p.state,null),Va(n,a,p,c),p.state=n.memoizedState),typeof p.componentDidMount=="function"&&(n.flags|=4194308)}function As(n,i){try{var a="",c=i;do a+=fe(c),c=c.return;while(c);var p=a}catch(v){p=`
Error generating stack: `+v.message+`
`+v.stack}return{value:n,source:i,stack:p,digest:null}}function su(n,i,a){return{value:n,source:null,stack:a??null,digest:i??null}}function ou(n,i){try{console.error(i.value)}catch(a){setTimeout(function(){throw a})}}var vv=typeof WeakMap=="function"?WeakMap:Map;function Ah(n,i,a){a=Oi(-1,a),a.tag=3,a.payload={element:null};var c=i.value;return a.callback=function(){il||(il=!0,Su=c),ou(n,i)},a}function Ch(n,i,a){a=Oi(-1,a),a.tag=3;var c=n.type.getDerivedStateFromError;if(typeof c=="function"){var p=i.value;a.payload=function(){return c(p)},a.callback=function(){ou(n,i)}}var v=n.stateNode;return v!==null&&typeof v.componentDidCatch=="function"&&(a.callback=function(){ou(n,i),typeof c!="function"&&(dr===null?dr=new Set([this]):dr.add(this));var E=i.stack;this.componentDidCatch(i.value,{componentStack:E!==null?E:""})}),a}function bh(n,i,a){var c=n.pingCache;if(c===null){c=n.pingCache=new vv;var p=new Set;c.set(i,p)}else p=c.get(i),p===void 0&&(p=new Set,c.set(i,p));p.has(a)||(p.add(a),n=Pv.bind(null,n,i,a),i.then(n,n))}function Rh(n){do{var i;if((i=n.tag===13)&&(i=n.memoizedState,i=i!==null?i.dehydrated!==null:!0),i)return n;n=n.return}while(n!==null);return null}function Lh(n,i,a,c,p){return(n.mode&1)===0?(n===i?n.flags|=65536:(n.flags|=128,a.flags|=131072,a.flags&=-52805,a.tag===1&&(a.alternate===null?a.tag=17:(i=Oi(-1,1),i.tag=2,cr(a,i,1))),a.lanes|=1),n):(n.flags|=65536,n.lanes=p,n)}var _v=P.ReactCurrentOwner,Ln=!1;function Sn(n,i,a,c){i.child=n===null?Kf(i,null,a,c):Ms(i,n.child,a,c)}function Ph(n,i,a,c,p){a=a.render;var v=i.ref;return Ts(i,p),c=Zc(n,i,a,c,v,p),a=Qc(),n!==null&&!Ln?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~p,Fi(n,i,p)):(Ut&&a&&Nc(i),i.flags|=1,Sn(n,i,c,p),i.child)}function Dh(n,i,a,c,p){if(n===null){var v=a.type;return typeof v=="function"&&!bu(v)&&v.defaultProps===void 0&&a.compare===null&&a.defaultProps===void 0?(i.tag=15,i.type=v,Ih(n,i,v,c,p)):(n=cl(a.type,null,c,i,i.mode,p),n.ref=i.ref,n.return=i,i.child=n)}if(v=n.child,(n.lanes&p)===0){var E=v.memoizedProps;if(a=a.compare,a=a!==null?a:Mo,a(E,c)&&n.ref===i.ref)return Fi(n,i,p)}return i.flags|=1,n=mr(v,c),n.ref=i.ref,n.return=i,i.child=n}function Ih(n,i,a,c,p){if(n!==null){var v=n.memoizedProps;if(Mo(v,c)&&n.ref===i.ref)if(Ln=!1,i.pendingProps=c=v,(n.lanes&p)!==0)(n.flags&131072)!==0&&(Ln=!0);else return i.lanes=n.lanes,Fi(n,i,p)}return au(n,i,a,c,p)}function Nh(n,i,a){var c=i.pendingProps,p=c.children,v=n!==null?n.memoizedState:null;if(c.mode==="hidden")if((i.mode&1)===0)i.memoizedState={baseLanes:0,cachePool:null,transitions:null},Lt(bs,Vn),Vn|=a;else{if((a&1073741824)===0)return n=v!==null?v.baseLanes|a:a,i.lanes=i.childLanes=1073741824,i.memoizedState={baseLanes:n,cachePool:null,transitions:null},i.updateQueue=null,Lt(bs,Vn),Vn|=n,null;i.memoizedState={baseLanes:0,cachePool:null,transitions:null},c=v!==null?v.baseLanes:a,Lt(bs,Vn),Vn|=c}else v!==null?(c=v.baseLanes|a,i.memoizedState=null):c=a,Lt(bs,Vn),Vn|=c;return Sn(n,i,p,a),i.child}function Uh(n,i){var a=i.ref;(n===null&&a!==null||n!==null&&n.ref!==a)&&(i.flags|=512,i.flags|=2097152)}function au(n,i,a,c,p){var v=Rn(a)?Ur:fn.current;return v=_s(i,v),Ts(i,p),a=Zc(n,i,a,c,v,p),c=Qc(),n!==null&&!Ln?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~p,Fi(n,i,p)):(Ut&&c&&Nc(i),i.flags|=1,Sn(n,i,a,p),i.child)}function Oh(n,i,a,c,p){if(Rn(a)){var v=!0;Na(i)}else v=!1;if(Ts(i,p),i.stateNode===null)Qa(n,i),Th(i,a,c),ru(i,a,c,p),c=!0;else if(n===null){var E=i.stateNode,F=i.memoizedProps;E.props=F;var W=E.context,re=a.contextType;typeof re=="object"&&re!==null?re=Zn(re):(re=Rn(a)?Ur:fn.current,re=_s(i,re));var Me=a.getDerivedStateFromProps,we=typeof Me=="function"||typeof E.getSnapshotBeforeUpdate=="function";we||typeof E.UNSAFE_componentWillReceiveProps!="function"&&typeof E.componentWillReceiveProps!="function"||(F!==c||W!==re)&&wh(i,E,c,re),lr=!1;var ye=i.memoizedState;E.state=ye,Va(i,c,E,p),W=i.memoizedState,F!==c||ye!==W||bn.current||lr?(typeof Me=="function"&&(iu(i,a,Me,c),W=i.memoizedState),(F=lr||Eh(i,a,F,c,ye,W,re))?(we||typeof E.UNSAFE_componentWillMount!="function"&&typeof E.componentWillMount!="function"||(typeof E.componentWillMount=="function"&&E.componentWillMount(),typeof E.UNSAFE_componentWillMount=="function"&&E.UNSAFE_componentWillMount()),typeof E.componentDidMount=="function"&&(i.flags|=4194308)):(typeof E.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=c,i.memoizedState=W),E.props=c,E.state=W,E.context=re,c=F):(typeof E.componentDidMount=="function"&&(i.flags|=4194308),c=!1)}else{E=i.stateNode,Qf(n,i),F=i.memoizedProps,re=i.type===i.elementType?F:ci(i.type,F),E.props=re,we=i.pendingProps,ye=E.context,W=a.contextType,typeof W=="object"&&W!==null?W=Zn(W):(W=Rn(a)?Ur:fn.current,W=_s(i,W));var ke=a.getDerivedStateFromProps;(Me=typeof ke=="function"||typeof E.getSnapshotBeforeUpdate=="function")||typeof E.UNSAFE_componentWillReceiveProps!="function"&&typeof E.componentWillReceiveProps!="function"||(F!==we||ye!==W)&&wh(i,E,c,W),lr=!1,ye=i.memoizedState,E.state=ye,Va(i,c,E,p);var Ge=i.memoizedState;F!==we||ye!==Ge||bn.current||lr?(typeof ke=="function"&&(iu(i,a,ke,c),Ge=i.memoizedState),(re=lr||Eh(i,a,re,c,ye,Ge,W)||!1)?(Me||typeof E.UNSAFE_componentWillUpdate!="function"&&typeof E.componentWillUpdate!="function"||(typeof E.componentWillUpdate=="function"&&E.componentWillUpdate(c,Ge,W),typeof E.UNSAFE_componentWillUpdate=="function"&&E.UNSAFE_componentWillUpdate(c,Ge,W)),typeof E.componentDidUpdate=="function"&&(i.flags|=4),typeof E.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof E.componentDidUpdate!="function"||F===n.memoizedProps&&ye===n.memoizedState||(i.flags|=4),typeof E.getSnapshotBeforeUpdate!="function"||F===n.memoizedProps&&ye===n.memoizedState||(i.flags|=1024),i.memoizedProps=c,i.memoizedState=Ge),E.props=c,E.state=Ge,E.context=W,c=re):(typeof E.componentDidUpdate!="function"||F===n.memoizedProps&&ye===n.memoizedState||(i.flags|=4),typeof E.getSnapshotBeforeUpdate!="function"||F===n.memoizedProps&&ye===n.memoizedState||(i.flags|=1024),c=!1)}return lu(n,i,a,c,v,p)}function lu(n,i,a,c,p,v){Uh(n,i);var E=(i.flags&128)!==0;if(!c&&!E)return p&&Hf(i,a,!1),Fi(n,i,v);c=i.stateNode,_v.current=i;var F=E&&typeof a.getDerivedStateFromError!="function"?null:c.render();return i.flags|=1,n!==null&&E?(i.child=Ms(i,n.child,null,v),i.child=Ms(i,null,F,v)):Sn(n,i,F,v),i.memoizedState=c.state,p&&Hf(i,a,!0),i.child}function Fh(n){var i=n.stateNode;i.pendingContext?Bf(n,i.pendingContext,i.pendingContext!==i.context):i.context&&Bf(n,i.context,!1),jc(n,i.containerInfo)}function kh(n,i,a,c,p){return Ss(),kc(p),i.flags|=256,Sn(n,i,a,c),i.child}var cu={dehydrated:null,treeContext:null,retryLane:0};function uu(n){return{baseLanes:n,cachePool:null,transitions:null}}function Bh(n,i,a){var c=i.pendingProps,p=Ft.current,v=!1,E=(i.flags&128)!==0,F;if((F=E)||(F=n!==null&&n.memoizedState===null?!1:(p&2)!==0),F?(v=!0,i.flags&=-129):(n===null||n.memoizedState!==null)&&(p|=1),Lt(Ft,p&1),n===null)return Fc(i),n=i.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?((i.mode&1)===0?i.lanes=1:n.data==="$!"?i.lanes=8:i.lanes=1073741824,null):(E=c.children,n=c.fallback,v?(c=i.mode,v=i.child,E={mode:"hidden",children:E},(c&1)===0&&v!==null?(v.childLanes=0,v.pendingProps=E):v=ul(E,c,0,null),n=jr(n,c,a,null),v.return=i,n.return=i,v.sibling=n,i.child=v,i.child.memoizedState=uu(a),i.memoizedState=cu,n):du(i,E));if(p=n.memoizedState,p!==null&&(F=p.dehydrated,F!==null))return xv(n,i,E,c,F,p,a);if(v){v=c.fallback,E=i.mode,p=n.child,F=p.sibling;var W={mode:"hidden",children:c.children};return(E&1)===0&&i.child!==p?(c=i.child,c.childLanes=0,c.pendingProps=W,i.deletions=null):(c=mr(p,W),c.subtreeFlags=p.subtreeFlags&14680064),F!==null?v=mr(F,v):(v=jr(v,E,a,null),v.flags|=2),v.return=i,c.return=i,c.sibling=v,i.child=c,c=v,v=i.child,E=n.child.memoizedState,E=E===null?uu(a):{baseLanes:E.baseLanes|a,cachePool:null,transitions:E.transitions},v.memoizedState=E,v.childLanes=n.childLanes&~a,i.memoizedState=cu,c}return v=n.child,n=v.sibling,c=mr(v,{mode:"visible",children:c.children}),(i.mode&1)===0&&(c.lanes=a),c.return=i,c.sibling=null,n!==null&&(a=i.deletions,a===null?(i.deletions=[n],i.flags|=16):a.push(n)),i.child=c,i.memoizedState=null,c}function du(n,i){return i=ul({mode:"visible",children:i},n.mode,0,null),i.return=n,n.child=i}function Za(n,i,a,c){return c!==null&&kc(c),Ms(i,n.child,null,a),n=du(i,i.pendingProps.children),n.flags|=2,i.memoizedState=null,n}function xv(n,i,a,c,p,v,E){if(a)return i.flags&256?(i.flags&=-257,c=su(Error(t(422))),Za(n,i,E,c)):i.memoizedState!==null?(i.child=n.child,i.flags|=128,null):(v=c.fallback,p=i.mode,c=ul({mode:"visible",children:c.children},p,0,null),v=jr(v,p,E,null),v.flags|=2,c.return=i,v.return=i,c.sibling=v,i.child=c,(i.mode&1)!==0&&Ms(i,n.child,null,E),i.child.memoizedState=uu(E),i.memoizedState=cu,v);if((i.mode&1)===0)return Za(n,i,E,null);if(p.data==="$!"){if(c=p.nextSibling&&p.nextSibling.dataset,c)var F=c.dgst;return c=F,v=Error(t(419)),c=su(v,c,void 0),Za(n,i,E,c)}if(F=(E&n.childLanes)!==0,Ln||F){if(c=tn,c!==null){switch(E&-E){case 4:p=2;break;case 16:p=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:p=32;break;case 536870912:p=268435456;break;default:p=0}p=(p&(c.suspendedLanes|E))!==0?0:p,p!==0&&p!==v.retryLane&&(v.retryLane=p,Ui(n,p),fi(c,n,p,-1))}return Cu(),c=su(Error(t(421))),Za(n,i,E,c)}return p.data==="$?"?(i.flags|=128,i.child=n.child,i=Dv.bind(null,n),p._reactRetry=i,null):(n=v.treeContext,Gn=rr(p.nextSibling),Hn=i,Ut=!0,li=null,n!==null&&($n[Kn++]=Ii,$n[Kn++]=Ni,$n[Kn++]=Or,Ii=n.id,Ni=n.overflow,Or=i),i=du(i,c.children),i.flags|=4096,i)}function zh(n,i,a){n.lanes|=i;var c=n.alternate;c!==null&&(c.lanes|=i),Gc(n.return,i,a)}function fu(n,i,a,c,p){var v=n.memoizedState;v===null?n.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:c,tail:a,tailMode:p}:(v.isBackwards=i,v.rendering=null,v.renderingStartTime=0,v.last=c,v.tail=a,v.tailMode=p)}function Hh(n,i,a){var c=i.pendingProps,p=c.revealOrder,v=c.tail;if(Sn(n,i,c.children,a),c=Ft.current,(c&2)!==0)c=c&1|2,i.flags|=128;else{if(n!==null&&(n.flags&128)!==0)e:for(n=i.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&zh(n,a,i);else if(n.tag===19)zh(n,a,i);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===i)break e;for(;n.sibling===null;){if(n.return===null||n.return===i)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}c&=1}if(Lt(Ft,c),(i.mode&1)===0)i.memoizedState=null;else switch(p){case"forwards":for(a=i.child,p=null;a!==null;)n=a.alternate,n!==null&&Wa(n)===null&&(p=a),a=a.sibling;a=p,a===null?(p=i.child,i.child=null):(p=a.sibling,a.sibling=null),fu(i,!1,p,a,v);break;case"backwards":for(a=null,p=i.child,i.child=null;p!==null;){if(n=p.alternate,n!==null&&Wa(n)===null){i.child=p;break}n=p.sibling,p.sibling=a,a=p,p=n}fu(i,!0,a,null,v);break;case"together":fu(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function Qa(n,i){(i.mode&1)===0&&n!==null&&(n.alternate=null,i.alternate=null,i.flags|=2)}function Fi(n,i,a){if(n!==null&&(i.dependencies=n.dependencies),Hr|=i.lanes,(a&i.childLanes)===0)return null;if(n!==null&&i.child!==n.child)throw Error(t(153));if(i.child!==null){for(n=i.child,a=mr(n,n.pendingProps),i.child=a,a.return=i;n.sibling!==null;)n=n.sibling,a=a.sibling=mr(n,n.pendingProps),a.return=i;a.sibling=null}return i.child}function yv(n,i,a){switch(i.tag){case 3:Fh(i),Ss();break;case 5:th(i);break;case 1:Rn(i.type)&&Na(i);break;case 4:jc(i,i.stateNode.containerInfo);break;case 10:var c=i.type._context,p=i.memoizedProps.value;Lt(za,c._currentValue),c._currentValue=p;break;case 13:if(c=i.memoizedState,c!==null)return c.dehydrated!==null?(Lt(Ft,Ft.current&1),i.flags|=128,null):(a&i.child.childLanes)!==0?Bh(n,i,a):(Lt(Ft,Ft.current&1),n=Fi(n,i,a),n!==null?n.sibling:null);Lt(Ft,Ft.current&1);break;case 19:if(c=(a&i.childLanes)!==0,(n.flags&128)!==0){if(c)return Hh(n,i,a);i.flags|=128}if(p=i.memoizedState,p!==null&&(p.rendering=null,p.tail=null,p.lastEffect=null),Lt(Ft,Ft.current),c)break;return null;case 22:case 23:return i.lanes=0,Nh(n,i,a)}return Fi(n,i,a)}var Gh,hu,Vh,Wh;Gh=function(n,i){for(var a=i.child;a!==null;){if(a.tag===5||a.tag===6)n.appendChild(a.stateNode);else if(a.tag!==4&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===i)break;for(;a.sibling===null;){if(a.return===null||a.return===i)return;a=a.return}a.sibling.return=a.return,a=a.sibling}},hu=function(){},Vh=function(n,i,a,c){var p=n.memoizedProps;if(p!==c){n=i.stateNode,Br(Si.current);var v=null;switch(a){case"input":p=Pe(n,p),c=Pe(n,c),v=[];break;case"select":p=H({},p,{value:void 0}),c=H({},c,{value:void 0}),v=[];break;case"textarea":p=_e(n,p),c=_e(n,c),v=[];break;default:typeof p.onClick!="function"&&typeof c.onClick=="function"&&(n.onclick=Pa)}st(a,c);var E;a=null;for(re in p)if(!c.hasOwnProperty(re)&&p.hasOwnProperty(re)&&p[re]!=null)if(re==="style"){var F=p[re];for(E in F)F.hasOwnProperty(E)&&(a||(a={}),a[E]="")}else re!=="dangerouslySetInnerHTML"&&re!=="children"&&re!=="suppressContentEditableWarning"&&re!=="suppressHydrationWarning"&&re!=="autoFocus"&&(o.hasOwnProperty(re)?v||(v=[]):(v=v||[]).push(re,null));for(re in c){var W=c[re];if(F=p?.[re],c.hasOwnProperty(re)&&W!==F&&(W!=null||F!=null))if(re==="style")if(F){for(E in F)!F.hasOwnProperty(E)||W&&W.hasOwnProperty(E)||(a||(a={}),a[E]="");for(E in W)W.hasOwnProperty(E)&&F[E]!==W[E]&&(a||(a={}),a[E]=W[E])}else a||(v||(v=[]),v.push(re,a)),a=W;else re==="dangerouslySetInnerHTML"?(W=W?W.__html:void 0,F=F?F.__html:void 0,W!=null&&F!==W&&(v=v||[]).push(re,W)):re==="children"?typeof W!="string"&&typeof W!="number"||(v=v||[]).push(re,""+W):re!=="suppressContentEditableWarning"&&re!=="suppressHydrationWarning"&&(o.hasOwnProperty(re)?(W!=null&&re==="onScroll"&&Pt("scroll",n),v||F===W||(v=[])):(v=v||[]).push(re,W))}a&&(v=v||[]).push("style",a);var re=v;(i.updateQueue=re)&&(i.flags|=4)}},Wh=function(n,i,a,c){a!==c&&(i.flags|=4)};function Fo(n,i){if(!Ut)switch(n.tailMode){case"hidden":i=n.tail;for(var a=null;i!==null;)i.alternate!==null&&(a=i),i=i.sibling;a===null?n.tail=null:a.sibling=null;break;case"collapsed":a=n.tail;for(var c=null;a!==null;)a.alternate!==null&&(c=a),a=a.sibling;c===null?i||n.tail===null?n.tail=null:n.tail.sibling=null:c.sibling=null}}function pn(n){var i=n.alternate!==null&&n.alternate.child===n.child,a=0,c=0;if(i)for(var p=n.child;p!==null;)a|=p.lanes|p.childLanes,c|=p.subtreeFlags&14680064,c|=p.flags&14680064,p.return=n,p=p.sibling;else for(p=n.child;p!==null;)a|=p.lanes|p.childLanes,c|=p.subtreeFlags,c|=p.flags,p.return=n,p=p.sibling;return n.subtreeFlags|=c,n.childLanes=a,i}function Sv(n,i,a){var c=i.pendingProps;switch(Uc(i),i.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return pn(i),null;case 1:return Rn(i.type)&&Ia(),pn(i),null;case 3:return c=i.stateNode,ws(),Dt(bn),Dt(fn),qc(),c.pendingContext&&(c.context=c.pendingContext,c.pendingContext=null),(n===null||n.child===null)&&(ka(i)?i.flags|=4:n===null||n.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,li!==null&&(Tu(li),li=null))),hu(n,i),pn(i),null;case 5:Xc(i);var p=Br(Do.current);if(a=i.type,n!==null&&i.stateNode!=null)Vh(n,i,a,c,p),n.ref!==i.ref&&(i.flags|=512,i.flags|=2097152);else{if(!c){if(i.stateNode===null)throw Error(t(166));return pn(i),null}if(n=Br(Si.current),ka(i)){c=i.stateNode,a=i.type;var v=i.memoizedProps;switch(c[yi]=i,c[Co]=v,n=(i.mode&1)!==0,a){case"dialog":Pt("cancel",c),Pt("close",c);break;case"iframe":case"object":case"embed":Pt("load",c);break;case"video":case"audio":for(p=0;p<To.length;p++)Pt(To[p],c);break;case"source":Pt("error",c);break;case"img":case"image":case"link":Pt("error",c),Pt("load",c);break;case"details":Pt("toggle",c);break;case"input":Ve(c,v),Pt("invalid",c);break;case"select":c._wrapperState={wasMultiple:!!v.multiple},Pt("invalid",c);break;case"textarea":ge(c,v),Pt("invalid",c)}st(a,v),p=null;for(var E in v)if(v.hasOwnProperty(E)){var F=v[E];E==="children"?typeof F=="string"?c.textContent!==F&&(v.suppressHydrationWarning!==!0&&La(c.textContent,F,n),p=["children",F]):typeof F=="number"&&c.textContent!==""+F&&(v.suppressHydrationWarning!==!0&&La(c.textContent,F,n),p=["children",""+F]):o.hasOwnProperty(E)&&F!=null&&E==="onScroll"&&Pt("scroll",c)}switch(a){case"input":ve(c),Xe(c,v,!0);break;case"textarea":ve(c),Le(c);break;case"select":case"option":break;default:typeof v.onClick=="function"&&(c.onclick=Pa)}c=p,i.updateQueue=c,c!==null&&(i.flags|=4)}else{E=p.nodeType===9?p:p.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=Ae(a)),n==="http://www.w3.org/1999/xhtml"?a==="script"?(n=E.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof c.is=="string"?n=E.createElement(a,{is:c.is}):(n=E.createElement(a),a==="select"&&(E=n,c.multiple?E.multiple=!0:c.size&&(E.size=c.size))):n=E.createElementNS(n,a),n[yi]=i,n[Co]=c,Gh(n,i,!1,!1),i.stateNode=n;e:{switch(E=pt(a,c),a){case"dialog":Pt("cancel",n),Pt("close",n),p=c;break;case"iframe":case"object":case"embed":Pt("load",n),p=c;break;case"video":case"audio":for(p=0;p<To.length;p++)Pt(To[p],n);p=c;break;case"source":Pt("error",n),p=c;break;case"img":case"image":case"link":Pt("error",n),Pt("load",n),p=c;break;case"details":Pt("toggle",n),p=c;break;case"input":Ve(n,c),p=Pe(n,c),Pt("invalid",n);break;case"option":p=c;break;case"select":n._wrapperState={wasMultiple:!!c.multiple},p=H({},c,{value:void 0}),Pt("invalid",n);break;case"textarea":ge(n,c),p=_e(n,c),Pt("invalid",n);break;default:p=c}st(a,p),F=p;for(v in F)if(F.hasOwnProperty(v)){var W=F[v];v==="style"?qe(n,W):v==="dangerouslySetInnerHTML"?(W=W?W.__html:void 0,W!=null&&at(n,W)):v==="children"?typeof W=="string"?(a!=="textarea"||W!=="")&&Se(n,W):typeof W=="number"&&Se(n,""+W):v!=="suppressContentEditableWarning"&&v!=="suppressHydrationWarning"&&v!=="autoFocus"&&(o.hasOwnProperty(v)?W!=null&&v==="onScroll"&&Pt("scroll",n):W!=null&&b(n,v,W,E))}switch(a){case"input":ve(n),Xe(n,c,!1);break;case"textarea":ve(n),Le(n);break;case"option":c.value!=null&&n.setAttribute("value",""+Te(c.value));break;case"select":n.multiple=!!c.multiple,v=c.value,v!=null?te(n,!!c.multiple,v,!1):c.defaultValue!=null&&te(n,!!c.multiple,c.defaultValue,!0);break;default:typeof p.onClick=="function"&&(n.onclick=Pa)}switch(a){case"button":case"input":case"select":case"textarea":c=!!c.autoFocus;break e;case"img":c=!0;break e;default:c=!1}}c&&(i.flags|=4)}i.ref!==null&&(i.flags|=512,i.flags|=2097152)}return pn(i),null;case 6:if(n&&i.stateNode!=null)Wh(n,i,n.memoizedProps,c);else{if(typeof c!="string"&&i.stateNode===null)throw Error(t(166));if(a=Br(Do.current),Br(Si.current),ka(i)){if(c=i.stateNode,a=i.memoizedProps,c[yi]=i,(v=c.nodeValue!==a)&&(n=Hn,n!==null))switch(n.tag){case 3:La(c.nodeValue,a,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&La(c.nodeValue,a,(n.mode&1)!==0)}v&&(i.flags|=4)}else c=(a.nodeType===9?a:a.ownerDocument).createTextNode(c),c[yi]=i,i.stateNode=c}return pn(i),null;case 13:if(Dt(Ft),c=i.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(Ut&&Gn!==null&&(i.mode&1)!==0&&(i.flags&128)===0)Yf(),Ss(),i.flags|=98560,v=!1;else if(v=ka(i),c!==null&&c.dehydrated!==null){if(n===null){if(!v)throw Error(t(318));if(v=i.memoizedState,v=v!==null?v.dehydrated:null,!v)throw Error(t(317));v[yi]=i}else Ss(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;pn(i),v=!1}else li!==null&&(Tu(li),li=null),v=!0;if(!v)return i.flags&65536?i:null}return(i.flags&128)!==0?(i.lanes=a,i):(c=c!==null,c!==(n!==null&&n.memoizedState!==null)&&c&&(i.child.flags|=8192,(i.mode&1)!==0&&(n===null||(Ft.current&1)!==0?$t===0&&($t=3):Cu())),i.updateQueue!==null&&(i.flags|=4),pn(i),null);case 4:return ws(),hu(n,i),n===null&&wo(i.stateNode.containerInfo),pn(i),null;case 10:return Hc(i.type._context),pn(i),null;case 17:return Rn(i.type)&&Ia(),pn(i),null;case 19:if(Dt(Ft),v=i.memoizedState,v===null)return pn(i),null;if(c=(i.flags&128)!==0,E=v.rendering,E===null)if(c)Fo(v,!1);else{if($t!==0||n!==null&&(n.flags&128)!==0)for(n=i.child;n!==null;){if(E=Wa(n),E!==null){for(i.flags|=128,Fo(v,!1),c=E.updateQueue,c!==null&&(i.updateQueue=c,i.flags|=4),i.subtreeFlags=0,c=a,a=i.child;a!==null;)v=a,n=c,v.flags&=14680066,E=v.alternate,E===null?(v.childLanes=0,v.lanes=n,v.child=null,v.subtreeFlags=0,v.memoizedProps=null,v.memoizedState=null,v.updateQueue=null,v.dependencies=null,v.stateNode=null):(v.childLanes=E.childLanes,v.lanes=E.lanes,v.child=E.child,v.subtreeFlags=0,v.deletions=null,v.memoizedProps=E.memoizedProps,v.memoizedState=E.memoizedState,v.updateQueue=E.updateQueue,v.type=E.type,n=E.dependencies,v.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),a=a.sibling;return Lt(Ft,Ft.current&1|2),i.child}n=n.sibling}v.tail!==null&&Be()>Rs&&(i.flags|=128,c=!0,Fo(v,!1),i.lanes=4194304)}else{if(!c)if(n=Wa(E),n!==null){if(i.flags|=128,c=!0,a=n.updateQueue,a!==null&&(i.updateQueue=a,i.flags|=4),Fo(v,!0),v.tail===null&&v.tailMode==="hidden"&&!E.alternate&&!Ut)return pn(i),null}else 2*Be()-v.renderingStartTime>Rs&&a!==1073741824&&(i.flags|=128,c=!0,Fo(v,!1),i.lanes=4194304);v.isBackwards?(E.sibling=i.child,i.child=E):(a=v.last,a!==null?a.sibling=E:i.child=E,v.last=E)}return v.tail!==null?(i=v.tail,v.rendering=i,v.tail=i.sibling,v.renderingStartTime=Be(),i.sibling=null,a=Ft.current,Lt(Ft,c?a&1|2:a&1),i):(pn(i),null);case 22:case 23:return Au(),c=i.memoizedState!==null,n!==null&&n.memoizedState!==null!==c&&(i.flags|=8192),c&&(i.mode&1)!==0?(Vn&1073741824)!==0&&(pn(i),i.subtreeFlags&6&&(i.flags|=8192)):pn(i),null;case 24:return null;case 25:return null}throw Error(t(156,i.tag))}function Mv(n,i){switch(Uc(i),i.tag){case 1:return Rn(i.type)&&Ia(),n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 3:return ws(),Dt(bn),Dt(fn),qc(),n=i.flags,(n&65536)!==0&&(n&128)===0?(i.flags=n&-65537|128,i):null;case 5:return Xc(i),null;case 13:if(Dt(Ft),n=i.memoizedState,n!==null&&n.dehydrated!==null){if(i.alternate===null)throw Error(t(340));Ss()}return n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 19:return Dt(Ft),null;case 4:return ws(),null;case 10:return Hc(i.type._context),null;case 22:case 23:return Au(),null;case 24:return null;default:return null}}var Ja=!1,mn=!1,Ev=typeof WeakSet=="function"?WeakSet:Set,ze=null;function Cs(n,i){var a=n.ref;if(a!==null)if(typeof a=="function")try{a(null)}catch(c){Ht(n,i,c)}else a.current=null}function pu(n,i,a){try{a()}catch(c){Ht(n,i,c)}}var jh=!1;function Tv(n,i){if(Ac=xa,n=Ef(),_c(n)){if("selectionStart"in n)var a={start:n.selectionStart,end:n.selectionEnd};else e:{a=(a=n.ownerDocument)&&a.defaultView||window;var c=a.getSelection&&a.getSelection();if(c&&c.rangeCount!==0){a=c.anchorNode;var p=c.anchorOffset,v=c.focusNode;c=c.focusOffset;try{a.nodeType,v.nodeType}catch{a=null;break e}var E=0,F=-1,W=-1,re=0,Me=0,we=n,ye=null;t:for(;;){for(var ke;we!==a||p!==0&&we.nodeType!==3||(F=E+p),we!==v||c!==0&&we.nodeType!==3||(W=E+c),we.nodeType===3&&(E+=we.nodeValue.length),(ke=we.firstChild)!==null;)ye=we,we=ke;for(;;){if(we===n)break t;if(ye===a&&++re===p&&(F=E),ye===v&&++Me===c&&(W=E),(ke=we.nextSibling)!==null)break;we=ye,ye=we.parentNode}we=ke}a=F===-1||W===-1?null:{start:F,end:W}}else a=null}a=a||{start:0,end:0}}else a=null;for(Cc={focusedElem:n,selectionRange:a},xa=!1,ze=i;ze!==null;)if(i=ze,n=i.child,(i.subtreeFlags&1028)!==0&&n!==null)n.return=i,ze=n;else for(;ze!==null;){i=ze;try{var Ge=i.alternate;if((i.flags&1024)!==0)switch(i.tag){case 0:case 11:case 15:break;case 1:if(Ge!==null){var We=Ge.memoizedProps,Vt=Ge.memoizedState,J=i.stateNode,q=J.getSnapshotBeforeUpdate(i.elementType===i.type?We:ci(i.type,We),Vt);J.__reactInternalSnapshotBeforeUpdate=q}break;case 3:var ne=i.stateNode.containerInfo;ne.nodeType===1?ne.textContent="":ne.nodeType===9&&ne.documentElement&&ne.removeChild(ne.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(t(163))}}catch(Ce){Ht(i,i.return,Ce)}if(n=i.sibling,n!==null){n.return=i.return,ze=n;break}ze=i.return}return Ge=jh,jh=!1,Ge}function ko(n,i,a){var c=i.updateQueue;if(c=c!==null?c.lastEffect:null,c!==null){var p=c=c.next;do{if((p.tag&n)===n){var v=p.destroy;p.destroy=void 0,v!==void 0&&pu(i,a,v)}p=p.next}while(p!==c)}}function el(n,i){if(i=i.updateQueue,i=i!==null?i.lastEffect:null,i!==null){var a=i=i.next;do{if((a.tag&n)===n){var c=a.create;a.destroy=c()}a=a.next}while(a!==i)}}function mu(n){var i=n.ref;if(i!==null){var a=n.stateNode;n.tag,n=a,typeof i=="function"?i(n):i.current=n}}function Xh(n){var i=n.alternate;i!==null&&(n.alternate=null,Xh(i)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(i=n.stateNode,i!==null&&(delete i[yi],delete i[Co],delete i[Pc],delete i[ov],delete i[av])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function Yh(n){return n.tag===5||n.tag===3||n.tag===4}function qh(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||Yh(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function gu(n,i,a){var c=n.tag;if(c===5||c===6)n=n.stateNode,i?a.nodeType===8?a.parentNode.insertBefore(n,i):a.insertBefore(n,i):(a.nodeType===8?(i=a.parentNode,i.insertBefore(n,a)):(i=a,i.appendChild(n)),a=a._reactRootContainer,a!=null||i.onclick!==null||(i.onclick=Pa));else if(c!==4&&(n=n.child,n!==null))for(gu(n,i,a),n=n.sibling;n!==null;)gu(n,i,a),n=n.sibling}function vu(n,i,a){var c=n.tag;if(c===5||c===6)n=n.stateNode,i?a.insertBefore(n,i):a.appendChild(n);else if(c!==4&&(n=n.child,n!==null))for(vu(n,i,a),n=n.sibling;n!==null;)vu(n,i,a),n=n.sibling}var on=null,ui=!1;function ur(n,i,a){for(a=a.child;a!==null;)$h(n,i,a),a=a.sibling}function $h(n,i,a){if(_t&&typeof _t.onCommitFiberUnmount=="function")try{_t.onCommitFiberUnmount(An,a)}catch{}switch(a.tag){case 5:mn||Cs(a,i);case 6:var c=on,p=ui;on=null,ur(n,i,a),on=c,ui=p,on!==null&&(ui?(n=on,a=a.stateNode,n.nodeType===8?n.parentNode.removeChild(a):n.removeChild(a)):on.removeChild(a.stateNode));break;case 18:on!==null&&(ui?(n=on,a=a.stateNode,n.nodeType===8?Lc(n.parentNode,a):n.nodeType===1&&Lc(n,a),go(n)):Lc(on,a.stateNode));break;case 4:c=on,p=ui,on=a.stateNode.containerInfo,ui=!0,ur(n,i,a),on=c,ui=p;break;case 0:case 11:case 14:case 15:if(!mn&&(c=a.updateQueue,c!==null&&(c=c.lastEffect,c!==null))){p=c=c.next;do{var v=p,E=v.destroy;v=v.tag,E!==void 0&&((v&2)!==0||(v&4)!==0)&&pu(a,i,E),p=p.next}while(p!==c)}ur(n,i,a);break;case 1:if(!mn&&(Cs(a,i),c=a.stateNode,typeof c.componentWillUnmount=="function"))try{c.props=a.memoizedProps,c.state=a.memoizedState,c.componentWillUnmount()}catch(F){Ht(a,i,F)}ur(n,i,a);break;case 21:ur(n,i,a);break;case 22:a.mode&1?(mn=(c=mn)||a.memoizedState!==null,ur(n,i,a),mn=c):ur(n,i,a);break;default:ur(n,i,a)}}function Kh(n){var i=n.updateQueue;if(i!==null){n.updateQueue=null;var a=n.stateNode;a===null&&(a=n.stateNode=new Ev),i.forEach(function(c){var p=Iv.bind(null,n,c);a.has(c)||(a.add(c),c.then(p,p))})}}function di(n,i){var a=i.deletions;if(a!==null)for(var c=0;c<a.length;c++){var p=a[c];try{var v=n,E=i,F=E;e:for(;F!==null;){switch(F.tag){case 5:on=F.stateNode,ui=!1;break e;case 3:on=F.stateNode.containerInfo,ui=!0;break e;case 4:on=F.stateNode.containerInfo,ui=!0;break e}F=F.return}if(on===null)throw Error(t(160));$h(v,E,p),on=null,ui=!1;var W=p.alternate;W!==null&&(W.return=null),p.return=null}catch(re){Ht(p,i,re)}}if(i.subtreeFlags&12854)for(i=i.child;i!==null;)Zh(i,n),i=i.sibling}function Zh(n,i){var a=n.alternate,c=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(di(i,n),Ei(n),c&4){try{ko(3,n,n.return),el(3,n)}catch(We){Ht(n,n.return,We)}try{ko(5,n,n.return)}catch(We){Ht(n,n.return,We)}}break;case 1:di(i,n),Ei(n),c&512&&a!==null&&Cs(a,a.return);break;case 5:if(di(i,n),Ei(n),c&512&&a!==null&&Cs(a,a.return),n.flags&32){var p=n.stateNode;try{Se(p,"")}catch(We){Ht(n,n.return,We)}}if(c&4&&(p=n.stateNode,p!=null)){var v=n.memoizedProps,E=a!==null?a.memoizedProps:v,F=n.type,W=n.updateQueue;if(n.updateQueue=null,W!==null)try{F==="input"&&v.type==="radio"&&v.name!=null&&Ue(p,v),pt(F,E);var re=pt(F,v);for(E=0;E<W.length;E+=2){var Me=W[E],we=W[E+1];Me==="style"?qe(p,we):Me==="dangerouslySetInnerHTML"?at(p,we):Me==="children"?Se(p,we):b(p,Me,we,re)}switch(F){case"input":$e(p,v);break;case"textarea":me(p,v);break;case"select":var ye=p._wrapperState.wasMultiple;p._wrapperState.wasMultiple=!!v.multiple;var ke=v.value;ke!=null?te(p,!!v.multiple,ke,!1):ye!==!!v.multiple&&(v.defaultValue!=null?te(p,!!v.multiple,v.defaultValue,!0):te(p,!!v.multiple,v.multiple?[]:"",!1))}p[Co]=v}catch(We){Ht(n,n.return,We)}}break;case 6:if(di(i,n),Ei(n),c&4){if(n.stateNode===null)throw Error(t(162));p=n.stateNode,v=n.memoizedProps;try{p.nodeValue=v}catch(We){Ht(n,n.return,We)}}break;case 3:if(di(i,n),Ei(n),c&4&&a!==null&&a.memoizedState.isDehydrated)try{go(i.containerInfo)}catch(We){Ht(n,n.return,We)}break;case 4:di(i,n),Ei(n);break;case 13:di(i,n),Ei(n),p=n.child,p.flags&8192&&(v=p.memoizedState!==null,p.stateNode.isHidden=v,!v||p.alternate!==null&&p.alternate.memoizedState!==null||(yu=Be())),c&4&&Kh(n);break;case 22:if(Me=a!==null&&a.memoizedState!==null,n.mode&1?(mn=(re=mn)||Me,di(i,n),mn=re):di(i,n),Ei(n),c&8192){if(re=n.memoizedState!==null,(n.stateNode.isHidden=re)&&!Me&&(n.mode&1)!==0)for(ze=n,Me=n.child;Me!==null;){for(we=ze=Me;ze!==null;){switch(ye=ze,ke=ye.child,ye.tag){case 0:case 11:case 14:case 15:ko(4,ye,ye.return);break;case 1:Cs(ye,ye.return);var Ge=ye.stateNode;if(typeof Ge.componentWillUnmount=="function"){c=ye,a=ye.return;try{i=c,Ge.props=i.memoizedProps,Ge.state=i.memoizedState,Ge.componentWillUnmount()}catch(We){Ht(c,a,We)}}break;case 5:Cs(ye,ye.return);break;case 22:if(ye.memoizedState!==null){ep(we);continue}}ke!==null?(ke.return=ye,ze=ke):ep(we)}Me=Me.sibling}e:for(Me=null,we=n;;){if(we.tag===5){if(Me===null){Me=we;try{p=we.stateNode,re?(v=p.style,typeof v.setProperty=="function"?v.setProperty("display","none","important"):v.display="none"):(F=we.stateNode,W=we.memoizedProps.style,E=W!=null&&W.hasOwnProperty("display")?W.display:null,F.style.display=it("display",E))}catch(We){Ht(n,n.return,We)}}}else if(we.tag===6){if(Me===null)try{we.stateNode.nodeValue=re?"":we.memoizedProps}catch(We){Ht(n,n.return,We)}}else if((we.tag!==22&&we.tag!==23||we.memoizedState===null||we===n)&&we.child!==null){we.child.return=we,we=we.child;continue}if(we===n)break e;for(;we.sibling===null;){if(we.return===null||we.return===n)break e;Me===we&&(Me=null),we=we.return}Me===we&&(Me=null),we.sibling.return=we.return,we=we.sibling}}break;case 19:di(i,n),Ei(n),c&4&&Kh(n);break;case 21:break;default:di(i,n),Ei(n)}}function Ei(n){var i=n.flags;if(i&2){try{e:{for(var a=n.return;a!==null;){if(Yh(a)){var c=a;break e}a=a.return}throw Error(t(160))}switch(c.tag){case 5:var p=c.stateNode;c.flags&32&&(Se(p,""),c.flags&=-33);var v=qh(n);vu(n,v,p);break;case 3:case 4:var E=c.stateNode.containerInfo,F=qh(n);gu(n,F,E);break;default:throw Error(t(161))}}catch(W){Ht(n,n.return,W)}n.flags&=-3}i&4096&&(n.flags&=-4097)}function wv(n,i,a){ze=n,Qh(n)}function Qh(n,i,a){for(var c=(n.mode&1)!==0;ze!==null;){var p=ze,v=p.child;if(p.tag===22&&c){var E=p.memoizedState!==null||Ja;if(!E){var F=p.alternate,W=F!==null&&F.memoizedState!==null||mn;F=Ja;var re=mn;if(Ja=E,(mn=W)&&!re)for(ze=p;ze!==null;)E=ze,W=E.child,E.tag===22&&E.memoizedState!==null?tp(p):W!==null?(W.return=E,ze=W):tp(p);for(;v!==null;)ze=v,Qh(v),v=v.sibling;ze=p,Ja=F,mn=re}Jh(n)}else(p.subtreeFlags&8772)!==0&&v!==null?(v.return=p,ze=v):Jh(n)}}function Jh(n){for(;ze!==null;){var i=ze;if((i.flags&8772)!==0){var a=i.alternate;try{if((i.flags&8772)!==0)switch(i.tag){case 0:case 11:case 15:mn||el(5,i);break;case 1:var c=i.stateNode;if(i.flags&4&&!mn)if(a===null)c.componentDidMount();else{var p=i.elementType===i.type?a.memoizedProps:ci(i.type,a.memoizedProps);c.componentDidUpdate(p,a.memoizedState,c.__reactInternalSnapshotBeforeUpdate)}var v=i.updateQueue;v!==null&&eh(i,v,c);break;case 3:var E=i.updateQueue;if(E!==null){if(a=null,i.child!==null)switch(i.child.tag){case 5:a=i.child.stateNode;break;case 1:a=i.child.stateNode}eh(i,E,a)}break;case 5:var F=i.stateNode;if(a===null&&i.flags&4){a=F;var W=i.memoizedProps;switch(i.type){case"button":case"input":case"select":case"textarea":W.autoFocus&&a.focus();break;case"img":W.src&&(a.src=W.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(i.memoizedState===null){var re=i.alternate;if(re!==null){var Me=re.memoizedState;if(Me!==null){var we=Me.dehydrated;we!==null&&go(we)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(t(163))}mn||i.flags&512&&mu(i)}catch(ye){Ht(i,i.return,ye)}}if(i===n){ze=null;break}if(a=i.sibling,a!==null){a.return=i.return,ze=a;break}ze=i.return}}function ep(n){for(;ze!==null;){var i=ze;if(i===n){ze=null;break}var a=i.sibling;if(a!==null){a.return=i.return,ze=a;break}ze=i.return}}function tp(n){for(;ze!==null;){var i=ze;try{switch(i.tag){case 0:case 11:case 15:var a=i.return;try{el(4,i)}catch(W){Ht(i,a,W)}break;case 1:var c=i.stateNode;if(typeof c.componentDidMount=="function"){var p=i.return;try{c.componentDidMount()}catch(W){Ht(i,p,W)}}var v=i.return;try{mu(i)}catch(W){Ht(i,v,W)}break;case 5:var E=i.return;try{mu(i)}catch(W){Ht(i,E,W)}}}catch(W){Ht(i,i.return,W)}if(i===n){ze=null;break}var F=i.sibling;if(F!==null){F.return=i.return,ze=F;break}ze=i.return}}var Av=Math.ceil,tl=P.ReactCurrentDispatcher,_u=P.ReactCurrentOwner,Jn=P.ReactCurrentBatchConfig,xt=0,tn=null,Wt=null,an=0,Vn=0,bs=sr(0),$t=0,Bo=null,Hr=0,nl=0,xu=0,zo=null,Pn=null,yu=0,Rs=1/0,ki=null,il=!1,Su=null,dr=null,rl=!1,fr=null,sl=0,Ho=0,Mu=null,ol=-1,al=0;function Mn(){return(xt&6)!==0?Be():ol!==-1?ol:ol=Be()}function hr(n){return(n.mode&1)===0?1:(xt&2)!==0&&an!==0?an&-an:cv.transition!==null?(al===0&&(al=ga()),al):(n=Ct,n!==0||(n=window.event,n=n===void 0?16:nf(n.type)),n)}function fi(n,i,a,c){if(50<Ho)throw Ho=0,Mu=null,Error(t(185));uo(n,a,c),((xt&2)===0||n!==tn)&&(n===tn&&((xt&2)===0&&(nl|=a),$t===4&&pr(n,an)),Dn(n,c),a===1&&xt===0&&(i.mode&1)===0&&(Rs=Be()+500,Ua&&ar()))}function Dn(n,i){var a=n.callbackNode;Cn(n,i);var c=qn(n,n===tn?an:0);if(c===0)a!==null&&Fe(a),n.callbackNode=null,n.callbackPriority=0;else if(i=c&-c,n.callbackPriority!==i){if(a!=null&&Fe(a),i===1)n.tag===0?lv(ip.bind(null,n)):Gf(ip.bind(null,n)),rv(function(){(xt&6)===0&&ar()}),a=null;else{switch(qd(c)){case 1:a=ot;break;case 4:a=ct;break;case 16:a=Rt;break;case 536870912:a=Gt;break;default:a=Rt}a=dp(a,np.bind(null,n))}n.callbackPriority=i,n.callbackNode=a}}function np(n,i){if(ol=-1,al=0,(xt&6)!==0)throw Error(t(327));var a=n.callbackNode;if(Ls()&&n.callbackNode!==a)return null;var c=qn(n,n===tn?an:0);if(c===0)return null;if((c&30)!==0||(c&n.expiredLanes)!==0||i)i=ll(n,c);else{i=c;var p=xt;xt|=2;var v=sp();(tn!==n||an!==i)&&(ki=null,Rs=Be()+500,Vr(n,i));do try{Rv();break}catch(F){rp(n,F)}while(!0);zc(),tl.current=v,xt=p,Wt!==null?i=0:(tn=null,an=0,i=$t)}if(i!==0){if(i===2&&(p=Ir(n),p!==0&&(c=p,i=Eu(n,p))),i===1)throw a=Bo,Vr(n,0),pr(n,c),Dn(n,Be()),a;if(i===6)pr(n,c);else{if(p=n.current.alternate,(c&30)===0&&!Cv(p)&&(i=ll(n,c),i===2&&(v=Ir(n),v!==0&&(c=v,i=Eu(n,v))),i===1))throw a=Bo,Vr(n,0),pr(n,c),Dn(n,Be()),a;switch(n.finishedWork=p,n.finishedLanes=c,i){case 0:case 1:throw Error(t(345));case 2:Wr(n,Pn,ki);break;case 3:if(pr(n,c),(c&130023424)===c&&(i=yu+500-Be(),10<i)){if(qn(n,0)!==0)break;if(p=n.suspendedLanes,(p&c)!==c){Mn(),n.pingedLanes|=n.suspendedLanes&p;break}n.timeoutHandle=Rc(Wr.bind(null,n,Pn,ki),i);break}Wr(n,Pn,ki);break;case 4:if(pr(n,c),(c&4194240)===c)break;for(i=n.eventTimes,p=-1;0<c;){var E=31-yn(c);v=1<<E,E=i[E],E>p&&(p=E),c&=~v}if(c=p,c=Be()-c,c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3e3>c?3e3:4320>c?4320:1960*Av(c/1960))-c,10<c){n.timeoutHandle=Rc(Wr.bind(null,n,Pn,ki),c);break}Wr(n,Pn,ki);break;case 5:Wr(n,Pn,ki);break;default:throw Error(t(329))}}}return Dn(n,Be()),n.callbackNode===a?np.bind(null,n):null}function Eu(n,i){var a=zo;return n.current.memoizedState.isDehydrated&&(Vr(n,i).flags|=256),n=ll(n,i),n!==2&&(i=Pn,Pn=a,i!==null&&Tu(i)),n}function Tu(n){Pn===null?Pn=n:Pn.push.apply(Pn,n)}function Cv(n){for(var i=n;;){if(i.flags&16384){var a=i.updateQueue;if(a!==null&&(a=a.stores,a!==null))for(var c=0;c<a.length;c++){var p=a[c],v=p.getSnapshot;p=p.value;try{if(!ai(v(),p))return!1}catch{return!1}}}if(a=i.child,i.subtreeFlags&16384&&a!==null)a.return=i,i=a;else{if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function pr(n,i){for(i&=~xu,i&=~nl,n.suspendedLanes|=i,n.pingedLanes&=~i,n=n.expirationTimes;0<i;){var a=31-yn(i),c=1<<a;n[a]=-1,i&=~c}}function ip(n){if((xt&6)!==0)throw Error(t(327));Ls();var i=qn(n,0);if((i&1)===0)return Dn(n,Be()),null;var a=ll(n,i);if(n.tag!==0&&a===2){var c=Ir(n);c!==0&&(i=c,a=Eu(n,c))}if(a===1)throw a=Bo,Vr(n,0),pr(n,i),Dn(n,Be()),a;if(a===6)throw Error(t(345));return n.finishedWork=n.current.alternate,n.finishedLanes=i,Wr(n,Pn,ki),Dn(n,Be()),null}function wu(n,i){var a=xt;xt|=1;try{return n(i)}finally{xt=a,xt===0&&(Rs=Be()+500,Ua&&ar())}}function Gr(n){fr!==null&&fr.tag===0&&(xt&6)===0&&Ls();var i=xt;xt|=1;var a=Jn.transition,c=Ct;try{if(Jn.transition=null,Ct=1,n)return n()}finally{Ct=c,Jn.transition=a,xt=i,(xt&6)===0&&ar()}}function Au(){Vn=bs.current,Dt(bs)}function Vr(n,i){n.finishedWork=null,n.finishedLanes=0;var a=n.timeoutHandle;if(a!==-1&&(n.timeoutHandle=-1,iv(a)),Wt!==null)for(a=Wt.return;a!==null;){var c=a;switch(Uc(c),c.tag){case 1:c=c.type.childContextTypes,c!=null&&Ia();break;case 3:ws(),Dt(bn),Dt(fn),qc();break;case 5:Xc(c);break;case 4:ws();break;case 13:Dt(Ft);break;case 19:Dt(Ft);break;case 10:Hc(c.type._context);break;case 22:case 23:Au()}a=a.return}if(tn=n,Wt=n=mr(n.current,null),an=Vn=i,$t=0,Bo=null,xu=nl=Hr=0,Pn=zo=null,kr!==null){for(i=0;i<kr.length;i++)if(a=kr[i],c=a.interleaved,c!==null){a.interleaved=null;var p=c.next,v=a.pending;if(v!==null){var E=v.next;v.next=p,c.next=E}a.pending=c}kr=null}return n}function rp(n,i){do{var a=Wt;try{if(zc(),ja.current=$a,Xa){for(var c=kt.memoizedState;c!==null;){var p=c.queue;p!==null&&(p.pending=null),c=c.next}Xa=!1}if(zr=0,en=qt=kt=null,Io=!1,No=0,_u.current=null,a===null||a.return===null){$t=1,Bo=i,Wt=null;break}e:{var v=n,E=a.return,F=a,W=i;if(i=an,F.flags|=32768,W!==null&&typeof W=="object"&&typeof W.then=="function"){var re=W,Me=F,we=Me.tag;if((Me.mode&1)===0&&(we===0||we===11||we===15)){var ye=Me.alternate;ye?(Me.updateQueue=ye.updateQueue,Me.memoizedState=ye.memoizedState,Me.lanes=ye.lanes):(Me.updateQueue=null,Me.memoizedState=null)}var ke=Rh(E);if(ke!==null){ke.flags&=-257,Lh(ke,E,F,v,i),ke.mode&1&&bh(v,re,i),i=ke,W=re;var Ge=i.updateQueue;if(Ge===null){var We=new Set;We.add(W),i.updateQueue=We}else Ge.add(W);break e}else{if((i&1)===0){bh(v,re,i),Cu();break e}W=Error(t(426))}}else if(Ut&&F.mode&1){var Vt=Rh(E);if(Vt!==null){(Vt.flags&65536)===0&&(Vt.flags|=256),Lh(Vt,E,F,v,i),kc(As(W,F));break e}}v=W=As(W,F),$t!==4&&($t=2),zo===null?zo=[v]:zo.push(v),v=E;do{switch(v.tag){case 3:v.flags|=65536,i&=-i,v.lanes|=i;var J=Ah(v,W,i);Jf(v,J);break e;case 1:F=W;var q=v.type,ne=v.stateNode;if((v.flags&128)===0&&(typeof q.getDerivedStateFromError=="function"||ne!==null&&typeof ne.componentDidCatch=="function"&&(dr===null||!dr.has(ne)))){v.flags|=65536,i&=-i,v.lanes|=i;var Ce=Ch(v,F,i);Jf(v,Ce);break e}}v=v.return}while(v!==null)}ap(a)}catch(je){i=je,Wt===a&&a!==null&&(Wt=a=a.return);continue}break}while(!0)}function sp(){var n=tl.current;return tl.current=$a,n===null?$a:n}function Cu(){($t===0||$t===3||$t===2)&&($t=4),tn===null||(Hr&268435455)===0&&(nl&268435455)===0||pr(tn,an)}function ll(n,i){var a=xt;xt|=2;var c=sp();(tn!==n||an!==i)&&(ki=null,Vr(n,i));do try{bv();break}catch(p){rp(n,p)}while(!0);if(zc(),xt=a,tl.current=c,Wt!==null)throw Error(t(261));return tn=null,an=0,$t}function bv(){for(;Wt!==null;)op(Wt)}function Rv(){for(;Wt!==null&&!Ye();)op(Wt)}function op(n){var i=up(n.alternate,n,Vn);n.memoizedProps=n.pendingProps,i===null?ap(n):Wt=i,_u.current=null}function ap(n){var i=n;do{var a=i.alternate;if(n=i.return,(i.flags&32768)===0){if(a=Sv(a,i,Vn),a!==null){Wt=a;return}}else{if(a=Mv(a,i),a!==null){a.flags&=32767,Wt=a;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{$t=6,Wt=null;return}}if(i=i.sibling,i!==null){Wt=i;return}Wt=i=n}while(i!==null);$t===0&&($t=5)}function Wr(n,i,a){var c=Ct,p=Jn.transition;try{Jn.transition=null,Ct=1,Lv(n,i,a,c)}finally{Jn.transition=p,Ct=c}return null}function Lv(n,i,a,c){do Ls();while(fr!==null);if((xt&6)!==0)throw Error(t(327));a=n.finishedWork;var p=n.finishedLanes;if(a===null)return null;if(n.finishedWork=null,n.finishedLanes=0,a===n.current)throw Error(t(177));n.callbackNode=null,n.callbackPriority=0;var v=a.lanes|a.childLanes;if(u0(n,v),n===tn&&(Wt=tn=null,an=0),(a.subtreeFlags&2064)===0&&(a.flags&2064)===0||rl||(rl=!0,dp(Rt,function(){return Ls(),null})),v=(a.flags&15990)!==0,(a.subtreeFlags&15990)!==0||v){v=Jn.transition,Jn.transition=null;var E=Ct;Ct=1;var F=xt;xt|=4,_u.current=null,Tv(n,a),Zh(a,n),K0(Cc),xa=!!Ac,Cc=Ac=null,n.current=a,wv(a),et(),xt=F,Ct=E,Jn.transition=v}else n.current=a;if(rl&&(rl=!1,fr=n,sl=p),v=n.pendingLanes,v===0&&(dr=null),ft(a.stateNode),Dn(n,Be()),i!==null)for(c=n.onRecoverableError,a=0;a<i.length;a++)p=i[a],c(p.value,{componentStack:p.stack,digest:p.digest});if(il)throw il=!1,n=Su,Su=null,n;return(sl&1)!==0&&n.tag!==0&&Ls(),v=n.pendingLanes,(v&1)!==0?n===Mu?Ho++:(Ho=0,Mu=n):Ho=0,ar(),null}function Ls(){if(fr!==null){var n=qd(sl),i=Jn.transition,a=Ct;try{if(Jn.transition=null,Ct=16>n?16:n,fr===null)var c=!1;else{if(n=fr,fr=null,sl=0,(xt&6)!==0)throw Error(t(331));var p=xt;for(xt|=4,ze=n.current;ze!==null;){var v=ze,E=v.child;if((ze.flags&16)!==0){var F=v.deletions;if(F!==null){for(var W=0;W<F.length;W++){var re=F[W];for(ze=re;ze!==null;){var Me=ze;switch(Me.tag){case 0:case 11:case 15:ko(8,Me,v)}var we=Me.child;if(we!==null)we.return=Me,ze=we;else for(;ze!==null;){Me=ze;var ye=Me.sibling,ke=Me.return;if(Xh(Me),Me===re){ze=null;break}if(ye!==null){ye.return=ke,ze=ye;break}ze=ke}}}var Ge=v.alternate;if(Ge!==null){var We=Ge.child;if(We!==null){Ge.child=null;do{var Vt=We.sibling;We.sibling=null,We=Vt}while(We!==null)}}ze=v}}if((v.subtreeFlags&2064)!==0&&E!==null)E.return=v,ze=E;else e:for(;ze!==null;){if(v=ze,(v.flags&2048)!==0)switch(v.tag){case 0:case 11:case 15:ko(9,v,v.return)}var J=v.sibling;if(J!==null){J.return=v.return,ze=J;break e}ze=v.return}}var q=n.current;for(ze=q;ze!==null;){E=ze;var ne=E.child;if((E.subtreeFlags&2064)!==0&&ne!==null)ne.return=E,ze=ne;else e:for(E=q;ze!==null;){if(F=ze,(F.flags&2048)!==0)try{switch(F.tag){case 0:case 11:case 15:el(9,F)}}catch(je){Ht(F,F.return,je)}if(F===E){ze=null;break e}var Ce=F.sibling;if(Ce!==null){Ce.return=F.return,ze=Ce;break e}ze=F.return}}if(xt=p,ar(),_t&&typeof _t.onPostCommitFiberRoot=="function")try{_t.onPostCommitFiberRoot(An,n)}catch{}c=!0}return c}finally{Ct=a,Jn.transition=i}}return!1}function lp(n,i,a){i=As(a,i),i=Ah(n,i,1),n=cr(n,i,1),i=Mn(),n!==null&&(uo(n,1,i),Dn(n,i))}function Ht(n,i,a){if(n.tag===3)lp(n,n,a);else for(;i!==null;){if(i.tag===3){lp(i,n,a);break}else if(i.tag===1){var c=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof c.componentDidCatch=="function"&&(dr===null||!dr.has(c))){n=As(a,n),n=Ch(i,n,1),i=cr(i,n,1),n=Mn(),i!==null&&(uo(i,1,n),Dn(i,n));break}}i=i.return}}function Pv(n,i,a){var c=n.pingCache;c!==null&&c.delete(i),i=Mn(),n.pingedLanes|=n.suspendedLanes&a,tn===n&&(an&a)===a&&($t===4||$t===3&&(an&130023424)===an&&500>Be()-yu?Vr(n,0):xu|=a),Dn(n,i)}function cp(n,i){i===0&&((n.mode&1)===0?i=1:(i=Zi,Zi<<=1,(Zi&130023424)===0&&(Zi=4194304)));var a=Mn();n=Ui(n,i),n!==null&&(uo(n,i,a),Dn(n,a))}function Dv(n){var i=n.memoizedState,a=0;i!==null&&(a=i.retryLane),cp(n,a)}function Iv(n,i){var a=0;switch(n.tag){case 13:var c=n.stateNode,p=n.memoizedState;p!==null&&(a=p.retryLane);break;case 19:c=n.stateNode;break;default:throw Error(t(314))}c!==null&&c.delete(i),cp(n,a)}var up;up=function(n,i,a){if(n!==null)if(n.memoizedProps!==i.pendingProps||bn.current)Ln=!0;else{if((n.lanes&a)===0&&(i.flags&128)===0)return Ln=!1,yv(n,i,a);Ln=(n.flags&131072)!==0}else Ln=!1,Ut&&(i.flags&1048576)!==0&&Vf(i,Fa,i.index);switch(i.lanes=0,i.tag){case 2:var c=i.type;Qa(n,i),n=i.pendingProps;var p=_s(i,fn.current);Ts(i,a),p=Zc(null,i,c,n,p,a);var v=Qc();return i.flags|=1,typeof p=="object"&&p!==null&&typeof p.render=="function"&&p.$$typeof===void 0?(i.tag=1,i.memoizedState=null,i.updateQueue=null,Rn(c)?(v=!0,Na(i)):v=!1,i.memoizedState=p.state!==null&&p.state!==void 0?p.state:null,Wc(i),p.updater=Ka,i.stateNode=p,p._reactInternals=i,ru(i,c,n,a),i=lu(null,i,c,!0,v,a)):(i.tag=0,Ut&&v&&Nc(i),Sn(null,i,p,a),i=i.child),i;case 16:c=i.elementType;e:{switch(Qa(n,i),n=i.pendingProps,p=c._init,c=p(c._payload),i.type=c,p=i.tag=Uv(c),n=ci(c,n),p){case 0:i=au(null,i,c,n,a);break e;case 1:i=Oh(null,i,c,n,a);break e;case 11:i=Ph(null,i,c,n,a);break e;case 14:i=Dh(null,i,c,ci(c.type,n),a);break e}throw Error(t(306,c,""))}return i;case 0:return c=i.type,p=i.pendingProps,p=i.elementType===c?p:ci(c,p),au(n,i,c,p,a);case 1:return c=i.type,p=i.pendingProps,p=i.elementType===c?p:ci(c,p),Oh(n,i,c,p,a);case 3:e:{if(Fh(i),n===null)throw Error(t(387));c=i.pendingProps,v=i.memoizedState,p=v.element,Qf(n,i),Va(i,c,null,a);var E=i.memoizedState;if(c=E.element,v.isDehydrated)if(v={element:c,isDehydrated:!1,cache:E.cache,pendingSuspenseBoundaries:E.pendingSuspenseBoundaries,transitions:E.transitions},i.updateQueue.baseState=v,i.memoizedState=v,i.flags&256){p=As(Error(t(423)),i),i=kh(n,i,c,a,p);break e}else if(c!==p){p=As(Error(t(424)),i),i=kh(n,i,c,a,p);break e}else for(Gn=rr(i.stateNode.containerInfo.firstChild),Hn=i,Ut=!0,li=null,a=Kf(i,null,c,a),i.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(Ss(),c===p){i=Fi(n,i,a);break e}Sn(n,i,c,a)}i=i.child}return i;case 5:return th(i),n===null&&Fc(i),c=i.type,p=i.pendingProps,v=n!==null?n.memoizedProps:null,E=p.children,bc(c,p)?E=null:v!==null&&bc(c,v)&&(i.flags|=32),Uh(n,i),Sn(n,i,E,a),i.child;case 6:return n===null&&Fc(i),null;case 13:return Bh(n,i,a);case 4:return jc(i,i.stateNode.containerInfo),c=i.pendingProps,n===null?i.child=Ms(i,null,c,a):Sn(n,i,c,a),i.child;case 11:return c=i.type,p=i.pendingProps,p=i.elementType===c?p:ci(c,p),Ph(n,i,c,p,a);case 7:return Sn(n,i,i.pendingProps,a),i.child;case 8:return Sn(n,i,i.pendingProps.children,a),i.child;case 12:return Sn(n,i,i.pendingProps.children,a),i.child;case 10:e:{if(c=i.type._context,p=i.pendingProps,v=i.memoizedProps,E=p.value,Lt(za,c._currentValue),c._currentValue=E,v!==null)if(ai(v.value,E)){if(v.children===p.children&&!bn.current){i=Fi(n,i,a);break e}}else for(v=i.child,v!==null&&(v.return=i);v!==null;){var F=v.dependencies;if(F!==null){E=v.child;for(var W=F.firstContext;W!==null;){if(W.context===c){if(v.tag===1){W=Oi(-1,a&-a),W.tag=2;var re=v.updateQueue;if(re!==null){re=re.shared;var Me=re.pending;Me===null?W.next=W:(W.next=Me.next,Me.next=W),re.pending=W}}v.lanes|=a,W=v.alternate,W!==null&&(W.lanes|=a),Gc(v.return,a,i),F.lanes|=a;break}W=W.next}}else if(v.tag===10)E=v.type===i.type?null:v.child;else if(v.tag===18){if(E=v.return,E===null)throw Error(t(341));E.lanes|=a,F=E.alternate,F!==null&&(F.lanes|=a),Gc(E,a,i),E=v.sibling}else E=v.child;if(E!==null)E.return=v;else for(E=v;E!==null;){if(E===i){E=null;break}if(v=E.sibling,v!==null){v.return=E.return,E=v;break}E=E.return}v=E}Sn(n,i,p.children,a),i=i.child}return i;case 9:return p=i.type,c=i.pendingProps.children,Ts(i,a),p=Zn(p),c=c(p),i.flags|=1,Sn(n,i,c,a),i.child;case 14:return c=i.type,p=ci(c,i.pendingProps),p=ci(c.type,p),Dh(n,i,c,p,a);case 15:return Ih(n,i,i.type,i.pendingProps,a);case 17:return c=i.type,p=i.pendingProps,p=i.elementType===c?p:ci(c,p),Qa(n,i),i.tag=1,Rn(c)?(n=!0,Na(i)):n=!1,Ts(i,a),Th(i,c,p),ru(i,c,p,a),lu(null,i,c,!0,n,a);case 19:return Hh(n,i,a);case 22:return Nh(n,i,a)}throw Error(t(156,i.tag))};function dp(n,i){return se(n,i)}function Nv(n,i,a,c){this.tag=n,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=c,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ei(n,i,a,c){return new Nv(n,i,a,c)}function bu(n){return n=n.prototype,!(!n||!n.isReactComponent)}function Uv(n){if(typeof n=="function")return bu(n)?1:0;if(n!=null){if(n=n.$$typeof,n===ue)return 11;if(n===V)return 14}return 2}function mr(n,i){var a=n.alternate;return a===null?(a=ei(n.tag,i,n.key,n.mode),a.elementType=n.elementType,a.type=n.type,a.stateNode=n.stateNode,a.alternate=n,n.alternate=a):(a.pendingProps=i,a.type=n.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=n.flags&14680064,a.childLanes=n.childLanes,a.lanes=n.lanes,a.child=n.child,a.memoizedProps=n.memoizedProps,a.memoizedState=n.memoizedState,a.updateQueue=n.updateQueue,i=n.dependencies,a.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},a.sibling=n.sibling,a.index=n.index,a.ref=n.ref,a}function cl(n,i,a,c,p,v){var E=2;if(c=n,typeof n=="function")bu(n)&&(E=1);else if(typeof n=="string")E=5;else e:switch(n){case N:return jr(a.children,p,v,i);case oe:E=8,p|=8;break;case A:return n=ei(12,a,i,p|2),n.elementType=A,n.lanes=v,n;case de:return n=ei(13,a,i,p),n.elementType=de,n.lanes=v,n;case B:return n=ei(19,a,i,p),n.elementType=B,n.lanes=v,n;case Q:return ul(a,p,v,i);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case R:E=10;break e;case ie:E=9;break e;case ue:E=11;break e;case V:E=14;break e;case $:E=16,c=null;break e}throw Error(t(130,n==null?n:typeof n,""))}return i=ei(E,a,i,p),i.elementType=n,i.type=c,i.lanes=v,i}function jr(n,i,a,c){return n=ei(7,n,c,i),n.lanes=a,n}function ul(n,i,a,c){return n=ei(22,n,c,i),n.elementType=Q,n.lanes=a,n.stateNode={isHidden:!1},n}function Ru(n,i,a){return n=ei(6,n,null,i),n.lanes=a,n}function Lu(n,i,a){return i=ei(4,n.children!==null?n.children:[],n.key,i),i.lanes=a,i.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},i}function Ov(n,i,a,c,p){this.tag=i,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ls(0),this.expirationTimes=ls(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ls(0),this.identifierPrefix=c,this.onRecoverableError=p,this.mutableSourceEagerHydrationData=null}function Pu(n,i,a,c,p,v,E,F,W){return n=new Ov(n,i,a,F,W),i===1?(i=1,v===!0&&(i|=8)):i=0,v=ei(3,null,null,i),n.current=v,v.stateNode=n,v.memoizedState={element:c,isDehydrated:a,cache:null,transitions:null,pendingSuspenseBoundaries:null},Wc(v),n}function Fv(n,i,a){var c=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:k,key:c==null?null:""+c,children:n,containerInfo:i,implementation:a}}function fp(n){if(!n)return or;n=n._reactInternals;e:{if(Ri(n)!==n||n.tag!==1)throw Error(t(170));var i=n;do{switch(i.tag){case 3:i=i.stateNode.context;break e;case 1:if(Rn(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break e}}i=i.return}while(i!==null);throw Error(t(171))}if(n.tag===1){var a=n.type;if(Rn(a))return zf(n,a,i)}return i}function hp(n,i,a,c,p,v,E,F,W){return n=Pu(a,c,!0,n,p,v,E,F,W),n.context=fp(null),a=n.current,c=Mn(),p=hr(a),v=Oi(c,p),v.callback=i??null,cr(a,v,p),n.current.lanes=p,uo(n,p,c),Dn(n,c),n}function dl(n,i,a,c){var p=i.current,v=Mn(),E=hr(p);return a=fp(a),i.context===null?i.context=a:i.pendingContext=a,i=Oi(v,E),i.payload={element:n},c=c===void 0?null:c,c!==null&&(i.callback=c),n=cr(p,i,E),n!==null&&(fi(n,p,E,v),Ga(n,p,E)),E}function fl(n){return n=n.current,n.child?(n.child.tag===5,n.child.stateNode):null}function pp(n,i){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var a=n.retryLane;n.retryLane=a!==0&&a<i?a:i}}function Du(n,i){pp(n,i),(n=n.alternate)&&pp(n,i)}function kv(){return null}var mp=typeof reportError=="function"?reportError:function(n){console.error(n)};function Iu(n){this._internalRoot=n}hl.prototype.render=Iu.prototype.render=function(n){var i=this._internalRoot;if(i===null)throw Error(t(409));dl(n,i,null,null)},hl.prototype.unmount=Iu.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var i=n.containerInfo;Gr(function(){dl(null,n,null,null)}),i[Pi]=null}};function hl(n){this._internalRoot=n}hl.prototype.unstable_scheduleHydration=function(n){if(n){var i=Zd();n={blockedOn:null,target:n,priority:i};for(var a=0;a<tr.length&&i!==0&&i<tr[a].priority;a++);tr.splice(a,0,n),a===0&&ef(n)}};function Nu(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function pl(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function gp(){}function Bv(n,i,a,c,p){if(p){if(typeof c=="function"){var v=c;c=function(){var re=fl(E);v.call(re)}}var E=hp(i,c,n,0,null,!1,!1,"",gp);return n._reactRootContainer=E,n[Pi]=E.current,wo(n.nodeType===8?n.parentNode:n),Gr(),E}for(;p=n.lastChild;)n.removeChild(p);if(typeof c=="function"){var F=c;c=function(){var re=fl(W);F.call(re)}}var W=Pu(n,0,!1,null,null,!1,!1,"",gp);return n._reactRootContainer=W,n[Pi]=W.current,wo(n.nodeType===8?n.parentNode:n),Gr(function(){dl(i,W,a,c)}),W}function ml(n,i,a,c,p){var v=a._reactRootContainer;if(v){var E=v;if(typeof p=="function"){var F=p;p=function(){var W=fl(E);F.call(W)}}dl(i,E,n,p)}else E=Bv(a,i,n,p,c);return fl(E)}$d=function(n){switch(n.tag){case 3:var i=n.stateNode;if(i.current.memoizedState.isDehydrated){var a=zt(i.pendingLanes);a!==0&&(rc(i,a|1),Dn(i,Be()),(xt&6)===0&&(Rs=Be()+500,ar()))}break;case 13:Gr(function(){var c=Ui(n,1);if(c!==null){var p=Mn();fi(c,n,1,p)}}),Du(n,1)}},sc=function(n){if(n.tag===13){var i=Ui(n,134217728);if(i!==null){var a=Mn();fi(i,n,134217728,a)}Du(n,134217728)}},Kd=function(n){if(n.tag===13){var i=hr(n),a=Ui(n,i);if(a!==null){var c=Mn();fi(a,n,i,c)}Du(n,i)}},Zd=function(){return Ct},Qd=function(n,i){var a=Ct;try{return Ct=n,i()}finally{Ct=a}},Re=function(n,i,a){switch(i){case"input":if($e(n,a),i=a.name,a.type==="radio"&&i!=null){for(a=n;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),i=0;i<a.length;i++){var c=a[i];if(c!==n&&c.form===n.form){var p=Da(c);if(!p)throw Error(t(90));K(c),$e(c,p)}}}break;case"textarea":me(n,a);break;case"select":i=a.value,i!=null&&te(n,!!a.multiple,i,!1)}},wt=wu,At=Gr;var zv={usingClientEntryPoint:!1,Events:[bo,gs,Da,tt,Ze,wu]},Go={findFiberByHostInstance:Nr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Hv={bundleType:Go.bundleType,version:Go.version,rendererPackageName:Go.rendererPackageName,rendererConfig:Go.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:P.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=ae(n),n===null?null:n.stateNode},findFiberByHostInstance:Go.findFiberByHostInstance||kv,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var gl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!gl.isDisabled&&gl.supportsFiber)try{An=gl.inject(Hv),_t=gl}catch{}}return In.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=zv,In.createPortal=function(n,i){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Nu(i))throw Error(t(200));return Fv(n,i,null,a)},In.createRoot=function(n,i){if(!Nu(n))throw Error(t(299));var a=!1,c="",p=mp;return i!=null&&(i.unstable_strictMode===!0&&(a=!0),i.identifierPrefix!==void 0&&(c=i.identifierPrefix),i.onRecoverableError!==void 0&&(p=i.onRecoverableError)),i=Pu(n,1,!1,null,null,a,!1,c,p),n[Pi]=i.current,wo(n.nodeType===8?n.parentNode:n),new Iu(i)},In.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var i=n._reactInternals;if(i===void 0)throw typeof n.render=="function"?Error(t(188)):(n=Object.keys(n).join(","),Error(t(268,n)));return n=ae(i),n=n===null?null:n.stateNode,n},In.flushSync=function(n){return Gr(n)},In.hydrate=function(n,i,a){if(!pl(i))throw Error(t(200));return ml(null,n,i,!0,a)},In.hydrateRoot=function(n,i,a){if(!Nu(n))throw Error(t(405));var c=a!=null&&a.hydratedSources||null,p=!1,v="",E=mp;if(a!=null&&(a.unstable_strictMode===!0&&(p=!0),a.identifierPrefix!==void 0&&(v=a.identifierPrefix),a.onRecoverableError!==void 0&&(E=a.onRecoverableError)),i=hp(i,null,n,1,a??null,p,!1,v,E),n[Pi]=i.current,wo(n),c)for(n=0;n<c.length;n++)a=c[n],p=a._getVersion,p=p(a._source),i.mutableSourceEagerHydrationData==null?i.mutableSourceEagerHydrationData=[a,p]:i.mutableSourceEagerHydrationData.push(a,p);return new hl(i)},In.render=function(n,i,a){if(!pl(i))throw Error(t(200));return ml(null,n,i,!1,a)},In.unmountComponentAtNode=function(n){if(!pl(n))throw Error(t(40));return n._reactRootContainer?(Gr(function(){ml(null,null,n,!1,function(){n._reactRootContainer=null,n[Pi]=null})}),!0):!1},In.unstable_batchedUpdates=wu,In.unstable_renderSubtreeIntoContainer=function(n,i,a,c){if(!pl(a))throw Error(t(200));if(n==null||n._reactInternals===void 0)throw Error(t(38));return ml(n,i,a,!1,c)},In.version="18.3.1-next-f1338f8080-20240426",In}var Tp;function hg(){if(Tp)return Fu.exports;Tp=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),Fu.exports=Kv(),Fu.exports}var wp;function Zv(){if(wp)return vl;wp=1;var r=hg();return vl.createRoot=r.createRoot,vl.hydrateRoot=r.hydrateRoot,vl}var Qv=Zv();const Jv=dg(Qv);hg();function Zo(){return Zo=Object.assign?Object.assign.bind():function(r){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(r[s]=t[s])}return r},Zo.apply(this,arguments)}var Mr;(function(r){r.Pop="POP",r.Push="PUSH",r.Replace="REPLACE"})(Mr||(Mr={}));const Ap="popstate";function e_(r){r===void 0&&(r={});function e(s,o){let{pathname:l,search:u,hash:d}=s.location;return Td("",{pathname:l,search:u,hash:d},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function t(s,o){return typeof o=="string"?o:pg(o)}return n_(e,t,null,r)}function Xt(r,e){if(r===!1||r===null||typeof r>"u")throw new Error(e)}function Od(r,e){if(!r){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function t_(){return Math.random().toString(36).substr(2,8)}function Cp(r,e){return{usr:r.state,key:r.key,idx:e}}function Td(r,e,t,s){return t===void 0&&(t=null),Zo({pathname:typeof r=="string"?r:r.pathname,search:"",hash:""},typeof e=="string"?so(e):e,{state:t,key:e&&e.key||s||t_()})}function pg(r){let{pathname:e="/",search:t="",hash:s=""}=r;return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),s&&s!=="#"&&(e+=s.charAt(0)==="#"?s:"#"+s),e}function so(r){let e={};if(r){let t=r.indexOf("#");t>=0&&(e.hash=r.substr(t),r=r.substr(0,t));let s=r.indexOf("?");s>=0&&(e.search=r.substr(s),r=r.substr(0,s)),r&&(e.pathname=r)}return e}function n_(r,e,t,s){s===void 0&&(s={});let{window:o=document.defaultView,v5Compat:l=!1}=s,u=o.history,d=Mr.Pop,f=null,h=m();h==null&&(h=0,u.replaceState(Zo({},u.state,{idx:h}),""));function m(){return(u.state||{idx:null}).idx}function g(){d=Mr.Pop;let x=m(),y=x==null?null:x-h;h=x,f&&f({action:d,location:M.location,delta:y})}function _(x,y){d=Mr.Push;let w=Td(M.location,x,y);h=m()+1;let b=Cp(w,h),P=M.createHref(w);try{u.pushState(b,"",P)}catch(z){if(z instanceof DOMException&&z.name==="DataCloneError")throw z;o.location.assign(P)}l&&f&&f({action:d,location:M.location,delta:1})}function S(x,y){d=Mr.Replace;let w=Td(M.location,x,y);h=m();let b=Cp(w,h),P=M.createHref(w);u.replaceState(b,"",P),l&&f&&f({action:d,location:M.location,delta:0})}function T(x){let y=o.location.origin!=="null"?o.location.origin:o.location.href,w=typeof x=="string"?x:pg(x);return w=w.replace(/ $/,"%20"),Xt(y,"No window.location.(origin|href) available to create URL for href: "+w),new URL(w,y)}let M={get action(){return d},get location(){return r(o,u)},listen(x){if(f)throw new Error("A history only accepts one active listener");return o.addEventListener(Ap,g),f=x,()=>{o.removeEventListener(Ap,g),f=null}},createHref(x){return e(o,x)},createURL:T,encodeLocation(x){let y=T(x);return{pathname:y.pathname,search:y.search,hash:y.hash}},push:_,replace:S,go(x){return u.go(x)}};return M}var bp;(function(r){r.data="data",r.deferred="deferred",r.redirect="redirect",r.error="error"})(bp||(bp={}));function i_(r,e,t){return t===void 0&&(t="/"),r_(r,e,t)}function r_(r,e,t,s){let o=typeof e=="string"?so(e):e,l=vg(o.pathname||"/",t);if(l==null)return null;let u=mg(r);s_(u);let d=null;for(let f=0;d==null&&f<u.length;++f){let h=v_(l);d=p_(u[f],h)}return d}function mg(r,e,t,s){e===void 0&&(e=[]),t===void 0&&(t=[]),s===void 0&&(s="");let o=(l,u,d)=>{let f={relativePath:d===void 0?l.path||"":d,caseSensitive:l.caseSensitive===!0,childrenIndex:u,route:l};f.relativePath.startsWith("/")&&(Xt(f.relativePath.startsWith(s),'Absolute route path "'+f.relativePath+'" nested under path '+('"'+s+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),f.relativePath=f.relativePath.slice(s.length));let h=ts([s,f.relativePath]),m=t.concat(f);l.children&&l.children.length>0&&(Xt(l.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+h+'".')),mg(l.children,e,m,h)),!(l.path==null&&!l.index)&&e.push({path:h,score:f_(h,l.index),routesMeta:m})};return r.forEach((l,u)=>{var d;if(l.path===""||!((d=l.path)!=null&&d.includes("?")))o(l,u);else for(let f of gg(l.path))o(l,u,f)}),e}function gg(r){let e=r.split("/");if(e.length===0)return[];let[t,...s]=e,o=t.endsWith("?"),l=t.replace(/\?$/,"");if(s.length===0)return o?[l,""]:[l];let u=gg(s.join("/")),d=[];return d.push(...u.map(f=>f===""?l:[l,f].join("/"))),o&&d.push(...u),d.map(f=>r.startsWith("/")&&f===""?"/":f)}function s_(r){r.sort((e,t)=>e.score!==t.score?t.score-e.score:h_(e.routesMeta.map(s=>s.childrenIndex),t.routesMeta.map(s=>s.childrenIndex)))}const o_=/^:[\w-]+$/,a_=3,l_=2,c_=1,u_=10,d_=-2,Rp=r=>r==="*";function f_(r,e){let t=r.split("/"),s=t.length;return t.some(Rp)&&(s+=d_),e&&(s+=l_),t.filter(o=>!Rp(o)).reduce((o,l)=>o+(o_.test(l)?a_:l===""?c_:u_),s)}function h_(r,e){return r.length===e.length&&r.slice(0,-1).every((s,o)=>s===e[o])?r[r.length-1]-e[e.length-1]:0}function p_(r,e,t){let{routesMeta:s}=r,o={},l="/",u=[];for(let d=0;d<s.length;++d){let f=s[d],h=d===s.length-1,m=l==="/"?e:e.slice(l.length)||"/",g=m_({path:f.relativePath,caseSensitive:f.caseSensitive,end:h},m),_=f.route;if(!g)return null;Object.assign(o,g.params),u.push({params:o,pathname:ts([l,g.pathname]),pathnameBase:M_(ts([l,g.pathnameBase])),route:_}),g.pathnameBase!=="/"&&(l=ts([l,g.pathnameBase]))}return u}function m_(r,e){typeof r=="string"&&(r={path:r,caseSensitive:!1,end:!0});let[t,s]=g_(r.path,r.caseSensitive,r.end),o=e.match(t);if(!o)return null;let l=o[0],u=l.replace(/(.)\/+$/,"$1"),d=o.slice(1);return{params:s.reduce((h,m,g)=>{let{paramName:_,isOptional:S}=m;if(_==="*"){let M=d[g]||"";u=l.slice(0,l.length-M.length).replace(/(.)\/+$/,"$1")}const T=d[g];return S&&!T?h[_]=void 0:h[_]=(T||"").replace(/%2F/g,"/"),h},{}),pathname:l,pathnameBase:u,pattern:r}}function g_(r,e,t){e===void 0&&(e=!1),t===void 0&&(t=!0),Od(r==="*"||!r.endsWith("*")||r.endsWith("/*"),'Route path "'+r+'" will be treated as if it were '+('"'+r.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+r.replace(/\*$/,"/*")+'".'));let s=[],o="^"+r.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(u,d,f)=>(s.push({paramName:d,isOptional:f!=null}),f?"/?([^\\/]+)?":"/([^\\/]+)"));return r.endsWith("*")?(s.push({paramName:"*"}),o+=r==="*"||r==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):t?o+="\\/*$":r!==""&&r!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,e?void 0:"i"),s]}function v_(r){try{return r.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return Od(!1,'The URL path "'+r+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),r}}function vg(r,e){if(e==="/")return r;if(!r.toLowerCase().startsWith(e.toLowerCase()))return null;let t=e.endsWith("/")?e.length-1:e.length,s=r.charAt(t);return s&&s!=="/"?null:r.slice(t)||"/"}const __=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,x_=r=>__.test(r);function y_(r,e){e===void 0&&(e="/");let{pathname:t,search:s="",hash:o=""}=typeof r=="string"?so(r):r,l;if(t)if(x_(t))l=t;else{if(t.includes("//")){let u=t;t=t.replace(/\/\/+/g,"/"),Od(!1,"Pathnames cannot have embedded double slashes - normalizing "+(u+" -> "+t))}t.startsWith("/")?l=Lp(t.substring(1),"/"):l=Lp(t,e)}else l=e;return{pathname:l,search:E_(s),hash:T_(o)}}function Lp(r,e){let t=e.replace(/\/+$/,"").split("/");return r.split("/").forEach(o=>{o===".."?t.length>1&&t.pop():o!=="."&&t.push(o)}),t.length>1?t.join("/"):"/"}function zu(r,e,t,s){return"Cannot include a '"+r+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(s)+"].  Please separate it out to the ")+("`to."+t+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function S_(r){return r.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function _g(r,e){let t=S_(r);return e?t.map((s,o)=>o===t.length-1?s.pathname:s.pathnameBase):t.map(s=>s.pathnameBase)}function xg(r,e,t,s){s===void 0&&(s=!1);let o;typeof r=="string"?o=so(r):(o=Zo({},r),Xt(!o.pathname||!o.pathname.includes("?"),zu("?","pathname","search",o)),Xt(!o.pathname||!o.pathname.includes("#"),zu("#","pathname","hash",o)),Xt(!o.search||!o.search.includes("#"),zu("#","search","hash",o)));let l=r===""||o.pathname==="",u=l?"/":o.pathname,d;if(u==null)d=t;else{let g=e.length-1;if(!s&&u.startsWith("..")){let _=u.split("/");for(;_[0]==="..";)_.shift(),g-=1;o.pathname=_.join("/")}d=g>=0?e[g]:"/"}let f=y_(o,d),h=u&&u!=="/"&&u.endsWith("/"),m=(l||u===".")&&t.endsWith("/");return!f.pathname.endsWith("/")&&(h||m)&&(f.pathname+="/"),f}const ts=r=>r.join("/").replace(/\/\/+/g,"/"),M_=r=>r.replace(/\/+$/,"").replace(/^\/*/,"/"),E_=r=>!r||r==="?"?"":r.startsWith("?")?r:"?"+r,T_=r=>!r||r==="#"?"":r.startsWith("#")?r:"#"+r;function w_(r){return r!=null&&typeof r.status=="number"&&typeof r.statusText=="string"&&typeof r.internal=="boolean"&&"data"in r}const yg=["post","put","patch","delete"];new Set(yg);const A_=["get",...yg];new Set(A_);function Qo(){return Qo=Object.assign?Object.assign.bind():function(r){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(r[s]=t[s])}return r},Qo.apply(this,arguments)}const Fd=pe.createContext(null),C_=pe.createContext(null),ia=pe.createContext(null),Zl=pe.createContext(null),Rr=pe.createContext({outlet:null,matches:[],isDataRoute:!1}),Sg=pe.createContext(null);function ra(){return pe.useContext(Zl)!=null}function kd(){return ra()||Xt(!1),pe.useContext(Zl).location}function Mg(r){pe.useContext(ia).static||pe.useLayoutEffect(r)}function sa(){let{isDataRoute:r}=pe.useContext(Rr);return r?z_():b_()}function b_(){ra()||Xt(!1);let r=pe.useContext(Fd),{basename:e,future:t,navigator:s}=pe.useContext(ia),{matches:o}=pe.useContext(Rr),{pathname:l}=kd(),u=JSON.stringify(_g(o,t.v7_relativeSplatPath)),d=pe.useRef(!1);return Mg(()=>{d.current=!0}),pe.useCallback(function(h,m){if(m===void 0&&(m={}),!d.current)return;if(typeof h=="number"){s.go(h);return}let g=xg(h,JSON.parse(u),l,m.relative==="path");r==null&&e!=="/"&&(g.pathname=g.pathname==="/"?e:ts([e,g.pathname])),(m.replace?s.replace:s.push)(g,m.state,m)},[e,s,u,l,r])}function Eg(){let{matches:r}=pe.useContext(Rr),e=r[r.length-1];return e?e.params:{}}function R_(r,e){return L_(r,e)}function L_(r,e,t,s){ra()||Xt(!1);let{navigator:o}=pe.useContext(ia),{matches:l}=pe.useContext(Rr),u=l[l.length-1],d=u?u.params:{};u&&u.pathname;let f=u?u.pathnameBase:"/";u&&u.route;let h=kd(),m;if(e){var g;let x=typeof e=="string"?so(e):e;f==="/"||(g=x.pathname)!=null&&g.startsWith(f)||Xt(!1),m=x}else m=h;let _=m.pathname||"/",S=_;if(f!=="/"){let x=f.replace(/^\//,"").split("/");S="/"+_.replace(/^\//,"").split("/").slice(x.length).join("/")}let T=i_(r,{pathname:S}),M=U_(T&&T.map(x=>Object.assign({},x,{params:Object.assign({},d,x.params),pathname:ts([f,o.encodeLocation?o.encodeLocation(x.pathname).pathname:x.pathname]),pathnameBase:x.pathnameBase==="/"?f:ts([f,o.encodeLocation?o.encodeLocation(x.pathnameBase).pathname:x.pathnameBase])})),l,t,s);return e&&M?pe.createElement(Zl.Provider,{value:{location:Qo({pathname:"/",search:"",hash:"",state:null,key:"default"},m),navigationType:Mr.Pop}},M):M}function P_(){let r=B_(),e=w_(r)?r.status+" "+r.statusText:r instanceof Error?r.message:JSON.stringify(r),t=r instanceof Error?r.stack:null,o={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return pe.createElement(pe.Fragment,null,pe.createElement("h2",null,"Unexpected Application Error!"),pe.createElement("h3",{style:{fontStyle:"italic"}},e),t?pe.createElement("pre",{style:o},t):null,null)}const D_=pe.createElement(P_,null);class I_ extends pe.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return this.state.error!==void 0?pe.createElement(Rr.Provider,{value:this.props.routeContext},pe.createElement(Sg.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function N_(r){let{routeContext:e,match:t,children:s}=r,o=pe.useContext(Fd);return o&&o.static&&o.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(o.staticContext._deepestRenderedBoundaryId=t.route.id),pe.createElement(Rr.Provider,{value:e},s)}function U_(r,e,t,s){var o;if(e===void 0&&(e=[]),t===void 0&&(t=null),s===void 0&&(s=null),r==null){var l;if(!t)return null;if(t.errors)r=t.matches;else if((l=s)!=null&&l.v7_partialHydration&&e.length===0&&!t.initialized&&t.matches.length>0)r=t.matches;else return null}let u=r,d=(o=t)==null?void 0:o.errors;if(d!=null){let m=u.findIndex(g=>g.route.id&&d?.[g.route.id]!==void 0);m>=0||Xt(!1),u=u.slice(0,Math.min(u.length,m+1))}let f=!1,h=-1;if(t&&s&&s.v7_partialHydration)for(let m=0;m<u.length;m++){let g=u[m];if((g.route.HydrateFallback||g.route.hydrateFallbackElement)&&(h=m),g.route.id){let{loaderData:_,errors:S}=t,T=g.route.loader&&_[g.route.id]===void 0&&(!S||S[g.route.id]===void 0);if(g.route.lazy||T){f=!0,h>=0?u=u.slice(0,h+1):u=[u[0]];break}}}return u.reduceRight((m,g,_)=>{let S,T=!1,M=null,x=null;t&&(S=d&&g.route.id?d[g.route.id]:void 0,M=g.route.errorElement||D_,f&&(h<0&&_===0?(H_("route-fallback"),T=!0,x=null):h===_&&(T=!0,x=g.route.hydrateFallbackElement||null)));let y=e.concat(u.slice(0,_+1)),w=()=>{let b;return S?b=M:T?b=x:g.route.Component?b=pe.createElement(g.route.Component,null):g.route.element?b=g.route.element:b=m,pe.createElement(N_,{match:g,routeContext:{outlet:m,matches:y,isDataRoute:t!=null},children:b})};return t&&(g.route.ErrorBoundary||g.route.errorElement||_===0)?pe.createElement(I_,{location:t.location,revalidation:t.revalidation,component:M,error:S,children:w(),routeContext:{outlet:null,matches:y,isDataRoute:!0}}):w()},null)}var Tg=(function(r){return r.UseBlocker="useBlocker",r.UseRevalidator="useRevalidator",r.UseNavigateStable="useNavigate",r})(Tg||{}),wg=(function(r){return r.UseBlocker="useBlocker",r.UseLoaderData="useLoaderData",r.UseActionData="useActionData",r.UseRouteError="useRouteError",r.UseNavigation="useNavigation",r.UseRouteLoaderData="useRouteLoaderData",r.UseMatches="useMatches",r.UseRevalidator="useRevalidator",r.UseNavigateStable="useNavigate",r.UseRouteId="useRouteId",r})(wg||{});function O_(r){let e=pe.useContext(Fd);return e||Xt(!1),e}function F_(r){let e=pe.useContext(C_);return e||Xt(!1),e}function k_(r){let e=pe.useContext(Rr);return e||Xt(!1),e}function Ag(r){let e=k_(),t=e.matches[e.matches.length-1];return t.route.id||Xt(!1),t.route.id}function B_(){var r;let e=pe.useContext(Sg),t=F_(),s=Ag();return e!==void 0?e:(r=t.errors)==null?void 0:r[s]}function z_(){let{router:r}=O_(Tg.UseNavigateStable),e=Ag(wg.UseNavigateStable),t=pe.useRef(!1);return Mg(()=>{t.current=!0}),pe.useCallback(function(o,l){l===void 0&&(l={}),t.current&&(typeof o=="number"?r.navigate(o):r.navigate(o,Qo({fromRouteId:e},l)))},[r,e])}const Pp={};function H_(r,e,t){Pp[r]||(Pp[r]=!0)}function G_(r,e){r?.v7_startTransition,r?.v7_relativeSplatPath}function V_(r){let{to:e,replace:t,state:s,relative:o}=r;ra()||Xt(!1);let{future:l,static:u}=pe.useContext(ia),{matches:d}=pe.useContext(Rr),{pathname:f}=kd(),h=sa(),m=xg(e,_g(d,l.v7_relativeSplatPath),f,o==="path"),g=JSON.stringify(m);return pe.useEffect(()=>h(JSON.parse(g),{replace:t,state:s,relative:o}),[h,g,o,t,s]),null}function qs(r){Xt(!1)}function W_(r){let{basename:e="/",children:t=null,location:s,navigationType:o=Mr.Pop,navigator:l,static:u=!1,future:d}=r;ra()&&Xt(!1);let f=e.replace(/^\/*/,"/"),h=pe.useMemo(()=>({basename:f,navigator:l,static:u,future:Qo({v7_relativeSplatPath:!1},d)}),[f,d,l,u]);typeof s=="string"&&(s=so(s));let{pathname:m="/",search:g="",hash:_="",state:S=null,key:T="default"}=s,M=pe.useMemo(()=>{let x=vg(m,f);return x==null?null:{location:{pathname:x,search:g,hash:_,state:S,key:T},navigationType:o}},[f,m,g,_,S,T,o]);return M==null?null:pe.createElement(ia.Provider,{value:h},pe.createElement(Zl.Provider,{children:t,value:M}))}function j_(r){let{children:e,location:t}=r;return R_(wd(e),t)}new Promise(()=>{});function wd(r,e){e===void 0&&(e=[]);let t=[];return pe.Children.forEach(r,(s,o)=>{if(!pe.isValidElement(s))return;let l=[...e,o];if(s.type===pe.Fragment){t.push.apply(t,wd(s.props.children,l));return}s.type!==qs&&Xt(!1),!s.props.index||!s.props.children||Xt(!1);let u={id:s.props.id||l.join("-"),caseSensitive:s.props.caseSensitive,element:s.props.element,Component:s.props.Component,index:s.props.index,path:s.props.path,loader:s.props.loader,action:s.props.action,errorElement:s.props.errorElement,ErrorBoundary:s.props.ErrorBoundary,hasErrorBoundary:s.props.ErrorBoundary!=null||s.props.errorElement!=null,shouldRevalidate:s.props.shouldRevalidate,handle:s.props.handle,lazy:s.props.lazy};s.props.children&&(u.children=wd(s.props.children,l)),t.push(u)}),t}const X_="6";try{window.__reactRouterVersion=X_}catch{}const Y_="startTransition",Dp=Yv[Y_];function q_(r){let{basename:e,children:t,future:s,window:o}=r,l=pe.useRef();l.current==null&&(l.current=e_({window:o,v5Compat:!0}));let u=l.current,[d,f]=pe.useState({action:u.action,location:u.location}),{v7_startTransition:h}=s||{},m=pe.useCallback(g=>{h&&Dp?Dp(()=>f(g)):f(g)},[f,h]);return pe.useLayoutEffect(()=>u.listen(m),[u,m]),pe.useEffect(()=>G_(s),[s]),pe.createElement(W_,{basename:e,children:t,location:d.location,navigationType:d.action,navigator:u,future:s})}var Ip;(function(r){r.UseScrollRestoration="useScrollRestoration",r.UseSubmit="useSubmit",r.UseSubmitFetcher="useSubmitFetcher",r.UseFetcher="useFetcher",r.useViewTransitionState="useViewTransitionState"})(Ip||(Ip={}));var Np;(function(r){r.UseFetcher="useFetcher",r.UseFetchers="useFetchers",r.UseScrollRestoration="useScrollRestoration"})(Np||(Np={}));const $_="worldwright-db",K_=3,Jo="worlds",ea="index";let Hu=null;function Ql(){return Hu||(Hu=new Promise((r,e)=>{const t=indexedDB.open($_,K_);t.onupgradeneeded=()=>{const o=t.result;o.objectStoreNames.contains(Jo)||o.createObjectStore(Jo,{keyPath:"metadata.id"}),o.objectStoreNames.contains(ea)||o.createObjectStore(ea,{keyPath:"id"})},t.onblocked=()=>{e(new Error("Database upgrade blocked. Please close other WorldWright tabs and try again."))};const s=setTimeout(()=>{e(new Error("Opening database timed out. Try reloading or resetting storage."))},5e3);t.onerror=()=>{clearTimeout(s),e(t.error)},t.onsuccess=()=>{clearTimeout(s),r(t.result)}})),Hu}function Js(r,e,t,s){return new Promise((o,l)=>{const u=r.transaction(e,t),d=u.objectStore(e),f=s(d);f.onsuccess=()=>o(f.result),f.onerror=()=>l(f.error),u.onerror=()=>l(u.error)})}function Z_(r){const e=new Date().toISOString(),t=r.metadata.createdAt||e;return{id:r.metadata.id,name:r.metadata.name||"Untitled World",seed:r.metadata.seed||"",createdAt:t,updatedAt:e,version:r.metadata.version||"unknown",styleMode:r.metadata.styleMode||"unknown"}}async function Q_(){const r=await Ql();return Js(r,ea,"readonly",e=>e.getAll())}async function Gu(r){const e=await Ql();return Js(e,Jo,"readonly",t=>t.get(r))}async function Cg(r){const e=await Ql(),t=Z_(r);return r.metadata.updatedAt=t.updatedAt,await Js(e,Jo,"readwrite",s=>s.put(r)),await Js(e,ea,"readwrite",s=>s.put(t)),r}async function J_(r){const e=await Ql();await Js(e,Jo,"readwrite",t=>t.delete(r)),await Js(e,ea,"readwrite",t=>t.delete(r))}function Up(r){try{return new Date(r).toLocaleString()}catch{return String(r)}}function ex(){const r=sa(),[e,t]=pe.useState([]),[s,o]=pe.useState(!0),[l,u]=pe.useState(null);async function d(){try{o(!0),u(null);const h=await Q_();t(h)}catch(h){u(h?.message||String(h))}finally{o(!1)}}pe.useEffect(()=>{d()},[]);const f=async h=>{confirm("Delete this world? This cannot be undone.")&&(await J_(h),await d())};return O.jsxs("div",{style:{padding:24},children:[O.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[O.jsx("h1",{children:"WorldWright"}),O.jsx("button",{onClick:()=>r("/generate"),style:{padding:"10px 16px",borderRadius:12,fontWeight:900,background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",color:"white",border:"none",cursor:"pointer"},children:"+ Generate New World"})]}),O.jsx("div",{style:{marginTop:18},children:s?O.jsx("div",{style:{padding:12},children:"Loading…"}):l?O.jsx("div",{style:{padding:12,color:"#c33"},children:l}):e.length===0?O.jsxs("div",{style:{marginTop:16,padding:18,borderRadius:16,border:"1px solid rgba(0,0,0,0.12)",opacity:.9},children:[O.jsx("div",{style:{fontWeight:900,fontSize:16},children:"No worlds yet."}),O.jsx("div",{style:{marginTop:8,opacity:.8},children:"Create your first world in Generate Mode."}),O.jsx("div",{style:{marginTop:14},children:O.jsx("button",{onClick:()=>r("/generate"),style:{padding:"10px 12px",borderRadius:12,fontWeight:900},children:"Go to Generate"})})]}):O.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))",gap:12},children:e.map(h=>{const m=(h.name||"").trim()||"Untitled World";return O.jsxs("div",{style:{borderRadius:16,border:"1px solid rgba(0,0,0,0.12)",padding:14,display:"flex",flexDirection:"column",gap:10},children:[O.jsx("div",{style:{display:"flex",justifyContent:"space-between",gap:10},children:O.jsxs("div",{style:{minWidth:0},children:[O.jsx("div",{style:{fontWeight:950,fontSize:16,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:m}),O.jsxs("div",{style:{opacity:.7,fontSize:12,marginTop:3},children:[h.styleMode," • ",h.version]})]})}),O.jsxs("div",{style:{opacity:.8,fontSize:12,lineHeight:1.35},children:[O.jsxs("div",{children:[O.jsx("b",{children:"Updated:"})," ",Up(h.updatedAt)]}),O.jsxs("div",{children:[O.jsx("b",{children:"Created:"})," ",Up(h.createdAt)]})]}),O.jsxs("div",{style:{display:"flex",gap:8,marginTop:8},children:[O.jsx("button",{onClick:()=>r(`/create/${h.id}`),style:{flex:1,padding:"10px 10px",borderRadius:12,fontWeight:900},children:"Open (Create)"}),O.jsx("button",{onClick:()=>r(`/sim/${h.id}`),style:{padding:"10px 10px",borderRadius:12,fontWeight:900},children:"Sim"})]}),O.jsx("div",{style:{opacity:.55,fontSize:11,wordBreak:"break-all",marginTop:8},children:h.id}),O.jsx("div",{style:{display:"flex",gap:8,marginTop:10},children:O.jsx("button",{onClick:()=>f(h.id),children:"Delete"})})]},h.id)})})})]})}function tx({groups:r}){return O.jsx("div",{style:{padding:12,display:"flex",flexDirection:"column",gap:14},children:r.map(e=>O.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[O.jsx("div",{style:{fontSize:12,opacity:.8,letterSpacing:.5},children:e.title}),O.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:e.tools.map(t=>O.jsx("button",{onClick:t.onClick,disabled:t.disabled,style:{textAlign:"left",padding:"10px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:t.active?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.92)",opacity:t.disabled?.45:1,cursor:t.disabled?"not-allowed":"pointer"},children:t.label},t.id))})]},e.id))})}function nx({tools:r}){return O.jsx("div",{style:{padding:12,display:"flex",flexDirection:"column",gap:10},children:r.map(e=>O.jsx("button",{onClick:e.onClick,disabled:e.disabled,style:{textAlign:"left",padding:"10px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:e.active?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.92)",opacity:e.disabled?.45:1,cursor:e.disabled?"not-allowed":"pointer"},children:e.label},e.id))})}function ix(r){const{onGoHome:e,worldName:t,mode:s,onModeToggle:o,viewMode:l,onViewModeChange:u,isDirty:d}=r,f=!!o&&(s==="create"||s==="sim"),h=!!u&&s==="create";return O.jsxs("div",{style:{height:54,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 14px",borderBottom:"1px solid rgba(255,255,255,0.10)",background:"rgba(10,12,18,0.96)",color:"rgba(255,255,255,0.92)",boxSizing:"border-box"},children:[O.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[O.jsx("button",{onClick:e,style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Home"}),O.jsxs("div",{style:{display:"flex",flexDirection:"column",lineHeight:1.1},children:[O.jsxs("div",{style:{fontSize:14,fontWeight:650},children:[t||(s?s.toUpperCase():"WORLDWRIGHT"),d?" *":""]}),O.jsx("div",{style:{fontSize:12,opacity:.75},children:d?"Unsaved changes":"Saved"})]})]}),O.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[f&&O.jsx("button",{onClick:o,style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:s==="create"?"Go to Sim":"Go to Create"}),h&&O.jsxs("div",{style:{display:"flex",gap:8},children:[O.jsx("button",{onClick:()=>u?.("GLOBE"),style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:l==="GLOBE"?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Globe"}),O.jsx("button",{onClick:()=>u?.("MAP"),style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:l==="MAP"?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Map"})]}),O.jsx("button",{disabled:!0,style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:"rgba(255,255,255,0.03)",color:"rgba(255,255,255,0.65)",cursor:"not-allowed"},children:"Export"}),O.jsx("button",{disabled:!0,style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:"rgba(255,255,255,0.03)",color:"rgba(255,255,255,0.65)",cursor:"not-allowed"},children:"Settings"})]})]})}function ns(r){const{rightPanel:e,children:t,onGoHome:s,worldName:o,mode:l,onModeToggle:u,viewMode:d,onViewModeChange:f,isDirty:h,toolGroups:m,leftTools:g}=r,_=m&&m.length>0||g&&g.length>0;return O.jsxs("div",{style:{width:"100vw",height:"100vh",background:"rgb(10,12,18)",overflow:"hidden"},children:[O.jsx(ix,{onGoHome:s,worldName:o,mode:l,onModeToggle:u,viewMode:d,onViewModeChange:f,isDirty:h}),O.jsxs("div",{style:{height:"calc(100vh - 54px)",display:"grid",gridTemplateColumns:_?"260px 1fr 320px":"1fr 320px"},children:[_&&O.jsx("div",{style:{borderRight:"1px solid rgba(255,255,255,0.10)",background:"rgba(255,255,255,0.02)",overflow:"auto"},children:m&&m.length>0?O.jsx(tx,{groups:m}):O.jsx(nx,{tools:g||[]})}),O.jsx("div",{style:{position:"relative",overflow:"hidden"},children:t}),O.jsx("div",{style:{borderLeft:"1px solid rgba(255,255,255,0.10)",background:"rgba(255,255,255,0.02)",overflow:"auto"},children:e})]})]})}var Ti;(function(r){r.OCEANIC="OCEANIC",r.CONTINENTAL="CONTINENTAL"})(Ti||(Ti={}));var ii;(function(r){r.NONE="NONE",r.DIVERGENT="DIVERGENT",r.CONVERGENT="CONVERGENT",r.TRANSFORM="TRANSFORM"})(ii||(ii={}));var ta;(function(r){r.ROCK="ROCK",r.VOLCANIC="VOLCANIC",r.SAND="SAND",r.ALLUVIAL="ALLUVIAL",r.PEAT="PEAT",r.SALT="SALT",r.PERMAFROST="PERMAFROST"})(ta||(ta={}));var Op;(function(r){r.TRENCH="TRENCH",r.ABYSSAL="ABYSSAL",r.RIDGE="RIDGE",r.SHELF="SHELF",r.SLOPE="SLOPE"})(Op||(Op={}));function rx(r){return{index:r,baseHeight:0,editHeightDelta:0,simHeightDelta:0,isWater:!1,flowDirection:null,flowAccumulation:0,basinId:null,temperature:.5,rainfall:.5,climateCellId:0,prevailingWind:[0,0],plateId:0,plateType:Ti.CONTINENTAL,boundaryType:ii.NONE,upliftRate:0,surfaceAge:.5,volcanicActivity:0,baseBiomeId:0,editBiomeId:0,surfaceType:ta.ROCK,snowCover:0,oceanDepthClass:null}}function On(r,e=["LOADED"]){sx(r),ax(r),lx(r),ux(r),ox(r),cx(r)}function sx(r){const e=r.seaLevel;for(const t of r.cells){const s=t.baseHeight+t.editHeightDelta+t.simHeightDelta;t.isWater=s<e}}function ox(r){for(const e of r.cells){const t=e.baseHeight+e.editHeightDelta+e.simHeightDelta,s=Xi(1-e.temperature),o=Xi((t-.15)*1.25),l=Xi(s*.85+o*.35);e.snowCover=l}}function ax(r){const e=r.gridWidth,t=r.gridHeight,s=r.cells,o=r.seaLevel;function l(u,d,f=4){let h=0,m=0;for(let g=-f;g<=f;g++){const _=u+g;if(!(_<0||_>=t))for(let S=-f;S<=f;S++){const T=((d+S)%e+e)%e;m++;const M=_*e+T,x=s[M];x&&x.isWater&&h++}}return m>0?h/m:0}for(let u=0;u<t;u++){const d=90-u/t*180,f=1-Math.abs(d)/90;for(let h=0;h<e;h++){const m=u*e+h,g=s[m];if(!g)continue;const _=g.baseHeight+g.editHeightDelta+g.simHeightDelta,S=Xi((_-o+.5)*.5),T=l(u,h,4),M=Xi(f*.9+(1-S)*.05+T*.05);let x=Xi(T*.6+f*.2+(M>.6?.05:0));x=Xi(x*(1-S*.5)),g.temperature=M,g.rainfall=x}}}function lx(r){const e=r.gridWidth,t=r.gridHeight,s=r.cells;function o(f){const h=s[f];return h?h.baseHeight+h.editHeightDelta+h.simHeightDelta:0}for(const f of s)f.flowDirection===void 0&&(f.flowDirection=null),typeof f.flowAccumulation!="number"&&(f.flowAccumulation=1),f.basinId===void 0&&(f.basinId=null);const l=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];for(let f=0;f<t;f++)for(let h=0;h<e;h++){const m=f*e+h,g=s[m];if(!g)continue;const _=o(m);let S=null,T=_;for(const[M,x]of l){const y=f+M;if(y<0||y>=t)continue;const w=((h+x)%e+e)%e,b=y*e+w,P=o(b);P<T-1e-6&&(T=P,S=b)}g.flowDirection=S}const u=s.map((f,h)=>h).sort((f,h)=>o(h)-o(f));for(const f of u){const h=s[f];if(!h)continue;const m=h.flowDirection;if(m!=null&&m>=0&&m<s.length){const g=s[m];g&&(g.flowAccumulation+=h.flowAccumulation)}}function d(f){let h=f;const m=new Set;for(let g=0;g<1e3;g++){if(m.has(h))return h;m.add(h);const _=s[h];if(!_||_.isWater)return h;const S=_.flowDirection;if(S==null)return h;h=S}return h}for(let f=0;f<s.length;f++)s[f].basinId=d(f)}function cx(r){r.gridWidth,r.gridHeight;const e=r.cells,t=r.seaLevel;for(let s=0;s<e.length;s++){const o=e[s];if(!o)continue;if(o.isWater){o.baseBiomeId=0;continue}if((o.baseHeight+o.editHeightDelta+o.simHeightDelta-t)*.25>.6){o.baseBiomeId=6;continue}const d=Xi(o.temperature),f=Xi(o.rainfall);d<.2?o.baseBiomeId=1:f<.15?o.baseBiomeId=4:d>.6&&f>.6?o.baseBiomeId=5:o.baseBiomeId=3}}function Xi(r){return r<0?0:r>1?1:r}function ux(r){const e=r.cells,t=r.gridWidth,s=r.gridHeight,o=t*s,l=Math.max(20,Math.round(o/4e3)),u=[],d=new Set;let f=1;for(let h=0;h<e.length;h++){const m=e[h];if(!m||m.flowAccumulation<l||d.has(h))continue;const g=[];let _=h;const S=new Set;for(let T=0;T<e.length&&!S.has(_);T++){S.add(_),g.push(_),d.add(_);const M=e[_];if(!M||M.isWater)break;const x=M.flowDirection;if(x==null)break;if(d.has(x)){g.push(x),_=x;break}_=x}if(g.length>=2){const T=g[g.length-1];u.push({id:f++,sourceCellIndex:h,mouthCellIndex:T,path:g})}}r.rivers=u.map(h=>({id:h.id,sourceCellIndex:h.sourceCellIndex,mouthCellIndex:h.mouthCellIndex,path:h.path}))}function bg(r,e=6){const{cells:t,gridWidth:s,gridHeight:o,plates:l}=r,u=[],d=new Array(t.length).fill(-1),f=new Set;for(const M of t)!M.isWater&&M.plateType==="CONTINENTAL"&&f.add(M.plateId);const h=t.filter(M=>!M.isWater);if(h.length===0)return u;const m=Array.from(f),g=[];for(let M=0;M<e;M++){const x=m[M%m.length],y=h.filter(w=>w.plateId===x);if(y.length>0){const w=y[Math.floor(M/e*y.length)];g.push({idx:w.index,countryId:M,plateId:x}),d[w.index]=M}}let _=!0,S=0;const T=s*o;for(;_&&S<T;){_=!1,S++;for(let M=0;M<t.length;M++)if(!t[M].isWater&&d[M]!==-1){const x=Math.floor(M/s),y=M%s,w=d[M],b=g.find(z=>z.countryId===w)?.plateId,P=[[x-1,y],[x+1,y],[x,(y-1+s)%s],[x,(y+1)%s]];for(const[z,k]of P){if(z<0||z>=o)continue;const N=z*s+k;N<0||N>=t.length||t[N].isWater||d[N]===-1&&t[N].plateId===b&&Math.abs(t[M].baseHeight+t[M].editHeightDelta-(t[N].baseHeight+t[N].editHeightDelta))<.35&&(d[N]=d[M],_=!0)}}}for(let M=0;M<e;M++){const x=t.filter((b,P)=>d[P]===M);if(x.length===0)continue;for(let b=0;b<d.length;b++)d[b]===M&&(t[b].countryId=`country_${M}`);const y=dx(x,s,o),w=M/e*360;u.push({id:`country_${M}`,name:fx(M),polygons:[y],color:`hsl(${w}, 65%, 45%)`})}return u}function dx(r,e,t){if(r.length===0)return[];const s=r.map(g=>g.index),o=s.map(g=>Math.floor(g/e)),l=s.map(g=>g%e),u=Math.min(...o),d=Math.max(...o),f=Math.min(...l),h=Math.max(...l),m=[];return m.push({lat:90-u/t*180,lon:f/e*360-180}),m.push({lat:90-u/t*180,lon:(h+1)/e*360-180}),m.push({lat:90-(d+1)/t*180,lon:(h+1)/e*360-180}),m.push({lat:90-(d+1)/t*180,lon:f/e*360-180}),m}function fx(r){const e=["Kingdom","Republic","Empire","Dominion","Territory","Realm","Union"],t=["of the North","of the South","of the East","of the West","the Great","the Ancient","of Fire","of Stone","of the Mountains","of the Plains"],s=e[r%e.length],o=t[r*7%t.length];return`${s} ${o}`}function hx(r){const e=_l(r.width,32,1024),t=_l(r.height,16,512),s=gx(r.seed),o=mx(s),l=new Date().toISOString(),u=_n(-.1,.1,Nn(r.seaLevel/100)),d=_n(.25,1.35,Nn(r.plateActivity/100)),f=_n(.15,.55,Nn(r.planetAge/100)),h=_n(.05,.35,Nn(r.climateVar/100)),m=_n(.25,1,Nn(r.axisTilt/100)),g=new Array(e*t);for(let V=0;V<g.length;V++)g[V]=rx(V);const _=_l(r.continentCount,1,12),S=_+Math.floor(_*1.2),T=[];for(let V=0;V<S;V++)T.push({id:V,type:V<_?Ti.CONTINENTAL:Ti.OCEANIC,velocity:[_n(-1,1,o()),_n(-1,1,o())]});console.log("[WorldGenerator] Using QUANTILE-BASED continent generation (v2)"),console.log("[WorldGenerator] Target land fraction:",1-r.seaLevel/100);const M=Math.floor(e/4),x=Math.floor(t/4),y=new Float32Array(M*x);for(let V=0;V<x;V++)for(let $=0;$<M;$++){const Q=V*M+$,U=V/(x-1),Y=$/(M-1),H=hi(Y*.6,U*.5,o,3)*.5,I=hi(Y*1.2+.3,U*.9+.7,o,2),Z=Math.floor(Nn((I+1)*.5)*S)%S<_?.6:-.6;y[Q]=Z+H}const w=new Float32Array(M*x);for(let V=0;V<6;V++){for(let $=0;$<y.length;$++)w[$]=y[$];for(let $=1;$<x-1;$++)for(let Q=0;Q<M;Q++){const U=$*M+Q;let Y=0,H=0;for(let I=-1;I<=1;I++)for(let G=-1;G<=1;G++){const j=$+I,Z=(Q+G+M)%M;j>=0&&j<x&&(Y+=w[j*M+Z],H++)}y[U]=Y/H}}const b=1-r.seaLevel/100,P=Array.from(y).sort((V,$)=>V-$),z=Math.floor(P.length*(1-b)),k=P[z];for(let V=0;V<t;V++)for(let $=0;$<e;$++){const Q=V*e+$,U=g[Q],Y=V/(t-1),H=$/(e-1),I=Y*(x-1),G=H*(M-1),j=Math.floor(I),Z=Math.floor(G),fe=Math.min(j+1,x-1),xe=(Z+1)%M,Ee=I-j,Te=G-Z,Ne=y[j*M+Z],he=y[j*M+xe],ve=y[fe*M+Z],K=y[fe*M+xe],nt=Ne*(1-Te)+he*Te,Pe=ve*(1-Te)+K*Te,Ve=nt*(1-Ee)+Pe*Ee,Ue=Ve>k,$e=hi(H*1.2+.3,Y*.9+.7,o,2),Xe=Math.floor(Nn(($e+1)*.5)*S)%S;if(U.plateId=Xe,U.plateType=Ue?Ti.CONTINENTAL:Ti.OCEANIC,Ue){const L=(Ve-k)/(1-k);U.baseHeight=.2+L*.6}else{const L=(k-Ve)/(k+1);U.baseHeight=-.3-L*.5}U.boundaryType=ii.NONE}const N=new Set;for(let V=0;V<t;V++)for(let $=0;$<e;$++){const Q=V*e+$;if(g[Q].baseHeight>=0)for(let Y=-1;Y<=1;Y++){for(let H=-1;H<=1;H++){if(Y===0&&H===0)continue;const I=V+Y,G=($+H+e)%e;if(I>=0&&I<t){const j=I*e+G;if(g[j]&&g[j].baseHeight<0){N.add(Q);break}}}if(N.has(Q))break}}for(let V=0;V<t;V++)for(let $=0;$<e;$++){const Q=V*e+$,U=g[Q],Y=V/(t-1),H=$/(e-1);if(U.baseHeight>0){const $e=N.has(Q),Xe=hi(H*2.5,Y*2,o,2)*.15,L=$e?8:5,C=$e?.18:.1,te=hi(H*L,Y*L*.8,o,3)*C,_e=$e?.05:.08,ge=hi(H*8,Y*6.5,o,2)*_e*d,me=$e?-.03:0,Le=1-f*.4;U.baseHeight+=(Xe+te+ge+me)*Le}U.baseHeight=Wo(U.baseHeight,-1.5,1.5);const I=Math.min(Y,1-Y);if(I<.15){const $e=1-I/.15,Xe=-.4+(Math.random()*.1-.05);U.baseHeight=_n(U.baseHeight,Xe,$e*.8)}U.boundaryType=ii.NONE;const G=Y*2-1,j=_n(.65,1.25,m),Z=Math.pow(1-Math.abs(G),1/j),fe=hi(H*4,Y*4,o,2)*h,xe=r.temperatureOffset/100*.6;let Ee=0;r.styleMode==="ALIEN"?Ee=hi(H*8,Y*6,o,2)*.15:r.styleMode==="FANTASY"&&(Ee=.08+hi(H*3,Y*2.5,o,2)*.12),U.temperature=Nn(Z*.75+.05+fe*.15+Ee+xe);const Te=Math.abs(G),Ne=Math.exp(-Math.pow(Te*2.5,2)),he=Math.exp(-Math.pow((Te-.35)*3.5,2)),ve=Te>.7?(Te-.7)*.4:0,K=_n(.5,1.5,r.moistureLevel/100);let nt=(Ne*.6-he*.25+ve+.25)*K;const Pe=hi(H*5,Y*3,o,2)*h;let Ve=0;r.styleMode==="ALIEN"?Ve=hi(H*10,Y*7,o,3)*.2:r.styleMode==="FANTASY"&&(Ve=.1),U.rainfall=Nn(nt+Pe*.3+Ve);const Ue=px(U.temperature,U.rainfall);U.baseBiomeId=Ue,U.editBiomeId=Ue,U.surfaceType=U.plateType===Ti.OCEANIC?ta.ALLUVIAL:ta.ROCK,U.flowDirection=null,U.flowAccumulation=0,U.basinId=null,U.upliftRate=0,U.surfaceAge=Nn(.35+o()*.5),U.volcanicActivity=0}for(let V=0;V<t;V++)for(let $=0;$<e;$++){const Q=V*e+$,U=g[Q],Y=U.plateId,H=(V-1+t)%t,I=(V+1)%t,G=($-1+e)%e,j=($+1)%e,Z=H*e+$,fe=I*e+$,xe=V*e+G,Ee=V*e+j,Te=new Set;if(Te.add(Y),Te.add(g[Z].plateId),Te.add(g[fe].plateId),Te.add(g[xe].plateId),Te.add(g[Ee].plateId),Te.size>1){const Ne=[g[Z].plateType,g[fe].plateType,g[xe].plateType,g[Ee].plateType],he=Ne.some(nt=>nt===Ti.OCEANIC),ve=Ne.some(nt=>nt===Ti.CONTINENTAL);he&&ve?U.boundaryType=ii.CONVERGENT:U.boundaryType=o()<.5?ii.DIVERGENT:ii.TRANSFORM;const K=U.boundaryType===ii.CONVERGENT?1.2:U.boundaryType===ii.DIVERGENT?.6:.4;U.upliftRate=Wo(d*.02*K*(.6+o()*.8),0,5),U.volcanicActivity=U.boundaryType===ii.CONVERGENT&&he?Wo(o()*1.2,0,3):o()*.2}else U.boundaryType=ii.NONE,U.upliftRate=Wo(.005*(1-f)*(.5+o()*.8),0,.5),U.volcanicActivity=o()*.05}const oe=Nn(r.planetAge/100),A=Nn(r.erosionIntensity/100),R=(oe+A)/2,ie=Math.max(1,Math.round(_n(1,8,R))),ue=_n(.15,.7,R);for(let V=0;V<ie;V++){const $=new Array(g.length);for(let Q=0;Q<t;Q++)for(let U=0;U<e;U++){const Y=Q*e+U,H=g[Y];if(!H)continue;let I=0,G=0;const j=Q-1,Z=Q+1,fe=(U-1+e)%e,xe=(U+1)%e;j>=0&&(I+=g[j*e+U].baseHeight,G++),Z<t&&(I+=g[Z*e+U].baseHeight,G++),I+=g[Q*e+fe].baseHeight,G++,I+=g[Q*e+xe].baseHeight,G++;const Ee=G>0?I/G:H.baseHeight,Te=_n(H.baseHeight,Ee,ue),Ne=H.upliftRate*.005,he=(o()-.5)*.02*(1-oe);$[Y]=Wo(H.baseHeight+Ne+he+(Te-H.baseHeight)*.9,-2,2)}for(let Q=0;Q<g.length;Q++)g[Q].baseHeight=$[Q],g[Q].surfaceAge=Nn(.2+oe*.7+(o()-.5)*.1)}const de=[];for(let V=0;V<t;V++)for(let $=0;$<e;$++){const Q=V*e+$,U=g[Q];if(!U||U.baseHeight<u)continue;let Y=null,H=U.baseHeight;for(let j=-1;j<=1;j++){const Z=V+j;if(!(Z<0||Z>=t))for(let fe=-1;fe<=1;fe++){if(j===0&&fe===0)continue;const xe=($+fe+e)%e,Ee=Z*e+xe,Te=g[Ee].baseHeight;Te<H-1e-6&&(H=Te,Y=Ee)}}if(Y!=null&&o()<.06){const j=_l(V+Math.floor((o()-.5)*3),0,t-1),Z=(($+Math.floor((o()-.5)*3))%e+e)%e,fe=j*e+Z;fe!==Q&&(Y=fe)}Y!=null&&(U.flowDirection=Y);const I=Nn(U.rainfall||.2),G=Math.max(0,(U.baseHeight-H)*2);U.flowAccumulation=Math.max(1,Math.floor(1+I*8+G*4+Math.floor(o()*3)))}const B={gridWidth:e,gridHeight:t,seaLevel:u,cells:g,plates:T,rivers:de,countries:[],cultures:[],cultureRegions:[],cities:[],locations:[],stickers:[],metadata:{id:`w_${r.styleMode}_${e}x${t}_${s}`,name:"Untitled World",seed:String(r.seed),schemaVersion:"v3",version:"v1.3",styleMode:r.styleMode,gridWidth:e,gridHeight:t,createdAt:l,updatedAt:l,seaLevel:u},parameters:{...r,seaLevel:r.seaLevel}};return On(B,["GENERATED"]),B.countries=bg(B,_),B}function px(r,e){return r<.2?e<.35?1:2:r<.35?e<.35?3:4:r<.6?e<.3?5:e<.6?6:7:e<.25?8:e<.55?9:10}function Nn(r){return r<0?0:r>1?1:r}function Wo(r,e,t){return r<e?e:r>t?t:r}function _l(r,e,t){return Math.max(e,Math.min(t,Math.floor(r)))}function _n(r,e,t){return r+(e-r)*t}function mx(r){return function(){let e=r+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function gx(r){if(typeof r=="number")return r>>>0;const e=String(r);let t=2166136261;for(let s=0;s<e.length;s++)t^=e.charCodeAt(s),t=Math.imul(t,16777619);return t>>>0&4294967295}function hi(r,e,t,s){let o=1,l=1,u=0,d=0;for(let f=0;f<s;f++)u+=o*vx(r*l,e*l,t),d+=o,o*=.5,l*=2;return u/Math.max(1e-9,d)*2-1}function vx(r,e,t){const s=Math.floor(r),o=Math.floor(e),l=r-s,u=e-o,d=M(s,o),f=M(s+1,o),h=M(s,o+1),m=M(s+1,o+1),g=Fp(l),_=Fp(u),S=_n(d,f,g),T=_n(h,m,g);return _n(S,T,_);function M(x,y){let w=x*374761393+y*668265263;const b=Math.floor(t()*4294967295);return w=(w^b)>>>0,w=(w^w>>>13)*1274126177,w=w^w>>>16,(w>>>0)/4294967295}}function Fp(r){return r*r*(3-2*r)}function Rg(r,e){switch(e.type){case"TERRAIN_STROKE":{const{tool:t,center:s,radius:o,strength:l}=e;if(!r||!Array.isArray(r.cells))return;const u=r.gridWidth,d=r.gridHeight,f=r.cells,h=Math.max(1,Math.floor(Number.isFinite(o)?o:1)),m=Number.isFinite(l)&&l>=0?l:0;let g=0,_=0;if(t==="FLATTEN"||t==="SMOOTH"){for(let S=-h;S<=h;S++){const T=s.row+S;if(!(T<0||T>=d))for(let M=-h;M<=h;M++){if(Math.sqrt(S*S+M*M)>o)continue;const w=((s.col+M)%u+u)%u,b=T*u+w,P=f[b],z=P.baseHeight+(P.editHeightDelta||0);g+=z,_++}}_>0&&(g/=_)}for(let S=-h;S<=h;S++){const T=s.row+S;if(!(T<0||T>=d))for(let M=-h;M<=h;M++){const x=Math.sqrt(S*S+M*M);if(x>o)continue;const w=((s.col+M)%u+u)%u,b=T*u+w,P=f[b],z=(o-x)/o;if(t==="RAISE")P.editHeightDelta=(P.editHeightDelta||0)+m*z;else if(t==="LOWER")P.editHeightDelta=(P.editHeightDelta||0)-m*z;else if(t==="FLATTEN"||t==="SMOOTH"){const k=P.baseHeight+(P.editHeightDelta||0),N=(g-k)*m*z;P.editHeightDelta=(P.editHeightDelta||0)+N}}}return}case"STICKER_APPLY":_x(r,e),On(r,["STICKER_EDIT"]);return;case"ADD_CITY":xx(r,e),On(r,["TERRAIN_EDIT"]);return;case"ADD_COUNTRY":yx(r,e),On(r,["TERRAIN_EDIT"]);return;case"ADD_RIVER":Mx(r,e),On(r,["TERRAIN_EDIT"]);return;case"REMOVE_RIVER":Ex(r,e),On(r,["TERRAIN_EDIT"]);return;case"SET_LAKE_LEVEL":Tx(r,e),On(r,["TERRAIN_EDIT"]);return;default:return}}function _x(r,e){const{sticker:t}=e,{gridWidth:s,gridHeight:o,cells:l}=r,u=t.polygon.map(x=>x.lat),d=t.polygon.map(x=>x.lon),f=Math.min(...u),h=Math.max(...u),m=Math.min(...d),g=Math.max(...d),_=Math.floor((90-h)/180*o),S=Math.ceil((90-f)/180*o),T=Math.floor((m+180)/360*s),M=Math.ceil((g+180)/360*s);for(let x=_;x<=S;x++)for(let y=T;y<=M;y++){const w=(x+o)%o,b=(y+s)%s,P=w*s+b,z=l[P],k=90-w/o*180,N=b/s*360-180;Sx({lat:k,lon:N},t.polygon)&&(t.type==="BIOME"&&t.payload.biomeId!=null&&(z.editBiomeId=t.payload.biomeId),t.type==="CULTURE"&&t.payload.cultureId&&(z.cultureId=t.payload.cultureId),t.type==="HEIGHT"&&typeof t.payload.heightDelta=="number"&&(z.editHeightDelta=(z.editHeightDelta||0)+t.payload.heightDelta))}r.stickers=r.stickers??[],r.stickers.push(t)}function xx(r,e){r.cities=r.cities??[],r.cities.push(e.city)}function yx(r,e){r.countries=r.countries??[],r.countries.push(e.country)}function Sx(r,e){let t=!1;for(let s=0,o=e.length-1;s<e.length;o=s++){const l=e[s].lon,u=e[s].lat,d=e[o].lon,f=e[o].lat;u>r.lat!=f>r.lat&&r.lon<(d-l)*(r.lat-u)/(f-u+1e-12)+l&&(t=!t)}return t}function Mx(r,e){r.rivers=r.rivers??[],r.rivers.push(e.river)}function Ex(r,e){r.rivers=(r.rivers??[]).filter(t=>t.id!==e.riverId)}function Tx(r,e){const t=r.cells[e.cellIndex];if(!t)return;const s=t.basinId,o=t.baseHeight+t.editHeightDelta,l=e.newLevel-o;if(s!=null)for(const u of r.cells)u.basinId===s&&(u.editHeightDelta=(u.editHeightDelta??0)+l)}function xl(r){const e=[],t=r.gridWidth*r.gridHeight;r.cells.length!==t&&e.push(`Cell array size (${r.cells.length}) does not match grid (${r.gridWidth}×${r.gridHeight} = ${t}).`),(typeof r.seaLevel!="number"||Number.isNaN(r.seaLevel))&&e.push("World is missing global seaLevel (number)."),r.metadata||e.push("World metadata is missing."),r.metadata?.id||e.push("World metadata.id is missing."),r.metadata?.schemaVersion||e.push("World metadata.schemaVersion is missing.");for(let s=0;s<r.cells.length;s++){const o=r.cells[s];if(o.index!==s){e.push(`Cell index mismatch at i=${s} (cell.index=${o.index}).`);break}if("seaLevel"in o){e.push("Legacy field detected: cell.seaLevel exists. World should be normalized/migrated.");break}typeof o.baseHeight!="number"&&e.push(`Cell ${s} missing baseHeight.`),typeof o.editHeightDelta!="number"&&e.push(`Cell ${s} missing editHeightDelta.`),typeof o.simHeightDelta!="number"&&e.push(`Cell ${s} missing simHeightDelta.`),typeof o.isWater!="boolean"&&e.push(`Cell ${s} missing isWater.`),o.flowDirection!=null&&typeof o.flowDirection!="number"&&e.push(`Cell ${s} flowDirection invalid type.`),typeof o.flowAccumulation!="number"&&e.push(`Cell ${s} missing flowAccumulation.`),o.basinId!=null&&typeof o.basinId!="number"&&e.push(`Cell ${s} basinId invalid type.`)}for(const s of r.countries)s.id||e.push("A country is missing an id."),(!s.polygons||s.polygons.length===0)&&e.push(`Country ${s.id||"(unknown)"} has no polygons.`);for(const s of r.cities)(s.cellIndex<0||s.cellIndex>=r.cells.length)&&e.push(`City ${s.id||s.name} has invalid cellIndex=${s.cellIndex}.`);return e}function Xr(r){return JSON.parse(JSON.stringify(r))}function wx(r,e=1){const t=.01*e;for(const s of r.cities)s.population+=s.population*t;for(const s of r.cultures)if(Math.random()<.05){const o=Math.floor(Math.random()*r.cells.length);r.cells[o].isWater||(r.cells[o].cultureId=s.id)}for(const s of r.countries){const o=r.cells.map((l,u)=>({cell:l,idx:u})).filter(l=>l.cell.countryId===s.id);if(o.length>0&&Math.random()<.03){const u=o[Math.floor(Math.random()*o.length)].idx,d=Math.floor(u/r.gridWidth),f=u%r.gridWidth,h=[(d-1+r.gridHeight)%r.gridHeight*r.gridWidth+f,(d+1)%r.gridHeight*r.gridWidth+f,d*r.gridWidth+(f-1+r.gridWidth)%r.gridWidth,d*r.gridWidth+(f+1)%r.gridWidth];for(const m of h){const g=r.cells[m];if(!g.isWater&&!g.countryId){g.countryId=s.id;break}}}}}class Ax{constructor(){Object.defineProperty(this,"world",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"history",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"historyIndex",{enumerable:!0,configurable:!0,writable:!0,value:-1}),Object.defineProperty(this,"listeners",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"dirty",{enumerable:!0,configurable:!0,writable:!0,value:!1})}getWorld(){return this.world}subscribe(e){return this.listeners.push(e),e(this.world),()=>{const t=this.listeners.indexOf(e);t>=0&&this.listeners.splice(t,1)}}notify(){for(const e of this.listeners)try{e(this.world)}catch(t){console.error("WorldSession subscriber error:",t)}}isDirty(){return this.dirty}normalizeWorld(e){if(typeof e.seaLevel!="number"){const t=e.metadata?.seaLevel;typeof t=="number"?e.seaLevel=t:e.seaLevel=0}if(Array.isArray(e.cells)){const t=e.gridWidth,s=e.gridHeight;for(let l=0;l<e.cells.length;l++){const u=e.cells[l];u.index=l,u&&Object.prototype.hasOwnProperty.call(u,"seaLevel")&&delete u.seaLevel,typeof u.editHeightDelta!="number"&&(u.editHeightDelta=0),typeof u.simHeightDelta!="number"&&(u.simHeightDelta=0),typeof u.isWater!="boolean"&&(u.isWater=!1),typeof u.temperature!="number"&&(u.temperature=.5),typeof u.rainfall!="number"&&(u.rainfall=.5),typeof u.baseBiomeId!="number"&&(u.baseBiomeId=0),typeof u.editBiomeId!="number"&&(u.editBiomeId=u.baseBiomeId),typeof u.snowCover!="number"&&(u.snowCover=0)}const o=t*s;if(e.cells.length>o)e.cells.length=o;else if(e.cells.length<o)for(let l=e.cells.length;l<o;l++){const u=e.cells[e.cells.length-1];e.cells.push(JSON.parse(JSON.stringify(u)))}}}async createWorld(e){const t=hx(e);this.normalizeWorld(t),On(t,["GENERATED"]);const s=xl(t);s.length>0&&console.warn("Validation warnings on generated world:",s);try{if(await Gu(t.metadata.id)){console.warn(`Generated world id ${t.metadata.id} already exists for seed ${t.metadata.seed}; creating unique id.`);const l=t.metadata.id;let u=1,d=`${l}_dup${u}`;for(;u<1e3&&await Gu(d);)u++,d=`${l}_dup${u}`;t.metadata.id=d,t.metadata.name=`${t.metadata.name} (copy)`,t.metadata.createdAt=new Date().toISOString()}}catch(o){console.warn("Could not verify world id uniqueness due to storage error:",o)}this.world=t,this.history=[Xr(t)],this.historyIndex=0,this.dirty=!1,this.notify()}async loadWorld(e){let t=null;if(typeof e=="string"?t=await Gu(e):e&&typeof e=="object"&&(t=e),!t)throw new Error("World not found");this.normalizeWorld(t),On(t,["LOADED"]);const s=xl(t);s.length>0&&console.warn("Validation warnings on load:",s),this.world=t,this.history=[Xr(t)],this.historyIndex=0,this.dirty=!1,this.notify()}async save(){if(!this.world)throw new Error("No world loaded");const e=await Cg(this.world);return this.world.metadata=e.metadata,this.dirty=!1,this.notify(),e}apply(e){if(!this.world)return;Rg(this.world,e),On(this.world,["TERRAIN_EDIT"]);const t=xl(this.world);t.length>0&&console.warn("Validation warnings after edit:",t),this.historyIndex<this.history.length-1&&(this.history=this.history.slice(0,this.historyIndex+1)),this.history.push(Xr(this.world)),this.historyIndex=this.history.length-1,this.dirty=!0,this.notify(),this.dirty=!0,this.notify()}applyLocalEdit(e){!this.world||!e||(this.world=Xr(e),On(this.world,["TERRAIN_EDIT"]),this.dirty=!0,this.notify())}undo(){this.historyIndex>0&&(this.historyIndex--,this.world=Xr(this.history[this.historyIndex]),this.dirty=!0,this.notify())}redo(){this.historyIndex<this.history.length-1&&(this.historyIndex++,this.world=Xr(this.history[this.historyIndex]),this.dirty=!0,this.notify())}simulateTick(e=1){if(!this.world)return;wx(this.world,e),On(this.world,["SIM_STEP"]);const t=xl(this.world);t.length>0&&console.warn("Validation warnings after sim tick:",t),this.historyIndex<this.history.length-1&&(this.history=this.history.slice(0,this.historyIndex+1)),this.history.push(Xr(this.world)),this.historyIndex=this.history.length-1,this.dirty=!0,this.notify()}}const ln=new Ax;function Cx(r){const e=r.gridWidth,t=r.gridHeight,s=typeof r.seaLevel=="number"?r.seaLevel:typeof r.metadata?.seaLevel=="number"?r.metadata.seaLevel:0,o=Array.isArray(r.cells)?r.cells:[];function l(h){const m=Vu(Math.round(h[0]*255)),g=Vu(Math.round(h[1]*255)),_=Vu(Math.round(h[2]*255));return[m,g,_,255]}function u(h,m){if(h<0||h>=t||m<0||m>=e)return[1,0,1];const g=h*e+m,_=o[g];if(!_)return[1,0,1];const S=typeof _.baseHeight=="number"?_.baseHeight:typeof _.height=="number"?_.height:0,T=typeof _.editHeightDelta=="number"?_.editHeightDelta:0,M=typeof _.simHeightDelta=="number"?_.simHeightDelta:0,x=S+T+M,y=x<s,w=typeof _.rainfall=="number"?Wn(_.rainfall):.5,b=typeof _.temperature=="number"?Wn(_.temperature):.5,P=typeof _.snowCover=="number"?Wn(_.snowCover):0;let z=1;if(h>0&&m>0){const R=o[(h-1)*e+(m-1)];if(R){const ie=(typeof R.baseHeight=="number"?R.baseHeight:0)+(typeof R.editHeightDelta=="number"?R.editHeightDelta:0)+(typeof R.simHeightDelta=="number"?R.simHeightDelta:0),ue=(x-ie)*6;z=Wn(.7+ue*.3)}}if(y){const R=Wn((s-x)*2),ie=.2,ue=.55,de=.75,B=.1,V=.35,$=.6,Q=.03,U=.15,Y=.4;let H,I,G;if(R<.4){const j=R/.4;H=En(ie,B,j),I=En(ue,V,j),G=En(de,$,j)}else{const j=(R-.4)/.6;H=En(B,Q,j),I=En(V,U,j),G=En($,Y,j)}return H=Wn(H*z),I=Wn(I*z),G=Wn(G*z),[H,I,G]}const k=Wn((x-s)*3);let N=.3,oe=.3,A=.2;if(P>.6||b<.2&&w>.4||k>.75){const R=Wn(Math.max(P,k>.75?1:0));N=En(.85,.95,R),oe=En(.88,.96,R),A=En(.92,.98,R)}else if(b<.25)N=.55,oe=.58,A=.52;else if(b<.4&&w>.35)N=.2,oe=.35,A=.22;else if(w<.25||b>.65&&w<.35){const R=1-w;N=En(.7,.85,R),oe=En(.6,.7,R),A=En(.35,.45,R)}else w<.5?(N=.58,oe=.62,A=.35):b>=.4&&b<.65&&w>=.5?(N=.25,oe=.48,A=.22):b>=.65&&w>=.6?(N=.1,oe=.4,A=.15):(N=.35,oe=.5,A=.28);if(k>.3){const R=(k-.3)/.7;N=En(N,.7,R*.35),oe=En(oe,.65,R*.35),A=En(A,.6,R*.35)}return N=Wn(N*z),oe=Wn(oe*z),A=Wn(A*z),!y&&_.countryId!==void 0&&_.countryId!==null&&[h>0?o[(h-1)*e+m]?.countryId:null,h<t-1?o[(h+1)*e+m]?.countryId:null,m>0?o[h*e+(m-1)]?.countryId:null,m<e-1?o[h*e+(m+1)]?.countryId:null].some(ie=>ie!==void 0&&ie!==_.countryId)&&(N=N*.4,oe=oe*.4,A=A*.4),[N,oe,A]}function d(h,m){return l(u(h,m))}const f=bx(e,t,(h,m)=>{const g=Math.floor(Ps(h,0,e-1)),_=Math.floor(Ps(m,0,t-1));return d(_,g)});return{width:e,height:t,seaLevel:s,rgba:f,colorAt:(h,m)=>{const g=Math.floor(Ps(h,0,e-1)),_=Math.floor(Ps(m,0,t-1));return d(_,g)},minimapColorAt:(h,m)=>{const g=Math.floor(Ps(h,0,e-1)),_=Math.floor(Ps(m,0,t-1));return d(_,g)},sampleGlobeColor:h=>{const m=Number.isInteger(h)?h:-1,g=m<0?-1:Math.floor(m/e),_=m<0?-1:m%e;return d(g,_)},sampleMinimapColor:h=>{const m=Number.isInteger(h)?h:-1,g=m<0?-1:Math.floor(m/e),_=m<0?-1:m%e;return d(g,_)}}}function oo(r){return Cx(r)}function Wn(r){return Number.isFinite(r)?r<0?0:r>1?1:r:0}function Vu(r){return Number.isFinite(r)?r<0?0:r>255?255:r:0}function Ps(r,e,t){return!Number.isFinite(r)||r<e?e:r>t?t:r}function En(r,e,t){return r+(e-r)*t}function bx(r,e,t){const s=new Uint8ClampedArray(r*e*4);let o=0;for(let l=0;l<e;l++){const u=l+.5;for(let d=0;d<r;d++){const f=d+.5,h=t(f,u);s[o++]=h[0]|0,s[o++]=h[1]|0,s[o++]=h[2]|0,s[o++]=h[3]|0}}return s}function Ot(r,e,t){const s=Math.round(Number.isFinite(r)?r:e);return s<e?e:s>t?t:s}function ti({label:r,children:e}){return O.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:6,marginBottom:14},children:[O.jsx("div",{style:{fontWeight:800,fontSize:12,opacity:.75},children:r}),e]})}function Rx({onGenerate:r,onSave:e,saving:t,disabled:s}){const o=pe.useMemo(()=>({width:256,height:128,seaLevel:50,plateActivity:55,axisTilt:23,planetAge:50,climateVar:35,moistureLevel:50,temperatureOffset:0,erosionIntensity:50,continentCount:5,seed:Math.floor(Math.random()*1e9),styleMode:"EARTHLIKE"}),[]),[l,u]=pe.useState(o);pe.useEffect(()=>{r(l)},[]),pe.useEffect(()=>{const f=setTimeout(()=>{r(l)},300);return()=>clearTimeout(f)},[l]);function d(f,h){u(m=>({...m,[f]:h}))}return O.jsxs("div",{style:{padding:14},children:[O.jsx("div",{style:{fontWeight:900,fontSize:14,marginBottom:12},children:"Generate"}),O.jsx(ti,{label:"Seed",children:O.jsxs("div",{style:{display:"flex",gap:8},children:[O.jsx("input",{value:l.seed,onChange:f=>d("seed",Ot(parseInt(f.target.value||"0",10),0,2147483647)),style:{flex:1,padding:8,borderRadius:10,border:"1px solid rgba(0,0,0,0.15)"},inputMode:"numeric"}),O.jsx("button",{onClick:()=>d("seed",Math.floor(Math.random()*1e9)),style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(0,0,0,0.15)"},children:"Random"})]})}),O.jsx(ti,{label:"Style Mode",children:O.jsxs("select",{value:l.styleMode,onChange:f=>d("styleMode",f.target.value),style:{padding:8,borderRadius:10,border:"1px solid rgba(0,0,0,0.15)"},children:[O.jsx("option",{value:"EARTHLIKE",children:"Earthlike"}),O.jsx("option",{value:"FANTASY",children:"Fantasy"}),O.jsx("option",{value:"STYLIZED",children:"Stylized"}),O.jsx("option",{value:"ALIEN",children:"Alien"})]})}),O.jsxs(ti,{label:`Resolution: ${l.width}×${l.height}`,children:[O.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8},children:[O.jsxs("div",{children:[O.jsx("div",{style:{fontSize:11,opacity:.7,marginBottom:6},children:"Width"}),O.jsx("input",{value:l.width,onChange:f=>d("width",Ot(parseInt(f.target.value||"0",10),64,1024)),style:{width:"100%",padding:8,borderRadius:10,border:"1px solid rgba(0,0,0,0.15)"},inputMode:"numeric"})]}),O.jsxs("div",{children:[O.jsx("div",{style:{fontSize:11,opacity:.7,marginBottom:6},children:"Height"}),O.jsx("input",{value:l.height,onChange:f=>d("height",Ot(parseInt(f.target.value||"0",10),32,1024)),style:{width:"100%",padding:8,borderRadius:10,border:"1px solid rgba(0,0,0,0.15)"},inputMode:"numeric"})]})]}),O.jsx("div",{style:{fontSize:11,opacity:.65,marginTop:6},children:"Note: larger resolutions generate slower (CPU preview)."})]}),O.jsx(ti,{label:`Sea Level (0–100): ${l.seaLevel}`,children:O.jsx("input",{type:"range",min:0,max:100,value:l.seaLevel,onChange:f=>d("seaLevel",Ot(parseInt(f.target.value,10),0,100))})}),O.jsx(ti,{label:`Plate Activity (0–100): ${l.plateActivity}`,children:O.jsx("input",{type:"range",min:0,max:100,value:l.plateActivity,onChange:f=>d("plateActivity",Ot(parseInt(f.target.value,10),0,100))})}),O.jsx(ti,{label:`Axis Tilt (0–100): ${l.axisTilt}`,children:O.jsx("input",{type:"range",min:0,max:100,value:l.axisTilt,onChange:f=>d("axisTilt",Ot(parseInt(f.target.value,10),0,100))})}),O.jsx(ti,{label:`Planet Age (0–100): ${l.planetAge}`,children:O.jsx("input",{type:"range",min:0,max:100,value:l.planetAge,onChange:f=>d("planetAge",Ot(parseInt(f.target.value,10),0,100))})}),O.jsx(ti,{label:`Climate Variability (0–100): ${l.climateVar}`,children:O.jsx("input",{type:"range",min:0,max:100,value:l.climateVar,onChange:f=>d("climateVar",Ot(parseInt(f.target.value,10),0,100))})}),O.jsx(ti,{label:`Moisture Level (0–100): ${l.moistureLevel}`,children:O.jsx("input",{type:"range",min:0,max:100,value:l.moistureLevel,onChange:f=>d("moistureLevel",Ot(parseInt(f.target.value,10),0,100))})}),O.jsx(ti,{label:`Temperature Offset (-50 to +50): ${l.temperatureOffset>0?"+":""}${l.temperatureOffset}`,children:O.jsx("input",{type:"range",min:-50,max:50,value:l.temperatureOffset,onChange:f=>d("temperatureOffset",Ot(parseInt(f.target.value,10),-50,50))})}),O.jsx(ti,{label:`Erosion Intensity (0–100): ${l.erosionIntensity}`,children:O.jsx("input",{type:"range",min:0,max:100,value:l.erosionIntensity,onChange:f=>d("erosionIntensity",Ot(parseInt(f.target.value,10),0,100))})}),O.jsx(ti,{label:`Continent Count (1–12): ${l.continentCount}`,children:O.jsx("input",{type:"range",min:1,max:12,value:l.continentCount,onChange:f=>d("continentCount",Ot(parseInt(f.target.value,10),1,12))})}),O.jsxs("div",{style:{display:"flex",gap:10,marginTop:16},children:[O.jsx("button",{onClick:()=>r({...l,width:Ot(l.width,64,1024),height:Ot(l.height,32,1024),seaLevel:Ot(l.seaLevel,0,100),plateActivity:Ot(l.plateActivity,0,100),axisTilt:Ot(l.axisTilt,0,100),planetAge:Ot(l.planetAge,0,100),climateVar:Ot(l.climateVar,0,100),moistureLevel:Ot(l.moistureLevel,0,100),temperatureOffset:Ot(l.temperatureOffset,-50,50),erosionIntensity:Ot(l.erosionIntensity,0,100),continentCount:Ot(l.continentCount,1,12),seed:typeof l.seed=="string"?l.seed:Ot(l.seed,0,2147483647),styleMode:l.styleMode}),style:{flex:1,padding:"10px 12px",borderRadius:12,border:"1px solid rgba(0,0,0,0.15)",fontWeight:900},children:"Generate"}),O.jsx("button",{onClick:e,disabled:s||t,style:{flex:1,padding:"10px 12px",borderRadius:12,border:"1px solid rgba(0,0,0,0.15)",fontWeight:900,opacity:s||t?.5:1,cursor:s||t?"not-allowed":"pointer"},children:t?"Saving…":"Save → Create"})]}),O.jsx("div",{style:{fontSize:11,opacity:.65,marginTop:10,lineHeight:1.35},children:"Seed + parameters determine the generated world. After Save, Create opens the saved snapshot."})]})}const Bd="160",Lx=0,kp=1,Px=2,Lg=1,Dx=2,Wi=3,br=0,kn=1,ji=2,wr=0,Zs=1,Bp=2,zp=3,Hp=4,Ix=5,Jr=100,Nx=101,Ux=102,Gp=103,Vp=104,Ox=200,Fx=201,kx=202,Bx=203,Ad=204,Cd=205,zx=206,Hx=207,Gx=208,Vx=209,Wx=210,jx=211,Xx=212,Yx=213,qx=214,$x=0,Kx=1,Zx=2,Wl=3,Qx=4,Jx=5,ey=6,ty=7,Pg=0,ny=1,iy=2,Ar=0,ry=1,sy=2,oy=3,ay=4,ly=5,cy=6,Dg=300,eo=301,to=302,bd=303,Rd=304,Jl=306,jl=1e3,si=1001,Ld=1002,wn=1003,Wp=1004,Wu=1005,Yn=1006,uy=1007,no=1008,Cr=1009,dy=1010,fy=1011,zd=1012,Ig=1013,Er=1014,Tr=1015,na=1016,Ng=1017,Ug=1018,is=1020,hy=1021,_i=1023,py=1024,my=1025,rs=1026,io=1027,gy=1028,Og=1029,vy=1030,Fg=1031,kg=1033,ju=33776,Xu=33777,Yu=33778,qu=33779,jp=35840,Xp=35841,Yp=35842,qp=35843,Bg=36196,$p=37492,Kp=37496,Zp=37808,Qp=37809,Jp=37810,em=37811,tm=37812,nm=37813,im=37814,rm=37815,sm=37816,om=37817,am=37818,lm=37819,cm=37820,um=37821,$u=36492,dm=36494,fm=36495,_y=36283,hm=36284,pm=36285,mm=36286,zg=3e3,ss=3001,xy=3200,yy=3201,Hg=0,Sy=1,oi="",cn="srgb",$i="srgb-linear",Hd="display-p3",ec="display-p3-linear",Xl="linear",It="srgb",Yl="rec709",ql="p3",Ds=7680,gm=519,My=512,Ey=513,Ty=514,Gg=515,wy=516,Ay=517,Cy=518,by=519,vm=35044,_m="300 es",Pd=1035,Yi=2e3,$l=2001;class ao{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].indexOf(t)===-1&&s[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const s=this._listeners;return s[e]!==void 0&&s[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const o=this._listeners[e];if(o!==void 0){const l=o.indexOf(t);l!==-1&&o.splice(l,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const s=this._listeners[e.type];if(s!==void 0){e.target=this;const o=s.slice(0);for(let l=0,u=o.length;l<u;l++)o[l].call(this,e);e.target=null}}}const gn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ku=Math.PI/180,Dd=180/Math.PI;function oa(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(gn[r&255]+gn[r>>8&255]+gn[r>>16&255]+gn[r>>24&255]+"-"+gn[e&255]+gn[e>>8&255]+"-"+gn[e>>16&15|64]+gn[e>>24&255]+"-"+gn[t&63|128]+gn[t>>8&255]+"-"+gn[t>>16&255]+gn[t>>24&255]+gn[s&255]+gn[s>>8&255]+gn[s>>16&255]+gn[s>>24&255]).toLowerCase()}function Fn(r,e,t){return Math.max(e,Math.min(t,r))}function Ry(r,e){return(r%e+e)%e}function Zu(r,e,t){return(1-t)*r+t*e}function xm(r){return(r&r-1)===0&&r!==0}function Id(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function jo(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Un(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class Tt{constructor(e=0,t=0){Tt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,s=this.y,o=e.elements;return this.x=o[0]*t+o[3]*s+o[6],this.y=o[1]*t+o[4]*s+o[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(e,Math.min(t,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const s=this.dot(e)/t;return Math.acos(Fn(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,s=this.y-e.y;return t*t+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const s=Math.cos(t),o=Math.sin(t),l=this.x-e.x,u=this.y-e.y;return this.x=l*s-u*o+e.x,this.y=l*o+u*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class gt{constructor(e,t,s,o,l,u,d,f,h){gt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,s,o,l,u,d,f,h)}set(e,t,s,o,l,u,d,f,h){const m=this.elements;return m[0]=e,m[1]=o,m[2]=d,m[3]=t,m[4]=l,m[5]=f,m[6]=s,m[7]=u,m[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,s=e.elements;return t[0]=s[0],t[1]=s[1],t[2]=s[2],t[3]=s[3],t[4]=s[4],t[5]=s[5],t[6]=s[6],t[7]=s[7],t[8]=s[8],this}extractBasis(e,t,s){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const s=e.elements,o=t.elements,l=this.elements,u=s[0],d=s[3],f=s[6],h=s[1],m=s[4],g=s[7],_=s[2],S=s[5],T=s[8],M=o[0],x=o[3],y=o[6],w=o[1],b=o[4],P=o[7],z=o[2],k=o[5],N=o[8];return l[0]=u*M+d*w+f*z,l[3]=u*x+d*b+f*k,l[6]=u*y+d*P+f*N,l[1]=h*M+m*w+g*z,l[4]=h*x+m*b+g*k,l[7]=h*y+m*P+g*N,l[2]=_*M+S*w+T*z,l[5]=_*x+S*b+T*k,l[8]=_*y+S*P+T*N,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],s=e[1],o=e[2],l=e[3],u=e[4],d=e[5],f=e[6],h=e[7],m=e[8];return t*u*m-t*d*h-s*l*m+s*d*f+o*l*h-o*u*f}invert(){const e=this.elements,t=e[0],s=e[1],o=e[2],l=e[3],u=e[4],d=e[5],f=e[6],h=e[7],m=e[8],g=m*u-d*h,_=d*f-m*l,S=h*l-u*f,T=t*g+s*_+o*S;if(T===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/T;return e[0]=g*M,e[1]=(o*h-m*s)*M,e[2]=(d*s-o*u)*M,e[3]=_*M,e[4]=(m*t-o*f)*M,e[5]=(o*l-d*t)*M,e[6]=S*M,e[7]=(s*f-h*t)*M,e[8]=(u*t-s*l)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,s,o,l,u,d){const f=Math.cos(l),h=Math.sin(l);return this.set(s*f,s*h,-s*(f*u+h*d)+u+e,-o*h,o*f,-o*(-h*u+f*d)+d+t,0,0,1),this}scale(e,t){return this.premultiply(Qu.makeScale(e,t)),this}rotate(e){return this.premultiply(Qu.makeRotation(-e)),this}translate(e,t){return this.premultiply(Qu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),s=Math.sin(e);return this.set(t,-s,0,s,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,s=e.elements;for(let o=0;o<9;o++)if(t[o]!==s[o])return!1;return!0}fromArray(e,t=0){for(let s=0;s<9;s++)this.elements[s]=e[s+t];return this}toArray(e=[],t=0){const s=this.elements;return e[t]=s[0],e[t+1]=s[1],e[t+2]=s[2],e[t+3]=s[3],e[t+4]=s[4],e[t+5]=s[5],e[t+6]=s[6],e[t+7]=s[7],e[t+8]=s[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Qu=new gt;function Vg(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Kl(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Ly(){const r=Kl("canvas");return r.style.display="block",r}const ym={};function Ko(r){r in ym||(ym[r]=!0,console.warn(r))}const Sm=new gt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Mm=new gt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),yl={[$i]:{transfer:Xl,primaries:Yl,toReference:r=>r,fromReference:r=>r},[cn]:{transfer:It,primaries:Yl,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[ec]:{transfer:Xl,primaries:ql,toReference:r=>r.applyMatrix3(Mm),fromReference:r=>r.applyMatrix3(Sm)},[Hd]:{transfer:It,primaries:ql,toReference:r=>r.convertSRGBToLinear().applyMatrix3(Mm),fromReference:r=>r.applyMatrix3(Sm).convertLinearToSRGB()}},Py=new Set([$i,ec]),bt={enabled:!0,_workingColorSpace:$i,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!Py.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;const s=yl[e].toReference,o=yl[t].fromReference;return o(s(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this._workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this._workingColorSpace)},getPrimaries:function(r){return yl[r].primaries},getTransfer:function(r){return r===oi?Xl:yl[r].transfer}};function Qs(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Ju(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Is;class Wg{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Is===void 0&&(Is=Kl("canvas")),Is.width=e.width,Is.height=e.height;const s=Is.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),t=Is}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Kl("canvas");t.width=e.width,t.height=e.height;const s=t.getContext("2d");s.drawImage(e,0,0,e.width,e.height);const o=s.getImageData(0,0,e.width,e.height),l=o.data;for(let u=0;u<l.length;u++)l[u]=Qs(l[u]/255)*255;return s.putImageData(o,0,0),t}else if(e.data){const t=e.data.slice(0);for(let s=0;s<t.length;s++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[s]=Math.floor(Qs(t[s]/255)*255):t[s]=Qs(t[s]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Dy=0;class jg{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Dy++}),this.uuid=oa(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const s={uuid:this.uuid,url:""},o=this.data;if(o!==null){let l;if(Array.isArray(o)){l=[];for(let u=0,d=o.length;u<d;u++)o[u].isDataTexture?l.push(ed(o[u].image)):l.push(ed(o[u]))}else l=ed(o);s.url=l}return t||(e.images[this.uuid]=s),s}}function ed(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Wg.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Iy=0;class Bn extends ao{constructor(e=Bn.DEFAULT_IMAGE,t=Bn.DEFAULT_MAPPING,s=si,o=si,l=Yn,u=no,d=_i,f=Cr,h=Bn.DEFAULT_ANISOTROPY,m=oi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Iy++}),this.uuid=oa(),this.name="",this.source=new jg(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=s,this.wrapT=o,this.magFilter=l,this.minFilter=u,this.anisotropy=h,this.format=d,this.internalFormat=null,this.type=f,this.offset=new Tt(0,0),this.repeat=new Tt(1,1),this.center=new Tt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof m=="string"?this.colorSpace=m:(Ko("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=m===ss?cn:oi),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const s={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),t||(e.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Dg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case jl:e.x=e.x-Math.floor(e.x);break;case si:e.x=e.x<0?0:1;break;case Ld:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case jl:e.y=e.y-Math.floor(e.y);break;case si:e.y=e.y<0?0:1;break;case Ld:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Ko("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===cn?ss:zg}set encoding(e){Ko("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===ss?cn:oi}}Bn.DEFAULT_IMAGE=null;Bn.DEFAULT_MAPPING=Dg;Bn.DEFAULT_ANISOTROPY=1;class sn{constructor(e=0,t=0,s=0,o=1){sn.prototype.isVector4=!0,this.x=e,this.y=t,this.z=s,this.w=o}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,s,o){return this.x=e,this.y=t,this.z=s,this.w=o,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,s=this.y,o=this.z,l=this.w,u=e.elements;return this.x=u[0]*t+u[4]*s+u[8]*o+u[12]*l,this.y=u[1]*t+u[5]*s+u[9]*o+u[13]*l,this.z=u[2]*t+u[6]*s+u[10]*o+u[14]*l,this.w=u[3]*t+u[7]*s+u[11]*o+u[15]*l,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,s,o,l;const f=e.elements,h=f[0],m=f[4],g=f[8],_=f[1],S=f[5],T=f[9],M=f[2],x=f[6],y=f[10];if(Math.abs(m-_)<.01&&Math.abs(g-M)<.01&&Math.abs(T-x)<.01){if(Math.abs(m+_)<.1&&Math.abs(g+M)<.1&&Math.abs(T+x)<.1&&Math.abs(h+S+y-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(h+1)/2,P=(S+1)/2,z=(y+1)/2,k=(m+_)/4,N=(g+M)/4,oe=(T+x)/4;return b>P&&b>z?b<.01?(s=0,o=.707106781,l=.707106781):(s=Math.sqrt(b),o=k/s,l=N/s):P>z?P<.01?(s=.707106781,o=0,l=.707106781):(o=Math.sqrt(P),s=k/o,l=oe/o):z<.01?(s=.707106781,o=.707106781,l=0):(l=Math.sqrt(z),s=N/l,o=oe/l),this.set(s,o,l,t),this}let w=Math.sqrt((x-T)*(x-T)+(g-M)*(g-M)+(_-m)*(_-m));return Math.abs(w)<.001&&(w=1),this.x=(x-T)/w,this.y=(g-M)/w,this.z=(_-m)/w,this.w=Math.acos((h+S+y-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(e,Math.min(t,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this.z=e.z+(t.z-e.z)*s,this.w=e.w+(t.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ny extends ao{constructor(e=1,t=1,s={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new sn(0,0,e,t),this.scissorTest=!1,this.viewport=new sn(0,0,e,t);const o={width:e,height:t,depth:1};s.encoding!==void 0&&(Ko("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),s.colorSpace=s.encoding===ss?cn:oi),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Yn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},s),this.texture=new Bn(o,s.mapping,s.wrapS,s.wrapT,s.magFilter,s.minFilter,s.format,s.type,s.anisotropy,s.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=s.generateMipmaps,this.texture.internalFormat=s.internalFormat,this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.depthTexture=s.depthTexture,this.samples=s.samples}setSize(e,t,s=1){(this.width!==e||this.height!==t||this.depth!==s)&&(this.width=e,this.height=t,this.depth=s,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=s,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new jg(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class os extends Ny{constructor(e=1,t=1,s={}){super(e,t,s),this.isWebGLRenderTarget=!0}}class Xg extends Bn{constructor(e=null,t=1,s=1,o=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:s,depth:o},this.magFilter=wn,this.minFilter=wn,this.wrapR=si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Uy extends Bn{constructor(e=null,t=1,s=1,o=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:s,depth:o},this.magFilter=wn,this.minFilter=wn,this.wrapR=si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class aa{constructor(e=0,t=0,s=0,o=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=s,this._w=o}static slerpFlat(e,t,s,o,l,u,d){let f=s[o+0],h=s[o+1],m=s[o+2],g=s[o+3];const _=l[u+0],S=l[u+1],T=l[u+2],M=l[u+3];if(d===0){e[t+0]=f,e[t+1]=h,e[t+2]=m,e[t+3]=g;return}if(d===1){e[t+0]=_,e[t+1]=S,e[t+2]=T,e[t+3]=M;return}if(g!==M||f!==_||h!==S||m!==T){let x=1-d;const y=f*_+h*S+m*T+g*M,w=y>=0?1:-1,b=1-y*y;if(b>Number.EPSILON){const z=Math.sqrt(b),k=Math.atan2(z,y*w);x=Math.sin(x*k)/z,d=Math.sin(d*k)/z}const P=d*w;if(f=f*x+_*P,h=h*x+S*P,m=m*x+T*P,g=g*x+M*P,x===1-d){const z=1/Math.sqrt(f*f+h*h+m*m+g*g);f*=z,h*=z,m*=z,g*=z}}e[t]=f,e[t+1]=h,e[t+2]=m,e[t+3]=g}static multiplyQuaternionsFlat(e,t,s,o,l,u){const d=s[o],f=s[o+1],h=s[o+2],m=s[o+3],g=l[u],_=l[u+1],S=l[u+2],T=l[u+3];return e[t]=d*T+m*g+f*S-h*_,e[t+1]=f*T+m*_+h*g-d*S,e[t+2]=h*T+m*S+d*_-f*g,e[t+3]=m*T-d*g-f*_-h*S,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,s,o){return this._x=e,this._y=t,this._z=s,this._w=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const s=e._x,o=e._y,l=e._z,u=e._order,d=Math.cos,f=Math.sin,h=d(s/2),m=d(o/2),g=d(l/2),_=f(s/2),S=f(o/2),T=f(l/2);switch(u){case"XYZ":this._x=_*m*g+h*S*T,this._y=h*S*g-_*m*T,this._z=h*m*T+_*S*g,this._w=h*m*g-_*S*T;break;case"YXZ":this._x=_*m*g+h*S*T,this._y=h*S*g-_*m*T,this._z=h*m*T-_*S*g,this._w=h*m*g+_*S*T;break;case"ZXY":this._x=_*m*g-h*S*T,this._y=h*S*g+_*m*T,this._z=h*m*T+_*S*g,this._w=h*m*g-_*S*T;break;case"ZYX":this._x=_*m*g-h*S*T,this._y=h*S*g+_*m*T,this._z=h*m*T-_*S*g,this._w=h*m*g+_*S*T;break;case"YZX":this._x=_*m*g+h*S*T,this._y=h*S*g+_*m*T,this._z=h*m*T-_*S*g,this._w=h*m*g-_*S*T;break;case"XZY":this._x=_*m*g-h*S*T,this._y=h*S*g-_*m*T,this._z=h*m*T+_*S*g,this._w=h*m*g+_*S*T;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+u)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const s=t/2,o=Math.sin(s);return this._x=e.x*o,this._y=e.y*o,this._z=e.z*o,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,s=t[0],o=t[4],l=t[8],u=t[1],d=t[5],f=t[9],h=t[2],m=t[6],g=t[10],_=s+d+g;if(_>0){const S=.5/Math.sqrt(_+1);this._w=.25/S,this._x=(m-f)*S,this._y=(l-h)*S,this._z=(u-o)*S}else if(s>d&&s>g){const S=2*Math.sqrt(1+s-d-g);this._w=(m-f)/S,this._x=.25*S,this._y=(o+u)/S,this._z=(l+h)/S}else if(d>g){const S=2*Math.sqrt(1+d-s-g);this._w=(l-h)/S,this._x=(o+u)/S,this._y=.25*S,this._z=(f+m)/S}else{const S=2*Math.sqrt(1+g-s-d);this._w=(u-o)/S,this._x=(l+h)/S,this._y=(f+m)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let s=e.dot(t)+1;return s<Number.EPSILON?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Fn(this.dot(e),-1,1)))}rotateTowards(e,t){const s=this.angleTo(e);if(s===0)return this;const o=Math.min(1,t/s);return this.slerp(e,o),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const s=e._x,o=e._y,l=e._z,u=e._w,d=t._x,f=t._y,h=t._z,m=t._w;return this._x=s*m+u*d+o*h-l*f,this._y=o*m+u*f+l*d-s*h,this._z=l*m+u*h+s*f-o*d,this._w=u*m-s*d-o*f-l*h,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const s=this._x,o=this._y,l=this._z,u=this._w;let d=u*e._w+s*e._x+o*e._y+l*e._z;if(d<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,d=-d):this.copy(e),d>=1)return this._w=u,this._x=s,this._y=o,this._z=l,this;const f=1-d*d;if(f<=Number.EPSILON){const S=1-t;return this._w=S*u+t*this._w,this._x=S*s+t*this._x,this._y=S*o+t*this._y,this._z=S*l+t*this._z,this.normalize(),this}const h=Math.sqrt(f),m=Math.atan2(h,d),g=Math.sin((1-t)*m)/h,_=Math.sin(t*m)/h;return this._w=u*g+this._w*_,this._x=s*g+this._x*_,this._y=o*g+this._y*_,this._z=l*g+this._z*_,this._onChangeCallback(),this}slerpQuaternions(e,t,s){return this.copy(e).slerp(t,s)}random(){const e=Math.random(),t=Math.sqrt(1-e),s=Math.sqrt(e),o=2*Math.PI*Math.random(),l=2*Math.PI*Math.random();return this.set(t*Math.cos(o),s*Math.sin(l),s*Math.cos(l),t*Math.sin(o))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class le{constructor(e=0,t=0,s=0){le.prototype.isVector3=!0,this.x=e,this.y=t,this.z=s}set(e,t,s){return s===void 0&&(s=this.z),this.x=e,this.y=t,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Em.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Em.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,s=this.y,o=this.z,l=e.elements;return this.x=l[0]*t+l[3]*s+l[6]*o,this.y=l[1]*t+l[4]*s+l[7]*o,this.z=l[2]*t+l[5]*s+l[8]*o,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,s=this.y,o=this.z,l=e.elements,u=1/(l[3]*t+l[7]*s+l[11]*o+l[15]);return this.x=(l[0]*t+l[4]*s+l[8]*o+l[12])*u,this.y=(l[1]*t+l[5]*s+l[9]*o+l[13])*u,this.z=(l[2]*t+l[6]*s+l[10]*o+l[14])*u,this}applyQuaternion(e){const t=this.x,s=this.y,o=this.z,l=e.x,u=e.y,d=e.z,f=e.w,h=2*(u*o-d*s),m=2*(d*t-l*o),g=2*(l*s-u*t);return this.x=t+f*h+u*g-d*m,this.y=s+f*m+d*h-l*g,this.z=o+f*g+l*m-u*h,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,s=this.y,o=this.z,l=e.elements;return this.x=l[0]*t+l[4]*s+l[8]*o,this.y=l[1]*t+l[5]*s+l[9]*o,this.z=l[2]*t+l[6]*s+l[10]*o,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(e,Math.min(t,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this.z=e.z+(t.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const s=e.x,o=e.y,l=e.z,u=t.x,d=t.y,f=t.z;return this.x=o*f-l*d,this.y=l*u-s*f,this.z=s*d-o*u,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const s=e.dot(this)/t;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){return td.copy(this).projectOnVector(e),this.sub(td)}reflect(e){return this.sub(td.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const s=this.dot(e)/t;return Math.acos(Fn(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,s=this.y-e.y,o=this.z-e.z;return t*t+s*s+o*o}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,s){const o=Math.sin(t)*e;return this.x=o*Math.sin(s),this.y=Math.cos(t)*e,this.z=o*Math.cos(s),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,s){return this.x=e*Math.sin(t),this.y=s,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),o=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=s,this.z=o,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,s=Math.sqrt(1-e**2);return this.x=s*Math.cos(t),this.y=s*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const td=new le,Em=new aa;class la{constructor(e=new le(1/0,1/0,1/0),t=new le(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,s=e.length;t<s;t+=3)this.expandByPoint(pi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,s=e.count;t<s;t++)this.expandByPoint(pi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,s=e.length;t<s;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const s=pi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(s),this.max.copy(e).add(s),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const l=s.getAttribute("position");if(t===!0&&l!==void 0&&e.isInstancedMesh!==!0)for(let u=0,d=l.count;u<d;u++)e.isMesh===!0?e.getVertexPosition(u,pi):pi.fromBufferAttribute(l,u),pi.applyMatrix4(e.matrixWorld),this.expandByPoint(pi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Sl.copy(e.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),Sl.copy(s.boundingBox)),Sl.applyMatrix4(e.matrixWorld),this.union(Sl)}const o=e.children;for(let l=0,u=o.length;l<u;l++)this.expandByObject(o[l],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,pi),pi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,s;return e.normal.x>0?(t=e.normal.x*this.min.x,s=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,s=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,s+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,s+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,s+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,s+=e.normal.z*this.min.z),t<=-e.constant&&s>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Xo),Ml.subVectors(this.max,Xo),Ns.subVectors(e.a,Xo),Us.subVectors(e.b,Xo),Os.subVectors(e.c,Xo),vr.subVectors(Us,Ns),_r.subVectors(Os,Us),Yr.subVectors(Ns,Os);let t=[0,-vr.z,vr.y,0,-_r.z,_r.y,0,-Yr.z,Yr.y,vr.z,0,-vr.x,_r.z,0,-_r.x,Yr.z,0,-Yr.x,-vr.y,vr.x,0,-_r.y,_r.x,0,-Yr.y,Yr.x,0];return!nd(t,Ns,Us,Os,Ml)||(t=[1,0,0,0,1,0,0,0,1],!nd(t,Ns,Us,Os,Ml))?!1:(El.crossVectors(vr,_r),t=[El.x,El.y,El.z],nd(t,Ns,Us,Os,Ml))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,pi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(pi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Bi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Bi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Bi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Bi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Bi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Bi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Bi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Bi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Bi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Bi=[new le,new le,new le,new le,new le,new le,new le,new le],pi=new le,Sl=new la,Ns=new le,Us=new le,Os=new le,vr=new le,_r=new le,Yr=new le,Xo=new le,Ml=new le,El=new le,qr=new le;function nd(r,e,t,s,o){for(let l=0,u=r.length-3;l<=u;l+=3){qr.fromArray(r,l);const d=o.x*Math.abs(qr.x)+o.y*Math.abs(qr.y)+o.z*Math.abs(qr.z),f=e.dot(qr),h=t.dot(qr),m=s.dot(qr);if(Math.max(-Math.max(f,h,m),Math.min(f,h,m))>d)return!1}return!0}const Oy=new la,Yo=new le,id=new le;class Gd{constructor(e=new le,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const s=this.center;t!==void 0?s.copy(t):Oy.setFromPoints(e).getCenter(s);let o=0;for(let l=0,u=e.length;l<u;l++)o=Math.max(o,s.distanceToSquared(e[l]));return this.radius=Math.sqrt(o),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const s=this.center.distanceToSquared(e);return t.copy(e),s>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Yo.subVectors(e,this.center);const t=Yo.lengthSq();if(t>this.radius*this.radius){const s=Math.sqrt(t),o=(s-this.radius)*.5;this.center.addScaledVector(Yo,o/s),this.radius+=o}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(id.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Yo.copy(e.center).add(id)),this.expandByPoint(Yo.copy(e.center).sub(id))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const zi=new le,rd=new le,Tl=new le,xr=new le,sd=new le,wl=new le,od=new le;class Fy{constructor(e=new le,t=new le(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,zi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const s=t.dot(this.direction);return s<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=zi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(zi.copy(this.origin).addScaledVector(this.direction,t),zi.distanceToSquared(e))}distanceSqToSegment(e,t,s,o){rd.copy(e).add(t).multiplyScalar(.5),Tl.copy(t).sub(e).normalize(),xr.copy(this.origin).sub(rd);const l=e.distanceTo(t)*.5,u=-this.direction.dot(Tl),d=xr.dot(this.direction),f=-xr.dot(Tl),h=xr.lengthSq(),m=Math.abs(1-u*u);let g,_,S,T;if(m>0)if(g=u*f-d,_=u*d-f,T=l*m,g>=0)if(_>=-T)if(_<=T){const M=1/m;g*=M,_*=M,S=g*(g+u*_+2*d)+_*(u*g+_+2*f)+h}else _=l,g=Math.max(0,-(u*_+d)),S=-g*g+_*(_+2*f)+h;else _=-l,g=Math.max(0,-(u*_+d)),S=-g*g+_*(_+2*f)+h;else _<=-T?(g=Math.max(0,-(-u*l+d)),_=g>0?-l:Math.min(Math.max(-l,-f),l),S=-g*g+_*(_+2*f)+h):_<=T?(g=0,_=Math.min(Math.max(-l,-f),l),S=_*(_+2*f)+h):(g=Math.max(0,-(u*l+d)),_=g>0?l:Math.min(Math.max(-l,-f),l),S=-g*g+_*(_+2*f)+h);else _=u>0?-l:l,g=Math.max(0,-(u*_+d)),S=-g*g+_*(_+2*f)+h;return s&&s.copy(this.origin).addScaledVector(this.direction,g),o&&o.copy(rd).addScaledVector(Tl,_),S}intersectSphere(e,t){zi.subVectors(e.center,this.origin);const s=zi.dot(this.direction),o=zi.dot(zi)-s*s,l=e.radius*e.radius;if(o>l)return null;const u=Math.sqrt(l-o),d=s-u,f=s+u;return f<0?null:d<0?this.at(f,t):this.at(d,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(e.normal)+e.constant)/t;return s>=0?s:null}intersectPlane(e,t){const s=this.distanceToPlane(e);return s===null?null:this.at(s,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let s,o,l,u,d,f;const h=1/this.direction.x,m=1/this.direction.y,g=1/this.direction.z,_=this.origin;return h>=0?(s=(e.min.x-_.x)*h,o=(e.max.x-_.x)*h):(s=(e.max.x-_.x)*h,o=(e.min.x-_.x)*h),m>=0?(l=(e.min.y-_.y)*m,u=(e.max.y-_.y)*m):(l=(e.max.y-_.y)*m,u=(e.min.y-_.y)*m),s>u||l>o||((l>s||isNaN(s))&&(s=l),(u<o||isNaN(o))&&(o=u),g>=0?(d=(e.min.z-_.z)*g,f=(e.max.z-_.z)*g):(d=(e.max.z-_.z)*g,f=(e.min.z-_.z)*g),s>f||d>o)||((d>s||s!==s)&&(s=d),(f<o||o!==o)&&(o=f),o<0)?null:this.at(s>=0?s:o,t)}intersectsBox(e){return this.intersectBox(e,zi)!==null}intersectTriangle(e,t,s,o,l){sd.subVectors(t,e),wl.subVectors(s,e),od.crossVectors(sd,wl);let u=this.direction.dot(od),d;if(u>0){if(o)return null;d=1}else if(u<0)d=-1,u=-u;else return null;xr.subVectors(this.origin,e);const f=d*this.direction.dot(wl.crossVectors(xr,wl));if(f<0)return null;const h=d*this.direction.dot(sd.cross(xr));if(h<0||f+h>u)return null;const m=-d*xr.dot(od);return m<0?null:this.at(m/u,l)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Kt{constructor(e,t,s,o,l,u,d,f,h,m,g,_,S,T,M,x){Kt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,s,o,l,u,d,f,h,m,g,_,S,T,M,x)}set(e,t,s,o,l,u,d,f,h,m,g,_,S,T,M,x){const y=this.elements;return y[0]=e,y[4]=t,y[8]=s,y[12]=o,y[1]=l,y[5]=u,y[9]=d,y[13]=f,y[2]=h,y[6]=m,y[10]=g,y[14]=_,y[3]=S,y[7]=T,y[11]=M,y[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Kt().fromArray(this.elements)}copy(e){const t=this.elements,s=e.elements;return t[0]=s[0],t[1]=s[1],t[2]=s[2],t[3]=s[3],t[4]=s[4],t[5]=s[5],t[6]=s[6],t[7]=s[7],t[8]=s[8],t[9]=s[9],t[10]=s[10],t[11]=s[11],t[12]=s[12],t[13]=s[13],t[14]=s[14],t[15]=s[15],this}copyPosition(e){const t=this.elements,s=e.elements;return t[12]=s[12],t[13]=s[13],t[14]=s[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,s){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this}makeBasis(e,t,s){return this.set(e.x,t.x,s.x,0,e.y,t.y,s.y,0,e.z,t.z,s.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,s=e.elements,o=1/Fs.setFromMatrixColumn(e,0).length(),l=1/Fs.setFromMatrixColumn(e,1).length(),u=1/Fs.setFromMatrixColumn(e,2).length();return t[0]=s[0]*o,t[1]=s[1]*o,t[2]=s[2]*o,t[3]=0,t[4]=s[4]*l,t[5]=s[5]*l,t[6]=s[6]*l,t[7]=0,t[8]=s[8]*u,t[9]=s[9]*u,t[10]=s[10]*u,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,s=e.x,o=e.y,l=e.z,u=Math.cos(s),d=Math.sin(s),f=Math.cos(o),h=Math.sin(o),m=Math.cos(l),g=Math.sin(l);if(e.order==="XYZ"){const _=u*m,S=u*g,T=d*m,M=d*g;t[0]=f*m,t[4]=-f*g,t[8]=h,t[1]=S+T*h,t[5]=_-M*h,t[9]=-d*f,t[2]=M-_*h,t[6]=T+S*h,t[10]=u*f}else if(e.order==="YXZ"){const _=f*m,S=f*g,T=h*m,M=h*g;t[0]=_+M*d,t[4]=T*d-S,t[8]=u*h,t[1]=u*g,t[5]=u*m,t[9]=-d,t[2]=S*d-T,t[6]=M+_*d,t[10]=u*f}else if(e.order==="ZXY"){const _=f*m,S=f*g,T=h*m,M=h*g;t[0]=_-M*d,t[4]=-u*g,t[8]=T+S*d,t[1]=S+T*d,t[5]=u*m,t[9]=M-_*d,t[2]=-u*h,t[6]=d,t[10]=u*f}else if(e.order==="ZYX"){const _=u*m,S=u*g,T=d*m,M=d*g;t[0]=f*m,t[4]=T*h-S,t[8]=_*h+M,t[1]=f*g,t[5]=M*h+_,t[9]=S*h-T,t[2]=-h,t[6]=d*f,t[10]=u*f}else if(e.order==="YZX"){const _=u*f,S=u*h,T=d*f,M=d*h;t[0]=f*m,t[4]=M-_*g,t[8]=T*g+S,t[1]=g,t[5]=u*m,t[9]=-d*m,t[2]=-h*m,t[6]=S*g+T,t[10]=_-M*g}else if(e.order==="XZY"){const _=u*f,S=u*h,T=d*f,M=d*h;t[0]=f*m,t[4]=-g,t[8]=h*m,t[1]=_*g+M,t[5]=u*m,t[9]=S*g-T,t[2]=T*g-S,t[6]=d*m,t[10]=M*g+_}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ky,e,By)}lookAt(e,t,s){const o=this.elements;return jn.subVectors(e,t),jn.lengthSq()===0&&(jn.z=1),jn.normalize(),yr.crossVectors(s,jn),yr.lengthSq()===0&&(Math.abs(s.z)===1?jn.x+=1e-4:jn.z+=1e-4,jn.normalize(),yr.crossVectors(s,jn)),yr.normalize(),Al.crossVectors(jn,yr),o[0]=yr.x,o[4]=Al.x,o[8]=jn.x,o[1]=yr.y,o[5]=Al.y,o[9]=jn.y,o[2]=yr.z,o[6]=Al.z,o[10]=jn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const s=e.elements,o=t.elements,l=this.elements,u=s[0],d=s[4],f=s[8],h=s[12],m=s[1],g=s[5],_=s[9],S=s[13],T=s[2],M=s[6],x=s[10],y=s[14],w=s[3],b=s[7],P=s[11],z=s[15],k=o[0],N=o[4],oe=o[8],A=o[12],R=o[1],ie=o[5],ue=o[9],de=o[13],B=o[2],V=o[6],$=o[10],Q=o[14],U=o[3],Y=o[7],H=o[11],I=o[15];return l[0]=u*k+d*R+f*B+h*U,l[4]=u*N+d*ie+f*V+h*Y,l[8]=u*oe+d*ue+f*$+h*H,l[12]=u*A+d*de+f*Q+h*I,l[1]=m*k+g*R+_*B+S*U,l[5]=m*N+g*ie+_*V+S*Y,l[9]=m*oe+g*ue+_*$+S*H,l[13]=m*A+g*de+_*Q+S*I,l[2]=T*k+M*R+x*B+y*U,l[6]=T*N+M*ie+x*V+y*Y,l[10]=T*oe+M*ue+x*$+y*H,l[14]=T*A+M*de+x*Q+y*I,l[3]=w*k+b*R+P*B+z*U,l[7]=w*N+b*ie+P*V+z*Y,l[11]=w*oe+b*ue+P*$+z*H,l[15]=w*A+b*de+P*Q+z*I,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],s=e[4],o=e[8],l=e[12],u=e[1],d=e[5],f=e[9],h=e[13],m=e[2],g=e[6],_=e[10],S=e[14],T=e[3],M=e[7],x=e[11],y=e[15];return T*(+l*f*g-o*h*g-l*d*_+s*h*_+o*d*S-s*f*S)+M*(+t*f*S-t*h*_+l*u*_-o*u*S+o*h*m-l*f*m)+x*(+t*h*g-t*d*S-l*u*g+s*u*S+l*d*m-s*h*m)+y*(-o*d*m-t*f*g+t*d*_+o*u*g-s*u*_+s*f*m)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,s){const o=this.elements;return e.isVector3?(o[12]=e.x,o[13]=e.y,o[14]=e.z):(o[12]=e,o[13]=t,o[14]=s),this}invert(){const e=this.elements,t=e[0],s=e[1],o=e[2],l=e[3],u=e[4],d=e[5],f=e[6],h=e[7],m=e[8],g=e[9],_=e[10],S=e[11],T=e[12],M=e[13],x=e[14],y=e[15],w=g*x*h-M*_*h+M*f*S-d*x*S-g*f*y+d*_*y,b=T*_*h-m*x*h-T*f*S+u*x*S+m*f*y-u*_*y,P=m*M*h-T*g*h+T*d*S-u*M*S-m*d*y+u*g*y,z=T*g*f-m*M*f-T*d*_+u*M*_+m*d*x-u*g*x,k=t*w+s*b+o*P+l*z;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const N=1/k;return e[0]=w*N,e[1]=(M*_*l-g*x*l-M*o*S+s*x*S+g*o*y-s*_*y)*N,e[2]=(d*x*l-M*f*l+M*o*h-s*x*h-d*o*y+s*f*y)*N,e[3]=(g*f*l-d*_*l-g*o*h+s*_*h+d*o*S-s*f*S)*N,e[4]=b*N,e[5]=(m*x*l-T*_*l+T*o*S-t*x*S-m*o*y+t*_*y)*N,e[6]=(T*f*l-u*x*l-T*o*h+t*x*h+u*o*y-t*f*y)*N,e[7]=(u*_*l-m*f*l+m*o*h-t*_*h-u*o*S+t*f*S)*N,e[8]=P*N,e[9]=(T*g*l-m*M*l-T*s*S+t*M*S+m*s*y-t*g*y)*N,e[10]=(u*M*l-T*d*l+T*s*h-t*M*h-u*s*y+t*d*y)*N,e[11]=(m*d*l-u*g*l-m*s*h+t*g*h+u*s*S-t*d*S)*N,e[12]=z*N,e[13]=(m*M*o-T*g*o+T*s*_-t*M*_-m*s*x+t*g*x)*N,e[14]=(T*d*o-u*M*o-T*s*f+t*M*f+u*s*x-t*d*x)*N,e[15]=(u*g*o-m*d*o+m*s*f-t*g*f-u*s*_+t*d*_)*N,this}scale(e){const t=this.elements,s=e.x,o=e.y,l=e.z;return t[0]*=s,t[4]*=o,t[8]*=l,t[1]*=s,t[5]*=o,t[9]*=l,t[2]*=s,t[6]*=o,t[10]*=l,t[3]*=s,t[7]*=o,t[11]*=l,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],o=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,s,o))}makeTranslation(e,t,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,s,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,t,-s,0,0,s,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),s=Math.sin(e);return this.set(t,0,s,0,0,1,0,0,-s,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),s=Math.sin(e);return this.set(t,-s,0,0,s,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const s=Math.cos(t),o=Math.sin(t),l=1-s,u=e.x,d=e.y,f=e.z,h=l*u,m=l*d;return this.set(h*u+s,h*d-o*f,h*f+o*d,0,h*d+o*f,m*d+s,m*f-o*u,0,h*f-o*d,m*f+o*u,l*f*f+s,0,0,0,0,1),this}makeScale(e,t,s){return this.set(e,0,0,0,0,t,0,0,0,0,s,0,0,0,0,1),this}makeShear(e,t,s,o,l,u){return this.set(1,s,l,0,e,1,u,0,t,o,1,0,0,0,0,1),this}compose(e,t,s){const o=this.elements,l=t._x,u=t._y,d=t._z,f=t._w,h=l+l,m=u+u,g=d+d,_=l*h,S=l*m,T=l*g,M=u*m,x=u*g,y=d*g,w=f*h,b=f*m,P=f*g,z=s.x,k=s.y,N=s.z;return o[0]=(1-(M+y))*z,o[1]=(S+P)*z,o[2]=(T-b)*z,o[3]=0,o[4]=(S-P)*k,o[5]=(1-(_+y))*k,o[6]=(x+w)*k,o[7]=0,o[8]=(T+b)*N,o[9]=(x-w)*N,o[10]=(1-(_+M))*N,o[11]=0,o[12]=e.x,o[13]=e.y,o[14]=e.z,o[15]=1,this}decompose(e,t,s){const o=this.elements;let l=Fs.set(o[0],o[1],o[2]).length();const u=Fs.set(o[4],o[5],o[6]).length(),d=Fs.set(o[8],o[9],o[10]).length();this.determinant()<0&&(l=-l),e.x=o[12],e.y=o[13],e.z=o[14],mi.copy(this);const h=1/l,m=1/u,g=1/d;return mi.elements[0]*=h,mi.elements[1]*=h,mi.elements[2]*=h,mi.elements[4]*=m,mi.elements[5]*=m,mi.elements[6]*=m,mi.elements[8]*=g,mi.elements[9]*=g,mi.elements[10]*=g,t.setFromRotationMatrix(mi),s.x=l,s.y=u,s.z=d,this}makePerspective(e,t,s,o,l,u,d=Yi){const f=this.elements,h=2*l/(t-e),m=2*l/(s-o),g=(t+e)/(t-e),_=(s+o)/(s-o);let S,T;if(d===Yi)S=-(u+l)/(u-l),T=-2*u*l/(u-l);else if(d===$l)S=-u/(u-l),T=-u*l/(u-l);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return f[0]=h,f[4]=0,f[8]=g,f[12]=0,f[1]=0,f[5]=m,f[9]=_,f[13]=0,f[2]=0,f[6]=0,f[10]=S,f[14]=T,f[3]=0,f[7]=0,f[11]=-1,f[15]=0,this}makeOrthographic(e,t,s,o,l,u,d=Yi){const f=this.elements,h=1/(t-e),m=1/(s-o),g=1/(u-l),_=(t+e)*h,S=(s+o)*m;let T,M;if(d===Yi)T=(u+l)*g,M=-2*g;else if(d===$l)T=l*g,M=-1*g;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return f[0]=2*h,f[4]=0,f[8]=0,f[12]=-_,f[1]=0,f[5]=2*m,f[9]=0,f[13]=-S,f[2]=0,f[6]=0,f[10]=M,f[14]=-T,f[3]=0,f[7]=0,f[11]=0,f[15]=1,this}equals(e){const t=this.elements,s=e.elements;for(let o=0;o<16;o++)if(t[o]!==s[o])return!1;return!0}fromArray(e,t=0){for(let s=0;s<16;s++)this.elements[s]=e[s+t];return this}toArray(e=[],t=0){const s=this.elements;return e[t]=s[0],e[t+1]=s[1],e[t+2]=s[2],e[t+3]=s[3],e[t+4]=s[4],e[t+5]=s[5],e[t+6]=s[6],e[t+7]=s[7],e[t+8]=s[8],e[t+9]=s[9],e[t+10]=s[10],e[t+11]=s[11],e[t+12]=s[12],e[t+13]=s[13],e[t+14]=s[14],e[t+15]=s[15],e}}const Fs=new le,mi=new Kt,ky=new le(0,0,0),By=new le(1,1,1),yr=new le,Al=new le,jn=new le,Tm=new Kt,wm=new aa;class tc{constructor(e=0,t=0,s=0,o=tc.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=s,this._order=o}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,s,o=this._order){return this._x=e,this._y=t,this._z=s,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,s=!0){const o=e.elements,l=o[0],u=o[4],d=o[8],f=o[1],h=o[5],m=o[9],g=o[2],_=o[6],S=o[10];switch(t){case"XYZ":this._y=Math.asin(Fn(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-m,S),this._z=Math.atan2(-u,l)):(this._x=Math.atan2(_,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Fn(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(d,S),this._z=Math.atan2(f,h)):(this._y=Math.atan2(-g,l),this._z=0);break;case"ZXY":this._x=Math.asin(Fn(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(-g,S),this._z=Math.atan2(-u,h)):(this._y=0,this._z=Math.atan2(f,l));break;case"ZYX":this._y=Math.asin(-Fn(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(_,S),this._z=Math.atan2(f,l)):(this._x=0,this._z=Math.atan2(-u,h));break;case"YZX":this._z=Math.asin(Fn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(-m,h),this._y=Math.atan2(-g,l)):(this._x=0,this._y=Math.atan2(d,S));break;case"XZY":this._z=Math.asin(-Fn(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(_,h),this._y=Math.atan2(d,l)):(this._x=Math.atan2(-m,S),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,s===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,s){return Tm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Tm,t,s)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return wm.setFromEuler(this),this.setFromQuaternion(wm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}tc.DEFAULT_ORDER="XYZ";class Yg{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let zy=0;const Am=new le,ks=new aa,Hi=new Kt,Cl=new le,qo=new le,Hy=new le,Gy=new aa,Cm=new le(1,0,0),bm=new le(0,1,0),Rm=new le(0,0,1),Vy={type:"added"},Wy={type:"removed"};class un extends ao{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:zy++}),this.uuid=oa(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=un.DEFAULT_UP.clone();const e=new le,t=new tc,s=new aa,o=new le(1,1,1);function l(){s.setFromEuler(t,!1)}function u(){t.setFromQuaternion(s,void 0,!1)}t._onChange(l),s._onChange(u),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new Kt},normalMatrix:{value:new gt}}),this.matrix=new Kt,this.matrixWorld=new Kt,this.matrixAutoUpdate=un.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=un.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Yg,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ks.setFromAxisAngle(e,t),this.quaternion.multiply(ks),this}rotateOnWorldAxis(e,t){return ks.setFromAxisAngle(e,t),this.quaternion.premultiply(ks),this}rotateX(e){return this.rotateOnAxis(Cm,e)}rotateY(e){return this.rotateOnAxis(bm,e)}rotateZ(e){return this.rotateOnAxis(Rm,e)}translateOnAxis(e,t){return Am.copy(e).applyQuaternion(this.quaternion),this.position.add(Am.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Cm,e)}translateY(e){return this.translateOnAxis(bm,e)}translateZ(e){return this.translateOnAxis(Rm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Hi.copy(this.matrixWorld).invert())}lookAt(e,t,s){e.isVector3?Cl.copy(e):Cl.set(e,t,s);const o=this.parent;this.updateWorldMatrix(!0,!1),qo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Hi.lookAt(qo,Cl,this.up):Hi.lookAt(Cl,qo,this.up),this.quaternion.setFromRotationMatrix(Hi),o&&(Hi.extractRotation(o.matrixWorld),ks.setFromRotationMatrix(Hi),this.quaternion.premultiply(ks.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Vy)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Wy)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Hi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Hi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Hi),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let s=0,o=this.children.length;s<o;s++){const u=this.children[s].getObjectByProperty(e,t);if(u!==void 0)return u}}getObjectsByProperty(e,t,s=[]){this[e]===t&&s.push(this);const o=this.children;for(let l=0,u=o.length;l<u;l++)o[l].getObjectsByProperty(e,t,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qo,e,Hy),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qo,Gy,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let s=0,o=t.length;s<o;s++)t[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let s=0,o=t.length;s<o;s++)t[s].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let s=0,o=t.length;s<o;s++){const l=t[s];(l.matrixWorldAutoUpdate===!0||e===!0)&&l.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const s=this.parent;if(e===!0&&s!==null&&s.matrixWorldAutoUpdate===!0&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const o=this.children;for(let l=0,u=o.length;l<u;l++){const d=o[l];d.matrixWorldAutoUpdate===!0&&d.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",s={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const o={};o.uuid=this.uuid,o.type=this.type,this.name!==""&&(o.name=this.name),this.castShadow===!0&&(o.castShadow=!0),this.receiveShadow===!0&&(o.receiveShadow=!0),this.visible===!1&&(o.visible=!1),this.frustumCulled===!1&&(o.frustumCulled=!1),this.renderOrder!==0&&(o.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(o.matrixAutoUpdate=!1),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.visibility=this._visibility,o.active=this._active,o.bounds=this._bounds.map(d=>({boxInitialized:d.boxInitialized,boxMin:d.box.min.toArray(),boxMax:d.box.max.toArray(),sphereInitialized:d.sphereInitialized,sphereRadius:d.sphere.radius,sphereCenter:d.sphere.center.toArray()})),o.maxGeometryCount=this._maxGeometryCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.geometryCount=this._geometryCount,o.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(o.boundingSphere={center:o.boundingSphere.center.toArray(),radius:o.boundingSphere.radius}),this.boundingBox!==null&&(o.boundingBox={min:o.boundingBox.min.toArray(),max:o.boundingBox.max.toArray()}));function l(d,f){return d[f.uuid]===void 0&&(d[f.uuid]=f.toJSON(e)),f.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=l(e.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const f=d.shapes;if(Array.isArray(f))for(let h=0,m=f.length;h<m;h++){const g=f[h];l(e.shapes,g)}else l(e.shapes,f)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(l(e.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let f=0,h=this.material.length;f<h;f++)d.push(l(e.materials,this.material[f]));o.material=d}else o.material=l(e.materials,this.material);if(this.children.length>0){o.children=[];for(let d=0;d<this.children.length;d++)o.children.push(this.children[d].toJSON(e).object)}if(this.animations.length>0){o.animations=[];for(let d=0;d<this.animations.length;d++){const f=this.animations[d];o.animations.push(l(e.animations,f))}}if(t){const d=u(e.geometries),f=u(e.materials),h=u(e.textures),m=u(e.images),g=u(e.shapes),_=u(e.skeletons),S=u(e.animations),T=u(e.nodes);d.length>0&&(s.geometries=d),f.length>0&&(s.materials=f),h.length>0&&(s.textures=h),m.length>0&&(s.images=m),g.length>0&&(s.shapes=g),_.length>0&&(s.skeletons=_),S.length>0&&(s.animations=S),T.length>0&&(s.nodes=T)}return s.object=o,s;function u(d){const f=[];for(const h in d){const m=d[h];delete m.metadata,f.push(m)}return f}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let s=0;s<e.children.length;s++){const o=e.children[s];this.add(o.clone())}return this}}un.DEFAULT_UP=new le(0,1,0);un.DEFAULT_MATRIX_AUTO_UPDATE=!0;un.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const gi=new le,Gi=new le,ad=new le,Vi=new le,Bs=new le,zs=new le,Lm=new le,ld=new le,cd=new le,ud=new le;let bl=!1;class vi{constructor(e=new le,t=new le,s=new le){this.a=e,this.b=t,this.c=s}static getNormal(e,t,s,o){o.subVectors(s,t),gi.subVectors(e,t),o.cross(gi);const l=o.lengthSq();return l>0?o.multiplyScalar(1/Math.sqrt(l)):o.set(0,0,0)}static getBarycoord(e,t,s,o,l){gi.subVectors(o,t),Gi.subVectors(s,t),ad.subVectors(e,t);const u=gi.dot(gi),d=gi.dot(Gi),f=gi.dot(ad),h=Gi.dot(Gi),m=Gi.dot(ad),g=u*h-d*d;if(g===0)return l.set(0,0,0),null;const _=1/g,S=(h*f-d*m)*_,T=(u*m-d*f)*_;return l.set(1-S-T,T,S)}static containsPoint(e,t,s,o){return this.getBarycoord(e,t,s,o,Vi)===null?!1:Vi.x>=0&&Vi.y>=0&&Vi.x+Vi.y<=1}static getUV(e,t,s,o,l,u,d,f){return bl===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),bl=!0),this.getInterpolation(e,t,s,o,l,u,d,f)}static getInterpolation(e,t,s,o,l,u,d,f){return this.getBarycoord(e,t,s,o,Vi)===null?(f.x=0,f.y=0,"z"in f&&(f.z=0),"w"in f&&(f.w=0),null):(f.setScalar(0),f.addScaledVector(l,Vi.x),f.addScaledVector(u,Vi.y),f.addScaledVector(d,Vi.z),f)}static isFrontFacing(e,t,s,o){return gi.subVectors(s,t),Gi.subVectors(e,t),gi.cross(Gi).dot(o)<0}set(e,t,s){return this.a.copy(e),this.b.copy(t),this.c.copy(s),this}setFromPointsAndIndices(e,t,s,o){return this.a.copy(e[t]),this.b.copy(e[s]),this.c.copy(e[o]),this}setFromAttributeAndIndices(e,t,s,o){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,s),this.c.fromBufferAttribute(e,o),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return gi.subVectors(this.c,this.b),Gi.subVectors(this.a,this.b),gi.cross(Gi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return vi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return vi.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,s,o,l){return bl===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),bl=!0),vi.getInterpolation(e,this.a,this.b,this.c,t,s,o,l)}getInterpolation(e,t,s,o,l){return vi.getInterpolation(e,this.a,this.b,this.c,t,s,o,l)}containsPoint(e){return vi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return vi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const s=this.a,o=this.b,l=this.c;let u,d;Bs.subVectors(o,s),zs.subVectors(l,s),ld.subVectors(e,s);const f=Bs.dot(ld),h=zs.dot(ld);if(f<=0&&h<=0)return t.copy(s);cd.subVectors(e,o);const m=Bs.dot(cd),g=zs.dot(cd);if(m>=0&&g<=m)return t.copy(o);const _=f*g-m*h;if(_<=0&&f>=0&&m<=0)return u=f/(f-m),t.copy(s).addScaledVector(Bs,u);ud.subVectors(e,l);const S=Bs.dot(ud),T=zs.dot(ud);if(T>=0&&S<=T)return t.copy(l);const M=S*h-f*T;if(M<=0&&h>=0&&T<=0)return d=h/(h-T),t.copy(s).addScaledVector(zs,d);const x=m*T-S*g;if(x<=0&&g-m>=0&&S-T>=0)return Lm.subVectors(l,o),d=(g-m)/(g-m+(S-T)),t.copy(o).addScaledVector(Lm,d);const y=1/(x+M+_);return u=M*y,d=_*y,t.copy(s).addScaledVector(Bs,u).addScaledVector(zs,d)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const qg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Sr={h:0,s:0,l:0},Rl={h:0,s:0,l:0};function dd(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class Mt{constructor(e,t,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,s)}set(e,t,s){if(t===void 0&&s===void 0){const o=e;o&&o.isColor?this.copy(o):typeof o=="number"?this.setHex(o):typeof o=="string"&&this.setStyle(o)}else this.setRGB(e,t,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=cn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,bt.toWorkingColorSpace(this,t),this}setRGB(e,t,s,o=bt.workingColorSpace){return this.r=e,this.g=t,this.b=s,bt.toWorkingColorSpace(this,o),this}setHSL(e,t,s,o=bt.workingColorSpace){if(e=Ry(e,1),t=Fn(t,0,1),s=Fn(s,0,1),t===0)this.r=this.g=this.b=s;else{const l=s<=.5?s*(1+t):s+t-s*t,u=2*s-l;this.r=dd(u,l,e+1/3),this.g=dd(u,l,e),this.b=dd(u,l,e-1/3)}return bt.toWorkingColorSpace(this,o),this}setStyle(e,t=cn){function s(l){l!==void 0&&parseFloat(l)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let o;if(o=/^(\w+)\(([^\)]*)\)/.exec(e)){let l;const u=o[1],d=o[2];switch(u){case"rgb":case"rgba":if(l=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(l[4]),this.setRGB(Math.min(255,parseInt(l[1],10))/255,Math.min(255,parseInt(l[2],10))/255,Math.min(255,parseInt(l[3],10))/255,t);if(l=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(l[4]),this.setRGB(Math.min(100,parseInt(l[1],10))/100,Math.min(100,parseInt(l[2],10))/100,Math.min(100,parseInt(l[3],10))/100,t);break;case"hsl":case"hsla":if(l=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(l[4]),this.setHSL(parseFloat(l[1])/360,parseFloat(l[2])/100,parseFloat(l[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(o=/^\#([A-Fa-f\d]+)$/.exec(e)){const l=o[1],u=l.length;if(u===3)return this.setRGB(parseInt(l.charAt(0),16)/15,parseInt(l.charAt(1),16)/15,parseInt(l.charAt(2),16)/15,t);if(u===6)return this.setHex(parseInt(l,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=cn){const s=qg[e.toLowerCase()];return s!==void 0?this.setHex(s,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Qs(e.r),this.g=Qs(e.g),this.b=Qs(e.b),this}copyLinearToSRGB(e){return this.r=Ju(e.r),this.g=Ju(e.g),this.b=Ju(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=cn){return bt.fromWorkingColorSpace(vn.copy(this),e),Math.round(Fn(vn.r*255,0,255))*65536+Math.round(Fn(vn.g*255,0,255))*256+Math.round(Fn(vn.b*255,0,255))}getHexString(e=cn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=bt.workingColorSpace){bt.fromWorkingColorSpace(vn.copy(this),t);const s=vn.r,o=vn.g,l=vn.b,u=Math.max(s,o,l),d=Math.min(s,o,l);let f,h;const m=(d+u)/2;if(d===u)f=0,h=0;else{const g=u-d;switch(h=m<=.5?g/(u+d):g/(2-u-d),u){case s:f=(o-l)/g+(o<l?6:0);break;case o:f=(l-s)/g+2;break;case l:f=(s-o)/g+4;break}f/=6}return e.h=f,e.s=h,e.l=m,e}getRGB(e,t=bt.workingColorSpace){return bt.fromWorkingColorSpace(vn.copy(this),t),e.r=vn.r,e.g=vn.g,e.b=vn.b,e}getStyle(e=cn){bt.fromWorkingColorSpace(vn.copy(this),e);const t=vn.r,s=vn.g,o=vn.b;return e!==cn?`color(${e} ${t.toFixed(3)} ${s.toFixed(3)} ${o.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(s*255)},${Math.round(o*255)})`}offsetHSL(e,t,s){return this.getHSL(Sr),this.setHSL(Sr.h+e,Sr.s+t,Sr.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,s){return this.r=e.r+(t.r-e.r)*s,this.g=e.g+(t.g-e.g)*s,this.b=e.b+(t.b-e.b)*s,this}lerpHSL(e,t){this.getHSL(Sr),e.getHSL(Rl);const s=Zu(Sr.h,Rl.h,t),o=Zu(Sr.s,Rl.s,t),l=Zu(Sr.l,Rl.l,t);return this.setHSL(s,o,l),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,s=this.g,o=this.b,l=e.elements;return this.r=l[0]*t+l[3]*s+l[6]*o,this.g=l[1]*t+l[4]*s+l[7]*o,this.b=l[2]*t+l[5]*s+l[8]*o,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const vn=new Mt;Mt.NAMES=qg;let jy=0;class ca extends ao{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:jy++}),this.uuid=oa(),this.name="",this.type="Material",this.blending=Zs,this.side=br,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ad,this.blendDst=Cd,this.blendEquation=Jr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Mt(0,0,0),this.blendAlpha=0,this.depthFunc=Wl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=gm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ds,this.stencilZFail=Ds,this.stencilZPass=Ds,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const s=e[t];if(s===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const o=this[t];if(o===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}o&&o.isColor?o.set(s):o&&o.isVector3&&s&&s.isVector3?o.copy(s):this[t]=s}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const s={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(e).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(e).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(e).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(e).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(e).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==Zs&&(s.blending=this.blending),this.side!==br&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==Ad&&(s.blendSrc=this.blendSrc),this.blendDst!==Cd&&(s.blendDst=this.blendDst),this.blendEquation!==Jr&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==Wl&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==gm&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ds&&(s.stencilFail=this.stencilFail),this.stencilZFail!==Ds&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==Ds&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function o(l){const u=[];for(const d in l){const f=l[d];delete f.metadata,u.push(f)}return u}if(t){const l=o(e.textures),u=o(e.images);l.length>0&&(s.textures=l),u.length>0&&(s.images=u)}return s}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let s=null;if(t!==null){const o=t.length;s=new Array(o);for(let l=0;l!==o;++l)s[l]=t[l].clone()}return this.clippingPlanes=s,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class $g extends ca{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Mt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Pg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const jt=new le,Ll=new Tt;class Ai{constructor(e,t,s=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=s,this.usage=vm,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Tr,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,s){e*=this.itemSize,s*=t.itemSize;for(let o=0,l=this.itemSize;o<l;o++)this.array[e+o]=t.array[s+o];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,s=this.count;t<s;t++)Ll.fromBufferAttribute(this,t),Ll.applyMatrix3(e),this.setXY(t,Ll.x,Ll.y);else if(this.itemSize===3)for(let t=0,s=this.count;t<s;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix3(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyMatrix4(e){for(let t=0,s=this.count;t<s;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix4(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyNormalMatrix(e){for(let t=0,s=this.count;t<s;t++)jt.fromBufferAttribute(this,t),jt.applyNormalMatrix(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}transformDirection(e){for(let t=0,s=this.count;t<s;t++)jt.fromBufferAttribute(this,t),jt.transformDirection(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let s=this.array[e*this.itemSize+t];return this.normalized&&(s=jo(s,this.array)),s}setComponent(e,t,s){return this.normalized&&(s=Un(s,this.array)),this.array[e*this.itemSize+t]=s,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=jo(t,this.array)),t}setX(e,t){return this.normalized&&(t=Un(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=jo(t,this.array)),t}setY(e,t){return this.normalized&&(t=Un(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=jo(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Un(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=jo(t,this.array)),t}setW(e,t){return this.normalized&&(t=Un(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,s){return e*=this.itemSize,this.normalized&&(t=Un(t,this.array),s=Un(s,this.array)),this.array[e+0]=t,this.array[e+1]=s,this}setXYZ(e,t,s,o){return e*=this.itemSize,this.normalized&&(t=Un(t,this.array),s=Un(s,this.array),o=Un(o,this.array)),this.array[e+0]=t,this.array[e+1]=s,this.array[e+2]=o,this}setXYZW(e,t,s,o,l){return e*=this.itemSize,this.normalized&&(t=Un(t,this.array),s=Un(s,this.array),o=Un(o,this.array),l=Un(l,this.array)),this.array[e+0]=t,this.array[e+1]=s,this.array[e+2]=o,this.array[e+3]=l,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==vm&&(e.usage=this.usage),e}}class Kg extends Ai{constructor(e,t,s){super(new Uint16Array(e),t,s)}}class Zg extends Ai{constructor(e,t,s){super(new Uint32Array(e),t,s)}}class Ci extends Ai{constructor(e,t,s){super(new Float32Array(e),t,s)}}let Xy=0;const ni=new Kt,fd=new un,Hs=new le,Xn=new la,$o=new la,rn=new le;class Lr extends ao{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Xy++}),this.uuid=oa(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Vg(e)?Zg:Kg)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,s=0){this.groups.push({start:e,count:t,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const l=new gt().getNormalMatrix(e);s.applyNormalMatrix(l),s.needsUpdate=!0}const o=this.attributes.tangent;return o!==void 0&&(o.transformDirection(e),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ni.makeRotationFromQuaternion(e),this.applyMatrix4(ni),this}rotateX(e){return ni.makeRotationX(e),this.applyMatrix4(ni),this}rotateY(e){return ni.makeRotationY(e),this.applyMatrix4(ni),this}rotateZ(e){return ni.makeRotationZ(e),this.applyMatrix4(ni),this}translate(e,t,s){return ni.makeTranslation(e,t,s),this.applyMatrix4(ni),this}scale(e,t,s){return ni.makeScale(e,t,s),this.applyMatrix4(ni),this}lookAt(e){return fd.lookAt(e),fd.updateMatrix(),this.applyMatrix4(fd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hs).negate(),this.translate(Hs.x,Hs.y,Hs.z),this}setFromPoints(e){const t=[];for(let s=0,o=e.length;s<o;s++){const l=e[s];t.push(l.x,l.y,l.z||0)}return this.setAttribute("position",new Ci(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new la);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new le(-1/0,-1/0,-1/0),new le(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const l=t[s];Xn.setFromBufferAttribute(l),this.morphTargetsRelative?(rn.addVectors(this.boundingBox.min,Xn.min),this.boundingBox.expandByPoint(rn),rn.addVectors(this.boundingBox.max,Xn.max),this.boundingBox.expandByPoint(rn)):(this.boundingBox.expandByPoint(Xn.min),this.boundingBox.expandByPoint(Xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gd);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new le,1/0);return}if(e){const s=this.boundingSphere.center;if(Xn.setFromBufferAttribute(e),t)for(let l=0,u=t.length;l<u;l++){const d=t[l];$o.setFromBufferAttribute(d),this.morphTargetsRelative?(rn.addVectors(Xn.min,$o.min),Xn.expandByPoint(rn),rn.addVectors(Xn.max,$o.max),Xn.expandByPoint(rn)):(Xn.expandByPoint($o.min),Xn.expandByPoint($o.max))}Xn.getCenter(s);let o=0;for(let l=0,u=e.count;l<u;l++)rn.fromBufferAttribute(e,l),o=Math.max(o,s.distanceToSquared(rn));if(t)for(let l=0,u=t.length;l<u;l++){const d=t[l],f=this.morphTargetsRelative;for(let h=0,m=d.count;h<m;h++)rn.fromBufferAttribute(d,h),f&&(Hs.fromBufferAttribute(e,h),rn.add(Hs)),o=Math.max(o,s.distanceToSquared(rn))}this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=e.array,o=t.position.array,l=t.normal.array,u=t.uv.array,d=o.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ai(new Float32Array(4*d),4));const f=this.getAttribute("tangent").array,h=[],m=[];for(let R=0;R<d;R++)h[R]=new le,m[R]=new le;const g=new le,_=new le,S=new le,T=new Tt,M=new Tt,x=new Tt,y=new le,w=new le;function b(R,ie,ue){g.fromArray(o,R*3),_.fromArray(o,ie*3),S.fromArray(o,ue*3),T.fromArray(u,R*2),M.fromArray(u,ie*2),x.fromArray(u,ue*2),_.sub(g),S.sub(g),M.sub(T),x.sub(T);const de=1/(M.x*x.y-x.x*M.y);isFinite(de)&&(y.copy(_).multiplyScalar(x.y).addScaledVector(S,-M.y).multiplyScalar(de),w.copy(S).multiplyScalar(M.x).addScaledVector(_,-x.x).multiplyScalar(de),h[R].add(y),h[ie].add(y),h[ue].add(y),m[R].add(w),m[ie].add(w),m[ue].add(w))}let P=this.groups;P.length===0&&(P=[{start:0,count:s.length}]);for(let R=0,ie=P.length;R<ie;++R){const ue=P[R],de=ue.start,B=ue.count;for(let V=de,$=de+B;V<$;V+=3)b(s[V+0],s[V+1],s[V+2])}const z=new le,k=new le,N=new le,oe=new le;function A(R){N.fromArray(l,R*3),oe.copy(N);const ie=h[R];z.copy(ie),z.sub(N.multiplyScalar(N.dot(ie))).normalize(),k.crossVectors(oe,ie);const de=k.dot(m[R])<0?-1:1;f[R*4]=z.x,f[R*4+1]=z.y,f[R*4+2]=z.z,f[R*4+3]=de}for(let R=0,ie=P.length;R<ie;++R){const ue=P[R],de=ue.start,B=ue.count;for(let V=de,$=de+B;V<$;V+=3)A(s[V+0]),A(s[V+1]),A(s[V+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new Ai(new Float32Array(t.count*3),3),this.setAttribute("normal",s);else for(let _=0,S=s.count;_<S;_++)s.setXYZ(_,0,0,0);const o=new le,l=new le,u=new le,d=new le,f=new le,h=new le,m=new le,g=new le;if(e)for(let _=0,S=e.count;_<S;_+=3){const T=e.getX(_+0),M=e.getX(_+1),x=e.getX(_+2);o.fromBufferAttribute(t,T),l.fromBufferAttribute(t,M),u.fromBufferAttribute(t,x),m.subVectors(u,l),g.subVectors(o,l),m.cross(g),d.fromBufferAttribute(s,T),f.fromBufferAttribute(s,M),h.fromBufferAttribute(s,x),d.add(m),f.add(m),h.add(m),s.setXYZ(T,d.x,d.y,d.z),s.setXYZ(M,f.x,f.y,f.z),s.setXYZ(x,h.x,h.y,h.z)}else for(let _=0,S=t.count;_<S;_+=3)o.fromBufferAttribute(t,_+0),l.fromBufferAttribute(t,_+1),u.fromBufferAttribute(t,_+2),m.subVectors(u,l),g.subVectors(o,l),m.cross(g),s.setXYZ(_+0,m.x,m.y,m.z),s.setXYZ(_+1,m.x,m.y,m.z),s.setXYZ(_+2,m.x,m.y,m.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,s=e.count;t<s;t++)rn.fromBufferAttribute(e,t),rn.normalize(),e.setXYZ(t,rn.x,rn.y,rn.z)}toNonIndexed(){function e(d,f){const h=d.array,m=d.itemSize,g=d.normalized,_=new h.constructor(f.length*m);let S=0,T=0;for(let M=0,x=f.length;M<x;M++){d.isInterleavedBufferAttribute?S=f[M]*d.data.stride+d.offset:S=f[M]*m;for(let y=0;y<m;y++)_[T++]=h[S++]}return new Ai(_,m,g)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Lr,s=this.index.array,o=this.attributes;for(const d in o){const f=o[d],h=e(f,s);t.setAttribute(d,h)}const l=this.morphAttributes;for(const d in l){const f=[],h=l[d];for(let m=0,g=h.length;m<g;m++){const _=h[m],S=e(_,s);f.push(S)}t.morphAttributes[d]=f}t.morphTargetsRelative=this.morphTargetsRelative;const u=this.groups;for(let d=0,f=u.length;d<f;d++){const h=u[d];t.addGroup(h.start,h.count,h.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const f=this.parameters;for(const h in f)f[h]!==void 0&&(e[h]=f[h]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const s=this.attributes;for(const f in s){const h=s[f];e.data.attributes[f]=h.toJSON(e.data)}const o={};let l=!1;for(const f in this.morphAttributes){const h=this.morphAttributes[f],m=[];for(let g=0,_=h.length;g<_;g++){const S=h[g];m.push(S.toJSON(e.data))}m.length>0&&(o[f]=m,l=!0)}l&&(e.data.morphAttributes=o,e.data.morphTargetsRelative=this.morphTargetsRelative);const u=this.groups;u.length>0&&(e.data.groups=JSON.parse(JSON.stringify(u)));const d=this.boundingSphere;return d!==null&&(e.data.boundingSphere={center:d.center.toArray(),radius:d.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const s=e.index;s!==null&&this.setIndex(s.clone(t));const o=e.attributes;for(const h in o){const m=o[h];this.setAttribute(h,m.clone(t))}const l=e.morphAttributes;for(const h in l){const m=[],g=l[h];for(let _=0,S=g.length;_<S;_++)m.push(g[_].clone(t));this.morphAttributes[h]=m}this.morphTargetsRelative=e.morphTargetsRelative;const u=e.groups;for(let h=0,m=u.length;h<m;h++){const g=u[h];this.addGroup(g.start,g.count,g.materialIndex)}const d=e.boundingBox;d!==null&&(this.boundingBox=d.clone());const f=e.boundingSphere;return f!==null&&(this.boundingSphere=f.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Pm=new Kt,$r=new Fy,Pl=new Gd,Dm=new le,Gs=new le,Vs=new le,Ws=new le,hd=new le,Dl=new le,Il=new Tt,Nl=new Tt,Ul=new Tt,Im=new le,Nm=new le,Um=new le,Ol=new le,Fl=new le;class qi extends un{constructor(e=new Lr,t=new $g){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,s=Object.keys(t);if(s.length>0){const o=t[s[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,u=o.length;l<u;l++){const d=o[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=l}}}}getVertexPosition(e,t){const s=this.geometry,o=s.attributes.position,l=s.morphAttributes.position,u=s.morphTargetsRelative;t.fromBufferAttribute(o,e);const d=this.morphTargetInfluences;if(l&&d){Dl.set(0,0,0);for(let f=0,h=l.length;f<h;f++){const m=d[f],g=l[f];m!==0&&(hd.fromBufferAttribute(g,e),u?Dl.addScaledVector(hd,m):Dl.addScaledVector(hd.sub(t),m))}t.add(Dl)}return t}raycast(e,t){const s=this.geometry,o=this.material,l=this.matrixWorld;o!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),Pl.copy(s.boundingSphere),Pl.applyMatrix4(l),$r.copy(e.ray).recast(e.near),!(Pl.containsPoint($r.origin)===!1&&($r.intersectSphere(Pl,Dm)===null||$r.origin.distanceToSquared(Dm)>(e.far-e.near)**2))&&(Pm.copy(l).invert(),$r.copy(e.ray).applyMatrix4(Pm),!(s.boundingBox!==null&&$r.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(e,t,$r)))}_computeIntersections(e,t,s){let o;const l=this.geometry,u=this.material,d=l.index,f=l.attributes.position,h=l.attributes.uv,m=l.attributes.uv1,g=l.attributes.normal,_=l.groups,S=l.drawRange;if(d!==null)if(Array.isArray(u))for(let T=0,M=_.length;T<M;T++){const x=_[T],y=u[x.materialIndex],w=Math.max(x.start,S.start),b=Math.min(d.count,Math.min(x.start+x.count,S.start+S.count));for(let P=w,z=b;P<z;P+=3){const k=d.getX(P),N=d.getX(P+1),oe=d.getX(P+2);o=kl(this,y,e,s,h,m,g,k,N,oe),o&&(o.faceIndex=Math.floor(P/3),o.face.materialIndex=x.materialIndex,t.push(o))}}else{const T=Math.max(0,S.start),M=Math.min(d.count,S.start+S.count);for(let x=T,y=M;x<y;x+=3){const w=d.getX(x),b=d.getX(x+1),P=d.getX(x+2);o=kl(this,u,e,s,h,m,g,w,b,P),o&&(o.faceIndex=Math.floor(x/3),t.push(o))}}else if(f!==void 0)if(Array.isArray(u))for(let T=0,M=_.length;T<M;T++){const x=_[T],y=u[x.materialIndex],w=Math.max(x.start,S.start),b=Math.min(f.count,Math.min(x.start+x.count,S.start+S.count));for(let P=w,z=b;P<z;P+=3){const k=P,N=P+1,oe=P+2;o=kl(this,y,e,s,h,m,g,k,N,oe),o&&(o.faceIndex=Math.floor(P/3),o.face.materialIndex=x.materialIndex,t.push(o))}}else{const T=Math.max(0,S.start),M=Math.min(f.count,S.start+S.count);for(let x=T,y=M;x<y;x+=3){const w=x,b=x+1,P=x+2;o=kl(this,u,e,s,h,m,g,w,b,P),o&&(o.faceIndex=Math.floor(x/3),t.push(o))}}}}function Yy(r,e,t,s,o,l,u,d){let f;if(e.side===kn?f=s.intersectTriangle(u,l,o,!0,d):f=s.intersectTriangle(o,l,u,e.side===br,d),f===null)return null;Fl.copy(d),Fl.applyMatrix4(r.matrixWorld);const h=t.ray.origin.distanceTo(Fl);return h<t.near||h>t.far?null:{distance:h,point:Fl.clone(),object:r}}function kl(r,e,t,s,o,l,u,d,f,h){r.getVertexPosition(d,Gs),r.getVertexPosition(f,Vs),r.getVertexPosition(h,Ws);const m=Yy(r,e,t,s,Gs,Vs,Ws,Ol);if(m){o&&(Il.fromBufferAttribute(o,d),Nl.fromBufferAttribute(o,f),Ul.fromBufferAttribute(o,h),m.uv=vi.getInterpolation(Ol,Gs,Vs,Ws,Il,Nl,Ul,new Tt)),l&&(Il.fromBufferAttribute(l,d),Nl.fromBufferAttribute(l,f),Ul.fromBufferAttribute(l,h),m.uv1=vi.getInterpolation(Ol,Gs,Vs,Ws,Il,Nl,Ul,new Tt),m.uv2=m.uv1),u&&(Im.fromBufferAttribute(u,d),Nm.fromBufferAttribute(u,f),Um.fromBufferAttribute(u,h),m.normal=vi.getInterpolation(Ol,Gs,Vs,Ws,Im,Nm,Um,new le),m.normal.dot(s.direction)>0&&m.normal.multiplyScalar(-1));const g={a:d,b:f,c:h,normal:new le,materialIndex:0};vi.getNormal(Gs,Vs,Ws,g.normal),m.face=g}return m}class ua extends Lr{constructor(e=1,t=1,s=1,o=1,l=1,u=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:s,widthSegments:o,heightSegments:l,depthSegments:u};const d=this;o=Math.floor(o),l=Math.floor(l),u=Math.floor(u);const f=[],h=[],m=[],g=[];let _=0,S=0;T("z","y","x",-1,-1,s,t,e,u,l,0),T("z","y","x",1,-1,s,t,-e,u,l,1),T("x","z","y",1,1,e,s,t,o,u,2),T("x","z","y",1,-1,e,s,-t,o,u,3),T("x","y","z",1,-1,e,t,s,o,l,4),T("x","y","z",-1,-1,e,t,-s,o,l,5),this.setIndex(f),this.setAttribute("position",new Ci(h,3)),this.setAttribute("normal",new Ci(m,3)),this.setAttribute("uv",new Ci(g,2));function T(M,x,y,w,b,P,z,k,N,oe,A){const R=P/N,ie=z/oe,ue=P/2,de=z/2,B=k/2,V=N+1,$=oe+1;let Q=0,U=0;const Y=new le;for(let H=0;H<$;H++){const I=H*ie-de;for(let G=0;G<V;G++){const j=G*R-ue;Y[M]=j*w,Y[x]=I*b,Y[y]=B,h.push(Y.x,Y.y,Y.z),Y[M]=0,Y[x]=0,Y[y]=k>0?1:-1,m.push(Y.x,Y.y,Y.z),g.push(G/N),g.push(1-H/oe),Q+=1}}for(let H=0;H<oe;H++)for(let I=0;I<N;I++){const G=_+I+V*H,j=_+I+V*(H+1),Z=_+(I+1)+V*(H+1),fe=_+(I+1)+V*H;f.push(G,j,fe),f.push(j,Z,fe),U+=6}d.addGroup(S,U,A),S+=U,_+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ua(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ro(r){const e={};for(const t in r){e[t]={};for(const s in r[t]){const o=r[t][s];o&&(o.isColor||o.isMatrix3||o.isMatrix4||o.isVector2||o.isVector3||o.isVector4||o.isTexture||o.isQuaternion)?o.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][s]=null):e[t][s]=o.clone():Array.isArray(o)?e[t][s]=o.slice():e[t][s]=o}}return e}function Tn(r){const e={};for(let t=0;t<r.length;t++){const s=ro(r[t]);for(const o in s)e[o]=s[o]}return e}function qy(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Qg(r){return r.getRenderTarget()===null?r.outputColorSpace:bt.workingColorSpace}const $y={clone:ro,merge:Tn};var Ky=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Zy=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class as extends ca{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ky,this.fragmentShader=Zy,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ro(e.uniforms),this.uniformsGroups=qy(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const o in this.uniforms){const u=this.uniforms[o].value;u&&u.isTexture?t.uniforms[o]={type:"t",value:u.toJSON(e).uuid}:u&&u.isColor?t.uniforms[o]={type:"c",value:u.getHex()}:u&&u.isVector2?t.uniforms[o]={type:"v2",value:u.toArray()}:u&&u.isVector3?t.uniforms[o]={type:"v3",value:u.toArray()}:u&&u.isVector4?t.uniforms[o]={type:"v4",value:u.toArray()}:u&&u.isMatrix3?t.uniforms[o]={type:"m3",value:u.toArray()}:u&&u.isMatrix4?t.uniforms[o]={type:"m4",value:u.toArray()}:t.uniforms[o]={value:u}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const s={};for(const o in this.extensions)this.extensions[o]===!0&&(s[o]=!0);return Object.keys(s).length>0&&(t.extensions=s),t}}class Jg extends un{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Kt,this.projectionMatrix=new Kt,this.projectionMatrixInverse=new Kt,this.coordinateSystem=Yi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class ri extends Jg{constructor(e=50,t=1,s=.1,o=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=o,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Dd*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ku*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Dd*2*Math.atan(Math.tan(Ku*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,s,o,l,u){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=s,this.view.offsetY=o,this.view.width=l,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ku*.5*this.fov)/this.zoom,s=2*t,o=this.aspect*s,l=-.5*o;const u=this.view;if(this.view!==null&&this.view.enabled){const f=u.fullWidth,h=u.fullHeight;l+=u.offsetX*o/f,t-=u.offsetY*s/h,o*=u.width/f,s*=u.height/h}const d=this.filmOffset;d!==0&&(l+=e*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(l,l+o,t,t-s,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const js=-90,Xs=1;class Qy extends un{constructor(e,t,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const o=new ri(js,Xs,e,t);o.layers=this.layers,this.add(o);const l=new ri(js,Xs,e,t);l.layers=this.layers,this.add(l);const u=new ri(js,Xs,e,t);u.layers=this.layers,this.add(u);const d=new ri(js,Xs,e,t);d.layers=this.layers,this.add(d);const f=new ri(js,Xs,e,t);f.layers=this.layers,this.add(f);const h=new ri(js,Xs,e,t);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[s,o,l,u,d,f]=t;for(const h of t)this.remove(h);if(e===Yi)s.up.set(0,1,0),s.lookAt(1,0,0),o.up.set(0,1,0),o.lookAt(-1,0,0),l.up.set(0,0,-1),l.lookAt(0,1,0),u.up.set(0,0,1),u.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),f.up.set(0,1,0),f.lookAt(0,0,-1);else if(e===$l)s.up.set(0,-1,0),s.lookAt(-1,0,0),o.up.set(0,-1,0),o.lookAt(1,0,0),l.up.set(0,0,1),l.lookAt(0,1,0),u.up.set(0,0,-1),u.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),f.up.set(0,-1,0),f.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const h of t)this.add(h),h.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:o}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[l,u,d,f,h,m]=this.children,g=e.getRenderTarget(),_=e.getActiveCubeFace(),S=e.getActiveMipmapLevel(),T=e.xr.enabled;e.xr.enabled=!1;const M=s.texture.generateMipmaps;s.texture.generateMipmaps=!1,e.setRenderTarget(s,0,o),e.render(t,l),e.setRenderTarget(s,1,o),e.render(t,u),e.setRenderTarget(s,2,o),e.render(t,d),e.setRenderTarget(s,3,o),e.render(t,f),e.setRenderTarget(s,4,o),e.render(t,h),s.texture.generateMipmaps=M,e.setRenderTarget(s,5,o),e.render(t,m),e.setRenderTarget(g,_,S),e.xr.enabled=T,s.texture.needsPMREMUpdate=!0}}class e0 extends Bn{constructor(e,t,s,o,l,u,d,f,h,m){e=e!==void 0?e:[],t=t!==void 0?t:eo,super(e,t,s,o,l,u,d,f,h,m),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Jy extends os{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const s={width:e,height:e,depth:1},o=[s,s,s,s,s,s];t.encoding!==void 0&&(Ko("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===ss?cn:oi),this.texture=new e0(o,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Yn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},o=new ua(5,5,5),l=new as({name:"CubemapFromEquirect",uniforms:ro(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:kn,blending:wr});l.uniforms.tEquirect.value=t;const u=new qi(o,l),d=t.minFilter;return t.minFilter===no&&(t.minFilter=Yn),new Qy(1,10,this).update(e,u),t.minFilter=d,u.geometry.dispose(),u.material.dispose(),this}clear(e,t,s,o){const l=e.getRenderTarget();for(let u=0;u<6;u++)e.setRenderTarget(this,u),e.clear(t,s,o);e.setRenderTarget(l)}}const pd=new le,eS=new le,tS=new gt;class Zr{constructor(e=new le(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,s,o){return this.normal.set(e,t,s),this.constant=o,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,s){const o=pd.subVectors(s,t).cross(eS.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(o,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const s=e.delta(pd),o=this.normal.dot(s);if(o===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const l=-(e.start.dot(this.normal)+this.constant)/o;return l<0||l>1?null:t.copy(e.start).addScaledVector(s,l)}intersectsLine(e){const t=this.distanceToPoint(e.start),s=this.distanceToPoint(e.end);return t<0&&s>0||s<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const s=t||tS.getNormalMatrix(e),o=this.coplanarPoint(pd).applyMatrix4(e),l=this.normal.applyMatrix3(s).normalize();return this.constant=-o.dot(l),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Kr=new Gd,Bl=new le;class Vd{constructor(e=new Zr,t=new Zr,s=new Zr,o=new Zr,l=new Zr,u=new Zr){this.planes=[e,t,s,o,l,u]}set(e,t,s,o,l,u){const d=this.planes;return d[0].copy(e),d[1].copy(t),d[2].copy(s),d[3].copy(o),d[4].copy(l),d[5].copy(u),this}copy(e){const t=this.planes;for(let s=0;s<6;s++)t[s].copy(e.planes[s]);return this}setFromProjectionMatrix(e,t=Yi){const s=this.planes,o=e.elements,l=o[0],u=o[1],d=o[2],f=o[3],h=o[4],m=o[5],g=o[6],_=o[7],S=o[8],T=o[9],M=o[10],x=o[11],y=o[12],w=o[13],b=o[14],P=o[15];if(s[0].setComponents(f-l,_-h,x-S,P-y).normalize(),s[1].setComponents(f+l,_+h,x+S,P+y).normalize(),s[2].setComponents(f+u,_+m,x+T,P+w).normalize(),s[3].setComponents(f-u,_-m,x-T,P-w).normalize(),s[4].setComponents(f-d,_-g,x-M,P-b).normalize(),t===Yi)s[5].setComponents(f+d,_+g,x+M,P+b).normalize();else if(t===$l)s[5].setComponents(d,g,M,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Kr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Kr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Kr)}intersectsSprite(e){return Kr.center.set(0,0,0),Kr.radius=.7071067811865476,Kr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Kr)}intersectsSphere(e){const t=this.planes,s=e.center,o=-e.radius;for(let l=0;l<6;l++)if(t[l].distanceToPoint(s)<o)return!1;return!0}intersectsBox(e){const t=this.planes;for(let s=0;s<6;s++){const o=t[s];if(Bl.x=o.normal.x>0?e.max.x:e.min.x,Bl.y=o.normal.y>0?e.max.y:e.min.y,Bl.z=o.normal.z>0?e.max.z:e.min.z,o.distanceToPoint(Bl)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let s=0;s<6;s++)if(t[s].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function t0(){let r=null,e=!1,t=null,s=null;function o(l,u){t(l,u),s=r.requestAnimationFrame(o)}return{start:function(){e!==!0&&t!==null&&(s=r.requestAnimationFrame(o),e=!0)},stop:function(){r.cancelAnimationFrame(s),e=!1},setAnimationLoop:function(l){t=l},setContext:function(l){r=l}}}function nS(r,e){const t=e.isWebGL2,s=new WeakMap;function o(h,m){const g=h.array,_=h.usage,S=g.byteLength,T=r.createBuffer();r.bindBuffer(m,T),r.bufferData(m,g,_),h.onUploadCallback();let M;if(g instanceof Float32Array)M=r.FLOAT;else if(g instanceof Uint16Array)if(h.isFloat16BufferAttribute)if(t)M=r.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else M=r.UNSIGNED_SHORT;else if(g instanceof Int16Array)M=r.SHORT;else if(g instanceof Uint32Array)M=r.UNSIGNED_INT;else if(g instanceof Int32Array)M=r.INT;else if(g instanceof Int8Array)M=r.BYTE;else if(g instanceof Uint8Array)M=r.UNSIGNED_BYTE;else if(g instanceof Uint8ClampedArray)M=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+g);return{buffer:T,type:M,bytesPerElement:g.BYTES_PER_ELEMENT,version:h.version,size:S}}function l(h,m,g){const _=m.array,S=m._updateRange,T=m.updateRanges;if(r.bindBuffer(g,h),S.count===-1&&T.length===0&&r.bufferSubData(g,0,_),T.length!==0){for(let M=0,x=T.length;M<x;M++){const y=T[M];t?r.bufferSubData(g,y.start*_.BYTES_PER_ELEMENT,_,y.start,y.count):r.bufferSubData(g,y.start*_.BYTES_PER_ELEMENT,_.subarray(y.start,y.start+y.count))}m.clearUpdateRanges()}S.count!==-1&&(t?r.bufferSubData(g,S.offset*_.BYTES_PER_ELEMENT,_,S.offset,S.count):r.bufferSubData(g,S.offset*_.BYTES_PER_ELEMENT,_.subarray(S.offset,S.offset+S.count)),S.count=-1),m.onUploadCallback()}function u(h){return h.isInterleavedBufferAttribute&&(h=h.data),s.get(h)}function d(h){h.isInterleavedBufferAttribute&&(h=h.data);const m=s.get(h);m&&(r.deleteBuffer(m.buffer),s.delete(h))}function f(h,m){if(h.isGLBufferAttribute){const _=s.get(h);(!_||_.version<h.version)&&s.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}h.isInterleavedBufferAttribute&&(h=h.data);const g=s.get(h);if(g===void 0)s.set(h,o(h,m));else if(g.version<h.version){if(g.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");l(g.buffer,h,m),g.version=h.version}}return{get:u,remove:d,update:f}}class Wd extends Lr{constructor(e=1,t=1,s=1,o=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:s,heightSegments:o};const l=e/2,u=t/2,d=Math.floor(s),f=Math.floor(o),h=d+1,m=f+1,g=e/d,_=t/f,S=[],T=[],M=[],x=[];for(let y=0;y<m;y++){const w=y*_-u;for(let b=0;b<h;b++){const P=b*g-l;T.push(P,-w,0),M.push(0,0,1),x.push(b/d),x.push(1-y/f)}}for(let y=0;y<f;y++)for(let w=0;w<d;w++){const b=w+h*y,P=w+h*(y+1),z=w+1+h*(y+1),k=w+1+h*y;S.push(b,P,k),S.push(P,z,k)}this.setIndex(S),this.setAttribute("position",new Ci(T,3)),this.setAttribute("normal",new Ci(M,3)),this.setAttribute("uv",new Ci(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wd(e.width,e.height,e.widthSegments,e.heightSegments)}}var iS=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,rS=`#ifdef USE_ALPHAHASH
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
#endif`,sS=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,oS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,aS=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,lS=`#ifdef USE_ALPHATEST
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
#endif`,uS=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,dS=`#ifdef USE_BATCHING
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
#endif`,fS=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,hS=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,pS=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,mS=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,gS=`#ifdef USE_IRIDESCENCE
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
#endif`,vS=`#ifdef USE_BUMPMAP
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
#endif`,_S=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,xS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,yS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,SS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,MS=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ES=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,TS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,wS=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,AS=`#define PI 3.141592653589793
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
} // validated`,CS=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,RS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,LS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,PS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,DS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,IS="gl_FragColor = linearToOutputTexel( gl_FragColor );",NS=`
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
}`,US=`#ifdef USE_ENVMAP
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
#endif`,OS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,FS=`#ifdef USE_ENVMAP
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
#endif`,kS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,BS=`#ifdef USE_ENVMAP
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
#endif`,zS=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,HS=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,GS=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,VS=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,WS=`#ifdef USE_GRADIENTMAP
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
}`,jS=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,XS=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,YS=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,qS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$S=`uniform bool receiveShadow;
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
#endif`,KS=`#ifdef USE_ENVMAP
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
#endif`,ZS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,QS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,JS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,eM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,tM=`PhysicalMaterial material;
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
#endif`,nM=`struct PhysicalMaterial {
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
}`,iM=`
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
#endif`,rM=`#if defined( RE_IndirectDiffuse )
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
#endif`,sM=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,oM=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,aM=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lM=`#ifdef USE_LOGDEPTHBUF
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
#endif`,uM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,dM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,fM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,hM=`#if defined( USE_POINTS_UV )
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
#endif`,pM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,mM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,gM=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,vM=`#ifdef USE_MORPHNORMALS
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
#endif`,_M=`#ifdef USE_MORPHTARGETS
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
#endif`,xM=`#ifdef USE_MORPHTARGETS
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
#endif`,yM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,SM=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,MM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,EM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,TM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,wM=`#ifdef USE_NORMALMAP
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
#endif`,AM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,CM=`#ifdef USE_CLEARCOAT_NORMALMAP
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
#endif`,RM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,LM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,PM=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,DM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,IM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,NM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,UM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,OM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,FM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,kM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,BM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,zM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,HM=`float getShadowMask() {
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
}`,GM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,VM=`#ifdef USE_SKINNING
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
#endif`,WM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,jM=`#ifdef USE_SKINNING
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
#endif`,XM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,YM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,qM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,$M=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,KM=`#ifdef USE_TRANSMISSION
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
#endif`,ZM=`#ifdef USE_TRANSMISSION
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
#endif`,QM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,JM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,eE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tE=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const nE=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,iE=`uniform sampler2D t2D;
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
}`,rE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sE=`#ifdef ENVMAP_TYPE_CUBE
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
}`,oE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,aE=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lE=`#include <common>
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
}`,uE=`#define DISTANCE
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
}`,dE=`#define DISTANCE
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
}`,fE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,hE=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pE=`uniform float scale;
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
}`,mE=`uniform vec3 diffuse;
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
}`,gE=`#include <common>
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
}`,vE=`uniform vec3 diffuse;
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
}`,_E=`#define LAMBERT
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
}`,xE=`#define LAMBERT
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
}`,yE=`#define MATCAP
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
}`,SE=`#define MATCAP
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
}`,ME=`#define NORMAL
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
}`,EE=`#define NORMAL
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
}`,TE=`#define PHONG
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
}`,wE=`#define PHONG
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
}`,AE=`#define STANDARD
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
}`,CE=`#define STANDARD
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
}`,RE=`#define TOON
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
}`,LE=`uniform float size;
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
}`,PE=`uniform vec3 diffuse;
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
}`,DE=`#include <common>
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
}`,IE=`uniform vec3 color;
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
}`,NE=`uniform float rotation;
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
}`,UE=`uniform vec3 diffuse;
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
}`,ht={alphahash_fragment:iS,alphahash_pars_fragment:rS,alphamap_fragment:sS,alphamap_pars_fragment:oS,alphatest_fragment:aS,alphatest_pars_fragment:lS,aomap_fragment:cS,aomap_pars_fragment:uS,batching_pars_vertex:dS,batching_vertex:fS,begin_vertex:hS,beginnormal_vertex:pS,bsdfs:mS,iridescence_fragment:gS,bumpmap_pars_fragment:vS,clipping_planes_fragment:_S,clipping_planes_pars_fragment:xS,clipping_planes_pars_vertex:yS,clipping_planes_vertex:SS,color_fragment:MS,color_pars_fragment:ES,color_pars_vertex:TS,color_vertex:wS,common:AS,cube_uv_reflection_fragment:CS,defaultnormal_vertex:bS,displacementmap_pars_vertex:RS,displacementmap_vertex:LS,emissivemap_fragment:PS,emissivemap_pars_fragment:DS,colorspace_fragment:IS,colorspace_pars_fragment:NS,envmap_fragment:US,envmap_common_pars_fragment:OS,envmap_pars_fragment:FS,envmap_pars_vertex:kS,envmap_physical_pars_fragment:KS,envmap_vertex:BS,fog_vertex:zS,fog_pars_vertex:HS,fog_fragment:GS,fog_pars_fragment:VS,gradientmap_pars_fragment:WS,lightmap_fragment:jS,lightmap_pars_fragment:XS,lights_lambert_fragment:YS,lights_lambert_pars_fragment:qS,lights_pars_begin:$S,lights_toon_fragment:ZS,lights_toon_pars_fragment:QS,lights_phong_fragment:JS,lights_phong_pars_fragment:eM,lights_physical_fragment:tM,lights_physical_pars_fragment:nM,lights_fragment_begin:iM,lights_fragment_maps:rM,lights_fragment_end:sM,logdepthbuf_fragment:oM,logdepthbuf_pars_fragment:aM,logdepthbuf_pars_vertex:lM,logdepthbuf_vertex:cM,map_fragment:uM,map_pars_fragment:dM,map_particle_fragment:fM,map_particle_pars_fragment:hM,metalnessmap_fragment:pM,metalnessmap_pars_fragment:mM,morphcolor_vertex:gM,morphnormal_vertex:vM,morphtarget_pars_vertex:_M,morphtarget_vertex:xM,normal_fragment_begin:yM,normal_fragment_maps:SM,normal_pars_fragment:MM,normal_pars_vertex:EM,normal_vertex:TM,normalmap_pars_fragment:wM,clearcoat_normal_fragment_begin:AM,clearcoat_normal_fragment_maps:CM,clearcoat_pars_fragment:bM,iridescence_pars_fragment:RM,opaque_fragment:LM,packing:PM,premultiplied_alpha_fragment:DM,project_vertex:IM,dithering_fragment:NM,dithering_pars_fragment:UM,roughnessmap_fragment:OM,roughnessmap_pars_fragment:FM,shadowmap_pars_fragment:kM,shadowmap_pars_vertex:BM,shadowmap_vertex:zM,shadowmask_pars_fragment:HM,skinbase_vertex:GM,skinning_pars_vertex:VM,skinning_vertex:WM,skinnormal_vertex:jM,specularmap_fragment:XM,specularmap_pars_fragment:YM,tonemapping_fragment:qM,tonemapping_pars_fragment:$M,transmission_fragment:KM,transmission_pars_fragment:ZM,uv_pars_fragment:QM,uv_pars_vertex:JM,uv_vertex:eE,worldpos_vertex:tE,background_vert:nE,background_frag:iE,backgroundCube_vert:rE,backgroundCube_frag:sE,cube_vert:oE,cube_frag:aE,depth_vert:lE,depth_frag:cE,distanceRGBA_vert:uE,distanceRGBA_frag:dE,equirect_vert:fE,equirect_frag:hE,linedashed_vert:pE,linedashed_frag:mE,meshbasic_vert:gE,meshbasic_frag:vE,meshlambert_vert:_E,meshlambert_frag:xE,meshmatcap_vert:yE,meshmatcap_frag:SE,meshnormal_vert:ME,meshnormal_frag:EE,meshphong_vert:TE,meshphong_frag:wE,meshphysical_vert:AE,meshphysical_frag:CE,meshtoon_vert:bE,meshtoon_frag:RE,points_vert:LE,points_frag:PE,shadow_vert:DE,shadow_frag:IE,sprite_vert:NE,sprite_frag:UE},Ie={common:{diffuse:{value:new Mt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new gt},alphaMap:{value:null},alphaMapTransform:{value:new gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new gt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new gt},normalScale:{value:new Tt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Mt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Mt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new gt},alphaTest:{value:0},uvTransform:{value:new gt}},sprite:{diffuse:{value:new Mt(16777215)},opacity:{value:1},center:{value:new Tt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new gt},alphaMap:{value:null},alphaMapTransform:{value:new gt},alphaTest:{value:0}}},wi={basic:{uniforms:Tn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.fog]),vertexShader:ht.meshbasic_vert,fragmentShader:ht.meshbasic_frag},lambert:{uniforms:Tn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new Mt(0)}}]),vertexShader:ht.meshlambert_vert,fragmentShader:ht.meshlambert_frag},phong:{uniforms:Tn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new Mt(0)},specular:{value:new Mt(1118481)},shininess:{value:30}}]),vertexShader:ht.meshphong_vert,fragmentShader:ht.meshphong_frag},standard:{uniforms:Tn([Ie.common,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.roughnessmap,Ie.metalnessmap,Ie.fog,Ie.lights,{emissive:{value:new Mt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag},toon:{uniforms:Tn([Ie.common,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.gradientmap,Ie.fog,Ie.lights,{emissive:{value:new Mt(0)}}]),vertexShader:ht.meshtoon_vert,fragmentShader:ht.meshtoon_frag},matcap:{uniforms:Tn([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,{matcap:{value:null}}]),vertexShader:ht.meshmatcap_vert,fragmentShader:ht.meshmatcap_frag},points:{uniforms:Tn([Ie.points,Ie.fog]),vertexShader:ht.points_vert,fragmentShader:ht.points_frag},dashed:{uniforms:Tn([Ie.common,Ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ht.linedashed_vert,fragmentShader:ht.linedashed_frag},depth:{uniforms:Tn([Ie.common,Ie.displacementmap]),vertexShader:ht.depth_vert,fragmentShader:ht.depth_frag},normal:{uniforms:Tn([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,{opacity:{value:1}}]),vertexShader:ht.meshnormal_vert,fragmentShader:ht.meshnormal_frag},sprite:{uniforms:Tn([Ie.sprite,Ie.fog]),vertexShader:ht.sprite_vert,fragmentShader:ht.sprite_frag},background:{uniforms:{uvTransform:{value:new gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ht.background_vert,fragmentShader:ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:ht.backgroundCube_vert,fragmentShader:ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ht.cube_vert,fragmentShader:ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ht.equirect_vert,fragmentShader:ht.equirect_frag},distanceRGBA:{uniforms:Tn([Ie.common,Ie.displacementmap,{referencePosition:{value:new le},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ht.distanceRGBA_vert,fragmentShader:ht.distanceRGBA_frag},shadow:{uniforms:Tn([Ie.lights,Ie.fog,{color:{value:new Mt(0)},opacity:{value:1}}]),vertexShader:ht.shadow_vert,fragmentShader:ht.shadow_frag}};wi.physical={uniforms:Tn([wi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new gt},clearcoatNormalScale:{value:new Tt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new gt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new gt},sheen:{value:0},sheenColor:{value:new Mt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new gt},transmissionSamplerSize:{value:new Tt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new gt},attenuationDistance:{value:0},attenuationColor:{value:new Mt(0)},specularColor:{value:new Mt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new gt},anisotropyVector:{value:new Tt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new gt}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag};const zl={r:0,b:0,g:0};function OE(r,e,t,s,o,l,u){const d=new Mt(0);let f=l===!0?0:1,h,m,g=null,_=0,S=null;function T(x,y){let w=!1,b=y.isScene===!0?y.background:null;b&&b.isTexture&&(b=(y.backgroundBlurriness>0?t:e).get(b)),b===null?M(d,f):b&&b.isColor&&(M(b,1),w=!0);const P=r.xr.getEnvironmentBlendMode();P==="additive"?s.buffers.color.setClear(0,0,0,1,u):P==="alpha-blend"&&s.buffers.color.setClear(0,0,0,0,u),(r.autoClear||w)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),b&&(b.isCubeTexture||b.mapping===Jl)?(m===void 0&&(m=new qi(new ua(1,1,1),new as({name:"BackgroundCubeMaterial",uniforms:ro(wi.backgroundCube.uniforms),vertexShader:wi.backgroundCube.vertexShader,fragmentShader:wi.backgroundCube.fragmentShader,side:kn,depthTest:!1,depthWrite:!1,fog:!1})),m.geometry.deleteAttribute("normal"),m.geometry.deleteAttribute("uv"),m.onBeforeRender=function(z,k,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(m.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),o.update(m)),m.material.uniforms.envMap.value=b,m.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,m.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,m.material.toneMapped=bt.getTransfer(b.colorSpace)!==It,(g!==b||_!==b.version||S!==r.toneMapping)&&(m.material.needsUpdate=!0,g=b,_=b.version,S=r.toneMapping),m.layers.enableAll(),x.unshift(m,m.geometry,m.material,0,0,null)):b&&b.isTexture&&(h===void 0&&(h=new qi(new Wd(2,2),new as({name:"BackgroundMaterial",uniforms:ro(wi.background.uniforms),vertexShader:wi.background.vertexShader,fragmentShader:wi.background.fragmentShader,side:br,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),o.update(h)),h.material.uniforms.t2D.value=b,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.toneMapped=bt.getTransfer(b.colorSpace)!==It,b.matrixAutoUpdate===!0&&b.updateMatrix(),h.material.uniforms.uvTransform.value.copy(b.matrix),(g!==b||_!==b.version||S!==r.toneMapping)&&(h.material.needsUpdate=!0,g=b,_=b.version,S=r.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null))}function M(x,y){x.getRGB(zl,Qg(r)),s.buffers.color.setClear(zl.r,zl.g,zl.b,y,u)}return{getClearColor:function(){return d},setClearColor:function(x,y=1){d.set(x),f=y,M(d,f)},getClearAlpha:function(){return f},setClearAlpha:function(x){f=x,M(d,f)},render:T}}function FE(r,e,t,s){const o=r.getParameter(r.MAX_VERTEX_ATTRIBS),l=s.isWebGL2?null:e.get("OES_vertex_array_object"),u=s.isWebGL2||l!==null,d={},f=x(null);let h=f,m=!1;function g(B,V,$,Q,U){let Y=!1;if(u){const H=M(Q,$,V);h!==H&&(h=H,S(h.object)),Y=y(B,Q,$,U),Y&&w(B,Q,$,U)}else{const H=V.wireframe===!0;(h.geometry!==Q.id||h.program!==$.id||h.wireframe!==H)&&(h.geometry=Q.id,h.program=$.id,h.wireframe=H,Y=!0)}U!==null&&t.update(U,r.ELEMENT_ARRAY_BUFFER),(Y||m)&&(m=!1,oe(B,V,$,Q),U!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(U).buffer))}function _(){return s.isWebGL2?r.createVertexArray():l.createVertexArrayOES()}function S(B){return s.isWebGL2?r.bindVertexArray(B):l.bindVertexArrayOES(B)}function T(B){return s.isWebGL2?r.deleteVertexArray(B):l.deleteVertexArrayOES(B)}function M(B,V,$){const Q=$.wireframe===!0;let U=d[B.id];U===void 0&&(U={},d[B.id]=U);let Y=U[V.id];Y===void 0&&(Y={},U[V.id]=Y);let H=Y[Q];return H===void 0&&(H=x(_()),Y[Q]=H),H}function x(B){const V=[],$=[],Q=[];for(let U=0;U<o;U++)V[U]=0,$[U]=0,Q[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:$,attributeDivisors:Q,object:B,attributes:{},index:null}}function y(B,V,$,Q){const U=h.attributes,Y=V.attributes;let H=0;const I=$.getAttributes();for(const G in I)if(I[G].location>=0){const Z=U[G];let fe=Y[G];if(fe===void 0&&(G==="instanceMatrix"&&B.instanceMatrix&&(fe=B.instanceMatrix),G==="instanceColor"&&B.instanceColor&&(fe=B.instanceColor)),Z===void 0||Z.attribute!==fe||fe&&Z.data!==fe.data)return!0;H++}return h.attributesNum!==H||h.index!==Q}function w(B,V,$,Q){const U={},Y=V.attributes;let H=0;const I=$.getAttributes();for(const G in I)if(I[G].location>=0){let Z=Y[G];Z===void 0&&(G==="instanceMatrix"&&B.instanceMatrix&&(Z=B.instanceMatrix),G==="instanceColor"&&B.instanceColor&&(Z=B.instanceColor));const fe={};fe.attribute=Z,Z&&Z.data&&(fe.data=Z.data),U[G]=fe,H++}h.attributes=U,h.attributesNum=H,h.index=Q}function b(){const B=h.newAttributes;for(let V=0,$=B.length;V<$;V++)B[V]=0}function P(B){z(B,0)}function z(B,V){const $=h.newAttributes,Q=h.enabledAttributes,U=h.attributeDivisors;$[B]=1,Q[B]===0&&(r.enableVertexAttribArray(B),Q[B]=1),U[B]!==V&&((s.isWebGL2?r:e.get("ANGLE_instanced_arrays"))[s.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](B,V),U[B]=V)}function k(){const B=h.newAttributes,V=h.enabledAttributes;for(let $=0,Q=V.length;$<Q;$++)V[$]!==B[$]&&(r.disableVertexAttribArray($),V[$]=0)}function N(B,V,$,Q,U,Y,H){H===!0?r.vertexAttribIPointer(B,V,$,U,Y):r.vertexAttribPointer(B,V,$,Q,U,Y)}function oe(B,V,$,Q){if(s.isWebGL2===!1&&(B.isInstancedMesh||Q.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;b();const U=Q.attributes,Y=$.getAttributes(),H=V.defaultAttributeValues;for(const I in Y){const G=Y[I];if(G.location>=0){let j=U[I];if(j===void 0&&(I==="instanceMatrix"&&B.instanceMatrix&&(j=B.instanceMatrix),I==="instanceColor"&&B.instanceColor&&(j=B.instanceColor)),j!==void 0){const Z=j.normalized,fe=j.itemSize,xe=t.get(j);if(xe===void 0)continue;const Ee=xe.buffer,Te=xe.type,Ne=xe.bytesPerElement,he=s.isWebGL2===!0&&(Te===r.INT||Te===r.UNSIGNED_INT||j.gpuType===Ig);if(j.isInterleavedBufferAttribute){const ve=j.data,K=ve.stride,nt=j.offset;if(ve.isInstancedInterleavedBuffer){for(let Pe=0;Pe<G.locationSize;Pe++)z(G.location+Pe,ve.meshPerAttribute);B.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=ve.meshPerAttribute*ve.count)}else for(let Pe=0;Pe<G.locationSize;Pe++)P(G.location+Pe);r.bindBuffer(r.ARRAY_BUFFER,Ee);for(let Pe=0;Pe<G.locationSize;Pe++)N(G.location+Pe,fe/G.locationSize,Te,Z,K*Ne,(nt+fe/G.locationSize*Pe)*Ne,he)}else{if(j.isInstancedBufferAttribute){for(let ve=0;ve<G.locationSize;ve++)z(G.location+ve,j.meshPerAttribute);B.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let ve=0;ve<G.locationSize;ve++)P(G.location+ve);r.bindBuffer(r.ARRAY_BUFFER,Ee);for(let ve=0;ve<G.locationSize;ve++)N(G.location+ve,fe/G.locationSize,Te,Z,fe*Ne,fe/G.locationSize*ve*Ne,he)}}else if(H!==void 0){const Z=H[I];if(Z!==void 0)switch(Z.length){case 2:r.vertexAttrib2fv(G.location,Z);break;case 3:r.vertexAttrib3fv(G.location,Z);break;case 4:r.vertexAttrib4fv(G.location,Z);break;default:r.vertexAttrib1fv(G.location,Z)}}}}k()}function A(){ue();for(const B in d){const V=d[B];for(const $ in V){const Q=V[$];for(const U in Q)T(Q[U].object),delete Q[U];delete V[$]}delete d[B]}}function R(B){if(d[B.id]===void 0)return;const V=d[B.id];for(const $ in V){const Q=V[$];for(const U in Q)T(Q[U].object),delete Q[U];delete V[$]}delete d[B.id]}function ie(B){for(const V in d){const $=d[V];if($[B.id]===void 0)continue;const Q=$[B.id];for(const U in Q)T(Q[U].object),delete Q[U];delete $[B.id]}}function ue(){de(),m=!0,h!==f&&(h=f,S(h.object))}function de(){f.geometry=null,f.program=null,f.wireframe=!1}return{setup:g,reset:ue,resetDefaultState:de,dispose:A,releaseStatesOfGeometry:R,releaseStatesOfProgram:ie,initAttributes:b,enableAttribute:P,disableUnusedAttributes:k}}function kE(r,e,t,s){const o=s.isWebGL2;let l;function u(m){l=m}function d(m,g){r.drawArrays(l,m,g),t.update(g,l,1)}function f(m,g,_){if(_===0)return;let S,T;if(o)S=r,T="drawArraysInstanced";else if(S=e.get("ANGLE_instanced_arrays"),T="drawArraysInstancedANGLE",S===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}S[T](l,m,g,_),t.update(g,l,_)}function h(m,g,_){if(_===0)return;const S=e.get("WEBGL_multi_draw");if(S===null)for(let T=0;T<_;T++)this.render(m[T],g[T]);else{S.multiDrawArraysWEBGL(l,m,0,g,0,_);let T=0;for(let M=0;M<_;M++)T+=g[M];t.update(T,l,1)}}this.setMode=u,this.render=d,this.renderInstances=f,this.renderMultiDraw=h}function BE(r,e,t){let s;function o(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const N=e.get("EXT_texture_filter_anisotropic");s=r.getParameter(N.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function l(N){if(N==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";N="mediump"}return N==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const u=typeof WebGL2RenderingContext<"u"&&r.constructor.name==="WebGL2RenderingContext";let d=t.precision!==void 0?t.precision:"highp";const f=l(d);f!==d&&(console.warn("THREE.WebGLRenderer:",d,"not supported, using",f,"instead."),d=f);const h=u||e.has("WEBGL_draw_buffers"),m=t.logarithmicDepthBuffer===!0,g=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=r.getParameter(r.MAX_TEXTURE_SIZE),T=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),M=r.getParameter(r.MAX_VERTEX_ATTRIBS),x=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),y=r.getParameter(r.MAX_VARYING_VECTORS),w=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),b=_>0,P=u||e.has("OES_texture_float"),z=b&&P,k=u?r.getParameter(r.MAX_SAMPLES):0;return{isWebGL2:u,drawBuffers:h,getMaxAnisotropy:o,getMaxPrecision:l,precision:d,logarithmicDepthBuffer:m,maxTextures:g,maxVertexTextures:_,maxTextureSize:S,maxCubemapSize:T,maxAttributes:M,maxVertexUniforms:x,maxVaryings:y,maxFragmentUniforms:w,vertexTextures:b,floatFragmentTextures:P,floatVertexTextures:z,maxSamples:k}}function zE(r){const e=this;let t=null,s=0,o=!1,l=!1;const u=new Zr,d=new gt,f={value:null,needsUpdate:!1};this.uniform=f,this.numPlanes=0,this.numIntersection=0,this.init=function(g,_){const S=g.length!==0||_||s!==0||o;return o=_,s=g.length,S},this.beginShadows=function(){l=!0,m(null)},this.endShadows=function(){l=!1},this.setGlobalState=function(g,_){t=m(g,_,0)},this.setState=function(g,_,S){const T=g.clippingPlanes,M=g.clipIntersection,x=g.clipShadows,y=r.get(g);if(!o||T===null||T.length===0||l&&!x)l?m(null):h();else{const w=l?0:s,b=w*4;let P=y.clippingState||null;f.value=P,P=m(T,_,b,S);for(let z=0;z!==b;++z)P[z]=t[z];y.clippingState=P,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=w}};function h(){f.value!==t&&(f.value=t,f.needsUpdate=s>0),e.numPlanes=s,e.numIntersection=0}function m(g,_,S,T){const M=g!==null?g.length:0;let x=null;if(M!==0){if(x=f.value,T!==!0||x===null){const y=S+M*4,w=_.matrixWorldInverse;d.getNormalMatrix(w),(x===null||x.length<y)&&(x=new Float32Array(y));for(let b=0,P=S;b!==M;++b,P+=4)u.copy(g[b]).applyMatrix4(w,d),u.normal.toArray(x,P),x[P+3]=u.constant}f.value=x,f.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,x}}function HE(r){let e=new WeakMap;function t(u,d){return d===bd?u.mapping=eo:d===Rd&&(u.mapping=to),u}function s(u){if(u&&u.isTexture){const d=u.mapping;if(d===bd||d===Rd)if(e.has(u)){const f=e.get(u).texture;return t(f,u.mapping)}else{const f=u.image;if(f&&f.height>0){const h=new Jy(f.height/2);return h.fromEquirectangularTexture(r,u),e.set(u,h),u.addEventListener("dispose",o),t(h.texture,u.mapping)}else return null}}return u}function o(u){const d=u.target;d.removeEventListener("dispose",o);const f=e.get(d);f!==void 0&&(e.delete(d),f.dispose())}function l(){e=new WeakMap}return{get:s,dispose:l}}class n0 extends Jg{constructor(e=-1,t=1,s=1,o=-1,l=.1,u=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=s,this.bottom=o,this.near=l,this.far=u,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,s,o,l,u){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=s,this.view.offsetY=o,this.view.width=l,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,o=(this.top+this.bottom)/2;let l=s-e,u=s+e,d=o+t,f=o-t;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,m=(this.top-this.bottom)/this.view.fullHeight/this.zoom;l+=h*this.view.offsetX,u=l+h*this.view.width,d-=m*this.view.offsetY,f=d-m*this.view.height}this.projectionMatrix.makeOrthographic(l,u,d,f,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const $s=4,Om=[.125,.215,.35,.446,.526,.582],es=20,md=new n0,Fm=new Mt;let gd=null,vd=0,_d=0;const Qr=(1+Math.sqrt(5))/2,Ys=1/Qr,km=[new le(1,1,1),new le(-1,1,1),new le(1,1,-1),new le(-1,1,-1),new le(0,Qr,Ys),new le(0,Qr,-Ys),new le(Ys,0,Qr),new le(-Ys,0,Qr),new le(Qr,Ys,0),new le(-Qr,Ys,0)];class Bm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,s=.1,o=100){gd=this._renderer.getRenderTarget(),vd=this._renderer.getActiveCubeFace(),_d=this._renderer.getActiveMipmapLevel(),this._setSize(256);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,s,o,l),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(gd,vd,_d),e.scissorTest=!1,Hl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===eo||e.mapping===to?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),gd=this._renderer.getRenderTarget(),vd=this._renderer.getActiveCubeFace(),_d=this._renderer.getActiveMipmapLevel();const s=t||this._allocateTargets();return this._textureToCubeUV(e,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,s={magFilter:Yn,minFilter:Yn,generateMipmaps:!1,type:na,format:_i,colorSpace:$i,depthBuffer:!1},o=zm(e,t,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zm(e,t,s);const{_lodMax:l}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=GE(l)),this._blurMaterial=VE(l,e,t)}return o}_compileMaterial(e){const t=new qi(this._lodPlanes[0],e);this._renderer.compile(t,md)}_sceneToCubeUV(e,t,s,o){const d=new ri(90,1,t,s),f=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],m=this._renderer,g=m.autoClear,_=m.toneMapping;m.getClearColor(Fm),m.toneMapping=Ar,m.autoClear=!1;const S=new $g({name:"PMREM.Background",side:kn,depthWrite:!1,depthTest:!1}),T=new qi(new ua,S);let M=!1;const x=e.background;x?x.isColor&&(S.color.copy(x),e.background=null,M=!0):(S.color.copy(Fm),M=!0);for(let y=0;y<6;y++){const w=y%3;w===0?(d.up.set(0,f[y],0),d.lookAt(h[y],0,0)):w===1?(d.up.set(0,0,f[y]),d.lookAt(0,h[y],0)):(d.up.set(0,f[y],0),d.lookAt(0,0,h[y]));const b=this._cubeSize;Hl(o,w*b,y>2?b:0,b,b),m.setRenderTarget(o),M&&m.render(T,d),m.render(e,d)}T.geometry.dispose(),T.material.dispose(),m.toneMapping=_,m.autoClear=g,e.background=x}_textureToCubeUV(e,t){const s=this._renderer,o=e.mapping===eo||e.mapping===to;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Hm());const l=o?this._cubemapMaterial:this._equirectMaterial,u=new qi(this._lodPlanes[0],l),d=l.uniforms;d.envMap.value=e;const f=this._cubeSize;Hl(t,0,0,3*f,2*f),s.setRenderTarget(t),s.render(u,md)}_applyPMREM(e){const t=this._renderer,s=t.autoClear;t.autoClear=!1;for(let o=1;o<this._lodPlanes.length;o++){const l=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),u=km[(o-1)%km.length];this._blur(e,o-1,o,l,u)}t.autoClear=s}_blur(e,t,s,o,l){const u=this._pingPongRenderTarget;this._halfBlur(e,u,t,s,o,"latitudinal",l),this._halfBlur(u,e,s,s,o,"longitudinal",l)}_halfBlur(e,t,s,o,l,u,d){const f=this._renderer,h=this._blurMaterial;u!=="latitudinal"&&u!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const m=3,g=new qi(this._lodPlanes[o],h),_=h.uniforms,S=this._sizeLods[s]-1,T=isFinite(l)?Math.PI/(2*S):2*Math.PI/(2*es-1),M=l/T,x=isFinite(l)?1+Math.floor(m*M):es;x>es&&console.warn(`sigmaRadians, ${l}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${es}`);const y=[];let w=0;for(let N=0;N<es;++N){const oe=N/M,A=Math.exp(-oe*oe/2);y.push(A),N===0?w+=A:N<x&&(w+=2*A)}for(let N=0;N<y.length;N++)y[N]=y[N]/w;_.envMap.value=e.texture,_.samples.value=x,_.weights.value=y,_.latitudinal.value=u==="latitudinal",d&&(_.poleAxis.value=d);const{_lodMax:b}=this;_.dTheta.value=T,_.mipInt.value=b-s;const P=this._sizeLods[o],z=3*P*(o>b-$s?o-b+$s:0),k=4*(this._cubeSize-P);Hl(t,z,k,3*P,2*P),f.setRenderTarget(t),f.render(g,md)}}function GE(r){const e=[],t=[],s=[];let o=r;const l=r-$s+1+Om.length;for(let u=0;u<l;u++){const d=Math.pow(2,o);t.push(d);let f=1/d;u>r-$s?f=Om[u-r+$s-1]:u===0&&(f=0),s.push(f);const h=1/(d-2),m=-h,g=1+h,_=[m,m,g,m,g,g,m,m,g,g,m,g],S=6,T=6,M=3,x=2,y=1,w=new Float32Array(M*T*S),b=new Float32Array(x*T*S),P=new Float32Array(y*T*S);for(let k=0;k<S;k++){const N=k%3*2/3-1,oe=k>2?0:-1,A=[N,oe,0,N+2/3,oe,0,N+2/3,oe+1,0,N,oe,0,N+2/3,oe+1,0,N,oe+1,0];w.set(A,M*T*k),b.set(_,x*T*k);const R=[k,k,k,k,k,k];P.set(R,y*T*k)}const z=new Lr;z.setAttribute("position",new Ai(w,M)),z.setAttribute("uv",new Ai(b,x)),z.setAttribute("faceIndex",new Ai(P,y)),e.push(z),o>$s&&o--}return{lodPlanes:e,sizeLods:t,sigmas:s}}function zm(r,e,t){const s=new os(r,e,t);return s.texture.mapping=Jl,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function Hl(r,e,t,s,o){r.viewport.set(e,t,s,o),r.scissor.set(e,t,s,o)}function VE(r,e,t){const s=new Float32Array(es),o=new le(0,1,0);return new as({name:"SphericalGaussianBlur",defines:{n:es,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:o}},vertexShader:jd(),fragmentShader:`

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
		`,blending:wr,depthTest:!1,depthWrite:!1})}function Hm(){return new as({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:jd(),fragmentShader:`

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
		`,blending:wr,depthTest:!1,depthWrite:!1})}function Gm(){return new as({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:jd(),fragmentShader:`

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
	`}function WE(r){let e=new WeakMap,t=null;function s(d){if(d&&d.isTexture){const f=d.mapping,h=f===bd||f===Rd,m=f===eo||f===to;if(h||m)if(d.isRenderTargetTexture&&d.needsPMREMUpdate===!0){d.needsPMREMUpdate=!1;let g=e.get(d);return t===null&&(t=new Bm(r)),g=h?t.fromEquirectangular(d,g):t.fromCubemap(d,g),e.set(d,g),g.texture}else{if(e.has(d))return e.get(d).texture;{const g=d.image;if(h&&g&&g.height>0||m&&g&&o(g)){t===null&&(t=new Bm(r));const _=h?t.fromEquirectangular(d):t.fromCubemap(d);return e.set(d,_),d.addEventListener("dispose",l),_.texture}else return null}}}return d}function o(d){let f=0;const h=6;for(let m=0;m<h;m++)d[m]!==void 0&&f++;return f===h}function l(d){const f=d.target;f.removeEventListener("dispose",l);const h=e.get(f);h!==void 0&&(e.delete(f),h.dispose())}function u(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:s,dispose:u}}function jE(r){const e={};function t(s){if(e[s]!==void 0)return e[s];let o;switch(s){case"WEBGL_depth_texture":o=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":o=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":o=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":o=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:o=r.getExtension(s)}return e[s]=o,o}return{has:function(s){return t(s)!==null},init:function(s){s.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(s){const o=t(s);return o===null&&console.warn("THREE.WebGLRenderer: "+s+" extension not supported."),o}}}function XE(r,e,t,s){const o={},l=new WeakMap;function u(g){const _=g.target;_.index!==null&&e.remove(_.index);for(const T in _.attributes)e.remove(_.attributes[T]);for(const T in _.morphAttributes){const M=_.morphAttributes[T];for(let x=0,y=M.length;x<y;x++)e.remove(M[x])}_.removeEventListener("dispose",u),delete o[_.id];const S=l.get(_);S&&(e.remove(S),l.delete(_)),s.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,t.memory.geometries--}function d(g,_){return o[_.id]===!0||(_.addEventListener("dispose",u),o[_.id]=!0,t.memory.geometries++),_}function f(g){const _=g.attributes;for(const T in _)e.update(_[T],r.ARRAY_BUFFER);const S=g.morphAttributes;for(const T in S){const M=S[T];for(let x=0,y=M.length;x<y;x++)e.update(M[x],r.ARRAY_BUFFER)}}function h(g){const _=[],S=g.index,T=g.attributes.position;let M=0;if(S!==null){const w=S.array;M=S.version;for(let b=0,P=w.length;b<P;b+=3){const z=w[b+0],k=w[b+1],N=w[b+2];_.push(z,k,k,N,N,z)}}else if(T!==void 0){const w=T.array;M=T.version;for(let b=0,P=w.length/3-1;b<P;b+=3){const z=b+0,k=b+1,N=b+2;_.push(z,k,k,N,N,z)}}else return;const x=new(Vg(_)?Zg:Kg)(_,1);x.version=M;const y=l.get(g);y&&e.remove(y),l.set(g,x)}function m(g){const _=l.get(g);if(_){const S=g.index;S!==null&&_.version<S.version&&h(g)}else h(g);return l.get(g)}return{get:d,update:f,getWireframeAttribute:m}}function YE(r,e,t,s){const o=s.isWebGL2;let l;function u(S){l=S}let d,f;function h(S){d=S.type,f=S.bytesPerElement}function m(S,T){r.drawElements(l,T,d,S*f),t.update(T,l,1)}function g(S,T,M){if(M===0)return;let x,y;if(o)x=r,y="drawElementsInstanced";else if(x=e.get("ANGLE_instanced_arrays"),y="drawElementsInstancedANGLE",x===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}x[y](l,T,d,S*f,M),t.update(T,l,M)}function _(S,T,M){if(M===0)return;const x=e.get("WEBGL_multi_draw");if(x===null)for(let y=0;y<M;y++)this.render(S[y]/f,T[y]);else{x.multiDrawElementsWEBGL(l,T,0,d,S,0,M);let y=0;for(let w=0;w<M;w++)y+=T[w];t.update(y,l,1)}}this.setMode=u,this.setIndex=h,this.render=m,this.renderInstances=g,this.renderMultiDraw=_}function qE(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function s(l,u,d){switch(t.calls++,u){case r.TRIANGLES:t.triangles+=d*(l/3);break;case r.LINES:t.lines+=d*(l/2);break;case r.LINE_STRIP:t.lines+=d*(l-1);break;case r.LINE_LOOP:t.lines+=d*l;break;case r.POINTS:t.points+=d*l;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",u);break}}function o(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:o,update:s}}function $E(r,e){return r[0]-e[0]}function KE(r,e){return Math.abs(e[1])-Math.abs(r[1])}function ZE(r,e,t){const s={},o=new Float32Array(8),l=new WeakMap,u=new sn,d=[];for(let h=0;h<8;h++)d[h]=[h,0];function f(h,m,g){const _=h.morphTargetInfluences;if(e.isWebGL2===!0){const T=m.morphAttributes.position||m.morphAttributes.normal||m.morphAttributes.color,M=T!==void 0?T.length:0;let x=l.get(m);if(x===void 0||x.count!==M){let V=function(){de.dispose(),l.delete(m),m.removeEventListener("dispose",V)};var S=V;x!==void 0&&x.texture.dispose();const b=m.morphAttributes.position!==void 0,P=m.morphAttributes.normal!==void 0,z=m.morphAttributes.color!==void 0,k=m.morphAttributes.position||[],N=m.morphAttributes.normal||[],oe=m.morphAttributes.color||[];let A=0;b===!0&&(A=1),P===!0&&(A=2),z===!0&&(A=3);let R=m.attributes.position.count*A,ie=1;R>e.maxTextureSize&&(ie=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const ue=new Float32Array(R*ie*4*M),de=new Xg(ue,R,ie,M);de.type=Tr,de.needsUpdate=!0;const B=A*4;for(let $=0;$<M;$++){const Q=k[$],U=N[$],Y=oe[$],H=R*ie*4*$;for(let I=0;I<Q.count;I++){const G=I*B;b===!0&&(u.fromBufferAttribute(Q,I),ue[H+G+0]=u.x,ue[H+G+1]=u.y,ue[H+G+2]=u.z,ue[H+G+3]=0),P===!0&&(u.fromBufferAttribute(U,I),ue[H+G+4]=u.x,ue[H+G+5]=u.y,ue[H+G+6]=u.z,ue[H+G+7]=0),z===!0&&(u.fromBufferAttribute(Y,I),ue[H+G+8]=u.x,ue[H+G+9]=u.y,ue[H+G+10]=u.z,ue[H+G+11]=Y.itemSize===4?u.w:1)}}x={count:M,texture:de,size:new Tt(R,ie)},l.set(m,x),m.addEventListener("dispose",V)}let y=0;for(let b=0;b<_.length;b++)y+=_[b];const w=m.morphTargetsRelative?1:1-y;g.getUniforms().setValue(r,"morphTargetBaseInfluence",w),g.getUniforms().setValue(r,"morphTargetInfluences",_),g.getUniforms().setValue(r,"morphTargetsTexture",x.texture,t),g.getUniforms().setValue(r,"morphTargetsTextureSize",x.size)}else{const T=_===void 0?0:_.length;let M=s[m.id];if(M===void 0||M.length!==T){M=[];for(let P=0;P<T;P++)M[P]=[P,0];s[m.id]=M}for(let P=0;P<T;P++){const z=M[P];z[0]=P,z[1]=_[P]}M.sort(KE);for(let P=0;P<8;P++)P<T&&M[P][1]?(d[P][0]=M[P][0],d[P][1]=M[P][1]):(d[P][0]=Number.MAX_SAFE_INTEGER,d[P][1]=0);d.sort($E);const x=m.morphAttributes.position,y=m.morphAttributes.normal;let w=0;for(let P=0;P<8;P++){const z=d[P],k=z[0],N=z[1];k!==Number.MAX_SAFE_INTEGER&&N?(x&&m.getAttribute("morphTarget"+P)!==x[k]&&m.setAttribute("morphTarget"+P,x[k]),y&&m.getAttribute("morphNormal"+P)!==y[k]&&m.setAttribute("morphNormal"+P,y[k]),o[P]=N,w+=N):(x&&m.hasAttribute("morphTarget"+P)===!0&&m.deleteAttribute("morphTarget"+P),y&&m.hasAttribute("morphNormal"+P)===!0&&m.deleteAttribute("morphNormal"+P),o[P]=0)}const b=m.morphTargetsRelative?1:1-w;g.getUniforms().setValue(r,"morphTargetBaseInfluence",b),g.getUniforms().setValue(r,"morphTargetInfluences",o)}}return{update:f}}function QE(r,e,t,s){let o=new WeakMap;function l(f){const h=s.render.frame,m=f.geometry,g=e.get(f,m);if(o.get(g)!==h&&(e.update(g),o.set(g,h)),f.isInstancedMesh&&(f.hasEventListener("dispose",d)===!1&&f.addEventListener("dispose",d),o.get(f)!==h&&(t.update(f.instanceMatrix,r.ARRAY_BUFFER),f.instanceColor!==null&&t.update(f.instanceColor,r.ARRAY_BUFFER),o.set(f,h))),f.isSkinnedMesh){const _=f.skeleton;o.get(_)!==h&&(_.update(),o.set(_,h))}return g}function u(){o=new WeakMap}function d(f){const h=f.target;h.removeEventListener("dispose",d),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:l,dispose:u}}class i0 extends Bn{constructor(e,t,s,o,l,u,d,f,h,m){if(m=m!==void 0?m:rs,m!==rs&&m!==io)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");s===void 0&&m===rs&&(s=Er),s===void 0&&m===io&&(s=is),super(null,o,l,u,d,f,m,s,h),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=d!==void 0?d:wn,this.minFilter=f!==void 0?f:wn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const r0=new Bn,s0=new i0(1,1);s0.compareFunction=Gg;const o0=new Xg,a0=new Uy,l0=new e0,Vm=[],Wm=[],jm=new Float32Array(16),Xm=new Float32Array(9),Ym=new Float32Array(4);function lo(r,e,t){const s=r[0];if(s<=0||s>0)return r;const o=e*t;let l=Vm[o];if(l===void 0&&(l=new Float32Array(o),Vm[o]=l),e!==0){s.toArray(l,0);for(let u=1,d=0;u!==e;++u)d+=t,r[u].toArray(l,d)}return l}function Zt(r,e){if(r.length!==e.length)return!1;for(let t=0,s=r.length;t<s;t++)if(r[t]!==e[t])return!1;return!0}function Qt(r,e){for(let t=0,s=e.length;t<s;t++)r[t]=e[t]}function nc(r,e){let t=Wm[e];t===void 0&&(t=new Int32Array(e),Wm[e]=t);for(let s=0;s!==e;++s)t[s]=r.allocateTextureUnit();return t}function JE(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function e1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Zt(t,e))return;r.uniform2fv(this.addr,e),Qt(t,e)}}function t1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Zt(t,e))return;r.uniform3fv(this.addr,e),Qt(t,e)}}function n1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Zt(t,e))return;r.uniform4fv(this.addr,e),Qt(t,e)}}function i1(r,e){const t=this.cache,s=e.elements;if(s===void 0){if(Zt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Qt(t,e)}else{if(Zt(t,s))return;Ym.set(s),r.uniformMatrix2fv(this.addr,!1,Ym),Qt(t,s)}}function r1(r,e){const t=this.cache,s=e.elements;if(s===void 0){if(Zt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Qt(t,e)}else{if(Zt(t,s))return;Xm.set(s),r.uniformMatrix3fv(this.addr,!1,Xm),Qt(t,s)}}function s1(r,e){const t=this.cache,s=e.elements;if(s===void 0){if(Zt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Qt(t,e)}else{if(Zt(t,s))return;jm.set(s),r.uniformMatrix4fv(this.addr,!1,jm),Qt(t,s)}}function o1(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function a1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Zt(t,e))return;r.uniform2iv(this.addr,e),Qt(t,e)}}function l1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Zt(t,e))return;r.uniform3iv(this.addr,e),Qt(t,e)}}function c1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Zt(t,e))return;r.uniform4iv(this.addr,e),Qt(t,e)}}function u1(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function d1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Zt(t,e))return;r.uniform2uiv(this.addr,e),Qt(t,e)}}function f1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Zt(t,e))return;r.uniform3uiv(this.addr,e),Qt(t,e)}}function h1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Zt(t,e))return;r.uniform4uiv(this.addr,e),Qt(t,e)}}function p1(r,e,t){const s=this.cache,o=t.allocateTextureUnit();s[0]!==o&&(r.uniform1i(this.addr,o),s[0]=o);const l=this.type===r.SAMPLER_2D_SHADOW?s0:r0;t.setTexture2D(e||l,o)}function m1(r,e,t){const s=this.cache,o=t.allocateTextureUnit();s[0]!==o&&(r.uniform1i(this.addr,o),s[0]=o),t.setTexture3D(e||a0,o)}function g1(r,e,t){const s=this.cache,o=t.allocateTextureUnit();s[0]!==o&&(r.uniform1i(this.addr,o),s[0]=o),t.setTextureCube(e||l0,o)}function v1(r,e,t){const s=this.cache,o=t.allocateTextureUnit();s[0]!==o&&(r.uniform1i(this.addr,o),s[0]=o),t.setTexture2DArray(e||o0,o)}function _1(r){switch(r){case 5126:return JE;case 35664:return e1;case 35665:return t1;case 35666:return n1;case 35674:return i1;case 35675:return r1;case 35676:return s1;case 5124:case 35670:return o1;case 35667:case 35671:return a1;case 35668:case 35672:return l1;case 35669:case 35673:return c1;case 5125:return u1;case 36294:return d1;case 36295:return f1;case 36296:return h1;case 35678:case 36198:case 36298:case 36306:case 35682:return p1;case 35679:case 36299:case 36307:return m1;case 35680:case 36300:case 36308:case 36293:return g1;case 36289:case 36303:case 36311:case 36292:return v1}}function x1(r,e){r.uniform1fv(this.addr,e)}function y1(r,e){const t=lo(e,this.size,2);r.uniform2fv(this.addr,t)}function S1(r,e){const t=lo(e,this.size,3);r.uniform3fv(this.addr,t)}function M1(r,e){const t=lo(e,this.size,4);r.uniform4fv(this.addr,t)}function E1(r,e){const t=lo(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function T1(r,e){const t=lo(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function w1(r,e){const t=lo(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function A1(r,e){r.uniform1iv(this.addr,e)}function C1(r,e){r.uniform2iv(this.addr,e)}function b1(r,e){r.uniform3iv(this.addr,e)}function R1(r,e){r.uniform4iv(this.addr,e)}function L1(r,e){r.uniform1uiv(this.addr,e)}function P1(r,e){r.uniform2uiv(this.addr,e)}function D1(r,e){r.uniform3uiv(this.addr,e)}function I1(r,e){r.uniform4uiv(this.addr,e)}function N1(r,e,t){const s=this.cache,o=e.length,l=nc(t,o);Zt(s,l)||(r.uniform1iv(this.addr,l),Qt(s,l));for(let u=0;u!==o;++u)t.setTexture2D(e[u]||r0,l[u])}function U1(r,e,t){const s=this.cache,o=e.length,l=nc(t,o);Zt(s,l)||(r.uniform1iv(this.addr,l),Qt(s,l));for(let u=0;u!==o;++u)t.setTexture3D(e[u]||a0,l[u])}function O1(r,e,t){const s=this.cache,o=e.length,l=nc(t,o);Zt(s,l)||(r.uniform1iv(this.addr,l),Qt(s,l));for(let u=0;u!==o;++u)t.setTextureCube(e[u]||l0,l[u])}function F1(r,e,t){const s=this.cache,o=e.length,l=nc(t,o);Zt(s,l)||(r.uniform1iv(this.addr,l),Qt(s,l));for(let u=0;u!==o;++u)t.setTexture2DArray(e[u]||o0,l[u])}function k1(r){switch(r){case 5126:return x1;case 35664:return y1;case 35665:return S1;case 35666:return M1;case 35674:return E1;case 35675:return T1;case 35676:return w1;case 5124:case 35670:return A1;case 35667:case 35671:return C1;case 35668:case 35672:return b1;case 35669:case 35673:return R1;case 5125:return L1;case 36294:return P1;case 36295:return D1;case 36296:return I1;case 35678:case 36198:case 36298:case 36306:case 35682:return N1;case 35679:case 36299:case 36307:return U1;case 35680:case 36300:case 36308:case 36293:return O1;case 36289:case 36303:case 36311:case 36292:return F1}}class B1{constructor(e,t,s){this.id=e,this.addr=s,this.cache=[],this.type=t.type,this.setValue=_1(t.type)}}class z1{constructor(e,t,s){this.id=e,this.addr=s,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=k1(t.type)}}class H1{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,s){const o=this.seq;for(let l=0,u=o.length;l!==u;++l){const d=o[l];d.setValue(e,t[d.id],s)}}}const xd=/(\w+)(\])?(\[|\.)?/g;function qm(r,e){r.seq.push(e),r.map[e.id]=e}function G1(r,e,t){const s=r.name,o=s.length;for(xd.lastIndex=0;;){const l=xd.exec(s),u=xd.lastIndex;let d=l[1];const f=l[2]==="]",h=l[3];if(f&&(d=d|0),h===void 0||h==="["&&u+2===o){qm(t,h===void 0?new B1(d,r,e):new z1(d,r,e));break}else{let g=t.map[d];g===void 0&&(g=new H1(d),qm(t,g)),t=g}}}class Vl{constructor(e,t){this.seq=[],this.map={};const s=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<s;++o){const l=e.getActiveUniform(t,o),u=e.getUniformLocation(t,l.name);G1(l,u,this)}}setValue(e,t,s,o){const l=this.map[t];l!==void 0&&l.setValue(e,s,o)}setOptional(e,t,s){const o=t[s];o!==void 0&&this.setValue(e,s,o)}static upload(e,t,s,o){for(let l=0,u=t.length;l!==u;++l){const d=t[l],f=s[d.id];f.needsUpdate!==!1&&d.setValue(e,f.value,o)}}static seqWithValue(e,t){const s=[];for(let o=0,l=e.length;o!==l;++o){const u=e[o];u.id in t&&s.push(u)}return s}}function $m(r,e,t){const s=r.createShader(e);return r.shaderSource(s,t),r.compileShader(s),s}const V1=37297;let W1=0;function j1(r,e){const t=r.split(`
`),s=[],o=Math.max(e-6,0),l=Math.min(e+6,t.length);for(let u=o;u<l;u++){const d=u+1;s.push(`${d===e?">":" "} ${d}: ${t[u]}`)}return s.join(`
`)}function X1(r){const e=bt.getPrimaries(bt.workingColorSpace),t=bt.getPrimaries(r);let s;switch(e===t?s="":e===ql&&t===Yl?s="LinearDisplayP3ToLinearSRGB":e===Yl&&t===ql&&(s="LinearSRGBToLinearDisplayP3"),r){case $i:case ec:return[s,"LinearTransferOETF"];case cn:case Hd:return[s,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[s,"LinearTransferOETF"]}}function Km(r,e,t){const s=r.getShaderParameter(e,r.COMPILE_STATUS),o=r.getShaderInfoLog(e).trim();if(s&&o==="")return"";const l=/ERROR: 0:(\d+)/.exec(o);if(l){const u=parseInt(l[1]);return t.toUpperCase()+`

`+o+`

`+j1(r.getShaderSource(e),u)}else return o}function Y1(r,e){const t=X1(e);return`vec4 ${r}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function q1(r,e){let t;switch(e){case ry:t="Linear";break;case sy:t="Reinhard";break;case oy:t="OptimizedCineon";break;case ay:t="ACESFilmic";break;case cy:t="AgX";break;case ly:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function $1(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.normalMapTangentSpace||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ks).join(`
`)}function K1(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ks).join(`
`)}function Z1(r){const e=[];for(const t in r){const s=r[t];s!==!1&&e.push("#define "+t+" "+s)}return e.join(`
`)}function Q1(r,e){const t={},s=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let o=0;o<s;o++){const l=r.getActiveAttrib(e,o),u=l.name;let d=1;l.type===r.FLOAT_MAT2&&(d=2),l.type===r.FLOAT_MAT3&&(d=3),l.type===r.FLOAT_MAT4&&(d=4),t[u]={type:l.type,location:r.getAttribLocation(e,u),locationSize:d}}return t}function Ks(r){return r!==""}function Zm(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Qm(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const J1=/^[ \t]*#include +<([\w\d./]+)>/gm;function Nd(r){return r.replace(J1,tT)}const eT=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function tT(r,e){let t=ht[e];if(t===void 0){const s=eT.get(e);if(s!==void 0)t=ht[s],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,s);else throw new Error("Can not resolve #include <"+e+">")}return Nd(t)}const nT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Jm(r){return r.replace(nT,iT)}function iT(r,e,t,s){let o="";for(let l=parseInt(e);l<parseInt(t);l++)o+=s.replace(/\[\s*i\s*\]/g,"[ "+l+" ]").replace(/UNROLLED_LOOP_INDEX/g,l);return o}function eg(r){let e="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function rT(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Lg?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Dx?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Wi&&(e="SHADOWMAP_TYPE_VSM"),e}function sT(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case eo:case to:e="ENVMAP_TYPE_CUBE";break;case Jl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function oT(r){let e="ENVMAP_MODE_REFLECTION";return r.envMap&&r.envMapMode===to&&(e="ENVMAP_MODE_REFRACTION"),e}function aT(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Pg:e="ENVMAP_BLENDING_MULTIPLY";break;case ny:e="ENVMAP_BLENDING_MIX";break;case iy:e="ENVMAP_BLENDING_ADD";break}return e}function lT(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,s=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:s,maxMip:t}}function cT(r,e,t,s){const o=r.getContext(),l=t.defines;let u=t.vertexShader,d=t.fragmentShader;const f=rT(t),h=sT(t),m=oT(t),g=aT(t),_=lT(t),S=t.isWebGL2?"":$1(t),T=K1(t),M=Z1(l),x=o.createProgram();let y,w,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(y=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(Ks).join(`
`),y.length>0&&(y+=`
`),w=[S,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(Ks).join(`
`),w.length>0&&(w+=`
`)):(y=[eg(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+m:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+f:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ks).join(`
`),w=[S,eg(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.envMap?"#define "+m:"",t.envMap?"#define "+g:"",_?"#define CUBEUV_TEXEL_WIDTH "+_.texelWidth:"",_?"#define CUBEUV_TEXEL_HEIGHT "+_.texelHeight:"",_?"#define CUBEUV_MAX_MIP "+_.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+f:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ar?"#define TONE_MAPPING":"",t.toneMapping!==Ar?ht.tonemapping_pars_fragment:"",t.toneMapping!==Ar?q1("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ht.colorspace_pars_fragment,Y1("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ks).join(`
`)),u=Nd(u),u=Zm(u,t),u=Qm(u,t),d=Nd(d),d=Zm(d,t),d=Qm(d,t),u=Jm(u),d=Jm(d),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,y=[T,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,w=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===_m?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===_m?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+w);const P=b+y+u,z=b+w+d,k=$m(o,o.VERTEX_SHADER,P),N=$m(o,o.FRAGMENT_SHADER,z);o.attachShader(x,k),o.attachShader(x,N),t.index0AttributeName!==void 0?o.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&o.bindAttribLocation(x,0,"position"),o.linkProgram(x);function oe(ue){if(r.debug.checkShaderErrors){const de=o.getProgramInfoLog(x).trim(),B=o.getShaderInfoLog(k).trim(),V=o.getShaderInfoLog(N).trim();let $=!0,Q=!0;if(o.getProgramParameter(x,o.LINK_STATUS)===!1)if($=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(o,x,k,N);else{const U=Km(o,k,"vertex"),Y=Km(o,N,"fragment");console.error("THREE.WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(x,o.VALIDATE_STATUS)+`

Program Info Log: `+de+`
`+U+`
`+Y)}else de!==""?console.warn("THREE.WebGLProgram: Program Info Log:",de):(B===""||V==="")&&(Q=!1);Q&&(ue.diagnostics={runnable:$,programLog:de,vertexShader:{log:B,prefix:y},fragmentShader:{log:V,prefix:w}})}o.deleteShader(k),o.deleteShader(N),A=new Vl(o,x),R=Q1(o,x)}let A;this.getUniforms=function(){return A===void 0&&oe(this),A};let R;this.getAttributes=function(){return R===void 0&&oe(this),R};let ie=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return ie===!1&&(ie=o.getProgramParameter(x,V1)),ie},this.destroy=function(){s.releaseStatesOfProgram(this),o.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=W1++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=k,this.fragmentShader=N,this}let uT=0;class dT{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,s=e.fragmentShader,o=this._getShaderStage(t),l=this._getShaderStage(s),u=this._getShaderCacheForMaterial(e);return u.has(o)===!1&&(u.add(o),o.usedTimes++),u.has(l)===!1&&(u.add(l),l.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const s of t)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let s=t.get(e);return s===void 0&&(s=new Set,t.set(e,s)),s}_getShaderStage(e){const t=this.shaderCache;let s=t.get(e);return s===void 0&&(s=new fT(e),t.set(e,s)),s}}class fT{constructor(e){this.id=uT++,this.code=e,this.usedTimes=0}}function hT(r,e,t,s,o,l,u){const d=new Yg,f=new dT,h=[],m=o.isWebGL2,g=o.logarithmicDepthBuffer,_=o.vertexTextures;let S=o.precision;const T={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(A){return A===0?"uv":`uv${A}`}function x(A,R,ie,ue,de){const B=ue.fog,V=de.geometry,$=A.isMeshStandardMaterial?ue.environment:null,Q=(A.isMeshStandardMaterial?t:e).get(A.envMap||$),U=Q&&Q.mapping===Jl?Q.image.height:null,Y=T[A.type];A.precision!==null&&(S=o.getMaxPrecision(A.precision),S!==A.precision&&console.warn("THREE.WebGLProgram.getParameters:",A.precision,"not supported, using",S,"instead."));const H=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,I=H!==void 0?H.length:0;let G=0;V.morphAttributes.position!==void 0&&(G=1),V.morphAttributes.normal!==void 0&&(G=2),V.morphAttributes.color!==void 0&&(G=3);let j,Z,fe,xe;if(Y){const Jt=wi[Y];j=Jt.vertexShader,Z=Jt.fragmentShader}else j=A.vertexShader,Z=A.fragmentShader,f.update(A),fe=f.getVertexShaderID(A),xe=f.getFragmentShaderID(A);const Ee=r.getRenderTarget(),Te=de.isInstancedMesh===!0,Ne=de.isBatchedMesh===!0,he=!!A.map,ve=!!A.matcap,K=!!Q,nt=!!A.aoMap,Pe=!!A.lightMap,Ve=!!A.bumpMap,Ue=!!A.normalMap,$e=!!A.displacementMap,Xe=!!A.emissiveMap,L=!!A.metalnessMap,C=!!A.roughnessMap,te=A.anisotropy>0,_e=A.clearcoat>0,ge=A.iridescence>0,me=A.sheen>0,Le=A.transmission>0,Ae=te&&!!A.anisotropyMap,be=_e&&!!A.clearcoatMap,Ke=_e&&!!A.clearcoatNormalMap,at=_e&&!!A.clearcoatRoughnessMap,Se=ge&&!!A.iridescenceMap,vt=ge&&!!A.iridescenceThicknessMap,lt=me&&!!A.sheenColorMap,it=me&&!!A.sheenRoughnessMap,qe=!!A.specularMap,He=!!A.specularColorMap,st=!!A.specularIntensityMap,pt=Le&&!!A.transmissionMap,Et=Le&&!!A.thicknessMap,ut=!!A.gradientMap,Re=!!A.alphaMap,X=A.alphaTest>0,De=!!A.alphaHash,Oe=!!A.extensions,tt=!!V.attributes.uv1,Ze=!!V.attributes.uv2,wt=!!V.attributes.uv3;let At=Ar;return A.toneMapped&&(Ee===null||Ee.isXRRenderTarget===!0)&&(At=r.toneMapping),{isWebGL2:m,shaderID:Y,shaderType:A.type,shaderName:A.name,vertexShader:j,fragmentShader:Z,defines:A.defines,customVertexShaderID:fe,customFragmentShaderID:xe,isRawShaderMaterial:A.isRawShaderMaterial===!0,glslVersion:A.glslVersion,precision:S,batching:Ne,instancing:Te,instancingColor:Te&&de.instanceColor!==null,supportsVertexTextures:_,outputColorSpace:Ee===null?r.outputColorSpace:Ee.isXRRenderTarget===!0?Ee.texture.colorSpace:$i,map:he,matcap:ve,envMap:K,envMapMode:K&&Q.mapping,envMapCubeUVHeight:U,aoMap:nt,lightMap:Pe,bumpMap:Ve,normalMap:Ue,displacementMap:_&&$e,emissiveMap:Xe,normalMapObjectSpace:Ue&&A.normalMapType===Sy,normalMapTangentSpace:Ue&&A.normalMapType===Hg,metalnessMap:L,roughnessMap:C,anisotropy:te,anisotropyMap:Ae,clearcoat:_e,clearcoatMap:be,clearcoatNormalMap:Ke,clearcoatRoughnessMap:at,iridescence:ge,iridescenceMap:Se,iridescenceThicknessMap:vt,sheen:me,sheenColorMap:lt,sheenRoughnessMap:it,specularMap:qe,specularColorMap:He,specularIntensityMap:st,transmission:Le,transmissionMap:pt,thicknessMap:Et,gradientMap:ut,opaque:A.transparent===!1&&A.blending===Zs,alphaMap:Re,alphaTest:X,alphaHash:De,combine:A.combine,mapUv:he&&M(A.map.channel),aoMapUv:nt&&M(A.aoMap.channel),lightMapUv:Pe&&M(A.lightMap.channel),bumpMapUv:Ve&&M(A.bumpMap.channel),normalMapUv:Ue&&M(A.normalMap.channel),displacementMapUv:$e&&M(A.displacementMap.channel),emissiveMapUv:Xe&&M(A.emissiveMap.channel),metalnessMapUv:L&&M(A.metalnessMap.channel),roughnessMapUv:C&&M(A.roughnessMap.channel),anisotropyMapUv:Ae&&M(A.anisotropyMap.channel),clearcoatMapUv:be&&M(A.clearcoatMap.channel),clearcoatNormalMapUv:Ke&&M(A.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:at&&M(A.clearcoatRoughnessMap.channel),iridescenceMapUv:Se&&M(A.iridescenceMap.channel),iridescenceThicknessMapUv:vt&&M(A.iridescenceThicknessMap.channel),sheenColorMapUv:lt&&M(A.sheenColorMap.channel),sheenRoughnessMapUv:it&&M(A.sheenRoughnessMap.channel),specularMapUv:qe&&M(A.specularMap.channel),specularColorMapUv:He&&M(A.specularColorMap.channel),specularIntensityMapUv:st&&M(A.specularIntensityMap.channel),transmissionMapUv:pt&&M(A.transmissionMap.channel),thicknessMapUv:Et&&M(A.thicknessMap.channel),alphaMapUv:Re&&M(A.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(Ue||te),vertexColors:A.vertexColors,vertexAlphas:A.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,vertexUv1s:tt,vertexUv2s:Ze,vertexUv3s:wt,pointsUvs:de.isPoints===!0&&!!V.attributes.uv&&(he||Re),fog:!!B,useFog:A.fog===!0,fogExp2:B&&B.isFogExp2,flatShading:A.flatShading===!0,sizeAttenuation:A.sizeAttenuation===!0,logarithmicDepthBuffer:g,skinning:de.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:I,morphTextureStride:G,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numClippingPlanes:u.numPlanes,numClipIntersection:u.numIntersection,dithering:A.dithering,shadowMapEnabled:r.shadowMap.enabled&&ie.length>0,shadowMapType:r.shadowMap.type,toneMapping:At,useLegacyLights:r._useLegacyLights,decodeVideoTexture:he&&A.map.isVideoTexture===!0&&bt.getTransfer(A.map.colorSpace)===It,premultipliedAlpha:A.premultipliedAlpha,doubleSided:A.side===ji,flipSided:A.side===kn,useDepthPacking:A.depthPacking>=0,depthPacking:A.depthPacking||0,index0AttributeName:A.index0AttributeName,extensionDerivatives:Oe&&A.extensions.derivatives===!0,extensionFragDepth:Oe&&A.extensions.fragDepth===!0,extensionDrawBuffers:Oe&&A.extensions.drawBuffers===!0,extensionShaderTextureLOD:Oe&&A.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Oe&&A.extensions.clipCullDistance&&s.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:m||s.has("EXT_frag_depth"),rendererExtensionDrawBuffers:m||s.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:m||s.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:s.has("KHR_parallel_shader_compile"),customProgramCacheKey:A.customProgramCacheKey()}}function y(A){const R=[];if(A.shaderID?R.push(A.shaderID):(R.push(A.customVertexShaderID),R.push(A.customFragmentShaderID)),A.defines!==void 0)for(const ie in A.defines)R.push(ie),R.push(A.defines[ie]);return A.isRawShaderMaterial===!1&&(w(R,A),b(R,A),R.push(r.outputColorSpace)),R.push(A.customProgramCacheKey),R.join()}function w(A,R){A.push(R.precision),A.push(R.outputColorSpace),A.push(R.envMapMode),A.push(R.envMapCubeUVHeight),A.push(R.mapUv),A.push(R.alphaMapUv),A.push(R.lightMapUv),A.push(R.aoMapUv),A.push(R.bumpMapUv),A.push(R.normalMapUv),A.push(R.displacementMapUv),A.push(R.emissiveMapUv),A.push(R.metalnessMapUv),A.push(R.roughnessMapUv),A.push(R.anisotropyMapUv),A.push(R.clearcoatMapUv),A.push(R.clearcoatNormalMapUv),A.push(R.clearcoatRoughnessMapUv),A.push(R.iridescenceMapUv),A.push(R.iridescenceThicknessMapUv),A.push(R.sheenColorMapUv),A.push(R.sheenRoughnessMapUv),A.push(R.specularMapUv),A.push(R.specularColorMapUv),A.push(R.specularIntensityMapUv),A.push(R.transmissionMapUv),A.push(R.thicknessMapUv),A.push(R.combine),A.push(R.fogExp2),A.push(R.sizeAttenuation),A.push(R.morphTargetsCount),A.push(R.morphAttributeCount),A.push(R.numDirLights),A.push(R.numPointLights),A.push(R.numSpotLights),A.push(R.numSpotLightMaps),A.push(R.numHemiLights),A.push(R.numRectAreaLights),A.push(R.numDirLightShadows),A.push(R.numPointLightShadows),A.push(R.numSpotLightShadows),A.push(R.numSpotLightShadowsWithMaps),A.push(R.numLightProbes),A.push(R.shadowMapType),A.push(R.toneMapping),A.push(R.numClippingPlanes),A.push(R.numClipIntersection),A.push(R.depthPacking)}function b(A,R){d.disableAll(),R.isWebGL2&&d.enable(0),R.supportsVertexTextures&&d.enable(1),R.instancing&&d.enable(2),R.instancingColor&&d.enable(3),R.matcap&&d.enable(4),R.envMap&&d.enable(5),R.normalMapObjectSpace&&d.enable(6),R.normalMapTangentSpace&&d.enable(7),R.clearcoat&&d.enable(8),R.iridescence&&d.enable(9),R.alphaTest&&d.enable(10),R.vertexColors&&d.enable(11),R.vertexAlphas&&d.enable(12),R.vertexUv1s&&d.enable(13),R.vertexUv2s&&d.enable(14),R.vertexUv3s&&d.enable(15),R.vertexTangents&&d.enable(16),R.anisotropy&&d.enable(17),R.alphaHash&&d.enable(18),R.batching&&d.enable(19),A.push(d.mask),d.disableAll(),R.fog&&d.enable(0),R.useFog&&d.enable(1),R.flatShading&&d.enable(2),R.logarithmicDepthBuffer&&d.enable(3),R.skinning&&d.enable(4),R.morphTargets&&d.enable(5),R.morphNormals&&d.enable(6),R.morphColors&&d.enable(7),R.premultipliedAlpha&&d.enable(8),R.shadowMapEnabled&&d.enable(9),R.useLegacyLights&&d.enable(10),R.doubleSided&&d.enable(11),R.flipSided&&d.enable(12),R.useDepthPacking&&d.enable(13),R.dithering&&d.enable(14),R.transmission&&d.enable(15),R.sheen&&d.enable(16),R.opaque&&d.enable(17),R.pointsUvs&&d.enable(18),R.decodeVideoTexture&&d.enable(19),A.push(d.mask)}function P(A){const R=T[A.type];let ie;if(R){const ue=wi[R];ie=$y.clone(ue.uniforms)}else ie=A.uniforms;return ie}function z(A,R){let ie;for(let ue=0,de=h.length;ue<de;ue++){const B=h[ue];if(B.cacheKey===R){ie=B,++ie.usedTimes;break}}return ie===void 0&&(ie=new cT(r,R,A,l),h.push(ie)),ie}function k(A){if(--A.usedTimes===0){const R=h.indexOf(A);h[R]=h[h.length-1],h.pop(),A.destroy()}}function N(A){f.remove(A)}function oe(){f.dispose()}return{getParameters:x,getProgramCacheKey:y,getUniforms:P,acquireProgram:z,releaseProgram:k,releaseShaderCache:N,programs:h,dispose:oe}}function pT(){let r=new WeakMap;function e(l){let u=r.get(l);return u===void 0&&(u={},r.set(l,u)),u}function t(l){r.delete(l)}function s(l,u,d){r.get(l)[u]=d}function o(){r=new WeakMap}return{get:e,remove:t,update:s,dispose:o}}function mT(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function tg(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function ng(){const r=[];let e=0;const t=[],s=[],o=[];function l(){e=0,t.length=0,s.length=0,o.length=0}function u(g,_,S,T,M,x){let y=r[e];return y===void 0?(y={id:g.id,object:g,geometry:_,material:S,groupOrder:T,renderOrder:g.renderOrder,z:M,group:x},r[e]=y):(y.id=g.id,y.object=g,y.geometry=_,y.material=S,y.groupOrder=T,y.renderOrder=g.renderOrder,y.z=M,y.group=x),e++,y}function d(g,_,S,T,M,x){const y=u(g,_,S,T,M,x);S.transmission>0?s.push(y):S.transparent===!0?o.push(y):t.push(y)}function f(g,_,S,T,M,x){const y=u(g,_,S,T,M,x);S.transmission>0?s.unshift(y):S.transparent===!0?o.unshift(y):t.unshift(y)}function h(g,_){t.length>1&&t.sort(g||mT),s.length>1&&s.sort(_||tg),o.length>1&&o.sort(_||tg)}function m(){for(let g=e,_=r.length;g<_;g++){const S=r[g];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:t,transmissive:s,transparent:o,init:l,push:d,unshift:f,finish:m,sort:h}}function gT(){let r=new WeakMap;function e(s,o){const l=r.get(s);let u;return l===void 0?(u=new ng,r.set(s,[u])):o>=l.length?(u=new ng,l.push(u)):u=l[o],u}function t(){r=new WeakMap}return{get:e,dispose:t}}function vT(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new le,color:new Mt};break;case"SpotLight":t={position:new le,direction:new le,color:new Mt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new le,color:new Mt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new le,skyColor:new Mt,groundColor:new Mt};break;case"RectAreaLight":t={color:new Mt,position:new le,halfWidth:new le,halfHeight:new le};break}return r[e.id]=t,t}}}function _T(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Tt};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Tt};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Tt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let xT=0;function yT(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function ST(r,e){const t=new vT,s=_T(),o={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)o.probe.push(new le);const l=new le,u=new Kt,d=new Kt;function f(m,g){let _=0,S=0,T=0;for(let ue=0;ue<9;ue++)o.probe[ue].set(0,0,0);let M=0,x=0,y=0,w=0,b=0,P=0,z=0,k=0,N=0,oe=0,A=0;m.sort(yT);const R=g===!0?Math.PI:1;for(let ue=0,de=m.length;ue<de;ue++){const B=m[ue],V=B.color,$=B.intensity,Q=B.distance,U=B.shadow&&B.shadow.map?B.shadow.map.texture:null;if(B.isAmbientLight)_+=V.r*$*R,S+=V.g*$*R,T+=V.b*$*R;else if(B.isLightProbe){for(let Y=0;Y<9;Y++)o.probe[Y].addScaledVector(B.sh.coefficients[Y],$);A++}else if(B.isDirectionalLight){const Y=t.get(B);if(Y.color.copy(B.color).multiplyScalar(B.intensity*R),B.castShadow){const H=B.shadow,I=s.get(B);I.shadowBias=H.bias,I.shadowNormalBias=H.normalBias,I.shadowRadius=H.radius,I.shadowMapSize=H.mapSize,o.directionalShadow[M]=I,o.directionalShadowMap[M]=U,o.directionalShadowMatrix[M]=B.shadow.matrix,P++}o.directional[M]=Y,M++}else if(B.isSpotLight){const Y=t.get(B);Y.position.setFromMatrixPosition(B.matrixWorld),Y.color.copy(V).multiplyScalar($*R),Y.distance=Q,Y.coneCos=Math.cos(B.angle),Y.penumbraCos=Math.cos(B.angle*(1-B.penumbra)),Y.decay=B.decay,o.spot[y]=Y;const H=B.shadow;if(B.map&&(o.spotLightMap[N]=B.map,N++,H.updateMatrices(B),B.castShadow&&oe++),o.spotLightMatrix[y]=H.matrix,B.castShadow){const I=s.get(B);I.shadowBias=H.bias,I.shadowNormalBias=H.normalBias,I.shadowRadius=H.radius,I.shadowMapSize=H.mapSize,o.spotShadow[y]=I,o.spotShadowMap[y]=U,k++}y++}else if(B.isRectAreaLight){const Y=t.get(B);Y.color.copy(V).multiplyScalar($),Y.halfWidth.set(B.width*.5,0,0),Y.halfHeight.set(0,B.height*.5,0),o.rectArea[w]=Y,w++}else if(B.isPointLight){const Y=t.get(B);if(Y.color.copy(B.color).multiplyScalar(B.intensity*R),Y.distance=B.distance,Y.decay=B.decay,B.castShadow){const H=B.shadow,I=s.get(B);I.shadowBias=H.bias,I.shadowNormalBias=H.normalBias,I.shadowRadius=H.radius,I.shadowMapSize=H.mapSize,I.shadowCameraNear=H.camera.near,I.shadowCameraFar=H.camera.far,o.pointShadow[x]=I,o.pointShadowMap[x]=U,o.pointShadowMatrix[x]=B.shadow.matrix,z++}o.point[x]=Y,x++}else if(B.isHemisphereLight){const Y=t.get(B);Y.skyColor.copy(B.color).multiplyScalar($*R),Y.groundColor.copy(B.groundColor).multiplyScalar($*R),o.hemi[b]=Y,b++}}w>0&&(e.isWebGL2?r.has("OES_texture_float_linear")===!0?(o.rectAreaLTC1=Ie.LTC_FLOAT_1,o.rectAreaLTC2=Ie.LTC_FLOAT_2):(o.rectAreaLTC1=Ie.LTC_HALF_1,o.rectAreaLTC2=Ie.LTC_HALF_2):r.has("OES_texture_float_linear")===!0?(o.rectAreaLTC1=Ie.LTC_FLOAT_1,o.rectAreaLTC2=Ie.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(o.rectAreaLTC1=Ie.LTC_HALF_1,o.rectAreaLTC2=Ie.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),o.ambient[0]=_,o.ambient[1]=S,o.ambient[2]=T;const ie=o.hash;(ie.directionalLength!==M||ie.pointLength!==x||ie.spotLength!==y||ie.rectAreaLength!==w||ie.hemiLength!==b||ie.numDirectionalShadows!==P||ie.numPointShadows!==z||ie.numSpotShadows!==k||ie.numSpotMaps!==N||ie.numLightProbes!==A)&&(o.directional.length=M,o.spot.length=y,o.rectArea.length=w,o.point.length=x,o.hemi.length=b,o.directionalShadow.length=P,o.directionalShadowMap.length=P,o.pointShadow.length=z,o.pointShadowMap.length=z,o.spotShadow.length=k,o.spotShadowMap.length=k,o.directionalShadowMatrix.length=P,o.pointShadowMatrix.length=z,o.spotLightMatrix.length=k+N-oe,o.spotLightMap.length=N,o.numSpotLightShadowsWithMaps=oe,o.numLightProbes=A,ie.directionalLength=M,ie.pointLength=x,ie.spotLength=y,ie.rectAreaLength=w,ie.hemiLength=b,ie.numDirectionalShadows=P,ie.numPointShadows=z,ie.numSpotShadows=k,ie.numSpotMaps=N,ie.numLightProbes=A,o.version=xT++)}function h(m,g){let _=0,S=0,T=0,M=0,x=0;const y=g.matrixWorldInverse;for(let w=0,b=m.length;w<b;w++){const P=m[w];if(P.isDirectionalLight){const z=o.directional[_];z.direction.setFromMatrixPosition(P.matrixWorld),l.setFromMatrixPosition(P.target.matrixWorld),z.direction.sub(l),z.direction.transformDirection(y),_++}else if(P.isSpotLight){const z=o.spot[T];z.position.setFromMatrixPosition(P.matrixWorld),z.position.applyMatrix4(y),z.direction.setFromMatrixPosition(P.matrixWorld),l.setFromMatrixPosition(P.target.matrixWorld),z.direction.sub(l),z.direction.transformDirection(y),T++}else if(P.isRectAreaLight){const z=o.rectArea[M];z.position.setFromMatrixPosition(P.matrixWorld),z.position.applyMatrix4(y),d.identity(),u.copy(P.matrixWorld),u.premultiply(y),d.extractRotation(u),z.halfWidth.set(P.width*.5,0,0),z.halfHeight.set(0,P.height*.5,0),z.halfWidth.applyMatrix4(d),z.halfHeight.applyMatrix4(d),M++}else if(P.isPointLight){const z=o.point[S];z.position.setFromMatrixPosition(P.matrixWorld),z.position.applyMatrix4(y),S++}else if(P.isHemisphereLight){const z=o.hemi[x];z.direction.setFromMatrixPosition(P.matrixWorld),z.direction.transformDirection(y),x++}}}return{setup:f,setupView:h,state:o}}function ig(r,e){const t=new ST(r,e),s=[],o=[];function l(){s.length=0,o.length=0}function u(g){s.push(g)}function d(g){o.push(g)}function f(g){t.setup(s,g)}function h(g){t.setupView(s,g)}return{init:l,state:{lightsArray:s,shadowsArray:o,lights:t},setupLights:f,setupLightsView:h,pushLight:u,pushShadow:d}}function MT(r,e){let t=new WeakMap;function s(l,u=0){const d=t.get(l);let f;return d===void 0?(f=new ig(r,e),t.set(l,[f])):u>=d.length?(f=new ig(r,e),d.push(f)):f=d[u],f}function o(){t=new WeakMap}return{get:s,dispose:o}}class ET extends ca{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=xy,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class TT extends ca{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const wT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,AT=`uniform sampler2D shadow_pass;
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
}`;function CT(r,e,t){let s=new Vd;const o=new Tt,l=new Tt,u=new sn,d=new ET({depthPacking:yy}),f=new TT,h={},m=t.maxTextureSize,g={[br]:kn,[kn]:br,[ji]:ji},_=new as({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Tt},radius:{value:4}},vertexShader:wT,fragmentShader:AT}),S=_.clone();S.defines.HORIZONTAL_PASS=1;const T=new Lr;T.setAttribute("position",new Ai(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new qi(T,_),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Lg;let y=this.type;this.render=function(k,N,oe){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||k.length===0)return;const A=r.getRenderTarget(),R=r.getActiveCubeFace(),ie=r.getActiveMipmapLevel(),ue=r.state;ue.setBlending(wr),ue.buffers.color.setClear(1,1,1,1),ue.buffers.depth.setTest(!0),ue.setScissorTest(!1);const de=y!==Wi&&this.type===Wi,B=y===Wi&&this.type!==Wi;for(let V=0,$=k.length;V<$;V++){const Q=k[V],U=Q.shadow;if(U===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;o.copy(U.mapSize);const Y=U.getFrameExtents();if(o.multiply(Y),l.copy(U.mapSize),(o.x>m||o.y>m)&&(o.x>m&&(l.x=Math.floor(m/Y.x),o.x=l.x*Y.x,U.mapSize.x=l.x),o.y>m&&(l.y=Math.floor(m/Y.y),o.y=l.y*Y.y,U.mapSize.y=l.y)),U.map===null||de===!0||B===!0){const I=this.type!==Wi?{minFilter:wn,magFilter:wn}:{};U.map!==null&&U.map.dispose(),U.map=new os(o.x,o.y,I),U.map.texture.name=Q.name+".shadowMap",U.camera.updateProjectionMatrix()}r.setRenderTarget(U.map),r.clear();const H=U.getViewportCount();for(let I=0;I<H;I++){const G=U.getViewport(I);u.set(l.x*G.x,l.y*G.y,l.x*G.z,l.y*G.w),ue.viewport(u),U.updateMatrices(Q,I),s=U.getFrustum(),P(N,oe,U.camera,Q,this.type)}U.isPointLightShadow!==!0&&this.type===Wi&&w(U,oe),U.needsUpdate=!1}y=this.type,x.needsUpdate=!1,r.setRenderTarget(A,R,ie)};function w(k,N){const oe=e.update(M);_.defines.VSM_SAMPLES!==k.blurSamples&&(_.defines.VSM_SAMPLES=k.blurSamples,S.defines.VSM_SAMPLES=k.blurSamples,_.needsUpdate=!0,S.needsUpdate=!0),k.mapPass===null&&(k.mapPass=new os(o.x,o.y)),_.uniforms.shadow_pass.value=k.map.texture,_.uniforms.resolution.value=k.mapSize,_.uniforms.radius.value=k.radius,r.setRenderTarget(k.mapPass),r.clear(),r.renderBufferDirect(N,null,oe,_,M,null),S.uniforms.shadow_pass.value=k.mapPass.texture,S.uniforms.resolution.value=k.mapSize,S.uniforms.radius.value=k.radius,r.setRenderTarget(k.map),r.clear(),r.renderBufferDirect(N,null,oe,S,M,null)}function b(k,N,oe,A){let R=null;const ie=oe.isPointLight===!0?k.customDistanceMaterial:k.customDepthMaterial;if(ie!==void 0)R=ie;else if(R=oe.isPointLight===!0?f:d,r.localClippingEnabled&&N.clipShadows===!0&&Array.isArray(N.clippingPlanes)&&N.clippingPlanes.length!==0||N.displacementMap&&N.displacementScale!==0||N.alphaMap&&N.alphaTest>0||N.map&&N.alphaTest>0){const ue=R.uuid,de=N.uuid;let B=h[ue];B===void 0&&(B={},h[ue]=B);let V=B[de];V===void 0&&(V=R.clone(),B[de]=V,N.addEventListener("dispose",z)),R=V}if(R.visible=N.visible,R.wireframe=N.wireframe,A===Wi?R.side=N.shadowSide!==null?N.shadowSide:N.side:R.side=N.shadowSide!==null?N.shadowSide:g[N.side],R.alphaMap=N.alphaMap,R.alphaTest=N.alphaTest,R.map=N.map,R.clipShadows=N.clipShadows,R.clippingPlanes=N.clippingPlanes,R.clipIntersection=N.clipIntersection,R.displacementMap=N.displacementMap,R.displacementScale=N.displacementScale,R.displacementBias=N.displacementBias,R.wireframeLinewidth=N.wireframeLinewidth,R.linewidth=N.linewidth,oe.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const ue=r.properties.get(R);ue.light=oe}return R}function P(k,N,oe,A,R){if(k.visible===!1)return;if(k.layers.test(N.layers)&&(k.isMesh||k.isLine||k.isPoints)&&(k.castShadow||k.receiveShadow&&R===Wi)&&(!k.frustumCulled||s.intersectsObject(k))){k.modelViewMatrix.multiplyMatrices(oe.matrixWorldInverse,k.matrixWorld);const de=e.update(k),B=k.material;if(Array.isArray(B)){const V=de.groups;for(let $=0,Q=V.length;$<Q;$++){const U=V[$],Y=B[U.materialIndex];if(Y&&Y.visible){const H=b(k,Y,A,R);k.onBeforeShadow(r,k,N,oe,de,H,U),r.renderBufferDirect(oe,null,de,H,k,U),k.onAfterShadow(r,k,N,oe,de,H,U)}}}else if(B.visible){const V=b(k,B,A,R);k.onBeforeShadow(r,k,N,oe,de,V,null),r.renderBufferDirect(oe,null,de,V,k,null),k.onAfterShadow(r,k,N,oe,de,V,null)}}const ue=k.children;for(let de=0,B=ue.length;de<B;de++)P(ue[de],N,oe,A,R)}function z(k){k.target.removeEventListener("dispose",z);for(const oe in h){const A=h[oe],R=k.target.uuid;R in A&&(A[R].dispose(),delete A[R])}}}function bT(r,e,t){const s=t.isWebGL2;function o(){let X=!1;const De=new sn;let Oe=null;const tt=new sn(0,0,0,0);return{setMask:function(Ze){Oe!==Ze&&!X&&(r.colorMask(Ze,Ze,Ze,Ze),Oe=Ze)},setLocked:function(Ze){X=Ze},setClear:function(Ze,wt,At,Bt,Jt){Jt===!0&&(Ze*=Bt,wt*=Bt,At*=Bt),De.set(Ze,wt,At,Bt),tt.equals(De)===!1&&(r.clearColor(Ze,wt,At,Bt),tt.copy(De))},reset:function(){X=!1,Oe=null,tt.set(-1,0,0,0)}}}function l(){let X=!1,De=null,Oe=null,tt=null;return{setTest:function(Ze){Ze?Ne(r.DEPTH_TEST):he(r.DEPTH_TEST)},setMask:function(Ze){De!==Ze&&!X&&(r.depthMask(Ze),De=Ze)},setFunc:function(Ze){if(Oe!==Ze){switch(Ze){case $x:r.depthFunc(r.NEVER);break;case Kx:r.depthFunc(r.ALWAYS);break;case Zx:r.depthFunc(r.LESS);break;case Wl:r.depthFunc(r.LEQUAL);break;case Qx:r.depthFunc(r.EQUAL);break;case Jx:r.depthFunc(r.GEQUAL);break;case ey:r.depthFunc(r.GREATER);break;case ty:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Oe=Ze}},setLocked:function(Ze){X=Ze},setClear:function(Ze){tt!==Ze&&(r.clearDepth(Ze),tt=Ze)},reset:function(){X=!1,De=null,Oe=null,tt=null}}}function u(){let X=!1,De=null,Oe=null,tt=null,Ze=null,wt=null,At=null,Bt=null,Jt=null;return{setTest:function(yt){X||(yt?Ne(r.STENCIL_TEST):he(r.STENCIL_TEST))},setMask:function(yt){De!==yt&&!X&&(r.stencilMask(yt),De=yt)},setFunc:function(yt,Yt,dn){(Oe!==yt||tt!==Yt||Ze!==dn)&&(r.stencilFunc(yt,Yt,dn),Oe=yt,tt=Yt,Ze=dn)},setOp:function(yt,Yt,dn){(wt!==yt||At!==Yt||Bt!==dn)&&(r.stencilOp(yt,Yt,dn),wt=yt,At=Yt,Bt=dn)},setLocked:function(yt){X=yt},setClear:function(yt){Jt!==yt&&(r.clearStencil(yt),Jt=yt)},reset:function(){X=!1,De=null,Oe=null,tt=null,Ze=null,wt=null,At=null,Bt=null,Jt=null}}}const d=new o,f=new l,h=new u,m=new WeakMap,g=new WeakMap;let _={},S={},T=new WeakMap,M=[],x=null,y=!1,w=null,b=null,P=null,z=null,k=null,N=null,oe=null,A=new Mt(0,0,0),R=0,ie=!1,ue=null,de=null,B=null,V=null,$=null;const Q=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let U=!1,Y=0;const H=r.getParameter(r.VERSION);H.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(H)[1]),U=Y>=1):H.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),U=Y>=2);let I=null,G={};const j=r.getParameter(r.SCISSOR_BOX),Z=r.getParameter(r.VIEWPORT),fe=new sn().fromArray(j),xe=new sn().fromArray(Z);function Ee(X,De,Oe,tt){const Ze=new Uint8Array(4),wt=r.createTexture();r.bindTexture(X,wt),r.texParameteri(X,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(X,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let At=0;At<Oe;At++)s&&(X===r.TEXTURE_3D||X===r.TEXTURE_2D_ARRAY)?r.texImage3D(De,0,r.RGBA,1,1,tt,0,r.RGBA,r.UNSIGNED_BYTE,Ze):r.texImage2D(De+At,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Ze);return wt}const Te={};Te[r.TEXTURE_2D]=Ee(r.TEXTURE_2D,r.TEXTURE_2D,1),Te[r.TEXTURE_CUBE_MAP]=Ee(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),s&&(Te[r.TEXTURE_2D_ARRAY]=Ee(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Te[r.TEXTURE_3D]=Ee(r.TEXTURE_3D,r.TEXTURE_3D,1,1)),d.setClear(0,0,0,1),f.setClear(1),h.setClear(0),Ne(r.DEPTH_TEST),f.setFunc(Wl),Xe(!1),L(kp),Ne(r.CULL_FACE),Ue(wr);function Ne(X){_[X]!==!0&&(r.enable(X),_[X]=!0)}function he(X){_[X]!==!1&&(r.disable(X),_[X]=!1)}function ve(X,De){return S[X]!==De?(r.bindFramebuffer(X,De),S[X]=De,s&&(X===r.DRAW_FRAMEBUFFER&&(S[r.FRAMEBUFFER]=De),X===r.FRAMEBUFFER&&(S[r.DRAW_FRAMEBUFFER]=De)),!0):!1}function K(X,De){let Oe=M,tt=!1;if(X)if(Oe=T.get(De),Oe===void 0&&(Oe=[],T.set(De,Oe)),X.isWebGLMultipleRenderTargets){const Ze=X.texture;if(Oe.length!==Ze.length||Oe[0]!==r.COLOR_ATTACHMENT0){for(let wt=0,At=Ze.length;wt<At;wt++)Oe[wt]=r.COLOR_ATTACHMENT0+wt;Oe.length=Ze.length,tt=!0}}else Oe[0]!==r.COLOR_ATTACHMENT0&&(Oe[0]=r.COLOR_ATTACHMENT0,tt=!0);else Oe[0]!==r.BACK&&(Oe[0]=r.BACK,tt=!0);tt&&(t.isWebGL2?r.drawBuffers(Oe):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(Oe))}function nt(X){return x!==X?(r.useProgram(X),x=X,!0):!1}const Pe={[Jr]:r.FUNC_ADD,[Nx]:r.FUNC_SUBTRACT,[Ux]:r.FUNC_REVERSE_SUBTRACT};if(s)Pe[Gp]=r.MIN,Pe[Vp]=r.MAX;else{const X=e.get("EXT_blend_minmax");X!==null&&(Pe[Gp]=X.MIN_EXT,Pe[Vp]=X.MAX_EXT)}const Ve={[Ox]:r.ZERO,[Fx]:r.ONE,[kx]:r.SRC_COLOR,[Ad]:r.SRC_ALPHA,[Wx]:r.SRC_ALPHA_SATURATE,[Gx]:r.DST_COLOR,[zx]:r.DST_ALPHA,[Bx]:r.ONE_MINUS_SRC_COLOR,[Cd]:r.ONE_MINUS_SRC_ALPHA,[Vx]:r.ONE_MINUS_DST_COLOR,[Hx]:r.ONE_MINUS_DST_ALPHA,[jx]:r.CONSTANT_COLOR,[Xx]:r.ONE_MINUS_CONSTANT_COLOR,[Yx]:r.CONSTANT_ALPHA,[qx]:r.ONE_MINUS_CONSTANT_ALPHA};function Ue(X,De,Oe,tt,Ze,wt,At,Bt,Jt,yt){if(X===wr){y===!0&&(he(r.BLEND),y=!1);return}if(y===!1&&(Ne(r.BLEND),y=!0),X!==Ix){if(X!==w||yt!==ie){if((b!==Jr||k!==Jr)&&(r.blendEquation(r.FUNC_ADD),b=Jr,k=Jr),yt)switch(X){case Zs:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Bp:r.blendFunc(r.ONE,r.ONE);break;case zp:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Hp:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}else switch(X){case Zs:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Bp:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case zp:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Hp:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}P=null,z=null,N=null,oe=null,A.set(0,0,0),R=0,w=X,ie=yt}return}Ze=Ze||De,wt=wt||Oe,At=At||tt,(De!==b||Ze!==k)&&(r.blendEquationSeparate(Pe[De],Pe[Ze]),b=De,k=Ze),(Oe!==P||tt!==z||wt!==N||At!==oe)&&(r.blendFuncSeparate(Ve[Oe],Ve[tt],Ve[wt],Ve[At]),P=Oe,z=tt,N=wt,oe=At),(Bt.equals(A)===!1||Jt!==R)&&(r.blendColor(Bt.r,Bt.g,Bt.b,Jt),A.copy(Bt),R=Jt),w=X,ie=!1}function $e(X,De){X.side===ji?he(r.CULL_FACE):Ne(r.CULL_FACE);let Oe=X.side===kn;De&&(Oe=!Oe),Xe(Oe),X.blending===Zs&&X.transparent===!1?Ue(wr):Ue(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),f.setFunc(X.depthFunc),f.setTest(X.depthTest),f.setMask(X.depthWrite),d.setMask(X.colorWrite);const tt=X.stencilWrite;h.setTest(tt),tt&&(h.setMask(X.stencilWriteMask),h.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),h.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),te(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?Ne(r.SAMPLE_ALPHA_TO_COVERAGE):he(r.SAMPLE_ALPHA_TO_COVERAGE)}function Xe(X){ue!==X&&(X?r.frontFace(r.CW):r.frontFace(r.CCW),ue=X)}function L(X){X!==Lx?(Ne(r.CULL_FACE),X!==de&&(X===kp?r.cullFace(r.BACK):X===Px?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):he(r.CULL_FACE),de=X}function C(X){X!==B&&(U&&r.lineWidth(X),B=X)}function te(X,De,Oe){X?(Ne(r.POLYGON_OFFSET_FILL),(V!==De||$!==Oe)&&(r.polygonOffset(De,Oe),V=De,$=Oe)):he(r.POLYGON_OFFSET_FILL)}function _e(X){X?Ne(r.SCISSOR_TEST):he(r.SCISSOR_TEST)}function ge(X){X===void 0&&(X=r.TEXTURE0+Q-1),I!==X&&(r.activeTexture(X),I=X)}function me(X,De,Oe){Oe===void 0&&(I===null?Oe=r.TEXTURE0+Q-1:Oe=I);let tt=G[Oe];tt===void 0&&(tt={type:void 0,texture:void 0},G[Oe]=tt),(tt.type!==X||tt.texture!==De)&&(I!==Oe&&(r.activeTexture(Oe),I=Oe),r.bindTexture(X,De||Te[X]),tt.type=X,tt.texture=De)}function Le(){const X=G[I];X!==void 0&&X.type!==void 0&&(r.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function Ae(){try{r.compressedTexImage2D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function be(){try{r.compressedTexImage3D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Ke(){try{r.texSubImage2D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function at(){try{r.texSubImage3D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Se(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function vt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function lt(){try{r.texStorage2D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function it(){try{r.texStorage3D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function qe(){try{r.texImage2D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function He(){try{r.texImage3D.apply(r,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function st(X){fe.equals(X)===!1&&(r.scissor(X.x,X.y,X.z,X.w),fe.copy(X))}function pt(X){xe.equals(X)===!1&&(r.viewport(X.x,X.y,X.z,X.w),xe.copy(X))}function Et(X,De){let Oe=g.get(De);Oe===void 0&&(Oe=new WeakMap,g.set(De,Oe));let tt=Oe.get(X);tt===void 0&&(tt=r.getUniformBlockIndex(De,X.name),Oe.set(X,tt))}function ut(X,De){const tt=g.get(De).get(X);m.get(De)!==tt&&(r.uniformBlockBinding(De,tt,X.__bindingPointIndex),m.set(De,tt))}function Re(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),s===!0&&(r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),_={},I=null,G={},S={},T=new WeakMap,M=[],x=null,y=!1,w=null,b=null,P=null,z=null,k=null,N=null,oe=null,A=new Mt(0,0,0),R=0,ie=!1,ue=null,de=null,B=null,V=null,$=null,fe.set(0,0,r.canvas.width,r.canvas.height),xe.set(0,0,r.canvas.width,r.canvas.height),d.reset(),f.reset(),h.reset()}return{buffers:{color:d,depth:f,stencil:h},enable:Ne,disable:he,bindFramebuffer:ve,drawBuffers:K,useProgram:nt,setBlending:Ue,setMaterial:$e,setFlipSided:Xe,setCullFace:L,setLineWidth:C,setPolygonOffset:te,setScissorTest:_e,activeTexture:ge,bindTexture:me,unbindTexture:Le,compressedTexImage2D:Ae,compressedTexImage3D:be,texImage2D:qe,texImage3D:He,updateUBOMapping:Et,uniformBlockBinding:ut,texStorage2D:lt,texStorage3D:it,texSubImage2D:Ke,texSubImage3D:at,compressedTexSubImage2D:Se,compressedTexSubImage3D:vt,scissor:st,viewport:pt,reset:Re}}function RT(r,e,t,s,o,l,u){const d=o.isWebGL2,f=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new WeakMap;let g;const _=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function T(L,C){return S?new OffscreenCanvas(L,C):Kl("canvas")}function M(L,C,te,_e){let ge=1;if((L.width>_e||L.height>_e)&&(ge=_e/Math.max(L.width,L.height)),ge<1||C===!0)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap){const me=C?Id:Math.floor,Le=me(ge*L.width),Ae=me(ge*L.height);g===void 0&&(g=T(Le,Ae));const be=te?T(Le,Ae):g;return be.width=Le,be.height=Ae,be.getContext("2d").drawImage(L,0,0,Le,Ae),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+L.width+"x"+L.height+") to ("+Le+"x"+Ae+")."),be}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+L.width+"x"+L.height+")."),L;return L}function x(L){return xm(L.width)&&xm(L.height)}function y(L){return d?!1:L.wrapS!==si||L.wrapT!==si||L.minFilter!==wn&&L.minFilter!==Yn}function w(L,C){return L.generateMipmaps&&C&&L.minFilter!==wn&&L.minFilter!==Yn}function b(L){r.generateMipmap(L)}function P(L,C,te,_e,ge=!1){if(d===!1)return C;if(L!==null){if(r[L]!==void 0)return r[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let me=C;if(C===r.RED&&(te===r.FLOAT&&(me=r.R32F),te===r.HALF_FLOAT&&(me=r.R16F),te===r.UNSIGNED_BYTE&&(me=r.R8)),C===r.RED_INTEGER&&(te===r.UNSIGNED_BYTE&&(me=r.R8UI),te===r.UNSIGNED_SHORT&&(me=r.R16UI),te===r.UNSIGNED_INT&&(me=r.R32UI),te===r.BYTE&&(me=r.R8I),te===r.SHORT&&(me=r.R16I),te===r.INT&&(me=r.R32I)),C===r.RG&&(te===r.FLOAT&&(me=r.RG32F),te===r.HALF_FLOAT&&(me=r.RG16F),te===r.UNSIGNED_BYTE&&(me=r.RG8)),C===r.RGBA){const Le=ge?Xl:bt.getTransfer(_e);te===r.FLOAT&&(me=r.RGBA32F),te===r.HALF_FLOAT&&(me=r.RGBA16F),te===r.UNSIGNED_BYTE&&(me=Le===It?r.SRGB8_ALPHA8:r.RGBA8),te===r.UNSIGNED_SHORT_4_4_4_4&&(me=r.RGBA4),te===r.UNSIGNED_SHORT_5_5_5_1&&(me=r.RGB5_A1)}return(me===r.R16F||me===r.R32F||me===r.RG16F||me===r.RG32F||me===r.RGBA16F||me===r.RGBA32F)&&e.get("EXT_color_buffer_float"),me}function z(L,C,te){return w(L,te)===!0||L.isFramebufferTexture&&L.minFilter!==wn&&L.minFilter!==Yn?Math.log2(Math.max(C.width,C.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?C.mipmaps.length:1}function k(L){return L===wn||L===Wp||L===Wu?r.NEAREST:r.LINEAR}function N(L){const C=L.target;C.removeEventListener("dispose",N),A(C),C.isVideoTexture&&m.delete(C)}function oe(L){const C=L.target;C.removeEventListener("dispose",oe),ie(C)}function A(L){const C=s.get(L);if(C.__webglInit===void 0)return;const te=L.source,_e=_.get(te);if(_e){const ge=_e[C.__cacheKey];ge.usedTimes--,ge.usedTimes===0&&R(L),Object.keys(_e).length===0&&_.delete(te)}s.remove(L)}function R(L){const C=s.get(L);r.deleteTexture(C.__webglTexture);const te=L.source,_e=_.get(te);delete _e[C.__cacheKey],u.memory.textures--}function ie(L){const C=L.texture,te=s.get(L),_e=s.get(C);if(_e.__webglTexture!==void 0&&(r.deleteTexture(_e.__webglTexture),u.memory.textures--),L.depthTexture&&L.depthTexture.dispose(),L.isWebGLCubeRenderTarget)for(let ge=0;ge<6;ge++){if(Array.isArray(te.__webglFramebuffer[ge]))for(let me=0;me<te.__webglFramebuffer[ge].length;me++)r.deleteFramebuffer(te.__webglFramebuffer[ge][me]);else r.deleteFramebuffer(te.__webglFramebuffer[ge]);te.__webglDepthbuffer&&r.deleteRenderbuffer(te.__webglDepthbuffer[ge])}else{if(Array.isArray(te.__webglFramebuffer))for(let ge=0;ge<te.__webglFramebuffer.length;ge++)r.deleteFramebuffer(te.__webglFramebuffer[ge]);else r.deleteFramebuffer(te.__webglFramebuffer);if(te.__webglDepthbuffer&&r.deleteRenderbuffer(te.__webglDepthbuffer),te.__webglMultisampledFramebuffer&&r.deleteFramebuffer(te.__webglMultisampledFramebuffer),te.__webglColorRenderbuffer)for(let ge=0;ge<te.__webglColorRenderbuffer.length;ge++)te.__webglColorRenderbuffer[ge]&&r.deleteRenderbuffer(te.__webglColorRenderbuffer[ge]);te.__webglDepthRenderbuffer&&r.deleteRenderbuffer(te.__webglDepthRenderbuffer)}if(L.isWebGLMultipleRenderTargets)for(let ge=0,me=C.length;ge<me;ge++){const Le=s.get(C[ge]);Le.__webglTexture&&(r.deleteTexture(Le.__webglTexture),u.memory.textures--),s.remove(C[ge])}s.remove(C),s.remove(L)}let ue=0;function de(){ue=0}function B(){const L=ue;return L>=o.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+o.maxTextures),ue+=1,L}function V(L){const C=[];return C.push(L.wrapS),C.push(L.wrapT),C.push(L.wrapR||0),C.push(L.magFilter),C.push(L.minFilter),C.push(L.anisotropy),C.push(L.internalFormat),C.push(L.format),C.push(L.type),C.push(L.generateMipmaps),C.push(L.premultiplyAlpha),C.push(L.flipY),C.push(L.unpackAlignment),C.push(L.colorSpace),C.join()}function $(L,C){const te=s.get(L);if(L.isVideoTexture&&$e(L),L.isRenderTargetTexture===!1&&L.version>0&&te.__version!==L.version){const _e=L.image;if(_e===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(_e.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{fe(te,L,C);return}}t.bindTexture(r.TEXTURE_2D,te.__webglTexture,r.TEXTURE0+C)}function Q(L,C){const te=s.get(L);if(L.version>0&&te.__version!==L.version){fe(te,L,C);return}t.bindTexture(r.TEXTURE_2D_ARRAY,te.__webglTexture,r.TEXTURE0+C)}function U(L,C){const te=s.get(L);if(L.version>0&&te.__version!==L.version){fe(te,L,C);return}t.bindTexture(r.TEXTURE_3D,te.__webglTexture,r.TEXTURE0+C)}function Y(L,C){const te=s.get(L);if(L.version>0&&te.__version!==L.version){xe(te,L,C);return}t.bindTexture(r.TEXTURE_CUBE_MAP,te.__webglTexture,r.TEXTURE0+C)}const H={[jl]:r.REPEAT,[si]:r.CLAMP_TO_EDGE,[Ld]:r.MIRRORED_REPEAT},I={[wn]:r.NEAREST,[Wp]:r.NEAREST_MIPMAP_NEAREST,[Wu]:r.NEAREST_MIPMAP_LINEAR,[Yn]:r.LINEAR,[uy]:r.LINEAR_MIPMAP_NEAREST,[no]:r.LINEAR_MIPMAP_LINEAR},G={[My]:r.NEVER,[by]:r.ALWAYS,[Ey]:r.LESS,[Gg]:r.LEQUAL,[Ty]:r.EQUAL,[Cy]:r.GEQUAL,[wy]:r.GREATER,[Ay]:r.NOTEQUAL};function j(L,C,te){if(te?(r.texParameteri(L,r.TEXTURE_WRAP_S,H[C.wrapS]),r.texParameteri(L,r.TEXTURE_WRAP_T,H[C.wrapT]),(L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY)&&r.texParameteri(L,r.TEXTURE_WRAP_R,H[C.wrapR]),r.texParameteri(L,r.TEXTURE_MAG_FILTER,I[C.magFilter]),r.texParameteri(L,r.TEXTURE_MIN_FILTER,I[C.minFilter])):(r.texParameteri(L,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(L,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),(L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY)&&r.texParameteri(L,r.TEXTURE_WRAP_R,r.CLAMP_TO_EDGE),(C.wrapS!==si||C.wrapT!==si)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(L,r.TEXTURE_MAG_FILTER,k(C.magFilter)),r.texParameteri(L,r.TEXTURE_MIN_FILTER,k(C.minFilter)),C.minFilter!==wn&&C.minFilter!==Yn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),C.compareFunction&&(r.texParameteri(L,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(L,r.TEXTURE_COMPARE_FUNC,G[C.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const _e=e.get("EXT_texture_filter_anisotropic");if(C.magFilter===wn||C.minFilter!==Wu&&C.minFilter!==no||C.type===Tr&&e.has("OES_texture_float_linear")===!1||d===!1&&C.type===na&&e.has("OES_texture_half_float_linear")===!1)return;(C.anisotropy>1||s.get(C).__currentAnisotropy)&&(r.texParameterf(L,_e.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,o.getMaxAnisotropy())),s.get(C).__currentAnisotropy=C.anisotropy)}}function Z(L,C){let te=!1;L.__webglInit===void 0&&(L.__webglInit=!0,C.addEventListener("dispose",N));const _e=C.source;let ge=_.get(_e);ge===void 0&&(ge={},_.set(_e,ge));const me=V(C);if(me!==L.__cacheKey){ge[me]===void 0&&(ge[me]={texture:r.createTexture(),usedTimes:0},u.memory.textures++,te=!0),ge[me].usedTimes++;const Le=ge[L.__cacheKey];Le!==void 0&&(ge[L.__cacheKey].usedTimes--,Le.usedTimes===0&&R(C)),L.__cacheKey=me,L.__webglTexture=ge[me].texture}return te}function fe(L,C,te){let _e=r.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(_e=r.TEXTURE_2D_ARRAY),C.isData3DTexture&&(_e=r.TEXTURE_3D);const ge=Z(L,C),me=C.source;t.bindTexture(_e,L.__webglTexture,r.TEXTURE0+te);const Le=s.get(me);if(me.version!==Le.__version||ge===!0){t.activeTexture(r.TEXTURE0+te);const Ae=bt.getPrimaries(bt.workingColorSpace),be=C.colorSpace===oi?null:bt.getPrimaries(C.colorSpace),Ke=C.colorSpace===oi||Ae===be?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,C.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,C.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ke);const at=y(C)&&x(C.image)===!1;let Se=M(C.image,at,!1,o.maxTextureSize);Se=Xe(C,Se);const vt=x(Se)||d,lt=l.convert(C.format,C.colorSpace);let it=l.convert(C.type),qe=P(C.internalFormat,lt,it,C.colorSpace,C.isVideoTexture);j(_e,C,vt);let He;const st=C.mipmaps,pt=d&&C.isVideoTexture!==!0&&qe!==Bg,Et=Le.__version===void 0||ge===!0,ut=z(C,Se,vt);if(C.isDepthTexture)qe=r.DEPTH_COMPONENT,d?C.type===Tr?qe=r.DEPTH_COMPONENT32F:C.type===Er?qe=r.DEPTH_COMPONENT24:C.type===is?qe=r.DEPTH24_STENCIL8:qe=r.DEPTH_COMPONENT16:C.type===Tr&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),C.format===rs&&qe===r.DEPTH_COMPONENT&&C.type!==zd&&C.type!==Er&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),C.type=Er,it=l.convert(C.type)),C.format===io&&qe===r.DEPTH_COMPONENT&&(qe=r.DEPTH_STENCIL,C.type!==is&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),C.type=is,it=l.convert(C.type))),Et&&(pt?t.texStorage2D(r.TEXTURE_2D,1,qe,Se.width,Se.height):t.texImage2D(r.TEXTURE_2D,0,qe,Se.width,Se.height,0,lt,it,null));else if(C.isDataTexture)if(st.length>0&&vt){pt&&Et&&t.texStorage2D(r.TEXTURE_2D,ut,qe,st[0].width,st[0].height);for(let Re=0,X=st.length;Re<X;Re++)He=st[Re],pt?t.texSubImage2D(r.TEXTURE_2D,Re,0,0,He.width,He.height,lt,it,He.data):t.texImage2D(r.TEXTURE_2D,Re,qe,He.width,He.height,0,lt,it,He.data);C.generateMipmaps=!1}else pt?(Et&&t.texStorage2D(r.TEXTURE_2D,ut,qe,Se.width,Se.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,Se.width,Se.height,lt,it,Se.data)):t.texImage2D(r.TEXTURE_2D,0,qe,Se.width,Se.height,0,lt,it,Se.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){pt&&Et&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ut,qe,st[0].width,st[0].height,Se.depth);for(let Re=0,X=st.length;Re<X;Re++)He=st[Re],C.format!==_i?lt!==null?pt?t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Re,0,0,0,He.width,He.height,Se.depth,lt,He.data,0,0):t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Re,qe,He.width,He.height,Se.depth,0,He.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):pt?t.texSubImage3D(r.TEXTURE_2D_ARRAY,Re,0,0,0,He.width,He.height,Se.depth,lt,it,He.data):t.texImage3D(r.TEXTURE_2D_ARRAY,Re,qe,He.width,He.height,Se.depth,0,lt,it,He.data)}else{pt&&Et&&t.texStorage2D(r.TEXTURE_2D,ut,qe,st[0].width,st[0].height);for(let Re=0,X=st.length;Re<X;Re++)He=st[Re],C.format!==_i?lt!==null?pt?t.compressedTexSubImage2D(r.TEXTURE_2D,Re,0,0,He.width,He.height,lt,He.data):t.compressedTexImage2D(r.TEXTURE_2D,Re,qe,He.width,He.height,0,He.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):pt?t.texSubImage2D(r.TEXTURE_2D,Re,0,0,He.width,He.height,lt,it,He.data):t.texImage2D(r.TEXTURE_2D,Re,qe,He.width,He.height,0,lt,it,He.data)}else if(C.isDataArrayTexture)pt?(Et&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ut,qe,Se.width,Se.height,Se.depth),t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,Se.width,Se.height,Se.depth,lt,it,Se.data)):t.texImage3D(r.TEXTURE_2D_ARRAY,0,qe,Se.width,Se.height,Se.depth,0,lt,it,Se.data);else if(C.isData3DTexture)pt?(Et&&t.texStorage3D(r.TEXTURE_3D,ut,qe,Se.width,Se.height,Se.depth),t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,Se.width,Se.height,Se.depth,lt,it,Se.data)):t.texImage3D(r.TEXTURE_3D,0,qe,Se.width,Se.height,Se.depth,0,lt,it,Se.data);else if(C.isFramebufferTexture){if(Et)if(pt)t.texStorage2D(r.TEXTURE_2D,ut,qe,Se.width,Se.height);else{let Re=Se.width,X=Se.height;for(let De=0;De<ut;De++)t.texImage2D(r.TEXTURE_2D,De,qe,Re,X,0,lt,it,null),Re>>=1,X>>=1}}else if(st.length>0&&vt){pt&&Et&&t.texStorage2D(r.TEXTURE_2D,ut,qe,st[0].width,st[0].height);for(let Re=0,X=st.length;Re<X;Re++)He=st[Re],pt?t.texSubImage2D(r.TEXTURE_2D,Re,0,0,lt,it,He):t.texImage2D(r.TEXTURE_2D,Re,qe,lt,it,He);C.generateMipmaps=!1}else pt?(Et&&t.texStorage2D(r.TEXTURE_2D,ut,qe,Se.width,Se.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,lt,it,Se)):t.texImage2D(r.TEXTURE_2D,0,qe,lt,it,Se);w(C,vt)&&b(_e),Le.__version=me.version,C.onUpdate&&C.onUpdate(C)}L.__version=C.version}function xe(L,C,te){if(C.image.length!==6)return;const _e=Z(L,C),ge=C.source;t.bindTexture(r.TEXTURE_CUBE_MAP,L.__webglTexture,r.TEXTURE0+te);const me=s.get(ge);if(ge.version!==me.__version||_e===!0){t.activeTexture(r.TEXTURE0+te);const Le=bt.getPrimaries(bt.workingColorSpace),Ae=C.colorSpace===oi?null:bt.getPrimaries(C.colorSpace),be=C.colorSpace===oi||Le===Ae?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,C.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,C.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);const Ke=C.isCompressedTexture||C.image[0].isCompressedTexture,at=C.image[0]&&C.image[0].isDataTexture,Se=[];for(let Re=0;Re<6;Re++)!Ke&&!at?Se[Re]=M(C.image[Re],!1,!0,o.maxCubemapSize):Se[Re]=at?C.image[Re].image:C.image[Re],Se[Re]=Xe(C,Se[Re]);const vt=Se[0],lt=x(vt)||d,it=l.convert(C.format,C.colorSpace),qe=l.convert(C.type),He=P(C.internalFormat,it,qe,C.colorSpace),st=d&&C.isVideoTexture!==!0,pt=me.__version===void 0||_e===!0;let Et=z(C,vt,lt);j(r.TEXTURE_CUBE_MAP,C,lt);let ut;if(Ke){st&&pt&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Et,He,vt.width,vt.height);for(let Re=0;Re<6;Re++){ut=Se[Re].mipmaps;for(let X=0;X<ut.length;X++){const De=ut[X];C.format!==_i?it!==null?st?t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,X,0,0,De.width,De.height,it,De.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,X,He,De.width,De.height,0,De.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):st?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,X,0,0,De.width,De.height,it,qe,De.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,X,He,De.width,De.height,0,it,qe,De.data)}}}else{ut=C.mipmaps,st&&pt&&(ut.length>0&&Et++,t.texStorage2D(r.TEXTURE_CUBE_MAP,Et,He,Se[0].width,Se[0].height));for(let Re=0;Re<6;Re++)if(at){st?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,0,0,Se[Re].width,Se[Re].height,it,qe,Se[Re].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,He,Se[Re].width,Se[Re].height,0,it,qe,Se[Re].data);for(let X=0;X<ut.length;X++){const Oe=ut[X].image[Re].image;st?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,X+1,0,0,Oe.width,Oe.height,it,qe,Oe.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,X+1,He,Oe.width,Oe.height,0,it,qe,Oe.data)}}else{st?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,0,0,it,qe,Se[Re]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,He,it,qe,Se[Re]);for(let X=0;X<ut.length;X++){const De=ut[X];st?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,X+1,0,0,it,qe,De.image[Re]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,X+1,He,it,qe,De.image[Re])}}}w(C,lt)&&b(r.TEXTURE_CUBE_MAP),me.__version=ge.version,C.onUpdate&&C.onUpdate(C)}L.__version=C.version}function Ee(L,C,te,_e,ge,me){const Le=l.convert(te.format,te.colorSpace),Ae=l.convert(te.type),be=P(te.internalFormat,Le,Ae,te.colorSpace);if(!s.get(C).__hasExternalTextures){const at=Math.max(1,C.width>>me),Se=Math.max(1,C.height>>me);ge===r.TEXTURE_3D||ge===r.TEXTURE_2D_ARRAY?t.texImage3D(ge,me,be,at,Se,C.depth,0,Le,Ae,null):t.texImage2D(ge,me,be,at,Se,0,Le,Ae,null)}t.bindFramebuffer(r.FRAMEBUFFER,L),Ue(C)?f.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,_e,ge,s.get(te).__webglTexture,0,Ve(C)):(ge===r.TEXTURE_2D||ge>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ge<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,_e,ge,s.get(te).__webglTexture,me),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Te(L,C,te){if(r.bindRenderbuffer(r.RENDERBUFFER,L),C.depthBuffer&&!C.stencilBuffer){let _e=d===!0?r.DEPTH_COMPONENT24:r.DEPTH_COMPONENT16;if(te||Ue(C)){const ge=C.depthTexture;ge&&ge.isDepthTexture&&(ge.type===Tr?_e=r.DEPTH_COMPONENT32F:ge.type===Er&&(_e=r.DEPTH_COMPONENT24));const me=Ve(C);Ue(C)?f.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,me,_e,C.width,C.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,me,_e,C.width,C.height)}else r.renderbufferStorage(r.RENDERBUFFER,_e,C.width,C.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,L)}else if(C.depthBuffer&&C.stencilBuffer){const _e=Ve(C);te&&Ue(C)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,_e,r.DEPTH24_STENCIL8,C.width,C.height):Ue(C)?f.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,_e,r.DEPTH24_STENCIL8,C.width,C.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,L)}else{const _e=C.isWebGLMultipleRenderTargets===!0?C.texture:[C.texture];for(let ge=0;ge<_e.length;ge++){const me=_e[ge],Le=l.convert(me.format,me.colorSpace),Ae=l.convert(me.type),be=P(me.internalFormat,Le,Ae,me.colorSpace),Ke=Ve(C);te&&Ue(C)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ke,be,C.width,C.height):Ue(C)?f.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ke,be,C.width,C.height):r.renderbufferStorage(r.RENDERBUFFER,be,C.width,C.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Ne(L,C){if(C&&C.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,L),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!s.get(C.depthTexture).__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),$(C.depthTexture,0);const _e=s.get(C.depthTexture).__webglTexture,ge=Ve(C);if(C.depthTexture.format===rs)Ue(C)?f.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,_e,0,ge):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,_e,0);else if(C.depthTexture.format===io)Ue(C)?f.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,_e,0,ge):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,_e,0);else throw new Error("Unknown depthTexture format")}function he(L){const C=s.get(L),te=L.isWebGLCubeRenderTarget===!0;if(L.depthTexture&&!C.__autoAllocateDepthBuffer){if(te)throw new Error("target.depthTexture not supported in Cube render targets");Ne(C.__webglFramebuffer,L)}else if(te){C.__webglDepthbuffer=[];for(let _e=0;_e<6;_e++)t.bindFramebuffer(r.FRAMEBUFFER,C.__webglFramebuffer[_e]),C.__webglDepthbuffer[_e]=r.createRenderbuffer(),Te(C.__webglDepthbuffer[_e],L,!1)}else t.bindFramebuffer(r.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer=r.createRenderbuffer(),Te(C.__webglDepthbuffer,L,!1);t.bindFramebuffer(r.FRAMEBUFFER,null)}function ve(L,C,te){const _e=s.get(L);C!==void 0&&Ee(_e.__webglFramebuffer,L,L.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),te!==void 0&&he(L)}function K(L){const C=L.texture,te=s.get(L),_e=s.get(C);L.addEventListener("dispose",oe),L.isWebGLMultipleRenderTargets!==!0&&(_e.__webglTexture===void 0&&(_e.__webglTexture=r.createTexture()),_e.__version=C.version,u.memory.textures++);const ge=L.isWebGLCubeRenderTarget===!0,me=L.isWebGLMultipleRenderTargets===!0,Le=x(L)||d;if(ge){te.__webglFramebuffer=[];for(let Ae=0;Ae<6;Ae++)if(d&&C.mipmaps&&C.mipmaps.length>0){te.__webglFramebuffer[Ae]=[];for(let be=0;be<C.mipmaps.length;be++)te.__webglFramebuffer[Ae][be]=r.createFramebuffer()}else te.__webglFramebuffer[Ae]=r.createFramebuffer()}else{if(d&&C.mipmaps&&C.mipmaps.length>0){te.__webglFramebuffer=[];for(let Ae=0;Ae<C.mipmaps.length;Ae++)te.__webglFramebuffer[Ae]=r.createFramebuffer()}else te.__webglFramebuffer=r.createFramebuffer();if(me)if(o.drawBuffers){const Ae=L.texture;for(let be=0,Ke=Ae.length;be<Ke;be++){const at=s.get(Ae[be]);at.__webglTexture===void 0&&(at.__webglTexture=r.createTexture(),u.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(d&&L.samples>0&&Ue(L)===!1){const Ae=me?C:[C];te.__webglMultisampledFramebuffer=r.createFramebuffer(),te.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,te.__webglMultisampledFramebuffer);for(let be=0;be<Ae.length;be++){const Ke=Ae[be];te.__webglColorRenderbuffer[be]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,te.__webglColorRenderbuffer[be]);const at=l.convert(Ke.format,Ke.colorSpace),Se=l.convert(Ke.type),vt=P(Ke.internalFormat,at,Se,Ke.colorSpace,L.isXRRenderTarget===!0),lt=Ve(L);r.renderbufferStorageMultisample(r.RENDERBUFFER,lt,vt,L.width,L.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+be,r.RENDERBUFFER,te.__webglColorRenderbuffer[be])}r.bindRenderbuffer(r.RENDERBUFFER,null),L.depthBuffer&&(te.__webglDepthRenderbuffer=r.createRenderbuffer(),Te(te.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(ge){t.bindTexture(r.TEXTURE_CUBE_MAP,_e.__webglTexture),j(r.TEXTURE_CUBE_MAP,C,Le);for(let Ae=0;Ae<6;Ae++)if(d&&C.mipmaps&&C.mipmaps.length>0)for(let be=0;be<C.mipmaps.length;be++)Ee(te.__webglFramebuffer[Ae][be],L,C,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,be);else Ee(te.__webglFramebuffer[Ae],L,C,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0);w(C,Le)&&b(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(me){const Ae=L.texture;for(let be=0,Ke=Ae.length;be<Ke;be++){const at=Ae[be],Se=s.get(at);t.bindTexture(r.TEXTURE_2D,Se.__webglTexture),j(r.TEXTURE_2D,at,Le),Ee(te.__webglFramebuffer,L,at,r.COLOR_ATTACHMENT0+be,r.TEXTURE_2D,0),w(at,Le)&&b(r.TEXTURE_2D)}t.unbindTexture()}else{let Ae=r.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(d?Ae=L.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(Ae,_e.__webglTexture),j(Ae,C,Le),d&&C.mipmaps&&C.mipmaps.length>0)for(let be=0;be<C.mipmaps.length;be++)Ee(te.__webglFramebuffer[be],L,C,r.COLOR_ATTACHMENT0,Ae,be);else Ee(te.__webglFramebuffer,L,C,r.COLOR_ATTACHMENT0,Ae,0);w(C,Le)&&b(Ae),t.unbindTexture()}L.depthBuffer&&he(L)}function nt(L){const C=x(L)||d,te=L.isWebGLMultipleRenderTargets===!0?L.texture:[L.texture];for(let _e=0,ge=te.length;_e<ge;_e++){const me=te[_e];if(w(me,C)){const Le=L.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,Ae=s.get(me).__webglTexture;t.bindTexture(Le,Ae),b(Le),t.unbindTexture()}}}function Pe(L){if(d&&L.samples>0&&Ue(L)===!1){const C=L.isWebGLMultipleRenderTargets?L.texture:[L.texture],te=L.width,_e=L.height;let ge=r.COLOR_BUFFER_BIT;const me=[],Le=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ae=s.get(L),be=L.isWebGLMultipleRenderTargets===!0;if(be)for(let Ke=0;Ke<C.length;Ke++)t.bindFramebuffer(r.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ke,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,Ae.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ke,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer);for(let Ke=0;Ke<C.length;Ke++){me.push(r.COLOR_ATTACHMENT0+Ke),L.depthBuffer&&me.push(Le);const at=Ae.__ignoreDepthValues!==void 0?Ae.__ignoreDepthValues:!1;if(at===!1&&(L.depthBuffer&&(ge|=r.DEPTH_BUFFER_BIT),L.stencilBuffer&&(ge|=r.STENCIL_BUFFER_BIT)),be&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Ae.__webglColorRenderbuffer[Ke]),at===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[Le]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[Le])),be){const Se=s.get(C[Ke]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Se,0)}r.blitFramebuffer(0,0,te,_e,0,0,te,_e,ge,r.NEAREST),h&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,me)}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),be)for(let Ke=0;Ke<C.length;Ke++){t.bindFramebuffer(r.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ke,r.RENDERBUFFER,Ae.__webglColorRenderbuffer[Ke]);const at=s.get(C[Ke]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,Ae.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ke,r.TEXTURE_2D,at,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer)}}function Ve(L){return Math.min(o.maxSamples,L.samples)}function Ue(L){const C=s.get(L);return d&&L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function $e(L){const C=u.render.frame;m.get(L)!==C&&(m.set(L,C),L.update())}function Xe(L,C){const te=L.colorSpace,_e=L.format,ge=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||L.format===Pd||te!==$i&&te!==oi&&(bt.getTransfer(te)===It?d===!1?e.has("EXT_sRGB")===!0&&_e===_i?(L.format=Pd,L.minFilter=Yn,L.generateMipmaps=!1):C=Wg.sRGBToLinear(C):(_e!==_i||ge!==Cr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",te)),C}this.allocateTextureUnit=B,this.resetTextureUnits=de,this.setTexture2D=$,this.setTexture2DArray=Q,this.setTexture3D=U,this.setTextureCube=Y,this.rebindTextures=ve,this.setupRenderTarget=K,this.updateRenderTargetMipmap=nt,this.updateMultisampleRenderTarget=Pe,this.setupDepthRenderbuffer=he,this.setupFrameBufferTexture=Ee,this.useMultisampledRTT=Ue}function LT(r,e,t){const s=t.isWebGL2;function o(l,u=oi){let d;const f=bt.getTransfer(u);if(l===Cr)return r.UNSIGNED_BYTE;if(l===Ng)return r.UNSIGNED_SHORT_4_4_4_4;if(l===Ug)return r.UNSIGNED_SHORT_5_5_5_1;if(l===dy)return r.BYTE;if(l===fy)return r.SHORT;if(l===zd)return r.UNSIGNED_SHORT;if(l===Ig)return r.INT;if(l===Er)return r.UNSIGNED_INT;if(l===Tr)return r.FLOAT;if(l===na)return s?r.HALF_FLOAT:(d=e.get("OES_texture_half_float"),d!==null?d.HALF_FLOAT_OES:null);if(l===hy)return r.ALPHA;if(l===_i)return r.RGBA;if(l===py)return r.LUMINANCE;if(l===my)return r.LUMINANCE_ALPHA;if(l===rs)return r.DEPTH_COMPONENT;if(l===io)return r.DEPTH_STENCIL;if(l===Pd)return d=e.get("EXT_sRGB"),d!==null?d.SRGB_ALPHA_EXT:null;if(l===gy)return r.RED;if(l===Og)return r.RED_INTEGER;if(l===vy)return r.RG;if(l===Fg)return r.RG_INTEGER;if(l===kg)return r.RGBA_INTEGER;if(l===ju||l===Xu||l===Yu||l===qu)if(f===It)if(d=e.get("WEBGL_compressed_texture_s3tc_srgb"),d!==null){if(l===ju)return d.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(l===Xu)return d.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(l===Yu)return d.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(l===qu)return d.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(d=e.get("WEBGL_compressed_texture_s3tc"),d!==null){if(l===ju)return d.COMPRESSED_RGB_S3TC_DXT1_EXT;if(l===Xu)return d.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(l===Yu)return d.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(l===qu)return d.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(l===jp||l===Xp||l===Yp||l===qp)if(d=e.get("WEBGL_compressed_texture_pvrtc"),d!==null){if(l===jp)return d.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(l===Xp)return d.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(l===Yp)return d.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(l===qp)return d.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(l===Bg)return d=e.get("WEBGL_compressed_texture_etc1"),d!==null?d.COMPRESSED_RGB_ETC1_WEBGL:null;if(l===$p||l===Kp)if(d=e.get("WEBGL_compressed_texture_etc"),d!==null){if(l===$p)return f===It?d.COMPRESSED_SRGB8_ETC2:d.COMPRESSED_RGB8_ETC2;if(l===Kp)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:d.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(l===Zp||l===Qp||l===Jp||l===em||l===tm||l===nm||l===im||l===rm||l===sm||l===om||l===am||l===lm||l===cm||l===um)if(d=e.get("WEBGL_compressed_texture_astc"),d!==null){if(l===Zp)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:d.COMPRESSED_RGBA_ASTC_4x4_KHR;if(l===Qp)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:d.COMPRESSED_RGBA_ASTC_5x4_KHR;if(l===Jp)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:d.COMPRESSED_RGBA_ASTC_5x5_KHR;if(l===em)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:d.COMPRESSED_RGBA_ASTC_6x5_KHR;if(l===tm)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:d.COMPRESSED_RGBA_ASTC_6x6_KHR;if(l===nm)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:d.COMPRESSED_RGBA_ASTC_8x5_KHR;if(l===im)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:d.COMPRESSED_RGBA_ASTC_8x6_KHR;if(l===rm)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:d.COMPRESSED_RGBA_ASTC_8x8_KHR;if(l===sm)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:d.COMPRESSED_RGBA_ASTC_10x5_KHR;if(l===om)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:d.COMPRESSED_RGBA_ASTC_10x6_KHR;if(l===am)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:d.COMPRESSED_RGBA_ASTC_10x8_KHR;if(l===lm)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:d.COMPRESSED_RGBA_ASTC_10x10_KHR;if(l===cm)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:d.COMPRESSED_RGBA_ASTC_12x10_KHR;if(l===um)return f===It?d.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:d.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(l===$u||l===dm||l===fm)if(d=e.get("EXT_texture_compression_bptc"),d!==null){if(l===$u)return f===It?d.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:d.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(l===dm)return d.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(l===fm)return d.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(l===_y||l===hm||l===pm||l===mm)if(d=e.get("EXT_texture_compression_rgtc"),d!==null){if(l===$u)return d.COMPRESSED_RED_RGTC1_EXT;if(l===hm)return d.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(l===pm)return d.COMPRESSED_RED_GREEN_RGTC2_EXT;if(l===mm)return d.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return l===is?s?r.UNSIGNED_INT_24_8:(d=e.get("WEBGL_depth_texture"),d!==null?d.UNSIGNED_INT_24_8_WEBGL:null):r[l]!==void 0?r[l]:null}return{convert:o}}class PT extends ri{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Gl extends un{constructor(){super(),this.isGroup=!0,this.type="Group"}}const DT={type:"move"};class yd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Gl,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Gl,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new le,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new le),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Gl,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new le,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new le),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const s of e.hand.values())this._getHandJoint(t,s)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,s){let o=null,l=null,u=null;const d=this._targetRay,f=this._grip,h=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(h&&e.hand){u=!0;for(const M of e.hand.values()){const x=t.getJointPose(M,s),y=this._getHandJoint(h,M);x!==null&&(y.matrix.fromArray(x.transform.matrix),y.matrix.decompose(y.position,y.rotation,y.scale),y.matrixWorldNeedsUpdate=!0,y.jointRadius=x.radius),y.visible=x!==null}const m=h.joints["index-finger-tip"],g=h.joints["thumb-tip"],_=m.position.distanceTo(g.position),S=.02,T=.005;h.inputState.pinching&&_>S+T?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!h.inputState.pinching&&_<=S-T&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else f!==null&&e.gripSpace&&(l=t.getPose(e.gripSpace,s),l!==null&&(f.matrix.fromArray(l.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,l.linearVelocity?(f.hasLinearVelocity=!0,f.linearVelocity.copy(l.linearVelocity)):f.hasLinearVelocity=!1,l.angularVelocity?(f.hasAngularVelocity=!0,f.angularVelocity.copy(l.angularVelocity)):f.hasAngularVelocity=!1));d!==null&&(o=t.getPose(e.targetRaySpace,s),o===null&&l!==null&&(o=l),o!==null&&(d.matrix.fromArray(o.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,o.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(o.linearVelocity)):d.hasLinearVelocity=!1,o.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(o.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(DT)))}return d!==null&&(d.visible=o!==null),f!==null&&(f.visible=l!==null),h!==null&&(h.visible=u!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const s=new Gl;s.matrixAutoUpdate=!1,s.visible=!1,e.joints[t.jointName]=s,e.add(s)}return e.joints[t.jointName]}}class IT extends ao{constructor(e,t){super();const s=this;let o=null,l=1,u=null,d="local-floor",f=1,h=null,m=null,g=null,_=null,S=null,T=null;const M=t.getContextAttributes();let x=null,y=null;const w=[],b=[],P=new Tt;let z=null;const k=new ri;k.layers.enable(1),k.viewport=new sn;const N=new ri;N.layers.enable(2),N.viewport=new sn;const oe=[k,N],A=new PT;A.layers.enable(1),A.layers.enable(2);let R=null,ie=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let Z=w[j];return Z===void 0&&(Z=new yd,w[j]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(j){let Z=w[j];return Z===void 0&&(Z=new yd,w[j]=Z),Z.getGripSpace()},this.getHand=function(j){let Z=w[j];return Z===void 0&&(Z=new yd,w[j]=Z),Z.getHandSpace()};function ue(j){const Z=b.indexOf(j.inputSource);if(Z===-1)return;const fe=w[Z];fe!==void 0&&(fe.update(j.inputSource,j.frame,h||u),fe.dispatchEvent({type:j.type,data:j.inputSource}))}function de(){o.removeEventListener("select",ue),o.removeEventListener("selectstart",ue),o.removeEventListener("selectend",ue),o.removeEventListener("squeeze",ue),o.removeEventListener("squeezestart",ue),o.removeEventListener("squeezeend",ue),o.removeEventListener("end",de),o.removeEventListener("inputsourceschange",B);for(let j=0;j<w.length;j++){const Z=b[j];Z!==null&&(b[j]=null,w[j].disconnect(Z))}R=null,ie=null,e.setRenderTarget(x),S=null,_=null,g=null,o=null,y=null,G.stop(),s.isPresenting=!1,e.setPixelRatio(z),e.setSize(P.width,P.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){l=j,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){d=j,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||u},this.setReferenceSpace=function(j){h=j},this.getBaseLayer=function(){return _!==null?_:S},this.getBinding=function(){return g},this.getFrame=function(){return T},this.getSession=function(){return o},this.setSession=async function(j){if(o=j,o!==null){if(x=e.getRenderTarget(),o.addEventListener("select",ue),o.addEventListener("selectstart",ue),o.addEventListener("selectend",ue),o.addEventListener("squeeze",ue),o.addEventListener("squeezestart",ue),o.addEventListener("squeezeend",ue),o.addEventListener("end",de),o.addEventListener("inputsourceschange",B),M.xrCompatible!==!0&&await t.makeXRCompatible(),z=e.getPixelRatio(),e.getSize(P),o.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const Z={antialias:o.renderState.layers===void 0?M.antialias:!0,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:l};S=new XRWebGLLayer(o,t,Z),o.updateRenderState({baseLayer:S}),e.setPixelRatio(1),e.setSize(S.framebufferWidth,S.framebufferHeight,!1),y=new os(S.framebufferWidth,S.framebufferHeight,{format:_i,type:Cr,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil})}else{let Z=null,fe=null,xe=null;M.depth&&(xe=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Z=M.stencil?io:rs,fe=M.stencil?is:Er);const Ee={colorFormat:t.RGBA8,depthFormat:xe,scaleFactor:l};g=new XRWebGLBinding(o,t),_=g.createProjectionLayer(Ee),o.updateRenderState({layers:[_]}),e.setPixelRatio(1),e.setSize(_.textureWidth,_.textureHeight,!1),y=new os(_.textureWidth,_.textureHeight,{format:_i,type:Cr,depthTexture:new i0(_.textureWidth,_.textureHeight,fe,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0});const Te=e.properties.get(y);Te.__ignoreDepthValues=_.ignoreDepthValues}y.isXRRenderTarget=!0,this.setFoveation(f),h=null,u=await o.requestReferenceSpace(d),G.setContext(o),G.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode};function B(j){for(let Z=0;Z<j.removed.length;Z++){const fe=j.removed[Z],xe=b.indexOf(fe);xe>=0&&(b[xe]=null,w[xe].disconnect(fe))}for(let Z=0;Z<j.added.length;Z++){const fe=j.added[Z];let xe=b.indexOf(fe);if(xe===-1){for(let Te=0;Te<w.length;Te++)if(Te>=b.length){b.push(fe),xe=Te;break}else if(b[Te]===null){b[Te]=fe,xe=Te;break}if(xe===-1)break}const Ee=w[xe];Ee&&Ee.connect(fe)}}const V=new le,$=new le;function Q(j,Z,fe){V.setFromMatrixPosition(Z.matrixWorld),$.setFromMatrixPosition(fe.matrixWorld);const xe=V.distanceTo($),Ee=Z.projectionMatrix.elements,Te=fe.projectionMatrix.elements,Ne=Ee[14]/(Ee[10]-1),he=Ee[14]/(Ee[10]+1),ve=(Ee[9]+1)/Ee[5],K=(Ee[9]-1)/Ee[5],nt=(Ee[8]-1)/Ee[0],Pe=(Te[8]+1)/Te[0],Ve=Ne*nt,Ue=Ne*Pe,$e=xe/(-nt+Pe),Xe=$e*-nt;Z.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Xe),j.translateZ($e),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert();const L=Ne+$e,C=he+$e,te=Ve-Xe,_e=Ue+(xe-Xe),ge=ve*he/C*L,me=K*he/C*L;j.projectionMatrix.makePerspective(te,_e,ge,me,L,C),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}function U(j,Z){Z===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(Z.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(o===null)return;A.near=N.near=k.near=j.near,A.far=N.far=k.far=j.far,(R!==A.near||ie!==A.far)&&(o.updateRenderState({depthNear:A.near,depthFar:A.far}),R=A.near,ie=A.far);const Z=j.parent,fe=A.cameras;U(A,Z);for(let xe=0;xe<fe.length;xe++)U(fe[xe],Z);fe.length===2?Q(A,k,N):A.projectionMatrix.copy(k.projectionMatrix),Y(j,A,Z)};function Y(j,Z,fe){fe===null?j.matrix.copy(Z.matrixWorld):(j.matrix.copy(fe.matrixWorld),j.matrix.invert(),j.matrix.multiply(Z.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(Z.projectionMatrix),j.projectionMatrixInverse.copy(Z.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Dd*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return A},this.getFoveation=function(){if(!(_===null&&S===null))return f},this.setFoveation=function(j){f=j,_!==null&&(_.fixedFoveation=j),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=j)};let H=null;function I(j,Z){if(m=Z.getViewerPose(h||u),T=Z,m!==null){const fe=m.views;S!==null&&(e.setRenderTargetFramebuffer(y,S.framebuffer),e.setRenderTarget(y));let xe=!1;fe.length!==A.cameras.length&&(A.cameras.length=0,xe=!0);for(let Ee=0;Ee<fe.length;Ee++){const Te=fe[Ee];let Ne=null;if(S!==null)Ne=S.getViewport(Te);else{const ve=g.getViewSubImage(_,Te);Ne=ve.viewport,Ee===0&&(e.setRenderTargetTextures(y,ve.colorTexture,_.ignoreDepthValues?void 0:ve.depthStencilTexture),e.setRenderTarget(y))}let he=oe[Ee];he===void 0&&(he=new ri,he.layers.enable(Ee),he.viewport=new sn,oe[Ee]=he),he.matrix.fromArray(Te.transform.matrix),he.matrix.decompose(he.position,he.quaternion,he.scale),he.projectionMatrix.fromArray(Te.projectionMatrix),he.projectionMatrixInverse.copy(he.projectionMatrix).invert(),he.viewport.set(Ne.x,Ne.y,Ne.width,Ne.height),Ee===0&&(A.matrix.copy(he.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale)),xe===!0&&A.cameras.push(he)}}for(let fe=0;fe<w.length;fe++){const xe=b[fe],Ee=w[fe];xe!==null&&Ee!==void 0&&Ee.update(xe,Z,h||u)}H&&H(j,Z),Z.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:Z}),T=null}const G=new t0;G.setAnimationLoop(I),this.setAnimationLoop=function(j){H=j},this.dispose=function(){}}}function NT(r,e){function t(x,y){x.matrixAutoUpdate===!0&&x.updateMatrix(),y.value.copy(x.matrix)}function s(x,y){y.color.getRGB(x.fogColor.value,Qg(r)),y.isFog?(x.fogNear.value=y.near,x.fogFar.value=y.far):y.isFogExp2&&(x.fogDensity.value=y.density)}function o(x,y,w,b,P){y.isMeshBasicMaterial||y.isMeshLambertMaterial?l(x,y):y.isMeshToonMaterial?(l(x,y),g(x,y)):y.isMeshPhongMaterial?(l(x,y),m(x,y)):y.isMeshStandardMaterial?(l(x,y),_(x,y),y.isMeshPhysicalMaterial&&S(x,y,P)):y.isMeshMatcapMaterial?(l(x,y),T(x,y)):y.isMeshDepthMaterial?l(x,y):y.isMeshDistanceMaterial?(l(x,y),M(x,y)):y.isMeshNormalMaterial?l(x,y):y.isLineBasicMaterial?(u(x,y),y.isLineDashedMaterial&&d(x,y)):y.isPointsMaterial?f(x,y,w,b):y.isSpriteMaterial?h(x,y):y.isShadowMaterial?(x.color.value.copy(y.color),x.opacity.value=y.opacity):y.isShaderMaterial&&(y.uniformsNeedUpdate=!1)}function l(x,y){x.opacity.value=y.opacity,y.color&&x.diffuse.value.copy(y.color),y.emissive&&x.emissive.value.copy(y.emissive).multiplyScalar(y.emissiveIntensity),y.map&&(x.map.value=y.map,t(y.map,x.mapTransform)),y.alphaMap&&(x.alphaMap.value=y.alphaMap,t(y.alphaMap,x.alphaMapTransform)),y.bumpMap&&(x.bumpMap.value=y.bumpMap,t(y.bumpMap,x.bumpMapTransform),x.bumpScale.value=y.bumpScale,y.side===kn&&(x.bumpScale.value*=-1)),y.normalMap&&(x.normalMap.value=y.normalMap,t(y.normalMap,x.normalMapTransform),x.normalScale.value.copy(y.normalScale),y.side===kn&&x.normalScale.value.negate()),y.displacementMap&&(x.displacementMap.value=y.displacementMap,t(y.displacementMap,x.displacementMapTransform),x.displacementScale.value=y.displacementScale,x.displacementBias.value=y.displacementBias),y.emissiveMap&&(x.emissiveMap.value=y.emissiveMap,t(y.emissiveMap,x.emissiveMapTransform)),y.specularMap&&(x.specularMap.value=y.specularMap,t(y.specularMap,x.specularMapTransform)),y.alphaTest>0&&(x.alphaTest.value=y.alphaTest);const w=e.get(y).envMap;if(w&&(x.envMap.value=w,x.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=y.reflectivity,x.ior.value=y.ior,x.refractionRatio.value=y.refractionRatio),y.lightMap){x.lightMap.value=y.lightMap;const b=r._useLegacyLights===!0?Math.PI:1;x.lightMapIntensity.value=y.lightMapIntensity*b,t(y.lightMap,x.lightMapTransform)}y.aoMap&&(x.aoMap.value=y.aoMap,x.aoMapIntensity.value=y.aoMapIntensity,t(y.aoMap,x.aoMapTransform))}function u(x,y){x.diffuse.value.copy(y.color),x.opacity.value=y.opacity,y.map&&(x.map.value=y.map,t(y.map,x.mapTransform))}function d(x,y){x.dashSize.value=y.dashSize,x.totalSize.value=y.dashSize+y.gapSize,x.scale.value=y.scale}function f(x,y,w,b){x.diffuse.value.copy(y.color),x.opacity.value=y.opacity,x.size.value=y.size*w,x.scale.value=b*.5,y.map&&(x.map.value=y.map,t(y.map,x.uvTransform)),y.alphaMap&&(x.alphaMap.value=y.alphaMap,t(y.alphaMap,x.alphaMapTransform)),y.alphaTest>0&&(x.alphaTest.value=y.alphaTest)}function h(x,y){x.diffuse.value.copy(y.color),x.opacity.value=y.opacity,x.rotation.value=y.rotation,y.map&&(x.map.value=y.map,t(y.map,x.mapTransform)),y.alphaMap&&(x.alphaMap.value=y.alphaMap,t(y.alphaMap,x.alphaMapTransform)),y.alphaTest>0&&(x.alphaTest.value=y.alphaTest)}function m(x,y){x.specular.value.copy(y.specular),x.shininess.value=Math.max(y.shininess,1e-4)}function g(x,y){y.gradientMap&&(x.gradientMap.value=y.gradientMap)}function _(x,y){x.metalness.value=y.metalness,y.metalnessMap&&(x.metalnessMap.value=y.metalnessMap,t(y.metalnessMap,x.metalnessMapTransform)),x.roughness.value=y.roughness,y.roughnessMap&&(x.roughnessMap.value=y.roughnessMap,t(y.roughnessMap,x.roughnessMapTransform)),e.get(y).envMap&&(x.envMapIntensity.value=y.envMapIntensity)}function S(x,y,w){x.ior.value=y.ior,y.sheen>0&&(x.sheenColor.value.copy(y.sheenColor).multiplyScalar(y.sheen),x.sheenRoughness.value=y.sheenRoughness,y.sheenColorMap&&(x.sheenColorMap.value=y.sheenColorMap,t(y.sheenColorMap,x.sheenColorMapTransform)),y.sheenRoughnessMap&&(x.sheenRoughnessMap.value=y.sheenRoughnessMap,t(y.sheenRoughnessMap,x.sheenRoughnessMapTransform))),y.clearcoat>0&&(x.clearcoat.value=y.clearcoat,x.clearcoatRoughness.value=y.clearcoatRoughness,y.clearcoatMap&&(x.clearcoatMap.value=y.clearcoatMap,t(y.clearcoatMap,x.clearcoatMapTransform)),y.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=y.clearcoatRoughnessMap,t(y.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),y.clearcoatNormalMap&&(x.clearcoatNormalMap.value=y.clearcoatNormalMap,t(y.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(y.clearcoatNormalScale),y.side===kn&&x.clearcoatNormalScale.value.negate())),y.iridescence>0&&(x.iridescence.value=y.iridescence,x.iridescenceIOR.value=y.iridescenceIOR,x.iridescenceThicknessMinimum.value=y.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=y.iridescenceThicknessRange[1],y.iridescenceMap&&(x.iridescenceMap.value=y.iridescenceMap,t(y.iridescenceMap,x.iridescenceMapTransform)),y.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=y.iridescenceThicknessMap,t(y.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),y.transmission>0&&(x.transmission.value=y.transmission,x.transmissionSamplerMap.value=w.texture,x.transmissionSamplerSize.value.set(w.width,w.height),y.transmissionMap&&(x.transmissionMap.value=y.transmissionMap,t(y.transmissionMap,x.transmissionMapTransform)),x.thickness.value=y.thickness,y.thicknessMap&&(x.thicknessMap.value=y.thicknessMap,t(y.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=y.attenuationDistance,x.attenuationColor.value.copy(y.attenuationColor)),y.anisotropy>0&&(x.anisotropyVector.value.set(y.anisotropy*Math.cos(y.anisotropyRotation),y.anisotropy*Math.sin(y.anisotropyRotation)),y.anisotropyMap&&(x.anisotropyMap.value=y.anisotropyMap,t(y.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=y.specularIntensity,x.specularColor.value.copy(y.specularColor),y.specularColorMap&&(x.specularColorMap.value=y.specularColorMap,t(y.specularColorMap,x.specularColorMapTransform)),y.specularIntensityMap&&(x.specularIntensityMap.value=y.specularIntensityMap,t(y.specularIntensityMap,x.specularIntensityMapTransform))}function T(x,y){y.matcap&&(x.matcap.value=y.matcap)}function M(x,y){const w=e.get(y).light;x.referencePosition.value.setFromMatrixPosition(w.matrixWorld),x.nearDistance.value=w.shadow.camera.near,x.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:o}}function UT(r,e,t,s){let o={},l={},u=[];const d=t.isWebGL2?r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS):0;function f(w,b){const P=b.program;s.uniformBlockBinding(w,P)}function h(w,b){let P=o[w.id];P===void 0&&(T(w),P=m(w),o[w.id]=P,w.addEventListener("dispose",x));const z=b.program;s.updateUBOMapping(w,z);const k=e.render.frame;l[w.id]!==k&&(_(w),l[w.id]=k)}function m(w){const b=g();w.__bindingPointIndex=b;const P=r.createBuffer(),z=w.__size,k=w.usage;return r.bindBuffer(r.UNIFORM_BUFFER,P),r.bufferData(r.UNIFORM_BUFFER,z,k),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,b,P),P}function g(){for(let w=0;w<d;w++)if(u.indexOf(w)===-1)return u.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function _(w){const b=o[w.id],P=w.uniforms,z=w.__cache;r.bindBuffer(r.UNIFORM_BUFFER,b);for(let k=0,N=P.length;k<N;k++){const oe=Array.isArray(P[k])?P[k]:[P[k]];for(let A=0,R=oe.length;A<R;A++){const ie=oe[A];if(S(ie,k,A,z)===!0){const ue=ie.__offset,de=Array.isArray(ie.value)?ie.value:[ie.value];let B=0;for(let V=0;V<de.length;V++){const $=de[V],Q=M($);typeof $=="number"||typeof $=="boolean"?(ie.__data[0]=$,r.bufferSubData(r.UNIFORM_BUFFER,ue+B,ie.__data)):$.isMatrix3?(ie.__data[0]=$.elements[0],ie.__data[1]=$.elements[1],ie.__data[2]=$.elements[2],ie.__data[3]=0,ie.__data[4]=$.elements[3],ie.__data[5]=$.elements[4],ie.__data[6]=$.elements[5],ie.__data[7]=0,ie.__data[8]=$.elements[6],ie.__data[9]=$.elements[7],ie.__data[10]=$.elements[8],ie.__data[11]=0):($.toArray(ie.__data,B),B+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,ue,ie.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function S(w,b,P,z){const k=w.value,N=b+"_"+P;if(z[N]===void 0)return typeof k=="number"||typeof k=="boolean"?z[N]=k:z[N]=k.clone(),!0;{const oe=z[N];if(typeof k=="number"||typeof k=="boolean"){if(oe!==k)return z[N]=k,!0}else if(oe.equals(k)===!1)return oe.copy(k),!0}return!1}function T(w){const b=w.uniforms;let P=0;const z=16;for(let N=0,oe=b.length;N<oe;N++){const A=Array.isArray(b[N])?b[N]:[b[N]];for(let R=0,ie=A.length;R<ie;R++){const ue=A[R],de=Array.isArray(ue.value)?ue.value:[ue.value];for(let B=0,V=de.length;B<V;B++){const $=de[B],Q=M($),U=P%z;U!==0&&z-U<Q.boundary&&(P+=z-U),ue.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),ue.__offset=P,P+=Q.storage}}}const k=P%z;return k>0&&(P+=z-k),w.__size=P,w.__cache={},this}function M(w){const b={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(b.boundary=4,b.storage=4):w.isVector2?(b.boundary=8,b.storage=8):w.isVector3||w.isColor?(b.boundary=16,b.storage=12):w.isVector4?(b.boundary=16,b.storage=16):w.isMatrix3?(b.boundary=48,b.storage=48):w.isMatrix4?(b.boundary=64,b.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),b}function x(w){const b=w.target;b.removeEventListener("dispose",x);const P=u.indexOf(b.__bindingPointIndex);u.splice(P,1),r.deleteBuffer(o[b.id]),delete o[b.id],delete l[b.id]}function y(){for(const w in o)r.deleteBuffer(o[w]);u=[],o={},l={}}return{bind:f,update:h,dispose:y}}class c0{constructor(e={}){const{canvas:t=Ly(),context:s=null,depth:o=!0,stencil:l=!0,alpha:u=!1,antialias:d=!1,premultipliedAlpha:f=!0,preserveDrawingBuffer:h=!1,powerPreference:m="default",failIfMajorPerformanceCaveat:g=!1}=e;this.isWebGLRenderer=!0;let _;s!==null?_=s.getContextAttributes().alpha:_=u;const S=new Uint32Array(4),T=new Int32Array(4);let M=null,x=null;const y=[],w=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=cn,this._useLegacyLights=!1,this.toneMapping=Ar,this.toneMappingExposure=1;const b=this;let P=!1,z=0,k=0,N=null,oe=-1,A=null;const R=new sn,ie=new sn;let ue=null;const de=new Mt(0);let B=0,V=t.width,$=t.height,Q=1,U=null,Y=null;const H=new sn(0,0,V,$),I=new sn(0,0,V,$);let G=!1;const j=new Vd;let Z=!1,fe=!1,xe=null;const Ee=new Kt,Te=new Tt,Ne=new le,he={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ve(){return N===null?Q:1}let K=s;function nt(D,ee){for(let ae=0;ae<D.length;ae++){const ce=D[ae],se=t.getContext(ce,ee);if(se!==null)return se}return null}try{const D={alpha:!0,depth:o,stencil:l,antialias:d,premultipliedAlpha:f,preserveDrawingBuffer:h,powerPreference:m,failIfMajorPerformanceCaveat:g};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Bd}`),t.addEventListener("webglcontextlost",Re,!1),t.addEventListener("webglcontextrestored",X,!1),t.addEventListener("webglcontextcreationerror",De,!1),K===null){const ee=["webgl2","webgl","experimental-webgl"];if(b.isWebGL1Renderer===!0&&ee.shift(),K=nt(ee,D),K===null)throw nt(ee)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&K instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),K.getShaderPrecisionFormat===void 0&&(K.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(D){throw console.error("THREE.WebGLRenderer: "+D.message),D}let Pe,Ve,Ue,$e,Xe,L,C,te,_e,ge,me,Le,Ae,be,Ke,at,Se,vt,lt,it,qe,He,st,pt;function Et(){Pe=new jE(K),Ve=new BE(K,Pe,e),Pe.init(Ve),He=new LT(K,Pe,Ve),Ue=new bT(K,Pe,Ve),$e=new qE(K),Xe=new pT,L=new RT(K,Pe,Ue,Xe,Ve,He,$e),C=new HE(b),te=new WE(b),_e=new nS(K,Ve),st=new FE(K,Pe,_e,Ve),ge=new XE(K,_e,$e,st),me=new QE(K,ge,_e,$e),lt=new ZE(K,Ve,L),at=new zE(Xe),Le=new hT(b,C,te,Pe,Ve,st,at),Ae=new NT(b,Xe),be=new gT,Ke=new MT(Pe,Ve),vt=new OE(b,C,te,Ue,me,_,f),Se=new CT(b,me,Ve),pt=new UT(K,$e,Ve,Ue),it=new kE(K,Pe,$e,Ve),qe=new YE(K,Pe,$e,Ve),$e.programs=Le.programs,b.capabilities=Ve,b.extensions=Pe,b.properties=Xe,b.renderLists=be,b.shadowMap=Se,b.state=Ue,b.info=$e}Et();const ut=new IT(b,K);this.xr=ut,this.getContext=function(){return K},this.getContextAttributes=function(){return K.getContextAttributes()},this.forceContextLoss=function(){const D=Pe.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){const D=Pe.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(D){D!==void 0&&(Q=D,this.setSize(V,$,!1))},this.getSize=function(D){return D.set(V,$)},this.setSize=function(D,ee,ae=!0){if(ut.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=D,$=ee,t.width=Math.floor(D*Q),t.height=Math.floor(ee*Q),ae===!0&&(t.style.width=D+"px",t.style.height=ee+"px"),this.setViewport(0,0,D,ee)},this.getDrawingBufferSize=function(D){return D.set(V*Q,$*Q).floor()},this.setDrawingBufferSize=function(D,ee,ae){V=D,$=ee,Q=ae,t.width=Math.floor(D*ae),t.height=Math.floor(ee*ae),this.setViewport(0,0,D,ee)},this.getCurrentViewport=function(D){return D.copy(R)},this.getViewport=function(D){return D.copy(H)},this.setViewport=function(D,ee,ae,ce){D.isVector4?H.set(D.x,D.y,D.z,D.w):H.set(D,ee,ae,ce),Ue.viewport(R.copy(H).multiplyScalar(Q).floor())},this.getScissor=function(D){return D.copy(I)},this.setScissor=function(D,ee,ae,ce){D.isVector4?I.set(D.x,D.y,D.z,D.w):I.set(D,ee,ae,ce),Ue.scissor(ie.copy(I).multiplyScalar(Q).floor())},this.getScissorTest=function(){return G},this.setScissorTest=function(D){Ue.setScissorTest(G=D)},this.setOpaqueSort=function(D){U=D},this.setTransparentSort=function(D){Y=D},this.getClearColor=function(D){return D.copy(vt.getClearColor())},this.setClearColor=function(){vt.setClearColor.apply(vt,arguments)},this.getClearAlpha=function(){return vt.getClearAlpha()},this.setClearAlpha=function(){vt.setClearAlpha.apply(vt,arguments)},this.clear=function(D=!0,ee=!0,ae=!0){let ce=0;if(D){let se=!1;if(N!==null){const Fe=N.texture.format;se=Fe===kg||Fe===Fg||Fe===Og}if(se){const Fe=N.texture.type,Ye=Fe===Cr||Fe===Er||Fe===zd||Fe===is||Fe===Ng||Fe===Ug,et=vt.getClearColor(),Be=vt.getClearAlpha(),dt=et.r,ot=et.g,ct=et.b;Ye?(S[0]=dt,S[1]=ot,S[2]=ct,S[3]=Be,K.clearBufferuiv(K.COLOR,0,S)):(T[0]=dt,T[1]=ot,T[2]=ct,T[3]=Be,K.clearBufferiv(K.COLOR,0,T))}else ce|=K.COLOR_BUFFER_BIT}ee&&(ce|=K.DEPTH_BUFFER_BIT),ae&&(ce|=K.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),K.clear(ce)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Re,!1),t.removeEventListener("webglcontextrestored",X,!1),t.removeEventListener("webglcontextcreationerror",De,!1),be.dispose(),Ke.dispose(),Xe.dispose(),C.dispose(),te.dispose(),me.dispose(),st.dispose(),pt.dispose(),Le.dispose(),ut.dispose(),ut.removeEventListener("sessionstart",Jt),ut.removeEventListener("sessionend",yt),xe&&(xe.dispose(),xe=null),Yt.stop()};function Re(D){D.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function X(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const D=$e.autoReset,ee=Se.enabled,ae=Se.autoUpdate,ce=Se.needsUpdate,se=Se.type;Et(),$e.autoReset=D,Se.enabled=ee,Se.autoUpdate=ae,Se.needsUpdate=ce,Se.type=se}function De(D){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function Oe(D){const ee=D.target;ee.removeEventListener("dispose",Oe),tt(ee)}function tt(D){Ze(D),Xe.remove(D)}function Ze(D){const ee=Xe.get(D).programs;ee!==void 0&&(ee.forEach(function(ae){Le.releaseProgram(ae)}),D.isShaderMaterial&&Le.releaseShaderCache(D))}this.renderBufferDirect=function(D,ee,ae,ce,se,Fe){ee===null&&(ee=he);const Ye=se.isMesh&&se.matrixWorld.determinant()<0,et=ic(D,ee,ae,ce,se);Ue.setMaterial(ce,Ye);let Be=ae.index,dt=1;if(ce.wireframe===!0){if(Be=ge.getWireframeAttribute(ae),Be===void 0)return;dt=2}const ot=ae.drawRange,ct=ae.attributes.position;let Rt=ot.start*dt,xn=(ot.start+ot.count)*dt;Fe!==null&&(Rt=Math.max(Rt,Fe.start*dt),xn=Math.min(xn,(Fe.start+Fe.count)*dt)),Be!==null?(Rt=Math.max(Rt,0),xn=Math.min(xn,Be.count)):ct!=null&&(Rt=Math.max(Rt,0),xn=Math.min(xn,ct.count));const Gt=xn-Rt;if(Gt<0||Gt===1/0)return;st.setup(se,ce,et,ae,Be);let An,_t=it;if(Be!==null&&(An=_e.get(Be),_t=qe,_t.setIndex(An)),se.isMesh)ce.wireframe===!0?(Ue.setLineWidth(ce.wireframeLinewidth*ve()),_t.setMode(K.LINES)):_t.setMode(K.TRIANGLES);else if(se.isLine){let ft=ce.linewidth;ft===void 0&&(ft=1),Ue.setLineWidth(ft*ve()),se.isLineSegments?_t.setMode(K.LINES):se.isLineLoop?_t.setMode(K.LINE_LOOP):_t.setMode(K.LINE_STRIP)}else se.isPoints?_t.setMode(K.POINTS):se.isSprite&&_t.setMode(K.TRIANGLES);if(se.isBatchedMesh)_t.renderMultiDraw(se._multiDrawStarts,se._multiDrawCounts,se._multiDrawCount);else if(se.isInstancedMesh)_t.renderInstances(Rt,Gt,se.count);else if(ae.isInstancedBufferGeometry){const ft=ae._maxInstanceCount!==void 0?ae._maxInstanceCount:1/0,yn=Math.min(ae.instanceCount,ft);_t.renderInstances(Rt,Gt,yn)}else _t.render(Rt,Gt)};function wt(D,ee,ae){D.transparent===!0&&D.side===ji&&D.forceSinglePass===!1?(D.side=kn,D.needsUpdate=!0,Ki(D,ee,ae),D.side=br,D.needsUpdate=!0,Ki(D,ee,ae),D.side=ji):Ki(D,ee,ae)}this.compile=function(D,ee,ae=null){ae===null&&(ae=D),x=Ke.get(ae),x.init(),w.push(x),ae.traverseVisible(function(se){se.isLight&&se.layers.test(ee.layers)&&(x.pushLight(se),se.castShadow&&x.pushShadow(se))}),D!==ae&&D.traverseVisible(function(se){se.isLight&&se.layers.test(ee.layers)&&(x.pushLight(se),se.castShadow&&x.pushShadow(se))}),x.setupLights(b._useLegacyLights);const ce=new Set;return D.traverse(function(se){const Fe=se.material;if(Fe)if(Array.isArray(Fe))for(let Ye=0;Ye<Fe.length;Ye++){const et=Fe[Ye];wt(et,ae,se),ce.add(et)}else wt(Fe,ae,se),ce.add(Fe)}),w.pop(),x=null,ce},this.compileAsync=function(D,ee,ae=null){const ce=this.compile(D,ee,ae);return new Promise(se=>{function Fe(){if(ce.forEach(function(Ye){Xe.get(Ye).currentProgram.isReady()&&ce.delete(Ye)}),ce.size===0){se(D);return}setTimeout(Fe,10)}Pe.get("KHR_parallel_shader_compile")!==null?Fe():setTimeout(Fe,10)})};let At=null;function Bt(D){At&&At(D)}function Jt(){Yt.stop()}function yt(){Yt.start()}const Yt=new t0;Yt.setAnimationLoop(Bt),typeof self<"u"&&Yt.setContext(self),this.setAnimationLoop=function(D){At=D,ut.setAnimationLoop(D),D===null?Yt.stop():Yt.start()},ut.addEventListener("sessionstart",Jt),ut.addEventListener("sessionend",yt),this.render=function(D,ee){if(ee!==void 0&&ee.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),ee.parent===null&&ee.matrixWorldAutoUpdate===!0&&ee.updateMatrixWorld(),ut.enabled===!0&&ut.isPresenting===!0&&(ut.cameraAutoUpdate===!0&&ut.updateCamera(ee),ee=ut.getCamera()),D.isScene===!0&&D.onBeforeRender(b,D,ee,N),x=Ke.get(D,w.length),x.init(),w.push(x),Ee.multiplyMatrices(ee.projectionMatrix,ee.matrixWorldInverse),j.setFromProjectionMatrix(Ee),fe=this.localClippingEnabled,Z=at.init(this.clippingPlanes,fe),M=be.get(D,y.length),M.init(),y.push(M),dn(D,ee,0,b.sortObjects),M.finish(),b.sortObjects===!0&&M.sort(U,Y),this.info.render.frame++,Z===!0&&at.beginShadows();const ae=x.state.shadowsArray;if(Se.render(ae,D,ee),Z===!0&&at.endShadows(),this.info.autoReset===!0&&this.info.reset(),vt.render(M,D),x.setupLights(b._useLegacyLights),ee.isArrayCamera){const ce=ee.cameras;for(let se=0,Fe=ce.length;se<Fe;se++){const Ye=ce[se];da(M,D,Ye,Ye.viewport)}}else da(M,D,ee);N!==null&&(L.updateMultisampleRenderTarget(N),L.updateRenderTargetMipmap(N)),D.isScene===!0&&D.onAfterRender(b,D,ee),st.resetDefaultState(),oe=-1,A=null,w.pop(),w.length>0?x=w[w.length-1]:x=null,y.pop(),y.length>0?M=y[y.length-1]:M=null};function dn(D,ee,ae,ce){if(D.visible===!1)return;if(D.layers.test(ee.layers)){if(D.isGroup)ae=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(ee);else if(D.isLight)x.pushLight(D),D.castShadow&&x.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||j.intersectsSprite(D)){ce&&Ne.setFromMatrixPosition(D.matrixWorld).applyMatrix4(Ee);const Ye=me.update(D),et=D.material;et.visible&&M.push(D,Ye,et,ae,Ne.z,null)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||j.intersectsObject(D))){const Ye=me.update(D),et=D.material;if(ce&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),Ne.copy(D.boundingSphere.center)):(Ye.boundingSphere===null&&Ye.computeBoundingSphere(),Ne.copy(Ye.boundingSphere.center)),Ne.applyMatrix4(D.matrixWorld).applyMatrix4(Ee)),Array.isArray(et)){const Be=Ye.groups;for(let dt=0,ot=Be.length;dt<ot;dt++){const ct=Be[dt],Rt=et[ct.materialIndex];Rt&&Rt.visible&&M.push(D,Ye,Rt,ae,Ne.z,ct)}}else et.visible&&M.push(D,Ye,et,ae,Ne.z,null)}}const Fe=D.children;for(let Ye=0,et=Fe.length;Ye<et;Ye++)dn(Fe[Ye],ee,ae,ce)}function da(D,ee,ae,ce){const se=D.opaque,Fe=D.transmissive,Ye=D.transparent;x.setupLightsView(ae),Z===!0&&at.setGlobalState(b.clippingPlanes,ae),Fe.length>0&&Pr(se,Fe,ee,ae),ce&&Ue.viewport(R.copy(ce)),se.length>0&&bi(se,ee,ae),Fe.length>0&&bi(Fe,ee,ae),Ye.length>0&&bi(Ye,ee,ae),Ue.buffers.depth.setTest(!0),Ue.buffers.depth.setMask(!0),Ue.buffers.color.setMask(!0),Ue.setPolygonOffset(!1)}function Pr(D,ee,ae,ce){if((ae.isScene===!0?ae.overrideMaterial:null)!==null)return;const Fe=Ve.isWebGL2;xe===null&&(xe=new os(1,1,{generateMipmaps:!0,type:Pe.has("EXT_color_buffer_half_float")?na:Cr,minFilter:no,samples:Fe?4:0})),b.getDrawingBufferSize(Te),Fe?xe.setSize(Te.x,Te.y):xe.setSize(Id(Te.x),Id(Te.y));const Ye=b.getRenderTarget();b.setRenderTarget(xe),b.getClearColor(de),B=b.getClearAlpha(),B<1&&b.setClearColor(16777215,.5),b.clear();const et=b.toneMapping;b.toneMapping=Ar,bi(D,ae,ce),L.updateMultisampleRenderTarget(xe),L.updateRenderTargetMipmap(xe);let Be=!1;for(let dt=0,ot=ee.length;dt<ot;dt++){const ct=ee[dt],Rt=ct.object,xn=ct.geometry,Gt=ct.material,An=ct.group;if(Gt.side===ji&&Rt.layers.test(ce.layers)){const _t=Gt.side;Gt.side=kn,Gt.needsUpdate=!0,Dr(Rt,ae,ce,xn,Gt,An),Gt.side=_t,Gt.needsUpdate=!0,Be=!0}}Be===!0&&(L.updateMultisampleRenderTarget(xe),L.updateRenderTargetMipmap(xe)),b.setRenderTarget(Ye),b.setClearColor(de,B),b.toneMapping=et}function bi(D,ee,ae){const ce=ee.isScene===!0?ee.overrideMaterial:null;for(let se=0,Fe=D.length;se<Fe;se++){const Ye=D[se],et=Ye.object,Be=Ye.geometry,dt=ce===null?Ye.material:ce,ot=Ye.group;et.layers.test(ae.layers)&&Dr(et,ee,ae,Be,dt,ot)}}function Dr(D,ee,ae,ce,se,Fe){D.onBeforeRender(b,ee,ae,ce,se,Fe),D.modelViewMatrix.multiplyMatrices(ae.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),se.onBeforeRender(b,ee,ae,ce,D,Fe),se.transparent===!0&&se.side===ji&&se.forceSinglePass===!1?(se.side=kn,se.needsUpdate=!0,b.renderBufferDirect(ae,ee,ce,se,D,Fe),se.side=br,se.needsUpdate=!0,b.renderBufferDirect(ae,ee,ce,se,D,Fe),se.side=ji):b.renderBufferDirect(ae,ee,ce,se,D,Fe),D.onAfterRender(b,ee,ae,ce,se,Fe)}function Ki(D,ee,ae){ee.isScene!==!0&&(ee=he);const ce=Xe.get(D),se=x.state.lights,Fe=x.state.shadowsArray,Ye=se.state.version,et=Le.getParameters(D,se.state,Fe,ee,ae),Be=Le.getProgramCacheKey(et);let dt=ce.programs;ce.environment=D.isMeshStandardMaterial?ee.environment:null,ce.fog=ee.fog,ce.envMap=(D.isMeshStandardMaterial?te:C).get(D.envMap||ce.environment),dt===void 0&&(D.addEventListener("dispose",Oe),dt=new Map,ce.programs=dt);let ot=dt.get(Be);if(ot!==void 0){if(ce.currentProgram===ot&&ce.lightsStateVersion===Ye)return ha(D,et),ot}else et.uniforms=Le.getUniforms(D),D.onBuild(ae,et,b),D.onBeforeCompile(et,b),ot=Le.acquireProgram(et,Be),dt.set(Be,ot),ce.uniforms=et.uniforms;const ct=ce.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(ct.clippingPlanes=at.uniform),ha(D,et),ce.needsLights=pa(D),ce.lightsStateVersion=Ye,ce.needsLights&&(ct.ambientLightColor.value=se.state.ambient,ct.lightProbe.value=se.state.probe,ct.directionalLights.value=se.state.directional,ct.directionalLightShadows.value=se.state.directionalShadow,ct.spotLights.value=se.state.spot,ct.spotLightShadows.value=se.state.spotShadow,ct.rectAreaLights.value=se.state.rectArea,ct.ltc_1.value=se.state.rectAreaLTC1,ct.ltc_2.value=se.state.rectAreaLTC2,ct.pointLights.value=se.state.point,ct.pointLightShadows.value=se.state.pointShadow,ct.hemisphereLights.value=se.state.hemi,ct.directionalShadowMap.value=se.state.directionalShadowMap,ct.directionalShadowMatrix.value=se.state.directionalShadowMatrix,ct.spotShadowMap.value=se.state.spotShadowMap,ct.spotLightMatrix.value=se.state.spotLightMatrix,ct.spotLightMap.value=se.state.spotLightMap,ct.pointShadowMap.value=se.state.pointShadowMap,ct.pointShadowMatrix.value=se.state.pointShadowMatrix),ce.currentProgram=ot,ce.uniformsList=null,ot}function fa(D){if(D.uniformsList===null){const ee=D.currentProgram.getUniforms();D.uniformsList=Vl.seqWithValue(ee.seq,D.uniforms)}return D.uniformsList}function ha(D,ee){const ae=Xe.get(D);ae.outputColorSpace=ee.outputColorSpace,ae.batching=ee.batching,ae.instancing=ee.instancing,ae.instancingColor=ee.instancingColor,ae.skinning=ee.skinning,ae.morphTargets=ee.morphTargets,ae.morphNormals=ee.morphNormals,ae.morphColors=ee.morphColors,ae.morphTargetsCount=ee.morphTargetsCount,ae.numClippingPlanes=ee.numClippingPlanes,ae.numIntersection=ee.numClipIntersection,ae.vertexAlphas=ee.vertexAlphas,ae.vertexTangents=ee.vertexTangents,ae.toneMapping=ee.toneMapping}function ic(D,ee,ae,ce,se){ee.isScene!==!0&&(ee=he),L.resetTextureUnits();const Fe=ee.fog,Ye=ce.isMeshStandardMaterial?ee.environment:null,et=N===null?b.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:$i,Be=(ce.isMeshStandardMaterial?te:C).get(ce.envMap||Ye),dt=ce.vertexColors===!0&&!!ae.attributes.color&&ae.attributes.color.itemSize===4,ot=!!ae.attributes.tangent&&(!!ce.normalMap||ce.anisotropy>0),ct=!!ae.morphAttributes.position,Rt=!!ae.morphAttributes.normal,xn=!!ae.morphAttributes.color;let Gt=Ar;ce.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(Gt=b.toneMapping);const An=ae.morphAttributes.position||ae.morphAttributes.normal||ae.morphAttributes.color,_t=An!==void 0?An.length:0,ft=Xe.get(ce),yn=x.state.lights;if(Z===!0&&(fe===!0||D!==A)){const Cn=D===A&&ce.id===oe;at.setState(ce,D,Cn)}let Nt=!1;ce.version===ft.__version?(ft.needsLights&&ft.lightsStateVersion!==yn.state.version||ft.outputColorSpace!==et||se.isBatchedMesh&&ft.batching===!1||!se.isBatchedMesh&&ft.batching===!0||se.isInstancedMesh&&ft.instancing===!1||!se.isInstancedMesh&&ft.instancing===!0||se.isSkinnedMesh&&ft.skinning===!1||!se.isSkinnedMesh&&ft.skinning===!0||se.isInstancedMesh&&ft.instancingColor===!0&&se.instanceColor===null||se.isInstancedMesh&&ft.instancingColor===!1&&se.instanceColor!==null||ft.envMap!==Be||ce.fog===!0&&ft.fog!==Fe||ft.numClippingPlanes!==void 0&&(ft.numClippingPlanes!==at.numPlanes||ft.numIntersection!==at.numIntersection)||ft.vertexAlphas!==dt||ft.vertexTangents!==ot||ft.morphTargets!==ct||ft.morphNormals!==Rt||ft.morphColors!==xn||ft.toneMapping!==Gt||Ve.isWebGL2===!0&&ft.morphTargetsCount!==_t)&&(Nt=!0):(Nt=!0,ft.__version=ce.version);let Li=ft.currentProgram;Nt===!0&&(Li=Ki(ce,ee,se));let ma=!1,xi=!1,Zi=!1;const zt=Li.getUniforms(),qn=ft.uniforms;if(Ue.useProgram(Li.program)&&(ma=!0,xi=!0,Zi=!0),ce.id!==oe&&(oe=ce.id,xi=!0),ma||A!==D){zt.setValue(K,"projectionMatrix",D.projectionMatrix),zt.setValue(K,"viewMatrix",D.matrixWorldInverse);const Cn=zt.map.cameraPosition;Cn!==void 0&&Cn.setValue(K,Ne.setFromMatrixPosition(D.matrixWorld)),Ve.logarithmicDepthBuffer&&zt.setValue(K,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),(ce.isMeshPhongMaterial||ce.isMeshToonMaterial||ce.isMeshLambertMaterial||ce.isMeshBasicMaterial||ce.isMeshStandardMaterial||ce.isShaderMaterial)&&zt.setValue(K,"isOrthographic",D.isOrthographicCamera===!0),A!==D&&(A=D,xi=!0,Zi=!0)}if(se.isSkinnedMesh){zt.setOptional(K,se,"bindMatrix"),zt.setOptional(K,se,"bindMatrixInverse");const Cn=se.skeleton;Cn&&(Ve.floatVertexTextures?(Cn.boneTexture===null&&Cn.computeBoneTexture(),zt.setValue(K,"boneTexture",Cn.boneTexture,L)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}se.isBatchedMesh&&(zt.setOptional(K,se,"batchingTexture"),zt.setValue(K,"batchingTexture",se._matricesTexture,L));const co=ae.morphAttributes;if((co.position!==void 0||co.normal!==void 0||co.color!==void 0&&Ve.isWebGL2===!0)&&lt.update(se,ae,Li),(xi||ft.receiveShadow!==se.receiveShadow)&&(ft.receiveShadow=se.receiveShadow,zt.setValue(K,"receiveShadow",se.receiveShadow)),ce.isMeshGouraudMaterial&&ce.envMap!==null&&(qn.envMap.value=Be,qn.flipEnvMap.value=Be.isCubeTexture&&Be.isRenderTargetTexture===!1?-1:1),xi&&(zt.setValue(K,"toneMappingExposure",b.toneMappingExposure),ft.needsLights&&Ri(qn,Zi),Fe&&ce.fog===!0&&Ae.refreshFogUniforms(qn,Fe),Ae.refreshMaterialUniforms(qn,ce,Q,$,xe),Vl.upload(K,fa(ft),qn,L)),ce.isShaderMaterial&&ce.uniformsNeedUpdate===!0&&(Vl.upload(K,fa(ft),qn,L),ce.uniformsNeedUpdate=!1),ce.isSpriteMaterial&&zt.setValue(K,"center",se.center),zt.setValue(K,"modelViewMatrix",se.modelViewMatrix),zt.setValue(K,"normalMatrix",se.normalMatrix),zt.setValue(K,"modelMatrix",se.matrixWorld),ce.isShaderMaterial||ce.isRawShaderMaterial){const Cn=ce.uniformsGroups;for(let Ir=0,ga=Cn.length;Ir<ga;Ir++)if(Ve.isWebGL2){const ls=Cn[Ir];pt.update(ls,Li),pt.bind(ls,Li)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Li}function Ri(D,ee){D.ambientLightColor.needsUpdate=ee,D.lightProbe.needsUpdate=ee,D.directionalLights.needsUpdate=ee,D.directionalLightShadows.needsUpdate=ee,D.pointLights.needsUpdate=ee,D.pointLightShadows.needsUpdate=ee,D.spotLights.needsUpdate=ee,D.spotLightShadows.needsUpdate=ee,D.rectAreaLights.needsUpdate=ee,D.hemisphereLights.needsUpdate=ee}function pa(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(D,ee,ae){Xe.get(D.texture).__webglTexture=ee,Xe.get(D.depthTexture).__webglTexture=ae;const ce=Xe.get(D);ce.__hasExternalTextures=!0,ce.__hasExternalTextures&&(ce.__autoAllocateDepthBuffer=ae===void 0,ce.__autoAllocateDepthBuffer||Pe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ce.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(D,ee){const ae=Xe.get(D);ae.__webglFramebuffer=ee,ae.__useDefaultFramebuffer=ee===void 0},this.setRenderTarget=function(D,ee=0,ae=0){N=D,z=ee,k=ae;let ce=!0,se=null,Fe=!1,Ye=!1;if(D){const Be=Xe.get(D);Be.__useDefaultFramebuffer!==void 0?(Ue.bindFramebuffer(K.FRAMEBUFFER,null),ce=!1):Be.__webglFramebuffer===void 0?L.setupRenderTarget(D):Be.__hasExternalTextures&&L.rebindTextures(D,Xe.get(D.texture).__webglTexture,Xe.get(D.depthTexture).__webglTexture);const dt=D.texture;(dt.isData3DTexture||dt.isDataArrayTexture||dt.isCompressedArrayTexture)&&(Ye=!0);const ot=Xe.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray(ot[ee])?se=ot[ee][ae]:se=ot[ee],Fe=!0):Ve.isWebGL2&&D.samples>0&&L.useMultisampledRTT(D)===!1?se=Xe.get(D).__webglMultisampledFramebuffer:Array.isArray(ot)?se=ot[ae]:se=ot,R.copy(D.viewport),ie.copy(D.scissor),ue=D.scissorTest}else R.copy(H).multiplyScalar(Q).floor(),ie.copy(I).multiplyScalar(Q).floor(),ue=G;if(Ue.bindFramebuffer(K.FRAMEBUFFER,se)&&Ve.drawBuffers&&ce&&Ue.drawBuffers(D,se),Ue.viewport(R),Ue.scissor(ie),Ue.setScissorTest(ue),Fe){const Be=Xe.get(D.texture);K.framebufferTexture2D(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Be.__webglTexture,ae)}else if(Ye){const Be=Xe.get(D.texture),dt=ee||0;K.framebufferTextureLayer(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0,Be.__webglTexture,ae||0,dt)}oe=-1},this.readRenderTargetPixels=function(D,ee,ae,ce,se,Fe,Ye){if(!(D&&D.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let et=Xe.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Ye!==void 0&&(et=et[Ye]),et){Ue.bindFramebuffer(K.FRAMEBUFFER,et);try{const Be=D.texture,dt=Be.format,ot=Be.type;if(dt!==_i&&He.convert(dt)!==K.getParameter(K.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const ct=ot===na&&(Pe.has("EXT_color_buffer_half_float")||Ve.isWebGL2&&Pe.has("EXT_color_buffer_float"));if(ot!==Cr&&He.convert(ot)!==K.getParameter(K.IMPLEMENTATION_COLOR_READ_TYPE)&&!(ot===Tr&&(Ve.isWebGL2||Pe.has("OES_texture_float")||Pe.has("WEBGL_color_buffer_float")))&&!ct){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}ee>=0&&ee<=D.width-ce&&ae>=0&&ae<=D.height-se&&K.readPixels(ee,ae,ce,se,He.convert(dt),He.convert(ot),Fe)}finally{const Be=N!==null?Xe.get(N).__webglFramebuffer:null;Ue.bindFramebuffer(K.FRAMEBUFFER,Be)}}},this.copyFramebufferToTexture=function(D,ee,ae=0){const ce=Math.pow(2,-ae),se=Math.floor(ee.image.width*ce),Fe=Math.floor(ee.image.height*ce);L.setTexture2D(ee,0),K.copyTexSubImage2D(K.TEXTURE_2D,ae,0,0,D.x,D.y,se,Fe),Ue.unbindTexture()},this.copyTextureToTexture=function(D,ee,ae,ce=0){const se=ee.image.width,Fe=ee.image.height,Ye=He.convert(ae.format),et=He.convert(ae.type);L.setTexture2D(ae,0),K.pixelStorei(K.UNPACK_FLIP_Y_WEBGL,ae.flipY),K.pixelStorei(K.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ae.premultiplyAlpha),K.pixelStorei(K.UNPACK_ALIGNMENT,ae.unpackAlignment),ee.isDataTexture?K.texSubImage2D(K.TEXTURE_2D,ce,D.x,D.y,se,Fe,Ye,et,ee.image.data):ee.isCompressedTexture?K.compressedTexSubImage2D(K.TEXTURE_2D,ce,D.x,D.y,ee.mipmaps[0].width,ee.mipmaps[0].height,Ye,ee.mipmaps[0].data):K.texSubImage2D(K.TEXTURE_2D,ce,D.x,D.y,Ye,et,ee.image),ce===0&&ae.generateMipmaps&&K.generateMipmap(K.TEXTURE_2D),Ue.unbindTexture()},this.copyTextureToTexture3D=function(D,ee,ae,ce,se=0){if(b.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Fe=D.max.x-D.min.x+1,Ye=D.max.y-D.min.y+1,et=D.max.z-D.min.z+1,Be=He.convert(ce.format),dt=He.convert(ce.type);let ot;if(ce.isData3DTexture)L.setTexture3D(ce,0),ot=K.TEXTURE_3D;else if(ce.isDataArrayTexture||ce.isCompressedArrayTexture)L.setTexture2DArray(ce,0),ot=K.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}K.pixelStorei(K.UNPACK_FLIP_Y_WEBGL,ce.flipY),K.pixelStorei(K.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ce.premultiplyAlpha),K.pixelStorei(K.UNPACK_ALIGNMENT,ce.unpackAlignment);const ct=K.getParameter(K.UNPACK_ROW_LENGTH),Rt=K.getParameter(K.UNPACK_IMAGE_HEIGHT),xn=K.getParameter(K.UNPACK_SKIP_PIXELS),Gt=K.getParameter(K.UNPACK_SKIP_ROWS),An=K.getParameter(K.UNPACK_SKIP_IMAGES),_t=ae.isCompressedTexture?ae.mipmaps[se]:ae.image;K.pixelStorei(K.UNPACK_ROW_LENGTH,_t.width),K.pixelStorei(K.UNPACK_IMAGE_HEIGHT,_t.height),K.pixelStorei(K.UNPACK_SKIP_PIXELS,D.min.x),K.pixelStorei(K.UNPACK_SKIP_ROWS,D.min.y),K.pixelStorei(K.UNPACK_SKIP_IMAGES,D.min.z),ae.isDataTexture||ae.isData3DTexture?K.texSubImage3D(ot,se,ee.x,ee.y,ee.z,Fe,Ye,et,Be,dt,_t.data):ae.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),K.compressedTexSubImage3D(ot,se,ee.x,ee.y,ee.z,Fe,Ye,et,Be,_t.data)):K.texSubImage3D(ot,se,ee.x,ee.y,ee.z,Fe,Ye,et,Be,dt,_t),K.pixelStorei(K.UNPACK_ROW_LENGTH,ct),K.pixelStorei(K.UNPACK_IMAGE_HEIGHT,Rt),K.pixelStorei(K.UNPACK_SKIP_PIXELS,xn),K.pixelStorei(K.UNPACK_SKIP_ROWS,Gt),K.pixelStorei(K.UNPACK_SKIP_IMAGES,An),se===0&&ce.generateMipmaps&&K.generateMipmap(ot),Ue.unbindTexture()},this.initTexture=function(D){D.isCubeTexture?L.setTextureCube(D,0):D.isData3DTexture?L.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?L.setTexture2DArray(D,0):L.setTexture2D(D,0),Ue.unbindTexture()},this.resetState=function(){z=0,k=0,N=null,Ue.reset(),st.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Yi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Hd?"display-p3":"srgb",t.unpackColorSpace=bt.workingColorSpace===ec?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===cn?ss:zg}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===ss?cn:$i}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class OT extends c0{}OT.prototype.isWebGL1Renderer=!0;class FT extends un{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class kT extends Bn{constructor(e,t,s,o,l,u,d,f,h){super(e,t,s,o,l,u,d,f,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}class BT extends ca{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Mt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Mt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Hg,this.normalScale=new Tt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Xd extends un{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Mt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class zT extends Xd{constructor(e,t,s){super(e,s),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(un.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Mt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Sd=new Kt,rg=new le,sg=new le;class HT{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Tt(512,512),this.map=null,this.mapPass=null,this.matrix=new Kt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Vd,this._frameExtents=new Tt(1,1),this._viewportCount=1,this._viewports=[new sn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,s=this.matrix;rg.setFromMatrixPosition(e.matrixWorld),t.position.copy(rg),sg.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(sg),t.updateMatrixWorld(),Sd.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Sd),s.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),s.multiply(Sd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class GT extends HT{constructor(){super(new n0(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class VT extends Xd{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(un.DEFAULT_UP),this.updateMatrix(),this.target=new un,this.shadow=new GT}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class WT extends Xd{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Bd}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Bd);function Yd({world:r,preview:e,className:t,style:s}){const o=pe.useRef(null),l=pe.useRef(null),u=pe.useRef(null),d=pe.useRef({x:0,y:0});return pe.useEffect(()=>{const f=o.current;if(!f)return;const h=f.clientWidth||800,m=f.clientHeight||600,g=new FT;let _=u.current;_?(_.aspect=h/m,_.updateProjectionMatrix()):(_=new ri(45,h/m,.1,100),_.position.set(0,0,2.6),u.current=_);const S=new c0({antialias:!0,alpha:!0});S.setPixelRatio(window.devicePixelRatio||1),S.setSize(h,m,!1),f.appendChild(S.domElement);const T=new zT(16777215,4473924,1.2);g.add(T);const M=new VT(16777215,.8);M.position.set(5,3,5),g.add(M);const x=new WT(16777215,.3);g.add(x);const y=document.createElement("canvas");l.current=y;function w(){let he=e;if(!he&&r&&(console.log("[Globe3D] Generating preview from world"),he=oo(r)),!he)throw new Error("No preview available");console.log("[Globe3D] Creating texture from preview:",he.width,"x",he.height,"rgba buffer:",he.rgba instanceof Uint8ClampedArray);const ve=he.width,K=he.height;if(he.rgba&&he.rgba instanceof Uint8ClampedArray){y.width=ve,y.height=K;const Pe=y.getContext("2d");if(!Pe)throw new Error("Failed to create texture canvas 2D context");const Ve=new ImageData(he.rgba,ve,K);Pe.putImageData(Ve,0,0);const Ue=Pe.getImageData(0,0,ve,K),$e=Ue.data;let Xe=0,L=0,C=0;for(let me=0;me<ve;me++){const Le=me*4;Xe+=$e[Le],L+=$e[Le+1],C+=$e[Le+2]}Xe=Math.round(Xe/ve),L=Math.round(L/ve),C=Math.round(C/ve);for(let me=0;me<ve;me++){const Le=me*4;$e[Le]=Xe,$e[Le+1]=L,$e[Le+2]=C}let te=0,_e=0,ge=0;for(let me=0;me<ve;me++){const Le=((K-1)*ve+me)*4;te+=$e[Le],_e+=$e[Le+1],ge+=$e[Le+2]}te=Math.round(te/ve),_e=Math.round(_e/ve),ge=Math.round(ge/ve);for(let me=0;me<ve;me++){const Le=((K-1)*ve+me)*4;$e[Le]=te,$e[Le+1]=_e,$e[Le+2]=ge}Pe.putImageData(Ue,0,0)}else{y.width=ve,y.height=K;const Pe=y.getContext("2d");if(!Pe)throw new Error("Failed to create texture canvas 2D context");const Ve=Pe.createImageData(ve,K),Ue=Ve.data,$e=.5/K;for(let Ae=0;Ae<K;Ae++){const be=Ae/(K-1),at=Math.max($e,Math.min(1-$e,be))*(K-1),Se=Math.floor(at),vt=Math.max(0,Math.min(K-1,Se));for(let lt=0;lt<ve;lt++){const qe=lt/ve*ve,He=Math.floor(qe)%ve,st=vt*ve+He,pt=he.sampleGlobeColor?he.sampleGlobeColor(st):[255,0,255,255],Et=(Ae*ve+lt)*4;Ue[Et+0]=pt[0],Ue[Et+1]=pt[1],Ue[Et+2]=pt[2],Ue[Et+3]=pt[3]}}Pe.putImageData(Ve,0,0);const Xe=Pe.getImageData(0,0,ve,K),L=Xe.data;let C=0,te=0,_e=0;for(let Ae=0;Ae<ve;Ae++){const be=Ae*4;C+=L[be],te+=L[be+1],_e+=L[be+2]}C=Math.round(C/ve),te=Math.round(te/ve),_e=Math.round(_e/ve);for(let Ae=0;Ae<ve;Ae++){const be=Ae*4;L[be]=C,L[be+1]=te,L[be+2]=_e}let ge=0,me=0,Le=0;for(let Ae=0;Ae<ve;Ae++){const be=((K-1)*ve+Ae)*4;ge+=L[be],me+=L[be+1],Le+=L[be+2]}ge=Math.round(ge/ve),me=Math.round(me/ve),Le=Math.round(Le/ve);for(let Ae=0;Ae<ve;Ae++){const be=((K-1)*ve+Ae)*4;L[be]=ge,L[be+1]=me,L[be+2]=Le}Pe.putImageData(Xe,0,0)}const nt=new kT(y);return nt.wrapS=jl,nt.wrapT=si,nt.magFilter=Yn,nt.minFilter=no,nt.generateMipmaps=!0,nt.anisotropy=S.capabilities.getMaxAnisotropy(),nt.flipY=!1,nt.needsUpdate=!0,nt}const b=w(),P=128,z=64,k=new Lr,N=[],oe=[],A=[],R=[],ie=.5/z;for(let he=0;he<=z;he++){const ve=he/z,K=ve*Math.PI,nt=Math.max(ie,Math.min(1-ie,ve));for(let Pe=0;Pe<=P;Pe++){const Ve=Pe/P,Ue=Ve*Math.PI*2,$e=-Math.sin(K)*Math.cos(Ue),Xe=Math.cos(K),L=Math.sin(K)*Math.sin(Ue);N.push($e,Xe,L),oe.push($e,Xe,L);const C=ve===0||ve===1?.5:Ve;A.push(C,nt)}}for(let he=0;he<z;he++)for(let ve=0;ve<P;ve++){const K=he*(P+1)+ve,nt=K+P+1,Pe=K+1,Ve=nt+1;R.push(K,nt,Pe),R.push(nt,Ve,Pe)}k.setIndex(R),k.setAttribute("position",new Ci(N,3)),k.setAttribute("normal",new Ci(oe,3)),k.setAttribute("uv",new Ci(A,2));const ue=new BT({map:b,metalness:0,roughness:.8,flatShading:!1}),de=.5/z;ue.onBeforeCompile=he=>{he.uniforms.poleEps={value:de},he.vertexShader=he.vertexShader.replace("void main() {",["varying vec3 vObjPos;","void main() {","  vObjPos = position;"].join(`
`)),he.fragmentShader=he.fragmentShader.replace("void main() {",["uniform float poleEps;","varying vec3 vObjPos;","void main() {"].join(`
`)).replace("#include <map_fragment>",["vec3 n = normalize(vObjPos);","float ny = clamp(n.y, -1.0, 1.0);","bool pole = abs(ny) > 0.9995;","float v = clamp(ny * 0.5 + 0.5, poleEps, 1.0 - poleEps);","float u = fract(atan(n.z, n.x) / (PI * 2.0) + 0.5);","u = pole ? 0.5 : u;","v = pole ? (ny > 0.0 ? poleEps : 1.0 - poleEps) : v;","vec2 poleSafeUv = vec2(u, v);","vec4 texelColor = texture2D(map, poleSafeUv);","texelColor = mapTexelToLinear(texelColor);","diffuseColor *= texelColor;"].join(`
`))};const B=new qi(k,ue);B.rotation.x=d.current.x,B.rotation.y=d.current.y,g.add(B);let V=null;performance.now();let $=!1,Q=0,U=0,Y=0,H=0;function I(){const he=o.current;if(!he||!_)return;const ve=he.clientWidth||800,K=he.clientHeight||600;_.aspect=ve/K,_.updateProjectionMatrix(),S.setSize(ve,K,!1)}window.addEventListener("resize",I);function G(){_&&((Math.abs(Y)>1e-5||Math.abs(H)>1e-5)&&(B.rotation.y+=Y,B.rotation.x=Math.max(Math.min(B.rotation.x+H,Math.PI/2-.1),-Math.PI/2+.1),d.current.x=B.rotation.x,d.current.y=B.rotation.y,Y*=.92,H*=.92),S.render(g,_),V=requestAnimationFrame(G))}G();const j=()=>{try{const he=w();ue.map&&ue.map.dispose(),ue.map=he,ue.needsUpdate=!0}catch{}},Z=S.domElement;function fe(he){const ve=Z.getBoundingClientRect();return{x:he.clientX-ve.left,y:he.clientY-ve.top}}function xe(he){$=!0,Z.setPointerCapture(he.pointerId);const ve=fe(he);Q=ve.x,U=ve.y,Y=0,H=0}function Ee(he){if(!$)return;const ve=fe(he),K=ve.x-Q,nt=ve.y-U;Q=ve.x,U=ve.y;const Pe=.0025;B.rotation.y+=-K*Pe,B.rotation.x+=-nt*Pe,B.rotation.x=Math.max(Math.min(B.rotation.x,Math.PI/2-.1),-Math.PI/2+.1),d.current.x=B.rotation.x,d.current.y=B.rotation.y,Y=-K*Pe*.6+Y*.4,H=-nt*Pe*.6+H*.4}function Te(he){$=!1;try{Z.releasePointerCapture(he.pointerId)}catch{}}function Ne(he){if(!_)return;he.preventDefault();const ve=he.deltaY>0?.2:-.2;_.position.z=Math.max(1.6,Math.min(6,_.position.z+ve))}return Z.addEventListener("pointerdown",xe),Z.addEventListener("pointermove",Ee),Z.addEventListener("pointerup",Te),Z.addEventListener("pointercancel",Te),Z.addEventListener("wheel",Ne,{passive:!1}),j(),()=>{V&&cancelAnimationFrame(V),window.removeEventListener("resize",I);try{Z.removeEventListener("pointerdown",xe),Z.removeEventListener("pointermove",Ee),Z.removeEventListener("pointerup",Te),Z.removeEventListener("pointercancel",Te),Z.removeEventListener("wheel",Ne)}catch{}try{S.dispose()}catch{}S.domElement&&S.domElement.parentElement&&S.domElement.parentElement.removeChild(S.domElement)}},[r,e]),O.jsx("div",{ref:o,className:t,style:{width:"100%",height:"100%",...s}})}function jT({world:r,error:e}){const t=pe.useMemo(()=>r?oo(r):null,[r]),s=pe.useMemo(()=>r?r.metadata:null,[r]);return O.jsxs("div",{style:{position:"absolute",inset:0,display:"flex",flexDirection:"column",background:"#000"},children:[O.jsxs("div",{style:{padding:12,display:"flex",justifyContent:"space-between",gap:10,background:"rgba(0,0,0,0.7)"},children:[O.jsx("div",{style:{fontWeight:900,color:"#fff"},children:"World Preview"}),s&&O.jsxs("div",{style:{fontSize:12,opacity:.75,color:"#fff"},children:[s.styleMode," • ",s.gridWidth,"×",s.gridHeight," • seed ",s.seed]})]}),e?O.jsx("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",color:"#f66",padding:20},children:e}):r?O.jsx("div",{style:{flex:1,position:"relative"},children:O.jsx(Yd,{world:r,preview:t,style:{width:"100%",height:"100%"}})}):O.jsx("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,0.6)",fontSize:16},children:"Configure parameters and click Generate"})]})}function XT(){const r=sa(),[e,t]=pe.useState(null),[s,o]=pe.useState(!1),[l,u]=pe.useState(null);pe.useMemo(()=>e?oo(e):null,[e]);async function d(g){u(null);try{await ln.createWorld(g);const _=ln.getWorld();t(_)}catch(_){console.error(_),u(_?.message||"Generate failed.")}}async function f(){if(e){o(!0),u(null);try{const g=await Cg(e);r(`/create/${g.metadata.id}`)}catch(g){console.error(g),u(g?.message||"Save failed.")}finally{o(!1)}}}const h=[{id:"generate",title:"Generate",tools:[{id:"gen",label:"Generate",disabled:!0},{id:"save",label:s?"Saving…":"Save → Create",disabled:!e||s,onClick:f}]}],m=O.jsx(Rx,{onGenerate:d,onSave:f,saving:s,disabled:!e});return O.jsx(ns,{mode:"generate",onGoHome:()=>r("/"),worldName:e?.metadata?.name||"Generate",isDirty:!0,rightPanel:m,toolGroups:h,children:O.jsx(jT,{world:e,error:l})})}function YT(r,e){const t=r.getContext("2d");if(!t)return;const s=oo(e),o=s.width,l=s.height,u=2;r.width=o*u,r.height=l*u;const d=t.createImageData(o,l),f=d.data;for(let M=0;M<l;M++)for(let x=0;x<o;x++){const y=s.minimapColorAt(x,M),w=(M*o+x)*4;f[w+0]=y[0],f[w+1]=y[1],f[w+2]=y[2],f[w+3]=y[3]}const h=document.createElement("canvas");h.width=o,h.height=l;const m=h.getContext("2d");if(!m)return;m.putImageData(d,0,0),t.imageSmoothingEnabled=!1,t.clearRect(0,0,r.width,r.height),t.drawImage(h,0,0,o*u,l*u);const g=Math.max(20,Math.floor(o*u*.25)),_=Math.max(16,Math.floor(l*u*.25)),S=Math.floor((o*u-g)/2),T=Math.floor((l*u-_)/2);t.strokeStyle="rgba(255,255,255,0.95)",t.lineWidth=2,t.strokeRect(S+.5,T+.5,g,_),t.strokeStyle="rgba(0,0,0,0.55)",t.lineWidth=1,t.strokeRect(S+1.5,T+1.5,g-2,_-2)}function qT({world:r}){const e=pe.useRef(null);return pe.useEffect(()=>{if(e.current)try{YT(e.current,r)}catch(t){console.error("Minimap draw failed:",t)}},[r]),O.jsx("div",{style:{position:"absolute",inset:0},children:O.jsx("canvas",{ref:e,style:{width:"100%",height:"100%",display:"block",background:"#111"}})})}class $T{constructor(e,t,s){Object.defineProperty(this,"world",{enumerable:!0,configurable:!0,writable:!0,value:e}),Object.defineProperty(this,"onStateChange",{enumerable:!0,configurable:!0,writable:!0,value:t}),Object.defineProperty(this,"onWorldChange",{enumerable:!0,configurable:!0,writable:!0,value:s}),Object.defineProperty(this,"state",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"actionHistory",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"pendingStrokeSamples",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"recomputeThrottleTimer",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"lastApplyTime",{enumerable:!0,configurable:!0,writable:!0,value:0}),this.state={enabled:!1,tool:"RAISE",brushParams:{shape:"CIRCLE",falloff:"SOFT",radius:10,strength:.5},isDrawing:!1}}setTool(e){this.state.tool=e,this.state.enabled=!0,this.notifyStateChange()}disable(){this.state.enabled=!1,this.state.isDrawing=!1,this.notifyStateChange()}setBrushParams(e){this.state.brushParams={...this.state.brushParams,...e},this.notifyStateChange()}getState(){return{...this.state}}setWorld(e){this.world=e}startStroke(e,t){!this.state.enabled||!this.world||(this.state.isDrawing=!0,this.actionHistory=[],this.applyBrushAtCell(e,t))}continueStroke(e,t){!this.state.isDrawing||!this.state.enabled||!this.world||this.applyBrushAtCell(e,t)}endStroke(){this.recomputeThrottleTimer&&(clearTimeout(this.recomputeThrottleTimer),this.recomputeThrottleTimer=null),this.flushPendingStrokes(),this.state.isDrawing=!1,this.notifyStateChange()}applyBrushAtCell(e,t){if(!this.world)return;if(this.pendingStrokeSamples.push({row:e,col:t}),performance.now()-this.lastApplyTime<100&&this.state.isDrawing){this.recomputeThrottleTimer||(this.recomputeThrottleTimer=window.setTimeout(()=>{this.flushPendingStrokes()},100));return}this.flushPendingStrokes()}flushPendingStrokes(){if(!this.world||this.pendingStrokeSamples.length===0){this.pendingStrokeSamples=[],this.recomputeThrottleTimer=null;return}for(const e of this.pendingStrokeSamples){const t={type:"TERRAIN_STROKE",tool:this.state.tool,center:{row:e.row,col:e.col},radius:this.state.brushParams.radius,strength:this.state.brushParams.strength*.3};Rg(this.world,t),this.actionHistory.push(t)}On(this.world,["TERRAIN_EDIT"]),this.lastApplyTime=performance.now(),this.onWorldChange(this.world),this.pendingStrokeSamples=[],this.recomputeThrottleTimer=null}notifyStateChange(){this.onStateChange(this.getState())}}function KT(r,e){const t=r.getContext("2d");if(!t)return;const s=oo(e),o=s.width,l=s.height,d=Math.max(1,Math.floor(1100/o));r.width=o*d,r.height=l*d;const f=t.createImageData(o,l),h=f.data;for(let _=0;_<l;_++)for(let S=0;S<o;S++){const T=s.minimapColorAt(S,_),M=(_*o+S)*4;h[M+0]=T[0],h[M+1]=T[1],h[M+2]=T[2],h[M+3]=T[3]}const m=document.createElement("canvas");m.width=o,m.height=l;const g=m.getContext("2d");g&&(g.putImageData(f,0,0),t.imageSmoothingEnabled=!1,t.clearRect(0,0,r.width,r.height),t.drawImage(m,0,0,o*d,l*d))}function og(r,e,t,s){if(!t)return null;const o=t.getBoundingClientRect(),l=r-o.left,u=e-o.top,d=l/o.width,f=u/o.height,h=Math.floor(d*s.gridWidth),m=Math.floor(f*s.gridHeight);return m<0||m>=s.gridHeight||h<0||h>=s.gridWidth?null:{row:m,col:h}}function ZT({world:r,activeTerrainTool:e,onWorldChange:t}){const s=pe.useRef(null),o=pe.useRef(null),[l,u]=pe.useState(null);pe.useEffect(()=>{o.current=new $T(r,u,t),e&&o.current.setTool(e)},[r,t]),pe.useEffect(()=>{e&&o.current?o.current.setTool(e):!e&&o.current&&o.current.disable()},[e]),pe.useEffect(()=>{const g=s.current;if(g)try{KT(g,r)}catch(_){console.error("Create viewport draw failed:",_)}},[r]);const d=g=>{const _=s.current;if(!_||!o.current)return;const S=og(g.clientX,g.clientY,_,r);S&&o.current.startStroke(S.row,S.col)},f=g=>{const _=s.current;if(!_||!o.current)return;const S=og(g.clientX,g.clientY,_,r);S&&o.current.continueStroke(S.row,S.col)},h=()=>{o.current&&o.current.endStroke()},m=()=>{o.current&&o.current.endStroke()};return O.jsxs("div",{style:{position:"absolute",inset:0,overflow:"auto"},children:[O.jsxs("div",{style:{padding:12,fontWeight:900},children:["Create View",l?.enabled&&O.jsxs("span",{style:{marginLeft:12,fontSize:12,opacity:.7},children:["Tool: ",l.tool," | Radius: ",l.brushParams.radius]})]}),O.jsxs("div",{style:{padding:12},children:[O.jsx("canvas",{ref:s,onMouseDown:d,onMouseMove:f,onMouseUp:h,onMouseLeave:m,style:{width:"100%",maxWidth:1200,borderRadius:12,border:"1px solid rgba(0,0,0,0.15)",background:"#111",display:"block",cursor:l?.enabled?"crosshair":"default"}}),O.jsx("div",{style:{fontSize:11,opacity:.65,marginTop:8},children:l?.enabled?`Terrain brush active: ${l.tool.toUpperCase()} - click and drag to paint.`:"Select a terrain tool above to start editing."})]})]})}function Md(r,e,t,s=256,o=128){const l=r-t.left,u=e-t.top,d=l/t.width*360-180;return{lat:90-u/t.height*180,lon:d}}function Ed(r,e,t){const s=t.left+(e+180)/360*t.width,o=t.top+(90-r)/180*t.height;return{x:s,y:o}}function ag(r,e,t){let s=-1,o=t;for(let l=0;l<e.length;l++){const u=Math.sqrt(Math.pow(r.lat-e[l].lat,2)+Math.pow(r.lon-e[l].lon,2));u<o&&(o=u,s=l)}return s>=0?s:null}function lg(r,e,t,s,o){const l=t.map(u=>({lat:(u.lat+90)/180,lon:(u.lon+180)/360}));return{id:r,name:`${e} Sticker`,type:e,mode:s,polygon:l,falloff:0,payload:o}}function cg(r,e){r.stickers||(r.stickers=[]),r.stickers.push(e);const{gridWidth:t,gridHeight:s}=r;for(let o=0;o<s;o++)for(let l=0;l<t;l++){const u=o/s,d=l/t;if(QT(u,d,e.polygon)){const f=o*t+l,h=r.cells[f];if(!h)continue;e.type==="BIOME"&&e.payload.biomeId?h.editBiomeId=e.payload.biomeId:e.type==="HEIGHT"&&e.payload.heightDelta?h.editHeightDelta=Math.max(-1,Math.min(1,h.editHeightDelta+e.payload.heightDelta)):e.type==="CULTURE"&&e.payload.cultureId&&(h.cultureId=e.payload.cultureId)}}}function QT(r,e,t){if(t.length<3)return!1;let s=!1;for(let o=0,l=t.length-1;o<t.length;l=o++){const u=t[o].lon,d=t[o].lat,f=t[l].lon,h=t[l].lat;d>r!=h>r&&e<(f-u)*(r-d)/(h-d)+u&&(s=!s)}return s}function JT(r,e,t){const s=[];let o=!0;return r===1?e>.3&&(s.push("Tundra is unusually warm at this temperature."),o=!1):r===5?e<.55&&(s.push("Jungle is unusually cold at this temperature."),o=!1):r===4&&t>.3&&(s.push("Deserts are typically dry. This location has high rainfall."),o=!1),r===3?t<.25&&(s.push("Forests require substantial moisture. This area is drier than typical."),o=!1):r===4&&t>.2&&(s.push("Deserts are arid. This rainfall level is too high for a desert."),o=!1),e<.15&&r===5&&(s.push("Jungles cannot exist in polar regions."),o=!1),e>.85&&r===1&&(s.push("Tundra cannot exist in tropical regions."),o=!1),s.length===0&&o&&s.push("✓ This placement is realistic for the local climate."),{isValid:o,warnings:s}}function ew({biomeType:r,temperature:e,rainfall:t,warnings:s,onApply:o,onCancel:l}){const u=s.some(d=>!d.startsWith("✓"));return O.jsx("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1e4},onClick:l,children:O.jsxs("div",{style:{background:"rgba(20, 20, 30, 0.95)",border:"1px solid rgba(100, 180, 255, 0.3)",borderRadius:12,padding:24,maxWidth:400,color:"rgba(255,255,255,0.88)",backdropFilter:"blur(8px)"},onClick:d=>d.stopPropagation(),children:[O.jsxs("h3",{style:{margin:"0 0 12px 0",fontSize:16,color:"rgba(100, 200, 255, 0.9)"},children:["Place ",r," Biome?"]}),O.jsxs("div",{style:{fontSize:12,opacity:.75,marginBottom:16},children:[O.jsxs("div",{children:["Temperature: ",(e*100).toFixed(0),"%"]}),O.jsxs("div",{children:["Rainfall: ",(t*100).toFixed(0),"%"]})]}),O.jsx("div",{style:{background:"rgba(0,0,0,0.3)",border:`1px solid ${u?"rgba(255, 100, 100, 0.3)":"rgba(100, 200, 100, 0.3)"}`,borderRadius:8,padding:12,marginBottom:16,fontSize:12,lineHeight:1.6},children:s.map((d,f)=>O.jsx("div",{style:{color:d.startsWith("✓")?"rgba(100, 200, 100, 0.8)":"rgba(255, 150, 100, 0.9)"},children:d},f))}),O.jsxs("div",{style:{display:"flex",gap:10,justifyContent:"flex-end"},children:[O.jsx("button",{onClick:l,style:{padding:"8px 12px",borderRadius:6,border:"1px solid rgba(255,255,255,0.2)",background:"rgba(255,255,255,0.05)",color:"rgba(255,255,255,0.75)",cursor:"pointer",fontSize:12},children:"Cancel"}),O.jsx("button",{onClick:o,style:{padding:"8px 12px",borderRadius:6,border:"1px solid rgba(100, 180, 255, 0.4)",background:u?"rgba(200, 100, 100, 0.2)":"rgba(100, 180, 255, 0.15)",color:"rgba(100, 200, 255, 0.9)",cursor:"pointer",fontSize:12},children:u?"Place Anyway (Override)":"Place"})]})]})})}function tw({world:r,activeStickerTool:e,onStickerCreated:t,onCancel:s}){const o=pe.useRef(null),l=pe.useRef(null),[u,d]=pe.useState([]),[f,h]=pe.useState(null),[m,g]=pe.useState(null),[_,S]=pe.useState(!1);pe.useEffect(()=>{const w=o.current,b=l.current;if(!w||!b)return;const P=w.getContext("2d");if(!P)return;const z=b.getBoundingClientRect();if(w.width=z.width,w.height=z.height,P.fillStyle="rgba(0,0,0,0.1)",P.fillRect(0,0,w.width,w.height),u.length>0){P.strokeStyle="rgba(100, 200, 255, 0.8)",P.fillStyle="rgba(100, 200, 255, 0.15)",P.lineWidth=3,P.beginPath();const k=u[0],N=Ed(k.lat,k.lon,z);P.moveTo(N.x-z.left,N.y-z.top);for(let oe=1;oe<u.length;oe++){const A=u[oe],R=Ed(A.lat,A.lon,z);P.lineTo(R.x-z.left,R.y-z.top)}u.length>2&&P.lineTo(N.x-z.left,N.y-z.top),P.fill(),P.stroke();for(let oe=0;oe<u.length;oe++){const A=u[oe],R=Ed(A.lat,A.lon,z);P.fillStyle=oe===0?"rgba(100, 255, 100, 0.95)":"rgba(255, 100, 100, 0.95)",P.strokeStyle="rgba(255, 255, 255, 0.9)",P.lineWidth=2,P.beginPath(),P.arc(R.x-z.left,R.y-z.top,7,0,Math.PI*2),P.fill(),P.stroke()}}},[u]);const T=w=>{if(!r||!e||!l.current)return;const b=l.current.getBoundingClientRect(),P=Md(w.clientX,w.clientY,b,r.gridWidth,r.gridHeight);if(u.length>=3&&ag(P,u,8)===0){const k=`sticker_${Date.now()}`;let N={};if(e==="BIOME"){N.biomeId=5;const A=u.reduce((B,V)=>B+V.lat,0)/u.length,R=u.reduce((B,V)=>B+V.lon,0)/u.length,ie=Math.floor((90-A)/180*(r?.gridHeight||128)),ue=Math.floor((R+180)/360*(r?.gridWidth||256)),de=ie*(r?.gridWidth||256)+ue;if(r&&r.cells[de]){const B=r.cells[de],V=JT(N.biomeId,B.temperature,B.rainfall);g({stickerId:k,payload:N,temperature:B.temperature,rainfall:B.rainfall,validation:V}),S(!0);return}}else e==="CULTURE"?N.cultureId="culture_0":e==="HEIGHT"&&(N.heightDelta=.3);const oe=lg(k,e,u,"OVERRIDE",N);r&&(cg(r,oe),t?.(r)),d([]);return}d([...u,P])},M=w=>{if(f===null||!l.current)return;const b=l.current.getBoundingClientRect(),P=Md(w.clientX,w.clientY,b,r?.gridWidth||256,r?.gridHeight||128),z=[...u];z[f]=P,d(z)},x=w=>{if(!l.current)return;const b=l.current.getBoundingClientRect(),P=Md(w.clientX,w.clientY,b,r?.gridWidth||256,r?.gridHeight||128),z=ag(P,u,8);z!==null&&h(z)},y=()=>{h(null)};return e?O.jsxs("div",{ref:l,style:{position:"absolute",inset:0,zIndex:1e3,cursor:"crosshair"},children:[O.jsx("canvas",{ref:o,onClick:T,onMouseMove:M,onMouseDown:x,onMouseUp:y,onMouseLeave:y,style:{position:"absolute",inset:0,display:"block"}}),O.jsxs("div",{style:{position:"absolute",top:16,left:16,background:"rgba(0,0,0,0.85)",color:"rgba(255,255,255,0.95)",padding:"14px 16px",borderRadius:8,fontSize:12,zIndex:1001,maxWidth:320,border:"1px solid rgba(100,200,255,0.3)"},children:[O.jsxs("div",{style:{fontWeight:700,marginBottom:8,color:"rgba(100,200,255,0.95)"},children:[e==="BIOME"&&"🌍 Biome Sticker",e==="CULTURE"&&"👥 Culture Zone",e==="HEIGHT"&&"⛏️ Terrain Sticker"]}),O.jsx("div",{style:{opacity:.85,marginBottom:10,lineHeight:1.5},children:"Click to place vertices. Close polygon by clicking first vertex (green dot)."}),O.jsxs("div",{style:{fontSize:11,opacity:.7,marginBottom:10},children:["Vertices: ",u.length]}),O.jsxs("div",{style:{display:"flex",gap:8},children:[O.jsx("button",{onClick:()=>{d([]),s?.()},style:{padding:"6px 12px",borderRadius:6,border:"1px solid rgba(255,100,100,0.3)",background:"rgba(255,100,100,0.1)",color:"rgba(255,150,150,0.95)",cursor:"pointer",fontSize:11,fontWeight:600},children:"Cancel"}),u.length>0&&O.jsx("button",{onClick:()=>{d(u.slice(0,-1))},style:{padding:"6px 12px",borderRadius:6,border:"1px solid rgba(200,200,100,0.3)",background:"rgba(200,200,100,0.1)",color:"rgba(255,255,150,0.95)",cursor:"pointer",fontSize:11,fontWeight:600},children:"Undo Vertex"})]})]}),_&&m&&O.jsx(ew,{biomeType:e==="BIOME"?"Biome":e||"",temperature:m.temperature,rainfall:m.rainfall,warnings:m.validation.warnings,onApply:()=>{const w=lg(m.stickerId,e,u,"OVERRIDE",m.payload);r&&(cg(r,w),d([]),g(null),S(!1),t?.(r))},onCancel:()=>{g(null),S(!1)}})]}):null}function nw(){const r=sa(),{worldId:e}=Eg(),[t,s]=pe.useState(!0),[o,l]=pe.useState(null),[u,d]=pe.useState(null),[f,h]=pe.useState(!1),[m,g]=pe.useState("GLOBE"),[_,S]=pe.useState(null),[T,M]=pe.useState(null),[x,y]=pe.useState(null),[w,b]=pe.useState(ln.getWorld());pe.useEffect(()=>ln.subscribe(B=>b(B)),[]),pe.useEffect(()=>{let de=!0;return(async()=>{if(!e){de&&(l("Missing worldId in route."),s(!1));return}s(!0),l(null);try{await ln.loadWorld(e)}catch(B){console.error(B),de&&l(B?.message||"Failed to load world.")}finally{de&&s(!1)}})(),()=>{de=!1}},[e]);const P=pe.useMemo(()=>w?oo(w):null,[w]);async function z(){d(null),h(!0);try{await ln.save()}catch(de){console.error(de),d(de?.message||"Save failed.")}finally{h(!1)}}const k=de=>{ln.applyLocalEdit(de)},N=()=>{if(w)try{const de=Math.floor(Math.random()*4)+5,B=bg(w,de);if(!B||B.length===0){console.error("[Generate Countries] No countries generated - check world has land cells"),alert("Failed to generate countries. Ensure the world has sufficient land mass.");return}const V={...w,countries:B};ln.applyLocalEdit(V),console.log(`[Generate Countries] Successfully generated ${B.length} countries`)}catch(de){console.error("[Generate Countries] Error:",de),alert(`Failed to generate countries: ${de}`)}},oe=()=>{if(!w)return;const de=w.cells.filter(U=>!U.isWater);if(de.length===0)return;const B=de[Math.floor(Math.random()*de.length)];Math.floor(B.index/w.gridWidth),B.index%w.gridWidth;let V="TOWN";de.find(U=>{const Y=U.index,H=Math.floor(Y/w.gridWidth),I=Y%w.gridWidth;for(let G=-1;G<=1;G++)for(let j=-1;j<=1;j++){const Z=H+G,fe=((I+j)%w.gridWidth+w.gridWidth)%w.gridWidth,xe=Z*w.gridWidth+fe;if(w.cells[xe]?.isWater)return!0}return!1})&&(V="PORT");const Q={id:`city_${Date.now()}`,name:"City",cellIndex:B.index,population:1e3,type:V,populationTier:2,isCapital:!1,economicRoles:["TRADE"],tags:[],description:"",countryId:w.countries?.[0]?.id,cultureId:w.cultures?.[0]?.id};w.cities=w.cities||[],w.cities.push(Q),On(w,["TERRAIN_EDIT"]),k(w)},A=[{id:"terrain",title:"Terrain",tools:[{id:"raise",label:"Raise",disabled:!w,active:_==="RAISE",onClick:()=>S(_==="RAISE"?null:"RAISE")},{id:"lower",label:"Lower",disabled:!w,active:_==="LOWER",onClick:()=>S(_==="LOWER"?null:"LOWER")},{id:"smooth",label:"Smooth",disabled:!w,active:_==="SMOOTH",onClick:()=>S(_==="SMOOTH"?null:"SMOOTH")},{id:"flatten",label:"Flatten",disabled:!w,active:_==="FLATTEN",onClick:()=>S(_==="FLATTEN"?null:"FLATTEN")}]},{id:"biomes",title:"Biomes",tools:[{id:"paint_biome",label:"Paint Biome",disabled:!w,active:T==="BIOME",onClick:()=>M(T==="BIOME"?null:"BIOME")},{id:"paint_height",label:"Raise/Lower",disabled:!w,active:T==="HEIGHT",onClick:()=>M(T==="HEIGHT"?null:"HEIGHT")}]},{id:"water",title:"Water",tools:[{id:"river_add",label:"Add River",disabled:!w,active:x==="ADD_RIVER",onClick:()=>y(x==="ADD_RIVER"?null:"ADD_RIVER")},{id:"river_edit",label:"Edit River",disabled:!w,active:x==="EDIT_RIVER",onClick:()=>y(x==="EDIT_RIVER"?null:"EDIT_RIVER")},{id:"lake_add",label:"Set Lake Level",disabled:!w,active:x==="ADD_LAKE",onClick:()=>y(x==="ADD_LAKE"?null:"ADD_LAKE")}]},{id:"volcano",title:"Volcano",tools:[{id:"add_volcano",label:"Add Volcano",disabled:!0}]},{id:"countries",title:"Countries & Borders",tools:[{id:"gen_countries",label:"Generate Countries",disabled:!w,onClick:()=>N()},{id:"edit_border",label:"Edit Border",disabled:!0}]},{id:"culture",title:"Culture",tools:[{id:"add_culture",label:"Add Culture Zone",disabled:!w,active:T==="CULTURE",onClick:()=>M(T==="CULTURE"?null:"CULTURE")}]},{id:"cities",title:"Cities",tools:[{id:"add_city",label:"Add City",disabled:!w,onClick:()=>oe()}]}],R=O.jsxs("div",{style:{padding:14,color:"rgba(255,255,255,0.88)"},children:[O.jsx("h3",{style:{margin:"6px 0 10px 0"},children:"Create"}),O.jsxs("div",{style:{display:"flex",gap:10,marginBottom:12},children:[O.jsx("button",{onClick:z,disabled:!w||t||f,style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:!w||t||f?"not-allowed":"pointer",opacity:!w||t||f?.5:1},children:f?"Saving…":"Save"}),O.jsx("button",{onClick:()=>r(`/sim/${e}`),disabled:!e,style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:e?"pointer":"not-allowed",opacity:e?1:.5},children:"Go to Sim"})]}),u&&O.jsxs("div",{style:{marginBottom:12,padding:10,borderRadius:10,border:"1px solid rgba(255,90,90,0.35)",background:"rgba(255,90,90,0.08)",color:"rgba(255,255,255,0.92)",fontSize:12,lineHeight:1.4},children:[O.jsx("b",{children:"Save failed:"})," ",u]}),O.jsx("div",{style:{fontSize:12,opacity:.8,lineHeight:1.4},children:"Tool implementations come after Phase 1 stability. For now these are blueprint-accurate categories."})]});function ie(de,B){const V=de?.width,$=de?.height,Q=de?.rgba;return!V||!$?O.jsx("div",{style:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",padding:12,color:"rgba(255,255,255,0.85)",fontSize:13},children:"Generating preview…"}):Q&&Q instanceof Uint8ClampedArray?O.jsx("canvas",{width:V,height:$,ref:U=>{if(!U)return;const Y=U.getContext("2d");if(Y)try{const H=new ImageData(Q,V,$);Y.putImageData(H,0,0)}catch(H){console.error("Preview render failed:",H)}},style:{width:"100%",height:"100%",imageRendering:"auto"}}):O.jsx("div",{style:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",padding:12,color:"rgba(255,255,255,0.85)",fontSize:13},children:"No preview available"})}if(t)return O.jsx(ns,{mode:"create",onGoHome:()=>r("/"),worldName:w?.metadata?.name||"Loading…",isDirty:ln.isDirty(),onModeToggle:()=>r(`/sim/${e}`),viewMode:m,onViewModeChange:g,rightPanel:R,toolGroups:A,children:O.jsx("div",{style:{padding:20,color:"rgba(255,255,255,0.85)"},children:"Loading world…"})});if(o)return O.jsx(ns,{mode:"create",onGoHome:()=>r("/"),worldName:"Load Error",isDirty:!1,viewMode:m,onViewModeChange:g,rightPanel:O.jsxs("div",{style:{padding:14,color:"rgba(255,255,255,0.9)"},children:[O.jsx("h3",{style:{margin:"6px 0 10px 0"},children:"Could not load world"}),O.jsx("div",{style:{opacity:.85,marginBottom:12},children:o}),O.jsxs("div",{style:{display:"flex",gap:10,flexWrap:"wrap"},children:[O.jsx("button",{onClick:()=>r("/"),style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Back to Home"}),O.jsx("button",{onClick:()=>r("/generate"),style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Go to Generate"}),O.jsx("button",{onClick:()=>window.location.reload(),style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Reload"})]})]}),children:O.jsx("div",{style:{padding:20}})});const ue=m==="GLOBE";return O.jsx(ns,{mode:"create",onGoHome:()=>r("/"),worldName:w?.metadata?.name||"Create",isDirty:ln.isDirty(),onModeToggle:()=>r(`/sim/${e}`),viewMode:m,onViewModeChange:g,rightPanel:R,toolGroups:A,children:O.jsxs("div",{style:{width:"100%",height:"100%",position:"relative"},children:[m==="GLOBE"&&w?O.jsx("div",{style:{width:"100%",height:"100%"},children:O.jsx(Yd,{world:w,preview:P})}):w?O.jsx(ZT,{world:w,activeTerrainTool:_,onWorldChange:k}):ie(P),T&&O.jsx(tw,{world:w,activeStickerTool:T,onStickerCreated:()=>{M(null),k(w)},onCancel:()=>M(null)}),w&&ue&&O.jsx("div",{style:{position:"absolute",left:16,bottom:16,width:220,height:140,borderRadius:12,overflow:"hidden",border:"1px solid rgba(255,255,255,0.18)",background:"rgba(0,0,0,0.35)",boxShadow:"0 10px 25px rgba(0,0,0,0.35)"},title:"Minimap (Create + Globe only)",children:O.jsx(qT,{world:w})})]})})}function iw(r,e){const t=[];for(const s of r.cities)Math.random()<.1&&t.push({id:`city_growth_${s.id}`,type:"CITY_GROWTH",year:e,title:`${s.name} is growing`,description:`Population in ${s.name} has increased significantly.`,affectedCityIds:[s.id],options:[{label:"Accept growth",description:"Population increases by 20%",effect:o=>{const l=o.cities.find(u=>u.id===s.id);l&&(l.population*=1.2)}}],severity:"MINOR",automaticallyResolve:!0});if(r.countries.length>1&&Math.random()<.05){const s=r.countries.sort(()=>Math.random()-.5);s.length>=2&&t.push({id:`war_${e}`,type:"WAR_DECLARATION",year:e,title:`War between ${s[0].name} and ${s[1].name}`,description:"Border tensions have escalated into open conflict.",affectedCountryIds:[s[0].id,s[1].id],options:[{label:"Let conflict resolve naturally",description:"Outcome depends on military strength",effect:o=>{}}],severity:"MAJOR"})}if(r.cultures.length>0&&Math.random()<.03){const s=r.cultures[Math.floor(Math.random()*r.cultures.length)];t.push({id:`culture_split_${s.id}`,type:"CULTURE_SPLIT",year:e,title:`${s.name} culture is fragmenting`,description:`Isolated regions of ${s.name} have begun to diverge culturally.`,affectedCultureIds:[s.id],options:[{label:"Accept split",description:"Creates a new sub-culture",effect:o=>{const l={...s,id:`${s.id}_split`,name:`${s.name} (Reformed)`};o.cultures.push(l)}}],severity:"MODERATE"})}if(Math.random()<.08){const s=Math.random()<.5?"DROUGHT":"PLAGUE",o=s==="DROUGHT"?"Severe drought in the south":"Plague outbreak in the cities";t.push({id:`disaster_${e}`,type:s,year:e,title:o,description:s==="DROUGHT"?"Agricultural output has dropped significantly due to lack of rain.":"A deadly plague is spreading through major population centers.",affectedCityIds:r.cities.slice(0,Math.floor(r.cities.length/3)).map(l=>l.id),options:[{label:"Accept losses",description:"Population affected by disaster",effect:l=>{}}],severity:"MAJOR"})}return t}function ug(r,e,t){return e<0||e>=r.options.length?!1:(r.options[e].effect(t),!0)}function rw(r,e=0,t=`Branch ${new Date().toISOString()}`){return{id:`branch_${Date.now()}`,name:t,baseWorldId:r.metadata.id,worldSnapshot:JSON.parse(JSON.stringify(r)),startYear:e,currentYear:e,eventHistory:[],createdAt:new Date().toISOString(),isPromoted:!1}}const sw=({events:r,onResolveEvent:e,onAutoResolveAll:t})=>{const[s,o]=pe.useState(r.length>0?r[0].id:null),l=r.find(u=>u.id===s);return O.jsxs("div",{style:{position:"fixed",right:20,top:180,width:320,maxHeight:500,backgroundColor:"#222",border:"2px solid #666",borderRadius:8,boxShadow:"0 4px 12px rgba(0,0,0,0.5)",display:"flex",flexDirection:"column",fontFamily:"monospace",fontSize:"12px",zIndex:1e3},children:[O.jsxs("div",{style:{padding:"8px 12px",backgroundColor:"#111",borderBottom:"1px solid #666",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[O.jsxs("span",{style:{color:"#fff",fontWeight:"bold"},children:["Inbox (",r.length,")"]}),r.length>0&&O.jsx("button",{onClick:t,style:{padding:"2px 6px",backgroundColor:"#444",color:"#fff",border:"1px solid #666",borderRadius:3,cursor:"pointer",fontSize:"10px"},children:"Auto-Resolve All"})]}),O.jsx("div",{style:{overflowY:"auto",flex:1,maxHeight:200},children:r.length===0?O.jsx("div",{style:{padding:"12px",color:"#888",textAlign:"center"},children:"No pending decisions"}):r.map(u=>O.jsxs("div",{onClick:()=>o(u.id),style:{padding:"8px 12px",borderBottom:"1px solid #444",cursor:"pointer",backgroundColor:u.id===s?"#333":"transparent",transition:"background-color 0.2s"},onMouseEnter:d=>{u.id!==s&&(d.currentTarget.style.backgroundColor="#2a2a2a")},onMouseLeave:d=>{u.id!==s&&(d.currentTarget.style.backgroundColor="transparent")},children:[O.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4},children:[O.jsx("span",{style:{color:u.severity==="MAJOR"?"#ff6b6b":u.severity==="MODERATE"?"#ffd93d":"#88ff88",fontWeight:"bold",flex:1},children:u.title}),O.jsxs("span",{style:{color:"#888",fontSize:"10px"},children:["Y",u.year]})]}),O.jsx("div",{style:{color:"#aaa",fontSize:"11px"},children:u.type})]},u.id))}),l&&O.jsxs("div",{style:{borderTop:"1px solid #666",padding:"12px"},children:[O.jsxs("div",{style:{marginBottom:8,color:"#fff"},children:[O.jsx("div",{style:{fontWeight:"bold",color:l.severity==="MAJOR"?"#ff6b6b":l.severity==="MODERATE"?"#ffd93d":"#88ff88",marginBottom:4},children:l.title}),O.jsx("div",{style:{color:"#aaa",fontSize:"11px",marginBottom:8},children:l.description})]}),O.jsx("div",{style:{display:"flex",flexDirection:"column",gap:6},children:l.options.map((u,d)=>O.jsxs("button",{onClick:()=>{e(l.id,d),o(null)},style:{padding:"6px 8px",backgroundColor:"#444",color:"#fff",border:"1px solid #666",borderRadius:4,cursor:"pointer",fontSize:"11px",textAlign:"left",transition:"all 0.2s"},onMouseEnter:f=>{f.currentTarget.style.backgroundColor="#555"},onMouseLeave:f=>{f.currentTarget.style.backgroundColor="#444"},children:[O.jsx("div",{style:{fontWeight:"bold"},children:u.label}),O.jsx("div",{style:{color:"#aaa",fontSize:"10px"},children:u.description})]},d))})]})]})},ow=({history:r})=>O.jsxs("div",{style:{position:"fixed",left:20,top:180,width:280,maxHeight:400,backgroundColor:"#222",border:"2px solid #666",borderRadius:8,boxShadow:"0 4px 12px rgba(0,0,0,0.5)",fontFamily:"monospace",fontSize:"11px",zIndex:1e3,overflowY:"auto"},children:[O.jsxs("div",{style:{padding:"8px 12px",backgroundColor:"#111",borderBottom:"1px solid #666",fontWeight:"bold",color:"#fff",position:"sticky",top:0},children:["Event History (",r.length,")"]}),O.jsx("div",{style:{padding:8},children:r.length===0?O.jsx("div",{style:{color:"#888",textAlign:"center",padding:12},children:"No events yet"}):r.slice().reverse().map((e,t)=>O.jsxs("div",{style:{marginBottom:8,padding:8,backgroundColor:"rgba(255,255,255,0.03)",borderRadius:6,borderLeft:e.event.severity==="MAJOR"?"3px solid #ff6b6b":e.event.severity==="MODERATE"?"3px solid #ffd93d":"3px solid #88ff88"},children:[O.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:4},children:[O.jsx("span",{style:{fontWeight:"bold",color:"#fff"},children:e.event.title}),O.jsxs("span",{style:{color:"#888",fontSize:10},children:["Y",e.resolvedYear]})]}),O.jsx("div",{style:{color:"#aaa",fontSize:10,marginBottom:4},children:e.event.description}),O.jsxs("div",{style:{color:"#88ff88",fontSize:10,fontStyle:"italic"},children:["→ ",e.event.options[e.chosenOption]?.label]})]},t))})]});function aw(){const r=sa(),{worldId:e}=Eg(),[t,s]=pe.useState(!0),[o,l]=pe.useState(null),[u,d]=pe.useState(ln.getWorld());pe.useEffect(()=>ln.subscribe(R=>d(R)),[]);const[f,h]=pe.useState(0),[m,g]=pe.useState([]),[_,S]=pe.useState([]),[T,M]=pe.useState(!1),[x,y]=pe.useState([]),[w,b]=pe.useState(!1);pe.useEffect(()=>{let A=!0;return(async()=>{if(!e){A&&(l("Missing worldId in route."),s(!1));return}s(!0),l(null);try{await ln.loadWorld(e)}catch(R){console.error(R),A&&l(R?.message||"Failed to load world.")}finally{A&&s(!1)}})(),()=>{A=!1}},[e]);const P=()=>{if(!u)return;const A=f+1;h(A);const R=iw(u,A);g(ie=>[...ie,...R])},z=(A,R)=>{const ie=m.find(ue=>ue.id===A);!ie||!u||(ug(ie,R,u),ln.applyLocalEdit(u),g(ue=>ue.filter(de=>de.id!==A)),y(ue=>[...ue,{event:ie,chosenOption:R,resolvedYear:f}]))},k=()=>{if(u){for(const A of m)A.automaticallyResolve&&A.options.length>0&&ug(A,0,u);ln.applyLocalEdit(u),g(A=>A.filter(R=>!R.automaticallyResolve||R.options.length===0))}},N=A=>{if(!u)return;const R=rw(u,f,A);S(ie=>[...ie,R]),M(!1)},oe=O.jsxs("div",{style:{padding:14,color:"rgba(255,255,255,0.88)"},children:[O.jsxs("h3",{style:{margin:"6px 0 10px 0"},children:["Sim Year ",f]}),O.jsxs("div",{style:{display:"flex",gap:10,marginBottom:12},children:[O.jsx("button",{onClick:P,disabled:!u||t,style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:!u||t?"not-allowed":"pointer",opacity:!u||t?.5:1},children:"Tick"}),O.jsx("button",{onClick:()=>r(`/create/${e}`),disabled:!e,style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:e?"pointer":"not-allowed",opacity:e?1:.5},children:"Back to Create"})]}),O.jsxs("div",{style:{marginBottom:12,borderTop:"1px solid rgba(255,255,255,0.1)",paddingTop:10},children:[O.jsxs("button",{onClick:()=>b(!w),style:{padding:"8px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(100,150,255,0.15)",color:"rgba(150,200,255,0.9)",cursor:"pointer",fontSize:12,width:"100%",marginBottom:8},children:[w?"Hide":"Show"," History (",x.length,")"]}),O.jsxs("button",{onClick:()=>M(!T),style:{padding:"8px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(100,150,255,0.15)",color:"rgba(150,200,255,0.9)",cursor:"pointer",fontSize:12,width:"100%",marginBottom:8},children:["Branches (",_.length,")"]}),T&&O.jsxs("div",{style:{fontSize:11,backgroundColor:"rgba(0,0,0,0.3)",padding:8,borderRadius:6,marginBottom:8},children:[_.map(A=>O.jsxs("div",{style:{padding:4,marginBottom:4,backgroundColor:"rgba(255,255,255,0.05)",borderRadius:4,borderLeft:A.isPromoted?"2px solid #88ff88":"2px solid #888"},children:[O.jsx("div",{style:{fontWeight:"bold"},children:A.name}),O.jsxs("div",{style:{fontSize:10,opacity:.7},children:["Y",A.currentYear]})]},A.id)),O.jsx("input",{type:"text",placeholder:"Branch name…",onKeyPress:A=>{A.key==="Enter"&&A.currentTarget.value&&(N(A.currentTarget.value),A.currentTarget.value="")},style:{width:"100%",padding:"4px 6px",borderRadius:4,border:"1px solid rgba(255,255,255,0.1)",backgroundColor:"rgba(0,0,0,0.3)",color:"rgba(255,255,255,0.9)",fontSize:11}})]})]}),O.jsx("div",{style:{fontSize:12,opacity:.8,lineHeight:1.4},children:"Culture, Trade, and Route overlays coming soon."})]});return t?O.jsx(ns,{mode:"sim",onGoHome:()=>r("/"),worldName:u?.metadata?.name||"Loading…",isDirty:ln.isDirty(),onModeToggle:()=>r(`/create/${e}`),rightPanel:oe,leftTools:[{id:"overview",label:"Overview",disabled:!0},{id:"culture",label:"Culture",disabled:!0},{id:"trade",label:"Trade",disabled:!0},{id:"routes",label:"Routes",disabled:!0}],children:O.jsx("div",{style:{padding:20,color:"rgba(255,255,255,0.85)"},children:"Loading world…"})}):o?O.jsx(ns,{mode:"sim",onGoHome:()=>r("/"),worldName:"Load Error",isDirty:!1,rightPanel:O.jsxs("div",{style:{padding:14,color:"rgba(255,255,255,0.9)"},children:[O.jsx("h3",{style:{margin:"6px 0 10px 0"},children:"Could not load world"}),O.jsx("div",{style:{opacity:.85,marginBottom:12},children:o}),O.jsxs("div",{style:{display:"flex",gap:10},children:[O.jsx("button",{onClick:()=>r("/"),style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Back to Home"}),O.jsx("button",{onClick:()=>r("/generate"),style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Go to Generate"}),O.jsx("button",{onClick:()=>window.location.reload(),style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Reload"})]})]}),children:O.jsx("div",{style:{padding:20,color:"rgba(255,255,255,0.85)"}})}):O.jsx(ns,{mode:"sim",onGoHome:()=>r("/"),worldName:u?.metadata?.name||"Sim",isDirty:ln.isDirty(),onModeToggle:()=>r(`/create/${e}`),rightPanel:oe,toolGroups:[{id:"sim",title:"Sim Tools",tools:[{id:"overview",label:"Overview",disabled:!0},{id:"culture",label:"Culture",disabled:!0},{id:"trade",label:"Trade",disabled:!0},{id:"routes",label:"Routes",disabled:!0}]}],children:O.jsx("div",{style:{width:"100%",height:"100%",position:"relative"},children:u?O.jsxs(O.Fragment,{children:[O.jsx(Yd,{world:u,className:""}),O.jsx(sw,{events:m,onResolveEvent:z,onAutoResolveAll:k}),w&&O.jsx(ow,{history:x})]}):O.jsx("div",{style:{padding:20,color:"rgba(255,255,255,0.85)"},children:"No world loaded."})})})}function lw(){return O.jsxs(j_,{children:[O.jsx(qs,{path:"/",element:O.jsx(ex,{})}),O.jsx(qs,{path:"/generate",element:O.jsx(XT,{})}),O.jsx(qs,{path:"/create/:worldId",element:O.jsx(nw,{})}),O.jsx(qs,{path:"/sim/:worldId",element:O.jsx(aw,{})}),O.jsx(qs,{path:"*",element:O.jsx(V_,{to:"/",replace:!0})})]})}Jv.createRoot(document.getElementById("root")).render(O.jsx(fg.StrictMode,{children:O.jsx(q_,{children:O.jsx(lw,{})})}));
