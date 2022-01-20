// Custom Scripts
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

// Custom scripts
//navbar
// Мобильное меню бургер
function burgerMenu() {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu');
  const body = document.querySelector('body');
  burger.addEventListener('click', () => {
    if (!menu.classList.contains('active')) {
      menu.classList.add('active');
      burger.classList.add('active-burger');
      body.classList.add('locked');
    } else {
      menu.classList.remove('active');
      burger.classList.remove('active-burger');
      body.classList.remove('locked');
    }
  });
  // Вот тут мы ставим брейкпоинт навбара
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768.98) {
      menu.classList.remove('active');
      burger.classList.remove('active-burger');
      body.classList.remove('locked');
    }
  });
}
burgerMenu();

// Вызываем эту функцию, если нам нужно зафиксировать меню при скролле.
function fixedNav() {
  const nav = document.querySelector('nav');

  // тут указываем в пикселях, сколько нужно проскроллить что бы наше меню стало фиксированным
  const breakpoint = 1;
  if (window.scrollY >= breakpoint) {
    nav.classList.add('fixed__nav');
  } else {
    nav.classList.remove('fixed__nav');
  }
}
window.addEventListener('scroll', fixedNav);

//select
const getTemplate = (data = [], placeholder, selectedId) => {
  let text = placeholder ?? 'placeholder не указан';

  const items = data.map(item => {
    let cls = '';
    if (item.id === selectedId) {
      text = item.value;
      cls = 'selected';
    }
    return `
            <li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>
        `;
  });
  return `
        <input type="hidden" class="hidden__input">
        <div class="select__backdrop" data-type="backdrop"></div>
        <div class="select__input" data-type="input">
            <span data-type="value">${text}</span>
            <img src="./img/down-arrow.svg" alt="arrow" data-type="arrow" class="select__arrow">
        </div>
        <div class="select__dropdown">
            <ul class="select__list">
                ${items.join('')}
            </ul>
        </div>
    `;
};
class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.options = options;
    this.selectedId = options.selectedId;

    this.render();
    this.setup();
  }

  render() {
    const { placeholder, data } = this.options;
    this.$el.classList.add('select');
    this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId);
  }
  setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('click', this.clickHandler);
    this.$arrow = this.$el.querySelector('[data-type="arrow"]');
    this.$value = this.$el.querySelector('[data-type="value"]');
  }

  clickHandler(event) {
    const { type } = event.target.dataset;
    if (type === 'input') {
      this.toggle();
    } else if (type === 'item') {
      const id = event.target.dataset.id;
      this.select(id);
    } else if (type === 'backdrop') {
      this.close();
    }
  }

  get isOpen() {
    return this.$el.classList.contains('open');
  }

  get current() {
    return this.options.data.find(item => item.id === this.selectedId);
  }

  select(id) {
    this.selectedId = id;
    this.$value.textContent = this.current.value;

    this.$el
      .querySelectorAll(`[data-type="item"]`)
      .forEach(el => el.classList.remove('selected'));
    this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected');

    this.options.onSelect ? this.options.onSelect(this.current) : null;
    this.close();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.$el.classList.add('open');
    this.$arrow.classList.add('open');
  }

  close() {
    this.$el.classList.remove('open');
    this.$arrow.classList.remove('open');
  }

  destroy() {
    this.$el.removeEventListener('click', this.clickHandler);
    this.$el.innerHTML = '';
  }
}

// Инициализация плагина
const select = new Select('#select', {
  placeholder: 'Ru',
  selectedId: '1',
  data: [
    { id: '0', value: 'Ru' },
    { id: '1', value: 'En' },
    { id: '2', value: 'Es' },
    { id: '3', value: 'Kz' },
    { id: '4', value: 'Pl' },
    { id: '5', value: 'De' },
    { id: '6', value: 'Zh' },
    { id: '7', value: 'Fr' },
  ],
  onSelect(item) {
    const input = document.querySelector('.hidden__input');
    input.value = item.value;
  },
});

//submenu

function submenu() {
  const submenu = document.querySelector('.submenu');
  const submenuLink = document.querySelector('.with__submenu');

  submenuLink.addEventListener('mouseenter', () => {
    // submenu.style.display = "block"
    submenu.classList.add('active');
  });
  submenuLink.addEventListener('mouseleave', () => {
    // submenu.style.display = "none"
    submenu.classList.remove('active');
  });
}

submenu();

//founder-video
// Модальное окно
function bindModal(trigger, modal, close) {
  (trigger = document.querySelector(trigger)),
    (modal = document.querySelector(modal)),
    (close = document.querySelector(close));

  const body = document.body;

  const iframe = document.querySelector('.founder__iframe');

  trigger.addEventListener('click', e => {
    e.preventDefault();
    modal.style.display = 'flex';
    body.classList.add('locked');
    iframe.src = 'https://www.youtube.com/embed/jU88mLuLWlk';
  });
  close.addEventListener('click', () => {
    modal.style.display = 'none';
    body.classList.remove('locked');
    iframe.src = '';
  });
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.style.display = 'none';
      body.classList.remove('locked');
      iframe.src = '';
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && body.classList.contains('locked')) {
      console.log('esc');
      modal.style.display = 'none';
      body.classList.remove('locked');
      iframe.src = '';
    }
  });
}

// ПЕРВЫЙ аргумент - класс кнопки, при клике на которую будет открываться модальное окно.
// ВТОРОЙ аргумент - класс самого модального окна.
// ТРЕТИЙ аргумент - класс кнопки, при клике на которую будет закрываться модальное окно.
bindModal('.modal__btn', '.modal__wrapper', '.modal__close');

//partners_swiper
const swiper = new Swiper('.swiper__partners', {
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  speed: 2500,

  // Optional parameters
  loop: true,
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 50,
    },
  },
});

//page-scroll
const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 300,
});

//documentation-swiper
const swiperDoc = new Swiper('.swiper__documentation', {
  // Optional parameters
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1.1,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 1.3,
      spaceBetween: 30,
    },

    // when window width is >= 640px
    768: {
      slidesPerView: 3.3,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 3.5,
      spaceBetween: 30,
    },
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.doc__btn-next',
    prevEl: '.doc__btn-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

AOS.init({
  once: true,
  mirror: true,
});

