<template>
    <div class="fixed flex justify-center items-center top-0 left-0 h-screen w-screen backdrop-blur-sm z-10">
        <div class="bg-pale-blue rounded-2xl w-5/6 h-5/6 max-w-[800px] outline-2 outline-dashed outline-accent-1">
            <div class="flex justify-end">
                <div @click="$emit('close')"
                    class="flex justify-center items-center h-8 w-8 m-6 rounded-full bg-red-800 cursor-pointer transition hover:scale-105 hover:brightness-110">
                    <i class="fa-solid fa-xmark text-xl text-white"></i>
                </div>
            </div>

            <div class="w-full flex justify-center">
                <form>
                    <div class="flex flex-col">
                        <h2 class="mb-6 text-xl font-semibold">Dane podmiotu wystawiającego fakturę</h2>

                        <div class="ml-4">
                            <div class="flex flex-row gap-8 mb-2 w-full max-w-[606px]">
                                <div class="flex flex-col w-full">
                                    <label for="sellerId">Nazwa</label>
                                    <input class="border rounded-md h-7" type="text" id="sellerId">
                                </div>
                                <div class="flex flex-col w-32">
                                    <label for="sellerNip">NIP</label>
                                    <input class="border rounded-md h-7" type="text" id="sellerNip">
                                </div>
                            </div>

                            <div class="flex flex-row gap-8 w-full max-w-[606px]">
                                <div class="flex flex-col w-52 mb-2">
                                    <label for="sellerStreet">Ulica</label>
                                    <input class="border rounded-md h-7" type="text" id="sellerStreet">
                                </div>
                                <div class="flex flex-col w-32 mb-2">
                                    <label for="sellerPostal">Kod pocztowy</label>
                                    <input class="border rounded-md h-7" type="text" id="sellerPostal">
                                </div>
                                <div class="flex flex-col w-52 mb-2">
                                    <label for="sellerCity">Miasto</label>
                                    <input class="border rounded-md h-7" type="text" id="sellerCity">
                                </div>
                            </div>

                            <div class="flex flex-row gap-8 w-full max-w-[606px]">
                                <div class="flex flex-col w-52 mb-2">
                                    <label for="bank">Bank</label>
                                    <input class="border rounded-md h-7" type="text" id="bank">
                                </div>
                                <div class="flex flex-col w-full mb-2">
                                    <label for="bankAccount">Numer konta bankowego</label>
                                    <input class="border rounded-md h-7" type="number" id="bankAccount">
                                </div>
                            </div>

                            <div class="flex flex-row gap-8 w-full max-w-[606px]">
                                <div class="flex flex-col w-52 mb-2">
                                    <label for="phone">Telefon</label>
                                    <input class="border rounded-md h-7" type="tel" id="phone">
                                </div>
                                <div class="flex flex-col w-full mb-2">
                                    <label for="email">Email</label>
                                    <input class="border rounded-md h-7" type="email" id="email">
                                </div>
                            </div>
                        </div>

                        <div class="mt-4">
                            <h3 class="text-lg">Dodatkowe informacje</h3>
                            <div class="mt-2 ml-4 flex gap-6">
                                <div class="flex flex-col w-48 mb-2">
                                    <label for="logo">Logo</label>
                                    <input class="border rounded-md bg-white h-32 flex justify-center items-center mr-2"
                                        type="image" id="logo">
                                </div>

                                <div class="flex flex-col w-52 mb-2">
                                    <label for="website">Strona internetowa</label>
                                    <input class="border rounded-md h-7" type="url" id="website">
                                </div>
                            </div>
                        </div>


                    </div>
                </form>
            </div>
            <div class="flex justify-end mt-36 mx-8">
                <button class="h-12 w-36 border rounded-xl bg-blue-500 text-lg text-white transition hover:scale-105">
                    Zapisz dane
                </button>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

defineEmits(['close'])

const props = defineProps({})

</script>
