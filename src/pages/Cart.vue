<script setup>
import { ref, inject } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const mediaclipHubApi = inject('mediaclipHubApi')
const projectId = ref(route.query.projectId)
const projectThumb = ref('')

const thumbStream = mediaclipHubApi.getProjectThumb(projectId.value)
projectThumb.value = thumbStream
</script>

<template>
<div>
  <h1>{{ projectId }}</h1>
  <img :src="projectThumb" />
</div>
</template>

<style scoped>
</style>