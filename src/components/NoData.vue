<template>
  <div class="no_data container">
    <slot>
<!--      Авторизуйтесь через Google-->
      logIn through
      <span style="color: cornflowerblue">G</span>
      <span style="color: crimson">o</span>
      <span style="color: gold">o</span>
      <span style="color: cornflowerblue">g</span>
      <span style="color: limegreen">l</span>
      <span style="color: crimson">e</span>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'NoData'
}
</script>

<style scoped>
.no_data {
  padding-top: 25rem;
  width: 100%;
  height: 100%;
  font-size: 50px;
  color: white;
  text-align: center;
}
</style>
