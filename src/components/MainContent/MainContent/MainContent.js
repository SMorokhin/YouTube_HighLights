import * as YoutubeMethods from '../../../js/youtubeapi'
import DescriptionDisplay from '@/components/MainContent/DescriptionDisplay/DescriptionDisplay.vue'

export default {
  name: 'MainContent',
  components: {
    DescriptionDisplay
  },
  data () {
    return {
      channelName: '',
      channelInfo: null,
      videoInfo: null,
      loaded: false,
      descriptionArray: []
    }
  },
  created () {
    this.descriptionArray = this.getDescriptionData()
  },
  methods: {
    async getChannel () {
      this.channelInfo = await YoutubeMethods.yGetChannelByVideoId(this.channelName)
      this.channelName = ''
      this.loaded = true
    },
    async searchChannelByVideoId (videoId) {
      this.videoInfo = await YoutubeMethods.ySearchChannelByVideoId(videoId)
    },
    goToChannelDescription (channel) {
      const route = '/ChannelDescription/' + channel
      this.$router.push(route)
    },
    getDescriptionData () {
      return [
        {
          videoPosition: 'left',
          src: 'https://media.contentapi.ea.com/content/dam/apex-legends/videos/2021/07/apex-video-battle-pass-emergence-season-emote.webm',
          description: 'Enter the name of the channel in the input field at the top of the site, then go to its description, where the last more relative videos will be displayed'
        },
        {
          videoPosition: 'right',
          src: 'https://media.contentapi.ea.com/content/dam/apex-legends/videos/2021/07/apex-battle-pass-emergence-season-holosprays.webm',
          description: 'Click on the video, wait for the highlights, view the result'
        }
      ]
    }
  },
  computed: {
    // массив ID каналов
    getChannelId () {
      if (this.loaded === false) {
        return null
      }
      let channel = ''
      if (this.channelInfo !== null) {
        this.channelInfo.items.forEach(object => {
          if (object.id.hasOwnProperty('channelId')) {
            channel += object.id.channelId
          }
        })
      }
      if (channel === '') {
        if (this.channelInfo === null) return null
        this.searchChannelByVideoId(this.channelInfo.items[0].id.videoId)
        channel = this.videoInfo.items[0].snippet.channelId
      }
      return channel
    },
    channelLink () {
      if (this.loaded === false) {
        return null
      }
      let channel = ''
      const url = 'https://youtube.com/channel/'
      channel = url + this.getChannelId
      return channel
    }
  }
}
