<template>
  <div>
    <ToolBar></ToolBar>
      <template>
        <v-card class="mx-auto my-4" max-width="98%">
          <img src="../assets/idea.svg" class="pa-2 account-image"/>
          <v-card-title>
            {{getName}} <v-spacer/><div class="my-2">
                  <v-btn color="primary" icon small dark>
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
            <v-card-text>
                      <v-icon outline color="grey darken-2">mdi-timeline-outline</v-icon></v-card-text>
              <v-divider></v-divider>
              <v-row no-gutters class="pt-2">
                <v-col>
                  <v-card class="pa-0" tile elevation="0">
                    <v-btn @click="showBookmarkedPosts" text class="full-size">
                      <v-icon color="grey darken-2">mdi-bookmark-outline</v-icon>
                      Bookmarked
                    </v-btn>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card class="pa-0" tile elevation="0">
                    <v-btn @click="showUserPosts" text class="full-size">
                      <v-icon outline color="grey darken-2">fa fa-user</v-icon>
                      &nbsp;By me
                    </v-btn>
                  </v-card>
                </v-col>
              </v-row>
          </v-container>
          <Post v-if="getShowUserPosts" :posts="getAllPosts" :url="'http://127.0.0.1:5000/api/v1/posts/user?page='"/>
          <Post v-else :posts="getAllPosts" :url="'http://127.0.0.1:5000/api/v1/posts/bookmarked?page='"/>
        </v-card>
      </template>
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
      tab: null,
      show_user_posts: false,
      user_name: '',
      user_email: '',
      user_country: '',
      allPosts: [],
      user_about: '',
      headers: {
                'headers':{
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('token'),
                          }
                },
        
    }),
    computed:{
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
        const url = " http://127.0.0.1:5000/api/v1/user";
        axios.get(url, ct.headers)
        .then(res=>{
          let user_data = res.data.user;
          ct.user_name = user_data.name;
          ct.user_email = user_data.email;
          ct.user_about = user_data.about;
          ct.user_country = user_data.country.name;
        })
        .catch(err=>{
          console.log(err.response.data);
        })

        axios.get('http://127.0.0.1:5000/api/v1/posts/bookmarked?page=1',ct.headers)
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
        const url = "http://127.0.0.1:5000/api/v1/posts/user";
        axios.get(url, ct.headers)
        .then(res=>{
          ct.allPosts = res.data.posts;
        })
        .catch(err=>{
          console.log(err.response.data);
        })
      },

      getBookmarkedPosts(){
        let ct = this;
        axios.get('http://127.0.0.1:5000/api/v1/posts/bookmarked?page=1',ct.headers)
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
    max-width: 98%;
    max-height: 250px;
    display: block;
    margin: 0 auto !important;
}
</style>
