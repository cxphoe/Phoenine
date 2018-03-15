export default {
  props: ['hiddenUp', 'hiddenDown'],

  computed: {
    hiddenClass() {
      let sizes = ['lg', 'md', 'sm', 'xs']
      return ['Up', 'Down'].map(type => {
        let size = this['hidden' + type]
        return sizes.includes(size)
          ? `ph-hidden-${size}-${type.toLowerCase()}`
          : ''
      })
    },
  }
}
