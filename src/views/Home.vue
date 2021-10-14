<template>
  <div class="container pt-2">
    <Navigation/>
    <div v-if="!isSignedIn" class="no_data">
      <NoData></NoData>
      <button
        :disabled="!isSignedIn === false"
        @click="login()"
        type="button"
        class="btn btn-info"
        style="width: 150px"
        v-if="!isSignedIn"
      >
        LogIn
      </button>
    </div>
    <div v-else>
      <MainContent></MainContent>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navigation from '@/components/MainContent/Navigation.vue'
import MainContent from '@/components/MainContent/MainContent.vue'
import NoData from '@/components/NoData.vue'

export default {
  name: 'Home',
  components: {
    Navigation, NoData, MainContent
  },
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
    login () {
      this.$gapi.login()
    }
  }
}
</script>

<style>
.no_data {
  top: 40%;
}
</style>
