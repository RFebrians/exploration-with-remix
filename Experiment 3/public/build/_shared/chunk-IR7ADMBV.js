import {
  __commonJS,
  __export,
  __toModule,
  init_react
} from "/build/_shared/chunk-6ZD6VHKS.js";

// node_modules/cross-fetch/dist/browser-ponyfill.js
var require_browser_ponyfill = __commonJS({
  "node_modules/cross-fetch/dist/browser-ponyfill.js"(exports, module) {
    init_react();
    var global = typeof self !== "undefined" ? self : exports;
    var __self__ = function() {
      function F() {
        this.fetch = false;
        this.DOMException = global.DOMException;
      }
      F.prototype = global;
      return new F();
    }();
    (function(self2) {
      var irrelevant = function(exports2) {
        var support = {
          searchParams: "URLSearchParams" in self2,
          iterable: "Symbol" in self2 && "iterator" in Symbol,
          blob: "FileReader" in self2 && "Blob" in self2 && function() {
            try {
              new Blob();
              return true;
            } catch (e) {
              return false;
            }
          }(),
          formData: "FormData" in self2,
          arrayBuffer: "ArrayBuffer" in self2
        };
        function isDataView(obj) {
          return obj && DataView.prototype.isPrototypeOf(obj);
        }
        if (support.arrayBuffer) {
          var viewClasses = [
            "[object Int8Array]",
            "[object Uint8Array]",
            "[object Uint8ClampedArray]",
            "[object Int16Array]",
            "[object Uint16Array]",
            "[object Int32Array]",
            "[object Uint32Array]",
            "[object Float32Array]",
            "[object Float64Array]"
          ];
          var isArrayBufferView = ArrayBuffer.isView || function(obj) {
            return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
          };
        }
        function normalizeName(name) {
          if (typeof name !== "string") {
            name = String(name);
          }
          if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
            throw new TypeError("Invalid character in header field name");
          }
          return name.toLowerCase();
        }
        function normalizeValue(value) {
          if (typeof value !== "string") {
            value = String(value);
          }
          return value;
        }
        function iteratorFor(items) {
          var iterator = {
            next: function() {
              var value = items.shift();
              return { done: value === void 0, value };
            }
          };
          if (support.iterable) {
            iterator[Symbol.iterator] = function() {
              return iterator;
            };
          }
          return iterator;
        }
        function Headers(headers) {
          this.map = {};
          if (headers instanceof Headers) {
            headers.forEach(function(value, name) {
              this.append(name, value);
            }, this);
          } else if (Array.isArray(headers)) {
            headers.forEach(function(header) {
              this.append(header[0], header[1]);
            }, this);
          } else if (headers) {
            Object.getOwnPropertyNames(headers).forEach(function(name) {
              this.append(name, headers[name]);
            }, this);
          }
        }
        Headers.prototype.append = function(name, value) {
          name = normalizeName(name);
          value = normalizeValue(value);
          var oldValue = this.map[name];
          this.map[name] = oldValue ? oldValue + ", " + value : value;
        };
        Headers.prototype["delete"] = function(name) {
          delete this.map[normalizeName(name)];
        };
        Headers.prototype.get = function(name) {
          name = normalizeName(name);
          return this.has(name) ? this.map[name] : null;
        };
        Headers.prototype.has = function(name) {
          return this.map.hasOwnProperty(normalizeName(name));
        };
        Headers.prototype.set = function(name, value) {
          this.map[normalizeName(name)] = normalizeValue(value);
        };
        Headers.prototype.forEach = function(callback, thisArg) {
          for (var name in this.map) {
            if (this.map.hasOwnProperty(name)) {
              callback.call(thisArg, this.map[name], name, this);
            }
          }
        };
        Headers.prototype.keys = function() {
          var items = [];
          this.forEach(function(value, name) {
            items.push(name);
          });
          return iteratorFor(items);
        };
        Headers.prototype.values = function() {
          var items = [];
          this.forEach(function(value) {
            items.push(value);
          });
          return iteratorFor(items);
        };
        Headers.prototype.entries = function() {
          var items = [];
          this.forEach(function(value, name) {
            items.push([name, value]);
          });
          return iteratorFor(items);
        };
        if (support.iterable) {
          Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
        }
        function consumed(body) {
          if (body.bodyUsed) {
            return Promise.reject(new TypeError("Already read"));
          }
          body.bodyUsed = true;
        }
        function fileReaderReady(reader) {
          return new Promise(function(resolve, reject) {
            reader.onload = function() {
              resolve(reader.result);
            };
            reader.onerror = function() {
              reject(reader.error);
            };
          });
        }
        function readBlobAsArrayBuffer(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsArrayBuffer(blob);
          return promise;
        }
        function readBlobAsText(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsText(blob);
          return promise;
        }
        function readArrayBufferAsText(buf) {
          var view = new Uint8Array(buf);
          var chars = new Array(view.length);
          for (var i = 0; i < view.length; i++) {
            chars[i] = String.fromCharCode(view[i]);
          }
          return chars.join("");
        }
        function bufferClone(buf) {
          if (buf.slice) {
            return buf.slice(0);
          } else {
            var view = new Uint8Array(buf.byteLength);
            view.set(new Uint8Array(buf));
            return view.buffer;
          }
        }
        function Body() {
          this.bodyUsed = false;
          this._initBody = function(body) {
            this._bodyInit = body;
            if (!body) {
              this._bodyText = "";
            } else if (typeof body === "string") {
              this._bodyText = body;
            } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
              this._bodyBlob = body;
            } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
              this._bodyFormData = body;
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
              this._bodyText = body.toString();
            } else if (support.arrayBuffer && support.blob && isDataView(body)) {
              this._bodyArrayBuffer = bufferClone(body.buffer);
              this._bodyInit = new Blob([this._bodyArrayBuffer]);
            } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
              this._bodyArrayBuffer = bufferClone(body);
            } else {
              this._bodyText = body = Object.prototype.toString.call(body);
            }
            if (!this.headers.get("content-type")) {
              if (typeof body === "string") {
                this.headers.set("content-type", "text/plain;charset=UTF-8");
              } else if (this._bodyBlob && this._bodyBlob.type) {
                this.headers.set("content-type", this._bodyBlob.type);
              } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
              }
            }
          };
          if (support.blob) {
            this.blob = function() {
              var rejected = consumed(this);
              if (rejected) {
                return rejected;
              }
              if (this._bodyBlob) {
                return Promise.resolve(this._bodyBlob);
              } else if (this._bodyArrayBuffer) {
                return Promise.resolve(new Blob([this._bodyArrayBuffer]));
              } else if (this._bodyFormData) {
                throw new Error("could not read FormData body as blob");
              } else {
                return Promise.resolve(new Blob([this._bodyText]));
              }
            };
            this.arrayBuffer = function() {
              if (this._bodyArrayBuffer) {
                return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
              } else {
                return this.blob().then(readBlobAsArrayBuffer);
              }
            };
          }
          this.text = function() {
            var rejected = consumed(this);
            if (rejected) {
              return rejected;
            }
            if (this._bodyBlob) {
              return readBlobAsText(this._bodyBlob);
            } else if (this._bodyArrayBuffer) {
              return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
            } else if (this._bodyFormData) {
              throw new Error("could not read FormData body as text");
            } else {
              return Promise.resolve(this._bodyText);
            }
          };
          if (support.formData) {
            this.formData = function() {
              return this.text().then(decode);
            };
          }
          this.json = function() {
            return this.text().then(JSON.parse);
          };
          return this;
        }
        var methods = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
        function normalizeMethod(method) {
          var upcased = method.toUpperCase();
          return methods.indexOf(upcased) > -1 ? upcased : method;
        }
        function Request(input, options) {
          options = options || {};
          var body = options.body;
          if (input instanceof Request) {
            if (input.bodyUsed) {
              throw new TypeError("Already read");
            }
            this.url = input.url;
            this.credentials = input.credentials;
            if (!options.headers) {
              this.headers = new Headers(input.headers);
            }
            this.method = input.method;
            this.mode = input.mode;
            this.signal = input.signal;
            if (!body && input._bodyInit != null) {
              body = input._bodyInit;
              input.bodyUsed = true;
            }
          } else {
            this.url = String(input);
          }
          this.credentials = options.credentials || this.credentials || "same-origin";
          if (options.headers || !this.headers) {
            this.headers = new Headers(options.headers);
          }
          this.method = normalizeMethod(options.method || this.method || "GET");
          this.mode = options.mode || this.mode || null;
          this.signal = options.signal || this.signal;
          this.referrer = null;
          if ((this.method === "GET" || this.method === "HEAD") && body) {
            throw new TypeError("Body not allowed for GET or HEAD requests");
          }
          this._initBody(body);
        }
        Request.prototype.clone = function() {
          return new Request(this, { body: this._bodyInit });
        };
        function decode(body) {
          var form = new FormData();
          body.trim().split("&").forEach(function(bytes) {
            if (bytes) {
              var split = bytes.split("=");
              var name = split.shift().replace(/\+/g, " ");
              var value = split.join("=").replace(/\+/g, " ");
              form.append(decodeURIComponent(name), decodeURIComponent(value));
            }
          });
          return form;
        }
        function parseHeaders(rawHeaders) {
          var headers = new Headers();
          var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
          preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
            var parts = line.split(":");
            var key = parts.shift().trim();
            if (key) {
              var value = parts.join(":").trim();
              headers.append(key, value);
            }
          });
          return headers;
        }
        Body.call(Request.prototype);
        function Response(bodyInit, options) {
          if (!options) {
            options = {};
          }
          this.type = "default";
          this.status = options.status === void 0 ? 200 : options.status;
          this.ok = this.status >= 200 && this.status < 300;
          this.statusText = "statusText" in options ? options.statusText : "OK";
          this.headers = new Headers(options.headers);
          this.url = options.url || "";
          this._initBody(bodyInit);
        }
        Body.call(Response.prototype);
        Response.prototype.clone = function() {
          return new Response(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new Headers(this.headers),
            url: this.url
          });
        };
        Response.error = function() {
          var response = new Response(null, { status: 0, statusText: "" });
          response.type = "error";
          return response;
        };
        var redirectStatuses = [301, 302, 303, 307, 308];
        Response.redirect = function(url, status) {
          if (redirectStatuses.indexOf(status) === -1) {
            throw new RangeError("Invalid status code");
          }
          return new Response(null, { status, headers: { location: url } });
        };
        exports2.DOMException = self2.DOMException;
        try {
          new exports2.DOMException();
        } catch (err) {
          exports2.DOMException = function(message, name) {
            this.message = message;
            this.name = name;
            var error = Error(message);
            this.stack = error.stack;
          };
          exports2.DOMException.prototype = Object.create(Error.prototype);
          exports2.DOMException.prototype.constructor = exports2.DOMException;
        }
        function fetch2(input, init) {
          return new Promise(function(resolve, reject) {
            var request = new Request(input, init);
            if (request.signal && request.signal.aborted) {
              return reject(new exports2.DOMException("Aborted", "AbortError"));
            }
            var xhr = new XMLHttpRequest();
            function abortXhr() {
              xhr.abort();
            }
            xhr.onload = function() {
              var options = {
                status: xhr.status,
                statusText: xhr.statusText,
                headers: parseHeaders(xhr.getAllResponseHeaders() || "")
              };
              options.url = "responseURL" in xhr ? xhr.responseURL : options.headers.get("X-Request-URL");
              var body = "response" in xhr ? xhr.response : xhr.responseText;
              resolve(new Response(body, options));
            };
            xhr.onerror = function() {
              reject(new TypeError("Network request failed"));
            };
            xhr.ontimeout = function() {
              reject(new TypeError("Network request failed"));
            };
            xhr.onabort = function() {
              reject(new exports2.DOMException("Aborted", "AbortError"));
            };
            xhr.open(request.method, request.url, true);
            if (request.credentials === "include") {
              xhr.withCredentials = true;
            } else if (request.credentials === "omit") {
              xhr.withCredentials = false;
            }
            if ("responseType" in xhr && support.blob) {
              xhr.responseType = "blob";
            }
            request.headers.forEach(function(value, name) {
              xhr.setRequestHeader(name, value);
            });
            if (request.signal) {
              request.signal.addEventListener("abort", abortXhr);
              xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                  request.signal.removeEventListener("abort", abortXhr);
                }
              };
            }
            xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
          });
        }
        fetch2.polyfill = true;
        if (!self2.fetch) {
          self2.fetch = fetch2;
          self2.Headers = Headers;
          self2.Request = Request;
          self2.Response = Response;
        }
        exports2.Headers = Headers;
        exports2.Request = Request;
        exports2.Response = Response;
        exports2.fetch = fetch2;
        Object.defineProperty(exports2, "__esModule", { value: true });
        return exports2;
      }({});
    })(__self__);
    __self__.fetch.ponyfill = true;
    delete __self__.fetch.polyfill;
    var ctx = __self__;
    exports = ctx.fetch;
    exports.default = ctx.fetch;
    exports.fetch = ctx.fetch;
    exports.Headers = ctx.Headers;
    exports.Request = ctx.Request;
    exports.Response = ctx.Response;
    module.exports = exports;
  }
});

