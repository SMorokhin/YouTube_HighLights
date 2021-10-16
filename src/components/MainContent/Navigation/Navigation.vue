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

<script src="./Navigation.js"></script>
<link rel="stylesheet" src="./Navigation.scss">
