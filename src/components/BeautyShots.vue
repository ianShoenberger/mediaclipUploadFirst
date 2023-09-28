<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMediaclipHubApi } from '../api';
import { products } from '../config'

const beautyShots = ref([])
const projectId = ref('')
const { mediaclipHubApi } = useMediaclipHubApi()
const router = useRouter()

const props = defineProps(['image'])

async function getBeautyShots () {
  const photoUrn = props.image
  const rawBeautyShots = await mediaclipHubApi.getBeautyShots(photoUrn, products)
  beautyShots.value = products.map((product, i) => {
    return {
      name: product.name,
      url: rawBeautyShots[i],
      originalImage: photoUrn
    }
  })
}
async function addToCart(productName, customerImage) {
  const foundProduct = products.find(product => product.name === productName)
  await createProject(foundProduct, customerImage)
  const addToCartResult = await mediaclipHubApi.addToCart(projectId.value, foundProduct)
  // router.push({ path: addToCartResult.addToCartUrl })
  router.push({ name: 'cart', query: { projectId: projectId.value} })
}
async function createProject (product, customerImage) {
  const newProjectId = await mediaclipHubApi.createProject(product, customerImage)
  projectId.value = newProjectId
}
async function launchDesigner(productName, customerImage) {
  const foundProduct = products.find(product => product.name === productName)
  await createProject(foundProduct, customerImage)
  router.push({name: 'editor', query: { projectId: projectId.value}})
}
getBeautyShots()
</script>

<template>
<div class="row row-cols-1 row-cols-md-4 g-4">
  <div v-for="beautyShot in beautyShots" :key="beautyShot.name" class="col">
    <div class="card h-100">
      <img :src="beautyShot.url" class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title">{{ beautyShot.name }}</h5>
      </div>
      <div class="card-footer">
        <button @click="addToCart(beautyShot.name, beautyShot.originalImage)" class="btn btn-primary">
          <i class="bi bi-cart-plus"></i>
          Add to Cart
        </button>
        <button @click="launchDesigner(beautyShot.name, beautyShot.originalImage)" class="btn btn-secondary">
          <i class="bi bi-pencil"></i>
          Customize
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
</style>