import { get, post, route } from 'remix/routes'

export const routes = route({
  assets: get('/assets/*path'),
  home: '/',
  about: '/about',
  start: post('/start'),
})