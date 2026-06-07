import { AppRouteRecordRaw } from '@/utils/router'

/**
 * 静态路由配置（不需要权限就能访问的路由）
 *
 * 属性说明：
 * isHideTab: true 表示不在标签页中显示
 *
 * 注意事项：
 * 1、path、name 不要和动态路由冲突，否则会导致路由冲突无法访问
 * 2、静态路由不管是否登录都可以访问
 */
export const staticRoutes: AppRouteRecordRaw[] = [
  // 不需要登录就能访问的路由示例
  // {
  //   path: '/welcome',
  //   name: 'WelcomeStatic',
  //   component: () => import('@views/dashboard/console/index.vue'),
  //   meta: { title: 'menus.dashboard.title' }
  // },
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('@views/auth/login/index.vue'),
    meta: { title: 'menus.login.title', isHideTab: true }
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('@views/auth/register/index.vue'),
    meta: { title: 'menus.register.title', isHideTab: true }
  },
  {
    path: '/auth/forget-password',
    name: 'ForgetPassword',
    component: () => import('@views/auth/forget-password/index.vue'),
    meta: { title: 'menus.forgetPassword.title', isHideTab: true }
  },
  {
    path: '/403',
    name: 'Exception403',
    component: () => import('@views/exception/403/index.vue'),
    meta: { title: '403', isHideTab: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Exception404',
    component: () => import('@views/exception/404/index.vue'),
    meta: { title: '404', isHideTab: true }
  },
  {
    path: '/500',
    name: 'Exception500',
    component: () => import('@views/exception/500/index.vue'),
    meta: { title: '500', isHideTab: true }
  },
  {
    path: '/outside',
    component: () => import('@views/index/index.vue'),
    name: 'Outside',
    meta: { title: 'menus.outside.title' },
    children: [
      // iframe 内嵌页面
      {
        path: '/outside/iframe/:path',
        name: 'Iframe',
        component: () => import('@/views/outside/Iframe.vue'),
        meta: { title: 'iframe' }
      }
    ]
  },
  // 个人站点（无需登录）
  {
    path: '/portfolio',
    component: () => import('@views/portfolio/PortfolioLayout.vue'),
    name: 'Portfolio',
    meta: { title: '个人站点', isHideTab: true },
    redirect: '/portfolio/home',
    children: [
      {
        path: 'home',
        name: 'PortfolioHome',
        component: () => import('@views/portfolio/home/index.vue'),
        meta: { title: '首页' }
      },
      {
        path: 'about/frontend',
        name: 'PortfolioFrontend',
        component: () => import('@views/portfolio/about/frontend/index.vue'),
        meta: { title: '前端技能' }
      },
      {
        path: 'about/backend',
        name: 'PortfolioBackend',
        component: () => import('@views/portfolio/about/backend/index.vue'),
        meta: { title: '后端技能' }
      },
      {
        path: 'about/ai',
        name: 'PortfolioAI',
        component: () => import('@views/portfolio/about/ai/index.vue'),
        meta: { title: 'AI' }
      },
      {
        path: 'about/hardware',
        name: 'PortfolioHardware',
        component: () => import('@views/portfolio/about/hardware/index.vue'),
        meta: { title: '硬件' }
      },
      {
        path: 'about/server',
        name: 'PortfolioServer',
        component: () => import('@views/portfolio/about/server/index.vue'),
        meta: { title: '服务器运维' }
      },
      {
        path: 'about/solutions',
        name: 'PortfolioSolutions',
        component: () => import('@views/portfolio/about/solutions/index.vue'),
        meta: { title: '可承接解决方案' }
      },
      {
        path: 'projects',
        name: 'PortfolioProjects',
        component: () => import('@views/portfolio/projects/index.vue'),
        meta: { title: '项目' }
      },
      {
        path: 'knowledge',
        name: 'PortfolioKnowledge',
        component: () => import('@views/portfolio/knowledge/index.vue'),
        meta: { title: '知识库' }
      },
      {
        path: 'tools',
        name: 'PortfolioTools',
        component: () => import('@views/portfolio/tools/index.vue'),
        meta: { title: 'AI工具' }
      }
    ]
  }
]
