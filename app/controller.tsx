import { createController } from 'remix/router'

import { assets } from './assets.ts'
import { routes } from './routes.ts'
import { AboutPage } from './pages/about-page.tsx'
import { startHandler } from './actions/start.ts'
import { homeHandler } from './actions/home.tsx'

export default createController(routes, {
  actions: {
    async assets(context) {
      return (await assets.fetch(context.request)) ?? new Response('Not Found', { status: 404 })
    },
    home(context) {
      return context.render(homeHandler(context.request))
    },
    about(context) {
      return context.render(<AboutPage />)
    },
    async start(context) {
      return startHandler(context.request)
    },
  },
})
