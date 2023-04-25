<script setup>
import { computed } from "vue";

const historyList = computed(() => {
    const history = localStorage.getItem("history");
    if (history) {
        try {
            return JSON.parse(history).reverse();
        } catch (err) {
            console.error("Failed to retrieve history");
        }
    }
    return [];
});

function chat(number) {
    window.open(
        `https://api.whatsapp.com/send?phone=${number.replace("+", "")}`
    );
}
</script>

<template>
    <div class="flex flex-col">
        <button
            v-for="history in historyList"
            :key="history"
            class="btn btn-lg my-1 w-60 rounded-2xl shadow-lg"
            @click="chat(history)"
        >
            <p>{{ history }}</p>
        </button>
    </div>
</template>

<style lang="scss" scoped></style>
