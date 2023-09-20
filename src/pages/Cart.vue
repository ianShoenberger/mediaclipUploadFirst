<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useMediaclipHubApi } from '../api'

const route = useRoute()
const { mediaclipHubApi } = useMediaclipHubApi()
const projectId = ref(route.query.projectId)
const projectThumb = ref('')

async function showProjectThumbnail () {
  const thumbBlob = await mediaclipHubApi.getProjectThumbnail(projectId.value)
  projectThumb.value = URL.createObjectURL(thumbBlob)
}

showProjectThumbnail()

</script>

<template>
<div>
  <h1>{{ projectId }}</h1>
  <img :src="projectThumb" />
</div>
</template>

<style scoped>
</style>