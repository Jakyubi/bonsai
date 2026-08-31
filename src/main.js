import "./style.css";
import Alpine from "alpinejs";

window.Alpine = Alpine;

const photos = {
  photo1: new URL("./assets/photos/zdjecie-1.png", import.meta.url).href,
  photo2: new URL("./assets/photos/zdjecie-2.png", import.meta.url).href,
  photo3: new URL("./assets/photos/zdjecie-3.png", import.meta.url).href,
  bonsai: new URL("./assets/photos/bonsai_.png", import.meta.url).href,
  timeline1: new URL("./assets/photos/timeline1.png", import.meta.url).href,
  timeline2: new URL("./assets/photos/timeline2.png", import.meta.url).href,
  timeline3: new URL("./assets/photos/timeline3.png", import.meta.url).href,
};

const plantImages = {
  zwisajace: new URL("./assets/plants/zwisajace.png", import.meta.url).href,
  drzewa: new URL("./assets/plants/drzewa.png", import.meta.url).href,
  drzewka: new URL("./assets/plants/drzewka.png", import.meta.url).href,
  krzewy: new URL("./assets/plants/krzewy.png", import.meta.url).href,
  plozace: new URL("./assets/plants/plozace.png", import.meta.url).href,
  kolumnowe: new URL("./assets/plants/kolumnowe.png", import.meta.url).href,
  inne: new URL("./assets/plants/inne.png", import.meta.url).href,
  lisciaste: new URL("./assets/plants/lisciaste.png", import.meta.url).href,
  iglaste: new URL("./assets/plants/iglaste.png", import.meta.url).href,
  wrzosowate: new URL("./assets/plants/wrzosowate.png", import.meta.url).href,
  pnacza: new URL("./assets/plants/pnacza.png", import.meta.url).href,
  roze: new URL("./assets/plants/roze.png", import.meta.url).href,
  byliny: new URL("./assets/plants/byliny.png", import.meta.url).href,
  owocowe: new URL("./assets/plants/owocowe.png", import.meta.url).href,
  warzywa: new URL("./assets/plants/warzywa.png", import.meta.url).href,
};

const productImages = {
  img1: new URL("./assets/products/Image1.png", import.meta.url).href,
  img2: new URL("./assets/products/Image2.png", import.meta.url).href,
  img3: new URL("./assets/products/Image3.png", import.meta.url).href,
  img4: new URL("./assets/products/Image4.png", import.meta.url).href,
};

const specIcons = {
  exchange: new URL("./assets/icons/exchange.svg", import.meta.url).href,
  exchange2: new URL("./assets/icons/exchange2.svg", import.meta.url).href,
  size: new URL("./assets/icons/size.svg", import.meta.url).href,
  leaf: new URL("./assets/icons/leaf.svg", import.meta.url).href,
  konewka: new URL("./assets/icons/konewka.svg", import.meta.url).href,
  lopatka: new URL("./assets/icons/lopatka.svg", import.meta.url).href,
};

Alpine.data("productSpecs", () => ({
  features: [
    { icon: specIcons.exchange, label: "Wysokość", value: "175 - 200 cm" },
    { icon: specIcons.exchange2, label: "Szerokość/średnica", value: "100 - 125 cm" },
    { icon: specIcons.size, label: "Wielkość doniczki", value: "C90" },
    { icon: specIcons.leaf, label: "Forma", value: "Pienna" },
    { icon: specIcons.konewka, label: "Typ uprawy", value: "Doniczka" },
    { icon: specIcons.lopatka, label: "Ilość przesadzeń", value: "2" },
  ],
}));

Alpine.data("heroSlider", () => ({
  activeSlide: 0,
  slides: [
    {
      image: photos.photo1,
      title: "Sprzedaż unikatowych roślin",
    },
    {
      image: photos.photo2,
      title: "Lorem ipsum",
    },
    {
      image: photos.photo3,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.",
    },
  ],
  timer: null,
  ready: false,

  startAutoplay() {
    this.stopAutoplay();
    this.timer = setInterval(() => {
      this.nextSlide();
    }, 5000);
  },

  stopAutoplay() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },

  nextSlide() {
    this.activeSlide = (this.activeSlide + 1) % this.slides.length;
  },

  goToSlide(index) {
    this.activeSlide = index;
    this.startAutoplay();
  },

  init() {
    window.addEventListener("page-ready", () => {
      this.ready = true;

      setTimeout(() => {
        this.startAutoplay();
      }, 2000);
    });
  },
}));

