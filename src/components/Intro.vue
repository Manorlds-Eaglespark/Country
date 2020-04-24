<template>
    <div>
        <IntroToolBar v-bind:showBack="showBack"></IntroToolBar>
        <img width="100%" src="@/assets/countries.jpg" alt="WorldWide"/>
        <v-card class="mx-2" :loading="loading" height="100%" flat>
            <v-card-title><img class="mx-2" src="@/assets/logo.png" alt=""/>Countalk</v-card-title>

            <v-card-text>
                <div class="my-4 subtitle-1">
                    #1 • Country • Mobile • Feed
                </div>

                <div>Join that conversations, talks and memes in your country. listen, contribute, share and be part of the conversations
                    that shape your future together as a country.
                    Follow the latest News updates, Entertainment and national updates.
                </div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <div text-wrap class="mx-4">Interesting Conversations and perspectives</div>
            <v-card-text class="text-wrap">A Learning journey that strives to make your individual experience
                adlubescent.
            </v-card-text>

            <v-divider class="mx-4"></v-divider>
            <v-card-text>
                <v-chip-group
                        v-model="selection"
                        active-class="deep-purple accent-4 white--text"
                        column
                >
                    <v-btn class="ma-2 success" large @click.prevent="openPage('/introSlides')" color="white">Get Started
                    </v-btn>

                    <v-btn class="ma-2" large @click.prevent="openPage('/login')" color="primary">Login</v-btn>

                </v-chip-group>
            </v-card-text>
            <v-card-actions>
                <v-container>
                    <v-card-text class="pa-0">Share With Friends</v-card-text>
                    <v-divider></v-divider>
                    <v-row no-gutters class="mt-6">
                        <v-col align-self="center">
                            <v-card class="pa-0" tile elevation="0">
                                <facebook-button
                                        class="share-button--circle share-button--outline"
                                        shareUrl="http://countalk.com/"
                                        shareDescription="Checkout this cool platform. Connect. Share. Engage. #Country"
                                        btnText
                                />
                            </v-card>
                        </v-col>
                        <v-col align-self="center">
                            <v-card class="pa-0" tile elevation="0">
                                <twitter-button
                                        class="share-button--circle share-button--outline"
                                        shareUrl="http://countalk.com/"
                                        shareDescription="Checkout this cool platform. Connect. Share. Engage. #Country"
                                        btnText
                                />
                            </v-card>
                        </v-col>
                        <v-col align-self="center">
                            <v-card class="pa-0" tile elevation="0">
                                <whats-app-button
                                        class="share-button--circle share-button--outline"
                                        shareUrl="http://countalk.com/"
                                        shareDescription="Checkout this cool platform. Connect. Share. Engage. #Country"
                                        btnText
                                />
                            </v-card>
                        </v-col>
                        <v-col align-self="center">
                            <v-card class="pa-0" tile elevation="0">
                                <pinterest-button
                                        class="share-button--circle share-button--outline"
                                        shareUrl="http://countalk.com/"
                                        shareDescription="Checkout this cool platform. Connect. Share. Engage. #Country"
                                        btnText
                                />
                            </v-card>
                        </v-col>
                        <v-col align-self="center">
                            <v-card class="pa-0" tile elevation="0">
                                <linked-in-button
                                        class="share-button--circle share-button--outline"
                                        shareUrl="http://countalk.com/"
                                        shareDescription="Checkout this cool platform. Connect. Share. Engage. #Country"
                                        btnText
                                />
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-actions>
        </v-card>
        <div class="text-center">
            <v-snackbar v-model="snackbar" :multi-line="true">
                {{ snackbarText }}
                <v-btn color="red" text @click="snackbar = false">
                    Close
                </v-btn>
            </v-snackbar>
        </div>
        <Footer></Footer>
    </div>
</template>


<script>
    import router from '@/router'
    import IntroToolBar from '@/components/shared/IntroToolBar'
    import Footer from '@/components/shared/Footer.vue'
    import axios from "axios";
    import TwitterButton from "vue-share-buttons/src/components/TwitterButton";
    import FacebookButton from "vue-share-buttons/src/components/FacebookButton";
    import PinterestButton from "vue-share-buttons/src/components/PinterestButton";
    import LinkedInButton from "vue-share-buttons/src/components/LinkedInButton";
    import WhatsAppButton from "vue-share-buttons/src/components/WhatsAppButton";


    export default {

        components: {IntroToolBar, Footer, TwitterButton, FacebookButton, PinterestButton, LinkedInButton, WhatsAppButton},
        data: () => ({
            showBack: false,
            loading: false,
            selection: 1,
            snackbar: false,
            snackbarText: '',
        }),

        methods: {
            openPage: function (pageLink) {
                router.push(pageLink)
            },
        },
    }
</script>

<style>
    .full-size {
        width: 100%;
        height: 100%;
    }
</style>
