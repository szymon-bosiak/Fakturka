<template>
  <div class="flex flex-auto justify-center bg-background">
    <div class="m-8 aspect-A4 bg-white">
      Tytuł {{ invoiceId }}
      {{ invoicePlace }}
      {{ formatedDate }}
      {{ payerId }}
      {{ nip }}
      {{ street }}
      {{ postal }}
      {{ city }}
      {{ method }}
      {{ deadline }}
      {{ formData }}
      {{ sellerIdStored }}
      {{ sellerNipStored }}
      {{ sellerStreetStored }}
      {{ sellerPostalStored }}
      {{ sellerCityStored }}
      {{ bankStored }}
      {{ bankAccountStored }}
      {{ phoneStored }}
      {{ emailStored }}
      {{ websiteStored }}
      <img class="h-10 w-10" :src="imageSrcStored" alt="" />
    </div>
    <!-- <p>w-[794px] h-[1123px] </p> -->
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  invoiceId: String,
  invoicePlace: String,
  formatedDate: String,
  payerId: String,
  nip: String,
  street: String,
  postal: String,
  city: String,
  method: String,
  deadline: String,
  itemId: String,
  formData: Object,
  sellerIdStored: String,
  sellerNipStored: String,
  sellerStreetStored: String,
  sellerPostalStored: String,
  sellerCityStored: String,
  bankStored: String,
  bankAccountStored: String,
  phoneStored: String,
  emailStored: String,
  websiteStored: String,
  imageSrcStored: String,
});


</script>
