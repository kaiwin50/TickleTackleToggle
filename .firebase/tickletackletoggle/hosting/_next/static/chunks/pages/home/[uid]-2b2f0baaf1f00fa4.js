(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[421],{4521:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/home/[uid]",function(){return t(4705)}])},8908:function(e,n,t){"use strict";t.d(n,{z:function(){return s}});var i=t(9228),o=t(1527),r=t(4513);function c(){let e=(0,i.Z)(["\n  position: relative;\n  background-color : goldenrod;\n  padding: 1em;\n  border-radius: .5em;\n  filter: drop-shadow(0 5px #8b6912);\n  border: none;\n  cursor: pointer;\n  &:hover{\n    background-color : #c1972d;\n    top: 2px;\n    filter: drop-shadow(0 3px #8b6912);\n  }\n  \n"]);return c=function(){return e},e}let a=e=>{let{className:n,children:t,onClick:i}=e;return(0,o.jsx)("button",{className:n,onClick:i,children:t})},s=(0,r.ZP)(a).withConfig({componentId:"sc-28badf3f-0"})(c())},1150:function(e,n,t){"use strict";t.d(n,{W:function(){return s}});var i=t(9228),o=t(1527),r=t(4513);function c(){let e=(0,i.Z)(["\n  background-color: ",";;\n  justify-content: center;\n  align-items: center;\n  width: ",";\n  height: ",";\n  padding: 1em;\n  border-radius: 1em;\n  position: relative;\n"]);return c=function(){return e},e}let a=e=>{let{className:n,children:t,props:i}=e;return(0,o.jsx)("div",{className:n,...i,children:t})},s=(0,r.ZP)(a).withConfig({componentId:"sc-408aa81b-0"})(c(),e=>e.color||"#3e2b85",e=>e.width||"fit-content",e=>e.height||"fit-content")},4664:function(e,n,t){"use strict";t.r(n),t.d(n,{db:function(){return a},firebaseConfig:function(){return r}});let{initializeApp:i}=t(1998),{getFirestore:o}=t(5454),r={apiKey:"AIzaSyB_jU3ZQ3ALnbTmCb7j7H837TlJ-fy64oQ",authDomain:"tickletackletoggle.firebaseapp.com",databaseURL:"https://tickletackletoggle-default-rtdb.asia-southeast1.firebasedatabase.app",projectId:"tickletackletoggle",storageBucket:"tickletackletoggle.appspot.com",messagingSenderId:"854577270606",appId:"1:854577270606:web:b6bc3b049173e4c8d1981f",measurementId:"G-8TFRCPFNQK"},c=i(r),a=o(c)},4705:function(e,n,t){"use strict";let i;t.r(n),t.d(n,{default:function(){return g}});var o=t(9228),r=t(1527),c=t(3670),a=t.n(c),s=t(4103),l=t.n(s),u=t(4513),d=t(1150);t(8908);var f=t(959),m=t(1184),_=t(2649);function p(){let e=(0,o.Z)(["\n  ul{\n    list-style-type: none;\n    justify-content: center;\n    align-items: center;\n    width: fit-content;\n    margin: auto;\n  }\n  li {\n    display: inline-flex;\n    margin-left: 1em;\n    margin-right: 1em;\n  }\n"]);return p=function(){return e},e}let h=(0,u.iv)(p());function g(){let e=(0,m.useRouter)(),{uid:n}=e.query,[o,c]=(0,f.useState)([]),[s,u]=(0,f.useState)(""),[p,g]=(0,f.useState)({}),b=p.username,[x,j]=(0,f.useState)(""),{db:k}=t(4664),{collection:w,doc:v,getDoc:y}=t(5454);async function H(){void 0==n&&e.reload;let t=await y(v(w(k,"users"),n));g(t.data())}async function C(){await fetch("../api/socket"),(i=(0,_.io)()).on("receive-message",e=>{c(n=>[...n,e]),console.log(e)})}return(0,f.useEffect)(()=>(H(),C(),()=>{i.disconnect()}),[]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(a(),{children:[(0,r.jsx)("title",{children:"Create Next App"}),(0,r.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,r.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,r.jsx)("link",{rel:"icon",href:"/favicon.ico"}),(0,r.jsx)("style",{children:h})]}),(0,r.jsxs)("main",{className:l().main,children:[(0,r.jsx)(d.W,{width:"80%",children:(0,r.jsx)("h1",{children:p.username})}),(0,r.jsxs)(d.W,{children:[(0,r.jsxs)(d.W,{width:"80%",children:[" ",o.map((e,n)=>{let{username:t,msg:i}=e;return(0,r.jsxs)("div",{children:[t,": ",i]},n)})]}),(0,r.jsx)("form",{onSubmit:function(e){e.preventDefault(),console.log("emitted"),i.emit("send-message",{username:b,msg:s}),u("")},children:(0,r.jsx)("input",{type:"text",onChange:e=>u(e.target.value)})})]})]})]})}},4103:function(e){e.exports={main:"Home_main__nLjiQ",description:"Home_description__41Owk",code:"Home_code__suPER",grid:"Home_grid__GxQ85",card:"Home_card___LpL1",center:"Home_center__4BFgC",logo:"Home_logo__27_tb",thirteen:"Home_thirteen__cMI_k",rotate:"Home_rotate____XsI",content:"Home_content__Zy02X",vercelLogo:"Home_vercelLogo__dtSk9"}}},function(e){e.O(0,[756,995,377,591,774,888,179],function(){return e(e.s=4521)}),_N_E=e.O()}]);