import { defineComponent } from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    min: {
      type: Number,
      default: 0
    },

    count: {
      type: Number,
    },

    max: {
      type: Number,
    },
  },

  setup(props, context) {
    const updateCount = (val) => {
      context.emit('update:count',val)
    }

    return {
      updateCount
    }
  },

  template: `
    <div class="counter">
      <UiButton aria-label="Decrement" @click="updateCount(count - 1)" :disabled="count === min">➖</UiButton>
      <span class="count" data-testid="count">{{ count }}</span>
      <UiButton aria-label="Increment" @click="updateCount(count + 1)" :disabled="count === max">➕</UiButton>
    </div>
  `,
})
