import {computed, defineComponent, ref} from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const operator = ref('subtract')
    const value1 = ref()
    const value2 = ref()
    const result = computed(() => {
      switch (operator.value) {
        case 'sum':
          return value1.value + value2.value
        case 'subtract':
          return value1.value - value2.value
        case 'multiply':
          return value1.value * value2.value
        case 'divide':
          return value1.value / value2.value
        default:
          return;
      }
    })
    return {
      operator,
      value1,
      value2,
      result
    }
  },

  template: `
    <div class="calculator">
      <input v-model="value1"  type="number" aria-label="First operand" />

      <div class="calculator__operators">
        <label><input v-model="operator" type="radio" name="operator" value="sum"/>➕</label>
        <label><input v-model="operator" type="radio" name="operator" value="subtract"/>➖</label>
        <label><input v-model="operator" type="radio" name="operator" value="multiply"/>✖</label>
        <label><input v-model="operator" type="radio" name="operator" value="divide"/>➗</label>
      </div>

      <input v-model="value2"  type="number" aria-label="Second operand" />

      <div>=</div>

      <output>{{result}}</output>
    </div>
  `,
})
