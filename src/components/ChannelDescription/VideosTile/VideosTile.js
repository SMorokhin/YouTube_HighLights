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
