import { useState as l, useMemo as g, useEffect as E, useLayoutEffect as S, useCallback as h, useRef as L } from "react";
const G = (t, e = !0) => {
  const [n, r] = l({
    data: null,
    loading: !1,
    error: null
  }), o = g(
    () => async () => {
      r({ data: null, loading: !0, error: null });
      try {
        const c = await t();
        r({ data: c, loading: !1, error: null });
      } catch (c) {
        r({ data: null, loading: !1, error: c });
      }
    },
    [t, r]
  );
  return E(() => {
    e && o();
  }, [e, o]), {
    ...n,
    run: o
  };
};
function C(t, e) {
  try {
    return getComputedStyle(e).getPropertyValue(t);
  } catch (n) {
    return console.error("Could not get property value", n), "";
  }
}
const j = (t, e) => {
  const [n, r] = l(
    (e == null ? void 0 : e.current) ?? document.documentElement
  ), [o, c] = l(
    () => C(t, n)
  );
  return E(() => {
    e && r((e == null ? void 0 : e.current) ?? document.documentElement);
  }, [e]), E(() => {
    if (typeof t != "string" || !t.startsWith("--"))
      console.error(
        'Invalid property name. Property name must be a string and start with "--"'
      );
    else {
      const s = new MutationObserver(() => {
        const a = C(t, n);
        a !== o && c(a);
      });
      return s.observe(n, {
        attributes: !0,
        attributeFilter: ["style", "class", "id"]
      }), () => s.disconnect();
    }
  }, [t, o, n]), o;
}, U = "dark-mode", N = "change", I = window.matchMedia("(prefers-color-scheme: dark)"), J = (t) => {
  const [e, n] = l(
    t ?? I.matches
  );
  return E(() => {
    document.documentElement.classList.toggle(U, e);
  }, [e]), E(() => {
    const r = () => {
      n(!!I.matches);
    };
    return I.addEventListener(
      N,
      r
    ), () => {
      I.removeEventListener(
        N,
        r
      );
    };
  }, [n]), { isDarkMode: e, setIsDarkMode: n };
}, X = (t, e) => {
  const [n, r] = l(t);
  return E(() => {
    if (!Number.isInteger(e) || e < 0)
      console.error("Delay must be a positive integer");
    else {
      const o = setTimeout(() => {
        r(t);
      }, e);
      return () => clearTimeout(o);
    }
  }, [t, e]), n;
}, K = (t) => {
  const [e, n] = l({
    width: 0,
    height: 0
  });
  return S(() => {
    if (!t.current)
      return;
    const r = t.current;
    n({
      width: t.current.offsetWidth,
      height: t.current.offsetHeight
    });
    const o = new ResizeObserver((c) => {
      for (const s of c)
        s.contentBoxSize && n({
          width: s.target.offsetWidth,
          height: s.target.offsetHeight
        });
    });
    return o.observe(r), () => {
      o && o.unobserve(r);
    };
  }, [t]), e;
}, Z = (t) => {
  const [e, n] = l(), [r, o] = l(!1), [c, s] = l(null);
  return { load: h(
    async (m, i = {}) => {
      s(null), o(!0);
      try {
        const u = await fetch(m, i);
        if (!u.ok)
          throw new Error(
            "Network response to fetch() was unsuccessful." + u.statusText
          );
        const d = await u.json();
        n(t ? t(d) : d), o(!1);
      } catch (u) {
        u instanceof Error ? s(`Load operation could not be completed: ${u.message}`) : s("An unknown error occurred."), o(!1);
      }
    },
    [o, n, s, t]
  ), data: e, loading: r, error: c };
}, x = () => {
  const [t, e] = l({
    latitude: null,
    longitude: null,
    error: null
  }), n = h(() => {
    "geolocation" in navigator ? navigator.geolocation.getCurrentPosition(
      (r) => {
        e({
          latitude: r.coords.latitude,
          longitude: r.coords.longitude,
          error: null
        });
      },
      (r) => {
        e((o) => ({
          ...o,
          error: r.message
        }));
      }
    ) : e((r) => ({
      ...r,
      error: "Geolocation is not available in this browser."
    }));
  }, [e]);
  return E(() => {
    n();
  }, [n]), { location: t, getLocation: n };
}, q = (t = !1) => {
  const [e, n] = l(!1), r = L(null), o = h(() => {
    n(!0);
  }, [n]), c = h(() => {
    n(!1);
  }, [n]), s = g(() => {
    const a = ["mouseenter"], m = ["mouseleave"];
    return t && (a.push("touchstart"), m.push("touchend")), { activeEvents: a, inactiveEvents: m };
  }, [t]);
  return S(() => {
    const a = r == null ? void 0 : r.current;
    if (!a)
      return;
    const { activeEvents: m, inactiveEvents: i } = s;
    return m.forEach(
      (u) => a.addEventListener(u, o)
    ), i.forEach(
      (u) => a.addEventListener(u, c)
    ), () => {
      m.forEach(
        (u) => a.removeEventListener(u, o)
      ), i.forEach(
        (u) => a.removeEventListener(u, c)
      );
    };
  }, [s, o, c, r]), { ref: r, hasHover: e };
}, M = [
  "mousemove",
  "mousedown",
  "resize",
  "keydown",
  "touchstart",
  "touchmove",
  "wheel"
], _ = "visibilitychange", ee = (t) => {
  const [e, n] = l(!1);
  return E(() => {
    let r;
    const o = () => {
      r && clearTimeout(r), r = setTimeout(() => {
        n(!0);
      }, t);
    }, c = () => {
      e && n(!1), o();
    }, s = () => {
      document.hidden || c();
    };
    return M.forEach(
      (a) => document.addEventListener(a, c)
    ), document.addEventListener(_, s), o(), () => {
      M.forEach(
        (a) => document.removeEventListener(a, c)
      ), document.removeEventListener(_, s), clearTimeout(r);
    };
  }, [t, e]), e;
}, te = (t) => {
  const e = L(null), [n, r] = l(null);
  return S(() => {
    const o = e == null ? void 0 : e.current;
    if (!o)
      throw new Error("useIntersectionObserver ref is not defined");
    const c = new IntersectionObserver(
      ([s]) => {
        r(s);
      },
      {
        root: t.root ?? null,
        rootMargin: t.rootMargin ?? "0px",
        threshold: t.threshold ?? 0
      }
    );
    return c.observe(o), () => {
      c.unobserve(o);
    };
  }, [r, t]), { ref: e, entry: n };
}, ne = (t = []) => {
  const [e, n] = l([...t]), r = g(() => e[0], [e]), o = g(() => e.slice(1), [e]), c = g(() => e.length, [e]), s = h((d) => e[d], [e]), a = h(
    (d) => {
      n((f) => [d, ...f]);
    },
    [n]
  ), m = h(
    (d) => {
      n((f) => [...f, d]);
    },
    [n]
  );
  return {
    items: e,
    head: r,
    tail: o,
    size: c,
    itemAt: s,
    prepend: a,
    append: m,
    remove: (d) => {
      n((f) => {
        const w = [...f];
        return w.splice(d, 1), w;
      });
    },
    update: (d, f) => {
      n((w) => {
        const b = [...w];
        return b[d] = f, b;
      });
    }
  };
}, re = (t, e) => {
  const [n, r] = l(() => {
    try {
      const s = localStorage.getItem(t);
      if (s !== null)
        return JSON.parse(s);
    } catch (s) {
      console.error(`Error parsing stored value for key "${t}": ${s}`);
    }
    return e;
  }), o = h(
    (s) => {
      r(s);
      try {
        localStorage.setItem(t, JSON.stringify(s));
      } catch (a) {
        console.error(`Error setting stored value for key "${t}": ${a}`);
      }
    },
    [r, t]
  ), c = h(() => {
    r(e);
    try {
      localStorage.removeItem(t);
    } catch (s) {
      console.error(`Error deleting stored value for key "${t}": ${s}`);
    }
  }, [r, t, e]);
  return { value: n, setStoredValue: o, deleteStoredValue: c };
}, O = "change", oe = (t) => {
  const [e, n] = l(!1);
  return S(() => {
    const r = window.matchMedia(t), o = (c) => {
      n(c.matches);
    };
    return n(r.matches), r.addEventListener(
      O,
      (c) => o(c)
    ), () => r.removeEventListener(O, o);
  }, [t]), e;
}, D = "mousemove", se = () => {
  const [t, e] = l({ x: 0, y: 0 }), n = h(
    (r) => {
      e({ x: r.clientX, y: r.clientY });
    },
    [e]
  );
  return S(() => (document.addEventListener(D, n), () => document.removeEventListener(D, n)), [n]), t;
}, R = "online", $ = "offline", ce = () => {
  const [t, e] = l(navigator.onLine);
  return E(() => {
    const n = () => e(!0), r = () => e(!1);
    return window.addEventListener(R, n), window.addEventListener($, r), () => {
      window.removeEventListener(R, n), window.removeEventListener($, r);
    };
  }, [e]), t;
}, T = (t, e) => {
  const n = [];
  for (let r = t; r <= e; r++)
    n.push(r);
  return n;
}, W = T(97, 122), k = T(65, 90), Y = T(48, 57), B = T(33, 47), F = (t) => {
  let e, n, r;
  const o = [...t];
  for (r = o.length - 1; r > 0; r--)
    e = Math.floor(Math.random() * (r + 1)), n = o[r], o[r] = o[e], o[e] = n;
  return o;
}, ae = (t) => {
  const [e, n] = l(""), [r, o] = l((t == null ? void 0 : t.length) ?? 12), [c, s] = l(!!(t != null && t.symbols)), [a, m] = l(!!(t != null && t.numbers)), [i, u] = l(!!(t != null && t.uppercase)), d = g(() => {
    const w = [[...W]];
    return i && w.push([...k]), a && w.push([...Y]), c && w.push([...B]), w;
  }, [a, c, i]), f = h(() => {
    const w = [];
    for (let v = 0; v < r; v++) {
      const A = d[v % d.length], z = Math.floor(Math.random() * A.length);
      w.push(A[z]);
    }
    return F(w).map((v) => String.fromCharCode(v)).join("");
  }, [r, d]);
  return E(() => {
    n(f());
  }, [
    c,
    a,
    i,
    r,
    f
  ]), {
    value: e,
    length: r,
    setLength: o,
    symbols: c,
    includeSymbols: s,
    numbers: a,
    includeNumbers: m,
    uppercase: i,
    includeUppercase: u
  };
}, H = "scroll", ie = () => {
  const [t, e] = l({
    x: window.scrollX,
    y: window.scrollY
  }), n = h(() => {
    e({
      x: window.scrollX,
      y: window.scrollY
    });
  }, [e]);
  return S(() => (window.addEventListener(H, n), () => window.removeEventListener(H, n)), [n]), t;
}, ue = (t, e) => {
  const [n, r] = l(() => {
    try {
      const s = sessionStorage.getItem(t);
      return s ? JSON.parse(s) : e;
    } catch (s) {
      return console.error(`Error reading session storage key "${t}":`, s), e;
    }
  }), o = h(
    (s) => {
      try {
        const a = s instanceof Function ? s(s) : s;
        r(a), sessionStorage.setItem(t, JSON.stringify(a));
      } catch (a) {
        console.error(`Error writing session storage key "${t}":`, a);
      }
    },
    [r, t]
  ), c = h(() => {
    r(void 0);
    try {
      sessionStorage.removeItem(t);
    } catch (s) {
      console.error(`Error deleting session storage key "${t}":`, s);
    }
  }, [r, t]);
  return { value: n, setStoredValue: o, deleteStoredValue: c };
}, p = (t, e) => t >= 0 && t < e, le = (t = [], e = !1) => {
  const [n, r] = l([...t]), [o, c] = l(0);
  return { slides: n, activeSlideIndex: o, addSlide: (i, u) => {
    const d = [...n];
    u !== void 0 && p(u, n.length) ? (d.splice(u, 0, i), r(d)) : (d.push(i), r(d));
  }, removeSlide: (i) => {
    if (p(i, n.length)) {
      const u = n.filter((d, f) => f !== i);
      r(u), i === o && c(Math.max(i, 0));
    } else
      console.error(`Invalid slide index: ${i}`);
  }, activateSlide: (i) => {
    e ? i < 0 ? c(n.length - 1) : i >= n.length ? c(0) : c(i) : !e && p(i, n.length) ? c(i) : console.error(`Invalid slide index: ${i}`);
  } };
}, de = (t = []) => {
  const [e, n] = l([...t]), r = h(
    (u) => {
      n((d) => [...d, u]);
    },
    [n]
  ), o = h(() => {
    if (e.length === 0)
      return;
    const u = e.pop();
    return n([...e]), u;
  }, [e, n]), c = h(() => {
    if (e.length !== 0)
      return e[e.length - 1];
  }, [e]), s = h(() => {
    n([]);
  }, [n]), a = h(
    (u) => e.includes(u),
    [e]
  ), m = h(() => [...e], [e]), i = g(() => e.length, [e]);
  return {
    items: e,
    size: i,
    push: r,
    pop: o,
    peek: c,
    clear: s,
    contains: a,
    toArray: m
  };
}, y = (t, e) => t >= 0 && t < e, he = () => {
  const [t, e] = l([]), [n, r] = l(0);
  return { tabs: t, activeTab: n, addTab: (a, m) => {
    const i = [...t];
    return m !== void 0 && y(m, t.length) ? (i.splice(m, 0, a), e(i), m) : (i.push(a), e(i), t.length - 1);
  }, removeTab: (a) => {
    if (y(a, t.length))
      e((m) => m.filter((i, u) => u !== a)), r(Math.max(0, a - 1));
    else
      throw new Error(`Invalid tab index: ${a}`);
  }, activateTab: (a) => {
    if (y(a, t.length))
      r(a);
    else
      throw new Error(`Invalid tab index: ${a}`);
  } };
}, me = (t, e = 400) => {
  const [n, r] = l(t), o = L(Date.now()), c = L(null);
  return E(() => {
    if (!Number.isInteger(e) || e < 0)
      throw new Error("Throttle interval must be a positive integer");
    const s = Date.now(), a = s - o.current;
    return a > e ? (r(t), o.current = s) : (c.current && window.clearTimeout(c.current), c.current = window.setTimeout(() => {
      r(t), o.current = Date.now();
    }, e - a)), () => {
      c.current && window.clearTimeout(c.current);
    };
  }, [t, e]), n;
}, fe = (t, e, n, r = !1) => {
  if (t < 0 || e < 0 || n < 0)
    throw new Error(
      "Initial value, maximum value, and interval must be non-negative"
    );
  const [o, c] = l(t), [s, a] = l(-1), [m, i] = l(!1);
  E(() => () => clearInterval(s), [s]);
  const u = h(() => {
    clearInterval(s), a(-1), i(!1);
  }, [s, a]), d = h(() => {
    c((v) => v >= e ? r ? t : v : v + 1);
  }, [e, r, c, t]), f = h(() => {
    clearInterval(s);
    const v = window.setInterval(() => d(), n);
    a(v), i(!0);
  }, [s, a, d, n, i]), w = h(
    (v) => {
      if (v < 0 || v > e)
        throw new Error(`Index out of range: ${v}`);
      clearInterval(s), c(v), m && f();
    },
    [s, c, e, m, f]
  ), b = h(() => {
    w(t);
  }, [w, t]);
  return { index: o, pause: u, play: f, reset: b, goToIndex: w, running: m };
}, we = () => {
  const [t, e] = l([]), [n, r] = l([]), o = h((i, u) => {
    if (i.length === 0)
      throw new Error("The source stack contains no actions to swap");
    const d = [...i], f = [...u];
    return f.push(d.pop()), [d, f];
  }, []);
  return { actions: t, redo: () => {
    try {
      const [i, u] = o(n, t);
      r(i), e(u);
    } catch (i) {
      throw new Error(`Could not redo an action. ${i}`);
    }
  }, undo: () => {
    try {
      const [i, u] = o(t, n);
      e(i), r(u);
    } catch (i) {
      throw new Error(`Could not undo an action. ${i}`);
    }
  }, takeAction: (i) => {
    i == null && console.error("Cannot take an undefined or null action"), e([...t, i]), r([]);
  }, clearActions: () => {
    e([]), r([]);
  } };
}, V = "resize", P = "change", ve = () => {
  const [t, e] = l({
    width: window.innerWidth,
    height: window.innerHeight
  }), n = h(() => {
    e({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, [e]);
  return S(() => (window.addEventListener(V, n), screen.orientation.addEventListener(
    P,
    n
  ), () => {
    window.removeEventListener(V, n), screen.orientation.removeEventListener(
      P,
      n
    );
  }), [n]), t;
};
export {
  G as useAsyn,
  j as useCustomCSSProp,
  J as useDarkMode,
  X as useDebounce,
  K as useElementSize,
  Z as useFetch,
  x as useGeolocation,
  q as useHover,
  ee as useIdleTimeout,
  te as useIntersectionObserver,
  ne as useList,
  re as useLocalStorage,
  oe as useMediaQuery,
  se as useMousePosition,
  ce as useOnlineStatus,
  ae as useRandomString,
  ie as useScrollPosition,
  ue as useSessionStorage,
  le as useSlideshow,
  de as useStack,
  he as useTabs,
  me as useThrottle,
  fe as useTimedCounter,
  we as useUndoRedo,
  ve as useWindowSize
};
