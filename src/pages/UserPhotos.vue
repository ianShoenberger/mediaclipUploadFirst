
<script setup>
import { ref } from 'vue'
import { useMediaclipHubApi } from '../api'
import BeautyShots from '../components/BeautyShots.vue'

const { mediaclipHubApi } = useMediaclipHubApi()
const photoUrns = ref([])

async function getPreviousImages() {
  const projects = await mediaclipHubApi.getUserProjects()
  const projectImagePromise = projects.map(project => mediaclipHubApi.getProjectImages(project.id))
  const projectImages = await Promise.all(projectImagePromise)
  // const imgMeta = await mediaclipHubApi.getProjectImageMetadata(photos[0])
  // photoSrc.value = imgMeta.urlThumb
  photoUrns.value = projectImages.flat()
}

getPreviousImages()
</script>

<template>
<div class="container">
  <BeautyShots v-if="photoUrns.length" :images="photoUrns"></BeautyShots>
</div>
</template>

<style scoped>
</style>