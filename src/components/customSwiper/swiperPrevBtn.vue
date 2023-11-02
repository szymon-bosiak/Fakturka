<template>
  <button @click="swiper.slidePrev()" class="">
    <i class="fa-solid fa-caret-left text-2xl text-grey-mid"></i>
  </button >
</template>

<script setup>
import { useSwiper } from "swiper/vue";
const swiper = useSwiper();
</script>
