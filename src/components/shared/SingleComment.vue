<template>
<div>
  <v-divider></v-divider>
  <v-list-item  @click="()=>{}"> 
    <v-list-item-avatar>
      <v-avatar v-if='item.user_image'>
        <v-img :src="item.user_image"></v-img>
    </v-avatar>
    <v-avatar size="54" v-else>
        <v-icon dark color="grey lighten-2" size="54">mdi-account-circle</v-icon>
    </v-avatar>  
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title v-html='item.user_name?item.user_name:"Anonymous"'></v-list-item-title>
      <v-list-item-content v-html="item.message"></v-list-item-content>
    </v-list-item-content>
  </v-list-item> 
</div>
</template>

<script>
export default {
    name: 'SinglePost',
    props:["item", "index"]
}
</script>
