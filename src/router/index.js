import { createRouter, createWebHashHistory } from 'vue-router'
import Upload from '../pages/Upload.vue'
import Cart from '../pages/Cart.vue'
import Editor from '../pages/Editor.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Upload
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/editor',
    name: 'editor',
    component: Editor
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router