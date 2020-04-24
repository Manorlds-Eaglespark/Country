<template>
  <div>
      <div v-if="posts.length > 0">
    <div v-for="post in getPosts" :key="post.index" >
      <SinglePost :post = "post"/>
    </div>
  <template>
  <v-container class="my-2">
    <v-row no-gutters>
      <v-col>
        <v-card flat class="pa-0" tile elevation="0">
          <v-btn text class="full-size" @click="getMorePosts(true)">
                    <v-icon outline color="teal">mdi-refresh</v-icon>
                    <span class="d-none d-md-flex d-lg-none"> Refresh</span>
                  </v-btn>
        </v-card>
      </v-col>
      <v-col>
        <v-card tile flat class="pa-0" outlined elevation="0">
          <v-btn text class="full-size" @click="getMorePosts(false)">
                    <v-icon outlined color="teal">fa fa-caret-down</v-icon>
                    <span class="d-none d-md-flex d-lg-none" style="color:teal">&nbsp;More</span>
                  </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
    <div class="text-center">
      <v-snackbar v-model="snackBar" :multi-line="multiLine">
        {{ snackbarText }}
        <v-btn color="red" text  @click="snackBar = false">
          Close
        </v-btn>
      </v-snackbar>
    </div>
  </div>
      <div v-else class="pa-4 align-content-center">
      </div>
  </div>
</template>

<script>
import TimeAgo from 'vue2-timeago'
import axios from 'axios'
import SinglePost from '@/components/shared/SinglePost.vue'
export default {
    props: ["posts", "url"],
    components: {TimeAgo,SinglePost},
    data:()=>({
        multiLine: true,
        snackBar: false,
        morePressed: false,
        snackbarText:'',
        pagePosts: [],
        page: 1,
    }),


    computed:{
      getPosts(){
        return this.morePressed ? this.pagePosts : this.posts;
      }
    },

    methods:{
      getMorePosts(refreshStatus){
        let ct = this;
        ct.morePressed = true;
        ct.page = refreshStatus ? 1 : ct.page + 1;
        axios.get( ct.url + ct.page,
          {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
          })
        .then(res => (ct.pagePosts =  res.data.posts))
        .catch(err => {
          ct.snackbar = true;
          ct.snackbar_text = err.response.data.error;
        });
      },
    }
}
</script>
