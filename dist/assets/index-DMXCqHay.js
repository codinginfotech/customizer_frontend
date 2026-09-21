const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index.esm-B74VAB7H.js","assets/three-BXUBjeT-.js","assets/konva-CAv-Ixzy.js","assets/DesignerPage-BVbRdnJc.js","assets/rigs-D0CB4OB6.js","assets/download-9ybruhwz.js","assets/trash-2-HEwRDrzh.js","assets/image-ZxdqNUUP.js","assets/lock-B5dabw_Y.js","assets/minus-BMjPR_sp.js","assets/info-DVgUT0UG.js","assets/DashboardRoutes-DstIa4Yj.js","assets/palette-BeCKuZ2z.js","assets/pencil-Cb0clqVH.js","assets/CartPage-DhkqnnNO.js","assets/CheckoutPage-x6o77yfp.js","assets/AdminRoutes-CN65AroL.js"])))=>i.map(i=>d[i]);
import{_ as ct,c as ai,j as o,a as ho}from"./three-BXUBjeT-.js";import{r as m,a as fo,R as po}from"./konva-CAv-Ixzy.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=r(s);fetch(s.href,i)}})();/**
 * @remix-run/router v1.23.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function _t(){return _t=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)({}).hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},_t.apply(null,arguments)}var Ce;(function(t){t.Pop="POP",t.Push="PUSH",t.Replace="REPLACE"})(Ce||(Ce={}));const Qn="popstate";function mo(t){t===void 0&&(t={});function e(n,s){let{pathname:i,search:a,hash:l}=n.location;return nn("",{pathname:i,search:a,hash:l},s.state&&s.state.usr||null,s.state&&s.state.key||"default")}function r(n,s){return typeof s=="string"?s:ur(s)}return yo(e,r,null,t)}function D(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function oi(t,e){if(!t){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function go(){return Math.random().toString(36).substr(2,8)}function es(t,e){return{usr:t.state,key:t.key,idx:e}}function nn(t,e,r,n){return r===void 0&&(r=null),_t({pathname:typeof t=="string"?t:t.pathname,search:"",hash:""},typeof e=="string"?ut(e):e,{state:r,key:e&&e.key||n||go()})}function ur(t){let{pathname:e="/",search:r="",hash:n=""}=t;return r&&r!=="?"&&(e+=r.charAt(0)==="?"?r:"?"+r),n&&n!=="#"&&(e+=n.charAt(0)==="#"?n:"#"+n),e}function ut(t){let e={};if(t){let r=t.indexOf("#");r>=0&&(e.hash=t.substr(r),t=t.substr(0,r));let n=t.indexOf("?");n>=0&&(e.search=t.substr(n),t=t.substr(0,n)),t&&(e.pathname=t)}return e}function yo(t,e,r,n){n===void 0&&(n={});let{window:s=document.defaultView,v5Compat:i=!1}=n,a=s.history,l=Ce.Pop,c=null,d=u();d==null&&(d=0,a.replaceState(_t({},a.state,{idx:d}),""));function u(){return(a.state||{idx:null}).idx}function h(){l=Ce.Pop;let E=u(),p=E==null?null:E-d;d=E,c&&c({action:l,location:w.location,delta:p})}function g(E,p){l=Ce.Push;let y=nn(w.location,E,p);d=u()+1;let _=es(y,d),x=w.createHref(y);try{a.pushState(_,"",x)}catch(R){if(R instanceof DOMException&&R.name==="DataCloneError")throw R;s.location.assign(x)}i&&c&&c({action:l,location:w.location,delta:1})}function b(E,p){l=Ce.Replace;let y=nn(w.location,E,p);d=u();let _=es(y,d),x=w.createHref(y);a.replaceState(_,"",x),i&&c&&c({action:l,location:w.location,delta:0})}function v(E){let p=s.location.origin!=="null"?s.location.origin:s.location.href,y=typeof E=="string"?E:ur(E);return y=y.replace(/ $/,"%20"),D(p,"No window.location.(origin|href) available to create URL for href: "+y),new URL(y,p)}let w={get action(){return l},get location(){return t(s,a)},listen(E){if(c)throw new Error("A history only accepts one active listener");return s.addEventListener(Qn,h),c=E,()=>{s.removeEventListener(Qn,h),c=null}},createHref(E){return e(s,E)},createURL:v,encodeLocation(E){let p=v(E);return{pathname:p.pathname,search:p.search,hash:p.hash}},push:g,replace:b,go(E){return a.go(E)}};return w}var ts;(function(t){t.data="data",t.deferred="deferred",t.redirect="redirect",t.error="error"})(ts||(ts={}));function bo(t,e,r){return r===void 0&&(r="/"),xo(t,e,r)}function xo(t,e,r,n){let s=typeof e=="string"?ut(e):e,i=it(s.pathname||"/",r);if(i==null)return null;let a=li(t);wo(a);let l=null,c=Po(i);for(let d=0;l==null&&d<a.length;++d)l=Co(a[d],c);return l}function li(t,e,r,n){e===void 0&&(e=[]),r===void 0&&(r=[]),n===void 0&&(n="");let s=(i,a,l)=>{let c={relativePath:l===void 0?i.path||"":l,caseSensitive:i.caseSensitive===!0,childrenIndex:a,route:i};c.relativePath.startsWith("/")&&(D(c.relativePath.startsWith(n),'Absolute route path "'+c.relativePath+'" nested under path '+('"'+n+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),c.relativePath=c.relativePath.slice(n.length));let d=Te([n,c.relativePath]),u=r.concat(c);i.children&&i.children.length>0&&(D(i.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+d+'".')),li(i.children,e,u,d)),!(i.path==null&&!i.index)&&e.push({path:d,score:Ro(d,i.index),routesMeta:u})};return t.forEach((i,a)=>{var l;if(i.path===""||!((l=i.path)!=null&&l.includes("?")))s(i,a);else for(let c of ci(i.path))s(i,a,c)}),e}function ci(t){let e=t.split("/");if(e.length===0)return[];let[r,...n]=e,s=r.endsWith("?"),i=r.replace(/\?$/,"");if(n.length===0)return s?[i,""]:[i];let a=ci(n.join("/")),l=[];return l.push(...a.map(c=>c===""?i:[i,c].join("/"))),s&&l.push(...a),l.map(c=>t.startsWith("/")&&c===""?"/":c)}function wo(t){t.sort((e,r)=>e.score!==r.score?r.score-e.score:ko(e.routesMeta.map(n=>n.childrenIndex),r.routesMeta.map(n=>n.childrenIndex)))}const vo=/^:[\w-]+$/,Eo=3,_o=2,No=1,So=10,Io=-2,rs=t=>t==="*";function Ro(t,e){let r=t.split("/"),n=r.length;return r.some(rs)&&(n+=Io),e&&(n+=_o),r.filter(s=>!rs(s)).reduce((s,i)=>s+(vo.test(i)?Eo:i===""?No:So),n)}function ko(t,e){return t.length===e.length&&t.slice(0,-1).every((n,s)=>n===e[s])?t[t.length-1]-e[e.length-1]:0}function Co(t,e,r){let{routesMeta:n}=t,s={},i="/",a=[];for(let l=0;l<n.length;++l){let c=n[l],d=l===n.length-1,u=i==="/"?e:e.slice(i.length)||"/",h=sn({path:c.relativePath,caseSensitive:c.caseSensitive,end:d},u),g=c.route;if(!h)return null;Object.assign(s,h.params),a.push({params:s,pathname:Te([i,h.pathname]),pathnameBase:Oo(Te([i,h.pathnameBase])),route:g}),h.pathnameBase!=="/"&&(i=Te([i,h.pathnameBase]))}return a}function sn(t,e){typeof t=="string"&&(t={path:t,caseSensitive:!1,end:!0});let[r,n]=To(t.path,t.caseSensitive,t.end),s=e.match(r);if(!s)return null;let i=s[0],a=i.replace(/(.)\/+$/,"$1"),l=s.slice(1);return{params:n.reduce((d,u,h)=>{let{paramName:g,isOptional:b}=u;if(g==="*"){let w=l[h]||"";a=i.slice(0,i.length-w.length).replace(/(.)\/+$/,"$1")}const v=l[h];return b&&!v?d[g]=void 0:d[g]=(v||"").replace(/%2F/g,"/"),d},{}),pathname:i,pathnameBase:a,pattern:t}}function To(t,e,r){e===void 0&&(e=!1),r===void 0&&(r=!0),oi(t==="*"||!t.endsWith("*")||t.endsWith("/*"),'Route path "'+t+'" will be treated as if it were '+('"'+t.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+t.replace(/\*$/,"/*")+'".'));let n=[],s="^"+t.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,l,c)=>(n.push({paramName:l,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return t.endsWith("*")?(n.push({paramName:"*"}),s+=t==="*"||t==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?s+="\\/*$":t!==""&&t!=="/"&&(s+="(?:(?=\\/|$))"),[new RegExp(s,e?void 0:"i"),n]}function Po(t){try{return t.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return oi(!1,'The URL path "'+t+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),t}}function it(t,e){if(e==="/")return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let r=e.endsWith("/")?e.length-1:e.length,n=t.charAt(r);return n&&n!=="/"?null:t.slice(r)||"/"}function Ao(t,e){e===void 0&&(e="/");let{pathname:r,search:n="",hash:s=""}=typeof t=="string"?ut(t):t,i;return r?(r=ui(r),r.startsWith("/")?i=ns(r.substring(1),"/"):i=ns(r,e)):i=e,{pathname:i,search:Do(n),hash:Lo(s)}}function ns(t,e){let r=e.replace(/\/+$/,"").split("/");return t.split("/").forEach(s=>{s===".."?r.length>1&&r.pop():s!=="."&&r.push(s)}),r.length>1?r.join("/"):"/"}function $r(t,e,r,n){return"Cannot include a '"+t+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(n)+"].  Please separate it out to the ")+("`to."+r+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function jo(t){return t.filter((e,r)=>r===0||e.route.path&&e.route.path.length>0)}function En(t,e){let r=jo(t);return e?r.map((n,s)=>s===r.length-1?n.pathname:n.pathnameBase):r.map(n=>n.pathnameBase)}function _n(t,e,r,n){n===void 0&&(n=!1);let s;typeof t=="string"?s=ut(t):(s=_t({},t),D(!s.pathname||!s.pathname.includes("?"),$r("?","pathname","search",s)),D(!s.pathname||!s.pathname.includes("#"),$r("#","pathname","hash",s)),D(!s.search||!s.search.includes("#"),$r("#","search","hash",s)));let i=t===""||s.pathname==="",a=i?"/":s.pathname,l;if(a==null)l=r;else{let h=e.length-1;if(!n&&a.startsWith("..")){let g=a.split("/");for(;g[0]==="..";)g.shift(),h-=1;s.pathname=g.join("/")}l=h>=0?e[h]:"/"}let c=Ao(s,l),d=a&&a!=="/"&&a.endsWith("/"),u=(i||a===".")&&r.endsWith("/");return!c.pathname.endsWith("/")&&(d||u)&&(c.pathname+="/"),c}const ui=t=>t.replace(/\/\/+/g,"/"),Te=t=>ui(t.join("/")),Oo=t=>t.replace(/\/+$/,"").replace(/^\/*/,"/"),Do=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,Lo=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t;function Mo(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.internal=="boolean"&&"data"in t}const di=["post","put","patch","delete"];new Set(di);const Uo=["get",...di];new Set(Uo);/**
 * React Router v6.30.6
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Nt(){return Nt=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)({}).hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},Nt.apply(null,arguments)}const Nr=m.createContext(null),hi=m.createContext(null),xe=m.createContext(null),Sr=m.createContext(null),oe=m.createContext({outlet:null,matches:[],isDataRoute:!1}),fi=m.createContext(null);function Fo(t,e){let{relative:r}=e===void 0?{}:e;dt()||D(!1);let{basename:n,navigator:s}=m.useContext(xe),{hash:i,pathname:a,search:l}=Ir(t,{relative:r}),c=a;return n!=="/"&&(c=a==="/"?n:Te([n,a])),s.createHref({pathname:c,search:l,hash:i})}function dt(){return m.useContext(Sr)!=null}function X(){return dt()||D(!1),m.useContext(Sr).location}function pi(t){m.useContext(xe).static||m.useLayoutEffect(t)}function we(){let{isDataRoute:t}=m.useContext(oe);return t?tl():Bo()}function Bo(){dt()||D(!1);let t=m.useContext(Nr),{basename:e,future:r,navigator:n}=m.useContext(xe),{matches:s}=m.useContext(oe),{pathname:i}=X(),a=JSON.stringify(En(s,r.v7_relativeSplatPath)),l=m.useRef(!1);return pi(()=>{l.current=!0}),m.useCallback(function(d,u){if(u===void 0&&(u={}),!l.current)return;if(typeof d=="number"){n.go(d);return}let h=_n(d,JSON.parse(a),i,u.relative==="path");t==null&&e!=="/"&&(h.pathname=h.pathname==="/"?e:Te([e,h.pathname])),(u.replace?n.replace:n.push)(h,u.state,u)},[e,n,a,i,t])}const $o=m.createContext(null);function Ho(t){let e=m.useContext(oe).outlet;return e&&m.createElement($o.Provider,{value:t},e)}function zo(){let{matches:t}=m.useContext(oe),e=t[t.length-1];return e?e.params:{}}function Ir(t,e){let{relative:r}=e===void 0?{}:e,{future:n}=m.useContext(xe),{matches:s}=m.useContext(oe),{pathname:i}=X(),a=JSON.stringify(En(s,n.v7_relativeSplatPath));return m.useMemo(()=>_n(t,JSON.parse(a),i,r==="path"),[t,a,i,r])}function Vo(t,e){return Wo(t,e)}function Wo(t,e,r,n){dt()||D(!1);let{navigator:s}=m.useContext(xe),{matches:i}=m.useContext(oe),a=i[i.length-1],l=a?a.params:{};a&&a.pathname;let c=a?a.pathnameBase:"/";a&&a.route;let d=X(),u;if(e){var h;let E=typeof e=="string"?ut(e):e;c==="/"||(h=E.pathname)!=null&&h.startsWith(c)||D(!1),u=E}else u=d;let g=u.pathname||"/",b=g;if(c!=="/"){let E=c.replace(/^\//,"").split("/");b="/"+g.replace(/^\//,"").split("/").slice(E.length).join("/")}let v=bo(t,{pathname:b}),w=Xo(v&&v.map(E=>Object.assign({},E,{params:Object.assign({},l,E.params),pathname:Te([c,s.encodeLocation?s.encodeLocation(E.pathname).pathname:E.pathname]),pathnameBase:E.pathnameBase==="/"?c:Te([c,s.encodeLocation?s.encodeLocation(E.pathnameBase).pathname:E.pathnameBase])})),i,r,n);return e&&w?m.createElement(Sr.Provider,{value:{location:Nt({pathname:"/",search:"",hash:"",state:null,key:"default"},u),navigationType:Ce.Pop}},w):w}function qo(){let t=el(),e=Mo(t)?t.status+" "+t.statusText:t instanceof Error?t.message:JSON.stringify(t),r=t instanceof Error?t.stack:null,s={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return m.createElement(m.Fragment,null,m.createElement("h2",null,"Unexpected Application Error!"),m.createElement("h3",{style:{fontStyle:"italic"}},e),r?m.createElement("pre",{style:s},r):null,null)}const Ko=m.createElement(qo,null);class Go extends m.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,r){return r.location!==e.location||r.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:r.error,location:r.location,revalidation:e.revalidation||r.revalidation}}componentDidCatch(e,r){console.error("React Router caught the following error during render",e,r)}render(){return this.state.error!==void 0?m.createElement(oe.Provider,{value:this.props.routeContext},m.createElement(fi.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function Jo(t){let{routeContext:e,match:r,children:n}=t,s=m.useContext(Nr);return s&&s.static&&s.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(s.staticContext._deepestRenderedBoundaryId=r.route.id),m.createElement(oe.Provider,{value:e},n)}function Xo(t,e,r,n){var s;if(e===void 0&&(e=[]),r===void 0&&(r=null),n===void 0&&(n=null),t==null){var i;if(!r)return null;if(r.errors)t=r.matches;else if((i=n)!=null&&i.v7_partialHydration&&e.length===0&&!r.initialized&&r.matches.length>0)t=r.matches;else return null}let a=t,l=(s=r)==null?void 0:s.errors;if(l!=null){let u=a.findIndex(h=>h.route.id&&(l==null?void 0:l[h.route.id])!==void 0);u>=0||D(!1),a=a.slice(0,Math.min(a.length,u+1))}let c=!1,d=-1;if(r&&n&&n.v7_partialHydration)for(let u=0;u<a.length;u++){let h=a[u];if((h.route.HydrateFallback||h.route.hydrateFallbackElement)&&(d=u),h.route.id){let{loaderData:g,errors:b}=r,v=h.route.loader&&g[h.route.id]===void 0&&(!b||b[h.route.id]===void 0);if(h.route.lazy||v){c=!0,d>=0?a=a.slice(0,d+1):a=[a[0]];break}}}return a.reduceRight((u,h,g)=>{let b,v=!1,w=null,E=null;r&&(b=l&&h.route.id?l[h.route.id]:void 0,w=h.route.errorElement||Ko,c&&(d<0&&g===0?(rl("route-fallback"),v=!0,E=null):d===g&&(v=!0,E=h.route.hydrateFallbackElement||null)));let p=e.concat(a.slice(0,g+1)),y=()=>{let _;return b?_=w:v?_=E:h.route.Component?_=m.createElement(h.route.Component,null):h.route.element?_=h.route.element:_=u,m.createElement(Jo,{match:h,routeContext:{outlet:u,matches:p,isDataRoute:r!=null},children:_})};return r&&(h.route.ErrorBoundary||h.route.errorElement||g===0)?m.createElement(Go,{location:r.location,revalidation:r.revalidation,component:w,error:b,children:y(),routeContext:{outlet:null,matches:p,isDataRoute:!0}}):y()},null)}var mi=function(t){return t.UseBlocker="useBlocker",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t}(mi||{}),gi=function(t){return t.UseBlocker="useBlocker",t.UseLoaderData="useLoaderData",t.UseActionData="useActionData",t.UseRouteError="useRouteError",t.UseNavigation="useNavigation",t.UseRouteLoaderData="useRouteLoaderData",t.UseMatches="useMatches",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t.UseRouteId="useRouteId",t}(gi||{});function Yo(t){let e=m.useContext(Nr);return e||D(!1),e}function Zo(t){let e=m.useContext(hi);return e||D(!1),e}function Qo(t){let e=m.useContext(oe);return e||D(!1),e}function yi(t){let e=Qo(),r=e.matches[e.matches.length-1];return r.route.id||D(!1),r.route.id}function el(){var t;let e=m.useContext(fi),r=Zo(),n=yi();return e!==void 0?e:(t=r.errors)==null?void 0:t[n]}function tl(){let{router:t}=Yo(mi.UseNavigateStable),e=yi(gi.UseNavigateStable),r=m.useRef(!1);return pi(()=>{r.current=!0}),m.useCallback(function(s,i){i===void 0&&(i={}),r.current&&(typeof s=="number"?t.navigate(s):t.navigate(s,Nt({fromRouteId:e},i)))},[t,e])}const ss={};function rl(t,e,r){ss[t]||(ss[t]=!0)}function nl(t,e){t==null||t.v7_startTransition,t==null||t.v7_relativeSplatPath}function dr(t){let{to:e,replace:r,state:n,relative:s}=t;dt()||D(!1);let{future:i,static:a}=m.useContext(xe),{matches:l}=m.useContext(oe),{pathname:c}=X(),d=we(),u=_n(e,En(l,i.v7_relativeSplatPath),c,s==="path"),h=JSON.stringify(u);return m.useEffect(()=>d(JSON.parse(h),{replace:r,state:n,relative:s}),[d,h,s,r,n]),null}function sl(t){return Ho(t.context)}function V(t){D(!1)}function il(t){let{basename:e="/",children:r=null,location:n,navigationType:s=Ce.Pop,navigator:i,static:a=!1,future:l}=t;dt()&&D(!1);let c=e.replace(/^\/*/,"/"),d=m.useMemo(()=>({basename:c,navigator:i,static:a,future:Nt({v7_relativeSplatPath:!1},l)}),[c,l,i,a]);typeof n=="string"&&(n=ut(n));let{pathname:u="/",search:h="",hash:g="",state:b=null,key:v="default"}=n,w=m.useMemo(()=>{let E=it(u,c);return E==null?null:{location:{pathname:E,search:h,hash:g,state:b,key:v},navigationType:s}},[c,u,h,g,b,v,s]);return w==null?null:m.createElement(xe.Provider,{value:d},m.createElement(Sr.Provider,{children:r,value:w}))}function al(t){let{children:e,location:r}=t;return Vo(an(e),r)}new Promise(()=>{});function an(t,e){e===void 0&&(e=[]);let r=[];return m.Children.forEach(t,(n,s)=>{if(!m.isValidElement(n))return;let i=[...e,s];if(n.type===m.Fragment){r.push.apply(r,an(n.props.children,i));return}n.type!==V&&D(!1),!n.props.index||!n.props.children||D(!1);let a={id:n.props.id||i.join("-"),caseSensitive:n.props.caseSensitive,element:n.props.element,Component:n.props.Component,index:n.props.index,path:n.props.path,loader:n.props.loader,action:n.props.action,errorElement:n.props.errorElement,ErrorBoundary:n.props.ErrorBoundary,hasErrorBoundary:n.props.ErrorBoundary!=null||n.props.errorElement!=null,shouldRevalidate:n.props.shouldRevalidate,handle:n.props.handle,lazy:n.props.lazy};n.props.children&&(a.children=an(n.props.children,i)),r.push(a)}),r}/**
 * React Router DOM v6.30.6
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function hr(){return hr=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)({}).hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},hr.apply(null,arguments)}function bi(t,e){if(t==null)return{};var r={};for(var n in t)if({}.hasOwnProperty.call(t,n)){if(e.indexOf(n)!==-1)continue;r[n]=t[n]}return r}function ol(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}function ll(t,e){return t.button===0&&(!e||e==="_self")&&!ol(t)}function on(t){return t===void 0&&(t=""),new URLSearchParams(typeof t=="string"||Array.isArray(t)||t instanceof URLSearchParams?t:Object.keys(t).reduce((e,r)=>{let n=t[r];return e.concat(Array.isArray(n)?n.map(s=>[r,s]):[[r,n]])},[]))}function cl(t,e){let r=on(t);return e&&e.forEach((n,s)=>{r.has(s)||e.getAll(s).forEach(i=>{r.append(s,i)})}),r}const ul=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],dl=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"],hl="6";try{window.__reactRouterVersion=hl}catch{}const fl=m.createContext({isTransitioning:!1}),pl="startTransition",is=fo[pl];function ml(t){let{basename:e,children:r,future:n,window:s}=t,i=m.useRef();i.current==null&&(i.current=mo({window:s,v5Compat:!0}));let a=i.current,[l,c]=m.useState({action:a.action,location:a.location}),{v7_startTransition:d}=n||{},u=m.useCallback(h=>{d&&is?is(()=>c(h)):c(h)},[c,d]);return m.useLayoutEffect(()=>a.listen(u),[a,u]),m.useEffect(()=>nl(n),[n]),m.createElement(il,{basename:e,children:r,location:l.location,navigationType:l.action,navigator:a,future:n})}const gl=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",yl=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,M=m.forwardRef(function(e,r){let{onClick:n,relative:s,reloadDocument:i,replace:a,state:l,target:c,to:d,preventScrollReset:u,viewTransition:h}=e,g=bi(e,ul),{basename:b}=m.useContext(xe),v,w=!1;if(typeof d=="string"&&yl.test(d)&&(v=d,gl))try{let _=new URL(window.location.href),x=d.startsWith("//")?new URL(_.protocol+d):new URL(d),R=it(x.pathname,b);x.origin===_.origin&&R!=null?d=R+x.search+x.hash:w=!0}catch{}let E=Fo(d,{relative:s}),p=xl(d,{replace:a,state:l,target:c,preventScrollReset:u,relative:s,viewTransition:h});function y(_){n&&n(_),_.defaultPrevented||p(_)}return m.createElement("a",hr({},g,{href:v||E,onClick:w||i?n:y,ref:r,target:c}))}),qt=m.forwardRef(function(e,r){let{"aria-current":n="page",caseSensitive:s=!1,className:i="",end:a=!1,style:l,to:c,viewTransition:d,children:u}=e,h=bi(e,dl),g=Ir(c,{relative:h.relative}),b=X(),v=m.useContext(hi),{navigator:w,basename:E}=m.useContext(xe),p=v!=null&&wl(g)&&d===!0,y=w.encodeLocation?w.encodeLocation(g).pathname:g.pathname,_=b.pathname,x=v&&v.navigation&&v.navigation.location?v.navigation.location.pathname:null;s||(_=_.toLowerCase(),x=x?x.toLowerCase():null,y=y.toLowerCase()),x&&E&&(x=it(x,E)||x);const R=y!=="/"&&y.endsWith("/")?y.length-1:y.length;let A=_===y||!a&&_.startsWith(y)&&_.charAt(R)==="/",j=x!=null&&(x===y||!a&&x.startsWith(y)&&x.charAt(y.length)==="/"),q={isActive:A,isPending:j,isTransitioning:p},le=A?n:void 0,G;typeof i=="function"?G=i(q):G=[i,A?"active":null,j?"pending":null,p?"transitioning":null].filter(Boolean).join(" ");let te=typeof l=="function"?l(q):l;return m.createElement(M,hr({},h,{"aria-current":le,className:G,ref:r,style:te,to:c,viewTransition:d}),typeof u=="function"?u(q):u)});var ln;(function(t){t.UseScrollRestoration="useScrollRestoration",t.UseSubmit="useSubmit",t.UseSubmitFetcher="useSubmitFetcher",t.UseFetcher="useFetcher",t.useViewTransitionState="useViewTransitionState"})(ln||(ln={}));var as;(function(t){t.UseFetcher="useFetcher",t.UseFetchers="useFetchers",t.UseScrollRestoration="useScrollRestoration"})(as||(as={}));function bl(t){let e=m.useContext(Nr);return e||D(!1),e}function xl(t,e){let{target:r,replace:n,state:s,preventScrollReset:i,relative:a,viewTransition:l}=e===void 0?{}:e,c=we(),d=X(),u=Ir(t,{relative:a});return m.useCallback(h=>{if(ll(h,r)){h.preventDefault();let g=n!==void 0?n:ur(d)===ur(u);c(t,{replace:g,state:s,preventScrollReset:i,relative:a,viewTransition:l})}},[d,c,u,n,s,r,t,i,a,l])}function xi(t){let e=m.useRef(on(t)),r=m.useRef(!1),n=X(),s=m.useMemo(()=>cl(n.search,r.current?null:e.current),[n.search]),i=we(),a=m.useCallback((l,c)=>{const d=on(typeof l=="function"?l(s):l);r.current=!0,i("?"+d,c)},[i,s]);return[s,a]}function wl(t,e){e===void 0&&(e={});let r=m.useContext(fl);r==null&&D(!1);let{basename:n}=bl(ln.useViewTransitionState),s=Ir(t,{relative:e.relative});if(!r.isTransitioning)return!1;let i=it(r.currentLocation.pathname,n)||r.currentLocation.pathname,a=it(r.nextLocation.pathname,n)||r.nextLocation.pathname;return sn(s.pathname,a)!=null||sn(s.pathname,i)!=null}let vl={data:""},El=t=>{if(typeof window=="object"){let e=(t?t.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return e.nonce=window.__nonce__,e.parentNode||(t||document.head).appendChild(e),e.firstChild}return t||vl},_l=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,Nl=/\/\*[^]*?\*\/|  +/g,os=/\n+/g,Se=(t,e)=>{let r="",n="",s="";for(let i in t){let a=t[i];i[0]=="@"?i[1]=="i"?r=i+" "+a+";":n+=i[1]=="f"?Se(a,i):i+"{"+Se(a,i[1]=="k"?"":e)+"}":typeof a=="object"?n+=Se(a,e?e.replace(/([^,])+/g,l=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,c=>/&/.test(c)?c.replace(/&/g,l):l?l+" "+c:c)):i):a!=null&&(i=i[1]=="-"?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=Se.p?Se.p(i,a):i+":"+a+";")}return r+(e&&s?e+"{"+s+"}":s)+n},_e={},wi=t=>{if(typeof t=="object"){let e="";for(let r in t)e+=r+wi(t[r]);return e}return t},Sl=(t,e,r,n,s)=>{let i=wi(t),a=_e[i]||(_e[i]=(c=>{let d=0,u=11;for(;d<c.length;)u=101*u+c.charCodeAt(d++)>>>0;return"go"+u})(i));if(!_e[a]){let c=i!==t?t:(d=>{let u,h,g=[{}];for(;u=_l.exec(d.replace(Nl,""));)u[4]?g.shift():u[3]?(h=u[3].replace(os," ").trim(),g.unshift(g[0][h]=g[0][h]||{})):g[0][u[1]]=u[2].replace(os," ").trim();return g[0]})(t);_e[a]=Se(s?{["@keyframes "+a]:c}:c,r?"":"."+a)}let l=r&&_e.g;return r&&(_e.g=_e[a]),((c,d,u,h)=>{h?d.data=d.data.replace(h,c):d.data.indexOf(c)===-1&&(d.data=u?c+d.data:d.data+c)})(_e[a],e,n,l),a},Il=(t,e,r)=>t.reduce((n,s,i)=>{let a=e[i];if(a&&a.call){let l=a(r),c=l&&l.props&&l.props.className||/^go/.test(l)&&l;a=c?"."+c:l&&typeof l=="object"?l.props?"":Se(l,""):l===!1?"":l}return n+s+(a??"")},"");function Rr(t){let e=this||{},r=t.call?t(e.p):t;return Sl(r.unshift?r.raw?Il(r,[].slice.call(arguments,1),e.p):r.reduce((n,s)=>Object.assign(n,s&&s.call?s(e.p):s),{}):r,El(e.target),e.g,e.o,e.k)}let vi,cn,un;Rr.bind({g:1});let ge=Rr.bind({k:1});function Rl(t,e,r,n){Se.p=e,vi=t,cn=r,un=n}function je(t,e){let r=this||{};return function(){let n=arguments;function s(i,a){let l=Object.assign({},i),c=l.className||s.className;r.p=Object.assign({theme:cn&&cn()},l),r.o=/go\d/.test(c),l.className=Rr.apply(r,n)+(c?" "+c:"");let d=t;return t[0]&&(d=l.as||t,delete l.as),un&&d[0]&&un(l),vi(d,l)}return s}}var kl=t=>typeof t=="function",fr=(t,e)=>kl(t)?t(e):t,Cl=(()=>{let t=0;return()=>(++t).toString()})(),Ei=(()=>{let t;return()=>{if(t===void 0&&typeof window<"u"){let e=matchMedia("(prefers-reduced-motion: reduce)");t=!e||e.matches}return t}})(),Tl=20,Nn="default",_i=(t,e)=>{let{toastLimit:r}=t.settings;switch(e.type){case 0:return{...t,toasts:[e.toast,...t.toasts].slice(0,r)};case 1:return{...t,toasts:t.toasts.map(a=>a.id===e.toast.id?{...a,...e.toast}:a)};case 2:let{toast:n}=e;return _i(t,{type:t.toasts.find(a=>a.id===n.id)?1:0,toast:n});case 3:let{toastId:s}=e;return{...t,toasts:t.toasts.map(a=>a.id===s||s===void 0?{...a,dismissed:!0,visible:!1}:a)};case 4:return e.toastId===void 0?{...t,toasts:[]}:{...t,toasts:t.toasts.filter(a=>a.id!==e.toastId)};case 5:return{...t,pausedAt:e.time};case 6:let i=e.time-(t.pausedAt||0);return{...t,pausedAt:void 0,toasts:t.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+i}))}}},Zt=[],Ni={toasts:[],pausedAt:void 0,settings:{toastLimit:Tl}},se={},Si=(t,e=Nn)=>{se[e]=_i(se[e]||Ni,t),Zt.forEach(([r,n])=>{r===e&&n(se[e])})},Ii=t=>Object.keys(se).forEach(e=>Si(t,e)),Pl=t=>Object.keys(se).find(e=>se[e].toasts.some(r=>r.id===t)),kr=(t=Nn)=>e=>{Si(e,t)},Al={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},jl=(t={},e=Nn)=>{let[r,n]=m.useState(se[e]||Ni),s=m.useRef(se[e]);m.useEffect(()=>(s.current!==se[e]&&n(se[e]),Zt.push([e,n]),()=>{let a=Zt.findIndex(([l])=>l===e);a>-1&&Zt.splice(a,1)}),[e]);let i=r.toasts.map(a=>{var l,c,d;return{...t,...t[a.type],...a,removeDelay:a.removeDelay||((l=t[a.type])==null?void 0:l.removeDelay)||(t==null?void 0:t.removeDelay),duration:a.duration||((c=t[a.type])==null?void 0:c.duration)||(t==null?void 0:t.duration)||Al[a.type],style:{...t.style,...(d=t[a.type])==null?void 0:d.style,...a.style}}});return{...r,toasts:i}},Ol=(t,e="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:e,ariaProps:{role:"status","aria-live":"polite"},message:t,pauseDuration:0,...r,id:(r==null?void 0:r.id)||Cl()}),Pt=t=>(e,r)=>{let n=Ol(e,t,r);return kr(n.toasterId||Pl(n.id))({type:2,toast:n}),n.id},U=(t,e)=>Pt("blank")(t,e);U.error=Pt("error");U.success=Pt("success");U.loading=Pt("loading");U.custom=Pt("custom");U.dismiss=(t,e)=>{let r={type:3,toastId:t};e?kr(e)(r):Ii(r)};U.dismissAll=t=>U.dismiss(void 0,t);U.remove=(t,e)=>{let r={type:4,toastId:t};e?kr(e)(r):Ii(r)};U.removeAll=t=>U.remove(void 0,t);U.promise=(t,e,r)=>{let n=U.loading(e.loading,{...r,...r==null?void 0:r.loading});return typeof t=="function"&&(t=t()),t.then(s=>{let i=e.success?fr(e.success,s):void 0;return i?U.success(i,{id:n,...r,...r==null?void 0:r.success}):U.dismiss(n),s}).catch(s=>{let i=e.error?fr(e.error,s):void 0;i?U.error(i,{id:n,...r,...r==null?void 0:r.error}):U.dismiss(n)}),t};var Dl=1e3,Ll=(t,e="default")=>{let{toasts:r,pausedAt:n}=jl(t,e),s=m.useRef(new Map).current,i=m.useCallback((h,g=Dl)=>{if(s.has(h))return;let b=setTimeout(()=>{s.delete(h),a({type:4,toastId:h})},g);s.set(h,b)},[]);m.useEffect(()=>{if(n)return;let h=Date.now(),g=r.map(b=>{if(b.duration===1/0)return;let v=(b.duration||0)+b.pauseDuration-(h-b.createdAt);if(v<0){b.visible&&U.dismiss(b.id);return}return setTimeout(()=>U.dismiss(b.id,e),v)});return()=>{g.forEach(b=>b&&clearTimeout(b))}},[r,n,e]);let a=m.useCallback(kr(e),[e]),l=m.useCallback(()=>{a({type:5,time:Date.now()})},[a]),c=m.useCallback((h,g)=>{a({type:1,toast:{id:h,height:g}})},[a]),d=m.useCallback(()=>{n&&a({type:6,time:Date.now()})},[n,a]),u=m.useCallback((h,g)=>{let{reverseOrder:b=!1,gutter:v=8,defaultPosition:w}=g||{},E=r.filter(_=>(_.position||w)===(h.position||w)&&_.height),p=E.findIndex(_=>_.id===h.id),y=E.filter((_,x)=>x<p&&_.visible).length;return E.filter(_=>_.visible).slice(...b?[y+1]:[0,y]).reduce((_,x)=>_+(x.height||0)+v,0)},[r]);return m.useEffect(()=>{r.forEach(h=>{if(h.dismissed)i(h.id,h.removeDelay);else{let g=s.get(h.id);g&&(clearTimeout(g),s.delete(h.id))}})},[r,i]),{toasts:r,handlers:{updateHeight:c,startPause:l,endPause:d,calculateOffset:u}}},Ml=ge`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Ul=ge`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Fl=ge`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Bl=je("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Ml} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Ul} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${t=>t.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${Fl} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,$l=ge`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Hl=je("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${t=>t.secondary||"#e0e0e0"};
  border-right-color: ${t=>t.primary||"#616161"};
  animation: ${$l} 1s linear infinite;
`,zl=ge`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Vl=ge`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,Wl=je("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${zl} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Vl} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${t=>t.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,ql=je("div")`
  position: absolute;
`,Kl=je("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Gl=ge`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Jl=je("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Gl} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Xl=({toast:t})=>{let{icon:e,type:r,iconTheme:n}=t;return e!==void 0?typeof e=="string"?m.createElement(Jl,null,e):e:r==="blank"?null:m.createElement(Kl,null,m.createElement(Hl,{...n}),r!=="loading"&&m.createElement(ql,null,r==="error"?m.createElement(Bl,{...n}):m.createElement(Wl,{...n})))},Yl=t=>`
0% {transform: translate3d(0,${t*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Zl=t=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${t*-150}%,-1px) scale(.6); opacity:0;}
`,Ql="0%{opacity:0;} 100%{opacity:1;}",ec="0%{opacity:1;} 100%{opacity:0;}",tc=je("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,rc=je("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,nc=(t,e)=>{let r=t.includes("top")?1:-1,[n,s]=Ei()?[Ql,ec]:[Yl(r),Zl(r)];return{animation:e?`${ge(n)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${ge(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},sc=m.memo(({toast:t,position:e,style:r,children:n})=>{let s=t.height?nc(t.position||e||"top-center",t.visible):{opacity:0},i=m.createElement(Xl,{toast:t}),a=m.createElement(rc,{...t.ariaProps},fr(t.message,t));return m.createElement(tc,{className:t.className,style:{...s,...r,...t.style}},typeof n=="function"?n({icon:i,message:a}):m.createElement(m.Fragment,null,i,a))});Rl(m.createElement);var ic=({id:t,className:e,style:r,onHeightUpdate:n,children:s})=>{let i=m.useCallback(a=>{if(a){let l=()=>{let c=a.getBoundingClientRect().height;n(t,c)};l(),new MutationObserver(l).observe(a,{subtree:!0,childList:!0,characterData:!0})}},[t,n]);return m.createElement("div",{ref:i,className:e,style:r},s)},ac=(t,e)=>{let r=t.includes("top"),n=r?{top:0}:{bottom:0},s=t.includes("center")?{justifyContent:"center"}:t.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:Ei()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${e*(r?1:-1)}px)`,...n,...s}},oc=Rr`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,Kt=16,lc=({reverseOrder:t,position:e="top-center",toastOptions:r,gutter:n,children:s,toasterId:i,containerStyle:a,containerClassName:l})=>{let{toasts:c,handlers:d}=Ll(r,i);return m.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:Kt,left:Kt,right:Kt,bottom:Kt,pointerEvents:"none",...a},className:l,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(u=>{let h=u.position||e,g=d.calculateOffset(u,{reverseOrder:t,gutter:n,defaultPosition:e}),b=ac(h,g);return m.createElement(ic,{id:u.id,key:u.id,onHeightUpdate:d.updateHeight,className:u.visible?oc:"",style:b},u.type==="custom"?fr(u.message,u):s?s(u):m.createElement(sc,{toast:u,position:h}))}))},ze=U;function Ri(t,e){return function(){return t.apply(e,arguments)}}const{toString:cc}=Object.prototype,{getPrototypeOf:Ae}=Object,{iterator:At,toStringTag:ki}=Symbol,St=(({hasOwnProperty:t})=>(e,r)=>t.call(e,r))(Object.prototype),Ci=t=>typeof t=="string"&&(t==="__proto__"||t==="constructor"||t==="prototype"),Ti=(t,e,r)=>t===Object.prototype||!r&&e===null,uc=t=>{if(!Object.isExtensible(t))return!1;const e=Object.getOwnPropertyNames(t);return Object.getOwnPropertySymbols&&e.push(...Object.getOwnPropertySymbols(t)),e.every(r=>{if(Ci(r))return!1;const n=Object.getOwnPropertyDescriptor(t,r);return!!n&&n.configurable&&n.writable===!0})},It=(t,e)=>{let r=t;const n=[];for(;r!=null;){if(n.indexOf(r)!==-1)return!1;n.push(r);const s=Ae(r);if(Ti(r,s,r===t))return!1;if(St(r,e))return!0;r=s}return!1},dc=(t,e)=>t!=null&&It(t,e)?t[e]:void 0,hc=t=>{if(t==null||typeof t!="object"&&typeof t!="function")return t;const e=Ae(t);if(e===null&&uc(t))return t;const r=Object.create(null),n=Object.create(null),s=[];let i=t;for(;i!=null&&s.indexOf(i)===-1;){s.push(i);const a=i===t?e:Ae(i);if(Ti(i,a,i===t))break;const l=Object.getOwnPropertyNames(i);Object.getOwnPropertySymbols&&l.push(...Object.getOwnPropertySymbols(i));for(const c of l)Ci(c)||St(n,c)||(r[c]=t[c],n[c]=!0);i=a}return r},Sn=(t=>e=>{const r=cc.call(e);return t[r]||(t[r]=r.slice(8,-1).toLowerCase())})(Object.create(null)),Y=t=>(t=t.toLowerCase(),e=>Sn(e)===t),Cr=t=>e=>typeof e===t,{isArray:Ve}=Array,We=Cr("undefined");function ht(t){return t!==null&&!We(t)&&t.constructor!==null&&!We(t.constructor)&&K(t.constructor.isBuffer)&&t.constructor.isBuffer(t)}const Pi=Y("ArrayBuffer");function fc(t){let e;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?e=ArrayBuffer.isView(t):e=t&&t.buffer&&Pi(t.buffer),e}const pc=Cr("string"),K=Cr("function"),Ai=Cr("number"),ft=t=>t!==null&&typeof t=="object",mc=t=>t===!0||t===!1,Qt=t=>{if(!ft(t))return!1;const e=Ae(t);return(e===null||e===Object.prototype||Ae(e)===null)&&!It(t,ki)&&!It(t,At)},gc=t=>{if(!ft(t)||ht(t))return!1;try{return Object.keys(t).length===0&&Object.getPrototypeOf(t)===Object.prototype}catch{return!1}},yc=Y("Date"),bc=Y("File"),xc=t=>!!(t&&typeof t.uri<"u"),wc=t=>t&&typeof t.getParts<"u",vc=Y("Blob"),Ec=Y("FileList"),_c=Y("Set"),Nc=t=>ft(t)&&K(t.pipe);function Sc(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const ls=Sc(),cs=typeof ls.FormData<"u"?ls.FormData:void 0,Ic=t=>{if(!t)return!1;if(cs&&t instanceof cs)return!0;const e=Ae(t);if(!e||e===Object.prototype||!K(t.append))return!1;const r=Sn(t);return r==="formdata"||r==="object"&&K(t.toString)&&t.toString()==="[object FormData]"},Rc=Y("URLSearchParams"),[kc,Cc,Tc,Pc]=["ReadableStream","Request","Response","Headers"].map(Y),Ac=t=>t.trim?t.trim():t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function jt(t,e,{allOwnKeys:r=!1}={}){if(t===null||typeof t>"u")return;let n,s;if(typeof t!="object"&&(t=[t]),Ve(t))for(n=0,s=t.length;n<s;n++)e.call(null,t[n],n,t);else{if(ht(t))return;const i=r?Object.getOwnPropertyNames(t):Object.keys(t),a=i.length;let l;for(n=0;n<a;n++)l=i[n],e.call(null,t[l],l,t)}}function ji(t,e){if(ht(t))return null;e=e.toLowerCase();const r=Object.keys(t);let n=r.length,s;for(;n-- >0;)if(s=r[n],e===s.toLowerCase())return s;return null}const Ue=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,Oi=t=>!We(t)&&t!==Ue;function dn(...t){const{caseless:e,skipUndefined:r}=Oi(this)&&this||{},n={},s=(i,a)=>{if(a==="__proto__"||a==="constructor"||a==="prototype")return;const l=e&&typeof a=="string"&&ji(n,a)||a,c=St(n,l)?n[l]:void 0;Qt(c)&&Qt(i)?n[l]=dn(c,i):Qt(i)?n[l]=dn({},i):Ve(i)?n[l]=i.slice():(!r||!We(i))&&(n[l]=i)};for(let i=0,a=t.length;i<a;i++){const l=t[i];if(!l||ht(l)||(jt(l,s),typeof l!="object"||Ve(l)))continue;const c=Object.getOwnPropertySymbols(l);for(let d=0;d<c.length;d++){const u=c[d];Vc.call(l,u)&&s(l[u],u)}}return n}const jc=(t,e,r,{allOwnKeys:n}={})=>(jt(e,(s,i)=>{r&&K(s)?Object.defineProperty(t,i,{__proto__:null,value:Ri(s,r),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(t,i,{__proto__:null,value:s,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:n}),t),Oc=t=>(t.charCodeAt(0)===65279&&(t=t.slice(1)),t),Dc=(t,e,r,n)=>{t.prototype=Object.create(e.prototype,n),Object.defineProperty(t.prototype,"constructor",{__proto__:null,value:t,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(t,"super",{__proto__:null,value:e.prototype}),r&&Object.assign(t.prototype,r)},Lc=(t,e,r,n)=>{let s,i,a;const l={};if(e=e||{},t==null)return e;do{for(s=Object.getOwnPropertyNames(t),i=s.length;i-- >0;)a=s[i],(!n||n(a,t,e))&&!l[a]&&(e[a]=t[a],l[a]=!0);t=r!==!1&&Ae(t)}while(t&&(!r||r(t,e))&&t!==Object.prototype);return e},Mc=(t,e,r)=>{t=String(t),(r===void 0||r>t.length)&&(r=t.length),r-=e.length;const n=t.indexOf(e,r);return n!==-1&&n===r},Uc=t=>{if(!t)return null;if(Ve(t))return t;let e=t.length;if(!Ai(e))return null;const r=new Array(e);for(;e-- >0;)r[e]=t[e];return r},Fc=(t=>e=>t&&e instanceof t)(typeof Uint8Array<"u"&&Ae(Uint8Array)),Bc=(t,e)=>{const n=(t&&t[At]).call(t);let s;for(;(s=n.next())&&!s.done;){const i=s.value;e.call(t,i[0],i[1])}},$c=(t,e)=>{let r;const n=[];for(;(r=t.exec(e))!==null;)n.push(r);return n},Hc=Y("HTMLFormElement"),zc=t=>t.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(r,n,s){return n.toUpperCase()+s}),{propertyIsEnumerable:Vc}=Object.prototype,Wc=Y("RegExp"),Di=(t,e)=>{const r=Object.getOwnPropertyDescriptors(t),n={};jt(r,(s,i)=>{let a;(a=e(s,i,t))!==!1&&(n[i]=a||s)}),Object.defineProperties(t,n)},qc=t=>{Di(t,(e,r)=>{if(K(t)&&["arguments","caller","callee"].includes(r))return!1;const n=t[r];if(K(n)){if(e.enumerable=!1,"writable"in e){e.writable=!1;return}e.set||(e.set=()=>{throw Error("Can not rewrite read-only method '"+r+"'")})}})},Kc=(t,e)=>{const r={},n=s=>{s.forEach(i=>{r[i]=!0})};return Ve(t)?n(t):n(String(t).split(e)),r},Gc=()=>{},Jc=(t,e)=>t!=null&&Number.isFinite(t=+t)?t:e;function Xc(t){return!!(t&&K(t.append)&&t[ki]==="FormData"&&t[At])}const Yc=t=>{const e=new WeakSet,r=n=>{if(ft(n)){if(e.has(n))return;if(ht(n))return n;if(!("toJSON"in n)){e.add(n);let s;if(_c(n)){s=[];for(const i of n){const a=r(i);!We(a)&&s.push(a)}}else s=Ve(n)?[]:{},jt(n,(i,a)=>{const l=r(i);!We(l)&&(s[a]=l)});return e.delete(n),s}}return n};return r(t)},Zc=Y("AsyncFunction"),Qc=t=>t&&(ft(t)||K(t))&&K(t.then)&&K(t.catch),Li=((t,e)=>t?setImmediate:e?((r,n)=>(Ue.addEventListener("message",({source:s,data:i})=>{s===Ue&&i===r&&n.length&&n.shift()()},!1),s=>{n.push(s),Ue.postMessage(r,"*")}))(`axios@${Math.random()}`,[]):r=>setTimeout(r))(typeof setImmediate=="function",K(Ue.postMessage)),eu=typeof queueMicrotask<"u"?queueMicrotask.bind(Ue):typeof process<"u"&&process.nextTick||Li,Mi=t=>t!=null&&K(t[At]),tu=t=>t!=null&&It(t,At)&&Mi(t),f={isArray:Ve,isArrayBuffer:Pi,isBuffer:ht,isFormData:Ic,isArrayBufferView:fc,isString:pc,isNumber:Ai,isBoolean:mc,isObject:ft,isPlainObject:Qt,isEmptyObject:gc,isReadableStream:kc,isRequest:Cc,isResponse:Tc,isHeaders:Pc,isUndefined:We,isDate:yc,isFile:bc,isReactNativeBlob:xc,isReactNative:wc,isBlob:vc,isRegExp:Wc,isFunction:K,isStream:Nc,isURLSearchParams:Rc,isTypedArray:Fc,isFileList:Ec,forEach:jt,merge:dn,extend:jc,trim:Ac,stripBOM:Oc,inherits:Dc,toFlatObject:Lc,kindOf:Sn,kindOfTest:Y,endsWith:Mc,toArray:Uc,forEachEntry:Bc,matchAll:$c,isHTMLForm:Hc,hasOwnProperty:St,hasOwnProp:St,hasOwnInPrototypeChain:It,getSafeProp:dc,toSafeFlatObject:hc,reduceDescriptors:Di,freezeMethods:qc,toObjectSet:Kc,toCamelCase:zc,noop:Gc,toFiniteNumber:Jc,findKey:ji,global:Ue,isContextDefined:Oi,isSpecCompliantForm:Xc,toJSONObject:Yc,isAsyncFn:Zc,isThenable:Qc,setImmediate:Li,asap:eu,isIterable:Mi,isSafeIterable:tu},ru=f.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),nu=t=>{const e={};let r,n,s;return t&&t.split(`
`).forEach(function(a){s=a.indexOf(":"),r=a.substring(0,s).trim().toLowerCase(),n=a.substring(s+1).trim();const l=f.hasOwnProp(e,r);!r||l&&f.hasOwnProp(ru,r)||(r==="set-cookie"?l?e[r].push(n):e[r]=[n]:e[r]=l?e[r]+", "+n:n)}),e};function su(t){let e=0,r=t.length;for(;e<r;){const n=t.charCodeAt(e);if(n!==9&&n!==32)break;e+=1}for(;r>e;){const n=t.charCodeAt(r-1);if(n!==9&&n!==32)break;r-=1}return e===0&&r===t.length?t:t.slice(e,r)}const iu=new RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+","g"),au=new RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+","g");function In(t,e){return f.isArray(t)?t.map(r=>In(r,e)):su(String(t).replace(e,""))}const ou=t=>In(t,iu),lu=t=>In(t,au);function Ui(t){const e=Object.create(null);return f.forEach(t.toJSON(),(r,n)=>{e[n]=lu(r)}),e}const us=Symbol("internals");function bt(t){return t&&String(t).trim().toLowerCase()}function er(t){return t===!1||t==null?t:f.isArray(t)?t.map(er):ou(String(t))}function cu(t){const e=Object.create(null),r=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let n;for(;n=r.exec(t);)e[n[1]]=n[2];return e}const uu=/^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;function Hr(t){let e=0,r=t.length;for(;e<r;){const n=t.charCodeAt(e);if(n!==9&&n!==32)break;e+=1}for(;r>e;){const n=t.charCodeAt(r-1);if(n!==9&&n!==32)break;r-=1}return e===0&&r===t.length?t:t.slice(e,r)}function du(t){const e=t.length-1;if(e<1||t.charCodeAt(0)!==34||t.charCodeAt(e)!==34)return t;let r="";for(let n=1;n<e;n++){const s=t.charCodeAt(n);if(s===34||s===92&&(n+=1,n>=e))return t;r+=t[n]}return r}function hu(t){const e=Object.create(null),r=String(t);let n=0,s=!1,i=!1;function a(l){const c=Hr(r.slice(n,l)),d=c.indexOf("=");if(d<1)return;const u=Hr(c.slice(0,d));if(!uu.test(u))return;const h=u.toLowerCase();if(h==="__proto__"||h==="constructor"||h==="prototype")return;const g=Hr(c.slice(d+1));e[h]=du(g)}for(let l=0;l<r.length;l++){const c=r.charCodeAt(l);s?i?i=!1:c===92?i=!0:c===34&&(s=!1):c===34?s=!0:(c===44||c===59)&&(a(l),n=l+1)}return a(r.length),e}const fu=t=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());function zr(t,e,r,n,s){if(f.isFunction(n))return n.call(this,e,r);if(s&&(e=r),!!f.isString(e)){if(f.isString(n))return e.indexOf(n)!==-1;if(f.isRegExp(n))return n.test(e)}}function pu(t){return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(e,r,n)=>r.toUpperCase()+n)}function mu(t,e){const r=f.toCamelCase(" "+e);["get","set","has"].forEach(n=>{Object.defineProperty(t,n+r,{__proto__:null,value:function(s,i,a){return this[n].call(this,e,s,i,a)},configurable:!0})})}let z=class{constructor(e){e&&this.set(e)}set(e,r,n){const s=this;function i(l,c,d){const u=bt(c);if(!u)return;const h=f.findKey(s,u);(!h||s[h]===void 0||d===!0||d===void 0&&s[h]!==!1)&&(s[h||c]=er(l))}const a=(l,c)=>f.forEach(l,(d,u)=>i(d,u,c));if(f.isPlainObject(e)||e instanceof this.constructor)a(e,r);else if(f.isString(e)&&(e=e.trim())&&!fu(e))a(nu(e),r);else if(f.isObject(e)&&f.isSafeIterable(e)){let l=Object.create(null),c,d;for(const u of e){if(!f.isArray(u))throw new TypeError("Object iterator must return a key-value pair");d=u[0],f.hasOwnProp(l,d)?(c=l[d],l[d]=f.isArray(c)?[...c,u[1]]:[c,u[1]]):l[d]=u[1]}a(l,r)}else e!=null&&i(r,e,n);return this}get(e,r){if(e=bt(e),e){const n=f.findKey(this,e);if(n){const s=this[n];if(!r)return s;if(r===!0)return cu(s);if(f.isFunction(r))return r.call(this,s,n);if(f.isRegExp(r))return r.exec(s);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,r){if(e=bt(e),e){const n=f.findKey(this,e);return!!(n&&this[n]!==void 0&&(!r||zr(this,this[n],n,r)))}return!1}delete(e,r){const n=this;let s=!1;function i(a){if(a=bt(a),a){const l=f.findKey(n,a);l&&(!r||zr(n,n[l],l,r))&&(delete n[l],s=!0)}}return f.isArray(e)?e.forEach(i):i(e),s}clear(e){const r=Object.keys(this);let n=r.length,s=!1;for(;n--;){const i=r[n];(!e||zr(this,this[i],i,e,!0))&&(delete this[i],s=!0)}return s}normalize(e){const r=this,n={};return f.forEach(this,(s,i)=>{const a=f.findKey(n,i);if(a){r[a]=er(s),delete r[i];return}const l=e?pu(i):String(i).trim();l!==i&&delete r[i],r[l]=er(s),n[l]=!0}),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){const r=Object.create(null);return f.forEach(this,(n,s)=>{n!=null&&n!==!1&&(r[s]=e&&f.isArray(n)?n.join(", "):n)}),r}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([e,r])=>e+": "+r).join(`
`)}getSetCookie(){const e=this.get("set-cookie");return f.isArray(e)?e:e==null||e===!1?[]:[e]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static parseParameters(e){return hu(e)}static concat(e,...r){const n=new this(e);return r.forEach(s=>n.set(s)),n}static accessor(e){const n=(this[us]=this[us]={accessors:{}}).accessors,s=this.prototype;function i(a){const l=bt(a);n[l]||(mu(s,a),n[l]=!0)}return f.isArray(e)?e.forEach(i):i(e),this}};z.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);f.reduceDescriptors(z.prototype,({value:t},e)=>{let r=e[0].toUpperCase()+e.slice(1);return{get:()=>t,set(n){this[r]=n}}});f.freezeMethods(z);const pr="[REDACTED ****]";function gu(t){if(f.hasOwnProp(t,"toJSON"))return!0;let e=Object.getPrototypeOf(t);for(;e&&e!==Object.prototype;){if(f.hasOwnProp(e,"toJSON"))return!0;e=Object.getPrototypeOf(e)}return!1}function yu(t,e){const r=new Set(e.map(i=>String(i).toLowerCase())),n=[],s=i=>{if(i===null||typeof i!="object"||f.isBuffer(i))return i;if(n.indexOf(i)!==-1)return;i instanceof z&&(i=i.toJSON()),n.push(i);let a;if(f.isArray(i))a=[],i.forEach((l,c)=>{const d=s(l);f.isUndefined(d)||(a[c]=d)});else{if(!f.isPlainObject(i)&&gu(i))return n.pop(),i;a=Object.create(null);for(const[l,c]of Object.entries(i)){const d=r.has(l.toLowerCase())?pr:s(c);f.isUndefined(d)||(a[l]=d)}}return n.pop(),a};return s(t)}function ds(t){try{return String(t)}catch{return""}}function bu(t){return t.errors.map(r=>{try{return r&&r.message?ds(r.message):ds(r)}catch{return""}}).filter(Boolean).join("; ")||t.name||"AggregateError"}let N=class Fi extends Error{static from(e,r,n,s,i,a){let l=e.message;!l&&f.isArray(e.errors)&&e.errors.length&&(l=bu(e));const c=new Fi(l,r||e.code,n,s,i);return Object.defineProperty(c,"cause",{__proto__:null,value:e,writable:!0,enumerable:!1,configurable:!0}),c.name=e.name,e.status!=null&&c.status==null&&(c.status=e.status),a&&Object.assign(c,a),c}constructor(e,r,n,s,i){super(e),Object.defineProperty(this,"message",{__proto__:null,value:e,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,r&&(this.code=r),n&&(this.config=n),s&&(this.request=s),i&&(this.response=i,this.status=i.status)}toJSON(){const e=this.config,r=e&&f.hasOwnProp(e,"redact")?e.redact:void 0,n=f.isArray(r)&&r.length>0?yu(e,r):f.toJSONObject(e);return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:n,code:this.code,status:this.status}}};N.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";N.ERR_BAD_OPTION="ERR_BAD_OPTION";N.ECONNABORTED="ECONNABORTED";N.ETIMEDOUT="ETIMEDOUT";N.ECONNREFUSED="ECONNREFUSED";N.ERR_NETWORK="ERR_NETWORK";N.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";N.ERR_DEPRECATED="ERR_DEPRECATED";N.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";N.ERR_BAD_REQUEST="ERR_BAD_REQUEST";N.ERR_CANCELED="ERR_CANCELED";N.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";N.ERR_INVALID_URL="ERR_INVALID_URL";N.ERR_FORM_DATA_DEPTH_EXCEEDED="ERR_FORM_DATA_DEPTH_EXCEEDED";const xu=null,Bi=100;function hn(t){return f.isPlainObject(t)||f.isArray(t)}function $i(t){return f.endsWith(t,"[]")?t.slice(0,-2):t}function Vr(t,e,r){return t?t.concat(e).map(function(s,i){return s=$i(s),!r&&i?"["+s+"]":s}).join(r?".":""):e}function wu(t){return f.isArray(t)&&!t.some(hn)}const vu=f.toFlatObject(f,{},null,function(e){return/^is[A-Z]/.test(e)});function Tr(t,e,r){if(!f.isObject(t))throw new TypeError("target must be an object");e=e||new FormData;const n=(y,_)=>{const x=f.getSafeProp(r,y);return f.isUndefined(x)?_:x},s=n("metaTokens",!0),i=n("visitor")||w,a=n("dots",!1),l=n("indexes",!1),c=n("Blob")||typeof Blob<"u"&&Blob,d=n("maxDepth",Bi),u=c&&f.isSpecCompliantForm(e),h=[];if(!f.isFunction(i))throw new TypeError("visitor must be a function");function g(y){if(y===null)return"";if(f.isDate(y))return y.toISOString();if(f.isBoolean(y))return y.toString();if(!u&&f.isBlob(y))throw new N("Blob is not supported. Use a Buffer instead.");if(f.isArrayBuffer(y)||f.isTypedArray(y)){if(u&&typeof c=="function")return new c([y]);throw new N("Blob is not supported. Use a Buffer instead.",N.ERR_NOT_SUPPORT)}return y}function b(y){if(y>d)throw new N("Object is too deeply nested ("+y+" levels). Max depth: "+d,N.ERR_FORM_DATA_DEPTH_EXCEEDED)}function v(y,_){if(d===1/0)return JSON.stringify(y);const x=[];return JSON.stringify(y,function(A,j){if(!f.isObject(j))return j;for(;x.length&&x[x.length-1]!==this;)x.pop();return x.push(j),b(_+x.length-1),j})}function w(y,_,x){let R=y;if(f.isReactNative(e)&&f.isReactNativeBlob(y))return e.append(Vr(x,_,a),g(y)),!1;if(y&&!x&&typeof y=="object"){if(f.endsWith(_,"{}"))_=s?_:_.slice(0,-2),y=v(y,1);else if(f.isArray(y)&&wu(y)||(f.isFileList(y)||f.endsWith(_,"[]"))&&(R=f.toArray(y)))return _=$i(_),R.forEach(function(j,q){!(f.isUndefined(j)||j===null)&&e.append(l===!0?Vr([_],q,a):l===null?_:_+"[]",g(j))}),!1}return hn(y)?!0:(e.append(Vr(x,_,a),g(y)),!1)}const E=Object.assign(vu,{defaultVisitor:w,convertValue:g,isVisitable:hn});function p(y,_,x=0){if(!f.isUndefined(y)){if(b(x),h.indexOf(y)!==-1)throw new Error("Circular reference detected in "+_.join("."));h.push(y),f.forEach(y,function(A,j){(!(f.isUndefined(A)||A===null)&&i.call(e,A,f.isString(j)?j.trim():j,_,E))===!0&&p(A,_?_.concat(j):[j],x+1)}),h.pop()}}if(!f.isObject(t))throw new TypeError("data must be an object");return p(t),e}function hs(t){const e={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+"};return encodeURIComponent(t).replace(/[!'()~]|%20/g,function(n){return e[n]})}function Rn(t,e){this._pairs=[],t&&Tr(t,this,e)}const Hi=Rn.prototype;Hi.append=function(e,r){this._pairs.push([e,r])};Hi.toString=function(e){const r=e?n=>e.call(this,n,hs):hs;return this._pairs.map(function(s){return r(s[0])+"="+r(s[1])},"").join("&")};function Eu(t){return encodeURIComponent(t).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function zi(t,e,r){if(!e)return t;t=t||"";const n=f.isFunction(r)?{serialize:r}:r,s=f.getSafeProp(n,"encode")||Eu,i=f.getSafeProp(n,"serialize");let a;if(i?a=i(e,n):a=f.isURLSearchParams(e)?e.toString():new Rn(e,n).toString(s),a){const l=t.indexOf("#");l!==-1&&(t=t.slice(0,l)),t+=(t.indexOf("?")===-1?"?":"&")+a}return t}const xt=Symbol("internals");function Vi(t){return t?t.length:0}function fs(t){if(t)for(;t.length&&t[t.length-1]===null;)t.pop()}function wt(t,e){const r=t.handlers,n=Vi(r);r!==e.handlersRef?(e.handlersRef=r,e.handlerEntries.clear()):n!==e.handlersLength&&(n?e.handlerEntries.forEach(function(i,a){r[i.index]!==i.handler&&e.handlerEntries.delete(a)}):e.handlerEntries.clear()),e.handlersLength=n}class ps{constructor(){this.handlers=[],this[xt]={handlersRef:this.handlers,handlersLength:this.handlers.length,handlerEntries:new Map,iterationDepth:0,nextId:0}}use(e,r,n){const s={fulfilled:e,rejected:r,synchronous:n?n.synchronous:!1,runWhen:n?n.runWhen:null},i=this[xt];this.handlers==null&&(this.handlers=[]),wt(this,i);const a=i.nextId++;return this.handlers.push(s),i.handlerEntries.set(a,{handler:s,index:this.handlers.length-1}),i.handlersLength=this.handlers.length,a}eject(e){const r=this[xt];wt(this,r);const n=r.handlerEntries.get(e);if(n){if(r.handlerEntries.delete(e),this.handlers[n.index]!==n.handler)return;this.handlers[n.index]=null,r.iterationDepth||(fs(this.handlers),r.handlersLength=this.handlers.length)}}clear(){this.handlers&&(this.handlers=[],wt(this,this[xt]))}forEach(e){const r=this[xt];wt(this,r),r.iterationDepth++;try{f.forEach(this.handlers,function(s){s!==null&&e(s)})}finally{--r.iterationDepth||(wt(this,r),fs(this.handlers),r.handlersLength=Vi(this.handlers))}}}const kn={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0,advertiseZstdAcceptEncoding:!1,validateStatusUndefinedResolves:!0},_u=typeof URLSearchParams<"u"?URLSearchParams:Rn,Nu=typeof FormData<"u"?FormData:null,Su=typeof Blob<"u"?Blob:null,Iu={isBrowser:!0,classes:{URLSearchParams:_u,FormData:Nu,Blob:Su},protocols:["http","https","file","blob","url","data"]},Cn=typeof window<"u"&&typeof document<"u",fn=typeof navigator=="object"&&navigator||void 0,Ru=Cn&&(!fn||["ReactNative","NativeScript","NS"].indexOf(fn.product)<0),ku=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",Cu=Cn&&window.location.href||"http://localhost",Tu=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Cn,hasStandardBrowserEnv:Ru,hasStandardBrowserWebWorkerEnv:ku,navigator:fn,origin:Cu},Symbol.toStringTag,{value:"Module"})),F={...Tu,...Iu};function Pu(t,e){return Tr(t,new F.classes.URLSearchParams,{visitor:function(r,n,s,i){return F.isNode&&f.isBuffer(r)?(this.append(n,r.toString("base64")),!1):i.defaultVisitor.apply(this,arguments)},...e})}const ms=Bi;function Wi(t){if(t>ms)throw new N("FormData field is too deeply nested ("+t+" levels). Max depth: "+ms,N.ERR_FORM_DATA_DEPTH_EXCEEDED)}function Au(t){const e=[],r=/[^.[\]]+|\[([^.[\]]*)]/g;let n;for(;(n=r.exec(t))!==null;)Wi(e.length),e.push(n[0]==="[]"?"":n[1]||n[0]);return e}function ju(t){const e={},r=Object.keys(t);let n;const s=r.length;let i;for(n=0;n<s;n++)i=r[n],e[i]=t[i];return e}function qi(t){function e(r,n,s,i){Wi(i);let a=r[i++];if(a==="__proto__")return!0;const l=Number.isFinite(+a),c=i>=r.length;return a=!a&&f.isArray(s)?s.length:a,c?(f.hasOwnProp(s,a)?s[a]=f.isArray(s[a])?s[a].concat(n):[s[a],n]:s[a]=n,!l):((!f.hasOwnProp(s,a)||!f.isObject(s[a]))&&(s[a]=[]),e(r,n,s[a],i)&&f.isArray(s[a])&&(s[a]=ju(s[a])),!l)}if(f.isFormData(t)&&f.isFunction(t.entries)){const r={};return f.forEachEntry(t,(n,s)=>{e(Au(n),s,r,0)}),r}return null}const Ki=Object.freeze(["get","delete","head","options","post","put","patch","purge","link","unlink","query"]),Ze=(t,e)=>t!=null&&f.hasOwnProp(t,e)?t[e]:void 0;function Ou(t,e,r){if(f.isString(t))try{return(e||JSON.parse)(t),f.trim(t)}catch(n){if(n.name!=="SyntaxError")throw n}return(r||JSON.stringify)(t)}const Ot={transitional:kn,adapter:["xhr","http","fetch"],transformRequest:[function(e,r){const n=r.getContentType()||"",s=n.indexOf("application/json")>-1,i=f.isObject(e);if(i&&f.isHTMLForm(e)&&(e=new FormData(e)),f.isFormData(e))return s?JSON.stringify(qi(e)):e;if(f.isArrayBuffer(e)||f.isBuffer(e)||f.isStream(e)||f.isFile(e)||f.isBlob(e)||f.isReadableStream(e))return e;if(f.isArrayBufferView(e))return e.buffer;if(f.isURLSearchParams(e))return r.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let l;if(i){const c=Ze(this,"formSerializer");if(n.indexOf("application/x-www-form-urlencoded")>-1)return Pu(e,c).toString();if((l=f.isFileList(e))||n.indexOf("multipart/form-data")>-1){const d=Ze(this,"env"),u=d&&d.FormData;return Tr(l?{"files[]":e}:e,u&&new u,c)}}return i||s?(r.setContentType("application/json",!1),Ou(e)):e}],transformResponse:[function(e){const r=Ze(this,"transitional")||Ot.transitional,n=r&&r.forcedJSONParsing,s=Ze(this,"responseType"),i=s==="json";if(f.isResponse(e)||f.isReadableStream(e))return e;if(e&&f.isString(e)&&(n&&!s||i)){const l=!(r&&r.silentJSONParsing)&&i;try{return JSON.parse(e,Ze(this,"parseReviver"))}catch(c){if(l)throw c.name==="SyntaxError"?N.from(c,N.ERR_BAD_RESPONSE,this,null,Ze(this,"response")):c}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:F.classes.FormData,Blob:F.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};f.forEach(Ki,t=>{Ot.headers[t]={}});function Wr(t,e){const r=this||Ot,n=e||r,s=z.from(n.headers);let i=n.data;return f.forEach(t,function(l){i=l.call(r,i,s.normalize(),e?e.status:void 0)}),s.normalize(),i}function Gi(t){return!!(t&&t.__CANCEL__)}let Dt=class extends N{constructor(e,r,n){super(e??"canceled",N.ERR_CANCELED,r,n),this.name="CanceledError",this.__CANCEL__=!0}};function Ji(t,e,r){const n=r.config.validateStatus;!r.status||!n||n(r.status)?t(r):e(new N("Request failed with status code "+r.status,r.status>=400&&r.status<500?N.ERR_BAD_REQUEST:N.ERR_BAD_RESPONSE,r.config,r.request,r))}const Du=/[\t\n\r]/g;function Xi(t){if(typeof t!="string")return t;let e=0;for(;e<t.length&&t.charCodeAt(e)<=32;)e++;return t.slice(e).replace(Du,"")}function qr(t){const e=/^([-+\w]{1,25}):(?:\/\/)?/.exec(t);return e&&e[1]||""}function Lu(t,e){t=t||10;const r=new Array(t),n=new Array(t);let s=0,i=0,a;return e=e!==void 0?e:1e3,function(c){const d=Date.now(),u=n[i];a||(a=d),r[s]=c,n[s]=d;let h=i,g=0;for(;h!==s;)g+=r[h++],h=h%t;if(s=(s+1)%t,s===i&&(i=(i+1)%t),d-a<e)return;const b=u&&d-u;return b?Math.round(g*1e3/b):void 0}}function Mu(t,e){let r=0,n=1e3/e,s,i;const a=(u,h=Date.now())=>{r=h,s=null,i&&(clearTimeout(i),i=null),t(...u)};return[(...u)=>{const h=Date.now(),g=h-r;g>=n?a(u,h):(s=u,i||(i=setTimeout(()=>{i=null,a(s)},n-g)))},()=>s&&a(s),(...u)=>a(u)]}const mr=(t,e,r=3)=>{let n=0;const s=Lu(50,250);return Mu(i=>{if(!i||!f.isNumber(i.loaded))return;const a=i.loaded,l=i.lengthComputable?i.total:void 0,c=Math.max(0,l!=null?Math.min(a,l):a),d=Math.max(0,c-n),u=s(d);n=Math.max(n,c);const h={loaded:c,total:l,progress:l?c/l:void 0,bytes:d,rate:u||void 0,estimated:u&&l?(l-c)/u:void 0,event:i,lengthComputable:l!=null,[e?"download":"upload"]:!0};t(h)},r)},gs=(t,e)=>{const r=t!=null;return[n=>e[0]({lengthComputable:r,total:t,loaded:n}),e[1]]},ys=(t,e=f.asap)=>(...r)=>e(()=>t(...r)),Uu=F.hasStandardBrowserEnv?((t,e)=>r=>(r=new URL(r,F.origin),t.protocol===r.protocol&&t.host===r.host&&(e||t.port===r.port)))(new URL(F.origin),F.navigator&&/(msie|trident)/i.test(F.navigator.userAgent)):()=>!0,Fu=F.hasStandardBrowserEnv?{write(t,e,r,n,s,i,a){if(typeof document>"u")return;const l=[`${t}=${encodeURIComponent(e)}`];f.isNumber(r)&&l.push(`expires=${new Date(r).toUTCString()}`),f.isString(n)&&l.push(`path=${n}`),f.isString(s)&&l.push(`domain=${s}`),i===!0&&l.push("secure"),f.isString(a)&&l.push(`SameSite=${a}`),document.cookie=l.join("; ")},read(t){if(typeof document>"u")return null;const e=document.cookie.split(";");for(let r=0;r<e.length;r++){const n=e[r].replace(/^\s+/,""),s=n.indexOf("=");if(s!==-1&&n.slice(0,s)===t)try{return decodeURIComponent(n.slice(s+1))}catch{return n.slice(s+1)}}return null},remove(t){this.write(t,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function Bu(t){return typeof t!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)}function $u(t,e){if(!e)return t;let r=t.length;for(;r>0&&t.charCodeAt(r-1)===47;)r--;return t.slice(0,r)+"/"+e.replace(/^\/+/,"")}const Hu=/^https?:(?!\/\/)/i;function zu(t){return t&&t.replace(/(^|&)([^=&]*=)?[^&]+/g,(e,r,n="")=>`${r}${n}${pr}`)}function Vu(t){const e=t.replace(/^(https?:\/{0,2})[^/?#]*@/i,`$1${pr}@`),r=e.indexOf("#"),s=(r===-1?e:e.slice(0,r)).replace(/([?&][^=&#]*=)[^&#]*/g,`$1${pr}`);return r===-1?s:`${s}#${zu(e.slice(r+1))}`}function bs(t,e){if(typeof t=="string"){const r=Xi(t);if(Hu.test(r))throw new N(`Invalid URL ${JSON.stringify(Vu(r))}: missing "//" after protocol`,N.ERR_INVALID_URL,e)}}function Yi(t,e,r,n){bs(e,n);let s=!Bu(e);return t&&(s||r===!1)?(bs(t,n),$u(t,e)):e}const xs=t=>t instanceof z?{...t}:t,Wu=t=>Object.getOwnPropertySymbols&&Object.getOwnPropertyDescriptor?Object.keys(t).concat(Object.getOwnPropertySymbols(t).filter(e=>Object.getOwnPropertyDescriptor(t,e).enumerable)):Object.keys(t);function qe(t,e){t=t||{},e=e||{};const r=Object.create(null);Object.defineProperty(r,"hasOwnProperty",{__proto__:null,value:Object.prototype.hasOwnProperty,enumerable:!1,writable:!0,configurable:!0});function n(u,h,g,b){return f.isPlainObject(u)&&f.isPlainObject(h)?f.merge.call({caseless:b},u,h):f.isPlainObject(h)?f.merge({},h):f.isArray(h)?h.slice():h}function s(u,h,g,b){if(f.isUndefined(h)){if(!f.isUndefined(u))return n(void 0,u,g,b)}else return n(u,h,g,b)}function i(u,h){if(!f.isUndefined(h))return n(void 0,h)}function a(u,h){if(f.isUndefined(h)){if(!f.isUndefined(u))return n(void 0,u)}else return n(void 0,h)}function l(u){const h=f.hasOwnProp(e,"transitional")?e.transitional:void 0;if(!f.isUndefined(h))if(f.isPlainObject(h)){if(f.hasOwnProp(h,u))return h[u]}else return;const g=f.hasOwnProp(t,"transitional")?t.transitional:void 0;if(f.isPlainObject(g)&&f.hasOwnProp(g,u))return g[u]}function c(u,h,g){if(f.hasOwnProp(e,g))return n(u,h);if(f.hasOwnProp(t,g))return n(void 0,u)}const d={url:i,method:i,data:i,baseURL:a,transformRequest:a,transformResponse:a,paramsSerializer:a,timeout:a,timeoutErrorMessage:a,withCredentials:a,withXSRFToken:a,adapter:a,responseType:a,xsrfCookieName:a,xsrfHeaderName:a,onUploadProgress:a,onDownloadProgress:a,decompress:a,maxContentLength:a,maxBodyLength:a,beforeRedirect:a,transport:a,httpAgent:a,httpsAgent:a,cancelToken:a,socketPath:a,allowedSocketPaths:a,responseEncoding:a,validateStatus:c,headers:(u,h,g)=>s(xs(u),xs(h),g,!0)};return f.forEach(Wu({...t,...e}),function(h){if(h==="__proto__"||h==="constructor"||h==="prototype")return;const g=f.hasOwnProp(d,h)?d[h]:s,b=f.hasOwnProp(t,h)?t[h]:void 0,v=f.hasOwnProp(e,h)?e[h]:void 0,w=g(b,v,h);f.isUndefined(w)&&g!==c||(r[h]=w)}),f.hasOwnProp(e,"validateStatus")&&f.isUndefined(e.validateStatus)&&l("validateStatusUndefinedResolves")===!1&&(f.hasOwnProp(t,"validateStatus")?r.validateStatus=n(void 0,t.validateStatus):delete r.validateStatus),r}const qu=["content-type","content-length"];function Ku(t,e,r){if(r!=="content-only"){t.set(e);return}Object.entries(e||{}).forEach(([n,s])=>{qu.includes(n.toLowerCase())&&t.set(n,s)})}const Gu=t=>encodeURIComponent(t).replace(/%([0-9A-F]{2})/gi,(e,r)=>String.fromCharCode(parseInt(r,16)));function Zi(t){const e=qe({},t),r=g=>f.hasOwnProp(e,g)?e[g]:void 0,n=r("data");let s=r("withXSRFToken");const i=r("xsrfHeaderName"),a=r("xsrfCookieName");let l=r("headers");const c=r("auth"),d=r("baseURL"),u=r("allowAbsoluteUrls"),h=r("url");if(e.headers=l=z.from(l),e.url=zi(Yi(d,h,u,e),r("params"),r("paramsSerializer")),c){const g=f.getSafeProp(c,"username")||"",b=f.getSafeProp(c,"password")||"";try{l.set("Authorization","Basic "+btoa(g+":"+(b?Gu(b):"")))}catch(v){throw N.from(v,N.ERR_BAD_OPTION_VALUE,t)}}if(f.isFormData(n)){const g=f.getSafeProp(n,"getHeaders");F.hasStandardBrowserEnv||F.hasStandardBrowserWebWorkerEnv||f.isReactNative(n)?l.setContentType(void 0):f.isFunction(g)&&Ku(l,g.call(n),r("formDataHeaderPolicy"))}if(F.hasStandardBrowserEnv&&(f.isFunction(s)&&(s=s(e)),s===!0||s==null&&Uu(e.url))){const b=i&&a&&Fu.read(a);b&&l.set(i,b)}return e}const Ju=typeof XMLHttpRequest<"u",Xu=Ju&&function(t){return new Promise(function(r,n){const s=Zi(t);let i=s.data;const a=z.from(s.headers).normalize();let{responseType:l,onUploadProgress:c,onDownloadProgress:d}=s,u,h,g,b,v,w;function E(){b&&b(),v&&v(),s.cancelToken&&s.cancelToken.unsubscribe(u),s.signal&&s.signal.removeEventListener("abort",u)}let p=new XMLHttpRequest;p.open(s.method.toUpperCase(),s.url,!0),p.timeout=s.timeout;function y(x){if(!p)return;if(p.status===0&&(qr(Xi(s.url))||qr(F.origin))!=="file"&&!(p.responseURL&&p.responseURL.startsWith("file:"))){n(new N("Request aborted",N.ECONNABORTED,t,p)),E(),p=null;return}try{x?w&&w(x):v&&v()}catch(q){setTimeout(()=>{throw q})}if(!p)return;const R=z.from("getAllResponseHeaders"in p&&p.getAllResponseHeaders()),j={data:!l||l==="text"||l==="json"?p.responseText:p.response,status:p.status,statusText:p.statusText,headers:R,config:t,request:p};Ji(function(le){r(le),E()},function(le){n(le),E()},j),p=null}"onloadend"in p?p.onloadend=y:p.onreadystatechange=function(){!p||p.readyState!==4||p.status===0&&!(p.responseURL&&p.responseURL.startsWith("file:"))||setTimeout(y)},p.onabort=function(){p&&(n(new N("Request aborted",N.ECONNABORTED,t,p)),E(),p=null)},p.onerror=function(R){const A=R&&R.message?R.message:"Network Error",j=new N(A,N.ERR_NETWORK,t,p);j.event=R||null,n(j),E(),p=null},p.ontimeout=function(){let R=s.timeout?"timeout of "+s.timeout+"ms exceeded":"timeout exceeded";const A=s.transitional||kn;s.timeoutErrorMessage&&(R=s.timeoutErrorMessage),n(new N(R,A.clarifyTimeoutError?N.ETIMEDOUT:N.ECONNABORTED,t,p)),E(),p=null},i===void 0&&a.setContentType(null),"setRequestHeader"in p&&f.forEach(Ui(a),function(R,A){p.setRequestHeader(A,R)}),f.isUndefined(s.withCredentials)||(p.withCredentials=!!s.withCredentials),l&&l!=="json"&&(p.responseType=s.responseType),d&&([g,v,w]=mr(d,!0),p.addEventListener("progress",g)),c&&p.upload&&([h,b]=mr(c),p.upload.addEventListener("progress",h),p.upload.addEventListener("loadend",b)),(s.cancelToken||s.signal)&&(u=x=>{p&&(n(!x||x.type?new Dt(null,t,p):x),p.abort(),E(),p=null)},s.cancelToken&&s.cancelToken.subscribe(u),s.signal&&(s.signal.aborted?u():s.signal.addEventListener("abort",u)));const _=qr(s.url);if(_&&!F.protocols.includes(_)){n(new N("Unsupported protocol "+_+":",N.ERR_BAD_REQUEST,t)),E();return}p.send(i||null)})},Yu=(t,e)=>{if(t=t?t.filter(Boolean):[],!e&&!t.length)return;const r=new AbortController;let n=!1;const s=function(c){if(!n){n=!0,a();const d=c instanceof Error?c:this.reason;r.abort(d instanceof N?d:new Dt(d instanceof Error?d.message:d))}};let i=e&&setTimeout(()=>{i=null,s(new N(`timeout of ${e}ms exceeded`,N.ETIMEDOUT))},e);const a=()=>{t&&(i&&clearTimeout(i),i=null,t.forEach(c=>{c.unsubscribe?c.unsubscribe(s):c.removeEventListener("abort",s)}),t=null)};t.forEach(c=>{if(!n){if(c.aborted){s.call(c);return}c.addEventListener("abort",s,{once:!0})}});const{signal:l}=r;return l.unsubscribe=()=>f.asap(a),l},Zu=function*(t,e){let r=t.byteLength;if(r<e){yield t;return}let n=0,s;for(;n<r;)s=n+e,yield t.slice(n,s),n=s},Qu=async function*(t,e){for await(const r of ed(t))yield*Zu(r,e)},ed=async function*(t){if(t[Symbol.asyncIterator]){yield*t;return}const e=t.getReader();try{for(;;){const{done:r,value:n}=await e.read();if(r)break;yield n}}finally{await e.cancel()}},ws=(t,e,r,n)=>{const s=Qu(t,e);let i=0,a,l=c=>{a||(a=!0,n&&n(c))};return new ReadableStream({async pull(c){try{const{done:d,value:u}=await s.next();if(d){l(),c.close();return}let h=u.byteLength;if(r){let g=i+=h;r(g)}c.enqueue(new Uint8Array(u))}catch(d){throw l(d),d}},cancel(c){return l(c),s.return()}},{highWaterMark:2})},vs=t=>t>=48&&t<=57||t>=65&&t<=70||t>=97&&t<=102,Qi=(t,e,r)=>e+2<r&&vs(t.charCodeAt(e+1))&&vs(t.charCodeAt(e+2)),Es=t=>t<=57?t-48:(t&223)-55,td=t=>t>=65&&t<=90||t>=97&&t<=122||t>=48&&t<=57||t===43||t===47||t===45||t===95,rd=t=>t===9||t===10||t===12||t===13||t===32,nd=t=>{const e=Math.floor(t/4),r=t%4;return e*3+(r===2?1:r===3?2:0)},sd=t=>{const e=t.length;let r=0;return e>0&&t.charCodeAt(e-1)===61&&(r++,e>1&&t.charCodeAt(e-2)===61&&r++),Math.floor((e-r)*3/4)},id=t=>{const e=t.length;let r=0,n=0,s=!1;for(let i=0;i<e;i++){let a=t.charCodeAt(i);if(a===37&&Qi(t,i,e)&&(a=Es(t.charCodeAt(i+1))*16+Es(t.charCodeAt(i+2)),i+=2),!rd(a)){if(a===61){n++;continue}if(!td(a)||n>0){s=!0;continue}r++}}return s||n>2||n>0&&(r+n)%4!==0||r%4===1?sd(t):nd(r)},ad=(t,e)=>{if(!t||typeof t!="string"||!t.startsWith("data:"))return 0;const r=t.indexOf(",");if(r<0)return 0;const n=t.slice(5,r),s=t.slice(r+1);if(/;base64/i.test(n))return e(s);let a=0;for(let l=0,c=s.length;l<c;l++){const d=s.charCodeAt(l);if(d===37&&Qi(s,l,c))a+=1,l+=2;else if(d<128)a+=1;else if(d<2048)a+=2;else if(d>=55296&&d<=56319&&l+1<c){const u=s.charCodeAt(l+1);u>=56320&&u<=57343?(a+=4,l++):a+=3}else a+=3}return a};function od(t){const e=typeof t=="string"?t.indexOf("#"):-1;return ad(e===-1?t:t.slice(0,e),id)}const Tn="1.20.0",_s=64*1024,ld={cache:"default",redirect:"follow",referrer:"about:client",referrerPolicy:"",mode:"cors",integrity:"",keepalive:!1,priority:"auto",window:null},{isFunction:Gt}=f,cd=t=>encodeURIComponent(t).replace(/%([0-9A-F]{2})/gi,(e,r)=>String.fromCharCode(parseInt(r,16))),Ns=t=>{if(!f.isString(t))return t;try{return decodeURIComponent(t)}catch{return t}},Ss=(t,...e)=>{try{return!!t(...e)}catch{return!1}},ud=t=>{const e=t.indexOf("://");let r=t;return e!==-1&&(r=r.slice(e+3)),r.includes("@")||r.includes(":")},dd=t=>{const e=f.global!==void 0&&f.global!==null?f.global:globalThis,{ReadableStream:r,TextEncoder:n}=e;t=f.merge.call({skipUndefined:!0},{Request:e.Request,Response:e.Response},t);const{fetch:s,Request:i,Response:a}=t,l=s?Gt(s):typeof fetch=="function",c=Gt(i),d=Gt(a);if(!l)return!1;const u=l&&Gt(r),h=l&&(typeof n=="function"?(p=>y=>p.encode(y))(new n):async p=>new Uint8Array(await new i(p).arrayBuffer())),g=c&&u&&Ss(()=>{let p=!1;const y=new i(F.origin,{body:new r,method:"POST",get duplex(){return p=!0,"half"}}),_=y.headers.has("Content-Type");return y.body!=null&&y.body.cancel(),p&&!_}),b=d&&u&&Ss(()=>f.isReadableStream(new a("").body)),v={stream:b&&(p=>p.body)};l&&["text","arrayBuffer","blob","formData","stream"].forEach(p=>{!v[p]&&(v[p]=(y,_)=>{let x=y&&y[p];if(x)return x.call(y);throw new N(`Response type '${p}' is not supported`,N.ERR_NOT_SUPPORT,_)})});const w=async p=>{if(p==null)return 0;if(f.isBlob(p))return p.size;if(f.isSpecCompliantForm(p))return(await new i(F.origin,{method:"POST",body:p}).arrayBuffer()).byteLength;if(f.isArrayBufferView(p)||f.isArrayBuffer(p))return p.byteLength;if(f.isURLSearchParams(p)&&(p=p+""),f.isString(p))return(await h(p)).byteLength},E=async(p,y)=>{const _=f.toFiniteNumber(p.getContentLength());return _??w(y)};return async p=>{let{url:y,method:_,data:x,signal:R,cancelToken:A,timeout:j,onDownloadProgress:q,onUploadProgress:le,responseType:G,headers:te,withCredentials:zt="same-origin",fetchOptions:Ur,maxContentLength:re,maxBodyLength:Vt,maxRedirects:oo}=Zi(p);const mt=f.isNumber(re)&&re>-1,Fr=f.isNumber(Vt)&&Vt>-1,lo=T=>f.hasOwnProp(p,T)?p[T]:void 0;let Gn=s||fetch;G=G?(G+"").toLowerCase():"text";let ve=Yu([R,A&&A.toAbortSignal()],j),B=null;const De=ve&&ve.unsubscribe&&(()=>{ve.unsubscribe()});let Ye,gt=null;const Jn=()=>new N("Request body larger than maxBodyLength limit",N.ERR_BAD_REQUEST,p,B);try{let T;const J=lo("auth");if(J){const I=f.getSafeProp(J,"username")||"",$=f.getSafeProp(J,"password")||"";T={username:I,password:$}}if(ud(y)){const I=new URL(y,F.origin);if(!T&&(I.username||I.password)){const $=Ns(I.username),Ee=Ns(I.password);T={username:$,password:Ee}}(I.username||I.password)&&(I.username="",I.password="",y=I.href)}if(T&&(te.delete("authorization"),te.set("Authorization","Basic "+btoa(cd((T.username||"")+":"+(T.password||""))))),mt&&typeof y=="string"&&y.startsWith("data:")&&od(y)>re)throw new N("maxContentLength size of "+re+" exceeded",N.ERR_BAD_RESPONSE,p,B);if(Fr&&_!=="get"&&_!=="head"){const I=await w(x);if(typeof I=="number"&&isFinite(I)&&(Ye=I,I>Vt))throw Jn()}const Wt=Fr&&(f.isReadableStream(x)||f.isStream(x)),Xn=(I,$,Ee)=>ws(I,_s,Le=>{if(Fr&&Le>Vt)throw gt=Jn();$&&$(Le)},Ee);if(g&&_!=="get"&&_!=="head"&&(le||Wt)){if(Ye=Ye??await E(te,x),Ye!==0||Wt){let I=new i(y,{method:"POST",body:x,duplex:"half"}),$;if(f.isFormData(x)&&($=I.headers.get("content-type"))&&te.setContentType($),I.body){const[Ee,Le]=le&&gs(Ye,mr(ys(le)))||[];x=Xn(I.body,Ee,Le)}}}else if(Wt&&!c&&u&&_!=="get"&&_!=="head")x=Xn(x);else if(Wt&&c&&!g&&_!=="get"&&_!=="head")throw new N("Stream request bodies are not supported by the current fetch implementation",N.ERR_NOT_SUPPORT,p,B);f.isString(zt)||(zt=zt?"include":"omit");const co=c&&"credentials"in i.prototype;if(f.isFormData(x)){const I=te.getContentType();I&&/^multipart\/form-data/i.test(I)&&!/boundary=/i.test(I)&&te.delete("content-type")}te.set("User-Agent","axios/"+Tn,!1);const Z=Ur==null?Ur:Object.assign(Object.create(null),Ur);Z&&(delete Z.body,delete Z.headers,delete Z.method,delete Z.signal,delete Z.duplex,delete Z.credentials);const ce=Object.assign(Object.create(null),Z,{signal:ve,method:_.toUpperCase(),headers:Ui(te.normalize()),body:x,duplex:"half",credentials:co?zt:void 0});c&&(f.forEach(ld,(I,$)=>{ce[$]===void 0&&(ce[$]=I)}),ce.signal===void 0&&(ce.signal=null),ce.body===void 0&&(ce.body=null)),oo===0&&(ce.redirect="manual",Z&&(Z.redirect="manual")),B=c&&new i(y,ce);let ue=await(c?Gn(B,Z):Gn(y,ce));const Yn=z.from(ue.headers);if(mt){const I=f.toFiniteNumber(Yn.getContentLength());if(I!=null&&I>re)throw new N("maxContentLength size of "+re+" exceeded",N.ERR_BAD_RESPONSE,p,B)}const Br=b&&(G==="stream"||G==="response");if(b&&ue.body&&(q||mt||Br&&De)){const I={};["status","statusText","headers"].forEach(yt=>{I[yt]=ue[yt]});const $=f.toFiniteNumber(Yn.getContentLength()),[Ee,Le]=q&&gs($,mr(ys(q),!0))||[];let Zn=0;const uo=yt=>{if(mt&&(Zn=yt,Zn>re))throw new N("maxContentLength size of "+re+" exceeded",N.ERR_BAD_RESPONSE,p,B);Ee&&Ee(yt)};ue=new a(ws(ue.body,_s,uo,()=>{Le&&Le(),De&&De()}),I)}G=G||"text";let de=await v[f.findKey(v,G)||"text"](ue,p);if(mt&&!b&&!Br){let I;if(de!=null&&(typeof de.byteLength=="number"?I=de.byteLength:typeof de.size=="number"?I=de.size:typeof de=="string"&&(I=typeof n=="function"?new n().encode(de).byteLength:de.length)),typeof I=="number"&&I>re)throw new N("maxContentLength size of "+re+" exceeded",N.ERR_BAD_RESPONSE,p,B)}return!Br&&De&&De(),await new Promise((I,$)=>{Ji(I,$,{data:de,headers:z.from(ue.headers),status:ue.status,statusText:ue.statusText,config:p,request:B})})}catch(T){if(De&&De(),ve&&ve.aborted&&ve.reason instanceof N){const J=ve.reason;throw J.config=p,B&&(J.request=B),T!==J&&Object.defineProperty(J,"cause",{__proto__:null,value:T,writable:!0,enumerable:!1,configurable:!0}),J}if(gt)throw B&&!gt.request&&(gt.request=B),gt;if(T instanceof N)throw B&&!T.request&&(T.request=B),T;if(T&&T.name==="TypeError"&&/Load failed|fetch/i.test(T.message)){const J=new N("Network Error",N.ERR_NETWORK,p,B,T&&T.response);throw Object.defineProperty(J,"cause",{__proto__:null,value:T.cause||T,writable:!0,enumerable:!1,configurable:!0}),J}throw N.from(T,T&&T.code,p,B,T&&T.response)}}},hd=new Map,ea=t=>{let e=t&&t.env||{};const{fetch:r,Request:n,Response:s}=e,i=[n,s,r];let a=i.length,l=a,c,d,u=hd;for(;l--;)c=i[l],d=u.get(c),d===void 0&&u.set(c,d=l?new Map:dd(e)),u=d;return d};ea();const Pn={http:xu,xhr:Xu,fetch:{get:ea}};f.forEach(Pn,(t,e)=>{if(t){try{Object.defineProperty(t,"name",{__proto__:null,value:e})}catch{}Object.defineProperty(t,"adapterName",{__proto__:null,value:e})}});const Is=t=>`- ${t}`,fd=t=>f.isFunction(t)||t===null||t===!1;function pd(t,e){t=f.isArray(t)?t:[t];const{length:r}=t;let n,s;const i={};for(let a=0;a<r;a++){n=t[a];let l;if(s=n,!fd(n)&&(s=Pn[(l=String(n)).toLowerCase()],s===void 0))throw new N(`Unknown adapter '${l}'`);if(s&&(f.isFunction(s)||(s=s.get(e))))break;i[l||"#"+a]=s}if(!s){const a=Object.entries(i).map(([c,d])=>`adapter ${c} `+(d===!1?"is not supported by the environment":"is not available in the build"));let l=r?a.length>1?`since :
`+a.map(Is).join(`
`):" "+Is(a[0]):"as no adapter specified";throw new N("There is no suitable adapter to dispatch the request "+l,N.ERR_NOT_SUPPORT)}return s}const ta={getAdapter:pd,adapters:Pn};function Kr(t){if(t.cancelToken&&t.cancelToken.throwIfRequested(),t.signal&&t.signal.aborted)throw new Dt(null,t)}function Gr(t){const e=f.toSafeFlatObject(t);return Kr(e),e.headers=z.from(f.getSafeProp(e,"headers")),e.data=Wr.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),ta.getAdapter(e.adapter||Ot.adapter,e)(e).then(function(s){Kr(e),e.response=s;try{s.data=Wr.call(e,e.transformResponse,s)}finally{delete e.response}return s.headers=z.from(s.headers),s},function(s){if(!Gi(s)&&(Kr(e),s&&s.response)){e.response=s.response;try{s.response.data=Wr.call(e,e.transformResponse,s.response)}finally{delete e.response}s.response.headers=z.from(s.response.headers)}return Promise.reject(s)})}const Pr={};["object","boolean","number","function","string","symbol"].forEach((t,e)=>{Pr[t]=function(n){return typeof n===t||"a"+(e<1?"n ":" ")+t}});const Rs={};Pr.transitional=function(e,r,n){function s(i,a){return"[Axios v"+Tn+"] Transitional option '"+i+"'"+a+(n?". "+n:"")}return(i,a,l)=>{if(e===!1)throw new N(s(a," has been removed"+(r?" in "+r:"")),N.ERR_DEPRECATED);return r&&!Rs[a]&&(Rs[a]=!0,console.warn(s(a," has been deprecated since v"+r+" and will be removed in the near future"))),e?e(i,a,l):!0}};Pr.spelling=function(e){return(r,n)=>(console.warn(`${n} is likely a misspelling of ${e}`),!0)};function md(t,e,r){if(typeof t!="object"||t===null)throw new N("options must be an object",N.ERR_BAD_OPTION_VALUE);const n=Object.keys(t);let s=n.length;for(;s-- >0;){const i=n[s],a=Object.prototype.hasOwnProperty.call(e,i)?e[i]:void 0;if(a){const l=t[i],c=l===void 0||a(l,i,t);if(c!==!0)throw new N("option "+i+" must be "+c,N.ERR_BAD_OPTION_VALUE);continue}if(r!==!0)throw new N("Unknown option "+i,N.ERR_BAD_OPTION)}}const tr={assertOptions:md,validators:Pr},H=tr.validators;let Be=class{constructor(e){this.defaults=e||{},this.interceptors={request:new ps,response:new ps}}async request(e,r){try{return await this._request(e,r)}catch(n){if(n instanceof Error)try{let s={};Error.captureStackTrace?Error.captureStackTrace(s):s=new Error;const i=s.stack;let a="";if(typeof i=="string"){const l=i.indexOf(`
`);a=l===-1?"":i.slice(l+1)}if(!n.stack)n.stack=a;else if(a){const l=a.indexOf(`
`),c=l===-1?-1:a.indexOf(`
`,l+1),d=c===-1?"":a.slice(c+1);String(n.stack).endsWith(d)||(n.stack+=`
`+a)}}catch{}throw n}}_request(e,r){typeof e=="string"?(r=r||{},r.url=e):r=e||{},r=qe(this.defaults,r);const{transitional:n,paramsSerializer:s,headers:i}=r;n!==void 0&&tr.assertOptions(n,{silentJSONParsing:H.transitional(H.boolean),forcedJSONParsing:H.transitional(H.boolean),clarifyTimeoutError:H.transitional(H.boolean),legacyInterceptorReqResOrdering:H.transitional(H.boolean),advertiseZstdAcceptEncoding:H.transitional(H.boolean),validateStatusUndefinedResolves:H.transitional(H.boolean)},!1),s!=null&&(f.isFunction(s)?r.paramsSerializer={serialize:s}:tr.assertOptions(s,{encode:H.function,serialize:H.function},!0)),r.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?r.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:r.allowAbsoluteUrls=!0),tr.assertOptions(r,{baseUrl:H.spelling("baseURL"),withXsrfToken:H.spelling("withXSRFToken")},!0),r.method=(f.getSafeProp(r,"method")||f.getSafeProp(this.defaults,"method")||"get").toLowerCase();let a=i&&f.merge(i.common,i[r.method]);i&&f.forEach(Ki.concat("common"),v=>{delete i[v]}),r.headers=z.concat(a,i);const l=[];let c=!0;this.interceptors.request.forEach(function(w){if(typeof w.runWhen=="function"&&w.runWhen(r)===!1)return;c=c&&w.synchronous;const E=r.transitional||kn;E&&E.legacyInterceptorReqResOrdering?l.unshift(w.fulfilled,w.rejected):l.push(w.fulfilled,w.rejected)});const d=[];this.interceptors.response.forEach(function(w){d.push(w.fulfilled,w.rejected)});let u,h=0,g;if(!c){const v=[Gr.bind(this),void 0];for(v.unshift(...l),v.push(...d),g=v.length,u=Promise.resolve(r);h<g;)u=u.then(v[h++],v[h++]);return u}g=l.length;let b=r;for(;h<g;){const v=l[h++],w=l[h++];try{b=v?v(b):b}catch(E){if(!w){u=Promise.reject(E);break}try{const p=w.call(this,E);f.isThenable(p)&&(u=Promise.resolve(p).then(()=>Gr.call(this,b)))}catch(p){u=Promise.reject(p)}break}}if(!u)try{u=Gr.call(this,b)}catch(v){u=Promise.reject(v)}for(h=0,g=d.length;h<g;)u=u.then(d[h++],d[h++]);return u}getUri(e){e=qe(this.defaults,e);const r=Yi(e.baseURL,e.url,e.allowAbsoluteUrls,e);return zi(r,e.params,e.paramsSerializer)}};f.forEach(["delete","get","head","options"],function(e){Be.prototype[e]=function(r,n){return this.request(qe(n||{},{method:e,url:r,data:n&&f.hasOwnProp(n,"data")?n.data:void 0}))}});f.forEach(["post","put","patch","query"],function(e){function r(n){return function(i,a,l){return this.request(qe(l||{},{method:e,headers:n?{"Content-Type":"multipart/form-data"}:{},url:i,data:a}))}}Be.prototype[e]=r(),e!=="query"&&(Be.prototype[e+"Form"]=r(!0))});let gd=class ra{constructor(e){if(typeof e!="function")throw new TypeError("executor must be a function.");let r;this.promise=new Promise(function(i){r=i});const n=this;this.promise.then(s=>{if(!n._listeners)return;let i=n._listeners.length;for(;i-- >0;)n._listeners[i](s);n._listeners=null}),this.promise.then=s=>{let i;const a=new Promise(l=>{n.subscribe(l),i=l}).then(s);return a.cancel=function(){n.unsubscribe(i)},a},e(function(i,a,l){n.reason||(n.reason=new Dt(i,a,l),r(n.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const r=this._listeners.indexOf(e);r!==-1&&this._listeners.splice(r,1)}toAbortSignal(){const e=new AbortController,r=n=>{e.abort(n)};return this.subscribe(r),e.signal.unsubscribe=()=>this.unsubscribe(r),e.signal}static source(){let e;return{token:new ra(function(s){e=s}),cancel:e}}};function yd(t){return function(r){return t.apply(null,r)}}function bd(t){return f.isObject(t)&&t.isAxiosError===!0}const rr={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,ContentTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,UnprocessableContent:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerReturnsAnUnknownError:520,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(rr).forEach(([t,e])=>{rr[e]===void 0&&(rr[e]=t)});function na(t){const e=new Be(t),r=Ri(Be.prototype.request,e);return f.extend(r,Be.prototype,e,{allOwnKeys:!0}),f.extend(r,e,null,{allOwnKeys:!0}),r.create=function(s){return na(qe(t,s))},r}const L=na(Ot);L.Axios=Be;L.CanceledError=Dt;L.CancelToken=gd;L.isCancel=Gi;L.VERSION=Tn;L.toFormData=Tr;L.AxiosError=N;L.Cancel=L.CanceledError;L.all=function(e){return Promise.all(e)};L.spread=yd;L.isAxiosError=bd;L.mergeConfig=qe;L.AxiosHeaders=z;L.formToJSON=t=>qi(f.isHTMLForm(t)?new FormData(t):t);L.getAdapter=ta.getAdapter;L.HttpStatusCode=rr;L.default=L;const{Axios:xg,AxiosError:wg,CanceledError:vg,isCancel:Eg,CancelToken:_g,VERSION:Ng,all:Sg,Cancel:Ig,isAxiosError:Rg,spread:kg,toFormData:Cg,AxiosHeaders:Tg,HttpStatusCode:Pg,formToJSON:Ag,getAdapter:jg,mergeConfig:Og,create:Dg}=L,k=L.create({baseURL:"/api",withCredentials:!0});let pn=null,nr=null;function Qe(t){pn=t}function xd(t){nr=t}k.interceptors.request.use(t=>(pn&&(t.headers.Authorization=`Bearer ${pn}`),t));let Jt=null;async function sa(){return Jt||(Jt=L.post(`${k.defaults.baseURL}/auth/refresh`,{},{withCredentials:!0}).then(t=>{var r,n;const e=(n=(r=t.data)==null?void 0:r.data)==null?void 0:n.accessToken;return Qe(e),e}).catch(()=>(Qe(null),null)).finally(()=>{Jt=null})),Jt}k.interceptors.response.use(t=>t,async t=>{var s,i;const e=t.config,r=(s=t.response)==null?void 0:s.status,n=(i=e==null?void 0:e.url)==null?void 0:i.includes("/auth/");if(r===401&&e&&!e._retried&&!n){e._retried=!0;const a=await sa();if(a)return e.headers={...e.headers,Authorization:`Bearer ${a}`},k.request(e);nr==null||nr()}return Promise.reject(t)});function Lt(t,e="Something went wrong"){var r;if(L.isAxiosError(t)){const n=(r=t.response)==null?void 0:r.data;if(n!=null&&n.message)return n.message;if(t.code==="ERR_NETWORK")return"Cannot reach the server. Is the API running?"}return e}const wd=()=>{};var ks={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ia=function(t){const e=[];let r=0;for(let n=0;n<t.length;n++){let s=t.charCodeAt(n);s<128?e[r++]=s:s<2048?(e[r++]=s>>6|192,e[r++]=s&63|128):(s&64512)===55296&&n+1<t.length&&(t.charCodeAt(n+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++n)&1023),e[r++]=s>>18|240,e[r++]=s>>12&63|128,e[r++]=s>>6&63|128,e[r++]=s&63|128):(e[r++]=s>>12|224,e[r++]=s>>6&63|128,e[r++]=s&63|128)}return e},vd=function(t){const e=[];let r=0,n=0;for(;r<t.length;){const s=t[r++];if(s<128)e[n++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[r++];e[n++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[r++],a=t[r++],l=t[r++],c=((s&7)<<18|(i&63)<<12|(a&63)<<6|l&63)-65536;e[n++]=String.fromCharCode(55296+(c>>10)),e[n++]=String.fromCharCode(56320+(c&1023))}else{const i=t[r++],a=t[r++];e[n++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},aa={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const r=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<t.length;s+=3){const i=t[s],a=s+1<t.length,l=a?t[s+1]:0,c=s+2<t.length,d=c?t[s+2]:0,u=i>>2,h=(i&3)<<4|l>>4;let g=(l&15)<<2|d>>6,b=d&63;c||(b=64,a||(g=64)),n.push(r[u],r[h],r[g],r[b])}return n.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(ia(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):vd(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const r=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<t.length;){const i=r[t.charAt(s++)],l=s<t.length?r[t.charAt(s)]:0;++s;const d=s<t.length?r[t.charAt(s)]:64;++s;const h=s<t.length?r[t.charAt(s)]:64;if(++s,i==null||l==null||d==null||h==null)throw new Ed;const g=i<<2|l>>4;if(n.push(g),d!==64){const b=l<<4&240|d>>2;if(n.push(b),h!==64){const v=d<<6&192|h;n.push(v)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Ed extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const _d=function(t){const e=ia(t);return aa.encodeByteArray(e,!0)},oa=function(t){return _d(t).replace(/\./g,"")},la=function(t){try{return aa.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nd(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sd=()=>Nd().__FIREBASE_DEFAULTS__,Id=()=>{if(typeof process>"u"||typeof ks>"u")return;const t=ks.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Rd=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&la(t[1]);return e&&JSON.parse(e)},An=()=>{try{return wd()||Sd()||Id()||Rd()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},kd=t=>{var e,r;return(r=(e=An())==null?void 0:e.emulatorHosts)==null?void 0:r[t]},ca=()=>{var t;return(t=An())==null?void 0:t.config},ua=t=>{var e;return(e=An())==null?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cd{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,r)=>{this.resolve=e,this.reject=r})}wrapCallback(e){return(r,n)=>{r?this.reject(r):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(r):e(r,n))}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function W(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Td(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(W())}function Pd(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Ad(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function jd(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Od(){const t=W();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Dd(){try{return typeof indexedDB=="object"}catch{return!1}}function Ld(){return new Promise((t,e)=>{try{let r=!0;const n="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(n);s.onsuccess=()=>{s.result.close(),r||self.indexedDB.deleteDatabase(n),t(!0)},s.onupgradeneeded=()=>{r=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(r){e(r)}})}function Lg(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Md="FirebaseError";class Oe extends Error{constructor(e,r,n){super(r),this.code=e,this.customData=n,this.name=Md,Object.setPrototypeOf(this,Oe.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Mt.prototype.create)}}class Mt{constructor(e,r,n){this.service=e,this.serviceName=r,this.errors=n}create(e,...r){const n=r[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?Ud(i,n):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new Oe(s,l,n)}}function Ud(t,e){try{let r=0,n="";for(;r<t.length;){const s=t.indexOf("{$",r);if(s===-1){n+=t.substring(r);break}const i=t.indexOf("}",s+2);if(i===-1){n+=t.substring(r);break}const a=t.substring(s+2,i),l=e[a];n+=t.substring(r,s)+(l!=null?String(l):`<${a}?>`),r=i+1}return n}catch{return t}}function Fd(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function at(t,e){if(t===e)return!0;const r=Object.keys(t),n=Object.keys(e);for(const s of r){if(!n.includes(s))return!1;const i=t[s],a=e[s];if(Cs(i)&&Cs(a)){if(!at(i,a))return!1}else if(i!==a)return!1}for(const s of n)if(!r.includes(s))return!1;return!0}function Cs(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ut(t){const e=[];for(const[r,n]of Object.entries(t))Array.isArray(n)?n.forEach(s=>{e.push(encodeURIComponent(r)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(r)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function Bd(t,e){const r=new $d(t,e);return r.subscribe.bind(r)}class $d{constructor(e,r){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=r,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(r=>{r.next(e)})}error(e){this.forEachObserver(r=>{r.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,r,n){let s;if(e===void 0&&r===void 0&&n===void 0)throw new Error("Missing Observer.");Hd(e,["next","error","complete"])?s=e:s={next:e,error:r,complete:n},s.next===void 0&&(s.next=Jr),s.error===void 0&&(s.error=Jr),s.complete===void 0&&(s.complete=Jr);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let r=0;r<this.observers.length;r++)this.sendOne(r,e)}sendOne(e,r){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{r(this.observers[e])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Hd(t,e){if(typeof t!="object"||t===null)return!1;for(const r of e)if(r in t&&typeof t[r]=="function")return!0;return!1}function Jr(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zd=1e3,Vd=2,Wd=4*60*60*1e3,qd=.5;function Mg(t,e=zd,r=Vd){const n=e*Math.pow(r,t),s=Math.round(qd*n*(Math.random()-.5)*2);return Math.min(Wd,n+s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ge(t){return t&&t._delegate?t._delegate:t}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jn(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Kd(t){return(await fetch(t,{credentials:"include"})).ok}class ot{constructor(e,r,n){this.name=e,this.instanceFactory=r,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Me="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gd{constructor(e,r){this.name=e,this.container=r,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const r=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(r)){const n=new Cd;if(this.instancesDeferred.set(r,n),this.isInitialized(r)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:r});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(r).promise}getImmediate(e){const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),n=(e==null?void 0:e.optional)??!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(n)return null;throw s}else{if(n)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Xd(e))try{this.getOrInitializeService({instanceIdentifier:Me})}catch{}for(const[r,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(r);try{const i=this.getOrInitializeService({instanceIdentifier:s});n.resolve(i)}catch{}}}}clearInstance(e=Me){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(r=>"INTERNAL"in r).map(r=>r.INTERNAL.delete()),...e.filter(r=>"_delete"in r).map(r=>r._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Me){return this.instances.has(e)}getOptions(e=Me){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:r={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:r});for(const[i,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);n===l&&a.resolve(s)}return s}onInit(e,r){const n=this.normalizeInstanceIdentifier(r),s=this.onInitCallbacks.get(n)??new Set;s.add(e),this.onInitCallbacks.set(n,s);const i=this.instances.get(n);return i&&e(i,n),()=>{s.delete(e)}}invokeOnInitCallbacks(e,r){const n=this.onInitCallbacks.get(r);if(n)for(const s of n)try{s(e,r)}catch{}}getOrInitializeService({instanceIdentifier:e,options:r={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:Jd(e),options:r}),this.instances.set(e,n),this.instancesOptions.set(e,r),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=Me){return this.component?this.component.multipleInstances?e:Me:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Jd(t){return t===Me?void 0:t}function Xd(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yd{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const r=this.getProvider(e.name);if(r.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);r.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const r=new Gd(e,this);return this.providers.set(e,r),r}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var P;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(P||(P={}));const Zd={debug:P.DEBUG,verbose:P.VERBOSE,info:P.INFO,warn:P.WARN,error:P.ERROR,silent:P.SILENT},Qd=P.INFO,eh={[P.DEBUG]:"log",[P.VERBOSE]:"log",[P.INFO]:"info",[P.WARN]:"warn",[P.ERROR]:"error"},th=(t,e,...r)=>{if(e<t.logLevel)return;const n=new Date().toISOString(),s=eh[e];if(s)console[s](`[${n}]  ${t.name}:`,...r);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class da{constructor(e){this.name=e,this._logLevel=Qd,this._logHandler=th,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in P))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Zd[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,P.DEBUG,...e),this._logHandler(this,P.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,P.VERBOSE,...e),this._logHandler(this,P.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,P.INFO,...e),this._logHandler(this,P.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,P.WARN,...e),this._logHandler(this,P.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,P.ERROR,...e),this._logHandler(this,P.ERROR,...e)}}const rh=(t,e)=>e.some(r=>t instanceof r);let Ts,Ps;function nh(){return Ts||(Ts=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function sh(){return Ps||(Ps=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ha=new WeakMap,mn=new WeakMap,fa=new WeakMap,Xr=new WeakMap,On=new WeakMap;function ih(t){const e=new Promise((r,n)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",a)},i=()=>{r(Pe(t.result)),s()},a=()=>{n(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",a)});return e.then(r=>{r instanceof IDBCursor&&ha.set(r,t)}).catch(()=>{}),On.set(e,t),e}function ah(t){if(mn.has(t))return;const e=new Promise((r,n)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",a),t.removeEventListener("abort",a)},i=()=>{r(),s()},a=()=>{n(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",a),t.addEventListener("abort",a)});mn.set(t,e)}let gn={get(t,e,r){if(t instanceof IDBTransaction){if(e==="done")return mn.get(t);if(e==="objectStoreNames")return t.objectStoreNames||fa.get(t);if(e==="store")return r.objectStoreNames[1]?void 0:r.objectStore(r.objectStoreNames[0])}return Pe(t[e])},set(t,e,r){return t[e]=r,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function oh(t){gn=t(gn)}function lh(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...r){const n=t.call(Yr(this),e,...r);return fa.set(n,e.sort?e.sort():[e]),Pe(n)}:sh().includes(t)?function(...e){return t.apply(Yr(this),e),Pe(ha.get(this))}:function(...e){return Pe(t.apply(Yr(this),e))}}function ch(t){return typeof t=="function"?lh(t):(t instanceof IDBTransaction&&ah(t),rh(t,nh())?new Proxy(t,gn):t)}function Pe(t){if(t instanceof IDBRequest)return ih(t);if(Xr.has(t))return Xr.get(t);const e=ch(t);return e!==t&&(Xr.set(t,e),On.set(e,t)),e}const Yr=t=>On.get(t);function uh(t,e,{blocked:r,upgrade:n,blocking:s,terminated:i}={}){const a=indexedDB.open(t,e),l=Pe(a);return n&&a.addEventListener("upgradeneeded",c=>{n(Pe(a.result),c.oldVersion,c.newVersion,Pe(a.transaction),c)}),r&&a.addEventListener("blocked",c=>r(c.oldVersion,c.newVersion,c)),l.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),l}const dh=["get","getKey","getAll","getAllKeys","count"],hh=["put","add","delete","clear"],Zr=new Map;function As(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Zr.get(e))return Zr.get(e);const r=e.replace(/FromIndex$/,""),n=e!==r,s=hh.includes(r);if(!(r in(n?IDBIndex:IDBObjectStore).prototype)||!(s||dh.includes(r)))return;const i=async function(a,...l){const c=this.transaction(a,s?"readwrite":"readonly");let d=c.store;return n&&(d=d.index(l.shift())),(await Promise.all([d[r](...l),s&&c.done]))[0]};return Zr.set(e,i),i}oh(t=>({...t,get:(e,r,n)=>As(e,r)||t.get(e,r,n),has:(e,r)=>!!As(e,r)||t.has(e,r)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fh{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(r=>{if(ph(r)){const n=r.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(r=>r).join(" ")}}function ph(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const yn="@firebase/app",js="0.16.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ye=new da("@firebase/app"),mh="@firebase/app-compat",gh="@firebase/analytics-compat",yh="@firebase/analytics",bh="@firebase/app-check-compat",xh="@firebase/app-check",wh="@firebase/auth",vh="@firebase/auth-compat",Eh="@firebase/database",_h="@firebase/data-connect",Nh="@firebase/database-compat",Sh="@firebase/functions",Ih="@firebase/functions-compat",Rh="@firebase/installations",kh="@firebase/installations-compat",Ch="@firebase/messaging",Th="@firebase/messaging-compat",Ph="@firebase/performance",Ah="@firebase/performance-compat",jh="@firebase/remote-config",Oh="@firebase/remote-config-compat",Dh="@firebase/storage",Lh="@firebase/storage-compat",Mh="@firebase/firestore",Uh="@firebase/ai",Fh="@firebase/firestore-compat",Bh="firebase",$h="12.19.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bn="[DEFAULT]",Hh={[yn]:"fire-core",[mh]:"fire-core-compat",[yh]:"fire-analytics",[gh]:"fire-analytics-compat",[xh]:"fire-app-check",[bh]:"fire-app-check-compat",[wh]:"fire-auth",[vh]:"fire-auth-compat",[Eh]:"fire-rtdb",[_h]:"fire-data-connect",[Nh]:"fire-rtdb-compat",[Sh]:"fire-fn",[Ih]:"fire-fn-compat",[Rh]:"fire-iid",[kh]:"fire-iid-compat",[Ch]:"fire-fcm",[Th]:"fire-fcm-compat",[Ph]:"fire-perf",[Ah]:"fire-perf-compat",[jh]:"fire-rc",[Oh]:"fire-rc-compat",[Dh]:"fire-gcs",[Lh]:"fire-gcs-compat",[Mh]:"fire-fst",[Fh]:"fire-fst-compat",[Uh]:"fire-vertex","fire-js":"fire-js",[Bh]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rt=new Map,zh=new Map,xn=new Map;function Os(t,e){try{t.container.addComponent(e)}catch(r){ye.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,r)}}function kt(t){const e=t.name;if(xn.has(e))return ye.debug(`There were multiple attempts to register component ${e}.`),!1;xn.set(e,t);for(const r of Rt.values())Os(r,t);for(const r of zh.values())Os(r,t);return!0}function pa(t,e){const r=t.container.getProvider("heartbeat").getImmediate({optional:!0});return r&&r.triggerHeartbeat(),t.container.getProvider(e)}function ne(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vh={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},fe=new Mt("app","Firebase",Vh);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wh{constructor(e,r,n){this._isDeleted=!1,this._options={...e},this._config={...r},this._name=r.name,this._automaticDataCollectionEnabled=r.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new ot("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw fe.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ft=$h;function ma(t,e={}){let r=t;typeof e!="object"&&(e={name:e});const n={name:bn,automaticDataCollectionEnabled:!0,...e},s=n.name;if(typeof s!="string"||!s)throw fe.create("bad-app-name",{appName:String(s)});if(r||(r=ca()),!r)throw fe.create("no-options");const i=Rt.get(s);if(i)if(at(r,i.options)){if(at(n,i.config))return i;throw fe.create("duplicate-app",{appName:s,mismatchedParam:"config",oldValue:JSON.stringify(i.config),newValue:JSON.stringify(n)})}else throw fe.create("duplicate-app",{appName:s,mismatchedParam:"options",oldValue:JSON.stringify(i.options),newValue:JSON.stringify(r)});const a=new Yd(s);for(const c of xn.values())a.addComponent(c);const l=new Wh(r,n,a);return Rt.set(s,l),l}function qh(t=bn){const e=Rt.get(t);if(!e&&t===bn&&ca())return ma();if(!e)throw fe.create("no-app",{appName:t});return e}function Kh(){return Array.from(Rt.values())}function rt(t,e,r){let n=Hh[t]??t;r&&(n+=`-${r}`);const s=n.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const a=[`Unable to register library "${n}" with version "${e}":`];s&&a.push(`library name "${n}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ye.warn(a.join(" "));return}kt(new ot(`${n}-version`,()=>({library:n,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gh="firebase-heartbeat-database",Jh=1,Ct="firebase-heartbeat-store";let Qr=null;function ga(){return Qr||(Qr=uh(Gh,Jh,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Ct)}catch(r){console.warn(r)}}}}).catch(t=>{throw fe.create("idb-open",{originalErrorMessage:t.message})})),Qr}async function Xh(t){try{const r=(await ga()).transaction(Ct),n=await r.objectStore(Ct).get(ya(t));return await r.done,n}catch(e){if(e instanceof Oe)ye.warn(e.message);else{const r=fe.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});ye.warn(r.message)}}}async function Ds(t,e){try{const n=(await ga()).transaction(Ct,"readwrite");await n.objectStore(Ct).put(e,ya(t)),await n.done}catch(r){if(r instanceof Oe)ye.warn(r.message);else{const n=fe.create("idb-set",{originalErrorMessage:r==null?void 0:r.message});ye.warn(n.message)}}}function ya(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yh=1024,Zh=30;class Qh{constructor(e){this.container=e,this._heartbeatsCache=null;const r=this.container.getProvider("app").getImmediate();this._storage=new tf(r),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var e,r;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Ls();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((r=this._heartbeatsCache)==null?void 0:r.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>Zh){const a=rf(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){ye.warn(n)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const r=Ls(),{heartbeatsToSend:n,unsentEntries:s}=ef(this._heartbeatsCache.heartbeats),i=oa(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=r,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(r){return ye.warn(r),""}}}function Ls(){return new Date().toISOString().substring(0,10)}function ef(t,e=Yh){const r=[];let n=t.slice();for(const s of t){const i=r.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Ms(r)>e){i.dates.pop();break}}else if(r.push({agent:s.agent,dates:[s.date]}),Ms(r)>e){r.pop();break}n=n.slice(1)}return{heartbeatsToSend:r,unsentEntries:n}}class tf{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Dd()?Ld().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const r=await Xh(this.app);return r!=null&&r.heartbeats?r:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return Ds(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return Ds(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}else return}}function Ms(t){return oa(JSON.stringify({version:2,heartbeats:t})).length}function rf(t){if(t.length===0)return-1;let e=0,r=t[0].date;for(let n=1;n<t.length;n++)t[n].date<r&&(r=t[n].date,e=n);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nf(t){kt(new ot("platform-logger",e=>new fh(e),"PRIVATE")),kt(new ot("heartbeat",e=>new Qh(e),"PRIVATE")),rt(yn,js,t),rt(yn,js,"esm2020"),rt("fire-js","")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */nf("");var sf="firebase",af="12.19.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */rt(sf,af,"app");function ba(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const of=ba,xa=new Mt("auth","Firebase",ba());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gr=new da("@firebase/auth");function sr(t,...e){gr.logLevel<=P.WARN&&gr.warn(`Auth (${Ft}): ${t}`,...e)}function ir(t,...e){gr.logLevel<=P.ERROR&&gr.error(`Auth (${Ft}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ae(t,...e){throw Dn(t,...e)}function ee(t,...e){return Dn(t,...e)}function Ar(t,e,r){const n={...of(),[e]:r};return new Mt("auth","Firebase",n).create(e,{appName:t.name})}function $e(t){return Ar(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function lf(t,e,r){const n=r;if(!(e instanceof n))throw n.name!==e.constructor.name&&ae(t,"argument-error"),Ar(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Dn(t,...e){if(typeof t!="string"){const r=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=t.name),t._errorFactory.create(r,...n)}return xa.create(t,...e)}function S(t,e,...r){if(!t)throw Dn(e,...r)}function pe(t){const e="INTERNAL ASSERTION FAILED: "+t;throw ir(e),new Error(e)}function be(t,e){t||pe(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wn(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.href)||""}function cf(){return Us()==="http:"||Us()==="https:"}function Us(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uf(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(cf()||Ad()||"connection"in navigator)?navigator.onLine:!0}function df(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(e,r){this.shortDelay=e,this.longDelay=r,be(r>e,"Short delay should be less than long delay!"),this.isMobile=Td()||jd()}get(){return uf()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ln(t,e){be(t.emulator,"Emulator should always be set here");const{url:r}=t.emulator;return e?`${r}${e.startsWith("/")?e.slice(1):e}`:r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wa{static initialize(e,r,n){this.fetchImpl=e,r&&(this.headersImpl=r),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;pe("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;pe("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;pe("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hf={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ff=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],pf=new Bt(3e4,6e4);function Mn(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function pt(t,e,r,n,s={}){return va(t,s,async()=>{let i={},a={};n&&(e==="GET"?a=n:i={body:JSON.stringify(n)});const l=Ut({...a,key:t.config.apiKey}).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const d={method:e,headers:c,...i};return Pd()||(d.referrerPolicy="strict-origin-when-cross-origin"),t.emulatorConfig&&jn(t.emulatorConfig.host)&&(d.credentials="include"),wa.fetch()(await Ea(t,t.config.apiHost,r,l),d)})}async function va(t,e,r){t._canInitEmulator=!1;const n={...hf,...e};try{const s=new gf(t),i=await Promise.race([r(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw Xt(t,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const l=i.ok?a.errorMessage:a.error.message,[c,d]=l.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Xt(t,"credential-already-in-use",a);if(c==="EMAIL_EXISTS")throw Xt(t,"email-already-in-use",a);if(c==="USER_DISABLED")throw Xt(t,"user-disabled",a);const u=n[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Ar(t,u,d);ae(t,u)}}catch(s){if(s instanceof Oe)throw s;ae(t,"network-request-failed",{message:String(s)})}}async function mf(t,e,r,n,s={}){const i=await pt(t,e,r,n,s);return"mfaPendingCredential"in i&&ae(t,"multi-factor-auth-required",{_serverResponse:i}),i}async function Ea(t,e,r,n){const s=`${e}${r}?${n}`,i=t,a=i.config.emulator?Ln(t.config,s):`${t.config.apiScheme}://${s}`;return ff.includes(r)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}class gf{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((r,n)=>{this.timer=setTimeout(()=>n(ee(this.auth,"network-request-failed")),pf.get())})}}function Xt(t,e,r){const n={appName:t.name};r.email&&(n.email=r.email),r.phoneNumber&&(n.phoneNumber=r.phoneNumber);const s=ee(t,e,n);return s.customData._tokenResponse=r,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yf(t,e){return pt(t,"POST","/v1/accounts:delete",e)}async function yr(t,e){return pt(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vt(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function bf(t,e=!1){const r=Ge(t),n=await r.getIdToken(e),s=Un(n);S(s&&s.exp&&s.auth_time&&s.iat,r.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i==null?void 0:i.sign_in_provider;return{claims:s,token:n,authTime:vt(en(s.auth_time)),issuedAtTime:vt(en(s.iat)),expirationTime:vt(en(s.exp)),signInProvider:a||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function en(t){return Number(t)*1e3}function Un(t){const[e,r,n]=t.split(".");if(e===void 0||r===void 0||n===void 0)return ir("JWT malformed, contained fewer than 3 sections"),null;try{const s=la(r);return s?JSON.parse(s):(ir("Failed to decode base64 JWT payload"),null)}catch(s){return ir("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Fs(t){const e=Un(t);return S(e,"internal-error"),S(typeof e.exp<"u","internal-error"),S(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tt(t,e,r=!1){if(r)return e;try{return await e}catch(n){throw n instanceof Oe&&xf(n)&&t.auth.currentUser===t&&await t.auth.signOut(),n}}function xf({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wf{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const n=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,n)}}schedule(e=!1){if(!this.isRunning)return;const r=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},r)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vn{constructor(e,r){this.createdAt=e,this.lastLoginAt=r,this._initializeTime()}_initializeTime(){this.lastSignInTime=vt(this.lastLoginAt),this.creationTime=vt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function br(t){var h;const e=t.auth,r=await t.getIdToken(),n=await Tt(t,yr(e,{idToken:r}));S(n==null?void 0:n.users.length,e,"internal-error");const s=n.users[0];t._notifyReloadListener(s);const i=(h=s.providerUserInfo)!=null&&h.length?_a(s.providerUserInfo):[],a=Ef(t.providerData,i),l=t.isAnonymous,c=!(t.email&&s.passwordHash)&&!(a!=null&&a.length),d=l?c:!1,u={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new vn(s.createdAt,s.lastLoginAt),isAnonymous:d};Object.assign(t,u)}async function vf(t){const e=Ge(t);await br(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Ef(t,e){return[...t.filter(n=>!e.some(s=>s.providerId===n.providerId)),...e]}function _a(t){return t.map(({providerId:e,...r})=>({providerId:e,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _f(t,e){const r=await va(t,{},async()=>{const n=Ut({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,a=await Ea(t,s,"/v1/token",`key=${i}`),l=await t._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:l,body:n};return t.emulatorConfig&&jn(t.emulatorConfig.host)&&(c.credentials="include"),wa.fetch()(a,c)});return{accessToken:r.access_token,expiresIn:r.expires_in,refreshToken:r.refresh_token}}async function Nf(t,e){return pt(t,"POST","/v2/accounts:revokeToken",Mn(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){S(e.idToken,"internal-error"),S(typeof e.idToken<"u","internal-error"),S(typeof e.refreshToken<"u","internal-error");const r="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Fs(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,r)}updateFromIdToken(e){S(e.length!==0,"internal-error");const r=Fs(e);this.updateTokensAndExpiration(e,null,r)}async getToken(e,r=!1){return!r&&this.accessToken&&!this.isExpired?this.accessToken:(S(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,r){const{accessToken:n,refreshToken:s,expiresIn:i}=await _f(e,r);this.updateTokensAndExpiration(n,s,Number(i))}updateTokensAndExpiration(e,r,n){this.refreshToken=r||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,r){const{refreshToken:n,accessToken:s,expirationTime:i}=r,a=new nt;return n&&(S(typeof n=="string","internal-error",{appName:e}),a.refreshToken=n),s&&(S(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(S(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new nt,this.toJSON())}_performRefresh(){return pe("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ne(t,e){S(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Q{constructor({uid:e,auth:r,stsTokenManager:n,...s}){this.providerId="firebase",this.proactiveRefresh=new wf(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=r,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new vn(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const r=await Tt(this,this.stsTokenManager.getToken(this.auth,e));return S(r,this.auth,"internal-error"),this.accessToken!==r&&(this.accessToken=r,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),r}getIdTokenResult(e){return bf(this,e)}reload(){return vf(this)}_assign(e){this!==e&&(S(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(r=>({...r})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const r=new Q({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return r.metadata._copy(this.metadata),r}_onReload(e){S(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,r=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),r&&await br(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ne(this.auth.app))return Promise.reject($e(this.auth));const e=await this.getIdToken();return await Tt(this,yf(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,r){const n=r.displayName??void 0,s=r.email??void 0,i=r.phoneNumber??void 0,a=r.photoURL??void 0,l=r.tenantId??void 0,c=r._redirectEventId??void 0,d=r.createdAt??void 0,u=r.lastLoginAt??void 0,{uid:h,emailVerified:g,isAnonymous:b,providerData:v,stsTokenManager:w}=r;S(h&&w,e,"internal-error");const E=nt.fromJSON(this.name,w);S(typeof h=="string",e,"internal-error"),Ne(n,e.name),Ne(s,e.name),S(typeof g=="boolean",e,"internal-error"),S(typeof b=="boolean",e,"internal-error"),Ne(i,e.name),Ne(a,e.name),Ne(l,e.name),Ne(c,e.name),Ne(d,e.name),Ne(u,e.name);const p=new Q({uid:h,auth:e,email:s,emailVerified:g,displayName:n,isAnonymous:b,photoURL:a,phoneNumber:i,tenantId:l,stsTokenManager:E,createdAt:d,lastLoginAt:u});return v&&Array.isArray(v)&&(p.providerData=v.map(y=>({...y}))),c&&(p._redirectEventId=c),p}static async _fromIdTokenResponse(e,r,n=!1){const s=new nt;s.updateFromServerResponse(r);const i=new Q({uid:r.localId,auth:e,stsTokenManager:s,isAnonymous:n});return await br(i),i}static async _fromGetAccountInfoResponse(e,r,n){const s=r.users[0];S(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?_a(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new nt;l.updateFromIdToken(n);const c=new Q({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:a}),d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new vn(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(c,d),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bs=new Map;function me(t){be(t instanceof Function,"Expected a class definition");let e=Bs.get(t);return e?(be(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Bs.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Na{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,r){this.storage[e]=r}async _get(e){const r=this.storage[e];return r===void 0?null:r}async _remove(e){delete this.storage[e]}_addListener(e,r){}_removeListener(e,r){}}Na.type="NONE";const $s=Na;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ar(t,e,r){return`firebase:${t}:${e}:${r}`}class He{constructor(e,r,n){this.persistence=e,this.auth=r,this.userKey=n;const{config:s,name:i}=this.auth;this.fullUserKey=ar(this.userKey,s.apiKey,i),this.fullPersistenceKey=ar("persistence",s.apiKey,i),this.boundEventHandler=r._onStorageEvent.bind(r);try{this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}catch{}}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const r=await yr(this.auth,{idToken:e}).catch(()=>{});return r?Q._fromGetAccountInfoResponse(this.auth,r,e):null}return Q._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const r=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,r)return this.setCurrentUser(r)}delete(){try{this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}catch{}}static async create(e,r,n="authUser"){if(!r.length)return new He(me($s),e,n);const s=(await Promise.all(r.map(async d=>{try{if(await d._isAvailable())return d}catch{return}}))).filter(d=>d);let i=s[0]||me($s);const a=ar(n,e.config.apiKey,e.name);let l=null;for(const d of r)try{const u=await d._get(a);if(u){let h;if(typeof u=="string"){const g=await yr(e,{idToken:u}).catch(()=>{});if(!g)break;h=await Q._fromGetAccountInfoResponse(e,g,u)}else h=Q._fromJSON(e,u);d!==i&&(l=h),i=d;break}}catch{}const c=s.filter(d=>d._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new He(i,e,n):(i=c[0],l&&await i._set(a,l.toJSON()),await Promise.all(r.map(async d=>{if(d!==i)try{await d._remove(a)}catch{}})),new He(i,e,n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hs(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(ka(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Sa(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Ta(e))return"Blackberry";if(Pa(e))return"Webos";if(Ia(e))return"Safari";if((e.includes("chrome/")||Ra(e))&&!e.includes("edge/"))return"Chrome";if(Ca(e))return"Android";{const r=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=t.match(r);if((n==null?void 0:n.length)===2)return n[1]}return"Other"}function Sa(t=W()){return/firefox\//i.test(t)}function Ia(t=W()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Ra(t=W()){return/crios\//i.test(t)}function ka(t=W()){return/iemobile/i.test(t)}function Ca(t=W()){return/android/i.test(t)}function Ta(t=W()){return/blackberry/i.test(t)}function Pa(t=W()){return/webos/i.test(t)}function Fn(t=W()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function Sf(t=W()){var e;return Fn(t)&&!!((e=window.navigator)!=null&&e.standalone)}function If(){return Od()&&document.documentMode===10}function Aa(t=W()){return Fn(t)||Ca(t)||Pa(t)||Ta(t)||/windows phone/i.test(t)||ka(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ja(t,e=[]){let r;switch(t){case"Browser":r=Hs(W());break;case"Worker":r=`${Hs(W())}-${t}`;break;default:r=t}const n=e.length?e.join(","):"FirebaseCore-web";return`${r}/JsCore/${Ft}/${n}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rf{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,r){const n=i=>new Promise((a,l)=>{try{const c=e(i);a(c)}catch(c){l(c)}});n.onAbort=r,this.queue.push(n);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const r=[];try{for(const n of this.queue)await n(e),n.onAbort&&r.push(n.onAbort)}catch(n){r.reverse();for(const s of r)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n==null?void 0:n.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kf(t,e={}){return pt(t,"GET","/v2/passwordPolicy",Mn(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cf=6;class Tf{constructor(e){var n;const r=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=r.minPasswordLength??Cf,r.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=r.maxPasswordLength),r.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=r.containsLowercaseCharacter),r.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=r.containsUppercaseCharacter),r.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=r.containsNumericCharacter),r.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=r.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((n=e.allowedNonAlphanumericCharacters)==null?void 0:n.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const r={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,r),this.validatePasswordCharacterOptions(e,r),r.isValid&&(r.isValid=r.meetsMinPasswordLength??!0),r.isValid&&(r.isValid=r.meetsMaxPasswordLength??!0),r.isValid&&(r.isValid=r.containsLowercaseLetter??!0),r.isValid&&(r.isValid=r.containsUppercaseLetter??!0),r.isValid&&(r.isValid=r.containsNumericCharacter??!0),r.isValid&&(r.isValid=r.containsNonAlphanumericCharacter??!0),r}validatePasswordLengthOptions(e,r){const n=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;n&&(r.meetsMinPasswordLength=e.length>=n),s&&(r.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,r){this.updatePasswordCharacterOptionsStatuses(r,!1,!1,!1,!1);let n;for(let s=0;s<e.length;s++)n=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(r,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,r,n,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=r)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pf{constructor(e,r,n,s){this.app=e,this.heartbeatServiceProvider=r,this.appCheckServiceProvider=n,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new zs(this),this.idTokenSubscription=new zs(this),this.beforeStateQueue=new Rf(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=xa,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,r){return r&&(this._popupRedirectResolver=me(r)),this._initializationPromise=this.queue(async()=>{var n,s,i;if(!this._deleted){try{this.persistenceManager=await He.create(this,e)}catch(a){sr(`Failed to initialize persistence: ${a}`),this.persistenceManager=await He.create(this,[])}finally{(n=this._resolvePersistenceManagerAvailable)==null||n.call(this)}if(!this._deleted){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}try{await this.initializeCurrentUser(r)}catch(a){sr(`Failed to initialize current user: ${a}`),await this.directlySetCurrentUser(null).catch(()=>{})}this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const r=await yr(this,{idToken:e}),n=await Q._fromGetAccountInfoResponse(this,r,e);await this.directlySetCurrentUser(n)}catch(r){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",r),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(ne(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let n=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(i=this.redirectUser)==null?void 0:i._redirectEventId,l=n==null?void 0:n._redirectEventId,c=await this.tryRedirectSignIn(e);(!a||a===l)&&(c!=null&&c.user)&&(n=c.user,s=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(n)}catch(a){n=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return S(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let r=null;try{r=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return r}async reloadAndSetCurrentUserOrClear(e){try{await br(e)}catch(r){if((r==null?void 0:r.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=df()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ne(this.app))return Promise.reject($e(this));const r=e?Ge(e):null;return r&&S(r.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(r&&r._clone(this))}async _updateCurrentUser(e,r=!1){if(!this._deleted)return e&&S(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),r||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ne(this.app)?Promise.reject($e(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ne(this.app)?Promise.reject($e(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(me(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const r=this._getPasswordPolicyInternal();return r.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):r.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await kf(this),r=new Tf(e);this.tenantId===null?this._projectPasswordPolicy=r:this._tenantPasswordPolicies[this.tenantId]=r}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Mt("auth","Firebase",e())}onAuthStateChanged(e,r,n){return this.registerStateListener(this.authStateSubscription,e,r,n)}beforeAuthStateChanged(e,r){return this.beforeStateQueue.pushCallback(e,r)}onIdTokenChanged(e,r,n){return this.registerStateListener(this.idTokenSubscription,e,r,n)}authStateReady(){return new Promise((e,r)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},r)}})}async revokeAccessToken(e){if(this.currentUser){const r=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:r};this.tenantId!=null&&(n.tenantId=this.tenantId),await Nf(this,n)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,r){const n=await this.getOrInitRedirectPersistenceManager(r);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const r=e&&me(e)||this._popupRedirectResolver;S(r,this,"argument-error"),this.redirectPersistenceManager=await He.create(this,[me(r._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var r,n;return this._isInitialized&&await this.queue(async()=>{}),((r=this._currentUser)==null?void 0:r._redirectEventId)===e?this._currentUser:((n=this.redirectUser)==null?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var r;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((r=this.currentUser)==null?void 0:r.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,r,n,s){if(this._deleted)return()=>{};const i=typeof r=="function"?r:r.next.bind(r);let a=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(S(l,this,"internal-error"),l.then(()=>{a||i(this.currentUser)}).catch(c=>{if(!a)if(typeof r!="function"&&r.error)r.error(c);else if(n)n(c);else throw c}),typeof r=="function"){const c=e.addObserver(r,n,s);return()=>{a=!0,c()}}else{const c=e.addObserver(r);return()=>{a=!0,c()}}}async directlySetCurrentUser(e){if(this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,this.persistenceManager)try{e?await this.persistenceManager.setCurrentUser(e):await this.persistenceManager.removeCurrentUser()}catch(r){const n=(r==null?void 0:r.message)||String(r),s=Ar(this,"internal-error",`An internal AuthError has occurred: ${n}`);throw s.customData={originalError:r},s}}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return S(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=ja(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const r=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());r&&(e["X-Firebase-Client"]=r);const n=await this._getAppCheckToken();return n&&(e["X-Firebase-AppCheck"]=n),e}async _getAppCheckToken(){var r;if(ne(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((r=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:r.getToken());return e!=null&&e.error&&sr(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function jr(t){return Ge(t)}class zs{constructor(e){this.auth=e,this.observer=null,this.addObserver=Bd(r=>this.observer=r)}get next(){return S(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Bn={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Af(t){Bn=t}function jf(t){return Bn.loadJS(t)}function Of(){return Bn.gapiScript}function Df(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lf(t,e){const r=pa(t,"auth");if(r.isInitialized()){const s=r.getImmediate(),i=r.getOptions();if(at(i,e??{}))return s;ae(s,"already-initialized")}return r.initialize({options:e})}function Mf(t,e){const r=(e==null?void 0:e.persistence)||[],n=(Array.isArray(r)?r:[r]).map(me);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(n,e==null?void 0:e.popupRedirectResolver)}function Uf(t,e,r){const n=jr(t);S(/^https?:\/\//.test(e),n,"invalid-emulator-scheme");const s=!1,i=Oa(e),{host:a,port:l}=Ff(e),c=l===null?"":`:${l}`,d={url:`${i}//${a}${c}/`},u=Object.freeze({host:a,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!n._canInitEmulator){S(n.config.emulator&&n.emulatorConfig,n,"emulator-config-failed"),S(at(d,n.config.emulator)&&at(u,n.emulatorConfig),n,"emulator-config-failed");return}n.config.emulator=d,n.emulatorConfig=u,n.settings.appVerificationDisabledForTesting=!0,jn(a)?Kd(`${i}//${a}${c}`):Bf()}function Oa(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function Ff(t){const e=Oa(t),r=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!r)return{host:"",port:null};const n=r[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(n);if(s){const i=s[1];return{host:i,port:Vs(n.substr(i.length+1))}}else{const[i,a]=n.split(":");return{host:i,port:Vs(a)}}}function Vs(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Bf(){function t(){const e=document.createElement("p"),r=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",r.position="fixed",r.width="100%",r.backgroundColor="#ffffff",r.border=".1em solid #000000",r.color="#b50000",r.bottom="0px",r.left="0px",r.margin="0px",r.zIndex="10000",r.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Da{constructor(e,r){this.providerId=e,this.signInMethod=r}toJSON(){return pe("not implemented")}_getIdTokenResponse(e){return pe("not implemented")}_linkToIdToken(e,r){return pe("not implemented")}_getReauthenticationResolver(e){return pe("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function st(t,e){return mf(t,"POST","/v1/accounts:signInWithIdp",Mn(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $f="http://localhost";class Ke extends Da{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const r=new Ke(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(r.idToken=e.idToken),e.accessToken&&(r.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(r.nonce=e.nonce),e.pendingToken&&(r.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(r.accessToken=e.oauthToken,r.secret=e.oauthTokenSecret):ae("argument-error"),r}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const r=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:s,...i}=r;if(!n||!s)return null;const a=new Ke(n,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const r=this.buildRequest();return st(e,r)}_linkToIdToken(e,r){const n=this.buildRequest();return n.idToken=r,st(e,n)}_getReauthenticationResolver(e){const r=this.buildRequest();return r.autoCreate=!1,st(e,r)}buildRequest(){const e={requestUri:$f,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const r={};this.idToken&&(r.id_token=this.idToken),this.accessToken&&(r.access_token=this.accessToken),this.secret&&(r.oauth_token_secret=this.secret),r.providerId=this.providerId,this.nonce&&!this.pendingToken&&(r.nonce=this.nonce),e.postBody=Ut(r)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $n{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t extends $n{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ie extends $t{constructor(){super("facebook.com")}static credential(e){return Ke._fromParams({providerId:Ie.PROVIDER_ID,signInMethod:Ie.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ie.credentialFromTaggedObject(e)}static credentialFromError(e){return Ie.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ie.credential(e.oauthAccessToken)}catch{return null}}}Ie.FACEBOOK_SIGN_IN_METHOD="facebook.com";Ie.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class he extends $t{constructor(){super("google.com"),this.addScope("profile")}static credential(e,r){return Ke._fromParams({providerId:he.PROVIDER_ID,signInMethod:he.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:r})}static credentialFromResult(e){return he.credentialFromTaggedObject(e)}static credentialFromError(e){return he.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:r,oauthAccessToken:n}=e;if(!r&&!n)return null;try{return he.credential(r,n)}catch{return null}}}he.GOOGLE_SIGN_IN_METHOD="google.com";he.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re extends $t{constructor(){super("github.com")}static credential(e){return Ke._fromParams({providerId:Re.PROVIDER_ID,signInMethod:Re.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Re.credentialFromTaggedObject(e)}static credentialFromError(e){return Re.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Re.credential(e.oauthAccessToken)}catch{return null}}}Re.GITHUB_SIGN_IN_METHOD="github.com";Re.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke extends $t{constructor(){super("twitter.com")}static credential(e,r){return Ke._fromParams({providerId:ke.PROVIDER_ID,signInMethod:ke.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:r})}static credentialFromResult(e){return ke.credentialFromTaggedObject(e)}static credentialFromError(e){return ke.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:r,oauthTokenSecret:n}=e;if(!r||!n)return null;try{return ke.credential(r,n)}catch{return null}}}ke.TWITTER_SIGN_IN_METHOD="twitter.com";ke.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,r,n,s=!1){const i=await Q._fromIdTokenResponse(e,n,s),a=Ws(n);return new lt({user:i,providerId:a,_tokenResponse:n,operationType:r})}static async _forOperation(e,r,n){await e._updateTokensIfNecessary(n,!0);const s=Ws(n);return new lt({user:e,providerId:s,_tokenResponse:n,operationType:r})}}function Ws(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xr extends Oe{constructor(e,r,n,s){super(r.code,r.message),this.operationType=n,this.user=s,Object.setPrototypeOf(this,xr.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:r.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,r,n,s){return new xr(e,r,n,s)}}function La(t,e,r,n){return(e==="reauthenticate"?r._getReauthenticationResolver(t):r._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?xr._fromErrorAndOperation(t,i,e,n):i})}async function Hf(t,e,r=!1){const n=await Tt(t,e._linkToIdToken(t.auth,await t.getIdToken()),r);return lt._forOperation(t,"link",n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zf(t,e,r=!1){const{auth:n}=t;if(ne(n.app))return Promise.reject($e(n));const s="reauthenticate";try{const i=await Tt(t,La(n,s,e,t),r);S(i.idToken,n,"internal-error");const a=Un(i.idToken);S(a,n,"internal-error");const{sub:l}=a;return S(t.uid===l,n,"user-mismatch"),lt._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&ae(n,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vf(t,e,r=!1){if(ne(t.app))return Promise.reject($e(t));const n="signIn",s=await La(t,n,e),i=await lt._fromIdTokenResponse(t,n,s);return r||await t._updateCurrentUser(i.user),i}function Wf(t,e,r,n){return Ge(t).onIdTokenChanged(e,r,n)}function qf(t,e,r){return Ge(t).beforeAuthStateChanged(e,r)}function Kf(t){return Ge(t).signOut()}const wr="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ma{constructor(e,r){this.storageRetriever=e,this.type=r}_isAvailable(){try{return this.storage?(this.storage.setItem(wr,"1"),this.storage.removeItem(wr),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,r){return this.storage.setItem(e,JSON.stringify(r)),Promise.resolve()}_get(e){const r=this.storage.getItem(e);return Promise.resolve(r?JSON.parse(r):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gf=1e3,Jf=10;class Ua extends Ma{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,r)=>this.onStorageEvent(e,r),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Aa(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const r of Object.keys(this.listeners)){const n=this.storage.getItem(r),s=this.localCache[r];n!==s&&e(r,s,n)}}onStorageEvent(e,r=!1){if(!e.key){this.forAllChangedKeys((a,l,c)=>{this.notifyListeners(a,c)});return}const n=e.key;r?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(n);!r&&this.localCache[n]===a||this.notifyListeners(n,a)},i=this.storage.getItem(n);If()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Jf):s()}notifyListeners(e,r){this.localCache[e]=r;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(r&&JSON.parse(r))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,r,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:r,newValue:n}),!0)})},Gf)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,r){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(r)}_removeListener(e,r){this.listeners[e]&&(this.listeners[e].delete(r),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,r){await super._set(e,r),this.localCache[e]=JSON.stringify(r)}async _get(e){const r=await super._get(e);return this.localCache[e]=JSON.stringify(r),r}async _remove(e){await super._remove(e),delete this.localCache[e]}}Ua.type="LOCAL";const Xf=Ua;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fa extends Ma{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,r){}_removeListener(e,r){}}Fa.type="SESSION";const Ba=Fa;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yf(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(r){return{fulfilled:!1,reason:r}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Or{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const r=this.receivers.find(s=>s.isListeningto(e));if(r)return r;const n=new Or(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const r=e,{eventId:n,eventType:s,data:i}=r.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;r.ports[0].postMessage({status:"ack",eventId:n,eventType:s});const l=Array.from(a).map(async d=>d(r.origin,i)),c=await Yf(l);r.ports[0].postMessage({status:"done",eventId:n,eventType:s,response:c})}_subscribe(e,r){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(r)}_unsubscribe(e,r){this.handlersMap[e]&&r&&this.handlersMap[e].delete(r),(!r||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Or.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hn(t="",e=10){let r="";for(let n=0;n<e;n++)r+=Math.floor(Math.random()*10);return t+r}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zf{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,r,n=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((l,c)=>{const d=Hn("",20);s.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},n);a={messageChannel:s,onMessage(h){const g=h;if(g.data.eventId===d)switch(g.data.status){case"ack":clearTimeout(u),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(g.data.response);break;default:clearTimeout(u),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:r},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ie(){return window}function Qf(t){ie().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $a(){return typeof ie().WorkerGlobalScope<"u"&&typeof ie().importScripts=="function"}async function ep(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function tp(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)==null?void 0:t.controller)||null}function rp(){return $a()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ha="firebaseLocalStorageDb",np=1,vr="firebaseLocalStorage",za="fbase_key";class Ht{constructor(e){this.request=e}toPromise(){return new Promise((e,r)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{r(this.request.error)})})}}function Dr(t,e){return t.transaction([vr],e?"readwrite":"readonly").objectStore(vr)}function sp(){const t=indexedDB.deleteDatabase(Ha);return new Ht(t).toPromise()}function Va(){const t=indexedDB.open(Ha,np);return new Promise((e,r)=>{t.addEventListener("error",()=>{r(t.error)}),t.addEventListener("upgradeneeded",()=>{const n=t.result;try{n.createObjectStore(vr,{keyPath:za})}catch(s){r(s)}}),t.addEventListener("success",async()=>{const n=t.result;n.objectStoreNames.contains(vr)?e(n):(n.close(),await sp(),e(await Va()))})})}async function qs(t,e,r){const n=Dr(t,!0).put({[za]:e,value:r});return new Ht(n).toPromise()}async function ip(t,e){const r=Dr(t,!1).get(e),n=await new Ht(r).toPromise();return n===void 0?null:n.value}function Ks(t,e){const r=Dr(t,!0).delete(e);return new Ht(r).toPromise()}const ap=800,op=3;class Wa{registerLifecycleListeners(){typeof window<"u"&&typeof window.addEventListener=="function"&&(window.addEventListener("pagehide",this.onPageHide),window.addEventListener("pageshow",this.onPageShow))}unregisterLifecycleListeners(){typeof window<"u"&&typeof window.removeEventListener=="function"&&(window.removeEventListener("pagehide",this.onPageHide),window.removeEventListener("pageshow",this.onPageShow))}constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.isClosing=!1,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this.onPageHide=()=>{this.isClosing=!0,this.stopPolling(),this.dbPromise&&(this.dbPromise.then(e=>e.close()).catch(()=>{}),this.dbPromise=null)},this.onPageShow=()=>{this.isClosing&&(this.isClosing=!1,Object.keys(this.listeners).length>0&&this.startPolling())},this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=Va(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let r=0;for(;;)try{const n=await this._openDb();return await e(n)}catch(n){if(r++>op)throw n;if(this.dbPromise){const s=this.dbPromise;this.dbPromise=null;try{(await s).close()}catch{}}}}async initializeServiceWorkerMessaging(){return $a()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Or._getInstance(rp()),this.receiver._subscribe("keyChanged",async(e,r)=>({keyProcessed:(await this._poll()).includes(r.key)})),this.receiver._subscribe("ping",async(e,r)=>["keyChanged"])}async initializeSender(){var r,n;if(this.activeServiceWorker=await ep(),!this.activeServiceWorker)return;this.sender=new Zf(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(r=e[0])!=null&&r.fulfilled&&(n=e[0])!=null&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||tp()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await qs(e,wr,"1"),await Ks(e,wr)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,r){return this._withPendingWrite(async()=>(await this._withRetries(n=>qs(n,e,r)),this.localCache[e]=r,this.notifyServiceWorker(e)))}async _get(e){const r=await this._withRetries(n=>ip(n,e));return this.localCache[e]=r,r}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(r=>Ks(r,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){if(this.isClosing)return[];try{const e=await this._withRetries(s=>{const i=Dr(s,!1).getAll();return new Ht(i).toPromise()});if(this.isClosing)return[];if(!e)return[];if(this.pendingWrites!==0)return[];const r=[],n=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)n.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),r.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!n.has(s)&&(this.notifyListeners(s,null),r.push(s));return r}catch(e){return this.isClosing||sr(`Firebase Auth cross-tab polling failed with error: ${e}`),[]}}notifyListeners(e,r){this.localCache[e]=r;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(r)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),ap)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,r){Object.keys(this.listeners).length===0&&(this.startPolling(),this.registerLifecycleListeners()),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(r)}_removeListener(e,r){this.listeners[e]&&(this.listeners[e].delete(r),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.stopPolling(),this.unregisterLifecycleListeners())}}Wa.type="LOCAL";const lp=Wa;new Bt(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qa(t,e){return e?me(e):(S(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zn extends Da{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return st(e,this._buildIdpRequest())}_linkToIdToken(e,r){return st(e,this._buildIdpRequest(r))}_getReauthenticationResolver(e){return st(e,this._buildIdpRequest())}_buildIdpRequest(e){const r={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(r.idToken=e),r}}function cp(t){return Vf(t.auth,new zn(t),t.bypassAuthState)}function up(t){const{auth:e,user:r}=t;return S(r,e,"internal-error"),zf(r,new zn(t),t.bypassAuthState)}async function dp(t){const{auth:e,user:r}=t;return S(r,e,"internal-error"),Hf(r,new zn(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ka{constructor(e,r,n,s,i=!1){this.auth=e,this.resolver=n,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(r)?r:[r]}execute(){return new Promise(async(e,r)=>{this.pendingPromise={resolve:e,reject:r};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:r,sessionId:n,postBody:s,tenantId:i,error:a,type:l}=e;if(a){this.reject(a);return}const c={auth:this.auth,requestUri:r,sessionId:n,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(c))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return cp;case"linkViaPopup":case"linkViaRedirect":return dp;case"reauthViaPopup":case"reauthViaRedirect":return up;default:ae(this.auth,"internal-error")}}resolve(e){be(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){be(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hp=new Bt(2e3,1e4);async function fp(t,e,r){if(ne(t.app))return Promise.reject(ee(t,"operation-not-supported-in-this-environment"));const n=jr(t);lf(t,e,$n);const s=qa(n,r);return new Fe(n,"signInViaPopup",e,s).executeNotNull()}class Fe extends Ka{constructor(e,r,n,s,i){super(e,r,s,i),this.provider=n,this.authWindow=null,this.pollId=null,Fe.currentPopupAction&&Fe.currentPopupAction.cancel(),Fe.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return S(e,this.auth,"internal-error"),e}async onExecution(){be(this.filter.length===1,"Popup operations only handle one event");const e=Hn();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(r=>{this.reject(r)}),this.resolver._isIframeWebStorageSupported(this.auth,r=>{r||this.reject(ee(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(ee(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Fe.currentPopupAction=null}pollUserCancellation(){const e=()=>{var r,n;if((n=(r=this.authWindow)==null?void 0:r.window)!=null&&n.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ee(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,hp.get())};e()}}Fe.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pp="pendingRedirect",or=new Map;class mp extends Ka{constructor(e,r,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],r,void 0,n),this.eventId=null}async execute(){let e=or.get(this.auth._key());if(!e){try{const n=await gp(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(n)}catch(r){e=()=>Promise.reject(r)}or.set(this.auth._key(),e)}return this.bypassAuthState||or.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const r=await this.auth._redirectUserForId(e.eventId);if(r)return this.user=r,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function gp(t,e){const r=xp(e),n=bp(t);if(!await n._isAvailable())return!1;const s=await n._get(r)==="true";return await n._remove(r),s}function yp(t,e){or.set(t._key(),e)}function bp(t){return me(t._redirectPersistence)}function xp(t){return ar(pp,t.config.apiKey,t.name)}async function wp(t,e,r=!1){if(ne(t.app))return Promise.reject($e(t));const n=jr(t),s=qa(n,e),a=await new mp(n,s,r).execute();return a&&!r&&(delete a.user._redirectEventId,await n._persistUserIfCurrent(a.user),await n._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vp=10*60*1e3;class Ep{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let r=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(r=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!_p(e)||(this.hasHandledPotentialRedirect=!0,r||(this.queuedRedirectEvent=e,r=!0)),r}sendToConsumer(e,r){var n;if(e.error&&!Ga(e)){const s=((n=e.error.code)==null?void 0:n.split("auth/")[1])||"internal-error";r.onError(ee(this.auth,s))}else r.onAuthEvent(e)}isEventForConsumer(e,r){const n=r.eventId===null||!!e.eventId&&e.eventId===r.eventId;return r.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=vp&&this.cachedEventUids.clear(),this.cachedEventUids.has(Gs(e))}saveEventToCache(e){this.cachedEventUids.add(Gs(e)),this.lastProcessedEventTime=Date.now()}}function Gs(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Ga({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function _p(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Ga(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Np(t,e={}){return pt(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sp=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Ip=/^https?/;async function Rp(t){if(t.config.emulator)return;const{authorizedDomains:e}=await Np(t);for(const r of e)try{if(kp(r))return}catch{}ae(t,"unauthorized-domain")}function kp(t){const e=wn(),{protocol:r,hostname:n}=new URL(e);if(t.startsWith("chrome-extension://")){const a=new URL(t);return a.hostname===""&&n===""?r==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):r==="chrome-extension:"&&a.hostname===n}if(!Ip.test(r))return!1;if(Sp.test(t))return n===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(n)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cp=new Bt(3e4,6e4);function Js(){const t=ie().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let r=0;r<t.CP.length;r++)t.CP[r]=null}}function Tp(t){return new Promise((e,r)=>{var s,i,a;function n(){Js(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Js(),r(ee(t,"network-request-failed"))},timeout:Cp.get()})}if((i=(s=ie().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((a=ie().gapi)!=null&&a.load)n();else{const l=Df("iframefcb");return ie()[l]=()=>{gapi.load?n():r(ee(t,"network-request-failed"))},jf(`${Of()}?onload=${l}`).catch(c=>r(c))}}).catch(e=>{throw lr=null,e})}let lr=null;function Pp(t){return lr=lr||Tp(t),lr}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ap=new Bt(5e3,15e3),jp="__/auth/iframe",Op="emulator/auth/iframe",Dp={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Lp=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Mp(t){const e=t.config;S(e.authDomain,t,"auth-domain-config-required");const r=e.emulator?Ln(e,Op):`https://${t.config.authDomain}/${jp}`,n={apiKey:e.apiKey,appName:t.name,v:Ft},s=Lp.get(t.config.apiHost);s&&(n.eid=s);const i=t._getFrameworks();return i.length&&(n.fw=i.join(",")),`${r}?${Ut(n).slice(1)}`}async function Up(t){const e=await Pp(t),r=ie().gapi;return S(r,t,"internal-error"),e.open({where:document.body,url:Mp(t),messageHandlersFilter:r.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Dp,dontclear:!0},n=>new Promise(async(s,i)=>{await n.restyle({setHideOnLeave:!1});const a=ee(t,"network-request-failed"),l=ie().setTimeout(()=>{i(a)},Ap.get());function c(){ie().clearTimeout(l),s(n)}n.ping(c).then(c,()=>{i(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fp={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Bp=500,$p=600,Hp="_blank",zp="http://localhost";class Xs{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Vp(t,e,r,n=Bp,s=$p){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-n)/2,0).toString();let l="";const c={...Fp,width:n.toString(),height:s.toString(),top:i,left:a},d=W().toLowerCase();r&&(l=Ra(d)?Hp:r),Sa(d)&&(e=e||zp,c.scrollbars="yes");const u=Object.entries(c).reduce((g,[b,v])=>`${g}${b}=${v},`,"");if(Sf(d)&&l!=="_self")return Wp(e||"",l),new Xs(null);const h=window.open(e||"",l,u);S(h,t,"popup-blocked");try{h.focus()}catch{}return new Xs(h)}function Wp(t,e){const r=document.createElement("a");r.href=t,r.target=e;const n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),r.dispatchEvent(n)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qp="__/auth/handler",Kp="emulator/auth/handler",Gp=encodeURIComponent("fac");async function Ys(t,e,r,n,s,i){S(t.config.authDomain,t,"auth-domain-config-required"),S(t.config.apiKey,t,"invalid-api-key");const a={apiKey:t.config.apiKey,appName:t.name,authType:r,redirectUrl:n,v:Ft,eventId:s};if(e instanceof $n){e.setDefaultLanguage(t.languageCode),a.providerId=e.providerId||"",Fd(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,h]of Object.entries({}))a[u]=h}if(e instanceof $t){const u=e.getScopes().filter(h=>h!=="");u.length>0&&(a.scopes=u.join(","))}t.tenantId&&(a.tid=t.tenantId);const l=a;for(const u of Object.keys(l))l[u]===void 0&&delete l[u];const c=await t._getAppCheckToken(),d=c?`#${Gp}=${encodeURIComponent(c)}`:"";return`${Jp(t)}?${Ut(l).slice(1)}${d}`}function Jp({config:t}){return t.emulator?Ln(t,Kp):`https://${t.authDomain}/${qp}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tn="webStorageSupport";class Xp{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Ba,this._completeRedirectFn=wp,this._overrideRedirectResult=yp}async _openPopup(e,r,n,s){var a;be((a=this.eventManagers[e._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");const i=await Ys(e,r,n,wn(),s);return Vp(e,i,Hn())}async _openRedirect(e,r,n,s){await this._originValidation(e);const i=await Ys(e,r,n,wn(),s);return Qf(i),new Promise(()=>{})}_initialize(e){const r=e._key();if(this.eventManagers[r]){const{manager:s,promise:i}=this.eventManagers[r];return s?Promise.resolve(s):(be(i,"If manager is not set, promise should be"),i)}const n=this.initAndGetManager(e);return this.eventManagers[r]={promise:n},n.catch(()=>{delete this.eventManagers[r]}),n}async initAndGetManager(e){const r=await Up(e),n=new Ep(e);return r.register("authEvent",s=>(S(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:n.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=r,n}_isIframeWebStorageSupported(e,r){this.iframes[e._key()].send(tn,{type:tn},s=>{var a;const i=(a=s==null?void 0:s[0])==null?void 0:a[tn];i!==void 0&&r(!!i),ae(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const r=e._key();return this.originValidationPromises[r]||(this.originValidationPromises[r]=Rp(e)),this.originValidationPromises[r]}get _shouldInitProactively(){return Aa()||Ia()||Fn()}}const Yp=Xp;var Zs="@firebase/auth",Qs="1.13.6";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zp{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const r=this.auth.onIdTokenChanged(n=>{e((n==null?void 0:n.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,r),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const r=this.internalListeners.get(e);r&&(this.internalListeners.delete(e),r(),this.updateProactiveRefresh())}assertAuthConfigured(){S(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qp(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function em(t){kt(new ot("auth",(e,{options:r})=>{const n=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:l}=n.options;S(a&&!a.includes(":"),"invalid-api-key",{appName:n.name});const c={apiKey:a,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:ja(t)},d=new Pf(n,s,i,c);return Mf(d,r),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,r,n)=>{e.getProvider("auth-internal").initialize()})),kt(new ot("auth-internal",e=>{const r=jr(e.getProvider("auth").getImmediate());return(n=>new Zp(n))(r)},"PRIVATE").setInstantiationMode("EXPLICIT")),rt(Zs,Qs,Qp(t)),rt(Zs,Qs,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tm=5*60,rm=ua("authIdTokenMaxAge")||tm;let ei=null;const nm=t=>async e=>{const r=e&&await e.getIdTokenResult(),n=r&&(new Date().getTime()-Date.parse(r.issuedAtTime))/1e3;if(n&&n>rm)return;const s=r==null?void 0:r.token;ei!==s&&(ei=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Ja(t=qh()){const e=pa(t,"auth");if(e.isInitialized())return e.getImmediate();const r=Lf(t,{popupRedirectResolver:Yp,persistence:[lp,Xf,Ba]}),n=ua("authTokenSyncURL");if(n&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(n,location.origin);if(location.origin===i.origin){const a=nm(i.toString());qf(r,a,()=>a(r.currentUser)),Wf(r,l=>a(l))}}const s=kd("auth");return s&&Uf(r,`http://${s}`),r}function sm(){var t;return((t=document.getElementsByTagName("head"))==null?void 0:t[0])??document}Af({loadJS(t){return new Promise((e,r)=>{const n=document.createElement("script");n.setAttribute("src",t),n.onload=e,n.onerror=s=>{const i=ee("internal-error");i.customData=s,r(i)},n.type="text/javascript",n.charset="UTF-8",sm().appendChild(n)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});em("Browser");const et={apiKey:"AIzaSyD3e8IW2E5KEmakUp38Yb6zqdmpr_-d-yI",authDomain:"customizer-makely.firebaseapp.com",projectId:"customizer-makely",storageBucket:"customizer-makely.firebasestorage.app",messagingSenderId:"362691643529",appId:"1:362691643529:web:6374fc1dd9ee8143115e58",measurementId:"G-J5PJDJHRLY"},Xa=!!(et.apiKey&&et.authDomain&&et.projectId&&et.appId);let tt=null;function im(){if(!Xa)throw new Error("Google sign-in is not configured (missing VITE_FIREBASE_* env)");return tt||(tt=Kh()[0]??ma(et),et.measurementId&&typeof window<"u"&&ct(async()=>{const{getAnalytics:t,isSupported:e}=await import("./index.esm-B74VAB7H.js");return{getAnalytics:t,isSupported:e}},__vite__mapDeps([0,1,2])).then(({getAnalytics:t,isSupported:e})=>e().then(r=>r?t(tt):void 0)).catch(()=>{})),tt}async function am(){const t=Ja(im()),e=new he;return e.setCustomParameters({prompt:"select_account"}),(await fp(t,e)).user.getIdToken()}async function om(){if(tt)try{await Kf(Ja(tt))}catch{}}function lm(t,e="Google sign-in failed"){switch(t==null?void 0:t.code){case"auth/popup-closed-by-user":case"auth/cancelled-popup-request":return"Sign-in was cancelled.";case"auth/popup-blocked":return"Your browser blocked the sign-in window. Allow pop-ups and try again.";case"auth/network-request-failed":return"Network error — check your connection and try again.";case"auth/unauthorized-domain":return"This domain is not authorised for Google sign-in.";default:return e}}const Je=ai((t,e)=>({user:null,initializing:!0,async initialize(){try{if(await sa()){const n=await k.get("/auth/me");t({user:n.data.data.user})}}catch{}finally{t({initializing:!1})}xd(()=>{e().user&&t({user:null})})},async login(r,n){const s=await k.post("/auth/login",{email:r,password:n}),{user:i,accessToken:a}=s.data.data;return Qe(a),t({user:i}),i},async loginWithGoogle(){const r=await am(),n=await k.post("/auth/google",{idToken:r}),{user:s,accessToken:i}=n.data.data;return Qe(i),t({user:s}),s},async register(r,n,s){const i=await k.post("/auth/register",{name:r,email:n,password:s}),{user:a,accessToken:l}=i.data.data;return Qe(l),t({user:a}),a},async logout(){try{await k.post("/auth/logout")}finally{Qe(null),t({user:null}),om()}},setUser(r){t({user:r})}}));/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cm=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Ya=(...t)=>t.filter((e,r,n)=>!!e&&n.indexOf(e)===r).join(" ");/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var um={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dm=m.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:r=2,absoluteStrokeWidth:n,className:s="",children:i,iconNode:a,...l},c)=>m.createElement("svg",{ref:c,...um,width:e,height:e,stroke:t,strokeWidth:n?Number(r)*24/Number(e):r,className:Ya("lucide",s),...l},[...a.map(([d,u])=>m.createElement(d,u)),...Array.isArray(i)?i:[i]]));/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=(t,e)=>{const r=m.forwardRef(({className:n,...s},i)=>m.createElement(dm,{ref:i,iconNode:e,className:Ya(`lucide-${cm(t)}`,n),...s}));return r.displayName=`${t}`,r};/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hm=O("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cr=O("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fm=O("ArrowUpRight",[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Za=O("Box",[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qa=O("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pm=O("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eo=O("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vn=O("EyeOff",[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wn=O("Eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mm=O("FolderOpen",[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gm=O("ImageOff",[["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}],["path",{d:"M10.41 10.41a2 2 0 1 1-2.83-2.83",key:"1bzlo9"}],["line",{x1:"13.5",x2:"6",y1:"13.5",y2:"21",key:"1q0aeu"}],["line",{x1:"18",x2:"21",y1:"12",y2:"15",key:"5mozeu"}],["path",{d:"M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59",key:"mmje98"}],["path",{d:"M21 15V5a2 2 0 0 0-2-2H9",key:"43el77"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ym=O("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bm=O("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xm=O("MailCheck",[["path",{d:"M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8",key:"12jkf8"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}],["path",{d:"m16 19 2 2 4-4",key:"1b14m6"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wm=O("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vm=O("PackageOpen",[["path",{d:"M12 22v-9",key:"x3hkom"}],["path",{d:"M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z",key:"2ntwy6"}],["path",{d:"M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13",key:"1pmm1c"}],["path",{d:"M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z",key:"12ttoo"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Em=O("Package",[["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _m=O("Ruler",[["path",{d:"M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z",key:"icamh8"}],["path",{d:"m14.5 12.5 2-2",key:"inckbg"}],["path",{d:"m11.5 9.5 2-2",key:"fmmyf7"}],["path",{d:"m8.5 6.5 2-2",key:"vc6u1g"}],["path",{d:"m17.5 15.5 2-2",key:"wo5hmg"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nm=O("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sm=O("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Im=O("ShieldCheck",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rm=O("ShoppingBag",[["path",{d:"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z",key:"hou9p0"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M16 10a4 4 0 0 1-8 0",key:"1ltviw"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const km=O("SlidersHorizontal",[["line",{x1:"21",x2:"14",y1:"4",y2:"4",key:"obuewd"}],["line",{x1:"10",x2:"3",y1:"4",y2:"4",key:"1q6298"}],["line",{x1:"21",x2:"12",y1:"12",y2:"12",key:"1iu8h1"}],["line",{x1:"8",x2:"3",y1:"12",y2:"12",key:"ntss68"}],["line",{x1:"21",x2:"16",y1:"20",y2:"20",key:"14d8ph"}],["line",{x1:"12",x2:"3",y1:"20",y2:"20",key:"m0wm8r"}],["line",{x1:"14",x2:"14",y1:"2",y2:"6",key:"14e1ph"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14",key:"1i6ji0"}],["line",{x1:"16",x2:"16",y1:"18",y2:"22",key:"1lctlv"}]]);/**
 * @license lucide-react v0.436.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Er=O("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function to(t){var e,r,n="";if(typeof t=="string"||typeof t=="number")n+=t;else if(typeof t=="object")if(Array.isArray(t)){var s=t.length;for(e=0;e<s;e++)t[e]&&(r=to(t[e]))&&(n&&(n+=" "),n+=r)}else for(r in t)t[r]&&(n&&(n+=" "),n+=r);return n}function C(){for(var t,e,r=0,n="",s=arguments.length;r<s;r++)(t=arguments[r])&&(e=to(t))&&(n&&(n+=" "),n+=e);return n}async function ro(){return(await k.get("/categories")).data.data}async function no(t={}){const e=await k.get("/products",{params:t});return{items:e.data.data,meta:e.data.meta}}async function Cm(t){return(await k.get(`/products/${t}`)).data.data}async function Ug(t){return(await k.post("/pricing/quote",t)).data.data}async function Fg(t=1,e=24){return(await k.get("/designs",{params:{page:t,pageSize:e}})).data.data}async function Bg(t){return(await k.get(`/designs/${t}`)).data.data}async function $g(t){return(await k.post("/designs",t)).data.data}async function Hg(t,e){return(await k.put(`/designs/${t}`,e)).data.data}async function zg(t){await k.delete(`/designs/${t}`)}async function Vg(t){return(await k.post(`/designs/${t}/duplicate`)).data.data}async function Wg(t){const e=new FormData;return e.append("file",t),(await k.post("/uploads",e,{headers:{"Content-Type":"multipart/form-data"}})).data.data}async function qg(){return(await k.get("/uploads/assets")).data.data}async function Kg(t){await k.delete(`/uploads/assets/${t}`)}async function Gg(t){return(await k.get("/templates",{params:t?{category:t}:{}})).data.data}async function Jg(){return(await k.get("/templates/categories")).data.data}async function Tm(){return(await k.get("/cart")).data.data}async function Pm(t){return(await k.post("/cart/items",t)).data.data}async function Am(t,e){return(await k.put(`/cart/items/${t}`,{quantity:e})).data.data}async function jm(t){return(await k.delete(`/cart/items/${t}`)).data.data}async function Xg(t){return(await k.post("/orders",{shippingAddress:t})).data.data}async function Yg(){return(await k.get("/orders")).data.data}async function Zg(t){return(await k.get(`/orders/${t}`)).data.data}async function Qg(t,e,r=300){const n=await k.get(`/export/designs/${t}`,{params:{areaKey:e,dpi:r},responseType:"blob"}),s=URL.createObjectURL(n.data),i=document.createElement("a");i.href=s,i.download=`design-${t}-${e}-${r}dpi.png`,i.click(),URL.revokeObjectURL(s)}const Om=ai((t,e)=>({cart:null,loading:!1,async load(){t({loading:!0});try{const r=await Tm();t({cart:r})}finally{t({loading:!1})}},async addItem(r){const n=await Pm(r);t({cart:n})},async updateQuantity(r,n){const s=await Am(r,n);t({cart:s})},async removeItem(r){const n=await jm(r);t({cart:n})},clearLocal(){t({cart:null})},itemCount(){var r;return((r=e().cart)==null?void 0:r.items.reduce((n,s)=>n+s.quantity,0))??0}}));function Xe({className:t}){return o.jsx(ym,{"aria-hidden":!0,className:C("animate-spin",t??"h-4 w-4 text-current opacity-80")})}function Lr({label:t}){return o.jsxs("div",{className:"flex flex-1 flex-col items-center justify-center gap-3 py-24",children:[o.jsx(Xe,{className:"h-5 w-5 text-gray-400"}),o.jsx("p",{className:"text-xs uppercase tracking-label text-gray-400",children:t??"Loading"})]})}function Et({className:t}){return o.jsx("div",{"aria-hidden":!0,className:C("skeleton rounded-lg",t)})}const Dm={neutral:"border-gray-200 bg-gray-50 text-gray-600",ink:"border-gray-900/10 bg-gray-900 text-white",accent:"border-brand-200 bg-brand-50 text-brand-800",success:"border-emerald-200 bg-emerald-50 text-emerald-800",warning:"border-amber-200 bg-amber-50 text-amber-800",danger:"border-red-200 bg-red-50 text-red-800",info:"border-sky-200 bg-sky-50 text-sky-800"};function ti({children:t,className:e,tone:r,dot:n}){return o.jsxs("span",{className:C("inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-2xs font-medium leading-5",e??Dm[r??"neutral"]),children:[n&&o.jsx("span",{className:"h-1.5 w-1.5 rounded-full bg-current opacity-70"}),t]})}function qn({title:t,description:e,action:r,icon:n,compact:s}){return o.jsxs("div",{className:C("flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white/60 bg-grid px-6 text-center",s?"py-10":"py-20"),children:[o.jsx("div",{className:"mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400 shadow-card",children:n??o.jsx(vm,{className:"h-5 w-5"})}),o.jsx("h3",{className:"text-sm font-semibold text-gray-900",children:t}),e&&o.jsx("p",{className:"mt-1.5 max-w-xs text-sm leading-relaxed text-gray-500",children:e}),r&&o.jsx("div",{className:"mt-6",children:r})]})}function Lm({open:t,onClose:e,title:r,description:n,children:s,footer:i,size:a="md"}){const l=m.useRef(null),c=m.useId();if(m.useEffect(()=>{if(!t)return;const u=b=>{if(b.key==="Escape"){e();return}if(b.key!=="Tab"||!l.current)return;const v=l.current.querySelectorAll('a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])');if(v.length===0)return;const w=v[0],E=v[v.length-1];b.shiftKey&&document.activeElement===w?(b.preventDefault(),E.focus()):!b.shiftKey&&document.activeElement===E&&(b.preventDefault(),w.focus())},h=document.body.style.overflow;document.body.style.overflow="hidden",window.addEventListener("keydown",u);const g=window.setTimeout(()=>{var b,v;(b=l.current)!=null&&b.contains(document.activeElement)||(v=l.current)==null||v.focus()},0);return()=>{document.body.style.overflow=h,window.removeEventListener("keydown",u),window.clearTimeout(g)}},[t,e]),!t)return null;const d={sm:"max-w-sm",md:"max-w-lg",lg:"max-w-2xl",xl:"max-w-4xl"};return o.jsx("div",{className:"fixed inset-0 z-50 flex items-end justify-center bg-gray-950/45 p-0 backdrop-blur-[2px] animate-fade-in sm:items-center sm:p-6",onMouseDown:u=>{u.target===u.currentTarget&&e()},children:o.jsxs("div",{ref:l,tabIndex:-1,className:C("flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-overlay outline-none animate-scale-in sm:rounded-2xl",d[a]),role:"dialog","aria-modal":"true","aria-labelledby":r?c:void 0,children:[(r||n)&&o.jsxs("header",{className:"flex shrink-0 items-start justify-between gap-4 border-b border-gray-100 px-5 py-4",children:[o.jsxs("div",{className:"min-w-0",children:[r&&o.jsx("h2",{id:c,className:"truncate text-sm font-semibold text-gray-900",children:r}),n&&o.jsx("p",{className:"mt-0.5 text-xs text-gray-500",children:n})]}),o.jsx("button",{onClick:e,className:"-mr-1 -mt-0.5 shrink-0 rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700","aria-label":"Close",children:o.jsx(Er,{className:"h-4 w-4"})})]}),o.jsx("div",{className:"min-h-0 flex-1 overflow-y-auto px-5 py-5 scroll-thin",children:s}),i&&o.jsx("footer",{className:"flex shrink-0 items-center justify-end gap-2 border-t border-gray-100 bg-gray-50/70 px-5 py-3",children:i})]})})}function ey({open:t,onClose:e,onConfirm:r,title:n,message:s,confirmLabel:i="Delete",danger:a=!0,busy:l=!1}){return o.jsx(Lm,{open:t,onClose:e,title:n,size:"sm",footer:o.jsxs(o.Fragment,{children:[o.jsx("button",{className:"btn-ghost",onClick:e,disabled:l,children:"Cancel"}),o.jsxs("button",{className:a?"btn-danger":"btn-primary",onClick:r,disabled:l,children:[l&&o.jsx(Xe,{className:"h-3.5 w-3.5 text-white"}),i]})]}),children:o.jsx("p",{className:"text-sm leading-relaxed text-gray-600",children:s})})}function _r({label:t,children:e,hint:r,error:n,required:s,className:i}){return o.jsxs("div",{className:i,children:[o.jsxs("label",{className:"label",children:[t,s&&o.jsx("span",{className:"ml-0.5 text-brand-600",children:"*"})]}),e,n?o.jsx("p",{className:"mt-1.5 text-xs font-medium text-red-700",children:n}):r&&o.jsx("p",{className:"mt-1.5 text-xs leading-relaxed text-gray-500",children:r})]})}function ty({checked:t,onChange:e,label:r,disabled:n}){return o.jsx("button",{type:"button",role:"switch","aria-checked":t,"aria-label":r,disabled:n,onClick:()=>e(!t),className:C("relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200 disabled:opacity-40",t?"bg-gray-900":"bg-gray-300"),children:o.jsx("span",{className:"inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ease-out",style:{transform:t?"translateX(18px)":"translateX(2px)"}})})}function ry({value:t,onChange:e,options:r,size:n="md",dark:s,className:i}){return o.jsx("div",{role:"tablist",className:C("inline-flex items-center gap-0.5 rounded-lg p-0.5",s?"bg-white/[.06]":"border border-gray-200 bg-gray-100/70",i),children:r.map(a=>{const l=a.value===t;return o.jsx("button",{role:"tab","aria-selected":l,title:a.title,onClick:()=>e(a.value),className:C("rounded-md font-medium transition-all duration-150",n==="sm"?"px-2 py-1 text-2xs":"px-3 py-1.5 text-xs",l?s?"bg-white/[.14] text-white shadow-sm":"bg-white text-gray-900 shadow-card":s?"text-zinc-400 hover:text-zinc-100":"text-gray-500 hover:text-gray-900"),children:a.label},a.value)})})}function ny({title:t,description:e,eyebrow:r,actions:n,className:s}){return o.jsxs("div",{className:C("flex flex-col gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-end sm:justify-between",s),children:[o.jsxs("div",{className:"min-w-0",children:[r&&o.jsx("p",{className:"eyebrow mb-2",children:r}),o.jsx("h1",{className:"text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl",children:t}),e&&o.jsx("p",{className:"mt-1.5 max-w-prose text-sm leading-relaxed text-gray-500",children:e})]}),n&&o.jsx("div",{className:"flex shrink-0 items-center gap-2",children:n})]})}function sy({title:t,description:e,actions:r,children:n,footer:s,className:i,bodyClassName:a}){return o.jsxs("section",{className:C("card overflow-hidden",i),children:[(t||r)&&o.jsxs("header",{className:"flex items-center justify-between gap-4 border-b border-gray-100 px-5 py-3.5",children:[o.jsxs("div",{className:"min-w-0",children:[t&&o.jsx("h2",{className:"text-sm font-semibold text-gray-900",children:t}),e&&o.jsx("p",{className:"mt-0.5 text-xs text-gray-500",children:e})]}),r&&o.jsx("div",{className:"flex shrink-0 items-center gap-2",children:r})]}),o.jsx("div",{className:a??"p-5",children:n}),s&&o.jsx("footer",{className:"border-t border-gray-100 bg-gray-50/60 px-5 py-3",children:s})]})}function Mm({items:t}){return o.jsx("nav",{"aria-label":"Breadcrumb",className:"flex items-center gap-1 text-xs text-gray-400",children:t.map((e,r)=>o.jsxs("span",{className:"flex items-center gap-1",children:[r>0&&o.jsx(eo,{className:"h-3 w-3 text-gray-300","aria-hidden":!0}),e.to?o.jsx(M,{to:e.to,className:"transition-colors hover:text-gray-700",children:e.label}):o.jsx("span",{className:"font-medium text-gray-700",children:e.label})]},`${e.label}-${r}`))})}function iy({label:t,value:e,icon:r,hint:n}){return o.jsxs("div",{className:"card group relative overflow-hidden p-4",children:[o.jsxs("div",{className:"flex items-start justify-between gap-2",children:[o.jsx("p",{className:"text-2xs font-medium uppercase tracking-label text-gray-500",children:t}),r&&o.jsx("span",{className:"text-gray-300 transition-colors group-hover:text-brand-500",children:r})]}),o.jsx("p",{className:"mt-3 text-2xl font-semibold tabular tracking-tight text-gray-900",children:e}),n&&o.jsx("p",{className:"mt-1 text-xs text-gray-400",children:n})]})}function Um({page:t,totalPages:e,onChange:r}){if(e<=1)return null;const n=[],s=a=>!n.includes(a)&&n.push(a);s(1),t-2>2&&n.push("gap");for(let a=Math.max(2,t-1);a<=Math.min(e-1,t+1);a++)s(a);t+2<e-1&&n.push("gap"),e>1&&s(e);const i="inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-xs font-medium transition-colors";return o.jsxs("nav",{className:"flex items-center justify-center gap-1","aria-label":"Pagination",children:[o.jsx("button",{className:C(i,"text-gray-500 hover:bg-gray-100 disabled:opacity-35"),onClick:()=>r(t-1),disabled:t<=1,"aria-label":"Previous page",children:o.jsx(pm,{className:"h-4 w-4"})}),n.map((a,l)=>a==="gap"?o.jsx("span",{className:"px-1 text-xs text-gray-300",children:"…"},`gap-${l}`):o.jsx("button",{onClick:()=>r(a),"aria-current":a===t?"page":void 0,className:C(i,a===t?"bg-gray-900 text-white":"text-gray-600 hover:bg-gray-100 hover:text-gray-900"),children:a},a)),o.jsx("button",{className:C(i,"text-gray-500 hover:bg-gray-100 disabled:opacity-35"),onClick:()=>r(t+1),disabled:t>=e,"aria-label":"Next page",children:o.jsx(eo,{className:"h-4 w-4"})})]})}function ay({label:t,children:e,side:r="top"}){return o.jsxs("span",{className:"group/tip relative inline-flex",children:[e,o.jsx("span",{role:"tooltip",className:C("pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-2xs font-medium text-white opacity-0 shadow-raised transition-opacity duration-150 group-hover/tip:opacity-100",r==="top"?"bottom-full mb-1.5":"top-full mt-1.5"),children:t})]})}function Fm({color:t,selected:e,onClick:r,title:n,size:s="md"}){const i=Bm(t);return o.jsx("button",{type:"button",onClick:r,title:n,"aria-label":n??t,"aria-pressed":e,className:C("relative flex items-center justify-center rounded-full transition-transform duration-150 hover:scale-105",s==="sm"?"h-5 w-5":"h-8 w-8",e&&"ring-2 ring-gray-900 ring-offset-2"),style:{backgroundColor:t,boxShadow:i?"inset 0 0 0 1px rgba(26,24,22,.16)":"inset 0 0 0 1px rgba(0,0,0,.1)"},children:e&&o.jsx(Qa,{className:C(s==="sm"?"h-2.5 w-2.5":"h-4 w-4"),style:{color:i?"#1a1816":"#fff"},strokeWidth:3})})}function Bm(t){const e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t.trim());if(!e)return!1;const[r,n,s]=[e[1],e[2],e[3]].map(i=>parseInt(i,16));return(.299*r+.587*n+.114*s)/255>.7}const Kn=m.createContext({close:()=>{}});function $m({trigger:t,children:e,align:r="right",className:n}){const[s,i]=m.useState(!1),a=m.useRef(null);return m.useEffect(()=>{if(!s)return;const l=d=>{var u;(u=a.current)!=null&&u.contains(d.target)||i(!1)},c=d=>d.key==="Escape"&&i(!1);return document.addEventListener("mousedown",l),document.addEventListener("keydown",c),()=>{document.removeEventListener("mousedown",l),document.removeEventListener("keydown",c)}},[s]),o.jsxs("div",{ref:a,className:"relative",children:[t({open:s,toggle:()=>i(l=>!l)}),s&&o.jsx(Kn.Provider,{value:{close:()=>i(!1)},children:o.jsx("div",{role:"menu",className:C("absolute z-50 mt-1.5 min-w-44 overflow-hidden rounded-xl border border-gray-200 bg-white p-1 shadow-overlay animate-scale-in",r==="right"?"right-0":"left-0",n),children:e})})]})}const Hm=m.forwardRef(function({icon:e,danger:r,className:n,onClick:s,children:i,...a},l){const{close:c}=m.useContext(Kn);return o.jsxs("button",{ref:l,role:"menuitem",...a,onClick:d=>{c(),s==null||s(d)},className:C("flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",r?"text-red-700 hover:bg-red-50":"text-gray-700 hover:bg-gray-100 hover:text-gray-900",n),children:[e&&o.jsx("span",{className:"text-gray-400",children:e}),i]})});function Yt({to:t,icon:e,children:r}){const{close:n}=m.useContext(Kn);return o.jsxs(M,{to:t,role:"menuitem",onClick:n,className:"flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900",children:[e&&o.jsx("span",{className:"text-gray-400",children:e}),r]})}function ri(){return o.jsx("div",{className:"my-1 h-px bg-gray-100"})}function ni({className:t,mono:e}){return o.jsxs("span",{className:C("flex items-center gap-2.5",t),children:[o.jsxs("span",{className:C("relative flex h-7 w-7 items-center justify-center rounded-lg",e?"bg-white text-gray-900":"bg-gray-900 text-white"),children:[o.jsx("span",{className:"absolute inset-[5px] rounded-[3px] border border-dashed",style:{borderColor:"currentColor",opacity:.45}}),o.jsx("span",{className:"h-1.5 w-1.5 rounded-[1px] bg-brand-500"})]}),o.jsx("span",{className:C("text-[0.9375rem] font-semibold tracking-tight",e?"text-white":"text-gray-900"),children:"Makely"})]})}const si=[{to:"/products",label:"Catalog",end:!1},{to:"/dashboard",label:"My designs",end:!0,auth:!0},{to:"/dashboard/orders",label:"Orders",end:!1,auth:!0}];function zm(){var d;const{user:t,logout:e}=Je(),r=Om(),n=we(),s=X(),[i,a]=m.useState(!1),l=((d=r.cart)==null?void 0:d.items.reduce((u,h)=>u+h.quantity,0))??0;m.useEffect(()=>{t?r.load().catch(()=>{}):r.clearLocal()},[t==null?void 0:t.id]),m.useEffect(()=>a(!1),[s.pathname]);const c=({isActive:u})=>C("relative flex h-[59px] items-center px-0.5 text-sm transition-colors",'after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:origin-left after:transition-transform after:duration-200 after:ease-out after:content-[""]',u?"font-medium text-gray-900 after:scale-x-100 after:bg-gray-900":"text-gray-500 hover:text-gray-900 after:scale-x-0 after:bg-gray-300 hover:after:scale-x-100");return o.jsxs("div",{className:"flex min-h-screen flex-col",children:[o.jsxs("header",{className:"sticky top-0 z-40 border-b border-gray-200 bg-surface/80 backdrop-blur-xl supports-[backdrop-filter]:bg-surface/70",children:[o.jsxs("div",{className:"mx-auto flex h-[60px] max-w-container items-center gap-8 px-4 sm:px-6 lg:px-8",children:[o.jsx(M,{to:"/","aria-label":"Makely home",className:"shrink-0",children:o.jsx(ni,{})}),o.jsxs("nav",{className:"hidden items-center gap-7 md:flex",children:[si.filter(u=>!u.auth||t).map(u=>o.jsx(qt,{to:u.to,end:u.end,className:c,children:u.label},u.to)),(t==null?void 0:t.role)==="ADMIN"&&o.jsx(qt,{to:"/admin",className:c,children:"Admin"})]}),o.jsxs("div",{className:"ml-auto flex items-center gap-1.5",children:[o.jsxs(M,{to:"/cart",className:"group relative flex h-9 items-center gap-2 rounded-lg px-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900","aria-label":`Cart, ${l} item${l===1?"":"s"}`,children:[o.jsx(Rm,{className:"h-[18px] w-[18px]",strokeWidth:1.8}),l>0&&o.jsx("span",{className:"tabular text-xs font-medium",children:l})]}),t?o.jsxs($m,{trigger:({open:u,toggle:h})=>o.jsxs("button",{onClick:h,"aria-expanded":u,"aria-haspopup":"menu",className:C("flex h-9 items-center gap-2 rounded-lg pl-1 pr-2 transition-colors",u?"bg-gray-100":"hover:bg-gray-100"),children:[o.jsx("span",{className:"flex h-7 w-7 items-center justify-center rounded-md bg-gray-900 text-xs font-medium text-white",children:t.name.slice(0,1).toUpperCase()}),o.jsx("span",{className:"hidden max-w-24 truncate text-sm text-gray-700 sm:block",children:t.name.split(" ")[0]})]}),children:[o.jsxs("div",{className:"px-2.5 pb-2 pt-1.5",children:[o.jsx("p",{className:"truncate text-sm font-medium text-gray-900",children:t.name}),o.jsx("p",{className:"truncate text-xs text-gray-500",children:t.email})]}),o.jsx(ri,{}),o.jsx(Yt,{to:"/dashboard",icon:o.jsx(mm,{className:"h-4 w-4"}),children:"My designs"}),o.jsx(Yt,{to:"/dashboard/orders",icon:o.jsx(Em,{className:"h-4 w-4"}),children:"Orders"}),o.jsx(Yt,{to:"/dashboard/settings",icon:o.jsx(Sm,{className:"h-4 w-4"}),children:"Account settings"}),t.role==="ADMIN"&&o.jsx(Yt,{to:"/admin",icon:o.jsx(Im,{className:"h-4 w-4"}),children:"Admin console"}),o.jsx(ri,{}),o.jsx(Hm,{danger:!0,icon:o.jsx(bm,{className:"h-4 w-4"}),onClick:async()=>{await e(),n("/")},children:"Sign out"})]}):o.jsxs("div",{className:"hidden items-center gap-1.5 sm:flex",children:[o.jsx(M,{to:"/login",className:"btn-ghost",children:"Sign in"}),o.jsx(M,{to:"/register",className:"btn-primary",children:"Start designing"})]}),o.jsx("button",{className:"btn-ghost -mr-1.5 px-2 md:hidden",onClick:()=>a(u=>!u),"aria-label":"Menu","aria-expanded":i,children:i?o.jsx(Er,{className:"h-5 w-5"}):o.jsx(wm,{className:"h-5 w-5"})})]})]}),i&&o.jsx("nav",{className:"border-t border-gray-200 bg-white px-4 py-3 animate-fade-in md:hidden",children:o.jsxs("div",{className:"flex flex-col",children:[si.filter(u=>!u.auth||t).map(u=>o.jsx(qt,{to:u.to,end:u.end,className:({isActive:h})=>C("rounded-lg px-3 py-2.5 text-sm transition-colors",h?"bg-gray-100 font-medium text-gray-900":"text-gray-600"),children:u.label},u.to)),(t==null?void 0:t.role)==="ADMIN"&&o.jsx(qt,{to:"/admin",className:"rounded-lg px-3 py-2.5 text-sm text-gray-600",children:"Admin"}),!t&&o.jsxs("div",{className:"mt-3 flex gap-2 border-t border-gray-100 pt-3",children:[o.jsx(M,{to:"/login",className:"btn-secondary flex-1",children:"Sign in"}),o.jsx(M,{to:"/register",className:"btn-primary flex-1",children:"Start designing"})]})]})})]}),o.jsx("main",{className:"flex flex-1 flex-col",children:o.jsx(sl,{})}),o.jsx("footer",{className:"mt-auto border-t border-gray-200 bg-white",children:o.jsxs("div",{className:"mx-auto max-w-container px-4 py-12 sm:px-6 lg:px-8",children:[o.jsxs("div",{className:"grid gap-10 sm:grid-cols-2 lg:grid-cols-4",children:[o.jsxs("div",{className:"lg:col-span-2",children:[o.jsx(ni,{}),o.jsx("p",{className:"mt-4 max-w-xs text-sm leading-relaxed text-gray-500",children:"A production-grade customizer for apparel, drinkware and hard goods — live 2D editing, real 3D preview, print-ready output."})]}),o.jsxs("div",{children:[o.jsx("p",{className:"panel-title",children:"Product"}),o.jsx("ul",{className:"mt-4 space-y-2.5 text-sm",children:[{to:"/products",label:"Catalog"},{to:"/products?category=apparel",label:"Apparel"},{to:"/products?category=drinkware",label:"Drinkware"}].map(u=>o.jsx("li",{children:o.jsx(M,{to:u.to,className:"text-gray-500 transition-colors hover:text-gray-900",children:u.label})},u.label))})]}),o.jsxs("div",{children:[o.jsx("p",{className:"panel-title",children:"Company"}),o.jsx("ul",{className:"mt-4 space-y-2.5 text-sm",children:[{href:"/#how-it-works",label:"How it works"},{href:"/#specs",label:"Print specs"}].map(u=>o.jsx("li",{children:o.jsx("a",{href:u.href,className:"text-gray-500 transition-colors hover:text-gray-900",children:u.label})},u.label))})]})]}),o.jsxs("div",{className:"mt-12 flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between",children:[o.jsxs("p",{className:"text-xs text-gray-400",children:["© ",new Date().getFullYear()," Makely. All rights reserved."]}),o.jsxs("p",{className:"flex items-center gap-2 text-xs text-gray-400",children:[o.jsx("span",{className:"h-1.5 w-1.5 rounded-full bg-emerald-500"}),"All systems operational"]})]})]})})]})}function rn({children:t}){const{user:e,initializing:r}=Je(),n=X();return r?o.jsx(Lr,{}):e?o.jsx(o.Fragment,{children:t}):o.jsx(dr,{to:"/login",state:{from:n.pathname},replace:!0})}function Vm({children:t}){const{user:e,initializing:r}=Je();return r?o.jsx(Lr,{}):e?e.role!=="ADMIN"?o.jsx(dr,{to:"/",replace:!0}):o.jsx(o.Fragment,{children:t}):o.jsx(dr,{to:"/login",state:{from:"/admin"},replace:!0})}function so(t,e="USD"){return new Intl.NumberFormat("en-US",{style:"currency",currency:e}).format(t)}function Wm(t){return new Date(t).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}function oy(t){return t<1024?`${t} B`:t<1024*1024?`${(t/1024).toFixed(1)} KB`:`${(t/(1024*1024)).toFixed(1)} MB`}const ly={PENDING:"Pending",CONFIRMED:"Confirmed",IN_PRODUCTION:"In production",SHIPPED:"Shipped",DELIVERED:"Delivered",CANCELLED:"Cancelled"},cy={PENDING:"border-amber-200 bg-amber-50 text-amber-800",CONFIRMED:"border-sky-200 bg-sky-50 text-sky-800",IN_PRODUCTION:"border-brand-200 bg-brand-50 text-brand-800",SHIPPED:"border-indigo-200 bg-indigo-50 text-indigo-800",DELIVERED:"border-emerald-200 bg-emerald-50 text-emerald-800",CANCELLED:"border-gray-200 bg-gray-100 text-gray-500"};function uy(t){const e=new Date(t).getTime(),r=Date.now()-e,n=Math.round(r/6e4);if(n<1)return"just now";if(n<60)return`${n}m ago`;const s=Math.round(n/60);if(s<24)return`${s}h ago`;const i=Math.round(s/24);return i<7?`${i}d ago`:Wm(t)}function io({product:t}){const e=t.images.find(n=>n.isPrimary)??t.images[0],r=Array.from(new Map(t.variants.filter(n=>n.color).map(n=>[n.color,n.colorName])).entries());return o.jsxs("article",{className:"group flex flex-col",children:[o.jsxs(M,{to:`/products/${t.slug}`,className:"relative block overflow-hidden rounded-xl border border-gray-200 bg-surface-sunken transition-colors duration-200 hover:border-gray-300",children:[o.jsx("div",{className:"aspect-[4/5] w-full p-6 sm:p-8",children:e?o.jsx("img",{src:e.url,alt:e.alt??t.name,className:"h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]",loading:"lazy"}):o.jsx("div",{className:"flex h-full items-center justify-center text-gray-300",children:o.jsx(gm,{className:"h-8 w-8",strokeWidth:1.5})})}),t.model&&o.jsxs("span",{className:"absolute left-3 top-3 inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white/90 px-1.5 py-1 text-2xs font-medium text-gray-600 backdrop-blur",children:[o.jsx(Za,{className:"h-3 w-3",strokeWidth:2}),"3D"]}),o.jsx("span",{className:"pointer-events-none absolute inset-x-3 bottom-3 hidden translate-y-1.5 opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 sm:block",children:o.jsx("span",{className:"btn btn-sm w-full bg-gray-900 text-white shadow-raised",children:"Customize"})})]}),o.jsxs("div",{className:"flex flex-1 flex-col pt-3.5",children:[o.jsx("p",{className:"text-2xs uppercase tracking-label text-gray-400",children:t.category.name}),o.jsxs("div",{className:"mt-1 flex items-baseline justify-between gap-3",children:[o.jsx("h3",{className:"truncate text-sm font-medium text-gray-900",children:o.jsx(M,{to:`/products/${t.slug}`,className:"hover:underline underline-offset-2",children:t.name})}),o.jsx("span",{className:"shrink-0 text-sm font-medium tabular text-gray-900",children:so(t.basePrice)})]}),r.length>0&&o.jsxs("div",{className:"mt-2.5 flex items-center gap-1.5",children:[r.slice(0,6).map(([n,s])=>o.jsx("span",{title:s??n,className:"h-3 w-3 rounded-full",style:{backgroundColor:n,boxShadow:"inset 0 0 0 1px rgba(26,24,22,.18)"}},n)),r.length>6&&o.jsxs("span",{className:"text-2xs tabular text-gray-400",children:["+",r.length-6]})]})]})]})}const qm=[{title:"Choose the blank",text:"Every SKU carries its own print areas, colourways and size run — measured, not approximated."},{title:"Compose the artwork",text:"Type, uploads, shapes and graphics on a snapping canvas with live bleed and safe-zone guides."},{title:"Check it in 3D",text:"Your artwork is projected onto the real product mesh. Rotate it, light it, catch problems early."},{title:"Send it to print",text:"Export at 300 DPI with the cut contour intact, or order straight from the cart."}],Km=[{k:"Output resolution",v:"300 DPI"},{k:"Colour space",v:"sRGB → CMYK profiled"},{k:"File formats",v:"PNG · SVG · PDF"},{k:"Bleed & safe zone",v:"Per print area"},{k:"Max artwork size",v:"25 MB / upload"},{k:"Preview",v:"Real-time WebGL"}];function Gm(){const[t,e]=m.useState([]),[r,n]=m.useState(null);return m.useEffect(()=>{ro().then(e).catch(()=>e([])),no({featured:!0,pageSize:8}).then(s=>n(s.items)).catch(()=>n([]))},[]),o.jsxs("div",{children:[o.jsxs("section",{className:"relative overflow-hidden border-b border-gray-200 bg-white",children:[o.jsx("div",{className:"pointer-events-none absolute inset-0 bg-grid opacity-[0.55]","aria-hidden":!0}),o.jsx("div",{className:"pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full opacity-40 blur-3xl",style:{background:"radial-gradient(circle, #f3d0ba 0%, transparent 65%)"},"aria-hidden":!0}),o.jsxs("div",{className:"relative mx-auto grid max-w-container items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-24",children:[o.jsxs("div",{className:"lg:col-span-6",children:[o.jsxs("p",{className:"eyebrow",children:[o.jsx("span",{className:"h-1.5 w-1.5 rounded-full bg-brand-500"}),"2D editor · 3D preview · print-ready output"]}),o.jsxs("h1",{className:"mt-6 max-w-xl text-display font-semibold text-gray-900",children:["Put your artwork on"," ",o.jsx("span",{className:"font-serif font-normal italic tracking-tight",children:"anything"})," — exactly as printed."]}),o.jsx("p",{className:"mt-6 max-w-md text-base leading-relaxed text-gray-600",children:"Makely is a production customizer, not a mockup toy. Real print areas, real colour limits, real 300 DPI files at the other end."}),o.jsxs("div",{className:"mt-9 flex flex-wrap items-center gap-3",children:[o.jsxs(M,{to:"/products",className:"btn-primary btn-lg group",children:["Start designing",o.jsx(cr,{className:"h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"})]}),o.jsx("a",{href:"#how-it-works",className:"btn-secondary btn-lg",children:"See how it works"})]}),o.jsx("dl",{className:"mt-12 grid max-w-md grid-cols-3 gap-px overflow-hidden rounded-xl border border-gray-200 bg-gray-200",children:[{k:"Products",v:"15+"},{k:"Print areas",v:"40+"},{k:"Export DPI",v:"300"}].map(s=>o.jsxs("div",{className:"bg-white px-4 py-3.5",children:[o.jsx("dd",{className:"text-xl font-semibold tabular tracking-tight text-gray-900",children:s.v}),o.jsx("dt",{className:"mt-0.5 text-2xs uppercase tracking-label text-gray-500",children:s.k})]},s.k))})]}),o.jsx("div",{className:"lg:col-span-6",children:o.jsxs("figure",{className:"relative mx-auto max-w-lg",children:[o.jsxs("div",{className:"relative aspect-square overflow-hidden rounded-2xl border border-gray-200 bg-surface-sunken",children:[o.jsx("div",{className:"absolute inset-0 bg-grid opacity-70","aria-hidden":!0}),["left-4 top-4 border-l border-t","right-4 top-4 border-r border-t","left-4 bottom-4 border-b border-l","right-4 bottom-4 border-b border-r"].map(s=>o.jsx("span",{className:`absolute h-5 w-5 border-gray-300 ${s}`,"aria-hidden":!0},s)),o.jsx("img",{src:"/images/products/tshirt.svg",alt:"Custom t-shirt with the front print area highlighted",className:"relative h-full w-full object-contain p-10"}),o.jsx("span",{className:"absolute left-1/2 top-[34%] h-[30%] w-[27%] -translate-x-1/2 rounded-[3px] border border-dashed border-brand-500/70 bg-brand-500/[0.06]","aria-hidden":!0})]}),o.jsxs("figcaption",{className:"absolute -left-3 top-8 hidden rounded-lg border border-gray-200 bg-white/95 px-3 py-2 shadow-raised backdrop-blur sm:block",children:[o.jsx("p",{className:"text-2xs uppercase tracking-label text-gray-500",children:"Front print area"}),o.jsx("p",{className:"mt-0.5 text-sm font-medium tabular text-gray-900",children:"12″ × 14.7″ · 300 DPI"})]}),o.jsxs("figcaption",{className:"absolute -right-3 bottom-10 hidden items-center gap-2.5 rounded-lg border border-gray-200 bg-white/95 px-3 py-2 shadow-raised backdrop-blur sm:flex",children:[o.jsxs("span",{className:"relative flex h-2 w-2",children:[o.jsx("span",{className:"absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"}),o.jsx("span",{className:"relative inline-flex h-2 w-2 rounded-full bg-emerald-500"})]}),o.jsx("p",{className:"text-sm font-medium text-gray-900",children:"3D preview live"})]})]})})]})]}),o.jsx("section",{className:"border-b border-gray-200 bg-white",children:o.jsx("div",{className:"mx-auto max-w-container px-4 sm:px-6 lg:px-8",children:o.jsxs("div",{className:"flex flex-wrap items-center gap-x-8 gap-y-3 py-5",children:[o.jsx("span",{className:"panel-title",children:"Browse"}),t.length===0?Array.from({length:5}).map((s,i)=>o.jsx(Et,{className:"h-4 w-20"},i)):t.map(s=>{var i;return o.jsxs(M,{to:`/products?category=${s.slug}`,className:"group flex items-baseline gap-1.5 text-sm text-gray-600 transition-colors hover:text-gray-900",children:[s.name,o.jsx("span",{className:"text-2xs tabular text-gray-400",children:((i=s._count)==null?void 0:i.products)??0}),o.jsx(fm,{className:"h-3 w-3 -translate-x-1 text-gray-300 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"})]},s.id)})]})})}),o.jsxs("section",{className:"mx-auto max-w-container px-4 py-16 sm:px-6 lg:px-8 lg:py-20",children:[o.jsxs("div",{className:"flex items-end justify-between gap-6 border-b border-gray-200 pb-5",children:[o.jsxs("div",{children:[o.jsx("p",{className:"eyebrow",children:"Selected blanks"}),o.jsx("h2",{className:"mt-2 text-title font-semibold text-gray-900",children:"Ready to customize"})]}),o.jsxs(M,{to:"/products",className:"group hidden shrink-0 items-center gap-1.5 text-sm font-medium text-gray-900 sm:flex",children:["View all products",o.jsx(cr,{className:"h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"})]})]}),o.jsx("div",{className:"mt-8 grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4",children:r===null?Array.from({length:4}).map((s,i)=>o.jsx(Et,{className:"h-72"},i)):r.map(s=>o.jsx(io,{product:s},s.id))})]}),o.jsx("section",{id:"how-it-works",className:"border-y border-gray-200 bg-white",children:o.jsx("div",{className:"mx-auto max-w-container px-4 py-16 sm:px-6 lg:px-8 lg:py-24",children:o.jsxs("div",{className:"grid gap-12 lg:grid-cols-12 lg:gap-16",children:[o.jsxs("div",{className:"lg:col-span-4",children:[o.jsx("p",{className:"eyebrow",children:"Workflow"}),o.jsx("h2",{className:"mt-3 text-title font-semibold text-gray-900",children:"Four steps from blank to press."}),o.jsx("p",{className:"mt-4 max-w-sm text-sm leading-relaxed text-gray-600",children:"The editor enforces what the printer needs, so nothing gets rejected downstream."})]}),o.jsx("ol",{className:"lg:col-span-8",children:qm.map((s,i)=>o.jsxs("li",{className:"group grid grid-cols-[auto_1fr] gap-x-6 border-t border-gray-200 py-6 last:border-b sm:gap-x-10",children:[o.jsx("span",{className:"pt-0.5 text-2xs font-medium tabular tracking-label text-gray-400 transition-colors group-hover:text-brand-600",children:String(i+1).padStart(2,"0")}),o.jsxs("div",{children:[o.jsx("h3",{className:"text-base font-medium text-gray-900",children:s.title}),o.jsx("p",{className:"mt-1.5 max-w-lg text-sm leading-relaxed text-gray-600",children:s.text})]})]},s.title))})]})})}),o.jsx("section",{id:"specs",className:"mx-auto max-w-container px-4 py-16 sm:px-6 lg:px-8 lg:py-20",children:o.jsxs("div",{className:"grid gap-10 lg:grid-cols-12 lg:gap-16",children:[o.jsxs("div",{className:"lg:col-span-5",children:[o.jsx("p",{className:"eyebrow",children:"Output"}),o.jsx("h2",{className:"mt-3 text-title font-semibold text-gray-900",children:"Built for the print floor."}),o.jsx("ul",{className:"mt-6 space-y-3",children:["Validation blocks low-resolution art before checkout","Per-area bleed, safe zone and DPI enforced live","Designs transfer between products without redrawing"].map(s=>o.jsxs("li",{className:"flex gap-3 text-sm leading-relaxed text-gray-600",children:[o.jsx(Qa,{className:"mt-0.5 h-4 w-4 shrink-0 text-brand-600",strokeWidth:2.2}),s]},s))})]}),o.jsx("dl",{className:"grid grid-cols-1 gap-px self-start overflow-hidden rounded-xl border border-gray-200 bg-gray-200 sm:grid-cols-2 lg:col-span-7",children:Km.map(s=>o.jsxs("div",{className:"bg-white px-5 py-4",children:[o.jsx("dt",{className:"text-2xs uppercase tracking-label text-gray-500",children:s.k}),o.jsx("dd",{className:"mt-1 text-sm font-medium text-gray-900",children:s.v})]},s.k))})]})}),o.jsx("section",{className:"border-t border-gray-200 bg-gray-950",children:o.jsxs("div",{className:"relative mx-auto max-w-container overflow-hidden px-4 py-20 sm:px-6 lg:px-8",children:[o.jsx("div",{className:"pointer-events-none absolute inset-0 bg-grid-dark","aria-hidden":!0}),o.jsxs("div",{className:"relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between",children:[o.jsxs("div",{children:[o.jsx("h2",{className:"max-w-lg text-title font-semibold text-white",children:"Your product. Your artwork. Print-ready in minutes."}),o.jsx("p",{className:"mt-3 max-w-md text-sm leading-relaxed text-gray-400",children:"No design skills needed — start from a template or an empty canvas."})]}),o.jsxs(M,{to:"/products",className:"btn btn-lg group shrink-0 bg-white text-gray-900 hover:bg-gray-100",children:["Start designing",o.jsx(cr,{className:"h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"})]})]})]})})]})}function Jm(t,e){const[r,n]=m.useState(t);return m.useEffect(()=>{const s=setTimeout(()=>n(t),e);return()=>clearTimeout(s)},[t,e]),r}const Xm=[{value:"newest",label:"Newest"},{value:"price_asc",label:"Price: low to high"},{value:"price_desc",label:"Price: high to low"},{value:"name",label:"Name A–Z"}];function Ym(){const[t,e]=xi(),[r,n]=m.useState([]),[s,i]=m.useState(null),[a,l]=m.useState(null),[c,d]=m.useState(t.get("search")??""),[u,h]=m.useState(!1),g=Jm(c,350),b=t.get("category")??"",v=t.get("sort")||"newest",w=Number(t.get("page"))||1;m.useEffect(()=>{ro().then(n).catch(()=>n([]))},[]),m.useEffect(()=>{i(null),no({search:g||void 0,category:b||void 0,sort:v,page:w,pageSize:12}).then(x=>{i(x.items),l(x.meta)}).catch(()=>i([]))},[g,b,v,w]);const E=m.useMemo(()=>(x,R)=>{const A=new URLSearchParams(t);R?A.set(x,R):A.delete(x),x!=="page"&&A.delete("page"),e(A,{replace:!0})},[t,e]),p=r.find(x=>x.slug===b),y=!!(b||c),_=o.jsxs("div",{className:"flex flex-wrap gap-1.5 lg:flex-col lg:gap-0.5",children:[o.jsx(ii,{active:!b,onClick:()=>E("category",""),label:"All products"}),r.map(x=>{var R;return o.jsx(ii,{active:b===x.slug,onClick:()=>E("category",x.slug),label:x.name,count:(R=x._count)==null?void 0:R.products},x.id)})]});return o.jsxs("div",{className:"mx-auto w-full max-w-container flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10",children:[o.jsxs("header",{className:"border-b border-gray-200 pb-6",children:[o.jsx("p",{className:"eyebrow",children:"Catalog"}),o.jsx("h1",{className:"mt-2 text-title font-semibold text-gray-900",children:(p==null?void 0:p.name)??"Every blank we print"}),o.jsx("p",{className:"mt-2 max-w-prose text-sm leading-relaxed text-gray-500",children:"Each product ships with measured print areas, its own colourways and a 3D preview mesh."})]}),o.jsxs("div",{className:"mt-8 flex flex-col gap-8 lg:flex-row lg:gap-12",children:[o.jsx("aside",{className:"lg:w-52 lg:shrink-0",children:o.jsxs("div",{className:"lg:sticky lg:top-[76px]",children:[o.jsxs("div",{className:"relative",children:[o.jsx(Nm,{className:"pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400",strokeWidth:1.8}),o.jsx("input",{className:"input pl-9 pr-8",placeholder:"Search…",value:c,onChange:x=>{d(x.target.value),E("search",x.target.value)},"aria-label":"Search products"}),c&&o.jsx("button",{onClick:()=>{d(""),E("search","")},className:"absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-400 hover:text-gray-700","aria-label":"Clear search",children:o.jsx(Er,{className:"h-3.5 w-3.5"})})]}),o.jsx("button",{className:"btn-secondary mt-3 w-full justify-between lg:hidden",onClick:()=>h(x=>!x),"aria-expanded":u,children:o.jsxs("span",{className:"flex items-center gap-2",children:[o.jsx(km,{className:"h-4 w-4"}),(p==null?void 0:p.name)??"All products"]})}),o.jsxs("div",{className:C("mt-5 lg:block",u?"block":"hidden"),children:[o.jsx("p",{className:"panel-title mb-3 hidden lg:block",children:"Category"}),_]})]})}),o.jsxs("div",{className:"min-w-0 flex-1",children:[o.jsxs("div",{className:"mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-4",children:[o.jsxs("div",{className:"flex items-center gap-3",children:[o.jsx("p",{className:"text-sm text-gray-500",children:a?o.jsxs(o.Fragment,{children:[o.jsx("span",{className:"font-medium tabular text-gray-900",children:a.total})," ","product",a.total===1?"":"s"]}):o.jsx("span",{className:"inline-block h-4 w-20 skeleton rounded"})}),y&&o.jsxs("button",{onClick:()=>{d(""),e({},{replace:!0})},className:"inline-flex items-center gap-1 text-xs font-medium text-gray-500 transition-colors hover:text-gray-900",children:[o.jsx(Er,{className:"h-3 w-3"})," Clear filters"]})]}),o.jsxs("label",{className:"flex items-center gap-2 text-xs text-gray-500",children:[o.jsx("span",{className:"hidden sm:inline",children:"Sort"}),o.jsx("select",{className:"input btn-sm h-8 w-44 text-xs",value:v,onChange:x=>E("sort",x.target.value),children:Xm.map(x=>o.jsx("option",{value:x.value,children:x.label},x.value))})]})]}),s===null?o.jsx("div",{className:"grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3",children:Array.from({length:6}).map((x,R)=>o.jsxs("div",{children:[o.jsx(Et,{className:"aspect-[4/5] w-full"}),o.jsx(Et,{className:"mt-3.5 h-3 w-16"}),o.jsx(Et,{className:"mt-2 h-4 w-32"})]},R))}):s.length===0?o.jsx(qn,{title:"No products match",description:"Try a different search term, or clear the filters to see the full catalog.",action:o.jsx("button",{className:"btn-secondary",onClick:()=>{d(""),e({},{replace:!0})},children:"Clear filters"})}):o.jsx("div",{className:"grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3",children:s.map(x=>o.jsx(io,{product:x},x.id))}),a&&a.totalPages>1&&o.jsx("div",{className:"mt-12 border-t border-gray-200 pt-6",children:o.jsx(Um,{page:w,totalPages:a.totalPages,onChange:x=>{E("page",String(x)),window.scrollTo({top:0,behavior:"smooth"})}})})]})]})]})}function ii({active:t,onClick:e,label:r,count:n}){return o.jsxs("button",{onClick:e,"aria-pressed":t,className:C("flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors",t?"bg-gray-900 font-medium text-white lg:bg-gray-100 lg:text-gray-900":"text-gray-600 hover:bg-gray-100 hover:text-gray-900"),children:[r,n!=null&&o.jsx("span",{className:C("text-2xs tabular",t?"text-white/60 lg:text-gray-400":"text-gray-400"),children:n})]})}function Zm(){const{slug:t}=zo(),e=we(),[r,n]=m.useState(null),[s,i]=m.useState(null),[a,l]=m.useState(null),[c,d]=m.useState(0);m.useEffect(()=>{t&&(n(null),d(0),Cm(t).then(n).catch(()=>n("error")))},[t]);const u=m.useMemo(()=>{if(!r||r==="error")return[];const p=new Map;return r.variants.forEach(y=>{y.color&&y.colorName&&!p.has(y.colorName)&&p.set(y.colorName,{hex:y.color,name:y.colorName})}),Array.from(p.values())},[r]),h=m.useMemo(()=>!r||r==="error"?[]:Array.from(new Set(r.variants.map(p=>p.size).filter(Boolean))),[r]),g=m.useMemo(()=>{if(!(!r||r==="error"))return r.variants.find(p=>(!s||p.colorName===s)&&(!a||p.size===a))},[r,s,a]);if(r===null)return o.jsx(Lr,{label:"Loading product"});if(r==="error")return o.jsx("div",{className:"mx-auto w-full max-w-3xl px-4 py-24",children:o.jsx(qn,{title:"Product not found",description:"It may have been removed or renamed. Browse the catalog to find something similar.",action:o.jsx(M,{to:"/products",className:"btn-primary",children:"Browse catalog"})})});const b=r.images.length?r.images:[],v=b[c]??b.find(p=>p.isPrimary)??b[0],w=(g==null?void 0:g.price)??r.basePrice,E=`/designer/${r.slug}${g?`?variant=${g.id}`:""}`;return o.jsxs("div",{className:"mx-auto w-full max-w-container flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-10",children:[o.jsx(Mm,{items:[{label:"Catalog",to:"/products"},{label:r.category.name,to:`/products?category=${r.category.slug}`},{label:r.name}]}),o.jsxs("div",{className:"mt-6 grid gap-10 lg:grid-cols-12 lg:gap-14",children:[o.jsx("div",{className:"lg:col-span-7",children:o.jsxs("div",{className:"lg:sticky lg:top-[76px]",children:[o.jsxs("div",{className:"relative overflow-hidden rounded-2xl border border-gray-200 bg-surface-sunken",children:[o.jsx("div",{className:"absolute inset-0 bg-grid opacity-60","aria-hidden":!0}),v&&o.jsx("img",{src:v.url,alt:v.alt??r.name,className:"relative mx-auto aspect-[4/3] w-full object-contain p-10 sm:p-16"})]}),b.length>1&&o.jsx("div",{className:"mt-3 flex gap-2.5",children:b.map((p,y)=>o.jsx("button",{onClick:()=>d(y),"aria-label":`View image ${y+1}`,"aria-current":y===c,className:C("h-16 w-16 shrink-0 overflow-hidden rounded-lg border bg-surface-sunken p-2 transition-colors",y===c?"border-gray-900":"border-gray-200 hover:border-gray-300"),children:o.jsx("img",{src:p.url,alt:"",className:"h-full w-full object-contain",loading:"lazy"})},p.id??y))})]})}),o.jsxs("div",{className:"lg:col-span-5",children:[o.jsx("p",{className:"eyebrow",children:r.category.name}),o.jsx("h1",{className:"mt-2.5 text-title font-semibold text-gray-900",children:r.name}),o.jsxs("div",{className:"mt-3 flex flex-wrap items-center gap-2",children:[r.model&&o.jsxs(ti,{tone:"neutral",children:[o.jsx(Za,{className:"h-3 w-3",strokeWidth:2})," 3D preview"]}),o.jsxs(ti,{tone:"neutral",children:[o.jsx(_m,{className:"h-3 w-3",strokeWidth:2})," ",r.printAreas.length," print area",r.printAreas.length===1?"":"s"]})]}),o.jsxs("p",{className:"mt-6 text-2xl font-semibold tabular tracking-tight text-gray-900",children:[so(w),o.jsx("span",{className:"ml-2 text-xs font-normal text-gray-400",children:"base price"})]}),r.description&&o.jsx("p",{className:"mt-5 max-w-prose text-sm leading-relaxed text-gray-600",children:r.description}),o.jsxs("div",{className:"mt-8 space-y-7 border-t border-gray-200 pt-7",children:[u.length>0&&o.jsxs("div",{children:[o.jsxs("div",{className:"mb-3 flex items-baseline justify-between",children:[o.jsx("p",{className:"panel-title",children:"Colour"}),o.jsx("p",{className:"text-xs text-gray-500",children:s??"Any"})]}),o.jsx("div",{className:"flex flex-wrap gap-2.5",children:u.map(p=>o.jsx(Fm,{color:p.hex,title:p.name,selected:s===p.name,onClick:()=>i(p.name===s?null:p.name)},p.name))})]}),h.length>0&&o.jsxs("div",{children:[o.jsxs("div",{className:"mb-3 flex items-baseline justify-between",children:[o.jsx("p",{className:"panel-title",children:"Size"}),o.jsx("p",{className:"text-xs text-gray-500",children:a??"Any"})]}),o.jsx("div",{className:"flex flex-wrap gap-2",children:h.map(p=>o.jsx("button",{onClick:()=>l(p===a?null:p),"aria-pressed":a===p,className:C("h-9 min-w-11 rounded-lg border px-3 text-xs font-medium transition-colors",a===p?"border-gray-900 bg-gray-900 text-white":"border-gray-200 bg-white text-gray-700 hover:border-gray-400"),children:p},p))})]}),r.printAreas.length>0&&o.jsxs("div",{children:[o.jsx("p",{className:"panel-title mb-3",children:"Print areas"}),o.jsx("dl",{className:"overflow-hidden rounded-lg border border-gray-200",children:r.printAreas.map((p,y)=>o.jsxs("div",{className:C("flex items-center justify-between gap-4 px-3.5 py-2.5 text-sm",y>0&&"border-t border-gray-100"),children:[o.jsx("dt",{className:"text-gray-700",children:p.name}),o.jsx("dd",{className:"tabular text-xs text-gray-500",children:p.physicalWidthIn&&p.physicalHeightIn?`${p.physicalWidthIn}″ × ${p.physicalHeightIn}″`:`${p.width} × ${p.height} px`})]},p.id))})]})]}),o.jsxs("div",{className:"mt-8 space-y-3 border-t border-gray-200 pt-7",children:[o.jsxs("button",{onClick:()=>e(E),className:"btn-primary btn-lg group w-full",children:["Customize this product",o.jsx(cr,{className:"h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"})]}),o.jsx("p",{className:"text-center text-xs text-gray-400",children:"Free to design · quantity discounts apply at checkout"})]})]})]})]})}function Mr({title:t,subtitle:e,children:r,footer:n}){return o.jsxs("div",{className:"grid flex-1 lg:min-h-[calc(100vh-60px)] lg:grid-cols-2",children:[o.jsx("div",{className:"flex items-center justify-center px-4 py-14 sm:px-8 lg:px-12",children:o.jsxs("div",{className:"w-full max-w-sm",children:[o.jsx("h1",{className:"text-2xl font-semibold tracking-tight text-gray-900",children:t}),e&&o.jsx("p",{className:"mt-2 text-sm leading-relaxed text-gray-500",children:e}),o.jsx("div",{className:"mt-8",children:r}),n&&o.jsx("div",{className:"mt-8 text-sm text-gray-500",children:n})]})}),o.jsxs("aside",{className:"relative hidden overflow-hidden border-l border-gray-200 bg-white lg:block",children:[o.jsx("div",{className:"absolute inset-0 bg-grid opacity-70","aria-hidden":!0}),o.jsx("div",{className:"pointer-events-none absolute -left-24 top-1/3 h-96 w-96 rounded-full opacity-40 blur-3xl",style:{background:"radial-gradient(circle, #f3d0ba 0%, transparent 65%)"},"aria-hidden":!0}),o.jsxs("div",{className:"relative flex h-full flex-col justify-between p-12",children:[o.jsx("p",{className:"eyebrow",children:"Makely studio"}),o.jsxs("div",{className:"relative mx-auto w-full max-w-sm",children:[o.jsx("img",{src:"/images/products/tshirt.svg",alt:"","aria-hidden":!0,className:"w-full drop-shadow-sm"}),o.jsx("span",{className:"absolute left-1/2 top-[34%] h-[30%] w-[27%] -translate-x-1/2 rounded-[3px] border border-dashed border-brand-500/70 bg-brand-500/[0.06]","aria-hidden":!0})]}),o.jsxs("div",{children:[o.jsx("p",{className:"max-w-sm text-lg leading-snug tracking-tight text-gray-900",children:"Design on the real product, export the file the press actually needs."}),o.jsx("div",{className:"mt-6 grid max-w-sm grid-cols-3 gap-px overflow-hidden rounded-xl border border-gray-200 bg-gray-200",children:[{k:"DPI",v:"300"},{k:"Products",v:"15+"},{k:"Preview",v:"3D"}].map(s=>o.jsxs("div",{className:"bg-white px-4 py-3",children:[o.jsx("p",{className:"text-base font-semibold tabular text-gray-900",children:s.v}),o.jsx("p",{className:"mt-0.5 text-2xs uppercase tracking-label text-gray-500",children:s.k})]},s.k))})]})]})]})]})}function ao({prompt:t,to:e,label:r}){return o.jsxs("p",{children:[t," ",o.jsx(M,{to:e,className:"font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 transition-colors hover:decoration-gray-900",children:r})]})}const Qm=new Set(["auth/popup-closed-by-user","auth/cancelled-popup-request"]);function eg({className:t}){return o.jsxs("svg",{className:t,viewBox:"0 0 18 18","aria-hidden":!0,children:[o.jsx("path",{fill:"#4285F4",d:"M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z"}),o.jsx("path",{fill:"#34A853",d:"M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.83.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18Z"}),o.jsx("path",{fill:"#FBBC05",d:"M3.97 10.72A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.18.29-1.72V4.95H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.05l3.01-2.33Z"}),o.jsx("path",{fill:"#EA4335",d:"M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.9 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58Z"})]})}function tg({label:t="Continue with Google",disabled:e=!1,onBusyChange:r}){const n=Je(d=>d.loginWithGoogle),s=we(),i=X(),[a,l]=m.useState(!1);if(!Xa)return null;async function c(){var d;l(!0),r==null||r(!0);try{await n();const u=(d=i.state)==null?void 0:d.from;s(u||"/dashboard",{replace:!0})}catch(u){const h=u==null?void 0:u.code;if(h&&Qm.has(h))return;ze.error(h!=null&&h.startsWith("auth/")?lm(u):Lt(u,"Google sign-in failed"))}finally{l(!1),r==null||r(!1)}}return o.jsxs("button",{type:"button",onClick:c,disabled:e||a,className:"btn-secondary btn-lg w-full",children:[a?o.jsx(Xe,{className:"h-4 w-4 text-gray-500"}):o.jsx(eg,{className:"h-4 w-4"}),t]})}function rg({children:t="or"}){return o.jsxs("div",{className:"flex items-center gap-3","aria-hidden":!0,children:[o.jsx("span",{className:"divider flex-1"}),o.jsx("span",{className:"text-2xs font-medium uppercase tracking-label text-gray-400",children:t}),o.jsx("span",{className:"divider flex-1"})]})}function ng(){const t=Je(w=>w.login),e=we(),r=X(),[n,s]=m.useState(""),[i,a]=m.useState(""),[l,c]=m.useState(!1),[d,u]=m.useState(!1),[h,g]=m.useState(!1);async function b(w,E){var p;u(!0);try{await t(w,E);const y=(p=r.state)==null?void 0:p.from;e(y||"/dashboard",{replace:!0})}catch(y){ze.error(Lt(y,"Sign in failed"))}finally{u(!1)}}function v(w){w.preventDefault(),b(n,i)}return o.jsxs(Mr,{title:"Welcome back",subtitle:"Sign in to pick up your saved designs and orders.",footer:o.jsx(ao,{prompt:"New to Makely?",to:"/register",label:"Create an account"}),children:[o.jsxs("form",{onSubmit:v,className:"space-y-5",children:[o.jsx(_r,{label:"Email",children:o.jsx("input",{type:"email",required:!0,className:"input",value:n,onChange:w=>s(w.target.value),autoComplete:"email",placeholder:"you@company.com"})}),o.jsxs("div",{children:[o.jsxs("div",{className:"mb-1.5 flex items-baseline justify-between",children:[o.jsx("label",{className:"label mb-0",htmlFor:"password",children:"Password"}),o.jsx(M,{to:"/forgot-password",className:"text-xs text-gray-500 underline decoration-gray-300 underline-offset-2 transition-colors hover:text-gray-900",children:"Forgot?"})]}),o.jsxs("div",{className:"relative",children:[o.jsx("input",{id:"password",type:l?"text":"password",required:!0,className:"input pr-10",value:i,onChange:w=>a(w.target.value),autoComplete:"current-password",placeholder:"••••••••"}),o.jsx("button",{type:"button",onClick:()=>c(w=>!w),className:"absolute right-1 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-gray-400 transition-colors hover:text-gray-700","aria-label":l?"Hide password":"Show password",children:l?o.jsx(Vn,{className:"h-4 w-4"}):o.jsx(Wn,{className:"h-4 w-4"})})]})]}),o.jsxs("button",{type:"submit",className:"btn-primary btn-lg w-full",disabled:d||h,children:[d&&o.jsx(Xe,{className:"h-4 w-4 text-white"}),"Sign in"]})]}),o.jsxs("div",{className:"mt-6 space-y-5",children:[o.jsx(rg,{}),o.jsx(tg,{disabled:d,onBusyChange:g})]})]})}function sg(t){if(!t)return{score:0,label:""};let e=0;return t.length>=8&&e++,t.length>=12&&e++,/[a-z]/.test(t)&&/[A-Z]/.test(t)&&e++,/\d/.test(t)&&e++,/[^\w\s]/.test(t)&&e++,{score:e,label:["Too short","Weak","Fair","Good","Strong","Excellent"][Math.min(e,5)]}}function ig(){const t=Je(w=>w.register),e=we(),r=X(),[n,s]=m.useState(""),[i,a]=m.useState(""),[l,c]=m.useState(""),[d,u]=m.useState(!1),[h,g]=m.useState(!1),b=m.useMemo(()=>sg(l),[l]);async function v(w){var E;w.preventDefault(),g(!0);try{await t(n,i,l),ze.success("Welcome — your account is ready.");const p=(E=r.state)==null?void 0:E.from;e(p||"/dashboard",{replace:!0})}catch(p){ze.error(Lt(p,"Registration failed"))}finally{g(!1)}}return o.jsx(Mr,{title:"Create your account",subtitle:"Save designs, reorder in a click, and keep your uploads in one place.",footer:o.jsx(ao,{prompt:"Already have an account?",to:"/login",label:"Sign in"}),children:o.jsxs("form",{onSubmit:v,className:"space-y-5",children:[o.jsx(_r,{label:"Full name",children:o.jsx("input",{required:!0,minLength:2,className:"input",value:n,onChange:w=>s(w.target.value),autoComplete:"name",placeholder:"Alex Rivera"})}),o.jsx(_r,{label:"Email",children:o.jsx("input",{type:"email",required:!0,className:"input",value:i,onChange:w=>a(w.target.value),autoComplete:"email",placeholder:"you@company.com"})}),o.jsxs("div",{children:[o.jsx("label",{className:"label",htmlFor:"new-password",children:"Password"}),o.jsxs("div",{className:"relative",children:[o.jsx("input",{id:"new-password",type:d?"text":"password",required:!0,minLength:8,className:"input pr-10",value:l,onChange:w=>c(w.target.value),autoComplete:"new-password",placeholder:"At least 8 characters"}),o.jsx("button",{type:"button",onClick:()=>u(w=>!w),className:"absolute right-1 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-gray-400 transition-colors hover:text-gray-700","aria-label":d?"Hide password":"Show password",children:d?o.jsx(Vn,{className:"h-4 w-4"}):o.jsx(Wn,{className:"h-4 w-4"})})]}),o.jsxs("div",{className:"mt-2.5 flex items-center gap-2.5",children:[o.jsx("div",{className:"flex flex-1 gap-1",children:[0,1,2,3,4].map(w=>o.jsx("span",{className:C("h-1 flex-1 rounded-full transition-colors duration-300",w<b.score?b.score<=2?"bg-amber-500":b.score<=3?"bg-brand-500":"bg-emerald-500":"bg-gray-200")},w))}),o.jsx("span",{className:"w-16 shrink-0 text-right text-2xs text-gray-500",children:b.label})]}),o.jsx("p",{className:"mt-1.5 text-xs text-gray-500",children:"At least 8 characters, with a letter and a number."})]}),o.jsxs("button",{type:"submit",className:"btn-primary btn-lg w-full",disabled:h,children:[h&&o.jsx(Xe,{className:"h-4 w-4 text-white"}),"Create account"]})]})})}function ag(){const[t,e]=m.useState(""),[r,n]=m.useState(!1),[s,i]=m.useState(!1);async function a(l){l.preventDefault(),n(!0);try{await k.post("/auth/forgot-password",{email:t}),i(!0)}catch(c){ze.error(Lt(c))}finally{n(!1)}}return o.jsx(Mr,{title:s?"Check your inbox":"Reset your password",subtitle:s?void 0:"Enter the email on your account and we will send a link to set a new password.",footer:o.jsxs(M,{to:"/login",className:"inline-flex items-center gap-1.5 font-medium text-gray-900 transition-colors hover:text-gray-600",children:[o.jsx(hm,{className:"h-3.5 w-3.5"}),"Back to sign in"]}),children:s?o.jsxs("div",{className:"rounded-xl border border-emerald-200 bg-emerald-50 p-4",children:[o.jsx(xm,{className:"h-5 w-5 text-emerald-700",strokeWidth:1.8}),o.jsxs("p",{className:"mt-3 text-sm leading-relaxed text-emerald-900",children:["If an account exists for ",o.jsx("strong",{className:"font-medium",children:t}),", a reset link is on its way."]}),o.jsx("p",{className:"mt-2 text-xs text-emerald-800/80",children:"In development the link is printed to the API console."})]}):o.jsxs("form",{onSubmit:a,className:"space-y-5",children:[o.jsx(_r,{label:"Email",children:o.jsx("input",{type:"email",required:!0,className:"input",value:t,onChange:l=>e(l.target.value),autoComplete:"email",placeholder:"you@company.com"})}),o.jsxs("button",{type:"submit",className:"btn-primary btn-lg w-full",disabled:r,children:[r&&o.jsx(Xe,{className:"h-4 w-4 text-white"}),"Send reset link"]})]})})}function og(){const[t]=xi(),e=t.get("token")??"",r=we(),[n,s]=m.useState(""),[i,a]=m.useState(!1),[l,c]=m.useState(!1);async function d(u){u.preventDefault(),c(!0);try{await k.post("/auth/reset-password",{token:e,password:n}),ze.success("Password updated — sign in with your new password."),r("/login")}catch(h){ze.error(Lt(h,"Reset failed"))}finally{c(!1)}}return e?o.jsx(Mr,{title:"Choose a new password",subtitle:"Make it something you have not used before.",children:o.jsxs("form",{onSubmit:d,className:"space-y-5",children:[o.jsxs("div",{children:[o.jsx("label",{className:"label",htmlFor:"reset-password",children:"New password"}),o.jsxs("div",{className:"relative",children:[o.jsx("input",{id:"reset-password",type:i?"text":"password",required:!0,minLength:8,className:"input pr-10",value:n,onChange:u=>s(u.target.value),autoComplete:"new-password",placeholder:"At least 8 characters"}),o.jsx("button",{type:"button",onClick:()=>a(u=>!u),className:"absolute right-1 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-gray-400 transition-colors hover:text-gray-700","aria-label":i?"Hide password":"Show password",children:i?o.jsx(Vn,{className:"h-4 w-4"}):o.jsx(Wn,{className:"h-4 w-4"})})]})]}),o.jsxs("button",{type:"submit",className:"btn-primary btn-lg w-full",disabled:l,children:[l&&o.jsx(Xe,{className:"h-4 w-4 text-white"}),"Update password"]})]})}):o.jsx("div",{className:"mx-auto w-full max-w-lg px-4 py-24",children:o.jsx(qn,{title:"This reset link is invalid",description:"The link may have expired or already been used. Request a fresh one to continue.",action:o.jsx(M,{to:"/forgot-password",className:"btn-primary",children:"Request a new link"})})})}const lg=m.lazy(()=>ct(()=>import("./DesignerPage-BVbRdnJc.js"),__vite__mapDeps([3,1,2,4,5,6,7,8,9,10]))),cg=m.lazy(()=>ct(()=>import("./DashboardRoutes-DstIa4Yj.js"),__vite__mapDeps([11,1,2,6,12,13,7,5]))),ug=m.lazy(()=>ct(()=>import("./CartPage-DhkqnnNO.js"),__vite__mapDeps([14,1,2,13,9,6]))),dg=m.lazy(()=>ct(()=>import("./CheckoutPage-x6o77yfp.js"),__vite__mapDeps([15,1,2,10,8]))),hg=m.lazy(()=>ct(()=>import("./AdminRoutes-CN65AroL.js"),__vite__mapDeps([16,1,2,12,6,13,5,4,10])));function fg(){const t=Je(e=>e.initialize);return m.useEffect(()=>{t()},[t]),o.jsx(m.Suspense,{fallback:o.jsx(Lr,{}),children:o.jsxs(al,{children:[o.jsxs(V,{element:o.jsx(zm,{}),children:[o.jsx(V,{path:"/",element:o.jsx(Gm,{})}),o.jsx(V,{path:"/products",element:o.jsx(Ym,{})}),o.jsx(V,{path:"/products/:slug",element:o.jsx(Zm,{})}),o.jsx(V,{path:"/login",element:o.jsx(ng,{})}),o.jsx(V,{path:"/register",element:o.jsx(ig,{})}),o.jsx(V,{path:"/forgot-password",element:o.jsx(ag,{})}),o.jsx(V,{path:"/reset-password",element:o.jsx(og,{})}),o.jsx(V,{path:"/cart",element:o.jsx(rn,{children:o.jsx(ug,{})})}),o.jsx(V,{path:"/checkout",element:o.jsx(rn,{children:o.jsx(dg,{})})}),o.jsx(V,{path:"/dashboard/*",element:o.jsx(rn,{children:o.jsx(cg,{})})})]}),o.jsx(V,{path:"/designer/:productSlug",element:o.jsx(lg,{})}),o.jsx(V,{path:"/admin/*",element:o.jsx(Vm,{children:o.jsx(hg,{})})}),o.jsx(V,{path:"*",element:o.jsx(dr,{to:"/",replace:!0})})]})})}ho.createRoot(document.getElementById("root")).render(o.jsx(po.StrictMode,{children:o.jsxs(ml,{children:[o.jsx(fg,{}),o.jsx(lc,{position:"bottom-right",gutter:8,toastOptions:{duration:3500,className:"",style:{background:"#1a1816",color:"#f4f2ef",fontSize:"13px",lineHeight:"1.4",fontWeight:500,letterSpacing:"-0.006em",padding:"10px 14px",borderRadius:"10px",maxWidth:"360px",boxShadow:"0 0 0 1px rgba(255,255,255,.08), 0 12px 32px -8px rgba(15,14,13,.5)"},success:{iconTheme:{primary:"#34d399",secondary:"#1a1816"}},error:{iconTheme:{primary:"#f87171",secondary:"#1a1816"}},loading:{iconTheme:{primary:"#cd6435",secondary:"#1a1816"}}}})]})}));export{Wm as $,hm as A,no as B,Qa as C,cr as D,Vn as E,_r as F,zo as G,xi as H,Cm as I,Bg as J,qn as K,M as L,Lm as M,Fg as N,ny as O,Lr as P,Et as Q,uy as R,ry as S,$m as T,Hm as U,ri as V,ey as W,Er as X,Vg as Y,zg as Z,oy as _,Hg as a,Yg as a0,Em as a1,ti as a2,ly as a3,cy as a4,Zg as a5,sy as a6,mm as a7,Sm as a8,qt as a9,Mg as aA,al as aa,V as ab,Rm as ac,Mm as ad,Xg as ae,iy as af,Nm as ag,ay as ah,Za as ai,ty as aj,ni as ak,rt as al,kt as am,ot as an,pa as ao,Mt as ap,uh as aq,Oe as ar,Ad as as,Lg as at,Dd as au,Ld as av,Ge as aw,qh as ax,at as ay,da as az,C as b,O as c,ym as d,Fm as e,qg as f,Wg as g,Lt as h,Xe as i,Kg as j,Jg as k,Gg as l,Wn as m,k as n,we as o,Om as p,Jm as q,Ug as r,pm as s,eo as t,Je as u,so as v,$g as w,Qg as x,km as y,ze as z};
