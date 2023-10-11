import { useState as u, useMemo as S, useEffect as g, useLayoutEffect as w, useCallback as m, useRef as p } from "react";
const N = (t, e = !0) => {
  const [n, r] = u({
    data: null,
    loading: !1,
    error: null
  }), s = S(
    () => async () => {
      r({ data: null, loading: !0, error: null });
      try {
        const o = await t();
        r({ data: o, loading: !1, error: null });
      } catch (o) {
        r({ data: null, loading: !1, error: o });
      }
    },
    [t, r]
  );
  return g(() => {
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
const U = (t, e) => {
  const [n, r] = u(
    (e == null ? void 0 : e.current) ?? document.documentElement
  ), [s, o] = u(
    () => C(t, n)
  );
  return g(() => {
    e && r((e == null ? void 0 : e.current) ?? document.documentElement);
  }, [e]), g(() => {
    if (typeof t != "string" || !t.startsWith("--"))
      console.error(
        'Invalid property name. Property name must be a string and start with "--"'
      );
    else {
      const c = new MutationObserver(() => {
        const i = C(t, n);
        i !== s && o(i);
      });
      return c.observe(n, {
        attributes: !0,
        attributeFilter: ["style", "class", "id"]
      }), () => c.disconnect();
    }
  }, [t, s, n]), s;
}, V = "dark-mode", A = "change", L = window.matchMedia("(prefers-color-scheme: dark)"), W = (t) => {
  const [e, n] = u(
    t ?? L.matches
  );
  return g(() => {
    document.documentElement.classList.toggle(V, e);
  }, [e]), g(() => {
    const r = () => {
      n(!!L.matches);
    };
    return L.addEventListener(
      A,
      r
    ), () => {
      L.removeEventListener(
        A,
        r
      );
    };
  }, [n]), { isDarkMode: e, setIsDarkMode: n };
}, Q = (t, e) => {
  const [n, r] = u(t);
  return g(() => {
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
    const s = new ResizeObserver((o) => {
      for (const c of o)
        c.contentBoxSize && n({
          width: c.target.offsetWidth,
          height: c.target.offsetHeight
        });
    });
    return s.observe(r), () => {
      s && s.unobserve(r);
    };
  }, [t]), e;
}, Y = (t) => {
  const [e, n] = u(), [r, s] = u(!1), [o, c] = u(null);
  return { load: m(
    async (h, a = {}) => {
      c(null), s(!0);
      try {
        const d = await fetch(h, a);
        if (!d.ok)
          throw new Error(
            "Network response to fetch() was unsuccessful." + d.statusText
          );
        const l = await d.json();
        n(t ? t(l) : l), s(!1);
      } catch (d) {
        d instanceof Error ? c(`Load operation could not be completed: ${d.message}`) : c("An unknown error occurred."), s(!1);
      }
    },
    [s, n, c, t]
  ), data: e, loading: r, error: o };
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
        e((s) => ({
          ...s,
          error: r.message
        }));
      }
    ) : e((r) => ({
      ...r,
      error: "Geolocation is not available in this browser."
    }));
  }, []);
  return g(() => {
    n();
  }, [n]), { location: t, getLocation: n };
}, j = (t = !1) => {
  const [e, n] = u(!1), r = p(null), s = m(() => {
    n(!0);
  }, [n]), o = m(() => {
    n(!1);
  }, [n]);
  return w(() => {
    const c = r.current;
    if (!c)
      return;
    const i = ["mouseenter"], h = ["mouseleave"];
    return t && (i.push("touchend"), h.push("touchend")), i.forEach(
      (a) => c.addEventListener(a, s)
    ), h.forEach(
      (a) => c.addEventListener(a, o)
    ), () => {
      c.removeEventListener("mouseenter", s), c.removeEventListener("mouseleave", o);
    };
  }, [o, s, t]), { ref: r, hasHover: e };
}, F = (t) => {
  const [e, n] = u(!1);
  return g(() => {
    let r;
    const s = () => {
      r && clearTimeout(r), r = setTimeout(() => {
        n(!0);
      }, t);
    }, o = () => {
      e && n(!1), s();
    }, c = () => {
      document.hidden || o();
    };
    return document.addEventListener("mousemove", o), document.addEventListener("mousedown", o), document.addEventListener("resize", o), document.addEventListener("keydown", o), document.addEventListener("touchstart", o), document.addEventListener("touchmove", o), document.addEventListener("wheel", o), document.addEventListener("visibilitychange", c), s(), () => {
      document.removeEventListener("mousemove", o), document.removeEventListener("mousedown", o), document.removeEventListener("resize", o), document.removeEventListener("keydown", o), document.removeEventListener("touchstart", o), document.removeEventListener("touchmove", o), document.removeEventListener("wheel", o), document.removeEventListener("visibilitychange", o), clearTimeout(r);
    };
  }, [t, e]), e;
}, J = (t) => {
  const e = p(null), [n, r] = u(null);
  return w(() => {
    const s = e == null ? void 0 : e.current;
    if (!s)
      throw new Error("useIntersectionObserver ref is not defined");
    const o = new IntersectionObserver(
      ([c]) => {
        r(c);
      },
      {
        root: t.root ?? null,
        rootMargin: t.rootMargin ?? "0px",
        threshold: t.threshold ?? 0
      }
    );
    return o.observe(s), () => {
      o.unobserve(s);
    };
  }, [r, t]), { ref: e, entry: n };
}, G = (t = []) => {
  const [e, n] = u([...t]), r = S(() => e[0], [e]), s = S(() => e.slice(1), [e]), o = S(() => e.length, [e]), c = m((l) => e[l], [e]), i = m(
    (l) => {
      n((v) => [l, ...v]);
    },
    [n]
  ), h = m(
    (l) => {
      n((v) => [...v, l]);
    },
    [n]
  );
  return {
    items: e,
    head: r,
    tail: s,
    size: o,
    itemAt: c,
    prepend: i,
    append: h,
    remove: (l) => {
      n((v) => {
        const f = [...v];
        return f.splice(l, 1), f;
      });
    },
    update: (l, v) => {
      n((f) => {
        const b = [...f];
        return b[l] = v, b;
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
  }), s = m(
    (c) => {
      r(c);
      try {
        localStorage.setItem(t, JSON.stringify(c));
      } catch (i) {
        console.error(`Error setting stored value for key "${t}": ${i}`);
      }
    },
    [r, t]
  ), o = m(() => {
    r(e);
    try {
      localStorage.removeItem(t);
    } catch (c) {
      console.error(`Error deleting stored value for key "${t}": ${c}`);
    }
  }, [r, t, e]);
  return { value: n, setStoredValue: s, deleteStoredValue: o };
}, D = "change", K = (t) => {
  const [e, n] = u({
    matches: !1,
    media: t
  });
  return w(() => {
    const r = window.matchMedia(t), s = (o) => {
      n({
        matches: o.matches,
        media: o.media
      });
    };
    return s({
      matches: r.matches,
      media: r.media
    }), r.addEventListener(
      D,
      (o) => s({ matches: o.matches, media: o.media })
    ), () => {
      r.removeEventListener(D, s);
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
  return g(() => {
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
  const s = [...t];
  for (r = s.length - 1; r > 0; r--)
    e = Math.floor(Math.random() * (r + 1)), n = s[r], s[r] = s[e], s[e] = n;
  return s;
}, q = (t) => {
  const [e, n] = u(""), [r, s] = u((t == null ? void 0 : t.length) ?? 12), [o, c] = u(!!(t != null && t.symbols)), [i, h] = u(!!(t != null && t.numbers)), [a, d] = u(!!(t != null && t.uppercase)), l = S(() => {
    const f = [[..._]];
    return a && f.push([...z]), i && f.push([...P]), o && f.push([...R]), f;
  }, [i, o, a]), v = m(() => {
    const f = [];
    for (let E = 0; E < r; E++) {
      const T = l[E % l.length], O = Math.floor(Math.random() * T.length);
      f.push(T[O]);
    }
    const b = $(f).map((E) => String.fromCharCode(E)).join("");
    n(b);
  }, [r, l]);
  return g(() => {
    v();
  }, [o, i, a, r, v]), {
    value: e,
    length: r,
    setLength: s,
    symbols: o,
    includeSymbols: c,
    numbers: i,
    includeNumbers: h,
    uppercase: a,
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
      const i = c instanceof Function ? c(c) : c;
      r(i), sessionStorage.setItem(t, JSON.stringify(i));
    } catch (i) {
      console.error(`Error writing session storage key "${t}":`, i);
    }
  }, deleteStoredValue: () => {
    r(void 0);
    try {
      sessionStorage.removeItem(t);
    } catch (c) {
      console.error(`Error deleting session storage key "${t}":`, c);
    }
  } };
}, I = (t, e) => t >= 0 && t < e, ne = (t = [], e = !1) => {
  const [n, r] = u([...t]), [s, o] = u(0);
  return { slides: n, activeSlideIndex: s, addSlide: (a, d) => {
    const l = [...n];
    d !== void 0 && I(d, n.length) ? (l.splice(d, 0, a), r(l)) : (l.push(a), r(l));
  }, removeSlide: (a) => {
    if (I(a, n.length)) {
      const d = n.filter((l, v) => v !== a);
      r(d), a === s && o(Math.max(a, 0));
    } else
      console.error(`Invalid slide index: ${a}`);
  }, activateSlide: (a) => {
    e ? a < 0 ? o(n.length - 1) : a >= n.length ? o(0) : o(a) : !e && I(a, n.length) ? o(a) : console.error(`Invalid slide index: ${a}`);
  } };
}, re = (t = []) => {
  const [e, n] = u([...t]), r = m(
    (d) => {
      n((l) => [...l, d]);
    },
    [n]
  ), s = m(() => {
    if (e.length === 0)
      return;
    const d = e.pop();
    return n([...e]), d;
  }, [e, n]), o = m(() => {
    if (e.length !== 0)
      return e[e.length - 1];
  }, [e]), c = m(() => {
    n([]);
  }, [n]), i = m(
    (d) => e.includes(d),
    [e]
  ), h = m(() => [...e], [e]), a = m(() => e.length, [e]);
  return {
    items: e,
    push: r,
    pop: s,
    peek: o,
    clear: c,
    contains: i,
    toArray: h,
    size: a
  };
}, M = (t, e) => t >= 0 && t < e, oe = () => {
  const [t, e] = u([]), [n, r] = u(0);
  return { tabs: t, activeTab: n, addTab: (i, h) => {
    const a = [...t];
    return h !== void 0 && M(h, t.length) ? (a.splice(h, 0, i), e(a), h) : (a.push(i), e(a), t.length - 1);
  }, removeTab: (i) => {
    if (M(i, t.length))
      e((h) => h.filter((a, d) => d !== i)), r(Math.max(0, i - 1));
    else
      throw new Error(`Invalid tab index: ${i}`);
  }, activateTab: (i) => {
    if (M(i, t.length))
      r(i);
    else
      throw new Error(`Invalid tab index: ${i}`);
  } };
}, se = (t, e = 400) => {
  const [n, r] = u(t), s = p(Date.now()), o = p(null);
  return g(() => {
    if (!Number.isInteger(e) || e < 0)
      throw new Error("Throttle interval must be a positive integer");
    const c = Date.now(), i = c - s.current;
    return i > e ? (r(t), s.current = c) : (o.current && window.clearTimeout(o.current), o.current = window.setTimeout(() => {
      r(t), s.current = Date.now();
    }, e - i)), () => {
      o.current && window.clearTimeout(o.current);
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
  return w(() => (window.addEventListener("resize", n), screen.orientation.addEventListener("change", n), () => {
    window.removeEventListener("resize", n), screen.orientation.removeEventListener("change", n);
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
