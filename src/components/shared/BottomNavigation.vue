<template>
  <v-bottom-navigation :value="activeBtn" grow color="teal" fixed>
    
      <v-btn @click="open_page('/home')">
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>

    <v-btn @click="open_page('/newPost')">
      <span>Post</span>
      <v-icon>mdi-pencil</v-icon>
    </v-btn>

    <v-btn>
      <span>Account</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>



<script>
import router from '../../router'
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