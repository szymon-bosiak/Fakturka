<template>
    <div class="bg-background flex flex-auto justify-center ">
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
        </div>
        <!-- <p>w-[794px] h-[1123px] </p> -->
    </div>
</template>

<script setup>
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

</script>