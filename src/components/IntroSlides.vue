<template>
  <v-app id="inspire">
        <IntroToolBar v-bind:showBack="showBack"/>
                <v-carousel delimiter-icon="mdi-minus" :continuous="false" progress-color="purple lighten-2" :interval="3000" :cycle="true" :show-arrows="false" :show-progres=true>
                    <v-carousel-item 
                        v-for="(item,i) in slideImages"
                        :key="i"
                        :src="item.src"
                        reverse-transition="fade-transition"
                        transition="fade-transition"
                        >
                    <div class="pa-2 display-1 info-text">
                        {{item.text}}
                    </div>
                    </v-carousel-item>
                </v-carousel>
                 <v-list two-line>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/President_Roosevelt_-_Pach_Bros.jpg/800px-President_Roosevelt_-_Pach_Bros.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Theodore Roosevelt</v-list-item-title>
          <v-list-item-subtitle>26th U.S. President</v-list-item-subtitle>
          <v-list-item-body> <cite> Do what you can, with what you have, where you are.</cite></v-list-item-body>
        </v-list-item-content>
      </v-list-item>
    </v-list>
        <v-container>
          <v-divider></v-divider>
            <v-row no-gutters>
            <v-col>
                <v-card class="ma-4 center-item" flat>
                    <v-btn @click="openPage('/register')" color="purple lighten-2" large outlined text class="body-1 my-4"> Continue </v-btn>
                </v-card>
            </v-col>
            </v-row>
        </v-container>
</v-app>
</template>

<script>
import IntroToolBar from '@/components/shared/IntroToolBar'
import image1 from '@/assets/introSlide_1.jpg'
import image2 from '@/assets/introSlide_2.png'
import image3 from '@/assets/introSlide_3.jpg'
import image4 from '@/assets/introSlide_4.jpg'
import router from '@/router'

  export default {
    components:{IntroToolBar},
    data () {
      return {
      showBack: true,
        cycle: false,
        slideImages: [
            { 
                src: image1,
                text: "Welcome to Countalk"
            },
            {
                src: image2,
                text: "Join Conversations and share your thoughts"
            },
            {
                 src: image3,
                text: "Interact and Share your experiences"
            },
            {
                 src: image4,
                text: "Enjoy"
            },
        ],
      }
    },
    methods: {
      openPage: function(pageLink){
        router.push(pageLink)
      }
    },
  }
</script>

<style>
.parent {
    height:100px;
  display: flex;
}
.spacer {
  flex-grow: 1;
}

.center-item{
    margin: 0 auto !important;
    text-align: center;
}

.info-text{
    /* margin: 0 auto !important; */
    text-align:center;
    margin-top: 70%;
    background-color: rgba(255, 255, 255, 0.5); 
}

.full-size{
  width: 100%;
  height: 100%;
}

#inspire {
  height: 100vh;
}

</style>
