import {defineComponent, onMounted, onUnmounted, ref} from 'vue'
import { useNavigatorLanguage } from '@vueuse/core'

export default defineComponent({
  name: 'UiClock',

  setup() {
    const { language } = useNavigatorLanguage()
    const time = ref()
    const interval = ref()
    const setCurrentTime = () => {
      time.value = new Date().toLocaleTimeString(language, { timeStyle: 'medium' })
    }
    onMounted(() => {
      setCurrentTime()
      interval.value = setInterval(() => {
        setCurrentTime()
      }, 1000)
    })
    onUnmounted(() => {
      clearInterval(interval.value)
    })
    return {
      time
    }
  },

  template: `<div class="clock">{{time}}</div>`,
})
