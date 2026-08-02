import "./style.css";
import Alpine from "alpinejs";

window.Alpine = Alpine;

Alpine.data("heroSlider", () => ({
  activeSlide: 0,
  slides: [
    {
      image: "/src/assets/photos/zdjecie-3.png",
      title: "Sprzedaż unikatowych roślin",
    },
    {
      image: "/src/assets/photos/zdjecie-1.png",
      title: "Lorem ipsum",
    },
    {
      image: "/src/assets/photos/zdjecie-2.png",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.",
    },
  ],
  timer: null,

  startAutoplay() {
    this.timer = setInterval(() => {
      this.nextSlide();
    }, 5000);
  },

  stopAutoplay() {
    clearInterval(this.timer);
  },

  nextSlide() {
    this.activeSlide = (this.activeSlide + 1) % this.slides.length;
  },

  init() {
    this.startAutoplay();
  },
}));

Alpine.data("timelineSlider", () => ({
  hovered: false,
  isDown: false,
  startX: 0,
  scrollLeft: 0,
  timeline: [
    {
      year: "1996",
      text: "sprzedaż roślin\nna placu targowym\nw Piekoszowie",
      image: "/src/assets/photos/zdjecie-1.png",
    },
    { year: "1998", text: "pierwsza szkółka\nogrodnicza pod\nKielcami", image: "/src/assets/photos/zdjecie-2.png" },
    { year: "2012", text: "pierwsze rośliny\nBonsai w Kielcach", image: "/src/assets/photos/zdjecie-3.png" },
  ],
  startDrag(e) {
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

Alpine.start();
