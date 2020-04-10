<template>
<div>
    <v-app-bar dark fixed color="primary">
      <v-btn v-if="showBack" icon @click="openPage('/')">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      
      <v-app-bar-nav-icon><img src="@/assets/logo.png"/></v-app-bar-nav-icon>
      <span class="headline mr-2">Countalk</span>
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
