<template>
  <div class="mx-6 text-sm">
    <form>
      <div class="mb-5 flex flex-col">
        <h3 class="mb-3 text-base">Dane faktury</h3>

        <div class="ml-4">
          <div class="flex w-full max-w-[606px] flex-col">
            <div class="mb-1 flex flex-row gap-8">
              <div class="mb-2 flex w-[130px] flex-col">
                <label for="invoiceId">Nr faktury</label>
                <input
                  class="h-7 rounded-md border pl-2"
                  type="text"
                  id="invoiceId"
                  :value="invoiceId"
                  @input="$emit('update:invoiceId', $event.target.value)"
                />
              </div>

              <div class="flex w-full flex-col">
                <label for="invoicePlace">Miejsce wystawienia</label>
                <input
                  class="h-7 rounded-md border pl-2"
                  type="text"
                  id="invoicePlace"
                  :value="invoicePlace"
                  @input="$emit('update:invoicePlace', $event.target.value)"
                />
              </div>
            </div>

            <div class="flex gap-8">
              <div class="flex w-full flex-col">
                <label for="invoiceDateOf"
                  >Data wykonania usługi (opcjonalnie)</label
                >
                <input
                  class="h-7 rounded-md border px-2"
                  type="date"
                  id="invoiceDateOf"
                  :value="invoiceDateOfService"
                  @input="
                    $emit('update:invoiceDateOfService', $event.target.value),
                      $emit('enteredServiceDate')
                  "
                />
              </div>

              <div class="flex w-full flex-col">
                <label for="invoiceDateOf">Data wystawienia</label>
                <input
                  class="h-7 rounded-md border px-2"
                  type="date"
                  id="invoiceDateOf"
                  :value="invoiceDateOf"
                  @input="
                    $emit('update:invoiceDateOf', $event.target.value),
                      $emit('enteredDate')
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-5 flex flex-col">
        <h3 class="mb-3 text-base">Dane Nabywcy</h3>

        <div class="ml-4">
          <div class="mb-2 flex w-full max-w-[606px] flex-row gap-8">
            <div class="flex w-full flex-col">
              <label for="payerId">Nazwa</label>
              <input
                class="h-7 rounded-md border pl-2"
                type="text"
                id="payerId"
                :value="payerId"
                @input="$emit('update:payerId', $event.target.value)"
              />
            </div>
            <div class="flex w-32 flex-col">
              <label for="nip">NIP</label>
              <input
                class="h-7 rounded-md border pl-2"
                type="text"
                id="nip"
                :value="nip"
                @input="$emit('update:nip', $event.target.value)"
              />
            </div>
          </div>

          <div class="flex w-full max-w-[606px] flex-row gap-8">
            <div class="mb-2 flex w-52 flex-col">
              <label for="street">Ulica</label>
              <input
                class="h-7 rounded-md border pl-2"
                type="text"
                id="street"
                :value="street"
                @input="$emit('update:street', $event.target.value)"
              />
            </div>
            <div class="flex w-32 flex-col">
              <label for="postal">Kod pocztowy</label>
              <input
                class="h-7 rounded-md border pl-2"
                type="text"
                id="postal"
                :value="postal"
                @input="$emit('update:postal', $event.target.value)"
              />
            </div>
            <div class="flex w-52 flex-col">
              <label for="city">Miasto</label>
              <input
                class="h-7 rounded-md border pl-2"
                type="text"
                id="city"
                :value="city"
                @input="$emit('update:city', $event.target.value)"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="mb-5 flex flex-col">
        <h3 class="mb-3 text-base">Płatność</h3>

        <div class="ml-4 w-full max-w-[606px]">
          <div class="flex flex-row gap-8">
            <div class="flex w-full flex-col">
              <label for="method">Metoda</label>
              <select
                class="h-7 rounded-md border px-1"
                id="method"
                :value="method"
                @input="$emit('update:method', $event.target.value)"
              >
                <option value="Przelew">Przelew</option>
                <option value="Gotówka">Gotówka</option>
              </select>
            </div>

            <div class="flex w-full flex-col">
              <label for="deadline">Termin</label>
              <select
                class="h-7 rounded-md border px-1"
                id="deadline"
                :value="deadline"
                @input="$emit('update:deadline', $event.target.value)"
              >
                <option value="0 dni">0 dni</option>
                <option value="7 dni">7 dni</option>
                <option value="14 dni">14 dni</option>
                <option value="30 dni">30 dni</option>
              </select>
            </div>

            <div class="flex w-52 flex-col">
              <label for="city">Waluta</label>
              <input
                class="h-7 rounded-md border pl-2"
                type="text"
                id="currency"
                :value="currency"
                @input="$emit('update:currency', $event.target.value)"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="mb-4 flex flex-col">
        <h3 class="mb-3 text-base">Przedmiot sprzedaży</h3>

        <div
          class="h-[240px] overflow-y-scroll overflow-x-hidden outline outline-2 outline-grey-light rounded-md py-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-thumb-rounded-lg"
        >
          <div
            v-for="(item, index) in formData"
            :key="index"
            class="relative mx-2 mb-2 w-[623px] rounded-xl border-2 border-dashed px-2 pb-4 pt-2"
            :id="index"
          >
            <div
              v-if="index === formData.length - 1"
              @click="
                $emit('remove'),
                  $emit('calculateTotalTax'),
                  $emit('calculateTotalSum')
              "
              class="absolute right-2 top-2 cursor-pointer hover:scale-110 hover:brightness-125"
            >
              <div
                class="flex h-4 w-4 items-center justify-center rounded-full bg-red-accent"
              >
                <i class="fa-solid fa-minus text-sm text-white"></i>
              </div>
            </div>

            <div class="flex w-full max-w-[646px] flex-col">
              <div class="mb-2 flex w-full max-w-[606px] items-end gap-8">
                <div class="flex w-full flex-col">
                  <label :for="'itemId' + index"
                    >Nazwa towaru / <br />
                    Zakres wykonania usług</label
                  >
                  <input
                    class="h-7 rounded-md border pl-2"
                    type="text"
                    :id="'itemId' + index"
                    :value="item.itemId"
                    @input="item.itemId = $event.target.value"
                  />
                </div>

                <div class="flex w-16 flex-col">
                  <label :for="'itemMeasurement' + index">Miara</label>
                  <input
                    class="h-7 rounded-md border pl-2"
                    type="text"
                    :id="'itemMeasurement' + index"
                    :value="item.itemMeasurement"
                    @input="item.itemMeasurement = $event.target.value"
                  />
                </div>

                <div class="flex w-16 flex-col">
                  <label :for="'itemQuantity' + index">Ilość</label>
                  <input
                    class="h-7 rounded-md border pl-2"
                    type="number"
                    :id="'itemQuantity' + index"
                    :value="item.itemQuantity"
                    @input="item.itemQuantity = $event.target.value"
                  />
                </div>
              </div>

              <div class="flex w-full max-w-[606px] gap-8">
                <div class="flex w-full flex-col">
                  <label :for="'itemNet' + index">Wartość Netto</label>
                  <input
                    class="h-7 rounded-md border pl-2"
                    type="number"
                    :id="'itemNet' + index"
                    :value="item.itemNet"
                    @input="item.itemNet = $event.target.value"
                  />
                </div>

                <div class="flex w-16 flex-col">
                  <label :for="'itemTaxPercentage' + index">Stawka %</label>
                  <input
                    class="h-7 rounded-md border pl-2"
                    type="number"
                    :id="'itemTaxPercentage' + index"
                    :value="item.itemTaxPercentage"
                    @input="item.itemTaxPercentage = $event.target.value"
                  />
                </div>

                <div class="flex w-24 flex-col">
                  <label :for="'itemTax' + index">Kwota podatku</label>
                  <input
                    class="h-7 rounded-md border pl-2"
                    type="number"
                    :id="'itemTax' + index"
                    :value="item.itemTax"
                    @input="
                      (item.itemTax = $event.target.value),
                        $emit('calculateTotalTax')
                    "
                  />
                </div>

                <div class="flex w-full flex-col">
                  <label :for="'itemGross' + index">Wartość Brutto</label>
                  <input
                    class="h-7 rounded-md border pl-2"
                    type="number"
                    :id="'itemGross' + index"
                    :value="item.itemGross"
                    @input="
                      (item.itemGross = $event.target.value),
                        $emit('calculateTotalSum')
                    "
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="mb-1 mt-5 flex justify-center font-semibold">
            <div
              @click="$emit('addMore')"
              class="mb-2 flex cursor-pointer items-center transition duration-300 hover:scale-105 hover:brightness-125"
            >
              <div
                class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500"
              >
                <i class="fa-solid fa-plus text-xl" style="color: #ffffff"></i>
              </div>
              <p class="ml-2 text-base text-blue-500">Dodaj pozycję</p>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="mr-5 flex justify-end">
      <button
        @click="$emit('exportDoc')"
        class="mr-6 rounded-lg border px-4 py-2 text-lg transition duration-200 hover:bg-blue-500 hover:text-white"
      >
        <i class="fa-solid fa-floppy-disk -translate-x-1"></i>
        Zapisz
      </button>
      <button
        @click="$emit('printDoc')"
        class="rounded-lg border px-4 py-2 text-lg transition duration-200 hover:bg-blue-500 hover:text-white"
      >
        <i class="fa-solid fa-print -translate-x-1"></i>
        Drukuj
      </button>
    </div>
  </div>
</template>

<script setup>
defineEmits([
  "printDoc",
  "exportDoc",
  "enteredServiceDate",
  "enteredDate",
  "calculateTotalTax",
  "calculateTotalSum",
  "remove",
  "addMore",
  "update:invoiceId",
  "update:invoicePlace",
  "update:invoiceDateOf",
  "update:invoiceDateOfService",
  "update:payerId",
  "update:nip",
  "update:street",
  "update:postal",
  "update:city",
  "update:method",
  "update:currency",
  "update:deadline",
  "update:formData",
]);

const props = defineProps({
  invoiceId: String,
  invoiceDateOf: String,
  invoiceDateOfService: String,
  invoicePlace: String,
  payerId: String,
  nip: String,
  street: String,
  postal: String,
  city: String,
  method: String,
  currency: String,
  deadline: String,
  formData: Object,
  itemId: String,
});
</script>
