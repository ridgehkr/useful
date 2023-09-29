import { useState as u, useCallback as m, useEffect as g, useLayoutEffect as w, useRef as M, useMemo as p } from "react";
const N = (t, e = !0) => {
  const [n, r] = u({
    data: null,
    loading: !1,
    error: null
  }), o = m(
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
  return g(() => {
    e && o();
  }, [e, o]), {
    ...n,
    run: o
  };
};
function C(t, e) {
  return getComputedStyle(e ?? document.documentElement).getPropertyValue(
    t
  ) ?? "";
}
const U = (t, e) => {
  const [n, r] = u(
    () => C(t, e)
  );
  return g(() => {
    if (typeof t != "string" || !t.startsWith("--"))
      console.error(
        'Invalid property name. Property name must be a string and start with "--"'
      );
    else {
      const o = new MutationObserver(() => {
        const c = C(t);
        c !== n && r(c);
      });
      return o.observe(e ?? document.documentElement, {
        attributes: !0,
        attributeFilter: ["style"]
      }), () => o.disconnect();
    }
  }, [t, n, e]), n;
}, V = "dark-mode", A = "change", b = window.matchMedia("(prefers-color-scheme: dark)");
function W(t = null) {
  const [e, n] = u(
    t ?? b.matches
  );
  return g(() => {
    document.documentElement.classList.toggle(V, e);
  }, [e]), g(() => {
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
  }, [n]), [e ?? !1, n];
}
const Q = (t, e) => {
  const [n, r] = u(t);
  return g(() => {
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
}, Y = (t) => {
  const [e, n] = u(), [r, o] = u(!1), [c, s] = u(null);
  return { load: m(
    async (i, l = {}) => {
      s(null), o(!0);
      try {
        const d = await fetch(i, l);
        if (!d.ok)
          throw new Error(
            "Network response to fetch() was unsuccessful." + d.statusText
          );
        const h = await d.json();
        n(t ? t(h) : h), o(!1);
      } catch (d) {
        d instanceof Error ? s(`Load operation could not be completed: ${d.message}`) : s("An unknown error occurred."), o(!1);
      }
    },
    [o, n, s, t]
  ), data: e, loading: r, error: c };
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
  return g(() => {
    n();
  }, [n]), { location: t, getLocation: n };
}, j = (t = !1) => {
  const [e, n] = u(!1), r = M(null), o = m(() => {
    n(!0);
  }, [n]), c = m(() => {
    n(!1);
  }, [n]);
  return w(() => {
    const s = r.current;
    if (!s)
      return;
    const a = ["mouseenter"], i = ["mouseleave"];
    return t && (a.push("touchend"), i.push("touchend")), a.forEach(
      (l) => s.addEventListener(l, o)
    ), i.forEach(
      (l) => s.addEventListener(l, c)
    ), () => {
      s.removeEventListener("mouseenter", o), s.removeEventListener("mouseleave", c);
    };
  }, [c, o, t]), { ref: r, hasHover: e };
}, F = ({ timeout: t, onIdle: e }) => {
  const [n, r] = u(!1);
  return g(() => {
    let o;
    const c = () => {
      o && clearTimeout(o), o = setTimeout(() => {
        r(!0), e();
      }, t);
    }, s = () => {
      n && r(!1), c();
    }, a = () => {
      document.hidden || s();
    };
    return document.addEventListener("mousemove", s), document.addEventListener("mousedown", s), document.addEventListener("resize", s), document.addEventListener("keydown", s), document.addEventListener("touchstart", s), document.addEventListener("touchmove", s), document.addEventListener("wheel", s), document.addEventListener("visibilitychange", a), c(), () => {
      document.addEventListener("mousemove", s), document.addEventListener("mousedown", s), document.addEventListener("resize", s), document.addEventListener("keydown", s), document.addEventListener("touchstart", s), document.addEventListener("touchmove", s), document.addEventListener("wheel", s), document.addEventListener("visibilitychange", s), clearTimeout(o);
    };
  }, [t, e, n]), n;
}, J = (t) => {
  const e = M(null), [n, r] = u(null);
  return w(() => {
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
}, G = (t = []) => {
  const [e, n] = u([...t]), r = p(() => e[0], [e]), o = p(() => e.slice(1), [e]), c = m(() => e.length, [e]), s = m((h) => e[h], [e]), a = m(
    (h) => {
      n((f) => [h, ...f]);
    },
    [n]
  ), i = m(
    (h) => {
      n((f) => [...f, h]);
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
    append: i,
    remove: (h) => {
      n((f) => {
        const v = [...f];
        return v.splice(h, 1), v;
      });
    },
    update: (h, f) => {
      n((v) => {
        const S = [...v];
        return S[h] = f, S;
      });
    }
  };
}, X = (t, e) => {
  const [n, r] = u(() => {
    try {
      const s = localStorage.getItem(t);
      if (s !== null)
        return JSON.parse(s);
    } catch (s) {
      console.error(`Error parsing stored value for key "${t}": ${s}`);
    }
    return e;
  }), o = m(
    (s) => {
      r(s);
      try {
        localStorage.setItem(t, JSON.stringify(s));
      } catch (a) {
        console.error(`Error setting stored value for key "${t}": ${a}`);
      }
    },
    [r, t]
  ), c = m(() => {
    r(e);
    try {
      localStorage.removeItem(t);
    } catch (s) {
      console.error(`Error deleting stored value for key "${t}": ${s}`);
    }
  }, [r, t, e]);
  return { value: n, setStoredValue: o, deleteStoredValue: c };
}, D = "change", K = (t) => {
  const [e, n] = u({
    matches: !1,
    media: t
  });
  return w(() => {
    const r = window.matchMedia(t), o = (c) => {
      n({
        matches: c.matches,
        media: c.media
      });
    };
    return o({
      matches: r.matches,
      media: r.media
    }), r.addEventListener(
      D,
      (c) => o({ matches: c.matches, media: c.media })
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
  return g(() => {
    const n = () => e(!0), r = () => e(!1);
    return window.addEventListener("online", n), window.addEventListener("offline", r), () => {
      window.removeEventListener("online", n), window.removeEventListener("offline", r);
    };
  }, [e]), t;
}
const L = (t, e) => {
  const n = [];
  for (let r = t; r <= e; r++)
    n.push(r);
  return n;
}, _ = L(97, 122), z = L(65, 90), P = L(48, 57), $ = L(33, 47), H = (t) => {
  let e, n, r;
  const o = [...t];
  for (r = o.length - 1; r > 0; r--)
    e = Math.floor(Math.random() * (r + 1)), n = o[r], o[r] = o[e], o[e] = n;
  return o;
}, q = (t) => {
  const [e, n] = u(""), [r, o] = u((t == null ? void 0 : t.length) ?? 12), [c, s] = u(!!(t != null && t.symbols)), [a, i] = u(!!(t != null && t.numbers)), [l, d] = u(!!(t != null && t.uppercase)), h = p(() => {
    const v = [[..._]];
    return l && v.push([...z]), a && v.push([...P]), c && v.push([...$]), v;
  }, [a, c, l]), f = m(() => {
    const v = [];
    for (let E = 0; E < r; E++) {
      const T = h[E % h.length], O = Math.floor(Math.random() * T.length);
      v.push(T[O]);
    }
    const S = H(v).map((E) => String.fromCharCode(E)).join("");
    n(S);
  }, [r, h]);
  return g(() => {
    f();
  }, [c, a, l, r, f]), {
    value: e,
    length: r,
    setLength: o,
    symbols: c,
    includeSymbols: s,
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
      const s = sessionStorage.getItem(t);
      return s ? JSON.parse(s) : e;
    } catch (s) {
      return console.error(`Error reading session storage key "${t}":`, s), e;
    }
  });
  return { value: n, setStoredValue: (s) => {
    try {
      const a = s instanceof Function ? s(s) : s;
      r(a), sessionStorage.setItem(t, JSON.stringify(a));
    } catch (a) {
      console.error(`Error writing session storage key "${t}":`, a);
    }
  }, deleteStoredValue: () => {
    r(void 0);
    try {
      sessionStorage.removeItem(t);
    } catch (s) {
      console.error(`Error deleting session storage key "${t}":`, s);
    }
  } };
}, y = (t, e) => t >= 0 && t < e, ne = (t = !1) => {
  const [e, n] = u([]), [r, o] = u(0);
  return { slides: e, activeSlideIndex: r, addSlide: (i, l) => {
    const d = [...e];
    l !== void 0 && y(l, e.length) ? (d.splice(l, 0, i), n(d)) : (d.push(i), n(d));
  }, removeSlide: (i) => {
    if (y(i, e.length)) {
      const l = e.filter((d, h) => h !== i);
      n(l), i === r && o(Math.max(i, 0));
    } else
      console.error(`Invalid slide index: ${i}`);
  }, activateSlide: (i) => {
    t ? i < 0 ? o(e.length - 1) : i >= e.length ? o(0) : o(i) : !t && y(i, e.length) ? o(i) : console.error(`Invalid slide index: ${i}`);
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
  }, [e, n]), c = m(() => {
    if (e.length !== 0)
      return e[e.length - 1];
  }, [e]), s = m(() => {
    n([]);
  }, [n]), a = m(
    (d) => e.includes(d),
    [e]
  ), i = m(() => [...e], [e]), l = m(() => e.length, [e]);
  return {
    items: e,
    push: r,
    pop: o,
    peek: c,
    clear: s,
    contains: a,
    toArray: i,
    size: l
  };
}, I = (t, e) => t >= 0 && t < e, se = () => {
  const [t, e] = u([]), [n, r] = u(0);
  return { tabs: t, activeTab: n, addTab: (a, i) => {
    const l = [...t];
    return i !== void 0 && I(i, t.length) ? (l.splice(i, 0, a), e(l), i) : (l.push(a), e(l), t.length - 1);
  }, removeTab: (a) => {
    if (I(a, t.length))
      e((i) => i.filter((l, d) => d !== a)), r(Math.max(0, a - 1));
    else
      throw new Error(`Invalid tab index: ${a}`);
  }, activateTab: (a) => {
    if (I(a, t.length))
      r(a);
    else
      throw new Error(`Invalid tab index: ${a}`);
  } };
}, oe = (t, e = 400) => {
  const [n, r] = u(t), o = M(Date.now());
  return g(() => {
    if (!Number.isInteger(e) || e < 0)
      throw new Error("Throttle interval must be a positive integer");
    Date.now() - o.current > e && (r(t), o.current = Date.now());
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
  se as useTabs,
  oe as useThrottle,
  ce as useWindowSize
};
