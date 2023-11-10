var h=Object.defineProperty;var d=(r,e,t)=>e in r?h(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var c=(r,e,t)=>(d(r,typeof e!="symbol"?e+"":e,t),t);import{aY as f,bB as w}from"./vendor-10e6c6ad.js";class o{parse(e){return JSON.parse(e)}}class x{constructor(e){c(this,"endpoint");this.endpoint=e}async getAdditionalGraphData(e,t,s){const a=await fetch(`${this.endpoint}/projects/${e}/${t}/graphs_data/${s}`);if(a.ok)return new o().parse(await a.text());throw Error(`${a.status}, ${a.statusText}`)}async getAdditionalWidgetData(e,t,s){const a=await fetch(`${this.endpoint}/projects/${e}/${t}/graphs_data/${s}`);if(a.ok)return new o().parse(await a.text());throw Error(`${a.status}, ${a.statusText}`)}async getDashboard(e,t){const s=await fetch(`${this.endpoint}/projects/${e}/${t}/data`);if(s.ok)return new o().parse(await s.text());throw Error(`${s.status}, ${s.statusText}`)}async getProjects(){const e=await fetch(`${this.endpoint}/projects`);if(e.ok){let t=new o().parse(await e.text());return console.log(t),t}throw Error(`${e.status}, ${e.statusText}`)}async getProjectDashboard(e,t,s,a){const i=new URLSearchParams;t&&i.append("timestamp_start",t),s&&i.append("timestamp_end",s);const n=await fetch(`${this.endpoint}/projects/${e}/dashboard?${i.toString()}`,{signal:a});if(n.ok)return new o().parse(await n.text());throw Error(`${n.status}, ${n.statusText}`)}async getReports(e){const t=await fetch(`${this.endpoint}/projects/${e}/reports`);if(t.ok)return new o().parse(await t.text());throw Error(`${t.status}, ${t.statusText}`)}async getTestSuites(e){const t=await fetch(`${this.endpoint}/projects/${e}/test_suites`);if(t.ok)return new o().parse(await t.text());throw Error(`${t.status}, ${t.statusText}`)}async getProjectInfo(e){const t=await fetch(`${this.endpoint}/projects/${e}/info`);if(t.ok)return new o().parse(await t.text());throw Error(`${t.status}, ${t.statusText}`)}async getVersion(){const e=await fetch(`${this.endpoint}/version`);if(e.ok)return await e.json();throw Error(`${e.status}, ${e.statusText}`)}async editProjectInfo(e){const t=await fetch(`${this.endpoint}/projects/${e.id}/info`,{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!t.ok)throw t;return t}async reloadProject(e){const t=await fetch(`${this.endpoint}/projects/${e}/reload`);if(!t.ok)throw t;return t}}const y=new x("/api");var $={exports:{}};(function(r){function e(t){return t&&t.__esModule?t:{default:t}}r.exports=e,r.exports.__esModule=!0,r.exports.default=r.exports})($);var _=$.exports,p={};const g=f(w);var u;function k(){return u||(u=1,function(r){"use client";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return e.createSvgIcon}});var e=g}(p)),p}export{y as a,_ as i,k as r};
