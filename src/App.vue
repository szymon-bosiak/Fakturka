<template>
  <div class="xl:hidden fixed z-50 flex items-center justify-center text-center text-3xl px-5 font w-screen h-screen bg-grey-mid">
    <p class="bg-white border-2 border-dashed border-grey-dark rounded-lg px-20 py-64">Ta aplikacj jest przeznaczona wyłącznie do użytku na dużych ekranach.</p>
  </div>
  <div class="flex h-screen flex-col bg-background">
    <nav
      class="flex h-16 w-full items-center justify-between bg-accent-1 px-10"
    >
      <div class="flex items-center text-white">
        <img
          class="mr-2 h-10 w-10 invert"
          src="./assets/logo.svg"
          alt="Fakturka's logo"
        />
        <p class="">Fakurka</p>
      </div>
      <i
        @click="viewProfileEdit()"
        class="fa-solid fa-user-pen cursor-pointer text-xl transition hover:scale-110"
        style="color: #ffffff"
      ></i>
    </nav>

    <!-- POP-UPS -->

    <sellersInfoForm
      v-if="editProfile"
      @close="viewProfileEdit()"
      @update-preview="updatePreview()"
    />

    <ProfileCreate
      @show-profile-menu="showProfileMenu()"
      @remove-profile="removeProfile()"
      @save-profile="saveProfile()"
      v-model:profileStorage="profileStorage"
      :profileMenu="profileMenu"
    />

    <ProfileEdit
      @show-profile-edit-menu="showProfileEditMenu()"
      @save-profile="saveProfile()"
      @remove-edit-changes="removeEditChanges()"
      v-model:profileStorage="profileStorage"
      :editIndex="editIndex"
      :profileEditMenu="profileEditMenu"
    />

    <deleteConfirmation :showDeleteConfirmation="showDeleteConfirmation" 
    @delete-selected="deleteSelected"
    @leave-selected="leaveSelected"
    @toggle-show-delete-confirmation="toggleShowDeleteConfirmation()"/>

    <!-- END OF POP-UPS -->

    <div class="grid h-full grid-cols-2 grid-rows-1">
      <div class="w-full min-w-[600px] bg-white">
        <div class="flex justify-center">
          <div class="max-w-[700px]">
            <div class="mx-6 my-4 rounded-full bg-grey-light p-1">
              <div class="ml-1 flex">
                <div
                  class="bg-grey- relative my-1 cursor-pointer rounded-full"
                  @click="showProfileMenu(), newProfile()"
                >
                  <div
                    class="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-grey-dark text-2xl transition duration-300 hover:rotate-90 hover:scale-110"
                  ></div>
                  <i
                    class="fa-solid fa-plus absolute left-[16px] top-[13px] text-4xl font-thin text-grey-dark"
                  ></i>
                </div>

                <div class="flex max-w-[545px] flex-row items-center px-3">
                  <div v-if="profileStorageSaved.length === 0">
                    <p class="text-sm">
                      Kliknij ikonę + aby utworzyć profil nabywcy.
                    </p>
                  </div>
                  <swiper
                    :slides-per-view="5"
                    :space-between="10"
                    class="relative w-[545px]"
                  >
                    <swiperPrevBtn class="absolute left-0 top-[19px] z-10" />
                    <swiperNextBtn class="absolute right-0 top-[19px] z-10" />
                    <swiper-slide
                      v-for="(profile, index) in profileStorageSaved"
                      :key="'p' + index"
                      :id="'p' + index"
                      class="px-4"
                    >
                      <div
                        @click="profileFill(index)"
                        @mouseover="showOptionsIn(index)"
                        @mouseleave="showOptionsOut(index)"
                        class="my-1 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-2 bg-blue-500 text-3xl text-white transition hover:scale-105"
                      >
                        <div class="hidden" :id="'option' + index">
                          <i
                            @click="showProfileEditMenu(index)"
                            class="fa-solid fa-pen-to-square absolute -top-1 left-0 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-grey-dark bg-white text-base text-black transition hover:bg-lime-600 hover:brightness-110"
                          ></i>
                          <i
                            @click="
                              toggleShowDeleteConfirmation(),
                              awaitingDeleteConfirmation = index
                            "
                            class="fa-solid fa-trash-can absolute -top-1 right-0 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-grey-dark bg-white text-base text-black transition hover:bg-red-accent hover:brightness-110"
                          ></i>
                        </div>
                        <p>{{ profile.profileShort }}</p>
                      </div>
                    </swiper-slide>
                  </swiper>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center">
          <div class="w-full max-w-[700px]">
            <InvoiceForm
              v-if="changeView"
              @print-doc="printDoc()"
              @export-doc="exportDoc()"
              @entered-date="formatDate()"
              @entered-service-date="formatServiceDate()"
              @remove="remove()"
              @add-more="addMore()"
              @calculate-total-tax="calculateTotalTax()"
              @calculate-total-sum="calculateTotalSum()"
              v-model:invoiceId="invoiceId"
              v-model:invoicePlace="invoicePlace"
              v-model:invoiceDateOf="invoiceDateOf"
              v-model:invoiceDateOfService="invoiceDateOfService"
              v-model:payerId="payerId"
              v-model:nip="nip"
              v-model:street="street"
              v-model:postal="postal"
              v-model:city="city"
              v-model:method="method"
              v-model:currency="currency"
              v-model:deadline="deadline"
              v-model:formData="formData"
            />
          </div>
        </div>
      </div>

      <div class="flex items-center">
        <div
          class="m-8 flex flex-auto items-center justify-center bg-background"
        >
          <DocumentPreview
            id="element-to-PDF"
            :invoiceId="invoiceId"
            :invoicePlace="invoicePlace"
            :formatedDate="formatedDate"
            :formatedServiceDate="formatedServiceDate"
            :payerId="payerId"
            :nip="nip"
            :street="street"
            :postal="postal"
            :city="city"
            :method="method"
            :currency="currency"
            :deadline="deadline"
            :formData="formData"
            :totalSum="totalSum"
            :totalTax="totalTax"
            :sellerIdStored="sellerIdStored"
            :sellerNipStored="sellerNipStored"
            :sellerStreetStored="sellerStreetStored"
            :sellerPostalStored="sellerPostalStored"
            :sellerCityStored="sellerCityStored"
            :bankStored="bankStored"
            :bankAccountStored="bankAccountStored"
            :phoneStored="phoneStored"
            :websiteStored="websiteStored"
            :emailStored="emailStored"
            :imageSrcStored="imageSrcStored"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import swiperPrevBtn from "./components/customSwiper/swiperPrevBtn.vue";
