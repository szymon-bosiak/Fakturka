<template>
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

    <sellersInfoForm
      v-if="editProfile"
      @close="viewProfileEdit()"
      @update-preview="updatePreview"
    />

    <div class="grid h-full grid-cols-2 grid-rows-1">
      <div class="w-full min-w-[600px] bg-white">
        <div class="mx-6 my-5 rounded-full bg-grey-mid p-1">
          <div class="flex max-w-[700px] gap-2">
            <div
              @click="showProfileMenu(), newProfile()"
              class="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-grey-dark bg-grey-light text-2xl"
            >
              <i class="fa-solid fa-plus text-3xl font-thin text-grey-dark"></i>
            </div>
            <div
              v-for="(profile, index) in profileStorage"
              :key="'p' + index"
              :id="'p' + index"
            >
              <div
                @click="profileFill(index)"
                @mouseover="showOptions(index)"
                @mouseleave="showOptions(index)"
                class="relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-2 bg-blue-500 text-3xl text-white"
              >
                <div class="hidden" :id="'option' + index">
                  <i
                    class="fa-solid fa-pen-to-square absolute -top-2 left-0 flex h-6 w-6 items-center justify-center rounded-full border border-grey-dark bg-lime-600 text-base text-black"
                  ></i>
                  <i
                    class="fa-solid fa-trash-can absolute -top-2 right-0 flex h-6 w-6 items-center justify-center rounded-full border border-grey-dark bg-red-accent text-base text-black"
                  ></i>
                </div>
                <p>{{ profile.profileShort }}</p>
              </div>
            </div>
          </div>
        </div>
        <ProfileEdit
          @show-profile-menu="showProfileMenu()"
          @remove-profile="removeProfile()"
          @new-profile="newProfile()"
          @save-profile="saveProfile()"
          v-model:profileStorage="profileStorage"
          :profileMenu="profileMenu"
        />

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
import ProfileEdit from "./components/ProfileEdit.vue";
import InvoiceForm from "./components/InvoiceForm.vue";
import DocumentPreview from "./components/DocumentPreview.vue";
import sellersInfoForm from "./components/sellersInfoForm.vue";
import { ref } from "vue";

const changeView = ref(true);
const editProfile = ref(false);
const profileMenu = ref(false);
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
};

const showProfileMenu = () => {
  profileMenu.value = !profileMenu.value;
};

const newProfile = () => {
  profileStorage.value.push({});
};

const removeProfile = () => {
  profileStorage.value.pop();
};

if (localStorage.getItem("sevedProfiles") !== null) {
  profileStorage.value = JSON.parse(localStorage.getItem("sevedProfiles"));
}

const showOptions = (index) => {
  let element = document.querySelector('#option' + index)
  element.classList.toggle("hidden")
}

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
