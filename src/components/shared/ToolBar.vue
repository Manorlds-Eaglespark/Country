<template>
  <div class="mb-4 toolbar-main">
    <v-app-bar dense color='primary' flat class="toolbar-main" fixed dark>
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
      <v-spacer/>
        <v-menu
                left
                bottom
        >
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>

            <v-list>
                <v-list-item @click="logOut">
                    <v-list-item-title> Log out</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
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
    this.countryName = localStorage.getItem('countryName')
    this.countryFlag = localStorage.getItem('FlagUrl')
  },
  methods:{
    openPage: function (go_to_link) {
      router.push(go_to_link)
    },
      logOut(){
          localStorage.setItem('token', '');
          localStorage.setItem('countryId', '');
          localStorage.setItem('countryName', '');
          localStorage.setItem('FlagUrl', '');
          router.push("/login");
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

