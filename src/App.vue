<template>
  <div class="flex flex-col justify-center h-screen bg-background">
    <nav class="flex items-center justify-between px-10 h-16 w-full bg-accent-1">
      <div class="text-white flex">
        <p class="">Fakurka</p>
        <p class="text-xs">©</p>
      </div>
      <i @click="viewProfileEdit()" class="fa-solid fa-user-pen text-xl cursor-pointer transition hover:scale-110" style="color: #ffffff;"></i>
    </nav>

    <sellersInfoForm v-if="editProfile" @close="viewProfileEdit()"/>

    <div class="flex-auto max-h-[910px]">
      <div class="grid grid-cols-2 grid-rows-1 h-full">
        <div class="bg-white w-full">
          <nav class="flex justify-center my-5">
            <button @click="changeView = true"
              class="border py-3 px-6 rounded-xl mr-8 transition duration-300 hover:scale-105"
              :class="{ 'bg-blue-500 text-white': changeView === true }" to="/">Wystaw fakturę</button>
            <button @click="changeView = false"
              class="border py-3 px-6 rounded-xl transition duration-300 hover:scale-105"
              :class="{ 'bg-blue-500 text-white': changeView === false }">Dodaj podmiot</button>
          </nav>

          <div class="flex justify-center">
            <div class="w-full max-w-[780px]">
              <InvoiceForm v-if="changeView" @entered-date="formatDate" @remove="remove()" @add-more="addMore"
                v-model:invoiceId="invoiceId" v-model:invoicePlace="invoicePlace" v-model:invoiceDateOf="invoiceDateOf"
                v-model:payerId="payerId" v-model:nip="nip" v-model:street="street" v-model:postal="postal"
                v-model:city="city" v-model:method="method" v-model:deadline="deadline" v-model:formData="formData" />
              <BillingData v-else />
            </div>
          </div>
        </div>

        <DocumentPreview :invoiceId="invoiceId" :invoicePlace="invoicePlace" :formatedDate="formatedDate"
          :payerId="payerId" :nip="nip" :street="street" :postal="postal" :city="city" :method="method"
          :deadline="deadline" :formData="formData" />

      </div>
    </div>

  </div>
</template>


<script setup>
import BillingData from './components/BillingData.vue';
import InvoiceForm from './components/InvoiceForm.vue';
import DocumentPreview from './components/DocumentPreview.vue';
import sellersInfoForm from './components/sellersInfoForm.vue';
import { ref } from 'vue';

const changeView = ref(true)
const editProfile = ref(false)
const invoiceId = ref()
const invoicePlace = ref()
const invoiceDateOf = ref()
const payerId = ref()
const nip = ref()
const street = ref()
const postal = ref()
const city = ref()
const method = ref()
const deadline = ref()
const formData = ref([])

const remove = () => {
  formData.value.pop()
}
const addMore = () => {
  formData.value.push({})
}

const viewProfileEdit = () => {
  editProfile.value = !editProfile.value
}

const formatedDate = ref()
const formatDate = () => {
  let arr = (invoiceDateOf.value).split('-')
  let rearanged = [arr[2], arr[1], arr[0]].join('.')

  formatedDate.value = rearanged
}

</script>

