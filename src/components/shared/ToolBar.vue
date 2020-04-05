<template>
  <div class="toolbar-main">
    <v-app-bar color='primary' class="toolbar-main" dense fixed dark>
      <v-app-bar-nav-icon>
      <div>
            <v-btn icon color="primary" @click="openPage('/')" dark>
              <img src="../../assets/logo.png" />
            </v-btn>
          </div>
      </v-app-bar-nav-icon>
      <v-toolbar-title>
          <img class="my-0 mx-2 pt-2" alt="" width="34px" :src="countryFlag"/>
        <span class="my-0 pb-2">{{countryName}}</span>
      </v-toolbar-title>
    </v-app-bar>
    <br/>
    <br/>
  </div>
</template>

<script>
import router from '../../router'
export default {
  data:()=>({
    countryName: '',
    countryFlag: '',

  }),
  created(){
    this.countryName = localStorage.getItem('countryName')
    this.countryFlag = localStorage.getItem('FlagUrl')
  },
  methods:{
    openPage: function (go_to_link) {
      router.push(go_to_link)
    }
  }
}
</script>

<style>
  .toolbar-main{
    width: 100% !important;
    max-width: 100%;
  }
</style>

