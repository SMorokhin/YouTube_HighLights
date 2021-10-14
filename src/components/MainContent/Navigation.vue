<template>
  <div>
    <div>
      <div v-if="isSignedIn" class="navbar">
        <button class="btn btn-warning" @click="logout()" type="button">LogOut</button>
        <div class="main_color d-flex">
          <div class="nav_text_aligment">
            <div>{{ userName.fullName }}</div>
            <div>{{ userName.email }}</div>
          </div>
            <img :src=userName.imageUrl alt="" class="image_frame_circle">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main_color {
  color: white;
}
.image_frame_circle {
  border-radius: 50%;
  padding-left: 10px;
}
.nav_text_aligment {
  align-self: center;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
