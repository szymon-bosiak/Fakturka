<template>
    <button @click="swiper.slideNext()" class="">
      <i class="fa-solid fa-caret-right text-2xl text-grey-light"></i>
    </button >
  </template>
  
  <script setup>
  import { useSwiper } from "swiper/vue";
  const swiper = useSwiper();
  </script>
  