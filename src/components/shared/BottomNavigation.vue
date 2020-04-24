<template>
  <v-bottom-navigation flat width="100%" max-width="100%" :value="activeBtn" grow color="grey" fixed>

    <v-btn color="primary" @click="open_page('/home')">
      <span class="d-none d-md-flex d-lg-none">Home</span>
      <v-icon color="white darken 4" size="32">mdi-timeline-outline</v-icon>
    </v-btn>

    <v-btn color="primary"  @click="open_page('/post')">
      <span class="d-none d-md-flex d-lg-none">Post</span>
      <v-icon color="white" size="32">mdi-send-circle-outline</v-icon>
    </v-btn>

    <v-btn color="primary" @click="open_page('/account')">
      <span class="d-none d-md-flex d-lg-none">Account</span>
      <v-icon color="white" size="32">mdi-account-outline</v-icon>
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
