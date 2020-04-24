<template>
    <div>
        <ToolBar/>
        <template>
            <v-card flat outlined class="mx-auto my-1" max-width="98%">
                <img v-if="showProfileImage" :src="showProfileImage" class="pt-2 account-image"/>
                <img v-else src="@/assets/idea.svg" class="pt-2 account-image"/>
                <div v-show="getShowEditForm">
                    <v-form @submit.prevent="saveEditedDetail">
                        <v-container>
                            <v-card-text text class="title"> Edit Account Details</v-card-text>
                            <v-row class="mx-2">
                                <v-col cols="12">
                                    <v-file-input filled accept="image/*" v-model="profile_img"
                                                  label="Change Profile Picture"
                                                  prepend-icon="mdi-camera"></v-file-input>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="user_name" label="Name" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="user_email" :rules="emailRules" label="E-mail"
                                                  required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea outlined v-model="user_about" label="About Yourself" required></v-textarea>
                                </v-col>
                                <v-col cols="12">
                                    <v-row no-gutters>
                                        <v-col class="mx-4">
                                            <v-card class="pa-0" tile elevation="0">
                                                <v-btn @click="showEditForm = !showEditForm" color="primary" large class="full-size text-capitalize" outlined>
                                                    Cancel
                                                </v-btn>
                                            </v-card>
                                        </v-col>
                                        <v-col class="mx-4">
                                            <v-card class="pa-0" tile elevation="0">
                                                <v-btn color="primary" class="full-size text-capitalize" lowercase--text large :loading="loading_update_profile"
                                                       type="submit">
                                                    Update Profile
                                                </v-btn>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </div>
                <v-card-title>
                    {{getName}}
                    <v-spacer/>
                    <div class="my-2">
                        <v-btn @click="showEditForm = !showEditForm" color="primary" icon dark>
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </div>
                </v-card-title>
                <v-card-text class="my-2 py-0">
                    Email: {{getEmail}}
                </v-card-text>
                <v-card-text class="my-2 py-0">
                    Country: {{getCountry}}
                </v-card-text>
                <v-card-subtitle>
                    {{getAbout}}
                </v-card-subtitle>
                <v-container>
                    <v-row no-gutters class="pt-2 mt-2">
                        <v-col class="mx-0">
                            <v-card class="pa-0" tile elevation="0">
                                <div>Rating</div>
                                <v-divider class="mb-2"></v-divider>
                                <v-rating :value="rating" background-color="amber" color="amber" dense half-increments readonly size="14"/>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row no-gutters class="pt-2 mt-2">
                        <v-col>
                            <v-card class="pa-0" tile elevation="0">
                                <span>Rate your experience. Leave a comment if you can</span>
                            </v-card>
                        </v-col>
                        <v-col>
                            <v-card class="pa-0" tile elevation="0">
                                <v-btn text outlined class="full-size text-capitalize" large @click="isGivingFeedbackFlag = !isGivingFeedbackFlag">
                                    <v-icon class="mx-1" color="primary">{{ isGivingFeedback ? 'mdi-chevron-down' :
                                        'mdi-comment-outline' }}
                                    </v-icon>
                                    feedback
                                </v-btn>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>

                <div v-show="isGivingFeedback">
                    <v-card flat outlined>
                        <v-form ref="form" width="100%" @submit.prevent="submitFeedback">
                            <v-row align="center" class="mx-2">
                                <v-col max-width="100%">
                                    <v-card-text text capitalized--text class="title mx-1 pa-0 mb-4">Experience report</v-card-text>
                                    <div class="mb-4">
                                        <v-rating dense half-increments class="my-4" background-color="amber" color="amber" v-model="rating"></v-rating>
                                    </div>
                                    <v-textarea class="mt-2" outlined v-model="message" label="Write a comment here" required/>
                                    <v-row no-gutters>
                                        <v-col class="mx-4">
                                            <v-card class="pa-0" tile elevation="0">
                                                <v-btn @click="isGivingFeedbackFlag = !isGivingFeedbackFlag" large color="primary" class="full-size text-capitalize" outlined
                                                >
                                                    Cancel
                                                </v-btn>
                                            </v-card>
                                        </v-col>
                                        <v-col class="mx-4">
                                            <v-card class="pa-0" tile elevation="0">
                                                <v-btn color="primary" class="full-size body-1 text-capitalize" lowercase--text large :loading="save_feedback_loading"
                                                       type="submit">
                                                    Submit
                                                </v-btn>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-row>
                            </v-row>
                        </v-form>
                    </v-card>
                </div>
                <v-container>

                    <v-row class="mx-2 pa-4">
                        <div>Exit</div>
                        <v-btn class="mx-2" @click="showExitOptionsFlag = !showExitOptionsFlag" color="primary" icon dark>
                            <v-icon>{{ showExitOptions ? 'mdi-chevron-down' : 'mdi-chevron-up'}}</v-icon>
                        </v-btn>
                    </v-row>
                    <v-divider/>
                    <v-row v-show="showExitOptions" no-gutters class="my-2">
                        <v-col>
                            <v-card class="pa-0 ma-2" tile elevation="0">
                                <v-btn @click.prevent="deleteAccount" color="error" large class="full-size text-capitalize fun-border" outlined>
                                    Delete Account
                                </v-btn>
                            </v-card>
                        </v-col>
                        <v-col>
                            <v-card class="pa-0 ma-2" tile elevation="0">
                                <v-btn color="warning" @click.prevent="logOut" class="full-size text-capitalize body-1 fun-border" outlined lowercase--text large
                                       :loading="loading">
                                    Log out
                                </v-btn>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row no-gutters class="pt-5">
                        <v-col>
                            <v-card class="pa-0" tile elevation="0">
                                <v-btn :loading="bookmarkedPostsLoading" @click="showBookmarkedPosts" text class="full-size">
                                    <v-icon class="mx-1" :color="getBookmarkedColor">mdi-bookmark-outline</v-icon>
                                </v-btn>
                            </v-card>
                        </v-col>
                        <v-col>
                            <v-card class="pa-0" tile elevation="0">
                                <v-btn :loading="userPostsLoading" @click="showUserPosts" text class="full-size">
                                    <v-icon outline class="mx-1" :color="getAllPostsColor">mdi-face</v-icon>
                                </v-btn>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
                <Post v-if="getShowUserPosts" :posts="getAllPosts" :url="userPostsUrl"/>
                <Post v-else :posts="getAllPosts" :url="userBookmarkedPostsUrl"/>

                <v-snackbar v-model="snackbar" :multi-line="multiLine">
                    {{ snackbarText }}
                    <v-btn color="red" text @click="snackbar = false">
                        Close
                    </v-btn>
                </v-snackbar>
            </v-card>
            <br/> <br/><br/>
            <BottomNavigation/>
        </template>
    </div>
