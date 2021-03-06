import {
  useLoaderData
} from "/build/_shared/chunk-HLVULG6X.js";
import {
  React,
  init_react
} from "/build/_shared/chunk-E7VMOUYL.js";

// browser-route-module:/media/zegveld/9EA0FA39A0FA180B1/PROJECT FULLSTACK/remix-js/blog-tutorial/app/routes/posts/$slug.tsx?browser
init_react();

// app/routes/posts/$slug.tsx
init_react();
function PostSlug() {
  let post = useLoaderData();
  return /* @__PURE__ */ React.createElement("div", {
    dangerouslySetInnerHTML: { __html: post.html }
  });
}
export {
  PostSlug as default
};
//# sourceMappingURL=/build/routes/posts/$slug-BEQIUTND.js.map
