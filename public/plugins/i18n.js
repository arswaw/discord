import { languageStore } from '../stores/languages.js'

export default {
  install: (app) => {
    // inject a globally available $translate() method
    app.config.globalProperties.$t = (language, key) => {
      // retrieve a nested property in `options`
      // using `key` as the path
      return languageStore[language][key]
    }
  }
}
