<template>
    <div class="d-flex mb-5 justify-content-start desc">
      <video
        class="rounded border border-warning"
        loop
        width="350"
        height="200"
        autoplay
        muted
        type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
        :src="description.src"
      />
      <div class="text-description-right ">
        {{ description.description }}
      </div>
    </div>

<!-- порывы кринжа -->
<!--    <div v-else class="d-flex mb-5 justify-content-end">-->
<!--      <div class="text-description-left ">-->
<!--        {{ description.description }}-->
<!--      </div>-->
<!--      <video-->
<!--        class="rounded border border-warning"-->
<!--        loop-->
<!--        width="350"-->
<!--        height="200"-->
<!--        autoplay-->
<!--        muted-->
<!--        type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'-->
<!--        :src="description.src"-->
<!--      />-->
<!--    </div>-->

</template>

<script>
export default {
  name: 'DescriptionDisplay',
  props: {
    description: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

.text-description-right {
  font-size: 28px;
  margin-left: 20px;
  text-align: start;
}
.desc:nth-child(odd) > video {
  order: 0;
  margin-left: auto;
}
.desc:nth-child(odd) > div {
  order: 1;
}
.desc:nth-child(even) > video {
  order: 1;
  margin-left: 20px;
}
.desc:nth-child(even) > div {
  order: 0;
  margin-left: auto;
}
</style>
