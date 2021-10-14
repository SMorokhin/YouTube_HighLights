<template>
  <div class="content_color mt-4">
      <div class="d-flex flex_content mb-4">
        <input type="text"
               placeholder="Enter channel name"
               v-model="channelName"
               @keyup.enter="getChannel"
               class="form-control"
               style="margin-right: 10px"
        >
      </div>
      <div v-if="this.getChannelId !== null">
          <a
            @click="goToChannelDescription(getChannelId)"
            :href="getChannelId"
            class="link_style btn btn-light mb-3 link_description"
          >Перейти к описанию</a>
      </div>
    <div class="title_text mb-3">
      HOW IT WORKS:
    </div>
    <div>
      <description-display v-for="description in descriptionArray" :key="description" :description="description"></description-display>
    </div>

  </div>
</template>

<script>

import axios from 'axios'
import DescriptionDisplay from '@/components/MainContent/DescriptionDisplay.vue'

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
      url: 'https://youtube.googleapis.com/youtube/v3/',
      descriptionArray: []
    }
  },
  created () {
    this.descriptionArray = this.getDescriptionData();
  },
  methods: {
    // gapi метод Search.list (получение результата по ключевому слову)
    getChannel () {
      axios.get(this.url + 'search?maxResults=1&q=' + this.channelName + '&key=AIzaSyCEFXGbnaNkehzEEL51YHTKw5ivXhYzdWk')
        .then(response => (
          this.channelInfo = response.data))
      this.channelName = ''
      this.loaded = true
    },
    // поиск ID канала по ID видео
    searchChannelByVideoId (videoId) {
      axios.get(this.url + 'videos?part=snippet&id=' + videoId + '&key=AIzaSyCEFXGbnaNkehzEEL51YHTKw5ivXhYzdWk')
        .then(response => (
          this.videoInfo = response.data
        ))
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
    },
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
</script>

<style scoped>
.content_color {
  color: white;
}
.link_style {
  text-decoration: none;
  color: white;
  text-transform: uppercase;
}
.title_text {
  font-size: 32px;
  color: #ffc107;
}
.link_description {
  color: #3d3d3d;
  width: 30%;
}

</style>
