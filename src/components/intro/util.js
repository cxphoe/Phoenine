import Loading from '../utils/loading'
import IntroTemplate from './tmpl'
import { isMobile } from '../../util'

const generateIntroObj = function (options) {
  let components = {
    Loading,
    IntroTemplate,
    ...options.components,
  }

  let data = function () {
    return {
      isMobile: isMobile(),
    }
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
    data,
    props,
    computed,
  }
}

export {
  generateIntroObj,
}
