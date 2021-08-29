<template>
  <div class="bg">
    <div class="top-bg"></div>
    <wave class="wave"></wave>
  </div>
</template>

<script setup>
import wave from "./Wave.vue";
</script>

<style>
.bg {
  width: 100%;
  position: fixed;
  z-index: -1;
}
.top-bg {
  height: 30vh;
  width: 100%;
  background-color: rgb(139, 137, 255);
}
.wave {
  position: relative;
  top: -1px;
  z-index: -1;
}
</style>
