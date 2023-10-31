<template>
  <div
    v-if="profileMenu"
    class="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center backdrop-blur-sm"
  >
    <div
      class="h-5/6 max-h-[500px] w-5/6 max-w-[800px] rounded-2xl bg-white shadow-2xl outline outline-2 outline-grey-mid"
    >
      <div class="flex justify-end">
        <div
          @click="$emit('showProfileMenu'), $emit('removeProfile')"
          class="m-6 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-red-accent transition hover:scale-105 hover:brightness-110"
        >
          <i class="fa-solid fa-xmark text-xl text-white"></i>
        </div>
      </div>

      <div class="flex w-full justify-center">
        <form>
          <div class="flex flex-col">
            <h2 class="mb-6 text-xl font-semibold">Profil nabywcy</h2>

            <div class="ml-4">
              <div class="flex w-[45px] flex-col">
                <label for="profileShort">Skrót</label>
                <input
                  class="h-7 rounded-md border px-2"
                  type="text"
                  id="profileShort"
                  v-model="
                    profileStorage[profileStorage.length - 1].profileShort
                  "
                />
              </div>
              <div class="mb-2 flex w-full max-w-[606px] flex-row gap-8">
                <div class="flex w-full flex-col">
                  <label for="profileName">Nazwa</label>
                  <input
                    class="h-7 rounded-md border px-2"
                    type="text"
                    id="profileName"
                    v-model="
                      profileStorage[profileStorage.length - 1].profileName
                    "
                  />
                </div>
                <div class="flex w-32 flex-col">
                  <label for="profileNip">NIP</label>
                  <input
                    class="h-7 rounded-md border px-2"
                    type="text"
                    id="profileNip"
                    v-model="
                      profileStorage[profileStorage.length - 1].profileNip
                    "
                  />
                </div>
              </div>

              <div class="flex w-full max-w-[606px] flex-row gap-8">
                <div class="mb-2 flex w-52 flex-col">
                  <label for="profileStreet">Ulica</label>
                  <input
                    class="h-7 rounded-md border px-2"
                    type="text"
                    id="profileStreet"
                    v-model="
                      profileStorage[profileStorage.length - 1].profileStreet
                    "
                  />
                </div>
                <div class="mb-2 flex w-32 flex-col">
                  <label for="profilePostal">Kod pocztowy</label>
                  <input
                    class="h-7 rounded-md border px-2"
                    type="text"
                    id="profilePostal"
                    v-model="
                      profileStorage[profileStorage.length - 1].profilePostal
                    "
                  />
                </div>
                <div class="mb-2 flex w-52 flex-col">
                  <label for="profileCity">Miasto</label>
                  <input
                    class="h-7 rounded-md border px-2"
                    type="text"
                    id="profileCity"
                    v-model="
                      profileStorage[profileStorage.length - 1].profileCity
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="flex w-full justify-end px-7">
        <button
          @click="$emit('showProfileMenu'), $emit('saveProfile')"
          class="h-12 w-36 rounded-xl border bg-blue-500 text-lg text-white transition hover:scale-105"
        >
          Zapisz dane
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(["showProfileMenu", "removeProfile", "newProfile", "saveProfile"]);

const props = defineProps({
  profileMenu: Boolean,
  profileStorage: Object,
});
</script>
