export default {
  name: 'ModalWindow',
  data () {
    return {
      name: 'NAME!!',
      currentSlide: 1
    }
  },
  props: {
    slideCount: {
      type: Number,
      default: 0
    },
  },
  methods: {
    nextSlide() {
      this.currentSlide < this.slideCount ? this.currentSlide++ : this.currentSlide = 1
    },
    prevSlide () {
      this.currentSlide > 1 ? this.currentSlide-- : this.currentSlide = this.slideCount
    }
  }
}
