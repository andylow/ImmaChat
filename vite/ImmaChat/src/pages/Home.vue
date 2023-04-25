<script setup>
import { onBeforeMount, ref } from "vue";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/vue/24/solid";
import { parsePhoneNumber } from "awesome-phonenumber";

import Countries from "../assets/country.json";

const MAX_HISTORY = 10;
const SELF_COUNTRY_API = "http://ip-api.com/json/?fields=countryCode";

const countryCode = ref("MY");
const mobileNo = ref("");

const phoneNumber = ref(null);

onBeforeMount(async () => {
    // Default country
    if (!localStorage.getItem("countryCode")) {
        try {
            const response = await fetch(SELF_COUNTRY_API, {
                method: "GET",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
            });
            const jsonResp = await response.json();
            countryCode.value = jsonResp.countryCode;
        } catch (err) {
            console.log("Unable determine country.", err);
        }
        localStorage.setItem("countryCode", countryCode.value);
    } else {
        readStore();
    }
});

function readStore() {
    countryCode.value = localStorage.getItem("countryCode");
}

function isNumber(evt) {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
        evt.preventDefault();
    } else {
        return true;
    }
}

function parseNumber(evt) {
    const number = evt.target.value.replace(/[^0-9]/g, "");
    mobileNo.value = number;
    phoneNumber.value = parsePhoneNumber(number, { regionCode: "MY" });
}

function clear() {
    readStore();
    mobileNo.value = "";
    phoneNumber.value = null;
}

function chat() {
    const number = phoneNumber.value.number.e164;
    window.open(
        `https://api.whatsapp.com/send?phone=${number.replace("+", "")}`
    );
    saveHistory(number);
}

function saveHistory(number) {
    let historySet = new Set();
    let historyList = localStorage.getItem("history");
    if (historyList) {
        historyList = JSON.parse(historyList);
        historySet = new Set(
            historyList.length == MAX_HISTORY ? historyList.slice(1) : historyList
        );
    }
    historySet.add(number);
    localStorage.setItem("history", JSON.stringify([...historySet]));
}
</script>

<template>
    <div>
        <div class="form-control">
            <div class="input-group lg:input-group-lg font-mono">
                <select
                    class="select lg:select-lg select-bordered"
                    v-model="countryCode"
                >
                    <option
                        v-for="country in Countries"
                        :key="country.alpha2Code"
                        :value="country.alpha2Code"
                    >
                        <span>{{ country.alpha2Code }}&ensp;</span>
                        <span>+{{ country.callingCodes[0] }}</span>
                    </option>
                </select>
                <input
                    type="tel"
                    inputmode="tel"
                    placeholder="Mobile number"
                    class="input input-bordered lg:input-lg"
                    required
                    autofocus
                    v-model="mobileNo"
                    @keypress="isNumber"
                    @keyup="parseNumber"
                />
            </div>
        </div>
        <div class="mt-2 flex flex-row gap-2">
            <button @click="clear" class="btn btn-outline basis-1/3">
                Reset
            </button>
            <button
                @click="chat"
                :disabled="!phoneNumber?.valid"
                class="btn btn-success grow"
            >
                Chat
                <ChatBubbleOvalLeftEllipsisIcon class="w-5 ml-1 mb-1" />
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
