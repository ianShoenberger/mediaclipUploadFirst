
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
  const flattenedProjectImages = projectImages.flat()
  const projectImageMetadataPromises = flattenedProjectImages.map((flattenedProjectImage) => {
    return mediaclipHubApi.getProjectImageMetadata(flattenedProjectImage)
  })
  const projectImageMetadatas = await Promise.all(projectImageMetadataPromises)
  const deDuped = []
  const deDupedIds = []
  projectImageMetadatas.forEach((projectImageMetadata) => {
    if (!deDuped.includes(projectImageMetadata.originalFilename)) {
      deDuped.push(projectImageMetadata.originalFilename)
      console.log(projectImageMetadata.originalFilename)
      deDupedIds.push(projectImageMetadata.id)
    }
  })
  photoUrns.value = deDupedIds
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