import swiperNextBtn from "./components/customSwiper/swiperNextBtn.vue";
import ProfileCreate from "./components/popUps/ProfileCreate.vue";
import ProfileEdit from "./components/popUps/ProfileEdit.vue";
import deleteConfirmation from "./components/popUps/deleteConfirmation.vue";
import sellersInfoForm from "./components/popUps/sellersInfoForm.vue";
import InvoiceForm from "./components/InvoiceForm.vue";
import DocumentPreview from "./components/DocumentPreview.vue";
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const changeView = ref(true);
const editProfile = ref(false);
const profileMenu = ref(false);
const profileEditMenu = ref(false);
const showDeleteConfirmation = ref();
const invoiceId = ref();
const invoicePlace = ref();
const invoiceDateOf = ref();
const invoiceDateOfService = ref();
const payerId = ref();
const nip = ref();
const street = ref();
const postal = ref();
const city = ref();
const method = ref();
const currency = ref();
const deadline = ref();
const formData = ref([]);
const profileStorage = ref([]);
const profileStorageSaved = ref([]);
const sellerIdStored = ref();
const sellerNipStored = ref();
const sellerStreetStored = ref();
const sellerPostalStored = ref();
const sellerCityStored = ref();
const bankStored = ref();
const bankAccountStored = ref();
const phoneStored = ref();
const emailStored = ref();
const websiteStored = ref();
const imageSrcStored = ref();

let opt = {
  margin: 0,
  html2canvas: { scale: 7, height: 833, width: 589 },
  jsPDF: { unit: "mm", format: "a4", orientation: "p" },
};

const printDoc = () => {
  html2pdf()
    .set(opt)
    .from(document.getElementById("element-to-PDF"))
    .toPdf()
    .get("pdf")
    .then(function (pdfObj) {
      pdfObj.autoPrint();
      window.open(pdfObj.output("bloburl"), "_blank");
    });
};

const exportDoc = () => {
  console.log(invoiceId.value);
  html2pdf().set(opt).from(document.getElementById("element-to-PDF")).save();
};

if (localStorage.getItem("image") !== null) {
  imageSrcStored.value = localStorage.getItem("image");
}

