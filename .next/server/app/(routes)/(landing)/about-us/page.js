(()=>{var e={};e.id=421,e.ids=[421],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},39491:e=>{"use strict";e.exports=require("assert")},50852:e=>{"use strict";e.exports=require("async_hooks")},14300:e=>{"use strict";e.exports=require("buffer")},96206:e=>{"use strict";e.exports=require("console")},6113:e=>{"use strict";e.exports=require("crypto")},67643:e=>{"use strict";e.exports=require("diagnostics_channel")},82361:e=>{"use strict";e.exports=require("events")},13685:e=>{"use strict";e.exports=require("http")},85158:e=>{"use strict";e.exports=require("http2")},41808:e=>{"use strict";e.exports=require("net")},15673:e=>{"use strict";e.exports=require("node:events")},84492:e=>{"use strict";e.exports=require("node:stream")},47261:e=>{"use strict";e.exports=require("node:util")},71017:e=>{"use strict";e.exports=require("path")},4074:e=>{"use strict";e.exports=require("perf_hooks")},63477:e=>{"use strict";e.exports=require("querystring")},12781:e=>{"use strict";e.exports=require("stream")},35356:e=>{"use strict";e.exports=require("stream/web")},71576:e=>{"use strict";e.exports=require("string_decoder")},24404:e=>{"use strict";e.exports=require("tls")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},29830:e=>{"use strict";e.exports=require("util/types")},71267:e=>{"use strict";e.exports=require("worker_threads")},59796:e=>{"use strict";e.exports=require("zlib")},16192:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>n.a,__next_app__:()=>x,originalPathname:()=>d,pages:()=>c,routeModule:()=>p,tree:()=>u});var r=s(50482),i=s(69108),a=s(62563),n=s.n(a),o=s(68300),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);s.d(t,l);let u=["",{children:["(routes)",{children:["(landing)",{children:["about-us",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,40471)),"D:\\saga_next\\next-saga-scholarships-mainsite\\src\\app\\(routes)\\(landing)\\about-us\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,43185)),"D:\\saga_next\\next-saga-scholarships-mainsite\\src\\app\\(routes)\\(landing)\\layout.tsx"]}]},{"not-found":[()=>Promise.resolve().then(s.t.bind(s,69361,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(s.bind(s,21342)),"D:\\saga_next\\next-saga-scholarships-mainsite\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,69361,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["D:\\saga_next\\next-saga-scholarships-mainsite\\src\\app\\(routes)\\(landing)\\about-us\\page.tsx"],d="/(routes)/(landing)/about-us/page",x={require:s,loadChunk:()=>Promise.resolve()},p=new r.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/(routes)/(landing)/about-us/page",pathname:"/about-us",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:u}})},14902:(e,t,s)=>{Promise.resolve().then(s.bind(s,6246))},6246:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>p});var r=s(95344),i=s(16715),a=s(89410),n=s(3729),o=s(64132),l=s(76041),u=s(12474),c=s(67351);let d=(0,l.ZF)(o.Z);(0,u.v0)();let x=(0,c.N8)(d),p=()=>{let[e,t]=(0,n.useState)({d_title:"",d_imageUrl:"",d_text:""});return(0,n.useEffect)(()=>{let s=(0,c.iH)(x,"adminData/OYb1VwaGzAdADogvJkvz3GZ6l0g1"),r=(0,c.jM)(s,s=>{let r=s.val();r&&t({...e,d_title:r.aboutus.d_title,d_imageUrl:r.aboutus.d_imageUrl,d_text:r.aboutus.d_text})});return()=>{r()}},[]),r.jsx("div",{className:"w-full",children:r.jsx(i.Z,{children:(0,r.jsxs)("div",{className:"md:px-40 flex flex-col w-full items-start",children:[r.jsx("div",{className:"flex items-center w-full justify-center mt-12",children:r.jsx("h1",{className:"text-[#131E42] font-medium 2xl:font-semibold text-3xl xl:text-6xl 2xl:text-4xl md:-mt-0 text-center",children:e.d_title})}),r.jsx("div",{className:"relative w-full h-[38rem] md:h-[45rem] overflow-hidden group rounded-3xl mt-12",children:e?.d_imageUrl&&r.jsx(a.default,{fill:!0,quality:100,className:" object-cover object-center group-hover:scale-110 ease-in-out duration-500 rounded-3xl",src:e?.d_imageUrl,alt:"About image"})}),(0,r.jsxs)("div",{className:"flex flex-col items-center w-full justify-center mt-20",children:[r.jsx("h1",{className:"text-[#131E42] font-medium 2xl:font-semibold text-3xl xl:text-6xl 2xl:text-4xl md:-mt-0 text-center",children:"About Us"}),r.jsx("p",{className:"text-lg text-black text-center w-full md:w-[85%] mt-4",children:e?.d_text})]})]})})})}},40471:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>a,__esModule:()=>i,default:()=>n});let r=(0,s(86843).createProxy)(String.raw`D:\saga_next\next-saga-scholarships-mainsite\src\app\(routes)\(landing)\about-us\page.tsx`),{__esModule:i,$$typeof:a}=r,n=r.default}};var t=require("../../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[638,753,226,887,859],()=>s(16192));module.exports=r})();