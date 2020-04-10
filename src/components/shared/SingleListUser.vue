<template>
    <div>
        <v-card class="mx-auto whole-card my-2" flat>
            <div class="post-header">
                <v-avatar color="purple lighten-5" size="48">
                    <span class="white--text headline"><v-icon>fa fa-user</v-icon></span>
                </v-avatar> &nbsp;
                <strong>{{user.name}}</strong>
                <v-btn class="mx-6" icon @click="showProfile = !showProfile">
                    <v-icon>{{ showProfile ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
            </div>
            <div v-show="showUserProfile">
                <v-card flat class="mx-auto" max-width="100%">
                    <img v-if="user.profile_img" :src="user.profile_img" class="account-image"/>
                    <img v-else src="@/assets/idea.svg" class="account-image"/>
                    <v-card-title>{{user.name}}</v-card-title>
                    <v-card-subtitle class="pb-0">About:</v-card-subtitle>
                    <v-card-text class="text--primary">
                        <div>{{user.about}}</div>
                    </v-card-text>
                    <v-divider/>
                </v-card>
            </div>
        </v-card>
    </div>
</template>

<script>
export default {
    props:["user"],
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
    .post-header{
        width: 100%;
        display: inline-block;
        overflow: hidden;
    }
    .whole-card{
        width:98%;
        overflow: hidden;
    }
    .account-image{
        width: 100%;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        display: block;
    }
</style>
