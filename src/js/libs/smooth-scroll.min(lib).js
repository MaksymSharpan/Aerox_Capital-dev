/*! SmoothScroll v16.1.4 | (c) 2020 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */
!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define(t)
    : ((e = e || self).SmoothScroll = t());
})(this, function () {
  'use strict';
  var e = {
      ignore: '[data-scroll-ignore]',
      header: null,
      topOnEmptyHash: !0,
      speed: 500,
      speedAsDuration: !1,
      durationMax: null,
      durationMin: null,
      clip: !0,
      offset: 0,
      easing: 'easeInOutCubic',
      customEasing: null,
      updateURL: !0,
      popstate: !0,
      emitEvents: !0,
    },
    t = function () {
      var e = {};
      return (
        Array.prototype.forEach.call(arguments, function (t) {
          for (var n in t) {
            if (!t.hasOwnProperty(n)) return;
            e[n] = t[n];
          }
        }),
        e
      );
    },
    n = function (e) {
      '#' === e.charAt(0) && (e = e.substr(1));
      for (
        var t, n = String(e), o = n.length, a = -1, i = '', r = n.charCodeAt(0);
        ++a < o;

      ) {
        if (0 === (t = n.charCodeAt(a)))
          throw new InvalidCharacterError(
            'Invalid character: the input contains U+0000.',
          );
        (t >= 1 && t <= 31) ||
        127 == t ||
        (0 === a && t >= 48 && t <= 57) ||
        (1 === a && t >= 48 && t <= 57 && 45 === r)
          ? (i += '\\' + t.toString(16) + ' ')
          : (i +=
              t >= 128 ||
              45 === t ||
              95 === t ||
              (t >= 48 && t <= 57) ||
              (t >= 65 && t <= 90) ||
              (t >= 97 && t <= 122)
                ? n.charAt(a)
                : '\\' + n.charAt(a));
      }
      return '#' + i;
    },
    o = function () {
      return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight,
      );
    },
    a = function (e) {
      return e
        ? ((t = e),
          parseInt(window.getComputedStyle(t).height, 10) + e.offsetTop)
        : 0;
      var t;
    },
    i = function (e, t, n) {
      0 === e && document.body.focus(),
        n ||
          (e.focus(),
          document.activeElement !== e &&
            (e.setAttribute('tabindex', '-1'),
            e.focus(),
            (e.style.outline = 'none')),
          window.scrollTo(0, t));
    },
    r = function (e, t, n, o) {
      if (t.emitEvents && 'function' == typeof window.CustomEvent) {
        var a = new CustomEvent(e, {
          bubbles: !0,
          detail: { anchor: n, toggle: o },
        });
        document.dispatchEvent(a);
      }
    };
  return function (s, c) {
    var u,
      l,
      d,
      f,
      m = {};
    (m.cancelScroll = function (e) {
      cancelAnimationFrame(f), (f = null), e || r('scrollCancel', u);
    }),
      (m.animateScroll = function (n, s, c) {
        m.cancelScroll();
        var l = t(u || e, c || {}),
          h = '[object Number]' === Object.prototype.toString.call(n),
          p = h || !n.tagName ? null : n;
        if (h || p) {
          var w = window.pageYOffset;
          l.header && !d && (d = document.querySelector(l.header));
          var g,
            y,
            v,
            S = a(d),
            E = h
              ? n
              : (function (e, t, n, a) {
                  var i = 0;
                  if (e.offsetParent)
                    do {
                      (i += e.offsetTop), (e = e.offsetParent);
                    } while (e);
                  return (
                    (i = Math.max(i - t - n, 0)),
                    a && (i = Math.min(i, o() - window.innerHeight)),
                    i
                  );
                })(
                  p,
                  S,
                  parseInt(
                    'function' == typeof l.offset ? l.offset(n, s) : l.offset,
                    10,
                  ),
                  l.clip,
                ),
            b = E - w,
            O = o(),
            I = 0,
            M = (function (e, t) {
              var n = t.speedAsDuration
                ? t.speed
                : Math.abs((e / 1e3) * t.speed);
              return t.durationMax && n > t.durationMax
                ? t.durationMax
                : t.durationMin && n < t.durationMin
                ? t.durationMin
                : parseInt(n, 10);
            })(b, l),
            A = function (e) {
              g || (g = e),
                (I += e - g),
                (v =
                  w +
                  b *
                    (function (e, t) {
                      var n;
                      return (
                        'easeInQuad' === e.easing && (n = t * t),
                        'easeOutQuad' === e.easing && (n = t * (2 - t)),
                        'easeInOutQuad' === e.easing &&
                          (n = t < 0.5 ? 2 * t * t : (4 - 2 * t) * t - 1),
                        'easeInCubic' === e.easing && (n = t * t * t),
                        'easeOutCubic' === e.easing && (n = --t * t * t + 1),
                        'easeInOutCubic' === e.easing &&
                          (n =
                            t < 0.5
                              ? 4 * t * t * t
                              : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
                        'easeInQuart' === e.easing && (n = t * t * t * t),
                        'easeOutQuart' === e.easing &&
                          (n = 1 - --t * t * t * t),
                        'easeInOutQuart' === e.easing &&
                          (n =
                            t < 0.5
                              ? 8 * t * t * t * t
                              : 1 - 8 * --t * t * t * t),
                        'easeInQuint' === e.easing && (n = t * t * t * t * t),
                        'easeOutQuint' === e.easing &&
                          (n = 1 + --t * t * t * t * t),
                        'easeInOutQuint' === e.easing &&
                          (n =
                            t < 0.5
                              ? 16 * t * t * t * t * t
                              : 1 + 16 * --t * t * t * t * t),
                        e.customEasing && (n = e.customEasing(t)),
                        n || t
                      );
                    })(l, (y = (y = 0 === M ? 0 : I / M) > 1 ? 1 : y))),
                window.scrollTo(0, Math.floor(v)),
                (function (e, t) {
                  var o = window.pageYOffset;
                  if (
                    e == t ||
                    o == t ||
                    (w < t && window.innerHeight + o) >= O
                  )
                    return (
                      m.cancelScroll(!0),
                      i(n, t, h),
                      r('scrollStop', l, n, s),
                      (g = null),
                      (f = null),
                      !0
                    );
                })(v, E) || ((f = window.requestAnimationFrame(A)), (g = e));
            };
          0 === window.pageYOffset && window.scrollTo(0, 0),
            (function (e, t, n) {
              t ||
                (history.pushState &&
                  n.updateURL &&
                  history.pushState(
                    { smoothScroll: JSON.stringify(n), anchor: e.id },
                    document.title,
                    e === document.documentElement ? '#top' : '#' + e.id,
                  ));
            })(n, h, l),
            'matchMedia' in window &&
            window.matchMedia('(prefers-reduced-motion)').matches
              ? i(n, Math.floor(E), !1)
              : (r('scrollStart', l, n, s),
                m.cancelScroll(!0),
                window.requestAnimationFrame(A));
        }
      });
    var h = function (e) {
        if (
          !e.defaultPrevented &&
          !(0 !== e.button || e.metaKey || e.ctrlKey || e.shiftKey) &&
          'closest' in e.target &&
          (l = e.target.closest(s)) &&
          'a' === l.tagName.toLowerCase() &&
          !e.target.closest(u.ignore) &&
          l.hostname === window.location.hostname &&
          l.pathname === window.location.pathname &&
          /#/.test(l.href)
        ) {
          var t, o;
          try {
            t = n(decodeURIComponent(l.hash));
          } catch (e) {
            t = n(l.hash);
          }
          if ('#' === t) {
            if (!u.topOnEmptyHash) return;
            o = document.documentElement;
          } else o = document.querySelector(t);
          (o = o || '#top' !== t ? o : document.documentElement) &&
            (e.preventDefault(),
            (function (e) {
              if (history.replaceState && e.updateURL && !history.state) {
                var t = window.location.hash;
                (t = t || ''),
                  history.replaceState(
                    {
                      smoothScroll: JSON.stringify(e),
                      anchor: t || window.pageYOffset,
                    },
                    document.title,
                    t || window.location.href,
                  );
              }
            })(u),
            m.animateScroll(o, l));
        }
      },
      p = function () {
        if (
          null !== history.state &&
          history.state.smoothScroll &&
          history.state.smoothScroll === JSON.stringify(u)
        ) {
          var e = history.state.anchor;
          ('string' == typeof e &&
            e &&
            !(e = document.querySelector(n(history.state.anchor)))) ||
            m.animateScroll(e, null, { updateURL: !1 });
        }
      };
    m.destroy = function () {
      u &&
        (document.removeEventListener('click', h, !1),
        window.removeEventListener('popstate', p, !1),
        m.cancelScroll(),
        (u = null),
        (l = null),
        (d = null),
        (f = null));
    };
    return (
      (function () {
        if (
          !(
            'querySelector' in document &&
            'addEventListener' in window &&
            'requestAnimationFrame' in window &&
            'closest' in window.Element.prototype
          )
        )
          throw 'Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.';
        m.destroy(),
          (u = t(e, c || {})),
          (d = u.header ? document.querySelector(u.header) : null),
          document.addEventListener('click', h, !1),
          u.updateURL &&
            u.popstate &&
            window.addEventListener('popstate', p, !1);
      })(),
      m
    );
  };
});
