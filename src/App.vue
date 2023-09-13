<script>
import { MediaclipHubApi } from './api'
import { products } from './config'
export default {
 data() {
  return {
    userImage: null,
    beautyShots: [],
    authenticated: false,
    appKey: '',
    appSecret: '',
    mediaclipHubApi: null
  }
 },
 methods: {
  imageSelected(evt) {
    const fileObj = evt.target.files[0]
    if (!fileObj.type.startsWith("image/")) {
      return
    }
    const fileReader = new FileReader()
    fileReader.onload = (e) => {
      this.uploadPhoto(fileObj.name, e.target.result)
    }
    fileReader.readAsArrayBuffer(fileObj)
  },
  async uploadPhoto(name, binaryString) {
    const uploadStatus = await this.mediaclipHubApi.uploadPhoto(name, binaryString)
    
    if (!uploadStatus.ready) {
      let attempt = 1
      let delay = uploadStatus.remaining
      let statusCheck = null
      do {
        statusCheck = await this.mediaclipHubApi.checkUploadStatus(uploadStatus.photoId, attempt, delay)
        attempt += 1
        delay = statusCheck.remaining
      } while (statusCheck.status !== 'Done')
    }

    this.getBeautyShots(uploadStatus.photoId)
  },
  async getBeautyShots (photoUrn) {
    const beautyShots = await this.mediaclipHubApi.getBeautyShots(photoUrn, products)
    this.beautyShots = products.map((product, i) => {
      return {
        name: product.name,
        url: beautyShots[i],
        originalImage: photoUrn
      }
    })
  },
  async addToCart(productName, customerImage) {
    const foundProduct = products.find(product => product.name === productName)
    const newProjectId = await this.mediaclipHubApi.createProject(foundProduct, customerImage)
    const addToCartResult = await this.mediaclipHubApi.addToCart(newProjectId, foundProduct)
    debugger
  },
  async getToken() {
    this.mediaclipHubApi = new MediaclipHubApi(this.appKey, this.appSecret)
    await this.mediaclipHubApi.createUserToken()
    this.authenticated = true
  }
 }
}

</script>

<template>
  <div v-if="authenticated" class="container">
    <input type="file" id="imagePicker" ref="imagePicker" @change="imageSelected" />
    <img v-if="userImage" :src="userImage" />
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