Alpine.data("timelineSlider", () => ({
  active: false,
  isDown: false,
  startX: 0,
  scrollLeft: 0,
  autoScrollSpeed: 1.4,
  animationFrameId: null,
  timeline: [
    {
      year: "1996",
      text: "sprzedaż roślin\nna placu targowym\nw Piekoszowie",
      image: photos.timeline1,
    },
    { year: "1998", text: "pierwsza szkółka\nogrodnicza pod\nKielcami", image: photos.timeline2 },
    { year: "2012", text: "pierwsze rośliny\nBonsai w Kielcach", image: photos.timeline3 },
  ],
  openTimeline() {
    this.active = true;
    if (this.$refs.slider) {
      this.$refs.slider.scrollLeft = 0;
    }
    this.startAutoScroll();
  },

  startAutoScroll() {
    this.stopAutoScroll();

    const step = () => {
      if (this.active && !this.isDown && this.$refs.slider) {
        this.$refs.slider.scrollLeft += this.autoScrollSpeed;

        this.animationFrameId = requestAnimationFrame(step);
      }
    };

    this.animationFrameId = requestAnimationFrame(step);
  },

  stopAutoScroll() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  },

  startDrag(e) {
    this.stopAutoScroll();
    this.isDown = true;
    this.startX = e.pageX - this.$refs.slider.offsetLeft;
    this.scrollLeft = this.$refs.slider.scrollLeft;
  },

  stopDrag() {
    this.isDown = false;
  },

  drag(e) {
    if (!this.isDown) return;
    e.preventDefault();
    const x = e.pageX - this.$refs.slider.offsetLeft;
    const walk = (x - this.startX) * 1.5;
    this.$refs.slider.scrollLeft = this.scrollLeft - walk;
  },
}));

Alpine.data("categoriesBar", () => ({
  canScrollLeft: false,
  canScrollRight: true,

  categories: [
    { name: "Zwisające\n(płaczące)", image: plantImages.zwisajace, link: "#" },
    { name: "Drzewa", image: plantImages.drzewa, link: "#" },
    { name: "Drzewka", image: plantImages.drzewka, link: "#" },
    { name: "Krzewy", image: plantImages.krzewy, link: "#" },
    { name: "Płożące", image: plantImages.plozace, link: "#" },
    { name: "Kolumnowe", image: plantImages.kolumnowe, link: "#" },
    { name: "Inne\nformy", image: plantImages.inne, link: "#" },
    { name: "Liściaste", image: plantImages.lisciaste, link: "#" },
    { name: "Iglaste", image: plantImages.iglaste, link: "#" },
    { name: "Wrzosowate", image: plantImages.wrzosowate, link: "#" },
    { name: "Pnącza", image: plantImages.pnacza, link: "#" },
    { name: "Róże", image: plantImages.roze, link: "#" },
    { name: "Byliny", image: plantImages.byliny, link: "#" },
    { name: "Owocowe", image: plantImages.owocowe, link: "#" },
    { name: "Warzywa", image: plantImages.warzywa, link: "#" },
  ],

  init() {
    this.$nextTick(() => this.checkScroll());

    window.addEventListener("page-ready", () => {
      setTimeout(() => this.checkScroll(), 100);
    });
    window.addEventListener("resize", () => this.checkScroll());
  },

  checkScroll() {
    const el = this.$refs.scrollContainer;
    if (!el) return;
    const hasScroll = el.scrollWidth > el.clientWidth;
    this.canScrollLeft = el.scrollLeft > 5;
    this.canScrollRight = hasScroll && el.scrollLeft < el.scrollWidth - el.clientWidth - 5;
  },
  scrollRight() {
    this.$refs.scrollContainer.scrollBy({ left: 300, behavior: "smooth" });
  },
  scrollLeft() {
    this.$refs.scrollContainer.scrollBy({ left: -300, behavior: "smooth" });
  },
}));

