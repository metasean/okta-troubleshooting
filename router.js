import Vue from 'vue'
import Router from 'vue-router'
// import Auth from '@okta/okta-vue'
import Auth from './node_modules/@okta/okta-vue/src/Auth.js'

// these are only needed until default router can be merged.
// import Callback from './pages/implicit/callback';
import Dash from './pages/dash'
import Protected from './pages/protected'

// register okta vue client
Vue.use(Auth, {
  issuer: process.env.VUE_APP_ISSUER,
  client_id: process.env.VUE_APP_CLIENT_ID,
  redirect_uri: process.env.VUE_APP_REDIRECT_URI,
  scope: process.env.VUE_APP_SCOPE
})

Vue.use(Router)

// eslint-disable-next-line import/prefer-default-export
export function createRouter(ssrContext, createDefaultRouter) {
  const router = new Router({
    mode: 'history',
    routes: [
      { path: '/implicit/callback', component: Auth.handleCallback() },

      // TODO manually adding these routes for now
      // TODO should be pulled from the default nuxt router
      { path: '/', component: Dash },
      { path: '/protected', component: Protected, meta: { requiresAuth: true } }
    ]
  })

  if (createDefaultRouter != null) {
    // support the behaviour of discovering routes from the nuxt default router
    // https://github.com/nuxt-community/router-module#accessing-default-router
    // const defaultRouter = createDefaultRouter(ssrContext);
  }

  // TAKE ONE - nice and succinct
  const onBeforeEach = async (to, from, next) => {
    if (
      to.matched.some(record => record.meta.requiresAuth) && // page requires auth
      !(await Vue.prototype.$auth.isAuthenticated()) //   but user isn't
    ) {
      // Navigate to custom login page
      // next({ path: '/login' });
      // next({ component: Auth.handleCallback() });
      next('/')
      // next('/implicit/callback');
    } else {
      next()
    }
  }

  // // TAKE TWO - more verbose but a bit easier to debug
  // const onBeforeEach = async (to, from, next) => {
  //   const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  //   console.log('requiresAuth:', requiresAuth)
  //   console.info('from:', from)
  //   console.info('to:', to)
  //   const isCallbackPage = from.path.includes('/implicit/')
  //   console.info('isCallbackPage:', isCallbackPage)
  //   let isAuthenticated = false

  //   // if the page doesn't require a log-in, proceed to it
  //   if (!requiresAuth && !isCallbackPage) next()

  //   // TODO: re-implement redirect history
  //   // eslint-disable-next-line no-cond-assign
  //   else if (isCallbackPage && (isAuthenticated = !await Vue.prototype.$auth.isAuthenticated())) next('/protected')

  //   // if the user is logged in, send them on their merry way
  //   // TODO: implement a better alternative
  //   // eslint-disable-next-line no-cond-assign
  //   else if (isAuthenticated || (isAuthenticated = !await Vue.prototype.$auth.isAuthenticated())) next()

  //   // if the user is already authorized and came from the callback page, send them to the home page
  //   // TODO: re-implement redirect history
  //   else if (isAuthenticated && isCallbackPage) next('/')

  //   // the user is logged in and isn't on the callback page
  //   // and can therefore proceed
  //   else next()
  // }

  // enforce the behaviour of the the auth guard on each router call
  router.beforeEach(onBeforeEach)

  return router
}
