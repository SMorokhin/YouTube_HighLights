<template>
  <hr color="black" size="6px"/>
  <div class="mt-3 d-flex flex-wrap justify-content-between">
    <div v-for="tile in videoTile" :key="tile.videoId">
      <div class="d-flex flex-column tile-content ">
        <img :src="tile.image" alt="NoImage" width="300" height="200">
        <a
          class="tile-item"
          @click="openModal(tile.videoId)"
        >
          <div>{{ tile.title }}</div>
        </a>
        <div>({{ tile.published }})</div>
      </div>
    </div>
  </div>
  <modal-window
    :slideCount="this.videoTile.length"
    v-show="isShow">
    <template #header>
      <div>List of highlights</div>
      <button
        class="close-modal-button"
        @click="closeModal"
      >
        close
      </button>
    </template>
    <template #content>
      <div class="comments-list"
           v-for="comment in getTimeLines"
           :key="comment"
      >
        <a
          :href="comment.url"
          target="_blank"
        >
          {{ comment.comment }}
        </a>
      </div>
    </template>
  </modal-window>
</template>

<script>
import axios from 'axios'

export default {
  name: 'VideosTile',
  data () {
    return {
      isShow: false,
      url: 'https://youtube.googleapis.com/youtube/v3/',
      videoComments: null
    }
  },
  props: {
    videoTile: {
      type: Array,
      required: true,
      default: []
    }
  },
  methods: {
    openModal (id) {
      if (this.isShow === false) {
        axios.get(this.url + 'commentThreads?part=snippet&maxResults=50&videoId=' + id + '&key=AIzaSyCEFXGbnaNkehzEEL51YHTKw5ivXhYzdWk')
          .then(response => (
            this.videoComments = response.data.items
          ))
      }
      this.isShow = !this.isShow
    },
    closeModal () {
      this.isShow = false
    },
    convertTimeLineToSeconds (timeLine) {
      let times = timeLine.split(':').reverse()
      let result = 0
      let secondsMultiplier = 1

      times.forEach((time) => {
        result += time * (secondsMultiplier)
        secondsMultiplier *= 60
      })
      return result
    }
  },
  computed: {
    getCommentsList () {
      if (this.videoComments !== null) {
        const result = []
        const comments = this.videoComments

        comments.forEach(comment => {
          if (comment !== null) {
            result.push(comment.snippet.topLevelComment.snippet.textOriginal)
          }
        })
        return result
      }
      return []
    },
    getTimeLines () {
      if (this.getCommentsList.length !== 0) {
        const commentsList = this.getCommentsList
        const result = []
        const videoId = this.videoComments[0].snippet.videoId
        const url = `https://youtu.be/${videoId}?t=`

        commentsList.forEach(comment => {
          let tmp = comment.match(/\b\d+:\d+\b/)
          if (tmp !== null) {
            let seconds = this.convertTimeLineToSeconds(tmp[0])
            let resultUrl = url + seconds
            result.push({
              comment: comment,
              url: resultUrl
            })
          }
        })
        return result
      }
      return []
    }
  }
}
</script>

<style scoped>
.tile-content {
  width: 300px;
  color: #ffc107;
}

hr {
  color: #ffc107;
}

.tile-item {
  cursor: pointer;
  text-decoration: underline;
  color: #ffc107;
}

.comments-list {
  border-bottom: 1px solid #2a3847;
  width: 90%;
  margin: 0 auto;
  padding: 10px 0;
  text-align: center;
  overflow-x: auto;
}

.close-modal-button {
  width: 50px;
  height: 25px;
  font-size: 15px;
  border: none;
  background: #2a3847;
  color: white;
  border-radius: 10px;
}
</style>
