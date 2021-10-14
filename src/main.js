import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueGapi from 'vue-gapi'
import axios from 'axios'
import VueAxios from 'vue-axios'
import global from './global'

const app = createApp(App).use(store).use(router).use(VueGapi, {
  apiKey: 'AIzaSyCEFXGbnaNkehzEEL51YHTKw5ivXhYzdWk',
  clientId: '455930935234-n3q641clh0m2sqsd9kd1hsf3usa73k7m.apps.googleusercontent.com',
  discoveryDocs: ['https://youtube.googleapis.com/$discovery/rest?version=v3'],
  scope: 'https://www.googleapis.com/auth/youtube'
}).use(VueAxios, axios)

global(app)

app.mount('#app')
