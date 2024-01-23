(function(a,o){typeof exports=="object"&&typeof module<"u"?o(exports,require("react")):typeof define=="function"&&define.amd?define(["exports","react"],o):(a=typeof globalThis<"u"?globalThis:a||self,o(a.index={},a.React))})(this,function(a,o){"use strict";const R=(t,e=!0)=>{const[n,s]=o.useState({data:null,loading:!1,error:null}),u=o.useMemo(()=>async()=>{s({data:null,loading:!0,error:null});try{const r=await t();s({data:r,loading:!1,error:null})}catch(r){s({data:null,loading:!1,error:r})}},[t,s]);return o.useEffect(()=>{e&&u()},[e,u]),{...n,run:u}};function C(t,e){try{return getComputedStyle(e).getPropertyValue(t)}catch(n){return console.error("Could not get property value",n),""}}const N=(t,e)=>{const[n,s]=o.useState((e==null?void 0:e.current)??document.documentElement),[u,r]=o.useState(()=>C(t,n));return o.useEffect(()=>{e&&s((e==null?void 0:e.current)??document.documentElement)},[e]),o.useEffect(()=>{if(typeof t!="string"||!t.startsWith("--"))console.error('Invalid property name. Property name must be a string and start with "--"');else{const i=new MutationObserver(()=>{const l=C(t,n);l!==u&&r(l)});return i.observe(n,{attributes:!0,attributeFilter:["style","class","id"]}),()=>i.disconnect()}},[t,u,n]),u},_="dark-mode",y="change",E=window.matchMedia("(prefers-color-scheme: dark)"),D=t=>{const[e,n]=o.useState(t??E.matches);return o.useEffect(()=>{document.documentElement.classList.toggle(_,e)},[e]),o.useEffect(()=>{const s=()=>{n(!!E.matches)};return E.addEventListener(y,s),()=>{E.removeEventListener(y,s)}},[n]),{isDarkMode:e,setIsDarkMode:n}},V=(t,e)=>{const[n,s]=o.useState(t);return o.useEffect(()=>{if(!Number.isInteger(e)||e<0)console.error("Delay must be a positive integer");else{const u=setTimeout(()=>{s(t)},e);return()=>{clearTimeout(u)}}},[t,e]),n},P=t=>{const[e,n]=o.useState({width:0,height:0});return o.useLayoutEffect(()=>{if(!t.current)return;const s=t.current;n({width:t.current.offsetWidth,height:t.current.offsetHeight});const u=new ResizeObserver(r=>{for(const i of r)i.contentBoxSize&&n({width:i.target.offsetWidth,height:i.target.offsetHeight})});return u.observe(s),()=>{u&&u.unobserve(s)}},[t]),e},$=t=>{const[e,n]=o.useState(),[s,u]=o.useState(!1),[r,i]=o.useState(null);return{load:o.useCallback(async(f,c={})=>{i(null),u(!0);try{const d=await fetch(f,c);if(!d.ok)throw new Error("Network response to fetch() was unsuccessful."+d.statusText);const m=await d.json();n(t?t(m):m),u(!1)}catch(d){d instanceof Error?i(`Load operation could not be completed: ${d.message}`):i("An unknown error occurred."),u(!1)}},[u,n,i,t]),data:e,loading:s,error:r}},z=()=>{const[t,e]=o.useState({latitude:null,longitude:null,error:null}),n=o.useCallback(()=>{"geolocation"in navigator?navigator.geolocation.getCurrentPosition(s=>{e({latitude:s.coords.latitude,longitude:s.coords.longitude,error:null})},s=>{e(u=>({...u,error:s.message}))}):e(s=>({...s,error:"Geolocation is not available in this browser."}))},[]);return o.useEffect(()=>{n()},[n]),{location:t,getLocation:n}},H=(t=!1)=>{const[e,n]=o.useState(!1),s=o.useRef(null),u=o.useCallback(()=>{n(!0)},[n]),r=o.useCallback(()=>{n(!1)},[n]);return o.useLayoutEffect(()=>{const i=s.current;if(!i)return;const l=["mouseenter"],f=["mouseleave"];return t&&(l.push("touchend"),f.push("touchend")),l.forEach(c=>i.addEventListener(c,u)),f.forEach(c=>i.addEventListener(c,r)),()=>{i.removeEventListener("mouseenter",u),i.removeEventListener("mouseleave",r)}},[r,u,t]),{ref:s,hasHover:e}},U=t=>{const[e,n]=o.useState(!1);return o.useEffect(()=>{let s;const u=()=>{s&&clearTimeout(s),s=setTimeout(()=>{n(!0)},t)},r=()=>{e&&n(!1),u()},i=()=>{document.hidden||r()};return document.addEventListener("mousemove",r),document.addEventListener("mousedown",r),document.addEventListener("resize",r),document.addEventListener("keydown",r),document.addEventListener("touchstart",r),document.addEventListener("touchmove",r),document.addEventListener("wheel",r),document.addEventListener("visibilitychange",i),u(),()=>{document.removeEventListener("mousemove",r),document.removeEventListener("mousedown",r),document.removeEventListener("resize",r),document.removeEventListener("keydown",r),document.removeEventListener("touchstart",r),document.removeEventListener("touchmove",r),document.removeEventListener("wheel",r),document.removeEventListener("visibilitychange",r),clearTimeout(s)}},[t,e]),e},W=t=>{const e=o.useRef(null),[n,s]=o.useState(null);return o.useLayoutEffect(()=>{const u=e==null?void 0:e.current;if(!u)throw new Error("useIntersectionObserver ref is not defined");const r=new IntersectionObserver(([i])=>{s(i)},{root:t.root??null,rootMargin:t.rootMargin??"0px",threshold:t.threshold??0});return r.observe(u),()=>{r.unobserve(u)}},[s,t]),{ref:e,entry:n}},F=(t=[])=>{const[e,n]=o.useState([...t]),s=o.useMemo(()=>e[0],[e]),u=o.useMemo(()=>e.slice(1),[e]),r=o.useMemo(()=>e.length,[e]),i=o.useCallback(m=>e[m],[e]),l=o.useCallback(m=>{n(h=>[m,...h])},[n]),f=o.useCallback(m=>{n(h=>[...h,m])},[n]);return{items:e,head:s,tail:u,size:r,itemAt:i,prepend:l,append:f,remove:m=>{n(h=>{const S=[...h];return S.splice(m,1),S})},update:(m,h)=>{n(S=>{const L=[...S];return L[m]=h,L})}}},Q=(t,e)=>{const[n,s]=o.useState(()=>{try{const i=localStorage.getItem(t);if(i!==null)return JSON.parse(i)}catch(i){console.error(`Error parsing stored value for key "${t}": ${i}`)}return e}),u=o.useCallback(i=>{s(i);try{localStorage.setItem(t,JSON.stringify(i))}catch(l){console.error(`Error setting stored value for key "${t}": ${l}`)}},[s,t]),r=o.useCallback(()=>{s(e);try{localStorage.removeItem(t)}catch(i){console.error(`Error deleting stored value for key "${t}": ${i}`)}},[s,t,e]);return{value:n,setStoredValue:u,deleteStoredValue:r}},I="change",Y=t=>{const[e,n]=o.useState(!1);return o.useLayoutEffect(()=>{const s=window.matchMedia(t),u=r=>{n(r.matches)};return n(s.matches),s.addEventListener(I,r=>u(r)),()=>s.removeEventListener(I,u)},[t]),e},T="mousemove",j=()=>{const[t,e]=o.useState({x:0,y:0}),n=o.useCallback(s=>{e({x:s.clientX,y:s.clientY})},[e]);return o.useLayoutEffect(()=>(document.addEventListener(T,n),()=>document.removeEventListener(T,n)),[n]),t},M="online",k="offline",B=()=>{const[t,e]=o.useState(navigator.onLine);return o.useEffect(()=>{const n=()=>e(!0),s=()=>e(!1);return window.addEventListener(M,n),window.addEventListener(k,s),()=>{window.removeEventListener(M,n),window.removeEventListener(k,s)}},[e]),t},w=(t,e)=>{const n=[];for(let s=t;s<=e;s++)n.push(s);return n},G=w(97,122),J=w(65,90),X=w(48,57),K=w(33,47),Z=t=>{let e,n,s;const u=[...t];for(s=u.length-1;s>0;s--)e=Math.floor(Math.random()*(s+1)),n=u[s],u[s]=u[e],u[e]=n;return u},q=t=>{const[e,n]=o.useState(""),[s,u]=o.useState((t==null?void 0:t.length)??12),[r,i]=o.useState(!!(t!=null&&t.symbols)),[l,f]=o.useState(!!(t!=null&&t.numbers)),[c,d]=o.useState(!!(t!=null&&t.uppercase)),m=o.useMemo(()=>{const S=[[...G]];return c&&S.push([...J]),l&&S.push([...X]),r&&S.push([...K]),S},[l,r,c]),h=o.useCallback(()=>{const S=[];for(let v=0;v<s;v++){const p=m[v%m.length],ie=Math.floor(Math.random()*p.length);S.push(p[ie])}return Z(S).map(v=>String.fromCharCode(v)).join("")},[s,m]);return o.useEffect(()=>{n(h())},[r,l,c,s,h]),{value:e,length:s,setLength:u,symbols:r,includeSymbols:i,numbers:l,includeNumbers:f,uppercase:c,includeUppercase:d}},x=()=>{const[t,e]=o.useState({x:window.scrollX,y:window.scrollY}),n=o.useCallback(()=>{e({x:window.scrollX,y:window.scrollY})},[e]);return o.useLayoutEffect(()=>(window.addEventListener("scroll",n),()=>window.removeEventListener("scroll",n)),[n]),t},ee=(t,e)=>{const[n,s]=o.useState(()=>{try{const i=sessionStorage.getItem(t);return i?JSON.parse(i):e}catch(i){return console.error(`Error reading session storage key "${t}":`,i),e}}),u=o.useCallback(i=>{try{const l=i instanceof Function?i(i):i;s(l),sessionStorage.setItem(t,JSON.stringify(l))}catch(l){console.error(`Error writing session storage key "${t}":`,l)}},[s,t]),r=o.useCallback(()=>{s(void 0);try{sessionStorage.removeItem(t)}catch(i){console.error(`Error deleting session storage key "${t}":`,i)}},[s,t]);return{value:n,setStoredValue:u,deleteStoredValue:r}},g=(t,e)=>t>=0&&t<e,te=(t=[],e=!1)=>{const[n,s]=o.useState([...t]),[u,r]=o.useState(0);return{slides:n,activeSlideIndex:u,addSlide:(c,d)=>{const m=[...n];d!==void 0&&g(d,n.length)?(m.splice(d,0,c),s(m)):(m.push(c),s(m))},removeSlide:c=>{if(g(c,n.length)){const d=n.filter((m,h)=>h!==c);s(d),c===u&&r(Math.max(c,0))}else console.error(`Invalid slide index: ${c}`)},activateSlide:c=>{e?c<0?r(n.length-1):c>=n.length?r(0):r(c):!e&&g(c,n.length)?r(c):console.error(`Invalid slide index: ${c}`)}}},ne=(t=[])=>{const[e,n]=o.useState([...t]),s=o.useCallback(d=>{n(m=>[...m,d])},[n]),u=o.useCallback(()=>{if(e.length===0)return;const d=e.pop();return n([...e]),d},[e,n]),r=o.useCallback(()=>{if(e.length!==0)return e[e.length-1]},[e]),i=o.useCallback(()=>{n([])},[n]),l=o.useCallback(d=>e.includes(d),[e]),f=o.useCallback(()=>[...e],[e]),c=o.useMemo(()=>e.length,[e]);return{items:e,size:c,push:s,pop:u,peek:r,clear:i,contains:l,toArray:f}},b=(t,e)=>t>=0&&t<e,se=()=>{const[t,e]=o.useState([]),[n,s]=o.useState(0);return{tabs:t,activeTab:n,addTab:(l,f)=>{const c=[...t];return f!==void 0&&b(f,t.length)?(c.splice(f,0,l),e(c),f):(c.push(l),e(c),t.length-1)},removeTab:l=>{if(b(l,t.length))e(f=>f.filter((c,d)=>d!==l)),s(Math.max(0,l-1));else throw new Error(`Invalid tab index: ${l}`)},activateTab:l=>{if(b(l,t.length))s(l);else throw new Error(`Invalid tab index: ${l}`)}}},oe=(t,e=400)=>{const[n,s]=o.useState(t),u=o.useRef(Date.now()),r=o.useRef(null);return o.useEffect(()=>{if(!Number.isInteger(e)||e<0)throw new Error("Throttle interval must be a positive integer");const i=Date.now(),l=i-u.current;return l>e?(s(t),u.current=i):(r.current&&window.clearTimeout(r.current),r.current=window.setTimeout(()=>{s(t),u.current=Date.now()},e-l)),()=>{r.current&&window.clearTimeout(r.current)}},[t,e]),n},re=()=>{const[t,e]=o.useState([]),[n,s]=o.useState([]),u=o.useCallback((c,d)=>{if(c.length===0)throw new Error("The source stack contains no actions to swap");const m=[...c],h=[...d];return h.push(m.pop()),[m,h]},[]);return{actions:t,redo:()=>{try{const[c,d]=u(n,t);s(c),e(d)}catch(c){throw new Error(`Could not redo an action. ${c}`)}},undo:()=>{try{const[c,d]=u(t,n);e(c),s(d)}catch(c){throw new Error(`Could not undo an action. ${c}`)}},takeAction:c=>{c==null&&console.error("Cannot take an undefined or null action"),e([...t,c]),s([])},clearActions:()=>{e([]),s([])}}},A="resize",O="change",ue=()=>{const[t,e]=o.useState({width:window.innerWidth,height:window.innerHeight}),n=o.useCallback(()=>{e({width:window.innerWidth,height:window.innerHeight})},[e]);return o.useLayoutEffect(()=>(window.addEventListener(A,n),screen.orientation.addEventListener(O,n),()=>{window.removeEventListener(A,n),screen.orientation.removeEventListener(O,n)}),[n]),t};a.useAsyn=R,a.useCustomCSSProp=N,a.useDarkMode=D,a.useDebounce=V,a.useElementSize=P,a.useFetch=$,a.useGeolocation=z,a.useHover=H,a.useIdleTimeout=U,a.useIntersectionObserver=W,a.useList=F,a.useLocalStorage=Q,a.useMediaQuery=Y,a.useMousePosition=j,a.useOnlineStatus=B,a.useRandomString=q,a.useScrollPosition=x,a.useSessionStorage=ee,a.useSlideshow=te,a.useStack=ne,a.useTabs=se,a.useThrottle=oe,a.useUndoRedo=re,a.useWindowSize=ue,Object.defineProperty(a,Symbol.toStringTag,{value:"Module"})});
