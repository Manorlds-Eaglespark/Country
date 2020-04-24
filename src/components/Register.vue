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
                <v-card-text class="mt-2 mb-5 title">Sign-up</v-card-text>
                <v-form class="mt-4" ref="form" width="100%" v-model="valid" @submit.prevent="register_user">
                    <v-select outlined v-model="selectCountry" :items="countries" :rules="[v => !!v || 'Country is required']" label="Select Your Country" required></v-select>
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
                                       :loading="loading">
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
import axios from 'axios'
import IntroToolBar from '@/components/shared/IntroToolBar'
import Footer from '@/components/shared/Footer.vue'
import router from '@/router'

  export default {
    components:{Footer, IntroToolBar},
    data: () => ({
        loading: false,
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
      register_user(){
        let ct = this;
        ct.loading = true;
        if(ct.name === '' || ct.selectCountry ==='' || ct.email === '' || ct.password === '' || ct.confirm_password === '' ){
            ct.snackbar=true;
            ct.snackbar_text = "Fill in all details";
            ct.loading=false;
        }
        if(ct.password !== ct.confirm_password){
            ct.snackbar=true;
            ct.snackbar_text = "Your passwords are not matching.";
            ct.loading=false;
        }
        else{
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
  .full-size {
      width: 100%;
      height: 100%;
  }
</style>
