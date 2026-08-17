import "./style.css";
import Alpine from "alpinejs";

window.Alpine = Alpine;

const photos = {
  photo1: new URL("./assets/photos/zdjecie-1.png", import.meta.url).href,
  photo2: new URL("./assets/photos/zdjecie-2.png", import.meta.url).href,
  photo3: new URL("./assets/photos/zdjecie-3.png", import.meta.url).href,
};

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
      image: photos.photo1,
    },
    { year: "1998", text: "pierwsza szkółka\nogrodnicza pod\nKielcami", image: photos.photo2 },
    { year: "2012", text: "pierwsze rośliny\nBonsai w Kielcach", image: photos.photo3 },
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
    { name: "Zwisające\n(płaczące)", image: "/src/assets/plants/zwisajace.png", link: "#" },
    { name: "Drzewa", image: "/src/assets/plants/drzewa.png", link: "#" },
    { name: "Drzewka", image: "/src/assets/plants/drzewka.png", link: "#" },
    { name: "Krzewy", image: "/src/assets/plants/krzewy.png", link: "#" },
    { name: "Płożące", image: "/src/assets/plants/plozace.png", link: "#" },
    { name: "Kolumnowe", image: "/src/assets/plants/kolumnowe.png", link: "#" },
    { name: "Inne\nformy", image: "/src/assets/plants/inne.png", link: "#" },
    { name: "Liściaste", image: "/src/assets/plants/lisciaste.png", link: "#" },
    { name: "Iglaste", image: "/src/assets/plants/iglaste.png", link: "#" },
    { name: "Wrzosowate", image: "/src/assets/plants/wrzosowate.png", link: "#" },
    { name: "Pnącza", image: "/src/assets/plants/pnacza.png", link: "#" },
    { name: "Róże", image: "/src/assets/plants/roze.png", link: "#" },
    { name: "Byliny", image: "/src/assets/plants/byliny.png", link: "#" },
    { name: "Owocowe", image: "/src/assets/plants/owocowe.png", link: "#" },
    { name: "Warzywa", image: "/src/assets/plants/warzywa.png", link: "#" },
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
    this.$refs.scrollContainer.scrollBy({ left: 300, behavior: "smooth" });
  },
  scrollLeft() {
    this.$refs.scrollContainer.scrollBy({ left: -300, behavior: "smooth" });
  },
}));

Alpine.data("productGallery", () => ({
  activeImg: 0,
  images: [
    "/src/assets/products/Image1.png",
    "/src/assets/products/Image2.png",
    "/src/assets/products/Image3.png",
    "/src/assets/products/Image4.png",
    "/src/assets/photos/zdjecie-2.png",
    "/src/assets/photos/bonsai_.png",
    "/src/assets/plants/drzewa.png",
  ],
  canScrollStart: false,
  canScrollEnd: true,

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
    { name: "Wiśnia wonna", image: "/src/assets/products/Image1.png", link: "#" },
    { name: "Jabłoń Liset", image: "/src/assets/products/Image2.png", link: "#" },
    { name: "Jabłoń - Malus", image: "/src/assets/products/Image3.png", link: "#" },
    { name: "Jabłoń - Malus", image: "/src/assets/products/Image4.png", link: "#" },
    { name: "Wiśnia wonna", image: "/src/assets/products/Image1.png", link: "#" },
    { name: "Wiśnia wonna", image: "/src/assets/products/Image2.png", link: "#" },
    { name: "Wiśnia wonna", image: "/src/assets/products/Image3.png", link: "#" },
    { name: "Wiśnia wonna", image: "/src/assets/products/Image4.png", link: "#" },
    { name: "Wiśnia wonna", image: "/src/assets/products/Image1.png", link: "#" },
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
Alpine.start();