// node_modules/es5-ext/global.js
var require_global = __commonJS({
  "node_modules/es5-ext/global.js"(exports, module) {
    init_react();
    var naiveFallback = function() {
      if (typeof self === "object" && self)
        return self;
      if (typeof window === "object" && window)
        return window;
      throw new Error("Unable to resolve global `this`");
    };
    module.exports = function() {
      if (this)
        return this;
      if (typeof globalThis === "object" && globalThis)
        return globalThis;
      try {
        Object.defineProperty(Object.prototype, "__global__", {
          get: function() {
            return this;
          },
          configurable: true
        });
      } catch (error) {
        return naiveFallback();
      }
      try {
        if (!__global__)
          return naiveFallback();
        return __global__;
      } finally {
        delete Object.prototype.__global__;
      }
    }();
  }
});

// node_modules/websocket/package.json
var require_package = __commonJS({
  "node_modules/websocket/package.json"(exports, module) {
    module.exports = {
      name: "websocket",
      description: "Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.",
      keywords: [
        "websocket",
        "websockets",
        "socket",
        "networking",
        "comet",
        "push",
        "RFC-6455",
        "realtime",
        "server",
        "client"
      ],
      author: "Brian McKelvey <theturtle32@gmail.com> (https://github.com/theturtle32)",
      contributors: [
        "I\xF1aki Baz Castillo <ibc@aliax.net> (http://dev.sipdoc.net)"
      ],
      version: "1.0.34",
      repository: {
        type: "git",
        url: "https://github.com/theturtle32/WebSocket-Node.git"
      },
      homepage: "https://github.com/theturtle32/WebSocket-Node",
      engines: {
        node: ">=4.0.0"
      },
      dependencies: {
        bufferutil: "^4.0.1",
        debug: "^2.2.0",
        "es5-ext": "^0.10.50",
        "typedarray-to-buffer": "^3.1.5",
        "utf-8-validate": "^5.0.2",
        yaeti: "^0.0.6"
      },
      devDependencies: {
        "buffer-equal": "^1.0.0",
        gulp: "^4.0.2",
        "gulp-jshint": "^2.0.4",
        "jshint-stylish": "^2.2.1",
        jshint: "^2.0.0",
        tape: "^4.9.1"
      },
      config: {
        verbose: false
      },
      scripts: {
        test: "tape test/unit/*.js",
        gulp: "gulp"
      },
      main: "index",
      directories: {
        lib: "./lib"
      },
      browser: "lib/browser.js",
      license: "Apache-2.0"
    };
  }
});

// node_modules/websocket/lib/version.js
var require_version = __commonJS({
  "node_modules/websocket/lib/version.js"(exports, module) {
    init_react();
    module.exports = require_package().version;
  }
});

// node_modules/websocket/lib/browser.js
var require_browser = __commonJS({
  "node_modules/websocket/lib/browser.js"(exports, module) {
    init_react();
    var _globalThis;
    if (typeof globalThis === "object") {
      _globalThis = globalThis;
    } else {
      try {
        _globalThis = require_global();
      } catch (error) {
      } finally {
        if (!_globalThis && typeof window !== "undefined") {
          _globalThis = window;
        }
        if (!_globalThis) {
          throw new Error("Could not determine global this");
        }
      }
    }
    var NativeWebSocket = _globalThis.WebSocket || _globalThis.MozWebSocket;
    var websocket_version = require_version();
    function W3CWebSocket(uri, protocols) {
      var native_instance;
      if (protocols) {
        native_instance = new NativeWebSocket(uri, protocols);
      } else {
        native_instance = new NativeWebSocket(uri);
      }
      return native_instance;
    }
    if (NativeWebSocket) {
      ["CONNECTING", "OPEN", "CLOSING", "CLOSED"].forEach(function(prop) {
        Object.defineProperty(W3CWebSocket, prop, {
          get: function() {
            return NativeWebSocket[prop];
          }
        });
      });
    }
    module.exports = {
      "w3cwebsocket": NativeWebSocket ? W3CWebSocket : null,
      "version": websocket_version
    };
  }
});

// app/db.ts
init_react();

// node_modules/@supabase/supabase-js/dist/module/index.js
init_react();

// node_modules/@supabase/supabase-js/dist/module/SupabaseClient.js
init_react();

// node_modules/@supabase/supabase-js/dist/module/lib/constants.js
init_react();

// node_modules/@supabase/supabase-js/dist/module/lib/version.js
init_react();
var version = "1.28.1";

// node_modules/@supabase/supabase-js/dist/module/lib/constants.js
var DEFAULT_HEADERS = { "X-Client-Info": `supabase-js/${version}` };

// node_modules/@supabase/supabase-js/dist/module/lib/helpers.js
init_react();
function stripTrailingSlash(url) {
  return url.replace(/\/$/, "");
}

// node_modules/@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js
init_react();

// node_modules/@supabase/gotrue-js/dist/module/index.js
init_react();

// node_modules/@supabase/gotrue-js/dist/module/GoTrueApi.js
init_react();

// node_modules/@supabase/gotrue-js/dist/module/lib/fetch.js
init_react();
var import_cross_fetch = __toModule(require_browser_ponyfill());
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var _getErrorMessage = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
var handleError = (error, reject) => {
  if (typeof error.json !== "function") {
    return reject(error);
  }
  error.json().then((err) => {
    return reject({
      message: _getErrorMessage(err),
      status: (error === null || error === void 0 ? void 0 : error.status) || 500
    });
  });
};
var _getRequestParams = (method, options, body) => {
  const params = { method, headers: (options === null || options === void 0 ? void 0 : options.headers) || {} };
  if (method === "GET") {
    return params;
  }
  params.headers = Object.assign({ "Content-Type": "text/plain;charset=UTF-8" }, options === null || options === void 0 ? void 0 : options.headers);
  params.body = JSON.stringify(body);
  return params;
};
function _handleRequest(fetcher = import_cross_fetch.default, method, url, options, body) {
  return __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      fetcher(url, _getRequestParams(method, options, body)).then((result) => {
        if (!result.ok)
          throw result;
        if (options === null || options === void 0 ? void 0 : options.noResolveJson)
          return resolve;
        return result.json();
      }).then((data) => resolve(data)).catch((error) => handleError(error, reject));
    });
  });
}
function get(fetcher, url, options) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "GET", url, options);
  });
}
function post(fetcher, url, body, options) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "POST", url, options, body);
  });
}
function put(fetcher, url, body, options) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "PUT", url, options, body);
  });
}
function remove(fetcher, url, body, options) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "DELETE", url, options, body);
  });
}

// node_modules/@supabase/gotrue-js/dist/module/lib/constants.js
init_react();

// node_modules/@supabase/gotrue-js/dist/module/lib/version.js
init_react();
var version2 = "1.21.7";

// node_modules/@supabase/gotrue-js/dist/module/lib/constants.js
var GOTRUE_URL = "http://localhost:9999";
var DEFAULT_HEADERS2 = { "X-Client-Info": `gotrue-js/${version2}` };
var EXPIRY_MARGIN = 60 * 1e3;
var STORAGE_KEY = "supabase.auth.token";
var COOKIE_OPTIONS = {
  name: "sb:token",
  lifetime: 60 * 60 * 8,
  domain: "",
  path: "/",
  sameSite: "lax"
};

// node_modules/@supabase/gotrue-js/dist/module/lib/cookies.js
init_react();
function serialize(name, val, options) {
  const opt = options || {};
  const enc = encodeURIComponent;
  const fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  const value = enc(val);
  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError("argument val is invalid");
  }
  let str = name + "=" + value;
  if (opt.maxAge != null) {
    const maxAge = opt.maxAge - 0;
    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== "function") {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + opt.expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.sameSite) {
    const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return str;
}
function isSecureEnvironment(req) {
  if (!req || !req.headers || !req.headers.host) {
    throw new Error('The "host" request header is not available');
  }
  const host = req.headers.host.indexOf(":") > -1 && req.headers.host.split(":")[0] || req.headers.host;
  if (["localhost", "127.0.0.1"].indexOf(host) > -1 || host.endsWith(".local")) {
    return false;
  }
  return true;
}
function serializeCookie(cookie, secure) {
  var _a, _b, _c;
  return serialize(cookie.name, cookie.value, {
    maxAge: cookie.maxAge,
    expires: new Date(Date.now() + cookie.maxAge * 1e3),
    httpOnly: true,
    secure,
    path: (_a = cookie.path) !== null && _a !== void 0 ? _a : "/",
    domain: (_b = cookie.domain) !== null && _b !== void 0 ? _b : "",
    sameSite: (_c = cookie.sameSite) !== null && _c !== void 0 ? _c : "lax"
  });
}
function setCookies(req, res, cookies) {
  const strCookies = cookies.map((c) => serializeCookie(c, isSecureEnvironment(req)));
  const previousCookies = res.getHeader("Set-Cookie");
  if (previousCookies) {
    if (previousCookies instanceof Array) {
      Array.prototype.push.apply(strCookies, previousCookies);
    } else if (typeof previousCookies === "string") {
      strCookies.push(previousCookies);
    }
  }
  res.setHeader("Set-Cookie", strCookies);
}
function setCookie(req, res, cookie) {
  setCookies(req, res, [cookie]);
}
function deleteCookie(req, res, name) {
  setCookie(req, res, {
    name,
    value: "",
    maxAge: -1
  });
}

