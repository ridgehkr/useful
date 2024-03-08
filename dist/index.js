import { useState as u, useMemo as S, useEffect as g, useLayoutEffect as E, useCallback as m, useRef as I } from "react";
const B = (t, e = !0) => {
  const [n, o] = u({
    data: null,
    loading: !1,
    error: null
  }), s = S(
    () => async () => {
      o({ data: null, loading: !0, error: null });
      try {
        const r = await t();
        o({ data: r, loading: !1, error: null });
      } catch (r) {
        o({ data: null, loading: !1, error: r });
      }
    },
    [t, o]
  );
  return g(() => {
    e && s();
  }, [e, s]), {
    ...n,
    run: s
  };
};
function M(t, e) {
  try {
    return getComputedStyle(e).getPropertyValue(t);
  } catch (n) {
    return console.error("Could not get property value", n), "";
  }
}
const F = (t, e) => {
  const [n, o] = u(
    (e == null ? void 0 : e.current) ?? document.documentElement
  ), [s, r] = u(
    () => M(t, n)
  );
  return g(() => {
    e && o((e == null ? void 0 : e.current) ?? document.documentElement);
  }, [e]), g(() => {
    if (typeof t != "string" || !t.startsWith("--"))
      console.error(
        'Invalid property name. Property name must be a string and start with "--"'
      );
    else {
      const c = new MutationObserver(() => {
        const a = M(t, n);
        a !== s && r(a);
      });
      return c.observe(n, {
        attributes: !0,
        attributeFilter: ["style", "class", "id"]
      }), () => c.disconnect();
    }
  }, [t, s, n]), s;
}, H = "dark-mode", C = "change", L = window.matchMedia("(prefers-color-scheme: dark)"), Q = (t) => {
  const [e, n] = u(
    t ?? L.matches
  );
  return g(() => {
    document.documentElement.classList.toggle(H, e);
  }, [e]), g(() => {
    const o = () => {
      n(!!L.matches);
    };
    return L.addEventListener(
      C,
      o
    ), () => {
      L.removeEventListener(
        C,
        o
      );
    };
  }, [n]), { isDarkMode: e, setIsDarkMode: n };
}, j = (t, e) => {
  const [n, o] = u(t);
  return g(() => {
    if (!Number.isInteger(e) || e < 0)
      console.error("Delay must be a positive integer");
    else {
      const s = setTimeout(() => {
        o(t);
      }, e);
      return () => {
        clearTimeout(s);
      };
    }
  }, [t, e]), n;
}, G = (t) => {
  const [e, n] = u({
    width: 0,
    height: 0
  });
  return E(() => {
    if (!t.current)
      return;
    const o = t.current;
    n({
      width: t.current.offsetWidth,
      height: t.current.offsetHeight
    });
    const s = new ResizeObserver((r) => {
      for (const c of r)
        c.contentBoxSize && n({
          width: c.target.offsetWidth,
          height: c.target.offsetHeight
        });
    });
    return s.observe(o), () => {
      s && s.unobserve(o);
    };
  }, [t]), e;
}, J = (t) => {
  const [e, n] = u(), [o, s] = u(!1), [r, c] = u(null);
  return { load: m(
    async (h, i = {}) => {
      c(null), s(!0);
      try {
        const l = await fetch(h, i);
        if (!l.ok)
          throw new Error(
            "Network response to fetch() was unsuccessful." + l.statusText
          );
        const d = await l.json();
        n(t ? t(d) : d), s(!1);
      } catch (l) {
        l instanceof Error ? c(`Load operation could not be completed: ${l.message}`) : c("An unknown error occurred."), s(!1);
      }
    },
    [s, n, c, t]
  ), data: e, loading: o, error: r };
}, X = () => {
  const [t, e] = u({
    latitude: null,
    longitude: null,
    error: null
  }), n = m(() => {
    "geolocation" in navigator ? navigator.geolocation.getCurrentPosition(
      (o) => {
        e({
          latitude: o.coords.latitude,
          longitude: o.coords.longitude,
          error: null
        });
      },
      (o) => {
        e((s) => ({
          ...s,
          error: o.message
        }));
      }
    ) : e((o) => ({
      ...o,
      error: "Geolocation is not available in this browser."
    }));
  }, []);
  return g(() => {
    n();
  }, [n]), { location: t, getLocation: n };
}, K = (t = !1) => {
  const [e, n] = u(!1), o = I(null), s = m(() => {
    n(!0);
  }, [n]), r = m(() => {
    n(!1);
  }, [n]);
  return E(() => {
    const c = o.current;
    if (!c)
      return;
    const a = ["mouseenter"], h = ["mouseleave"];
    return t && (a.push("touchend"), h.push("touchend")), a.forEach(
      (i) => c.addEventListener(i, s)
    ), h.forEach(
      (i) => c.addEventListener(i, r)
    ), () => {
      c.removeEventListener("mouseenter", s), c.removeEventListener("mouseleave", r);
    };
  }, [r, s, t]), { ref: o, hasHover: e };
}, Z = (t) => {
  const [e, n] = u(!1);
  return g(() => {
    let o;
    const s = () => {
      o && clearTimeout(o), o = setTimeout(() => {
        n(!0);
      }, t);
    }, r = () => {
      e && n(!1), s();
    }, c = () => {
      document.hidden || r();
    };
    return document.addEventListener("mousemove", r), document.addEventListener("mousedown", r), document.addEventListener("resize", r), document.addEventListener("keydown", r), document.addEventListener("touchstart", r), document.addEventListener("touchmove", r), document.addEventListener("wheel", r), document.addEventListener("visibilitychange", c), s(), () => {
      document.removeEventListener("mousemove", r), document.removeEventListener("mousedown", r), document.removeEventListener("resize", r), document.removeEventListener("keydown", r), document.removeEventListener("touchstart", r), document.removeEventListener("touchmove", r), document.removeEventListener("wheel", r), document.removeEventListener("visibilitychange", r), clearTimeout(o);
    };
  }, [t, e]), e;
}, x = (t) => {
  const e = I(null), [n, o] = u(null);
  return E(() => {
    const s = e == null ? void 0 : e.current;
    if (!s)
      throw new Error("useIntersectionObserver ref is not defined");
    const r = new IntersectionObserver(
      ([c]) => {
        o(c);
      },
      {
        root: t.root ?? null,
        rootMargin: t.rootMargin ?? "0px",
        threshold: t.threshold ?? 0
      }
    );
    return r.observe(s), () => {
      r.unobserve(s);
    };
  }, [o, t]), { ref: e, entry: n };
}, q = (t = []) => {
  const [e, n] = u([...t]), o = S(() => e[0], [e]), s = S(() => e.slice(1), [e]), r = S(() => e.length, [e]), c = m((d) => e[d], [e]), a = m(
    (d) => {
      n((v) => [d, ...v]);
    },
    [n]
  ), h = m(
    (d) => {
      n((v) => [...v, d]);
    },
    [n]
  );
  return {
    items: e,
    head: o,
    tail: s,
    size: r,
    itemAt: c,
    prepend: a,
    append: h,
    remove: (d) => {
      n((v) => {
        const w = [...v];
        return w.splice(d, 1), w;
      });
    },
    update: (d, v) => {
      n((w) => {
        const b = [...w];
        return b[d] = v, b;
      });
    }
  };
}, ee = (t, e) => {
  const [n, o] = u(() => {
    try {
      const c = localStorage.getItem(t);
      if (c !== null)
        return JSON.parse(c);
    } catch (c) {
      console.error(`Error parsing stored value for key "${t}": ${c}`);
    }
    return e;
  }), s = m(
    (c) => {
      o(c);
      try {
        localStorage.setItem(t, JSON.stringify(c));
      } catch (a) {
        console.error(`Error setting stored value for key "${t}": ${a}`);
      }
    },
    [o, t]
  ), r = m(() => {
    o(e);
    try {
      localStorage.removeItem(t);
    } catch (c) {
      console.error(`Error deleting stored value for key "${t}": ${c}`);
    }
  }, [o, t, e]);
  return { value: n, setStoredValue: s, deleteStoredValue: r };
}, O = "change", te = (t) => {
  const [e, n] = u(!1);
  return E(() => {
    const o = window.matchMedia(t), s = (r) => {
      n(r.matches);
    };
    return n(o.matches), o.addEventListener(
      O,
      (r) => s(r)
    ), () => o.removeEventListener(O, s);
  }, [t]), e;
}, N = "mousemove", ne = () => {
  const [t, e] = u({ x: 0, y: 0 }), n = m(
    (o) => {
      e({ x: o.clientX, y: o.clientY });
    },
    [e]
  );
  return E(() => (document.addEventListener(N, n), () => document.removeEventListener(N, n)), [n]), t;
}, _ = "online", D = "offline", oe = () => {
  const [t, e] = u(navigator.onLine);
  return g(() => {
    const n = () => e(!0), o = () => e(!1);
    return window.addEventListener(_, n), window.addEventListener(D, o), () => {
      window.removeEventListener(_, n), window.removeEventListener(D, o);
    };
  }, [e]), t;
}, p = (t, e) => {
  const n = [];
  for (let o = t; o <= e; o++)
    n.push(o);
  return n;
}, z = p(97, 122), P = p(65, 90), U = p(48, 57), W = p(33, 47), k = (t) => {
  let e, n, o;
  const s = [...t];
  for (o = s.length - 1; o > 0; o--)
    e = Math.floor(Math.random() * (o + 1)), n = s[o], s[o] = s[e], s[e] = n;
  return s;
}, re = (t) => {
  const [e, n] = u(""), [o, s] = u((t == null ? void 0 : t.length) ?? 12), [r, c] = u(!!(t != null && t.symbols)), [a, h] = u(!!(t != null && t.numbers)), [i, l] = u(!!(t != null && t.uppercase)), d = S(() => {
    const w = [[...z]];
    return i && w.push([...P]), a && w.push([...U]), r && w.push([...W]), w;
  }, [a, r, i]), v = m(() => {
    const w = [];
    for (let f = 0; f < o; f++) {
      const A = d[f % d.length], V = Math.floor(Math.random() * A.length);
      w.push(A[V]);
    }
    return k(w).map((f) => String.fromCharCode(f)).join("");
  }, [o, d]);
  return g(() => {
    n(v());
  }, [
    r,
    a,
    i,
    o,
    v
  ]), {
    value: e,
    length: o,
    setLength: s,
    symbols: r,
    includeSymbols: c,
    numbers: a,
    includeNumbers: h,
    uppercase: i,
    includeUppercase: l
  };
}, se = () => {
  const [t, e] = u({
    x: window.scrollX,
    y: window.scrollY
  }), n = m(() => {
    e({
      x: window.scrollX,
      y: window.scrollY
    });
  }, [e]);
  return E(() => (window.addEventListener("scroll", n), () => window.removeEventListener("scroll", n)), [n]), t;
}, ce = (t, e) => {
  const [n, o] = u(() => {
    try {
      const c = sessionStorage.getItem(t);
      return c ? JSON.parse(c) : e;
    } catch (c) {
      return console.error(`Error reading session storage key "${t}":`, c), e;
    }
  }), s = m(
    (c) => {
      try {
        const a = c instanceof Function ? c(c) : c;
        o(a), sessionStorage.setItem(t, JSON.stringify(a));
      } catch (a) {
        console.error(`Error writing session storage key "${t}":`, a);
      }
    },
    [o, t]
  ), r = m(() => {
    o(void 0);
    try {
      sessionStorage.removeItem(t);
    } catch (c) {
      console.error(`Error deleting session storage key "${t}":`, c);
    }
  }, [o, t]);
  return { value: n, setStoredValue: s, deleteStoredValue: r };
}, y = (t, e) => t >= 0 && t < e, ie = (t = [], e = !1) => {
  const [n, o] = u([...t]), [s, r] = u(0);
  return { slides: n, activeSlideIndex: s, addSlide: (i, l) => {
    const d = [...n];
    l !== void 0 && y(l, n.length) ? (d.splice(l, 0, i), o(d)) : (d.push(i), o(d));
  }, removeSlide: (i) => {
    if (y(i, n.length)) {
      const l = n.filter((d, v) => v !== i);
      o(l), i === s && r(Math.max(i, 0));
    } else
      console.error(`Invalid slide index: ${i}`);
  }, activateSlide: (i) => {
    e ? i < 0 ? r(n.length - 1) : i >= n.length ? r(0) : r(i) : !e && y(i, n.length) ? r(i) : console.error(`Invalid slide index: ${i}`);
  } };
}, ae = (t = []) => {
  const [e, n] = u([...t]), o = m(
    (l) => {
      n((d) => [...d, l]);
    },
    [n]
  ), s = m(() => {
    if (e.length === 0)
      return;
    const l = e.pop();
    return n([...e]), l;
  }, [e, n]), r = m(() => {
    if (e.length !== 0)
      return e[e.length - 1];
  }, [e]), c = m(() => {
    n([]);
  }, [n]), a = m(
    (l) => e.includes(l),
    [e]
  ), h = m(() => [...e], [e]), i = S(() => e.length, [e]);
  return {
    items: e,
    size: i,
    push: o,
    pop: s,
    peek: r,
    clear: c,
    contains: a,
    toArray: h
  };
}, T = (t, e) => t >= 0 && t < e, ue = () => {
  const [t, e] = u([]), [n, o] = u(0);
  return { tabs: t, activeTab: n, addTab: (a, h) => {
    const i = [...t];
    return h !== void 0 && T(h, t.length) ? (i.splice(h, 0, a), e(i), h) : (i.push(a), e(i), t.length - 1);
  }, removeTab: (a) => {
    if (T(a, t.length))
      e((h) => h.filter((i, l) => l !== a)), o(Math.max(0, a - 1));
    else
      throw new Error(`Invalid tab index: ${a}`);
  }, activateTab: (a) => {
    if (T(a, t.length))
      o(a);
    else
      throw new Error(`Invalid tab index: ${a}`);
  } };
}, le = (t, e = 400) => {
  const [n, o] = u(t), s = I(Date.now()), r = I(null);
  return g(() => {
    if (!Number.isInteger(e) || e < 0)
      throw new Error("Throttle interval must be a positive integer");
    const c = Date.now(), a = c - s.current;
    return a > e ? (o(t), s.current = c) : (r.current && window.clearTimeout(r.current), r.current = window.setTimeout(() => {
      o(t), s.current = Date.now();
    }, e - a)), () => {
      r.current && window.clearTimeout(r.current);
    };
  }, [t, e]), n;
}, de = (t, e, n, o = !1) => {
  if (t < 0 || e < 0 || n < 0)
    throw new Error(
      "Initial value, maximum value, and interval must be non-negative"
    );
  const [s, r] = u(t), [c, a] = u(-1), [h, i] = u(!1);
  g(() => () => clearInterval(c), [c]);
  const l = m(() => {
    clearInterval(c), a(-1), i(!1);
  }, [c, a]), d = m(() => {
    r((f) => f >= e ? o ? 0 : f : f + 1);
  }, [e, o, r]), v = m(() => {
    clearInterval(c);
    const f = window.setInterval(() => d(), n);
    a(f), i(!0);
  }, [c, a, d, n, i]), w = m(
    (f) => {
      if (f < 0 || f > e)
        throw new Error(`Index out of range: ${f}`);
      clearInterval(c), r(f), h && v();
    },
    [c, r, e, h, v]
  ), b = m(() => {
    w(0);
  }, [w]);
  return { index: s, pause: l, play: v, reset: b, goToIndex: w, running: h };
}, me = () => {
  const [t, e] = u([]), [n, o] = u([]), s = m((i, l) => {
    if (i.length === 0)
      throw new Error("The source stack contains no actions to swap");
    const d = [...i], v = [...l];
    return v.push(d.pop()), [d, v];
  }, []);
  return { actions: t, redo: () => {
    try {
      const [i, l] = s(n, t);
      o(i), e(l);
    } catch (i) {
      throw new Error(`Could not redo an action. ${i}`);
    }
  }, undo: () => {
    try {
      const [i, l] = s(t, n);
      e(i), o(l);
    } catch (i) {
      throw new Error(`Could not undo an action. ${i}`);
    }
  }, takeAction: (i) => {
    i == null && console.error("Cannot take an undefined or null action"), e([...t, i]), o([]);
  }, clearActions: () => {
    e([]), o([]);
  } };
}, R = "resize", $ = "change", he = () => {
  const [t, e] = u({
    width: window.innerWidth,
    height: window.innerHeight
  }), n = m(() => {
    e({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, [e]);
  return E(() => (window.addEventListener(R, n), screen.orientation.addEventListener(
    $,
    n
  ), () => {
    window.removeEventListener(R, n), screen.orientation.removeEventListener(
      $,
      n
    );
  }), [n]), t;
};
export {
  B as useAsyn,
  F as useCustomCSSProp,
  Q as useDarkMode,
  j as useDebounce,
  G as useElementSize,
  J as useFetch,
  X as useGeolocation,
  K as useHover,
  Z as useIdleTimeout,
  x as useIntersectionObserver,
  q as useList,
  ee as useLocalStorage,
  te as useMediaQuery,
  ne as useMousePosition,
  oe as useOnlineStatus,
  re as useRandomString,
  se as useScrollPosition,
  ce as useSessionStorage,
  ie as useSlideshow,
  ae as useStack,
  ue as useTabs,
  le as useThrottle,
  de as useTimedCounter,
  me as useUndoRedo,
  he as useWindowSize
};