Alpine.data("productGallery", () => ({
  activeImg: 0,
  touchStartX: 0,
  images: [
    productImages.img1,
    productImages.img2,
    productImages.img3,
    productImages.img4,
    photos.photo2,
    photos.bonsai,
    plantImages.drzewa,
  ],
  canScrollStart: false,
  canScrollEnd: true,

  handleTouchStart(e) {
    this.touchStartX = e.touches[0].clientX;
  },

  handleTouchEnd(e) {
    const touchEndX = e.changedTouches[0].clientX;
    const swipeDistance = this.touchStartX - touchEndX;

    if (swipeDistance > 50) {
      this.activeImg = this.activeImg === this.images.length - 1 ? 0 : this.activeImg + 1;
    } else if (swipeDistance < -50) {
      this.activeImg = this.activeImg === 0 ? this.images.length - 1 : this.activeImg - 1;
    }
  },

  init() {
    this.$nextTick(() => {
      this.checkScroll();
      window.addEventListener("resize", () => this.checkScroll());
    });
    setTimeout(() => this.checkScroll(), 200);
  },

  checkScroll() {
    const el = this.$refs.thumbsContainer;
    if (!el) return;

    const isVertical = window.innerWidth >= 768 && window.innerWidth < 1280;

    if (isVertical) {
      const hasScroll = el.scrollHeight > el.clientHeight;
      this.canScrollStart = el.scrollTop > 5;
      this.canScrollEnd = hasScroll && el.scrollTop < el.scrollHeight - el.clientHeight - 5;
    } else {
      const hasScroll = el.scrollWidth > el.clientWidth;
      this.canScrollStart = el.scrollLeft > 5;
      this.canScrollEnd = hasScroll && el.scrollLeft < el.scrollWidth - el.clientWidth - 5;
    }
  },

  scrollNext() {
    const el = this.$refs.thumbsContainer;
    const isVertical = window.innerWidth >= 768 && window.innerWidth < 1280;

    if (isVertical) {
      el.scrollBy({ top: 300, behavior: "smooth" });
    } else {
      el.scrollBy({ left: 300, behavior: "smooth" });
    }
  },

  scrollPrev() {
    const el = this.$refs.thumbsContainer;
    const isVertical = window.innerWidth >= 768 && window.innerWidth < 1280;

    if (isVertical) {
      el.scrollBy({ top: -300, behavior: "smooth" });
    } else {
      el.scrollBy({ left: -300, behavior: "smooth" });
    }
  },
}));

Alpine.data("productsBar", () => ({
  canScrollLeft: false,
  canScrollRight: true,

  products: [
    { name: "Wiśnia wonna", image: productImages.img1, link: "#" },
    { name: "Jabłoń Liset", image: productImages.img2, link: "#" },
    { name: "Jabłoń - Malus", image: productImages.img3, link: "#" },
    { name: "Jabłoń - Malus", image: productImages.img4, link: "#" },
    { name: "Wiśnia wonna", image: productImages.img1, link: "#" },
    { name: "Wiśnia wonna", image: productImages.img2, link: "#" },
    { name: "Wiśnia wonna", image: productImages.img3, link: "#" },
    { name: "Wiśnia wonna", image: productImages.img4, link: "#" },
    { name: "Wiśnia wonna", image: productImages.img1, link: "#" },
  ],

  init() {
    this.$nextTick(() => {
      this.checkScroll();
    });
    setTimeout(() => this.checkScroll(), 200);
  },

  checkScroll() {
    const el = this.$refs.scrollContainer;
    if (!el) return;
    const hasScroll = el.scrollWidth > el.clientWidth;
    this.canScrollLeft = el.scrollLeft > 5;
    this.canScrollRight = hasScroll && el.scrollLeft < el.scrollWidth - el.clientWidth - 5;
  },
  scrollRight() {
    this.$refs.scrollContainer.scrollBy({ left: 620, behavior: "smooth" });
  },
  scrollLeft() {
    this.$refs.scrollContainer.scrollBy({ left: -620, behavior: "smooth" });
  },
}));

