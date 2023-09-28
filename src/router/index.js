import { createRouter, createWebHashHistory } from 'vue-router'
import Authenticate from '../pages/Authenticate.vue'
import Upload from '../pages/Upload.vue'
import Cart from '../pages/Cart.vue'
import Editor from '../pages/Editor.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Authenticate
  },
  {
    path: '/upload',
    name: 'upload',
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