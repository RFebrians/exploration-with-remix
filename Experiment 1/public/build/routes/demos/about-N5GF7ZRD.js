import {
  import_react_router_dom
} from "/build/_shared/chunk-HLVULG6X.js";
import {
  React,
  init_react
} from "/build/_shared/chunk-E7VMOUYL.js";

// browser-route-module:/media/zegveld/9EA0FA39A0FA180B/PROJECT FULLSTACK/remix-js/blog-tutorial/app/routes/demos/about.tsx?browser
init_react();

// app/routes/demos/about.tsx
init_react();

// app/styles/demos/about.css
var about_default = "/build/_assets/about-ZVPMWXPU.css";

// app/routes/demos/about.tsx
var meta = () => {
  return {
    title: "About Remix"
  };
};
var links = () => {
  return [{ rel: "stylesheet", href: about_default }];
};
function Index() {
  return /* @__PURE__ */ React.createElement("div", {
    className: "about"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "about__intro"
  }, /* @__PURE__ */ React.createElement("h2", null, "About Us"), /* @__PURE__ */ React.createElement("p", null, "Ok, so this page isn't really ", /* @__PURE__ */ React.createElement("em", null, "about us"), ", but we did want to show you a few more things Remix can do."), /* @__PURE__ */ React.createElement("p", null, "Did you notice that things look a little different on this page? The CSS that we import in the route file and include in its", " ", /* @__PURE__ */ React.createElement("code", null, "links"), " export is only included on this route and its children."), /* @__PURE__ */ React.createElement("p", null, "Wait a sec...", /* @__PURE__ */ React.createElement("em", null, "its children"), "? To understand what we mean by this,", " ", /* @__PURE__ */ React.createElement("a", {
    href: "https://docs.remix.run/v0.21/tutorial/4-nested-routes-params/"
  }, "read all about nested routes in the docs"), "."), /* @__PURE__ */ React.createElement("hr", null), /* @__PURE__ */ React.createElement(import_react_router_dom.Outlet, null)));
}
export {
  Index as default,
  links,
  meta
};
//# sourceMappingURL=/build/routes/demos/about-N5GF7ZRD.js.map
