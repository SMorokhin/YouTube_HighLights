export default {
  name: 'Navigation',
  data () {
    return {
      isSignedIn: false
    }
  },
  created () {
    this.$gapi.listenUserSignIn((isSignedIn) => {
      this.isSignedIn = isSignedIn
    })
  },
  methods: {
    logout () {
      this.$gapi.logout()
    }
  },
  computed: {
    userName () {
      const user = this.$gapi.getUserData()
      if (user) {
        return user
      } else return false
    }
  }
}
