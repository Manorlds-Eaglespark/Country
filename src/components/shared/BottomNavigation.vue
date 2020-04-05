<template>
  <v-bottom-navigation :value="activeBtn" grow color="teal" fixed>
    
      <v-btn @click="open_page('/home')">
        <span class="d-none d-md-flex d-lg-none">Home</span>
        <v-icon>mdi-timeline</v-icon>
      </v-btn>

    <v-btn  @click="open_page('/newPost')">
      <span class="d-none d-md-flex d-lg-none">Post</span>
      <v-icon>fa fa-plus</v-icon>
    </v-btn>

    <v-btn @click="open_page('/search')">
      <span class="d-none d-md-flex d-lg-none">search</span>
      <v-icon>fa fa-search</v-icon>
    </v-btn>

        <v-btn @click="open_page('/ads')">
      <span class="d-none d-md-flex d-lg-none">Shop</span>
      <v-icon>fa fa-shopping-cart</v-icon>
    </v-btn>

    <v-btn @click="open_page('/account')">
      <span class="d-none d-md-flex d-lg-none">Account</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>


<script>
import router from '@/router'
  export default {
    data () {
      return {
        activeBtn: 1,
      }
    },
    methods:{
      open_page: function (go_to_link) {
        router.push(go_to_link)
      }
    }
  }
</script>
