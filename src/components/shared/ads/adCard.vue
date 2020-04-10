<template>
    <div class="mx-2 my-2">
        <template>
            <v-card flat outlined class="mx-auto" width="100%">
                <div class="post-header">
                    <v-avatar class="mx-2" color="blue lighten-5" size="48">
                        <img src="@/assets/idea.svg" class="pa-1 account-image"/>
                    </v-avatar>
                    <strong class="headline">{{ad.shop.name}}</strong>
                    <v-btn class="mx-2" icon @click="showShopDetailsFlag = !showShopDetailsFlag">
                        <v-icon>{{ showProfile ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                    </v-btn>
                    <span class="time-text">
            <time-ago :datetime="Date.parse(ad.posted_at)" refresh :locale="locale" :tooltip="tooltip"
                      :long="longString"></time-ago>
          </span>
                </div>
                <div v-show="showShopDetails">

                    <v-card class="mx-2" flat outlined max-width="100%">
                        <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"/>
                        <v-card-title>
                            {{ad.shop.name}}
                        </v-card-title>
                        <div class="mx-4 my-2">
                            <span text class="subtitle-1">Tel:</span> {{ad.shop.telephone}} <br/>
                        </div>
                        <div class="mx-4 my-2">
                            <span text class="subtitle-1">Address:</span> {{ad.shop.address}} <br/>
                        </div>
                        <div class="mx-4 my-2">
                            <span text class="subtitle-1">Delivery:</span> {{ad.shop.delivery}} <br/>
                        </div>
                        <v-expand-transition>
                            <div>
                                <v-divider></v-divider>
                                <v-card-text>
                                    {{ad.shop.description}}
                                </v-card-text>
                            </div>
                        </v-expand-transition>
                    </v-card>


                </div>
                <v-card-text>
                    <p style="text-align: center;" class="display-1 text--primary">
                        {{ad.product.name}}
                    </p>
                    <div class="img-container">
                        <div v-show="imagesOnPost">
                            <div v-if="moreThanOneImage">
                                <vue-images :imgs="images" :showthumbnails="true" :modalclose="true" :mousescroll="true"
                                            :showclosebutton="true" :keyinput="true"/>
                            </div>
                            <v-img v-else :src="getFirstImage" contain></v-img>
                        </div>
                    </div>
                    <div style="text-decoration:line-through;" class="title warning--text">{{ad.product.price}}</div>
                    <p text class="headline success--text">{{ad.discounted_price}}</p>
                    <p class="title text--primary">{{ad.description}}</p>
                    <p>Time Left</p>
                    <div class="time-container">
                        <Countdown :deadline="deadline"></Countdown>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-container>
                        <v-divider></v-divider>
                        <v-row no-gutters class="pt-2">
                            <v-col>
                                <v-card class="pa-0" tile elevation="0">
                                    <v-btn @click.prevent='()=>{}' class="full-size body-1" text>
                                        <v-icon color="grey darken-2">mdi-thumb-up-outline</v-icon>
                                    </v-btn>
                                </v-card>
                            </v-col>
                            <v-col>
                                <v-card class="pa-0" tile elevation="0">
                                    <v-btn text class="full-size" @click.prevent="()=>{}">
                                        <v-icon color="grey darken-2">mdi-comment-outline</v-icon>
                                    </v-btn>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>

                </v-card-actions>
            </v-card>
        </template>
    </div>
</template>

<script>
    import TimeAgo from 'vue2-timeago';
    import Countdown from 'vuejs-countdown'
    import vueImages from 'vue-images'

    export default {
        name: "adCard",
        props: ["ad"],
        components: {TimeAgo, Countdown, vueImages},
        data: () => ({
            showProfile: false,
            longString: true,
            timeLeft: '',
            locale: "en",
            tooltip: false,
            deadline: '',
            images: [],
            showShopDetailsFlag: false,
            imagesOnPostFlag: false,
            moreThanOneImageFlag: false,
        }),

        created() {
            this.deadline = this.formatDate(this.ad.duration);
            this.images = this.ad.product.images;
            this.moreThanOneImageFlag = (this.images.length > 1);
            this.imagesOnPostFlag = (!(this.images.length === 0));
        },

        computed: {
            showShopDetails() {return this.showShopDetailsFlag;},
            imagesOnPost(){return this.imagesOnPostFlag;},
            moreThanOneImage(){return this.moreThanOneImageFlag;},
            getFirstImage() {return this.imagesOnPost ? this.images[0].imageUrl : "";},
        },

        methods: {
            formatDate(date) {
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();
                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;
                return [year, month, day].join('-');
            }
        }
    }
</script>

<style>
    .post-header {
        padding-top: 14px;
        padding-left: 14px;
        padding-right: 14px;
        width: 100%;
        display: inline-block;
        overflow: hidden;
    }
    .time-container {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: baseline;
    }
    .img-container {
        width: 100%;
        margin: 0 auto !important;
        text-align: center;
        overflow: hidden;
        max-width: 100%;
        padding: 0px;
    }
</style>

