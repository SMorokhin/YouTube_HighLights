<template>
  <div class="custom-modal">
    <div class="custom-modal__header">
      <slot name="header">
        header
      </slot>
    </div>
    <div class="custom-modal__content">
      <slot name="content">
        content
      </slot>
    </div>
    <div class="custom-modal__paginator">
      <button @click="prevSlide" class="custom-modal__paginator__button">Left</button>
      <div>{{ this.currentSlide }}</div>
      <button @click="nextSlide" class="custom-modal__paginator__button">Right</button>
    </div>
  </div>
</template>

<script src="./ModalWindow.js"></script>
<link rel="stylesheet" src="./ModalWindow.scss">

