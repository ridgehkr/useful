import { useState as f, useMemo as I, useEffect as k, useCallback as m, useLayoutEffect as O, useRef as H } from "react";
const Bt = (t, e = !0) => {
  const [n, r] = f({
    data: null,
    loading: !1,
    error: null
  }), o = I(
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
  return k(() => {
    e && o();
  }, [e, o]), {
    ...n,
    run: o
  };
}, zt = () => {
  const [t, e] = f({
    level: 1,
    // Default to full battery
    charging: !1
    // Default to not charging
  });
  return k(() => {
    if (!navigator.getBattery) {
      console.error("Battery status API is not supported");
      return;
    }
    const n = () => {
      navigator.getBattery().then((r) => {
        e({
          level: r.level,
          charging: r.charging
        });
      }).catch((r) => {
        if (r instanceof Error) {
          console.error("Failed to get battery status:", r.message);
          return;
        } else
          console.error("Failed to get battery status:", r);
      });
    };
    return n(), navigator.getBattery().then((r) => {
      r.addEventListener("levelchange", n), r.addEventListener("chargingchange", n);
    }), () => {
      navigator.getBattery().then((r) => {
        r.removeEventListener("levelchange", n), r.removeEventListener("chargingchange", n);
      });
    };
  }, []), t;
}, Yt = () => {
  const [t, e] = f(null), n = m(
    (o) => {
      navigator.clipboard.writeText(o).then(() => e(o)).catch((s) => console.error("Failed to copy:", s));
    },
    [e]
  ), r = m(() => {
    e(null);
  }, [e]);
  return { value: t, copy: n, clear: r };
}, S = {
  aliceblue: [240, 248, 255],
  antiquewhite: [250, 235, 215],
  aqua: [0, 255, 255],
  aquamarine: [127, 255, 212],
  azure: [240, 255, 255],
  beige: [245, 245, 220],
  bisque: [255, 228, 196],
  black: [0, 0, 0],
  blanchedalmond: [255, 235, 205],
  blue: [0, 0, 255],
  blueviolet: [138, 43, 226],
  brown: [165, 42, 42],
  burlywood: [222, 184, 135],
  cadetblue: [95, 158, 160],
  chartreuse: [127, 255, 0],
  chocolate: [210, 105, 30],
  coral: [255, 127, 80],
  cornflowerblue: [100, 149, 237],
  cornsilk: [255, 248, 220],
  crimson: [220, 20, 60],
  cyan: [0, 255, 255],
  darkblue: [0, 0, 139],
  darkcyan: [0, 139, 139],
  darkgoldenrod: [184, 134, 11],
  darkgray: [169, 169, 169],
  darkgreen: [0, 100, 0],
  darkgrey: [169, 169, 169],
  darkkhaki: [189, 183, 107],
  darkmagenta: [139, 0, 139],
  darkolivegreen: [85, 107, 47],
  darkorange: [255, 140, 0],
  darkorchid: [153, 50, 204],
  darkred: [139, 0, 0],
  darksalmon: [233, 150, 122],
  darkseagreen: [143, 188, 143],
  darkslateblue: [72, 61, 139],
  darkslategray: [47, 79, 79],
  darkslategrey: [47, 79, 79],
  darkturquoise: [0, 206, 209],
  darkviolet: [148, 0, 211],
  deeppink: [255, 20, 147],
  deepskyblue: [0, 191, 255],
  dimgray: [105, 105, 105],
  dimgrey: [105, 105, 105],
  dodgerblue: [30, 144, 255],
  firebrick: [178, 34, 34],
  floralwhite: [255, 250, 240],
  forestgreen: [34, 139, 34],
  fuchsia: [255, 0, 255],
  gainsboro: [220, 220, 220],
  ghostwhite: [248, 248, 255],
  gold: [255, 215, 0],
  goldenrod: [218, 165, 32],
  gray: [128, 128, 128],
  green: [0, 128, 0],
  greenyellow: [173, 255, 47],
  grey: [128, 128, 128],
  honeydew: [240, 255, 240],
  hotpink: [255, 105, 180],
  indianred: [205, 92, 92],
  indigo: [75, 0, 130],
  ivory: [255, 255, 240],
  khaki: [240, 230, 140],
  lavender: [230, 230, 250],
  lavenderblush: [255, 240, 245],
  lawngreen: [124, 252, 0],
  lemonchiffon: [255, 250, 205],
  lightblue: [173, 216, 230],
  lightcoral: [240, 128, 128],
  lightcyan: [224, 255, 255],
  lightgoldenrodyellow: [250, 250, 210],
  lightgray: [211, 211, 211],
  lightgreen: [144, 238, 144],
  lightgrey: [211, 211, 211],
  lightpink: [255, 182, 193],
  lightsalmon: [255, 160, 122],
  lightseagreen: [32, 178, 170],
  lightskyblue: [135, 206, 250],
  lightslategray: [119, 136, 153],
  lightslategrey: [119, 136, 153],
  lightsteelblue: [176, 196, 222],
  lightyellow: [255, 255, 224],
  lime: [0, 255, 0],
  limegreen: [50, 205, 50],
  linen: [250, 240, 230],
  magenta: [255, 0, 255],
  maroon: [128, 0, 0],
  mediumaquamarine: [102, 205, 170],
  mediumblue: [0, 0, 205],
  mediumorchid: [186, 85, 211],
  mediumpurple: [147, 112, 219],
  mediumseagreen: [60, 179, 113],
  mediumslateblue: [123, 104, 238],
  mediumspringgreen: [0, 250, 154],
  mediumturquoise: [72, 209, 204],
  mediumvioletred: [199, 21, 133],
  midnightblue: [25, 25, 112],
  mintcream: [245, 255, 250],
  mistyrose: [255, 228, 225],
  moccasin: [255, 228, 181],
  navajowhite: [255, 222, 173],
  navy: [0, 0, 128],
  oldlace: [253, 245, 230],
  olive: [128, 128, 0],
  olivedrab: [107, 142, 35],
  orange: [255, 165, 0],
  orangered: [255, 69, 0],
  orchid: [218, 112, 214],
  palegoldenrod: [238, 232, 170],
  palegreen: [152, 251, 152],
  paleturquoise: [175, 238, 238],
  palevioletred: [219, 112, 147],
  papayawhip: [255, 239, 213],
  peachpuff: [255, 218, 185],
  peru: [205, 133, 63],
  pink: [255, 192, 203],
  plum: [221, 160, 221],
  powderblue: [176, 224, 230],
  purple: [128, 0, 128],
  rebeccapurple: [102, 51, 153],
  red: [255, 0, 0],
  rosybrown: [188, 143, 143],
  royalblue: [65, 105, 225],
  saddlebrown: [139, 69, 19],
  salmon: [250, 128, 114],
  sandybrown: [244, 164, 96],
  seagreen: [46, 139, 87],
  seashell: [255, 245, 238],
  sienna: [160, 82, 45],
  silver: [192, 192, 192],
  skyblue: [135, 206, 235],
  slateblue: [106, 90, 205],
  slategray: [112, 128, 144],
  slategrey: [112, 128, 144],
  snow: [255, 250, 250],
  springgreen: [0, 255, 127],
  steelblue: [70, 130, 180],
  tan: [210, 180, 140],
  teal: [0, 128, 128],
  thistle: [216, 191, 216],
  tomato: [255, 99, 71],
  turquoise: [64, 224, 208],
  violet: [238, 130, 238],
  wheat: [245, 222, 179],
  white: [255, 255, 255],
  whitesmoke: [245, 245, 245],
  yellow: [255, 255, 0],
  yellowgreen: [154, 205, 50]
}, ct = /* @__PURE__ */ Object.create(null);
for (const t in S)
  Object.hasOwn(S, t) && (ct[S[t]] = t);
const w = {
  to: {},
  get: {}
};
w.get = function(t) {
  const e = t.slice(0, 3).toLowerCase();
  let n, r;
  switch (e) {
    case "hsl": {
      n = w.get.hsl(t), r = "hsl";
      break;
    }
    case "hwb": {
      n = w.get.hwb(t), r = "hwb";
      break;
    }
    default: {
      n = w.get.rgb(t), r = "rgb";
      break;
    }
  }
  return n ? { model: r, value: n } : null;
};
w.get.rgb = function(t) {
  if (!t)
    return null;
  const e = /^#([a-f\d]{3,4})$/i, n = /^#([a-f\d]{6})([a-f\d]{2})?$/i, r = /^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|/]\s*([+-]?[\d.]+)(%?)\s*)?\)$/, o = /^rgba?\(\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*(?:[,|/]\s*([+-]?[\d.]+)(%?)\s*)?\)$/, s = /^(\w+)$/;
  let c = [0, 0, 0, 1], a, l, i;
  if (a = t.match(n)) {
    for (i = a[2], a = a[1], l = 0; l < 3; l++) {
      const h = l * 2;
      c[l] = Number.parseInt(a.slice(h, h + 2), 16);
    }
    i && (c[3] = Number.parseInt(i, 16) / 255);
  } else if (a = t.match(e)) {
    for (a = a[1], i = a[3], l = 0; l < 3; l++)
      c[l] = Number.parseInt(a[l] + a[l], 16);
    i && (c[3] = Number.parseInt(i + i, 16) / 255);
  } else if (a = t.match(r)) {
    for (l = 0; l < 3; l++)
      c[l] = Number.parseInt(a[l + 1], 10);
    a[4] && (c[3] = a[5] ? Number.parseFloat(a[4]) * 0.01 : Number.parseFloat(a[4]));
  } else if (a = t.match(o)) {
    for (l = 0; l < 3; l++)
      c[l] = Math.round(Number.parseFloat(a[l + 1]) * 2.55);
    a[4] && (c[3] = a[5] ? Number.parseFloat(a[4]) * 0.01 : Number.parseFloat(a[4]));
  } else
    return (a = t.match(s)) ? a[1] === "transparent" ? [0, 0, 0, 0] : Object.hasOwn(S, a[1]) ? (c = S[a[1]], c[3] = 1, c) : null : null;
  for (l = 0; l < 3; l++)
    c[l] = T(c[l], 0, 255);
  return c[3] = T(c[3], 0, 1), c;
};
w.get.hsl = function(t) {
  if (!t)
    return null;
  const e = /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*(?:[,|/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/, n = t.match(e);
  if (n) {
    const r = Number.parseFloat(n[4]), o = (Number.parseFloat(n[1]) % 360 + 360) % 360, s = T(Number.parseFloat(n[2]), 0, 100), c = T(Number.parseFloat(n[3]), 0, 100), a = T(Number.isNaN(r) ? 1 : r, 0, 1);
    return [o, s, c, a];
  }
  return null;
};
w.get.hwb = function(t) {
  if (!t)
    return null;
  const e = /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/, n = t.match(e);
  if (n) {
    const r = Number.parseFloat(n[4]), o = (Number.parseFloat(n[1]) % 360 + 360) % 360, s = T(Number.parseFloat(n[2]), 0, 100), c = T(Number.parseFloat(n[3]), 0, 100), a = T(Number.isNaN(r) ? 1 : r, 0, 1);
    return [o, s, c, a];
  }
  return null;
};
w.to.hex = function(...t) {
  return "#" + P(t[0]) + P(t[1]) + P(t[2]) + (t[3] < 1 ? P(Math.round(t[3] * 255)) : "");
};
w.to.rgb = function(...t) {
  return t.length < 4 || t[3] === 1 ? "rgb(" + Math.round(t[0]) + ", " + Math.round(t[1]) + ", " + Math.round(t[2]) + ")" : "rgba(" + Math.round(t[0]) + ", " + Math.round(t[1]) + ", " + Math.round(t[2]) + ", " + t[3] + ")";
};
w.to.rgb.percent = function(...t) {
  const e = Math.round(t[0] / 255 * 100), n = Math.round(t[1] / 255 * 100), r = Math.round(t[2] / 255 * 100);
  return t.length < 4 || t[3] === 1 ? "rgb(" + e + "%, " + n + "%, " + r + "%)" : "rgba(" + e + "%, " + n + "%, " + r + "%, " + t[3] + ")";
};
w.to.hsl = function(...t) {
  return t.length < 4 || t[3] === 1 ? "hsl(" + t[0] + ", " + t[1] + "%, " + t[2] + "%)" : "hsla(" + t[0] + ", " + t[1] + "%, " + t[2] + "%, " + t[3] + ")";
};
w.to.hwb = function(...t) {
  let e = "";
  return t.length >= 4 && t[3] !== 1 && (e = ", " + t[3]), "hwb(" + t[0] + ", " + t[1] + "%, " + t[2] + "%" + e + ")";
};
w.to.keyword = function(...t) {
  return ct[t.slice(0, 3)];
};
function T(t, e, n) {
  return Math.min(Math.max(e, t), n);
}
function P(t) {
  const e = Math.round(t).toString(16).toUpperCase();
  return e.length < 2 ? "0" + e : e;
}
const at = {};
for (const t of Object.keys(S))
  at[S[t]] = t;
const u = {
  rgb: { channels: 3, labels: "rgb" },
  hsl: { channels: 3, labels: "hsl" },
  hsv: { channels: 3, labels: "hsv" },
  hwb: { channels: 3, labels: "hwb" },
  cmyk: { channels: 4, labels: "cmyk" },
  xyz: { channels: 3, labels: "xyz" },
  lab: { channels: 3, labels: "lab" },
  oklab: { channels: 3, labels: ["okl", "oka", "okb"] },
  lch: { channels: 3, labels: "lch" },
  oklch: { channels: 3, labels: ["okl", "okc", "okh"] },
  hex: { channels: 1, labels: ["hex"] },
  keyword: { channels: 1, labels: ["keyword"] },
  ansi16: { channels: 1, labels: ["ansi16"] },
  ansi256: { channels: 1, labels: ["ansi256"] },
  hcg: { channels: 3, labels: ["h", "c", "g"] },
  apple: { channels: 3, labels: ["r16", "g16", "b16"] },
  gray: { channels: 1, labels: ["gray"] }
}, L = (6 / 29) ** 3;
function N(t) {
  const e = t > 31308e-7 ? 1.055 * t ** 0.4166666666666667 - 0.055 : t * 12.92;
  return Math.min(Math.max(0, e), 1);
}
function A(t) {
  return t > 0.04045 ? ((t + 0.055) / 1.055) ** 2.4 : t / 12.92;
}
for (const t of Object.keys(u)) {
  if (!("channels" in u[t]))
    throw new Error("missing channels property: " + t);
  if (!("labels" in u[t]))
    throw new Error("missing channel labels property: " + t);
  if (u[t].labels.length !== u[t].channels)
    throw new Error("channel and label counts mismatch: " + t);
  const { channels: e, labels: n } = u[t];
  delete u[t].channels, delete u[t].labels, Object.defineProperty(u[t], "channels", { value: e }), Object.defineProperty(u[t], "labels", { value: n });
}
u.rgb.hsl = function(t) {
  const e = t[0] / 255, n = t[1] / 255, r = t[2] / 255, o = Math.min(e, n, r), s = Math.max(e, n, r), c = s - o;
  let a, l;
  switch (s) {
    case o: {
      a = 0;
      break;
    }
    case e: {
      a = (n - r) / c;
      break;
    }
    case n: {
      a = 2 + (r - e) / c;
      break;
    }
    case r: {
      a = 4 + (e - n) / c;
      break;
    }
  }
  a = Math.min(a * 60, 360), a < 0 && (a += 360);
  const i = (o + s) / 2;
  return s === o ? l = 0 : i <= 0.5 ? l = c / (s + o) : l = c / (2 - s - o), [a, l * 100, i * 100];
};
u.rgb.hsv = function(t) {
  let e, n, r, o, s;
  const c = t[0] / 255, a = t[1] / 255, l = t[2] / 255, i = Math.max(c, a, l), h = i - Math.min(c, a, l), d = function(_) {
    return (i - _) / 6 / h + 1 / 2;
  };
  if (h === 0)
    o = 0, s = 0;
  else {
    switch (s = h / i, e = d(c), n = d(a), r = d(l), i) {
      case c: {
        o = r - n;
        break;
      }
      case a: {
        o = 1 / 3 + e - r;
        break;
      }
      case l: {
        o = 2 / 3 + n - e;
        break;
      }
    }
    o < 0 ? o += 1 : o > 1 && (o -= 1);
  }
  return [
    o * 360,
    s * 100,
    i * 100
  ];
};
u.rgb.hwb = function(t) {
  const e = t[0], n = t[1];
  let r = t[2];
  const o = u.rgb.hsl(t)[0], s = 1 / 255 * Math.min(e, Math.min(n, r));
  return r = 1 - 1 / 255 * Math.max(e, Math.max(n, r)), [o, s * 100, r * 100];
};
u.rgb.oklab = function(t) {
  const e = A(t[0] / 255), n = A(t[1] / 255), r = A(t[2] / 255), o = Math.cbrt(0.4122214708 * e + 0.5363325363 * n + 0.0514459929 * r), s = Math.cbrt(0.2119034982 * e + 0.6806995451 * n + 0.1073969566 * r), c = Math.cbrt(0.0883024619 * e + 0.2817188376 * n + 0.6299787005 * r), a = 0.2104542553 * o + 0.793617785 * s - 0.0040720468 * c, l = 1.9779984951 * o - 2.428592205 * s + 0.4505937099 * c, i = 0.0259040371 * o + 0.7827717662 * s - 0.808675766 * c;
  return [a * 100, l * 100, i * 100];
};
u.rgb.cmyk = function(t) {
  const e = t[0] / 255, n = t[1] / 255, r = t[2] / 255, o = Math.min(1 - e, 1 - n, 1 - r), s = (1 - e - o) / (1 - o) || 0, c = (1 - n - o) / (1 - o) || 0, a = (1 - r - o) / (1 - o) || 0;
  return [s * 100, c * 100, a * 100, o * 100];
};
function ut(t, e) {
  return (t[0] - e[0]) ** 2 + (t[1] - e[1]) ** 2 + (t[2] - e[2]) ** 2;
}
u.rgb.keyword = function(t) {
  const e = at[t];
  if (e)
    return e;
  let n = Number.POSITIVE_INFINITY, r;
  for (const o of Object.keys(S)) {
    const s = S[o], c = ut(t, s);
    c < n && (n = c, r = o);
  }
  return r;
};
u.keyword.rgb = function(t) {
  return S[t];
};
u.rgb.xyz = function(t) {
  const e = A(t[0] / 255), n = A(t[1] / 255), r = A(t[2] / 255), o = e * 0.4124564 + n * 0.3575761 + r * 0.1804375, s = e * 0.2126729 + n * 0.7151522 + r * 0.072175, c = e * 0.0193339 + n * 0.119192 + r * 0.9503041;
  return [o * 100, s * 100, c * 100];
};
u.rgb.lab = function(t) {
  const e = u.rgb.xyz(t);
  let n = e[0], r = e[1], o = e[2];
  n /= 95.047, r /= 100, o /= 108.883, n = n > L ? n ** (1 / 3) : 7.787 * n + 16 / 116, r = r > L ? r ** (1 / 3) : 7.787 * r + 16 / 116, o = o > L ? o ** (1 / 3) : 7.787 * o + 16 / 116;
  const s = 116 * r - 16, c = 500 * (n - r), a = 200 * (r - o);
  return [s, c, a];
};
u.hsl.rgb = function(t) {
  const e = t[0] / 360, n = t[1] / 100, r = t[2] / 100;
  let o, s;
  if (n === 0)
    return s = r * 255, [s, s, s];
  const c = r < 0.5 ? r * (1 + n) : r + n - r * n, a = 2 * r - c, l = [0, 0, 0];
  for (let i = 0; i < 3; i++)
    o = e + 1 / 3 * -(i - 1), o < 0 && o++, o > 1 && o--, 6 * o < 1 ? s = a + (c - a) * 6 * o : 2 * o < 1 ? s = c : 3 * o < 2 ? s = a + (c - a) * (2 / 3 - o) * 6 : s = a, l[i] = s * 255;
  return l;
};
u.hsl.hsv = function(t) {
  const e = t[0];
  let n = t[1] / 100, r = t[2] / 100, o = n;
  const s = Math.max(r, 0.01);
  r *= 2, n *= r <= 1 ? r : 2 - r, o *= s <= 1 ? s : 2 - s;
  const c = (r + n) / 2, a = r === 0 ? 2 * o / (s + o) : 2 * n / (r + n);
  return [e, a * 100, c * 100];
};
u.hsv.rgb = function(t) {
  const e = t[0] / 60, n = t[1] / 100;
  let r = t[2] / 100;
  const o = Math.floor(e) % 6, s = e - Math.floor(e), c = 255 * r * (1 - n), a = 255 * r * (1 - n * s), l = 255 * r * (1 - n * (1 - s));
  switch (r *= 255, o) {
    case 0:
      return [r, l, c];
    case 1:
      return [a, r, c];
    case 2:
      return [c, r, l];
    case 3:
      return [c, a, r];
    case 4:
      return [l, c, r];
    case 5:
      return [r, c, a];
  }
};
u.hsv.hsl = function(t) {
  const e = t[0], n = t[1] / 100, r = t[2] / 100, o = Math.max(r, 0.01);
  let s, c;
  c = (2 - n) * r;
  const a = (2 - n) * o;
  return s = n * o, s /= a <= 1 ? a : 2 - a, s = s || 0, c /= 2, [e, s * 100, c * 100];
};
u.hwb.rgb = function(t) {
  const e = t[0] / 360;
  let n = t[1] / 100, r = t[2] / 100;
  const o = n + r;
  let s;
  o > 1 && (n /= o, r /= o);
  const c = Math.floor(6 * e), a = 1 - r;
  s = 6 * e - c, c & 1 && (s = 1 - s);
  const l = n + s * (a - n);
  let i, h, d;
  switch (c) {
    default:
    case 6:
    case 0: {
      i = a, h = l, d = n;
      break;
    }
    case 1: {
      i = l, h = a, d = n;
      break;
    }
    case 2: {
      i = n, h = a, d = l;
      break;
    }
    case 3: {
      i = n, h = l, d = a;
      break;
    }
    case 4: {
      i = l, h = n, d = a;
      break;
    }
    case 5: {
      i = a, h = n, d = l;
      break;
    }
  }
  return [i * 255, h * 255, d * 255];
};
u.cmyk.rgb = function(t) {
  const e = t[0] / 100, n = t[1] / 100, r = t[2] / 100, o = t[3] / 100, s = 1 - Math.min(1, e * (1 - o) + o), c = 1 - Math.min(1, n * (1 - o) + o), a = 1 - Math.min(1, r * (1 - o) + o);
  return [s * 255, c * 255, a * 255];
};
u.xyz.rgb = function(t) {
  const e = t[0] / 100, n = t[1] / 100, r = t[2] / 100;
  let o, s, c;
  return o = e * 3.2404542 + n * -1.5371385 + r * -0.4985314, s = e * -0.969266 + n * 1.8760108 + r * 0.041556, c = e * 0.0556434 + n * -0.2040259 + r * 1.0572252, o = N(o), s = N(s), c = N(c), [o * 255, s * 255, c * 255];
};
u.xyz.lab = function(t) {
  let e = t[0], n = t[1], r = t[2];
  e /= 95.047, n /= 100, r /= 108.883, e = e > L ? e ** (1 / 3) : 7.787 * e + 16 / 116, n = n > L ? n ** (1 / 3) : 7.787 * n + 16 / 116, r = r > L ? r ** (1 / 3) : 7.787 * r + 16 / 116;
  const o = 116 * n - 16, s = 500 * (e - n), c = 200 * (n - r);
  return [o, s, c];
};
u.xyz.oklab = function(t) {
  const e = t[0] / 100, n = t[1] / 100, r = t[2] / 100, o = Math.cbrt(0.8189330101 * e + 0.3618667424 * n - 0.1288597137 * r), s = Math.cbrt(0.0329845436 * e + 0.9293118715 * n + 0.0361456387 * r), c = Math.cbrt(0.0482003018 * e + 0.2643662691 * n + 0.633851707 * r), a = 0.2104542553 * o + 0.793617785 * s - 0.0040720468 * c, l = 1.9779984951 * o - 2.428592205 * s + 0.4505937099 * c, i = 0.0259040371 * o + 0.7827717662 * s - 0.808675766 * c;
  return [a * 100, l * 100, i * 100];
};
u.oklab.oklch = function(t) {
  return u.lab.lch(t);
};
u.oklab.xyz = function(t) {
  const e = t[0] / 100, n = t[1] / 100, r = t[2] / 100, o = (0.999999998 * e + 0.396337792 * n + 0.215803758 * r) ** 3, s = (1.000000008 * e - 0.105561342 * n - 0.063854175 * r) ** 3, c = (1.000000055 * e - 0.089484182 * n - 1.291485538 * r) ** 3, a = 1.227013851 * o - 0.55779998 * s + 0.281256149 * c, l = -0.040580178 * o + 1.11225687 * s - 0.071676679 * c, i = -0.076381285 * o - 0.421481978 * s + 1.58616322 * c;
  return [a * 100, l * 100, i * 100];
};
u.oklab.rgb = function(t) {
  const e = t[0] / 100, n = t[1] / 100, r = t[2] / 100, o = (e + 0.3963377774 * n + 0.2158037573 * r) ** 3, s = (e - 0.1055613458 * n - 0.0638541728 * r) ** 3, c = (e - 0.0894841775 * n - 1.291485548 * r) ** 3, a = N(4.0767416621 * o - 3.3077115913 * s + 0.2309699292 * c), l = N(-1.2684380046 * o + 2.6097574011 * s - 0.3413193965 * c), i = N(-0.0041960863 * o - 0.7034186147 * s + 1.707614701 * c);
  return [a * 255, l * 255, i * 255];
};
u.oklch.oklab = function(t) {
  return u.lch.lab(t);
};
u.lab.xyz = function(t) {
  const e = t[0], n = t[1], r = t[2];
  let o, s, c;
  s = (e + 16) / 116, o = n / 500 + s, c = s - r / 200;
  const a = s ** 3, l = o ** 3, i = c ** 3;
  return s = a > L ? a : (s - 16 / 116) / 7.787, o = l > L ? l : (o - 16 / 116) / 7.787, c = i > L ? i : (c - 16 / 116) / 7.787, o *= 95.047, s *= 100, c *= 108.883, [o, s, c];
};
u.lab.lch = function(t) {
  const e = t[0], n = t[1], r = t[2];
  let o;
  o = Math.atan2(r, n) * 360 / 2 / Math.PI, o < 0 && (o += 360);
  const c = Math.sqrt(n * n + r * r);
  return [e, c, o];
};
u.lch.lab = function(t) {
  const e = t[0], n = t[1], o = t[2] / 360 * 2 * Math.PI, s = n * Math.cos(o), c = n * Math.sin(o);
  return [e, s, c];
};
u.rgb.ansi16 = function(t, e = null) {
  const [n, r, o] = t;
  let s = e === null ? u.rgb.hsv(t)[2] : e;
  if (s = Math.round(s / 50), s === 0)
    return 30;
  let c = 30 + (Math.round(o / 255) << 2 | Math.round(r / 255) << 1 | Math.round(n / 255));
  return s === 2 && (c += 60), c;
};
u.hsv.ansi16 = function(t) {
  return u.rgb.ansi16(u.hsv.rgb(t), t[2]);
};
u.rgb.ansi256 = function(t) {
  const e = t[0], n = t[1], r = t[2];
  return e >> 4 === n >> 4 && n >> 4 === r >> 4 ? e < 8 ? 16 : e > 248 ? 231 : Math.round((e - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(e / 255 * 5) + 6 * Math.round(n / 255 * 5) + Math.round(r / 255 * 5);
};
u.ansi16.rgb = function(t) {
  t = t[0];
  let e = t % 10;
  if (e === 0 || e === 7)
    return t > 50 && (e += 3.5), e = e / 10.5 * 255, [e, e, e];
  const n = (Math.trunc(t > 50) + 1) * 0.5, r = (e & 1) * n * 255, o = (e >> 1 & 1) * n * 255, s = (e >> 2 & 1) * n * 255;
  return [r, o, s];
};
u.ansi256.rgb = function(t) {
  if (t = t[0], t >= 232) {
    const s = (t - 232) * 10 + 8;
    return [s, s, s];
  }
  t -= 16;
  let e;
  const n = Math.floor(t / 36) / 5 * 255, r = Math.floor((e = t % 36) / 6) / 5 * 255, o = e % 6 / 5 * 255;
  return [n, r, o];
};
u.rgb.hex = function(t) {
  const n = (((Math.round(t[0]) & 255) << 16) + ((Math.round(t[1]) & 255) << 8) + (Math.round(t[2]) & 255)).toString(16).toUpperCase();
  return "000000".slice(n.length) + n;
};
u.hex.rgb = function(t) {
  const e = t.toString(16).match(/[a-f\d]{6}|[a-f\d]{3}/i);
  if (!e)
    return [0, 0, 0];
  let n = e[0];
  e[0].length === 3 && (n = [...n].map((a) => a + a).join(""));
  const r = Number.parseInt(n, 16), o = r >> 16 & 255, s = r >> 8 & 255, c = r & 255;
  return [o, s, c];
};
u.rgb.hcg = function(t) {
  const e = t[0] / 255, n = t[1] / 255, r = t[2] / 255, o = Math.max(Math.max(e, n), r), s = Math.min(Math.min(e, n), r), c = o - s;
  let a;
  const l = c < 1 ? s / (1 - c) : 0;
  return c <= 0 ? a = 0 : o === e ? a = (n - r) / c % 6 : o === n ? a = 2 + (r - e) / c : a = 4 + (e - n) / c, a /= 6, a %= 1, [a * 360, c * 100, l * 100];
};
u.hsl.hcg = function(t) {
  const e = t[1] / 100, n = t[2] / 100, r = n < 0.5 ? 2 * e * n : 2 * e * (1 - n);
  let o = 0;
  return r < 1 && (o = (n - 0.5 * r) / (1 - r)), [t[0], r * 100, o * 100];
};
u.hsv.hcg = function(t) {
  const e = t[1] / 100, n = t[2] / 100, r = e * n;
  let o = 0;
  return r < 1 && (o = (n - r) / (1 - r)), [t[0], r * 100, o * 100];
};
u.hcg.rgb = function(t) {
  const e = t[0] / 360, n = t[1] / 100, r = t[2] / 100;
  if (n === 0)
    return [r * 255, r * 255, r * 255];
  const o = [0, 0, 0], s = e % 1 * 6, c = s % 1, a = 1 - c;
  let l = 0;
  switch (Math.floor(s)) {
    case 0: {
      o[0] = 1, o[1] = c, o[2] = 0;
      break;
    }
    case 1: {
      o[0] = a, o[1] = 1, o[2] = 0;
      break;
    }
    case 2: {
      o[0] = 0, o[1] = 1, o[2] = c;
      break;
    }
    case 3: {
      o[0] = 0, o[1] = a, o[2] = 1;
      break;
    }
    case 4: {
      o[0] = c, o[1] = 0, o[2] = 1;
      break;
    }
    default:
      o[0] = 1, o[1] = 0, o[2] = a;
  }
  return l = (1 - n) * r, [
    (n * o[0] + l) * 255,
    (n * o[1] + l) * 255,
    (n * o[2] + l) * 255
  ];
};
u.hcg.hsv = function(t) {
  const e = t[1] / 100, n = t[2] / 100, r = e + n * (1 - e);
  let o = 0;
  return r > 0 && (o = e / r), [t[0], o * 100, r * 100];
};
u.hcg.hsl = function(t) {
  const e = t[1] / 100, r = t[2] / 100 * (1 - e) + 0.5 * e;
  let o = 0;
  return r > 0 && r < 0.5 ? o = e / (2 * r) : r >= 0.5 && r < 1 && (o = e / (2 * (1 - r))), [t[0], o * 100, r * 100];
};
u.hcg.hwb = function(t) {
  const e = t[1] / 100, n = t[2] / 100, r = e + n * (1 - e);
  return [t[0], (r - e) * 100, (1 - r) * 100];
};
u.hwb.hcg = function(t) {
  const e = t[1] / 100, r = 1 - t[2] / 100, o = r - e;
  let s = 0;
  return o < 1 && (s = (r - o) / (1 - o)), [t[0], o * 100, s * 100];
};
u.apple.rgb = function(t) {
  return [t[0] / 65535 * 255, t[1] / 65535 * 255, t[2] / 65535 * 255];
};
u.rgb.apple = function(t) {
  return [t[0] / 255 * 65535, t[1] / 255 * 65535, t[2] / 255 * 65535];
};
u.gray.rgb = function(t) {
  return [t[0] / 100 * 255, t[0] / 100 * 255, t[0] / 100 * 255];
};
u.gray.hsl = function(t) {
  return [0, 0, t[0]];
};
u.gray.hsv = u.gray.hsl;
u.gray.hwb = function(t) {
  return [0, 100, t[0]];
};
u.gray.cmyk = function(t) {
  return [0, 0, 0, t[0]];
};
u.gray.lab = function(t) {
  return [t[0], 0, 0];
};
u.gray.hex = function(t) {
  const e = Math.round(t[0] / 100 * 255) & 255, r = ((e << 16) + (e << 8) + e).toString(16).toUpperCase();
  return "000000".slice(r.length) + r;
};
u.rgb.gray = function(t) {
  return [(t[0] + t[1] + t[2]) / 3 / 255 * 100];
};
function ht() {
  const t = {}, e = Object.keys(u);
  for (let { length: n } = e, r = 0; r < n; r++)
    t[e[r]] = {
      // http://jsperf.com/1-vs-infinity
      // micro-opt, but this is simple.
      distance: -1,
      parent: null
    };
  return t;
}
function dt(t) {
  const e = ht(), n = [t];
  for (e[t].distance = 0; n.length > 0; ) {
    const r = n.pop(), o = Object.keys(u[r]);
    for (let { length: s } = o, c = 0; c < s; c++) {
      const a = o[c], l = e[a];
      l.distance === -1 && (l.distance = e[r].distance + 1, l.parent = r, n.unshift(a));
    }
  }
  return e;
}
function ft(t, e) {
  return function(n) {
    return e(t(n));
  };
}
function mt(t, e) {
  const n = [e[t].parent, t];
  let r = u[e[t].parent][t], o = e[t].parent;
  for (; e[o].parent; )
    n.unshift(e[o].parent), r = ft(u[e[o].parent][o], r), o = e[o].parent;
  return r.conversion = n, r;
}
function gt(t) {
  const e = dt(t), n = {}, r = Object.keys(e);
  for (let { length: o } = r, s = 0; s < o; s++) {
    const c = r[s];
    e[c].parent !== null && (n[c] = mt(c, e));
  }
  return n;
}
const y = {}, bt = Object.keys(u);
function _t(t) {
  const e = function(...n) {
    const r = n[0];
    return r == null ? r : (r.length > 1 && (n = r), t(n));
  };
  return "conversion" in t && (e.conversion = t.conversion), e;
}
function pt(t) {
  const e = function(...n) {
    const r = n[0];
    if (r == null)
      return r;
    r.length > 1 && (n = r);
    const o = t(n);
    if (typeof o == "object")
      for (let { length: s } = o, c = 0; c < s; c++)
        o[c] = Math.round(o[c]);
    return o;
  };
  return "conversion" in t && (e.conversion = t.conversion), e;
}
for (const t of bt) {
  y[t] = {}, Object.defineProperty(y[t], "channels", { value: u[t].channels }), Object.defineProperty(y[t], "labels", { value: u[t].labels });
  const e = gt(t), n = Object.keys(e);
  for (const r of n) {
    const o = e[r];
    y[t][r] = pt(o), y[t][r].raw = _t(o);
  }
}
const lt = [
  // To be honest, I don't really feel like keyword belongs in color convert, but eh.
  "keyword",
  // Gray conflicts with some method names, and has its own method defined.
  "gray",
  // Shouldn't really be in color-convert either...
  "hex"
], W = {};
for (const t of Object.keys(y))
  W[[...y[t].labels].sort().join("")] = t;
const F = {};
function g(t, e) {
  if (!(this instanceof g))
    return new g(t, e);
  if (e && e in lt && (e = null), e && !(e in y))
    throw new Error("Unknown model: " + e);
  let n, r;
  if (t == null)
    this.model = "rgb", this.color = [0, 0, 0], this.valpha = 1;
  else if (t instanceof g)
    this.model = t.model, this.color = [...t.color], this.valpha = t.valpha;
  else if (typeof t == "string") {
    const o = w.get(t);
    if (o === null)
      throw new Error("Unable to parse color from string: " + t);
    this.model = o.model, r = y[this.model].channels, this.color = o.value.slice(0, r), this.valpha = typeof o.value[r] == "number" ? o.value[r] : 1;
  } else if (t.length > 0) {
    this.model = e || "rgb", r = y[this.model].channels;
    const o = Array.prototype.slice.call(t, 0, r);
    this.color = $(o, r), this.valpha = typeof t[r] == "number" ? t[r] : 1;
  } else if (typeof t == "number")
    this.model = "rgb", this.color = [
      t >> 16 & 255,
      t >> 8 & 255,
      t & 255
    ], this.valpha = 1;
  else {
    this.valpha = 1;
    const o = Object.keys(t);
    "alpha" in t && (o.splice(o.indexOf("alpha"), 1), this.valpha = typeof t.alpha == "number" ? t.alpha : 0);
    const s = o.sort().join("");
    if (!(s in W))
      throw new Error("Unable to parse color from object: " + JSON.stringify(t));
    this.model = W[s];
    const { labels: c } = y[this.model], a = [];
    for (n = 0; n < c.length; n++)
      a.push(t[c[n]]);
    this.color = $(a);
  }
  if (F[this.model])
    for (r = y[this.model].channels, n = 0; n < r; n++) {
      const o = F[this.model][n];
      o && (this.color[n] = o(this.color[n]));
    }
  this.valpha = Math.max(0, Math.min(1, this.valpha)), Object.freeze && Object.freeze(this);
}
g.prototype = {
  toString() {
    return this.string();
  },
  toJSON() {
    return this[this.model]();
  },
  string(t) {
    let e = this.model in w.to ? this : this.rgb();
    e = e.round(typeof t == "number" ? t : 1);
    const n = e.valpha === 1 ? e.color : [...e.color, this.valpha];
    return w.to[e.model](...n);
  },
  percentString(t) {
    const e = this.rgb().round(typeof t == "number" ? t : 1), n = e.valpha === 1 ? e.color : [...e.color, this.valpha];
    return w.to.rgb.percent(...n);
  },
  array() {
    return this.valpha === 1 ? [...this.color] : [...this.color, this.valpha];
  },
  object() {
    const t = {}, { channels: e } = y[this.model], { labels: n } = y[this.model];
    for (let r = 0; r < e; r++)
      t[n[r]] = this.color[r];
    return this.valpha !== 1 && (t.alpha = this.valpha), t;
  },
  unitArray() {
    const t = this.rgb().color;
    return t[0] /= 255, t[1] /= 255, t[2] /= 255, this.valpha !== 1 && t.push(this.valpha), t;
  },
  unitObject() {
    const t = this.rgb().object();
    return t.r /= 255, t.g /= 255, t.b /= 255, this.valpha !== 1 && (t.alpha = this.valpha), t;
  },
  round(t) {
    return t = Math.max(t || 0, 0), new g([...this.color.map(wt(t)), this.valpha], this.model);
  },
  alpha(t) {
    return t !== void 0 ? new g([...this.color, Math.max(0, Math.min(1, t))], this.model) : this.valpha;
  },
  // Rgb
  red: b("rgb", 0, p(255)),
  green: b("rgb", 1, p(255)),
  blue: b("rgb", 2, p(255)),
  hue: b(["hsl", "hsv", "hsl", "hwb", "hcg"], 0, (t) => (t % 360 + 360) % 360),
  saturationl: b("hsl", 1, p(100)),
  lightness: b("hsl", 2, p(100)),
  saturationv: b("hsv", 1, p(100)),
  value: b("hsv", 2, p(100)),
  chroma: b("hcg", 1, p(100)),
  gray: b("hcg", 2, p(100)),
  white: b("hwb", 1, p(100)),
  wblack: b("hwb", 2, p(100)),
  cyan: b("cmyk", 0, p(100)),
  magenta: b("cmyk", 1, p(100)),
  yellow: b("cmyk", 2, p(100)),
  black: b("cmyk", 3, p(100)),
  x: b("xyz", 0, p(95.047)),
  y: b("xyz", 1, p(100)),
  z: b("xyz", 2, p(108.833)),
  l: b("lab", 0, p(100)),
  a: b("lab", 1),
  b: b("lab", 2),
  keyword(t) {
    return t !== void 0 ? new g(t) : y[this.model].keyword(this.color);
  },
  hex(t) {
    return t !== void 0 ? new g(t) : w.to.hex(...this.rgb().round().color);
  },
  hexa(t) {
    if (t !== void 0)
      return new g(t);
    const e = this.rgb().round().color;
    let n = Math.round(this.valpha * 255).toString(16).toUpperCase();
    return n.length === 1 && (n = "0" + n), w.to.hex(...e) + n;
  },
  rgbNumber() {
    const t = this.rgb().color;
    return (t[0] & 255) << 16 | (t[1] & 255) << 8 | t[2] & 255;
  },
  luminosity() {
    const t = this.rgb().color, e = [];
    for (const [n, r] of t.entries()) {
      const o = r / 255;
      e[n] = o <= 0.04045 ? o / 12.92 : ((o + 0.055) / 1.055) ** 2.4;
    }
    return 0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2];
  },
  contrast(t) {
    const e = this.luminosity(), n = t.luminosity();
    return e > n ? (e + 0.05) / (n + 0.05) : (n + 0.05) / (e + 0.05);
  },
  level(t) {
    const e = this.contrast(t);
    return e >= 7 ? "AAA" : e >= 4.5 ? "AA" : "";
  },
  isDark() {
    const t = this.rgb().color;
    return (t[0] * 2126 + t[1] * 7152 + t[2] * 722) / 1e4 < 128;
  },
  isLight() {
    return !this.isDark();
  },
  negate() {
    const t = this.rgb();
    for (let e = 0; e < 3; e++)
      t.color[e] = 255 - t.color[e];
    return t;
  },
  lighten(t) {
    const e = this.hsl();
    return e.color[2] += e.color[2] * t, e;
  },
  darken(t) {
    const e = this.hsl();
    return e.color[2] -= e.color[2] * t, e;
  },
  saturate(t) {
    const e = this.hsl();
    return e.color[1] += e.color[1] * t, e;
  },
  desaturate(t) {
    const e = this.hsl();
    return e.color[1] -= e.color[1] * t, e;
  },
  whiten(t) {
    const e = this.hwb();
    return e.color[1] += e.color[1] * t, e;
  },
  blacken(t) {
    const e = this.hwb();
    return e.color[2] += e.color[2] * t, e;
  },
  grayscale() {
    const t = this.rgb().color, e = t[0] * 0.3 + t[1] * 0.59 + t[2] * 0.11;
    return g.rgb(e, e, e);
  },
  fade(t) {
    return this.alpha(this.valpha - this.valpha * t);
  },
  opaquer(t) {
    return this.alpha(this.valpha + this.valpha * t);
  },
  rotate(t) {
    const e = this.hsl();
    let n = e.color[0];
    return n = (n + t) % 360, n = n < 0 ? 360 + n : n, e.color[0] = n, e;
  },
  mix(t, e) {
    if (!t || !t.rgb)
      throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof t);
    const n = t.rgb(), r = this.rgb(), o = e === void 0 ? 0.5 : e, s = 2 * o - 1, c = n.alpha() - r.alpha(), a = ((s * c === -1 ? s : (s + c) / (1 + s * c)) + 1) / 2, l = 1 - a;
    return g.rgb(
      a * n.red() + l * r.red(),
      a * n.green() + l * r.green(),
      a * n.blue() + l * r.blue(),
      n.alpha() * o + r.alpha() * (1 - o)
    );
  }
};
for (const t of Object.keys(y)) {
  if (lt.includes(t))
    continue;
  const { channels: e } = y[t];
  g.prototype[t] = function(...n) {
    return this.model === t ? new g(this) : n.length > 0 ? new g(n, t) : new g([...yt(y[this.model][t].raw(this.color)), this.valpha], t);
  }, g[t] = function(...n) {
    let r = n[0];
    return typeof r == "number" && (r = $(n, e)), new g(r, t);
  };
}
function vt(t, e) {
  return Number(t.toFixed(e));
}
function wt(t) {
  return function(e) {
    return vt(e, t);
  };
}
function b(t, e, n) {
  t = Array.isArray(t) ? t : [t];
  for (const r of t)
    (F[r] || (F[r] = []))[e] = n;
  return t = t[0], function(r) {
    let o;
    return r !== void 0 ? (n && (r = n(r)), o = this[t](), o.color[e] = r, o) : (o = this[t]().color[e], n && (o = n(o)), o);
  };
}
function p(t) {
  return function(e) {
    return Math.max(0, Math.min(t, e));
  };
}
function yt(t) {
  return Array.isArray(t) ? t : [t];
}
function $(t, e) {
  for (let n = 0; n < e; n++)
    typeof t[n] != "number" && (t[n] = 0);
  return t;
}
const v = {
  // XYZ to RGB transformation matrix coefficients
  XYZ_TO_RGB: {
    R: { X: 3.2406, Y: -1.5372, Z: -0.4986 },
    G: { X: -0.9689, Y: 1.8758, Z: 0.0415 },
    B: { X: 0.0557, Y: -0.204, Z: 1.057 }
  },
  // Standard illuminant D65 white point
  WHITE_POINT: { X: 0.95047, Y: 1, Z: 1.08883 },
  // Gamma correction threshold
  GAMMA_THRESHOLD: 31308e-7,
  // LAB color space constants
  LAB: {
    DELTA: 6 / 29,
    DELTA_SQUARED: (6 / 29) ** 2,
    DELTA_CUBED: (6 / 29) ** 3,
    KAPPA: (29 / 3) ** 3,
    EPSILON: (6 / 29) ** 3
  },
  // sRGB luminance coefficients (ITU-R BT.709)
  LUMINANCE: { R: 0.2126, G: 0.7152, B: 0.0722 }
}, V = {
  HWB: /hwb\(\s*([0-9.]+)(?:deg)?\s+([0-9.%]+)\s+([0-9.%]+)\s*(?:\/\s*([0-9.%]+))?\s*\)/,
  LCH: /lch\(\s*([0-9.%]+)\s+([0-9.]+)\s+([0-9.]+)(?:deg)?\s*(?:\/\s*([0-9.%]+))?\s*\)/,
  OKLCH: /oklch\(\s*([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\s*(?:\/\s*([0-9.%]+))?\s*\)/
};
function x(t, e = !1) {
  const n = t.includes("%"), r = parseFloat(t);
  return e && n || n && !e ? r / 100 : r;
}
function Et(t) {
  return (t % 360 + 360) % 360;
}
function z(t) {
  return t > v.GAMMA_THRESHOLD ? 1.055 * Math.pow(t, 1 / 2.4) - 0.055 : 12.92 * t;
}
function Y(t) {
  return Math.round(Math.max(0, Math.min(1, t)) * 255);
}
function Mt(t) {
  const e = t.match(V.HWB);
  if (!e)
    return null;
  const [, n, r, o, s] = e, c = Et(parseFloat(n)), a = x(r, !0), l = x(o, !0), i = s ? x(s, s.includes("%")) : 1;
  try {
    return kt(c, a, l, i);
  } catch {
    return null;
  }
}
function kt(t, e, n, r) {
  const o = e + n;
  if (o >= 1) {
    const a = Math.round(e / o * 255);
    return g.rgb(a, a, a).alpha(r);
  }
  const s = (1 - n) / 2, c = o === 0 ? 0 : (1 - e - n) / (1 - Math.abs(2 * s - 1));
  return g.hsl(t, c * 100, s * 100).alpha(r);
}
function St(t) {
  const e = t.match(V.LCH);
  if (!e)
    return null;
  const [, n, r, o, s] = e, c = x(n, n.includes("%")), a = parseFloat(r), l = parseFloat(o), i = s ? x(s, s.includes("%")) : 1;
  try {
    return It(c, a, l, i);
  } catch {
    return null;
  }
}
function It(t, e, n, r) {
  const o = n * Math.PI / 180, s = e * Math.cos(o), c = e * Math.sin(o), a = Lt(t, s, c), l = Tt(a.x, a.y, a.z);
  return g.rgb(l.r, l.g, l.b).alpha(r);
}
function Lt(t, e, n) {
  const r = (t + 16) / 116, o = e / 500 + r, s = r - n / 200, c = o > v.LAB.DELTA ? o ** 3 : (o - 16 / 116) / 7.787, a = r > v.LAB.DELTA ? r ** 3 : (r - 16 / 116) / 7.787, l = s > v.LAB.DELTA ? s ** 3 : (s - 16 / 116) / 7.787;
  return {
    x: v.WHITE_POINT.X * c,
    y: v.WHITE_POINT.Y * a,
    z: v.WHITE_POINT.Z * l
  };
}
function Tt(t, e, n) {
  let r = t * v.XYZ_TO_RGB.R.X + e * v.XYZ_TO_RGB.R.Y + n * v.XYZ_TO_RGB.R.Z, o = t * v.XYZ_TO_RGB.G.X + e * v.XYZ_TO_RGB.G.Y + n * v.XYZ_TO_RGB.G.Z, s = t * v.XYZ_TO_RGB.B.X + e * v.XYZ_TO_RGB.B.Y + n * v.XYZ_TO_RGB.B.Z;
  return r = z(r), o = z(o), s = z(s), {
    r: Y(r),
    g: Y(o),
    b: Y(s)
  };
}
function Ot(t) {
  const e = t.match(V.OKLCH);
  if (!e)
    return null;
  const [, n, r, o, s] = e, c = parseFloat(n), a = parseFloat(r), l = parseFloat(o), i = s ? x(s, s.includes("%")) : 1;
  try {
    return Nt(c, a, l, i);
  } catch {
    return null;
  }
}
function Nt(t, e, n, r) {
  const o = n * Math.PI / 180, s = e * Math.cos(o), c = e * Math.sin(o), a = Math.max(0, Math.min(1, t + 0.3963377774 * s + 0.2158037573 * c)), l = Math.max(0, Math.min(1, t - 0.1055613458 * s - 0.0638541728 * c)), i = Math.max(
    0,
    Math.min(1, t - 0.0894841775 * s - 1.291485548 * c)
  ), h = [
    Math.round(a * 255),
    Math.round(l * 255),
    Math.round(i * 255)
  ];
  return g.rgb(h[0], h[1], h[2]).alpha(r);
}
function R(t) {
  if (!t || t.trim() === "")
    return null;
  const e = t.trim();
  if (e.startsWith("oklch(")) {
    const n = Ot(e);
    if (n)
      return n;
  }
  if (e.startsWith("hwb(")) {
    const n = Mt(e);
    if (n)
      return n;
  }
  if (e.startsWith("lch(")) {
    const n = St(e);
    if (n)
      return n;
  }
  try {
    return g(e);
  } catch {
    return null;
  }
}
function Z(t) {
  const e = t.rgb().array().map((n) => {
    const r = n / 255;
    return r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  });
  return v.LUMINANCE.R * e[0] + v.LUMINANCE.G * e[1] + v.LUMINANCE.B * e[2];
}
function Gt(t) {
  if (!t || t.trim() === "")
    return null;
  try {
    const e = R(t);
    if (!e)
      return null;
    const n = e.alpha(), r = n < 1, o = e.alpha(1), s = r ? g.rgb(
      Math.round(e.red() * n + 255 * (1 - n)),
      Math.round(e.green() * n + 255 * (1 - n)),
      Math.round(e.blue() * n + 255 * (1 - n))
    ) : e;
    return {
      hasAlpha: r,
      alpha: n,
      hex: e.hex(),
      hexWithoutAlpha: o.hex(),
      blendedWithWhite: s.hex()
    };
  } catch (e) {
    return console.warn("Invalid color provided to getColorInfo:", { colorString: t, error: e }), null;
  }
}
function Ut(t) {
  if (!t || t.trim() === "")
    return "";
  try {
    const e = R(t);
    return e ? e.hex() : "";
  } catch (e) {
    return console.warn("Invalid color provided to colorToHex:", { colorString: t, error: e }), "";
  }
}
function Wt(t) {
  return !t || t.trim() === "" ? !1 : R(t) !== null;
}
function $t(t = "", e = "") {
  return I(() => {
    if (!t || !e || t.trim() === "" || e.trim() === "")
      return 0;
    try {
      const n = R(t), r = R(e);
      if (!n || !r)
        return 0;
      const o = Z(n), s = Z(r), c = Math.max(o, s), a = Math.min(o, s), l = (c + 0.05) / (a + 0.05);
      return !isFinite(l) || isNaN(l) ? 0 : parseFloat(l.toFixed(2));
    } catch (n) {
      return console.warn("Invalid color provided to useColorContrast:", {
        colorA: t,
        colorB: e,
        error: n
      }), 0;
    }
  }, [t, e]);
}
function q(t, e) {
  try {
    return getComputedStyle(e).getPropertyValue(t);
  } catch (n) {
    return console.error("Could not get property value", n), "";
  }
}
const Vt = (t, e) => {
  const [n, r] = f(
    (e == null ? void 0 : e.current) ?? document.documentElement
  ), [o, s] = f(
    () => q(t, n)
  );
  return k(() => {
    e && r((e == null ? void 0 : e.current) ?? document.documentElement);
  }, [e]), k(() => {
    if (typeof t != "string" || !t.startsWith("--"))
      console.error(
        'Invalid property name. Property name must be a string and start with "--"'
      );
    else {
      const c = new MutationObserver(() => {
        const a = q(t, n);
        a !== o && s(a);
      });
      return c.observe(n, {
        attributes: !0,
        attributeFilter: ["style", "class", "id"]
      }), () => c.disconnect();
    }
  }, [t, o, n]), o;
}, At = "dark-mode", j = "change", D = window.matchMedia("(prefers-color-scheme: dark)"), Xt = (t) => {
  const [e, n] = f(
    t ?? D.matches
  );
  return k(() => {
    document.documentElement.classList.toggle(At, e);
  }, [e]), k(() => {
    const r = () => {
      n(!!D.matches);
    };
    return D.addEventListener(
      j,
      r
    ), () => {
      D.removeEventListener(
        j,
        r
      );
    };
  }, [n]), { isDarkMode: e, setIsDarkMode: n };
}, Zt = (t, e) => {
  const [n, r] = f(t);
  return k(() => {
    if (!Number.isInteger(e) || e < 0)
      console.error("Delay must be a positive integer");
    else {
      const o = setTimeout(() => {
        r(t);
      }, e);
      return () => clearTimeout(o);
    }
  }, [t, e]), n;
}, qt = () => {
  const [t, e] = f({
    alpha: null,
    beta: null,
    gamma: null
  });
  return k(() => {
    const n = (r) => {
      e({
        alpha: r.alpha,
        beta: r.beta,
        gamma: r.gamma
      });
    };
    return window.addEventListener("deviceorientation", n, !0), () => {
      window.removeEventListener(
        "deviceorientation",
        n,
        !0
      );
    };
  }, []), t;
}, jt = (t) => {
  const [e, n] = f({
    width: 0,
    height: 0
  });
  return O(() => {
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
}, Kt = (t) => {
  const [e, n] = f(), [r, o] = f(!1), [s, c] = f(null);
  return { load: m(
    async (l, i = {}) => {
      c(null), o(!0);
      try {
        const h = await fetch(l, i);
        if (!h.ok)
          throw new Error(
            "Network response to fetch() was unsuccessful." + h.statusText
          );
        const d = await h.json();
        n(t ? t(d) : d), o(!1);
      } catch (h) {
        h instanceof Error ? c(`Load operation could not be completed: ${h.message}`) : c("An unknown error occurred."), o(!1);
      }
    },
    [o, n, c, t]
  ), data: e, loading: r, error: s };
}, Qt = () => {
  const [t, e] = f({
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
  }, [e]);
  return k(() => {
    n();
  }, [n]), { location: t, getLocation: n };
}, Jt = (t = !1) => {
  const [e, n] = f(!1), r = H(null), o = m(() => {
    n(!0);
  }, [n]), s = m(() => {
    n(!1);
  }, [n]), c = I(() => {
    const a = ["mouseenter"], l = ["mouseleave"];
    return t && (a.push("touchstart"), l.push("touchend")), { activeEvents: a, inactiveEvents: l };
  }, [t]);
  return O(() => {
    const a = r == null ? void 0 : r.current;
    if (!a)
      return;
    const { activeEvents: l, inactiveEvents: i } = c;
    return l.forEach(
      (h) => a.addEventListener(h, o)
    ), i.forEach(
      (h) => a.addEventListener(h, s)
    ), () => {
      l.forEach(
        (h) => a.removeEventListener(h, o)
      ), i.forEach(
        (h) => a.removeEventListener(h, s)
      );
    };
  }, [c, o, s, r]), { ref: r, hasHover: e };
}, K = [
  "mousemove",
  "mousedown",
  "resize",
  "keydown",
  "touchstart",
  "touchmove",
  "wheel"
], Q = "visibilitychange", te = (t) => {
  const [e, n] = f(!1);
  return k(() => {
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
    return K.forEach(
      (a) => document.addEventListener(a, s)
    ), document.addEventListener(Q, c), o(), () => {
      K.forEach(
        (a) => document.removeEventListener(a, s)
      ), document.removeEventListener(Q, c), clearTimeout(r);
    };
  }, [t, e]), e;
}, ee = (t) => {
  const e = H(null), [n, r] = f(null);
  return O(() => {
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
}, ne = (t = []) => {
  const [e, n] = f([...t]), r = I(() => e[0], [e]), o = I(() => e.slice(1), [e]), s = I(() => e.length, [e]), c = m((d) => e[d], [e]), a = m(
    (d) => {
      n((_) => [d, ..._]);
    },
    [n]
  ), l = m(
    (d) => {
      n((_) => [..._, d]);
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
    append: l,
    remove: (d) => {
      n((_) => {
        const E = [..._];
        return E.splice(d, 1), E;
      });
    },
    update: (d, _) => {
      n((E) => {
        const C = [...E];
        return C[d] = _, C;
      });
    }
  };
}, re = (t, e) => {
  const [n, r] = f(() => {
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
}, J = "change", oe = (t) => {
  const [e, n] = f(!1);
  return O(() => {
    const r = window.matchMedia(t), o = (s) => {
      n(s.matches);
    };
    return n(r.matches), r.addEventListener(
      J,
      (s) => o(s)
    ), () => r.removeEventListener(J, o);
  }, [t]), e;
}, tt = "mousemove", se = () => {
  const [t, e] = f({ x: 0, y: 0 }), n = m(
    (r) => {
      e({ x: r.clientX, y: r.clientY });
    },
    [e]
  );
  return O(() => (document.addEventListener(tt, n), () => document.removeEventListener(tt, n)), [n]), t;
}, et = "online", nt = "offline", ce = () => {
  const [t, e] = f(navigator.onLine);
  return k(() => {
    const n = () => e(!0), r = () => e(!1);
    return window.addEventListener(et, n), window.addEventListener(nt, r), () => {
      window.removeEventListener(et, n), window.removeEventListener(nt, r);
    };
  }, [e]), t;
}, xt = {
  initialPage: 1,
  initialItemsPerPage: 10
}, ae = (t, e = xt) => {
  const { initialPage: n, initialItemsPerPage: r } = e, [o, s] = f(n || 1), [c, a] = f(r || 10), l = I(
    () => Math.ceil(t / c),
    [t, c]
  ), i = m(
    (d) => {
      d > 0 && d <= l ? s(d) : s(t === 0 ? 1 : Math.min(l, Math.max(1, d)));
    },
    [l, t, s]
  ), h = m(
    (d) => {
      d > 0 && a(d);
    },
    [a]
  );
  return {
    currentPage: o,
    itemsPerPage: c,
    setPage: i,
    setItemsPerPage: h
  };
}, B = (t, e) => {
  const n = [];
  for (let r = t; r <= e; r++)
    n.push(r);
  return n;
}, Ct = B(97, 122), Ft = B(65, 90), Rt = B(48, 57), Pt = B(33, 47), Dt = (t) => {
  let e, n, r;
  const o = [...t];
  for (r = o.length - 1; r > 0; r--)
    e = Math.floor(Math.random() * (r + 1)), n = o[r], o[r] = o[e], o[e] = n;
  return o;
}, le = (t) => {
  const [e, n] = f(""), [r, o] = f((t == null ? void 0 : t.length) ?? 12), [s, c] = f(!!(t != null && t.symbols)), [a, l] = f(!!(t != null && t.numbers)), [i, h] = f(!!(t != null && t.uppercase)), d = I(() => {
    const E = [[...Ct]];
    return i && E.push([...Ft]), a && E.push([...Rt]), s && E.push([...Pt]), E;
  }, [a, s, i]), _ = m(() => {
    const E = [];
    for (let M = 0; M < r; M++) {
      const X = d[M % d.length], it = Math.floor(Math.random() * X.length);
      E.push(X[it]);
    }
    return Dt(E).map((M) => String.fromCharCode(M)).join("");
  }, [r, d]);
  return k(() => {
    n(_());
  }, [
    s,
    a,
    i,
    r,
    _
  ]), {
    value: e,
    length: r,
    setLength: o,
    symbols: s,
    includeSymbols: c,
    numbers: a,
    includeNumbers: l,
    uppercase: i,
    includeUppercase: h
  };
}, rt = "scroll", ie = () => {
  const [t, e] = f({
    x: window.scrollX,
    y: window.scrollY
  }), n = m(() => {
    e({
      x: window.scrollX,
      y: window.scrollY
    });
  }, [e]);
  return O(() => (window.addEventListener(rt, n), () => window.removeEventListener(rt, n)), [n]), t;
}, ue = (t, e) => {
  const [n, r] = f(() => {
    try {
      const c = sessionStorage.getItem(t);
      return c ? JSON.parse(c) : e;
    } catch (c) {
      return console.error(`Error reading session storage key "${t}":`, c), e;
    }
  }), o = m(
    (c) => {
      try {
        const a = c instanceof Function ? c(c) : c;
        r(a), sessionStorage.setItem(t, JSON.stringify(a));
      } catch (a) {
        console.error(`Error writing session storage key "${t}":`, a);
      }
    },
    [r, t]
  ), s = m(() => {
    r(void 0);
    try {
      sessionStorage.removeItem(t);
    } catch (c) {
      console.error(`Error deleting session storage key "${t}":`, c);
    }
  }, [r, t]);
  return { value: n, setStoredValue: o, deleteStoredValue: s };
}, G = (t, e) => t >= 0 && t < e, he = (t = [], e = !1) => {
  const [n, r] = f([...t]), [o, s] = f(0);
  return { slides: n, activeSlideIndex: o, addSlide: (i, h) => {
    const d = [...n];
    h !== void 0 && G(h, n.length) ? (d.splice(h, 0, i), r(d)) : (d.push(i), r(d));
  }, removeSlide: (i) => {
    if (G(i, n.length)) {
      const h = n.filter((d, _) => _ !== i);
      r(h), i === o && s(Math.max(i, 0));
    } else
      console.error(`Invalid slide index: ${i}`);
  }, activateSlide: (i) => {
    e ? i < 0 ? s(n.length - 1) : i >= n.length ? s(0) : s(i) : !e && G(i, n.length) ? s(i) : console.error(`Invalid slide index: ${i}`);
  } };
}, de = (t = []) => {
  const [e, n] = f([...t]), r = m(
    (h) => {
      n((d) => [...d, h]);
    },
    [n]
  ), o = m(() => {
    if (e.length === 0)
      return;
    const h = e.pop();
    return n([...e]), h;
  }, [e, n]), s = m(() => {
    if (e.length !== 0)
      return e[e.length - 1];
  }, [e]), c = m(() => {
    n([]);
  }, [n]), a = m(
    (h) => e.includes(h),
    [e]
  ), l = m(() => [...e], [e]), i = I(() => e.length, [e]);
  return {
    items: e,
    size: i,
    push: r,
    pop: o,
    peek: s,
    clear: c,
    contains: a,
    toArray: l
  };
}, U = (t, e) => t >= 0 && t < e, fe = () => {
  const [t, e] = f([]), [n, r] = f(-1);
  return { tabs: t, activeTab: n, addTab: (a, l) => {
    const i = [...t];
    if (l !== void 0 && U(l, t.length))
      return i.splice(l, 0, a), e(i), l;
    {
      const h = i.push(a);
      return e(i), h - 1;
    }
  }, removeTab: (a) => {
    if (U(a, t.length)) {
      const l = t.length;
      e((i) => i.filter((h, d) => d !== a)), r(l > 1 ? Math.max(0, a - 1) : -1);
    } else
      throw new Error(`Invalid tab index: ${a}`);
  }, activateTab: (a) => {
    if (U(a, t.length))
      r(a);
    else
      throw new Error(`Invalid tab index: ${a}`);
  } };
}, me = (t, e = 400) => {
  const [n, r] = f(t), o = H(Date.now()), s = H(null);
  return k(() => {
    if (!Number.isInteger(e) || e < 0)
      throw new Error("Throttle interval must be a positive integer");
    const c = Date.now(), a = c - o.current;
    return a > e ? (r(t), o.current = c) : (s.current && window.clearTimeout(s.current), s.current = window.setTimeout(() => {
      r(t), o.current = Date.now();
    }, e - a)), () => {
      s.current && window.clearTimeout(s.current);
    };
  }, [t, e]), n;
}, ge = (t, e, n, r = !1) => {
  if (t < 0 || e < 0 || n < 0)
    throw new Error(
      "Initial value, maximum value, and interval must be non-negative"
    );
  const [o, s] = f(t), [c, a] = f(-1), [l, i] = f(!1);
  k(() => () => clearInterval(c), [c]);
  const h = m(() => {
    clearInterval(c), a(-1), i(!1);
  }, [c, a]), d = m(() => {
    s((M) => M >= e ? r ? t : M : M + 1);
  }, [e, r, s, t]), _ = m(() => {
    clearInterval(c);
    const M = window.setInterval(() => d(), n);
    a(M), i(!0);
  }, [c, a, d, n, i]), E = m(
    (M) => {
      if (M < 0 || M > e)
        throw new Error(`Index out of range: ${M}`);
      clearInterval(c), s(M), l && _();
    },
    [c, s, e, l, _]
  ), C = m(() => {
    E(t);
  }, [E, t]);
  return { index: o, pause: h, play: _, reset: C, goToIndex: E, running: l };
}, be = () => {
  const [t, e] = f([]), [n, r] = f([]), o = m((i, h) => {
    if (i.length === 0)
      throw new Error("The source stack contains no actions to swap");
    const d = [...i], _ = [...h];
    return _.push(d.pop()), [d, _];
  }, []);
  return { actions: t, redo: () => {
    try {
      const [i, h] = o(n, t);
      r(i), e(h);
    } catch (i) {
      throw new Error(`Could not redo an action. ${i}`);
    }
  }, undo: () => {
    try {
      const [i, h] = o(t, n);
      e(i), r(h);
    } catch (i) {
      throw new Error(`Could not undo an action. ${i}`);
    }
  }, takeAction: (i) => {
    i == null && console.error("Cannot take an undefined or null action"), e([...t, i]), r([]);
  }, clearActions: () => {
    e([]), r([]);
  } };
}, ot = "resize", st = "change", _e = () => {
  const [t, e] = f({
    width: window.innerWidth,
    height: window.innerHeight
  }), n = m(() => {
    e({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, [e]);
  return O(() => (window.addEventListener(ot, n), screen.orientation.addEventListener(
    st,
    n
  ), () => {
    window.removeEventListener(ot, n), screen.orientation.removeEventListener(
      st,
      n
    );
  }), [n]), t;
};
export {
  Ut as colorToHex,
  Gt as getColorInfo,
  Wt as isValidColor,
  Bt as useAsync,
  zt as useBatteryStatus,
  Yt as useClipboard,
  $t as useColorContrast,
  Vt as useCustomCSSProp,
  Xt as useDarkMode,
  Zt as useDebounce,
  qt as useDeviceOrientation,
  jt as useElementSize,
  Kt as useFetch,
  Qt as useGeolocation,
  Jt as useHover,
  te as useIdleTimeout,
  ee as useIntersectionObserver,
  ne as useList,
  re as useLocalStorage,
  oe as useMediaQuery,
  se as useMousePosition,
  ce as useOnlineStatus,
  ae as usePagination,
  le as useRandomString,
  ie as useScrollPosition,
  ue as useSessionStorage,
  he as useSlideshow,
  de as useStack,
  fe as useTabs,
  me as useThrottle,
  ge as useTimedCounter,
  be as useUndoRedo,
  _e as useWindowSize
};
