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

<script src="./MainContent.js"></script>
<link rel="stylesheet" src="./MainContent.scss">