</template>

<script>
    import axios from 'axios';
    import router from '@/router'
    import BottomNavigation from '@/components/shared/BottomNavigation';
    import ToolBar from '@/components/shared/ToolBar';
    import Post from '@/components/shared/Post';
    import CategoryDetailCard from '@/components/shared/userCategory/CategoryDetailCard'

    export default {

        components: {ToolBar, BottomNavigation, Post, CategoryDetailCard},
        data: () => ({
            show: false,
            snackbar: false,
            generalRules: [
                v => !!v || 'Field is required'
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            tab: null,
            message: '',
            profile_img: [],
            showEditForm: false,
            show_user_posts: false,
            user_data: {},
            loading: false,
            loading_update_profile: false,
            userPostsUrl: `${process.env.ROOT_API}/api/v1/posts/user?page=1`,
            userBookmarkedPostsUrl: `${process.env.ROOT_API}/api/v1/posts/bookmarked?page=`,
            snackbarText: '',
            user_name: '',
            user_email: '',
            user_country: '',
            profile_image: {},
            showExitOptionsFlag: false,
            rating: 0,
            save_feedback_loading: false,
            isGivingFeedbackFlag: false,
            bookmarkedPostsLoading: false,
            userPostsLoading: false,
            allPosts: [],
            multiLine: false,
            user_about: '',
            headers: {
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                }
            },

        }),
        computed: {
            showExitOptions(){
                return this.showExitOptionsFlag;
            },
            isGivingFeedback() {
                return this.isGivingFeedbackFlag;
            },
            showProfileImage(){
                return this.profile_image;
            },
            getShowEditForm() {
                return this.showEditForm;
            },
            getName() {
                return this.user_name;
            },
            getEmail() {
                return this.user_email;
            },
            getAbout() {
                return this.user_about;
            },
            getCountry() {
                return this.user_country;
            },
            getAllPosts() {
                return this.allPosts;
            },
            getShowUserPosts() {
                return this.show_user_posts;
            },
            getBookmarkedColor() {
                return this.show_user_posts ? "grey darken-3" : "primary";
            },
            getAllPostsColor() {
                return this.show_user_posts ? "primary" : "grey darken-3";
            }
        },
        created() {
            let ct = this;
            const url = `${process.env.ROOT_API}/api/v1/user`;
            axios.get(url, ct.headers)
                .then(res => {
                    const user_info = res.data.user;
                    ct.user_name = user_info.name;
                    ct.user_email = user_info.email;
                    ct.user_about = user_info.about;
                    ct.user_country = user_info.country.name;
                    ct.profile_image = user_info.profile_img;
                    ct.rating = user_info.rating==null?0: user_info.rating;
                })
                .catch(err => {
                    ct.snackBar = true;
                    ct.snackbarText = err.res.data.error;
                });

            axios.get(`${process.env.ROOT_API}/api/v1/posts/bookmarked?page=1`, ct.headers)
                .then(res => {
                    ct.allPosts = res.data.bookmarked_posts;
                })
                .catch(err => {
                    ct.snackBar = true;
                    ct.snackbarText = err.res.data.error;
                });
        },
        methods: {
            getUserPosts() {
                let ct = this;
                ct.userPostsLoading = true;
                const url = `${process.env.ROOT_API}/api/v1/posts/user`;
                axios.get(url, ct.headers)
                    .then(res => {
                        ct.userPostsLoading = false;
                        ct.allPosts = res.data.posts;
                    })
                    .catch(err => {
                        ct.snackBar = true;
                        ct.snackbarText = err.res.data.error;
                        ct.userPostsLoading = false;
                    })
            },


            saveEditedDetail() {
                let ct = this;
                const url = `${process.env.ROOT_API}/api/v1/user/edit`;
                ct.loading_update_profile = true;
                let formData = new FormData();

                if (ct.user_data.name != ct.user_name) {
                    formData.append('name', ct.user_name);
                }
                if (ct.user_data.email != ct.user_email) {
                    formData.append('email', ct.user_email);
                }
                if (ct.user_data.about != ct.user_about) {
                    formData.append('about', ct.user_about);
                }
                if (ct.user_data.profile_img != ct.profile_img) {
                    formData.append('profile_image', ct.profile_img);
                }

                axios.put(url, formData, ct.headers)
                    .then(res => {
                        ct.loading_update_profile = false;
                        ct.showEditForm = false;
                        ct.snackbar = true;
                        ct.snackbarText = res.data.message;
                        ct.user_data = res.data.user;
                        ct.user_name = ct.user_data.name;
                        ct.user_email = ct.user_data.email;
                        ct.user_about = ct.user_data.about;
                        ct.user_country = ct.user_data.country.name;
                        ct.profile_image = ct.user_data.profile_img;
                    })
                    .catch(err => {
                        ct.loading_update_profile = false;
                        ct.snackbar = true;
                        ct.snackbarText = err.response.error;
                    })
            },

            submitFeedback() {
                let ct = this;
                ct.save_feedback_loading = true
                if (ct.message === '' && ct.rating === 0) {
                    ct.snackbar = true
                    ct.snackbarText = "Please add both a rating and a comment.";
                    ct.save_feedback_loading = false;
                } else {
                    const url = `${process.env.ROOT_API}/api/v1/feedback`;
                    axios.post(url, {
                            rating: this.rating,
                            message: this.message,
                            at: new Date().toLocaleString()
                        },
                        ct.headers,
                    )
                        .then(function (res) {
                            ct.snackbar = true;
                            ct.snackbarText = res.data.message;
                            ct.save_feedback_loading = false;
                            ct.isGivingFeedbackFlag = false;
                            ct.message = '';
                        })
                        .catch(function (error) {
                            ct.snackbar = true;
                            ct.save_feedback_loading = false;
                            ct.snackbarText = error.response.data.error;
                        });
                }
            },

            getBookmarkedPosts() {
                let ct = this;
                ct.bookmarkedPostsLoading = true;
                axios.get(`${process.env.ROOT_API}/api/v1/posts/bookmarked?page=1`, ct.headers)
                    .then(res => {
                        ct.allPosts = res.data.bookmarked_posts;
                        ct.bookmarkedPostsLoading = false;
                    })
                    .catch(err => {
                        ct.bookmarkedPostsLoading = false;
                    });
            },

            showUserPosts() {
                this.getUserPosts();
                this.show_user_posts = true;
            },
            showBookmarkedPosts() {
                this.getBookmarkedPosts();
                this.show_user_posts = false;
            },

            logOut(){
                localStorage.setItem('token', '');
                localStorage.setItem('country', '');
                router.push("/login");
            },

            deleteAccount(){
                let ct = this;
                axios.delete( `${process.env.ROOT_API}/api/v1/user/delete`, ct.headers)
                    .then(res => {
                        localStorage.setItem('token', '');
                        localStorage.setItem('country', '');
                        router.push("/");
                    })
                    .catch(err => {
                        ct.snackbar = true;
                        ct.snackbarText = err.response.data.error;
                    });
            },
        }
    }
</script>

<style>
    body {
        width: 100%;
        max-width: 100%;
        color: #333;
    }

    .account-image {
        height: auto;
        width: auto;
        max-width: 100%;
        max-height: 100%;
        display: block;
        margin: 0 auto !important;
    }

    .on-the-right {
        float: right;
    }
    .full-size {
        width: 100%;
        height: 100%;
    }
</style>