// node_modules/@supabase/gotrue-js/dist/module/lib/helpers.js
init_react();
function expiresAt(expiresIn) {
  const timeNow = Math.round(Date.now() / 1e3);
  return timeNow + expiresIn;
}
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}
var isBrowser = () => typeof window !== "undefined";
function getParameterByName(name, url) {
  var _a;
  if (!url)
    url = ((_a = window === null || window === void 0 ? void 0 : window.location) === null || _a === void 0 ? void 0 : _a.href) || "";
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&#]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// node_modules/@supabase/gotrue-js/dist/module/GoTrueApi.js
var __awaiter2 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var GoTrueApi = class {
  constructor({ url = "", headers = {}, cookieOptions, fetch: fetch2 }) {
    this.url = url;
    this.headers = headers;
    this.cookieOptions = Object.assign(Object.assign({}, COOKIE_OPTIONS), cookieOptions);
    this.fetch = fetch2;
  }
  createUser(attributes) {
    return __awaiter2(this, void 0, void 0, function* () {
      try {
        const data = yield post(this.fetch, `${this.url}/admin/users`, attributes, {
          headers: this.headers
        });
        return { data, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
  listUsers() {
    return __awaiter2(this, void 0, void 0, function* () {
      try {
        const data = yield get(this.fetch, `${this.url}/admin/users`, {
          headers: this.headers
        });
        return { data: data.users, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
  signUpWithEmail(email, password, options = {}) {
    return __awaiter2(this, void 0, void 0, function* () {
      try {
        const headers = Object.assign({}, this.headers);
        let queryString = "";
        if (options.redirectTo) {
          queryString = "?redirect_to=" + encodeURIComponent(options.redirectTo);
        }
        const data = yield post(this.fetch, `${this.url}/signup${queryString}`, { email, password, data: options.data }, { headers });
        const session = Object.assign({}, data);
        if (session.expires_in)
          session.expires_at = expiresAt(data.expires_in);
        return { data: session, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
  signInWithEmail(email, password, options = {}) {
    return __awaiter2(this, void 0, void 0, function* () {
      try {
        const headers = Object.assign({}, this.headers);
        let queryString = "?grant_type=password";
        if (options.redirectTo) {
          queryString += "&redirect_to=" + encodeURIComponent(options.redirectTo);
        }
        const data = yield post(this.fetch, `${this.url}/token${queryString}`, { email, password }, { headers });
        const session = Object.assign({}, data);
        if (session.expires_in)
          session.expires_at = expiresAt(data.expires_in);
        return { data: session, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
  signUpWithPhone(phone, password, options = {}) {
    return __awaiter2(this, void 0, void 0, function* () {
      try {
        const headers = Object.assign({}, this.headers);
        const data = yield post(this.fetch, `${this.url}/signup`, { phone, password, data: options.data }, { headers });
        const session = Object.assign({}, data);
        if (session.expires_in)
          session.expires_at = expiresAt(data.expires_in);
        return { data: session, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
  signInWithPhone(phone, password) {
    return __awaiter2(this, void 0, void 0, function* () {
      try {
        const headers = Object.assign({}, this.headers);
        const queryString = "?grant_type=password";
        const data = yield post(this.fetch, `${this.url}/token${queryString}`, { phone, password }, { headers });
        const session = Object.assign({}, data);
        if (session.expires_in)
          session.expires_at = expiresAt(data.expires_in);
        return { data: session, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
  sendMagicLinkEmail(email, options = {}) {
    return __awaiter2(this, void 0, void 0, function* () {
      try {
        const headers = Object.assign({}, this.headers);
        let queryString = "";
        if (options.redirectTo) {
          queryString += "?redirect_to=" + encodeURIComponent(options.redirectTo);
        }
        const data = yield post(this.fetch, `${this.url}/magiclink${queryString}`, { email }, { headers });
        return { data, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
  sendMobileOTP(phone) {
    return __awaiter2(this, void 0, void 0, function* () {
      try {
        const headers = Object.assign({}, this.headers);
        const data = yield post(this.fetch, `${this.url}/otp`, { phone }, { headers });
        return { data, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
  verifyMobileOTP(phone, token, options = {}) {
    return __awaiter2(this, void 0, void 0, function* () {
      try {
        const headers = Object.assign({}, this.headers);
        const data = yield post(this.fetch, `${this.url}/verify`, { phone, token, type: "sms", redirect_to: options.redirectTo }, { headers });
        return { data, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
  inviteUserByEmail(email, options = {}) {
    return __awaiter2(this, void 0, void 0, function* () {
      try {
        const headers = Object.assign({}, this.headers);
        let queryString = "";
        if (options.redirectTo) {
          queryString += "?redirect_to=" + encodeURIComponent(options.redirectTo);
        }
        const data = yield post(this.fetch, `${this.url}/invite${queryString}`, { email, data: options.data }, { headers });
        return { data, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
  resetPasswordForEmail(email, options = {}) {
    return __awaiter2(this, void 0, void 0, function* () {
      try {
        const headers = Object.assign({}, this.headers);
        let queryString = "";
        if (options.redirectTo) {
          queryString += "?redirect_to=" + encodeURIComponent(options.redirectTo);
        }
        const data = yield post(this.fetch, `${this.url}/recover${queryString}`, { email }, { headers });
        return { data, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
  _createRequestHeaders(jwt) {
    const headers = Object.assign({}, this.headers);
    headers["Authorization"] = `Bearer ${jwt}`;
    return headers;
  }
  signOut(jwt) {
    return __awaiter2(this, void 0, void 0, function* () {
      try {
        yield post(this.fetch, `${this.url}/logout`, {}, { headers: this._createRequestHeaders(jwt), noResolveJson: true });
        return { error: null };
      } catch (e) {
        return { error: e };
      }
    });
  }
  getUrlForProvider(provider, options) {
    const urlParams = [`provider=${encodeURIComponent(provider)}`];
    if (options === null || options === void 0 ? void 0 : options.redirectTo) {
      urlParams.push(`redirect_to=${encodeURIComponent(options.redirectTo)}`);
    }
    if (options === null || options === void 0 ? void 0 : options.scopes) {
      urlParams.push(`scopes=${encodeURIComponent(options.scopes)}`);
    }
    return `${this.url}/authorize?${urlParams.join("&")}`;
  }
  getUser(jwt) {
    return __awaiter2(this, void 0, void 0, function* () {
      try {
        const data = yield get(this.fetch, `${this.url}/user`, {
          headers: this._createRequestHeaders(jwt)
        });
        return { user: data, data, error: null };
      } catch (e) {
        return { user: null, data: null, error: e };
      }
    });
  }
  updateUser(jwt, attributes) {
    return __awaiter2(this, void 0, void 0, function* () {
      try {
        const data = yield put(this.fetch, `${this.url}/user`, attributes, {
          headers: this._createRequestHeaders(jwt)
        });
        return { user: data, data, error: null };
      } catch (e) {
        return { user: null, data: null, error: e };
      }
    });
  }
  deleteUser(uid, jwt) {
    return __awaiter2(this, void 0, void 0, function* () {
      try {
        const data = yield remove(this.fetch, `${this.url}/admin/users/${uid}`, {}, {
          headers: this._createRequestHeaders(jwt)
        });
        return { user: data, data, error: null };
      } catch (e) {
        return { user: null, data: null, error: e };
      }
    });
  }
  refreshAccessToken(refreshToken) {
    return __awaiter2(this, void 0, void 0, function* () {
      try {
        const data = yield post(this.fetch, `${this.url}/token?grant_type=refresh_token`, { refresh_token: refreshToken }, { headers: this.headers });
        const session = Object.assign({}, data);
        if (session.expires_in)
          session.expires_at = expiresAt(data.expires_in);
        return { data: session, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
  setAuthCookie(req, res) {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
    const { event, session } = req.body;
    if (!event)
      throw new Error("Auth event missing!");
    if (event === "SIGNED_IN") {
      if (!session)
        throw new Error("Auth session missing!");
      setCookie(req, res, {
        name: this.cookieOptions.name,
        value: session.access_token,
        domain: this.cookieOptions.domain,
        maxAge: this.cookieOptions.lifetime,
        path: this.cookieOptions.path,
        sameSite: this.cookieOptions.sameSite
      });
    }
    if (event === "SIGNED_OUT")
      deleteCookie(req, res, this.cookieOptions.name);
    res.status(200).json({});
  }
  getUserByCookie(req) {
    return __awaiter2(this, void 0, void 0, function* () {
      try {
        if (!req.cookies) {
          throw new Error("Not able to parse cookies! When using Express make sure the cookie-parser middleware is in use!");
        }
        if (!req.cookies[this.cookieOptions.name]) {
          throw new Error("No cookie found!");
        }
        const token = req.cookies[this.cookieOptions.name];
        const { user, error } = yield this.getUser(token);
        if (error)
          throw error;
        return { token, user, data: user, error: null };
      } catch (e) {
        return { token: null, user: null, data: null, error: e };
      }
    });
  }
  generateLink(type, email, options = {}) {
    return __awaiter2(this, void 0, void 0, function* () {
      try {
        const data = yield post(this.fetch, `${this.url}/admin/generate_link`, {
          type,
          email,
          password: options.password,
          data: options.data,
          redirect_to: options.redirectTo
        }, { headers: this.headers });
        return { data, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
};

// node_modules/@supabase/gotrue-js/dist/module/GoTrueClient.js
init_react();

// node_modules/@supabase/gotrue-js/dist/module/lib/polyfills.js
init_react();
function polyfillGlobalThis() {
  if (typeof globalThis === "object")
    return;
  try {
    Object.defineProperty(Object.prototype, "__magic__", {
      get: function() {
        return this;
      },
      configurable: true
    });
    __magic__.globalThis = __magic__;
    delete Object.prototype.__magic__;
  } catch (e) {
    if (typeof self !== "undefined") {
      self.globalThis = self;
    }
  }
}

// node_modules/@supabase/gotrue-js/dist/module/GoTrueClient.js
var __awaiter3 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
polyfillGlobalThis();
var DEFAULT_OPTIONS = {
  url: GOTRUE_URL,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
  multiTab: true,
  headers: DEFAULT_HEADERS2
};
var GoTrueClient = class {
  constructor(options) {
    this.stateChangeEmitters = new Map();
    const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
    this.currentUser = null;
    this.currentSession = null;
    this.autoRefreshToken = settings.autoRefreshToken;
    this.persistSession = settings.persistSession;
    this.multiTab = settings.multiTab;
    this.localStorage = settings.localStorage || globalThis.localStorage;
    this.api = new GoTrueApi({
      url: settings.url,
      headers: settings.headers,
      cookieOptions: settings.cookieOptions,
      fetch: settings.fetch
    });
    this._recoverSession();
    this._recoverAndRefresh();
    this._listenForMultiTabEvents();
    if (settings.detectSessionInUrl && isBrowser() && !!getParameterByName("access_token")) {
      this.getSessionFromUrl({ storeSession: true }).then(({ error }) => {
        if (error) {
          console.error("Error getting session from URL.", error);
        }
      });
    }
  }
  signUp({ email, password, phone }, options = {}) {
    return __awaiter3(this, void 0, void 0, function* () {
      try {
        this._removeSession();
        const { data, error } = phone && password ? yield this.api.signUpWithPhone(phone, password, {
          data: options.data
        }) : yield this.api.signUpWithEmail(email, password, {
          redirectTo: options.redirectTo,
          data: options.data
        });
        if (error) {
          throw error;
        }
        if (!data) {
          throw "An error occurred on sign up.";
        }
        let session = null;
        let user = null;
        if (data.access_token) {
          session = data;
          user = session.user;
          this._saveSession(session);
          this._notifyAllSubscribers("SIGNED_IN");
        }
        if (data.id) {
          user = data;
        }
        return { user, session, error: null };
      } catch (e) {
        return { user: null, session: null, error: e };
      }
    });
  }
  signIn({ email, phone, password, refreshToken, provider }, options = {}) {
    return __awaiter3(this, void 0, void 0, function* () {
      try {
        this._removeSession();
        if (email && !password) {
          const { error } = yield this.api.sendMagicLinkEmail(email, {
            redirectTo: options.redirectTo
          });
          return { user: null, session: null, error };
        }
        if (email && password) {
          return this._handleEmailSignIn(email, password, {
            redirectTo: options.redirectTo
          });
        }
        if (phone && !password) {
          const { error } = yield this.api.sendMobileOTP(phone);
          return { user: null, session: null, error };
        }
        if (phone && password) {
          return this._handlePhoneSignIn(phone, password);
        }
        if (refreshToken) {
          const { error } = yield this._callRefreshToken(refreshToken);
          if (error)
            throw error;
          return {
            user: this.currentUser,
            session: this.currentSession,
            error: null
          };
        }
        if (provider) {
          return this._handleProviderSignIn(provider, {
            redirectTo: options.redirectTo,
            scopes: options.scopes
          });
        }
        throw new Error(`You must provide either an email, phone number or a third-party provider.`);
      } catch (e) {
        return { user: null, session: null, error: e };
      }
    });
  }
  verifyOTP({ phone, token }, options = {}) {
    return __awaiter3(this, void 0, void 0, function* () {
      try {
        this._removeSession();
        const { data, error } = yield this.api.verifyMobileOTP(phone, token, options);
        if (error) {
          throw error;
        }
        if (!data) {
          throw "An error occurred on token verification.";
        }
        let session = null;
        let user = null;
        if (data.access_token) {
          session = data;
          user = session.user;
          this._saveSession(session);
          this._notifyAllSubscribers("SIGNED_IN");
        }
        if (data.id) {
          user = data;
        }
        return { user, session, error: null };
      } catch (e) {
        return { user: null, session: null, error: e };
      }
    });
  }
  user() {
    return this.currentUser;
  }
  session() {
    return this.currentSession;
  }
  refreshSession() {
    var _a;
    return __awaiter3(this, void 0, void 0, function* () {
      try {
        if (!((_a = this.currentSession) === null || _a === void 0 ? void 0 : _a.access_token))
          throw new Error("Not logged in.");
        const { error } = yield this._callRefreshToken();
        if (error)
          throw error;
        return { data: this.currentSession, user: this.currentUser, error: null };
      } catch (e) {
        return { data: null, user: null, error: e };
      }
    });
  }
  update(attributes) {
    var _a;
    return __awaiter3(this, void 0, void 0, function* () {
      try {
        if (!((_a = this.currentSession) === null || _a === void 0 ? void 0 : _a.access_token))
          throw new Error("Not logged in.");
        const { user, error } = yield this.api.updateUser(this.currentSession.access_token, attributes);
        if (error)
          throw error;
        if (!user)
          throw Error("Invalid user data.");
        const session = Object.assign(Object.assign({}, this.currentSession), { user });
        this._saveSession(session);
        this._notifyAllSubscribers("USER_UPDATED");
        return { data: user, user, error: null };
      } catch (e) {
        return { data: null, user: null, error: e };
      }
    });
  }
  setSession(refresh_token) {
    return __awaiter3(this, void 0, void 0, function* () {
      try {
        if (!refresh_token) {
          throw new Error("No current session.");
        }
        const { data, error } = yield this.api.refreshAccessToken(refresh_token);
        if (error) {
          return { session: null, error };
        }
        this._saveSession(data);
        this._notifyAllSubscribers("SIGNED_IN");
        return { session: data, error: null };
      } catch (e) {
        return { error: e, session: null };
      }
    });
  }
  setAuth(access_token) {
    this.currentSession = Object.assign(Object.assign({}, this.currentSession), { access_token, token_type: "bearer", user: null });
    return this.currentSession;
  }
  getSessionFromUrl(options) {
    return __awaiter3(this, void 0, void 0, function* () {
      try {
        if (!isBrowser())
          throw new Error("No browser detected.");
        const error_description = getParameterByName("error_description");
        if (error_description)
          throw new Error(error_description);
        const provider_token = getParameterByName("provider_token");
        const access_token = getParameterByName("access_token");
        if (!access_token)
          throw new Error("No access_token detected.");
        const expires_in = getParameterByName("expires_in");
        if (!expires_in)
          throw new Error("No expires_in detected.");
        const refresh_token = getParameterByName("refresh_token");
        if (!refresh_token)
          throw new Error("No refresh_token detected.");
        const token_type = getParameterByName("token_type");
        if (!token_type)
          throw new Error("No token_type detected.");
        const timeNow = Math.round(Date.now() / 1e3);
        const expires_at = timeNow + parseInt(expires_in);
        const { user, error } = yield this.api.getUser(access_token);
        if (error)
          throw error;
        const session = {
          provider_token,
          access_token,
          expires_in: parseInt(expires_in),
          expires_at,
          refresh_token,
          token_type,
          user
        };
        if (options === null || options === void 0 ? void 0 : options.storeSession) {
          this._saveSession(session);
          const recoveryMode = getParameterByName("type");
          this._notifyAllSubscribers("SIGNED_IN");
          if (recoveryMode === "recovery") {
            this._notifyAllSubscribers("PASSWORD_RECOVERY");
          }
        }
        window.location.hash = "";
        return { data: session, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
  signOut() {
    var _a;
    return __awaiter3(this, void 0, void 0, function* () {
      const accessToken = (_a = this.currentSession) === null || _a === void 0 ? void 0 : _a.access_token;
      this._removeSession();
      this._notifyAllSubscribers("SIGNED_OUT");
      if (accessToken) {
        const { error } = yield this.api.signOut(accessToken);
        if (error)
          return { error };
      }
      return { error: null };
    });
  }
  onAuthStateChange(callback) {
    try {
      const id = uuid();
      const subscription = {
        id,
        callback,
        unsubscribe: () => {
          this.stateChangeEmitters.delete(id);
        }
      };
      this.stateChangeEmitters.set(id, subscription);
      return { data: subscription, error: null };
    } catch (e) {
      return { data: null, error: e };
    }
  }
  _handleEmailSignIn(email, password, options = {}) {
    var _a, _b;
    return __awaiter3(this, void 0, void 0, function* () {
      try {
        const { data, error } = yield this.api.signInWithEmail(email, password, {
          redirectTo: options.redirectTo
        });
        if (error || !data)
          return { data: null, user: null, session: null, error };
        if (((_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.confirmed_at) || ((_b = data === null || data === void 0 ? void 0 : data.user) === null || _b === void 0 ? void 0 : _b.email_confirmed_at)) {
          this._saveSession(data);
          this._notifyAllSubscribers("SIGNED_IN");
        }
        return { data, user: data.user, session: data, error: null };
      } catch (e) {
        return { data: null, user: null, session: null, error: e };
      }
    });
  }
  _handlePhoneSignIn(phone, password) {
    var _a;
    return __awaiter3(this, void 0, void 0, function* () {
      try {
        const { data, error } = yield this.api.signInWithPhone(phone, password);
        if (error || !data)
          return { data: null, user: null, session: null, error };
        if ((_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.phone_confirmed_at) {
          this._saveSession(data);
          this._notifyAllSubscribers("SIGNED_IN");
        }
        return { data, user: data.user, session: data, error: null };
      } catch (e) {
        return { data: null, user: null, session: null, error: e };
      }
    });
  }
  _handleProviderSignIn(provider, options = {}) {
    const url = this.api.getUrlForProvider(provider, {
      redirectTo: options.redirectTo,
      scopes: options.scopes
    });
    try {
      if (isBrowser()) {
        window.location.href = url;
      }
      return { provider, url, data: null, session: null, user: null, error: null };
    } catch (e) {
      if (url)
        return { provider, url, data: null, session: null, user: null, error: null };
      return { data: null, user: null, session: null, error: e };
    }
  }
  _recoverSession() {
    var _a;
    try {
      const json = isBrowser() && ((_a = this.localStorage) === null || _a === void 0 ? void 0 : _a.getItem(STORAGE_KEY));
      if (!json || typeof json !== "string") {
        return null;
      }
      const data = JSON.parse(json);
      const { currentSession, expiresAt: expiresAt2 } = data;
      const timeNow = Math.round(Date.now() / 1e3);
      if (expiresAt2 >= timeNow && (currentSession === null || currentSession === void 0 ? void 0 : currentSession.user)) {
        this._saveSession(currentSession);
        this._notifyAllSubscribers("SIGNED_IN");
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  _recoverAndRefresh() {
    return __awaiter3(this, void 0, void 0, function* () {
      try {
        const json = isBrowser() && (yield this.localStorage.getItem(STORAGE_KEY));
        if (!json) {
          return null;
        }
        const data = JSON.parse(json);
        const { currentSession, expiresAt: expiresAt2 } = data;
        const timeNow = Math.round(Date.now() / 1e3);
        if (expiresAt2 < timeNow) {
          if (this.autoRefreshToken && currentSession.refresh_token) {
            const { error } = yield this._callRefreshToken(currentSession.refresh_token);
            if (error) {
              console.log(error.message);
              yield this._removeSession();
            }
          } else {
            this._removeSession();
          }
        } else if (!currentSession || !currentSession.user) {
          console.log("Current session is missing data.");
          this._removeSession();
        } else {
          this._saveSession(currentSession);
          this._notifyAllSubscribers("SIGNED_IN");
        }
      } catch (err) {
        console.error(err);
        return null;
      }
    });
  }
  _callRefreshToken(refresh_token) {
    var _a;
    if (refresh_token === void 0) {
      refresh_token = (_a = this.currentSession) === null || _a === void 0 ? void 0 : _a.refresh_token;
    }
    return __awaiter3(this, void 0, void 0, function* () {
      try {
        if (!refresh_token) {
          throw new Error("No current session.");
        }
        const { data, error } = yield this.api.refreshAccessToken(refresh_token);
        if (error)
          throw error;
        if (!data)
          throw Error("Invalid session data.");
        this._saveSession(data);
        this._notifyAllSubscribers("TOKEN_REFRESHED");
        this._notifyAllSubscribers("SIGNED_IN");
        return { data, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
  _notifyAllSubscribers(event) {
    this.stateChangeEmitters.forEach((x) => x.callback(event, this.currentSession));
  }
  _saveSession(session) {
    this.currentSession = session;
    this.currentUser = session.user;
    const expiresAt2 = session.expires_at;
    if (expiresAt2) {
      const timeNow = Math.round(Date.now() / 1e3);
      const expiresIn = expiresAt2 - timeNow;
      const refreshDurationBeforeExpires = expiresIn > 60 ? 60 : 0.5;
      this._startAutoRefreshToken((expiresIn - refreshDurationBeforeExpires) * 1e3);
    }
    if (this.persistSession && session.expires_at) {
      this._persistSession(this.currentSession);
    }
  }
  _persistSession(currentSession) {
    const data = { currentSession, expiresAt: currentSession.expires_at };
    isBrowser() && this.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
  _removeSession() {
    return __awaiter3(this, void 0, void 0, function* () {
      this.currentSession = null;
      this.currentUser = null;
      if (this.refreshTokenTimer)
        clearTimeout(this.refreshTokenTimer);
      isBrowser() && (yield this.localStorage.removeItem(STORAGE_KEY));
    });
  }
  _startAutoRefreshToken(value) {
    if (this.refreshTokenTimer)
      clearTimeout(this.refreshTokenTimer);
    if (value <= 0 || !this.autoRefreshToken)
      return;
    this.refreshTokenTimer = setTimeout(() => this._callRefreshToken(), value);
    if (typeof this.refreshTokenTimer.unref === "function")
      this.refreshTokenTimer.unref();
  }
  _listenForMultiTabEvents() {
    if (!this.multiTab || !isBrowser() || !(window === null || window === void 0 ? void 0 : window.addEventListener)) {
      return false;
    }
    try {
      window === null || window === void 0 ? void 0 : window.addEventListener("storage", (e) => {
        var _a;
        if (e.key === STORAGE_KEY) {
          const newSession = JSON.parse(String(e.newValue));
          if ((_a = newSession === null || newSession === void 0 ? void 0 : newSession.currentSession) === null || _a === void 0 ? void 0 : _a.access_token) {
            this._recoverAndRefresh();
            this._notifyAllSubscribers("SIGNED_IN");
          } else {
            this._removeSession();
            this._notifyAllSubscribers("SIGNED_OUT");
          }
        }
      });
    } catch (error) {
      console.error("_listenForMultiTabEvents", error);
    }
  }
};

// node_modules/@supabase/gotrue-js/dist/module/lib/types.js
init_react();

// node_modules/@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js
var SupabaseAuthClient = class extends GoTrueClient {
  constructor(options) {
    super(options);
  }
};

// node_modules/@supabase/supabase-js/dist/module/lib/SupabaseQueryBuilder.js
init_react();

// node_modules/@supabase/postgrest-js/dist/module/index.js
init_react();

// node_modules/@supabase/postgrest-js/dist/module/PostgrestClient.js
init_react();

// node_modules/@supabase/postgrest-js/dist/module/lib/PostgrestQueryBuilder.js
init_react();

// node_modules/@supabase/postgrest-js/dist/module/lib/types.js
init_react();
var import_cross_fetch2 = __toModule(require_browser_ponyfill());
var __awaiter4 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var PostgrestBuilder = class {
  constructor(builder) {
    this.shouldThrowOnError = false;
    Object.assign(this, builder);
    this.fetch = builder.fetch || import_cross_fetch2.default;
  }
  throwOnError() {
    this.shouldThrowOnError = true;
    return this;
  }
  then(onfulfilled, onrejected) {
    if (typeof this.schema === "undefined") {
    } else if (["GET", "HEAD"].includes(this.method)) {
      this.headers["Accept-Profile"] = this.schema;
    } else {
      this.headers["Content-Profile"] = this.schema;
    }
    if (this.method !== "GET" && this.method !== "HEAD") {
      this.headers["Content-Type"] = "application/json";
    }
    let res = this.fetch(this.url.toString(), {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify(this.body),
      signal: this.signal
    }).then((res2) => __awaiter4(this, void 0, void 0, function* () {
      var _a, _b, _c;
      let error = null;
      let data = null;
      let count = null;
      if (res2.ok) {
        const isReturnMinimal = (_a = this.headers["Prefer"]) === null || _a === void 0 ? void 0 : _a.split(",").includes("return=minimal");
        if (this.method !== "HEAD" && !isReturnMinimal) {
          const text = yield res2.text();
          if (!text) {
          } else if (this.headers["Accept"] === "text/csv") {
            data = text;
          } else {
            data = JSON.parse(text);
          }
        }
        const countHeader = (_b = this.headers["Prefer"]) === null || _b === void 0 ? void 0 : _b.match(/count=(exact|planned|estimated)/);
        const contentRange = (_c = res2.headers.get("content-range")) === null || _c === void 0 ? void 0 : _c.split("/");
        if (countHeader && contentRange && contentRange.length > 1) {
          count = parseInt(contentRange[1]);
        }
      } else {
        error = yield res2.json();
        if (error && this.shouldThrowOnError) {
          throw error;
        }
      }
      const postgrestResponse = {
        error,
        data,
        count,
        status: res2.status,
        statusText: res2.statusText,
        body: data
      };
      return postgrestResponse;
    }));
    if (!this.shouldThrowOnError) {
      res = res.catch((fetchError) => ({
        error: {
          message: `FetchError: ${fetchError.message}`,
          details: "",
          hint: "",
          code: fetchError.code || ""
        },
        data: null,
        body: null,
        count: null,
        status: 400,
        statusText: "Bad Request"
      }));
    }
    return res.then(onfulfilled, onrejected);
  }
};

// node_modules/@supabase/postgrest-js/dist/module/lib/PostgrestFilterBuilder.js
init_react();

// node_modules/@supabase/postgrest-js/dist/module/lib/PostgrestTransformBuilder.js
init_react();
var PostgrestTransformBuilder = class extends PostgrestBuilder {
  select(columns = "*") {
    let quoted = false;
    const cleanedColumns = columns.split("").map((c) => {
      if (/\s/.test(c) && !quoted) {
        return "";
      }
      if (c === '"') {
        quoted = !quoted;
      }
      return c;
    }).join("");
    this.url.searchParams.set("select", cleanedColumns);
    return this;
  }
  order(column, { ascending = true, nullsFirst = false, foreignTable } = {}) {
    const key = typeof foreignTable === "undefined" ? "order" : `${foreignTable}.order`;
    const existingOrder = this.url.searchParams.get(key);
    this.url.searchParams.set(key, `${existingOrder ? `${existingOrder},` : ""}${column}.${ascending ? "asc" : "desc"}.${nullsFirst ? "nullsfirst" : "nullslast"}`);
    return this;
  }
  limit(count, { foreignTable } = {}) {
    const key = typeof foreignTable === "undefined" ? "limit" : `${foreignTable}.limit`;
    this.url.searchParams.set(key, `${count}`);
    return this;
  }
  range(from, to, { foreignTable } = {}) {
    const keyOffset = typeof foreignTable === "undefined" ? "offset" : `${foreignTable}.offset`;
    const keyLimit = typeof foreignTable === "undefined" ? "limit" : `${foreignTable}.limit`;
    this.url.searchParams.set(keyOffset, `${from}`);
    this.url.searchParams.set(keyLimit, `${to - from + 1}`);
    return this;
  }
  abortSignal(signal) {
    this.signal = signal;
    return this;
  }
  single() {
    this.headers["Accept"] = "application/vnd.pgrst.object+json";
    return this;
  }
  maybeSingle() {
    this.headers["Accept"] = "application/vnd.pgrst.object+json";
    const _this = new PostgrestTransformBuilder(this);
    _this.then = (onfulfilled, onrejected) => this.then((res) => {
      var _a, _b;
      if ((_b = (_a = res.error) === null || _a === void 0 ? void 0 : _a.details) === null || _b === void 0 ? void 0 : _b.includes("Results contain 0 rows")) {
        return onfulfilled({
          error: null,
          data: null,
          count: res.count,
          status: 200,
          statusText: "OK",
          body: null
        });
      }
      return onfulfilled(res);
    }, onrejected);
    return _this;
  }
  csv() {
    this.headers["Accept"] = "text/csv";
    return this;
  }
};

// node_modules/@supabase/postgrest-js/dist/module/lib/PostgrestFilterBuilder.js
var PostgrestFilterBuilder = class extends PostgrestTransformBuilder {
  constructor() {
    super(...arguments);
    this.cs = this.contains;
    this.cd = this.containedBy;
    this.sl = this.rangeLt;
    this.sr = this.rangeGt;
    this.nxl = this.rangeGte;
    this.nxr = this.rangeLte;
    this.adj = this.rangeAdjacent;
    this.ov = this.overlaps;
  }
  not(column, operator, value) {
    this.url.searchParams.append(`${column}`, `not.${operator}.${value}`);
    return this;
  }
  or(filters, { foreignTable } = {}) {
    const key = typeof foreignTable === "undefined" ? "or" : `${foreignTable}.or`;
    this.url.searchParams.append(key, `(${filters})`);
    return this;
  }
  eq(column, value) {
    this.url.searchParams.append(`${column}`, `eq.${value}`);
    return this;
  }
  neq(column, value) {
    this.url.searchParams.append(`${column}`, `neq.${value}`);
    return this;
  }
  gt(column, value) {
    this.url.searchParams.append(`${column}`, `gt.${value}`);
    return this;
  }
  gte(column, value) {
    this.url.searchParams.append(`${column}`, `gte.${value}`);
    return this;
  }
  lt(column, value) {
    this.url.searchParams.append(`${column}`, `lt.${value}`);
    return this;
  }
  lte(column, value) {
    this.url.searchParams.append(`${column}`, `lte.${value}`);
    return this;
  }
  like(column, pattern) {
    this.url.searchParams.append(`${column}`, `like.${pattern}`);
    return this;
  }
  ilike(column, pattern) {
    this.url.searchParams.append(`${column}`, `ilike.${pattern}`);
    return this;
  }
  is(column, value) {
    this.url.searchParams.append(`${column}`, `is.${value}`);
    return this;
  }
  in(column, values) {
    const cleanedValues = values.map((s) => {
      if (typeof s === "string" && new RegExp("[,()]").test(s))
        return `"${s}"`;
      else
        return `${s}`;
    }).join(",");
    this.url.searchParams.append(`${column}`, `in.(${cleanedValues})`);
    return this;
  }
  contains(column, value) {
    if (typeof value === "string") {
      this.url.searchParams.append(`${column}`, `cs.${value}`);
    } else if (Array.isArray(value)) {
      this.url.searchParams.append(`${column}`, `cs.{${value.join(",")}}`);
    } else {
      this.url.searchParams.append(`${column}`, `cs.${JSON.stringify(value)}`);
    }
    return this;
  }
  containedBy(column, value) {
    if (typeof value === "string") {
      this.url.searchParams.append(`${column}`, `cd.${value}`);
    } else if (Array.isArray(value)) {
      this.url.searchParams.append(`${column}`, `cd.{${value.join(",")}}`);
    } else {
      this.url.searchParams.append(`${column}`, `cd.${JSON.stringify(value)}`);
    }
    return this;
  }
  rangeLt(column, range) {
    this.url.searchParams.append(`${column}`, `sl.${range}`);
    return this;
  }
  rangeGt(column, range) {
    this.url.searchParams.append(`${column}`, `sr.${range}`);
    return this;
  }
  rangeGte(column, range) {
    this.url.searchParams.append(`${column}`, `nxl.${range}`);
    return this;
  }
  rangeLte(column, range) {
    this.url.searchParams.append(`${column}`, `nxr.${range}`);
    return this;
  }
  rangeAdjacent(column, range) {
    this.url.searchParams.append(`${column}`, `adj.${range}`);
    return this;
  }
  overlaps(column, value) {
    if (typeof value === "string") {
      this.url.searchParams.append(`${column}`, `ov.${value}`);
    } else {
      this.url.searchParams.append(`${column}`, `ov.{${value.join(",")}}`);
    }
    return this;
  }
  textSearch(column, query, { config, type = null } = {}) {
    let typePart = "";
    if (type === "plain") {
      typePart = "pl";
    } else if (type === "phrase") {
      typePart = "ph";
    } else if (type === "websearch") {
      typePart = "w";
    }
    const configPart = config === void 0 ? "" : `(${config})`;
    this.url.searchParams.append(`${column}`, `${typePart}fts${configPart}.${query}`);
    return this;
  }
  fts(column, query, { config } = {}) {
    const configPart = typeof config === "undefined" ? "" : `(${config})`;
    this.url.searchParams.append(`${column}`, `fts${configPart}.${query}`);
    return this;
  }
  plfts(column, query, { config } = {}) {
    const configPart = typeof config === "undefined" ? "" : `(${config})`;
    this.url.searchParams.append(`${column}`, `plfts${configPart}.${query}`);
    return this;
  }
  phfts(column, query, { config } = {}) {
    const configPart = typeof config === "undefined" ? "" : `(${config})`;
    this.url.searchParams.append(`${column}`, `phfts${configPart}.${query}`);
    return this;
  }
  wfts(column, query, { config } = {}) {
    const configPart = typeof config === "undefined" ? "" : `(${config})`;
    this.url.searchParams.append(`${column}`, `wfts${configPart}.${query}`);
    return this;
  }
  filter(column, operator, value) {
    this.url.searchParams.append(`${column}`, `${operator}.${value}`);
    return this;
  }
  match(query) {
    Object.keys(query).forEach((key) => {
      this.url.searchParams.append(`${key}`, `eq.${query[key]}`);
    });
    return this;
  }
};

// node_modules/@supabase/postgrest-js/dist/module/lib/PostgrestQueryBuilder.js
var PostgrestQueryBuilder = class extends PostgrestBuilder {
  constructor(url, { headers = {}, schema, fetch: fetch2 } = {}) {
    super({ fetch: fetch2 });
    this.url = new URL(url);
    this.headers = Object.assign({}, headers);
    this.schema = schema;
  }
  select(columns = "*", { head = false, count = null } = {}) {
    this.method = "GET";
    let quoted = false;
    const cleanedColumns = columns.split("").map((c) => {
      if (/\s/.test(c) && !quoted) {
        return "";
      }
      if (c === '"') {
        quoted = !quoted;
      }
      return c;
    }).join("");
    this.url.searchParams.set("select", cleanedColumns);
    if (count) {
      this.headers["Prefer"] = `count=${count}`;
    }
    if (head) {
      this.method = "HEAD";
    }
    return new PostgrestFilterBuilder(this);
  }
  insert(values, { upsert = false, onConflict, returning = "representation", count = null } = {}) {
    this.method = "POST";
    const prefersHeaders = [`return=${returning}`];
    if (upsert)
      prefersHeaders.push("resolution=merge-duplicates");
    if (upsert && onConflict !== void 0)
      this.url.searchParams.set("on_conflict", onConflict);
    this.body = values;
    if (count) {
      prefersHeaders.push(`count=${count}`);
    }
    this.headers["Prefer"] = prefersHeaders.join(",");
    if (Array.isArray(values)) {
      const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
      if (columns.length > 0) {
        const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
        this.url.searchParams.set("columns", uniqueColumns.join(","));
      }
    }
    return new PostgrestFilterBuilder(this);
  }
  upsert(values, { onConflict, returning = "representation", count = null, ignoreDuplicates = false } = {}) {
    this.method = "POST";
    const prefersHeaders = [
      `resolution=${ignoreDuplicates ? "ignore" : "merge"}-duplicates`,
      `return=${returning}`
    ];
    if (onConflict !== void 0)
      this.url.searchParams.set("on_conflict", onConflict);
    this.body = values;
    if (count) {
      prefersHeaders.push(`count=${count}`);
    }
    this.headers["Prefer"] = prefersHeaders.join(",");
    return new PostgrestFilterBuilder(this);
  }
  update(values, { returning = "representation", count = null } = {}) {
    this.method = "PATCH";
    const prefersHeaders = [`return=${returning}`];
    this.body = values;
    if (count) {
      prefersHeaders.push(`count=${count}`);
    }
    this.headers["Prefer"] = prefersHeaders.join(",");
    return new PostgrestFilterBuilder(this);
  }
  delete({ returning = "representation", count = null } = {}) {
    this.method = "DELETE";
    const prefersHeaders = [`return=${returning}`];
    if (count) {
      prefersHeaders.push(`count=${count}`);
    }
    this.headers["Prefer"] = prefersHeaders.join(",");
    return new PostgrestFilterBuilder(this);
  }
};

// node_modules/@supabase/postgrest-js/dist/module/lib/PostgrestRpcBuilder.js
init_react();
var PostgrestRpcBuilder = class extends PostgrestBuilder {
  constructor(url, { headers = {}, schema, fetch: fetch2 } = {}) {
    super({ fetch: fetch2 });
    this.url = new URL(url);
    this.headers = Object.assign({}, headers);
    this.schema = schema;
  }
  rpc(params, { head = false, count = null } = {}) {
    if (head) {
      this.method = "HEAD";
      if (params) {
        Object.entries(params).forEach(([name, value]) => {
          this.url.searchParams.append(name, value);
        });
      }
    } else {
      this.method = "POST";
      this.body = params;
    }
    if (count) {
      if (this.headers["Prefer"] !== void 0)
        this.headers["Prefer"] += `,count=${count}`;
      else
        this.headers["Prefer"] = `count=${count}`;
    }
    return new PostgrestFilterBuilder(this);
  }
};

// node_modules/@supabase/postgrest-js/dist/module/lib/constants.js
init_react();

// node_modules/@supabase/postgrest-js/dist/module/lib/version.js
init_react();
var version3 = "0.35.0";

// node_modules/@supabase/postgrest-js/dist/module/lib/constants.js
var DEFAULT_HEADERS3 = { "X-Client-Info": `postgrest-js/${version3}` };

// node_modules/@supabase/postgrest-js/dist/module/PostgrestClient.js
var PostgrestClient = class {
  constructor(url, { headers = {}, schema, fetch: fetch2 } = {}) {
    this.url = url;
    this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS3), headers);
    this.schema = schema;
    this.fetch = fetch2;
  }
  auth(token) {
    this.headers["Authorization"] = `Bearer ${token}`;
    return this;
  }
  from(table) {
    const url = `${this.url}/${table}`;
    return new PostgrestQueryBuilder(url, {
      headers: this.headers,
      schema: this.schema,
      fetch: this.fetch
    });
  }
  rpc(fn, params, { head = false, count = null } = {}) {
    const url = `${this.url}/rpc/${fn}`;
    return new PostgrestRpcBuilder(url, {
      headers: this.headers,
      schema: this.schema,
      fetch: this.fetch
    }).rpc(params, { head, count });
  }
};

// node_modules/@supabase/supabase-js/dist/module/lib/SupabaseRealtimeClient.js
init_react();

// node_modules/@supabase/realtime-js/dist/module/index.js
init_react();

// node_modules/@supabase/realtime-js/dist/module/lib/transformers.js
var transformers_exports = {};
__export(transformers_exports, {
  PostgresTypes: () => PostgresTypes,
  convertCell: () => convertCell,
  convertChangeData: () => convertChangeData,
  convertColumn: () => convertColumn,
  toArray: () => toArray,
  toBoolean: () => toBoolean,
  toJson: () => toJson,
  toNumber: () => toNumber,
  toTimestampString: () => toTimestampString
});
init_react();
var PostgresTypes;
(function(PostgresTypes2) {
  PostgresTypes2["abstime"] = "abstime";
  PostgresTypes2["bool"] = "bool";
  PostgresTypes2["date"] = "date";
  PostgresTypes2["daterange"] = "daterange";
  PostgresTypes2["float4"] = "float4";
  PostgresTypes2["float8"] = "float8";
  PostgresTypes2["int2"] = "int2";
  PostgresTypes2["int4"] = "int4";
  PostgresTypes2["int4range"] = "int4range";
  PostgresTypes2["int8"] = "int8";
  PostgresTypes2["int8range"] = "int8range";
  PostgresTypes2["json"] = "json";
  PostgresTypes2["jsonb"] = "jsonb";
  PostgresTypes2["money"] = "money";
  PostgresTypes2["numeric"] = "numeric";
  PostgresTypes2["oid"] = "oid";
  PostgresTypes2["reltime"] = "reltime";
  PostgresTypes2["text"] = "text";
  PostgresTypes2["time"] = "time";
  PostgresTypes2["timestamp"] = "timestamp";
  PostgresTypes2["timestamptz"] = "timestamptz";
  PostgresTypes2["timetz"] = "timetz";
  PostgresTypes2["tsrange"] = "tsrange";
  PostgresTypes2["tstzrange"] = "tstzrange";
})(PostgresTypes || (PostgresTypes = {}));
var convertChangeData = (columns, record, options = {}) => {
  var _a;
  const skipTypes = (_a = options.skipTypes) !== null && _a !== void 0 ? _a : [];
  return Object.keys(record).reduce((acc, rec_key) => {
    acc[rec_key] = convertColumn(rec_key, columns, record, skipTypes);
    return acc;
  }, {});
};
var convertColumn = (columnName, columns, record, skipTypes) => {
  const column = columns.find((x) => x.name === columnName);
  const colType = column === null || column === void 0 ? void 0 : column.type;
  const value = record[columnName];
  if (colType && !skipTypes.includes(colType)) {
    return convertCell(colType, value);
  }
  return noop(value);
};
var convertCell = (type, value) => {
  if (type.charAt(0) === "_") {
    const dataType = type.slice(1, type.length);
    return toArray(value, dataType);
  }
  switch (type) {
    case PostgresTypes.bool:
      return toBoolean(value);
    case PostgresTypes.float4:
    case PostgresTypes.float8:
    case PostgresTypes.int2:
    case PostgresTypes.int4:
    case PostgresTypes.int8:
    case PostgresTypes.numeric:
    case PostgresTypes.oid:
      return toNumber(value);
    case PostgresTypes.json:
    case PostgresTypes.jsonb:
      return toJson(value);
    case PostgresTypes.timestamp:
      return toTimestampString(value);
    case PostgresTypes.abstime:
    case PostgresTypes.date:
    case PostgresTypes.daterange:
    case PostgresTypes.int4range:
    case PostgresTypes.int8range:
    case PostgresTypes.money:
    case PostgresTypes.reltime:
    case PostgresTypes.text:
    case PostgresTypes.time:
    case PostgresTypes.timestamptz:
    case PostgresTypes.timetz:
    case PostgresTypes.tsrange:
    case PostgresTypes.tstzrange:
      return noop(value);
    default:
      return noop(value);
  }
};
var noop = (value) => {
  return value;
};
var toBoolean = (value) => {
  switch (value) {
    case "t":
      return true;
    case "f":
      return false;
    default:
      return value;
  }
};
var toNumber = (value) => {
  if (typeof value === "string") {
    const parsedValue = parseFloat(value);
    if (!Number.isNaN(parsedValue)) {
      return parsedValue;
    }
  }
  return value;
};
var toJson = (value) => {
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch (error) {
      console.log(`JSON parse error: ${error}`);
      return value;
    }
  }
  return value;
};
var toArray = (value, type) => {
  if (typeof value !== "string") {
    return value;
  }
  const lastIdx = value.length - 1;
  const closeBrace = value[lastIdx];
  const openBrace = value[0];
  if (openBrace === "{" && closeBrace === "}") {
    let arr;
    const valTrim = value.slice(1, lastIdx);
    try {
      arr = JSON.parse("[" + valTrim + "]");
    } catch (_) {
      arr = valTrim ? valTrim.split(",") : [];
    }
    return arr.map((val) => convertCell(type, val));
  }
  return value;
};
var toTimestampString = (value) => {
  if (typeof value === "string") {
    return value.replace(" ", "T");
  }
  return value;
};

// node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js
init_react();

// node_modules/@supabase/realtime-js/dist/module/lib/constants.js
init_react();

// node_modules/@supabase/realtime-js/dist/module/lib/version.js
init_react();
var version4 = "1.3.1";

// node_modules/@supabase/realtime-js/dist/module/lib/constants.js
var DEFAULT_HEADERS4 = { "X-Client-Info": `realtime-js/${version4}` };
var VSN = "1.0.0";
var DEFAULT_TIMEOUT = 1e4;
var WS_CLOSE_NORMAL = 1e3;
var SOCKET_STATES;
(function(SOCKET_STATES2) {
  SOCKET_STATES2[SOCKET_STATES2["connecting"] = 0] = "connecting";
  SOCKET_STATES2[SOCKET_STATES2["open"] = 1] = "open";
  SOCKET_STATES2[SOCKET_STATES2["closing"] = 2] = "closing";
  SOCKET_STATES2[SOCKET_STATES2["closed"] = 3] = "closed";
})(SOCKET_STATES || (SOCKET_STATES = {}));
var CHANNEL_STATES;
(function(CHANNEL_STATES2) {
  CHANNEL_STATES2["closed"] = "closed";
  CHANNEL_STATES2["errored"] = "errored";
  CHANNEL_STATES2["joined"] = "joined";
  CHANNEL_STATES2["joining"] = "joining";
  CHANNEL_STATES2["leaving"] = "leaving";
})(CHANNEL_STATES || (CHANNEL_STATES = {}));
var CHANNEL_EVENTS;
(function(CHANNEL_EVENTS2) {
  CHANNEL_EVENTS2["close"] = "phx_close";
  CHANNEL_EVENTS2["error"] = "phx_error";
  CHANNEL_EVENTS2["join"] = "phx_join";
  CHANNEL_EVENTS2["reply"] = "phx_reply";
  CHANNEL_EVENTS2["leave"] = "phx_leave";
  CHANNEL_EVENTS2["access_token"] = "access_token";
})(CHANNEL_EVENTS || (CHANNEL_EVENTS = {}));
var TRANSPORTS;
(function(TRANSPORTS2) {
  TRANSPORTS2["websocket"] = "websocket";
})(TRANSPORTS || (TRANSPORTS = {}));

// node_modules/@supabase/realtime-js/dist/module/lib/timer.js
init_react();
var Timer = class {
  constructor(callback, timerCalc) {
    this.callback = callback;
    this.timerCalc = timerCalc;
    this.timer = void 0;
    this.tries = 0;
    this.callback = callback;
    this.timerCalc = timerCalc;
  }
  reset() {
    this.tries = 0;
    clearTimeout(this.timer);
  }
  scheduleTimeout() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.tries = this.tries + 1;
      this.callback();
    }, this.timerCalc(this.tries + 1));
  }
};

// node_modules/@supabase/realtime-js/dist/module/RealtimeSubscription.js
init_react();

// node_modules/@supabase/realtime-js/dist/module/lib/push.js
init_react();
var Push = class {
  constructor(channel, event, payload = {}, timeout = DEFAULT_TIMEOUT) {
    this.channel = channel;
    this.event = event;
    this.payload = payload;
    this.timeout = timeout;
    this.sent = false;
    this.timeoutTimer = void 0;
    this.ref = "";
    this.receivedResp = null;
    this.recHooks = [];
    this.refEvent = null;
  }
  resend(timeout) {
    this.timeout = timeout;
    this._cancelRefEvent();
    this.ref = "";
    this.refEvent = null;
    this.receivedResp = null;
    this.sent = false;
    this.send();
  }
  send() {
    if (this._hasReceived("timeout")) {
      return;
    }
    this.startTimeout();
    this.sent = true;
    this.channel.socket.push({
      topic: this.channel.topic,
      event: this.event,
      payload: this.payload,
      ref: this.ref
    });
  }
  receive(status, callback) {
    var _a;
    if (this._hasReceived(status)) {
      callback((_a = this.receivedResp) === null || _a === void 0 ? void 0 : _a.response);
    }
    this.recHooks.push({ status, callback });
    return this;
  }
  startTimeout() {
    if (this.timeoutTimer) {
      return;
    }
    this.ref = this.channel.socket.makeRef();
    this.refEvent = this.channel.replyEventName(this.ref);
    this.channel.on(this.refEvent, (payload) => {
      this._cancelRefEvent();
      this._cancelTimeout();
      this.receivedResp = payload;
      this._matchReceive(payload);
    });
    this.timeoutTimer = setTimeout(() => {
      this.trigger("timeout", {});
    }, this.timeout);
  }
  trigger(status, response) {
    if (this.refEvent)
      this.channel.trigger(this.refEvent, { status, response });
  }
  destroy() {
    this._cancelRefEvent();
    this._cancelTimeout();
  }
  _cancelRefEvent() {
    if (!this.refEvent) {
      return;
    }
    this.channel.off(this.refEvent);
  }
  _cancelTimeout() {
    clearTimeout(this.timeoutTimer);
    this.timeoutTimer = void 0;
  }
  _matchReceive({ status, response }) {
    this.recHooks.filter((h) => h.status === status).forEach((h) => h.callback(response));
  }
  _hasReceived(status) {
    return this.receivedResp && this.receivedResp.status === status;
  }
};

// node_modules/@supabase/realtime-js/dist/module/RealtimeSubscription.js
var RealtimeSubscription = class {
  constructor(topic, params = {}, socket) {
    this.topic = topic;
    this.params = params;
    this.socket = socket;
    this.bindings = [];
    this.state = CHANNEL_STATES.closed;
    this.joinedOnce = false;
    this.pushBuffer = [];
    this.timeout = this.socket.timeout;
    this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
    this.rejoinTimer = new Timer(() => this.rejoinUntilConnected(), this.socket.reconnectAfterMs);
    this.joinPush.receive("ok", () => {
      this.state = CHANNEL_STATES.joined;
      this.rejoinTimer.reset();
      this.pushBuffer.forEach((pushEvent) => pushEvent.send());
      this.pushBuffer = [];
    });
    this.onClose(() => {
      this.rejoinTimer.reset();
      this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`);
      this.state = CHANNEL_STATES.closed;
      this.socket.remove(this);
    });
    this.onError((reason) => {
      if (this.isLeaving() || this.isClosed()) {
        return;
      }
      this.socket.log("channel", `error ${this.topic}`, reason);
      this.state = CHANNEL_STATES.errored;
      this.rejoinTimer.scheduleTimeout();
    });
    this.joinPush.receive("timeout", () => {
      if (!this.isJoining()) {
        return;
      }
      this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout);
      this.state = CHANNEL_STATES.errored;
      this.rejoinTimer.scheduleTimeout();
    });
    this.on(CHANNEL_EVENTS.reply, (payload, ref) => {
      this.trigger(this.replyEventName(ref), payload);
    });
  }
  rejoinUntilConnected() {
    this.rejoinTimer.scheduleTimeout();
    if (this.socket.isConnected()) {
      this.rejoin();
    }
  }
  subscribe(timeout = this.timeout) {
    if (this.joinedOnce) {
      throw `tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance`;
    } else {
      this.joinedOnce = true;
      this.rejoin(timeout);
      return this.joinPush;
    }
  }
  onClose(callback) {
    this.on(CHANNEL_EVENTS.close, callback);
  }
  onError(callback) {
    this.on(CHANNEL_EVENTS.error, (reason) => callback(reason));
  }
  on(event, callback) {
    this.bindings.push({ event, callback });
  }
  off(event) {
    this.bindings = this.bindings.filter((bind) => bind.event !== event);
  }
  canPush() {
    return this.socket.isConnected() && this.isJoined();
  }
  push(event, payload, timeout = this.timeout) {
    if (!this.joinedOnce) {
      throw `tried to push '${event}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
    }
    let pushEvent = new Push(this, event, payload, timeout);
    if (this.canPush()) {
      pushEvent.send();
    } else {
      pushEvent.startTimeout();
      this.pushBuffer.push(pushEvent);
    }
    return pushEvent;
  }
  unsubscribe(timeout = this.timeout) {
    this.state = CHANNEL_STATES.leaving;
    let onClose = () => {
      this.socket.log("channel", `leave ${this.topic}`);
      this.trigger(CHANNEL_EVENTS.close, "leave", this.joinRef());
    };
    this.joinPush.destroy();
    let leavePush = new Push(this, CHANNEL_EVENTS.leave, {}, timeout);
    leavePush.receive("ok", () => onClose()).receive("timeout", () => onClose());
    leavePush.send();
    if (!this.canPush()) {
      leavePush.trigger("ok", {});
    }
    return leavePush;
  }
  onMessage(event, payload, ref) {
    return payload;
  }
  isMember(topic) {
    return this.topic === topic;
  }
  joinRef() {
    return this.joinPush.ref;
  }
  sendJoin(timeout) {
    this.state = CHANNEL_STATES.joining;
    this.joinPush.resend(timeout);
  }
  rejoin(timeout = this.timeout) {
    if (this.isLeaving()) {
      return;
    }
    this.sendJoin(timeout);
  }
  trigger(event, payload, ref) {
    let { close, error, leave, join } = CHANNEL_EVENTS;
    let events = [close, error, leave, join];
    if (ref && events.indexOf(event) >= 0 && ref !== this.joinRef()) {
      return;
    }
    let handledPayload = this.onMessage(event, payload, ref);
    if (payload && !handledPayload) {
      throw "channel onMessage callbacks must return the payload, modified or unmodified";
    }
    this.bindings.filter((bind) => {
      if (bind.event === "*") {
        return event === (payload === null || payload === void 0 ? void 0 : payload.type);
      } else {
        return bind.event === event;
      }
    }).map((bind) => bind.callback(handledPayload, ref));
  }
  replyEventName(ref) {
    return `chan_reply_${ref}`;
  }
  isClosed() {
    return this.state === CHANNEL_STATES.closed;
  }
  isErrored() {
    return this.state === CHANNEL_STATES.errored;
  }
  isJoined() {
    return this.state === CHANNEL_STATES.joined;
  }
  isJoining() {
    return this.state === CHANNEL_STATES.joining;
  }
  isLeaving() {
    return this.state === CHANNEL_STATES.leaving;
  }
};

// node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js
var import_websocket = __toModule(require_browser());

// node_modules/@supabase/realtime-js/dist/module/lib/serializer.js
init_react();
var Serializer = class {
  constructor() {
    this.HEADER_LENGTH = 1;
  }
  decode(rawPayload, callback) {
    if (rawPayload.constructor === ArrayBuffer) {
      return callback(this._binaryDecode(rawPayload));
    }
    if (typeof rawPayload === "string") {
      return callback(JSON.parse(rawPayload));
    }
    return callback({});
  }
  _binaryDecode(buffer) {
    const view = new DataView(buffer);
    const decoder = new TextDecoder();
    return this._decodeBroadcast(buffer, view, decoder);
  }
  _decodeBroadcast(buffer, view, decoder) {
    const topicSize = view.getUint8(1);
    const eventSize = view.getUint8(2);
    let offset = this.HEADER_LENGTH + 2;
    const topic = decoder.decode(buffer.slice(offset, offset + topicSize));
    offset = offset + topicSize;
    const event = decoder.decode(buffer.slice(offset, offset + eventSize));
    offset = offset + eventSize;
    const data = JSON.parse(decoder.decode(buffer.slice(offset, buffer.byteLength)));
    return { ref: null, topic, event, payload: data };
  }
};

// node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js
var __awaiter5 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var noop2 = () => {
};
var RealtimeClient = class {
  constructor(endPoint, options) {
    this.accessToken = null;
    this.channels = [];
    this.endPoint = "";
    this.headers = DEFAULT_HEADERS4;
    this.params = {};
    this.timeout = DEFAULT_TIMEOUT;
    this.transport = import_websocket.w3cwebsocket;
    this.heartbeatIntervalMs = 3e4;
    this.longpollerTimeout = 2e4;
    this.heartbeatTimer = void 0;
    this.pendingHeartbeatRef = null;
    this.ref = 0;
    this.logger = noop2;
    this.conn = null;
    this.sendBuffer = [];
    this.serializer = new Serializer();
    this.stateChangeCallbacks = {
      open: [],
      close: [],
      error: [],
      message: []
    };
    this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
    if (options === null || options === void 0 ? void 0 : options.params)
      this.params = options.params;
    if (options === null || options === void 0 ? void 0 : options.headers)
      this.headers = Object.assign(Object.assign({}, this.headers), options.headers);
    if (options === null || options === void 0 ? void 0 : options.timeout)
      this.timeout = options.timeout;
    if (options === null || options === void 0 ? void 0 : options.logger)
      this.logger = options.logger;
    if (options === null || options === void 0 ? void 0 : options.transport)
      this.transport = options.transport;
    if (options === null || options === void 0 ? void 0 : options.heartbeatIntervalMs)
      this.heartbeatIntervalMs = options.heartbeatIntervalMs;
    if (options === null || options === void 0 ? void 0 : options.longpollerTimeout)
      this.longpollerTimeout = options.longpollerTimeout;
    this.reconnectAfterMs = (options === null || options === void 0 ? void 0 : options.reconnectAfterMs) ? options.reconnectAfterMs : (tries) => {
      return [1e3, 2e3, 5e3, 1e4][tries - 1] || 1e4;
    };
    this.encode = (options === null || options === void 0 ? void 0 : options.encode) ? options.encode : (payload, callback) => {
      return callback(JSON.stringify(payload));
    };
    this.decode = (options === null || options === void 0 ? void 0 : options.decode) ? options.decode : this.serializer.decode.bind(this.serializer);
    this.reconnectTimer = new Timer(() => __awaiter5(this, void 0, void 0, function* () {
      yield this.disconnect();
      this.connect();
    }), this.reconnectAfterMs);
  }
  connect() {
    if (this.conn) {
      return;
    }
    this.conn = new this.transport(this.endPointURL(), [], null, this.headers);
    if (this.conn) {
      this.conn.binaryType = "arraybuffer";
      this.conn.onopen = () => this._onConnOpen();
      this.conn.onerror = (error) => this._onConnError(error);
      this.conn.onmessage = (event) => this.onConnMessage(event);
      this.conn.onclose = (event) => this._onConnClose(event);
    }
  }
  disconnect(code, reason) {
    return new Promise((resolve, _reject) => {
      try {
        if (this.conn) {
          this.conn.onclose = function() {
          };
          if (code) {
            this.conn.close(code, reason || "");
          } else {
            this.conn.close();
          }
          this.conn = null;
          this.heartbeatTimer && clearInterval(this.heartbeatTimer);
          this.reconnectTimer.reset();
        }
        resolve({ error: null, data: true });
      } catch (error) {
        resolve({ error, data: false });
      }
    });
  }
  log(kind, msg, data) {
    this.logger(kind, msg, data);
  }
  onOpen(callback) {
    this.stateChangeCallbacks.open.push(callback);
  }
  onClose(callback) {
    this.stateChangeCallbacks.close.push(callback);
  }
  onError(callback) {
    this.stateChangeCallbacks.error.push(callback);
  }
  onMessage(callback) {
    this.stateChangeCallbacks.message.push(callback);
  }
  connectionState() {
    switch (this.conn && this.conn.readyState) {
      case SOCKET_STATES.connecting:
        return "connecting";
      case SOCKET_STATES.open:
        return "open";
      case SOCKET_STATES.closing:
        return "closing";
      default:
        return "closed";
    }
  }
  isConnected() {
    return this.connectionState() === "open";
  }
  remove(channel) {
    this.channels = this.channels.filter((c) => c.joinRef() !== channel.joinRef());
  }
  channel(topic, chanParams = {}) {
    let chan = new RealtimeSubscription(topic, chanParams, this);
    this.channels.push(chan);
    return chan;
  }
  push(data) {
    let { topic, event, payload, ref } = data;
    let callback = () => {
      this.encode(data, (result) => {
        var _a;
        (_a = this.conn) === null || _a === void 0 ? void 0 : _a.send(result);
      });
    };
    this.log("push", `${topic} ${event} (${ref})`, payload);
    if (this.isConnected()) {
      callback();
    } else {
      this.sendBuffer.push(callback);
    }
  }
  onConnMessage(rawMessage) {
    this.decode(rawMessage.data, (msg) => {
      let { topic, event, payload, ref } = msg;
      if (ref && ref === this.pendingHeartbeatRef) {
        this.pendingHeartbeatRef = null;
      } else if (event === (payload === null || payload === void 0 ? void 0 : payload.type)) {
        this._resetHeartbeat();
      }
      this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`, payload);
      this.channels.filter((channel) => channel.isMember(topic)).forEach((channel) => channel.trigger(event, payload, ref));
      this.stateChangeCallbacks.message.forEach((callback) => callback(msg));
    });
  }
  endPointURL() {
    return this._appendParams(this.endPoint, Object.assign({}, this.params, { vsn: VSN }));
  }
  makeRef() {
    let newRef = this.ref + 1;
    if (newRef === this.ref) {
      this.ref = 0;
    } else {
      this.ref = newRef;
    }
    return this.ref.toString();
  }
  setAuth(token) {
    this.accessToken = token;
    this.channels.forEach((channel) => channel.joinedOnce && channel.push(CHANNEL_EVENTS.access_token, {
      access_token: token
    }));
  }
  _onConnOpen() {
    this.log("transport", `connected to ${this.endPointURL()}`);
    this._flushSendBuffer();
    this.reconnectTimer.reset();
    this._resetHeartbeat();
    this.stateChangeCallbacks.open.forEach((callback) => callback());
  }
  _onConnClose(event) {
    this.log("transport", "close", event);
    this._triggerChanError();
    this.heartbeatTimer && clearInterval(this.heartbeatTimer);
    this.reconnectTimer.scheduleTimeout();
    this.stateChangeCallbacks.close.forEach((callback) => callback(event));
  }
  _onConnError(error) {
    this.log("transport", error.message);
    this._triggerChanError();
    this.stateChangeCallbacks.error.forEach((callback) => callback(error));
  }
  _triggerChanError() {
    this.channels.forEach((channel) => channel.trigger(CHANNEL_EVENTS.error));
  }
  _appendParams(url, params) {
    if (Object.keys(params).length === 0) {
      return url;
    }
    const prefix = url.match(/\?/) ? "&" : "?";
    const query = new URLSearchParams(params);
    return `${url}${prefix}${query}`;
  }
  _flushSendBuffer() {
    if (this.isConnected() && this.sendBuffer.length > 0) {
      this.sendBuffer.forEach((callback) => callback());
      this.sendBuffer = [];
    }
  }
  _resetHeartbeat() {
    this.pendingHeartbeatRef = null;
    this.heartbeatTimer && clearInterval(this.heartbeatTimer);
    this.heartbeatTimer = setInterval(() => this._sendHeartbeat(), this.heartbeatIntervalMs);
  }
  _sendHeartbeat() {
    var _a;
    if (!this.isConnected()) {
      return;
    }
    if (this.pendingHeartbeatRef) {
      this.pendingHeartbeatRef = null;
      this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
      (_a = this.conn) === null || _a === void 0 ? void 0 : _a.close(WS_CLOSE_NORMAL, "hearbeat timeout");
      return;
    }
    this.pendingHeartbeatRef = this.makeRef();
    this.setAuth(this.accessToken);
  }
};

// node_modules/@supabase/supabase-js/dist/module/lib/SupabaseRealtimeClient.js
var SupabaseRealtimeClient = class {
  constructor(socket, headers, schema, tableName) {
    const chanParams = {};
    const topic = tableName === "*" ? `realtime:${schema}` : `realtime:${schema}:${tableName}`;
    const userToken = headers["Authorization"].split(" ")[1];
    if (userToken) {
      chanParams["user_token"] = userToken;
    }
    this.subscription = socket.channel(topic, chanParams);
  }
  getPayloadRecords(payload) {
    const records = {
      new: {},
      old: {}
    };
    if (payload.type === "INSERT" || payload.type === "UPDATE") {
      records.new = transformers_exports.convertChangeData(payload.columns, payload.record);
    }
    if (payload.type === "UPDATE" || payload.type === "DELETE") {
      records.old = transformers_exports.convertChangeData(payload.columns, payload.old_record);
    }
    return records;
  }
  on(event, callback) {
    this.subscription.on(event, (payload) => {
      let enrichedPayload = {
        schema: payload.schema,
        table: payload.table,
        commit_timestamp: payload.commit_timestamp,
        eventType: payload.type,
        new: {},
        old: {}
      };
      enrichedPayload = Object.assign(Object.assign({}, enrichedPayload), this.getPayloadRecords(payload));
      callback(enrichedPayload);
    });
    return this;
  }
  subscribe(callback = () => {
  }) {
    this.subscription.onError((e) => callback("SUBSCRIPTION_ERROR", e));
    this.subscription.onClose(() => callback("CLOSED"));
    this.subscription.subscribe().receive("ok", () => callback("SUBSCRIBED")).receive("error", (e) => callback("SUBSCRIPTION_ERROR", e)).receive("timeout", () => callback("RETRYING_AFTER_TIMEOUT"));
    return this.subscription;
  }
};

// node_modules/@supabase/supabase-js/dist/module/lib/SupabaseQueryBuilder.js
var SupabaseQueryBuilder = class extends PostgrestQueryBuilder {
  constructor(url, { headers = {}, schema, realtime, table, fetch: fetch2 }) {
    super(url, { headers, schema, fetch: fetch2 });
    this._subscription = new SupabaseRealtimeClient(realtime, headers, schema, table);
    this._realtime = realtime;
  }
  on(event, callback) {
    if (!this._realtime.isConnected()) {
      this._realtime.connect();
    }
    return this._subscription.on(event, callback);
  }
};

// node_modules/@supabase/storage-js/dist/module/index.js
init_react();

// node_modules/@supabase/storage-js/dist/module/SupabaseStorageClient.js
init_react();

// node_modules/@supabase/storage-js/dist/module/lib/StorageBucketApi.js
init_react();

// node_modules/@supabase/storage-js/dist/module/lib/fetch.js
init_react();
var import_cross_fetch3 = __toModule(require_browser_ponyfill());
var __awaiter6 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var _getErrorMessage2 = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
var handleError2 = (error, reject) => {
  if (typeof error.json !== "function") {
    return reject(error);
  }
  error.json().then((err) => {
    return reject({
      message: _getErrorMessage2(err),
      status: (error === null || error === void 0 ? void 0 : error.status) || 500
    });
  });
};
var _getRequestParams2 = (method, options, parameters, body) => {
  const params = { method, headers: (options === null || options === void 0 ? void 0 : options.headers) || {} };
  if (method === "GET") {
    return params;
  }
  params.headers = Object.assign({ "Content-Type": "application/json" }, options === null || options === void 0 ? void 0 : options.headers);
  params.body = JSON.stringify(body);
  return Object.assign(Object.assign({}, params), parameters);
};
function _handleRequest2(fetcher = import_cross_fetch3.default, method, url, options, parameters, body) {
  return __awaiter6(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      fetcher(url, _getRequestParams2(method, options, parameters, body)).then((result) => {
        if (!result.ok)
          throw result;
        if (options === null || options === void 0 ? void 0 : options.noResolveJson)
          return resolve(result);
        return result.json();
      }).then((data) => resolve(data)).catch((error) => handleError2(error, reject));
    });
  });
}
function get2(fetcher, url, options, parameters) {
  return __awaiter6(this, void 0, void 0, function* () {
    return _handleRequest2(fetcher, "GET", url, options, parameters);
  });
}
function post2(fetcher, url, body, options, parameters) {
  return __awaiter6(this, void 0, void 0, function* () {
    return _handleRequest2(fetcher, "POST", url, options, parameters, body);
  });
}
function put2(fetcher, url, body, options, parameters) {
  return __awaiter6(this, void 0, void 0, function* () {
    return _handleRequest2(fetcher, "PUT", url, options, parameters, body);
  });
}
function remove2(fetcher, url, body, options, parameters) {
  return __awaiter6(this, void 0, void 0, function* () {
    return _handleRequest2(fetcher, "DELETE", url, options, parameters, body);
  });
}

// node_modules/@supabase/storage-js/dist/module/lib/constants.js
init_react();

// node_modules/@supabase/storage-js/dist/module/lib/version.js
init_react();
var version5 = "0.0.0";

// node_modules/@supabase/storage-js/dist/module/lib/constants.js
var DEFAULT_HEADERS5 = { "X-Client-Info": `storage-js/${version5}` };

// node_modules/@supabase/storage-js/dist/module/lib/StorageBucketApi.js
var __awaiter7 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var StorageBucketApi = class {
  constructor(url, headers = {}, fetch2) {
    this.url = url;
    this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS5), headers);
    this.fetch = fetch2;
  }
  listBuckets() {
    return __awaiter7(this, void 0, void 0, function* () {
      try {
        const data = yield get2(this.fetch, `${this.url}/bucket`, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        return { data: null, error };
      }
    });
  }
  getBucket(id) {
    return __awaiter7(this, void 0, void 0, function* () {
      try {
        const data = yield get2(this.fetch, `${this.url}/bucket/${id}`, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        return { data: null, error };
      }
    });
  }
  createBucket(id, options = { public: false }) {
    return __awaiter7(this, void 0, void 0, function* () {
      try {
        const data = yield post2(this.fetch, `${this.url}/bucket`, { id, name: id, public: options.public }, { headers: this.headers });
        return { data: data.name, error: null };
      } catch (error) {
        return { data: null, error };
      }
    });
  }
  updateBucket(id, options) {
    return __awaiter7(this, void 0, void 0, function* () {
      try {
        const data = yield put2(this.fetch, `${this.url}/bucket/${id}`, { id, name: id, public: options.public }, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        return { data: null, error };
      }
    });
  }
  emptyBucket(id) {
    return __awaiter7(this, void 0, void 0, function* () {
      try {
        const data = yield post2(this.fetch, `${this.url}/bucket/${id}/empty`, {}, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        return { data: null, error };
      }
    });
  }
  deleteBucket(id) {
    return __awaiter7(this, void 0, void 0, function* () {
      try {
        const data = yield remove2(this.fetch, `${this.url}/bucket/${id}`, {}, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        return { data: null, error };
      }
    });
  }
};

// node_modules/@supabase/storage-js/dist/module/lib/StorageFileApi.js
init_react();
var import_cross_fetch4 = __toModule(require_browser_ponyfill());
var __awaiter8 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var DEFAULT_SEARCH_OPTIONS = {
  limit: 100,
  offset: 0,
  sortBy: {
    column: "name",
    order: "asc"
  }
};
var DEFAULT_FILE_OPTIONS = {
  cacheControl: "3600",
  contentType: "text/plain;charset=UTF-8",
  upsert: false
};
var StorageFileApi = class {
  constructor(url, headers = {}, bucketId, fetch2) {
    this.url = url;
    this.headers = headers;
    this.bucketId = bucketId;
    this.fetch = fetch2;
  }
  uploadOrUpdate(method, path, fileBody, fileOptions) {
    return __awaiter8(this, void 0, void 0, function* () {
      try {
        let body;
        const options = Object.assign(Object.assign({}, DEFAULT_FILE_OPTIONS), fileOptions);
        const headers = Object.assign(Object.assign({}, this.headers), method === "POST" && { "x-upsert": String(options.upsert) });
        if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
          body = new FormData();
          body.append("cacheControl", options.cacheControl);
          body.append("", fileBody);
        } else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
          body = fileBody;
          body.append("cacheControl", options.cacheControl);
        } else {
          body = fileBody;
          headers["cache-control"] = `max-age=${options.cacheControl}`;
          headers["content-type"] = options.contentType;
        }
        const _path = this._getFinalPath(path);
        const res = yield (0, import_cross_fetch4.default)(`${this.url}/object/${_path}`, {
          method,
          body,
          headers
        });
        if (res.ok) {
          return { data: { Key: _path }, error: null };
        } else {
          const error = yield res.json();
          return { data: null, error };
        }
      } catch (error) {
        return { data: null, error };
      }
    });
  }
  upload(path, fileBody, fileOptions) {
    return __awaiter8(this, void 0, void 0, function* () {
      return this.uploadOrUpdate("POST", path, fileBody, fileOptions);
    });
  }
  update(path, fileBody, fileOptions) {
    return __awaiter8(this, void 0, void 0, function* () {
      return this.uploadOrUpdate("PUT", path, fileBody, fileOptions);
    });
  }
  move(fromPath, toPath) {
    return __awaiter8(this, void 0, void 0, function* () {
      try {
        const data = yield post2(this.fetch, `${this.url}/object/move`, { bucketId: this.bucketId, sourceKey: fromPath, destinationKey: toPath }, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        return { data: null, error };
      }
    });
  }
  createSignedUrl(path, expiresIn) {
    return __awaiter8(this, void 0, void 0, function* () {
      try {
        const _path = this._getFinalPath(path);
        let data = yield post2(this.fetch, `${this.url}/object/sign/${_path}`, { expiresIn }, { headers: this.headers });
        const signedURL = `${this.url}${data.signedURL}`;
        data = { signedURL };
        return { data, error: null, signedURL };
      } catch (error) {
        return { data: null, error, signedURL: null };
      }
    });
  }
  download(path) {
    return __awaiter8(this, void 0, void 0, function* () {
      try {
        const _path = this._getFinalPath(path);
        const res = yield get2(this.fetch, `${this.url}/object/${_path}`, {
          headers: this.headers,
          noResolveJson: true
        });
        const data = yield res.blob();
        return { data, error: null };
      } catch (error) {
        return { data: null, error };
      }
    });
  }
  getPublicUrl(path) {
    try {
      const _path = this._getFinalPath(path);
      const publicURL = `${this.url}/object/public/${_path}`;
      const data = { publicURL };
      return { data, error: null, publicURL };
    } catch (error) {
      return { data: null, error, publicURL: null };
    }
  }
  remove(paths) {
    return __awaiter8(this, void 0, void 0, function* () {
      try {
        const data = yield remove2(this.fetch, `${this.url}/object/${this.bucketId}`, { prefixes: paths }, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        return { data: null, error };
      }
    });
  }
  list(path, options, parameters) {
    return __awaiter8(this, void 0, void 0, function* () {
      try {
        const body = Object.assign(Object.assign(Object.assign({}, DEFAULT_SEARCH_OPTIONS), options), { prefix: path || "" });
        const data = yield post2(this.fetch, `${this.url}/object/list/${this.bucketId}`, body, { headers: this.headers }, parameters);
        return { data, error: null };
      } catch (error) {
        return { data: null, error };
      }
    });
  }
  _getFinalPath(path) {
    return `${this.bucketId}/${path}`;
  }
};

// node_modules/@supabase/storage-js/dist/module/SupabaseStorageClient.js
var SupabaseStorageClient = class extends StorageBucketApi {
  constructor(url, headers = {}, fetch2) {
    super(url, headers, fetch2);
  }
  from(id) {
    return new StorageFileApi(this.url, this.headers, id, this.fetch);
  }
};

// node_modules/@supabase/supabase-js/dist/module/SupabaseClient.js
var __awaiter9 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var DEFAULT_OPTIONS2 = {
  schema: "public",
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
  headers: DEFAULT_HEADERS
};
var SupabaseClient = class {
  constructor(supabaseUrl2, supabaseKey, options) {
    this.supabaseUrl = supabaseUrl2;
    this.supabaseKey = supabaseKey;
    if (!supabaseUrl2)
      throw new Error("supabaseUrl is required.");
    if (!supabaseKey)
      throw new Error("supabaseKey is required.");
    supabaseUrl2 = stripTrailingSlash(supabaseUrl2);
    const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS2), options);
    this.restUrl = `${supabaseUrl2}/rest/v1`;
    this.realtimeUrl = `${supabaseUrl2}/realtime/v1`.replace("http", "ws");
    this.authUrl = `${supabaseUrl2}/auth/v1`;
    this.storageUrl = `${supabaseUrl2}/storage/v1`;
    this.schema = settings.schema;
    this.fetch = settings.fetch;
    this.auth = this._initSupabaseAuthClient(settings);
    this.realtime = this._initRealtimeClient(settings.realtime);
  }
  get storage() {
    return new SupabaseStorageClient(this.storageUrl, this._getAuthHeaders(), this.fetch);
  }
  from(table) {
    const url = `${this.restUrl}/${table}`;
    return new SupabaseQueryBuilder(url, {
      headers: this._getAuthHeaders(),
      schema: this.schema,
      realtime: this.realtime,
      table,
      fetch: this.fetch
    });
  }
  rpc(fn, params, { head = false, count = null } = {}) {
    const rest = this._initPostgRESTClient();
    return rest.rpc(fn, params, { head, count });
  }
  removeSubscription(subscription) {
    return new Promise((resolve) => __awaiter9(this, void 0, void 0, function* () {
      try {
        yield this._closeSubscription(subscription);
        const openSubscriptions = this.getSubscriptions().length;
        if (!openSubscriptions) {
          const { error } = yield this.realtime.disconnect();
          if (error)
            return resolve({ error });
        }
        return resolve({ error: null, data: { openSubscriptions } });
      } catch (error) {
        return resolve({ error });
      }
    }));
  }
  _closeSubscription(subscription) {
    return __awaiter9(this, void 0, void 0, function* () {
      if (!subscription.isClosed()) {
        yield this._closeChannel(subscription);
      }
    });
  }
  getSubscriptions() {
    return this.realtime.channels;
  }
  _initSupabaseAuthClient({ autoRefreshToken, persistSession, detectSessionInUrl, localStorage, headers, fetch: fetch2 }) {
    const authHeaders = {
      Authorization: `Bearer ${this.supabaseKey}`,
      apikey: `${this.supabaseKey}`
    };
    return new SupabaseAuthClient({
      url: this.authUrl,
      headers: Object.assign(Object.assign({}, headers), authHeaders),
      autoRefreshToken,
      persistSession,
      detectSessionInUrl,
      localStorage,
      fetch: fetch2
    });
  }
  _initRealtimeClient(options) {
    return new RealtimeClient(this.realtimeUrl, Object.assign(Object.assign({}, options), { params: Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.params), { apikey: this.supabaseKey }) }));
  }
  _initPostgRESTClient() {
    return new PostgrestClient(this.restUrl, {
      headers: this._getAuthHeaders(),
      schema: this.schema,
      fetch: this.fetch
    });
  }
  _getAuthHeaders() {
    var _a, _b;
    const headers = DEFAULT_HEADERS;
    const authBearer = (_b = (_a = this.auth.session()) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : this.supabaseKey;
    headers["apikey"] = this.supabaseKey;
    headers["Authorization"] = `Bearer ${authBearer}`;
    return headers;
  }
  _closeChannel(subscription) {
    return new Promise((resolve, reject) => {
      subscription.unsubscribe().receive("ok", () => {
        this.realtime.remove(subscription);
        return resolve(true);
      }).receive("error", (e) => reject(e));
    });
  }
};

// node_modules/@supabase/supabase-js/dist/module/index.js
var createClient = (supabaseUrl2, supabaseKey, options) => {
  return new SupabaseClient(supabaseUrl2, supabaseKey, options);
};

// app/db.ts
var supabaseUrl = process.env.SUPABASE_URL || "https://vkriqcdehjjwtzueuscm.supabase.co";
var supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNzkzNDQ0NiwiZXhwIjoxOTUzNTEwNDQ2fQ.q-mvXRaDA6YpnJlqZ5a-DFF911hLN8zleu5e1ypAd_w";
var supabase = createClient(supabaseUrl, supabaseAnonKey);

export {
  supabase
};
//# sourceMappingURL=/build/_shared/chunk-IR7ADMBV.js.map
