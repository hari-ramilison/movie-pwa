
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/movie-create', component: () => import('pages/PageMovieCreate.vue') },
      { path: '/movie-create/:pk', component: () => import('pages/PageMovieCreate.vue') },
      { path: '/movie-list', component: () => import('pages/PageMovieList.vue') },
      { path: '/fallback', component: () => import('pages/PageFallBack.vue') },
      { path: '/', component: () => import('pages/PageWelcome.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
