import { defineComponent, createApp } from 'vue/dist/vue.esm-bundler.js'
import { useNavigatorLanguage } from '@vueuse/core'
const App =  defineComponent({
  name: 'App',
  setup () {
    const { language } = useNavigatorLanguage()
    return {
      language
    }
  },
  template: `<div>Сегодня {{new Date().toLocaleDateString(language, { dateStyle: 'long' })}}</div>`,
})

const app = createApp(App)
app.mount('#app')
