<script setup>
import { HomeIcon, ClipboardDocumentListIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";
import DarkMode from "./components/DarkMode.vue";
import History from "./pages/History.vue";
import Home from "./pages/Home.vue";

const route = ref("home");
</script>

<template>
    <div class="m-auto h-[calc(100vh-64px)] md:w-[700px] flex flex-col">
        <header>
            <DarkMode class="p-2 right-0 absolute" iconClass="w-6 lg:w-8" />
        </header>
        <!-- HERO -->
        <div class="hero basis-1/3">
            <div class="hero-content text-center">
                <div class="max-w-md">
                    <h1 class="text-7xl font-bold font-title">ImmaChat</h1>
                    <p>A quicker way to text using WhatsApp.</p>
                </div>
            </div>
        </div>

        <div class="self-center overflow-auto no-scrollbar">
            <Home v-show="route == 'home'" />
            <History v-show="route == 'history'" />
        </div>

        <!-- NAV BAR -->
        <div class="lg:absolute lg:bottom-0 lg:w-[700px]">
            <div class="btm-nav lg:relative">
                <button
                    @click="route = 'home'"
                    :class="{ active: route === 'home' }"
                >
                    <div class="flex gap-2">
                        <HomeIcon class="h-6" /> <span>Home</span>
                    </div>
                </button>
                <button
                    @click="route = 'history'"
                    :class="{ active: route === 'history' }"
                >
                    <div class="flex gap-2">
                        <ClipboardDocumentListIcon class="h-6" />
                        <span>History</span>
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
