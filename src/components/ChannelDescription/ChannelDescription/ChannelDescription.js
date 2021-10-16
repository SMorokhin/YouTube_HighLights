import Navigation from '../../MainContent/Navigation/Navigation.vue'
import VideosTile from '../VideosTile/VideosTile.vue'
import Loader from '../../UI/Loader/Loader.vue'
import axios from '@/axios'

export default {
  name: 'ChannelDescription',
  components: {
    Navigation,
    VideosTile,
    Loader
  },
  data () {
    return {
      pageName: 'Channel Description',
      channelInfo: null,
      videosInfo: null,
      loader: false,
      isShow: false
    }
  },
  async created () {
    await this.getChannelInfo()
  },
  methods: {
    async getChannelInfo () {
      const response = await axios.get('/channels', {
        params: {
          part: 'snippet',
          id: this.$route.params.id
        }
      })
      this.channelInfo = response.data.items[0].snippet
    },
    async getListVideos () {
      this.loader = true
      const response = await axios.get('/search', {
        params: {
          part: 'snippet',
          channelId: this.$route.params.id,
          maxResults: 900
        }
      })
      this.videosInfo = response.data.items
      this.loader = false
    },
    backToMain () {
      this.$router.go(-1)
    }
  },
  computed: {
    thumbnail () {
      if (this.channelInfo) {
        return this.channelInfo.thumbnails.medium.url
      }
      return ''
    },
    publishedDate () {
      if (this.channelInfo) {
        return this.channelInfo.publishedAt.slice(0, 10)
      }
      return null
    },
    videoCards () {
      if (this.videosInfo === null) return []
      const result = []
      const url = 'https://youtube.com/video/'
      this.videosInfo.forEach((element) => {
        if (!element.id.hasOwnProperty('playlistId')) {
          result.push({
            link: url + element.id.videoId,
            title: element.snippet.title,
            published: element.snippet.publishedAt.slice(0, 10),
            description: element.snippet.description,
            image: element.snippet.thumbnails.high.url,
            videoId: element.id.videoId
          })
        }
      })
      return result
    }
  }
}
