import{b as i,f as o,g as e}from"/build/_shared/chunk-RNY7KZFM.js";import{e as t,f as r}from"/build/_shared/chunk-AKSB5QXU.js";r();r();function n(){let a=e();return t.createElement("div",null,t.createElement(i,{to:"new"},"New feed"),t.createElement("table",null,t.createElement("thead",null,t.createElement("th",null,"ID"),t.createElement("th",null,"Title"),t.createElement("th",null,"Description")),t.createElement("tbody",null,a.map(d=>t.createElement("tr",null,t.createElement("td",null,d.id),t.createElement("td",null,t.createElement(i,{to:`/feed/${d.id}`},d.title)),t.createElement("td",null,d.description),t.createElement("td",null,t.createElement(o,{method:"post",action:"/feed/star"},t.createElement("input",{type:"hidden",name:"id",value:d.id}),t.createElement("button",null,"star"))))))))}export{n as default};
