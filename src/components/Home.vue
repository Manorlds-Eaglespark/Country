<template>
    <div>
        <ToolBar></ToolBar>

            <div class="mt-8">
                <v-text-field @keyup.enter="querySearch" class="mx-2 my-0" outlined v-model="search" :rules="searchRules" label="Search for a product .." required/>
            </div>
            <v-container v-if="searchActive">
              <v-row>
                <v-col cols="mx-12" offset="8">
                    <v-btn text class="text-lowercase" outlined color="warning" @click="searchActiveFlag = !searchActiveFlag">Close</v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-tabs grow v-model="tab">
              <v-tab>{{getSearchUsersNumber}} &nbsp; <v-icon >mdi-account-outline</v-icon> &nbsp; People</v-tab>
              <v-tab>{{getSearchPostsNumber}} &nbsp; <v-icon outline color="grey darken-2">mdi-timeline-outline</v-icon> &nbsp; Posts</v-tab>
        </v-tabs>

           <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card >
                <v-card-text>
                    <Users :users="getSearchUsers"/>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card >
                <Post :posts="getSearchPosts" :url="searchUrl"/>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
                </v-col>
              </v-row>
                
              
     
          
                </v-container>




        <Post :posts="posts" :url="url"></Post>
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
        <br/>
        <br/>
        <br/>
        <BottomNavigation></BottomNavigation>
    </div>
</template>

<script>
import ToolBar from '@/components/shared/ToolBar'
import Post from '@/components/shared/Post'
import axios from 'axios'
import BottomNavigation from '@/components/shared/BottomNavigation'
import Users from '@/components/shared/Users'
export default {

  components: {ToolBar, BottomNavigation, Post, Users},
  data: ()=>({
        search: '',
        searchActiveFlag: false,
        usersResultsNumber: 0,
        postsResultsNumber: 0,
        searchUsers: [],
        searchPosts: [],
        tab:null,
        searchRules: [
        v => !!v || 'Key word required to search',
        ],
        searchUrl: `${process.env.ROOT_API}/api/v1/search?page=`,



        posts: [],
        snackbar: false,
        multiLine: true,
        snackbar_text: '',
        url: `${process.env.ROOT_API}/api/v1/posts/country?page=1`,
  }),

  created(){
      let ct = this;
      axios.get(ct.url,
      {
          headers:{
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('token')
          }
      })
      .then(res =>{
        ct.posts = res.data.posts;
        })
      .catch(err => {
        ct.snackbar = true;
        ct.snackbar_text = err.response.data.error;
      });
  },

      computed:{
        getSearchUsersNumber(){
            return this.usersResultsNumber;
        },
        getSearchPostsNumber(){
            return this.postsResultsNumber;
        },
        getSearchPosts(){
            return this.searchPosts;
        },
        getSearchUsers(){
            return this.searchUsers;
        },
        searchActive(){
            return this.searchActiveFlag;
        }
    },

  methods:{
      querySearch: function(){
            let ct = this;
            const headers = {
                'headers':{
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('token'),
                        }
            };
            const url = `${process.env.ROOT_API}/api/v1/search`;
            if(ct.search.length < 1){
              ct.snackbar = true;
              ct.snackbar_text = "We can only search for something.";
            }
            else{
                axios.post(url, {"search": ct.search}, headers)
                .then(res => {
                    ct.searchActiveFlag = true;
                    ct.usersResultsNumber = res.data.people_number;
                    ct.postsResultsNumber = res.data.posts_number;
                    ct.searchUsers = res.data.people;
                    ct.searchPosts = res.data.posts;
                })
                .catch(err=>{
                  ct.snackbar = true;
                  ct.snackbar_text = err.response.data.error;
                });
            }
        },
  },  
}
</script>

<style>
body{
    width:100%;
    max-width:100%;
    padding:0;
    margin: 0;
}
.close{
  display: inline;
}
.full{
  width: 100%;
  display: block;
  max-width: 100%;
}
</style>
