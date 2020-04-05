<template>
  <v-card max-width="98%" flat class="fix-height mb-2">
    <v-list three-line>
      <v-subheader v-text="header"></v-subheader>
      <template>
      <form @submit.prevent="submitComment">
        <div class="commentWidth px-3 mb-2">
            <v-text-field outlined label="Your Comment" v-model="commentMessage" :rules="rules" hide-details="auto"></v-text-field>
        </div>
        <div class="full-width px-3 mb-3">
            <v-btn elevation="0" type="submit">Comment</v-btn>
          </div>
      </form>
    </template>
      <div class="commentWidth" v-for="(item, index) in items" :key="index">
          <SingleComment :item="item" :index="index"/>
      </div>
    </v-list>
    
     <div class="text-center">
      <v-snackbar v-model="snackBar" :multi-line="multiLine">
        {{ snackbarText }}
        <v-btn color="red" text  @click="snackBar = false">
          Close
        </v-btn>
      </v-snackbar>
    </div>
  </v-card>
</template>

<script>
import axios from 'axios'
import SingleComment from '@/components/shared/SingleComment.vue'

  export default {
    components:{SingleComment},
    props: ["items", "postId"],
    data: () => ({
        header: 'Comments',
        multiLine: true,
        snackBar: false,
        snackbarText:'',
        rules: [
        value => !!value || 'Comment required before submit.',
      ],
      commentMessage:'',
      headers: {
          'headers':{
                      'Content-Type': 'application/json',
                      'Authorization': localStorage.getItem('token'),
                    }
        },
    }),
    methods: {
      submitComment(){
        let ct = this;
        const url = `${process.env.ROOT_API}/api/v1/comments/post/`+ct.postId;
        const data = {'message':ct.commentMessage};
        axios.post(url, data, ct.headers)
        .then(res=>{
          ct.snackBar = true;
          ct.snackbarText = res.data.message;
          ct.$emit("changeMsg");
        })
        .catch(err=>{
          ct.snackBar = true;
          ct.snackbarText = err.response.data.error;
        })
      },
    }
  }
</script>


<style>
    .commentWidth{
        width: 98%;
        margin: 0 auto !important;
    }
    .full-width{
        width: 100%;
        text-align: right;
    }
    .fix-height{
      height: 350px !important;
      overflow: scroll;
    }
</style>
