import axios from 'axios'
import base64 from 'base-64'

class MediaclipHubApi {
  baseMediaclipUrl = 'https://api.mediacliphub.com'

  constructor () {
    this.appKey = null
    this.appSecret = null
    this.userToken = null
    this.userId = null
  }

  install (app, options) {
    app.config.globalProperties.$mediaclipHubApi = this
  }

  setKeyAndSecret (appKey, appSecret) {
    this.appKey = appKey
    this.appSecret = appSecret
  }

  async createUserToken () {
    try {
      const auth = base64.encode(`${this.appKey}:${this.appSecret}`)
      const result = await axios.post(`${this.baseMediaclipUrl}/auth/jwt`,
      {
        storeData: {
          userId: '1d22584a-ac82-4b5d-8f2e-8c06aab39f12'
        },
        roles: ['Anonymous']
      },
      {
        headers: {
          'Authorization': `HubApi ${auth}`
        }
      })
      this.userToken = result.data.token
      this.userId = result.data.userId
      this.storeUserToken(result.data, auth)
    } catch (err) {
      throw err
    }
  }

  async storeUserToken (mediaclipResponse, hubApiAuth) {
    try {
      const storeResult = await axios.post('/token/new', {
        ...mediaclipResponse,
        hubApiAuth
      })
    } catch (err) {
      throw err
    }
  }

  async uploadPhoto (filename, imageData) {
    try {
      const url = `https://uploads.mediacliphub.com/stores/${this.appKey}/users/${this.userId}/sources/uploads/photos?async=true&originalFilename=${filename}`
      const result = await axios.post(url, imageData, { headers: { 'Authorization': `HubStoreUserToken ${this.userToken}`, 'Content-Type': 'image/jpeg' }})
      return result.data
    } catch (ex) {
      throw ex
    }
  }

  checkUploadStatus (photoUrn, attempt, delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const url = `https://photos.mediacliphub.com/photos/${photoUrn}/pendingStatus?attempt=${attempt}`
        axios.get(url, { headers: { 'Authorization': `HubStoreUserToken ${this.userToken}` }})
          .then((result) => {
            resolve(result.data)
          })
          .catch((err) => {
            reject(err)
          })
      }, delay)
    })
  }

  async getBeautyShots (photoUrn, products) {
    try {
      const beautyShots = products.map((product) => {
        const { module, productId, themeUrl } = product
        return {
          module,
          productId,
          themeUrl,
          photoUrns: [photoUrn],
        }
      })
      const url = `${this.baseMediaclipUrl}/stores/${this.appKey}/beautyShots`
      const result = await axios.post(url, { beautyShots }, { headers: { 'Authorization': `HubStoreUserToken ${this.userToken}` }})
      return result.data.beautyshotsUrls
    } catch (err) {
      throw err
    }
  }

  async createProject (product, imageUrn) {
    try {
      const { module, productId, themeUrl } = product
      const createProjectPayload = {
        designerData: {
          module,
          productId,
          themeUrl,
          photos: [imageUrn]
        }
      }
      const result = await axios.post(`${this.baseMediaclipUrl}/projects`, createProjectPayload, { headers: { 'Authorization': `HubStoreUserToken ${this.userToken}` }})
      return result.data.id
    } catch (err) {
      throw err
    }
  }

  async addToCart (projectId, product) {
    try {
      const url = `https://ecb.mediacliphub.com/addtocart?data-projectId=${projectId}&data-storeId=${this.appKey}&module=${product.module}`
      const result = await axios.post(url, null, { headers: { 'Authorization': `HubStoreUserToken ${this.userToken}` }})
      return result
    } catch (err) {
      throw err
    }
  }

  async getProjectThumbnail (projectId) {
    try {
      const url = `https://render.mediacliphub.com/projects/${projectId}/thumb`
      const result = await axios.get(url, { headers: { 'Authorization': `HubStoreUserToken ${this.userToken}`}, responseType: 'blob' })
      return result.data
    } catch (err) {
      throw err
    }
  }
}

const _mediaclipHubApi = new MediaclipHubApi()

export const mediaclipHubApi = _mediaclipHubApi

export const useMediaclipHubApi = () => {
  return { mediaclipHubApi: _mediaclipHubApi }
}
  