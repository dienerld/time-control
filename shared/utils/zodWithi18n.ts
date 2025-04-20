import i18next from 'i18next'
import { z } from 'zod'
import { zodI18nMap } from 'zod-i18n-map'
import ptBr from 'zod-i18n-map/locales/pt/zod.json'

i18next.init({
  lng: 'pt',
  resources: {
    pt: {
      zod: ptBr,
    },
  },
})

z.setErrorMap(zodI18nMap)

export { z }
