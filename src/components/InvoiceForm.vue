<template>
  <div class="mx-6 text-sm">

    <form>
      <div class="flex flex-col mb-6">
        <h3 class="mb-3 text-base">Dane faktury</h3>

        <div class="ml-4">
          <div class="flex flex-row gap-8 w-full max-w-[606px]">
            <div class="flex flex-col mb-2 w-26">
              <label for="invoiceId">Nr faktury</label>
              <input class="border rounded-md h-7" type="text" id="invoiceId" :value="invoiceId"
                @input='$emit("update:invoiceId", $event.target.value)'>
            </div>

            <div class="flex flex-col w-full">
              <label for="invoicePlace">Miejsce wystawienia</label>
              <input class="border rounded-md h-7" type="text" id="invoicePlace" :value="invoicePlace"
                @input='$emit("update:invoicePlace", $event.target.value)'>
            </div>

            <div class="flex flex-col w-full">
              <label for="invoiceDateOf">Data wystawienia</label>
              <input class="border rounded-md h-7 px-2" type="date" id="invoiceDateOf" :value="invoiceDateOf"
                @input='$emit("update:invoiceDateOf", $event.target.value), $emit("enteredDate")'>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col mb-6">
        <h3 class="mb-3 text-base">Dane Nabywcy</h3>

        <div class="ml-4">
          <div class="flex flex-row gap-8 mb-2 w-full max-w-[606px]">
            <div class="flex flex-col w-full">
              <label for="payerId">Nazwa</label>
              <input class="border rounded-md h-7" type="text" id="payerId" :value="payerId"
                @input='$emit("update:payerId", $event.target.value)'>
            </div>
            <div class="flex flex-col w-32">
              <label for="nip">NIP</label>
              <input class="border rounded-md h-7" type="text" id="nip" :value="nip"
                @input='$emit("update:nip", $event.target.value)'>
            </div>
          </div>

          <div class="flex flex-row gap-8 w-full max-w-[606px]">
            <div class="flex flex-col w-52 mb-2">
              <label for="street">Ulica</label>
              <input class="border rounded-md h-7" type="text" id="street" :value="street"
                @input='$emit("update:street", $event.target.value)'>
            </div>
            <div class="flex flex-col w-32">
              <label for="postal">Kod pocztowy</label>
              <input class="border rounded-md h-7" type="text" id="postal" :value="postal"
                @input='$emit("update:postal", $event.target.value)'>
            </div>
            <div class="flex flex-col w-52">
              <label for="city">Miasto</label>
              <input class="border rounded-md h-7" type="text" id="city" :value="city"
                @input='$emit("update:city", $event.target.value)'>
            </div>

          </div>
        </div>
      </div>

      <div class="flex flex-col mb-6 ">
        <h3 class="mb-3 text-base">Płatność</h3>

        <div class="ml-4 w-full max-w-[606px]">
          <div class="flex flex-row gap-8">
            <div class="flex flex-col w-full">
              <label for="method">Metoda</label>
              <select class="border rounded-md h-7 px-1" id="method" :value="method"
                @input='$emit("update:method", $event.target.value)'>
                <option value="Przelew">Przelew</option>
                <option value="Gotówka">Gotówka</option>
              </select>
            </div>

            <div class="flex flex-col w-full">
              <label for="deadline">Termin</label>
              <select class="border rounded-md h-7 px-1" id="deadline" :value="deadline"
                @input='$emit("update:deadline", $event.target.value)'>
                <option value="7 dni">7 dni</option>
                <option value="14 dni">14 dni</option>
                <option value="30 dni">30 dni</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col mb-4 ">
        <h3 class="mb-3 text-base">Przedmiot sprzedaży</h3>

        <div class="h-[290px] overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-500 scrollbar-thumb-rounded-lg">
          <div v-for="(item, index) in formData" :key="index"
            class="relative mx-2 mb-2 border-2 border-dashed rounded-xl px-2 pt-2 pb-4 w-[623px]" :id="index">

            <div v-if="index === (formData.length - 1)" @click="$emit('remove')"
              class="absolute top-2 right-2 cursor-pointer hover:brightness-125 hover:scale-110">
              <div class="bg-red-800 rounded-full w-4 h-4 flex justify-center items-center">
                <i class="fa-solid fa-minus text-sm text-white"></i>
              </div>
            </div>

            <div class="flex flex-col w-full max-w-[646px]">
              <div class="flex items-end gap-8 mb-2 w-full max-w-[606px]">
                <div class="flex flex-col w-full">
                  <label :for="'itemId' + index">Nazwa towaru / <br> Zakres wykonania usług</label>
                  <input class="border rounded-md h-7" type="text" :id="'itemId' + index" :value="item.itemId"
                    @input='item.itemId = $event.target.value'>
                </div>

                <div class="flex flex-col w-16">
                  <label :for="'itemMeasurement' + index">Miara</label>
                  <input class="border rounded-md h-7" type="text" :id="'itemMeasurement' + index"
                    :value="item.itemMeasurement" @input='item.itemMeasurement = $event.target.value'>
                </div>

                <div class="flex flex-col w-16">
                  <label :for="'itemQuantity' + index">Ilość</label>
                  <input class="border rounded-md h-7" type="number" :id="'itemQuantity' + index"
                    :value="item.itemQuantity" @input='item.itemQuantity = $event.target.value'>
                </div>
              </div>

              <div class="flex gap-8 w-full max-w-[606px]">
                <div class="flex flex-col w-full">
                  <label :for="'itemNet' + index">Wartość Netto</label>
                  <input class="border rounded-md h-7" type="number" :id="'itemNet' + index" :value="item.itemNet"
                    @input='item.itemNet = $event.target.value'>
                </div>

                <div class="flex flex-col w-16">
                  <label :for="'itemTaxPercentage' + index">Stawka %</label>
                  <input class="border rounded-md h-7" type="number" :id="'itemTaxPercentage' + index" :value="item.itemTaxPercentage"
                    @input='item.itemTaxPercentage = $event.target.value'>
                </div>

                <div class="flex flex-col w-24">
                  <label :for="'itemTax' + index">Kwota podatku</label>
                  <input class="border rounded-md h-7" type="number" :id="'itemTax' + index" :value="item.itemTax"
                      @input='item.itemTax = $event.target.value'>
                </div>

                <div class="flex flex-col w-full">
                  <label :for="'itemGross' + index">Wartość Brutto</label>
                  <input class="border rounded-md h-7" type="number" :id="'itemGross' + index" :value="item.itemGross"
                        @input='item.itemGross = $event.target.value'>
                </div>
              </div>

            </div>
          </div>

          <div class="flex font-semibold justify-center cursor-pointer mt-5 mb-1">
            <div @click="$emit('addMore')"
              class="flex items-center transition duration-300 hover:brightness-125 hover:scale-105">
              <div class="flex justify-center items-center bg-blue-500 rounded-full w-8 h-8"><i
                  class="fa-solid fa-plus text-xl" style="color: #ffffff;"></i></div>
              <p class="ml-2 text-blue-500 text-base">Dodaj pozycję</p>
            </div>
          </div>
        </div>

      </div>

    </form>
  </div>

  <div class="flex justify-end mx-6">
    <button
      class="border text-lg px-4 py-2 rounded-lg mr-6 transition duration-200 hover:bg-blue-500 hover:text-white">Zapisz</button>
    <button
      class="border text-lg px-4 py-2 rounded-lg transition duration-200 hover:bg-blue-500 hover:text-white">Drukuj</button>
  </div>
</template>

<script setup>

defineEmits(['enteredDate', 'remove', 'addMore', 'update:invoiceId', 'update:invoicePlace', 'update:invoiceDateOf',
  'update:payerId', 'update:nip', 'update:street', 'update:postal', 'update:city', 'update:method', 'update:deadline',
  'update:formData'
])

const props = defineProps({
  invoiceId: String,
  invoiceDateOf: String,
  invoicePlace: String,
  payerId: String,
  nip: String,
  street: String,
  postal: String,
  city: String,
  method: String,
  deadline: String,
  formData: Object,
  itemId: String,

})
</script>
