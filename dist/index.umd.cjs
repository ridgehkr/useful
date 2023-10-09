(function(c,s){typeof exports=="object"&&typeof module<"u"?s(exports,require("react")):typeof define=="function"&&define.amd?define(["exports","react"],s):(c=typeof globalThis<"u"?globalThis:c||self,s(c.index={},c.React))})(this,function(c,s){"use strict";const T=(t,e=!0)=>{const[n,o]=s.useState({data:null,loading:!1,error:null}),u=s.useMemo(()=>async()=>{o({data:null,loading:!0,error:null});try{const r=await t();o({data:r,loading:!1,error:null})}catch(r){o({data:null,loading:!1,error:r})}},[t,o]);return s.useEffect(()=>{e&&u()},[e,u]),{...n,run:u}};function y(t,e){try{return getComputedStyle(e).getPropertyValue(t)}catch(n){return console.error("Could not get property value",n),""}}const k=(t,e)=>{const[n,o]=s.useState((e==null?void 0:e.current)??document.documentElement),[u,r]=s.useState(()=>y(t,n));return s.useEffect(()=>{e&&o((e==null?void 0:e.current)??document.documentElement)},[e]),s.useEffect(()=>{if(typeof t!="string"||!t.startsWith("--"))console.error('Invalid property name. Property name must be a string and start with "--"');else{const i=new MutationObserver(()=>{const l=y(t,n);l!==u&&r(l)});return i.observe(n,{attributes:!0,attributeFilter:["style","class","id"]}),()=>i.disconnect()}},[t,u,n]),u},p="dark-mode",C="change",g=window.matchMedia("(prefers-color-scheme: dark)");function D(t=null){const[e,n]=s.useState(t??g.matches);return s.useEffect(()=>{document.documentElement.classList.toggle(p,e)},[e]),s.useEffect(()=>{const o=()=>{n(!!g.matches)};return g.addEventListener(C,o),()=>{g.removeEventListener(C,o)}},[n]),{isDarkMode:e,setIsDarkMode:n}}const O=(t,e)=>{const[n,o]=s.useState(t);return s.useEffect(()=>{if(!Number.isInteger(e)||e<0)console.error("Delay must be a positive integer");else{const u=setTimeout(()=>{o(t)},e);return()=>{clearTimeout(u)}}},[t,e]),n},A=t=>{const[e,n]=s.useState({width:0,height:0});return s.useLayoutEffect(()=>{if(!t.current)return;const o=t.current;n({width:t.current.offsetWidth,height:t.current.offsetHeight});const u=new ResizeObserver(r=>{for(const i of r)i.contentBoxSize&&n({width:i.target.offsetWidth,height:i.target.offsetHeight})});return u.observe(o),()=>{u&&u.unobserve(o)}},[t]),e},R=t=>{const[e,n]=s.useState(),[o,u]=s.useState(!1),[r,i]=s.useState(null);return{load:s.useCallback(async(f,a={})=>{i(null),u(!0);try{const m=await fetch(f,a);if(!m.ok)throw new Error("Network response to fetch() was unsuccessful."+m.statusText);const d=await m.json();n(t?t(d):d),u(!1)}catch(m){m instanceof Error?i(`Load operation could not be completed: ${m.message}`):i("An unknown error occurred."),u(!1)}},[u,n,i,t]),data:e,loading:o,error:r}},P=()=>{const[t,e]=s.useState({latitude:null,longitude:null,error:null}),n=s.useCallback(()=>{"geolocation"in navigator?navigator.geolocation.getCurrentPosition(o=>{e({latitude:o.coords.latitude,longitude:o.coords.longitude,error:null})},o=>{e(u=>({...u,error:o.message}))}):e(o=>({...o,error:"Geolocation is not available in this browser."}))},[]);return s.useEffect(()=>{n()},[n]),{location:t,getLocation:n}},z=(t=!1)=>{const[e,n]=s.useState(!1),o=s.useRef(null),u=s.useCallback(()=>{n(!0)},[n]),r=s.useCallback(()=>{n(!1)},[n]);return s.useLayoutEffect(()=>{const i=o.current;if(!i)return;const l=["mouseenter"],f=["mouseleave"];return t&&(l.push("touchend"),f.push("touchend")),l.forEach(a=>i.addEventListener(a,u)),f.forEach(a=>i.addEventListener(a,r)),()=>{i.removeEventListener("mouseenter",u),i.removeEventListener("mouseleave",r)}},[r,u,t]),{ref:o,hasHover:e}},V=t=>{const[e,n]=s.useState(!1);return s.useEffect(()=>{let o;const u=()=>{o&&clearTimeout(o),o=setTimeout(()=>{n(!0)},t)},r=()=>{e&&n(!1),u()},i=()=>{document.hidden||r()};return document.addEventListener("mousemove",r),document.addEventListener("mousedown",r),document.addEventListener("resize",r),document.addEventListener("keydown",r),document.addEventListener("touchstart",r),document.addEventListener("touchmove",r),document.addEventListener("wheel",r),document.addEventListener("visibilitychange",i),u(),()=>{document.addEventListener("mousemove",r),document.addEventListener("mousedown",r),document.addEventListener("resize",r),document.addEventListener("keydown",r),document.addEventListener("touchstart",r),document.addEventListener("touchmove",r),document.addEventListener("wheel",r),document.addEventListener("visibilitychange",r),clearTimeout(o)}},[t,e]),e},_=t=>{const e=s.useRef(null),[n,o]=s.useState(null);return s.useLayoutEffect(()=>{const u=e==null?void 0:e.current;if(!u)throw new Error("useIntersectionObserver ref is not defined");const r=new IntersectionObserver(([i])=>{o(i)},{root:t.root??null,rootMargin:t.rootMargin??"0px",threshold:t.threshold??0});return r.observe(u),()=>{r.unobserve(u)}},[o,t]),{ref:e,entry:n}},H=(t=[])=>{const[e,n]=s.useState([...t]),o=s.useMemo(()=>e[0],[e]),u=s.useMemo(()=>e.slice(1),[e]),r=s.useMemo(()=>e.length,[e]),i=s.useCallback(d=>e[d],[e]),l=s.useCallback(d=>{n(h=>[d,...h])},[n]),f=s.useCallback(d=>{n(h=>[...h,d])},[n]);return{items:e,head:o,tail:u,size:r,itemAt:i,prepend:l,append:f,remove:d=>{n(h=>{const S=[...h];return S.splice(d,1),S})},update:(d,h)=>{n(S=>{const w=[...S];return w[d]=h,w})}}},$=(t,e)=>{const[n,o]=s.useState(()=>{try{const i=localStorage.getItem(t);if(i!==null)return JSON.parse(i)}catch(i){console.error(`Error parsing stored value for key "${t}": ${i}`)}return e}),u=s.useCallback(i=>{o(i);try{localStorage.setItem(t,JSON.stringify(i))}catch(l){console.error(`Error setting stored value for key "${t}": ${l}`)}},[o,t]),r=s.useCallback(()=>{o(e);try{localStorage.removeItem(t)}catch(i){console.error(`Error deleting stored value for key "${t}": ${i}`)}},[o,t,e]);return{value:n,setStoredValue:u,deleteStoredValue:r}},I="change",N=t=>{const[e,n]=s.useState({matches:!1,media:t});return s.useLayoutEffect(()=>{const o=window.matchMedia(t),u=r=>{n({matches:r.matches,media:r.media})};return u({matches:o.matches,media:o.media}),o.addEventListener(I,r=>u({matches:r.matches,media:r.media})),()=>{o.removeEventListener(I,u)}},[t]),e},U=()=>{const[t,e]=s.useState({x:0,y:0}),n=s.useCallback(o=>{e({x:o.clientX,y:o.clientY})},[e]);return s.useLayoutEffect(()=>(document.addEventListener("mousemove",n),()=>{document.removeEventListener("mousemove",n)}),[n]),t};function W(){const[t,e]=s.useState(navigator.onLine);return s.useEffect(()=>{const n=()=>e(!0),o=()=>e(!1);return window.addEventListener("online",n),window.addEventListener("offline",o),()=>{window.removeEventListener("online",n),window.removeEventListener("offline",o)}},[e]),t}const E=(t,e)=>{const n=[];for(let o=t;o<=e;o++)n.push(o);return n},Q=E(97,122),Y=E(65,90),j=E(48,57),B=E(33,47),F=t=>{let e,n,o;const u=[...t];for(o=u.length-1;o>0;o--)e=Math.floor(Math.random()*(o+1)),n=u[o],u[o]=u[e],u[e]=n;return u},J=t=>{const[e,n]=s.useState(""),[o,u]=s.useState((t==null?void 0:t.length)??12),[r,i]=s.useState(!!(t!=null&&t.symbols)),[l,f]=s.useState(!!(t!=null&&t.numbers)),[a,m]=s.useState(!!(t!=null&&t.uppercase)),d=s.useMemo(()=>{const S=[[...Q]];return a&&S.push([...Y]),l&&S.push([...j]),r&&S.push([...B]),S},[l,r,a]),h=s.useCallback(()=>{const S=[];for(let v=0;v<o;v++){const M=d[v%d.length],te=Math.floor(Math.random()*M.length);S.push(M[te])}const w=F(S).map(v=>String.fromCharCode(v)).join("");n(w)},[o,d]);return s.useEffect(()=>{h()},[r,l,a,o,h]),{value:e,length:o,setLength:u,symbols:r,includeSymbols:i,numbers:l,includeNumbers:f,uppercase:a,includeUppercase:m}},G=()=>{const[t,e]=s.useState({x:window.scrollX,y:window.scrollY}),n=s.useCallback(()=>{e({x:window.scrollX,y:window.scrollY})},[e]);return s.useLayoutEffect(()=>(window.addEventListener("scroll",n),()=>{window.removeEventListener("scroll",n)}),[n]),t},X=(t,e)=>{const[n,o]=s.useState(()=>{try{const i=sessionStorage.getItem(t);return i?JSON.parse(i):e}catch(i){return console.error(`Error reading session storage key "${t}":`,i),e}});return{value:n,setStoredValue:i=>{try{const l=i instanceof Function?i(i):i;o(l),sessionStorage.setItem(t,JSON.stringify(l))}catch(l){console.error(`Error writing session storage key "${t}":`,l)}},deleteStoredValue:()=>{o(void 0);try{sessionStorage.removeItem(t)}catch(i){console.error(`Error deleting session storage key "${t}":`,i)}}}},b=(t,e)=>t>=0&&t<e,K=(t=[],e=!1)=>{const[n,o]=s.useState([...t]),[u,r]=s.useState(0);return{slides:n,activeSlideIndex:u,addSlide:(a,m)=>{const d=[...n];m!==void 0&&b(m,n.length)?(d.splice(m,0,a),o(d)):(d.push(a),o(d))},removeSlide:a=>{if(b(a,n.length)){const m=n.filter((d,h)=>h!==a);o(m),a===u&&r(Math.max(a,0))}else console.error(`Invalid slide index: ${a}`)},activateSlide:a=>{e?a<0?r(n.length-1):a>=n.length?r(0):r(a):!e&&b(a,n.length)?r(a):console.error(`Invalid slide index: ${a}`)}}},Z=(t=[])=>{const[e,n]=s.useState([...t]),o=s.useCallback(m=>{n(d=>[...d,m])},[n]),u=s.useCallback(()=>{if(e.length===0)return;const m=e.pop();return n([...e]),m},[e,n]),r=s.useCallback(()=>{if(e.length!==0)return e[e.length-1]},[e]),i=s.useCallback(()=>{n([])},[n]),l=s.useCallback(m=>e.includes(m),[e]),f=s.useCallback(()=>[...e],[e]),a=s.useCallback(()=>e.length,[e]);return{items:e,push:o,pop:u,peek:r,clear:i,contains:l,toArray:f,size:a}},L=(t,e)=>t>=0&&t<e,q=()=>{const[t,e]=s.useState([]),[n,o]=s.useState(0);return{tabs:t,activeTab:n,addTab:(l,f)=>{const a=[...t];return f!==void 0&&L(f,t.length)?(a.splice(f,0,l),e(a),f):(a.push(l),e(a),t.length-1)},removeTab:l=>{if(L(l,t.length))e(f=>f.filter((a,m)=>m!==l)),o(Math.max(0,l-1));else throw new Error(`Invalid tab index: ${l}`)},activateTab:l=>{if(L(l,t.length))o(l);else throw new Error(`Invalid tab index: ${l}`)}}},x=(t,e=400)=>{const[n,o]=s.useState(t),u=s.useRef(Date.now()),r=s.useRef(null);return s.useEffect(()=>{if(!Number.isInteger(e)||e<0)throw new Error("Throttle interval must be a positive integer");const i=Date.now(),l=i-u.current;return l>e?(o(t),u.current=i):(r.current&&window.clearTimeout(r.current),r.current=window.setTimeout(()=>{o(t),u.current=Date.now()},e-l)),()=>{r.current&&window.clearTimeout(r.current)}},[t,e]),n},ee=()=>{const[t,e]=s.useState({width:window.innerWidth,height:window.innerHeight}),n=s.useCallback(()=>{e({width:window.innerWidth,height:window.innerHeight})},[e]);return s.useLayoutEffect(()=>(window.addEventListener("resize",n),()=>{window.removeEventListener("resize",n)}),[n]),t};c.useAsync=T,c.useCustomCSSProp=k,c.useDarkMode=D,c.useDebounce=O,c.useElementSize=A,c.useFetch=R,c.useGeolocation=P,c.useHover=z,c.useIdleTimeout=V,c.useIntersectionObserver=_,c.useList=H,c.useLocalStorage=$,c.useMediaQuery=N,c.useMousePosition=U,c.useOnlineStatus=W,c.useRandomString=J,c.useScrollPosition=G,c.useSessionStorage=X,c.useSlideshow=K,c.useStack=Z,c.useTabs=q,c.useThrottle=x,c.useWindowSize=ee,Object.defineProperty(c,Symbol.toStringTag,{value:"Module"})});