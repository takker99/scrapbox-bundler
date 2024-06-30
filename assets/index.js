// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

var M, d, Q, C, G, X, A, V, R, $, Y, U = {}, Z = [], ie = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, H = Array.isArray;
function b(_, e) {
    for(var t in e)_[t] = e[t];
    return _;
}
function ee(_) {
    var e = _.parentNode;
    e && e.removeChild(_);
}
function le(_, e, t) {
    var i, n, r, l = {};
    for(r in e)r == "key" ? i = e[r] : r == "ref" ? n = e[r] : l[r] = e[r];
    if (arguments.length > 2 && (l.children = arguments.length > 3 ? M.call(arguments, 2) : t), typeof _ == "function" && _.defaultProps != null) for(r in _.defaultProps)l[r] === void 0 && (l[r] = _.defaultProps[r]);
    return S(_, l, i, n, null);
}
function S(_, e, t, i, n) {
    var r = {
        type: _,
        props: e,
        key: t,
        ref: i,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        constructor: void 0,
        __v: n ?? ++Q,
        __i: -1,
        __u: 0
    };
    return n == null && d.vnode != null && d.vnode(r), r;
}
function I(_) {
    return _.children;
}
function F(_, e) {
    this.props = _, this.context = e;
}
function x(_, e) {
    if (e == null) return _.__ ? x(_.__, _.__i + 1) : null;
    for(var t; e < _.__k.length; e++)if ((t = _.__k[e]) != null && t.__e != null) return t.__e;
    return typeof _.type == "function" ? x(_) : null;
}
function _e(_) {
    var e, t;
    if ((_ = _.__) != null && _.__c != null) {
        for(_.__e = _.__c.base = null, e = 0; e < _.__k.length; e++)if ((t = _.__k[e]) != null && t.__e != null) {
            _.__e = _.__c.base = t.__e;
            break;
        }
        return _e(_);
    }
}
function O(_) {
    (!_.__d && (_.__d = !0) && C.push(_) && !W.__r++ || G !== d.debounceRendering) && ((G = d.debounceRendering) || X)(W);
}
function W() {
    var _, e, t, i, n, r, l, s;
    for(C.sort(A); _ = C.shift();)_.__d && (e = C.length, i = void 0, r = (n = (t = _).__v).__e, l = [], s = [], t.__P && ((i = b({}, n)).__v = n.__v + 1, d.vnode && d.vnode(i), j(t.__P, i, n, t.__n, t.__P.namespaceURI, 32 & n.__u ? [
        r
    ] : null, l, r ?? x(n), !!(32 & n.__u), s), i.__v = n.__v, i.__.__k[i.__i] = i, oe(l, i, s), i.__e != r && _e(i)), C.length > e && C.sort(A));
    W.__r = 0;
}
function te(_, e, t, i, n, r, l, s, f, u, p) {
    var o, m, c, h, k, v = i && i.__k || Z, a = e.length;
    for(t.__d = f, se(t, e, v), f = t.__d, o = 0; o < a; o++)(c = t.__k[o]) != null && typeof c != "boolean" && typeof c != "function" && (m = c.__i === -1 ? U : v[c.__i] || U, c.__i = o, j(_, c, m, n, r, l, s, f, u, p), h = c.__e, c.ref && m.ref != c.ref && (m.ref && z(m.ref, null, c), p.push(c.ref, c.__c || h, c)), k == null && h != null && (k = h), 65536 & c.__u || m.__k === c.__k ? (f && !f.isConnected && (f = x(m)), f = ne(c, f, _)) : typeof c.type == "function" && c.__d !== void 0 ? f = c.__d : h && (f = h.nextSibling), c.__d = void 0, c.__u &= -196609);
    t.__d = f, t.__e = k;
}
function se(_, e, t) {
    var i, n, r, l, s, f = e.length, u = t.length, p = u, o = 0;
    for(_.__k = [], i = 0; i < f; i++)l = i + o, (n = _.__k[i] = (n = e[i]) == null || typeof n == "boolean" || typeof n == "function" ? null : typeof n == "string" || typeof n == "number" || typeof n == "bigint" || n.constructor == String ? S(null, n, null, null, null) : H(n) ? S(I, {
        children: n
    }, null, null, null) : n.constructor === void 0 && n.__b > 0 ? S(n.type, n.props, n.key, n.ref ? n.ref : null, n.__v) : n) != null ? (n.__ = _, n.__b = _.__b + 1, s = ce(n, t, l, p), n.__i = s, r = null, s !== -1 && (p--, (r = t[s]) && (r.__u |= 131072)), r == null || r.__v === null ? (s == -1 && o--, typeof n.type != "function" && (n.__u |= 65536)) : s !== l && (s === l + 1 ? o++ : s > l ? p > f - l ? o += s - l : o-- : s < l ? s == l - 1 && (o = s - l) : o = 0, s !== i + o && (n.__u |= 65536))) : (r = t[l]) && r.key == null && r.__e && !(131072 & r.__u) && (r.__e == _.__d && (_.__d = x(r)), B(r, r, !1), t[l] = null, p--);
    if (p) for(i = 0; i < u; i++)(r = t[i]) != null && !(131072 & r.__u) && (r.__e == _.__d && (_.__d = x(r)), B(r, r));
}
function ne(_, e, t) {
    var i, n;
    if (typeof _.type == "function") {
        for(i = _.__k, n = 0; i && n < i.length; n++)i[n] && (i[n].__ = _, e = ne(i[n], e, t));
        return e;
    }
    _.__e != e && (t.insertBefore(_.__e, e || null), e = _.__e);
    do e = e && e.nextSibling;
    while (e != null && e.nodeType === 8)
    return e;
}
function ce(_, e, t, i) {
    var n = _.key, r = _.type, l = t - 1, s = t + 1, f = e[t];
    if (f === null || f && n == f.key && r === f.type && !(131072 & f.__u)) return t;
    if (i > (f != null && !(131072 & f.__u) ? 1 : 0)) for(; l >= 0 || s < e.length;){
        if (l >= 0) {
            if ((f = e[l]) && !(131072 & f.__u) && n == f.key && r === f.type) return l;
            l--;
        }
        if (s < e.length) {
            if ((f = e[s]) && !(131072 & f.__u) && n == f.key && r === f.type) return s;
            s++;
        }
    }
    return -1;
}
function J(_, e, t) {
    e[0] === "-" ? _.setProperty(e, t ?? "") : _[e] = t == null ? "" : typeof t != "number" || ie.test(e) ? t : t + "px";
}
function L(_, e, t, i, n) {
    var r;
    e: if (e === "style") if (typeof t == "string") _.style.cssText = t;
    else {
        if (typeof i == "string" && (_.style.cssText = i = ""), i) for(e in i)t && e in t || J(_.style, e, "");
        if (t) for(e in t)i && t[e] === i[e] || J(_.style, e, t[e]);
    }
    else if (e[0] === "o" && e[1] === "n") r = e !== (e = e.replace(/(PointerCapture)$|Capture$/i, "$1")), e = e.toLowerCase() in _ || e === "onFocusOut" || e === "onFocusIn" ? e.toLowerCase().slice(2) : e.slice(2), _.l || (_.l = {}), _.l[e + r] = t, t ? i ? t.u = i.u : (t.u = V, _.addEventListener(e, r ? $ : R, r)) : _.removeEventListener(e, r ? $ : R, r);
    else {
        if (n == "http://www.w3.org/2000/svg") e = e.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if (e != "width" && e != "height" && e != "href" && e != "list" && e != "form" && e != "tabIndex" && e != "download" && e != "rowSpan" && e != "colSpan" && e != "role" && e in _) try {
            _[e] = t ?? "";
            break e;
        } catch  {}
        typeof t == "function" || (t == null || t === !1 && e[4] !== "-" ? _.removeAttribute(e) : _.setAttribute(e, t));
    }
}
function K(_) {
    return function(e) {
        if (this.l) {
            var t = this.l[e.type + _];
            if (e.t == null) e.t = V++;
            else if (e.t < t.u) return;
            return t(d.event ? d.event(e) : e);
        }
    };
}
function j(_, e, t, i, n, r, l, s, f, u) {
    var p, o, m, c, h, k, v, a, y, w, T, P, q, D, N, g = e.type;
    if (e.constructor !== void 0) return null;
    128 & t.__u && (f = !!(32 & t.__u), r = [
        s = e.__e = t.__e
    ]), (p = d.__b) && p(e);
    e: if (typeof g == "function") try {
        if (a = e.props, y = (p = g.contextType) && i[p.__c], w = p ? y ? y.props.value : p.__ : i, t.__c ? v = (o = e.__c = t.__c).__ = o.__E : ("prototype" in g && g.prototype.render ? e.__c = o = new g(a, w) : (e.__c = o = new F(a, w), o.constructor = g, o.render = pe), y && y.sub(o), o.props = a, o.state || (o.state = {}), o.context = w, o.__n = i, m = o.__d = !0, o.__h = [], o._sb = []), o.__s == null && (o.__s = o.state), g.getDerivedStateFromProps != null && (o.__s == o.state && (o.__s = b({}, o.__s)), b(o.__s, g.getDerivedStateFromProps(a, o.__s))), c = o.props, h = o.state, o.__v = e, m) g.getDerivedStateFromProps == null && o.componentWillMount != null && o.componentWillMount(), o.componentDidMount != null && o.__h.push(o.componentDidMount);
        else {
            if (g.getDerivedStateFromProps == null && a !== c && o.componentWillReceiveProps != null && o.componentWillReceiveProps(a, w), !o.__e && (o.shouldComponentUpdate != null && o.shouldComponentUpdate(a, o.__s, w) === !1 || e.__v === t.__v)) {
                for(e.__v !== t.__v && (o.props = a, o.state = o.__s, o.__d = !1), e.__e = t.__e, e.__k = t.__k, e.__k.forEach(function(E) {
                    E && (E.__ = e);
                }), T = 0; T < o._sb.length; T++)o.__h.push(o._sb[T]);
                o._sb = [], o.__h.length && l.push(o);
                break e;
            }
            o.componentWillUpdate != null && o.componentWillUpdate(a, o.__s, w), o.componentDidUpdate != null && o.__h.push(function() {
                o.componentDidUpdate(c, h, k);
            });
        }
        if (o.context = w, o.props = a, o.__P = _, o.__e = !1, P = d.__r, q = 0, "prototype" in g && g.prototype.render) {
            for(o.state = o.__s, o.__d = !1, P && P(e), p = o.render(o.props, o.state, o.context), D = 0; D < o._sb.length; D++)o.__h.push(o._sb[D]);
            o._sb = [];
        } else do o.__d = !1, P && P(e), p = o.render(o.props, o.state, o.context), o.state = o.__s;
        while (o.__d && ++q < 25)
        o.state = o.__s, o.getChildContext != null && (i = b(b({}, i), o.getChildContext())), m || o.getSnapshotBeforeUpdate == null || (k = o.getSnapshotBeforeUpdate(c, h)), te(_, H(N = p != null && p.type === I && p.key == null ? p.props.children : p) ? N : [
            N
        ], e, t, i, n, r, l, s, f, u), o.base = e.__e, e.__u &= -161, o.__h.length && l.push(o), v && (o.__E = o.__ = null);
    } catch (E) {
        e.__v = null, f || r != null ? (e.__e = s, e.__u |= f ? 160 : 32, r[r.indexOf(s)] = null) : (e.__e = t.__e, e.__k = t.__k), d.__e(E, e, t);
    }
    else r == null && e.__v === t.__v ? (e.__k = t.__k, e.__e = t.__e) : e.__e = fe(t.__e, e, t, i, n, r, l, f, u);
    (p = d.diffed) && p(e);
}
function oe(_, e, t) {
    e.__d = void 0;
    for(var i = 0; i < t.length; i++)z(t[i], t[++i], t[++i]);
    d.__c && d.__c(e, _), _.some(function(n) {
        try {
            _ = n.__h, n.__h = [], _.some(function(r) {
                r.call(n);
            });
        } catch (r) {
            d.__e(r, n.__v);
        }
    });
}
function fe(_, e, t, i, n, r, l, s, f) {
    var u, p, o, m, c, h, k, v = t.props, a = e.props, y = e.type;
    if (y === "svg" ? n = "http://www.w3.org/2000/svg" : y === "math" ? n = "http://www.w3.org/1998/Math/MathML" : n || (n = "http://www.w3.org/1999/xhtml"), r != null) {
        for(u = 0; u < r.length; u++)if ((c = r[u]) && "setAttribute" in c == !!y && (y ? c.localName === y : c.nodeType === 3)) {
            _ = c, r[u] = null;
            break;
        }
    }
    if (_ == null) {
        if (y === null) return document.createTextNode(a);
        _ = document.createElementNS(n, y, a.is && a), r = null, s = !1;
    }
    if (y === null) v === a || s && _.data === a || (_.data = a);
    else {
        if (r = r && M.call(_.childNodes), v = t.props || U, !s && r != null) for(v = {}, u = 0; u < _.attributes.length; u++)v[(c = _.attributes[u]).name] = c.value;
        for(u in v)if (c = v[u], u != "children") {
            if (u == "dangerouslySetInnerHTML") o = c;
            else if (u !== "key" && !(u in a)) {
                if (u == "value" && "defaultValue" in a || u == "checked" && "defaultChecked" in a) continue;
                L(_, u, null, c, n);
            }
        }
        for(u in a)c = a[u], u == "children" ? m = c : u == "dangerouslySetInnerHTML" ? p = c : u == "value" ? h = c : u == "checked" ? k = c : u === "key" || s && typeof c != "function" || v[u] === c || L(_, u, c, v[u], n);
        if (p) s || o && (p.__html === o.__html || p.__html === _.innerHTML) || (_.innerHTML = p.__html), e.__k = [];
        else if (o && (_.innerHTML = ""), te(_, H(m) ? m : [
            m
        ], e, t, i, y === "foreignObject" ? "http://www.w3.org/1999/xhtml" : n, r, l, r ? r[0] : t.__k && x(t, 0), s, f), r != null) for(u = r.length; u--;)r[u] != null && ee(r[u]);
        s || (u = "value", h !== void 0 && (h !== _[u] || y === "progress" && !h || y === "option" && h !== v[u]) && L(_, u, h, v[u], n), u = "checked", k !== void 0 && k !== _[u] && L(_, u, k, v[u], n));
    }
    return _;
}
function z(_, e, t) {
    try {
        typeof _ == "function" ? _(e) : _.current = e;
    } catch (i) {
        d.__e(i, t);
    }
}
function B(_, e, t) {
    var i, n;
    if (d.unmount && d.unmount(_), (i = _.ref) && (i.current && i.current !== _.__e || z(i, null, e)), (i = _.__c) != null) {
        if (i.componentWillUnmount) try {
            i.componentWillUnmount();
        } catch (r) {
            d.__e(r, e);
        }
        i.base = i.__P = null;
    }
    if (i = _.__k) for(n = 0; n < i.length; n++)i[n] && B(i[n], e, t || typeof _.type != "function");
    t || _.__e == null || ee(_.__e), _.__c = _.__ = _.__e = _.__d = void 0;
}
function pe(_, e, t) {
    return this.constructor(_, t);
}
function ae(_, e, t) {
    var i, n, r, l;
    d.__ && d.__(_, e), n = (i = typeof t == "function") ? null : t && t.__k || e.__k, r = [], l = [], j(e, _ = (!i && t || e).__k = le(I, null, [
        _
    ]), n || U, U, e.namespaceURI, !i && t ? [
        t
    ] : n ? null : e.firstChild ? M.call(e.childNodes) : null, r, !i && t ? t : n ? n.__e : e.firstChild, i, l), oe(r, _, l);
}
function ye(_, e) {
    var t = {
        __c: e = "__cC" + Y++,
        __: _,
        Consumer: function(i, n) {
            return i.children(n);
        },
        Provider: function(i) {
            var n, r;
            return this.getChildContext || (n = [], (r = {})[e] = this, this.getChildContext = function() {
                return r;
            }, this.shouldComponentUpdate = function(l) {
                this.props.value !== l.value && n.some(function(s) {
                    s.__e = !0, O(s);
                });
            }, this.sub = function(l) {
                n.push(l);
                var s = l.componentWillUnmount;
                l.componentWillUnmount = function() {
                    n.splice(n.indexOf(l), 1), s && s.call(l);
                };
            }), i.children;
        }
    };
    return t.Provider.__ = t.Consumer.contextType = t;
}
M = Z.slice, d = {
    __e: function(_, e, t, i) {
        for(var n, r, l; e = e.__;)if ((n = e.__c) && !n.__) try {
            if ((r = n.constructor) && r.getDerivedStateFromError != null && (n.setState(r.getDerivedStateFromError(_)), l = n.__d), n.componentDidCatch != null && (n.componentDidCatch(_, i || {}), l = n.__d), l) return n.__E = n;
        } catch (s) {
            _ = s;
        }
        throw _;
    }
}, Q = 0, F.prototype.setState = function(_, e) {
    var t;
    t = this.__s != null && this.__s !== this.state ? this.__s : this.__s = b({}, this.state), typeof _ == "function" && (_ = _(b({}, t), this.props)), _ && b(t, _), _ != null && this.__v && (e && this._sb.push(e), O(this));
}, F.prototype.forceUpdate = function(_) {
    this.__v && (this.__e = !0, _ && this.__h.push(_), O(this));
}, F.prototype.render = I, C = [], X = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, A = function(_, e) {
    return _.__v.__b - e.__v.__b;
}, W.__r = 0, V = 0, R = K(!1), $ = K(!0), Y = 0;
var c, r, H1, b1, v = 0, x1 = [], p = [], o = d, g = o.__b, C1 = o.__r, A1 = o.diffed, D = o.__c, F1 = o.unmount, k = o.__;
function l(t, _) {
    o.__h && o.__h(r, t, v || _), v = 0;
    var u = r.__H || (r.__H = {
        __: [],
        __h: []
    });
    return t >= u.__.length && u.__.push({
        __V: p
    }), u.__[t];
}
function I1(t) {
    return v = 1, R1(U1, t);
}
function R1(t, _, u) {
    var n = l(c++, 2);
    if (n.t = t, !n.__c && (n.__ = [
        u ? u(_) : U1(void 0, _),
        function(a) {
            var f = n.__N ? n.__N[0] : n.__[0], s = n.t(f, a);
            f !== s && (n.__N = [
                s,
                n.__[1]
            ], n.__c.setState({}));
        }
    ], n.__c = r, !r.u)) {
        var i = function(a, f, s) {
            if (!n.__c.__H) return !0;
            var m = n.__c.__H.__.filter(function(e) {
                return !!e.__c;
            });
            if (m.every(function(e) {
                return !e.__N;
            })) return !h || h.call(this, a, f, s);
            var V = !1;
            return m.forEach(function(e) {
                if (e.__N) {
                    var P = e.__[0];
                    e.__ = e.__N, e.__N = void 0, P !== e.__[0] && (V = !0);
                }
            }), !(!V && n.__c.props === a) && (!h || h.call(this, a, f, s));
        };
        r.u = !0;
        var h = r.shouldComponentUpdate, N = r.componentWillUpdate;
        r.componentWillUpdate = function(a, f, s) {
            if (this.__e) {
                var m = h;
                h = void 0, i(a, f, s), h = m;
            }
            N && N.call(this, a, f, s);
        }, r.shouldComponentUpdate = i;
    }
    return n.__N || n.__;
}
function z1(t, _) {
    var u = l(c++, 3);
    !o.__s && y(u.__H, _) && (u.__ = t, u.i = _, r.__H.__h.push(u));
}
function T(t, _) {
    var u = l(c++, 7);
    return y(u.__H, _) ? (u.__V = t(), u.i = _, u.__h = t, u.__V) : u.__;
}
function W1() {
    for(var t; t = x1.shift();)if (t.__P && t.__H) try {
        t.__H.__h.forEach(d1), t.__H.__h.forEach(E), t.__H.__h = [];
    } catch (_) {
        t.__H.__h = [], o.__e(_, t.__v);
    }
}
o.__b = function(t) {
    r = null, g && g(t);
}, o.__ = function(t, _) {
    t && _.__k && _.__k.__m && (t.__m = _.__k.__m), k && k(t, _);
}, o.__r = function(t) {
    C1 && C1(t), c = 0;
    var _ = (r = t.__c).__H;
    _ && (H1 === r ? (_.__h = [], r.__h = [], _.__.forEach(function(u) {
        u.__N && (u.__ = u.__N), u.__V = p, u.__N = u.i = void 0;
    })) : (_.__h.forEach(d1), _.__h.forEach(E), _.__h = [], c = 0)), H1 = r;
}, o.diffed = function(t) {
    A1 && A1(t);
    var _ = t.__c;
    _ && _.__H && (_.__H.__h.length && (x1.push(_) !== 1 && b1 === o.requestAnimationFrame || ((b1 = o.requestAnimationFrame) || j1)(W1)), _.__H.__.forEach(function(u) {
        u.i && (u.__H = u.i), u.__V !== p && (u.__ = u.__V), u.i = void 0, u.__V = p;
    })), H1 = r = null;
}, o.__c = function(t, _) {
    _.some(function(u) {
        try {
            u.__h.forEach(d1), u.__h = u.__h.filter(function(n) {
                return !n.__ || E(n);
            });
        } catch (n) {
            _.some(function(i) {
                i.__h && (i.__h = []);
            }), _ = [], o.__e(n, u.__v);
        }
    }), D && D(t, _);
}, o.unmount = function(t) {
    F1 && F1(t);
    var _, u = t.__c;
    u && u.__H && (u.__H.__.forEach(function(n) {
        try {
            d1(n);
        } catch (i) {
            _ = i;
        }
    }), u.__H = void 0, _ && o.__e(_, u.__v));
};
var q = typeof requestAnimationFrame == "function";
function j1(t) {
    var _, u = function() {
        clearTimeout(n), q && cancelAnimationFrame(_), setTimeout(t);
    }, n = setTimeout(u, 100);
    q && (_ = requestAnimationFrame(u));
}
function d1(t) {
    var _ = r, u = t.__c;
    typeof u == "function" && (t.__c = void 0, u()), r = _;
}
function E(t) {
    var _ = r;
    t.__c = t.__(), r = _;
}
function y(t, _) {
    return !t || t.length !== _.length || _.some(function(u, n) {
        return u !== t[n];
    });
}
function U1(t, _) {
    return typeof _ == "function" ? _(t) : _;
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
    const define = parseDefine(params.getAll("define"));
    const charset = params.get("noUtf8") === null ? "utf8" : undefined;
    const run = params.get("run") === null ? false : true;
    const output = params.get("output") ?? "self";
    const jsxFactory = params.get("jsxFactory") ?? "h";
    const jsxFragment = params.get("jsxFragment") ?? "Fragment";
    const entryURL = params.get("url") ?? "";
    const reload = params.get("reload") === null ? false : true;
    const sourcemap = params.get("sourcemap") === null ? false : "inline";
    const external = params.getAll("external");
    const importMapURL = params.get("importmap") ?? undefined;
    const templateURL = params.get("template") ?? undefined;
    return {
        bundle,
        minify,
        format: isFormat(format) ? format : "esm",
        charset,
        entryURL,
        external,
        define,
        run,
        output: isOutput(output) ? output : "self",
        jsxFactory,
        jsxFragment,
        reload,
        sourcemap,
        importMapURL: importMapURL ? new URL(importMapURL, entryURL) : undefined,
        templateURL
    };
}
function isOutput(output) {
    return [
        "self",
        "newtab",
        "download"
    ].includes(output);
}
function parseDefine(define) {
    const defines = {};
    for (const pair of define){
        const pos = pair.indexOf(":");
        if (pos < 0) continue;
        const key = pair.slice(0, pos);
        const value = pair.slice(pos + 1);
        defines[key] = value;
    }
    return defines;
}
function encodePacket(packet) {
    let visit = (value)=>{
        if (value === null) {
            bb.write8(0);
        } else if (typeof value === "boolean") {
            bb.write8(1);
            bb.write8(+value);
        } else if (typeof value === "number") {
            bb.write8(2);
            bb.write32(value | 0);
        } else if (typeof value === "string") {
            bb.write8(3);
            bb.write(encodeUTF8(value));
        } else if (value instanceof Uint8Array) {
            bb.write8(4);
            bb.write(value);
        } else if (value instanceof Array) {
            bb.write8(5);
            bb.write32(value.length);
            for (let item of value){
                visit(item);
            }
        } else {
            let keys = Object.keys(value);
            bb.write8(6);
            bb.write32(keys.length);
            for (let key of keys){
                bb.write(encodeUTF8(key));
                visit(value[key]);
            }
        }
    };
    let bb = new ByteBuffer();
    bb.write32(0);
    bb.write32(packet.id << 1 | +!packet.isRequest);
    visit(packet.value);
    writeUInt32LE(bb.buf, bb.len - 4, 0);
    return bb.buf.subarray(0, bb.len);
}
function decodePacket(bytes) {
    let visit = ()=>{
        switch(bb.read8()){
            case 0:
                return null;
            case 1:
                return !!bb.read8();
            case 2:
                return bb.read32();
            case 3:
                return decodeUTF8(bb.read());
            case 4:
                return bb.read();
            case 5:
                {
                    let count = bb.read32();
                    let value = [];
                    for(let i = 0; i < count; i++){
                        value.push(visit());
                    }
                    return value;
                }
            case 6:
                {
                    let count = bb.read32();
                    let value = {};
                    for(let i = 0; i < count; i++){
                        value[decodeUTF8(bb.read())] = visit();
                    }
                    return value;
                }
            default:
                throw new Error("Invalid packet");
        }
    };
    let bb = new ByteBuffer(bytes);
    let id = bb.read32();
    let isRequest = (id & 1) === 0;
    id >>>= 1;
    let value = visit();
    if (bb.ptr !== bytes.length) {
        throw new Error("Invalid packet");
    }
    return {
        id,
        isRequest,
        value
    };
}
class ByteBuffer {
    buf;
    len;
    ptr;
    constructor(buf = new Uint8Array(1024)){
        this.buf = buf;
        this.len = 0;
        this.ptr = 0;
    }
    _write(delta) {
        if (this.len + delta > this.buf.length) {
            let clone = new Uint8Array((this.len + delta) * 2);
            clone.set(this.buf);
            this.buf = clone;
        }
        this.len += delta;
        return this.len - delta;
    }
    write8(value) {
        let offset = this._write(1);
        this.buf[offset] = value;
    }
    write32(value) {
        let offset = this._write(4);
        writeUInt32LE(this.buf, value, offset);
    }
    write(bytes) {
        let offset = this._write(4 + bytes.length);
        writeUInt32LE(this.buf, bytes.length, offset);
        this.buf.set(bytes, offset + 4);
    }
    _read(delta) {
        if (this.ptr + delta > this.buf.length) {
            throw new Error("Invalid packet");
        }
        this.ptr += delta;
        return this.ptr - delta;
    }
    read8() {
        return this.buf[this._read(1)];
    }
    read32() {
        return readUInt32LE(this.buf, this._read(4));
    }
    read() {
        let length = this.read32();
        let bytes = new Uint8Array(length);
        let ptr = this._read(bytes.length);
        bytes.set(this.buf.subarray(ptr, ptr + length));
        return bytes;
    }
}
let encodeUTF8;
let decodeUTF8;
let encodeInvariant;
if (typeof TextEncoder !== "undefined" && typeof TextDecoder !== "undefined") {
    let encoder = new TextEncoder();
    let decoder = new TextDecoder();
    encodeUTF8 = (text)=>encoder.encode(text);
    decodeUTF8 = (bytes)=>decoder.decode(bytes);
    encodeInvariant = 'new TextEncoder().encode("")';
} else {
    throw new Error("No UTF-8 codec found");
}
if (!(encodeUTF8("") instanceof Uint8Array)) {
    throw new Error(`Invariant violation: "${encodeInvariant} instanceof Uint8Array" is incorrectly false

This indicates that your JavaScript environment is broken. You cannot use
esbuild in this environment because esbuild relies on this invariant. This
is not a problem with esbuild. You need to fix your environment instead.
`);
}
function readUInt32LE(buffer, offset) {
    return buffer[offset++] | buffer[offset++] << 8 | buffer[offset++] << 16 | buffer[offset++] << 24;
}
function writeUInt32LE(buffer, value, offset) {
    buffer[offset++] = value;
    buffer[offset++] = value >> 8;
    buffer[offset++] = value >> 16;
    buffer[offset++] = value >> 24;
}
const ESBUILD_VERSION = "0.21.5";
const quote = JSON.stringify;
const buildLogLevelDefault = "warning";
const transformLogLevelDefault = "silent";
function validateTarget(target) {
    validateStringValue(target, "target");
    if (target.indexOf(",") >= 0) throw new Error(`Invalid target: ${target}`);
    return target;
}
let canBeAnything = ()=>null;
let mustBeBoolean = (value)=>typeof value === "boolean" ? null : "a boolean";
let mustBeString = (value)=>typeof value === "string" ? null : "a string";
let mustBeRegExp = (value)=>value instanceof RegExp ? null : "a RegExp object";
let mustBeInteger = (value)=>typeof value === "number" && value === (value | 0) ? null : "an integer";
let mustBeFunction = (value)=>typeof value === "function" ? null : "a function";
let mustBeArray = (value)=>Array.isArray(value) ? null : "an array";
let mustBeObject = (value)=>typeof value === "object" && value !== null && !Array.isArray(value) ? null : "an object";
let mustBeEntryPoints = (value)=>typeof value === "object" && value !== null ? null : "an array or an object";
let mustBeWebAssemblyModule = (value)=>value instanceof WebAssembly.Module ? null : "a WebAssembly.Module";
let mustBeObjectOrNull = (value)=>typeof value === "object" && !Array.isArray(value) ? null : "an object or null";
let mustBeStringOrBoolean = (value)=>typeof value === "string" || typeof value === "boolean" ? null : "a string or a boolean";
let mustBeStringOrObject = (value)=>typeof value === "string" || typeof value === "object" && value !== null && !Array.isArray(value) ? null : "a string or an object";
let mustBeStringOrArray = (value)=>typeof value === "string" || Array.isArray(value) ? null : "a string or an array";
let mustBeStringOrUint8Array = (value)=>typeof value === "string" || value instanceof Uint8Array ? null : "a string or a Uint8Array";
let mustBeStringOrURL = (value)=>typeof value === "string" || value instanceof URL ? null : "a string or a URL";
function getFlag(object, keys, key, mustBeFn) {
    let value = object[key];
    keys[key + ""] = true;
    if (value === undefined) return undefined;
    let mustBe = mustBeFn(value);
    if (mustBe !== null) throw new Error(`${quote(key)} must be ${mustBe}`);
    return value;
}
function checkForInvalidFlags(object, keys, where) {
    for(let key in object){
        if (!(key in keys)) {
            throw new Error(`Invalid option ${where}: ${quote(key)}`);
        }
    }
}
function validateInitializeOptions(options) {
    let keys = Object.create(null);
    let wasmModule = getFlag(options, keys, "wasmModule", mustBeWebAssemblyModule);
    let workerURL = getFlag(options, keys, "workerURL", mustBeStringOrURL);
    checkForInvalidFlags(options, keys, "in initialize() call");
    return {
        wasmModule,
        workerURL
    };
}
function validateMangleCache(mangleCache) {
    let validated;
    if (mangleCache !== undefined) {
        validated = Object.create(null);
        for(let key in mangleCache){
            let value = mangleCache[key];
            if (typeof value === "string" || value === false) {
                validated[key] = value;
            } else {
                throw new Error(`Expected ${quote(key)} in mangle cache to map to either a string or false`);
            }
        }
    }
    return validated;
}
function pushLogFlags(flags, options, keys, isTTY, logLevelDefault) {
    let color = getFlag(options, keys, "color", mustBeBoolean);
    let logLevel = getFlag(options, keys, "logLevel", mustBeString);
    let logLimit = getFlag(options, keys, "logLimit", mustBeInteger);
    if (color !== void 0) flags.push(`--color=${color}`);
    else if (isTTY) flags.push(`--color=true`);
    flags.push(`--log-level=${logLevel || logLevelDefault}`);
    flags.push(`--log-limit=${logLimit || 0}`);
}
function validateStringValue(value, what, key) {
    if (typeof value !== "string") {
        throw new Error(`Expected value for ${what}${key !== void 0 ? " " + quote(key) : ""} to be a string, got ${typeof value} instead`);
    }
    return value;
}
function pushCommonFlags(flags, options, keys) {
    let legalComments = getFlag(options, keys, "legalComments", mustBeString);
    let sourceRoot = getFlag(options, keys, "sourceRoot", mustBeString);
    let sourcesContent = getFlag(options, keys, "sourcesContent", mustBeBoolean);
    let target = getFlag(options, keys, "target", mustBeStringOrArray);
    let format = getFlag(options, keys, "format", mustBeString);
    let globalName = getFlag(options, keys, "globalName", mustBeString);
    let mangleProps = getFlag(options, keys, "mangleProps", mustBeRegExp);
    let reserveProps = getFlag(options, keys, "reserveProps", mustBeRegExp);
    let mangleQuoted = getFlag(options, keys, "mangleQuoted", mustBeBoolean);
    let minify = getFlag(options, keys, "minify", mustBeBoolean);
    let minifySyntax = getFlag(options, keys, "minifySyntax", mustBeBoolean);
    let minifyWhitespace = getFlag(options, keys, "minifyWhitespace", mustBeBoolean);
    let minifyIdentifiers = getFlag(options, keys, "minifyIdentifiers", mustBeBoolean);
    let lineLimit = getFlag(options, keys, "lineLimit", mustBeInteger);
    let drop = getFlag(options, keys, "drop", mustBeArray);
    let dropLabels = getFlag(options, keys, "dropLabels", mustBeArray);
    let charset = getFlag(options, keys, "charset", mustBeString);
    let treeShaking = getFlag(options, keys, "treeShaking", mustBeBoolean);
    let ignoreAnnotations = getFlag(options, keys, "ignoreAnnotations", mustBeBoolean);
    let jsx = getFlag(options, keys, "jsx", mustBeString);
    let jsxFactory = getFlag(options, keys, "jsxFactory", mustBeString);
    let jsxFragment = getFlag(options, keys, "jsxFragment", mustBeString);
    let jsxImportSource = getFlag(options, keys, "jsxImportSource", mustBeString);
    let jsxDev = getFlag(options, keys, "jsxDev", mustBeBoolean);
    let jsxSideEffects = getFlag(options, keys, "jsxSideEffects", mustBeBoolean);
    let define = getFlag(options, keys, "define", mustBeObject);
    let logOverride = getFlag(options, keys, "logOverride", mustBeObject);
    let supported = getFlag(options, keys, "supported", mustBeObject);
    let pure = getFlag(options, keys, "pure", mustBeArray);
    let keepNames = getFlag(options, keys, "keepNames", mustBeBoolean);
    let platform = getFlag(options, keys, "platform", mustBeString);
    let tsconfigRaw = getFlag(options, keys, "tsconfigRaw", mustBeStringOrObject);
    if (legalComments) flags.push(`--legal-comments=${legalComments}`);
    if (sourceRoot !== void 0) flags.push(`--source-root=${sourceRoot}`);
    if (sourcesContent !== void 0) {
        flags.push(`--sources-content=${sourcesContent}`);
    }
    if (target) {
        if (Array.isArray(target)) {
            flags.push(`--target=${Array.from(target).map(validateTarget).join(",")}`);
        } else flags.push(`--target=${validateTarget(target)}`);
    }
    if (format) flags.push(`--format=${format}`);
    if (globalName) flags.push(`--global-name=${globalName}`);
    if (platform) flags.push(`--platform=${platform}`);
    if (tsconfigRaw) {
        flags.push(`--tsconfig-raw=${typeof tsconfigRaw === "string" ? tsconfigRaw : JSON.stringify(tsconfigRaw)}`);
    }
    if (minify) flags.push("--minify");
    if (minifySyntax) flags.push("--minify-syntax");
    if (minifyWhitespace) flags.push("--minify-whitespace");
    if (minifyIdentifiers) flags.push("--minify-identifiers");
    if (lineLimit) flags.push(`--line-limit=${lineLimit}`);
    if (charset) flags.push(`--charset=${charset}`);
    if (treeShaking !== void 0) flags.push(`--tree-shaking=${treeShaking}`);
    if (ignoreAnnotations) flags.push(`--ignore-annotations`);
    if (drop) {
        for (let what of drop){
            flags.push(`--drop:${validateStringValue(what, "drop")}`);
        }
    }
    if (dropLabels) {
        flags.push(`--drop-labels=${Array.from(dropLabels).map((what)=>validateStringValue(what, "dropLabels")).join(",")}`);
    }
    if (mangleProps) flags.push(`--mangle-props=${mangleProps.source}`);
    if (reserveProps) flags.push(`--reserve-props=${reserveProps.source}`);
    if (mangleQuoted !== void 0) flags.push(`--mangle-quoted=${mangleQuoted}`);
    if (jsx) flags.push(`--jsx=${jsx}`);
    if (jsxFactory) flags.push(`--jsx-factory=${jsxFactory}`);
    if (jsxFragment) flags.push(`--jsx-fragment=${jsxFragment}`);
    if (jsxImportSource) flags.push(`--jsx-import-source=${jsxImportSource}`);
    if (jsxDev) flags.push(`--jsx-dev`);
    if (jsxSideEffects) flags.push(`--jsx-side-effects`);
    if (define) {
        for(let key in define){
            if (key.indexOf("=") >= 0) throw new Error(`Invalid define: ${key}`);
            flags.push(`--define:${key}=${validateStringValue(define[key], "define", key)}`);
        }
    }
    if (logOverride) {
        for(let key in logOverride){
            if (key.indexOf("=") >= 0) {
                throw new Error(`Invalid log override: ${key}`);
            }
            flags.push(`--log-override:${key}=${validateStringValue(logOverride[key], "log override", key)}`);
        }
    }
    if (supported) {
        for(let key in supported){
            if (key.indexOf("=") >= 0) throw new Error(`Invalid supported: ${key}`);
            const value = supported[key];
            if (typeof value !== "boolean") {
                throw new Error(`Expected value for supported ${quote(key)} to be a boolean, got ${typeof value} instead`);
            }
            flags.push(`--supported:${key}=${value}`);
        }
    }
    if (pure) {
        for (let fn of pure){
            flags.push(`--pure:${validateStringValue(fn, "pure")}`);
        }
    }
    if (keepNames) flags.push(`--keep-names`);
}
function flagsForBuildOptions(callName, options, isTTY, logLevelDefault, writeDefault) {
    let flags = [];
    let entries = [];
    let keys = Object.create(null);
    let stdinContents = null;
    let stdinResolveDir = null;
    pushLogFlags(flags, options, keys, isTTY, logLevelDefault);
    pushCommonFlags(flags, options, keys);
    let sourcemap = getFlag(options, keys, "sourcemap", mustBeStringOrBoolean);
    let bundle = getFlag(options, keys, "bundle", mustBeBoolean);
    let splitting = getFlag(options, keys, "splitting", mustBeBoolean);
    let preserveSymlinks = getFlag(options, keys, "preserveSymlinks", mustBeBoolean);
    let metafile = getFlag(options, keys, "metafile", mustBeBoolean);
    let outfile = getFlag(options, keys, "outfile", mustBeString);
    let outdir = getFlag(options, keys, "outdir", mustBeString);
    let outbase = getFlag(options, keys, "outbase", mustBeString);
    let tsconfig = getFlag(options, keys, "tsconfig", mustBeString);
    let resolveExtensions = getFlag(options, keys, "resolveExtensions", mustBeArray);
    let nodePathsInput = getFlag(options, keys, "nodePaths", mustBeArray);
    let mainFields = getFlag(options, keys, "mainFields", mustBeArray);
    let conditions = getFlag(options, keys, "conditions", mustBeArray);
    let external = getFlag(options, keys, "external", mustBeArray);
    let packages = getFlag(options, keys, "packages", mustBeString);
    let alias = getFlag(options, keys, "alias", mustBeObject);
    let loader = getFlag(options, keys, "loader", mustBeObject);
    let outExtension = getFlag(options, keys, "outExtension", mustBeObject);
    let publicPath = getFlag(options, keys, "publicPath", mustBeString);
    let entryNames = getFlag(options, keys, "entryNames", mustBeString);
    let chunkNames = getFlag(options, keys, "chunkNames", mustBeString);
    let assetNames = getFlag(options, keys, "assetNames", mustBeString);
    let inject = getFlag(options, keys, "inject", mustBeArray);
    let banner = getFlag(options, keys, "banner", mustBeObject);
    let footer = getFlag(options, keys, "footer", mustBeObject);
    let entryPoints = getFlag(options, keys, "entryPoints", mustBeEntryPoints);
    let absWorkingDir = getFlag(options, keys, "absWorkingDir", mustBeString);
    let stdin = getFlag(options, keys, "stdin", mustBeObject);
    let write = getFlag(options, keys, "write", mustBeBoolean) ?? writeDefault;
    let allowOverwrite = getFlag(options, keys, "allowOverwrite", mustBeBoolean);
    let mangleCache = getFlag(options, keys, "mangleCache", mustBeObject);
    keys.plugins = true;
    checkForInvalidFlags(options, keys, `in ${callName}() call`);
    if (sourcemap) {
        flags.push(`--sourcemap${sourcemap === true ? "" : `=${sourcemap}`}`);
    }
    if (bundle) flags.push("--bundle");
    if (allowOverwrite) flags.push("--allow-overwrite");
    if (splitting) flags.push("--splitting");
    if (preserveSymlinks) flags.push("--preserve-symlinks");
    if (metafile) flags.push(`--metafile`);
    if (outfile) flags.push(`--outfile=${outfile}`);
    if (outdir) flags.push(`--outdir=${outdir}`);
    if (outbase) flags.push(`--outbase=${outbase}`);
    if (tsconfig) flags.push(`--tsconfig=${tsconfig}`);
    if (packages) flags.push(`--packages=${packages}`);
    if (resolveExtensions) {
        let values = [];
        for (let value of resolveExtensions){
            validateStringValue(value, "resolve extension");
            if (value.indexOf(",") >= 0) {
                throw new Error(`Invalid resolve extension: ${value}`);
            }
            values.push(value);
        }
        flags.push(`--resolve-extensions=${values.join(",")}`);
    }
    if (publicPath) flags.push(`--public-path=${publicPath}`);
    if (entryNames) flags.push(`--entry-names=${entryNames}`);
    if (chunkNames) flags.push(`--chunk-names=${chunkNames}`);
    if (assetNames) flags.push(`--asset-names=${assetNames}`);
    if (mainFields) {
        let values = [];
        for (let value of mainFields){
            validateStringValue(value, "main field");
            if (value.indexOf(",") >= 0) {
                throw new Error(`Invalid main field: ${value}`);
            }
            values.push(value);
        }
        flags.push(`--main-fields=${values.join(",")}`);
    }
    if (conditions) {
        let values = [];
        for (let value of conditions){
            validateStringValue(value, "condition");
            if (value.indexOf(",") >= 0) {
                throw new Error(`Invalid condition: ${value}`);
            }
            values.push(value);
        }
        flags.push(`--conditions=${values.join(",")}`);
    }
    if (external) {
        for (let name of external){
            flags.push(`--external:${validateStringValue(name, "external")}`);
        }
    }
    if (alias) {
        for(let old in alias){
            if (old.indexOf("=") >= 0) {
                throw new Error(`Invalid package name in alias: ${old}`);
            }
            flags.push(`--alias:${old}=${validateStringValue(alias[old], "alias", old)}`);
        }
    }
    if (banner) {
        for(let type in banner){
            if (type.indexOf("=") >= 0) {
                throw new Error(`Invalid banner file type: ${type}`);
            }
            flags.push(`--banner:${type}=${validateStringValue(banner[type], "banner", type)}`);
        }
    }
    if (footer) {
        for(let type in footer){
            if (type.indexOf("=") >= 0) {
                throw new Error(`Invalid footer file type: ${type}`);
            }
            flags.push(`--footer:${type}=${validateStringValue(footer[type], "footer", type)}`);
        }
    }
    if (inject) {
        for (let path of inject){
            flags.push(`--inject:${validateStringValue(path, "inject")}`);
        }
    }
    if (loader) {
        for(let ext in loader){
            if (ext.indexOf("=") >= 0) {
                throw new Error(`Invalid loader extension: ${ext}`);
            }
            flags.push(`--loader:${ext}=${validateStringValue(loader[ext], "loader", ext)}`);
        }
    }
    if (outExtension) {
        for(let ext in outExtension){
            if (ext.indexOf("=") >= 0) {
                throw new Error(`Invalid out extension: ${ext}`);
            }
            flags.push(`--out-extension:${ext}=${validateStringValue(outExtension[ext], "out extension", ext)}`);
        }
    }
    if (entryPoints) {
        if (Array.isArray(entryPoints)) {
            for(let i = 0, n = entryPoints.length; i < n; i++){
                let entryPoint = entryPoints[i];
                if (typeof entryPoint === "object" && entryPoint !== null) {
                    let entryPointKeys = Object.create(null);
                    let input = getFlag(entryPoint, entryPointKeys, "in", mustBeString);
                    let output = getFlag(entryPoint, entryPointKeys, "out", mustBeString);
                    checkForInvalidFlags(entryPoint, entryPointKeys, "in entry point at index " + i);
                    if (input === undefined) {
                        throw new Error('Missing property "in" for entry point at index ' + i);
                    }
                    if (output === undefined) {
                        throw new Error('Missing property "out" for entry point at index ' + i);
                    }
                    entries.push([
                        output,
                        input
                    ]);
                } else {
                    entries.push([
                        "",
                        validateStringValue(entryPoint, "entry point at index " + i)
                    ]);
                }
            }
        } else {
            for(let key in entryPoints){
                entries.push([
                    key,
                    validateStringValue(entryPoints[key], "entry point", key)
                ]);
            }
        }
    }
    if (stdin) {
        let stdinKeys = Object.create(null);
        let contents = getFlag(stdin, stdinKeys, "contents", mustBeStringOrUint8Array);
        let resolveDir = getFlag(stdin, stdinKeys, "resolveDir", mustBeString);
        let sourcefile = getFlag(stdin, stdinKeys, "sourcefile", mustBeString);
        let loader = getFlag(stdin, stdinKeys, "loader", mustBeString);
        checkForInvalidFlags(stdin, stdinKeys, 'in "stdin" object');
        if (sourcefile) flags.push(`--sourcefile=${sourcefile}`);
        if (loader) flags.push(`--loader=${loader}`);
        if (resolveDir) stdinResolveDir = resolveDir;
        if (typeof contents === "string") {
            stdinContents = encodeUTF8(contents);
        } else if (contents instanceof Uint8Array) stdinContents = contents;
    }
    let nodePaths = [];
    if (nodePathsInput) {
        for (let value of nodePathsInput){
            value += "";
            nodePaths.push(value);
        }
    }
    return {
        entries,
        flags,
        write,
        stdinContents,
        stdinResolveDir,
        absWorkingDir,
        nodePaths,
        mangleCache: validateMangleCache(mangleCache)
    };
}
function flagsForTransformOptions(callName, options, isTTY, logLevelDefault) {
    let flags = [];
    let keys = Object.create(null);
    pushLogFlags(flags, options, keys, isTTY, logLevelDefault);
    pushCommonFlags(flags, options, keys);
    let sourcemap = getFlag(options, keys, "sourcemap", mustBeStringOrBoolean);
    let sourcefile = getFlag(options, keys, "sourcefile", mustBeString);
    let loader = getFlag(options, keys, "loader", mustBeString);
    let banner = getFlag(options, keys, "banner", mustBeString);
    let footer = getFlag(options, keys, "footer", mustBeString);
    let mangleCache = getFlag(options, keys, "mangleCache", mustBeObject);
    checkForInvalidFlags(options, keys, `in ${callName}() call`);
    if (sourcemap) {
        flags.push(`--sourcemap=${sourcemap === true ? "external" : sourcemap}`);
    }
    if (sourcefile) flags.push(`--sourcefile=${sourcefile}`);
    if (loader) flags.push(`--loader=${loader}`);
    if (banner) flags.push(`--banner=${banner}`);
    if (footer) flags.push(`--footer=${footer}`);
    return {
        flags,
        mangleCache: validateMangleCache(mangleCache)
    };
}
function createChannel(streamIn) {
    const requestCallbacksByKey = {};
    const closeData = {
        didClose: false,
        reason: ""
    };
    let responseCallbacks = {};
    let nextRequestID = 0;
    let nextBuildKey = 0;
    let stdout = new Uint8Array(16 * 1024);
    let stdoutUsed = 0;
    let readFromStdout = (chunk)=>{
        let limit = stdoutUsed + chunk.length;
        if (limit > stdout.length) {
            let swap = new Uint8Array(limit * 2);
            swap.set(stdout);
            stdout = swap;
        }
        stdout.set(chunk, stdoutUsed);
        stdoutUsed += chunk.length;
        let offset = 0;
        while(offset + 4 <= stdoutUsed){
            let length = readUInt32LE(stdout, offset);
            if (offset + 4 + length > stdoutUsed) {
                break;
            }
            offset += 4;
            handleIncomingPacket(stdout.subarray(offset, offset + length));
            offset += length;
        }
        if (offset > 0) {
            stdout.copyWithin(0, offset, stdoutUsed);
            stdoutUsed -= offset;
        }
    };
    let afterClose = (error)=>{
        closeData.didClose = true;
        if (error) closeData.reason = ": " + (error.message || error);
        const text = "The service was stopped" + closeData.reason;
        for(let id in responseCallbacks){
            responseCallbacks[id](text, null);
        }
        responseCallbacks = {};
    };
    let sendRequest = (refs, value, callback)=>{
        if (closeData.didClose) {
            return callback("The service is no longer running" + closeData.reason, null);
        }
        let id = nextRequestID++;
        responseCallbacks[id] = (error, response)=>{
            try {
                callback(error, response);
            } finally{
                if (refs) refs.unref();
            }
        };
        if (refs) refs.ref();
        streamIn.writeToStdin(encodePacket({
            id,
            isRequest: true,
            value: value
        }));
    };
    let sendResponse = (id, value)=>{
        if (closeData.didClose) {
            throw new Error("The service is no longer running" + closeData.reason);
        }
        streamIn.writeToStdin(encodePacket({
            id,
            isRequest: false,
            value
        }));
    };
    let handleRequest = async (id, request)=>{
        try {
            if (request.command === "ping") {
                sendResponse(id, {});
                return;
            }
            if (typeof request.key === "number") {
                const requestCallbacks = requestCallbacksByKey[request.key];
                if (!requestCallbacks) {
                    return;
                }
                const callback = requestCallbacks[request.command];
                if (callback) {
                    await callback(id, request);
                    return;
                }
            }
            throw new Error(`Invalid command: ` + request.command);
        } catch (e) {
            const errors = [
                extractErrorMessageV8(e, streamIn, null, void 0, "")
            ];
            try {
                sendResponse(id, {
                    errors
                });
            } catch  {}
        }
    };
    let isFirstPacket = true;
    let handleIncomingPacket = (bytes)=>{
        if (isFirstPacket) {
            isFirstPacket = false;
            let binaryVersion = String.fromCharCode(...bytes);
            if (binaryVersion !== ESBUILD_VERSION) {
                throw new Error(`Cannot start service: Host version "${ESBUILD_VERSION}" does not match binary version ${quote(binaryVersion)}`);
            }
            return;
        }
        let packet = decodePacket(bytes);
        if (packet.isRequest) {
            handleRequest(packet.id, packet.value);
        } else {
            let callback = responseCallbacks[packet.id];
            delete responseCallbacks[packet.id];
            if (packet.value.error) callback(packet.value.error, {});
            else callback(null, packet.value);
        }
    };
    let buildOrContext = ({ callName, refs, options, isTTY, defaultWD, callback })=>{
        let refCount = 0;
        const buildKey = nextBuildKey++;
        const requestCallbacks = {};
        const buildRefs = {
            ref () {
                if (++refCount === 1) {
                    if (refs) refs.ref();
                }
            },
            unref () {
                if (--refCount === 0) {
                    delete requestCallbacksByKey[buildKey];
                    if (refs) refs.unref();
                }
            }
        };
        requestCallbacksByKey[buildKey] = requestCallbacks;
        buildRefs.ref();
        buildOrContextImpl(callName, buildKey, sendRequest, sendResponse, buildRefs, streamIn, requestCallbacks, options, isTTY, defaultWD, (err, res)=>{
            try {
                callback(err, res);
            } finally{
                buildRefs.unref();
            }
        });
    };
    let transform = ({ callName, refs, input, options, isTTY, fs, callback })=>{
        const details = createObjectStash();
        let start = (inputPath)=>{
            try {
                if (typeof input !== "string" && !(input instanceof Uint8Array)) {
                    throw new Error('The input to "transform" must be a string or a Uint8Array');
                }
                let { flags, mangleCache } = flagsForTransformOptions(callName, options, isTTY, transformLogLevelDefault);
                let request = {
                    command: "transform",
                    flags,
                    inputFS: inputPath !== null,
                    input: inputPath !== null ? encodeUTF8(inputPath) : typeof input === "string" ? encodeUTF8(input) : input
                };
                if (mangleCache) request.mangleCache = mangleCache;
                sendRequest(refs, request, (error, response)=>{
                    if (error) return callback(new Error(error), null);
                    let errors = replaceDetailsInMessages(response.errors, details);
                    let warnings = replaceDetailsInMessages(response.warnings, details);
                    let outstanding = 1;
                    let next = ()=>{
                        if (--outstanding === 0) {
                            let result = {
                                warnings,
                                code: response.code,
                                map: response.map,
                                mangleCache: undefined,
                                legalComments: undefined
                            };
                            if ("legalComments" in response) {
                                result.legalComments = response?.legalComments;
                            }
                            if (response.mangleCache) {
                                result.mangleCache = response?.mangleCache;
                            }
                            callback(null, result);
                        }
                    };
                    if (errors.length > 0) {
                        return callback(failureErrorWithLog("Transform failed", errors, warnings), null);
                    }
                    if (response.codeFS) {
                        outstanding++;
                        fs.readFile(response.code, (err, contents)=>{
                            if (err !== null) {
                                callback(err, null);
                            } else {
                                response.code = contents;
                                next();
                            }
                        });
                    }
                    if (response.mapFS) {
                        outstanding++;
                        fs.readFile(response.map, (err, contents)=>{
                            if (err !== null) {
                                callback(err, null);
                            } else {
                                response.map = contents;
                                next();
                            }
                        });
                    }
                    next();
                });
            } catch (e) {
                let flags = [];
                try {
                    pushLogFlags(flags, options, {}, isTTY, transformLogLevelDefault);
                } catch  {}
                const error = extractErrorMessageV8(e, streamIn, details, void 0, "");
                sendRequest(refs, {
                    command: "error",
                    flags,
                    error
                }, ()=>{
                    error.detail = details.load(error.detail);
                    callback(failureErrorWithLog("Transform failed", [
                        error
                    ], []), null);
                });
            }
        };
        if ((typeof input === "string" || input instanceof Uint8Array) && input.length > 1024 * 1024) {
            let next = start;
            start = ()=>fs.writeFile(input, next);
        }
        start(null);
    };
    let formatMessages = ({ callName, refs, messages, options, callback })=>{
        if (!options) {
            throw new Error(`Missing second argument in ${callName}() call`);
        }
        let keys = {};
        let kind = getFlag(options, keys, "kind", mustBeString);
        let color = getFlag(options, keys, "color", mustBeBoolean);
        let terminalWidth = getFlag(options, keys, "terminalWidth", mustBeInteger);
        checkForInvalidFlags(options, keys, `in ${callName}() call`);
        if (kind === void 0) {
            throw new Error(`Missing "kind" in ${callName}() call`);
        }
        if (kind !== "error" && kind !== "warning") {
            throw new Error(`Expected "kind" to be "error" or "warning" in ${callName}() call`);
        }
        let request = {
            command: "format-msgs",
            messages: sanitizeMessages(messages, "messages", null, "", terminalWidth),
            isWarning: kind === "warning"
        };
        if (color !== void 0) request.color = color;
        if (terminalWidth !== void 0) request.terminalWidth = terminalWidth;
        sendRequest(refs, request, (error, response)=>{
            if (error) return callback(new Error(error), null);
            callback(null, response.messages);
        });
    };
    let analyzeMetafile = ({ callName, refs, metafile, options, callback })=>{
        if (options === void 0) options = {};
        let keys = {};
        let color = getFlag(options, keys, "color", mustBeBoolean);
        let verbose = getFlag(options, keys, "verbose", mustBeBoolean);
        checkForInvalidFlags(options, keys, `in ${callName}() call`);
        let request = {
            command: "analyze-metafile",
            metafile
        };
        if (color !== void 0) request.color = color;
        if (verbose !== void 0) request.verbose = verbose;
        sendRequest(refs, request, (error, response)=>{
            if (error) return callback(new Error(error), null);
            callback(null, response.result);
        });
    };
    return {
        readFromStdout,
        afterClose,
        service: {
            buildOrContext,
            transform,
            formatMessages,
            analyzeMetafile
        }
    };
}
function buildOrContextImpl(callName, buildKey, sendRequest, sendResponse, refs, streamIn, requestCallbacks, options, isTTY, defaultWD, callback) {
    const details = createObjectStash();
    const isContext = callName === "context";
    const handleError = (e, pluginName)=>{
        const flags = [];
        try {
            pushLogFlags(flags, options, {}, isTTY, buildLogLevelDefault);
        } catch  {}
        const message = extractErrorMessageV8(e, streamIn, details, void 0, pluginName);
        sendRequest(refs, {
            command: "error",
            flags,
            error: message
        }, ()=>{
            message.detail = details.load(message.detail);
            callback(failureErrorWithLog(isContext ? "Context failed" : "Build failed", [
                message
            ], []), null);
        });
    };
    let plugins;
    if (typeof options === "object") {
        const value = options.plugins;
        if (value !== void 0) {
            if (!Array.isArray(value)) {
                return handleError(new Error(`"plugins" must be an array`), "");
            }
            plugins = value;
        }
    }
    if (plugins && plugins.length > 0) {
        if (streamIn.isSync) {
            return handleError(new Error("Cannot use plugins in synchronous API calls"), "");
        }
        handlePlugins(buildKey, sendRequest, sendResponse, refs, streamIn, requestCallbacks, options, plugins, details).then((result)=>{
            if (!result.ok) return handleError(result.error, result.pluginName);
            try {
                buildOrContextContinue(result.requestPlugins, result.runOnEndCallbacks, result.scheduleOnDisposeCallbacks);
            } catch (e) {
                handleError(e, "");
            }
        }, (e)=>handleError(e, ""));
        return;
    }
    try {
        buildOrContextContinue(null, (result, done)=>done([], []), ()=>{});
    } catch (e) {
        handleError(e, "");
    }
    function buildOrContextContinue(requestPlugins, runOnEndCallbacks, scheduleOnDisposeCallbacks) {
        const writeDefault = streamIn.hasFS;
        const { entries, flags, write, stdinContents, stdinResolveDir, absWorkingDir, nodePaths, mangleCache } = flagsForBuildOptions(callName, options, isTTY, buildLogLevelDefault, writeDefault);
        if (write && !streamIn.hasFS) {
            throw new Error(`The "write" option is unavailable in this environment`);
        }
        const request = {
            command: "build",
            key: buildKey,
            entries,
            flags,
            write,
            stdinContents,
            stdinResolveDir,
            absWorkingDir: absWorkingDir || defaultWD,
            nodePaths,
            context: isContext
        };
        if (requestPlugins) request.plugins = requestPlugins;
        if (mangleCache) request.mangleCache = mangleCache;
        const buildResponseToResult = (response, callback)=>{
            const result = {
                errors: replaceDetailsInMessages(response.errors, details),
                warnings: replaceDetailsInMessages(response.warnings, details),
                outputFiles: undefined,
                metafile: undefined,
                mangleCache: undefined
            };
            const originalErrors = result.errors.slice();
            const originalWarnings = result.warnings.slice();
            if (response.outputFiles) {
                result.outputFiles = response.outputFiles.map(convertOutputFiles);
            }
            if (response.metafile) result.metafile = JSON.parse(response.metafile);
            if (response.mangleCache) result.mangleCache = response.mangleCache;
            if (response.writeToStdout !== void 0) {
                console.log(decodeUTF8(response.writeToStdout).replace(/\n$/, ""));
            }
            runOnEndCallbacks(result, (onEndErrors, onEndWarnings)=>{
                if (originalErrors.length > 0 || onEndErrors.length > 0) {
                    const error = failureErrorWithLog("Build failed", originalErrors.concat(onEndErrors), originalWarnings.concat(onEndWarnings));
                    return callback(error, null, onEndErrors, onEndWarnings);
                }
                callback(null, result, onEndErrors, onEndWarnings);
            });
        };
        let latestResultPromise;
        let provideLatestResult;
        if (isContext) {
            requestCallbacks["on-end"] = (id, request)=>new Promise((resolve)=>{
                    buildResponseToResult(request, (err, result, onEndErrors, onEndWarnings)=>{
                        const response = {
                            errors: onEndErrors,
                            warnings: onEndWarnings
                        };
                        if (provideLatestResult) provideLatestResult(err, result);
                        latestResultPromise = undefined;
                        provideLatestResult = undefined;
                        sendResponse(id, response);
                        resolve();
                    });
                });
        }
        sendRequest(refs, request, (error, response)=>{
            if (error) return callback(new Error(error), null);
            if (!isContext) {
                return buildResponseToResult(response, (err, res)=>{
                    scheduleOnDisposeCallbacks();
                    return callback(err, res);
                });
            }
            if (response.errors.length > 0) {
                return callback(failureErrorWithLog("Context failed", response.errors, response.warnings), null);
            }
            let didDispose = false;
            const result = {
                rebuild: ()=>{
                    if (!latestResultPromise) {
                        latestResultPromise = new Promise((resolve, reject)=>{
                            let settlePromise;
                            provideLatestResult = (err, result)=>{
                                if (!settlePromise) {
                                    settlePromise = ()=>err ? reject(err) : resolve(result);
                                }
                            };
                            const triggerAnotherBuild = ()=>{
                                const request = {
                                    command: "rebuild",
                                    key: buildKey
                                };
                                sendRequest(refs, request, (error, response)=>{
                                    if (error) {
                                        reject(new Error(error));
                                    } else if (settlePromise) {
                                        settlePromise();
                                    } else {
                                        triggerAnotherBuild();
                                    }
                                });
                            };
                            triggerAnotherBuild();
                        });
                    }
                    return latestResultPromise;
                },
                watch: (options = {})=>new Promise((resolve, reject)=>{
                        if (!streamIn.hasFS) {
                            throw new Error(`Cannot use the "watch" API in this environment`);
                        }
                        const keys = {};
                        checkForInvalidFlags(options, keys, `in watch() call`);
                        const request = {
                            command: "watch",
                            key: buildKey
                        };
                        sendRequest(refs, request, (error)=>{
                            if (error) reject(new Error(error));
                            else resolve(undefined);
                        });
                    }),
                serve: (options = {})=>new Promise((resolve, reject)=>{
                        if (!streamIn.hasFS) {
                            throw new Error(`Cannot use the "serve" API in this environment`);
                        }
                        const keys = {};
                        const port = getFlag(options, keys, "port", mustBeInteger);
                        const host = getFlag(options, keys, "host", mustBeString);
                        const servedir = getFlag(options, keys, "servedir", mustBeString);
                        const keyfile = getFlag(options, keys, "keyfile", mustBeString);
                        const certfile = getFlag(options, keys, "certfile", mustBeString);
                        const fallback = getFlag(options, keys, "fallback", mustBeString);
                        const onRequest = getFlag(options, keys, "onRequest", mustBeFunction);
                        checkForInvalidFlags(options, keys, `in serve() call`);
                        const request = {
                            command: "serve",
                            key: buildKey,
                            onRequest: !!onRequest
                        };
                        if (port !== void 0) request.port = port;
                        if (host !== void 0) request.host = host;
                        if (servedir !== void 0) request.servedir = servedir;
                        if (keyfile !== void 0) request.keyfile = keyfile;
                        if (certfile !== void 0) request.certfile = certfile;
                        if (fallback !== void 0) request.fallback = fallback;
                        sendRequest(refs, request, (error, response)=>{
                            if (error) return reject(new Error(error));
                            if (onRequest) {
                                requestCallbacks["serve-request"] = (id, request)=>{
                                    onRequest(request.args);
                                    sendResponse(id, {});
                                };
                            }
                            resolve(response);
                        });
                    }),
                cancel: ()=>new Promise((resolve)=>{
                        if (didDispose) return resolve();
                        const request = {
                            command: "cancel",
                            key: buildKey
                        };
                        sendRequest(refs, request, ()=>{
                            resolve();
                        });
                    }),
                dispose: ()=>new Promise((resolve)=>{
                        if (didDispose) return resolve();
                        didDispose = true;
                        const request = {
                            command: "dispose",
                            key: buildKey
                        };
                        sendRequest(refs, request, ()=>{
                            resolve();
                            scheduleOnDisposeCallbacks();
                            refs.unref();
                        });
                    })
            };
            refs.ref();
            callback(null, result);
        });
    }
}
let handlePlugins = async (buildKey, sendRequest, sendResponse, refs, streamIn, requestCallbacks, initialOptions, plugins, details)=>{
    let onStartCallbacks = [];
    let onEndCallbacks = [];
    let onResolveCallbacks = {};
    let onLoadCallbacks = {};
    let onDisposeCallbacks = [];
    let nextCallbackID = 0;
    let i = 0;
    let requestPlugins = [];
    let isSetupDone = false;
    plugins = [
        ...plugins
    ];
    for (let item of plugins){
        let keys = {};
        if (typeof item !== "object") {
            throw new Error(`Plugin at index ${i} must be an object`);
        }
        const name = getFlag(item, keys, "name", mustBeString);
        if (typeof name !== "string" || name === "") {
            throw new Error(`Plugin at index ${i} is missing a name`);
        }
        try {
            let setup = getFlag(item, keys, "setup", mustBeFunction);
            if (typeof setup !== "function") {
                throw new Error(`Plugin is missing a setup function`);
            }
            checkForInvalidFlags(item, keys, `on plugin ${quote(name)}`);
            let plugin = {
                name,
                onStart: false,
                onEnd: false,
                onResolve: [],
                onLoad: []
            };
            i++;
            let resolve = (path, options = {})=>{
                if (!isSetupDone) {
                    throw new Error('Cannot call "resolve" before plugin setup has completed');
                }
                if (typeof path !== "string") {
                    throw new Error(`The path to resolve must be a string`);
                }
                let keys = Object.create(null);
                let pluginName = getFlag(options, keys, "pluginName", mustBeString);
                let importer = getFlag(options, keys, "importer", mustBeString);
                let namespace = getFlag(options, keys, "namespace", mustBeString);
                let resolveDir = getFlag(options, keys, "resolveDir", mustBeString);
                let kind = getFlag(options, keys, "kind", mustBeString);
                let pluginData = getFlag(options, keys, "pluginData", canBeAnything);
                let importAttributes = getFlag(options, keys, "with", mustBeObject);
                checkForInvalidFlags(options, keys, "in resolve() call");
                return new Promise((resolve, reject)=>{
                    const request = {
                        command: "resolve",
                        path,
                        key: buildKey,
                        pluginName: name
                    };
                    if (pluginName != null) request.pluginName = pluginName;
                    if (importer != null) request.importer = importer;
                    if (namespace != null) request.namespace = namespace;
                    if (resolveDir != null) request.resolveDir = resolveDir;
                    if (kind != null) request.kind = kind;
                    else throw new Error(`Must specify "kind" when calling "resolve"`);
                    if (pluginData != null) {
                        request.pluginData = details.store(pluginData);
                    }
                    if (importAttributes != null) {
                        request.with = sanitizeStringMap(importAttributes, "with");
                    }
                    sendRequest(refs, request, (error, response)=>{
                        if (error !== null) reject(new Error(error));
                        else {
                            resolve({
                                errors: replaceDetailsInMessages(response.errors, details),
                                warnings: replaceDetailsInMessages(response.warnings, details),
                                path: response.path,
                                external: response.external,
                                sideEffects: response.sideEffects,
                                namespace: response.namespace,
                                suffix: response.suffix,
                                pluginData: details.load(response.pluginData)
                            });
                        }
                    });
                });
            };
            let promise = setup({
                initialOptions,
                resolve,
                onStart (callback) {
                    let registeredText = `This error came from the "onStart" callback registered here:`;
                    let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onStart");
                    onStartCallbacks.push({
                        name: name,
                        callback,
                        note: registeredNote
                    });
                    plugin.onStart = true;
                },
                onEnd (callback) {
                    let registeredText = `This error came from the "onEnd" callback registered here:`;
                    let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onEnd");
                    onEndCallbacks.push({
                        name: name,
                        callback,
                        note: registeredNote
                    });
                    plugin.onEnd = true;
                },
                onResolve (options, callback) {
                    let registeredText = `This error came from the "onResolve" callback registered here:`;
                    let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onResolve");
                    let keys = {};
                    let filter = getFlag(options, keys, "filter", mustBeRegExp);
                    let namespace = getFlag(options, keys, "namespace", mustBeString);
                    checkForInvalidFlags(options, keys, `in onResolve() call for plugin ${quote(name)}`);
                    if (filter == null) {
                        throw new Error(`onResolve() call is missing a filter`);
                    }
                    let id = nextCallbackID++;
                    onResolveCallbacks[id] = {
                        name: name,
                        callback,
                        note: registeredNote
                    };
                    plugin.onResolve.push({
                        id,
                        filter: filter.source,
                        namespace: namespace || ""
                    });
                },
                onLoad (options, callback) {
                    let registeredText = `This error came from the "onLoad" callback registered here:`;
                    let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onLoad");
                    let keys = {};
                    let filter = getFlag(options, keys, "filter", mustBeRegExp);
                    let namespace = getFlag(options, keys, "namespace", mustBeString);
                    checkForInvalidFlags(options, keys, `in onLoad() call for plugin ${quote(name)}`);
                    if (filter == null) {
                        throw new Error(`onLoad() call is missing a filter`);
                    }
                    let id = nextCallbackID++;
                    onLoadCallbacks[id] = {
                        name: name,
                        callback,
                        note: registeredNote
                    };
                    plugin.onLoad.push({
                        id,
                        filter: filter.source,
                        namespace: namespace || ""
                    });
                },
                onDispose (callback) {
                    onDisposeCallbacks.push(callback);
                },
                esbuild: streamIn.esbuild
            });
            if (promise) await promise;
            requestPlugins.push(plugin);
        } catch (e) {
            return {
                ok: false,
                error: e,
                pluginName: name
            };
        }
    }
    requestCallbacks["on-start"] = async (id, request)=>{
        let response = {
            errors: [],
            warnings: []
        };
        await Promise.all(onStartCallbacks.map(async ({ name, callback, note })=>{
            try {
                let result = await callback();
                if (result != null) {
                    if (typeof result !== "object") {
                        throw new Error(`Expected onStart() callback in plugin ${quote(name)} to return an object`);
                    }
                    let keys = {};
                    let errors = getFlag(result, keys, "errors", mustBeArray);
                    let warnings = getFlag(result, keys, "warnings", mustBeArray);
                    checkForInvalidFlags(result, keys, `from onStart() callback in plugin ${quote(name)}`);
                    if (errors != null) {
                        response.errors.push(...sanitizeMessages(errors, "errors", details, name, undefined));
                    }
                    if (warnings != null) {
                        response.warnings.push(...sanitizeMessages(warnings, "warnings", details, name, undefined));
                    }
                }
            } catch (e) {
                response.errors.push(extractErrorMessageV8(e, streamIn, details, note && note(), name));
            }
        }));
        sendResponse(id, response);
    };
    requestCallbacks["on-resolve"] = async (id, request)=>{
        let response = {}, name = "", callback, note;
        for (let id of request.ids){
            try {
                ({ name, callback, note } = onResolveCallbacks[id]);
                let result = await callback({
                    path: request.path,
                    importer: request.importer,
                    namespace: request.namespace,
                    resolveDir: request.resolveDir,
                    kind: request.kind,
                    pluginData: details.load(request.pluginData),
                    with: request.with
                });
                if (result != null) {
                    if (typeof result !== "object") {
                        throw new Error(`Expected onResolve() callback in plugin ${quote(name)} to return an object`);
                    }
                    let keys = {};
                    let pluginName = getFlag(result, keys, "pluginName", mustBeString);
                    let path = getFlag(result, keys, "path", mustBeString);
                    let namespace = getFlag(result, keys, "namespace", mustBeString);
                    let suffix = getFlag(result, keys, "suffix", mustBeString);
                    let external = getFlag(result, keys, "external", mustBeBoolean);
                    let sideEffects = getFlag(result, keys, "sideEffects", mustBeBoolean);
                    let pluginData = getFlag(result, keys, "pluginData", canBeAnything);
                    let errors = getFlag(result, keys, "errors", mustBeArray);
                    let warnings = getFlag(result, keys, "warnings", mustBeArray);
                    let watchFiles = getFlag(result, keys, "watchFiles", mustBeArray);
                    let watchDirs = getFlag(result, keys, "watchDirs", mustBeArray);
                    checkForInvalidFlags(result, keys, `from onResolve() callback in plugin ${quote(name)}`);
                    response.id = id;
                    if (pluginName != null) response.pluginName = pluginName;
                    if (path != null) response.path = path;
                    if (namespace != null) response.namespace = namespace;
                    if (suffix != null) response.suffix = suffix;
                    if (external != null) response.external = external;
                    if (sideEffects != null) response.sideEffects = sideEffects;
                    if (pluginData != null) {
                        response.pluginData = details.store(pluginData);
                    }
                    if (errors != null) {
                        response.errors = sanitizeMessages(errors, "errors", details, name, undefined);
                    }
                    if (warnings != null) {
                        response.warnings = sanitizeMessages(warnings, "warnings", details, name, undefined);
                    }
                    if (watchFiles != null) {
                        response.watchFiles = sanitizeStringArray(watchFiles, "watchFiles");
                    }
                    if (watchDirs != null) {
                        response.watchDirs = sanitizeStringArray(watchDirs, "watchDirs");
                    }
                    break;
                }
            } catch (e) {
                response = {
                    id,
                    errors: [
                        extractErrorMessageV8(e, streamIn, details, note && note(), name)
                    ]
                };
                break;
            }
        }
        sendResponse(id, response);
    };
    requestCallbacks["on-load"] = async (id, request)=>{
        let response = {}, name = "", callback, note;
        for (let id of request.ids){
            try {
                ({ name, callback, note } = onLoadCallbacks[id]);
                let result = await callback({
                    path: request.path,
                    namespace: request.namespace,
                    suffix: request.suffix,
                    pluginData: details.load(request.pluginData),
                    with: request.with
                });
                if (result != null) {
                    if (typeof result !== "object") {
                        throw new Error(`Expected onLoad() callback in plugin ${quote(name)} to return an object`);
                    }
                    let keys = {};
                    let pluginName = getFlag(result, keys, "pluginName", mustBeString);
                    let contents = getFlag(result, keys, "contents", mustBeStringOrUint8Array);
                    let resolveDir = getFlag(result, keys, "resolveDir", mustBeString);
                    let pluginData = getFlag(result, keys, "pluginData", canBeAnything);
                    let loader = getFlag(result, keys, "loader", mustBeString);
                    let errors = getFlag(result, keys, "errors", mustBeArray);
                    let warnings = getFlag(result, keys, "warnings", mustBeArray);
                    let watchFiles = getFlag(result, keys, "watchFiles", mustBeArray);
                    let watchDirs = getFlag(result, keys, "watchDirs", mustBeArray);
                    checkForInvalidFlags(result, keys, `from onLoad() callback in plugin ${quote(name)}`);
                    response.id = id;
                    if (pluginName != null) response.pluginName = pluginName;
                    if (contents instanceof Uint8Array) response.contents = contents;
                    else if (contents != null) {
                        response.contents = encodeUTF8(contents);
                    }
                    if (resolveDir != null) response.resolveDir = resolveDir;
                    if (pluginData != null) {
                        response.pluginData = details.store(pluginData);
                    }
                    if (loader != null) response.loader = loader;
                    if (errors != null) {
                        response.errors = sanitizeMessages(errors, "errors", details, name, undefined);
                    }
                    if (warnings != null) {
                        response.warnings = sanitizeMessages(warnings, "warnings", details, name, undefined);
                    }
                    if (watchFiles != null) {
                        response.watchFiles = sanitizeStringArray(watchFiles, "watchFiles");
                    }
                    if (watchDirs != null) {
                        response.watchDirs = sanitizeStringArray(watchDirs, "watchDirs");
                    }
                    break;
                }
            } catch (e) {
                response = {
                    id,
                    errors: [
                        extractErrorMessageV8(e, streamIn, details, note && note(), name)
                    ]
                };
                break;
            }
        }
        sendResponse(id, response);
    };
    let runOnEndCallbacks = (result, done)=>done([], []);
    if (onEndCallbacks.length > 0) {
        runOnEndCallbacks = (result, done)=>{
            (async ()=>{
                const onEndErrors = [];
                const onEndWarnings = [];
                for (const { name, callback, note } of onEndCallbacks){
                    let newErrors;
                    let newWarnings;
                    try {
                        const value = await callback(result);
                        if (value != null) {
                            if (typeof value !== "object") {
                                throw new Error(`Expected onEnd() callback in plugin ${quote(name)} to return an object`);
                            }
                            let keys = {};
                            let errors = getFlag(value, keys, "errors", mustBeArray);
                            let warnings = getFlag(value, keys, "warnings", mustBeArray);
                            checkForInvalidFlags(value, keys, `from onEnd() callback in plugin ${quote(name)}`);
                            if (errors != null) {
                                newErrors = sanitizeMessages(errors, "errors", details, name, undefined);
                            }
                            if (warnings != null) {
                                newWarnings = sanitizeMessages(warnings, "warnings", details, name, undefined);
                            }
                        }
                    } catch (e) {
                        newErrors = [
                            extractErrorMessageV8(e, streamIn, details, note && note(), name)
                        ];
                    }
                    if (newErrors) {
                        onEndErrors.push(...newErrors);
                        try {
                            result.errors.push(...newErrors);
                        } catch  {}
                    }
                    if (newWarnings) {
                        onEndWarnings.push(...newWarnings);
                        try {
                            result.warnings.push(...newWarnings);
                        } catch  {}
                    }
                }
                done(onEndErrors, onEndWarnings);
            })();
        };
    }
    let scheduleOnDisposeCallbacks = ()=>{
        for (const cb of onDisposeCallbacks){
            setTimeout(()=>cb(), 0);
        }
    };
    isSetupDone = true;
    return {
        ok: true,
        requestPlugins,
        runOnEndCallbacks,
        scheduleOnDisposeCallbacks
    };
};
function createObjectStash() {
    const map = new Map();
    let nextID = 0;
    return {
        load (id) {
            return map.get(id);
        },
        store (value) {
            if (value === void 0) return -1;
            const id = nextID++;
            map.set(id, value);
            return id;
        }
    };
}
function extractCallerV8(e, streamIn, ident) {
    let note;
    let tried = false;
    return ()=>{
        if (tried) return note;
        tried = true;
        try {
            let lines = (e.stack + "").split("\n");
            lines.splice(1, 1);
            let location1 = parseStackLinesV8(streamIn, lines, ident);
            if (location1) {
                note = {
                    text: e.message,
                    location: location1
                };
                return note;
            }
        } catch  {}
    };
}
function extractErrorMessageV8(e, streamIn, stash, note, pluginName) {
    let text = "Internal error";
    let location1 = null;
    try {
        text = (e && e.message || e) + "";
    } catch  {}
    try {
        location1 = parseStackLinesV8(streamIn, (e.stack + "").split("\n"), "");
    } catch  {}
    return {
        id: "",
        pluginName,
        text,
        location: location1,
        notes: note ? [
            note
        ] : [],
        detail: stash ? stash.store(e) : -1
    };
}
function parseStackLinesV8(streamIn, lines, ident) {
    let at = "    at ";
    if (streamIn.readFileSync && !lines[0].startsWith(at) && lines[1].startsWith(at)) {
        for(let i = 1; i < lines.length; i++){
            let line = lines[i];
            if (!line.startsWith(at)) continue;
            line = line.slice(at.length);
            while(true){
                let match = /^(?:new |async )?\S+ \((.*)\)$/.exec(line);
                if (match) {
                    line = match[1];
                    continue;
                }
                match = /^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(line);
                if (match) {
                    line = match[1];
                    continue;
                }
                match = /^(\S+):(\d+):(\d+)$/.exec(line);
                if (match) {
                    let contents;
                    try {
                        contents = streamIn.readFileSync(match[1], "utf8");
                    } catch  {
                        break;
                    }
                    let lineText = contents.split(/\r\n|\r|\n|\u2028|\u2029/)[+match[2] - 1] || "";
                    let column = +match[3] - 1;
                    let length = lineText.slice(column, column + ident.length) === ident ? ident.length : 0;
                    return {
                        file: match[1],
                        namespace: "file",
                        line: +match[2],
                        column: encodeUTF8(lineText.slice(0, column)).length,
                        length: encodeUTF8(lineText.slice(column, column + length)).length,
                        lineText: lineText + "\n" + lines.slice(1).join("\n"),
                        suggestion: ""
                    };
                }
                break;
            }
        }
    }
    return null;
}
function failureErrorWithLog(text, errors, warnings) {
    let limit = 5;
    text += errors.length < 1 ? "" : ` with ${errors.length} error${errors.length < 2 ? "" : "s"}:` + errors.slice(0, limit + 1).map((e, i)=>{
        if (i === limit) return "\n...";
        if (!e.location) return `\nerror: ${e.text}`;
        let { file, line, column } = e.location;
        let pluginText = e.pluginName ? `[plugin: ${e.pluginName}] ` : "";
        return `\n${file}:${line}:${column}: ERROR: ${pluginText}${e.text}`;
    }).join("");
    let error = new Error(text);
    for (const [key, value] of [
        [
            "errors",
            errors
        ],
        [
            "warnings",
            warnings
        ]
    ]){
        Object.defineProperty(error, key, {
            configurable: true,
            enumerable: true,
            get: ()=>value,
            set: (value)=>Object.defineProperty(error, key, {
                    configurable: true,
                    enumerable: true,
                    value
                })
        });
    }
    return error;
}
function replaceDetailsInMessages(messages, stash) {
    for (const message of messages){
        message.detail = stash.load(message.detail);
    }
    return messages;
}
function sanitizeLocation(location1, where, terminalWidth) {
    if (location1 == null) return null;
    let keys = {};
    let file = getFlag(location1, keys, "file", mustBeString);
    let namespace = getFlag(location1, keys, "namespace", mustBeString);
    let line = getFlag(location1, keys, "line", mustBeInteger);
    let column = getFlag(location1, keys, "column", mustBeInteger);
    let length = getFlag(location1, keys, "length", mustBeInteger);
    let lineText = getFlag(location1, keys, "lineText", mustBeString);
    let suggestion = getFlag(location1, keys, "suggestion", mustBeString);
    checkForInvalidFlags(location1, keys, where);
    if (lineText) {
        const relevantASCII = lineText.slice(0, (column && column > 0 ? column : 0) + (length && length > 0 ? length : 0) + (terminalWidth && terminalWidth > 0 ? terminalWidth : 80));
        if (!/[\x7F-\uFFFF]/.test(relevantASCII) && !/\n/.test(lineText)) {
            lineText = relevantASCII;
        }
    }
    return {
        file: file || "",
        namespace: namespace || "",
        line: line || 0,
        column: column || 0,
        length: length || 0,
        lineText: lineText || "",
        suggestion: suggestion || ""
    };
}
function sanitizeMessages(messages, property, stash, fallbackPluginName, terminalWidth) {
    let messagesClone = [];
    let index = 0;
    for (const message of messages){
        let keys = {};
        let id = getFlag(message, keys, "id", mustBeString);
        let pluginName = getFlag(message, keys, "pluginName", mustBeString);
        let text = getFlag(message, keys, "text", mustBeString);
        let location1 = getFlag(message, keys, "location", mustBeObjectOrNull);
        let notes = getFlag(message, keys, "notes", mustBeArray);
        let detail = getFlag(message, keys, "detail", canBeAnything);
        let where = `in element ${index} of "${property}"`;
        checkForInvalidFlags(message, keys, where);
        let notesClone = [];
        if (notes) {
            for (const note of notes){
                let noteKeys = {};
                let noteText = getFlag(note, noteKeys, "text", mustBeString);
                let noteLocation = getFlag(note, noteKeys, "location", mustBeObjectOrNull);
                checkForInvalidFlags(note, noteKeys, where);
                notesClone.push({
                    text: noteText || "",
                    location: sanitizeLocation(noteLocation, where, terminalWidth)
                });
            }
        }
        messagesClone.push({
            id: id || "",
            pluginName: pluginName || fallbackPluginName,
            text: text || "",
            location: sanitizeLocation(location1, where, terminalWidth),
            notes: notesClone,
            detail: stash ? stash.store(detail) : -1
        });
        index++;
    }
    return messagesClone;
}
function sanitizeStringArray(values, property) {
    const result = [];
    for (const value of values){
        if (typeof value !== "string") {
            throw new Error(`${quote(property)} must be an array of strings`);
        }
        result.push(value);
    }
    return result;
}
function sanitizeStringMap(map, property) {
    const result = Object.create(null);
    for(const key in map){
        const value = map[key];
        if (typeof value !== "string") {
            throw new Error(`key ${quote(key)} in object ${quote(property)} must be a string`);
        }
        result[key] = value;
    }
    return result;
}
function convertOutputFiles({ path, contents, hash }) {
    let text = null;
    return {
        path,
        contents,
        hash,
        get text () {
            const binary = this.contents;
            if (text === null || binary !== contents) {
                contents = binary;
                text = decodeUTF8(binary);
            }
            return text;
        }
    };
}
const build = (options)=>ensureServiceIsRunning().build(options);
const transform = (input, options)=>ensureServiceIsRunning().transform(input, options);
const formatMessages = (messages, options)=>ensureServiceIsRunning().formatMessages(messages, options);
const analyzeMetafile = (metafile, options)=>ensureServiceIsRunning().analyzeMetafile(metafile, options);
let initializePromise;
let longLivedService;
const ensureServiceIsRunning = ()=>{
    if (longLivedService) return longLivedService;
    if (initializePromise) {
        throw new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this');
    }
    throw new Error('You need to call "initialize" before calling this');
};
const initialize = (options)=>{
    options = validateInitializeOptions(options || {});
    const wasmModule = options.wasmModule;
    const workerURL = options.workerURL;
    if (!wasmModule) {
        throw new Error('Must provide the "wasmModule" option');
    }
    if (initializePromise) {
        throw new Error('Cannot call "initialize" more than once');
    }
    initializePromise = startRunningService(wasmModule, workerURL);
    initializePromise.catch(()=>{
        initializePromise = void 0;
    });
    return initializePromise;
};
const startRunningService = async (wasmModule, workerURL)=>{
    const worker = new Worker(workerURL.toString(), {
        type: "module"
    });
    let firstMessageResolve;
    let firstMessageReject;
    const firstMessagePromise = new Promise((resolve, reject)=>{
        firstMessageResolve = resolve;
        firstMessageReject = reject;
    });
    worker.onmessage = ({ data: error })=>{
        worker.onmessage = ({ data })=>readFromStdout(data);
        if (error) firstMessageReject(error);
        else firstMessageResolve();
    };
    worker.postMessage(wasmModule);
    const { readFromStdout, service } = createChannel({
        writeToStdin (bytes) {
            worker.postMessage(bytes);
        },
        isSync: false,
        hasFS: false,
        esbuild: {
            build,
            transform,
            formatMessages,
            analyzeMetafile,
            version: ESBUILD_VERSION,
            initialize
        }
    });
    await firstMessagePromise;
    ()=>{
        worker.terminate();
        initializePromise = undefined;
        undefined;
        longLivedService = undefined;
    };
    longLivedService = {
        build: (options)=>new Promise((resolve, reject)=>service.buildOrContext({
                    callName: "build",
                    refs: null,
                    options,
                    isTTY: false,
                    defaultWD: "/",
                    callback: (err, res)=>err ? reject(err) : resolve(res)
                })),
        transform: (input, options)=>new Promise((resolve, reject)=>service.transform({
                    callName: "transform",
                    refs: null,
                    input,
                    options: options || {},
                    isTTY: false,
                    fs: {
                        readFile (_, callback) {
                            callback(new Error("Internal error"), null);
                        },
                        writeFile (_, callback) {
                            callback(null);
                        }
                    },
                    callback: (err, res)=>err ? reject(err) : resolve(res)
                })),
        formatMessages: (messages, options)=>new Promise((resolve, reject)=>service.formatMessages({
                    callName: "formatMessages",
                    refs: null,
                    messages,
                    options,
                    callback: (err, res)=>err ? reject(err) : resolve(res)
                })),
        analyzeMetafile: (metafile, options)=>new Promise((resolve, reject)=>service.analyzeMetafile({
                    callName: "analyzeMetafile",
                    refs: null,
                    metafile: typeof metafile === "string" ? metafile : JSON.stringify(metafile),
                    options,
                    callback: (err, res)=>err ? reject(err) : resolve(res)
                }))
    };
};
function isObject(object) {
    return typeof object == "object" && object !== null && object.constructor === Object;
}
function sortObject(normalized) {
    const sorted = {};
    const sortedKeys = Object.keys(normalized).sort((a, b)=>b.length - a.length);
    for (const key of sortedKeys){
        sorted[key] = normalized[key];
    }
    return sorted;
}
function isImportMap(importMap) {
    return isObject(importMap) && (importMap.imports !== undefined ? isImports(importMap.imports) : true) && (importMap.scopes !== undefined ? isScopes(importMap.scopes) : true);
}
function isImports(importsMap) {
    return isObject(importsMap);
}
function isScopes(scopes) {
    return isObject(scopes) && Object.values(scopes).every((value)=>isSpecifierMap(value));
}
function isSpecifierMap(specifierMap) {
    return isObject(specifierMap);
}
function isURL(url) {
    try {
        new URL(url);
        return true;
    } catch  {
        return false;
    }
}
function sortAndNormalizeSpecifierMap(originalMap, baseURL) {
    const normalized = {};
    for (const [specifierKey, value] of Object.entries(originalMap)){
        const normalizedSpecifierKey = normalizeSpecifierKey(specifierKey, baseURL);
        if (normalizedSpecifierKey === null) continue;
        if (typeof value !== "string") {
            console.warn(`addresses need to be strings.`);
            normalized[normalizedSpecifierKey] = null;
            continue;
        }
        const addressURL = parseUrlLikeImportSpecifier(value, baseURL);
        if (addressURL === null) {
            console.warn(`the address was invalid.`);
            normalized[normalizedSpecifierKey] = null;
            continue;
        }
        if (specifierKey.endsWith("/") && !serializeURL(addressURL).endsWith("/")) {
            console.warn(`an invalid address was given for the specifier key specifierKey; since specifierKey ended in a slash, the address needs to as well.`);
            normalized[normalizedSpecifierKey] = null;
            continue;
        }
        normalized[normalizedSpecifierKey] = serializeURL(addressURL);
    }
    return sortObject(normalized);
}
function serializeURL(url) {
    return url.href;
}
function sortAndNormalizeScopes(originalMap, baseURL) {
    const normalized = {};
    for (const [scopePrefix, potentialSpecifierMap] of Object.entries(originalMap)){
        if (!isSpecifierMap(potentialSpecifierMap)) {
            throw new TypeError(`the value of the scope with prefix scopePrefix needs to be an object.`);
        }
        let scopePrefixURL;
        try {
            scopePrefixURL = new URL(scopePrefix, baseURL);
        } catch  {
            console.warn(`the scope prefix URL was not parseable.`);
            continue;
        }
        const normalizedScopePrefix = serializeURL(scopePrefixURL);
        normalized[normalizedScopePrefix] = sortAndNormalizeSpecifierMap(potentialSpecifierMap, baseURL);
    }
    const sorted = {};
    for (const key of Object.keys(normalized)){
        sorted[key] = sortObject(normalized[key]);
    }
    return sortObject(sorted);
}
function normalizeSpecifierKey(specifierKey, baseURL) {
    if (!specifierKey.length) {
        console.warn("specifier key cannot be an empty string.");
        return null;
    }
    const url = parseUrlLikeImportSpecifier(specifierKey, baseURL);
    if (url !== null) {
        return serializeURL(url);
    }
    return specifierKey;
}
function parseUrlLikeImportSpecifier(specifier, baseURL) {
    if (baseURL && (specifier.startsWith("/") || specifier.startsWith("./") || specifier.startsWith("../"))) {
        try {
            const url = new URL(specifier, baseURL);
            return url;
        } catch  {
            return null;
        }
    }
    try {
        const url = new URL(specifier);
        return url;
    } catch  {
        return null;
    }
}
const specialSchemes = [
    "ftp",
    "file",
    "http",
    "https",
    "ws",
    "wss"
];
function isSpecial(asURL) {
    return specialSchemes.some((scheme)=>serializeURL(asURL).startsWith(scheme));
}
function resolveImportsMatch(normalizedSpecifier, asURL, specifierMap) {
    for (const [specifierKey, resolutionResult] of Object.entries(specifierMap)){
        if (specifierKey === normalizedSpecifier) {
            if (resolutionResult === null) {
                throw new TypeError(`resolution of specifierKey was blocked by a null entry.`);
            }
            if (!isURL(resolutionResult)) {
                throw new TypeError(`resolutionResult must be an URL.`);
            }
            return resolutionResult;
        } else if (specifierKey.endsWith("/") && normalizedSpecifier.startsWith(specifierKey) && (asURL === null || isSpecial(asURL))) {
            if (resolutionResult === null) {
                throw new TypeError(`resolution of specifierKey was blocked by a null entry.`);
            }
            if (!isURL(resolutionResult)) {
                throw new TypeError(`resolutionResult must be an URL.`);
            }
            const afterPrefix = normalizedSpecifier.slice(specifierKey.length);
            if (!resolutionResult.endsWith("/")) {
                throw new TypeError(`resolutionResult does not end with "/"`);
            }
            try {
                const url = new URL(afterPrefix, resolutionResult);
                if (!isURL(url)) {
                    throw new TypeError(`url must be an URL.`);
                }
                if (!serializeURL(url).startsWith(resolutionResult)) {
                    throw new TypeError(`resolution of normalizedSpecifier was blocked due to it backtracking above its prefix specifierKey.`);
                }
                return serializeURL(url);
            } catch  {
                throw new TypeError(`resolution of normalizedSpecifier was blocked since the afterPrefix portion could not be URL-parsed relative to the resolutionResult mapped to by the specifierKey prefix.`);
            }
        }
    }
    return null;
}
function resolveImportMap(importMap, baseURL) {
    let sortedAndNormalizedImports = {};
    if (!isImportMap(importMap)) {
        throw new TypeError(`the top-level value needs to be a JSON object.`);
    }
    const { imports, scopes } = importMap;
    if (imports !== undefined) {
        if (!isImports(imports)) {
            throw new TypeError(`"imports" top-level key needs to be an object.`);
        }
        sortedAndNormalizedImports = sortAndNormalizeSpecifierMap(imports, baseURL);
    }
    let sortedAndNormalizedScopes = {};
    if (scopes !== undefined) {
        if (!isScopes(scopes)) {
            throw new TypeError(`"scopes" top-level key needs to be an object.`);
        }
        sortedAndNormalizedScopes = sortAndNormalizeScopes(scopes, baseURL);
    }
    if (Object.keys(importMap).find((key)=>key !== "imports" && key !== "scopes")) {
        console.warn(`an invalid top-level key was present in the import map.`);
    }
    return {
        imports: sortedAndNormalizedImports,
        scopes: sortedAndNormalizedScopes
    };
}
function resolveModuleSpecifier(specifier, { imports = {}, scopes = {} }, baseURL) {
    const baseURLString = serializeURL(baseURL);
    const asURL = parseUrlLikeImportSpecifier(specifier, baseURL);
    const normalizedSpecifier = asURL !== null ? serializeURL(asURL) : specifier;
    for (const [scopePrefix, scopeImports] of Object.entries(scopes)){
        if (scopePrefix === baseURLString || scopePrefix.endsWith("/") && baseURLString.startsWith(scopePrefix)) {
            const scopeImportsMatch = resolveImportsMatch(normalizedSpecifier, asURL, scopeImports);
            if (scopeImportsMatch !== null) {
                return scopeImportsMatch;
            }
        }
    }
    const topLevelImportsMatch = resolveImportsMatch(normalizedSpecifier, asURL, imports);
    if (topLevelImportsMatch !== null) {
        return topLevelImportsMatch;
    }
    if (asURL !== null) {
        return serializeURL(asURL);
    }
    throw new TypeError(`specifier was a bare specifier, but was not remapped to anything by importMap.`);
}
function assertPath(path) {
    if (typeof path !== "string") {
        throw new TypeError(`Path must be a string. Received ${JSON.stringify(path)}`);
    }
}
function stripSuffix(name, suffix) {
    if (suffix.length >= name.length) {
        return name;
    }
    const lenDiff = name.length - suffix.length;
    for(let i = suffix.length - 1; i >= 0; --i){
        if (name.charCodeAt(lenDiff + i) !== suffix.charCodeAt(i)) {
            return name;
        }
    }
    return name.slice(0, -suffix.length);
}
function lastPathSegment(path, isSep, start = 0) {
    let matchedNonSeparator = false;
    let end = path.length;
    for(let i = path.length - 1; i >= start; --i){
        if (isSep(path.charCodeAt(i))) {
            if (matchedNonSeparator) {
                start = i + 1;
                break;
            }
        } else if (!matchedNonSeparator) {
            matchedNonSeparator = true;
            end = i + 1;
        }
    }
    return path.slice(start, end);
}
function assertArgs(path, suffix) {
    assertPath(path);
    if (path.length === 0) return path;
    if (typeof suffix !== "string") {
        throw new TypeError(`Suffix must be a string. Received ${JSON.stringify(suffix)}`);
    }
}
function stripTrailingSeparators(segment, isSep) {
    if (segment.length <= 1) {
        return segment;
    }
    let end = segment.length;
    for(let i = segment.length - 1; i > 0; i--){
        if (isSep(segment.charCodeAt(i))) {
            end = i;
        } else {
            break;
        }
    }
    return segment.slice(0, end);
}
function isPathSeparator(code) {
    return code === 47 || code === 92;
}
function isWindowsDeviceRoot(code) {
    return code >= 97 && code <= 122 || code >= 65 && code <= 90;
}
function assertArg(url) {
    url = url instanceof URL ? url : new URL(url);
    if (url.protocol !== "file:") {
        throw new TypeError("Must be a file URL.");
    }
    return url;
}
function fromFileUrl(url) {
    url = assertArg(url);
    let path = decodeURIComponent(url.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
    if (url.hostname !== "") {
        path = `\\\\${url.hostname}${path}`;
    }
    return path;
}
function isAbsolute(path) {
    assertPath(path);
    const len = path.length;
    if (len === 0) return false;
    const code = path.charCodeAt(0);
    if (isPathSeparator(code)) {
        return true;
    } else if (isWindowsDeviceRoot(code)) {
        if (len > 2 && path.charCodeAt(1) === 58) {
            if (isPathSeparator(path.charCodeAt(2))) return true;
        }
    }
    return false;
}
const WHITESPACE_ENCODINGS = {
    "\u0009": "%09",
    "\u000A": "%0A",
    "\u000B": "%0B",
    "\u000C": "%0C",
    "\u000D": "%0D",
    "\u0020": "%20"
};
function encodeWhitespace(string) {
    return string.replaceAll(/[\s]/g, (c)=>{
        return WHITESPACE_ENCODINGS[c] ?? c;
    });
}
function toFileUrl(path) {
    if (!isAbsolute(path)) {
        throw new TypeError("Must be an absolute path.");
    }
    const [, hostname, pathname] = path.match(/^(?:[/\\]{2}([^/\\]+)(?=[/\\](?:[^/\\]|$)))?(.*)/);
    const url = new URL("file:///");
    url.pathname = encodeWhitespace(pathname.replace(/%/g, "%25"));
    if (hostname !== undefined && hostname !== "localhost") {
        url.hostname = hostname;
        if (!url.hostname) {
            throw new TypeError("Invalid hostname.");
        }
    }
    return url;
}
function isPosixPathSeparator(code) {
    return code === 47;
}
function basename(path, suffix = "") {
    assertArgs(path, suffix);
    const lastSegment = lastPathSegment(path, isPosixPathSeparator);
    const strippedSegment = stripTrailingSeparators(lastSegment, isPosixPathSeparator);
    return suffix ? stripSuffix(strippedSegment, suffix) : strippedSegment;
}
function extname(path) {
    assertPath(path);
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;
    for(let i = path.length - 1; i >= 0; --i){
        const code = path.charCodeAt(i);
        if (isPosixPathSeparator(code)) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
    }
    return path.slice(startDot, end);
}
function fromFileUrl1(url) {
    url = assertArg(url);
    return decodeURIComponent(url.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
}
function isAbsolute1(path) {
    assertPath(path);
    return path.length > 0 && isPosixPathSeparator(path.charCodeAt(0));
}
function toFileUrl1(path) {
    if (!isAbsolute1(path)) {
        throw new TypeError("Must be an absolute path.");
    }
    const url = new URL("file:///");
    url.pathname = encodeWhitespace(path.replace(/%/g, "%25").replace(/\\/g, "%5C"));
    return url;
}
const osType = (()=>{
    const { Deno } = globalThis;
    if (typeof Deno?.build?.os === "string") {
        return Deno.build.os;
    }
    const { navigator } = globalThis;
    if (navigator?.appVersion?.includes?.("Win")) {
        return "windows";
    }
    return "linux";
})();
const isWindows = osType === "windows";
function fromFileUrl2(url) {
    return isWindows ? fromFileUrl(url) : fromFileUrl1(url);
}
function toFileUrl2(path) {
    return isWindows ? toFileUrl(path) : toFileUrl1(path);
}
const reservedCharMap = {
    "&": "\\x26",
    "!": "\\x21",
    "#": "\\x23",
    "$": "\\$",
    "%": "\\x25",
    "*": "\\*",
    "+": "\\+",
    ",": "\\x2c",
    ".": "\\.",
    ":": "\\x3a",
    ";": "\\x3b",
    "<": "\\x3c",
    "=": "\\x3d",
    ">": "\\x3e",
    "?": "\\?",
    "@": "\\x40",
    "^": "\\^",
    "`": "\\x60",
    "~": "\\x7e",
    "(": "\\(",
    ")": "\\)",
    "[": "\\[",
    "]": "\\]",
    "{": "\\{",
    "}": "\\}",
    "/": "\\/",
    "-": "\\x2d",
    "\\": "\\\\",
    "|": "\\|"
};
const RX_REGEXP_ESCAPE = new RegExp(`[${Object.values(reservedCharMap).join("")}]`, "gu");
function escape(str) {
    return str.replaceAll(RX_REGEXP_ESCAPE, (m)=>reservedCharMap[m]);
}
const urlToEsbuildResolution = (url)=>{
    if (url.protocol === "file:") {
        return {
            path: fromFileUrl2(url),
            namespace: "file"
        };
    }
    const namespace = url.protocol.slice(0, -1);
    const path = url.href.slice(namespace.length + 1);
    return {
        path,
        namespace
    };
};
const esbuildResolutionToURL = (specifier)=>{
    if (specifier.namespace === "file") {
        return toFileUrl2(specifier.path);
    }
    return new URL(`${specifier.namespace}:${specifier.path}`);
};
function strip(url) {
    url.hash = "";
    url.search = "";
}
function basename1(url, suffix) {
    url = new URL(url);
    strip(url);
    return basename(url.href, suffix);
}
function extname1(url) {
    url = new URL(url);
    strip(url);
    return extname(url.pathname);
}
const loaderList = [
    "base64",
    "binary",
    "copy",
    "css",
    "dataurl",
    "default",
    "empty",
    "file",
    "js",
    "json",
    "jsx",
    "local-css",
    "text",
    "ts",
    "tsx"
];
const isLoader = (loader)=>loaderList.includes(loader);
const responseToLoader = (response)=>{
    const url = response.url;
    const filename = basename1(url);
    if (isLoader(filename)) return filename;
    if (filename === "mjs") return "js";
    const ext = extname1(url).slice(1);
    if (isLoader(ext)) return ext;
    if (ext === "mjs") return "js";
    const contentType = response.headers.get("Content-Type") ?? "text/plain";
    const mimeType = contentType.split(";")[0]?.trim?.() ?? "text/plain";
    return mimeTypeToLoader(mimeType);
};
const mimeTypeToLoader = (mimeType)=>{
    const subType = mimeType.split("/")[1] ?? "plain";
    if (/(?:^plain$|^xml|^svg|^x?html)/.test(subType)) {
        return "text";
    }
    if (subType.startsWith("json")) {
        return "json";
    }
    switch(subType){
        case "javascript":
            return "js";
        case "typescript":
            return "ts";
        case "css":
            return "css";
        default:
            return "text";
    }
};
const remoteLoader = (options)=>({
        name: "remote-resource",
        setup ({ onStart, onResolve, onLoad, initialOptions }) {
            const { importMapURL, sources = [], progressCallback } = options ?? {};
            let importMap = {};
            onStart(async ()=>{
                if (!importMapURL) return;
                const importMapSource = await load(`${importMapURL}`, options.fetch, sources, options.reload, progressCallback);
                importMap = resolveImportMap(JSON.parse(importMapSource.contents), importMapURL);
            });
            const externalRegexps = (initialOptions.external ?? []).map((path)=>new RegExp(escape(path).replace(/\\\*/g, ".*")));
            onResolve({
                filter: /.*/
            }, (args)=>{
                let referrer;
                if (args.importer !== "") {
                    if (args.namespace === "") {
                        throw new Error("[assert] namespace is empty");
                    }
                    referrer = new URL(`${args.namespace}:${args.importer}`);
                } else if (args.resolveDir !== "") {
                    referrer = new URL(`${toFileUrl2(args.resolveDir).href}/`);
                } else {
                    return undefined;
                }
                let resolved;
                if (importMap !== null) {
                    const res = resolveModuleSpecifier(args.path, importMap, new URL(referrer));
                    resolved = new URL(res);
                } else {
                    resolved = new URL(args.path, referrer);
                }
                const info = {
                    type: "resolve",
                    external: false,
                    path: resolved.href
                };
                if (args.kind !== "entry-point") info.parent = referrer.href;
                for (const externalRegexp of externalRegexps){
                    if (externalRegexp.test(resolved.href)) {
                        info.external = true;
                        progressCallback?.(info);
                        return info;
                    }
                }
                progressCallback?.(info);
                return urlToEsbuildResolution(resolved);
            });
            const loader = (args)=>load(esbuildResolutionToURL(args).href, options.fetch, sources, options.reload, progressCallback);
            onLoad({
                filter: /.*/,
                namespace: "file"
            }, loader);
            onLoad({
                filter: /.*/,
                namespace: "http"
            }, loader);
            onLoad({
                filter: /.*/,
                namespace: "https"
            }, loader);
            onLoad({
                filter: /.*/,
                namespace: "data"
            }, loader);
        }
    });
const load = async (href, fetch, sources, reload, progressCallback)=>{
    const source = sources.find((source)=>source.path === href);
    if (source !== undefined) {
        progressCallback?.({
            type: "load",
            path: href,
            loader: source.loader ?? "text",
            done: Promise.resolve({
                size: new Blob([
                    source.contents
                ]).size,
                isCache: true
            })
        });
        return {
            contents: source.contents,
            loader: source.loader
        };
    }
    const cacheFirst = !reload ? true : reload === true ? false : !reload.some((pattern)=>pattern.test(href));
    const result = fetch(new Request(href), cacheFirst);
    const [res] = await result;
    const loader = responseToLoader(res);
    progressCallback?.({
        type: "load",
        path: href,
        loader,
        done: result.then(([res, isCache])=>({
                size: parseInt(res.headers.get("Content-Length") ?? "0"),
                isCache
            }))
    });
    return {
        contents: await res.text(),
        loader
    };
};
const cache = await globalThis.caches.open("v1");
const fetch = async (req, cacheFirst)=>{
    const request = proxy(req);
    if (cacheFirst) {
        const res = await cache.match(request);
        if (res) return [
            res,
            true
        ];
    }
    try {
        const res = await globalThis.fetch(request);
        if (res.ok) {
            await cache.put(request, res.clone());
            return [
                res,
                false
            ];
        }
        throw new TypeError(`${res.status} ${res.statusText}`);
    } catch (e) {
        if (!(e instanceof TypeError)) throw e;
        const res = await cache.match(request);
        if (res) return [
            res,
            true
        ];
        throw e;
    }
};
const proxy = (req)=>{
    const url = new URL(req.url);
    if (url.hostname !== "scrapbox.io") return req;
    const redirectURL = new URL(url.pathname, globalThis.location.href);
    return new Request(redirectURL.href, req);
};
const build1 = (init)=>{
    const { progressCallback, importMapURL, reload, ...params } = init;
    return build({
        ...params,
        write: false,
        metafile: true,
        plugins: [
            remoteLoader({
                fetch,
                reload,
                progressCallback,
                importMapURL
            })
        ]
    });
};
const loaderToMimeType = (loader)=>{
    switch(loader){
        case "css":
        case "local-css":
        case "text":
            return "text/css";
        case "dataurl":
        case "base64":
        case "empty":
            return "text/plain";
        case "default":
        case "binary":
        case "copy":
        case "file":
            return "application/octet-stream";
        case "js":
            return "text/javascript";
        case "json":
            return "application/json";
        case "jsx":
            return "text/javascript";
        case "ts":
            return "application/typescript";
        case "tsx":
            return "application/typescript";
    }
};
function format(num, options = {}) {
    if (!Number.isFinite(num)) {
        throw new TypeError(`Expected a finite number, got ${typeof num}: ${num}`);
    }
    const UNITS_FIRSTLETTER = (options.bits ? "b" : "B") + "kMGTPEZY";
    if (options.signed && num === 0) {
        return ` 0 ${UNITS_FIRSTLETTER[0]}`;
    }
    const prefix = num < 0 ? "-" : options.signed ? "+" : "";
    num = Math.abs(num);
    const localeOptions = getLocaleOptions(options);
    if (num < 1) {
        const numberString = toLocaleString(num, options.locale, localeOptions);
        return prefix + numberString + " " + UNITS_FIRSTLETTER[0];
    }
    const exponent = Math.min(Math.floor(options.binary ? Math.log(num) / Math.log(1024) : Math.log10(num) / 3), UNITS_FIRSTLETTER.length - 1);
    num /= Math.pow(options.binary ? 1024 : 1000, exponent);
    if (!localeOptions) {
        num = Number(num.toPrecision(3));
    }
    const numberString = toLocaleString(num, options.locale, localeOptions);
    let unit = UNITS_FIRSTLETTER[exponent];
    if (exponent > 0) {
        unit += options.binary ? "i" : "";
        unit += options.bits ? "bit" : "B";
    }
    return prefix + numberString + " " + unit;
}
function getLocaleOptions({ maximumFractionDigits, minimumFractionDigits }) {
    if (maximumFractionDigits || minimumFractionDigits) {
        return {
            maximumFractionDigits,
            minimumFractionDigits
        };
    }
}
function toLocaleString(num, locale, options) {
    if (typeof locale === "string" || Array.isArray(locale)) {
        return num.toLocaleString(locale, options);
    } else if (locale === true || options !== undefined) {
        return num.toLocaleString(undefined, options);
    }
    return num.toString();
}
const context = ye(new Map());
const DependencyGraph = ({ pathMap, entryPoints })=>{
    const entryNodes = T(()=>entryPoints.flatMap((entryPoint)=>{
            const node = pathMap.get(entryPoint);
            return node ? [
                node
            ] : [];
        }), [
        pathMap,
        ...entryPoints
    ]);
    return le(context.Provider, {
        value: pathMap
    }, entryNodes.map((node)=>le(DepNode, {
            key: node.path,
            node: node
        })));
};
const DepNode = ({ node, viewedPath })=>{
    viewedPath ??= new Set();
    const classList = [];
    let title;
    if (node.external) {
        classList.push("external");
    } else if (!node.loaded) {
        classList.push("loading");
    } else if (node.bytesInOutput === 0) {
        classList.push("tree-shaked");
        title = "Removed by tree-shaking";
    }
    const viewed = viewedPath.has(node.path);
    if (viewed || node.children.length === 0) {
        if (viewed) classList.push("viewed");
        return le("div", {
            className: classList.join(" "),
            title: title
        }, le(NodeInfo, node));
    }
    viewedPath.add(node.path);
    return le("details", {
        open: true
    }, le("summary", {
        className: classList.join(" "),
        title: title
    }, le(NodeInfo, node)), le("ul", null, node.children.map((child)=>le("li", {
            key: child.path
        }, le(DepNode, {
            node: child,
            viewedPath: viewedPath
        })))));
};
const NodeInfo = (node)=>le(I, null, le("i", {
        className: `fas fa-${node.external ? "paperclip" : !node.loaded ? "spinner" : node.isCache ? "database" : "globe"}`,
        title: node.external ? "preserve" : !node.loaded ? "loading" : node.isCache ? "use cache" : "download"
    }), " ", `${node.path} (${format(node.byte)})`);
const { run, output, templateURL, ...initialOptions } = parseSearchParams(location.search);
await initialize({
    workerURL: "./worker.js",
    wasmModule: await WebAssembly.compileStreaming((await fetch(new Request("./esbuild.wasm"), !initialOptions.reload))[0])
});
const App = ()=>{
    return le(I, null, le("header", null, le("h1", null, "Scrapbox Bundler")), le("section", null, le("h2", null, "Options"), le("p", null, "target URL", le("input", {
        type: "text",
        name: "target-url",
        pattern: "^https?:\\/\\/"
    })), le("p", null, "bundle", le("input", {
        type: "checkbox",
        name: "bundle",
        value: "true",
        checked: true
    })), le("p", null, "minify", le("input", {
        type: "checkbox",
        name: "minify",
        value: "true",
        checked: true
    })), le("p", null, "format", le("input", {
        type: "radio",
        name: "format",
        value: "esm",
        checked: true
    }, "ES Module"), le("input", {
        type: "radio",
        name: "format",
        value: "iife"
    }, "immediately-invoked function expression"), le("input", {
        type: "radio",
        name: "format",
        value: "commonjs"
    }, "CommonJS")), le("p", null, "include source map", le("input", {
        type: "checkbox",
        name: "source-map",
        value: "true"
    })), le("p", null, le("p", null, "URLs which are excluded from your build"), le("textarea", null)), le("p", null, le("p", null, "import map"), le("textarea", null))), le("section", null, le("h2", null, "Advanced Options"), le("p", null, "escape non-ASCII characters", le("input", {
        type: "checkbox",
        name: "charset",
        value: "utf8",
        checked: true
    }))), le("h2", null, "Results"), le("div", {
        id: "main"
    }));
};
const HeadlessApp = ({ options, output, templateURL })=>{
    const [state, setState] = I1("building");
    const [pathMap, setPathMap] = I1(new Map());
    z1(()=>{
        (async ()=>{
            let presentPathMap = pathMap;
            const { entryURL, ...params } = options;
            const entryPoints = [
                entryURL
            ];
            try {
                const result = await build1({
                    entryPoints,
                    ...params,
                    progressCallback: (message)=>{
                        switch(message.type){
                            case "resolve":
                                setPathMap((prev)=>{
                                    const node = prev.get(message.path) ?? {
                                        path: message.path,
                                        external: message.external,
                                        loader: "text",
                                        loaded: false,
                                        byte: 0,
                                        bytesInOutput: 0,
                                        isCache: false,
                                        children: []
                                    };
                                    prev.set(message.path, node);
                                    if (message.parent) {
                                        node.firstParentPath ??= message.parent;
                                        const parent = prev.get(message.parent) ?? {
                                            path: message.parent,
                                            external: false,
                                            loader: "text",
                                            loaded: false,
                                            byte: 0,
                                            bytesInOutput: 0,
                                            isCache: false,
                                            children: []
                                        };
                                        parent.children = [
                                            ...parent.children,
                                            node
                                        ];
                                        prev.set(message.parent, parent);
                                    }
                                    presentPathMap = new Map(prev);
                                    return presentPathMap;
                                });
                                break;
                            case "load":
                                message.done.then(({ size, isCache })=>setPathMap((prev)=>{
                                        const path = prev.get(message.path) ?? {
                                            ...message,
                                            external: false,
                                            loaded: true,
                                            byte: size,
                                            bytesInOutput: size,
                                            isCache,
                                            children: []
                                        };
                                        path.loader = message.loader;
                                        path.loaded = true;
                                        path.byte = size;
                                        path.bytesInOutput = size;
                                        path.isCache = isCache;
                                        presentPathMap = new Map(prev);
                                        return presentPathMap;
                                    }));
                                break;
                        }
                    }
                });
                setPathMap((prev)=>{
                    const inputs = result.metafile.inputs;
                    const outputs = [
                        ...Object.values(result.metafile.outputs)
                    ].reduce((input, cur)=>({
                            ...input,
                            ...cur.inputs
                        }), {});
                    for (const [key, node] of prev){
                        node.byte = inputs[key]?.bytes;
                        node.bytesInOutput = outputs[key]?.bytesInOutput ?? 0;
                    }
                    return new Map(prev);
                });
                const file = result.outputFiles[0];
                const loader = presentPathMap.get(file.path)?.loader ?? "text";
                setState("done");
                const url = loader === "dataurl" ? file.text : URL.createObjectURL(await makeBlob(file.contents, loaderToMimeType(loader), decodeURI(location.href), templateURL));
                switch(output){
                    case "newtab":
                    case "self":
                        {
                            globalThis.open(url, output === "self" ? "_self" : undefined);
                            break;
                        }
                    case "download":
                        {
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = templateURL ? "import.json" : `index.${loader}`;
                            a.style.display = "none";
                            a.click();
                            a.remove();
                            break;
                        }
                }
                if (loader !== "dataurl") URL.revokeObjectURL(url);
            } catch (e) {
                setState("error");
                console.error(e);
            }
        })();
    }, []);
    const entryPoints = T(()=>options.importMapURL ? [
            options.entryURL,
            options.importMapURL.href
        ] : [
            options.entryURL
        ], [
        options.entryURL,
        options.importMapURL
    ]);
    return le(I, null, le("p", null, state === "building" ? "Building...please wait." : state === "done" ? "Finish building." : "Failed to build."), le(DependencyGraph, {
        pathMap: pathMap,
        entryPoints: entryPoints
    }));
};
const makeBlob = async (code, mimeType, entryPointURL, templateURL)=>{
    if (!templateURL) {
        const blob = new Blob([
            code
        ], {
            type: mimeType
        });
        return blob;
    }
    const [res] = await fetch(new Request(templateURL), !initialOptions.reload);
    const template = await res.text();
    const sourceCode = new TextDecoder().decode(code);
    const lines = template.replaceAll("@URL@", entryPointURL).split("\n").flatMap((line)=>{
        const text = line.replace(/^(\s*)@CODE@/, (_, space)=>sourceCode.split(/\n/).map((line)=>`${space}${line}`).join("\n"));
        return text.split("\n");
    });
    const now = new Date().getTime() / 1000;
    const json = {
        pages: [
            {
                title: lines[0],
                created: now,
                updated: now,
                lines: lines.map((line)=>({
                        text: line,
                        created: now,
                        updated: now
                    }))
            }
        ]
    };
    return new Blob([
        JSON.stringify(json)
    ], {
        type: "application/json;charset=UTF-8"
    });
};
const app = document.getElementById("app");
if (!app) throw Error("Could not find `#app`.");
ae(run ? le(HeadlessApp, {
    options: initialOptions,
    output: output,
    templateURL: templateURL
}) : le(App, null), app);

