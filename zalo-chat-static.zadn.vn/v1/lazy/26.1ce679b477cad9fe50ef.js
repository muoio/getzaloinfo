"object" != typeof globalThis && (globalThis = window), (this.webpackJsonp = this.webpackJsonp || []).push([
    [26], {
        "64yT": function(e, r, t) {
            "use strict";
            t.r(r);
            var n = t("q1tI"),
                c = t.n(n),
                u = t("T1Xd"),
                a = t("l4dk"),
                o = t("N1xz"),
                s = t("KBA3"),
                f = t("jDHv");
            const i = Object(n.memo)((e => {
                    const {
                        maxColumns: r = 60,
                        interval: c = 500
                    } = e, s = Object(n.useRef)(0), i = Object(n.useRef)(0), l = Object(n.useRef)(performance.now()), g = Object(n.useRef)([]), p = Object(n.useRef)(), m = Object(u.l)(a.a), b = Object(n.useRef)(performance.now()), j = Object(n.useRef)(0), d = Object(n.useRef)(60), O = Object(n.useRef)(), h = Object(n.useCallback)((e => {
                        try {
                            var r;
                            if (!p.current) {
                                const {
                                    rAF: e
                                } = t("MnS2"), {
                                    requestAnimationFrame: r
                                } = f.ModuleContainer.resolve(e);
                                p.current = r
                            }
                            return null === (r = p.current) || void 0 === r ? void 0 : r.call(p, e, !0)
                        } catch (n) {}
                    }), []), _ = () => {
                        (() => {
                            const e = performance.now();
                            if (i.current += 1, j.current += e - b.current, e >= l.current + c) {
                                const t = e - l.current;
                                let n = Math.round(1e3 / (j.current / i.current));
                                const u = Math.max.apply(Math.max, [...g.current, d.current]);
                                if (n = u <= 120 && u >= 110 ? n > 120 ? 120 : n : n > 60 ? 60 : n, g.current = g.current.concat(n), t > 1500)
                                    for (let e = 1; e <= (t - c) / 1e3; e++) g.current = g.current.concat(0);
                                g.current = g.current.slice(Math.max(g.current.length - r, 0)), j.current = 0, i.current = 0, l.current = e;
                                const a = {
                                    fps: g.current[g.current.length - 1],
                                    avgFps: Number((g.current.reduce(((e, r) => e + r), 0) / g.current.length).toFixed(2)),
                                    maxFps: Math.max.apply(Math.max, g.current),
                                    fpsColumns: g.current
                                };
                                d.current = Math.max(d.current, a.maxFps), O.current && O.current.recordFps(a, d.current, e), m(a)
                            }
                            b.current = e
                        })();
                        const e = h(_);
                        e && (s.current = e[0])
                    };
                    return Object(n.useEffect)((() => {
                        if (!(() => {
                                if (!o.a.canIUse()) return;
                                return !o.a.UIManager.getRegisteredFpsMonitor()
                            })()) return;
                        if (l.current = performance.now(), b.current = performance.now(), O.current = o.a.UIManager.registerFpsMonitor(), !O.current) return;
                        const e = h(_);
                        return e && (s.current = e[0]), () => {
                            e && e[1](s.current), O.current && o.a.UIManager.unregisterFpsMonitor(O.current.id)
                        }
                    }), []), null
                })),
                l = Object(n.memo)((e => {
                    const [r, t] = Object(n.useState)(s.a.getConfig().enable_fps_monitor || s.a.getConfig().enable_fps_monitor_v2);
                    return Object(n.useEffect)((() => {
                        const e = () => {
                            const e = s.a.getConfig().enable_for_staging_account,
                                r = s.a.getConfig().staging_account,
                                n = s.a.getConfig().enable_fps_monitor || s.a.getConfig().enable_fps_monitor_v2,
                                c = s.a.enable && n || e && r;
                            t(c)
                        };
                        return s.a.on("staging_account", e), () => {
                            s.a.removeListener("staging_account", e)
                        }
                    }), []), r ? c.a.createElement(i, e) : null
                }));
            r.default = l
        },
        l4dk: function(e, r, t) {
            "use strict";
            t.d(r, "a", (function() {
                return c
            }));
            var n = t("T1Xd");
            const c = Object(n.b)({
                key: "metricz/fps",
                default: {
                    fps: 0,
                    avgFps: 0,
                    maxFps: 0,
                    fpsColumns: []
                }
            })
        }
    }
]);
//# sourceMappingURL=../sourcemaps/lazy/26.1ce679b477cad9fe50ef.js.map