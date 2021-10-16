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

<script src="./VideosTile.js"></script>
<link rel="stylesheet" src="./VideosTile.scss">
