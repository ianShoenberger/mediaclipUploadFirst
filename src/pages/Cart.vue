<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const projectId = ref(route.query.projectId)
</script>

<template>
<div>
  <h1>{{ projectId }}</h1>
</div>
</template>

<style scoped>
</style>