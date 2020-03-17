<template>
<div>
    <IntroToolBar v-bind:showBack="showBack"></IntroToolBar>
  <v-card
    :loading="loading"
    height="100%"
    flat
  >
    <img
      width="100%"
       src="../assets/countries.jpg"
    />    
    <v-card-title><v-icon>fa fa-globe</v-icon> Countalk Signin</v-card-title>
    <div class="grey--text ml-4">#1 Global Country Chat</div>
        <div class="text-center">
          <v-snackbar
            v-model="snackbar"
            :multi-line="multiLine"
          >
            {{ snackbar_text }}
            <v-btn
              color="red"
              text
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </v-snackbar>
        </div>
        <v-row align="center">
            <v-col class="col-10 offset-1" max-width="100%">
            <v-form
            ref="form"
            width="100%"
            v-model="valid"
            @submit="login_user"
            >
            
            <v-text-field
                v-model="email"
                label="E-mail"
                required
            ></v-text-field>

            <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
            ></v-text-field>
            <v-row>
              <v-col cols="mx-12" offset="8">
              <v-btn
                  color="primary"
                  type="submit"
              >
                  Login
              </v-btn>
              </v-col>
            </v-row>
            </v-form>
            </v-col>
        </v-row>
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
import router from '../router'
import IntroToolBar from '@/components/shared/IntroToolBar'
import Footer from '@/components/shared/Footer.vue'

  export default {
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
        }
        else{
          const url = 'http://127.0.0.1:5000/api/v1/user/login'
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
            localStorage.setItem('country', response.data.country);
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
