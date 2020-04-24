<template>
<div>
    <IntroToolBar v-bind:showBack="showBack"></IntroToolBar>
    <v-card flat>
        <img width="100%" src="../assets/countries.jpg"/>

        <div class="text-center">
            <v-snackbar v-model="snackbar" :multi-line="multiLine">
                {{ snackbar_text }}
            <v-btn color="red" text @click="snackbar = false">
                Close
            </v-btn>
          </v-snackbar>
        </div>
        <v-row align="center" class="mx-4">
            <v-col max-width="100%">
                <v-form class="mt-4" ref="form" width="100%" v-model="valid" @submit.prevent="register_user">
                    <v-select outlined v-model="selectCountry" :items="countries" :rules="[v => !!v || 'Country is required']" label="Select Your Country" required></v-select>


                    <v-card-text class="mt-2 mb-2 pl-0 title">Social</v-card-text>
                    <v-row no-gutters class="pt-2 mb-2">
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

                    <v-card-text class="mt-6 mb-2 pl-0 title">Sign up directly using Email</v-card-text>

                    <v-text-field v-model="name" :rules="nameRules" label="Name" required></v-text-field>
                    <v-text-field v-model="email" label="Email" :rules="emailRules" required></v-text-field>
                    <v-text-field v-model="password" :rules="passwordRules" label="Password" type="password" required></v-text-field>
                    <v-text-field v-model="confirm_password" label="Confirm Password" type="password" required></v-text-field>
                    <v-row no-gutters>
                        <v-col>
                            <v-card class="pa-0 ma-2" tile elevation="0">
                                <v-btn @click.prevent="openPage('/')" large class="full-size text-capitalize" outlined>
                                    Cancel
                                </v-btn>
                            </v-card>
                        </v-col>
                        <v-col>
                            <v-card class="pa-0 ma-2" tile elevation="0">
                                <v-btn color="success" type="submit" class="full-size body-1 text-capitalize body-1" lowercase--text large
                                       :loading="emailLoading">
                                    Finish
                                </v-btn>
                            </v-card>
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
import axios from 'axios';
import IntroToolBar from '@/components/shared/IntroToolBar';
import Footer from '@/components/shared/Footer.vue';
import router from '@/router';

