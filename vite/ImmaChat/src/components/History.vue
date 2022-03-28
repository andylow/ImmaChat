<template>
  <div class="phone-list">
    <el-card
      shadow="hover"
      v-for="hist of histories"
      @click="whatsapp(hist)"
    >
      {{ hist }}
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import PhoneNumber from "awesome-phonenumber";

const histories = ref([]);
onMounted(() => {
  if (localStorage.getItem("numbers")) {
    try {
      histories.value = JSON.parse(localStorage.getItem("numbers"));
    } catch (e) {
      console.error("Unable parse JSON", e);
      localStorage.removeItem("numbers");
    }
  }
});

function whatsapp(value) {
  const pn = PhoneNumber(value);
  window.open("https://api.whatsapp.com/send?phone=" + pn.getNumber().replace("+", ""));
}
</script>

<style>
.phone-list {
  display: grid;
  grid-gap: 5px;
  margin: 3rem;
}
</style>
