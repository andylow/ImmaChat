<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { onMounted, ref } from "vue";
import PhoneNumber from "awesome-phonenumber";
import history from "./components/History.vue";
import background from "./components/Background.vue";

const COUNTRY_API =
  "https://restcountries.com/v2/all?fields=name,callingCodes,alpha2Code";
const MYIP_COUNTRY_API = "https://ip2c.org/self";
const SELF_COUNTRY_API = "http://api.ip2c.info/json/";

const phoneNumber = ref(null);
const countryCode = ref("MY");
const countries = ref([
  { name: "Malaysia", alpha2Code: "MY", callingCodes: ["60"] },
]);

onMounted(async () => {
  const countryResp = await fetch(COUNTRY_API);
  countries.value = await countryResp.json();

  try {
    const ipResp = await fetch(MYIP_COUNTRY_API);
    const country = (await ipResp.text()).substr(2, 2);
    const found = countries.value.find((i) => i.alpha2Code == country);
    if (found) {
      countryCode.value = found.alpha2Code;
    }
  } catch (e) {
    console.error(e);
  }
});

function isValidPhone(value) {
  const result = /^\+?[0-9 ]+$/.exec(value);
  return result ? value : null;
}

async function paste() {
  const text = await navigator.clipboard.readText();
  if (isValidPhone(text)) {
    const pn = PhoneNumber(text, countryCode.value);

    if (pn.isValid) {
      phoneNumber.value = pn.getNumber("significant");
    }
  }
}

function open() {
  if (countryCode.value && phoneNumber.value) {
    let pn = new PhoneNumber(phoneNumber.value, countryCode.value);
    if (pn.isValid) {
      whatsapp(pn.getNumber().replace("+", ""));

      if (localStorage.getItem("numbers")) {
        let array = JSON.parse(localStorage.getItem("numbers"));
        if (array instanceof Array) {
          array.push(pn.getNumber("international"));
        } else {
          array = [pn.getNumber("international")];
        }
        const set = new Set(array);
        localStorage.setItem("numbers", JSON.stringify([...set]));
      } else {
        localStorage.setItem(
          "numbers",
          JSON.stringify([pn.getNumber("international")])
        );
      }
    } else {
      alert("Invalid Phone Number");
    }
  } else {
    alert("Invalid Phone Number");
  }
}

function whatsapp(number) {
  window.open("https://api.whatsapp.com/send?phone=" + number.replace("+", ""));
}
</script>

<template>
  <div class="common-layout">
    <background></background>
    <el-container>
      <el-main>
        <el-tabs :stretch="true" tab-position="bottom">
          <el-tab-pane label="Home">
            <div class="header">
              <div class="title">ImmaChat</div>
              <div class="sub-title">A quicker way to text using WhatsApp.</div>
            </div>
            <div class="main">
              <el-select class="country-code" v-model="countryCode" filterable>
                <el-option
                  v-for="c in countries"
                  :label="`+${c.callingCodes[0]} - ${c.alpha2Code}`"
                  :value="c.alpha2Code"
                ></el-option>
              </el-select>
              <el-input
                class="phone-number"
                placeholder="Phone Number"
                v-model="phoneNumber"
                clearable
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
              ></el-input>
            </div>
            <el-row class="btn-row">
              <el-button round style="width: 30%" @click="paste"
                >Paste</el-button
              >
              <el-button type="success" round style="width: 65%" @click="open"
                >Open Whatsapp</el-button
              >
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="History"><history></history></el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
  <!-- <div class="container">
    <div v-if="tab == 'Home'">
      <div class="header">
        <div class="title">ImmaChat</div>
        <div class="sub-title">A quicker way to text using WhatsApp.</div>
      </div>
      <div class="main">
        <el-select class="country-code" v-model="countryCode" filterable>
          <el-option
            v-for="c in countries"
            :label="`+${c.callingCodes[0]} - ${c.alpha2Code}`"
            :value="c.alpha2Code"
          ></el-option>
        </el-select>
        <el-input
          class="phone-number"
          placeholder="Phone Number"
          v-model="phoneNumber"
          clearable
          oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
        ></el-input>
      </div>
      <el-row class="btn-row">
        <el-button round style="width: 30%" @click="paste">Paste</el-button>
        <el-button type="success" round style="width: 65%" @click="open"
          >Open Whatsapp</el-button
        >
      </el-row>
    </div>
    <div class="history" v-if="tab == 'History'">
      <history></history>
    </div>
    <div class="footer">
      <div class="navbar">
        <div
          class="navbar-item"
          :class="[tab == 'Home' ? 'active' : '']"
          @click="navTo('Home')"
        >
          <i class="el-icon-s-home"></i>
          Home
        </div>
        <div
          class="navbar-item"
          :class="[tab == 'History' ? 'active' : '']"
          @click="navTo('History')"
        >
          <i class="el-icon-takeaway-box"></i>
          History
        </div>
      </div>
    </div>
  </div> -->
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Qwigley&family=ZCOOL+XiaoWei&display=swap");

body {
  margin: 0;
  font-family: "ZCOOL XiaoWei", serif;
}

.el-main,
.el-tabs {
  margin: 0;
  padding: 0;
}

.el-tabs__content {
  height: calc(100vh - 50px);
  padding-bottom: env(safe-area-inset-bottom)
}

.el-tabs__item {
  color: #000;
  border: 1px solid rgb(141, 141, 141);
  padding: 0;
}

.el-tabs__item.is-active {
  color: #fff;
  background-color: rgb(55, 63, 173);
}

.header {
  padding-bottom: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: aliceblue;
}

.title {
  font-family: "Qwigley", cursive;
  font-size: 5.5em;
}

.main {
  display: flex;
  justify-content: center;
}
.country-code {
  width: 8rem;
  margin-left: 1rem;
}
.phone-number {
  width: 50%;
  margin-left: 0.5rem;
  margin-right: 1rem;
}
.btn-row {
  width: 100%;
  padding: 1rem;
}
.history {
  width: 100%;
  overflow: auto;
  padding: 10px;
}

@media screen and (min-height: 480px) {
  .header {
    height: 30vh;
  }
}
</style>
