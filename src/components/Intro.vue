<template>
<div>
  <IntroToolBar v-bind:showBack="showBack"></IntroToolBar>
  <v-card
    :loading="loading"
    height="100%"
    flat
  >
    <img
      width="100%"
       src="../assets/countries.jpg"
    />

    <v-card-title><v-icon>fa fa-globe</v-icon> Countalk</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4"> 5 (7.8 Billion)</div>
      </v-row>

      <div class="my-4 subtitle-1">
        #1 • Global Country Chat
      </div>

      <div>Join that conversation in your country. listen, contribute, share and be part of the conversations that shape your future together as a country.
Follow the latest News updates, Entertainment and national updates.</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Join the Conversation</v-card-title>

    <v-card-text>      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-btn class="ma-2 success" @click="openPage('/register')" color="white">Signup and Enjoy</v-btn>
        
    <v-btn class="ma-2" @click="openPage('/login')" color="primary">Login</v-btn>

      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
      outlined
        color="primary"
        text
      >
        FAQs
      </v-btn>
      <v-btn
      outlined
        color="deep-purple lighten-2"
        text
      >
        Share Countalk
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
  <Footer></Footer>
  </div>
</template>



<script>
import router from '../router'
import IntroToolBar from '@/components/shared/IntroToolBar'
import Footer from '@/components/shared/Footer.vue'

  export default {

    components:{IntroToolBar, Footer},
    data: () => ({
      showBack: false,
      loading: false,
      selection: 1,
    }),

    methods: {
      openPage: function(pageLink){
        router.push(pageLink)
      }
    },
  }
</script>

<style>
body{
  text-decoration: none;
  width: 100%;
}
.link-text{
  text-decoration: none;
}
</style>