export default {
    components:{Footer, IntroToolBar},
    data: () => ({
        emailLoading: false,
        googleLoading: false,
        facebookLoading: false,
        twitterLoading: false,
        showBack: true,
        valid: true,
        name:'',
        nameRules: [
            v => !!v || 'Your name is required',
            v => (v && v.length > 3) || 'Name must be greater than 3 characters',
        ],
        password: '',
        passwordRules: [
            v => !!v || 'Password is required',
            v => (v && v.length > 3) || 'Password must be greater than 3 characters',
        ],
        confirm_password: '',
        email: '',
        selectCountry: '',
        countries: [
            "Afghanistan",
            "Åland Islands",
            "Albania",
            "Algeria",
            "American Samoa",
            "Andorra",
            "Angola",
            "Anguilla",
            "Antarctica",
            "Antigua and Barbuda",
            "Argentina",
            "Armenia",
            "Aruba",
            "Australia",
            "Austria",
            "Azerbaijan",
            "Bahamas",
            "Bahrain",
            "Bangladesh",
            "Barbados",
            "Belarus",
            "Belgium",
            "Belize",
            "Benin",
            "Bermuda",
            "Bhutan",
            "Bolivia (Plurinational State of)",
            "Bonaire, Sint Eustatius and Saba",
            "Bosnia and Herzegovina",
            "Botswana",
            "Bouvet Island",
            "Brazil",
            "British Indian Ocean Territory",
            "United States Minor Outlying Islands",
            "Virgin Islands (British)",
            "Virgin Islands (U.S.)",
            "Brunei Darussalam",
            "Bulgaria",
            "Burkina Faso",
            "Burundi",
            "Cambodia",
            "Cameroon",
            "Canada",
            "Cabo Verde",
            "Cayman Islands",
            "Central African Republic",
            "Chad",
            "Chile",
            "China",
            "Christmas Island",
            "Cocos (Keeling) Islands",
            "Colombia",
            "Comoros",
            "Congo",
            "Congo (Democratic Republic of the)",
            "Cook Islands",
            "Costa Rica",
            "Croatia",
            "Cuba",
            "Curaçao",
            "Cyprus",
            "Czech Republic",
            "Denmark",
            "Djibouti",
            "Dominica",
            "Dominican Republic",
            "Ecuador",
            "Egypt",
            "El Salvador",
            "Equatorial Guinea",
            "Eritrea",
            "Estonia",
            "Ethiopia",
            "Falkland Islands (Malvinas)",
            "Faroe Islands",
            "Fiji",
            "Finland",
            "France",
            "French Guiana",
            "French Polynesia",
            "French Southern Territories",
            "Gabon",
            "Gambia",
            "Georgia",
            "Germany",
            "Ghana",
            "Gibraltar",
            "Greece",
            "Greenland",
            "Grenada",
            "Guadeloupe",
            "Guam",
            "Guatemala",
            "Guernsey",
            "Guinea",
            "Guinea-Bissau",
            "Guyana",
            "Haiti",
            "Heard Island and McDonald Islands",
            "Holy See",
            "Honduras",
            "Hong Kong",
            "Hungary",
            "Iceland",
            "India",
            "Indonesia",
            "Côte d'Ivoire",
            "Iran (Islamic Republic of)",
            "Iraq",
            "Ireland",
            "Isle of Man",
            "Israel",
            "Italy",
            "Jamaica",
            "Japan",
            "Jersey",
            "Jordan",
            "Kazakhstan",
            "Kenya",
            "Kiribati",
            "Kuwait",
            "Kyrgyzstan",
            "Lao People's Democratic Republic",
            "Latvia",
            "Lebanon",
            "Lesotho",
            "Liberia",
            "Libya",
            "Liechtenstein",
            "Lithuania",
            "Luxembourg",
            "Macao",
            "Macedonia (the former Yugoslav Republic of)",
            "Madagascar",
            "Malawi",
            "Malaysia",
            "Maldives",
            "Mali",
            "Malta",
            "Marshall Islands",
            "Martinique",
            "Mauritania",
            "Mauritius",
            "Mayotte",
            "Mexico",
            "Micronesia (Federated States of)",
            "Moldova (Republic of)",
            "Monaco",
            "Mongolia",
            "Montenegro",
            "Montserrat",
            "Morocco",
            "Mozambique",
            "Myanmar",
            "Namibia",
            "Nauru",
            "Nepal",
            "Netherlands",
            "New Caledonia",
            "New Zealand",
            "Nicaragua",
            "Niger",
            "Nigeria",
            "Niue",
            "Norfolk Island",
            "Korea (Democratic People's Republic of)",
            "Northern Mariana Islands",
            "Norway",
            "Oman",
            "Pakistan",
            "Palau",
            "Palestine, State of",
            "Panama",
            "Papua New Guinea",
            "Paraguay",
            "Peru",
            "Philippines",
            "Pitcairn",
            "Poland",
            "Portugal",
            "Puerto Rico",
            "Qatar",
            "Republic of Kosovo",
            "Réunion",
            "Romania",
            "Russian Federation",
            "Rwanda",
            "Saint Barthélemy",
            "Saint Helena, Ascension and Tristan da Cunha",
            "Saint Kitts and Nevis",
            "Saint Lucia",
            "Saint Martin (French part)",
            "Saint Pierre and Miquelon",
            "Saint Vincent and the Grenadines",
            "Samoa",
            "San Marino",
            "Sao Tome and Principe",
            "Saudi Arabia",
            "Senegal",
            "Serbia",
            "Seychelles",
            "Sierra Leone",
            "Singapore",
            "Sint Maarten (Dutch part)",
            "Slovakia",
            "Slovenia",
            "Solomon Islands",
            "Somalia",
            "South Africa",
            "South Georgia and the South Sandwich Islands",
            "Korea (Republic of)",
            "South Sudan",
            "Spain",
            "Sri Lanka",
            "Sudan",
            "Suriname",
            "Svalbard and Jan Mayen",
            "Swaziland",
            "Sweden",
            "Switzerland",
            "Syrian Arab Republic",
            "Taiwan",
            "Tajikistan",
            "Tanzania, United Republic of",
            "Thailand",
            "Timor-Leste",
            "Togo",
            "Tokelau",
            "Tonga",
            "Trinidad and Tobago",
            "Tunisia",
            "Turkey",
            "Turkmenistan",
            "Turks and Caicos Islands",
            "Tuvalu",
            "Uganda",
            "Ukraine",
            "United Arab Emirates",
            "United Kingdom of Great Britain and Northern Ireland",
            "United States of America",
            "Uruguay",
            "Uzbekistan",
            "Vanuatu",
            "Venezuela (Bolivarian Republic of)",
            "Viet Nam",
            "Wallis and Futuna",
            "Western Sahara",
            "Yemen",
            "Zambia",
            "Zimbabwe"
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
        openPage: function(pageLink){
            router.push(pageLink)
        },
        validEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        inputValidation(){
            const ct = this;
            switch (true) {
                case ct.selectCountry === '':
                    ct.snackbar_text = "Choose Your Country";
                    return false;
                case !ct.validEmail(ct.email):
                    ct.snackbar_text = "Enter a valid email";
                    return false;
                case ct.password !== ct.confirm_password:
                    ct.snackbar_text = "Your passwords are not matching.";
                    return false;
                default:
                    return true;
            }
        },

        sendUserData(provider, token){
            const cxt = this;
            const url = `${process.env.ROOT_API}/api/v1/user/register/social`
            axios.post(url,
                {
                        country: this.countries.indexOf(this.selectCountry) + 1,
                        token: token,
                        provider: provider
                    },
            { headers: { 'Content-Type': 'application/json'}},
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
                    cxt.snackbar=true
                    cxt.snackbar_text = error.response.data.error
                });
        },

      register_user(){
        let ct = this;
        ct.emailLoading = true;
          if(ct.inputValidation()){
              const url = `${process.env.ROOT_API}/api/v1/user/register`
              axios.post(url, {
                      country: this.countries.indexOf(this.selectCountry) + 1,
                      name: ct.name,
                      email: ct.email,
                      password: ct.password
                  },
                  { headers: { 'Content-Type': 'application/json'}},
              )
                  .then(function (response) {
                      ct.emailLoading = false
                      ct.snackbar=true
                      ct.snackbar_text = response.data.message
                      router.push("/login");
                  })
                  .catch(function (error) {
                      ct.emailLoading=false
                      ct.snackbar=true
                      ct.snackbar_text = error.response.data.error
                  });
        }
        else{
              ct.snackbar = true;
              ct.emailLoading = false;

        }
      },
        signInWithGoogle() {
            const ct = this;
            ct.googleLoading = true;
            if(ct.selectCountry === ''){
                ct.snackbar_text = "Choose Your Country";
                ct.snackbar = true;
                ct.googleLoading = false;
            }
            else{
                ct.$gAuth.signIn()
                    .then((googleUSer) => {
                        const token = googleUSer.getAuthResponse()
                        ct.sendUserData('Google', token.id_token);
                    })
                    .catch((error) => {
                        ct.googleLoading = false;
                        ct.snackbar = true;
                        ct.snackbar_text = "Try another Sign-in option"
                    });
            }
        },

        async signInWithFacebook() {
            const ct = this;
            ct.facebookLoading = true;
            if(ct.selectCountry === ''){
                ct.snackbar_text = "Choose Your Country";
                ct.snackbar = true;
                ct.facebookLoading = false;
            }
            else{
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
        }
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
    width: 100%;
  }
  .full-size {
      width: 100%;
      height: 100%;
  }
</style>
