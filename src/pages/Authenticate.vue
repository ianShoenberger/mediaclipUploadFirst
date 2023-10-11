<script setup>
import { ref } from 'vue'
import { useMediaclipHubApi } from '../api'
import { appSecret } from '../config'

const { mediaclipHubApi } = useMediaclipHubApi()
const authenticated = ref(false)
const appKey = ref('')
 
async function getToken() {
  mediaclipHubApi.setKeyAndSecret(appKey.value, appSecret)
  await mediaclipHubApi.createUserToken()
  authenticated.value = true
}
if (mediaclipHubApi.userToken) {
  authenticated.value = true
}
</script>

<template>
  <div v-if="authenticated" class="d-flex justify-content-center align-items-center">
    <div id="uploadChoice" class="me-4">
      <router-link to="/upload">upload a new image</router-link>
    </div>
    <div id="userPhotoChoice">
      <router-link to="/userPhotos">use my images</router-link>
    </div>
  </div>
  <div v-else>
    <label for="appKeyField">App Key</label>
    <input v-model="appKey" type="text" id="appKeyField" />
    <button id="authenticate" @click="getToken">Authenticate</button>
  </div>
</template>

<style scoped>

#uploadChoice, #userPhotoChoice {
  height: 300px;
  width: 300px;
  text-align: center;
  font-size: 3rem;
  border-radius: 1rem;
}

#uploadChoice {
  background: lightcoral;
}

#userPhotoChoice {
  background: lightseagreen;
}
</style>
