<template>
<div>
    <v-app-bar dark fixed color="primary">
      <v-btn icon @click="openPage('/')">
        <v-icon v-if="showBack">mdi-arrow-left</v-icon>
      </v-btn>
      
      <v-app-bar-nav-icon><img src="@/assets/logo.png" /></v-app-bar-nav-icon>
      <v-toolbar-title>Countalk</v-toolbar-title>
    </v-app-bar>
    <br/> <br/>
    </div>
</template>

<script>
import router from '@/router'
export default {
    props: ["showBack"],
    methods: {
      openPage: (pageLink)=>{
        router.push(pageLink)
      }
    },
}
</script>
