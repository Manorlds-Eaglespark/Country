<template>
<div>
    <v-card class="mx-auto whole-card" v-for="post in posts" :key="post.id">
        <div class="post-header">
            <v-avatar color="purple lighten-5" size="48">
                <span class="white--text headline"><v-icon>fa fa-user</v-icon></span>
            </v-avatar>
            <strong>First & Last name</strong>
          <span class="time-text">2 minutes ago</span>
        </div>
        <div class="img-container">
            <img class="post-image" src="../../assets/countries.jpg"/>
       </div>
        <v-card-text class="pt-1 pb-1 text--primary">
            <p class="body-1 text-color-black">{{post.message}}</p>
        </v-card-text>
        <div>
            <template>
  <v-container>
        <v-divider></v-divider>
    <v-row no-gutters class="pt-2">
      <v-col>
        <v-card
          class="pa-0"
          tile
          elevation="0"
        >
          <v-btn class="full-size" text>
                    <v-icon  color="grey darken-2">mdi-thumb-up-outline</v-icon>
                    <span class="d-none d-md-flex d-lg-none"> Like</span>
                </v-btn>
        </v-card>
      </v-col>

      <v-col>
        <v-card
          class="pa-0"
          tile
          elevation="0"
        >
          <v-btn text class="full-size">
                    <v-icon color="grey darken-2">mdi-comment-outline</v-icon>
                    <span class="d-none d-md-flex d-lg-none"> Comment</span>
                </v-btn>
        </v-card>
      </v-col>
      
      <v-col>
        <v-card
          class="pa-0"
          tile
          elevation="0"
        >
          <v-btn text class="full-size">
                    <v-icon color="grey darken-3">mdi-crown-outline</v-icon>
                    <span class="d-none d-md-flex d-lg-none"> More</span>
                </v-btn>
        </v-card>
      </v-col>

      <v-col>
        <v-card
          class="pa-0"
          tile
          elevation="0"
        >
          <v-btn text class="full-size">
                    <v-icon outline color="grey darken-2">mdi-share-outline</v-icon>
                    <span class="d-none d-md-flex d-lg-none"> Share</span>
                </v-btn>
        </v-card>
      </v-col>

    </v-row>
  </v-container>
</template>
        </div>
    </v-card>
    </div>
</template>

<script>
export default {
    props: ["posts"],
}
</script>



<style>
.post-image{
    height: auto;
    width: auto;
    max-width: 100%;
    max-height: 250px;
    margin: 7px;
}
.img-container{
    width: 100%;
    margin: 0 auto !important;
    text-align: center;
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
</style>
