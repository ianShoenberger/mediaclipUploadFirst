<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useMediaclipHubApi } from '../api'

const route = useRoute()
const { mediaclipHubApi } = useMediaclipHubApi()
const projectId = ref(route.query.projectId)
const projectThumb = ref('')

async function showProjectThumbnail () {
  projectThumb.value = await mediaclipHubApi.getProjectThumbnail(projectId.value)
}

showProjectThumbnail()

</script>

<template>
<div id="cartContainer">
  <h1>Shopping Cart</h1>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Product</th>
        <th scope="col">Price</th>
        <th scope="col">Quantity</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><img :src="projectThumb" width="150" class="img-fluid rounded shadow-sm" /></td>
        <td class="align-middle">$1.00</td>
        <td class="align-middle">1</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<style scoped>
#cartContainer {
  width: 50vw;
}
</style>