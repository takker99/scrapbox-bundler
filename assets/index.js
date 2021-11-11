var x, d, W, P, F, H, A = {
}, O = [], Y = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function k(e, t) {
    for(var n in t)e[n] = t[n];
    return e;
}
function R(e) {
    var t = e.parentNode;
    t && t.removeChild(e);
}
function Z(e, t, n) {
    var o, l, _, s = {
    };
    for(_ in t)_ == "key" ? o = t[_] : _ == "ref" ? l = t[_] : s[_] = t[_];
    if (arguments.length > 2 && (s.children = arguments.length > 3 ? x.call(arguments, 2) : n), typeof e == "function" && e.defaultProps != null) for(_ in e.defaultProps)s[_] === void 0 && (s[_] = e.defaultProps[_]);
    return S(e, s, o, l, null);
}
function S(e, t, n, o, l) {
    var _ = {
        type: e,
        props: t,
        key: n,
        ref: o,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        __h: null,
        constructor: void 0,
        __v: l ?? ++W
    };
    return l == null && d.vnode != null && d.vnode(_), _;
}
function U(e) {
    return e.children;
}
function D(e, t) {
    this.props = e, this.context = t;
}
function C(e, t) {
    if (t == null) return e.__ ? C(e.__, e.__.__k.indexOf(e) + 1) : null;
    for(var n; t < e.__k.length; t++)if ((n = e.__k[t]) != null && n.__e != null) return n.__e;
    return typeof e.type == "function" ? C(e) : null;
}
function B(e) {
    var t, n;
    if ((e = e.__) != null && e.__c != null) {
        for(e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++)if ((n = e.__k[t]) != null && n.__e != null) {
            e.__e = e.__c.base = n.__e;
            break;
        }
        return B(e);
    }
}
function L(e) {
    (!e.__d && (e.__d = !0) && P.push(e) && !T.__r++ || H !== d.debounceRendering) && ((H = d.debounceRendering) || F)(T);
}
function T() {
    for(var e; T.__r = P.length;)e = P.sort(function(t, n) {
        return t.__v.__b - n.__v.__b;
    }), P = [], e.some(function(t) {
        var n, o, l, _, s, u;
        t.__d && (s = (_ = (n = t).__v).__e, (u = n.__P) && (o = [], (l = k({
        }, _)).__v = _.__v + 1, M(u, _, l, n.__n, u.ownerSVGElement !== void 0, _.__h != null ? [
            s
        ] : null, o, s ?? C(_), _.__h), J(o, _), _.__e != s && B(_)));
    });
}
function $(e, t, n, o, l, _, s, u, p, a) {
    var r, v, c, i, f, b, h, y = o && o.__k || O, m = y.length;
    for(n.__k = [], r = 0; r < t.length; r++)if ((i = n.__k[r] = (i = t[r]) == null || typeof i == "boolean" ? null : typeof i == "string" || typeof i == "number" || typeof i == "bigint" ? S(null, i, null, null, i) : Array.isArray(i) ? S(U, {
        children: i
    }, null, null, null) : i.__b > 0 ? S(i.type, i.props, i.key, null, i.__v) : i) != null) {
        if (i.__ = n, i.__b = n.__b + 1, (c = y[r]) === null || c && i.key == c.key && i.type === c.type) y[r] = void 0;
        else for(v = 0; v < m; v++){
            if ((c = y[v]) && i.key == c.key && i.type === c.type) {
                y[v] = void 0;
                break;
            }
            c = null;
        }
        M(e, i, c = c || A, l, _, s, u, p, a), f = i.__e, (v = i.ref) && c.ref != v && (h || (h = []), c.ref && h.push(c.ref, null, i), h.push(v, i.__c || f, i)), f != null ? (b == null && (b = f), typeof i.type == "function" && i.__k === c.__k ? i.__d = p = V(i, p, e) : p = j(e, i, c, y, f, p), typeof n.type == "function" && (n.__d = p)) : p && c.__e == p && p.parentNode != e && (p = C(c));
    }
    for(n.__e = b, r = m; r--;)y[r] != null && (typeof n.type == "function" && y[r].__e != null && y[r].__e == n.__d && (n.__d = C(o, r + 1)), Q(y[r], y[r]));
    if (h) for(r = 0; r < h.length; r++)K(h[r], h[++r], h[++r]);
}
function V(e, t, n) {
    for(var o, l = e.__k, _ = 0; l && _ < l.length; _++)(o = l[_]) && (o.__ = e, t = typeof o.type == "function" ? V(o, t, n) : j(n, o, o, l, o.__e, t));
    return t;
}
function j(e, t, n, o, l, _) {
    var s, u, p;
    if (t.__d !== void 0) s = t.__d, t.__d = void 0;
    else if (n == null || l != _ || l.parentNode == null) e: if (_ == null || _.parentNode !== e) e.appendChild(l), s = null;
    else {
        for(u = _, p = 0; (u = u.nextSibling) && p < o.length; p += 2)if (u == l) break e;
        e.insertBefore(l, _), s = _;
    }
    return s !== void 0 ? s : l.nextSibling;
}
function te(e, t, n, o, l) {
    var _;
    for(_ in n)_ === "children" || _ === "key" || _ in t || N(e, _, null, n[_], o);
    for(_ in t)l && typeof t[_] != "function" || _ === "children" || _ === "key" || _ === "value" || _ === "checked" || n[_] === t[_] || N(e, _, t[_], n[_], o);
}
function z(e, t, n) {
    t[0] === "-" ? e.setProperty(t, n) : e[t] = n == null ? "" : typeof n != "number" || Y.test(t) ? n : n + "px";
}
function N(e, t, n, o, l) {
    var _;
    e: if (t === "style") if (typeof n == "string") e.style.cssText = n;
    else {
        if (typeof o == "string" && (e.style.cssText = o = ""), o) for(t in o)n && t in n || z(e.style, t, "");
        if (n) for(t in n)o && n[t] === o[t] || z(e.style, t, n[t]);
    }
    else if (t[0] === "o" && t[1] === "n") _ = t !== (t = t.replace(/Capture$/, "")), t = t.toLowerCase() in e ? t.toLowerCase().slice(2) : t.slice(2), e.l || (e.l = {
    }), e.l[t + _] = n, n ? o || e.addEventListener(t, _ ? q : G, _) : e.removeEventListener(t, _ ? q : G, _);
    else if (t !== "dangerouslySetInnerHTML") {
        if (l) t = t.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");
        else if (t !== "href" && t !== "list" && t !== "form" && t !== "tabIndex" && t !== "download" && t in e) try {
            e[t] = n ?? "";
            break e;
        } catch  {
        }
        typeof n == "function" || (n != null && (n !== !1 || t[0] === "a" && t[1] === "r") ? e.setAttribute(t, n) : e.removeAttribute(t));
    }
}
function G(e) {
    this.l[e.type + !1](d.event ? d.event(e) : e);
}
function q(e) {
    this.l[e.type + !0](d.event ? d.event(e) : e);
}
function M(e, t, n, o, l, _, s, u, p) {
    var a, r, v, c, i, f, b, h, y, m, w, g = t.type;
    if (t.constructor !== void 0) return null;
    n.__h != null && (p = n.__h, u = t.__e = n.__e, t.__h = null, _ = [
        u
    ]), (a = d.__b) && a(t);
    try {
        e: if (typeof g == "function") {
            if (h = t.props, y = (a = g.contextType) && o[a.__c], m = a ? y ? y.props.value : a.__ : o, n.__c ? b = (r = t.__c = n.__c).__ = r.__E : ("prototype" in g && g.prototype.render ? t.__c = r = new g(h, m) : (t.__c = r = new D(h, m), r.constructor = g, r.render = _e), y && y.sub(r), r.props = h, r.state || (r.state = {
            }), r.context = m, r.__n = o, v = r.__d = !0, r.__h = []), r.__s == null && (r.__s = r.state), g.getDerivedStateFromProps != null && (r.__s == r.state && (r.__s = k({
            }, r.__s)), k(r.__s, g.getDerivedStateFromProps(h, r.__s))), c = r.props, i = r.state, v) g.getDerivedStateFromProps == null && r.componentWillMount != null && r.componentWillMount(), r.componentDidMount != null && r.__h.push(r.componentDidMount);
            else {
                if (g.getDerivedStateFromProps == null && h !== c && r.componentWillReceiveProps != null && r.componentWillReceiveProps(h, m), !r.__e && r.shouldComponentUpdate != null && r.shouldComponentUpdate(h, r.__s, m) === !1 || t.__v === n.__v) {
                    r.props = h, r.state = r.__s, t.__v !== n.__v && (r.__d = !1), r.__v = t, t.__e = n.__e, t.__k = n.__k, t.__k.forEach(function(E) {
                        E && (E.__ = t);
                    }), r.__h.length && s.push(r);
                    break e;
                }
                r.componentWillUpdate != null && r.componentWillUpdate(h, r.__s, m), r.componentDidUpdate != null && r.__h.push(function() {
                    r.componentDidUpdate(c, i, f);
                });
            }
            r.context = m, r.props = h, r.state = r.__s, (a = d.__r) && a(t), r.__d = !1, r.__v = t, r.__P = e, a = r.render(r.props, r.state, r.context), r.state = r.__s, r.getChildContext != null && (o = k(k({
            }, o), r.getChildContext())), v || r.getSnapshotBeforeUpdate == null || (f = r.getSnapshotBeforeUpdate(c, i)), w = a != null && a.type === U && a.key == null ? a.props.children : a, $(e, Array.isArray(w) ? w : [
                w
            ], t, n, o, l, _, s, u, p), r.base = t.__e, t.__h = null, r.__h.length && s.push(r), b && (r.__E = r.__ = null), r.__e = !1;
        } else _ == null && t.__v === n.__v ? (t.__k = n.__k, t.__e = n.__e) : t.__e = ne(n.__e, t, n, o, l, _, s, p);
        (a = d.diffed) && a(t);
    } catch (E) {
        t.__v = null, (p || _ != null) && (t.__e = u, t.__h = !!p, _[_.indexOf(u)] = null), d.__e(E, t, n);
    }
}
function J(e, t) {
    d.__c && d.__c(t, e), e.some(function(n) {
        try {
            e = n.__h, n.__h = [], e.some(function(o) {
                o.call(n);
            });
        } catch (o) {
            d.__e(o, n.__v);
        }
    });
}
function ne(e, t, n, o, l, _, s, u) {
    var p, a, r, v = n.props, c = t.props, i = t.type, f = 0;
    if (i === "svg" && (l = !0), _ != null) {
        for(; f < _.length; f++)if ((p = _[f]) && (p === e || (i ? p.localName == i : p.nodeType == 3))) {
            e = p, _[f] = null;
            break;
        }
    }
    if (e == null) {
        if (i === null) return document.createTextNode(c);
        e = l ? document.createElementNS("http://www.w3.org/2000/svg", i) : document.createElement(i, c.is && c), _ = null, u = !1;
    }
    if (i === null) v === c || u && e.data === c || (e.data = c);
    else {
        if (_ = _ && x.call(e.childNodes), a = (v = n.props || A).dangerouslySetInnerHTML, r = c.dangerouslySetInnerHTML, !u) {
            if (_ != null) for(v = {
            }, f = 0; f < e.attributes.length; f++)v[e.attributes[f].name] = e.attributes[f].value;
            (r || a) && (r && (a && r.__html == a.__html || r.__html === e.innerHTML) || (e.innerHTML = r && r.__html || ""));
        }
        if (te(e, c, v, l, u), r) t.__k = [];
        else if (f = t.props.children, $(e, Array.isArray(f) ? f : [
            f
        ], t, n, o, l && i !== "foreignObject", _, s, _ ? _[0] : n.__k && C(n, 0), u), _ != null) for(f = _.length; f--;)_[f] != null && R(_[f]);
        u || ("value" in c && (f = c.value) !== void 0 && (f !== e.value || i === "progress" && !f) && N(e, "value", f, v.value, !1), "checked" in c && (f = c.checked) !== void 0 && f !== e.checked && N(e, "checked", f, v.checked, !1));
    }
    return e;
}
function K(e, t, n) {
    try {
        typeof e == "function" ? e(t) : e.current = t;
    } catch (o) {
        d.__e(o, n);
    }
}
function Q(e, t, n) {
    var o, l;
    if (d.unmount && d.unmount(e), (o = e.ref) && (o.current && o.current !== e.__e || K(o, null, t)), (o = e.__c) != null) {
        if (o.componentWillUnmount) try {
            o.componentWillUnmount();
        } catch (_) {
            d.__e(_, t);
        }
        o.base = o.__P = null;
    }
    if (o = e.__k) for(l = 0; l < o.length; l++)o[l] && Q(o[l], t, typeof e.type != "function");
    n || e.__e == null || R(e.__e), e.__e = e.__d = void 0;
}
function _e(e, t, n) {
    return this.constructor(e, n);
}
function re(e, t, n) {
    var o, l, _;
    d.__ && d.__(e, t), l = (o = typeof n == "function") ? null : n && n.__k || t.__k, _ = [], M(t, e = (!o && n || t).__k = Z(U, null, [
        e
    ]), l || A, A, t.ownerSVGElement !== void 0, !o && n ? [
        n
    ] : l ? null : t.firstChild ? x.call(t.childNodes) : null, _, !o && n ? n : l ? l.__e : t.firstChild, o), J(_, e);
}
x = O.slice, d = {
    __e: function(e, t) {
        for(var n, o, l; t = t.__;)if ((n = t.__c) && !n.__) try {
            if ((o = n.constructor) && o.getDerivedStateFromError != null && (n.setState(o.getDerivedStateFromError(e)), l = n.__d), n.componentDidCatch != null && (n.componentDidCatch(e), l = n.__d), l) return n.__E = n;
        } catch (_) {
            e = _;
        }
        throw e;
    }
}, W = 0, D.prototype.setState = function(e, t) {
    var n;
    n = this.__s != null && this.__s !== this.state ? this.__s : this.__s = k({
    }, this.state), typeof e == "function" && (e = e(k({
    }, n), this.props)), e && k(n, e), e != null && this.__v && (t && this.__h.push(t), L(this));
}, D.prototype.forceUpdate = function(e) {
    this.__v && (this.__e = !0, e && this.__h.push(e), L(this));
}, D.prototype.render = U, P = [], F = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, T.__r = 0, 0;
var o, r, l, i = 0, h = [], H1 = d.__b, p = d.__r, d1 = d.diffed, y = d.__c, E = d.unmount;
function a(_, n) {
    d.__h && d.__h(r, _, i || n), i = 0;
    var t = r.__H || (r.__H = {
        __: [],
        __h: []
    });
    return _ >= t.__.length && t.__.push({
    }), t.__[_];
}
function F1(_) {
    return i = 1, q1(A1, _);
}
function q1(_, n, t) {
    var u = a(o++, 2);
    return u.t = _, u.__c || (u.__ = [
        t ? t(n) : A1(void 0, n),
        function(c) {
            var f = u.t(u.__[0], c);
            u.__[0] !== f && (u.__ = [
                f,
                u.__[1]
            ], u.__c.setState({
            }));
        }
    ], u.__c = r), u.__;
}
function T1(_, n) {
    var t = a(o++, 3);
    !d.__s && v(t.__H, n) && (t.__ = _, t.__H = n, r.__H.__h.push(t));
}
function x1() {
    h.forEach(function(_) {
        if (_.__P) try {
            _.__H.__h.forEach(s), _.__H.__h.forEach(m), _.__H.__h = [];
        } catch (n) {
            _.__H.__h = [], d.__e(n, _.__v);
        }
    }), h = [];
}
d.__b = function(_) {
    r = null, H1 && H1(_);
}, d.__r = function(_) {
    p && p(_), o = 0;
    var n = (r = _.__c).__H;
    n && (n.__h.forEach(s), n.__h.forEach(m), n.__h = []);
}, d.diffed = function(_) {
    d1 && d1(_);
    var n = _.__c;
    n && n.__H && n.__H.__h.length && (h.push(n) !== 1 && l === d.requestAnimationFrame || ((l = d.requestAnimationFrame) || function(t) {
        var u, c = function() {
            clearTimeout(f), g && cancelAnimationFrame(u), setTimeout(t);
        }, f = setTimeout(c, 100);
        g && (u = requestAnimationFrame(c));
    })(x1)), r = null;
}, d.__c = function(_, n) {
    n.some(function(t) {
        try {
            t.__h.forEach(s), t.__h = t.__h.filter(function(u) {
                return !u.__ || m(u);
            });
        } catch (u) {
            n.some(function(c) {
                c.__h && (c.__h = []);
            }), n = [], d.__e(u, t.__v);
        }
    }), y && y(_, n);
}, d.unmount = function(_) {
    E && E(_);
    var n = _.__c;
    if (n && n.__H) try {
        n.__H.__.forEach(s);
    } catch (t) {
        d.__e(t, n.__v);
    }
};
var g = typeof requestAnimationFrame == "function";
function s(_) {
    var n = r;
    typeof _.__c == "function" && _.__c(), r = n;
}
function m(_) {
    var n = r;
    _.__c = _.__(), r = n;
}
function v(_, n) {
    return !_ || _.length !== n.length || n.some(function(t, u) {
        return t !== _[u];
    });
}
function A1(_, n) {
    return typeof n == "function" ? n(_) : n;
}
const formatList = [
    "esm",
    "iife",
    "cjs"
];
function isFormat(format) {
    return formatList.includes(format);
}
function parseSearchParams(searchParam) {
    const param = searchParam === "" ? "" : searchParam.slice(1);
    const params = new URLSearchParams(param);
    const bundle = params.get("bundle") === null ? false : true;
    const minify = params.get("minify") === null ? false : true;
    const format = params.get("format") ?? "esm";
    const charset = params.get("noUtf8") === null ? "utf8" : undefined;
    const run = params.get("run") === null ? false : true;
    const jsxFactory = params.get("jsxFactory") ?? "h";
    const jsxFragment = params.get("jsxFragment") ?? "Fragment";
    const entryURL = params.get("url") ?? "";
    const reload = params.get("reload") === null ? false : true;
    const sourcemap = params.get("sourcemap") === null ? false : "inline";
    return {
        bundle,
        minify,
        format: isFormat(format) ? format : "esm",
        charset,
        entryURL,
        run,
        jsxFactory,
        jsxFragment,
        reload,
        sourcemap
    };
}
function getPromiseSettledAnytimes() {
    let _resolve;
    let _reject;
    const waitForSettled = ()=>new Promise((res, rej)=>{
            _resolve = res;
            _reject = rej;
        })
    ;
    const resolve = (value)=>_resolve?.(value)
    ;
    const reject = (reason)=>_reject?.(reason)
    ;
    return [
        waitForSettled,
        resolve,
        reject
    ];
}
const worker = new Worker("./assets/worker.js");
async function* build(params) {
    const [waitMessage, resolve, reject] = getPromiseSettledAnytimes();
    worker.postMessage(params);
    const callback = (event)=>resolve(event.data)
    ;
    worker.addEventListener("message", callback);
    const onMessageError = (e)=>reject(e)
    ;
    worker.addEventListener("messageerror", onMessageError);
    try {
        while(true){
            const data = await waitMessage();
            if (data.type === "error" || data.type === "unexpected") {
                throw data;
            }
            yield data;
            if (data.type === "built") break;
            continue;
        }
    } finally{
        worker.removeEventListener("message", callback);
    }
}
const { run , ...initialOptions } = parseSearchParams(location.search);
const App = ()=>{
    return Z(U, null, Z("header", null, Z("h1", null, "Scrapbox Bundler")), Z("section", null, Z("h2", null, "Options"), Z("p", null, "target URL", Z("input", {
        type: "text",
        name: "target-url",
        pattern: "^https?:\\/\\/"
    })), Z("p", null, "bundle", Z("input", {
        type: "checkbox",
        name: "bundle",
        value: "true",
        checked: true
    })), Z("p", null, "minify", Z("input", {
        type: "checkbox",
        name: "minify",
        value: "true",
        checked: true
    })), Z("p", null, "format", Z("input", {
        type: "radio",
        name: "format",
        value: "esm",
        checked: true
    }, "ES Module"), Z("input", {
        type: "radio",
        name: "format",
        value: "iife"
    }, "immediately-invoked function expression"), Z("input", {
        type: "radio",
        name: "format",
        value: "commonjs"
    }, "CommonJS")), Z("p", null, "include source map", Z("input", {
        type: "checkbox",
        name: "source-map",
        value: "true"
    })), Z("p", null, Z("p", null, "URLs which are excluded from your build"), Z("textarea", null)), Z("p", null, Z("p", null, "import map"), Z("textarea", null))), Z("section", null, Z("h2", null, "Advanced Options"), Z("p", null, "escape non-ASCII characters", Z("input", {
        type: "checkbox",
        name: "charset",
        value: "utf8",
        checked: true
    }))), Z("h2", null, "Results"), Z("div", {
        id: "main"
    }));
};
const HeadlessApp = (props)=>{
    const [log, setLog] = F1("");
    T1(()=>{
        (async ()=>{
            console.group("build log");
            for await (const data of build(props.options)){
                console.log(data);
                switch(data.type){
                    case "built":
                        {
                            setLog((old)=>`${old}\nFinish building.`
                            );
                            const blob = new Blob([
                                data.code
                            ], {
                                type: "application/javascript;charset=UTF-8"
                            });
                            const url = URL.createObjectURL(blob);
                            window.open(url, "_self");
                            URL.revokeObjectURL(url);
                            break;
                        }
                    case "remote":
                        setLog((old)=>`${old}\nDownload ${decodeURI(data.url)}`
                        );
                        break;
                    case "cache":
                        setLog((old)=>`${old}\nUse cache: ${decodeURI(data.url)}`
                        );
                        break;
                }
            }
            console.groupEnd();
        })();
    }, []);
    return Z(U, null, Z("p", null, "Building...please wait."), Z("pre", null, Z("code", null, log)));
};
const app = document.getElementById("app");
if (!app) throw Error("Could not find `#app`.");
re(run ? Z(HeadlessApp, {
    options: initialOptions
}) : Z(App, null), app);

