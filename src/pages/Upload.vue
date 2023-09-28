<script setup>
import { ref } from 'vue'
import { useMediaclipHubApi } from '../api'
import BeautyShots from '../components/BeautyShots.vue'

const { mediaclipHubApi } = useMediaclipHubApi()
const photoId = ref('')

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

  photoId.value = uploadStatus.photoId
}
</script>

<template>
<div class="container">
  <input type="file" id="imagePicker" ref="imagePicker" @change="imageSelected" />
  <BeautyShots v-if="photoId" :image="photoId"></BeautyShots>
</div>
</template>

<style scoped>
</style>