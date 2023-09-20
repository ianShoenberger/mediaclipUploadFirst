<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMediaclipHubApi } from '../api';
const route = useRoute()
const { mediaclipHubApi } = useMediaclipHubApi()

function onErrorHandler(err) {
  throw err
}

function launchDesigner() {
  const { projectId } = route.query
  window.mediaclip.hub.launch({
    projectId,
    authorization: {
      scheme: 'HubStoreUserToken',
      token: mediaclipHubApi.userToken
    },
    container: document.getElementById('designer'), // The div you want to launch into
    keepAliveUrl: 'https://mediaclipuploadfirstserver.azurewebsites.net/token/renew', // From the "The renew-token page" section
    onError: onErrorHandler
  });
}

onMounted(() => {
  launchDesigner()
})
</script>

<template>
  <div id="designer"></div>
</template>

<style scoped>
#designer {
  height: 100vh;
}
</style>