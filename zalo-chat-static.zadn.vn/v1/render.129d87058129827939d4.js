"object" != typeof globalThis && (globalThis = window),
    function(e) {
        function t(t) {
            for (var r, a, i = t[0], s = t[1], u = t[2], l = 0, d = []; l < i.length; l++) a = i[l], Object.prototype.hasOwnProperty.call(o, a) && o[a] && d.push(o[a][0]), o[a] = 0;
            for (r in s) Object.prototype.hasOwnProperty.call(s, r) && (e[r] = s[r]);
            for (f && f(t); d.length;) d.shift()();
            return c.push.apply(c, u || []), n()
        }

        function n() {
            for (var e, t = 0; t < c.length; t++) {
                for (var n = c[t], r = !0, a = 1; a < n.length; a++) {
                    var s = n[a];
                    0 !== o[s] && (r = !1)
                }
                r && (c.splice(t--, 1), e = i(i.s = n[0]))
            }
            return e
        }
        var r = {},
            a = {
                13: 0
            },
            o = {
                13: 0
            },
            c = [];

        function i(t) {
            if (r[t]) return r[t].exports;
            var n = r[t] = {
                i: t,
                l: !1,
                exports: {}
            };
            return e[t].call(n.exports, n, n.exports, i), n.l = !0, n.exports
        }
        i.e = function(e) {
            var t = [];
            a[e] ? t.push(a[e]) : 0 !== a[e] && {
                1: 1,
                3: 1,
                18: 1,
                23: 1,
                24: 1,
                25: 1
            }[e] && t.push(a[e] = new Promise((function(t, n) {
                for (var r = ({
                        1: "default-embed-web-startup",
                        3: "vendors-embed-web-startup",
                        4: "countries",
                        8: "lang-en",
                        9: "lang-vi",
                        17: "vendors-web-startup",
                        18: "web-startup"
                    }[e] || e) + "." + {
                        1: "c74076b5055445f98284",
                        3: "f85daca1da58d70b76b1",
                        4: "31d6cfe0d16ae931b73c",
                        8: "31d6cfe0d16ae931b73c",
                        9: "31d6cfe0d16ae931b73c",
                        17: "31d6cfe0d16ae931b73c",
                        18: "ef4b7a0b864bb1fa09a8",
                        20: "31d6cfe0d16ae931b73c",
                        21: "31d6cfe0d16ae931b73c",
                        22: "31d6cfe0d16ae931b73c",
                        23: "dd4e207f5ac06653d6bf",
                        24: "84ee815cccbfc9541cc0",
                        25: "1f3793b2b4757be50303",
                        26: "31d6cfe0d16ae931b73c",
                        27: "31d6cfe0d16ae931b73c"
                    }[e] + ".css", o = i.p + r, c = document.getElementsByTagName("link"), s = 0; s < c.length; s++) {
                    var u = (f = c[s]).getAttribute("data-href") || f.getAttribute("href");
                    if ("stylesheet" === f.rel && (u === r || u === o)) return t()
                }
                var l = document.getElementsByTagName("style");
                for (s = 0; s < l.length; s++) {
                    var f;
                    if ((u = (f = l[s]).getAttribute("data-href")) === r || u === o) return t()
                }
                var d = document.createElement("link");
                d.rel = "stylesheet", d.type = "text/css", d.onload = t, d.onerror = function(t) {
                    var r = t && t.target && t.target.src || o,
                        c = new Error("Loading CSS chunk " + e + " failed.\n(" + r + ")");
                    c.code = "CSS_CHUNK_LOAD_FAILED", c.request = r, delete a[e], d.parentNode.removeChild(d), n(c)
                }, d.href = o, document.getElementsByTagName("head")[0].appendChild(d)
            })).then((function() {
                a[e] = 0
            })));
            var n = o[e];
            if (0 !== n)
                if (n) t.push(n[2]);
                else {
                    var r = new Promise((function(t, r) {
                        n = o[e] = [t, r]
                    }));
                    t.push(n[2] = r);
                    var c, s = document.createElement("script");
                    s.charset = "utf-8", s.timeout = 120, i.nc && s.setAttribute("nonce", i.nc), s.src = function(e) {
                        return i.p + "lazy/" + ({
                            1: "default-embed-web-startup",
                            3: "vendors-embed-web-startup",
                            4: "countries",
                            8: "lang-en",
                            9: "lang-vi",
                            17: "vendors-web-startup",
                            18: "web-startup"
                        }[e] || e) + "." + {
                            1: "5850dfe23ddf53272fff",
                            3: "0a697c0c59f5e8c683a4",
                            4: "bbfee67f386a646e4922",
                            8: "bac818ca28e60198c423",
                            9: "133160a5df63117bcb20",
                            17: "92bec007b82d35b99f3c",
                            18: "0b3d4c580388d33744bb",
                            20: "73609597553b2c374c33",
                            21: "9cf66eae6a5d29416e72",
                            22: "46e008c875e928c99389",
                            23: "b6183703df736b50f6a6",
                            24: "5946513edbaf4a69e665",
                            25: "e90749cb17da885a5e56",
                            26: "1ce679b477cad9fe50ef",
                            27: "1c85c702482f63c2a1a6"
                        }[e] + ".js"
                    }(e);
                    var u = new Error;
                    c = function(t) {
                        s.onerror = s.onload = null, clearTimeout(l);
                        var n = o[e];
                        if (0 !== n) {
                            if (n) {
                                var r = t && ("load" === t.type ? "missing" : t.type),
                                    a = t && t.target && t.target.src;
                                u.message = "Loading chunk " + e + " failed.\n(" + r + ": " + a + ")", u.name = "ChunkLoadError", u.type = r, u.request = a, n[1](u)
                            }
                            o[e] = void 0
                        }
                    };
                    var l = setTimeout((function() {
                        c({
                            type: "timeout",
                            target: s
                        })
                    }), 12e4);
                    s.onerror = s.onload = c, document.head.appendChild(s)
                }
            return Promise.all(t)
        }, i.m = e, i.c = r, i.d = function(e, t, n) {
            i.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: n
            })
        }, i.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }, i.t = function(e, t) {
            if (1 & t && (e = i(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var n = Object.create(null);
            if (i.r(n), Object.defineProperty(n, "default", {
                    enumerable: !0,
                    value: e
                }), 2 & t && "string" != typeof e)
                for (var r in e) i.d(n, r, function(t) {
                    return e[t]
                }.bind(null, r));
            return n
        }, i.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return i.d(t, "a", t), t
        }, i.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, i.p = "./zalo-chat-static.zadn.vn/v1/", i.oe = function(e) {
            throw e
        };
        var s = this.webpackJsonp = this.webpackJsonp || [],
            u = s.push.bind(s);
        s.push = t, s = s.slice();
        for (var l = 0; l < s.length; l++) t(s[l]);
        var f = u;
        c.push([17, 2, 0]), n()
    }({
        17: function(e, t, n) {
            e.exports = n("cKAe")
        },
        "2EFI": function(e, t, n) {
            "use strict";
            const r = {
                enable: !0,
                allowLog: !1,
                mechanism: ["onunhandledrejection"],
                blacklistOriginException: ["not support", "reaction db timeout", "off-feature", "aborted!!", "search: aborted!!", "abort running too long", "Message key not found. The counter was repeated or the key was not filled.", "Bad MAC", "timeout of 10000ms exceeded", "Network Error", "entry/data is not valid", "invalid msg"],
                blacklistSentryException: ["Non-Error promise rejection captured with value: undefined", "Non-Error promise rejection captured with keys:", "Non-Error promise rejection captured with value:", "DataError: Failed to execute 'put' on 'IDBObjectStore': Evaluating the object store's key path yielded a value that is not a valid key.", "DataError: Failed to execute 'put' on 'IDBObjectStore': Evaluating the object store's key path did not yield a value.", "DataError: Failed to execute 'delete' on 'IDBObjectStore': No key or key range specified.", "InvalidStateError: Failed to execute 'transaction' on 'IDBDatabase': The database connection is closing.", "FAIL_TO_OPEN_INVALID_STATE"],
                preventAll: !1
            };
            t.a = r
        },
        "8ogj": function(e, t, n) {
            "use strict";
            n("cfqX");
            var r = n("N1xz");
            (() => {
                r.a.install()
            })()
        },
        SbjA: function(e, t, n) {
            "use strict";
            (function(e) {
                var t = n("agHs"),
                    r = n("2EFI");
                const a = {
                    config: {
                        dsn: "https://182d4db70da74cf3adbc4e844aeb4256@senpc.api.zalo.me/2",
                        submitURL: "https://senpc.api.zalo.me/api/2/minidump/?sentry_key=182d4db70da74cf3adbc4e844aeb4256",
                        integrationFilter: r.a
                    }
                };
                class o {
                    constructor(e = {}) {
                        this.name = "IntegrationEventFilter", "object" == typeof e ? this._config = { ...r.a,
                            ...e
                        } : this.config = r.a, this._logInfo("init success")
                    }
                    _logInfo(...e) {
                        this._config.allowLog
                    }
                    _checkMatchMechanism(e) {
                        return !(!e.exception || "object" != typeof e.exception) && (!!Array.isArray(e.exception.values) && !!e.exception.values.find((e => {
                            const t = e.mechanism || {};
                            return !(!t.type && !Array.isArray(this._config.mechanism)) && this._config.mechanism.includes(t.type)
                        })))
                    }
                    _checkInBlacklistOriginException(e) {
                        if (!e || "object" != typeof e) return !1;
                        const t = this._config.blacklistOriginException || [],
                            n = e.originalException || {};
                        if ("string" != typeof n.name) return !1;
                        if ("string" != typeof n.message) return !1;
                        return !!t.find((e => {
                            if (e === n) return !0;
                            if (e && n instanceof Error) {
                                if (n.name.includes(e)) return !0;
                                if (n.message.includes(e)) return !0
                            }
                            return !1
                        }))
                    }
                    _checkInBlacklistSentryException(e) {
                        const t = this._config.blacklistSentryException || [];
                        if (!e.exception || "object" != typeof e.exception) return !1;
                        if (!Array.isArray(e.exception.values)) return !1;
                        return !!e.exception.values.find((e => {
                            const n = (e || {}).value;
                            return !!n && t.find((e => n.includes(e)))
                        }))
                    }
                    _handleFilter(e, t) {
                        return this._checkMatchMechanism(e) && (this._config.preventAll || this._checkInBlacklistOriginException(t) || this._checkInBlacklistSentryException(e)) ? null : e
                    }
                    setupOnce(e) {
                        e(((e, t) => {
                            if (this._logInfo("receive event", {
                                    event: e,
                                    hint: t
                                }), this._config.enable) {
                                const n = this._handleFilter(e, t);
                                return this._logInfo("result filter", n), n
                            }
                            return e
                        }))
                    }
                }(function() {
                    {
                        const e = function(e = {}) {
                            const t = localStorage.getItem("sh_stry_cf");
                            try {
                                return t ? JSON.parse(t) : e
                            } catch (n) {
                                return e
                            }
                        }(a);
                        t && e && function(e, t = {}) {
                            if (!e) return;
                            let n = new Map;
                            const {
                                enable: r,
                                config: a
                            } = t;
                            if (r && a && a.dsn) try {
                                e.init({
                                    dsn: a.dsn,
                                    integrations: e => (e.push(new o(a.integrationFilter)), e),
                                    release: "Zalo23.4.1",
                                    beforeSend(e, t) {
                                        let r = function(e) {
                                            const t = e => e ? `${e.function} ${e.colno} ${e.lineno}` : "",
                                                n = function(e) {
                                                    const {
                                                        exception: t
                                                    } = e;
                                                    if (t) try {
                                                        return `${t.values[0].type} ${t.values[0].value}`
                                                    } catch (n) {
                                                        return "no message"
                                                    }
                                                    return "no message"
                                                }(e),
                                                r = function(e) {
                                                    const {
                                                        exception: t,
                                                        stacktrace: n
                                                    } = e;
                                                    if (t) try {
                                                        return t.values[0].stacktrace.frames
                                                    } catch (r) {
                                                        return
                                                    } else if (n) return n.frames
                                                }(e),
                                                a = r && r.length;
                                            if (a && a > 0) {
                                                const e = r[0],
                                                    o = r[a - 1];
                                                return `${n} ${t(e)} ${t(o)}`
                                            }
                                            return n
                                        }(e);
                                        return n.has(r) ? null : (n.set(r, !0), e)
                                    }
                                })
                            } catch (c) {}
                        }(t, e)
                    }
                })()
            }).call(this, n("ckNr"))
        },
        cKAe: function(e, t, n) {
            "use strict";
            n.r(t);
            n("8ogj");
            var r = n("BGEY");
            n("SbjA");
            (async function() {
                const e = window.localStorage.getItem("sh_z_recentuid") || window.localStorage.getItem("z_recentuid");
                await Object(r.b)(e)
            })().then((() => Promise.all([n.e(3), n.e(17), n.e(1), n.e(18)]).then(n.bind(null, "qLCR"))))
        }
    });
//# sourceMappingURL=sourcemaps/render.129d87058129827939d4.js.map