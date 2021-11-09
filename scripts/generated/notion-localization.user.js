// ==UserScript==
// @name         Notion Localization
// @version      2
// @description  Enable Notion's native localization for more languages
// @author       kidonng
// @namespace    https://github.com/kidonng/cherry
// @match        https://www.notion.so/*
// @run-at       document-start
// ==/UserScript==
(()=>{var a=t=>{if(t==null)return new DocumentFragment;let e=document.createElement("template");return e.innerHTML=t,e.content};a.one=t=>{var e;return(e=a(t).firstElementChild)!==null&&e!==void 0?e:void 0};var l=a;(async()=>{let t=localStorage.getItem("ajs_user_traits");if(!t)return;let{app_version:e}=JSON.parse(t),{language:o}=navigator,s=`messages-${e}-${o}`,r=localStorage.getItem(s);if(!r)try{let c=await fetch("/api/v3/getAssetsJsonV2",{method:"POST",headers:{"content-type":"application/json","notion-client-version":e},body:JSON.stringify({hash:""})}),{localeHtml:i}=await c.json();if(!(o in i))return;let m=i[o],d=await(await fetch(m)).text(),u=l(d),{textContent:p}=u.querySelector("#messages");localStorage.setItem(s,p),alert(navigator.language==="zh-CN"?`Notion ${e} \u7248\u672C\u4E2D\u6587\u8D44\u6E90\u5DF2\u4E0B\u8F7D\uFF0C\u70B9\u51FB\u786E\u5B9A\u5373\u53EF\u4EAB\u53D7 \u2728`:`${o} resources for Notion ${e} version has been downloaded, press OK to enjoy \u2728`),location.pathname="/"}catch(c){}finally{return}let n=document.createElement("script");n.id="messages",n.type="application/json",n.dataset.locale="en-US",n.innerHTML=r,document.documentElement.prepend(n)})();})();
