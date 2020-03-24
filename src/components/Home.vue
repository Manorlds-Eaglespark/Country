<template>
    <div>
        <ToolBar></ToolBar>
        <Post :posts="posts" :url="'http://127.0.0.1:5000/api/v1/posts/country?page='"></Post>
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
export default {

  components: {ToolBar, BottomNavigation, Post},
  data: ()=>({
        posts: [],
        snackbar: false,
        multiLine: true,
        snackbar_text: '',
  }),

  created(){
      let ct = this;
      axios.get('http://127.0.0.1:5000/api/v1/posts/country?page=1',
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
  
}
</script>

<style>
body{
    width:100%;
    max-width:100%;
    padding:0;
    margin: 0;
}
</style>
