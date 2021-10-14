import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3/'
})

axiosInstance.interceptors.request.use(request => {
  request.params.key = process.env.VUE_APP_GOOGLE_API_KEY
  return request
})

export default axiosInstance
