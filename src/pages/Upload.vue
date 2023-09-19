<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { products } from '../config'

const router = useRouter()
const mediaclipHubApi = inject('mediaclipHubApi')
const beautyShots = ref([])
const authenticated = ref(false)
const appKey = ref('')
const appSecret = ref('')
 
function imageSelected(evt) {
  const fileObj = evt.target.files[0]
  if (!fileObj.type.startsWith("image/")) {
    return
  }
  const fileReader = new FileReader()
  fileReader.onload = (e) => {
    uploadPhoto(fileObj.name, e.target.result)
  }
  fileReader.readAsArrayBuffer(fileObj)
}
async function uploadPhoto(name, binaryString) {
  const uploadStatus = await mediaclipHubApi.uploadPhoto(name, binaryString)
  
  if (!uploadStatus.ready) {
    let attempt = 1
    let delay = uploadStatus.remaining
    let statusCheck = null
    do {
      statusCheck = await mediaclipHubApi.checkUploadStatus(uploadStatus.photoId, attempt, delay)
      attempt += 1
      delay = statusCheck.remaining
    } while (statusCheck.status !== 'Done')
  }

  getBeautyShots(uploadStatus.photoId)
}
async function getBeautyShots (photoUrn) {
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
  const newProjectId = await mediaclipHubApi.createProject(foundProduct, customerImage)
  const addToCartResult = await mediaclipHubApi.addToCart(newProjectId, foundProduct)
  router.push({ path: addToCartResult.addToCartUrl })
}
async function getToken() {
  mediaclipHubApi.setKeyAndSecret(appKey.value, appSecret.value)
  await mediaclipHubApi.createUserToken()
  authenticated.value = true
}
</script>

<template>
  <div v-if="authenticated" class="container">
    <input type="file" id="imagePicker" ref="imagePicker" @change="imageSelected" />
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
            <button class="btn btn-secondary">
              <i class="bi bi-pencil"></i>
              Customize
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <label for="appKeyField">App Key</label>
    <input v-model="appKey" type="text" id="appKeyField" />
    <label for="appSecretField">App Secret</label>
    <input v-model="appSecret" type="text" id="appSecretField" />
    <button id="authenticate" @click="getToken">Authenticate</button>
  </div>
</template>

<style scoped>
</style>
