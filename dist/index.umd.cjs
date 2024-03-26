(function(f,o){typeof exports=="object"&&typeof module<"u"?o(exports,require("react")):typeof define=="function"&&define.amd?define(["exports","react"],o):(f=typeof globalThis<"u"?globalThis:f||self,o(f.index={},f.React))})(this,function(f,o){"use strict";const R=(t,e=!0)=>{const[s,n]=o.useState({data:null,loading:!1,error:null}),r=o.useMemo(()=>async()=>{n({data:null,loading:!0,error:null});try{const a=await t();n({data:a,loading:!1,error:null})}catch(a){n({data:null,loading:!1,error:a})}},[t,n]);return o.useEffect(()=>{e&&r()},[e,r]),{...s,run:r}},p=()=>{const[t,e]=o.useState({level:1,charging:!1});return o.useEffect(()=>{if(!navigator.getBattery){console.error("Battery status API is not supported");return}const s=()=>{navigator.getBattery().then(n=>{e({level:n.level,charging:n.charging})}).catch(n=>{if(n instanceof Error){console.error("Failed to get battery status:",n.message);return}else console.error("Failed to get battery status:",n)})};return s(),navigator.getBattery().then(n=>{n.addEventListener("levelchange",s),n.addEventListener("chargingchange",s)}),()=>{navigator.getBattery().then(n=>{n.removeEventListener("levelchange",s),n.removeEventListener("chargingchange",s)})}},[]),t},H=()=>{const[t,e]=o.useState(null),s=o.useCallback(r=>{navigator.clipboard.writeText(r).then(()=>e(r)).catch(a=>console.error("Failed to copy:",a))},[e]),n=o.useCallback(()=>{e(null)},[e]);return{value:t,copy:s,clear:n}};function L(t,e){try{return getComputedStyle(e).getPropertyValue(t)}catch(s){return console.error("Could not get property value",s),""}}const $=(t,e)=>{const[s,n]=o.useState((e==null?void 0:e.current)??document.documentElement),[r,a]=o.useState(()=>L(t,s));return o.useEffect(()=>{e&&n((e==null?void 0:e.current)??document.documentElement)},[e]),o.useEffect(()=>{if(typeof t!="string"||!t.startsWith("--"))console.error('Invalid property name. Property name must be a string and start with "--"');else{const u=new MutationObserver(()=>{const i=L(t,s);i!==r&&a(i)});return u.observe(s,{attributes:!0,attributeFilter:["style","class","id"]}),()=>u.disconnect()}},[t,r,s]),r},V="dark-mode",I="change",v=window.matchMedia("(prefers-color-scheme: dark)"),z=t=>{const[e,s]=o.useState(t??v.matches);return o.useEffect(()=>{document.documentElement.classList.toggle(V,e)},[e]),o.useEffect(()=>{const n=()=>{s(!!v.matches)};return v.addEventListener(I,n),()=>{v.removeEventListener(I,n)}},[s]),{isDarkMode:e,setIsDarkMode:s}},B=(t,e)=>{const[s,n]=o.useState(t);return o.useEffect(()=>{if(!Number.isInteger(e)||e<0)console.error("Delay must be a positive integer");else{const r=setTimeout(()=>{n(t)},e);return()=>clearTimeout(r)}},[t,e]),s},U=()=>{const[t,e]=o.useState({alpha:null,beta:null,gamma:null});return o.useEffect(()=>{const s=n=>{e({alpha:n.alpha,beta:n.beta,gamma:n.gamma})};return window.addEventListener("deviceorientation",s,!0),()=>{window.removeEventListener("deviceorientation",s,!0)}},[]),t},W=t=>{const[e,s]=o.useState({width:0,height:0});return o.useLayoutEffect(()=>{if(!t.current)return;const n=t.current;s({width:t.current.offsetWidth,height:t.current.offsetHeight});const r=new ResizeObserver(a=>{for(const u of a)u.contentBoxSize&&s({width:u.target.offsetWidth,height:u.target.offsetHeight})});return r.observe(n),()=>{r&&r.unobserve(n)}},[t]),e},F=t=>{const[e,s]=o.useState(),[n,r]=o.useState(!1),[a,u]=o.useState(null);return{load:o.useCallback(async(h,c={})=>{u(null),r(!0);try{const l=await fetch(h,c);if(!l.ok)throw new Error("Network response to fetch() was unsuccessful."+l.statusText);const d=await l.json();s(t?t(d):d),r(!1)}catch(l){l instanceof Error?u(`Load operation could not be completed: ${l.message}`):u("An unknown error occurred."),r(!1)}},[r,s,u,t]),data:e,loading:n,error:a}},Q=()=>{const[t,e]=o.useState({latitude:null,longitude:null,error:null}),s=o.useCallback(()=>{"geolocation"in navigator?navigator.geolocation.getCurrentPosition(n=>{e({latitude:n.coords.latitude,longitude:n.coords.longitude,error:null})},n=>{e(r=>({...r,error:n.message}))}):e(n=>({...n,error:"Geolocation is not available in this browser."}))},[e]);return o.useEffect(()=>{s()},[s]),{location:t,getLocation:s}},Y=(t=!1)=>{const[e,s]=o.useState(!1),n=o.useRef(null),r=o.useCallback(()=>{s(!0)},[s]),a=o.useCallback(()=>{s(!1)},[s]),u=o.useMemo(()=>{const i=["mouseenter"],h=["mouseleave"];return t&&(i.push("touchstart"),h.push("touchend")),{activeEvents:i,inactiveEvents:h}},[t]);return o.useLayoutEffect(()=>{const i=n==null?void 0:n.current;if(!i)return;const{activeEvents:h,inactiveEvents:c}=u;return h.forEach(l=>i.addEventListener(l,r)),c.forEach(l=>i.addEventListener(l,a)),()=>{h.forEach(l=>i.removeEventListener(l,r)),c.forEach(l=>i.removeEventListener(l,a))}},[u,r,a,n]),{ref:n,hasHover:e}},y=["mousemove","mousedown","resize","keydown","touchstart","touchmove","wheel"],T="visibilitychange",j=t=>{const[e,s]=o.useState(!1);return o.useEffect(()=>{let n;const r=()=>{n&&clearTimeout(n),n=setTimeout(()=>{s(!0)},t)},a=()=>{e&&s(!1),r()},u=()=>{document.hidden||a()};return y.forEach(i=>document.addEventListener(i,a)),document.addEventListener(T,u),r(),()=>{y.forEach(i=>document.removeEventListener(i,a)),document.removeEventListener(T,u),clearTimeout(n)}},[t,e]),e},G=t=>{const e=o.useRef(null),[s,n]=o.useState(null);return o.useLayoutEffect(()=>{const r=e==null?void 0:e.current;if(!r)throw new Error("useIntersectionObserver ref is not defined");const a=new IntersectionObserver(([u])=>{n(u)},{root:t.root??null,rootMargin:t.rootMargin??"0px",threshold:t.threshold??0});return a.observe(r),()=>{a.unobserve(r)}},[n,t]),{ref:e,entry:s}},J=(t=[])=>{const[e,s]=o.useState([...t]),n=o.useMemo(()=>e[0],[e]),r=o.useMemo(()=>e.slice(1),[e]),a=o.useMemo(()=>e.length,[e]),u=o.useCallback(d=>e[d],[e]),i=o.useCallback(d=>{s(m=>[d,...m])},[s]),h=o.useCallback(d=>{s(m=>[...m,d])},[s]);return{items:e,head:n,tail:r,size:a,itemAt:u,prepend:i,append:h,remove:d=>{s(m=>{const g=[...m];return g.splice(d,1),g})},update:(d,m)=>{s(g=>{const E=[...g];return E[d]=m,E})}}},X=(t,e)=>{const[s,n]=o.useState(()=>{try{const u=localStorage.getItem(t);if(u!==null)return JSON.parse(u)}catch(u){console.error(`Error parsing stored value for key "${t}": ${u}`)}return e}),r=o.useCallback(u=>{n(u);try{localStorage.setItem(t,JSON.stringify(u))}catch(i){console.error(`Error setting stored value for key "${t}": ${i}`)}},[n,t]),a=o.useCallback(()=>{n(e);try{localStorage.removeItem(t)}catch(u){console.error(`Error deleting stored value for key "${t}": ${u}`)}},[n,t,e]);return{value:s,setStoredValue:r,deleteStoredValue:a}},M="change",K=t=>{const[e,s]=o.useState(!1);return o.useLayoutEffect(()=>{const n=window.matchMedia(t),r=a=>{s(a.matches)};return s(n.matches),n.addEventListener(M,a=>r(a)),()=>n.removeEventListener(M,r)},[t]),e},k="mousemove",Z=()=>{const[t,e]=o.useState({x:0,y:0}),s=o.useCallback(n=>{e({x:n.clientX,y:n.clientY})},[e]);return o.useLayoutEffect(()=>(document.addEventListener(k,s),()=>document.removeEventListener(k,s)),[s]),t},P="online",A="offline",q=()=>{const[t,e]=o.useState(navigator.onLine);return o.useEffect(()=>{const s=()=>e(!0),n=()=>e(!1);return window.addEventListener(P,s),window.addEventListener(A,n),()=>{window.removeEventListener(P,s),window.removeEventListener(A,n)}},[e]),t},x={initialPage:1,initialItemsPerPage:10},ee=(t,e=x)=>{const{initialPage:s,initialItemsPerPage:n}=e,[r,a]=o.useState(s||1),[u,i]=o.useState(n||10),h=o.useMemo(()=>Math.ceil(t/u),[t,u]),c=o.useCallback(d=>{d>0&&d<=h?a(d):a(t===0?1:Math.min(h,Math.max(1,d)))},[h,t,a]),l=o.useCallback(d=>{d>0&&i(d)},[i]);return{currentPage:r,itemsPerPage:u,setPage:c,setItemsPerPage:l}},w=(t,e)=>{const s=[];for(let n=t;n<=e;n++)s.push(n);return s},te=w(97,122),ne=w(65,90),se=w(48,57),oe=w(33,47),re=t=>{let e,s,n;const r=[...t];for(n=r.length-1;n>0;n--)e=Math.floor(Math.random()*(n+1)),s=r[n],r[n]=r[e],r[e]=s;return r},ue=t=>{const[e,s]=o.useState(""),[n,r]=o.useState((t==null?void 0:t.length)??12),[a,u]=o.useState(!!(t!=null&&t.symbols)),[i,h]=o.useState(!!(t!=null&&t.numbers)),[c,l]=o.useState(!!(t!=null&&t.uppercase)),d=o.useMemo(()=>{const g=[[...te]];return c&&g.push([...ne]),i&&g.push([...se]),a&&g.push([...oe]),g},[i,a,c]),m=o.useCallback(()=>{const g=[];for(let S=0;S<n;S++){const _=d[S%d.length],Se=Math.floor(Math.random()*_.length);g.push(_[Se])}return re(g).map(S=>String.fromCharCode(S)).join("")},[n,d]);return o.useEffect(()=>{s(m())},[a,i,c,n,m]),{value:e,length:n,setLength:r,symbols:a,includeSymbols:u,numbers:i,includeNumbers:h,uppercase:c,includeUppercase:l}},O="scroll",ae=()=>{const[t,e]=o.useState({x:window.scrollX,y:window.scrollY}),s=o.useCallback(()=>{e({x:window.scrollX,y:window.scrollY})},[e]);return o.useLayoutEffect(()=>(window.addEventListener(O,s),()=>window.removeEventListener(O,s)),[s]),t},ie=(t,e)=>{const[s,n]=o.useState(()=>{try{const u=sessionStorage.getItem(t);return u?JSON.parse(u):e}catch(u){return console.error(`Error reading session storage key "${t}":`,u),e}}),r=o.useCallback(u=>{try{const i=u instanceof Function?u(u):u;n(i),sessionStorage.setItem(t,JSON.stringify(i))}catch(i){console.error(`Error writing session storage key "${t}":`,i)}},[n,t]),a=o.useCallback(()=>{n(void 0);try{sessionStorage.removeItem(t)}catch(u){console.error(`Error deleting session storage key "${t}":`,u)}},[n,t]);return{value:s,setStoredValue:r,deleteStoredValue:a}},b=(t,e)=>t>=0&&t<e,ce=(t=[],e=!1)=>{const[s,n]=o.useState([...t]),[r,a]=o.useState(0);return{slides:s,activeSlideIndex:r,addSlide:(c,l)=>{const d=[...s];l!==void 0&&b(l,s.length)?(d.splice(l,0,c),n(d)):(d.push(c),n(d))},removeSlide:c=>{if(b(c,s.length)){const l=s.filter((d,m)=>m!==c);n(l),c===r&&a(Math.max(c,0))}else console.error(`Invalid slide index: ${c}`)},activateSlide:c=>{e?c<0?a(s.length-1):c>=s.length?a(0):a(c):!e&&b(c,s.length)?a(c):console.error(`Invalid slide index: ${c}`)}}},le=(t=[])=>{const[e,s]=o.useState([...t]),n=o.useCallback(l=>{s(d=>[...d,l])},[s]),r=o.useCallback(()=>{if(e.length===0)return;const l=e.pop();return s([...e]),l},[e,s]),a=o.useCallback(()=>{if(e.length!==0)return e[e.length-1]},[e]),u=o.useCallback(()=>{s([])},[s]),i=o.useCallback(l=>e.includes(l),[e]),h=o.useCallback(()=>[...e],[e]),c=o.useMemo(()=>e.length,[e]);return{items:e,size:c,push:n,pop:r,peek:a,clear:u,contains:i,toArray:h}},C=(t,e)=>t>=0&&t<e,de=()=>{const[t,e]=o.useState([]),[s,n]=o.useState(0);return{tabs:t,activeTab:s,addTab:(i,h)=>{const c=[...t];return h!==void 0&&C(h,t.length)?(c.splice(h,0,i),e(c),h):(c.push(i),e(c),t.length-1)},removeTab:i=>{if(C(i,t.length))e(h=>h.filter((c,l)=>l!==i)),n(Math.max(0,i-1));else throw new Error(`Invalid tab index: ${i}`)},activateTab:i=>{if(C(i,t.length))n(i);else throw new Error(`Invalid tab index: ${i}`)}}},fe=(t,e=400)=>{const[s,n]=o.useState(t),r=o.useRef(Date.now()),a=o.useRef(null);return o.useEffect(()=>{if(!Number.isInteger(e)||e<0)throw new Error("Throttle interval must be a positive integer");const u=Date.now(),i=u-r.current;return i>e?(n(t),r.current=u):(a.current&&window.clearTimeout(a.current),a.current=window.setTimeout(()=>{n(t),r.current=Date.now()},e-i)),()=>{a.current&&window.clearTimeout(a.current)}},[t,e]),s},he=(t,e,s,n=!1)=>{if(t<0||e<0||s<0)throw new Error("Initial value, maximum value, and interval must be non-negative");const[r,a]=o.useState(t),[u,i]=o.useState(-1),[h,c]=o.useState(!1);o.useEffect(()=>()=>clearInterval(u),[u]);const l=o.useCallback(()=>{clearInterval(u),i(-1),c(!1)},[u,i]),d=o.useCallback(()=>{a(S=>S>=e?n?t:S:S+1)},[e,n,a,t]),m=o.useCallback(()=>{clearInterval(u);const S=window.setInterval(()=>d(),s);i(S),c(!0)},[u,i,d,s,c]),g=o.useCallback(S=>{if(S<0||S>e)throw new Error(`Index out of range: ${S}`);clearInterval(u),a(S),h&&m()},[u,a,e,h,m]),E=o.useCallback(()=>{g(t)},[g,t]);return{index:r,pause:l,play:m,reset:E,goToIndex:g,running:h}},me=()=>{const[t,e]=o.useState([]),[s,n]=o.useState([]),r=o.useCallback((c,l)=>{if(c.length===0)throw new Error("The source stack contains no actions to swap");const d=[...c],m=[...l];return m.push(d.pop()),[d,m]},[]);return{actions:t,redo:()=>{try{const[c,l]=r(s,t);n(c),e(l)}catch(c){throw new Error(`Could not redo an action. ${c}`)}},undo:()=>{try{const[c,l]=r(t,s);e(c),n(l)}catch(c){throw new Error(`Could not undo an action. ${c}`)}},takeAction:c=>{c==null&&console.error("Cannot take an undefined or null action"),e([...t,c]),n([])},clearActions:()=>{e([]),n([])}}},N="resize",D="change",ge=()=>{const[t,e]=o.useState({width:window.innerWidth,height:window.innerHeight}),s=o.useCallback(()=>{e({width:window.innerWidth,height:window.innerHeight})},[e]);return o.useLayoutEffect(()=>(window.addEventListener(N,s),screen.orientation.addEventListener(D,s),()=>{window.removeEventListener(N,s),screen.orientation.removeEventListener(D,s)}),[s]),t};f.useAsyn=R,f.useBatteryStatus=p,f.useClipboard=H,f.useCustomCSSProp=$,f.useDarkMode=z,f.useDebounce=B,f.useDeviceOrientation=U,f.useElementSize=W,f.useFetch=F,f.useGeolocation=Q,f.useHover=Y,f.useIdleTimeout=j,f.useIntersectionObserver=G,f.useList=J,f.useLocalStorage=X,f.useMediaQuery=K,f.useMousePosition=Z,f.useOnlineStatus=q,f.usePagination=ee,f.useRandomString=ue,f.useScrollPosition=ae,f.useSessionStorage=ie,f.useSlideshow=ce,f.useStack=le,f.useTabs=de,f.useThrottle=fe,f.useTimedCounter=he,f.useUndoRedo=me,f.useWindowSize=ge,Object.defineProperty(f,Symbol.toStringTag,{value:"Module"})});
