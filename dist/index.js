import { useState as u, useMemo as E, useEffect as w, useCallback as h, useLayoutEffect as S, useRef as L } from "react";
const j = (t, e = !0) => {
  const [r, n] = u({
    data: null,
    loading: !1,
    error: null
  }), o = E(
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
  return w(() => {
    e && o();
  }, [e, o]), {
    ...r,
    run: o
  };
}, J = () => {
  const [t, e] = u({
    level: 1,
    // Default to full battery
    charging: !1
    // Default to not charging
  });
  return w(() => {
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
  const [t, e] = u(null), r = h(
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
  const [r, n] = u(
    (e == null ? void 0 : e.current) ?? document.documentElement
  ), [o, c] = u(
    () => C(t, r)
  );
  return w(() => {
    e && n((e == null ? void 0 : e.current) ?? document.documentElement);
  }, [e]), w(() => {
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
  const [e, r] = u(
    t ?? I.matches
  );
  return w(() => {
    document.documentElement.classList.toggle(B, e);
  }, [e]), w(() => {
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
  const [r, n] = u(t);
  return w(() => {
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
  const [t, e] = u({
    alpha: null,
    beta: null,
    gamma: null
  });
  return w(() => {
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
  const [e, r] = u({
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
  const [e, r] = u(), [n, o] = u(!1), [c, s] = u(null);
  return { load: h(
    async (g, i = {}) => {
      s(null), o(!0);
      try {
        const l = await fetch(g, i);
        if (!l.ok)
          throw new Error(
            "Network response to fetch() was unsuccessful." + l.statusText
          );
        const d = await l.json();
        r(t ? t(d) : d), o(!1);
      } catch (l) {
        l instanceof Error ? s(`Load operation could not be completed: ${l.message}`) : s("An unknown error occurred."), o(!1);
      }
    },
    [o, r, s, t]
  ), data: e, loading: n, error: c };
}, ne = () => {
  const [t, e] = u({
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
  return w(() => {
    r();
  }, [r]), { location: t, getLocation: r };
}, re = (t = !1) => {
  const [e, r] = u(!1), n = L(null), o = h(() => {
    r(!0);
  }, [r]), c = h(() => {
    r(!1);
  }, [r]), s = E(() => {
    const a = ["mouseenter"], g = ["mouseleave"];
    return t && (a.push("touchstart"), g.push("touchend")), { activeEvents: a, inactiveEvents: g };
  }, [t]);
  return S(() => {
    const a = n == null ? void 0 : n.current;
    if (!a)
      return;
    const { activeEvents: g, inactiveEvents: i } = s;
    return g.forEach(
      (l) => a.addEventListener(l, o)
    ), i.forEach(
      (l) => a.addEventListener(l, c)
    ), () => {
      g.forEach(
        (l) => a.removeEventListener(l, o)
      ), i.forEach(
        (l) => a.removeEventListener(l, c)
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
  const [e, r] = u(!1);
  return w(() => {
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
  const e = L(null), [r, n] = u(null);
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
  const [e, r] = u([...t]), n = E(() => e[0], [e]), o = E(() => e.slice(1), [e]), c = E(() => e.length, [e]), s = h((d) => e[d], [e]), a = h(
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
  const [r, n] = u(() => {
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
  const [e, r] = u(!1);
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
  const [t, e] = u({ x: 0, y: 0 }), r = h(
    (n) => {
      e({ x: n.clientX, y: n.clientY });
    },
    [e]
  );
  return S(() => (document.addEventListener(_, r), () => document.removeEventListener(_, r)), [r]), t;
}, D = "online", R = "offline", ue = () => {
  const [t, e] = u(navigator.onLine);
  return w(() => {
    const r = () => e(!0), n = () => e(!1);
    return window.addEventListener(D, r), window.addEventListener(R, n), () => {
      window.removeEventListener(D, r), window.removeEventListener(R, n);
    };
  }, [e]), t;
}, U = {
  initialPage: 1,
  initialItemsPerPage: 10
}, de = (t, e = U) => {
  const { initialPage: r, initialItemsPerPage: n } = e, [o, c] = u(r || 1), [s, a] = u(n || 10), g = E(
    () => Math.ceil(t / s),
    [t, s]
  ), i = h(
    (d) => {
      d > 0 && d <= g ? c(d) : c(t === 0 ? 1 : Math.min(g, Math.max(1, d)));
    },
    [g, t, c]
  ), l = h(
    (d) => {
      d > 0 && a(d);
    },
    [a]
  );
  return {
    currentPage: o,
    itemsPerPage: s,
    setPage: i,
    setItemsPerPage: l
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
  const [e, r] = u(""), [n, o] = u((t == null ? void 0 : t.length) ?? 12), [c, s] = u(!!(t != null && t.symbols)), [a, g] = u(!!(t != null && t.numbers)), [i, l] = u(!!(t != null && t.uppercase)), d = E(() => {
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
  return w(() => {
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
    includeUppercase: l
  };
}, $ = "scroll", ge = () => {
  const [t, e] = u({
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
  const [r, n] = u(() => {
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
}, T = (t, e) => t >= 0 && t < e, ve = (t = [], e = !1) => {
  const [r, n] = u([...t]), [o, c] = u(0);
  return { slides: r, activeSlideIndex: o, addSlide: (i, l) => {
    const d = [...r];
    l !== void 0 && T(l, r.length) ? (d.splice(l, 0, i), n(d)) : (d.push(i), n(d));
  }, removeSlide: (i) => {
    if (T(i, r.length)) {
      const l = r.filter((d, m) => m !== i);
      n(l), i === o && c(Math.max(i, 0));
    } else
      console.error(`Invalid slide index: ${i}`);
  }, activateSlide: (i) => {
    e ? i < 0 ? c(r.length - 1) : i >= r.length ? c(0) : c(i) : !e && T(i, r.length) ? c(i) : console.error(`Invalid slide index: ${i}`);
  } };
}, fe = (t = []) => {
  const [e, r] = u([...t]), n = h(
    (l) => {
      r((d) => [...d, l]);
    },
    [r]
  ), o = h(() => {
    if (e.length === 0)
      return;
    const l = e.pop();
    return r([...e]), l;
  }, [e, r]), c = h(() => {
    if (e.length !== 0)
      return e[e.length - 1];
  }, [e]), s = h(() => {
    r([]);
  }, [r]), a = h(
    (l) => e.includes(l),
    [e]
  ), g = h(() => [...e], [e]), i = E(() => e.length, [e]);
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
}, y = (t, e) => t >= 0 && t < e, we = () => {
  const [t, e] = u([]), [r, n] = u(-1);
  return { tabs: t, activeTab: r, addTab: (a, g) => {
    const i = [...t];
    if (g !== void 0 && y(g, t.length))
      return i.splice(g, 0, a), e(i), g;
    {
      const l = i.push(a);
      return e(i), l - 1;
    }
  }, removeTab: (a) => {
    if (y(a, t.length)) {
      const g = t.length;
      e((i) => i.filter((l, d) => d !== a)), n(g > 1 ? Math.max(0, a - 1) : -1);
    } else
      throw new Error(`Invalid tab index: ${a}`);
  }, activateTab: (a) => {
    if (y(a, t.length))
      n(a);
    else
      throw new Error(`Invalid tab index: ${a}`);
  } };
}, Ee = (t, e = 400) => {
  const [r, n] = u(t), o = L(Date.now()), c = L(null);
  return w(() => {
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
  const [o, c] = u(t), [s, a] = u(-1), [g, i] = u(!1);
  w(() => () => clearInterval(s), [s]);
  const l = h(() => {
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
  return { index: o, pause: l, play: m, reset: b, goToIndex: v, running: g };
}, be = () => {
  const [t, e] = u([]), [r, n] = u([]), o = h((i, l) => {
    if (i.length === 0)
      throw new Error("The source stack contains no actions to swap");
    const d = [...i], m = [...l];
    return m.push(d.pop()), [d, m];
  }, []);
  return { actions: t, redo: () => {
    try {
      const [i, l] = o(r, t);
      n(i), e(l);
    } catch (i) {
      throw new Error(`Could not redo an action. ${i}`);
    }
  }, undo: () => {
    try {
      const [i, l] = o(t, r);
      e(i), n(l);
    } catch (i) {
      throw new Error(`Could not undo an action. ${i}`);
    }
  }, takeAction: (i) => {
    i == null && console.error("Cannot take an undefined or null action"), e([...t, i]), n([]);
  }, clearActions: () => {
    e([]), n([]);
  } };
}, H = "resize", V = "change", Ie = () => {
  const [t, e] = u({
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
  j as useAsync,
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
  we as useTabs,
  Ee as useThrottle,
  Se as useTimedCounter,
  be as useUndoRedo,
  Ie as useWindowSize
};
