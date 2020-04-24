<template>
  <v-card max-width="100%" flat class="fix-height">
    <v-list three-line>
      <v-subheader v-text="header"></v-subheader>
      <template>
          <div v-show="showWhole">
      <form @submit.prevent="submitComment">
        <div class="commentWidth mx-2 mb-2">
            <v-text-field outlined label="Your Comment" v-model="commentMessage" :rules="rules" hide-details="auto"></v-text-field>
        </div>
          <v-row no-gutters class="pt-2 mb-4">
              <v-col class="mx-4">
                  <v-card class="pa-0" tile elevation="0">
                      <v-btn @click="showWholeFlag = !showWholeFlag" color="primary" class="full-size text-capitalize" outlined :loading="save_feedback_loading"
                      >
                          Cancel
                      </v-btn>
                  </v-card>
              </v-col>
              <v-col class="mx-4">
                  <v-card class="pa-0" tile elevation="0">
                      <v-btn color="primary" class="full-size body-1 text-capitalize" lowercase--text Large :loading="save_feedback_loading"
                             type="submit">
                          Comment
                      </v-btn>
                  </v-card>
              </v-col>
          </v-row>
      </form>
          </div>
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
    </div>
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
        showWholeFlag: true,
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
      computed:{
          showWhole(){
              return this.showWholeFlag;
          },
      },
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
      height: 360px !important;
      overflow: scroll;
    }
</style>
