<template>
<div>
    <v-app-bar dense dark fixed color="primary">
      <v-btn icon @click="openPage('/')">
        <v-icon v-if="showBack">mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Countalk</v-toolbar-title>
    </v-app-bar>
    <br/> <br/>
    </div>
</template>

<script>
import router from '../../router'
export default {
    props: ["showBack"],
    methods: {
      openPage: function(pageLink){
        router.push(pageLink)
      }
    },
}
</script>
