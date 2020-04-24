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

      <v-card-text class="mt-2 mx-6 mb-2 pl-0 title">Social</v-card-text>
      <v-row no-gutters class="pt-2 mb-2 mx-6">
        <v-col>
          <v-card class="pa-0" tile elevation="0">
            <v-btn @click.prevent="signInWithGoogle" :loading="googleLoading" class="full-size" text>
              <v-icon color="primary">fa fa-google</v-icon>
            </v-btn>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="pa-0" tile elevation="0">
            <v-btn :loading="facebookLoading" text class="full-size" @click.prevent="signInWithFacebook">
              <v-icon color="primary">fa fa-facebook</v-icon>
            </v-btn>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="pa-0" tile elevation="0">
            <v-spacer/>
          </v-card>
        </v-col>
      </v-row>
      <v-divider class="mx-6"></v-divider>

      <v-form ref="form" class="mt-4 mx-6" width="100%" v-model="valid" @submit.prevent="loginUser">
        <v-row align="center">
          <v-col max-width="100%">
            <v-card-text text class="title mb-4 pl-0">Sign-in </v-card-text>
            <v-text-field v-model="email" outlined label="E-mail" required/>
            <v-text-field v-model="password" outlined label="Password" type="password" required/>
            <v-row no-gutters class="my-2">
              <v-col>
                <v-card class="pa-0 ma-2" tile elevation="0">
                  <v-btn @click.prevent="openPage('/')" large class="full-size text-capitalize fun-border" outlined>
                    Cancel
                  </v-btn>
                </v-card>
              </v-col>
              <v-col>
                <v-card class="pa-0 ma-2" tile elevation="0">
                  <v-btn color="primary" type="submit" class="full-size text-capitalize body-1 fun-border" lowercase--text large
                         :loading="loading">
                    Login
                  </v-btn>
                </v-card>
              </v-col>
            </v-row>
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
    <Footer/>
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
      googleLoading: false,
      facebookLoading: false,
      showBack: true,
      valid: false,
      password: '',
      email: '',
      multiLine: true,
      snackbar: false,
      snackbar_text: '',
   }),

    methods: {
      openPage: function(pageLink){
        router.push(pageLink)
      },
      signInWithGoogle() {
        const ct = this;
        ct.googleLoading = true;
        ct.$gAuth.signIn()
                .then((googleUSer) => {
                  const token = googleUSer.getAuthResponse()
                  ct.sendUserData('Google', token.id_token);
                })
                .catch((error) => {
                  console.log(error);
                  ct.googleLoading = false;
                  ct.snackbar = true;
                  ct.snackbar_text = "Try another Sign-in option"
                });
      },

      sendUserData(provider, token) {
        const cxt = this;
        const url = `${process.env.ROOT_API}/api/v1/user/login/social`
        axios.post(url,
                {
                  token: token,
                  provider: provider
                },
                {headers: {'Content-Type': 'application/json'}},
        )
                .then(function (response) {
                  cxt.googleLoading = false;
                  cxt.facebookLoading = false;
                  cxt.snackbar_text = response.data.message;
                  localStorage.setItem('token', `Bearer ${response.data.token}`);
                  localStorage.setItem('country', JSON.stringify(response.data.country));
                  router.push("/home");
                })
                .catch(function (error) {
                  cxt.googleLoading = false;
                  cxt.facebookLoading = false;
                  cxt.snackbar = true
                  cxt.snackbar_text = error.response.data.error
                });
      },
      loginUser() {
        let ct = this;
        ct.loading = true
        if (ct.password === '' || ct.email === '') {
          ct.snackbar = true
          ct.snackbar_text = "Please enter an email and password";
          ct.loading = false;
        } else {
          const url = `${process.env.ROOT_API}/api/v1/user/login`;
          axios.post(url, {
                    email: this.email,
                    password: this.password
                  },
                  {headers: {'Content-Type': 'application/json'}},
          )
                  .then(function (response) {
                    ct.snackbar = true;
                    ct.loading = false;
                    ct.snackbar_text = response.data.message;
                    localStorage.setItem('token', `Bearer ${response.data.token}`);
                    localStorage.setItem('country', JSON.stringify(response.data.country));
                    router.push("/home");
                  })
                  .catch(function (error) {
                    ct.snackbar = true;
                    ct.loading = false;
                    ct.snackbar_text = error.response.data.error;
                  });
        }
      },
      async signInWithFacebook() {
        const ct = this;
        // ct.facebookLoading = true;
          await this.initFacebook();
          await this.loadFacebookSDK(document, "script", "facebook-jssdk");
           window.FB.login(function (response) {
            if (response.authResponse) {
              const res = response.authResponse;
              axios.get('https://graph.facebook.com/' + res.userID + '?fields=name,picture,email&access_token=' + res.accessToken)
                      .then((reso) => {
                        ct.sendUserData('Facebook', reso.data);
                      })

            } else {
              ct.facebookLoading = false;
              ct.snackbar = true;
              ct.snackbar_text = "User cancelled login or did not fully authorize."
            }
          }, {scope: 'email'});
          return false;
      },

      async initFacebook() {
         window.fbAsyncInit = function() {
           window.FB.init({
            appId: "692796574813532", //You will need to change this
            cookie: true, // This is important, it's not enabled by default
            version: "v13.0"
          });
        };
      },

      async loadFacebookSDK(d, s, id) {
        var js,
                fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      },

    }
}
</script>


<style>
body{
  text-decoration: none;
  width: 100%;
  height: 100%;
}
.full-size {
  width: 100%;
  height: 100%;
}
.fun-border{
  border: 1px solid orange;
}
</style>
