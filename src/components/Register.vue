<template>
<div>
    <IntroToolBar v-bind:showBack="showBack"></IntroToolBar>
    <v-card flat 
    :loading="loading">
        <img width="100%" src="../assets/countries.jpg"/>    
        <v-card-title>
            <v-icon>
                fa fa-globe
            </v-icon> 
            Countalk Signup
        </v-card-title>
        <div class="grey--text ml-4">
            #1 Global Country Chat
        </div>
        <div class="text-center">
            <v-snackbar v-model="snackbar" :multi-line="multiLine">
                {{ snackbar_text }}
            <v-btn color="red" text @click="prevent.snackbar = false">
                Close
            </v-btn>
          </v-snackbar>
        </div>
        <v-row align="center">
            <v-col class="col-10 offset-1" max-width="100%">
                <v-form ref="form" width="100%" v-model="valid" @submit="register_user">
                    <v-select v-model="select" :items="countries" :rules="[v => !!v || 'Country is required']" label="Select Your Country" required></v-select>
                    <v-text-field v-model="name" :rules="nameRules" label="Name" required></v-text-field>
                    <v-text-field v-model="email" label="Email" :rules="emailRules" required></v-text-field>
                    <v-text-field v-model="password" :rules="passwordRules" label="Password" type="password" required></v-text-field>
                    <v-text-field v-model="confirm_password" label="Confirm Password" type="password" required></v-text-field>
                    <v-row>
                        <v-col cols="mx-12" offset="8">
                        <v-btn color="success" type="submit">
                            Signup
                        </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
        </v-row>
    </v-card>
        <br/><br/><br/><br/><br/>
        <Footer></Footer>
</div>
</template>


<script>
import axios from 'axios'
import router from '../router'
import IntroToolBar from '@/components/shared/IntroToolBar'
import Footer from '@/components/shared/Footer.vue'

  export default {
    components:{Footer, IntroToolBar},
    data: () => ({
        loading: false,
        showBack: true,
        valid: true,
        name:'',
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length > 3) || 'Name must be greater than 3 characters',
        ],
        password: '',
        passwordRules: [
            v => !!v || 'Password is required',
            v => (v && v.length > 3) || 'Password must be greater than 3 characters',
        ],
        confirm_password: '',
        email: '',
        select: '',
        countries: [
        'Uganda',
        'Item 2',
        'Item 3',
        'Item 4',
        ],
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        multiLine: true,
        snackbar: false,
        snackbar_text: '',
   }),

    methods: {
      register_user(){
        let ct = this;
        ct.loading = true
        if(ct.name == '' || ct.select =='' || ct.email == '' || ct.password == '' ){
            ct.snackbar=true
            ct.snackbar_text = "Fill in all the details."
        }
        if(ct.password != ct.confirm_password){
            ct.snackbar=true
            ct.snackbar_text = "Your passwords are not matching."  
        }
        else{
            const url = 'http://127.0.0.1:5000/api/v1/user/register'
            axios.post(url, {   
                country: ct.select,
                name: ct.name,
                email: ct.email,
                password: ct.password
            },
            { headers: { 'Content-Type': 'application/json'}},
            )
            .then(function (response) {
            ct.loading = false
            ct.snackbar=true
            ct.snackbar_text = response.data.message
            router.push("/login");
            })
            .catch(function (error) {
            ct.loading=false
            ct.snackbar=true
            ct.snackbar_text = error.response.data.error
            });
        }
      }
    },
  }
</script>


<style>
  body{
    width: 100%;
  }
</style>