Alpine.data("productCatalogGrid", () => ({
  products: [
    { id: 1, name: "Wiśnia wonna", image: productImages.img1, link: "product.html" },
    { id: 2, name: "Jabłoń Liset", image: productImages.img2, link: "product.html" },
    { id: 3, name: "Jabłoń - Malus", image: productImages.img3, link: "product.html" },
    { id: 4, name: "Jabłoń - Malus", image: productImages.img4, link: "product.html" },
    { id: 5, name: "Wiśnia wonna", image: productImages.img1, link: "product.html" },
    { id: 6, name: "Wiśnia wonna", image: productImages.img2, link: "product.html" },
    { id: 7, name: "Wiśnia wonna", image: productImages.img3, link: "product.html" },
    { id: 8, name: "Wiśnia wonna", image: productImages.img4, link: "product.html" },
    { id: 9, name: "Wiśnia wonna", image: productImages.img1, link: "product.html" },
    { id: 10, name: "Jabłoń Liset", image: productImages.img2, link: "product.html" },
    { id: 11, name: "Wiśnia wonna", image: productImages.img1, link: "product.html" },
    { id: 12, name: "Jabłoń Liset", image: productImages.img2, link: "product.html" },
    { id: 13, name: "Jabłoń - Malus", image: productImages.img3, link: "product.html" },
    { id: 14, name: "Jabłoń - Malus", image: productImages.img4, link: "product.html" },
    { id: 15, name: "Wiśnia wonna", image: productImages.img1, link: "product.html" },
    { id: 16, name: "Wiśnia wonna", image: productImages.img2, link: "product.html" },
    { id: 17, name: "Wiśnia wonna", image: productImages.img3, link: "product.html" },
    { id: 18, name: "Wiśnia wonna", image: productImages.img4, link: "product.html" },
    { id: 19, name: "Wiśnia wonna", image: productImages.img1, link: "product.html" },
    { id: 20, name: "Jabłoń Liset", image: productImages.img2, link: "product.html" },
  ],
}));

Alpine.data("reveal", (repeat = false, threshold = 0.15) => ({
  shown: false,
  pageReady: window.__pageIsReady || false,
  isIntersecting: false,

  init() {
    window.addEventListener("page-ready", () => {
      this.pageReady = true;
      window.__pageIsReady = true;
      this.updateState();
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.isIntersecting = entry.isIntersecting;
          this.updateState(observer);
        });
      },
      { threshold: threshold },
    );

    observer.observe(this.$el);
  },

  updateState(observer) {
    if (this.pageReady && this.isIntersecting) {
      this.shown = true;
      if (!repeat && observer) observer.disconnect();
    } else if (repeat && !this.isIntersecting) {
      this.shown = false;
    }
  },
}));

Alpine.data("counter", (target, duration = 1500, delay = 0) => ({
  current: 0,
  target: target,
  started: false,

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !this.started) {
          this.started = true;
          setTimeout(() => {
            this.animate();
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(this.$el);
  },

  animate() {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      const easeOut = 1 - (1 - progress) * (1 - progress);

      this.current = Math.floor(easeOut * this.target);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        this.current = this.target;
      }
    };
    window.requestAnimationFrame(step);
  },
}));

let actualScrollY = window.scrollY || 0;
let lerpedScrollY = window.scrollY || 0;

window.addEventListener(
  "scroll",
  () => {
    actualScrollY = window.scrollY;
  },
  { passive: true },
);

const globalScrollLoop = () => {
  lerpedScrollY += (actualScrollY - lerpedScrollY) * 0.02;
  requestAnimationFrame(globalScrollLoop);
};
globalScrollLoop();

Alpine.data("scrollLine", () => ({
  offsetTop: 0,
  heightPx: 0,

  init() {
    const calcOffset = () => {
      if (window.innerWidth < 1280) return;

      const rect = this.$el.parentElement.getBoundingClientRect();
      this.offsetTop = window.scrollY + rect.top;
      this.heightPx = rect.height;
    };

    window.addEventListener("resize", calcOffset, { passive: true });
    window.addEventListener("page-ready", () => setTimeout(calcOffset, 200));
    setTimeout(calcOffset, 100);

    const update = () => {
      if (window.innerWidth >= 1280 && this.heightPx > 0) {
        const penPosition = lerpedScrollY + window.innerHeight * 1.0;

        let progress = (penPosition - this.offsetTop) / this.heightPx;

        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;

        this.$el.style.transform = `scaleY(${progress})`;
      }
      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  },
}));

Alpine.start();
