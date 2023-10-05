import { useState as u, useMemo as L, useEffect as f, useLayoutEffect as w, useCallback as m, useRef as p } from "react";
const N = (t, e = !0) => {
  const [n, r] = u({
    data: null,
    loading: !1,
    error: null
  }), o = L(
    () => async () => {
      r({ data: null, loading: !0, error: null });
      try {
        const s = await t();
        r({ data: s, loading: !1, error: null });
      } catch (s) {
        r({ data: null, loading: !1, error: s });
      }
    },
    [t, r]
  );
  return f(() => {
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
const U = (t, e) => {
  const [n, r] = u(
    (e == null ? void 0 : e.current) ?? document.documentElement
  ), [o, s] = u(
    () => C(t, n)
  );
  return f(() => {
    e && r((e == null ? void 0 : e.current) ?? document.documentElement);
  }, [e]), f(() => {
    if (typeof t != "string" || !t.startsWith("--"))
      console.error(
        'Invalid property name. Property name must be a string and start with "--"'
      );
    else {
      const c = new MutationObserver(() => {
        const a = C(t, n);
        a !== o && s(a);
      });
      return c.observe(n, {
        attributes: !0,
        attributeFilter: ["style", "class", "id"]
      }), () => c.disconnect();
    }
  }, [t, o, n]), o;
}, V = "dark-mode", A = "change", b = window.matchMedia("(prefers-color-scheme: dark)");
function W(t = null) {
  const [e, n] = u(
    t ?? b.matches
  );
  return f(() => {
    document.documentElement.classList.toggle(V, e);
  }, [e]), f(() => {
    const r = () => {
      n(!!b.matches);
    };
    return b.addEventListener(
      A,
      r
    ), () => {
      b.removeEventListener(
        A,
        r
      );
    };
  }, [n]), { isDarkMode: e, setIsDarkMode: n };
}
const Q = (t, e) => {
  const [n, r] = u(t);
  return f(() => {
    if (!Number.isInteger(e) || e < 0)
      console.error("Delay must be a positive integer");
    else {
      const o = setTimeout(() => {
        r(t);
      }, e);
      return () => {
        clearTimeout(o);
      };
    }
  }, [t, e]), n;
}, k = (t) => {
  const [e, n] = u({
    width: 0,
    height: 0
  });
  return w(() => {
    if (!t.current)
      return;
    const r = t.current;
    n({
      width: t.current.offsetWidth,
      height: t.current.offsetHeight
    });
    const o = new ResizeObserver((s) => {
      for (const c of s)
        c.contentBoxSize && n({
          width: c.target.offsetWidth,
          height: c.target.offsetHeight
        });
    });
    return o.observe(r), () => {
      o && o.unobserve(r);
    };
  }, [t]), e;
}, Y = (t) => {
  const [e, n] = u(), [r, o] = u(!1), [s, c] = u(null);
  return { load: m(
    async (i, l = {}) => {
      c(null), o(!0);
      try {
        const d = await fetch(i, l);
        if (!d.ok)
          throw new Error(
            "Network response to fetch() was unsuccessful." + d.statusText
          );
        const h = await d.json();
        n(t ? t(h) : h), o(!1);
      } catch (d) {
        d instanceof Error ? c(`Load operation could not be completed: ${d.message}`) : c("An unknown error occurred."), o(!1);
      }
    },
    [o, n, c, t]
  ), data: e, loading: r, error: s };
}, B = () => {
  const [t, e] = u({
    latitude: null,
    longitude: null,
    error: null
  }), n = m(() => {
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
  }, []);
  return f(() => {
    n();
  }, [n]), { location: t, getLocation: n };
}, j = (t = !1) => {
  const [e, n] = u(!1), r = p(null), o = m(() => {
    n(!0);
  }, [n]), s = m(() => {
    n(!1);
  }, [n]);
  return w(() => {
    const c = r.current;
    if (!c)
      return;
    const a = ["mouseenter"], i = ["mouseleave"];
    return t && (a.push("touchend"), i.push("touchend")), a.forEach(
      (l) => c.addEventListener(l, o)
    ), i.forEach(
      (l) => c.addEventListener(l, s)
    ), () => {
      c.removeEventListener("mouseenter", o), c.removeEventListener("mouseleave", s);
    };
  }, [s, o, t]), { ref: r, hasHover: e };
}, F = (t) => {
  const [e, n] = u(!1);
  return f(() => {
    let r;
    const o = () => {
      r && clearTimeout(r), r = setTimeout(() => {
        n(!0);
      }, t);
    }, s = () => {
      e && n(!1), o();
    }, c = () => {
      document.hidden || s();
    };
    return document.addEventListener("mousemove", s), document.addEventListener("mousedown", s), document.addEventListener("resize", s), document.addEventListener("keydown", s), document.addEventListener("touchstart", s), document.addEventListener("touchmove", s), document.addEventListener("wheel", s), document.addEventListener("visibilitychange", c), o(), () => {
      document.addEventListener("mousemove", s), document.addEventListener("mousedown", s), document.addEventListener("resize", s), document.addEventListener("keydown", s), document.addEventListener("touchstart", s), document.addEventListener("touchmove", s), document.addEventListener("wheel", s), document.addEventListener("visibilitychange", s), clearTimeout(r);
    };
  }, [t, e]), e;
}, J = (t) => {
  const e = p(null), [n, r] = u(null);
  return w(() => {
    const o = e == null ? void 0 : e.current;
    if (!o)
      throw new Error("useIntersectionObserver ref is not defined");
    const s = new IntersectionObserver(
      ([c]) => {
        r(c);
      },
      {
        root: t.root ?? null,
        rootMargin: t.rootMargin ?? "0px",
        threshold: t.threshold ?? 0
      }
    );
    return s.observe(o), () => {
      s.unobserve(o);
    };
  }, [r, t]), { ref: e, entry: n };
}, G = (t = []) => {
  const [e, n] = u([...t]), r = L(() => e[0], [e]), o = L(() => e.slice(1), [e]), s = m(() => e.length, [e]), c = m((h) => e[h], [e]), a = m(
    (h) => {
      n((g) => [h, ...g]);
    },
    [n]
  ), i = m(
    (h) => {
      n((g) => [...g, h]);
    },
    [n]
  );
  return {
    items: e,
    head: r,
    tail: o,
    size: s,
    itemAt: c,
    prepend: a,
    append: i,
    remove: (h) => {
      n((g) => {
        const v = [...g];
        return v.splice(h, 1), v;
      });
    },
    update: (h, g) => {
      n((v) => {
        const S = [...v];
        return S[h] = g, S;
      });
    }
  };
}, X = (t, e) => {
  const [n, r] = u(() => {
    try {
      const c = localStorage.getItem(t);
      if (c !== null)
        return JSON.parse(c);
    } catch (c) {
      console.error(`Error parsing stored value for key "${t}": ${c}`);
    }
    return e;
  }), o = m(
    (c) => {
      r(c);
      try {
        localStorage.setItem(t, JSON.stringify(c));
      } catch (a) {
        console.error(`Error setting stored value for key "${t}": ${a}`);
      }
    },
    [r, t]
  ), s = m(() => {
    r(e);
    try {
      localStorage.removeItem(t);
    } catch (c) {
      console.error(`Error deleting stored value for key "${t}": ${c}`);
    }
  }, [r, t, e]);
  return { value: n, setStoredValue: o, deleteStoredValue: s };
}, D = "change", K = (t) => {
  const [e, n] = u({
    matches: !1,
    media: t
  });
  return w(() => {
    const r = window.matchMedia(t), o = (s) => {
      n({
        matches: s.matches,
        media: s.media
      });
    };
    return o({
      matches: r.matches,
      media: r.media
    }), r.addEventListener(
      D,
      (s) => o({ matches: s.matches, media: s.media })
    ), () => {
      r.removeEventListener(D, o);
    };
  }, [t]), e;
}, x = () => {
  const [t, e] = u({ x: 0, y: 0 }), n = m(
    (r) => {
      e({ x: r.clientX, y: r.clientY });
    },
    [e]
  );
  return w(() => (document.addEventListener("mousemove", n), () => {
    document.removeEventListener("mousemove", n);
  }), [n]), t;
};
function Z() {
  const [t, e] = u(navigator.onLine);
  return f(() => {
    const n = () => e(!0), r = () => e(!1);
    return window.addEventListener("online", n), window.addEventListener("offline", r), () => {
      window.removeEventListener("online", n), window.removeEventListener("offline", r);
    };
  }, [e]), t;
}
const y = (t, e) => {
  const n = [];
  for (let r = t; r <= e; r++)
    n.push(r);
  return n;
}, _ = y(97, 122), z = y(65, 90), P = y(48, 57), R = y(33, 47), $ = (t) => {
  let e, n, r;
  const o = [...t];
  for (r = o.length - 1; r > 0; r--)
    e = Math.floor(Math.random() * (r + 1)), n = o[r], o[r] = o[e], o[e] = n;
  return o;
}, q = (t) => {
  const [e, n] = u(""), [r, o] = u((t == null ? void 0 : t.length) ?? 12), [s, c] = u(!!(t != null && t.symbols)), [a, i] = u(!!(t != null && t.numbers)), [l, d] = u(!!(t != null && t.uppercase)), h = L(() => {
    const v = [[..._]];
    return l && v.push([...z]), a && v.push([...P]), s && v.push([...R]), v;
  }, [a, s, l]), g = m(() => {
    const v = [];
    for (let E = 0; E < r; E++) {
      const T = h[E % h.length], O = Math.floor(Math.random() * T.length);
      v.push(T[O]);
    }
    const S = $(v).map((E) => String.fromCharCode(E)).join("");
    n(S);
  }, [r, h]);
  return f(() => {
    g();
  }, [s, a, l, r, g]), {
    value: e,
    length: r,
    setLength: o,
    symbols: s,
    includeSymbols: c,
    numbers: a,
    includeNumbers: i,
    uppercase: l,
    includeUppercase: d
  };
}, ee = () => {
  const [t, e] = u({
    x: window.scrollX,
    y: window.scrollY
  }), n = m(() => {
    e({
      x: window.scrollX,
      y: window.scrollY
    });
  }, [e]);
  return w(() => (window.addEventListener("scroll", n), () => {
    window.removeEventListener("scroll", n);
  }), [n]), t;
}, te = (t, e) => {
  const [n, r] = u(() => {
    try {
      const c = sessionStorage.getItem(t);
      return c ? JSON.parse(c) : e;
    } catch (c) {
      return console.error(`Error reading session storage key "${t}":`, c), e;
    }
  });
  return { value: n, setStoredValue: (c) => {
    try {
      const a = c instanceof Function ? c(c) : c;
      r(a), sessionStorage.setItem(t, JSON.stringify(a));
    } catch (a) {
      console.error(`Error writing session storage key "${t}":`, a);
    }
  }, deleteStoredValue: () => {
    r(void 0);
    try {
      sessionStorage.removeItem(t);
    } catch (c) {
      console.error(`Error deleting session storage key "${t}":`, c);
    }
  } };
}, I = (t, e) => t >= 0 && t < e, ne = (t = !1) => {
  const [e, n] = u([]), [r, o] = u(0);
  return { slides: e, activeSlideIndex: r, addSlide: (i, l) => {
    const d = [...e];
    l !== void 0 && I(l, e.length) ? (d.splice(l, 0, i), n(d)) : (d.push(i), n(d));
  }, removeSlide: (i) => {
    if (I(i, e.length)) {
      const l = e.filter((d, h) => h !== i);
      n(l), i === r && o(Math.max(i, 0));
    } else
      console.error(`Invalid slide index: ${i}`);
  }, activateSlide: (i) => {
    t ? i < 0 ? o(e.length - 1) : i >= e.length ? o(0) : o(i) : !t && I(i, e.length) ? o(i) : console.error(`Invalid slide index: ${i}`);
  } };
}, re = (t = []) => {
  const [e, n] = u([...t]), r = m(
    (d) => {
      n((h) => [...h, d]);
    },
    [n]
  ), o = m(() => {
    if (e.length === 0)
      return;
    const d = e.pop();
    return n([...e]), d;
  }, [e, n]), s = m(() => {
    if (e.length !== 0)
      return e[e.length - 1];
  }, [e]), c = m(() => {
    n([]);
  }, [n]), a = m(
    (d) => e.includes(d),
    [e]
  ), i = m(() => [...e], [e]), l = m(() => e.length, [e]);
  return {
    items: e,
    push: r,
    pop: o,
    peek: s,
    clear: c,
    contains: a,
    toArray: i,
    size: l
  };
}, M = (t, e) => t >= 0 && t < e, oe = () => {
  const [t, e] = u([]), [n, r] = u(0);
  return { tabs: t, activeTab: n, addTab: (a, i) => {
    const l = [...t];
    return i !== void 0 && M(i, t.length) ? (l.splice(i, 0, a), e(l), i) : (l.push(a), e(l), t.length - 1);
  }, removeTab: (a) => {
    if (M(a, t.length))
      e((i) => i.filter((l, d) => d !== a)), r(Math.max(0, a - 1));
    else
      throw new Error(`Invalid tab index: ${a}`);
  }, activateTab: (a) => {
    if (M(a, t.length))
      r(a);
    else
      throw new Error(`Invalid tab index: ${a}`);
  } };
}, se = (t, e = 400) => {
  const [n, r] = u(t), o = p(Date.now()), s = p(null);
  return f(() => {
    if (!Number.isInteger(e) || e < 0)
      throw new Error("Throttle interval must be a positive integer");
    const c = Date.now(), a = c - o.current;
    return a > e ? (r(t), o.current = c) : (s.current && window.clearTimeout(s.current), s.current = window.setTimeout(() => {
      r(t), o.current = Date.now();
    }, e - a)), () => {
      s.current && window.clearTimeout(s.current);
    };
  }, [t, e]), n;
}, ce = () => {
  const [t, e] = u({
    width: window.innerWidth,
    height: window.innerHeight
  }), n = m(() => {
    e({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, [e]);
  return w(() => (window.addEventListener("resize", n), () => {
    window.removeEventListener("resize", n);
  }), [n]), t;
};
export {
  N as useAsync,
  U as useCustomCSSProp,
  W as useDarkMode,
  Q as useDebounce,
  k as useElementSize,
  Y as useFetch,
  B as useGeolocation,
  j as useHover,
  F as useIdleTimeout,
  J as useIntersectionObserver,
  G as useList,
  X as useLocalStorage,
  K as useMediaQuery,
  x as useMousePosition,
  Z as useOnlineStatus,
  q as useRandomString,
  ee as useScrollPosition,
  te as useSessionStorage,
  ne as useSlideshow,
  re as useStack,
  oe as useTabs,
  se as useThrottle,
  ce as useWindowSize
};
