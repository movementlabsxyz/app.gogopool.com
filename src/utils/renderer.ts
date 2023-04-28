import createCache from '@emotion/cache'
import createEmotionServer from '@emotion/server/create-instance'

export const emotionCache = createCache({
  key: 'css',
})

export const renderStatic = async (html?: string) => {
  if (html === undefined) {
    throw new Error('Did you forget to return HTML from renderToString?')
  }

  const { extractCritical } = createEmotionServer(emotionCache)
  const { css, ids } = extractCritical(html)

  return { html, ids, css }
}
