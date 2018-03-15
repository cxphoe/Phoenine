<template>
  <label class="ph-checkbox" role="checkbox" :style="styleObj">
    <input
      v-if="trueLabel || falseLabel"
      v-model="model"
      type="checkbox"
      :name="name"
      :true-value="trueLabel"
      :false-value="falseLabel"
      @change="handleChange">
    <input
      v-else
      v-model="model"
      type="checkbox"
      :value="label"
      :name="name"
      @change=handleChange>
    <div v-html=sign></div>
    <span v-if="$slots.default || label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script>
import Emitter from '../../../mixins/emitter'

export default {
  name: 'PhCheckbox',

  componentName: 'PhCheckBox',

  mixins: [Emitter],

  data() {
    return {
      selfModel: false,
    }
  },

  props: {
    value: {},
    label: {},
    name: String,
    checked: Boolean,
    trueLabel: [String, Number],
    falseLabel: [String, Number],
    textColor: String,
    activeBgColor: String,
  },

  computed: {
    styleObj() {
      return {
        color: this.textColor,
        'background-color': this.isChecked ? this.activeBgColor : '',
      }
    },

    sign() {
      // i 标签会被 font-awesome.js 替换，因此无法动态绑定类
      // 只能绑定动态 html 内容
      return this.isChecked
        ? '<i class="mr1 fas fa-check-square"></i>'
        : '<i class="mr1 far fa-square gray3"></i>'
    },

    model: {
      get() {
        return this.isGroupMember
          ? this.store : this.value !== undefined
            ? this.value : this.selfModel
      },

      set(val) {
        if (this.isGroupMember) {
          this.dispatch('PhCheckBoxGroup', 'input', val)
        } else {
          this.$emit('input', val)
          this.selfModel = val
        }
      }
    },

    isGroupMember() {
      let parent = this.$parent
      while (parent) {
        if (parent.$options.componentName !== 'PhCheckBoxGroup') {
          parent = parent.$parent
        } else {
          /* eslint-disable */
          this._checkboxGroup = parent
          return true
        }
      }
      return false
    },

    isChecked() {
      if ({}.toString.call(this.model) === '[object Boolean]') {
        // 判断是否为Boolean，如果是当下的checkbox为单例，没有绑定数组
        return this.model
      } else if (Array.isArray(this.model)) {
        return this.model.indexOf(this.label) > -1
      } else if (this.model !== null && this.model !== undefined) {
        return this.model === this.trueLabel
      }
    },

    store() {
      return this._checkboxGroup ? this._checkboxGroup.value : this.value
    },
  },

  methods: {
    addToStore() {
      if (
        Array.isArray(this.model) &&
        this.model.indexOf(this.label) === -1
      ) {
        this.model.push(this.label)
      } else {
        this.model = this.trueLabel || true
      }
    },

    handleChange(event) {
      let value = event.target.checked
        ? this.trueLabel === undefined ? true : this.trueLabel
        : this.falseLabel === undefined ? false : this.falseLabel
      this.$emit('change', value, event)
      this.$nextTick(() => {
        if (this.isGroup) {
          let value = this._checkboxGroup.value
          this.dispatch('PhCheckBoxGroup', 'change', value)
        }
      })
    },

    created() {
      this.checked && this.addToStore()
    },
  },
}
</script>

<style lang="scss">
.ph-checkbox {
  cursor: pointer;
  display: flex;

  input[type="checkbox"] {
    display: none;
  }

  div {
    width: 2rem;
    text-align: center;
  }
}
</style>
