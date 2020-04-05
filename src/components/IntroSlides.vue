<template>
    <div>
        <IntroToolBar v-bind:showBack="showBack"/>
        <v-card flat class="full-size">
            <template>
                <v-carousel delimiter-icon="mdi-minus" :continuous="false" progress-color="purple lighten-2" :cycle="cycle" :show-arrows="false" :show-progres=true>
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
        <v-container>
            <v-row no-gutters>
            <v-col>
                <v-card @click="openPage('/register')" class="pa-3 center-item" flat>
                    <v-btn text class="full-size body-1"> Continue </v-btn>
                </v-card>
            </v-col>
            </v-row>
        </v-container>
</template>
        </v-card>
    </div>
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
                text: "Join the Conversations"
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
    margin: 0 auto !important; 
    text-align:center; 
    background-color: rgba(255, 255, 255, 0.5); 
}

</style>
