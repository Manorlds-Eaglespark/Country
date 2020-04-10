<template>
  <v-bottom-navigation :value="activeBtn" grow color="teal" fixed>

    <v-btn @click="open_page('/home')">
      <span class="d-none d-md-flex d-lg-none">Home</span>
      <v-icon size="36">mdi-timeline-outline</v-icon>
    </v-btn>

    <v-btn  @click="open_page('/post')">
      <span class="d-none d-md-flex d-lg-none">Post</span>
      <v-icon size="36">mdi-plus-circle-outline</v-icon>
    </v-btn>

    <v-btn @click="open_page('/shop')">
      <span class="d-none d-md-flex d-lg-none">Shop</span>
      <v-icon size="36">fa fa-opencart</v-icon>
    </v-btn>

    <v-btn @click="open_page('/account')">
      <span class="d-none d-md-flex d-lg-none">Account</span>
      <v-icon size="36">mdi-account-outline</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>


<script>
  import router from '@/router'
  export default {
    data () {
      return {
        activeBtn: 0,
      }
    },
    methods:{
      open_page: function (go_to_link) {
        router.push(go_to_link,() => {});
      }
    }
  }
</script>
