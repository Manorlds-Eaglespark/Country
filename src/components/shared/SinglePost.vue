<template>
  <div>
    <v-card class="mx-auto whole-card" flat outlined>
        <div class="post-header">
          <v-avatar v-if="post.poster_image" size="48">
            <v-img alt="" :src="post.poster_image"/>
          </v-avatar>
          <v-avatar v-else color="blue lighten-5" size="48">
            <img src="@/assets/idea.svg" class="pa-1 account-image"/>
          </v-avatar> &nbsp;
          <strong>{{post.poster_name}}</strong>
          <v-btn icon @click="showProfile = !showProfile">
            <v-icon>{{ showProfile ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
          <span class="time-text">
            <time-ago :datetime="Date.parse(post.posted_at)" refresh :locale="locale" :tooltip="tooltip" :long="longString"></time-ago>
          </span>
        </div>
      <div v-show="showUserProfile">
        <template>
          <v-card flat class="mx-auto" max-width="100%">
            <img v-if="post.poster_image" :src="post.poster_image" class="mt-4 account-image"/>
            <img v-else src="@/assets/idea.svg" class="mt-4 account-image"/>
            <v-card-title>{{post.poster_name}}</v-card-title>
            <v-card-subtitle class="pb-0">About:</v-card-subtitle>
            <v-card-text class="text--primary">
              <div>{{post.poster_about}}</div>
            </v-card-text>
            <v-divider/>
          </v-card>
          </template>
      </div>
        
        <v-card-text class="pt-3 pb-0 text--primary">
          <p class="title font-weight-regular text-color-black">{{post.message}}</p>
        </v-card-text>

        <div class="img-container">
          <div v-show="imagesOnPost">
            
            <div v-if="moreThanOneImage">
              <vue-images :imgs="images" :showthumbnails="true" :modalclose="true" :mousescroll="true" :showclosebutton="true" :keyinput="true"/>
            </div>
            <v-img v-else :src="getFirstImage" contain></v-img>
          </div>
        </div>
        <div> 
          <v-container>
            <v-divider></v-divider>
            <v-row no-gutters class="pt-2">
              <v-col>
                <v-card class="pa-0" tile elevation="0">
                  <v-btn @click.prevent='()=>like_post()' class="full-size body-1" text>
                    {{(getLikes > 0)?getLikes:''}}
                    <v-icon  v-if='likeActive' color="orange" >mdi-thumb-up-outline</v-icon>
                    <v-icon  v-else color="grey darken-2">mdi-thumb-up-outline</v-icon>
                    <span class="d-none d-md-flex d-lg-none"> {{getLikeWord?'Likes' : 'Like'}}</span>
                  </v-btn>
                </v-card>
              </v-col>
              <v-col>
                <v-card class="pa-0" tile elevation="0">
                  <v-btn text class="full-size" @click.prevent="show_comments">
                    {{(getCommentsCount > 0)?getCommentsCount:''}}
                    <v-icon color="grey darken-2">mdi-comment-outline</v-icon>
                    <span class="d-none d-md-flex d-lg-none"> {{getCommentWord?'Comments' : 'Comment'}}</span>
                  </v-btn>
                </v-card>
              </v-col>
              <v-col>
                <v-card class="pa-0" tile elevation="0">
                  <v-btn text class="full-size" @click.prevent="bookmark_post">
                    <v-icon :color="getBookmarkedColor">mdi-bookmark-outline</v-icon>
                    <span   class="d-none d-md-flex d-lg-none"> Bookmark</span>
                  </v-btn>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
          <Comment @changeMsg="closeComments" :items="getComments" :postId="postId" v-if="showCommentSection"></Comment>
        </div>
    </v-card>
    <div class="text-center">
      <v-snackbar v-model="snackBar" :multi-line="multiLine">
        {{ snackbarText }}
        <v-btn color="red" text  @click="snackBar = false">
          Close
        </v-btn>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import TimeAgo from 'vue2-timeago'
import vueImages from 'vue-images'
import axios from 'axios'
import Comment from './Comment'
export default {
    name: "SinglePost",
    props: ["post"],
    components: {TimeAgo, Comment, vueImages},
    data:()=>({
        liked: true,
        longString: true,
        showProfile: false,
        isActive:true,
        bookmarked: false,
        likeCount:0,
        commentsCount:0,
        likePlural:null,
        commentPlural:null,
        commentPlural: false,
        locale: "en",
        tooltip: false,
        multiLine: true,
        snackBar: false,
        snackbarText:'',
        moreThanOneImage: false,
        imagesOnPost: true,
        showComments: false,
        items: [],
        images: [],
        postId: null,
        headers: {
                  'headers':{
                              'Content-Type': 'application/json',
                              'Authorization': localStorage.getItem('token'),
                            }
                  },
    }),
      created(){
          this.isActive = this.post.liked;
          this.likeCount = this.post.likes;
          this.images = this.post.images;
          this.postId = this.post.id;
          this.commentsCount = this.post.comments;
          this.likePlural = this.post.likes > 1 ? true : false;
          this.CommentPlural = this.post.comments > 1 ? true : false;
          this.bookmarked = this.post.bookmarked;
          this.moreThanOneImage = (this.images.length > 1) ? true : false;
          this.imagesOnPost = (this.images === undefined || this.images.length == 0) ? false : true;
      },
      computed:{
          showUserProfile(){
            return this.showProfile;
          },
          showMultipleImages(){
            return (this.imagesOnPost && this.moreThanOneImage)
          },
          getFirstImage(){
            return this.imagesOnPost ? this.images[0].imageUrl:"";
          },
          likeActive(){
              return this.isActive;
            },
          getLikes(){
              return this.likeCount;
          },
          getLikeWord(){
              return this.likePlural;
          },
          getCommentWord(){
              return this.CommentPlural;
          },
          getCommentsCount(){
              return this.commentsCount;
          },
          showCommentSection(){
              return this.showComments;
          },
          getComments(){
            return this.items;
          },
          getBookmarkedColor(){
            return this.bookmarked ? "orange" : "grey darken-3";
          }
      },

    methods: {
        closeComments(){
          this.commentsCount = this.commentsCount + 1;
          this.showComments = false;
        },
        show_comments(){
          let ct = this;
          ct.showComments = !ct.showComments;
          var url = `${process.env.ROOT_API}/api/v1/comments/post/`+ct.postId;
          axios.get(url, ct.headers)
          .then(res=>{
            ct.items = res.data.comments;
          })
          .catch(err=>{
            ct.snackBar = true;
            ct.snackbarText = err.response.data.error;
          })
        },
      
        like_post(){
            var cntxt = this;
            var url = `${process.env.ROOT_API}/api/v1/likes/post/`+cntxt.postId
            axios.post(url,{}, cntxt.headers)
            .then((response)=>{

            if(cntxt.likeCount > 1){
                cntxt.likePlural = true;
            }
            else{
                cntxt.likePlural = false;
            }
            if(cntxt.isActive){
                cntxt.likeCount = cntxt.likeCount - 1
                cntxt.likePlural = cntxt.likeCount>1?true:false
                cntxt.isActive = false;
            }
            else{
                cntxt.likeCount = cntxt.likeCount + 1
                cntxt.isActive = true;
                cntxt.likePlural = cntxt.likeCount > 1?true:false
            }
            
            })
            .catch((error)=>{
                cntxt.snackBar = true;
                cntxt.snackbarText = error.response.data.error;
        })
   },

   bookmark_post(){
     let bk_context = this;
     var url = `${process.env.ROOT_API}/api/v1/bookmarks/posts/`+bk_context.postId
            axios.post(url,{}, bk_context.headers)
            .then((response)=>{
              bk_context.bookmarked = !bk_context.bookmarked
              bk_context.snackBar = true;
              bk_context.snackbarText = response.data.message;
            })
            .catch((error)=>{
                bk_context.snackBar = true;
                bk_context.snackbarText = error.response.data.error;
        })
   }
  }
}
</script>



<style>
.post-image{
    height: auto;
    width: auto;
    max-width: 100%;
    max-height: 350px;
    display: block;
    margin: 0 auto !important;
}
.img-container{
    width: 100%;
    margin: 0 auto !important;
    text-align: center;
    overflow: hidden;
    max-width: 100%;
    padding: 0px;
}
.post-header{
    padding-top: 14px;
    padding-left: 14px;
    padding-right: 14px;
    width: 100%;
    display: inline-block;
    overflow: hidden;
}
.whole-card{
    width:98%;
    margin-top: 14px;
    overflow: hidden;
}
.time-text{
    text-align: end;
    float: right;
    vertical-align: middle;
    padding-top: 14px;
    font-size: 0.9rem;
}
.no-padding{
    padding:0;
}

.full-size{
    width: 100%;
    height: 100%;
}
.text-color-black{
    color: #333;
}
.account-image{
  width: 100%;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  display: block;
}
</style>
