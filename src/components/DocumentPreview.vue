<template>
  <div class="flex h-[833px] w-[591px] bg-white text-xs shadow-2xl">
    <div class="min-w-[180px] max-w-[180px] bg-grey-light">
      <div class="flex h-44 w-full items-center justify-center">
        <img class="max-w-20 max-h-20" :src="imageSrcStored" alt="logo" />
      </div>

      <div class="pl-5 pr-3">
        <div
          class="flex min-h-[80px] max-w-[120px] flex-col justify-end gap-1 pb-6"
        >
          <p class="-translate-y-[7px] text-xxs">Miejsce i data wystawienia:</p>
          <div class="flex min-h-[20px] flex-wrap gap-1">
            <p>{{ invoicePlace }}</p>
            <p>{{ formatedDate }}</p>
          </div>
        </div>
      </div>

      <div class="pb-7 pl-5">
        <div class="h-[1px] w-full bg-black"></div>
      </div>

      <div class="pl-5 pr-3">
        <div class="min-h-[144px] pb-6">
          <h2 class="mb-4">Sprzedawca:</h2>
          <p class="mb-2 font-bold">{{ sellerIdStored }}</p>
          <p v-show="sellerNipStored">NIP: {{ sellerNipStored }}</p>
          <p v-show="sellerStreetStored">ul. {{ sellerStreetStored }}</p>
          <div class="flex gap-1">
            <p>{{ sellerPostalStored }}</p>
            <p>{{ sellerCityStored }}</p>
          </div>
        </div>
      </div>

      <div class="pb-7 pl-5">
        <div class="h-[1px] w-full bg-black"></div>
      </div>

      <div class="pl-5 pr-3">
        <div class="min-h-[144px] pb-6">
          <h2 class="mb-4">Nabywca:</h2>
          <p class="mb-2 font-bold">{{ payerId }}</p>
          <p v-show="nip">NIP: {{ nip }}</p>
          <p v-show="street">ul. {{ street }}</p>
          <div class="flex gap-1">
            <p>{{ postal }}</p>
            <p>{{ city }}</p>
          </div>
        </div>
      </div>

      <div class="h-[80px] bg-grey-mid">
        <div class="flex h-full flex-col justify-center px-6">
          <h2 class="mb-1 font-bold">Płatność:</h2>
          <p>Metoda: {{ method }}</p>
          <p>Termin: {{ deadline }}</p>
          <p>Waluta: {{ currency }}</p>
          <p>Do zapłaty: {{ totalSum }}</p>
        </div>
      </div>

      <div class="h-[142px] pr-3 pt-7">
        <h2 class="mb-2 px-6 font-semibold">Kontakt:</h2>
        <div v-if="phoneStored" class="flex items-center gap-[2px] px-2">
          <i
            class="fa-solid fa-phone -translate-y-[2px] pr-1 text-grey-dark"
          ></i>
          <p class="mb-[6px]">
            {{ phoneStored }}
          </p>
        </div>
        <div v-if="emailStored" class="flex items-center gap-[2px] px-2">
          <i
            class="fa-solid fa-envelope -translate-y-[1px] pr-1 text-grey-dark"
          ></i>
          <p class="mb-[6px] flex items-center break-words">
            {{ emailStored }}
          </p>
        </div>
        <div v-if="websiteStored" class="flex items-center gap-[2px] px-2">
          <i
            class="fa-solid fa-house -translate-y-[2px] pr-1 text-grey-dark"
          ></i>
          <p class="mb-[6px]">
            {{ websiteStored }}
          </p>
        </div>
      </div>
    </div>

    <!-- Main -->

    <div class="mx-3 w-full">
      <div class="flex h-[187px] flex-col items-end justify-center">
        <h1 class="text-3xl font-semibold">F A K T U R A</h1>
        <div class="flex items-end gap-2 font-medium">
          <div class="mb-[3px] h-[1px] w-5 bg-black"></div>
          <p>Nr</p>
          <div class="min-w-[65px]">
            <p>{{ invoiceId }}</p>
          </div>
        </div>
      </div>

      <div class="flex min-h-[25px] justify-end text-xxs">
        <div v-if="formatedServiceDate" class="flex h-[25px] gap-1">
          <p>Data wykonania usługi/dokonania dostawy:</p>
          <p>{{ formatedServiceDate }}</p>
        </div>
      </div>

      <div class="text-xxs">
        <div
          class="flex h-[45px] items-center border-b border-t border-black text-center"
        >
          <p
            class="flex h-[35px] w-[158px] items-center justify-center border-r border-grey-light"
          >
            Nazwa towaru
          </p>
          <p
            class="flex h-[35px] w-[28px] items-center justify-center border-r border-grey-light"
          >
            Miara
          </p>
          <p
            class="flex h-[35px] w-[28px] items-center justify-center border-r border-grey-light"
          >
            Ilość
          </p>
          <p
            class="flex h-[35px] w-[45px] items-center justify-center border-r border-grey-light"
          >
            Wartość<br />Netto
          </p>
          <div
            class="h-[35px] w-[84px] translate-y-[2px] border-r border-grey-light"
          >
            <p class="-translate-y-[2px]">Podatek</p>
            <div class="flex flex-row justify-evenly gap-1">
              <p class="w-[41px] translate-x-[1px]">stawka</p>
              <div class="border-r border-grey-light"></div>
              <p class="w-[41px] -translate-x-[2px]">kwota</p>
            </div>
          </div>
          <p class="flex w-[45px] items-center justify-center">
            Wartość<br />Brutto
          </p>
        </div>

        <div class="min-h-[473px] bg-red-300">
          <div
            class="border-b border-black"
            v-for="(position, index) in formData"
          >
            <div class="flex py-1 text-center">
              <div
                class="flex w-[158px] break-all border-r border-grey-light text-left"
              >
                <p class="w-[16px]">{{ index + 1 }}.</p>
                <p>{{ position.itemId }}</p>
              </div>
              <p class="w-[28px] border-r border-grey-light">
                {{ position.itemMeasurement }}
              </p>
              <p class="w-[28px] border-r border-grey-light">
                {{ position.itemQuantity }}
              </p>
              <p class="w-[45px] border-r border-grey-light">
                {{ position.itemNet }}
              </p>
              <p class="w-[42px] border-r border-grey-light">
                {{ position.itemTaxPercentage }}
              </p>
              <p class="w-[42px] border-r border-grey-light">
                {{ position.itemTax }}
              </p>
              <p class="w-[45px]">{{ position.itemGross }}</p>
            </div>
          </div>

          <div
            v-if="formData.length !== 0"
            class="flex w-full flex-col items-end"
          >
            <div class="flex min-h-[25px] w-[129px]">
              <p
                class="flex w-[42px] -translate-y-[2px] items-center justify-center"
              >
                Razem
              </p>
              <div class="flex border-b border-black">
                <div
                  class="my-[2px] flex h-[18px] w-[1px] items-center bg-grey-light"
                ></div>
                <div class="w-full flex text-center justify-center items-center">
                  <p class="min-w-[41px]">{{ totalTax }}</p>
                </div>

                <div
                  class="my-[2px] flex h-[18px] w-[1px] items-center bg-grey-light"
                ></div>
                <div class="w-full flex text-center justify-center items-center">
                  <p class="min-w-[45px]">{{ totalSum }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex h-[55px] items-end justify-between border-b border-black bg-green-200 pb-[5px]"
        >
          <div class="flex flex-col items-center">
            <p class="">
              ......................................................................
            </p>
            <p>Wystawiający fakturę</p>
          </div>
          <div class="flex flex-col items-center">
            <p class="">
              ......................................................................
            </p>
            <p>Odbierający fakturę</p>
          </div>
        </div>

        <div
          class="flex h-[42px] flex-col items-center justify-center text-xxs font-bold"
          v-if="method === 'Przelew'"
        >
          <p>Przelew należy wykonać na konto bankowe o numerze:</p>
          <p>{{ bankAccountStored }} ({{ bankStored }})</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  invoiceId: String,
  invoicePlace: String,
  formatedDate: String,
  formatedServiceDate: String,
  payerId: String,
  nip: String,
  street: String,
  postal: String,
  city: String,
  method: String,
  currency: String,
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
  totalSum: Number,
  totalTax: Number,
});
</script>
