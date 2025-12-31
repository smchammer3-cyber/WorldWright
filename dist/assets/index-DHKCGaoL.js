function Uv(r,e){for(var t=0;t<e.length;t++){const s=e[t];if(typeof s!="string"&&!Array.isArray(s)){for(const a in s)if(a!=="default"&&!(a in r)){const l=Object.getOwnPropertyDescriptor(s,a);l&&Object.defineProperty(r,a,l.get?l:{enumerable:!0,get:()=>s[a]})}}}return Object.freeze(Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const d of l.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function t(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerPolicy&&(l.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?l.credentials="include":a.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(a){if(a.ep)return;a.ep=!0;const l=t(a);fetch(a.href,l)}})();function rg(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Ic={exports:{}},Ho={},Nc={exports:{}},ft={};var mp;function Fv(){if(mp)return ft;mp=1;var r=Symbol.for("react.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),d=Symbol.for("react.context"),c=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),m=Symbol.for("react.lazy"),g=Symbol.iterator;function _(L){return L===null||typeof L!="object"?null:(L=g&&L[g]||L["@@iterator"],typeof L=="function"?L:null)}var S={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},T=Object.assign,M={};function y(L,G,j){this.props=L,this.context=G,this.refs=M,this.updater=j||S}y.prototype.isReactComponent={},y.prototype.setState=function(L,G){if(typeof L!="object"&&typeof L!="function"&&L!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,L,G,"setState")},y.prototype.forceUpdate=function(L){this.updater.enqueueForceUpdate(this,L,"forceUpdate")};function x(){}x.prototype=y.prototype;function b(L,G,j){this.props=L,this.context=G,this.refs=M,this.updater=j||S}var w=b.prototype=new x;w.constructor=b,T(w,y.prototype),w.isPureReactComponent=!0;var R=Array.isArray,O=Object.prototype.hasOwnProperty,I={current:null},U={key:!0,ref:!0,__self:!0,__source:!0};function ce(L,G,j){var re,fe={},xe=null,ge=null;if(G!=null)for(re in G.ref!==void 0&&(ge=G.ref),G.key!==void 0&&(xe=""+G.key),G)O.call(G,re)&&!U.hasOwnProperty(re)&&(fe[re]=G[re]);var Ee=arguments.length-2;if(Ee===1)fe.children=j;else if(1<Ee){for(var we=Array(Ee),Ce=0;Ce<Ee;Ce++)we[Ce]=arguments[Ce+2];fe.children=we}if(L&&L.defaultProps)for(re in Ee=L.defaultProps,Ee)fe[re]===void 0&&(fe[re]=Ee[re]);return{$$typeof:r,type:L,key:xe,ref:ge,props:fe,_owner:I.current}}function C(L,G){return{$$typeof:r,type:L.type,key:G,ref:L.ref,props:L.props,_owner:L._owner}}function D(L){return typeof L=="object"&&L!==null&&L.$$typeof===r}function Y(L){var G={"=":"=0",":":"=2"};return"$"+L.replace(/[=:]/g,function(j){return G[j]})}var te=/\/+/g;function de(L,G){return typeof L=="object"&&L!==null&&L.key!=null?Y(""+L.key):G.toString(36)}function k(L,G,j,re,fe){var xe=typeof L;(xe==="undefined"||xe==="boolean")&&(L=null);var ge=!1;if(L===null)ge=!0;else switch(xe){case"string":case"number":ge=!0;break;case"object":switch(L.$$typeof){case r:case e:ge=!0}}if(ge)return ge=L,fe=fe(ge),L=re===""?"."+de(ge,0):re,R(fe)?(j="",L!=null&&(j=L.replace(te,"$&/")+"/"),k(fe,G,j,"",function(Ce){return Ce})):fe!=null&&(D(fe)&&(fe=C(fe,j+(!fe.key||ge&&ge.key===fe.key?"":(""+fe.key).replace(te,"$&/")+"/")+L)),G.push(fe)),1;if(ge=0,re=re===""?".":re+":",R(L))for(var Ee=0;Ee<L.length;Ee++){xe=L[Ee];var we=re+de(xe,Ee);ge+=k(xe,G,j,we,fe)}else if(we=_(L),typeof we=="function")for(L=we.call(L),Ee=0;!(xe=L.next()).done;)xe=xe.value,we=re+de(xe,Ee++),ge+=k(xe,G,j,we,fe);else if(xe==="object")throw G=String(L),Error("Objects are not valid as a React child (found: "+(G==="[object Object]"?"object with keys {"+Object.keys(L).join(", ")+"}":G)+"). If you meant to render a collection of children, use an array instead.");return ge}function K(L,G,j){if(L==null)return L;var re=[],fe=0;return k(L,re,"","",function(xe){return G.call(j,xe,fe++)}),re}function J(L){if(L._status===-1){var G=L._result;G=G(),G.then(function(j){(L._status===0||L._status===-1)&&(L._status=1,L._result=j)},function(j){(L._status===0||L._status===-1)&&(L._status=2,L._result=j)}),L._status===-1&&(L._status=0,L._result=G)}if(L._status===1)return L._result.default;throw L._result}var Z={current:null},V={transition:null},Q={ReactCurrentDispatcher:Z,ReactCurrentBatchConfig:V,ReactCurrentOwner:I};function z(){throw Error("act(...) is not supported in production builds of React.")}return ft.Children={map:K,forEach:function(L,G,j){K(L,function(){G.apply(this,arguments)},j)},count:function(L){var G=0;return K(L,function(){G++}),G},toArray:function(L){return K(L,function(G){return G})||[]},only:function(L){if(!D(L))throw Error("React.Children.only expected to receive a single React element child.");return L}},ft.Component=y,ft.Fragment=t,ft.Profiler=a,ft.PureComponent=b,ft.StrictMode=s,ft.Suspense=f,ft.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Q,ft.act=z,ft.cloneElement=function(L,G,j){if(L==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+L+".");var re=T({},L.props),fe=L.key,xe=L.ref,ge=L._owner;if(G!=null){if(G.ref!==void 0&&(xe=G.ref,ge=I.current),G.key!==void 0&&(fe=""+G.key),L.type&&L.type.defaultProps)var Ee=L.type.defaultProps;for(we in G)O.call(G,we)&&!U.hasOwnProperty(we)&&(re[we]=G[we]===void 0&&Ee!==void 0?Ee[we]:G[we])}var we=arguments.length-2;if(we===1)re.children=j;else if(1<we){Ee=Array(we);for(var Ce=0;Ce<we;Ce++)Ee[Ce]=arguments[Ce+2];re.children=Ee}return{$$typeof:r,type:L.type,key:fe,ref:xe,props:re,_owner:ge}},ft.createContext=function(L){return L={$$typeof:d,_currentValue:L,_currentValue2:L,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},L.Provider={$$typeof:l,_context:L},L.Consumer=L},ft.createElement=ce,ft.createFactory=function(L){var G=ce.bind(null,L);return G.type=L,G},ft.createRef=function(){return{current:null}},ft.forwardRef=function(L){return{$$typeof:c,render:L}},ft.isValidElement=D,ft.lazy=function(L){return{$$typeof:m,_payload:{_status:-1,_result:L},_init:J}},ft.memo=function(L,G){return{$$typeof:p,type:L,compare:G===void 0?null:G}},ft.startTransition=function(L){var G=V.transition;V.transition={};try{L()}finally{V.transition=G}},ft.unstable_act=z,ft.useCallback=function(L,G){return Z.current.useCallback(L,G)},ft.useContext=function(L){return Z.current.useContext(L)},ft.useDebugValue=function(){},ft.useDeferredValue=function(L){return Z.current.useDeferredValue(L)},ft.useEffect=function(L,G){return Z.current.useEffect(L,G)},ft.useId=function(){return Z.current.useId()},ft.useImperativeHandle=function(L,G,j){return Z.current.useImperativeHandle(L,G,j)},ft.useInsertionEffect=function(L,G){return Z.current.useInsertionEffect(L,G)},ft.useLayoutEffect=function(L,G){return Z.current.useLayoutEffect(L,G)},ft.useMemo=function(L,G){return Z.current.useMemo(L,G)},ft.useReducer=function(L,G,j){return Z.current.useReducer(L,G,j)},ft.useRef=function(L){return Z.current.useRef(L)},ft.useState=function(L){return Z.current.useState(L)},ft.useSyncExternalStore=function(L,G,j){return Z.current.useSyncExternalStore(L,G,j)},ft.useTransition=function(){return Z.current.useTransition()},ft.version="18.3.1",ft}var gp;function Id(){return gp||(gp=1,Nc.exports=Fv()),Nc.exports}var vp;function Ov(){if(vp)return Ho;vp=1;var r=Id(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,a=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function d(c,f,p){var m,g={},_=null,S=null;p!==void 0&&(_=""+p),f.key!==void 0&&(_=""+f.key),f.ref!==void 0&&(S=f.ref);for(m in f)s.call(f,m)&&!l.hasOwnProperty(m)&&(g[m]=f[m]);if(c&&c.defaultProps)for(m in f=c.defaultProps,f)g[m]===void 0&&(g[m]=f[m]);return{$$typeof:e,type:c,key:_,ref:S,props:g,_owner:a.current}}return Ho.Fragment=t,Ho.jsx=d,Ho.jsxs=d,Ho}var _p;function kv(){return _p||(_p=1,Ic.exports=Ov()),Ic.exports}var X=kv(),Me=Id();const sg=rg(Me),Bv=Uv({__proto__:null,default:sg},[Me]);var gl={},Uc={exports:{}},Dn={},Fc={exports:{}},Oc={};var xp;function zv(){return xp||(xp=1,(function(r){function e(V,Q){var z=V.length;V.push(Q);e:for(;0<z;){var L=z-1>>>1,G=V[L];if(0<a(G,Q))V[L]=Q,V[z]=G,z=L;else break e}}function t(V){return V.length===0?null:V[0]}function s(V){if(V.length===0)return null;var Q=V[0],z=V.pop();if(z!==Q){V[0]=z;e:for(var L=0,G=V.length,j=G>>>1;L<j;){var re=2*(L+1)-1,fe=V[re],xe=re+1,ge=V[xe];if(0>a(fe,z))xe<G&&0>a(ge,fe)?(V[L]=ge,V[xe]=z,L=xe):(V[L]=fe,V[re]=z,L=re);else if(xe<G&&0>a(ge,z))V[L]=ge,V[xe]=z,L=xe;else break e}}return Q}function a(V,Q){var z=V.sortIndex-Q.sortIndex;return z!==0?z:V.id-Q.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;r.unstable_now=function(){return l.now()}}else{var d=Date,c=d.now();r.unstable_now=function(){return d.now()-c}}var f=[],p=[],m=1,g=null,_=3,S=!1,T=!1,M=!1,y=typeof setTimeout=="function"?setTimeout:null,x=typeof clearTimeout=="function"?clearTimeout:null,b=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function w(V){for(var Q=t(p);Q!==null;){if(Q.callback===null)s(p);else if(Q.startTime<=V)s(p),Q.sortIndex=Q.expirationTime,e(f,Q);else break;Q=t(p)}}function R(V){if(M=!1,w(V),!T)if(t(f)!==null)T=!0,J(O);else{var Q=t(p);Q!==null&&Z(R,Q.startTime-V)}}function O(V,Q){T=!1,M&&(M=!1,x(ce),ce=-1),S=!0;var z=_;try{for(w(Q),g=t(f);g!==null&&(!(g.expirationTime>Q)||V&&!Y());){var L=g.callback;if(typeof L=="function"){g.callback=null,_=g.priorityLevel;var G=L(g.expirationTime<=Q);Q=r.unstable_now(),typeof G=="function"?g.callback=G:g===t(f)&&s(f),w(Q)}else s(f);g=t(f)}if(g!==null)var j=!0;else{var re=t(p);re!==null&&Z(R,re.startTime-Q),j=!1}return j}finally{g=null,_=z,S=!1}}var I=!1,U=null,ce=-1,C=5,D=-1;function Y(){return!(r.unstable_now()-D<C)}function te(){if(U!==null){var V=r.unstable_now();D=V;var Q=!0;try{Q=U(!0,V)}finally{Q?de():(I=!1,U=null)}}else I=!1}var de;if(typeof b=="function")de=function(){b(te)};else if(typeof MessageChannel<"u"){var k=new MessageChannel,K=k.port2;k.port1.onmessage=te,de=function(){K.postMessage(null)}}else de=function(){y(te,0)};function J(V){U=V,I||(I=!0,de())}function Z(V,Q){ce=y(function(){V(r.unstable_now())},Q)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(V){V.callback=null},r.unstable_continueExecution=function(){T||S||(T=!0,J(O))},r.unstable_forceFrameRate=function(V){0>V||125<V?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):C=0<V?Math.floor(1e3/V):5},r.unstable_getCurrentPriorityLevel=function(){return _},r.unstable_getFirstCallbackNode=function(){return t(f)},r.unstable_next=function(V){switch(_){case 1:case 2:case 3:var Q=3;break;default:Q=_}var z=_;_=Q;try{return V()}finally{_=z}},r.unstable_pauseExecution=function(){},r.unstable_requestPaint=function(){},r.unstable_runWithPriority=function(V,Q){switch(V){case 1:case 2:case 3:case 4:case 5:break;default:V=3}var z=_;_=V;try{return Q()}finally{_=z}},r.unstable_scheduleCallback=function(V,Q,z){var L=r.unstable_now();switch(typeof z=="object"&&z!==null?(z=z.delay,z=typeof z=="number"&&0<z?L+z:L):z=L,V){case 1:var G=-1;break;case 2:G=250;break;case 5:G=1073741823;break;case 4:G=1e4;break;default:G=5e3}return G=z+G,V={id:m++,callback:Q,priorityLevel:V,startTime:z,expirationTime:G,sortIndex:-1},z>L?(V.sortIndex=z,e(p,V),t(f)===null&&V===t(p)&&(M?(x(ce),ce=-1):M=!0,Z(R,z-L))):(V.sortIndex=G,e(f,V),T||S||(T=!0,J(O))),V},r.unstable_shouldYield=Y,r.unstable_wrapCallback=function(V){var Q=_;return function(){var z=_;_=Q;try{return V.apply(this,arguments)}finally{_=z}}}})(Oc)),Oc}var yp;function Hv(){return yp||(yp=1,Fc.exports=zv()),Fc.exports}var Sp;function Gv(){if(Sp)return Dn;Sp=1;var r=Id(),e=Hv();function t(n){for(var i="https://reactjs.org/docs/error-decoder.html?invariant="+n,o=1;o<arguments.length;o++)i+="&args[]="+encodeURIComponent(arguments[o]);return"Minified React error #"+n+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var s=new Set,a={};function l(n,i){d(n,i),d(n+"Capture",i)}function d(n,i){for(a[n]=i,n=0;n<i.length;n++)s.add(i[n])}var c=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),f=Object.prototype.hasOwnProperty,p=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,m={},g={};function _(n){return f.call(g,n)?!0:f.call(m,n)?!1:p.test(n)?g[n]=!0:(m[n]=!0,!1)}function S(n,i,o,u){if(o!==null&&o.type===0)return!1;switch(typeof i){case"function":case"symbol":return!0;case"boolean":return u?!1:o!==null?!o.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function T(n,i,o,u){if(i===null||typeof i>"u"||S(n,i,o,u))return!0;if(u)return!1;if(o!==null)switch(o.type){case 3:return!i;case 4:return i===!1;case 5:return isNaN(i);case 6:return isNaN(i)||1>i}return!1}function M(n,i,o,u,h,v,E){this.acceptsBooleans=i===2||i===3||i===4,this.attributeName=u,this.attributeNamespace=h,this.mustUseProperty=o,this.propertyName=n,this.type=i,this.sanitizeURL=v,this.removeEmptyString=E}var y={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){y[n]=new M(n,0,!1,n,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var i=n[0];y[i]=new M(i,1,!1,n[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(n){y[n]=new M(n,2,!1,n.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){y[n]=new M(n,2,!1,n,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){y[n]=new M(n,3,!1,n.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(n){y[n]=new M(n,3,!0,n,null,!1,!1)}),["capture","download"].forEach(function(n){y[n]=new M(n,4,!1,n,null,!1,!1)}),["cols","rows","size","span"].forEach(function(n){y[n]=new M(n,6,!1,n,null,!1,!1)}),["rowSpan","start"].forEach(function(n){y[n]=new M(n,5,!1,n.toLowerCase(),null,!1,!1)});var x=/[\-:]([a-z])/g;function b(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var i=n.replace(x,b);y[i]=new M(i,1,!1,n,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var i=n.replace(x,b);y[i]=new M(i,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(n){var i=n.replace(x,b);y[i]=new M(i,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(n){y[n]=new M(n,1,!1,n.toLowerCase(),null,!1,!1)}),y.xlinkHref=new M("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(n){y[n]=new M(n,1,!1,n.toLowerCase(),null,!0,!0)});function w(n,i,o,u){var h=y.hasOwnProperty(i)?y[i]:null;(h!==null?h.type!==0:u||!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(T(i,o,h,u)&&(o=null),u||h===null?_(i)&&(o===null?n.removeAttribute(i):n.setAttribute(i,""+o)):h.mustUseProperty?n[h.propertyName]=o===null?h.type===3?!1:"":o:(i=h.attributeName,u=h.attributeNamespace,o===null?n.removeAttribute(i):(h=h.type,o=h===3||h===4&&o===!0?"":""+o,u?n.setAttributeNS(u,i,o):n.setAttribute(i,o))))}var R=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,O=Symbol.for("react.element"),I=Symbol.for("react.portal"),U=Symbol.for("react.fragment"),ce=Symbol.for("react.strict_mode"),C=Symbol.for("react.profiler"),D=Symbol.for("react.provider"),Y=Symbol.for("react.context"),te=Symbol.for("react.forward_ref"),de=Symbol.for("react.suspense"),k=Symbol.for("react.suspense_list"),K=Symbol.for("react.memo"),J=Symbol.for("react.lazy"),Z=Symbol.for("react.offscreen"),V=Symbol.iterator;function Q(n){return n===null||typeof n!="object"?null:(n=V&&n[V]||n["@@iterator"],typeof n=="function"?n:null)}var z=Object.assign,L;function G(n){if(L===void 0)try{throw Error()}catch(o){var i=o.stack.trim().match(/\n( *(at )?)/);L=i&&i[1]||""}return`
`+L+n}var j=!1;function re(n,i){if(!n||j)return"";j=!0;var o=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(i)if(i=function(){throw Error()},Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(ie){var u=ie}Reflect.construct(n,[],i)}else{try{i.call()}catch(ie){u=ie}n.call(i.prototype)}else{try{throw Error()}catch(ie){u=ie}n()}}catch(ie){if(ie&&u&&typeof ie.stack=="string"){for(var h=ie.stack.split(`
`),v=u.stack.split(`
`),E=h.length-1,F=v.length-1;1<=E&&0<=F&&h[E]!==v[F];)F--;for(;1<=E&&0<=F;E--,F--)if(h[E]!==v[F]){if(E!==1||F!==1)do if(E--,F--,0>F||h[E]!==v[F]){var B=`
`+h[E].replace(" at new "," at ");return n.displayName&&B.includes("<anonymous>")&&(B=B.replace("<anonymous>",n.displayName)),B}while(1<=E&&0<=F);break}}}finally{j=!1,Error.prepareStackTrace=o}return(n=n?n.displayName||n.name:"")?G(n):""}function fe(n){switch(n.tag){case 5:return G(n.type);case 16:return G("Lazy");case 13:return G("Suspense");case 19:return G("SuspenseList");case 0:case 2:case 15:return n=re(n.type,!1),n;case 11:return n=re(n.type.render,!1),n;case 1:return n=re(n.type,!0),n;default:return""}}function xe(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case U:return"Fragment";case I:return"Portal";case C:return"Profiler";case ce:return"StrictMode";case de:return"Suspense";case k:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case Y:return(n.displayName||"Context")+".Consumer";case D:return(n._context.displayName||"Context")+".Provider";case te:var i=n.render;return n=n.displayName,n||(n=i.displayName||i.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case K:return i=n.displayName||null,i!==null?i:xe(n.type)||"Memo";case J:i=n._payload,n=n._init;try{return xe(n(i))}catch{}}return null}function ge(n){var i=n.type;switch(n.tag){case 24:return"Cache";case 9:return(i.displayName||"Context")+".Consumer";case 10:return(i._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=i.render,n=n.displayName||n.name||"",i.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return xe(i);case 8:return i===ce?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof i=="function")return i.displayName||i.name||null;if(typeof i=="string")return i}return null}function Ee(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function we(n){var i=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Ce(n){var i=we(n)?"checked":"value",o=Object.getOwnPropertyDescriptor(n.constructor.prototype,i),u=""+n[i];if(!n.hasOwnProperty(i)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var h=o.get,v=o.set;return Object.defineProperty(n,i,{configurable:!0,get:function(){return h.call(this)},set:function(E){u=""+E,v.call(this,E)}}),Object.defineProperty(n,i,{enumerable:o.enumerable}),{getValue:function(){return u},setValue:function(E){u=""+E},stopTracking:function(){n._valueTracker=null,delete n[i]}}}}function at(n){n._valueTracker||(n._valueTracker=Ce(n))}function se(n){if(!n)return!1;var i=n._valueTracker;if(!i)return!0;var o=i.getValue(),u="";return n&&(u=we(n)?n.checked?"true":"false":n.value),n=u,n!==o?(i.setValue(n),!0):!1}function Vt(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function je(n,i){var o=i.checked;return z({},i,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:o??n._wrapperState.initialChecked})}function tt(n,i){var o=i.defaultValue==null?"":i.defaultValue,u=i.checked!=null?i.checked:i.defaultChecked;o=Ee(i.value!=null?i.value:o),n._wrapperState={initialChecked:u,initialValue:o,controlled:i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null}}function He(n,i){i=i.checked,i!=null&&w(n,"checked",i,!1)}function At(n,i){He(n,i);var o=Ee(i.value),u=i.type;if(o!=null)u==="number"?(o===0&&n.value===""||n.value!=o)&&(n.value=""+o):n.value!==""+o&&(n.value=""+o);else if(u==="submit"||u==="reset"){n.removeAttribute("value");return}i.hasOwnProperty("value")?N(n,i.type,o):i.hasOwnProperty("defaultValue")&&N(n,i.type,Ee(i.defaultValue)),i.checked==null&&i.defaultChecked!=null&&(n.defaultChecked=!!i.defaultChecked)}function rt(n,i,o){if(i.hasOwnProperty("value")||i.hasOwnProperty("defaultValue")){var u=i.type;if(!(u!=="submit"&&u!=="reset"||i.value!==void 0&&i.value!==null))return;i=""+n._wrapperState.initialValue,o||i===n.value||(n.value=i),n.defaultValue=i}o=n.name,o!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,o!==""&&(n.name=o)}function N(n,i,o){(i!=="number"||Vt(n.ownerDocument)!==n)&&(o==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+o&&(n.defaultValue=""+o))}var A=Array.isArray;function ne(n,i,o,u){if(n=n.options,i){i={};for(var h=0;h<o.length;h++)i["$"+o[h]]=!0;for(o=0;o<n.length;o++)h=i.hasOwnProperty("$"+n[o].value),n[o].selected!==h&&(n[o].selected=h),h&&u&&(n[o].defaultSelected=!0)}else{for(o=""+Ee(o),i=null,h=0;h<n.length;h++){if(n[h].value===o){n[h].selected=!0,u&&(n[h].defaultSelected=!0);return}i!==null||n[h].disabled||(i=n[h])}i!==null&&(i.selected=!0)}}function ye(n,i){if(i.dangerouslySetInnerHTML!=null)throw Error(t(91));return z({},i,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function ve(n,i){var o=i.value;if(o==null){if(o=i.children,i=i.defaultValue,o!=null){if(i!=null)throw Error(t(92));if(A(o)){if(1<o.length)throw Error(t(93));o=o[0]}i=o}i==null&&(i=""),o=i}n._wrapperState={initialValue:Ee(o)}}function Se(n,i){var o=Ee(i.value),u=Ee(i.defaultValue);o!=null&&(o=""+o,o!==n.value&&(n.value=o),i.defaultValue==null&&n.defaultValue!==o&&(n.defaultValue=o)),u!=null&&(n.defaultValue=""+u)}function Ge(n){var i=n.textContent;i===n._wrapperState.initialValue&&i!==""&&i!==null&&(n.value=i)}function Le(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Fe(n,i){return n==null||n==="http://www.w3.org/1999/xhtml"?Le(i):n==="http://www.w3.org/2000/svg"&&i==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var Xe,st=(function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(i,o,u,h){MSApp.execUnsafeLocalFunction(function(){return n(i,o,u,h)})}:n})(function(n,i){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=i;else{for(Xe=Xe||document.createElement("div"),Xe.innerHTML="<svg>"+i.valueOf().toString()+"</svg>",i=Xe.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;i.firstChild;)n.appendChild(i.firstChild)}});function me(n,i){if(i){var o=n.firstChild;if(o&&o===n.lastChild&&o.nodeType===3){o.nodeValue=i;return}}n.textContent=i}var pt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},dt=["Webkit","ms","Moz","O"];Object.keys(pt).forEach(function(n){dt.forEach(function(i){i=i+n.charAt(0).toUpperCase()+n.substring(1),pt[i]=pt[n]})});function Je(n,i,o){return i==null||typeof i=="boolean"||i===""?"":o||typeof i!="number"||i===0||pt.hasOwnProperty(n)&&pt[n]?(""+i).trim():i+"px"}function We(n,i){n=n.style;for(var o in i)if(i.hasOwnProperty(o)){var u=o.indexOf("--")===0,h=Je(o,i[o],u);o==="float"&&(o="cssFloat"),u?n.setProperty(o,h):n[o]=h}}var ke=z({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function nt(n,i){if(i){if(ke[n]&&(i.children!=null||i.dangerouslySetInnerHTML!=null))throw Error(t(137,n));if(i.dangerouslySetInnerHTML!=null){if(i.children!=null)throw Error(t(60));if(typeof i.dangerouslySetInnerHTML!="object"||!("__html"in i.dangerouslySetInnerHTML))throw Error(t(61))}if(i.style!=null&&typeof i.style!="object")throw Error(t(62))}}function gt(n,i){if(n.indexOf("-")===-1)return typeof i.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ct=null;function ot(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var Ae=null,H=null,Re=null;function Pe(n){if(n=Ao(n)){if(typeof Ae!="function")throw Error(t(280));var i=n.stateNode;i&&(i=La(i),Ae(n.stateNode,n.type,i))}}function Ze(n){H?Re?Re.push(n):Re=[n]:H=n}function Ye(){if(H){var n=H,i=Re;if(Re=H=null,Pe(n),i)for(n=0;n<i.length;n++)Pe(i[n])}}function Mt(n,i){return n(i)}function Et(){}var Ot=!1;function Jt(n,i,o){if(Ot)return n(i,o);Ot=!0;try{return Mt(n,i,o)}finally{Ot=!1,(H!==null||Re!==null)&&(Et(),Ye())}}function _t(n,i){var o=n.stateNode;if(o===null)return null;var u=La(o);if(u===null)return null;o=u[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(u=!u.disabled)||(n=n.type,u=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!u;break e;default:n=!1}if(n)return null;if(o&&typeof o!="function")throw Error(t(231,i,typeof o));return o}var Yt=!1;if(c)try{var cn={};Object.defineProperty(cn,"passive",{get:function(){Yt=!0}}),window.addEventListener("test",cn,cn),window.removeEventListener("test",cn,cn)}catch{Yt=!1}function ca(n,i,o,u,h,v,E,F,B){var ie=Array.prototype.slice.call(arguments,3);try{i.apply(o,ie)}catch(pe){this.onError(pe)}}var Lr=!1,Ti=null,Dr=!1,qi=null,da={onError:function(n){Lr=!0,Ti=n}};function fa(n,i,o,u,h,v,E,F,B){Lr=!1,Ti=null,ca.apply(da,arguments)}function tu(n,i,o,u,h,v,E,F,B){if(fa.apply(this,arguments),Lr){if(Lr){var ie=Ti;Lr=!1,Ti=null}else throw Error(t(198));Dr||(Dr=!0,qi=ie)}}function wi(n){var i=n,o=n;if(n.alternate)for(;i.return;)i=i.return;else{n=i;do i=n,(i.flags&4098)!==0&&(o=i.return),n=i.return;while(n)}return i.tag===3?o:null}function ha(n){if(n.tag===13){var i=n.memoizedState;if(i===null&&(n=n.alternate,n!==null&&(i=n.memoizedState)),i!==null)return i.dehydrated}return null}function P(n){if(wi(n)!==n)throw Error(t(188))}function $(n){var i=n.alternate;if(!i){if(i=wi(n),i===null)throw Error(t(188));return i!==n?null:n}for(var o=n,u=i;;){var h=o.return;if(h===null)break;var v=h.alternate;if(v===null){if(u=h.return,u!==null){o=u;continue}break}if(h.child===v.child){for(v=h.child;v;){if(v===o)return P(h),n;if(v===u)return P(h),i;v=v.sibling}throw Error(t(188))}if(o.return!==u.return)o=h,u=v;else{for(var E=!1,F=h.child;F;){if(F===o){E=!0,o=h,u=v;break}if(F===u){E=!0,u=h,o=v;break}F=F.sibling}if(!E){for(F=v.child;F;){if(F===o){E=!0,o=v,u=h;break}if(F===u){E=!0,u=v,o=h;break}F=F.sibling}if(!E)throw Error(t(189))}}if(o.alternate!==u)throw Error(t(190))}if(o.tag!==3)throw Error(t(188));return o.stateNode.current===o?n:i}function ae(n){return n=$(n),n!==null?ue(n):null}function ue(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var i=ue(n);if(i!==null)return i;n=n.sibling}return null}var oe=e.unstable_scheduleCallback,De=e.unstable_cancelCallback,Ve=e.unstable_shouldYield,Ke=e.unstable_requestPaint,Ne=e.unstable_now,lt=e.unstable_getCurrentPriorityLevel,et=e.unstable_ImmediatePriority,it=e.unstable_UserBlockingPriority,Rt=e.unstable_NormalPriority,xn=e.unstable_LowPriority,zt=e.unstable_IdlePriority,wn=null,mt=null;function ut(n){if(mt&&typeof mt.onCommitFiberRoot=="function")try{mt.onCommitFiberRoot(wn,n,void 0,(n.current.flags&128)===128)}catch{}}var yn=Math.clz32?Math.clz32:pa,It=Math.log,Ai=Math.LN2;function pa(n){return n>>>=0,n===0?32:31-(It(n)/Ai|0)|0}var gi=64,$i=4194304;function kt(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function jn(n,i){var o=n.pendingLanes;if(o===0)return 0;var u=0,h=n.suspendedLanes,v=n.pingedLanes,E=o&268435455;if(E!==0){var F=E&~h;F!==0?u=kt(F):(v&=E,v!==0&&(u=kt(v)))}else E=o&~h,E!==0?u=kt(E):v!==0&&(u=kt(v));if(u===0)return 0;if(i!==0&&i!==u&&(i&h)===0&&(h=u&-u,v=i&-i,h>=v||h===16&&(v&4194240)!==0))return i;if((u&4)!==0&&(u|=o&16),i=n.entangledLanes,i!==0)for(n=n.entanglements,i&=u;0<i;)o=31-yn(i),h=1<<o,u|=n[o],i&=~h;return u}function ao(n,i){switch(n){case 1:case 2:case 4:return i+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function An(n,i){for(var o=n.suspendedLanes,u=n.pingedLanes,h=n.expirationTimes,v=n.pendingLanes;0<v;){var E=31-yn(v),F=1<<E,B=h[E];B===-1?((F&o)===0||(F&u)!==0)&&(h[E]=ao(F,i)):B<=i&&(n.expiredLanes|=F),v&=~F}}function Ir(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function ma(){var n=gi;return gi<<=1,(gi&4194240)===0&&(gi=64),n}function as(n){for(var i=[],o=0;31>o;o++)i.push(n);return i}function lo(n,i,o){n.pendingLanes|=i,i!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,i=31-yn(i),n[i]=o}function n0(n,i){var o=n.pendingLanes&~i;n.pendingLanes=i,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=i,n.mutableReadLanes&=i,n.entangledLanes&=i,i=n.entanglements;var u=n.eventTimes;for(n=n.expirationTimes;0<o;){var h=31-yn(o),v=1<<h;i[h]=0,u[h]=-1,n[h]=-1,o&=~v}}function nu(n,i){var o=n.entangledLanes|=i;for(n=n.entanglements;o;){var u=31-yn(o),h=1<<u;h&i|n[u]&i&&(n[u]|=i),o&=~h}}var Tt=0;function Xd(n){return n&=-n,1<n?4<n?(n&268435455)!==0?16:536870912:4:1}var Yd,iu,qd,$d,Kd,ru=!1,ga=[],Ki=null,Zi=null,Qi=null,uo=new Map,co=new Map,Ji=[],i0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Zd(n,i){switch(n){case"focusin":case"focusout":Ki=null;break;case"dragenter":case"dragleave":Zi=null;break;case"mouseover":case"mouseout":Qi=null;break;case"pointerover":case"pointerout":uo.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":co.delete(i.pointerId)}}function fo(n,i,o,u,h,v){return n===null||n.nativeEvent!==v?(n={blockedOn:i,domEventName:o,eventSystemFlags:u,nativeEvent:v,targetContainers:[h]},i!==null&&(i=Ao(i),i!==null&&iu(i)),n):(n.eventSystemFlags|=u,i=n.targetContainers,h!==null&&i.indexOf(h)===-1&&i.push(h),n)}function r0(n,i,o,u,h){switch(i){case"focusin":return Ki=fo(Ki,n,i,o,u,h),!0;case"dragenter":return Zi=fo(Zi,n,i,o,u,h),!0;case"mouseover":return Qi=fo(Qi,n,i,o,u,h),!0;case"pointerover":var v=h.pointerId;return uo.set(v,fo(uo.get(v)||null,n,i,o,u,h)),!0;case"gotpointercapture":return v=h.pointerId,co.set(v,fo(co.get(v)||null,n,i,o,u,h)),!0}return!1}function Qd(n){var i=Nr(n.target);if(i!==null){var o=wi(i);if(o!==null){if(i=o.tag,i===13){if(i=ha(o),i!==null){n.blockedOn=i,Kd(n.priority,function(){qd(o)});return}}else if(i===3&&o.stateNode.current.memoizedState.isDehydrated){n.blockedOn=o.tag===3?o.stateNode.containerInfo:null;return}}}n.blockedOn=null}function va(n){if(n.blockedOn!==null)return!1;for(var i=n.targetContainers;0<i.length;){var o=ou(n.domEventName,n.eventSystemFlags,i[0],n.nativeEvent);if(o===null){o=n.nativeEvent;var u=new o.constructor(o.type,o);Ct=u,o.target.dispatchEvent(u),Ct=null}else return i=Ao(o),i!==null&&iu(i),n.blockedOn=o,!1;i.shift()}return!0}function Jd(n,i,o){va(n)&&o.delete(i)}function s0(){ru=!1,Ki!==null&&va(Ki)&&(Ki=null),Zi!==null&&va(Zi)&&(Zi=null),Qi!==null&&va(Qi)&&(Qi=null),uo.forEach(Jd),co.forEach(Jd)}function ho(n,i){n.blockedOn===i&&(n.blockedOn=null,ru||(ru=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,s0)))}function po(n){function i(h){return ho(h,n)}if(0<ga.length){ho(ga[0],n);for(var o=1;o<ga.length;o++){var u=ga[o];u.blockedOn===n&&(u.blockedOn=null)}}for(Ki!==null&&ho(Ki,n),Zi!==null&&ho(Zi,n),Qi!==null&&ho(Qi,n),uo.forEach(i),co.forEach(i),o=0;o<Ji.length;o++)u=Ji[o],u.blockedOn===n&&(u.blockedOn=null);for(;0<Ji.length&&(o=Ji[0],o.blockedOn===null);)Qd(o),o.blockedOn===null&&Ji.shift()}var ls=R.ReactCurrentBatchConfig,_a=!0;function o0(n,i,o,u){var h=Tt,v=ls.transition;ls.transition=null;try{Tt=1,su(n,i,o,u)}finally{Tt=h,ls.transition=v}}function a0(n,i,o,u){var h=Tt,v=ls.transition;ls.transition=null;try{Tt=4,su(n,i,o,u)}finally{Tt=h,ls.transition=v}}function su(n,i,o,u){if(_a){var h=ou(n,i,o,u);if(h===null)Eu(n,i,u,xa,o),Zd(n,u);else if(r0(h,n,i,o,u))u.stopPropagation();else if(Zd(n,u),i&4&&-1<i0.indexOf(n)){for(;h!==null;){var v=Ao(h);if(v!==null&&Yd(v),v=ou(n,i,o,u),v===null&&Eu(n,i,u,xa,o),v===h)break;h=v}h!==null&&u.stopPropagation()}else Eu(n,i,u,null,o)}}var xa=null;function ou(n,i,o,u){if(xa=null,n=ot(u),n=Nr(n),n!==null)if(i=wi(n),i===null)n=null;else if(o=i.tag,o===13){if(n=ha(i),n!==null)return n;n=null}else if(o===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;n=null}else i!==n&&(n=null);return xa=n,null}function ef(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(lt()){case et:return 1;case it:return 4;case Rt:case xn:return 16;case zt:return 536870912;default:return 16}default:return 16}}var er=null,au=null,ya=null;function tf(){if(ya)return ya;var n,i=au,o=i.length,u,h="value"in er?er.value:er.textContent,v=h.length;for(n=0;n<o&&i[n]===h[n];n++);var E=o-n;for(u=1;u<=E&&i[o-u]===h[v-u];u++);return ya=h.slice(n,1<u?1-u:void 0)}function Sa(n){var i=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&i===13&&(n=13)):n=i,n===10&&(n=13),32<=n||n===13?n:0}function Ma(){return!0}function nf(){return!1}function Bn(n){function i(o,u,h,v,E){this._reactName=o,this._targetInst=h,this.type=u,this.nativeEvent=v,this.target=E,this.currentTarget=null;for(var F in n)n.hasOwnProperty(F)&&(o=n[F],this[F]=o?o(v):v[F]);return this.isDefaultPrevented=(v.defaultPrevented!=null?v.defaultPrevented:v.returnValue===!1)?Ma:nf,this.isPropagationStopped=nf,this}return z(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var o=this.nativeEvent;o&&(o.preventDefault?o.preventDefault():typeof o.returnValue!="unknown"&&(o.returnValue=!1),this.isDefaultPrevented=Ma)},stopPropagation:function(){var o=this.nativeEvent;o&&(o.stopPropagation?o.stopPropagation():typeof o.cancelBubble!="unknown"&&(o.cancelBubble=!0),this.isPropagationStopped=Ma)},persist:function(){},isPersistent:Ma}),i}var us={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},lu=Bn(us),mo=z({},us,{view:0,detail:0}),l0=Bn(mo),uu,cu,go,Ea=z({},mo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:fu,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==go&&(go&&n.type==="mousemove"?(uu=n.screenX-go.screenX,cu=n.screenY-go.screenY):cu=uu=0,go=n),uu)},movementY:function(n){return"movementY"in n?n.movementY:cu}}),rf=Bn(Ea),u0=z({},Ea,{dataTransfer:0}),c0=Bn(u0),d0=z({},mo,{relatedTarget:0}),du=Bn(d0),f0=z({},us,{animationName:0,elapsedTime:0,pseudoElement:0}),h0=Bn(f0),p0=z({},us,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),m0=Bn(p0),g0=z({},us,{data:0}),sf=Bn(g0),v0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},_0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},x0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function y0(n){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(n):(n=x0[n])?!!i[n]:!1}function fu(){return y0}var S0=z({},mo,{key:function(n){if(n.key){var i=v0[n.key]||n.key;if(i!=="Unidentified")return i}return n.type==="keypress"?(n=Sa(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?_0[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:fu,charCode:function(n){return n.type==="keypress"?Sa(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?Sa(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),M0=Bn(S0),E0=z({},Ea,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),of=Bn(E0),T0=z({},mo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:fu}),w0=Bn(T0),A0=z({},us,{propertyName:0,elapsedTime:0,pseudoElement:0}),C0=Bn(A0),R0=z({},Ea,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),b0=Bn(R0),P0=[9,13,27,32],hu=c&&"CompositionEvent"in window,vo=null;c&&"documentMode"in document&&(vo=document.documentMode);var L0=c&&"TextEvent"in window&&!vo,af=c&&(!hu||vo&&8<vo&&11>=vo),lf=" ",uf=!1;function cf(n,i){switch(n){case"keyup":return P0.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function df(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var cs=!1;function D0(n,i){switch(n){case"compositionend":return df(i);case"keypress":return i.which!==32?null:(uf=!0,lf);case"textInput":return n=i.data,n===lf&&uf?null:n;default:return null}}function I0(n,i){if(cs)return n==="compositionend"||!hu&&cf(n,i)?(n=tf(),ya=au=er=null,cs=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return af&&i.locale!=="ko"?null:i.data;default:return null}}var N0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ff(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i==="input"?!!N0[n.type]:i==="textarea"}function hf(n,i,o,u){Ze(u),i=Ra(i,"onChange"),0<i.length&&(o=new lu("onChange","change",null,o,u),n.push({event:o,listeners:i}))}var _o=null,xo=null;function U0(n){Lf(n,0)}function Ta(n){var i=ms(n);if(se(i))return n}function F0(n,i){if(n==="change")return i}var pf=!1;if(c){var pu;if(c){var mu="oninput"in document;if(!mu){var mf=document.createElement("div");mf.setAttribute("oninput","return;"),mu=typeof mf.oninput=="function"}pu=mu}else pu=!1;pf=pu&&(!document.documentMode||9<document.documentMode)}function gf(){_o&&(_o.detachEvent("onpropertychange",vf),xo=_o=null)}function vf(n){if(n.propertyName==="value"&&Ta(xo)){var i=[];hf(i,xo,n,ot(n)),Jt(U0,i)}}function O0(n,i,o){n==="focusin"?(gf(),_o=i,xo=o,_o.attachEvent("onpropertychange",vf)):n==="focusout"&&gf()}function k0(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return Ta(xo)}function B0(n,i){if(n==="click")return Ta(i)}function z0(n,i){if(n==="input"||n==="change")return Ta(i)}function H0(n,i){return n===i&&(n!==0||1/n===1/i)||n!==n&&i!==i}var ii=typeof Object.is=="function"?Object.is:H0;function yo(n,i){if(ii(n,i))return!0;if(typeof n!="object"||n===null||typeof i!="object"||i===null)return!1;var o=Object.keys(n),u=Object.keys(i);if(o.length!==u.length)return!1;for(u=0;u<o.length;u++){var h=o[u];if(!f.call(i,h)||!ii(n[h],i[h]))return!1}return!0}function _f(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function xf(n,i){var o=_f(n);n=0;for(var u;o;){if(o.nodeType===3){if(u=n+o.textContent.length,n<=i&&u>=i)return{node:o,offset:i-n};n=u}e:{for(;o;){if(o.nextSibling){o=o.nextSibling;break e}o=o.parentNode}o=void 0}o=_f(o)}}function yf(n,i){return n&&i?n===i?!0:n&&n.nodeType===3?!1:i&&i.nodeType===3?yf(n,i.parentNode):"contains"in n?n.contains(i):n.compareDocumentPosition?!!(n.compareDocumentPosition(i)&16):!1:!1}function Sf(){for(var n=window,i=Vt();i instanceof n.HTMLIFrameElement;){try{var o=typeof i.contentWindow.location.href=="string"}catch{o=!1}if(o)n=i.contentWindow;else break;i=Vt(n.document)}return i}function gu(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i&&(i==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||i==="textarea"||n.contentEditable==="true")}function G0(n){var i=Sf(),o=n.focusedElem,u=n.selectionRange;if(i!==o&&o&&o.ownerDocument&&yf(o.ownerDocument.documentElement,o)){if(u!==null&&gu(o)){if(i=u.start,n=u.end,n===void 0&&(n=i),"selectionStart"in o)o.selectionStart=i,o.selectionEnd=Math.min(n,o.value.length);else if(n=(i=o.ownerDocument||document)&&i.defaultView||window,n.getSelection){n=n.getSelection();var h=o.textContent.length,v=Math.min(u.start,h);u=u.end===void 0?v:Math.min(u.end,h),!n.extend&&v>u&&(h=u,u=v,v=h),h=xf(o,v);var E=xf(o,u);h&&E&&(n.rangeCount!==1||n.anchorNode!==h.node||n.anchorOffset!==h.offset||n.focusNode!==E.node||n.focusOffset!==E.offset)&&(i=i.createRange(),i.setStart(h.node,h.offset),n.removeAllRanges(),v>u?(n.addRange(i),n.extend(E.node,E.offset)):(i.setEnd(E.node,E.offset),n.addRange(i)))}}for(i=[],n=o;n=n.parentNode;)n.nodeType===1&&i.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<i.length;o++)n=i[o],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var V0=c&&"documentMode"in document&&11>=document.documentMode,ds=null,vu=null,So=null,_u=!1;function Mf(n,i,o){var u=o.window===o?o.document:o.nodeType===9?o:o.ownerDocument;_u||ds==null||ds!==Vt(u)||(u=ds,"selectionStart"in u&&gu(u)?u={start:u.selectionStart,end:u.selectionEnd}:(u=(u.ownerDocument&&u.ownerDocument.defaultView||window).getSelection(),u={anchorNode:u.anchorNode,anchorOffset:u.anchorOffset,focusNode:u.focusNode,focusOffset:u.focusOffset}),So&&yo(So,u)||(So=u,u=Ra(vu,"onSelect"),0<u.length&&(i=new lu("onSelect","select",null,i,o),n.push({event:i,listeners:u}),i.target=ds)))}function wa(n,i){var o={};return o[n.toLowerCase()]=i.toLowerCase(),o["Webkit"+n]="webkit"+i,o["Moz"+n]="moz"+i,o}var fs={animationend:wa("Animation","AnimationEnd"),animationiteration:wa("Animation","AnimationIteration"),animationstart:wa("Animation","AnimationStart"),transitionend:wa("Transition","TransitionEnd")},xu={},Ef={};c&&(Ef=document.createElement("div").style,"AnimationEvent"in window||(delete fs.animationend.animation,delete fs.animationiteration.animation,delete fs.animationstart.animation),"TransitionEvent"in window||delete fs.transitionend.transition);function Aa(n){if(xu[n])return xu[n];if(!fs[n])return n;var i=fs[n],o;for(o in i)if(i.hasOwnProperty(o)&&o in Ef)return xu[n]=i[o];return n}var Tf=Aa("animationend"),wf=Aa("animationiteration"),Af=Aa("animationstart"),Cf=Aa("transitionend"),Rf=new Map,bf="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function tr(n,i){Rf.set(n,i),l(i,[n])}for(var yu=0;yu<bf.length;yu++){var Su=bf[yu],W0=Su.toLowerCase(),j0=Su[0].toUpperCase()+Su.slice(1);tr(W0,"on"+j0)}tr(Tf,"onAnimationEnd"),tr(wf,"onAnimationIteration"),tr(Af,"onAnimationStart"),tr("dblclick","onDoubleClick"),tr("focusin","onFocus"),tr("focusout","onBlur"),tr(Cf,"onTransitionEnd"),d("onMouseEnter",["mouseout","mouseover"]),d("onMouseLeave",["mouseout","mouseover"]),d("onPointerEnter",["pointerout","pointerover"]),d("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Mo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),X0=new Set("cancel close invalid load scroll toggle".split(" ").concat(Mo));function Pf(n,i,o){var u=n.type||"unknown-event";n.currentTarget=o,tu(u,i,void 0,n),n.currentTarget=null}function Lf(n,i){i=(i&4)!==0;for(var o=0;o<n.length;o++){var u=n[o],h=u.event;u=u.listeners;e:{var v=void 0;if(i)for(var E=u.length-1;0<=E;E--){var F=u[E],B=F.instance,ie=F.currentTarget;if(F=F.listener,B!==v&&h.isPropagationStopped())break e;Pf(h,F,ie),v=B}else for(E=0;E<u.length;E++){if(F=u[E],B=F.instance,ie=F.currentTarget,F=F.listener,B!==v&&h.isPropagationStopped())break e;Pf(h,F,ie),v=B}}}if(Dr)throw n=qi,Dr=!1,qi=null,n}function Pt(n,i){var o=i[bu];o===void 0&&(o=i[bu]=new Set);var u=n+"__bubble";o.has(u)||(Df(i,n,2,!1),o.add(u))}function Mu(n,i,o){var u=0;i&&(u|=4),Df(o,n,u,i)}var Ca="_reactListening"+Math.random().toString(36).slice(2);function Eo(n){if(!n[Ca]){n[Ca]=!0,s.forEach(function(o){o!=="selectionchange"&&(X0.has(o)||Mu(o,!1,n),Mu(o,!0,n))});var i=n.nodeType===9?n:n.ownerDocument;i===null||i[Ca]||(i[Ca]=!0,Mu("selectionchange",!1,i))}}function Df(n,i,o,u){switch(ef(i)){case 1:var h=o0;break;case 4:h=a0;break;default:h=su}o=h.bind(null,i,o,n),h=void 0,!Yt||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(h=!0),u?h!==void 0?n.addEventListener(i,o,{capture:!0,passive:h}):n.addEventListener(i,o,!0):h!==void 0?n.addEventListener(i,o,{passive:h}):n.addEventListener(i,o,!1)}function Eu(n,i,o,u,h){var v=u;if((i&1)===0&&(i&2)===0&&u!==null)e:for(;;){if(u===null)return;var E=u.tag;if(E===3||E===4){var F=u.stateNode.containerInfo;if(F===h||F.nodeType===8&&F.parentNode===h)break;if(E===4)for(E=u.return;E!==null;){var B=E.tag;if((B===3||B===4)&&(B=E.stateNode.containerInfo,B===h||B.nodeType===8&&B.parentNode===h))return;E=E.return}for(;F!==null;){if(E=Nr(F),E===null)return;if(B=E.tag,B===5||B===6){u=v=E;continue e}F=F.parentNode}}u=u.return}Jt(function(){var ie=v,pe=ot(o),_e=[];e:{var he=Rf.get(n);if(he!==void 0){var Ie=lu,Oe=n;switch(n){case"keypress":if(Sa(o)===0)break e;case"keydown":case"keyup":Ie=M0;break;case"focusin":Oe="focus",Ie=du;break;case"focusout":Oe="blur",Ie=du;break;case"beforeblur":case"afterblur":Ie=du;break;case"click":if(o.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":Ie=rf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":Ie=c0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":Ie=w0;break;case Tf:case wf:case Af:Ie=h0;break;case Cf:Ie=C0;break;case"scroll":Ie=l0;break;case"wheel":Ie=b0;break;case"copy":case"cut":case"paste":Ie=m0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":Ie=of}var Be=(i&4)!==0,Ht=!Be&&n==="scroll",q=Be?he!==null?he+"Capture":null:he;Be=[];for(var W=ie,ee;W!==null;){ee=W;var Te=ee.stateNode;if(ee.tag===5&&Te!==null&&(ee=Te,q!==null&&(Te=_t(W,q),Te!=null&&Be.push(To(W,Te,ee)))),Ht)break;W=W.return}0<Be.length&&(he=new Ie(he,Oe,null,o,pe),_e.push({event:he,listeners:Be}))}}if((i&7)===0){e:{if(he=n==="mouseover"||n==="pointerover",Ie=n==="mouseout"||n==="pointerout",he&&o!==Ct&&(Oe=o.relatedTarget||o.fromElement)&&(Nr(Oe)||Oe[Ci]))break e;if((Ie||he)&&(he=pe.window===pe?pe:(he=pe.ownerDocument)?he.defaultView||he.parentWindow:window,Ie?(Oe=o.relatedTarget||o.toElement,Ie=ie,Oe=Oe?Nr(Oe):null,Oe!==null&&(Ht=wi(Oe),Oe!==Ht||Oe.tag!==5&&Oe.tag!==6)&&(Oe=null)):(Ie=null,Oe=ie),Ie!==Oe)){if(Be=rf,Te="onMouseLeave",q="onMouseEnter",W="mouse",(n==="pointerout"||n==="pointerover")&&(Be=of,Te="onPointerLeave",q="onPointerEnter",W="pointer"),Ht=Ie==null?he:ms(Ie),ee=Oe==null?he:ms(Oe),he=new Be(Te,W+"leave",Ie,o,pe),he.target=Ht,he.relatedTarget=ee,Te=null,Nr(pe)===ie&&(Be=new Be(q,W+"enter",Oe,o,pe),Be.target=ee,Be.relatedTarget=Ht,Te=Be),Ht=Te,Ie&&Oe)t:{for(Be=Ie,q=Oe,W=0,ee=Be;ee;ee=hs(ee))W++;for(ee=0,Te=q;Te;Te=hs(Te))ee++;for(;0<W-ee;)Be=hs(Be),W--;for(;0<ee-W;)q=hs(q),ee--;for(;W--;){if(Be===q||q!==null&&Be===q.alternate)break t;Be=hs(Be),q=hs(q)}Be=null}else Be=null;Ie!==null&&If(_e,he,Ie,Be,!1),Oe!==null&&Ht!==null&&If(_e,Ht,Oe,Be,!0)}}e:{if(he=ie?ms(ie):window,Ie=he.nodeName&&he.nodeName.toLowerCase(),Ie==="select"||Ie==="input"&&he.type==="file")var ze=F0;else if(ff(he))if(pf)ze=z0;else{ze=k0;var qe=O0}else(Ie=he.nodeName)&&Ie.toLowerCase()==="input"&&(he.type==="checkbox"||he.type==="radio")&&(ze=B0);if(ze&&(ze=ze(n,ie))){hf(_e,ze,o,pe);break e}qe&&qe(n,he,ie),n==="focusout"&&(qe=he._wrapperState)&&qe.controlled&&he.type==="number"&&N(he,"number",he.value)}switch(qe=ie?ms(ie):window,n){case"focusin":(ff(qe)||qe.contentEditable==="true")&&(ds=qe,vu=ie,So=null);break;case"focusout":So=vu=ds=null;break;case"mousedown":_u=!0;break;case"contextmenu":case"mouseup":case"dragend":_u=!1,Mf(_e,o,pe);break;case"selectionchange":if(V0)break;case"keydown":case"keyup":Mf(_e,o,pe)}var $e;if(hu)e:{switch(n){case"compositionstart":var Qe="onCompositionStart";break e;case"compositionend":Qe="onCompositionEnd";break e;case"compositionupdate":Qe="onCompositionUpdate";break e}Qe=void 0}else cs?cf(n,o)&&(Qe="onCompositionEnd"):n==="keydown"&&o.keyCode===229&&(Qe="onCompositionStart");Qe&&(af&&o.locale!=="ko"&&(cs||Qe!=="onCompositionStart"?Qe==="onCompositionEnd"&&cs&&($e=tf()):(er=pe,au="value"in er?er.value:er.textContent,cs=!0)),qe=Ra(ie,Qe),0<qe.length&&(Qe=new sf(Qe,n,null,o,pe),_e.push({event:Qe,listeners:qe}),$e?Qe.data=$e:($e=df(o),$e!==null&&(Qe.data=$e)))),($e=L0?D0(n,o):I0(n,o))&&(ie=Ra(ie,"onBeforeInput"),0<ie.length&&(pe=new sf("onBeforeInput","beforeinput",null,o,pe),_e.push({event:pe,listeners:ie}),pe.data=$e))}Lf(_e,i)})}function To(n,i,o){return{instance:n,listener:i,currentTarget:o}}function Ra(n,i){for(var o=i+"Capture",u=[];n!==null;){var h=n,v=h.stateNode;h.tag===5&&v!==null&&(h=v,v=_t(n,o),v!=null&&u.unshift(To(n,v,h)),v=_t(n,i),v!=null&&u.push(To(n,v,h))),n=n.return}return u}function hs(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function If(n,i,o,u,h){for(var v=i._reactName,E=[];o!==null&&o!==u;){var F=o,B=F.alternate,ie=F.stateNode;if(B!==null&&B===u)break;F.tag===5&&ie!==null&&(F=ie,h?(B=_t(o,v),B!=null&&E.unshift(To(o,B,F))):h||(B=_t(o,v),B!=null&&E.push(To(o,B,F)))),o=o.return}E.length!==0&&n.push({event:i,listeners:E})}var Y0=/\r\n?/g,q0=/\u0000|\uFFFD/g;function Nf(n){return(typeof n=="string"?n:""+n).replace(Y0,`
`).replace(q0,"")}function ba(n,i,o){if(i=Nf(i),Nf(n)!==i&&o)throw Error(t(425))}function Pa(){}var Tu=null,wu=null;function Au(n,i){return n==="textarea"||n==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var Cu=typeof setTimeout=="function"?setTimeout:void 0,$0=typeof clearTimeout=="function"?clearTimeout:void 0,Uf=typeof Promise=="function"?Promise:void 0,K0=typeof queueMicrotask=="function"?queueMicrotask:typeof Uf<"u"?function(n){return Uf.resolve(null).then(n).catch(Z0)}:Cu;function Z0(n){setTimeout(function(){throw n})}function Ru(n,i){var o=i,u=0;do{var h=o.nextSibling;if(n.removeChild(o),h&&h.nodeType===8)if(o=h.data,o==="/$"){if(u===0){n.removeChild(h),po(i);return}u--}else o!=="$"&&o!=="$?"&&o!=="$!"||u++;o=h}while(o);po(i)}function nr(n){for(;n!=null;n=n.nextSibling){var i=n.nodeType;if(i===1||i===3)break;if(i===8){if(i=n.data,i==="$"||i==="$!"||i==="$?")break;if(i==="/$")return null}}return n}function Ff(n){n=n.previousSibling;for(var i=0;n;){if(n.nodeType===8){var o=n.data;if(o==="$"||o==="$!"||o==="$?"){if(i===0)return n;i--}else o==="/$"&&i++}n=n.previousSibling}return null}var ps=Math.random().toString(36).slice(2),vi="__reactFiber$"+ps,wo="__reactProps$"+ps,Ci="__reactContainer$"+ps,bu="__reactEvents$"+ps,Q0="__reactListeners$"+ps,J0="__reactHandles$"+ps;function Nr(n){var i=n[vi];if(i)return i;for(var o=n.parentNode;o;){if(i=o[Ci]||o[vi]){if(o=i.alternate,i.child!==null||o!==null&&o.child!==null)for(n=Ff(n);n!==null;){if(o=n[vi])return o;n=Ff(n)}return i}n=o,o=n.parentNode}return null}function Ao(n){return n=n[vi]||n[Ci],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function ms(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(t(33))}function La(n){return n[wo]||null}var Pu=[],gs=-1;function ir(n){return{current:n}}function Lt(n){0>gs||(n.current=Pu[gs],Pu[gs]=null,gs--)}function bt(n,i){gs++,Pu[gs]=n.current,n.current=i}var rr={},dn=ir(rr),Cn=ir(!1),Ur=rr;function vs(n,i){var o=n.type.contextTypes;if(!o)return rr;var u=n.stateNode;if(u&&u.__reactInternalMemoizedUnmaskedChildContext===i)return u.__reactInternalMemoizedMaskedChildContext;var h={},v;for(v in o)h[v]=i[v];return u&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=i,n.__reactInternalMemoizedMaskedChildContext=h),h}function Rn(n){return n=n.childContextTypes,n!=null}function Da(){Lt(Cn),Lt(dn)}function Of(n,i,o){if(dn.current!==rr)throw Error(t(168));bt(dn,i),bt(Cn,o)}function kf(n,i,o){var u=n.stateNode;if(i=i.childContextTypes,typeof u.getChildContext!="function")return o;u=u.getChildContext();for(var h in u)if(!(h in i))throw Error(t(108,ge(n)||"Unknown",h));return z({},o,u)}function Ia(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||rr,Ur=dn.current,bt(dn,n),bt(Cn,Cn.current),!0}function Bf(n,i,o){var u=n.stateNode;if(!u)throw Error(t(169));o?(n=kf(n,i,Ur),u.__reactInternalMemoizedMergedChildContext=n,Lt(Cn),Lt(dn),bt(dn,n)):Lt(Cn),bt(Cn,o)}var Ri=null,Na=!1,Lu=!1;function zf(n){Ri===null?Ri=[n]:Ri.push(n)}function ev(n){Na=!0,zf(n)}function sr(){if(!Lu&&Ri!==null){Lu=!0;var n=0,i=Tt;try{var o=Ri;for(Tt=1;n<o.length;n++){var u=o[n];do u=u(!0);while(u!==null)}Ri=null,Na=!1}catch(h){throw Ri!==null&&(Ri=Ri.slice(n+1)),oe(et,sr),h}finally{Tt=i,Lu=!1}}return null}var _s=[],xs=0,Ua=null,Fa=0,Xn=[],Yn=0,Fr=null,bi=1,Pi="";function Or(n,i){_s[xs++]=Fa,_s[xs++]=Ua,Ua=n,Fa=i}function Hf(n,i,o){Xn[Yn++]=bi,Xn[Yn++]=Pi,Xn[Yn++]=Fr,Fr=n;var u=bi;n=Pi;var h=32-yn(u)-1;u&=~(1<<h),o+=1;var v=32-yn(i)+h;if(30<v){var E=h-h%5;v=(u&(1<<E)-1).toString(32),u>>=E,h-=E,bi=1<<32-yn(i)+h|o<<h|u,Pi=v+n}else bi=1<<v|o<<h|u,Pi=n}function Du(n){n.return!==null&&(Or(n,1),Hf(n,1,0))}function Iu(n){for(;n===Ua;)Ua=_s[--xs],_s[xs]=null,Fa=_s[--xs],_s[xs]=null;for(;n===Fr;)Fr=Xn[--Yn],Xn[Yn]=null,Pi=Xn[--Yn],Xn[Yn]=null,bi=Xn[--Yn],Xn[Yn]=null}var zn=null,Hn=null,Nt=!1,ri=null;function Gf(n,i){var o=Zn(5,null,null,0);o.elementType="DELETED",o.stateNode=i,o.return=n,i=n.deletions,i===null?(n.deletions=[o],n.flags|=16):i.push(o)}function Vf(n,i){switch(n.tag){case 5:var o=n.type;return i=i.nodeType!==1||o.toLowerCase()!==i.nodeName.toLowerCase()?null:i,i!==null?(n.stateNode=i,zn=n,Hn=nr(i.firstChild),!0):!1;case 6:return i=n.pendingProps===""||i.nodeType!==3?null:i,i!==null?(n.stateNode=i,zn=n,Hn=null,!0):!1;case 13:return i=i.nodeType!==8?null:i,i!==null?(o=Fr!==null?{id:bi,overflow:Pi}:null,n.memoizedState={dehydrated:i,treeContext:o,retryLane:1073741824},o=Zn(18,null,null,0),o.stateNode=i,o.return=n,n.child=o,zn=n,Hn=null,!0):!1;default:return!1}}function Nu(n){return(n.mode&1)!==0&&(n.flags&128)===0}function Uu(n){if(Nt){var i=Hn;if(i){var o=i;if(!Vf(n,i)){if(Nu(n))throw Error(t(418));i=nr(o.nextSibling);var u=zn;i&&Vf(n,i)?Gf(u,o):(n.flags=n.flags&-4097|2,Nt=!1,zn=n)}}else{if(Nu(n))throw Error(t(418));n.flags=n.flags&-4097|2,Nt=!1,zn=n}}}function Wf(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;zn=n}function Oa(n){if(n!==zn)return!1;if(!Nt)return Wf(n),Nt=!0,!1;var i;if((i=n.tag!==3)&&!(i=n.tag!==5)&&(i=n.type,i=i!=="head"&&i!=="body"&&!Au(n.type,n.memoizedProps)),i&&(i=Hn)){if(Nu(n))throw jf(),Error(t(418));for(;i;)Gf(n,i),i=nr(i.nextSibling)}if(Wf(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(t(317));e:{for(n=n.nextSibling,i=0;n;){if(n.nodeType===8){var o=n.data;if(o==="/$"){if(i===0){Hn=nr(n.nextSibling);break e}i--}else o!=="$"&&o!=="$!"&&o!=="$?"||i++}n=n.nextSibling}Hn=null}}else Hn=zn?nr(n.stateNode.nextSibling):null;return!0}function jf(){for(var n=Hn;n;)n=nr(n.nextSibling)}function ys(){Hn=zn=null,Nt=!1}function Fu(n){ri===null?ri=[n]:ri.push(n)}var tv=R.ReactCurrentBatchConfig;function Co(n,i,o){if(n=o.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(o._owner){if(o=o._owner,o){if(o.tag!==1)throw Error(t(309));var u=o.stateNode}if(!u)throw Error(t(147,n));var h=u,v=""+n;return i!==null&&i.ref!==null&&typeof i.ref=="function"&&i.ref._stringRef===v?i.ref:(i=function(E){var F=h.refs;E===null?delete F[v]:F[v]=E},i._stringRef=v,i)}if(typeof n!="string")throw Error(t(284));if(!o._owner)throw Error(t(290,n))}return n}function ka(n,i){throw n=Object.prototype.toString.call(i),Error(t(31,n==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":n))}function Xf(n){var i=n._init;return i(n._payload)}function Yf(n){function i(q,W){if(n){var ee=q.deletions;ee===null?(q.deletions=[W],q.flags|=16):ee.push(W)}}function o(q,W){if(!n)return null;for(;W!==null;)i(q,W),W=W.sibling;return null}function u(q,W){for(q=new Map;W!==null;)W.key!==null?q.set(W.key,W):q.set(W.index,W),W=W.sibling;return q}function h(q,W){return q=hr(q,W),q.index=0,q.sibling=null,q}function v(q,W,ee){return q.index=ee,n?(ee=q.alternate,ee!==null?(ee=ee.index,ee<W?(q.flags|=2,W):ee):(q.flags|=2,W)):(q.flags|=1048576,W)}function E(q){return n&&q.alternate===null&&(q.flags|=2),q}function F(q,W,ee,Te){return W===null||W.tag!==6?(W=Cc(ee,q.mode,Te),W.return=q,W):(W=h(W,ee),W.return=q,W)}function B(q,W,ee,Te){var ze=ee.type;return ze===U?pe(q,W,ee.props.children,Te,ee.key):W!==null&&(W.elementType===ze||typeof ze=="object"&&ze!==null&&ze.$$typeof===J&&Xf(ze)===W.type)?(Te=h(W,ee.props),Te.ref=Co(q,W,ee),Te.return=q,Te):(Te=ll(ee.type,ee.key,ee.props,null,q.mode,Te),Te.ref=Co(q,W,ee),Te.return=q,Te)}function ie(q,W,ee,Te){return W===null||W.tag!==4||W.stateNode.containerInfo!==ee.containerInfo||W.stateNode.implementation!==ee.implementation?(W=Rc(ee,q.mode,Te),W.return=q,W):(W=h(W,ee.children||[]),W.return=q,W)}function pe(q,W,ee,Te,ze){return W===null||W.tag!==7?(W=jr(ee,q.mode,Te,ze),W.return=q,W):(W=h(W,ee),W.return=q,W)}function _e(q,W,ee){if(typeof W=="string"&&W!==""||typeof W=="number")return W=Cc(""+W,q.mode,ee),W.return=q,W;if(typeof W=="object"&&W!==null){switch(W.$$typeof){case O:return ee=ll(W.type,W.key,W.props,null,q.mode,ee),ee.ref=Co(q,null,W),ee.return=q,ee;case I:return W=Rc(W,q.mode,ee),W.return=q,W;case J:var Te=W._init;return _e(q,Te(W._payload),ee)}if(A(W)||Q(W))return W=jr(W,q.mode,ee,null),W.return=q,W;ka(q,W)}return null}function he(q,W,ee,Te){var ze=W!==null?W.key:null;if(typeof ee=="string"&&ee!==""||typeof ee=="number")return ze!==null?null:F(q,W,""+ee,Te);if(typeof ee=="object"&&ee!==null){switch(ee.$$typeof){case O:return ee.key===ze?B(q,W,ee,Te):null;case I:return ee.key===ze?ie(q,W,ee,Te):null;case J:return ze=ee._init,he(q,W,ze(ee._payload),Te)}if(A(ee)||Q(ee))return ze!==null?null:pe(q,W,ee,Te,null);ka(q,ee)}return null}function Ie(q,W,ee,Te,ze){if(typeof Te=="string"&&Te!==""||typeof Te=="number")return q=q.get(ee)||null,F(W,q,""+Te,ze);if(typeof Te=="object"&&Te!==null){switch(Te.$$typeof){case O:return q=q.get(Te.key===null?ee:Te.key)||null,B(W,q,Te,ze);case I:return q=q.get(Te.key===null?ee:Te.key)||null,ie(W,q,Te,ze);case J:var qe=Te._init;return Ie(q,W,ee,qe(Te._payload),ze)}if(A(Te)||Q(Te))return q=q.get(ee)||null,pe(W,q,Te,ze,null);ka(W,Te)}return null}function Oe(q,W,ee,Te){for(var ze=null,qe=null,$e=W,Qe=W=0,nn=null;$e!==null&&Qe<ee.length;Qe++){$e.index>Qe?(nn=$e,$e=null):nn=$e.sibling;var xt=he(q,$e,ee[Qe],Te);if(xt===null){$e===null&&($e=nn);break}n&&$e&&xt.alternate===null&&i(q,$e),W=v(xt,W,Qe),qe===null?ze=xt:qe.sibling=xt,qe=xt,$e=nn}if(Qe===ee.length)return o(q,$e),Nt&&Or(q,Qe),ze;if($e===null){for(;Qe<ee.length;Qe++)$e=_e(q,ee[Qe],Te),$e!==null&&(W=v($e,W,Qe),qe===null?ze=$e:qe.sibling=$e,qe=$e);return Nt&&Or(q,Qe),ze}for($e=u(q,$e);Qe<ee.length;Qe++)nn=Ie($e,q,Qe,ee[Qe],Te),nn!==null&&(n&&nn.alternate!==null&&$e.delete(nn.key===null?Qe:nn.key),W=v(nn,W,Qe),qe===null?ze=nn:qe.sibling=nn,qe=nn);return n&&$e.forEach(function(pr){return i(q,pr)}),Nt&&Or(q,Qe),ze}function Be(q,W,ee,Te){var ze=Q(ee);if(typeof ze!="function")throw Error(t(150));if(ee=ze.call(ee),ee==null)throw Error(t(151));for(var qe=ze=null,$e=W,Qe=W=0,nn=null,xt=ee.next();$e!==null&&!xt.done;Qe++,xt=ee.next()){$e.index>Qe?(nn=$e,$e=null):nn=$e.sibling;var pr=he(q,$e,xt.value,Te);if(pr===null){$e===null&&($e=nn);break}n&&$e&&pr.alternate===null&&i(q,$e),W=v(pr,W,Qe),qe===null?ze=pr:qe.sibling=pr,qe=pr,$e=nn}if(xt.done)return o(q,$e),Nt&&Or(q,Qe),ze;if($e===null){for(;!xt.done;Qe++,xt=ee.next())xt=_e(q,xt.value,Te),xt!==null&&(W=v(xt,W,Qe),qe===null?ze=xt:qe.sibling=xt,qe=xt);return Nt&&Or(q,Qe),ze}for($e=u(q,$e);!xt.done;Qe++,xt=ee.next())xt=Ie($e,q,Qe,xt.value,Te),xt!==null&&(n&&xt.alternate!==null&&$e.delete(xt.key===null?Qe:xt.key),W=v(xt,W,Qe),qe===null?ze=xt:qe.sibling=xt,qe=xt);return n&&$e.forEach(function(Nv){return i(q,Nv)}),Nt&&Or(q,Qe),ze}function Ht(q,W,ee,Te){if(typeof ee=="object"&&ee!==null&&ee.type===U&&ee.key===null&&(ee=ee.props.children),typeof ee=="object"&&ee!==null){switch(ee.$$typeof){case O:e:{for(var ze=ee.key,qe=W;qe!==null;){if(qe.key===ze){if(ze=ee.type,ze===U){if(qe.tag===7){o(q,qe.sibling),W=h(qe,ee.props.children),W.return=q,q=W;break e}}else if(qe.elementType===ze||typeof ze=="object"&&ze!==null&&ze.$$typeof===J&&Xf(ze)===qe.type){o(q,qe.sibling),W=h(qe,ee.props),W.ref=Co(q,qe,ee),W.return=q,q=W;break e}o(q,qe);break}else i(q,qe);qe=qe.sibling}ee.type===U?(W=jr(ee.props.children,q.mode,Te,ee.key),W.return=q,q=W):(Te=ll(ee.type,ee.key,ee.props,null,q.mode,Te),Te.ref=Co(q,W,ee),Te.return=q,q=Te)}return E(q);case I:e:{for(qe=ee.key;W!==null;){if(W.key===qe)if(W.tag===4&&W.stateNode.containerInfo===ee.containerInfo&&W.stateNode.implementation===ee.implementation){o(q,W.sibling),W=h(W,ee.children||[]),W.return=q,q=W;break e}else{o(q,W);break}else i(q,W);W=W.sibling}W=Rc(ee,q.mode,Te),W.return=q,q=W}return E(q);case J:return qe=ee._init,Ht(q,W,qe(ee._payload),Te)}if(A(ee))return Oe(q,W,ee,Te);if(Q(ee))return Be(q,W,ee,Te);ka(q,ee)}return typeof ee=="string"&&ee!==""||typeof ee=="number"?(ee=""+ee,W!==null&&W.tag===6?(o(q,W.sibling),W=h(W,ee),W.return=q,q=W):(o(q,W),W=Cc(ee,q.mode,Te),W.return=q,q=W),E(q)):o(q,W)}return Ht}var Ss=Yf(!0),qf=Yf(!1),Ba=ir(null),za=null,Ms=null,Ou=null;function ku(){Ou=Ms=za=null}function Bu(n){var i=Ba.current;Lt(Ba),n._currentValue=i}function zu(n,i,o){for(;n!==null;){var u=n.alternate;if((n.childLanes&i)!==i?(n.childLanes|=i,u!==null&&(u.childLanes|=i)):u!==null&&(u.childLanes&i)!==i&&(u.childLanes|=i),n===o)break;n=n.return}}function Es(n,i){za=n,Ou=Ms=null,n=n.dependencies,n!==null&&n.firstContext!==null&&((n.lanes&i)!==0&&(bn=!0),n.firstContext=null)}function qn(n){var i=n._currentValue;if(Ou!==n)if(n={context:n,memoizedValue:i,next:null},Ms===null){if(za===null)throw Error(t(308));Ms=n,za.dependencies={lanes:0,firstContext:n}}else Ms=Ms.next=n;return i}var kr=null;function Hu(n){kr===null?kr=[n]:kr.push(n)}function $f(n,i,o,u){var h=i.interleaved;return h===null?(o.next=o,Hu(i)):(o.next=h.next,h.next=o),i.interleaved=o,Li(n,u)}function Li(n,i){n.lanes|=i;var o=n.alternate;for(o!==null&&(o.lanes|=i),o=n,n=n.return;n!==null;)n.childLanes|=i,o=n.alternate,o!==null&&(o.childLanes|=i),o=n,n=n.return;return o.tag===3?o.stateNode:null}var or=!1;function Gu(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Kf(n,i){n=n.updateQueue,i.updateQueue===n&&(i.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function Di(n,i){return{eventTime:n,lane:i,tag:0,payload:null,callback:null,next:null}}function ar(n,i,o){var u=n.updateQueue;if(u===null)return null;if(u=u.shared,(vt&2)!==0){var h=u.pending;return h===null?i.next=i:(i.next=h.next,h.next=i),u.pending=i,Li(n,o)}return h=u.interleaved,h===null?(i.next=i,Hu(u)):(i.next=h.next,h.next=i),u.interleaved=i,Li(n,o)}function Ha(n,i,o){if(i=i.updateQueue,i!==null&&(i=i.shared,(o&4194240)!==0)){var u=i.lanes;u&=n.pendingLanes,o|=u,i.lanes=o,nu(n,o)}}function Zf(n,i){var o=n.updateQueue,u=n.alternate;if(u!==null&&(u=u.updateQueue,o===u)){var h=null,v=null;if(o=o.firstBaseUpdate,o!==null){do{var E={eventTime:o.eventTime,lane:o.lane,tag:o.tag,payload:o.payload,callback:o.callback,next:null};v===null?h=v=E:v=v.next=E,o=o.next}while(o!==null);v===null?h=v=i:v=v.next=i}else h=v=i;o={baseState:u.baseState,firstBaseUpdate:h,lastBaseUpdate:v,shared:u.shared,effects:u.effects},n.updateQueue=o;return}n=o.lastBaseUpdate,n===null?o.firstBaseUpdate=i:n.next=i,o.lastBaseUpdate=i}function Ga(n,i,o,u){var h=n.updateQueue;or=!1;var v=h.firstBaseUpdate,E=h.lastBaseUpdate,F=h.shared.pending;if(F!==null){h.shared.pending=null;var B=F,ie=B.next;B.next=null,E===null?v=ie:E.next=ie,E=B;var pe=n.alternate;pe!==null&&(pe=pe.updateQueue,F=pe.lastBaseUpdate,F!==E&&(F===null?pe.firstBaseUpdate=ie:F.next=ie,pe.lastBaseUpdate=B))}if(v!==null){var _e=h.baseState;E=0,pe=ie=B=null,F=v;do{var he=F.lane,Ie=F.eventTime;if((u&he)===he){pe!==null&&(pe=pe.next={eventTime:Ie,lane:0,tag:F.tag,payload:F.payload,callback:F.callback,next:null});e:{var Oe=n,Be=F;switch(he=i,Ie=o,Be.tag){case 1:if(Oe=Be.payload,typeof Oe=="function"){_e=Oe.call(Ie,_e,he);break e}_e=Oe;break e;case 3:Oe.flags=Oe.flags&-65537|128;case 0:if(Oe=Be.payload,he=typeof Oe=="function"?Oe.call(Ie,_e,he):Oe,he==null)break e;_e=z({},_e,he);break e;case 2:or=!0}}F.callback!==null&&F.lane!==0&&(n.flags|=64,he=h.effects,he===null?h.effects=[F]:he.push(F))}else Ie={eventTime:Ie,lane:he,tag:F.tag,payload:F.payload,callback:F.callback,next:null},pe===null?(ie=pe=Ie,B=_e):pe=pe.next=Ie,E|=he;if(F=F.next,F===null){if(F=h.shared.pending,F===null)break;he=F,F=he.next,he.next=null,h.lastBaseUpdate=he,h.shared.pending=null}}while(!0);if(pe===null&&(B=_e),h.baseState=B,h.firstBaseUpdate=ie,h.lastBaseUpdate=pe,i=h.shared.interleaved,i!==null){h=i;do E|=h.lane,h=h.next;while(h!==i)}else v===null&&(h.shared.lanes=0);Hr|=E,n.lanes=E,n.memoizedState=_e}}function Qf(n,i,o){if(n=i.effects,i.effects=null,n!==null)for(i=0;i<n.length;i++){var u=n[i],h=u.callback;if(h!==null){if(u.callback=null,u=o,typeof h!="function")throw Error(t(191,h));h.call(u)}}}var Ro={},_i=ir(Ro),bo=ir(Ro),Po=ir(Ro);function Br(n){if(n===Ro)throw Error(t(174));return n}function Vu(n,i){switch(bt(Po,i),bt(bo,n),bt(_i,Ro),n=i.nodeType,n){case 9:case 11:i=(i=i.documentElement)?i.namespaceURI:Fe(null,"");break;default:n=n===8?i.parentNode:i,i=n.namespaceURI||null,n=n.tagName,i=Fe(i,n)}Lt(_i),bt(_i,i)}function Ts(){Lt(_i),Lt(bo),Lt(Po)}function Jf(n){Br(Po.current);var i=Br(_i.current),o=Fe(i,n.type);i!==o&&(bt(bo,n),bt(_i,o))}function Wu(n){bo.current===n&&(Lt(_i),Lt(bo))}var Ut=ir(0);function Va(n){for(var i=n;i!==null;){if(i.tag===13){var o=i.memoizedState;if(o!==null&&(o=o.dehydrated,o===null||o.data==="$?"||o.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var ju=[];function Xu(){for(var n=0;n<ju.length;n++)ju[n]._workInProgressVersionPrimary=null;ju.length=0}var Wa=R.ReactCurrentDispatcher,Yu=R.ReactCurrentBatchConfig,zr=0,Ft=null,qt=null,en=null,ja=!1,Lo=!1,Do=0,nv=0;function fn(){throw Error(t(321))}function qu(n,i){if(i===null)return!1;for(var o=0;o<i.length&&o<n.length;o++)if(!ii(n[o],i[o]))return!1;return!0}function $u(n,i,o,u,h,v){if(zr=v,Ft=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,Wa.current=n===null||n.memoizedState===null?ov:av,n=o(u,h),Lo){v=0;do{if(Lo=!1,Do=0,25<=v)throw Error(t(301));v+=1,en=qt=null,i.updateQueue=null,Wa.current=lv,n=o(u,h)}while(Lo)}if(Wa.current=qa,i=qt!==null&&qt.next!==null,zr=0,en=qt=Ft=null,ja=!1,i)throw Error(t(300));return n}function Ku(){var n=Do!==0;return Do=0,n}function xi(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return en===null?Ft.memoizedState=en=n:en=en.next=n,en}function $n(){if(qt===null){var n=Ft.alternate;n=n!==null?n.memoizedState:null}else n=qt.next;var i=en===null?Ft.memoizedState:en.next;if(i!==null)en=i,qt=n;else{if(n===null)throw Error(t(310));qt=n,n={memoizedState:qt.memoizedState,baseState:qt.baseState,baseQueue:qt.baseQueue,queue:qt.queue,next:null},en===null?Ft.memoizedState=en=n:en=en.next=n}return en}function Io(n,i){return typeof i=="function"?i(n):i}function Zu(n){var i=$n(),o=i.queue;if(o===null)throw Error(t(311));o.lastRenderedReducer=n;var u=qt,h=u.baseQueue,v=o.pending;if(v!==null){if(h!==null){var E=h.next;h.next=v.next,v.next=E}u.baseQueue=h=v,o.pending=null}if(h!==null){v=h.next,u=u.baseState;var F=E=null,B=null,ie=v;do{var pe=ie.lane;if((zr&pe)===pe)B!==null&&(B=B.next={lane:0,action:ie.action,hasEagerState:ie.hasEagerState,eagerState:ie.eagerState,next:null}),u=ie.hasEagerState?ie.eagerState:n(u,ie.action);else{var _e={lane:pe,action:ie.action,hasEagerState:ie.hasEagerState,eagerState:ie.eagerState,next:null};B===null?(F=B=_e,E=u):B=B.next=_e,Ft.lanes|=pe,Hr|=pe}ie=ie.next}while(ie!==null&&ie!==v);B===null?E=u:B.next=F,ii(u,i.memoizedState)||(bn=!0),i.memoizedState=u,i.baseState=E,i.baseQueue=B,o.lastRenderedState=u}if(n=o.interleaved,n!==null){h=n;do v=h.lane,Ft.lanes|=v,Hr|=v,h=h.next;while(h!==n)}else h===null&&(o.lanes=0);return[i.memoizedState,o.dispatch]}function Qu(n){var i=$n(),o=i.queue;if(o===null)throw Error(t(311));o.lastRenderedReducer=n;var u=o.dispatch,h=o.pending,v=i.memoizedState;if(h!==null){o.pending=null;var E=h=h.next;do v=n(v,E.action),E=E.next;while(E!==h);ii(v,i.memoizedState)||(bn=!0),i.memoizedState=v,i.baseQueue===null&&(i.baseState=v),o.lastRenderedState=v}return[v,u]}function eh(){}function th(n,i){var o=Ft,u=$n(),h=i(),v=!ii(u.memoizedState,h);if(v&&(u.memoizedState=h,bn=!0),u=u.queue,Ju(rh.bind(null,o,u,n),[n]),u.getSnapshot!==i||v||en!==null&&en.memoizedState.tag&1){if(o.flags|=2048,No(9,ih.bind(null,o,u,h,i),void 0,null),tn===null)throw Error(t(349));(zr&30)!==0||nh(o,i,h)}return h}function nh(n,i,o){n.flags|=16384,n={getSnapshot:i,value:o},i=Ft.updateQueue,i===null?(i={lastEffect:null,stores:null},Ft.updateQueue=i,i.stores=[n]):(o=i.stores,o===null?i.stores=[n]:o.push(n))}function ih(n,i,o,u){i.value=o,i.getSnapshot=u,sh(i)&&oh(n)}function rh(n,i,o){return o(function(){sh(i)&&oh(n)})}function sh(n){var i=n.getSnapshot;n=n.value;try{var o=i();return!ii(n,o)}catch{return!0}}function oh(n){var i=Li(n,1);i!==null&&li(i,n,1,-1)}function ah(n){var i=xi();return typeof n=="function"&&(n=n()),i.memoizedState=i.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Io,lastRenderedState:n},i.queue=n,n=n.dispatch=sv.bind(null,Ft,n),[i.memoizedState,n]}function No(n,i,o,u){return n={tag:n,create:i,destroy:o,deps:u,next:null},i=Ft.updateQueue,i===null?(i={lastEffect:null,stores:null},Ft.updateQueue=i,i.lastEffect=n.next=n):(o=i.lastEffect,o===null?i.lastEffect=n.next=n:(u=o.next,o.next=n,n.next=u,i.lastEffect=n)),n}function lh(){return $n().memoizedState}function Xa(n,i,o,u){var h=xi();Ft.flags|=n,h.memoizedState=No(1|i,o,void 0,u===void 0?null:u)}function Ya(n,i,o,u){var h=$n();u=u===void 0?null:u;var v=void 0;if(qt!==null){var E=qt.memoizedState;if(v=E.destroy,u!==null&&qu(u,E.deps)){h.memoizedState=No(i,o,v,u);return}}Ft.flags|=n,h.memoizedState=No(1|i,o,v,u)}function uh(n,i){return Xa(8390656,8,n,i)}function Ju(n,i){return Ya(2048,8,n,i)}function ch(n,i){return Ya(4,2,n,i)}function dh(n,i){return Ya(4,4,n,i)}function fh(n,i){if(typeof i=="function")return n=n(),i(n),function(){i(null)};if(i!=null)return n=n(),i.current=n,function(){i.current=null}}function hh(n,i,o){return o=o!=null?o.concat([n]):null,Ya(4,4,fh.bind(null,i,n),o)}function ec(){}function ph(n,i){var o=$n();i=i===void 0?null:i;var u=o.memoizedState;return u!==null&&i!==null&&qu(i,u[1])?u[0]:(o.memoizedState=[n,i],n)}function mh(n,i){var o=$n();i=i===void 0?null:i;var u=o.memoizedState;return u!==null&&i!==null&&qu(i,u[1])?u[0]:(n=n(),o.memoizedState=[n,i],n)}function gh(n,i,o){return(zr&21)===0?(n.baseState&&(n.baseState=!1,bn=!0),n.memoizedState=o):(ii(o,i)||(o=ma(),Ft.lanes|=o,Hr|=o,n.baseState=!0),i)}function iv(n,i){var o=Tt;Tt=o!==0&&4>o?o:4,n(!0);var u=Yu.transition;Yu.transition={};try{n(!1),i()}finally{Tt=o,Yu.transition=u}}function vh(){return $n().memoizedState}function rv(n,i,o){var u=dr(n);if(o={lane:u,action:o,hasEagerState:!1,eagerState:null,next:null},_h(n))xh(i,o);else if(o=$f(n,i,o,u),o!==null){var h=Mn();li(o,n,u,h),yh(o,i,u)}}function sv(n,i,o){var u=dr(n),h={lane:u,action:o,hasEagerState:!1,eagerState:null,next:null};if(_h(n))xh(i,h);else{var v=n.alternate;if(n.lanes===0&&(v===null||v.lanes===0)&&(v=i.lastRenderedReducer,v!==null))try{var E=i.lastRenderedState,F=v(E,o);if(h.hasEagerState=!0,h.eagerState=F,ii(F,E)){var B=i.interleaved;B===null?(h.next=h,Hu(i)):(h.next=B.next,B.next=h),i.interleaved=h;return}}catch{}o=$f(n,i,h,u),o!==null&&(h=Mn(),li(o,n,u,h),yh(o,i,u))}}function _h(n){var i=n.alternate;return n===Ft||i!==null&&i===Ft}function xh(n,i){Lo=ja=!0;var o=n.pending;o===null?i.next=i:(i.next=o.next,o.next=i),n.pending=i}function yh(n,i,o){if((o&4194240)!==0){var u=i.lanes;u&=n.pendingLanes,o|=u,i.lanes=o,nu(n,o)}}var qa={readContext:qn,useCallback:fn,useContext:fn,useEffect:fn,useImperativeHandle:fn,useInsertionEffect:fn,useLayoutEffect:fn,useMemo:fn,useReducer:fn,useRef:fn,useState:fn,useDebugValue:fn,useDeferredValue:fn,useTransition:fn,useMutableSource:fn,useSyncExternalStore:fn,useId:fn,unstable_isNewReconciler:!1},ov={readContext:qn,useCallback:function(n,i){return xi().memoizedState=[n,i===void 0?null:i],n},useContext:qn,useEffect:uh,useImperativeHandle:function(n,i,o){return o=o!=null?o.concat([n]):null,Xa(4194308,4,fh.bind(null,i,n),o)},useLayoutEffect:function(n,i){return Xa(4194308,4,n,i)},useInsertionEffect:function(n,i){return Xa(4,2,n,i)},useMemo:function(n,i){var o=xi();return i=i===void 0?null:i,n=n(),o.memoizedState=[n,i],n},useReducer:function(n,i,o){var u=xi();return i=o!==void 0?o(i):i,u.memoizedState=u.baseState=i,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:i},u.queue=n,n=n.dispatch=rv.bind(null,Ft,n),[u.memoizedState,n]},useRef:function(n){var i=xi();return n={current:n},i.memoizedState=n},useState:ah,useDebugValue:ec,useDeferredValue:function(n){return xi().memoizedState=n},useTransition:function(){var n=ah(!1),i=n[0];return n=iv.bind(null,n[1]),xi().memoizedState=n,[i,n]},useMutableSource:function(){},useSyncExternalStore:function(n,i,o){var u=Ft,h=xi();if(Nt){if(o===void 0)throw Error(t(407));o=o()}else{if(o=i(),tn===null)throw Error(t(349));(zr&30)!==0||nh(u,i,o)}h.memoizedState=o;var v={value:o,getSnapshot:i};return h.queue=v,uh(rh.bind(null,u,v,n),[n]),u.flags|=2048,No(9,ih.bind(null,u,v,o,i),void 0,null),o},useId:function(){var n=xi(),i=tn.identifierPrefix;if(Nt){var o=Pi,u=bi;o=(u&~(1<<32-yn(u)-1)).toString(32)+o,i=":"+i+"R"+o,o=Do++,0<o&&(i+="H"+o.toString(32)),i+=":"}else o=nv++,i=":"+i+"r"+o.toString(32)+":";return n.memoizedState=i},unstable_isNewReconciler:!1},av={readContext:qn,useCallback:ph,useContext:qn,useEffect:Ju,useImperativeHandle:hh,useInsertionEffect:ch,useLayoutEffect:dh,useMemo:mh,useReducer:Zu,useRef:lh,useState:function(){return Zu(Io)},useDebugValue:ec,useDeferredValue:function(n){var i=$n();return gh(i,qt.memoizedState,n)},useTransition:function(){var n=Zu(Io)[0],i=$n().memoizedState;return[n,i]},useMutableSource:eh,useSyncExternalStore:th,useId:vh,unstable_isNewReconciler:!1},lv={readContext:qn,useCallback:ph,useContext:qn,useEffect:Ju,useImperativeHandle:hh,useInsertionEffect:ch,useLayoutEffect:dh,useMemo:mh,useReducer:Qu,useRef:lh,useState:function(){return Qu(Io)},useDebugValue:ec,useDeferredValue:function(n){var i=$n();return qt===null?i.memoizedState=n:gh(i,qt.memoizedState,n)},useTransition:function(){var n=Qu(Io)[0],i=$n().memoizedState;return[n,i]},useMutableSource:eh,useSyncExternalStore:th,useId:vh,unstable_isNewReconciler:!1};function si(n,i){if(n&&n.defaultProps){i=z({},i),n=n.defaultProps;for(var o in n)i[o]===void 0&&(i[o]=n[o]);return i}return i}function tc(n,i,o,u){i=n.memoizedState,o=o(u,i),o=o==null?i:z({},i,o),n.memoizedState=o,n.lanes===0&&(n.updateQueue.baseState=o)}var $a={isMounted:function(n){return(n=n._reactInternals)?wi(n)===n:!1},enqueueSetState:function(n,i,o){n=n._reactInternals;var u=Mn(),h=dr(n),v=Di(u,h);v.payload=i,o!=null&&(v.callback=o),i=ar(n,v,h),i!==null&&(li(i,n,h,u),Ha(i,n,h))},enqueueReplaceState:function(n,i,o){n=n._reactInternals;var u=Mn(),h=dr(n),v=Di(u,h);v.tag=1,v.payload=i,o!=null&&(v.callback=o),i=ar(n,v,h),i!==null&&(li(i,n,h,u),Ha(i,n,h))},enqueueForceUpdate:function(n,i){n=n._reactInternals;var o=Mn(),u=dr(n),h=Di(o,u);h.tag=2,i!=null&&(h.callback=i),i=ar(n,h,u),i!==null&&(li(i,n,u,o),Ha(i,n,u))}};function Sh(n,i,o,u,h,v,E){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(u,v,E):i.prototype&&i.prototype.isPureReactComponent?!yo(o,u)||!yo(h,v):!0}function Mh(n,i,o){var u=!1,h=rr,v=i.contextType;return typeof v=="object"&&v!==null?v=qn(v):(h=Rn(i)?Ur:dn.current,u=i.contextTypes,v=(u=u!=null)?vs(n,h):rr),i=new i(o,v),n.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=$a,n.stateNode=i,i._reactInternals=n,u&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=h,n.__reactInternalMemoizedMaskedChildContext=v),i}function Eh(n,i,o,u){n=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(o,u),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(o,u),i.state!==n&&$a.enqueueReplaceState(i,i.state,null)}function nc(n,i,o,u){var h=n.stateNode;h.props=o,h.state=n.memoizedState,h.refs={},Gu(n);var v=i.contextType;typeof v=="object"&&v!==null?h.context=qn(v):(v=Rn(i)?Ur:dn.current,h.context=vs(n,v)),h.state=n.memoizedState,v=i.getDerivedStateFromProps,typeof v=="function"&&(tc(n,i,v,o),h.state=n.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof h.getSnapshotBeforeUpdate=="function"||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(i=h.state,typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount(),i!==h.state&&$a.enqueueReplaceState(h,h.state,null),Ga(n,o,h,u),h.state=n.memoizedState),typeof h.componentDidMount=="function"&&(n.flags|=4194308)}function ws(n,i){try{var o="",u=i;do o+=fe(u),u=u.return;while(u);var h=o}catch(v){h=`
Error generating stack: `+v.message+`
`+v.stack}return{value:n,source:i,stack:h,digest:null}}function ic(n,i,o){return{value:n,source:null,stack:o??null,digest:i??null}}function rc(n,i){try{console.error(i.value)}catch(o){setTimeout(function(){throw o})}}var uv=typeof WeakMap=="function"?WeakMap:Map;function Th(n,i,o){o=Di(-1,o),o.tag=3,o.payload={element:null};var u=i.value;return o.callback=function(){nl||(nl=!0,xc=u),rc(n,i)},o}function wh(n,i,o){o=Di(-1,o),o.tag=3;var u=n.type.getDerivedStateFromError;if(typeof u=="function"){var h=i.value;o.payload=function(){return u(h)},o.callback=function(){rc(n,i)}}var v=n.stateNode;return v!==null&&typeof v.componentDidCatch=="function"&&(o.callback=function(){rc(n,i),typeof u!="function"&&(ur===null?ur=new Set([this]):ur.add(this));var E=i.stack;this.componentDidCatch(i.value,{componentStack:E!==null?E:""})}),o}function Ah(n,i,o){var u=n.pingCache;if(u===null){u=n.pingCache=new uv;var h=new Set;u.set(i,h)}else h=u.get(i),h===void 0&&(h=new Set,u.set(i,h));h.has(o)||(h.add(o),n=Ev.bind(null,n,i,o),i.then(n,n))}function Ch(n){do{var i;if((i=n.tag===13)&&(i=n.memoizedState,i=i!==null?i.dehydrated!==null:!0),i)return n;n=n.return}while(n!==null);return null}function Rh(n,i,o,u,h){return(n.mode&1)===0?(n===i?n.flags|=65536:(n.flags|=128,o.flags|=131072,o.flags&=-52805,o.tag===1&&(o.alternate===null?o.tag=17:(i=Di(-1,1),i.tag=2,ar(o,i,1))),o.lanes|=1),n):(n.flags|=65536,n.lanes=h,n)}var cv=R.ReactCurrentOwner,bn=!1;function Sn(n,i,o,u){i.child=n===null?qf(i,null,o,u):Ss(i,n.child,o,u)}function bh(n,i,o,u,h){o=o.render;var v=i.ref;return Es(i,h),u=$u(n,i,o,u,v,h),o=Ku(),n!==null&&!bn?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~h,Ii(n,i,h)):(Nt&&o&&Du(i),i.flags|=1,Sn(n,i,u,h),i.child)}function Ph(n,i,o,u,h){if(n===null){var v=o.type;return typeof v=="function"&&!Ac(v)&&v.defaultProps===void 0&&o.compare===null&&o.defaultProps===void 0?(i.tag=15,i.type=v,Lh(n,i,v,u,h)):(n=ll(o.type,null,u,i,i.mode,h),n.ref=i.ref,n.return=i,i.child=n)}if(v=n.child,(n.lanes&h)===0){var E=v.memoizedProps;if(o=o.compare,o=o!==null?o:yo,o(E,u)&&n.ref===i.ref)return Ii(n,i,h)}return i.flags|=1,n=hr(v,u),n.ref=i.ref,n.return=i,i.child=n}function Lh(n,i,o,u,h){if(n!==null){var v=n.memoizedProps;if(yo(v,u)&&n.ref===i.ref)if(bn=!1,i.pendingProps=u=v,(n.lanes&h)!==0)(n.flags&131072)!==0&&(bn=!0);else return i.lanes=n.lanes,Ii(n,i,h)}return sc(n,i,o,u,h)}function Dh(n,i,o){var u=i.pendingProps,h=u.children,v=n!==null?n.memoizedState:null;if(u.mode==="hidden")if((i.mode&1)===0)i.memoizedState={baseLanes:0,cachePool:null,transitions:null},bt(Cs,Gn),Gn|=o;else{if((o&1073741824)===0)return n=v!==null?v.baseLanes|o:o,i.lanes=i.childLanes=1073741824,i.memoizedState={baseLanes:n,cachePool:null,transitions:null},i.updateQueue=null,bt(Cs,Gn),Gn|=n,null;i.memoizedState={baseLanes:0,cachePool:null,transitions:null},u=v!==null?v.baseLanes:o,bt(Cs,Gn),Gn|=u}else v!==null?(u=v.baseLanes|o,i.memoizedState=null):u=o,bt(Cs,Gn),Gn|=u;return Sn(n,i,h,o),i.child}function Ih(n,i){var o=i.ref;(n===null&&o!==null||n!==null&&n.ref!==o)&&(i.flags|=512,i.flags|=2097152)}function sc(n,i,o,u,h){var v=Rn(o)?Ur:dn.current;return v=vs(i,v),Es(i,h),o=$u(n,i,o,u,v,h),u=Ku(),n!==null&&!bn?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~h,Ii(n,i,h)):(Nt&&u&&Du(i),i.flags|=1,Sn(n,i,o,h),i.child)}function Nh(n,i,o,u,h){if(Rn(o)){var v=!0;Ia(i)}else v=!1;if(Es(i,h),i.stateNode===null)Za(n,i),Mh(i,o,u),nc(i,o,u,h),u=!0;else if(n===null){var E=i.stateNode,F=i.memoizedProps;E.props=F;var B=E.context,ie=o.contextType;typeof ie=="object"&&ie!==null?ie=qn(ie):(ie=Rn(o)?Ur:dn.current,ie=vs(i,ie));var pe=o.getDerivedStateFromProps,_e=typeof pe=="function"||typeof E.getSnapshotBeforeUpdate=="function";_e||typeof E.UNSAFE_componentWillReceiveProps!="function"&&typeof E.componentWillReceiveProps!="function"||(F!==u||B!==ie)&&Eh(i,E,u,ie),or=!1;var he=i.memoizedState;E.state=he,Ga(i,u,E,h),B=i.memoizedState,F!==u||he!==B||Cn.current||or?(typeof pe=="function"&&(tc(i,o,pe,u),B=i.memoizedState),(F=or||Sh(i,o,F,u,he,B,ie))?(_e||typeof E.UNSAFE_componentWillMount!="function"&&typeof E.componentWillMount!="function"||(typeof E.componentWillMount=="function"&&E.componentWillMount(),typeof E.UNSAFE_componentWillMount=="function"&&E.UNSAFE_componentWillMount()),typeof E.componentDidMount=="function"&&(i.flags|=4194308)):(typeof E.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=u,i.memoizedState=B),E.props=u,E.state=B,E.context=ie,u=F):(typeof E.componentDidMount=="function"&&(i.flags|=4194308),u=!1)}else{E=i.stateNode,Kf(n,i),F=i.memoizedProps,ie=i.type===i.elementType?F:si(i.type,F),E.props=ie,_e=i.pendingProps,he=E.context,B=o.contextType,typeof B=="object"&&B!==null?B=qn(B):(B=Rn(o)?Ur:dn.current,B=vs(i,B));var Ie=o.getDerivedStateFromProps;(pe=typeof Ie=="function"||typeof E.getSnapshotBeforeUpdate=="function")||typeof E.UNSAFE_componentWillReceiveProps!="function"&&typeof E.componentWillReceiveProps!="function"||(F!==_e||he!==B)&&Eh(i,E,u,B),or=!1,he=i.memoizedState,E.state=he,Ga(i,u,E,h);var Oe=i.memoizedState;F!==_e||he!==Oe||Cn.current||or?(typeof Ie=="function"&&(tc(i,o,Ie,u),Oe=i.memoizedState),(ie=or||Sh(i,o,ie,u,he,Oe,B)||!1)?(pe||typeof E.UNSAFE_componentWillUpdate!="function"&&typeof E.componentWillUpdate!="function"||(typeof E.componentWillUpdate=="function"&&E.componentWillUpdate(u,Oe,B),typeof E.UNSAFE_componentWillUpdate=="function"&&E.UNSAFE_componentWillUpdate(u,Oe,B)),typeof E.componentDidUpdate=="function"&&(i.flags|=4),typeof E.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof E.componentDidUpdate!="function"||F===n.memoizedProps&&he===n.memoizedState||(i.flags|=4),typeof E.getSnapshotBeforeUpdate!="function"||F===n.memoizedProps&&he===n.memoizedState||(i.flags|=1024),i.memoizedProps=u,i.memoizedState=Oe),E.props=u,E.state=Oe,E.context=B,u=ie):(typeof E.componentDidUpdate!="function"||F===n.memoizedProps&&he===n.memoizedState||(i.flags|=4),typeof E.getSnapshotBeforeUpdate!="function"||F===n.memoizedProps&&he===n.memoizedState||(i.flags|=1024),u=!1)}return oc(n,i,o,u,v,h)}function oc(n,i,o,u,h,v){Ih(n,i);var E=(i.flags&128)!==0;if(!u&&!E)return h&&Bf(i,o,!1),Ii(n,i,v);u=i.stateNode,cv.current=i;var F=E&&typeof o.getDerivedStateFromError!="function"?null:u.render();return i.flags|=1,n!==null&&E?(i.child=Ss(i,n.child,null,v),i.child=Ss(i,null,F,v)):Sn(n,i,F,v),i.memoizedState=u.state,h&&Bf(i,o,!0),i.child}function Uh(n){var i=n.stateNode;i.pendingContext?Of(n,i.pendingContext,i.pendingContext!==i.context):i.context&&Of(n,i.context,!1),Vu(n,i.containerInfo)}function Fh(n,i,o,u,h){return ys(),Fu(h),i.flags|=256,Sn(n,i,o,u),i.child}var ac={dehydrated:null,treeContext:null,retryLane:0};function lc(n){return{baseLanes:n,cachePool:null,transitions:null}}function Oh(n,i,o){var u=i.pendingProps,h=Ut.current,v=!1,E=(i.flags&128)!==0,F;if((F=E)||(F=n!==null&&n.memoizedState===null?!1:(h&2)!==0),F?(v=!0,i.flags&=-129):(n===null||n.memoizedState!==null)&&(h|=1),bt(Ut,h&1),n===null)return Uu(i),n=i.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?((i.mode&1)===0?i.lanes=1:n.data==="$!"?i.lanes=8:i.lanes=1073741824,null):(E=u.children,n=u.fallback,v?(u=i.mode,v=i.child,E={mode:"hidden",children:E},(u&1)===0&&v!==null?(v.childLanes=0,v.pendingProps=E):v=ul(E,u,0,null),n=jr(n,u,o,null),v.return=i,n.return=i,v.sibling=n,i.child=v,i.child.memoizedState=lc(o),i.memoizedState=ac,n):uc(i,E));if(h=n.memoizedState,h!==null&&(F=h.dehydrated,F!==null))return dv(n,i,E,u,F,h,o);if(v){v=u.fallback,E=i.mode,h=n.child,F=h.sibling;var B={mode:"hidden",children:u.children};return(E&1)===0&&i.child!==h?(u=i.child,u.childLanes=0,u.pendingProps=B,i.deletions=null):(u=hr(h,B),u.subtreeFlags=h.subtreeFlags&14680064),F!==null?v=hr(F,v):(v=jr(v,E,o,null),v.flags|=2),v.return=i,u.return=i,u.sibling=v,i.child=u,u=v,v=i.child,E=n.child.memoizedState,E=E===null?lc(o):{baseLanes:E.baseLanes|o,cachePool:null,transitions:E.transitions},v.memoizedState=E,v.childLanes=n.childLanes&~o,i.memoizedState=ac,u}return v=n.child,n=v.sibling,u=hr(v,{mode:"visible",children:u.children}),(i.mode&1)===0&&(u.lanes=o),u.return=i,u.sibling=null,n!==null&&(o=i.deletions,o===null?(i.deletions=[n],i.flags|=16):o.push(n)),i.child=u,i.memoizedState=null,u}function uc(n,i){return i=ul({mode:"visible",children:i},n.mode,0,null),i.return=n,n.child=i}function Ka(n,i,o,u){return u!==null&&Fu(u),Ss(i,n.child,null,o),n=uc(i,i.pendingProps.children),n.flags|=2,i.memoizedState=null,n}function dv(n,i,o,u,h,v,E){if(o)return i.flags&256?(i.flags&=-257,u=ic(Error(t(422))),Ka(n,i,E,u)):i.memoizedState!==null?(i.child=n.child,i.flags|=128,null):(v=u.fallback,h=i.mode,u=ul({mode:"visible",children:u.children},h,0,null),v=jr(v,h,E,null),v.flags|=2,u.return=i,v.return=i,u.sibling=v,i.child=u,(i.mode&1)!==0&&Ss(i,n.child,null,E),i.child.memoizedState=lc(E),i.memoizedState=ac,v);if((i.mode&1)===0)return Ka(n,i,E,null);if(h.data==="$!"){if(u=h.nextSibling&&h.nextSibling.dataset,u)var F=u.dgst;return u=F,v=Error(t(419)),u=ic(v,u,void 0),Ka(n,i,E,u)}if(F=(E&n.childLanes)!==0,bn||F){if(u=tn,u!==null){switch(E&-E){case 4:h=2;break;case 16:h=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:h=32;break;case 536870912:h=268435456;break;default:h=0}h=(h&(u.suspendedLanes|E))!==0?0:h,h!==0&&h!==v.retryLane&&(v.retryLane=h,Li(n,h),li(u,n,h,-1))}return wc(),u=ic(Error(t(421))),Ka(n,i,E,u)}return h.data==="$?"?(i.flags|=128,i.child=n.child,i=Tv.bind(null,n),h._reactRetry=i,null):(n=v.treeContext,Hn=nr(h.nextSibling),zn=i,Nt=!0,ri=null,n!==null&&(Xn[Yn++]=bi,Xn[Yn++]=Pi,Xn[Yn++]=Fr,bi=n.id,Pi=n.overflow,Fr=i),i=uc(i,u.children),i.flags|=4096,i)}function kh(n,i,o){n.lanes|=i;var u=n.alternate;u!==null&&(u.lanes|=i),zu(n.return,i,o)}function cc(n,i,o,u,h){var v=n.memoizedState;v===null?n.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:u,tail:o,tailMode:h}:(v.isBackwards=i,v.rendering=null,v.renderingStartTime=0,v.last=u,v.tail=o,v.tailMode=h)}function Bh(n,i,o){var u=i.pendingProps,h=u.revealOrder,v=u.tail;if(Sn(n,i,u.children,o),u=Ut.current,(u&2)!==0)u=u&1|2,i.flags|=128;else{if(n!==null&&(n.flags&128)!==0)e:for(n=i.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&kh(n,o,i);else if(n.tag===19)kh(n,o,i);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===i)break e;for(;n.sibling===null;){if(n.return===null||n.return===i)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}u&=1}if(bt(Ut,u),(i.mode&1)===0)i.memoizedState=null;else switch(h){case"forwards":for(o=i.child,h=null;o!==null;)n=o.alternate,n!==null&&Va(n)===null&&(h=o),o=o.sibling;o=h,o===null?(h=i.child,i.child=null):(h=o.sibling,o.sibling=null),cc(i,!1,h,o,v);break;case"backwards":for(o=null,h=i.child,i.child=null;h!==null;){if(n=h.alternate,n!==null&&Va(n)===null){i.child=h;break}n=h.sibling,h.sibling=o,o=h,h=n}cc(i,!0,o,null,v);break;case"together":cc(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function Za(n,i){(i.mode&1)===0&&n!==null&&(n.alternate=null,i.alternate=null,i.flags|=2)}function Ii(n,i,o){if(n!==null&&(i.dependencies=n.dependencies),Hr|=i.lanes,(o&i.childLanes)===0)return null;if(n!==null&&i.child!==n.child)throw Error(t(153));if(i.child!==null){for(n=i.child,o=hr(n,n.pendingProps),i.child=o,o.return=i;n.sibling!==null;)n=n.sibling,o=o.sibling=hr(n,n.pendingProps),o.return=i;o.sibling=null}return i.child}function fv(n,i,o){switch(i.tag){case 3:Uh(i),ys();break;case 5:Jf(i);break;case 1:Rn(i.type)&&Ia(i);break;case 4:Vu(i,i.stateNode.containerInfo);break;case 10:var u=i.type._context,h=i.memoizedProps.value;bt(Ba,u._currentValue),u._currentValue=h;break;case 13:if(u=i.memoizedState,u!==null)return u.dehydrated!==null?(bt(Ut,Ut.current&1),i.flags|=128,null):(o&i.child.childLanes)!==0?Oh(n,i,o):(bt(Ut,Ut.current&1),n=Ii(n,i,o),n!==null?n.sibling:null);bt(Ut,Ut.current&1);break;case 19:if(u=(o&i.childLanes)!==0,(n.flags&128)!==0){if(u)return Bh(n,i,o);i.flags|=128}if(h=i.memoizedState,h!==null&&(h.rendering=null,h.tail=null,h.lastEffect=null),bt(Ut,Ut.current),u)break;return null;case 22:case 23:return i.lanes=0,Dh(n,i,o)}return Ii(n,i,o)}var zh,dc,Hh,Gh;zh=function(n,i){for(var o=i.child;o!==null;){if(o.tag===5||o.tag===6)n.appendChild(o.stateNode);else if(o.tag!==4&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===i)break;for(;o.sibling===null;){if(o.return===null||o.return===i)return;o=o.return}o.sibling.return=o.return,o=o.sibling}},dc=function(){},Hh=function(n,i,o,u){var h=n.memoizedProps;if(h!==u){n=i.stateNode,Br(_i.current);var v=null;switch(o){case"input":h=je(n,h),u=je(n,u),v=[];break;case"select":h=z({},h,{value:void 0}),u=z({},u,{value:void 0}),v=[];break;case"textarea":h=ye(n,h),u=ye(n,u),v=[];break;default:typeof h.onClick!="function"&&typeof u.onClick=="function"&&(n.onclick=Pa)}nt(o,u);var E;o=null;for(ie in h)if(!u.hasOwnProperty(ie)&&h.hasOwnProperty(ie)&&h[ie]!=null)if(ie==="style"){var F=h[ie];for(E in F)F.hasOwnProperty(E)&&(o||(o={}),o[E]="")}else ie!=="dangerouslySetInnerHTML"&&ie!=="children"&&ie!=="suppressContentEditableWarning"&&ie!=="suppressHydrationWarning"&&ie!=="autoFocus"&&(a.hasOwnProperty(ie)?v||(v=[]):(v=v||[]).push(ie,null));for(ie in u){var B=u[ie];if(F=h?.[ie],u.hasOwnProperty(ie)&&B!==F&&(B!=null||F!=null))if(ie==="style")if(F){for(E in F)!F.hasOwnProperty(E)||B&&B.hasOwnProperty(E)||(o||(o={}),o[E]="");for(E in B)B.hasOwnProperty(E)&&F[E]!==B[E]&&(o||(o={}),o[E]=B[E])}else o||(v||(v=[]),v.push(ie,o)),o=B;else ie==="dangerouslySetInnerHTML"?(B=B?B.__html:void 0,F=F?F.__html:void 0,B!=null&&F!==B&&(v=v||[]).push(ie,B)):ie==="children"?typeof B!="string"&&typeof B!="number"||(v=v||[]).push(ie,""+B):ie!=="suppressContentEditableWarning"&&ie!=="suppressHydrationWarning"&&(a.hasOwnProperty(ie)?(B!=null&&ie==="onScroll"&&Pt("scroll",n),v||F===B||(v=[])):(v=v||[]).push(ie,B))}o&&(v=v||[]).push("style",o);var ie=v;(i.updateQueue=ie)&&(i.flags|=4)}},Gh=function(n,i,o,u){o!==u&&(i.flags|=4)};function Uo(n,i){if(!Nt)switch(n.tailMode){case"hidden":i=n.tail;for(var o=null;i!==null;)i.alternate!==null&&(o=i),i=i.sibling;o===null?n.tail=null:o.sibling=null;break;case"collapsed":o=n.tail;for(var u=null;o!==null;)o.alternate!==null&&(u=o),o=o.sibling;u===null?i||n.tail===null?n.tail=null:n.tail.sibling=null:u.sibling=null}}function hn(n){var i=n.alternate!==null&&n.alternate.child===n.child,o=0,u=0;if(i)for(var h=n.child;h!==null;)o|=h.lanes|h.childLanes,u|=h.subtreeFlags&14680064,u|=h.flags&14680064,h.return=n,h=h.sibling;else for(h=n.child;h!==null;)o|=h.lanes|h.childLanes,u|=h.subtreeFlags,u|=h.flags,h.return=n,h=h.sibling;return n.subtreeFlags|=u,n.childLanes=o,i}function hv(n,i,o){var u=i.pendingProps;switch(Iu(i),i.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return hn(i),null;case 1:return Rn(i.type)&&Da(),hn(i),null;case 3:return u=i.stateNode,Ts(),Lt(Cn),Lt(dn),Xu(),u.pendingContext&&(u.context=u.pendingContext,u.pendingContext=null),(n===null||n.child===null)&&(Oa(i)?i.flags|=4:n===null||n.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,ri!==null&&(Mc(ri),ri=null))),dc(n,i),hn(i),null;case 5:Wu(i);var h=Br(Po.current);if(o=i.type,n!==null&&i.stateNode!=null)Hh(n,i,o,u,h),n.ref!==i.ref&&(i.flags|=512,i.flags|=2097152);else{if(!u){if(i.stateNode===null)throw Error(t(166));return hn(i),null}if(n=Br(_i.current),Oa(i)){u=i.stateNode,o=i.type;var v=i.memoizedProps;switch(u[vi]=i,u[wo]=v,n=(i.mode&1)!==0,o){case"dialog":Pt("cancel",u),Pt("close",u);break;case"iframe":case"object":case"embed":Pt("load",u);break;case"video":case"audio":for(h=0;h<Mo.length;h++)Pt(Mo[h],u);break;case"source":Pt("error",u);break;case"img":case"image":case"link":Pt("error",u),Pt("load",u);break;case"details":Pt("toggle",u);break;case"input":tt(u,v),Pt("invalid",u);break;case"select":u._wrapperState={wasMultiple:!!v.multiple},Pt("invalid",u);break;case"textarea":ve(u,v),Pt("invalid",u)}nt(o,v),h=null;for(var E in v)if(v.hasOwnProperty(E)){var F=v[E];E==="children"?typeof F=="string"?u.textContent!==F&&(v.suppressHydrationWarning!==!0&&ba(u.textContent,F,n),h=["children",F]):typeof F=="number"&&u.textContent!==""+F&&(v.suppressHydrationWarning!==!0&&ba(u.textContent,F,n),h=["children",""+F]):a.hasOwnProperty(E)&&F!=null&&E==="onScroll"&&Pt("scroll",u)}switch(o){case"input":at(u),rt(u,v,!0);break;case"textarea":at(u),Ge(u);break;case"select":case"option":break;default:typeof v.onClick=="function"&&(u.onclick=Pa)}u=h,i.updateQueue=u,u!==null&&(i.flags|=4)}else{E=h.nodeType===9?h:h.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=Le(o)),n==="http://www.w3.org/1999/xhtml"?o==="script"?(n=E.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof u.is=="string"?n=E.createElement(o,{is:u.is}):(n=E.createElement(o),o==="select"&&(E=n,u.multiple?E.multiple=!0:u.size&&(E.size=u.size))):n=E.createElementNS(n,o),n[vi]=i,n[wo]=u,zh(n,i,!1,!1),i.stateNode=n;e:{switch(E=gt(o,u),o){case"dialog":Pt("cancel",n),Pt("close",n),h=u;break;case"iframe":case"object":case"embed":Pt("load",n),h=u;break;case"video":case"audio":for(h=0;h<Mo.length;h++)Pt(Mo[h],n);h=u;break;case"source":Pt("error",n),h=u;break;case"img":case"image":case"link":Pt("error",n),Pt("load",n),h=u;break;case"details":Pt("toggle",n),h=u;break;case"input":tt(n,u),h=je(n,u),Pt("invalid",n);break;case"option":h=u;break;case"select":n._wrapperState={wasMultiple:!!u.multiple},h=z({},u,{value:void 0}),Pt("invalid",n);break;case"textarea":ve(n,u),h=ye(n,u),Pt("invalid",n);break;default:h=u}nt(o,h),F=h;for(v in F)if(F.hasOwnProperty(v)){var B=F[v];v==="style"?We(n,B):v==="dangerouslySetInnerHTML"?(B=B?B.__html:void 0,B!=null&&st(n,B)):v==="children"?typeof B=="string"?(o!=="textarea"||B!=="")&&me(n,B):typeof B=="number"&&me(n,""+B):v!=="suppressContentEditableWarning"&&v!=="suppressHydrationWarning"&&v!=="autoFocus"&&(a.hasOwnProperty(v)?B!=null&&v==="onScroll"&&Pt("scroll",n):B!=null&&w(n,v,B,E))}switch(o){case"input":at(n),rt(n,u,!1);break;case"textarea":at(n),Ge(n);break;case"option":u.value!=null&&n.setAttribute("value",""+Ee(u.value));break;case"select":n.multiple=!!u.multiple,v=u.value,v!=null?ne(n,!!u.multiple,v,!1):u.defaultValue!=null&&ne(n,!!u.multiple,u.defaultValue,!0);break;default:typeof h.onClick=="function"&&(n.onclick=Pa)}switch(o){case"button":case"input":case"select":case"textarea":u=!!u.autoFocus;break e;case"img":u=!0;break e;default:u=!1}}u&&(i.flags|=4)}i.ref!==null&&(i.flags|=512,i.flags|=2097152)}return hn(i),null;case 6:if(n&&i.stateNode!=null)Gh(n,i,n.memoizedProps,u);else{if(typeof u!="string"&&i.stateNode===null)throw Error(t(166));if(o=Br(Po.current),Br(_i.current),Oa(i)){if(u=i.stateNode,o=i.memoizedProps,u[vi]=i,(v=u.nodeValue!==o)&&(n=zn,n!==null))switch(n.tag){case 3:ba(u.nodeValue,o,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&ba(u.nodeValue,o,(n.mode&1)!==0)}v&&(i.flags|=4)}else u=(o.nodeType===9?o:o.ownerDocument).createTextNode(u),u[vi]=i,i.stateNode=u}return hn(i),null;case 13:if(Lt(Ut),u=i.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(Nt&&Hn!==null&&(i.mode&1)!==0&&(i.flags&128)===0)jf(),ys(),i.flags|=98560,v=!1;else if(v=Oa(i),u!==null&&u.dehydrated!==null){if(n===null){if(!v)throw Error(t(318));if(v=i.memoizedState,v=v!==null?v.dehydrated:null,!v)throw Error(t(317));v[vi]=i}else ys(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;hn(i),v=!1}else ri!==null&&(Mc(ri),ri=null),v=!0;if(!v)return i.flags&65536?i:null}return(i.flags&128)!==0?(i.lanes=o,i):(u=u!==null,u!==(n!==null&&n.memoizedState!==null)&&u&&(i.child.flags|=8192,(i.mode&1)!==0&&(n===null||(Ut.current&1)!==0?$t===0&&($t=3):wc())),i.updateQueue!==null&&(i.flags|=4),hn(i),null);case 4:return Ts(),dc(n,i),n===null&&Eo(i.stateNode.containerInfo),hn(i),null;case 10:return Bu(i.type._context),hn(i),null;case 17:return Rn(i.type)&&Da(),hn(i),null;case 19:if(Lt(Ut),v=i.memoizedState,v===null)return hn(i),null;if(u=(i.flags&128)!==0,E=v.rendering,E===null)if(u)Uo(v,!1);else{if($t!==0||n!==null&&(n.flags&128)!==0)for(n=i.child;n!==null;){if(E=Va(n),E!==null){for(i.flags|=128,Uo(v,!1),u=E.updateQueue,u!==null&&(i.updateQueue=u,i.flags|=4),i.subtreeFlags=0,u=o,o=i.child;o!==null;)v=o,n=u,v.flags&=14680066,E=v.alternate,E===null?(v.childLanes=0,v.lanes=n,v.child=null,v.subtreeFlags=0,v.memoizedProps=null,v.memoizedState=null,v.updateQueue=null,v.dependencies=null,v.stateNode=null):(v.childLanes=E.childLanes,v.lanes=E.lanes,v.child=E.child,v.subtreeFlags=0,v.deletions=null,v.memoizedProps=E.memoizedProps,v.memoizedState=E.memoizedState,v.updateQueue=E.updateQueue,v.type=E.type,n=E.dependencies,v.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),o=o.sibling;return bt(Ut,Ut.current&1|2),i.child}n=n.sibling}v.tail!==null&&Ne()>Rs&&(i.flags|=128,u=!0,Uo(v,!1),i.lanes=4194304)}else{if(!u)if(n=Va(E),n!==null){if(i.flags|=128,u=!0,o=n.updateQueue,o!==null&&(i.updateQueue=o,i.flags|=4),Uo(v,!0),v.tail===null&&v.tailMode==="hidden"&&!E.alternate&&!Nt)return hn(i),null}else 2*Ne()-v.renderingStartTime>Rs&&o!==1073741824&&(i.flags|=128,u=!0,Uo(v,!1),i.lanes=4194304);v.isBackwards?(E.sibling=i.child,i.child=E):(o=v.last,o!==null?o.sibling=E:i.child=E,v.last=E)}return v.tail!==null?(i=v.tail,v.rendering=i,v.tail=i.sibling,v.renderingStartTime=Ne(),i.sibling=null,o=Ut.current,bt(Ut,u?o&1|2:o&1),i):(hn(i),null);case 22:case 23:return Tc(),u=i.memoizedState!==null,n!==null&&n.memoizedState!==null!==u&&(i.flags|=8192),u&&(i.mode&1)!==0?(Gn&1073741824)!==0&&(hn(i),i.subtreeFlags&6&&(i.flags|=8192)):hn(i),null;case 24:return null;case 25:return null}throw Error(t(156,i.tag))}function pv(n,i){switch(Iu(i),i.tag){case 1:return Rn(i.type)&&Da(),n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 3:return Ts(),Lt(Cn),Lt(dn),Xu(),n=i.flags,(n&65536)!==0&&(n&128)===0?(i.flags=n&-65537|128,i):null;case 5:return Wu(i),null;case 13:if(Lt(Ut),n=i.memoizedState,n!==null&&n.dehydrated!==null){if(i.alternate===null)throw Error(t(340));ys()}return n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 19:return Lt(Ut),null;case 4:return Ts(),null;case 10:return Bu(i.type._context),null;case 22:case 23:return Tc(),null;case 24:return null;default:return null}}var Qa=!1,pn=!1,mv=typeof WeakSet=="function"?WeakSet:Set,Ue=null;function As(n,i){var o=n.ref;if(o!==null)if(typeof o=="function")try{o(null)}catch(u){Bt(n,i,u)}else o.current=null}function fc(n,i,o){try{o()}catch(u){Bt(n,i,u)}}var Vh=!1;function gv(n,i){if(Tu=_a,n=Sf(),gu(n)){if("selectionStart"in n)var o={start:n.selectionStart,end:n.selectionEnd};else e:{o=(o=n.ownerDocument)&&o.defaultView||window;var u=o.getSelection&&o.getSelection();if(u&&u.rangeCount!==0){o=u.anchorNode;var h=u.anchorOffset,v=u.focusNode;u=u.focusOffset;try{o.nodeType,v.nodeType}catch{o=null;break e}var E=0,F=-1,B=-1,ie=0,pe=0,_e=n,he=null;t:for(;;){for(var Ie;_e!==o||h!==0&&_e.nodeType!==3||(F=E+h),_e!==v||u!==0&&_e.nodeType!==3||(B=E+u),_e.nodeType===3&&(E+=_e.nodeValue.length),(Ie=_e.firstChild)!==null;)he=_e,_e=Ie;for(;;){if(_e===n)break t;if(he===o&&++ie===h&&(F=E),he===v&&++pe===u&&(B=E),(Ie=_e.nextSibling)!==null)break;_e=he,he=_e.parentNode}_e=Ie}o=F===-1||B===-1?null:{start:F,end:B}}else o=null}o=o||{start:0,end:0}}else o=null;for(wu={focusedElem:n,selectionRange:o},_a=!1,Ue=i;Ue!==null;)if(i=Ue,n=i.child,(i.subtreeFlags&1028)!==0&&n!==null)n.return=i,Ue=n;else for(;Ue!==null;){i=Ue;try{var Oe=i.alternate;if((i.flags&1024)!==0)switch(i.tag){case 0:case 11:case 15:break;case 1:if(Oe!==null){var Be=Oe.memoizedProps,Ht=Oe.memoizedState,q=i.stateNode,W=q.getSnapshotBeforeUpdate(i.elementType===i.type?Be:si(i.type,Be),Ht);q.__reactInternalSnapshotBeforeUpdate=W}break;case 3:var ee=i.stateNode.containerInfo;ee.nodeType===1?ee.textContent="":ee.nodeType===9&&ee.documentElement&&ee.removeChild(ee.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(t(163))}}catch(Te){Bt(i,i.return,Te)}if(n=i.sibling,n!==null){n.return=i.return,Ue=n;break}Ue=i.return}return Oe=Vh,Vh=!1,Oe}function Fo(n,i,o){var u=i.updateQueue;if(u=u!==null?u.lastEffect:null,u!==null){var h=u=u.next;do{if((h.tag&n)===n){var v=h.destroy;h.destroy=void 0,v!==void 0&&fc(i,o,v)}h=h.next}while(h!==u)}}function Ja(n,i){if(i=i.updateQueue,i=i!==null?i.lastEffect:null,i!==null){var o=i=i.next;do{if((o.tag&n)===n){var u=o.create;o.destroy=u()}o=o.next}while(o!==i)}}function hc(n){var i=n.ref;if(i!==null){var o=n.stateNode;n.tag,n=o,typeof i=="function"?i(n):i.current=n}}function Wh(n){var i=n.alternate;i!==null&&(n.alternate=null,Wh(i)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(i=n.stateNode,i!==null&&(delete i[vi],delete i[wo],delete i[bu],delete i[Q0],delete i[J0])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function jh(n){return n.tag===5||n.tag===3||n.tag===4}function Xh(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||jh(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function pc(n,i,o){var u=n.tag;if(u===5||u===6)n=n.stateNode,i?o.nodeType===8?o.parentNode.insertBefore(n,i):o.insertBefore(n,i):(o.nodeType===8?(i=o.parentNode,i.insertBefore(n,o)):(i=o,i.appendChild(n)),o=o._reactRootContainer,o!=null||i.onclick!==null||(i.onclick=Pa));else if(u!==4&&(n=n.child,n!==null))for(pc(n,i,o),n=n.sibling;n!==null;)pc(n,i,o),n=n.sibling}function mc(n,i,o){var u=n.tag;if(u===5||u===6)n=n.stateNode,i?o.insertBefore(n,i):o.appendChild(n);else if(u!==4&&(n=n.child,n!==null))for(mc(n,i,o),n=n.sibling;n!==null;)mc(n,i,o),n=n.sibling}var on=null,oi=!1;function lr(n,i,o){for(o=o.child;o!==null;)Yh(n,i,o),o=o.sibling}function Yh(n,i,o){if(mt&&typeof mt.onCommitFiberUnmount=="function")try{mt.onCommitFiberUnmount(wn,o)}catch{}switch(o.tag){case 5:pn||As(o,i);case 6:var u=on,h=oi;on=null,lr(n,i,o),on=u,oi=h,on!==null&&(oi?(n=on,o=o.stateNode,n.nodeType===8?n.parentNode.removeChild(o):n.removeChild(o)):on.removeChild(o.stateNode));break;case 18:on!==null&&(oi?(n=on,o=o.stateNode,n.nodeType===8?Ru(n.parentNode,o):n.nodeType===1&&Ru(n,o),po(n)):Ru(on,o.stateNode));break;case 4:u=on,h=oi,on=o.stateNode.containerInfo,oi=!0,lr(n,i,o),on=u,oi=h;break;case 0:case 11:case 14:case 15:if(!pn&&(u=o.updateQueue,u!==null&&(u=u.lastEffect,u!==null))){h=u=u.next;do{var v=h,E=v.destroy;v=v.tag,E!==void 0&&((v&2)!==0||(v&4)!==0)&&fc(o,i,E),h=h.next}while(h!==u)}lr(n,i,o);break;case 1:if(!pn&&(As(o,i),u=o.stateNode,typeof u.componentWillUnmount=="function"))try{u.props=o.memoizedProps,u.state=o.memoizedState,u.componentWillUnmount()}catch(F){Bt(o,i,F)}lr(n,i,o);break;case 21:lr(n,i,o);break;case 22:o.mode&1?(pn=(u=pn)||o.memoizedState!==null,lr(n,i,o),pn=u):lr(n,i,o);break;default:lr(n,i,o)}}function qh(n){var i=n.updateQueue;if(i!==null){n.updateQueue=null;var o=n.stateNode;o===null&&(o=n.stateNode=new mv),i.forEach(function(u){var h=wv.bind(null,n,u);o.has(u)||(o.add(u),u.then(h,h))})}}function ai(n,i){var o=i.deletions;if(o!==null)for(var u=0;u<o.length;u++){var h=o[u];try{var v=n,E=i,F=E;e:for(;F!==null;){switch(F.tag){case 5:on=F.stateNode,oi=!1;break e;case 3:on=F.stateNode.containerInfo,oi=!0;break e;case 4:on=F.stateNode.containerInfo,oi=!0;break e}F=F.return}if(on===null)throw Error(t(160));Yh(v,E,h),on=null,oi=!1;var B=h.alternate;B!==null&&(B.return=null),h.return=null}catch(ie){Bt(h,i,ie)}}if(i.subtreeFlags&12854)for(i=i.child;i!==null;)$h(i,n),i=i.sibling}function $h(n,i){var o=n.alternate,u=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(ai(i,n),yi(n),u&4){try{Fo(3,n,n.return),Ja(3,n)}catch(Be){Bt(n,n.return,Be)}try{Fo(5,n,n.return)}catch(Be){Bt(n,n.return,Be)}}break;case 1:ai(i,n),yi(n),u&512&&o!==null&&As(o,o.return);break;case 5:if(ai(i,n),yi(n),u&512&&o!==null&&As(o,o.return),n.flags&32){var h=n.stateNode;try{me(h,"")}catch(Be){Bt(n,n.return,Be)}}if(u&4&&(h=n.stateNode,h!=null)){var v=n.memoizedProps,E=o!==null?o.memoizedProps:v,F=n.type,B=n.updateQueue;if(n.updateQueue=null,B!==null)try{F==="input"&&v.type==="radio"&&v.name!=null&&He(h,v),gt(F,E);var ie=gt(F,v);for(E=0;E<B.length;E+=2){var pe=B[E],_e=B[E+1];pe==="style"?We(h,_e):pe==="dangerouslySetInnerHTML"?st(h,_e):pe==="children"?me(h,_e):w(h,pe,_e,ie)}switch(F){case"input":At(h,v);break;case"textarea":Se(h,v);break;case"select":var he=h._wrapperState.wasMultiple;h._wrapperState.wasMultiple=!!v.multiple;var Ie=v.value;Ie!=null?ne(h,!!v.multiple,Ie,!1):he!==!!v.multiple&&(v.defaultValue!=null?ne(h,!!v.multiple,v.defaultValue,!0):ne(h,!!v.multiple,v.multiple?[]:"",!1))}h[wo]=v}catch(Be){Bt(n,n.return,Be)}}break;case 6:if(ai(i,n),yi(n),u&4){if(n.stateNode===null)throw Error(t(162));h=n.stateNode,v=n.memoizedProps;try{h.nodeValue=v}catch(Be){Bt(n,n.return,Be)}}break;case 3:if(ai(i,n),yi(n),u&4&&o!==null&&o.memoizedState.isDehydrated)try{po(i.containerInfo)}catch(Be){Bt(n,n.return,Be)}break;case 4:ai(i,n),yi(n);break;case 13:ai(i,n),yi(n),h=n.child,h.flags&8192&&(v=h.memoizedState!==null,h.stateNode.isHidden=v,!v||h.alternate!==null&&h.alternate.memoizedState!==null||(_c=Ne())),u&4&&qh(n);break;case 22:if(pe=o!==null&&o.memoizedState!==null,n.mode&1?(pn=(ie=pn)||pe,ai(i,n),pn=ie):ai(i,n),yi(n),u&8192){if(ie=n.memoizedState!==null,(n.stateNode.isHidden=ie)&&!pe&&(n.mode&1)!==0)for(Ue=n,pe=n.child;pe!==null;){for(_e=Ue=pe;Ue!==null;){switch(he=Ue,Ie=he.child,he.tag){case 0:case 11:case 14:case 15:Fo(4,he,he.return);break;case 1:As(he,he.return);var Oe=he.stateNode;if(typeof Oe.componentWillUnmount=="function"){u=he,o=he.return;try{i=u,Oe.props=i.memoizedProps,Oe.state=i.memoizedState,Oe.componentWillUnmount()}catch(Be){Bt(u,o,Be)}}break;case 5:As(he,he.return);break;case 22:if(he.memoizedState!==null){Qh(_e);continue}}Ie!==null?(Ie.return=he,Ue=Ie):Qh(_e)}pe=pe.sibling}e:for(pe=null,_e=n;;){if(_e.tag===5){if(pe===null){pe=_e;try{h=_e.stateNode,ie?(v=h.style,typeof v.setProperty=="function"?v.setProperty("display","none","important"):v.display="none"):(F=_e.stateNode,B=_e.memoizedProps.style,E=B!=null&&B.hasOwnProperty("display")?B.display:null,F.style.display=Je("display",E))}catch(Be){Bt(n,n.return,Be)}}}else if(_e.tag===6){if(pe===null)try{_e.stateNode.nodeValue=ie?"":_e.memoizedProps}catch(Be){Bt(n,n.return,Be)}}else if((_e.tag!==22&&_e.tag!==23||_e.memoizedState===null||_e===n)&&_e.child!==null){_e.child.return=_e,_e=_e.child;continue}if(_e===n)break e;for(;_e.sibling===null;){if(_e.return===null||_e.return===n)break e;pe===_e&&(pe=null),_e=_e.return}pe===_e&&(pe=null),_e.sibling.return=_e.return,_e=_e.sibling}}break;case 19:ai(i,n),yi(n),u&4&&qh(n);break;case 21:break;default:ai(i,n),yi(n)}}function yi(n){var i=n.flags;if(i&2){try{e:{for(var o=n.return;o!==null;){if(jh(o)){var u=o;break e}o=o.return}throw Error(t(160))}switch(u.tag){case 5:var h=u.stateNode;u.flags&32&&(me(h,""),u.flags&=-33);var v=Xh(n);mc(n,v,h);break;case 3:case 4:var E=u.stateNode.containerInfo,F=Xh(n);pc(n,F,E);break;default:throw Error(t(161))}}catch(B){Bt(n,n.return,B)}n.flags&=-3}i&4096&&(n.flags&=-4097)}function vv(n,i,o){Ue=n,Kh(n)}function Kh(n,i,o){for(var u=(n.mode&1)!==0;Ue!==null;){var h=Ue,v=h.child;if(h.tag===22&&u){var E=h.memoizedState!==null||Qa;if(!E){var F=h.alternate,B=F!==null&&F.memoizedState!==null||pn;F=Qa;var ie=pn;if(Qa=E,(pn=B)&&!ie)for(Ue=h;Ue!==null;)E=Ue,B=E.child,E.tag===22&&E.memoizedState!==null?Jh(h):B!==null?(B.return=E,Ue=B):Jh(h);for(;v!==null;)Ue=v,Kh(v),v=v.sibling;Ue=h,Qa=F,pn=ie}Zh(n)}else(h.subtreeFlags&8772)!==0&&v!==null?(v.return=h,Ue=v):Zh(n)}}function Zh(n){for(;Ue!==null;){var i=Ue;if((i.flags&8772)!==0){var o=i.alternate;try{if((i.flags&8772)!==0)switch(i.tag){case 0:case 11:case 15:pn||Ja(5,i);break;case 1:var u=i.stateNode;if(i.flags&4&&!pn)if(o===null)u.componentDidMount();else{var h=i.elementType===i.type?o.memoizedProps:si(i.type,o.memoizedProps);u.componentDidUpdate(h,o.memoizedState,u.__reactInternalSnapshotBeforeUpdate)}var v=i.updateQueue;v!==null&&Qf(i,v,u);break;case 3:var E=i.updateQueue;if(E!==null){if(o=null,i.child!==null)switch(i.child.tag){case 5:o=i.child.stateNode;break;case 1:o=i.child.stateNode}Qf(i,E,o)}break;case 5:var F=i.stateNode;if(o===null&&i.flags&4){o=F;var B=i.memoizedProps;switch(i.type){case"button":case"input":case"select":case"textarea":B.autoFocus&&o.focus();break;case"img":B.src&&(o.src=B.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(i.memoizedState===null){var ie=i.alternate;if(ie!==null){var pe=ie.memoizedState;if(pe!==null){var _e=pe.dehydrated;_e!==null&&po(_e)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(t(163))}pn||i.flags&512&&hc(i)}catch(he){Bt(i,i.return,he)}}if(i===n){Ue=null;break}if(o=i.sibling,o!==null){o.return=i.return,Ue=o;break}Ue=i.return}}function Qh(n){for(;Ue!==null;){var i=Ue;if(i===n){Ue=null;break}var o=i.sibling;if(o!==null){o.return=i.return,Ue=o;break}Ue=i.return}}function Jh(n){for(;Ue!==null;){var i=Ue;try{switch(i.tag){case 0:case 11:case 15:var o=i.return;try{Ja(4,i)}catch(B){Bt(i,o,B)}break;case 1:var u=i.stateNode;if(typeof u.componentDidMount=="function"){var h=i.return;try{u.componentDidMount()}catch(B){Bt(i,h,B)}}var v=i.return;try{hc(i)}catch(B){Bt(i,v,B)}break;case 5:var E=i.return;try{hc(i)}catch(B){Bt(i,E,B)}}}catch(B){Bt(i,i.return,B)}if(i===n){Ue=null;break}var F=i.sibling;if(F!==null){F.return=i.return,Ue=F;break}Ue=i.return}}var _v=Math.ceil,el=R.ReactCurrentDispatcher,gc=R.ReactCurrentOwner,Kn=R.ReactCurrentBatchConfig,vt=0,tn=null,Wt=null,an=0,Gn=0,Cs=ir(0),$t=0,Oo=null,Hr=0,tl=0,vc=0,ko=null,Pn=null,_c=0,Rs=1/0,Ni=null,nl=!1,xc=null,ur=null,il=!1,cr=null,rl=0,Bo=0,yc=null,sl=-1,ol=0;function Mn(){return(vt&6)!==0?Ne():sl!==-1?sl:sl=Ne()}function dr(n){return(n.mode&1)===0?1:(vt&2)!==0&&an!==0?an&-an:tv.transition!==null?(ol===0&&(ol=ma()),ol):(n=Tt,n!==0||(n=window.event,n=n===void 0?16:ef(n.type)),n)}function li(n,i,o,u){if(50<Bo)throw Bo=0,yc=null,Error(t(185));lo(n,o,u),((vt&2)===0||n!==tn)&&(n===tn&&((vt&2)===0&&(tl|=o),$t===4&&fr(n,an)),Ln(n,u),o===1&&vt===0&&(i.mode&1)===0&&(Rs=Ne()+500,Na&&sr()))}function Ln(n,i){var o=n.callbackNode;An(n,i);var u=jn(n,n===tn?an:0);if(u===0)o!==null&&De(o),n.callbackNode=null,n.callbackPriority=0;else if(i=u&-u,n.callbackPriority!==i){if(o!=null&&De(o),i===1)n.tag===0?ev(tp.bind(null,n)):zf(tp.bind(null,n)),K0(function(){(vt&6)===0&&sr()}),o=null;else{switch(Xd(u)){case 1:o=et;break;case 4:o=it;break;case 16:o=Rt;break;case 536870912:o=zt;break;default:o=Rt}o=up(o,ep.bind(null,n))}n.callbackPriority=i,n.callbackNode=o}}function ep(n,i){if(sl=-1,ol=0,(vt&6)!==0)throw Error(t(327));var o=n.callbackNode;if(bs()&&n.callbackNode!==o)return null;var u=jn(n,n===tn?an:0);if(u===0)return null;if((u&30)!==0||(u&n.expiredLanes)!==0||i)i=al(n,u);else{i=u;var h=vt;vt|=2;var v=ip();(tn!==n||an!==i)&&(Ni=null,Rs=Ne()+500,Vr(n,i));do try{Sv();break}catch(F){np(n,F)}while(!0);ku(),el.current=v,vt=h,Wt!==null?i=0:(tn=null,an=0,i=$t)}if(i!==0){if(i===2&&(h=Ir(n),h!==0&&(u=h,i=Sc(n,h))),i===1)throw o=Oo,Vr(n,0),fr(n,u),Ln(n,Ne()),o;if(i===6)fr(n,u);else{if(h=n.current.alternate,(u&30)===0&&!xv(h)&&(i=al(n,u),i===2&&(v=Ir(n),v!==0&&(u=v,i=Sc(n,v))),i===1))throw o=Oo,Vr(n,0),fr(n,u),Ln(n,Ne()),o;switch(n.finishedWork=h,n.finishedLanes=u,i){case 0:case 1:throw Error(t(345));case 2:Wr(n,Pn,Ni);break;case 3:if(fr(n,u),(u&130023424)===u&&(i=_c+500-Ne(),10<i)){if(jn(n,0)!==0)break;if(h=n.suspendedLanes,(h&u)!==u){Mn(),n.pingedLanes|=n.suspendedLanes&h;break}n.timeoutHandle=Cu(Wr.bind(null,n,Pn,Ni),i);break}Wr(n,Pn,Ni);break;case 4:if(fr(n,u),(u&4194240)===u)break;for(i=n.eventTimes,h=-1;0<u;){var E=31-yn(u);v=1<<E,E=i[E],E>h&&(h=E),u&=~v}if(u=h,u=Ne()-u,u=(120>u?120:480>u?480:1080>u?1080:1920>u?1920:3e3>u?3e3:4320>u?4320:1960*_v(u/1960))-u,10<u){n.timeoutHandle=Cu(Wr.bind(null,n,Pn,Ni),u);break}Wr(n,Pn,Ni);break;case 5:Wr(n,Pn,Ni);break;default:throw Error(t(329))}}}return Ln(n,Ne()),n.callbackNode===o?ep.bind(null,n):null}function Sc(n,i){var o=ko;return n.current.memoizedState.isDehydrated&&(Vr(n,i).flags|=256),n=al(n,i),n!==2&&(i=Pn,Pn=o,i!==null&&Mc(i)),n}function Mc(n){Pn===null?Pn=n:Pn.push.apply(Pn,n)}function xv(n){for(var i=n;;){if(i.flags&16384){var o=i.updateQueue;if(o!==null&&(o=o.stores,o!==null))for(var u=0;u<o.length;u++){var h=o[u],v=h.getSnapshot;h=h.value;try{if(!ii(v(),h))return!1}catch{return!1}}}if(o=i.child,i.subtreeFlags&16384&&o!==null)o.return=i,i=o;else{if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function fr(n,i){for(i&=~vc,i&=~tl,n.suspendedLanes|=i,n.pingedLanes&=~i,n=n.expirationTimes;0<i;){var o=31-yn(i),u=1<<o;n[o]=-1,i&=~u}}function tp(n){if((vt&6)!==0)throw Error(t(327));bs();var i=jn(n,0);if((i&1)===0)return Ln(n,Ne()),null;var o=al(n,i);if(n.tag!==0&&o===2){var u=Ir(n);u!==0&&(i=u,o=Sc(n,u))}if(o===1)throw o=Oo,Vr(n,0),fr(n,i),Ln(n,Ne()),o;if(o===6)throw Error(t(345));return n.finishedWork=n.current.alternate,n.finishedLanes=i,Wr(n,Pn,Ni),Ln(n,Ne()),null}function Ec(n,i){var o=vt;vt|=1;try{return n(i)}finally{vt=o,vt===0&&(Rs=Ne()+500,Na&&sr())}}function Gr(n){cr!==null&&cr.tag===0&&(vt&6)===0&&bs();var i=vt;vt|=1;var o=Kn.transition,u=Tt;try{if(Kn.transition=null,Tt=1,n)return n()}finally{Tt=u,Kn.transition=o,vt=i,(vt&6)===0&&sr()}}function Tc(){Gn=Cs.current,Lt(Cs)}function Vr(n,i){n.finishedWork=null,n.finishedLanes=0;var o=n.timeoutHandle;if(o!==-1&&(n.timeoutHandle=-1,$0(o)),Wt!==null)for(o=Wt.return;o!==null;){var u=o;switch(Iu(u),u.tag){case 1:u=u.type.childContextTypes,u!=null&&Da();break;case 3:Ts(),Lt(Cn),Lt(dn),Xu();break;case 5:Wu(u);break;case 4:Ts();break;case 13:Lt(Ut);break;case 19:Lt(Ut);break;case 10:Bu(u.type._context);break;case 22:case 23:Tc()}o=o.return}if(tn=n,Wt=n=hr(n.current,null),an=Gn=i,$t=0,Oo=null,vc=tl=Hr=0,Pn=ko=null,kr!==null){for(i=0;i<kr.length;i++)if(o=kr[i],u=o.interleaved,u!==null){o.interleaved=null;var h=u.next,v=o.pending;if(v!==null){var E=v.next;v.next=h,u.next=E}o.pending=u}kr=null}return n}function np(n,i){do{var o=Wt;try{if(ku(),Wa.current=qa,ja){for(var u=Ft.memoizedState;u!==null;){var h=u.queue;h!==null&&(h.pending=null),u=u.next}ja=!1}if(zr=0,en=qt=Ft=null,Lo=!1,Do=0,gc.current=null,o===null||o.return===null){$t=1,Oo=i,Wt=null;break}e:{var v=n,E=o.return,F=o,B=i;if(i=an,F.flags|=32768,B!==null&&typeof B=="object"&&typeof B.then=="function"){var ie=B,pe=F,_e=pe.tag;if((pe.mode&1)===0&&(_e===0||_e===11||_e===15)){var he=pe.alternate;he?(pe.updateQueue=he.updateQueue,pe.memoizedState=he.memoizedState,pe.lanes=he.lanes):(pe.updateQueue=null,pe.memoizedState=null)}var Ie=Ch(E);if(Ie!==null){Ie.flags&=-257,Rh(Ie,E,F,v,i),Ie.mode&1&&Ah(v,ie,i),i=Ie,B=ie;var Oe=i.updateQueue;if(Oe===null){var Be=new Set;Be.add(B),i.updateQueue=Be}else Oe.add(B);break e}else{if((i&1)===0){Ah(v,ie,i),wc();break e}B=Error(t(426))}}else if(Nt&&F.mode&1){var Ht=Ch(E);if(Ht!==null){(Ht.flags&65536)===0&&(Ht.flags|=256),Rh(Ht,E,F,v,i),Fu(ws(B,F));break e}}v=B=ws(B,F),$t!==4&&($t=2),ko===null?ko=[v]:ko.push(v),v=E;do{switch(v.tag){case 3:v.flags|=65536,i&=-i,v.lanes|=i;var q=Th(v,B,i);Zf(v,q);break e;case 1:F=B;var W=v.type,ee=v.stateNode;if((v.flags&128)===0&&(typeof W.getDerivedStateFromError=="function"||ee!==null&&typeof ee.componentDidCatch=="function"&&(ur===null||!ur.has(ee)))){v.flags|=65536,i&=-i,v.lanes|=i;var Te=wh(v,F,i);Zf(v,Te);break e}}v=v.return}while(v!==null)}sp(o)}catch(ze){i=ze,Wt===o&&o!==null&&(Wt=o=o.return);continue}break}while(!0)}function ip(){var n=el.current;return el.current=qa,n===null?qa:n}function wc(){($t===0||$t===3||$t===2)&&($t=4),tn===null||(Hr&268435455)===0&&(tl&268435455)===0||fr(tn,an)}function al(n,i){var o=vt;vt|=2;var u=ip();(tn!==n||an!==i)&&(Ni=null,Vr(n,i));do try{yv();break}catch(h){np(n,h)}while(!0);if(ku(),vt=o,el.current=u,Wt!==null)throw Error(t(261));return tn=null,an=0,$t}function yv(){for(;Wt!==null;)rp(Wt)}function Sv(){for(;Wt!==null&&!Ve();)rp(Wt)}function rp(n){var i=lp(n.alternate,n,Gn);n.memoizedProps=n.pendingProps,i===null?sp(n):Wt=i,gc.current=null}function sp(n){var i=n;do{var o=i.alternate;if(n=i.return,(i.flags&32768)===0){if(o=hv(o,i,Gn),o!==null){Wt=o;return}}else{if(o=pv(o,i),o!==null){o.flags&=32767,Wt=o;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{$t=6,Wt=null;return}}if(i=i.sibling,i!==null){Wt=i;return}Wt=i=n}while(i!==null);$t===0&&($t=5)}function Wr(n,i,o){var u=Tt,h=Kn.transition;try{Kn.transition=null,Tt=1,Mv(n,i,o,u)}finally{Kn.transition=h,Tt=u}return null}function Mv(n,i,o,u){do bs();while(cr!==null);if((vt&6)!==0)throw Error(t(327));o=n.finishedWork;var h=n.finishedLanes;if(o===null)return null;if(n.finishedWork=null,n.finishedLanes=0,o===n.current)throw Error(t(177));n.callbackNode=null,n.callbackPriority=0;var v=o.lanes|o.childLanes;if(n0(n,v),n===tn&&(Wt=tn=null,an=0),(o.subtreeFlags&2064)===0&&(o.flags&2064)===0||il||(il=!0,up(Rt,function(){return bs(),null})),v=(o.flags&15990)!==0,(o.subtreeFlags&15990)!==0||v){v=Kn.transition,Kn.transition=null;var E=Tt;Tt=1;var F=vt;vt|=4,gc.current=null,gv(n,o),$h(o,n),G0(wu),_a=!!Tu,wu=Tu=null,n.current=o,vv(o),Ke(),vt=F,Tt=E,Kn.transition=v}else n.current=o;if(il&&(il=!1,cr=n,rl=h),v=n.pendingLanes,v===0&&(ur=null),ut(o.stateNode),Ln(n,Ne()),i!==null)for(u=n.onRecoverableError,o=0;o<i.length;o++)h=i[o],u(h.value,{componentStack:h.stack,digest:h.digest});if(nl)throw nl=!1,n=xc,xc=null,n;return(rl&1)!==0&&n.tag!==0&&bs(),v=n.pendingLanes,(v&1)!==0?n===yc?Bo++:(Bo=0,yc=n):Bo=0,sr(),null}function bs(){if(cr!==null){var n=Xd(rl),i=Kn.transition,o=Tt;try{if(Kn.transition=null,Tt=16>n?16:n,cr===null)var u=!1;else{if(n=cr,cr=null,rl=0,(vt&6)!==0)throw Error(t(331));var h=vt;for(vt|=4,Ue=n.current;Ue!==null;){var v=Ue,E=v.child;if((Ue.flags&16)!==0){var F=v.deletions;if(F!==null){for(var B=0;B<F.length;B++){var ie=F[B];for(Ue=ie;Ue!==null;){var pe=Ue;switch(pe.tag){case 0:case 11:case 15:Fo(8,pe,v)}var _e=pe.child;if(_e!==null)_e.return=pe,Ue=_e;else for(;Ue!==null;){pe=Ue;var he=pe.sibling,Ie=pe.return;if(Wh(pe),pe===ie){Ue=null;break}if(he!==null){he.return=Ie,Ue=he;break}Ue=Ie}}}var Oe=v.alternate;if(Oe!==null){var Be=Oe.child;if(Be!==null){Oe.child=null;do{var Ht=Be.sibling;Be.sibling=null,Be=Ht}while(Be!==null)}}Ue=v}}if((v.subtreeFlags&2064)!==0&&E!==null)E.return=v,Ue=E;else e:for(;Ue!==null;){if(v=Ue,(v.flags&2048)!==0)switch(v.tag){case 0:case 11:case 15:Fo(9,v,v.return)}var q=v.sibling;if(q!==null){q.return=v.return,Ue=q;break e}Ue=v.return}}var W=n.current;for(Ue=W;Ue!==null;){E=Ue;var ee=E.child;if((E.subtreeFlags&2064)!==0&&ee!==null)ee.return=E,Ue=ee;else e:for(E=W;Ue!==null;){if(F=Ue,(F.flags&2048)!==0)try{switch(F.tag){case 0:case 11:case 15:Ja(9,F)}}catch(ze){Bt(F,F.return,ze)}if(F===E){Ue=null;break e}var Te=F.sibling;if(Te!==null){Te.return=F.return,Ue=Te;break e}Ue=F.return}}if(vt=h,sr(),mt&&typeof mt.onPostCommitFiberRoot=="function")try{mt.onPostCommitFiberRoot(wn,n)}catch{}u=!0}return u}finally{Tt=o,Kn.transition=i}}return!1}function op(n,i,o){i=ws(o,i),i=Th(n,i,1),n=ar(n,i,1),i=Mn(),n!==null&&(lo(n,1,i),Ln(n,i))}function Bt(n,i,o){if(n.tag===3)op(n,n,o);else for(;i!==null;){if(i.tag===3){op(i,n,o);break}else if(i.tag===1){var u=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof u.componentDidCatch=="function"&&(ur===null||!ur.has(u))){n=ws(o,n),n=wh(i,n,1),i=ar(i,n,1),n=Mn(),i!==null&&(lo(i,1,n),Ln(i,n));break}}i=i.return}}function Ev(n,i,o){var u=n.pingCache;u!==null&&u.delete(i),i=Mn(),n.pingedLanes|=n.suspendedLanes&o,tn===n&&(an&o)===o&&($t===4||$t===3&&(an&130023424)===an&&500>Ne()-_c?Vr(n,0):vc|=o),Ln(n,i)}function ap(n,i){i===0&&((n.mode&1)===0?i=1:(i=$i,$i<<=1,($i&130023424)===0&&($i=4194304)));var o=Mn();n=Li(n,i),n!==null&&(lo(n,i,o),Ln(n,o))}function Tv(n){var i=n.memoizedState,o=0;i!==null&&(o=i.retryLane),ap(n,o)}function wv(n,i){var o=0;switch(n.tag){case 13:var u=n.stateNode,h=n.memoizedState;h!==null&&(o=h.retryLane);break;case 19:u=n.stateNode;break;default:throw Error(t(314))}u!==null&&u.delete(i),ap(n,o)}var lp;lp=function(n,i,o){if(n!==null)if(n.memoizedProps!==i.pendingProps||Cn.current)bn=!0;else{if((n.lanes&o)===0&&(i.flags&128)===0)return bn=!1,fv(n,i,o);bn=(n.flags&131072)!==0}else bn=!1,Nt&&(i.flags&1048576)!==0&&Hf(i,Fa,i.index);switch(i.lanes=0,i.tag){case 2:var u=i.type;Za(n,i),n=i.pendingProps;var h=vs(i,dn.current);Es(i,o),h=$u(null,i,u,n,h,o);var v=Ku();return i.flags|=1,typeof h=="object"&&h!==null&&typeof h.render=="function"&&h.$$typeof===void 0?(i.tag=1,i.memoizedState=null,i.updateQueue=null,Rn(u)?(v=!0,Ia(i)):v=!1,i.memoizedState=h.state!==null&&h.state!==void 0?h.state:null,Gu(i),h.updater=$a,i.stateNode=h,h._reactInternals=i,nc(i,u,n,o),i=oc(null,i,u,!0,v,o)):(i.tag=0,Nt&&v&&Du(i),Sn(null,i,h,o),i=i.child),i;case 16:u=i.elementType;e:{switch(Za(n,i),n=i.pendingProps,h=u._init,u=h(u._payload),i.type=u,h=i.tag=Cv(u),n=si(u,n),h){case 0:i=sc(null,i,u,n,o);break e;case 1:i=Nh(null,i,u,n,o);break e;case 11:i=bh(null,i,u,n,o);break e;case 14:i=Ph(null,i,u,si(u.type,n),o);break e}throw Error(t(306,u,""))}return i;case 0:return u=i.type,h=i.pendingProps,h=i.elementType===u?h:si(u,h),sc(n,i,u,h,o);case 1:return u=i.type,h=i.pendingProps,h=i.elementType===u?h:si(u,h),Nh(n,i,u,h,o);case 3:e:{if(Uh(i),n===null)throw Error(t(387));u=i.pendingProps,v=i.memoizedState,h=v.element,Kf(n,i),Ga(i,u,null,o);var E=i.memoizedState;if(u=E.element,v.isDehydrated)if(v={element:u,isDehydrated:!1,cache:E.cache,pendingSuspenseBoundaries:E.pendingSuspenseBoundaries,transitions:E.transitions},i.updateQueue.baseState=v,i.memoizedState=v,i.flags&256){h=ws(Error(t(423)),i),i=Fh(n,i,u,o,h);break e}else if(u!==h){h=ws(Error(t(424)),i),i=Fh(n,i,u,o,h);break e}else for(Hn=nr(i.stateNode.containerInfo.firstChild),zn=i,Nt=!0,ri=null,o=qf(i,null,u,o),i.child=o;o;)o.flags=o.flags&-3|4096,o=o.sibling;else{if(ys(),u===h){i=Ii(n,i,o);break e}Sn(n,i,u,o)}i=i.child}return i;case 5:return Jf(i),n===null&&Uu(i),u=i.type,h=i.pendingProps,v=n!==null?n.memoizedProps:null,E=h.children,Au(u,h)?E=null:v!==null&&Au(u,v)&&(i.flags|=32),Ih(n,i),Sn(n,i,E,o),i.child;case 6:return n===null&&Uu(i),null;case 13:return Oh(n,i,o);case 4:return Vu(i,i.stateNode.containerInfo),u=i.pendingProps,n===null?i.child=Ss(i,null,u,o):Sn(n,i,u,o),i.child;case 11:return u=i.type,h=i.pendingProps,h=i.elementType===u?h:si(u,h),bh(n,i,u,h,o);case 7:return Sn(n,i,i.pendingProps,o),i.child;case 8:return Sn(n,i,i.pendingProps.children,o),i.child;case 12:return Sn(n,i,i.pendingProps.children,o),i.child;case 10:e:{if(u=i.type._context,h=i.pendingProps,v=i.memoizedProps,E=h.value,bt(Ba,u._currentValue),u._currentValue=E,v!==null)if(ii(v.value,E)){if(v.children===h.children&&!Cn.current){i=Ii(n,i,o);break e}}else for(v=i.child,v!==null&&(v.return=i);v!==null;){var F=v.dependencies;if(F!==null){E=v.child;for(var B=F.firstContext;B!==null;){if(B.context===u){if(v.tag===1){B=Di(-1,o&-o),B.tag=2;var ie=v.updateQueue;if(ie!==null){ie=ie.shared;var pe=ie.pending;pe===null?B.next=B:(B.next=pe.next,pe.next=B),ie.pending=B}}v.lanes|=o,B=v.alternate,B!==null&&(B.lanes|=o),zu(v.return,o,i),F.lanes|=o;break}B=B.next}}else if(v.tag===10)E=v.type===i.type?null:v.child;else if(v.tag===18){if(E=v.return,E===null)throw Error(t(341));E.lanes|=o,F=E.alternate,F!==null&&(F.lanes|=o),zu(E,o,i),E=v.sibling}else E=v.child;if(E!==null)E.return=v;else for(E=v;E!==null;){if(E===i){E=null;break}if(v=E.sibling,v!==null){v.return=E.return,E=v;break}E=E.return}v=E}Sn(n,i,h.children,o),i=i.child}return i;case 9:return h=i.type,u=i.pendingProps.children,Es(i,o),h=qn(h),u=u(h),i.flags|=1,Sn(n,i,u,o),i.child;case 14:return u=i.type,h=si(u,i.pendingProps),h=si(u.type,h),Ph(n,i,u,h,o);case 15:return Lh(n,i,i.type,i.pendingProps,o);case 17:return u=i.type,h=i.pendingProps,h=i.elementType===u?h:si(u,h),Za(n,i),i.tag=1,Rn(u)?(n=!0,Ia(i)):n=!1,Es(i,o),Mh(i,u,h),nc(i,u,h,o),oc(null,i,u,!0,n,o);case 19:return Bh(n,i,o);case 22:return Dh(n,i,o)}throw Error(t(156,i.tag))};function up(n,i){return oe(n,i)}function Av(n,i,o,u){this.tag=n,this.key=o,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=u,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Zn(n,i,o,u){return new Av(n,i,o,u)}function Ac(n){return n=n.prototype,!(!n||!n.isReactComponent)}function Cv(n){if(typeof n=="function")return Ac(n)?1:0;if(n!=null){if(n=n.$$typeof,n===te)return 11;if(n===K)return 14}return 2}function hr(n,i){var o=n.alternate;return o===null?(o=Zn(n.tag,i,n.key,n.mode),o.elementType=n.elementType,o.type=n.type,o.stateNode=n.stateNode,o.alternate=n,n.alternate=o):(o.pendingProps=i,o.type=n.type,o.flags=0,o.subtreeFlags=0,o.deletions=null),o.flags=n.flags&14680064,o.childLanes=n.childLanes,o.lanes=n.lanes,o.child=n.child,o.memoizedProps=n.memoizedProps,o.memoizedState=n.memoizedState,o.updateQueue=n.updateQueue,i=n.dependencies,o.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},o.sibling=n.sibling,o.index=n.index,o.ref=n.ref,o}function ll(n,i,o,u,h,v){var E=2;if(u=n,typeof n=="function")Ac(n)&&(E=1);else if(typeof n=="string")E=5;else e:switch(n){case U:return jr(o.children,h,v,i);case ce:E=8,h|=8;break;case C:return n=Zn(12,o,i,h|2),n.elementType=C,n.lanes=v,n;case de:return n=Zn(13,o,i,h),n.elementType=de,n.lanes=v,n;case k:return n=Zn(19,o,i,h),n.elementType=k,n.lanes=v,n;case Z:return ul(o,h,v,i);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case D:E=10;break e;case Y:E=9;break e;case te:E=11;break e;case K:E=14;break e;case J:E=16,u=null;break e}throw Error(t(130,n==null?n:typeof n,""))}return i=Zn(E,o,i,h),i.elementType=n,i.type=u,i.lanes=v,i}function jr(n,i,o,u){return n=Zn(7,n,u,i),n.lanes=o,n}function ul(n,i,o,u){return n=Zn(22,n,u,i),n.elementType=Z,n.lanes=o,n.stateNode={isHidden:!1},n}function Cc(n,i,o){return n=Zn(6,n,null,i),n.lanes=o,n}function Rc(n,i,o){return i=Zn(4,n.children!==null?n.children:[],n.key,i),i.lanes=o,i.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},i}function Rv(n,i,o,u,h){this.tag=i,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=as(0),this.expirationTimes=as(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=as(0),this.identifierPrefix=u,this.onRecoverableError=h,this.mutableSourceEagerHydrationData=null}function bc(n,i,o,u,h,v,E,F,B){return n=new Rv(n,i,o,F,B),i===1?(i=1,v===!0&&(i|=8)):i=0,v=Zn(3,null,null,i),n.current=v,v.stateNode=n,v.memoizedState={element:u,isDehydrated:o,cache:null,transitions:null,pendingSuspenseBoundaries:null},Gu(v),n}function bv(n,i,o){var u=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:I,key:u==null?null:""+u,children:n,containerInfo:i,implementation:o}}function cp(n){if(!n)return rr;n=n._reactInternals;e:{if(wi(n)!==n||n.tag!==1)throw Error(t(170));var i=n;do{switch(i.tag){case 3:i=i.stateNode.context;break e;case 1:if(Rn(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break e}}i=i.return}while(i!==null);throw Error(t(171))}if(n.tag===1){var o=n.type;if(Rn(o))return kf(n,o,i)}return i}function dp(n,i,o,u,h,v,E,F,B){return n=bc(o,u,!0,n,h,v,E,F,B),n.context=cp(null),o=n.current,u=Mn(),h=dr(o),v=Di(u,h),v.callback=i??null,ar(o,v,h),n.current.lanes=h,lo(n,h,u),Ln(n,u),n}function cl(n,i,o,u){var h=i.current,v=Mn(),E=dr(h);return o=cp(o),i.context===null?i.context=o:i.pendingContext=o,i=Di(v,E),i.payload={element:n},u=u===void 0?null:u,u!==null&&(i.callback=u),n=ar(h,i,E),n!==null&&(li(n,h,E,v),Ha(n,h,E)),E}function dl(n){return n=n.current,n.child?(n.child.tag===5,n.child.stateNode):null}function fp(n,i){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var o=n.retryLane;n.retryLane=o!==0&&o<i?o:i}}function Pc(n,i){fp(n,i),(n=n.alternate)&&fp(n,i)}function Pv(){return null}var hp=typeof reportError=="function"?reportError:function(n){console.error(n)};function Lc(n){this._internalRoot=n}fl.prototype.render=Lc.prototype.render=function(n){var i=this._internalRoot;if(i===null)throw Error(t(409));cl(n,i,null,null)},fl.prototype.unmount=Lc.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var i=n.containerInfo;Gr(function(){cl(null,n,null,null)}),i[Ci]=null}};function fl(n){this._internalRoot=n}fl.prototype.unstable_scheduleHydration=function(n){if(n){var i=$d();n={blockedOn:null,target:n,priority:i};for(var o=0;o<Ji.length&&i!==0&&i<Ji[o].priority;o++);Ji.splice(o,0,n),o===0&&Qd(n)}};function Dc(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function hl(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function pp(){}function Lv(n,i,o,u,h){if(h){if(typeof u=="function"){var v=u;u=function(){var ie=dl(E);v.call(ie)}}var E=dp(i,u,n,0,null,!1,!1,"",pp);return n._reactRootContainer=E,n[Ci]=E.current,Eo(n.nodeType===8?n.parentNode:n),Gr(),E}for(;h=n.lastChild;)n.removeChild(h);if(typeof u=="function"){var F=u;u=function(){var ie=dl(B);F.call(ie)}}var B=bc(n,0,!1,null,null,!1,!1,"",pp);return n._reactRootContainer=B,n[Ci]=B.current,Eo(n.nodeType===8?n.parentNode:n),Gr(function(){cl(i,B,o,u)}),B}function pl(n,i,o,u,h){var v=o._reactRootContainer;if(v){var E=v;if(typeof h=="function"){var F=h;h=function(){var B=dl(E);F.call(B)}}cl(i,E,n,h)}else E=Lv(o,i,n,h,u);return dl(E)}Yd=function(n){switch(n.tag){case 3:var i=n.stateNode;if(i.current.memoizedState.isDehydrated){var o=kt(i.pendingLanes);o!==0&&(nu(i,o|1),Ln(i,Ne()),(vt&6)===0&&(Rs=Ne()+500,sr()))}break;case 13:Gr(function(){var u=Li(n,1);if(u!==null){var h=Mn();li(u,n,1,h)}}),Pc(n,1)}},iu=function(n){if(n.tag===13){var i=Li(n,134217728);if(i!==null){var o=Mn();li(i,n,134217728,o)}Pc(n,134217728)}},qd=function(n){if(n.tag===13){var i=dr(n),o=Li(n,i);if(o!==null){var u=Mn();li(o,n,i,u)}Pc(n,i)}},$d=function(){return Tt},Kd=function(n,i){var o=Tt;try{return Tt=n,i()}finally{Tt=o}},Ae=function(n,i,o){switch(i){case"input":if(At(n,o),i=o.name,o.type==="radio"&&i!=null){for(o=n;o.parentNode;)o=o.parentNode;for(o=o.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),i=0;i<o.length;i++){var u=o[i];if(u!==n&&u.form===n.form){var h=La(u);if(!h)throw Error(t(90));se(u),At(u,h)}}}break;case"textarea":Se(n,o);break;case"select":i=o.value,i!=null&&ne(n,!!o.multiple,i,!1)}},Mt=Ec,Et=Gr;var Dv={usingClientEntryPoint:!1,Events:[Ao,ms,La,Ze,Ye,Ec]},zo={findFiberByHostInstance:Nr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Iv={bundleType:zo.bundleType,version:zo.version,rendererPackageName:zo.rendererPackageName,rendererConfig:zo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:R.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=ae(n),n===null?null:n.stateNode},findFiberByHostInstance:zo.findFiberByHostInstance||Pv,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ml=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ml.isDisabled&&ml.supportsFiber)try{wn=ml.inject(Iv),mt=ml}catch{}}return Dn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Dv,Dn.createPortal=function(n,i){var o=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Dc(i))throw Error(t(200));return bv(n,i,null,o)},Dn.createRoot=function(n,i){if(!Dc(n))throw Error(t(299));var o=!1,u="",h=hp;return i!=null&&(i.unstable_strictMode===!0&&(o=!0),i.identifierPrefix!==void 0&&(u=i.identifierPrefix),i.onRecoverableError!==void 0&&(h=i.onRecoverableError)),i=bc(n,1,!1,null,null,o,!1,u,h),n[Ci]=i.current,Eo(n.nodeType===8?n.parentNode:n),new Lc(i)},Dn.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var i=n._reactInternals;if(i===void 0)throw typeof n.render=="function"?Error(t(188)):(n=Object.keys(n).join(","),Error(t(268,n)));return n=ae(i),n=n===null?null:n.stateNode,n},Dn.flushSync=function(n){return Gr(n)},Dn.hydrate=function(n,i,o){if(!hl(i))throw Error(t(200));return pl(null,n,i,!0,o)},Dn.hydrateRoot=function(n,i,o){if(!Dc(n))throw Error(t(405));var u=o!=null&&o.hydratedSources||null,h=!1,v="",E=hp;if(o!=null&&(o.unstable_strictMode===!0&&(h=!0),o.identifierPrefix!==void 0&&(v=o.identifierPrefix),o.onRecoverableError!==void 0&&(E=o.onRecoverableError)),i=dp(i,null,n,1,o??null,h,!1,v,E),n[Ci]=i.current,Eo(n),u)for(n=0;n<u.length;n++)o=u[n],h=o._getVersion,h=h(o._source),i.mutableSourceEagerHydrationData==null?i.mutableSourceEagerHydrationData=[o,h]:i.mutableSourceEagerHydrationData.push(o,h);return new fl(i)},Dn.render=function(n,i,o){if(!hl(i))throw Error(t(200));return pl(null,n,i,!1,o)},Dn.unmountComponentAtNode=function(n){if(!hl(n))throw Error(t(40));return n._reactRootContainer?(Gr(function(){pl(null,null,n,!1,function(){n._reactRootContainer=null,n[Ci]=null})}),!0):!1},Dn.unstable_batchedUpdates=Ec,Dn.unstable_renderSubtreeIntoContainer=function(n,i,o,u){if(!hl(o))throw Error(t(200));if(n==null||n._reactInternals===void 0)throw Error(t(38));return pl(n,i,o,!1,u)},Dn.version="18.3.1-next-f1338f8080-20240426",Dn}var Mp;function og(){if(Mp)return Uc.exports;Mp=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),Uc.exports=Gv(),Uc.exports}var Ep;function Vv(){if(Ep)return gl;Ep=1;var r=og();return gl.createRoot=r.createRoot,gl.hydrateRoot=r.hydrateRoot,gl}var Wv=Vv();const jv=rg(Wv);og();function $o(){return $o=Object.assign?Object.assign.bind():function(r){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(r[s]=t[s])}return r},$o.apply(this,arguments)}var Sr;(function(r){r.Pop="POP",r.Push="PUSH",r.Replace="REPLACE"})(Sr||(Sr={}));const Tp="popstate";function Xv(r){r===void 0&&(r={});function e(s,a){let{pathname:l,search:d,hash:c}=s.location;return Sd("",{pathname:l,search:d,hash:c},a.state&&a.state.usr||null,a.state&&a.state.key||"default")}function t(s,a){return typeof a=="string"?a:ag(a)}return qv(e,t,null,r)}function Xt(r,e){if(r===!1||r===null||typeof r>"u")throw new Error(e)}function Nd(r,e){if(!r){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function Yv(){return Math.random().toString(36).substr(2,8)}function wp(r,e){return{usr:r.state,key:r.key,idx:e}}function Sd(r,e,t,s){return t===void 0&&(t=null),$o({pathname:typeof r=="string"?r:r.pathname,search:"",hash:""},typeof e=="string"?ro(e):e,{state:t,key:e&&e.key||s||Yv()})}function ag(r){let{pathname:e="/",search:t="",hash:s=""}=r;return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),s&&s!=="#"&&(e+=s.charAt(0)==="#"?s:"#"+s),e}function ro(r){let e={};if(r){let t=r.indexOf("#");t>=0&&(e.hash=r.substr(t),r=r.substr(0,t));let s=r.indexOf("?");s>=0&&(e.search=r.substr(s),r=r.substr(0,s)),r&&(e.pathname=r)}return e}function qv(r,e,t,s){s===void 0&&(s={});let{window:a=document.defaultView,v5Compat:l=!1}=s,d=a.history,c=Sr.Pop,f=null,p=m();p==null&&(p=0,d.replaceState($o({},d.state,{idx:p}),""));function m(){return(d.state||{idx:null}).idx}function g(){c=Sr.Pop;let y=m(),x=y==null?null:y-p;p=y,f&&f({action:c,location:M.location,delta:x})}function _(y,x){c=Sr.Push;let b=Sd(M.location,y,x);p=m()+1;let w=wp(b,p),R=M.createHref(b);try{d.pushState(w,"",R)}catch(O){if(O instanceof DOMException&&O.name==="DataCloneError")throw O;a.location.assign(R)}l&&f&&f({action:c,location:M.location,delta:1})}function S(y,x){c=Sr.Replace;let b=Sd(M.location,y,x);p=m();let w=wp(b,p),R=M.createHref(b);d.replaceState(w,"",R),l&&f&&f({action:c,location:M.location,delta:0})}function T(y){let x=a.location.origin!=="null"?a.location.origin:a.location.href,b=typeof y=="string"?y:ag(y);return b=b.replace(/ $/,"%20"),Xt(x,"No window.location.(origin|href) available to create URL for href: "+b),new URL(b,x)}let M={get action(){return c},get location(){return r(a,d)},listen(y){if(f)throw new Error("A history only accepts one active listener");return a.addEventListener(Tp,g),f=y,()=>{a.removeEventListener(Tp,g),f=null}},createHref(y){return e(a,y)},createURL:T,encodeLocation(y){let x=T(y);return{pathname:x.pathname,search:x.search,hash:x.hash}},push:_,replace:S,go(y){return d.go(y)}};return M}var Ap;(function(r){r.data="data",r.deferred="deferred",r.redirect="redirect",r.error="error"})(Ap||(Ap={}));function $v(r,e,t){return t===void 0&&(t="/"),Kv(r,e,t)}function Kv(r,e,t,s){let a=typeof e=="string"?ro(e):e,l=cg(a.pathname||"/",t);if(l==null)return null;let d=lg(r);Zv(d);let c=null;for(let f=0;c==null&&f<d.length;++f){let p=u_(l);c=o_(d[f],p)}return c}function lg(r,e,t,s){e===void 0&&(e=[]),t===void 0&&(t=[]),s===void 0&&(s="");let a=(l,d,c)=>{let f={relativePath:c===void 0?l.path||"":c,caseSensitive:l.caseSensitive===!0,childrenIndex:d,route:l};f.relativePath.startsWith("/")&&(Xt(f.relativePath.startsWith(s),'Absolute route path "'+f.relativePath+'" nested under path '+('"'+s+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),f.relativePath=f.relativePath.slice(s.length));let p=es([s,f.relativePath]),m=t.concat(f);l.children&&l.children.length>0&&(Xt(l.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+p+'".')),lg(l.children,e,m,p)),!(l.path==null&&!l.index)&&e.push({path:p,score:r_(p,l.index),routesMeta:m})};return r.forEach((l,d)=>{var c;if(l.path===""||!((c=l.path)!=null&&c.includes("?")))a(l,d);else for(let f of ug(l.path))a(l,d,f)}),e}function ug(r){let e=r.split("/");if(e.length===0)return[];let[t,...s]=e,a=t.endsWith("?"),l=t.replace(/\?$/,"");if(s.length===0)return a?[l,""]:[l];let d=ug(s.join("/")),c=[];return c.push(...d.map(f=>f===""?l:[l,f].join("/"))),a&&c.push(...d),c.map(f=>r.startsWith("/")&&f===""?"/":f)}function Zv(r){r.sort((e,t)=>e.score!==t.score?t.score-e.score:s_(e.routesMeta.map(s=>s.childrenIndex),t.routesMeta.map(s=>s.childrenIndex)))}const Qv=/^:[\w-]+$/,Jv=3,e_=2,t_=1,n_=10,i_=-2,Cp=r=>r==="*";function r_(r,e){let t=r.split("/"),s=t.length;return t.some(Cp)&&(s+=i_),e&&(s+=e_),t.filter(a=>!Cp(a)).reduce((a,l)=>a+(Qv.test(l)?Jv:l===""?t_:n_),s)}function s_(r,e){return r.length===e.length&&r.slice(0,-1).every((s,a)=>s===e[a])?r[r.length-1]-e[e.length-1]:0}function o_(r,e,t){let{routesMeta:s}=r,a={},l="/",d=[];for(let c=0;c<s.length;++c){let f=s[c],p=c===s.length-1,m=l==="/"?e:e.slice(l.length)||"/",g=a_({path:f.relativePath,caseSensitive:f.caseSensitive,end:p},m),_=f.route;if(!g)return null;Object.assign(a,g.params),d.push({params:a,pathname:es([l,g.pathname]),pathnameBase:p_(es([l,g.pathnameBase])),route:_}),g.pathnameBase!=="/"&&(l=es([l,g.pathnameBase]))}return d}function a_(r,e){typeof r=="string"&&(r={path:r,caseSensitive:!1,end:!0});let[t,s]=l_(r.path,r.caseSensitive,r.end),a=e.match(t);if(!a)return null;let l=a[0],d=l.replace(/(.)\/+$/,"$1"),c=a.slice(1);return{params:s.reduce((p,m,g)=>{let{paramName:_,isOptional:S}=m;if(_==="*"){let M=c[g]||"";d=l.slice(0,l.length-M.length).replace(/(.)\/+$/,"$1")}const T=c[g];return S&&!T?p[_]=void 0:p[_]=(T||"").replace(/%2F/g,"/"),p},{}),pathname:l,pathnameBase:d,pattern:r}}function l_(r,e,t){e===void 0&&(e=!1),t===void 0&&(t=!0),Nd(r==="*"||!r.endsWith("*")||r.endsWith("/*"),'Route path "'+r+'" will be treated as if it were '+('"'+r.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+r.replace(/\*$/,"/*")+'".'));let s=[],a="^"+r.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(d,c,f)=>(s.push({paramName:c,isOptional:f!=null}),f?"/?([^\\/]+)?":"/([^\\/]+)"));return r.endsWith("*")?(s.push({paramName:"*"}),a+=r==="*"||r==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):t?a+="\\/*$":r!==""&&r!=="/"&&(a+="(?:(?=\\/|$))"),[new RegExp(a,e?void 0:"i"),s]}function u_(r){try{return r.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return Nd(!1,'The URL path "'+r+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),r}}function cg(r,e){if(e==="/")return r;if(!r.toLowerCase().startsWith(e.toLowerCase()))return null;let t=e.endsWith("/")?e.length-1:e.length,s=r.charAt(t);return s&&s!=="/"?null:r.slice(t)||"/"}const c_=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,d_=r=>c_.test(r);function f_(r,e){e===void 0&&(e="/");let{pathname:t,search:s="",hash:a=""}=typeof r=="string"?ro(r):r,l;if(t)if(d_(t))l=t;else{if(t.includes("//")){let d=t;t=t.replace(/\/\/+/g,"/"),Nd(!1,"Pathnames cannot have embedded double slashes - normalizing "+(d+" -> "+t))}t.startsWith("/")?l=Rp(t.substring(1),"/"):l=Rp(t,e)}else l=e;return{pathname:l,search:m_(s),hash:g_(a)}}function Rp(r,e){let t=e.replace(/\/+$/,"").split("/");return r.split("/").forEach(a=>{a===".."?t.length>1&&t.pop():a!=="."&&t.push(a)}),t.length>1?t.join("/"):"/"}function kc(r,e,t,s){return"Cannot include a '"+r+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(s)+"].  Please separate it out to the ")+("`to."+t+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function h_(r){return r.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function dg(r,e){let t=h_(r);return e?t.map((s,a)=>a===t.length-1?s.pathname:s.pathnameBase):t.map(s=>s.pathnameBase)}function fg(r,e,t,s){s===void 0&&(s=!1);let a;typeof r=="string"?a=ro(r):(a=$o({},r),Xt(!a.pathname||!a.pathname.includes("?"),kc("?","pathname","search",a)),Xt(!a.pathname||!a.pathname.includes("#"),kc("#","pathname","hash",a)),Xt(!a.search||!a.search.includes("#"),kc("#","search","hash",a)));let l=r===""||a.pathname==="",d=l?"/":a.pathname,c;if(d==null)c=t;else{let g=e.length-1;if(!s&&d.startsWith("..")){let _=d.split("/");for(;_[0]==="..";)_.shift(),g-=1;a.pathname=_.join("/")}c=g>=0?e[g]:"/"}let f=f_(a,c),p=d&&d!=="/"&&d.endsWith("/"),m=(l||d===".")&&t.endsWith("/");return!f.pathname.endsWith("/")&&(p||m)&&(f.pathname+="/"),f}const es=r=>r.join("/").replace(/\/\/+/g,"/"),p_=r=>r.replace(/\/+$/,"").replace(/^\/*/,"/"),m_=r=>!r||r==="?"?"":r.startsWith("?")?r:"?"+r,g_=r=>!r||r==="#"?"":r.startsWith("#")?r:"#"+r;function v_(r){return r!=null&&typeof r.status=="number"&&typeof r.statusText=="string"&&typeof r.internal=="boolean"&&"data"in r}const hg=["post","put","patch","delete"];new Set(hg);const __=["get",...hg];new Set(__);function Ko(){return Ko=Object.assign?Object.assign.bind():function(r){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(r[s]=t[s])}return r},Ko.apply(this,arguments)}const Ud=Me.createContext(null),x_=Me.createContext(null),na=Me.createContext(null),ql=Me.createContext(null),br=Me.createContext({outlet:null,matches:[],isDataRoute:!1}),pg=Me.createContext(null);function ia(){return Me.useContext(ql)!=null}function Fd(){return ia()||Xt(!1),Me.useContext(ql).location}function mg(r){Me.useContext(na).static||Me.useLayoutEffect(r)}function ra(){let{isDataRoute:r}=Me.useContext(br);return r?D_():y_()}function y_(){ia()||Xt(!1);let r=Me.useContext(Ud),{basename:e,future:t,navigator:s}=Me.useContext(na),{matches:a}=Me.useContext(br),{pathname:l}=Fd(),d=JSON.stringify(dg(a,t.v7_relativeSplatPath)),c=Me.useRef(!1);return mg(()=>{c.current=!0}),Me.useCallback(function(p,m){if(m===void 0&&(m={}),!c.current)return;if(typeof p=="number"){s.go(p);return}let g=fg(p,JSON.parse(d),l,m.relative==="path");r==null&&e!=="/"&&(g.pathname=g.pathname==="/"?e:es([e,g.pathname])),(m.replace?s.replace:s.push)(g,m.state,m)},[e,s,d,l,r])}function gg(){let{matches:r}=Me.useContext(br),e=r[r.length-1];return e?e.params:{}}function S_(r,e){return M_(r,e)}function M_(r,e,t,s){ia()||Xt(!1);let{navigator:a}=Me.useContext(na),{matches:l}=Me.useContext(br),d=l[l.length-1],c=d?d.params:{};d&&d.pathname;let f=d?d.pathnameBase:"/";d&&d.route;let p=Fd(),m;if(e){var g;let y=typeof e=="string"?ro(e):e;f==="/"||(g=y.pathname)!=null&&g.startsWith(f)||Xt(!1),m=y}else m=p;let _=m.pathname||"/",S=_;if(f!=="/"){let y=f.replace(/^\//,"").split("/");S="/"+_.replace(/^\//,"").split("/").slice(y.length).join("/")}let T=$v(r,{pathname:S}),M=C_(T&&T.map(y=>Object.assign({},y,{params:Object.assign({},c,y.params),pathname:es([f,a.encodeLocation?a.encodeLocation(y.pathname).pathname:y.pathname]),pathnameBase:y.pathnameBase==="/"?f:es([f,a.encodeLocation?a.encodeLocation(y.pathnameBase).pathname:y.pathnameBase])})),l,t,s);return e&&M?Me.createElement(ql.Provider,{value:{location:Ko({pathname:"/",search:"",hash:"",state:null,key:"default"},m),navigationType:Sr.Pop}},M):M}function E_(){let r=L_(),e=v_(r)?r.status+" "+r.statusText:r instanceof Error?r.message:JSON.stringify(r),t=r instanceof Error?r.stack:null,a={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return Me.createElement(Me.Fragment,null,Me.createElement("h2",null,"Unexpected Application Error!"),Me.createElement("h3",{style:{fontStyle:"italic"}},e),t?Me.createElement("pre",{style:a},t):null,null)}const T_=Me.createElement(E_,null);class w_ extends Me.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return this.state.error!==void 0?Me.createElement(br.Provider,{value:this.props.routeContext},Me.createElement(pg.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function A_(r){let{routeContext:e,match:t,children:s}=r,a=Me.useContext(Ud);return a&&a.static&&a.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=t.route.id),Me.createElement(br.Provider,{value:e},s)}function C_(r,e,t,s){var a;if(e===void 0&&(e=[]),t===void 0&&(t=null),s===void 0&&(s=null),r==null){var l;if(!t)return null;if(t.errors)r=t.matches;else if((l=s)!=null&&l.v7_partialHydration&&e.length===0&&!t.initialized&&t.matches.length>0)r=t.matches;else return null}let d=r,c=(a=t)==null?void 0:a.errors;if(c!=null){let m=d.findIndex(g=>g.route.id&&c?.[g.route.id]!==void 0);m>=0||Xt(!1),d=d.slice(0,Math.min(d.length,m+1))}let f=!1,p=-1;if(t&&s&&s.v7_partialHydration)for(let m=0;m<d.length;m++){let g=d[m];if((g.route.HydrateFallback||g.route.hydrateFallbackElement)&&(p=m),g.route.id){let{loaderData:_,errors:S}=t,T=g.route.loader&&_[g.route.id]===void 0&&(!S||S[g.route.id]===void 0);if(g.route.lazy||T){f=!0,p>=0?d=d.slice(0,p+1):d=[d[0]];break}}}return d.reduceRight((m,g,_)=>{let S,T=!1,M=null,y=null;t&&(S=c&&g.route.id?c[g.route.id]:void 0,M=g.route.errorElement||T_,f&&(p<0&&_===0?(I_("route-fallback"),T=!0,y=null):p===_&&(T=!0,y=g.route.hydrateFallbackElement||null)));let x=e.concat(d.slice(0,_+1)),b=()=>{let w;return S?w=M:T?w=y:g.route.Component?w=Me.createElement(g.route.Component,null):g.route.element?w=g.route.element:w=m,Me.createElement(A_,{match:g,routeContext:{outlet:m,matches:x,isDataRoute:t!=null},children:w})};return t&&(g.route.ErrorBoundary||g.route.errorElement||_===0)?Me.createElement(w_,{location:t.location,revalidation:t.revalidation,component:M,error:S,children:b(),routeContext:{outlet:null,matches:x,isDataRoute:!0}}):b()},null)}var vg=(function(r){return r.UseBlocker="useBlocker",r.UseRevalidator="useRevalidator",r.UseNavigateStable="useNavigate",r})(vg||{}),_g=(function(r){return r.UseBlocker="useBlocker",r.UseLoaderData="useLoaderData",r.UseActionData="useActionData",r.UseRouteError="useRouteError",r.UseNavigation="useNavigation",r.UseRouteLoaderData="useRouteLoaderData",r.UseMatches="useMatches",r.UseRevalidator="useRevalidator",r.UseNavigateStable="useNavigate",r.UseRouteId="useRouteId",r})(_g||{});function R_(r){let e=Me.useContext(Ud);return e||Xt(!1),e}function b_(r){let e=Me.useContext(x_);return e||Xt(!1),e}function P_(r){let e=Me.useContext(br);return e||Xt(!1),e}function xg(r){let e=P_(),t=e.matches[e.matches.length-1];return t.route.id||Xt(!1),t.route.id}function L_(){var r;let e=Me.useContext(pg),t=b_(),s=xg();return e!==void 0?e:(r=t.errors)==null?void 0:r[s]}function D_(){let{router:r}=R_(vg.UseNavigateStable),e=xg(_g.UseNavigateStable),t=Me.useRef(!1);return mg(()=>{t.current=!0}),Me.useCallback(function(a,l){l===void 0&&(l={}),t.current&&(typeof a=="number"?r.navigate(a):r.navigate(a,Ko({fromRouteId:e},l)))},[r,e])}const bp={};function I_(r,e,t){bp[r]||(bp[r]=!0)}function N_(r,e){r?.v7_startTransition,r?.v7_relativeSplatPath}function U_(r){let{to:e,replace:t,state:s,relative:a}=r;ia()||Xt(!1);let{future:l,static:d}=Me.useContext(na),{matches:c}=Me.useContext(br),{pathname:f}=Fd(),p=ra(),m=fg(e,dg(c,l.v7_relativeSplatPath),f,a==="path"),g=JSON.stringify(m);return Me.useEffect(()=>p(JSON.parse(g),{replace:t,state:s,relative:a}),[p,g,a,t,s]),null}function qs(r){Xt(!1)}function F_(r){let{basename:e="/",children:t=null,location:s,navigationType:a=Sr.Pop,navigator:l,static:d=!1,future:c}=r;ia()&&Xt(!1);let f=e.replace(/^\/*/,"/"),p=Me.useMemo(()=>({basename:f,navigator:l,static:d,future:Ko({v7_relativeSplatPath:!1},c)}),[f,c,l,d]);typeof s=="string"&&(s=ro(s));let{pathname:m="/",search:g="",hash:_="",state:S=null,key:T="default"}=s,M=Me.useMemo(()=>{let y=cg(m,f);return y==null?null:{location:{pathname:y,search:g,hash:_,state:S,key:T},navigationType:a}},[f,m,g,_,S,T,a]);return M==null?null:Me.createElement(na.Provider,{value:p},Me.createElement(ql.Provider,{children:t,value:M}))}function O_(r){let{children:e,location:t}=r;return S_(Md(e),t)}new Promise(()=>{});function Md(r,e){e===void 0&&(e=[]);let t=[];return Me.Children.forEach(r,(s,a)=>{if(!Me.isValidElement(s))return;let l=[...e,a];if(s.type===Me.Fragment){t.push.apply(t,Md(s.props.children,l));return}s.type!==qs&&Xt(!1),!s.props.index||!s.props.children||Xt(!1);let d={id:s.props.id||l.join("-"),caseSensitive:s.props.caseSensitive,element:s.props.element,Component:s.props.Component,index:s.props.index,path:s.props.path,loader:s.props.loader,action:s.props.action,errorElement:s.props.errorElement,ErrorBoundary:s.props.ErrorBoundary,hasErrorBoundary:s.props.ErrorBoundary!=null||s.props.errorElement!=null,shouldRevalidate:s.props.shouldRevalidate,handle:s.props.handle,lazy:s.props.lazy};s.props.children&&(d.children=Md(s.props.children,l)),t.push(d)}),t}const k_="6";try{window.__reactRouterVersion=k_}catch{}const B_="startTransition",Pp=Bv[B_];function z_(r){let{basename:e,children:t,future:s,window:a}=r,l=Me.useRef();l.current==null&&(l.current=Xv({window:a,v5Compat:!0}));let d=l.current,[c,f]=Me.useState({action:d.action,location:d.location}),{v7_startTransition:p}=s||{},m=Me.useCallback(g=>{p&&Pp?Pp(()=>f(g)):f(g)},[f,p]);return Me.useLayoutEffect(()=>d.listen(m),[d,m]),Me.useEffect(()=>N_(s),[s]),Me.createElement(F_,{basename:e,children:t,location:c.location,navigationType:c.action,navigator:d,future:s})}var Lp;(function(r){r.UseScrollRestoration="useScrollRestoration",r.UseSubmit="useSubmit",r.UseSubmitFetcher="useSubmitFetcher",r.UseFetcher="useFetcher",r.useViewTransitionState="useViewTransitionState"})(Lp||(Lp={}));var Dp;(function(r){r.UseFetcher="useFetcher",r.UseFetchers="useFetchers",r.UseScrollRestoration="useScrollRestoration"})(Dp||(Dp={}));const H_="worldwright-db",G_=3,Zo="worlds",Qo="index";let Bc=null;function $l(){return Bc||(Bc=new Promise((r,e)=>{const t=indexedDB.open(H_,G_);t.onupgradeneeded=()=>{const a=t.result;a.objectStoreNames.contains(Zo)||a.createObjectStore(Zo,{keyPath:"metadata.id"}),a.objectStoreNames.contains(Qo)||a.createObjectStore(Qo,{keyPath:"id"})},t.onblocked=()=>{e(new Error("Database upgrade blocked. Please close other WorldWright tabs and try again."))};const s=setTimeout(()=>{e(new Error("Opening database timed out. Try reloading or resetting storage."))},5e3);t.onerror=()=>{clearTimeout(s),e(t.error)},t.onsuccess=()=>{clearTimeout(s),r(t.result)}})),Bc}function Js(r,e,t,s){return new Promise((a,l)=>{const d=r.transaction(e,t),c=d.objectStore(e),f=s(c);f.onsuccess=()=>a(f.result),f.onerror=()=>l(f.error),d.onerror=()=>l(d.error)})}function V_(r){const e=new Date().toISOString(),t=r.metadata.createdAt||e;return{id:r.metadata.id,name:r.metadata.name||"Untitled World",seed:r.metadata.seed||"",createdAt:t,updatedAt:e,version:r.metadata.version||"unknown",styleMode:r.metadata.styleMode||"unknown"}}async function W_(){const r=await $l();return Js(r,Qo,"readonly",e=>e.getAll())}async function zc(r){const e=await $l();return Js(e,Zo,"readonly",t=>t.get(r))}async function yg(r){const e=await $l(),t=V_(r);return r.metadata.updatedAt=t.updatedAt,await Js(e,Zo,"readwrite",s=>s.put(r)),await Js(e,Qo,"readwrite",s=>s.put(t)),r}async function j_(r){const e=await $l();await Js(e,Zo,"readwrite",t=>t.delete(r)),await Js(e,Qo,"readwrite",t=>t.delete(r))}function Ip(r){try{return new Date(r).toLocaleString()}catch{return String(r)}}function X_(){const r=ra(),[e,t]=Me.useState([]),[s,a]=Me.useState(!0),[l,d]=Me.useState(null);async function c(){try{a(!0),d(null);const p=await W_();t(p)}catch(p){d(p?.message||String(p))}finally{a(!1)}}Me.useEffect(()=>{c()},[]);const f=async p=>{confirm("Delete this world? This cannot be undone.")&&(await j_(p),await c())};return X.jsxs("div",{style:{padding:24},children:[X.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[X.jsx("h1",{children:"WorldWright"}),X.jsx("button",{onClick:()=>r("/generate"),style:{padding:"10px 16px",borderRadius:12,fontWeight:900,background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",color:"white",border:"none",cursor:"pointer"},children:"+ Generate New World"})]}),X.jsx("div",{style:{marginTop:18},children:s?X.jsx("div",{style:{padding:12},children:"Loading…"}):l?X.jsx("div",{style:{padding:12,color:"#c33"},children:l}):e.length===0?X.jsxs("div",{style:{marginTop:16,padding:18,borderRadius:16,border:"1px solid rgba(0,0,0,0.12)",opacity:.9},children:[X.jsx("div",{style:{fontWeight:900,fontSize:16},children:"No worlds yet."}),X.jsx("div",{style:{marginTop:8,opacity:.8},children:"Create your first world in Generate Mode."}),X.jsx("div",{style:{marginTop:14},children:X.jsx("button",{onClick:()=>r("/generate"),style:{padding:"10px 12px",borderRadius:12,fontWeight:900},children:"Go to Generate"})})]}):X.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))",gap:12},children:e.map(p=>{const m=(p.name||"").trim()||"Untitled World";return X.jsxs("div",{style:{borderRadius:16,border:"1px solid rgba(0,0,0,0.12)",padding:14,display:"flex",flexDirection:"column",gap:10},children:[X.jsx("div",{style:{display:"flex",justifyContent:"space-between",gap:10},children:X.jsxs("div",{style:{minWidth:0},children:[X.jsx("div",{style:{fontWeight:950,fontSize:16,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:m}),X.jsxs("div",{style:{opacity:.7,fontSize:12,marginTop:3},children:[p.styleMode," • ",p.version]})]})}),X.jsxs("div",{style:{opacity:.8,fontSize:12,lineHeight:1.35},children:[X.jsxs("div",{children:[X.jsx("b",{children:"Updated:"})," ",Ip(p.updatedAt)]}),X.jsxs("div",{children:[X.jsx("b",{children:"Created:"})," ",Ip(p.createdAt)]})]}),X.jsxs("div",{style:{display:"flex",gap:8,marginTop:8},children:[X.jsx("button",{onClick:()=>r(`/create/${p.id}`),style:{flex:1,padding:"10px 10px",borderRadius:12,fontWeight:900},children:"Open (Create)"}),X.jsx("button",{onClick:()=>r(`/sim/${p.id}`),style:{padding:"10px 10px",borderRadius:12,fontWeight:900},children:"Sim"})]}),X.jsx("div",{style:{opacity:.55,fontSize:11,wordBreak:"break-all",marginTop:8},children:p.id}),X.jsx("div",{style:{display:"flex",gap:8,marginTop:10},children:X.jsx("button",{onClick:()=>f(p.id),children:"Delete"})})]},p.id)})})})]})}function Y_({groups:r}){return X.jsx("div",{style:{padding:12,display:"flex",flexDirection:"column",gap:14},children:r.map(e=>X.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[X.jsx("div",{style:{fontSize:12,opacity:.8,letterSpacing:.5},children:e.title}),X.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:e.tools.map(t=>X.jsx("button",{onClick:t.onClick,disabled:t.disabled,style:{textAlign:"left",padding:"10px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:t.active?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.92)",opacity:t.disabled?.45:1,cursor:t.disabled?"not-allowed":"pointer"},children:t.label},t.id))})]},e.id))})}function q_({tools:r}){return X.jsx("div",{style:{padding:12,display:"flex",flexDirection:"column",gap:10},children:r.map(e=>X.jsx("button",{onClick:e.onClick,disabled:e.disabled,style:{textAlign:"left",padding:"10px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:e.active?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.92)",opacity:e.disabled?.45:1,cursor:e.disabled?"not-allowed":"pointer"},children:e.label},e.id))})}function $_(r){const{onGoHome:e,worldName:t,mode:s,onModeToggle:a,viewMode:l,onViewModeChange:d,isDirty:c}=r,f=!!a&&(s==="create"||s==="sim"),p=!!d&&s==="create";return X.jsxs("div",{style:{height:54,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 14px",borderBottom:"1px solid rgba(255,255,255,0.10)",background:"rgba(10,12,18,0.96)",color:"rgba(255,255,255,0.92)",boxSizing:"border-box"},children:[X.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[X.jsx("button",{onClick:e,style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Home"}),X.jsxs("div",{style:{display:"flex",flexDirection:"column",lineHeight:1.1},children:[X.jsxs("div",{style:{fontSize:14,fontWeight:650},children:[t||(s?s.toUpperCase():"WORLDWRIGHT"),c?" *":""]}),X.jsx("div",{style:{fontSize:12,opacity:.75},children:c?"Unsaved changes":"Saved"})]})]}),X.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[f&&X.jsx("button",{onClick:a,style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:s==="create"?"Go to Sim":"Go to Create"}),p&&X.jsxs("div",{style:{display:"flex",gap:8},children:[X.jsx("button",{onClick:()=>d?.("GLOBE"),style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:l==="GLOBE"?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Globe"}),X.jsx("button",{onClick:()=>d?.("MAP"),style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:l==="MAP"?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Map"})]}),X.jsx("button",{disabled:!0,style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:"rgba(255,255,255,0.03)",color:"rgba(255,255,255,0.65)",cursor:"not-allowed"},children:"Export"}),X.jsx("button",{disabled:!0,style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.10)",background:"rgba(255,255,255,0.03)",color:"rgba(255,255,255,0.65)",cursor:"not-allowed"},children:"Settings"})]})]})}function ts(r){const{rightPanel:e,children:t,onGoHome:s,worldName:a,mode:l,onModeToggle:d,viewMode:c,onViewModeChange:f,isDirty:p,toolGroups:m,leftTools:g}=r,_=m&&m.length>0||g&&g.length>0;return X.jsxs("div",{style:{width:"100vw",height:"100vh",background:"rgb(10,12,18)",overflow:"hidden"},children:[X.jsx($_,{onGoHome:s,worldName:a,mode:l,onModeToggle:d,viewMode:c,onViewModeChange:f,isDirty:p}),X.jsxs("div",{style:{height:"calc(100vh - 54px)",display:"grid",gridTemplateColumns:_?"260px 1fr 320px":"1fr 320px"},children:[_&&X.jsx("div",{style:{borderRight:"1px solid rgba(255,255,255,0.10)",background:"rgba(255,255,255,0.02)",overflow:"auto"},children:m&&m.length>0?X.jsx(Y_,{groups:m}):X.jsx(q_,{tools:g||[]})}),X.jsx("div",{style:{position:"relative",overflow:"hidden"},children:t}),X.jsx("div",{style:{borderLeft:"1px solid rgba(255,255,255,0.10)",background:"rgba(255,255,255,0.02)",overflow:"auto"},children:e})]})]})}var Gi;(function(r){r.OCEANIC="OCEANIC",r.CONTINENTAL="CONTINENTAL"})(Gi||(Gi={}));var fi;(function(r){r.NONE="NONE",r.DIVERGENT="DIVERGENT",r.CONVERGENT="CONVERGENT",r.TRANSFORM="TRANSFORM"})(fi||(fi={}));var Jo;(function(r){r.ROCK="ROCK",r.VOLCANIC="VOLCANIC",r.SAND="SAND",r.ALLUVIAL="ALLUVIAL",r.PEAT="PEAT",r.SALT="SALT",r.PERMAFROST="PERMAFROST"})(Jo||(Jo={}));var Np;(function(r){r.TRENCH="TRENCH",r.ABYSSAL="ABYSSAL",r.RIDGE="RIDGE",r.SHELF="SHELF",r.SLOPE="SLOPE"})(Np||(Np={}));function K_(r){return{index:r,baseHeight:0,editHeightDelta:0,simHeightDelta:0,isWater:!1,flowDirection:null,flowAccumulation:0,basinId:null,temperature:.5,rainfall:.5,climateCellId:0,prevailingWind:[0,0],plateId:0,plateType:Gi.CONTINENTAL,boundaryType:fi.NONE,upliftRate:0,surfaceAge:.5,volcanicActivity:0,baseBiomeId:0,editBiomeId:0,surfaceType:Jo.ROCK,snowCover:0,oceanDepthClass:null}}function Mr(r,e=["LOADED"]){Z_(r),J_(r),ex(r),nx(r),Q_(r),tx(r)}function Z_(r){const e=r.seaLevel;for(const t of r.cells){const s=t.baseHeight+t.editHeightDelta+t.simHeightDelta;t.isWater=s<e}}function Q_(r){for(const e of r.cells){const t=e.baseHeight+e.editHeightDelta+e.simHeightDelta,s=Wi(1-e.temperature),a=Wi((t-.15)*1.25),l=Wi(s*.85+a*.35);e.snowCover=l}}function J_(r){const e=r.gridWidth,t=r.gridHeight,s=r.cells,a=r.seaLevel;function l(d,c,f=4){let p=0,m=0;for(let g=-f;g<=f;g++){const _=d+g;if(!(_<0||_>=t))for(let S=-f;S<=f;S++){const T=((c+S)%e+e)%e;m++;const M=_*e+T,y=s[M];y&&y.isWater&&p++}}return m>0?p/m:0}for(let d=0;d<t;d++){const c=90-d/t*180,f=1-Math.abs(c)/90;for(let p=0;p<e;p++){const m=d*e+p,g=s[m];if(!g)continue;const _=g.baseHeight+g.editHeightDelta+g.simHeightDelta,S=Wi((_-a+.5)*.5),T=l(d,p,4),M=Wi(f*.9+(1-S)*.05+T*.05);let y=Wi(T*.6+f*.2+(M>.6?.05:0));y=Wi(y*(1-S*.5)),g.temperature=M,g.rainfall=y}}}function ex(r){const e=r.gridWidth,t=r.gridHeight,s=r.cells;function a(f){const p=s[f];return p?p.baseHeight+p.editHeightDelta+p.simHeightDelta:0}for(const f of s)f.flowDirection===void 0&&(f.flowDirection=null),typeof f.flowAccumulation!="number"&&(f.flowAccumulation=1),f.basinId===void 0&&(f.basinId=null);const l=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];for(let f=0;f<t;f++)for(let p=0;p<e;p++){const m=f*e+p,g=s[m];if(!g)continue;const _=a(m);let S=null,T=_;for(const[M,y]of l){const x=f+M;if(x<0||x>=t)continue;const b=((p+y)%e+e)%e,w=x*e+b,R=a(w);R<T-1e-6&&(T=R,S=w)}g.flowDirection=S}const d=s.map((f,p)=>p).sort((f,p)=>a(p)-a(f));for(const f of d){const p=s[f];if(!p)continue;const m=p.flowDirection;if(m!=null&&m>=0&&m<s.length){const g=s[m];g&&(g.flowAccumulation+=p.flowAccumulation)}}function c(f){let p=f;const m=new Set;for(let g=0;g<1e3;g++){if(m.has(p))return p;m.add(p);const _=s[p];if(!_||_.isWater)return p;const S=_.flowDirection;if(S==null)return p;p=S}return p}for(let f=0;f<s.length;f++)s[f].basinId=c(f)}function tx(r){r.gridWidth,r.gridHeight;const e=r.cells,t=r.seaLevel;for(let s=0;s<e.length;s++){const a=e[s];if(!a)continue;if(a.isWater){a.baseBiomeId=0;continue}if((a.baseHeight+a.editHeightDelta+a.simHeightDelta-t)*.25>.6){a.baseBiomeId=6;continue}const c=Wi(a.temperature),f=Wi(a.rainfall);c<.2?a.baseBiomeId=1:f<.15?a.baseBiomeId=4:c>.6&&f>.6?a.baseBiomeId=5:a.baseBiomeId=3}}function Wi(r){return r<0?0:r>1?1:r}function nx(r){const e=r.cells,t=r.gridWidth,s=r.gridHeight,a=t*s,l=Math.max(20,Math.round(a/4e3)),d=[],c=new Set;let f=1;for(let p=0;p<e.length;p++){const m=e[p];if(!m||m.flowAccumulation<l||c.has(p))continue;const g=[];let _=p;const S=new Set;for(let T=0;T<e.length&&!S.has(_);T++){S.add(_),g.push(_),c.add(_);const M=e[_];if(!M||M.isWater)break;const y=M.flowDirection;if(y==null)break;if(c.has(y)){g.push(y),_=y;break}_=y}if(g.length>=2){const T=g[g.length-1];d.push({id:f++,sourceCellIndex:p,mouthCellIndex:T,path:g})}}r.rivers=d.map(p=>({id:p.id,sourceCellIndex:p.sourceCellIndex,mouthCellIndex:p.mouthCellIndex,path:p.path}))}function ix(r){const e=Hc(r.width,32,1024),t=Hc(r.height,16,512),s=ox(r.seed),a=sx(s),l=new Date().toISOString(),d=Nn(-.18,.22,Qn(r.seaLevel/100)),c=Nn(.25,1.35,Qn(r.plateActivity/100)),f=Nn(.15,.55,Qn(r.planetAge/100)),p=Nn(.05,.35,Qn(r.climateVar/100)),m=Nn(.25,1,Qn(r.axisTilt/100)),g=new Array(e*t);for(let w=0;w<g.length;w++)g[w]=K_(w);const _=12,S=[];for(let w=0;w<_;w++)S.push({id:w,type:w<5?Gi.OCEANIC:Gi.CONTINENTAL,velocity:[Nn(-1,1,a()),Nn(-1,1,a())]});for(let w=0;w<t;w++)for(let R=0;R<e;R++){const O=w*e+R,I=g[O],U=w/(t-1),ce=R/(e-1),C=Ui(ce*1.2,U*.9,a,2),D=Math.floor(Qn((C+1)*.5)*_)%_;I.plateId=D,I.plateType=S[D].type;const Y=Ui(ce*1.5,U*1.2,a,3),te=Ui(ce*.6,U*.5,a,2),de=Y*.7+te*.3,k=I.plateType===Gi.CONTINENTAL?.35:-.45,K=Ui(ce*8,U*6,a,3)*c*.4,J=k+de*.5+K*(1-f*.5);I.baseHeight=Go(J,-1,1),I.boundaryType=fi.NONE;const Z=U*2-1,V=Nn(.65,1.25,m),Q=1-Math.pow(Math.abs(Z),V),z=Ui(ce*4,U*4,a,2)*p;let L=0;r.styleMode==="ALIEN"?L=Ui(ce*8,U*6,a,2)*.15:r.styleMode==="FANTASY"&&(L=.08+Ui(ce*3,U*2.5,a,2)*.12),I.temperature=Qn(Q*.8+.12+z*.22+L);const G=Math.abs(Z),j=Math.exp(-Math.pow(G*2.5,2)),re=Math.exp(-Math.pow((G-.35)*3.5,2)),fe=G>.7?(G-.7)*.4:0;let xe=j*.6-re*.25+fe+.25;const ge=Ui(ce*5,U*3,a,2)*p;let Ee=0;r.styleMode==="ALIEN"?Ee=Ui(ce*10,U*7,a,3)*.2:r.styleMode==="FANTASY"&&(Ee=.1),I.rainfall=Qn(xe+ge*.3+Ee);const we=rx(I.temperature,I.rainfall);I.baseBiomeId=we,I.editBiomeId=we,I.surfaceType=I.plateType===Gi.OCEANIC?Jo.ALLUVIAL:Jo.ROCK,I.flowDirection=null,I.flowAccumulation=0,I.basinId=null,I.upliftRate=0,I.surfaceAge=Qn(.35+a()*.5),I.volcanicActivity=0}for(let w=0;w<t;w++)for(let R=0;R<e;R++){const O=w*e+R,I=g[O],U=I.plateId,ce=(w-1+t)%t,C=(w+1)%t,D=(R-1+e)%e,Y=(R+1)%e,te=ce*e+R,de=C*e+R,k=w*e+D,K=w*e+Y,J=new Set;if(J.add(U),J.add(g[te].plateId),J.add(g[de].plateId),J.add(g[k].plateId),J.add(g[K].plateId),J.size>1){const Z=[g[te].plateType,g[de].plateType,g[k].plateType,g[K].plateType],V=Z.some(L=>L===Gi.OCEANIC),Q=Z.some(L=>L===Gi.CONTINENTAL);V&&Q?I.boundaryType=fi.CONVERGENT:I.boundaryType=a()<.5?fi.DIVERGENT:fi.TRANSFORM;const z=I.boundaryType===fi.CONVERGENT?1.2:I.boundaryType===fi.DIVERGENT?.6:.4;I.upliftRate=Go(c*.02*z*(.6+a()*.8),0,5),I.volcanicActivity=I.boundaryType===fi.CONVERGENT&&V?Go(a()*1.2,0,3):a()*.2}else I.boundaryType=fi.NONE,I.upliftRate=Go(.005*(1-f)*(.5+a()*.8),0,.5),I.volcanicActivity=a()*.05}const T=Qn(r.planetAge/100),M=Math.max(1,Math.round(Nn(1,6,T))),y=Nn(.15,.65,T);for(let w=0;w<M;w++){const R=new Array(g.length);for(let O=0;O<t;O++)for(let I=0;I<e;I++){const U=O*e+I,ce=g[U];if(!ce)continue;let C=0,D=0;const Y=O-1,te=O+1,de=(I-1+e)%e,k=(I+1)%e;Y>=0&&(C+=g[Y*e+I].baseHeight,D++),te<t&&(C+=g[te*e+I].baseHeight,D++),C+=g[O*e+de].baseHeight,D++,C+=g[O*e+k].baseHeight,D++;const K=D>0?C/D:ce.baseHeight,J=Nn(ce.baseHeight,K,y),Z=ce.upliftRate*.005,V=(a()-.5)*.02*(1-T);R[U]=Go(ce.baseHeight+Z+V+(J-ce.baseHeight)*.9,-2,2)}for(let O=0;O<g.length;O++)g[O].baseHeight=R[O],g[O].surfaceAge=Qn(.2+T*.7+(a()-.5)*.1)}const x=[];for(let w=0;w<t;w++)for(let R=0;R<e;R++){const O=w*e+R,I=g[O];if(!I||I.baseHeight<d)continue;let U=null,ce=I.baseHeight;for(let Y=-1;Y<=1;Y++){const te=w+Y;if(!(te<0||te>=t))for(let de=-1;de<=1;de++){if(Y===0&&de===0)continue;const k=(R+de+e)%e,K=te*e+k,J=g[K].baseHeight;J<ce-1e-6&&(ce=J,U=K)}}if(U!=null&&a()<.06){const Y=Hc(w+Math.floor((a()-.5)*3),0,t-1),te=((R+Math.floor((a()-.5)*3))%e+e)%e,de=Y*e+te;de!==O&&(U=de)}U!=null&&(I.flowDirection=U);const C=Qn(I.rainfall||.2),D=Math.max(0,(I.baseHeight-ce)*2);I.flowAccumulation=Math.max(1,Math.floor(1+C*8+D*4+Math.floor(a()*3)))}const b={gridWidth:e,gridHeight:t,seaLevel:d,cells:g,plates:S,rivers:x,countries:[],cultures:[],cultureRegions:[],cities:[],locations:[],stickers:[],metadata:{id:`w_${r.styleMode}_${e}x${t}_${s}`,name:"Untitled World",seed:String(r.seed),schemaVersion:"v3",version:"v1.3",styleMode:r.styleMode,gridWidth:e,gridHeight:t,createdAt:l,updatedAt:l,seaLevel:d},parameters:{...r,seaLevel:r.seaLevel}};return Mr(b,["GENERATED"]),b}function rx(r,e){return r<.2?e<.35?1:2:r<.35?e<.35?3:4:r<.6?e<.3?5:e<.6?6:7:e<.25?8:e<.55?9:10}function Qn(r){return r<0?0:r>1?1:r}function Go(r,e,t){return r<e?e:r>t?t:r}function Hc(r,e,t){return Math.max(e,Math.min(t,Math.floor(r)))}function Nn(r,e,t){return r+(e-r)*t}function sx(r){return function(){let e=r+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function ox(r){if(typeof r=="number")return r>>>0;const e=String(r);let t=2166136261;for(let s=0;s<e.length;s++)t^=e.charCodeAt(s),t=Math.imul(t,16777619);return t>>>0&4294967295}function Ui(r,e,t,s){let a=1,l=1,d=0,c=0;for(let f=0;f<s;f++)d+=a*ax(r*l,e*l,t),c+=a,a*=.5,l*=2;return d/Math.max(1e-9,c)*2-1}function ax(r,e,t){const s=Math.floor(r),a=Math.floor(e),l=r-s,d=e-a,c=M(s,a),f=M(s+1,a),p=M(s,a+1),m=M(s+1,a+1),g=Up(l),_=Up(d),S=Nn(c,f,g),T=Nn(p,m,g);return Nn(S,T,_);function M(y,x){let b=y*374761393+x*668265263;const w=Math.floor(t()*4294967295);return b=(b^w)>>>0,b=(b^b>>>13)*1274126177,b=b^b>>>16,(b>>>0)/4294967295}}function Up(r){return r*r*(3-2*r)}function lx(r,e){switch(e.type){case"TERRAIN_STROKE":{const{tool:t,center:s,radius:a,strength:l}=e;if(!r||!Array.isArray(r.cells))return;const d=r.gridWidth,c=r.gridHeight,f=r.cells,p=Math.max(1,Math.floor(Number.isFinite(a)?a:1)),m=Number.isFinite(l)&&l>=0?l:0;let g=0,_=0;if(t==="FLATTEN"||t==="SMOOTH"){for(let S=-p;S<=p;S++){const T=s.row+S;if(!(T<0||T>=c))for(let M=-p;M<=p;M++){if(Math.sqrt(S*S+M*M)>a)continue;const b=((s.col+M)%d+d)%d,w=T*d+b,R=f[w],O=R.baseHeight+(R.editHeightDelta||0);g+=O,_++}}_>0&&(g/=_)}for(let S=-p;S<=p;S++){const T=s.row+S;if(!(T<0||T>=c))for(let M=-p;M<=p;M++){const y=Math.sqrt(S*S+M*M);if(y>a)continue;const b=((s.col+M)%d+d)%d,w=T*d+b,R=f[w],O=(a-y)/a;if(t==="RAISE")R.editHeightDelta=(R.editHeightDelta||0)+m*O;else if(t==="LOWER")R.editHeightDelta=(R.editHeightDelta||0)-m*O;else if(t==="FLATTEN"||t==="SMOOTH"){const I=R.baseHeight+(R.editHeightDelta||0),U=(g-I)*m*O;R.editHeightDelta=(R.editHeightDelta||0)+U}}}return}case"STICKER_APPLY":ux(r,e),Mr(r,["STICKER_EDIT"]);return;case"ADD_CITY":cx(r,e),Mr(r,["TERRAIN_EDIT"]);return;case"ADD_COUNTRY":dx(r,e),Mr(r,["TERRAIN_EDIT"]);return;default:return}}function ux(r,e){const{sticker:t}=e,{gridWidth:s,gridHeight:a,cells:l}=r,d=t.polygon.map(y=>y.lat),c=t.polygon.map(y=>y.lon),f=Math.min(...d),p=Math.max(...d),m=Math.min(...c),g=Math.max(...c),_=Math.floor((90-p)/180*a),S=Math.ceil((90-f)/180*a),T=Math.floor((m+180)/360*s),M=Math.ceil((g+180)/360*s);for(let y=_;y<=S;y++)for(let x=T;x<=M;x++){const b=(y+a)%a,w=(x+s)%s,R=b*s+w,O=l[R],I=90-b/a*180,U=w/s*360-180;fx({lat:I,lon:U},t.polygon)&&(t.type==="BIOME"&&t.payload.biomeId!=null&&(O.editBiomeId=t.payload.biomeId),t.type==="CULTURE"&&t.payload.cultureId&&(O.cultureId=t.payload.cultureId),t.type==="HEIGHT"&&typeof t.payload.heightDelta=="number"&&(O.editHeightDelta=(O.editHeightDelta||0)+t.payload.heightDelta))}r.stickers=r.stickers??[],r.stickers.push(t)}function cx(r,e){r.cities=r.cities??[],r.cities.push(e.city)}function dx(r,e){r.countries=r.countries??[],r.countries.push(e.country)}function fx(r,e){let t=!1;for(let s=0,a=e.length-1;s<e.length;a=s++){const l=e[s].lon,d=e[s].lat,c=e[a].lon,f=e[a].lat;d>r.lat!=f>r.lat&&r.lon<(c-l)*(r.lat-d)/(f-d+1e-12)+l&&(t=!t)}return t}function vl(r){const e=[],t=r.gridWidth*r.gridHeight;r.cells.length!==t&&e.push(`Cell array size (${r.cells.length}) does not match grid (${r.gridWidth}×${r.gridHeight} = ${t}).`),(typeof r.seaLevel!="number"||Number.isNaN(r.seaLevel))&&e.push("World is missing global seaLevel (number)."),r.metadata||e.push("World metadata is missing."),r.metadata?.id||e.push("World metadata.id is missing."),r.metadata?.schemaVersion||e.push("World metadata.schemaVersion is missing.");for(let s=0;s<r.cells.length;s++){const a=r.cells[s];if(a.index!==s){e.push(`Cell index mismatch at i=${s} (cell.index=${a.index}).`);break}if("seaLevel"in a){e.push("Legacy field detected: cell.seaLevel exists. World should be normalized/migrated.");break}typeof a.baseHeight!="number"&&e.push(`Cell ${s} missing baseHeight.`),typeof a.editHeightDelta!="number"&&e.push(`Cell ${s} missing editHeightDelta.`),typeof a.simHeightDelta!="number"&&e.push(`Cell ${s} missing simHeightDelta.`),typeof a.isWater!="boolean"&&e.push(`Cell ${s} missing isWater.`),a.flowDirection!=null&&typeof a.flowDirection!="number"&&e.push(`Cell ${s} flowDirection invalid type.`),typeof a.flowAccumulation!="number"&&e.push(`Cell ${s} missing flowAccumulation.`),a.basinId!=null&&typeof a.basinId!="number"&&e.push(`Cell ${s} basinId invalid type.`)}for(const s of r.countries)s.id||e.push("A country is missing an id."),(!s.polygons||s.polygons.length===0)&&e.push(`Country ${s.id||"(unknown)"} has no polygons.`);for(const s of r.cities)(s.cellIndex<0||s.cellIndex>=r.cells.length)&&e.push(`City ${s.id||s.name} has invalid cellIndex=${s.cellIndex}.`);return e}function Ps(r){return JSON.parse(JSON.stringify(r))}function hx(r,e=1){const t=.01*e;for(const s of r.cities)s.population+=s.population*t}class px{constructor(){Object.defineProperty(this,"world",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"history",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"historyIndex",{enumerable:!0,configurable:!0,writable:!0,value:-1}),Object.defineProperty(this,"listeners",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"dirty",{enumerable:!0,configurable:!0,writable:!0,value:!1})}getWorld(){return this.world}subscribe(e){return this.listeners.push(e),e(this.world),()=>{const t=this.listeners.indexOf(e);t>=0&&this.listeners.splice(t,1)}}notify(){for(const e of this.listeners)try{e(this.world)}catch(t){console.error("WorldSession subscriber error:",t)}}isDirty(){return this.dirty}normalizeWorld(e){if(typeof e.seaLevel!="number"){const t=e.metadata?.seaLevel;typeof t=="number"?e.seaLevel=t:e.seaLevel=0}if(Array.isArray(e.cells)){const t=e.gridWidth,s=e.gridHeight;for(let l=0;l<e.cells.length;l++){const d=e.cells[l];d.index=l,d&&Object.prototype.hasOwnProperty.call(d,"seaLevel")&&delete d.seaLevel,typeof d.editHeightDelta!="number"&&(d.editHeightDelta=0),typeof d.simHeightDelta!="number"&&(d.simHeightDelta=0),typeof d.isWater!="boolean"&&(d.isWater=!1),typeof d.temperature!="number"&&(d.temperature=.5),typeof d.rainfall!="number"&&(d.rainfall=.5),typeof d.baseBiomeId!="number"&&(d.baseBiomeId=0),typeof d.editBiomeId!="number"&&(d.editBiomeId=d.baseBiomeId),typeof d.snowCover!="number"&&(d.snowCover=0)}const a=t*s;if(e.cells.length>a)e.cells.length=a;else if(e.cells.length<a)for(let l=e.cells.length;l<a;l++){const d=e.cells[e.cells.length-1];e.cells.push(JSON.parse(JSON.stringify(d)))}}}async createWorld(e){const t=ix(e);this.normalizeWorld(t),Mr(t,["GENERATED"]);const s=vl(t);s.length>0&&console.warn("Validation warnings on generated world:",s);try{if(await zc(t.metadata.id)){console.warn(`Generated world id ${t.metadata.id} already exists for seed ${t.metadata.seed}; creating unique id.`);const l=t.metadata.id;let d=1,c=`${l}_dup${d}`;for(;d<1e3&&await zc(c);)d++,c=`${l}_dup${d}`;t.metadata.id=c,t.metadata.name=`${t.metadata.name} (copy)`,t.metadata.createdAt=new Date().toISOString()}}catch(a){console.warn("Could not verify world id uniqueness due to storage error:",a)}this.world=t,this.history=[Ps(t)],this.historyIndex=0,this.dirty=!1,this.notify()}async loadWorld(e){let t=null;if(typeof e=="string"?t=await zc(e):e&&typeof e=="object"&&(t=e),!t)throw new Error("World not found");this.normalizeWorld(t),Mr(t,["LOADED"]);const s=vl(t);s.length>0&&console.warn("Validation warnings on load:",s),this.world=t,this.history=[Ps(t)],this.historyIndex=0,this.dirty=!1,this.notify()}async save(){if(!this.world)throw new Error("No world loaded");const e=await yg(this.world);return this.world.metadata=e.metadata,this.dirty=!1,this.notify(),e}apply(e){if(!this.world)return;lx(this.world,e),Mr(this.world,["TERRAIN_EDIT"]);const t=vl(this.world);t.length>0&&console.warn("Validation warnings after edit:",t),this.historyIndex<this.history.length-1&&(this.history=this.history.slice(0,this.historyIndex+1)),this.history.push(Ps(this.world)),this.historyIndex=this.history.length-1,this.dirty=!0,this.notify(),this.dirty=!0,this.notify()}undo(){this.historyIndex>0&&(this.historyIndex--,this.world=Ps(this.history[this.historyIndex]),this.dirty=!0,this.notify())}redo(){this.historyIndex<this.history.length-1&&(this.historyIndex++,this.world=Ps(this.history[this.historyIndex]),this.dirty=!0,this.notify())}simulateTick(e=1){if(!this.world)return;hx(this.world,e),Mr(this.world,["SIM_STEP"]);const t=vl(this.world);t.length>0&&console.warn("Validation warnings after sim tick:",t),this.historyIndex<this.history.length-1&&(this.history=this.history.slice(0,this.historyIndex+1)),this.history.push(Ps(this.world)),this.historyIndex=this.history.length-1,this.dirty=!0,this.notify()}}const Un=new px;function mx(r){const e=r.gridWidth,t=r.gridHeight,s=typeof r.seaLevel=="number"?r.seaLevel:typeof r.metadata?.seaLevel=="number"?r.metadata.seaLevel:0,a=Array.isArray(r.cells)?r.cells:[];function l(p){const m=Gc(Math.round(p[0]*255)),g=Gc(Math.round(p[1]*255)),_=Gc(Math.round(p[2]*255));return[m,g,_,255]}function d(p,m){if(p<0||p>=t||m<0||m>=e)return[1,0,1];const g=p*e+m,_=a[g];if(!_)return[1,0,1];const S=typeof _.baseHeight=="number"?_.baseHeight:typeof _.height=="number"?_.height:0,T=typeof _.editHeightDelta=="number"?_.editHeightDelta:0,M=typeof _.simHeightDelta=="number"?_.simHeightDelta:0,y=S+T+M,x=typeof _.isWater=="boolean"?_.isWater:y<s,b=typeof _.rainfall=="number"?mn(_.rainfall):.5,w=typeof _.temperature=="number"?mn(_.temperature):.5,R=typeof _.snowCover=="number"?mn(_.snowCover):0;let O=0;if(p>0&&m>0){const Z=a[(p-1)*e+(m-1)];if(Z){const V=(typeof Z.baseHeight=="number"?Z.baseHeight:0)+(typeof Z.editHeightDelta=="number"?Z.editHeightDelta:0)+(typeof Z.simHeightDelta=="number"?Z.simHeightDelta:0);O=(y-V)*8}}const I=mn(.5+O*.3),U=(m*.137+p*.241)%1,ce=(m*.419+p*.673)%1,C=(Math.sin(U*47.3)*Math.cos(ce*31.7)*.5+.5)*.03;if(x){const Z=mn((s-y)*2.5),V=.12,Q=.5,z=.7,L=.08,G=.28,j=.52,re=.02,fe=.12,xe=.3;let ge,Ee,we;if(Z<.3){const Ce=Z/.3;ge=Gt(V,L,Ce),Ee=Gt(Q,G,Ce),we=Gt(z,j,Ce)}else{const Ce=(Z-.3)/.7;ge=Gt(L,re,Ce),Ee=Gt(G,fe,Ce),we=Gt(j,xe,Ce)}if(Z<.08){const Ce=(.08-Z)/.08;ge=Gt(ge,.85,Ce*.4),Ee=Gt(Ee,.9,Ce*.4),we=Gt(we,.92,Ce*.4)}return ge=mn(ge*I+C),Ee=mn(Ee*I+C),we=mn(we*I+C),[ge,Ee,we]}const D=mn((y-s)*3);let Y=.3,te=.3,de=.2;if(R>.6||w<.2&&b>.4||D>.75){const Z=mn(Math.max(R,D>.75?1:0));Y=Gt(.85,.95,Z),te=Gt(.88,.96,Z),de=Gt(.92,.98,Z)}else if(w<.25)Y=.55,te=.58,de=.52;else if(w<.4&&b>.35)Y=.2,te=.35,de=.22;else if(b<.25||w>.65&&b<.35){const Z=1-b;Y=Gt(.7,.85,Z),te=Gt(.6,.7,Z),de=Gt(.35,.45,Z)}else b<.5?(Y=.58,te=.62,de=.35):w>=.4&&w<.65&&b>=.5?(Y=.25,te=.48,de=.22):w>=.65&&b>=.6?(Y=.1,te=.4,de=.15):(Y=.35,te=.5,de=.28);if(D>.3){const Z=(D-.3)/.7;Y=Gt(Y,.65,Z*.4),te=Gt(te,.6,Z*.4),de=Gt(de,.55,Z*.4)}Y=mn(Y*I),te=mn(te*I),de=mn(de*I),Y=mn(Y+C),te=mn(te+C),de=mn(de+C);const k=p/t*2-1,J=Math.abs(k)*.05;return Y=Gt(Y,.7,J),te=Gt(te,.75,J),de=Gt(de,.85,J),[Y,te,de]}function c(p,m){return l(d(p,m))}const f=gx(e,t,(p,m)=>{const g=Math.floor(Ls(p,0,e-1)),_=Math.floor(Ls(m,0,t-1));return c(_,g)});return{width:e,height:t,seaLevel:s,rgba:f,colorAt:(p,m)=>{const g=Math.floor(Ls(p,0,e-1)),_=Math.floor(Ls(m,0,t-1));return c(_,g)},minimapColorAt:(p,m)=>{const g=Math.floor(Ls(p,0,e-1)),_=Math.floor(Ls(m,0,t-1));return c(_,g)},sampleGlobeColor:p=>{const m=Number.isInteger(p)?p:-1,g=m<0?-1:Math.floor(m/e),_=m<0?-1:m%e;return c(g,_)},sampleMinimapColor:p=>{const m=Number.isInteger(p)?p:-1,g=m<0?-1:Math.floor(m/e),_=m<0?-1:m%e;return c(g,_)}}}function Kl(r){return mx(r)}function mn(r){return Number.isFinite(r)?r<0?0:r>1?1:r:0}function Gc(r){return Number.isFinite(r)?r<0?0:r>255?255:r:0}function Ls(r,e,t){return!Number.isFinite(r)||r<e?e:r>t?t:r}function Gt(r,e,t){return r+(e-r)*t}function gx(r,e,t){const s=new Uint8ClampedArray(r*e*4);let a=0;for(let l=0;l<e;l++){const d=l+.5;for(let c=0;c<r;c++){const f=c+.5,p=t(f,d);s[a++]=p[0]|0,s[a++]=p[1]|0,s[a++]=p[2]|0,s[a++]=p[3]|0}}return s}function gn(r,e,t){const s=Math.round(Number.isFinite(r)?r:e);return s<e?e:s>t?t:s}function mr({label:r,children:e}){return X.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:6,marginBottom:14},children:[X.jsx("div",{style:{fontWeight:800,fontSize:12,opacity:.75},children:r}),e]})}function vx({onGenerate:r,onSave:e,saving:t,disabled:s}){const a=Me.useMemo(()=>({width:256,height:128,seaLevel:50,plateActivity:55,axisTilt:23,planetAge:50,climateVar:35,seed:Math.floor(Math.random()*1e9),styleMode:"EARTHLIKE"}),[]),[l,d]=Me.useState(a);Me.useEffect(()=>{r(l)},[]),Me.useEffect(()=>{const f=setTimeout(()=>{r(l)},300);return()=>clearTimeout(f)},[l]);function c(f,p){d(m=>({...m,[f]:p}))}return X.jsxs("div",{style:{padding:14},children:[X.jsx("div",{style:{fontWeight:900,fontSize:14,marginBottom:12},children:"Generate"}),X.jsx(mr,{label:"Seed",children:X.jsxs("div",{style:{display:"flex",gap:8},children:[X.jsx("input",{value:l.seed,onChange:f=>c("seed",gn(parseInt(f.target.value||"0",10),0,2147483647)),style:{flex:1,padding:8,borderRadius:10,border:"1px solid rgba(0,0,0,0.15)"},inputMode:"numeric"}),X.jsx("button",{onClick:()=>c("seed",Math.floor(Math.random()*1e9)),style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(0,0,0,0.15)"},children:"Random"})]})}),X.jsx(mr,{label:"Style Mode",children:X.jsxs("select",{value:l.styleMode,onChange:f=>c("styleMode",f.target.value),style:{padding:8,borderRadius:10,border:"1px solid rgba(0,0,0,0.15)"},children:[X.jsx("option",{value:"EARTHLIKE",children:"Earthlike"}),X.jsx("option",{value:"FANTASY",children:"Fantasy"}),X.jsx("option",{value:"STYLIZED",children:"Stylized"}),X.jsx("option",{value:"ALIEN",children:"Alien"})]})}),X.jsxs(mr,{label:`Resolution: ${l.width}×${l.height}`,children:[X.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8},children:[X.jsxs("div",{children:[X.jsx("div",{style:{fontSize:11,opacity:.7,marginBottom:6},children:"Width"}),X.jsx("input",{value:l.width,onChange:f=>c("width",gn(parseInt(f.target.value||"0",10),64,1024)),style:{width:"100%",padding:8,borderRadius:10,border:"1px solid rgba(0,0,0,0.15)"},inputMode:"numeric"})]}),X.jsxs("div",{children:[X.jsx("div",{style:{fontSize:11,opacity:.7,marginBottom:6},children:"Height"}),X.jsx("input",{value:l.height,onChange:f=>c("height",gn(parseInt(f.target.value||"0",10),32,1024)),style:{width:"100%",padding:8,borderRadius:10,border:"1px solid rgba(0,0,0,0.15)"},inputMode:"numeric"})]})]}),X.jsx("div",{style:{fontSize:11,opacity:.65,marginTop:6},children:"Note: larger resolutions generate slower (CPU preview)."})]}),X.jsx(mr,{label:`Sea Level (0–100): ${l.seaLevel}`,children:X.jsx("input",{type:"range",min:0,max:100,value:l.seaLevel,onChange:f=>c("seaLevel",gn(parseInt(f.target.value,10),0,100))})}),X.jsx(mr,{label:`Plate Activity (0–100): ${l.plateActivity}`,children:X.jsx("input",{type:"range",min:0,max:100,value:l.plateActivity,onChange:f=>c("plateActivity",gn(parseInt(f.target.value,10),0,100))})}),X.jsx(mr,{label:`Axis Tilt (0–100): ${l.axisTilt}`,children:X.jsx("input",{type:"range",min:0,max:100,value:l.axisTilt,onChange:f=>c("axisTilt",gn(parseInt(f.target.value,10),0,100))})}),X.jsx(mr,{label:`Planet Age (0–100): ${l.planetAge}`,children:X.jsx("input",{type:"range",min:0,max:100,value:l.planetAge,onChange:f=>c("planetAge",gn(parseInt(f.target.value,10),0,100))})}),X.jsx(mr,{label:`Climate Variability (0–100): ${l.climateVar}`,children:X.jsx("input",{type:"range",min:0,max:100,value:l.climateVar,onChange:f=>c("climateVar",gn(parseInt(f.target.value,10),0,100))})}),X.jsxs("div",{style:{display:"flex",gap:10,marginTop:16},children:[X.jsx("button",{onClick:()=>r({...l,width:gn(l.width,64,1024),height:gn(l.height,32,1024),seaLevel:gn(l.seaLevel,0,100),plateActivity:gn(l.plateActivity,0,100),axisTilt:gn(l.axisTilt,0,100),planetAge:gn(l.planetAge,0,100),climateVar:gn(l.climateVar,0,100),seed:typeof l.seed=="string"?l.seed:gn(l.seed,0,2147483647),styleMode:l.styleMode}),style:{flex:1,padding:"10px 12px",borderRadius:12,border:"1px solid rgba(0,0,0,0.15)",fontWeight:900},children:"Generate"}),X.jsx("button",{onClick:e,disabled:s||t,style:{flex:1,padding:"10px 12px",borderRadius:12,border:"1px solid rgba(0,0,0,0.15)",fontWeight:900,opacity:s||t?.5:1,cursor:s||t?"not-allowed":"pointer"},children:t?"Saving…":"Save → Create"})]}),X.jsx("div",{style:{fontSize:11,opacity:.65,marginTop:10,lineHeight:1.35},children:"Seed + parameters determine the generated world. After Save, Create opens the saved snapshot."})]})}const Od="160",_x=0,Fp=1,xx=2,Sg=1,yx=2,Hi=3,Rr=0,On=1,Vi=2,wr=0,Zs=1,Op=2,kp=3,Bp=4,Sx=5,Qr=100,Mx=101,Ex=102,zp=103,Hp=104,Tx=200,wx=201,Ax=202,Cx=203,Ed=204,Td=205,Rx=206,bx=207,Px=208,Lx=209,Dx=210,Ix=211,Nx=212,Ux=213,Fx=214,Ox=0,kx=1,Bx=2,Gl=3,zx=4,Hx=5,Gx=6,Vx=7,Mg=0,Wx=1,jx=2,Ar=0,Xx=1,Yx=2,qx=3,$x=4,Kx=5,Zx=6,Eg=300,eo=301,to=302,wd=303,Ad=304,Zl=306,Cd=1e3,pi=1001,Rd=1002,Tn=1003,Gp=1004,Vc=1005,ei=1006,Qx=1007,ea=1008,Cr=1009,Jx=1010,ey=1011,kd=1012,Tg=1013,Er=1014,Tr=1015,ta=1016,wg=1017,Ag=1018,ns=1020,ty=1021,mi=1023,ny=1024,iy=1025,is=1026,no=1027,ry=1028,Cg=1029,sy=1030,Rg=1031,bg=1033,Wc=33776,jc=33777,Xc=33778,Yc=33779,Vp=35840,Wp=35841,jp=35842,Xp=35843,Pg=36196,Yp=37492,qp=37496,$p=37808,Kp=37809,Zp=37810,Qp=37811,Jp=37812,em=37813,tm=37814,nm=37815,im=37816,rm=37817,sm=37818,om=37819,am=37820,lm=37821,qc=36492,um=36494,cm=36495,oy=36283,dm=36284,fm=36285,hm=36286,Lg=3e3,rs=3001,ay=3200,ly=3201,Dg=0,uy=1,ni="",ln="srgb",Yi="srgb-linear",Bd="display-p3",Ql="display-p3-linear",Vl="linear",Dt="srgb",Wl="rec709",jl="p3",Ds=7680,pm=519,cy=512,dy=513,fy=514,Ig=515,hy=516,py=517,my=518,gy=519,mm=35044,gm="300 es",bd=1035,ji=2e3,Xl=2001;class so{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].indexOf(t)===-1&&s[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const s=this._listeners;return s[e]!==void 0&&s[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const a=this._listeners[e];if(a!==void 0){const l=a.indexOf(t);l!==-1&&a.splice(l,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const s=this._listeners[e.type];if(s!==void 0){e.target=this;const a=s.slice(0);for(let l=0,d=a.length;l<d;l++)a[l].call(this,e);e.target=null}}}const vn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],$c=Math.PI/180,Pd=180/Math.PI;function sa(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(vn[r&255]+vn[r>>8&255]+vn[r>>16&255]+vn[r>>24&255]+"-"+vn[e&255]+vn[e>>8&255]+"-"+vn[e>>16&15|64]+vn[e>>24&255]+"-"+vn[t&63|128]+vn[t>>8&255]+"-"+vn[t>>16&255]+vn[t>>24&255]+vn[s&255]+vn[s>>8&255]+vn[s>>16&255]+vn[s>>24&255]).toLowerCase()}function Fn(r,e,t){return Math.max(e,Math.min(t,r))}function vy(r,e){return(r%e+e)%e}function Kc(r,e,t){return(1-t)*r+t*e}function vm(r){return(r&r-1)===0&&r!==0}function Ld(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Vo(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function In(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class St{constructor(e=0,t=0){St.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,s=this.y,a=e.elements;return this.x=a[0]*t+a[3]*s+a[6],this.y=a[1]*t+a[4]*s+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(e,Math.min(t,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const s=this.dot(e)/t;return Math.acos(Fn(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,s=this.y-e.y;return t*t+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const s=Math.cos(t),a=Math.sin(t),l=this.x-e.x,d=this.y-e.y;return this.x=l*s-d*a+e.x,this.y=l*a+d*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ht{constructor(e,t,s,a,l,d,c,f,p){ht.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,s,a,l,d,c,f,p)}set(e,t,s,a,l,d,c,f,p){const m=this.elements;return m[0]=e,m[1]=a,m[2]=c,m[3]=t,m[4]=l,m[5]=f,m[6]=s,m[7]=d,m[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,s=e.elements;return t[0]=s[0],t[1]=s[1],t[2]=s[2],t[3]=s[3],t[4]=s[4],t[5]=s[5],t[6]=s[6],t[7]=s[7],t[8]=s[8],this}extractBasis(e,t,s){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const s=e.elements,a=t.elements,l=this.elements,d=s[0],c=s[3],f=s[6],p=s[1],m=s[4],g=s[7],_=s[2],S=s[5],T=s[8],M=a[0],y=a[3],x=a[6],b=a[1],w=a[4],R=a[7],O=a[2],I=a[5],U=a[8];return l[0]=d*M+c*b+f*O,l[3]=d*y+c*w+f*I,l[6]=d*x+c*R+f*U,l[1]=p*M+m*b+g*O,l[4]=p*y+m*w+g*I,l[7]=p*x+m*R+g*U,l[2]=_*M+S*b+T*O,l[5]=_*y+S*w+T*I,l[8]=_*x+S*R+T*U,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],s=e[1],a=e[2],l=e[3],d=e[4],c=e[5],f=e[6],p=e[7],m=e[8];return t*d*m-t*c*p-s*l*m+s*c*f+a*l*p-a*d*f}invert(){const e=this.elements,t=e[0],s=e[1],a=e[2],l=e[3],d=e[4],c=e[5],f=e[6],p=e[7],m=e[8],g=m*d-c*p,_=c*f-m*l,S=p*l-d*f,T=t*g+s*_+a*S;if(T===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/T;return e[0]=g*M,e[1]=(a*p-m*s)*M,e[2]=(c*s-a*d)*M,e[3]=_*M,e[4]=(m*t-a*f)*M,e[5]=(a*l-c*t)*M,e[6]=S*M,e[7]=(s*f-p*t)*M,e[8]=(d*t-s*l)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,s,a,l,d,c){const f=Math.cos(l),p=Math.sin(l);return this.set(s*f,s*p,-s*(f*d+p*c)+d+e,-a*p,a*f,-a*(-p*d+f*c)+c+t,0,0,1),this}scale(e,t){return this.premultiply(Zc.makeScale(e,t)),this}rotate(e){return this.premultiply(Zc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Zc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),s=Math.sin(e);return this.set(t,-s,0,s,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,s=e.elements;for(let a=0;a<9;a++)if(t[a]!==s[a])return!1;return!0}fromArray(e,t=0){for(let s=0;s<9;s++)this.elements[s]=e[s+t];return this}toArray(e=[],t=0){const s=this.elements;return e[t]=s[0],e[t+1]=s[1],e[t+2]=s[2],e[t+3]=s[3],e[t+4]=s[4],e[t+5]=s[5],e[t+6]=s[6],e[t+7]=s[7],e[t+8]=s[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Zc=new ht;function Ng(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Yl(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function _y(){const r=Yl("canvas");return r.style.display="block",r}const _m={};function qo(r){r in _m||(_m[r]=!0,console.warn(r))}const xm=new ht().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ym=new ht().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),_l={[Yi]:{transfer:Vl,primaries:Wl,toReference:r=>r,fromReference:r=>r},[ln]:{transfer:Dt,primaries:Wl,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[Ql]:{transfer:Vl,primaries:jl,toReference:r=>r.applyMatrix3(ym),fromReference:r=>r.applyMatrix3(xm)},[Bd]:{transfer:Dt,primaries:jl,toReference:r=>r.convertSRGBToLinear().applyMatrix3(ym),fromReference:r=>r.applyMatrix3(xm).convertLinearToSRGB()}},xy=new Set([Yi,Ql]),wt={enabled:!0,_workingColorSpace:Yi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!xy.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;const s=_l[e].toReference,a=_l[t].fromReference;return a(s(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this._workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this._workingColorSpace)},getPrimaries:function(r){return _l[r].primaries},getTransfer:function(r){return r===ni?Vl:_l[r].transfer}};function Qs(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Qc(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Is;class Ug{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Is===void 0&&(Is=Yl("canvas")),Is.width=e.width,Is.height=e.height;const s=Is.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),t=Is}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Yl("canvas");t.width=e.width,t.height=e.height;const s=t.getContext("2d");s.drawImage(e,0,0,e.width,e.height);const a=s.getImageData(0,0,e.width,e.height),l=a.data;for(let d=0;d<l.length;d++)l[d]=Qs(l[d]/255)*255;return s.putImageData(a,0,0),t}else if(e.data){const t=e.data.slice(0);for(let s=0;s<t.length;s++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[s]=Math.floor(Qs(t[s]/255)*255):t[s]=Qs(t[s]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let yy=0;class Fg{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:yy++}),this.uuid=sa(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const s={uuid:this.uuid,url:""},a=this.data;if(a!==null){let l;if(Array.isArray(a)){l=[];for(let d=0,c=a.length;d<c;d++)a[d].isDataTexture?l.push(Jc(a[d].image)):l.push(Jc(a[d]))}else l=Jc(a);s.url=l}return t||(e.images[this.uuid]=s),s}}function Jc(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Ug.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Sy=0;class kn extends so{constructor(e=kn.DEFAULT_IMAGE,t=kn.DEFAULT_MAPPING,s=pi,a=pi,l=ei,d=ea,c=mi,f=Cr,p=kn.DEFAULT_ANISOTROPY,m=ni){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Sy++}),this.uuid=sa(),this.name="",this.source=new Fg(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=s,this.wrapT=a,this.magFilter=l,this.minFilter=d,this.anisotropy=p,this.format=c,this.internalFormat=null,this.type=f,this.offset=new St(0,0),this.repeat=new St(1,1),this.center=new St(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof m=="string"?this.colorSpace=m:(qo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=m===rs?ln:ni),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const s={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),t||(e.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Eg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Cd:e.x=e.x-Math.floor(e.x);break;case pi:e.x=e.x<0?0:1;break;case Rd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Cd:e.y=e.y-Math.floor(e.y);break;case pi:e.y=e.y<0?0:1;break;case Rd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return qo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===ln?rs:Lg}set encoding(e){qo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===rs?ln:ni}}kn.DEFAULT_IMAGE=null;kn.DEFAULT_MAPPING=Eg;kn.DEFAULT_ANISOTROPY=1;class sn{constructor(e=0,t=0,s=0,a=1){sn.prototype.isVector4=!0,this.x=e,this.y=t,this.z=s,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,s,a){return this.x=e,this.y=t,this.z=s,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,s=this.y,a=this.z,l=this.w,d=e.elements;return this.x=d[0]*t+d[4]*s+d[8]*a+d[12]*l,this.y=d[1]*t+d[5]*s+d[9]*a+d[13]*l,this.z=d[2]*t+d[6]*s+d[10]*a+d[14]*l,this.w=d[3]*t+d[7]*s+d[11]*a+d[15]*l,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,s,a,l;const f=e.elements,p=f[0],m=f[4],g=f[8],_=f[1],S=f[5],T=f[9],M=f[2],y=f[6],x=f[10];if(Math.abs(m-_)<.01&&Math.abs(g-M)<.01&&Math.abs(T-y)<.01){if(Math.abs(m+_)<.1&&Math.abs(g+M)<.1&&Math.abs(T+y)<.1&&Math.abs(p+S+x-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(p+1)/2,R=(S+1)/2,O=(x+1)/2,I=(m+_)/4,U=(g+M)/4,ce=(T+y)/4;return w>R&&w>O?w<.01?(s=0,a=.707106781,l=.707106781):(s=Math.sqrt(w),a=I/s,l=U/s):R>O?R<.01?(s=.707106781,a=0,l=.707106781):(a=Math.sqrt(R),s=I/a,l=ce/a):O<.01?(s=.707106781,a=.707106781,l=0):(l=Math.sqrt(O),s=U/l,a=ce/l),this.set(s,a,l,t),this}let b=Math.sqrt((y-T)*(y-T)+(g-M)*(g-M)+(_-m)*(_-m));return Math.abs(b)<.001&&(b=1),this.x=(y-T)/b,this.y=(g-M)/b,this.z=(_-m)/b,this.w=Math.acos((p+S+x-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(e,Math.min(t,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this.z=e.z+(t.z-e.z)*s,this.w=e.w+(t.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class My extends so{constructor(e=1,t=1,s={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new sn(0,0,e,t),this.scissorTest=!1,this.viewport=new sn(0,0,e,t);const a={width:e,height:t,depth:1};s.encoding!==void 0&&(qo("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),s.colorSpace=s.encoding===rs?ln:ni),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ei,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},s),this.texture=new kn(a,s.mapping,s.wrapS,s.wrapT,s.magFilter,s.minFilter,s.format,s.type,s.anisotropy,s.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=s.generateMipmaps,this.texture.internalFormat=s.internalFormat,this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.depthTexture=s.depthTexture,this.samples=s.samples}setSize(e,t,s=1){(this.width!==e||this.height!==t||this.depth!==s)&&(this.width=e,this.height=t,this.depth=s,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=s,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Fg(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ss extends My{constructor(e=1,t=1,s={}){super(e,t,s),this.isWebGLRenderTarget=!0}}class Og extends kn{constructor(e=null,t=1,s=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:s,depth:a},this.magFilter=Tn,this.minFilter=Tn,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ey extends kn{constructor(e=null,t=1,s=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:s,depth:a},this.magFilter=Tn,this.minFilter=Tn,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class oa{constructor(e=0,t=0,s=0,a=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=s,this._w=a}static slerpFlat(e,t,s,a,l,d,c){let f=s[a+0],p=s[a+1],m=s[a+2],g=s[a+3];const _=l[d+0],S=l[d+1],T=l[d+2],M=l[d+3];if(c===0){e[t+0]=f,e[t+1]=p,e[t+2]=m,e[t+3]=g;return}if(c===1){e[t+0]=_,e[t+1]=S,e[t+2]=T,e[t+3]=M;return}if(g!==M||f!==_||p!==S||m!==T){let y=1-c;const x=f*_+p*S+m*T+g*M,b=x>=0?1:-1,w=1-x*x;if(w>Number.EPSILON){const O=Math.sqrt(w),I=Math.atan2(O,x*b);y=Math.sin(y*I)/O,c=Math.sin(c*I)/O}const R=c*b;if(f=f*y+_*R,p=p*y+S*R,m=m*y+T*R,g=g*y+M*R,y===1-c){const O=1/Math.sqrt(f*f+p*p+m*m+g*g);f*=O,p*=O,m*=O,g*=O}}e[t]=f,e[t+1]=p,e[t+2]=m,e[t+3]=g}static multiplyQuaternionsFlat(e,t,s,a,l,d){const c=s[a],f=s[a+1],p=s[a+2],m=s[a+3],g=l[d],_=l[d+1],S=l[d+2],T=l[d+3];return e[t]=c*T+m*g+f*S-p*_,e[t+1]=f*T+m*_+p*g-c*S,e[t+2]=p*T+m*S+c*_-f*g,e[t+3]=m*T-c*g-f*_-p*S,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,s,a){return this._x=e,this._y=t,this._z=s,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const s=e._x,a=e._y,l=e._z,d=e._order,c=Math.cos,f=Math.sin,p=c(s/2),m=c(a/2),g=c(l/2),_=f(s/2),S=f(a/2),T=f(l/2);switch(d){case"XYZ":this._x=_*m*g+p*S*T,this._y=p*S*g-_*m*T,this._z=p*m*T+_*S*g,this._w=p*m*g-_*S*T;break;case"YXZ":this._x=_*m*g+p*S*T,this._y=p*S*g-_*m*T,this._z=p*m*T-_*S*g,this._w=p*m*g+_*S*T;break;case"ZXY":this._x=_*m*g-p*S*T,this._y=p*S*g+_*m*T,this._z=p*m*T+_*S*g,this._w=p*m*g-_*S*T;break;case"ZYX":this._x=_*m*g-p*S*T,this._y=p*S*g+_*m*T,this._z=p*m*T-_*S*g,this._w=p*m*g+_*S*T;break;case"YZX":this._x=_*m*g+p*S*T,this._y=p*S*g+_*m*T,this._z=p*m*T-_*S*g,this._w=p*m*g-_*S*T;break;case"XZY":this._x=_*m*g-p*S*T,this._y=p*S*g-_*m*T,this._z=p*m*T+_*S*g,this._w=p*m*g+_*S*T;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+d)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const s=t/2,a=Math.sin(s);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,s=t[0],a=t[4],l=t[8],d=t[1],c=t[5],f=t[9],p=t[2],m=t[6],g=t[10],_=s+c+g;if(_>0){const S=.5/Math.sqrt(_+1);this._w=.25/S,this._x=(m-f)*S,this._y=(l-p)*S,this._z=(d-a)*S}else if(s>c&&s>g){const S=2*Math.sqrt(1+s-c-g);this._w=(m-f)/S,this._x=.25*S,this._y=(a+d)/S,this._z=(l+p)/S}else if(c>g){const S=2*Math.sqrt(1+c-s-g);this._w=(l-p)/S,this._x=(a+d)/S,this._y=.25*S,this._z=(f+m)/S}else{const S=2*Math.sqrt(1+g-s-c);this._w=(d-a)/S,this._x=(l+p)/S,this._y=(f+m)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let s=e.dot(t)+1;return s<Number.EPSILON?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Fn(this.dot(e),-1,1)))}rotateTowards(e,t){const s=this.angleTo(e);if(s===0)return this;const a=Math.min(1,t/s);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const s=e._x,a=e._y,l=e._z,d=e._w,c=t._x,f=t._y,p=t._z,m=t._w;return this._x=s*m+d*c+a*p-l*f,this._y=a*m+d*f+l*c-s*p,this._z=l*m+d*p+s*f-a*c,this._w=d*m-s*c-a*f-l*p,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const s=this._x,a=this._y,l=this._z,d=this._w;let c=d*e._w+s*e._x+a*e._y+l*e._z;if(c<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,c=-c):this.copy(e),c>=1)return this._w=d,this._x=s,this._y=a,this._z=l,this;const f=1-c*c;if(f<=Number.EPSILON){const S=1-t;return this._w=S*d+t*this._w,this._x=S*s+t*this._x,this._y=S*a+t*this._y,this._z=S*l+t*this._z,this.normalize(),this}const p=Math.sqrt(f),m=Math.atan2(p,c),g=Math.sin((1-t)*m)/p,_=Math.sin(t*m)/p;return this._w=d*g+this._w*_,this._x=s*g+this._x*_,this._y=a*g+this._y*_,this._z=l*g+this._z*_,this._onChangeCallback(),this}slerpQuaternions(e,t,s){return this.copy(e).slerp(t,s)}random(){const e=Math.random(),t=Math.sqrt(1-e),s=Math.sqrt(e),a=2*Math.PI*Math.random(),l=2*Math.PI*Math.random();return this.set(t*Math.cos(a),s*Math.sin(l),s*Math.cos(l),t*Math.sin(a))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class le{constructor(e=0,t=0,s=0){le.prototype.isVector3=!0,this.x=e,this.y=t,this.z=s}set(e,t,s){return s===void 0&&(s=this.z),this.x=e,this.y=t,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Sm.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Sm.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,s=this.y,a=this.z,l=e.elements;return this.x=l[0]*t+l[3]*s+l[6]*a,this.y=l[1]*t+l[4]*s+l[7]*a,this.z=l[2]*t+l[5]*s+l[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,s=this.y,a=this.z,l=e.elements,d=1/(l[3]*t+l[7]*s+l[11]*a+l[15]);return this.x=(l[0]*t+l[4]*s+l[8]*a+l[12])*d,this.y=(l[1]*t+l[5]*s+l[9]*a+l[13])*d,this.z=(l[2]*t+l[6]*s+l[10]*a+l[14])*d,this}applyQuaternion(e){const t=this.x,s=this.y,a=this.z,l=e.x,d=e.y,c=e.z,f=e.w,p=2*(d*a-c*s),m=2*(c*t-l*a),g=2*(l*s-d*t);return this.x=t+f*p+d*g-c*m,this.y=s+f*m+c*p-l*g,this.z=a+f*g+l*m-d*p,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,s=this.y,a=this.z,l=e.elements;return this.x=l[0]*t+l[4]*s+l[8]*a,this.y=l[1]*t+l[5]*s+l[9]*a,this.z=l[2]*t+l[6]*s+l[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(e,Math.min(t,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this.z=e.z+(t.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const s=e.x,a=e.y,l=e.z,d=t.x,c=t.y,f=t.z;return this.x=a*f-l*c,this.y=l*d-s*f,this.z=s*c-a*d,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const s=e.dot(this)/t;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){return ed.copy(this).projectOnVector(e),this.sub(ed)}reflect(e){return this.sub(ed.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const s=this.dot(e)/t;return Math.acos(Fn(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,s=this.y-e.y,a=this.z-e.z;return t*t+s*s+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,s){const a=Math.sin(t)*e;return this.x=a*Math.sin(s),this.y=Math.cos(t)*e,this.z=a*Math.cos(s),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,s){return this.x=e*Math.sin(t),this.y=s,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=s,this.z=a,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,s=Math.sqrt(1-e**2);return this.x=s*Math.cos(t),this.y=s*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ed=new le,Sm=new oa;class aa{constructor(e=new le(1/0,1/0,1/0),t=new le(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,s=e.length;t<s;t+=3)this.expandByPoint(ui.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,s=e.count;t<s;t++)this.expandByPoint(ui.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,s=e.length;t<s;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const s=ui.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(s),this.max.copy(e).add(s),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const l=s.getAttribute("position");if(t===!0&&l!==void 0&&e.isInstancedMesh!==!0)for(let d=0,c=l.count;d<c;d++)e.isMesh===!0?e.getVertexPosition(d,ui):ui.fromBufferAttribute(l,d),ui.applyMatrix4(e.matrixWorld),this.expandByPoint(ui);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),xl.copy(e.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),xl.copy(s.boundingBox)),xl.applyMatrix4(e.matrixWorld),this.union(xl)}const a=e.children;for(let l=0,d=a.length;l<d;l++)this.expandByObject(a[l],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,ui),ui.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,s;return e.normal.x>0?(t=e.normal.x*this.min.x,s=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,s=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,s+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,s+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,s+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,s+=e.normal.z*this.min.z),t<=-e.constant&&s>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Wo),yl.subVectors(this.max,Wo),Ns.subVectors(e.a,Wo),Us.subVectors(e.b,Wo),Fs.subVectors(e.c,Wo),gr.subVectors(Us,Ns),vr.subVectors(Fs,Us),Xr.subVectors(Ns,Fs);let t=[0,-gr.z,gr.y,0,-vr.z,vr.y,0,-Xr.z,Xr.y,gr.z,0,-gr.x,vr.z,0,-vr.x,Xr.z,0,-Xr.x,-gr.y,gr.x,0,-vr.y,vr.x,0,-Xr.y,Xr.x,0];return!td(t,Ns,Us,Fs,yl)||(t=[1,0,0,0,1,0,0,0,1],!td(t,Ns,Us,Fs,yl))?!1:(Sl.crossVectors(gr,vr),t=[Sl.x,Sl.y,Sl.z],td(t,Ns,Us,Fs,yl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ui).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ui).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Fi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Fi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Fi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Fi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Fi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Fi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Fi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Fi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Fi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Fi=[new le,new le,new le,new le,new le,new le,new le,new le],ui=new le,xl=new aa,Ns=new le,Us=new le,Fs=new le,gr=new le,vr=new le,Xr=new le,Wo=new le,yl=new le,Sl=new le,Yr=new le;function td(r,e,t,s,a){for(let l=0,d=r.length-3;l<=d;l+=3){Yr.fromArray(r,l);const c=a.x*Math.abs(Yr.x)+a.y*Math.abs(Yr.y)+a.z*Math.abs(Yr.z),f=e.dot(Yr),p=t.dot(Yr),m=s.dot(Yr);if(Math.max(-Math.max(f,p,m),Math.min(f,p,m))>c)return!1}return!0}const Ty=new aa,jo=new le,nd=new le;class zd{constructor(e=new le,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const s=this.center;t!==void 0?s.copy(t):Ty.setFromPoints(e).getCenter(s);let a=0;for(let l=0,d=e.length;l<d;l++)a=Math.max(a,s.distanceToSquared(e[l]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const s=this.center.distanceToSquared(e);return t.copy(e),s>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;jo.subVectors(e,this.center);const t=jo.lengthSq();if(t>this.radius*this.radius){const s=Math.sqrt(t),a=(s-this.radius)*.5;this.center.addScaledVector(jo,a/s),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(nd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(jo.copy(e.center).add(nd)),this.expandByPoint(jo.copy(e.center).sub(nd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Oi=new le,id=new le,Ml=new le,_r=new le,rd=new le,El=new le,sd=new le;class wy{constructor(e=new le,t=new le(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Oi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const s=t.dot(this.direction);return s<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Oi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Oi.copy(this.origin).addScaledVector(this.direction,t),Oi.distanceToSquared(e))}distanceSqToSegment(e,t,s,a){id.copy(e).add(t).multiplyScalar(.5),Ml.copy(t).sub(e).normalize(),_r.copy(this.origin).sub(id);const l=e.distanceTo(t)*.5,d=-this.direction.dot(Ml),c=_r.dot(this.direction),f=-_r.dot(Ml),p=_r.lengthSq(),m=Math.abs(1-d*d);let g,_,S,T;if(m>0)if(g=d*f-c,_=d*c-f,T=l*m,g>=0)if(_>=-T)if(_<=T){const M=1/m;g*=M,_*=M,S=g*(g+d*_+2*c)+_*(d*g+_+2*f)+p}else _=l,g=Math.max(0,-(d*_+c)),S=-g*g+_*(_+2*f)+p;else _=-l,g=Math.max(0,-(d*_+c)),S=-g*g+_*(_+2*f)+p;else _<=-T?(g=Math.max(0,-(-d*l+c)),_=g>0?-l:Math.min(Math.max(-l,-f),l),S=-g*g+_*(_+2*f)+p):_<=T?(g=0,_=Math.min(Math.max(-l,-f),l),S=_*(_+2*f)+p):(g=Math.max(0,-(d*l+c)),_=g>0?l:Math.min(Math.max(-l,-f),l),S=-g*g+_*(_+2*f)+p);else _=d>0?-l:l,g=Math.max(0,-(d*_+c)),S=-g*g+_*(_+2*f)+p;return s&&s.copy(this.origin).addScaledVector(this.direction,g),a&&a.copy(id).addScaledVector(Ml,_),S}intersectSphere(e,t){Oi.subVectors(e.center,this.origin);const s=Oi.dot(this.direction),a=Oi.dot(Oi)-s*s,l=e.radius*e.radius;if(a>l)return null;const d=Math.sqrt(l-a),c=s-d,f=s+d;return f<0?null:c<0?this.at(f,t):this.at(c,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(e.normal)+e.constant)/t;return s>=0?s:null}intersectPlane(e,t){const s=this.distanceToPlane(e);return s===null?null:this.at(s,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let s,a,l,d,c,f;const p=1/this.direction.x,m=1/this.direction.y,g=1/this.direction.z,_=this.origin;return p>=0?(s=(e.min.x-_.x)*p,a=(e.max.x-_.x)*p):(s=(e.max.x-_.x)*p,a=(e.min.x-_.x)*p),m>=0?(l=(e.min.y-_.y)*m,d=(e.max.y-_.y)*m):(l=(e.max.y-_.y)*m,d=(e.min.y-_.y)*m),s>d||l>a||((l>s||isNaN(s))&&(s=l),(d<a||isNaN(a))&&(a=d),g>=0?(c=(e.min.z-_.z)*g,f=(e.max.z-_.z)*g):(c=(e.max.z-_.z)*g,f=(e.min.z-_.z)*g),s>f||c>a)||((c>s||s!==s)&&(s=c),(f<a||a!==a)&&(a=f),a<0)?null:this.at(s>=0?s:a,t)}intersectsBox(e){return this.intersectBox(e,Oi)!==null}intersectTriangle(e,t,s,a,l){rd.subVectors(t,e),El.subVectors(s,e),sd.crossVectors(rd,El);let d=this.direction.dot(sd),c;if(d>0){if(a)return null;c=1}else if(d<0)c=-1,d=-d;else return null;_r.subVectors(this.origin,e);const f=c*this.direction.dot(El.crossVectors(_r,El));if(f<0)return null;const p=c*this.direction.dot(rd.cross(_r));if(p<0||f+p>d)return null;const m=-c*_r.dot(sd);return m<0?null:this.at(m/d,l)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Kt{constructor(e,t,s,a,l,d,c,f,p,m,g,_,S,T,M,y){Kt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,s,a,l,d,c,f,p,m,g,_,S,T,M,y)}set(e,t,s,a,l,d,c,f,p,m,g,_,S,T,M,y){const x=this.elements;return x[0]=e,x[4]=t,x[8]=s,x[12]=a,x[1]=l,x[5]=d,x[9]=c,x[13]=f,x[2]=p,x[6]=m,x[10]=g,x[14]=_,x[3]=S,x[7]=T,x[11]=M,x[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Kt().fromArray(this.elements)}copy(e){const t=this.elements,s=e.elements;return t[0]=s[0],t[1]=s[1],t[2]=s[2],t[3]=s[3],t[4]=s[4],t[5]=s[5],t[6]=s[6],t[7]=s[7],t[8]=s[8],t[9]=s[9],t[10]=s[10],t[11]=s[11],t[12]=s[12],t[13]=s[13],t[14]=s[14],t[15]=s[15],this}copyPosition(e){const t=this.elements,s=e.elements;return t[12]=s[12],t[13]=s[13],t[14]=s[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,s){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this}makeBasis(e,t,s){return this.set(e.x,t.x,s.x,0,e.y,t.y,s.y,0,e.z,t.z,s.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,s=e.elements,a=1/Os.setFromMatrixColumn(e,0).length(),l=1/Os.setFromMatrixColumn(e,1).length(),d=1/Os.setFromMatrixColumn(e,2).length();return t[0]=s[0]*a,t[1]=s[1]*a,t[2]=s[2]*a,t[3]=0,t[4]=s[4]*l,t[5]=s[5]*l,t[6]=s[6]*l,t[7]=0,t[8]=s[8]*d,t[9]=s[9]*d,t[10]=s[10]*d,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,s=e.x,a=e.y,l=e.z,d=Math.cos(s),c=Math.sin(s),f=Math.cos(a),p=Math.sin(a),m=Math.cos(l),g=Math.sin(l);if(e.order==="XYZ"){const _=d*m,S=d*g,T=c*m,M=c*g;t[0]=f*m,t[4]=-f*g,t[8]=p,t[1]=S+T*p,t[5]=_-M*p,t[9]=-c*f,t[2]=M-_*p,t[6]=T+S*p,t[10]=d*f}else if(e.order==="YXZ"){const _=f*m,S=f*g,T=p*m,M=p*g;t[0]=_+M*c,t[4]=T*c-S,t[8]=d*p,t[1]=d*g,t[5]=d*m,t[9]=-c,t[2]=S*c-T,t[6]=M+_*c,t[10]=d*f}else if(e.order==="ZXY"){const _=f*m,S=f*g,T=p*m,M=p*g;t[0]=_-M*c,t[4]=-d*g,t[8]=T+S*c,t[1]=S+T*c,t[5]=d*m,t[9]=M-_*c,t[2]=-d*p,t[6]=c,t[10]=d*f}else if(e.order==="ZYX"){const _=d*m,S=d*g,T=c*m,M=c*g;t[0]=f*m,t[4]=T*p-S,t[8]=_*p+M,t[1]=f*g,t[5]=M*p+_,t[9]=S*p-T,t[2]=-p,t[6]=c*f,t[10]=d*f}else if(e.order==="YZX"){const _=d*f,S=d*p,T=c*f,M=c*p;t[0]=f*m,t[4]=M-_*g,t[8]=T*g+S,t[1]=g,t[5]=d*m,t[9]=-c*m,t[2]=-p*m,t[6]=S*g+T,t[10]=_-M*g}else if(e.order==="XZY"){const _=d*f,S=d*p,T=c*f,M=c*p;t[0]=f*m,t[4]=-g,t[8]=p*m,t[1]=_*g+M,t[5]=d*m,t[9]=S*g-T,t[2]=T*g-S,t[6]=c*m,t[10]=M*g+_}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ay,e,Cy)}lookAt(e,t,s){const a=this.elements;return Vn.subVectors(e,t),Vn.lengthSq()===0&&(Vn.z=1),Vn.normalize(),xr.crossVectors(s,Vn),xr.lengthSq()===0&&(Math.abs(s.z)===1?Vn.x+=1e-4:Vn.z+=1e-4,Vn.normalize(),xr.crossVectors(s,Vn)),xr.normalize(),Tl.crossVectors(Vn,xr),a[0]=xr.x,a[4]=Tl.x,a[8]=Vn.x,a[1]=xr.y,a[5]=Tl.y,a[9]=Vn.y,a[2]=xr.z,a[6]=Tl.z,a[10]=Vn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const s=e.elements,a=t.elements,l=this.elements,d=s[0],c=s[4],f=s[8],p=s[12],m=s[1],g=s[5],_=s[9],S=s[13],T=s[2],M=s[6],y=s[10],x=s[14],b=s[3],w=s[7],R=s[11],O=s[15],I=a[0],U=a[4],ce=a[8],C=a[12],D=a[1],Y=a[5],te=a[9],de=a[13],k=a[2],K=a[6],J=a[10],Z=a[14],V=a[3],Q=a[7],z=a[11],L=a[15];return l[0]=d*I+c*D+f*k+p*V,l[4]=d*U+c*Y+f*K+p*Q,l[8]=d*ce+c*te+f*J+p*z,l[12]=d*C+c*de+f*Z+p*L,l[1]=m*I+g*D+_*k+S*V,l[5]=m*U+g*Y+_*K+S*Q,l[9]=m*ce+g*te+_*J+S*z,l[13]=m*C+g*de+_*Z+S*L,l[2]=T*I+M*D+y*k+x*V,l[6]=T*U+M*Y+y*K+x*Q,l[10]=T*ce+M*te+y*J+x*z,l[14]=T*C+M*de+y*Z+x*L,l[3]=b*I+w*D+R*k+O*V,l[7]=b*U+w*Y+R*K+O*Q,l[11]=b*ce+w*te+R*J+O*z,l[15]=b*C+w*de+R*Z+O*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],s=e[4],a=e[8],l=e[12],d=e[1],c=e[5],f=e[9],p=e[13],m=e[2],g=e[6],_=e[10],S=e[14],T=e[3],M=e[7],y=e[11],x=e[15];return T*(+l*f*g-a*p*g-l*c*_+s*p*_+a*c*S-s*f*S)+M*(+t*f*S-t*p*_+l*d*_-a*d*S+a*p*m-l*f*m)+y*(+t*p*g-t*c*S-l*d*g+s*d*S+l*c*m-s*p*m)+x*(-a*c*m-t*f*g+t*c*_+a*d*g-s*d*_+s*f*m)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,s){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=t,a[14]=s),this}invert(){const e=this.elements,t=e[0],s=e[1],a=e[2],l=e[3],d=e[4],c=e[5],f=e[6],p=e[7],m=e[8],g=e[9],_=e[10],S=e[11],T=e[12],M=e[13],y=e[14],x=e[15],b=g*y*p-M*_*p+M*f*S-c*y*S-g*f*x+c*_*x,w=T*_*p-m*y*p-T*f*S+d*y*S+m*f*x-d*_*x,R=m*M*p-T*g*p+T*c*S-d*M*S-m*c*x+d*g*x,O=T*g*f-m*M*f-T*c*_+d*M*_+m*c*y-d*g*y,I=t*b+s*w+a*R+l*O;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/I;return e[0]=b*U,e[1]=(M*_*l-g*y*l-M*a*S+s*y*S+g*a*x-s*_*x)*U,e[2]=(c*y*l-M*f*l+M*a*p-s*y*p-c*a*x+s*f*x)*U,e[3]=(g*f*l-c*_*l-g*a*p+s*_*p+c*a*S-s*f*S)*U,e[4]=w*U,e[5]=(m*y*l-T*_*l+T*a*S-t*y*S-m*a*x+t*_*x)*U,e[6]=(T*f*l-d*y*l-T*a*p+t*y*p+d*a*x-t*f*x)*U,e[7]=(d*_*l-m*f*l+m*a*p-t*_*p-d*a*S+t*f*S)*U,e[8]=R*U,e[9]=(T*g*l-m*M*l-T*s*S+t*M*S+m*s*x-t*g*x)*U,e[10]=(d*M*l-T*c*l+T*s*p-t*M*p-d*s*x+t*c*x)*U,e[11]=(m*c*l-d*g*l-m*s*p+t*g*p+d*s*S-t*c*S)*U,e[12]=O*U,e[13]=(m*M*a-T*g*a+T*s*_-t*M*_-m*s*y+t*g*y)*U,e[14]=(T*c*a-d*M*a-T*s*f+t*M*f+d*s*y-t*c*y)*U,e[15]=(d*g*a-m*c*a+m*s*f-t*g*f-d*s*_+t*c*_)*U,this}scale(e){const t=this.elements,s=e.x,a=e.y,l=e.z;return t[0]*=s,t[4]*=a,t[8]*=l,t[1]*=s,t[5]*=a,t[9]*=l,t[2]*=s,t[6]*=a,t[10]*=l,t[3]*=s,t[7]*=a,t[11]*=l,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,s,a))}makeTranslation(e,t,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,s,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,t,-s,0,0,s,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),s=Math.sin(e);return this.set(t,0,s,0,0,1,0,0,-s,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),s=Math.sin(e);return this.set(t,-s,0,0,s,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const s=Math.cos(t),a=Math.sin(t),l=1-s,d=e.x,c=e.y,f=e.z,p=l*d,m=l*c;return this.set(p*d+s,p*c-a*f,p*f+a*c,0,p*c+a*f,m*c+s,m*f-a*d,0,p*f-a*c,m*f+a*d,l*f*f+s,0,0,0,0,1),this}makeScale(e,t,s){return this.set(e,0,0,0,0,t,0,0,0,0,s,0,0,0,0,1),this}makeShear(e,t,s,a,l,d){return this.set(1,s,l,0,e,1,d,0,t,a,1,0,0,0,0,1),this}compose(e,t,s){const a=this.elements,l=t._x,d=t._y,c=t._z,f=t._w,p=l+l,m=d+d,g=c+c,_=l*p,S=l*m,T=l*g,M=d*m,y=d*g,x=c*g,b=f*p,w=f*m,R=f*g,O=s.x,I=s.y,U=s.z;return a[0]=(1-(M+x))*O,a[1]=(S+R)*O,a[2]=(T-w)*O,a[3]=0,a[4]=(S-R)*I,a[5]=(1-(_+x))*I,a[6]=(y+b)*I,a[7]=0,a[8]=(T+w)*U,a[9]=(y-b)*U,a[10]=(1-(_+M))*U,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,t,s){const a=this.elements;let l=Os.set(a[0],a[1],a[2]).length();const d=Os.set(a[4],a[5],a[6]).length(),c=Os.set(a[8],a[9],a[10]).length();this.determinant()<0&&(l=-l),e.x=a[12],e.y=a[13],e.z=a[14],ci.copy(this);const p=1/l,m=1/d,g=1/c;return ci.elements[0]*=p,ci.elements[1]*=p,ci.elements[2]*=p,ci.elements[4]*=m,ci.elements[5]*=m,ci.elements[6]*=m,ci.elements[8]*=g,ci.elements[9]*=g,ci.elements[10]*=g,t.setFromRotationMatrix(ci),s.x=l,s.y=d,s.z=c,this}makePerspective(e,t,s,a,l,d,c=ji){const f=this.elements,p=2*l/(t-e),m=2*l/(s-a),g=(t+e)/(t-e),_=(s+a)/(s-a);let S,T;if(c===ji)S=-(d+l)/(d-l),T=-2*d*l/(d-l);else if(c===Xl)S=-d/(d-l),T=-d*l/(d-l);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return f[0]=p,f[4]=0,f[8]=g,f[12]=0,f[1]=0,f[5]=m,f[9]=_,f[13]=0,f[2]=0,f[6]=0,f[10]=S,f[14]=T,f[3]=0,f[7]=0,f[11]=-1,f[15]=0,this}makeOrthographic(e,t,s,a,l,d,c=ji){const f=this.elements,p=1/(t-e),m=1/(s-a),g=1/(d-l),_=(t+e)*p,S=(s+a)*m;let T,M;if(c===ji)T=(d+l)*g,M=-2*g;else if(c===Xl)T=l*g,M=-1*g;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return f[0]=2*p,f[4]=0,f[8]=0,f[12]=-_,f[1]=0,f[5]=2*m,f[9]=0,f[13]=-S,f[2]=0,f[6]=0,f[10]=M,f[14]=-T,f[3]=0,f[7]=0,f[11]=0,f[15]=1,this}equals(e){const t=this.elements,s=e.elements;for(let a=0;a<16;a++)if(t[a]!==s[a])return!1;return!0}fromArray(e,t=0){for(let s=0;s<16;s++)this.elements[s]=e[s+t];return this}toArray(e=[],t=0){const s=this.elements;return e[t]=s[0],e[t+1]=s[1],e[t+2]=s[2],e[t+3]=s[3],e[t+4]=s[4],e[t+5]=s[5],e[t+6]=s[6],e[t+7]=s[7],e[t+8]=s[8],e[t+9]=s[9],e[t+10]=s[10],e[t+11]=s[11],e[t+12]=s[12],e[t+13]=s[13],e[t+14]=s[14],e[t+15]=s[15],e}}const Os=new le,ci=new Kt,Ay=new le(0,0,0),Cy=new le(1,1,1),xr=new le,Tl=new le,Vn=new le,Mm=new Kt,Em=new oa;class Jl{constructor(e=0,t=0,s=0,a=Jl.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=s,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,s,a=this._order){return this._x=e,this._y=t,this._z=s,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,s=!0){const a=e.elements,l=a[0],d=a[4],c=a[8],f=a[1],p=a[5],m=a[9],g=a[2],_=a[6],S=a[10];switch(t){case"XYZ":this._y=Math.asin(Fn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-m,S),this._z=Math.atan2(-d,l)):(this._x=Math.atan2(_,p),this._z=0);break;case"YXZ":this._x=Math.asin(-Fn(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(c,S),this._z=Math.atan2(f,p)):(this._y=Math.atan2(-g,l),this._z=0);break;case"ZXY":this._x=Math.asin(Fn(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(-g,S),this._z=Math.atan2(-d,p)):(this._y=0,this._z=Math.atan2(f,l));break;case"ZYX":this._y=Math.asin(-Fn(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(_,S),this._z=Math.atan2(f,l)):(this._x=0,this._z=Math.atan2(-d,p));break;case"YZX":this._z=Math.asin(Fn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(-m,p),this._y=Math.atan2(-g,l)):(this._x=0,this._y=Math.atan2(c,S));break;case"XZY":this._z=Math.asin(-Fn(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(_,p),this._y=Math.atan2(c,l)):(this._x=Math.atan2(-m,S),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,s===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,s){return Mm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Mm,t,s)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Em.setFromEuler(this),this.setFromQuaternion(Em,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Jl.DEFAULT_ORDER="XYZ";class kg{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ry=0;const Tm=new le,ks=new oa,ki=new Kt,wl=new le,Xo=new le,by=new le,Py=new oa,wm=new le(1,0,0),Am=new le(0,1,0),Cm=new le(0,0,1),Ly={type:"added"},Dy={type:"removed"};class un extends so{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ry++}),this.uuid=sa(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=un.DEFAULT_UP.clone();const e=new le,t=new Jl,s=new oa,a=new le(1,1,1);function l(){s.setFromEuler(t,!1)}function d(){t.setFromQuaternion(s,void 0,!1)}t._onChange(l),s._onChange(d),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new Kt},normalMatrix:{value:new ht}}),this.matrix=new Kt,this.matrixWorld=new Kt,this.matrixAutoUpdate=un.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=un.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new kg,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ks.setFromAxisAngle(e,t),this.quaternion.multiply(ks),this}rotateOnWorldAxis(e,t){return ks.setFromAxisAngle(e,t),this.quaternion.premultiply(ks),this}rotateX(e){return this.rotateOnAxis(wm,e)}rotateY(e){return this.rotateOnAxis(Am,e)}rotateZ(e){return this.rotateOnAxis(Cm,e)}translateOnAxis(e,t){return Tm.copy(e).applyQuaternion(this.quaternion),this.position.add(Tm.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(wm,e)}translateY(e){return this.translateOnAxis(Am,e)}translateZ(e){return this.translateOnAxis(Cm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ki.copy(this.matrixWorld).invert())}lookAt(e,t,s){e.isVector3?wl.copy(e):wl.set(e,t,s);const a=this.parent;this.updateWorldMatrix(!0,!1),Xo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ki.lookAt(Xo,wl,this.up):ki.lookAt(wl,Xo,this.up),this.quaternion.setFromRotationMatrix(ki),a&&(ki.extractRotation(a.matrixWorld),ks.setFromRotationMatrix(ki),this.quaternion.premultiply(ks.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Ly)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Dy)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ki.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ki.multiply(e.parent.matrixWorld)),e.applyMatrix4(ki),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let s=0,a=this.children.length;s<a;s++){const d=this.children[s].getObjectByProperty(e,t);if(d!==void 0)return d}}getObjectsByProperty(e,t,s=[]){this[e]===t&&s.push(this);const a=this.children;for(let l=0,d=a.length;l<d;l++)a[l].getObjectsByProperty(e,t,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xo,e,by),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xo,Py,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let s=0,a=t.length;s<a;s++)t[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let s=0,a=t.length;s<a;s++)t[s].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let s=0,a=t.length;s<a;s++){const l=t[s];(l.matrixWorldAutoUpdate===!0||e===!0)&&l.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const s=this.parent;if(e===!0&&s!==null&&s.matrixWorldAutoUpdate===!0&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const a=this.children;for(let l=0,d=a.length;l<d;l++){const c=a[l];c.matrixWorldAutoUpdate===!0&&c.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",s={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.visibility=this._visibility,a.active=this._active,a.bounds=this._bounds.map(c=>({boxInitialized:c.boxInitialized,boxMin:c.box.min.toArray(),boxMax:c.box.max.toArray(),sphereInitialized:c.sphereInitialized,sphereRadius:c.sphere.radius,sphereCenter:c.sphere.center.toArray()})),a.maxGeometryCount=this._maxGeometryCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.geometryCount=this._geometryCount,a.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(a.boundingSphere={center:a.boundingSphere.center.toArray(),radius:a.boundingSphere.radius}),this.boundingBox!==null&&(a.boundingBox={min:a.boundingBox.min.toArray(),max:a.boundingBox.max.toArray()}));function l(c,f){return c[f.uuid]===void 0&&(c[f.uuid]=f.toJSON(e)),f.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=l(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const f=c.shapes;if(Array.isArray(f))for(let p=0,m=f.length;p<m;p++){const g=f[p];l(e.shapes,g)}else l(e.shapes,f)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(l(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let f=0,p=this.material.length;f<p;f++)c.push(l(e.materials,this.material[f]));a.material=c}else a.material=l(e.materials,this.material);if(this.children.length>0){a.children=[];for(let c=0;c<this.children.length;c++)a.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let c=0;c<this.animations.length;c++){const f=this.animations[c];a.animations.push(l(e.animations,f))}}if(t){const c=d(e.geometries),f=d(e.materials),p=d(e.textures),m=d(e.images),g=d(e.shapes),_=d(e.skeletons),S=d(e.animations),T=d(e.nodes);c.length>0&&(s.geometries=c),f.length>0&&(s.materials=f),p.length>0&&(s.textures=p),m.length>0&&(s.images=m),g.length>0&&(s.shapes=g),_.length>0&&(s.skeletons=_),S.length>0&&(s.animations=S),T.length>0&&(s.nodes=T)}return s.object=a,s;function d(c){const f=[];for(const p in c){const m=c[p];delete m.metadata,f.push(m)}return f}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let s=0;s<e.children.length;s++){const a=e.children[s];this.add(a.clone())}return this}}un.DEFAULT_UP=new le(0,1,0);un.DEFAULT_MATRIX_AUTO_UPDATE=!0;un.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const di=new le,Bi=new le,od=new le,zi=new le,Bs=new le,zs=new le,Rm=new le,ad=new le,ld=new le,ud=new le;let Al=!1;class hi{constructor(e=new le,t=new le,s=new le){this.a=e,this.b=t,this.c=s}static getNormal(e,t,s,a){a.subVectors(s,t),di.subVectors(e,t),a.cross(di);const l=a.lengthSq();return l>0?a.multiplyScalar(1/Math.sqrt(l)):a.set(0,0,0)}static getBarycoord(e,t,s,a,l){di.subVectors(a,t),Bi.subVectors(s,t),od.subVectors(e,t);const d=di.dot(di),c=di.dot(Bi),f=di.dot(od),p=Bi.dot(Bi),m=Bi.dot(od),g=d*p-c*c;if(g===0)return l.set(0,0,0),null;const _=1/g,S=(p*f-c*m)*_,T=(d*m-c*f)*_;return l.set(1-S-T,T,S)}static containsPoint(e,t,s,a){return this.getBarycoord(e,t,s,a,zi)===null?!1:zi.x>=0&&zi.y>=0&&zi.x+zi.y<=1}static getUV(e,t,s,a,l,d,c,f){return Al===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Al=!0),this.getInterpolation(e,t,s,a,l,d,c,f)}static getInterpolation(e,t,s,a,l,d,c,f){return this.getBarycoord(e,t,s,a,zi)===null?(f.x=0,f.y=0,"z"in f&&(f.z=0),"w"in f&&(f.w=0),null):(f.setScalar(0),f.addScaledVector(l,zi.x),f.addScaledVector(d,zi.y),f.addScaledVector(c,zi.z),f)}static isFrontFacing(e,t,s,a){return di.subVectors(s,t),Bi.subVectors(e,t),di.cross(Bi).dot(a)<0}set(e,t,s){return this.a.copy(e),this.b.copy(t),this.c.copy(s),this}setFromPointsAndIndices(e,t,s,a){return this.a.copy(e[t]),this.b.copy(e[s]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,t,s,a){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,s),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return di.subVectors(this.c,this.b),Bi.subVectors(this.a,this.b),di.cross(Bi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return hi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return hi.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,s,a,l){return Al===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Al=!0),hi.getInterpolation(e,this.a,this.b,this.c,t,s,a,l)}getInterpolation(e,t,s,a,l){return hi.getInterpolation(e,this.a,this.b,this.c,t,s,a,l)}containsPoint(e){return hi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return hi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const s=this.a,a=this.b,l=this.c;let d,c;Bs.subVectors(a,s),zs.subVectors(l,s),ad.subVectors(e,s);const f=Bs.dot(ad),p=zs.dot(ad);if(f<=0&&p<=0)return t.copy(s);ld.subVectors(e,a);const m=Bs.dot(ld),g=zs.dot(ld);if(m>=0&&g<=m)return t.copy(a);const _=f*g-m*p;if(_<=0&&f>=0&&m<=0)return d=f/(f-m),t.copy(s).addScaledVector(Bs,d);ud.subVectors(e,l);const S=Bs.dot(ud),T=zs.dot(ud);if(T>=0&&S<=T)return t.copy(l);const M=S*p-f*T;if(M<=0&&p>=0&&T<=0)return c=p/(p-T),t.copy(s).addScaledVector(zs,c);const y=m*T-S*g;if(y<=0&&g-m>=0&&S-T>=0)return Rm.subVectors(l,a),c=(g-m)/(g-m+(S-T)),t.copy(a).addScaledVector(Rm,c);const x=1/(y+M+_);return d=M*x,c=_*x,t.copy(s).addScaledVector(Bs,d).addScaledVector(zs,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Bg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yr={h:0,s:0,l:0},Cl={h:0,s:0,l:0};function cd(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class yt{constructor(e,t,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,s)}set(e,t,s){if(t===void 0&&s===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,t,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ln){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,wt.toWorkingColorSpace(this,t),this}setRGB(e,t,s,a=wt.workingColorSpace){return this.r=e,this.g=t,this.b=s,wt.toWorkingColorSpace(this,a),this}setHSL(e,t,s,a=wt.workingColorSpace){if(e=vy(e,1),t=Fn(t,0,1),s=Fn(s,0,1),t===0)this.r=this.g=this.b=s;else{const l=s<=.5?s*(1+t):s+t-s*t,d=2*s-l;this.r=cd(d,l,e+1/3),this.g=cd(d,l,e),this.b=cd(d,l,e-1/3)}return wt.toWorkingColorSpace(this,a),this}setStyle(e,t=ln){function s(l){l!==void 0&&parseFloat(l)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let l;const d=a[1],c=a[2];switch(d){case"rgb":case"rgba":if(l=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return s(l[4]),this.setRGB(Math.min(255,parseInt(l[1],10))/255,Math.min(255,parseInt(l[2],10))/255,Math.min(255,parseInt(l[3],10))/255,t);if(l=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return s(l[4]),this.setRGB(Math.min(100,parseInt(l[1],10))/100,Math.min(100,parseInt(l[2],10))/100,Math.min(100,parseInt(l[3],10))/100,t);break;case"hsl":case"hsla":if(l=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return s(l[4]),this.setHSL(parseFloat(l[1])/360,parseFloat(l[2])/100,parseFloat(l[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const l=a[1],d=l.length;if(d===3)return this.setRGB(parseInt(l.charAt(0),16)/15,parseInt(l.charAt(1),16)/15,parseInt(l.charAt(2),16)/15,t);if(d===6)return this.setHex(parseInt(l,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ln){const s=Bg[e.toLowerCase()];return s!==void 0?this.setHex(s,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Qs(e.r),this.g=Qs(e.g),this.b=Qs(e.b),this}copyLinearToSRGB(e){return this.r=Qc(e.r),this.g=Qc(e.g),this.b=Qc(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ln){return wt.fromWorkingColorSpace(_n.copy(this),e),Math.round(Fn(_n.r*255,0,255))*65536+Math.round(Fn(_n.g*255,0,255))*256+Math.round(Fn(_n.b*255,0,255))}getHexString(e=ln){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=wt.workingColorSpace){wt.fromWorkingColorSpace(_n.copy(this),t);const s=_n.r,a=_n.g,l=_n.b,d=Math.max(s,a,l),c=Math.min(s,a,l);let f,p;const m=(c+d)/2;if(c===d)f=0,p=0;else{const g=d-c;switch(p=m<=.5?g/(d+c):g/(2-d-c),d){case s:f=(a-l)/g+(a<l?6:0);break;case a:f=(l-s)/g+2;break;case l:f=(s-a)/g+4;break}f/=6}return e.h=f,e.s=p,e.l=m,e}getRGB(e,t=wt.workingColorSpace){return wt.fromWorkingColorSpace(_n.copy(this),t),e.r=_n.r,e.g=_n.g,e.b=_n.b,e}getStyle(e=ln){wt.fromWorkingColorSpace(_n.copy(this),e);const t=_n.r,s=_n.g,a=_n.b;return e!==ln?`color(${e} ${t.toFixed(3)} ${s.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(s*255)},${Math.round(a*255)})`}offsetHSL(e,t,s){return this.getHSL(yr),this.setHSL(yr.h+e,yr.s+t,yr.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,s){return this.r=e.r+(t.r-e.r)*s,this.g=e.g+(t.g-e.g)*s,this.b=e.b+(t.b-e.b)*s,this}lerpHSL(e,t){this.getHSL(yr),e.getHSL(Cl);const s=Kc(yr.h,Cl.h,t),a=Kc(yr.s,Cl.s,t),l=Kc(yr.l,Cl.l,t);return this.setHSL(s,a,l),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,s=this.g,a=this.b,l=e.elements;return this.r=l[0]*t+l[3]*s+l[6]*a,this.g=l[1]*t+l[4]*s+l[7]*a,this.b=l[2]*t+l[5]*s+l[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const _n=new yt;yt.NAMES=Bg;let Iy=0;class la extends so{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Iy++}),this.uuid=sa(),this.name="",this.type="Material",this.blending=Zs,this.side=Rr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ed,this.blendDst=Td,this.blendEquation=Qr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new yt(0,0,0),this.blendAlpha=0,this.depthFunc=Gl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=pm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ds,this.stencilZFail=Ds,this.stencilZPass=Ds,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const s=e[t];if(s===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const a=this[t];if(a===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(s):a&&a.isVector3&&s&&s.isVector3?a.copy(s):this[t]=s}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const s={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(e).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(e).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(e).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(e).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(e).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==Zs&&(s.blending=this.blending),this.side!==Rr&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==Ed&&(s.blendSrc=this.blendSrc),this.blendDst!==Td&&(s.blendDst=this.blendDst),this.blendEquation!==Qr&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==Gl&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==pm&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ds&&(s.stencilFail=this.stencilFail),this.stencilZFail!==Ds&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==Ds&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function a(l){const d=[];for(const c in l){const f=l[c];delete f.metadata,d.push(f)}return d}if(t){const l=a(e.textures),d=a(e.images);l.length>0&&(s.textures=l),d.length>0&&(s.images=d)}return s}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let s=null;if(t!==null){const a=t.length;s=new Array(a);for(let l=0;l!==a;++l)s[l]=t[l].clone()}return this.clippingPlanes=s,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class zg extends la{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Mg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const jt=new le,Rl=new St;class Mi{constructor(e,t,s=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=s,this.usage=mm,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Tr,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,s){e*=this.itemSize,s*=t.itemSize;for(let a=0,l=this.itemSize;a<l;a++)this.array[e+a]=t.array[s+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,s=this.count;t<s;t++)Rl.fromBufferAttribute(this,t),Rl.applyMatrix3(e),this.setXY(t,Rl.x,Rl.y);else if(this.itemSize===3)for(let t=0,s=this.count;t<s;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix3(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyMatrix4(e){for(let t=0,s=this.count;t<s;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix4(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyNormalMatrix(e){for(let t=0,s=this.count;t<s;t++)jt.fromBufferAttribute(this,t),jt.applyNormalMatrix(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}transformDirection(e){for(let t=0,s=this.count;t<s;t++)jt.fromBufferAttribute(this,t),jt.transformDirection(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let s=this.array[e*this.itemSize+t];return this.normalized&&(s=Vo(s,this.array)),s}setComponent(e,t,s){return this.normalized&&(s=In(s,this.array)),this.array[e*this.itemSize+t]=s,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Vo(t,this.array)),t}setX(e,t){return this.normalized&&(t=In(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Vo(t,this.array)),t}setY(e,t){return this.normalized&&(t=In(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Vo(t,this.array)),t}setZ(e,t){return this.normalized&&(t=In(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Vo(t,this.array)),t}setW(e,t){return this.normalized&&(t=In(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,s){return e*=this.itemSize,this.normalized&&(t=In(t,this.array),s=In(s,this.array)),this.array[e+0]=t,this.array[e+1]=s,this}setXYZ(e,t,s,a){return e*=this.itemSize,this.normalized&&(t=In(t,this.array),s=In(s,this.array),a=In(a,this.array)),this.array[e+0]=t,this.array[e+1]=s,this.array[e+2]=a,this}setXYZW(e,t,s,a,l){return e*=this.itemSize,this.normalized&&(t=In(t,this.array),s=In(s,this.array),a=In(a,this.array),l=In(l,this.array)),this.array[e+0]=t,this.array[e+1]=s,this.array[e+2]=a,this.array[e+3]=l,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==mm&&(e.usage=this.usage),e}}class Hg extends Mi{constructor(e,t,s){super(new Uint16Array(e),t,s)}}class Gg extends Mi{constructor(e,t,s){super(new Uint32Array(e),t,s)}}class Ei extends Mi{constructor(e,t,s){super(new Float32Array(e),t,s)}}let Ny=0;const Jn=new Kt,dd=new un,Hs=new le,Wn=new aa,Yo=new aa,rn=new le;class Pr extends so{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ny++}),this.uuid=sa(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ng(e)?Gg:Hg)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,s=0){this.groups.push({start:e,count:t,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const l=new ht().getNormalMatrix(e);s.applyNormalMatrix(l),s.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Jn.makeRotationFromQuaternion(e),this.applyMatrix4(Jn),this}rotateX(e){return Jn.makeRotationX(e),this.applyMatrix4(Jn),this}rotateY(e){return Jn.makeRotationY(e),this.applyMatrix4(Jn),this}rotateZ(e){return Jn.makeRotationZ(e),this.applyMatrix4(Jn),this}translate(e,t,s){return Jn.makeTranslation(e,t,s),this.applyMatrix4(Jn),this}scale(e,t,s){return Jn.makeScale(e,t,s),this.applyMatrix4(Jn),this}lookAt(e){return dd.lookAt(e),dd.updateMatrix(),this.applyMatrix4(dd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hs).negate(),this.translate(Hs.x,Hs.y,Hs.z),this}setFromPoints(e){const t=[];for(let s=0,a=e.length;s<a;s++){const l=e[s];t.push(l.x,l.y,l.z||0)}return this.setAttribute("position",new Ei(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new aa);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new le(-1/0,-1/0,-1/0),new le(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const l=t[s];Wn.setFromBufferAttribute(l),this.morphTargetsRelative?(rn.addVectors(this.boundingBox.min,Wn.min),this.boundingBox.expandByPoint(rn),rn.addVectors(this.boundingBox.max,Wn.max),this.boundingBox.expandByPoint(rn)):(this.boundingBox.expandByPoint(Wn.min),this.boundingBox.expandByPoint(Wn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new zd);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new le,1/0);return}if(e){const s=this.boundingSphere.center;if(Wn.setFromBufferAttribute(e),t)for(let l=0,d=t.length;l<d;l++){const c=t[l];Yo.setFromBufferAttribute(c),this.morphTargetsRelative?(rn.addVectors(Wn.min,Yo.min),Wn.expandByPoint(rn),rn.addVectors(Wn.max,Yo.max),Wn.expandByPoint(rn)):(Wn.expandByPoint(Yo.min),Wn.expandByPoint(Yo.max))}Wn.getCenter(s);let a=0;for(let l=0,d=e.count;l<d;l++)rn.fromBufferAttribute(e,l),a=Math.max(a,s.distanceToSquared(rn));if(t)for(let l=0,d=t.length;l<d;l++){const c=t[l],f=this.morphTargetsRelative;for(let p=0,m=c.count;p<m;p++)rn.fromBufferAttribute(c,p),f&&(Hs.fromBufferAttribute(e,p),rn.add(Hs)),a=Math.max(a,s.distanceToSquared(rn))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=e.array,a=t.position.array,l=t.normal.array,d=t.uv.array,c=a.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Mi(new Float32Array(4*c),4));const f=this.getAttribute("tangent").array,p=[],m=[];for(let D=0;D<c;D++)p[D]=new le,m[D]=new le;const g=new le,_=new le,S=new le,T=new St,M=new St,y=new St,x=new le,b=new le;function w(D,Y,te){g.fromArray(a,D*3),_.fromArray(a,Y*3),S.fromArray(a,te*3),T.fromArray(d,D*2),M.fromArray(d,Y*2),y.fromArray(d,te*2),_.sub(g),S.sub(g),M.sub(T),y.sub(T);const de=1/(M.x*y.y-y.x*M.y);isFinite(de)&&(x.copy(_).multiplyScalar(y.y).addScaledVector(S,-M.y).multiplyScalar(de),b.copy(S).multiplyScalar(M.x).addScaledVector(_,-y.x).multiplyScalar(de),p[D].add(x),p[Y].add(x),p[te].add(x),m[D].add(b),m[Y].add(b),m[te].add(b))}let R=this.groups;R.length===0&&(R=[{start:0,count:s.length}]);for(let D=0,Y=R.length;D<Y;++D){const te=R[D],de=te.start,k=te.count;for(let K=de,J=de+k;K<J;K+=3)w(s[K+0],s[K+1],s[K+2])}const O=new le,I=new le,U=new le,ce=new le;function C(D){U.fromArray(l,D*3),ce.copy(U);const Y=p[D];O.copy(Y),O.sub(U.multiplyScalar(U.dot(Y))).normalize(),I.crossVectors(ce,Y);const de=I.dot(m[D])<0?-1:1;f[D*4]=O.x,f[D*4+1]=O.y,f[D*4+2]=O.z,f[D*4+3]=de}for(let D=0,Y=R.length;D<Y;++D){const te=R[D],de=te.start,k=te.count;for(let K=de,J=de+k;K<J;K+=3)C(s[K+0]),C(s[K+1]),C(s[K+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new Mi(new Float32Array(t.count*3),3),this.setAttribute("normal",s);else for(let _=0,S=s.count;_<S;_++)s.setXYZ(_,0,0,0);const a=new le,l=new le,d=new le,c=new le,f=new le,p=new le,m=new le,g=new le;if(e)for(let _=0,S=e.count;_<S;_+=3){const T=e.getX(_+0),M=e.getX(_+1),y=e.getX(_+2);a.fromBufferAttribute(t,T),l.fromBufferAttribute(t,M),d.fromBufferAttribute(t,y),m.subVectors(d,l),g.subVectors(a,l),m.cross(g),c.fromBufferAttribute(s,T),f.fromBufferAttribute(s,M),p.fromBufferAttribute(s,y),c.add(m),f.add(m),p.add(m),s.setXYZ(T,c.x,c.y,c.z),s.setXYZ(M,f.x,f.y,f.z),s.setXYZ(y,p.x,p.y,p.z)}else for(let _=0,S=t.count;_<S;_+=3)a.fromBufferAttribute(t,_+0),l.fromBufferAttribute(t,_+1),d.fromBufferAttribute(t,_+2),m.subVectors(d,l),g.subVectors(a,l),m.cross(g),s.setXYZ(_+0,m.x,m.y,m.z),s.setXYZ(_+1,m.x,m.y,m.z),s.setXYZ(_+2,m.x,m.y,m.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,s=e.count;t<s;t++)rn.fromBufferAttribute(e,t),rn.normalize(),e.setXYZ(t,rn.x,rn.y,rn.z)}toNonIndexed(){function e(c,f){const p=c.array,m=c.itemSize,g=c.normalized,_=new p.constructor(f.length*m);let S=0,T=0;for(let M=0,y=f.length;M<y;M++){c.isInterleavedBufferAttribute?S=f[M]*c.data.stride+c.offset:S=f[M]*m;for(let x=0;x<m;x++)_[T++]=p[S++]}return new Mi(_,m,g)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Pr,s=this.index.array,a=this.attributes;for(const c in a){const f=a[c],p=e(f,s);t.setAttribute(c,p)}const l=this.morphAttributes;for(const c in l){const f=[],p=l[c];for(let m=0,g=p.length;m<g;m++){const _=p[m],S=e(_,s);f.push(S)}t.morphAttributes[c]=f}t.morphTargetsRelative=this.morphTargetsRelative;const d=this.groups;for(let c=0,f=d.length;c<f;c++){const p=d[c];t.addGroup(p.start,p.count,p.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const f=this.parameters;for(const p in f)f[p]!==void 0&&(e[p]=f[p]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const s=this.attributes;for(const f in s){const p=s[f];e.data.attributes[f]=p.toJSON(e.data)}const a={};let l=!1;for(const f in this.morphAttributes){const p=this.morphAttributes[f],m=[];for(let g=0,_=p.length;g<_;g++){const S=p[g];m.push(S.toJSON(e.data))}m.length>0&&(a[f]=m,l=!0)}l&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const d=this.groups;d.length>0&&(e.data.groups=JSON.parse(JSON.stringify(d)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere={center:c.center.toArray(),radius:c.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const s=e.index;s!==null&&this.setIndex(s.clone(t));const a=e.attributes;for(const p in a){const m=a[p];this.setAttribute(p,m.clone(t))}const l=e.morphAttributes;for(const p in l){const m=[],g=l[p];for(let _=0,S=g.length;_<S;_++)m.push(g[_].clone(t));this.morphAttributes[p]=m}this.morphTargetsRelative=e.morphTargetsRelative;const d=e.groups;for(let p=0,m=d.length;p<m;p++){const g=d[p];this.addGroup(g.start,g.count,g.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const f=e.boundingSphere;return f!==null&&(this.boundingSphere=f.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const bm=new Kt,qr=new wy,bl=new zd,Pm=new le,Gs=new le,Vs=new le,Ws=new le,fd=new le,Pl=new le,Ll=new St,Dl=new St,Il=new St,Lm=new le,Dm=new le,Im=new le,Nl=new le,Ul=new le;class Xi extends un{constructor(e=new Pr,t=new zg){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,s=Object.keys(t);if(s.length>0){const a=t[s[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,d=a.length;l<d;l++){const c=a[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=l}}}}getVertexPosition(e,t){const s=this.geometry,a=s.attributes.position,l=s.morphAttributes.position,d=s.morphTargetsRelative;t.fromBufferAttribute(a,e);const c=this.morphTargetInfluences;if(l&&c){Pl.set(0,0,0);for(let f=0,p=l.length;f<p;f++){const m=c[f],g=l[f];m!==0&&(fd.fromBufferAttribute(g,e),d?Pl.addScaledVector(fd,m):Pl.addScaledVector(fd.sub(t),m))}t.add(Pl)}return t}raycast(e,t){const s=this.geometry,a=this.material,l=this.matrixWorld;a!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),bl.copy(s.boundingSphere),bl.applyMatrix4(l),qr.copy(e.ray).recast(e.near),!(bl.containsPoint(qr.origin)===!1&&(qr.intersectSphere(bl,Pm)===null||qr.origin.distanceToSquared(Pm)>(e.far-e.near)**2))&&(bm.copy(l).invert(),qr.copy(e.ray).applyMatrix4(bm),!(s.boundingBox!==null&&qr.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(e,t,qr)))}_computeIntersections(e,t,s){let a;const l=this.geometry,d=this.material,c=l.index,f=l.attributes.position,p=l.attributes.uv,m=l.attributes.uv1,g=l.attributes.normal,_=l.groups,S=l.drawRange;if(c!==null)if(Array.isArray(d))for(let T=0,M=_.length;T<M;T++){const y=_[T],x=d[y.materialIndex],b=Math.max(y.start,S.start),w=Math.min(c.count,Math.min(y.start+y.count,S.start+S.count));for(let R=b,O=w;R<O;R+=3){const I=c.getX(R),U=c.getX(R+1),ce=c.getX(R+2);a=Fl(this,x,e,s,p,m,g,I,U,ce),a&&(a.faceIndex=Math.floor(R/3),a.face.materialIndex=y.materialIndex,t.push(a))}}else{const T=Math.max(0,S.start),M=Math.min(c.count,S.start+S.count);for(let y=T,x=M;y<x;y+=3){const b=c.getX(y),w=c.getX(y+1),R=c.getX(y+2);a=Fl(this,d,e,s,p,m,g,b,w,R),a&&(a.faceIndex=Math.floor(y/3),t.push(a))}}else if(f!==void 0)if(Array.isArray(d))for(let T=0,M=_.length;T<M;T++){const y=_[T],x=d[y.materialIndex],b=Math.max(y.start,S.start),w=Math.min(f.count,Math.min(y.start+y.count,S.start+S.count));for(let R=b,O=w;R<O;R+=3){const I=R,U=R+1,ce=R+2;a=Fl(this,x,e,s,p,m,g,I,U,ce),a&&(a.faceIndex=Math.floor(R/3),a.face.materialIndex=y.materialIndex,t.push(a))}}else{const T=Math.max(0,S.start),M=Math.min(f.count,S.start+S.count);for(let y=T,x=M;y<x;y+=3){const b=y,w=y+1,R=y+2;a=Fl(this,d,e,s,p,m,g,b,w,R),a&&(a.faceIndex=Math.floor(y/3),t.push(a))}}}}function Uy(r,e,t,s,a,l,d,c){let f;if(e.side===On?f=s.intersectTriangle(d,l,a,!0,c):f=s.intersectTriangle(a,l,d,e.side===Rr,c),f===null)return null;Ul.copy(c),Ul.applyMatrix4(r.matrixWorld);const p=t.ray.origin.distanceTo(Ul);return p<t.near||p>t.far?null:{distance:p,point:Ul.clone(),object:r}}function Fl(r,e,t,s,a,l,d,c,f,p){r.getVertexPosition(c,Gs),r.getVertexPosition(f,Vs),r.getVertexPosition(p,Ws);const m=Uy(r,e,t,s,Gs,Vs,Ws,Nl);if(m){a&&(Ll.fromBufferAttribute(a,c),Dl.fromBufferAttribute(a,f),Il.fromBufferAttribute(a,p),m.uv=hi.getInterpolation(Nl,Gs,Vs,Ws,Ll,Dl,Il,new St)),l&&(Ll.fromBufferAttribute(l,c),Dl.fromBufferAttribute(l,f),Il.fromBufferAttribute(l,p),m.uv1=hi.getInterpolation(Nl,Gs,Vs,Ws,Ll,Dl,Il,new St),m.uv2=m.uv1),d&&(Lm.fromBufferAttribute(d,c),Dm.fromBufferAttribute(d,f),Im.fromBufferAttribute(d,p),m.normal=hi.getInterpolation(Nl,Gs,Vs,Ws,Lm,Dm,Im,new le),m.normal.dot(s.direction)>0&&m.normal.multiplyScalar(-1));const g={a:c,b:f,c:p,normal:new le,materialIndex:0};hi.getNormal(Gs,Vs,Ws,g.normal),m.face=g}return m}class ua extends Pr{constructor(e=1,t=1,s=1,a=1,l=1,d=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:s,widthSegments:a,heightSegments:l,depthSegments:d};const c=this;a=Math.floor(a),l=Math.floor(l),d=Math.floor(d);const f=[],p=[],m=[],g=[];let _=0,S=0;T("z","y","x",-1,-1,s,t,e,d,l,0),T("z","y","x",1,-1,s,t,-e,d,l,1),T("x","z","y",1,1,e,s,t,a,d,2),T("x","z","y",1,-1,e,s,-t,a,d,3),T("x","y","z",1,-1,e,t,s,a,l,4),T("x","y","z",-1,-1,e,t,-s,a,l,5),this.setIndex(f),this.setAttribute("position",new Ei(p,3)),this.setAttribute("normal",new Ei(m,3)),this.setAttribute("uv",new Ei(g,2));function T(M,y,x,b,w,R,O,I,U,ce,C){const D=R/U,Y=O/ce,te=R/2,de=O/2,k=I/2,K=U+1,J=ce+1;let Z=0,V=0;const Q=new le;for(let z=0;z<J;z++){const L=z*Y-de;for(let G=0;G<K;G++){const j=G*D-te;Q[M]=j*b,Q[y]=L*w,Q[x]=k,p.push(Q.x,Q.y,Q.z),Q[M]=0,Q[y]=0,Q[x]=I>0?1:-1,m.push(Q.x,Q.y,Q.z),g.push(G/U),g.push(1-z/ce),Z+=1}}for(let z=0;z<ce;z++)for(let L=0;L<U;L++){const G=_+L+K*z,j=_+L+K*(z+1),re=_+(L+1)+K*(z+1),fe=_+(L+1)+K*z;f.push(G,j,fe),f.push(j,re,fe),V+=6}c.addGroup(S,V,C),S+=V,_+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ua(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function io(r){const e={};for(const t in r){e[t]={};for(const s in r[t]){const a=r[t][s];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][s]=null):e[t][s]=a.clone():Array.isArray(a)?e[t][s]=a.slice():e[t][s]=a}}return e}function En(r){const e={};for(let t=0;t<r.length;t++){const s=io(r[t]);for(const a in s)e[a]=s[a]}return e}function Fy(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Vg(r){return r.getRenderTarget()===null?r.outputColorSpace:wt.workingColorSpace}const Oy={clone:io,merge:En};var ky=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,By=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class os extends la{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ky,this.fragmentShader=By,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=io(e.uniforms),this.uniformsGroups=Fy(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const a in this.uniforms){const d=this.uniforms[a].value;d&&d.isTexture?t.uniforms[a]={type:"t",value:d.toJSON(e).uuid}:d&&d.isColor?t.uniforms[a]={type:"c",value:d.getHex()}:d&&d.isVector2?t.uniforms[a]={type:"v2",value:d.toArray()}:d&&d.isVector3?t.uniforms[a]={type:"v3",value:d.toArray()}:d&&d.isVector4?t.uniforms[a]={type:"v4",value:d.toArray()}:d&&d.isMatrix3?t.uniforms[a]={type:"m3",value:d.toArray()}:d&&d.isMatrix4?t.uniforms[a]={type:"m4",value:d.toArray()}:t.uniforms[a]={value:d}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const s={};for(const a in this.extensions)this.extensions[a]===!0&&(s[a]=!0);return Object.keys(s).length>0&&(t.extensions=s),t}}class Wg extends un{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Kt,this.projectionMatrix=new Kt,this.projectionMatrixInverse=new Kt,this.coordinateSystem=ji}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class ti extends Wg{constructor(e=50,t=1,s=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=a,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Pd*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan($c*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Pd*2*Math.atan(Math.tan($c*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,s,a,l,d){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=s,this.view.offsetY=a,this.view.width=l,this.view.height=d,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan($c*.5*this.fov)/this.zoom,s=2*t,a=this.aspect*s,l=-.5*a;const d=this.view;if(this.view!==null&&this.view.enabled){const f=d.fullWidth,p=d.fullHeight;l+=d.offsetX*a/f,t-=d.offsetY*s/p,a*=d.width/f,s*=d.height/p}const c=this.filmOffset;c!==0&&(l+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(l,l+a,t,t-s,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const js=-90,Xs=1;class zy extends un{constructor(e,t,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new ti(js,Xs,e,t);a.layers=this.layers,this.add(a);const l=new ti(js,Xs,e,t);l.layers=this.layers,this.add(l);const d=new ti(js,Xs,e,t);d.layers=this.layers,this.add(d);const c=new ti(js,Xs,e,t);c.layers=this.layers,this.add(c);const f=new ti(js,Xs,e,t);f.layers=this.layers,this.add(f);const p=new ti(js,Xs,e,t);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[s,a,l,d,c,f]=t;for(const p of t)this.remove(p);if(e===ji)s.up.set(0,1,0),s.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),l.up.set(0,0,-1),l.lookAt(0,1,0),d.up.set(0,0,1),d.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),f.up.set(0,1,0),f.lookAt(0,0,-1);else if(e===Xl)s.up.set(0,-1,0),s.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),l.up.set(0,0,1),l.lookAt(0,1,0),d.up.set(0,0,-1),d.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),f.up.set(0,-1,0),f.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const p of t)this.add(p),p.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[l,d,c,f,p,m]=this.children,g=e.getRenderTarget(),_=e.getActiveCubeFace(),S=e.getActiveMipmapLevel(),T=e.xr.enabled;e.xr.enabled=!1;const M=s.texture.generateMipmaps;s.texture.generateMipmaps=!1,e.setRenderTarget(s,0,a),e.render(t,l),e.setRenderTarget(s,1,a),e.render(t,d),e.setRenderTarget(s,2,a),e.render(t,c),e.setRenderTarget(s,3,a),e.render(t,f),e.setRenderTarget(s,4,a),e.render(t,p),s.texture.generateMipmaps=M,e.setRenderTarget(s,5,a),e.render(t,m),e.setRenderTarget(g,_,S),e.xr.enabled=T,s.texture.needsPMREMUpdate=!0}}class jg extends kn{constructor(e,t,s,a,l,d,c,f,p,m){e=e!==void 0?e:[],t=t!==void 0?t:eo,super(e,t,s,a,l,d,c,f,p,m),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Hy extends ss{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const s={width:e,height:e,depth:1},a=[s,s,s,s,s,s];t.encoding!==void 0&&(qo("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===rs?ln:ni),this.texture=new jg(a,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:ei}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},a=new ua(5,5,5),l=new os({name:"CubemapFromEquirect",uniforms:io(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:On,blending:wr});l.uniforms.tEquirect.value=t;const d=new Xi(a,l),c=t.minFilter;return t.minFilter===ea&&(t.minFilter=ei),new zy(1,10,this).update(e,d),t.minFilter=c,d.geometry.dispose(),d.material.dispose(),this}clear(e,t,s,a){const l=e.getRenderTarget();for(let d=0;d<6;d++)e.setRenderTarget(this,d),e.clear(t,s,a);e.setRenderTarget(l)}}const hd=new le,Gy=new le,Vy=new ht;class Kr{constructor(e=new le(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,s,a){return this.normal.set(e,t,s),this.constant=a,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,s){const a=hd.subVectors(s,t).cross(Gy.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const s=e.delta(hd),a=this.normal.dot(s);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const l=-(e.start.dot(this.normal)+this.constant)/a;return l<0||l>1?null:t.copy(e.start).addScaledVector(s,l)}intersectsLine(e){const t=this.distanceToPoint(e.start),s=this.distanceToPoint(e.end);return t<0&&s>0||s<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const s=t||Vy.getNormalMatrix(e),a=this.coplanarPoint(hd).applyMatrix4(e),l=this.normal.applyMatrix3(s).normalize();return this.constant=-a.dot(l),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const $r=new zd,Ol=new le;class Hd{constructor(e=new Kr,t=new Kr,s=new Kr,a=new Kr,l=new Kr,d=new Kr){this.planes=[e,t,s,a,l,d]}set(e,t,s,a,l,d){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(s),c[3].copy(a),c[4].copy(l),c[5].copy(d),this}copy(e){const t=this.planes;for(let s=0;s<6;s++)t[s].copy(e.planes[s]);return this}setFromProjectionMatrix(e,t=ji){const s=this.planes,a=e.elements,l=a[0],d=a[1],c=a[2],f=a[3],p=a[4],m=a[5],g=a[6],_=a[7],S=a[8],T=a[9],M=a[10],y=a[11],x=a[12],b=a[13],w=a[14],R=a[15];if(s[0].setComponents(f-l,_-p,y-S,R-x).normalize(),s[1].setComponents(f+l,_+p,y+S,R+x).normalize(),s[2].setComponents(f+d,_+m,y+T,R+b).normalize(),s[3].setComponents(f-d,_-m,y-T,R-b).normalize(),s[4].setComponents(f-c,_-g,y-M,R-w).normalize(),t===ji)s[5].setComponents(f+c,_+g,y+M,R+w).normalize();else if(t===Xl)s[5].setComponents(c,g,M,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),$r.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),$r.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere($r)}intersectsSprite(e){return $r.center.set(0,0,0),$r.radius=.7071067811865476,$r.applyMatrix4(e.matrixWorld),this.intersectsSphere($r)}intersectsSphere(e){const t=this.planes,s=e.center,a=-e.radius;for(let l=0;l<6;l++)if(t[l].distanceToPoint(s)<a)return!1;return!0}intersectsBox(e){const t=this.planes;for(let s=0;s<6;s++){const a=t[s];if(Ol.x=a.normal.x>0?e.max.x:e.min.x,Ol.y=a.normal.y>0?e.max.y:e.min.y,Ol.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(Ol)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let s=0;s<6;s++)if(t[s].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Xg(){let r=null,e=!1,t=null,s=null;function a(l,d){t(l,d),s=r.requestAnimationFrame(a)}return{start:function(){e!==!0&&t!==null&&(s=r.requestAnimationFrame(a),e=!0)},stop:function(){r.cancelAnimationFrame(s),e=!1},setAnimationLoop:function(l){t=l},setContext:function(l){r=l}}}function Wy(r,e){const t=e.isWebGL2,s=new WeakMap;function a(p,m){const g=p.array,_=p.usage,S=g.byteLength,T=r.createBuffer();r.bindBuffer(m,T),r.bufferData(m,g,_),p.onUploadCallback();let M;if(g instanceof Float32Array)M=r.FLOAT;else if(g instanceof Uint16Array)if(p.isFloat16BufferAttribute)if(t)M=r.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else M=r.UNSIGNED_SHORT;else if(g instanceof Int16Array)M=r.SHORT;else if(g instanceof Uint32Array)M=r.UNSIGNED_INT;else if(g instanceof Int32Array)M=r.INT;else if(g instanceof Int8Array)M=r.BYTE;else if(g instanceof Uint8Array)M=r.UNSIGNED_BYTE;else if(g instanceof Uint8ClampedArray)M=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+g);return{buffer:T,type:M,bytesPerElement:g.BYTES_PER_ELEMENT,version:p.version,size:S}}function l(p,m,g){const _=m.array,S=m._updateRange,T=m.updateRanges;if(r.bindBuffer(g,p),S.count===-1&&T.length===0&&r.bufferSubData(g,0,_),T.length!==0){for(let M=0,y=T.length;M<y;M++){const x=T[M];t?r.bufferSubData(g,x.start*_.BYTES_PER_ELEMENT,_,x.start,x.count):r.bufferSubData(g,x.start*_.BYTES_PER_ELEMENT,_.subarray(x.start,x.start+x.count))}m.clearUpdateRanges()}S.count!==-1&&(t?r.bufferSubData(g,S.offset*_.BYTES_PER_ELEMENT,_,S.offset,S.count):r.bufferSubData(g,S.offset*_.BYTES_PER_ELEMENT,_.subarray(S.offset,S.offset+S.count)),S.count=-1),m.onUploadCallback()}function d(p){return p.isInterleavedBufferAttribute&&(p=p.data),s.get(p)}function c(p){p.isInterleavedBufferAttribute&&(p=p.data);const m=s.get(p);m&&(r.deleteBuffer(m.buffer),s.delete(p))}function f(p,m){if(p.isGLBufferAttribute){const _=s.get(p);(!_||_.version<p.version)&&s.set(p,{buffer:p.buffer,type:p.type,bytesPerElement:p.elementSize,version:p.version});return}p.isInterleavedBufferAttribute&&(p=p.data);const g=s.get(p);if(g===void 0)s.set(p,a(p,m));else if(g.version<p.version){if(g.size!==p.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");l(g.buffer,p,m),g.version=p.version}}return{get:d,remove:c,update:f}}class Gd extends Pr{constructor(e=1,t=1,s=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:s,heightSegments:a};const l=e/2,d=t/2,c=Math.floor(s),f=Math.floor(a),p=c+1,m=f+1,g=e/c,_=t/f,S=[],T=[],M=[],y=[];for(let x=0;x<m;x++){const b=x*_-d;for(let w=0;w<p;w++){const R=w*g-l;T.push(R,-b,0),M.push(0,0,1),y.push(w/c),y.push(1-x/f)}}for(let x=0;x<f;x++)for(let b=0;b<c;b++){const w=b+p*x,R=b+p*(x+1),O=b+1+p*(x+1),I=b+1+p*x;S.push(w,R,I),S.push(R,O,I)}this.setIndex(S),this.setAttribute("position",new Ei(T,3)),this.setAttribute("normal",new Ei(M,3)),this.setAttribute("uv",new Ei(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gd(e.width,e.height,e.widthSegments,e.heightSegments)}}var jy=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Xy=`#ifdef USE_ALPHAHASH
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
#endif`,Yy=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,qy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$y=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Ky=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Zy=`#ifdef USE_AOMAP
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
#endif`,Qy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Jy=`#ifdef USE_BATCHING
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
#endif`,eS=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,tS=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,nS=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,iS=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,rS=`#ifdef USE_IRIDESCENCE
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
#endif`,sS=`#ifdef USE_BUMPMAP
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
#endif`,oS=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,aS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,lS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,uS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,cS=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,dS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,fS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,hS=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,pS=`#define PI 3.141592653589793
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
} // validated`,mS=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,gS=`vec3 transformedNormal = objectNormal;
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
#endif`,vS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,_S=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,xS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,yS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,SS="gl_FragColor = linearToOutputTexel( gl_FragColor );",MS=`
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
}`,ES=`#ifdef USE_ENVMAP
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
#endif`,TS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,wS=`#ifdef USE_ENVMAP
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
#endif`,AS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,CS=`#ifdef USE_ENVMAP
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
#endif`,RS=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,bS=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,PS=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,LS=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,DS=`#ifdef USE_GRADIENTMAP
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
}`,IS=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,NS=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,US=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,FS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,OS=`uniform bool receiveShadow;
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
#endif`,kS=`#ifdef USE_ENVMAP
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
#endif`,BS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,zS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,HS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,GS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,VS=`PhysicalMaterial material;
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
#endif`,WS=`struct PhysicalMaterial {
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
}`,jS=`
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
#endif`,XS=`#if defined( RE_IndirectDiffuse )
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
#endif`,YS=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,qS=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,$S=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,KS=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,ZS=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,QS=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,JS=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,eM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,tM=`#if defined( USE_POINTS_UV )
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
#endif`,nM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,iM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,rM=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,sM=`#ifdef USE_MORPHNORMALS
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
#endif`,oM=`#ifdef USE_MORPHTARGETS
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
#endif`,aM=`#ifdef USE_MORPHTARGETS
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
#endif`,lM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,uM=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,cM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,hM=`#ifdef USE_NORMALMAP
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
#endif`,pM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,mM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,gM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,vM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,_M=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,xM=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,yM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,SM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,MM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,EM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,TM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,wM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,AM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,CM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,RM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,bM=`float getShadowMask() {
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
}`,PM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,LM=`#ifdef USE_SKINNING
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
#endif`,DM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,IM=`#ifdef USE_SKINNING
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
#endif`,NM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,UM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,FM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,OM=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,kM=`#ifdef USE_TRANSMISSION
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
#endif`,BM=`#ifdef USE_TRANSMISSION
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
#endif`,zM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,HM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,GM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,VM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const WM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,jM=`uniform sampler2D t2D;
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
}`,XM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,YM=`#ifdef ENVMAP_TYPE_CUBE
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
}`,qM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$M=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,KM=`#include <common>
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
}`,ZM=`#if DEPTH_PACKING == 3200
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
}`,QM=`#define DISTANCE
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
}`,JM=`#define DISTANCE
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
}`,eE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,tE=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nE=`uniform float scale;
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
}`,iE=`uniform vec3 diffuse;
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
}`,rE=`#include <common>
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
}`,sE=`uniform vec3 diffuse;
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
}`,oE=`#define LAMBERT
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
}`,aE=`#define LAMBERT
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
}`,lE=`#define MATCAP
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
}`,uE=`#define MATCAP
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
}`,cE=`#define NORMAL
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
}`,dE=`#define NORMAL
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
}`,fE=`#define PHONG
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
}`,hE=`#define PHONG
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
}`,pE=`#define STANDARD
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
}`,mE=`#define STANDARD
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
}`,gE=`#define TOON
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
}`,vE=`#define TOON
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
}`,_E=`uniform float size;
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
}`,xE=`uniform vec3 diffuse;
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
}`,yE=`#include <common>
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
}`,SE=`uniform vec3 color;
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
}`,ME=`uniform float rotation;
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
}`,EE=`uniform vec3 diffuse;
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
}`,ct={alphahash_fragment:jy,alphahash_pars_fragment:Xy,alphamap_fragment:Yy,alphamap_pars_fragment:qy,alphatest_fragment:$y,alphatest_pars_fragment:Ky,aomap_fragment:Zy,aomap_pars_fragment:Qy,batching_pars_vertex:Jy,batching_vertex:eS,begin_vertex:tS,beginnormal_vertex:nS,bsdfs:iS,iridescence_fragment:rS,bumpmap_pars_fragment:sS,clipping_planes_fragment:oS,clipping_planes_pars_fragment:aS,clipping_planes_pars_vertex:lS,clipping_planes_vertex:uS,color_fragment:cS,color_pars_fragment:dS,color_pars_vertex:fS,color_vertex:hS,common:pS,cube_uv_reflection_fragment:mS,defaultnormal_vertex:gS,displacementmap_pars_vertex:vS,displacementmap_vertex:_S,emissivemap_fragment:xS,emissivemap_pars_fragment:yS,colorspace_fragment:SS,colorspace_pars_fragment:MS,envmap_fragment:ES,envmap_common_pars_fragment:TS,envmap_pars_fragment:wS,envmap_pars_vertex:AS,envmap_physical_pars_fragment:kS,envmap_vertex:CS,fog_vertex:RS,fog_pars_vertex:bS,fog_fragment:PS,fog_pars_fragment:LS,gradientmap_pars_fragment:DS,lightmap_fragment:IS,lightmap_pars_fragment:NS,lights_lambert_fragment:US,lights_lambert_pars_fragment:FS,lights_pars_begin:OS,lights_toon_fragment:BS,lights_toon_pars_fragment:zS,lights_phong_fragment:HS,lights_phong_pars_fragment:GS,lights_physical_fragment:VS,lights_physical_pars_fragment:WS,lights_fragment_begin:jS,lights_fragment_maps:XS,lights_fragment_end:YS,logdepthbuf_fragment:qS,logdepthbuf_pars_fragment:$S,logdepthbuf_pars_vertex:KS,logdepthbuf_vertex:ZS,map_fragment:QS,map_pars_fragment:JS,map_particle_fragment:eM,map_particle_pars_fragment:tM,metalnessmap_fragment:nM,metalnessmap_pars_fragment:iM,morphcolor_vertex:rM,morphnormal_vertex:sM,morphtarget_pars_vertex:oM,morphtarget_vertex:aM,normal_fragment_begin:lM,normal_fragment_maps:uM,normal_pars_fragment:cM,normal_pars_vertex:dM,normal_vertex:fM,normalmap_pars_fragment:hM,clearcoat_normal_fragment_begin:pM,clearcoat_normal_fragment_maps:mM,clearcoat_pars_fragment:gM,iridescence_pars_fragment:vM,opaque_fragment:_M,packing:xM,premultiplied_alpha_fragment:yM,project_vertex:SM,dithering_fragment:MM,dithering_pars_fragment:EM,roughnessmap_fragment:TM,roughnessmap_pars_fragment:wM,shadowmap_pars_fragment:AM,shadowmap_pars_vertex:CM,shadowmap_vertex:RM,shadowmask_pars_fragment:bM,skinbase_vertex:PM,skinning_pars_vertex:LM,skinning_vertex:DM,skinnormal_vertex:IM,specularmap_fragment:NM,specularmap_pars_fragment:UM,tonemapping_fragment:FM,tonemapping_pars_fragment:OM,transmission_fragment:kM,transmission_pars_fragment:BM,uv_pars_fragment:zM,uv_pars_vertex:HM,uv_vertex:GM,worldpos_vertex:VM,background_vert:WM,background_frag:jM,backgroundCube_vert:XM,backgroundCube_frag:YM,cube_vert:qM,cube_frag:$M,depth_vert:KM,depth_frag:ZM,distanceRGBA_vert:QM,distanceRGBA_frag:JM,equirect_vert:eE,equirect_frag:tE,linedashed_vert:nE,linedashed_frag:iE,meshbasic_vert:rE,meshbasic_frag:sE,meshlambert_vert:oE,meshlambert_frag:aE,meshmatcap_vert:lE,meshmatcap_frag:uE,meshnormal_vert:cE,meshnormal_frag:dE,meshphong_vert:fE,meshphong_frag:hE,meshphysical_vert:pE,meshphysical_frag:mE,meshtoon_vert:gE,meshtoon_frag:vE,points_vert:_E,points_frag:xE,shadow_vert:yE,shadow_frag:SE,sprite_vert:ME,sprite_frag:EE},be={common:{diffuse:{value:new yt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ht},alphaMap:{value:null},alphaMapTransform:{value:new ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ht}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ht},normalScale:{value:new St(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new yt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new yt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ht},alphaTest:{value:0},uvTransform:{value:new ht}},sprite:{diffuse:{value:new yt(16777215)},opacity:{value:1},center:{value:new St(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ht},alphaMap:{value:null},alphaMapTransform:{value:new ht},alphaTest:{value:0}}},Si={basic:{uniforms:En([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:ct.meshbasic_vert,fragmentShader:ct.meshbasic_frag},lambert:{uniforms:En([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new yt(0)}}]),vertexShader:ct.meshlambert_vert,fragmentShader:ct.meshlambert_frag},phong:{uniforms:En([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new yt(0)},specular:{value:new yt(1118481)},shininess:{value:30}}]),vertexShader:ct.meshphong_vert,fragmentShader:ct.meshphong_frag},standard:{uniforms:En([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new yt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ct.meshphysical_vert,fragmentShader:ct.meshphysical_frag},toon:{uniforms:En([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new yt(0)}}]),vertexShader:ct.meshtoon_vert,fragmentShader:ct.meshtoon_frag},matcap:{uniforms:En([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:ct.meshmatcap_vert,fragmentShader:ct.meshmatcap_frag},points:{uniforms:En([be.points,be.fog]),vertexShader:ct.points_vert,fragmentShader:ct.points_frag},dashed:{uniforms:En([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ct.linedashed_vert,fragmentShader:ct.linedashed_frag},depth:{uniforms:En([be.common,be.displacementmap]),vertexShader:ct.depth_vert,fragmentShader:ct.depth_frag},normal:{uniforms:En([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:ct.meshnormal_vert,fragmentShader:ct.meshnormal_frag},sprite:{uniforms:En([be.sprite,be.fog]),vertexShader:ct.sprite_vert,fragmentShader:ct.sprite_frag},background:{uniforms:{uvTransform:{value:new ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ct.background_vert,fragmentShader:ct.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:ct.backgroundCube_vert,fragmentShader:ct.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ct.cube_vert,fragmentShader:ct.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ct.equirect_vert,fragmentShader:ct.equirect_frag},distanceRGBA:{uniforms:En([be.common,be.displacementmap,{referencePosition:{value:new le},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ct.distanceRGBA_vert,fragmentShader:ct.distanceRGBA_frag},shadow:{uniforms:En([be.lights,be.fog,{color:{value:new yt(0)},opacity:{value:1}}]),vertexShader:ct.shadow_vert,fragmentShader:ct.shadow_frag}};Si.physical={uniforms:En([Si.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ht},clearcoatNormalScale:{value:new St(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ht},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ht},sheen:{value:0},sheenColor:{value:new yt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ht},transmissionSamplerSize:{value:new St},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ht},attenuationDistance:{value:0},attenuationColor:{value:new yt(0)},specularColor:{value:new yt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ht},anisotropyVector:{value:new St},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ht}}]),vertexShader:ct.meshphysical_vert,fragmentShader:ct.meshphysical_frag};const kl={r:0,b:0,g:0};function TE(r,e,t,s,a,l,d){const c=new yt(0);let f=l===!0?0:1,p,m,g=null,_=0,S=null;function T(y,x){let b=!1,w=x.isScene===!0?x.background:null;w&&w.isTexture&&(w=(x.backgroundBlurriness>0?t:e).get(w)),w===null?M(c,f):w&&w.isColor&&(M(w,1),b=!0);const R=r.xr.getEnvironmentBlendMode();R==="additive"?s.buffers.color.setClear(0,0,0,1,d):R==="alpha-blend"&&s.buffers.color.setClear(0,0,0,0,d),(r.autoClear||b)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),w&&(w.isCubeTexture||w.mapping===Zl)?(m===void 0&&(m=new Xi(new ua(1,1,1),new os({name:"BackgroundCubeMaterial",uniforms:io(Si.backgroundCube.uniforms),vertexShader:Si.backgroundCube.vertexShader,fragmentShader:Si.backgroundCube.fragmentShader,side:On,depthTest:!1,depthWrite:!1,fog:!1})),m.geometry.deleteAttribute("normal"),m.geometry.deleteAttribute("uv"),m.onBeforeRender=function(O,I,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(m.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(m)),m.material.uniforms.envMap.value=w,m.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,m.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,m.material.toneMapped=wt.getTransfer(w.colorSpace)!==Dt,(g!==w||_!==w.version||S!==r.toneMapping)&&(m.material.needsUpdate=!0,g=w,_=w.version,S=r.toneMapping),m.layers.enableAll(),y.unshift(m,m.geometry,m.material,0,0,null)):w&&w.isTexture&&(p===void 0&&(p=new Xi(new Gd(2,2),new os({name:"BackgroundMaterial",uniforms:io(Si.background.uniforms),vertexShader:Si.background.vertexShader,fragmentShader:Si.background.fragmentShader,side:Rr,depthTest:!1,depthWrite:!1,fog:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(p)),p.material.uniforms.t2D.value=w,p.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,p.material.toneMapped=wt.getTransfer(w.colorSpace)!==Dt,w.matrixAutoUpdate===!0&&w.updateMatrix(),p.material.uniforms.uvTransform.value.copy(w.matrix),(g!==w||_!==w.version||S!==r.toneMapping)&&(p.material.needsUpdate=!0,g=w,_=w.version,S=r.toneMapping),p.layers.enableAll(),y.unshift(p,p.geometry,p.material,0,0,null))}function M(y,x){y.getRGB(kl,Vg(r)),s.buffers.color.setClear(kl.r,kl.g,kl.b,x,d)}return{getClearColor:function(){return c},setClearColor:function(y,x=1){c.set(y),f=x,M(c,f)},getClearAlpha:function(){return f},setClearAlpha:function(y){f=y,M(c,f)},render:T}}function wE(r,e,t,s){const a=r.getParameter(r.MAX_VERTEX_ATTRIBS),l=s.isWebGL2?null:e.get("OES_vertex_array_object"),d=s.isWebGL2||l!==null,c={},f=y(null);let p=f,m=!1;function g(k,K,J,Z,V){let Q=!1;if(d){const z=M(Z,J,K);p!==z&&(p=z,S(p.object)),Q=x(k,Z,J,V),Q&&b(k,Z,J,V)}else{const z=K.wireframe===!0;(p.geometry!==Z.id||p.program!==J.id||p.wireframe!==z)&&(p.geometry=Z.id,p.program=J.id,p.wireframe=z,Q=!0)}V!==null&&t.update(V,r.ELEMENT_ARRAY_BUFFER),(Q||m)&&(m=!1,ce(k,K,J,Z),V!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function _(){return s.isWebGL2?r.createVertexArray():l.createVertexArrayOES()}function S(k){return s.isWebGL2?r.bindVertexArray(k):l.bindVertexArrayOES(k)}function T(k){return s.isWebGL2?r.deleteVertexArray(k):l.deleteVertexArrayOES(k)}function M(k,K,J){const Z=J.wireframe===!0;let V=c[k.id];V===void 0&&(V={},c[k.id]=V);let Q=V[K.id];Q===void 0&&(Q={},V[K.id]=Q);let z=Q[Z];return z===void 0&&(z=y(_()),Q[Z]=z),z}function y(k){const K=[],J=[],Z=[];for(let V=0;V<a;V++)K[V]=0,J[V]=0,Z[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:K,enabledAttributes:J,attributeDivisors:Z,object:k,attributes:{},index:null}}function x(k,K,J,Z){const V=p.attributes,Q=K.attributes;let z=0;const L=J.getAttributes();for(const G in L)if(L[G].location>=0){const re=V[G];let fe=Q[G];if(fe===void 0&&(G==="instanceMatrix"&&k.instanceMatrix&&(fe=k.instanceMatrix),G==="instanceColor"&&k.instanceColor&&(fe=k.instanceColor)),re===void 0||re.attribute!==fe||fe&&re.data!==fe.data)return!0;z++}return p.attributesNum!==z||p.index!==Z}function b(k,K,J,Z){const V={},Q=K.attributes;let z=0;const L=J.getAttributes();for(const G in L)if(L[G].location>=0){let re=Q[G];re===void 0&&(G==="instanceMatrix"&&k.instanceMatrix&&(re=k.instanceMatrix),G==="instanceColor"&&k.instanceColor&&(re=k.instanceColor));const fe={};fe.attribute=re,re&&re.data&&(fe.data=re.data),V[G]=fe,z++}p.attributes=V,p.attributesNum=z,p.index=Z}function w(){const k=p.newAttributes;for(let K=0,J=k.length;K<J;K++)k[K]=0}function R(k){O(k,0)}function O(k,K){const J=p.newAttributes,Z=p.enabledAttributes,V=p.attributeDivisors;J[k]=1,Z[k]===0&&(r.enableVertexAttribArray(k),Z[k]=1),V[k]!==K&&((s.isWebGL2?r:e.get("ANGLE_instanced_arrays"))[s.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](k,K),V[k]=K)}function I(){const k=p.newAttributes,K=p.enabledAttributes;for(let J=0,Z=K.length;J<Z;J++)K[J]!==k[J]&&(r.disableVertexAttribArray(J),K[J]=0)}function U(k,K,J,Z,V,Q,z){z===!0?r.vertexAttribIPointer(k,K,J,V,Q):r.vertexAttribPointer(k,K,J,Z,V,Q)}function ce(k,K,J,Z){if(s.isWebGL2===!1&&(k.isInstancedMesh||Z.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;w();const V=Z.attributes,Q=J.getAttributes(),z=K.defaultAttributeValues;for(const L in Q){const G=Q[L];if(G.location>=0){let j=V[L];if(j===void 0&&(L==="instanceMatrix"&&k.instanceMatrix&&(j=k.instanceMatrix),L==="instanceColor"&&k.instanceColor&&(j=k.instanceColor)),j!==void 0){const re=j.normalized,fe=j.itemSize,xe=t.get(j);if(xe===void 0)continue;const ge=xe.buffer,Ee=xe.type,we=xe.bytesPerElement,Ce=s.isWebGL2===!0&&(Ee===r.INT||Ee===r.UNSIGNED_INT||j.gpuType===Tg);if(j.isInterleavedBufferAttribute){const at=j.data,se=at.stride,Vt=j.offset;if(at.isInstancedInterleavedBuffer){for(let je=0;je<G.locationSize;je++)O(G.location+je,at.meshPerAttribute);k.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let je=0;je<G.locationSize;je++)R(G.location+je);r.bindBuffer(r.ARRAY_BUFFER,ge);for(let je=0;je<G.locationSize;je++)U(G.location+je,fe/G.locationSize,Ee,re,se*we,(Vt+fe/G.locationSize*je)*we,Ce)}else{if(j.isInstancedBufferAttribute){for(let at=0;at<G.locationSize;at++)O(G.location+at,j.meshPerAttribute);k.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let at=0;at<G.locationSize;at++)R(G.location+at);r.bindBuffer(r.ARRAY_BUFFER,ge);for(let at=0;at<G.locationSize;at++)U(G.location+at,fe/G.locationSize,Ee,re,fe*we,fe/G.locationSize*at*we,Ce)}}else if(z!==void 0){const re=z[L];if(re!==void 0)switch(re.length){case 2:r.vertexAttrib2fv(G.location,re);break;case 3:r.vertexAttrib3fv(G.location,re);break;case 4:r.vertexAttrib4fv(G.location,re);break;default:r.vertexAttrib1fv(G.location,re)}}}}I()}function C(){te();for(const k in c){const K=c[k];for(const J in K){const Z=K[J];for(const V in Z)T(Z[V].object),delete Z[V];delete K[J]}delete c[k]}}function D(k){if(c[k.id]===void 0)return;const K=c[k.id];for(const J in K){const Z=K[J];for(const V in Z)T(Z[V].object),delete Z[V];delete K[J]}delete c[k.id]}function Y(k){for(const K in c){const J=c[K];if(J[k.id]===void 0)continue;const Z=J[k.id];for(const V in Z)T(Z[V].object),delete Z[V];delete J[k.id]}}function te(){de(),m=!0,p!==f&&(p=f,S(p.object))}function de(){f.geometry=null,f.program=null,f.wireframe=!1}return{setup:g,reset:te,resetDefaultState:de,dispose:C,releaseStatesOfGeometry:D,releaseStatesOfProgram:Y,initAttributes:w,enableAttribute:R,disableUnusedAttributes:I}}function AE(r,e,t,s){const a=s.isWebGL2;let l;function d(m){l=m}function c(m,g){r.drawArrays(l,m,g),t.update(g,l,1)}function f(m,g,_){if(_===0)return;let S,T;if(a)S=r,T="drawArraysInstanced";else if(S=e.get("ANGLE_instanced_arrays"),T="drawArraysInstancedANGLE",S===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}S[T](l,m,g,_),t.update(g,l,_)}function p(m,g,_){if(_===0)return;const S=e.get("WEBGL_multi_draw");if(S===null)for(let T=0;T<_;T++)this.render(m[T],g[T]);else{S.multiDrawArraysWEBGL(l,m,0,g,0,_);let T=0;for(let M=0;M<_;M++)T+=g[M];t.update(T,l,1)}}this.setMode=d,this.render=c,this.renderInstances=f,this.renderMultiDraw=p}function CE(r,e,t){let s;function a(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const U=e.get("EXT_texture_filter_anisotropic");s=r.getParameter(U.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function l(U){if(U==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";U="mediump"}return U==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const d=typeof WebGL2RenderingContext<"u"&&r.constructor.name==="WebGL2RenderingContext";let c=t.precision!==void 0?t.precision:"highp";const f=l(c);f!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);const p=d||e.has("WEBGL_draw_buffers"),m=t.logarithmicDepthBuffer===!0,g=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=r.getParameter(r.MAX_TEXTURE_SIZE),T=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),M=r.getParameter(r.MAX_VERTEX_ATTRIBS),y=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),x=r.getParameter(r.MAX_VARYING_VECTORS),b=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),w=_>0,R=d||e.has("OES_texture_float"),O=w&&R,I=d?r.getParameter(r.MAX_SAMPLES):0;return{isWebGL2:d,drawBuffers:p,getMaxAnisotropy:a,getMaxPrecision:l,precision:c,logarithmicDepthBuffer:m,maxTextures:g,maxVertexTextures:_,maxTextureSize:S,maxCubemapSize:T,maxAttributes:M,maxVertexUniforms:y,maxVaryings:x,maxFragmentUniforms:b,vertexTextures:w,floatFragmentTextures:R,floatVertexTextures:O,maxSamples:I}}function RE(r){const e=this;let t=null,s=0,a=!1,l=!1;const d=new Kr,c=new ht,f={value:null,needsUpdate:!1};this.uniform=f,this.numPlanes=0,this.numIntersection=0,this.init=function(g,_){const S=g.length!==0||_||s!==0||a;return a=_,s=g.length,S},this.beginShadows=function(){l=!0,m(null)},this.endShadows=function(){l=!1},this.setGlobalState=function(g,_){t=m(g,_,0)},this.setState=function(g,_,S){const T=g.clippingPlanes,M=g.clipIntersection,y=g.clipShadows,x=r.get(g);if(!a||T===null||T.length===0||l&&!y)l?m(null):p();else{const b=l?0:s,w=b*4;let R=x.clippingState||null;f.value=R,R=m(T,_,w,S);for(let O=0;O!==w;++O)R[O]=t[O];x.clippingState=R,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=b}};function p(){f.value!==t&&(f.value=t,f.needsUpdate=s>0),e.numPlanes=s,e.numIntersection=0}function m(g,_,S,T){const M=g!==null?g.length:0;let y=null;if(M!==0){if(y=f.value,T!==!0||y===null){const x=S+M*4,b=_.matrixWorldInverse;c.getNormalMatrix(b),(y===null||y.length<x)&&(y=new Float32Array(x));for(let w=0,R=S;w!==M;++w,R+=4)d.copy(g[w]).applyMatrix4(b,c),d.normal.toArray(y,R),y[R+3]=d.constant}f.value=y,f.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,y}}function bE(r){let e=new WeakMap;function t(d,c){return c===wd?d.mapping=eo:c===Ad&&(d.mapping=to),d}function s(d){if(d&&d.isTexture){const c=d.mapping;if(c===wd||c===Ad)if(e.has(d)){const f=e.get(d).texture;return t(f,d.mapping)}else{const f=d.image;if(f&&f.height>0){const p=new Hy(f.height/2);return p.fromEquirectangularTexture(r,d),e.set(d,p),d.addEventListener("dispose",a),t(p.texture,d.mapping)}else return null}}return d}function a(d){const c=d.target;c.removeEventListener("dispose",a);const f=e.get(c);f!==void 0&&(e.delete(c),f.dispose())}function l(){e=new WeakMap}return{get:s,dispose:l}}class Yg extends Wg{constructor(e=-1,t=1,s=1,a=-1,l=.1,d=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=s,this.bottom=a,this.near=l,this.far=d,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,s,a,l,d){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=s,this.view.offsetY=a,this.view.width=l,this.view.height=d,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let l=s-e,d=s+e,c=a+t,f=a-t;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,m=(this.top-this.bottom)/this.view.fullHeight/this.zoom;l+=p*this.view.offsetX,d=l+p*this.view.width,c-=m*this.view.offsetY,f=c-m*this.view.height}this.projectionMatrix.makeOrthographic(l,d,c,f,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const $s=4,Nm=[.125,.215,.35,.446,.526,.582],Jr=20,pd=new Yg,Um=new yt;let md=null,gd=0,vd=0;const Zr=(1+Math.sqrt(5))/2,Ys=1/Zr,Fm=[new le(1,1,1),new le(-1,1,1),new le(1,1,-1),new le(-1,1,-1),new le(0,Zr,Ys),new le(0,Zr,-Ys),new le(Ys,0,Zr),new le(-Ys,0,Zr),new le(Zr,Ys,0),new le(-Zr,Ys,0)];class Om{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,s=.1,a=100){md=this._renderer.getRenderTarget(),gd=this._renderer.getActiveCubeFace(),vd=this._renderer.getActiveMipmapLevel(),this._setSize(256);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,s,a,l),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=zm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Bm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(md,gd,vd),e.scissorTest=!1,Bl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===eo||e.mapping===to?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),md=this._renderer.getRenderTarget(),gd=this._renderer.getActiveCubeFace(),vd=this._renderer.getActiveMipmapLevel();const s=t||this._allocateTargets();return this._textureToCubeUV(e,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,s={magFilter:ei,minFilter:ei,generateMipmaps:!1,type:ta,format:mi,colorSpace:Yi,depthBuffer:!1},a=km(e,t,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=km(e,t,s);const{_lodMax:l}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=PE(l)),this._blurMaterial=LE(l,e,t)}return a}_compileMaterial(e){const t=new Xi(this._lodPlanes[0],e);this._renderer.compile(t,pd)}_sceneToCubeUV(e,t,s,a){const c=new ti(90,1,t,s),f=[1,-1,1,1,1,1],p=[1,1,1,-1,-1,-1],m=this._renderer,g=m.autoClear,_=m.toneMapping;m.getClearColor(Um),m.toneMapping=Ar,m.autoClear=!1;const S=new zg({name:"PMREM.Background",side:On,depthWrite:!1,depthTest:!1}),T=new Xi(new ua,S);let M=!1;const y=e.background;y?y.isColor&&(S.color.copy(y),e.background=null,M=!0):(S.color.copy(Um),M=!0);for(let x=0;x<6;x++){const b=x%3;b===0?(c.up.set(0,f[x],0),c.lookAt(p[x],0,0)):b===1?(c.up.set(0,0,f[x]),c.lookAt(0,p[x],0)):(c.up.set(0,f[x],0),c.lookAt(0,0,p[x]));const w=this._cubeSize;Bl(a,b*w,x>2?w:0,w,w),m.setRenderTarget(a),M&&m.render(T,c),m.render(e,c)}T.geometry.dispose(),T.material.dispose(),m.toneMapping=_,m.autoClear=g,e.background=y}_textureToCubeUV(e,t){const s=this._renderer,a=e.mapping===eo||e.mapping===to;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=zm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Bm());const l=a?this._cubemapMaterial:this._equirectMaterial,d=new Xi(this._lodPlanes[0],l),c=l.uniforms;c.envMap.value=e;const f=this._cubeSize;Bl(t,0,0,3*f,2*f),s.setRenderTarget(t),s.render(d,pd)}_applyPMREM(e){const t=this._renderer,s=t.autoClear;t.autoClear=!1;for(let a=1;a<this._lodPlanes.length;a++){const l=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),d=Fm[(a-1)%Fm.length];this._blur(e,a-1,a,l,d)}t.autoClear=s}_blur(e,t,s,a,l){const d=this._pingPongRenderTarget;this._halfBlur(e,d,t,s,a,"latitudinal",l),this._halfBlur(d,e,s,s,a,"longitudinal",l)}_halfBlur(e,t,s,a,l,d,c){const f=this._renderer,p=this._blurMaterial;d!=="latitudinal"&&d!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const m=3,g=new Xi(this._lodPlanes[a],p),_=p.uniforms,S=this._sizeLods[s]-1,T=isFinite(l)?Math.PI/(2*S):2*Math.PI/(2*Jr-1),M=l/T,y=isFinite(l)?1+Math.floor(m*M):Jr;y>Jr&&console.warn(`sigmaRadians, ${l}, is too large and will clip, as it requested ${y} samples when the maximum is set to ${Jr}`);const x=[];let b=0;for(let U=0;U<Jr;++U){const ce=U/M,C=Math.exp(-ce*ce/2);x.push(C),U===0?b+=C:U<y&&(b+=2*C)}for(let U=0;U<x.length;U++)x[U]=x[U]/b;_.envMap.value=e.texture,_.samples.value=y,_.weights.value=x,_.latitudinal.value=d==="latitudinal",c&&(_.poleAxis.value=c);const{_lodMax:w}=this;_.dTheta.value=T,_.mipInt.value=w-s;const R=this._sizeLods[a],O=3*R*(a>w-$s?a-w+$s:0),I=4*(this._cubeSize-R);Bl(t,O,I,3*R,2*R),f.setRenderTarget(t),f.render(g,pd)}}function PE(r){const e=[],t=[],s=[];let a=r;const l=r-$s+1+Nm.length;for(let d=0;d<l;d++){const c=Math.pow(2,a);t.push(c);let f=1/c;d>r-$s?f=Nm[d-r+$s-1]:d===0&&(f=0),s.push(f);const p=1/(c-2),m=-p,g=1+p,_=[m,m,g,m,g,g,m,m,g,g,m,g],S=6,T=6,M=3,y=2,x=1,b=new Float32Array(M*T*S),w=new Float32Array(y*T*S),R=new Float32Array(x*T*S);for(let I=0;I<S;I++){const U=I%3*2/3-1,ce=I>2?0:-1,C=[U,ce,0,U+2/3,ce,0,U+2/3,ce+1,0,U,ce,0,U+2/3,ce+1,0,U,ce+1,0];b.set(C,M*T*I),w.set(_,y*T*I);const D=[I,I,I,I,I,I];R.set(D,x*T*I)}const O=new Pr;O.setAttribute("position",new Mi(b,M)),O.setAttribute("uv",new Mi(w,y)),O.setAttribute("faceIndex",new Mi(R,x)),e.push(O),a>$s&&a--}return{lodPlanes:e,sizeLods:t,sigmas:s}}function km(r,e,t){const s=new ss(r,e,t);return s.texture.mapping=Zl,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function Bl(r,e,t,s,a){r.viewport.set(e,t,s,a),r.scissor.set(e,t,s,a)}function LE(r,e,t){const s=new Float32Array(Jr),a=new le(0,1,0);return new os({name:"SphericalGaussianBlur",defines:{n:Jr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:Vd(),fragmentShader:`

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
		`,blending:wr,depthTest:!1,depthWrite:!1})}function Bm(){return new os({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Vd(),fragmentShader:`

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
		`,blending:wr,depthTest:!1,depthWrite:!1})}function zm(){return new os({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Vd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wr,depthTest:!1,depthWrite:!1})}function Vd(){return`

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
	`}function DE(r){let e=new WeakMap,t=null;function s(c){if(c&&c.isTexture){const f=c.mapping,p=f===wd||f===Ad,m=f===eo||f===to;if(p||m)if(c.isRenderTargetTexture&&c.needsPMREMUpdate===!0){c.needsPMREMUpdate=!1;let g=e.get(c);return t===null&&(t=new Om(r)),g=p?t.fromEquirectangular(c,g):t.fromCubemap(c,g),e.set(c,g),g.texture}else{if(e.has(c))return e.get(c).texture;{const g=c.image;if(p&&g&&g.height>0||m&&g&&a(g)){t===null&&(t=new Om(r));const _=p?t.fromEquirectangular(c):t.fromCubemap(c);return e.set(c,_),c.addEventListener("dispose",l),_.texture}else return null}}}return c}function a(c){let f=0;const p=6;for(let m=0;m<p;m++)c[m]!==void 0&&f++;return f===p}function l(c){const f=c.target;f.removeEventListener("dispose",l);const p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function d(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:s,dispose:d}}function IE(r){const e={};function t(s){if(e[s]!==void 0)return e[s];let a;switch(s){case"WEBGL_depth_texture":a=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=r.getExtension(s)}return e[s]=a,a}return{has:function(s){return t(s)!==null},init:function(s){s.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(s){const a=t(s);return a===null&&console.warn("THREE.WebGLRenderer: "+s+" extension not supported."),a}}}function NE(r,e,t,s){const a={},l=new WeakMap;function d(g){const _=g.target;_.index!==null&&e.remove(_.index);for(const T in _.attributes)e.remove(_.attributes[T]);for(const T in _.morphAttributes){const M=_.morphAttributes[T];for(let y=0,x=M.length;y<x;y++)e.remove(M[y])}_.removeEventListener("dispose",d),delete a[_.id];const S=l.get(_);S&&(e.remove(S),l.delete(_)),s.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,t.memory.geometries--}function c(g,_){return a[_.id]===!0||(_.addEventListener("dispose",d),a[_.id]=!0,t.memory.geometries++),_}function f(g){const _=g.attributes;for(const T in _)e.update(_[T],r.ARRAY_BUFFER);const S=g.morphAttributes;for(const T in S){const M=S[T];for(let y=0,x=M.length;y<x;y++)e.update(M[y],r.ARRAY_BUFFER)}}function p(g){const _=[],S=g.index,T=g.attributes.position;let M=0;if(S!==null){const b=S.array;M=S.version;for(let w=0,R=b.length;w<R;w+=3){const O=b[w+0],I=b[w+1],U=b[w+2];_.push(O,I,I,U,U,O)}}else if(T!==void 0){const b=T.array;M=T.version;for(let w=0,R=b.length/3-1;w<R;w+=3){const O=w+0,I=w+1,U=w+2;_.push(O,I,I,U,U,O)}}else return;const y=new(Ng(_)?Gg:Hg)(_,1);y.version=M;const x=l.get(g);x&&e.remove(x),l.set(g,y)}function m(g){const _=l.get(g);if(_){const S=g.index;S!==null&&_.version<S.version&&p(g)}else p(g);return l.get(g)}return{get:c,update:f,getWireframeAttribute:m}}function UE(r,e,t,s){const a=s.isWebGL2;let l;function d(S){l=S}let c,f;function p(S){c=S.type,f=S.bytesPerElement}function m(S,T){r.drawElements(l,T,c,S*f),t.update(T,l,1)}function g(S,T,M){if(M===0)return;let y,x;if(a)y=r,x="drawElementsInstanced";else if(y=e.get("ANGLE_instanced_arrays"),x="drawElementsInstancedANGLE",y===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}y[x](l,T,c,S*f,M),t.update(T,l,M)}function _(S,T,M){if(M===0)return;const y=e.get("WEBGL_multi_draw");if(y===null)for(let x=0;x<M;x++)this.render(S[x]/f,T[x]);else{y.multiDrawElementsWEBGL(l,T,0,c,S,0,M);let x=0;for(let b=0;b<M;b++)x+=T[b];t.update(x,l,1)}}this.setMode=d,this.setIndex=p,this.render=m,this.renderInstances=g,this.renderMultiDraw=_}function FE(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function s(l,d,c){switch(t.calls++,d){case r.TRIANGLES:t.triangles+=c*(l/3);break;case r.LINES:t.lines+=c*(l/2);break;case r.LINE_STRIP:t.lines+=c*(l-1);break;case r.LINE_LOOP:t.lines+=c*l;break;case r.POINTS:t.points+=c*l;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",d);break}}function a(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:a,update:s}}function OE(r,e){return r[0]-e[0]}function kE(r,e){return Math.abs(e[1])-Math.abs(r[1])}function BE(r,e,t){const s={},a=new Float32Array(8),l=new WeakMap,d=new sn,c=[];for(let p=0;p<8;p++)c[p]=[p,0];function f(p,m,g){const _=p.morphTargetInfluences;if(e.isWebGL2===!0){const T=m.morphAttributes.position||m.morphAttributes.normal||m.morphAttributes.color,M=T!==void 0?T.length:0;let y=l.get(m);if(y===void 0||y.count!==M){let K=function(){de.dispose(),l.delete(m),m.removeEventListener("dispose",K)};var S=K;y!==void 0&&y.texture.dispose();const w=m.morphAttributes.position!==void 0,R=m.morphAttributes.normal!==void 0,O=m.morphAttributes.color!==void 0,I=m.morphAttributes.position||[],U=m.morphAttributes.normal||[],ce=m.morphAttributes.color||[];let C=0;w===!0&&(C=1),R===!0&&(C=2),O===!0&&(C=3);let D=m.attributes.position.count*C,Y=1;D>e.maxTextureSize&&(Y=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);const te=new Float32Array(D*Y*4*M),de=new Og(te,D,Y,M);de.type=Tr,de.needsUpdate=!0;const k=C*4;for(let J=0;J<M;J++){const Z=I[J],V=U[J],Q=ce[J],z=D*Y*4*J;for(let L=0;L<Z.count;L++){const G=L*k;w===!0&&(d.fromBufferAttribute(Z,L),te[z+G+0]=d.x,te[z+G+1]=d.y,te[z+G+2]=d.z,te[z+G+3]=0),R===!0&&(d.fromBufferAttribute(V,L),te[z+G+4]=d.x,te[z+G+5]=d.y,te[z+G+6]=d.z,te[z+G+7]=0),O===!0&&(d.fromBufferAttribute(Q,L),te[z+G+8]=d.x,te[z+G+9]=d.y,te[z+G+10]=d.z,te[z+G+11]=Q.itemSize===4?d.w:1)}}y={count:M,texture:de,size:new St(D,Y)},l.set(m,y),m.addEventListener("dispose",K)}let x=0;for(let w=0;w<_.length;w++)x+=_[w];const b=m.morphTargetsRelative?1:1-x;g.getUniforms().setValue(r,"morphTargetBaseInfluence",b),g.getUniforms().setValue(r,"morphTargetInfluences",_),g.getUniforms().setValue(r,"morphTargetsTexture",y.texture,t),g.getUniforms().setValue(r,"morphTargetsTextureSize",y.size)}else{const T=_===void 0?0:_.length;let M=s[m.id];if(M===void 0||M.length!==T){M=[];for(let R=0;R<T;R++)M[R]=[R,0];s[m.id]=M}for(let R=0;R<T;R++){const O=M[R];O[0]=R,O[1]=_[R]}M.sort(kE);for(let R=0;R<8;R++)R<T&&M[R][1]?(c[R][0]=M[R][0],c[R][1]=M[R][1]):(c[R][0]=Number.MAX_SAFE_INTEGER,c[R][1]=0);c.sort(OE);const y=m.morphAttributes.position,x=m.morphAttributes.normal;let b=0;for(let R=0;R<8;R++){const O=c[R],I=O[0],U=O[1];I!==Number.MAX_SAFE_INTEGER&&U?(y&&m.getAttribute("morphTarget"+R)!==y[I]&&m.setAttribute("morphTarget"+R,y[I]),x&&m.getAttribute("morphNormal"+R)!==x[I]&&m.setAttribute("morphNormal"+R,x[I]),a[R]=U,b+=U):(y&&m.hasAttribute("morphTarget"+R)===!0&&m.deleteAttribute("morphTarget"+R),x&&m.hasAttribute("morphNormal"+R)===!0&&m.deleteAttribute("morphNormal"+R),a[R]=0)}const w=m.morphTargetsRelative?1:1-b;g.getUniforms().setValue(r,"morphTargetBaseInfluence",w),g.getUniforms().setValue(r,"morphTargetInfluences",a)}}return{update:f}}function zE(r,e,t,s){let a=new WeakMap;function l(f){const p=s.render.frame,m=f.geometry,g=e.get(f,m);if(a.get(g)!==p&&(e.update(g),a.set(g,p)),f.isInstancedMesh&&(f.hasEventListener("dispose",c)===!1&&f.addEventListener("dispose",c),a.get(f)!==p&&(t.update(f.instanceMatrix,r.ARRAY_BUFFER),f.instanceColor!==null&&t.update(f.instanceColor,r.ARRAY_BUFFER),a.set(f,p))),f.isSkinnedMesh){const _=f.skeleton;a.get(_)!==p&&(_.update(),a.set(_,p))}return g}function d(){a=new WeakMap}function c(f){const p=f.target;p.removeEventListener("dispose",c),t.remove(p.instanceMatrix),p.instanceColor!==null&&t.remove(p.instanceColor)}return{update:l,dispose:d}}class qg extends kn{constructor(e,t,s,a,l,d,c,f,p,m){if(m=m!==void 0?m:is,m!==is&&m!==no)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");s===void 0&&m===is&&(s=Er),s===void 0&&m===no&&(s=ns),super(null,a,l,d,c,f,m,s,p),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=c!==void 0?c:Tn,this.minFilter=f!==void 0?f:Tn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const $g=new kn,Kg=new qg(1,1);Kg.compareFunction=Ig;const Zg=new Og,Qg=new Ey,Jg=new jg,Hm=[],Gm=[],Vm=new Float32Array(16),Wm=new Float32Array(9),jm=new Float32Array(4);function oo(r,e,t){const s=r[0];if(s<=0||s>0)return r;const a=e*t;let l=Hm[a];if(l===void 0&&(l=new Float32Array(a),Hm[a]=l),e!==0){s.toArray(l,0);for(let d=1,c=0;d!==e;++d)c+=t,r[d].toArray(l,c)}return l}function Zt(r,e){if(r.length!==e.length)return!1;for(let t=0,s=r.length;t<s;t++)if(r[t]!==e[t])return!1;return!0}function Qt(r,e){for(let t=0,s=e.length;t<s;t++)r[t]=e[t]}function eu(r,e){let t=Gm[e];t===void 0&&(t=new Int32Array(e),Gm[e]=t);for(let s=0;s!==e;++s)t[s]=r.allocateTextureUnit();return t}function HE(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function GE(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Zt(t,e))return;r.uniform2fv(this.addr,e),Qt(t,e)}}function VE(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Zt(t,e))return;r.uniform3fv(this.addr,e),Qt(t,e)}}function WE(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Zt(t,e))return;r.uniform4fv(this.addr,e),Qt(t,e)}}function jE(r,e){const t=this.cache,s=e.elements;if(s===void 0){if(Zt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Qt(t,e)}else{if(Zt(t,s))return;jm.set(s),r.uniformMatrix2fv(this.addr,!1,jm),Qt(t,s)}}function XE(r,e){const t=this.cache,s=e.elements;if(s===void 0){if(Zt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Qt(t,e)}else{if(Zt(t,s))return;Wm.set(s),r.uniformMatrix3fv(this.addr,!1,Wm),Qt(t,s)}}function YE(r,e){const t=this.cache,s=e.elements;if(s===void 0){if(Zt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Qt(t,e)}else{if(Zt(t,s))return;Vm.set(s),r.uniformMatrix4fv(this.addr,!1,Vm),Qt(t,s)}}function qE(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function $E(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Zt(t,e))return;r.uniform2iv(this.addr,e),Qt(t,e)}}function KE(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Zt(t,e))return;r.uniform3iv(this.addr,e),Qt(t,e)}}function ZE(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Zt(t,e))return;r.uniform4iv(this.addr,e),Qt(t,e)}}function QE(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function JE(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Zt(t,e))return;r.uniform2uiv(this.addr,e),Qt(t,e)}}function e1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Zt(t,e))return;r.uniform3uiv(this.addr,e),Qt(t,e)}}function t1(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Zt(t,e))return;r.uniform4uiv(this.addr,e),Qt(t,e)}}function n1(r,e,t){const s=this.cache,a=t.allocateTextureUnit();s[0]!==a&&(r.uniform1i(this.addr,a),s[0]=a);const l=this.type===r.SAMPLER_2D_SHADOW?Kg:$g;t.setTexture2D(e||l,a)}function i1(r,e,t){const s=this.cache,a=t.allocateTextureUnit();s[0]!==a&&(r.uniform1i(this.addr,a),s[0]=a),t.setTexture3D(e||Qg,a)}function r1(r,e,t){const s=this.cache,a=t.allocateTextureUnit();s[0]!==a&&(r.uniform1i(this.addr,a),s[0]=a),t.setTextureCube(e||Jg,a)}function s1(r,e,t){const s=this.cache,a=t.allocateTextureUnit();s[0]!==a&&(r.uniform1i(this.addr,a),s[0]=a),t.setTexture2DArray(e||Zg,a)}function o1(r){switch(r){case 5126:return HE;case 35664:return GE;case 35665:return VE;case 35666:return WE;case 35674:return jE;case 35675:return XE;case 35676:return YE;case 5124:case 35670:return qE;case 35667:case 35671:return $E;case 35668:case 35672:return KE;case 35669:case 35673:return ZE;case 5125:return QE;case 36294:return JE;case 36295:return e1;case 36296:return t1;case 35678:case 36198:case 36298:case 36306:case 35682:return n1;case 35679:case 36299:case 36307:return i1;case 35680:case 36300:case 36308:case 36293:return r1;case 36289:case 36303:case 36311:case 36292:return s1}}function a1(r,e){r.uniform1fv(this.addr,e)}function l1(r,e){const t=oo(e,this.size,2);r.uniform2fv(this.addr,t)}function u1(r,e){const t=oo(e,this.size,3);r.uniform3fv(this.addr,t)}function c1(r,e){const t=oo(e,this.size,4);r.uniform4fv(this.addr,t)}function d1(r,e){const t=oo(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function f1(r,e){const t=oo(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function h1(r,e){const t=oo(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function p1(r,e){r.uniform1iv(this.addr,e)}function m1(r,e){r.uniform2iv(this.addr,e)}function g1(r,e){r.uniform3iv(this.addr,e)}function v1(r,e){r.uniform4iv(this.addr,e)}function _1(r,e){r.uniform1uiv(this.addr,e)}function x1(r,e){r.uniform2uiv(this.addr,e)}function y1(r,e){r.uniform3uiv(this.addr,e)}function S1(r,e){r.uniform4uiv(this.addr,e)}function M1(r,e,t){const s=this.cache,a=e.length,l=eu(t,a);Zt(s,l)||(r.uniform1iv(this.addr,l),Qt(s,l));for(let d=0;d!==a;++d)t.setTexture2D(e[d]||$g,l[d])}function E1(r,e,t){const s=this.cache,a=e.length,l=eu(t,a);Zt(s,l)||(r.uniform1iv(this.addr,l),Qt(s,l));for(let d=0;d!==a;++d)t.setTexture3D(e[d]||Qg,l[d])}function T1(r,e,t){const s=this.cache,a=e.length,l=eu(t,a);Zt(s,l)||(r.uniform1iv(this.addr,l),Qt(s,l));for(let d=0;d!==a;++d)t.setTextureCube(e[d]||Jg,l[d])}function w1(r,e,t){const s=this.cache,a=e.length,l=eu(t,a);Zt(s,l)||(r.uniform1iv(this.addr,l),Qt(s,l));for(let d=0;d!==a;++d)t.setTexture2DArray(e[d]||Zg,l[d])}function A1(r){switch(r){case 5126:return a1;case 35664:return l1;case 35665:return u1;case 35666:return c1;case 35674:return d1;case 35675:return f1;case 35676:return h1;case 5124:case 35670:return p1;case 35667:case 35671:return m1;case 35668:case 35672:return g1;case 35669:case 35673:return v1;case 5125:return _1;case 36294:return x1;case 36295:return y1;case 36296:return S1;case 35678:case 36198:case 36298:case 36306:case 35682:return M1;case 35679:case 36299:case 36307:return E1;case 35680:case 36300:case 36308:case 36293:return T1;case 36289:case 36303:case 36311:case 36292:return w1}}class C1{constructor(e,t,s){this.id=e,this.addr=s,this.cache=[],this.type=t.type,this.setValue=o1(t.type)}}class R1{constructor(e,t,s){this.id=e,this.addr=s,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=A1(t.type)}}class b1{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,s){const a=this.seq;for(let l=0,d=a.length;l!==d;++l){const c=a[l];c.setValue(e,t[c.id],s)}}}const _d=/(\w+)(\])?(\[|\.)?/g;function Xm(r,e){r.seq.push(e),r.map[e.id]=e}function P1(r,e,t){const s=r.name,a=s.length;for(_d.lastIndex=0;;){const l=_d.exec(s),d=_d.lastIndex;let c=l[1];const f=l[2]==="]",p=l[3];if(f&&(c=c|0),p===void 0||p==="["&&d+2===a){Xm(t,p===void 0?new C1(c,r,e):new R1(c,r,e));break}else{let g=t.map[c];g===void 0&&(g=new b1(c),Xm(t,g)),t=g}}}class Hl{constructor(e,t){this.seq=[],this.map={};const s=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<s;++a){const l=e.getActiveUniform(t,a),d=e.getUniformLocation(t,l.name);P1(l,d,this)}}setValue(e,t,s,a){const l=this.map[t];l!==void 0&&l.setValue(e,s,a)}setOptional(e,t,s){const a=t[s];a!==void 0&&this.setValue(e,s,a)}static upload(e,t,s,a){for(let l=0,d=t.length;l!==d;++l){const c=t[l],f=s[c.id];f.needsUpdate!==!1&&c.setValue(e,f.value,a)}}static seqWithValue(e,t){const s=[];for(let a=0,l=e.length;a!==l;++a){const d=e[a];d.id in t&&s.push(d)}return s}}function Ym(r,e,t){const s=r.createShader(e);return r.shaderSource(s,t),r.compileShader(s),s}const L1=37297;let D1=0;function I1(r,e){const t=r.split(`
`),s=[],a=Math.max(e-6,0),l=Math.min(e+6,t.length);for(let d=a;d<l;d++){const c=d+1;s.push(`${c===e?">":" "} ${c}: ${t[d]}`)}return s.join(`
`)}function N1(r){const e=wt.getPrimaries(wt.workingColorSpace),t=wt.getPrimaries(r);let s;switch(e===t?s="":e===jl&&t===Wl?s="LinearDisplayP3ToLinearSRGB":e===Wl&&t===jl&&(s="LinearSRGBToLinearDisplayP3"),r){case Yi:case Ql:return[s,"LinearTransferOETF"];case ln:case Bd:return[s,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[s,"LinearTransferOETF"]}}function qm(r,e,t){const s=r.getShaderParameter(e,r.COMPILE_STATUS),a=r.getShaderInfoLog(e).trim();if(s&&a==="")return"";const l=/ERROR: 0:(\d+)/.exec(a);if(l){const d=parseInt(l[1]);return t.toUpperCase()+`

`+a+`

`+I1(r.getShaderSource(e),d)}else return a}function U1(r,e){const t=N1(e);return`vec4 ${r}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function F1(r,e){let t;switch(e){case Xx:t="Linear";break;case Yx:t="Reinhard";break;case qx:t="OptimizedCineon";break;case $x:t="ACESFilmic";break;case Zx:t="AgX";break;case Kx:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function O1(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.normalMapTangentSpace||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ks).join(`
`)}function k1(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ks).join(`
`)}function B1(r){const e=[];for(const t in r){const s=r[t];s!==!1&&e.push("#define "+t+" "+s)}return e.join(`
`)}function z1(r,e){const t={},s=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let a=0;a<s;a++){const l=r.getActiveAttrib(e,a),d=l.name;let c=1;l.type===r.FLOAT_MAT2&&(c=2),l.type===r.FLOAT_MAT3&&(c=3),l.type===r.FLOAT_MAT4&&(c=4),t[d]={type:l.type,location:r.getAttribLocation(e,d),locationSize:c}}return t}function Ks(r){return r!==""}function $m(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Km(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const H1=/^[ \t]*#include +<([\w\d./]+)>/gm;function Dd(r){return r.replace(H1,V1)}const G1=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function V1(r,e){let t=ct[e];if(t===void 0){const s=G1.get(e);if(s!==void 0)t=ct[s],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,s);else throw new Error("Can not resolve #include <"+e+">")}return Dd(t)}const W1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Zm(r){return r.replace(W1,j1)}function j1(r,e,t,s){let a="";for(let l=parseInt(e);l<parseInt(t);l++)a+=s.replace(/\[\s*i\s*\]/g,"[ "+l+" ]").replace(/UNROLLED_LOOP_INDEX/g,l);return a}function Qm(r){let e="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function X1(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Sg?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===yx?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Hi&&(e="SHADOWMAP_TYPE_VSM"),e}function Y1(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case eo:case to:e="ENVMAP_TYPE_CUBE";break;case Zl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function q1(r){let e="ENVMAP_MODE_REFLECTION";return r.envMap&&r.envMapMode===to&&(e="ENVMAP_MODE_REFRACTION"),e}function $1(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Mg:e="ENVMAP_BLENDING_MULTIPLY";break;case Wx:e="ENVMAP_BLENDING_MIX";break;case jx:e="ENVMAP_BLENDING_ADD";break}return e}function K1(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,s=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:s,maxMip:t}}function Z1(r,e,t,s){const a=r.getContext(),l=t.defines;let d=t.vertexShader,c=t.fragmentShader;const f=X1(t),p=Y1(t),m=q1(t),g=$1(t),_=K1(t),S=t.isWebGL2?"":O1(t),T=k1(t),M=B1(l),y=a.createProgram();let x,b,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(Ks).join(`
`),x.length>0&&(x+=`
`),b=[S,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(Ks).join(`
`),b.length>0&&(b+=`
`)):(x=[Qm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+m:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+f:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ks).join(`
`),b=[S,Qm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+p:"",t.envMap?"#define "+m:"",t.envMap?"#define "+g:"",_?"#define CUBEUV_TEXEL_WIDTH "+_.texelWidth:"",_?"#define CUBEUV_TEXEL_HEIGHT "+_.texelHeight:"",_?"#define CUBEUV_MAX_MIP "+_.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+f:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ar?"#define TONE_MAPPING":"",t.toneMapping!==Ar?ct.tonemapping_pars_fragment:"",t.toneMapping!==Ar?F1("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ct.colorspace_pars_fragment,U1("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ks).join(`
`)),d=Dd(d),d=$m(d,t),d=Km(d,t),c=Dd(c),c=$m(c,t),c=Km(c,t),d=Zm(d),c=Zm(c),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,x=[T,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,b=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===gm?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===gm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+b);const R=w+x+d,O=w+b+c,I=Ym(a,a.VERTEX_SHADER,R),U=Ym(a,a.FRAGMENT_SHADER,O);a.attachShader(y,I),a.attachShader(y,U),t.index0AttributeName!==void 0?a.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&a.bindAttribLocation(y,0,"position"),a.linkProgram(y);function ce(te){if(r.debug.checkShaderErrors){const de=a.getProgramInfoLog(y).trim(),k=a.getShaderInfoLog(I).trim(),K=a.getShaderInfoLog(U).trim();let J=!0,Z=!0;if(a.getProgramParameter(y,a.LINK_STATUS)===!1)if(J=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(a,y,I,U);else{const V=qm(a,I,"vertex"),Q=qm(a,U,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(y,a.VALIDATE_STATUS)+`

Program Info Log: `+de+`
`+V+`
`+Q)}else de!==""?console.warn("THREE.WebGLProgram: Program Info Log:",de):(k===""||K==="")&&(Z=!1);Z&&(te.diagnostics={runnable:J,programLog:de,vertexShader:{log:k,prefix:x},fragmentShader:{log:K,prefix:b}})}a.deleteShader(I),a.deleteShader(U),C=new Hl(a,y),D=z1(a,y)}let C;this.getUniforms=function(){return C===void 0&&ce(this),C};let D;this.getAttributes=function(){return D===void 0&&ce(this),D};let Y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return Y===!1&&(Y=a.getProgramParameter(y,L1)),Y},this.destroy=function(){s.releaseStatesOfProgram(this),a.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=D1++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=I,this.fragmentShader=U,this}let Q1=0;class J1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,s=e.fragmentShader,a=this._getShaderStage(t),l=this._getShaderStage(s),d=this._getShaderCacheForMaterial(e);return d.has(a)===!1&&(d.add(a),a.usedTimes++),d.has(l)===!1&&(d.add(l),l.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const s of t)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let s=t.get(e);return s===void 0&&(s=new Set,t.set(e,s)),s}_getShaderStage(e){const t=this.shaderCache;let s=t.get(e);return s===void 0&&(s=new eT(e),t.set(e,s)),s}}class eT{constructor(e){this.id=Q1++,this.code=e,this.usedTimes=0}}function tT(r,e,t,s,a,l,d){const c=new kg,f=new J1,p=[],m=a.isWebGL2,g=a.logarithmicDepthBuffer,_=a.vertexTextures;let S=a.precision;const T={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(C){return C===0?"uv":`uv${C}`}function y(C,D,Y,te,de){const k=te.fog,K=de.geometry,J=C.isMeshStandardMaterial?te.environment:null,Z=(C.isMeshStandardMaterial?t:e).get(C.envMap||J),V=Z&&Z.mapping===Zl?Z.image.height:null,Q=T[C.type];C.precision!==null&&(S=a.getMaxPrecision(C.precision),S!==C.precision&&console.warn("THREE.WebGLProgram.getParameters:",C.precision,"not supported, using",S,"instead."));const z=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,L=z!==void 0?z.length:0;let G=0;K.morphAttributes.position!==void 0&&(G=1),K.morphAttributes.normal!==void 0&&(G=2),K.morphAttributes.color!==void 0&&(G=3);let j,re,fe,xe;if(Q){const Jt=Si[Q];j=Jt.vertexShader,re=Jt.fragmentShader}else j=C.vertexShader,re=C.fragmentShader,f.update(C),fe=f.getVertexShaderID(C),xe=f.getFragmentShaderID(C);const ge=r.getRenderTarget(),Ee=de.isInstancedMesh===!0,we=de.isBatchedMesh===!0,Ce=!!C.map,at=!!C.matcap,se=!!Z,Vt=!!C.aoMap,je=!!C.lightMap,tt=!!C.bumpMap,He=!!C.normalMap,At=!!C.displacementMap,rt=!!C.emissiveMap,N=!!C.metalnessMap,A=!!C.roughnessMap,ne=C.anisotropy>0,ye=C.clearcoat>0,ve=C.iridescence>0,Se=C.sheen>0,Ge=C.transmission>0,Le=ne&&!!C.anisotropyMap,Fe=ye&&!!C.clearcoatMap,Xe=ye&&!!C.clearcoatNormalMap,st=ye&&!!C.clearcoatRoughnessMap,me=ve&&!!C.iridescenceMap,pt=ve&&!!C.iridescenceThicknessMap,dt=Se&&!!C.sheenColorMap,Je=Se&&!!C.sheenRoughnessMap,We=!!C.specularMap,ke=!!C.specularColorMap,nt=!!C.specularIntensityMap,gt=Ge&&!!C.transmissionMap,Ct=Ge&&!!C.thicknessMap,ot=!!C.gradientMap,Ae=!!C.alphaMap,H=C.alphaTest>0,Re=!!C.alphaHash,Pe=!!C.extensions,Ze=!!K.attributes.uv1,Ye=!!K.attributes.uv2,Mt=!!K.attributes.uv3;let Et=Ar;return C.toneMapped&&(ge===null||ge.isXRRenderTarget===!0)&&(Et=r.toneMapping),{isWebGL2:m,shaderID:Q,shaderType:C.type,shaderName:C.name,vertexShader:j,fragmentShader:re,defines:C.defines,customVertexShaderID:fe,customFragmentShaderID:xe,isRawShaderMaterial:C.isRawShaderMaterial===!0,glslVersion:C.glslVersion,precision:S,batching:we,instancing:Ee,instancingColor:Ee&&de.instanceColor!==null,supportsVertexTextures:_,outputColorSpace:ge===null?r.outputColorSpace:ge.isXRRenderTarget===!0?ge.texture.colorSpace:Yi,map:Ce,matcap:at,envMap:se,envMapMode:se&&Z.mapping,envMapCubeUVHeight:V,aoMap:Vt,lightMap:je,bumpMap:tt,normalMap:He,displacementMap:_&&At,emissiveMap:rt,normalMapObjectSpace:He&&C.normalMapType===uy,normalMapTangentSpace:He&&C.normalMapType===Dg,metalnessMap:N,roughnessMap:A,anisotropy:ne,anisotropyMap:Le,clearcoat:ye,clearcoatMap:Fe,clearcoatNormalMap:Xe,clearcoatRoughnessMap:st,iridescence:ve,iridescenceMap:me,iridescenceThicknessMap:pt,sheen:Se,sheenColorMap:dt,sheenRoughnessMap:Je,specularMap:We,specularColorMap:ke,specularIntensityMap:nt,transmission:Ge,transmissionMap:gt,thicknessMap:Ct,gradientMap:ot,opaque:C.transparent===!1&&C.blending===Zs,alphaMap:Ae,alphaTest:H,alphaHash:Re,combine:C.combine,mapUv:Ce&&M(C.map.channel),aoMapUv:Vt&&M(C.aoMap.channel),lightMapUv:je&&M(C.lightMap.channel),bumpMapUv:tt&&M(C.bumpMap.channel),normalMapUv:He&&M(C.normalMap.channel),displacementMapUv:At&&M(C.displacementMap.channel),emissiveMapUv:rt&&M(C.emissiveMap.channel),metalnessMapUv:N&&M(C.metalnessMap.channel),roughnessMapUv:A&&M(C.roughnessMap.channel),anisotropyMapUv:Le&&M(C.anisotropyMap.channel),clearcoatMapUv:Fe&&M(C.clearcoatMap.channel),clearcoatNormalMapUv:Xe&&M(C.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:st&&M(C.clearcoatRoughnessMap.channel),iridescenceMapUv:me&&M(C.iridescenceMap.channel),iridescenceThicknessMapUv:pt&&M(C.iridescenceThicknessMap.channel),sheenColorMapUv:dt&&M(C.sheenColorMap.channel),sheenRoughnessMapUv:Je&&M(C.sheenRoughnessMap.channel),specularMapUv:We&&M(C.specularMap.channel),specularColorMapUv:ke&&M(C.specularColorMap.channel),specularIntensityMapUv:nt&&M(C.specularIntensityMap.channel),transmissionMapUv:gt&&M(C.transmissionMap.channel),thicknessMapUv:Ct&&M(C.thicknessMap.channel),alphaMapUv:Ae&&M(C.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(He||ne),vertexColors:C.vertexColors,vertexAlphas:C.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,vertexUv1s:Ze,vertexUv2s:Ye,vertexUv3s:Mt,pointsUvs:de.isPoints===!0&&!!K.attributes.uv&&(Ce||Ae),fog:!!k,useFog:C.fog===!0,fogExp2:k&&k.isFogExp2,flatShading:C.flatShading===!0,sizeAttenuation:C.sizeAttenuation===!0,logarithmicDepthBuffer:g,skinning:de.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:L,morphTextureStride:G,numDirLights:D.directional.length,numPointLights:D.point.length,numSpotLights:D.spot.length,numSpotLightMaps:D.spotLightMap.length,numRectAreaLights:D.rectArea.length,numHemiLights:D.hemi.length,numDirLightShadows:D.directionalShadowMap.length,numPointLightShadows:D.pointShadowMap.length,numSpotLightShadows:D.spotShadowMap.length,numSpotLightShadowsWithMaps:D.numSpotLightShadowsWithMaps,numLightProbes:D.numLightProbes,numClippingPlanes:d.numPlanes,numClipIntersection:d.numIntersection,dithering:C.dithering,shadowMapEnabled:r.shadowMap.enabled&&Y.length>0,shadowMapType:r.shadowMap.type,toneMapping:Et,useLegacyLights:r._useLegacyLights,decodeVideoTexture:Ce&&C.map.isVideoTexture===!0&&wt.getTransfer(C.map.colorSpace)===Dt,premultipliedAlpha:C.premultipliedAlpha,doubleSided:C.side===Vi,flipSided:C.side===On,useDepthPacking:C.depthPacking>=0,depthPacking:C.depthPacking||0,index0AttributeName:C.index0AttributeName,extensionDerivatives:Pe&&C.extensions.derivatives===!0,extensionFragDepth:Pe&&C.extensions.fragDepth===!0,extensionDrawBuffers:Pe&&C.extensions.drawBuffers===!0,extensionShaderTextureLOD:Pe&&C.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Pe&&C.extensions.clipCullDistance&&s.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:m||s.has("EXT_frag_depth"),rendererExtensionDrawBuffers:m||s.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:m||s.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:s.has("KHR_parallel_shader_compile"),customProgramCacheKey:C.customProgramCacheKey()}}function x(C){const D=[];if(C.shaderID?D.push(C.shaderID):(D.push(C.customVertexShaderID),D.push(C.customFragmentShaderID)),C.defines!==void 0)for(const Y in C.defines)D.push(Y),D.push(C.defines[Y]);return C.isRawShaderMaterial===!1&&(b(D,C),w(D,C),D.push(r.outputColorSpace)),D.push(C.customProgramCacheKey),D.join()}function b(C,D){C.push(D.precision),C.push(D.outputColorSpace),C.push(D.envMapMode),C.push(D.envMapCubeUVHeight),C.push(D.mapUv),C.push(D.alphaMapUv),C.push(D.lightMapUv),C.push(D.aoMapUv),C.push(D.bumpMapUv),C.push(D.normalMapUv),C.push(D.displacementMapUv),C.push(D.emissiveMapUv),C.push(D.metalnessMapUv),C.push(D.roughnessMapUv),C.push(D.anisotropyMapUv),C.push(D.clearcoatMapUv),C.push(D.clearcoatNormalMapUv),C.push(D.clearcoatRoughnessMapUv),C.push(D.iridescenceMapUv),C.push(D.iridescenceThicknessMapUv),C.push(D.sheenColorMapUv),C.push(D.sheenRoughnessMapUv),C.push(D.specularMapUv),C.push(D.specularColorMapUv),C.push(D.specularIntensityMapUv),C.push(D.transmissionMapUv),C.push(D.thicknessMapUv),C.push(D.combine),C.push(D.fogExp2),C.push(D.sizeAttenuation),C.push(D.morphTargetsCount),C.push(D.morphAttributeCount),C.push(D.numDirLights),C.push(D.numPointLights),C.push(D.numSpotLights),C.push(D.numSpotLightMaps),C.push(D.numHemiLights),C.push(D.numRectAreaLights),C.push(D.numDirLightShadows),C.push(D.numPointLightShadows),C.push(D.numSpotLightShadows),C.push(D.numSpotLightShadowsWithMaps),C.push(D.numLightProbes),C.push(D.shadowMapType),C.push(D.toneMapping),C.push(D.numClippingPlanes),C.push(D.numClipIntersection),C.push(D.depthPacking)}function w(C,D){c.disableAll(),D.isWebGL2&&c.enable(0),D.supportsVertexTextures&&c.enable(1),D.instancing&&c.enable(2),D.instancingColor&&c.enable(3),D.matcap&&c.enable(4),D.envMap&&c.enable(5),D.normalMapObjectSpace&&c.enable(6),D.normalMapTangentSpace&&c.enable(7),D.clearcoat&&c.enable(8),D.iridescence&&c.enable(9),D.alphaTest&&c.enable(10),D.vertexColors&&c.enable(11),D.vertexAlphas&&c.enable(12),D.vertexUv1s&&c.enable(13),D.vertexUv2s&&c.enable(14),D.vertexUv3s&&c.enable(15),D.vertexTangents&&c.enable(16),D.anisotropy&&c.enable(17),D.alphaHash&&c.enable(18),D.batching&&c.enable(19),C.push(c.mask),c.disableAll(),D.fog&&c.enable(0),D.useFog&&c.enable(1),D.flatShading&&c.enable(2),D.logarithmicDepthBuffer&&c.enable(3),D.skinning&&c.enable(4),D.morphTargets&&c.enable(5),D.morphNormals&&c.enable(6),D.morphColors&&c.enable(7),D.premultipliedAlpha&&c.enable(8),D.shadowMapEnabled&&c.enable(9),D.useLegacyLights&&c.enable(10),D.doubleSided&&c.enable(11),D.flipSided&&c.enable(12),D.useDepthPacking&&c.enable(13),D.dithering&&c.enable(14),D.transmission&&c.enable(15),D.sheen&&c.enable(16),D.opaque&&c.enable(17),D.pointsUvs&&c.enable(18),D.decodeVideoTexture&&c.enable(19),C.push(c.mask)}function R(C){const D=T[C.type];let Y;if(D){const te=Si[D];Y=Oy.clone(te.uniforms)}else Y=C.uniforms;return Y}function O(C,D){let Y;for(let te=0,de=p.length;te<de;te++){const k=p[te];if(k.cacheKey===D){Y=k,++Y.usedTimes;break}}return Y===void 0&&(Y=new Z1(r,D,C,l),p.push(Y)),Y}function I(C){if(--C.usedTimes===0){const D=p.indexOf(C);p[D]=p[p.length-1],p.pop(),C.destroy()}}function U(C){f.remove(C)}function ce(){f.dispose()}return{getParameters:y,getProgramCacheKey:x,getUniforms:R,acquireProgram:O,releaseProgram:I,releaseShaderCache:U,programs:p,dispose:ce}}function nT(){let r=new WeakMap;function e(l){let d=r.get(l);return d===void 0&&(d={},r.set(l,d)),d}function t(l){r.delete(l)}function s(l,d,c){r.get(l)[d]=c}function a(){r=new WeakMap}return{get:e,remove:t,update:s,dispose:a}}function iT(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Jm(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function eg(){const r=[];let e=0;const t=[],s=[],a=[];function l(){e=0,t.length=0,s.length=0,a.length=0}function d(g,_,S,T,M,y){let x=r[e];return x===void 0?(x={id:g.id,object:g,geometry:_,material:S,groupOrder:T,renderOrder:g.renderOrder,z:M,group:y},r[e]=x):(x.id=g.id,x.object=g,x.geometry=_,x.material=S,x.groupOrder=T,x.renderOrder=g.renderOrder,x.z=M,x.group=y),e++,x}function c(g,_,S,T,M,y){const x=d(g,_,S,T,M,y);S.transmission>0?s.push(x):S.transparent===!0?a.push(x):t.push(x)}function f(g,_,S,T,M,y){const x=d(g,_,S,T,M,y);S.transmission>0?s.unshift(x):S.transparent===!0?a.unshift(x):t.unshift(x)}function p(g,_){t.length>1&&t.sort(g||iT),s.length>1&&s.sort(_||Jm),a.length>1&&a.sort(_||Jm)}function m(){for(let g=e,_=r.length;g<_;g++){const S=r[g];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:t,transmissive:s,transparent:a,init:l,push:c,unshift:f,finish:m,sort:p}}function rT(){let r=new WeakMap;function e(s,a){const l=r.get(s);let d;return l===void 0?(d=new eg,r.set(s,[d])):a>=l.length?(d=new eg,l.push(d)):d=l[a],d}function t(){r=new WeakMap}return{get:e,dispose:t}}function sT(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new le,color:new yt};break;case"SpotLight":t={position:new le,direction:new le,color:new yt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new le,color:new yt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new le,skyColor:new yt,groundColor:new yt};break;case"RectAreaLight":t={color:new yt,position:new le,halfWidth:new le,halfHeight:new le};break}return r[e.id]=t,t}}}function oT(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let aT=0;function lT(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function uT(r,e){const t=new sT,s=oT(),a={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)a.probe.push(new le);const l=new le,d=new Kt,c=new Kt;function f(m,g){let _=0,S=0,T=0;for(let te=0;te<9;te++)a.probe[te].set(0,0,0);let M=0,y=0,x=0,b=0,w=0,R=0,O=0,I=0,U=0,ce=0,C=0;m.sort(lT);const D=g===!0?Math.PI:1;for(let te=0,de=m.length;te<de;te++){const k=m[te],K=k.color,J=k.intensity,Z=k.distance,V=k.shadow&&k.shadow.map?k.shadow.map.texture:null;if(k.isAmbientLight)_+=K.r*J*D,S+=K.g*J*D,T+=K.b*J*D;else if(k.isLightProbe){for(let Q=0;Q<9;Q++)a.probe[Q].addScaledVector(k.sh.coefficients[Q],J);C++}else if(k.isDirectionalLight){const Q=t.get(k);if(Q.color.copy(k.color).multiplyScalar(k.intensity*D),k.castShadow){const z=k.shadow,L=s.get(k);L.shadowBias=z.bias,L.shadowNormalBias=z.normalBias,L.shadowRadius=z.radius,L.shadowMapSize=z.mapSize,a.directionalShadow[M]=L,a.directionalShadowMap[M]=V,a.directionalShadowMatrix[M]=k.shadow.matrix,R++}a.directional[M]=Q,M++}else if(k.isSpotLight){const Q=t.get(k);Q.position.setFromMatrixPosition(k.matrixWorld),Q.color.copy(K).multiplyScalar(J*D),Q.distance=Z,Q.coneCos=Math.cos(k.angle),Q.penumbraCos=Math.cos(k.angle*(1-k.penumbra)),Q.decay=k.decay,a.spot[x]=Q;const z=k.shadow;if(k.map&&(a.spotLightMap[U]=k.map,U++,z.updateMatrices(k),k.castShadow&&ce++),a.spotLightMatrix[x]=z.matrix,k.castShadow){const L=s.get(k);L.shadowBias=z.bias,L.shadowNormalBias=z.normalBias,L.shadowRadius=z.radius,L.shadowMapSize=z.mapSize,a.spotShadow[x]=L,a.spotShadowMap[x]=V,I++}x++}else if(k.isRectAreaLight){const Q=t.get(k);Q.color.copy(K).multiplyScalar(J),Q.halfWidth.set(k.width*.5,0,0),Q.halfHeight.set(0,k.height*.5,0),a.rectArea[b]=Q,b++}else if(k.isPointLight){const Q=t.get(k);if(Q.color.copy(k.color).multiplyScalar(k.intensity*D),Q.distance=k.distance,Q.decay=k.decay,k.castShadow){const z=k.shadow,L=s.get(k);L.shadowBias=z.bias,L.shadowNormalBias=z.normalBias,L.shadowRadius=z.radius,L.shadowMapSize=z.mapSize,L.shadowCameraNear=z.camera.near,L.shadowCameraFar=z.camera.far,a.pointShadow[y]=L,a.pointShadowMap[y]=V,a.pointShadowMatrix[y]=k.shadow.matrix,O++}a.point[y]=Q,y++}else if(k.isHemisphereLight){const Q=t.get(k);Q.skyColor.copy(k.color).multiplyScalar(J*D),Q.groundColor.copy(k.groundColor).multiplyScalar(J*D),a.hemi[w]=Q,w++}}b>0&&(e.isWebGL2?r.has("OES_texture_float_linear")===!0?(a.rectAreaLTC1=be.LTC_FLOAT_1,a.rectAreaLTC2=be.LTC_FLOAT_2):(a.rectAreaLTC1=be.LTC_HALF_1,a.rectAreaLTC2=be.LTC_HALF_2):r.has("OES_texture_float_linear")===!0?(a.rectAreaLTC1=be.LTC_FLOAT_1,a.rectAreaLTC2=be.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(a.rectAreaLTC1=be.LTC_HALF_1,a.rectAreaLTC2=be.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),a.ambient[0]=_,a.ambient[1]=S,a.ambient[2]=T;const Y=a.hash;(Y.directionalLength!==M||Y.pointLength!==y||Y.spotLength!==x||Y.rectAreaLength!==b||Y.hemiLength!==w||Y.numDirectionalShadows!==R||Y.numPointShadows!==O||Y.numSpotShadows!==I||Y.numSpotMaps!==U||Y.numLightProbes!==C)&&(a.directional.length=M,a.spot.length=x,a.rectArea.length=b,a.point.length=y,a.hemi.length=w,a.directionalShadow.length=R,a.directionalShadowMap.length=R,a.pointShadow.length=O,a.pointShadowMap.length=O,a.spotShadow.length=I,a.spotShadowMap.length=I,a.directionalShadowMatrix.length=R,a.pointShadowMatrix.length=O,a.spotLightMatrix.length=I+U-ce,a.spotLightMap.length=U,a.numSpotLightShadowsWithMaps=ce,a.numLightProbes=C,Y.directionalLength=M,Y.pointLength=y,Y.spotLength=x,Y.rectAreaLength=b,Y.hemiLength=w,Y.numDirectionalShadows=R,Y.numPointShadows=O,Y.numSpotShadows=I,Y.numSpotMaps=U,Y.numLightProbes=C,a.version=aT++)}function p(m,g){let _=0,S=0,T=0,M=0,y=0;const x=g.matrixWorldInverse;for(let b=0,w=m.length;b<w;b++){const R=m[b];if(R.isDirectionalLight){const O=a.directional[_];O.direction.setFromMatrixPosition(R.matrixWorld),l.setFromMatrixPosition(R.target.matrixWorld),O.direction.sub(l),O.direction.transformDirection(x),_++}else if(R.isSpotLight){const O=a.spot[T];O.position.setFromMatrixPosition(R.matrixWorld),O.position.applyMatrix4(x),O.direction.setFromMatrixPosition(R.matrixWorld),l.setFromMatrixPosition(R.target.matrixWorld),O.direction.sub(l),O.direction.transformDirection(x),T++}else if(R.isRectAreaLight){const O=a.rectArea[M];O.position.setFromMatrixPosition(R.matrixWorld),O.position.applyMatrix4(x),c.identity(),d.copy(R.matrixWorld),d.premultiply(x),c.extractRotation(d),O.halfWidth.set(R.width*.5,0,0),O.halfHeight.set(0,R.height*.5,0),O.halfWidth.applyMatrix4(c),O.halfHeight.applyMatrix4(c),M++}else if(R.isPointLight){const O=a.point[S];O.position.setFromMatrixPosition(R.matrixWorld),O.position.applyMatrix4(x),S++}else if(R.isHemisphereLight){const O=a.hemi[y];O.direction.setFromMatrixPosition(R.matrixWorld),O.direction.transformDirection(x),y++}}}return{setup:f,setupView:p,state:a}}function tg(r,e){const t=new uT(r,e),s=[],a=[];function l(){s.length=0,a.length=0}function d(g){s.push(g)}function c(g){a.push(g)}function f(g){t.setup(s,g)}function p(g){t.setupView(s,g)}return{init:l,state:{lightsArray:s,shadowsArray:a,lights:t},setupLights:f,setupLightsView:p,pushLight:d,pushShadow:c}}function cT(r,e){let t=new WeakMap;function s(l,d=0){const c=t.get(l);let f;return c===void 0?(f=new tg(r,e),t.set(l,[f])):d>=c.length?(f=new tg(r,e),c.push(f)):f=c[d],f}function a(){t=new WeakMap}return{get:s,dispose:a}}class dT extends la{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ay,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class fT extends la{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const hT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,pT=`uniform sampler2D shadow_pass;
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
}`;function mT(r,e,t){let s=new Hd;const a=new St,l=new St,d=new sn,c=new dT({depthPacking:ly}),f=new fT,p={},m=t.maxTextureSize,g={[Rr]:On,[On]:Rr,[Vi]:Vi},_=new os({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new St},radius:{value:4}},vertexShader:hT,fragmentShader:pT}),S=_.clone();S.defines.HORIZONTAL_PASS=1;const T=new Pr;T.setAttribute("position",new Mi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new Xi(T,_),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sg;let x=this.type;this.render=function(I,U,ce){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||I.length===0)return;const C=r.getRenderTarget(),D=r.getActiveCubeFace(),Y=r.getActiveMipmapLevel(),te=r.state;te.setBlending(wr),te.buffers.color.setClear(1,1,1,1),te.buffers.depth.setTest(!0),te.setScissorTest(!1);const de=x!==Hi&&this.type===Hi,k=x===Hi&&this.type!==Hi;for(let K=0,J=I.length;K<J;K++){const Z=I[K],V=Z.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;a.copy(V.mapSize);const Q=V.getFrameExtents();if(a.multiply(Q),l.copy(V.mapSize),(a.x>m||a.y>m)&&(a.x>m&&(l.x=Math.floor(m/Q.x),a.x=l.x*Q.x,V.mapSize.x=l.x),a.y>m&&(l.y=Math.floor(m/Q.y),a.y=l.y*Q.y,V.mapSize.y=l.y)),V.map===null||de===!0||k===!0){const L=this.type!==Hi?{minFilter:Tn,magFilter:Tn}:{};V.map!==null&&V.map.dispose(),V.map=new ss(a.x,a.y,L),V.map.texture.name=Z.name+".shadowMap",V.camera.updateProjectionMatrix()}r.setRenderTarget(V.map),r.clear();const z=V.getViewportCount();for(let L=0;L<z;L++){const G=V.getViewport(L);d.set(l.x*G.x,l.y*G.y,l.x*G.z,l.y*G.w),te.viewport(d),V.updateMatrices(Z,L),s=V.getFrustum(),R(U,ce,V.camera,Z,this.type)}V.isPointLightShadow!==!0&&this.type===Hi&&b(V,ce),V.needsUpdate=!1}x=this.type,y.needsUpdate=!1,r.setRenderTarget(C,D,Y)};function b(I,U){const ce=e.update(M);_.defines.VSM_SAMPLES!==I.blurSamples&&(_.defines.VSM_SAMPLES=I.blurSamples,S.defines.VSM_SAMPLES=I.blurSamples,_.needsUpdate=!0,S.needsUpdate=!0),I.mapPass===null&&(I.mapPass=new ss(a.x,a.y)),_.uniforms.shadow_pass.value=I.map.texture,_.uniforms.resolution.value=I.mapSize,_.uniforms.radius.value=I.radius,r.setRenderTarget(I.mapPass),r.clear(),r.renderBufferDirect(U,null,ce,_,M,null),S.uniforms.shadow_pass.value=I.mapPass.texture,S.uniforms.resolution.value=I.mapSize,S.uniforms.radius.value=I.radius,r.setRenderTarget(I.map),r.clear(),r.renderBufferDirect(U,null,ce,S,M,null)}function w(I,U,ce,C){let D=null;const Y=ce.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(Y!==void 0)D=Y;else if(D=ce.isPointLight===!0?f:c,r.localClippingEnabled&&U.clipShadows===!0&&Array.isArray(U.clippingPlanes)&&U.clippingPlanes.length!==0||U.displacementMap&&U.displacementScale!==0||U.alphaMap&&U.alphaTest>0||U.map&&U.alphaTest>0){const te=D.uuid,de=U.uuid;let k=p[te];k===void 0&&(k={},p[te]=k);let K=k[de];K===void 0&&(K=D.clone(),k[de]=K,U.addEventListener("dispose",O)),D=K}if(D.visible=U.visible,D.wireframe=U.wireframe,C===Hi?D.side=U.shadowSide!==null?U.shadowSide:U.side:D.side=U.shadowSide!==null?U.shadowSide:g[U.side],D.alphaMap=U.alphaMap,D.alphaTest=U.alphaTest,D.map=U.map,D.clipShadows=U.clipShadows,D.clippingPlanes=U.clippingPlanes,D.clipIntersection=U.clipIntersection,D.displacementMap=U.displacementMap,D.displacementScale=U.displacementScale,D.displacementBias=U.displacementBias,D.wireframeLinewidth=U.wireframeLinewidth,D.linewidth=U.linewidth,ce.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const te=r.properties.get(D);te.light=ce}return D}function R(I,U,ce,C,D){if(I.visible===!1)return;if(I.layers.test(U.layers)&&(I.isMesh||I.isLine||I.isPoints)&&(I.castShadow||I.receiveShadow&&D===Hi)&&(!I.frustumCulled||s.intersectsObject(I))){I.modelViewMatrix.multiplyMatrices(ce.matrixWorldInverse,I.matrixWorld);const de=e.update(I),k=I.material;if(Array.isArray(k)){const K=de.groups;for(let J=0,Z=K.length;J<Z;J++){const V=K[J],Q=k[V.materialIndex];if(Q&&Q.visible){const z=w(I,Q,C,D);I.onBeforeShadow(r,I,U,ce,de,z,V),r.renderBufferDirect(ce,null,de,z,I,V),I.onAfterShadow(r,I,U,ce,de,z,V)}}}else if(k.visible){const K=w(I,k,C,D);I.onBeforeShadow(r,I,U,ce,de,K,null),r.renderBufferDirect(ce,null,de,K,I,null),I.onAfterShadow(r,I,U,ce,de,K,null)}}const te=I.children;for(let de=0,k=te.length;de<k;de++)R(te[de],U,ce,C,D)}function O(I){I.target.removeEventListener("dispose",O);for(const ce in p){const C=p[ce],D=I.target.uuid;D in C&&(C[D].dispose(),delete C[D])}}}function gT(r,e,t){const s=t.isWebGL2;function a(){let H=!1;const Re=new sn;let Pe=null;const Ze=new sn(0,0,0,0);return{setMask:function(Ye){Pe!==Ye&&!H&&(r.colorMask(Ye,Ye,Ye,Ye),Pe=Ye)},setLocked:function(Ye){H=Ye},setClear:function(Ye,Mt,Et,Ot,Jt){Jt===!0&&(Ye*=Ot,Mt*=Ot,Et*=Ot),Re.set(Ye,Mt,Et,Ot),Ze.equals(Re)===!1&&(r.clearColor(Ye,Mt,Et,Ot),Ze.copy(Re))},reset:function(){H=!1,Pe=null,Ze.set(-1,0,0,0)}}}function l(){let H=!1,Re=null,Pe=null,Ze=null;return{setTest:function(Ye){Ye?we(r.DEPTH_TEST):Ce(r.DEPTH_TEST)},setMask:function(Ye){Re!==Ye&&!H&&(r.depthMask(Ye),Re=Ye)},setFunc:function(Ye){if(Pe!==Ye){switch(Ye){case Ox:r.depthFunc(r.NEVER);break;case kx:r.depthFunc(r.ALWAYS);break;case Bx:r.depthFunc(r.LESS);break;case Gl:r.depthFunc(r.LEQUAL);break;case zx:r.depthFunc(r.EQUAL);break;case Hx:r.depthFunc(r.GEQUAL);break;case Gx:r.depthFunc(r.GREATER);break;case Vx:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Pe=Ye}},setLocked:function(Ye){H=Ye},setClear:function(Ye){Ze!==Ye&&(r.clearDepth(Ye),Ze=Ye)},reset:function(){H=!1,Re=null,Pe=null,Ze=null}}}function d(){let H=!1,Re=null,Pe=null,Ze=null,Ye=null,Mt=null,Et=null,Ot=null,Jt=null;return{setTest:function(_t){H||(_t?we(r.STENCIL_TEST):Ce(r.STENCIL_TEST))},setMask:function(_t){Re!==_t&&!H&&(r.stencilMask(_t),Re=_t)},setFunc:function(_t,Yt,cn){(Pe!==_t||Ze!==Yt||Ye!==cn)&&(r.stencilFunc(_t,Yt,cn),Pe=_t,Ze=Yt,Ye=cn)},setOp:function(_t,Yt,cn){(Mt!==_t||Et!==Yt||Ot!==cn)&&(r.stencilOp(_t,Yt,cn),Mt=_t,Et=Yt,Ot=cn)},setLocked:function(_t){H=_t},setClear:function(_t){Jt!==_t&&(r.clearStencil(_t),Jt=_t)},reset:function(){H=!1,Re=null,Pe=null,Ze=null,Ye=null,Mt=null,Et=null,Ot=null,Jt=null}}}const c=new a,f=new l,p=new d,m=new WeakMap,g=new WeakMap;let _={},S={},T=new WeakMap,M=[],y=null,x=!1,b=null,w=null,R=null,O=null,I=null,U=null,ce=null,C=new yt(0,0,0),D=0,Y=!1,te=null,de=null,k=null,K=null,J=null;const Z=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,Q=0;const z=r.getParameter(r.VERSION);z.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(z)[1]),V=Q>=1):z.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),V=Q>=2);let L=null,G={};const j=r.getParameter(r.SCISSOR_BOX),re=r.getParameter(r.VIEWPORT),fe=new sn().fromArray(j),xe=new sn().fromArray(re);function ge(H,Re,Pe,Ze){const Ye=new Uint8Array(4),Mt=r.createTexture();r.bindTexture(H,Mt),r.texParameteri(H,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(H,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Et=0;Et<Pe;Et++)s&&(H===r.TEXTURE_3D||H===r.TEXTURE_2D_ARRAY)?r.texImage3D(Re,0,r.RGBA,1,1,Ze,0,r.RGBA,r.UNSIGNED_BYTE,Ye):r.texImage2D(Re+Et,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Ye);return Mt}const Ee={};Ee[r.TEXTURE_2D]=ge(r.TEXTURE_2D,r.TEXTURE_2D,1),Ee[r.TEXTURE_CUBE_MAP]=ge(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),s&&(Ee[r.TEXTURE_2D_ARRAY]=ge(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Ee[r.TEXTURE_3D]=ge(r.TEXTURE_3D,r.TEXTURE_3D,1,1)),c.setClear(0,0,0,1),f.setClear(1),p.setClear(0),we(r.DEPTH_TEST),f.setFunc(Gl),rt(!1),N(Fp),we(r.CULL_FACE),He(wr);function we(H){_[H]!==!0&&(r.enable(H),_[H]=!0)}function Ce(H){_[H]!==!1&&(r.disable(H),_[H]=!1)}function at(H,Re){return S[H]!==Re?(r.bindFramebuffer(H,Re),S[H]=Re,s&&(H===r.DRAW_FRAMEBUFFER&&(S[r.FRAMEBUFFER]=Re),H===r.FRAMEBUFFER&&(S[r.DRAW_FRAMEBUFFER]=Re)),!0):!1}function se(H,Re){let Pe=M,Ze=!1;if(H)if(Pe=T.get(Re),Pe===void 0&&(Pe=[],T.set(Re,Pe)),H.isWebGLMultipleRenderTargets){const Ye=H.texture;if(Pe.length!==Ye.length||Pe[0]!==r.COLOR_ATTACHMENT0){for(let Mt=0,Et=Ye.length;Mt<Et;Mt++)Pe[Mt]=r.COLOR_ATTACHMENT0+Mt;Pe.length=Ye.length,Ze=!0}}else Pe[0]!==r.COLOR_ATTACHMENT0&&(Pe[0]=r.COLOR_ATTACHMENT0,Ze=!0);else Pe[0]!==r.BACK&&(Pe[0]=r.BACK,Ze=!0);Ze&&(t.isWebGL2?r.drawBuffers(Pe):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(Pe))}function Vt(H){return y!==H?(r.useProgram(H),y=H,!0):!1}const je={[Qr]:r.FUNC_ADD,[Mx]:r.FUNC_SUBTRACT,[Ex]:r.FUNC_REVERSE_SUBTRACT};if(s)je[zp]=r.MIN,je[Hp]=r.MAX;else{const H=e.get("EXT_blend_minmax");H!==null&&(je[zp]=H.MIN_EXT,je[Hp]=H.MAX_EXT)}const tt={[Tx]:r.ZERO,[wx]:r.ONE,[Ax]:r.SRC_COLOR,[Ed]:r.SRC_ALPHA,[Dx]:r.SRC_ALPHA_SATURATE,[Px]:r.DST_COLOR,[Rx]:r.DST_ALPHA,[Cx]:r.ONE_MINUS_SRC_COLOR,[Td]:r.ONE_MINUS_SRC_ALPHA,[Lx]:r.ONE_MINUS_DST_COLOR,[bx]:r.ONE_MINUS_DST_ALPHA,[Ix]:r.CONSTANT_COLOR,[Nx]:r.ONE_MINUS_CONSTANT_COLOR,[Ux]:r.CONSTANT_ALPHA,[Fx]:r.ONE_MINUS_CONSTANT_ALPHA};function He(H,Re,Pe,Ze,Ye,Mt,Et,Ot,Jt,_t){if(H===wr){x===!0&&(Ce(r.BLEND),x=!1);return}if(x===!1&&(we(r.BLEND),x=!0),H!==Sx){if(H!==b||_t!==Y){if((w!==Qr||I!==Qr)&&(r.blendEquation(r.FUNC_ADD),w=Qr,I=Qr),_t)switch(H){case Zs:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Op:r.blendFunc(r.ONE,r.ONE);break;case kp:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Bp:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}else switch(H){case Zs:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Op:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case kp:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Bp:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}R=null,O=null,U=null,ce=null,C.set(0,0,0),D=0,b=H,Y=_t}return}Ye=Ye||Re,Mt=Mt||Pe,Et=Et||Ze,(Re!==w||Ye!==I)&&(r.blendEquationSeparate(je[Re],je[Ye]),w=Re,I=Ye),(Pe!==R||Ze!==O||Mt!==U||Et!==ce)&&(r.blendFuncSeparate(tt[Pe],tt[Ze],tt[Mt],tt[Et]),R=Pe,O=Ze,U=Mt,ce=Et),(Ot.equals(C)===!1||Jt!==D)&&(r.blendColor(Ot.r,Ot.g,Ot.b,Jt),C.copy(Ot),D=Jt),b=H,Y=!1}function At(H,Re){H.side===Vi?Ce(r.CULL_FACE):we(r.CULL_FACE);let Pe=H.side===On;Re&&(Pe=!Pe),rt(Pe),H.blending===Zs&&H.transparent===!1?He(wr):He(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),f.setFunc(H.depthFunc),f.setTest(H.depthTest),f.setMask(H.depthWrite),c.setMask(H.colorWrite);const Ze=H.stencilWrite;p.setTest(Ze),Ze&&(p.setMask(H.stencilWriteMask),p.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),p.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),ne(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?we(r.SAMPLE_ALPHA_TO_COVERAGE):Ce(r.SAMPLE_ALPHA_TO_COVERAGE)}function rt(H){te!==H&&(H?r.frontFace(r.CW):r.frontFace(r.CCW),te=H)}function N(H){H!==_x?(we(r.CULL_FACE),H!==de&&(H===Fp?r.cullFace(r.BACK):H===xx?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Ce(r.CULL_FACE),de=H}function A(H){H!==k&&(V&&r.lineWidth(H),k=H)}function ne(H,Re,Pe){H?(we(r.POLYGON_OFFSET_FILL),(K!==Re||J!==Pe)&&(r.polygonOffset(Re,Pe),K=Re,J=Pe)):Ce(r.POLYGON_OFFSET_FILL)}function ye(H){H?we(r.SCISSOR_TEST):Ce(r.SCISSOR_TEST)}function ve(H){H===void 0&&(H=r.TEXTURE0+Z-1),L!==H&&(r.activeTexture(H),L=H)}function Se(H,Re,Pe){Pe===void 0&&(L===null?Pe=r.TEXTURE0+Z-1:Pe=L);let Ze=G[Pe];Ze===void 0&&(Ze={type:void 0,texture:void 0},G[Pe]=Ze),(Ze.type!==H||Ze.texture!==Re)&&(L!==Pe&&(r.activeTexture(Pe),L=Pe),r.bindTexture(H,Re||Ee[H]),Ze.type=H,Ze.texture=Re)}function Ge(){const H=G[L];H!==void 0&&H.type!==void 0&&(r.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function Le(){try{r.compressedTexImage2D.apply(r,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Fe(){try{r.compressedTexImage3D.apply(r,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Xe(){try{r.texSubImage2D.apply(r,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function st(){try{r.texSubImage3D.apply(r,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function me(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function pt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function dt(){try{r.texStorage2D.apply(r,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Je(){try{r.texStorage3D.apply(r,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function We(){try{r.texImage2D.apply(r,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ke(){try{r.texImage3D.apply(r,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function nt(H){fe.equals(H)===!1&&(r.scissor(H.x,H.y,H.z,H.w),fe.copy(H))}function gt(H){xe.equals(H)===!1&&(r.viewport(H.x,H.y,H.z,H.w),xe.copy(H))}function Ct(H,Re){let Pe=g.get(Re);Pe===void 0&&(Pe=new WeakMap,g.set(Re,Pe));let Ze=Pe.get(H);Ze===void 0&&(Ze=r.getUniformBlockIndex(Re,H.name),Pe.set(H,Ze))}function ot(H,Re){const Ze=g.get(Re).get(H);m.get(Re)!==Ze&&(r.uniformBlockBinding(Re,Ze,H.__bindingPointIndex),m.set(Re,Ze))}function Ae(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),s===!0&&(r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),_={},L=null,G={},S={},T=new WeakMap,M=[],y=null,x=!1,b=null,w=null,R=null,O=null,I=null,U=null,ce=null,C=new yt(0,0,0),D=0,Y=!1,te=null,de=null,k=null,K=null,J=null,fe.set(0,0,r.canvas.width,r.canvas.height),xe.set(0,0,r.canvas.width,r.canvas.height),c.reset(),f.reset(),p.reset()}return{buffers:{color:c,depth:f,stencil:p},enable:we,disable:Ce,bindFramebuffer:at,drawBuffers:se,useProgram:Vt,setBlending:He,setMaterial:At,setFlipSided:rt,setCullFace:N,setLineWidth:A,setPolygonOffset:ne,setScissorTest:ye,activeTexture:ve,bindTexture:Se,unbindTexture:Ge,compressedTexImage2D:Le,compressedTexImage3D:Fe,texImage2D:We,texImage3D:ke,updateUBOMapping:Ct,uniformBlockBinding:ot,texStorage2D:dt,texStorage3D:Je,texSubImage2D:Xe,texSubImage3D:st,compressedTexSubImage2D:me,compressedTexSubImage3D:pt,scissor:nt,viewport:gt,reset:Ae}}function vT(r,e,t,s,a,l,d){const c=a.isWebGL2,f=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new WeakMap;let g;const _=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function T(N,A){return S?new OffscreenCanvas(N,A):Yl("canvas")}function M(N,A,ne,ye){let ve=1;if((N.width>ye||N.height>ye)&&(ve=ye/Math.max(N.width,N.height)),ve<1||A===!0)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap){const Se=A?Ld:Math.floor,Ge=Se(ve*N.width),Le=Se(ve*N.height);g===void 0&&(g=T(Ge,Le));const Fe=ne?T(Ge,Le):g;return Fe.width=Ge,Fe.height=Le,Fe.getContext("2d").drawImage(N,0,0,Ge,Le),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+N.width+"x"+N.height+") to ("+Ge+"x"+Le+")."),Fe}else return"data"in N&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+N.width+"x"+N.height+")."),N;return N}function y(N){return vm(N.width)&&vm(N.height)}function x(N){return c?!1:N.wrapS!==pi||N.wrapT!==pi||N.minFilter!==Tn&&N.minFilter!==ei}function b(N,A){return N.generateMipmaps&&A&&N.minFilter!==Tn&&N.minFilter!==ei}function w(N){r.generateMipmap(N)}function R(N,A,ne,ye,ve=!1){if(c===!1)return A;if(N!==null){if(r[N]!==void 0)return r[N];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let Se=A;if(A===r.RED&&(ne===r.FLOAT&&(Se=r.R32F),ne===r.HALF_FLOAT&&(Se=r.R16F),ne===r.UNSIGNED_BYTE&&(Se=r.R8)),A===r.RED_INTEGER&&(ne===r.UNSIGNED_BYTE&&(Se=r.R8UI),ne===r.UNSIGNED_SHORT&&(Se=r.R16UI),ne===r.UNSIGNED_INT&&(Se=r.R32UI),ne===r.BYTE&&(Se=r.R8I),ne===r.SHORT&&(Se=r.R16I),ne===r.INT&&(Se=r.R32I)),A===r.RG&&(ne===r.FLOAT&&(Se=r.RG32F),ne===r.HALF_FLOAT&&(Se=r.RG16F),ne===r.UNSIGNED_BYTE&&(Se=r.RG8)),A===r.RGBA){const Ge=ve?Vl:wt.getTransfer(ye);ne===r.FLOAT&&(Se=r.RGBA32F),ne===r.HALF_FLOAT&&(Se=r.RGBA16F),ne===r.UNSIGNED_BYTE&&(Se=Ge===Dt?r.SRGB8_ALPHA8:r.RGBA8),ne===r.UNSIGNED_SHORT_4_4_4_4&&(Se=r.RGBA4),ne===r.UNSIGNED_SHORT_5_5_5_1&&(Se=r.RGB5_A1)}return(Se===r.R16F||Se===r.R32F||Se===r.RG16F||Se===r.RG32F||Se===r.RGBA16F||Se===r.RGBA32F)&&e.get("EXT_color_buffer_float"),Se}function O(N,A,ne){return b(N,ne)===!0||N.isFramebufferTexture&&N.minFilter!==Tn&&N.minFilter!==ei?Math.log2(Math.max(A.width,A.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?A.mipmaps.length:1}function I(N){return N===Tn||N===Gp||N===Vc?r.NEAREST:r.LINEAR}function U(N){const A=N.target;A.removeEventListener("dispose",U),C(A),A.isVideoTexture&&m.delete(A)}function ce(N){const A=N.target;A.removeEventListener("dispose",ce),Y(A)}function C(N){const A=s.get(N);if(A.__webglInit===void 0)return;const ne=N.source,ye=_.get(ne);if(ye){const ve=ye[A.__cacheKey];ve.usedTimes--,ve.usedTimes===0&&D(N),Object.keys(ye).length===0&&_.delete(ne)}s.remove(N)}function D(N){const A=s.get(N);r.deleteTexture(A.__webglTexture);const ne=N.source,ye=_.get(ne);delete ye[A.__cacheKey],d.memory.textures--}function Y(N){const A=N.texture,ne=s.get(N),ye=s.get(A);if(ye.__webglTexture!==void 0&&(r.deleteTexture(ye.__webglTexture),d.memory.textures--),N.depthTexture&&N.depthTexture.dispose(),N.isWebGLCubeRenderTarget)for(let ve=0;ve<6;ve++){if(Array.isArray(ne.__webglFramebuffer[ve]))for(let Se=0;Se<ne.__webglFramebuffer[ve].length;Se++)r.deleteFramebuffer(ne.__webglFramebuffer[ve][Se]);else r.deleteFramebuffer(ne.__webglFramebuffer[ve]);ne.__webglDepthbuffer&&r.deleteRenderbuffer(ne.__webglDepthbuffer[ve])}else{if(Array.isArray(ne.__webglFramebuffer))for(let ve=0;ve<ne.__webglFramebuffer.length;ve++)r.deleteFramebuffer(ne.__webglFramebuffer[ve]);else r.deleteFramebuffer(ne.__webglFramebuffer);if(ne.__webglDepthbuffer&&r.deleteRenderbuffer(ne.__webglDepthbuffer),ne.__webglMultisampledFramebuffer&&r.deleteFramebuffer(ne.__webglMultisampledFramebuffer),ne.__webglColorRenderbuffer)for(let ve=0;ve<ne.__webglColorRenderbuffer.length;ve++)ne.__webglColorRenderbuffer[ve]&&r.deleteRenderbuffer(ne.__webglColorRenderbuffer[ve]);ne.__webglDepthRenderbuffer&&r.deleteRenderbuffer(ne.__webglDepthRenderbuffer)}if(N.isWebGLMultipleRenderTargets)for(let ve=0,Se=A.length;ve<Se;ve++){const Ge=s.get(A[ve]);Ge.__webglTexture&&(r.deleteTexture(Ge.__webglTexture),d.memory.textures--),s.remove(A[ve])}s.remove(A),s.remove(N)}let te=0;function de(){te=0}function k(){const N=te;return N>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+N+" texture units while this GPU supports only "+a.maxTextures),te+=1,N}function K(N){const A=[];return A.push(N.wrapS),A.push(N.wrapT),A.push(N.wrapR||0),A.push(N.magFilter),A.push(N.minFilter),A.push(N.anisotropy),A.push(N.internalFormat),A.push(N.format),A.push(N.type),A.push(N.generateMipmaps),A.push(N.premultiplyAlpha),A.push(N.flipY),A.push(N.unpackAlignment),A.push(N.colorSpace),A.join()}function J(N,A){const ne=s.get(N);if(N.isVideoTexture&&At(N),N.isRenderTargetTexture===!1&&N.version>0&&ne.__version!==N.version){const ye=N.image;if(ye===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ye.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{fe(ne,N,A);return}}t.bindTexture(r.TEXTURE_2D,ne.__webglTexture,r.TEXTURE0+A)}function Z(N,A){const ne=s.get(N);if(N.version>0&&ne.__version!==N.version){fe(ne,N,A);return}t.bindTexture(r.TEXTURE_2D_ARRAY,ne.__webglTexture,r.TEXTURE0+A)}function V(N,A){const ne=s.get(N);if(N.version>0&&ne.__version!==N.version){fe(ne,N,A);return}t.bindTexture(r.TEXTURE_3D,ne.__webglTexture,r.TEXTURE0+A)}function Q(N,A){const ne=s.get(N);if(N.version>0&&ne.__version!==N.version){xe(ne,N,A);return}t.bindTexture(r.TEXTURE_CUBE_MAP,ne.__webglTexture,r.TEXTURE0+A)}const z={[Cd]:r.REPEAT,[pi]:r.CLAMP_TO_EDGE,[Rd]:r.MIRRORED_REPEAT},L={[Tn]:r.NEAREST,[Gp]:r.NEAREST_MIPMAP_NEAREST,[Vc]:r.NEAREST_MIPMAP_LINEAR,[ei]:r.LINEAR,[Qx]:r.LINEAR_MIPMAP_NEAREST,[ea]:r.LINEAR_MIPMAP_LINEAR},G={[cy]:r.NEVER,[gy]:r.ALWAYS,[dy]:r.LESS,[Ig]:r.LEQUAL,[fy]:r.EQUAL,[my]:r.GEQUAL,[hy]:r.GREATER,[py]:r.NOTEQUAL};function j(N,A,ne){if(ne?(r.texParameteri(N,r.TEXTURE_WRAP_S,z[A.wrapS]),r.texParameteri(N,r.TEXTURE_WRAP_T,z[A.wrapT]),(N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY)&&r.texParameteri(N,r.TEXTURE_WRAP_R,z[A.wrapR]),r.texParameteri(N,r.TEXTURE_MAG_FILTER,L[A.magFilter]),r.texParameteri(N,r.TEXTURE_MIN_FILTER,L[A.minFilter])):(r.texParameteri(N,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(N,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),(N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY)&&r.texParameteri(N,r.TEXTURE_WRAP_R,r.CLAMP_TO_EDGE),(A.wrapS!==pi||A.wrapT!==pi)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(N,r.TEXTURE_MAG_FILTER,I(A.magFilter)),r.texParameteri(N,r.TEXTURE_MIN_FILTER,I(A.minFilter)),A.minFilter!==Tn&&A.minFilter!==ei&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),A.compareFunction&&(r.texParameteri(N,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(N,r.TEXTURE_COMPARE_FUNC,G[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ye=e.get("EXT_texture_filter_anisotropic");if(A.magFilter===Tn||A.minFilter!==Vc&&A.minFilter!==ea||A.type===Tr&&e.has("OES_texture_float_linear")===!1||c===!1&&A.type===ta&&e.has("OES_texture_half_float_linear")===!1)return;(A.anisotropy>1||s.get(A).__currentAnisotropy)&&(r.texParameterf(N,ye.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,a.getMaxAnisotropy())),s.get(A).__currentAnisotropy=A.anisotropy)}}function re(N,A){let ne=!1;N.__webglInit===void 0&&(N.__webglInit=!0,A.addEventListener("dispose",U));const ye=A.source;let ve=_.get(ye);ve===void 0&&(ve={},_.set(ye,ve));const Se=K(A);if(Se!==N.__cacheKey){ve[Se]===void 0&&(ve[Se]={texture:r.createTexture(),usedTimes:0},d.memory.textures++,ne=!0),ve[Se].usedTimes++;const Ge=ve[N.__cacheKey];Ge!==void 0&&(ve[N.__cacheKey].usedTimes--,Ge.usedTimes===0&&D(A)),N.__cacheKey=Se,N.__webglTexture=ve[Se].texture}return ne}function fe(N,A,ne){let ye=r.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(ye=r.TEXTURE_2D_ARRAY),A.isData3DTexture&&(ye=r.TEXTURE_3D);const ve=re(N,A),Se=A.source;t.bindTexture(ye,N.__webglTexture,r.TEXTURE0+ne);const Ge=s.get(Se);if(Se.version!==Ge.__version||ve===!0){t.activeTexture(r.TEXTURE0+ne);const Le=wt.getPrimaries(wt.workingColorSpace),Fe=A.colorSpace===ni?null:wt.getPrimaries(A.colorSpace),Xe=A.colorSpace===ni||Le===Fe?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Xe);const st=x(A)&&y(A.image)===!1;let me=M(A.image,st,!1,a.maxTextureSize);me=rt(A,me);const pt=y(me)||c,dt=l.convert(A.format,A.colorSpace);let Je=l.convert(A.type),We=R(A.internalFormat,dt,Je,A.colorSpace,A.isVideoTexture);j(ye,A,pt);let ke;const nt=A.mipmaps,gt=c&&A.isVideoTexture!==!0&&We!==Pg,Ct=Ge.__version===void 0||ve===!0,ot=O(A,me,pt);if(A.isDepthTexture)We=r.DEPTH_COMPONENT,c?A.type===Tr?We=r.DEPTH_COMPONENT32F:A.type===Er?We=r.DEPTH_COMPONENT24:A.type===ns?We=r.DEPTH24_STENCIL8:We=r.DEPTH_COMPONENT16:A.type===Tr&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),A.format===is&&We===r.DEPTH_COMPONENT&&A.type!==kd&&A.type!==Er&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),A.type=Er,Je=l.convert(A.type)),A.format===no&&We===r.DEPTH_COMPONENT&&(We=r.DEPTH_STENCIL,A.type!==ns&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),A.type=ns,Je=l.convert(A.type))),Ct&&(gt?t.texStorage2D(r.TEXTURE_2D,1,We,me.width,me.height):t.texImage2D(r.TEXTURE_2D,0,We,me.width,me.height,0,dt,Je,null));else if(A.isDataTexture)if(nt.length>0&&pt){gt&&Ct&&t.texStorage2D(r.TEXTURE_2D,ot,We,nt[0].width,nt[0].height);for(let Ae=0,H=nt.length;Ae<H;Ae++)ke=nt[Ae],gt?t.texSubImage2D(r.TEXTURE_2D,Ae,0,0,ke.width,ke.height,dt,Je,ke.data):t.texImage2D(r.TEXTURE_2D,Ae,We,ke.width,ke.height,0,dt,Je,ke.data);A.generateMipmaps=!1}else gt?(Ct&&t.texStorage2D(r.TEXTURE_2D,ot,We,me.width,me.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,me.width,me.height,dt,Je,me.data)):t.texImage2D(r.TEXTURE_2D,0,We,me.width,me.height,0,dt,Je,me.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){gt&&Ct&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ot,We,nt[0].width,nt[0].height,me.depth);for(let Ae=0,H=nt.length;Ae<H;Ae++)ke=nt[Ae],A.format!==mi?dt!==null?gt?t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Ae,0,0,0,ke.width,ke.height,me.depth,dt,ke.data,0,0):t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Ae,We,ke.width,ke.height,me.depth,0,ke.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):gt?t.texSubImage3D(r.TEXTURE_2D_ARRAY,Ae,0,0,0,ke.width,ke.height,me.depth,dt,Je,ke.data):t.texImage3D(r.TEXTURE_2D_ARRAY,Ae,We,ke.width,ke.height,me.depth,0,dt,Je,ke.data)}else{gt&&Ct&&t.texStorage2D(r.TEXTURE_2D,ot,We,nt[0].width,nt[0].height);for(let Ae=0,H=nt.length;Ae<H;Ae++)ke=nt[Ae],A.format!==mi?dt!==null?gt?t.compressedTexSubImage2D(r.TEXTURE_2D,Ae,0,0,ke.width,ke.height,dt,ke.data):t.compressedTexImage2D(r.TEXTURE_2D,Ae,We,ke.width,ke.height,0,ke.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):gt?t.texSubImage2D(r.TEXTURE_2D,Ae,0,0,ke.width,ke.height,dt,Je,ke.data):t.texImage2D(r.TEXTURE_2D,Ae,We,ke.width,ke.height,0,dt,Je,ke.data)}else if(A.isDataArrayTexture)gt?(Ct&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ot,We,me.width,me.height,me.depth),t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,me.width,me.height,me.depth,dt,Je,me.data)):t.texImage3D(r.TEXTURE_2D_ARRAY,0,We,me.width,me.height,me.depth,0,dt,Je,me.data);else if(A.isData3DTexture)gt?(Ct&&t.texStorage3D(r.TEXTURE_3D,ot,We,me.width,me.height,me.depth),t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,me.width,me.height,me.depth,dt,Je,me.data)):t.texImage3D(r.TEXTURE_3D,0,We,me.width,me.height,me.depth,0,dt,Je,me.data);else if(A.isFramebufferTexture){if(Ct)if(gt)t.texStorage2D(r.TEXTURE_2D,ot,We,me.width,me.height);else{let Ae=me.width,H=me.height;for(let Re=0;Re<ot;Re++)t.texImage2D(r.TEXTURE_2D,Re,We,Ae,H,0,dt,Je,null),Ae>>=1,H>>=1}}else if(nt.length>0&&pt){gt&&Ct&&t.texStorage2D(r.TEXTURE_2D,ot,We,nt[0].width,nt[0].height);for(let Ae=0,H=nt.length;Ae<H;Ae++)ke=nt[Ae],gt?t.texSubImage2D(r.TEXTURE_2D,Ae,0,0,dt,Je,ke):t.texImage2D(r.TEXTURE_2D,Ae,We,dt,Je,ke);A.generateMipmaps=!1}else gt?(Ct&&t.texStorage2D(r.TEXTURE_2D,ot,We,me.width,me.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,dt,Je,me)):t.texImage2D(r.TEXTURE_2D,0,We,dt,Je,me);b(A,pt)&&w(ye),Ge.__version=Se.version,A.onUpdate&&A.onUpdate(A)}N.__version=A.version}function xe(N,A,ne){if(A.image.length!==6)return;const ye=re(N,A),ve=A.source;t.bindTexture(r.TEXTURE_CUBE_MAP,N.__webglTexture,r.TEXTURE0+ne);const Se=s.get(ve);if(ve.version!==Se.__version||ye===!0){t.activeTexture(r.TEXTURE0+ne);const Ge=wt.getPrimaries(wt.workingColorSpace),Le=A.colorSpace===ni?null:wt.getPrimaries(A.colorSpace),Fe=A.colorSpace===ni||Ge===Le?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Fe);const Xe=A.isCompressedTexture||A.image[0].isCompressedTexture,st=A.image[0]&&A.image[0].isDataTexture,me=[];for(let Ae=0;Ae<6;Ae++)!Xe&&!st?me[Ae]=M(A.image[Ae],!1,!0,a.maxCubemapSize):me[Ae]=st?A.image[Ae].image:A.image[Ae],me[Ae]=rt(A,me[Ae]);const pt=me[0],dt=y(pt)||c,Je=l.convert(A.format,A.colorSpace),We=l.convert(A.type),ke=R(A.internalFormat,Je,We,A.colorSpace),nt=c&&A.isVideoTexture!==!0,gt=Se.__version===void 0||ye===!0;let Ct=O(A,pt,dt);j(r.TEXTURE_CUBE_MAP,A,dt);let ot;if(Xe){nt&&gt&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Ct,ke,pt.width,pt.height);for(let Ae=0;Ae<6;Ae++){ot=me[Ae].mipmaps;for(let H=0;H<ot.length;H++){const Re=ot[H];A.format!==mi?Je!==null?nt?t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,H,0,0,Re.width,Re.height,Je,Re.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,H,ke,Re.width,Re.height,0,Re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):nt?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,H,0,0,Re.width,Re.height,Je,We,Re.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,H,ke,Re.width,Re.height,0,Je,We,Re.data)}}}else{ot=A.mipmaps,nt&&gt&&(ot.length>0&&Ct++,t.texStorage2D(r.TEXTURE_CUBE_MAP,Ct,ke,me[0].width,me[0].height));for(let Ae=0;Ae<6;Ae++)if(st){nt?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,0,0,me[Ae].width,me[Ae].height,Je,We,me[Ae].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,ke,me[Ae].width,me[Ae].height,0,Je,We,me[Ae].data);for(let H=0;H<ot.length;H++){const Pe=ot[H].image[Ae].image;nt?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,H+1,0,0,Pe.width,Pe.height,Je,We,Pe.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,H+1,ke,Pe.width,Pe.height,0,Je,We,Pe.data)}}else{nt?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,0,0,Je,We,me[Ae]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,ke,Je,We,me[Ae]);for(let H=0;H<ot.length;H++){const Re=ot[H];nt?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,H+1,0,0,Je,We,Re.image[Ae]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,H+1,ke,Je,We,Re.image[Ae])}}}b(A,dt)&&w(r.TEXTURE_CUBE_MAP),Se.__version=ve.version,A.onUpdate&&A.onUpdate(A)}N.__version=A.version}function ge(N,A,ne,ye,ve,Se){const Ge=l.convert(ne.format,ne.colorSpace),Le=l.convert(ne.type),Fe=R(ne.internalFormat,Ge,Le,ne.colorSpace);if(!s.get(A).__hasExternalTextures){const st=Math.max(1,A.width>>Se),me=Math.max(1,A.height>>Se);ve===r.TEXTURE_3D||ve===r.TEXTURE_2D_ARRAY?t.texImage3D(ve,Se,Fe,st,me,A.depth,0,Ge,Le,null):t.texImage2D(ve,Se,Fe,st,me,0,Ge,Le,null)}t.bindFramebuffer(r.FRAMEBUFFER,N),He(A)?f.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ye,ve,s.get(ne).__webglTexture,0,tt(A)):(ve===r.TEXTURE_2D||ve>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ve<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ye,ve,s.get(ne).__webglTexture,Se),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ee(N,A,ne){if(r.bindRenderbuffer(r.RENDERBUFFER,N),A.depthBuffer&&!A.stencilBuffer){let ye=c===!0?r.DEPTH_COMPONENT24:r.DEPTH_COMPONENT16;if(ne||He(A)){const ve=A.depthTexture;ve&&ve.isDepthTexture&&(ve.type===Tr?ye=r.DEPTH_COMPONENT32F:ve.type===Er&&(ye=r.DEPTH_COMPONENT24));const Se=tt(A);He(A)?f.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Se,ye,A.width,A.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,Se,ye,A.width,A.height)}else r.renderbufferStorage(r.RENDERBUFFER,ye,A.width,A.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,N)}else if(A.depthBuffer&&A.stencilBuffer){const ye=tt(A);ne&&He(A)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,ye,r.DEPTH24_STENCIL8,A.width,A.height):He(A)?f.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ye,r.DEPTH24_STENCIL8,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,N)}else{const ye=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let ve=0;ve<ye.length;ve++){const Se=ye[ve],Ge=l.convert(Se.format,Se.colorSpace),Le=l.convert(Se.type),Fe=R(Se.internalFormat,Ge,Le,Se.colorSpace),Xe=tt(A);ne&&He(A)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Xe,Fe,A.width,A.height):He(A)?f.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Xe,Fe,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,Fe,A.width,A.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function we(N,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,N),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!s.get(A.depthTexture).__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),J(A.depthTexture,0);const ye=s.get(A.depthTexture).__webglTexture,ve=tt(A);if(A.depthTexture.format===is)He(A)?f.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ye,0,ve):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ye,0);else if(A.depthTexture.format===no)He(A)?f.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ye,0,ve):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ye,0);else throw new Error("Unknown depthTexture format")}function Ce(N){const A=s.get(N),ne=N.isWebGLCubeRenderTarget===!0;if(N.depthTexture&&!A.__autoAllocateDepthBuffer){if(ne)throw new Error("target.depthTexture not supported in Cube render targets");we(A.__webglFramebuffer,N)}else if(ne){A.__webglDepthbuffer=[];for(let ye=0;ye<6;ye++)t.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer[ye]),A.__webglDepthbuffer[ye]=r.createRenderbuffer(),Ee(A.__webglDepthbuffer[ye],N,!1)}else t.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer=r.createRenderbuffer(),Ee(A.__webglDepthbuffer,N,!1);t.bindFramebuffer(r.FRAMEBUFFER,null)}function at(N,A,ne){const ye=s.get(N);A!==void 0&&ge(ye.__webglFramebuffer,N,N.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),ne!==void 0&&Ce(N)}function se(N){const A=N.texture,ne=s.get(N),ye=s.get(A);N.addEventListener("dispose",ce),N.isWebGLMultipleRenderTargets!==!0&&(ye.__webglTexture===void 0&&(ye.__webglTexture=r.createTexture()),ye.__version=A.version,d.memory.textures++);const ve=N.isWebGLCubeRenderTarget===!0,Se=N.isWebGLMultipleRenderTargets===!0,Ge=y(N)||c;if(ve){ne.__webglFramebuffer=[];for(let Le=0;Le<6;Le++)if(c&&A.mipmaps&&A.mipmaps.length>0){ne.__webglFramebuffer[Le]=[];for(let Fe=0;Fe<A.mipmaps.length;Fe++)ne.__webglFramebuffer[Le][Fe]=r.createFramebuffer()}else ne.__webglFramebuffer[Le]=r.createFramebuffer()}else{if(c&&A.mipmaps&&A.mipmaps.length>0){ne.__webglFramebuffer=[];for(let Le=0;Le<A.mipmaps.length;Le++)ne.__webglFramebuffer[Le]=r.createFramebuffer()}else ne.__webglFramebuffer=r.createFramebuffer();if(Se)if(a.drawBuffers){const Le=N.texture;for(let Fe=0,Xe=Le.length;Fe<Xe;Fe++){const st=s.get(Le[Fe]);st.__webglTexture===void 0&&(st.__webglTexture=r.createTexture(),d.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(c&&N.samples>0&&He(N)===!1){const Le=Se?A:[A];ne.__webglMultisampledFramebuffer=r.createFramebuffer(),ne.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,ne.__webglMultisampledFramebuffer);for(let Fe=0;Fe<Le.length;Fe++){const Xe=Le[Fe];ne.__webglColorRenderbuffer[Fe]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,ne.__webglColorRenderbuffer[Fe]);const st=l.convert(Xe.format,Xe.colorSpace),me=l.convert(Xe.type),pt=R(Xe.internalFormat,st,me,Xe.colorSpace,N.isXRRenderTarget===!0),dt=tt(N);r.renderbufferStorageMultisample(r.RENDERBUFFER,dt,pt,N.width,N.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Fe,r.RENDERBUFFER,ne.__webglColorRenderbuffer[Fe])}r.bindRenderbuffer(r.RENDERBUFFER,null),N.depthBuffer&&(ne.__webglDepthRenderbuffer=r.createRenderbuffer(),Ee(ne.__webglDepthRenderbuffer,N,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(ve){t.bindTexture(r.TEXTURE_CUBE_MAP,ye.__webglTexture),j(r.TEXTURE_CUBE_MAP,A,Ge);for(let Le=0;Le<6;Le++)if(c&&A.mipmaps&&A.mipmaps.length>0)for(let Fe=0;Fe<A.mipmaps.length;Fe++)ge(ne.__webglFramebuffer[Le][Fe],N,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Le,Fe);else ge(ne.__webglFramebuffer[Le],N,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0);b(A,Ge)&&w(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Se){const Le=N.texture;for(let Fe=0,Xe=Le.length;Fe<Xe;Fe++){const st=Le[Fe],me=s.get(st);t.bindTexture(r.TEXTURE_2D,me.__webglTexture),j(r.TEXTURE_2D,st,Ge),ge(ne.__webglFramebuffer,N,st,r.COLOR_ATTACHMENT0+Fe,r.TEXTURE_2D,0),b(st,Ge)&&w(r.TEXTURE_2D)}t.unbindTexture()}else{let Le=r.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(c?Le=N.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(Le,ye.__webglTexture),j(Le,A,Ge),c&&A.mipmaps&&A.mipmaps.length>0)for(let Fe=0;Fe<A.mipmaps.length;Fe++)ge(ne.__webglFramebuffer[Fe],N,A,r.COLOR_ATTACHMENT0,Le,Fe);else ge(ne.__webglFramebuffer,N,A,r.COLOR_ATTACHMENT0,Le,0);b(A,Ge)&&w(Le),t.unbindTexture()}N.depthBuffer&&Ce(N)}function Vt(N){const A=y(N)||c,ne=N.isWebGLMultipleRenderTargets===!0?N.texture:[N.texture];for(let ye=0,ve=ne.length;ye<ve;ye++){const Se=ne[ye];if(b(Se,A)){const Ge=N.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,Le=s.get(Se).__webglTexture;t.bindTexture(Ge,Le),w(Ge),t.unbindTexture()}}}function je(N){if(c&&N.samples>0&&He(N)===!1){const A=N.isWebGLMultipleRenderTargets?N.texture:[N.texture],ne=N.width,ye=N.height;let ve=r.COLOR_BUFFER_BIT;const Se=[],Ge=N.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Le=s.get(N),Fe=N.isWebGLMultipleRenderTargets===!0;if(Fe)for(let Xe=0;Xe<A.length;Xe++)t.bindFramebuffer(r.FRAMEBUFFER,Le.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Xe,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,Le.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Xe,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,Le.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Le.__webglFramebuffer);for(let Xe=0;Xe<A.length;Xe++){Se.push(r.COLOR_ATTACHMENT0+Xe),N.depthBuffer&&Se.push(Ge);const st=Le.__ignoreDepthValues!==void 0?Le.__ignoreDepthValues:!1;if(st===!1&&(N.depthBuffer&&(ve|=r.DEPTH_BUFFER_BIT),N.stencilBuffer&&(ve|=r.STENCIL_BUFFER_BIT)),Fe&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Le.__webglColorRenderbuffer[Xe]),st===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[Ge]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[Ge])),Fe){const me=s.get(A[Xe]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,me,0)}r.blitFramebuffer(0,0,ne,ye,0,0,ne,ye,ve,r.NEAREST),p&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Se)}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),Fe)for(let Xe=0;Xe<A.length;Xe++){t.bindFramebuffer(r.FRAMEBUFFER,Le.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Xe,r.RENDERBUFFER,Le.__webglColorRenderbuffer[Xe]);const st=s.get(A[Xe]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,Le.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Xe,r.TEXTURE_2D,st,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Le.__webglMultisampledFramebuffer)}}function tt(N){return Math.min(a.maxSamples,N.samples)}function He(N){const A=s.get(N);return c&&N.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function At(N){const A=d.render.frame;m.get(N)!==A&&(m.set(N,A),N.update())}function rt(N,A){const ne=N.colorSpace,ye=N.format,ve=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||N.format===bd||ne!==Yi&&ne!==ni&&(wt.getTransfer(ne)===Dt?c===!1?e.has("EXT_sRGB")===!0&&ye===mi?(N.format=bd,N.minFilter=ei,N.generateMipmaps=!1):A=Ug.sRGBToLinear(A):(ye!==mi||ve!==Cr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",ne)),A}this.allocateTextureUnit=k,this.resetTextureUnits=de,this.setTexture2D=J,this.setTexture2DArray=Z,this.setTexture3D=V,this.setTextureCube=Q,this.rebindTextures=at,this.setupRenderTarget=se,this.updateRenderTargetMipmap=Vt,this.updateMultisampleRenderTarget=je,this.setupDepthRenderbuffer=Ce,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=He}function _T(r,e,t){const s=t.isWebGL2;function a(l,d=ni){let c;const f=wt.getTransfer(d);if(l===Cr)return r.UNSIGNED_BYTE;if(l===wg)return r.UNSIGNED_SHORT_4_4_4_4;if(l===Ag)return r.UNSIGNED_SHORT_5_5_5_1;if(l===Jx)return r.BYTE;if(l===ey)return r.SHORT;if(l===kd)return r.UNSIGNED_SHORT;if(l===Tg)return r.INT;if(l===Er)return r.UNSIGNED_INT;if(l===Tr)return r.FLOAT;if(l===ta)return s?r.HALF_FLOAT:(c=e.get("OES_texture_half_float"),c!==null?c.HALF_FLOAT_OES:null);if(l===ty)return r.ALPHA;if(l===mi)return r.RGBA;if(l===ny)return r.LUMINANCE;if(l===iy)return r.LUMINANCE_ALPHA;if(l===is)return r.DEPTH_COMPONENT;if(l===no)return r.DEPTH_STENCIL;if(l===bd)return c=e.get("EXT_sRGB"),c!==null?c.SRGB_ALPHA_EXT:null;if(l===ry)return r.RED;if(l===Cg)return r.RED_INTEGER;if(l===sy)return r.RG;if(l===Rg)return r.RG_INTEGER;if(l===bg)return r.RGBA_INTEGER;if(l===Wc||l===jc||l===Xc||l===Yc)if(f===Dt)if(c=e.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(l===Wc)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(l===jc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(l===Xc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(l===Yc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=e.get("WEBGL_compressed_texture_s3tc"),c!==null){if(l===Wc)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(l===jc)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(l===Xc)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(l===Yc)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(l===Vp||l===Wp||l===jp||l===Xp)if(c=e.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(l===Vp)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(l===Wp)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(l===jp)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(l===Xp)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(l===Pg)return c=e.get("WEBGL_compressed_texture_etc1"),c!==null?c.COMPRESSED_RGB_ETC1_WEBGL:null;if(l===Yp||l===qp)if(c=e.get("WEBGL_compressed_texture_etc"),c!==null){if(l===Yp)return f===Dt?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(l===qp)return f===Dt?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(l===$p||l===Kp||l===Zp||l===Qp||l===Jp||l===em||l===tm||l===nm||l===im||l===rm||l===sm||l===om||l===am||l===lm)if(c=e.get("WEBGL_compressed_texture_astc"),c!==null){if(l===$p)return f===Dt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(l===Kp)return f===Dt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(l===Zp)return f===Dt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(l===Qp)return f===Dt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(l===Jp)return f===Dt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(l===em)return f===Dt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(l===tm)return f===Dt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(l===nm)return f===Dt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(l===im)return f===Dt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(l===rm)return f===Dt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(l===sm)return f===Dt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(l===om)return f===Dt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(l===am)return f===Dt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(l===lm)return f===Dt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(l===qc||l===um||l===cm)if(c=e.get("EXT_texture_compression_bptc"),c!==null){if(l===qc)return f===Dt?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(l===um)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(l===cm)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(l===oy||l===dm||l===fm||l===hm)if(c=e.get("EXT_texture_compression_rgtc"),c!==null){if(l===qc)return c.COMPRESSED_RED_RGTC1_EXT;if(l===dm)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(l===fm)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(l===hm)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return l===ns?s?r.UNSIGNED_INT_24_8:(c=e.get("WEBGL_depth_texture"),c!==null?c.UNSIGNED_INT_24_8_WEBGL:null):r[l]!==void 0?r[l]:null}return{convert:a}}class xT extends ti{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class zl extends un{constructor(){super(),this.isGroup=!0,this.type="Group"}}const yT={type:"move"};class xd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new zl,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new zl,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new le,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new le),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new zl,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new le,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new le),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const s of e.hand.values())this._getHandJoint(t,s)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,s){let a=null,l=null,d=null;const c=this._targetRay,f=this._grip,p=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(p&&e.hand){d=!0;for(const M of e.hand.values()){const y=t.getJointPose(M,s),x=this._getHandJoint(p,M);y!==null&&(x.matrix.fromArray(y.transform.matrix),x.matrix.decompose(x.position,x.rotation,x.scale),x.matrixWorldNeedsUpdate=!0,x.jointRadius=y.radius),x.visible=y!==null}const m=p.joints["index-finger-tip"],g=p.joints["thumb-tip"],_=m.position.distanceTo(g.position),S=.02,T=.005;p.inputState.pinching&&_>S+T?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!p.inputState.pinching&&_<=S-T&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else f!==null&&e.gripSpace&&(l=t.getPose(e.gripSpace,s),l!==null&&(f.matrix.fromArray(l.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,l.linearVelocity?(f.hasLinearVelocity=!0,f.linearVelocity.copy(l.linearVelocity)):f.hasLinearVelocity=!1,l.angularVelocity?(f.hasAngularVelocity=!0,f.angularVelocity.copy(l.angularVelocity)):f.hasAngularVelocity=!1));c!==null&&(a=t.getPose(e.targetRaySpace,s),a===null&&l!==null&&(a=l),a!==null&&(c.matrix.fromArray(a.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,a.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(a.linearVelocity)):c.hasLinearVelocity=!1,a.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(a.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(yT)))}return c!==null&&(c.visible=a!==null),f!==null&&(f.visible=l!==null),p!==null&&(p.visible=d!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const s=new zl;s.matrixAutoUpdate=!1,s.visible=!1,e.joints[t.jointName]=s,e.add(s)}return e.joints[t.jointName]}}class ST extends so{constructor(e,t){super();const s=this;let a=null,l=1,d=null,c="local-floor",f=1,p=null,m=null,g=null,_=null,S=null,T=null;const M=t.getContextAttributes();let y=null,x=null;const b=[],w=[],R=new St;let O=null;const I=new ti;I.layers.enable(1),I.viewport=new sn;const U=new ti;U.layers.enable(2),U.viewport=new sn;const ce=[I,U],C=new xT;C.layers.enable(1),C.layers.enable(2);let D=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let re=b[j];return re===void 0&&(re=new xd,b[j]=re),re.getTargetRaySpace()},this.getControllerGrip=function(j){let re=b[j];return re===void 0&&(re=new xd,b[j]=re),re.getGripSpace()},this.getHand=function(j){let re=b[j];return re===void 0&&(re=new xd,b[j]=re),re.getHandSpace()};function te(j){const re=w.indexOf(j.inputSource);if(re===-1)return;const fe=b[re];fe!==void 0&&(fe.update(j.inputSource,j.frame,p||d),fe.dispatchEvent({type:j.type,data:j.inputSource}))}function de(){a.removeEventListener("select",te),a.removeEventListener("selectstart",te),a.removeEventListener("selectend",te),a.removeEventListener("squeeze",te),a.removeEventListener("squeezestart",te),a.removeEventListener("squeezeend",te),a.removeEventListener("end",de),a.removeEventListener("inputsourceschange",k);for(let j=0;j<b.length;j++){const re=w[j];re!==null&&(w[j]=null,b[j].disconnect(re))}D=null,Y=null,e.setRenderTarget(y),S=null,_=null,g=null,a=null,x=null,G.stop(),s.isPresenting=!1,e.setPixelRatio(O),e.setSize(R.width,R.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){l=j,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){c=j,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||d},this.setReferenceSpace=function(j){p=j},this.getBaseLayer=function(){return _!==null?_:S},this.getBinding=function(){return g},this.getFrame=function(){return T},this.getSession=function(){return a},this.setSession=async function(j){if(a=j,a!==null){if(y=e.getRenderTarget(),a.addEventListener("select",te),a.addEventListener("selectstart",te),a.addEventListener("selectend",te),a.addEventListener("squeeze",te),a.addEventListener("squeezestart",te),a.addEventListener("squeezeend",te),a.addEventListener("end",de),a.addEventListener("inputsourceschange",k),M.xrCompatible!==!0&&await t.makeXRCompatible(),O=e.getPixelRatio(),e.getSize(R),a.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const re={antialias:a.renderState.layers===void 0?M.antialias:!0,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:l};S=new XRWebGLLayer(a,t,re),a.updateRenderState({baseLayer:S}),e.setPixelRatio(1),e.setSize(S.framebufferWidth,S.framebufferHeight,!1),x=new ss(S.framebufferWidth,S.framebufferHeight,{format:mi,type:Cr,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil})}else{let re=null,fe=null,xe=null;M.depth&&(xe=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,re=M.stencil?no:is,fe=M.stencil?ns:Er);const ge={colorFormat:t.RGBA8,depthFormat:xe,scaleFactor:l};g=new XRWebGLBinding(a,t),_=g.createProjectionLayer(ge),a.updateRenderState({layers:[_]}),e.setPixelRatio(1),e.setSize(_.textureWidth,_.textureHeight,!1),x=new ss(_.textureWidth,_.textureHeight,{format:mi,type:Cr,depthTexture:new qg(_.textureWidth,_.textureHeight,fe,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0});const Ee=e.properties.get(x);Ee.__ignoreDepthValues=_.ignoreDepthValues}x.isXRRenderTarget=!0,this.setFoveation(f),p=null,d=await a.requestReferenceSpace(c),G.setContext(a),G.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode};function k(j){for(let re=0;re<j.removed.length;re++){const fe=j.removed[re],xe=w.indexOf(fe);xe>=0&&(w[xe]=null,b[xe].disconnect(fe))}for(let re=0;re<j.added.length;re++){const fe=j.added[re];let xe=w.indexOf(fe);if(xe===-1){for(let Ee=0;Ee<b.length;Ee++)if(Ee>=w.length){w.push(fe),xe=Ee;break}else if(w[Ee]===null){w[Ee]=fe,xe=Ee;break}if(xe===-1)break}const ge=b[xe];ge&&ge.connect(fe)}}const K=new le,J=new le;function Z(j,re,fe){K.setFromMatrixPosition(re.matrixWorld),J.setFromMatrixPosition(fe.matrixWorld);const xe=K.distanceTo(J),ge=re.projectionMatrix.elements,Ee=fe.projectionMatrix.elements,we=ge[14]/(ge[10]-1),Ce=ge[14]/(ge[10]+1),at=(ge[9]+1)/ge[5],se=(ge[9]-1)/ge[5],Vt=(ge[8]-1)/ge[0],je=(Ee[8]+1)/Ee[0],tt=we*Vt,He=we*je,At=xe/(-Vt+je),rt=At*-Vt;re.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(rt),j.translateZ(At),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert();const N=we+At,A=Ce+At,ne=tt-rt,ye=He+(xe-rt),ve=at*Ce/A*N,Se=se*Ce/A*N;j.projectionMatrix.makePerspective(ne,ye,ve,Se,N,A),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}function V(j,re){re===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(re.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(a===null)return;C.near=U.near=I.near=j.near,C.far=U.far=I.far=j.far,(D!==C.near||Y!==C.far)&&(a.updateRenderState({depthNear:C.near,depthFar:C.far}),D=C.near,Y=C.far);const re=j.parent,fe=C.cameras;V(C,re);for(let xe=0;xe<fe.length;xe++)V(fe[xe],re);fe.length===2?Z(C,I,U):C.projectionMatrix.copy(I.projectionMatrix),Q(j,C,re)};function Q(j,re,fe){fe===null?j.matrix.copy(re.matrixWorld):(j.matrix.copy(fe.matrixWorld),j.matrix.invert(),j.matrix.multiply(re.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(re.projectionMatrix),j.projectionMatrixInverse.copy(re.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Pd*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return C},this.getFoveation=function(){if(!(_===null&&S===null))return f},this.setFoveation=function(j){f=j,_!==null&&(_.fixedFoveation=j),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=j)};let z=null;function L(j,re){if(m=re.getViewerPose(p||d),T=re,m!==null){const fe=m.views;S!==null&&(e.setRenderTargetFramebuffer(x,S.framebuffer),e.setRenderTarget(x));let xe=!1;fe.length!==C.cameras.length&&(C.cameras.length=0,xe=!0);for(let ge=0;ge<fe.length;ge++){const Ee=fe[ge];let we=null;if(S!==null)we=S.getViewport(Ee);else{const at=g.getViewSubImage(_,Ee);we=at.viewport,ge===0&&(e.setRenderTargetTextures(x,at.colorTexture,_.ignoreDepthValues?void 0:at.depthStencilTexture),e.setRenderTarget(x))}let Ce=ce[ge];Ce===void 0&&(Ce=new ti,Ce.layers.enable(ge),Ce.viewport=new sn,ce[ge]=Ce),Ce.matrix.fromArray(Ee.transform.matrix),Ce.matrix.decompose(Ce.position,Ce.quaternion,Ce.scale),Ce.projectionMatrix.fromArray(Ee.projectionMatrix),Ce.projectionMatrixInverse.copy(Ce.projectionMatrix).invert(),Ce.viewport.set(we.x,we.y,we.width,we.height),ge===0&&(C.matrix.copy(Ce.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale)),xe===!0&&C.cameras.push(Ce)}}for(let fe=0;fe<b.length;fe++){const xe=w[fe],ge=b[fe];xe!==null&&ge!==void 0&&ge.update(xe,re,p||d)}z&&z(j,re),re.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:re}),T=null}const G=new Xg;G.setAnimationLoop(L),this.setAnimationLoop=function(j){z=j},this.dispose=function(){}}}function MT(r,e){function t(y,x){y.matrixAutoUpdate===!0&&y.updateMatrix(),x.value.copy(y.matrix)}function s(y,x){x.color.getRGB(y.fogColor.value,Vg(r)),x.isFog?(y.fogNear.value=x.near,y.fogFar.value=x.far):x.isFogExp2&&(y.fogDensity.value=x.density)}function a(y,x,b,w,R){x.isMeshBasicMaterial||x.isMeshLambertMaterial?l(y,x):x.isMeshToonMaterial?(l(y,x),g(y,x)):x.isMeshPhongMaterial?(l(y,x),m(y,x)):x.isMeshStandardMaterial?(l(y,x),_(y,x),x.isMeshPhysicalMaterial&&S(y,x,R)):x.isMeshMatcapMaterial?(l(y,x),T(y,x)):x.isMeshDepthMaterial?l(y,x):x.isMeshDistanceMaterial?(l(y,x),M(y,x)):x.isMeshNormalMaterial?l(y,x):x.isLineBasicMaterial?(d(y,x),x.isLineDashedMaterial&&c(y,x)):x.isPointsMaterial?f(y,x,b,w):x.isSpriteMaterial?p(y,x):x.isShadowMaterial?(y.color.value.copy(x.color),y.opacity.value=x.opacity):x.isShaderMaterial&&(x.uniformsNeedUpdate=!1)}function l(y,x){y.opacity.value=x.opacity,x.color&&y.diffuse.value.copy(x.color),x.emissive&&y.emissive.value.copy(x.emissive).multiplyScalar(x.emissiveIntensity),x.map&&(y.map.value=x.map,t(x.map,y.mapTransform)),x.alphaMap&&(y.alphaMap.value=x.alphaMap,t(x.alphaMap,y.alphaMapTransform)),x.bumpMap&&(y.bumpMap.value=x.bumpMap,t(x.bumpMap,y.bumpMapTransform),y.bumpScale.value=x.bumpScale,x.side===On&&(y.bumpScale.value*=-1)),x.normalMap&&(y.normalMap.value=x.normalMap,t(x.normalMap,y.normalMapTransform),y.normalScale.value.copy(x.normalScale),x.side===On&&y.normalScale.value.negate()),x.displacementMap&&(y.displacementMap.value=x.displacementMap,t(x.displacementMap,y.displacementMapTransform),y.displacementScale.value=x.displacementScale,y.displacementBias.value=x.displacementBias),x.emissiveMap&&(y.emissiveMap.value=x.emissiveMap,t(x.emissiveMap,y.emissiveMapTransform)),x.specularMap&&(y.specularMap.value=x.specularMap,t(x.specularMap,y.specularMapTransform)),x.alphaTest>0&&(y.alphaTest.value=x.alphaTest);const b=e.get(x).envMap;if(b&&(y.envMap.value=b,y.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,y.reflectivity.value=x.reflectivity,y.ior.value=x.ior,y.refractionRatio.value=x.refractionRatio),x.lightMap){y.lightMap.value=x.lightMap;const w=r._useLegacyLights===!0?Math.PI:1;y.lightMapIntensity.value=x.lightMapIntensity*w,t(x.lightMap,y.lightMapTransform)}x.aoMap&&(y.aoMap.value=x.aoMap,y.aoMapIntensity.value=x.aoMapIntensity,t(x.aoMap,y.aoMapTransform))}function d(y,x){y.diffuse.value.copy(x.color),y.opacity.value=x.opacity,x.map&&(y.map.value=x.map,t(x.map,y.mapTransform))}function c(y,x){y.dashSize.value=x.dashSize,y.totalSize.value=x.dashSize+x.gapSize,y.scale.value=x.scale}function f(y,x,b,w){y.diffuse.value.copy(x.color),y.opacity.value=x.opacity,y.size.value=x.size*b,y.scale.value=w*.5,x.map&&(y.map.value=x.map,t(x.map,y.uvTransform)),x.alphaMap&&(y.alphaMap.value=x.alphaMap,t(x.alphaMap,y.alphaMapTransform)),x.alphaTest>0&&(y.alphaTest.value=x.alphaTest)}function p(y,x){y.diffuse.value.copy(x.color),y.opacity.value=x.opacity,y.rotation.value=x.rotation,x.map&&(y.map.value=x.map,t(x.map,y.mapTransform)),x.alphaMap&&(y.alphaMap.value=x.alphaMap,t(x.alphaMap,y.alphaMapTransform)),x.alphaTest>0&&(y.alphaTest.value=x.alphaTest)}function m(y,x){y.specular.value.copy(x.specular),y.shininess.value=Math.max(x.shininess,1e-4)}function g(y,x){x.gradientMap&&(y.gradientMap.value=x.gradientMap)}function _(y,x){y.metalness.value=x.metalness,x.metalnessMap&&(y.metalnessMap.value=x.metalnessMap,t(x.metalnessMap,y.metalnessMapTransform)),y.roughness.value=x.roughness,x.roughnessMap&&(y.roughnessMap.value=x.roughnessMap,t(x.roughnessMap,y.roughnessMapTransform)),e.get(x).envMap&&(y.envMapIntensity.value=x.envMapIntensity)}function S(y,x,b){y.ior.value=x.ior,x.sheen>0&&(y.sheenColor.value.copy(x.sheenColor).multiplyScalar(x.sheen),y.sheenRoughness.value=x.sheenRoughness,x.sheenColorMap&&(y.sheenColorMap.value=x.sheenColorMap,t(x.sheenColorMap,y.sheenColorMapTransform)),x.sheenRoughnessMap&&(y.sheenRoughnessMap.value=x.sheenRoughnessMap,t(x.sheenRoughnessMap,y.sheenRoughnessMapTransform))),x.clearcoat>0&&(y.clearcoat.value=x.clearcoat,y.clearcoatRoughness.value=x.clearcoatRoughness,x.clearcoatMap&&(y.clearcoatMap.value=x.clearcoatMap,t(x.clearcoatMap,y.clearcoatMapTransform)),x.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=x.clearcoatRoughnessMap,t(x.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),x.clearcoatNormalMap&&(y.clearcoatNormalMap.value=x.clearcoatNormalMap,t(x.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(x.clearcoatNormalScale),x.side===On&&y.clearcoatNormalScale.value.negate())),x.iridescence>0&&(y.iridescence.value=x.iridescence,y.iridescenceIOR.value=x.iridescenceIOR,y.iridescenceThicknessMinimum.value=x.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=x.iridescenceThicknessRange[1],x.iridescenceMap&&(y.iridescenceMap.value=x.iridescenceMap,t(x.iridescenceMap,y.iridescenceMapTransform)),x.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=x.iridescenceThicknessMap,t(x.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),x.transmission>0&&(y.transmission.value=x.transmission,y.transmissionSamplerMap.value=b.texture,y.transmissionSamplerSize.value.set(b.width,b.height),x.transmissionMap&&(y.transmissionMap.value=x.transmissionMap,t(x.transmissionMap,y.transmissionMapTransform)),y.thickness.value=x.thickness,x.thicknessMap&&(y.thicknessMap.value=x.thicknessMap,t(x.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=x.attenuationDistance,y.attenuationColor.value.copy(x.attenuationColor)),x.anisotropy>0&&(y.anisotropyVector.value.set(x.anisotropy*Math.cos(x.anisotropyRotation),x.anisotropy*Math.sin(x.anisotropyRotation)),x.anisotropyMap&&(y.anisotropyMap.value=x.anisotropyMap,t(x.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=x.specularIntensity,y.specularColor.value.copy(x.specularColor),x.specularColorMap&&(y.specularColorMap.value=x.specularColorMap,t(x.specularColorMap,y.specularColorMapTransform)),x.specularIntensityMap&&(y.specularIntensityMap.value=x.specularIntensityMap,t(x.specularIntensityMap,y.specularIntensityMapTransform))}function T(y,x){x.matcap&&(y.matcap.value=x.matcap)}function M(y,x){const b=e.get(x).light;y.referencePosition.value.setFromMatrixPosition(b.matrixWorld),y.nearDistance.value=b.shadow.camera.near,y.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:a}}function ET(r,e,t,s){let a={},l={},d=[];const c=t.isWebGL2?r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS):0;function f(b,w){const R=w.program;s.uniformBlockBinding(b,R)}function p(b,w){let R=a[b.id];R===void 0&&(T(b),R=m(b),a[b.id]=R,b.addEventListener("dispose",y));const O=w.program;s.updateUBOMapping(b,O);const I=e.render.frame;l[b.id]!==I&&(_(b),l[b.id]=I)}function m(b){const w=g();b.__bindingPointIndex=w;const R=r.createBuffer(),O=b.__size,I=b.usage;return r.bindBuffer(r.UNIFORM_BUFFER,R),r.bufferData(r.UNIFORM_BUFFER,O,I),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,w,R),R}function g(){for(let b=0;b<c;b++)if(d.indexOf(b)===-1)return d.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function _(b){const w=a[b.id],R=b.uniforms,O=b.__cache;r.bindBuffer(r.UNIFORM_BUFFER,w);for(let I=0,U=R.length;I<U;I++){const ce=Array.isArray(R[I])?R[I]:[R[I]];for(let C=0,D=ce.length;C<D;C++){const Y=ce[C];if(S(Y,I,C,O)===!0){const te=Y.__offset,de=Array.isArray(Y.value)?Y.value:[Y.value];let k=0;for(let K=0;K<de.length;K++){const J=de[K],Z=M(J);typeof J=="number"||typeof J=="boolean"?(Y.__data[0]=J,r.bufferSubData(r.UNIFORM_BUFFER,te+k,Y.__data)):J.isMatrix3?(Y.__data[0]=J.elements[0],Y.__data[1]=J.elements[1],Y.__data[2]=J.elements[2],Y.__data[3]=0,Y.__data[4]=J.elements[3],Y.__data[5]=J.elements[4],Y.__data[6]=J.elements[5],Y.__data[7]=0,Y.__data[8]=J.elements[6],Y.__data[9]=J.elements[7],Y.__data[10]=J.elements[8],Y.__data[11]=0):(J.toArray(Y.__data,k),k+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,te,Y.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function S(b,w,R,O){const I=b.value,U=w+"_"+R;if(O[U]===void 0)return typeof I=="number"||typeof I=="boolean"?O[U]=I:O[U]=I.clone(),!0;{const ce=O[U];if(typeof I=="number"||typeof I=="boolean"){if(ce!==I)return O[U]=I,!0}else if(ce.equals(I)===!1)return ce.copy(I),!0}return!1}function T(b){const w=b.uniforms;let R=0;const O=16;for(let U=0,ce=w.length;U<ce;U++){const C=Array.isArray(w[U])?w[U]:[w[U]];for(let D=0,Y=C.length;D<Y;D++){const te=C[D],de=Array.isArray(te.value)?te.value:[te.value];for(let k=0,K=de.length;k<K;k++){const J=de[k],Z=M(J),V=R%O;V!==0&&O-V<Z.boundary&&(R+=O-V),te.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),te.__offset=R,R+=Z.storage}}}const I=R%O;return I>0&&(R+=O-I),b.__size=R,b.__cache={},this}function M(b){const w={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(w.boundary=4,w.storage=4):b.isVector2?(w.boundary=8,w.storage=8):b.isVector3||b.isColor?(w.boundary=16,w.storage=12):b.isVector4?(w.boundary=16,w.storage=16):b.isMatrix3?(w.boundary=48,w.storage=48):b.isMatrix4?(w.boundary=64,w.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),w}function y(b){const w=b.target;w.removeEventListener("dispose",y);const R=d.indexOf(w.__bindingPointIndex);d.splice(R,1),r.deleteBuffer(a[w.id]),delete a[w.id],delete l[w.id]}function x(){for(const b in a)r.deleteBuffer(a[b]);d=[],a={},l={}}return{bind:f,update:p,dispose:x}}class e0{constructor(e={}){const{canvas:t=_y(),context:s=null,depth:a=!0,stencil:l=!0,alpha:d=!1,antialias:c=!1,premultipliedAlpha:f=!0,preserveDrawingBuffer:p=!1,powerPreference:m="default",failIfMajorPerformanceCaveat:g=!1}=e;this.isWebGLRenderer=!0;let _;s!==null?_=s.getContextAttributes().alpha:_=d;const S=new Uint32Array(4),T=new Int32Array(4);let M=null,y=null;const x=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ln,this._useLegacyLights=!1,this.toneMapping=Ar,this.toneMappingExposure=1;const w=this;let R=!1,O=0,I=0,U=null,ce=-1,C=null;const D=new sn,Y=new sn;let te=null;const de=new yt(0);let k=0,K=t.width,J=t.height,Z=1,V=null,Q=null;const z=new sn(0,0,K,J),L=new sn(0,0,K,J);let G=!1;const j=new Hd;let re=!1,fe=!1,xe=null;const ge=new Kt,Ee=new St,we=new le,Ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function at(){return U===null?Z:1}let se=s;function Vt(P,$){for(let ae=0;ae<P.length;ae++){const ue=P[ae],oe=t.getContext(ue,$);if(oe!==null)return oe}return null}try{const P={alpha:!0,depth:a,stencil:l,antialias:c,premultipliedAlpha:f,preserveDrawingBuffer:p,powerPreference:m,failIfMajorPerformanceCaveat:g};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Od}`),t.addEventListener("webglcontextlost",Ae,!1),t.addEventListener("webglcontextrestored",H,!1),t.addEventListener("webglcontextcreationerror",Re,!1),se===null){const $=["webgl2","webgl","experimental-webgl"];if(w.isWebGL1Renderer===!0&&$.shift(),se=Vt($,P),se===null)throw Vt($)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&se instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),se.getShaderPrecisionFormat===void 0&&(se.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(P){throw console.error("THREE.WebGLRenderer: "+P.message),P}let je,tt,He,At,rt,N,A,ne,ye,ve,Se,Ge,Le,Fe,Xe,st,me,pt,dt,Je,We,ke,nt,gt;function Ct(){je=new IE(se),tt=new CE(se,je,e),je.init(tt),ke=new _T(se,je,tt),He=new gT(se,je,tt),At=new FE(se),rt=new nT,N=new vT(se,je,He,rt,tt,ke,At),A=new bE(w),ne=new DE(w),ye=new Wy(se,tt),nt=new wE(se,je,ye,tt),ve=new NE(se,ye,At,nt),Se=new zE(se,ve,ye,At),dt=new BE(se,tt,N),st=new RE(rt),Ge=new tT(w,A,ne,je,tt,nt,st),Le=new MT(w,rt),Fe=new rT,Xe=new cT(je,tt),pt=new TE(w,A,ne,He,Se,_,f),me=new mT(w,Se,tt),gt=new ET(se,At,tt,He),Je=new AE(se,je,At,tt),We=new UE(se,je,At,tt),At.programs=Ge.programs,w.capabilities=tt,w.extensions=je,w.properties=rt,w.renderLists=Fe,w.shadowMap=me,w.state=He,w.info=At}Ct();const ot=new ST(w,se);this.xr=ot,this.getContext=function(){return se},this.getContextAttributes=function(){return se.getContextAttributes()},this.forceContextLoss=function(){const P=je.get("WEBGL_lose_context");P&&P.loseContext()},this.forceContextRestore=function(){const P=je.get("WEBGL_lose_context");P&&P.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(P){P!==void 0&&(Z=P,this.setSize(K,J,!1))},this.getSize=function(P){return P.set(K,J)},this.setSize=function(P,$,ae=!0){if(ot.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}K=P,J=$,t.width=Math.floor(P*Z),t.height=Math.floor($*Z),ae===!0&&(t.style.width=P+"px",t.style.height=$+"px"),this.setViewport(0,0,P,$)},this.getDrawingBufferSize=function(P){return P.set(K*Z,J*Z).floor()},this.setDrawingBufferSize=function(P,$,ae){K=P,J=$,Z=ae,t.width=Math.floor(P*ae),t.height=Math.floor($*ae),this.setViewport(0,0,P,$)},this.getCurrentViewport=function(P){return P.copy(D)},this.getViewport=function(P){return P.copy(z)},this.setViewport=function(P,$,ae,ue){P.isVector4?z.set(P.x,P.y,P.z,P.w):z.set(P,$,ae,ue),He.viewport(D.copy(z).multiplyScalar(Z).floor())},this.getScissor=function(P){return P.copy(L)},this.setScissor=function(P,$,ae,ue){P.isVector4?L.set(P.x,P.y,P.z,P.w):L.set(P,$,ae,ue),He.scissor(Y.copy(L).multiplyScalar(Z).floor())},this.getScissorTest=function(){return G},this.setScissorTest=function(P){He.setScissorTest(G=P)},this.setOpaqueSort=function(P){V=P},this.setTransparentSort=function(P){Q=P},this.getClearColor=function(P){return P.copy(pt.getClearColor())},this.setClearColor=function(){pt.setClearColor.apply(pt,arguments)},this.getClearAlpha=function(){return pt.getClearAlpha()},this.setClearAlpha=function(){pt.setClearAlpha.apply(pt,arguments)},this.clear=function(P=!0,$=!0,ae=!0){let ue=0;if(P){let oe=!1;if(U!==null){const De=U.texture.format;oe=De===bg||De===Rg||De===Cg}if(oe){const De=U.texture.type,Ve=De===Cr||De===Er||De===kd||De===ns||De===wg||De===Ag,Ke=pt.getClearColor(),Ne=pt.getClearAlpha(),lt=Ke.r,et=Ke.g,it=Ke.b;Ve?(S[0]=lt,S[1]=et,S[2]=it,S[3]=Ne,se.clearBufferuiv(se.COLOR,0,S)):(T[0]=lt,T[1]=et,T[2]=it,T[3]=Ne,se.clearBufferiv(se.COLOR,0,T))}else ue|=se.COLOR_BUFFER_BIT}$&&(ue|=se.DEPTH_BUFFER_BIT),ae&&(ue|=se.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),se.clear(ue)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ae,!1),t.removeEventListener("webglcontextrestored",H,!1),t.removeEventListener("webglcontextcreationerror",Re,!1),Fe.dispose(),Xe.dispose(),rt.dispose(),A.dispose(),ne.dispose(),Se.dispose(),nt.dispose(),gt.dispose(),Ge.dispose(),ot.dispose(),ot.removeEventListener("sessionstart",Jt),ot.removeEventListener("sessionend",_t),xe&&(xe.dispose(),xe=null),Yt.stop()};function Ae(P){P.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function H(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const P=At.autoReset,$=me.enabled,ae=me.autoUpdate,ue=me.needsUpdate,oe=me.type;Ct(),At.autoReset=P,me.enabled=$,me.autoUpdate=ae,me.needsUpdate=ue,me.type=oe}function Re(P){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function Pe(P){const $=P.target;$.removeEventListener("dispose",Pe),Ze($)}function Ze(P){Ye(P),rt.remove(P)}function Ye(P){const $=rt.get(P).programs;$!==void 0&&($.forEach(function(ae){Ge.releaseProgram(ae)}),P.isShaderMaterial&&Ge.releaseShaderCache(P))}this.renderBufferDirect=function(P,$,ae,ue,oe,De){$===null&&($=Ce);const Ve=oe.isMesh&&oe.matrixWorld.determinant()<0,Ke=tu(P,$,ae,ue,oe);He.setMaterial(ue,Ve);let Ne=ae.index,lt=1;if(ue.wireframe===!0){if(Ne=ve.getWireframeAttribute(ae),Ne===void 0)return;lt=2}const et=ae.drawRange,it=ae.attributes.position;let Rt=et.start*lt,xn=(et.start+et.count)*lt;De!==null&&(Rt=Math.max(Rt,De.start*lt),xn=Math.min(xn,(De.start+De.count)*lt)),Ne!==null?(Rt=Math.max(Rt,0),xn=Math.min(xn,Ne.count)):it!=null&&(Rt=Math.max(Rt,0),xn=Math.min(xn,it.count));const zt=xn-Rt;if(zt<0||zt===1/0)return;nt.setup(oe,ue,Ke,ae,Ne);let wn,mt=Je;if(Ne!==null&&(wn=ye.get(Ne),mt=We,mt.setIndex(wn)),oe.isMesh)ue.wireframe===!0?(He.setLineWidth(ue.wireframeLinewidth*at()),mt.setMode(se.LINES)):mt.setMode(se.TRIANGLES);else if(oe.isLine){let ut=ue.linewidth;ut===void 0&&(ut=1),He.setLineWidth(ut*at()),oe.isLineSegments?mt.setMode(se.LINES):oe.isLineLoop?mt.setMode(se.LINE_LOOP):mt.setMode(se.LINE_STRIP)}else oe.isPoints?mt.setMode(se.POINTS):oe.isSprite&&mt.setMode(se.TRIANGLES);if(oe.isBatchedMesh)mt.renderMultiDraw(oe._multiDrawStarts,oe._multiDrawCounts,oe._multiDrawCount);else if(oe.isInstancedMesh)mt.renderInstances(Rt,zt,oe.count);else if(ae.isInstancedBufferGeometry){const ut=ae._maxInstanceCount!==void 0?ae._maxInstanceCount:1/0,yn=Math.min(ae.instanceCount,ut);mt.renderInstances(Rt,zt,yn)}else mt.render(Rt,zt)};function Mt(P,$,ae){P.transparent===!0&&P.side===Vi&&P.forceSinglePass===!1?(P.side=On,P.needsUpdate=!0,qi(P,$,ae),P.side=Rr,P.needsUpdate=!0,qi(P,$,ae),P.side=Vi):qi(P,$,ae)}this.compile=function(P,$,ae=null){ae===null&&(ae=P),y=Xe.get(ae),y.init(),b.push(y),ae.traverseVisible(function(oe){oe.isLight&&oe.layers.test($.layers)&&(y.pushLight(oe),oe.castShadow&&y.pushShadow(oe))}),P!==ae&&P.traverseVisible(function(oe){oe.isLight&&oe.layers.test($.layers)&&(y.pushLight(oe),oe.castShadow&&y.pushShadow(oe))}),y.setupLights(w._useLegacyLights);const ue=new Set;return P.traverse(function(oe){const De=oe.material;if(De)if(Array.isArray(De))for(let Ve=0;Ve<De.length;Ve++){const Ke=De[Ve];Mt(Ke,ae,oe),ue.add(Ke)}else Mt(De,ae,oe),ue.add(De)}),b.pop(),y=null,ue},this.compileAsync=function(P,$,ae=null){const ue=this.compile(P,$,ae);return new Promise(oe=>{function De(){if(ue.forEach(function(Ve){rt.get(Ve).currentProgram.isReady()&&ue.delete(Ve)}),ue.size===0){oe(P);return}setTimeout(De,10)}je.get("KHR_parallel_shader_compile")!==null?De():setTimeout(De,10)})};let Et=null;function Ot(P){Et&&Et(P)}function Jt(){Yt.stop()}function _t(){Yt.start()}const Yt=new Xg;Yt.setAnimationLoop(Ot),typeof self<"u"&&Yt.setContext(self),this.setAnimationLoop=function(P){Et=P,ot.setAnimationLoop(P),P===null?Yt.stop():Yt.start()},ot.addEventListener("sessionstart",Jt),ot.addEventListener("sessionend",_t),this.render=function(P,$){if($!==void 0&&$.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),$.parent===null&&$.matrixWorldAutoUpdate===!0&&$.updateMatrixWorld(),ot.enabled===!0&&ot.isPresenting===!0&&(ot.cameraAutoUpdate===!0&&ot.updateCamera($),$=ot.getCamera()),P.isScene===!0&&P.onBeforeRender(w,P,$,U),y=Xe.get(P,b.length),y.init(),b.push(y),ge.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),j.setFromProjectionMatrix(ge),fe=this.localClippingEnabled,re=st.init(this.clippingPlanes,fe),M=Fe.get(P,x.length),M.init(),x.push(M),cn(P,$,0,w.sortObjects),M.finish(),w.sortObjects===!0&&M.sort(V,Q),this.info.render.frame++,re===!0&&st.beginShadows();const ae=y.state.shadowsArray;if(me.render(ae,P,$),re===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset(),pt.render(M,P),y.setupLights(w._useLegacyLights),$.isArrayCamera){const ue=$.cameras;for(let oe=0,De=ue.length;oe<De;oe++){const Ve=ue[oe];ca(M,P,Ve,Ve.viewport)}}else ca(M,P,$);U!==null&&(N.updateMultisampleRenderTarget(U),N.updateRenderTargetMipmap(U)),P.isScene===!0&&P.onAfterRender(w,P,$),nt.resetDefaultState(),ce=-1,C=null,b.pop(),b.length>0?y=b[b.length-1]:y=null,x.pop(),x.length>0?M=x[x.length-1]:M=null};function cn(P,$,ae,ue){if(P.visible===!1)return;if(P.layers.test($.layers)){if(P.isGroup)ae=P.renderOrder;else if(P.isLOD)P.autoUpdate===!0&&P.update($);else if(P.isLight)y.pushLight(P),P.castShadow&&y.pushShadow(P);else if(P.isSprite){if(!P.frustumCulled||j.intersectsSprite(P)){ue&&we.setFromMatrixPosition(P.matrixWorld).applyMatrix4(ge);const Ve=Se.update(P),Ke=P.material;Ke.visible&&M.push(P,Ve,Ke,ae,we.z,null)}}else if((P.isMesh||P.isLine||P.isPoints)&&(!P.frustumCulled||j.intersectsObject(P))){const Ve=Se.update(P),Ke=P.material;if(ue&&(P.boundingSphere!==void 0?(P.boundingSphere===null&&P.computeBoundingSphere(),we.copy(P.boundingSphere.center)):(Ve.boundingSphere===null&&Ve.computeBoundingSphere(),we.copy(Ve.boundingSphere.center)),we.applyMatrix4(P.matrixWorld).applyMatrix4(ge)),Array.isArray(Ke)){const Ne=Ve.groups;for(let lt=0,et=Ne.length;lt<et;lt++){const it=Ne[lt],Rt=Ke[it.materialIndex];Rt&&Rt.visible&&M.push(P,Ve,Rt,ae,we.z,it)}}else Ke.visible&&M.push(P,Ve,Ke,ae,we.z,null)}}const De=P.children;for(let Ve=0,Ke=De.length;Ve<Ke;Ve++)cn(De[Ve],$,ae,ue)}function ca(P,$,ae,ue){const oe=P.opaque,De=P.transmissive,Ve=P.transparent;y.setupLightsView(ae),re===!0&&st.setGlobalState(w.clippingPlanes,ae),De.length>0&&Lr(oe,De,$,ae),ue&&He.viewport(D.copy(ue)),oe.length>0&&Ti(oe,$,ae),De.length>0&&Ti(De,$,ae),Ve.length>0&&Ti(Ve,$,ae),He.buffers.depth.setTest(!0),He.buffers.depth.setMask(!0),He.buffers.color.setMask(!0),He.setPolygonOffset(!1)}function Lr(P,$,ae,ue){if((ae.isScene===!0?ae.overrideMaterial:null)!==null)return;const De=tt.isWebGL2;xe===null&&(xe=new ss(1,1,{generateMipmaps:!0,type:je.has("EXT_color_buffer_half_float")?ta:Cr,minFilter:ea,samples:De?4:0})),w.getDrawingBufferSize(Ee),De?xe.setSize(Ee.x,Ee.y):xe.setSize(Ld(Ee.x),Ld(Ee.y));const Ve=w.getRenderTarget();w.setRenderTarget(xe),w.getClearColor(de),k=w.getClearAlpha(),k<1&&w.setClearColor(16777215,.5),w.clear();const Ke=w.toneMapping;w.toneMapping=Ar,Ti(P,ae,ue),N.updateMultisampleRenderTarget(xe),N.updateRenderTargetMipmap(xe);let Ne=!1;for(let lt=0,et=$.length;lt<et;lt++){const it=$[lt],Rt=it.object,xn=it.geometry,zt=it.material,wn=it.group;if(zt.side===Vi&&Rt.layers.test(ue.layers)){const mt=zt.side;zt.side=On,zt.needsUpdate=!0,Dr(Rt,ae,ue,xn,zt,wn),zt.side=mt,zt.needsUpdate=!0,Ne=!0}}Ne===!0&&(N.updateMultisampleRenderTarget(xe),N.updateRenderTargetMipmap(xe)),w.setRenderTarget(Ve),w.setClearColor(de,k),w.toneMapping=Ke}function Ti(P,$,ae){const ue=$.isScene===!0?$.overrideMaterial:null;for(let oe=0,De=P.length;oe<De;oe++){const Ve=P[oe],Ke=Ve.object,Ne=Ve.geometry,lt=ue===null?Ve.material:ue,et=Ve.group;Ke.layers.test(ae.layers)&&Dr(Ke,$,ae,Ne,lt,et)}}function Dr(P,$,ae,ue,oe,De){P.onBeforeRender(w,$,ae,ue,oe,De),P.modelViewMatrix.multiplyMatrices(ae.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),oe.onBeforeRender(w,$,ae,ue,P,De),oe.transparent===!0&&oe.side===Vi&&oe.forceSinglePass===!1?(oe.side=On,oe.needsUpdate=!0,w.renderBufferDirect(ae,$,ue,oe,P,De),oe.side=Rr,oe.needsUpdate=!0,w.renderBufferDirect(ae,$,ue,oe,P,De),oe.side=Vi):w.renderBufferDirect(ae,$,ue,oe,P,De),P.onAfterRender(w,$,ae,ue,oe,De)}function qi(P,$,ae){$.isScene!==!0&&($=Ce);const ue=rt.get(P),oe=y.state.lights,De=y.state.shadowsArray,Ve=oe.state.version,Ke=Ge.getParameters(P,oe.state,De,$,ae),Ne=Ge.getProgramCacheKey(Ke);let lt=ue.programs;ue.environment=P.isMeshStandardMaterial?$.environment:null,ue.fog=$.fog,ue.envMap=(P.isMeshStandardMaterial?ne:A).get(P.envMap||ue.environment),lt===void 0&&(P.addEventListener("dispose",Pe),lt=new Map,ue.programs=lt);let et=lt.get(Ne);if(et!==void 0){if(ue.currentProgram===et&&ue.lightsStateVersion===Ve)return fa(P,Ke),et}else Ke.uniforms=Ge.getUniforms(P),P.onBuild(ae,Ke,w),P.onBeforeCompile(Ke,w),et=Ge.acquireProgram(Ke,Ne),lt.set(Ne,et),ue.uniforms=Ke.uniforms;const it=ue.uniforms;return(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)&&(it.clippingPlanes=st.uniform),fa(P,Ke),ue.needsLights=ha(P),ue.lightsStateVersion=Ve,ue.needsLights&&(it.ambientLightColor.value=oe.state.ambient,it.lightProbe.value=oe.state.probe,it.directionalLights.value=oe.state.directional,it.directionalLightShadows.value=oe.state.directionalShadow,it.spotLights.value=oe.state.spot,it.spotLightShadows.value=oe.state.spotShadow,it.rectAreaLights.value=oe.state.rectArea,it.ltc_1.value=oe.state.rectAreaLTC1,it.ltc_2.value=oe.state.rectAreaLTC2,it.pointLights.value=oe.state.point,it.pointLightShadows.value=oe.state.pointShadow,it.hemisphereLights.value=oe.state.hemi,it.directionalShadowMap.value=oe.state.directionalShadowMap,it.directionalShadowMatrix.value=oe.state.directionalShadowMatrix,it.spotShadowMap.value=oe.state.spotShadowMap,it.spotLightMatrix.value=oe.state.spotLightMatrix,it.spotLightMap.value=oe.state.spotLightMap,it.pointShadowMap.value=oe.state.pointShadowMap,it.pointShadowMatrix.value=oe.state.pointShadowMatrix),ue.currentProgram=et,ue.uniformsList=null,et}function da(P){if(P.uniformsList===null){const $=P.currentProgram.getUniforms();P.uniformsList=Hl.seqWithValue($.seq,P.uniforms)}return P.uniformsList}function fa(P,$){const ae=rt.get(P);ae.outputColorSpace=$.outputColorSpace,ae.batching=$.batching,ae.instancing=$.instancing,ae.instancingColor=$.instancingColor,ae.skinning=$.skinning,ae.morphTargets=$.morphTargets,ae.morphNormals=$.morphNormals,ae.morphColors=$.morphColors,ae.morphTargetsCount=$.morphTargetsCount,ae.numClippingPlanes=$.numClippingPlanes,ae.numIntersection=$.numClipIntersection,ae.vertexAlphas=$.vertexAlphas,ae.vertexTangents=$.vertexTangents,ae.toneMapping=$.toneMapping}function tu(P,$,ae,ue,oe){$.isScene!==!0&&($=Ce),N.resetTextureUnits();const De=$.fog,Ve=ue.isMeshStandardMaterial?$.environment:null,Ke=U===null?w.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:Yi,Ne=(ue.isMeshStandardMaterial?ne:A).get(ue.envMap||Ve),lt=ue.vertexColors===!0&&!!ae.attributes.color&&ae.attributes.color.itemSize===4,et=!!ae.attributes.tangent&&(!!ue.normalMap||ue.anisotropy>0),it=!!ae.morphAttributes.position,Rt=!!ae.morphAttributes.normal,xn=!!ae.morphAttributes.color;let zt=Ar;ue.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(zt=w.toneMapping);const wn=ae.morphAttributes.position||ae.morphAttributes.normal||ae.morphAttributes.color,mt=wn!==void 0?wn.length:0,ut=rt.get(ue),yn=y.state.lights;if(re===!0&&(fe===!0||P!==C)){const An=P===C&&ue.id===ce;st.setState(ue,P,An)}let It=!1;ue.version===ut.__version?(ut.needsLights&&ut.lightsStateVersion!==yn.state.version||ut.outputColorSpace!==Ke||oe.isBatchedMesh&&ut.batching===!1||!oe.isBatchedMesh&&ut.batching===!0||oe.isInstancedMesh&&ut.instancing===!1||!oe.isInstancedMesh&&ut.instancing===!0||oe.isSkinnedMesh&&ut.skinning===!1||!oe.isSkinnedMesh&&ut.skinning===!0||oe.isInstancedMesh&&ut.instancingColor===!0&&oe.instanceColor===null||oe.isInstancedMesh&&ut.instancingColor===!1&&oe.instanceColor!==null||ut.envMap!==Ne||ue.fog===!0&&ut.fog!==De||ut.numClippingPlanes!==void 0&&(ut.numClippingPlanes!==st.numPlanes||ut.numIntersection!==st.numIntersection)||ut.vertexAlphas!==lt||ut.vertexTangents!==et||ut.morphTargets!==it||ut.morphNormals!==Rt||ut.morphColors!==xn||ut.toneMapping!==zt||tt.isWebGL2===!0&&ut.morphTargetsCount!==mt)&&(It=!0):(It=!0,ut.__version=ue.version);let Ai=ut.currentProgram;It===!0&&(Ai=qi(ue,$,oe));let pa=!1,gi=!1,$i=!1;const kt=Ai.getUniforms(),jn=ut.uniforms;if(He.useProgram(Ai.program)&&(pa=!0,gi=!0,$i=!0),ue.id!==ce&&(ce=ue.id,gi=!0),pa||C!==P){kt.setValue(se,"projectionMatrix",P.projectionMatrix),kt.setValue(se,"viewMatrix",P.matrixWorldInverse);const An=kt.map.cameraPosition;An!==void 0&&An.setValue(se,we.setFromMatrixPosition(P.matrixWorld)),tt.logarithmicDepthBuffer&&kt.setValue(se,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2)),(ue.isMeshPhongMaterial||ue.isMeshToonMaterial||ue.isMeshLambertMaterial||ue.isMeshBasicMaterial||ue.isMeshStandardMaterial||ue.isShaderMaterial)&&kt.setValue(se,"isOrthographic",P.isOrthographicCamera===!0),C!==P&&(C=P,gi=!0,$i=!0)}if(oe.isSkinnedMesh){kt.setOptional(se,oe,"bindMatrix"),kt.setOptional(se,oe,"bindMatrixInverse");const An=oe.skeleton;An&&(tt.floatVertexTextures?(An.boneTexture===null&&An.computeBoneTexture(),kt.setValue(se,"boneTexture",An.boneTexture,N)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}oe.isBatchedMesh&&(kt.setOptional(se,oe,"batchingTexture"),kt.setValue(se,"batchingTexture",oe._matricesTexture,N));const ao=ae.morphAttributes;if((ao.position!==void 0||ao.normal!==void 0||ao.color!==void 0&&tt.isWebGL2===!0)&&dt.update(oe,ae,Ai),(gi||ut.receiveShadow!==oe.receiveShadow)&&(ut.receiveShadow=oe.receiveShadow,kt.setValue(se,"receiveShadow",oe.receiveShadow)),ue.isMeshGouraudMaterial&&ue.envMap!==null&&(jn.envMap.value=Ne,jn.flipEnvMap.value=Ne.isCubeTexture&&Ne.isRenderTargetTexture===!1?-1:1),gi&&(kt.setValue(se,"toneMappingExposure",w.toneMappingExposure),ut.needsLights&&wi(jn,$i),De&&ue.fog===!0&&Le.refreshFogUniforms(jn,De),Le.refreshMaterialUniforms(jn,ue,Z,J,xe),Hl.upload(se,da(ut),jn,N)),ue.isShaderMaterial&&ue.uniformsNeedUpdate===!0&&(Hl.upload(se,da(ut),jn,N),ue.uniformsNeedUpdate=!1),ue.isSpriteMaterial&&kt.setValue(se,"center",oe.center),kt.setValue(se,"modelViewMatrix",oe.modelViewMatrix),kt.setValue(se,"normalMatrix",oe.normalMatrix),kt.setValue(se,"modelMatrix",oe.matrixWorld),ue.isShaderMaterial||ue.isRawShaderMaterial){const An=ue.uniformsGroups;for(let Ir=0,ma=An.length;Ir<ma;Ir++)if(tt.isWebGL2){const as=An[Ir];gt.update(as,Ai),gt.bind(as,Ai)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Ai}function wi(P,$){P.ambientLightColor.needsUpdate=$,P.lightProbe.needsUpdate=$,P.directionalLights.needsUpdate=$,P.directionalLightShadows.needsUpdate=$,P.pointLights.needsUpdate=$,P.pointLightShadows.needsUpdate=$,P.spotLights.needsUpdate=$,P.spotLightShadows.needsUpdate=$,P.rectAreaLights.needsUpdate=$,P.hemisphereLights.needsUpdate=$}function ha(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return O},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(P,$,ae){rt.get(P.texture).__webglTexture=$,rt.get(P.depthTexture).__webglTexture=ae;const ue=rt.get(P);ue.__hasExternalTextures=!0,ue.__hasExternalTextures&&(ue.__autoAllocateDepthBuffer=ae===void 0,ue.__autoAllocateDepthBuffer||je.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ue.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(P,$){const ae=rt.get(P);ae.__webglFramebuffer=$,ae.__useDefaultFramebuffer=$===void 0},this.setRenderTarget=function(P,$=0,ae=0){U=P,O=$,I=ae;let ue=!0,oe=null,De=!1,Ve=!1;if(P){const Ne=rt.get(P);Ne.__useDefaultFramebuffer!==void 0?(He.bindFramebuffer(se.FRAMEBUFFER,null),ue=!1):Ne.__webglFramebuffer===void 0?N.setupRenderTarget(P):Ne.__hasExternalTextures&&N.rebindTextures(P,rt.get(P.texture).__webglTexture,rt.get(P.depthTexture).__webglTexture);const lt=P.texture;(lt.isData3DTexture||lt.isDataArrayTexture||lt.isCompressedArrayTexture)&&(Ve=!0);const et=rt.get(P).__webglFramebuffer;P.isWebGLCubeRenderTarget?(Array.isArray(et[$])?oe=et[$][ae]:oe=et[$],De=!0):tt.isWebGL2&&P.samples>0&&N.useMultisampledRTT(P)===!1?oe=rt.get(P).__webglMultisampledFramebuffer:Array.isArray(et)?oe=et[ae]:oe=et,D.copy(P.viewport),Y.copy(P.scissor),te=P.scissorTest}else D.copy(z).multiplyScalar(Z).floor(),Y.copy(L).multiplyScalar(Z).floor(),te=G;if(He.bindFramebuffer(se.FRAMEBUFFER,oe)&&tt.drawBuffers&&ue&&He.drawBuffers(P,oe),He.viewport(D),He.scissor(Y),He.setScissorTest(te),De){const Ne=rt.get(P.texture);se.framebufferTexture2D(se.FRAMEBUFFER,se.COLOR_ATTACHMENT0,se.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ne.__webglTexture,ae)}else if(Ve){const Ne=rt.get(P.texture),lt=$||0;se.framebufferTextureLayer(se.FRAMEBUFFER,se.COLOR_ATTACHMENT0,Ne.__webglTexture,ae||0,lt)}ce=-1},this.readRenderTargetPixels=function(P,$,ae,ue,oe,De,Ve){if(!(P&&P.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ke=rt.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&Ve!==void 0&&(Ke=Ke[Ve]),Ke){He.bindFramebuffer(se.FRAMEBUFFER,Ke);try{const Ne=P.texture,lt=Ne.format,et=Ne.type;if(lt!==mi&&ke.convert(lt)!==se.getParameter(se.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const it=et===ta&&(je.has("EXT_color_buffer_half_float")||tt.isWebGL2&&je.has("EXT_color_buffer_float"));if(et!==Cr&&ke.convert(et)!==se.getParameter(se.IMPLEMENTATION_COLOR_READ_TYPE)&&!(et===Tr&&(tt.isWebGL2||je.has("OES_texture_float")||je.has("WEBGL_color_buffer_float")))&&!it){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}$>=0&&$<=P.width-ue&&ae>=0&&ae<=P.height-oe&&se.readPixels($,ae,ue,oe,ke.convert(lt),ke.convert(et),De)}finally{const Ne=U!==null?rt.get(U).__webglFramebuffer:null;He.bindFramebuffer(se.FRAMEBUFFER,Ne)}}},this.copyFramebufferToTexture=function(P,$,ae=0){const ue=Math.pow(2,-ae),oe=Math.floor($.image.width*ue),De=Math.floor($.image.height*ue);N.setTexture2D($,0),se.copyTexSubImage2D(se.TEXTURE_2D,ae,0,0,P.x,P.y,oe,De),He.unbindTexture()},this.copyTextureToTexture=function(P,$,ae,ue=0){const oe=$.image.width,De=$.image.height,Ve=ke.convert(ae.format),Ke=ke.convert(ae.type);N.setTexture2D(ae,0),se.pixelStorei(se.UNPACK_FLIP_Y_WEBGL,ae.flipY),se.pixelStorei(se.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ae.premultiplyAlpha),se.pixelStorei(se.UNPACK_ALIGNMENT,ae.unpackAlignment),$.isDataTexture?se.texSubImage2D(se.TEXTURE_2D,ue,P.x,P.y,oe,De,Ve,Ke,$.image.data):$.isCompressedTexture?se.compressedTexSubImage2D(se.TEXTURE_2D,ue,P.x,P.y,$.mipmaps[0].width,$.mipmaps[0].height,Ve,$.mipmaps[0].data):se.texSubImage2D(se.TEXTURE_2D,ue,P.x,P.y,Ve,Ke,$.image),ue===0&&ae.generateMipmaps&&se.generateMipmap(se.TEXTURE_2D),He.unbindTexture()},this.copyTextureToTexture3D=function(P,$,ae,ue,oe=0){if(w.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const De=P.max.x-P.min.x+1,Ve=P.max.y-P.min.y+1,Ke=P.max.z-P.min.z+1,Ne=ke.convert(ue.format),lt=ke.convert(ue.type);let et;if(ue.isData3DTexture)N.setTexture3D(ue,0),et=se.TEXTURE_3D;else if(ue.isDataArrayTexture||ue.isCompressedArrayTexture)N.setTexture2DArray(ue,0),et=se.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}se.pixelStorei(se.UNPACK_FLIP_Y_WEBGL,ue.flipY),se.pixelStorei(se.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ue.premultiplyAlpha),se.pixelStorei(se.UNPACK_ALIGNMENT,ue.unpackAlignment);const it=se.getParameter(se.UNPACK_ROW_LENGTH),Rt=se.getParameter(se.UNPACK_IMAGE_HEIGHT),xn=se.getParameter(se.UNPACK_SKIP_PIXELS),zt=se.getParameter(se.UNPACK_SKIP_ROWS),wn=se.getParameter(se.UNPACK_SKIP_IMAGES),mt=ae.isCompressedTexture?ae.mipmaps[oe]:ae.image;se.pixelStorei(se.UNPACK_ROW_LENGTH,mt.width),se.pixelStorei(se.UNPACK_IMAGE_HEIGHT,mt.height),se.pixelStorei(se.UNPACK_SKIP_PIXELS,P.min.x),se.pixelStorei(se.UNPACK_SKIP_ROWS,P.min.y),se.pixelStorei(se.UNPACK_SKIP_IMAGES,P.min.z),ae.isDataTexture||ae.isData3DTexture?se.texSubImage3D(et,oe,$.x,$.y,$.z,De,Ve,Ke,Ne,lt,mt.data):ae.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),se.compressedTexSubImage3D(et,oe,$.x,$.y,$.z,De,Ve,Ke,Ne,mt.data)):se.texSubImage3D(et,oe,$.x,$.y,$.z,De,Ve,Ke,Ne,lt,mt),se.pixelStorei(se.UNPACK_ROW_LENGTH,it),se.pixelStorei(se.UNPACK_IMAGE_HEIGHT,Rt),se.pixelStorei(se.UNPACK_SKIP_PIXELS,xn),se.pixelStorei(se.UNPACK_SKIP_ROWS,zt),se.pixelStorei(se.UNPACK_SKIP_IMAGES,wn),oe===0&&ue.generateMipmaps&&se.generateMipmap(et),He.unbindTexture()},this.initTexture=function(P){P.isCubeTexture?N.setTextureCube(P,0):P.isData3DTexture?N.setTexture3D(P,0):P.isDataArrayTexture||P.isCompressedArrayTexture?N.setTexture2DArray(P,0):N.setTexture2D(P,0),He.unbindTexture()},this.resetState=function(){O=0,I=0,U=null,He.reset(),nt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ji}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Bd?"display-p3":"srgb",t.unpackColorSpace=wt.workingColorSpace===Ql?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===ln?rs:Lg}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===rs?ln:Yi}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class TT extends e0{}TT.prototype.isWebGL1Renderer=!0;class wT extends un{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class AT extends kn{constructor(e,t,s,a,l,d,c,f,p){super(e,t,s,a,l,d,c,f,p),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Wd extends Pr{constructor(e=1,t=32,s=16,a=0,l=Math.PI*2,d=0,c=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:s,phiStart:a,phiLength:l,thetaStart:d,thetaLength:c},t=Math.max(3,Math.floor(t)),s=Math.max(2,Math.floor(s));const f=Math.min(d+c,Math.PI);let p=0;const m=[],g=new le,_=new le,S=[],T=[],M=[],y=[];for(let x=0;x<=s;x++){const b=[],w=x/s;let R=0;x===0&&d===0?R=.5/t:x===s&&f===Math.PI&&(R=-.5/t);for(let O=0;O<=t;O++){const I=O/t;g.x=-e*Math.cos(a+I*l)*Math.sin(d+w*c),g.y=e*Math.cos(d+w*c),g.z=e*Math.sin(a+I*l)*Math.sin(d+w*c),T.push(g.x,g.y,g.z),_.copy(g).normalize(),M.push(_.x,_.y,_.z),y.push(I+R,1-w),b.push(p++)}m.push(b)}for(let x=0;x<s;x++)for(let b=0;b<t;b++){const w=m[x][b+1],R=m[x][b],O=m[x+1][b],I=m[x+1][b+1];(x!==0||d>0)&&S.push(w,R,I),(x!==s-1||f<Math.PI)&&S.push(R,O,I)}this.setIndex(S),this.setAttribute("position",new Ei(T,3)),this.setAttribute("normal",new Ei(M,3)),this.setAttribute("uv",new Ei(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wd(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class CT extends la{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new yt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new yt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Dg,this.normalScale=new St(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class t0 extends un{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new yt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class RT extends t0{constructor(e,t,s){super(e,s),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(un.DEFAULT_UP),this.updateMatrix(),this.groundColor=new yt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const yd=new Kt,ng=new le,ig=new le;class bT{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new St(512,512),this.map=null,this.mapPass=null,this.matrix=new Kt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Hd,this._frameExtents=new St(1,1),this._viewportCount=1,this._viewports=[new sn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,s=this.matrix;ng.setFromMatrixPosition(e.matrixWorld),t.position.copy(ng),ig.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ig),t.updateMatrixWorld(),yd.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(yd),s.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),s.multiply(yd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class PT extends bT{constructor(){super(new Yg(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class LT extends t0{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(un.DEFAULT_UP),this.updateMatrix(),this.target=new un,this.shadow=new PT}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Od}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Od);function jd({world:r,preview:e,className:t,style:s}){const a=Me.useRef(null),l=Me.useRef(null);return Me.useEffect(()=>{const d=a.current;if(!d)return;const c=d.clientWidth||800,f=d.clientHeight||600,p=new wT,m=new ti(45,c/f,.1,100);m.position.set(0,0,2.6);const g=new e0({antialias:!0,alpha:!0});g.setPixelRatio(window.devicePixelRatio||1),g.setSize(c,f,!1),d.appendChild(g.domElement);const _=new RT(16777215,4473924,.9);p.add(_);const S=new LT(16777215,.6);S.position.set(5,3,5),p.add(S);const T=document.createElement("canvas");l.current=T;function M(){const z=e??window.makePlanetPreviewFromWorldBrain?.(r),L=z&&z.width||r.gridWidth,G=z&&z.height||r.gridHeight;T.width=L,T.height=G;const j=T.getContext("2d");if(!j)throw new Error("Failed to create texture canvas 2D context");const re=j.createImageData(L,G),fe=re.data;for(let ge=0;ge<G;ge++)for(let Ee=0;Ee<L;Ee++){const we=(ge*L+Ee)*4;try{let Ce=[255,0,255,255];z?typeof z.minimapColorAt=="function"?Ce=z.minimapColorAt(Ee,ge):typeof z.colorAt=="function"?Ce=z.colorAt(Ee,ge):typeof z.sampleGlobeColor=="function"&&(Ce=z.sampleGlobeColor(ge*L+Ee)):Ce=[255,0,255,255],fe[we+0]=Ce[0],fe[we+1]=Ce[1],fe[we+2]=Ce[2],fe[we+3]=Ce[3]??255}catch{fe[we+0]=255,fe[we+1]=0,fe[we+2]=255,fe[we+3]=255}}j.putImageData(re,0,0);const xe=new AT(T);return xe.flipY=!1,xe.needsUpdate=!0,xe}const y=M(),x=new Wd(1,64,32),b=new CT({map:y,metalness:0,roughness:1}),w=new Xi(x,b);p.add(w);let R=null;const O=performance.now();let I=!1,U=0,ce=0,C=0,D=0;function Y(){const z=a.current;if(!z)return;const L=z.clientWidth||800,G=z.clientHeight||600;m.aspect=L/G,m.updateProjectionMatrix(),g.setSize(L,G,!1)}window.addEventListener("resize",Y);function te(){const z=(performance.now()-O)/1e3;I||(w.rotation.y+=.0015,w.rotation.x=Math.sin(z*.05)*.03),(Math.abs(C)>1e-5||Math.abs(D)>1e-5)&&(w.rotation.y+=C,w.rotation.x+=Math.max(Math.min(w.rotation.x+D,Math.PI/2-.1),-Math.PI/2+.1),C*=.92,D*=.92),g.render(p,m),R=requestAnimationFrame(te)}te();const de=()=>{try{const z=M();b.map&&b.map.dispose(),b.map=z,b.needsUpdate=!0}catch{}},k=g.domElement;function K(z){const L=k.getBoundingClientRect();return{x:z.clientX-L.left,y:z.clientY-L.top}}function J(z){I=!0,k.setPointerCapture(z.pointerId);const L=K(z);U=L.x,ce=L.y,C=0,D=0}function Z(z){if(!I)return;const L=K(z),G=L.x-U,j=L.y-ce;U=L.x,ce=L.y;const re=.0025;w.rotation.y+=-G*re,w.rotation.x+=-j*re,w.rotation.x=Math.max(Math.min(w.rotation.x,Math.PI/2-.1),-Math.PI/2+.1),C=-G*re*.6+C*.4,D=-j*re*.6+D*.4}function V(z){I=!1;try{k.releasePointerCapture(z.pointerId)}catch{}}function Q(z){z.preventDefault();const L=z.deltaY>0?.2:-.2;m.position.z=Math.max(1.6,Math.min(6,m.position.z+L))}return k.addEventListener("pointerdown",J),k.addEventListener("pointermove",Z),k.addEventListener("pointerup",V),k.addEventListener("pointercancel",V),k.addEventListener("wheel",Q,{passive:!1}),de(),()=>{R&&cancelAnimationFrame(R),window.removeEventListener("resize",Y);try{k.removeEventListener("pointerdown",J),k.removeEventListener("pointermove",Z),k.removeEventListener("pointerup",V),k.removeEventListener("pointercancel",V),k.removeEventListener("wheel",Q)}catch{}try{g.dispose()}catch{}g.domElement&&g.domElement.parentElement&&g.domElement.parentElement.removeChild(g.domElement)}},[r,e]),X.jsx("div",{ref:a,className:t,style:{width:"100%",height:"100%",...s}})}function DT({world:r,error:e}){const t=Me.useMemo(()=>r?Kl(r):null,[r]),s=Me.useMemo(()=>r?r.metadata:null,[r]);return X.jsxs("div",{style:{position:"absolute",inset:0,display:"flex",flexDirection:"column",background:"#000"},children:[X.jsxs("div",{style:{padding:12,display:"flex",justifyContent:"space-between",gap:10,background:"rgba(0,0,0,0.7)"},children:[X.jsx("div",{style:{fontWeight:900,color:"#fff"},children:"World Preview"}),s&&X.jsxs("div",{style:{fontSize:12,opacity:.75,color:"#fff"},children:[s.styleMode," • ",s.gridWidth,"×",s.gridHeight," • seed ",s.seed]})]}),e?X.jsx("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",color:"#f66",padding:20},children:e}):r?X.jsx("div",{style:{flex:1,position:"relative"},children:X.jsx(jd,{world:r,preview:t,style:{width:"100%",height:"100%"}})}):X.jsx("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,0.6)",fontSize:16},children:"Configure parameters and click Generate"})]})}function IT(){const r=ra(),[e,t]=Me.useState(null),[s,a]=Me.useState(!1),[l,d]=Me.useState(null);Me.useMemo(()=>e?Kl(e):null,[e]);async function c(g){d(null);try{await Un.createWorld(g);const _=Un.getWorld();t(_)}catch(_){console.error(_),d(_?.message||"Generate failed.")}}async function f(){if(e){a(!0),d(null);try{const g=await yg(e);r(`/create/${g.metadata.id}`)}catch(g){console.error(g),d(g?.message||"Save failed.")}finally{a(!1)}}}const p=[{id:"generate",title:"Generate",tools:[{id:"gen",label:"Generate",disabled:!0},{id:"save",label:s?"Saving…":"Save → Create",disabled:!e||s,onClick:f}]}],m=X.jsx(vx,{onGenerate:c,onSave:f,saving:s,disabled:!e});return X.jsx(ts,{mode:"generate",onGoHome:()=>r("/"),worldName:e?.metadata?.name||"Generate",isDirty:!0,rightPanel:m,toolGroups:p,children:X.jsx(DT,{world:e,error:l})})}function NT(r,e){const t=r.getContext("2d");if(!t)return;const s=Kl(e),a=s.width,l=s.height,d=2;r.width=a*d,r.height=l*d;const c=t.createImageData(a,l),f=c.data;for(let M=0;M<l;M++)for(let y=0;y<a;y++){const x=s.minimapColorAt(y,M),b=(M*a+y)*4;f[b+0]=x[0],f[b+1]=x[1],f[b+2]=x[2],f[b+3]=x[3]}const p=document.createElement("canvas");p.width=a,p.height=l;const m=p.getContext("2d");if(!m)return;m.putImageData(c,0,0),t.imageSmoothingEnabled=!1,t.clearRect(0,0,r.width,r.height),t.drawImage(p,0,0,a*d,l*d);const g=Math.max(20,Math.floor(a*d*.25)),_=Math.max(16,Math.floor(l*d*.25)),S=Math.floor((a*d-g)/2),T=Math.floor((l*d-_)/2);t.strokeStyle="rgba(255,255,255,0.95)",t.lineWidth=2,t.strokeRect(S+.5,T+.5,g,_),t.strokeStyle="rgba(0,0,0,0.55)",t.lineWidth=1,t.strokeRect(S+1.5,T+1.5,g-2,_-2)}function UT({world:r}){const e=Me.useRef(null);return Me.useEffect(()=>{if(e.current)try{NT(e.current,r)}catch(t){console.error("Minimap draw failed:",t)}},[r]),X.jsx("div",{style:{position:"absolute",inset:0},children:X.jsx("canvas",{ref:e,style:{width:"100%",height:"100%",display:"block",background:"#111"}})})}function FT(){const r=ra(),{worldId:e}=gg(),[t,s]=Me.useState(!0),[a,l]=Me.useState(null),[d,c]=Me.useState(null),[f,p]=Me.useState(!1),[m,g]=Me.useState("GLOBE"),[_,S]=Me.useState(Un.getWorld());Me.useEffect(()=>Un.subscribe(O=>S(O)),[]),Me.useEffect(()=>{let R=!0;return(async()=>{if(!e){R&&(l("Missing worldId in route."),s(!1));return}s(!0),l(null);try{await Un.loadWorld(e)}catch(O){console.error(O),R&&l(O?.message||"Failed to load world.")}finally{R&&s(!1)}})(),()=>{R=!1}},[e]);const T=Me.useMemo(()=>_?Kl(_):null,[_]);async function M(){c(null),p(!0);try{await Un.save()}catch(R){console.error(R),c(R?.message||"Save failed.")}finally{p(!1)}}const y=[{id:"terrain",title:"Terrain",tools:[{id:"raise",label:"Raise",disabled:!0},{id:"lower",label:"Lower",disabled:!0},{id:"smooth",label:"Smooth",disabled:!0},{id:"flatten",label:"Flatten",disabled:!0}]},{id:"biomes",title:"Biomes",tools:[{id:"paint_biome",label:"Paint Biome",disabled:!0},{id:"erase_biome",label:"Erase Biome",disabled:!0}]},{id:"water",title:"Water",tools:[{id:"river_add",label:"Add River",disabled:!0},{id:"river_edit",label:"Edit River",disabled:!0},{id:"lake_add",label:"Add Lake",disabled:!0}]},{id:"volcano",title:"Volcano",tools:[{id:"add_volcano",label:"Add Volcano",disabled:!0}]},{id:"countries",title:"Countries & Borders",tools:[{id:"add_country",label:"Add Country",disabled:!0},{id:"edit_border",label:"Edit Border",disabled:!0}]},{id:"culture",title:"Culture",tools:[{id:"add_settlement",label:"Add Settlement",disabled:!0},{id:"culture_zone",label:"Culture Zone",disabled:!0}]},{id:"cities",title:"Cities",tools:[{id:"add_city",label:"Add City",disabled:!0}]}],x=X.jsxs("div",{style:{padding:14,color:"rgba(255,255,255,0.88)"},children:[X.jsx("h3",{style:{margin:"6px 0 10px 0"},children:"Create"}),X.jsxs("div",{style:{display:"flex",gap:10,marginBottom:12},children:[X.jsx("button",{onClick:M,disabled:!_||t||f,style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:!_||t||f?"not-allowed":"pointer",opacity:!_||t||f?.5:1},children:f?"Saving…":"Save"}),X.jsx("button",{onClick:()=>r(`/sim/${e}`),disabled:!e,style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:e?"pointer":"not-allowed",opacity:e?1:.5},children:"Go to Sim"})]}),d&&X.jsxs("div",{style:{marginBottom:12,padding:10,borderRadius:10,border:"1px solid rgba(255,90,90,0.35)",background:"rgba(255,90,90,0.08)",color:"rgba(255,255,255,0.92)",fontSize:12,lineHeight:1.4},children:[X.jsx("b",{children:"Save failed:"})," ",d]}),X.jsx("div",{style:{fontSize:12,opacity:.8,lineHeight:1.4},children:"Tool implementations come after Phase 1 stability. For now these are blueprint-accurate categories."})]});function b(R,O){const I=R?.width,U=R?.height,ce=R?.rgba;return I&&U&&ce&&ce instanceof Uint8ClampedArray?X.jsx("canvas",{width:I,height:U,ref:C=>{if(!C)return;const D=C.getContext("2d");if(D)try{const Y=D.createImageData(I,U);Y.data.set(ce),D.putImageData(Y,0,0)}catch(Y){console.error("Preview render failed:",Y)}},style:{width:"100%",height:"100%",imageRendering:"pixelated"}}):I&&U&&(typeof R.minimapColorAt=="function"||typeof R.sampleGlobeColor=="function")?X.jsx("canvas",{width:I,height:U,ref:C=>{if(!C)return;const D=C.getContext("2d");if(D)try{const Y=D.createImageData(I,U),te=Y.data;for(let de=0;de<U;de++)for(let k=0;k<I;k++){const K=O==="minimap"&&typeof R.minimapColorAt=="function"?R.minimapColorAt(k,de):typeof R.sampleGlobeColor=="function"?R.sampleGlobeColor(de*I+k):R.colorAt(k,de),J=(de*I+k)*4;te[J+0]=K[0],te[J+1]=K[1],te[J+2]=K[2],te[J+3]=K[3]??255}D.putImageData(Y,0,0)}catch(Y){console.error("Preview render failed (planet API):",Y)}},style:{width:"100%",height:"100%",imageRendering:"pixelated"}}):X.jsx("div",{style:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",padding:12,color:"rgba(255,255,255,0.85)",fontSize:13},children:"Generating preview…"})}if(t)return X.jsx(ts,{mode:"create",onGoHome:()=>r("/"),worldName:_?.metadata?.name||"Loading…",isDirty:Un.isDirty(),onModeToggle:()=>r(`/sim/${e}`),viewMode:m,onViewModeChange:g,rightPanel:x,toolGroups:y,children:X.jsx("div",{style:{padding:20,color:"rgba(255,255,255,0.85)"},children:"Loading world…"})});if(a)return X.jsx(ts,{mode:"create",onGoHome:()=>r("/"),worldName:"Load Error",isDirty:!1,viewMode:m,onViewModeChange:g,rightPanel:X.jsxs("div",{style:{padding:14,color:"rgba(255,255,255,0.9)"},children:[X.jsx("h3",{style:{margin:"6px 0 10px 0"},children:"Could not load world"}),X.jsx("div",{style:{opacity:.85,marginBottom:12},children:a}),X.jsxs("div",{style:{display:"flex",gap:10,flexWrap:"wrap"},children:[X.jsx("button",{onClick:()=>r("/"),style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Back to Home"}),X.jsx("button",{onClick:()=>r("/generate"),style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Go to Generate"}),X.jsx("button",{onClick:()=>window.location.reload(),style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Reload"})]})]}),children:X.jsx("div",{style:{padding:20}})});const w=m==="GLOBE";return X.jsx(ts,{mode:"create",onGoHome:()=>r("/"),worldName:_?.metadata?.name||"Create",isDirty:Un.isDirty(),onModeToggle:()=>r(`/sim/${e}`),viewMode:m,onViewModeChange:g,rightPanel:x,toolGroups:y,children:X.jsxs("div",{style:{width:"100%",height:"100%",position:"relative"},children:[m==="GLOBE"&&_?X.jsx("div",{style:{width:"100%",height:"100%"},children:X.jsx(jd,{world:_,preview:T})}):b(T,"main"),_&&w&&X.jsx("div",{style:{position:"absolute",left:16,bottom:16,width:220,height:140,borderRadius:12,overflow:"hidden",border:"1px solid rgba(255,255,255,0.18)",background:"rgba(0,0,0,0.35)",boxShadow:"0 10px 25px rgba(0,0,0,0.35)"},title:"Minimap (Create + Globe only)",children:X.jsx(UT,{world:_})})]})})}function OT(){const r=ra(),{worldId:e}=gg(),[t,s]=Me.useState(!0),[a,l]=Me.useState(null),[d,c]=Me.useState(Un.getWorld());Me.useEffect(()=>Un.subscribe(m=>c(m)),[]),Me.useEffect(()=>{let p=!0;return(async()=>{if(!e){p&&(l("Missing worldId in route."),s(!1));return}s(!0),l(null);try{await Un.loadWorld(e)}catch(m){console.error(m),p&&l(m?.message||"Failed to load world.")}finally{p&&s(!1)}})(),()=>{p=!1}},[e]);const f=X.jsxs("div",{style:{padding:14,color:"rgba(255,255,255,0.88)"},children:[X.jsx("h3",{style:{margin:"6px 0 10px 0"},children:"Sim"}),X.jsxs("div",{style:{display:"flex",gap:10,marginBottom:12},children:[X.jsx("button",{onClick:()=>Un.simulateTick(),disabled:!d||t,style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:!d||t?"not-allowed":"pointer",opacity:!d||t?.5:1},children:"Tick"}),X.jsx("button",{onClick:()=>r(`/create/${e}`),disabled:!e,style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:e?"pointer":"not-allowed",opacity:e?1:.5},children:"Back to Create"})]}),X.jsx("div",{style:{fontSize:12,opacity:.8,lineHeight:1.4},children:"Sim overlays (Culture/Trade/Routes) will be added after stability."})]});return t?X.jsx(ts,{mode:"sim",onGoHome:()=>r("/"),worldName:d?.metadata?.name||"Loading…",isDirty:Un.isDirty(),onModeToggle:()=>r(`/create/${e}`),rightPanel:f,leftTools:[{id:"overview",label:"Overview",disabled:!0},{id:"culture",label:"Culture",disabled:!0},{id:"trade",label:"Trade",disabled:!0},{id:"routes",label:"Routes",disabled:!0}],children:X.jsx("div",{style:{padding:20,color:"rgba(255,255,255,0.85)"},children:"Loading world…"})}):a?X.jsx(ts,{mode:"sim",onGoHome:()=>r("/"),worldName:"Load Error",isDirty:!1,rightPanel:X.jsxs("div",{style:{padding:14,color:"rgba(255,255,255,0.9)"},children:[X.jsx("h3",{style:{margin:"6px 0 10px 0"},children:"Could not load world"}),X.jsx("div",{style:{opacity:.85,marginBottom:12},children:a}),X.jsxs("div",{style:{display:"flex",gap:10},children:[X.jsx("button",{onClick:()=>r("/"),style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Back to Home"}),X.jsx("button",{onClick:()=>r("/generate"),style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Go to Generate"}),X.jsx("button",{onClick:()=>window.location.reload(),style:{padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.92)",cursor:"pointer"},children:"Reload"})]})]}),children:X.jsx("div",{style:{padding:20,color:"rgba(255,255,255,0.85)"}})}):X.jsx(ts,{mode:"sim",onGoHome:()=>r("/"),worldName:d?.metadata?.name||"Sim",isDirty:Un.isDirty(),onModeToggle:()=>r(`/create/${e}`),rightPanel:f,toolGroups:[{id:"sim",title:"Sim Tools",tools:[{id:"overview",label:"Overview",disabled:!0},{id:"culture",label:"Culture",disabled:!0},{id:"trade",label:"Trade",disabled:!0},{id:"routes",label:"Routes",disabled:!0}]}],children:X.jsx("div",{style:{width:"100%",height:"100%",position:"relative"},children:d?X.jsx(jd,{world:d,className:""}):X.jsx("div",{style:{padding:20,color:"rgba(255,255,255,0.85)"},children:"No world loaded."})})})}function kT(){return X.jsxs(O_,{children:[X.jsx(qs,{path:"/",element:X.jsx(X_,{})}),X.jsx(qs,{path:"/generate",element:X.jsx(IT,{})}),X.jsx(qs,{path:"/create/:worldId",element:X.jsx(FT,{})}),X.jsx(qs,{path:"/sim/:worldId",element:X.jsx(OT,{})}),X.jsx(qs,{path:"*",element:X.jsx(U_,{to:"/",replace:!0})})]})}jv.createRoot(document.getElementById("root")).render(X.jsx(sg.StrictMode,{children:X.jsx(z_,{children:X.jsx(kT,{})})}));
