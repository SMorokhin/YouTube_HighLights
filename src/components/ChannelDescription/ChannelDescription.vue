<template>
  <div class="container pt-2 content_color">
    <Navigation/>
    <div class="mt-5">
      <button @click="backToMain" class="btn btn-info justify-content-start back-button">back</button>
      <div class="title_text mb-5">Channel information</div>
      <div class="d-flex justify-content-between container">
        <div class="d-flex">
          <img :src="this.channelInfo.thumbnails.medium.url" alt="Logo">
          <div class="d-flex flex-column text-start ms-3 description-text">
            <div>
              <span class="description-category">Publication date:</span> {{ this.publishedDate }}
            </div>
            <div>
              <span class="description-category">Name:</span> {{ this.channelInfo.localized.title }}
            </div>
            <div>
              <span class="description-category">Region:</span> {{ this.channelInfo.country }}
            </div>
            <div class="d-flex">
              <span class="description-category">Description:</span>
              <div class="description-tooltip">
                  &nbsp;{{ this.channelInfo.description }}
              </div>
            </div>
          </div>
        </div>
        <div>
          <button class="btn btn-warning" @click="getListVideos()">Start download videos</button>
        </div>
      </div>
      <videos-tile :videoTile="videoCards"></videos-tile>
      <loader v-if="this.loader === true"></loader>
    </div>
  </div>
</template>

<script>
import Navigation from '../MainContent/Navigation.vue'
import VideosTile from './VideosTile'
import Loader from '../UI/Loader'
import axios from 'axios'

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
      url: 'https://youtube.googleapis.com/youtube/v3/',
      channelInfo: null,
      videosInfo: null,
      loader: false,
      isShow: false
    }
  },
  created () {
    this.getChannelInfo()
  },
  methods: {
    getChannelInfo () {
      axios.get(this.url + 'channels?part=snippet&id=' + this.$route.params.id + '&key=AIzaSyCEFXGbnaNkehzEEL51YHTKw5ivXhYzdWk')
        .then(response => (
          this.channelInfo = response.data.items[0].snippet
        ))
    },
    getListVideos () {
      this.loader = true
      axios.get(this.url + 'search?part=snippet&channelId=' + this.$route.params.id + '&maxResults=900&key=AIzaSyCEFXGbnaNkehzEEL51YHTKw5ivXhYzdWk')
        .then(response => (
          this.videosInfo = response.data.items
        ))
      this.loader = false
    },
    backToMain () {
      this.$router.go(-1)
    }
  },
  computed: {
    publishedDate () {
      return this.channelInfo.publishedAt.slice(0, 10)
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
</script>

<style scoped>
.content_color {
  color: white;
}

.title_text {
  font-size: 32px;
}

.description-text {
  font-size: 20px;
}

.description-category {
  text-decoration: underline;
  color: #ffc107;
}

.description-tooltip {
  position: relative;
  height: 30px;
}

.back-button {
  font-size: 12px;
  font-weight: bold;
  float: left;
}
</style>
