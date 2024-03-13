import { useState as l, useMemo as S, useEffect as v, useLayoutEffect as E, useCallback as h, useRef as L } from "react";
const F = (t, e = !0) => {
  const [n, r] = l({
    data: null,
    loading: !1,
    error: null
  }), s = S(
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
  return v(() => {
    e && s();
  }, [e, s]), {
    ...n,
    run: s
  };
};
function C(t, e) {
  try {
    return getComputedStyle(e).getPropertyValue(t);
  } catch (n) {
    return console.error("Could not get property value", n), "";
  }
}
const Q = (t, e) => {
  const [n, r] = l(
    (e == null ? void 0 : e.current) ?? document.documentElement
  ), [s, c] = l(
    () => C(t, n)
  );
  return v(() => {
    e && r((e == null ? void 0 : e.current) ?? document.documentElement);
  }, [e]), v(() => {
    if (typeof t != "string" || !t.startsWith("--"))
      console.error(
        'Invalid property name. Property name must be a string and start with "--"'
      );
    else {
      const o = new MutationObserver(() => {
        const i = C(t, n);
        i !== s && c(i);
      });
      return o.observe(n, {
        attributes: !0,
        attributeFilter: ["style", "class", "id"]
      }), () => o.disconnect();
    }
  }, [t, s, n]), s;
}, z = "dark-mode", M = "change", I = window.matchMedia("(prefers-color-scheme: dark)"), j = (t) => {
  const [e, n] = l(
    t ?? I.matches
  );
  return v(() => {
    document.documentElement.classList.toggle(z, e);
  }, [e]), v(() => {
    const r = () => {
      n(!!I.matches);
    };
    return I.addEventListener(
      M,
      r
    ), () => {
      I.removeEventListener(
        M,
        r
      );
    };
  }, [n]), { isDarkMode: e, setIsDarkMode: n };
}, G = (t, e) => {
  const [n, r] = l(t);
  return v(() => {
    if (!Number.isInteger(e) || e < 0)
      console.error("Delay must be a positive integer");
    else {
      const s = setTimeout(() => {
        r(t);
      }, e);
      return () => {
        clearTimeout(s);
      };
    }
  }, [t, e]), n;
}, J = (t) => {
  const [e, n] = l({
    width: 0,
    height: 0
  });
  return E(() => {
    if (!t.current)
      return;
    const r = t.current;
    n({
      width: t.current.offsetWidth,
      height: t.current.offsetHeight
    });
    const s = new ResizeObserver((c) => {
      for (const o of c)
        o.contentBoxSize && n({
          width: o.target.offsetWidth,
          height: o.target.offsetHeight
        });
    });
    return s.observe(r), () => {
      s && s.unobserve(r);
    };
  }, [t]), e;
}, X = (t) => {
  const [e, n] = l(), [r, s] = l(!1), [c, o] = l(null);
  return { load: h(
    async (m, a = {}) => {
      o(null), s(!0);
      try {
        const u = await fetch(m, a);
        if (!u.ok)
          throw new Error(
            "Network response to fetch() was unsuccessful." + u.statusText
          );
        const d = await u.json();
        n(t ? t(d) : d), s(!1);
      } catch (u) {
        u instanceof Error ? o(`Load operation could not be completed: ${u.message}`) : o("An unknown error occurred."), s(!1);
      }
    },
    [s, n, o, t]
  ), data: e, loading: r, error: c };
}, K = () => {
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
        e((s) => ({
          ...s,
          error: r.message
        }));
      }
    ) : e((r) => ({
      ...r,
      error: "Geolocation is not available in this browser."
    }));
  }, [e]);
  return v(() => {
    n();
  }, [n]), { location: t, getLocation: n };
}, Z = (t = !1) => {
  const [e, n] = l(!1), r = L(null), s = h(() => {
    n(!0);
  }, [n]), c = h(() => {
    n(!1);
  }, [n]);
  return E(() => {
    const o = r.current;
    if (!o)
      return;
    const i = ["mouseenter"], m = ["mouseleave"];
    return t && (i.push("touchstart"), m.push("touchend")), i.forEach(
      (a) => o.addEventListener(a, s)
    ), m.forEach(
      (a) => o.addEventListener(a, c)
    ), () => {
      o.removeEventListener("mouseenter", s), o.removeEventListener("mouseleave", c);
    };
  }, [c, s, t]), { ref: r, hasHover: e };
}, N = [
  "mousemove",
  "mousedown",
  "resize",
  "keydown",
  "touchstart",
  "touchmove",
  "wheel"
], x = (t) => {
  const [e, n] = l(!1);
  return v(() => {
    let r;
    const s = () => {
      r && clearTimeout(r), r = setTimeout(() => {
        n(!0);
      }, t);
    }, c = () => {
      e && n(!1), s();
    }, o = () => {
      document.hidden || c();
    };
    return N.forEach(
      (i) => document.addEventListener(i, c)
    ), document.addEventListener("visibilitychange", o), s(), () => {
      N.forEach(
        (i) => document.removeEventListener(i, c)
      ), document.removeEventListener("visibilitychange", o), clearTimeout(r);
    };
  }, [t, e]), e;
}, q = (t) => {
  const e = L(null), [n, r] = l(null);
  return E(() => {
    const s = e == null ? void 0 : e.current;
    if (!s)
      throw new Error("useIntersectionObserver ref is not defined");
    const c = new IntersectionObserver(
      ([o]) => {
        r(o);
      },
      {
        root: t.root ?? null,
        rootMargin: t.rootMargin ?? "0px",
        threshold: t.threshold ?? 0
      }
    );
    return c.observe(s), () => {
      c.unobserve(s);
    };
  }, [r, t]), { ref: e, entry: n };
}, ee = (t = []) => {
  const [e, n] = l([...t]), r = S(() => e[0], [e]), s = S(() => e.slice(1), [e]), c = S(() => e.length, [e]), o = h((d) => e[d], [e]), i = h(
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
    tail: s,
    size: c,
    itemAt: o,
    prepend: i,
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
}, te = (t, e) => {
  const [n, r] = l(() => {
    try {
      const o = localStorage.getItem(t);
      if (o !== null)
        return JSON.parse(o);
    } catch (o) {
      console.error(`Error parsing stored value for key "${t}": ${o}`);
    }
    return e;
  }), s = h(
    (o) => {
      r(o);
      try {
        localStorage.setItem(t, JSON.stringify(o));
      } catch (i) {
        console.error(`Error setting stored value for key "${t}": ${i}`);
      }
    },
    [r, t]
  ), c = h(() => {
    r(e);
    try {
      localStorage.removeItem(t);
    } catch (o) {
      console.error(`Error deleting stored value for key "${t}": ${o}`);
    }
  }, [r, t, e]);
  return { value: n, setStoredValue: s, deleteStoredValue: c };
}, O = "change", ne = (t) => {
  const [e, n] = l(!1);
  return E(() => {
    const r = window.matchMedia(t), s = (c) => {
      n(c.matches);
    };
    return n(r.matches), r.addEventListener(
      O,
      (c) => s(c)
    ), () => r.removeEventListener(O, s);
  }, [t]), e;
}, _ = "mousemove", re = () => {
  const [t, e] = l({ x: 0, y: 0 }), n = h(
    (r) => {
      e({ x: r.clientX, y: r.clientY });
    },
    [e]
  );
  return E(() => (document.addEventListener(_, n), () => document.removeEventListener(_, n)), [n]), t;
}, D = "online", R = "offline", oe = () => {
  const [t, e] = l(navigator.onLine);
  return v(() => {
    const n = () => e(!0), r = () => e(!1);
    return window.addEventListener(D, n), window.addEventListener(R, r), () => {
      window.removeEventListener(D, n), window.removeEventListener(R, r);
    };
  }, [e]), t;
}, p = (t, e) => {
  const n = [];
  for (let r = t; r <= e; r++)
    n.push(r);
  return n;
}, V = p(97, 122), U = p(65, 90), W = p(48, 57), k = p(33, 47), Y = (t) => {
  let e, n, r;
  const s = [...t];
  for (r = s.length - 1; r > 0; r--)
    e = Math.floor(Math.random() * (r + 1)), n = s[r], s[r] = s[e], s[e] = n;
  return s;
}, se = (t) => {
  const [e, n] = l(""), [r, s] = l((t == null ? void 0 : t.length) ?? 12), [c, o] = l(!!(t != null && t.symbols)), [i, m] = l(!!(t != null && t.numbers)), [a, u] = l(!!(t != null && t.uppercase)), d = S(() => {
    const w = [[...V]];
    return a && w.push([...U]), i && w.push([...W]), c && w.push([...k]), w;
  }, [i, c, a]), f = h(() => {
    const w = [];
    for (let g = 0; g < r; g++) {
      const A = d[g % d.length], P = Math.floor(Math.random() * A.length);
      w.push(A[P]);
    }
    return Y(w).map((g) => String.fromCharCode(g)).join("");
  }, [r, d]);
  return v(() => {
    n(f());
  }, [
    c,
    i,
    a,
    r,
    f
  ]), {
    value: e,
    length: r,
    setLength: s,
    symbols: c,
    includeSymbols: o,
    numbers: i,
    includeNumbers: m,
    uppercase: a,
    includeUppercase: u
  };
}, ce = () => {
  const [t, e] = l({
    x: window.scrollX,
    y: window.scrollY
  }), n = h(() => {
    e({
      x: window.scrollX,
      y: window.scrollY
    });
  }, [e]);
  return E(() => (window.addEventListener("scroll", n), () => window.removeEventListener("scroll", n)), [n]), t;
}, ae = (t, e) => {
  const [n, r] = l(() => {
    try {
      const o = sessionStorage.getItem(t);
      return o ? JSON.parse(o) : e;
    } catch (o) {
      return console.error(`Error reading session storage key "${t}":`, o), e;
    }
  }), s = h(
    (o) => {
      try {
        const i = o instanceof Function ? o(o) : o;
        r(i), sessionStorage.setItem(t, JSON.stringify(i));
      } catch (i) {
        console.error(`Error writing session storage key "${t}":`, i);
      }
    },
    [r, t]
  ), c = h(() => {
    r(void 0);
    try {
      sessionStorage.removeItem(t);
    } catch (o) {
      console.error(`Error deleting session storage key "${t}":`, o);
    }
  }, [r, t]);
  return { value: n, setStoredValue: s, deleteStoredValue: c };
}, T = (t, e) => t >= 0 && t < e, ie = (t = [], e = !1) => {
  const [n, r] = l([...t]), [s, c] = l(0);
  return { slides: n, activeSlideIndex: s, addSlide: (a, u) => {
    const d = [...n];
    u !== void 0 && T(u, n.length) ? (d.splice(u, 0, a), r(d)) : (d.push(a), r(d));
  }, removeSlide: (a) => {
    if (T(a, n.length)) {
      const u = n.filter((d, f) => f !== a);
      r(u), a === s && c(Math.max(a, 0));
    } else
      console.error(`Invalid slide index: ${a}`);
  }, activateSlide: (a) => {
    e ? a < 0 ? c(n.length - 1) : a >= n.length ? c(0) : c(a) : !e && T(a, n.length) ? c(a) : console.error(`Invalid slide index: ${a}`);
  } };
}, le = (t = []) => {
  const [e, n] = l([...t]), r = h(
    (u) => {
      n((d) => [...d, u]);
    },
    [n]
  ), s = h(() => {
    if (e.length === 0)
      return;
    const u = e.pop();
    return n([...e]), u;
  }, [e, n]), c = h(() => {
    if (e.length !== 0)
      return e[e.length - 1];
  }, [e]), o = h(() => {
    n([]);
  }, [n]), i = h(
    (u) => e.includes(u),
    [e]
  ), m = h(() => [...e], [e]), a = S(() => e.length, [e]);
  return {
    items: e,
    size: a,
    push: r,
    pop: s,
    peek: c,
    clear: o,
    contains: i,
    toArray: m
  };
}, y = (t, e) => t >= 0 && t < e, ue = () => {
  const [t, e] = l([]), [n, r] = l(0);
  return { tabs: t, activeTab: n, addTab: (i, m) => {
    const a = [...t];
    return m !== void 0 && y(m, t.length) ? (a.splice(m, 0, i), e(a), m) : (a.push(i), e(a), t.length - 1);
  }, removeTab: (i) => {
    if (y(i, t.length))
      e((m) => m.filter((a, u) => u !== i)), r(Math.max(0, i - 1));
    else
      throw new Error(`Invalid tab index: ${i}`);
  }, activateTab: (i) => {
    if (y(i, t.length))
      r(i);
    else
      throw new Error(`Invalid tab index: ${i}`);
  } };
}, de = (t, e = 400) => {
  const [n, r] = l(t), s = L(Date.now()), c = L(null);
  return v(() => {
    if (!Number.isInteger(e) || e < 0)
      throw new Error("Throttle interval must be a positive integer");
    const o = Date.now(), i = o - s.current;
    return i > e ? (r(t), s.current = o) : (c.current && window.clearTimeout(c.current), c.current = window.setTimeout(() => {
      r(t), s.current = Date.now();
    }, e - i)), () => {
      c.current && window.clearTimeout(c.current);
    };
  }, [t, e]), n;
}, he = (t, e, n, r = !1) => {
  if (t < 0 || e < 0 || n < 0)
    throw new Error(
      "Initial value, maximum value, and interval must be non-negative"
    );
  const [s, c] = l(t), [o, i] = l(-1), [m, a] = l(!1);
  v(() => () => clearInterval(o), [o]);
  const u = h(() => {
    clearInterval(o), i(-1), a(!1);
  }, [o, i]), d = h(() => {
    c((g) => g >= e ? r ? t : g : g + 1);
  }, [e, r, c, t]), f = h(() => {
    clearInterval(o);
    const g = window.setInterval(() => d(), n);
    i(g), a(!0);
  }, [o, i, d, n, a]), w = h(
    (g) => {
      if (g < 0 || g > e)
        throw new Error(`Index out of range: ${g}`);
      clearInterval(o), c(g), m && f();
    },
    [o, c, e, m, f]
  ), b = h(() => {
    w(t);
  }, [w, t]);
  return { index: s, pause: u, play: f, reset: b, goToIndex: w, running: m };
}, me = () => {
  const [t, e] = l([]), [n, r] = l([]), s = h((a, u) => {
    if (a.length === 0)
      throw new Error("The source stack contains no actions to swap");
    const d = [...a], f = [...u];
    return f.push(d.pop()), [d, f];
  }, []);
  return { actions: t, redo: () => {
    try {
      const [a, u] = s(n, t);
      r(a), e(u);
    } catch (a) {
      throw new Error(`Could not redo an action. ${a}`);
    }
  }, undo: () => {
    try {
      const [a, u] = s(t, n);
      e(a), r(u);
    } catch (a) {
      throw new Error(`Could not undo an action. ${a}`);
    }
  }, takeAction: (a) => {
    a == null && console.error("Cannot take an undefined or null action"), e([...t, a]), r([]);
  }, clearActions: () => {
    e([]), r([]);
  } };
}, $ = "resize", H = "change", fe = () => {
  const [t, e] = l({
    width: window.innerWidth,
    height: window.innerHeight
  }), n = h(() => {
    e({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, [e]);
  return E(() => (window.addEventListener($, n), screen.orientation.addEventListener(
    H,
    n
  ), () => {
    window.removeEventListener($, n), screen.orientation.removeEventListener(
      H,
      n
    );
  }), [n]), t;
};
export {
  F as useAsyn,
  Q as useCustomCSSProp,
  j as useDarkMode,
  G as useDebounce,
  J as useElementSize,
  X as useFetch,
  K as useGeolocation,
  Z as useHover,
  x as useIdleTimeout,
  q as useIntersectionObserver,
  ee as useList,
  te as useLocalStorage,
  ne as useMediaQuery,
  re as useMousePosition,
  oe as useOnlineStatus,
  se as useRandomString,
  ce as useScrollPosition,
  ae as useSessionStorage,
  ie as useSlideshow,
  le as useStack,
  ue as useTabs,
  de as useThrottle,
  he as useTimedCounter,
  me as useUndoRedo,
  fe as useWindowSize
};
