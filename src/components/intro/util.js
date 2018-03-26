import Loading from '../utils/loading'

const generateIntroObj = function (options) {
  let components = {
    Loading,
    ...options.components,
  }

  let props = {
    dataset: {
      type: Array,
      required: true,
    },
    showAmount: {
      type: Number,
      default: -1,
    },
  }

  let computed = {
    introSet: function () {
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
