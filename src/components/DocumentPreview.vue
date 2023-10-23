<template>
  <div class="bg-background flex flex-auto justify-center">
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
      {{ sellerId }}
      {{ sellerNip }}
      {{ sellerStreet }}
      {{ sellerPostal }}
      {{ sellerCity }}
      {{ bank }}
      {{ bankAccount }}
      {{ phone }}
      {{ email }}
      {{ website }}
      <img class="h-10 w-10" :src="imageSrc" alt="">
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
})

const sellerId = ref();
const sellerNip = ref();
const sellerStreet = ref();
const sellerPostal = ref();
const sellerCity = ref();
const bank = ref();
const bankAccount = ref();
const phone = ref();
const email = ref();
const website = ref();

if (localStorage.getItem("sellerInfo") !== null) {
  let storedValues = JSON.parse(localStorage.getItem("sellerInfo"));
  sellerId.value = storedValues.sellerId._value;
  sellerNip.value = storedValues.sellerNip._value;
  sellerStreet.value = storedValues.sellerStreet._value;
  sellerPostal.value = storedValues.sellerPostal._value;
  sellerCity.value = storedValues.sellerCity._value;
  bank.value = storedValues.bank._value;
  bankAccount.value = storedValues.bankAccount._value;
  phone.value = storedValues.phone._value;
  email.value = storedValues.email._value;
  website.value = storedValues.website._value;
}

const imageSrc = ref();

if (localStorage.getItem("image") !== null) {
  imageSrc.value = localStorage.getItem("image");
}
</script>
