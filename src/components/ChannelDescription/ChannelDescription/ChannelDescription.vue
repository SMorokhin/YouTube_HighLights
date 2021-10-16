<template>
  <div class="container pt-2 content_color">
    <Navigation/>
    <div v-if="channelInfo" class="mt-5">
      <button @click="backToMain" class="btn btn-info justify-content-start back-button">back</button>
      <div class="title_text mb-5">Channel information</div>
      <div class="d-flex justify-content-between container">
        <div class="d-flex">
          <img :src="thumbnail" alt="Logo">
          <div class="d-flex flex-column text-start ms-3 description-text">
            <div>
              <span class="description-category">Publication date:</span> {{ publishedDate }}
            </div>
            <div>
              <span class="description-category">Name:</span> {{ channelInfo.localized.title }}
            </div>
            <div>
              <span class="description-category">Region:</span> {{ channelInfo.country }}
            </div>
            <div class="d-flex">
              <span class="description-category">Description:</span>
              <div class="description-tooltip">
                  &nbsp;{{ channelInfo.description }}
              </div>
            </div>
          </div>
        </div>
        <div>
          <button class="btn btn-warning" @click="getListVideos()">Start download videos</button>
        </div>
      </div>
      <videos-tile :videoTile="videoCards"></videos-tile>
      <loader v-if="loader === true"></loader>
    </div>
  </div>
</template>

<script src="./ChannelDescription.js"></script>
<link rel="stylesheet" src="./ChannelDescription.scss">

