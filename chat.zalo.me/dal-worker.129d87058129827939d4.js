__ZaBUNDLENAME__ = "dal-worker", "object" != typeof globalThis && (globalThis = self),
    function(e) {
        var t = {};

        function n(r) {
            if (t[r]) return t[r].exports;
            var o = t[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
        }
        n.m = e, n.c = t, n.d = function(e, t, r) {
            n.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: r
            })
        }, n.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }, n.t = function(e, t) {
            if (1 & t && (e = n(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var r = Object.create(null);
            if (n.r(r), Object.defineProperty(r, "default", {
                    enumerable: !0,
                    value: e
                }), 2 & t && "string" != typeof e)
                for (var o in e) n.d(r, o, function(t) {
                    return e[t]
                }.bind(null, o));
            return r
        }, n.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return n.d(t, "a", t), t
        }, n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, n.p = "https://zalo-chat-static.zadn.vn/v1/", n(n.s = 26)
    }({
        "1Njg": function(e, t, n) {
            "use strict";
            n.d(t, "b", (function() {
                return c
            })), n.d(t, "c", (function() {
                return u
            })), n.d(t, "e", (function() {
                return i
            })), n.d(t, "a", (function() {
                return s
            })), n.d(t, "d", (function() {
                return f
            }));
            var r = n("zkos");
            const o = "dal_worker_fw_chnls";

            function c(e) {
                return `${o}_${e}`
            }

            function u(e) {
                const t = `${o}_`;
                if (!e.startsWith(t)) return e;
                const n = t.length;
                return e.slice(n)
            }

            function i(e) {
                return Array.isArray(e) && e[0] && r.d.includes(u(e[0]))
            }

            function s(e) {
                for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                return [c(e), ...n]
            }

            function f(e) {
                return r.a.includes(e)
            }
            let a = null;
            a = ""
        },
        26: function(e, t, n) {
            e.exports = n("8+WD")
        },
        "8+WD": function(e, t, n) {
            "use strict";
            n.r(t);
            var r = n("VTBJ"),
                o = n("zkos"),
                c = n("1Njg");

            function u(e, t) {
                return null === t ? null : n => {
                    const {
                        data: r
                    } = n;
                    Object(c.e)(r) || ("object" == typeof t ? t.handleEvent(n) : t.call(e, n))
                }
            }
            const i = self.addEventListener;
            self.addEventListener = (e, t, n) => {
                i(e, "message" !== e ? t : u(self, t), n)
            };
            const s = Object.getOwnPropertyDescriptor(self, "onmessage");
            Object.defineProperty(self, "onmessage", Object(r.a)(Object(r.a)({}, s), {}, {
                set(e) {
                    i("message", u(self, e))
                }
            })), self.addReservedMsgListener = (e, t) => {
                i("message", (n => {
                    const {
                        data: r
                    } = n;
                    if (Object(c.e)(r)) {
                        const [o] = r;
                        Object(c.c)(o) === e && t(n)
                    }
                }))
            }, self.postReservedMsg = e => {
                const t = Object(c.a)(...e);
                self.postMessage(t)
            }, i("message", (e => {
                const {
                    data: t
                } = e;
                if (Object(c.e)(t)) {
                    const [e, n] = t;
                    e === Object(c.b)(o.b) && self.importScripts(n)
                }
            }))
        },
        UK4g: function(e, t, n) {
            "use strict";
            n.d(t, "j", (function() {
                return r
            })), n.d(t, "b", (function() {
                return o
            })), n.d(t, "g", (function() {
                return c
            })), n.d(t, "c", (function() {
                return u
            })), n.d(t, "d", (function() {
                return i
            })), n.d(t, "f", (function() {
                return s
            })), n.d(t, "e", (function() {
                return f
            })), n.d(t, "h", (function() {
                return a
            })), n.d(t, "i", (function() {
                return d
            })), n.d(t, "k", (function() {
                return l
            })), n.d(t, "a", (function() {
                return b
            }));
            const r = 0,
                o = void 0,
                c = "db",
                u = "db-authenticated",
                i = "db-client-connected",
                s = "db-start-close-dbs",
                f = "db-finish-close-dbs",
                a = 1e4,
                d = 0,
                l = 1e4,
                b = !1
        },
        VTBJ: function(e, t, n) {
            "use strict";

            function r(e, t, n) {
                return t in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n, e
            }

            function o(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), n.push.apply(n, r)
                }
                return n
            }

            function c(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? o(Object(n), !0).forEach((function(t) {
                        r(e, t, n[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : o(Object(n)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    }))
                }
                return e
            }
            n.d(t, "a", (function() {
                return c
            }))
        },
        zkos: function(e, t, n) {
            "use strict";
            n.d(t, "a", (function() {
                return o
            })), n.d(t, "b", (function() {
                return c
            })), n.d(t, "c", (function() {
                return u
            })), n.d(t, "d", (function() {
                return i
            }));
            var r = n("UK4g");
            const o = [r.c, r.d, r.e, r.f],
                c = "load-original-script",
                u = "dal-qos",
                i = [...o, c, "user-data-path", u]
        }
    });
//# sourceMappingURL=sourcemaps/dal-worker.129d87058129827939d4.js.map