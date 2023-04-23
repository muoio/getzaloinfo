"object" != typeof globalThis && (globalThis = window), (this.webpackJsonp = this.webpackJsonp || []).push([
    [0], {
        "+7Kn": function(e, t, n) {
            "use strict";
            n.d(t, "a", (function() {
                return i
            })), n.d(t, "d", (function() {
                return s
            })), n.d(t, "b", (function() {
                return a
            })), n.d(t, "g", (function() {
                return r
            })), n.d(t, "e", (function() {
                return c
            })), n.d(t, "f", (function() {
                return d
            })), n.d(t, "c", (function() {
                return m
            }));
            var o = n("N0Be");
            class i extends Error {
                constructor(e) {
                    super(`[MigrateActionManager] An action handler has already registered for ${e} action type!`), this.name = o.a
                }
            }
            class s extends Error {
                constructor(e) {
                    super(`[MigrateActionManager] No action handler found for ${e} action type!`), this.name = o.d
                }
            }
            class a extends Error {
                constructor() {
                    super("[SecureKeysToMigrate] Invalid initialized data for SecureKeysToMigrate"), this.name = o.b
                }
            }
            class r extends Error {
                constructor() {
                    super("[SecureKeysToMigrate] SecureKeysToMigrate hasn't been initialized yet!"), this.name = o.g
                }
            }
            class c extends Error {
                constructor() {
                    super("[SecureKeysToMigrate] Invalid secure indexedDB key"), this.name = o.e
                }
            }
            class d extends Error {
                constructor() {
                    super("[MigrateRule] Can't generate new key name due to the lack of userID"), this.name = o.f
                }
            }
            class m extends Error {
                constructor() {
                    super("[MigrateFlow] Migration stops due to timeout"), this.name = o.c
                }
            }
        },
        "/Pmb": function(e, t, n) {
            "use strict";
            n.r(t);
            var o = n("VTBJ"),
                i = n("N1xz"),
                s = n("igRa");
            t.default = class {
                constructor(e) {
                    this.flsData = void 0, this.recordedData = void 0, this.listener = void 0, this.startAt = void 0, this.safeFps = void 0, this.calcFallingFps = e => {
                        const {
                            fps: t,
                            now: n
                        } = e;
                        if (null == this.flsData.beforeDrop) t >= this.safeFps && (this.flsData.beforeDrop = t);
                        else if (this.flsData.beforeDrop > t && t < this.safeFps)(null == this.flsData.lowestDrop || this.flsData.lowestDrop > t) && (this.flsData.lowestDrop = t, this.flsData.lowestDropTs = n);
                        else if (null != this.flsData.lowestDrop && this.flsData.lowestDropTs) {
                            if (this.flsData.afterRecover = t, this.flsData.recoverTime = n - this.flsData.lowestDropTs, null == this.recordedData.lowestDrop || this.recordedData.lowestDrop > this.flsData.lowestDrop) {
                                var i;
                                this.recordedData = Object(o.a)({}, this.flsData);
                                const e = {
                                    beforeDrop: this.flsData.beforeDrop,
                                    lowestDrop: this.flsData.lowestDrop,
                                    recoverTime: this.flsData.recoverTime,
                                    afterRecover: this.flsData.afterRecover
                                };
                                null === (i = this.listener) || void 0 === i || i.call(this, e)
                            }
                            this.flsData = {}
                        } else t >= this.safeFps && (this.flsData.beforeDrop = t)
                    }, this.flsData = {}, this.recordedData = {};
                    const {
                        safeFpsGap: t = 10,
                        maxFps: n = 60
                    } = e || {};
                    this.safeFps = n - t
                }
                onData(e) {
                    this.listener = e
                }
                start() {
                    i.a.UIManager.on(s.a.FPS, this.calcFallingFps), this.startAt = Date.now()
                }
                end() {
                    if (!this.startAt) return {};
                    const e = {
                        beforeDrop: this.recordedData.beforeDrop,
                        lowestDrop: this.recordedData.lowestDrop,
                        recoverTime: this.recordedData.recoverTime,
                        afterRecover: this.recordedData.afterRecover,
                        startAt: this.startAt,
                        endAt: Date.now()
                    };
                    return this.flsData = {}, this.recordedData = {}, this.listener = void 0, i.a.UIManager.removeListener(s.a.FPS, this.calcFallingFps), this.startAt = void 0, e
                }
            }
        },
        "3EqI": function(e, t, n) {
            "use strict";
            n.d(t, "a", (function() {
                return i
            }));
            class o {
                constructor() {
                    this.pendings = void 0, this.pendings = new Map
                }
                markStart(e) {
                    void 0 === e && (e = o.DEFAULT_JOB_ID);
                    let t = () => {};
                    const n = new Promise((e => {
                        t = e
                    })).finally((() => {
                        this.pendings.delete(e)
                    }));
                    this.pendings.set(e, {
                        promise: n,
                        resolver: t,
                        fulfilled: !1
                    })
                }
                markEnd(e) {
                    void 0 === e && (e = o.DEFAULT_JOB_ID);
                    const t = this.pendings.get(e);
                    t && (t.fulfilled = !0, t.resolver())
                }
                isPending(e) {
                    void 0 === e && (e = o.DEFAULT_JOB_ID);
                    const t = this.pendings.get(e);
                    return !!t && !t.fulfilled
                }
                isDone(e) {
                    return void 0 === e && (e = o.DEFAULT_JOB_ID), !this.isPending(e)
                }
                async wait(e) {
                    void 0 === e && (e = o.DEFAULT_JOB_ID);
                    const t = this.pendings.get(e);
                    t && await t.promise
                }
            }
            o.DEFAULT_JOB_ID = "z1000";
            class i {
                constructor() {
                    this.jobQueue = {}, this.auditor = void 0, this.auditor = new o
                }
                exec(e, t) {
                    void 0 === e && (e = o.DEFAULT_JOB_ID), this.isPending(e) || this.auditor.markStart(e);
                    const n = this.jobQueue[e] || Promise.resolve(),
                        i = this.jobQueue[e] = n.then(t, t);
                    return i.finally((() => {
                        this.jobQueue[e] === i && delete this.jobQueue[e], this.jobQueue[e] || this.auditor.markEnd(e)
                    })), i
                }
                isPending(e) {
                    return this.auditor.isPending(e)
                }
                wait(e) {
                    return this.auditor.wait(e)
                }
            }
            const s = new i;
            t.b = s
        },
        "5BYM": function(e, t, n) {
            "use strict";
            n.r(t);
            var o = n("igRa");
            t.default = class {
                constructor(e) {
                    this.isOpenFallingRecorder = void 0, this.uiManager = void 0, this.uiManager = e
                }
                isOpen() {
                    return !!this.isOpenFallingRecorder
                }
                toggleFpsFallingRecorder(e) {
                    this.isOpenFallingRecorder = "boolean" == typeof e ? e : !this.isOpenFallingRecorder, this.uiManager.triggerEvent(o.a.TOGGLE_FPS_FALLING, this.isOpenFallingRecorder)
                }
            }
        },
        "5Drw": function(e, t, n) {
            "use strict";
            n.d(t, "a", (function() {
                return o
            }));
            class o {
                constructor(e) {
                    this.time = void 0, this.metrics = void 0, this.time = e, this.metrics = []
                }
                setTime(e) {
                    this.time = e
                }
                add(e) {
                    this.metrics.push(e)
                }
                static clone(e) {
                    const t = new o(e.time);
                    return e.metrics.forEach((e => t.add(e))), t
                }
            }
            t.b = class {
                constructor() {
                    this.timeNodes = void 0, this.startTime = void 0, this.isRunning = void 0, this.enabled = void 0, this.everyTimeNode = void 0, this.timer = void 0, this.listener = void 0, this.everyPassedTime = void 0, this.sort = e => {
                        for (let t = 1; t < e.length; t++) {
                            const n = e[t];
                            let o;
                            for (o = t - 1; o >= 0 && e[o].time > n.time; o--) e[o + 1] = e[o];
                            e[o + 1] = n
                        }
                        return e
                    }, this.timeNodes = [], this.startTime = 0, this.isRunning = !1, this.enabled = !1, this.everyPassedTime = 0
                }
                onMessage(e) {
                    this.listener = e
                }
                startUp(e) {
                    this.isRunning || (this.enabled = !0, this.timeNodes = this.sort(e), this.timeNodes.length && (this.startTime = Date.now(), this.run()))
                }
                startEvery(e) {
                    this.everyTimeNode = e, this.isRunning || (this.enabled = !0, this.startTime = Date.now(), this.everyPassedTime = 0, this.runEvery())
                }
                stop() {
                    clearTimeout(this.timer), this.enabled = !1, this.timeNodes = [], this.everyTimeNode = void 0
                }
                execTimeNode(e) {
                    if (this.enabled && this.listener) {
                        const t = {
                            startTime: this.startTime,
                            passedTime: e.time,
                            metrics: e.metrics
                        };
                        this.listener(t)
                    }
                }
                run() {
                    if (!this.enabled) return void this.stop();
                    this.isRunning = !0;
                    const e = Date.now() - this.startTime,
                        t = this.timeNodes.shift();
                    if (t) {
                        const n = t.time - e;
                        this.timer = setTimeout((() => {
                            this.execTimeNode(t), this.everyPassedTime = t.time, this.run(), this.isRunning = !1
                        }), n)
                    } else this.isRunning = !1, this.runEvery()
                }
                runEvery() {
                    if (!this.everyTimeNode) return;
                    if (!this.enabled) return void this.stop();
                    this.isRunning = !0;
                    const e = this.everyTimeNode.time;
                    e ? this.timer = setTimeout((() => {
                        if (this.everyTimeNode) {
                            const t = this.everyPassedTime + e,
                                n = o.clone(this.everyTimeNode);
                            n.setTime(t), this.execTimeNode(n), this.everyPassedTime = t, this.runEvery(), this.isRunning = !1
                        }
                    }), e) : this.isRunning = !1
                }
            }
        },
        "7FSS": function(e, t, n) {
            "use strict";
            n.d(t, "a", (function() {
                return o
            }));
            const o = globalThis.zconsole || globalThis.console
        },
        "7xKq": function(e, t) {},
        AoYG: function(e, t, n) {
            "use strict";
            var o;
            ! function(e) {
                e.TIME = "TIME", e.MEMORY = "MEMORY", e.CPU = "CPU", e.USAGE = "USAGE", e.APP_USAGE = "APP_USAGE", e.FPS = "FPS"
            }(o || (o = {})), t.a = o
        },
        BGEY: function(e, t, n) {
            "use strict";
            n.d(t, "a", (function() {
                return le
            })), n.d(t, "b", (function() {
                return ue
            }));
            var o = n("Ff2n"),
                i = n("K0f4"),
                s = n("wudS"),
                a = n("bH0y"),
                r = n("buT3"),
                c = n("NFKh"),
                d = n.n(c);

            function m() {
                let e = window.localStorage.getItem("sh_z_uuid") || window.localStorage.getItem("z_uuid");
                return e || (e = function() {
                    let e = (new Date).getTime();
                    window.performance && "function" == typeof window.performance.now && (e += performance.now());
                    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(t) {
                        let n = (e + 16 * Math.random()) % 16 | 0;
                        return e = Math.floor(e / 16), ("x" == t ? n : 3 & n | 8).toString(16)
                    }))
                }() + "-" + d.a.MD5(navigator.userAgent).toString(), window.localStorage.setItem("sh_z_uuid", e)), e
            }
            var l = n("gNXM");

            function u(e) {
                return "string" == typeof e ? e : "object" == typeof e ? JSON.stringify(e) : `${e}`
            }
            const p = "MIGRATE_ACTION_TYPE/LOCAL_STORAGE/RENAME",
                h = "MIGRATE_ACTION_TYPE/LOCAL_STORAGE/DELETE",
                _ = "MIGRATE_ACTION_TYPE/LOCAL_STORAGE/RENAME_AND_MARK_FOR_ENCRYPTION",
                g = "MIGRATE_ACTION_TYPE/IDB/RENAME",
                f = "MIGRATE_ACTION_TYPE/IDB/DELETE",
                P = "MIGRATE_ACTION_TYPE/IDB/RENAME_AND_MARK_FOR_ENCRYPTION";
            class I {
                constructor(e, t, n) {
                    this.versionObject = void 0, this.actionType = void 0, this.data = void 0, this.versionObject = e, this.actionType = t, this.data = n
                }
            }
            class w {
                constructor(e) {
                    this._rule = null, this._rule = e
                }
            }
            class M {}
            class y extends I {
                constructor(e, t) {
                    super(e, p, t)
                }
            }
            class v extends w {
                exec(e, t) {
                    const {
                        data: n
                    } = this._rule, [o, i] = n, {
                        dry: s,
                        logger: a
                    } = t || {}, c = (e, t) => {
                        s && a && a.log(`localStorage - Rename ${e} into ${t}`)
                    };
                    if (Array.isArray(o)) {
                        for (const d of o)
                            if (r.a.hasItem(d)) {
                                const t = "string" == typeof i ? i : i(e, d);
                                D(d, t), c(d, t)
                            }
                    } else {
                        const t = o(e);
                        if (Array.isArray(t)) {
                            const n = t;
                            for (const t of n)
                                if (r.a.hasItem(t)) {
                                    const n = "string" == typeof i ? i : i(e, t);
                                    D(t, n), c(t, n)
                                }
                        } else {
                            const n = t,
                                o = r.a.getAllKeyNames();
                            for (const t of o)
                                if (n(t)) {
                                    const n = t,
                                        o = "string" == typeof i ? i : i(e, n);
                                    D(n, o), c(n, o)
                                }
                        }
                    }
                }
            }
            class b extends M {
                createAction(e) {
                    return new v(e)
                }
            }

            function D(e, t) {
                const n = r.a.getItem(e);
                r.a.removeItem(e), r.a.setItem(t, n)
            }
            class q extends w {
                exec(e, t) {
                    const {
                        data: n
                    } = this._rule, o = n, {
                        dry: i,
                        logger: s
                    } = t || {}, a = e => {
                        i && s && s.log(`localStorage - Delete ${e} `)
                    };
                    if (Array.isArray(o))
                        for (const c of o) r.a.hasItem(c) && (A(c), a(c));
                    else {
                        const t = o(e);
                        if (Array.isArray(t)) {
                            const e = t;
                            for (const t of e) r.a.hasItem(t) && (A(t), a(t))
                        } else {
                            const e = t,
                                n = r.a.getAllKeyNames();
                            for (const t of n) e(t) && (A(t), a(t))
                        }
                    }
                }
            }
            class S extends M {
                createAction(e) {
                    return new q(e)
                }
            }

            function A(e) {
                r.a.removeItem(e)
            }
            class T extends w {
                exec(e, t) {
                    const {
                        data: n
                    } = this._rule, [o, i] = n, {
                        dry: s,
                        logger: a
                    } = t || {}, c = (e, t) => {
                        s && a && (a.log(`localStorage - Rename ${e} into ${t}`), a.log(`localStorage - Will encrypt ${t} in its next key reading`))
                    };
                    if (Array.isArray(o)) {
                        for (const d of o)
                            if (r.a.hasItem(d)) {
                                const t = "string" == typeof i ? i : i(e, d);
                                x(d, t), c(d, t)
                            }
                    } else {
                        const t = o(e);
                        if (Array.isArray(t)) {
                            const n = t;
                            for (const t of n)
                                if (r.a.hasItem(t)) {
                                    const n = "string" == typeof i ? i : i(e, t);
                                    x(t, n), c(t, n)
                                }
                        } else {
                            const n = t,
                                o = r.a.getAllKeyNames();
                            for (const t of o)
                                if (n(t)) {
                                    const n = t,
                                        o = "string" == typeof i ? i : i(e, n);
                                    x(n, o), c(n, o)
                                }
                        }
                    }
                }
            }
            class R extends M {
                createAction(e) {
                    return new T(e)
                }
            }

            function x(e, t) {
                const n = r.a.getItem(e);
                r.a.removeItem(e), r.a.setItem(t, n), a.a.markLocalStorageKey(t)
            }
            var N = n("H/wq"),
                E = n("gbvv");
            class $ extends I {
                constructor(e, t) {
                    super(e, g, t)
                }
            }
            class O extends w {
                async exec(e, t) {
                    const {
                        data: n
                    } = this._rule, [o, i, s, a] = n, {
                        dry: r,
                        logger: c
                    } = t || {}, d = (e, t) => {
                        r && c && c.log(`indexedDB - Rename ${e} into ${t}`)
                    };
                    let m = "";
                    m = "string" == typeof o ? o : o(e);
                    let u = null;
                    try {
                        u = await l.a.openExistedDB(m)
                    } catch (h) {
                        if (h.name === N.a) return;
                        throw h
                    }
                    const p = u.objectStoreNames;
                    if (Array.isArray(i)) {
                        const t = i;
                        for (const n of t) p.contains(n) && await k(e, u, n, s, a, d)
                    } else {
                        const t = i(e);
                        if (Array.isArray(t)) {
                            const n = t;
                            for (const t of n) p.contains(t) && await k(e, u, t, s, a, d)
                        } else {
                            const n = t,
                                o = Array.from(p);
                            for (const t of o) n(t) && await k(e, u, t, s, a, d)
                        }
                    }
                }
            }
            class B extends M {
                createAction(e) {
                    return new O(e)
                }
            }
            async function k(e, t, n, o, i, s) {
                const a = t.transaction(n, "readwrite").objectStore(n),
                    r = t.name,
                    c = Object(E.a)(r, n);
                if (!c) return void 0;
                const {
                    keyPath: d
                } = c;
                if (Array.isArray(o)) {
                    const t = o;
                    for (const n of t) {
                        if (!(await l.a.doesObjectStoreHaveKey(n, a))) continue;
                        const t = "string" == typeof i ? i : i(e, n);
                        await l.a.renameKeyOfObjectStore(n, t, a, d), s(n, t)
                    }
                } else {
                    const t = o(e);
                    if (Array.isArray(t)) {
                        const n = t;
                        for (const t of n) {
                            if (!(await l.a.doesObjectStoreHaveKey(t, a))) continue;
                            const n = "string" == typeof i ? i : i(e, t);
                            await l.a.renameKeyOfObjectStore(t, n, a, d), s(t, n)
                        }
                    } else {
                        const n = t,
                            o = await l.a.getAllKeyNamesOfObjectStore(a);
                        for (const t of o) {
                            if (!n(t)) continue;
                            const o = "string" == typeof i ? i : i(e, t);
                            await l.a.renameKeyOfObjectStore(t, o, a, d), s(t, o)
                        }
                    }
                }
            }
            class U extends I {
                constructor(e, t) {
                    super(e, f, t)
                }
            }
            class C extends w {
                async exec(e, t) {
                    const {
                        data: n
                    } = this._rule, [o, i, s] = n, {
                        dry: a,
                        logger: r
                    } = t || {}, c = e => {
                        a && r && r.log(`indexedDB - Delete ${e}}`)
                    };
                    let d = "";
                    d = "string" == typeof o ? o : o(e);
                    let m = null;
                    try {
                        m = await l.a.openExistedDB(d)
                    } catch (p) {
                        if (p.name === N.a) return;
                        throw p
                    }
                    const u = m.objectStoreNames;
                    if (Array.isArray(i)) {
                        const t = i;
                        for (const n of t) u.contains(n) && await G(e, m, n, s, c)
                    } else {
                        const t = i(e);
                        if (Array.isArray(t)) {
                            const n = t;
                            for (const t of n) u.contains(t) && await G(e, m, t, s, c)
                        } else {
                            const n = t,
                                o = Array.from(u);
                            for (const t of o) n(t) && await G(e, m, t, s, c)
                        }
                    }
                }
            }
            class F extends M {
                createAction(e) {
                    return new C(e)
                }
            }
            async function G(e, t, n, o, i) {
                const s = t.transaction(n, "readwrite").objectStore(n);
                if (Array.isArray(o)) {
                    const e = o;
                    for (const t of e) {
                        await l.a.doesObjectStoreHaveKey(t, s) && (await l.a.deleteKeyOfObjectStore(t, s), i(t))
                    }
                } else {
                    const t = o(e);
                    if (Array.isArray(t)) {
                        const e = t;
                        for (const t of e) {
                            await l.a.doesObjectStoreHaveKey(t, s) && (await l.a.deleteKeyOfObjectStore(t, s), i(t))
                        }
                    } else {
                        const e = t,
                            n = await l.a.getAllKeyNamesOfObjectStore(s);
                        for (const t of n) e(t) && (await l.a.deleteKeyOfObjectStore(t, s), i(t))
                    }
                }
            }
            class j extends I {
                constructor(e, t) {
                    super(e, P, t)
                }
            }
            class L extends w {
                async exec(e, t) {
                    const {
                        data: n
                    } = this._rule, [o, i, s, a] = n, {
                        dry: r,
                        logger: c
                    } = t || {}, d = (e, t) => {
                        r && c && (c.log(`indexedDB - Rename ${e} into ${t}`), c.log(`indexedDB - Will encrypt ${t} in its next key reading`))
                    };
                    let m = "";
                    m = "string" == typeof o ? o : o(e);
                    let u = null;
                    try {
                        u = await l.a.openExistedDB(m)
                    } catch (h) {
                        if (h.name === N.a) return;
                        throw h
                    }
                    const p = u.objectStoreNames;
                    if (Array.isArray(i)) {
                        const t = i;
                        for (const n of t) p.contains(n) && await K(e, u, n, s, a, d)
                    } else {
                        const t = i(e);
                        if (Array.isArray(t)) {
                            const n = t;
                            for (const t of n) p.contains(t) && await K(e, u, t, s, a, d)
                        } else {
                            const n = t,
                                o = Array.from(p);
                            for (const t of o) n(t) && await K(e, u, t, s, a, d)
                        }
                    }
                }
            }
            class z extends M {
                createAction(e) {
                    return new L(e)
                }
            }
            async function K(e, t, n, o, i, s) {
                const r = t.transaction(n, "readwrite").objectStore(n),
                    c = t.name,
                    d = Object(E.a)(c, n);
                if (!d) return void 0;
                const {
                    keyPath: m
                } = d;
                if (Array.isArray(o)) {
                    const t = o;
                    for (const o of t) {
                        if (!(await l.a.doesObjectStoreHaveKey(o, r))) continue;
                        const t = "string" == typeof i ? i : i(e, o);
                        await l.a.renameKeyOfObjectStore(o, t, r, m, (() => {
                            a.a.markIndexedDBKey(c, n, t)
                        })), s(o, t)
                    }
                } else {
                    const t = o(e);
                    if (Array.isArray(t)) {
                        const o = t;
                        for (const t of o) {
                            if (!(await l.a.doesObjectStoreHaveKey(t, r))) continue;
                            const o = "string" == typeof i ? i : i(e, t);
                            await l.a.renameKeyOfObjectStore(t, o, r, m, (() => {
                                a.a.markIndexedDBKey(c, n, o)
                            })), s(t, o)
                        }
                    } else {
                        const o = t,
                            d = await l.a.getAllKeyNamesOfObjectStore(r);
                        for (const t of d) {
                            if (!o(t)) continue;
                            const d = "string" == typeof i ? i : i(e, t);
                            await l.a.renameKeyOfObjectStore(t, d, r, m, (() => {
                                a.a.markIndexedDBKey(c, n, d)
                            })), s(t, d)
                        }
                    }
                }
            }
            var W = n("+7Kn");
            const H = new class {
                    constructor() {
                        this._actionFactories = new Map, this.init()
                    }
                    init() {
                        this.registerActionFactory(p, new b), this.registerActionFactory(h, new S), this.registerActionFactory(_, new R), this.registerActionFactory(g, new B), this.registerActionFactory(f, new F), this.registerActionFactory(P, new z)
                    }
                    registerActionFactory(e, t) {
                        if (this._actionFactories.has(e)) throw new W.a(e);
                        this._actionFactories.set(e, t)
                    }
                    getActions(e) {
                        const t = [];
                        for (const n of e) {
                            const {
                                actionType: e
                            } = n, o = this.getActionFactory(e).createAction(n);
                            t.push(o)
                        }
                        return t
                    }
                    getActionFactory(e) {
                        const t = this._actionFactories.get(e);
                        if (!t) throw new W.d(e);
                        return t
                    }
                },
                V = ["captcha_cert", "l-lg-t", "_config_new_remember", "_config_opt_remember", "z_admin_config", "language", "z_uuid", "z_recentp", "z_recoun", "z_reclogtype", "quest_cert", "already_login", "zpw_type", "zpw_ver", "app_ver", "e1cfeb1a59820a1ef96743cac2394fc4", "ADD_SYSTEM_INFO", "z_nom", "zcpu_messure_update", "zcpu_messure_recording", "last_inject_events", "gr_topics__pin_limit", "off_socket", "z_new_register", "FORGOT_PASSWORD", "zlast_uid", "z_recentin", "z_recentuid", "zlast_logout", "_need_set_remember", "_set_value_action_log", "FORCE_GET_FRIEND_LIST", "z_crdbSyncMsg", "z_needSyncMsg", "z_syncmsgInfo", "singleton_web_app", "z_lspop_faildb", "zlast_reset_db", "reset__zklastefid", "qos_url", "qos_lastRequestId", "_ud_launch_", "_remme_", "_rupd_", "_avblupd_", "_ud_what_new_", "_ud_new_version_", "_stry_cf_", "_s_ph_if_", "limit_pin_messages", "zipKey", "last_timeonapp_submit", "_firstCall", "zpc_log_submitted_at", "upload_log_client", "z_listroom_", "z_c_d_", "zv_cu", "zavi_download_dir", "__cookieStore__", "pcinfo", "mig_ver_sh", "user_ids", "zclr_res_pid", "domain-tool-v1-db-cache-data", "mig_lt_sh", "${userID}_viewerkey", "${userID}_cl_u_r_", "${userID}react_", "${userID}_deviceSettings"],
                Y = ["introduced-ttl-${userID}", "${userID}_g_token", "${userID}_d_token", "__list_recent_search__${userID}", "__list_recent_g_search__${userID}v2", "ttl-v1-${userID}", "ttl-v1-saved-${userID}", "fas_${userID}", "feat-pro-count-auto-replies-${userID}"],
                Q = ["passCode", "timeOut", "_skip_stk_cat_", "lst_force_reset_db", "z_rdb_", "z_dl_media_setting", "z_dl_media_info", "recent_save_path", "text-file-editor-rect", "lstdm_", "filesPath", "z_lf_frl", "DB_TYPE_SETTING_KEY", "${userID}_ver_sticker_suggest", "${userID}_ver_giphy_suggest", "${userID}_ver_sticker_cate_list", "${userID}_ver_giphy_cate", "${userID}_ver_tenor_to_sticker", "zres_mgt_${userID}", "${userID}_preload_cache", "last_dttm_overflow_queue_${userID}", "${userID}_show_onboard_cata", "z_stw_${userID}", "ztipfol_${userID}", "z1gbftip_${userID}", "_rso_${userID}", "sticker_hint${userID}", "tg_hfg${userID}", "_lastLogSidebarState_${userID}", "z_sendtome_filessent_${userID}", "z_del_everyone_${userID}", "z_sendtome_supportpage_${userID}", "${userID}_gr_topics__force_sync", "${userID}_debugsignal", "call_st_autoAudioInput_${userID}", "call_st_autoAudioOutput_${userID}", "call_st_audioInput_${userID}", "call_st_audioInputVl_${userID}", "call_st_audioOutput_${userID}", "call_st_audioOutputVl_${userID}", "call_st_videoInput_${userID}", "call_auto_adjust_${userID}", "z1gbfpop_${userID}", "_clipboard_suggestion_${userID}", "_auto_sticker_${userID}", "_double_click_reply_${userID}", "z_sendtome_quicksend_${userID}", "${userID}__QM__showDashboardTooltip", "${userID}__QM__showEntrypointRedDot", "${userID}__QM__showSettingsRedDot", "${userID}__QM__showWelcome", "${userID}__QM__searchTutorialCount", "z_sendtome_bubbledot_${userID}", "z_sendtome_suggest_limit_${userID}", "${userID}_BUTTON_FRIEND_LIST", "${userID}_BUTTON_REQUEST_FRIEND", "${userID}_BUTTON_SEND_REQUEST_FRIEND", "${userID}_BUTTON_NEW_FRIEND", "f_nf_${userID}", "z_sendtome_${userID}", "z_sendtome_pinned_${userID}", "nlst_w_${userID}", "${userID}_zinit_sgg", "onboarding_flag_${userID}", "${userID}__dbtimepc", "overflowts_${userID}", "${userID}_data_pin_hidden_chat", "${userID}_data_ids_hidden_chat", "${userID}_config_show_unread_time", "${userID}_data_config_hidden_chat", "${userID}_zpinc", "me_ts_${userID}", "${userID}_signal_cur_opid", "${userID}_signalenable", "${userID}_signalsubdevices", "${userID}_signallastinit", "${userID}_signalreinitsub", "${userID}_signalrk", "recent_sticker_event_${userID}", "recent_card_event_${userID}", "${userID}_version_alias", "${userID}_time_alias", "${userID}_last_err_alias", "${userID}_ver_bl_friend", "${userID}_init_fetch_fr", "${userID}_last_time_fetch_fr_success", "${userID}_key_last_get_fr_status", "${userID}_last_time_req_to_me", "fr_req_src_${userID}", "${userID}_alias_key", "${userID}phonebook_ver_key", "${userID}_phonebook_key", "${userID}_time_update_pbook", "${userID}_last_err_pb", "${userID}_last_time_verify_fr_list", "${userID}_config_alias", "${userID}_z_uids_bl", "zrgf_${userID}", "${userID}_total_mem_per_fetch", "muq_${userID}", "${userID}_cdkl", "${userID}_cdk", "${userID}_last_ack_evict", "lsmsg_${userID}", "askNoti_${userID}", "acv2_${userID}", "ac_${userID}", "aco_${userID}", "sock_msg_${userID}", "sock_ac_${userID}", "sock_aco_${userID}", "actrv2_${userID}", "actr_${userID}", "actro_${userID}", "${userID}_show_sidebar_cata", "${userID}_cata_ver", "${userID}__QM__lastUpdate", "zretry_v1__${userID}", "mgrk_${userID}", "mgripck_v4_${userID}", "z_trackfollow_v2${userID}", "z_tracktimesearch${userID}", "z_his_decay${userID}", "z_trackfrecency_v2${userID}", "z_sound_${userID}", "z_cleardata_${userID}", "z_e2ee_times_${userID}", "z_chatbg_${userID}", "z_capzalo_${userID}", "z_scrshot_hotkey_${userID}", "z_scrshot_hotkey_withoutZ_${userID}", "z_ytpr_${userID}", "z_ivap_${userID}", "z_ivaps_${userID}", "z_tptm_${userID}", "z_contact_${userID}", "z_copy_excel_${userID}", "z_suggestMentions_${userID}", "z_todoEventRemind_${userID}", "z_file_enable_auto_download_${userID}", "z_file_enable_thumbnail_${userID}", "z_file_white_list_${userID}", "z_text_file_editor_wrap_${userID}", "z_enable_notify_call_${userID}", "${userID}_z_sc", "${userID}_lff_", "${userID}_ver_pin", "${userID}_LAST_CONTACT_LIST_OPEN", "hfresetac355_${userID}", "${userID}_rs", "${userID}_remo", "${userID}_s_stk", "${userID}_st-on-dock", "${userID}_st-ver_", "${userID}_rm_s", "lbl_${userID}", "z_mdbk_${userID}", "${userID}_ib", "${userID}_off_tip_", "${userID}_cot", "${userID}_rate", "${userID}_bd", "${userID}_lbl-info", "${userID}__imlc", "${userID}__imlp", "${userID}_unrImsg", "${userID}_upss", "sock_pgm_${userID}", "${userID}iurc_", "${userID}dmn_", "${userID}__gbunread", "${userID}_dmar", "${userID}_dst", "${userID}_wn", "${userID}_ri", "${userID}_emo", "${userID}_h_n_stck", "${userID}_efs", "${userID}_pfs", "${userID}_grv", "${userID}_nsp_", "${userID}_lstCrS", "${userID}_cpa", "${userID}___sdbs", "${userID}_un_td", "${userID}_51area", "${userID}_adtd", "${userID}_adtdm", "${userID}_arotd", "${userID}_n_up_t", "${userID}_ta", "${userID}_fcbt", "${userID}_daet", "${userID}_bnbs", "${userID}_lused-lbl", "${userID}_z_jumpurl", "${userID}_inc_m_", "${userID}_z_cngc", "${userID}_tvi", "${userID}_tbsh", "${userID}_wps", "${userID}_wfs", "${userID}_m_u_f", "${userID}u_l_f", "${userID}_z_u_s", "${userID}_lbl_coll", "${userID}_lbl-intro", "${userID}_right_sb", "${userID}__update_gi", "${userID}_rem_pn", "${userID}_conv_ux_ver", "${userID}_conv_ux_mul_lbl", "${userID}_conv_ux_ec", "${userID}_cls_m_b", "${userID}_conv_tr_inf", "${userID}_bt", "${userID}_z_phonebook_version", "${userID}_l_r_msg", "z_sync_key__${userID}", "z_sync_wr_key__${userID}", "${userID}_showCf", "z_sync_stt${userID}", "mgrthreadmsgk_v2_${userID}", "zthrpendingact_${userID}", "${userID}_room_end_meeting", "z_frl_${userID}", "lastfilepath_${userID}", "lastimagepath_${userID}", "_dk_stk_${userID}", "${userID}_lbl_ver", "${userID}_signalserverenable", "${userID}_mig_ver_usr", "${userID}_mig_lt_usr", "INIT_FRIEND_BA${userID}", "${userID}_fdn_", "${userID}___recent_catalog__", "${userID}_rec_pack", "NEED_FETCH_PROFILE_ME${userID}", "${userID}sync_cross_settings", "${userID}_citk", "${userID}_sktmig", "${userID}_key_last_fetch_group", "${userID}_z_b__a_view_onboarding_state", "${userID}_z_b__a_view_business_user_status", "${userID}_z_b__a_view_business_profile", "${userID}_z_b__a_first_upgrade_business_account"],
                J = ["diskCacheInfos", "lastTimeGetDiskCacheInfos", "__ta__dev__", "isAutoScroll", "isAlwaysOnTop", "filterByName", "sticker_cf_v3", "sticker_v3", "feedback_clicked", "ztypsp_", "__STORAGE_WARN_TIMESTAMP__", "IS_FACEBOOK_LOGIN", "NEED_GET_COOKIE_MP3", "z_os_lastSession", "zfl_disable_discovery_v2", "__lstsbnet_", "last-msgid-sock", "last-queue-poll", "en_zshop", "z_auto_dl_msg-setting", "z_auto_dl_msg-info", "zdb_setting", "zroll_qc", "${userID}_time_begin_promote", "last_stk_${userID}", "${userID}_show_popup_del", "last_sc${userID}", "${userID}_fr_has_convs", "zmigrate_${userID}_lastId", "zmigrate_${userID}", "zmigrate_${userID}_sch", "zmigrate_${userID}_total", "zmigrate_${userID}_stat", "zmigrate_${userID}_er", "${userID}_z_spfonl_", "z_trackthk${userID}", "z_trackfollow${userID}", "z_trackfrecency${userID}", "z_e2ee_file_times_${userID}", "z_theme_${userID}", "z_ytcf_${userID}", "__list_recent_g_search__${userID}", "${userID}_st-first-time", "${userID}_st-mg_", "${userID}_bn", "${userID}_cstk", "${userID}_gbrt", "${userID}_gbin", "${userID}_gbgn", "${userID}_awf", "${userID}_qe", "${userID}_tmem", "${userID}_off_pr_st", "${userID}_mig_mention_v1", "${userID}_nnc", "${userID}_rctfm", "${userID}_tasks", "${userID}_cte", "${userID}_tte", "${userID}__zptd", "${userID}_ztbd", "${userID}_c_p_", "${userID}_tdlv", "${userID}__zlnt", "update-to-use-vanish-${userID}", "set-vanish--succeed${userID}"];

            function X(e) {
                return e.startsWith("sh_")
            }

            function Z(e, t) {
                if (!Object(s.a)(e)) return !1;
                const n = Object(s.b)(e);
                return t.startsWith(`${n}_`)
            }

            function ee(e) {
                return !!["zinsrc", "tmpr"].some((t => e.startsWith(`${t}_`))) || V.some((t => {
                    const n = "^" + t.replace("${userID}", "[0-9]+") + "$";
                    return new RegExp(n, "g").test(e)
                }))
            }

            function te(e, t) {
                return !(!t.startsWith("hide-fbadge") || !t.endsWith(e)) || (t === `$auto-replies-state-v1-${e}` || Y.some((n => {
                    const o = n.replace("${userID}", e);
                    return t.includes(o)
                })))
            }

            function ne(e, t) {
                if (t.startsWith(`${e}_z_ml_`)) return !0;
                if (t.startsWith(`${e}_`) && t.endsWith("_lastReceiveTs")) return !0;
                if (t.startsWith(`${e}_tabmsg.header_`)) return !0;
                if (t.startsWith(`TIP_CARD_ID_${e}_`)) return !0;
                if (t.startsWith(`TIP_PROMO_ICON_ID_${e}_`)) return !0;
                if (t.startsWith(`TIP_EFFECT_ID_${e}_`)) return !0;
                if (t.startsWith(`_recent_card_p_${e}_`)) return !0;
                if (t.startsWith(`zklastefid_${e}_`)) return !0;
                let n = t.split("_");
                return 2 === n.length && n[0] === e && !isNaN(Number(n[1])) || (!!t.startsWith(`${e}_z_bl_`) || (!!t.includes("lstfpmedia") || (!!t.startsWith(`${e}_z_frq_`) || (!!t.startsWith(`${e}_at_k_`) || (!(!t.startsWith(e) || !t.endsWith("_z_clmt")) || (!!t.startsWith(`sock_verfy_${e}`) || (!!t.startsWith(`z_retry_${e}_`) || (!!t.startsWith(`${e}_mact_`) || (!!t.startsWith(`${e}_mhasm_`) || (n = t.split("_"), !(3 !== n.length && 4 !== n.length || n[0] !== e || isNaN(Number(n[2]))) || (!!t.startsWith(`${e}_sync_cross_state`) || Q.some((n => {
                    const o = n.replace("${userID}", e);
                    return t === o
                })))))))))))))
            }

            function oe(e) {
                if (e.includes("_rpk_")) return !0;
                if (e.endsWith("_signalssgr")) return !0;
                if (["image", "fetchedImages", "file", "fetchedFiles", "link", "fetchedLinks"].some((t => e.endsWith(`${t}`)))) return !0;
                if (e.includes("_z_srq_name_")) return !0;
                return !!/^[0-9]{19}_msg_/g.test(e) || J.some((t => {
                    const n = "^" + t.replace("${userID}", "[0-9]+") + "$";
                    return new RegExp(n, "g").test(e)
                }))
            }
            var ie = [...[new y({
                currentSharedKeyVer: 0,
                targetVer: 1
            }, [() => e => ee(e) && !X(e), (e, t) => {
                let n = t;
                const o = ["deviceSettings", "viewerkey", "_cl_u_r_", "react_"];
                for (const i of o)
                    if (t.endsWith(i)) {
                        const e = /^[_-]+|[_-]+$/g;
                        n = i.replace(e, "");
                        break
                    }
                return `sh_${n}`
            }]), new y({
                currentUserScopedKeyVer: 0,
                targetVer: 1
            }, [e => e ? t => ne(e, t) && !Z(e, t) : [], (e, t) => {
                if (!e) throw new W.f;
                const n = Object(s.b)(e);
                let o = t;
                if (t.includes(e))
                    if (t === `${e}_${e}`) o = e;
                    else {
                        const n = /^[_-]+|[_-]+$/gm;
                        o = t.split(e).filter((e => "" !== e)).map((e => e.replace(n, ""))).join("_").replace(/^(sh_)+/g, "")
                    }
                return `${n}_${o}`
            }]), new class extends I {
                constructor(e, t) {
                    super(e, h, t)
                }
            }({
                currentSharedKeyVer: 0,
                currentUserScopedKeyVer: 0,
                targetVer: 1
            }, (() => e => oe(e))), new class extends I {
                constructor(e, t) {
                    super(e, _, t)
                }
            }({
                currentUserScopedKeyVer: 0,
                targetVer: 1
            }, [e => e ? t => te(e, t) && !Z(e, t) : [], (e, t) => {
                if (!e) throw new W.f;
                const n = Object(s.b)(e);
                if (t === `$auto-replies-state-v1-${e}`) return `${n}_auto-replies-state-v1`;
                let o = t;
                if (t.includes(e))
                    if (t === `${e}_${e}`) o = e;
                    else {
                        const n = /^[_-]+|[_-]+$/gm;
                        o = t.split(e).filter((e => "" !== e)).map((e => e.replace(n, ""))).join("_").replace(/^(sh_)+/g, "")
                    }
                return `${n}_${o}`
            }]), new $({
                currentSharedKeyVer: 0,
                targetVer: 1
            }, ["zlocalstorage", ["friend-blocked", "info-cache", "retry-cache"], () => e => "string" == typeof e && ee(e) && !X(e), (e, t) => {
                let n = t;
                const o = ["deviceSettings", "viewerkey", "_cl_u_r_", "react_"];
                for (const i of o)
                    if (t.endsWith(i)) {
                        const e = /^[_-]+|[_-]+$/g;
                        n = i.replace(e, "");
                        break
                    }
                return `sh_${n}`
            }]), new $({
                currentSharedKeyVer: 0,
                targetVer: 1
            }, ["zsecure-localstorage", ["async-store"], () => e => "string" == typeof e && ee(e) && !X(e), (e, t) => {
                let n = t;
                const o = ["deviceSettings", "viewerkey", "_cl_u_r_", "react_"];
                for (const i of o)
                    if (t.endsWith(i)) {
                        const e = /^[_-]+|[_-]+$/g;
                        n = i.replace(e, "");
                        break
                    }
                return `sh_${n}`
            }]), new $({
                currentUserScopedKeyVer: 0,
                targetVer: 1
            }, ["zlocalstorage", ["friend-blocked", "info-cache", "retry-cache"], e => e ? t => "string" == typeof t && ne(e, t) && !Z(e, t) : [], (e, t) => {
                if (!e) throw new W.f;
                const n = Object(s.b)(e);
                let o = t;
                if (t.includes(e))
                    if (t === `${e}_${e}`) o = e;
                    else {
                        const n = /^[_-]+|[_-]+$/gm;
                        o = t.split(e).filter((e => "" !== e)).map((e => e.replace(n, ""))).join("_").replace(/^(sh_)+/g, "")
                    }
                return `${n}_${o}`
            }]), new $({
                currentUserScopedKeyVer: 0,
                targetVer: 1
            }, ["zsecure-localstorage", ["async-store"], e => e ? t => "string" == typeof t && ne(e, t) && !Z(e, t) : [], (e, t) => {
                if (!e) throw new W.f;
                const n = Object(s.b)(e);
                let o = t;
                if (t.includes(e))
                    if (t === `${e}_${e}`) o = e;
                    else {
                        const n = /^[_-]+|[_-]+$/gm;
                        o = t.split(e).filter((e => "" !== e)).map((e => e.replace(n, ""))).join("_").replace(/^(sh_)+/g, "")
                    }
                return `${n}_${o}`
            }]), new U({
                currentSharedKeyVer: 0,
                currentUserScopedKeyVer: 0,
                targetVer: 1
            }, ["zlocalstorage", ["friend-blocked", "info-cache", "retry-cache"], () => e => "string" == typeof e && oe(e)]), new U({
                currentSharedKeyVer: 0,
                currentUserScopedKeyVer: 0,
                targetVer: 1
            }, ["zsecure-localstorage", ["async-store"], () => e => "string" == typeof e && oe(e)]), new j({
                currentUserScopedKeyVer: 0,
                targetVer: 1
            }, ["zlocalstorage", ["friend-blocked", "info-cache", "retry-cache"], e => e ? t => "string" == typeof t && te(e, t) && !Z(e, t) : [], (e, t) => {
                if (!e) throw new W.f;
                const n = Object(s.b)(e);
                if (t === `$auto-replies-state-v1-${e}`) return `${n}_auto-replies-state-v1`;
                let o = t;
                if (t.includes(e))
                    if (t === `${e}_${e}`) o = e;
                    else {
                        const n = /^[_-]+|[_-]+$/gm;
                        o = t.split(e).filter((e => "" !== e)).map((e => e.replace(n, ""))).join("_").replace(/^(sh_)+/g, "")
                    }
                return `${n}_${o}`
            }]), new j({
                currentUserScopedKeyVer: 0,
                targetVer: 1
            }, ["zsecure-localstorage", ["async-store"], e => e ? t => "string" == typeof t && te(e, t) && !Z(e, t) : [], (e, t) => {
                if (!e) throw new W.f;
                const n = Object(s.b)(e);
                if (t === `$auto-replies-state-v1-${e}`) return `${n}_auto-replies-state-v1`;
                let o = t;
                if (t.includes(e))
                    if (t === `${e}_${e}`) o = e;
                    else {
                        const n = /^[_-]+|[_-]+$/gm;
                        o = t.split(e).filter((e => "" !== e)).map((e => e.replace(n, ""))).join("_").replace(/^(sh_)+/g, "")
                    }
                return `${n}_${o}`
            }])]];
            const se = new class {
                constructor() {
                    this._ruleMap = new Map, this._initRuleMap()
                }
                _getRuleMapKey(e) {
                    let t = "x",
                        n = "x";
                    const {
                        targetVer: o
                    } = e;
                    return Object.hasOwnProperty.call(e, "currentSharedKeyVer") && (t = u(e.currentSharedKeyVer)), Object.hasOwnProperty.call(e, "currentUserScopedKeyVer") && (n = u(e.currentUserScopedKeyVer)), `${t}_${n}_${o}`
                }
                _initRuleMap() {
                    const e = ie;
                    for (const t of e) {
                        const {
                            versionObject: e
                        } = t, n = this._getRuleMapKey(e);
                        let o = [];
                        this._ruleMap.has(n) && (o = this._ruleMap.get(n)), o.push(t), this._ruleMap.set(n, o)
                    }
                }
                getRules(e, t, n) {
                    const o = this._getRuleMapKey({
                            currentSharedKeyVer: e,
                            targetVer: n
                        }),
                        i = this._ruleMap.get(o) || [],
                        s = this._getRuleMapKey({
                            currentUserScopedKeyVer: t,
                            targetVer: n
                        }),
                        a = this._ruleMap.get(s) || [],
                        r = this._getRuleMapKey({
                            currentSharedKeyVer: e,
                            currentUserScopedKeyVer: t,
                            targetVer: n
                        });
                    return [...i, ...a, ...this._ruleMap.get(r) || []]
                }
            };
            var ae = n("N0Be");
            class re {
                constructor() {
                    this.startTime = null, this.endTime = null
                }
                start() {
                    this.startTime = performance.now(), this.endTime = null
                }
                end() {
                    this.endTime = performance.now()
                }
                reset() {
                    this.startTime = null, this.endTime = null
                }
                isDataReady() {
                    return null !== this.startTime && null !== this.endTime
                }
                getDuration() {
                    if (!this.isDataReady()) return null;
                    return Math.round(this.endTime - this.startTime)
                }
            }
            const ce = ["err"];
            async function de(e, t) {
                const {
                    currentSharedKeysVer: a,
                    currentUserScopedKeysVer: c,
                    targetVer: d,
                    err: l
                } = t, u = l instanceof Error ? `${function(e){switch(e){case ae.a:return 1;case ae.d:return 2;case ae.b:return 3;case ae.g:return 4;case ae.e:return 5;case ae.f:return 6;case ae.c:return 7;default:return 0}}(l.name)}` : "0";
                a < d && (r.a.setItem(i.l, "0"), r.a.setItem(i.b, u));
                if (null !== e && c < d) {
                    const t = Object(s.b)(e),
                        n = `${t}_${i.m}`;
                    r.a.setItem(n, "0");
                    const o = `${t}_${i.c}`;
                    r.a.setItem(o, u)
                }
                const p = await Promise.resolve().then(n.bind(null, "agHs"));
                p.withScope((e => {
                    e.setTag(i.j, `${m()}`);
                    const {
                        err: n
                    } = t, s = Object(o.a)(t, ce);
                    e.setExtras(s), n instanceof Error ? p.captureException(n) : "string" == typeof n && p.captureMessage(n, p.Severity.Fatal)
                }))
            }

            function me(e, t, n) {
                const o = se.getRules(e, t, n);
                return H.getActions(o)
            }

            function le(e) {
                const t = `${Object(s.b)(e)}_${i.n}`;
                if (!r.a.hasItem(t)) return !1;
                return 1 === +r.a.getItem(t)
            }
            async function ue(e, t) {
                void 0 === t && (t = {}), Object(s.d)();
                const n = null !== e,
                    o = null !== r.a.getItem(i.b);
                let c = !1;
                if (n) {
                    const t = `${Object(s.b)(e)}_${i.c}`;
                    c = null !== r.a.getItem(t)
                }
                const {
                    dry: d,
                    logger: m
                } = t;
                if (d && (r.a.turnOnDryMode(), l.a.turnOnDryMode()), n && (a.a.init(e), !d && function() {
                        const e = i.k;
                        return !!r.a.hasItem(e) && 1 == +r.a.getItem(e)
                    }() && le(e))) return;
                const p = new re;
                p.start();
                const h = {
                    currentSharedKeysVer: i.d,
                    currentUserScopedKeysVer: i.d,
                    targetVer: i.d,
                    err: null
                };
                h.targetVer = 1;
                let _ = i.d;
                !d && r.a.hasItem(i.k) && (_ = +r.a.getItem(i.k), h.currentSharedKeysVer = _), o && (_ = i.a);
                let g = i.d;
                if (n) {
                    const t = `${Object(s.b)(e)}_${i.n}`;
                    !d && r.a.hasItem(t) && (g = +r.a.getItem(t), h.currentUserScopedKeysVer = g)
                }
                c && (g = i.a), await new Promise((async o => {
                    const a = setTimeout((async () => {
                        const t = new W.c;
                        m && m.error(t.message), h.err = t, await de(e, h), o()
                    }), i.e);
                    try {
                        for (;;) {
                            const n = me(_, g, 1);
                            if (0 === n.length) break;
                            for (const o of n) await o.exec(e, t);
                            _ < 1 && _ !== i.a && (_ += 1, h.currentSharedKeysVer = _), null !== g && g !== i.a && g < 1 && (g += 1, h.currentUserScopedKeysVer = g)
                        }
                        if (clearTimeout(a), _ !== i.a && (r.a.setItem(i.k, u(1)), r.a.setItem(i.l, "1")), n && g !== i.a) {
                            const t = Object(s.b)(e),
                                n = `${t}_${i.n}`;
                            r.a.setItem(n, u(1));
                            const o = `${t}_${i.m}`;
                            r.a.setItem(o, "1")
                        }
                    } catch (c) {
                        0,
                        h.err = c,
                        await de(e, h)
                    }
                    finally {
                        o()
                    }
                })), a.a.save(), p.end();
                const f = p.getDuration();
                if (null !== f) {
                    if (r.a.setItem(i.f, `${f}`), n) {
                        const t = Object(s.b)(e);
                        r.a.setItem(`${t}_${i.g}`, `${f}`)
                    }
                    p.reset()
                }
                const P = r.a.getAllKeyNames().length + await async function() {
                    let e = 0;
                    const t = ["friend-blocked", "info-cache", "retry-cache"];
                    for (const n of t) e += await l.a.getTotalKeyCountOfStore("zlocalstorage", n);
                    return e += await l.a.getTotalKeyCountOfStore("zsecure-localstorage", "async-store"), e
                }();
                if (r.a.setItem(i.h, `${P}`), n) {
                    const t = Object(s.b)(e);
                    r.a.setItem(`${t}_${i.i}`, `${P}`)
                }
            }
        },
        CHYU: function(e, t, n) {
            "use strict";
            var o;
            ! function(e) {
                e.Main = "main", e.Render = "render", e.SharedWorker = "shared-worker", e.Photo = "photo", e.Web = "web", e.Embed = "embed", e.Login = "login", e.Unknown = "unknown"
            }(o || (o = {})), t.a = o
        },
        Cvfp: function(e, t, n) {
            "use strict";
            n.d(t, "a", (function() {
                return o
            })), n.d(t, "b", (function() {
                return i
            }));
            const o = "-/~^~/-",
                i = {
                    zlocalstorage: {
                        "cocos-res": {
                            keyPath: "path",
                            dataPath: "data"
                        },
                        "db-stchecksum": {
                            keyPath: "checksum",
                            dataPath: "url"
                        },
                        "friend-blocked": {
                            keyPath: "key",
                            dataPath: "val"
                        },
                        "info-cache": {
                            keyPath: "key",
                            dataPath: "val"
                        },
                        "retry-cache": {
                            keyPath: "key",
                            dataPath: "val"
                        }
                    },
                    "zsecure-localstorage": {
                        "async-store": {
                            keyPath: "key",
                            dataPath: "val"
                        }
                    }
                }
        },
        "H/wq": function(e, t, n) {
            "use strict";
            n.d(t, "a", (function() {
                return o
            })), n.d(t, "b", (function() {
                return i
            }));
            const o = "NonExistedDBError";
            class i extends Error {
                constructor(e) {
                    super(e), this.name = o
                }
            }
        },
        "K+9E": function(e, t, n) {
            "use strict";
            var o;
            ! function(e) {
                e.METRIC_MANAGER = "METRIC_MANAGER", e.METRIC_SCHEMA_MANAGER = "METRIC_SCHEMA_MANAGER", e.METRIC_FACTORY = "METRIC_FACTORY", e.METRIC_TRANSPORTER = "METRIC_TRANSPORTER", e.METRIC_RESOLVER = "METRIC_RESOLVER", e.USAGE_MONITOR = "USAGE_MONITOR", e.LOCAL_STAT = "LOCAL_STAT", e.DATA_MANAGER = "DATA_MANAGER", e.UI_MANAGER = "UI_MANAGER"
            }(o || (o = {})), t.a = o
        },
        K0f4: function(e, t, n) {
            "use strict";
            n.d(t, "k", (function() {
                return o
            })), n.d(t, "n", (function() {
                return i
            })), n.d(t, "b", (function() {
                return s
            })), n.d(t, "c", (function() {
                return a
            })), n.d(t, "d", (function() {
                return r
            })), n.d(t, "a", (function() {
                return c
            })), n.d(t, "e", (function() {
                return d
            })), n.d(t, "j", (function() {
                return m
            })), n.d(t, "l", (function() {
                return l
            })), n.d(t, "m", (function() {
                return u
            })), n.d(t, "f", (function() {
                return p
            })), n.d(t, "g", (function() {
                return h
            })), n.d(t, "h", (function() {
                return _
            })), n.d(t, "i", (function() {
                return g
            }));
            const o = "sh_mig_ver_sh",
                i = "mig_ver_usr",
                s = "sh_mig_lt_sh",
                a = "mig_lt_usr",
                r = 0,
                c = -1,
                d = 1e6,
                m = "migrate_storage_key",
                l = "sh_mig_scs_sh",
                u = "mig_scs_usr",
                p = "sh_mig_d",
                h = "mig_d",
                _ = "sh_mig_co",
                g = "mig_co"
        },
        K6Wi: function(e, t, n) {
            "use strict";
            n.r(t);
            var o = {};
            n.r(o), n.d(o, "scrollConvList", (function() {
                return j
            })), n.d(o, "switchJumpConv", (function() {
                return K
            })), n.d(o, "scrollChatBoxView", (function() {
                return H
            })), n.d(o, "switchMainTab", (function() {
                return Y
            })), n.d(o, "scrollGlobalSearchList", (function() {
                return J
            }));
            var i = n("VTBJ"),
                s = n("rFEu"),
                a = n("cnBV"),
                r = n("uzza"),
                c = n("CHYU");
            const d = Object(s.f)(s.a.time("1m"), s.a.time("5m"), s.a.time("10m"), s.a.time("30m"), s.a.time("1h"), s.a.time("3h"), s.a.time("5h"), s.a.time("8h"), s.a.time("24h")),
                m = s.b.Memory({
                    name: r.a.usage_memory,
                    categories: [a.a.usage],
                    timeline: d,
                    statement: Object(s.e)({
                        name: "memory usage",
                        points: [s.e.Point({
                            name: "usage after 1m",
                            condition: e => {
                                const t = s.a.extractPassedTime(e);
                                return !!(t && t <= s.a.time("1m"))
                            },
                            points: [s.e.Point({
                                name: "<= 50 MB",
                                condition: e => {
                                    const t = s.a.extractHeapUsed(e);
                                    return !!(null != t && t <= s.a.bytes("50MB"))
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99108
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99140
                                    }
                                }), s.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99172
                                    }
                                })]
                            }), s.e.Point({
                                name: "50 MB < heapUsed <= 100 MB",
                                condition: e => {
                                    const t = s.a.extractHeapUsed(e);
                                    return !!(null != t && t <= s.a.bytes("100MB"))
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99109
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99141
                                    }
                                }), s.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99173
                                    }
                                })]
                            }), s.e.Point({
                                name: "100 MB < heapUsed <= 200 MB",
                                condition: e => {
                                    const t = s.a.extractHeapUsed(e);
                                    return !!(null != t && t <= s.a.bytes("200MB"))
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99110
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99142
                                    }
                                }), s.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99174
                                    }
                                })]
                            }), s.e.Point({
                                name: "heapUsed > 200 MB",
                                condition: e => {
                                    const t = s.a.extractHeapUsed(e);
                                    return !!(null != t && t > s.a.bytes("200MB"))
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99111
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99143
                                    }
                                }), s.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99175
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "usage after 5m",
                            condition: e => {
                                const t = s.a.extractPassedTime(e);
                                return !!(t && t <= s.a.time("5m"))
                            },
                            points: [s.e.Point({
                                name: "<= 50 MB",
                                condition: e => {
                                    const t = s.a.extractHeapUsed(e);
                                    return !!(null != t && t <= s.a.bytes("50MB"))
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99112
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99144
                                    }
                                }), s.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99176
                                    }
                                })]
                            }), s.e.Point({
                                name: "50 MB < heapUsed <= 100 MB",
                                condition: e => {
                                    const t = s.a.extractHeapUsed(e);
                                    return !!(null != t && t <= s.a.bytes("100MB"))
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99113
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99145
                                    }
                                }), s.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99177
                                    }
                                })]
                            }), s.e.Point({
                                name: "100 MB < heapUsed <= 200 MB",
                                condition: e => {
                                    const t = s.a.extractHeapUsed(e);
                                    return !!(null != t && t <= s.a.bytes("200MB"))
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99114
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99146
                                    }
                                }), s.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99178
                                    }
                                })]
                            }), s.e.Point({
                                name: "heapUsed > 200 MB",
                                condition: e => {
                                    const t = s.a.extractHeapUsed(e);
                                    return !!(null != t && t > s.a.bytes("200MB"))
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99115
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99147
                                    }
                                }), s.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99179
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "usage after 10m",
                            condition: e => {
                                const t = s.a.extractPassedTime(e);
                                return !!(t && t <= s.a.time("10m"))
                            },
                            points: [s.e.Point({
                                name: "<= 50 MB",
                                condition: e => {
                                    const t = s.a.extractHeapUsed(e);
                                    return !!(null != t && t <= s.a.bytes("50MB"))
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99116
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99148
                                    }
                                }), s.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99180
                                    }
                                })]
                            }), s.e.Point({
                                name: "50 MB < heapUsed <= 100 MB",
                                condition: e => {
                                    const t = s.a.extractHeapUsed(e);
                                    return !!(null != t && t <= s.a.bytes("100MB"))
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99117
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99149
                                    }
                                }), s.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99181
                                    }
                                })]
                            }), s.e.Point({
                                name: "100 MB < heapUsed <= 200 MB",
                                condition: e => {
                                    const t = s.a.extractHeapUsed(e);
                                    return !!(null != t && t <= s.a.bytes("200MB"))
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99118
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99150
                                    }
                                }), s.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99182
                                    }
                                })]
                            }), s.e.Point({
                                name: "heapUsed > 200 MB",
                                condition: e => {
                                    const t = s.a.extractHeapUsed(e);
                                    return !!(null != t && t > s.a.bytes("200MB"))
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99119
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99151
                                    }
                                }), s.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99183
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "usage after 30m",
                            condition: e => {
                                const t = s.a.extractPassedTime(e);
                                return !!(t && t <= s.a.time("30m"))
                            },
                            points: [s.e.Point({
                                name: "<= 50 MB",
                                condition: e => {
                                    const t = s.a.extractHeapUsed(e);
                                    return !!(null != t && t <= s.a.bytes("50MB"))
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99120
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99152
                                    }
                                }), s.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99184
                                    }
                                })]
                            }), s.e.Point({
                                name: "50 MB < heapUsed <= 100 MB",
                                condition: e => {
                                    const t = s.a.extractHeapUsed(e);
                                    return !!(null != t && t <= s.a.bytes("100MB"))
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99121
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99153
                                    }
                                }), s.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99185
                                    }
                                })]
                            }), s.e.Point({
                                name: "100 MB < heapUsed <= 200 MB",
                                condition: e => {
                                    const t = s.a.extractHeapUsed(e);
                                    return !!(null != t && t <= s.a.bytes("200MB"))
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99122
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99154
                                    }
                                }), s.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99186
                                    }
                                })]
                            }), s.e.Point({
                                name: "heapUsed > 200 MB",
                                condition: e => {
                                    const t = s.a.extractHeapUsed(e);
                                    return !!(null != t && t > s.a.bytes("200MB"))
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99123
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99155
                                    }
                                }), s.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99187
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "usage after 1h",
                            condition: e => {
                                const t = s.a.extractPassedTime(e);
                                return !!(t && t <= s.a.time("1h"))
                            },
                            points: [s.e.Point({
                                name: "<= 50 MB",
                                condition: e => {
                                    const t = s.a.extractHeapUsed(e);
                                    return !!(null != t && t <= s.a.bytes("50MB"))
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99124
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99156
                                    }
                                }), s.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99188
                                    }
                                })]
                            }), s.e.Point({
                                name: "50 MB < heapUsed <= 100 MB",
                                condition: e => {
                                    const t = s.a.extractHeapUsed(e);
                                    return !!(null != t && t <= s.a.bytes("100MB"))
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99125
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99157
                                    }
                                }), s.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99189
                                    }
                                })]
                            }), s.e.Point({
                                name: "100 MB < heapUsed <= 200 MB",
                                condition: e => {
                                    const t = s.a.extractHeapUsed(e);
                                    return !!(null != t && t <= s.a.bytes("200MB"))
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99126
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99158
                                    }
                                }), s.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99190
                                    }
                                })]
                            }), s.e.Point({
                                name: "heapUsed > 200 MB",
                                condition: e => {
                                    const t = s.a.extractHeapUsed(e);
                                    return !!(null != t && t > s.a.bytes("200MB"))
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99127
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99159
                                    }
                                }), s.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99191
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "usage after 3h",
                            condition: e => {
                                const t = s.a.extractPassedTime(e);
                                return !!(t && t <= s.a.time("3h"))
                            },
                            points: [s.e.Point({
                                name: "heapUsed <= 100 MB",
                                condition: e => {
                                    const t = s.a.extractHeapUsed(e);
                                    return !!(null != t && t <= s.a.bytes("100MB"))
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99128
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99160
                                    }
                                }), s.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99192
                                    }
                                })]
                            }), s.e.Point({
                                name: "100 MB < heapUsed <= 200 MB",
                                condition: e => {
                                    const t = s.a.extractHeapUsed(e);
                                    return !!(null != t && t <= s.a.bytes("200MB"))
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99129
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99161
                                    }
                                }), s.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99193
                                    }
                                })]
                            }), s.e.Point({
                                name: "heapUsed > 200 MB",
                                condition: e => {
                                    const t = s.a.extractHeapUsed(e);
                                    return !!(null != t && t > s.a.bytes("200MB"))
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99130
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99162
                                    }
                                }), s.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99194
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "usage after 5h",
                            condition: e => {
                                const t = s.a.extractPassedTime(e);
                                return !!(t && t <= s.a.time("5h"))
                            },
                            points: [s.e.Point({
                                name: "heapUsed <= 100 MB",
                                condition: e => {
                                    const t = s.a.extractHeapUsed(e);
                                    return !!(null != t && t <= s.a.bytes("100MB"))
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99131
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99163
                                    }
                                }), s.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99195
                                    }
                                })]
                            }), s.e.Point({
                                name: "100 MB < heapUsed <= 200 MB",
                                condition: e => {
                                    const t = s.a.extractHeapUsed(e);
                                    return !!(null != t && t <= s.a.bytes("200MB"))
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99132
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99164
                                    }
                                }), s.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99196
                                    }
                                })]
                            }), s.e.Point({
                                name: "heapUsed > 200 MB",
                                condition: e => {
                                    const t = s.a.extractHeapUsed(e);
                                    return !!(null != t && t > s.a.bytes("200MB"))
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99133
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99165
                                    }
                                }), s.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99197
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "usage after 8h",
                            condition: e => {
                                const t = s.a.extractPassedTime(e);
                                return !!(t && t <= s.a.time("8h"))
                            },
                            points: [s.e.Point({
                                name: "heapUsed <= 100 MB",
                                condition: e => {
                                    const t = s.a.extractHeapUsed(e);
                                    return !!(null != t && t <= s.a.bytes("100MB"))
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99134
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99166
                                    }
                                }), s.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99198
                                    }
                                })]
                            }), s.e.Point({
                                name: "100 MB < heapUsed <= 200 MB",
                                condition: e => {
                                    const t = s.a.extractHeapUsed(e);
                                    return !!(null != t && t <= s.a.bytes("200MB"))
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99135
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99167
                                    }
                                }), s.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99199
                                    }
                                })]
                            }), s.e.Point({
                                name: "heapUsed > 200 MB",
                                condition: e => {
                                    const t = s.a.extractHeapUsed(e);
                                    return !!(null != t && t > s.a.bytes("200MB"))
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99136
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99168
                                    }
                                }), s.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99200
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "usage after 24h",
                            condition: e => {
                                const t = s.a.extractPassedTime(e);
                                return !!(t && t >= s.a.time("24h"))
                            },
                            points: [s.e.Point({
                                name: "heapUsed <= 100 MB",
                                condition: e => {
                                    const t = s.a.extractHeapUsed(e);
                                    return !!(null != t && t <= s.a.bytes("100MB"))
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99137
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99169
                                    }
                                }), s.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99201
                                    }
                                })]
                            }), s.e.Point({
                                name: "100 MB < heapUsed <= 200 MB",
                                condition: e => {
                                    const t = s.a.extractHeapUsed(e);
                                    return !!(null != t && t <= s.a.bytes("200MB"))
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99138
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99170
                                    }
                                }), s.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99202
                                    }
                                })]
                            }), s.e.Point({
                                name: "heapUsed > 200 MB",
                                condition: e => {
                                    const t = s.a.extractHeapUsed(e);
                                    return !!(null != t && t > s.a.bytes("200MB"))
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99139
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99171
                                    }
                                }), s.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99203
                                    }
                                })]
                            })]
                        })]
                    })
                }),
                l = s.b.CPU({
                    name: r.a.usage_cpu,
                    categories: [a.a.usage],
                    timeline: d,
                    statement: Object(s.e)({
                        name: "percent CPU usage",
                        points: [s.e.Point({
                            name: "usage after 1m",
                            condition: e => {
                                const t = s.a.extractPassedTime(e);
                                return !!(t && t <= s.a.time("1m"))
                            },
                            points: [s.e.Point({
                                name: "<= 10%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 10)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99e3
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99036
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99072
                                    }
                                })]
                            }), s.e.Point({
                                name: "10% < percentCPUUsage <= 30%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 30)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99001
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99037
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99073
                                    }
                                })]
                            }), s.e.Point({
                                name: "30% < percentCPUUsage <= 70%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 70)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99002
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99038
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99074
                                    }
                                })]
                            }), s.e.Point({
                                name: "percentCPUUsage > 70%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t > 70)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99003
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99039
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99075
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "usage after 5m",
                            condition: e => {
                                const t = s.a.extractPassedTime(e);
                                return !!(t && t <= s.a.time("5m"))
                            },
                            points: [s.e.Point({
                                name: "<= 10%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 10)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99004
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99040
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99076
                                    }
                                })]
                            }), s.e.Point({
                                name: "10% < percentCPUUsage <= 30%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 30)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99005
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99041
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99077
                                    }
                                })]
                            }), s.e.Point({
                                name: "30% < percentCPUUsage <= 70%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 70)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99006
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99042
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99078
                                    }
                                })]
                            }), s.e.Point({
                                name: "percentCPUUsage > 70%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t > 70)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99007
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99043
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99079
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "usage after 10m",
                            condition: e => {
                                const t = s.a.extractPassedTime(e);
                                return !!(t && t <= s.a.time("10m"))
                            },
                            points: [s.e.Point({
                                name: "<= 10%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 10)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99008
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99044
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99080
                                    }
                                })]
                            }), s.e.Point({
                                name: "10% < percentCPUUsage <= 30%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 30)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99009
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99045
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99081
                                    }
                                })]
                            }), s.e.Point({
                                name: "30% < percentCPUUsage <= 70%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 70)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99010
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99046
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99082
                                    }
                                })]
                            }), s.e.Point({
                                name: "percentCPUUsage > 70%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t > 70)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99011
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99047
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99083
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "usage after 30m",
                            condition: e => {
                                const t = s.a.extractPassedTime(e);
                                return !!(t && t <= s.a.time("30m"))
                            },
                            points: [s.e.Point({
                                name: "<= 10%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 10)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99012
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99048
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99084
                                    }
                                })]
                            }), s.e.Point({
                                name: "10% < percentCPUUsage <= 30%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 30)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99013
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99049
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99085
                                    }
                                })]
                            }), s.e.Point({
                                name: "30% < percentCPUUsage <= 70%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 70)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99014
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99050
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99086
                                    }
                                })]
                            }), s.e.Point({
                                name: "percentCPUUsage > 70%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t > 70)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99015
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99051
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99087
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "usage after 1h",
                            condition: e => {
                                const t = s.a.extractPassedTime(e);
                                return !!(t && t <= s.a.time("1h"))
                            },
                            points: [s.e.Point({
                                name: "<= 10%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 10)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99016
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99052
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99088
                                    }
                                })]
                            }), s.e.Point({
                                name: "10% < percentCPUUsage <= 30%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 30)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99017
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99053
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99089
                                    }
                                })]
                            }), s.e.Point({
                                name: "30% < percentCPUUsage <= 70%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 70)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99018
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99054
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99090
                                    }
                                })]
                            }), s.e.Point({
                                name: "percentCPUUsage > 70%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t > 70)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99019
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99055
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99091
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "usage after 3h",
                            condition: e => {
                                const t = s.a.extractPassedTime(e);
                                return !!(t && t <= s.a.time("3h"))
                            },
                            points: [s.e.Point({
                                name: "<= 10%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 10)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99020
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99056
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99092
                                    }
                                })]
                            }), s.e.Point({
                                name: "10% < percentCPUUsage <= 30%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 30)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99021
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99057
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99093
                                    }
                                })]
                            }), s.e.Point({
                                name: "30% < percentCPUUsage <= 70%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 70)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99022
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99058
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99094
                                    }
                                })]
                            }), s.e.Point({
                                name: "percentCPUUsage > 70%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t > 70)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99023
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99059
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99095
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "usage after 5h",
                            condition: e => {
                                const t = s.a.extractPassedTime(e);
                                return !!(t && t <= s.a.time("5h"))
                            },
                            points: [s.e.Point({
                                name: "<= 10%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 10)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99024
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99060
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99096
                                    }
                                })]
                            }), s.e.Point({
                                name: "10% < percentCPUUsage <= 30%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 30)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99025
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99061
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99097
                                    }
                                })]
                            }), s.e.Point({
                                name: "30% < percentCPUUsage <= 70%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 70)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99026
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99062
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99098
                                    }
                                })]
                            }), s.e.Point({
                                name: "percentCPUUsage > 70%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t > 70)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99027
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99063
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99099
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "usage after 8h",
                            condition: e => {
                                const t = s.a.extractPassedTime(e);
                                return !!(t && t <= s.a.time("8h"))
                            },
                            points: [s.e.Point({
                                name: "<= 10%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 10)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99028
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99064
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99100
                                    }
                                })]
                            }), s.e.Point({
                                name: "10% < percentCPUUsage <= 30%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 30)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99029
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99065
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99204
                                    }
                                })]
                            }), s.e.Point({
                                name: "30% < percentCPUUsage <= 70%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 70)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99030
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99066
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99205
                                    }
                                })]
                            }), s.e.Point({
                                name: "percentCPUUsage > 70%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t > 70)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99031
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99067
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99206
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "usage after 24h",
                            condition: e => {
                                const t = s.a.extractPassedTime(e);
                                return !!(t && t >= s.a.time("24h"))
                            },
                            points: [s.e.Point({
                                name: "<= 10%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 10)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99032
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99068
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99104
                                    }
                                })]
                            }), s.e.Point({
                                name: "10% < percentCPUUsage <= 30%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 30)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99033
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99069
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99105
                                    }
                                })]
                            }), s.e.Point({
                                name: "30% < percentCPUUsage <= 70%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 70)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99034
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99070
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99106
                                    }
                                })]
                            }), s.e.Point({
                                name: "percentCPUUsage > 70%",
                                condition: e => {
                                    const t = s.a.extractCPUUsage(e);
                                    return !!(null != t && t > 70)
                                },
                                points: [s.e.Point({
                                    name: "main",
                                    condition: e => e.processName === c.a.Main,
                                    qos: {
                                        cmdId: 99035
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    qos: {
                                        cmdId: 99071
                                    }
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.SharedWorker,
                                    qos: {
                                        cmdId: 99107
                                    }
                                })]
                            })]
                        })]
                    })
                });
            var u = Object(s.c)({
                metrics: [m, l]
            });
            const p = e => "get" === e || "get-multi" === e || "get-all" === e || "get-all-key" === e || "count" === e ? "read" : "insert" === e || "insert-multi" === e || "update" === e || "update-multi" === e || "get-and-update" === e ? "write" : "delete" === e || "delete-multi" === e || "find-and-delete" === e || "clear" === e ? "delete" : void 0,
                h = Object(s.b)({
                    name: r.a.query_resolution_time,
                    features: [a.b.dal],
                    categories: [a.a.core],
                    showStackTrace: () => !1,
                    statement: s.e.Group(Object(s.e)({
                        name: "duration by query type",
                        points: [s.e.Point({
                            name: "queryType: READ",
                            condition: (e, t) => "read" === p(null == t ? void 0 : t.method),
                            points: [s.e.Point({
                                name: "<= 500ms",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("500ms")
                                },
                                qos: {
                                    cmdId: 99504
                                }
                            }), s.e.Point({
                                name: "500ms < duration <= 1s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("1s")
                                },
                                qos: {
                                    cmdId: 99505
                                }
                            }), s.e.Point({
                                name: "1s < duration <= 5s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("5s")
                                },
                                qos: {
                                    cmdId: 99506
                                }
                            }), s.e.Point({
                                name: "5s < duration <= 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99507
                                }
                            }), s.e.Point({
                                name: "duration > 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t > s.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99508
                                }
                            })]
                        }), s.e.Point({
                            name: "queryType: WRITE",
                            condition: (e, t) => "write" === p(null == t ? void 0 : t.method),
                            points: [s.e.Point({
                                name: "<= 500ms",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t < s.a.time("500ms")
                                },
                                qos: {
                                    cmdId: 99509
                                }
                            }), s.e.Point({
                                name: "500ms < duration <= 1s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("1s")
                                },
                                qos: {
                                    cmdId: 99510
                                }
                            }), s.e.Point({
                                name: "1s < duration <= 5s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("5s")
                                },
                                qos: {
                                    cmdId: 99511
                                }
                            }), s.e.Point({
                                name: "5s < duration <= 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99512
                                }
                            }), s.e.Point({
                                name: "duration > 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t > s.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99513
                                }
                            })]
                        }), s.e.Point({
                            name: "queryType: DELETE",
                            condition: (e, t) => "delete" === p(null == t ? void 0 : t.method),
                            points: [s.e.Point({
                                name: "<= 500ms",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("500ms")
                                },
                                qos: {
                                    cmdId: 99514
                                }
                            }), s.e.Point({
                                name: "500ms < duration <= 1s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("1s")
                                },
                                qos: {
                                    cmdId: 99515
                                }
                            }), s.e.Point({
                                name: "1s < duration <= 5s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("5s")
                                },
                                qos: {
                                    cmdId: 99516
                                }
                            }), s.e.Point({
                                name: "5s < duration <= 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99517
                                }
                            }), s.e.Point({
                                name: "duration > 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t > s.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99518
                                }
                            })]
                        })]
                    }), Object(s.e)({
                        name: "usage time: within first 10m",
                        checkingMode: "all",
                        points: [s.e.Point({
                            name: "usageTime <= 1m",
                            condition: e => {
                                let {
                                    usageTime: t
                                } = e;
                                return t <= s.a.time("1m")
                            },
                            points: [s.e.Point({
                                name: "<= 500ms",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("500ms")
                                },
                                qos: {
                                    cmdId: 99519
                                }
                            }), s.e.Point({
                                name: "500ms < duration <= 1s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("1s")
                                },
                                qos: {
                                    cmdId: 99520
                                }
                            }), s.e.Point({
                                name: "1s < duration <= 5s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("5s")
                                },
                                qos: {
                                    cmdId: 99521
                                }
                            }), s.e.Point({
                                name: "5s < duration <= 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99522
                                }
                            }), s.e.Point({
                                name: "duration > 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t > s.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99523
                                }
                            })]
                        }), s.e.Point({
                            name: "usageTime <= 5m",
                            condition: e => {
                                let {
                                    usageTime: t
                                } = e;
                                return t <= s.a.time("5m")
                            },
                            points: [s.e.Point({
                                name: "<= 500ms",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("500ms")
                                },
                                qos: {
                                    cmdId: 99524
                                }
                            }), s.e.Point({
                                name: "500ms < duration <= 1s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("1s")
                                },
                                qos: {
                                    cmdId: 99525
                                }
                            }), s.e.Point({
                                name: "1s < duration <= 5s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("5s")
                                },
                                qos: {
                                    cmdId: 99526
                                }
                            }), s.e.Point({
                                name: "5s < duration <= 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99527
                                }
                            }), s.e.Point({
                                name: "duration > 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t > s.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99528
                                }
                            })]
                        }), s.e.Point({
                            name: "usageTime <= 10m",
                            condition: e => {
                                let {
                                    usageTime: t
                                } = e;
                                return t <= s.a.time("10m")
                            },
                            points: [s.e.Point({
                                name: "<= 500ms",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("500ms")
                                },
                                qos: {
                                    cmdId: 99529
                                }
                            }), s.e.Point({
                                name: "500ms < duration <= 1s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("1s")
                                },
                                qos: {
                                    cmdId: 99530
                                }
                            }), s.e.Point({
                                name: "1s < duration <= 5s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("5s")
                                },
                                qos: {
                                    cmdId: 99531
                                }
                            }), s.e.Point({
                                name: "5s < duration <= 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99532
                                }
                            }), s.e.Point({
                                name: "duration > 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t > s.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99533
                                }
                            })]
                        })]
                    }), Object(s.e)({
                        name: "usage time: 10m - 5h",
                        checkingMode: "all",
                        points: [s.e.Point({
                            name: "10m < usageTime <= 1h",
                            condition: e => {
                                let {
                                    usageTime: t
                                } = e;
                                return t > s.a.time("10m") && t <= s.a.time("1h")
                            },
                            points: [s.e.Point({
                                name: "<= 500ms",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("500ms")
                                },
                                qos: {
                                    cmdId: 99534
                                }
                            }), s.e.Point({
                                name: "500ms < duration <= 1s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("1s")
                                },
                                qos: {
                                    cmdId: 99535
                                }
                            }), s.e.Point({
                                name: "1s < duration <= 5s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("5s")
                                },
                                qos: {
                                    cmdId: 99536
                                }
                            }), s.e.Point({
                                name: "5s < duration <= 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99537
                                }
                            }), s.e.Point({
                                name: "duration > 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t > s.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99538
                                }
                            })]
                        }), s.e.Point({
                            name: "1h < usageTime <= 5h",
                            condition: e => {
                                let {
                                    usageTime: t
                                } = e;
                                return t > s.a.time("1h") && t <= s.a.time("5h")
                            },
                            points: [s.e.Point({
                                name: "<= 500ms",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("500ms")
                                },
                                qos: {
                                    cmdId: 99539
                                }
                            }), s.e.Point({
                                name: "500ms < duration <= 1s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("1s")
                                },
                                qos: {
                                    cmdId: 99540
                                }
                            }), s.e.Point({
                                name: "1s < duration <= 5s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("5s")
                                },
                                qos: {
                                    cmdId: 99541
                                }
                            }), s.e.Point({
                                name: "5s < duration <= 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99542
                                }
                            }), s.e.Point({
                                name: "duration > 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t > s.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99543
                                }
                            })]
                        })]
                    }), Object(s.e)({
                        name: "usage time: long session",
                        points: [s.e.Point({
                            name: "usageTime > 5h",
                            condition: e => {
                                let {
                                    usageTime: t
                                } = e;
                                return t > s.a.time("5h")
                            },
                            points: [s.e.Point({
                                name: "<= 500ms",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("500ms")
                                },
                                qos: {
                                    cmdId: 99544
                                }
                            }), s.e.Point({
                                name: "500ms < duration <= 1s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("1s")
                                },
                                qos: {
                                    cmdId: 99545
                                }
                            }), s.e.Point({
                                name: "1s < duration <= 5s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("5s")
                                },
                                qos: {
                                    cmdId: 99546
                                }
                            }), s.e.Point({
                                name: "5s < duration <= 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= s.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99547
                                }
                            }), s.e.Point({
                                name: "duration > 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t > s.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99548
                                }
                            })]
                        })]
                    }), Object(s.e)({
                        name: "duration > 10s",
                        points: [s.e.Point({
                            name: "duration > 10s",
                            condition: e => {
                                let {
                                    duration: t
                                } = e;
                                return t > s.a.time("10s")
                            },
                            qos: {
                                cmdId: 99549
                            }
                        })]
                    }))
                }),
                _ = Object(s.b)({
                    name: r.a.db_ready,
                    features: [a.b.dal],
                    categories: [a.a.core],
                    statement: Object(s.e)({
                        name: "DB open time",
                        points: [s.e.Point({
                            name: "<= 1s",
                            condition: e => {
                                let {
                                    duration: t
                                } = e;
                                return t <= s.a.time("1s")
                            },
                            qos: {
                                cmdId: 99500
                            }
                        }), s.e.Point({
                            name: "1s-5s",
                            condition: e => {
                                let {
                                    duration: t
                                } = e;
                                return t <= s.a.time("5s")
                            },
                            qos: {
                                cmdId: 99501
                            }
                        }), s.e.Point({
                            name: "5s-10s",
                            condition: e => {
                                let {
                                    duration: t
                                } = e;
                                return t <= s.a.time("10s")
                            },
                            qos: {
                                cmdId: 99502
                            }
                        }), s.e.Point({
                            name: "> 10s",
                            condition: e => {
                                let {
                                    duration: t
                                } = e;
                                return t > s.a.time("10s")
                            },
                            qos: {
                                cmdId: 99503
                            }
                        })]
                    })
                });
            var g = Object(s.c)({
                metrics: [h, _]
            });
            const f = Object(s.b)({
                    name: r.a.authenticate,
                    features: [a.b.start_up],
                    categories: [a.a.task_latency],
                    statement: Object(s.e)({
                        name: "authenticate",
                        points: [s.e.Point({
                            name: "<= 1s",
                            condition: e => {
                                let {
                                    duration: t
                                } = e;
                                return t <= s.a.time("1s")
                            },
                            qos: {
                                cmdId: 99605
                            }
                        }), s.e.Point({
                            name: "<= 2s",
                            condition: e => {
                                let {
                                    duration: t
                                } = e;
                                return t <= s.a.time("2s")
                            },
                            qos: {
                                cmdId: 99606
                            }
                        }), s.e.Point({
                            name: "<= 5s",
                            condition: e => {
                                let {
                                    duration: t
                                } = e;
                                return t <= s.a.time("5s")
                            },
                            qos: {
                                cmdId: 99607
                            }
                        }), s.e.Point({
                            name: "> 5s",
                            condition: e => {
                                let {
                                    duration: t
                                } = e;
                                return t > s.a.time("5s")
                            },
                            qos: {
                                cmdId: 99608
                            }
                        })]
                    })
                }),
                P = Object(s.b)({
                    name: r.a.start_up_time,
                    features: [a.b.start_up],
                    categories: [a.a.ux_latency],
                    fromProcess: [c.a.Main, c.a.Web],
                    startFromEpoch: !0,
                    disabled: !1,
                    statement: Object(s.e)({
                        name: "startup duration",
                        points: [s.e.Point({
                            name: "<= 5s",
                            condition: e => {
                                let {
                                    duration: t
                                } = e;
                                return t <= s.a.time("5s")
                            },
                            qos: {
                                cmdId: 99600
                            }
                        }), s.e.Point({
                            name: "5s-10s",
                            condition: e => {
                                let {
                                    duration: t
                                } = e;
                                return t <= s.a.time("10s")
                            },
                            qos: {
                                cmdId: 99601
                            }
                        }), s.e.Point({
                            name: "10s-30s",
                            condition: e => {
                                let {
                                    duration: t
                                } = e;
                                return t <= s.a.time("30s")
                            },
                            qos: {
                                cmdId: 99602
                            }
                        }), s.e.Point({
                            name: "30s-1m",
                            condition: e => {
                                let {
                                    duration: t
                                } = e;
                                return t <= s.a.time("1m")
                            },
                            qos: {
                                cmdId: 99603
                            }
                        }), s.e.Point({
                            name: "> 1m",
                            condition: e => {
                                let {
                                    duration: t
                                } = e;
                                return t <= s.a.time("1m")
                            },
                            qos: {
                                cmdId: 99604
                            }
                        })]
                    })
                });
            var I = Object(s.c)({
                    metrics: [f, P]
                }),
                w = n("MNz0");
            Object(s.b)({
                name: r.a.conv_load_1st_msg,
                features: [a.b.chat],
                categories: [a.a.ux_latency]
            });
            const M = Object(s.b)({
                name: r.a.open_conversation,
                features: [a.b.chat],
                categories: [a.a.ux_latency],
                mode: w.a.ACCEPT_LAST,
                statement: Object(s.e)({
                    name: "open conversation time",
                    points: [s.e.Point({
                        name: "duration <= 1s",
                        condition: e => {
                            let {
                                duration: t
                            } = e;
                            return t <= s.a.time("1s")
                        },
                        qos: {
                            cmdId: 99625
                        }
                    }), s.e.Point({
                        name: "1s < duration <= 3s",
                        condition: e => {
                            let {
                                duration: t
                            } = e;
                            return t <= s.a.time("3s")
                        },
                        qos: {
                            cmdId: 99626
                        }
                    }), s.e.Point({
                        name: "3s < duration <= 10s",
                        condition: e => {
                            let {
                                duration: t
                            } = e;
                            return t <= s.a.time("10s")
                        },
                        qos: {
                            cmdId: 99627
                        }
                    }), s.e.Point({
                        name: "duration > 10s",
                        condition: e => {
                            let {
                                duration: t
                            } = e;
                            return t > s.a.time("10s")
                        },
                        qos: {
                            cmdId: 99628
                        }
                    })]
                })
            });
            var y = Object(s.c)({
                metrics: [M]
            });
            const v = function() {
                    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    const [o] = t || [];
                    return {
                        avgFps: null == o ? void 0 : o.avgFps,
                        usageTime: null == o ? void 0 : o.usageTime
                    }
                },
                b = function() {
                    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    const [o] = t || [];
                    return {
                        lowestDrop: null == o ? void 0 : o.lowestDrop,
                        maxFps: null == o ? void 0 : o.maxFps
                    }
                },
                D = e => {
                    var t, n;
                    return "arm" === (null == e || null === (t = e.systemInfo) || void 0 === t ? void 0 : t.arch) || "arm64" === (null == e || null === (n = e.systemInfo) || void 0 === n ? void 0 : n.arch)
                },
                q = Object(s.b)({
                    name: r.a.fps,
                    categories: [a.a.ux_latency],
                    statement: Object(s.e)({
                        name: "fps",
                        points: [s.e.Point({
                            name: "usageTime <= 2m",
                            condition: function(e) {
                                for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                const {
                                    usageTime: i
                                } = v(...n);
                                return !!(i && i <= s.a.time("2m"))
                            },
                            points: [s.e.Point({
                                name: "fps <= 12",
                                condition: function(e) {
                                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                    const {
                                        avgFps: i
                                    } = v(...n);
                                    return !!(i && i <= 12)
                                },
                                points: [s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    points: [s.e.Point({
                                        name: "window & mac intel",
                                        condition: e => !D(e),
                                        qos: {
                                            cmdId: 99609
                                        }
                                    }), s.e.Point({
                                        name: "mac m1",
                                        condition: e => D(e),
                                        qos: {
                                            cmdId: 99629
                                        }
                                    })]
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Web,
                                    points: [s.e.Point({
                                        name: "window & mac intel",
                                        condition: e => !D(e),
                                        qos: {
                                            cmdId: 99617
                                        }
                                    }), s.e.Point({
                                        name: "mac m1",
                                        condition: e => D(e),
                                        qos: {
                                            cmdId: 99637
                                        }
                                    })]
                                })]
                            }), s.e.Point({
                                name: "12 < fps <= 23",
                                condition: function(e) {
                                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                    const {
                                        avgFps: i
                                    } = v(...n);
                                    return !!(i && i <= 23)
                                },
                                points: [s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    points: [s.e.Point({
                                        name: "window & mac intel",
                                        condition: e => !D(e),
                                        qos: {
                                            cmdId: 99610
                                        }
                                    }), s.e.Point({
                                        name: "mac m1",
                                        condition: e => D(e),
                                        qos: {
                                            cmdId: 99630
                                        }
                                    })]
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Web,
                                    points: [s.e.Point({
                                        name: "window & mac intel",
                                        condition: e => !D(e),
                                        qos: {
                                            cmdId: 99618
                                        }
                                    }), s.e.Point({
                                        name: "mac m1",
                                        condition: e => D(e),
                                        qos: {
                                            cmdId: 99638
                                        }
                                    })]
                                })]
                            }), s.e.Point({
                                name: "[23,24] < fps <= 29",
                                condition: function(e) {
                                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                    const {
                                        avgFps: i
                                    } = v(...n);
                                    return !!(i && i <= 29)
                                },
                                points: [s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    points: [s.e.Point({
                                        name: "window & mac intel",
                                        condition: e => !D(e),
                                        qos: {
                                            cmdId: 99611
                                        }
                                    }), s.e.Point({
                                        name: "mac m1",
                                        condition: e => D(e),
                                        qos: {
                                            cmdId: 99631
                                        }
                                    })]
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Web,
                                    points: [s.e.Point({
                                        name: "window & mac intel",
                                        condition: e => !D(e),
                                        qos: {
                                            cmdId: 99619
                                        }
                                    }), s.e.Point({
                                        name: "mac m1",
                                        condition: e => D(e),
                                        qos: {
                                            cmdId: 99639
                                        }
                                    })]
                                })]
                            }), s.e.Point({
                                name: "[29,30] < fps <= 60",
                                condition: function(e) {
                                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                    const {
                                        avgFps: i
                                    } = v(...n);
                                    return !!(i && i <= 60)
                                },
                                points: [s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    points: [s.e.Point({
                                        name: "window & mac intel",
                                        condition: e => !D(e),
                                        qos: {
                                            cmdId: 99612
                                        }
                                    }), s.e.Point({
                                        name: "mac m1",
                                        condition: e => D(e),
                                        qos: {
                                            cmdId: 99632
                                        }
                                    })]
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Web,
                                    points: [s.e.Point({
                                        name: "window & mac intel",
                                        condition: e => !D(e),
                                        qos: {
                                            cmdId: 99620
                                        }
                                    }), s.e.Point({
                                        name: "mac m1",
                                        condition: e => D(e),
                                        qos: {
                                            cmdId: 99640
                                        }
                                    })]
                                })]
                            })]
                        }), s.e.Point({
                            name: "usageTime > 2m",
                            condition: function(e) {
                                for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                const {
                                    usageTime: i
                                } = v(...n);
                                return !!(i && i > s.a.time("2m"))
                            },
                            points: [s.e.Point({
                                name: "fps <= 12",
                                condition: function(e) {
                                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                    const {
                                        avgFps: i
                                    } = v(...n);
                                    return !!(i && i <= 12)
                                },
                                points: [s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    points: [s.e.Point({
                                        name: "window & mac intel",
                                        condition: e => !D(e),
                                        qos: {
                                            cmdId: 99613
                                        }
                                    }), s.e.Point({
                                        name: "mac m1",
                                        condition: e => D(e),
                                        qos: {
                                            cmdId: 99633
                                        }
                                    })]
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Web,
                                    points: [s.e.Point({
                                        name: "window & mac intel",
                                        condition: e => !D(e),
                                        qos: {
                                            cmdId: 99621
                                        }
                                    }), s.e.Point({
                                        name: "mac m1",
                                        condition: e => D(e),
                                        qos: {
                                            cmdId: 99641
                                        }
                                    })]
                                })]
                            }), s.e.Point({
                                name: "12 < fps <= 23",
                                condition: function(e) {
                                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                    const {
                                        avgFps: i
                                    } = v(...n);
                                    return !!(i && i <= 23)
                                },
                                points: [s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    points: [s.e.Point({
                                        name: "window & mac intel",
                                        condition: e => !D(e),
                                        qos: {
                                            cmdId: 99614
                                        }
                                    }), s.e.Point({
                                        name: "mac m1",
                                        condition: e => D(e),
                                        qos: {
                                            cmdId: 99634
                                        }
                                    })]
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Web,
                                    points: [s.e.Point({
                                        name: "window & mac intel",
                                        condition: e => !D(e),
                                        qos: {
                                            cmdId: 99622
                                        }
                                    }), s.e.Point({
                                        name: "mac m1",
                                        condition: e => D(e),
                                        qos: {
                                            cmdId: 99642
                                        }
                                    })]
                                })]
                            }), s.e.Point({
                                name: "[23,24] < fps <= 29",
                                condition: function(e) {
                                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                    const {
                                        avgFps: i
                                    } = v(...n);
                                    return !!(i && i <= 29)
                                },
                                points: [s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    points: [s.e.Point({
                                        name: "window & mac intel",
                                        condition: e => !D(e),
                                        qos: {
                                            cmdId: 99615
                                        }
                                    }), s.e.Point({
                                        name: "mac m1",
                                        condition: e => D(e),
                                        qos: {
                                            cmdId: 99635
                                        }
                                    })]
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Web,
                                    points: [s.e.Point({
                                        name: "window & mac intel",
                                        condition: e => !D(e),
                                        qos: {
                                            cmdId: 99623
                                        }
                                    }), s.e.Point({
                                        name: "mac m1",
                                        condition: e => D(e),
                                        qos: {
                                            cmdId: 99643
                                        }
                                    })]
                                })]
                            }), s.e.Point({
                                name: "[29,30] < fps <= 60",
                                condition: function(e) {
                                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                    const {
                                        avgFps: i
                                    } = v(...n);
                                    return !!(i && i <= 60)
                                },
                                points: [s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Render,
                                    points: [s.e.Point({
                                        name: "window & mac intel",
                                        condition: e => !D(e),
                                        qos: {
                                            cmdId: 99616
                                        }
                                    }), s.e.Point({
                                        name: "mac m1",
                                        condition: e => D(e),
                                        qos: {
                                            cmdId: 99636
                                        }
                                    })]
                                }), s.e.Point({
                                    name: "render",
                                    condition: e => e.processName === c.a.Web,
                                    points: [s.e.Point({
                                        name: "window & mac intel",
                                        condition: e => !D(e),
                                        qos: {
                                            cmdId: 99624
                                        }
                                    }), s.e.Point({
                                        name: "mac m1",
                                        condition: e => D(e),
                                        qos: {
                                            cmdId: 99644
                                        }
                                    })]
                                })]
                            })]
                        })]
                    })
                }),
                S = Object(s.b)({
                    name: r.a.fps_lowest_drop,
                    categories: [a.a.ux_latency],
                    statement: s.e.Group(Object(s.e)({
                        name: "lowest drop",
                        points: [s.e.Point({
                            name: "usageTime <= 2m",
                            condition: e => {
                                let {
                                    usageTime: t
                                } = e;
                                return t <= s.a.time("1m")
                            },
                            points: [s.e.Point({
                                name: "maxFps = 60",
                                condition: function(e) {
                                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                    const {
                                        maxFps: i
                                    } = b(...n);
                                    return !!(null != i && i <= 60)
                                },
                                points: [s.e.Point({
                                    name: "fps <= 10",
                                    condition: function(e) {
                                        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                        const {
                                            lowestDrop: i
                                        } = b(...n);
                                        return !!(null != i && i <= 10)
                                    },
                                    points: [s.e.Point({
                                        name: "window & mac intel",
                                        condition: e => !D(e),
                                        qos: {
                                            cmdId: 99645
                                        }
                                    }), s.e.Point({
                                        name: "mac m1",
                                        condition: e => D(e),
                                        qos: {
                                            cmdId: 99653
                                        }
                                    })]
                                }), s.e.Point({
                                    name: "10 < fps <= 25",
                                    condition: function(e) {
                                        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                        const {
                                            lowestDrop: i
                                        } = b(...n);
                                        return !!(null != i && i > 10 && i <= 25)
                                    },
                                    points: [s.e.Point({
                                        name: "window & mac intel",
                                        condition: e => !D(e),
                                        qos: {
                                            cmdId: 99646
                                        }
                                    }), s.e.Point({
                                        name: "mac m1",
                                        condition: e => D(e),
                                        qos: {
                                            cmdId: 99654
                                        }
                                    })]
                                }), s.e.Point({
                                    name: "25 < fps <= 39",
                                    condition: function(e) {
                                        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                        const {
                                            lowestDrop: i
                                        } = b(...n);
                                        return !!(null != i && i > 25 && i <= 39)
                                    },
                                    points: [s.e.Point({
                                        name: "window & mac intel",
                                        condition: e => !D(e),
                                        qos: {
                                            cmdId: 99647
                                        }
                                    }), s.e.Point({
                                        name: "mac m1",
                                        condition: e => D(e),
                                        qos: {
                                            cmdId: 99655
                                        }
                                    })]
                                }), s.e.Point({
                                    name: "39 < fps <= 49",
                                    condition: function(e) {
                                        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                        const {
                                            lowestDrop: i
                                        } = b(...n);
                                        return !!(null != i && i > 39 && i <= 49)
                                    },
                                    points: [s.e.Point({
                                        name: "window & mac intel",
                                        condition: e => !D(e),
                                        qos: {
                                            cmdId: 99648
                                        }
                                    }), s.e.Point({
                                        name: "mac m1",
                                        condition: e => D(e),
                                        qos: {
                                            cmdId: 99656
                                        }
                                    })]
                                })]
                            }), s.e.Point({
                                name: "maxFps = 120",
                                condition: function(e) {
                                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                    const {
                                        maxFps: i
                                    } = b(...n);
                                    return !!(null != i && i > 60 && i <= 120)
                                },
                                points: [s.e.Point({
                                    name: "fps <= 20",
                                    condition: function(e) {
                                        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                        const {
                                            lowestDrop: i
                                        } = b(...n);
                                        return !!(null != i && i <= 20)
                                    },
                                    points: [s.e.Point({
                                        name: "window & mac intel",
                                        condition: e => !D(e),
                                        qos: {
                                            cmdId: 99661
                                        }
                                    }), s.e.Point({
                                        name: "mac m1",
                                        condition: e => D(e),
                                        qos: {
                                            cmdId: 99669
                                        }
                                    })]
                                }), s.e.Point({
                                    name: "20 < fps <= 50",
                                    condition: function(e) {
                                        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                        const {
                                            lowestDrop: i
                                        } = b(...n);
                                        return !!(null != i && i > 20 && i <= 50)
                                    },
                                    points: [s.e.Point({
                                        name: "window & mac intel",
                                        condition: e => !D(e),
                                        qos: {
                                            cmdId: 99662
                                        }
                                    }), s.e.Point({
                                        name: "mac m1",
                                        condition: e => D(e),
                                        qos: {
                                            cmdId: 99670
                                        }
                                    })]
                                }), s.e.Point({
                                    name: "50 < fps <= 79",
                                    condition: function(e) {
                                        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                        const {
                                            lowestDrop: i
                                        } = b(...n);
                                        return !!(null != i && i > 50 && i <= 79)
                                    },
                                    points: [s.e.Point({
                                        name: "window & mac intel",
                                        condition: e => !D(e),
                                        qos: {
                                            cmdId: 99663
                                        }
                                    }), s.e.Point({
                                        name: "mac m1",
                                        condition: e => D(e),
                                        qos: {
                                            cmdId: 99671
                                        }
                                    })]
                                }), s.e.Point({
                                    name: "79 < fps <= 99",
                                    condition: function(e) {
                                        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                        const {
                                            lowestDrop: i
                                        } = b(...n);
                                        return !!(null != i && i > 79 && i <= 99)
                                    },
                                    points: [s.e.Point({
                                        name: "window & mac intel",
                                        condition: e => !D(e),
                                        qos: {
                                            cmdId: 99664
                                        }
                                    }), s.e.Point({
                                        name: "mac m1",
                                        condition: e => D(e),
                                        qos: {
                                            cmdId: 99672
                                        }
                                    })]
                                })]
                            })]
                        })]
                    }), Object(s.e)({
                        name: "lowest drop - all time",
                        points: [s.e.Point({
                            name: "maxFps = 60",
                            condition: function(e) {
                                for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                const {
                                    maxFps: i
                                } = b(...n);
                                return !!(null != i && i <= 60)
                            },
                            points: [s.e.Point({
                                name: "fps <= 10",
                                condition: function(e) {
                                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                    const {
                                        lowestDrop: i
                                    } = b(...n);
                                    return !!(null != i && i <= 10)
                                },
                                points: [s.e.Point({
                                    name: "window & mac intel",
                                    condition: e => !D(e),
                                    qos: {
                                        cmdId: 99649
                                    }
                                }), s.e.Point({
                                    name: "mac m1",
                                    condition: e => D(e),
                                    qos: {
                                        cmdId: 99657
                                    }
                                })]
                            }), s.e.Point({
                                name: "10 < fps <= 25",
                                condition: function(e) {
                                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                    const {
                                        lowestDrop: i
                                    } = b(...n);
                                    return !!(null != i && i > 10 && i <= 25)
                                },
                                points: [s.e.Point({
                                    name: "window & mac intel",
                                    condition: e => !D(e),
                                    qos: {
                                        cmdId: 99650
                                    }
                                }), s.e.Point({
                                    name: "mac m1",
                                    condition: e => D(e),
                                    qos: {
                                        cmdId: 99658
                                    }
                                })]
                            }), s.e.Point({
                                name: "25 < fps <= 39",
                                condition: function(e) {
                                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                    const {
                                        lowestDrop: i
                                    } = b(...n);
                                    return !!(null != i && i > 25 && i <= 39)
                                },
                                points: [s.e.Point({
                                    name: "window & mac intel",
                                    condition: e => !D(e),
                                    qos: {
                                        cmdId: 99651
                                    }
                                }), s.e.Point({
                                    name: "mac m1",
                                    condition: e => D(e),
                                    qos: {
                                        cmdId: 99659
                                    }
                                })]
                            }), s.e.Point({
                                name: "39 < fps <= 49",
                                condition: function(e) {
                                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                    const {
                                        lowestDrop: i
                                    } = b(...n);
                                    return !!(null != i && i > 39 && i <= 49)
                                },
                                points: [s.e.Point({
                                    name: "window & mac intel",
                                    condition: e => !D(e),
                                    qos: {
                                        cmdId: 99652
                                    }
                                }), s.e.Point({
                                    name: "mac m1",
                                    condition: e => D(e),
                                    qos: {
                                        cmdId: 99660
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "maxFps = 120",
                            condition: function(e) {
                                for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                const {
                                    maxFps: i
                                } = b(...n);
                                return !!(null != i && i > 60 && i <= 120)
                            },
                            points: [s.e.Point({
                                name: "fps <= 20",
                                condition: function(e) {
                                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                    const {
                                        lowestDrop: i
                                    } = b(...n);
                                    return !!(null != i && i <= 20)
                                },
                                points: [s.e.Point({
                                    name: "window & mac intel",
                                    condition: e => !D(e),
                                    qos: {
                                        cmdId: 99665
                                    }
                                }), s.e.Point({
                                    name: "mac m1",
                                    condition: e => D(e),
                                    qos: {
                                        cmdId: 99673
                                    }
                                })]
                            }), s.e.Point({
                                name: "20 < fps <= 50",
                                condition: function(e) {
                                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                    const {
                                        lowestDrop: i
                                    } = b(...n);
                                    return !!(null != i && i > 20 && i <= 50)
                                },
                                points: [s.e.Point({
                                    name: "window & mac intel",
                                    condition: e => !D(e),
                                    qos: {
                                        cmdId: 99666
                                    }
                                }), s.e.Point({
                                    name: "mac m1",
                                    condition: e => D(e),
                                    qos: {
                                        cmdId: 99674
                                    }
                                })]
                            }), s.e.Point({
                                name: "50 < fps <= 79",
                                condition: function(e) {
                                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                    const {
                                        lowestDrop: i
                                    } = b(...n);
                                    return !!(null != i && i > 50 && i <= 79)
                                },
                                points: [s.e.Point({
                                    name: "window & mac intel",
                                    condition: e => !D(e),
                                    qos: {
                                        cmdId: 99667
                                    }
                                }), s.e.Point({
                                    name: "mac m1",
                                    condition: e => D(e),
                                    qos: {
                                        cmdId: 99675
                                    }
                                })]
                            }), s.e.Point({
                                name: "79 < fps <= 99",
                                condition: function(e) {
                                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                    const {
                                        lowestDrop: i
                                    } = b(...n);
                                    return !!(null != i && i > 79 && i <= 99)
                                },
                                points: [s.e.Point({
                                    name: "window & mac intel",
                                    condition: e => !D(e),
                                    qos: {
                                        cmdId: 99668
                                    }
                                }), s.e.Point({
                                    name: "mac m1",
                                    condition: e => D(e),
                                    qos: {
                                        cmdId: 99676
                                    }
                                })]
                            })]
                        })]
                    }))
                });
            var A = Object(s.c)({
                    metrics: [q, S]
                }),
                T = n("AoYG");
            const R = e => {
                    var t;
                    return null == e || null === (t = e.data) || void 0 === t ? void 0 : t.cpuTotal
                },
                x = e => {
                    var t;
                    return null == e || null === (t = e.data) || void 0 === t ? void 0 : t.memoryTotal
                },
                N = Object(s.e)({
                    name: "CPU used",
                    points: [s.e.Point({
                        name: "usage after 1m",
                        condition: e => {
                            const t = s.a.extractPassedTime(e);
                            return !!(t && t <= s.a.time("1m"))
                        },
                        points: [s.e.Point({
                            name: "<= 20%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t <= 20)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99351
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99387
                                }
                            })]
                        }), s.e.Point({
                            name: "20% < cpuTotal <= 40%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t <= 40)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99352
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99388
                                }
                            })]
                        }), s.e.Point({
                            name: "40% < cpuTotal <= 70%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t <= 70)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99353
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99389
                                }
                            })]
                        }), s.e.Point({
                            name: "cpuTotal > 70%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t > 70)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99354
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99390
                                }
                            })]
                        })]
                    }), s.e.Point({
                        name: "usage after 5m",
                        condition: e => {
                            const t = s.a.extractPassedTime(e);
                            return !!(t && t <= s.a.time("5m"))
                        },
                        points: [s.e.Point({
                            name: "<= 20%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t <= 20)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99355
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99391
                                }
                            })]
                        }), s.e.Point({
                            name: "20% < cpuTotal <= 40%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t <= 40)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99356
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99392
                                }
                            })]
                        }), s.e.Point({
                            name: "40% < cpuTotal <= 70%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t <= 70)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99357
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99393
                                }
                            })]
                        }), s.e.Point({
                            name: "cpuTotal > 70%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t > 70)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99358
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99394
                                }
                            })]
                        })]
                    }), s.e.Point({
                        name: "usage after 10m",
                        condition: e => {
                            const t = s.a.extractPassedTime(e);
                            return !!(t && t <= s.a.time("10m"))
                        },
                        points: [s.e.Point({
                            name: "<= 20%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t <= 20)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99359
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99395
                                }
                            })]
                        }), s.e.Point({
                            name: "20% < cpuTotal <= 40%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t <= 40)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99360
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99396
                                }
                            })]
                        }), s.e.Point({
                            name: "40% < cpuTotal <= 70%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t <= 70)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99361
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99397
                                }
                            })]
                        }), s.e.Point({
                            name: "cpuTotal > 70%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t > 70)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99362
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99398
                                }
                            })]
                        })]
                    }), s.e.Point({
                        name: "usage after 30m",
                        condition: e => {
                            const t = s.a.extractPassedTime(e);
                            return !!(t && t <= s.a.time("30m"))
                        },
                        points: [s.e.Point({
                            name: "<= 20%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t <= 20)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99363
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99399
                                }
                            })]
                        }), s.e.Point({
                            name: "20% < cpuTotal <= 40%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t <= 40)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99364
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99400
                                }
                            })]
                        }), s.e.Point({
                            name: "40% < cpuTotal <= 70%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t <= 70)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99365
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99401
                                }
                            })]
                        }), s.e.Point({
                            name: "cpuTotal > 70%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t > 70)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99366
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99402
                                }
                            })]
                        })]
                    }), s.e.Point({
                        name: "usage after 1h",
                        condition: e => {
                            const t = s.a.extractPassedTime(e);
                            return !!(t && t <= s.a.time("1h"))
                        },
                        points: [s.e.Point({
                            name: "<= 20%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t <= 20)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99367
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99403
                                }
                            })]
                        }), s.e.Point({
                            name: "20% < cpuTotal <= 40%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t <= 40)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99368
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99404
                                }
                            })]
                        }), s.e.Point({
                            name: "40% < cpuTotal <= 70%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t <= 70)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99369
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99405
                                }
                            })]
                        }), s.e.Point({
                            name: "cpuTotal > 70%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t > 70)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99370
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99406
                                }
                            })]
                        })]
                    }), s.e.Point({
                        name: "usage after 3h",
                        condition: e => {
                            const t = s.a.extractPassedTime(e);
                            return !!(t && t <= s.a.time("3h"))
                        },
                        points: [s.e.Point({
                            name: "<= 20%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t <= 20)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99371
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99407
                                }
                            })]
                        }), s.e.Point({
                            name: "20% < cpuTotal <= 40%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t <= 40)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99372
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99408
                                }
                            })]
                        }), s.e.Point({
                            name: "40% < cpuTotal <= 70%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t <= 70)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99373
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99409
                                }
                            })]
                        }), s.e.Point({
                            name: "cpuTotal > 70%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t > 70)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99374
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99410
                                }
                            })]
                        })]
                    }), s.e.Point({
                        name: "usage after 5h",
                        condition: e => {
                            const t = s.a.extractPassedTime(e);
                            return !!(t && t <= s.a.time("5h"))
                        },
                        points: [s.e.Point({
                            name: "<= 20%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t <= 20)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99375
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99411
                                }
                            })]
                        }), s.e.Point({
                            name: "20% < cpuTotal <= 40%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t <= 40)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99376
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99412
                                }
                            })]
                        }), s.e.Point({
                            name: "40% < cpuTotal <= 70%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t <= 70)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99377
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99413
                                }
                            })]
                        }), s.e.Point({
                            name: "cpuTotal > 70%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t > 70)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99378
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99414
                                }
                            })]
                        })]
                    }), s.e.Point({
                        name: "usage after 8h",
                        condition: e => {
                            const t = s.a.extractPassedTime(e);
                            return !!(t && t <= s.a.time("8h"))
                        },
                        points: [s.e.Point({
                            name: "<= 20%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t <= 20)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99379
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99415
                                }
                            })]
                        }), s.e.Point({
                            name: "20% < cpuTotal <= 40%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t <= 40)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99380
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99416
                                }
                            })]
                        }), s.e.Point({
                            name: "40% < cpuTotal <= 70%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t <= 70)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99381
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99417
                                }
                            })]
                        }), s.e.Point({
                            name: "cpuTotal > 70%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t > 70)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99382
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99418
                                }
                            })]
                        })]
                    }), s.e.Point({
                        name: "usage after 24h",
                        condition: e => {
                            const t = s.a.extractPassedTime(e);
                            return !!(t && t <= s.a.time("24h"))
                        },
                        points: [s.e.Point({
                            name: "<= 20%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t <= 20)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99383
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99419
                                }
                            })]
                        }), s.e.Point({
                            name: "20% < cpuTotal <= 40%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t <= 40)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99384
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99420
                                }
                            })]
                        }), s.e.Point({
                            name: "40% < cpuTotal <= 70%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t <= 70)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99385
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99421
                                }
                            })]
                        }), s.e.Point({
                            name: "cpuTotal > 70%",
                            condition: e => {
                                const t = R(e);
                                return !!(null != t && t > 70)
                            },
                            points: [s.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99386
                                }
                            }), s.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99422
                                }
                            })]
                        })]
                    })]
                }),
                E = Object(s.e)({
                    name: "Memory used",
                    points: [s.e.Point({
                        name: "usage after 1m",
                        condition: e => {
                            const t = s.a.extractPassedTime(e);
                            return !!(t && t <= s.a.time("1m"))
                        },
                        points: [s.e.Point({
                            name: "realMem <= 500MB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t <= s.a.bytes("500MB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99207
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99243
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99279
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99315
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "500MB < realMem <= 1GB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t <= s.a.bytes("1GB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99208
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99244
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99280
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99316
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "1GB < realMem <= 2GB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t <= s.a.bytes("2GB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99209
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99245
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99281
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99317
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "realMem > 2GB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t > s.a.bytes("2GB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99210
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99246
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99282
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99318
                                    }
                                })]
                            })]
                        })]
                    }), s.e.Point({
                        name: "usage after 5m",
                        condition: e => {
                            const t = s.a.extractPassedTime(e);
                            return !!(t && t <= s.a.time("5m"))
                        },
                        points: [s.e.Point({
                            name: "realMem <= 500MB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t <= s.a.bytes("500MB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99211
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99247
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99283
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99319
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "500MB < realMem <= 1GB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t <= s.a.bytes("1GB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99212
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99248
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99284
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99320
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "1GB < realMem <= 2GB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t <= s.a.bytes("2GB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99213
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99249
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99285
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99321
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "realMem > 2GB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t > s.a.bytes("2GB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99214
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99250
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99286
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99322
                                    }
                                })]
                            })]
                        })]
                    }), s.e.Point({
                        name: "usage after 10m",
                        condition: e => {
                            const t = s.a.extractPassedTime(e);
                            return !!(t && t <= s.a.time("10m"))
                        },
                        points: [s.e.Point({
                            name: "realMem <= 500MB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t <= s.a.bytes("500MB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99215
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99251
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99287
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99323
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "500MB < realMem <= 1GB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t <= s.a.bytes("1GB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99216
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99252
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99288
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99324
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "1GB < realMem <= 2GB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t <= s.a.bytes("2GB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99217
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99253
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99289
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99325
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "realMem > 2GB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t > s.a.bytes("2GB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99218
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99254
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99290
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99326
                                    }
                                })]
                            })]
                        })]
                    }), s.e.Point({
                        name: "usage after 30m",
                        condition: e => {
                            const t = s.a.extractPassedTime(e);
                            return !!(t && t <= s.a.time("30m"))
                        },
                        points: [s.e.Point({
                            name: "realMem <= 500MB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t <= s.a.bytes("500MB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99219
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99255
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99291
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99327
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "500MB < realMem <= 1GB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t <= s.a.bytes("1GB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99220
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99256
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99292
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99328
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "1GB < realMem <= 2GB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t <= s.a.bytes("2GB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99221
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99257
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99293
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99329
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "realMem > 2GB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t > s.a.bytes("2GB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99222
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99258
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99294
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99330
                                    }
                                })]
                            })]
                        })]
                    }), s.e.Point({
                        name: "usage after 1h",
                        condition: e => {
                            const t = s.a.extractPassedTime(e);
                            return !!(t && t <= s.a.time("1h"))
                        },
                        points: [s.e.Point({
                            name: "realMem <= 500MB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t <= s.a.bytes("500MB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99223
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99259
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99295
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99331
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "500MB < realMem <= 1GB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t <= s.a.bytes("1GB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99224
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99260
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99296
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99332
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "1GB < realMem <= 2GB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t <= s.a.bytes("2GB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99225
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99261
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99297
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99333
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "realMem > 2GB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t > s.a.bytes("2GB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99226
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99262
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99298
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99334
                                    }
                                })]
                            })]
                        })]
                    }), s.e.Point({
                        name: "usage after 3h",
                        condition: e => {
                            const t = s.a.extractPassedTime(e);
                            return !!(t && t <= s.a.time("3h"))
                        },
                        points: [s.e.Point({
                            name: "realMem <= 500MB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t <= s.a.bytes("500MB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99227
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99263
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99299
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99335
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "500MB < realMem <= 1GB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t <= s.a.bytes("1GB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99228
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99264
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99300
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99336
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "1GB < realMem <= 2GB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t <= s.a.bytes("2GB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99229
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99265
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99301
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99337
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "realMem > 2GB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t > s.a.bytes("2GB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99230
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99266
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99302
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99338
                                    }
                                })]
                            })]
                        })]
                    }), s.e.Point({
                        name: "usage after 5h",
                        condition: e => {
                            const t = s.a.extractPassedTime(e);
                            return !!(t && t <= s.a.time("5h"))
                        },
                        points: [s.e.Point({
                            name: "realMem <= 500MB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t <= s.a.bytes("500MB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99231
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99267
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99303
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99339
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "500MB < realMem <= 1GB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t <= s.a.bytes("1GB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99232
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99268
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99304
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99340
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "1GB < realMem <= 2GB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t <= s.a.bytes("2GB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99233
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99269
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99305
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99341
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "realMem > 2GB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t > s.a.bytes("2GB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99234
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99270
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99306
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99342
                                    }
                                })]
                            })]
                        })]
                    }), s.e.Point({
                        name: "usage after 8h",
                        condition: e => {
                            const t = s.a.extractPassedTime(e);
                            return !!(t && t <= s.a.time("8h"))
                        },
                        points: [s.e.Point({
                            name: "realMem <= 500MB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t <= s.a.bytes("500MB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99235
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99271
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99307
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99343
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "500MB < realMem <= 1GB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t <= s.a.bytes("1GB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99236
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99272
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99308
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99344
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "1GB < realMem <= 2GB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t <= s.a.bytes("2GB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99237
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99273
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99309
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99345
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "realMem > 2GB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t > s.a.bytes("2GB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99238
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99274
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99310
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99346
                                    }
                                })]
                            })]
                        })]
                    }), s.e.Point({
                        name: "usage after 24h",
                        condition: e => {
                            const t = s.a.extractPassedTime(e);
                            return !!(t && t <= s.a.time("24h"))
                        },
                        points: [s.e.Point({
                            name: "realMem <= 500MB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t <= s.a.bytes("500MB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99239
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99275
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99311
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99347
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "500MB < realMem <= 1GB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t <= s.a.bytes("1GB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99240
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99276
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99312
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99348
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "1GB < realMem <= 2GB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t <= s.a.bytes("2GB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99241
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99277
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99313
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99349
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "realMem > 2GB",
                            condition: e => {
                                const t = x(e);
                                return !!(null != t && t > s.a.bytes("2GB"))
                            },
                            points: [s.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t <= s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99242
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99278
                                    }
                                })]
                            }), s.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = s.a.extractRAM(e);
                                    return !!(null != t && t > s.a.bytes("8GB"))
                                },
                                points: [s.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99314
                                    }
                                }), s.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99350
                                    }
                                })]
                            })]
                        })]
                    })]
                }),
                $ = Object(s.e)({
                    name: "RAM usage summary",
                    points: [s.e.Point({
                        name: "RAM <= 8GB",
                        condition: e => {
                            const t = s.a.extractRAM(e);
                            return !!(null != t && t <= s.a.bytes("8GB"))
                        },
                        qos: {
                            cmdId: 99773
                        }
                    }), s.e.Point({
                        name: "RAM > 8GB",
                        condition: e => {
                            const t = s.a.extractRAM(e);
                            return !!(null != t && t > s.a.bytes("8GB"))
                        },
                        qos: {
                            cmdId: 99774
                        }
                    })]
                }),
                O = Object(s.e)({
                    name: "CPU usage summary",
                    points: [s.e.Point({
                        name: "",
                        condition: !0,
                        qos: {
                            cmdId: 99775
                        }
                    })]
                }),
                B = Object(s.b)({
                    name: r.a.app_cpu_usage,
                    type: T.a.APP_USAGE,
                    categories: [a.a.usage],
                    statement: s.e.Group(N, O)
                }),
                k = Object(s.b)({
                    name: r.a.app_ram_usage,
                    type: T.a.APP_USAGE,
                    categories: [a.a.usage],
                    statement: s.e.Group(E, $)
                });
            var U = Object(s.c)({
                metrics: [B, k]
            });
            let C;
            (C || (C = {})).extractLowestFpsDrop = e => {
                var t, n;
                return {
                    lowestDrop: null == e || null === (t = e.data) || void 0 === t ? void 0 : t.lowestDrop,
                    maxFps: null == e || null === (n = e.data) || void 0 === n ? void 0 : n.maxFps
                }
            };
            var F = C;
            const G = s.b.Fps({
                name: r.a.fps_scroll_conv_list,
                categories: [a.a.ux_latency],
                timeout: 5e3,
                statement: Object(s.e)({
                    name: "lowest FPS drop - scroll conv list",
                    points: [s.e.Point({
                        name: "maxFps = 60",
                        condition: e => {
                            const {
                                maxFps: t
                            } = F.extractLowestFpsDrop(e);
                            return !!(null != t && t <= 60)
                        },
                        points: [s.e.Point({
                            name: "fps <= 10",
                            condition: e => {
                                const {
                                    lowestDrop: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t <= 10)
                            },
                            points: [s.e.Point({
                                name: "window & mac intel",
                                condition: e => !s.a.isM1(e),
                                qos: {
                                    cmdId: 99677
                                }
                            }), s.e.Point({
                                name: "mac m1",
                                condition: e => s.a.isM1(e),
                                qos: {
                                    cmdId: 99681
                                }
                            })]
                        }), s.e.Point({
                            name: "10 < fps <= 25",
                            condition: e => {
                                const {
                                    lowestDrop: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t > 10 && t <= 25)
                            },
                            points: [s.e.Point({
                                name: "window & mac intel",
                                condition: e => !s.a.isM1(e),
                                qos: {
                                    cmdId: 99678
                                }
                            }), s.e.Point({
                                name: "mac m1",
                                condition: e => s.a.isM1(e),
                                qos: {
                                    cmdId: 99682
                                }
                            })]
                        }), s.e.Point({
                            name: "25 < fps <= 39",
                            condition: e => {
                                const {
                                    lowestDrop: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t > 25 && t <= 39)
                            },
                            points: [s.e.Point({
                                name: "window & mac intel",
                                condition: e => !s.a.isM1(e),
                                qos: {
                                    cmdId: 99679
                                }
                            }), s.e.Point({
                                name: "mac m1",
                                condition: e => s.a.isM1(e),
                                qos: {
                                    cmdId: 99683
                                }
                            })]
                        }), s.e.Point({
                            name: "39 < fps <= 49",
                            condition: e => {
                                const {
                                    lowestDrop: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t > 39 && t <= 49)
                            },
                            points: [s.e.Point({
                                name: "window & mac intel",
                                condition: e => !s.a.isM1(e),
                                qos: {
                                    cmdId: 99680
                                }
                            }), s.e.Point({
                                name: "mac m1",
                                condition: e => s.a.isM1(e),
                                qos: {
                                    cmdId: 99684
                                }
                            })]
                        })]
                    }), s.e.Point({
                        name: "maxFps = 120",
                        condition: e => {
                            const {
                                maxFps: t
                            } = F.extractLowestFpsDrop(e);
                            return !!(null != t && t > 60 && t <= 120)
                        },
                        points: [s.e.Point({
                            name: "fps <= 20",
                            condition: e => {
                                const {
                                    lowestDrop: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t <= 20)
                            },
                            points: [s.e.Point({
                                name: "window & mac intel",
                                condition: e => !s.a.isM1(e),
                                qos: {
                                    cmdId: 99685
                                }
                            }), s.e.Point({
                                name: "mac m1",
                                condition: e => s.a.isM1(e),
                                qos: {
                                    cmdId: 99689
                                }
                            })]
                        }), s.e.Point({
                            name: "20 < fps <= 50",
                            condition: e => {
                                const {
                                    lowestDrop: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t > 20 && t <= 50)
                            },
                            points: [s.e.Point({
                                name: "window & mac intel",
                                condition: e => !s.a.isM1(e),
                                qos: {
                                    cmdId: 99686
                                }
                            }), s.e.Point({
                                name: "mac m1",
                                condition: e => s.a.isM1(e),
                                qos: {
                                    cmdId: 99690
                                }
                            })]
                        }), s.e.Point({
                            name: "50 < fps <= 79",
                            condition: e => {
                                const {
                                    lowestDrop: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t > 50 && t <= 79)
                            },
                            points: [s.e.Point({
                                name: "window & mac intel",
                                condition: e => !s.a.isM1(e),
                                qos: {
                                    cmdId: 99687
                                }
                            }), s.e.Point({
                                name: "mac m1",
                                condition: e => s.a.isM1(e),
                                qos: {
                                    cmdId: 99691
                                }
                            })]
                        }), s.e.Point({
                            name: "79 < fps <= 99",
                            condition: e => {
                                const {
                                    lowestDrop: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t > 79 && t <= 99)
                            },
                            points: [s.e.Point({
                                name: "window & mac intel",
                                condition: e => !s.a.isM1(e),
                                qos: {
                                    cmdId: 99688
                                }
                            }), s.e.Point({
                                name: "mac m1",
                                condition: e => s.a.isM1(e),
                                qos: {
                                    cmdId: 99692
                                }
                            })]
                        })]
                    })]
                })
            });
            var j = Object(s.c)({
                metrics: [G]
            });
            const L = s.b.Fps({
                    name: r.a.fps_switch_conv,
                    categories: [a.a.ux_latency],
                    timeout: 5e3,
                    statement: Object(s.e)({
                        name: "lowest FPS drop - switch conversation",
                        points: [s.e.Point({
                            name: "maxFps = 60",
                            condition: e => {
                                const {
                                    maxFps: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t <= 60)
                            },
                            points: [s.e.Point({
                                name: "fps <= 10",
                                condition: e => {
                                    const {
                                        lowestDrop: t
                                    } = F.extractLowestFpsDrop(e);
                                    return !!(null != t && t <= 10)
                                },
                                points: [s.e.Point({
                                    name: "window & mac intel",
                                    condition: e => !s.a.isM1(e),
                                    qos: {
                                        cmdId: 99693
                                    }
                                }), s.e.Point({
                                    name: "mac m1",
                                    condition: e => s.a.isM1(e),
                                    qos: {
                                        cmdId: 99697
                                    }
                                })]
                            }), s.e.Point({
                                name: "10 < fps <= 25",
                                condition: e => {
                                    const {
                                        lowestDrop: t
                                    } = F.extractLowestFpsDrop(e);
                                    return !!(null != t && t > 10 && t <= 25)
                                },
                                points: [s.e.Point({
                                    name: "window & mac intel",
                                    condition: e => !s.a.isM1(e),
                                    qos: {
                                        cmdId: 99694
                                    }
                                }), s.e.Point({
                                    name: "mac m1",
                                    condition: e => s.a.isM1(e),
                                    qos: {
                                        cmdId: 99698
                                    }
                                })]
                            }), s.e.Point({
                                name: "25 < fps <= 39",
                                condition: e => {
                                    const {
                                        lowestDrop: t
                                    } = F.extractLowestFpsDrop(e);
                                    return !!(null != t && t > 25 && t <= 39)
                                },
                                points: [s.e.Point({
                                    name: "window & mac intel",
                                    condition: e => !s.a.isM1(e),
                                    qos: {
                                        cmdId: 99695
                                    }
                                }), s.e.Point({
                                    name: "mac m1",
                                    condition: e => s.a.isM1(e),
                                    qos: {
                                        cmdId: 99699
                                    }
                                })]
                            }), s.e.Point({
                                name: "39 < fps <= 49",
                                condition: e => {
                                    const {
                                        lowestDrop: t
                                    } = F.extractLowestFpsDrop(e);
                                    return !!(null != t && t > 39 && t <= 49)
                                },
                                points: [s.e.Point({
                                    name: "window & mac intel",
                                    condition: e => !s.a.isM1(e),
                                    qos: {
                                        cmdId: 99696
                                    }
                                }), s.e.Point({
                                    name: "mac m1",
                                    condition: e => s.a.isM1(e),
                                    qos: {
                                        cmdId: 99700
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "maxFps = 120",
                            condition: e => {
                                const {
                                    maxFps: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t > 60 && t <= 120)
                            },
                            points: [s.e.Point({
                                name: "fps <= 20",
                                condition: e => {
                                    const {
                                        lowestDrop: t
                                    } = F.extractLowestFpsDrop(e);
                                    return !!(null != t && t <= 20)
                                },
                                points: [s.e.Point({
                                    name: "window & mac intel",
                                    condition: e => !s.a.isM1(e),
                                    qos: {
                                        cmdId: 99701
                                    }
                                }), s.e.Point({
                                    name: "mac m1",
                                    condition: e => s.a.isM1(e),
                                    qos: {
                                        cmdId: 99705
                                    }
                                })]
                            }), s.e.Point({
                                name: "20 < fps <= 50",
                                condition: e => {
                                    const {
                                        lowestDrop: t
                                    } = F.extractLowestFpsDrop(e);
                                    return !!(null != t && t > 20 && t <= 50)
                                },
                                points: [s.e.Point({
                                    name: "window & mac intel",
                                    condition: e => !s.a.isM1(e),
                                    qos: {
                                        cmdId: 99702
                                    }
                                }), s.e.Point({
                                    name: "mac m1",
                                    condition: e => s.a.isM1(e),
                                    qos: {
                                        cmdId: 99706
                                    }
                                })]
                            }), s.e.Point({
                                name: "50 < fps <= 79",
                                condition: e => {
                                    const {
                                        lowestDrop: t
                                    } = F.extractLowestFpsDrop(e);
                                    return !!(null != t && t > 50 && t <= 79)
                                },
                                points: [s.e.Point({
                                    name: "window & mac intel",
                                    condition: e => !s.a.isM1(e),
                                    qos: {
                                        cmdId: 99703
                                    }
                                }), s.e.Point({
                                    name: "mac m1",
                                    condition: e => s.a.isM1(e),
                                    qos: {
                                        cmdId: 99707
                                    }
                                })]
                            }), s.e.Point({
                                name: "79 < fps <= 99",
                                condition: e => {
                                    const {
                                        lowestDrop: t
                                    } = F.extractLowestFpsDrop(e);
                                    return !!(null != t && t > 79 && t <= 99)
                                },
                                points: [s.e.Point({
                                    name: "window & mac intel",
                                    condition: e => !s.a.isM1(e),
                                    qos: {
                                        cmdId: 99704
                                    }
                                }), s.e.Point({
                                    name: "mac m1",
                                    condition: e => s.a.isM1(e),
                                    qos: {
                                        cmdId: 99708
                                    }
                                })]
                            })]
                        })]
                    })
                }),
                z = s.b.Fps({
                    name: r.a.fps_jump_to_msg,
                    categories: [a.a.ux_latency],
                    timeout: 5e3,
                    statement: Object(s.e)({
                        name: "lowest FPS drop - jump to message",
                        points: [s.e.Point({
                            name: "maxFps = 60",
                            condition: e => {
                                const {
                                    maxFps: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t <= 60)
                            },
                            points: [s.e.Point({
                                name: "fps <= 10",
                                condition: e => {
                                    const {
                                        lowestDrop: t
                                    } = F.extractLowestFpsDrop(e);
                                    return !!(null != t && t <= 10)
                                },
                                points: [s.e.Point({
                                    name: "window & mac intel",
                                    condition: e => !s.a.isM1(e),
                                    qos: {
                                        cmdId: 99709
                                    }
                                }), s.e.Point({
                                    name: "mac m1",
                                    condition: e => s.a.isM1(e),
                                    qos: {
                                        cmdId: 99713
                                    }
                                })]
                            }), s.e.Point({
                                name: "10 < fps <= 25",
                                condition: e => {
                                    const {
                                        lowestDrop: t
                                    } = F.extractLowestFpsDrop(e);
                                    return !!(null != t && t > 10 && t <= 25)
                                },
                                points: [s.e.Point({
                                    name: "window & mac intel",
                                    condition: e => !s.a.isM1(e),
                                    qos: {
                                        cmdId: 99710
                                    }
                                }), s.e.Point({
                                    name: "mac m1",
                                    condition: e => s.a.isM1(e),
                                    qos: {
                                        cmdId: 99714
                                    }
                                })]
                            }), s.e.Point({
                                name: "25 < fps <= 39",
                                condition: e => {
                                    const {
                                        lowestDrop: t
                                    } = F.extractLowestFpsDrop(e);
                                    return !!(null != t && t > 25 && t <= 39)
                                },
                                points: [s.e.Point({
                                    name: "window & mac intel",
                                    condition: e => !s.a.isM1(e),
                                    qos: {
                                        cmdId: 99711
                                    }
                                }), s.e.Point({
                                    name: "mac m1",
                                    condition: e => s.a.isM1(e),
                                    qos: {
                                        cmdId: 99715
                                    }
                                })]
                            }), s.e.Point({
                                name: "39 < fps <= 49",
                                condition: e => {
                                    const {
                                        lowestDrop: t
                                    } = F.extractLowestFpsDrop(e);
                                    return !!(null != t && t > 39 && t <= 49)
                                },
                                points: [s.e.Point({
                                    name: "window & mac intel",
                                    condition: e => !s.a.isM1(e),
                                    qos: {
                                        cmdId: 99712
                                    }
                                }), s.e.Point({
                                    name: "mac m1",
                                    condition: e => s.a.isM1(e),
                                    qos: {
                                        cmdId: 99716
                                    }
                                })]
                            })]
                        }), s.e.Point({
                            name: "maxFps = 120",
                            condition: e => {
                                const {
                                    maxFps: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t > 60 && t <= 120)
                            },
                            points: [s.e.Point({
                                name: "fps <= 20",
                                condition: e => {
                                    const {
                                        lowestDrop: t
                                    } = F.extractLowestFpsDrop(e);
                                    return !!(null != t && t <= 20)
                                },
                                points: [s.e.Point({
                                    name: "window & mac intel",
                                    condition: e => !s.a.isM1(e),
                                    qos: {
                                        cmdId: 99717
                                    }
                                }), s.e.Point({
                                    name: "mac m1",
                                    condition: e => s.a.isM1(e),
                                    qos: {
                                        cmdId: 99721
                                    }
                                })]
                            }), s.e.Point({
                                name: "20 < fps <= 50",
                                condition: e => {
                                    const {
                                        lowestDrop: t
                                    } = F.extractLowestFpsDrop(e);
                                    return !!(null != t && t > 20 && t <= 50)
                                },
                                points: [s.e.Point({
                                    name: "window & mac intel",
                                    condition: e => !s.a.isM1(e),
                                    qos: {
                                        cmdId: 99718
                                    }
                                }), s.e.Point({
                                    name: "mac m1",
                                    condition: e => s.a.isM1(e),
                                    qos: {
                                        cmdId: 99722
                                    }
                                })]
                            }), s.e.Point({
                                name: "50 < fps <= 79",
                                condition: e => {
                                    const {
                                        lowestDrop: t
                                    } = F.extractLowestFpsDrop(e);
                                    return !!(null != t && t > 50 && t <= 79)
                                },
                                points: [s.e.Point({
                                    name: "window & mac intel",
                                    condition: e => !s.a.isM1(e),
                                    qos: {
                                        cmdId: 99719
                                    }
                                }), s.e.Point({
                                    name: "mac m1",
                                    condition: e => s.a.isM1(e),
                                    qos: {
                                        cmdId: 99723
                                    }
                                })]
                            }), s.e.Point({
                                name: "79 < fps <= 99",
                                condition: e => {
                                    const {
                                        lowestDrop: t
                                    } = F.extractLowestFpsDrop(e);
                                    return !!(null != t && t > 79 && t <= 99)
                                },
                                points: [s.e.Point({
                                    name: "window & mac intel",
                                    condition: e => !s.a.isM1(e),
                                    qos: {
                                        cmdId: 99720
                                    }
                                }), s.e.Point({
                                    name: "mac m1",
                                    condition: e => s.a.isM1(e),
                                    qos: {
                                        cmdId: 99724
                                    }
                                })]
                            })]
                        })]
                    })
                });
            var K = Object(s.c)({
                metrics: [L, z]
            });
            const W = s.b.Fps({
                name: r.a.fps_scroll_chat_box_view,
                categories: [a.a.ux_latency],
                timeout: 5e3,
                statement: Object(s.e)({
                    name: "lowest FPS drop - scroll chat box view",
                    points: [s.e.Point({
                        name: "maxFps = 60",
                        condition: e => {
                            const {
                                maxFps: t
                            } = F.extractLowestFpsDrop(e);
                            return !!(null != t && t <= 60)
                        },
                        points: [s.e.Point({
                            name: "fps <= 10",
                            condition: e => {
                                const {
                                    lowestDrop: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t <= 10)
                            },
                            points: [s.e.Point({
                                name: "window & mac intel",
                                condition: e => !s.a.isM1(e),
                                qos: {
                                    cmdId: 99725
                                }
                            }), s.e.Point({
                                name: "mac m1",
                                condition: e => s.a.isM1(e),
                                qos: {
                                    cmdId: 99729
                                }
                            })]
                        }), s.e.Point({
                            name: "10 < fps <= 25",
                            condition: e => {
                                const {
                                    lowestDrop: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t > 10 && t <= 25)
                            },
                            points: [s.e.Point({
                                name: "window & mac intel",
                                condition: e => !s.a.isM1(e),
                                qos: {
                                    cmdId: 99726
                                }
                            }), s.e.Point({
                                name: "mac m1",
                                condition: e => s.a.isM1(e),
                                qos: {
                                    cmdId: 99730
                                }
                            })]
                        }), s.e.Point({
                            name: "25 < fps <= 39",
                            condition: e => {
                                const {
                                    lowestDrop: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t > 25 && t <= 39)
                            },
                            points: [s.e.Point({
                                name: "window & mac intel",
                                condition: e => !s.a.isM1(e),
                                qos: {
                                    cmdId: 99727
                                }
                            }), s.e.Point({
                                name: "mac m1",
                                condition: e => s.a.isM1(e),
                                qos: {
                                    cmdId: 99731
                                }
                            })]
                        }), s.e.Point({
                            name: "39 < fps <= 49",
                            condition: e => {
                                const {
                                    lowestDrop: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t > 39 && t <= 49)
                            },
                            points: [s.e.Point({
                                name: "window & mac intel",
                                condition: e => !s.a.isM1(e),
                                qos: {
                                    cmdId: 99728
                                }
                            }), s.e.Point({
                                name: "mac m1",
                                condition: e => s.a.isM1(e),
                                qos: {
                                    cmdId: 99732
                                }
                            })]
                        })]
                    }), s.e.Point({
                        name: "maxFps = 120",
                        condition: e => {
                            const {
                                maxFps: t
                            } = F.extractLowestFpsDrop(e);
                            return !!(null != t && t > 60 && t <= 120)
                        },
                        points: [s.e.Point({
                            name: "fps <= 20",
                            condition: e => {
                                const {
                                    lowestDrop: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t <= 20)
                            },
                            points: [s.e.Point({
                                name: "window & mac intel",
                                condition: e => !s.a.isM1(e),
                                qos: {
                                    cmdId: 99733
                                }
                            }), s.e.Point({
                                name: "mac m1",
                                condition: e => s.a.isM1(e),
                                qos: {
                                    cmdId: 99737
                                }
                            })]
                        }), s.e.Point({
                            name: "20 < fps <= 50",
                            condition: e => {
                                const {
                                    lowestDrop: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t > 20 && t <= 50)
                            },
                            points: [s.e.Point({
                                name: "window & mac intel",
                                condition: e => !s.a.isM1(e),
                                qos: {
                                    cmdId: 99734
                                }
                            }), s.e.Point({
                                name: "mac m1",
                                condition: e => s.a.isM1(e),
                                qos: {
                                    cmdId: 99738
                                }
                            })]
                        }), s.e.Point({
                            name: "50 < fps <= 79",
                            condition: e => {
                                const {
                                    lowestDrop: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t > 50 && t <= 79)
                            },
                            points: [s.e.Point({
                                name: "window & mac intel",
                                condition: e => !s.a.isM1(e),
                                qos: {
                                    cmdId: 99735
                                }
                            }), s.e.Point({
                                name: "mac m1",
                                condition: e => s.a.isM1(e),
                                qos: {
                                    cmdId: 99739
                                }
                            })]
                        }), s.e.Point({
                            name: "79 < fps <= 99",
                            condition: e => {
                                const {
                                    lowestDrop: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t > 79 && t <= 99)
                            },
                            points: [s.e.Point({
                                name: "window & mac intel",
                                condition: e => !s.a.isM1(e),
                                qos: {
                                    cmdId: 99736
                                }
                            }), s.e.Point({
                                name: "mac m1",
                                condition: e => s.a.isM1(e),
                                qos: {
                                    cmdId: 99740
                                }
                            })]
                        })]
                    })]
                })
            });
            var H = Object(s.c)({
                metrics: [W]
            });
            const V = s.b.Fps({
                name: r.a.fps_switch_main_tab,
                categories: [a.a.ux_latency],
                timeout: 5e3,
                statement: Object(s.e)({
                    name: "lowest FPS drop - switch main tab",
                    points: [s.e.Point({
                        name: "maxFps = 60",
                        condition: e => {
                            const {
                                maxFps: t
                            } = F.extractLowestFpsDrop(e);
                            return !!(null != t && t <= 60)
                        },
                        points: [s.e.Point({
                            name: "fps <= 10",
                            condition: e => {
                                const {
                                    lowestDrop: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t <= 10)
                            },
                            points: [s.e.Point({
                                name: "window & mac intel",
                                condition: e => !s.a.isM1(e),
                                qos: {
                                    cmdId: 99741
                                }
                            }), s.e.Point({
                                name: "mac m1",
                                condition: e => s.a.isM1(e),
                                qos: {
                                    cmdId: 99745
                                }
                            })]
                        }), s.e.Point({
                            name: "10 < fps <= 25",
                            condition: e => {
                                const {
                                    lowestDrop: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t > 10 && t <= 25)
                            },
                            points: [s.e.Point({
                                name: "window & mac intel",
                                condition: e => !s.a.isM1(e),
                                qos: {
                                    cmdId: 99742
                                }
                            }), s.e.Point({
                                name: "mac m1",
                                condition: e => s.a.isM1(e),
                                qos: {
                                    cmdId: 99746
                                }
                            })]
                        }), s.e.Point({
                            name: "25 < fps <= 39",
                            condition: e => {
                                const {
                                    lowestDrop: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t > 25 && t <= 39)
                            },
                            points: [s.e.Point({
                                name: "window & mac intel",
                                condition: e => !s.a.isM1(e),
                                qos: {
                                    cmdId: 99743
                                }
                            }), s.e.Point({
                                name: "mac m1",
                                condition: e => s.a.isM1(e),
                                qos: {
                                    cmdId: 99747
                                }
                            })]
                        }), s.e.Point({
                            name: "39 < fps <= 49",
                            condition: e => {
                                const {
                                    lowestDrop: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t > 39 && t <= 49)
                            },
                            points: [s.e.Point({
                                name: "window & mac intel",
                                condition: e => !s.a.isM1(e),
                                qos: {
                                    cmdId: 99744
                                }
                            }), s.e.Point({
                                name: "mac m1",
                                condition: e => s.a.isM1(e),
                                qos: {
                                    cmdId: 99748
                                }
                            })]
                        })]
                    }), s.e.Point({
                        name: "maxFps = 120",
                        condition: e => {
                            const {
                                maxFps: t
                            } = F.extractLowestFpsDrop(e);
                            return !!(null != t && t > 60 && t <= 120)
                        },
                        points: [s.e.Point({
                            name: "fps <= 20",
                            condition: e => {
                                const {
                                    lowestDrop: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t <= 20)
                            },
                            points: [s.e.Point({
                                name: "window & mac intel",
                                condition: e => !s.a.isM1(e),
                                qos: {
                                    cmdId: 99749
                                }
                            }), s.e.Point({
                                name: "mac m1",
                                condition: e => s.a.isM1(e),
                                qos: {
                                    cmdId: 99753
                                }
                            })]
                        }), s.e.Point({
                            name: "20 < fps <= 50",
                            condition: e => {
                                const {
                                    lowestDrop: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t > 20 && t <= 50)
                            },
                            points: [s.e.Point({
                                name: "window & mac intel",
                                condition: e => !s.a.isM1(e),
                                qos: {
                                    cmdId: 99750
                                }
                            }), s.e.Point({
                                name: "mac m1",
                                condition: e => s.a.isM1(e),
                                qos: {
                                    cmdId: 99754
                                }
                            })]
                        }), s.e.Point({
                            name: "50 < fps <= 79",
                            condition: e => {
                                const {
                                    lowestDrop: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t > 50 && t <= 79)
                            },
                            points: [s.e.Point({
                                name: "window & mac intel",
                                condition: e => !s.a.isM1(e),
                                qos: {
                                    cmdId: 99751
                                }
                            }), s.e.Point({
                                name: "mac m1",
                                condition: e => s.a.isM1(e),
                                qos: {
                                    cmdId: 99755
                                }
                            })]
                        }), s.e.Point({
                            name: "79 < fps <= 99",
                            condition: e => {
                                const {
                                    lowestDrop: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t > 79 && t <= 99)
                            },
                            points: [s.e.Point({
                                name: "window & mac intel",
                                condition: e => !s.a.isM1(e),
                                qos: {
                                    cmdId: 99752
                                }
                            }), s.e.Point({
                                name: "mac m1",
                                condition: e => s.a.isM1(e),
                                qos: {
                                    cmdId: 99756
                                }
                            })]
                        })]
                    })]
                })
            });
            var Y = Object(s.c)({
                metrics: [V]
            });
            const Q = s.b.Fps({
                name: r.a.fps_scroll_global_search_list,
                categories: [a.a.ux_latency],
                timeout: 5e3,
                statement: Object(s.e)({
                    name: "lowest FPS drop - scroll global search list",
                    points: [s.e.Point({
                        name: "maxFps = 60",
                        condition: e => {
                            const {
                                maxFps: t
                            } = F.extractLowestFpsDrop(e);
                            return !!(null != t && t <= 60)
                        },
                        points: [s.e.Point({
                            name: "fps <= 10",
                            condition: e => {
                                const {
                                    lowestDrop: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t <= 10)
                            },
                            points: [s.e.Point({
                                name: "window & mac intel",
                                condition: e => !s.a.isM1(e),
                                qos: {
                                    cmdId: 99757
                                }
                            }), s.e.Point({
                                name: "mac m1",
                                condition: e => s.a.isM1(e),
                                qos: {
                                    cmdId: 99761
                                }
                            })]
                        }), s.e.Point({
                            name: "10 < fps <= 25",
                            condition: e => {
                                const {
                                    lowestDrop: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t > 10 && t <= 25)
                            },
                            points: [s.e.Point({
                                name: "window & mac intel",
                                condition: e => !s.a.isM1(e),
                                qos: {
                                    cmdId: 99758
                                }
                            }), s.e.Point({
                                name: "mac m1",
                                condition: e => s.a.isM1(e),
                                qos: {
                                    cmdId: 99762
                                }
                            })]
                        }), s.e.Point({
                            name: "25 < fps <= 39",
                            condition: e => {
                                const {
                                    lowestDrop: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t > 25 && t <= 39)
                            },
                            points: [s.e.Point({
                                name: "window & mac intel",
                                condition: e => !s.a.isM1(e),
                                qos: {
                                    cmdId: 99759
                                }
                            }), s.e.Point({
                                name: "mac m1",
                                condition: e => s.a.isM1(e),
                                qos: {
                                    cmdId: 99763
                                }
                            })]
                        }), s.e.Point({
                            name: "39 < fps <= 49",
                            condition: e => {
                                const {
                                    lowestDrop: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t > 39 && t <= 49)
                            },
                            points: [s.e.Point({
                                name: "window & mac intel",
                                condition: e => !s.a.isM1(e),
                                qos: {
                                    cmdId: 99760
                                }
                            }), s.e.Point({
                                name: "mac m1",
                                condition: e => s.a.isM1(e),
                                qos: {
                                    cmdId: 99764
                                }
                            })]
                        })]
                    }), s.e.Point({
                        name: "maxFps = 120",
                        condition: e => {
                            const {
                                maxFps: t
                            } = F.extractLowestFpsDrop(e);
                            return !!(null != t && t > 60 && t <= 120)
                        },
                        points: [s.e.Point({
                            name: "fps <= 20",
                            condition: e => {
                                const {
                                    lowestDrop: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t <= 20)
                            },
                            points: [s.e.Point({
                                name: "window & mac intel",
                                condition: e => !s.a.isM1(e),
                                qos: {
                                    cmdId: 99765
                                }
                            }), s.e.Point({
                                name: "mac m1",
                                condition: e => s.a.isM1(e),
                                qos: {
                                    cmdId: 99769
                                }
                            })]
                        }), s.e.Point({
                            name: "20 < fps <= 50",
                            condition: e => {
                                const {
                                    lowestDrop: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t > 20 && t <= 50)
                            },
                            points: [s.e.Point({
                                name: "window & mac intel",
                                condition: e => !s.a.isM1(e),
                                qos: {
                                    cmdId: 99766
                                }
                            }), s.e.Point({
                                name: "mac m1",
                                condition: e => s.a.isM1(e),
                                qos: {
                                    cmdId: 99770
                                }
                            })]
                        }), s.e.Point({
                            name: "50 < fps <= 79",
                            condition: e => {
                                const {
                                    lowestDrop: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t > 50 && t <= 79)
                            },
                            points: [s.e.Point({
                                name: "window & mac intel",
                                condition: e => !s.a.isM1(e),
                                qos: {
                                    cmdId: 99767
                                }
                            }), s.e.Point({
                                name: "mac m1",
                                condition: e => s.a.isM1(e),
                                qos: {
                                    cmdId: 99771
                                }
                            })]
                        }), s.e.Point({
                            name: "79 < fps <= 99",
                            condition: e => {
                                const {
                                    lowestDrop: t
                                } = F.extractLowestFpsDrop(e);
                                return !!(null != t && t > 79 && t <= 99)
                            },
                            points: [s.e.Point({
                                name: "window & mac intel",
                                condition: e => !s.a.isM1(e),
                                qos: {
                                    cmdId: 99768
                                }
                            }), s.e.Point({
                                name: "mac m1",
                                condition: e => s.a.isM1(e),
                                qos: {
                                    cmdId: 99772
                                }
                            })]
                        })]
                    })]
                })
            });
            var J = Object(s.c)({
                metrics: [Q]
            });
            t.default = Object(s.d)(Object(i.a)({
                usage: u,
                dal: g,
                fps: A,
                startUp: I,
                conversation: y,
                appUsage: U
            }, o))
        },
        KA3I: function(e, t, n) {
            "use strict";
            var o = n("N1xz"),
                i = n("CHYU");
            n("dFSO");
            t.a = class {
                getProcessName(e) {
                    try {
                        return n("T7kW").getName(e) || ""
                    } catch (t) {}
                    return ""
                }
                async run() {
                    if (o.a.process !== i.a.Main) return [];
                    Date.now();
                    const e = n("vbkW").app.getAppMetrics(),
                        t = e.map((e => e.pid));
                    if (!t.length) return [];
                    try {
                        const n = this.getExecutionMethod(),
                            o = await n(t);
                        if (o.error) throw o.error;
                        if (o.info) {
                            const t = this.merge(e, o.info);
                            Date.now();
                            return t
                        }
                    } catch (s) {}
                    return []
                }
                getPidMetrics(e) {
                    return n("vbkW").app.getAppMetrics().find((t => t.pid === e))
                }
                getGPUMetrics() {
                    return n("vbkW").app.getAppMetrics().find((e => "GPU" === e.type))
                }
                merge(e, t) {
                    const n = [];
                    return e.forEach((e => {
                        const o = t[e.pid];
                        o && n.push({
                            pid: e.pid,
                            ppid: o.ppid,
                            name: this.getProcessName(e.pid),
                            type: e.type,
                            cpu: o.cpu,
                            memory: o.memory,
                            sandboxed: e.sandboxed,
                            elapsed: o.elapsed,
                            timestamp: o.timestamp
                        })
                    })), n
                }
                getExecutionMethod() {
                    throw new Error("Platform WEB is not supported yet")
                }
            }
        },
        KBA3: function(e, t, n) {
            "use strict";
            var o = n("VTBJ"),
                i = n("dFSO");
            var s = n("CHYU"),
                a = n("ncfp");
            const r = new class {
                constructor() {
                    this.config = {
                        enable: !1,
                        enable_for_staging_account: !0,
                        enable_submit_qos: !0,
                        enable_fps_monitor: !1,
                        enable_fps_monitor_v2: !0,
                        enable_fps_drop_monitor: !0,
                        enable_write_log: !1,
                        submit_qos_except_dev: !0,
                        allow_measure_usage_by_ps_cmd: !1,
                        allow_measure_app_usage: !1,
                        allow_submit_os_version_mac: !0,
                        allow_submit_os_version_win: !1,
                        max_cache_records_resolved: 25,
                        max_starting_process_dictionary: 500,
                        processes_whitelist: [s.a.Main, s.a.Web, s.a.Render, s.a.SharedWorker, s.a.Photo],
                        staging_account: !1,
                        fps_section: {
                            fps_scroll_conv_list: !0,
                            fps_switch_conv: !0,
                            fps_jump_to_msg: !0,
                            fps_scroll_chat_box_view: !0,
                            fps_switch_main_tab: !0,
                            fps_scroll_global_search_list: !0
                        },
                        debug: {
                            enable: !1
                        }
                    }, this.stagingAccountStatus = a.a.PENDING, this.listerners = {}, this.listernerChanged = [], this.init()
                }
                get enable() {
                    return this.config.enable
                }
                init() {
                    0
                }
                mergeSetting(e) {
                    var t, n;
                    if (!e || "object" != typeof e) return;
                    const s = JSON.parse(JSON.stringify(this.config));
                    this.config = Object(o.a)(Object(o.a)(Object(o.a)({}, this.config), e || {}), {}, {
                        fps_section: Object(o.a)(Object(o.a)({}, this.config.fps_section), (null == e ? void 0 : e.fps_section) || {}),
                        debug: Object(o.a)(Object(o.a)({}, this.config.debug), (null == e ? void 0 : e.debug) || {})
                    }), null != e && e.staging_account && null == (null == e || null === (t = e.debug) || void 0 === t ? void 0 : t.enable) && (this.config.debug.enable = !0);
                    for (const o in this.config) {
                        const t = null == e ? void 0 : e[o];
                        if ("staging_account" === o && (this.stagingAccountStatus = t ? a.a.YES : a.a.NO), !Object(i.b)(s[o]) && !Object(i.b)(t)) {
                            const e = this.listerners[o];
                            null != e && e.length && e.forEach((e => e(t)))
                        }
                    }
                    null !== (n = this.listernerChanged) && void 0 !== n && n.length && this.listernerChanged.forEach((e => e()))
                }
                on(e, t) {
                    this.listerners[e] || (this.listerners[e] = []), this.listerners[e].push(t)
                }
                removeListener(e, t) {
                    var n;
                    null !== (n = this.listerners[e]) && void 0 !== n && n.length && (this.listerners[e] = this.listerners[e].filter((e => e !== t)))
                }
                onConfigChange(e) {
                    this.listernerChanged.push(e)
                }
                onEnable(e) {
                    this.on("enable", (t => {
                        t && e()
                    }))
                }
                onDisable(e) {
                    this.on("enable", (t => {
                        t || e()
                    }))
                }
                getConfig() {
                    return this.config
                }
                getStagingAccountStatus() {
                    return this.stagingAccountStatus
                }
            };
            t.a = r
        },
        MNz0: function(e, t, n) {
            "use strict";
            var o;
            ! function(e) {
                e.ACCEPT_LAST = "ACCEPT_LAST"
            }(o || (o = {})), t.a = o
        },
        Mgpg: function(e, t, n) {
            "use strict";
            n.r(t);
            var o = n("XB6V");
            n.d(t, "ZLoggerFactory", (function() {
                return o.a
            }));
            var i = n("7xKq");
            n.d(t, "ZLogger", (function() {
                return i.ZLogger
            }));
            var s = n("7FSS");
            n.d(t, "dangerouslyLogConsole", (function() {
                return s.a
            }));
            var a = n("OMsT");
            n.d(t, "ZLogCollector", (function() {
                return a.a
            }));
            var r = n("jGDt");
            n.d(t, "ZLogSession", (function() {
                return r.a
            }))
        },
        N0Be: function(e, t, n) {
            "use strict";
            n.d(t, "a", (function() {
                return o
            })), n.d(t, "d", (function() {
                return i
            })), n.d(t, "b", (function() {
                return s
            })), n.d(t, "g", (function() {
                return a
            })), n.d(t, "e", (function() {
                return r
            })), n.d(t, "f", (function() {
                return c
            })), n.d(t, "c", (function() {
                return d
            }));
            const o = "ExistedActionHandlerError",
                i = "NonExistedActionHandlerError",
                s = "InvalidInitializedDataForSecureKeysToMigrateError",
                a = "UninitializedSecureKeysToMigrateError",
                r = "SecureKeysToMigrateInvalidIDBKeyError",
                c = "UnavailableUserIDForKeynameGenerationError",
                d = "MigrateTimeoutError"
        },
        N1xz: function(e, t, n) {
            "use strict";
            var o = n("h0S/"),
                i = n("KBA3"),
                s = n("K+9E"),
                a = n("CHYU");
            class r {
                static get EPOCH() {
                    return this._epoch
                }
                static register(e, t) {
                    this.tokens || (this.tokens = new Map), this.tokens.set(e, t)
                }
                static get MetricManager() {
                    if (!this._metricManager) {
                        const e = s.a.METRIC_MANAGER,
                            t = this.tokens.get(e);
                        if (!t) throw new Error(`[metricz] token "${e}" is not registered`);
                        this._metricManager = new t, this.tokens.delete(e)
                    }
                    return this._metricManager
                }
                static get SchemaManager() {
                    if (!this._schemaManager) {
                        const e = s.a.METRIC_SCHEMA_MANAGER,
                            t = this.tokens.get(e);
                        if (!t) throw new Error(`[metricz] token "${e}" is not registered`);
                        this._schemaManager = new t, this.tokens.delete(e)
                    }
                    return this._schemaManager
                }
                static get MetricFactory() {
                    if (!this._metricFactory) {
                        const e = s.a.METRIC_FACTORY,
                            t = this.tokens.get(e);
                        if (!t) throw new Error(`[metricz] token "${e}" is not registered`);
                        this._metricFactory = new t, this.tokens.delete(e)
                    }
                    return this._metricFactory
                }
                static get MetricTransporter() {
                    if (!this._metricTransporter) {
                        const e = s.a.METRIC_TRANSPORTER,
                            t = this.tokens.get(e);
                        if (!t) throw new Error(`Metric token "${e}" is not registered`);
                        this._metricTransporter = new t, this.tokens.delete(e)
                    }
                    return this._metricTransporter
                }
                static get MetricResolver() {
                    if (!this._metricResolver) {
                        const e = s.a.METRIC_RESOLVER,
                            t = this.tokens.get(e);
                        if (!t) throw new Error(`Metric token "${e}" is not registered`);
                        this._metricResolver = new t, this.tokens.delete(e)
                    }
                    return this._metricResolver
                }
                static get UsageMonitor() {
                    if (!this._usageMonitor) {
                        const e = s.a.USAGE_MONITOR,
                            t = this.tokens.get(e);
                        if (!t) throw new Error(`Metric token "${e}" is not registered`);
                        this._usageMonitor = new t, this.tokens.delete(e)
                    }
                    return this._usageMonitor
                }
                static get LocalStat() {
                    if (!this._localStat) {
                        const e = s.a.LOCAL_STAT,
                            t = this.tokens.get(e);
                        if (!t) throw new Error(`Metric token "${e}" is not registered`);
                        this._localStat = new t, this.tokens.delete(e)
                    }
                    return this._localStat
                }
                static get DataManager() {
                    if (!this._dataManager) {
                        const e = s.a.DATA_MANAGER,
                            t = this.tokens.get(e);
                        if (!t) throw new Error(`Metric token "${e}" is not registered`);
                        this._dataManager = new t, this.tokens.delete(e)
                    }
                    return this._dataManager
                }
                static get UIManager() {
                    if (!this._uiManager) {
                        const e = s.a.UI_MANAGER,
                            t = this.tokens.get(e);
                        if (!t) throw new Error(`Metric token "${e}" is not registered`);
                        this._uiManager = new t, this.tokens.delete(e)
                    }
                    return this._uiManager
                }
                static createLogger(e) {
                    try {
                        const {
                            ModuleContainer: t
                        } = n("jDHv"), {
                            ZLoggerFactory: i
                        } = n("Mgpg");
                        return t.resolve(i).createZLogger(o.b.metricz, [e])
                    } catch (t) {}
                }
                static get Logger() {
                    return this._Logger || (this._Logger = this.createLogger("internal")), this._Logger
                }
                static install() {
                    this._installed || (this._installed = !0, this._exited = !1, this.canIUse() && (this.startEpoch(), this.SchemaManager.ready(), this.UsageMonitor.ready(), this.MetricManager.ready(), this.MetricResolver.ready(), this.LocalStat.ready(), this.UIManager.ready(), this.process !== a.a.Main && this.MetricTransporter.ready()))
                }
                static isInstalled() {
                    return !!this._installed
                }
                static startEpoch() {
                    this._epoch || (this._epoch = Date.now(), this.DataManager.saveEpoch(this.process, this._epoch))
                }
                static get process() {
                    return this._process || (this._process = this.getCurrentProcess()), this._process
                }
                static getCurrentProcess() {
                    switch (__ZaBUNDLENAME__.toLowerCase()) {
                        case "main":
                            return a.a.Main;
                        case "web":
                            return a.a.Web;
                        case "render":
                            return a.a.Render;
                        case "login":
                            return a.a.Login;
                        case "photo":
                            return a.a.Photo;
                        case "shared-worker":
                            return a.a.SharedWorker;
                        default:
                            return a.a.Unknown
                    }
                }
                static canIUse() {
                    return !(!this._installed || this._exited) && i.a.getConfig().processes_whitelist.includes(this.process)
                }
                static exit() {
                    this._exited = !0, this._installed = !1, this.MetricManager.exit(), this.MetricResolver.exit(), this.MetricTransporter.exit(), this.UIManager.exit()
                }
            }
            r._Logger = void 0, r._process = void 0, r._metricManager = void 0, r._schemaManager = void 0, r._metricFactory = void 0, r._metricTransporter = void 0, r._metricResolver = void 0, r._usageMonitor = void 0, r._localStat = void 0, r._dataManager = void 0, r._uiManager = void 0, r.tokens = void 0, r._epoch = void 0, r._installed = void 0, r._exited = void 0, t.a = r
        },
        Na1p: function(e, t, n) {
            "use strict";
            (function(e) {
                var o = n("VTBJ"),
                    i = n("ZgEe");
                class s {
                    static start() {
                        var t;
                        !this.started && null !== (t = e) && void 0 !== t && t.cpuUsage && (this.started = !0, this.timer = new i.a, this.startUsage = e.cpuUsage())
                    }
                    static getUsage() {
                        this.started || this.start();
                        const t = e.cpuUsage(this.startUsage),
                            n = this.timer.us,
                            i = (t.system + t.user) / n * 100;
                        return Object(o.a)(Object(o.a)({}, t), {}, {
                            time: n,
                            percent: i
                        })
                    }
                }
                s.timer = void 0, s.startUsage = void 0, s.started = void 0, t.a = s
            }).call(this, n("ckNr"))
        },
        OMsT: function(e, t, n) {
            "use strict";
            n.d(t, "a", (function() {
                return i
            }));
            var o = n("jDHv");
            const i = Object(o.define)("log-collector")
        },
        T7kW: function(e, t) {
            e.exports = new class {
                constructor() {
                    this._reverse = {}
                }
                subcribeMainIPC(e) {
                    e.on("zmain_register_process", ((e, t, n, o) => {
                        this.register(t, n, o)
                    }))
                }
                register(e, t, n) {
                    this._reverse[t] = e
                }
                getName(e) {
                    return this._reverse[e]
                }
            }
        },
        XB6V: function(e, t, n) {
            "use strict";
            n.d(t, "a", (function() {
                return i
            }));
            var o = n("jDHv");
            const i = Object(o.define)("zlogger-factory")
        },
        ZcVI: function(e, t, n) {
            "use strict";
            n.d(t, "a", (function() {
                return o
            })), n.d(t, "b", (function() {
                return i
            })), n.d(t, "c", (function() {
                return s
            })), n.d(t, "d", (function() {
                return a
            })), n.d(t, "h", (function() {
                return r
            })), n.d(t, "i", (function() {
                return c
            })), n.d(t, "j", (function() {
                return d
            })), n.d(t, "m", (function() {
                return m
            })), n.d(t, "k", (function() {
                return l
            })), n.d(t, "l", (function() {
                return u
            })), n.d(t, "e", (function() {
                return p
            })), n.d(t, "f", (function() {
                return h
            })), n.d(t, "g", (function() {
                return _
            }));
            const o = "conversation",
                i = "friend",
                s = "group",
                a = "group_info",
                r = "ac",
                c = "acv2",
                d = "aco",
                m = "sock_msg",
                l = "sock_ac",
                u = "sock_aco",
                p = "actr",
                h = "actrv2",
                _ = "actro"
        },
        ZgEe: function(e, t, n) {
            "use strict";
            (function(e) {
                t.a = class {
                    constructor() {
                        this.t0 = void 0, this.t0 = e.hrtime.bigint()
                    }
                    get ms() {
                        const t = e.hrtime.bigint();
                        return Number(t - this.t0) / 1e6
                    }
                    get us() {
                        const t = e.hrtime.bigint();
                        return Number(t - this.t0) / 1e3
                    }
                }
            }).call(this, n("ckNr"))
        },
        bH0y: function(e, t, n) {
            "use strict";
            n.d(t, "a", (function() {
                return a
            }));
            var o = n("+7Kn"),
                i = n("wudS"),
                s = n("Cvfp");
            const a = new class {
                constructor() {
                    this._localStorageKeys = null, this._indexedDBKeys = null, this._keyName = null
                }
                init(e) {
                    if (!e) throw new o.b;
                    const t = `${Object(i.b)(e)}_sktmig`;
                    this._keyName = t;
                    let n = {
                        l: [],
                        i: []
                    };
                    const s = window.localStorage.getItem(t);
                    null !== s && (n = JSON.parse(s));
                    const {
                        l: a,
                        i: r
                    } = n;
                    this._localStorageKeys = a, this._indexedDBKeys = r
                }
                _hasInitialized() {
                    return null !== this._keyName && null !== this._localStorageKeys && null !== this._indexedDBKeys
                }
                _getKeyName() {
                    if (!this._hasInitialized()) throw new o.g;
                    return this._keyName
                }
                _getSecureIndexedDBKey(e, t, n) {
                    return [e, t, n].join(s.a)
                }
                getSecureIndexedDBKeyObject(e) {
                    const t = e.split(s.a);
                    if (3 !== t.length) throw new o.e;
                    const [n, i, a] = t;
                    return {
                        dbName: n,
                        storeName: i,
                        keyName: a
                    }
                }
                getLocalStorageKeys() {
                    if (!this._hasInitialized()) throw new o.g;
                    return this._localStorageKeys
                }
                getIndexedDBKeys() {
                    if (!this._hasInitialized()) throw new o.g;
                    return this._indexedDBKeys
                }
                isLocalStorageKeyMarked(e) {
                    return this.getLocalStorageKeys().includes(e)
                }
                markLocalStorageKey(e) {
                    this.isLocalStorageKeyMarked(e) || this.getLocalStorageKeys().push(e)
                }
                unmarkLocalStorageKey(e) {
                    if (!this.isLocalStorageKeyMarked(e)) return;
                    const t = this.getLocalStorageKeys().indexOf(e);
                    this.getLocalStorageKeys().splice(t, 1)
                }
                isIndexedDBKeyMarked(e) {
                    return this.getIndexedDBKeys().includes(e)
                }
                markIndexedDBKey(e, t, n) {
                    const o = this._getSecureIndexedDBKey(e, t, n);
                    this.isIndexedDBKeyMarked(o) || this.getIndexedDBKeys().push(o)
                }
                unmarkIndexedDBKey(e, t, n) {
                    const o = this._getSecureIndexedDBKey(e, t, n);
                    if (!this.isIndexedDBKeyMarked(o)) return;
                    const i = this.getIndexedDBKeys().indexOf(o);
                    this.getIndexedDBKeys().splice(i, 1)
                }
                save() {
                    if (!this._hasInitialized()) return;
                    const e = {
                        l: this.getLocalStorageKeys(),
                        i: this.getIndexedDBKeys()
                    };
                    window.localStorage.setItem(this._getKeyName(), JSON.stringify(e))
                }
            }
        },
        buT3: function(e, t, n) {
            "use strict";
            n.d(t, "a", (function() {
                return s
            }));
            const o = "LOCAL_STORAGE_MODE/DEFAULT",
                i = "LOCAL_STORAGE_MODE/DRY";
            const s = new class {
                constructor() {
                    this._mode = o
                }
                turnOnDryMode() {
                    this._mode = i
                }
                turnOnDefaultMode() {
                    this._mode = o
                }
                hasItem(e) {
                    return null !== window.localStorage.getItem(e)
                }
                setItem(e, t) {
                    this._mode !== i && window.localStorage.setItem(e, t)
                }
                getItem(e) {
                    return window.localStorage.getItem(e)
                }
                removeItem(e) {
                    window.localStorage.removeItem(e)
                }
                getAllKeyNames() {
                    return Object.keys(window.localStorage)
                }
            }
        },
        cfqX: function(e, t, n) {
            "use strict";
            var o = n("N1xz"),
                i = n("K+9E");
            const s = e => e ? e - o.a.EPOCH : Date.now() - o.a.EPOCH,
                a = e => {
                    var t, n;
                    const i = {
                        duration: null !== (t = e.duration) && void 0 !== t ? t : 0,
                        usageTime: s(e.endAt),
                        data: e.exposeInfo(),
                        processName: o.a.process,
                        systemInfo: o.a.UsageMonitor.getSystemInfo()
                    };
                    null !== (n = e.stackTrace) && void 0 !== n && n.length && (i.stackTrace = e.stackTrace);
                    return [i, ...e.info || []]
                },
                r = e => {
                    let t = 0;
                    if (e.trim())
                        for (let o = 0; o < e.length; o++) t = 31 * t + e.charCodeAt(o), t = (n = t) > 2147483647 || n < -2147483648 ? 4294967295 & n : n;
                    var n;
                    return t
                };
            var c = n("fbdB");
            var d = class {
                    constructor(e) {
                        this.epoch = void 0, this.processName = void 0, this.events = void 0, this.processName = e, this.events = []
                    }
                    getName() {
                        return this.processName
                    }
                    add(e, t) {
                        this.events.some((n => n.name === e && n.time === t)) || this.events.push({
                            name: e,
                            time: t
                        })
                    }
                    saveEpoch(e) {
                        this.epoch || (this.epoch = e), this.add(c.a.bootstrap, e)
                    }
                    getEpoch() {
                        return this.epoch
                    }
                    get(e) {
                        return this.events.filter((t => t.name === e))[0]
                    }
                    getAll() {
                        return this.events
                    }
                    merge(e) {
                        const t = e.getEpoch();
                        t && this.saveEpoch(t), e.getAll().forEach((e => {
                            this.add(e.name, e.time)
                        })), this.events = this.events.sort(((e, t) => e.time - t.time))
                    }
                    hashCode() {
                        return r(`${this.epoch}`) ^ r(this.processName) ^ r(JSON.stringify(this.events))
                    }
                    cleanUp() {
                        this.events = []
                    }
                },
                m = n("KBA3");
            o.a.register(i.a.DATA_MANAGER, class {
                get Logger() {
                    return this._logger || (this._logger = o.a.createLogger("data-manager")), this._logger
                }
                constructor() {
                    this.process = void 0, this.processEvents = {}, this._logger = void 0, this.process = new d(o.a.process), m.a.onDisable((() => this.cleanUp))
                }
                cleanUp() {
                    this.processEvents = {}, this.process.cleanUp()
                }
                getProcess(e) {
                    return e && e !== o.a.process ? (this.processEvents[e] || (this.processEvents[e] = new d(e)), this.processEvents[e]) : this.process
                }
                saveEvent(e, t) {
                    this.getProcess().add(e, t)
                }
                getEvent(e) {
                    return this.getProcess().get(e)
                }
                saveEpoch(e, t) {
                    this.getProcess(e).saveEpoch(t)
                }
                getEpoch(e) {
                    return this.getProcess(e).getEpoch()
                }
                getCurrentProcessData() {
                    return this.process
                }
                getOtherProcessData() {
                    return Object.values(this.processEvents)
                }
                mergeProcessData(e) {
                    this.getProcess(e.getName()).merge(e)
                }
                freezeProcessData(e) {
                    return {
                        epoch: e.getEpoch(),
                        processName: e.getName(),
                        events: e.getAll()
                    }
                }
                hydrateProcessData(e) {
                    try {
                        if (e.processName) {
                            var t;
                            const n = new d(e.processName);
                            return e.epoch && !isNaN(Number(e.epoch)) && n.saveEpoch(Number(e.epoch)), null !== (t = e.events) && void 0 !== t && t.length && e.events.forEach((e => {
                                e.name && !isNaN(Number(e.time)) && n.add(e.name, Number(e.time))
                            })), n
                        }
                    } catch (o) {
                        var n;
                        null === (n = this.Logger) || void 0 === n || n.zsymb(23, 9588, 3e4, "Fail on hydrate process data. ERR {}", String(o))
                    }
                }
                getHashCode() {
                    const e = this.process.hashCode();
                    let t = 0;
                    return Object.values(this.processEvents).forEach((e => t += e.hashCode())), e + t
                }
            });
            var l = n("CHYU");
            var u = class {
                constructor(e) {
                    this.record = void 0, this.record = e
                }
                end(e) {
                    if (!this.record || this.record.isDone) return;
                    const t = Date.now();
                    o.a.MetricManager.endRecord(this.record, t, e)
                }
                pushInfo(e) {
                    this.record && !this.record.isDone && this.record.pushInfo(e)
                }
            };
            var p = class {
                constructor() {
                    this.startingProcess = void 0, this.startingProcess = new Map
                }
                findStartingProcess(e) {
                    return this.startingProcess.get(e)
                }
                saveStartingProcess(e, t) {
                    if (!this.startingProcess.has(e)) {
                        if (this.startingProcess.size >= m.a.getConfig().max_starting_process_dictionary) {
                            const [e] = Array.from(this.startingProcess.keys());
                            this.startingProcess.delete(e)
                        }
                        return this.startingProcess.set(e, t)
                    }
                }
                cleanUp() {
                    this.startingProcess = new Map
                }
            };
            const h = new Set([c.b.start_up_time]);
            var _ = n("MNz0");
            o.a.register(i.a.METRIC_MANAGER, class {
                constructor() {
                    this._records = void 0, this._logger = void 0, this._history = void 0, this._oneTimeMetrics = void 0, this.isEnabled = void 0
                }
                get Logger() {
                    return this._logger || (this._logger = o.a.createLogger("manager")), this._logger
                }
                get records() {
                    return this._records || (this._records = {}), {
                        set: e => {
                            const t = e.key;
                            this._records[t] || (this._records[t] = []), this._records[t].push(e)
                        },
                        get: (e, t, n) => {
                            const i = o.a.MetricFactory.getKey(e, t),
                                s = this._records[i];
                            return null != s && s.length && n ? s.find(n) : null == s ? void 0 : s[0]
                        },
                        delete: e => {
                            const t = e.key;
                            if (this._records[t]) {
                                const n = this._records[t].findIndex((t => t == e));
                                n > -1 && this._records[t].splice(n, 1), 0 === this._records[t].length && delete this._records[t]
                            }
                        },
                        deleteByName: e => {
                            Object.keys(this._records).forEach((t => {
                                t.startsWith(e) && delete this._records[t]
                            }))
                        }
                    }
                }
                get OneTimeMetrics() {
                    return {
                        setStart: e => {
                            this._oneTimeMetrics || (this._oneTimeMetrics = new Set);
                            const t = `${e}_start`;
                            this._oneTimeMetrics.add(t)
                        },
                        hasStart: e => {
                            var t;
                            const n = `${e}_start`;
                            return !(null === (t = this._oneTimeMetrics) || void 0 === t || !t.has(n))
                        },
                        setEnd: e => {
                            this._oneTimeMetrics || (this._oneTimeMetrics = new Set);
                            const t = `${e}_end`;
                            this._oneTimeMetrics.add(t)
                        },
                        hasEnd: e => {
                            var t;
                            const n = `${e}_end`;
                            return !(null === (t = this._oneTimeMetrics) || void 0 === t || !t.has(n))
                        }
                    }
                }
                get history() {
                    return this._history || (this._history = new p), this._history
                }
                ready() {
                    m.a.onConfigChange((() => {
                        o.a.process === l.a.Render && o.a.MetricTransporter.transmitConfig();
                        const e = m.a.getConfig().enable_for_staging_account,
                            t = m.a.getConfig().staging_account;
                        this.isEnabled = m.a.enable || e && t, this.isEnabled || this.cleanUp()
                    }))
                }
                cleanUp() {
                    this._records = {}, this._oneTimeMetrics = new Set, this.history.cleanUp()
                }
                exit() {
                    o.a.process === l.a.Main && (o.a.UsageMonitor.exit(), o.a.LocalStat.export(!0))
                }
                record(e) {
                    if (!o.a.isInstalled() || !o.a.canIUse()) return;
                    if (!1 === this.isEnabled) return;
                    const t = Date.now();
                    o.a.DataManager.saveEvent(e, t), e === c.a.main_ready && o.a.process === l.a.Main && o.a.MetricTransporter.onMainReady(), e === c.a.main_window_finish_load && o.a.process === l.a.Main && o.a.UsageMonitor.onMainFinishLoad();
                    const n = m.a.getConfig().enable_write_log || !1;
                    o.a.process !== l.a.Main && n && o.a.MetricResolver.resolveEvent(e, t)
                }
                handleOneTimeMetric(e, t) {
                    h.has(e) && (t ? this.OneTimeMetrics.setStart(e) : this.OneTimeMetrics.setEnd(e))
                }
                start(e, t) {
                    if (!o.a.canIUse() || this.OneTimeMetrics.hasStart(e)) return this.createSection();
                    if (!1 === this.isEnabled) return this.createSection();
                    const n = Date.now(),
                        i = o.a.SchemaManager.loadSchema(e);
                    if (i.disabled) return this.createSection();
                    i.mode === _.a.ACCEPT_LAST && this.records.deleteByName(e), this.handleOneTimeMetric(e, !0);
                    const s = o.a.MetricFactory.create(e, t, i);
                    return s.setStartAt(n), this.processStackTrace(s), this.records.set(s), this.history.saveStartingProcess(e, o.a.process), this.createSection(s)
                }
                end(e, t, n) {
                    if (!o.a.canIUse() || this.OneTimeMetrics.hasEnd(e)) return;
                    if (!1 === this.isEnabled) return;
                    const i = Date.now(),
                        s = o.a.SchemaManager.loadSchema(e);
                    if (s.disabled) return;
                    this.handleOneTimeMetric(e, !1);
                    let a = this.records.get(e, t, (e => !!(e.startAt && e.startAt <= i)));
                    if (!a && this.isFromCurrentEpoch(e) && (a = this.createPartialFromCurrentEpoch(e, t)), a) this.endRecord(a, i, n);
                    else {
                        if (this.isFromCurrentProcess(e)) return;
                        const a = o.a.MetricFactory.create(e, t, s, !0);
                        a.setEndAt(i), a.pushInfo(n), a.evaluate(), o.a.MetricTransporter.transmit(a)
                    }
                }
                endRecord(e, t, n) {
                    e.isDone || (null != n && e.pushInfo(n), e.setEndAt(t), e.evaluate(), this.processStackTrace(e, !0), this.resolve(e))
                }
                createSection(e) {
                    return new u(e)
                }
                resolve(e) {
                    this.records.delete(e), o.a.MetricResolver.resolve(e, !0)
                }
                onReceivePartialRecords(e) {
                    var t;
                    if (!1 === this.isEnabled) return [];
                    const n = [];
                    return e.forEach((e => {
                        if (this.OneTimeMetrics.hasStart(e.name)) return;
                        this.handleOneTimeMetric(e.name, !0);
                        let t = this.records.get(e.name, e.key, (t => !!(e.type === t.type && t.startAt && e.endAt && t.startAt <= e.endAt)));
                        !t && this.isFromCurrentProcess(e.name) && (t = this.createPartialFromCurrentEpoch(e.name, e.key)), t ? t.isDone || (t.evaluate(e), this.resolve(t)) : n.push(e)
                    })), n.length && (null === (t = this.Logger) || void 0 === t || t.zsymb(11, 10255, 3e4, "[WARN] receive unknownRecords: {}", n)), n
                }
                isFromCurrentEpoch(e, t) {
                    let n = t;
                    return n || (n = o.a.SchemaManager.loadSchema(e)), !!n.startFromEpoch && (Array.isArray(n.fromProcess) ? n.fromProcess.some((e => e === o.a.process)) : !n.fromProcess || n.fromProcess === o.a.process)
                }
                isFromCurrentProcess(e, t) {
                    var n;
                    if (this.history.findStartingProcess(e) === o.a.process) return !0;
                    let i = t;
                    return i || (i = o.a.SchemaManager.loadSchema(e)), !(null === (n = i) || void 0 === n || !n.fromProcess) && (Array.isArray(i.fromProcess) ? i.fromProcess.some((e => e === o.a.process)) : i.fromProcess === o.a.process)
                }
                createPartialFromCurrentEpoch(e, t) {
                    const n = o.a.SchemaManager.loadSchema(e),
                        i = o.a.MetricFactory.create(e, t, n);
                    return i.setStartAt(o.a.EPOCH), this.records.set(i), i
                }
                processStackTrace(e, t) {
                    if (t || e.stackTrace) {
                        if (t && e.stackTrace) {
                            const t = e.getSchema();
                            let n = !1;
                            null != t && t.showStackTrace && (n = "boolean" == typeof t.showStackTrace ? t.showStackTrace : t.showStackTrace(...a(e))), n || e.deleteStackTrace()
                        }
                    } else {
                        let t = [];
                        const n = (new Error).stack.split("\n");
                        0 === n[0].indexOf("Error") && (t = n.slice(1)), t = t.slice(3).map((e => e.replace(/\s+at\s+/, ""))), e.addStackTrace(t)
                    }
                }
            });
            var g = n("rFEu"),
                f = n("AoYG");
            o.a.register(i.a.METRIC_SCHEMA_MANAGER, class {
                constructor() {
                    this.metricSchemas = void 0, this._customMetrics = void 0, this.isReady = void 0
                }
                get customMetrics() {
                    return this._customMetrics || (this._customMetrics = new Map), this._customMetrics
                }
                ready() {
                    if (this.isReady) return;
                    this.metricSchemas = new Map;
                    n("K6Wi").default.getSchemas().forEach((e => {
                        e.getMetrics().forEach((e => {
                            this.metricSchemas.set(e.name, e)
                        }))
                    })), this.isReady = !0, m.a.onDisable((() => this.cleanUp))
                }
                cleanUp() {
                    this.metricSchemas.clear(), this._customMetrics && this._customMetrics.clear()
                }
                loadSchema(e) {
                    this.isReady || this.ready();
                    const t = this.metricSchemas.get(e);
                    if (t) return t;
                    const n = Object(g.b)(e);
                    return this.customMetrics.set(e, n), n
                }
                getMemoryUsageSchemas() {
                    this.isReady || this.ready();
                    let e = [];
                    return this.metricSchemas.forEach((t => {
                        t.type === f.a.MEMORY && e.push(t)
                    })), e
                }
                getCPUUsageSchemas() {
                    this.isReady || this.ready();
                    let e = [];
                    return this.metricSchemas.forEach((t => {
                        t.type === f.a.CPU && e.push(t)
                    })), e
                }
                hasUsageSchemas() {
                    return !!this.getMemoryUsageSchemas().length || !!this.getCPUUsageSchemas().length
                }
            });
            var P = n("VTBJ"),
                I = n("dFSO");
            class w {
                constructor(e) {
                    this.schema = void 0, this.id = void 0, this.name = void 0, this.key = void 0, this.type = void 0, this.startAt = void 0, this.endAt = void 0, this.stackTrace = void 0, this.duration = void 0, this.durationText = void 0, this.version = void 0, this.isDone = void 0, this.info = void 0, this.usageTime = void 0, this.usageTimeText = void 0, this.data = void 0, this.id = e.id, this.name = e.name, this.key = e.key, this.type = e.type || f.a.TIME, this.schema = e.metricSchema, this.version = e.version || w.DEFAULT_VERSION
                }
                setStartAt(e) {
                    this.startAt = e
                }
                setEndAt(e) {
                    this.endAt = e
                }
                setDuration(e) {
                    this.duration = e
                }
                addStackTrace(e) {
                    this.stackTrace = [...this.stackTrace || [], ...e]
                }
                deleteStackTrace() {
                    this.stackTrace = void 0
                }
                exposeInfo() {
                    var e;
                    return null !== (e = this.data) && void 0 !== e ? e : null
                }
                setData(e) {
                    this.data = e
                }
                resolve() {
                    this.isDone = !0
                }
                getSchema() {
                    return this.schema
                }
                pushInfo(e) {
                    this.info || (this.info = []), this.info.push(e)
                }
                evaluate(e) {
                    this.isDone || (e && e.endAt && (this.endAt = e.endAt), this.startAt && this.endAt && (this.duration = this.endAt - this.startAt), this.duration && (this.durationText = Object(I.f)(this.duration)), this.endAt && (this.usageTime = s(this.endAt), this.usageTime && (this.usageTimeText = Object(I.f)(this.usageTime))))
                }
                clone(e) {
                    null != e.startAt && (this.startAt = Number(e.startAt)), null != e.endAt && (this.endAt = Number(e.endAt)), null != e.duration && (this.duration = Number(e.duration)), null != e.data && (this.data = e.data), this.durationText = e.durationText, this.isDone = !0 === e.isDone, this.usageTime = e.usageTime, this.usageTimeText = e.usageTimeText;
                    try {
                        e.stackTrace && (this.stackTrace = e.stackTrace), e.info && (this.info = JSON.parse(e.info) || [])
                    } catch (t) {}
                }
            }
            w.DEFAULT_VERSION = 1;
            var M = w;
            class y extends M {
                constructor(e) {
                    super(e), this.type = f.a.TIME, this.version = y.VERSION
                }
                evaluate(e) {
                    super.evaluate(e)
                }
                exposeInfo() {
                    return {
                        name: this.name,
                        duration: this.duration,
                        startAt: this.startAt,
                        endAt: this.endAt
                    }
                }
                resolve() {
                    this.isDone || (this.info = [...this.info || [], {
                        duration: this.duration,
                        startAt: this.startAt,
                        endAt: this.endAt
                    }], super.resolve())
                }
            }
            y.VERSION = 1;
            var v = y;
            class b extends M {
                constructor(e) {
                    super(e), this.usage = void 0, this.passedTime = void 0, this.type = f.a.USAGE, this.version = b.VERSION
                }
                evaluate() {
                    super.evaluate()
                }
                exposeInfo() {
                    return {
                        usage: this.usage,
                        passedTime: this.passedTime
                    }
                }
                resolve() {
                    super.resolve()
                }
                setData(e, t) {
                    this.usage = e, this.passedTime = t
                }
            }
            b.VERSION = 1;
            var D, q = b;
            o.a.register(i.a.METRIC_FACTORY, class {
                    constructor() {
                        this.idCounter = void 0
                    }
                    generateId() {
                        return null == this.idCounter && (this.idCounter = 0), this.idCounter++, this.idCounter
                    }
                    getKey(e, t) {
                        return e + (null != t ? `_${t}` : "")
                    }
                    create(e, t, n, o) {
                        let i;
                        const s = (null == n ? void 0 : n.type) || f.a.TIME;
                        return i = s === f.a.CPU || s === f.a.MEMORY ? new q({
                            id: this.generateId(),
                            name: e,
                            key: this.getKey(e, t),
                            metricSchema: n
                        }) : s === f.a.TIME ? new v({
                            id: o ? 0 : this.generateId(),
                            name: e,
                            key: this.getKey(e, t),
                            metricSchema: n
                        }) : new M({
                            id: o ? 0 : this.generateId(),
                            type: s,
                            name: e,
                            key: this.getKey(e, t),
                            metricSchema: n
                        }), i
                    }
                    clone(e) {
                        let t;
                        const n = (null == e ? void 0 : e.type) || f.a.TIME,
                            o = {
                                id: this.generateId(),
                                type: n,
                                name: e.name,
                                key: e.key,
                                version: e.version
                            };
                        return t = n === f.a.USAGE ? new q(Object(P.a)({}, o)) : n === f.a.TIME ? new v(Object(P.a)({}, o)) : new M(Object(P.a)({}, o)), t.clone(e), t
                    }
                }),
                function(e) {
                    e.TRANSMIT_RECORDS = "TRANSMIT_RECORDS", e.TRANSMIT_ALL = "TRANSMIT_ALL", e.TRANSMIT_EVENTS = "TRANSMIT_EVENTS", e.TRANSMIT_CONFIG = "TRANSMIT_CONFIG", e.TRANSMIT_FPS = "TRANSMIT_FPS", e.TRANSMIT_FPS_SECTION = "TRANSMIT_FPS_SECTION", e.REGISTER = "REGISTER", e.SEND_STATS = "SEND_STATS"
                }(D || (D = {}));
            var S = D;
            var A = class {
                constructor(e) {
                    this.messageChannel = void 0, this.transportDataHolder = void 0, this.sending = void 0, this.sendingTimeout = void 0, this.idleRequestId = void 0, this.lastSentDataManagerHash = void 0, this.requestIdle = e => {
                        try {
                            var t;
                            if (o.a.process !== l.a.Main)
                                if (window && "function" == typeof(null === (t = window) || void 0 === t ? void 0 : t.requestIdleCallback)) return window.requestIdleCallback(e)
                        } catch (n) {}
                        return setTimeout((() => {
                            e()
                        }), 1)
                    }, this.cancelRequestIdle = () => {
                        try {
                            var e;
                            if (o.a.process !== l.a.Main)
                                if ("number" == typeof this.idleRequestId) return window && "function" == typeof(null === (e = window) || void 0 === e ? void 0 : e.requestIdleCallback) && window.cancelIdleCallback(this.idleRequestId), void(this.idleRequestId = void 0)
                        } catch (t) {}
                        clearTimeout(this.idleRequestId)
                    }, this.messageChannel = e, this.transportDataHolder = {}, this.sending = !1
                }
                send(e, t, n, o) {
                    var i;
                    if (!this.messageChannel) return;
                    let s = n,
                        a = e;
                    if (null != (null == o ? void 0 : o.fromClientId) && (a += `_${o.fromClientId}`), null != (null == o ? void 0 : o.toClientId) && (a += `_${o.toClientId}`), Array.isArray(n)) {
                        var r, c;
                        let e = [];
                        const o = null === (r = this.transportDataHolder[a]) || void 0 === r || null === (c = r.data) || void 0 === c ? void 0 : c[t];
                        Array.isArray(o) && null != o && o.length && (e = [...o, ...n], s = e)
                    } else if ("object" == typeof n) {
                        var d, m;
                        const e = null === (d = this.transportDataHolder[a]) || void 0 === d || null === (m = d.data) || void 0 === m ? void 0 : m[t];
                        e && (s = Object(P.a)(Object(P.a)({}, e || {}), s))
                    }
                    const l = {
                        action: e,
                        data: Object(P.a)(Object(P.a)({}, (null === (i = this.transportDataHolder[a]) || void 0 === i ? void 0 : i.data) || {}), {}, {
                            [t]: s
                        }),
                        fromClientId: null == o ? void 0 : o.fromClientId,
                        toClientId: null == o ? void 0 : o.toClientId
                    };
                    this.transportDataHolder[a] = l, this.startSend()
                }
                exit() {
                    this.sending && (clearTimeout(this.sendingTimeout), this.cancelRequestIdle())
                }
                startSend() {
                    this.sending || (this.sending = !0, clearTimeout(this.sendingTimeout), this.cancelRequestIdle(), this.sendingTimeout = setTimeout((() => {
                        this.idleRequestId = this.requestIdle((() => {
                            if (this.messageChannel) {
                                const e = this.transportDataHolder;
                                this.transportDataHolder = {};
                                const t = this.getExtraTransferInfo();
                                let n = !!t;
                                const o = [];
                                Object.values(e).forEach((e => {
                                    const i = {
                                        action: e.action,
                                        data: e.data,
                                        fromClientId: null == e ? void 0 : e.fromClientId,
                                        toClientId: null == e ? void 0 : e.toClientId
                                    };
                                    n && "object" == typeof i.data && (i.data.extraInfo = t, n = !1), o.push(i)
                                })), o.length && this.messageChannel.send(o)
                            }
                            this.sending = !1
                        }))
                    }), 3e3))
                }
                getExtraTransferInfo() {
                    if (this.lastSentDataManagerHash !== o.a.DataManager.getHashCode()) {
                        this.lastSentDataManagerHash = o.a.DataManager.getHashCode();
                        const e = o.a.DataManager.getCurrentProcessData();
                        return {
                            processData: o.a.DataManager.freezeProcessData(e)
                        }
                    }
                }
            };
            var T, R = class {
                constructor() {
                    this.messageChannel = void 0, this.sender = void 0, this.onMessage = e => {
                        e.forEach((e => {
                            if (o.a.process === l.a.Main) {
                                var t;
                                const {
                                    fromClientId: c,
                                    action: u,
                                    data: p
                                } = e;
                                var n;
                                if (this.onReceiveProcessEventData(null == p || null === (t = p.extraInfo) || void 0 === t ? void 0 : t.processData), u === S.TRANSMIT_RECORDS) {
                                    if (null != p && null !== (n = p.records) && void 0 !== n && n.length) {
                                        const e = [];
                                        p.records.forEach((t => {
                                            const n = this.hydrateMetricRecord(t);
                                            n && e.push(n)
                                        }));
                                        const t = o.a.MetricManager.onReceivePartialRecords(e);
                                        if (t.length) {
                                            const e = this.messageChannel.getClients().filter((e => e.id !== c));
                                            if (e.length)
                                                for (const n of e) {
                                                    var i;
                                                    null === (i = this.sender) || void 0 === i || i.send(S.TRANSMIT_RECORDS, "records", t, {
                                                        fromClientId: c,
                                                        toClientId: n.id
                                                    })
                                                }
                                        }
                                    }
                                } else if (u === S.REGISTER) {
                                    var s;
                                    if ((null == p ? void 0 : p.processName) !== l.a.Render) null === (s = this.sender) || void 0 === s || s.send(S.TRANSMIT_CONFIG, "config", m.a.getConfig(), {
                                        toClientId: c
                                    })
                                } else if (u === S.TRANSMIT_ALL) {
                                    var a;
                                    null != p && null !== (a = p.records) && void 0 !== a && a.length && p.records.forEach((e => {
                                        const t = this.hydrateMetricRecord(e);
                                        t && o.a.LocalStat.record(t)
                                    }))
                                } else if (u === S.SEND_STATS) try {
                                        const e = p.processStats;
                                        e && o.a.UsageMonitor.onReceiveProcessStats(e)
                                    } catch (d) {} else if (u === S.TRANSMIT_EVENTS) this.onReceiveProcessEventData(p.processData);
                                    else if (u === S.TRANSMIT_CONFIG) {
                                    (null == p ? void 0 : p.config) && m.a.mergeSetting(p.config);
                                    const e = this.messageChannel.getClients().filter((e => e.id !== c));
                                    if (e.length)
                                        for (const t of e) {
                                            var r;
                                            null === (r = this.sender) || void 0 === r || r.send(S.TRANSMIT_CONFIG, "config", m.a.getConfig(), {
                                                toClientId: t.id
                                            })
                                        }
                                } else u === S.TRANSMIT_FPS ? null != p && p.fps && o.a.LocalStat.recordFps(p.fps) : u === S.TRANSMIT_FPS_SECTION && null != p && p.fps && o.a.LocalStat.recordFpsSection(p.fps)
                            } else {
                                const {
                                    action: t,
                                    data: n
                                } = e;
                                var c;
                                if (t === S.TRANSMIT_RECORDS) null != n && null !== (c = n.records) && void 0 !== c && c.length && o.a.MetricManager.onReceivePartialRecords(n.records);
                                else t === S.TRANSMIT_CONFIG && (null == n ? void 0 : n.config) && m.a.mergeSetting(n.config)
                            }
                        }))
                    }
                }
                listen(e) {
                    var t;
                    this.messageChannel = e, null === (t = this.messageChannel) || void 0 === t || t.onMessage(this.onMessage)
                }
                bindSender(e) {
                    this.sender = e
                }
                onReceiveProcessEventData(e) {
                    if (e) {
                        const t = o.a.DataManager.hydrateProcessData(e);
                        t && o.a.DataManager.mergeProcessData(t)
                    }
                }
                hydrateMetricRecord(e) {
                    try {
                        return o.a.MetricFactory.clone(e)
                    } catch (t) {}
                }
            };
            ! function(e) {
                e.RENDERER = "metricz-renderer", e.MAIN = "metricz-main"
            }(T || (T = {}));
            o.a.register(i.a.METRIC_TRANSPORTER, class {
                constructor() {
                    this.messageChannel = void 0, this.isReady = !1, this.registered = void 0, this._sender = void 0, this._receiver = void 0, this._logger = void 0
                }
                get Logger() {
                    return this._logger || (this._logger = o.a.createLogger("transporter")), this._logger
                }
                createMessageChannel() {
                    if (this.messageChannel) return;
                    let e;
                    try {
                        0
                    } catch (t) {}
                    this.receiver.listen(this.messageChannel)
                }
                get sender() {
                    return this._sender || (this._sender = new A(this.messageChannel)), this._sender
                }
                get receiver() {
                    return this._receiver || (this._receiver = new R), this._receiver.bindSender(this.sender), this._receiver
                }
                ready() {
                    this.isReady || (this.isReady = !0, this.createMessageChannel(), this.checkConnection())
                }
                onMainReady() {
                    this.createMessageChannel()
                }
                transmit(e) {
                    if (o.a.process !== l.a.Main) {
                        const t = [this.freezeMetricRecord(e)];
                        this.sender.send(S.TRANSMIT_RECORDS, "records", t)
                    }
                }
                checkConnection() {
                    this.registered || o.a.process === l.a.Main || this.registered || (this.registered = !0, this.sender.send(S.REGISTER, "processName", o.a.process))
                }
                transmitProcessStats(e) {
                    o.a.process !== l.a.Main && this.sender.send(S.SEND_STATS, "processStats", e)
                }
                transmitRecords(e) {
                    if (o.a.process !== l.a.Main) {
                        const t = e.map((e => this.freezeMetricRecord(e)));
                        this.sender.send(S.TRANSMIT_ALL, "records", t)
                    }
                }
                transmitEvents() {
                    this.sender.send(S.TRANSMIT_EVENTS, "extraInfo", {})
                }
                transmitConfig() {
                    this.sender.send(S.TRANSMIT_CONFIG, "config", m.a.getConfig())
                }
                transmitFps(e, t, n) {
                    this.sender.send(S.TRANSMIT_FPS, "fps", Object(P.a)({
                        processName: o.a.process,
                        recordAt: t,
                        usageTime: n
                    }, e))
                }
                transmitFpsSection(e, t) {
                    this.sender.send(S.TRANSMIT_FPS_SECTION, "fps", Object(P.a)({
                        processName: o.a.process,
                        taskKey: t
                    }, e))
                }
                exit() {
                    this.sender.exit()
                }
                freezeMetricRecord(e) {
                    return JSON.parse(JSON.stringify(Object(P.a)(Object(P.a)({}, e), {}, {
                        info: JSON.stringify(e.info)
                    })))
                }
            });
            n("ncfp");
            var x = class {
                constructor() {
                    this.qosLogControl = void 0, this.reservedLogs = void 0, this.enabled = !0, this.tsMaxReserved = void 0, this.MAX_RESERVED_LOGS = 1e3, this.MAX_TIMEOUT_DISABLE = Object(I.g)("5m")
                }
                register(e) {
                    this.qosLogControl = e
                }
                send(e) {
                    var t, n, i, s;
                    this.qosLogControl ? o.a.process === l.a.Main ? null !== (t = this.qosLogControl) && void 0 !== t && t._readyQos ? (this.handleReservedLogs(), null === (n = this.qosLogControl) || void 0 === n || n.logQos({
                        success: e.success,
                        commandId: e.cmdId,
                        subCommandId: e.subCmdId || 0,
                        duration: e.duration,
                        errorCode: (null == e ? void 0 : e.errorCode) || 0,
                        params: e.params,
                        startTime: e.startTime
                    })) : this.reserve(e) : (this.handleReservedLogs(), e.success ? null === (i = this.qosLogControl) || void 0 === i || i.increaseSuccess(e.cmdId, e.subCmdId, e.duration, e.params) : null === (s = this.qosLogControl) || void 0 === s || s.increaseFailed(e.cmdId, e.subCmdId, e.duration, e.errorCode, e.startTime, e.params)) : this.reserve(e)
                }
                handleReservedLogs() {
                    var e;
                    if (null !== (e = this.reservedLogs) && void 0 !== e && e.length) {
                        const e = this.reservedLogs;
                        this.reservedLogs = [], e.forEach((e => {
                            this.send(e)
                        }))
                    }
                }
                reserve(e) {
                    this.reservedLogs && this.reservedLogs.length >= this.MAX_RESERVED_LOGS && (this.reservedLogs.shift(), this.tsMaxReserved ? Date.now() - this.tsMaxReserved >= this.MAX_TIMEOUT_DISABLE && (this.enabled = !1) : this.tsMaxReserved = Date.now()), this.enabled && (this.reservedLogs || (this.reservedLogs = []), this.reservedLogs.push(e))
                }
            };
            var N = class {
                constructor() {
                    this._qosSender = void 0, this._logger = void 0, this.pendingQosLogs = void 0, this.disabled = void 0, this.MAX_LOGS_ROLL_OUT = 1e3
                }
                get Logger() {
                    return this._logger || (this._logger = o.a.createLogger("qos")), this._logger
                }
                get qosSender() {
                    return this._qosSender || (this._qosSender = new x), this._qosSender
                }
                registerQosControl(e) {
                    this.qosSender.register(e)
                }
                checkEnableSubmitLog() {
                    var e;
                    const t = m.a.getConfig().enable_submit_qos,
                        n = (m.a.getConfig().submit_qos_except_dev, m.a.getConfig().enable_for_staging_account),
                        o = m.a.getConfig().staging_account;
                    let i = (m.a.enable || n && o) && t;
                    var s;
                    (null === (e = this.Logger) || void 0 === e || e.zsymb(3, 10257, 3e4, "isEnabled: {}", i), i) ? null !== (s = this.pendingQosLogs) && void 0 !== s && s.length && this.pendingQosLogs.forEach((e => {
                        this.logQos(e)
                    })): (this.disabled = !0, this.pendingQosLogs = [])
                }
                send(e, t) {
                    if (this.disabled) return;
                    if (!t.qos || t.disabled || !e.isDone) return;
                    const n = {
                        success: !0,
                        cmdId: t.qos.cmdId,
                        subCmdId: t.qos.subCmdId || 0,
                        duration: e.duration,
                        startTime: e.startAt,
                        params: [...e.info || []]
                    };
                    m.a.getConfig().enable_submit_qos ? this.logQos(n) : (this.pendingQosLogs || (this.pendingQosLogs = []), this.pendingQosLogs.length >= this.MAX_LOGS_ROLL_OUT && this.pendingQosLogs.shift(), this.pendingQosLogs.push(n))
                }
                logQos(e) {
                    try {
                        this.qosSender.send(e)
                    } catch (n) {
                        var t;
                        null === (t = this.Logger) || void 0 === t || t.zsymb(20, 10257, 30001, "metric logQos ERR: {}", n)
                    }
                }
            };
            o.a.register(i.a.METRIC_RESOLVER, class {
                get Logger() {
                    return this._logger || (this._logger = o.a.createLogger("resolver")), this._logger
                }
                get records() {
                    return {
                        push: e => {
                            this._records || (this._records = []), this._records.push(e)
                        },
                        getAll: () => this._records || [],
                        clear: () => {
                            var e;
                            (null === (e = this._records) || void 0 === e ? void 0 : e.length) && (this._records = [])
                        }
                    }
                }
                get qosManager() {
                    return this._qosManager || (this._qosManager = new N), this._qosManager
                }
                constructor() {
                    this._records = void 0, this._logger = void 0, this._qosManager = void 0, this.lastTransmit = void 0, this.isReady = void 0, this.configSynced = void 0, this.timerSendRecord = void 0, this.MAX_TRANSMIT_TIMEOUT = 5e3, this.lastTransmit = o.a.EPOCH
                }
                ready() {
                    this.isReady || (m.a.onConfigChange((() => {
                        this.configSynced = !0, this.handleRecordsByConfig(), this.qosManager.checkEnableSubmitLog()
                    })), this.isReady = !0)
                }
                handleRecordsByConfig() {
                    const e = m.a.getConfig().enable_for_staging_account,
                        t = m.a.getConfig().staging_account,
                        n = m.a.getConfig().enable_write_log || !1;
                    if ((m.a.enable || e && t) && n) {
                        const e = Date.now();
                        this.checkNeedTransmitToMain() ? (this.timerSendRecord && clearTimeout(this.timerSendRecord), this.transmitRecords(), this.lastTransmit = e) : this.records.getAll().length && e - this.lastTransmit < this.MAX_TRANSMIT_TIMEOUT && (this.timerSendRecord && clearTimeout(this.timerSendRecord), this.timerSendRecord = setTimeout((() => {
                            this.transmitRecords(), this.lastTransmit = Date.now()
                        }), this.MAX_TRANSMIT_TIMEOUT - (e - this.lastTransmit)))
                    } else this.records.clear()
                }
                checkNeedTransmitToMain() {
                    return this.records.getAll().length >= m.a.getConfig().max_cache_records_resolved || Date.now() - this.lastTransmit >= this.MAX_TRANSMIT_TIMEOUT
                }
                resolve(e, t) {
                    void 0 === t && (t = !1), e.isDone || e.resolve(), this.analyze(e), t && o.a.process === l.a.Main && o.a.LocalStat.record(e)
                }
                resolveEvent(e, t) {
                    o.a.MetricTransporter.transmitEvents()
                }
                exportAll() {
                    this.transmitRecords()
                }
                registerQosControl(e) {
                    this.qosManager.registerQosControl(e)
                }
                exit() {
                    this.timerSendRecord && clearTimeout(this.timerSendRecord)
                }
                transmitRecords() {
                    const e = this.records.getAll();
                    this.records.clear(), e.length && o.a.MetricTransporter.transmitRecords(e)
                }
                analyze(e) {
                    const t = e.getSchema();
                    if (null == t || !t.statement) return;
                    t.statement.getAll().forEach((t => {
                        this.scanStatement(t, e)
                    }))
                }
                scanStatement(e, t) {
                    let n;
                    const o = e => {
                        if (e.disabled) return;
                        let n;
                        var i;
                        if (this.checkStatPoint(e, t) && (n = e, null !== (i = e.points) && void 0 !== i && i.length))
                            for (const t of e.points) {
                                const e = o(t);
                                if (e) {
                                    n = e;
                                    break
                                }
                            }
                        return n
                    };
                    for (const i of e.points)
                        if (n = o(i), n && this.qosManager.send(t, n), "sequential" === e.checkingMode && n) break
                }
                checkStatPoint(e, t) {
                    const n = a(t);
                    return "boolean" == typeof e.condition ? e.condition : e.condition(...n)
                }
            });
            var E = n("5Drw"),
                $ = n("Na1p");
            o.a.register(i.a.USAGE_MONITOR, class {
                constructor() {
                    this._timelineEngine = void 0, this.timeline = void 0, this._logger = void 0, this._processMonitor = void 0, this._appUsageMonitor = void 0, this._isReady = void 0, this.webSystemInfo = void 0, this.submittedSystemInfo = void 0, this.execTimeNode = e => {
                        const {
                            metrics: t
                        } = e, n = t.filter((e => e.type === f.a.CPU || e.type === f.a.MEMORY));
                        var o;
                        n.length && (null === (o = this.processMonitor) || void 0 === o || o.recordAtTime(e, n))
                    }, this.timeline = []
                }
                get Logger() {
                    return this._logger || (this._logger = o.a.createLogger("usage-monitor")), this._logger
                }
                get timelineEngine() {
                    return this._timelineEngine || (this._timelineEngine = new E.b, this._timelineEngine.onMessage(this.execTimeNode)), this._timelineEngine
                }
                get processMonitor() {
                    if (!this._processMonitor) try {
                        let e;
                        e = o.a.process === l.a.Main ? n("xDBg").default : n("gpfy").default, this._processMonitor = new e
                    } catch (e) {}
                    return this._processMonitor
                }
                get appUsageMonitor() {
                    if (!this._appUsageMonitor) try {
                        let e = n("w46u").default;
                        this._appUsageMonitor = new e
                    } catch (e) {}
                    return this._appUsageMonitor
                }
                getSystemInfo() {
                    return this.webSystemInfo
                }
                async loadWebSystemInfo() {
                    try {
                        var e, t;
                        if (null !== (e = navigator) && void 0 !== e && null !== (t = e.userAgentData) && void 0 !== t && t.getHighEntropyValues) {
                            const e = await navigator.userAgentData.getHighEntropyValues(["architecture"]);
                            null != e && e.architecture && (this.webSystemInfo = {
                                arch: e.architecture
                            })
                        }
                    } catch (n) {}
                }
                ready() {
                    this._isReady || (this.loadWebSystemInfo(), o.a.SchemaManager.hasUsageSchemas() && (o.a.process !== l.a.Main || $.a.start()), m.a.onConfigChange((() => {})), this._isReady = !0)
                }
                onMainFinishLoad() {
                    o.a.process === l.a.Main && setTimeout((() => {
                        try {
                            this.checkToSubmitSystemInfo()
                        } catch (e) {}
                    }), 1e3)
                }
                checkToSubmitSystemInfo() {}
                startUp() {
                    const e = o.a.SchemaManager.getMemoryUsageSchemas(),
                        t = o.a.SchemaManager.getCPUUsageSchemas(),
                        n = e.filter((e => {
                            var t;
                            return null === (t = e.timeline) || void 0 === t ? void 0 : t.timeNodes.length
                        })),
                        i = t.filter((e => {
                            var t;
                            return null === (t = e.timeline) || void 0 === t ? void 0 : t.timeNodes.length
                        })),
                        s = [];
                    [...n, ...i].forEach((e => {
                        var t;
                        ((null === (t = e.timeline) || void 0 === t ? void 0 : t.timeNodes) || []).forEach((t => {
                            let {
                                time: n
                            } = t;
                            const o = s.find((e => e.time === n));
                            if (o) o.add(e);
                            else {
                                const t = new E.a(n);
                                t.add(e), s.push(t)
                            }
                        }))
                    })), s.length && (this.timeline = s, this.timelineEngine.startUp(s))
                }
                onReceiveProcessStats(e) {
                    var t, n;
                    null != e && e.pid && e.name !== l.a.Main && (null === (t = this.processMonitor) || void 0 === t || null === (n = t.combineRendererStats) || void 0 === n || n.call(t, e))
                }
                exit() {
                    this.timelineEngine.stop()
                }
            });
            const O = g.a.time("10s"),
                B = [g.a.time("1m"), g.a.time("5m"), g.a.time("10m"), g.a.time("20m"), g.a.time("30m"), g.a.time("1h"), g.a.time("2h"), g.a.time("4h"), g.a.time("6h"), g.a.time("8h")];
            o.a.register(i.a.LOCAL_STAT, class {
                constructor() {
                    this.tasks = [], this.processAppUsage = {}, this.totalAppUsage = {}, this.queryStatistics = {
                        totalRequest: 0,
                        totalExecDuration: 0,
                        inUse: {}
                    }, this.processStats = {}, this.attentionQueries = [], this.fpsInfo = void 0, this.fpsSectionDropInfo = void 0, this.fpsDropInfo = void 0, this.hasChange = {
                        queryStatistics: !1,
                        fpsInfo: !1
                    }, this.writing = !1, this.savedProcessDataHash = 0, this.timeoutLog = void 0, this.writerEnabled = void 0, this.isReady = void 0, this.WHITELIST_MEMORY = new Set(["rss", "heapTotal", "heapUsed", "heapSizeLimit"]), this.writeLog = async () => {
                        if (o.a.process !== l.a.Main) return;
                        const e = this.getWriter();
                        try {
                            var t, n;
                            const i = () => Object(I.e)(Date.now());
                            if (this.tasks.length) {
                                const t = this.tasks;
                                this.tasks = [];
                                let n = `------ updated at: ${i()} ------\n`;
                                t.forEach(((e, t) => {
                                    n += `${t+1}.\n`, n += this.writeContentFromObject(e), n += "\n\n"
                                })), n += "\n", await e.append("metrics", n)
                            }
                            if (Object.keys(this.processAppUsage).length) {
                                const t = this.processAppUsage;
                                this.processAppUsage = {};
                                let n = `------ updated at: ${i()} ------\n`;
                                for (const e in t) {
                                    n += `\n- Usage after ${Object(I.f)(Number(e))}:`;
                                    const o = this.totalAppUsage[e];
                                    o && (n += `+--- total: cpu: ${o.cpuTotal.toFixed(2)}% | mem: ${Object(I.d)(o.memoryTotal)}`);
                                    for (const i of t[e]) {
                                        let e = "";
                                        for (const t in i) e += `${t}:${i[t]} | `;
                                        n += `\n+ ${e}`
                                    }
                                }
                                n += "\n\n", this.totalAppUsage = {}, await e.append("app-usage", n)
                            }
                            if (Object.keys(this.processStats).length) {
                                const t = this.processStats;
                                this.processStats = {};
                                for (const n in t) {
                                    let o = `------ updated at: ${i()} ------\n`;
                                    t[n].forEach((e => {
                                        o += this.writeContentFromObject(e), o += "\n"
                                    })), o += "\n\n\n", await e.append(`usage.${n}`, o)
                                }
                            }
                            if (this.hasProcessDataChanged()) {
                                this.savedProcessDataHash = o.a.DataManager.getHashCode();
                                const t = [o.a.DataManager.getCurrentProcessData(), ...o.a.DataManager.getOtherProcessData()];
                                let n = `------ updated at: ${i()} ------\n`;
                                t.forEach((e => {
                                    n += `\n* process: ${e.getName()}`;
                                    e.getAll().forEach((e => {
                                        n += `\n  - ${e.name} : ${e.time} (${Object(I.e)(e.time)})`
                                    })), n += "\n"
                                })), await e.write("actions", n)
                            }
                            if (this.hasChange.queryStatistics) {
                                this.hasChange.queryStatistics = !1;
                                let t = `------ updated at: ${i()} ------\n`;
                                t += `\nTotal request: ${this.queryStatistics.totalRequest}`, t += `\nAverage duration: ${Object(I.f)(this.queryStatistics.totalExecDuration/this.queryStatistics.totalRequest)}`, Object.keys(this.queryStatistics.inUse).length && (t += "\n- By usage time:");
                                for (const e in this.queryStatistics.inUse) Number(e) <= Date.now() - o.a.EPOCH && (t += `\n + ${Object(I.f)(Number(e))}:`, t += `\n   Total request: ${this.queryStatistics.inUse[e].totalRequest}`, t += `\n   Average duration: ${Object(I.f)(this.queryStatistics.inUse[e].totalExecDuration/this.queryStatistics.inUse[e].totalRequest)}`);
                                t += "\n\n", await e.write("query-stats", t)
                            }
                            if (this.attentionQueries.length) {
                                const t = this.attentionQueries;
                                this.attentionQueries = [];
                                let n = `------ updated at: ${i()} ------\n`;
                                const o = e => Object.entries(e).map((e => {
                                    let [t, n] = e;
                                    return `${t}=${JSON.stringify(n)}`
                                })).join(",");
                                t.forEach((e => {
                                    var t;
                                    const i = null !== (t = e.info) && void 0 !== t && t[1] ? o(e.info[1]) : "";
                                    n += `\n* ${i||e.id}: `, n += this.writeContentFromObject(e), n += "\n"
                                })), n += "\n\n\n", await e.append("attention-queries", n)
                            }
                            if (this.hasChange.fpsInfo && this.fpsInfo) {
                                this.hasChange.fpsInfo = !1;
                                let t = `------ updated at: ${i()} ------\n`;
                                t += `* process: ${this.fpsInfo.processName} | usageTime: ${Object(I.f)(this.fpsInfo.usageTime)} | recordAt: ${Object(I.e)(this.fpsInfo.recordAt)}`, t += `\n  + fps: ${this.fpsInfo.fps}`, t += `\n  + avgFps: ${this.fpsInfo.avgFps}`, t += `\n  + maxFps: ${this.fpsInfo.maxFps}`, t += `\n  + history: ${JSON.stringify(this.fpsInfo.fpsColumns)}`, t += "\n\n", await e.append("fps", t)
                            }
                            if (null !== (t = this.fpsDropInfo) && void 0 !== t && t.length) {
                                const t = [...this.fpsDropInfo];
                                this.fpsDropInfo = void 0;
                                let n = `------ updated at: ${i()} ------\n`;
                                t.forEach((e => {
                                    n += `* process: ${e.processName} ${e.startAt?`| recordAt: ${Object(I.e)(e.startAt)}`:""}`, n += `\n  + lowestDrop: ${e.lowestDrop} FPS`, n += `\n  + recoverTime: ${e.recoverTime}`, n += `\n  + beforeDrop: ${e.beforeDrop} FPS`, n += `\n  + afterRecover: ${e.afterRecover} FPS`, e.startAt && (n += `\n  + startAt: ${Object(I.e)(e.startAt)}`), e.endAt && (n += `\n  + endAt: ${Object(I.e)(e.endAt)}`), n += "\n"
                                })), n += "\n\n", await e.append("fps-drop", n)
                            }
                            if (null !== (n = this.fpsSectionDropInfo) && void 0 !== n && n.length) {
                                const t = [...this.fpsSectionDropInfo];
                                this.fpsSectionDropInfo = void 0;
                                let n = `------ updated at: ${i()} ------\n`;
                                t.forEach((e => {
                                    n += `\n* ${e.taskKey} `, n += `\n  + lowestDrop: ${e.lowestDrop} FPS`, n += `\n  + recoverTime: ${e.recoverTime}`, n += `\n  + beforeDrop: ${e.beforeDrop} FPS`, n += `\n  + afterRecover: ${e.afterRecover} FPS`, e.startAt && (n += `\n  + startAt: ${Object(I.e)(e.startAt)}`), e.endAt && (n += `\n  + endAt: ${Object(I.e)(e.endAt)}`), n += "\n"
                                })), n += "\n\n", await e.append("fps-section-drop", n)
                            }
                        } catch (i) {}
                    }, this.hasDataChanged = () => {
                        var e, t;
                        return this.tasks.length || Object.keys(this.processAppUsage).length || this.hasChange.queryStatistics || this.hasChange.fpsInfo || this.attentionQueries.length || (null === (e = this.fpsSectionDropInfo) || void 0 === e ? void 0 : e.length) || (null === (t = this.fpsDropInfo) || void 0 === t ? void 0 : t.length) || this.hasProcessDataChanged()
                    }
                }
                ready() {
                    this.isReady || o.a.process === l.a.Main && (m.a.on("staging_account", (e => {
                        const t = m.a.getConfig().enable_for_staging_account,
                            n = m.a.getConfig().enable_write_log || !1;
                        this.writerEnabled = (m.a.getConfig().enable || !!e && t) && n, this.writerEnabled ? this.startWrite() : this.reset()
                    })), this.isReady = !0)
                }
                reset() {
                    this.tasks = [], this.processAppUsage = {}, this.queryStatistics = {
                        totalRequest: 0,
                        totalExecDuration: 0,
                        inUse: {}
                    }, this.processStats = {}, this.attentionQueries = [], this.hasChange = {
                        queryStatistics: !1,
                        fpsInfo: !1
                    }, this.writing = !1, this.savedProcessDataHash = 0, this.timeoutLog && clearTimeout(this.timeoutLog)
                }
                record(e) {
                    if (!1 === this.writerEnabled) return;
                    if (o.a.process !== l.a.Main) return;
                    if (e.name === c.b.fps) return;
                    let t = {
                        duration: e.durationText,
                        startAt: e.startAt ? Object(I.e)(e.startAt) : void 0,
                        endAt: e.endAt ? Object(I.e)(e.endAt) : void 0,
                        id: e.id,
                        name: e.name,
                        type: e.type,
                        info: [...e.info || []],
                        usageTime: e.usageTimeText
                    };
                    if (e.type === f.a.TIME)
                        if (e.name === c.b.query_resolution_time) {
                            if (t = Object(P.a)(Object(P.a)({}, t), {}, {
                                    stackTrace: e.stackTrace
                                }), e.duration) {
                                this.hasChange.queryStatistics = !0, this.queryStatistics.totalRequest++, this.queryStatistics.totalExecDuration += e.duration;
                                for (const t of B) {
                                    const n = e => e <= t;
                                    e.usageTime && n(e.usageTime) && (this.queryStatistics.inUse[t] || (this.queryStatistics.inUse[t] = {
                                        totalRequest: 0,
                                        totalExecDuration: 0
                                    }), this.queryStatistics.inUse[t].totalRequest++, this.queryStatistics.inUse[t].totalExecDuration += e.duration)
                                }
                                e.duration > O && this.attentionQueries.push(t)
                            }
                        } else t = Object(P.a)({}, t), this.tasks.push(t);
                    this.startWrite()
                }
                recordUsage(e, t) {
                    if (!1 === this.writerEnabled) return;
                    if (o.a.process !== l.a.Main) return;
                    const n = s(t);
                    this.processAppUsage[n] = e.map((e => ({
                        pid: e.pid,
                        ppid: e.ppid,
                        processName: e.name,
                        processType: e.type,
                        cpu: `${e.cpu.toFixed(2)}%`,
                        memory: Object(I.d)(e.memory),
                        sandboxed: e.sandboxed,
                        usageTime: Object(I.f)(n),
                        elapsed: Object(I.f)(e.elapsed),
                        timestamp: e.timestamp
                    }))), this.startWrite()
                }
                recordProcessStats(e) {
                    var t;
                    if (!1 === this.writerEnabled) return;
                    if (o.a.process !== l.a.Main) return;
                    let n = {};
                    if (null != e && e.memory)
                        for (const o in e.memory)
                            if (this.WHITELIST_MEMORY.has(o)) {
                                const t = e.memory[o];
                                n[o] = "number" == typeof t ? Object(I.d)(t) : t
                            }
                    let i = {};
                    null != e && null !== (t = e.cpu) && void 0 !== t && t.percent && (i = {
                        percent: e.cpu.percent
                    });
                    const s = {
                        recordAt: Object(I.e)(e.recordAt),
                        usageTime: Object(I.f)(e.usageTime),
                        pid: e.pid,
                        name: e.name,
                        memory: n,
                        cpu: i,
                        creationTime: e.creationTime ? Object(I.e)(e.creationTime) : null,
                        sandboxed: e.sandboxed,
                        processType: e.type
                    };
                    this.processStats[e.name] || (this.processStats[e.name] = []), this.processStats[e.name].push(s), this.startWrite()
                }
                recordFps(e) {
                    !1 !== this.writerEnabled && o.a.process === l.a.Main && (this.fpsInfo = e, this.hasChange.fpsInfo = !0, this.startWrite())
                }
                recordFpsSection(e) {
                    !1 !== this.writerEnabled && o.a.process === l.a.Main && (e.taskKey ? (this.fpsSectionDropInfo || (this.fpsSectionDropInfo = []), this.fpsSectionDropInfo.push(e)) : (this.fpsDropInfo || (this.fpsDropInfo = []), this.fpsDropInfo.push(e)), this.startWrite())
                }
                recordAppUsage(e, t) {
                    if (!1 === this.writerEnabled) return;
                    if (o.a.process !== l.a.Main) return;
                    const n = s(t);
                    this.processAppUsage[n] = e.map((e => ({
                        pid: e.pid,
                        ppid: e.ppid,
                        processName: e.name,
                        processType: e.type,
                        cpu: `${e.cpu.toFixed(2)}%`,
                        memory: Object(I.d)(e.memory),
                        sandboxed: e.sandboxed,
                        usageTime: Object(I.f)(n),
                        elapsed: Object(I.f)(e.elapsed),
                        timestamp: e.timestamp
                    }))), this.totalAppUsage[n] = e.reduce(((e, t) => (e.cpuTotal += t.cpu, e.memoryTotal += t.memory, e)), {
                        cpuTotal: 0,
                        memoryTotal: 0
                    }), this.startWrite()
                }
                startWrite() {
                    !1 !== this.writerEnabled && o.a.process === l.a.Main && !this.writing && this.writerEnabled && (this.writing = !0, this.timeoutLog = setTimeout((() => {
                        this.writeLog().finally((() => {
                            if (this.writing = !1, this.hasDataChanged()) return this.startWrite()
                        }))
                    }), 5e3))
                }
                export (e) {
                    !1 !== this.writerEnabled && o.a.process === l.a.Main && e && (clearTimeout(this.timeoutLog), this.hasDataChanged() && this.writeLog())
                }
                writeContentFromObject(e) {
                    let t = "";
                    for (const n in e) {
                        const o = e[n];
                        if (void 0 !== o)
                            if (Array.isArray(o)) t += `\n - ${n}:`, o.forEach((e => {
                                if ("object" == typeof e) {
                                    t += "\n   + {";
                                    for (const n in e) t += `\n      ${n} : ${e[n]}`;
                                    t += "\n     }"
                                } else t += `\n   + ${e}`
                            }));
                            else if ("object" == typeof o) {
                            t += `\n - ${n}:`;
                            for (const e in o) void 0 !== o[e] && (t += `\n   .  ${e} : ${o[e]}`);
                            t += "\n"
                        } else t += `\n - ${n} : ${o}`
                    }
                    return t
                }
                hasProcessDataChanged() {
                    return o.a.DataManager.getHashCode() !== this.savedProcessDataHash
                }
                getWriter() {
                    return (0, n("sc+k").default)()
                }
            });
            var k = n("igRa");
            o.a.register(i.a.UI_MANAGER, class {
                constructor() {
                    this._fpsTimeline = void 0, this.fpsEngineStartAt = void 0, this.fpsState = void 0, this.maxFps = void 0, this._logger = void 0, this._tool = void 0, this.isActive = void 0, this.controllerId = void 0, this._avgFpsCounter = void 0, this.lowestDroppedFpsMonitor = void 0, this._listerners = void 0, this._fpsSections = void 0, this.FPS_SECTION_EXPIRATION_TIME = 6e4, this.fpsFallingConfig = {
                        safeFpsGap: 10
                    }, this.startLowestDroppedFpsMonitor = () => {
                        this.lowestDroppedFpsMonitor && this.lowestDroppedFpsMonitor.end(), this.lowestDroppedFpsMonitor = this.getFpsFallingRecorder(), this.lowestDroppedFpsMonitor.onData((e => {
                            var t;
                            const n = (null === (t = this.lowestDroppedFpsMonitor) || void 0 === t ? void 0 : t.end()) || e;
                            this.recordLowestDroppedFpsMetric(n), this.triggerEvent(k.a.DROP_FPS, n), this.lowestDroppedFpsMonitor = void 0, this.startLowestDroppedFpsMonitor()
                        })), this.lowestDroppedFpsMonitor.start()
                    }, this.recordFpsMetric = e => {
                        if (!this.fpsState || !this.isActive || !m.a.getConfig().enable_fps_monitor) return;
                        const t = Date.now(),
                            {
                                metrics: n,
                                passedTime: i,
                                startTime: s
                            } = e,
                            a = n.find((e => e.name === c.b.fps));
                        if (a) {
                            const e = o.a.MetricFactory.create(a.name, `${a.name}.${i}`, a);
                            e.setStartAt(s), e.setEndAt(t), e.pushInfo({
                                fps: this.fpsState.fps,
                                avgFps: this.fpsState.avgFps,
                                maxFps: this.fpsState.maxFps,
                                usageTime: i
                            }), e.evaluate(), e.resolve(), o.a.MetricResolver.resolve(e)
                        }(m.a.getConfig().enable_write_log || !1) && o.a.MetricTransporter.transmitFps(this.fpsState, t, i)
                    }, this.recordLowestDroppedFpsMetric = e => {
                        if (null == e.lowestDrop) return;
                        const t = o.a.SchemaManager.loadSchema(c.b.fps_lowest_drop),
                            n = o.a.MetricFactory.create(t.name, `${t.name}.${Date.now()}`, t);
                        n.setDuration(e.lowestDrop), n.pushInfo(Object(P.a)(Object(P.a)({}, e), {}, {
                            maxFps: this.maxFps
                        })), n.evaluate(), n.resolve(), o.a.MetricResolver.resolve(n);
                        (m.a.getConfig().enable_write_log || !1) && o.a.MetricTransporter.transmitFpsSection(e)
                    }
                }
                get Logger() {
                    return this._logger || (this._logger = o.a.createLogger("ui-manager")), this._logger
                }
                get fpsTimeline() {
                    return this._fpsTimeline || (this._fpsTimeline = new E.b, this._fpsTimeline.onMessage(this.recordFpsMetric)), this._fpsTimeline
                }
                get avgFpsCounter() {
                    return this._avgFpsCounter || (this._avgFpsCounter = {
                        _columnNo: 0,
                        _total: 0
                    }), this._avgFpsCounter
                }
                get fpsSections() {
                    return this._fpsSections || (this._fpsSections = new Map), this._fpsSections
                }
                get listerners() {
                    return this._listerners || (this._listerners = {}), this._listerners
                }
                get Tool() {
                    if (!this._tool) {
                        const e = n("5BYM").default;
                        this._tool = new e(this)
                    }
                    return this._tool
                }
                ready() {}
                exit() {
                    this._fpsTimeline && this.fpsTimeline.stop(), this.lowestDroppedFpsMonitor && (this.lowestDroppedFpsMonitor.end(), this.lowestDroppedFpsMonitor = void 0), this.fpsEngineStartAt = void 0
                }
                registerController() {
                    if (this.controllerId) return;
                    this.controllerId = Date.now();
                    return {
                        id: this.controllerId,
                        setIsActive: e => {
                            this.isActive = e
                        }
                    }
                }
                unregisterController(e) {
                    this.controllerId === e && (this.controllerId = void 0)
                }
                registerFpsMonitor() {
                    if (this.fpsEngineStartAt || o.a.process !== l.a.Render && o.a.process !== l.a.Web) return;
                    if (this.fpsEngineStartAt = Date.now(), m.a.getConfig().enable_fps_monitor) {
                        const e = new E.a(Object(I.g)("1m")),
                            t = o.a.SchemaManager.loadSchema(c.b.fps);
                        t.categories && (e.add(t), this.fpsTimeline.startEvery(e))
                    }
                    if (m.a.getConfig().enable_fps_monitor_v2 && m.a.getConfig().enable_fps_drop_monitor) {
                        o.a.SchemaManager.loadSchema(c.b.fps_lowest_drop).categories && this.startLowestDroppedFpsMonitor()
                    }
                    return {
                        id: this.fpsEngineStartAt,
                        recordFps: (e, t, n) => this.recordFps(e, t, n)
                    }
                }
                unregisterFpsMonitor(e) {
                    this.fpsEngineStartAt === e && (this.fpsEngineStartAt = void 0, this.lowestDroppedFpsMonitor && (this.lowestDroppedFpsMonitor.end(), this.lowestDroppedFpsMonitor = void 0), this._fpsTimeline && this.fpsTimeline.stop())
                }
                getRegisteredFpsMonitor() {
                    return this.fpsEngineStartAt
                }
                recordFps(e, t, n) {
                    this.isActive && (this.avgFpsCounter._columnNo++, this.avgFpsCounter._total += e.fps, this.fpsState = e, this.fpsState.avgFps = Number((this.avgFpsCounter._total / this.avgFpsCounter._columnNo).toFixed(0)), this.maxFps = Math.max(t, this.maxFps || 60), 120 === this.maxFps && (this.fpsFallingConfig.safeFpsGap = 20), this.triggerEvent(k.a.FPS, {
                        fps: e.fps,
                        now: n
                    }))
                }
                getFps() {
                    return this.fpsState
                }
                on(e, t) {
                    this.listerners[e] || (this.listerners[e] = []), this.listerners[e].push(t)
                }
                removeListener(e, t) {
                    var n;
                    null !== (n = this.listerners[e]) && void 0 !== n && n.length && (this.listerners[e] = this.listerners[e].filter((e => e !== t)))
                }
                triggerEvent(e, t) {
                    const n = this.listerners[e];
                    null != n && n.length && n.forEach((e => e(t)))
                }
                getFpsFallingRecorder(e) {
                    return new(0, n("/Pmb").default)(Object(P.a)(Object(P.a)({
                        safeFpsGap: this.fpsFallingConfig.safeFpsGap
                    }, e || {}), {}, {
                        maxFps: this.maxFps
                    }))
                }
                startRecordSectionFps(e, t) {
                    var n;
                    const i = !!m.a.getConfig().fps_section[e],
                        s = m.a.getConfig().enable_fps_drop_monitor;
                    if (!this.getRegisteredFpsMonitor() || !i || !s) return;
                    const a = o.a.SchemaManager.loadSchema(e);
                    if (a.disabled) return;
                    const r = o.a.MetricFactory.getKey(e, t);
                    if (null === (n = this.fpsSections.get(r)) || void 0 === n || !n.listener) {
                        const n = n => {
                            if (null != n.lowestDrop) {
                                const o = this.fpsSections.get(r);
                                if (!o) return;
                                o.result ? null != o.result.lowestDrop && o.result.lowestDrop > n.lowestDrop && (o.result = n) : o.result = n, (null == o || !o.timer) && o.startAt && Date.now() - o.startAt >= this.FPS_SECTION_EXPIRATION_TIME && this.endRecordSectionFps(e, t)
                            }
                        };
                        this.on(k.a.DROP_FPS, n), this.fpsSections.set(r, Object(P.a)(Object(P.a)({}, this.fpsSections.get(r) || {}), {}, {
                            startAt: Date.now(),
                            listener: n
                        }))
                    }
                    const c = this.fpsSections.get(r);
                    c && (c.timer && clearTimeout(c.timer), c.timer = null != a.timeout ? setTimeout((() => {
                        this.endRecordSectionFps(e, t)
                    }), a.timeout) : void 0)
                }
                endRecordSectionFps(e, t, n) {
                    const i = o.a.MetricFactory.getKey(e, t),
                        s = this.fpsSections.get(i);
                    if (!s) return;
                    const a = Date.now(),
                        r = s.listener;
                    r && this.removeListener(k.a.DROP_FPS, r), null != s && s.timer && clearTimeout(s.timer);
                    const c = s.result ? Object(P.a)(Object(P.a)({}, s.result), {}, {
                        startAt: s.startAt,
                        endAt: a,
                        maxFps: this.maxFps
                    }) : void 0;
                    if (this.fpsSections.delete(i), null != (null == c ? void 0 : c.lowestDrop)) {
                        var d;
                        null === (d = this.Logger) || void 0 === d || d.zsymb(5, 9876, 30001, "[drop] {}: {}", i, c);
                        const s = o.a.SchemaManager.loadSchema(e);
                        if (!s.disabled) {
                            const a = o.a.MetricFactory.create(e, t, s);
                            a.setData(c), a.setDuration(c.lowestDrop), a.pushInfo(c), n && a.pushInfo(n), a.evaluate(), a.resolve(), o.a.MetricResolver.resolve(a);
                            (m.a.getConfig().enable_write_log || !1) && o.a.MetricTransporter.transmitFpsSection(c, i)
                        }
                    }
                    return c
                }
            })
        },
        cnBV: function(e, t, n) {
            "use strict";
            n.d(t, "a", (function() {
                return o
            })), n.d(t, "b", (function() {
                return i
            }));
            const o = {
                    ux_latency: "ux_latency",
                    task_latency: "task_latency",
                    usage: "usage",
                    web_vitals: "web_vitals",
                    navigation_timing: "navigation_timing",
                    core: "core"
                },
                i = {
                    start_up: "start_up",
                    dal: "dal",
                    chat: "chat"
                }
        },
        dFSO: function(e, t, n) {
            "use strict";
            n.d(t, "g", (function() {
                return a
            })), n.d(t, "b", (function() {
                return r
            })), n.d(t, "f", (function() {
                return c
            })), n.d(t, "d", (function() {
                return m
            })), n.d(t, "c", (function() {
                return l
            })), n.d(t, "e", (function() {
                return u
            })), n.d(t, "a", (function() {
                return _
            }));
            const o = 36e5,
                i = 24 * o,
                s = {
                    W: 6048e5,
                    D: i,
                    h: o,
                    m: 6e4,
                    s: 1e3
                },
                a = e => {
                    var t;
                    const n = null === (t = /(\d+)(ms)/g.exec(e)) || void 0 === t ? void 0 : t[1];
                    if (n) return Number(n);
                    const o = /(\d+)([WDhms])/g;
                    let i, a = 0;
                    for (; i = o.exec(e);) a += parseInt(i[1]) * s[i[2]];
                    return a
                },
                r = e => null == e,
                c = (e, t) => {
                    let n = e;
                    const o = [];
                    for (const i in s) {
                        const e = s[i],
                            t = Math.trunc(n / e);
                        t > 0 && (o.push(`${t}`.padStart(2, "0") + i), n -= t * e)
                    }
                    return n > 0 && (null != t && (n = Number(n.toFixed(t))), o.push(n + "ms")), o.join(":")
                },
                d = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
                m = e => {
                    let t = 0,
                        n = parseInt(e.toString(), 10) || 0;
                    for (; n >= 1024 && ++t;) n /= 1024;
                    return n.toFixed(n < 10 && t > 0 ? 1 : 0) + " " + d[t]
                },
                l = e => 1024 * Number(e),
                u = e => {
                    const t = e => `${e}`.padStart(2, "0"),
                        n = new Date(e);
                    return `${n.toLocaleDateString()} ${`${t(n.getHours())}:${t(n.getMinutes())}:${t(n.getSeconds())}.${t(n.getMilliseconds())}`}`
                };
            let p, h = {};
            const _ = e => {
                if (!p) {
                    let e = "";
                    [...d].reverse().forEach(((t, n) => {
                        h[t] = 1024 ** (d.length - 1 - n), e += 0 === n ? t : `|${t}`
                    })), p = new RegExp(`(\\d+)(?:)(${e})`, "g")
                }
                let t, n = 0;
                for (; t = p.exec(e);) n += parseInt(t[1]) * h[t[2]];
                return n
            }
        },
        fbdB: function(e, t, n) {
            "use strict";
            n.d(t, "b", (function() {
                return o.a
            })), n.d(t, "a", (function() {
                return i
            }));
            var o = n("uzza");
            var i = {
                bootstrap: "bootstrap",
                main_ready: "main_ready",
                main_window_finish_load: "main_window_finish_load",
                app_did_mount: "app_did_mount",
                app_done_preload_data: "app_done_preload_data",
                app_ready: "app_ready"
            };
            n("cnBV")
        },
        gNXM: function(e, t, n) {
            "use strict";
            n.d(t, "a", (function() {
                return r
            }));
            var o = n("VTBJ"),
                i = n("H/wq");
            const s = "INDEXED_DB_MODE/DEFAULT",
                a = "INDEXED_DB_MODE/DRY";
            const r = new class {
                constructor() {
                    this._mode = s
                }
                turnOnDryMode() {
                    this._mode = a
                }
                turnOnDefaultMode() {
                    this._mode = s
                }
                async openExistedDB(e) {
                    const t = window.indexedDB.open(e);
                    return await new Promise(((n, o) => {
                        t.onupgradeneeded = function() {
                            var n;
                            null === (n = t.transaction) || void 0 === n || n.abort(), o(new i.b(`No database whose name is ${e} exists`))
                        }, t.onsuccess = function() {
                            n(t.result)
                        }, t.onerror = function() {
                            o(t.error)
                        }
                    }))
                }
                getKeyDataInObjectStore(e, t) {
                    return new Promise(((n, o) => {
                        const i = t.get(e);
                        i.onsuccess = function() {
                            n(i.result)
                        }, i.onerror = function() {
                            o(i.error)
                        }
                    }))
                }
                getAllKeyNamesOfObjectStore(e) {
                    return new Promise(((t, n) => {
                        const o = e.getAllKeys();
                        o.onsuccess = function() {
                            t(o.result)
                        }, o.onerror = function() {
                            n(o.error)
                        }
                    }))
                }
                async doesObjectStoreHaveKey(e, t) {
                    return void 0 !== await this.getKeyDataInObjectStore(e, t)
                }
                async renameKeyOfObjectStore(e, t, n, i, s) {
                    void 0 === s && (s = () => {});
                    const r = await this.getKeyDataInObjectStore(e, n);
                    this._mode !== a && (await new Promise(((t, o) => {
                        const i = n.delete(e);
                        i.onsuccess = function() {
                            t()
                        }, i.onerror = function() {
                            o(i.error)
                        }
                    })), await new Promise(((e, s) => {
                        const a = n.put(Object(o.a)(Object(o.a)({}, r), {}, {
                            [i]: t
                        }));
                        a.onsuccess = function() {
                            e()
                        }, a.onerror = function() {
                            s(a.error)
                        }
                    })), s())
                }
                async deleteKeyOfObjectStore(e, t) {
                    this._mode !== a && await new Promise(((n, o) => {
                        const i = t.delete(e);
                        i.onsuccess = function() {
                            n()
                        }, i.onerror = function() {
                            o(i.error)
                        }
                    }))
                }
                async updateKeyOfObjectStore(e, t) {
                    this._mode !== a && await new Promise(((n, o) => {
                        const i = t.put(e);
                        i.onsuccess = function() {
                            n()
                        }, i.onerror = function() {
                            o(i.error)
                        }
                    }))
                }
                async getTotalKeyCountOfStore(e, t) {
                    let n = null;
                    try {
                        n = await this.openExistedDB(e)
                    } catch (i) {
                        return -1
                    }
                    if (!n.objectStoreNames.contains(t)) return -1;
                    const o = n.transaction(t, "readwrite").objectStore(t);
                    return (await this.getAllKeyNamesOfObjectStore(o)).length
                }
            }
        },
        gbvv: function(e, t, n) {
            "use strict";
            n.d(t, "a", (function() {
                return i
            }));
            var o = n("Cvfp");

            function i(e, t) {
                const n = o.b[e];
                if (!n) return null;
                const i = n[t];
                return i || null
            }
        },
        gpfy: function(e, t, n) {
            "use strict";
            n.r(t);
            var o = n("VTBJ"),
                i = n("N1xz"),
                s = n("dFSO"),
                a = n("AoYG");
            t.default = class {
                constructor() {
                    this.systemInfo = void 0
                }
                recordAtTime(e, t) {
                    const n = Date.now();
                    try {
                        const {
                            pid: r,
                            memoryUsage: c,
                            heapStats: d,
                            cpuUsage: m
                        } = MetriczGlobal.getProcessStats(), l = {
                            pid: r,
                            name: i.a.process,
                            memory: {
                                rss: c.rss,
                                heapTotal: c.heapTotal,
                                heapUsed: c.heapUsed,
                                heapSizeLimit: Object(s.c)(d.heapSizeLimit),
                                totalHeapSizeExecutable: Object(s.c)(d.totalHeapSizeExecutable),
                                totalPhysicalSize: Object(s.c)(d.totalPhysicalSize),
                                totalAvailableSize: Object(s.c)(d.totalAvailableSize),
                                mallocedMemory: Object(s.c)(d.mallocedMemory),
                                peakMallocedMemory: Object(s.c)(d.peakMallocedMemory),
                                doesZapGarbage: d.doesZapGarbage,
                                external: c.external,
                                arrayBuffers: c.arrayBuffers
                            },
                            cpu: Object(o.a)({}, m),
                            recordAt: n,
                            usageTime: n - i.a.EPOCH
                        };
                        null != t && t.length && t.forEach((t => {
                            const o = i.a.MetricFactory.create(t.name, `${l.name}.${e.passedTime}`, t);
                            var s;
                            (o.setStartAt(e.startTime), o.setEndAt(n), o.setData(l, e.passedTime), t.type === a.a.CPU) ? o.pushInfo({
                                percentCPUUsage: null === (s = l.cpu) || void 0 === s ? void 0 : s.percent,
                                recordAt: l.recordAt,
                                usageTime: l.usageTime,
                                processName: l.name
                            }): t.type === a.a.MEMORY && o.pushInfo({
                                heapUsed: l.memory.heapUsed,
                                heapTotal: l.memory.heapTotal,
                                rss: l.memory.rss
                            });
                            o.evaluate(), o.resolve(), i.a.MetricResolver.resolve(o)
                        })), i.a.MetricTransporter.transmitProcessStats(l)
                    } catch (r) {}
                }
                getSystemInfo() {
                    return this.systemInfo || (this.systemInfo = {
                        arch: MetriczGlobal.getArch()
                    }), this.systemInfo
                }
            }
        },
        "h0S/": function(e, t, n) {
            "use strict";
            let o;
            n.d(t, "b", (function() {
                    return o
                })), n.d(t, "c", (function() {
                    return i
                })), n.d(t, "a", (function() {
                    return s
                })),
                function(e) {
                    e.moduleA = "moduleA", e.featA = "featA", e.featPhoto = "photo", e.featPhotoLoadCache = "photoLoadCache", e.featPhotoDomCache = "photoDomCache", e.featPhotoReduxAction = "photoReduxAction", e.staging = "staging", e.onlyAdminChatSettings = "only-admin-chat-setting", e.contactTabV2 = "contact-tab-v2", e.conversationSetting = "conversation-setting", e.appStatus = "app-status", e.focusDetectorManager = "focus-detector-manager", e.focusStatus = "focus-status", e.syncDownload = "sync-download", e.activeDeactive = "active-deactive", e.signalProtocolManager = "signal-protocol-manager", e.resendManager = "resend-manager", e.iidManager = "iid-manager", e.signalStore = "signal-protocol-store", e.conversation = "conversation", e.controller = "controller", e.service = "service", e.stateMachine = "state-machine", e.convList = "conv-list", e.e2ee = "e2ee", e.metricz = "metricz", e.unread = "unread", e.blobHelper = "blob-helper", e.imgNormalizer = "img-normalizer", e.pinTopic = "pin-topic"
                }(o || (o = {}));
            const i = {
                    [o.moduleA]: !0,
                    [o.featA]: !0,
                    [o.featPhoto]: !0,
                    [o.featPhotoLoadCache]: !0,
                    [o.featPhotoDomCache]: !0,
                    [o.featPhotoReduxAction]: !0,
                    [o.staging]: !0,
                    [o.onlyAdminChatSettings]: !0,
                    [o.contactTabV2]: !0,
                    [o.conversationSetting]: !0,
                    [o.appStatus]: !0,
                    [o.focusDetectorManager]: !0,
                    [o.focusStatus]: !0,
                    [o.syncDownload]: !0,
                    [o.activeDeactive]: !0,
                    [o.controller]: !0,
                    [o.service]: !0,
                    [o.stateMachine]: !0,
                    [o.service]: !0,
                    [o.stateMachine]: !0,
                    [o.metricz]: !0,
                    [o.blobHelper]: !0,
                    [o.imgNormalizer]: !0,
                    [o.pinTopic]: !0
                },
                s = []
        },
        igRa: function(e, t, n) {
            "use strict";
            let o;
            n.d(t, "a", (function() {
                    return o
                })),
                function(e) {
                    e.FPS = "receive-fps", e.DROP_FPS = "drop-fps", e.TOGGLE_FPS_FALLING = "toggle-fps-falling-recorder"
                }(o || (o = {}))
        },
        jDHv: function(e, t, n) {
            "use strict";
            n.r(t), n.d(t, "define", (function() {
                return i
            })), n.d(t, "Container", (function() {
                return s
            })), n.d(t, "ModuleContainer", (function() {
                return a
            })), n.d(t, "autoInjectable", (function() {
                return r
            })), n.d(t, "injectable", (function() {
                return c
            })), n.d(t, "inject", (function() {
                return d
            })), n.d(t, "singleton", (function() {
                return m
            }));
            var o = n("S8fy");
            n("h6tn");

            function i(e) {
                return {
                    service: e,
                    token: e
                }
            }
            class s {
                constructor() {
                    this.inject = e => o.c(e.token), this.injectToken = e => o.c(e), this.singleton = o.f, this.injectable = o.d, this.register = (e, t) => {
                        o.b.register(e.token, {
                            useClass: t
                        }), this.hookAfferResolution(e)
                    }, this.registerValue = (e, t) => {
                        o.b.register(e.token, {
                            useValue: t
                        }), this.hookAfferResolution(e)
                    }, this.registerSingleton = (e, t) => {
                        o.b.registerSingleton(t), o.b.register(e.token, {
                            useFactory: e => e.resolve(t)
                        }), this.hookAfferResolution(e)
                    }, this.registerFactory = (e, t) => {
                        o.b.register(e.token, {
                            useFactory: t
                        }), this.hookAfferResolution(e)
                    }, this.resolve = e => o.b.resolve(e.token), this.resolveToken = e => o.b.resolve(e), this.resolveAll = e => o.b.resolveAll(e.token), this.resolveIfExist = e => {
                        try {
                            return o.b.resolve(e.token)
                        } catch (t) {
                            return
                        }
                    }
                }
                hookAfferResolution(e) {}
            }
            const a = new s,
                r = o.a,
                c = o.d,
                d = e => o.c(e.token);

            function m(e) {
                return function(t) {
                    e ? a.registerSingleton(e, t) : a.singleton()(t)
                }
            }
        },
        jGDt: function(e, t, n) {
            "use strict";
            n.d(t, "a", (function() {
                return i
            }));
            var o = n("jDHv");
            const i = Object(o.define)("zlog-session")
        },
        ncfp: function(e, t, n) {
            "use strict";
            var o;
            ! function(e) {
                e[e.PENDING = 0] = "PENDING", e[e.YES = 1] = "YES", e[e.NO = 2] = "NO"
            }(o || (o = {})), t.a = o
        },
        rFEu: function(e, t, n) {
            "use strict";
            n.d(t, "d", (function() {
                return q
            })), n.d(t, "c", (function() {
                return S
            })), n.d(t, "f", (function() {
                return A
            })), n.d(t, "b", (function() {
                return R
            })), n.d(t, "e", (function() {
                return N
            })), n.d(t, "a", (function() {
                return D
            }));
            class o {
                constructor() {
                    this.name = void 0, this.checkingMode = void 0, this.points = void 0
                }
            }
            class i {}
            class s extends o {
                constructor(e) {
                    super(), this.name = void 0, this.checkingMode = void 0, this.points = void 0, this.name = e.name, this.checkingMode = e.checkingMode || s.DEFAULT_CHECKING_MODE, this.points = e.points
                }
            }
            s.DEFAULT_CHECKING_MODE = "sequential";
            var a = s;
            class r {
                constructor(e) {
                    this.version = void 0, this.version = (null == e ? void 0 : e.version) || r.DEFAULT_VERSION
                }
            }
            r.DEFAULT_VERSION = 1;
            var c = r;
            var d = class extends c {
                constructor(e) {
                    super(e), this.name = void 0, this.condition = void 0, this.qos = void 0, this.points = void 0, this.disabled = void 0, this.name = e.name, this.condition = e.condition, this.qos = e.qos, this.points = e.points, this.disabled = e.disabled
                }
            };
            var m = class extends i {
                constructor() {
                    super(), this.statements = void 0;
                    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    this.statements = t
                }
                getAll() {
                    return this.statements
                }
            };
            var l = class extends c {
                    constructor(e) {
                        super(e), this.metrics = void 0, e.metrics.length && (this.metrics = e.metrics)
                    }
                    getMetrics() {
                        return this.metrics || []
                    }
                },
                u = n("AoYG");
            var p = class extends c {
                constructor(e) {
                    super(e), this.name = void 0, this.type = void 0, this.features = void 0, this.categories = void 0, this.fromProcess = void 0, this.startFromEpoch = void 0, this.showStackTrace = void 0, this.statement = void 0, this.disabled = void 0, this.mode = void 0, this.name = e.name, this.type = e.type || u.a.TIME, this.features = e.features, this.categories = e.categories, this.fromProcess = e.fromProcess, this.startFromEpoch = e.startFromEpoch, this.showStackTrace = e.showStackTrace, this.disabled = e.disabled, this.mode = e.mode, e.statement instanceof i ? this.statement = e.statement : e.statement instanceof o && (this.statement = M.StatementGroup(e.statement))
                }
            };
            var h = class extends c {
                constructor(e) {
                    super(), this.schemas = void 0, this.schemas = new Map(Object.entries(e))
                }
                getSchemas() {
                    return this.schemas ? Array.from(this.schemas.values()) : []
                }
            };
            var _ = class extends p {
                constructor(e) {
                    super(e), this.timeline = void 0, this.type = u.a.MEMORY, this.timeline = e.timeline
                }
            };
            var g = class extends p {
                constructor(e) {
                    super(e), this.timeline = void 0, this.type = u.a.CPU, this.timeline = e.timeline
                }
            };
            var f = class extends p {
                constructor(e) {
                    super(e), this.timeout = void 0, this.type = u.a.FPS, this.timeout = e.timeout
                }
            };
            const P = function(e) {
                for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                return new e(...n)
            };
            var I = class extends c {
                constructor() {
                    super(), this.timeNodes = void 0;
                    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    this.timeNodes = (t || []).map((e => ({
                        time: e
                    })))
                }
            };
            class w {
                constructor() {}
            }
            w.SchemaGroup = e => P(h, e), w.Schema = e => P(l, e), w.Metric = e => P(p, "string" == typeof e ? {
                name: e
            } : e), w.MetricMemory = e => P(_, e), w.MetricCPU = e => P(g, e), w.MetricFps = e => P(f, e), w.Statement = e => P(a, e), w.StatPoint = e => P(d, e), w.StatementGroup = function() {
                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                return P(m, ...t)
            }, w.Timeline = function() {
                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                return P(I, ...t)
            };
            var M = w,
                y = n("dFSO");
            let v;
            var b;
            (b = v || (v = {})).time = y.g, b.bytes = y.a, b.notNil = e => !Object(y.b)(e), b.extractCPUUsage = e => {
                var t, n, o;
                return null === (t = e.data) || void 0 === t || null === (n = t.usage) || void 0 === n || null === (o = n.cpu) || void 0 === o ? void 0 : o.percent
            }, b.extractHeapUsed = e => {
                var t, n, o;
                return null === (t = e.data) || void 0 === t || null === (n = t.usage) || void 0 === n || null === (o = n.memory) || void 0 === o ? void 0 : o.heapUsed
            }, b.extractPassedTime = e => {
                var t;
                return null === (t = e.data) || void 0 === t ? void 0 : t.passedTime
            }, b.extractRAM = e => {
                var t;
                return null === (t = e.systemInfo) || void 0 === t ? void 0 : t.totalMem
            }, b.isM1 = e => {
                var t, n;
                return "arm" === (null == e || null === (t = e.systemInfo) || void 0 === t ? void 0 : t.arch) || "arm64" === (null == e || null === (n = e.systemInfo) || void 0 === n ? void 0 : n.arch)
            };
            var D = v;
            const q = M.SchemaGroup,
                S = M.Schema,
                A = M.Timeline,
                T = M.Metric;
            T.Memory = M.MetricMemory, T.CPU = M.MetricCPU, T.Fps = M.MetricFps;
            const R = T,
                x = M.Statement;
            x.Group = M.StatementGroup, x.Point = M.StatPoint;
            const N = x
        },
        "sc+k": function(e, t, n) {
            "use strict";
            n.r(t);
            var o = n("3EqI"),
                i = n("Iwwi"),
                s = n.n(i),
                a = n("Cwh7"),
                r = n.n(a),
                c = n("vbkW"),
                d = n.n(c),
                m = n("N1xz");
            var l = class {
                constructor() {
                    this.directoryPath = void 0, this.directoryName = void 0, this.metaPath = void 0, this.logExt = void 0, this.accessibleFiles = {}, this.metaPreparing = !1, this.isMetaReady = !1, this.metaData = void 0, this.MAX_DIRECTORIES = 5, this.directoryPath = r.a.join(d.a.app.getPath("userData"), "metrics"), this.metaPath = r.a.join(d.a.app.getPath("userData"), "metrics", "meta"), this.logExt = ".txt", this.metaData = {
                        items: []
                    }
                }
                getFilePath(e) {
                    return r.a.join(this.directoryPath, e + this.logExt)
                }
                async checkFileExists(e) {
                    try {
                        return await s.a.promises.access(e, s.a.constants.F_OK), this.accessibleFiles[e] = !0, !0
                    } catch (t) {}
                    return !1
                }
                async ensureDirectoryExists() {
                    try {
                        await s.a.promises.mkdir(this.directoryPath, {
                            mode: 511,
                            recursive: !0
                        }), !this.isMetaReady && this.metaPreparing
                    } catch (e) {
                        throw new Error(e)
                    }
                }
                async prepareMeta() {
                    if (this.metaPreparing || this.isMetaReady) return;
                    let e;
                    this.metaPreparing = !0;
                    const t = async () => {
                            e = await s.a.promises.readFile(this.metaPath, "utf8")
                        },
                        n = async () => {
                            await this.checkFileExists(this.metaPath) && await t()
                        };
                    if (this.accessibleFiles[this.metaPath]) try {
                        await t()
                    } catch (a) {
                        await n()
                    } else await n();
                    if (e) try {
                        const t = JSON.parse(e);
                        if (null != t && t.items) {
                            var o;
                            this.metaData.items = t.items;
                            let e = this.metaData.items;
                            if (e = e.sort(((e, t) => e.createAt - t.createAt)), (null === (o = e) || void 0 === o ? void 0 : o.length) + 1 >= this.MAX_DIRECTORIES) {
                                e.splice(0, e.length + 1 - this.MAX_DIRECTORIES).forEach((e => {
                                    const t = r.a.join(d.a.app.getPath("userData"), "metrics", e.name);
                                    s.a.promises.unlink(t).catch((e => {}))
                                }))
                            }
                            this.metaData.items = e
                        }
                    } catch (c) {}
                    this.metaData.items.push({
                        name: this.directoryName,
                        createAt: m.a.EPOCH
                    });
                    const i = JSON.stringify(this.metaData);
                    await s.a.promises.writeFile(this.metaPath, i), this.metaPreparing = !1, this.isMetaReady = !0
                }
            };
            class u extends l {
                constructor() {
                    super(), this.lock = void 0, this.lock = new o.a
                }
                async write(e, t) {
                    return await this.lock.exec(e, (async () => {
                        const n = this.getFilePath(e),
                            o = async () => {
                                await this.ensureDirectoryExists(), await this.checkFileExists(n), await this.writeData(n, t)
                            };
                        if (this.accessibleFiles[n]) try {
                            await this.writeData(n, t)
                        } catch (i) {
                            await o()
                        } else await o()
                    }))
                }
                async append(e, t) {
                    return await this.lock.exec(e, (async () => {
                        const n = this.getFilePath(e),
                            o = async () => {
                                await this.ensureDirectoryExists();
                                await this.checkFileExists(n) ? await this.writeData(n, t) : await this.appendData(n, t)
                            };
                        if (this.accessibleFiles[n]) try {
                            await this.appendData(n, t)
                        } catch (i) {
                            await o()
                        } else await o()
                    }))
                }
                async writeData(e, t) {
                    try {
                        await s.a.promises.writeFile(e, t)
                    } catch (n) {
                        throw new Error(n)
                    }
                }
                async appendData(e, t) {
                    return new Promise(((n, o) => {
                        const i = s.a.createWriteStream(e, {
                            flags: "a"
                        }).on("error", (e => o(e))).on("close", n);
                        i.write(t), i.end("")
                    })).catch((e => {
                        throw new e
                    }))
                }
            }
            let p;
            t.default = () => (p || (p = new u), p)
        },
        uzza: function(e, t, n) {
            "use strict";
            t.a = {
                usage_memory: "usage_memory",
                usage_cpu: "usage_cpu",
                app_cpu_usage: "app_cpu_usage",
                app_ram_usage: "app_ram_usage",
                start_up_time: "start_up_time",
                query_resolution_time: "query_resolution_time",
                db_ready: "db_ready",
                authenticate: "authenticate",
                open_conversation: "open_conversation",
                conv_load_1st_msg: "conv_1st_load_msg",
                fps: "fps",
                fps_lowest_drop: "fps_lowest_drop",
                fps_scroll_conv_list: "fps_scroll_conv_list",
                fps_switch_conv: "fps_switch_conv",
                fps_jump_to_msg: "fps_jump_to_msg",
                fps_scroll_chat_box_view: "fps_scroll_chat_box_view",
                fps_switch_main_tab: "fps_switch_main_tab",
                fps_scroll_global_search_list: "fps_scroll_global_search_list"
            }
        },
        w46u: function(e, t, n) {
            "use strict";
            n.r(t);
            var o = n("5Drw"),
                i = n("KA3I"),
                s = n("dFSO"),
                a = n("N1xz"),
                r = n("fbdB");
            t.default = class {
                constructor() {
                    this._timelineEngine = void 0, this._processUsagePerformer = void 0, this.times = void 0, this.caclUsage = e => {
                        const t = Date.now();
                        this.processUsagePerformer.run().then((n => {
                            this.recordMetric(n, t, e.passedTime), a.a.LocalStat.recordAppUsage(n, t)
                        }))
                    }, this.recordMetric = (e, t, n) => {
                        const o = a.a.SchemaManager.loadSchema(r.b.app_cpu_usage),
                            i = a.a.SchemaManager.loadSchema(r.b.app_ram_usage),
                            s = e.reduce(((e, t) => (e.cpuTotal += t.cpu, e.memoryTotal += t.memory, e)), {
                                cpuTotal: 0,
                                memoryTotal: 0
                            }),
                            c = (e, t) => {
                                const o = a.a.MetricFactory.create(e.name, void 0, e);
                                o.setData({
                                    cpuTotal: s.cpuTotal,
                                    memoryTotal: s.memoryTotal,
                                    passedTime: n
                                }), o.setDuration(t), o.pushInfo(s), o.evaluate(), o.resolve(), a.a.MetricResolver.resolve(o)
                            };
                        o.statement && c(o, s.cpuTotal), i.statement && c(i, s.memoryTotal)
                    }, this.times = [Object(s.g)("1m"), Object(s.g)("5m"), Object(s.g)("10m"), Object(s.g)("30m"), Object(s.g)("1h"), Object(s.g)("3h"), Object(s.g)("5h"), Object(s.g)("8h"), Object(s.g)("24h")]
                }
                get timelineEngine() {
                    return this._timelineEngine || (this._timelineEngine = new o.b, this._timelineEngine.onMessage(this.caclUsage)), this._timelineEngine
                }
                get processUsagePerformer() {
                    return this._processUsagePerformer || (this._processUsagePerformer = new i.a), this._processUsagePerformer
                }
                start() {
                    const e = [];
                    this.times.length && (this.times.forEach((t => {
                        e.push(new o.a(t))
                    })), this.timelineEngine.startUp(e))
                }
            }
        },
        wudS: function(e, t, n) {
            "use strict";
            n.d(t, "c", (function() {
                return s
            })), n.d(t, "d", (function() {
                return a
            })), n.d(t, "b", (function() {
                return r
            })), n.d(t, "a", (function() {
                return c
            }));
            var o = n("ZcVI");
            const i = "sh_user_ids";

            function s() {
                const e = window.localStorage.getItem(i);
                let t = [];
                try {
                    e && (t = JSON.parse(e))
                } catch (n) {}
                return t
            }

            function a() {
                if (null !== window.localStorage.getItem(i)) return;
                const e = function() {
                    let e = new Set;
                    for (let t in localStorage)
                        for (let n of [o.i, o.h, o.m])
                            if (t && t.startsWith(n + "_")) {
                                let o = t.substring(n.length + 1, t.length);
                                if (o && !isNaN(+o)) {
                                    e.add(o);
                                    break
                                }
                            }
                    return 0 == e.size ? [] : Array.from(e)
                }();
                window.localStorage.setItem(i, JSON.stringify(e))
            }

            function r(e) {
                let t = s(),
                    n = t.indexOf(e);
                return -1 === n && (t.push(e), n = t.length - 1, window.localStorage.setItem(i, JSON.stringify(t))), n
            }

            function c(e) {
                const t = window.localStorage.getItem(i);
                if (null === t) return !1;
                return -1 !== JSON.parse(t).indexOf(e)
            }
        },
        xDBg: function(e, t, n) {
            "use strict";
            n.r(t),
                function(e) {
                    var o = n("VTBJ"),
                        i = n("N1xz"),
                        s = n("KBA3"),
                        a = n("KA3I"),
                        r = n("dFSO"),
                        c = n("Na1p"),
                        d = n("AoYG");
                    t.default = class {
                        constructor() {
                            this._processUsagePerformer = void 0, this.systemInfo = void 0
                        }
                        get processMonitor() {
                            return this._processUsagePerformer || (this._processUsagePerformer = new a.a), this._processUsagePerformer
                        }
                        recordAtTime(e, t) {
                            if (this.recordCurrentProcessStats(e, t), s.a.getConfig().allow_measure_usage_by_ps_cmd) {
                                const e = Date.now();
                                this.processMonitor.run().then((n => {
                                    if (i.a.LocalStat.recordUsage(n, e), null != t && t.length) {
                                        let e = [];
                                        n.forEach((e => {
                                            t.forEach((e => {}))
                                        })), e.forEach((e => {
                                            i.a.MetricResolver.resolve(e)
                                        }))
                                    }
                                }))
                            }
                        }
                        combineRendererStats(e) {
                            this.fillMetrics(e), i.a.LocalStat.recordProcessStats(e)
                        }
                        getArch() {
                            const e = n("TcBx");
                            try {} catch (t) {}
                            return e.arch()
                        }
                        getSystemInfo() {
                            if (!this.systemInfo) {
                                const e = n("TcBx");
                                this.systemInfo = {
                                    totalMem: e.totalmem(),
                                    arch: this.getArch(),
                                    osVersion: e.release()
                                }
                            }
                            return this.systemInfo
                        }
                        recordCurrentProcessStats(t, n) {
                            const s = Date.now(),
                                a = e.getHeapStatistics(),
                                m = e.memoryUsage(),
                                l = c.a.getUsage(),
                                u = {
                                    pid: e.pid,
                                    name: i.a.process,
                                    memory: {
                                        rss: m.rss,
                                        heapTotal: m.heapTotal,
                                        heapUsed: m.heapUsed,
                                        heapSizeLimit: Object(r.c)(a.heapSizeLimit),
                                        totalHeapSizeExecutable: Object(r.c)(a.totalHeapSizeExecutable),
                                        totalPhysicalSize: Object(r.c)(a.totalPhysicalSize),
                                        totalAvailableSize: Object(r.c)(a.totalAvailableSize),
                                        mallocedMemory: Object(r.c)(a.mallocedMemory),
                                        peakMallocedMemory: Object(r.c)(a.peakMallocedMemory),
                                        doesZapGarbage: a.doesZapGarbage,
                                        external: m.external,
                                        arrayBuffers: m.arrayBuffers
                                    },
                                    cpu: Object(o.a)({}, l),
                                    recordAt: s,
                                    usageTime: s - i.a.EPOCH
                                };
                            this.fillMetrics(u), null != n && n.length && n.forEach((e => {
                                const n = i.a.MetricFactory.create(e.name, `${u.name}.${t.passedTime}`, e);
                                var o;
                                (n.setStartAt(t.startTime), n.setEndAt(s), n.setData(u, t.passedTime), e.type === d.a.CPU) ? n.pushInfo({
                                    percentCPUUsage: null === (o = u.cpu) || void 0 === o ? void 0 : o.percent,
                                    recordAt: u.recordAt,
                                    usageTime: u.usageTime,
                                    processName: u.name
                                }): e.type === d.a.MEMORY && n.pushInfo({
                                    heapUsed: u.memory.heapUsed,
                                    heapTotal: u.memory.heapTotal,
                                    rss: u.memory.rss
                                });
                                n.evaluate(), n.resolve(), i.a.MetricResolver.resolve(n)
                            })), i.a.LocalStat.recordProcessStats(u)
                        }
                        recordGpuProcessStats() {
                            const e = Date.now(),
                                t = this.processMonitor.getGPUMetrics();
                            if (t) {
                                const n = {
                                    pid: Number(t.pid),
                                    name: "GPU",
                                    memory: {
                                        workingSetSize: Object(r.c)(t.memory.workingSetSize),
                                        peakWorkingSetSize: Object(r.c)(t.memory.peakWorkingSetSize)
                                    },
                                    cpu: {
                                        percent: t.cpu.percentCPUUsage
                                    },
                                    recordAt: Number(e),
                                    usageTime: Number(e - i.a.EPOCH),
                                    creationTime: t.creationTime,
                                    sandboxed: t.sandboxed,
                                    type: t.type
                                };
                                t.memory.privateBytes && (n.memory.privateBytes = Object(r.c)(t.memory.privateBytes)), i.a.LocalStat.recordProcessStats(n)
                            }
                        }
                        fillMetrics(e) {
                            const t = this.processMonitor.getPidMetrics(e.pid);
                            t && (e.memory.workingSetSize = Object(r.c)(t.memory.workingSetSize), e.memory.peakWorkingSetSize = Object(r.c)(t.memory.peakWorkingSetSize), t.memory.privateBytes && (e.memory.privateBytes = Object(r.c)(t.memory.privateBytes)), e.creationTime = t.creationTime, e.sandboxed = t.sandboxed, e.type = t.type)
                        }
                    }
                }.call(this, n("ckNr"))
        }
    }
]);
//# sourceMappingURL=../sourcemaps/lazy/default-embed-render.ca32bd07816c17b942d5.js.map