import { TOKEN_NAME } from '@/constant'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'index',
		redirect: '/article',
		component: () => import('@/view/Layout/Layout.vue'),
		children: [
			{
				path: 'article',
				name: 'article',
				component: () => import('@/view/Article/index.vue')
			},
			{
				path: 'tag',
				name: 'tag',
				component: () => import('@/view/Tag/index.vue')
			}
		]
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/view/Login/index.vue')
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

router.beforeEach((to, from) => {
	const token = localStorage.getItem(TOKEN_NAME)
	const isLogin = token && token.length > 0

	if (isLogin && to.name === 'login') {
		return { name: 'index' }
	} else if (!isLogin && to.name !== 'login') {
		return { name: 'login' }
	}
})

export default router
