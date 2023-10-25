<template>
  <div class="flex overflow-hidden h-full bg-white">
    <div class="bg-grey-light">
      <div class="flex h-48 w-full items-center justify-center">
        <img class="h-20 w-20" :src="imageSrcStored" alt="logo" />
      </div>

      <div>
        <h2>Sprzedawca</h2>
        <p>{{ sellerIdStored }}</p>
        <p>NIP: {{ sellerNipStored }}</p>
        <p>{{ sellerStreetStored }}</p>
        <p>{{ sellerPostalStored }}</p>
        <p>{{ sellerCityStored }}</p>
      </div>
    </div>

    <div class="pr-7">
      <div class="flex h-48 flex-col items-end justify-center">
        <h1 class="text-3xl font-semibold">F A K T U R A</h1>
        <div class="flex items-end gap-2 font-medium">
          <div class="mb-[6px] h-[1px] w-5 bg-black"></div>
          <p>Nr</p>
          <div class="min-w-[80px]">
            <p>{{ invoiceId }}22/13/2341</p>
          </div>
        </div>
      </div>

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

      {{ bankStored }}
      {{ bankAccountStored }}
      {{ phoneStored }}
      {{ emailStored }}
      {{ websiteStored }}

      <div
        class="relative bottom-0 h-full w-full border-4 border-white bg-black"
      ></div>
    </div>
  </div>
  <!-- <p>w-[794px] h-[1123px] </p> -->
</template>

<script setup>
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
