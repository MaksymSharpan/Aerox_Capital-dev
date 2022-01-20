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
