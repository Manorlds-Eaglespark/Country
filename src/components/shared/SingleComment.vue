<template>
<div>
  <v-divider></v-divider>
  <v-list-item>
    <v-list-item-avatar>
      <v-avatar v-if='item.user.profile_img'>
        <v-img :src="item.user.profile_img"></v-img>
    </v-avatar>
    <v-avatar size="54" v-else>
        <v-icon dark color="grey lighten-2" size="54">mdi-account-circle</v-icon>
    </v-avatar>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{item.user.name?item.user.name:"Anonymous"}} <v-btn icon @click="showProfile = !showProfile">
            <v-icon>{{ showProfile ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn></v-list-item-title>
      <v-list-item-content v-html="item.message"></v-list-item-content>
    </v-list-item-content>
  </v-list-item>
        <div v-show="showUserProfile">
        <template>
          <v-card flat class="mx-auto" max-width="100%">
            <img v-if="item.user.profile_img" :src="item.user.profile_img" class="mt-4 account-image"/>
            <img v-else src="@/assets/idea.svg" class="mt-4 account-image"/>
            <v-card-title>{{item.user.name}}</v-card-title>
            <v-card-subtitle class="pb-0">About:</v-card-subtitle>
            <v-card-text class="text--primary">
              <span>{{item.user.about}}</span>
            </v-card-text>
            <v-divider/>
          </v-card>
          </template>
      </div>
</div>
</template>

<script>
export default {
    name: 'SinglePost',
    props:["item", "index"],
    data: ()=>({
        showProfile: false,
    }),
    computed:{
          showUserProfile(){
            return this.showProfile;
          },
    },
}
</script>

<style>
.account-image{
  width: 100%;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  display: block;
}
</style>
