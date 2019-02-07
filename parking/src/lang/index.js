import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEsLocale from 'element-ui/lib/locale/lang/es' // element-ui lang
// import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import esLocale from './es'
// import enLocale from './en'

Vue.use(VueI18n)

const messages = {
  es: {
    ...esLocale,
    ...elementEsLocale
  }
  // en: {
  //   ...enLocale,
  //   ...elementEnLocale
  // }
}

const i18n = new VueI18n({
  locale: Cookies.get('language') || 'es', // set locale
  messages // set locale messages
})

export default i18n
