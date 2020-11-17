
const routes = [
  {
    path: '/',
    component: () => import('layouts/Toolbar.vue'),
    children: [
      {
        path: '/registration',
        component: () => import('pages/Home.vue'),
        children: [
          {
            name: 'Registration',
            path: '/registration',
            component: () => import('components/Registration.vue')
          },
          {
            name: 'LandingCarousel',
            path: '/landing-carousel',
            component: () => import('components/LandingCarousel.vue')
          },
          {
            name: 'AboutUs',
            path: '/about-us',
            component: () => import('components/AboutUs.vue')
          },
          {
            name: 'Highlights',
            path: '/highlights',
            component: () => import('components/Highlights.vue')
          },
          {
            name: 'Team',
            path: '/team',
            component: () => import('components/Team.vue')
          },
          {
            name: 'Services',
            path: '/services',
            component: () => import('components/Services.vue')
          },
          {
            name: 'Reviews',
            path: '/reviews',
            component: () => import('components/Reviews.vue')
          },
          {
            name: 'ContactUs',
            path: '/contact-us',
            component: () => import('components/ContactUs.vue')
          }
        ]
      }
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
