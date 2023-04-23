"object" != typeof globalThis && (globalThis = window),
(this.webpackJsonp = this.webpackJsonp || []).push([[18], {
    "+eUS": function(e, t, s) {
        "use strict";
        s.d(t, "a", (function() {
            return S
        }
        ));
        var i = s("jDHv")
          , n = s("+ExH")
          , r = s("YEoC")
          , a = s("oRsZ")
          , o = s("IpiK")
          , l = s("d04y")
          , c = s("pRxM")
          , d = s("b3Jv")
          , h = s("4IGy")
          , u = s("xS/Y")
          , g = s("rdC+")
          , p = s("pP8i");
        const m = (e,t)=>{
            if (t === r.a.IDB)
                switch (e) {
                case "Core":
                    return a.a.useIdb;
                case "MsgInfo":
                    return o.a.useIdb;
                case "Qos":
                    return l.a.useIdb;
                case "Reaction":
                    return c.a.useIdb;
                case "Search":
                    return d.a.useIdb;
                case "Storage":
                    return h.a.useIdb;
                case "Res":
                    return u.a.useIdb;
                case "SecureLocalstorage":
                    return g.a.useIdb;
                case "ZLog":
                    return p.a.useIdb;
                default:
                    return
                }
            if (t === r.a.SQLite)
                switch (e) {
                case "Core":
                    return a.a.useSqlite;
                case "MsgInfo":
                    return o.a.useSqlite;
                case "Qos":
                    return l.a.useSqlite;
                case "Reaction":
                    return c.a.useSqlite;
                case "Search":
                    return d.a.useSqlite;
                case "Storage":
                    return h.a.useSqlite;
                case "Res":
                    return u.a.useSqlite;
                case "SecureLocalstorage":
                    return g.a.useSqlite;
                case "ZLog":
                    return p.a.useSqlite;
                default:
                    return
                }
        }
        ;
        var f = s("kFM4")
          , v = s("0slR")
          , b = s("UJ0r")
          , I = s("teaq")
          , y = s("PhBv")
          , C = s("1UUk");
        function S(e) {
            Object(f.a)("RunMode", e),
            e !== r.e.Unknown && (i.ModuleContainer.resolve(C.b).install(),
            e !== r.e.Background && (setTimeout((()=>{
                i.ModuleContainer.resolve(y.b).start()
            }
            ), 1),
            i.ModuleContainer.resolve(b.b).install(n.a),
            i.ModuleContainer.resolve(v.a).install(m),
            i.ModuleContainer.resolve(I.b).install()))
        }
    },
    "0rWR": function(e, t, s) {
        "use strict";
        var i, n = s("jDHv"), r = s("Mgpg"), a = s("YEoC"), o = s("DI/x"), l = s("PmZf"), c = s("LzQZ"), d = s("teaq"), h = s("UJ0r"), u = s("9rga");
        function g(e) {
            let t = {};
            return async function() {
                for (var s = arguments.length, i = new Array(s), n = 0; n < s; n++)
                    i[n] = arguments[n];
                const r = i.length ? i.join("-") : "";
                if (!t[r])
                    return t[r] = !0,
                    e(...i)
            }
        }
        let p = n.ModuleContainer.injectable()(i = function(e, t) {
            return n.ModuleContainer.inject(d.b)(e, void 0, 0)
        }(i = function(e, t) {
            return n.ModuleContainer.inject(r.ZLoggerFactory)(e, void 0, 1)
        }(i = Reflect.metadata("design:type", Function)(i = Reflect.metadata("design:paramtypes", [void 0 === d.b ? Object : d.b, void 0 === r.ZLoggerFactory ? Object : r.ZLoggerFactory])(i = class extends h.a {
            constructor(e, t) {
                super(),
                this.configurationManager = e,
                this.logger = void 0,
                this.dbSchema = null,
                this.logger = t.createZLogger("db", ["adapter-manager"]),
                this.closeDatabase = g(this.closeDatabase.bind(this)),
                this.closeAllDatabases = g(this.closeAllDatabases.bind(this)),
                this.deleteDatabase = g(this.deleteDatabase.bind(this)),
                this.deleteAllDatabases = g(this.deleteAllDatabases.bind(this))
            }
            install(e) {
                this.dbSchema = e
            }
            getAllDBNames() {
                if (!this.dbSchema)
                    throw new o.v("The adapter manager hasn't been installed yet!");
                return Object.keys(this.dbSchema)
            }
            async closeDatabase(e) {
                const t = this.configurationManager.getDatabaseConfigs(e).map((e=>this.getSpecificAdapterManager(e.type)));
                await Promise.all(t.map((t=>t.closeDatabase(e))))
            }
            async closeAllDatabases() {
                const e = this.getAllDBNames()
                  , t = new Set;
                for (const n of e) {
                    this.configurationManager.getDatabaseConfigs(n).map((e=>e.type)).forEach((e=>t.add(e)))
                }
                const s = n.ModuleContainer.resolve(c.a);
                await s.waitUntilIdle();
                const i = []
                  , r = t.values();
                let a = r.next();
                for (; !a.done; ) {
                    const e = this.getSpecificAdapterManager(Number(a.value));
                    i.push(e.closeAllDatabases()),
                    a = r.next()
                }
                await Promise.all(i)
            }
            async deleteDatabase(e) {
                const t = this.configurationManager.getDatabaseConfigs(e).map((e=>this.getSpecificAdapterManager(e.type)));
                await Promise.all(t.map((t=>t.deleteDatabase(e))))
            }
            async deleteAllDatabases() {
                const e = this.getAllDBNames()
                  , t = new Set;
                for (const n of e) {
                    this.configurationManager.getDatabaseConfigs(n).map((e=>e.type)).forEach((e=>t.add(e)))
                }
                const s = n.ModuleContainer.resolve(c.a);
                await s.waitUntilIdle();
                const i = []
                  , r = t.values();
                let a = r.next();
                for (; !a.done; ) {
                    const e = this.getSpecificAdapterManager(Number(a.value));
                    i.push(e.deleteAllDatabases()),
                    a = r.next()
                }
                await Promise.all(i)
            }
            doesDatabaseExists(e) {
                const t = this.configurationManager.getDatabaseConfigs(e).map((e=>this.getSpecificAdapterManager(e.type)));
                return Promise.all(t.map((t=>t.doesDatabaseExist(e)))).then((e=>e.reduce(((e,t)=>e && t), !0)))
            }
            getDatabaseAdapter(e, t, s) {
                return this.getSpecificAdapterManager(t.type).getDatabaseAdapterForPlanner(e, t, s)
            }
            canUse(e) {
                return e !== a.a.SQLite || this.canIUseSQLite()
            }
            canIUseSQLite() {
                return !1
            }
            getSpecificAdapterManager(e) {
                let t = u.b;
                if (e === a.a.SQLite)
                    t = u.c;
                const s = n.ModuleContainer.resolve(t);
                return s.hasAlreadyInitialized || (s.install(this.dbSchema),
                s.addEventListener(l.a.UnexpectedError, (e=>{
                    this.dispatchEvent(new l.d(e.error))
                }
                ))),
                s
            }
        }
        ) || i) || i) || i) || i) || i;
        n.ModuleContainer.registerSingleton(h.b, p)
    },
    27: function(e, t) {},
    "5yGw": function(e, t, s) {
        "use strict";
        var i, n = s("jDHv"), r = s("Mgpg"), a = s("DI/x"), o = s("PmZf"), l = s("1UUk"), c = s("0slR"), d = s("d/or"), h = s("teaq");
        let u = n.ModuleContainer.injectable()(i = function(e, t) {
            return n.ModuleContainer.inject(d.a)(e, void 0, 0)
        }(i = function(e, t) {
            return n.ModuleContainer.inject(c.a)(e, void 0, 1)
        }(i = function(e, t) {
            return n.ModuleContainer.inject(r.ZLoggerFactory)(e, void 0, 2)
        }(i = Reflect.metadata("design:type", Function)(i = Reflect.metadata("design:paramtypes", [void 0 === d.a ? Object : d.a, void 0 === c.a ? Object : c.a, void 0 === r.ZLoggerFactory ? Object : r.ZLoggerFactory])(i = class {
            constructor(e, t, s) {
                this.settingsManager = e,
                this.adapterBuilder = t,
                this.configCache = void 0,
                this.logger = void 0,
                this.logger = s.createZLogger("db", ["config"]),
                this.configCache = new Map
            }
            install() {
                n.ModuleContainer.resolve(l.b).addEventListener(o.a.SessionChange, (()=>{
                    this.clearCache()
                }
                ))
            }
            getDatabaseConfigs(e) {
                const t = this.configCache.get(e);
                return t || this.createConfigCache(e)
            }
            clearCache() {
                const e = this.configCache.values();
                let t = e.next();
                for (; !t.done; ) {
                    t.value.forEach((e=>e.clearCache())),
                    t = e.next()
                }
                this.configCache.clear()
            }
            createConfigCache(e) {
                const t = []
                  , s = this.getCurrentConfig(e);
                if (s) {
                    t.push(s);
                    const i = this.getConfigForMigrate(e, s.type);
                    i && t.push(i)
                }
                return this.configCache.set(e, t),
                t
            }
            getConfigForMigrate(e, t) {
                const s = this.settingsManager;
                let i, n = s.getPreferredAdapter(e);
                if (n !== t) {
                    if (n && (i = this.adapterBuilder.computeDatabaseConfig(e, n)),
                    !n || !i) {
                        const t = s.preferAdapters;
                        for (let s = 0; s < t.length && (n = t[s],
                        i = this.adapterBuilder.computeDatabaseConfig(e, n),
                        !i); s++)
                            ;
                    }
                    return i && t !== n ? i : void 0
                }
            }
            getCurrentConfig(e) {
                const t = this.settingsManager.getCurrentAdapterType(e);
                if ("number" != typeof t)
                    throw new a.g(`${t} is not a valid AdapterType value!`);
                return this.adapterBuilder.computeDatabaseConfig(e, t)
            }
        }
        ) || i) || i) || i) || i) || i) || i;
        n.ModuleContainer.registerSingleton(h.b, u)
    },
    "9rga": function(e, t, s) {
        "use strict";
        s.d(t, "a", (function() {
            return u
        }
        )),
        s.d(t, "b", (function() {
            return m
        }
        )),
        s.d(t, "c", (function() {
            return f
        }
        ));
        var i = s("jDHv")
          , n = s("Uzj0")
          , r = s("AH6j")
          , a = s("Mgpg")
          , o = s("YEoC")
          , l = s("DI/x")
          , c = s("PmZf")
          , d = s("1UUk")
          , h = s("0slR");
        class u extends r.b {
            constructor() {
                super(),
                this.session = void 0,
                this.dbSchema = null,
                this.adapterContainers = void 0,
                this.adapterBuilder = void 0,
                this.logger = void 0,
                this.adapterContainers = new Map,
                this.adapterBuilder = i.ModuleContainer.resolve(h.a);
                const e = i.ModuleContainer.resolve(a.ZLoggerFactory);
                this.logger = e.createZLogger("db", [this.getManagerName()])
            }
            install(e) {
                this.dbSchema = e,
                i.ModuleContainer.resolve(d.b).addEventListener(c.a.SessionChange, (e=>{
                    this.session = e.session,
                    this.adapterContainers.clear()
                }
                ))
            }
            get hasAlreadyInitialized() {
                return !!this.dbSchema
            }
            prepareAdapter(e) {
                return e.addEventListener(c.a.UnexpectedError, (e=>{
                    this.dispatchEvent(new c.d(e.error))
                }
                )),
                e
            }
            getAllDBNames() {
                if (!this.dbSchema)
                    throw new l.v(`The following adapter manager hasn't been installed yet: ${this.getManagerName()}!`);
                return Object.keys(this.dbSchema)
            }
            getTablesNameOfDB(e) {
                if (!this.dbSchema)
                    throw new l.v(`The following adapter manager hasn't been installed yet: ${this.getManagerName()}!`);
                const t = this.dbSchema[e];
                if (!t)
                    throw new l.n(e);
                return Object.values(t).map((e=>e.name))
            }
            async getDatabaseAdaptersFromScratch(e, t) {
                void 0 === t && (t = !1);
                const s = this.adapterBuilder.computeDatabaseConfig(e, this.getAdapterType());
                if (!s)
                    throw new l.m(e);
                const i = {};
                let n = this.getTablesNameOfDB(e);
                for (const o of n) {
                    const t = this.adapterBuilder.computeDatabaseName(s, o, this.session)
                      , n = this.adapterBuilder.computePartitionConfig(s, o, this.session);
                    if (!n)
                        throw new l.p(o,this.session);
                    const r = this.adapterBuilder.computeTableConfig(n, o, e);
                    if (!r)
                        throw new l.r(o);
                    let a = [];
                    s.supportPartitionByField && r.supportPartitionByField && (a = await this.getPartitionValues(t));
                    let c = [];
                    c = a.length ? a.map((e=>"" !== e ? `${t}/${e}` : t)) : [t];
                    for (const e of c)
                        i[e] || (i[e] = n)
                }
                const r = Object.keys(i);
                for (const o of r) {
                    await this.isFullnameOfExistedDatabase(o) || delete i[o]
                }
                const a = Object.entries(i).map((e=>{
                    let[s,i] = e;
                    return t ? this.getCreatedDatabaseAdapter(s, i) : this.adapterBuilder.computeDatabaseAdapter(s, i)
                }
                ));
                return Promise.all(a).then((e=>e.filter(Boolean)))
            }
            async doesDatabaseExist(e) {
                const t = this.adapterBuilder.computeDatabaseConfig(e, this.getAdapterType());
                if (!t)
                    throw new l.m(e);
                let s = this.getTablesNameOfDB(e);
                const i = new Set;
                for (const a of s) {
                    const s = this.adapterBuilder.computeDatabaseName(t, a, this.session)
                      , n = this.adapterBuilder.computePartitionConfig(t, a, this.session);
                    if (!n)
                        throw new l.p(a,this.session);
                    const r = this.adapterBuilder.computeTableConfig(n, a, e);
                    if (!r)
                        throw new l.r(a);
                    let o = [];
                    t.supportPartitionByField && r.supportPartitionByField && (o = await this.getPartitionValues(s));
                    let c = [];
                    c = o.length ? o.map((e=>"" !== e ? `${s}/${e}` : s)) : [s],
                    c.forEach((e=>i.add(e)))
                }
                const n = i.values();
                let r = n.next();
                for (; !r.done; ) {
                    const e = r.value;
                    if (await this.isFullnameOfExistedDatabase(e))
                        return !0;
                    r = n.next()
                }
                return !1
            }
            getDatabaseAdapterForPlanner(e, t, s) {
                const i = `${e}_${t.type}`;
                let r = this.adapterContainers.get(i);
                return r || (r = new n.b.Container,
                this.adapterContainers.set(i, r),
                this.adapterBuilder.computeDatabaseAdapter(e, t).then((e=>{
                    e && (e = this.prepareAdapter(e)),
                    r.resolve(e)
                }
                )).catch(r.reject)),
                r.value || r.promise.then((()=>s())).catch((e=>{
                    const t = new l.b(i,e.message);
                    this.logger.zsymb(18, 8706, 3e4, (()=>[t])),
                    this.dispatchEvent(new c.d(t))
                }
                )),
                r.value
            }
            async getCreatedDatabaseAdapter(e, t) {
                const s = `${e}_${t.type}`;
                let i = this.adapterContainers.get(s);
                return i ? (i.value || await i.promise,
                i.value) : null
            }
            async closeDatabase(e) {
                const t = (await this.getDatabaseAdaptersFromScratch(e, !0)).map((e=>e.closeThisDatabase()));
                return Promise.all(t).then((()=>Promise.resolve())).catch((t=>this.logger.zsymb(3, 8706, 30001, "CLOSE database failed!", e, t)))
            }
            closeAllDatabases() {
                let e = this.getAllDBNames().map((e=>this.closeDatabase(e)));
                return Promise.all(e).then((()=>Promise.resolve())).catch((e=>this.logger.zsymb(3, 8706, 30002, "CLOSE ALL databases failed!", e)))
            }
            async deleteDatabase(e) {
                const t = await this.getDatabaseAdaptersFromScratch(e);
                0 === t.length && this.logger.zsymb(3, 8706, 30003, "'{}' database doesn't exist -> Skip its deletion", e);
                const s = t.map((e=>e.deleteThisDatabase()));
                return Promise.all(s).then((()=>Promise.resolve())).catch((t=>this.logger.zsymb(3, 8706, 30004, "DELETE database failed!", e, t)))
            }
            async deleteAllDatabases() {
                const e = this.getAllDBNames().map((e=>this.deleteDatabase(e)));
                await Promise.all(e).then((()=>Promise.resolve())).catch((e=>this.logger.zsymb(3, 8706, 30005, "DELETE ALL databases failed!", e)))
            }
        }
        const g = `database-adapter-manager-${o.a.IDB}`
          , p = `database-adapter-manager-${o.a.SQLite}`
          , m = Object(i.define)(g)
          , f = Object(i.define)(p)
    },
    BtX6: function(e, t, s) {
        s("E2g8").polyfill()
    },
    HPcM: function(e, t, s) {
        "use strict";
        s.d(t, "b", (function() {
            return n
        }
        )),
        s.d(t, "a", (function() {
            return r
        }
        ));
        var i = s("jDHv");
        const n = Object(i.define)("zlog-sentry-bucket")
          , r = Object(i.define)("zlog-regular-bucket")
    },
    K8kB: function(e, t, s) {
        "use strict";
        s.d(t, "a", (function() {
            return n
        }
        ));
        var i = s("jDHv");
        const n = Object(i.define)("zlog-write-scheduler")
    },
    KdAX: function(e, t, s) {
        "use strict";
        var i = s("jDHv")
          , n = s("W8fB")
          , r = s("UJDs")
          , a = s("7FSS")
          , o = (s("j6JD"),
        s("VTBJ"));
        const l = s("4JQ2")
          , c = {
            intro: e=>c.eol(e),
            info: e=>e,
            debug: e=>e,
            warning: e=>e,
            error: e=>e,
            placeholder: e=>e,
            tick: e=>e,
            header: e=>l.green(e),
            sourcemap: e=>l.gray(e),
            level: e=>e,
            bold: e=>l.bold(e),
            eol: e=>e + "\n\n"
        }
          , d = (Object(o.a)(Object(o.a)({}, c), {}, {
            intro: e=>c.eol(l.bgWhite.black(e)),
            info: e=>l.white(e),
            debug: e=>l.blue(e),
            warning: e=>l.yellow(e),
            error: e=>l.red(e),
            tick: e=>l.black.bgWhite.bold(` ${e} `),
            header: e=>e
        }),
        c);
        s("CDcE");
        const h = {
            display: !0,
            style: "font-size: 11px; color: gray"
        }
          , u = {
            display: !1,
            style: "font-size: 11px; color: gray; margin-bottom: 8px"
        };
        function g(e) {
            let {lineMeta: t, template: s, args: i} = e;
            if ("number" == typeof s)
                return "Error: expected template as string. Got number?! [" + t.id1 + ":" + t.id2 + "]";
            const n = [t.module, t.features.join("/")].map((e=>e || "?")).join("|");
            let r = i.map((e=>function(e) {
                let t = e;
                if ("function" == typeof e)
                    try {
                        t = e()
                    } catch (s) {
                        a.a.error("ZLogSanitizer: failed to exec func. Please make sure your func executable" + s),
                        t = e.toString()
                    }
                return t
            }(e)));
            1 === r.length && 1 === i.length && "function" == typeof i[0] && Array.isArray(r[0]) && (r = r[0]);
            const o = function(e, t) {
                if (null === e)
                    return "";
                const s = "{}";
                let i = 0;
                for (; -1 !== e.search(s) && i < t.length; )
                    switch (typeof t[i++]) {
                    case "number":
                        e = e.replace(s, "%d");
                        break;
                    case "string":
                    default:
                        e = e.replace(s, "%s");
                        break;
                    case "object":
                        e = e.replace(s, "%o")
                    }
                return e
            }(s, r).trim()
              , l = (t.id1.toString().substring(t.id1.toString().indexOf("src")),
            t.id2,
            "")
              , c = [];
            return h.display && n.trim() && c.push(d.sourcemap(n.trim()) + "\n"),
            u.display && l.trim() && c.push(d.sourcemap(l) + "\n"),
            o.trim() && c.push(o.trim()),
            r.length > 0 ? (r.unshift(c.join(" ")),
            r) : [c.join(" ")]
        }
        var p;
        let m = Object(i.injectable)()(p = class {
            write(e) {
                const t = g(e);
                switch (e.lineMeta.level) {
                case r.b.info:
                    a.a.log.apply(null, t);
                    break;
                case r.b.warn:
                    a.a.warn.apply(null, t);
                    break;
                case r.b.debug:
                    a.a.debug.apply(null, t);
                    break;
                case r.b.error:
                    a.a.error.apply(null, t);
                    break;
                default:
                    a.a.log.apply(null, t)
                }
            }
        }
        ) || p;
        i.ModuleContainer.registerSingleton(n.a, m)
    },
    Lq8m: function(e, t, s) {
        "use strict";
        (function(e) {
            var t, i = s("jDHv"), n = s("Uzj0"), r = s("Mgpg"), a = s("UK4g"), o = s("YEoC"), l = s("DI/x"), c = s("tHMN"), d = s("ipeT"), h = s("LzQZ"), u = s("pjo1");
            let g = i.ModuleContainer.injectable()(t = function(e, t) {
                return i.ModuleContainer.inject(c.b)(e, void 0, 0)
            }(t = function(e, t) {
                return i.ModuleContainer.inject(r.ZLoggerFactory)(e, void 0, 1)
            }(t = function(e, t) {
                return i.ModuleContainer.inject(h.a)(e, void 0, 2)
            }(t = Reflect.metadata("design:type", Function)(t = Reflect.metadata("design:paramtypes", [void 0 === c.a ? Object : c.a, void 0 === r.ZLoggerFactory ? Object : r.ZLoggerFactory, void 0 === h.a ? Object : h.a])(t = class {
                constructor(e, t, s) {
                    this.engine = e,
                    this.loggerFactory = t,
                    this.transactionManager = s,
                    this.logger = void 0,
                    this.logger = this.loggerFactory.createZLogger("db", ["client"])
                }
                createQueryBuilder(e) {
                    const t = n.c.map(e, ((e,t)=>this.createBuilder(e, t)));
                    return t.deleteAllDatabases = this.deleteAllDatabases.bind(this),
                    t.closeAllDatabases = this.closeAllDatabases.bind(this),
                    t
                }
                createBuilder(e, t, s) {
                    const i = n.c.map(t, ((t,i)=>new d.a(this.engine,e,i,a.j,s)));
                    return i.runTransaction = this.runTransaction.bind(this, e, t),
                    i.deleteThisDatabase = this.deleteDatabase.bind(this, e),
                    i.closeThisDatabase = this.closeDatabase.bind(this, e),
                    i.doesThisDatabaseExist = this.doesDatabaseExists.bind(this, e),
                    i
                }
                runTransaction(t, s, i, n, r) {
                    void 0 === r && (r = o.f.READWRITE);
                    const a = this.transactionManager
                      , c = this.engine;
                    return new Promise(((o,h)=>{
                        try {
                            !async function(o, h) {
                                const u = i.map((e=>"string" == typeof e ? e : e.name))
                                  , g = await a.beginTransaction(t, u, r)
                                  , p = u.map((e=>{
                                    if (!s[e])
                                        throw new l.r(e);
                                    const i = s[e];
                                    return new d.a(c,t,i,g.id)
                                }
                                ));
                                await n(p),
                                e((()=>{
                                    a.commitTransaction(g.id).then(o).catch(h)
                                }
                                ))
                            }(o, h)
                        } catch (u) {
                            h(u)
                        }
                    }
                    ))
                }
                deleteDatabase(e) {
                    return this.engine.deleteDatabase(e)
                }
                deleteAllDatabases() {
                    return this.engine.deleteAllDatabases()
                }
                closeDatabase(e) {
                    return this.engine.closeDatabase(e)
                }
                closeAllDatabases() {
                    return this.engine.closeAllDatabases()
                }
                doesDatabaseExists(e) {
                    return this.engine.doesDatabaseExists(e)
                }
            }
            ) || t) || t) || t) || t) || t) || t;
            i.ModuleContainer.registerSingleton(u.a, g)
        }
        ).call(this, s("NWH6").setImmediate)
    },
    UJDs: function(e, t, s) {
        "use strict";
        let i;
        s.d(t, "b", (function() {
            return i
        }
        )),
        s.d(t, "a", (function() {
            return n
        }
        )),
        function(e) {
            e[e.info = 0] = "info",
            e[e.error = 1] = "error",
            e[e.warn = 2] = "warn",
            e[e.debug = 3] = "debug",
            e[e.critical = 4] = "critical"
        }(i || (i = {}));
        const n = {
            [i.info]: "info",
            [i.error]: "error",
            [i.warn]: "warn",
            [i.debug]: "debug",
            [i.critical]: "critical"
        }
    },
    W8fB: function(e, t, s) {
        "use strict";
        s.d(t, "b", (function() {
            return n
        }
        )),
        s.d(t, "a", (function() {
            return r
        }
        )),
        s.d(t, "c", (function() {
            return a
        }
        ));
        var i = s("jDHv");
        const n = Object(i.define)("sen-log-writer")
          , r = Object(i.define)("console-log-writer")
          , a = Object(i.define)("zlog-writer")
    },
    XidR: function(e, t, s) {
        "use strict";
        var i = s("jDHv")
          , n = s("YEoC")
          , r = s("x9oK")
          , a = s("9rga");
        class o extends a.a {
            getAdapterFactoryToken() {
                return r.b
            }
            async isFullnameOfExistedDatabase(e) {
                try {
                    return (await function(e) {
                        const t = globalThis.indexedDB.open(e);
                        return new Promise(((s,i)=>{
                            t.onupgradeneeded = function() {
                                var s;
                                null === (s = t.transaction) || void 0 === s || s.abort(),
                                i(new c(`No database whose name is ${e} exists`))
                            }
                            ,
                            t.onsuccess = function() {
                                s(t.result)
                            }
                            ,
                            t.onerror = function() {
                                i(t.error)
                            }
                        }
                        ))
                    }(e)).close(),
                    !0
                } catch (t) {
                    if (t.name === l)
                        return !1;
                    throw t
                }
            }
            getManagerName() {
                return "idb-adapter-manager"
            }
            async getPartitionValues(e) {
                return []
            }
            getAdapterType() {
                return n.a.IDB
            }
        }
        i.ModuleContainer.registerSingleton(a.b, o);
        const l = "NonExistedDBError";
        class c extends Error {
            constructor(e) {
                super(e),
                this.name = l
            }
        }
    },
    XuBa: function(e, t, s) {
        "use strict";
        s.d(t, "a", (function() {
            return n
        }
        ));
        const i = s("NFKh");
        class n {
            static encrypt(e) {
                return i.AES.encrypt(e, "5dbe084b7eedNWjRref04e2rDxs01lwH", {
                    iv: "7eb5dbe084b7eedeef04e2622d46ba00",
                    mode: i.mode.ECB,
                    padding: i.pad.Pkcs7
                }) + ""
            }
            static decrypt(e) {
                return i.AES.decrypt(e, "5dbe084b7eedNWjRref04e2rDxs01lwH", {
                    keySize: 16,
                    iv: "7eb5dbe084b7eedeef04e2622d46ba00",
                    mode: i.mode.ECB,
                    padding: i.pad.Pkcs7
                }).toString(i.enc.Utf8)
            }
        }
    },
    Y41u: function(e, t, s) {
        "use strict";
        let i;
        s.d(t, "c", (function() {
            return i
        }
        )),
        s.d(t, "b", (function() {
            return n
        }
        )),
        s.d(t, "a", (function() {
            return r
        }
        )),
        function(e) {
            e.RegLogBucketStatus = "RegLogBucketStatus",
            e.SentryLogBucketStatus = "SentryLogBucketStatus",
            e.WriteSchedulerRequestFlush = "WriteSchedulerRequestFlush",
            e.WriterStatus = "WriterStatus",
            e.LogBucketRequestFlush = "LogBucketRequestFlush"
        }(i || (i = {}));
        class n {
            constructor(e, t) {
                this.type = e,
                this.payload = t
            }
        }
        class r {
            constructor(e) {
                this.type = e
            }
        }
    },
    cF85: function(e, t, s) {
        "use strict";
        var i = s("jDHv")
          , n = s("x9oK")
          , r = s("PmZf")
          , a = s("AH6j");
        let o;
        !function(e) {
            e.AbnormallyClose = "abnormally-closed"
        }(o || (o = {}));
        class l extends a.a {
            constructor() {
                super(o.AbnormallyClose)
            }
        }
        var c = s("LzQZ")
          , d = s("rvru")
          , h = s("xpEm")
          , u = s("DI/x");
        function g(e) {
            return new Promise(((t,s)=>{
                e.onerror = ()=>s(e.error),
                e.onsuccess = ()=>t(e.result)
            }
            ))
        }
        function p(e, t, s) {
            return `Invalid filter value for this method: '${e}' - Expected type: '${t}' - Actual type: '${s}'`
        }
        function m(e, t) {
            const s = Object(h.m)(t, {
                operations: {
                    AND: h.a,
                    OR: h.k,
                    NOT: h.j,
                    gt: h.c,
                    gte: h.d,
                    lt: h.f,
                    lte: h.g,
                    in: h.e,
                    notIn: h.i,
                    eq: h.b,
                    notEq: h.h,
                    contains(e, t, s) {
                        if ("string" != typeof e) {
                            const t = p("contains", "string", typeof e);
                            throw new u.l(t)
                        }
                        return Object(h.l)((t=>"string" == typeof t && t.includes(e)), t, s)
                    },
                    startsWith(e, t, s) {
                        if ("string" != typeof e) {
                            const t = p("startsWith", "string", typeof e);
                            throw new u.l(t)
                        }
                        return Object(h.l)((t=>"string" == typeof t && t.startsWith(e)), t, s)
                    },
                    endsWith(e, t, s) {
                        if ("string" != typeof e) {
                            const t = p("endsWith", "string", typeof e);
                            throw new u.l(t)
                        }
                        return Object(h.l)((t=>"string" == typeof t && t.endsWith(e)), t, s)
                    }
                }
            });
            return s(e)
        }
        class f extends a.b {
            constructor(e) {
                super(),
                this.connectionFactory = e,
                this.connection = null,
                this.isManuallyClose = !1,
                this.onAbnormallyCloseListeners = []
            }
            async getName() {
                return (await this.getConnection()).name
            }
            async getObjectStoreNames() {
                return (await this.getConnection()).objectStoreNames
            }
            async getVersion() {
                return (await this.getConnection()).version
            }
            async getConnection(e) {
                void 0 === e && (e = !1);
                const t = async()=>{
                    let e = null;
                    try {
                        e = await this.connectionFactory()
                    } catch (t) {
                        let e = t;
                        throw "VersionError" === t.name && (e = new u.k(t.message)),
                        this.dispatchEvent(new r.d(e)),
                        t
                    }
                    return e.onclose = ()=>{
                        this.dispatchEvent(new l)
                    }
                    ,
                    e
                }
                ;
                if (this.connection) {
                    if (e) {
                        if (this.isManuallyClose)
                            throw new u.d("The database connection has manually been closed!",["idb"]);
                        const e = this.connection;
                        this.onAbnormallyCloseListeners.forEach((t=>{
                            e.removeEventListener("close", t)
                        }
                        )),
                        this.connection = await t()
                    }
                } else
                    this.connection = await t();
                return this.connection
            }
            async getTransaction(e, t) {
                let s = await this.getConnection()
                  , i = null;
                try {
                    i = s.transaction(e, t)
                } catch (n) {
                    if (!n || "InvalidStateError" !== n.name && 11 !== n.code)
                        throw n;
                    s = await this.getConnection(!0),
                    i = s.transaction(e, t)
                }
                return i
            }
            close() {
                this.connection && !this.isManuallyClose && (this.connection.close(),
                this.isManuallyClose = !0)
            }
        }
        var v = s("bSii")
          , b = s("3wcW");
        class I extends b.a {
            constructor(e, t, s) {
                super(e, t, !1),
                this._transaction = s,
                this.allowMissingTable = !1
            }
            async delete() {}
            async close() {
                this.instance && this.instance.close()
            }
            async _getTables() {
                return Array.from(this.instance.objectStoreNames)
            }
            async _createTable(e) {
                const t = this.instance;
                let s = {};
                if (e.isNonFieldlikeEntity)
                    s = {
                        autoIncrement: !0
                    };
                else {
                    const t = e.primaryIndex;
                    s = {
                        keyPath: Object(v.a)(t.getRealFields()),
                        autoIncrement: t.autoIncrement
                    }
                }
                if (t.objectStoreNames.contains(e.tableName))
                    return;
                const i = t.createObjectStore(e.tableName, s);
                Object.values(e.indices).map((e=>{
                    if ("primary" === e.name)
                        return;
                    const t = e.fields.map((e=>"object" != typeof e ? e : "length" === e.type ? `${e.field.toString()}.length` : e.field));
                    i.createIndex(e.name, Object(v.a)(t), {
                        unique: e.unique
                    })
                }
                ))
            }
            async _createIndex(e, t) {
                const s = this._transaction;
                if (!s)
                    throw new u.u(`Can't create '${t}' due to unavailable IDBTransaction transaction!`);
                const i = s.objectStore(e.tableName)
                  , n = e.getIndex(t)
                  , r = n.fields.map((e=>"object" != typeof e ? e : "length" === e.type ? `${e.field.toString()}.length` : e.field));
                var a;
                i.createIndex(t, 1 === (a = r).length ? a[0] : a, {
                    unique: n.unique
                })
            }
            _addColumns(e, t) {
                return Promise.resolve()
            }
        }
        var y = s("VTBJ")
          , C = s("YEoC")
          , S = s("X2RP");
        class E extends S.a {
            constructor(e, t) {
                super(),
                this.instance = e,
                this.transactionManager = t
            }
            getExecutorName() {
                return "idb"
            }
            async clear(e) {
                let {transaction: t, meta: s} = e;
                const i = s.tableConfig;
                return g((await this.getStore(t, i, C.f.READWRITE)).clear())
            }
            async get(e) {
                let {transaction: t, meta: s, params: i} = e;
                const n = i.index
                  , r = i.key
                  , a = s.tableConfig
                  , o = await this.getStoreOrIndex(t, a, n)
                  , l = this.validateKey(a, n, r)
                  , c = o.get(l);
                return this.getResult(a, c)
            }
            async getMulti(e) {
                let {transaction: t, meta: s, params: i} = e;
                const n = i.index
                  , r = i.keys
                  , a = s.tableConfig
                  , o = await this.getStoreOrIndex(t, a, n)
                  , l = r.map((e=>{
                    const t = this.validateKey(a, n, e)
                      , s = o.get(t);
                    return this.getResult(a, s)
                }
                ));
                return Promise.all(l)
            }
            getAll(e) {
                return e.params.direction === C.b.PREV || e.params.direction === C.b.PREV_UNIQUE || e.params.filter || e.params.predicate || e.params.aborted || e.params.onProgress || e.params.onValue ? this.getAllByCursor(e) : this.getAllWithoutFilter(e)
            }
            async getAllKeyByCursor(e) {
                let {meta: t, params: s, transaction: i} = e;
                const n = t.tableConfig
                  , r = s.range && this.toIDBKeyRange(s.range)
                  , a = (await this.getStoreOrIndex(i, n, s.index)).openKeyCursor(r, s.direction);
                return null === a ? [] : new Promise(((e,t)=>{
                    const i = [];
                    a.onsuccess = ()=>{
                        const t = a.result;
                        if (null === t || null === t.primaryKey)
                            return void e(i);
                        const n = t.primaryKey;
                        i.push(n);
                        i.length >= s.limit ? e(i) : t.continue()
                    }
                    ,
                    a.onerror = ()=>{
                        t(a.error)
                    }
                }
                ))
            }
            async getAllKey(e) {
                if (e.params.direction === C.b.PREV || e.params.direction === C.b.PREV_UNIQUE)
                    return this.getAllKeyByCursor(e);
                {
                    const {meta: t, params: s, transaction: i} = e
                      , n = t.tableConfig
                      , r = s.range && this.toIDBKeyRange(s.range);
                    return g((await this.getStoreOrIndex(i, n, s.index)).getAllKeys(r, s.limit))
                }
            }
            async getAndUpdate(e) {
                const {transaction: t, params: s, meta: i} = e
                  , n = s.index
                  , r = s.updater
                  , a = s.key
                  , o = i.tableConfig
                  , l = await this.getStoreOrIndex(t, o, n)
                  , c = this.validateKey(o, n, a)
                  , d = l.get(c)
                  , h = await this.getResult(o, d);
                if (void 0 === h)
                    return;
                const p = await this.getStore(t, o, C.f.READWRITE)
                  , m = await r(h || {});
                if (!m && !1 !== s.ignoreNotFound)
                    throw new u.f("Update undefined document");
                const f = this.toDB(o, m)
                  , v = p.put(f);
                return await g(v),
                m
            }
            insert(e) {
                return e.params.replace ? this._insertOrReplace(e) : this._insertIfNotExist(e)
            }
            insertMulti(e) {
                return e.params.replace ? this.insertOrReplaceMulti(e) : this.insertIfNotExistMulti(e)
            }
            async update(e) {
                const {transaction: t, meta: s, params: i} = e
                  , n = s.tableConfig
                  , r = await this.getStore(t, n, C.f.READWRITE);
                return this._update(r, this.validateKey(n, "primary", i.key), i.attributes, this.toDB(n, i.value, !1), i.ignoreNotFound).then((t=>t ? this.fromDB(e.meta.tableConfig, t) : t))
            }
            async updateMulti(e) {
                const {transaction: t, meta: s, params: i} = e
                  , n = s.tableConfig
                  , r = await this.getStore(t, n, C.f.READWRITE)
                  , a = []
                  , o = []
                  , l = i.patches.map((t=>this._update(r, this.validateKey(n, "primary", t.key), t.attributes, this.toDB(n, t.value, !1), i.ignoreNotFound).then((t=>t ? this.fromDB(e.meta.tableConfig, t) : t)).then((e=>{
                    e ? a.push(e) : o.push(e)
                }
                ))));
                return Promise.all(l).then((()=>({
                    success: a,
                    fail: o
                })))
            }
            async delete(e) {
                let {transaction: t, meta: s, params: i} = e;
                const n = s.tableConfig
                  , r = (await this.getStore(t, n, C.f.READWRITE)).delete(this.validateKey(n, "primary", i.key));
                return this.checkReqSuccessOrFail(r)
            }
            async deleteMulti(e) {
                let {transaction: t, meta: s, params: i} = e;
                const n = s.tableConfig
                  , r = await this.getStore(t, n, C.f.READWRITE)
                  , a = {
                    success: [],
                    fail: []
                }
                  , o = i.keys.map((e=>this.checkReqSuccessOrFail(r.delete(e)).then((t=>{
                    t ? a.success.push(e) : a.fail.push(e)
                }
                ))));
                return await Promise.all(o),
                a
            }
            async count(e) {
                let {transaction: t, meta: s, params: i} = e;
                const n = s.tableConfig
                  , r = this.toIDBKeyRange(i.range);
                return g((await this.getStoreOrIndex(t, n, i.index)).count(r))
            }
            async findAndDelete(e) {
                let {transaction: t, meta: s, params: i} = e;
                const n = s.tableConfig
                  , {filter: r} = i
                  , a = r ? e=>m(e, r) : null
                  , o = this.toIDBKeyRange(i.range)
                  , l = (await this.getStore(t, n, C.f.READWRITE)).openCursor(o);
                return null === l ? 0 : new Promise(((e,t)=>{
                    let s = 0
                      , i = !1;
                    l.onsuccess = ()=>{
                        if (i)
                            return;
                        const t = l.result;
                        if (null === t || null === t.value)
                            return i = !0,
                            void e(s);
                        const r = this.fromDB(n, t.value);
                        a && !a(r) || (t.delete(),
                        s += 1,
                        !i) ? t.continue() : e(s)
                    }
                    ,
                    l.onerror = ()=>{
                        t(l.error)
                    }
                }
                ))
            }
            beginTransaction(e) {
                throw new u.a("beginTransaction",["idb"])
            }
            commitTransaction(e) {
                throw new u.a("commitTransaction",["idb"])
            }
            async getAllByCursor(e) {
                let {transaction: t, meta: s, params: i, deferrer: n} = e;
                const r = s.tableConfig
                  , {onProgress: a, advance: o, stepCount: l, onValue: c, predicate: d, filter: h} = i;
                if (d && h) {
                    const e = new u.l("Query using both 'filter' and 'predicate' is not allowed!");
                    return void (null == n || n.reject(e))
                }
                let g = null;
                (d || h) && (g = d || (e=>m(e, h)));
                const p = await this.getStoreOrIndex(t, r, i.index)
                  , f = this.toIDBKeyRange(i.range)
                  , v = p.openCursor(f, i.direction);
                return null === v ? [] : new Promise(((e,t)=>{
                    const s = [];
                    let n = !1
                      , d = !!o;
                    v.onsuccess = ()=>{
                        if (n)
                            return;
                        const t = v.result;
                        if (null === t || null === t.value)
                            return n = !0,
                            void e(s);
                        if (d && o)
                            return d = !1,
                            void t.advance(o);
                        const h = this.fromDB(r, t.value);
                        c && c(h),
                        g && !g(h) || (s.push(h),
                        a && a(s, h),
                        n = s.length >= i.limit,
                        n || (n = !!i.aborted && i.aborted(s, h)),
                        !n) ? (l && t.advance(l),
                        t.continue()) : e(s)
                    }
                    ,
                    v.onerror = ()=>{
                        t(v.error)
                    }
                }
                ))
            }
            async getAllWithoutFilter(e) {
                let {transaction: t, meta: s, params: i} = e;
                const n = s.tableConfig
                  , r = this.toIDBKeyRange(i.range)
                  , a = (await this.getStoreOrIndex(t, n, i.index)).getAll(r, i.limit);
                return this.getResult(n, a)
            }
            async getStoreOrIndex(e, t, s) {
                const i = await this.getStore(e, t, C.f.READONLY);
                if ("primary" === s)
                    return i;
                const n = t.getIndex(s);
                if (!n)
                    throw new u.o(s);
                return i.index(n.name)
            }
            async _insertIfNotExist(e) {
                const {transaction: t, meta: s, params: i} = e
                  , n = s.tableConfig
                  , r = await this.getTransaction(t, n, C.f.READWRITE)
                  , a = r.objectStore(n.tableName);
                let o = null;
                if (!n.isNonFieldlikeEntity) {
                    const e = n.primaryIndex;
                    if (!e.autoIncrement) {
                        const t = Object(v.a)(e.createKey(i.value))
                          , s = a.get(t);
                        o = await new Promise((e=>{
                            s.onsuccess = ()=>{
                                const t = this.fromDB(n, s.result);
                                e(t)
                            }
                            ,
                            s.onerror = ()=>{
                                e(null)
                            }
                        }
                        ))
                    }
                }
                if (o)
                    return Promise.resolve(o);
                {
                    const e = a.add(this.toDB(n, i.value));
                    return t ? g(e).then((()=>i.value)) : new Promise(((t,s)=>{
                        r.oncomplete = ()=>{
                            t(i.value)
                        }
                        ,
                        r.onerror = ()=>{
                            var n;
                            0 === (null === (n = e.error) || void 0 === n ? void 0 : n.code) ? t(i.value) : s(e.error)
                        }
                    }
                    ))
                }
            }
            async _insertOrReplace(e) {
                const {transaction: t, meta: s, params: i} = e
                  , n = s.tableConfig
                  , r = await this.getTransaction(t, n, C.f.READWRITE)
                  , a = r.objectStore(n.tableName).put(this.toDB(n, i.value));
                return t ? g(a).then((()=>i.value)) : new Promise(((e,t)=>{
                    r.oncomplete = ()=>{
                        e(i.value)
                    }
                    ,
                    r.onerror = ()=>{
                        t(a.error)
                    }
                }
                ))
            }
            async insertIfNotExistMulti(e) {
                const {transaction: t, meta: s, params: i} = e
                  , n = s.tableConfig
                  , r = await this.getTransaction(t, n, C.f.READWRITE)
                  , a = r.objectStore(n.tableName)
                  , o = []
                  , l = []
                  , c = i.values.map((async e=>{
                    let t = !1;
                    if (!n.isNonFieldlikeEntity) {
                        const s = n.primaryIndex;
                        if (!s.autoIncrement) {
                            const i = Object(v.a)(s.createKey(e))
                              , r = a.get(i);
                            t = await new Promise((e=>{
                                r.onsuccess = ()=>{
                                    const t = this.fromDB(n, r.result);
                                    let s = !1;
                                    void 0 !== t && (o.push(t),
                                    s = !0),
                                    e(s)
                                }
                                ,
                                r.onerror = ()=>{
                                    e(!1)
                                }
                            }
                            ))
                        }
                    }
                    if (t)
                        return;
                    const s = a.add(this.toDB(n, e));
                    return this.checkReqSuccessOrFail(s).then((t=>{
                        if (t) {
                            let t = e;
                            if (!n.isNonFieldlikeEntity) {
                                const {primaryIndex: e} = n
                                  , i = e.fields[0].field;
                                Object.prototype.hasOwnProperty.call(t, i) || (t[i] = s.result)
                            }
                            o.push(t)
                        } else
                            l.push(e)
                    }
                    )).catch((()=>{
                        l.push(e)
                    }
                    ))
                }
                ));
                return t ? Promise.all(c).then((()=>({
                    success: o,
                    fail: l
                }))) : new Promise((e=>{
                    r.oncomplete = ()=>{
                        e({
                            success: o,
                            fail: l
                        })
                    }
                    ,
                    r.onerror = ()=>{
                        e({
                            success: o,
                            fail: l
                        })
                    }
                }
                ))
            }
            async insertOrReplaceMulti(e) {
                const {transaction: t, meta: s, params: i} = e
                  , n = s.tableConfig
                  , r = await this.getTransaction(t, n, C.f.READWRITE)
                  , a = r.objectStore(n.tableName)
                  , o = []
                  , l = []
                  , c = i.values.map((e=>{
                    const t = a.put(this.toDB(n, e));
                    return this.checkReqSuccessOrFail(t).then((()=>{
                        let s = e;
                        if (!n.isNonFieldlikeEntity) {
                            const {primaryIndex: e} = n
                              , i = e.fields[0].field;
                            Object.prototype.hasOwnProperty.call(s, i) || (s[i] = t.result)
                        }
                        o.push(s)
                    }
                    )).catch((()=>{
                        l.push(e)
                    }
                    ))
                }
                ));
                return t ? Promise.all(c).then((()=>({
                    success: o,
                    fail: l
                }))) : new Promise(((e,t)=>{
                    r.oncomplete = ()=>e({
                        success: o,
                        fail: l
                    }),
                    r.onerror = ()=>e({
                        success: o,
                        fail: l
                    })
                }
                ))
            }
            async _update(e, t, s, i, n) {
                const r = await g(e.get(t));
                if (!r) {
                    if (n)
                        return;
                    throw new u.f("Update undefined document!")
                }
                return await g(e.put(s.reduce(((e,t)=>(e[t] = i[t],
                e)), r))),
                r
            }
            checkReqSuccessOrFail(e) {
                return g(e).then((()=>!0)).catch((()=>!1))
            }
            getTransaction(e, t, s) {
                const i = t.tableName;
                if (e > 0) {
                    const t = this.transactionManager.get(e);
                    return Promise.resolve(t.instance)
                }
                return this.instance.getTransaction([i], s)
            }
            async getStore(e, t, s) {
                return (await this.getTransaction(e, t, s)).objectStore(t.tableName)
            }
            toIDBKeyRange(e) {
                if (e) {
                    if (e.from && e.to)
                        try {
                            return IDBKeyRange.bound(e.from, e.to, e.excludeFrom, e.excludeTo)
                        } catch (t) {
                            throw t
                        }
                    return e.from ? IDBKeyRange.lowerBound(e.from, e.excludeFrom) : e.to ? IDBKeyRange.upperBound(e.to, e.excludeTo) : void 0
                }
            }
            getResult(e, t) {
                return g(t).then((t=>this.fromDB(e, t)))
            }
            toDB(e, t, s) {
                void 0 === s && (s = !0);
                try {
                    e.validate(t, s)
                } catch (n) {
                    this.logger.zsymb(21, 9691, 3e4, "{}: {} (database={}, table={})", n.name, n.message, e.dbName, e.name)
                }
                const {isNonFieldlikeEntity: i} = e;
                return function(t) {
                    if (0 === e.transforms.length)
                        return t;
                    const s = t=>{
                        if (i)
                            return e.transforms.reduce(((e,t)=>t.toDB(e)), t);
                        {
                            const s = Object(y.a)({}, t);
                            return e.transforms.forEach((e=>{
                                e.toDB(s)
                            }
                            )),
                            s
                        }
                    }
                    ;
                    return Array.isArray(t) ? t.map(s) : s(t)
                }(t = e.prepareValue(t, s, i))
            }
            fromDB(e, t) {
                if (0 === e.transforms.length)
                    return t;
                const s = t=>(e.transforms.forEach((e=>{
                    e.fromDB(t)
                }
                )),
                t);
                return Array.isArray(t) ? t.map(s) : s(t)
            }
            validateKey(e, t, s) {
                if (!e.getIndex(t).validateKey(s))
                    throw new u.l("The query key is invalid!");
                return s
            }
        }
        class _ {
            constructor(e, t) {
                this.partition = e,
                this.instance = t
            }
            async beginTransaction(e) {
                try {
                    const t = e.params.tables.map((e=>this.partition.getTableConfig(e).tableName))
                      , s = e.params.mode
                      , i = await this.instance.getTransaction(t, s)
                      , n = e.transaction;
                    e.deferrer.resolve(new T(n,i))
                } catch (t) {
                    e.deferrer.reject(t)
                }
            }
        }
        class T {
            constructor(e, t) {
                this.id = e,
                this.instance = t,
                this.error = null,
                this.closed = void 0,
                this.onCloseListeners = [],
                this.closed = !1;
                const s = e=>{
                    this.closed = !0,
                    this.error = e,
                    this.onCloseListeners.forEach((t=>t(e)))
                }
                ;
                t.addEventListener("complete", (()=>s(t.error))),
                t.addEventListener("abort", (()=>s(t.error))),
                t.addEventListener("error", (()=>s(t.error)))
            }
            execute(e) {
                return e().catch((e=>{
                    throw this.instance.abort(),
                    e
                }
                ))
            }
            onClose(e) {
                this.onCloseListeners.push(e),
                this.closed && e(this.error)
            }
        }
        var L, O = s("rkiK");
        class F extends n.a {
            constructor(e, t, s, i, n, a) {
                super(e, t, s, i, n, a, {}),
                this.instance.addEventListener(r.a.UnexpectedError, (e=>{
                    this.dispatchEvent(new r.d(e.error))
                }
                )),
                this.instance.addEventListener(o.AbnormallyClose, (()=>{
                    this.logger.zsymb(6, 9436, 3e4, "The database connection has abnormally closed!")
                }
                ))
            }
            deleteThisDatabase() {
                this.instance.isManuallyClose = !0;
                const e = indexedDB.deleteDatabase(this.fullName)
                  , t = this.instance
                  , s = this.fullName
                  , i = this.logger;
                return i.zsymb(6, 9436, 30001, `The database connection is manually closed due to database deletion: '${s}'`),
                new Promise(((n,r)=>{
                    e.onsuccess = function() {
                        i.zsymb(0, 9436, 30002, `Delete database sucessfully: '${s}'`),
                        n()
                    }
                    ,
                    e.onblocked = function() {
                        t.close()
                    }
                    ,
                    e.onerror = function() {
                        const t = e.error;
                        i.zsymb(0, 9436, 30003, `Failed to delete database: '${s}' - Error: ${t}`),
                        r(t)
                    }
                }
                ))
            }
            closeThisDatabase() {
                return this.instance.close(),
                this.logger.zsymb(6, 9436, 30004, `The database connection is manually closed due to manual database closing: '${this.fullName}'`),
                new Promise((e=>{
                    setTimeout((()=>{
                        e()
                    }
                    ), 1e4)
                }
                ))
            }
            static async factory(e, t) {
                const s = new f((async function() {
                    const s = indexedDB.open(e, t.version);
                    s.onupgradeneeded = async e=>{
                        if (null !== e.newVersion)
                            try {
                                const i = new I(t,s.result,s.transaction);
                                await i.upgrade(e.oldVersion, e.newVersion),
                                await i.validate()
                            } catch (i) {
                                throw s.transaction.abort(),
                                i
                            }
                    }
                    ;
                    const n = O.e.start(O.b.db_ready)
                      , r = Date.now()
                      , a = i.ModuleContainer.resolve(d.a)
                      , o = setTimeout((()=>{
                        a.sendLongOpenRequestQos(e)
                    }
                    ), 2e4)
                      , l = await g(s).catch((e=>{
                        throw clearTimeout(o),
                        e
                    }
                    ))
                      , c = Date.now();
                    clearTimeout(o);
                    const h = c - r;
                    return a.sendSuccessOpenDBDurationQos(e, r, h),
                    n.end({
                        dbName: e
                    }),
                    l.onversionchange = function(e) {
                        if (null === e.newVersion) {
                            e.target.close()
                        }
                    }
                    ,
                    l
                }
                ))
                  , n = i.ModuleContainer.resolve(c.a)
                  , r = new _(t,s)
                  , a = new E(s,n);
                return t.tables.forEach((e=>e.transforms.forEach((e=>e.init(t.cipherKey))))),
                new F(t,e,n,s,a,r)
            }
        }
        let R = i.ModuleContainer.injectable()(L = class {
            async createAdapter(e, t) {
                return F.factory(e, t)
            }
        }
        ) || L;
        i.ModuleContainer.registerSingleton(n.b, R)
    },
    ebA4: function(e, t, s) {
        "use strict";
        s.d(t, "c", (function() {
            return c
        }
        )),
        s.d(t, "b", (function() {
            return d
        }
        )),
        s.d(t, "a", (function() {
            return h
        }
        ));
        var i = s("UJDs")
          , n = s("j6JD")
          , r = s("CDcE")
          , a = s("fsQs")
          , o = s("XuBa");
        const l = new TextEncoder;
        function c(e) {
            let t = e;
            if (Object(r.c)(t))
                return t.asset = o.a.encrypt(t.asset),
                t;
            if (Object(r.b)(t))
                return t.args;
            if ("function" == typeof t)
                try {
                    t = e()
                } catch (s) {
                    t = t.toString()
                }
            return "object" == typeof t && (t = JSON.stringify(t, Object(r.a)())),
            "string" == typeof t && (t = t.replace(/\r\n|\n|\t|\r/g, "").toString()),
            t
        }
        function d(e, t) {
            let {lineMeta: s, template: o, args: d} = e;
            if ("number" == typeof o)
                throw new Error("Error: expected template as string. Got number?! [" + s.id1 + ":" + s.id2 + "]");
            const h = Object(n.a)(s.tick)
              , u = [s.module, s.features.join("/")].filter((e=>e)).join("|")
              , g = function(e, t) {
                let s = []
                  , i = -1;
                if (t.forEach(((e,t)=>{
                    (Object(r.b)(e) || Object(r.c)(e)) && (i = t),
                    s.push(c(e))
                }
                )),
                1 === s.length && 1 === t.length && "function" == typeof t[0] && Array.isArray(s[0]) && (s = [...s[0]]),
                !e)
                    return s.join(" ");
                const n = "{}";
                let a = e;
                const o = [];
                for (s.forEach((e=>{
                    -1 !== a.search(n) ? a = a.replace(n, e) : o.push(e)
                }
                )); -1 !== a.search(n); )
                    a = a.replace(n, "");
                return a.concat(" ").concat(o.join(" "))
            }(o, d)
              , p = "[" + [s.id1, s.id2].join(":") + "]"
              , m = i.a[s.level].toUpperCase()
              , f = [`${h}__${t ? `${t.ss}.${t.ss_ln}` : "?.?"}`, m, u, g, p].join("\t")
              , v = l.encode(f.concat("\n"));
            return v.byteLength > a.k.file_lim ? v.slice(0, a.k.file_lim) : v
        }
        function h(e) {
            const t = new ArrayBuffer(8)
              , s = new DataView(t)
              , i = 4294967295
              , n = ~~(e / i)
              , r = e % i - n;
            return s.setUint32(0, n),
            s.setUint32(4, r),
            t
        }
    },
    ez9R: function(e, t, s) {
        "use strict";
        s.d(t, "a", (function() {
            return n
        }
        ));
        var i = s("jDHv");
        const n = Object(i.define)("zlog-bin-encoder")
    },
    ezdo: function(e, t, s) {
        "use strict";
        var i, n = s("jDHv"), r = s("HPcM"), a = s("Y58e"), o = s("AH6j"), l = s("fsQs"), c = s("Y41u"), d = s("UJDs"), h = s("PLj1"), u = s("jGDt"), g = s("KRcn"), p = s("7FSS");
        const m = null === globalThis || void 0 === globalThis ? void 0 : globalThis.performance;
        let f = Object(n.injectable)()(i = function(e, t) {
            return Object(n.inject)(u.a)(e, void 0, 0)
        }(i = Reflect.metadata("design:type", Function)(i = Reflect.metadata("design:paramtypes", [void 0 === u.a ? Object : u.a])(i = class extends o.b {
            constructor(e) {
                super(),
                this._session = e,
                this._data = [],
                this._lastPing = 0,
                this._isSessionLineReady = !1,
                this.add = e=>{
                    this._data.push(e),
                    m.now() - this._lastPing >= l.l && (this._lastPing = m.now(),
                    this._broadcastEvent(c.c.LogBucketRequestFlush)),
                    this._data.length > 5e4 && p.a.error(`[ZLL]: bucket size high: ${this._data.length}`)
                }
                ,
                this._broadcastEvent = (e,t)=>{
                    switch (e) {
                    case c.c.LogBucketRequestFlush:
                    case c.c.RegLogBucketStatus:
                        this.dispatchEvent(new c.b(e,t))
                    }
                }
                ,
                this.recordSession()
            }
            get(e) {
                return void 0 === e && (e = l.i),
                this._isSessionLineReady || p.a.error("[ZLL]: session line not ready. get() returns 0 untils it is ready"),
                this._isSessionLineReady ? this._data.slice(0, e) : []
            }
            removeFirst(e) {
                void 0 === e && (e = 1),
                this._data.splice(0, e)
            }
            getAll() {
                return this._isSessionLineReady ? this._data : []
            }
            size() {
                return this._data.length
            }
            recordSession() {
                const e = this._session.getSession();
                const t = `zlgvers:${e.zlgv} ps:${e.process} build:${e.env}-${e.buildType} pversion:${e.pversion} avers:undefined bhash:${e.build}`
                  , s = {
                    lineMeta: {
                        type: "info",
                        module: "Session".toUpperCase(),
                        features: [""],
                        level: d.b.info,
                        id1: 0,
                        id2: 0,
                        tick: this._session.getProcessStartTime()
                    },
                    template: "",
                    args: [t]
                };
                this._data.unshift(s),
                this._isSessionLineReady = !0
            }
        }
        ) || i) || i) || i) || i;
        var v;
        n.ModuleContainer.registerSingleton(r.a, f);
        let b = Object(n.injectable)()(v = class extends o.b {
            constructor() {
                super(...arguments),
                this._data = []
            }
            removeFirst(e) {
                void 0 === e && (e = 1),
                this._data.splice(0, e)
            }
            add(e) {
                this._data.push(e),
                this._broadcastEvent(c.c.LogBucketRequestFlush)
            }
            get(e) {
                const t = this._data.slice(0, e);
                return this._data = this._data.slice(e),
                t
            }
            getAll() {
                return this._data
            }
            size() {
                return this._data.length
            }
            _broadcastEvent(e, t) {
                switch (e) {
                case c.c.LogBucketRequestFlush:
                case c.c.SentryLogBucketStatus:
                    this.dispatchEvent(new c.b(e,t))
                }
            }
        }
        ) || v;
        n.ModuleContainer.registerSingleton(r.b, b);
        const I = Object(n.define)("zlogger-validator");
        var y;
        let C = Object(n.injectable)()(y = function(e, t) {
            return Object(n.inject)(a.a)(e, void 0, 0)
        }(y = Reflect.metadata("design:type", Function)(y = Reflect.metadata("design:paramtypes", [void 0 === a.a ? Object : a.a])(y = class {
            constructor(e) {
                this.config = e,
                this.DevOrStagingLevelConfig = {
                    [d.b.info]: !0,
                    [d.b.error]: !0,
                    [d.b.warn]: !0,
                    [d.b.debug]: !0,
                    [d.b.critical]: !0
                },
                this.ProdLevelConfig = {
                    [d.b.info]: !0,
                    [d.b.error]: !0,
                    [d.b.warn]: !0,
                    [d.b.debug]: !1,
                    [d.b.critical]: !0
                },
                this.DevOrStagingTransConfig = {
                    [d.b.info]: {
                        toFile: !0,
                        toConsole: !0
                    },
                    [d.b.error]: {
                        toFile: !0,
                        toConsole: !0
                    },
                    [d.b.warn]: {
                        toFile: !0,
                        toConsole: !0
                    },
                    [d.b.debug]: {
                        toFile: !0,
                        toConsole: !0
                    },
                    [d.b.critical]: {
                        toFile: !0,
                        toConsole: !0
                    }
                },
                this.ProdTransConfig = {
                    [d.b.info]: {
                        toFile: !0,
                        toConsole: !0
                    },
                    [d.b.error]: {
                        toFile: !0,
                        toConsole: !0
                    },
                    [d.b.warn]: {
                        toFile: !1,
                        toConsole: !1
                    },
                    [d.b.debug]: {
                        toFile: !1,
                        toConsole: !1
                    },
                    [d.b.critical]: {
                        toFile: !0,
                        toConsole: !0
                    }
                },
                this._ProcessBlacklist = [],
                l.n && p.a.log("zlogger validator init")
            }
            validateLog(e, t, s, i) {
                if (this._isBlackedlisted(e))
                    return !1;
                switch (e) {
                case h.b.Main:
                    return this._validateNoConfig(t, s, i);
                case h.b.Web:
                case h.b.Login:
                case h.b.Photo:
                case h.b.SharedWorker:
                case h.b.Render:
                    return this._validateUsingConfig(t, s, i);
                default:
                    return this._validateNoConfig(t, s, i)
                }
            }
            _validateUsingConfig(e, t, s) {
                const i = !!this.config && this.config.get("stagingAccount")
                  , n = !!this.config && this.config.get("adminMode");
                return (!0 !== (null == s ? void 0 : s.stagingOnly) || !1 !== i || !1 != !n) && (n || i ? this.DevOrStagingLevelConfig[e] && this.DevOrStagingTransConfig[e][t] : this.ProdLevelConfig[e] && this.ProdTransConfig[e][t])
            }
            _validateNoConfig(e, t, s) {
                return this.ProdLevelConfig[e] && this.ProdTransConfig[e][t]
            }
            _isBlackedlisted(e) {
                var t;
                return !!(e === h.b.Embed || this.config && !0 === (null === (t = this.config) || void 0 === t ? void 0 : t.get("adminConfig.offLog")) || this._ProcessBlacklist.includes(e))
            }
        }
        ) || y) || y) || y) || y;
        n.ModuleContainer.register(I, C);
        const S = Object(n.define)("zsentry-log-trans")
          , E = Object(n.define)("zfile-log-trans")
          , _ = Object(n.define)("zconsole-log-trans");
        var T, L, O, F = s("W8fB");
        let R = Object(n.injectable)()(T = function(e, t) {
            return Object(n.inject)(r.b)(e, void 0, 0)
        }(T = Reflect.metadata("design:type", Function)(T = Reflect.metadata("design:paramtypes", [void 0 === r.b ? Object : r.b])(T = class {
            constructor(e) {
                this.sentryBucket = e
            }
            transport(e) {
                throw new Error("Method not implemented.")
            }
        }
        ) || T) || T) || T) || T
          , w = Object(n.injectable)()(L = function(e, t) {
            return Object(n.inject)(r.a)(e, void 0, 0)
        }(L = function(e, t) {
            return Object(n.inject)(I)(e, void 0, 1)
        }(L = Reflect.metadata("design:type", Function)(L = Reflect.metadata("design:paramtypes", [void 0 === r.a ? Object : r.a, void 0 === I ? Object : I])(L = class {
            constructor(e, t) {
                this.regularBucket = e,
                this.validator = t,
                this._currentProcess = void 0,
                this._currentProcess = Object(g.a)()
            }
            transport(e) {
                this.validator.validateLog(this._currentProcess, e.lineMeta.level, "toFile", e.extras) && this.regularBucket.add(e)
            }
        }
        ) || L) || L) || L) || L) || L
          , M = Object(n.injectable)()(O = function(e, t) {
            return Object(n.inject)(I)(e, void 0, 0)
        }(O = function(e, t) {
            return Object(n.inject)(F.a)(e, void 0, 1)
        }(O = Reflect.metadata("design:type", Function)(O = Reflect.metadata("design:paramtypes", [void 0 === I ? Object : I, void 0 === F.a ? Object : F.a])(O = class {
            constructor(e, t) {
                this.validator = e,
                this.consoleWriter = t,
                this._currentProcess = void 0,
                this._currentProcess = Object(g.a)()
            }
            transport(e) {
                this.validator.validateLog(this._currentProcess, e.lineMeta.level, "toConsole", e.extras) && this.consoleWriter.write(e)
            }
        }
        ) || O) || O) || O) || O) || O;
        n.ModuleContainer.registerSingleton(E, w),
        n.ModuleContainer.registerSingleton(S, R),
        n.ModuleContainer.registerSingleton(_, M);
        var D = s("XB6V");
        const A = ["info", "warn", "debug", "error", "critical"]
          , P = ["", "F", "C", "T", "FT", "CT"];
        function j() {
            let e = 0;
            const t = {}
              , s = {};
            return A.forEach((i=>{
                P.forEach((n=>{
                    "" === n ? (t[e] = `z${i}A`,
                    s[`z${i}A`] = e,
                    e += 1) : "T" === n ? (t[e] = `z${i}AT`,
                    s[`z${i}AT`] = e,
                    e += 1) : (t[e] = `z${i}${n}`,
                    s[`z${i}${n}`] = e,
                    e += 1)
                }
                ))
            }
            )),
            {
                EnumeratedLevels: t,
                ReversedEnumeratedLevels: s
            }
        }
        Object.freeze(P),
        Object.freeze(A);
        const N = j().EnumeratedLevels
          , B = j().ReversedEnumeratedLevels;
        Object.freeze(N),
        Object.freeze(B);
        var U, k = s("h0S/");
        let G = Object(n.injectable)()(U = function(e, t) {
            return Object(n.inject)(E)(e, void 0, 0)
        }(U = function(e, t) {
            return Object(n.inject)(S)(e, void 0, 1)
        }(U = function(e, t) {
            return Object(n.inject)(_)(e, void 0, 2)
        }(U = Reflect.metadata("design:type", Function)(U = Reflect.metadata("design:paramtypes", [void 0 === E ? Object : E, void 0 === S ? Object : S, void 0 === _ ? Object : _])(U = class extends class {
        }
        {
            constructor(e, t, s) {
                super(),
                this.fileTransporter = e,
                this.sentryTransporter = t,
                this.consoleTransporter = s,
                this._instanceMap = new Map
            }
            createZLogger(e, t, s) {
                void 0 === t && (t = []);
                const i = `${e}:${t.join(":")}`
                  , r = this._instanceMap.get(i);
                var a, o, l, c, h, g, m, f, v, b, I;
                if (r && ((null == s ? void 0 : s.trans) === (null === (a = r.config) || void 0 === a ? void 0 : a.trans) && (null == s || null === (o = s.trans) || void 0 === o ? void 0 : o.file) === (null === (l = r.config) || void 0 === l || null === (c = l.trans) || void 0 === c ? void 0 : c.file) && (null == s || null === (h = s.trans) || void 0 === h ? void 0 : h.console) === (null === (g = r.config) || void 0 === g || null === (m = g.trans) || void 0 === m ? void 0 : m.console) && (null == s || null === (f = s.trans) || void 0 === f ? void 0 : f.sentry) === (null === (v = r.config) || void 0 === v || null === (b = v.trans) || void 0 === b ? void 0 : b.sentry) && (null == s ? void 0 : s.stagingOnly) === (null === (I = r.config) || void 0 === I ? void 0 : I.stagingOnly)))
                    return r.logger;
                let y, C, S;
                (void 0 === (null == s ? void 0 : s.trans) || null != s && s.trans.file) && (y = this.fileTransporter),
                (void 0 === (null == s ? void 0 : s.trans) || null != s && s.trans.console) && (C = this.consoleTransporter),
                (void 0 === (null == s ? void 0 : s.trans) || null != s && s.trans.sentry) && (S = this.sentryTransporter);
                const E = class {
                    constructor(e, t, s) {
                        var i = this;
                        this.module = e,
                        this.features = t,
                        this.config = s,
                        this.enabled = !0,
                        this.Sentry = null,
                        this.tempOffConfig = {
                            toConsole: !1,
                            toFile: !1,
                            toSentry: !1
                        },
                        this.zsentry = function() {
                            if (i.Sentry) {
                                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                                    t[s] = arguments[s];
                                i.Sentry.captureException(new Error(t.join(" ")))
                            }
                        }
                        ,
                        this.zfatal = function() {}
                        ,
                        this.zsymb = function(e, t, s) {
                            if (!1 === i.enabled)
                                return;
                            const n = N[e];
                            for (var r = arguments.length, a = new Array(r > 3 ? r - 3 : 0), o = 3; o < r; o++)
                                a[o - 3] = arguments[o];
                            if (n.includes("zcritical"))
                                return void (i.Sentry && i.Sentry.captureException(new Error(a.join(" "))));
                            const l = i._getLevel(n);
                            if (n.endsWith("A"))
                                i._transport({
                                    tick: Date.now(),
                                    level: l,
                                    id1: t,
                                    id2: s,
                                    templ: null,
                                    args: a,
                                    target: "ConsoleFile"
                                });
                            else if (n.endsWith("AT")) {
                                const [e,...n] = a;
                                i._transport({
                                    tick: Date.now(),
                                    level: l,
                                    id1: t,
                                    id2: s,
                                    templ: e,
                                    args: n,
                                    target: "ConsoleFile"
                                })
                            } else if (n.endsWith("C") || n.endsWith("F"))
                                i._transport({
                                    tick: Date.now(),
                                    level: l,
                                    id1: t,
                                    id2: s,
                                    templ: null,
                                    args: a,
                                    target: n.endsWith("C") ? "toConsole" : "toFile"
                                });
                            else if (n.endsWith("CT") || n.endsWith("FT")) {
                                const [e,...r] = a;
                                i._transport({
                                    tick: Date.now(),
                                    level: l,
                                    id1: t,
                                    id2: s,
                                    templ: e,
                                    args: r,
                                    target: n.endsWith("CT") ? "toConsole" : "toFile"
                                })
                            }
                        }
                        ,
                        this._transport = e=>{
                            let {tick: t, level: s, id1: i, id2: r, templ: a, args: o, target: l} = e;
                            const c = ()=>({
                                lineMeta: {
                                    type: "normal",
                                    module: this.module,
                                    features: this.features,
                                    id1: i,
                                    id2: r,
                                    level: s,
                                    tick: t
                                },
                                template: a,
                                args: o,
                                extras: {
                                    stagingOnly: this.config.stagingOnly
                                }
                            })
                              , d = n.ModuleContainer.resolve(u.a);
                            var h, g;
                            if ("ConsoleFile" === l)
                                !1 === this.tempOffConfig.toConsole && d.isEnabledConsole() && (null === (h = this.config.toConsole) || void 0 === h || h.transport(c())),
                                !1 === this.tempOffConfig.toFile && (null === (g = this.config.toFile) || void 0 === g || g.transport(c()));
                            else if (!1 === this.tempOffConfig[l]) {
                                var p;
                                if ("toConsole" === l && !d.isEnabledConsole())
                                    return;
                                null === (p = this.config[l]) || void 0 === p || p.transport(c())
                            }
                        }
                        ,
                        this._getLevel = e=>{
                            let t = e;
                            e.endsWith("A") ? t = e.replace("A", "") : e.endsWith("AT") ? t = e.replace("AT", "") : e.endsWith("C") ? t = e.replace("C", "") : e.endsWith("CT") ? t = e.replace("CT", "") : e.endsWith("F") ? t = e.replace("F", "") : e.endsWith("FT") && (t = e.replace("FT", ""));
                            let s = d.b.info;
                            switch (t) {
                            case "zinfo":
                                s = d.b.info;
                                break;
                            case "zwarn":
                                s = d.b.warn;
                                break;
                            case "zerror":
                                s = d.b.error;
                                break;
                            case "zdebug":
                                s = d.b.debug
                            }
                            return s
                        }
                        ,
                        this.zinfo = function() {
                            throw new Error("babel-plugin-transform-zlog failed: zlog malfunction")
                        }
                        ,
                        this.zinfoC = function() {
                            throw new Error("babel-plugin-transform-zlog failed: zlog malfunction")
                        }
                        ,
                        this.zinfoF = function() {
                            throw new Error("babel-plugin-transform-zlog failed: zlog malfunction")
                        }
                        ,
                        this.zwarn = function() {
                            throw new Error("babel-plugin-transform-zlog failed: zlog malfunction")
                        }
                        ,
                        this.zwarnC = function() {
                            throw new Error("babel-plugin-transform-zlog failed: zlog malfunction")
                        }
                        ,
                        this.zwarnF = function() {
                            throw new Error("babel-plugin-transform-zlog failed: zlog malfunction")
                        }
                        ,
                        this.zerror = function() {
                            throw new Error("babel-plugin-transform-zlog failed: zlog malfunction")
                        }
                        ,
                        this.zerrorC = function() {
                            throw new Error("babel-plugin-transform-zlog failed: zlog malfunction")
                        }
                        ,
                        this.zerrorF = function() {
                            throw new Error("babel-plugin-transform-zlog failed: zlog malfunction")
                        }
                        ,
                        this.zdebug = function() {
                            throw new Error("babel-plugin-transform-zlog failed: zlog malfunction")
                        }
                        ,
                        this.zdebugC = function() {
                            throw new Error("babel-plugin-transform-zlog failed: zlog malfunction")
                        }
                        ,
                        this.zdebugF = function() {
                            throw new Error("babel-plugin-transform-zlog failed: zlog malfunction")
                        }
                        ,
                        this.enabled = !0 === function(e, t, s) {
                            if (void 0 === s && (s = !1),
                            !k.a.includes(e) && !1 === k.c[e])
                                return p.a.error("LogModeController:", [e, t], `module ${e} is not whitelisted`),
                                !1;
                            let i = !1;
                            for (const n of t) {
                                const r = k.a.includes(n) || !(!1 === k.c[e]);
                                if (s && !r || !r && !i)
                                    return !1;
                                if (r) {
                                    if (i = !0,
                                    !s)
                                        return !0
                                } else if (!i)
                                    return p.a.error("LogModeController:", [e, t], `feat ${n} is not whitelisted and requireAllFeatOn:${s}`),
                                    !1
                            }
                            return !0
                        }(this.module, this.features)
                    }
                    disableFile() {
                        this.tempOffConfig.toFile = !0
                    }
                    enableFile() {
                        this.tempOffConfig.toFile = !1
                    }
                    disableConsole() {
                        this.tempOffConfig.toConsole = !0
                    }
                    enableConsole() {
                        this.tempOffConfig.toConsole = !1
                    }
                    static create(e, t, s) {
                        return new this(e,t,s)
                    }
                    pause() {
                        this.enabled = !0
                    }
                    resume() {
                        this.enabled = !1
                    }
                    specialTransport(e) {
                        this._transport(e)
                    }
                }
                .create(e, t, {
                    toFile: y,
                    toConsole: C,
                    toSentry: S,
                    stagingOnly: null == s ? void 0 : s.stagingOnly
                });
                return this._instanceMap.set(i, {
                    logger: E,
                    config: s
                }),
                E
            }
            createZLoggerStaging(e, t, s) {
                return t.push(k.b.staging),
                this.createZLogger(e, t, {
                    trans: s,
                    stagingOnly: !0
                })
            }
        }
        ) || U) || U) || U) || U) || U) || U;
        n.ModuleContainer.register(D.a, G);
        var x = s("yBqK")
          , z = s("ebA4");
        var V, $ = s("CDcE");
        let q = Object(n.injectable)()(V = Reflect.metadata("design:type", Function)(V = Reflect.metadata("design:paramtypes", [])(V = class extends class {
            constructor() {
                this._TextEncoder = new TextEncoder
            }
            encodeUi8(e, t, s) {
                return e.setUint8(t, s),
                t + l.b.ui8
            }
            encodeUi16(e, t, s) {
                return e.setUint16(t, s),
                t + l.b.ui16
            }
            encodeUi32(e, t, s) {
                return e.setUint32(t, s),
                t + l.b.ui32
            }
            encodeFloat32(e, t, s) {
                return e.setFloat32(t, s),
                t + l.b.float32
            }
            encodeFloat64(e, t, s) {
                return e.setFloat64(t, s),
                t + l.b.float64
            }
            encodeBigInt64(e, t, s) {
                const i = Object(z.a)(s)
                  , n = new Uint8Array(i);
                for (let r = 0; r < n.byteLength; r++)
                    t = this.encodeUi8(e, t, n[r]);
                return t
            }
            encodeTotalSize(e, t, s) {
                return this.encodeUi16(e, t, s)
            }
            encodeTotalSizeEnd(e, t) {
                return this.encodeUi16(e, t, t + l.b.ui16)
            }
            encodeTick(e, t, s) {
                const i = Object(z.a)(s)
                  , n = new Uint8Array(i);
                return this.copyCache(e, t, n)
            }
            encodeVers(e, t, s) {
                if (s > 32767)
                    throw new Error("[BinEncoder] error: encoding verion is TOO BIG!");
                return this.encodeUi16(e, t, s)
            }
            encodeEncoderVers(e, t, s) {
                if (s > 255)
                    throw new Error("[BinEncoder] error: encoding level is TOO BIG!");
                return this.encodeUi8(e, t, s)
            }
            encodeLevel(e, t, s) {
                if (s > 255)
                    throw new Error("[BinEncoder] error: encoding level is TOO BIG!");
                return this.encodeUi8(e, t, s)
            }
            encodeHeaderNum(e, t, s) {
                if (s > 255)
                    throw new Error("[BinEncoder] error: encoding numOfHeader is TOO BIG!");
                return this.encodeUi8(e, t, s)
            }
            encodeStringOnly(e, t, s) {
                const i = this._TextEncoder.encode(s)
                  , n = i.byteLength;
                return t = this.encodeUi8(e, t, n),
                this.copyCache(e, t, i)
            }
            copyCache(e, t, s) {
                for (let i = 0; i < s.byteLength; i++)
                    t = this.encodeUi8(e, t, s[i]);
                return t
            }
        }
        {
            constructor() {
                super(),
                this.MemoryLogBatch = void 0,
                this.dv = void 0,
                this._lastOffset = 0,
                this._lastTs = 0,
                this.MemoryLogBatch = new ArrayBuffer(l.d.mem_batch_lim),
                this.dv = new DataView(this.MemoryLogBatch)
            }
            getLastBuffer() {
                return this.MemoryLogBatch.slice(0, this._lastOffset)
            }
            encode(e, t, s) {
                try {
                    const {lineMeta: i, args: n} = e;
                    let r = 0;
                    r += l.b.ui16;
                    let a = i.tick;
                    a <= this._lastTs && (a = this._lastTs + 1),
                    this._lastTs = a,
                    r = this.encodeTick(this.dv, r, a),
                    r = this.encodeEncoderVers(this.dv, r, l.o),
                    r = this.encodeLevel(this.dv, r, i.level),
                    r = this.encodeUi16(this.dv, r, s.ss),
                    r = this.encodeUi32(this.dv, r, s.ss_ln),
                    r = this.encodeStringOnly(this.dv, r, "L98HQdtV"),
                    r = this.encodeUi32(this.dv, r, t),
                    r = this.encodeUi16(this.dv, r, i.id1),
                    r = this.encodeUi16(this.dv, r, i.id2),
                    r = this._encodeArgs(r, this.dv, n);
                    const o = r + l.b.ui16;
                    return this.encodeTotalSize(this.dv, 0, o),
                    r = this.encodeTotalSize(this.dv, r, o),
                    this._lastOffset = r,
                    this.MemoryLogBatch.slice(0, o)
                } catch (i) {
                    throw p.a.error("BinEncoderImpl.encode error:", i),
                    new Error("BinEncoderImpl.encode error")
                }
            }
            _allowTruncate() {
                const e = n.ModuleContainer.resolve(a.a)
                  , t = (null == e ? void 0 : e.get("adminMode")) || !1
                  , s = e.get("stagingAccount") || !1;
                return !(t || s)
            }
            _encodeArgs(e, t, s) {
                let i = !1;
                const n = [];
                if (s.length)
                    for (let a of s)
                        "object" == typeof a && (i = Object($.b)(a) || Object($.c)(a)),
                        n.push(Object(z.c)(a));
                let r;
                if (r = 1 === n.length && 1 === s.length && Array.isArray(n[0]) && "function" == typeof s[0] ? x.encode([...n[0]]) : x.encode(n),
                r.byteLength > l.d.line_hard_lim) {
                    const e = JSON.stringify(n, Object($.a)()).slice(0, l.d.line_hard_lim);
                    r = x.encode(e)
                } else if (!i && r.byteLength > l.d.line_soft_lim && this._allowTruncate()) {
                    const e = JSON.stringify(n, Object($.a)()).slice(0, l.d.line_soft_lim);
                    r = x.encode(e)
                }
                for (let a = 0; a < r.byteLength; a++)
                    e = this.encodeUi8(t, e, r[a]);
                return e
            }
        }
        ) || V) || V) || V;
        var W = s("ez9R");
        n.ModuleContainer.registerSingleton(W.a, q);
        var H = s("K8kB");
        var K, Q = class {
            constructor(e, t) {
                void 0 === e && (e = []),
                void 0 === t && (t = !0),
                this.tasks = e,
                this.alive = t
            }
            do() {
                return this.add(...arguments)
            }
            add() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                    t[s] = arguments[s];
                return this.tasks = this.tasks.concat(t),
                this
            }
            once(e) {
                return void 0 === e && (e = !1),
                this.alive = !1,
                e && (async e=>this.async())() || this.sync(),
                this
            }
            every(e) {
                return this.add((()=>new Promise((t=>setTimeout(t, e))))),
                this.forever(!0)
            }
            forever(e) {
                return void 0 === e && (e = !1),
                this.alive = !0,
                e && (async e=>this.async())() || this.sync(),
                this
            }
            cancel() {
                return this.alive = !1,
                this
            }
            async async() {
                for (let e of this.tasks)
                    await e();
                this.alive && this.async()
            }
            sync() {
                for (let e of this.tasks)
                    e();
                this.alive && this.sync()
            }
        }
        ;
        let Z = Object(n.injectable)()(K = function(e, t) {
            return Object(n.inject)(r.a)(e, void 0, 0)
        }(K = Reflect.metadata("design:type", Function)(K = Reflect.metadata("design:paramtypes", [void 0 === r.a ? Object : r.a])(K = class extends o.b {
            constructor(e) {
                super(),
                this.bucket = e,
                this.task = void 0,
                this.start = ()=>{
                    var e;
                    if (null !== (e = this.task) && void 0 !== e && e.alive)
                        return;
                    this.task || (this.task = new Q);
                    const t = h.c[Object(g.a)()] || l.e;
                    this.task.add((()=>this._broadcastEvent(c.c.WriteSchedulerRequestFlush))).every(t),
                    this._listenEvents()
                }
                ,
                this.stop = ()=>{
                    this.task && this.task.cancel(),
                    this.task = void 0
                }
                ,
                this._listenEvents = ()=>{
                    this.bucket.addEventListener(c.c.LogBucketRequestFlush, this._handleFlushRequestFromBucket)
                }
                ,
                this._handleFlushRequestFromBucket = ()=>{
                    var e;
                    this.task && this.task.alive || (l.n && p.a.log("Oopsie! Scheduler is somehow not running. Restarting..."),
                    null === (e = this.task) || void 0 === e || e.cancel(),
                    this.task = void 0,
                    this.start())
                }
            }
            _broadcastEvent(e) {
                if (e === c.c.WriteSchedulerRequestFlush)
                    this.dispatchEvent(new c.a(e))
            }
        }
        ) || K) || K) || K) || K;
        n.ModuleContainer.registerSingleton(H.a, Z)
    },
    gpNb: function(e, t, s) {
        "use strict";
        var i, n = s("jDHv"), r = s("PmZf"), a = s("rvru"), o = s("UJ0r"), l = s("PhBv"), c = s("tHMN");
        let d = n.ModuleContainer.injectable()(i = function(e, t) {
            return n.ModuleContainer.inject(l.b)(e, void 0, 0)
        }(i = function(e, t) {
            return n.ModuleContainer.inject(o.b)(e, void 0, 1)
        }(i = function(e, t) {
            return n.ModuleContainer.inject(a.a)(e, void 0, 2)
        }(i = Reflect.metadata("design:type", Function)(i = Reflect.metadata("design:paramtypes", [void 0 === l.a ? Object : l.a, void 0 === o.a ? Object : o.a, void 0 === a.a ? Object : a.a])(i = class extends c.a {
            constructor(e, t, s) {
                super(),
                this.queryPlanner = e,
                this.adapterManager = t,
                this.dbQos = s,
                this.queryPlanner.addEventListener(r.a.QueryError, (e=>{
                    this.dispatchEvent(new r.b(e.error)),
                    this.dbQos.sendDBErrorQos(e.error)
                }
                )),
                this.queryPlanner.addEventListener(r.a.UnexpectedError, (e=>{
                    this.dispatchEvent(new r.d(e.error)),
                    this.dbQos.sendDBErrorQos(e.error)
                }
                ))
            }
            async closeDatabase(e) {
                await this.adapterManager.closeDatabase(e)
            }
            async closeAllDatabases() {
                this.queryPlanner.stop(),
                await this.adapterManager.closeAllDatabases()
            }
            async deleteDatabase(e) {
                await this.adapterManager.deleteDatabase(e)
            }
            async deleteAllDatabases() {
                this.queryPlanner.stop(),
                await this.adapterManager.deleteAllDatabases()
            }
            doesDatabaseExists(e) {
                return this.adapterManager.doesDatabaseExists(e)
            }
            do(e) {
                return this.queryPlanner.do(e)
            }
            doImmediately(e) {
                return "Qos" === e.database && e.trace(),
                this.queryPlanner.doImmediately(e)
            }
        }
        ) || i) || i) || i) || i) || i) || i;
        n.ModuleContainer.registerSingleton(c.b, d)
    },
    hRcX: function(e, t, s) {
        "use strict";
        var i = s("VTBJ")
          , n = s("jDHv");
        const r = ()=>{}
          , a = (()=>{
            let e = 0;
            return ()=>++e
        }
        )()
          , o = {
            id: 0,
            retry: 0,
            success: r,
            error: r,
            execute: r
        };
        function l(e, t) {
            const s = e.length;
            e.push(t),
            function(e, t, s) {
                let i = s;
                for (; ; ) {
                    const s = i - 1 >>> 1
                      , n = e[s];
                    if (!(void 0 !== n && d(n, t) > 0))
                        return;
                    e[s] = t,
                    e[i] = n,
                    i = s
                }
            }(e, t, s)
        }
        function c(e) {
            const t = e[0];
            if (void 0 !== t) {
                const s = e.pop();
                return s !== t && (e[0] = s,
                function(e, t, s) {
                    let i = s;
                    const n = e.length;
                    for (; i < n; ) {
                        const s = 2 * (i + 1) - 1
                          , n = e[s]
                          , r = s + 1
                          , a = e[r];
                        if (void 0 !== n && d(n, t) < 0)
                            void 0 !== a && d(a, n) < 0 ? (e[i] = a,
                            e[r] = t,
                            i = r) : (e[i] = n,
                            e[s] = t,
                            i = s);
                        else {
                            if (!(void 0 !== a && d(a, t) < 0))
                                return;
                            e[i] = a,
                            e[r] = t,
                            i = r
                        }
                    }
                }(e, s, 0)),
                t
            }
            return null
        }
        function d(e, t) {
            const s = e.sortIndex - t.sortIndex;
            return 0 !== s ? s : e.id - t.id
        }
        let h;
        !function(e) {
            e[e.BLOCKING = 50] = "BLOCKING",
            e[e.NON_BLOCKING = 250] = "NON_BLOCKING",
            e[e.IDLE = 500] = "IDLE",
            e[e.NEVER_TIMEOUT = 1e3] = "NEVER_TIMEOUT"
        }(h || (h = {}));
        const u = new class {
            push(e, t) {
                const s = Object(i.a)(Object(i.a)(Object(i.a)({}, o), t), {}, {
                    id: a()
                });
                e.push(s)
            }
            getCandidate(e) {
                return e.shift()
            }
        }
          , g = new class {
            push(e, t) {
                l(e, Object(i.a)(Object(i.a)(Object(i.a)({}, o), t), {}, {
                    sortIndex: Date.now() + (t.deadline || h.NON_BLOCKING),
                    id: a()
                }))
            }
            getCandidate(e) {
                return c(e)
            }
        }
        ;
        class p {
            constructor(e, t) {
                void 0 === e && (e = u),
                void 0 === t && (t = !0),
                this._queue = void 0,
                this._strategy = void 0,
                this._stopped = void 0,
                this._inactive = void 0,
                this._queue = [],
                this._strategy = e,
                this._stopped = !t,
                this._inactive = !0
            }
            run(e) {
                this._strategy.push(this._queue, e),
                this._inactive && this._run()
            }
            start() {
                this._stopped = !1,
                setTimeout((()=>{
                    this._run()
                }
                ))
            }
            stop() {
                this._stopped = !0,
                this._inactive = !0
            }
            async _run() {
                if (this._stopped)
                    return void (this._inactive = !0);
                const e = this._strategy.getCandidate(this._queue);
                if (e)
                    try {
                        const s = await e.execute();
                        try {
                            null == e || e.success(s)
                        } catch (t) {}
                        setTimeout((()=>{
                            this._run()
                        }
                        ))
                    } catch (t) {
                        e.retry > 0 ? (e.retry--,
                        this.run(e)) : null == e || e.error(t),
                        setTimeout((()=>{
                            this._run()
                        }
                        ))
                    }
                else
                    this._inactive = !0
            }
        }
        new p(g);
        var m = s("Mgpg")
          , f = s("YEoC")
          , v = s("DI/x")
          , b = s("PmZf")
          , I = s("YZti")
          , y = s("1UUk")
          , C = s("MRjZ")
          , S = s("0slR")
          , E = s("UJ0r")
          , _ = s("teaq")
          , T = s("Abbu")
          , L = s("PhBv")
          , O = s("rkiK")
          , F = s("wH4e");
        const R = new Set(["Qos"]);
        var w;
        let M = n.ModuleContainer.injectable()(w = function(e, t) {
            return n.ModuleContainer.inject(E.b)(e, void 0, 0)
        }(w = function(e, t) {
            return n.ModuleContainer.inject(_.b)(e, void 0, 1)
        }(w = function(e, t) {
            return n.ModuleContainer.inject(S.a)(e, void 0, 2)
        }(w = function(e, t) {
            return n.ModuleContainer.inject(m.ZLoggerFactory)(e, void 0, 3)
        }(w = Reflect.metadata("design:type", Function)(w = Reflect.metadata("design:paramtypes", [void 0 === E.a ? Object : E.a, void 0 === _.b ? Object : _.b, void 0 === S.a ? Object : S.a, void 0 === m.ZLoggerFactory ? Object : m.ZLoggerFactory])(w = class extends L.a {
            constructor(e, t, s, i) {
                super(),
                this.adapterManager = e,
                this.configManager = t,
                this.adapterBuilder = s,
                this.scheduler = void 0,
                this.pendingQueries = [],
                this.session = void 0,
                this.logger = void 0,
                this.idCounter = 0,
                this.scheduler = new p(u,!1),
                this.logger = i.createZLogger("db", ["host", "planner"]),
                this.adapterManager.addEventListener(b.a.UnexpectedError, (e=>{
                    this.dispatchEvent(new b.d(e.error))
                }
                ))
            }
            start() {
                this.scheduler.start();
                const e = n.ModuleContainer.resolve(y.b)
                  , t = e=>{
                    this.session = e;
                    const t = this.pendingQueries;
                    this.pendingQueries = [],
                    t.forEach((e=>{
                        this.enqueue(e, {
                            immediately: !1
                        })
                    }
                    ))
                }
                ;
                e.session && t(e.session),
                e.addEventListener(b.a.SessionChange, (e=>{
                    t(e.session)
                }
                ))
            }
            stop() {
                this.scheduler.stop(),
                this.logger.zsymb(6, 9601, 3e4, "Stop!")
            }
            do(e) {
                const t = function(e) {
                    if (R.has(e.database))
                        return;
                    const t = O.e.start(O.b.query_resolution_time)
                      , s = {
                        method: F.QueryUtils.getTypeName(e.type),
                        database: e.database,
                        table: e.table,
                        transaction: e.transaction
                    };
                    return t.pushInfo(s),
                    t
                }(e);
                return new Promise(((t,s)=>{
                    this.enqueue(Object(i.a)(Object(i.a)({}, e), {}, {
                        deferrer: {
                            resolve: t,
                            reject: s
                        }
                    }), {
                        immediately: T.a.isInTransaction(e)
                    })
                }
                )).finally((()=>{
                    null == t || t.end()
                }
                ))
            }
            doImmediately(e) {
                return new Promise(((t,s)=>{
                    this.enqueue(Object(i.a)(Object(i.a)({}, e), {}, {
                        deferrer: {
                            resolve: t,
                            reject: s
                        }
                    }), {
                        immediately: !0
                    })
                }
                ))
            }
            enqueue(e, t) {
                e.meta.step = 0,
                e.meta.id = this.idCounter++,
                this.scheduler.run({
                    immediately: t.immediately,
                    execute: ()=>{
                        try {
                            return this.execute(e)
                        } catch (t) {
                            if (0 !== e.retry)
                                throw e.retry -= 1,
                                t;
                            {
                                const s = this.createErrorForQuery(e, t);
                                this.logger.zsymb(18, 9601, 30001, (()=>[s])),
                                this.dispatchEvent(new b.d(new v.i(s.message)))
                            }
                        }
                    }
                    ,
                    retry: e.retry
                })
            }
            trapQueryError(e) {
                let t = null
                  , s = ()=>{}
                ;
                this.shouldTrapTimeoutQuery(e) && (t = setTimeout((()=>{
                    var t, s;
                    const i = (null === (t = e.params) || void 0 === t || null === (s = t.values) || void 0 === s ? void 0 : s.length) || void 0
                      , n = void 0 !== i ? [i] : [];
                    e.deferrer.reject(new v.t(n))
                }
                ), e.meta.timeout),
                e.meta.timer = t,
                s = ()=>{
                    clearTimeout(t)
                }
                );
                const i = e.deferrer;
                e.deferrer = {
                    resolve: e=>{
                        s(),
                        i.resolve(e)
                    }
                    ,
                    reject: t=>{
                        s();
                        const n = this.createErrorForQuery(e, t);
                        this.dispatchEvent(new b.b(n)),
                        i.reject(n)
                    }
                }
            }
            createErrorForQuery(e, t) {
                const s = {
                    method: I.b.getTypeName(e.type),
                    database: e.database,
                    table: e.table,
                    step: e.meta.step,
                    partition: e.meta.partitionKey,
                    trans: e.transaction,
                    deadline: e.meta.timeout
                }
                  , i = Object(C.a)(s);
                let n = null;
                const r = e.meta.error.stack;
                if (t)
                    if (t instanceof Error) {
                        const s = t.message + ` (${i})`;
                        t instanceof DOMException ? (n = new v.c(s,t.name,t.code),
                        n.setStack(r)) : t instanceof v.e ? (n = t,
                        n.message = s,
                        n.setStack(r)) : (n = e.meta.error,
                        n.message = s,
                        n.name = t.name)
                    } else {
                        let e = t ? `${t}` : "Unknown reason";
                        e += ` (${i})`,
                        n = new v.i(e),
                        n.setStack(r)
                    }
                else {
                    let e = `Unknown reason (${i})`;
                    n = new v.i(e),
                    n.setStack(r)
                }
                return n
            }
            shouldTrapTimeoutQuery(e) {
                return !1
            }
            execute(e) {
                e.meta.step = 1,
                e.meta.dead = !1,
                e.meta.step = 2,
                !e.meta.databaseConfig && (this.computeDatabaseConfig(e),
                e.meta.dead) || (e.meta.step = 3,
                this.isReadyForExecute(e) && (e.meta.shouldNotTrapQuery || this.trapQueryError(e),
                e.meta.step = 4,
                !e.meta.databaseName && (this.computeDatabaseName(e),
                e.meta.dead) || (e.meta.step = 5,
                e.meta.step = 6,
                !e.meta.partitionConfig && (this.computePartitionConfig(e),
                e.meta.dead) || (e.meta.step = 7,
                !e.meta.tableConfig && (this.computeTableConfig(e),
                e.meta.dead) || (e.meta.step = 8,
                "string" != typeof e.meta.partitionKey && (this.computePartitionKey(e),
                e.meta.dead) || (e.meta.step = 9,
                !e.meta.executor && (this.computeDatabaseAdapter(e),
                e.meta.dead) || (e.meta.step = 10,
                e.meta.executor())))))))
            }
            computeDatabaseAdapter(e) {
                const {databaseName: t, partitionConfig: s, partitionKey: i, databaseConfig: n, tableConfig: r} = e.meta;
                let a = t;
                if (!T.a.isPartitionlessQuery(e) && n.supportPartitionByField && r.supportPartitionByField) {
                    if ("" === i)
                        return void this.rejectQuery(e, new v.q);
                    a = `${t}/${i}`
                }
                const o = this.adapterManager.getDatabaseAdapter(a, s, (()=>(e.meta.shouldNotTrapQuery = !0,
                this.execute(e))));
                o ? (e.meta.adapterName = o.type === f.a.IDB ? "idb" : "sqlite",
                e.meta.executor = ()=>{
                    e.meta.databaseName = a,
                    o.execute(e)
                }
                ) : e.meta.dead = !0
            }
            replicate(e, t) {
                this.do(Object(i.a)(Object(i.a)({}, e), {}, {
                    transaction: 0,
                    meta: Object(i.a)(Object(i.a)({}, e.meta), {}, {
                        databaseConfig: t,
                        error: new Error
                    }),
                    deferrer: void 0
                }))
            }
            isReadyForExecute(e) {
                return !(e.meta.databaseConfig.session && !this.session) || (this.pendingQueries.push(e),
                !1)
            }
            computeDatabaseConfig(e) {
                const t = this.configManager.getDatabaseConfigs(e.database);
                if (0 !== t.length) {
                    if (t.length > 1 && this.shouldReplicate(e))
                        for (let s = 1; s < t.length; s++)
                            this.replicate(e, t[s]);
                    e.meta.databaseConfig = t[0]
                } else
                    this.rejectQuery(e, new v.m(e.database))
            }
            computeDatabaseName(e) {
                let {meta: t, table: s} = e;
                const i = this.adapterBuilder.computeDatabaseName(t.databaseConfig, s, this.session);
                t.databaseName = i
            }
            computePartitionConfig(e) {
                const t = this.adapterBuilder.computePartitionConfig(e.meta.databaseConfig, e.table, this.session);
                t ? e.meta.partitionConfig = t : this.rejectQuery(e, new v.p(e.table,this.session))
            }
            computeTableConfig(e) {
                const t = this.adapterBuilder.computeTableConfig(e.meta.partitionConfig, e.table, e.database);
                t ? e.meta.tableConfig = t : this.rejectQuery(e, new v.r(e.table))
            }
            computePartitionKey(e) {
                const {databaseConfig: t, tableConfig: s} = e.meta;
                if (t.supportPartitionByField && s.supportPartitionByField)
                    switch (e.type) {
                    case f.d.BeginTransaction:
                    case f.d.CommitTransaction:
                        return void (e.meta.partitionKey = "");
                    case f.d.Clear:
                        return;
                    case f.d.Insert:
                        return void this.computePartitionForInsertQuery(e);
                    case f.d.InsertMulti:
                        return void this.computePartitionForInsertMultiQuery(e);
                    case f.d.Get:
                    case f.d.GetAndUpdate:
                    case f.d.Update:
                    case f.d.Delete:
                        return void this.computePartitionForIndexedQuery(e);
                    case f.d.FindAndDelete:
                    case f.d.GetAllKey:
                    case f.d.GetAll:
                    case f.d.Count:
                        return void this.computePartitionForRangedQuery(e);
                    case f.d.DeleteMulti:
                    case f.d.GetMulti:
                        return void this.computePartitionForGetMultiAndDeleteMultiQuery(e);
                    case f.d.UpdateMulti:
                        return void this.computePartitionForUpdateMultiQuery(e)
                    }
                else
                    e.meta.partitionKey = ""
            }
            computePartitionForInsertQuery(e) {
                const t = this.adapterBuilder.computePartitionKeyFromEntityValue(e.meta.tableConfig, e.params.value);
                void 0 !== t ? e.meta.partitionKey = `${t}` : this.rejectQuery(e, new v.q)
            }
            computePartitionForInsertMultiQuery(e) {
                const t = {
                    groupByPartitions: {}
                };
                for (const i of e.params.values) {
                    const s = this.adapterBuilder.computePartitionKeyFromEntityValue(e.meta.tableConfig, i);
                    if (void 0 === s)
                        return void this.rejectQuery(e, new v.q);
                    t.groupByPartitions[s] || (t.groupByPartitions[s] = []),
                    t.groupByPartitions[s].push(i)
                }
                let s;
                const n = Object.entries(t.groupByPartitions);
                if (1 === n.length)
                    s = n[0][0],
                    void 0 !== s ? e.meta.partitionKey = s : this.rejectQuery(e, new v.q);
                else {
                    e.meta.dead = !0;
                    const t = n.map((t=>{
                        let[s,n] = t;
                        const r = s;
                        return this.doImmediately(Object(i.a)(Object(i.a)({}, e), {}, {
                            meta: Object(i.a)(Object(i.a)({}, e.meta), {}, {
                                partitionKey: r,
                                error: new Error
                            }),
                            params: Object(i.a)(Object(i.a)({}, e.params), {}, {
                                values: n
                            }),
                            deferrer: void 0
                        }))
                    }
                    ));
                    Promise.all(t).then((t=>e.deferrer.resolve(t.flat()))).catch(e.deferrer.reject)
                }
            }
            computePartitionForIndexedQuery(e) {
                const t = this.adapterBuilder.computePartitionKeyFromEntityKey(e.meta.tableConfig, e.params.key, e.params.index);
                void 0 !== t ? e.meta.partitionKey = `${t}` : this.rejectQuery(e, new v.q)
            }
            computePartitionForRangedQuery(e) {
                var t, s;
                if (!e.params.range) {
                    const t = new v.s("Get all data in partitioned table");
                    return void this.rejectQuery(e, t)
                }
                let i = "";
                i = e.type === f.d.FindAndDelete || e.type === f.d.Count ? "primary" : e.params.index;
                const n = e.meta.tableConfig;
                if (-1 === n.getIndexPartitionField(i)) {
                    if (n.usePartitionTable) {
                        const t = new v.s("Lookup partition from query range");
                        this.rejectQuery(e, t)
                    } else {
                        const t = new v.s("Get all data by index in partitioned table");
                        this.rejectQuery(e, t)
                    }
                    return
                }
                if (null === (t = e.params.range) || void 0 === t || !t.from || null === (s = e.params.range) || void 0 === s || !s.to) {
                    const t = new v.s("Get data with open boundary in partition table");
                    return void this.rejectQuery(e, t)
                }
                const r = e.params.range.from
                  , a = e.params.range.to
                  , o = this.adapterBuilder.computePartitionKeyFromEntityKey(e.meta.tableConfig, r, i);
                if (o !== this.adapterBuilder.computePartitionKeyFromEntityKey(e.meta.tableConfig, a, i)) {
                    const t = new v.s("Get data from multiple partition");
                    return void this.rejectQuery(e, t)
                }
                let l = o;
                void 0 !== l ? e.meta.partitionKey = `${l}` : this.rejectQuery(e, new v.q)
            }
            computePartitionForGetMultiAndDeleteMultiQuery(e) {
                let t = "";
                t = e.type === f.d.DeleteMulti ? "primary" : e.params.index;
                const s = {};
                for (const i of e.params.keys) {
                    const n = this.adapterBuilder.computePartitionKeyFromEntityKey(e.meta.tableConfig, i, t);
                    if (void 0 === n)
                        return void this.rejectQuery(e, new v.q);
                    s[n] || (s[n] = []),
                    s[n].push(i)
                }
                const n = Object.entries(s);
                let r;
                if (1 === n.length)
                    r = n[0][0],
                    void 0 !== r ? e.meta.partitionKey = `${r}` : this.rejectQuery(e, new v.q);
                else {
                    e.meta.dead = !0;
                    const t = n.map((t=>{
                        let[s,n] = t;
                        const r = s;
                        return e.type,
                        f.d.GetMulti,
                        this.doImmediately(Object(i.a)(Object(i.a)({}, e), {}, {
                            meta: Object(i.a)(Object(i.a)({}, e.meta), {}, {
                                partitionKey: r,
                                error: new Error
                            }),
                            params: Object(i.a)(Object(i.a)({}, e.params), {}, {
                                keys: n
                            }),
                            deferrer: void 0
                        }))
                    }
                    ));
                    Promise.all(t).then((t=>e.deferrer.resolve(t.flat()))).catch(e.deferrer.reject)
                }
            }
            computePartitionForUpdateMultiQuery(e) {
                const {patches: t} = e.params
                  , s = {};
                for (const i of t) {
                    const {key: t} = i
                      , n = this.adapterBuilder.computePartitionKeyFromEntityKey(e.meta.tableConfig, t);
                    if (void 0 === n)
                        return void this.rejectQuery(e, new v.q);
                    s[n] || (s[n] = []),
                    s[n].push(i)
                }
                let n;
                const r = Object.entries(s);
                if (1 === r.length)
                    n = r[0][0],
                    void 0 !== n ? e.meta.partitionKey = n : this.rejectQuery(e, new v.q);
                else {
                    const t = r.map((t=>{
                        let[s,n] = t;
                        const r = s;
                        return this.doImmediately(Object(i.a)(Object(i.a)({}, e), {}, {
                            meta: Object(i.a)(Object(i.a)({}, e.meta), {}, {
                                partitionKey: r,
                                error: new Error
                            }),
                            params: Object(i.a)(Object(i.a)({}, e.params), {}, {
                                patches: n
                            }),
                            deferrer: void 0
                        }))
                    }
                    ));
                    Promise.all(t).then((t=>e.deferrer.resolve(t.flat()))).catch(e.deferrer.reject)
                }
            }
            shouldReplicate(e) {
                switch (e.type) {
                case f.d.Clear:
                case f.d.Delete:
                case f.d.DeleteMulti:
                case f.d.FindAndDelete:
                case f.d.Insert:
                case f.d.InsertMulti:
                case f.d.Update:
                case f.d.UpdateMulti:
                case f.d.GetAndUpdate:
                    return !0;
                default:
                    return !1
                }
            }
            logQueryInfo(e) {
                T.a.isBeginTransaction(e) ? this.logger.zsymb(12, 9601, 30003, (()=>[I.b.getTypeName(e.type), {
                    database: e.meta.databaseName,
                    table: e.params.tables.join(","),
                    transaction: e.transaction,
                    adapter: e.meta.databaseConfig.typeName
                }])) : this.logger.zsymb(12, 9601, 30004, (()=>[I.b.getTypeName(e.type), {
                    database: e.meta.databaseName,
                    table: e.table,
                    transaction: e.transaction,
                    adapter: e.meta.databaseConfig.typeName
                }]))
            }
            rejectQuery(e, t) {
                e.meta.dead = !0,
                e.deferrer.reject(t)
            }
        }
        ) || w) || w) || w) || w) || w) || w) || w;
        n.ModuleContainer.registerSingleton(L.b, M)
    },
    i15Q: function(e, t, s) {
        "use strict";
        s.d(t, "a", (function() {
            return n
        }
        ));
        var i = s("KRcn");
        class n {
            constructor() {
                this._session = null,
                this._processStart = void 0,
                this._enableConsole = void 0,
                this.isReady = ()=>!!this._session,
                this.getSession = ()=>{
                    if (!this._session)
                        throw new Error("session is not ready");
                    return this._session
                }
                ,
                this.getProcessStartTime = ()=>this._processStart,
                this.setSession = e=>{
                    this._session = e
                }
                ,
                this._processStart = Date.now(),
                this._session = {
                    build: "7f983275590aa900769c11bb937a0828c207dfa7",
                    zlgv: "L98HQdtV",
                    env: "prod",
                    buildType: "release",
                    pversion: s("kiQV").version,
                    process: Object(i.a)()
                },
                this._enableConsole = !1
            }
            enableConsole() {}
            disableConsole() {}
            isEnabledConsole() {
                return this._enableConsole
            }
        }
    },
    j6JD: function(e, t, s) {
        "use strict";
        (function(e) {
            function i(e, t) {
                "string" == typeof e && (e = parseInt(e));
                const s = new Date(e)
                  , i = s.getDate()
                  , r = s.getMonth() + 1
                  , a = (s.getFullYear(),
                s.getHours())
                  , o = s.getMinutes()
                  , l = s.getSeconds();
                return null != t && t.dayOnly ? `${i}.${r}` : null != t && t.timeOnly ? `${n(a, 2)}:${n(o, 2)}:${n(l, 2)}` : `${i}.${r} ${n(a, 2)}:${n(o, 2)}:${n(l, 2)}`
            }
            function n(e, t) {
                const s = e.toString();
                return s.length < t ? "0".repeat(t - s.length) + s : s
            }
            s.d(t, "a", (function() {
                return i
            }
            ))
        }
        ).call(this, s("Q40w").Buffer)
    },
    jIg3: function(e, t, s) {
        "use strict";
        var i = s("1UUk");
        s.d(t, "a", (function() {
            return i.a
        }
        )),
        s.d(t, "b", (function() {
            return i.b
        }
        ))
    },
    jw3m: function(e, t, s) {},
    kiQV: function(e) {
        e.exports = JSON.parse('{"name":"Zalo","homepage":"https://zalo.me/","version":"23.4.1","description":"Zalo - Nhắn gửi yêu thương","engines":{"npm":">=3"},"lint-staged":{"*.{js}":["node ./tools/prettier-include/index.js","eslint --quiet"],"*.{jsx,tsx,ts,scss,md,json,html,yml}":["node ./tools/prettier-include/index.js"]},"pre-commit":"check","main":"bootstrap.js","scripts":{"check":"lint-staged","preinstall":"node tools/nodeVersionCheck.js && git submodule init && git submodule update","postinstall":"npm run update-bundle-files-list && git config core.hooksPath .githooks","setup":"node tools/setup/setupMessage.js && npm install && node tools/setup/setup.js","remove-demo":"babel-node tools/removeDemo.js","start":"npm run init-zlog-vers && cross-env NODE_OPTIONS=\'--max-old-space-size=8192\' zpc-cli run dev:web","start-zaloapp":"npm run init-zlog-vers && cross-env NODE_OPTIONS=\'--max-old-space-size=8192\' WEB_DOMAIN=zaloapp zpc-cli run dev:web","open:src":"cross-env NODE_OPTIONS=\'--max-old-space-size=8192\' zpc-cli run dev:web","open:dist":"cross-env BABEL_ENV=web babel-node tools/distServer.js","update-about":"babel-node tools/updateAbout.js","distwname":"babel-node tools/dist-with-name.js","send-zlog":"node ./tools/zlog/collect-zlog-templates.js","send-zlog-web":"node ./tools/zlog/collect-zlog-templates-web.js","init-zlog-vers":"node ./tools/init-zlog-vers.js","prep":"rimraf ./node_modules/.cache ./zlog-dist && npm run sass && npm run lang","update-call-hash":"babel-node tools/update-call-hash.js","update-zavi-hash":"babel-node tools/update-zavi-hash.js","lint":"esw src --color --parser babel-eslint","lint-strict":"eslint main/*.js","m-lint":"eslint src/utils/meta-info-msg/*.js src/database/base-db.js","lint:watch":"npm run lint -- --watch","clean-dist":"npm run remove-dist && mkdir dist","remove-dist":"rimraf ./dist","prebuild":"npm run clean-dist && npm run sass && npm run lang","prebuild-pc":"npm run lint-strict && rimraf ./pc-dist && mkdir pc-dist && npm run sass && npm run lang","build-dev":"cross-env WEB_ENV=dev npm run build","build-prod":"cross-env WEB_ENV=prod npm run build","build-zaloapp-prod":"cross-env WEB_ENV=prod WEB_DOMAIN=zaloapp npm run build","build-zalome-prod":"cross-env WEB_ENV=prod WEB_DOMAIN=zalome npm run build","build:local":"npm run init-zlog-vers && npm run cross-env NODE_OPTIONS=\'--max-old-space-size=8192\' BUILD_TYPE=release zpc-cli run compile:web","build":"npm run init-zlog-vers && cross-env NODE_OPTIONS=\'--max-old-space-size=8192\' BUILD_TYPE=release node ./tools/zpc-cli.js run compile:web","compile:main":"npm run init-zlog-vers && cross-env NODE_OPTIONS=\'--max-old-space-size=8192\' zpc-cli run compile:main","build-pc":"npm run init-zlog-vers && cross-env NODE_OPTIONS=\'--max-old-space-size=8192\' zpc-cli run compile:renderer","build-pc-appX":"npm run init-zlog-vers && cross-env NODE_OPTIONS=\'--max-old-space-size=8192\' zpc-cli run compile:renderer:appx","test:cover":"babel-node node_modules/isparta/bin/isparta cover --root src --report html node_modules/mocha/bin/_mocha -- --require ./tools/testSetup.js \\"src/**/*.spec.js\\" --reporter progress","test:cover:travis":"babel-node node_modules/isparta/bin/isparta cover --root src --report lcovonly _mocha -- --require ./tools/testSetup.js \\"src/**/*.spec.js\\" && cat ./coverage/lcov.info | node_modules/coveralls/bin/coveralls.js","test:watch":"npm run test -- --watch","open:cover":"npm run test:cover && open coverage/index.html","test:electron":"electron ./test/main/download.js","test":"for f in $(find src -name *.spec.js); do NODE_PATH=./src mocha tools/testSetup.js \\"$f\\" --reporter progress; done;","wintest":"for %f in (src/utils/*.spec.js) do mocha tools/testSetup.js \\"src/utils/%f\\" done;","jest:test":"cross-env NODE_PATH=./src __PLATFORM__=WEB NODE_ENV=development jest --forceExit","jest:emoji":"cross-env NODE_PATH=./src __PLATFORM__=WEB jest test/core/parse-emoji.test.js --forceExit","jest:conversation":"cross-env NODE_PATH=./src __PLATFORM__=WEB jest --watch --testPathPattern=src/logic/conversation --forceExit","jest:log:test":"cross-env NODE_PATH=./src jest --runInBand --forceExit","jest:update":"cross-env NODE_PATH=./src jest -u","test:single":"cross-env NODE_PATH=./src mocha tools/testSetup.js src/utils/message.spec.js","test:file":"node ./test/file/test.js","test:ibparser":"cross-env NODE_PATH=./src mocha tools/testSetup.js  src/utils/inputbox-parser.spec.js","test:compare":"cross-env NODE_PATH=./src mocha tools/testSetup.js  src/utils/third-party/compare.spec.js","test:zstructures":"cross-env NODE_PATH=./src mocha tools/testSetup.js  src/utils/third-party/zstructures.spec.js","test:common":"cross-env NODE_PATH=./src mocha tools/testSetup.js src/utils/common.spec.js","test:schema":"cross-env NODE_PATH=./src jest --config= database/zdb/row-items/schema/data-validator.test.js --forceExit --detectOpenHandles","presass":"mkdirp src/static/css && mkdirp pc/static/fonts/zalo && ncp src/static/fonts/zalo/ pc/static/fonts/zalo/ && mkdirp pc/static/fonts/main  && ncp src/static/fonts/main/ pc/static/fonts/main/ ","sass":"sass src/static/scss/layout.scss src/static/css/layout.css && sass pc/static/scss/login.scss pc/static/css/login.css  && sass pc/static/scss/photo.scss pc/static/css/photo.css  && sass pc/static/scss/videocall.scss pc/static/css/videocall.css && sass src/static/scss/base/color-v1.scss src/static/css/color-v1.css && sass src/static/scss/base/darkmode.scss src/static/css/darkmode.css && sass src/static/scss/base/color-vtest.scss src/static/css/color-vtest.css","preelectron-start-dev":"npm run init-zlog-vers && cross-env NODE_OPTIONS=\'--max-old-space-size=8192\' zpc-cli run dev:main","electron-start-dev":"npm run init-zlog-vers && cross-env PC=1 BABEL_ENV=pc NODE_ENV=development electron .","predebug-main":"npm run init-zlog-vers && npm run init-zlog-vers && cross-env NODE_OPTIONS=\'--max-old-space-size=8192\' zpc-cli run dev:main","debug-main":"npm run init-zlog-vers && cross-env PC=1 BABEL_ENV=pc NODE_ENV=development electron . --inspect=9230","pc-compile":"cross-env FORCE_COLOR=1 PC=1 BABEL_ENV=pc NODE_ENV=development npm run electron-start-dev","pc-compile-2":"cross-env PC=1 BABEL_ENV=pc CLONE=1 NODE_ENV=development npm run electron-start-dev","v1-start-dev":"npm run init-zlog-vers && cross-env NODE_OPTIONS=\'--max-old-space-size=8192\' zpc-cli run dev:renderer","pc-start-dev":"npm run init-zlog-vers && cross-env NODE_OPTIONS=\'--max-old-space-size=8192\' zpc-cli run dev:renderer","start-pc":"npm run init-zlog-vers && npm-run-all -p pc-compile pc-start-dev","prepack":"npm run build-pc && npm run compile:main","prepack:win32":"npm run build-pc && npm run compile:main","prepack:winstaller":"npm run build-pc && npm run signtool && npm run compile:main","prewinstaller":"git submodule init && git submodule update","pack":"electron-builder --dir --config electron-builder.config.js","pack:win32":"cross-env BUILD_TYPE=release npm run pack:winstaller && node ./tools/afterpack.js ia32 && babel-node tools/genPartialUpdate.js ia32 -- ","pack:winstaller:no-build":"cross-env BUILD_TYPE=release ELECTRON_BUILDER_ALLOW_UNRESOLVED_DEPENDENCIES=true electron-builder --dir --ia32 --config electron-builder.config.js","pack:winstaller":"electron-builder --dir --ia32 --config electron-builder.config.js","postpack":"babel-node tools/genPartialUpdate.js","postpack:win32":"babel-node tools/genPartialUpdate.js ia32","predodist":"npm run build-pc && npm run signtool && npm run compile:main","predodist:win64":"npm run predodist","predodist:win32":"npm run predodist","predodist:mac":"node ./tools/predodistmac.js && npm run predodist","dodist":"electron-builder --config electron-builder.config.js","predodist:dir":"npm run build-pc && npm run signtool && npm run compile:main","dodist:mac":"electron-builder --mac --config electron-builder.config.js","dodist:dir":"electron-builder --dir --mac --config electron-builder.config.js","dodist:win":"electron-builder --win --config electron-builder.config.js","dodist:win32":"electron-builder --ia32 --config electron-builder.config.js","dodist:win64":"electron-builder --arch x64 --config electron-builder.config.js","pack:installer":"node ./tools/prebuild.js && npm run pack:winstaller && node ./tools/afterpack.js ia32 && electron-builder --prepackaged ./dist/win-ia32-unpacked/ --ia32 --config electron-builder.config.js && babel-node tools/genPartialUpdate.js ia32 -- ","pack:full":"node ./tools/prebuild.js && npm run pack:winstaller && node ./tools/afterpack.js ia32 && electron-builder --prepackaged ./dist/win-ia32-unpacked/ --ia32 --config electron-builder.config.js && babel-node tools/diffModule.js","dist:win32":"cross-env ELECTRON_BUILDER_ALLOW_UNRESOLVED_DEPENDENCIES=true NODE_OPTIONS=\'--max-old-space-size=4096\' BUILD_ENV=test npm run pack:installer","dist:win32release":"cross-env ELECTRON_BUILDER_ALLOW_UNRESOLVED_DEPENDENCIES=true NODE_OPTIONS=\'--max-old-space-size=4096\' BUILD_TYPE=release BUILD_ENV=test NEED_SIGN=1 npm run pack:installer","dist:win32fullpack":"cross-env ELECTRON_BUILDER_ALLOW_UNRESOLVED_DEPENDENCIES=true NODE_OPTIONS=\'--max-old-space-size=8096\' BUILD_TYPE=release BUILD_ENV=production NEED_SIGN=1 npm run pack:full","postpack:full":"","uploadsourcemapwin":"cross-env ZLOG_TYPE=PC sentry-cli releases files Zalo%npm_package_version% upload-sourcemaps pc-dist/ --url-prefix app:///pc-dist/ && sentry-cli releases files Zalo%npm_package_version% upload-sourcemaps main-dist/ --url-prefix app:///main-dist/ && npm run send-zlog","uploadsourcemapmac":"cross-env ZLOG_TYPE=PC sentry-cli releases files Zalo$npm_package_version upload-sourcemaps pc-dist/ --url-prefix app:///pc-dist/ && sentry-cli releases files Zalo$npm_package_version upload-sourcemaps main-dist/ --url-prefix app:///main-dist/ && npm run send-zlog","uploadsourcemapweb":"cross-env ZLOG_TYPE=WEB sentry-cli releases files Zalo$npm_package_version upload-sourcemaps dist/ --url-prefix ~/ && rm -r ./dist/sourcemaps && npm run send-zlog-web","dist:win32nobuild":"electron-builder --prepackaged ./dist/win-ia32-unpacked/ --ia32 --config electron-builder.config.js&& babel-node tools/genPartialUpdate.js ia32 -- ","dist:win":"cross-env ELECTRON_BUILDER_ALLOW_UNRESOLVED_DEPENDENCIES=true npm run dodist:win","dist:win64":"cross-env ELECTRON_BUILDER_ALLOW_UNRESOLVED_DEPENDENCIES=true npm run dodist:win64","dist:appX":"(npm run dodist:appX || true) && babel-node tools/rename-appx-64.js &&  npm run dodist:appX32","dist:mac":"cross-env ELECTRON_BUILDER_ALLOW_UNRESOLVED_DEPENDENCIES=true BUILD_ENV=test npm run dodist:mac","dist:macrelease":"cross-env NODE_OPTIONS=\'--max-old-space-size=4096\' ELECTRON_BUILDER_ALLOW_UNRESOLVED_DEPENDENCIES=true BUILD_TYPE=release NEED_SIGN=1 npm run dodist:mac","dist:macnobuild":"cross-env ELECTRON_BUILDER_ALLOW_UNRESOLVED_DEPENDENCIES=true electron-builder --mac --config electron-builder.config.js","dist":"cross-env NODE_OPTIONS=\'--max-old-space-size=2048\' ELECTRON_BUILDER_ALLOW_UNRESOLVED_DEPENDENCIES=true npm run dodist","predist:appX":"npm run build-pc-appX && npm run signtool && npm run compile:main","dodist:appX":"cross-env ELECTRON_BUILDER_ALLOW_UNRESOLVED_DEPENDENCIES=true electron-builder --win AppX --config electron-builder.config.js","dodist:appX32":"cross-env ELECTRON_BUILDER_ALLOW_UNRESOLVED_DEPENDENCIES=true electron-builder --win AppX --ia32  --config electron-builder.config.js","zip-pc":"babel-node tools/zipResource.js","db:clear":"babel-node tools/clearDb.js","icon:gen":"gulp icon","icon:check":"babel-node icon/checkIconsCli.js","icon":"babel-node icon/buildIcons.js && babel-node icon/createSVGFont.js && npm run sass","icon:full":"npm run icon:check && npm run icon && npm run sass ","lang":"mkdirp src/static/lang &&  cd ./InitLang && node ./run.js","signtool":"cross-env BABEL_ENV=node babel-node tools/sign-tool-win.js","install-native":"electron-builder install-app-deps","install-native-32":"electron-builder install-app-deps --arch=ia32","pack-module":"babel-node tools/genPartialUpdate.js ia32 -- ","update-bundle-files-list":"node ./tools/get-node-modules-glob.js","upload-native-symbol":"sentry-cli upload-dif -o vng -p zalopc --wait ./.symbols"},"author":{"name":"VNG Corp.","email":"feddback@zalo.me","url":"https://zalo.me/"},"license":"MIT","dependencies":{"@babel/plugin-transform-runtime":"7.11.0","@babel/preset-env":"7.11.0","@babel/preset-react":"7.10.4","@babel/runtime-corejs3":"7.11.2","@google-cloud/secret-manager":"4.0.0","@google-cloud/storage":"6.1.0","@reduxjs/toolkit":"1.5.1","@sentry/electron":"1.1.0","@sentry/react":"6.2.4","@tensorflow/tfjs":"0.15.3","@types/generic-pool":"3.1.9","adm-zip":"0.4.13","ajv":"5.2.2","archiver":"2.0.3","auto-launch":"^5.0.1","babel-plugin-module-resolver":"4.0.0","babel-plugin-transform-zlog":"1.17.1","big-integer":"1.6.23","bloom-filters":"1.3.8","broadcast-channel":"~4.10.0","cborg":"1.9.5","change-case":"4.1.2","chart.js":"2.7.2","check-disk-space":"2.1.0","clsx":"1.0.4","codemirror":"^5.59.0","core-js":"3.6.5","cron":"2.1.0","crypto-js":"3.1.8","decompress":"4.2.0","dompurify":"2.3.6","dropbox":"2.5.9","electron-log":"4.2.2","electron-store":"6.0.1","electron-updater":"4.0.0","es6-promise":"3.2.1","fast-memoize":"^2.5.2","file-saver":"1.3.3","file-type":"10.11.0","flatted":"3.2.5","fs-extra":"6.0.1","generic-pool":"3.7.2","glob":"7.1.2","google-libphonenumber":"3.1.15","immer":"7.0.5","jpeg-js":"0.4.1","js-yaml":"^3.8.4","jszip":"3.10.1","libphonenumber-js":"1.6.6","lodash.debounce":"4.0.8","lodash.toarray":"4.4.0","lottie-web":"^5.1.7","lowdb":"2.1.0","lz-string":"1.4.4","mediatr-ts":"0.3.0","microm":"0.2.4","mkdirp":"^0.5.1","moment":"^2.29.1","nanoid":"3.3.3","network":"0.5.0","node-fetch":"2.6.0","node-stream-zip":"1.8.0","node-wifi":"2.0.13","p-defer":"4.0.0","p-tap":"4.0.0","pako":"2.0.3","pdfjs-dist":"2.5.207","percentile":"1.6.0","progress-stream":"1.2.0","prop-types":"15.5.10","protobufjs":"6.11.2","quick-lru":"6.0.2","react":"16.14.0","react-codemirror2":"^7.2.1","react-custom-scrollbars":"^4.2.1","react-datetime":"file:native/zdate-time-picker","react-dom":"16.14.0","react-draggable":"^4.4.3","react-error-overlay":"6.0.7","react-input-range":"^1.3.0","react-intersection-observer":"8.25.2","react-measure":"2.0.2","react-motion":"0.5.2","react-redux":"7.2.4","react-refresh":"0.8.3","react-resizable":"^1.11.0","react-router-redux":"^4.0.8","react-simple-timefield":"3.2.5","react-transition-group":"4.4.1","react-virtualized":"9.9.0","recoil":"0.1.3","recompose":"0.30.0","redux":"4.0.5","redux-batched-subscribe":"0.1.6","redux-thunk":"2.3.0","reflect-metadata":"0.1.13","request":"2.88.0","reselect":"4.0.0","resize-observer-polyfill":"1.5.1","sift":"16.0.0","source-map-support":"0.5.19","spark-md5":"3.0.0","stackblur-canvas":"1.4.0","systeminformation":"5.6.12","tar-fs":"2.0.0","tmp":"0.0.31","tough-cookie":"^2.3.2","tsyringe":"4.6.0","unused-filename":"0.1.0","uuid":"3.1.0","workerpool":"6.1.0","xstate":"4.23.1"},"devDependencies":{"@babel/cli":"^7.0.0","@babel/core":"^7.0.0","@babel/eslint-parser":"7.12.1","@babel/node":"^7.0.0","@babel/plugin-proposal-class-properties":"7.12.1","@babel/preset-typescript":"7.12.7","@babel/register":"^7.0.0","@sentry/cli":"1.51.1","@types/async":"3.2.3","@types/codemirror":"0.0.98","@types/core-js":"2.5.4","@types/dompurify":"2.3.3","@types/gulp":"4.0.6","@types/jest":"26.0.23","@types/lodash.debounce":"4.0.6","@types/lodash.toarray":"4.4.6","@types/node":"17.0.35","@types/react":"^16.8.25","@types/react-custom-scrollbars":"4.0.8","@types/react-dom":"17.0.9","@types/react-resizable":"1.7.3","@types/react-transition-group":"4.4.0","@types/react-virtualized":"9.21.12","@types/rimraf":"3.0.2","@types/sqlite3":"3.1.8","@types/workerpool":"6.1.0","@typescript-eslint/parser":"4.22.0","babel-core":"^7.0.0-bridge.0","babel-eslint":"^9.0.0","babel-jest":"^23.4.2","babel-plugin-encrypt-src":"^1.0.3","capitalize":"2.0.4","chai":"3.5.0","chalk":"1.1.3","connect":"3.6.6","consola":"2.15.0","coveralls":"2.11.12","cross-env":"^2.0.0-beta","debug":"4.1.1","devtron":"1.4.0","electron":"7.3.2","electron-builder":"20.44.4","electron-devtools-installer":"3.1.1","electron-download":"4.1.1","electron-notarize":"0.2.1","electron-publish":"19.53.3","enzyme":"3.3.0","eslint":"5.4.0","eslint-import-resolver-babel-module":"5.1.0","eslint-import-resolver-webpack":"0.6.0","eslint-plugin-babel":"3.3.0","eslint-plugin-import":"2.16.0","eslint-plugin-jest":"21.22.0","eslint-plugin-jsx-a11y":"2.1.0","eslint-plugin-react":"7.11.1","eslint-plugin-react-hooks":"2.4.0","eslint-watch":"2.1.14","faker":"5.5.3","globby":"11.0.1","gulp":"4.0.2","gulp-consolidate":"0.2.0","gulp-iconfont":"11.0.0","isparta":"4.0.0","jest":"23.6.0","jsftp":"1.5.5","lint-staged":"10.5.4","md5":"2.2.1","md5-file":"4.0.0","micromatch":"4.0.2","mocha":"4.1.0","ncp":"^2.0.0","node-abi":"^2.0.2","node-pre-gyp":"^0.6.37","node-sass":"4.12.0","nodemon":"1.11.0","npm":"6.14.2","npm-run-all":"2.3.0","open":"0.0.5","pre-commit":"1.2.2","prettier":"2.4.1","prompt":"1.0.0","react-hook-form":"7.31.3","react-hook-form-auto":"1.3.13","react-test-renderer":"16.5.1","recoilize":"2.0.1","redux-logger":"3.0.6","redux-perf-middleware":"1.1.0","regenerator-runtime":"0.13.7","replace":"0.3.0","rimraf":"2.5.4","serve-static":"1.13.2","shelving-mock-indexeddb":"1.0.8","sinon":"1.17.5","sinon-chai":"2.8.0","terser-webpack-plugin-legacy":"1.2.3","ts-jest":"26.5.6","ts-node":"8.10.2","typescript":"3.9.6","uglify-es":"3.3.7","uglifyjs-webpack-plugin":"1.1.6","utility-types":"3.10.0","walkdir":"0.0.12","webpack":"3.10.0","webpack-chain":"6.5.1","webpack-dev-middleware":"^2.0.4","webpack-hot-middleware":"^2.21.0","webpack-md5-hash":"0.0.5","webpack-strip":"0.1.0","webpack-virtual-modules":"0.4.3","yargs":"15.4.1"},"externals":[]}')
    },
    nUpV: function(e, t, s) {
        "use strict";
        var i = s("jDHv")
          , n = s("YEoC")
          , r = (s("bSii"),
        s("UJ0r"))
          , a = s("teaq");
        const o = n.a.IDB;
        var l, c = s("d/or");
        let d = i.ModuleContainer.injectable()(l = Reflect.metadata("design:type", Function)(l = Reflect.metadata("design:paramtypes", [])(l = class e {
            constructor() {
                this._preferAdapters = void 0,
                this._settings = void 0,
                this._preferAdapters = [],
                this._settings = new Map
            }
            get preferAdapters() {
                return this._preferAdapters
            }
            set preferAdapters(e) {
                this._preferAdapters = e,
                this._settings.clear(),
                this.save();
                i.ModuleContainer.resolve(a.b).clearCache()
            }
            async load() {
                i.ModuleContainer.resolve(r.b);
                throw new Error("'zdb_setting' localStorage key is no longer in-use! Please remove it usage!")
            }
            async save() {
                e.deserializePreferAdapter(this._preferAdapters),
                e.deserializeDatabaseSettings(this._settings);
                throw new Error("'zdb_setting' localStorage key is no longer in-use! Please remove it usage!")
            }
            getPreferredAdapter(e) {
                var t;
                return null === (t = this._settings.get(e)) || void 0 === t ? void 0 : t.preferAdapter
            }
            setPreferAdapter(e, t) {
                let s = this._settings.get(e);
                s ? s.preferAdapter = t : s = {
                    currentAdapter: t,
                    preferAdapter: t
                },
                this._settings.set(e, s),
                this.save()
            }
            getCurrentAdapterType(e) {
                let t = this._settings.get(e);
                return t || (t = {
                    currentAdapter: o
                },
                this._settings.set(e, t)),
                t.currentAdapter
            }
            setCurrentAdapter(e, t) {
                let s = this._settings.get(e);
                s ? s.currentAdapter = t : s = {
                    currentAdapter: t,
                    preferAdapter: t
                },
                this._settings.set(e, s)
            }
            getDatabaseState(e) {
                return this._settings.get(e)
            }
            static deserializePreferAdapter(e) {
                return e.map((e=>e === n.a.IDB ? "IDB" : "SQLite"))
            }
            static serializePreferAdapter(e) {
                return e.adapter.map((e=>"IDB" === e ? n.a.IDB : n.a.SQLite))
            }
            static deserializeDatabaseSettings(e) {
                return Array.from(e.entries())
            }
            static serializeDatabaseSettings(e) {
                return new Map(e.databases)
            }
        }
        ) || l) || l) || l;
        i.ModuleContainer.registerSingleton(c.a, d)
    },
    o0oJ: function(e, t, s) {
        (function(e) {
            const t = {};
            function s(e) {
                return t[e] || (t[e] = 0),
                t[e] += 1,
                100 * e + t[e]
            }
            if (!e.perf) {
                let t;
                t = ()=>Date.now();
                const i = {
                    STARTUP: s(1),
                    MIGRATION_DONE: s(2),
                    MAIN_SCRIPT: s(2),
                    LOADED_MAIN_SCRIPT: s(3),
                    MAIN_APP_READY: s(3),
                    LOADED_STARTUP_SCRIPT: s(2),
                    STARTUP_BEFORE_HEAVY: s(3),
                    CREATE_MAIN_WINDOW: s(3),
                    SHOW_MAIN_WINDOW: s(3),
                    MAIN_WINDOW_LOADING: s(3),
                    MAIN_WINDOW_LOADED: s(3),
                    APP_STARTUP: s(2),
                    LOAD_APP_SCRIPT: s(3),
                    APP_DID_MOUNT: s(3),
                    CHATBOX_DID_MOUNT: s(3),
                    SELECT_CONVERSATION: s(1),
                    SELECTED_CONVERSATION: s(2)
                };
                e.perf = {
                    ...i,
                    perfRecords: [],
                    record: s=>{
                        s || (s = 0);
                        const i = [s, t()];
                        e.perf.perfRecords.push(i)
                    }
                }
            }
        }
        ).call(this, s("kjmW"))
    },
    qLCR: function(e, t, s) {
        "use strict";
        s.r(t);
        s("cOPa"),
        s("mNvP"),
        s("BtX6");
        var i = s("VTBJ")
          , n = s("mwIZ")
          , r = s.n(n)
          , a = s("D1y2")
          , o = s.n(a)
          , l = s("jDHv")
          , c = s("Y58e");
        l.ModuleContainer.registerSingleton(c.a, class {
            get(e) {
                const t = s("NDmK").default;
                return r()(t, e)
            }
            set(e, t) {
                const n = s("NDmK").default
                  , a = Object(i.a)(Object(i.a)({}, r()(n, e)), t);
                return o()(n, e, a)
            }
        }
        );
        var d, h = s("jGDt"), u = s("igA5"), g = s("PLj1"), p = s("KRcn"), m = s("7FSS"), f = s("i15Q"), v = s("1pet");
        let b = Object(l.injectable)()(d = Reflect.metadata("design:type", Function)(d = Reflect.metadata("design:paramtypes", [])(d = class extends f.a {
            constructor() {
                super();
                const e = Object(p.a)();
                if (g.a.includes(e))
                    this._enableConsole = !1;
                else {
                    var t;
                    const e = null === (t = u.a.getInstance()) || void 0 === t ? void 0 : t.getItem(v.ZLoggerLocalStorageKeys.RENDERER_CONSOLE_MODE);
                    this._enableConsole = "true" === e || !1
                }
                m.a.log("[ZLL]: Console logging", this._enableConsole ? "enabled" : "disabled")
            }
            enableConsole() {
                m.a.log("[ZLL]: Console logging enabled"),
                this._enableConsole = !0;
                const e = Object(p.a)();
                var t;
                g.a.includes(e) || (null === (t = u.a.getInstance()) || void 0 === t || t.setItem(v.ZLoggerLocalStorageKeys.RENDERER_CONSOLE_MODE, "true"))
            }
            disableConsole() {
                m.a.log("[ZLL]: Console logging disabled"),
                this._enableConsole = !1;
                const e = Object(p.a)();
                var t;
                g.a.includes(e) || (null === (t = u.a.getInstance()) || void 0 === t || t.setItem(v.ZLoggerLocalStorageKeys.RENDERER_CONSOLE_MODE, "false"))
            }
        }
        ) || d) || d) || d;
        l.ModuleContainer.registerSingleton(h.a, b);
        s("ezdo"),
        s("KdAX");
        var I = s("W8Xk");
        const y = Object(l.define)("kv-cache")
          , C = Object(l.define)("kv-cache-in-mem");
        var S;
        class E {
            constructor(e) {
                this._prefix = void 0,
                this._prefix = `${e}-kv-db`
            }
            _buildKey(e) {
                return `${this._prefix}-${e}`
            }
            async setItem(e, t) {
                const s = this._buildKey(e)
                  , i = u.a.getInstance();
                return await i.setItemAsync(s, I.b(t)),
                t
            }
            async getItem(e) {
                const t = this._buildKey(e)
                  , s = u.a.getInstance()
                  , i = await s.getItemAsync(t);
                return Promise.resolve(i ? I.a(i) : void 0)
            }
            async removeItem(e) {
                const t = this._buildKey(e)
                  , s = u.a.getInstance();
                return await s.removeItemAsync(t),
                this
            }
        }
        Object(l.singleton)(y)(S = class {
            createCache(e) {
                return new E(`${e}`)
            }
        }
        );
        var _, T = s("ndDP");
        class L {
            constructor(e, t) {
                this._unused_name = e,
                this._lru = void 0,
                this._lru = new T.default(t)
            }
            setItem(e, t) {
                return this._lru.set(e, t),
                Promise.resolve(t)
            }
            getItem(e) {
                return Promise.resolve(this._lru.get(e))
            }
            removeItem(e) {
                return this._lru.delete(e),
                Promise.resolve(this)
            }
        }
        Object(l.singleton)(C)(_ = class {
            constructor() {
                this._registry = {}
            }
            createCache(e, t) {
                return this._registry[e] || (this._registry[e] = new L(e,t)),
                this._registry[e]
            }
        }
        );
        s("wKPd"),
        s("0rWR"),
        s("Lq8m"),
        s("nUpV"),
        s("5yGw"),
        s("hRcX"),
        s("gpNb"),
        s("rhBN"),
        s("cF85"),
        s("XidR");
        var O = s("4prX")
          , F = s("12Ui");
        l.ModuleContainer.registerSingleton(F.a, class {
            increaseSuccess(e, t, s, i, n) {
                O.default.increaseSuccess(e, t, s, i, n)
            }
            increaseFailed(e, t, s, i, n, r, a) {
                O.default.increaseFailed(e, t, s, i, n, r, a)
            }
        }
        );
        var R, w = s("8/YW"), M = s("PmZf"), D = s("tHMN"), A = s("jIg3"), P = s("Mgpg");
        let j = l.ModuleContainer.injectable()(R = function(e, t) {
            return l.ModuleContainer.inject(D.b)(e, void 0, 0)
        }(R = function(e, t) {
            return l.ModuleContainer.inject(P.ZLoggerFactory)(e, void 0, 1)
        }(R = Reflect.metadata("design:type", Function)(R = Reflect.metadata("design:paramtypes", [void 0 === D.a ? Object : D.a, void 0 === P.ZLoggerFactory ? Object : P.ZLoggerFactory])(R = class extends A.a {
            constructor(e, t) {
                super(),
                this.engine = e,
                this.logger = void 0,
                this.logger = t.createZLogger("db", ["browser"]),
                this.engine.addEventListener(M.a.UnexpectedError, (e=>{
                    this.dispatchEvent(new M.d(e.error))
                }
                )),
                this.engine.addEventListener(M.a.QueryError, (e=>{
                    this.dispatchEvent(new M.b(e.error))
                }
                ))
            }
            install() {
                const e = l.ModuleContainer.resolve(w.a);
                e.addEventListener(w.b.Authenticated, (e=>{
                    this.authenticate(e.getSession())
                }
                )),
                e.currentSession && this.authenticate(e.currentSession),
                this.logger.zsymb(3, 8630, 3e4, "installed")
            }
            areYouOk() {
                return !0
            }
            authenticate(e) {
                e && (this.session = e,
                this.dispatchEvent(new M.c(e)),
                this.logger.zsymb(0, 8630, 30001, (()=>["authenticated", `id: ${e.userId}`])))
            }
            async closeDBs(e) {
                let t = [];
                e ? e.length && (t = e.map((e=>this.engine.closeDatabase(e)))) : t = [this.engine.closeAllDatabases()],
                await Promise.all(t)
            }
        }
        ) || R) || R) || R) || R) || R;
        l.ModuleContainer.registerSingleton(A.b, j);
        var N, B = s("W8fB");
        let U = Object(l.injectable)()(N = class {
        }
        ) || N;
        l.ModuleContainer.registerSingleton(B.b, U);
        var k = s("AH6j")
          , G = s("fsQs")
          , x = s("HPcM");
        let z;
        !function(e) {
            e.Binary = "zlog",
            e.Text = "log"
        }(z || (z = {}));
        z.Binary,
        z.Text;
        let V, $;
        !function(e) {
            e.PhysicalTextWriter = "PhysicalTextWriter",
            e.PhysicalBinaryWriter = "PhysicalBinaryWriter",
            e.PhysicalMeta = "PhysicalMeta"
        }(V || (V = {})),
        function(e) {
            e.Init = "Init",
            e.Idle = "Idle",
            e.Busy = "Busy",
            e.Paused = "Paused",
            e.Disabled = "Disabled"
        }($ || ($ = {}));
        const q = Object(l.define)("virtual-file-writer");
        var W;
        let H = Object(l.injectable)()(W = function(e, t) {
            return Object(l.inject)(x.a)(e, void 0, 0)
        }(W = function(e, t) {
            return Object(l.inject)(q)(e, void 0, 1)
        }(W = Reflect.metadata("design:type", Function)(W = Reflect.metadata("design:paramtypes", [void 0 === x.a ? Object : x.a, void 0 === q ? Object : q])(W = class extends k.b {
            constructor(e, t) {
                super(),
                this.bucket = e,
                this.logWriter = t,
                this._mode = void 0,
                this.status = $.Init,
                this._mode = z.Binary
            }
            async init() {
                G.n && m.a.log("DBLogWriterImpl.init()");
                try {
                    await this.logWriter.loadMeta(),
                    this._mode === z.Binary && await this.logWriter.loadModule()
                } catch (e) {
                    m.a.debug("[ZLL]: DBLogWriterImpl.init() failed", e)
                }
                this.status = $.Idle,
                G.n && m.a.log("[ZLL]: DBLogWriterImpl init() DONE", $[this.status])
            }
            async flush() {
                if (this.status !== $.Idle)
                    return;
                let e = Date.now();
                if (0 === this.bucket.size())
                    return;
                G.n && m.a.log(`FLUSHING: ${this.bucket.size()} logs => DB`),
                this.status = $.Busy;
                const t = this.bucket.get(G.j)
                  , s = t.length;
                await this.logWriter.write(t) ? (await this.logWriter.flushMetas(),
                this.bucket.removeFirst(s - t.length)) : t.length > 0 && m.a.error(`[ZLL]: flush failed: ${s - t.length}/${s}. failed:${t.length}/${s}`),
                this._mode === z.Binary && await this.logWriter.flushModules(),
                this.status = $.Idle,
                G.n && m.a.log(`FLUSHED: ${s - t.length}/${s} logs => DB. TOOK: ${Date.now() - e}ms`)
            }
        }
        ) || W) || W) || W) || W) || W;
        var K, Q = s("fsN4"), Z = s("ebA4"), J = s("ez9R"), X = s("XuBa"), Y = s("j6JD");
        const ee = {
            id: 0,
            current: 0,
            currentPage: 0,
            startups: [],
            ss: -1,
            ss_ln: -1
        };
        let te = Object(l.injectable)()(K = Reflect.metadata("design:type", Function)(K = Reflect.metadata("design:paramtypes", [])(K = class {
            constructor() {
                this._status = void 0,
                this.BinEncoder = null,
                this.DB = void 0,
                this.currentPage = void 0,
                this.module = new Map,
                this.metas = {
                    data: ee,
                    updateRequired: !1
                },
                this._status = $.Idle,
                this.DB = Q.a.getInstance().ZLog
            }
            get status() {
                return this._status
            }
            async write(e) {
                try {
                    return this._status = $.Busy,
                    await this.encodeFit(e, this.metas),
                    this._status = $.Idle,
                    !0
                } catch (t) {
                    return m.a.error(`[ZLL]: VirtualFileWriterImpl.write err ${t}`),
                    this._status = $.Idle,
                    !1
                }
            }
            async collectAllLogs() {
                try {
                    const e = (await this.DB.Pages.getAll()).map((e=>e.data.slice(0, e.curoffs)))
                      , t = new Blob(e);
                    return await t.arrayBuffer()
                } catch (e) {
                    return m.a.error(`[ZLL]:VirtualFileWriterImpl.getAllPagesCombine err ${e}`),
                    new ArrayBuffer(0)
                }
            }
            async read(e) {
                try {
                    return await this.DB.Pages.get(e)
                } catch (t) {
                    return void m.a.error(`[ZLL]: VirtualFileWriterImpl.reading ${e} err ${t}`)
                }
            }
            async delete(e) {
                try {
                    return await this.DB.Pages.delete(e),
                    !0
                } catch (t) {
                    return m.a.error(`[ZLL]:VirtualFileWriterImpl.deleting ${e} err ${t}`),
                    !1
                }
            }
            async encodeFit(e, t) {
                var s;
                if (0 === e.length)
                    return;
                const i = []
                  , n = G.d.page_limit;
                this.currentPage && this.currentPage.id === t.data.currentPage || (this.currentPage = await this.DB.Pages.get(t.data.currentPage),
                this.currentPage && (this.currentPage.curoffs = 0));
                let r = 0;
                const a = n - ((null === (s = this.currentPage) || void 0 === s ? void 0 : s.curoffs) || 0);
                let o = G.c.OK;
                for (; e.length; ) {
                    const t = await this.encodeBinary(e[0]);
                    if (r + t.byteLength > a) {
                        o = G.c.OVERSIZE_NEXTPAGE;
                        break
                    }
                    i.push(new Uint8Array(t)),
                    r += t.byteLength,
                    e.shift()
                }
                if (0 === i.length && o === G.c.OVERSIZE_NEXTPAGE) {
                    if (this.currentPage && this.currentPage.curoffs < this.currentPage.data.size) {
                        const e = this.currentPage.data.slice(0, this.currentPage.curoffs);
                        this.currentPage.data = e,
                        await this.DB.Pages.insert(this.currentPage, {
                            replace: !0
                        })
                    }
                    return this.nextPage(t),
                    void (await this.DB.Metas.insert(t.data, {
                        replace: !0
                    }))
                }
                if (!i.length)
                    return;
                const l = this.combineArrayBuffers(i);
                if (this.currentPage) {
                    if (l.byteLength) {
                        const e = this.currentPage.data.slice(0, this.currentPage.curoffs)
                          , t = new Blob([e, l]);
                        this.currentPage.data = t,
                        this.currentPage.curoffs += l.byteLength,
                        this.currentPage.max = G.d.page_limit,
                        this.currentPage.mtime = Date.now()
                    }
                    o === G.c.OVERSIZE_NEXTPAGE ? this.nextPage(t) : t.data.current = this.currentPage.curoffs,
                    l.byteLength && await this.DB.Pages.insert(this.currentPage, {
                        replace: !0
                    });
                    try {
                        await this.DB.Metas.insert(t.data, {
                            replace: !0
                        })
                    } catch (c) {
                        m.a.error("[ZLL]: VirtualFileWriterImpl.encodeFit err2", c)
                    }
                } else {
                    this.currentPage = {
                        id: t.data.currentPage,
                        data: new Blob([l]),
                        curoffs: l.byteLength,
                        max: G.d.page_limit,
                        mtime: Date.now()
                    },
                    t.data.current = l.byteLength;
                    try {
                        await this.DB.Pages.insert(this.currentPage, {
                            replace: !0
                        }),
                        await this.DB.Metas.insert(t.data, {
                            replace: !0
                        })
                    } catch (c) {
                        m.a.error("[ZLL]:VirtualFileWriterImpl.encodeFit err", c)
                    }
                }
            }
            combineArrayBuffers(e) {
                const t = e.reduce(((e,t)=>e + t.byteLength), 0)
                  , s = new Uint8Array(t);
                let i = 0;
                for (const n of e)
                    s.set(new Uint8Array(n), i),
                    i += n.byteLength;
                return s.buffer
            }
            getSessionLineId() {
                let e = this.metas.data.ss;
                const t = (this.metas.data.ss_ln + 1) % G.m.SESSION_LINE_MAX;
                return 0 === t && (e = (e + 1) % G.m.SESSION_MAX),
                this.metas.data.ss = e,
                this.metas.data.ss_ln = t,
                {
                    ss: e,
                    ss_ln: t
                }
            }
            encodeText(e) {
                const t = this.getSessionLineId();
                return Object(Z.b)(e, t).buffer
            }
            async encodeBinary(e) {
                this.BinEncoder || (this.BinEncoder = l.ModuleContainer.resolve(J.a));
                const t = await this._getModule([e.lineMeta.module, e.lineMeta.features])
                  , s = this.getSessionLineId();
                return this.BinEncoder.encode(e, t.data.id, s)
            }
            nextPage(e) {
                const t = G.d.page_limit
                  , s = G.d.file_lim
                  , i = Math.floor(s / t)
                  , n = (e.data.currentPage + 1) % i;
                return e.updateRequired = !0,
                e.data.currentPage = n,
                e.data.current = 0,
                e
            }
            async loadMeta() {
                try {
                    let e = await this.DB.Metas.get(0);
                    e || (e = ee),
                    e.startups.length > G.a && (e.startups = e.startups.slice(0, G.a)),
                    e.startups.unshift(Object(Y.a)(Date.now())),
                    e.ss = void 0 !== e.ss ? e.ss : -1,
                    e.ss_ln = -1,
                    this.metas.data = e,
                    this.metas.updateRequired = !1
                } catch (e) {
                    m.a.error(`[ZLL]: VirtualFileWriterImpl.loadMeta err ${e}`)
                }
                return await this._loadCurrentPage(),
                this.metas
            }
            async flushMetas() {
                this.metas.updateRequired && await this.DB.Metas.insert(this.metas.data, {
                    replace: !0,
                    retry: 1
                })
            }
            async loadModule() {
                try {
                    const e = await this.DB.Modules.getAll();
                    if (e) {
                        const t = e.map((e=>[X.a.decrypt(e.hash), {
                            data: e,
                            updateRequired: !1
                        }]));
                        this.module = new Map(t)
                    }
                } catch (e) {
                    m.a.error(`[ZLL]: VirtualFileWriterImpl.loadModule err ${e}`)
                }
                return this.module
            }
            async flushModules() {
                const e = Array.from(this.module.values());
                for (const t of e)
                    t.updateRequired && (await this.DB.Modules.insert(t.data, {
                        retry: 1
                    }),
                    t.updateRequired = !1)
            }
            async _loadCurrentPage() {
                this.metas || await this.loadMeta();
                const e = await this.DB.Pages.get(this.metas.data.currentPage);
                return this.currentPage = e,
                e
            }
            async _getModule(e) {
                const t = JSON.stringify(e)
                  , s = this.module.get(t);
                if (s)
                    return s;
                const i = X.a.encrypt(t)
                  , n = {
                    data: {
                        id: this.module.size,
                        hash: i
                    },
                    updateRequired: !0
                };
                return this.module.set(t, n),
                n
            }
        }
        ) || K) || K) || K;
        l.ModuleContainer.registerSingleton(q, te),
        l.ModuleContainer.registerSingleton(B.c, H);
        const se = Object(l.define)("zlog-writer-manager");
        var ie, ne = s("Y41u"), re = s("K8kB");
        let ae = Object(l.injectable)()(ie = function(e, t) {
            return Object(l.inject)(re.a)(e, void 0, 0)
        }(ie = function(e, t) {
            return Object(l.inject)(B.c)(e, void 0, 1)
        }(ie = function(e, t) {
            return Object(l.inject)(B.b)(e, void 0, 2)
        }(ie = Reflect.metadata("design:type", Function)(ie = Reflect.metadata("design:paramtypes", [void 0 === re.a ? Object : re.a, void 0 === B.c ? Object : B.c, void 0 === B.b ? Object : B.b])(ie = class {
            constructor(e, t, s) {
                this._writeScheduler = e,
                this.zlogWriter = t,
                this.senWriter = s,
                this._handleFlushRequest = ()=>{
                    this.zlogWriter.flush()
                }
                ,
                this._handleWriterStatus = e=>{}
            }
            setupWriters() {
                this.zlogWriter.init(),
                this._writeScheduler.start(),
                this._listenEvents()
            }
            _listenEvents() {
                this._writeScheduler.addEventListener(ne.c.WriteSchedulerRequestFlush, this._handleFlushRequest),
                this.zlogWriter.addEventListener(ne.c.WriterStatus, this._handleWriterStatus)
            }
        }
        ) || ie) || ie) || ie) || ie) || ie) || ie;
        l.ModuleContainer.registerSingleton(se, ae);
        var oe, le = s("OMsT"), ce = s("XS0u");
        let de = Object(l.injectable)()(oe = class {
            clientDeviceInfo() {
                return navigator.userAgent
            }
            prepareLogBlob(e) {
                return new Promise(((t,i)=>{
                    let n = e.viewerKey;
                    if (!n) {
                        n = ce.default.getLastViewKey() || "";
                        try {
                            var r;
                            n = null === (r = n) || void 0 === r ? void 0 : r.split(".")[0]
                        } catch {}
                    }
                    const a = new (s("xOOu"))
                      , o = [this.collectLDBLogs(), this.collectLDBMetas(), this.collectLDBModules()];
                    Promise.all(o).then((s=>{
                        const [r,o,l] = s;
                        {
                            const e = `${Object(p.a)()}.zlog`;
                            a.file(e, r)
                        }
                        {
                            const e = `${Object(p.a)()}.meta`;
                            a.file(e, o)
                        }
                        {
                            const e = `${Object(p.a)()}.module`;
                            a.file(e, l)
                        }
                        {
                            const e = "device.zinfo"
                              , t = new TextEncoder;
                            a.file(e, t.encode(this.clientDeviceInfo()).buffer)
                        }
                        a.generateAsync({
                            type: "arraybuffer",
                            compression: "DEFLATE"
                        }).then((s=>{
                            if (e.bareContent)
                                t({
                                    name: `zlog_${n}_${Date.now()}.zip`,
                                    data: new Uint8Array(s)
                                });
                            else {
                                const e = new Blob([new Uint8Array(s)]);
                                e.name = `zlog_${n}_${Date.now()}.zip`,
                                t(e)
                            }
                        }
                        )).catch((e=>{
                            i(e)
                        }
                        ))
                    }
                    ))
                }
                ))
            }
            async collectLDBLogs() {
                try {
                    const e = Q.a.getInstance().ZLog
                      , t = (await e.Pages.getAll()).map((e=>e.data))
                      , s = new Blob(t);
                    return await s.arrayBuffer()
                } catch (e) {
                    return m.a.error(`VirtualFileWriterImpl.getAllPagesCombine err ${e}`),
                    new ArrayBuffer(0)
                }
            }
            async collectLDBMetas() {
                try {
                    const e = Q.a.getInstance().ZLog
                      , t = await e.Metas.get(0);
                    if (t) {
                        const e = new Blob([JSON.stringify({
                            current: t.current,
                            currentPage: t.currentPage,
                            startups: t.startups
                        })]);
                        return await e.arrayBuffer()
                    }
                    return new ArrayBuffer(0)
                } catch (e) {
                    return m.a.error(`VirtualFileWriterImpl.getAllPagesCombine err ${e}`),
                    new ArrayBuffer(0)
                }
            }
            async collectLDBModules() {
                try {
                    const e = Q.a.getInstance().ZLog
                      , t = await e.Modules.getAll();
                    if (t) {
                        const e = {
                            size: 0
                        };
                        t.forEach((t=>{
                            e[t.hash] = t.id,
                            e.size++
                        }
                        ));
                        const s = new Blob([JSON.stringify(e)]);
                        return await s.arrayBuffer()
                    }
                    return new ArrayBuffer(0)
                } catch (e) {
                    return m.a.error(`VirtualFileWriterImpl.getAllPagesCombine err ${e}`),
                    new ArrayBuffer(0)
                }
            }
        }
        ) || oe;
        l.ModuleContainer.registerSingleton(le.a, de);
        s("jw3m");
        var he = s("q1tI")
          , ue = s.n(he)
          , ge = s("i8i4")
          , pe = s.n(ge)
          , me = s("Jcee");
        class fe extends me.b {
            constructor(e, t, s, i) {
                super(e, t, s),
                this.container = void 0,
                this.component = void 0,
                this.container = i.container,
                this.component = i.component
            }
            async start() {
                await super.start(),
                this.render()
            }
            render() {
                pe.a.render(ue.a.createElement(this.component), this.container)
            }
        }
        let ve, be;
        !function(e) {
            e.Idle = "Idle",
            e.Active = "Active"
        }(ve || (ve = {})),
        function(e) {
            e[e.idle = 0] = "idle",
            e[e.active = 1] = "active"
        }(be || (be = {}));
        class Ie extends k.b {
            constructor(e) {
                super(),
                this.status = be.active,
                this.window = void 0,
                this.idleDelay = void 0,
                this.minimumIdlePeriod = void 0,
                this.lastIdleTime = void 0,
                this.focusStateChangeDebounceTimer = void 0,
                this.handleDocumentBlur = ()=>{
                    this.resetFocusStateChangeDebounceTimer(),
                    this.focusStateChangeDebounceTimer = setTimeout((()=>{
                        this.setStateToIdle()
                    }
                    ), this.idleDelay)
                }
                ,
                this.handleDocumentFocus = ()=>{
                    this.resetFocusStateChangeDebounceTimer(),
                    this.setStateToActive()
                }
                ,
                this.idleDelay = e.idleDelay,
                this.minimumIdlePeriod = e.minimumIdlePeriod,
                this.window = e.window || window,
                this.lastIdleTime = 0,
                this.focusStateChangeDebounceTimer = null
            }
            start() {
                this.window.addEventListener("blur", this.handleDocumentBlur),
                this.window.addEventListener("focus", this.handleDocumentFocus)
            }
            stop() {
                this.window.removeEventListener("blur", this.handleDocumentBlur),
                this.window.removeEventListener("focus", this.handleDocumentFocus)
            }
            onIdle(e) {
                return this.addEventListener(ve.Idle, e)
            }
            setStateToActive() {
                this.status !== be.idle || (this.status = be.active,
                this.dispatchEvent(new Event(ve.Active)))
            }
            setStateToIdle() {
                if (this.status !== be.active)
                    return;
                this.isThrottlingIdleState() || (this.lastIdleTime = Date.now(),
                this.status = be.idle,
                this.dispatchEvent(new Event(ve.Idle)))
            }
            isThrottlingIdleState() {
                return Date.now() - this.lastIdleTime < this.minimumIdlePeriod
            }
            resetFocusStateChangeDebounceTimer() {
                this.focusStateChangeDebounceTimer && (clearTimeout(this.focusStateChangeDebounceTimer),
                this.focusStateChangeDebounceTimer = null)
            }
        }
        var ye = s("/MKj")
          , Ce = s("FK2X")
          , Se = s("emRR")
          , Ee = s("xrk1")
          , _e = s("ZBGy")
          , Te = s("T1Xd")
          , Le = s("uzdi");
        const Oe = Object(Le.a)();
        function Fe() {
            const e = Oe.useRecoilSnapshot();
            return Oe.setSnapShot(e),
            null
        }
        var Re = s("QVmZ")
          , we = s("72hn")
          , Me = s("ZlRg")
          , De = s("VaDh")
          , Ae = s("CzFt")
          , Pe = s("hI9i");
        const je = Object(ye.b)((function(e) {
            return {
                user: e.user,
                popup: e.popup,
                status: e.status,
                profile: e.profile,
                zaviState: e.zaviState,
                chatview: e.chatview
            }
        }
        ), (function(e) {
            const t = Object(_e.d)(e);
            return {
                emitter: Object(_e.c)(),
                dispatch: t
            }
        }
        ))(Ce.c)
          , Ne = ()=>ue.a.createElement(ye.a, {
            store: Ae.a,
            context: Ae.b
        }, ue.a.createElement(Ee.d, null, ue.a.createElement(ye.a, {
            store: Re.a,
            context: we.a
        }, ue.a.createElement(ye.a, {
            store: Se.default
        }, ue.a.createElement(ye.a, {
            store: Pe.b,
            context: Pe.a
        }, ue.a.createElement(_e.b, null, ue.a.createElement(Te.a, null, ue.a.createElement(ye.a, {
            context: De.a,
            store: Me.a
        }, ue.a.createElement(Fe, null), ue.a.createElement(je, null)))))))));
        var Be;
        let Ue = Object(l.injectable)()(Be = function(e, t) {
            return Object(l.inject)(c.a)(e, void 0, 0)
        }(Be = function(e, t) {
            return Object(l.inject)(P.ZLoggerFactory)(e, void 0, 1)
        }(Be = Reflect.metadata("design:type", Function)(Be = Reflect.metadata("design:paramtypes", [void 0 === c.a ? Object : c.a, void 0 === P.ZLoggerFactory ? Object : P.ZLoggerFactory])(Be = class extends fe {
            constructor(e, t) {
                super("zalo", e, t, {
                    component: Ne,
                    container: document.getElementById("app")
                })
            }
            async start() {
                this.setupIdleDetector(),
                await super.start()
            }
            setupIdleDetector() {
                const e = this.config.get("idle_detector")
                  , t = new Ie(e);
                t.addEventListener(ve.Idle, (()=>{
                    this.setStateToIdle()
                }
                )),
                t.addEventListener(ve.Active, (()=>this.setStateToActive())),
                t.start(),
                this.disposables.add((()=>t.stop())),
                document.hasFocus() ? this.setStateToActive() : this.setStateToIdle()
            }
        }
        ) || Be) || Be) || Be) || Be) || Be;
        l.ModuleContainer.registerSingleton(w.a, Ue);
        var ke = s("sxU/")
          , Ge = s("SZ0g");
        l.ModuleContainer.registerValue(Ge.a, new class {
            constructor() {
                this._emitter = void 0,
                this._emitter = ke.a.instance
            }
            emit(e) {
                return this._emitter.emit(e.topic, e),
                Promise.resolve()
            }
            on(e, t) {
                return this._emitter.on(e, t),
                this
            }
            off(e, t) {
                return this._emitter.off(e, t),
                this
            }
        }
        );
        s("ahRi");
        var xe = s("ptxg")
          , ze = s("pUq9");
        let Ve;
        Ve = class {
            getOverrideDomain(e) {}
            getDomainConfig() {
                return {}
            }
            setDomainConfig(e) {
                return this
            }
            subscribe(e) {
                return ()=>{}
            }
        }
        ,
        Object(l.injectable)()(Ve),
        Object(l.singleton)(xe.a)(Ve);
        var $e, qe = s("NDmK"), We = s("qLo6");
        Object(w.e)()($e = class {
            onAuthenticated(e) {
                qe.default.e2ee.enable_wasm && We.AesGcmWasmFactory.instance.installAndTestWasm().then((()=>{}
                )).catch((e=>{}
                ))
            }
        }
        );
        s("o0oJ");
        var He = s("dThN")
          , Ke = s("z0WU")
          , Qe = s("vSga");
        perf.record(perf.LOAD_APP_SCRIPT),
        function() {
            window.__loadTimer && clearTimeout(window.__loadTimer);
            window.__startTime && s("vbkW").ipcRenderer.send("load-shell-qos", Date.now() - window.__startTime)
        }();
        s("FcQj");
        var Ze = s("Ydol")
          , Je = s("97kL")
          , Xe = s("eSGF");
        let Ye;
        function et() {
            return Ye || (Ye = l.ModuleContainer.resolve(P.ZLoggerFactory).createZLogger("utils", ["event-bus-effects"])),
            Ye
        }
        const tt = {
            [Je.FetchActions.DELETE_EVERYONE]: (e,t)=>{
                st(e.toUid, e.msgId)
            }
            ,
            [Je.FetchActions.UNDO_MULTI]: (e,t)=>{
                var s;
                null == e || null === (s = e.forEach) || void 0 === s || s.call(e, (e=>st(e.toUid || e.userId, e.msgId)))
            }
            ,
            [Je.FetchActions.UNDO]: (e,t)=>{
                st(e.toUid || e.userId, e.msgId)
            }
            ,
            [Je.FetchActions.REMOVE_MEDIA]: (e,t)=>{
                for (let s of e.items)
                    st(null == e ? void 0 : e.conversationId, null == s ? void 0 : s.msgId)
            }
            ,
            [Je.ChatBoxActions.REMOVE_EXPIRED_MEDIA]: (e,t)=>{
                st(null == e ? void 0 : e.conversationId, (null == e ? void 0 : e.msgIds) || (null == e ? void 0 : e.msgId))
            }
            ,
            [Je.ChatBoxActions.DELETE_MESSAGE]: (e,t)=>{
                const s = e.toUid || e.userId || e.conversation && e.conversation.userId;
                s !== qe.default.sendToMeId && st(s, e.msgId)
            }
        };
        function st(e, t) {
            if (!e)
                return;
            if (!t)
                return;
            let s = Object(Xe.a)(t);
            ke.a.instance.emit("media-removed", {
                convId: e,
                msgIds: s
            })
        }
        Ze.default.subscribe((function(e, t) {
            let s = tt[e];
            if (s)
                try {
                    s(t, e)
                } catch (i) {
                    et().zsymb(18, 8157, 3e4, "Failed to run side effect for event:" + e),
                    et().zsymb(18, 8157, 30001, [i])
                }
        }
        ));
        var it = s("2ua2");
        s.p;
        it.a.init(),
        Ke.default.checkSupport(),
        Ke.default.showWarningMsg();
        var nt, rt = s("UiPd"), at = s("Kvb3"), ot = s("QPNp");
        Object(l.singleton)(at.a)(nt = Object(w.e)()(nt = Reflect.metadata("design:type", Function)(nt = Reflect.metadata("design:paramtypes", [])(nt = class {
            constructor() {
                this._isConnectSignalChangeInfo = void 0,
                this._ipc = void 0,
                this._dispatch = void 0,
                this._authEvent = void 0,
                this._isConnectSignalChangeInfo = !1,
                this.signalInfoChange = this.signalInfoChange.bind(this)
            }
            isWeb() {
                return !0
            }
            getIPC() {
                if (!this.isWeb()) {
                    if (!this._ipc) {
                        const {ipcRenderer: e} = s("vbkW");
                        this._ipc = e
                    }
                    return this._ipc
                }
                return null
            }
            bindDispatch(e) {
                this._dispatch = e
            }
            getDispatch() {
                return this.isWeb() ? this._dispatch : null
            }
            async preFormatPayload(e) {
                let t = Object(i.a)({}, e);
                if (t.conversation) {
                    var s, n;
                    if (null === (s = t.conversation.userId) || void 0 === s || null === (n = s.startsWith) || void 0 === n ? void 0 : n.call(s, v.GROUPID_PREFIX)) {
                        const e = t.conversation.userId
                          , s = await ot.a.GroupManager.get(e);
                        if (s && (t.conversation.topMember = s.topMembers,
                        t.conversation.displayName = s.displayName),
                        t.conversation.topMember)
                            for (const i of t.conversation.topMember) {
                                const e = rt.default.getMiniInfo(i.id);
                                e && (i.dName = e.dName,
                                i.avatar = e.avatar)
                            }
                    } else {
                        const e = rt.default.getMiniInfo(t.conversation.userId);
                        e && (t.conversation.displayName = e.dName,
                        t.conversation.avatar = e.avatar)
                    }
                }
                return t
            }
            signalInfoChange(e) {
                if (!this.isWeb()) {
                    const t = this.getIPC();
                    t && t.send("update-info-photo-viewer", e)
                }
            }
            connectSignalToFriendWorker() {
                this._isConnectSignalChangeInfo || (this._isConnectSignalChangeInfo = !0,
                rt.default.connectSignalChangeDNameAndAvatar(this.signalInfoChange))
            }
            onAuthenticated(e) {
                this._authEvent = e
            }
            _addSession(e) {
                var t;
                return (e = Object(i.a)({}, e)).session = null === (t = this._authEvent) || void 0 === t ? void 0 : t.getSession(),
                e
            }
            async openPhotoViewer(e) {
                let t = await this.preFormatPayload(e);
                if (t = this._addSession(t),
                this.connectSignalToFriendWorker(),
                this.isWeb()) {
                    const e = this.getDispatch();
                    return void (e && e({
                        type: Je.ChatBoxActions.SHOW_FULL_IMAGE,
                        payload: t
                    }))
                }
                const s = this.getIPC();
                s && s.send("photo-viewer", t)
            }
        }
        ) || nt) || nt) || nt);
        var lt, ct = s("vQ8b"), dt = s("smi1"), ht = s("gEkt"), ut = s("yzMR");
        let gt = Object(l.injectable)()(lt = function(e, t) {
            return l.ModuleContainer.inject(ut.i)(e, void 0, 0)
        }(lt = function(e, t) {
            return l.ModuleContainer.inject(ut.h)(e, void 0, 1)
        }(lt = Reflect.metadata("design:type", Function)(lt = Reflect.metadata("design:paramtypes", [void 0 === ut.i ? Object : ut.i, void 0 === ut.h ? Object : ut.h])(lt = class {
            constructor(e, t) {
                this.unreadDataManager = e,
                this.previewManager = t,
                this.menuRef = void 0,
                this.menuRef = {}
            }
            deleteConversation(e, t) {
                void 0 === t && (t = !0),
                e != v.CONV_FILTER.STRANGER && (Ke.default.logCoreError(`[user call del conv] ${e}`),
                dt.a.deleteConversation(e, t).then((e=>{
                    e && e.delConversationId && Object(_e.f)({
                        type: Je.ConversationListActions.TAG_CONV,
                        payload: {
                            data: [{
                                userId: e.delConversationId,
                                label: null
                            }]
                        }
                    })
                }
                )).catch((e=>{
                    Ke.default.logCoreError("Delete conversation fail - " + JSON.stringify(e))
                }
                )))
            }
            bindUIMenu(e, t) {
                this.menuRef[e] = t
            }
            cleanUpUIMenu(e) {
                this.menuRef[e] = null
            }
            showMenu(e, t, s) {
                if (this.menuRef[e] && e === ht.b)
                    this.showConvActionMenu(t, s)
            }
            hideMenu(e) {
                this.menuRef[e] && this.menuRef[e].close()
            }
            showConvActionMenu(e, t) {
                if (t && t.friendItem)
                    return;
                const s = Object(i.a)({}, t)
                  , n = s.userId;
                if (s && !Ke.default.isFakeId(n)) {
                    const e = this.previewManager.getPreviewByIDSync(n)
                      , t = rt.default.getProfileFriendByIdSync(n) || {}
                      , i = this.unreadDataManager.getUnreadByConvIdSync(n);
                    s.lastMessage = null == e ? void 0 : e.message,
                    s.isFr = t.isFr,
                    s.type = t.type,
                    s.unreadMark = null == i ? void 0 : i.unreadMark,
                    s.smsUnreadCount = null == i ? void 0 : i.smsUnreadCount
                }
                this.menuRef[ht.b].updateTargetInfo(s),
                this.menuRef[ht.b].showAction(Object(i.a)({}, e))
            }
        }
        ) || lt) || lt) || lt) || lt) || lt;
        var pt, mt = s("rCQs"), ft = s("iZzu"), vt = s("Yi2m"), bt = s("6Vk1"), It = s("RojW"), yt = s("rXIX"), Ct = s("EFQ6"), St = s("3xbP"), Et = s("l+Gc"), _t = s("h0sc"), Tt = s("VTLO"), Lt = s("LJTV"), Ot = s("Enw1"), Ft = s("PoHQ"), Rt = s("M7kw"), wt = s("Ws4b"), Mt = s("6uTC"), Dt = s("c51z"), At = s("Ja3U"), Pt = s("SdS7"), jt = s("WQAo"), Nt = s("Gm1y"), Bt = s("P6UB"), Ut = s("FEfs"), kt = s("h0S/");
        const Gt = {
            typeFilter: ft.FilterType.ALL,
            labelFilters: [],
            loaded: !1,
            isEnableArchivedChat: !!Ut.a.isEnableArchivedChat(),
            hasUnreadArchivedChat: !1,
            typeFilterSrc: ft.FilterSrcType.ALL
        }
          , xt = "z_sendtome_bubbledot";
        Object(mt.b)(ft.ConvListController)(pt = function(e, t) {
            return l.ModuleContainer.inject(ut.b)(e, void 0, 0)
        }(pt = function(e, t) {
            return l.ModuleContainer.inject(bt.b)(e, void 0, 1)
        }(pt = function(e, t) {
            return l.ModuleContainer.inject(ut.i)(e, void 0, 2)
        }(pt = function(e, t) {
            return l.ModuleContainer.inject(ut.f)(e, void 0, 3)
        }(pt = function(e, t) {
            return l.ModuleContainer.inject(ut.g)(e, void 0, 4)
        }(pt = function(e, t) {
            return l.ModuleContainer.inject(ut.a)(e, void 0, 5)
        }(pt = Reflect.metadata("design:type", Function)(pt = Reflect.metadata("design:paramtypes", [void 0 === ut.b ? Object : ut.b, void 0 === bt.b ? Object : bt.b, void 0 === ut.i ? Object : ut.i, void 0 === ut.f ? Object : ut.f, void 0 === ut.g ? Object : ut.g, void 0 === ut.a ? Object : ut.a])(pt = class extends k.b {
            constructor(e, t, s, i, n, r) {
                var a;
                super(),
                a = this,
                this.convDataManager = e,
                this.labelDataManager = t,
                this.unreadDataManager = s,
                this.muteDataManager = i,
                this.pinDataManager = n,
                this.archivedChatManager = r,
                this.typeFilter = void 0,
                this.labelFilters = void 0,
                this.listRawAll = void 0,
                this.listVisible = void 0,
                this.listStrangers = void 0,
                this.listHiddens = void 0,
                this.listFiltered = void 0,
                this.newestStrangerId = void 0,
                this.menuRef = void 0,
                this.convUIListContainer = void 0,
                this.showedOnboarding = void 0,
                this.loaded = void 0,
                this.isEnableArchivedChat = void 0,
                this.typeFilterSrc = void 0,
                this.hasUnreadArchivedChat = void 0,
                this._logger = void 0,
                this._pm = null,
                this._sbc = null,
                this.handleMuteChange = e=>{
                    const t = e.convId
                      , s = e.payload
                      , i = this.listFiltered.includes(t);
                    this.logger.zsymb(0, 10235, 30002, "handleMuteChange", t, i, this.typeFilter, s),
                    i && (this.typeFilter === ft.FilterType.UNREAD || this.isEnableArchivedChat && this.typeFilterSrc === ft.FilterSrcType.UNREAD) && this.addConvToUnreadFilterV2(t)
                }
                ,
                this.deleteConversation = function(e, t) {
                    void 0 === t && (t = !0),
                    e != v.CONV_FILTER.STRANGER && (a.logger.zsymb(18, 10235, 30006, `[user call del conv] ${e}`),
                    dt.a.deleteConversation(e, t).then((e=>{
                        e && e.delConversationId && Object(_e.f)({
                            type: Je.ConversationListActions.TAG_CONV,
                            payload: {
                                data: [{
                                    userId: e.delConversationId,
                                    label: null
                                }]
                            }
                        })
                    }
                    )).catch((e=>{
                        a.logger.zsymb(18, 10235, 30007, "Delete conversation fail - " + JSON.stringify(e))
                    }
                    )))
                }
                ,
                this.name = ft.CONV_LIST_CONTROLLER,
                this.data = new Map,
                this.key = "windowId",
                this.isEnableArchivedChat = !1,
                this.typeFilter = ft.FilterType.ALL,
                this.labelFilters = [],
                this.typeFilterSrc = ft.FilterSrcType.ALL,
                this.listRawAll = new Set,
                this.listVisible = [],
                this.listStrangers = [],
                this.listHiddens = [],
                this.listFiltered = [],
                this.newestStrangerId = "",
                this.menuRef = {},
                this.showedOnboarding = !1,
                this.loaded = !1,
                this.hasUnreadArchivedChat = !1,
                this.getRecentContactWithId = this.getRecentContactWithId.bind(this),
                this.selectConversation = this.selectConversation.bind(this),
                this.showBroadCastMsgModal = this.showBroadCastMsgModal.bind(this),
                this.markAsRead = this.markAsRead.bind(this),
                this.addListener()
            }
            get logger() {
                return this._logger || (this._logger = l.ModuleContainer.resolve(P.ZLoggerFactory).createZLogger(kt.b.conversation, [kt.b.convList])),
                this._logger
            }
            get previewManager() {
                return this._pm || (this._pm = l.ModuleContainer.resolve(ut.h)),
                this._pm
            }
            get sidebarController() {
                return this._sbc || (this._sbc = l.ModuleContainer.resolve(ft.SidebarController)),
                this._sbc
            }
            get currUser() {
                return Object(wt.c)()
            }
            onTypeFilterChange(e, t) {
                if (e === ft.FilterType.UNREAD) {
                    const e = this.labelFilters.length > 0 ? 1453215 : 1453214;
                    vt.e.logAction(e),
                    setTimeout((()=>{
                        this.scrollToTop(!1)
                    }
                    ))
                } else
                    e !== ft.FilterType.ARCHIVED && e !== ft.FilterType.FOCUSED || this.typeFilter === e || setTimeout((()=>{
                        this.scrollToTop(!1)
                    }
                    ));
                e == ft.FilterType.ARCHIVED && this.hasUnreadArchivedChat && (this.hasUnreadArchivedChat = !1),
                this.applyTypeFilter(e, t)
            }
            onLabelFilterChange(e) {
                this.typeFilter === ft.FilterType.UNREAD && setTimeout((()=>{
                    this.scrollToTop(!1)
                }
                )),
                this.applyLabelFilter(e)
            }
            rerenderList() {
                this.signalRenderList()
            }
            async onPreviewChange(e, t) {
                if (!e || !t)
                    return;
                const s = e.convId;
                if (this.listRawAll.add(s),
                Ct.a.isThreadHidden(s))
                    return void this.listHiddens.push(s);
                let i = s
                  , n = !1
                  , r = !1
                  , a = !1;
                if (await It.a.isOATypeAsync(s)) {
                    const e = this.convDataManager.getConvByIdSync(s);
                    if (!e || !It.a.popoutOA(e))
                        return
                } else if (It.a.isStrangerV2(s) && (n = !0,
                this.listStrangers.includes(s) || (this.logger.zsymb(0, 10235, 30001, `first new stranger msg ${s}`),
                this.listStrangers.push(s)),
                !this.isMeBAAccount())) {
                    const t = "0" == e.fromUid || this.convDataManager.isRespondedByMeSync(s)
                      , n = this.listVisible.includes(s);
                    t || (n && (a = !0,
                    this.listVisible = this.listVisible.filter((e=>e !== s))),
                    this.updateNewestStrangerId(this.listStrangers),
                    i = v.CONV_FILTER.STRANGER),
                    t && !n && (r = !0,
                    this.listVisible.unshift(s),
                    this.newestStrangerId === s && this.updateNewestStrangerId(this.listStrangers))
                }
                const [o,l] = It.a.insertToProperPosition(this.listVisible, i, this.getAlterId());
                this.listVisible = o;
                const c = Et.b.getLabelObjByConversaionId(s)
                  , d = c && c.id && this.labelFilters.includes("" + c.id)
                  , h = n && this.labelFilters.includes(ht.h)
                  , u = d || h
                  , g = l || r || a;
                if (this.typeFilter === ft.FilterType.ALL)
                    this.addTabAllFiltered(s, u, g);
                else if (this.typeFilter === ft.FilterType.UNREAD)
                    this.addTabUnreadFiltered(s, u, n);
                else if (this.typeFilter === ft.FilterType.STRANGER) {
                    const e = d || !this.labelFilters.length
                      , t = n && e;
                    this.addTabStrangerFiltered(s, t)
                } else
                    this.isEnableArchivedChat && (this.listFiltered = this.genListArchivedChat(this.listVisible, this.typeFilter === ft.FilterType.ARCHIVED, this.labelFilters),
                    this.signalRenderList())
            }
            addTabAllFiltered(e, t, s) {
                if (t) {
                    const [t,s] = It.a.insertToProperPosition(this.listFiltered, e, this.getAlterId());
                    s && (this.listFiltered = t,
                    this.signalRenderList())
                } else
                    s && this.signalRenderList()
            }
            addTabUnreadFiltered(e, t, s) {
                if (this.listFiltered.includes(e) || !Bt.b.isMyMessage(this.previewManager.getPreviewByIDSync(e)))
                    if (t)
                        this.addConvToUnreadFilterV2(e);
                    else {
                        if (this.labelFilters.length)
                            return;
                        this.isMeBAAccount() || !s ? this.addConvToUnreadFilterV2(e) : this.addConvToUnreadFilterV2(v.CONV_FILTER.STRANGER)
                    }
            }
            addTabStrangerFiltered(e, t) {
                if (!t)
                    return;
                const [s,i] = It.a.insertToProperPosition(this.listFiltered, e, this.getAlterId());
                i && (this.listFiltered = s,
                this.signalRenderList())
            }
            addConvToUnreadFilterV2(e) {
                if (this.muteDataManager.isMuted(e) && !It.a.getPinFromConvId(e))
                    this.listFiltered = this.safeSortConvList(this.listFiltered, !0),
                    this.signalRenderList();
                else {
                    const [t,s] = It.a.insertToProperPosition(this.listFiltered, e, this.getAlterId());
                    s && (this.listFiltered = t,
                    this.signalRenderList())
                }
            }
            onPinChange(e) {
                let t = !1;
                for (let s = 0; s < e.length; s++) {
                    const i = e[s].priority
                      , n = e[s].id;
                    i ? (this.onPreviewChange({
                        convId: n
                    }, []),
                    t = !1) : (t = !0,
                    (!this.previewManager.getPreviewByIDSync(n) || !this.convDataManager.isRespondedByMeSync(n) && It.a.isStrangerV2(n)) && (this.listVisible = this.listVisible.filter((e=>e !== n))))
                }
                t && (this.listVisible = this.safeSortConvList(this.listVisible, !1),
                (this.typeFilter !== ft.FilterType.ALL || this.labelFilters.length) && (this.listFiltered = It.a.sortConvId(this.listFiltered, this.typeFilter === ft.FilterType.UNREAD, !0))),
                this.signalRenderList()
            }
            onHiddenChat(e, t) {
                const s = this.convDataManager.getConvByIdSync(e);
                if (this.logger.zsymb(0, 10235, 30003, "onHiddenChat ", e, t, !!s),
                t)
                    this.listHiddens.push(e),
                    this.listVisible = this.listVisible.filter((t=>t !== e)),
                    this.listFiltered = this.listFiltered.filter((t=>t !== e)),
                    this.signalRenderList();
                else {
                    if (!s && !ot.a.PinDataManager.isPinned(e))
                        return;
                    if (this.listHiddens = this.listHiddens.filter((t=>t !== e)),
                    this.isMeBAAccount() || !It.a.isStrangerV2(e) || this.listStrangers.includes(e)) {
                        const [t,s] = It.a.insertToProperPosition(this.listVisible, e, this.getAlterId());
                        this.listVisible = t
                    } else
                        this.listStrangers.push(e);
                    if (this.listFiltered) {
                        const [t,s] = It.a.insertToProperPosition(this.listFiltered, e, this.getAlterId());
                        this.listFiltered = t,
                        this.isEnableArchivedChat && (this.listFiltered = this.genListArchivedChat(this.listVisible, this.typeFilter === ft.FilterType.ARCHIVED, this.labelFilters))
                    }
                }
                this.signalRenderList()
            }
            getCurrentFilter() {
                return {
                    type: this.typeFilter,
                    labels: this.labelFilters
                }
            }
            getRecentContacts() {
                const e = [];
                return this.listRawAll.forEach((t=>{
                    const s = this.convDataManager.getConvByIdSync(t);
                    s && e.push(s)
                }
                )),
                e
            }
            getRecentContactWithId(e) {
                if (this.listRawAll.has(e)) {
                    return this.convDataManager.getConvByIdSync(e) || null
                }
                return null
            }
            addConvToLabel(e, t) {
                let s = Et.b.getItem(t);
                _t.ModalManagerV2.openModal({
                    windowId: St.c,
                    name: v.ModalIdentitiesDefine.MANAGE_LABEL,
                    params: {
                        view: Tt.b.ADD_CONVERSATION,
                        info: s
                    }
                }),
                e && (e.preventDefault(),
                e.stopPropagation()),
                vt.e.logAction(14521)
            }
            selectConversation(e) {
                if (Lt.b.startPerf(Lt.a),
                e.userId === v.CONV_FILTER.MEDIA)
                    return void this.logger.zsymb(18, 10235, 30004, "No handler for mediabox. This feat disable!!!");
                if (e.userId === v.CONV_FILTER.STRANGER)
                    return void (2 == Number(ce.default.getConvUXVersion()) ? this.applyTypeFilter(ft.FilterType.STRANGER) : this.labelDataManager.onSelectLabel(ht.h));
                const t = this.sidebarController.getState(St.c).selectedId;
                e.userId === t && e.userId !== v.FAKE_CONVERSATION_ID.FRIEND_CENTER ? Object(_e.f)({
                    type: Je.ConversationListActions.SELECT_CONV_MINOR,
                    payload: e
                }) : (this.convUIListContainer && this.convUIListContainer.focus(),
                e.userId === qe.default.sendToMeId && (Ot.g.getFlagForCurrentUser(this.currUser.userId, xt) || (Ft.p.getHasShownSendToMeTip() ? Ot.g.setFlagForCurrentUser(this.currUser.userId, xt, 1) : setTimeout((()=>{
                    Ze.default.send(Je.ConversationListActions.SHOW_BUBBLE_DOT),
                    Ft.p.setHasShownSendToMeTip(!0)
                }
                ), 144e5)),
                Rt.b.getCurrentStepKey() !== Rt.a.UPLOAD_IMAGES || this.showedOnboarding || (Rt.b.show(),
                this.showedOnboarding = !0),
                vt.e.logAction(13901)),
                e.userId === v.FAKE_CONVERSATION_ID.FRIEND_CENTER ? Object(_e.f)({
                    type: Je.SideBarActions.SELECT_FRIEND_CENTER,
                    payload: Object(i.a)({}, e)
                }) : l.ModuleContainer.resolve(jt.b).openConversation(e.userId, jt.c.fromConvItem(e))),
                this.logActionSelectConv(e.userId)
            }
            showBroadCastMsgModal() {
                var e;
                if (!ce.default.checkBroadcastTime())
                    return void Mt.a.createError(Dt.default.str("STR_BROADCAST_OVER_LIMIT_TIP"));
                let t = !0;
                1 === this.labelFilters.length && (t = Et.b.getItem(this.labelFilters[0]) || !0),
                null !== (e = qe.default.broadcast_resend_config) && void 0 !== e && e.enable ? _t.ModalManagerV2.openModal({
                    windowId: St.c,
                    name: v.ModalIdentitiesDefine.BROADCAST_RESEND,
                    params: t
                }) : _t.ModalManagerV2.openModal({
                    windowId: St.c,
                    name: v.ModalIdentitiesDefine.BROADCAST_COMPSE,
                    params: {
                        label: t
                    }
                }),
                vt.e.logAction(1453102)
            }
            markAsRead(e, t) {
                void 0 === t && (t = null),
                e && (e.preventDefault(),
                e.stopPropagation()),
                vt.e.logAction(164),
                ce.default.isShowMarkAsReadAgain() ? At.a.openConfirm({
                    windowId: St.c,
                    name: v.MODAL_CONFIRM.confirmIdentities,
                    params: {
                        message: Dt.default.str("STR_MARK_READ_CONFIRM_TEXT"),
                        okText: Dt.default.str("STR_CONFIRM"),
                        okType: "primary",
                        cancelText: Dt.default.str("STR_LOGOUT_NO"),
                        onOk: e=>{
                            ce.default.setShowMarkAsReadAgain(!(e && e.dont_show_mark_as_read)),
                            this.markConvsAsRead(t)
                        }
                        ,
                        options: [{
                            default_val: !1,
                            key: "dont_show_mark_as_read",
                            title: "STR_DONT_SHOW_AGAIN"
                        }]
                    }
                }) : this.markConvsAsRead(t)
            }
            scrollToTop(e) {
                const t = Pt.b.instance().getConvList();
                t && t.scrollToTop(e)
            }
            scrollToConv(e) {
                const t = Pt.b.instance().getConvList();
                t && t.scrollToConversation(e)
            }
            openInNewWindow(e, t) {
                if (!e || !e.userId)
                    return;
                const s = this.menuRef[ht.b];
                s && s.openInNewWindow && (s.updateTargetInfo(e),
                s.openInNewWindow(t))
            }
            getStrangerInfo() {
                let e = "";
                if (this.newestStrangerId) {
                    const t = this.previewManager.getPreviewByIDSync(this.newestStrangerId);
                    e = t ? t.messageTime : ""
                }
                return this.logger.zsymb(0, 10235, 30005, "getStrangerInfo ", this.newestStrangerId, e),
                {
                    messageTime: e
                }
            }
            getTopMostConv() {
                return this.typeFilter !== ft.FilterType.ALL || this.labelFilters.length ? this.listFiltered[0] : this.listVisible[0]
            }
            addListener() {
                setTimeout((()=>{
                    this.labelDataManager.addEventListener(bt.d.SelectedLabelChange, (e=>{
                        this.onLabelFilterChange(e.payload)
                    }
                    )),
                    this.labelDataManager.addEventListener(bt.d.LabelAddConvs, (e=>{
                        this.onLabelChangeConvs(e.payload.labelId, e.payload.convIds, "add")
                    }
                    )),
                    this.labelDataManager.addEventListener(bt.d.LabelRemoveConvs, (e=>{
                        this.onLabelChangeConvs(e.payload.labelId, e.payload.convIds, "remove")
                    }
                    ));
                    const e = l.ModuleContainer.resolve(ut.h);
                    e.addEventListener(yt.b.DoneLoadPreview, (e=>{
                        this.onLoadPreview(e.payload)
                    }
                    )),
                    e.addEventListener(yt.b.DoneMigratePreview, (()=>{
                        this.onMigratedPreview()
                    }
                    )),
                    e.addEventListener(yt.b.PreviewChanged, (e=>{
                        const {changedItem: t, all: s} = e.payload;
                        this.onPreviewChange(t, s)
                    }
                    )),
                    e.addEventListener(yt.b.DraftChanged, (e=>{}
                    )),
                    this.convDataManager.addEventListener(yt.b.DeleteConv, (e=>{
                        this.moveConvOutConvList(e.convId)
                    }
                    )),
                    this.convDataManager.addEventListener(yt.b.EmptyConv, (e=>{
                        this.moveConvOutConvList(e.convId)
                    }
                    )),
                    this.convDataManager.addEventListener(yt.b.LeaveGroup, (e=>{
                        this.moveConvOutConvList(e.convId)
                    }
                    )),
                    this.pinDataManager.addEventListener(yt.b.ChangePinConv, (e=>{
                        this.onPinChange(e.payload)
                    }
                    )),
                    this.archivedChatManager.addEventListener(yt.b.UpdateListArchivedChat, (e=>{
                        this.updateListArchivedChat()
                    }
                    )),
                    this.archivedChatManager.addEventListener(yt.b.OnOffArchivedChat, (e=>{
                        this.onOffArchivedChat(e.payload.status)
                    }
                    )),
                    this.unreadDataManager.addEventListener(yt.b.ChangeUnreadArchiveChat, (e=>{
                        this.updateUnreadArchivedChat(e.payload.hasUnreadArchivedChat)
                    }
                    )),
                    this.muteDataManager.addEventListener(yt.b.MuteChanged, this.handleMuteChange),
                    rt.default.subscribeEventFriend(v.EventFriend.ADD_FRIEND, (e=>{
                        let {userId: t} = e
                          , s = 0;
                        this.listStrangers.includes(t) && (s++,
                        this.listStrangers = this.listStrangers.filter((e=>e !== t)),
                        t == this.newestStrangerId && (s++,
                        this.updateNewestStrangerId(this.listStrangers))),
                        this.logger.zsymb(0, 10235, 30008, `on add friend ${t} ${s}`)
                    }
                    )),
                    rt.default.subscribeEventFriend(v.EventFriend.REMOVE_FRIEND, (e=>{
                        let {userId: t} = e
                          , s = 0;
                        !this.listStrangers.includes(t) && this.listVisible.some((e=>e === t)) && (s++,
                        this.listStrangers.push(t)),
                        this.logger.zsymb(0, 10235, 30009, `on remove friend ${t} ${s}`)
                    }
                    )),
                    rt.default.subscribeEventFriend(v.EventFriend.DOWNGRADE_BIZ_PROFILE, (()=>{
                        this.handleUserPackageChange()
                    }
                    )),
                    rt.default.subscribeEventFriend(v.EventFriend.UPGRADE_BIZ_PROFILE, (()=>{
                        this.handleUserPackageChange()
                    }
                    ))
                }
                ), 0)
            }
            addToListFiltered(e, t) {
                void 0 === t && (t = !1),
                e.forEach((e=>{
                    if (t) {
                        const t = this.unreadDataManager.getUnreadByConvIdSync(e);
                        if (!t || !t.smsUnreadCount && !t.unreadMark)
                            return
                    }
                    const [s] = It.a.insertToProperPosition(this.listFiltered, e);
                    this.listFiltered = s
                }
                ))
            }
            applyTypeFilter(e, t) {
                if (void 0 === t && (t = !1),
                this.typeFilter === e && !t)
                    return;
                this.logger.zsymb(0, 10235, 30010, "applyTypeFilter ", e, t);
                const s = this.typeFilter;
                switch (this.typeFilter = e,
                e) {
                case ft.FilterType.ALL:
                    if (0 !== this.labelFilters.length) {
                        if (this.listFiltered = It.a.filterByLabel(this.listVisible, this.labelFilters),
                        this.labelFilters.includes(ht.h)) {
                            let e = this.listStrangers;
                            this.showStrangerNROnly() && (e = It.a.filterByResponsed(e, !1)),
                            this.addToListFiltered(e)
                        } else
                            this.doAddStrangerHasLabel(this.listFiltered, this.labelFilters);
                        this.addLikeConvToFilterListV2(this.listFiltered, this.labelFilters)
                    }
                    break;
                case ft.FilterType.UNREAD:
                    if (0 !== this.labelFilters.length) {
                        const e = s == ft.FilterType.ALL ? this.listFiltered : this.listVisible;
                        this.listFiltered = It.a.filterByLabel(e, this.labelFilters),
                        this.labelFilters.includes(ht.h) ? this.addToListFiltered(this.listStrangers) : this.doAddStrangerHasLabel(this.listFiltered, this.labelFilters),
                        this.listFiltered = It.a.filterByUnread(this.listFiltered),
                        this.listFiltered = It.a.sortConvId(this.listFiltered, !0, !0)
                    } else
                        this.listFiltered = It.a.filterByUnread(this.listVisible),
                        this.listFiltered = this.safeSortConvList(this.listFiltered);
                    break;
                case ft.FilterType.STRANGER:
                    this.listFiltered = It.a.filterByLabel(this.listStrangers, this.labelFilters),
                    this.listFiltered = It.a.sortConvId(this.listFiltered, !1, !0),
                    this.showStrangerNROnly() && (this.listFiltered = It.a.filterByResponsed(this.listFiltered, !1));
                    break;
                case ft.FilterType.FOCUSED:
                    this.listFiltered = this.genListArchivedChat(this.listVisible, !1, this.labelFilters);
                    break;
                case ft.FilterType.ARCHIVED:
                    this.listFiltered = this.genListArchivedChat(this.listVisible, !0, this.labelFilters)
                }
                this.signalRenderState(),
                this.signalRenderList()
            }
            applyLabelFilter(e) {
                if (this.labelFilters !== e) {
                    switch (this.logger.zsymb(0, 10235, 30011, "applyLabelFilter ", e.join("-")),
                    this.labelFilters = e.map((e=>"" + e)),
                    this.typeFilter) {
                    case ft.FilterType.ALL:
                        if (this.listFiltered = It.a.filterByLabel(this.listVisible, this.labelFilters),
                        this.doAddStrangerHasLabel(this.listFiltered, this.labelFilters),
                        this.addLikeConvToFilterListV2(this.listFiltered, e),
                        this.labelFilters.some((e=>e == ht.h))) {
                            let e = this.listStrangers;
                            this.showStrangerNROnly() && (e = It.a.filterByResponsed(e, !1)),
                            this.addToListFiltered(e)
                        }
                        break;
                    case ft.FilterType.UNREAD:
                        if (this.listFiltered = It.a.filterByLabel(this.listVisible, e),
                        this.doAddStrangerHasLabel(this.listFiltered, this.labelFilters),
                        this.labelFilters.some((e=>e == ht.h))) {
                            let e = this.listStrangers;
                            this.showStrangerNROnly() && (e = It.a.filterByResponsed(e, !1)),
                            this.addToListFiltered(e)
                        }
                        this.listFiltered = It.a.filterByUnread(this.listFiltered),
                        this.listFiltered = this.safeSortConvList(this.listFiltered);
                        break;
                    case ft.FilterType.STRANGER:
                        this.listFiltered = It.a.filterByLabel(this.listStrangers, this.labelFilters),
                        this.listFiltered = It.a.sortConvId(this.listFiltered, !1, !0),
                        this.showStrangerNROnly() && (this.listFiltered = It.a.filterByResponsed(this.listFiltered, !1));
                        break;
                    case ft.FilterType.FOCUSED:
                        this.listFiltered = this.genListArchivedChat(this.listVisible, !1, e);
                        break;
                    case ft.FilterType.ARCHIVED:
                        this.listFiltered = this.genListArchivedChat(this.listVisible, !0, e)
                    }
                    this.signalRenderState(),
                    this.signalRenderList()
                }
            }
            showStrangerNROnly() {
                return !this.isMeBAAccount()
            }
            isMeBAAccount() {
                const e = rt.default.isMeBAAccount();
                return this.logger.zsymb(0, 10235, 30012, "isMeBAAccount ", e),
                e
            }
            doAddStrangerHasLabel(e, t) {
                if (t.length) {
                    const s = It.a.filterByLabel(this.listStrangers, t);
                    if (s.length) {
                        const t = new Set(s);
                        for (let s = 0; s < e.length; s++)
                            t.has(e[s]) && t.delete(e[s]);
                        this.addToListFiltered(t)
                    }
                }
                return e
            }
            isConvExists(e) {
                const t = this.convDataManager.getConvByIdSync(e);
                return !!(null != t && t.firstSmsLocalId || null != t && t.lastSmsLocalId)
            }
            safeSortConvList(e, t) {
                void 0 === t && (t = !0);
                const s = e.indexOf(v.CONV_FILTER.STRANGER);
                if (-1 !== s) {
                    e[s] = this.newestStrangerId;
                    const i = (e = It.a.sortConvId(e, t, !0)).indexOf(this.newestStrangerId);
                    e[i] = v.CONV_FILTER.STRANGER
                } else
                    e = It.a.sortConvId(e, t, !0);
                return e
            }
            isValidFakeConv(e, t, s) {
                if (e.some((e=>e == s)) || Ct.a.isThreadHidden(s))
                    return !1;
                const i = Et.b.getLabelObjByConversaionId(s);
                return !(!i || !t.some((e=>e == i.id)))
            }
            isValidFakeConvV2(e, t) {
                if (!t || e.some((e=>e == t)) || Ct.a.isThreadHidden(t))
                    return !1;
                return !(t && t.startsWith(v.GROUPID_PREFIX)) || !!Nt.default.getGroupByIdSync(t)
            }
            addLikeConvToFilterListV2(e, t) {
                if (t.length && this.typeFilter !== ft.FilterType.UNREAD) {
                    this.logger.zsymb(0, 10235, 30013, "addLikeConvToFilterListV2 ", t);
                    for (const s of t) {
                        const t = this.labelDataManager.getLabelById(s);
                        if (t && t.conversations)
                            for (const s of t.conversations)
                                this.isValidFakeConvV2(e, s) && e.push(s)
                    }
                }
            }
            markConvsAsRead(e) {
                const t = []
                  , s = 0 === this.labelFilters.length;
                this.logger.zsymb(0, 10235, 30014, `markConvsAsRead #1  ${null == e ? void 0 : e.join("-")}`),
                this.listRawAll.forEach((i=>{
                    const n = this.unreadDataManager.getUnreadByConvIdSync(i);
                    if (n && (n.smsUnreadCount > 0 || n.unreadMark)) {
                        if (this.logger.zsymb(0, 10235, 30015, `markConvsAsRead #2, ${i}, ${n.smsUnreadCount}`),
                        e && !e.hasOwnProperty(i) || i === v.FAKE_CONVERSATION_ID.FRIEND_CENTER)
                            return;
                        const r = Et.b.getLabelObjByConversaionId(i) || {}
                          , a = this.convDataManager.getConvByIdSync(i) || {
                            userId: i
                        };
                        (s || this.labelFilters.some((e=>e == r.id)) || It.a.isInStrangerBoxV2(i) && this.typeFilter === ft.FilterType.STRANGER) && t.push(a)
                    }
                }
                )),
                this.logger.zsymb(0, 10235, 30016, `markConvsAsRead #3 ${t.length} ${t.map((e=>e.userId)).join("-")}`),
                t.length > 0 && (Ze.default.send(Je.SideBarActions.MARK_AS_READ, {
                    conversations: t
                }),
                vt.e.logAction(1453304))
            }
            onLoadPreview(e) {
                this.logger.zsymb(0, 10235, 30017, `onload Preview 1: ${this.listRawAll.size}`);
                let t = e.map((e=>e.convId));
                const s = ce.default.getConvUXVersion();
                this.isEnableArchivedChat = !!Ut.a.isEnableArchivedChat() && "3" == s,
                this.typeFilter = this.isEnableArchivedChat ? ft.FilterType.FOCUSED : ft.FilterType.ALL,
                this.listRawAll.size && this.listRawAll.forEach((e=>{
                    t.some((t=>t === e)) || t.push(e)
                }
                )),
                this.listRawAll = new Set(t);
                const i = qe.default.sendToMeId;
                this.listRawAll.has(i) || (t.push(i),
                this.listRawAll.add(i)),
                this.logger.zsymb(0, 10235, 30018, `onload Preview 2: ${t.length}`),
                It.a.groupConversaion(t).then((e=>{
                    if (this.logger.zsymb(0, 10235, 30019, `grouped list #1: \n\t\t\t\t${e.hidden.length}\n\t\t\t\t- ${e.stranger.length}\n\t\t\t\t- ${e.outdate.length}\n\t\t\t\t- ${e.visible.length}\n\t\t\t`),
                    qe.default.stagingAccount)
                        for (const i in e)
                            this.logger.zsymb(0, 10235, 30020, `${i}: ${e[i]}`);
                    this.listStrangers = e.stranger,
                    this.listHiddens = e.hidden;
                    const t = this.addStrangersToVisible(e.visible, this.listStrangers);
                    let s = t;
                    if (this.listVisible.length) {
                        this.logger.zsymb(0, 10235, 30021, `preview changed while group csc #1: ${this.listVisible}`),
                        s = this.listVisible;
                        const e = new Set(this.listVisible);
                        t.forEach((t=>{
                            e.has(t) || s.push(t)
                        }
                        ))
                    }
                    this.listVisible = this.safeSortConvList(s, !1),
                    this.initMyCloud(),
                    this.isEnableArchivedChat && (this.listFiltered = this.genListArchivedChat(this.listVisible, this.typeFilter === ft.FilterType.ARCHIVED, this.labelFilters)),
                    this.logger.zsymb(0, 10235, 30022, `visible sorted #1: ${this.listVisible}`),
                    this.loaded = !0,
                    this.signalRenderList(),
                    this.signalRenderState(),
                    this.dispatchEvent(new yt.a(yt.c.LoadPreviewDone,"",this.listVisible.slice()))
                }
                ))
            }
            onMigratedPreview() {
                this.logger.zsymb(0, 10235, 30023, `onMigratedPreview #1: ${this.listVisible}`);
                const e = ce.default.getConvUXVersion();
                this.isEnableArchivedChat = !!Ut.a.isEnableArchivedChat() && "3" == e;
                const t = qe.default.sendToMeId;
                this.listRawAll.has(t) || this.initMyCloud(),
                this.convDataManager.getConvByIdSync(t) && !this.listVisible.includes(t) && (this.logger.zsymb(0, 10235, 30024, "onMigratedPreview #2"),
                this.onPreviewChange({
                    convId: t
                }, [])),
                this.loaded = !0,
                this.signalRenderList(),
                this.signalRenderState()
            }
            initMyCloud() {
                const e = Ot.g.getFlagForCurrentUser(null, "z_sendtome")
                  , t = qe.default.sendToMeId
                  , s = !(qe.default.isOffSendToMe || e && 1 !== e);
                if (this.logger.zsymb(0, 10235, 30025, "initMyCloud", e, qe.default.isOffSendToMe),
                this.listVisible.some((e=>e === t))) {
                    const e = this.convDataManager.getConvByIdSync(t);
                    e && e.pinned ? vt.e.logAction(1390703) : (Ot.g.setFlagForCurrentUser(null, "z_sendtome", Date.now()),
                    vt.e.logAction(1390702))
                } else if (s) {
                    const e = ot.a.PinDataManager.getTotalPinnedConversation() >= qe.default.limit_pin_messages
                      , s = qe.default.auto_pin_send2me && !Ot.g.getFlagForCurrentUser(null, "z_sendtome_pinned") && !e;
                    this.convDataManager.createEmptyConvForUser(t, s ? 1 : 0, v.CONV_OT_STATE.none, {}),
                    s && (ot.a.PinDataManager.pin([t]),
                    Ot.g.setFlagForCurrentUser(null, "z_sendtome_pinned", 1)),
                    Ot.g.setFlagForCurrentUser(null, "z_sendtome", Date.now()),
                    this.onPreviewChange({
                        convId: t
                    }, [])
                }
            }
            addStrangersToVisible(e, t) {
                if (!t || !t.length)
                    return e;
                if (this.isMeBAAccount())
                    return e.concat(t);
                {
                    const s = It.a.filterByResponsed(t, !1);
                    if (s.length) {
                        this.newestStrangerId = It.a.getNewestConvFromIds(s);
                        e.includes(v.CONV_FILTER.STRANGER) || e.push(v.CONV_FILTER.STRANGER)
                    }
                    return t.forEach((t=>{
                        this.convDataManager.isRespondedByMeSync(t) && e.push(t)
                    }
                    )),
                    e
                }
            }
            onLabelChangeConvs(e, t, s) {
                if (this.logger.zsymb(0, 10235, 30026, "onLabelChangeConvs", t.length, e),
                t.length && this.labelFilters.includes(e))
                    if ("add" == s) {
                        const e = t.filter((e=>!this.listFiltered.includes(e) && !this.listHiddens.includes(e)));
                        if (!e.length)
                            return;
                        this.listFiltered = [...this.listFiltered, ...e],
                        this.listFiltered = It.a.sortConvId(this.listFiltered, this.typeFilter === ft.FilterType.UNREAD, !1),
                        this.signalRenderList()
                    } else {
                        let e = !1;
                        t.forEach((t=>{
                            const s = Et.b.getLabelObjByConversaionId(t)
                              , i = s ? s.id : null;
                            this.labelFilters.includes("" + i) || (this.listFiltered = this.listFiltered.filter((e=>e !== t)),
                            e = !0)
                        }
                        )),
                        e && this.signalRenderList()
                    }
            }
            moveConvOutConvList(e) {
                this.logger.zsymb(0, 10235, 30027, "moveConvOutConvList", e),
                this.listVisible = this.listVisible.filter((t=>t !== e)),
                this.listFiltered = this.listFiltered.filter((t=>t !== e)),
                this.listStrangers = this.listStrangers.filter((t=>t !== e)),
                e !== this.newestStrangerId || this.isMeBAAccount() || this.updateNewestStrangerId(this.listStrangers),
                this.signalRenderList()
            }
            getAlterId() {
                return new Map([[v.CONV_FILTER.STRANGER, this.newestStrangerId]])
            }
            updateNewestStrangerId(e) {
                if (this.isMeBAAccount())
                    return;
                const t = It.a.filterByResponsed(e, !1)
                  , s = this.newestStrangerId;
                if (this.newestStrangerId = It.a.getNewestConvFromIds(t),
                this.newestStrangerId || (this.listVisible = this.listVisible.filter((e=>e !== v.CONV_FILTER.STRANGER)),
                this.signalRenderList()),
                this.previewManager.updateStrangerBox(this.newestStrangerId),
                s !== this.newestStrangerId && this.newestStrangerId) {
                    const [e,t] = It.a.insertToProperPosition(this.listVisible, v.CONV_FILTER.STRANGER, this.getAlterId());
                    this.listVisible = e,
                    this.signalRenderList()
                }
            }
            rebuildList() {
                this.logger.zsymb(0, 10235, 30028, `rebuildList 1: ${this.listRawAll.size} ${this.listVisible.length} ${this.listStrangers.length}`),
                this.listStrangers = [],
                this.listVisible = [],
                this.listHiddens = [],
                this.listFiltered = [],
                this.newestStrangerId = "";
                const e = Array.from(this.listRawAll)
                  , t = It.a.groupConversaionSync(e);
                if (this.logger.zsymb(0, 10235, 30029, `grouped list #2: \n\t\t\t${t.hidden.length}\n\t\t\t- ${t.stranger.length}\n\t\t\t- ${t.outdate.length}\n\t\t\t- ${t.visible.length}\n\t\t`),
                qe.default.stagingAccount)
                    for (const n in t)
                        this.logger.zsymb(0, 10235, 30030, `${n}:, ${t[n]}`);
                this.listStrangers = t.stranger,
                this.listHiddens = t.hidden;
                const s = this.addStrangersToVisible(t.visible, this.listStrangers)
                  , i = this.safeSortConvList(s, !1);
                this.listVisible = i,
                this.logger.zsymb(0, 10235, 30031, `visible sorted #2: ${this.listVisible}`),
                this.labelFilters.length && this.applyLabelFilter(this.labelFilters),
                this.typeFilter !== ft.FilterType.ALL && this.applyTypeFilter(this.typeFilter, qe.default.should_force_genlist_conv),
                this.signalRenderList(),
                this.signalRenderState()
            }
            handleUserPackageChange() {
                this.logger.zsymb(0, 10235, 30032, `handleUserPackageChange: ${rt.default.isMeBAAccount()}}`),
                this.rebuildList()
            }
            signalRenderList(e) {
                void 0 === e && (e = "all"),
                Object(Pe.h)(this.name, e)
            }
            signalRenderState() {
                Object(Pe.g)(this.name, St.c)
            }
            logActionSelectConv(e) {
                const t = this.labelFilters.length > 0;
                if (this.typeFilter === ft.FilterType.UNREAD ? (vt.e.logAction(1453103),
                t || vt.e.logAction(1453107)) : this.typeFilter === ft.FilterType.ALL ? (vt.e.logAction(1453104),
                t && vt.e.logAction(1453108)) : this.typeFilter === ft.FilterType.FOCUSED ? vt.e.logAction(1453501) : this.typeFilter === ft.FilterType.ARCHIVED && vt.e.logAction(1453502),
                t)
                    vt.e.logAction(1453105);
                else {
                    vt.e.logAction(1453106);
                    for (let e = 0; e < this.labelFilters.length; e++) {
                        if (parseInt(this.labelFilters[e]) > 0) {
                            vt.e.logAction(1453109);
                            break
                        }
                    }
                }
                this.typeFilter == ft.FilterType.ARCHIVED && Ut.a.sendTrackSrc(e, 4, !1)
            }
            init() {}
            getItem(e) {
                return e.key === St.c ? {
                    labelFilters: this.labelFilters,
                    typeFilter: this.typeFilter,
                    loaded: this.loaded,
                    isEnableArchivedChat: this.isEnableArchivedChat,
                    hasUnreadArchivedChat: this.hasUnreadArchivedChat,
                    typeFilterSrc: this.typeFilterSrc
                } : Gt
            }
            getList(e) {
                return e.key === St.c || this.typeFilter == ft.FilterType.ALL && 0 === this.labelFilters.length ? this.listVisible : this.listFiltered
            }
            onGetItemFailure(e) {}
            onGetListFailure(e) {}
            bindUIMenu(e, t) {
                this.menuRef[e] = t
            }
            cleanUpUIMenu(e) {
                this.menuRef[e] = null
            }
            showMenu(e, t, s) {
                if (this.menuRef[e] && e === ht.b)
                    this.showConvActionMenu(t, s)
            }
            hideMenu(e) {
                this.menuRef[e]
            }
            showConvActionMenu(e, t) {
                if (t && t.friendItem)
                    return;
                if (t.userId === v.CONV_FILTER.STRANGER || t.userId === v.CONV_FILTER.MEDIA)
                    return;
                const s = Object(i.a)({}, t)
                  , n = s.userId;
                if (s && !Ke.default.isFakeId(n)) {
                    const e = this.previewManager.getPreviewByIDSync(n)
                      , t = rt.default.getProfileFriendByIdSync(n) || {}
                      , i = this.unreadDataManager.getUnreadByConvIdSync(n);
                    s.lastMessage = null == e ? void 0 : e.message,
                    s.isFr = t.isFr,
                    s.unreadMark = null == i ? void 0 : i.unreadMark,
                    s.smsUnreadCount = null == i ? void 0 : i.smsUnreadCount
                }
                this.menuRef[ht.b].updateTargetInfo(s),
                this.menuRef[ht.b].showAction(Object(i.a)({}, e))
            }
            bindUIContainer(e) {
                this.convUIListContainer = e
            }
            cleanUpUIContainer() {
                this.convUIListContainer = null
            }
            getEnableArchivedChat() {
                return this.isEnableArchivedChat
            }
            getListFilterSrc(e) {
                return this.typeFilterSrc === ft.FilterSrcType.UNREAD ? It.a.filterByUnread(e) : e
            }
            setTypeFilterSrc(e) {
                if (this.typeFilterSrc !== e && (this.typeFilterSrc = e,
                this.applyTypeFilter(this.typeFilter, !0),
                e === ft.FilterSrcType.UNREAD)) {
                    const e = this.labelFilters.length > 0 ? 1453215 : 1453214;
                    vt.e.logAction(e)
                }
            }
            genListArchivedChat(e, t, s, i, n) {
                void 0 === i && (i = !0),
                void 0 === n && (n = !0);
                let r = [];
                r = It.a.filterByLabel(this.getListFilterSrc(e), s),
                s.length && n && this.typeFilterSrc !== ft.FilterSrcType.UNREAD && this.addLikeConvToFilterListV2(r, s);
                let a = this.getListFilterSrc(this.listStrangers).filter((e=>(Ut.a.isArchivedChat(e) && t || !Ut.a.isArchivedChat(e) && !t) && !Ct.a.isThreadHidden(e)));
                return s.includes(ht.h) && 1 == s.length ? this.isMeBAAccount() || (a = It.a.filterByResponsed(a, !1)) : s.includes(ht.h) || (a = It.a.filterByLabel(a, s)),
                r = r.filter((e=>!(this.typeFilter === ft.FilterType.ARCHIVED || !a.length || e != v.CONV_FILTER.STRANGER) || (Ut.a.isArchivedChat(e) && t || !Ut.a.isArchivedChat(e) && !t) && e !== v.CONV_FILTER.STRANGER && !It.a.isStrangerV2(e) && !Ct.a.isThreadHidden(e))),
                i && (this.typeFilter === ft.FilterType.ARCHIVED ? r = r.concat(a) : this.isMeBAAccount() || s.length ? (this.isMeBAAccount() && (null == s || !s.length) || null != s && s.length) && (r = r.concat(a)) : r = this.addStrangersToVisible(r, a)),
                r = r.filter(((e,t)=>r.indexOf(e) == t)),
                this.safeSortConvList(r, this.typeFilterSrc === ft.FilterSrcType.UNREAD)
            }
            updateListArchivedChat() {
                this.typeFilter == ft.FilterType.FOCUSED ? this.onTypeFilterChange(ft.FilterType.FOCUSED, !0) : this.typeFilter == ft.FilterType.ARCHIVED && this.onTypeFilterChange(ft.FilterType.ARCHIVED, !0)
            }
            onOffArchivedChat(e) {
                if (!qe.default.enable_archived_chat)
                    return;
                const t = ce.default.getConvUXVersion();
                this.isEnableArchivedChat && e && "2" == t && (this.isEnableArchivedChat = !1,
                this.signalRenderState()),
                this.isEnableArchivedChat != e && (e || this.typeFilter !== ft.FilterType.ARCHIVED && this.typeFilter !== ft.FilterType.FOCUSED ? e && this.onTypeFilterChange(ft.FilterType.FOCUSED, !0) : this.onTypeFilterChange(ft.FilterType.ALL, !0),
                this.labelDataManager.onClearFilter(),
                this.setTypeFilterSrc(ft.FilterSrcType.ALL),
                this.isEnableArchivedChat = e && "3" == t,
                this.signalRenderState())
            }
            isShowUnreadArchivedChat() {
                return this.hasUnreadArchivedChat
            }
            updateUnreadArchivedChat(e) {
                this.typeFilter != ft.FilterType.ARCHIVED && (this.hasUnreadArchivedChat = e),
                this.signalRenderState()
            }
        }
        ) || pt) || pt) || pt) || pt) || pt) || pt) || pt) || pt);
        var zt, Vt = s("AtyM"), $t = s("R5gT"), qt = s("Xzw3"), Wt = s("d+hT"), Ht = s("uEOi"), Kt = s("rQsU"), Qt = s("kTC5"), Zt = s("4wTQ"), Jt = s("ES/k");
        const Xt = {
            isFocusSearchBox: !1,
            isFocusOnRecentSearch: !1,
            searchText: "",
            searchResult: {},
            searching: !1,
            conversation: null,
            highlightId: "",
            filter: {
                timeFrom: 0,
                timeTo: Date.now()
            }
        }
          , Yt = new Ke.LocalId;
        var es;
        !function(e) {
            e[e.STEP_CONTACT = 0] = "STEP_CONTACT",
            e[e.STEP_MESSAGES = 1] = "STEP_MESSAGES",
            e[e.STEP_FILES = 2] = "STEP_FILES",
            e[e.STEP_DIRECTORY = 3] = "STEP_DIRECTORY"
        }(es || (es = {}));
        Object(mt.b)(ft.SearchController)(zt = function(e, t) {
            return l.ModuleContainer.inject(Kt.b)(e, void 0, 0)
        }(zt = function(e, t) {
            return l.ModuleContainer.inject(ut.b)(e, void 0, 1)
        }(zt = function(e, t) {
            return l.ModuleContainer.inject(ut.h)(e, void 0, 2)
        }(zt = Reflect.metadata("design:type", Function)(zt = Reflect.metadata("design:paramtypes", [void 0 === Kt.b ? Object : Kt.b, void 0 === ut.b ? Object : ut.b, void 0 === ut.h ? Object : ut.h])(zt = class {
            constructor(e, t, s) {
                this.convListController = e,
                this.convDataManager = t,
                this.previewDataManager = s,
                this.state = void 0,
                this.pageLoad = void 0,
                this.curQuery = void 0,
                this.cacheResSearch = void 0,
                this.countQuery = void 0,
                this.countTimeUseGlobalSearch = void 0,
                this.countSelectTopRes = void 0,
                this.cacheSearch = void 0,
                this.trackSearch = void 0,
                this.trackSearchVietnamese = void 0,
                this.lastTextSearch = void 0,
                this.lastTextSearchTs = void 0,
                this.isShowRecentSearch = void 0,
                this.isFirstLoadSuccess = void 0,
                this.searchDelay = void 0,
                this.closeBySendingMsg = void 0,
                this.clearAdminMode = void 0,
                this.timeouResetDataMsg = void 0,
                this.searchResultList = void 0,
                this.recentSearchList = void 0,
                this.searchInput = void 0,
                this.loadingMore = void 0,
                this.loadingMoreFiles = void 0,
                this.oldestTime = void 0,
                this.functionSearchByName = void 0,
                this.timeoutLog = void 0,
                this._sbc = null,
                this._removeSearchResult = (e,t)=>{
                    const s = this.getSearchState();
                    if (s && !s.conversation && s.searchResult)
                        if (t) {
                            if (!s.searchResult.groups)
                                return;
                            const t = [...s.searchResult.groups];
                            for (let n = 0; n < t.length; n++)
                                if (t[n].userId == e) {
                                    t.splice(n, 1),
                                    this.updateState(Object(i.a)(Object(i.a)({}, s), {}, {
                                        searchResult: Object(i.a)(Object(i.a)({}, s.searchResult), {}, {
                                            groups: t
                                        })
                                    }));
                                    break
                                }
                        } else {
                            if (!s.searchResult.friends)
                                return;
                            const t = [...s.searchResult.friends];
                            for (let n = 0; n < t.length; n++)
                                if (t[n].userId == e) {
                                    t.splice(n, 1),
                                    this.updateState(Object(i.a)(Object(i.a)({}, s), {}, {
                                        searchResult: Object(i.a)(Object(i.a)({}, s.searchResult), {}, {
                                            friends: t
                                        })
                                    }));
                                    break
                                }
                        }
                }
                ,
                this.name = ft.SEARCH_CONTROLLER,
                this.key = "windowId",
                this.state = Xt,
                this.pageLoad = 0,
                this.curQuery = "",
                this.countQuery = 0,
                this.countTimeUseGlobalSearch = 0,
                this.countSelectTopRes = 0,
                this.cacheSearch = {
                    items: [],
                    keywords: null
                },
                this.trackSearch = !1,
                this.trackSearchVietnamese = !1,
                this.lastTextSearch = "",
                this.lastTextSearchTs = 0,
                this.isShowRecentSearch = !1,
                this.searchDelay = this._getSearchDelaySetting(),
                this.closeBySendingMsg = !1,
                this.loadingMore = !1,
                this.loadingMoreFiles = !1,
                this.oldestTime = 0,
                this.timeoutLog = null,
                this.isFirstLoadSuccess = !1,
                this._innerSearchFunc = this._innerSearchFunc.bind(this),
                this.functionSearchByName = Ke.default.throttle(this._innerSearchFunc, this.searchDelay),
                this.onKeywordChange = this.onKeywordChange.bind(this),
                this.loadMessagesV2 = this.loadMessagesV2.bind(this),
                this.loadMoreFiles = this.loadMoreFiles.bind(this),
                this.onKeyPressInput = this.onKeyPressInput.bind(this),
                this.onFocusInput = this.onFocusInput.bind(this),
                this.onBlurInput = this.onBlurInput.bind(this),
                this.onclickCloseSearchButton = this.onclickCloseSearchButton.bind(this),
                this.onClickClearSearch = this.onClickClearSearch.bind(this),
                this.onSearchKeyword = this.onSearchKeyword.bind(this),
                this.setRecentSearchFocusState = this.setRecentSearchFocusState.bind(this),
                this.focusSearchBox = this.focusSearchBox.bind(this),
                this.selectResult = this.selectResult.bind(this),
                this.onFileSelect = this.onFileSelect.bind(this),
                this.selectTopRes = this.selectTopRes.bind(this),
                this.listenEvents()
            }
            get sidebarController() {
                return this._sbc || (this._sbc = l.ModuleContainer.resolve(ft.SidebarController)),
                this._sbc
            }
            listenEvents() {
                Ze.default.subscribe(((e,t)=>{
                    switch (e) {
                    case Je.SideBarActions.FOCUS_SEARCH_INPUT:
                        this.focusSearchBox();
                        break;
                    case Je.FetchActions.FRIENDS_REMOVED:
                        this._removeSearchResult(t, !1);
                        break;
                    case Je.FetchActions.GROUP_LEAVE:
                        this._removeSearchResult(t, !0);
                        break;
                    case Je.SideBarActions.SEARCH_FILE_DONE:
                        this.updateState(Object(i.a)(Object(i.a)({}, this.state), {}, {
                            searching: !1
                        }));
                        break;
                    case Je.SideBarActions.CLEAR_SEARCH:
                        this.clearSearch();
                        break;
                    case Je.ConversationListActions.SELECT_CONVERSATION:
                        setTimeout((()=>{
                            this.state.highlightId !== t.userId && this.setRecentSearchFocusState(!1, !1, !0),
                            t.callPoint !== jt.a.JumpMessage && this.updateStateOf("highlightId", null == t ? void 0 : t.userId)
                        }
                        ), 0)
                    }
                }
                ))
            }
            logSearch(e) {
                Ft.p.getDebugSearch().showLogSearchFlow
            }
            updateState(e, t) {
                void 0 === t && (t = !0),
                this.state = e,
                t && Object(Pe.g)(this.name, St.c)
            }
            isTextKey(e) {
                return e.match(/^[a-zA-Z0-9!@#$%^&*)(+=._-|\\\[\]{}~`"\';:?/<>,-\s\n]$/)
            }
            isMultipleKeyPressed(e) {
                return e.ctrlKey || e.metaKey || e.altKey
            }
            isKeywordStale(e) {
                return Jt.a.formatTextSearch(e) !== Jt.a.formatTextSearch(this.state.searchText)
            }
            bindUIList(e, t) {
                this._updateListRef(e, t)
            }
            cleanUpUIList(e) {
                this._updateListRef(e, null)
            }
            bindUISearchInput(e) {
                this.searchInput = e
            }
            cleanUpUISearchInput() {
                this.searchInput = null
            }
            _updateListRef(e, t) {
                switch (e) {
                case Qt.c.SEARCH_RESULT:
                    this.searchResultList = t;
                    break;
                case Qt.c.RECENT_SEARCH:
                    this.recentSearchList = t
                }
            }
            resetState() {
                this.searchInput.value = "",
                this.updateState(Object(i.a)({}, Xt))
            }
            updateStateOf(e, t) {
                this.state.hasOwnProperty(e) && this.state[e] !== t && ("searchText" === e && (this.searchInput.value = t),
                this.updateState(Object(i.a)(Object(i.a)({}, this.state), {}, {
                    [e]: t
                })))
            }
            onKeyPressInput(e) {
                if (this._isSelectAllSearchText() && this.searchResultList && this.isTextKey(e.key) && !this.isMultipleKeyPressed(e) && (this.searchResultList.openTabAll(),
                this.searchResultList.resetContactList()),
                e.which == v.K_BACK_SPACE ? this.state && this.state.searchText && "" !== this.state.searchText && vt.e.logAction(12307) : "" === this.state.searchText && !this.timeoutLog && this.isTextKey(e.key) && (this.timeoutLog = setTimeout((()=>{
                    this.timeoutLog = null,
                    vt.e.logAction(1232002)
                }
                ), 3e3)),
                e.which == v.K_ESC)
                    !0 === this.isShowRecentSearch && (this.updateState(Object(i.a)(Object(i.a)({}, this.state), {}, {
                        isFocusOnRecentSearch: !1,
                        isFocusSearchBox: !1
                    })),
                    this.searchInput && this.searchInput.blur(),
                    this.onCloseSearch()),
                    "" != this.searchInput.value ? this.clearSearch(!1) : this.clearSearch(!0);
                else if (e.which == v.K_ENTER) {
                    let e = this.searchResultList || this.recentSearchList;
                    if (e && this.state.searchText) {
                        let t = e.selectFocusedConversation(!0);
                        setTimeout((()=>{
                            this.state.conversation ? this.focusSearchBox() : Ct.a.isThreadHidden(t) || Ze.default.send(Je.ChatBoxActions.FOCUS_INPUT, {
                                userId: t,
                                windowId: St.c
                            })
                        }
                        ), 0)
                    }
                } else if (e.which == v.K_UP || e.which == v.K_DOWN) {
                    this.searchResultList && vt.e.logAction(12317);
                    let t = this.searchResultList || this.recentSearchList;
                    t && (e.stopPropagation(),
                    e.preventDefault(),
                    e.which == v.K_UP ? t.moveUp() : t.moveDown())
                }
            }
            onKeywordChange(e, t) {
                let s = "";
                if (s = !e && t ? t : e.target.value,
                s && (s = Ke.default.ZSafeFunction((()=>s.normalize()), s)),
                this.countTimeUseGlobalSearch || (this.countTimeUseGlobalSearch = Vt.a.now(),
                this.countSelectTopRes = 0),
                s) {
                    const e = Jt.a.formatTextSearch(this.lastTextSearch)
                      , t = Jt.a.formatTextSearch(s);
                    Ke.default.log("searching: true"),
                    qe.default.stagingAccount && this._checkOnAdminMode(s),
                    this.trackSearch || (this.trackSearch = !0,
                    vt.e.logAction(12318)),
                    this.updateState(Object(i.a)(Object(i.a)({}, this.state), {}, {
                        searchText: s
                    })),
                    this.countQuery = Yt.next(),
                    this.functionSearchByName(s, this.countQuery, e !== t)
                } else
                    this._resetCacheResultSearch(),
                    $t.a.abortSearch(),
                    this.clearSearch(!1)
            }
            onFocusInput() {
                this.searchInput && "" !== this.searchInput.value && this.searchInput.select(),
                this.updateState(Object(i.a)(Object(i.a)({}, this.state), {}, {
                    isFocusSearchBox: !0
                })),
                vt.e.logAction(1232001)
            }
            onBlurInput() {
                setTimeout((()=>{
                    this.updateState(Object(i.a)(Object(i.a)({}, this.state), {}, {
                        isFocusSearchBox: !1
                    })),
                    this.searchInput && "" == this.searchInput.value && this.qosLogSearch()
                }
                ), 20)
            }
            onclickCloseSearchButton(e) {
                this.setRecentSearchFocusState(!1),
                this.onCloseSearch(),
                this._resetCacheResultSearch(),
                this.clearSearch(!this.state.conversation),
                vt.e.logAction(1232003),
                e && (e.stopPropagation(),
                e.preventDefault())
            }
            onClickClearSearch() {
                Ft.p.resetGlobalSearchMode(),
                this.state.conversation && vt.e.logAction(12314),
                this._resetCacheResultSearch(),
                this.clearSearch(!this.state.conversation),
                this.focusSearchBox(),
                vt.e.logAction(1232006)
            }
            onSearchKeyword(e) {
                "string" == typeof e && this.searchInput && (this.searchInput.value = e,
                this.onKeywordChange(null, e),
                Ht.a.addCacheKeyword(e))
            }
            onRemoveKeyword(e) {
                "string" == typeof e && Ht.a.removeCacheKeyword(e)
            }
            onFileSelect(e) {
                null != e && e.msgId && (this.updateStateOf("highlightId", e.msgId),
                this.state.searchText && Ht.a.addCacheKeyword(this.state.searchText))
            }
            setRecentSearchFocusState(e, t, s) {
                if (void 0 === t && (t = !1),
                void 0 === s && (s = !1),
                !s) {
                    const t = this.sidebarController.getSelectedId();
                    if (this.state.isFocusOnRecentSearch === e || t && this.state.highlightId === t && !e)
                        return
                }
                this.state.isFocusOnRecentSearch = e,
                e && (this.closeBySendingMsg = !1),
                Object(Pe.g)(this.name, St.c)
            }
            onCloseSearch() {
                var e, t;
                vt.e.logAction(1232004),
                0 == (null === (e = this.state.searchResult) || void 0 === e || null === (t = e.messages) || void 0 === t ? void 0 : t.length) && vt.e.logAction(1232202),
                this.qosLogSearch()
            }
            focusSearchBox(e) {
                void 0 === e && (e = !1),
                this.searchInput && (this.searchInput.focus(),
                e && setTimeout((()=>{
                    this.searchInput.select()
                }
                ), 0))
            }
            openRecentSearch() {
                this.searchInput ? this.searchInput.focus() : this.setRecentSearchFocusState(!0)
            }
            loadMessagesV2(e, t, s) {
                var n = this;
                void 0 === t && (t = !1);
                let r = this.state.searchResult
                  , a = ""
                  , o = e;
                if (!this.state.searchText)
                    return;
                a = this.state.searchText;
                let l = this.state
                  , c = !1;
                t || (l = Object(i.a)(Object(i.a)({}, this.state), {}, {
                    searchResult: Object(i.a)(Object(i.a)({}, this.state.searchResult), {}, {
                        messages: null
                    })
                }),
                c = !0);
                const d = ()=>this.state.filter.timeFrom != o.timeFrom || this.state.filter.timeTo != o.timeTo || !(!this.state.searchText || !this.isKeywordStale(a))
                  , h = !this.loadingMore && this.isFirstLoadSuccess && !!r && !!r.messages;
                if (!t || h) {
                    this.logSearch(`[Search flow] load more msg: ${a}, ${this.pageLoad}`),
                    this.updateState(Object(i.a)(Object(i.a)({}, l), {}, {
                        filter: {
                            timeFrom: e.timeFrom,
                            timeTo: e.timeTo
                        }
                    }), c),
                    this.loadingMore = !0;
                    const r = []
                      , o = function(e, o) {
                        var l;
                        void 0 === o && (o = !1);
                        let c = [];
                        if (n.loadingMore = !1,
                        n.logSearch(`[Search flow] load more msg res: ${a}, ${null === (l = e.arr) || void 0 === l ? void 0 : l.length}`),
                        d())
                            return n.pageLoad++,
                            void (s && s(null, -1));
                        if (e && e.listConv && e.arr) {
                            n.convListController.getRecentContacts().forEach((t=>{
                                let s = e.listConv.indexOf(t.userId);
                                if (s >= 0 && !Ct.a.isThreadHidden(t.userId))
                                    for (let i = s; i < e.listConv.length; ++i)
                                        e.listConv[i] == t.userId && (e.arr[i].conversation = t)
                            }
                            )),
                            e.arr.forEach((e=>{
                                Object.keys(e.conversation).length > 1 && c.push(e)
                            }
                            )),
                            Array.prototype.push.apply(r, c),
                            o && t && r.length && n.pageLoad++,
                            d() || !n.isFirstLoadSuccess && t || (n.state.searchResult.messages && (c = n.state.searchResult.messages.concat(c)),
                            n.updateState(Object(i.a)(Object(i.a)({}, n.state), {}, {
                                searchResult: Object(i.a)(Object(i.a)({}, n.state.searchResult), {}, {
                                    messages: c
                                }),
                                searching: !1
                            })),
                            s && o && s(r, n.pageLoad))
                        }
                    };
                    $t.a.searchGlobalMessagesV3(a, d, void 0, o, qe.default.limit_result_msg_search + 1, e).then((e=>o(e, !0))).catch((e=>{
                        this.loadingMore = !1,
                        this.logSearch(`[Search flow] load more msg err: ${a}, ${e}`),
                        s && s(null, -1),
                        Ke.default.logCoreError("searchGlobalMsg v2 " + e)
                    }
                    ))
                } else
                    s && s(null, -1)
            }
            loadMoreMessages() {
                this.state.searchResult
            }
            loadMoreFiles() {
                let e = this.state.searchResult
                  , t = this.state.searchText;
                e && e.rawFileResult && e.files && e.rawFileResult.length > e.lastFileOffset && !this.loadingMoreFiles && (this.loadingMoreFiles = !0,
                ce.default.getFilesByMsgIds(e.rawFileResult.slice(e.lastFileOffset, e.lastFileOffset + 20)).then((s=>{
                    if (this.loadingMoreFiles = !1,
                    this.isKeywordStale(t))
                        return;
                    e = this.state.searchResult;
                    const n = s.filter(Boolean);
                    let r = Ke.default.ZSafeFunction((()=>Math.max(0, e.rawFileResult.length - e.lastFileOffset - 20) + e.files.length + n.length), e.realFileLen)
                      , a = this.state.searchResult.files.concat(n);
                    a.sort(((e,t)=>parseInt(t.sendDttm) - parseInt(e.sendDttm))),
                    this.updateState(Object(i.a)(Object(i.a)({}, this.state), {}, {
                        searchResult: Object(i.a)(Object(i.a)({}, this.state.searchResult), {}, {
                            files: a,
                            realFileLen: r,
                            lastFileOffset: e.lastFileOffset + 20
                        })
                    }))
                }
                )).catch((e=>{
                    this.loadingMoreFiles = !1,
                    Ke.default.logCoreError("_loadMoreFiles ", e)
                }
                )))
            }
            qosLogSearch() {
                this.countTimeUseGlobalSearch && (O.default.increaseSuccess(97111, 0, Vt.a.now() - this.countTimeUseGlobalSearch),
                this.countTimeUseGlobalSearch = 0),
                this.countSelectTopRes >= 0 && (O.default.increaseSuccess(97112, 0, this.countSelectTopRes),
                this.countSelectTopRes = -1)
            }
            selectTopRes() {
                this.countSelectTopRes >= 0 && this.countSelectTopRes++
            }
            selectResult(e, t, s, n) {
                var r;
                void 0 === t && (t = !1),
                void 0 === s && (s = !1),
                void 0 === n && (n = !1);
                const a = this.state.searchText;
                let o = !!this.state.conversation;
                Zt.a.jumpToMessage(e.message, null === (r = e.conversation) || void 0 === r ? void 0 : r.userId, _e.f).then((t=>{
                    const {groupMsgs: s=[]} = t;
                    let n = null;
                    Ke.default.ZSafeFunction((()=>{
                        if (s)
                            for (let t = 0; t < s.length; t++)
                                if (s[t].msgId == e.message.msgId)
                                    return n = Object(i.a)({}, s[t]),
                                    void (n.searchKeyWord = a)
                    }
                    ), null),
                    this.state.searchText && Ht.a.addCacheKeyword(this.state.searchText),
                    Ze.default.send(Je.ChatBoxActions.OPEN_CONV_JUMP_TO_MESSAGE_SEARCH, {
                        messages: s,
                        focusId: ["" + e.message.msgId],
                        conversation: e.conversation
                    }),
                    n && Object(_e.f)({
                        type: Je.ChatBoxActions.UPDATE_MESSAGE_ATTRIBUTES,
                        payload: n
                    })
                }
                )).catch((t=>{
                    Ke.default.logCoreError(t),
                    Mt.a.createWarning(Dt.default.str("STR_MESSAGE_NOT_FOUND")),
                    n || Ze.default.send(Je.ChatBoxActions.OPEN_CONV_JUMP_TO_MESSAGE_SEARCH, {
                        messages: [],
                        focusId: [],
                        conversation: e.conversation
                    })
                }
                )),
                o ? (s && this.focusSearchBox(),
                this.updateState(Object(i.a)(Object(i.a)({}, this.state), {}, {
                    highlightId: e.message.msgId
                }))) : t || this.updateState(Object(i.a)(Object(i.a)({}, this.state), {}, {
                    highlightId: e.message.msgId
                }))
            }
            getRecentSearchItems() {
                if (0 === qe.default.recent_search.is_enable)
                    return [];
                let e = Ht.a.getLocalRecentSearchList();
                if (!e)
                    return [];
                let t = Nt.default.getGroupsListSync()
                  , s = t || [];
                return e = e.filter((e=>{
                    if (e && e.userId && !Ct.a.isThreadHidden(e.userId)) {
                        if (e.userId.startsWith(v.GROUPID_PREFIX) || 1 === e.type) {
                            let t = !1;
                            1 !== e.type || e.userId.startsWith(v.GROUPID_PREFIX) || (e.userId = v.GROUPID_PREFIX + e.userId);
                            for (let i of s)
                                if (i.userId && e.userId == i.userId) {
                                    t = !0;
                                    break
                                }
                            return !!t || (Ht.a.removeLocalRecentSearchList(e.userId),
                            !1)
                        }
                        return !0
                    }
                    return !1
                }
                )),
                e
            }
            getCacheRecentSearch() {
                return this.cacheSearch.items = this.getRecentSearchItems(),
                qe.default.sync_recent_search.enable_kw && (this.cacheSearch.keywords = Ht.a.getLocalKeywordList()),
                this.cacheSearch
            }
            getPageLoad() {
                return this.pageLoad
            }
            getSearchInputRef() {
                return this.searchInput
            }
            getSearchState() {
                return this.state
            }
            clearSearch(e) {
                if (void 0 === e && (e = !0),
                this._resetCacheResultSearch(),
                this.searchInput.value = "",
                this.lastTextSearch = "",
                e) {
                    if (qt.b.setMode(qt.a.NORMAL),
                    this.updateState(Object(i.a)({}, Xt)),
                    this.sidebarController.getState(St.c).currentTab == ft.SidebarTab.FILE_TAB)
                        return void this.functionSearchByName(null, this.countQuery, !0)
                } else
                    this.updateState(Object(i.a)(Object(i.a)({}, this.state), {}, {
                        searchText: "",
                        searching: !0,
                        highlightId: ""
                    })),
                    this.functionSearchByName("", this.countQuery, !0)
            }
            _resetCacheResultSearch() {
                this.curQuery = "",
                this.cacheResSearch = null,
                this.trackSearch = !1,
                this.trackSearchVietnamese = !1
            }
            _checkOnAdminMode(e) {
                let t = this.__checkOnAdminMode(e);
                t && (1 === t ? (this.clearAdminMode && clearTimeout(this.clearAdminMode),
                qe.default.adminMode = !0,
                this.sidebarController.togglePerfTab(!0),
                this.clearAdminMode = setTimeout((()=>{
                    this.clearAdminMode = void 0,
                    qe.default.adminMode = void 0,
                    this.sidebarController.togglePerfTab()
                }
                ), 216e5)) : 2 === t && (this.clearAdminMode && (clearTimeout(this.clearAdminMode),
                this.clearAdminMode = void 0),
                qe.default.adminMode = !1,
                this.sidebarController.togglePerfTab(!1)))
            }
            __checkOnAdminMode(e) {
                if (e && "string" == typeof e && e.startsWith("$##")) {
                    return e.substring(3) === qe.default.zAminKey ? 1 : 2
                }
                return 0
            }
            _innerSearchFunc(e, t, s) {
                if (void 0 === s && (s = !0),
                !Yt.valid(t))
                    return;
                if (this.sidebarController.getState(St.c).currentTab === ft.SidebarTab.FILE_TAB)
                    Ze.default.send(Je.SideBarActions.SEARCH_FILE, {
                        term: e
                    });
                else if (this.state.conversation)
                    this.filterByConversation(e, this.state.conversation);
                else {
                    const t = s && this.isKeywordStale(this.lastTextSearch)
                      , r = Jt.a.formatTextSearch(e);
                    var n;
                    if (this.logSearch(`[Search flow] start search-------: ${t}, ${r}`),
                    !r)
                        null === (n = this.searchResultList) || void 0 === n || n.forceStopSearch(),
                        this.updateState(Object(i.a)(Object(i.a)({}, this.state), {}, {
                            searchResult: Object(i.a)(Object(i.a)({}, this.state.searchResult), {}, {
                                messages: null,
                                files: [],
                                rawFileResult: []
                            })
                        }));
                    this._searchGlobal(e, t)
                }
            }
            _searchGlobal(e, t) {
                var s, n, r, a, o, l, c = this;
                void 0 === t && (t = !0),
                this.lastTextSearchTs = Date.now(),
                this.lastTextSearch = e;
                let d = 2
                  , h = 0
                  , u = {}
                  , g = this.convDataManager.getAllConvSync()
                  , p = this.previewDataManager.getAllPreviewsSync()
                  , m = Ke.default.simpleStripVietnamese(e, !1);
                const f = (s,n)=>{
                    s !== es.STEP_DIRECTORY && s !== es.STEP_FILES && d--;
                    let r, a = 1 == d && s === es.STEP_CONTACT && 0 == h;
                    if (r = !!(d > 1 || a),
                    this.updateState(Object(i.a)(Object(i.a)({}, this.state), {}, {
                        searchResult: n,
                        searching: r
                    })),
                    s === es.STEP_CONTACT && t && (y(),
                    qe.default.tabbedGlobalSearchResult && qt.b.setMode(qt.a.SEARCHING),
                    qe.default.enableFileGlobalSearch && I()),
                    0 == d && !this.isKeywordStale(e)) {
                        let e = Date.now() - this.lastTextSearchTs;
                        e > 2e3 ? this._upSearchDelay() : e < 600 && this._downSearchDelay()
                    }
                }
                  , b = ()=>!(!this.state.searchText || !this.isKeywordStale(e))
                  , I = ()=>{
                    if (qe.default.adminConfig && qe.default.adminConfig.offglobalSearchMessage)
                        return setTimeout((()=>{
                            this.state && !this.isKeywordStale(e) && f(es.STEP_FILES, this.state.searchResult)
                        }
                        ), 100);
                    const t = t=>{
                        var s, n;
                        if (this.isKeywordStale(e))
                            return;
                        let r = new Set
                          , a = [];
                        var o, l;
                        if ((t.forEach((e=>{
                            e.msgId && !r.has(e.msgId) && (r.add(e.msgId),
                            a.push(e.msgId))
                        }
                        )),
                        (null === (s = this.state.searchResult) || void 0 === s || null === (n = s.rawFileResult) || void 0 === n ? void 0 : n.length) >= 20 && (null == a ? void 0 : a.length) >= 20) && ((null === (o = this.state.searchResult) || void 0 === o ? void 0 : o.rawFileResult[0]) == a[0] && (null === (l = this.state.searchResult) || void 0 === l ? void 0 : l.rawFileResult[19]) == a[19]))
                            return void this.updateState(Object(i.a)(Object(i.a)({}, this.state), {}, {
                                searchResult: Object(i.a)(Object(i.a)({}, this.state.searchResult), {}, {
                                    rawFileResult: a,
                                    realFileLen: a.length
                                })
                            }), !1);
                        const c = a.slice(0, 20);
                        ce.default.getFilesByMsgIds(c).then((t=>{
                            if (this.isKeywordStale(e))
                                return;
                            let s = []
                              , n = 0
                              , r = 0;
                            for (const e of t)
                                e ? (s.push(e),
                                n++) : r++;
                            s.sort(((e,t)=>parseInt(t.sendDttm) - parseInt(e.sendDttm)));
                            let o = this.state.searchResult;
                            Ke.default.log("search files: cur = " + o.searchKey + " this query = " + e, s.length),
                            o = o ? Object(i.a)({}, o) : {},
                            o.files = s,
                            o.realFileLen = a.length - r,
                            o.rawFileResult = a,
                            o.lastFileOffset = c.length,
                            o.searchKey = e,
                            h += n,
                            f(es.STEP_FILES, o)
                        }
                        )).catch((t=>{
                            Ke.default.logCoreError("doSearchFiles " + t),
                            this.state && !this.isKeywordStale(e) && f(es.STEP_FILES, this.state.searchResult)
                        }
                        ))
                    }
                    ;
                    $t.a.search(e, null, {
                        msgType: v.MSG_FILE
                    }, t, {
                        enableReject: !0
                    }).then(t).catch((e=>{
                        this.state.searchResult.files && this.state.searchResult.files.length || this.updateState(Object(i.a)(Object(i.a)({}, this.state), {}, {
                            searchResult: Object(i.a)(Object(i.a)({}, this.state.searchResult), {}, {
                                files: []
                            })
                        }), !0)
                    }
                    ))
                }
                  , y = ()=>{
                    if (qe.default.adminConfig && qe.default.adminConfig.offglobalSearchMessage)
                        return setTimeout((()=>{
                            this.state && !this.isKeywordStale(e) && f(es.STEP_MESSAGES, this.state.searchResult)
                        }
                        ), 100);
                    this.logSearch(`[Search flow] search msg: ${e}`);
                    Date.now();
                    const t = function(t, n) {
                        var r;
                        if (void 0 === n && (n = !1),
                        c.logSearch(`[Search flow] search msg res first load: ${e}, ${null === (r = t.arr) || void 0 === r ? void 0 : r.length}`),
                        c.pageLoad = 0,
                        c.timeouResetDataMsg && (clearTimeout(c.timeouResetDataMsg),
                        c.timeouResetDataMsg = !1,
                        c.updateState(Object(i.a)(Object(i.a)({}, c.state), {}, {
                            searchResult: Object(i.a)(Object(i.a)({}, c.state.searchResult), {}, {
                                messages: null
                            })
                        }), !1)),
                        !c.isKeywordStale(e) && t) {
                            let r = []
                              , o = 0;
                            t && t.listConv && t.arr && g.forEach((e=>{
                                let s = t.listConv.indexOf(e.userId);
                                if (s >= 0 && !Ct.a.isThreadHidden(e.userId))
                                    for (let i = s; i < t.listConv.length; ++i)
                                        t.listConv[i] == e.userId && (t.arr[i].conversation = e,
                                        o += 1,
                                        r.push(t.arr[i]))
                            }
                            ));
                            let l = c.state.searchResult
                              , d = r;
                            var a;
                            if (l.messages && (d = l.messages.slice(),
                            Array.prototype.push.apply(d, r)),
                            d.sort(((e,t)=>parseInt(t.message.sendDttm) - parseInt(e.message.sendDttm))),
                            l = l ? Object(i.a)({}, l) : {},
                            l.messages = d,
                            l.searchKey = e,
                            h += o,
                            n)
                                c.isFirstLoadSuccess = !0,
                                c.searchResultList && s && c.searchResultList.updateFirstLoadPos(s.timeFrom),
                                Ke.default.logCoreError("[Global search] check First data", e, null === (a = c.state.searchResult.messages) || void 0 === a ? void 0 : a.length);
                            else if (!r.length)
                                return;
                            f(es.STEP_MESSAGES, l)
                        }
                    };
                    this.searchResultList && (!this.timeouResetDataMsg && this.state.searchResult.messages && (this.timeouResetDataMsg = setTimeout((()=>{
                        this.timeouResetDataMsg = !1,
                        this.updateState(Object(i.a)(Object(i.a)({}, this.state), {}, {
                            searchResult: Object(i.a)(Object(i.a)({}, this.state.searchResult), {}, {
                                messages: null
                            })
                        })),
                        this.searchResultList && this.searchResultList.resetDataSearch()
                    }
                    ), 1e3)),
                    this.searchResultList.resetDataSearch());
                    const s = Object(i.a)({}, null);
                    this.updateState(Object(i.a)(Object(i.a)({}, this.state), {}, {
                        searching: !0,
                        highlightId: "",
                        searchResult: Object(i.a)(Object(i.a)({}, this.state.searchResult), {}, {
                            messages: !this.lastTextSearch || e.length < this.lastTextSearch.length ? null : this.state.searchResult.messages
                        })
                    })),
                    this.loadingMore = !1,
                    this.isFirstLoadSuccess = !1,
                    $t.a.searchGlobalMessagesV3(e, (()=>b()), void 0, t, qe.default.limit_result_msg_search + 1, null).then((e=>t(e, !0))).catch((t=>{
                        if (this.logSearch(`[Search flow] search msg fail: ${t}`),
                        Ke.default.logCoreError("searchGlobalMsg " + t),
                        this.state && !this.isKeywordStale(e)) {
                            this.searchResultList && this.searchResultList.forceStopSearch(),
                            this.timeouResetDataMsg && (clearTimeout(this.timeouResetDataMsg),
                            this.timeouResetDataMsg = !1);
                            let e = this.state.searchResult;
                            e.messages = [],
                            f(es.STEP_MESSAGES, e)
                        }
                    }
                    ))
                }
                ;
                if (this.curQuery && 0 !== e.indexOf(this.curQuery) && this._resetCacheResultSearch(),
                !this.cacheResSearch) {
                    const e = e=>{
                        for (const t of e) {
                            const e = t.userId || t.convId;
                            t && !u[e] && (t.userId || (t.userId = e),
                            t.infoSearch && delete t.infoSearch,
                            t.isDirectory && delete t.isDirectory,
                            u[e] = t)
                        }
                    }
                    ;
                    p.length && e(p),
                    e(rt.default.getFriendsSync()),
                    e(Nt.default.getGroupsListSync())
                }
                Wt.a.search(e, this.cacheResSearch ? this.cacheResSearch : u, {
                    hasSection: !0,
                    suggestGroupWithMember: !0,
                    searchFriendInGroup: !0,
                    isCalc: !0,
                    updateLastChat: !this.cacheResSearch,
                    searchPb: !0,
                    searchZName: !0,
                    searchNumPhone: !0,
                    filterHidden: Ct.a.isKeyPIN(e)
                }).then((t=>{
                    let s = this.state.searchResult;
                    if (!this.isKeywordStale(e)) {
                        {
                            var n;
                            let r = [];
                            if (Ct.a.isKeyPIN(e)) {
                                vt.e.logAction(1970601);
                                const e = Ct.a.getUidsHiddenChat();
                                if (e.length)
                                    for (let t of e) {
                                        let e = !1;
                                        for (let s of g)
                                            if (s && s.userId == t) {
                                                r.push(Object(i.a)(Object(i.a)({}, s), {}, {
                                                    infoSearch: {}
                                                })),
                                                e = !0;
                                                break
                                            }
                                        if (!e) {
                                            let e = null;
                                            e = t.startsWith(v.GROUPID_PREFIX) ? Nt.default.getGroupByIdSync(t) : rt.default.getProfileFriendSync(t),
                                            e && (e.lastMessageTime || (e.lastMessageTime = 0),
                                            r.push(Object(i.a)(Object(i.a)({}, e), {}, {
                                                infoSearch: {}
                                            })))
                                        }
                                    }
                            }
                            this.curQuery || (this.curQuery = e),
                            !this.cacheResSearch && t.orderAll && t.orderAll.constructor == Array && t.orderAll.length > 0 && (this.cacheResSearch = u),
                            null !== (n = t.phone) && void 0 !== n && n.length && (t.phone = t.phone.filter((e=>e.userId))),
                            s = s ? Object(i.a)({}, s) : {},
                            s.recentChat = t.recentChat,
                            s.groups = t.groups,
                            s.friends = t.friends,
                            s.oa = t.oa,
                            s.directory = t.directory,
                            s.searchKey = e,
                            s.phone = t.phone,
                            s.hiddenChat = r,
                            s.all = t.all,
                            s.orderAll = t.orderAll,
                            h += (s.groups ? s.groups.length : 0) + (s.friends ? s.friends.length : 0) + (s.oa ? s.oa.length : 0),
                            h += (s.recentChat ? s.recentChat.length : 0) + s.hiddenChat.length
                        }
                        f(es.STEP_CONTACT, s)
                    }
                }
                )).catch((e=>{
                    Ke.default.logCoreError(e)
                }
                )),
                0 == (null === (s = this.state.searchResult) || void 0 === s || null === (n = s.messages) || void 0 === n ? void 0 : n.length) && 0 == (null === (r = this.state.searchResult) || void 0 === r || null === (a = r.all) || void 0 === a ? void 0 : a.length) && 0 == (null === (o = this.state.searchResult) || void 0 === o || null === (l = o.files) || void 0 === l ? void 0 : l.length) && vt.e.logAction(1232201),
                m === e || this.trackSearchVietnamese || (this.trackSearchVietnamese = !0,
                vt.e.logAction(1232010))
            }
            filterByConversation(e, t) {
                var s = this;
                if (!e)
                    return this.searchInput.value = "",
                    void this.updateState(Object(i.a)(Object(i.a)({}, Xt), {}, {
                        conversation: t,
                        searching: !1,
                        highlightId: ""
                    }));
                let n = function(n, r) {
                    void 0 === r && (r = !1),
                    s.isKeywordStale(e) ? Ke.default.logCoreError("search: abort filtermode 1", s.state.searchText, e) : (!r || n && 0 != n.length) && $t.a.getMessageOfConversation(n, t.userId, 20).then((a=>{
                        if (s.isKeywordStale(e))
                            return void Ke.default.logCoreError("search: abort filtermode 2", s.state.searchText, e);
                        let o = a.list;
                        if (r && (!o || 0 === o.length))
                            return;
                        let l = o.length < 20 && n.length > 20;
                        o.length > 0 ? (s.updateState(Object(i.a)(Object(i.a)({}, s.state), {}, {
                            conversation: t,
                            searchResult: {
                                messageList: o.map((e=>({
                                    message: e,
                                    conversation: t
                                }))),
                                realLen: a.len,
                                rawSearchResult: n,
                                lastOffset: 20,
                                progress: r
                            },
                            searching: !1,
                            highlightId: o[0].msgId
                        })),
                        r || (s.focusSearchBox(),
                        l && s.loadMoreMessages()),
                        !r && s.searchResultList && s.searchResultList.scrollToTop && s.searchResultList.scrollToTop()) : (s.updateState(Object(i.a)(Object(i.a)({}, s.state), {}, {
                            conversation: t,
                            searchResult: {
                                messageList: [],
                                realLen: 0,
                                lastOffset: 0,
                                progress: !1
                            },
                            searching: !1,
                            highlightId: ""
                        })),
                        s.focusSearchBox(),
                        !r && l && s.loadMoreMessages())
                    }
                    ))
                };
                $t.a.search(e, null, {
                    convId: t.userId + ""
                }, (e=>{
                    n(e, !0)
                }
                )).then((e=>{
                    n(e)
                }
                ))
            }
            _getSearchDelaySetting() {
                return 70
            }
            _upSearchDelay() {
                let e = this.searchDelay;
                this.searchDelay = Math.min(400, Math.round(1.1 * this.searchDelay + 10 * Math.random())),
                e !== this.searchDelay && this._resetSearchFunction()
            }
            _downSearchDelay() {
                let e = this.searchDelay;
                this.searchDelay = Math.max(70, Math.round(.9 * this.searchDelay + 10 * Math.random())),
                e !== this.searchDelay && this._resetSearchFunction()
            }
            _resetSearchFunction() {
                Ke.default.logCoreError("__rssf__", this.searchDelay),
                this.functionSearchByName = Ke.default.throttle(this._innerSearchFunc, this.searchDelay)
            }
            _isSelectAllSearchText() {
                if (this.searchInput) {
                    const e = this.searchInput.selectionStart
                      , t = this.searchInput.selectionEnd;
                    return !(!this.searchInput.value.length || 0 != e || t != this.searchInput.value.length)
                }
                return !1
            }
            init() {}
            getItem(e) {
                return this.state
            }
            getList(e) {
                throw new Error("No imp!!!")
            }
            onGetItemFailure(e) {}
            onGetListFailure(e) {}
            loadOldestTime() {
                $t.a.getOldestTime().then((e=>{
                    null != e && e.length && e[0].ts ? this.oldestTime = parseFloat(e[0].ts) : this.oldestTime = 0
                }
                )).catch((e=>{
                    this.oldestTime = 0
                }
                ))
            }
            getOldestTime() {
                return this.oldestTime
            }
        }
        ) || zt) || zt) || zt) || zt) || zt);
        var ts, ss = s("OlUt"), is = s("jnrz"), ns = s("Anfm"), rs = s("BZLJ"), as = s("L+5E"), os = s("A9FD"), ls = s("BKm0"), cs = s("iKSP");
        const ds = {
            windowId: St.c,
            theme: ss.a.default,
            currentTab: ft.SidebarTab.MESSAGE_TAB,
            previousTab: ft.SidebarTab.MESSAGE_TAB,
            selectedId: null,
            previousId: null,
            showExportImportEntry: !0
        }
          , hs = "z_sendtome_bubbledot"
          , us = "SIDEBAR CONTROLLER";
        function gs() {
            for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                t[s] = arguments[s];
            Ke.default.logCoreInfo(`[${us}] - `, t)
        }
        Object(w.h)()(ts = Object(mt.b)(ft.SidebarController)(ts = function(e, t) {
            return l.ModuleContainer.inject(ft.ConvListController)(e, void 0, 0)
        }(ts = function(e, t) {
            return l.ModuleContainer.inject(Qt.b)(e, void 0, 1)
        }(ts = Reflect.metadata("design:type", Function)(ts = Reflect.metadata("design:paramtypes", [void 0 === ft.ConvListController ? Object : ft.ConvListController, void 0 === Qt.b ? Object : Qt.b])(ts = class {
            constructor(e, t) {
                var s = this;
                this.convListController = e,
                this.searchController = t,
                this.changeTabFromSearch = void 0,
                this._firstTimePageLoad = void 0,
                this._querySelect = void 0,
                this._convsLoaded = void 0,
                this._exportImportFinished = void 0,
                this._exportImportProgressError = void 0,
                this._allowAutoJumpFC = void 0,
                this._es = void 0,
                this._onSendMsg = e=>{
                    var t, s;
                    const i = (null == e || null === (t = e.messages) || void 0 === t || null === (s = t[0]) || void 0 === s ? void 0 : s.upSrc) & v.FILE_UP_SRC.TextEditor
                      , n = this.getState();
                    if (n.currentTab == ft.SidebarTab.TODO_TAB || n.currentTab == ft.SidebarTab.CATALOG_TAB || i || e.isChild)
                        return;
                    const r = this.searchController.getSearchState();
                    n.currentTab !== ft.SidebarTab.MESSAGE_TAB || r && r.searchText ? (n.currentTab = ft.SidebarTab.MESSAGE_TAB,
                    Object(Pe.g)(this.name, St.c),
                    Object(_e.f)({
                        type: Je.SideBarActions.SHOW_CHAT_VIEW
                    }),
                    r && r.searchText && vt.e.logAction(1232007),
                    this.searchController.clearSearch(!0)) : n.currentTab == ft.SidebarTab.MESSAGE_TAB && this.searchController.setRecentSearchFocusState(!1, !1, !0),
                    this.searchController.closeBySendingMsg = !0,
                    setTimeout((()=>{
                        this.convListController.scrollToTop(!1)
                    }
                    ), 100)
                }
                ,
                this.changeTab = function(e, t) {
                    void 0 === t && (t = St.c);
                    const i = s._getStateByWindowId(t);
                    i.currentTab !== e && (i.currentTab = e,
                    Object(Pe.g)(s.name, t)),
                    s._onChangeTab(i.currentTab)
                }
                ,
                this.togglePerfTab = e=>{
                    const t = this._getStateByWindowId(St.c);
                    t.showPerfTab !== e && (t.showPerfTab = e,
                    Object(Pe.g)(this.name, St.c))
                }
                ,
                this.changeTheme = async e=>{
                    const t = this._getStateByWindowId(St.c);
                    t.theme !== e && (t.theme = e,
                    Object(Pe.g)(this.name, St.c))
                }
                ,
                this.selectMessageTab = ()=>{
                    this.changeTab(ft.SidebarTab.MESSAGE_TAB)
                }
                ,
                this.selectTodoTab = ()=>{
                    this.changeTab(ft.SidebarTab.TODO_TAB),
                    vt.e.logAction(171),
                    rs.i.setViewPopupTodoSrc(rs.d.TAB_ICON)
                }
                ,
                this.selectContactFromSearch = async function(e, t) {
                    if (void 0 === t && (t = !1),
                    !e)
                        return gs("Select friend null!"),
                        Promise.resolve(!1);
                    const i = await l.ModuleContainer.resolve(jt.b).openConversation(e.userId, jt.c.fromSearchList(e));
                    return !0 === t ? (s.searchController.onCloseSearch(),
                    s.searchController.resetState()) : s.searchController.updateStateOf("highlightId", e.userId),
                    i ? (e && e.userId === qe.default.sendToMeId && (Ot.g.getFlagForCurrentUser(s.currUser.userId, hs) || (Ft.p.getHasShownSendToMeTip() ? Ot.g.setFlagForCurrentUser(s.currUser.userId, hs, 1) : setTimeout((()=>{
                        Ze.default.send(Je.ConversationListActions.SHOW_BUBBLE_DOT),
                        Ft.p.setHasShownSendToMeTip(!0)
                    }
                    ), 144e5)),
                    vt.e.logAction(1390101)),
                    Promise.resolve(!0)) : (gs("Open conv failure"),
                    Promise.resolve(!1))
                }
                ,
                this.setupSelectConvOnPageLoad = ()=>{
                    if (!this._firstTimePageLoad)
                        return;
                    let e = this._getQueryParams();
                    if (e.c) {
                        Ke.default.logCoreInfo(`[${this.name}] - setup select conv c`);
                        const t = e=>{
                            const t = {
                                [e]: !0
                            };
                            this._querySelect = ()=>{
                                let s;
                                s = e.startsWith(v.GROUPID_PREFIX) ? He.default.fetchGroupsIfNotExpire(t) : He.default.fetchFriendsIfNotExist(t),
                                s.then((t=>{
                                    t && t[e] ? this.selectContactFromSearch(t[e]) : Ke.default.logCoreInfo(`[${this.name}] - auto open conv with id ${e} does not exist`)
                                }
                                )).catch((e=>{
                                    Ke.default.logCoreError(e)
                                }
                                ))
                            }
                            ,
                            this._autoSelectConv()
                        }
                          , s = e.c;
                        e.convert ? He.default.convertOAIds([s]).then((e=>{
                            e && e[s] && t(e[s])
                        }
                        )) : t(s),
                        this._firstTimePageLoad = !1
                    } else if (e.g)
                        Ke.default.logCoreInfo(`[${this.name}] - setup select conv g`),
                        as.a.autoSelectGroupByLink(`https://${qe.default.CONFIG_DOMAIN}/g/` + encodeURIComponent(e.g));
                    else if (e.zs)
                        ;
                    else if (e.phone) {
                        let t = e.phone
                          , s = e.openConv;
                        !t || isNaN(t) || this._querySelect || (Ke.default.logCoreInfo(`[${this.name}] - setup select conv p`),
                        this._querySelect = ()=>{
                            s ? as.a.autoOpenConversationByPhone(t, _e.e) : as.a.autoSelectConversationByPhone(t, _e.e)
                        }
                        ,
                        this._autoSelectConv())
                    } else if (e.alias) {
                        Ke.default.logCoreInfo(`[${this.name}] - setup select conv a`);
                        let t = e.alias;
                        this._querySelect || (this._querySelect = ()=>{
                            as.a.autoSelectConversationByAlias(t, _e.e)
                        }
                        ,
                        this._autoSelectConv())
                    }
                }
                ,
                this.name = ft.SIDEBAR_CONTROLLER,
                this.data = new Map,
                this.key = "windowId",
                this.changeTabFromSearch = !1,
                this._firstTimePageLoad = !0,
                this._convsLoaded = !1,
                this._allowAutoJumpFC = !1,
                this.selectConversationForFriend = this.selectConversationForFriend.bind(this),
                this.listenEvents()
            }
            get currUser() {
                return Object(wt.c)()
            }
            get autoJumFC() {
                return this._allowAutoJumpFC
            }
            get eventStore() {
                return this._es || (this._es = s("emRR").default),
                this._es
            }
            onStart(e) {
                l.ModuleContainer.resolve(jt.b)
            }
            listenEvents() {
                Ze.default.subscribe(((e,t)=>{
                    switch (e) {
                    case Je.ChatBoxActions.SEND_MSG:
                        this._onSendMsg(t);
                        break;
                    case Je.ChatBoxActions.SELECT_FRIEND:
                        this.selectConversationForFriend(t);
                        break;
                    case Je.SideBarActions.SHOW_FILE_MANAGER:
                        this.getState().currentTab = ft.SidebarTab.FILE_TAB,
                        Object(Pe.g)(this.name, St.c);
                        break;
                    case Je.SideBarActions.SELECT_TAB_MSG:
                        this.changeTab(ft.SidebarTab.MESSAGE_TAB);
                        break;
                    case Je.SideBarActions.SELECT_ZAVI_TAB:
                        this.changeTab(ft.SidebarTab.ZAVI_TAB);
                        break;
                    case Je.FetchActions.DELETE_CONVERSATION:
                    case Je.FetchActions.GROUP_LEAVE:
                        {
                            const e = this.getState();
                            e.previousId && t === e.previousId && (e.previousId = null);
                            break
                        }
                    case Je.ChatBoxActions.JUMP_TO_MESSAGE_SEARCH_HIDDEN_CHAT:
                    case Je.ChatBoxActions.JUMP_TO_MESSAGE_SEARCH:
                        this.getState().currentTab == ft.SidebarTab.FILE_TAB && this.changeTab(ft.SidebarTab.MESSAGE_TAB);
                        break;
                    case Je.TodoActions.OPEN_TODO_LIST:
                        {
                            const e = Pt.b.instance().getTodoView();
                            e ? e.onCheckOpenTab() : this.changeTab(ft.SidebarTab.TODO_TAB);
                            break
                        }
                    case Je.ActionList.ACT_OPEN_TAB_CHAT:
                        this.selectMessageTab();
                        break;
                    case Je.ActionList.ACT_OPEN_TAB_CONTACT:
                        this.changeTab(ft.SidebarTab.CONTACT_TAB);
                        break;
                    case Je.ActionList.ACT_OPEN_GROUPLIST:
                        if (this.getState().currentTab === ft.SidebarTab.CONTACT_TAB) {
                            const e = Pt.b.instance().getContactList();
                            e && e.onJumpGroupCenter()
                        } else
                            this.changeTab(ft.SidebarTab.CONTACT_TAB);
                        break;
                    case ls.b.EXPORT_IMPORT_START:
                        this._exportImportFinished = !1,
                        this._exportImportProgressError = !1;
                        break;
                    case ls.b.EXPORT_IMPORT_FINISHED:
                        this._exportImportFinished = !0,
                        this._exportImportProgressError = !1;
                        break;
                    case ls.b.IMPORT_DB_PROGRESS:
                    case ls.b.IMPORT_PROGRESS:
                    case ls.b.EXPORT_PROGRESS:
                    case ls.b.EXPORT_DB_PROGRESS:
                        t && t.error && (this._exportImportProgressError = !0);
                        break;
                    case Je.ConversationListActions.SELECT_CONVERSATION:
                        {
                            const e = this.getState();
                            e.currentTab !== ft.SidebarTab.FILE_TAB && e.currentTab !== ft.SidebarTab.ZAVI_TAB && e.currentTab !== ft.SidebarTab.CATALOG_TAB || this.changeTab(ft.SidebarTab.MESSAGE_TAB);
                            break
                        }
                    }
                }
                )),
                ot.a.ConvInfoDataManager.addEventListener(yt.b.DoneLoadDB, (e=>{
                    this._convsLoaded = !0,
                    this._autoSelectConv()
                }
                )),
                ot.a.UnreadDataManager.addEventListener(yt.b.DoneLoadDB, (e=>{
                    is.b.onDoneLoadUnreadDB(null == e ? void 0 : e.payload)
                }
                ))
            }
            getState(e) {
                return void 0 === e && (e = St.c),
                this._getStateByWindowId(e)
            }
            getSelectedId(e) {
                return this.getState(e).selectedId || null
            }
            getCurrMainConvId() {
                const e = this.eventStore.getState();
                return e && e.chatview.view === cs.c.CHAT_VIEW ? this.getSelectedId() : null
            }
            updateSelectedId(e, t) {
                void 0 === t && (t = St.c);
                const s = this._getStateByWindowId(t);
                s.selectedId !== e && (s.previousId = e ? null : s.selectedId,
                s.selectedId = e,
                Object(Pe.g)(this.name, t))
            }
            isInImportExportProcess() {
                const e = this._exportImportFinished || this._exportImportProgressError;
                return void 0 !== e && !e
            }
            openFriendCenter() {}
            selectConversationForFriend(e, t) {
                if (void 0 === t && (t = !1),
                !e)
                    return void Ke.default.logCoreError("friend null");
                if (_e.f && (Object(_e.f)({
                    type: Je.ConversationListActions.SELECT_CONV_MINOR,
                    payload: e
                }),
                Object(_e.f)({
                    type: Je.ChatBoxActions.READ_CONVERSATION,
                    payload: {
                        conversationId: e.userId
                    }
                })),
                e.userId == this.currUser.userId)
                    return void this._showMyProfile();
                let s = this.convListController.getRecentContactWithId(e.userId)
                  , n = !1;
                if (s)
                    n = !0;
                else {
                    let t = t=>{
                        t && t.includes(e.userId) && (s = Object(i.a)({}, t[e.userId]))
                    }
                    ;
                    s || t(Nt.default.getGroupsListSync()),
                    s || t(rt.default.getFriendsSync()),
                    s || (s = {}),
                    Object.assign(s, e),
                    s.isFr = s.isFr || 0,
                    s.type = s.type || v.FRIEND_TYPE_NORMAL
                }
                e.byPassPIN ? s.byPassPIN = 1 : s.byPassPIN && delete s.byPassPIN,
                setTimeout((()=>{
                    Object(_e.f)({
                        type: Je.ConversationListActions.SELECT_CONVERSATION,
                        payload: s
                    })
                }
                ), 0);
                const r = this.data.get(St.c);
                let a = null == r ? void 0 : r.currentTab;
                !0 === t ? (a = n ? ft.SidebarTab.MESSAGE_TAB : ft.SidebarTab.CONTACT_TAB,
                a === ft.SidebarTab.CONTACT_TAB && (Ke.default.log("sidebar: select from search, should highlight thread"),
                this.changeTabFromSearch = !0),
                this.searchController.onCloseSearch(),
                this.searchController.resetState(),
                !e.userId || !e.byPassPIN && Ct.a.isThreadHidden(e.userId) || setTimeout((()=>{
                    Ze.default.send(Je.ChatBoxActions.FOCUS_INPUT, {
                        userId: e.userId,
                        windowId: St.c
                    })
                }
                ), 0)) : this.searchController.updateStateOf("highlightId", e.userId),
                this.updateState(Object(i.a)(Object(i.a)({}, r), {}, {
                    currentTab: a,
                    selectedId: e.userId
                })),
                e && e.userId === qe.default.sendToMeId && (Ot.g.getFlagForCurrentUser(this.currUser.userId, hs) || (Ft.p.getHasShownSendToMeTip() ? Ot.g.setFlagForCurrentUser(this.currUser.userId, hs, 1) : setTimeout((()=>{
                    Ze.default.send(Je.ConversationListActions.SHOW_BUBBLE_DOT),
                    Ft.p.setHasShownSendToMeTip(!0)
                }
                ), 144e5)))
            }
            showAddFriendModal() {
                vt.e.logAction(1020203),
                vt.e.logAction(12316),
                _t.ModalManagerV2.openModal({
                    windowId: St.c,
                    name: v.ModalIdentitiesDefine.FIND_FRIEND
                })
            }
            showGroupCompose() {
                vt.e.logAction(1020202),
                ns.c.markStart(ns.a.CREATE_GROUP, ns.b.Group.CREATE_GR_HEADER_ICON);
                const e = Ft.p.getSessionUserId()
                  , t = function(e) {
                    void 0 === e && (e = !0),
                    _t.ModalManagerV2.openModal({
                        windowId: St.c,
                        name: v.ModalIdentitiesDefine.CREATE_GROUP_COMPOSE,
                        params: {
                            needInitE2ee: e
                        },
                        forceCloseAll: !1
                    })
                };
                !Ot.g.getTimeEntryPointE2eGroup(e, ns.b.Group.CREATE_GR_HEADER_ICON) && qe.default.e2ee.enable_group && qe.default.e2ee.group.can_enable_right_in_creation_step ? _t.ModalManagerV2.openModal({
                    windowId: St.c,
                    name: v.ModalIdentitiesDefine.E2EE_ONBOARDING,
                    params: {
                        entry: os.e.CREATE_GROUP,
                        entrySrc: ns.b.Group.CREATE_GR_HEADER_ICON,
                        isGroup: !0,
                        userId: "",
                        callback: t,
                        callbackCancel: t
                    },
                    forceCloseAll: !1
                }) : t(!1)
            }
            enableAutoJupmFC() {
                this._allowAutoJumpFC = !0
            }
            disableAutoJupmFC() {
                this._allowAutoJumpFC = !1
            }
            init() {}
            getItem(e) {
                const t = e.key;
                return this._getStateByWindowId(t)
            }
            getList(e) {
                return Array.from(this.data.keys())
            }
            onGetItemFailure(e) {}
            onGetListFailure(e) {}
            updateState(e, t, s) {
                void 0 === t && (t = St.c),
                void 0 === s && (s = !0),
                this.data.set(t, e),
                s && Object(Pe.g)(this.name, t)
            }
            _getStateByWindowId(e) {
                let t = this.data.get(e);
                return t || (t = Object(i.a)({}, ds),
                this.data.set(e, t)),
                t
            }
            _onChangeTab(e) {
                switch (function() {
                    switch (e) {
                    case ft.SidebarTab.MESSAGE_TAB:
                        vt.e.logAction(12801);
                        break;
                    case ft.SidebarTab.CONTACT_TAB:
                        vt.e.logAction(12802),
                        3 === qe.default.noti_center_config.entry_position && vt.e.logAction(1281205);
                        break;
                    case ft.SidebarTab.MENTION_TAB:
                        vt.e.logAction(12805);
                        break;
                    case ft.SidebarTab.STAR_TAB:
                        vt.e.logAction(12806);
                        break;
                    case ft.SidebarTab.FILE_TAB:
                        vt.e.logAction(133);
                        break;
                    case ft.SidebarTab.TODO_TAB:
                        3 === qe.default.noti_center_config.entry_position && vt.e.logAction(1281206);
                        break;
                    case ft.SidebarTab.ZAVI_TAB:
                        vt.e.logAction(20701)
                    }
                }(),
                Ft.p.resetGlobalSearchMode(),
                this.searchController.clearSearch(!0),
                e) {
                case ft.SidebarTab.MESSAGE_TAB:
                    {
                        this._resetConversationList();
                        const e = this.getState();
                        !e.selectedId && e.previousId && this.updateSelectedId(e.previousId),
                        Object(_e.f)({
                            type: Je.SideBarActions.SHOW_CHAT_VIEW
                        });
                        break
                    }
                case ft.SidebarTab.ZAVI_TAB:
                    Object(_e.f)({
                        type: Je.SideBarActions.SELECT_ZAVI
                    });
                case ft.SidebarTab.TODO_TAB:
                }
            }
            _showMyProfile() {
                _t.ModalManagerV2.openModal({
                    windowId: St.c,
                    name: v.ModalIdentitiesDefine.FRIEND_PROFILE,
                    params: this.currUser.userId
                })
            }
            _resetConversationList() {}
            _getQueryParams() {
                let e = {}
                  , t = window.location.search;
                if (t = t ? t.substr(1).split("&") : null,
                t)
                    for (let s = 0; s < t.length; s++) {
                        let i = t[s].indexOf("=");
                        if (i >= 0) {
                            let n = t[s].slice(0, i)
                              , r = t[s].slice(i + 1, t[s].length);
                            n && n.length > 0 && r && r.length > 0 && (e[n] = decodeURIComponent(r))
                        }
                    }
                return e
            }
            _autoSelectConv() {
                this._querySelect && this._convsLoaded && (Ke.default.logCoreInfo(`[${this.name}] - auto select conv start`),
                this._querySelect(),
                this._querySelect = null)
            }
        }
        ) || ts) || ts) || ts) || ts) || ts);
        var ps;
        const ms = {
            id: ht.g,
            color: "#EA87FF",
            conversations: [],
            createTime: 1634956772046,
            emoij: "",
            offset: 100,
            text: "default"
        };
        var fs;
        !function(e) {
            e.ALL = "all",
            e.SELECTED = "selected"
        }(fs || (fs = {}));
        Object(mt.b)(ft.LabelDataManager)(ps = Reflect.metadata("design:type", Function)(ps = Reflect.metadata("design:paramtypes", [])(ps = class extends k.b {
            constructor() {
                super(),
                this.allLabels = void 0,
                this.selectedLabel = void 0,
                this.name = ft.LABEL_DATA_MANAGER,
                this.data = new Map,
                this.key = "labelId",
                this.allLabels = [],
                this.selectedLabel = []
            }
            onLabelChange(e) {
                const {color: t, conversations: s, createTime: i, emoij: n, offset: r, text: a} = e
                  , o = "" + e.id
                  , l = this.data.get(o);
                if (!o || l && s === l.conversations && i == (null == l ? void 0 : l.createTime) && n == l.emoij && r == l.offset && a === l.text && t == l.color || (this.data.set(o, e),
                Object(Pe.g)(this.name, o),
                Object(Pe.h)(this.name, "all")),
                l && l.conversations && l.conversations.length !== s.length) {
                    let e = [];
                    s.length > l.conversations.length ? (e = s.filter((e=>!l.conversations.includes(e))),
                    this.dispatchEvent(new bt.c(bt.d.LabelAddConvs,{
                        labelId: o,
                        convIds: e
                    }))) : (e = l.conversations.filter((e=>!s.includes(e))),
                    this.dispatchEvent(new bt.c(bt.d.LabelRemoveConvs,{
                        labelId: o,
                        convIds: e
                    })))
                }
            }
            onFetchLabels(e) {
                if (Array.isArray(e) && !(e.length < 0)) {
                    for (let t = 0; t < e.length; t++)
                        this.onLabelChange(e[t]);
                    this.data.forEach((t=>{
                        const s = "" + t.id;
                        e.some((e=>e.id == s)) || this.data.delete(s)
                    }
                    )),
                    this._updateAllLabels(e.map((e=>e.id)))
                }
            }
            onLabelDeleted(e) {
                "string" != typeof e && (Ke.default.logCoreError(`[${this.name}] - delete label invalid lid type ${e}`),
                e = "" + e),
                this.data.has(e) ? (this.data.delete(e),
                this._updateAllLabels(this.allLabels.filter((t=>t !== e))),
                this.selectedLabel.includes(e) && this.onDeSelectLabel(e),
                Object(Pe.e)(this.name, e)) : Ke.default.logCoreError(this.name + "Deleted not exists item!!!")
            }
            _updateAllLabels(e) {
                return !Ke.default.shallowEqual(this.allLabels, e) && (this.allLabels = e,
                Object(Pe.h)(this.name, fs.ALL),
                !0)
            }
            onSelectLabel(e) {
                this.selectedLabel = ["" + e],
                Object(Pe.h)(this.name, fs.SELECTED),
                this.selectedLabelChanged()
            }
            onDeSelectLabel(e) {
                this.selectedLabel = this.selectedLabel.filter((t=>t !== e)),
                Object(Pe.h)(this.name, fs.SELECTED),
                this.selectedLabelChanged()
            }
            onClearFilter() {
                this.selectedLabel = [],
                Object(Pe.h)(this.name, fs.SELECTED),
                this.selectedLabelChanged()
            }
            getLabelById(e) {
                return e ? ("string" != typeof e && (e = e.toString()),
                e == ht.g ? ms : e == ht.h ? {
                    id: ht.h
                } : this.data.get(e) || null) : null
            }
            getAllLabels() {
                return Array.from(this.data.values())
            }
            getAllLabelIds() {
                return this.allLabels
            }
            applyNewFilter(e) {
                this.selectedLabel = e,
                Object(Pe.h)(this.name, fs.SELECTED),
                this.selectedLabelChanged()
            }
            selectedLabelChanged() {
                this.dispatchEvent(new bt.c(bt.d.SelectedLabelChange,this.selectedLabel))
            }
            init() {
                Et.b.getAll().then((e=>{
                    this.onFetchLabels(e)
                }
                ))
            }
            getItem(e) {
                const t = e.key;
                return this.getLabelById(t)
            }
            getList(e) {
                const t = e.key;
                return t === fs.ALL ? this.allLabels : t === fs.SELECTED ? this.selectedLabel : []
            }
            onGetItemFailure(e) {}
            onGetListFailure(e) {}
        }
        ) || ps) || ps);
        l.ModuleContainer.register(ct.b, gt);
        var vs = s("k+R1")
          , bs = s("Py3H");
        let Is;
        !function(e) {
            e[e.FULL = 0] = "FULL",
            e[e.WINDOWED = 1] = "WINDOWED"
        }(Is || (Is = {}));
        var ys, Cs = s("tQbm"), Ss = s("qzuk"), Es = s("NMlV"), _s = s("4HQc"), Ts = s("8RMw"), Ls = s("lPX+"), Os = s("OU7N"), Fs = s("UYGI"), Rs = s("X4fA"), ws = s("V8Oy"), Ms = s("7WX+");
        let Ds;
        Ke.default.isWeb() || (Ds = s("Dprd").default);
        const As = {
            conversationId: null,
            mode: Is.FULL,
            windowId: St.c
        };
        Object(mt.b)(Cs.b)(ys = function(e, t) {
            return l.ModuleContainer.inject(ft.SidebarController)(e, void 0, 0)
        }(ys = Reflect.metadata("design:type", Function)(ys = Reflect.metadata("design:paramtypes", [void 0 === ft.SidebarController ? Object : ft.SidebarController])(ys = class extends k.b {
            constructor(e) {
                super(),
                this.sidebar = e,
                this.data = new Map,
                this.onLogOut = ()=>{
                    if (Os.c.isCalling())
                        return void Mt.a.createWarning(Dt.default.str("STR_SIGNOUT_WITH_CALL"));
                    let e = Ft.p.getSessionUserId()
                      , t = "STR_LOGOUT_CONFIRM"
                      , s = +Fs.a.isUploading();
                    if (!s && Ds && Ds.isDownloading() && (s = 2),
                    s > 0) {
                        const e = 1 === s ? Dt.default.str("STR_TITLE_BAR_SEND") : Dt.default.str("STR_TITLE_BAR_RECEIVE");
                        t = Dt.default.str("STR_LOGOUT_CANCEL_FILE") + ` ${e} ` + Dt.default.str("STR_TITLE_BAR_EXIT_ZALO_P2")
                    }
                    Rs.a.getLogoutToken(),
                    At.a.openConfirm({
                        windowId: St.c,
                        name: v.MODAL_CONFIRM.confirmIdentities,
                        params: {
                            message: Dt.default.str(t),
                            okText: Dt.default.str("STR_LOGOUT_YES"),
                            cancelText: Dt.default.str("STR_LOGOUT_NO"),
                            onOk: this.doLogout,
                            options: [{
                                default_val: Ot.g.isSetClearData(e),
                                key: "del_history",
                                title: "STR_LOGOUT_DEL_HISTORY"
                            }],
                            "data-id": {
                                confirmBtn: "btn_Logout_Logout",
                                cancelBtn: "btn_Logout_No"
                            }
                        }
                    })
                }
                ,
                this.openConversationInNewWindow = async e=>{
                    throw new Error("Method not implemented.")
                }
                ,
                this.openScreenCapture = async()=>{
                    vt.e.logAction(12808),
                    Ze.default.send(Je.ChatBoxActions.SIDEBAR_CAPTURE)
                }
                ,
                this.openZaloSupport = async()=>{
                    const e = qe.default.supportPage;
                    return e ? l.ModuleContainer.resolve(jt.b).openConversation(e, jt.c.fromSupport()) : Promise.resolve(!1)
                }
                ,
                this.openUpdateMyProfile = async()=>{
                    _t.ModalManagerV2.openModal({
                        windowId: St.c,
                        name: v.ModalIdentitiesDefine.UPDATE_PROFILE,
                        params: {
                            showCloseButton: !0
                        }
                    })
                }
                ,
                this.openUserInfo = async e=>{
                    bs.a.setFriendRequestSource(e, v.FRIEND_REQUEST_SRC_CONTACT_LIST_SUGGESTION),
                    Ft.p.setSelectConversationSource(178012),
                    _t.ModalManagerV2.openModal({
                        windowId: St.c,
                        name: v.ModalIdentitiesDefine.FRIEND_PROFILE,
                        params: e
                    })
                }
                ,
                this.openEditAlias = async e=>{
                    const t = {
                        windowId: St.c,
                        name: v.ModalIdentitiesDefine.EDIT_ALIAS,
                        params: Object(i.a)({}, e)
                    };
                    _t.ModalManagerV2.openModal(t)
                }
                ,
                this.sendFile = async(e,t)=>{
                    const s = this._getStateByWindowId(St.c)
                      , i = vs.default.getChatBoxControllerByConvId(t || s.conversationId);
                    null == i || i._uploadDragFile(e, null, t)
                }
                ,
                this.getConvId = ()=>this._getStateByWindowId(St.c).conversationId,
                this.sendDirectMsgToSendToMe = (e,t)=>{
                    !qe.default.isOffSendToMe && this.chatboxController && ce.default.getConversation(qe.default.sendToMeId).then((s=>{
                        if (e === v.MSG_GIF && t.url) {
                            var i;
                            let e = {
                                hd: {
                                    width: t.width ? t.width : 0,
                                    height: t.height ? t.height : 0,
                                    url: t.url
                                },
                                original: {
                                    width: t.width ? t.width : 0,
                                    height: t.height ? t.height : 0,
                                    url: t.url
                                },
                                normal: {
                                    width: t.width ? t.width : 0,
                                    height: t.height ? t.height : 0,
                                    url: t.url
                                }
                            };
                            null === (i = this.chatboxController) || void 0 === i || i._sendMessage(s, v.MSG_GIF, e, null, null, null, null, null)
                        }
                        Object(_e.e)({
                            type: Je.ConversationListActions.SELECT_CONVERSATION,
                            payload: s
                        }),
                        this.sidebar.updateSelectedId(qe.default.sendToMeId)
                    }
                    ))
                }
                ,
                this.broadCastMessage = (e,t,s,i)=>{
                    if (e && t)
                        for (let l = 0; l < e.length; l++) {
                            const c = e[l];
                            if (c) {
                                let e = c.userId
                                  , l = e.startsWith(v.GROUPID_PREFIX);
                                if (t.msgType === v.MSG_STICKER) {
                                    var n;
                                    const o = Es.a.next();
                                    t && t.sendSrc && ns.c.track(o, t.sendSrc);
                                    const d = new _s.b(Ft.p.getSessionUserId(),e,o,o,v.MSG_STICKER,l)
                                      , h = null === Ts.default || void 0 === Ts.default || null === (n = Ts.default.signalProtocolManager) || void 0 === n ? void 0 : n.isOnE2ee(c.userId);
                                    if (d.updateMessageContentProp(_s.a.STICKER, t.message),
                                    h) {
                                        var r;
                                        const e = {
                                            id: d.content.sticker.id,
                                            catId: d.content.sticker.cateId,
                                            type: d.content.sticker.type
                                        };
                                        var a;
                                        if (null !== (r = t.message) && void 0 !== r && r.fssInfo)
                                            e.extInfo = null === (a = t.message) || void 0 === a ? void 0 : a.fssInfo;
                                        d.updateMessageContentProp(_s.a.STICKER, e),
                                        d.e2eeStatus = v.MSG_E2EE
                                    }
                                    He.default.sendMsgObject(d).then((t=>{
                                        if (s) {
                                            const t = Es.a.next();
                                            let i = new _s.b(Ft.p.getSessionUserId(),e,t,t,v.MSG_TEXT,l);
                                            i.updateMessageContentProp(_s.a.TEXT, s),
                                            h && (i.e2eeStatus = v.MSG_E2EE),
                                            He.default.sendMsgObject(i).then((e=>{
                                                h && (e = Ke.default.parseE2eeResp(e),
                                                this.chatboxController._showLocalMessage(i, c),
                                                this.chatboxController._sentMessage(i, e))
                                            }
                                            )).catch((e=>{}
                                            ))
                                        }
                                        h && (t = Ke.default.parseE2eeResp(t),
                                        this.chatboxController._showLocalMessage(d, c),
                                        this.chatboxController._sentMessage(d, t)),
                                        i && i(t)
                                    }
                                    )).catch((e=>{
                                        Ke.default.logCoreError("BroadcastErr: ", e),
                                        i && i(e)
                                    }
                                    ))
                                } else if (t.msgType === v.MSG_TEXT && s) {
                                    var o;
                                    const t = Es.a.next();
                                    let n = new _s.b(Ft.p.getSessionUserId(),e,t,t,v.MSG_TEXT,l);
                                    n.updateMessageContentProp(_s.a.TEXT, s);
                                    (null === Ts.default || void 0 === Ts.default || null === (o = Ts.default.signalProtocolManager) || void 0 === o ? void 0 : o.isOnE2ee(c.userId)) && (n.e2eeStatus = v.MSG_E2EE),
                                    He.default.sendMsgObject(n).then((e=>{
                                        i && i(e)
                                    }
                                    )).catch((e=>{
                                        i && i(e)
                                    }
                                    ))
                                }
                            }
                        }
                }
                ,
                this.handleEvent = (e,t)=>{
                    if (e === Je.ConversationListActions.SELECT_CONVERSATION) {
                        const e = this._getStateByWindowId(St.c);
                        if (t.userId !== e.conversationId)
                            return this._updateStateByWindowId(St.c, (e=>Object(i.a)(Object(i.a)({}, e), {}, {
                                conversationId: t.userId
                            }))),
                            Object(Pe.g)(this.name, St.c),
                            void this.dispatchEvent(new Ss.a(t.userId,St.c))
                    }
                }
                ,
                this.name = Cs.a,
                this.key = "windowId",
                this.init()
            }
            get chatboxController() {
                const e = this.sidebar.getState().selectedId;
                return vs.default.getChatBoxControllerByConvId(e || St.b)
            }
            onInviteFriend() {
                const e = [Ls.a];
                _t.ModalManagerV2.openModal({
                    windowId: St.c,
                    name: v.ModalIdentitiesDefine.SHARE_MSG_COMPOSE,
                    params: {
                        messages: e,
                        title: Dt.default.str("STR_INVITE_FRIEND_1"),
                        disableGroup: !0,
                        disablePcUser: !0,
                        callback: (e,t)=>{
                            Ze.default.send(Je.SideBarActions.SEND_INVITATION, {
                                target: e,
                                message: (null == t ? void 0 : t.length) > 0 ? t[0] : "",
                                link: `https://${qe.default.CONFIG_DOMAIN}/may-tinh`
                            })
                        }
                    }
                })
            }
            onWhatNew() {
                _t.ModalManagerV2.openModal({
                    windowId: St.c,
                    name: v.ModalIdentitiesDefine.APP_UPDATE_INFO,
                    params: {
                        data: ce.default.getCacheRecentUpdate(),
                        isManual: !0
                    }
                })
            }
            showMyProfile() {
                let e = Ft.p.getSessionUserId();
                _t.ModalManagerV2.openModal({
                    windowId: St.c,
                    name: v.ModalIdentitiesDefine.FRIEND_PROFILE,
                    params: e
                })
            }
            get mainWindowConversationId() {
                return this._getStateByWindowId(St.c).conversationId
            }
            doLogout(e) {
                let t = Ft.p.getSessionUserId();
                e && e.del_history ? Ot.g.setClearData(t, 1) : Ot.g.setClearData(t, 0),
                ws.a.logout(),
                Ms.a.logout(),
                Rs.a.logout().catch((e=>{
                    e.error_code && 18032 === e.error_code && _t.ModalManagerV2.openModal({
                        windowId: St.c,
                        name: v.ModalIdentitiesDefine.CHANGE_PW
                    })
                }
                ))
            }
            init() {
                Ze.default.subscribe(this.handleEvent)
            }
            getItem(e, t) {
                return this._getStateByWindowId(e.key)
            }
            getList(e, t) {
                return Array.from(this.data.keys())
            }
            onGetItemFailure(e) {}
            onGetListFailure(e) {}
            _getStateByWindowId(e) {
                let t = this.data.get(e);
                return t || (t = Object(i.a)({}, As),
                this.data.set(e, t)),
                t
            }
            _updateStateByWindowId(e, t) {
                const s = t(this._getStateByWindowId(e));
                this.data.set(e, s)
            }
        }
        ) || ys) || ys) || ys);
        var Ps, js = s("OI//");
        let Ns = l.ModuleContainer.injectable()(Ps = class {
            async get(e) {
                return Nt.default.getGroupByIdSync(e)
            }
            async getAll() {
                return await Nt.default.getGroupsListSync()
            }
        }
        ) || Ps;
        var Bs;
        let Us = l.ModuleContainer.injectable()(Bs = function(e, t) {
            return l.ModuleContainer.inject(js.c)(e, void 0, 0)
        }(Bs = function(e, t) {
            return l.ModuleContainer.inject(P.ZLoggerFactory)(e, void 0, 1)
        }(Bs = Reflect.metadata("design:type", Function)(Bs = Reflect.metadata("design:paramtypes", [void 0 === js.c ? Object : js.c, void 0 === P.ZLoggerFactory ? Object : P.ZLoggerFactory])(Bs = class {
            constructor(e, t) {
                this.groupRepository = e,
                this.logger = void 0,
                this.logger = t.createZLogger("groups", ["group-manager"])
            }
            getAll() {
                return this.groupRepository.getAll().then((e=>e.map((e=>new js.a(e))))).catch((e=>(this.logger.zsymb(18, 8176, 3e4, (()=>["getAll error. return [].", {
                    reason: e
                }])),
                [])))
            }
            get(e) {
                return this.groupRepository.get(e).then((e=>e ? new js.a(e) : void 0)).catch((e=>{
                    this.logger.zsymb(18, 8176, 30001, (()=>["get error. return undefined.", {
                        reason: e
                    }]))
                }
                ))
            }
        }
        ) || Bs) || Bs) || Bs) || Bs) || Bs;
        l.ModuleContainer.registerSingleton(js.c, Ns),
        l.ModuleContainer.registerSingleton(js.b, Us);
        var ks, Gs = s("MqnV"), xs = s("yEZN");
        let zs = l.ModuleContainer.injectable()(ks = function(e, t) {
            return l.ModuleContainer.inject(ut.d)(e, void 0, 0)
        }(ks = function(e, t) {
            return l.ModuleContainer.inject(xs.b)(e, void 0, 1)
        }(ks = function(e, t) {
            return l.ModuleContainer.inject(ut.f)(e, void 0, 2)
        }(ks = Reflect.metadata("design:type", Function)(ks = Reflect.metadata("design:paramtypes", [void 0 === ut.d ? Object : ut.d, void 0 === xs.b ? Object : xs.b, void 0 === ut.f ? Object : ut.f])(ks = class {
            constructor(e, t, s) {
                this.conversationRepository = e,
                this.messageManager = t,
                this.muteManager = s
            }
            async get(e) {
                const t = await this.conversationRepository.get(e).catch((()=>{}
                ));
                if (t)
                    return new ut.c(t,this,this.messageManager)
            }
            isPinned(e) {
                return this.conversationRepository.get(e).then((e=>!(null == e || !e.pinned))).catch((()=>!1))
            }
            isMuted(e) {
                return !!this.muteManager.isMuted(e)
            }
        }
        ) || ks) || ks) || ks) || ks) || ks) || ks;
        var Vs;
        let $s = l.ModuleContainer.injectable()(Vs = function(e, t) {
            return l.ModuleContainer.inject(ut.b)(e, void 0, 0)
        }(Vs = Reflect.metadata("design:type", Function)(Vs = Reflect.metadata("design:paramtypes", [void 0 === ut.b ? Object : ut.b])(Vs = class {
            constructor(e) {
                this.convManager = e
            }
            get(e) {
                return this.convManager.getConvById(e)
            }
        }
        ) || Vs) || Vs) || Vs) || Vs;
        var qs = s("SVh1");
        var Ws, Hs = new class {
            constructor() {}
            showMyProfile() {
                _t.ModalManagerV2.openModal({
                    windowId: St.c,
                    name: v.ModalIdentitiesDefine.FRIEND_PROFILE,
                    params: Ft.p.getSessionUserId()
                })
            }
        }
        , Ks = s("idnp"), Qs = s("SWHF"), Zs = s("rkiK");
        function Js() {
            for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                t[s] = arguments[s];
            Ke.default.logCoreInfo("[Conversation controller] - ", t)
        }
        let Xs = Object(l.singleton)()(Ws = Object(l.injectable)()(Ws = function(e, t) {
            return Object(l.inject)(ut.h)(e, void 0, 0)
        }(Ws = function(e, t) {
            return Object(l.inject)(Qs.b)(e, void 0, 1)
        }(Ws = function(e, t) {
            return Object(l.inject)(ft.SidebarController)(e, void 0, 2)
        }(Ws = function(e, t) {
            return Object(l.inject)(ut.b)(e, void 0, 3)
        }(Ws = Reflect.metadata("design:type", Function)(Ws = Reflect.metadata("design:paramtypes", [void 0 === ut.h ? Object : ut.h, void 0 === Qs.b ? Object : Qs.b, void 0 === ft.SidebarController ? Object : ft.SidebarController, void 0 === ut.b ? Object : ut.b])(Ws = class {
            constructor(e, t, s, i) {
                this.previewManager = e,
                this.adminSettingController = t,
                this.sidebar = s,
                this.convDataManager = i,
                this.ipc = void 0,
                this.lastOpenConv = new Map,
                this._es = void 0,
                this.onRequestJumtoMsg = (e,t)=>{
                    const s = t.conversation
                      , i = e === Je.ChatBoxActions.JUMP_TO_MESSAGE_SEARCH_HIDDEN_CHAT || Ct.a.getListChatBoxViewCurrent().includes(null == s ? void 0 : s.userId) || s.byPassPIN;
                    if (!s)
                        return;
                    if (s && !i && Ct.a.isThreadHidden(s.userId))
                        return Object(wt.b)({
                            type: e,
                            payload: t
                        }, !0),
                        void Js("req jum to msg rejected because hidden chat");
                    Zs.e.Fps.record(Zs.b.fps_jump_to_msg),
                    Js("req jum to msg open on main"),
                    Object(wt.b)({
                        type: e,
                        payload: t
                    }, !0);
                    const n = Ks.b.fromJumpMessage();
                    this.openConversationForJump(s.userId, n)
                }
                ,
                this.tryToFocusChild = (e,t)=>!!vs.default.isOpenChildWindowByConvId(e) && (Js("Open conv forward because already open in child => call focus"),
                vs.default.focusOnChildWindow(e, null == t ? void 0 : t.callPoint),
                !0),
                this.handleOutConversation = e=>{
                    this.closeConversation(e.convId)
                }
                ,
                this.listenEvent()
            }
            get eventStore() {
                return this._es || (this._es = s("emRR").default),
                this._es
            }
            listenEvent() {
                Ze.default.subscribe(((e,t)=>{
                    switch (e) {
                    case Je.ConversationListActions.SELECT_CONVERSATION_HIDDEN:
                        this.sidebar.updateSelectedId(t.userId);
                        break;
                    case Je.ChatBoxActions.OPEN_CONV_JUMP_TO_MESSAGE_SEARCH:
                        this.onRequestJumtoMsg(Je.ChatBoxActions.JUMP_TO_MESSAGE_SEARCH, t);
                        break;
                    case Je.ChatBoxActions.OPEN_CONV_JUMP_TO_MESSAGE_SEARCH_HIDDEN_CHAT:
                        this.onRequestJumtoMsg(Je.ChatBoxActions.JUMP_TO_MESSAGE_SEARCH_HIDDEN_CHAT, t)
                    }
                }
                )),
                this.convDataManager.addEventListener(yt.b.DeleteConv, this.handleOutConversation),
                this.convDataManager.addEventListener(yt.b.EmptyConv, this.handleOutConversation),
                this.convDataManager.addEventListener(yt.b.LeaveGroup, this.handleOutConversation)
            }
            isConvOpeningInMain(e) {
                const t = this.eventStore.getState()
                  , s = this.sidebar.getState().selectedId;
                return t && t.chatview.view === cs.c.CHAT_VIEW && s === e
            }
            openConversationForJump(e, t) {
                return void 0 === t && (t = Ks.a),
                new Promise((async s=>{
                    if (Js(`Request open conv for jum: ${e}`),
                    !e || this.isConvOpeningInMain(e)) {
                        if (Js(`Open conv rejected because null or opened: ${e}`),
                        e) {
                            this.tryToFocusChild(e, t) || vs.default.focusOnMainWindow()
                        }
                        return s(!1)
                    }
                    if (!(await this.conversationWillOpen(e)))
                        return s(!1);
                    let i = !1;
                    if (t.window === qs.b.Child)
                        return i = this.tryToFocusChild(e, t),
                        s(i);
                    if (t.window === qs.b.PreferChild) {
                        if (i = this.tryToFocusChild(e, t),
                        i)
                            return s(!0)
                    } else
                        t.window === qs.b.MainAndChild && (i = this.tryToFocusChild(e, t));
                    i || vs.default.focusOnMainWindow(),
                    Ze.default.send(Je.ConversationListActions.SELECT_CONV_MINOR, {
                        userId: e
                    }),
                    Object(wt.b)({
                        type: Je.ConversationListActions.OPEN_CONV_FOR_JUMP,
                        payload: {
                            userId: e
                        }
                    }),
                    this.sidebar.updateSelectedId(e),
                    s(!0),
                    this.conversationDidOpen(e)
                }
                ))
            }
            openConversation(e, t) {
                return void 0 === t && (t = Ks.a),
                new Promise((async(s,n)=>{
                    if (Js(`Request open conv from: ${e} - ${t.callPoint}`),
                    !e || this.isConvOpeningInMain(e) && !t.force) {
                        if (Js(`Open conv rejected because null or opened: ${e}`),
                        e) {
                            this.tryToFocusChild(e, t) || vs.default.focusOnMainWindow()
                        }
                        return s(!1)
                    }
                    const r = Ft.p.getSessionUserId();
                    if (e == r)
                        return Hs.showMyProfile(),
                        s(!1);
                    Zs.e.Fps.record(Zs.b.fps_switch_conv);
                    if (!(await this.conversationWillOpen(e)))
                        return s(!1);
                    let a = !1;
                    if (t.window === qs.b.Child)
                        return a = this.tryToFocusChild(e, t),
                        s(a);
                    if (t.window === qs.b.PreferChild) {
                        if (a = this.tryToFocusChild(e, t),
                        a)
                            return s(!0)
                    } else
                        t.window === qs.b.MainAndChild && (a = this.tryToFocusChild(e, t));
                    let o = t.credentConv;
                    if (o || (o = await ce.default.getLikeConversation(e).catch((e=>{
                        Js(`Failure to load conv from store ${e}`)
                    }
                    )),
                    Js(`Try to use storage conv: ${!!o}`)),
                    o || (o = t.defaultConv,
                    Js(`Try to use default conv: ${!!o}`)),
                    !o)
                        return Js(`Open conv not exists: ${e}`),
                        s(!1);
                    a || vs.default.focusOnMainWindow(),
                    Ze.default.send(Je.ConversationListActions.SELECT_CONV_MINOR, o);
                    const l = Ct.a.isThreadHidden(e);
                    l && Ct.a.checkShowUnreadHiddenChat(e),
                    t.byPassPIN ? (o = Object(i.a)({}, o),
                    o.byPassPIN = 1) : delete o.byPassPIN,
                    this.eventStore.dispatch({
                        type: Je.ConversationListActions.SELECT_CONVERSATION,
                        payload: o
                    }),
                    Ze.default.send(Je.ConversationListActions.SELECT_CONVERSATION, {
                        userId: o.userId,
                        needScroll: t.callPoint !== qs.a.ConvItem,
                        callPoint: t.callPoint
                    });
                    (!l || t.byPassPIN || Ct.a.getListChatBoxViewCurrent().includes(o.userId)) && this.sidebar.updateSelectedId(e),
                    s(!0),
                    this.conversationDidOpen(e)
                }
                ))
            }
            closeConversation(e, t) {
                return void 0 === t && (t = St.c),
                new Promise((s=>{
                    if (e && this.sidebar.getState().selectedId !== e)
                        return s(!1);
                    if (t === St.c) {
                        const e = {
                            conversation: null,
                            convId: null
                        };
                        this.eventStore.dispatch({
                            type: Je.ConversationListActions.SELECT_CONVERSATION,
                            payload: e
                        }),
                        Ze.default.send(Je.ConversationListActions.SELECT_CONVERSATION, e),
                        this.sidebar.updateSelectedId(null)
                    }
                    s(!0)
                }
                ))
            }
            closeAllConversations() {
                return Promise.resolve(!0)
            }
            deleteConversation(e, t) {
                return void 0 === t && (t = St.c),
                new Promise((async s=>{
                    if (this.conversationWillDelete(e),
                    await dt.a.deleteConversation(e, !0, t),
                    t === St.c) {
                        const t = {
                            userId: null
                        };
                        this.eventStore.dispatch({
                            type: Je.ConversationListActions.SELECT_CONVERSATION,
                            payload: t
                        }),
                        Ze.default.send(Je.ConversationListActions.SELECT_CONVERSATION, t),
                        this.sidebar.updateSelectedId(null),
                        s(!0),
                        this.conversationDidDelete(e)
                    } else
                        s(!1)
                }
                ))
            }
            pinConversation(e) {
                return Promise.resolve(!0)
            }
            renameConversation(e) {
                return Promise.resolve(!0)
            }
            getLastOpenConv(e) {
                return this.lastOpenConv.get(e)
            }
            conversationWillOpen(e) {
                return Js(`Will open conv ${e}`),
                this.lastOpenConv.set(e, Date.now()),
                Promise.resolve(!0)
            }
            conversationDidOpen(e) {
                Zs.e.start(Zs.b.open_conversation, e),
                Js(`Did open conv ${e}`),
                this.adminSettingController.onLoadSetting(e),
                setTimeout((()=>{
                    this.previewManager.revalidate(e)
                }
                ), 0)
            }
            conversationWillDelete(e) {
                return Js(`Will delete conv ${e}`),
                Promise.resolve()
            }
            conversationDidDelete(e) {
                Js(`Did delete conv ${e}`),
                this.lastOpenConv.delete(e)
            }
        }
        ) || Ws) || Ws) || Ws) || Ws) || Ws) || Ws) || Ws) || Ws;
        var Ys, ei = s("s9sK"), ti = s("TeMN"), si = s("bUXd"), ii = (s("EHdh"),
        s("Ln14")), ni = s("bdot"), ri = s("cfFl"), ai = s.n(ri);
        const oi = {
            userId: v.CONV_FILTER.STRANGER,
            label: null,
            isGroup: !1,
            respondedByMe: !1,
            numMsg: 0,
            pinned: 0,
            outside: 0,
            topOut: !1,
            infoCheckSearch: null
        }
          , li = ["userId", "label", "firstSmsLocalId", "lastSmsLocalId", "isGroup", "respondedByMe", "numMsg", "pinned", "outside", "lastActionId", "topOutImprTimeOut", "topOutTimeOut", "syncFromMobile", "topOut", "localType", "infoCheckSearch", "preLastSmsLocalId"];
        Object(mt.b)(ii.c)(Ys = function(e, t) {
            return l.ModuleContainer.inject(ti.b)(e, void 0, 0)
        }(Ys = Reflect.metadata("design:type", Function)(Ys = Reflect.metadata("design:paramtypes", [void 0 === yt.IReactiveDB ? Object : yt.IReactiveDB])(Ys = class extends k.b {
            constructor(e) {
                super(),
                this.DBConvInfo = e,
                this.name = void 0,
                this.key = void 0,
                this.data = void 0,
                this.didInit = void 0,
                this.doneLoadDB = void 0,
                this.fetchAllHolder = void 0,
                this.preloadCached = void 0,
                this._pm = void 0,
                this.pinEventQueue = void 0,
                this.labelEventQueue = void 0,
                this.doneEventQueue = void 0,
                this.name = ii.a,
                this.key = "convId",
                this.data = new Map,
                this.didInit = !1,
                this.doneLoadDB = !1,
                this.fetchAllHolder = null,
                this.preloadCached = null,
                this._pm = null,
                this.pinEventQueue = [],
                this.labelEventQueue = [],
                this.doneEventQueue = !1
            }
            get previewManager() {
                return this._pm || (this._pm = l.ModuleContainer.resolve(ut.h)),
                this._pm
            }
            get unreadManager() {
                return ot.a.UnreadDataManager
            }
            init() {
                return this.didInit ? Promise.resolve() : (this.didInit = !0,
                this.loadData())
            }
            async loadData() {
                this.fetchAllHolder || (this.fetchAllHolder = this.DBConvInfo.getAll());
                const e = await this.fetchAllHolder.catch((e=>{
                    Ke.default.logCoreInfo(`[${this.name}] - load conv from DB got error ${e}`)
                }
                )) || []
                  , t = await this.onLoadDataFromDB(e);
                Ke.default.logCoreInfo(`[${this.name}] - done load db ${e.length}`),
                this.doneLoadDB = !0,
                this.doIdleTask(),
                this.broadcastEvent(yt.b.DoneLoadDB, "", e),
                this.previewManager.migrate(t.map((e=>e.userId))),
                this.setCacheData(v.CONV_FILTER.STRANGER, oi, !0)
            }
            async doIdleTask() {
                const e = this.pinEventQueue.slice()
                  , t = this.labelEventQueue.slice();
                this.pinEventQueue = [],
                this.labelEventQueue = [];
                const s = ai.a.series(e)
                  , i = ai.a.series(t);
                return Promise.all([s, i]).then((e=>this.pinEventQueue.length || this.labelEventQueue.length ? this.doIdleTask() : (this.doneEventQueue = !0,
                e)))
            }
            getItem(e, t) {
                return this.data.get(e.key)
            }
            getList(e, t) {
                return e.key === ii.b.ALL ? Array.from(this.data.keys()) : []
            }
            onGetItemFailure(e) {}
            onGetListFailure(e) {}
            async onLoadDataFromDB(e) {
                const t = await It.a.filterOutdatedConv(e);
                Ke.default.logCoreInfo(`[${this.name}] - done filter outdate ${e.length} ${t.length}`);
                const s = (new Date).getTime().toString()
                  , n = [];
                Object(Pe.i)(s);
                for (let r = 0; r < t.length; r++) {
                    if (!t[r].userId)
                        continue;
                    const e = Object(i.a)({}, t[r])
                      , a = this.data.get(e.userId);
                    if (e.verified = !0,
                    void 0 === e.isGroup && (e.isGroup = e.userId.startsWith(v.GROUPID_PREFIX)),
                    a) {
                        if (!a.verified) {
                            const t = this.mergeConv(e, a);
                            t.verified = !0,
                            this.setCacheData(e.userId, t),
                            Object(Pe.f)(s, this.name, e.userId),
                            this.updateInDB(t)
                        }
                    } else
                        this.setCacheData(e.userId, e),
                        Object(Pe.f)(s, this.name, e.userId);
                    e.infoCheckSearch && (e.infoCheckSearch && Ke.default.msgTypeValid(e.infoCheckSearch.lastType) ? Wt.a.pushCacheLastChat(e.userId, e.infoCheckSearch.lastMessageTime) : e.numMsg && e.numMsg > 1 && n.push(e.userId))
                }
                return n.length > 0 && Wt.a.cacheCheckLastChatInDb(n),
                Object(Pe.c)(s),
                t
            }
            onReceiveNewMessages(e, t, s) {
                return void 0 === s && (s = {
                    outside: void 0,
                    isGroup: !1
                }),
                new Promise(((n,r)=>{
                    var a;
                    if (!t || t.length < 0)
                        return r("Empty msgs");
                    const o = t[t.length - 1]
                      , l = t[0]
                      , c = this.data.get(e)
                      , d = It.a.getLastValidMsg(t);
                    let h;
                    d && (h = {
                        lastMessageTime: Number(d.sendDttm),
                        lastType: d.msgType
                    },
                    Wt.a.pushCacheLastChat(e, h.lastMessageTime));
                    const u = {
                        userId: e,
                        firstSmsLocalId: l.msgId,
                        isGroup: s.isGroup || e.startsWith(v.GROUPID_PREFIX),
                        numMsg: t.length,
                        respondedByMe: Bt.b.includeMyMessage(t),
                        pinned: 0,
                        label: null,
                        topOut: o.topOut,
                        verified: !1,
                        lastSmsLocalId: o.msgId,
                        outside: s.outside,
                        cloudMore: !1,
                        infoCheckSearch: h
                    };
                    if (this.preloadCached && this.preloadCached.onNewMsg(e, o),
                    c) {
                        const t = this.mergeConv(Object(i.a)({}, c), u);
                        this.setCacheData(e, t),
                        this.shouldSignalUpdate(c, t) && Object(Pe.g)(this.name, e),
                        c.verified && this.updateInDB(t),
                        n(t)
                    } else {
                        const t = Et.b.getLabelObjByConversaionId(e);
                        if (u.label = t ? t.id : null,
                        this.setCacheData(e, u, !0),
                        this.doneLoadDB)
                            return u.verified = !0,
                            this.updateInDB(u),
                            n(u);
                        this.DBConvInfo.getById(e).then((t=>{
                            const s = this.data.get(e);
                            if (!s)
                                return r("Internal logic handle wrong");
                            let a = Object(i.a)({}, s);
                            a.verified = !0,
                            t ? s.verified || (a = this.mergeConv(a, t),
                            this.setCacheData(e, a),
                            this.shouldSignalUpdate(a, s) && Object(Pe.g)(this.name, e),
                            this.updateInDB(a)) : this.updateInDB(a),
                            n(a)
                        }
                        ))
                    }
                    c && c.respondedByMe || null === (a = this.data.get(e)) || void 0 === a || !a.respondedByMe || (Ke.default.logCoreInfo(`[${this.name}] - Detect first my msg ${e} ${o.msgId}`),
                    this.previewManager.forceChangeItem(e))
                }
                ))
            }
            async onDeleteMessages(e, t) {
                const s = this.data.get(e);
                if (Ke.default.logCoreInfo(`[${this.name}] - onDeleteMessages #1 ${e} ${t.length}`),
                s && s.verified) {
                    let n = !1;
                    if (t.find((e=>{
                        let {msgId: t} = e;
                        return s.firstSmsLocalId === t
                    }
                    ))) {
                        const t = await (await ni.b.getFirstMessage(e)).firstMsg;
                        if (!t)
                            return Ke.default.logCoreInfo(`[${this.name}] - onDeleteMessages #4 ${e} `),
                            this.forkDeleteCacheAndDB(e),
                            {
                                deletedId: e
                            };
                        s.firstSmsLocalId = null == t ? void 0 : t.msgId,
                        n = !0
                    }
                    if (t.find((e=>{
                        let {msgId: t} = e;
                        return s.lastSmsLocalId === t
                    }
                    ))) {
                        const t = await ni.b.getLastMessage(e, s.lastSmsLocalId);
                        if (!t || t.length < 1)
                            return Ke.default.logCoreInfo(`[${this.name}] - onDeleteMessages #5 ${e} ${!!t}`),
                            this.forkDeleteCacheAndDB(e),
                            {
                                deletedId: e
                            };
                        s.lastSmsLocalId = t[0].msgId,
                        n = !0
                    }
                    return Ke.default.logCoreInfo(`[${this.name}] - onDeleteMessages #6 ${e} ${n}`),
                    n && (this.setCacheData(e, Object(i.a)({}, s)),
                    this.updateInDB(s)),
                    {
                        conversation: s,
                        updated: n
                    }
                }
                {
                    const t = await (await ni.b.getFirstMessage(e)).firstMsg
                      , s = await ni.b.getLastMessage(e)
                      , n = s && s[0];
                    if (!t || !n)
                        return Ke.default.logCoreInfo(`[${this.name}] - onDeleteMessages #2 ${e} ${!!t} ${!!n}`),
                        ot.a.PinDataManager.isPinned(e) || this.onDeleteConversation(e),
                        {
                            deletedId: e
                        };
                    const r = await this.DBConvInfo.getById(e);
                    let a = Ke.default.msgTypeValid(n) ? {
                        lastMessageTime: n.sendDttm,
                        lastType: n.msgType
                    } : void 0;
                    if (Ke.default.logCoreInfo(`[${this.name}] - onDeleteMessages #3 ${e} ${!!r}`),
                    r) {
                        let s = !1;
                        r.firstSmsLocalId !== (null == t ? void 0 : t.msgId) && (r.firstSmsLocalId = null == t ? void 0 : t.msgId,
                        s = !0),
                        r.lastSmsLocalId !== n.msgId && (r.lastSmsLocalId = null == n ? void 0 : n.msgId,
                        s = !0);
                        const a = Object(i.a)(Object(i.a)({}, r), {}, {
                            verified: !0
                        });
                        return this.setCacheData(e, a, !0),
                        s && this.updateInDB(a),
                        {
                            conversation: a,
                            updated: !0
                        }
                    }
                    {
                        const s = {
                            userId: e,
                            isGroup: e.startsWith(v.GROUPID_PREFIX),
                            pinned: 0,
                            label: null,
                            topOut: void 0,
                            verified: !0,
                            outside: null,
                            cloudMore: !1,
                            firstSmsLocalId: t.msgId,
                            lastSmsLocalId: n.msgId,
                            numMsg: 2,
                            respondedByMe: "0" == t.fromUid || "0" == n.fromUid,
                            infoCheckSearch: a
                        };
                        return this.setCacheData(e, s, !0),
                        this.updateInDB(s),
                        {
                            conversation: s,
                            updated: !0
                        }
                    }
                }
            }
            mergeConv(e, t) {
                return (!e.lastSmsLocalId || t.lastSmsLocalId && t.lastSmsLocalId > e.lastSmsLocalId) && (e.preLastSmsLocalId = e.lastSmsLocalId || t.lastSmsLocalId,
                e.lastSmsLocalId = t.lastSmsLocalId,
                e.outside = t.outside),
                e.numMsg = (e.numMsg || 0) + t.numMsg,
                e.respondedByMe = e.respondedByMe || t.respondedByMe,
                (!e.firstSmsLocalId || t.firstSmsLocalId && t.firstSmsLocalId < e.firstSmsLocalId) && (e.firstSmsLocalId = t.firstSmsLocalId),
                (!e.infoCheckSearch || !e.infoCheckSearch.lastMessageTime || t.infoCheckSearch && t.infoCheckSearch.lastMessageTime > e.infoCheckSearch.lastMessageTime) && (e.infoCheckSearch = t.infoCheckSearch),
                e.preLastSmsLocalId || (e.preLastSmsLocalId = t.lastSmsLocalId),
                !t.respondedByMe && t.topOut && (e.topOut = t.topOut),
                "string" != typeof e.firstSmsLocalId && (e.firstSmsLocalId = "" + e.firstSmsLocalId),
                e
            }
            async onEmptyConversation(e) {
                const t = await this.getConvById(e);
                if (Ke.default.logCoreInfo(`[${this.name}] - onEmptyConversation ${e} ${!!t}`),
                !t)
                    return;
                const s = Object(i.a)({}, t);
                return delete s.firstSmsLocalId,
                delete s.lastSmsLocalId,
                s.numMsg = 0,
                s.respondedByMe = !1,
                this.setCacheData(e, s, !0),
                this.broadcastEvent(yt.b.EmptyConv, e),
                Object(Pe.g)(this.name, e),
                ot.a.PinDataManager.isPinned(e) && ot.a.PinDataManager.unpin([e]),
                this.updateInDB(s)
            }
            onDeleteConversation(e) {
                Ke.default.logCoreInfo(`[${this.name}] - onDeleteConversation ${e}`);
                const t = this.data.get(e);
                return this.doDeleteConversation(e).then((s=>{
                    this.broadcastEvent(yt.b.DeleteConv, e, t)
                }
                ))
            }
            doDeleteConversation(e) {
                const t = this.data.get(e);
                return Ke.default.logCoreInfo(`[${this.name}] - doDeleteConversation ${e} ${!!t}`),
                t && (this.data.delete(e),
                Object(Pe.e)(this.name, e)),
                ot.a.PinDataManager.isPinned(e) && ot.a.PinDataManager.unpinLocal([e]),
                this.deleteInDB(e)
            }
            onPinConversation(e, t) {
                return new Promise((s=>{
                    this.doneEventQueue ? this.doUpdatePin(e, t).then(s) : this.pinEventQueue.push((async()=>{
                        const i = await this.doUpdatePin(e, t);
                        s(i)
                    }
                    ))
                }
                ))
            }
            doUpdatePin(e, t) {
                if (t && It.a.isStrangerV2(e))
                    return Promise.resolve(null);
                if (!this.data.get(e)) {
                    if (!t)
                        return Promise.resolve(null);
                    const s = this.getEmptyConv(e);
                    s.verified = !0,
                    this.setCacheData(e, s)
                }
                const s = new Map;
                return s.set("pinned", t),
                this.updateFields(e, s).then((s=>(this.broadcastEvent(yt.b.ChangePinConv, e, t),
                s))).catch((t=>(Ke.default.logCoreInfo(`[${this.name}] - doUpdatePin err`, t),
                this.data.get(e))))
            }
            onLeaveGroup(e) {
                return Ke.default.logCoreInfo(`[${this.name}] - onLeaveGroup ${e}`),
                this.doDeleteConversation(e).then((t=>{
                    this.broadcastEvent(yt.b.LeaveGroup, e)
                }
                ))
            }
            async onChangeConvLabel(e, t) {
                return new Promise((s=>{
                    const i = this.data.get(e);
                    if (i && i.label === t)
                        return s(i);
                    this.doneEventQueue ? this.doUpdateConvLabel(e, t).then(s) : this.labelEventQueue.push((async()=>{
                        const i = await this.doUpdateConvLabel(e, t);
                        s(i)
                    }
                    ))
                }
                ))
            }
            doUpdateConvLabel(e, t) {
                if (!e)
                    return Ke.default.logCoreInfo(`[${this.name}] - doUpdateConvLabel with undefined ${t}`),
                    Promise.resolve(null);
                const s = this.data.get(e);
                if (s && s.label === t)
                    return Promise.resolve(s);
                if (!s) {
                    if (!t)
                        return Promise.resolve(null);
                    const s = this.getEmptyConv(e);
                    s.verified = !0,
                    this.setCacheData(e, s)
                }
                const i = new Map;
                return i.set("label", t),
                this.updateFields(e, i).then((i=>(this.unreadManager.onChangeConvLabel(e, null == s ? void 0 : s.label, t),
                i)))
            }
            onFetchConvLabels(e) {
                if (!e || !Array.isArray(e))
                    return;
                Ke.default.logCoreInfo(`[${this.name}] - onChangeConvLabel ${e.length}`);
                const t = {};
                this.getAllConv().then((s=>{
                    for (let e = 0; e < s.length; e++)
                        t[s[e].userId] = 1;
                    for (let i = 0; i < e.length; i++) {
                        const s = e[i].id
                          , n = e[i].conversations;
                        if (n)
                            for (let e = 0; e < n.length; e++) {
                                const i = n[e];
                                delete t[i],
                                this.onChangeConvLabel(i, s)
                            }
                    }
                    for (const e in t)
                        Object.hasOwnProperty.call(t, e) && this.onChangeConvLabel(e, null)
                }
                ))
            }
            onDeleteConvLabels(e) {
                Ke.default.logCoreInfo(`[${this.name}] - onDeleteConvLabels ${e.length}`),
                e.forEach((e=>{
                    const t = e.conversations;
                    if (t && t.length)
                        for (let s = 0; s < t.length; s++)
                            this.data.has(t[s]) && this.onChangeConvLabel(t[s], null)
                }
                ))
            }
            async onUpdateMsgId(e, t, s) {
                if (!t || !s || t === s)
                    return Promise.reject("[Conv-info-manager]- call update with invalid params!");
                const i = this.data.get(e);
                let n = i || {}
                  , r = !1;
                if (!i || !i.verified) {
                    const t = await this.DBConvInfo.getById(e);
                    if (!i && !t) {
                        const t = await this.createEmptyConvForUser(e, 0, void 0, {
                            firstSmsLocalId: s,
                            lastSmsLocalId: s
                        });
                        return this.setCacheData(e, t),
                        t
                    }
                    i && t ? (n = this.mergeConv(i, t),
                    r = !0) : (n = i || t,
                    n.verified = !0,
                    r = !0)
                }
                return n.firstSmsLocalId && n.firstSmsLocalId !== t || (r = !0,
                n.firstSmsLocalId = s),
                n.lastSmsLocalId && n.lastSmsLocalId !== t || (r = !0,
                n.lastSmsLocalId = s),
                r && (this.setCacheData(e, n),
                this.updateInDB(n)),
                n
            }
            async addOrUpdateConv(e, t, s, n, r, a) {
                "number" == typeof t && (t = "" + t),
                "number" == typeof s && (s = "" + s);
                const o = this.data.get(e);
                Ke.default.logCoreInfo(`[${this.name}] - addOrUpdateConv ${e} ${!!o} ${s}`);
                const l = e=>((!e.firstSmsLocalId || t && t < e.firstSmsLocalId) && (e.firstSmsLocalId = t),
                (!e.lastSmsLocalId || s && s > e.lastSmsLocalId) && (e.lastSmsLocalId = s),
                e.cloudMore = n,
                e.respondedByMe = e.respondedByMe || r,
                e.numMsg = (e.numMsg || 0) + a,
                e);
                if (o && o.verified) {
                    const t = l(o);
                    return this.setCacheData(e, Object(i.a)({}, t)),
                    this.updateInDB(t),
                    t
                }
                {
                    const o = await this.DBConvInfo.getById(e);
                    if (Ke.default.logCoreInfo(`[${this.name}] - addOrUpdateConv #2 ${e} ${!!o}`),
                    o) {
                        const t = l(o);
                        return this.setCacheData(e, Object(i.a)(Object(i.a)({}, t), {}, {
                            verified: !0
                        })),
                        this.updateInDB(t),
                        t
                    }
                    {
                        const i = {
                            userId: e,
                            firstSmsLocalId: t,
                            lastSmsLocalId: s,
                            isGroup: e.startsWith(v.GROUPID_PREFIX),
                            respondedByMe: r,
                            numMsg: a || 2,
                            label: null,
                            pinned: 0,
                            verified: !0,
                            cloudMore: n,
                            outside: null,
                            topOut: null,
                            infoCheckSearch: void 0
                        };
                        return this.setCacheData(e, i, !0),
                        this.updateInDB(i),
                        i
                    }
                }
            }
            async addIfNotExistsConv(e, t, s, i, n, r) {
                const a = this.data.get(e);
                if (Ke.default.logCoreInfo(`[${this.name}] - addIfNotExistsConv #1 ${e} ${!!a} ${i}`),
                a)
                    return !1;
                const o = await this.DBConvInfo.getById(e);
                if (Ke.default.logCoreInfo(`[${this.name}] - addIfNotExistsConv #2 ${!!o}`),
                o)
                    return !1;
                {
                    const a = {
                        userId: e,
                        firstSmsLocalId: s,
                        lastSmsLocalId: i,
                        isGroup: t || e.startsWith(v.GROUPID_PREFIX),
                        respondedByMe: n,
                        numMsg: r || 1,
                        label: null,
                        pinned: 0,
                        verified: !0,
                        outside: null,
                        topOut: null,
                        infoCheckSearch: void 0
                    };
                    return this.setCacheData(e, a, !0),
                    this.updateInDB(a),
                    !0
                }
            }
            createEmptyConvForUser(e, t, s, n) {
                return void 0 === s && (s = v.CONV_OT_STATE.none),
                new Promise(((r,a)=>{
                    this.getConvById(e).then((r=>{
                        let a;
                        if (Ke.default.logCoreInfo(`[${this.name}] - createEmptyConvForUser ${e} ${!!r}`),
                        r) {
                            const i = new Map;
                            return a = r,
                            s !== v.CONV_OT_STATE.none && void 0 !== s && (a.outside = s,
                            i.set("outside", s)),
                            t && !ot.a.PinDataManager.isPinned(a.userId) && ot.a.PinDataManager.pin([a.userId]),
                            this.updateFields(e, i),
                            a
                        }
                        return a = Object(i.a)({
                            userId: e,
                            lastMessageTime: t ? 0 : si.a.getTimeNow(),
                            isGroup: e.startsWith(v.GROUPID_PREFIX)
                        }, n),
                        s !== v.CONV_OT_STATE.none && void 0 !== s && (a.outside = s),
                        t && ot.a.PinDataManager.pin([a.userId]),
                        a.verified = !0,
                        this.setCacheData(e, a, !0),
                        this.updateInDB(a),
                        a
                    }
                    )).then((e=>{
                        r(e)
                    }
                    )).catch((e=>{
                        Ke.default.logCoreError(e),
                        a(e)
                    }
                    ))
                }
                ))
            }
            updateLastMsgId(e, t) {
                const s = this.data.get(e);
                if (s && s.lastSmsLocalId === t)
                    return Promise.resolve(s);
                const i = new Map;
                return i.set("lastSmsLocalId", t),
                this.updateFields(e, i)
            }
            updateInfoCheckSearch(e, t, s) {
                const i = this.data.get(e);
                if (i && i.infoCheckSearch && i.infoCheckSearch.lastMessageTime === t)
                    return Promise.resolve(i);
                const n = new Map;
                return n.set("infoCheckSearch", {
                    lastMessageTime: t,
                    lastType: s
                }),
                this.updateFields(e, n)
            }
            updateConvSetting(e, t) {
                let s = this.data.get(e);
                if (!s) {
                    const i = !!this.doneLoadDB;
                    s = {
                        userId: e,
                        verified: i
                    },
                    i || Ke.default.logCoreInfo(`[${this.name}] - update conv setting before done load db ${e}`, t)
                }
                Ke.default.shallowEqual(s.setting, t) || (s.setting = t,
                this.setCacheData(e, s, !0),
                Ke.default.logCoreInfo(`[${this.name}] - update conv setting for conv ${e}`, t))
            }
            async isRespondedByMe(e) {
                const t = await this.getConvById(e);
                return !!t && Boolean(t.respondedByMe)
            }
            isRespondedByMeSync(e) {
                const t = this.data.get(e);
                return !!t && Boolean(t.respondedByMe)
            }
            isDoneLoadDB() {
                return this.doneLoadDB
            }
            getConvByIdSync(e) {
                return "string" != typeof e && Ke.default.logCoreInfo(`[${this.name}] - getConvByIdSync with invalid id type`, e, !!this.data.get(e), !!this.data.get("" + e)),
                this.data.get(e)
            }
            getConvById(e) {
                return new Promise(((t,s)=>{
                    if (this.data.has(e))
                        return t(this.data.get(e));
                    this.DBConvInfo.getById(e).then((e=>{
                        t(e)
                    }
                    )).catch(s)
                }
                ))
            }
            getAllConvSync() {
                return Array.from(this.data.values()) || []
            }
            getAllConv() {
                return new Promise(((e,t)=>{
                    if (this.doneLoadDB) {
                        return e(this.getAllConvSync())
                    }
                    this.fetchAllHolder || (this.fetchAllHolder = this.DBConvInfo.getAll()),
                    this.fetchAllHolder.then(e).catch(t)
                }
                ))
            }
            getAllConvIdsSync() {
                return Array.from(this.data.keys())
            }
            setPreloadCache(e) {
                this.preloadCached = e
            }
            onDoneSyncMobile() {
                Ke.default.logCoreInfo(`[${this.name}] - onDoneSyncMobile`),
                this.getAllConv().then((e=>{
                    e && this.previewManager.migrate(e.map((e=>e.userId)), !0)
                }
                ))
            }
            setCacheData(e, t, s) {
                void 0 === s && (s = !1),
                this.data.set(t.userId, t),
                s && Object(Pe.g)(this.name, e)
            }
            updateFields(e, t) {
                return new Promise(((s,n)=>{
                    const r = this.data.get(e)
                      , a = r=>{
                        Ke.default.logCoreInfo(`[${this.name}] - updateFields #2`);
                        const a = Object(i.a)({}, r);
                        t.forEach(((e,t)=>{
                            a[t] = e
                        }
                        )),
                        this.setCacheData(e, a, !0),
                        this.updateInDB(a).then((()=>{
                            s(a)
                        }
                        )).catch(n)
                    }
                    ;
                    r ? a(r) : this.DBConvInfo.getById(e).then((e=>{
                        e && a(e)
                    }
                    ))
                }
                ))
            }
            forkDeleteCacheAndDB(e) {
                if (Ke.default.logCoreInfo(`[${this.name}] - forkDeleteCacheAndDB ${e}`),
                !ot.a.PinDataManager.isPinned(e)) {
                    const t = this.data.get(e);
                    Ke.default.logCoreInfo(`[${this.name}] - forkDeleteCacheAndDB ${e} ${!!t}`),
                    this.data.delete(e),
                    Object(Pe.e)(this.name, e),
                    this.deleteInDB(e).then((s=>{
                        this.broadcastEvent(yt.b.DeleteConv, e, t)
                    }
                    ))
                }
            }
            broadcastEvent(e, t, s) {
                void 0 === t && (t = ""),
                this.dispatchEvent(new yt.a(e,t,s))
            }
            shouldSignalUpdate(e, t) {
                return ot.a.PinDataManager.isPinned(e.userId) !== ot.a.PinDataManager.isPinned(t.userId) || e.label !== t.label || e.respondedByMe !== t.respondedByMe
            }
            cleanConversation(e) {
                return Object.keys(e).forEach((t=>{
                    li.includes(t) || delete e[t]
                }
                )),
                e
            }
            getEmptyConv(e) {
                return {
                    userId: e,
                    isGroup: e.startsWith(v.GROUPID_PREFIX),
                    numMsg: 0,
                    respondedByMe: !1,
                    pinned: 0,
                    label: null,
                    outside: null,
                    infoCheckSearch: null,
                    topOut: null
                }
            }
            updateInDB(e) {
                const t = this.cleanConversation(Object(i.a)({}, e));
                return this.DBConvInfo.addOrUpdate(t).catch((e=>{
                    Ke.default.logCoreInfo(`[${this.name}] - updateInDB got error ${e}`)
                }
                ))
            }
            deleteInDB(e) {
                return this.DBConvInfo.remove(e).catch((e=>{
                    Ke.default.logCoreInfo(`[${this.name}] - deleteInDB got error ${e}`)
                }
                ))
            }
        }
        ) || Ys) || Ys) || Ys);
        var ci = s("NSWB")
          , di = s("1Abx")
          , hi = s("XEtq")
          , ui = s("ZRfj")
          , gi = s("EqtE")
          , pi = s("oH3T")
          , mi = s("13iL")
          , fi = s("mea/")
          , vi = s("MPLC")
          , bi = s("WK05");
        var Ii, yi = s("dwTj"), Ci = s("RVT8"), Si = s("hkvp"), Ei = s("6tnf"), _i = s("sg3c"), Ti = s("4pY7"), Li = s("ofhN"), Oi = s("D8f9");
        const Fi = "9999999999999999"
          , Ri = "zum_m"
          , wi = "1.0.0"
          , Mi = !1
          , Di = "total"
          , Ai = e=>({
            convId: e,
            smsUnreadCount: 0,
            smsUnreadNotCount: 0,
            mentionUnreadCount: 0,
            strangerUnreadCount: 0,
            lastProcessMsgId: "",
            lastSeenReactId: "",
            unreadMark: void 0
        })
          , Pi = {
            CALL_INIT: !1
        }
          , ji = 1
          , Ni = 2;
        Object(mt.b)(Ci.b)(Ii = function(e, t) {
            return l.ModuleContainer.inject(Si.b)(e, void 0, 0)
        }(Ii = Reflect.metadata("design:type", Function)(Ii = Reflect.metadata("design:paramtypes", [void 0 === yt.IReactiveDB ? Object : yt.IReactiveDB])(Ii = class extends k.b {
            constructor(e) {
                super(),
                this.DBConvUnread = e,
                this.name = void 0,
                this.key = void 0,
                this.didInit = void 0,
                this.doneLoadDB = void 0,
                this.data = void 0,
                this.pendingMessage = void 0,
                this.previewMsgs = void 0,
                this.pendingClearUnread = void 0,
                this.fetchAllHolder = void 0,
                this.total = void 0,
                this.loadState = Pi,
                this.isLoadDBStarted = void 0,
                this.updateTotalQueue = void 0,
                this._logger = void 0,
                this.setupQueue = ()=>Object(ri.queue)((async e=>{
                    this.doneLoadDB && await this.calculateComputeUnreadCount(e)
                }
                ), 1),
                this._getDeletedMsgByTTLItem = (e,t)=>{
                    if (t)
                        return t.find((t=>e.msgId ? e.msgId === t.msgId : e.cliMsgId === t.cliMsgId))
                }
                ,
                this.name = Ci.a,
                this.key = "convId",
                this.didInit = !1,
                this.doneLoadDB = !1,
                this.data = new Map,
                this.isLoadDBStarted = !1,
                this.pendingMessage = new Map,
                this.previewMsgs = [],
                this.pendingClearUnread = new Map,
                this.fetchAllHolder = null,
                this.total = this.getEmptyTotal(),
                this.updateTotalQueue = this.setupQueue()
            }
            init() {
                this.didInit || (this.logger.zsymb(3, 9683, 3e4, "call init unread"),
                this.didInit = !0,
                this.addListener(),
                this.onState("CALL_INIT"))
            }
            onState(e) {
                this.loadState[e] = !0;
                const t = Object.values(this.loadState).every((e=>!0 === e));
                t && !this.isLoadDBStarted && (this.logger.zsymb(3, 9683, 30001, "done all state, ready to load db..."),
                this.loadData())
            }
            get logger() {
                return this._logger || (this._logger = l.ModuleContainer.resolve(P.ZLoggerFactory).createZLogger(kt.b.conversation, [kt.b.unread])),
                this._logger
            }
            getEmptyTotal() {
                return {
                    convId: "total",
                    smsUnreadCount: 0,
                    smsUnreadNotCount: 0,
                    mentionUnreadCount: 0,
                    strangerUnreadCount: 0,
                    lastProcessMsgId: "0",
                    lastSeenReactId: "0",
                    unreadMark: 0,
                    smsUnreadNomute: 0
                }
            }
            loadData() {
                const e = u.a.getInstance().getItemForCurrentUser(Ri);
                if (e === wi)
                    this.isLoadDBStarted = !0,
                    this.logger.zsymb(3, 9683, 30002, "start load unread {}", e),
                    this.fetchAllHolder || (this.fetchAllHolder = this.DBConvUnread.getAll()),
                    this.fetchAllHolder.then((e=>{
                        this.onLoadUnreadFromDBV2(Ni, e),
                        this.doDoneLoadDBTask()
                    }
                    ));
                else {
                    ot.a.ConvInfoDataManager.isDoneLoadDB() && (this.isLoadDBStarted = !0,
                    this.migrateV2())
                }
            }
            async migrateV2() {
                const e = u.a.getInstance()
                  , t = e.getItemForCurrentUser(Ri) === wi;
                if (this.logger.zsymb(3, 9683, 30003, "call migrate unread {}", t),
                t)
                    return;
                const s = ot.a.ConvInfoDataManager.getAllConvSync()
                  , i = [];
                s.forEach((e=>{
                    const t = e.smsUnreadCount || 0
                      , s = e.smsUnreadNotCount || 0
                      , n = e.mentionUnreadCount || 0
                      , r = e.unreadMark || null;
                    if (!(e && e.userId && (t || s || n || r)))
                        return;
                    const a = {
                        convId: e.userId,
                        smsUnreadCount: t,
                        smsUnreadNotCount: s,
                        strangerUnreadCount: 0,
                        mentionUnreadCount: n,
                        lastProcessMsgId: e.lastMessageIdFromServerv2 || "0",
                        lastSeenReactId: e.lastSeenReactId || "0",
                        unreadMark: r
                    };
                    i.push(a)
                }
                )),
                this.onLoadUnreadFromDBV2(ji, i),
                this.doDoneLoadDBTask(),
                this.logger.zsymb(3, 9683, 30004, "done migrate unread {}", i.length),
                e.setItemForCurrentUser(Ri, wi)
            }
            doDoneLoadDBTask() {
                const e = Array.from(this.data.values());
                this.doneLoadDB = !0,
                this.broadcastEvent(yt.b.DoneLoadDB, "total", e),
                this.logger.zsymb(3, 9683, 30005, "done load unread {}", e.length),
                l.ModuleContainer.resolve(Ti.a).onLoadUnreads(e),
                setTimeout((()=>{
                    this.unreadChanged("init")
                }
                ), 200)
            }
            addListener() {
                ot.a.MuteDataManager.addEventListener(yt.b.MuteChanged, (e=>{
                    this.onMuteConversation(e.convId, !!e.payload)
                }
                )),
                ot.a.ConvInfoDataManager.addEventListener(yt.b.LeaveGroup, (e=>{
                    this.doDeleteUnread(e.convId)
                }
                )),
                ot.a.ConvInfoDataManager.addEventListener(yt.b.DeleteConv, (e=>{
                    this.doDeleteUnread(e.convId)
                }
                )),
                ot.a.ConvInfoDataManager.addEventListener(yt.b.EmptyConv, (e=>{
                    this.doDeleteUnread(e.convId)
                }
                )),
                ot.a.ConvInfoDataManager.addEventListener(yt.b.DoneLoadDB, (e=>{
                    this.onState("CALL_INIT")
                }
                )),
                ot.a.ArchivedChatManager.addEventListener(yt.b.UpdateListArchivedChat, (e=>{
                    this.onArchivedChat(e.convId)
                }
                )),
                Ze.default.subscribe(((e,t)=>{
                    if (null != t && t.length && e === Je.ConversationListActions.CLEAR_MARK_AS_UNREAD)
                        t.forEach((e=>{
                            this.updateUnreadMark(e, null)
                        }
                        ));
                    else if (null != t && t.length && e === Je.GeneralActions.UPDATE_HIDDEN_CHAT)
                        for (let s = 0; s < t.length; s++) {
                            const e = t[s];
                            this.onHiddenConversation(e.uid, e.isHide)
                        }
                }
                ))
            }
            getItem(e, t) {
                if (e.key === Di)
                    return this.total;
                return this.data.get(e.key)
            }
            getList(e, t) {
                return Array.from(this.data.keys())
            }
            onGetItemFailure(e) {}
            onGetListFailure(e) {
                throw new Error("Method not implemented.")
            }
            onMuteConversation(e, t) {
                const s = this.data.get(e);
                !s || s.smsUnreadCount < 1 && !s.unreadMark || Ct.a.isThreadHidden(e) || It.a.isOAType({
                    userId: e
                }) || (this.logger.zsymb(0, 9683, 30006, "onMuteConversation:", e, t, s.smsUnreadCount, s.smsUnreadNotCount),
                this.unreadChanged(e))
            }
            onHiddenConversation(e, t) {
                const s = this.data.get(e);
                !s || s.smsUnreadCount < 1 && !s.unreadMark || ce.default.isMuted(e) || It.a.isOAType({
                    userId: e
                }) || (this.logger.zsymb(0, 9683, 30007, "onHiddenConversation: ", e, t, s.smsUnreadCount, s.smsUnreadNotCount),
                this.unreadChanged(e))
            }
            onArchivedChat(e) {
                const t = this.data.get(e);
                !t || t.smsUnreadCount < 1 && !t.unreadMark || ce.default.isMuted(e) || It.a.isOAType({
                    userId: e
                }) || this.unreadChanged(e)
            }
            onChangeConvLabel(e, t, s) {
                const i = this.data.get(e);
                t === s || !i || i.smsUnreadCount < 1 || ce.default.isMuted(e) || this.unreadChanged(e)
            }
            onReceivePreviewMessages(e) {
                e.length > 0 && (this.previewMsgs = [...this.previewMsgs, ...e])
            }
            onReceiveNewMessagesOld(e, t, s) {
                if (!s || !t)
                    return;
                const i = this.data.get(e);
                if (i)
                    this.logger.zsymb(0, 9683, 30008, "receive msg", e, i.lastProcessMsgId, s),
                    (!i.lastProcessMsgId || i.lastProcessMsgId < t) && (this.handleNewMessages(e, s, t),
                    Object(Pe.g)(this.name, e));
                else {
                    const t = this.pendingMessage.get(e)
                      , i = t ? s.concat(t) : s;
                    this.pendingMessage.set(e, i),
                    i.length === s.length && this.DBConvUnread.getById(e).then((t=>{
                        if (!t) {
                            const t = this.pendingMessage.get(e);
                            if (t) {
                                const s = t.filter(((e,t,s)=>s.indexOf(e) === t))
                                  , i = Bt.b.getLastMessageInList(s);
                                if (!i)
                                    return;
                                this.pendingMessage.delete(e),
                                this.handleNewMessages(e, s, i.msgId),
                                Object(Pe.g)(this.name, e)
                            }
                        }
                    }
                    ))
                }
            }
            onReceiveNewMessages(e, t, s) {
                if (!s || !s.length || !t)
                    return;
                const i = this.data.get(e);
                if (this.doneLoadDB) {
                    if (!i || !i.lastProcessMsgId || i.lastProcessMsgId < t) {
                        const n = s.map((e=>e.msgId)).join("-");
                        this.logger.zsymb(0, 9683, 30009, `onReceiveNewMessages: ${null == i ? void 0 : i.lastProcessMsgId} ${e} ${t} ${n}`),
                        this.handleNewMessages(e, s, t),
                        Object(Pe.g)(this.name, e)
                    }
                } else {
                    const t = this.pendingMessage.get(e)
                      , i = t ? s.concat(t) : s;
                    this.pendingMessage.set(e, i)
                }
            }
            onDoneOffLineMessages() {
                this.logger.zsymb(0, 9683, 30010, "ph7 done offline"),
                is.b.onDoneEntry(is.a.FIRST_FETCH),
                this.previewMsgs.length > 0 && setTimeout((()=>{
                    this.handlePreviewMsgs()
                }
                ), 0)
            }
            doDeleteUnread(e) {
                if (!e)
                    return;
                const t = this.data.get(e);
                this.logger.zsymb(0, 9683, 30011, `doDeleteUnread ${!!t}`),
                this.data.delete(e) && (Object(Pe.e)(this.name, e),
                this.unreadChanged(e)),
                this.deleteInDB(e)
            }
            onReceiveDeleteConvMsg(e, t) {
                if (this.doneLoadDB) {
                    const s = this.safeGetUnreadCached(e);
                    if (0 === s.smsUnreadCount)
                        return;
                    if (t >= +s.lastProcessMsgId) {
                        const t = Object(i.a)(Object(i.a)({}, s), {}, {
                            smsUnreadCount: 0,
                            smsUnreadNotCount: 0
                        });
                        this.data.set(t.convId, t),
                        Object(Pe.g)(this.name, e),
                        this.unreadChanged(e)
                    }
                } else
                    this.pendingClearUnread.set(e, t)
            }
            onClearUnreadConversations(e) {
                if (!e || e.length < 0)
                    return;
                let t = [];
                for (let s = 0; s < e.length; s++) {
                    const i = e[s]
                      , n = this.data.get(i.userId) || Ai(i.userId);
                    this.logger.zsymb(0, 9683, 30012, "onClearUnreadConversations", !!i, null == n ? void 0 : n.smsUnreadCount),
                    i && (t.push(i.userId),
                    n.smsUnreadCount > 0 && ce.default.getLastMessageFrom(i.userId, i.lastSmsLocalId, Fi, n.smsUnreadCount, !0).then((e=>{
                        let t = {};
                        if (e && e.length > 0)
                            for (let i = 0; i < e.length; i++) {
                                let s = e[i];
                                Ke.default.validMessageFromOther(s) && (t[s.msgId] = s)
                            }
                        const s = {
                            userId: i.userId,
                            lastSmsLocalId: i.lastSmsLocalId,
                            smsUnreadCount: n.smsUnreadCount
                        };
                        this.clearUnreadConversation(s, t),
                        this.resetUnreadToZero(i.userId, n.lastProcessMsgId)
                    }
                    )).catch((e=>{
                        this.logger.zsymb(21, 9683, 30013, "clear unread conv failure {}", e)
                    }
                    )),
                    bi.a.clearUnreadIfExist({
                        userId: i.userId,
                        lastSeenReactId: n.lastSeenReactId
                    }))
                }
                gi.a.clearUnreadMark(t, e.length)
            }
            onReadConversation(e, t) {
                var s;
                if (qe.default.mark_unread.enable && !gi.a.canSendUnread(e))
                    return this.logger.zsymb(0, 9683, 30014, `[read-message] dont clear ${e}`, qe.default.mark_unread.enable, gi.a.canSendUnread(e)),
                    !1;
                gi.a.getUnreadMark(e) && (e.startsWith(v.GROUPID_PREFIX) ? vt.e.logAction(2160024) : vt.e.logAction(2160023),
                vt.e.logAction(2160022));
                const n = this.data.get(e) || Ai(e)
                  , r = n.smsUnreadCount;
                if (!t && !r) {
                    this.logger.zsymb(0, 9683, 30015, `[read-message] dont clear ${e} unread `, r, t);
                    const s = bi.a.sendClearUnread(e, n.lastSeenReactId);
                    return gi.a.clearUnreadMark([e], 0),
                    s != n.lastSeenReactId && (n.lastSeenReactId = s,
                    this.data.set(e, Object(i.a)({}, n)),
                    Object(Pe.g)(this.name, e),
                    this.updateInDB(n)),
                    !1
                }
                const a = this.acquireConvManager().getConvByIdSync(e);
                if (!a)
                    return this.logger.zsymb(0, 9683, 30016, `[read-message] convinfo not exists ${e}`),
                    !1;
                const o = []
                  , l = {}
                  , c = a.lastSmsLocalId ? a.lastSmsLocalId.toString().split("_")[0] : "";
                let d = !1;
                const h = null === (s = vi.b.messageCache) || void 0 === s ? void 0 : s.getLast({
                    userId: e
                }, r);
                for (let i = h.length - 1; i > -1; i--) {
                    let e = h[i];
                    if (Ke.default.validMessageFromOther(e) && e.zglobalMsgId && -1 != e.zglobalMsgId && !o.includes(e.zglobalMsgId) && (o.push(e.zglobalMsgId),
                    l[e.zglobalMsgId] = e,
                    e.zglobalMsgId == c && (d = !0),
                    o.length == r))
                        break
                }
                const u = {
                    userId: e,
                    lastSmsLocalId: a.lastSmsLocalId,
                    smsUnreadCount: r
                };
                var g;
                !c || d || l[c] ? this.clearUnreadConversation(u, l) : (this.logger.zsymb(0, 9683, 30017, `[read-message] append lastMsgIdInConv ${c} ${Object.keys(l).length}`),
                null === (g = vi.b.messageCache) || void 0 === g || g.getMessageByMsgIdAsync(c).then((e=>{
                    l[c] = Object(i.a)({}, e),
                    this.clearUnreadConversation(u, l)
                }
                )).catch((e=>{
                    this.clearUnreadConversation(u, l)
                }
                )));
                return gi.a.clearUnreadMark([e], 0),
                n.lastSeenReactId = bi.a.sendClearUnread(e, n.lastSeenReactId),
                this.resetUnreadToZero(e, n.lastProcessMsgId),
                !0
            }
            getUnreadByConvIdSync(e) {
                return this.data.get(e)
            }
            getUnreadByConvId(e) {
                return new Promise(((t,s)=>{
                    if (this.data.has(e))
                        return t(this.getUnreadByConvIdSync(e));
                    this.DBConvUnread.getById(e).then((e=>t(e))).catch(s)
                }
                ))
            }
            getAllUnreadsSync() {
                return Array.from(this.data.values())
            }
            getAllUnreads() {
                return new Promise(((e,t)=>{
                    if (this.doneLoadDB)
                        return e(this.getAllUnreadsSync());
                    this.fetchAllHolder || (this.fetchAllHolder = this.DBConvUnread.getAll()),
                    this.fetchAllHolder.then((t=>e(t))).catch(t)
                }
                ))
            }
            resetUnreadToZero(e, t) {
                return this.getUnreadByConvId(e).then((s=>{
                    if (pi.b.onClearUnreadConv(e),
                    !s || !s.smsUnreadCount && !s.smsUnreadNotCount)
                        return !1;
                    this.logger.zsymb(3, 9683, 30018, "resetUnreadToZero {} {} {}", e, t, s.smsUnreadCount);
                    const i = {
                        convId: e,
                        smsUnreadCount: 0,
                        mentionUnreadCount: 0,
                        strangerUnreadCount: 0,
                        smsUnreadNotCount: 0,
                        lastProcessMsgId: t,
                        lastSeenReactId: s.lastSeenReactId || "",
                        unreadMark: s.unreadMark
                    };
                    return s.smsUnreadCount > 0 && ui.a.notiMainClearunread(e),
                    this.forkUpdateCacheAndDB(i).then((t=>(this.broadcastEvent(yt.b.ReadConv, e),
                    !0))).catch((t=>(this.logger.zsymb(21, 9683, 30019, "resetUnreadToZero failure {} {}", e, t),
                    !1)))
                }
                ))
            }
            isUnreadMessage(e) {
                const {message: t, convId: s, lastProcessMsgId: i} = e
                  , n = Bt.b.isMyMessage(t)
                  , r = di.b.isRead({
                    userId: s,
                    actionId: t.actionId,
                    msgId: t.msgId,
                    msgSendDttm: t.ts || t.serverTime || t.sendDttm,
                    msgLocalId: void 0,
                    e2eeStatus: Object(_i.f)(t)
                })
                  , a = !t.msgId || !i || t.msgId <= i;
                return !r && a && !n
            }
            _updateTTLUnreadCount(e, t, s) {
                const i = this.data.get(e) || null;
                if (this.logger.zsymb(0, 9683, 30020, "_updateTTLUnreadCount", e, null == i ? void 0 : i.smsUnreadCount),
                i && i.smsUnreadCount === t && i.smsUnreadNotCount === s)
                    return;
                let n = this.safeGetUnreadCached(e);
                n.smsUnreadCount = t,
                n.smsUnreadNotCount = s,
                this.forkUpdateCacheAndDB(n)
            }
            updateUnreadTTLConversation(e, t, s) {
                const i = this.getUnreadByConvIdSync(e);
                if (i) {
                    let n = i.smsUnreadCount
                      , r = i.smsUnreadNotCount;
                    t.filter((t=>t.ttlType === Oi.a.Message && this.isUnreadMessage({
                        message: this._getDeletedMsgByTTLItem(t, s),
                        convId: e,
                        lastProcessMsgId: i.lastProcessMsgId
                    }))).forEach((e=>{
                        const t = this._getDeletedMsgByTTLItem(e, s)
                          , i = Ke.default.getDataReminder(t)
                          , a = Bt.b.isMyMessage(t);
                        i && a && (t.idTo === qe.default.sendToMeId || a) ? (r -= 1,
                        n -= 1) : n -= 1
                    }
                    )),
                    this._updateTTLUnreadCount(e, Math.max(n, 0), Math.max(r, 0))
                }
            }
            updateUnreadCount(e, t) {
                const s = this.data.get(e) || null;
                if (this.logger.zsymb(0, 9683, 30021, "updateUnreadCount", e, null == s ? void 0 : s.smsUnreadCount),
                s && s.smsUnreadCount === t)
                    return;
                let i = this.safeGetUnreadCached(e);
                i.smsUnreadCount = t,
                this.forkUpdateCacheAndDB(i)
            }
            updateMentionCount(e, t) {
                this.logger.zsymb(0, 9683, 30022, "updateMentionCount", e, t);
                let s = this.safeGetUnreadCached(e);
                s.mentionUnreadCount = t,
                this.forkUpdateCacheAndDB(s, !1),
                Ei.a.updateUnreadMentions(this.getTotalMentionCount())
            }
            updateLastSeenReactId(e, t) {
                let s = this.safeGetUnreadCached(e);
                s.lastSeenReactId = t,
                this.forkUpdateCacheAndDB(s, !1)
            }
            updateUnreadMark(e, t) {
                let s = this.safeGetUnreadCached(e);
                s.unreadMark || (s.unreadMark = null),
                t || (t = null),
                t !== s.unreadMark && (this.total.unreadMark += t ? 1 : -1,
                Object(Pe.g)(this.name, Di),
                s.unreadMark = t,
                this.forkUpdateCacheAndDB(s))
            }
            shouldClearUnread(e, t) {
                const s = this.data.get(e)
                  , i = null == s ? void 0 : s.smsUnreadCount
                  , n = null == s ? void 0 : s.lastProcessMsgId;
                return !!i && !!(n && t && +t >= +n)
            }
            async forkUpdateCacheAndDB(e, t) {
                void 0 === t && (t = !0),
                this.data.set(e.convId, e),
                Object(Pe.g)(this.name, e.convId),
                t && this.isValidConvKey(e.convId) && this.unreadChanged(e.convId),
                await this.updateInDB(e)
            }
            safeGetUnreadCached(e) {
                const t = this.data.get(e);
                let s;
                return s = t ? Object(i.a)({}, t) : {
                    convId: e,
                    smsUnreadCount: 0,
                    smsUnreadNotCount: 0,
                    mentionUnreadCount: 0,
                    strangerUnreadCount: 0,
                    lastProcessMsgId: "0",
                    lastSeenReactId: "0",
                    unreadMark: null
                },
                s
            }
            getTotalMentionCount() {
                let e = 0;
                return this.data.forEach((t=>{
                    e += t.mentionUnreadCount
                }
                )),
                e
            }
            isValidConvKey(e) {
                return !(!e || e.length < 3) && ("null" != e && (e !== v.CONV_FILTER.STRANGER && e !== Di))
            }
            unreadChanged(e) {
                "null" != e && (this.updateTotalQueue.remove((e=>!0)),
                this.updateTotalQueue.push(e))
            }
            async calculateComputeUnreadCount(e) {
                try {
                    var t;
                    const i = this.getEmptyTotal()
                      , n = (null === (t = this.data.get(v.CONV_FILTER.STRANGER)) || void 0 === t ? void 0 : t.smsUnreadCount) || 0;
                    let r = 0
                      , a = 0;
                    const o = new Map
                      , c = new Map
                      , d = new Map;
                    ot.a.LabelDataManager.getAllLabelIds().map((e=>{
                        const t = "" + e;
                        d.set(t, t)
                    }
                    ));
                    const h = new Map
                      , g = [];
                    for (let e of Array.from(this.data.keys())) {
                        if (!this.isValidConvKey(e))
                            continue;
                        const t = this.data.get(e);
                        if (!t || Ct.a.isThreadHidden(e))
                            continue;
                        const s = Boolean(t.smsUnreadCount) || Boolean(t.smsUnreadNotCount) || Boolean(t.unreadMark);
                        if (s)
                            if (s && Ut.a.isArchivedChat(e) && !ce.default.isMuted(e)) {
                                let t = l.ModuleContainer.resolve(ut.h).getPreviewByIDSync(e);
                                t && a < parseInt(t.messageTime) && (a = parseInt(t.messageTime) || 0)
                            } else
                                h.set(e, t),
                                g.push(e)
                    }
                    Mi;
                    if ((await It.a.verifyOATypeAsync(g)).forEach((e=>{
                        let {cid: t, isOA: s} = e;
                        const n = h.get(t)
                          , a = n.convId
                          , l = this.acquireConvManager().getConvByIdSync(a)
                          , d = ce.default.isMuted(a);
                        const u = n.smsUnreadCount || 0
                          , g = n.smsUnreadNotCount || 0;
                        if (i.smsUnreadCount += u,
                        l && !d && !s && l.userId !== v.FAKE_CONVERSATION_ID.FRIEND_CENTER) {
                            const e = Math.max(u - g, 0);
                            i.smsUnreadNomute += e;
                            const t = l.label ? "" + l.label : ""
                              , s = "0" == t || !!t;
                            if (s && (o.has(t) ? o.set(t, o.get(t) + e) : o.set(t, e)),
                            n.unreadMark) {
                                const e = i.unreadMark || 0;
                                i.unreadMark = e + 1,
                                s && (c.has(t) ? c.set(t, c.get(t) + 1) : c.set(t, 1))
                            }
                            e > 0 && this.isInStrangerBox(a) && (r += e)
                        }
                    }
                    )),
                    this.total.smsUnreadCount !== i.smsUnreadCount || this.total.smsUnreadNomute !== i.smsUnreadNomute || this.total.unreadMark !== i.unreadMark) {
                        var s;
                        const t = null === (s = this.data.get(e)) || void 0 === s ? void 0 : s.smsUnreadCount
                          , n = ce.default.isMuted(e);
                        this.total = i,
                        this.dispatchEvent(new yt.a(yt.b.ChangeUnreadCount,Di,{
                            unreadNoMute: i.smsUnreadNomute,
                            totalUnread: i.smsUnreadCount,
                            convId: e,
                            currentUnread: t,
                            curentUnreadNoMute: n ? 0 : t
                        })),
                        this.data.set(Di, i),
                        Object(Pe.g)(this.name, Di)
                    }
                    const p = l.ModuleContainer.resolve(Kt.b).isShowUnreadArchivedChat()
                      , m = u.a.getInstance().getItemForCurrentUser("last_time_clear_archive_chat") || "0"
                      , f = a > parseInt(m);
                    if (f !== p && this.dispatchEvent(new yt.a(yt.b.ChangeUnreadArchiveChat,Di,{
                        hasUnreadArchivedChat: f
                    })),
                    n !== r) {
                        const e = this.safeGetUnreadCached("");
                        e.smsUnreadCount = r,
                        e.convId = v.CONV_FILTER.STRANGER,
                        this.data.set(v.CONV_FILTER.STRANGER, e),
                        Object(Pe.g)(this.name, v.CONV_FILTER.STRANGER)
                    }
                    for (let e of Array.from(o.keys())) {
                        const t = this.safeGetUnreadCached("");
                        t.smsUnreadCount = o.get(e),
                        t.unreadMark = c.get(e),
                        this.data.set(e, t),
                        d.delete(e),
                        Object(Pe.g)(this.name, e)
                    }
                    for (let e of Array.from(d.keys()))
                        this.data.delete(e) && Object(Pe.g)(this.name, e)
                } catch (i) {
                    this.logger.zsymb(21, 9683, 30027, " unread err - contact phucnh7 please!!! {}", i)
                }
            }
            acquireConvManager() {
                return ot.a.ConvInfoDataManager
            }
            onLoadUnreadFromDBV2(e, t) {
                if (this.logger.zsymb(0, 9683, 30029, "onLoadUnreadFromDB", t.length),
                t.length < 1)
                    return;
                const s = (new Date).getTime().toString();
                Object(Pe.i)(s);
                for (let i = 0; i < t.length; i++) {
                    const n = t[i];
                    if (di.b.isRead({
                        userId: n.convId,
                        msgId: +n.lastProcessMsgId,
                        e2eeStatus: void 0,
                        actionId: void 0,
                        msgSendDttm: void 0,
                        msgLocalId: void 0
                    }) && (n.smsUnreadCount || n.smsUnreadNotCount) && (this.logger.zsymb(0, 9683, 30030, "clear offline", n.convId, n.smsUnreadCount),
                    n.smsUnreadCount = 0,
                    n.strangerUnreadCount = 0,
                    n.smsUnreadNotCount = 0),
                    this.pendingClearUnread.has(n.convId)) {
                        const e = this.pendingClearUnread.get(n.convId);
                        e && e >= +n.lastProcessMsgId && (this.logger.zsymb(0, 9683, 30031, "clear pending", this.pendingClearUnread.size, n.convId),
                        n.smsUnreadCount = 0,
                        n.strangerUnreadCount = 0,
                        n.smsUnreadNotCount = 0)
                    }
                    "null" === n.lastProcessMsgId && (n.lastProcessMsgId = ""),
                    this.data.set(n.convId, n),
                    Object(Pe.f)(s, this.name, n.convId),
                    e === ji && this.updateInDB(n),
                    n.unreadMark && this.total.unreadMark++
                }
                this.pendingClearUnread.clear(),
                this.processPendingMessages(),
                Object(Pe.c)(s)
            }
            processPendingMessages() {
                this.logger.zsymb(0, 9683, 30032, "start processPendingMessages", this.pendingMessage.size),
                this.pendingMessage.forEach(((e,t)=>{
                    const s = new Map
                      , i = this.data.get(t);
                    e.forEach((e=>{
                        var t;
                        (!i || i.lastProcessMsgId < e.msgId) && s.set(`${(t = e).uidFrom || t.fromUid}_${t.idTo || t.toUid}_${t.cliMsgId}`, e)
                    }
                    )),
                    this.logger.zsymb(0, 9683, 30033, "check processPendingMessages #2", t, null == i ? void 0 : i.smsUnreadCount, e.map((e=>e.msgId)), s.keys());
                    const n = Array.from(s.values())
                      , r = Bt.b.getLastMessageInList(n);
                    this.handleNewMessages(t, n, null == r ? void 0 : r.msgId)
                }
                )),
                this.pendingMessage.clear()
            }
            handleNewMessages(e, t, s) {
                if (!t || !t.length)
                    return;
                let i = !1;
                const n = {
                    convId: e,
                    strangerUnreadCount: 0,
                    smsUnreadCount: 0,
                    smsUnreadNotCount: 0,
                    mentionUnreadCount: 0,
                    lastProcessMsgId: s,
                    lastSeenReactId: "0"
                }
                  , r = Date.now()
                  , a = new Set;
                if (t.forEach((t=>{
                    const o = Bt.b.isMyMessage(t);
                    if (t.status !== v.MSG_READ && !o) {
                        const s = t.ts || t.serverTime || t.sendDttm;
                        di.b.isRead({
                            userId: e,
                            actionId: t.actionId,
                            msgId: t.msgId,
                            msgSendDttm: s,
                            msgLocalId: void 0,
                            e2eeStatus: Object(_i.f)(t)
                        }) && (qe.default.stagingAccount && this.logger.zsymb(0, 9683, 30034, `mark msg status as read ${e} ${t.actionId} ${t.msgId}`),
                        t.status = v.MSG_READ)
                    }
                    let l = hi.a.get(t.msgId, t.status);
                    l != t.status && qe.default.stagingAccount && this.logger.zsymb(0, 9683, 30035, `change msg status ${t.status} => ${l}`),
                    t.status = l;
                    let c = !1;
                    if ("chat.todo" === t.msgType) {
                        let e = t.content;
                        if (e) {
                            "todo.remind" === e.action && (c = !0)
                        }
                    }
                    let d = Ke.default.getDataReminder(t);
                    var h, u;
                    t.status !== v.MSG_READ && !o || !0 === c ? (t.paramsExt && Ke.default.valueValid(t.paramsExt.countUnread) && 0 == t.paramsExt.countUnread && (n.smsUnreadNotCount += 1),
                    this.isCallTimeMessage(t) || (n.smsUnreadCount += 1,
                    n.strangerUnreadCount += 1),
                    ci.b.isMessageMentionMe(t) && n.mentionUnreadCount++) : d && o && (t.idTo === qe.default.sendToMeId || o) ? (n.smsUnreadCount += 1,
                    n.smsUnreadNotCount += 1,
                    this.logger.zsymb(0, 9683, 30036, `new unread #2: ${r} ${e} ${t.msgId} ${t.idTo} ${t.toUid} ${t.src} ${s}`)) : !(h = t) || "0" == h.uidFrom && (null === (u = h.paramsExt) || void 0 === u ? void 0 : u.platformType) == os.i.DeviceIds.SYSTEM ? (a.add(t.msgId),
                    this.logger.zsymb(0, 9683, 30037, "_addMessages: skipped clear unread for", t.idTo)) : t.isCallMessage || (n.smsUnreadCount = 0,
                    n.strangerUnreadCount = 0,
                    n.mentionUnreadCount = 0,
                    i = !0),
                    n.smsUnreadCount > 0 && is.b.markGotUnread(e, t.msgId),
                    is.b.isLastMsgV2(t) && this.onDoneOffLineMessages()
                }
                )),
                a.has(s))
                    for (let l = t.length - 1; l >= 0; l--) {
                        const s = t[l];
                        if (Ke.default.validMessageFromServer(s) && !a.has(s.msgId)) {
                            this.logger.zsymb(0, 9683, 30038, "update last process id", e, n.lastProcessMsgId, s.msgId),
                            n.lastProcessMsgId = s.msgId;
                            break
                        }
                        var o;
                        0 == l && (n.lastProcessMsgId = (null === (o = this.data.get(e)) || void 0 === o ? void 0 : o.lastProcessMsgId) || "0")
                    }
                return this.updateUnread(e, i, n)
            }
            handlePreviewMsgs() {
                if (!this.previewMsgs.length)
                    return;
                const e = [...this.previewMsgs];
                this.previewMsgs = [],
                this.logger.zsymb(0, 9683, 30039, "handle preview", e.map((e=>e.msgId))),
                e.forEach((e=>{
                    const t = e.toUid
                      , s = yi.default.checkDuplicate(t, {
                        uidFrom: e.fromUid,
                        cliMsgId: e.cliMsgId
                    });
                    s && s.src && s.msgId !== e.msgId && (this.logger.zsymb(0, 9683, 30040, "detect dup msg", e.msgId, s.msgId),
                    e.msgId = s.msgId),
                    this.onReceiveNewMessages(t, e.msgId, [e])
                }
                ))
            }
            updateUnread(e, t, s) {
                let i = this.data.get(e);
                if (i) {
                    const e = i.lastSeenReactId || "0";
                    t ? i = s : (i.smsUnreadNotCount += s.smsUnreadNotCount,
                    i.smsUnreadCount += s.smsUnreadCount,
                    i.strangerUnreadCount += s.strangerUnreadCount,
                    i.mentionUnreadCount += s.mentionUnreadCount,
                    i.lastProcessMsgId = s.lastProcessMsgId),
                    i.lastSeenReactId = e
                } else {
                    if (i = s,
                    !i)
                        return void this.logger.zsymb(18, 9683, 30041, `updateUnread undefined item ${e}`);
                    i.lastSeenReactId = Li.a.getLastSeen(e) || "0"
                }
                this.data.set(e, Object.assign({}, i)),
                this.updateInDB(i),
                0 != s.mentionUnreadCount && Ei.a.updateUnreadMentions(this.getTotalMentionCount()),
                this.unreadChanged(e)
            }
            isInStrangerBox(e) {
                const t = ot.a.ConvInfoDataManager.getConvByIdSync(e);
                return ui.a.isInStrangerBox(t)
            }
            isCallTimeMessage(e) {
                if ("chat.recommended" === e.msgType && e.content) {
                    if (e.content.action === v.CallMessageAction.CallTime)
                        return !0;
                    if (e.content.action === v.CallMessageAction.MissCall) {
                        let s = e.content.params;
                        if ("string" == typeof s)
                            try {
                                s = JSON.parse(e.content.params)
                            } catch (t) {}
                        if (s && 3 === s.reason)
                            return !0
                    }
                }
                return !1
            }
            clearUnreadConversation(e, t) {
                if (void 0 === t && (t = {}),
                e && e.smsUnreadCount)
                    try {
                        let s = !0
                          , i = Object.keys(t);
                        i && 0 != i.length || (s = !1,
                        this.logger.zsymb(0, 9683, 30043, `[read-message] actually, no need send seen in that case 2: ${i.length}`)),
                        !s && qe.default.chat_aggressive_send_seen && (s = !0),
                        s ? i && 0 !== i.length ? this.sendClearUnreadToServer(t, e.userId) : ce.default.getLastMessageFrom(e.userId, e.lastSmsLocalId, Fi, e.smsUnreadCount, !0).then((t=>{
                            let s = []
                              , i = {};
                            if (t && t.length)
                                for (let e = 0; e < t.length; e++) {
                                    let n = t[e];
                                    Ke.default.validMessageFromOther(n) && n.zglobalMsgId && -1 != n.zglobalMsgId && (s.push(n.zglobalMsgId),
                                    i[n.zglobalMsgId] = n)
                                }
                            0 === s.length ? this.logger.zsymb(3, 9683, 30044, "- [read-message] get ids.length == 0 {}", e.userId) : this.sendClearUnreadToServer(i, e.userId)
                        }
                        )).catch((e=>{
                            this.logger.zsymb(21, 9683, 30045, " [read-message] get msgs err {}", e)
                        }
                        )) : this.logger.zsymb(3, 9683, 30046, "[read-message] no send {}", e.userId)
                    } catch (s) {
                        this.logger.zsymb(21, 9683, 30047, "[read-message] err {}", s)
                    }
                else
                    this.logger.zsymb(0, 9683, 30042, `[read-message] actually, no need send seen in that case 1: ${null == e ? void 0 : e.userId}`)
            }
            async sendClearUnreadToServer(e, t) {
                void 0 === e && (e = {});
                const s = Object.keys(e)
                  , i = ui.a.isGroup(t)
                  , n = fi.a.newReq();
                try {
                    await He.default.sendSeen(e, t, i, n),
                    qe.default.stagingAccount && this.logger.zsymb(0, 9683, 30048, `[read-message] done ${t} msgId:\n\t\t\t\t\t${s && s.length ? s[s.length - 1] : 0}`)
                } catch (r) {
                    if (this.logger.zsymb(21, 9683, 30049, "[read-message] err {}", r),
                    !(s && s.length > 0))
                        throw this.logger.zsymb(21, 9683, 30051, "[read-message] send seen fail!!! convId:{} msgId len = 0", t),
                        r;
                    if (this.logger.zsymb(21, 9683, 30050, "[read-message] send seen fail!! convId:{} msgId:{}", t, s[s.length - 1]),
                    r && (114 === r.error_code || -69 === r.error_code))
                        throw this.logger.zsymb(21, 9683, 30052, "[read-message] send seen fail!!! no need retry {}", r.error_code),
                        r;
                    throw qe.default.retrySendSeen ? (this.logger.zsymb(21, 9683, 30053, "[read-message] send seen fail!!! retry"),
                    mi.b.retryAction(mi.a.SEND_SEEN_V2, [e, t, i, n], {
                        startedTime: Date.now(),
                        duration: qe.default.retrySendSeen.timeout
                    })) : this.logger.zsymb(21, 9683, 30054, "[read-message] send seen fail!!! not retry"),
                    r
                }
            }
            broadcastEvent(e, t, s) {
                this.dispatchEvent(new yt.a(e,t,s))
            }
            updateInDB(e) {
                null == e.lastSeenReactId && (e.lastSeenReactId = Li.a.getLastSeen(e.convId) || "0",
                this.logger.zsymb(18, 9683, 30055, `update invalid lastSeen ${e.convId}`)),
                this.DBConvUnread.addOrUpdate(e)
            }
            deleteInDB(e) {
                this.DBConvUnread.remove(e)
            }
        }
        ) || Ii) || Ii) || Ii);
        var Bi = s("8Nax")
          , Ui = s("GSHL")
          , ki = s("w5bt");
        let Gi;
        var xi, zi;
        (xi = Gi || (Gi = {})).modelToEntity = function(e) {
            if (!e)
                throw new Error("[PreviewHelper] Convert undefined model to entity");
            return {
                convId: e.convId,
                msgId: e.msgId,
                dName: e.dName,
                message: e.message,
                messageType: e.messageType,
                messageTime: e.messageTime,
                isGroup: e.isGroup,
                fromUid: e.fromUid,
                toUid: e.toUid,
                urgencyLevel: e.urgencyLevel,
                properties: e.properties ? {
                    type: e.properties.type
                } : null,
                mentions: e.mentions ? e.mentions : null,
                ttl: e.ttl,
                cliMsgId: e.cliMsgId,
                actionId: e.actionId,
                status: e.status,
                substate: e.substate,
                computedMessage: e.computedMessage,
                computedIcon: e.computedIcon
            }
        }
        ,
        xi.entityToModel = function(e) {
            return e ? {
                convId: e.convId,
                msgId: e.msgId,
                dName: e.dName,
                message: e.message,
                messageType: e.messageType,
                messageTime: e.messageTime,
                isGroup: e.isGroup,
                fromUid: e.fromUid,
                toUid: e.toUid,
                urgencyLevel: e.urgencyLevel,
                properties: e.properties,
                mentions: e.mentions,
                ttl: e.ttl,
                cliMsgId: e.cliMsgId,
                actionId: e.actionId,
                status: e.status,
                substate: e.substate,
                computedMessage: e.computedMessage,
                computedIcon: e.computedIcon,
                src: "db.preview",
                verified: !1
            } : null
        }
        ;
        const Vi = "zpm_m"
          , $i = "1.0.0";
        Object(mt.b)(ki.b)(zi = function(e, t) {
            return l.ModuleContainer.inject(Ui.b)(e, void 0, 0)
        }(zi = Reflect.metadata("design:type", Function)(zi = Reflect.metadata("design:paramtypes", [void 0 === yt.IReactiveDB ? Object : yt.IReactiveDB])(zi = class extends k.b {
            constructor(e) {
                super(),
                this.DBConvPreview = e,
                this.name = void 0,
                this.key = void 0,
                this.didInit = void 0,
                this.data = void 0,
                this.list = void 0,
                this.deleteQueue = void 0,
                this.doneLoadDB = void 0,
                this.migrating = void 0,
                this._Logger = void 0,
                this.name = ki.a,
                this.key = "convId",
                this.didInit = !1,
                this.data = new Map,
                this.list = new Map,
                this.deleteQueue = [],
                this.doneLoadDB = !1,
                this.migrating = !1
            }
            init() {
                return this.didInit ? Promise.resolve() : (this.didInit = !0,
                this.loadData())
            }
            get Logger() {
                return this._Logger || (this._Logger = l.ModuleContainer.resolve(P.ZLoggerFactory).createZLogger("conversation", [this.name])),
                this._Logger
            }
            signalRenderItem(e, t) {
                Object(Pe.g)(e, t),
                this.broadcastEvent(yt.b.PreviewChanged, t, {
                    changedItem: this.data.get(t),
                    all: Array.from(this.data.values())
                })
            }
            loadData() {
                return new Promise(((e,t)=>{
                    u.a.getInstance().getItemForCurrentUser(Vi) !== $i || this.migrating ? e() : (this.Logger.zsymb(3, 9400, 3e4, "start load preview"),
                    this.DBConvPreview.getAll().then((t=>{
                        this.onLoadPreviewsFromDB(t).then(e).catch((t=>{
                            this.Logger.zsymb(21, 9400, 30001, "load previews from db failure #1! {}", t),
                            e()
                        }
                        ))
                    }
                    )).catch((t=>{
                        this.Logger.zsymb(21, 9400, 30002, "load preview from db failure #2! {}", t),
                        e()
                    }
                    )))
                }
                ))
            }
            async revalidate(e) {
                const t = !!this.getPreviewByIDSync(e)
                  , s = await ni.b.getPreviewMessage(e).catch((s=>(this.Logger.zsymb(21, 9400, 30003, "revalidate failure #1 {} {} {}", e, t, s),
                {
                    previewMsg: void 0
                })));
                return !!s.previewMsg && this.onReceiveNewMessage("db.message", s.previewMsg).then((s=>(this.Logger.zsymb(3, 9400, 30004, "revalidate success {} {} {}", e, t, s),
                !0))).catch((s=>(this.Logger.zsymb(21, 9400, 30005, "revalidate failure #2 {} {} {}", e, t, s),
                !1)))
            }
            migrate(e, t) {
                return void 0 === t && (t = !1),
                new Promise((s=>{
                    const i = u.a.getInstance().getItemForCurrentUser(Vi);
                    if (i === $i && !t)
                        return;
                    if (this.Logger.zsymb(3, 9400, 30006, "start migrate {} {}", i, t),
                    this.migrating = !0,
                    0 === e.length)
                        return this.doneMigratePreivew(0),
                        s(0);
                    let n = 0
                      , r = 0;
                    const a = ()=>{
                        if (n++,
                        n === e.length)
                            return this.doneMigratePreivew(r),
                            s(r)
                    }
                      , o = ()=>{
                        r++,
                        a()
                    }
                      , l = ()=>{
                        for (let t = 0; t < e.length; t++)
                            ni.b.getPreviewMessage(e[t]).then((s=>{
                                s && s.previewMsg ? this.onReceiveNewMessage("db.message", s.previewMsg).then(o).catch(a) : (this.Logger.zsymb(3, 9400, 30007, "migrate not exists msg {}", e[t]),
                                a())
                            }
                            )).catch((s=>{
                                a(),
                                this.Logger.zsymb(21, 9400, 30008, "migrate failure for conv {} {}", e[t], s)
                            }
                            ))
                    }
                    ;
                    let c = e.filter((e=>e !== v.FAKE_CONVERSATION_ID.FRIEND_CENTER && e !== v.FAKE_CONVERSATION_ID.GROUP_CENTER && !e.startsWith(v.GROUPID_PREFIX)));
                    if (c.length > 0)
                        return rt.default.getProfileFriendByIds(c, v.SRC_GET_PROFILE.FETCH_MINI_INFO).then((()=>{
                            l()
                        }
                        )).catch((()=>{
                            l()
                        }
                        ));
                    l()
                }
                ))
            }
            doneMigratePreivew(e) {
                this.Logger.zsymb(3, 9400, 30009, "done migrate preview {}", e);
                u.a.getInstance().setItemForCurrentUser(Vi, $i),
                this.broadcastEvent(yt.b.DoneMigratePreview, "")
            }
            upgradeItemsVersion(e) {
                void 0 === e && (e = []),
                this.Logger.zsymb(3, 9400, 30010, "upgradeItemsVersion");
                const t = (new Date).getTime().toString();
                Object(Pe.i)(t),
                0 !== e.length ? e.forEach((e=>{
                    Object(Pe.f)(t, this.name, e)
                }
                )) : this.data.forEach((e=>{
                    Object(Pe.f)(t, this.name, e.convId)
                }
                )),
                Object(Pe.c)(t)
            }
            updateStrangerBox(e) {
                const t = this.data.get(e);
                t && (this.data.set(v.CONV_FILTER.STRANGER, Object(i.a)({}, t)),
                Object(Pe.g)(this.name, v.CONV_FILTER.STRANGER))
            }
            forceChangeItem(e) {
                this.signalRenderItem(this.name, e)
            }
            getItem(e, t) {
                const s = this.data.get(e.key);
                return s || this.Logger.zsymb(5, 9400, 30011, "try to get item not exist in cache {}", e.key),
                s
            }
            getList(e, t) {
                return Array.from(this.data.keys())
            }
            onGetItemFailure(e) {
                this.Logger.zsymb(11, 9400, 30012, "onGetItemFailure {}", e)
            }
            onGetListFailure(e, t) {
                this.Logger.zsymb(11, 9400, 30013, "onGetListFailure {} {}", e, t)
            }
            onLoadPreviewsFromDB(e) {
                return new Promise(((t,s)=>{
                    if (this.Logger.zsymb(3, 9400, 30014, "onLoadPreviewsFromDB {}", null == e ? void 0 : e.length),
                    !e || 0 === e.length)
                        return this.doneLoadPreview(0),
                        t();
                    let i = 0;
                    const n = ()=>{
                        i++,
                        i === e.length && (this.doneLoadPreview(i),
                        t())
                    }
                    ;
                    for (let r = 0; r < e.length; r++) {
                        const t = Gi.entityToModel(e[r]);
                        t && !Bi.a.instance.filterExpiredPreview(t) && (t.messageType = v.MSG_VANISH,
                        t.message = "",
                        this.updateInDB(t)),
                        this.addPreviewToManager(t).then((()=>{
                            n()
                        }
                        )).catch((e=>{
                            n(),
                            this.Logger.zsymb(21, 9400, 30015, "onload preview failure for item {} {}", null == t ? void 0 : t.convId, e)
                        }
                        ))
                    }
                }
                ))
            }
            doneLoadPreview(e) {
                this.Logger.zsymb(3, 9400, 30016, "doneLoadPreview {}", e),
                this.doneLoadDB = !0,
                this.broadcastEvent(yt.b.DoneLoadPreview, "", Array.from(this.data.values())),
                Object(Pe.h)(this.name, "all")
            }
            onReceiveNewMessage(e, t) {
                return new Promise(((s,i)=>{
                    if (!t)
                        return s(!1);
                    const n = this.convertDBMessageToPreviewItem(e, t);
                    this.addPreviewToManager(n).then((e=>e ? (this.signalRenderItem(this.name, t.toUid),
                    s(!0)) : s(!1))).catch(i)
                }
                ))
            }
            onReceiveNewMessages(e, t) {
                return new Promise((s=>{
                    if (!t)
                        return s(!1);
                    const i = this.groupMessageByConvId(t)
                      , n = [];
                    for (const e in i) {
                        if (!Object.prototype.hasOwnProperty.call(i, e))
                            continue;
                        const t = i[e];
                        for (let e = t.length - 1; e >= 0; e--) {
                            if (Bt.b.isValidPreviewMessage(t[e])) {
                                n.push(t[e]);
                                break
                            }
                            this.Logger.zsymb(3, 9400, 30017, "receive msg but not preview {}", t[e].msgId)
                        }
                    }
                    return n.length ? Promise.all(n.map((async t=>this.onReceiveNewMessage(e, t)))).then((e=>{
                        const t = e.some((e=>1 == e));
                        s(t)
                    }
                    )).catch((e=>{
                        this.Logger.zsymb(21, 9400, 30018, "add messages to preview got error {}", e),
                        s(!1)
                    }
                    )) : s(!1)
                }
                ))
            }
            onUndoMessage(e, t) {
                if (!t)
                    return;
                this.Logger.zsymb(3, 9400, 30019, "onUndoMessage {}", t.msgId);
                const s = this.convertDBMessageToPreviewItem(e, t);
                s.messageType = v.MSG_UNDO,
                s.message = "",
                this.addPreviewToManager(s).then((e=>{
                    e && this.signalRenderItem(this.name, t.toUid)
                }
                ))
            }
            onUpdateE2EEMessage(e, t) {
                if (!t)
                    return;
                const s = t.toUid
                  , i = this.data.get(s);
                if (this.Logger.zsymb(3, 9400, 30020, "onUpdateE2EEMessage {} {} {}", s, null == i ? void 0 : i.msgId, t.msgId),
                i && (i.msgId !== t.msgId || !ci.b.isSameMsg(i, t)))
                    return;
                const n = this.convertDBMessageToPreviewItem(e, t)
                  , r = Ke.default.normalizeMessageTypeFromSubState(null == t ? void 0 : t.e2eeStatus) || t.msgType;
                n.message = n.message || Bt.b.getPlainText({
                    msgType: r
                }),
                n.verified = !0,
                n.messageType = r,
                this.data.set(t.toUid, n),
                this.updateInDB(n),
                this.signalRenderItem(this.name, t.toUid)
            }
            onDeleteMessage(e, t) {
                return new Promise(((e,s)=>{
                    if (!t)
                        return e(!1);
                    this.Logger.zsymb(3, 9400, 30021, "onDeleteMessage {}", t.msgId);
                    const i = this.convertDBMessageToPreviewItem("db.message", t);
                    this.deleteMessageInManager(i).then((s=>{
                        s ? (this.Logger.zsymb(3, 9400, 30022, "onDeleteMessage success {}", t.msgId),
                        this.signalRenderItem(this.name, t.toUid),
                        e(!0)) : e(!1)
                    }
                    ))
                }
                ))
            }
            onDeleteMessages(e, t) {
                if (!t || t.length < 1)
                    return;
                const s = this.groupMessageByConvId(t);
                for (const i in s)
                    if (Object.prototype.hasOwnProperty.call(s, i)) {
                        const t = s[i];
                        let n = this.convertDBMessageToPreviewItem(e, t[0])
                          , r = 0;
                        for (let s = 1; s < t.length; s++) {
                            const i = this.convertDBMessageToPreviewItem(e, t[s]);
                            this.isSecondItemNewer(n, i) && (r = s,
                            n = i)
                        }
                        this.onDeleteMessage(e, t[r])
                    }
            }
            onDeleteConversation(e) {
                e && (this.Logger.zsymb(3, 9400, 30023, "onDeleteConversation {}", e),
                this.data.delete(e) && Object(Pe.e)(this.name, e),
                this.deleteInDB(e))
            }
            onChangeDraft(e, t) {
                let s = this.getPreviewByIDSync(e);
                !e || !s || s.draft === t || s.draft && t && s.draft.draftTime === t.draftTime ? this.Logger.zsymb(3, 9400, 30024, "onChangeDraft - reject {}", !!s) : (this.Logger.zsymb(3, 9400, 30025, "onChangeDraft - call update {}", !!s),
                s = Object(i.a)(Object(i.a)({}, s), {}, {
                    draft: t
                }),
                this.data.set(e, s),
                this.signalRenderItem(this.name, e),
                this.broadcastEvent(yt.b.DraftChanged))
            }
            getPreviewById(e) {
                return new Promise(((t,s)=>{
                    if (this.data.has(e))
                        return t(this.data.get(e));
                    this.DBConvPreview.getById(e).then((s=>{
                        s || this.Logger.zsymb(3, 9400, 30026, "get item not exist with id {}", e);
                        const i = Gi.entityToModel(s);
                        t(i || void 0)
                    }
                    )).catch(s)
                }
                ))
            }
            getPreviewByIDSync(e) {
                return this.data.get(e)
            }
            getAllPreviews() {
                return new Promise(((e,t)=>{
                    if (this.doneLoadDB)
                        return e(this.getAllPreviewsSync());
                    this.DBConvPreview.getAll().then((t=>{
                        const s = t.map((e=>Gi.entityToModel(e)));
                        e(s)
                    }
                    )).catch(t)
                }
                ))
            }
            getAllPreviewsSync() {
                return Array.from(this.data.values()) || []
            }
            setPreview(e, t, s, i, n, r, a) {
                void 0 === r && (r = 1),
                void 0 === a && (a = {});
                const o = this.data.get(e);
                this.Logger.zsymb(3, 9400, 30027, "call set preview {} {}", e, !!o);
                const l = {
                    convId: e,
                    msgId: a.msgId || "unset",
                    src: "ui",
                    dName: a.dName || "",
                    message: t,
                    messageType: "",
                    isGroup: e.startsWith(v.GROUPID_PREFIX),
                    messageTime: s,
                    fromUid: i,
                    toUid: n,
                    urgencyLevel: a.urgencyLevel,
                    properties: null,
                    verified: !0,
                    status: r,
                    computedMessage: t,
                    computedIcon: a.icon
                };
                this.data.set(e, l),
                this.signalRenderItem(this.name, e),
                this.updateInDB(l)
            }
            async addPreviewToManager(e) {
                if (!e)
                    return !1;
                const t = e.convId
                  , s = this.data.get(t);
                let i = !1;
                return s ? this.isSecondItemNewer(s, e) && (this.data.set(t, e),
                i = !0,
                s.verified ? (e.verified = !0,
                this.updateInDB(e)) : i = await this.compareCacheWithDBAndUpdate(t, e)) : (this.data.set(t, e),
                i = !0,
                "db.preview" !== e.src && (i = await this.compareCacheWithDBAndUpdate(t, e))),
                i
            }
            async deleteMessageInManager(e) {
                if (!e)
                    return !1;
                const t = e.convId
                  , s = this.data.get(t);
                if (!s || !ci.b.isSameMsg(e, s) && this.isSecondItemNewer(e, s))
                    return 0 !== this.deleteQueue.length && this.deleteQueue.push(e),
                    !1;
                const i = async()=>{
                    const e = await ni.b.getPreviewMessage(t)
                      , s = this.deleteQueue.find((t=>{
                        var s;
                        return t.msgId === (null === (s = e.previewMsg) || void 0 === s ? void 0 : s.msgId)
                    }
                    ));
                    if (s)
                        return this.data.set(t, s),
                        await this.deleteMessageInManager(s);
                    if (this.deleteQueue = [],
                    e.previewMsg) {
                        const s = this.convertDBMessageToPreviewItem("db.message", e.previewMsg);
                        return s.verified = !0,
                        this.data.set(t, s),
                        this.updateInDB(s),
                        !0
                    }
                    return this.data.delete(t),
                    this.deleteInDB(t),
                    Object(Pe.e)(this.name, t),
                    !1
                }
                ;
                if (s.verified)
                    return await i();
                {
                    const s = await this.DBConvPreview.getById(t)
                      , n = s && Gi.entityToModel(s);
                    return n && this.isSecondItemNewer(e, n) ? (this.data.set(t, n),
                    !0) : await i()
                }
            }
            convertDBMessageToPreviewItem(e, t) {
                let s = t.sendDttm || t.serverTime;
                s = s ? s.toString() : "";
                const i = t.fromUid || t.uidFrom
                  , n = t.toUid || t.idTo
                  , r = n && n.startsWith(v.GROUPID_PREFIX);
                return {
                    convId: t.toUid,
                    msgId: t.msgId,
                    src: e,
                    dName: t.dName || "",
                    message: t.message,
                    messageType: t.msgType,
                    mentions: t.mentions,
                    isGroup: r,
                    messageTime: s,
                    fromUid: i,
                    properties: t.properties,
                    urgencyLevel: t.urgency,
                    verified: !1,
                    ttl: t.ttl,
                    status: t.status || 1,
                    substate: t.e2eeStatus,
                    cliMsgId: t.cliMsgId,
                    toUid: t.toUid
                }
            }
            isSecondItemNewer(e, t) {
                return !e || (t.msgId === e.msgId && t.messageTime === e.messageTime || ci.b.isSameMsg(e, t) ? t.messageType === v.MSG_UNDO && e.messageType !== v.MSG_UNDO || It.a.comparePreviewStt(t.status, e.status) > 0 : e.messageTime !== t.messageTime ? t.messageTime > e.messageTime : t.msgId > e.msgId)
            }
            compareCacheWithDBAndUpdate(e, t) {
                return new Promise(((s,i)=>{
                    this.DBConvPreview.getById(e).then((i=>{
                        this.Logger.zsymb(3, 9400, 30028, "compareCacheWithDBAndUpdate {} {}", e, !!i);
                        const n = Gi.entityToModel(i)
                          , r = this.data.get(e);
                        if (JSON.stringify(r) !== JSON.stringify(t))
                            return s(!1);
                        !n && r || n && r && this.isSecondItemNewer(n, r) ? (r.verified = !0,
                        this.updateInDB(r)) : n && this.data.set(e, n),
                        s(!0)
                    }
                    )).catch(i)
                }
                ))
            }
            groupMessageByConvId(e) {
                const t = {};
                for (let s = 0; s < e.length; s++)
                    t[e[s].toUid] ? t[e[s].toUid].push(e[s]) : t[e[s].toUid] = [e[s]];
                return t
            }
            broadcastEvent(e, t, s) {
                void 0 === t && (t = ""),
                this.dispatchEvent(new yt.a(e,t,s))
            }
            updateInDB(e) {
                this.Logger.zsymb(3, 9400, 30029, "update in db {}", e.msgId);
                try {
                    const t = Gi.modelToEntity(e);
                    this.DBConvPreview.addOrUpdate(t)
                } catch (t) {
                    this.Logger.zsymb(21, 9400, 30030, "update in db got err{}", t)
                }
            }
            deleteInDB(e) {
                this.DBConvPreview.remove(e).catch((e=>{
                    this.Logger.zsymb(18, 9400, 30031, `[${this.name}] - deleteInDB got error ${e}`)
                }
                ))
            }
        }
        ) || zi) || zi) || zi);
        var qi = s("rKwX")
          , Wi = s("SWKE");
        class Hi {
            constructor() {
                this.cache = void 0,
                this.cache = {}
            }
            localKey(e) {
                return "z_ml_" + e
            }
            muteConversation(e, t) {
                const s = u.a.getInstance()
                  , i = "z_ml_" + e;
                t ? t.constructor === Object ? s.setItemForCurrentUser(this.localKey(e), JSON.stringify(t)) : s.setItemForCurrentUser(this.localKey(e), `${t}`) : s.removeItemForCurrentUser(i),
                this.cache[e] = t || !1
            }
            isMuted(e) {
                if (this.cache.hasOwnProperty(e))
                    return this.cache[e];
                let t, s = u.a.getInstance().getItemForCurrentUser(this.localKey(e));
                if (!s)
                    return null;
                try {
                    return t = JSON.parse(s),
                    this.cache[e] = t,
                    t
                } catch (i) {
                    Ke.default.logCoreError(i)
                }
                return this.cache[e] = !1,
                !1
            }
            setMutedConversations(e) {
                let t = [];
                e.chatEntries && e.chatEntries.length > 0 && e.chatEntries.reduce(((e,t)=>(e.push(t),
                e)), t),
                e.groupChatEntries && e.groupChatEntries.length > 0 && e.groupChatEntries.reduce(((e,t)=>(t.id = v.GROUPID_PREFIX + t.id,
                e.push(t),
                e)), t);
                Wi.a.getInstance().cleanupLocalStorageMatchConditions((e=>{
                    const t = u.a.getInstance().getKeyNameForCurrentUser(this.localKey(""));
                    return e.startsWith(t)
                }
                )),
                this.cache = {};
                for (let s = 0; s < t.length; s++)
                    this.muteConversation(t[s].id, t[s]);
                return t
            }
        }
        var Ki;
        Object(mt.b)(ut.f)(Ki = Reflect.metadata("design:type", Function)(Ki = Reflect.metadata("design:paramtypes", [])(Ki = class extends k.b {
            constructor() {
                super(),
                this.name = void 0,
                this.key = void 0,
                this.didInit = void 0,
                this._muteManager = void 0,
                this.userId = void 0,
                this.mapTimeout = void 0,
                this.name = ut.e,
                this.key = "id",
                this.didInit = !1,
                this.userId = "",
                this.mapTimeout = {}
            }
            init(e) {
                this.didInit || (this.didInit = !0,
                this.userId = e)
            }
            get muteManager() {
                return this._muteManager && "" !== this.userId || (this.userId,
                this._muteManager = new Hi),
                this._muteManager
            }
            getItem(e, t) {
                return this.muteManager.isMuted(e.key)
            }
            getList(e, t) {
                throw new Error("Method not implemented.")
            }
            onGetItemFailure(e) {}
            onGetListFailure(e, t) {}
            onMute(e, t) {
                return new Promise(((s,i)=>{
                    this._clearTimeout(e);
                    let n = -1;
                    switch (t) {
                    case 1:
                        n = 3600;
                        break;
                    case 2:
                        n = 14400;
                        break;
                    case 3:
                        n = Math.round(this._getNowTo8Am() / 1e3)
                    }
                    Ke.default.logCoreInfo(`[${this.name}] - onMute ${e} ${n}`),
                    qi.a.lock(e, n, !0).then((t=>{
                        this.muteManager.muteConversation(e, {
                            id: e,
                            startTime: t.startTime,
                            duration: t.duration,
                            systemTime: t.systemTime,
                            currentTime: t.currentTime,
                            muteMode: t.muteMode
                        }),
                        s(!0)
                    }
                    )).catch(i)
                }
                ))
            }
            onUnMute(e, t, s) {
                return void 0 === t && (t = !0),
                void 0 === s && (s = !1),
                new Promise(((i,n)=>{
                    this._clearTimeout(e),
                    Ke.default.logCoreInfo(`[${this.name}] - onUnMute ${e} ${t} ${s}`),
                    qi.a.unlock(e, t, s).then((t=>{
                        this.muteManager.muteConversation(e, 0),
                        i(!!t)
                    }
                    )).catch(n)
                }
                ))
            }
            onFetchMute(e) {
                Ke.default.logCoreInfo(`[${this.name}] - onFetchMute`);
                let t = this.muteManager.setMutedConversations(e);
                return this.processFetchData(e),
                t
            }
            onCtrMute(e, t) {
                t ? (this.doLock(t, !1),
                this.muteManager.muteConversation(e, t),
                this.muteChanged(e, !!t)) : this.onUnMute(e, !1).then((s=>{
                    this.muteChanged(e, !!t)
                }
                ))
            }
            isMuted(e) {
                return this.muteManager.isMuted(e)
            }
            processFetchData(e) {
                try {
                    e.chatEntries && (e.chatEntries.forEach((e=>{
                        this.doLock(e, !0)
                    }
                    )),
                    e.groupChatEntries.forEach((e=>{
                        this.doLock(e, !0)
                    }
                    )))
                } catch (t) {
                    Ke.default.logCoreError(t)
                }
            }
            doLock(e, t) {
                if (void 0 === t && (t = !0),
                this.mapTimeout.hasOwnProperty(e.id) && (t = !0),
                this._clearTimeout(e.id),
                -1 != e.duration) {
                    Ke.default.log("setTimer", e);
                    let s = e.duration - (e.currentTime - e.systemTime);
                    s >= 0 ? (Ke.default.log("setTimer: lock1", e.id),
                    Ke.default.logCoreInfo("[Unmute timeout] setTimer: lock1", e.id, s),
                    this.mapTimeout[e.id] = setTimeout((()=>{
                        this.onUnMute(e.id, t, !0),
                        Ke.default.logCoreInfo("[Unmute timeout] setTimer: unlock1", e.id)
                    }
                    ), 1e3 * s)) : (Ke.default.log("setTimer: unlock", s),
                    Ke.default.logCoreInfo("[Unmute timeout] setTimer: unlock", e.id),
                    this.onUnMute(e.id, t))
                }
            }
            _clearTimeout(e) {
                this.mapTimeout.hasOwnProperty(e) && (clearTimeout(this.mapTimeout[e]),
                delete this.mapTimeout[e])
            }
            _getNowTo8Am() {
                let e = (new Date).getTime()
                  , t = new Date(e);
                return t.setHours(8, 0, 0, 0),
                t.getTime() <= e ? t.getTime() + 864e5 - e : t.getTime() - e
            }
            muteChanged(e, t) {
                Object(Pe.g)(this.name, e),
                this.broadcastEvent(yt.b.MuteChanged, e, t)
            }
            broadcastEvent(e, t, s) {
                void 0 === t && (t = ""),
                this.dispatchEvent(new yt.a(e,t,s))
            }
        }
        ) || Ki) || Ki);
        var Qi, Zi = s("kCOK"), Ji = s("qvRd"), Xi = s("fBUP"), Yi = s("gwig");
        const en = "zpinc"
          , tn = "ver_pin"
          , sn = 0
          , nn = 1
          , rn = 2;
        Object(mt.b)(Ji.b)(Qi = Reflect.metadata("design:type", Function)(Qi = Reflect.metadata("design:paramtypes", [])(Qi = class extends k.b {
            get Logger() {
                return this._Logger || (this._Logger = l.ModuleContainer.resolve(P.ZLoggerFactory).createZLogger("conversation", [this.name])),
                this._Logger
            }
            constructor() {
                super(),
                this.name = void 0,
                this.key = void 0,
                this.didInit = void 0,
                this.doneLoadDB = void 0,
                this.data = void 0,
                this._Logger = void 0,
                this.reFetchCount = void 0,
                this.retryTimeout = void 0,
                this.refetchInterval = void 0,
                this.lastFetchTime = void 0,
                this.isDataLastest = void 0,
                this.requestingIds = void 0,
                this.name = Ji.a,
                this.key = "convId",
                this.didInit = !1,
                this.doneLoadDB = !1,
                this.data = new Map,
                this.reFetchCount = 0,
                this.isDataLastest = !1,
                this.lastFetchTime = 0,
                this.requestingIds = new Map
            }
            init() {
                this.didInit || (this.didInit = !0,
                this._loadData(),
                this._fetchPinnedConversations(),
                this._addListener())
            }
            _loadData() {
                const e = u.a.getInstance().getItemForCurrentUser(en);
                if (e && e.length)
                    try {
                        const s = JSON.parse(e);
                        Object.keys(s).map((e=>{
                            this._verifyPin(s[e].id) && this.data.set(s[e].id, {
                                id: s[e].id,
                                priority: +s[e].priority || si.a.getTimeNow()
                            })
                        }
                        ));
                        try {
                            this.Logger.zsymb(0, 9682, 3e4, "pin conversations loaded from local", JSON.stringify(Object.fromEntries(this.data)))
                        } catch (t) {
                            this.Logger.zsymb(18, 9682, 30001, "stringify fail")
                        }
                        this.doneLoadDB = !0;
                        const i = this.getAllPinnedConversations();
                        i.length && this._broadcastEvent(yt.b.ChangePinConv, i)
                    } catch (s) {
                        0
                    }
            }
            _addListener() {
                rt.default.subscribeEventFriend(v.EventFriend.REMOVE_FRIEND, (e=>{
                    this.Logger.zsymb(0, 9682, 30002, "remove friend - unpin", e.userId),
                    this.updateListPin([e.userId], rn)
                }
                )),
                this._setFetchInterval()
            }
            _setFetchInterval() {
                this.refetchInterval && clearTimeout(this.refetchInterval),
                this.refetchInterval = setInterval((()=>{
                    this._fetchPinnedConversations()
                }
                ), 864e5)
            }
            _broadcastEvent(e, t) {
                this.dispatchEvent(new yt.e(e,t))
            }
            _newPinItem(e, t) {
                return {
                    id: e,
                    priority: t
                }
            }
            _syncServer(e, t) {
                return this._updatePinnedConversationsV2(e, t)
            }
            getLastFetchTime() {
                return this.lastFetchTime
            }
            isPinned(e) {
                return this.data.has(e)
            }
            getPinTime(e) {
                const t = this.data.get(e);
                return t ? t.priority : 0
            }
            async _checkAndSyncDataBeforeAction() {
                if (!this.isDataLastest)
                    try {
                        return await this._fetchPinnedConversations(),
                        !0
                    } catch (e) {
                        return !1
                    }
                return !0
            }
            pin(e) {
                return this.Logger.zsymb(0, 9682, 30003, "client pin", e),
                new Promise((async(t,s)=>{
                    const i = await this._checkAndSyncDataBeforeAction();
                    if (!e || !e.length)
                        return s(null);
                    if (i) {
                        if (this.data.size + e.length > qe.default.limit_pin_messages)
                            return s(null);
                        let i = [];
                        for (let t = 0; t < e.length; ++t)
                            this.isPinned(e[t]) || i.push(e[t]);
                        if (i.length > 0)
                            try {
                                const s = await this._syncServer(i, nn);
                                return this.updateListPin(e, nn),
                                t(s)
                            } catch (n) {
                                return s(n)
                            }
                    }
                    return s(null)
                }
                ))
            }
            pinLocal(e) {
                this.updateListPin(e, nn)
            }
            unpin(e, t) {
                return void 0 === t && (t = !1),
                this.Logger.zsymb(0, 9682, 30004, "client unpin", e, "force sync", t),
                new Promise((async(s,i)=>{
                    if (!e || !e.length)
                        return i(null);
                    if (await this._checkAndSyncDataBeforeAction()) {
                        let r = [];
                        for (let s = 0; s < e.length; ++s)
                            (this.isPinned(e[s]) || t) && r.push(e[s]);
                        if (r.length > 0)
                            try {
                                await this._syncServer(r, rn),
                                this.updateListPin(e, rn),
                                s(1)
                            } catch (n) {
                                i(n)
                            }
                    }
                    return i(null)
                }
                ))
            }
            unpinLocal(e) {
                this.Logger.zsymb(0, 9682, 30005, "unpin local", e),
                this.updateListPin(e, rn)
            }
            getAllPinnedConversations() {
                return Array.from(this.data.values())
            }
            getAllPinnedConversationsSync() {
                return Array.from(this.data.values())
            }
            getTotalPinnedConversation() {
                return this.data.size + Array.from(this.requestingIds.values()).filter((e=>e === nn)).length
            }
            _verifyPin(e) {
                return this.Logger.zsymb(0, 9682, 30006, "verify conversation", e, rt.default.isFriend(e), !!Nt.default.getGroupByIdSync(e), e === qe.default.sendToMeId),
                rt.default.isFriend(e) || !!Nt.default.getGroupByIdSync(e) || e === qe.default.sendToMeId
            }
            updateListPin(e, t) {
                if (this.Logger.zsymb(0, 9682, 30007, "updateListPin", e, t),
                !e || !e.length)
                    return;
                const s = [];
                switch (t) {
                case nn:
                    let t = si.a.getTimeNow();
                    for (let i = 0; i < e.length; i++)
                        if (this._verifyPin(e[i]) && !this.data.has(e[i])) {
                            ++t,
                            this.requestingIds.get(e[i]) && this.requestingIds.set(e[i], sn);
                            const n = this._newPinItem(e[i], t);
                            this.data.set(e[i], n),
                            s.push(n),
                            Object(Pe.g)(this.name, e[i])
                        }
                    break;
                case rn:
                    for (let i = 0; i < e.length; i++)
                        if (this.data.has(e[i])) {
                            this.requestingIds.get(e[i]) && this.requestingIds.set(e[i], sn),
                            this.data.delete(e[i]);
                            const t = this._newPinItem(e[i], 0);
                            s.push(t),
                            Object(Pe.g)(this.name, e[i])
                        }
                    break;
                default:
                    return
                }
                s.length && this._broadcastEvent(yt.b.ChangePinConv, s),
                this._updateInDB()
            }
            _retryFetch(e) {
                if (this.reFetchCount > 5)
                    return;
                let t = 0;
                switch (e) {
                case "ERR_NO_NETWORK":
                case -69:
                    break;
                case 212:
                    this.Logger.zsymb(20, 9682, 30008, "hasn't pinned conversation from server");
                    u.a.getInstance().setItemForCurrentUser(tn, "0"),
                    this._sendToServer();
                    break;
                case "ERR_CONNECTION_TIMED_OUT":
                case 112:
                    t = 5e3 * this.reFetchCount;
                    break;
                default:
                    t = 36e5
                }
                this.Logger.zsymb(21, 9682, 30009, "Handle request error fail with error: {}, retry after time= {}", e, t),
                this.retryTimeout || t > 0 && (this.retryTimeout = setTimeout((()=>{
                    this._fetchPinnedConversations(),
                    this.retryTimeout = void 0
                }
                ), t))
            }
            _parseData(e) {
                let t = [];
                for (let s = 0; s < e.length; ++s)
                    "m1" === e[s] || (e[s].startsWith("g") ? t.push(e[s]) : t.push(e[s].slice(1)));
                return t
            }
            _fetchPinnedConversations() {
                return this.reFetchCount++,
                this.Logger.zsymb(0, 9682, 30010, "_fetchPinnedConversations", this.reFetchCount),
                new Promise(((e,t)=>{
                    Xi.default.getPinnedConversations().then(Zi.a).then((t=>{
                        if (t && t.conversations) {
                            const e = u.a.getInstance();
                            void 0 === t.version && null === t.version || e.setItemForCurrentUser(tn, t.version),
                            this._onFetchPin(this._parseData(t.conversations))
                        }
                        e(t)
                    }
                    )).catch((e=>{
                        this.isDataLastest = !1,
                        e && (e.error_code ? this._retryFetch(e.error_code) : e.code ? this._retryFetch(e.code) : this._retryFetch("UNKNOWN_ERROR")),
                        t(e)
                    }
                    ))
                }
                ))
            }
            _updatePinnedConversationsV2(e, t) {
                return new Promise(((s,i)=>{
                    if (!qe.default.enable_sync_pinned)
                        return;
                    if (!Yi.b.getStateNetwork())
                        return void i(t === nn ? Dt.default.str("STR_ERR_NETWORK_PIN_CONVERSATION") : Dt.default.str("STR_ERR_NETWORK_UNPIN_CONVERSATION"));
                    let n = [];
                    for (let r = 0; r < e.length; ++r)
                        e[r].startsWith("g") || e[r].startsWith("u") || (e[r] = "u" + e[r]),
                        n.includes(e[r]) || this.requestingIds.has(e[r]) && this.requestingIds.get(e[r]) !== sn || (n.push(e[r]),
                        this.requestingIds.set(e[r], t));
                    n.length && Xi.default.updatePinnedConversationsV2(n, t).then(Zi.a).then((()=>{
                        n.forEach((e=>{
                            this.requestingIds.set(e, sn)
                        }
                        )),
                        s(!0)
                    }
                    )).catch((e=>{
                        n.forEach((e=>{
                            this.requestingIds.set(e, sn)
                        }
                        )),
                        this.Logger.zsymb(20, 9682, 30011, "Update sync pin conv v2 FAIL: " + e);
                        let s = "";
                        if (e)
                            if (e.error_code)
                                if (160 === e.error_code)
                                    this._fetchPinnedConversations();
                                else
                                    s = Dt.default.str("STR_ERR_PIN_CONVERSATION") + " (" + e.error_code + ")";
                            else
                                "ERR_NO_NETWORK" === e.code && Yi.b.getStateNetwork() == Yi.a.DISCONNECT && (s = t === nn ? Dt.default.str("STR_ERR_NETWORK_PIN_CONVERSATION") : Dt.default.str("STR_ERR_NETWORK_UNPIN_CONVERSATION"));
                        i(s)
                    }
                    ))
                }
                ))
            }
            _isRemoteDataChanged(e) {
                const t = Array.from(this.data.values()).sort(((e,t)=>t.priority - e.priority)).map((e=>e.id));
                if (e.length !== t.length)
                    return !0;
                let s = !1;
                return e.forEach(((e,i)=>{
                    e !== t[i] && (s = !0)
                }
                )),
                s
            }
            _onFetchPin(e) {
                this.Logger.zsymb(0, 9682, 30012, "onFetchPin", e),
                this.isDataLastest = !0,
                this.lastFetchTime = si.a.getTimeNow(),
                this.reFetchCount = 0;
                let t = si.a.getTimeNow();
                this._setFetchInterval();
                const s = []
                  , i = [];
                for (let n = 0; n < e.length; n++)
                    this._verifyPin(e[n]) ? i.push(e[n]) : this.unpin([e[n]], !0);
                if (this._isRemoteDataChanged(i)) {
                    for (const e of Array.from(this.data.values()))
                        i.find((t=>t === e.id)) || (this.data.delete(e.id),
                        Object(Pe.g)(this.name, e.id),
                        s.push({
                            id: e.id,
                            priority: 0
                        }));
                    for (let e = 0; e < i.length; e++) {
                        const n = this._newPinItem(i[e], t)
                          , r = this.isPinned(i[e]);
                        this.data.set(i[e], n),
                        r || Object(Pe.g)(this.name, i[e]),
                        t--,
                        s.push(n)
                    }
                    this.Logger.zsymb(0, 9682, 30013, "[After Fetch]", Array.from(this.data.values())),
                    s.length && this._broadcastEvent(yt.b.ChangePinConv, s),
                    this._updateInDB()
                }
            }
            _sendToServer() {
                this._syncServer(Array.from(this.data.keys()), nn)
            }
            getItem(e, t) {
                return this.data.get(e.key)
            }
            getList(e, t) {
                return Array.from(this.data.keys())
            }
            onGetItemFailure(e, t) {
                this.Logger.zsymb(18, 9682, 30014, "onGetItemFailure - key:", e, " - error", t)
            }
            onGetListFailure(e, t) {
                this.Logger.zsymb(18, 9682, 30015, "onGetItemFailure - key:", e, " - error", t)
            }
            _updateInDB() {
                if (!this.data)
                    return;
                const e = u.a.getInstance();
                this.data.size ? e.setItemForCurrentUser(en, JSON.stringify(Array.from(this.data.values()))) : e.removeItemForCurrentUser(en)
            }
        }
        ) || Qi) || Qi);
        var an, on = s("MnJw");
        Object(mt.b)(on.a)(an = Reflect.metadata("design:type", Function)(an = Reflect.metadata("design:paramtypes", [])(an = class extends k.b {
            constructor() {
                super()
            }
            onUpdateListArchivedChat(e) {
                this.dispatchEvent(new yt.a(yt.b.UpdateListArchivedChat,e))
            }
            onOffArchivedChat(e) {
                this.dispatchEvent(new yt.a(yt.b.OnOffArchivedChat,"",{
                    status: e
                }))
            }
        }
        ) || an) || an);
        l.ModuleContainer.registerSingleton(Gs.b, $s),
        l.ModuleContainer.registerSingleton(ei.a, Xs),
        l.ModuleContainer.registerSingleton(Gs.a, zs);
        var ln, cn = s("Xvw2"), dn = s("5uwv"), hn = s("lCn6"), un = s("kg13"), gn = s("dJFb");
        const pn = 2
          , mn = {
            userId: "",
            friendRequestType: pn,
            friendRequestSource: 85
        };
        var fn;
        !function(e) {
            e.SUGGEST = "suggest",
            e.REQUEST = "request",
            e.UNREADREQ = "unread-req"
        }(fn || (fn = {}));
        Object(mt.b)(cn.b)(ln = Reflect.metadata("design:type", Function)(ln = Reflect.metadata("design:paramtypes", [])(ln = class extends k.b {
            constructor() {
                super(),
                this.sugguestList = void 0,
                this.requestList = void 0,
                this.unreadFRList = void 0,
                this._ebFriendRequestSend = e=>{
                    const t = this.unreadFRList.filter((t=>t !== e));
                    t.length !== this.unreadFRList.length && (ce.default.removeFriend(e),
                    Ke.default.logCoreError("[reddot-check] SEND_FRIEND_REQUEST: " + JSON.stringify(e)),
                    this.unreadFRList = t,
                    Object(Pe.h)(this.name, fn.UNREADREQ))
                }
                ,
                this._ebFriendFetch = e=>{
                    for (let t in e)
                        if (e.hasOwnProperty(t)) {
                            const e = this.requestList.slice();
                            for (let s = 0; s < e.length; s++)
                                if (e[s] === t) {
                                    e.splice(s, 1);
                                    break
                                }
                            e.length !== this.requestList.length && (this.requestList = e,
                            Object(Pe.h)(this.name, fn.REQUEST))
                        }
                }
                ,
                this._ebFrReqFetch = e=>{
                    Ke.default.log("friendNotificationAction: friend requests fetched", e);
                    const t = this.requestList.reduce(((e,t)=>(e[t] || (e[t] = !0),
                    e)), {})
                      , s = this.requestList.slice();
                    for (let i of e)
                        t[i.userId] || s.unshift(i);
                    this.requestList = s,
                    Object(Pe.h)(this.name, fn.REQUEST)
                }
                ,
                this._ebFrReqRemove = e=>{
                    Ke.default.log("friendNotificationAction: friend requests removed", e);
                    const t = this.requestList.filter((t=>-1 === e.indexOf(t)));
                    t.length !== this.requestList.length && (this.requestList = t,
                    Object(Pe.h)(this.name, fn.REQUEST)),
                    this.onFriendListNotificationsChange({
                        action: "remove",
                        ids: e
                    })
                }
                ,
                this.name = cn.a,
                this.data = new Map,
                this.key = "userId",
                this.sugguestList = [],
                this.requestList = [],
                this.unreadFRList = [],
                this.listenEvents()
            }
            listenEvents() {
                Ze.default.subscribe(((e,t)=>{
                    switch (e) {
                    case Je.ChatBoxActions.SEND_FRIEND_REQUEST:
                        this._ebFriendRequestSend(t);
                        break;
                    case Je.FetchActions.FRIENDS_FETCHED:
                        this._ebFriendFetch(t);
                        break;
                    case Je.FetchActions.FRIEND_REQUESTS_FETCHED:
                        this._ebFrReqFetch(t);
                        break;
                    case Je.FetchActions.FRIEND_REQUESTS_REMOVED:
                        this._ebFrReqRemove(t)
                    }
                }
                ))
            }
            onAddFriend(e) {
                un.a.removeSuggest(e.userId),
                this.onFriendListNotificationsChange({
                    action: "remove",
                    ids: [e.userId]
                })
            }
            onReceiveFriendRequests(e) {
                if (!e || e.length < 1)
                    return;
                for (let s = 0; s < e.length; s++) {
                    let t = e[s];
                    t && un.a.removeSuggest(t.userId)
                }
                gn.d.setUnreadRequest(1);
                for (let s = 0; s < e.length; s++)
                    e[s] && Ft.p.addNewFriendItem(e[s].userId);
                ot.a.UnreadDataManager.updateUnreadCount(v.FAKE_CONVERSATION_ID.FRIEND_CENTER, gn.d.getUnreadRequest());
                let t = e.map((e=>({
                    dataInfo: Object(i.a)(Object(i.a)({}, e), {}, {
                        recommInfo: {
                            message: e.friendRequestMsg,
                            source: e.friendRequestSource
                        },
                        recommType: pn
                    }),
                    recommItemType: e.friendRequestType
                })));
                un.a.addRequest(t),
                this.broadcastEvent(dn.b.ReceiveRequest, "", {
                    uids: e.map((e=>e.userId))
                })
            }
            onRemoveSuggest(e, t, s) {
                return un.a.removeSuggestFriend(e, t, s).then((t=>{
                    this.broadcastEvent(dn.b.RemoveSuggest, e)
                }
                ))
            }
            onPromoteFriends() {
                ot.a.UnreadDataManager.updateUnreadCount(v.FAKE_CONVERSATION_ID.FRIEND_CENTER, 1)
            }
            onFriendRequestFetched() {}
            onFriendListNotificationsChange(e) {
                if (!e.ids || !e.ids.length)
                    return void ("clear" === e.action && (this.unreadFRList = [],
                    Object(Pe.h)(this.name, fn.UNREADREQ)));
                let t = this.unreadFRList;
                if ("remove" === e.action)
                    t = t.filter((t=>-1 === e.ids.indexOf(t)));
                else if ("add" === e.action) {
                    const s = [];
                    for (let i of e.ids)
                        -1 === t.indexOf(i) && s.push(i);
                    s.length && (t = t.concat(s))
                }
                t.length !== this.unreadFRList.length && (this.unreadFRList = t,
                Object(Pe.h)(this.name, fn.UNREADREQ))
            }
            acceptFriendRequest(e) {
                return new Promise(((t,s)=>{
                    const n = this.data.get(e);
                    if (!n)
                        return bs.a.acceptAddFriend(e).then((e=>t(!0))).catch(s);
                    let r;
                    if (n.friendRequestType === v.FRIEND_REQUEST_TYPE_SUGGEST) {
                        if (n.requested)
                            return r = 104097,
                            vt.e.logAction(r),
                            t(!1);
                        const a = Dt.default.trans("STR_MSG_DEFAULT_REQ_ADD_FR", rt.default.getMiniProfileMe().zaloName);
                        bs.a.requestAddFriend(e, a, n.friendRequestSource).then((()=>{
                            Mt.a.createSuccess(Dt.default.str("STR_REQ_FR_SUCCESS")),
                            ce.default.removeFriend(e),
                            un.a.removeSuggest(e);
                            const s = Object(i.a)(Object(i.a)({}, n), {}, {
                                requested: !0
                            });
                            this.broadcastEvent(dn.b.SentFriendReq, e),
                            this.data.set(e, s),
                            this.onFriendListNotificationsChange({
                                action: "remove",
                                ids: [e]
                            }),
                            t(!0)
                        }
                        )).catch((e=>{
                            this.handleFailureFriendRq(e),
                            s(e)
                        }
                        )),
                        r = 104096
                    } else
                        bs.a.acceptAddFriend(e).then((()=>{
                            this.data.delete(e),
                            Object(Pe.e)(this.name, e),
                            this.onFriendListNotificationsChange({
                                action: "remove",
                                ids: [e]
                            }),
                            this.broadcastEvent(dn.b.AcceptRequest, e),
                            hn.a.getUser(e).then((t=>{
                                Ze.default.send(Je.FetchActions.FRIENDS_FETCHED, {
                                    [e]: Object(i.a)(Object(i.a)({}, Ke.default.reformatConversationFromFriend(t)), {}, {
                                        isFr: 1
                                    })
                                })
                            }
                            )),
                            ce.default.getAcceptNewFriend(n),
                            t(!0)
                        }
                        )).catch((e=>{
                            this.handleFailureFriendRq(e),
                            s(e)
                        }
                        )),
                        r = 104095;
                    r && vt.e.logAction(r)
                }
                ))
            }
            async rejectFriendRequest(e) {
                const t = this.data.get(e)
                  , s = ()=>{
                    Mt.a.createSuccess(Dt.default.str("STR_TOAST_REJECT_REQUEST")),
                    ce.default.removeFriend(e),
                    un.a.removeSuggest(e),
                    this.broadcastEvent(dn.b.RejectRequest, e)
                }
                  , i = e=>{
                    Ke.default.logCoreError(e),
                    e && e.error_message && Mt.a.createError(e.error_message)
                }
                ;
                t && t.friendRequestSource ? He.default.removeRecommendedFriend(e, t.friendRequestSource).then(s).catch(i) : bs.a.rejectRequestAddFriend(e).then(s).catch(i),
                this.data.delete(e),
                this.onFriendListNotificationsChange({
                    action: "remove",
                    ids: [e]
                }),
                vt.e.logAction(104094)
            }
            undoRequestFriend(e) {
                e && bs.a.undoRequestAddFriend(e).catch((e=>{
                    e.error_message && Mt.a.createError(e.error_message)
                }
                ))
            }
            clearUnreadFriendRequest() {
                ot.a.UnreadDataManager.updateUnreadCount(v.FAKE_CONVERSATION_ID.FRIEND_CENTER, 0),
                this.unreadFRList = [],
                Object(Pe.h)(this.name, fn.UNREADREQ)
            }
            getAllFriendRequests() {
                return new Promise(((e,t)=>{
                    const s = un.a.getRecommendedFriendsV2(!1, !1);
                    if (!s)
                        return e({});
                    e(this.filterFriendRequest(s))
                }
                ))
            }
            getAllFriendRequestsSync() {
                const e = un.a.getRecommendedFriendsSync();
                return e ? this.filterFriendRequest(e) : {}
            }
            init() {
                ce.default.getFriends(null, !0).then((e=>{
                    if (e) {
                        const t = ce.default.getLastContactListOpenTime()
                          , s = e.filter((e=>e && e.friendRequestFetchTime > t)).map((e=>e.userId));
                        s.length && this.onFriendListNotificationsChange({
                            action: "add",
                            ids: s
                        })
                    }
                }
                ))
            }
            getItem(e) {
                return mn
            }
            getList(e) {
                return e.key === fn.UNREADREQ ? this.unreadFRList : []
            }
            onGetItemFailure(e) {}
            onGetListFailure(e) {}
            handleFailureFriendRq(e) {
                if (Ke.default.logCoreError(e),
                e && e.error_message) {
                    let t = e.error_message;
                    [224, 251].includes(e.error_code) && (t = Dt.default.trans(`STR_FRIEND_REQUEST_FAIL_${e.error_code}`, ["" + qe.default.limitFriends])),
                    Mt.a.createMessage(t, 3e3)
                }
            }
            filterFriendRequest(e) {
                const t = {};
                for (let s in e)
                    if (e.hasOwnProperty(s)) {
                        let i = e[s];
                        i && i.dataInfo.recommType === pn && (t[s] = i,
                        t[s].friendRequestType = i.dataInfo.recommType)
                    }
                return t
            }
            broadcastEvent(e, t, s) {
                this.dispatchEvent(new dn.a(e,t,s)),
                this.dispatchEvent(new dn.a(dn.b.FriendCenterChange,t,Object(i.a)(Object(i.a)({}, s), {}, {
                    act: e
                })))
            }
        }
        ) || ln) || ln);
        var vn = s("5cla")
          , bn = s("WV6O");
        class In {
            static resetNewFriendList() {
                delete this.newListFriend,
                this.newListFriend = void 0
            }
            static addNewFriendUid(e) {
                void 0 === this.newListFriend && this.getNewFriendList(),
                this.newListFriend.push(e)
            }
            static getNewFriendList() {
                ce.default.removeNewFriend("", !0);
                let e = [];
                try {
                    const t = u.a.getInstance().getItemForCurrentUser("f_nf");
                    t && (e = JSON.parse(t))
                } catch (t) {}
                this.newListFriend = e.map((e=>e.userId))
            }
            static getFriendList(e) {
                const {userId: t} = e
                  , s = [];
                return new Promise(((e,i)=>{
                    rt.default.getFriends().then((i=>{
                        if (i) {
                            const n = Boolean(Ot.g.getConfigShowAllUser(t));
                            for (let e = 0; e < i.length; e++)
                                (1 === i[e].isFr || i[e].isFr || i[e].userId === qe.default.supportPage) && i[e].userId != t && i[e].isValid && i[e].userId != qe.default.sendToMeId && (n || i[e].isActive || i[e].isActivePC || i[e].isActiveWeb) && s.push(i[e].userId);
                            e(s)
                        } else
                            e([])
                    }
                    )).catch((e=>i(e)))
                }
                ))
            }
            static getFriendInfo(e) {
                var t;
                const {userId: s} = e
                  , i = rt.default.getProfileFriendSync(s);
                return i ? (void 0 === this.newListFriend && this.getNewFriendList(),
                {
                    userId: i.userId,
                    avatar: i.avatar,
                    displayName: i.displayName,
                    isFr: i.isFr,
                    zaloName: i.zaloName,
                    bizPkg: i.bizPkg,
                    bizInfo: i.bizInfo,
                    isNewFriend: (null === (t = this.newListFriend) || void 0 === t ? void 0 : t.includes(s)) || !1,
                    isBlocked: i.isBlocked
                }) : null
            }
        }
        In.newListFriend = void 0;
        class yn {
            static getGroupList(e) {
                return new Promise(((e,t)=>{
                    Nt.default.getGroupsList().then((t=>{
                        const s = t.map((e=>e.userId));
                        e(s)
                    }
                    )).catch(t)
                }
                ))
            }
            static getGroupInfo(e) {
                const {userId: t} = e;
                return new Promise(((e,s)=>{
                    Nt.default.getGroupById(t).then((t=>{
                        e({
                            userId: t.userId,
                            avatar: t.avatar,
                            displayName: t.displayName,
                            topMember: t.topMember,
                            totalMember: t.totalMember,
                            creatorId: t.creatorId
                        })
                    }
                    )).catch(s)
                }
                ))
            }
            static getGroupInfoSync(e) {
                const {userId: t} = e
                  , s = Nt.default.getGroupByIdSync(t);
                return s ? {
                    userId: s.userId,
                    avatar: s.avatar,
                    displayName: s.displayName,
                    topMember: s.topMember,
                    totalMember: s.totalMember,
                    creatorId: s.creatorId
                } : null
            }
        }
        class Cn {
            static getRecommendFriendList() {
                return new Promise(((e,t)=>{
                    He.default.getRecommendedFriends().then((t=>e(t.recommItems))).catch(t)
                }
                ))
            }
            static getRelatedGroup(e) {
                return new Promise(((t,s)=>{
                    He.default.getRelatedGroup(e).then(t).catch(s)
                }
                ))
            }
            static getRequestedFriendList() {
                return new Promise(((e,t)=>{
                    He.default.getRequestedFriends().then(e).catch(t)
                }
                ))
            }
            static acceptAddFriend(e) {
                return bs.a.acceptAddFriend(e)
            }
            static rejectAddFriend(e) {
                return bs.a.rejectRequestAddFriend(e)
            }
            static makeUndoSentRequestFriend(e) {
                return bs.a.undoRequestAddFriend(e.userId)
            }
            static removeSuggestFriend(e) {
                return new Promise(((t,s)=>{
                    He.default.removeRecommendedFriendV2(e.uid, e.src, e.type).then(t).catch(s)
                }
                ))
            }
        }
        var Sn;
        const En = {
            currentView: bn.c.FRIEND_LIST,
            unread: {
                newFriendRequests: [],
                newGroupRequests: []
            }
        }
          , _n = "1"
          , Tn = "ctt_l_a"
          , Ln = "ctt_l_r";
        Object(mt.b)(vn.b)(Sn = Reflect.metadata("design:type", Function)(Sn = Reflect.metadata("design:paramtypes", [])(Sn = class {
            constructor() {
                this.type = void 0,
                this.name = void 0,
                this.key = void 0,
                this.currentTab = void 0,
                this.data = new Map,
                this._Logger = void 0,
                this.name = vn.a,
                this.key = vn.a,
                this.data.set(_n, En),
                this.currentTab = ""
            }
            get Logger() {
                return this._Logger || (this._Logger = l.ModuleContainer.resolve(P.ZLoggerFactory).createZLogger(kt.b.contactTabV2, [this.name])),
                this._Logger
            }
            _updateState(e, t, s) {
                void 0 === t && (t = _n),
                void 0 === s && (s = !0),
                this.data.set(t, e),
                s && Object(Pe.g)(this.name, t)
            }
            _getState(e) {
                void 0 === e && (e = _n);
                return this.data.get(e)
            }
            _getAccessTime() {
                try {
                    return JSON.parse(u.a.getInstance().getItemForCurrentUser(Tn))
                } catch (e) {
                    return this.Logger.zsymb(18, 9649, 3e4, "[_getAccessTime], error: " + JSON.stringify(e)),
                    null
                }
            }
            _setAccessTime(e) {
                u.a.getInstance().setItemForCurrentUser(Tn, JSON.stringify(e))
            }
            _setLastRequestFriendTime(e, t, s) {
                let i = [];
                try {
                    i = JSON.parse(u.a.getInstance().getItemForCurrentUser(Ln)) || []
                } catch (r) {
                    this.Logger.zsymb(18, 9649, 30001, "[_setLastRequestFriendTime], error: " + JSON.stringify(r))
                }
                let n = [];
                switch (e) {
                case "NEW":
                    i.find((e=>(null == e ? void 0 : e.userId) === s)) ? (n = i.filter((e=>e.userId !== s)),
                    n = [{
                        ts: t,
                        userId: s
                    }, ...i]) : n = [{
                        ts: t,
                        userId: s
                    }, ...i];
                    break;
                case "REMOVE":
                    n = i.filter((e=>e.userId !== s))
                }
                u.a.getInstance().setItemForCurrentUser(Ln, JSON.stringify(n))
            }
            _getLastRequestAddFriendTime() {
                let e;
                try {
                    e = JSON.parse(u.a.getInstance().getItemForCurrentUser(Ln))
                } catch (t) {
                    this.Logger.zsymb(18, 9649, 30002, "[_getLastRequestAddFriendTime], error: " + JSON.stringify(t))
                }
                return e ? e[0] : null
            }
            _onChangeView(e) {
                switch (l.ModuleContainer.resolve(ft.SidebarController).updateSelectedId(null),
                e) {
                case bn.c.FRIEND_LIST:
                    Object(_e.f)({
                        type: Je.SideBarActions.SELECT_FRIEND_LIST,
                        payload: {
                            userId: "999"
                        }
                    });
                    break;
                case bn.c.GROUP_LIST:
                    Object(_e.f)({
                        type: Je.SideBarActions.SELECT_GROUP_CENTER,
                        payload: {
                            userId: "999"
                        }
                    });
                    break;
                case bn.c.FRIEND_REQUEST:
                    Object(_e.f)({
                        type: Je.SideBarActions.SELECT_FRIEND_CENTER,
                        payload: {
                            userId: "999"
                        }
                    })
                }
            }
            _onUpdateUnreadRequest(e, t) {
                const s = this._getState();
                if (!s)
                    return;
                let n = s.unread;
                switch (t) {
                case "FRIEND":
                    n.newFriendRequests.push(e);
                    break;
                case "GROUP":
                    n.newGroupRequests.push(e)
                }
                this._updateState(Object(i.a)(Object(i.a)({}, s), {}, {
                    unread: n
                }), _n, !0)
            }
            _clearUnreadRequest() {
                const e = this._getState();
                if (!e)
                    return;
                let t = e.unread;
                t.newFriendRequests = [],
                t.newGroupRequests = [],
                this._updateState(Object(i.a)(Object(i.a)({}, e), {}, {
                    unread: t
                }), _n, !0)
            }
            init(e) {
                throw new Error("Method not implemented.")
            }
            getItem(e, t) {
                return this._getState(e.key)
            }
            getList(e, t) {
                throw new Error("Method not implemented.")
            }
            onGetItemFailure(e, t) {
                throw new Error("Method not implemented.")
            }
            onGetListFailure(e, t) {
                throw new Error("Method not implemented.")
            }
            getDefaultItem() {
                throw new Error("Method not implemented.")
            }
            getDefaultList() {
                throw new Error("Method not implemented.")
            }
            resetTabData() {
                this.currentTab = "",
                In.resetNewFriendList(),
                l.ModuleContainer.resolve(vn.b).resetData(),
                l.ModuleContainer.resolve(vn.f).resetData(),
                l.ModuleContainer.resolve(vn.e).resetData(),
                l.ModuleContainer.resolve(vn.j).resetData(),
                l.ModuleContainer.resolve(vn.i).resetData(),
                l.ModuleContainer.resolve(vn.m).resetData()
            }
            resetData() {
                const e = this._getState();
                e && this._updateState(Object(i.a)(Object(i.a)({}, e), {}, {
                    currentView: bn.c.FRIEND_LIST
                }))
            }
            changeView(e) {
                const t = this._getState();
                t && this._updateState(Object(i.a)(Object(i.a)({}, t), {}, {
                    currentView: e
                }), _n, !0),
                this.currentTab = e,
                this._onChangeView(e)
            }
            onClickContabTabEntry() {
                if (document.getElementById("ContactTabV2")) {
                    const e = this._getState()
                      , t = (null == e ? void 0 : e.currentView) || En.currentView;
                    this._onChangeView(t)
                }
            }
            onContactTab(e) {
                this._setAccessTime(e),
                this._clearUnreadRequest()
            }
            getDefaultView() {
                if (this.currentTab)
                    return this.currentTab;
                const e = this._getAccessTime()
                  , t = this._getLastRequestAddFriendTime();
                if (!t)
                    return this.currentTab = bn.c.FRIEND_LIST,
                    this.currentTab;
                const s = !qe.default.contactTabV2.enable_rule_last_view_friend_req || e && t.ts < e
                  , i = t.ts < Date.now() - 864e5;
                return this.currentTab = i && s ? bn.c.FRIEND_LIST : bn.c.FRIEND_REQUEST,
                this.currentTab
            }
            onUpdateRequestTracking(e, t, s, i) {
                if ("NEW" === t ? this._onUpdateUnreadRequest(i, e) : "REMOVE" === t && this._clearUnreadRequest(),
                "FRIEND" === e)
                    this._setLastRequestFriendTime(t, s || 0, i)
            }
            onInitUnreadRequest() {
                const e = this._getState();
                let t = (null == e ? void 0 : e.unread) || En.unread;
                const s = (null == e ? void 0 : e.currentView) || En.currentView
                  , i = this._getAccessTime()
                  , n = this._getLastRequestAddFriendTime();
                n && i && (i < n.ts && t.newFriendRequests.push(n.userId),
                this._updateState({
                    currentView: s,
                    unread: t
                }, _n, !0))
            }
        }
        ) || Sn) || Sn);
        var On = s("iq5K");
        const Fn = (e,t)=>{
            const s = Ke.default.simpleStripVietnamese(t).split(" ")
              , i = Ke.default.simpleStripVietnamese(e).split(" ");
            return (()=>{
                const e = [];
                for (const t of s) {
                    let s = !1;
                    for (let n = 0; n < i.length; ++n)
                        if (i[n].startsWith(t) && !e.includes(n)) {
                            e.push(n),
                            s = !0;
                            break
                        }
                    if (!s)
                        return !1
                }
                return !0
            }
            )()
        }
          , Rn = e=>new Promise(((t,s)=>{
            if (!e)
                return t(e);
            setTimeout((()=>{
                t(e)
            }
            ), e)
        }
        ));
        var wn;
        Object(mt.b)(vn.f)(wn = Object(l.injectable)()(wn = function(e, t) {
            return l.ModuleContainer.inject(vn.e)(e, void 0, 0)
        }(wn = function(e, t) {
            return l.ModuleContainer.inject(ft.LabelDataManager)(e, void 0, 1)
        }(wn = Reflect.metadata("design:type", Function)(wn = Reflect.metadata("design:paramtypes", [void 0 === vn.e ? Object : vn.e, void 0 === ft.LabelDataManager ? Object : ft.LabelDataManager])(wn = class {
            constructor(e, t) {
                this.friendInfoManager = e,
                this.labelDataManager = t,
                this.type = void 0,
                this.name = void 0,
                this.key = void 0,
                this.listState = void 0,
                this.listFriend = void 0,
                this.initListFriend = void 0,
                this.currentPage = void 0,
                this.didSort = void 0,
                this.eventBusInstance = void 0,
                this._Logger = void 0,
                this.name = vn.d,
                this.key = vn.d,
                this.listState = On.d,
                this.listFriend = [],
                this.initListFriend = [],
                this.currentPage = 1,
                this.didSort = !1,
                this.eventBusInstance = null
            }
            get Logger() {
                return this._Logger || (this._Logger = l.ModuleContainer.resolve(P.ZLoggerFactory).createZLogger(kt.b.contactTabV2, [this.name])),
                this._Logger
            }
            _signalRenderList() {
                Object(Pe.h)(this.name, "all")
            }
            _signalRenderItem() {
                Object(Pe.g)(this.name, "all")
            }
            _signalRenderBoth() {
                Object(Pe.g)(this.name, "all"),
                Object(Pe.h)(this.name, "all")
            }
            _onRemoveFriend(e) {
                this.listFriend.includes(e.userId) && (this.listFriend.splice(this.listFriend.indexOf(e.userId), 1),
                this.initListFriend.splice(this.initListFriend.indexOf(e.userId), 1),
                this.listState.totalRecord = this.listFriend.length,
                this._signalRenderBoth())
            }
            _onAddFriend(e) {
                this.listFriend.includes(e.userId) || (this.listFriend.unshift(e.userId),
                this.initListFriend.unshift(e.userId),
                In.addNewFriendUid(e.userId),
                this._signalRenderList())
            }
            _getItemInfo(e) {
                return this.friendInfoManager.getItem({
                    key: e,
                    version: 1,
                    extraData: null
                }, null) || this.friendInfoManager.loadInfoNotRender({
                    userId: e
                })
            }
            _onBlockFriend(e) {
                this.friendInfoManager.onLoadInfo({
                    userId: e.userId
                })
            }
            _onUnBlockFriend(e) {
                this.friendInfoManager.onLoadInfo({
                    userId: e.userId
                })
            }
            _onEditAlias(e) {
                this.friendInfoManager.onLoadInfo({
                    userId: e.userId
                }),
                this.listFriend = this._handleFilter(this.listState.searching.searchText, this.listState.searching.sorter, this.listState.searching.filter, !this.isDidSort(), !1),
                this.listState.totalRecord = this.listFriend.length,
                this._signalRenderBoth()
            }
            _onUpdateTagConv(e, t) {
                void 0 === t && (t = "add");
                let s = !1;
                e.convIds.forEach((i=>{
                    if (this.friendInfoManager.onLoadInfo({
                        userId: i
                    }),
                    this.listState.searching.filter.label.id && this.listState.searching.filter.label.id === +e.labelId) {
                        const e = this.listFriend.findIndex((e=>e === i));
                        "remove" === t && -1 !== e ? (this.listFriend.splice(e, 1),
                        this.listState.totalRecord = Math.max(this.listState.totalRecord - 1, 0),
                        s = !0) : "add" === t && -1 === e && (this.listFriend.push(i),
                        this.listFriend = this._handleFilter(this.listState.searching.searchText, this.listState.searching.sorter, this.listState.searching.filter, !1, !1),
                        this.listState.totalRecord = this.listFriend.length,
                        s = !0)
                    }
                }
                )),
                s && this._signalRenderBoth()
            }
            addComponentListeners() {
                rt.default.subscribeEventFriend(v.EventFriend.REMOVE_FRIEND, this._onRemoveFriend.bind(this)),
                rt.default.subscribeEventFriend(v.EventFriend.ADD_FRIEND, this._onAddFriend.bind(this)),
                rt.default.subscribeEventFriend(v.EventFriend.BLOCK_FRIEND, this._onBlockFriend.bind(this)),
                rt.default.subscribeEventFriend(v.EventFriend.UNBLOCK_FRIEND, this._onUnBlockFriend.bind(this)),
                this.eventBusInstance = Ze.default.on(Je.FetchActions.UPDATE_NAME, this._onEditAlias.bind(this)),
                this.labelDataManager.addEventListener(ft.LabelEvents.LabelAddConvs, (e=>{
                    this._onUpdateTagConv(e.payload, "add")
                }
                )),
                this.labelDataManager.addEventListener(ft.LabelEvents.LabelRemoveConvs, (e=>{
                    this._onUpdateTagConv(e.payload, "remove")
                }
                ))
            }
            removeComponentListeners() {
                rt.default.unsubscribeEventFriend(v.EventFriend.REMOVE_FRIEND, this._onRemoveFriend.bind(this)),
                rt.default.unsubscribeEventFriend(v.EventFriend.ADD_FRIEND, this._onAddFriend.bind(this)),
                rt.default.unsubscribeEventFriend(v.EventFriend.BLOCK_FRIEND, this._onBlockFriend.bind(this)),
                rt.default.unsubscribeEventFriend(v.EventFriend.UNBLOCK_FRIEND, this._onUnBlockFriend.bind(this)),
                this.eventBusInstance && this.eventBusInstance.remove(),
                this.labelDataManager.removeEventListener(ft.LabelEvents.LabelAddConvs, (e=>{
                    this._onUpdateTagConv(e.payload, "add")
                }
                )),
                this.labelDataManager.removeEventListener(ft.LabelEvents.LabelRemoveConvs, (e=>{
                    this._onUpdateTagConv(e.payload, "remove")
                }
                ))
            }
            async onLoadList(e) {
                try {
                    const t = await In.getFriendList(e);
                    this.listFriend = t,
                    this.initListFriend = t,
                    this.listState.totalRecord = t.length,
                    this.listFriend = this._handleFilter(On.g.searching.searchText, On.g.searching.sorter, On.g.searching.filter, !0, !1),
                    this.initListFriend = this._handleFilter(On.g.searching.searchText, On.g.searching.sorter, On.g.searching.filter, !0, !0),
                    this.listState.totalRecord = this.listFriend.length,
                    this._signalRenderItem(),
                    this._signalRenderList()
                } catch (t) {
                    this.Logger.zsymb(18, 9651, 3e4, "[FriendListController] -> [onLoadList], error: " + JSON.stringify(t))
                }
            }
            onLoadMore() {
                this.currentPage++,
                this._signalRenderList()
            }
            onFilterByName(e) {
                if (!e)
                    return [...this.initListFriend];
                return [...this.initListFriend].filter((t=>{
                    const s = this._getItemInfo(t);
                    return Fn((null == s ? void 0 : s.displayName.toLowerCase()) || "", e.toLowerCase())
                }
                ))
            }
            onFilterByLabel(e, t) {
                if (!e)
                    return t;
                if (0 === e.length)
                    return [];
                return t.filter((t=>e.includes(t)))
            }
            onFilterAll(e) {
                return e
            }
            onFilterHidden(e, t, s) {
                return t || e ? s : s.filter((e=>!Ct.a.isThreadHidden(e)))
            }
            onSortAlpha(e, t) {
                if (e === On.o.DEFAULT)
                    return t;
                return t.sort(((t,s)=>{
                    const i = this._getItemInfo(t)
                      , n = this._getItemInfo(s);
                    return ((t,s)=>{
                        const i = /^[a-zA-Z]/
                          , n = i.test(Ke.default.simpleStripVietnamese(t))
                          , r = i.test(Ke.default.simpleStripVietnamese(s));
                        switch (e) {
                        case On.o.ALPHA_INCREASE:
                            return !n && r ? 1 : n && !r ? -1 : t.localeCompare(s);
                        case On.o.ALPHA_DECREASE:
                            return !n && r ? -1 : n && !r ? 1 : s.localeCompare(t);
                        default:
                            return 0
                        }
                    }
                    )((null == i ? void 0 : i.displayName.toLowerCase()) || (null == i ? void 0 : i.zaloName.toLowerCase()) || "", (null == n ? void 0 : n.displayName.toLowerCase()) || (null == n ? void 0 : n.zaloName.toLowerCase()) || "")
                }
                ))
            }
            onMovingNewFriend(e) {
                let t = []
                  , s = [];
                for (let i = e.length - 1; i >= 0; i--) {
                    const n = this._getItemInfo(e[i]);
                    null != n && n.isNewFriend ? t.unshift(null == n ? void 0 : n.userId) : s.unshift(null == n ? void 0 : n.userId)
                }
                return [...t, ...s]
            }
            _handleFilter(e, t, s, i, n) {
                var r;
                let a = [];
                return a = this.onFilterByName(e),
                a = this.onFilterByLabel(null == s || null === (r = s.label) || void 0 === r ? void 0 : r.convs, a),
                a = this.onFilterAll(a),
                a = this.onSortAlpha(t, a),
                a = this.onFilterHidden(n, e, a),
                i && (a = this.onMovingNewFriend(a)),
                a
            }
            _checkDidSort(e) {
                return e !== On.o.ALPHA_INCREASE ? this.didSort = !0 : this.didSort = !1,
                this.didSort
            }
            isDidSort() {
                return this.didSort
            }
            _updateInitListFriendWithoutDockNewFriends() {
                this.initListFriend = this._handleFilter(On.g.searching.searchText, On.g.searching.sorter, On.g.searching.filter, !1, !0),
                this.listState.totalRecord = this.listFriend.length
            }
            onFilter(e, t, s) {
                const i = this._checkDidSort(t);
                i && this._updateInitListFriendWithoutDockNewFriends(),
                this.listFriend = this._handleFilter(e, t, s, !i, !1),
                this.listState.totalRecord = this.listFriend.length,
                this._signalRenderItem(),
                this._signalRenderList()
            }
            init(e) {
                throw new Error("Method not implemented.")
            }
            getItem(e, t) {
                return this.listState
            }
            getList(e, t) {
                return this.listFriend
            }
            onGetItemFailure(e, t) {
                throw new Error("Method not implemented.")
            }
            onGetListFailure(e, t) {
                throw new Error("Method not implemented.")
            }
            getDefaultItem() {
                throw new Error("Method not implemented.")
            }
            getDefaultList() {
                throw new Error("Method not implemented.")
            }
            setSearchText(e) {
                this.listState.searching.searchText = e,
                this._signalRenderItem()
            }
            setSorter(e) {
                this.listState.searching.sorter = e,
                this._signalRenderItem()
            }
            setFilter(e) {
                this.listState.searching.filter = e,
                this._signalRenderItem()
            }
            getFilter() {
                return this.listState.searching.filter
            }
            getSorter() {
                return this.listState.searching.sorter
            }
            resetData() {
                this.listFriend = [],
                this.initListFriend = []
            }
            resetState() {
                this.listState = {
                    totalRecord: 0,
                    searching: {
                        searchText: "",
                        sorter: On.o.ALPHA_INCREASE,
                        filter: {
                            label: {
                                convs: null,
                                id: null
                            },
                            admin: "",
                            all: !0
                        }
                    }
                },
                this.currentPage = 1,
                this.didSort = !1
            }
        }
        ) || wn) || wn) || wn) || wn) || wn);
        var Mn;
        Object(mt.b)(vn.e)(Mn = Reflect.metadata("design:type", Function)(Mn = Reflect.metadata("design:paramtypes", [])(Mn = class {
            constructor() {
                this.type = void 0,
                this.name = void 0,
                this.key = void 0,
                this.data = new Map,
                this.name = vn.c,
                this.key = vn.c
            }
            init(e) {
                throw new Error("Method not implemented.")
            }
            onLoadInfo(e) {
                const t = In.getFriendInfo(e);
                t && (this.data.set(e.userId, t),
                Object(Pe.g)(this.name, e.userId))
            }
            loadInfoNotRender(e) {
                const t = In.getFriendInfo(e);
                return t ? (this.data.set(e.userId, t),
                t) : null
            }
            getItem(e, t) {
                return this.data.get(e.key)
            }
            getList(e, t) {
                throw new Error("Method not implemented.")
            }
            onGetItemFailure(e, t) {
                throw new Error("Method not implemented.")
            }
            onGetListFailure(e, t) {
                throw new Error("Method not implemented.")
            }
            getDefaultItem() {
                throw new Error("Method not implemented.")
            }
            getDefaultList() {
                throw new Error("Method not implemented.")
            }
            resetData() {
                this.data.clear()
            }
        }
        ) || Mn) || Mn);
        var Dn;
        Object(mt.b)(vn.j)(Dn = Object(l.injectable)()(Dn = function(e, t) {
            return l.ModuleContainer.inject(vn.i)(e, void 0, 0)
        }(Dn = function(e, t) {
            return l.ModuleContainer.inject(ut.h)(e, void 0, 1)
        }(Dn = function(e, t) {
            return l.ModuleContainer.inject(ft.LabelDataManager)(e, void 0, 2)
        }(Dn = Reflect.metadata("design:type", Function)(Dn = Reflect.metadata("design:paramtypes", [void 0 === vn.i ? Object : vn.i, void 0 === ut.h ? Object : ut.h, void 0 === ft.LabelDataManager ? Object : ft.LabelDataManager])(Dn = class {
            constructor(e, t, s) {
                this.groupInfoManager = e,
                this.previewDataManager = t,
                this.labelDataManager = s,
                this.type = void 0,
                this.name = void 0,
                this.key = void 0,
                this.listState = void 0,
                this.listGroup = void 0,
                this.initListGroup = void 0,
                this.currentPage = void 0,
                this._Logger = void 0,
                this.name = vn.h,
                this.key = vn.h,
                this.listState = On.e,
                this.listGroup = [],
                this.initListGroup = [],
                this.currentPage = 1
            }
            get Logger() {
                return this._Logger || (this._Logger = l.ModuleContainer.resolve(P.ZLoggerFactory).createZLogger(kt.b.contactTabV2, [this.name])),
                this._Logger
            }
            _signalRenderList() {
                Object(Pe.h)(this.name, "all")
            }
            _signalRenderItem() {
                Object(Pe.g)(this.name, "all")
            }
            _signalRenderBoth() {
                Object(Pe.g)(this.name, "all"),
                Object(Pe.h)(this.name, "all")
            }
            _getItemInfo(e) {
                return this.groupInfoManager.getItem({
                    key: e,
                    version: 1,
                    extraData: null
                }, null) || this.groupInfoManager.loadInfoNotRender({
                    userId: e
                })
            }
            init(e) {
                throw new Error("Method not implemented.")
            }
            getItem(e, t) {
                return this.listState
            }
            async onLoadList() {
                try {
                    const e = await yn.getGroupList({});
                    this.listGroup = e,
                    this.initListGroup = e,
                    this.listState.totalRecord = e.length,
                    this.groupInfoManager.loadMultiGroupInfo(this.initListGroup),
                    this.listGroup = this._handleFilter(On.h.searching.searchText, On.h.searching.sorter, On.h.searching.filter, !1),
                    this.initListGroup = this._handleFilter(On.h.searching.searchText, On.h.searching.sorter, On.h.searching.filter, !0),
                    this.listState.totalRecord = this.listGroup.length,
                    this._signalRenderItem(),
                    this._signalRenderList()
                } catch (e) {
                    this.Logger.zsymb(18, 9653, 3e4, "[GroupListController] -> [onLoadList], error: " + JSON.stringify(e))
                }
            }
            onLoadMore() {
                this.currentPage++,
                this._signalRenderList()
            }
            onFilterByName(e) {
                if (!e)
                    return [...this.initListGroup];
                return this.initListGroup.filter((t=>{
                    const s = this._getItemInfo(t);
                    return Fn((null == s ? void 0 : s.displayName.toLowerCase()) || "", e.toLowerCase())
                }
                ))
            }
            onFilterByLabel(e, t) {
                if (!e)
                    return t;
                if (0 === e.length)
                    return [];
                return t.filter((t=>e.includes(t)))
            }
            onFilterMyAdminGroup(e, t) {
                if (!e)
                    return t;
                return t.filter((t=>{
                    const s = this._getItemInfo(t);
                    return (null == s ? void 0 : s.creatorId) === e
                }
                ))
            }
            onFilterAll(e) {
                return e
            }
            onSortAlpha(e, t) {
                return e === On.o.DEFAULT || e === On.o.ACTION_INCREASE || e === On.o.ACTION_DECREASE ? t : t.sort(((t,s)=>{
                    const i = this._getItemInfo(t)
                      , n = this._getItemInfo(s)
                      , r = (null == i ? void 0 : i.displayName.toLowerCase()) || ""
                      , a = (null == n ? void 0 : n.displayName.toLowerCase()) || "";
                    switch (e) {
                    case On.o.ALPHA_INCREASE:
                        return r.localeCompare(a);
                    case On.o.ALPHA_DECREASE:
                        return a.localeCompare(r);
                    default:
                        return 0
                    }
                }
                ))
            }
            onFilterHidden(e, t, s) {
                return t || e ? s : s.filter((e=>!Ct.a.isThreadHidden(e)))
            }
            onSortActionTime(e, t) {
                return e === On.o.DEFAULT || e === On.o.ALPHA_INCREASE || e === On.o.ALPHA_DECREASE ? t : t.sort(((t,s)=>{
                    var i, n;
                    const r = (null === (i = this.previewDataManager.getPreviewByIDSync(t)) || void 0 === i ? void 0 : i.messageTime) || 0
                      , a = (null === (n = this.previewDataManager.getPreviewByIDSync(s)) || void 0 === n ? void 0 : n.messageTime) || 0;
                    switch (e) {
                    case On.o.ACTION_DECREASE:
                        if (a && r) {
                            if (a > r)
                                return 1;
                            if (a < r)
                                return -1
                        }
                        return a && !r ? 1 : !a && r ? -1 : 0;
                    case On.o.ACTION_INCREASE:
                        if (a && r) {
                            if (a < r)
                                return 1;
                            if (a > r)
                                return -1
                        }
                        return !a && r ? 1 : a && !r ? -1 : 0;
                    default:
                        return 0
                    }
                }
                ))
            }
            _handleFilter(e, t, s, i) {
                var n;
                let r = [];
                return r = this.onFilterByName(e),
                r = this.onFilterByLabel(null == s || null === (n = s.label) || void 0 === n ? void 0 : n.convs, r),
                r = this.onFilterMyAdminGroup((null == s ? void 0 : s.admin) || "", r),
                r = this.onFilterAll(r),
                r = this.onSortAlpha(t, r),
                r = this.onSortActionTime(t, r),
                r = this.onFilterHidden(i, e, r),
                r
            }
            onFilter(e, t, s) {
                this.listGroup = this._handleFilter(e, t, s, !1),
                this.listState.totalRecord = this.listGroup.length,
                this._signalRenderItem(),
                this._signalRenderList()
            }
            _onUpdateTagConv(e, t) {
                void 0 === t && (t = "add");
                let s = !1;
                e.convIds.forEach((i=>{
                    if (this.groupInfoManager.onLoadInfo({
                        userId: i
                    }),
                    this.listState.searching.filter.label.id && this.listState.searching.filter.label.id === +e.labelId) {
                        const e = this.listGroup.findIndex((e=>e === i));
                        "remove" === t && -1 !== e ? (this.listGroup.splice(e, 1),
                        this.listState.totalRecord = Math.max(this.listState.totalRecord - 1, 0),
                        s = !0) : "add" === t && -1 === e && (this.listGroup.push(i),
                        this.listGroup = this._handleFilter(this.listState.searching.searchText, this.listState.searching.sorter, this.listState.searching.filter, !1),
                        this.listState.totalRecord = this.listGroup.length,
                        s = !0)
                    }
                }
                )),
                s && this._signalRenderBoth()
            }
            _onLeaveGroup(e) {
                for (let t = 0; t < e.length; t++) {
                    if (!this.listGroup.includes(e[t]))
                        return;
                    this.listGroup.splice(this.listGroup.indexOf(e[t]), 1),
                    this.initListGroup.splice(this.listGroup.indexOf(e[t]), 1),
                    this.listState.totalRecord = this.listGroup.length
                }
                this._signalRenderBoth()
            }
            addComponentListeners() {
                Nt.default.subscribeEventGroup(v.EventGroup.LEAVE_GROUP, this._onLeaveGroup.bind(this)),
                this.labelDataManager.addEventListener(ft.LabelEvents.LabelAddConvs, (e=>{
                    this._onUpdateTagConv(e.payload, "add")
                }
                )),
                this.labelDataManager.addEventListener(ft.LabelEvents.LabelRemoveConvs, (e=>{
                    this._onUpdateTagConv(e.payload, "remove")
                }
                ))
            }
            removeComponentListeners() {
                Nt.default.unsubscribeEventGroup(v.EventGroup.LEAVE_GROUP, this._onLeaveGroup.bind(this)),
                this.labelDataManager.removeEventListener(ft.LabelEvents.LabelAddConvs, (e=>{
                    this._onUpdateTagConv(e.payload, "add")
                }
                )),
                this.labelDataManager.removeEventListener(ft.LabelEvents.LabelRemoveConvs, (e=>{
                    this._onUpdateTagConv(e.payload, "remove")
                }
                ))
            }
            getList(e, t) {
                return this.listGroup
            }
            onGetItemFailure(e, t) {
                throw new Error("Method not implemented.")
            }
            onGetListFailure(e, t) {
                throw new Error("Method not implemented.")
            }
            getDefaultItem() {
                throw new Error("Method not implemented.")
            }
            getDefaultList() {
                throw new Error("Method not implemented.")
            }
            setSearchText(e) {
                this.listState.searching.searchText = e,
                this._signalRenderItem()
            }
            setSorter(e) {
                this.listState.searching.sorter = e,
                this._signalRenderItem()
            }
            setFilter(e) {
                this.listState.searching.filter = e,
                this._signalRenderItem()
            }
            getFilter() {
                return this.listState.searching.filter
            }
            getSorter() {
                return this.listState.searching.sorter
            }
            resetData() {
                this.listGroup = [],
                this.initListGroup = []
            }
            resetState() {
                this.listState = {
                    totalRecord: 0,
                    searching: {
                        searchText: "",
                        sorter: On.o.ACTION_DECREASE,
                        filter: {
                            label: {
                                convs: null,
                                id: null
                            },
                            admin: "",
                            all: !0
                        }
                    }
                },
                this.currentPage = 1
            }
        }
        ) || Dn) || Dn) || Dn) || Dn) || Dn) || Dn);
        var An;
        let Pn;
        Object(mt.b)(vn.i)(An = Reflect.metadata("design:type", Function)(An = Reflect.metadata("design:paramtypes", [])(An = class {
            constructor() {
                this.type = void 0,
                this.name = void 0,
                this.key = void 0,
                this.data = new Map,
                this.name = vn.g,
                this.key = vn.g
            }
            init(e) {
                throw new Error("Method not implemented.")
            }
            async onLoadInfo(e) {
                const t = yn.getGroupInfoSync(e);
                t && (this.data.set(e.userId, t),
                Object(Pe.g)(this.name, e.userId))
            }
            loadInfoNotRender(e) {
                const t = yn.getGroupInfoSync(e);
                return t ? (this.data.set(e.userId, t),
                t) : null
            }
            loadMultiGroupInfo(e) {
                for (const t of e)
                    this.loadInfoNotRender({
                        userId: t
                    })
            }
            openGroupMemberPopup(e) {
                const t = this.data.get(e);
                _t.ModalManagerV2.openModal({
                    windowId: "1",
                    name: v.ModalIdentitiesDefine.GROUP_PROFILE,
                    params: {
                        group_member: t
                    }
                })
            }
            getItem(e, t) {
                return this.data.get(e.key)
            }
            getList(e, t) {
                throw new Error("Method not implemented.")
            }
            onGetItemFailure(e, t) {
                throw new Error("Method not implemented.")
            }
            onGetListFailure(e, t) {
                throw new Error("Method not implemented.")
            }
            getDefaultItem() {
                throw new Error("Method not implemented.")
            }
            getDefaultList() {
                throw new Error("Method not implemented.")
            }
            resetData() {
                this.data.clear()
            }
        }
        ) || An) || An);
        !function(e) {
            e[e.RECOMMEND = 1] = "RECOMMEND",
            e[e.RECEIVE = 2] = "RECEIVE"
        }(Pn || (Pn = {}));
        const jn = 500
          , Nn = 500;
        var Bn;
        Object(mt.b)(vn.m)(Bn = function(e, t) {
            return l.ModuleContainer.inject(vn.b)(e, void 0, 0)
        }(Bn = Reflect.metadata("design:type", Function)(Bn = Reflect.metadata("design:paramtypes", [void 0 === vn.b ? Object : vn.b])(Bn = class extends k.b {
            constructor(e) {
                super(),
                this.contactTabController = e,
                this.type = void 0,
                this.name = void 0,
                this.key = void 0,
                this.data = new Map,
                this._Logger = void 0,
                this.name = vn.k,
                this.key = vn.k,
                this.data.set("all", {
                    isLoadingRecommendFriendList: !1,
                    isLoadingRequestedFriendList: !1,
                    listFriendReceived: [],
                    listFriendSent: [],
                    listFriendSuggest: [],
                    mapRelatedGroup: {}
                }),
                this.addPublicListeners()
            }
            get Logger() {
                return this._Logger || (this._Logger = l.ModuleContainer.resolve(P.ZLoggerFactory).createZLogger(kt.b.contactTabV2, [this.name])),
                this._Logger
            }
            _signalRenderItem() {
                Object(Pe.g)(this.name, "all")
            }
            init(e) {
                throw new Error("Method not implemented.")
            }
            getItem(e, t) {
                return this.data.get(e.key)
            }
            _updateLoadingState(e, t) {
                const {listFriendReceived: s=[], listFriendSuggest: n=[], listFriendSent: r=[]} = this.data.get("all") || {};
                let {isLoadingRecommendFriendList: a, isLoadingRequestedFriendList: o} = this.data.get("all") || {};
                if ("RecommendFriendList" === e)
                    switch (t) {
                    case "ON":
                        a || 0 !== s.length || 0 !== n.length || (a = !0);
                        break;
                    case "OFF":
                        a && (a = !1)
                    }
                if ("RequestedFriendList" === e)
                    switch (t) {
                    case "ON":
                        o || 0 !== r.length || (o = !0);
                        break;
                    case "OFF":
                        o && (o = !1)
                    }
                this.data.set("all", Object(i.a)(Object(i.a)({}, this.data.get("all")), {}, {
                    isLoadingRecommendFriendList: a,
                    isLoadingRequestedFriendList: o
                })),
                this._signalRenderItem()
            }
            async onLoadRequestedFriendList() {
                const e = Date.now();
                try {
                    this._updateLoadingState("RequestedFriendList", "ON");
                    const t = await Cn.getRequestedFriendList();
                    Date.now() - e < jn && await Rn(Nn),
                    this._updateLoadingState("RequestedFriendList", "OFF");
                    const s = Object.keys(t).map((e=>t[e])).sort(((e,t)=>{
                        var s, i;
                        const n = null === (s = e.fReqInfo) || void 0 === s ? void 0 : s.time
                          , r = null === (i = t.fReqInfo) || void 0 === i ? void 0 : i.time;
                        return r > n ? 1 : r < n ? -1 : 0
                    }
                    ))
                      , {listFriendReceived: n=[], listFriendSuggest: r=[], mapRelatedGroup: a={}} = this.data.get("all") || {};
                    this.data.set("all", Object(i.a)(Object(i.a)({}, this.data.get("all")), {}, {
                        listFriendReceived: n,
                        listFriendSent: s,
                        listFriendSuggest: r,
                        mapRelatedGroup: a
                    })),
                    this._signalRenderItem()
                } catch (t) {
                    Date.now() - e < jn && await Rn(Nn),
                    this._updateLoadingState("RequestedFriendList", "OFF"),
                    this.Logger.zsymb(18, 9654, 3e4, "[InvitationController] -> [onLoadRequestedFriendList], error: " + JSON.stringify(t))
                }
            }
            async onLoadRecommendFriendList() {
                const e = Date.now();
                try {
                    this._updateLoadingState("RecommendFriendList", "ON");
                    const t = await Cn.getRecommendFriendList();
                    if (Date.now() - e < jn && await Rn(Nn),
                    this._updateLoadingState("RecommendFriendList", "OFF"),
                    Array.isArray(t) && t.length > 0) {
                        const e = t.filter((e=>{
                            var t;
                            return (null === (t = e.dataInfo) || void 0 === t ? void 0 : t.recommType) === Pn.RECEIVE
                        }
                        ))
                          , s = t.filter((e=>{
                            var t;
                            return (null === (t = e.dataInfo) || void 0 === t ? void 0 : t.recommType) === Pn.RECOMMEND
                        }
                        ))
                          , {listFriendSent: n=[], mapRelatedGroup: r={}} = this.data.get("all") || {};
                        this.data.set("all", Object(i.a)(Object(i.a)({}, this.data.get("all")), {}, {
                            listFriendReceived: e,
                            listFriendSent: n,
                            listFriendSuggest: s,
                            mapRelatedGroup: r
                        })),
                        s.length > 0 && this.dispatchEvent(new bn.b(bn.a.LoadRelatedGroups,"",{})),
                        this._signalRenderItem()
                    }
                } catch (t) {
                    Date.now() - e < jn && await Rn(Nn),
                    this._updateLoadingState("RecommendFriendList", "OFF"),
                    this.Logger.zsymb(18, 9654, 30001, "[InvitationController] -> [onLoadRecommendFriendList], error: " + JSON.stringify(t))
                }
            }
            _handleSortFriendSuggestList(e, t) {
                return 0 === e.length ? e : e.sort(((e,s)=>{
                    var i, n, r, a, o, l;
                    const c = t[null === (i = e.dataInfo) || void 0 === i ? void 0 : i.userId] && t[null === (n = e.dataInfo) || void 0 === n ? void 0 : n.userId].length
                      , d = (null === (r = e.dataInfo) || void 0 === r ? void 0 : r.displayName) || ""
                      , h = t[null === (a = s.dataInfo) || void 0 === a ? void 0 : a.userId] && t[null === (o = s.dataInfo) || void 0 === o ? void 0 : o.userId].length
                      , u = (null === (l = s.dataInfo) || void 0 === l ? void 0 : l.displayName) || "";
                    return c && h ? c === h ? d.localeCompare(u) : h > c ? 1 : -1 : c && !h ? -1 : !c && h ? 1 : c || h ? 0 : d.localeCompare(u)
                }
                ))
            }
            async onLoadRelatedGroupList() {
                try {
                    const {listFriendSuggest: e=[]} = this.data.get("all") || {}
                      , t = e.map((e=>{
                        var t;
                        return null == e || null === (t = e.dataInfo) || void 0 === t ? void 0 : t.userId
                    }
                    ))
                      , s = await Cn.getRelatedGroup(t)
                      , {listFriendReceived: n=[], listFriendSent: r=[]} = this.data.get("all") || {}
                      , a = this._handleSortFriendSuggestList(e, s.groupRelateds);
                    this.data.set("all", Object(i.a)(Object(i.a)({}, this.data.get("all")), {}, {
                        listFriendReceived: n,
                        listFriendSent: r,
                        listFriendSuggest: a,
                        mapRelatedGroup: s.groupRelateds || {}
                    })),
                    this._signalRenderItem()
                } catch (e) {
                    this.Logger.zsymb(18, 9654, 30002, "[InvitationController] -> [onLoadRelatedGroupList], error: " + JSON.stringify(e))
                }
            }
            handleFriendProfileChange(e) {
                const {listFriendReceived: t=[], listFriendSuggest: s=[], listFriendSent: i=[]} = this.data.get("all") || {};
                Object.keys(e).forEach((e=>{
                    const n = rt.default.getDName(e)
                      , r = t.findIndex((t=>t.dataInfo.userId === e));
                    -1 !== r && (t[r].displayName = n);
                    const a = s.findIndex((t=>t.dataInfo.userId === e));
                    -1 !== a && (s[a].displayName = n);
                    const o = i.findIndex((t=>t.userId === e));
                    -1 !== o && (i[o].displayName = n)
                }
                )),
                this._signalRenderItem()
            }
            handlePublicFriendEvents(e) {
                const t = e.payload;
                if (t)
                    for (let i = 0; i < t.length; i++) {
                        var s;
                        const n = t[i].ts
                          , r = "add" === t[i].act && t[i].data || (null === (s = t[i].data) || void 0 === s ? void 0 : s.fromUid)
                          , a = r === e.userId;
                        if (n && r && !a && "fr" === t[i].act_type)
                            switch (t[i].act) {
                            case "req_v2":
                                this.contactTabController.onUpdateRequestTracking("FRIEND", "NEW", n, r);
                                break;
                            case "undo_req":
                                this.contactTabController.onUpdateRequestTracking("FRIEND", "REMOVE", n, r),
                                this.dispatchEvent(new bn.b(bn.a.UndoAddFriendEvent,"",r));
                                break;
                            case "add":
                                this.contactTabController.onUpdateRequestTracking("FRIEND", "REMOVE", n, r),
                                this.dispatchEvent(new bn.b(bn.a.AcceptAddFriendEvent,"",r));
                                break;
                            case "reject":
                                this.contactTabController.onUpdateRequestTracking("FRIEND", "REMOVE", n, r),
                                this.dispatchEvent(new bn.b(bn.a.RejectAddFriendEvent,"",r))
                            }
                    }
            }
            handlePublicAddFriendEvent(e) {
                let t = [];
                const s = e.payload;
                if (s) {
                    for (let e = 0; e < s.length; e++) {
                        let i = {};
                        i.userId = s[e].userId,
                        i.zaloName = s[e].zaloName,
                        i.avatar = s[e].avatar,
                        i.displayName = s[e].displayName,
                        i.recommInfo = {
                            message: s[e].friendRequestMsg,
                            source: s[e].friendRequestSource
                        },
                        i.recommTime = s[e].friendRequestFetchTime,
                        i.recommType = s[e].friendRequestType,
                        t.push({
                            dataInfo: i,
                            recommItemType: 1
                        })
                    }
                    this.dispatchEvent(new bn.b(bn.a.ReceiveAddFriendEvent,"",t))
                }
            }
            addPublicListeners() {
                this.addEventListener(bn.a.PublicInvitationEvents, this.handlePublicFriendEvents.bind(this)),
                this.addEventListener(bn.a.PublicReceiveAddFriendEvent, this.handlePublicAddFriendEvent.bind(this)),
                rt.default.connectSignalChangeDNameAndAvatar(this.handleFriendProfileChange.bind(this))
            }
            addComponentListeners() {}
            removeComponentListeners() {}
            _addFriendReceived(e) {
                const {listFriendReceived: t=[], listFriendSent: s=[], listFriendSuggest: n=[], mapRelatedGroup: r={}} = this.data.get("all") || {}
                  , a = e.concat(t);
                this.data.set("all", Object(i.a)(Object(i.a)({}, this.data.get("all")), {}, {
                    listFriendReceived: a,
                    listFriendSent: s,
                    listFriendSuggest: n,
                    mapRelatedGroup: r
                })),
                this._signalRenderItem()
            }
            _removeFriendReceived(e) {
                const {listFriendReceived: t=[], listFriendSent: s=[], listFriendSuggest: n=[], mapRelatedGroup: r={}} = this.data.get("all") || {}
                  , a = t.filter((t=>{
                    var s;
                    return (null === (s = t.dataInfo) || void 0 === s ? void 0 : s.userId) !== e
                }
                ));
                this.data.set("all", Object(i.a)(Object(i.a)({}, this.data.get("all")), {}, {
                    listFriendReceived: a,
                    listFriendSent: s,
                    listFriendSuggest: n,
                    mapRelatedGroup: r
                })),
                this._signalRenderItem()
            }
            onUpdateFriendRequests(e, t) {
                switch (t) {
                case "ADD":
                    this._addFriendReceived(e);
                    break;
                case "REMOVE":
                    this._removeFriendReceived(e),
                    this._removeFriendSent(e)
                }
            }
            async onRejectFriend(e) {
                return new Promise(((t,s)=>{
                    Cn.rejectAddFriend(e).then((()=>{
                        this._removeFriendReceived(e),
                        t(e)
                    }
                    )).catch((e=>{
                        this.Logger.zsymb(18, 9654, 30003, "[InvitationController] -> [onRejectFriend], error: " + JSON.stringify(e)),
                        s(e)
                    }
                    ))
                }
                ))
            }
            async onAddFriend(e) {
                return new Promise(((t,s)=>{
                    Cn.acceptAddFriend(e).then(t).catch((e=>{
                        this.Logger.zsymb(18, 9654, 30004, "[InvitationController] -> [onAddFriend], error: " + JSON.stringify(e)),
                        s(e)
                    }
                    ))
                }
                ))
            }
            removeFriendSent(e) {
                const {listFriendReceived: t=[], listFriendSent: s=[], listFriendSuggest: n=[], mapRelatedGroup: r={}} = this.data.get("all") || {}
                  , a = s.filter((t=>(null == t ? void 0 : t.userId) !== e));
                this.data.set("all", Object(i.a)(Object(i.a)({}, this.data.get("all")), {}, {
                    listFriendReceived: t,
                    listFriendSent: a,
                    listFriendSuggest: n,
                    mapRelatedGroup: r
                })),
                this._signalRenderItem()
            }
            onRemoveFriendSent(e) {
                Cn.makeUndoSentRequestFriend(e).then((()=>{
                    this.removeFriendSent(e.userId)
                }
                )).catch((e=>{
                    this.Logger.zsymb(18, 9654, 30005, "[InvitationController] -> [onRemoveFriendSent], error: " + JSON.stringify(e)),
                    e && 301 == e.error_code ? Mt.a.createError(Dt.default.str("STR_UNDO_REQUEST_ERROR_301")) : e && "ERR_NO_NETWORK" === e.code ? Mt.a.createError(Dt.default.str("STR_CHECK_NET")) : Mt.a.createError(Dt.default.str("STR_UNDO_REQUEST_ERROR_UNKNOWN"))
                }
                ))
            }
            _removeFriendSuggest(e) {
                const {listFriendReceived: t=[], listFriendSent: s=[], listFriendSuggest: n=[], mapRelatedGroup: r={}} = this.data.get("all") || {}
                  , a = n.filter((t=>{
                    var s;
                    return (null == t || null === (s = t.dataInfo) || void 0 === s ? void 0 : s.userId) !== e
                }
                ));
                this.data.set("all", Object(i.a)(Object(i.a)({}, this.data.get("all")), {}, {
                    listFriendReceived: t,
                    listFriendSent: s,
                    listFriendSuggest: a,
                    mapRelatedGroup: r
                })),
                this._signalRenderItem()
            }
            onAddFriendSuggest(e) {
                hn.a.doAddFriend(e.uid, e.src, null, e.windowId).then((()=>{
                    this._removeFriendSuggest(e.uid),
                    this.onLoadRequestedFriendList()
                }
                )).catch((e=>{
                    this.Logger.zsymb(18, 9654, 30006, "[InvitationController] -> [onAddFriendSuggest], error: " + JSON.stringify(e))
                }
                ))
            }
            onRemoveFriendSuggest(e) {
                Cn.removeSuggestFriend(e).then((()=>{
                    this._removeFriendSuggest(e.uid)
                }
                )).catch((e=>{
                    this.Logger.zsymb(18, 9654, 30007, "[InvitationController] -> [onRemoveFriendSuggest], error: " + JSON.stringify(e))
                }
                ))
            }
            openMutualGroupPopup(e) {
                _t.ModalManagerV2.openModal({
                    windowId: "1",
                    name: v.ModalIdentitiesDefine.FRIEND_PROFILE,
                    params: {
                        userId: e,
                        showMutualGroups: !0
                    }
                })
            }
            resetData() {
                this.data.set("all", {
                    isLoadingRecommendFriendList: !1,
                    isLoadingRequestedFriendList: !1,
                    listFriendReceived: [],
                    listFriendSent: [],
                    listFriendSuggest: [],
                    mapRelatedGroup: {}
                })
            }
            makeExpiredReceivedFriendRequest() {
                let {listFriendReceived: e=[], listFriendSent: t=[], listFriendSuggest: s=[], mapRelatedGroup: n={}} = this.data.get("all") || {};
                if (0 !== e.length) {
                    for (let t = 0; t < e.length; t++)
                        e[t].dataInfo.recommTime = -1,
                        e[t].dataInfo.recommInfo.source = -1,
                        e[t].dataInfo.recommInfo.message = "";
                    this.data.set("all", Object(i.a)(Object(i.a)({}, this.data.get("all")), {}, {
                        listFriendReceived: e,
                        listFriendSent: t,
                        listFriendSuggest: s,
                        mapRelatedGroup: n
                    })),
                    this._signalRenderItem()
                }
            }
            makeExpiredSentFriendSentRequest() {
                let {listFriendReceived: e=[], listFriendSent: t=[], listFriendSuggest: s=[], mapRelatedGroup: n={}} = this.data.get("all") || {};
                if (0 !== t.length) {
                    for (let e = 0; e < t.length; e++)
                        t[e].fReqInfo.time = -1,
                        t[e].fReqInfo.src = -1,
                        t[e].fReqInfo.message = "";
                    this.data.set("all", Object(i.a)(Object(i.a)({}, this.data.get("all")), {}, {
                        listFriendReceived: e,
                        listFriendSent: t,
                        listFriendSuggest: s,
                        mapRelatedGroup: n
                    })),
                    this._signalRenderItem()
                }
            }
            getList(e, t) {
                throw new Error("Method not implemented.")
            }
            onGetItemFailure(e, t) {
                throw new Error("Method not implemented.")
            }
            onGetListFailure(e, t) {
                throw new Error("Method not implemented.")
            }
            getDefaultItem() {
                throw new Error("Method not implemented.")
            }
            getDefaultList() {
                throw new Error("Method not implemented.")
            }
        }
        ) || Bn) || Bn) || Bn);
        var Un = s("hd49");
        let kn;
        !function(e) {
            e.MessageDelivered = "MessageDelivered"
        }(kn || (kn = {}));
        class Gn extends Event {
            constructor(e, t, s) {
                super(e),
                this.msgId = void 0,
                this.payload = void 0,
                this.msgId = t,
                this.payload = s
            }
        }
        var xn, zn = s("Y/Cm");
        Object(w.h)()(xn = Object(w.g)()(xn = Object(l.singleton)(Un.a)(xn = Object(l.injectable)()(xn = function(e, t) {
            return Object(l.inject)(P.ZLoggerFactory)(e, void 0, 0)
        }(xn = Reflect.metadata("design:type", Function)(xn = Reflect.metadata("design:paramtypes", [void 0 === P.ZLoggerFactory ? Object : P.ZLoggerFactory])(xn = class extends k.b {
            constructor(e) {
                super(),
                this.logger = void 0,
                this.logger = e.createZLogger("feat", ["message-service"])
            }
            onStart() {}
            onDispose() {}
            onPollingMessages(e, t) {
                return new Promise(((s,i)=>{
                    if (!e || 0 === e.length)
                        return s(!1);
                    const n = t ? {
                        userId: t
                    } : {
                        userId: e[0].toUid
                    }
                      , r = [...e]
                      , a = ()=>{
                        this.messagesDelivered(r)
                    }
                    ;
                    zn.a.preparse(r, n, a, a)
                }
                ))
            }
            loadMessage(e) {
                return Promise.resolve({})
            }
            loadMessagesBefore(e, t, s) {}
            loadMessagesAfter(e, t, s) {}
            loadLastMessage(e, t) {}
            messagesDelivered(e) {
                this.broadcastEvent(kn.MessageDelivered, "", e)
            }
            broadcastEvent(e, t, s) {
                void 0 === t && (t = ""),
                Ke.default.log([e, "- id: ", t, " - payload: ", null == s ? void 0 : s.length]),
                this.dispatchEvent(new Gn(e,t,s))
            }
        }
        ) || xn) || xn) || xn) || xn) || xn) || xn);
        const Vn = Object(l.define)("cloud-segment-repository")
          , $n = Object(l.define)("cloud-segment-manager")
          , qn = Object(l.define)("cloud-message-manager");
        class Wn {
            constructor(e) {
                this.entity = e
            }
            get conversationId() {
                return this.entity.conversationId
            }
            get cloudFirstSmsLocalId() {
                return this.entity.cloudFirstSmsLocalId
            }
            get cloudSegmentCheck() {
                return this.entity.cloudSegmentCheck
            }
            get hasMore() {
                return this.entity.hasMore
            }
            get lastCloudVerifiedDttm() {
                return this.entity.lastCloudVerifiedDttm
            }
            get lastDeletedMsgID() {
                return this.entity.lastDeletedMsgID
            }
            get lastGetMaxRecentTs() {
                return this.entity.lastGetMaxRecentTs
            }
            get maxCloudMsgId() {
                return this.entity.maxCloudMsgId
            }
        }
        var Hn, Kn = s("t3h5");
        let Qn = l.ModuleContainer.injectable()(Hn = Reflect.metadata("design:type", Function)(Hn = Reflect.metadata("design:paramtypes", [])(Hn = class {
            constructor() {}
            get(e) {
                return Kn.a.getSegmentByConvId(e)
            }
        }
        ) || Hn) || Hn) || Hn;
        var Zn, Jn = s("npvr"), Xn = s("D8Ji");
        let Yn, er = l.ModuleContainer.injectable()(Zn = function(e, t) {
            return l.ModuleContainer.inject(Vn)(e, void 0, 0)
        }(Zn = Reflect.metadata("design:type", Function)(Zn = Reflect.metadata("design:paramtypes", [void 0 === Vn ? Object : Vn])(Zn = class {
            constructor(e) {
                this.segmentRepository = e
            }
            get(e) {
                return this.segmentRepository.get(e).then((e=>e && new Wn(e))).catch((e=>{}
                ))
            }
            async createOrExtendSegment(e, t) {
                const s = await this.segmentRepository.get(e);
                s.cloudSegmentCheck = Xn.a.mergeNewSegment(t.verifiedRange, null == s ? void 0 : s.cloudSegmentCheck),
                s.maxCloudMsgId = Math.max(s.maxCloudMsgId || 0, t.verifiedRange[1]),
                Kn.a.setSegmentCacheByConvId(e, s),
                await Jn.b.updateSegmentDB(e, s)
            }
        }
        ) || Zn) || Zn) || Zn) || Zn;
        !function(e) {
            e[e.STOP_RETRY = -69] = "STOP_RETRY",
            e[e.RETRY_LATER = -71] = "RETRY_LATER",
            e[e.FORCE_UPDATE_CONFIG = -72] = "FORCE_UPDATE_CONFIG",
            e[e.UNKNOWN_EXCEPTION = 112] = "UNKNOWN_EXCEPTION",
            e[e.PARAMS_INVALID = 114] = "PARAMS_INVALID",
            e[e.CLIENT_NOT_SUPPORT = 211] = "CLIENT_NOT_SUPPORT",
            e[e.LIMIT_GROUPS_PER_REQUEST = 300] = "LIMIT_GROUPS_PER_REQUEST",
            e[e.LIMIT_MSG_PER_GROUP = 301] = "LIMIT_MSG_PER_GROUP",
            e[e.LIMIT_TOTAL_SYNC_MSG_PER_GROUP = 303] = "LIMIT_TOTAL_SYNC_MSG_PER_GROUP",
            e[e.MISSING_PARAM = 111] = "MISSING_PARAM",
            e[e.GROUP_NOT_EXIST = 161] = "GROUP_NOT_EXIST",
            e[e.NOT_BELONG_TO_GROUP = 164] = "NOT_BELONG_TO_GROUP",
            e[e.IS_DIRTY_GROUP = 302] = "IS_DIRTY_GROUP"
        }(Yn || (Yn = {}));
        class tr extends Error {
            constructor(e, t, s) {
                super(s),
                this.code = e,
                this.data = t
            }
        }
        var sr;
        let ir = l.ModuleContainer.injectable()(sr = function(e, t) {
            return l.ModuleContainer.inject(c.a)(e, void 0, 0)
        }(sr = Reflect.metadata("design:type", Function)(sr = Reflect.metadata("design:paramtypes", [void 0 === c.a ? Object : c.a])(sr = class {
            constructor(e) {
                this.config = e
            }
            get settings() {
                return this.config.get("cloud.auto_download")
            }
            async crawlMissingMessage(e, t) {
                void 0 === t && (t = {
                    nRetry: 0,
                    count: 50
                });
                let s = e.conversationId;
                s.startsWith("g") && (s = s.slice(1));
                const i = `${s}_${e.requestMsgId}`;
                let n = this.settings.limit.minMsgDttm
                  , r = this.settings.limit.maxMsgFirstSegment;
                const a = {
                    groupId: s,
                    fromMsgId: e.requestMsgId,
                    globalMsgIds: e.globalMsgIds,
                    curTotalMsgs: e.curTotalMsgs,
                    tsJoinGroup: e.tsJoinGroup,
                    minMsgTs: n,
                    maxTotalSyncMsg: r
                };
                return await Xi.default.crawlMissingMessage(i, a, {
                    requestTimeout: this.settings.fetching.timeout,
                    count: t.count,
                    nRetry: t.nRetry,
                    usePostApi: !0
                }).then((e=>Object(Zi.a)(e))).then((e=>{
                    try {
                        return JSON.parse(e)
                    } catch (t) {
                        throw {
                            error_code: -1,
                            error_message: "invalid response"
                        }
                    }
                }
                )).then((e=>{
                    const t = e[s];
                    if (t.error > 0)
                        throw {
                            error_code: t.error,
                            error_message: "inner error"
                        };
                    return t
                }
                )).catch((e=>{
                    if ("number" == typeof e.error_code) {
                        let s = e.data;
                        try {
                            s = JSON.parse(s)
                        } catch (t) {}
                        throw new tr(e.error_code,s,e.error_message)
                    }
                    throw e
                }
                ))
            }
        }
        ) || sr) || sr) || sr) || sr;
        var nr, rr = s("EO3V"), ar = s("enz2");
        const or = {
            totalMsgCount: 0,
            fetchedMsgCount: 0,
            serverMsgCount: 0,
            newMsgCount: 0,
            phaseDone: !1,
            isFilteredByTimeJoin: !1,
            done: !0,
            tsJoinGroup: "0"
        };
        let lr = l.ModuleContainer.injectable()(nr = function(e, t) {
            return l.ModuleContainer.injectToken(ir)(e, void 0, 0)
        }(nr = function(e, t) {
            return l.ModuleContainer.inject($n)(e, void 0, 1)
        }(nr = function(e, t) {
            return l.ModuleContainer.inject(xs.c)(e, void 0, 2)
        }(nr = function(e, t) {
            return l.ModuleContainer.inject(xs.b)(e, void 0, 3)
        }(nr = function(e, t) {
            return l.ModuleContainer.inject(P.ZLoggerFactory)(e, void 0, 4)
        }(nr = Reflect.metadata("design:type", Function)(nr = Reflect.metadata("design:paramtypes", [void 0 === ir ? Object : ir, void 0 === $n ? Object : $n, void 0 === xs.c ? Object : xs.c, void 0 === xs.b ? Object : xs.b, void 0 === P.ZLoggerFactory ? Object : P.ZLoggerFactory])(nr = class {
            constructor(e, t, s, i, n) {
                this.api = e,
                this.segmentManager = t,
                this.messageRepository = s,
                this.messageManager = i,
                this.logger = void 0,
                this.logger = n.createZLogger("cld-msg", ["manager"])
            }
            async crawlMissingMessage(e, t, s) {
                const n = await this.segmentManager.get(e)
                  , r = (()=>{
                    var e;
                    let t = s.minMsgId && Number.parseInt(s.minMsgId);
                    return n && n.lastDeletedMsgID && (t = t ? Math.max(n.lastDeletedMsgID, t) : n.lastDeletedMsgID),
                    null === (e = t) || void 0 === e ? void 0 : e.toString()
                }
                )()
                  , a = "0" !== t
                  , o = a ? s.count + 1 : s.count;
                if (a && t <= r)
                    return or;
                const l = await this.messageManager.findPrevMessagesFromMsgId(e, {
                    maxMsgId: "0" !== t ? t : void 0,
                    minMsgId: r,
                    limit: o
                }).then((e=>e.map((e=>e.entity))))
                  , c = new Set;
                l.forEach((e=>{
                    try {
                        const t = Number.parseInt(e.msgId);
                        Number.isInteger(t) && c.add(t.toString())
                    } catch (t) {}
                }
                ));
                const d = Array.from(c.values())
                  , h = await this.api.crawlMissingMessage({
                    conversationId: e,
                    requestMsgId: t,
                    globalMsgIds: d,
                    curTotalMsgs: s.curTotalMsgs,
                    tsJoinGroup: s.tsJoinGroup
                }, {
                    nRetry: s.nRetry,
                    count: s.count
                });
                if (0 === h.groupMsgs.length && "0" === h.maxMsgId)
                    return or;
                let u = rr.a.checkDupMessageFromCloud(e, h.groupMsgs);
                r && r > "0" && (u = u.filter((e=>e.msgId > r)));
                const g = [...l, ...u];
                if (0 === g.length)
                    return or;
                const p = Number.parseInt(h.lastMsgId, 10);
                let m = Number.parseInt(t);
                const f = rr.a.findMinMaxGroupMsg(g, m, p, null == n ? void 0 : n.lastDeletedMsgID)
                  , {groupMsgsToView: b, groupMsgsAddDb: I, groupMsgsSearch: y} = ar.a.findMsgsAddDb(t, u, [], l, Object(i.a)({
                    apiType: 2,
                    conversationId: e
                }, f));
                I.forEach((e=>{
                    e.src = v.MSG_SRC.AUTO_LOADER
                }
                )),
                await this.messageRepository.saveMessages(I),
                await ar.a.updateSearchV3(y, e);
                const C = !!h.isFilteredByPhase
                  , S = h.maxMsgId;
                f.minMsgId && f.maxMsgId && await this.segmentManager.createOrExtendSegment(e, {
                    verifiedRange: [f.minMsgId, f.maxMsgId]
                });
                let E = "0";
                Number.isInteger(Number.parseInt(h.tsJoinGroup)) ? E = h.tsJoinGroup : this.logger.zsymb(18, 8177, 3e4, (()=>["api res invalid ts join group", {
                    tsJoinGroup: h.tsJoinGroup
                }]));
                const _ = !!h.isFilteredByTimeJoin
                  , T = {
                    totalMsgCount: b.length,
                    fetchedMsgCount: I.length,
                    serverMsgCount: u.length,
                    newMsgCount: I.length,
                    phaseDone: C,
                    isFilteredByTimeJoin: _,
                    done: !(C || !_ && h.hasMore),
                    minMsgId: r,
                    maxMsgId: S.toString(),
                    tsJoinGroup: E
                };
                return this.logger.zsymb(3, 8177, 30001, "[auto-dl-msg] crawl result", T),
                T
            }
        }
        ) || nr) || nr) || nr) || nr) || nr) || nr) || nr) || nr;
        l.ModuleContainer.registerSingleton(Vn, Qn),
        l.ModuleContainer.registerSingleton($n, er),
        l.ModuleContainer.registerSingleton(qn, lr);
        var cr, dr = s("rfrl"), hr = s("KP/S"), ur = s("wiGx");
        const gr = {
            screen: ur.a.Hidden,
            error: hr.b.NO_ERROR,
            progress: 0,
            numOfSyncedConv: 0,
            popupVisible: !1,
            startSyncTime: 0,
            closing: !1,
            syncingConversation: null
        };
        Object(mt.b)(ur.b)(cr = class {
            constructor() {
                this.state = Object(i.a)({}, gr),
                this.name = "sync-message-ui",
                this.key = "window_id"
            }
            showPopup() {
                this.setState((e=>{
                    e.popupVisible = !0
                }
                ))
            }
            setSyncingConversation(e) {
                this.setState((t=>{
                    t.syncingConversation = e
                }
                ))
            }
            hidePopup() {
                this.setState((e=>{
                    e.popupVisible = !1
                }
                ))
            }
            hideAllUI() {
                this.setState((e=>{
                    e.screen = ur.a.Hidden,
                    e.closing = !1
                }
                ))
            }
            showError(e) {
                this.setState((t=>{
                    t.error = e,
                    t.screen = ur.a.Error,
                    t.syncingConversation = null
                }
                ))
            }
            showSuggestNewSync(e) {
                this.setState((t=>{
                    t.screen = ur.a.SuggestNewSync,
                    t.popupVisible = e
                }
                ))
            }
            showSuggestResume() {
                this.setState((e=>{
                    e.screen = ur.a.SuggestResume,
                    e.popupVisible = !1
                }
                ))
            }
            showSyncGuide() {
                this.setState((e=>{
                    e.screen = ur.a.SyncGuide,
                    e.popupVisible = !0
                }
                ))
            }
            showWaitForBackup() {
                this.setState((e=>{
                    e.screen = ur.a.WaitForBackup
                }
                ))
            }
            showDownloadingBackup() {
                this.setState((e=>{
                    e.screen = ur.a.DownloadingBackup,
                    e.progress = 0
                }
                ))
            }
            showDecryptingBackup() {
                this.setState((e=>{
                    e.screen = ur.a.DecryptingBackup,
                    e.progress = 0
                }
                ))
            }
            showInProgress() {
                this.setState((e=>{
                    e.screen = ur.a.SyncInProgress,
                    e.progress = 0
                }
                ))
            }
            showCloseNotice() {
                this.setState((e=>{
                    e.closing = !0
                }
                ))
            }
            showSuccessMessage() {
                this.setState((e=>{
                    e.screen = ur.a.SyncSuccess,
                    e.syncingConversation = null
                }
                ))
            }
            showWaitForNetwork() {
                this.setState((e=>{
                    e.screen = ur.a.WaitForNetwork
                }
                ))
            }
            setProgress(e) {
                this.setState((t=>{
                    t.progress = e
                }
                ))
            }
            setNumOfSyncedConv(e) {
                this.setState((t=>{
                    t.numOfSyncedConv = e
                }
                ))
            }
            resetStartSyncTime() {
                this.setState((e=>{
                    e.startSyncTime = Date.now()
                }
                ))
            }
            clearError() {
                this.setState((e=>{
                    e.error = hr.b.NO_ERROR
                }
                ))
            }
            getStartSyncTime() {
                return this.state.startSyncTime
            }
            getCurrentError() {
                return this.state.error
            }
            getCurrentScreen() {
                return this.state.screen
            }
            getPopupVisible() {
                return this.state.popupVisible
            }
            init() {}
            getItem() {
                return this.state
            }
            getList() {
                return []
            }
            onGetItemFailure() {}
            onGetListFailure() {}
            setState(e) {
                const t = Object(dr.a)(this.state, e);
                this.state !== t && (this.state = t,
                Object(Pe.g)(this.name, "current"))
            }
        }
        );
        var pr, mr = s("cPHW");
        let fr = l.ModuleContainer.injectable()(pr = class {
            start() {}
            isEnable() {
                return !1
            }
            canSync() {
                return hr.a.DISABLED
            }
            suggestSync() {
                throw new Error("Method not implemented.")
            }
            suggestResume() {
                throw new Error("Method not implemented.")
            }
            sync() {
                throw new Error("Method not implemented.")
            }
            resume() {
                throw new Error("Method not implemented.")
            }
            cancel() {
                throw new Error("Method not implemented.")
            }
            pause() {
                throw new Error("Method not implemented.")
            }
            retry() {
                throw new Error("Method not implemented.")
            }
            rejectSuggest() {
                throw new Error("Method not implemented.")
            }
            showSuggestPopup() {
                throw new Error("Method not implemented.")
            }
            closeSuggestPopup() {
                throw new Error("Method not implemented.")
            }
            setRequestBackupTimeout() {
                throw new Error("Method not implemented.")
            }
            clearRequestBackupTimeout() {
                throw new Error("Method not implemented.")
            }
            setAutoCloseSuccessTimeout() {
                throw new Error("Method not implemented.")
            }
            clearAutoCloseSuccessTimeout() {
                throw new Error("Method not implemented.")
            }
            resendRequest() {
                throw new Error("Method not implemented.")
            }
            reset() {
                throw new Error("Method not implemented.")
            }
            hideProgress() {
                throw new Error("Method not implemented.")
            }
            handleCtrlEvents() {}
        }
        ) || pr;
        l.ModuleContainer.registerSingleton(mr.a, fr);
        var vr = s("Erqw");
        const br = e=>{
            var t;
            const s = e.step
              , i = e.registry;
            let n = null !== (t = e.timeout) && void 0 !== t ? t : 0;
            const r = e.callback
              , a = e.args
              , o = performance.now() + n;
            let l;
            function c() {
                let e = Math.min(o - performance.now(), s);
                return performance.now() > o ? i[l] = setTimeout(r, 0, a) : i[l] = setTimeout(c, e),
                i[l]
            }
            return function() {
                let e = Math.min(o - performance.now(), s);
                return l = setTimeout(c, e),
                i[l] = l,
                l
            }()
        }
        ;
        const {setTimeoutUnlimited: Ir, clearTimeoutUnlimited: yr} = function(e) {
            var t, s;
            void 0 === e && (e = {});
            const i = null !== (t = e.step) && void 0 !== t && t ? 1e4 : 36e5
              , n = null !== (s = e.registry) && void 0 !== s ? s : {};
            return {
                setTimeoutUnlimited: function(e, t) {
                    for (var s = arguments.length, r = new Array(s > 2 ? s - 2 : 0), a = 2; a < s; a++)
                        r[a - 2] = arguments[a];
                    const o = br({
                        step: i,
                        registry: n,
                        callback: e,
                        timeout: t,
                        args: r
                    });
                    return o
                },
                clearTimeoutUnlimited: e=>{
                    (e=>{
                        const t = e.id
                          , s = e.registry;
                        clearTimeout(s[t]),
                        delete s[t]
                    }
                    )({
                        id: e,
                        registry: n
                    })
                }
            }
        }({
            registry: {}
        });
        var Cr, Sr = s("1p+n"), Er = s("UYft"), _r = s("AULX");
        Object(l.injectable)()(Cr = Object(l.singleton)(_r.a)(Cr = Object(w.g)()(Cr = Object(w.e)()(Cr = function(e, t) {
            return Object(l.inject)(C)(e, void 0, 0)
        }(Cr = function(e, t) {
            return Object(l.inject)(P.ZLoggerFactory)(e, void 0, 1)
        }(Cr = Reflect.metadata("design:type", Function)(Cr = Reflect.metadata("design:paramtypes", [void 0 === y ? Object : y, void 0 === P.ZLoggerFactory ? Object : P.ZLoggerFactory])(Cr = class {
            constructor(e, t) {
                this.kvCacheFactory = e,
                this.loggerFactory = t,
                this._logger = void 0,
                this._authEvent = void 0,
                this.__cache = void 0,
                this._renewRegistry = {},
                this.updateEmitter = new Sr.a,
                this._logger = this.loggerFactory.createZLogger("feat", ["group-link"])
            }
            onAuthenticated(e) {
                this._authEvent = e
            }
            _makeCache() {
                if (!this._authEvent)
                    throw new Error("Not authenticated");
                return this.kvCacheFactory.createCache(`group-link-v3-${this._authEvent.getSession().userId}`, {
                    maxSize: 50
                })
            }
            get _cache() {
                return this.__cache || (this.__cache = this._makeCache()),
                this.__cache
            }
            _scheduleRenew(e, t) {
                if (this._clearRenewSchedule(e),
                !t.enabled)
                    return this;
                if (!qe.default.groupLink.enableScheduleRenew)
                    return this._logger.debug(["_scheduleRenew skipped, enableScheduleRenew:", qe.default.groupLink.enableScheduleRenew]),
                    this;
                let s = t.expirationDate - si.a.getTimeNow()
                  , i = Ir((()=>{
                    this._clearRenewSchedule(e),
                    this._emitGroupLinkUpdated(e, !0)
                }
                ), s);
                return this._renewRegistry[e] = ()=>{
                    yr(i),
                    delete this._renewRegistry[e]
                }
                ,
                this
            }
            _clearRenewSchedule(e) {
                var t, s;
                return null === (t = (s = this._renewRegistry)[e]) || void 0 === t || t.call(s),
                this
            }
            onDispose() {
                this._authEvent = void 0,
                this.__cache = void 0
            }
            async _getFromCache(e) {
                if (!qe.default.groupLink.enableCache)
                    return void this._logger.debug(["cache skipped, enableCache:", qe.default.groupLink.enableCache]);
                e = Tr(e);
                let t = await this._cache.getItem(e);
                if (t) {
                    if (function(e) {
                        if (!e)
                            return !1;
                        let {data: t, meta: s} = e;
                        if (!t)
                            return !1;
                        if (!s)
                            return !1;
                        if (vr.a.isOverflowAtTime(s.ts))
                            return !1;
                        const i = si.a.getTimeNow();
                        if (s.ts + qe.default.groupLink.maxCacheDuration < i)
                            return !1;
                        if (t.enabled && t.expirationDate < i)
                            return !1;
                        return !0
                    }(t))
                        return t.data;
                    await this._cache.removeItem(e)
                }
            }
            async _fetchAndPutToCache(e, t) {
                const s = si.a.getTimeNow()
                  , i = await t()
                  , n = {
                    enabled: i.enabled,
                    expirationDate: i.expiration_date,
                    link: i.link
                };
                let r = {
                    ts: s
                };
                return await this._cache.setItem(e, {
                    data: n,
                    meta: r
                }),
                n
            }
            async _deleteCache(e) {
                await this._cache.removeItem(e)
            }
            async getGroupLinkDetail(e, t) {
                void 0 === t && (t = !1),
                this._logger.zsymb(12, 9640, 3e4, ["getting", e]);
                let s = Tr(e)
                  , i = await this._getFromCache(s);
                if (i && !t)
                    return this._logger.zsymb(12, 9640, 30001, ["cache hit", s]),
                    this._scheduleRenew(s, i),
                    i;
                this._logger.zsymb(12, 9640, 30002, ["fetching", s]);
                let n = Ke.default.getRawGroupId(s);
                let r = await this._fetchAndPutToCache(s, (()=>He.default.getGroupLinkDetail(n))).catch(Er.a.catch((e=>this._logger.zsymb(18, 9640, 30003, ["get failed", s, e]))));
                return this._scheduleRenew(s, r),
                t && await this._emitGroupLinkUpdated(e),
                this._logger.zsymb(12, 9640, 30004, ["done", s]),
                r
            }
            async renewGroupLink(e) {
                this._logger.zsymb(12, 9640, 30005, ["renewing", e]);
                let t = Tr(e)
                  , s = Ke.default.getRawGroupId(t);
                let i = await this._fetchAndPutToCache(t, (()=>He.default.renewGroupLink(s))).catch(Er.a.catch((e=>this._logger.zsymb(18, 9640, 30006, ["renew failed", t, e]))));
                return this._scheduleRenew(t, i),
                await this._emitGroupLinkUpdated(t),
                this._logger.zsymb(12, 9640, 30007, ["renew done", e]),
                i
            }
            async disableGroupLink(e) {
                this._logger.zsymb(12, 9640, 30008, ["disabling", e]);
                let t = Tr(e)
                  , s = Ke.default.getRawGroupId(t);
                await He.default.disableGroupLink(s).catch(Er.a.catch((e=>this._logger.zsymb(18, 9640, 30009, ["disable failed", t, e])))),
                await this._emitGroupLinkUpdated(t, !0),
                this._logger.zsymb(12, 9640, 30010, ["disable done", e])
            }
            async _emitGroupLinkUpdated(e, t) {
                void 0 === t && (t = !1);
                const s = Tr(e);
                t && await this._deleteCache(s),
                this.updateEmitter.emit(s, s),
                this.updateEmitter.emit("*", s)
            }
            async emitGroupLinkUpdated(e) {
                return await this._emitGroupLinkUpdated(e, !0)
            }
        }
        ) || Cr) || Cr) || Cr) || Cr) || Cr) || Cr) || Cr);
        function Tr(e) {
            return v.GROUPID_PREFIX + Ke.default.getRawGroupId(e)
        }
        var Lr, Or = s("TO4U");
        const Fr = {
            loading: !0
        };
        Object(mt.b)(Or.a)(Lr = function(e, t) {
            return Object(l.inject)(_r.a)(e, void 0, 0)
        }(Lr = Reflect.metadata("design:type", Function)(Lr = Reflect.metadata("design:paramtypes", [void 0 === _r.a ? Object : _r.a])(Lr = class e {
            constructor(e) {
                this._groupLink = e,
                this.type = void 0,
                this.name = "group-link-ui",
                this.key = "group-link-ui",
                this._cache = new T.default({
                    maxSize: 50
                }),
                this._handleUpdate = e=>{
                    const t = Rr(e);
                    this._cache.delete(t),
                    this._startFetchAndSetToSession(t)
                }
                ,
                this._groupLink.updateEmitter.on("*", this._handleUpdate)
            }
            init() {}
            getItem(e, t) {
                if (!e.key.startsWith(v.GROUPID_PREFIX))
                    return;
                const s = Rr(e.key);
                this._startFetchAndSetToSession(s);
                let i = this._cache.get(s);
                return i || Fr
            }
            static shouldSignal(e, t) {
                var s, i, n, r, a, o;
                return !e || (null == e || e.error,
                null == t || t.error,
                null == t || null === (s = t.data) || void 0 === s || s.enabled,
                null == t || null === (i = t.data) || void 0 === i || i.enabled,
                null != e && null !== (n = e.data) && void 0 !== n && n.enabled && null != t && null !== (r = t.data) && void 0 !== r && r.enabled && (null == e || null === (a = e.data) || void 0 === a || a.link,
                null == t || null === (o = t.data) || void 0 === o || o.link),
                !1)
            }
            signalIfNeeded(t, s, i) {
                e.shouldSignal(s, i) && Object(Pe.g)(this.name, t)
            }
            _startFetchAndSetToSession(e) {
                const t = this._cache.get(e);
                setTimeout((()=>{
                    this._groupLink.getGroupLinkDetail(e).then((s=>{
                        const i = {
                            loading: !1,
                            data: s
                        };
                        this._cache.set(e, i),
                        this.signalIfNeeded(e, t, i)
                    }
                    )).catch((s=>{
                        const i = {
                            loading: !1,
                            error: s
                        };
                        this._cache.set(e, i),
                        this.signalIfNeeded(e, t, i)
                    }
                    ))
                }
                ), 0)
            }
            getList(e, t) {
                throw new Error("Method not implemented.")
            }
            onGetItemFailure(e, t) {
                throw new Error("Method not implemented.")
            }
            onGetListFailure(e, t) {
                throw new Error("Method not implemented.")
            }
        }
        ) || Lr) || Lr) || Lr);
        function Rr(e) {
            return v.GROUPID_PREFIX + Ke.default.getRawGroupId(e)
        }
        var wr = s("akSd")
          , Mr = s("xQyS")
          , Dr = s("fqRP")
          , Ar = s("L904")
          , Pr = s("EiAw")
          , jr = s("IoRb");
        let Nr;
        class Br {
            static get instance() {
                return Nr || (Nr = new Br),
                Nr
            }
            get _eventStore() {
                return this.__eventStore || (this.__eventStore = s("emRR").default),
                this.__eventStore
            }
            constructor() {
                this.__eventStore = void 0,
                this._emitConversationDeleted = e=>{
                    let t, s, i = [];
                    if (e.ok ? ({conversation: t, toUid: s, allItems: i} = e.value) : ({conversation: t, toUid: s, allItems: i} = e.error),
                    t)
                        return;
                    if (i.length && i.every((e=>e.ttlType === Oi.a.Quote)))
                        return;
                    const n = {
                        type: Je.FetchActions.DELETE_CONVERSATION,
                        payload: s
                    };
                    this._eventStore.dispatch(n),
                    Ae.a.dispatch(n),
                    Ze.default.send(n.type, n.payload)
                }
                ,
                this._emitDeletedMsgs = e=>{
                    let t, s;
                    e.ok ? ({allItems: s, conversation: t} = e.value) : ({allItems: s, conversation: t} = e.error);
                    const i = s.filter((e=>e.ttlType === Oi.a.Message)).map((e=>e.msgId));
                    Object(Pr.a)({
                        msgId: i,
                        conversation: t
                    })
                }
                ,
                this._emitUpdateUnread = (e,t)=>{
                    let s, i = [];
                    e.ok ? ({toUid: s, allItems: i} = e.value) : ({toUid: s, allItems: i} = e.error),
                    ot.a.UnreadDataManager.updateUnreadTTLConversation(s, i, null == t ? void 0 : t.get(s))
                }
                ,
                this.emitPerConversation = async(e,t)=>{
                    let s = await Object(Mr.a)(this._emitConversationDeleted, e);
                    s.ok || Object(jr.a)("_emitConversationDeleted failed", s.error),
                    s = await Object(Mr.a)(this._emitDeletedMsgs, e),
                    s.ok || Object(jr.a)("_emitDeletedMsgs failed", s.error),
                    s = await Object(Mr.a)(this._emitUpdateUnread, e, t),
                    s.ok || Object(jr.a)("_emitUpdateUnread failed", s.error)
                }
            }
        }
        var Ur, kr = s("LA52"), Gr = s("GSaP");
        const xr = e=>null == e ? void 0 : e.toUid
          , zr = e=>null != e && e.ok ? "success" : "error";
        Object(l.singleton)(kr.a)(Ur = Reflect.metadata("design:type", Function)(Ur = Reflect.metadata("design:paramtypes", [])(Ur = class {
            constructor() {
                var e = this;
                this._pruning = !1,
                this._task = void 0,
                this._ttl = l.ModuleContainer.resolve(Dr.a),
                this._logger = void 0,
                this.dispose = ()=>{}
                ,
                this.prune = async()=>this._pruning ? await this._task : (this._pruning = !0,
                this._task = this._pruneFromDB(),
                this._pruning = !1,
                this._task),
                this._pruneFromDB = async()=>{
                    const e = si.a.getTimeNow();
                    this._logger.zsymb(0, 8948, 3e4, "Pruner execute task", e);
                    const t = await Object(Mr.b)(this._ttl.getExpireItemsBefore, e);
                    if (!t.ok)
                        return this._logger.zsymb(18, 8948, 30001, "Pruner getExpireItemsBefore failed", t.error),
                        {
                            ok: !1,
                            error: null
                        };
                    const s = t.ok ? t.value : [];
                    return await this._pruneTTLItems(s)
                }
                ,
                this._pruneByMsgsBatch = [],
                this.pruneByMsgs = async e=>{
                    const t = Object(Xe.a)(e);
                    this._pruneByMsgsBatch.push(...t),
                    setTimeout((()=>{
                        const e = this._pruneByMsgsBatch;
                        this._pruneByMsgsBatch = [],
                        e.length && (this._logger.zsymb(15, 8948, 30002, "running a batch {}", e.length),
                        this._pruneByMsgs(e))
                    }
                    ), 2e3)
                }
                ,
                this._pruneByMsgs = async e=>{
                    const t = si.a.getTimeNow();
                    this._logger.zsymb(15, 8948, 30003, "deriving {}", e.length);
                    let s = Gr.a.createFromCurrentSession().deriveTTLItems(e);
                    this._logger.zsymb(15, 8948, 30004, "ttlItems count: {}", s.length),
                    s = s.filter((e=>{
                        const s = +e.expireOn + qe.default.ttl.enable_delete_on_filter_minimum_overtime;
                        return !isNaN(s) && s < t
                    }
                    )),
                    this._logger.zsymb(15, 8948, 30005, "expired count: {}", s.length),
                    s = s.filter((e=>!this._hasPruneMsgCache(e))),
                    s.forEach((e=>{
                        this._setPruneMsgCache(e)
                    }
                    )),
                    this._logger.zsymb(15, 8948, 30006, "no cache count: {}", s.length),
                    s.length ? (this._logger.zsymb(3, 8948, 30007, "pruning {}, {}", s.length, s),
                    await this._deleteMsgsAndEmit(s)) : this._logger.zsymb(15, 8948, 30008, "no items to prune")
                }
                ,
                this._pruneMsgCache = new T.default({
                    maxSize: 1e4
                }),
                this._pruneTTLItems = async e=>{
                    const t = e.map((e=>[e.msgId, e.ttlType]));
                    this._logger.zsymb(3, 8948, 30009, "pruning {} items: {}", t.length, t),
                    await this._deleteMsgsAndEmit(e);
                    const s = await Object(Mr.b)(this._ttl.deletes, t);
                    return s.ok || this._logger.zsymb(18, 8948, 30010, "Pruner deletes ttl failed", s.error),
                    s
                }
                ,
                this._retryErrorMsgsIfNeeded = e=>{
                    for (const s of e) {
                        var t;
                        if (s.ok)
                            continue;
                        const {errorItems: e, toUid: i} = s.error;
                        this._logger.zsymb(0, 8948, 30011, "_retryErrorDelete " + i, null == e || null === (t = e[0]) || void 0 === t ? void 0 : t.msgId),
                        setTimeout((()=>{
                            Object(Mr.b)(this._deleteMsgsBelongToTTLItems, e)
                        }
                        ), 5e3)
                    }
                }
                ,
                this._retryErrorDelete = e=>setTimeout((async()=>{
                    const t = await this._ttl.getMappedMsgsByConvIdFromTTLItems(e)
                      , s = await Object(Mr.b)(this._deleteMsgsBelongToTTLItems, e);
                    !s.ok && this._logger.zsymb(18, 8948, 30012, "Pruner _retryErrorDelete", s.error),
                    s.ok && this._emitPruneResult(s.value, t)
                }
                ), 5e3),
                this._emitPruneResult = async(e,t)=>{
                    for (const s of e)
                        await Object(Mr.b)(Br.instance.emitPerConversation, s, t)
                }
                ,
                this._deletePerConversation = async function(e, t) {
                    var s, i, n, r, a, o, l, c, d;
                    void 0 === t && (t = []);
                    const h = await Object(Mr.b)(ni.b.vanishMessages, e, t);
                    if (!h.ok)
                        return {
                            ok: !1,
                            error: {
                                toUid: e,
                                allItems: [],
                                errorItems: t,
                                successItems: []
                            }
                        };
                    const u = null === (s = h.value.vanish) || void 0 === s ? void 0 : s[0]
                      , g = null === (i = h.value.quote) || void 0 === i ? void 0 : i[0];
                    if (!u && !g)
                        return {
                            ok: !1,
                            error: {
                                toUid: e,
                                conversation: {},
                                allItems: [],
                                errorItems: t,
                                successItems: []
                            }
                        };
                    const p = null === (n = h.value.vanish) || void 0 === n || null === (r = n[0]) || void 0 === r || null === (a = r.conv) || void 0 === a ? void 0 : a.conversation;
                    let m = [...null !== (o = null === (l = h.value.vanish) || void 0 === l ? void 0 : l.map((e=>e.res)).flat()) && void 0 !== o ? o : [], ...null !== (c = null === (d = h.value.quote) || void 0 === d ? void 0 : d.flat()) && void 0 !== c ? c : []];
                    m = m.filter((e=>e));
                    const {success: f=[], error: v=[]} = Object(Ar.a)(m, zr)
                      , b = f.map((e=>e.info))
                      , I = v.map((e=>e.info))
                      , y = [...b, ...I];
                    return I.length ? {
                        ok: !1,
                        error: {
                            toUid: e,
                            conversation: p,
                            allItems: y,
                            successItems: b,
                            errorItems: I
                        }
                    } : {
                        ok: !0,
                        value: {
                            toUid: e,
                            conversation: p,
                            allItems: y,
                            successItems: b
                        }
                    }
                }
                ,
                this._deleteMsgsBelongToTTLItems = async e=>{
                    const t = Object(Ar.a)(e, xr)
                      , s = Object.keys(t).map((async e=>(Object(Mr.b)(this._sideEffect, e, t[e]),
                    this._deletePerConversation(e, t[e]))));
                    return await Promise.all(s)
                }
                ,
                this._sideEffect = async function(t, s) {
                    return void 0 === s && (s = []),
                    setTimeout((async()=>{
                        const i = await Object(Mr.b)(e._cancelSendingPerConversation, t, s);
                        i.ok || e._logger.zsymb(18, 8948, 30013, "cancelSendingPerConversation failed", i.error);
                        const n = await Object(Mr.b)(e._syncDeletePerConversation, t, s);
                        n.ok || e._logger.zsymb(18, 8948, 30014, "syncDeletePerConversation failed", n.error)
                    }
                    ), 0)
                }
                ,
                this._cancelSendingPerConversation = async function(e, t) {
                    void 0 === t && (t = []),
                    t.forEach((t=>Object(Mr.b)((()=>{}
                    ), e, null == t ? void 0 : t.cliMsgId)))
                }
                ,
                this._syncDeletePerConversation = async function(e, t) {
                    if (void 0 === t && (t = []),
                    !qe.default.ttl.enable_sync_delete)
                        return;
                    const s = t=>{
                        +t.msgId && Object(wr.e)(e, {
                            cliMsgId: t.cliMsgId,
                            msgId: t.msgId,
                            sendDttm: t.sendDttm,
                            toUid: e,
                            fromUid: t.fromUid
                        })
                    }
                    ;
                    t.forEach((e=>Object(Mr.b)(s, e)))
                }
                ,
                this._pruning = !1,
                this._logger = l.ModuleContainer.resolve(P.ZLoggerFactory).createZLogger("utils", ["ttl", "destructor", "pruner"])
            }
            _getPruneMsgKey(e) {
                return e ? `${e.msgId}|${e.ttlType}` : ""
            }
            _hasPruneMsgCache(e) {
                return this._pruneMsgCache.has(this._getPruneMsgKey(e))
            }
            _setPruneMsgCache(e) {
                this._pruneMsgCache.set(this._getPruneMsgKey(e), void 0)
            }
            async _deleteMsgsAndEmit(e) {
                const t = await this._ttl.getMappedMsgsByConvIdFromTTLItems(e)
                  , s = await Object(Mr.b)(this._deleteMsgsBelongToTTLItems, e);
                s.ok || (this._logger.zsymb(18, 8948, 30015, "Pruner", "deleteMessages failed"),
                this._retryErrorDelete(e)),
                s.ok && this._retryErrorMsgsIfNeeded(s.value),
                s.ok && this._emitPruneResult(s.value, t)
            }
        }
        ) || Ur) || Ur);
        function Vr(e, t) {
            return e.reduce(((e,s,i,n)=>(e[t(s, i, n) ? 0 : 1].push(s),
            e)), [[], []])
        }
        var $r;
        const qr = v.MessageConstants.MAX_MSG_ID;
        Object(l.singleton)(Dr.a)($r = Reflect.metadata("design:type", Function)($r = Reflect.metadata("design:paramtypes", [])($r = class {
            constructor() {
                this._logger = void 0,
                this.dispose = ()=>{}
                ,
                this._safePut = async e=>{
                    const t = []
                      , s = []
                      , i = Q.a.getInstance();
                    for (const r of e)
                        try {
                            await i.MsgInfo.TTLItem.insert(r, {
                                replace: !0
                            }),
                            t.push(r)
                        } catch (n) {
                            s.push([r, n])
                        }
                    return [t, s]
                }
                ,
                this.putMsgs = async e=>{
                    let t = e.map((e=>Kr(e)));
                    const [s,i] = Vr(t, (e=>e.ok))
                      , n = s.map((e=>e.value));
                    let r = []
                      , a = [];
                    [a,r] = await this._safePut(n);
                    const o = i.map((e=>e.error));
                    return r.lastItem || o.length ? {
                        ok: !1,
                        error: {
                            invalidItems: o,
                            errorItems: r
                        }
                    } : {
                        ok: !0,
                        value: a
                    }
                }
                ,
                this.deletes = e=>Q.a.getInstance().MsgInfo.TTLItem.deleteMulti(e),
                this.getExpireItemsBefore = async(e,t)=>{
                    const s = t ? {
                        from: [t.expireOn, t.toUid, t.msgId, t.ttlType],
                        to: [e, qr, qr, Number.MAX_VALUE],
                        excludeFrom: !1,
                        excludeTo: !0
                    } : {
                        to: [e, qr, Number.MAX_VALUE],
                        excludeTo: !1
                    }
                      , i = {
                        limit: 50,
                        index: "expireOn_toUid_pk"
                    }
                      , n = Q.a.getInstance();
                    return await n.MsgInfo.TTLItem.getAll(s, i)
                }
                ,
                this.getYoungestExpiredItem = async()=>{
                    const e = {
                        to: [Number.MAX_VALUE, qr, qr, Number.MAX_VALUE],
                        excludeTo: !0
                    }
                      , t = Q.a.getInstance();
                    return (await t.MsgInfo.TTLItem.getAll(e, {
                        limit: 1,
                        index: "expireOn_toUid_pk"
                    }))[0]
                }
                ,
                this.getMappedMsgsByConvIdFromTTLItems = async e=>{
                    const t = vi.b.messageCache;
                    let s;
                    return t && (s = await t.getMappedMessagesByConvIdAsync(e)),
                    s
                }
                ,
                this._logger = l.ModuleContainer.resolve(P.ZLoggerFactory).createZLogger("utils", ["ttl", "destructor", "ttl"])
            }
        }
        ) || $r) || $r);
        const Wr = e=>"number" == typeof e ? String(e) : e
          , Hr = [Oi.a.Message, Oi.a.Quote]
          , Kr = function(e) {
            void 0 === e && (e = {});
            const t = Object(i.a)({}, e);
            return t.cliMsgId = Wr(t.cliMsgId),
            t.cliMsgId ? (t.fromUid = Wr(t.fromUid),
            t.fromUid ? (t.toUid = Wr(t.toUid),
            t.toUid ? (t.msgId = Wr(t.msgId),
            s = t.ttlType,
            Hr.includes(s) ? (t.expireOn = +t.expireOn,
            "number" != typeof t.expireOn ? {
                ok: !1,
                error: e
            } : {
                ok: !0,
                value: t
            }) : {
                ok: !1,
                error: e
            }) : {
                ok: !1,
                error: e
            }) : {
                ok: !1,
                error: e
            }) : {
                ok: !1,
                error: e
            };
            var s
        }
          , Qr = Object(l.define)("chat-box-list-controller");
        var Zr, Jr = s("Ti+8");
        Object(w.h)()(Zr = Object(w.g)()(Zr = Object(l.singleton)(Qr)(Zr = Object(l.injectable)()(Zr = function(e, t) {
            return Object(l.inject)(P.ZLoggerFactory)(e, void 0, 0)
        }(Zr = Reflect.metadata("design:type", Function)(Zr = Reflect.metadata("design:paramtypes", [void 0 === P.ZLoggerFactory ? Object : P.ZLoggerFactory])(Zr = class {
            constructor(e) {
                this.logger = void 0,
                this.handleMessageDelivered = e=>{
                    var t;
                    Ke.default.log(["message delivered", null === (t = e.payload) || void 0 === t ? void 0 : t.length])
                }
                ,
                this.logger = e.createZLogger("feat", ["chat-box-list-controller"])
            }
            onStart() {
                l.ModuleContainer.resolve(Jr.a).addEventListener(kn.MessageDelivered, this.handleMessageDelivered)
            }
            onDispose() {
                l.ModuleContainer.resolve(Jr.a).removeEventListener(kn.MessageDelivered, this.handleMessageDelivered)
            }
            openConversation(e) {
                return Promise.resolve(!0)
            }
        }
        ) || Zr) || Zr) || Zr) || Zr) || Zr) || Zr);
        var Xr, Yr = s("7nHs");
        const ea = {
            isShown: !1,
            modalTitle: "",
            guideTitle: "",
            errorCode: "",
            guideItems: [],
            showReloadBtn: !0,
            reloadBtnName: "STR_BU_CONFIRM_TEXT_4",
            showDeleteDataBtn: !0,
            deleteDataBtnName: "STR_BU_CANCEL_TEXT_4"
        };
        Object(mt.b)(Yr.a)(Xr = class {
            constructor() {
                this.name = Yr.b,
                this.key = "",
                this.state = ea
            }
            setState(e) {
                const t = Object(dr.a)(this.state, e);
                this.state !== t && (this.state = t,
                Object(Pe.g)(this.name, ""))
            }
            showModal(e) {
                this.state.isShown || this.setState((t=>Object(i.a)(Object(i.a)(Object(i.a)({}, t), e), {}, {
                    isShown: !0
                })))
            }
            closeModal() {
                this.state.isShown && this.setState((e=>Object(i.a)(Object(i.a)(Object(i.a)({}, e), ea), {}, {
                    isShown: !1
                })))
            }
            init(e) {}
            getItem(e, t) {
                return this.state
            }
            getList(e, t) {
                return []
            }
            onGetItemFailure(e, t) {
                throw new Error("Method not implemented.")
            }
            onGetListFailure(e, t) {
                throw new Error("Method not implemented.")
            }
        }
        );
        var ta, sa = s("Mf7h"), ia = s("8c0e");
        const na = new Ke.LocalId;
        Object(l.injectable)()(ta = Object(l.singleton)(ia.a)(ta = class {
            constructor() {
                this._linkPreviewDatas = new Map,
                this._lastCheckLinks = new Map,
                this._listeners = new Map
            }
            addListenerAtConv(e, t) {
                if (e && "function" == typeof t) {
                    const s = this._listeners.get(e);
                    this._listeners.set(e, [...s || [], t])
                }
            }
            removeListenerAtConv(e, t) {
                let s = this._listeners.get(e);
                s && s.length > 0 && (s = s.filter((e=>e !== t)),
                this._listeners.set(e, s))
            }
            removeAllListenerAtConv(e) {
                this._listeners.delete(e)
            }
            setLastCheckLinkByConvId(e, t) {
                this._lastCheckLinks.set(e, t)
            }
            isLastCheckLinkOfConv(e, t) {
                const s = this._lastCheckLinks.get(e);
                return !!s && s === t
            }
            getLinkPreviewDataByConvId(e) {
                return this._linkPreviewDatas.get(e) || null
            }
            addLinkDataToConv(e, t) {
                const s = this._prepareLinkPreviewData(e, t);
                this._linkPreviewDatas.set(e, Object(i.a)({}, s));
                const n = {
                    action: Je.LinkPreviewActions.NEW_LINK_PREVIEW,
                    payload: {
                        newLinkPreviewData: Object(i.a)({}, s)
                    }
                };
                this._notifyLinkPreviewDataChangeToConv(e, n),
                sa.a.emit(Je.LinkPreviewActions.NEW_LINK_PREVIEW, {
                    newLinkPreviewData: Object(i.a)({}, s)
                })
            }
            createLoadingLinkPreview(e, t) {
                const s = {
                    id: na.next(),
                    convId: e,
                    content: {
                        title: Dt.default.str("STR_GETTING_LINK_INFO"),
                        src: t,
                        desc: "",
                        thumb: "",
                        loading: !0
                    },
                    link: t,
                    shouldParseLinkOrContact: !0
                };
                e && this._linkPreviewDatas.set(e, Object(i.a)({}, s));
                const n = {
                    action: Je.LinkPreviewActions.NEW_LINK_PREVIEW,
                    payload: {
                        newLinkPreviewData: Object(i.a)({}, s)
                    }
                };
                this._notifyLinkPreviewDataChangeToConv(e, n),
                sa.a.emit(Je.LinkPreviewActions.NEW_LINK_PREVIEW, {
                    newLinkPreviewData: Object(i.a)({}, s)
                })
            }
            removeLinkPreviewData(e) {
                if (!e)
                    return;
                this._linkPreviewDatas.delete(e);
                const t = {
                    action: Je.LinkPreviewActions.HIDE_LINK_PREVIEW,
                    payload: null
                };
                this._notifyLinkPreviewDataChangeToConv(e, t),
                sa.a.emit(Je.LinkPreviewActions.HIDE_LINK_PREVIEW, null)
            }
            _notifyLinkPreviewDataChangeToConv(e, t) {
                const s = this._listeners.get(e);
                null == s || s.forEach((e=>{
                    "function" == typeof e && e({
                        action: t.action,
                        payload: t.payload
                    })
                }
                ))
            }
            _prepareLinkPreviewData(e, t) {
                return {
                    id: na.next(),
                    convId: e,
                    link: t.link,
                    content: t.content,
                    shouldParseLinkOrContact: !1
                }
            }
        }
        ) || ta);
        var ra, aa = s("iy3m"), oa = s("twqL");
        Object(w.h)()(ra = Object(l.singleton)(oa.a)(ra = Reflect.metadata("design:type", Function)(ra = Reflect.metadata("design:paramtypes", [])(ra = class {
            constructor() {
                this.changeTimeFlushNotiReactWhenResumeApp = this.changeTimeFlushNotiReactWhenResumeApp.bind(this),
                this.changeTimeFlushNotiReactWhenDisNetwork = this.changeTimeFlushNotiReactWhenDisNetwork.bind(this),
                this.changeTimeFlushNotiReactWhenStartApp = this.changeTimeFlushNotiReactWhenStartApp.bind(this)
            }
            onStart(e) {
                this.changeTimeFlushNotiReactWhenStartApp()
            }
            changeTimeFlushNotiReactWhenResumeApp() {
                this.changeTimeFlushNotiReact(Object(aa.d)())
            }
            setupTimer(e) {
                Li.a.TimeFlushNotiReact = e,
                Li.a.TimeMaxWaiting = Object(aa.a)(),
                Li.a.setupIntervalToFlushNotiReact(),
                Li.a.setupTimeoutToGoBackNormalCondition()
            }
            changeTimeFlushNotiReactWhenDisNetwork(e) {
                if (e === Yi.a.CONNECTED) {
                    const e = Yi.b.getPreStateNetwork();
                    e !== Yi.a.CONNECTED && e !== Yi.a.NOT_SET && this.changeTimeFlushNotiReact(Object(aa.b)())
                }
            }
            changeTimeFlushNotiReactWhenStartApp() {
                this.changeTimeFlushNotiReact(Object(aa.e)())
            }
            changeTimeFlushNotiReact(e) {
                Li.a.notiReactTimeoutId ? (Li.a.TimeFlushNotiReact !== e && (Li.a.TimeFlushNotiReact = e,
                Li.a.setupIntervalToFlushNotiReact()),
                Li.a.TimeMaxWaiting !== Object(aa.a)() && (Li.a.TimeMaxWaiting = Object(aa.a)(),
                Li.a.setupTimeoutToGoBackNormalCondition())) : this.setupTimer(e)
            }
        }
        ) || ra) || ra) || ra);
        var la, ca = s("K0f4"), da = s("buT3"), ha = s("wudS");
        Object(w.h)()(la = Object(w.e)()(la = class {
            onAuthenticated(e) {
                const {userId: t} = e.getSession();
                if (t) {
                    const e = Object(ha.b)(t)
                      , s = `${e}_${ca.m}`
                      , i = da.a.getItem(s);
                    if (!(null !== i))
                        return;
                    const n = 97124
                      , r = "1" === i
                      , a = `${e}_${ca.g}`
                      , o = +(da.a.getItem(a) || "-1")
                      , l = isNaN(o) ? -1 : o
                      , c = `${e}_${ca.i}`
                      , d = +(da.a.getItem(c) || "-1")
                      , h = isNaN(d) ? -1 : d;
                    if (r)
                        O.default.increaseSuccess(n, 0, l, [h]);
                    else {
                        const t = `${e}_${ca.c}`
                          , s = da.a.getItem(t)
                          , i = Number(s);
                        O.default.increaseFailed(n, 0, l, i, Date.now(), [h])
                    }
                    da.a.removeItem(s),
                    da.a.removeItem(a),
                    da.a.removeItem(c)
                }
            }
            onStart() {
                const e = ca.l
                  , t = da.a.getItem(e);
                if (!(null !== t))
                    return;
                const s = "1" === t
                  , i = ca.f
                  , n = +(da.a.getItem(i) || "-1")
                  , r = isNaN(n) ? -1 : n
                  , a = ca.h
                  , o = +(da.a.getItem(a) || "-1")
                  , l = isNaN(o) ? -1 : o;
                if (s)
                    O.default.increaseSuccess(97123, 0, r, [l]);
                else {
                    const e = da.a.getItem(ca.b)
                      , t = Number(e);
                    O.default.increaseFailed(97123, 0, r, t, Date.now(), [l])
                }
                da.a.removeItem(e),
                da.a.removeItem(i),
                da.a.removeItem(a)
            }
        }
        ) || la);
        var ua, ga = s("l9L4"), pa = s("CDcE");
        Object(w.d)()(ua = Object(l.injectable)()(ua = Object(l.singleton)(ga.a)(ua = function(e, t) {
            return Object(l.inject)(P.ZLoggerFactory)(e, void 0, 0)
        }(ua = Reflect.metadata("design:type", Function)(ua = Reflect.metadata("design:paramtypes", [void 0 === P.ZLoggerFactory ? Object : P.ZLoggerFactory])(ua = class {
            constructor(e) {
                this._isFirstLoginMap = new Map,
                this._firstLoginTimeMap = new Map,
                this._logger = void 0,
                this._logger = e.createZLogger("utils", ["first-login-checker"])
            }
            getFirstLoginTime(e) {
                if (this.firstLoginTimeMap.has(e))
                    return this.firstLoginTimeMap.get(e) || this.getDefaultFirstLoginTime();
                try {
                    const t = u.a.getInstance().getItemForCurrentUser(v.FirstLoginLocalStorageKeys.FIRST_LOGIN_TIME);
                    null != t && this.firstLoginTimeMap.set(e, parseInt(t))
                } catch (t) {
                    this.logger.zsymb(21, 8183, 3e4, "getFirstLoginTime error {} - {}", e, Object(pa.f)(t, 2))
                }
                return this.firstLoginTimeMap.get(e) || this.getDefaultFirstLoginTime()
            }
            isFirstLogin(e) {
                return !!this._isFirstLoginMap.get(e)
            }
            onApplicationReady(e) {
                this.removeFirstLoginFlag()
            }
            setFirstLogin(e, t) {
                this._isFirstLoginMap.set(e, t)
            }
            setFirstLoginTime(e, t) {
                this.firstLoginTimeMap.set(e, t);
                try {
                    u.a.getInstance().setItemForCurrentUser(v.FirstLoginLocalStorageKeys.FIRST_LOGIN_TIME, t && t.toString() || "")
                } catch (s) {
                    this.logger.zsymb(21, 8183, 30001, "setFirstLoginTime error {} - {} - {}", e, t, Object(pa.f)(s, 2))
                }
            }
            removeFirstLoginFlag() {
                const e = rt.default.getUidMe()
                  , t = u.a.getInstance();
                t.getItem(v.FirstLoginLocalStorageKeys.IS_FIRST_LOGIN) === e && t.removeItem(v.FirstLoginLocalStorageKeys.IS_FIRST_LOGIN)
            }
            getDefaultFirstLoginTime() {
                return si.a.getTimeNow()
            }
            get firstLoginTimeMap() {
                return this._firstLoginTimeMap
            }
            get logger() {
                return this._logger
            }
        }
        ) || ua) || ua) || ua) || ua) || ua);
        const ma = Object(l.define)("transfer-data-suggestion-loader");
        var fa = s("cgeJ")
          , va = s("XVri")
          , ba = s("bAqL");
        var Ia = class {
            constructor(e) {
                this._logger = void 0,
                this._moduleName = void 0,
                this._moduleName = e
            }
            log() {
                this.Logger.zsymb(0, 8218, 3e4, this.moduleTagName, ...arguments)
            }
            logError(e, t) {
                const s = null == t ? "" : this.stringifyDepthLevel(t);
                this.Logger.zsymb(18, 8218, 30001, this.moduleTagName, e, s)
            }
            stringifyDepthLevel(e) {
                return Object(ba.g)(e, Object(ba.c)())
            }
            get Logger() {
                return this._logger || (this._logger = l.ModuleContainer.resolve(P.ZLoggerFactory).createZLogger("msg-sync", [va.a])),
                this._logger
            }
            get moduleTagName() {
                return this._moduleName + " - "
            }
        }
        ;
        var ya, Ca = class {
            constructor(e) {
                this.moduleName = e,
                this._logger = void 0,
                this._logger = new Ia(this.moduleName)
            }
            get Logger() {
                return this._logger
            }
        }
        ;
        function Sa(e) {
            try {
                return JSON.stringify(e)
            } catch (t) {
                return ""
            }
        }
        function Ea(e) {
            return JSON.parse(e)
        }
        Object(l.injectable)()(ya = Object(l.singleton)(ma)(ya = Reflect.metadata("design:type", Function)(ya = Reflect.metadata("design:paramtypes", [])(ya = class extends Ca {
            constructor() {
                super(fa.d.LOADER),
                this._friendManager = void 0,
                this._groupManager = void 0
            }
            async loadLastCloseBannerDownloadPC() {
                const e = this.getSecureLocalStorageDB();
                if (!e)
                    return this.Logger.logError("Load last close banner download pc failed cause invalid storage"),
                    Promise.reject();
                try {
                    const t = await e.getItemForCurrentUserAsync(fa.b);
                    return null != t ? Ea(t) : (this.Logger.logError("Load last close banner download pc failed null"),
                    null)
                } catch (t) {
                    return this.Logger.logError("Load last close banner download pc failed", t),
                    t
                }
            }
            async loadListConversationsFromDB() {
                const e = this.getSecureLocalStorageDB();
                if (!e)
                    return this.Logger.logError("Load list conversations from DB failed cause invalid storage"),
                    Promise.reject([]);
                try {
                    const t = await e.getItemForCurrentUserAsync(fa.c);
                    return null != t ? Ea(t) : (this.Logger.logError("Load list conversations from DB failed null"),
                    [])
                } catch (t) {
                    return this.Logger.logError("Load list conversations from DB failed", t),
                    []
                }
            }
            async loadListFriends() {
                const e = this.getFriendManagerModule();
                if (e)
                    try {
                        return await e.getFriends()
                    } catch (t) {
                        return this.Logger.logError("Load list friends failed", t),
                        []
                    }
                return this.Logger.log("Load list friends empty"),
                []
            }
            async loadListGroups() {
                const e = this.getGroupManagerModule();
                if (e)
                    try {
                        return await e.getGroupsList()
                    } catch (t) {
                        return this.Logger.logError("Load list groups failed", t),
                        []
                    }
                return this.Logger.log("Load list groups empty"),
                []
            }
            async loadRegisteredData() {
                const e = this.getSecureLocalStorageDB();
                if (!e)
                    return this.Logger.logError("Load registered data failed cause invalid storage"),
                    Promise.reject();
                try {
                    let t = e.getItemForCurrentUser(v.RegisterLocalStorageKeys.IS_REGISTERED_ON_THIS_DEVICE);
                    return null != t ? {
                        isRegisteredOnThisDevice: Ea(t)
                    } : (this.Logger.log("Load registered data null"),
                    null)
                } catch (t) {
                    return this.Logger.logError("Load registered data failed", t),
                    t
                }
            }
            async loadSyncMessagesData() {
                const e = this.getSecureLocalStorageDB();
                if (!e)
                    return this.Logger.logError("Load sync messages data failed cause invalid storage"),
                    Promise.reject();
                try {
                    const t = e.getItemForCurrentUser("sync_cross_settings");
                    return t ? Ea(t) : (this.Logger.log("Load sync messages data null"),
                    null)
                } catch (t) {
                    return this.Logger.logError("Load sync messages data failed", t),
                    t
                }
            }
            async loadTransferMessagesData() {
                const e = this.getSecureLocalStorageDB();
                if (!e)
                    return this.Logger.logError("Load transfer messages data failed cause invalid storage"),
                    Promise.reject();
                try {
                    const t = await e.getItemForCurrentUserAsync(fa.k);
                    return t ? Ea(t) : (this.Logger.logError("Load transfer messages data failed null"),
                    null)
                } catch (t) {
                    return this.Logger.logError("Load transfer messages data failed", t),
                    t
                }
            }
            async setLastCloseBannerDownloadPC(e) {
                const t = this.getSecureLocalStorageDB();
                return t ? await t.setItemForCurrentUserAsync(fa.b, Sa(e)) : Promise.reject("Invalid storage")
            }
            async setListConversationsFirstLoginToDB(e) {
                const t = this.getSecureLocalStorageDB();
                return t ? await t.setItemForCurrentUserAsync(fa.c, Sa(e)) : Promise.reject("Invalid storage")
            }
            async updateTransferMessagesData(e) {
                const t = {
                    lastTransferSuccessTime: e.lastTransferSuccessTime || Date.now()
                };
                try {
                    return await this.getSecureLocalStorageDB().setItemForCurrentUserAsync(fa.k, Sa(t))
                } catch (s) {
                    return s
                }
            }
            getFriendManagerModule() {
                var e;
                this._friendManager || (this._friendManager = null === (e = s("UiPd")) || void 0 === e ? void 0 : e.default);
                return this._friendManager
            }
            getGroupManagerModule() {
                var e;
                this._groupManager || (this._groupManager = null === (e = s("Gm1y")) || void 0 === e ? void 0 : e.default);
                return this._groupManager
            }
            getSecureLocalStorageDB() {
                return u.a.getInstance()
            }
        }
        ) || ya) || ya) || ya);
        var _a = s("n09q")
          , Ta = s("31cx")
          , La = s("a1r1")
          , Oa = s("BO4k");
        var Fa, Ra = class extends Ca {
            constructor(e, t) {
                super(va.c.MANAGER),
                this._eventMap = new Map,
                this._fistLoginTime = void 0,
                this._listConversationsBeforeLogin = [],
                this._moduleLoader = void 0,
                this._moduleUIManager = void 0,
                this._moduleLoader = e,
                this._moduleUIManager = t,
                this.handleUpdateConfigs = this.handleUpdateConfigs.bind(this),
                this.isDisplayedBannerDownloadPCSuggestion = this.isDisplayedBannerDownloadPCSuggestion.bind(this),
                this.isDisplayedBubbleInfoEcard = this.isDisplayedBubbleInfoEcard.bind(this),
                this.isDisplayedCloseButtonBannerDownloadPC = this.isDisplayedCloseButtonBannerDownloadPC.bind(this),
                this.isDisplayedConversationFooter = this.isDisplayedConversationFooter.bind(this),
                this.isDisplayedGlobalSearchFooter = this.isDisplayedGlobalSearchFooter.bind(this),
                this.isDisplayedSearchInConversationFooter = this.isDisplayedSearchInConversationFooter.bind(this),
                this.isDisplayedMilestoneInPreviewMedia = this.isDisplayedMilestoneInPreviewMedia.bind(this),
                this.isDisplayedSuggestionInMediaList = this.isDisplayedSuggestionInMediaList.bind(this),
                this.isDisplayedTransferModal = this.isDisplayedTransferModal.bind(this),
                this.isValidForTransferMessages = this.isValidForTransferMessages.bind(this)
            }
            addEventListeners(e, t) {
                this.eventMap.set(e, [...this.eventMap.get(e) || [], t])
            }
            callTransferMessages(e) {}
            closeBannerDownloadPCSuggestion() {}
            getConversationFooterRendererHeight() {
                return this.isDisplayedConversationFooter() ? va.b.CONVERSATION : 0
            }
            getFirstLoginTime() {
                return this.firstLoginTime
            }
            getGlobalSearchFooterRendererHeight() {
                return this.isDisplayedConversationFooter() ? va.b.GLOBAL_SEARCH : 0
            }
            getLogger() {
                return this.Logger
            }
            getUrlDownloadPC() {
                return ""
            }
            hasConversationBeforeFirstLogin(e) {
                return this._listConversationsBeforeLogin.includes(e)
            }
            hideTransferMessagesModal() {}
            async initialize() {
                this.firstLoginTime = l.ModuleContainer.resolve(La.a).getFirstLoginTime(this.getUserId()),
                this.handleUpdateConfigs(Oa.a()),
                this.registerSubscriptions(),
                await this.initializeListConversationsBeforeFirstLogin()
            }
            isDisplayedBannerDownloadPCSuggestion() {
                return !!this.isEnabledFeature() && Oa.g()
            }
            isDisplayedBubbleInfoEcard(e) {
                return !!this.isEnabledFeature() && (!!Oa.h() && this.hasConversationBeforeFirstLogin(e))
            }
            isDisplayedCloseButtonBannerDownloadPC() {
                return !!this.isEnabledFeature() && Oa.k()
            }
            isDisplayedConversationFooter() {
                return !!this.isEnabledFeature() && Oa.l()
            }
            isDisplayedCTADownloadPC() {
                return !!this.isEnabledFeature() && Oa.i()
            }
            isDisplayedCTATransferMessages() {
                return !!this.isEnabledFeature() && Oa.j()
            }
            isDisplayedGlobalSearchFooter() {
                return !!this.isEnabledFeature() && Oa.m()
            }
            isDisplayedSearchInConversationFooter(e) {
                return !!this.isEnabledFeature() && (!!Oa.p() && this.hasConversationBeforeFirstLogin(e))
            }
            isDisplayedMilestoneInPreviewMedia(e) {
                return !!this.isEnabledFeature() && (!!Oa.o() && this.hasConversationBeforeFirstLogin(e))
            }
            isDisplayedSuggestionInMediaList(e) {
                return !!this.isEnabledFeature() && (!!Oa.n() && this.hasConversationBeforeFirstLogin(e))
            }
            isDisplayedTransferModal() {
                return !!this.isEnabledFeature() && Oa.q()
            }
            isEnabledFeature() {
                return Oa.r()
            }
            isValidSupportDownloadPC() {
                return !1
            }
            isValidForTransferMessages() {
                return this.isEnabledFeature()
            }
            needTransferMessages() {}
            removeEventListeners(e, t) {
                const s = this.eventMap.get(e);
                if (Array.isArray(s)) {
                    const e = s.findIndex((e=>e === t));
                    -1 !== e && s.splice(e, 1)
                }
            }
            setFirstLoginTime(e) {
                this.firstLoginTime = e
            }
            shouldTransferMessages() {
                return !1
            }
            showTransferMessagesModal() {}
            registerSubscriptions() {
                qe.$AppConfig.subscribe(this.handleUpdateConfigs)
            }
            isFirstLogin() {
                return l.ModuleContainer.resolve(La.a).isFirstLogin(this.getUserId())
            }
            async initializeListConversationsBeforeFirstLogin() {
                this._listConversationsBeforeLogin = await this.loadListConversationsBeforeFirstLogin()
            }
            handleUpdateConfigs(e) {
                void 0 === e && (e = {});
                const {data_content: t} = Oa.b(e)
                  , {first_time_login_device: s} = e;
                t && this.UIManager.updateDataContent(Object(Ta.a)(t)),
                null != s && (this.firstLoginTime = s)
            }
            async loadListConversations() {
                const e = []
                  , t = await this.loaderModule.loadListFriends();
                Array.isArray(t) && t.forEach((t=>{
                    e.push(t.userId)
                }
                ));
                const s = await this.loaderModule.loadListGroups();
                return Array.isArray(s) && s.forEach((t=>{
                    e.push(t.userId)
                }
                )),
                e
            }
            async loadListConversationsBeforeFirstLogin() {
                let e;
                if (this.isFirstLogin())
                    e = await this.loadListConversations(),
                    this.loaderModule.setListConversationsFirstLoginToDB(e);
                else {
                    const t = await this.loaderModule.loadListConversationsFromDB();
                    e = t,
                    (t || []).length || (e = await this.loadListConversations(),
                    this.loaderModule.setListConversationsFirstLoginToDB(e))
                }
                return e
            }
            notifyEvent(e) {
                for (var t = arguments.length, s = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
                    s[i - 1] = arguments[i];
                const n = this.eventMap.get(e);
                Array.isArray(n) && n.forEach((e=>Promise.resolve((()=>e(...s)))))
            }
            get firstLoginTime() {
                return this._fistLoginTime
            }
            set firstLoginTime(e) {
                this._fistLoginTime = e
            }
            get eventMap() {
                return this._eventMap
            }
            get loaderModule() {
                return this._moduleLoader
            }
            get UIManager() {
                return this._moduleUIManager
            }
            getUserId() {
                const e = l.ModuleContainer.resolve(w.a)
                  , {userId: t} = e.getSession() || {};
                return t || ""
            }
        }
        , wa = s("mgoj"), Ma = s("JCvM");
        Object(l.injectable)()(Fa = Object(w.d)()(Fa = Object(l.singleton)(_a.a)(Fa = function(e, t) {
            return Object(l.inject)(ma)(e, void 0, 0)
        }(Fa = function(e, t) {
            return Object(l.inject)(wa.a)(e, void 0, 1)
        }(Fa = Reflect.metadata("design:type", Function)(Fa = Reflect.metadata("design:paramtypes", [Object, void 0 === Ma.ITransferDataSuggestionUIManager ? Object : Ma.ITransferDataSuggestionUIManager])(Fa = class extends Ra {
            constructor(e, t) {
                super(e, t),
                this._lastCloseBannerTimestamp = 0,
                this.handleBeforeUnload = this.handleBeforeUnload.bind(this)
            }
            closeBannerDownloadPCSuggestion() {
                const e = si.a.getTimeNow();
                this.lastCloseBannerTimestamp = e,
                this.UIManager.closeBannerDownloadPCSuggestion(),
                this.loaderModule.setLastCloseBannerDownloadPC(e)
            }
            getUrlDownloadPC() {
                return Object(Oa.f)()
            }
            async initialize() {
                await super.initialize(),
                await this.loadLastCloseBannerTimestamp()
            }
            isDisplayedBannerDownloadPCSuggestion() {
                if (!super.isDisplayedBannerDownloadPCSuggestion())
                    return !1;
                if (!this.isValidSupportDownloadPC())
                    return !1;
                const e = Object(Oa.e)();
                return this.lastCloseBannerTimestamp + e <= si.a.getTimeNow()
            }
            isValidSupportDownloadPC() {
                const e = Object(ba.d)().toLowerCase();
                return null != Object(Oa.d)().find((t=>e.indexOf(t) > -1))
            }
            isValidForTransferMessages() {
                return !1
            }
            onApplicationReady(e) {
                this.isDisplayedBannerDownloadPCSuggestion() && ba.a.logAction(ba.a.BannerDownloadPC.DISPLAYED),
                this.isEnabledFeature() && ba.a.logAction(ba.a.Common.DISPLAYED_NOT_ENOUGH_DATA_MESSAGE)
            }
            handleBeforeUnload() {
                this.logActionBeforeUnload()
            }
            async loadLastCloseBannerTimestamp() {
                try {
                    const e = await this.loaderModule.loadLastCloseBannerDownloadPC();
                    e && (this.lastCloseBannerTimestamp = e)
                } catch (e) {}
            }
            logActionBeforeUnload() {
                const e = Object(ba.b)();
                ba.a.logActionInfo(e, !0)
            }
            registerSubscriptions() {
                super.registerSubscriptions(),
                l.ModuleContainer.resolve(w.a).addEventListenerOnce(w.b.BeforeUnload, this.handleBeforeUnload)
            }
            get lastCloseBannerTimestamp() {
                return this._lastCloseBannerTimestamp
            }
            set lastCloseBannerTimestamp(e) {
                this._lastCloseBannerTimestamp = e
            }
        }
        ) || Fa) || Fa) || Fa) || Fa) || Fa) || Fa);
        var Da, Aa = class extends Ca {
            constructor() {
                super(va.c.UI),
                this.key = Ma.c,
                this.name = Ma.c,
                this.dataState = Object(i.a)({}, va.f),
                this.UIState = Object(i.a)({}, va.g)
            }
            closeBannerDownloadPCSuggestion() {}
            hideTransferMessagesModal() {}
            init(e) {}
            initialize() {
                const {data_content: e} = Object(Oa.b)(Object(Oa.a)());
                this.handleUpdateContent(e)
            }
            getItem(e, t) {
                return e.key === va.e ? this.dataState : e.key === va.h ? this.UIState : {}
            }
            getList(e, t) {
                return []
            }
            turnOffDisplayingEntryPoints() {
                this.handleUpdateRenderer({
                    isDisplayedEntryPoints: !1
                })
            }
            onGetItemFailure(e, t) {}
            onGetListFailure(e, t) {}
            showTransferMessagesModal() {}
            updateDataContent(e) {
                this.handleUpdateContent(e)
            }
            setDataState(e) {
                const t = Object(dr.a)(this.dataState, e);
                this.dataState !== t && (this.dataState = t,
                Object(Pe.g)(this.name, va.e))
            }
            setUIState(e) {
                const t = Object(dr.a)(this.UIState, e);
                this.UIState !== t && (this.UIState = t,
                Object(Pe.g)(this.name, va.h))
            }
            handleUpdateContent(e) {
                this.setDataState((t=>{
                    t.version = e.version,
                    t.content = e.content
                }
                ))
            }
            handleUpdateRenderer(e) {
                this.setUIState((t=>{
                    for (const s in e)
                        t[s] = e[s]
                }
                ))
            }
        }
        ;
        Object(mt.b)(Ma.b)(Da = class extends Aa {
            closeBannerDownloadPCSuggestion() {
                this.setUIState((e=>{
                    e[fa.j.BANNER_DOWNLOAD].isDisplayed = !1
                }
                ))
            }
            getItem(e, t) {
                const s = super.getItem(e, t);
                if (!s)
                    return;
                let i = {};
                if (e.key === fa.f) {
                    const {content: e={}} = s;
                    for (const t in e) {
                        const s = e[t];
                        if (s)
                            for (const e in s) {
                                var n;
                                i[t] || (i[t] = {}),
                                i[t][e] = null === (n = s[e]) || void 0 === n ? void 0 : n.web
                            }
                    }
                } else
                    i = s;
                return i
            }
        }
        );
        var Pa = Object(l.define)("forward-message")
          , ja = s("oAAg");
        ja.Pool;
        var Na, Ba, Ua, ka, Ga, xa = Object(l.define)("forward-message-pool");
        Na = Object(l.singleton)(Pa),
        Ba = function(e, t) {
            return Object(l.inject)(xa)(e, void 0, 0)
        }
        ,
        Ua = Reflect.metadata("design:type", Function),
        ka = Reflect.metadata("design:paramtypes", [Object]),
        Object(l.injectable)(Ga = Na(Ga = Ba(Ga = Ua(Ga = ka(Ga = class {
            constructor(e) {
                this._pool = void 0,
                this.pool = e
            }
            forward(e, t) {
                const s = this.buildTask();
                this.pool.use(s)
            }
            buildTask() {
                return async()=>{}
            }
            get pool() {
                return this._pool
            }
            set pool(e) {
                this._pool = e
            }
        }
        ) || Ga) || Ga) || Ga) || Ga);
        var za = Object(l.define)("pin-topic-message-loader");
        var Va = Object(l.define)("pin-topic-storage")
          , $a = Va
          , qa = s("UIHX")
          , Wa = s("0URt")
          , Ha = s("DRpF");
        function Ka(e) {
            return !(-1 === Object(Wa.f)().indexOf(e.msgType)) && !Object(Ha.a)(e)
        }
        var Qa = s("3ZdV");
        var Za = s("YYsv");
        function Ja(e, t, s) {
            return s === e ? 1 : s < t ? 0 : -1
        }
        function Xa(e) {
            const t = {
                needFetch: !1,
                reason: ""
            };
            if (null == e || null == e || !e.lastFetch)
                return t.needFetch = !0,
                t.reason = "empty",
                t;
            const {lastFetch: s} = e
              , i = function(e) {
                return vr.a.isOverflowAtTime(e)
            }(s);
            if (i)
                return t.needFetch = !0,
                t.reason = "overflow",
                t;
            const n = function(e) {
                return Date.now() - e > Object(Qa.e)()
            }(s);
            if (n)
                return t.needFetch = !0,
                t.reason = "expired",
                t;
            const r = function(e) {
                const t = u.a.getInstance().getItemForCurrentUser(Za.d.FORCE_FETCH_MILESTONE);
                return !(!t || isNaN(+t)) && e < +t
            }(s);
            return r ? (t.needFetch = !0,
            t.reason = "forcedByServer",
            t) : t
        }
        function Ya(e) {
            const t = [];
            return e.forEach((e=>{
                t.push({
                    topicId: e.id,
                    topicType: e.type
                })
            }
            )),
            t
        }
        function eo(e) {
            var t;
            return (null === (t = e.params) || void 0 === t ? void 0 : t.client_msg_id) || ""
        }
        function to(e) {
            var t;
            return (null === (t = e.params) || void 0 === t ? void 0 : t.global_msg_id) || ""
        }
        function so(e, t, s) {
            let i = t;
            const {topics: n} = s;
            if (!Array.isArray(n))
                return i;
            switch (e) {
            case qa.a.ADD:
                {
                    const {index: e} = s;
                    i = null == e ? [...n, ...t] : [...t.slice(0, e), ...n, ...t.slice(e)];
                    break
                }
            case qa.a.REMOVE:
                {
                    const e = {};
                    n.forEach((t=>{
                        e[t.id] = t.type
                    }
                    )),
                    i = [],
                    t.forEach((t=>{
                        (!e.hasOwnProperty(t.id) || e.hasOwnProperty(t.id) && e[t.id] !== t.type) && i.push(t)
                    }
                    ));
                    break
                }
            }
            return i
        }
        function io(e) {
            const t = e=>{
                if (!Array.isArray(e))
                    return e;
                const t = [];
                for (let s = 0; s < e.length; s++) {
                    const i = e[s];
                    i && (null != i.id && (i.id = i.id.toString()),
                    null != i.topicId && (i.topicId = i.topicId.toString()),
                    null != i.type && (i.type = parseInt(i.type)),
                    null != i.topicType && (i.topicType = parseInt(i.topicType)),
                    t.push(i))
                }
                return t
            }
              , s = Object(i.a)({}, e);
            return null != s.oldTopic && (s.oldTopic = t([s.oldTopic])[0]),
            null != s.topic && (s.topic = t([s.topic])[0]),
            null != s.topics && (s.topics = t(s.topics)),
            s
        }
        function no(e) {
            let t = {};
            if (!e.params)
                return e;
            try {
                t = JSON.parse(e.params)
            } catch (s) {
                return
            }
            if (t.extra && t.extra.constructor === String)
                try {
                    t.extra = JSON.parse(t.extra)
                } catch (s) {
                    return
                }
            return e.params = t,
            e
        }
        var ro, ao = function() {
            const e = {};
            return {
                clear: ()=>{
                    for (const t in e)
                        delete e[t]
                }
                ,
                get: t=>e[t],
                getCache: ()=>e,
                set: (t,s)=>{
                    e[t] = s
                }
                ,
                has: t=>e.hasOwnProperty(t),
                remove: t=>{
                    delete e[t]
                }
            }
        };
        var oo = Object(l.injectable)()(ro = function(e, t) {
            return Object(l.inject)($a)(e, void 0, 0)
        }(ro = Reflect.metadata("design:type", Function)(ro = Reflect.metadata("design:paramtypes", [Object])(ro = class {
            constructor(e) {
                this.storage = e,
                this.clientMsgCache = void 0,
                this.globalMsgCache = void 0,
                this.globalMsgCache = ao(),
                this.clientMsgCache = ao()
            }
            clear(e) {
                switch (e) {
                case qa.f.GLOBAL:
                    return void this.globalMsgCache.clear();
                case qa.f.CLIENT:
                    return void this.clientMsgCache.clear();
                default:
                    return this.globalMsgCache.clear(),
                    void this.clientMsgCache.clear()
                }
            }
            loadMessages(e) {
                return new Promise(((t,s)=>{
                    e && 0 !== e.length || s("Invalid topics");
                    const i = e.length;
                    for (let n = 0; n < i; n++) {
                        const t = e[n];
                        if (!t)
                            continue;
                        let i = to(t);
                        if (i && "0" !== i)
                            this.getMessage(qa.f.GLOBAL, i).then().catch((e=>{
                                s(e)
                            }
                            ));
                        else {
                            let e = eo(t);
                            if (e) {
                                let i = t.params && t.params.senderUid;
                                this.getMessage(qa.f.CLIENT, e, {
                                    userId: i
                                }).then().catch((e=>{
                                    s(e)
                                }
                                ))
                            }
                        }
                    }
                    t()
                }
                ))
            }
            getMessageFromTopic(e) {
                if (e.type !== qa.h.MESSAGE || !e.params)
                    return {};
                let t = to(e);
                if (this.globalMsgCache && this.globalMsgCache.has(t))
                    return this.globalMsgCache.get(t) || {};
                let s = eo(e);
                return this.clientMsgCache && this.clientMsgCache.has(s) && this.clientMsgCache.get(s) || {}
            }
            removeMessages(e) {
                Array.isArray(e) && e.forEach((e=>{
                    const t = to(e)
                      , s = eo(e);
                    this.globalMsgCache.remove(t),
                    this.clientMsgCache.remove(s)
                }
                ))
            }
            getMessage(e, t, s) {
                void 0 === s && (s = {});
                return new Promise(((i,n)=>{
                    switch (e) {
                    case qa.f.GLOBAL:
                        {
                            let s = this.globalMsgCache.get(t);
                            s ? i(s) : this.storage.getMessagesByIds([t]).then((s=>{
                                s ? (this.setMessage(e, t, s),
                                i(s)) : n("Not found")
                            }
                            )).catch((e=>{
                                n(e)
                            }
                            ));
                            break
                        }
                    case qa.f.CLIENT:
                        {
                            const {userId: r} = s;
                            let a = this.clientMsgCache.get(t);
                            a ? i(a) : this.storage.getMessageByCliMsgId(t, {
                                myUID: rt.default.getUidMe(),
                                userId: r
                            }).then((s=>{
                                s ? (this.setMessage(e, t, s),
                                i(s)) : n("Not found")
                            }
                            )).catch((e=>{
                                n(e)
                            }
                            ));
                            break
                        }
                    default:
                        n("Unknown")
                    }
                }
                ))
            }
            setMessage(e, t, s) {
                switch (e) {
                case qa.f.GLOBAL:
                    return void this.globalMsgCache.set(t, s);
                case qa.f.CLIENT:
                    return void this.clientMsgCache.set(t, s);
                default:
                    return
                }
            }
        }
        ) || ro) || ro) || ro) || ro;
        l.ModuleContainer.register(za, oo);
        var lo = Object(l.define)("pin-topic-data-repository")
          , co = s("ZsEe");
        var ho = function() {
            const e = {}
              , t = t=>e[t] || null;
            return {
                clear: ()=>{
                    for (const t in e)
                        delete e[t]
                }
                ,
                get: t,
                getAll: ()=>e,
                getLastFetch: e=>{
                    var s;
                    return (null === (s = t(e)) || void 0 === s ? void 0 : s.lastFetch) || 0
                }
                ,
                getLastModified: e=>{
                    var s;
                    return (null === (s = t(e)) || void 0 === s ? void 0 : s.lastModified) || 0
                }
                ,
                getTopics: e=>{
                    var s;
                    return (null === (s = t(e)) || void 0 === s ? void 0 : s.topics) || []
                }
                ,
                getVersion: e=>{
                    var s;
                    return (null === (s = t(e)) || void 0 === s ? void 0 : s.version) || 0
                }
                ,
                has: t=>!!e[t],
                remove: t=>{
                    delete e[t]
                }
                ,
                set: (t,s)=>{
                    e[t] = s
                }
            }
        };
        var uo = function(e) {
            const t = [];
            let s = !1;
            const i = e || (()=>{}
            )
              , n = ()=>t.length
              , r = e=>{
                s = e
            }
              , a = ()=>{
                if (s)
                    return;
                if (!n())
                    return void i();
                const e = t.shift();
                e && (r(!0),
                e().then((()=>{
                    r(!1),
                    a()
                }
                )).catch((()=>{
                    r(!1),
                    a()
                }
                )))
            }
            ;
            return {
                enqueue: e=>{
                    t.push(e),
                    a()
                }
                ,
                dequeue: a,
                getLength: n
            }
        };
        var go = function() {
            const e = [];
            let t;
            const s = ()=>e.length
              , i = (n,r)=>{
                if (r && (t = r),
                !s())
                    return t && t(n);
                const a = e.shift();
                a && ((e,t)=>{
                    const {callback: s} = e;
                    let n;
                    "function" == typeof s && (n = s(e.data, t)),
                    i(n)
                }
                )(a, n)
            }
            ;
            return {
                enqueue: t=>{
                    e.push(t)
                }
                ,
                dequeue: i,
                getLength: s
            }
        }
          , po = s("u+F0");
        var mo = Object(l.define)("pin-topic-request-handler");
        function fo(e) {
            return new Promise((t=>{
                let s = 0
                  , i = 0
                  , n = {};
                for (let r in e)
                    s++,
                    e[r].then((e=>{
                        n[r] = e,
                        i++,
                        i === s && t(n)
                    }
                    )).catch((()=>{
                        n[r] = null,
                        i++,
                        i === s && t(n)
                    }
                    ));
                0 === s && t({})
            }
            ))
        }
        function vo(e, t) {
            return Object(pa.f)(e, Number.isInteger(+t) ? t : 1 / 0)
        }
        var bo, Io = class {
            constructor(e, t) {
                this.moduleName = e,
                this.instanceNames = t,
                this.instanceMap = new Map
            }
            error(e) {
                const t = this.getLogger(e);
                if (void 0 !== t) {
                    for (var s = arguments.length, i = new Array(s > 1 ? s - 1 : 0), n = 1; n < s; n++)
                        i[n - 1] = arguments[n];
                    t.zsymb(18, 9938, 3e4, ...i)
                }
            }
            info(e) {
                const t = this.getLogger(e);
                if (void 0 !== t) {
                    for (var s = arguments.length, i = new Array(s > 1 ? s - 1 : 0), n = 1; n < s; n++)
                        i[n - 1] = arguments[n];
                    t.zsymb(0, 9938, 30001, ...i)
                }
            }
            getLogger(e) {
                if (this.instanceNames.includes(e) && void 0 === this.instanceMap.get(e)) {
                    const t = this.LoggerFactory.createZLogger(kt.b.pinTopic, [this.moduleName, e]);
                    this.instanceMap.set(e, t)
                }
                return this.instanceMap.get(e)
            }
            get LoggerFactory() {
                return l.ModuleContainer.resolve(P.ZLoggerFactory)
            }
        }
        , yo = Io;
        !function(e) {
            e.CONTROL = "control",
            e.CREATE = "create",
            e.FETCH = "fetch",
            e.LOAD = "load",
            e.REORDER = "reorder",
            e.UNPIN = "unpin"
        }(bo || (bo = {}));
        var Co, So = class extends yo {
            constructor() {
                super(qa.e.DataRepository, [bo.CONTROL, bo.CREATE, bo.FETCH, bo.LOAD, bo.REORDER, bo.UNPIN])
            }
            infoControl() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                    t[s] = arguments[s];
                this.logInfo(bo.CONTROL, ...t)
            }
            infoCreate() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                    t[s] = arguments[s];
                this.logInfo(bo.CREATE, ...t)
            }
            infoFetch() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                    t[s] = arguments[s];
                this.logInfo(bo.FETCH, ...t)
            }
            infoLoad() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                    t[s] = arguments[s];
                this.logInfo(bo.LOAD, ...t)
            }
            infoReorder() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                    t[s] = arguments[s];
                this.logInfo(bo.REORDER, ...t)
            }
            infoUnpin() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                    t[s] = arguments[s];
                this.logInfo(bo.UNPIN, ...t)
            }
            errorControl() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                    t[s] = arguments[s];
                this.logError(bo.CONTROL, ...t)
            }
            errorCreate() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                    t[s] = arguments[s];
                this.logError(bo.CREATE, ...t)
            }
            errorFetch() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                    t[s] = arguments[s];
                this.logError(bo.FETCH, ...t)
            }
            errorLoad() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                    t[s] = arguments[s];
                this.logError(bo.LOAD, ...t)
            }
            errorReorder() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                    t[s] = arguments[s];
                this.logError(bo.REORDER, ...t)
            }
            errorUnpin() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                    t[s] = arguments[s];
                this.logError(bo.UNPIN, ...t)
            }
            logInfo(e) {
                if (this.isEnableLog()) {
                    for (var t = arguments.length, s = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
                        s[i - 1] = arguments[i];
                    super.info(e, ...s)
                }
            }
            logError(e) {
                if (this.isEnableLog()) {
                    for (var t = arguments.length, s = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
                        s[i - 1] = arguments[i];
                    super.error(e, ...s)
                }
            }
            isEnableLog() {
                return Object(Qa.h)()
            }
        }
        ;
        var Eo = Object(l.injectable)()(Co = function(e, t) {
            return Object(l.inject)($a)(e, void 0, 0)
        }(Co = function(e, t) {
            return Object(l.inject)(mo)(e, void 0, 1)
        }(Co = Reflect.metadata("design:type", Function)(Co = Reflect.metadata("design:paramtypes", [Object, Object])(Co = class {
            constructor(e, t) {
                this.storage = e,
                this.fetcher = t,
                this.cache = void 0,
                this.eventQueue = void 0,
                this.logger = void 0,
                this.pendingWhenLoadQueue = void 0,
                this.requestID = void 0,
                this.cache = ho(),
                this.eventQueue = {},
                this.pendingWhenLoadQueue = {},
                this.logger = new So,
                this.requestID = new co.a
            }
            clear() {
                this.cache.clear();
                for (const e in this.pendingWhenLoadQueue)
                    delete this.pendingWhenLoadQueue[e];
                for (const e in this.eventQueue)
                    delete this.eventQueue[e]
            }
            clearPinTopicsForConversation(e, t) {
                void 0 === t && (t = !1),
                this.cache.remove(e),
                delete this.pendingWhenLoadQueue[e],
                delete this.eventQueue[e],
                this.Storage.clearTopics(e, t)
            }
            createPinTopic(e, t, s) {
                void 0 === s && (s = {});
                return new Promise(((n,r)=>{
                    const a = this.getRequestID();
                    this.Logger.infoCreate(a, `call cId:${e}`),
                    this.loadDataFromCacheOrDB(e).then((o=>{
                        const {checkEnableToCreate: l} = s || {};
                        let c = null;
                        if (l) {
                            const {enable: s, oldTopic: i} = l(t, o);
                            if (!s)
                                return this.Logger.infoCreate(a, `cId:${e} react limit`),
                                r({
                                    code: po.a.PINBOARD_OVER_MAXIMUM,
                                    message: "",
                                    data: {
                                        cache: o
                                    }
                                });
                            i && (c = i)
                        }
                        const {version: d} = o;
                        this.Logger.infoCreate(a, `cId:${e}`, d),
                        this.Fetcher.createTopic(e, t, d).then((t=>{
                            this.Logger.infoCreate(a, `cId:${e}, create topic success`);
                            let s = t.response.data;
                            s.oldVersion = d,
                            c && (s.oldTopic = {
                                topicId: c.id,
                                topicType: c.type
                            }),
                            s = io(s),
                            this.enqueueEvent(e, this.addTopic.bind(this, e, s, (e=>n(e))))
                        }
                        )).catch((t=>{
                            const s = t.error;
                            s.data = Object(i.a)(Object(i.a)({}, null == s ? void 0 : s.data), {}, {
                                cache: o
                            }),
                            this.Logger.errorCreate(a, `cId:${e}, create topic fail`, vo(t, Object(Qa.b)())),
                            r(s)
                        }
                        ))
                    }
                    ))
                }
                ))
            }
            getEntryPointPromotionalTooltipShowedStatus() {
                return this.Storage.getEntryPointPromotionalTooltipShowedStatus()
            }
            handleReceivingEvent(e, t) {
                return new Promise(((s,i)=>{
                    if (this.Logger.infoControl(`call ${e}`, vo(t, Object(Qa.b)())),
                    e === qa.b.FORCE_SYNC) {
                        const {conversationIds: e} = t;
                        if (!Array.isArray(e))
                            return i("Invalid conversationIds for force all");
                        if (0 === e.length)
                            this.Storage.setForcedFetchMilestone(Date.now());
                        else
                            for (let t = 0; t < e.length; t++) {
                                var n;
                                const r = null === (n = e[t]) || void 0 === n ? void 0 : n.toString();
                                r && (this.clearPinTopicsForConversation(r),
                                this.fetchTopics(r).then((e=>{
                                    s(e)
                                }
                                )).catch(i))
                            }
                    } else {
                        const {conversationId: n} = t;
                        this.loadDataFromCacheOrDB(n).then((n=>{
                            this.processEventControl(e, t, n, s, i)
                        }
                        ))
                    }
                }
                ))
            }
            loadPinTopics(e, t) {
                return new Promise(((s,i)=>{
                    e || i({
                        status: qa.g.ERROR,
                        error: {
                            code: po.a.INVALID_PARAMETERS,
                            message: "ConversationId not valid"
                        }
                    });
                    const n = this.getRequestID();
                    if (this.Logger.infoLoad(n, `call cId:${e}`),
                    t)
                        return this.Logger.infoLoad(n, `force fetch cId:${e}`, t),
                        this.fetchTopics(e).then((e=>{
                            s(e)
                        }
                        ));
                    this.loadDataFromCacheOrDB(e).then((t=>{
                        this.Logger.infoLoad(n, `cId:${e}`),
                        this.doCheckAndFetchData(t).then((e=>{
                            s(e)
                        }
                        )).catch(i)
                    }
                    ))
                }
                ))
            }
            reorderPinTopics(e, t) {
                return new Promise(((s,i)=>{
                    const n = this.getRequestID();
                    this.Logger.infoReorder(n, `call cId:${e}`),
                    this.loadDataFromCacheOrDB(e).then((r=>{
                        const {version: a} = r
                          , o = Ya(t);
                        this.Logger.infoReorder(n, `cId:${e}`, a),
                        this.Fetcher.reorderTopics(e, o, a).then((i=>{
                            this.Logger.infoReorder(n, `cId:${e}, reorder topic success`);
                            let r = i.response.data;
                            r.oldVersion = a,
                            r.topics = t,
                            r = io(r),
                            this.enqueueEvent(e, this.setTopics.bind(this, e, r, (e=>s(e))))
                        }
                        )).catch((t=>{
                            this.Logger.errorReorder(n, `cId:${e}, reorder topic fail`, vo(t, Object(Qa.b)())),
                            i(t.error)
                        }
                        ))
                    }
                    ))
                }
                ))
            }
            setEntryPointPromotionalTooltipShowedStatus(e) {
                this.Storage.setEntryPointPromotionalTooltipShowedStatus(e)
            }
            unpinTopics(e, t) {
                return new Promise(((s,i)=>{
                    const n = this.getRequestID();
                    this.Logger.infoUnpin(n, `call cId:${e}`),
                    this.loadDataFromCacheOrDB(e).then((r=>{
                        const {version: a} = r
                          , o = Ya(t);
                        this.Logger.infoUnpin(n, `cId:${e}`, a),
                        this.Fetcher.unpinTopics(e, o, a).then((i=>{
                            this.Logger.infoUnpin(n, `cId:${e} unpin topic success`);
                            let r = i.response.data;
                            r.oldVersion = a,
                            r.topics = t,
                            r = io(r),
                            this.enqueueEvent(e, this.removeTopics.bind(this, e, r, (e=>s(e))))
                        }
                        )).catch((t=>{
                            this.Logger.errorUnpin(n, `cId:${e}, unpin topic fail`, vo(t, Object(Qa.b)())),
                            i(t.error)
                        }
                        ))
                    }
                    ))
                }
                ))
            }
            setPendingQueue(e, t) {
                t && !this.pendingWhenLoadQueue[e] ? this.pendingWhenLoadQueue[e] = go() : delete this.pendingWhenLoadQueue[e]
            }
            isInPending(e) {
                return !!this.pendingWhenLoadQueue[e]
            }
            openPendingQueue(e) {
                this.setPendingQueue(e, !0)
            }
            closePendingQueue(e) {
                this.setPendingQueue(e, !1)
            }
            enqueuePending(e, t) {
                this.pendingWhenLoadQueue[e] && this.pendingWhenLoadQueue[e].enqueue(t)
            }
            loadTopicsFromDB(e) {
                this.openPendingQueue(e);
                return new Promise((t=>{
                    const s = this.getRequestID();
                    this.Logger.infoLoad(s, `DB call cId:${e}`),
                    this.Storage.loadTopics(e).then((i=>{
                        const n = this.handleLoadDBFinish(e, i);
                        this.Logger.infoLoad(s, `DB cId:${e} success`),
                        t({
                            status: qa.g.SUCCESS,
                            response: {
                                data: n
                            }
                        })
                    }
                    )).catch((i=>{
                        const n = this.handleLoadDBFinish(e, null);
                        this.Logger.errorLoad(s, `DB cId:${e} fail`, vo(null == i ? void 0 : i.error, Object(Qa.b)())),
                        t({
                            status: qa.g.ERROR,
                            response: {
                                data: n
                            }
                        })
                    }
                    ))
                }
                ))
            }
            getRequestID() {
                return this.requestID.next()
            }
            handleLoadDBFinish(e, t) {
                var s;
                let i;
                var n;
                t && (i = {
                    conversationId: (n = t).conversationId,
                    topics: n.topics,
                    version: n.boardVersion,
                    lastFetch: n.lastFetch,
                    lastModified: Date.now()
                }),
                t && (null === (s = i) || void 0 === s ? void 0 : s.conversationId) === e || (i = function(e) {
                    return {
                        conversationId: e,
                        topics: [],
                        version: 0,
                        lastFetch: 0,
                        lastModified: 0
                    }
                }(e));
                let r = i;
                if (!Xa(r).needFetch && this.isInPending(e)) {
                    const t = e=>{
                        e && (r = e)
                    }
                    ;
                    this.pendingWhenLoadQueue[e].dequeue(i, t)
                }
                return this.closePendingQueue(e),
                r
            }
            fetchTopics(e, t) {
                void 0 === t && (t = 0),
                this.openPendingQueue(e);
                return new Promise(((s,i)=>{
                    const n = this.getRequestID();
                    this.Logger.infoFetch(n, `call cId:${e}`, t),
                    this.Fetcher.fetchTopics(e, t).then((t=>{
                        this.Logger.infoFetch(n, `cId:${e} success`),
                        this.closePendingQueue(e);
                        const {response: i} = t
                          , r = i.data.topics;
                        for (let e = 0; e < r.length; e++)
                            r[e] = no(r[e]);
                        this.loadExtraDataForTopics(r).then((t=>{
                            const n = {
                                conversationId: e,
                                topics: t,
                                version: i.data.version,
                                lastFetch: Date.now(),
                                lastModified: Date.now()
                            };
                            this.setToCache(e, n),
                            this.setTopicsToDB(n),
                            s(n)
                        }
                        ))
                    }
                    )).catch((t=>{
                        this.Logger.errorFetch(n, `cId:${e} fail`, vo(t, Object(Qa.b)())),
                        this.closePendingQueue(e)
                    }
                    ))
                }
                ))
            }
            doCheckAndFetchData(e) {
                return new Promise(((t,s)=>{
                    const i = Xa(e);
                    if (this.Logger.infoFetch(`cId:${e.conversationId} needFetch:${i.needFetch} reason:${i.reason}`),
                    !i.needFetch)
                        return t(e);
                    this.fetchTopics(e.conversationId).then((s=>{
                        t(s || e)
                    }
                    )).catch(s)
                }
                ))
            }
            getDataInPendingQueueAfterMutation(e, t) {
                if (e.conversationId !== t.conversationId)
                    return t;
                if (e.oldVersion != t.version)
                    return t;
                return {
                    topics: so(e.type, t.topics, {
                        index: e.index,
                        topics: e.topics
                    }),
                    version: e.version,
                    conversationId: e.conversationId,
                    lastModified: Date.now(),
                    lastFetch: t.lastFetch
                }
            }
            setToCache(e, t) {
                return null == t.lastModified && (t.lastModified = Date.now()),
                this.cache.set(e, t),
                t
            }
            addToCache(e, t, s) {
                void 0 === s && (s = 0);
                const i = this.getCache(e)
                  , {topic: n, version: r} = t;
                let a = Date.now()
                  , o = [];
                i ? (o = so(qa.a.ADD, i.topics, {
                    topics: [n],
                    index: s
                }),
                a = i.lastFetch) : o.push(n),
                t.lastFetch && (a = t.lastFetch);
                const l = {
                    conversationId: e,
                    topics: o,
                    version: r,
                    lastModified: Date.now(),
                    lastFetch: a
                };
                return this.setToCache(e, l)
            }
            removeInCache(e, t, s) {
                if (void 0 === s && (s = 0),
                !this.cache.has(e))
                    return null;
                const i = this.getCache(e)
                  , {topics: n} = i;
                if (t.topic)
                    for (let a = 0; a < n.length; a++) {
                        const e = n[a];
                        if (e.id === t.topic.id && e.type === t.topic.type) {
                            n.splice(a, 1);
                            break
                        }
                    }
                else
                    n.splice(s, 1);
                const r = {
                    conversationId: e,
                    topics: n,
                    version: t.version,
                    lastModified: Date.now(),
                    lastFetch: i.lastFetch
                };
                return this.setToCache(e, r)
            }
            enqueueEvent(e, t) {
                if (!this.eventQueue[e]) {
                    const t = ()=>{
                        delete this.eventQueue[e]
                    }
                    ;
                    this.eventQueue[e] = uo(t)
                }
                this.eventQueue[e].enqueue(t)
            }
            addTopic(e, t, s) {
                return new Promise(((i,n)=>{
                    if (this.isInPending(e)) {
                        const s = {
                            data: {
                                type: qa.a.ADD,
                                conversationId: e,
                                oldTopic: t.oldTopic,
                                topics: [t.topic],
                                version: t.version,
                                oldVersion: t.oldVersion,
                                index: t.index
                            },
                            callback: this.getDataInPendingQueueAfterMutation
                        };
                        return this.enqueuePending(e, s),
                        i()
                    }
                    const r = n=>{
                        const {oldVersion: r, version: a} = t
                          , o = Ja(r, a, n.version);
                        if (this.Logger.infoCreate(`add call cId:${e} actCode:${o}`, r, a, n.version),
                        1 === o) {
                            const {oldTopic: n, index: r, topic: o} = t;
                            n && n.topicId && this.removeInCache(e, {
                                topic: {
                                    id: n.topicId,
                                    type: n.topicType
                                },
                                version: a
                            }),
                            no(o),
                            this.loadExtraDataForTopics([o]).then((n=>{
                                const a = {
                                    topic: n[0],
                                    version: t.version
                                }
                                  , o = this.addToCache(e, a, r);
                                this.setTopicsToDB(o),
                                i(),
                                s && s(this.getCache(e))
                            }
                            )).catch((()=>{
                                i()
                            }
                            ))
                        } else
                            0 === o ? this.fetchTopics(e).then((e=>{
                                s && s(e),
                                i()
                            }
                            )).catch((()=>{
                                s && s(this.getCache(e)),
                                i()
                            }
                            )) : i()
                    }
                    ;
                    this.loadDataFromCacheOrDB(e).then((e=>{
                        r(e)
                    }
                    ))
                }
                ))
            }
            removeTopics(e, t, s) {
                return new Promise((i=>{
                    if (this.isInPending(e)) {
                        const s = {
                            data: {
                                type: qa.a.REMOVE,
                                conversationId: e,
                                topics: t.topics,
                                version: t.version,
                                oldVersion: t.oldVersion
                            },
                            callback: this.getDataInPendingQueueAfterMutation
                        };
                        return this.enqueuePending(e, s),
                        i()
                    }
                    const n = n=>{
                        const {oldVersion: r, version: a} = t
                          , o = Ja(r, a, n.version);
                        if (this.Logger.infoUnpin(`remove call cId:${e} actCode:${o}`, r, a, n.version),
                        1 === o) {
                            const {topics: r} = t;
                            let o = n;
                            for (let t = 0; t < r.length; t++)
                                o = this.removeInCache(e, {
                                    topic: r[t],
                                    version: a
                                });
                            return this.setTopicsToDB(o),
                            s && s(this.getCache(e)),
                            i()
                        }
                        0 === o ? this.fetchTopics(e).then((e=>{
                            s && s(e),
                            i()
                        }
                        )).catch((()=>{
                            s && s(this.getCache(e)),
                            i()
                        }
                        )) : i()
                    }
                    ;
                    this.loadDataFromCacheOrDB(e).then((e=>{
                        n(e)
                    }
                    ))
                }
                ))
            }
            setTopics(e, t, s) {
                return new Promise((i=>{
                    if (this.isInPending(e)) {
                        const s = {
                            data: {
                                type: qa.a.REORDER,
                                conversationId: e,
                                topics: t.topics,
                                version: t.version,
                                oldVersion: t.oldVersion
                            },
                            callback: this.getDataInPendingQueueAfterMutation
                        };
                        return this.enqueuePending(e, s),
                        i()
                    }
                    const n = n=>{
                        const {oldVersion: r, version: a} = t
                          , o = Ja(r, a, n.version);
                        if (this.Logger.infoReorder(`set call cId:${e} actCode:${o}`, r, a, n.version),
                        1 === o) {
                            const r = n.topics
                              , a = [];
                            for (let e = 0; e < t.topics.length; e++) {
                                const s = t.topics[e]
                                  , i = r.find((e=>e.id === s.id && e.type === s.type));
                                i && a.push(i)
                            }
                            const o = {
                                conversationId: e,
                                topics: a,
                                version: t.version,
                                lastModified: Date.now(),
                                lastFetch: (null == n ? void 0 : n.lastFetch) || 0
                            };
                            return this.setToCache(e, o),
                            this.setTopicsToDB(o),
                            s && s(this.getCache(e)),
                            i()
                        }
                        0 === o ? this.fetchTopics(e).then((e=>{
                            s && s(e),
                            i()
                        }
                        )).catch((()=>{
                            s && s(this.getCache(e)),
                            i()
                        }
                        )) : i()
                    }
                    ;
                    this.loadDataFromCacheOrDB(e).then((e=>{
                        n(e)
                    }
                    ))
                }
                ))
            }
            loadDataFromCacheOrDB(e) {
                return new Promise((t=>{
                    const s = this.getCache(e);
                    s ? t(s) : this.loadTopicsFromDB(e).then((s=>{
                        const i = s.response.data;
                        this.setToCache(e, i),
                        t(i)
                    }
                    ))
                }
                ))
            }
            setTopicsToDB(e) {
                return new Promise(((t,s)=>{
                    const i = {
                        conversationId: e.conversationId,
                        boardVersion: e.version,
                        topics: e.topics,
                        lastFetch: e.lastFetch
                    };
                    this.Storage.setTopics(i).then(t).catch(s)
                }
                ))
            }
            processEventControl(e, t, s, n, r) {
                const {conversationId: a} = t;
                let o = {
                    oldVersion: t.oldVersion,
                    version: t.version
                };
                const l = io(t);
                switch (e) {
                case qa.b.CREATE:
                    o = Object(i.a)(Object(i.a)({}, o), {}, {
                        oldTopic: l.oldTopic,
                        topic: l.topic,
                        index: 0
                    }),
                    this.enqueueEvent(a, this.addTopic.bind(this, a, o, (e=>n(e))));
                    break;
                case qa.b.UNPIN:
                    {
                        const e = l.topic
                          , t = [];
                        e && null != e.topicId && null != e.topicType && t.push({
                            id: e.topicId,
                            type: e.topicType
                        }),
                        o = Object(i.a)(Object(i.a)({}, o), {}, {
                            topics: t
                        }),
                        this.enqueueEvent(a, this.removeTopics.bind(this, a, o, (e=>n(e))));
                        break
                    }
                case qa.b.REORDER:
                    {
                        var c;
                        const e = []
                          , t = (null === (c = l.topics) || void 0 === c ? void 0 : c.length) || 0;
                        for (let i = 0; i < t; i++) {
                            var d;
                            const t = null === (d = l.topics) || void 0 === d ? void 0 : d[i];
                            if (t && null != t.topicId && null != t.topicType) {
                                const i = s.topics.find((e=>e.id === t.topicId && e.type === t.topicType));
                                i && e.push(i)
                            }
                        }
                        o = Object(i.a)(Object(i.a)({}, o), {}, {
                            topics: e
                        }),
                        this.enqueueEvent(a, this.setTopics.bind(this, a, o, (e=>n(e))));
                        break
                    }
                }
            }
            loadStickerThumb(e) {
                const t = e=>`${e.id}_${e.type}`;
                return new Promise((s=>{
                    const i = {};
                    for (let o = 0; o < e.length; o++) {
                        var n, r;
                        const s = e[o];
                        if ((null === (n = s.params) || void 0 === n ? void 0 : n.msg_type) === v.MSG_STICKER || (null === (r = s.params) || void 0 === r ? void 0 : r.msg_type) === v.CLI_MSG_TYPE_STICKER) {
                            var a;
                            const e = null === (a = s.params) || void 0 === a ? void 0 : a.extra;
                            e && null != e.catId && null != e.id && (i[t(s)] = this.StickerManager.getStickerIfNotExist(e.catId, e.id))
                        }
                    }
                    Object.keys(i).length > 0 ? fo(i).then((i=>{
                        for (let s = 0; s < e.length; s++) {
                            const n = e[s]
                              , r = i[t(n)];
                            r && r.id === parseInt(n.params.extra.id) && r.cateId === parseInt(n.params.extra.catId) && (n.params.thumb = r.stickerUrl || "",
                            e[s] = n)
                        }
                        s(e)
                    }
                    )) : s(e)
                }
                ))
            }
            loadExtraDataForTopics(e) {
                return new Promise((t=>{
                    this.loadStickerThumb(e).then((e=>{
                        t(e)
                    }
                    ))
                }
                ))
            }
            getCache(e) {
                return this.cache.get(e)
            }
            get Fetcher() {
                return this.fetcher
            }
            get Logger() {
                return this.logger
            }
            get StickerManager() {
                return Qe.g
            }
            get Storage() {
                return this.storage
            }
        }
        ) || Co) || Co) || Co) || Co) || Co;
        l.ModuleContainer.register(lo, Eo);
        var _o = class {
            createOneOnOneTopic(e, t, s, i) {
                void 0 === e && (e = ""),
                void 0 === s && (s = 0),
                void 0 === i && (i = "vi");
                let n = {
                    conversationId: e,
                    topic: t,
                    version: s,
                    lang: i
                };
                Ke.default.logCoreInfo("[PinTopic] - createOneOnOneTopic params: ", n);
                const r = ze.b.getFriendBoardDomain() + "/api/friendboard/create?" + this.getCommonParams() + "&params=" + this.getEncodedParams(n);
                return this.getRequest(r, null, 12067)
            }
            getListOneOnOnePinTopics(e, t) {
                void 0 === e && (e = ""),
                void 0 === t && (t = 0);
                let s = {
                    conversationId: e,
                    version: t
                };
                Ke.default.logCoreInfo("[PinTopic] - getListOneOnOnePinTopics params: ", s);
                const i = ze.b.getFriendBoardDomain() + "/api/friendboard/list?" + Xi.default._getCommonParams() + "&params=" + this.getEncodedParams(s);
                return this.getRequest(i, null, 12065)
            }
            reorderOneOnOnePinTopics(e, t, s, i) {
                void 0 === e && (e = ""),
                void 0 === s && (s = 0),
                void 0 === i && (i = "vi");
                let n = {
                    conversationId: e,
                    topics: t,
                    version: s,
                    lang: i
                };
                Ke.default.logCoreInfo("[PinTopic] - reorderOneOnOnePinTopics params: ", n);
                const r = ze.b.getFriendBoardDomain() + "/api/friendboard/reorder?" + this.getCommonParams() + "&params=" + this.getEncodedParams(n);
                return this.getRequest(r, null, 12068)
            }
            unpinOneOnOneTopics(e, t, s, i) {
                void 0 === e && (e = ""),
                void 0 === s && (s = 0),
                void 0 === i && (i = "vi");
                let n = {
                    conversationId: e,
                    topics: t,
                    version: s,
                    lang: i
                };
                Ke.default.logCoreInfo("[PinTopic] - unpinOneOnOneTopics params: ", n);
                const r = ze.b.getFriendBoardDomain() + "/api/friendboard/multi_unpin?" + this.getCommonParams() + "&params=" + this.getEncodedParams(n);
                return this.getRequest(r, null, 12069)
            }
            getCommonParams() {
                return Xi.default._getCommonParams()
            }
            getEncodedParams(e) {
                return Xi.default.getEncodedParams(e)
            }
            getRequest(e, t, s, i, n, r, a, o, l) {
                return Xi.default._get(e, t, s, i, n, r, a, o, l)
            }
        }
        ;
        var To, Lo = function() {
            let e;
            function t() {
                return e || (e = new _o),
                e
            }
            const s = e=>new Promise(((t,s)=>{
                e.then(Zi.a).then(t).catch(s)
            }
            ));
            return {
                createOneOnOneTopic: function(e, n, r) {
                    void 0 === r && (r = 0);
                    const a = Object(i.a)({}, n)
                      , {params: o} = a;
                    o && o.extra && o.extra.constructor === Object && (o.extra = JSON.stringify(o.extra)),
                    o && (a.params = JSON.stringify(o)),
                    null == a.src && (a.src = -1),
                    null == a.pinAct && (a.pinAct = 1);
                    const l = Dt.default.getCurrentLanguageName();
                    return s(t().createOneOnOneTopic(e, a, r, l))
                },
                getListOneOnOnePinTopics: function(e, i) {
                    return void 0 === i && (i = 0),
                    s(t().getListOneOnOnePinTopics(e, i))
                },
                reorderOneOnOnePinTopics: function(e, i, n) {
                    void 0 === n && (n = 0);
                    const r = Dt.default.getCurrentLanguageName();
                    return s(t().reorderOneOnOnePinTopics(e, i, n, r))
                },
                unpinOneOnOneTopics: function(e, i, n) {
                    void 0 === n && (n = 0);
                    const r = Dt.default.getCurrentLanguageName();
                    return s(t().unpinOneOnOneTopics(e, i, n, r))
                }
            }
        };
        !function(e) {
            e.CREATE = "create",
            e.FETCH = "fetch",
            e.REORDER = "reorder",
            e.UNPIN = "unpin"
        }(To || (To = {}));
        var Oo = class extends yo {
            constructor() {
                super(qa.e.Network, [To.CREATE, To.FETCH, To.REORDER, To.UNPIN])
            }
            infoCreate() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                    t[s] = arguments[s];
                this.logInfo(To.CREATE, ...t)
            }
            infoFetch() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                    t[s] = arguments[s];
                this.logInfo(To.FETCH, ...t)
            }
            infoReorder() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                    t[s] = arguments[s];
                this.logInfo(To.REORDER, ...t)
            }
            infoUnpin() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                    t[s] = arguments[s];
                this.logInfo(To.UNPIN, ...t)
            }
            errorCreate() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                    t[s] = arguments[s];
                this.logError(To.CREATE, ...t)
            }
            errorFetch() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                    t[s] = arguments[s];
                this.logError(To.FETCH, ...t)
            }
            errorReorder() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                    t[s] = arguments[s];
                this.logError(To.REORDER, ...t)
            }
            errorUnpin() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                    t[s] = arguments[s];
                this.logError(To.UNPIN, ...t)
            }
            logInfo(e) {
                if (this.isEnableLog()) {
                    for (var t = arguments.length, s = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
                        s[i - 1] = arguments[i];
                    super.info(e, ...s)
                }
            }
            logError(e) {
                if (this.isEnableLog()) {
                    for (var t = arguments.length, s = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
                        s[i - 1] = arguments[i];
                    super.error(e, ...s)
                }
            }
            isEnableLog() {
                return Object(Qa.i)()
            }
        }
        ;
        var Fo, Ro = class {
            constructor() {
                this.apiClient = void 0,
                this.logger = void 0,
                this.requestID = void 0,
                this.apiClient = Lo(),
                this.logger = new Oo,
                this.requestID = new co.a
            }
            async fetchTopics(e, t) {
                void 0 === t && (t = 0);
                const s = this.getRequestId();
                this.Logger.infoFetch(s, `call cId:${e}`, t);
                try {
                    const i = await this.apiClient.getListOneOnOnePinTopics(e, t);
                    return this.Logger.infoFetch(s, `cId:${e} success`, i.version),
                    {
                        status: qa.g.SUCCESS,
                        response: {
                            data: {
                                topics: i.data,
                                version: i.version
                            }
                        }
                    }
                } catch (i) {
                    return this.Logger.errorFetch(s, `cId:${e} fail`, vo(i, Object(Qa.d)())),
                    Promise.reject({
                        status: qa.g.ERROR,
                        error: {
                            code: i.code || i.error_code,
                            message: i.error_message
                        }
                    })
                }
            }
            async createTopic(e, t, s) {
                void 0 === s && (s = 0);
                const i = this.getRequestId();
                this.Logger.infoCreate(i, `call cId:${e}`, s);
                try {
                    const n = await this.apiClient.createOneOnOneTopic(e, t, s);
                    return this.Logger.infoCreate(i, `cId:${e} success`, n.version),
                    {
                        status: qa.g.SUCCESS,
                        response: {
                            data: {
                                topic: n.data,
                                version: n.version
                            }
                        }
                    }
                } catch (n) {
                    return this.Logger.errorCreate(i, `cId:${e} fail`, vo(n, Object(Qa.d)())),
                    Promise.reject({
                        status: qa.g.ERROR,
                        error: {
                            code: n.code || n.error_code,
                            message: n.error_message
                        }
                    })
                }
            }
            async unpinTopics(e, t, s) {
                void 0 === s && (s = 0);
                const i = this.getRequestId();
                this.Logger.infoUnpin(i, `call cId:${e}`, s);
                try {
                    const n = await this.apiClient.unpinOneOnOneTopics(e, t, s);
                    return this.Logger.infoUnpin(i, `cId:${e} success`, n.version),
                    {
                        status: qa.g.SUCCESS,
                        response: {
                            data: n
                        }
                    }
                } catch (n) {
                    return this.Logger.errorUnpin(i, `cId:${e} fail`, vo(n, Object(Qa.d)())),
                    Promise.reject({
                        status: qa.g.ERROR,
                        error: {
                            code: n.code || n.error_code,
                            message: n.error_message
                        }
                    })
                }
            }
            async reorderTopics(e, t, s) {
                void 0 === s && (s = 0);
                const i = this.getRequestId();
                this.Logger.infoReorder(i, `call cId:${e}`, s);
                try {
                    const n = await this.apiClient.reorderOneOnOnePinTopics(e, t, s);
                    return this.Logger.infoReorder(i, `cId:${e} success`, n.version),
                    {
                        status: qa.g.SUCCESS,
                        response: {
                            data: n
                        }
                    }
                } catch (n) {
                    return this.Logger.errorUnpin(i, `cId:${e} fail`, vo(n, Object(Qa.d)())),
                    Promise.reject({
                        status: qa.g.ERROR,
                        error: {
                            code: n.code || n.error_code,
                            message: n.error_message
                        }
                    })
                }
            }
            getRequestId() {
                return this.requestID.next()
            }
            get Logger() {
                return this.logger
            }
        }
        ;
        l.ModuleContainer.register(mo, Ro);
        var wo = Object(l.singleton)(Va)(Fo = class {
            constructor() {
                this._storage = void 0
            }
            async clearTopics(e, t) {
                void 0 === t && (t = !1);
                try {
                    let s;
                    if (t)
                        s = this.storage.removeConversationTopics(e);
                    else {
                        const t = {
                            conversationId: e,
                            topics: []
                        }
                          , i = ["topics"];
                        s = this.storage.updateGroupTopic(t, i)
                    }
                    return await s,
                    e
                } catch (s) {
                    return Promise.reject(s)
                }
            }
            async loadTopics(e) {
                try {
                    return (await this.loadTopicsFromDB(e)).response.data
                } catch (t) {
                    return Promise.reject(t)
                }
            }
            async setTopics(e) {
                try {
                    return await this.setTopicsToDB(e)
                } catch (t) {
                    return Promise.reject(t)
                }
            }
            getEntryPointPromotionalTooltipShowedStatus() {
                const e = u.a.getInstance().getItemForCurrentUser(qa.d.ONE_ON_ONE_ENTRY_POINT_PROMOTIONAL_TOOLTIP_SHOWED);
                if (null === e)
                    return null;
                try {
                    return JSON.parse(e)
                } catch (t) {
                    return !1
                }
            }
            async getMessagesByIds(e) {
                try {
                    const t = await this.storage.getMessagesByIds(e);
                    let s;
                    e && e.length > 0 && (s = e[0]);
                    let i = null;
                    return s && (i = t[s]),
                    i || Promise.reject("Not found")
                } catch (t) {
                    return Promise.reject(t)
                }
            }
            async getMessageByCliMsgId(e, t) {
                void 0 === t && (t = {});
                try {
                    const {myUID: s, userId: i} = t;
                    if (i) {
                        let t = i;
                        s == i && (t = "0");
                        const n = await this.storage.getMessageByCliMsgIdOwnerId(e, t);
                        return n || Promise.reject("Not found")
                    }
                    const n = await this.storage.getMessageByCliMsgId(e);
                    if (!n || !n.length)
                        return Promise.reject("Not found");
                    n.length;
                    const r = n && n[0];
                    return r || Promise.reject("Not found")
                } catch (s) {
                    return Promise.reject(s)
                }
            }
            setEntryPointPromotionalTooltipShowedStatus(e) {
                u.a.getInstance().setItemForCurrentUser(qa.d.ONE_ON_ONE_ENTRY_POINT_PROMOTIONAL_TOOLTIP_SHOWED, JSON.stringify(e))
            }
            setForcedFetchMilestone(e) {
                u.a.getInstance().setItemForCurrentUser(qa.d.FORCE_FETCH_MILESTONE, e.toString())
            }
            async loadTopicsFromDB(e) {
                try {
                    const t = await this.storage.getGroupTopic(e);
                    return {
                        status: qa.g.SUCCESS,
                        response: {
                            data: t
                        }
                    }
                } catch (t) {
                    return Promise.reject({
                        status: qa.g.ERROR,
                        error: {
                            code: null == t ? void 0 : t.code,
                            message: (null == t ? void 0 : t.message) || (null == t ? void 0 : t.error_message),
                            data: t
                        }
                    })
                }
            }
            async setTopicsToDB(e) {
                return await this.storage.setGroupTopic(e)
            }
            get storage() {
                return this._storage || (this._storage = s("XS0u").default),
                this._storage
            }
        }
        ) || Fo;
        l.ModuleContainer.register($a, wo);
        var Mo = s("+3r3");
        var Do, Ao = Object(l.define)("pin-topic-one-on-one-controller");
        !function(e) {
            e.CONTROL = "control",
            e.CREATE = "create",
            e.LOAD = "load",
            e.REORDER = "reorder",
            e.UNPIN = "unpin"
        }(Do || (Do = {}));
        var Po, jo = class extends yo {
            constructor() {
                super(qa.e.OneOnOneController, [Do.CONTROL, Do.CREATE, Do.LOAD, Do.REORDER, Do.UNPIN])
            }
            infoControl() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                    t[s] = arguments[s];
                this.logInfo(Do.CONTROL, ...t)
            }
            infoCreate() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                    t[s] = arguments[s];
                this.logInfo(Do.CREATE, ...t)
            }
            infoLoad() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                    t[s] = arguments[s];
                this.logInfo(Do.LOAD, ...t)
            }
            infoReorder() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                    t[s] = arguments[s];
                this.logInfo(Do.REORDER, ...t)
            }
            infoUnpin() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                    t[s] = arguments[s];
                this.logInfo(Do.UNPIN, ...t)
            }
            errorControl() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                    t[s] = arguments[s];
                this.logError(Do.CONTROL, ...t)
            }
            errorCreate() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                    t[s] = arguments[s];
                this.logError(Do.CREATE, ...t)
            }
            errorLoad() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                    t[s] = arguments[s];
                this.logError(Do.LOAD, ...t)
            }
            errorReorder() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                    t[s] = arguments[s];
                this.logError(Do.REORDER, ...t)
            }
            errorUnpin() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                    t[s] = arguments[s];
                this.logError(Do.UNPIN, ...t)
            }
            logInfo(e) {
                if (this.isEnableLog()) {
                    for (var t = arguments.length, s = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
                        s[i - 1] = arguments[i];
                    super.info(e, ...s)
                }
            }
            logError(e) {
                if (this.isEnableLog()) {
                    for (var t = arguments.length, s = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
                        s[i - 1] = arguments[i];
                    super.error(e, ...s)
                }
            }
            isEnableLog() {
                return Object(Qa.g)()
            }
        }
        ;
        Object(l.injectable)()(Po = Object(l.singleton)(Ao)(Po = function(e, t) {
            return Object(l.inject)(lo)(e, void 0, 0)
        }(Po = function(e, t) {
            return Object(l.inject)(za)(e, void 0, 1)
        }(Po = Reflect.metadata("design:type", Function)(Po = Reflect.metadata("design:paramtypes", [Object, Object])(Po = class {
            constructor(e, t) {
                this.dataRepository = e,
                this.messageLoader = t,
                this.events = {},
                this.logger = void 0,
                this.requestID = void 0,
                this.initialize(),
                this.logger = new jo,
                this.requestID = new co.a
            }
            getPinTopic(e, t, s) {
                return new Promise(((i,n)=>{
                    this.loadPinTopics(e).then((e=>{
                        const {topics: r} = e
                          , a = r.find((e=>e.id === (null == t ? void 0 : t.toString()) && e.type === s));
                        a ? i(a) : n(null)
                    }
                    )).catch(n)
                }
                ))
            }
            getMessageFromTopic(e) {
                return this.MessageLoader.getMessageFromTopic(e)
            }
            displayEntryPointPromotionalTooltip() {
                this.DataRepository.setEntryPointPromotionalTooltipShowedStatus(!0)
            }
            isDisplayedEntryPointPromotionalTooltip() {
                if (!Object(Qa.l)())
                    return !0;
                const e = this.DataRepository.getEntryPointPromotionalTooltipShowedStatus();
                return null !== e && Boolean(e)
            }
            async loadPinTopics(e, t) {
                if (void 0 === t && (t = !1),
                !Object(Qa.k)())
                    return Promise.reject({
                        code: Za.a.OFF_FEATURE,
                        message: ""
                    });
                const s = this.getRequestID();
                try {
                    var i;
                    let n;
                    t && (n = Za.c.OPEN_DIALOG),
                    this.Logger.infoLoad(s, `call cId:${e}`, t);
                    const r = await this.DataRepository.loadPinTopics(e, n);
                    return this.Logger.infoLoad(s, `res cId:${e}`, !!r, r.conversationId, null === (i = r.topics) || void 0 === i ? void 0 : i.length),
                    {
                        conversationId: r.conversationId,
                        topics: r.topics
                    }
                } catch (n) {
                    return this.Logger.errorLoad(s, `err cId:${e}`, vo(n, Object(Qa.a)())),
                    Promise.reject(n)
                }
            }
            addEventListener(e, t) {
                this.events[e] || (this.events[e] = []),
                this.events[e].push(t)
            }
            removeEventListener(e, t) {
                const s = this.events[e]
                  , i = (this.events[e] || []).length;
                for (let n = 0; n < i; n++)
                    if (s[n] === t) {
                        s.splice(n, 1);
                        break
                    }
                0 === s.length && delete this.events[e]
            }
            removeEventListeners(e) {
                delete this.events[e]
            }
            handleEventControl(e) {
                if (!Object(Qa.k)())
                    return;
                const t = this.getRequestID();
                this.Logger.infoControl(t, "recv", e.act, vo(e.data, Object(Qa.a)())),
                this.DataRepository.handleReceivingEvent(e.act, e.data).then((s=>{
                    if (this.Logger.infoControl(t, "res", e.act, vo(s, Object(Qa.a)())),
                    e.act === Za.b.UNPIN) {
                        let t = [];
                        if (Array.isArray(e.data.topics) && e.data.topics.forEach((e=>{
                            s.topics.find((t=>t.id === e.topicId && t.type === e.topicType)) || t.push({
                                topicId: e.topicId,
                                topicType: e.topicType
                            })
                        }
                        )),
                        t.length > 0) {
                            const s = {};
                            t.forEach((t=>{
                                s[`${t.topicId}_${t.topicType}`] = this.getPinTopic(e.data.conversationId, t.topicId, t.topicType)
                            }
                            )),
                            fo(s).then((e=>{
                                const t = Object.keys(e).map((t=>e[t]));
                                this.MessageLoader.removeMessages(t)
                            }
                            ))
                        }
                    }
                    this.MessageLoader.loadMessages(s.topics),
                    this.notifyChangeEvent(s.conversationId, s.topics)
                }
                )).catch((s=>{
                    this.Logger.errorControl(t, "err", e.act, vo(s, Object(Qa.a)()))
                }
                ))
            }
            async createPinTopic(e, t, s, i) {
                if (void 0 === i && (i = 2),
                !Object(Qa.k)())
                    return Promise.reject({
                        code: Za.a.OFF_FEATURE,
                        message: ""
                    });
                const n = this.getRequestID();
                try {
                    var r;
                    if (this.Logger.infoCreate(n, `call cId:${e}`, !!t, !!s, i),
                    !this.isValidNetwork())
                        return Promise.reject({
                            code: Za.a.NO_NETWORK,
                            message: "STR_CHECK_NET"
                        });
                    const a = await this.retryable(i, (()=>this.processCreatePinTopic(e, t, s, i)));
                    return this.Logger.infoCreate(n, `res cId:${e}`, !!a, null == a ? void 0 : a.conversationId, null == a || null === (r = a.topics) || void 0 === r ? void 0 : r.length),
                    a
                } catch (a) {
                    return this.Logger.errorCreate(n, `err cId:${e}`, vo(a, Object(Qa.a)())),
                    Promise.reject(a)
                }
            }
            async reorderPinTopics(e, t, s) {
                if (void 0 === s && (s = 2),
                !Object(Qa.k)())
                    return Promise.reject({
                        code: Za.a.OFF_FEATURE,
                        message: ""
                    });
                const i = this.getRequestID();
                try {
                    var n;
                    if (this.Logger.infoReorder(i, `call cId:${e}`, t.length, s),
                    !this.isValidNetwork())
                        return Promise.reject({
                            code: Za.a.NO_NETWORK,
                            message: "STR_CHECK_NET"
                        });
                    const r = await this.retryable(s, (()=>this.processReorderPinTopics(e, t, s)));
                    return this.Logger.infoReorder(i, `res cId:${e}`, !!r, null == r ? void 0 : r.conversationId, null == r || null === (n = r.topics) || void 0 === n ? void 0 : n.length),
                    r
                } catch (r) {
                    return this.Logger.errorReorder(i, `err cId:${e}`, vo(r, Object(Qa.a)())),
                    Promise.reject(r)
                }
            }
            async unpinPinTopics(e, t, s) {
                if (void 0 === s && (s = 2),
                !Object(Qa.k)())
                    return Promise.reject({
                        code: Za.a.OFF_FEATURE,
                        message: ""
                    });
                const i = this.getRequestID();
                try {
                    var n;
                    if (this.Logger.infoUnpin(i, `call cId:${e}`, t.length, s),
                    !this.isValidNetwork())
                        return Promise.reject({
                            code: Za.a.NO_NETWORK,
                            message: "STR_CHECK_NET"
                        });
                    const r = await this.retryable(s, (()=>this.processUnpinPinTopics(e, t, s)));
                    return this.Logger.infoUnpin(i, `res cId:${e}`, !!r, null == r ? void 0 : r.conversationId, null == r || null === (n = r.topics) || void 0 === n ? void 0 : n.length),
                    r
                } catch (r) {
                    return this.Logger.errorUnpin(i, `err cId:${e}`, vo(r, Object(Qa.a)())),
                    Promise.reject(r)
                }
            }
            isMessagePinnable(e) {
                return function(e) {
                    return Ka(e)
                }(e)
            }
            initialize() {
                const e = e=>{
                    const {userId: t} = e;
                    t && this.clearTopics(t)
                }
                ;
                this.FriendManager.subscribeEventFriend(v.EventFriend.BLOCK_FRIEND, e),
                this.FriendManager.subscribeEventFriend(v.EventFriend.REMOVE_FRIEND, e),
                Object(Mo.b)(this.clear)
            }
            clear() {
                this.DataRepository.clear(),
                this.MessageLoader.clear()
            }
            checkEnableToCreate(e, t, s) {
                const i = (()=>{
                    if (e.type === Za.e.MESSAGE) {
                        const e = t.topics;
                        for (let t = 0; t < e.length; t++) {
                            const i = e[t];
                            if (i.type === Za.e.MESSAGE) {
                                const e = this.MessageLoader.getMessageFromTopic(i);
                                if (null != e && null != s && null != s.msgId && e.msgId === s.msgId)
                                    return i;
                                if (null != e && null != s && null != s.cliMsgId && e.cliMsgId === s.cliMsgId && e.fromUid === s.fromUid && e.toUid === s.toUid)
                                    return i
                            }
                        }
                    }
                    return null
                }
                )();
                return t.topics.length < Object(Qa.c)() || i ? {
                    enable: !0,
                    oldTopic: i
                } : {
                    enable: !1,
                    oldTopic: null
                }
            }
            clearTopics(e) {
                this.DataRepository.loadPinTopics(e).then((t=>{
                    this.DataRepository.clearPinTopicsForConversation(e),
                    this.MessageLoader.removeMessages(t.topics),
                    this.notifyChangeEvent(e, [])
                }
                )).catch()
            }
            getRequestID() {
                return this.requestID.next()
            }
            async fetchTopicsForHandleTopLevelErrors(e, t) {
                return await this.DataRepository.loadPinTopics(e, t)
            }
            async handleTopLevelErrorInvalidBoardVersion(e, t, s) {
                const {conversationId: i} = t;
                try {
                    const e = await this.fetchTopicsForHandleTopLevelErrors(i, Za.c.OUT_OF_DATE);
                    return s ? await s() : e
                } catch (n) {
                    return Promise.reject(e)
                }
            }
            async handleTopLevelErrorRolledData(e, t) {
                const {conversationId: s} = t;
                try {
                    const t = await this.fetchTopicsForHandleTopLevelErrors(s, Za.c.ROLLED_DATA);
                    return this.notifyChangeEvent(t.conversationId, t.topics),
                    Promise.reject({
                        code: Za.a.TOPIC_NOT_IN_PIN_LIST,
                        message: e.message || "STR_PIN_GENERAL_ERROR"
                    })
                } catch (i) {
                    return Promise.reject(e)
                }
            }
            async handleTopLevelErrorUserBlockFriend(e) {
                return Promise.reject({
                    code: Za.a.USER_BLOCK_FRIEND,
                    message: e.message || "STR_TOAST_BLOCK"
                })
            }
            async handleTopLevelErrorUserNonFriend(e) {
                return Promise.reject({
                    code: Za.a.USER_NON_FRIEND,
                    message: e.message || "STR_PIN_NOT_ZALO_FRIEND"
                })
            }
            async handleTopLevelErrors(e, t, s) {
                return e.code === Za.a.INVALID_BOARD_VERSION ? await this.handleTopLevelErrorInvalidBoardVersion(e, t, s) : e.code === Za.a.TOPIC_NOT_IN_PIN_LIST ? await this.handleTopLevelErrorRolledData(e, t) : e.code === Za.a.USER_BLOCK_FRIEND ? await this.handleTopLevelErrorUserBlockFriend(e) : e.code === Za.a.USER_NON_FRIEND ? await this.handleTopLevelErrorUserNonFriend(e) : Promise.reject(e)
            }
            isValidNetwork() {
                return Yi.b.getStateNetwork() === Yi.a.CONNECTED
            }
            notifyEvent(e) {
                const t = this.events[e]
                  , s = (this.events[e] || []).length;
                for (var i = arguments.length, n = new Array(i > 1 ? i - 1 : 0), r = 1; r < i; r++)
                    n[r - 1] = arguments[r];
                for (let a = 0; a < s; a++)
                    "function" == typeof t[a] && t[a](...n)
            }
            notifyChangeEvent(e, t) {
                this.notifyEvent("onchange", e, t)
            }
            notifyExceedEvent(e, t, s) {
                this.notifyEvent("onexceed", e, t, s)
            }
            async processCreatePinTopic(e, t, s, i) {
                void 0 === i && (i = 2);
                if (!this.FriendManager.isFriend(e))
                    return Promise.reject({
                        code: Za.a.USER_NON_FRIEND,
                        message: "STR_PIN_NOT_ZALO_FRIEND"
                    });
                if (this.FriendManager.isBlocked(e))
                    return Promise.reject({
                        code: Za.a.USER_BLOCK_FRIEND,
                        message: "STR_TOAST_BLOCK"
                    });
                const n = (e,t)=>this.checkEnableToCreate(e, t, s);
                try {
                    const s = await this.DataRepository.createPinTopic(e, t, {
                        checkEnableToCreate: n
                    });
                    return this.MessageLoader.loadMessages(s.topics),
                    this.notifyChangeEvent(s.conversationId, s.topics),
                    {
                        conversationId: s.conversationId,
                        topics: s.topics
                    }
                } catch (a) {
                    try {
                        const n = await this.handleTopLevelErrors(a, {
                            conversationId: e
                        }, this.createPinTopic.bind(this, e, t, s, i - 1));
                        return {
                            conversationId: n.conversationId,
                            topics: n.topics
                        }
                    } catch (o) {
                        if (o.code === Za.a.PINBOARD_OVER_MAXIMUM) {
                            var r;
                            const s = null == o || null === (r = o.data) || void 0 === r ? void 0 : r.cache;
                            this.notifyExceedEvent(e, (null == s ? void 0 : s.topics) || [], t)
                        }
                        return Promise.reject(o)
                    }
                }
            }
            async processReorderPinTopics(e, t, s) {
                void 0 === s && (s = 2);
                try {
                    const s = await this.DataRepository.reorderPinTopics(e, t);
                    return this.notifyChangeEvent(s.conversationId, s.topics),
                    {
                        conversationId: s.conversationId,
                        topics: s.topics
                    }
                } catch (i) {
                    try {
                        const n = await this.handleTopLevelErrors(i, {
                            conversationId: e
                        }, this.reorderPinTopics.bind(this, e, t, s - 1));
                        return {
                            conversationId: n.conversationId,
                            topics: n.topics
                        }
                    } catch (n) {
                        return Promise.reject(n)
                    }
                }
            }
            async processUnpinPinTopics(e, t, s) {
                void 0 === s && (s = 2);
                try {
                    const s = await this.DataRepository.unpinTopics(e, t);
                    return this.MessageLoader.removeMessages(t),
                    this.notifyChangeEvent(s.conversationId, s.topics),
                    {
                        conversationId: s.conversationId,
                        topics: s.topics
                    }
                } catch (i) {
                    try {
                        const n = await this.handleTopLevelErrors(i, {
                            conversationId: e
                        }, this.unpinPinTopics.bind(this, e, t, s - 1));
                        return {
                            conversationId: n.conversationId,
                            topics: n.topics
                        }
                    } catch (n) {
                        return Promise.reject(n)
                    }
                }
            }
            async retryable(e, t) {
                return null != e && e < 0 ? Promise.reject({
                    code: Za.a.STOP_RETRY_CLIENT,
                    message: "STR_PIN_GENERAL_ERROR"
                }) : await t()
            }
            get DataRepository() {
                return this.dataRepository
            }
            get FriendManager() {
                return rt.default
            }
            get Logger() {
                return this.logger
            }
            get MessageLoader() {
                return this.messageLoader
            }
        }
        ) || Po) || Po) || Po) || Po) || Po);
        var No, Bo = s("74m0");
        Object(l.injectable)()(No = Object(l.singleton)(Bo.a)(No = function(e, t) {
            return Object(l.inject)(Ao)(e, void 0, 0)
        }(No = Reflect.metadata("design:type", Function)(No = Reflect.metadata("design:paramtypes", [Object])(No = class {
            constructor(e) {
                this.oneOnOneController = e
            }
            addEventListener(e, t) {
                this.OneOnOneController.addEventListener(e, t)
            }
            createPinTopic(e, t, s) {
                return Object(Ha.d)(e) ? Promise.resolve() : this.OneOnOneController.createPinTopic(e, t, s)
            }
            displayOneOnOneEntryPointPromotionalTooltip() {
                return this.OneOnOneController.displayEntryPointPromotionalTooltip()
            }
            getPinTopic(e, t, s) {
                return Object(Ha.d)(e) ? Promise.resolve() : this.OneOnOneController.getPinTopic(e, t, s)
            }
            getMessageFromTopic(e, t) {
                if (!Object(Ha.d)(e))
                    return this.OneOnOneController.getMessageFromTopic(t)
            }
            handleEventControl(e) {}
            handleOneOnOneEventsControl(e) {
                this.OneOnOneController.handleEventControl(e)
            }
            isDisplayedOneOnOneEntryPointPromotionalTooltip() {
                return this.OneOnOneController.isDisplayedEntryPointPromotionalTooltip()
            }
            isEnablePinTopicOneOnOneFeature() {
                return Qa.k()
            }
            isEnablePinTopicOneOnOneEntryPoint() {
                return Qa.j()
            }
            isMessagePinnable(e, t) {
                return !!this.isMessagePinnableForAllConversations(e) && (t !== v.CONVERSATION_TYPE.FRIEND || this.OneOnOneController.isMessagePinnable(e))
            }
            loadPinTopics(e, t) {
                return Object(Ha.d)(e) ? Promise.resolve() : this.OneOnOneController.loadPinTopics(e, t)
            }
            removeEventListener(e, t) {
                this.OneOnOneController.removeEventListener(e, t)
            }
            removeEventListeners(e) {
                this.OneOnOneController.removeEventListeners(e)
            }
            reorderPinTopics(e, t) {
                return Object(Ha.d)(e) ? Promise.resolve() : this.OneOnOneController.reorderPinTopics(e, t)
            }
            unpinPinTopics(e, t) {
                return Object(Ha.d)(e) ? Promise.resolve() : this.OneOnOneController.unpinPinTopics(e, t)
            }
            isMessagePinnableForAllConversations(e) {
                return Ka(e)
            }
            get OneOnOneController() {
                return this.oneOnOneController
            }
        }
        ) || No) || No) || No) || No);
        var Uo = s("t5n0")
          , ko = s("aQZC");
        var Go, xo = new class {
            constructor() {
                this.focusManager = void 0,
                this.focusStatus = void 0,
                this.focusService = void 0
            }
            get FSV() {
                return this.focusService || (this.focusService = l.ModuleContainer.resolve(P.ZLoggerFactory).createZLogger(kt.b.appStatus, [kt.b.focusDetectorManager])),
                this.focusService
            }
            get FM() {
                return this.focusManager || (this.focusManager = l.ModuleContainer.resolve(P.ZLoggerFactory).createZLogger(kt.b.appStatus, [kt.b.focusDetectorManager])),
                this.focusManager
            }
            get FSTT() {
                return this.focusStatus || (this.focusStatus = l.ModuleContainer.resolve(P.ZLoggerFactory).createZLogger(kt.b.appStatus, [kt.b.focusStatus])),
                this.focusStatus
            }
        }
        ;
        let zo = Object(l.injectable)()(Go = Object(w.e)()(Go = function(e, t) {
            return Object(l.inject)(c.a)(e, void 0, 0)
        }(Go = Reflect.metadata("design:type", Function)(Go = Reflect.metadata("design:paramtypes", [void 0 === c.a ? Object : c.a])(Go = class extends k.b {
            constructor(e) {
                super(),
                this.config = e,
                this.detectors = void 0,
                this.lostFocusHandler = void 0,
                this.reFocusHandler = void 0,
                this.lastFirer = void 0,
                this.enableLog = void 0,
                this.listenDetector = (e,t)=>{
                    t && (this.detectors.set(e, t),
                    this.lostFocusHandler.set(e, (()=>{
                        this.onLostFocus(e)
                    }
                    )),
                    this.reFocusHandler.set(e, (()=>{
                        this.onRefocus(e)
                    }
                    )),
                    t.idle(this.lostFocusHandler.get(e)),
                    t.wakeup(this.reFocusHandler.get(e)))
                }
                ,
                this.disposeDetector = e=>{
                    const t = this.detectors.get(e);
                    this.enableLog && xo.FM.zsymb(0, 9657, 30003, "disposeDetector", e, !!t),
                    t && (t.removeIdle(this.lostFocusHandler.get(e)),
                    t.removeWakeup(this.reFocusHandler.get(e)),
                    t.ifvisible = null,
                    t._window = null,
                    t.removeAllIpc(),
                    this.lostFocusHandler.delete(e),
                    this.reFocusHandler.delete(e),
                    this.detectors.delete(e))
                }
                ,
                this.onLostFocus = e=>{
                    this.lastFirer && (clearTimeout(this.lastFirer),
                    this.lastFirer = null),
                    this.lastFirer = setTimeout((()=>{
                        this.enableLog && xo.FM.zsymb(0, 9657, 30004, "onlostFocus", e);
                        let t = !0
                          , s = Number.MAX_SAFE_INTEGER
                          , i = "unknown";
                        this.detectors.forEach((e=>{
                            if (e.isActive())
                                t = !1;
                            else {
                                const t = e.getIdleInfo();
                                t.idleFor < s && (s = t.idleFor,
                                i = t.idleByTimeout ? "no-action-timeout" : "unknown")
                            }
                        }
                        )),
                        t && this.dispatchEvent(new Uo.a(Uo.b.LostFocus,{
                            scope: "app",
                            reason: i
                        })),
                        this.lastFirer = null
                    }
                    ), 200)
                }
                ,
                this.onRefocus = e=>{
                    this.lastFirer && (clearTimeout(this.lastFirer),
                    this.lastFirer = null),
                    this.lastFirer = setTimeout((()=>{
                        this.enableLog && xo.FM.zsymb(0, 9657, 30005, "onRefocus", e),
                        this.dispatchEvent(new Uo.a(Uo.b.Focus,e)),
                        this.lastFirer = null
                    }
                    ), 200)
                }
                ,
                this.detectors = new Map,
                this.lostFocusHandler = new Map,
                this.reFocusHandler = new Map,
                this.enableLog = !0
            }
            onAuthenticated(e) {
                const {userId: t} = e.getSession();
                this.enableLog && xo.FM.zsymb(0, 9657, 3e4, "onAuthenticated", t),
                this.init()
            }
            acquire(e, t, s, i) {
                if (!e || e == St.c)
                    return ko.b;
                if (this.detectors.has(e))
                    return xo.FM.zsymb(0, 9657, 30001, "acquire exists", e),
                    this.detectors.get(e);
                this.enableLog && xo.FM.zsymb(0, 9657, 30002, "acquire new", e);
                const n = new ko.a(t,e,s,i);
                return this.listenDetector(e, n),
                n
            }
            release(e) {
                this.disposeDetector(e)
            }
            getAppIdleTime() {
                let e = Number.MAX_SAFE_INTEGER;
                return this.detectors.forEach((t=>{
                    const s = t.getIdleInfo();
                    s.idleFor < e && (e = s.idleFor)
                }
                )),
                e
            }
            updateIdleTimeout(e) {
                this.detectors.forEach((t=>{
                    t.setIdleTimeout(e)
                }
                ))
            }
            isAppFocus() {
                let e = !1;
                return this.detectors.forEach((t=>{
                    t.isActive() && (e = !0)
                }
                )),
                e
            }
            init() {
                this.listenDetector(St.c, ko.b)
            }
        }
        ) || Go) || Go) || Go) || Go) || Go;
        const Vo = Object(l.define)("lost-focus-service")
          , $o = Object(l.define)("active-service");
        var qo, Wo, Ho = s("cHDa");
        !function(e) {
            e[e.Focus = 0] = "Focus",
            e[e.LostFocus = 1] = "LostFocus"
        }(Wo || (Wo = {}));
        let Ko = Object(l.injectable)()(qo = Object(w.e)()(qo = function(e, t) {
            return Object(l.inject)(c.a)(e, void 0, 0)
        }(qo = function(e, t) {
            return Object(l.inject)(Vo)(e, void 0, 1)
        }(qo = Reflect.metadata("design:type", Function)(qo = Reflect.metadata("design:paramtypes", [void 0 === c.a ? Object : c.a, void 0 === Vo ? Object : Vo])(qo = class {
            constructor(e, t) {
                this.config = e,
                this.service = t,
                this.enableLog = void 0,
                this.currentState = void 0,
                this.enableLog = !0,
                this.currentState = Wo.LostFocus
            }
            onAuthenticated(e) {
                const {userId: t} = e.getSession();
                this.enableLog && xo.FSTT.zsymb(0, 9656, 3e4, "onAuthenticated", t),
                this.init()
            }
            init() {
                const e = l.ModuleContainer.resolve(Uo.c);
                e.addEventListener(Uo.b.LostFocus, (e=>{
                    const {scope: t, reason: s} = e.payload;
                    this.currentState == Wo.Focus && "app" === t && (this.service.notiLostFocus(),
                    this.config.get("online_configs.enable_focus_manager") && Ho.b.setAppStatus(Ho.a.BACKGROUND),
                    this.currentState = Wo.LostFocus)
                }
                )),
                e.addEventListener(Uo.b.Focus, (e=>{
                    this.currentState == Wo.LostFocus && this.config.get("online_configs.enable_focus_manager") && Ho.b.setAppStatus(Ho.a.FOREGROUND),
                    this.currentState = Wo.Focus
                }
                ))
            }
        }
        ) || qo) || qo) || qo) || qo) || qo) || qo;
        var Qo;
        let Zo = Object(l.injectable)()(Qo = function(e, t) {
            return Object(l.inject)(c.a)(e, void 0, 0)
        }(Qo = Reflect.metadata("design:type", Function)(Qo = Reflect.metadata("design:paramtypes", [void 0 === c.a ? Object : c.a])(Qo = class {
            constructor(e) {
                this.config = e
            }
            notiLostFocus() {
                this.config.get("online_configs.enable_lost_focus") ? Xi.default.lostFocus().then(Zi.a).then((()=>{
                    xo.FSV.zsymb(0, 8612, 30001, "send noti lost success")
                }
                )).catch((e=>{
                    xo.FSV.zsymb(0, 8612, 30002, "send noti lost fail", JSON.stringify(e))
                }
                )) : xo.FSV.zsymb(0, 8612, 3e4, "call send noti lost but feat disable")
            }
        }
        ) || Qo) || Qo) || Qo) || Qo;
        var Jo = s("a8HX")
          , Xo = s("LLK0");
        var Yo, el = s("G15u");
        let tl = Object(l.injectable)()(Yo = function(e, t) {
            return Object(l.inject)(P.ZLoggerFactory)(e, void 0, 0)
        }(Yo = function(e, t) {
            return Object(l.inject)($o)(e, void 0, 1)
        }(Yo = Reflect.metadata("design:type", Function)(Yo = Reflect.metadata("design:paramtypes", [void 0 === P.ZLoggerFactory ? Object : P.ZLoggerFactory, void 0 === $o ? Object : $o])(Yo = class extends class {
            constructor() {
                this.interpreter = void 0
            }
            create(e) {
                this.interpreter = new Xo.a(this.createMachine(e),e)
            }
            get status() {
                var e;
                return (null === (e = this.interpreter) || void 0 === e ? void 0 : e.status) || Xo.b.NotStarted
            }
            start() {
                var e;
                null === (e = this.interpreter) || void 0 === e || e.start()
            }
            stop() {
                var e;
                null === (e = this.interpreter) || void 0 === e || e.stop()
            }
            send(e) {
                return this.interpreter.send(e)
            }
            onChange(e) {
                this.interpreter.onChange(e)
            }
            onTransition(e) {
                this.interpreter.onTransition(e)
            }
            onStop(e) {
                this.interpreter.onStop(e)
            }
            onDone(e) {
                this.interpreter.onDone(e)
            }
        }
        {
            constructor(e, t) {
                super(),
                this.loggerFactory = e,
                this.service = t
            }
            createMachine() {
                return e = this.loggerFactory.createZLogger(kt.b.activeDeactive, [kt.b.stateMachine]),
                t = this.service,
                Object(el.a)({
                    strict: !0,
                    id: "active-deactive",
                    context: {},
                    initial: "unset",
                    states: {
                        unset: {
                            entry: ()=>e.zsymb(3, 9805, 3e4, "unset"),
                            on: {
                                FOCUS: {
                                    actions: ()=>{
                                        e.zsymb(3, 9805, 30001, "start life cycle normal case!")
                                    }
                                    ,
                                    target: "foreground_active"
                                },
                                APP_UNLOCK: {
                                    actions: ()=>{
                                        e.zsymb(3, 9805, 30002, "start life cycle app auto lock case!")
                                    }
                                    ,
                                    target: "foreground_active"
                                },
                                LOST_FOCUS: {
                                    actions: ()=>{
                                        e.zsymb(3, 9805, 30003, "start life cycle lost focus case!")
                                    }
                                    ,
                                    target: "background_active"
                                }
                            }
                        },
                        foreground_active: {
                            entry: s=>{
                                e.zsymb(3, 9805, 30004, "state: foreground_active"),
                                t.startForegroundMode()
                            }
                            ,
                            on: {
                                IDLE: {
                                    actions: ()=>{}
                                    ,
                                    target: "background_deactive"
                                },
                                LOST_FOCUS: {
                                    actions: ()=>{}
                                    ,
                                    target: "background_active"
                                },
                                INAPP_INTERACT: {
                                    actions: ()=>{
                                        t.keepForegroundMode()
                                    }
                                },
                                OUTAPP_INTERACT: {
                                    actions: (e,s)=>{
                                        t.activeInBackground(s.isOsEvt)
                                    }
                                },
                                APP_LOCK: {
                                    target: "background_deactive"
                                },
                                APP_UNLOCK: {
                                    actions: ()=>{
                                        t.startForegroundMode()
                                    }
                                },
                                LOG_OFF: {
                                    target: "background_deactive"
                                },
                                OUTAPP_IDLE: {
                                    target: "background_deactive"
                                }
                            }
                        },
                        background_active: {
                            entry: s=>{
                                e.zsymb(3, 9805, 30005, "state: background_active"),
                                t.startBackgroundMode()
                            }
                            ,
                            on: {
                                FOCUS: {
                                    target: "foreground_active"
                                },
                                OUTAPP_INTERACT: {
                                    actions: (e,s)=>{
                                        t.activeInBackground(s.isOsEvt)
                                    }
                                },
                                OUTAPP_IDLE: {
                                    target: "background_deactive"
                                },
                                APP_LOCK: {
                                    target: "background_deactive"
                                },
                                LOG_OFF: {
                                    target: "background_deactive"
                                }
                            }
                        },
                        background_deactive: {
                            entry: (s,i)=>{
                                e.zsymb(3, 9805, 30006, "state: background_deactive", i.status),
                                t.startDeactive(i.status)
                            }
                            ,
                            on: {
                                FOCUS: {
                                    actions: ()=>{}
                                    ,
                                    target: "foreground_active"
                                },
                                OUTAPP_INTERACT: {
                                    actions: (e,s)=>{
                                        t.activeInBackground(s.isOsEvt)
                                    }
                                    ,
                                    target: "background_active"
                                },
                                APP_UNLOCK: {
                                    target: "foreground_active"
                                }
                            }
                        }
                    },
                    on: {
                        RESET: {
                            target: "unset",
                            actions: ()=>{}
                        }
                    }
                });
                var e, t
            }
            isUnset() {
                var e;
                return "unset" === (null === (e = this.interpreter) || void 0 === e ? void 0 : e.state.value)
            }
            onceDeactive(e) {
                var t;
                if ("background_deactive" === (null === (t = this.interpreter) || void 0 === t ? void 0 : t.state.value))
                    e();
                else {
                    let t = ()=>{
                        var s, i;
                        "background_deactive" === (null === (s = this.interpreter) || void 0 === s ? void 0 : s.state.value) && (null === (i = this.interpreter) || void 0 === i || i.off(t),
                        e())
                    }
                    ;
                    this.onChange(t)
                }
            }
        }
        ) || Yo) || Yo) || Yo) || Yo) || Yo;
        var sl, il = s("4zJP");
        const nl = new Map([["0", "LOCK_SCREEN"], ["1", "UNLOCK_SCREEN"], ["2", "LOG_ON"], ["3", "LOG_OFF"], ["4", "SLEEP"], ["5", "RESUME"]]);
        let rl = Object(l.injectable)()(sl = Object(w.h)()(sl = Object(w.g)()(sl = Object(l.singleton)(Jo.a)(sl = function(e, t) {
            return Object(l.inject)(c.a)(e, void 0, 0)
        }(sl = function(e, t) {
            return Object(l.inject)(P.ZLoggerFactory)(e, void 0, 1)
        }(sl = function(e, t) {
            return Object(l.inject)($o)(e, void 0, 2)
        }(sl = Reflect.metadata("design:type", Function)(sl = Reflect.metadata("design:paramtypes", [void 0 === c.a ? Object : c.a, void 0 === P.ZLoggerFactory ? Object : P.ZLoggerFactory, void 0 === $o ? Object : $o])(sl = class {
            constructor(e, t, s) {
                this.config = e,
                this.service = s,
                this.logger = void 0,
                this.machine = void 0,
                this._ipc = void 0,
                this.authenticated = void 0,
                this.appLocked = void 0,
                this.isRunning = void 0,
                this.lastConfig = void 0,
                this.onAppLock = ()=>{
                    this.logger.zsymb(0, 9679, 30003, "app locked", this.authenticated),
                    this.appLocked = !0,
                    this.authenticated && this.machine.send({
                        type: "APP_LOCK",
                        status: 2
                    })
                }
                ,
                this.onAppUnLock = ()=>{
                    this.logger.zsymb(0, 9679, 30004, "app unlocked", this.authenticated),
                    this.appLocked = !1,
                    this.authenticated && this.machine.send({
                        type: "APP_UNLOCK",
                        status: 0
                    })
                }
                ,
                this.onConfigChanged = e=>{
                    qe.default.stagingAccount && (window._activeController = this),
                    e && this.config.set("online_configs", e);
                    const t = this.isConfigsReallyChanged();
                    if (this.logger.zsymb(0, 9679, 30005, "onConfigChanged", t),
                    !t)
                        return;
                    this.lastConfig = this.config.get("online_configs");
                    const s = this.config.get("online_configs.idle_time");
                    l.ModuleContainer.resolve(Uo.c).updateIdleTimeout(s / 1e3),
                    this.service.onConfigUpdated(),
                    this.isEnable() ? this.setup() : this.onDispose()
                }
                ,
                this.onLostFocus = async e=>{
                    const {scope: t, reason: s} = e.payload;
                    "app" === t && (this.logger.zsymb(0, 9679, 30006, "lost focus", s),
                    "no-action-timeout" != s || await this.service.isUserHasAction(this.idleTime) ? this.machine.send({
                        type: "LOST_FOCUS"
                    }) : this.machine.send({
                        type: "IDLE",
                        status: 0
                    }))
                }
                ,
                this.onFocus = e=>{
                    this.isUsingApp() && (this.logger.zsymb(0, 9679, 30007, "active-deactive focus"),
                    this.machine.send({
                        type: "FOCUS"
                    }))
                }
                ,
                this.onActiveFromBackground = (e,t)=>{
                    this.isUsingApp() && this.machine.send({
                        type: "OUTAPP_INTERACT",
                        isOsEvt: t
                    })
                }
                ,
                this.onDeactiveFromBackground = (e,t)=>{
                    this.logger.zsymb(0, 9679, 30008, "onDeactiveFromBackground", t),
                    this.isUsingApp() && this.machine.send({
                        type: "OUTAPP_IDLE",
                        status: t
                    })
                }
                ,
                this.machine = l.ModuleContainer.resolveToken(tl),
                this.logger = t.createZLogger(kt.b.activeDeactive, [kt.b.controller]),
                this.config = e,
                this.service = s,
                this.authenticated = !1,
                this.appLocked = !1,
                this.isRunning = !1,
                this.lastConfig = {},
                Ft.p.listenEvent(Ft.m, this.onConfigChanged);
                try {
                    this.machine.create()
                } catch (i) {
                    return void this.logger.zsymb(18, 9679, 3e4, (()=>["create error", {
                        error: i
                    }]))
                }
            }
            get ipc() {
                if (!this._ipc) {
                    const {ipcRenderer: e} = s("vbkW");
                    this._ipc = e
                }
                return this._ipc
            }
            createMachine() {}
            onStart() {
                this.isEnable() || this.logger.zsymb(0, 9679, 30001, "feature is not enable")
            }
            setup() {
                if (this.logger.zsymb(0, 9679, 30002, "setup", this.isRunning),
                this.clearBackgroundTracking(),
                this.isEnableBackgroundTrack() && this.setupBackgroundTracking(),
                this.isRunning)
                    return;
                this.isRunning = !0,
                this.machine.start();
                const e = l.ModuleContainer.resolve(Uo.c);
                this.machine.isUnset() && (e.isAppFocus() ? this.machine.send({
                    type: "FOCUS"
                }) : this.machine.send({
                    type: "LOST_FOCUS"
                })),
                e.addEventListener(Uo.b.LostFocus, this.onLostFocus),
                e.addEventListener(Uo.b.Focus, this.onFocus),
                this.appLocked = Ft.p.getAppLock(),
                il.b.on(il.a.APP_LOCKED, this.onAppLock),
                il.b.on(il.a.APP_UNLOCKED, this.onAppUnLock)
            }
            onAuthenticated() {
                this.authenticated = !0,
                this.isEnable() && this.service.onLogin()
            }
            onDispose() {
                if (!this.isRunning)
                    return;
                this.isRunning = !1,
                this.machine.stop();
                const e = l.ModuleContainer.resolve(Uo.c);
                e.removeEventListener(Uo.b.LostFocus, this.onLostFocus),
                e.removeEventListener(Uo.b.Focus, this.onFocus),
                il.b.off(il.a.APP_LOCKED, this.onAppLock),
                il.b.off(il.a.APP_UNLOCKED, this.onAppUnLock),
                this.clearBackgroundTracking()
            }
            isConfigsReallyChanged() {
                for (const e in this.config.get("online_configs"))
                    if (e && this.lastConfig[e] !== this.config.get(`online_configs.${e}`))
                        return !0;
                return !1
            }
            setupBackgroundTracking() {}
            clearBackgroundTracking() {}
            onUserSendMessage() {
                this.isEnable() && this.machine.send("INAPP_INTERACT")
            }
            onUserLogOff() {
                return new Promise((e=>{
                    if (!this.isEnable() || !this.isUsingApp())
                        return e(!1);
                    this.machine.onceDeactive((()=>{
                        e(!0)
                    }
                    )),
                    this.machine.send({
                        type: "LOG_OFF",
                        status: 3
                    }),
                    this.onDispose(),
                    setTimeout((()=>{
                        e(!0)
                    }
                    ), 1e3)
                }
                ))
            }
            onOSEvent(e) {
                if (!this.isEnable())
                    return;
                const t = nl.get(e);
                Ze.default.send(Je.GeneralActions.USER_ACTIVE_CHANGED, t),
                this.logger.zsymb(3, 9679, 30009, "handle event os ", t)
            }
            isUsingApp() {
                const e = this.appLocked || Ft.p.getWaitRestart();
                return this.authenticated && !e
            }
            isEnable() {
                return this.config.get("online_configs.enable_active_deactive_v2")
            }
            isEnableBackgroundTrack() {
                return !1
            }
            isEnableFullBackgroundTrack() {
                return !1
            }
            get pingInterval() {
                return this.config.get("online_configs.update_action_interval")
            }
            get idleTime() {
                return this.config.get("online_configs.idle_time")
            }
        }
        ) || sl) || sl) || sl) || sl) || sl) || sl) || sl) || sl) || sl;
        var al, ol, ll, cl, dl = s("yK2b");
        !function(e) {
            e[e.ActiveBackground = 0] = "ActiveBackground",
            e[e.KeepActiveForeground = 1] = "KeepActiveForeground",
            e[e.FirstActiveForeground = 2] = "FirstActiveForeground",
            e[e.ToBackground = 3] = "ToBackground",
            e[e.KeepActiveBackground = 4] = "KeepActiveBackground"
        }(ol || (ol = {})),
        function(e) {
            e[e.Idle = 0] = "Idle",
            e[e.ComputerLock = 1] = "ComputerLock",
            e[e.AppLock = 2] = "AppLock",
            e[e.LogOff = 3] = "LogOff"
        }(ll || (ll = {})),
        function(e) {
            e[e.Foreground = 0] = "Foreground",
            e[e.BackgroundActive = 1] = "BackgroundActive",
            e[e.BackgroundDeactive = 2] = "BackgroundDeactive"
        }(cl || (cl = {}));
        const hl = {
            [cl.Foreground]: ol.KeepActiveForeground,
            [cl.BackgroundActive]: ol.KeepActiveBackground
        };
        let ul = Object(l.injectable)()(al = function(e, t) {
            return Object(l.inject)(c.a)(e, void 0, 0)
        }(al = function(e, t) {
            return Object(l.inject)(P.ZLoggerFactory)(e, void 0, 1)
        }(al = function(e, t) {
            return Object(l.inject)(Uo.c)(e, void 0, 2)
        }(al = Reflect.metadata("design:type", Function)(al = Reflect.metadata("design:paramtypes", [void 0 === c.a ? Object : c.a, void 0 === P.ZLoggerFactory ? Object : P.ZLoggerFactory, void 0 === Uo.c ? Object : Uo.c])(al = class {
            constructor(e, t, s) {
                this.config = e,
                this.focusManager = s,
                this.logger = void 0,
                this._ipc = void 0,
                this.pingTimer = void 0,
                this.deactiveTimer = void 0,
                this.status = void 0,
                this.configChanged = void 0,
                this.logger = t.createZLogger(kt.b.activeDeactive, [kt.b.service]),
                this.status = cl.Foreground,
                this.configChanged = !1
            }
            get ipc() {
                if (!this._ipc) {
                    const {ipcRenderer: e} = s("vbkW");
                    this._ipc = e
                }
                return this._ipc
            }
            get pingInterval() {
                return this.config.get("online_configs.update_action_interval")
            }
            get deactiveTimeout() {
                return this.config.get("online_configs.idleTime")
            }
            get enableSendDeactiveOnBgIdle() {
                return this.config.get("online_configs.enable_deact_on_bg_idle")
            }
            get enableSendDeactiveOnFgIdle() {
                return this.config.get("online_configs.enable_deact_on_fg_idle")
            }
            get enSendActiveToKeepAlive() {
                return this.config.get("online_configs.send_active_to_keep_live")
            }
            get enActiveUsingSocket() {
                return this.config.get("online_configs.send_active_using_socket")
            }
            get enableBackgroundTracking() {
                return this.config.get("online_configs.enable_background_tracking")
            }
            get enableFeature() {
                return this.config.get("online_configs.enable_active_deactive_v2")
            }
            get enableFullBackgroundTrack() {
                return !1
            }
            onLogin() {
                this.sendActiveToServer(ol.ActiveBackground)
            }
            startTrackIdle(e) {
                void 0 === e && (e = !0),
                this.enableBackgroundTracking ? this.logger.zsymb(0, 9648, 30001, "startTrackIdle") : this.logger.zsymb(0, 9648, 3e4, "in startTrackIdle but flag off")
            }
            stopTrackIdle() {
                this.logger.zsymb(0, 9648, 30002, "stopTrackIdle")
            }
            startForegroundMode() {
                this.status = cl.Foreground,
                this.sendActiveToServer(ol.FirstActiveForeground),
                this.clearPingTimer(),
                this.createPingTimer(),
                this.enableFullBackgroundTrack || this.stopTrackIdle()
            }
            keepForegroundMode() {
                this.sendActiveToServer(ol.KeepActiveForeground, {
                    additionText: "[Send Msg] "
                })
            }
            startBackgroundMode() {
                this.status = cl.BackgroundActive,
                this.clearPingTimer(),
                this.startTrackIdle()
            }
            activeInBackground(e) {
                const t = e ? ol.ActiveBackground : ol.KeepActiveBackground;
                this.pingTimer ? this.logger.zsymb(0, 9648, 30003, "user action bg but dont need ping because in ping interval") : this.sendActiveToServer(t)
            }
            startDeactive(e) {
                let t = -1;
                switch (e) {
                case 0:
                    t = ll.Idle;
                    break;
                case 1:
                    t = ll.ComputerLock;
                    break;
                case 2:
                    t = ll.AppLock;
                    break;
                case 3:
                    t = ll.LogOff
                }
                this.clearPingTimer(),
                -1 !== t && this.canSendDeactive(t) && this.sendDeactiveToServer(t),
                this.status === cl.Foreground && t == ll.Idle && this.startTrackIdle(!1),
                t != ll.ComputerLock && t != ll.AppLock || this.stopTrackIdle(),
                this.status = cl.BackgroundDeactive
            }
            onConfigUpdated() {
                this.configChanged = !0,
                this.enableFeature || this.clearPingTimer()
            }
            getStatus() {
                return this.status
            }
            createPingTimer() {
                !this.pingTimer && this.enableFeature && (this.logger.zsymb(0, 9648, 30004, "createPingTimer"),
                this.configChanged = !1,
                this.pingTimer = setInterval((()=>{
                    const e = hl[this.status];
                    e ? this.sendPingActive(e) : this.logger.zsymb(0, 9648, 30005, "call ping invalid state!"),
                    this.configChanged && (this.clearPingTimer(),
                    this.createPingTimer())
                }
                ), this.pingInterval))
            }
            clearPingTimer() {
                this.logger.zsymb(0, 9648, 30006, "clearPingTimer"),
                clearInterval(this.pingTimer),
                this.pingTimer = null
            }
            async isUserHasAction(e) {
                return this.focusManager.getAppIdleTime() < e
            }
            canSendDeactive(e) {
                return e !== ll.Idle || (this.status === cl.Foreground && this.enableSendDeactiveOnFgIdle || this.status === cl.BackgroundActive && this.enableSendDeactiveOnBgIdle)
            }
            async sendPingActive(e) {
                await this.isUserHasAction(this.pingInterval) ? this.sendActiveToServer(e) : this.logger.zsymb(3, 9648, 30007, "call ping but discard, because the user don't have action!")
            }
            sendActiveToServer(e, t) {
                void 0 === t && (t = {
                    additionText: ""
                });
                const {additionText: s} = t;
                if (!this.enActiveUsingSocket || dl.default.getMsgSrcType() !== v.MsgSources.SOCKET)
                    return this.sendActiveViaHttp(e, s);
                let i = null;
                return i = this.enSendActiveToKeepAlive ? Ts.default.pingActiveViaKeepAlive(e) : Ts.default.pingActive(e),
                i.then((()=>(this.logger.zsymb(3, 9648, 30008, "{}Call active app SUCCESS: socket - {}", s, e),
                !0))).catch((t=>(this.logger.zsymb(21, 9648, 30009, "{}Call active fail: socket - {} - {}", s, e, JSON.stringify(t)),
                this.sendActiveViaHttp(e))))
            }
            sendActiveViaHttp(e, t) {
                return void 0 === t && (t = ""),
                new Promise((s=>{
                    Xi.default.active(e).then(Zi.a).then((()=>{
                        this.logger.zsymb(3, 9648, 30010, "{}Call active app SUCCESS: http - {}", t, e),
                        s(!0)
                    }
                    )).catch((i=>{
                        this.logger.zsymb(21, 9648, 30011, "{}Call active fail: http - {} - {}", t, e, JSON.stringify(i)),
                        s(!1)
                    }
                    ))
                }
                ))
            }
            sendDeactiveToServer(e) {
                return Xi.default.deactiveV2().then(Zi.a).then((()=>(this.logger.zsymb(3, 9648, 30012, "Call deactive app SUCCESS {}", e),
                !0))).catch((e=>(this.logger.zsymb(21, 9648, 30013, "Call deactive fail: ", JSON.stringify(e)),
                !1)))
            }
        }
        ) || al) || al) || al) || al) || al) || al;
        l.ModuleContainer.registerSingleton(Vo, Zo),
        l.ModuleContainer.registerSingleton(Uo.c, zo),
        l.ModuleContainer.registerSingleton($o, ul),
        l.ModuleContainer.resolve(Uo.c),
        l.ModuleContainer.resolveToken(Ko),
        l.ModuleContainer.resolveToken(rl);
        var gl = s("Vp9m");
        let pl;
        !function(e) {
            e.lockSendMsg = "lockSendMsg"
        }(pl || (pl = {}));
        s("MnxE");
        var ml;
        Object(mt.b)(Qs.b)(ml = Reflect.metadata("design:type", Function)(ml = Reflect.metadata("design:paramtypes", [])(ml = class {
            get Logger() {
                return this._Logger || (this._Logger = l.ModuleContainer.resolve(P.ZLoggerFactory).createZLogger(kt.b.onlyAdminChatSettings, [this.name])),
                this._Logger
            }
            constructor() {
                this.type = void 0,
                this.name = void 0,
                this.key = void 0,
                this.settings = new Map,
                this.me = "",
                this._Logger = void 0,
                this.name = Qs.a,
                this.key = Qs.a,
                1 === qe.default.only_admin_chat_setting.enable_only_admin_chat_setting && this._addPublicGroupSettingEventListener()
            }
            _filterSettingKeys(e, t, s) {
                let i = {
                    lockSendMsg: !1
                };
                for (let n in e)
                    Object.keys(pl).includes(n) && n === pl.lockSendMsg && (i[pl.lockSendMsg] = !t && !s && Boolean(e[pl.lockSendMsg]));
                return i
            }
            _onUpdateSettings(e, t, s, i) {
                this.me || (this.me = rt.default.getUidMe());
                const n = this.me === t
                  , r = this._filterSettingKeys(i, n, s);
                return this.settings.set(e, r),
                Object(Pe.g)(this.name, e),
                r
            }
            showNoti(e) {
                if ("TOAST" === e.type)
                    gl.ZToastManagerHolder.getZToastManagerByWindowId(e.windowId || St.c).show(Object(i.a)({}, e.config))
            }
            verifySetting(e) {
                const {convId: t, field: s, showNoti: i} = e
                  , n = this.settings.get(t);
                return n ? (i && i.triggerValue === n[s] && this.showNoti(i),
                n && n[s]) : null
            }
            onSettingsUpdate(e, t) {
                let s = this.settings.get(e) || {
                    lockSendMsg: !1
                };
                for (let i in t)
                    Object.keys(pl).includes(i) && (s[i] = t[i]);
                this.settings.set(e, s),
                Object(Pe.g)(this.name, e)
            }
            _addPublicGroupSettingEventListener() {
                Nt.default.subscribeEventGroup(v.EventGroup.CHANGE_OWNER, (e=>{
                    const {groupId: t} = e;
                    t && this.onLoadGroupSetting(t)
                }
                )),
                Nt.default.subscribeEventGroup(v.EventGroup.ADD_ADMIN, (e=>{
                    const {groupId: t} = e;
                    t && this.onLoadGroupSetting(t)
                }
                )),
                Nt.default.subscribeEventGroup(v.EventGroup.REMOVE_ADMIN, (e=>{
                    const {groupId: t} = e;
                    t && this.onLoadGroupSetting(t)
                }
                )),
                Nt.default.subscribeEventGroup(v.EventGroup.GROUP_INFO_CHANGED, (e=>{
                    if (null != e && e.length)
                        for (let t = 0; t < e.length; t++)
                            this.onLoadGroupSetting(e[t])
                }
                )),
                vs.default.subscribe(St.a.CHILD_WINDOW_ALIVE, (e=>{
                    null != e && e.windowId && this.onLoadSetting(e.windowId)
                }
                )),
                Ze.default.subscribe(((e,t)=>{
                    switch (e) {
                    case Je.FetchActions.UPDATE_GROUP_SETTING:
                        {
                            var s, i;
                            const e = null != t && null !== (s = t.data) && void 0 !== s && null !== (i = s.groupId) && void 0 !== i && i.startsWith("g") ? t.data.groupId : "g" + t.data.groupId;
                            e && this.onLoadGroupSetting(e);
                            break
                        }
                    }
                }
                ))
            }
            _checkGroupAdmin(e) {
                var t;
                return this.me || (this.me = rt.default.getUidMe()),
                (null == e || null === (t = e.topMember) || void 0 === t ? void 0 : t.filter((e=>e.id === this.me && e.isAdmin)).length) > 0
            }
            onLoadGroupSetting(e) {
                return new Promise(((t,s)=>{
                    Nt.default.getFullInfoGroupById(e).then((s=>{
                        if (!s)
                            return this.Logger.zsymb(18, 8953, 3e4, "[GroupSetting]: Load GroupInfo from manager faily " + s + ", GroupId: " + e),
                            t(null);
                        const i = s.setting
                          , n = s.creatorId
                          , r = this._checkGroupAdmin(s)
                          , a = this._onUpdateSettings(e, n, r, i);
                        i && !i.hasOwnProperty("lockSendMsg") && this.Logger.zsymb(18, 8953, 30001, "[GroupSetting]: Dont have field lockSendMsg in setting data"),
                        t(a)
                    }
                    )).catch((s=>{
                        this.Logger.zsymb(18, 8953, 30002, "[GroupSetting]: Have error in loadiing GroupInfo from manager: " + JSON.stringify(s) + ", GroupId: " + e),
                        t(null)
                    }
                    ))
                }
                ))
            }
            async onLoadSetting(e) {
                return e.startsWith("g") ? 1 !== qe.default.only_admin_chat_setting.enable_only_admin_chat_setting ? null : await this.onLoadGroupSetting(e) : null
            }
            init(e) {
                throw new Error("Method not  .")
            }
            getCurrentItem(e) {
                return this.settings.get(e)
            }
            getItem(e, t) {
                return this.settings.get(e.key)
            }
            getList(e, t) {
                throw new Error("Method not implemented.")
            }
            onGetItemFailure(e, t) {
                throw new Error("Method not implemented.")
            }
            onGetListFailure(e, t) {
                throw new Error("Method not implemented.")
            }
            getDefaultItem() {
                throw new Error("Method not implemented.")
            }
            getDefaultList() {
                throw new Error("Method not implemented.")
            }
        }
        ) || ml) || ml);
        var fl = s("+eUS")
          , vl = s("wH4e");
        const bl = "render" !== __ZaBUNDLENAME__ && "WEB" !== __ZaBUNDLENAME__ && "shared-worker" !== __ZaBUNDLENAME__ && "main" !== __ZaBUNDLENAME__;
        setTimeout((async function() {
            if (bl)
                return;
            const e = l.ModuleContainer.resolve(P.ZLoggerFactory).createZLogger("bootstrap", ["shared"]);
            e.zsymb(3, 8152, 3e4, "running application bootstrap");
            try {
                const t = l.ModuleContainer.resolve(w.a);
                await t.start();
                let s = (()=>{
                    switch (__ZaBUNDLENAME__) {
                    case "WEB":
                        return vl.RunMode.Browser;
                    case "render":
                        return vl.RunMode.Host;
                    case "shared-worker":
                        return vl.RunMode.Client;
                    case "main":
                        return vl.RunMode.Background;
                    default:
                        return vl.RunMode.Unknown
                    }
                }
                )();
                Object(fl.a)(s),
                s === vl.RunMode.Browser && function() {
                    const e = Object(p.a)();
                    g.a.includes(e) || l.ModuleContainer.resolve(se).setupWriters()
                }(),
                "shared-worker" === __ZaBUNDLENAME__ && await t.init(),
                e.zsymb(3, 8152, 30001, "application bootstrap success")
            } catch (t) {
                e.zsymb(0, 8152, 30002, (()=>["application bootstrap fail", {
                    reason: t
                }]))
            }
        }
        ), 0)
    },
    rhBN: function(e, t, s) {
        "use strict";
        var i, n = s("jDHv"), r = s("UK4g"), a = s("YEoC"), o = s("DI/x"), l = s("tHMN"), c = s("LzQZ");
        let d = n.ModuleContainer.injectable()(i = function(e, t) {
            return n.ModuleContainer.inject(l.b)(e, void 0, 0)
        }(i = Reflect.metadata("design:type", Function)(i = Reflect.metadata("design:paramtypes", [void 0 === l.b ? Object : l.b])(i = class {
            constructor(e) {
                this.engine = e,
                this.currentId = 1,
                this.transactions = void 0,
                this.transactions = new Map
            }
            get(e) {
                const t = this.transactions.get(e);
                if (!t)
                    throw new o.h("The transaction has already committed!");
                return t
            }
            async beginTransaction(e, t, s) {
                const i = this.currentId++
                  , n = new Error
                  , o = await this.engine.do({
                    type: a.d.BeginTransaction,
                    database: e,
                    table: t[0],
                    transaction: i,
                    priority: a.c.BLOCKING,
                    retry: r.i,
                    timing: {},
                    meta: {
                        step: -1,
                        timeout: r.k,
                        error: n
                    },
                    params: {
                        tables: t,
                        mode: s
                    },
                    trace: ()=>{}
                });
                return this.transactions.set(i, o),
                o
            }
            commitTransaction(e) {
                const t = this.transactions.get(e);
                return !t || t.closed ? (t && this.transactions.delete(e),
                Promise.resolve()) : new Promise(((s,i)=>{
                    t.onClose((()=>{
                        this.transactions.delete(e),
                        t.error ? i(t.error) : s()
                    }
                    ))
                }
                ))
            }
            waitUntilIdle() {
                if (0 === this.transactions.size)
                    return Promise.resolve();
                const e = Array.from(this.transactions.values());
                return new Promise((t=>{
                    e.forEach((s=>{
                        s.onClose((()=>{
                            e.every((e=>e.closed)) && t()
                        }
                        ))
                    }
                    ))
                }
                ))
            }
        }
        ) || i) || i) || i) || i;
        n.ModuleContainer.registerSingleton(c.a, d)
    },
    wKPd: function(e, t, s) {
        "use strict";
        var i, n = s("jDHv"), r = s("Mgpg"), a = s("YEoC"), o = s("x9oK"), l = s("0slR");
        let c = Object(n.injectable)()(i = function(e, t) {
            return Object(n.inject)(r.ZLoggerFactory)(e, void 0, 0)
        }(i = Reflect.metadata("design:type", Function)(i = Reflect.metadata("design:paramtypes", [void 0 === r.ZLoggerFactory ? Object : r.ZLoggerFactory])(i = class {
            constructor(e) {
                this.configFactory = void 0,
                this.logger = void 0,
                this.logger = e.createZLogger("db", ["adapter-builder"])
            }
            install(e) {
                this.configFactory = e
            }
            computeDatabaseConfig(e, t) {
                return this.configFactory(e, t)
            }
            computeDatabaseName(e, t, s) {
                var i;
                const n = null !== (i = null == s ? void 0 : s.userId) && void 0 !== i ? i : "";
                return e.computeDatabaseName(n, t)
            }
            computePartitionConfig(e, t, s) {
                return e.getPartition(t, s)
            }
            computeTableConfig(e, t, s) {
                const i = e.getTableConfig(t);
                return i && (i.dbName = s),
                i
            }
            computePartitionKeyFromEntityValue(e, t) {
                const s = e.partitionField;
                if (void 0 !== s)
                    return t[s]
            }
            computePartitionKeyFromEntityKey(e, t, s) {
                void 0 === s && (s = "primary");
                const i = e.partitionField;
                if (void 0 !== i)
                    return e.getIndex(s).getValue(t, i)
            }
            async computeDatabaseAdapter(e, t) {
                const s = {
                    database: e,
                    version: t.version,
                    type: t.type
                };
                this.logger.zsymb(0, 8168, 3e4, (()=>["creating", s]));
                const i = this.getAdapterFactoryToken(t.type)
                  , r = n.ModuleContainer.resolve(i)
                  , a = await r.createAdapter(e, t);
                return this.logger.zsymb(0, 8168, 30001, (()=>["create success", s])),
                a
            }
            getAdapterFactoryToken(e) {
                let t = o.b;
                if (e === a.a.SQLite)
                    t = o.c;
                return t
            }
        }
        ) || i) || i) || i) || i;
        n.ModuleContainer.registerSingleton(l.a, c)
    }
}]);
//# sourceMappingURL=../sourcemaps/lazy/web-startup.0b3d4c580388d33744bb.js.map
