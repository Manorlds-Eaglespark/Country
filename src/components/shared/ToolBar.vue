<template>
  <div class="mb-4 toolbar-main">
    <v-app-bar color='primary' flat class="toolbar-main" fixed dark>
      <v-app-bar-nav-icon>
      <div>
            <v-btn icon color="primary" @click="openPage('/')" dark>
              <img src="@/assets/logo.png" />
            </v-btn>
          </div>
      </v-app-bar-nav-icon>
      <span class="headline mr-2">Countalk</span>
      <v-toolbar-title>
          <img class="my-0 mx-2 pt-2" alt="" width="34px" :src="countryFlag"/>
        <span class="my-0 pb-2 body-1">{{countryName}}</span>
      </v-toolbar-title>
    </v-app-bar>
    <br/>
    <br/>
  </div>
</template>

<script>
import router from '@/router'
export default {
  data:()=>({
    countryName: '',
    countryFlag: '',

  }),
  created(){
    const country = JSON.parse(localStorage.getItem('country'));
    this.countryName = country.name
    this.countryFlag = country.flag;
  },
  methods:{
    openPage: function (go_to_link) {
      router.push(go_to_link)
    },
  }
}
</script>

<style>
  .toolbar-main{
    width: 100% !important;
    max-width: 100%;
  }
</style>

