import IntroTemplate from './tmpl'

const generateIntroObj = function (options) {
  let components = {
    IntroTemplate,
    ...options.components,
  }

  let props = {
    status: [Number, String, Object],
    message: String,
    dataset: Array,
    showAmount: {
      type: Number,
      default: -1,
    },
  }

  let computed = {
    introSet() {
      return this.showAmount < 0
        ? this.dataset
        : this.dataset.slice(0, this.showAmount)
    },
    ...options.computed,
  }

  return {
    name: options.name,
    components,
    props,
    computed,
  }
}

export {
  generateIntroObj,
}
