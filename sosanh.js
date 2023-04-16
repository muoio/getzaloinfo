s = N.a.MD5(t.zcid_ext).toString().toUpperCase();
const a = ((e,s)=>{const {even: a} = A.processStr(e)  , {even: n, odd: i} = A.processStr(s);if (!a || !n || !i)    return !1;const o = a.slice(0, 8).join("") + n.slice(0, 12).join("") + i.reverse().slice(0, 12).join("");return t.encryptKey = o,!0
}
)(s, t.zcid);


function processStr(e) {
    if (!e || "string" != typeof e)
        return {
            even: null,
            odd: null
        };
    const [t,s] = [...e].reduce(((e,t,s)=>(e[s % 2].push(t),
    e)), [[], []]);
    return {
        even: t,
        odd: s
    
    }
}

["8","9","3","6","2","5","8","3","5","5","9","8","3","0","5","7","8","1","D","9","D","B","B","8","3","0","E","E","A","0","E","8","E","3","7","F","0","6","8","F","1","7","5","F","4","0","C","E","7","A","5","D","0","1","8","E","D","B","8","6","D","7","A","B","2","1","F","F","C","0","B","8","8","0","6","5","5","5","B","0","4","C","A","0","7","B","4","9","B","3","9","7","4","0","F","5"]