if (localStorage.getItem("sellerInfo") !== null) {
  let storedValues = JSON.parse(localStorage.getItem("sellerInfo"));
  sellerIdStored.value = storedValues.sellerId._value;
  sellerNipStored.value = storedValues.sellerNip._value;
  sellerStreetStored.value = storedValues.sellerStreet._value;
  sellerPostalStored.value = storedValues.sellerPostal._value;
  sellerCityStored.value = storedValues.sellerCity._value;
  bankStored.value = storedValues.bank._value;
  bankAccountStored.value = storedValues.bankAccount._value;
  phoneStored.value = storedValues.phone._value;
  emailStored.value = storedValues.email._value;
  websiteStored.value = storedValues.website._value;
}

const updatePreview = () => {
  let refreshedValues = JSON.parse(localStorage.getItem("sellerInfo"));
  sellerIdStored.value = refreshedValues.sellerId._value;
  sellerNipStored.value = refreshedValues.sellerNip._value;
  sellerStreetStored.value = refreshedValues.sellerStreet._value;
  sellerPostalStored.value = refreshedValues.sellerPostal._value;
  sellerCityStored.value = refreshedValues.sellerCity._value;
  bankStored.value = refreshedValues.bank._value;
  bankAccountStored.value = refreshedValues.bankAccount._value;
  phoneStored.value = refreshedValues.phone._value;
  emailStored.value = refreshedValues.email._value;
  websiteStored.value = refreshedValues.website._value;
  imageSrcStored.value = localStorage.getItem("image");
};

const remove = () => {
  formData.value.pop();
};
const addMore = () => {
  formData.value.push({});
};

// SAVING PROFILES

const viewProfileEdit = () => {
  editProfile.value = !editProfile.value;
};

const profileFill = (index) => {
  payerId.value = profileStorage.value[index].profileName;
  nip.value = profileStorage.value[index].profileNip;
  street.value = profileStorage.value[index].profileStreet;
  postal.value = profileStorage.value[index].profilePostal;
  city.value = profileStorage.value[index].profileCity;
};

const saveProfile = () => {
  localStorage.setItem("sevedProfiles", JSON.stringify(profileStorage.value));
  profileStorageSaved.value = JSON.parse(localStorage.getItem("sevedProfiles"));
};

const showProfileMenu = () => {
  profileMenu.value = !profileMenu.value;
};

const editIndex = ref();
const showProfileEditMenu = (index) => {
  editIndex.value = index;
  profileEditMenu.value = !profileEditMenu.value;
};

const newProfile = () => {
  profileStorage.value.push({});
};

const removeProfile = () => {
  profileStorage.value.pop();
};

const removeEditChanges = () => {
  profileStorage.value = JSON.parse(localStorage.getItem("sevedProfiles"));
};

const toggleShowDeleteConfirmation = () => {
  showDeleteConfirmation.value = !showDeleteConfirmation.value;
};

const awaitingDeleteConfirmation = ref()
const deleteSelected = () => {
  if (awaitingDeleteConfirmation.value === 0) {
    profileStorageSaved.value.shift();
  } else {
    profileStorageSaved.value.splice(awaitingDeleteConfirmation.value, 1);
  }
  localStorage.setItem(
    "sevedProfiles",
    JSON.stringify(profileStorageSaved.value),
  );
};

const leaveSelected = () => {
  awaitingDeleteConfirmation.value = null
}

if (localStorage.getItem("sevedProfiles") !== null) {
  profileStorage.value = JSON.parse(localStorage.getItem("sevedProfiles"));
  profileStorageSaved.value = JSON.parse(localStorage.getItem("sevedProfiles"));
}

const showOptionsIn = (index) => {
  let element = document.querySelector("#option" + index);
  element.classList.remove("hidden");
};

const showOptionsOut = (index) => {
  let element = document.querySelector("#option" + index);
  element.classList.add("hidden");
};

// FORMATING DATE

const formatedServiceDate = ref();
const formatServiceDate = () => {
  let arr = invoiceDateOfService.value.split("-");
  let rearanged = [arr[2], arr[1], arr[0]].join(".");

  formatedServiceDate.value = rearanged + "r.";
};

const formatedDate = ref();
const formatDate = () => {
  let arr = invoiceDateOf.value.split("-");
  let rearanged = [arr[2], arr[1], arr[0]].join(".");

  formatedDate.value = rearanged + "r.";
};

//CALCULATING SUMS

const totalTax = ref(0);
const calculateTotalTax = () => {
  let sum = 0;
  for (let i = 0; i < formData.value.length; i++) {
    sum += parseFloat(formData.value[i].itemTax);
  }
  totalTax.value = sum;
};

const totalSum = ref(0);
const calculateTotalSum = () => {
  let sum = 0;
  for (let i = 0; i < formData.value.length; i++) {
    sum += parseFloat(formData.value[i].itemGross);
  }
  totalSum.value = sum;
};
</script>
