<template>
    <div>
        <ToolBar/>
        <v-form @submit.prevent="querySearch">
            <div class="my-2 question-header">
                <v-text-field class="ml-4 my-0" v-model="search" :rules="searchRules" label="Search something .." required/>
                <v-btn type="submit" elevation="0" color="white" class="mr-2 my-0 mt-3">
                    <v-icon dark>fa fa-search</v-icon>
                </v-btn>
            </div>
        </v-form>
         <v-container v-if="getSearchActivity">
        <v-tabs grow v-model="tab">
        <v-tab>{{getUsersNumber}} &nbsp; <v-icon >mdi-account-outline</v-icon> &nbsp; People</v-tab>
        <v-tab>{{getPostsNumber}} &nbsp; <v-icon outline color="grey darken-2">mdi-timeline-outline</v-icon> &nbsp; Posts</v-tab>
  </v-tabs>
   <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <v-card-text>
              <Users :users="getUsers"/>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <Post :posts="getPosts" :url="'http://127.0.0.1:5000/api/v1/search?page='"/>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    
          </v-container>
        
        <BottomNavigation/>
    </div>
</template>

<script>
import axios from 'axios';
import ToolBar from '@/components/shared/ToolBar';
import BottomNavigation from '@/components/shared/BottomNavigation';
import Post from '@/components/shared/Post';
import Users from '@/components/shared/Users'
export default {
    name: "Search",
    components: {ToolBar, BottomNavigation, Post, Users},
    data:()=>({
        search: '',
        searchActive: false,
        usersResultsNumber: 0,
        postsResultsNumber: 0,
        users: [],
        posts: [],
        tab:null,
        searchRules: [
        v => !!v || 'Key word required to search',
      ],
    }),
    computed:{

        getUsersNumber(){
            return this.usersResultsNumber;
        },
        getPostsNumber(){
            return this.postsResultsNumber;
        },
        getPosts(){
            return this.posts;
        },
        getUsers(){
            return this.users;
        },
        getSearchActivity(){
            return this.searchActive;
        }
    },
    methods:({
        querySearch: function(){
            let ct = this;
            const headers = {
                'headers':{
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('token'),
                        }
            };
            const url = "http://127.0.0.1:5000/api/v1/search";
            axios.post(url, {"search": ct.search}, headers)
            .then(res => {
                ct.searchActive = true;
                ct.usersResultsNumber = res.data.people_number;
                ct.postsResultsNumber = res.data.posts_number;
                ct.users = res.data.people;
                ct.posts = res.data.posts;
            })
            .catch(err=>{
                console.log(err.response.data.error);
            });
        },
    })
}
</script>


<style>
.question-header{
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
}
</style>

