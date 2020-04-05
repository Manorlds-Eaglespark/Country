<template>
  <div>
    <ToolBar></ToolBar>
      <template>
        <v-card class="mx-auto my-1" max-width="98%">
          <img v-if="profile_image" :src="profile_image" class="pt-2 account-image"/>
          <img v-else src="@/assets/idea.svg" class="pt-2 account-image"/>
          <div v-show="getShowEditForm">
            <v-form @submit.prevent="saveEditedDetail">
              <v-container>
                <v-row>
                  <v-col cols="12" md="1">
                    <v-file-input filled accept="image/*" v-model="profile_img" label="Change Your Profile Picture" prepend-icon="mdi-camera"></v-file-input>
                  </v-col>
                  <v-col cols="12" md="1">
                    <v-text-field v-model="user_name" label="Name" required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="1">
                    <v-text-field v-model="user_email" :rules="emailRules" label="E-mail" required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="1">
                    <v-text-field v-model="user_about" label="About Yourself" required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="1">
                    <v-btn :loading="loading" class="on-the-right mr-4 px-2" type="submit" outlined large color="primary" text >Save Profile Info</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </div>
          <v-card-title>
            {{getName}} <v-spacer/><div class="my-2">
                  <v-btn @click="showEditForm = !showEditForm" color="primary" icon dark>
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </div>
          </v-card-title>
          <v-card-text class="my-2 py-0">
            Email: {{getEmail}}
          </v-card-text>
          <v-card-text class="my-2 py-0">
            Country: {{getCountry}}
          </v-card-text>
          <v-card-subtitle>
            {{getAbout}}
          </v-card-subtitle>
          <v-container>
              <v-divider></v-divider>
              <v-row no-gutters class="pt-5">
                <v-col>
                  <v-card class="pa-0" tile elevation="0">
                    <v-btn @click="showBookmarkedPosts" text class="full-size">
                      <v-icon class="mx-2" color="grey darken-2">mdi-bookmark-outline</v-icon>
                      Bookmarked
                    </v-btn>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card class="pa-0" tile elevation="0">
                    <v-btn @click="showUserPosts" text class="full-size">
                      <v-icon outline class="mx-2" color="grey darken-2">mdi-storefront</v-icon>
                      &nbsp;My Shop
                    </v-btn>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card class="pa-0" tile elevation="0">
                    <v-btn @click="showUserPosts" text class="full-size">
                      <v-icon outline class="mx-2" color="grey darken-2">mdi-account-circle</v-icon>
                      &nbsp;By me
                    </v-btn>
                  </v-card>
                </v-col>
              </v-row>
          </v-container>
          <Post v-if="getShowUserPosts" :posts="getAllPosts" :url="userPostsUrl"/>
          <Post v-else :posts="getAllPosts" :url="userBookmarkedPostsUrl"/>
        </v-card>
      </template>
      <v-snackbar v-model="snackbar" :multi-line="multiLine">
        {{ snackbarText }}
        <v-btn color="red" text  @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
  <br/> <br/> <br/> <br/>
  <BottomNavigation></BottomNavigation>
  </div>
</template>

<script>
  import axios from 'axios';
  import BottomNavigation from '@/components/shared/BottomNavigation';
  import ToolBar from '@/components/shared/ToolBar';
  import Post from '@/components/shared/Post';
export default {

    components:{ToolBar, BottomNavigation, Post},
    data: () => ({
      show: false,
      snackbar: false,
      emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      tab: null,
      profile_img: [],
      showEditForm: false,
      show_user_posts: false,
      user_data: {},
      loading: false,
      userPostsUrl: `${process.env.ROOT_API}/api/v1/posts/user?page=1`,
      userBookmarkedPostsUrl:`${process.env.ROOT_API}/api/v1/posts/bookmarked?page=`,
      snackbarText: '',
      user_name: '',
      user_email: '',
      user_country: '',
      profile_image: {},
      allPosts: [],
      multiLine: false,
      user_about: '',
      headers: {
                'headers':{
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('token'),
                          }
                },
        
    }),
    computed:{
      getShowEditForm(){
        return this.showEditForm;
      },
      getName(){
        return this.user_name;
      },
      getEmail(){
        return this.user_email;
      },
      getAbout(){
        return this.user_about;
      },
      getCountry(){
        return this.user_country;
      },
      getAllPosts(){
        return this.allPosts;
      },
      getShowUserPosts(){
        return this.show_user_posts;
      }
    },
    created(){
        let ct = this;
        const url = `${process.env.ROOT_API}/api/v1/user`;
        axios.get(url, ct.headers)
        .then(res=>{
          ct.user_data = res.data.user;
          ct.user_name = ct.user_data.name;
          ct.user_email = ct.user_data.email;
          ct.user_about = ct.user_data.about;
          ct.user_country = ct.user_data.country.name;
          ct.profile_image = ct.user_data.profile_img;
        })
        .catch(err=>{
          console.log(err.response.data);
        })

        axios.get(`${process.env.ROOT_API}/api/v1/posts/bookmarked?page=1`,ct.headers)
        .then(res =>{
          ct.allPosts = res.data.bookmarked_posts;
          })
        .catch(err => {
          console.log(err.response.data.error);
        });
    },
    methods:{
      getUserPosts(){
        let ct = this;
        const url = `${process.env.ROOT_API}/api/v1/posts/user`;
        axios.get(url, ct.headers)
        .then(res=>{
          ct.allPosts = res.data.posts;
        })
        .catch(err=>{
          console.log(err.response.data);
        })
      },

      saveEditedDetail(){
        let ct = this;
        const url = `${process.env.ROOT_API}/api/v1/user/edit`;
        ct.loading = true;
        
        let formdata = new FormData();

        if(ct.user_data.name != ct.user_name){
        formdata.append('name', ct.user_name);
        }
        if(ct.user_data.email != ct.user_email){
          formdata.append('email', ct.user_email);
        }
        if(ct.user_data.about != ct.user_about){
          formdata.append('about', ct.user_about);
        }
        if(ct.user_data.profile_img != ct.profile_img){
          formdata.append('profile_image', ct.profile_img);
        }
        
        axios.put(url, formdata, ct.headers)
        .then(res=>{
          ct.loading = false;
          ct.showEditForm = false;
          ct.snackbar = true;
          ct.snackbarText = res.data.message
        })
        .catch(err=>{
          ct.loading = false;
          ct.snackbar = true;
          ct.snackbarText = err.response.error;
        })
      },

      getBookmarkedPosts(){
        let ct = this;
        axios.get(`${process.env.ROOT_API}/api/v1/posts/bookmarked?page=1`,ct.headers)
        .then(res =>{
          ct.allPosts = res.data.bookmarked_posts;
          })
        .catch(err => {
          console.log(err.response.data.error);
        });
      },
      
      showUserPosts(){
        this.getUserPosts();
        this.show_user_posts = true;
      },
      showBookmarkedPosts(){
        this.getBookmarkedPosts();
        this.show_user_posts = false;
      },
    }
}
</script>

<style>
  body{
    width: 100%;
    max-width: 100%;
    color: #333;
  }
.account-image{
    height: auto;
    width: auto;
    max-width: 100%;
    max-height: 100%;
    display: block;
    margin: 0 auto !important;
}
.on-the-right{
  float: right;
}
</style>
