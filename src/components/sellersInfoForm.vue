<template>
  <div
    class="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center backdrop-blur-sm"
  >
    <div
      class="h-5/6 w-5/6 max-w-[800px] rounded-2xl bg-white shadow-2xl outline outline-2 outline-grey-mid"
    >
      <div class="flex justify-end">
        <div
          @click="$emit('close')"
          class="m-6 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-red-accent transition hover:scale-105 hover:brightness-110"
        >
          <i class="fa-solid fa-xmark text-xl text-white"></i>
        </div>
      </div>

      <div class="flex w-full justify-center">
        <form>
          <div class="flex flex-col">
            <h2 class="mb-6 text-xl font-semibold">
              Dane podmiotu wystawiającego fakturę
            </h2>

            <div class="ml-4">
              <div class="mb-2 flex w-full max-w-[606px] flex-row gap-8">
                <div class="flex w-full flex-col">
                  <label for="sellerId">Nazwa</label>
                  <input
                    class="h-7 rounded-md border px-2"
                    type="text"
                    id="sellerId"
                    v-model="sellerId"
                  />
                </div>
                <div class="flex w-32 flex-col">
                  <label for="sellerNip">NIP</label>
                  <input
                    class="h-7 rounded-md border px-2"
                    type="text"
                    id="sellerNip"
                    v-model="sellerNip"
                  />
                </div>
              </div>

              <div class="flex w-full max-w-[606px] flex-row gap-8">
                <div class="mb-2 flex w-52 flex-col">
                  <label for="sellerStreet">Ulica</label>
                  <input
                    class="h-7 rounded-md border px-2"
                    type="text"
                    id="sellerStreet"
                    v-model="sellerStreet"
                  />
                </div>
                <div class="mb-2 flex w-32 flex-col">
                  <label for="sellerPostal">Kod pocztowy</label>
                  <input
                    class="h-7 rounded-md border px-2"
                    type="text"
                    id="sellerPostal"
                    v-model="sellerPostal"
                  />
                </div>
                <div class="mb-2 flex w-52 flex-col">
                  <label for="sellerCity">Miasto</label>
                  <input
                    class="h-7 rounded-md border px-2"
                    type="text"
                    id="sellerCity"
                    v-model="sellerCity"
                  />
                </div>
              </div>

              <div class="flex w-full max-w-[606px] flex-row gap-8">
                <div class="mb-2 flex w-52 flex-col">
                  <label for="bank">Bank</label>
                  <input
                    class="h-7 rounded-md border px-2"
                    type="text"
                    id="bank"
                    v-model="bank"
                  />
                </div>
                <div class="mb-2 flex w-full flex-col">
                  <label for="bankAccount">Numer konta bankowego</label>
                  <input
                    class="h-7 rounded-md border px-2"
                    type="number"
                    id="bankAccount"
                    v-model="bankAccount"
                  />
                </div>
              </div>

              <div class="flex w-full max-w-[606px] flex-row gap-8">
                <div class="mb-2 flex w-52 flex-col">
                  <label for="phone">Telefon</label>
                  <input
                    class="h-7 rounded-md border px-2"
                    type="tel"
                    id="phone"
                    v-model="phone"
                  />
                </div>
                <div class="mb-2 flex w-full flex-col">
                  <label for="email">Email</label>
                  <input
                    class="h-7 rounded-md border px-2"
                    type="email"
                    id="email"
                    v-model="email"
                  />
                </div>
              </div>
            </div>

            <div class="mt-4">
              <h3 class="text-lg">Dodatkowe informacje</h3>
              <div class="ml-4 mt-2 flex gap-6">
                <div class="mb-2 flex w-full flex-col">
                  <label for="logo">Logo</label>
                  <input
                    @change="saveImage($event)"
                    class="mr-2 flex h-8 items-center justify-center rounded-md border bg-white file:h-8 file:cursor-pointer file:rounded-sm file:border-0 file:bg-blue-500 file:text-white file:transition file:hover:bg-blue-400"
                    type="file"
                    id="logo"
                  />
                  <div class="mt-3" :class="{ 'opacity-0': !imageSrc }">
                    <p>Podgląd pliku</p>
                    <div
                      id="imgPreview"
                      class="mt-1 flex h-52 w-52 items-center justify-center rounded-lg border-2 border-dashed border-gray-400 bg-white"
                    >
                      <img :src="imageSrc" />
                    </div>
                  </div>
                </div>

                <div class="mb-2 flex w-52 flex-col">
                  <label for="website">Strona internetowa</label>
                  <input
                    class="h-8 rounded-md border px-2"
                    type="url"
                    id="website"
                    v-model="website"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="flex w-full justify-end px-7">
        <button
          @click="saveSellerInfo(), $emit('updatePreview')"
          class="relative bottom-2 h-12 w-36 rounded-xl border bg-blue-500 text-lg text-white transition hover:scale-105"
        >
          Zapisz dane
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineEmits(["close", "updatePreview"]);

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

let values = {
  sellerId: sellerId,
  sellerNip: sellerNip,
  sellerStreet: sellerStreet,
  sellerPostal: sellerPostal,
  sellerCity: sellerCity,
  bank: bank,
  bankAccount: bankAccount,
  phone: phone,
  email: email,
  website: website,
};

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

const saveSellerInfo = () => {
  localStorage.setItem("sellerInfo", JSON.stringify(values));
};

const imageSrc = ref();

if (localStorage.getItem("image") !== null) {
  imageSrc.value = localStorage.getItem("image");
}

const saveImage = (event) => {
  const image = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(image);

  reader.onload = (event) => {
    localStorage.setItem("image", reader.result);
    imageSrc.value = localStorage.getItem("image");
  };
};
</script>
