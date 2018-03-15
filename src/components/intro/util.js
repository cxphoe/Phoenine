const generateIntroObj = function (options) {
  return {
    name: options.name,
    components: options.components || {},
    props: {
      dataset: {
        type: Array,
        required: true,
      },
      showAmount: {
        type: Number,
        default: -1,
      },
    },
    computed: {
      introSet: function () {
        return this.showAmount < 0
          ? this.dataset
          : this.dataset.slice(0, this.showAmount)
      },
    }
  }
}

export {
  generateIntroObj,
}
