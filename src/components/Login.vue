<template>
  <div>
    <IntroToolBar v-bind:showBack="showBack"></IntroToolBar>
    <v-card :loading="loading" height="100%" flat>
      <img width="100%" src="../assets/countries.jpg"/>
      <div class="text-center">
        <v-snackbar v-model="snackbar" :multi-line="multiLine">
          {{ snackbar_text }}
          <v-btn color="red" text @click="snackbar = false">
            Close
          </v-btn>
        </v-snackbar>
      </div>
      
      <v-form ref="form" class="mt-4" width="100%" v-model="valid" @submit.prevent="login_user">
        <v-row align="center">
          <v-col class="col-10 offset-1" max-width="100%">
            <v-card-text text class="title">Sign-in </v-card-text>
            <v-text-field v-model="email" label="E-mail" required/>
            <v-text-field v-model="password" label="Password" type="password" required/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="mx-12" offset="8">
            <v-btn color="primary" outlined lowercase--text Large :loading="loading" type="submit">
              Login
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </v-card>
    <Footer></Footer>
  </div>
</template>


<script>
import axios from 'axios'
import router from '@/router'
import IntroToolBar from '@/components/shared/IntroToolBar'
import Footer from '@/components/shared/Footer.vue'

  export default {
    name: "Login",
    components:{IntroToolBar, Footer},
    data: () => ({
      loading: false,
      showBack: true,
      valid: false,
      password: '',
      email: '',
      multiLine: true,
      snackbar: false,
      snackbar_text: '',
   }),

    methods: {
      login_user(e){
        let ct = this;
        e.preventDefault();
        ct.loading = true
        if(ct.password == '' || ct.email == ''){
          ct.snackbar=true
          ct.snackbar_text = "Please enter an email and password"
          ct.loading = false;
        }
        else{
          const url = `${process.env.ROOT_API}/api/v1/user/login`
          axios.post(url, {
            email: this.email,
            password: this.password
            },
            { headers: { 'Content-Type': 'application/json'}},
            )
          .then(function (response) {
            ct.snackbar=true
            ct.loading = false
            ct.snackbar_text = response.data.message
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('countryId', response.data.country_id);
            localStorage.setItem('countryName', response.data.country_name);
            localStorage.setItem('FlagUrl', response.data.country_flag);
            localStorage.setItem('shopOwner', response.data.shopOwner);
            router.push("/home");
            })
          .catch(function (error) {
            ct.snackbar=true
            ct.loading = false
            ct.snackbar_text = error.response.data.error
          });
        }
      }
    },
  }
</script>


<style>
body{
  text-decoration: none;
  width: 100%;
  height: 100%;
}
</style>
