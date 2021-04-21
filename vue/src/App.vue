<template>
  <div id="app">
    <h1 class="logo-font">ImmaChat</h1>
    <div v-if="$isMobile()" id="main">
      <p>A quicker way to text using WhatsApp.</p>
      <vue-tel-input-vuetify id="phone" v-model="phone" :required="true" :preferred-countries="['my']" :valid-characters-only="true" v-on:input="onChange"/>
      <button id="submit" :disabled="!submitEnabled" v-on:click="submit">Open WhatsApp</button>
    </div>
    <div id="desktop" v-else>
      Sorry, this web app is only supported Mobile devices.
    </div>
    <div id="version">
      <footer>
        {{ version }}
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      version: 'v1.0',
      submitEnabled: false,
      phone: '',
      phoneModel: {},
    }
  },
  methods: {
    debug: function(phone, model) {
      console.log(this.phone);
      console.log(model);
    },
    onChange: function(phone, model){
      this.phoneModel = model;
      this.submitEnabled = model.isValid;
    },
    submit: function(){
      window.open("https://api.whatsapp.com/send?phone=" + this.phoneModel.number.e164.replace('+',''));
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: auto;
  margin-top: 120px;
}
#desktop{
  color: white;
  font-size: 30pt;
}
#main {
  padding: 10px;
  background-color: #ffffff67;
  border-radius: 10px;
}
#main > *, #phone > *, .vti__selection{
  font-size: 12pt !important;
}
#submit {
  border: #006319 1px solid;
  background-color: #b9ffca83;
  color: #006319;
  padding: 10px;
  margin-top: 10px;
  width: 100%;
}
#submit:disabled {
  border: #ff0000 1px solid;
  background-color: #ffb9b983;
  color: #666666;
}
#version {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 10px;
}
input {
  background-color: rgba(255, 255, 255, 0.411);
  padding: 10px;
}
body {
  background-image: url('assets/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
}
h1 {
  margin: 0;
  color: white;
  text-shadow: 2px 2px #363131;
}
.logo-font {
  font-size: 5.75em;
  font-family: "Qwigley", cursive;
}
</style>
