import { useState as l, useMemo as w, useEffect as E, useCallback as h, useLayoutEffect as S, useRef as L } from "react";
const j = (t, e = !0) => {
  const [r, n] = l({
    data: null,
    loading: !1,
    error: null
  }), o = w(
    () => async () => {
      n({ data: null, loading: !0, error: null });
      try {
        const c = await t();
        n({ data: c, loading: !1, error: null });
      } catch (c) {
        n({ data: null, loading: !1, error: c });
      }
    },
    [t, n]
  );
  return E(() => {
    e && o();
  }, [e, o]), {
    ...r,
    run: o
  };
}, J = () => {
  const [t, e] = l({
    level: 1,
    // Default to full battery
    charging: !1
    // Default to not charging
  });
  return E(() => {
    if (!navigator.getBattery) {
      console.error("Battery status API is not supported");
      return;
    }
    const r = () => {
      navigator.getBattery().then((n) => {
        e({
          level: n.level,
          charging: n.charging
        });
      }).catch((n) => {
        if (n instanceof Error) {
          console.error("Failed to get battery status:", n.message);
          return;
        } else
          console.error("Failed to get battery status:", n);
      });
    };
    return r(), navigator.getBattery().then((n) => {
      n.addEventListener("levelchange", r), n.addEventListener("chargingchange", r);
    }), () => {
      navigator.getBattery().then((n) => {
        n.removeEventListener("levelchange", r), n.removeEventListener("chargingchange", r);
      });
    };
  }, []), t;
}, X = () => {
  const [t, e] = l(null), r = h(
    (o) => {
      navigator.clipboard.writeText(o).then(() => e(o)).catch((c) => console.error("Failed to copy:", c));
    },
    [e]
  ), n = h(() => {
    e(null);
  }, [e]);
  return { value: t, copy: r, clear: n };
};
function C(t, e) {
  try {
    return getComputedStyle(e).getPropertyValue(t);
  } catch (r) {
    return console.error("Could not get property value", r), "";
  }
}
const x = (t, e) => {
  const [r, n] = l(
    (e == null ? void 0 : e.current) ?? document.documentElement
  ), [o, c] = l(
    () => C(t, r)
  );
  return E(() => {
    e && n((e == null ? void 0 : e.current) ?? document.documentElement);
  }, [e]), E(() => {
    if (typeof t != "string" || !t.startsWith("--"))
      console.error(
        'Invalid property name. Property name must be a string and start with "--"'
      );
    else {
      const s = new MutationObserver(() => {
        const a = C(t, r);
        a !== o && c(a);
      });
      return s.observe(r, {
        attributes: !0,
        attributeFilter: ["style", "class", "id"]
      }), () => s.disconnect();
    }
  }, [t, o, r]), o;
}, B = "dark-mode", P = "change", I = window.matchMedia("(prefers-color-scheme: dark)"), K = (t) => {
  const [e, r] = l(
    t ?? I.matches
  );
  return E(() => {
    document.documentElement.classList.toggle(B, e);
  }, [e]), E(() => {
    const n = () => {
      r(!!I.matches);
    };
    return I.addEventListener(
      P,
      n
    ), () => {
      I.removeEventListener(
        P,
        n
      );
    };
  }, [r]), { isDarkMode: e, setIsDarkMode: r };
}, Z = (t, e) => {
  const [r, n] = l(t);
  return E(() => {
    if (!Number.isInteger(e) || e < 0)
      console.error("Delay must be a positive integer");
    else {
      const o = setTimeout(() => {
        n(t);
      }, e);
      return () => clearTimeout(o);
    }
  }, [t, e]), r;
}, q = () => {
  const [t, e] = l({
    alpha: null,
    beta: null,
    gamma: null
  });
  return E(() => {
    const r = (n) => {
      e({
        alpha: n.alpha,
        beta: n.beta,
        gamma: n.gamma
      });
    };
    return window.addEventListener("deviceorientation", r, !0), () => {
      window.removeEventListener(
        "deviceorientation",
        r,
        !0
      );
    };
  }, []), t;
}, ee = (t) => {
  const [e, r] = l({
    width: 0,
    height: 0
  });
  return S(() => {
    if (!t.current)
      return;
    const n = t.current;
    r({
      width: t.current.offsetWidth,
      height: t.current.offsetHeight
    });
    const o = new ResizeObserver((c) => {
      for (const s of c)
        s.contentBoxSize && r({
          width: s.target.offsetWidth,
          height: s.target.offsetHeight
        });
    });
    return o.observe(n), () => {
      o && o.unobserve(n);
    };
  }, [t]), e;
}, te = (t) => {
  const [e, r] = l(), [n, o] = l(!1), [c, s] = l(null);
  return { load: h(
    async (g, i = {}) => {
      s(null), o(!0);
      try {
        const u = await fetch(g, i);
        if (!u.ok)
          throw new Error(
            "Network response to fetch() was unsuccessful." + u.statusText
          );
        const d = await u.json();
        r(t ? t(d) : d), o(!1);
      } catch (u) {
        u instanceof Error ? s(`Load operation could not be completed: ${u.message}`) : s("An unknown error occurred."), o(!1);
      }
    },
    [o, r, s, t]
  ), data: e, loading: n, error: c };
}, ne = () => {
  const [t, e] = l({
    latitude: null,
    longitude: null,
    error: null
  }), r = h(() => {
    "geolocation" in navigator ? navigator.geolocation.getCurrentPosition(
      (n) => {
        e({
          latitude: n.coords.latitude,
          longitude: n.coords.longitude,
          error: null
        });
      },
      (n) => {
        e((o) => ({
          ...o,
          error: n.message
        }));
      }
    ) : e((n) => ({
      ...n,
      error: "Geolocation is not available in this browser."
    }));
  }, [e]);
  return E(() => {
    r();
  }, [r]), { location: t, getLocation: r };
}, re = (t = !1) => {
  const [e, r] = l(!1), n = L(null), o = h(() => {
    r(!0);
  }, [r]), c = h(() => {
    r(!1);
  }, [r]), s = w(() => {
    const a = ["mouseenter"], g = ["mouseleave"];
    return t && (a.push("touchstart"), g.push("touchend")), { activeEvents: a, inactiveEvents: g };
  }, [t]);
  return S(() => {
    const a = n == null ? void 0 : n.current;
    if (!a)
      return;
    const { activeEvents: g, inactiveEvents: i } = s;
    return g.forEach(
      (u) => a.addEventListener(u, o)
    ), i.forEach(
      (u) => a.addEventListener(u, c)
    ), () => {
      g.forEach(
        (u) => a.removeEventListener(u, o)
      ), i.forEach(
        (u) => a.removeEventListener(u, c)
      );
    };
  }, [s, o, c, n]), { ref: n, hasHover: e };
}, M = [
  "mousemove",
  "mousedown",
  "resize",
  "keydown",
  "touchstart",
  "touchmove",
  "wheel"
], O = "visibilitychange", oe = (t) => {
  const [e, r] = l(!1);
  return E(() => {
    let n;
    const o = () => {
      n && clearTimeout(n), n = setTimeout(() => {
        r(!0);
      }, t);
    }, c = () => {
      e && r(!1), o();
    }, s = () => {
      document.hidden || c();
    };
    return M.forEach(
      (a) => document.addEventListener(a, c)
    ), document.addEventListener(O, s), o(), () => {
      M.forEach(
        (a) => document.removeEventListener(a, c)
      ), document.removeEventListener(O, s), clearTimeout(n);
    };
  }, [t, e]), e;
}, se = (t) => {
  const e = L(null), [r, n] = l(null);
  return S(() => {
    const o = e == null ? void 0 : e.current;
    if (!o)
      throw new Error("useIntersectionObserver ref is not defined");
    const c = new IntersectionObserver(
      ([s]) => {
        n(s);
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
  }, [n, t]), { ref: e, entry: r };
}, ce = (t = []) => {
  const [e, r] = l([...t]), n = w(() => e[0], [e]), o = w(() => e.slice(1), [e]), c = w(() => e.length, [e]), s = h((d) => e[d], [e]), a = h(
    (d) => {
      r((m) => [d, ...m]);
    },
    [r]
  ), g = h(
    (d) => {
      r((m) => [...m, d]);
    },
    [r]
  );
  return {
    items: e,
    head: n,
    tail: o,
    size: c,
    itemAt: s,
    prepend: a,
    append: g,
    remove: (d) => {
      r((m) => {
        const v = [...m];
        return v.splice(d, 1), v;
      });
    },
    update: (d, m) => {
      r((v) => {
        const b = [...v];
        return b[d] = m, b;
      });
    }
  };
}, ae = (t, e) => {
  const [r, n] = l(() => {
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
      n(s);
      try {
        localStorage.setItem(t, JSON.stringify(s));
      } catch (a) {
        console.error(`Error setting stored value for key "${t}": ${a}`);
      }
    },
    [n, t]
  ), c = h(() => {
    n(e);
    try {
      localStorage.removeItem(t);
    } catch (s) {
      console.error(`Error deleting stored value for key "${t}": ${s}`);
    }
  }, [n, t, e]);
  return { value: r, setStoredValue: o, deleteStoredValue: c };
}, N = "change", ie = (t) => {
  const [e, r] = l(!1);
  return S(() => {
    const n = window.matchMedia(t), o = (c) => {
      r(c.matches);
    };
    return r(n.matches), n.addEventListener(
      N,
      (c) => o(c)
    ), () => n.removeEventListener(N, o);
  }, [t]), e;
}, _ = "mousemove", le = () => {
  const [t, e] = l({ x: 0, y: 0 }), r = h(
    (n) => {
      e({ x: n.clientX, y: n.clientY });
    },
    [e]
  );
  return S(() => (document.addEventListener(_, r), () => document.removeEventListener(_, r)), [r]), t;
}, D = "online", R = "offline", ue = () => {
  const [t, e] = l(navigator.onLine);
  return E(() => {
    const r = () => e(!0), n = () => e(!1);
    return window.addEventListener(D, r), window.addEventListener(R, n), () => {
      window.removeEventListener(D, r), window.removeEventListener(R, n);
    };
  }, [e]), t;
}, U = {
  initialPage: 1,
  initialItemsPerPage: 10
}, de = (t, e = U) => {
  const { initialPage: r, initialItemsPerPage: n } = e, [o, c] = l(r || 1), [s, a] = l(n || 10), g = w(
    () => Math.ceil(t / s),
    [t, s]
  ), i = h(
    (d) => {
      d > 0 && d <= g ? c(d) : c(t === 0 ? 1 : Math.min(g, Math.max(1, d)));
    },
    [g, t, c]
  ), u = h(
    (d) => {
      d > 0 && a(d);
    },
    [a]
  );
  return {
    currentPage: o,
    itemsPerPage: s,
    setPage: i,
    setItemsPerPage: u
  };
}, p = (t, e) => {
  const r = [];
  for (let n = t; n <= e; n++)
    r.push(n);
  return r;
}, W = p(97, 122), F = p(65, 90), k = p(48, 57), Y = p(33, 47), Q = (t) => {
  let e, r, n;
  const o = [...t];
  for (n = o.length - 1; n > 0; n--)
    e = Math.floor(Math.random() * (n + 1)), r = o[n], o[n] = o[e], o[e] = r;
  return o;
}, he = (t) => {
  const [e, r] = l(""), [n, o] = l((t == null ? void 0 : t.length) ?? 12), [c, s] = l(!!(t != null && t.symbols)), [a, g] = l(!!(t != null && t.numbers)), [i, u] = l(!!(t != null && t.uppercase)), d = w(() => {
    const v = [[...W]];
    return i && v.push([...F]), a && v.push([...k]), c && v.push([...Y]), v;
  }, [a, c, i]), m = h(() => {
    const v = [];
    for (let f = 0; f < n; f++) {
      const A = d[f % d.length], z = Math.floor(Math.random() * A.length);
      v.push(A[z]);
    }
    return Q(v).map((f) => String.fromCharCode(f)).join("");
  }, [n, d]);
  return E(() => {
    r(m());
  }, [
    c,
    a,
    i,
    n,
    m
  ]), {
    value: e,
    length: n,
    setLength: o,
    symbols: c,
    includeSymbols: s,
    numbers: a,
    includeNumbers: g,
    uppercase: i,
    includeUppercase: u
  };
}, $ = "scroll", ge = () => {
  const [t, e] = l({
    x: window.scrollX,
    y: window.scrollY
  }), r = h(() => {
    e({
      x: window.scrollX,
      y: window.scrollY
    });
  }, [e]);
  return S(() => (window.addEventListener($, r), () => window.removeEventListener($, r)), [r]), t;
}, me = (t, e) => {
  const [r, n] = l(() => {
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
        n(a), sessionStorage.setItem(t, JSON.stringify(a));
      } catch (a) {
        console.error(`Error writing session storage key "${t}":`, a);
      }
    },
    [n, t]
  ), c = h(() => {
    n(void 0);
    try {
      sessionStorage.removeItem(t);
    } catch (s) {
      console.error(`Error deleting session storage key "${t}":`, s);
    }
  }, [n, t]);
  return { value: r, setStoredValue: o, deleteStoredValue: c };
}, y = (t, e) => t >= 0 && t < e, ve = (t = [], e = !1) => {
  const [r, n] = l([...t]), [o, c] = l(0);
  return { slides: r, activeSlideIndex: o, addSlide: (i, u) => {
    const d = [...r];
    u !== void 0 && y(u, r.length) ? (d.splice(u, 0, i), n(d)) : (d.push(i), n(d));
  }, removeSlide: (i) => {
    if (y(i, r.length)) {
      const u = r.filter((d, m) => m !== i);
      n(u), i === o && c(Math.max(i, 0));
    } else
      console.error(`Invalid slide index: ${i}`);
  }, activateSlide: (i) => {
    e ? i < 0 ? c(r.length - 1) : i >= r.length ? c(0) : c(i) : !e && y(i, r.length) ? c(i) : console.error(`Invalid slide index: ${i}`);
  } };
}, fe = (t = []) => {
  const [e, r] = l([...t]), n = h(
    (u) => {
      r((d) => [...d, u]);
    },
    [r]
  ), o = h(() => {
    if (e.length === 0)
      return;
    const u = e.pop();
    return r([...e]), u;
  }, [e, r]), c = h(() => {
    if (e.length !== 0)
      return e[e.length - 1];
  }, [e]), s = h(() => {
    r([]);
  }, [r]), a = h(
    (u) => e.includes(u),
    [e]
  ), g = h(() => [...e], [e]), i = w(() => e.length, [e]);
  return {
    items: e,
    size: i,
    push: n,
    pop: o,
    peek: c,
    clear: s,
    contains: a,
    toArray: g
  };
}, T = (t, e) => t >= 0 && t < e, Ee = () => {
  const [t, e] = l([]), [r, n] = l(0);
  return { tabs: t, activeTab: r, addTab: (a, g) => {
    const i = [...t];
    return g !== void 0 && T(g, t.length) ? (i.splice(g, 0, a), e(i), g) : (i.push(a), e(i), t.length - 1);
  }, removeTab: (a) => {
    if (T(a, t.length))
      e((g) => g.filter((i, u) => u !== a)), n(Math.max(0, a - 1));
    else
      throw new Error(`Invalid tab index: ${a}`);
  }, activateTab: (a) => {
    if (T(a, t.length))
      n(a);
    else
      throw new Error(`Invalid tab index: ${a}`);
  } };
}, we = (t, e = 400) => {
  const [r, n] = l(t), o = L(Date.now()), c = L(null);
  return E(() => {
    if (!Number.isInteger(e) || e < 0)
      throw new Error("Throttle interval must be a positive integer");
    const s = Date.now(), a = s - o.current;
    return a > e ? (n(t), o.current = s) : (c.current && window.clearTimeout(c.current), c.current = window.setTimeout(() => {
      n(t), o.current = Date.now();
    }, e - a)), () => {
      c.current && window.clearTimeout(c.current);
    };
  }, [t, e]), r;
}, Se = (t, e, r, n = !1) => {
  if (t < 0 || e < 0 || r < 0)
    throw new Error(
      "Initial value, maximum value, and interval must be non-negative"
    );
  const [o, c] = l(t), [s, a] = l(-1), [g, i] = l(!1);
  E(() => () => clearInterval(s), [s]);
  const u = h(() => {
    clearInterval(s), a(-1), i(!1);
  }, [s, a]), d = h(() => {
    c((f) => f >= e ? n ? t : f : f + 1);
  }, [e, n, c, t]), m = h(() => {
    clearInterval(s);
    const f = window.setInterval(() => d(), r);
    a(f), i(!0);
  }, [s, a, d, r, i]), v = h(
    (f) => {
      if (f < 0 || f > e)
        throw new Error(`Index out of range: ${f}`);
      clearInterval(s), c(f), g && m();
    },
    [s, c, e, g, m]
  ), b = h(() => {
    v(t);
  }, [v, t]);
  return { index: o, pause: u, play: m, reset: b, goToIndex: v, running: g };
}, be = () => {
  const [t, e] = l([]), [r, n] = l([]), o = h((i, u) => {
    if (i.length === 0)
      throw new Error("The source stack contains no actions to swap");
    const d = [...i], m = [...u];
    return m.push(d.pop()), [d, m];
  }, []);
  return { actions: t, redo: () => {
    try {
      const [i, u] = o(r, t);
      n(i), e(u);
    } catch (i) {
      throw new Error(`Could not redo an action. ${i}`);
    }
  }, undo: () => {
    try {
      const [i, u] = o(t, r);
      e(i), n(u);
    } catch (i) {
      throw new Error(`Could not undo an action. ${i}`);
    }
  }, takeAction: (i) => {
    i == null && console.error("Cannot take an undefined or null action"), e([...t, i]), n([]);
  }, clearActions: () => {
    e([]), n([]);
  } };
}, H = "resize", V = "change", Ie = () => {
  const [t, e] = l({
    width: window.innerWidth,
    height: window.innerHeight
  }), r = h(() => {
    e({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, [e]);
  return S(() => (window.addEventListener(H, r), screen.orientation.addEventListener(
    V,
    r
  ), () => {
    window.removeEventListener(H, r), screen.orientation.removeEventListener(
      V,
      r
    );
  }), [r]), t;
};
export {
  j as useAsyn,
  J as useBatteryStatus,
  X as useClipboard,
  x as useCustomCSSProp,
  K as useDarkMode,
  Z as useDebounce,
  q as useDeviceOrientation,
  ee as useElementSize,
  te as useFetch,
  ne as useGeolocation,
  re as useHover,
  oe as useIdleTimeout,
  se as useIntersectionObserver,
  ce as useList,
  ae as useLocalStorage,
  ie as useMediaQuery,
  le as useMousePosition,
  ue as useOnlineStatus,
  de as usePagination,
  he as useRandomString,
  ge as useScrollPosition,
  me as useSessionStorage,
  ve as useSlideshow,
  fe as useStack,
  Ee as useTabs,
  we as useThrottle,
  Se as useTimedCounter,
  be as useUndoRedo,
  Ie as useWindowSize
};
