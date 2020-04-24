<template>
    <div class="mx-2 my-2">
        <v-card class="mx-auto my-2 whole-card" flat outlined>
            <div class="post-header">
                <v-avatar v-if="post.poster.profile_img" size="62">
                    <v-img alt="" :src="post.poster.profile_img"/>
                </v-avatar>
                <v-avatar v-else color="blue lighten-5" size="62">
                    <img src="@/assets/idea.svg" class="pa-1 account-image"/>
                </v-avatar> &nbsp;
                <span class="mx-2"><strong>{{post.poster.name}}</strong></span>
                <v-btn class="mx-2" icon @click="showProfile = !showProfile">
                    <v-icon>{{ showProfile ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
                <span class="time-text">
            <time-ago :datetime="Date.parse(post.posted_at)" refresh :locale="locale" :tooltip="tooltip"
                      :long="longString"></time-ago>
          </span>
            </div>
            <div v-show="showUserProfile">
                <template>
                    <v-card flat class="mx-auto" max-width="100%">
                        <img v-if="post.poster.profile_img" :src="post.poster.profile_img" class="mt-4 account-image"/>
                        <img v-else src="@/assets/idea.svg" class="mt-4 account-image"/>
                        <v-card-title>{{post.poster.name}}</v-card-title>
                        <v-card-subtitle class="pb-0">About:</v-card-subtitle>
                        <v-card-text class="text--primary">
                            <div>{{post.poster.about}}</div>
                        </v-card-text>
                        <v-divider/>
                    </v-card>
                </template>
            </div>

            <v-card-text class="pa-4 mx-2 text--primary">
                <p class="title font-weight-regular text-color-black">{{post.message}}</p>
            </v-card-text>
            <div v-show="imagesOnPost" class="img-container">
                <div v-if="moreThanOneImage">
                    <vue-images :imgs="images" :showthumbnails="true" :modalclose="true" :mousescroll="true"
                                :showclosebutton="true" :keyinput="true"/>
                </div>
                <v-img v-else :src="getFirstImage" contain></v-img>
            </div>
            <div>
                <div v-if="tags" class="mx-2 font-weight-medium">
                    <span v-for="(tag, index) in tags" :key="index">
                        <span class="mx-1 title">#{{tag}}</span>
                    </span>
                </div>
                <v-container>
                    <v-divider></v-divider>
                    <v-row no-gutters class="pt-2">
                        <v-col>
                            <v-card class="pa-0" tile elevation="0">
                                <v-btn @click.prevent="like_post" :loading="likeLoading" class="full-size body-1" text>
                                    {{(getLikes > 0)?getLikes:''}}
                                    <v-icon :color="getLikeColor">mdi-thumb-up-outline</v-icon>
                                    <span class="d-none d-md-flex d-lg-none"> {{getLikeWord?'Likes' : 'Like'}}</span>
                                </v-btn>
                            </v-card>
                        </v-col>
                        <v-col>
                            <v-card class="pa-0" tile elevation="0">
                                <v-btn :loading="commentsLoading" text class="full-size" @click.prevent="show_comments">
                                    {{(getCommentsCount > 0)?getCommentsCount:''}}
                                    <v-icon color="grey darken-2">mdi-comment-outline</v-icon>
                                    <span class="d-none d-md-flex d-lg-none"> {{getCommentWord?'Comments' : 'Comment'}}</span>
                                </v-btn>
                            </v-card>
                        </v-col>
                        <v-col>
                            <v-card class="pa-0" tile elevation="0">
                                <v-btn :loading="bookmarkLoading" text class="full-size" @click.prevent="bookmark_post">
                                    <v-icon :color="getBookmarkedColor">mdi-bookmark-outline</v-icon>
                                    <span class="d-none d-md-flex d-lg-none"> Bookmark</span>
                                </v-btn>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
                <Comment @changeMsg="closeComments" :items="getComments" :postId="postId"
                         v-if="showCommentSection"></Comment>
            </div>
        </v-card>
        <div class="text-center">
            <v-snackbar v-model="snackBar" :multi-line="multiLine">
                {{ snackbarText }}
                <v-btn color="red" text @click="snackBar = false">
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
        data: () => ({
            liked: true,
            tags: [],
            longString: false,
            showProfile: false,
            isActive: true,
            likeLoading: false,
            bookmarkLoading: false,
            commentsLoading: false,
            bookmarked: false,
            likeCount: 0,
            commentsCount: 0,
            likePlural: null,
            commentPlural: false,
            locale: "en",
            tooltip: false,
            multiLine: true,
            snackBar: false,
            snackbarText: '',
            moreThanOneImage: false,
            imagesOnPost: true,
            showComments: false,
            items: [],
            images: [],
            postId: null,
            headers: {
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                }
            },
        }),
        created() {
            this.tags = this.post.tags ? this.post.tags.split("_+_") : '';
            this.isActive = this.post.liked;
            this.likeCount = this.post.likes;
            this.images = this.post.images;
            this.postId = this.post.id;
            this.commentsCount = this.post.comments;
            this.likePlural = (this.post.likes > 1);
            this.CommentPlural = (this.post.comments > 1);
            this.bookmarked = this.post.bookmarked;
            this.moreThanOneImage = (this.images.length > 1);
            this.imagesOnPost = (!(this.images.length === 0));
        },
        computed: {
            showUserProfile() {
                return this.showProfile;
            },
            showMultipleImages() {
                return (this.imagesOnPost && this.moreThanOneImage)
            },
            getFirstImage() {
                return this.imagesOnPost ? this.images[0].imageUrl : "";
            },
            likeActive() {
                return this.isActive;
            },
            getLikes() {
                return this.likeCount;
            },
            getLikeWord() {
                return this.likePlural;
            },
            getCommentWord() {
                return this.CommentPlural;
            },
            getCommentsCount() {
                return this.commentsCount;
            },
            showCommentSection() {
                return this.showComments;
            },
            getComments() {
                return this.items;
            },
            getBookmarkedColor() {
                return this.bookmarked ? "orange" : "grey darken-3";
            },
            getLikeColor() {
                return this.likeActive ? "orange" : "grey darken-3";
            }
        },

        methods: {
            closeComments() {
                this.commentsCount = this.commentsCount + 1;
                this.showComments = false;
            },
            show_comments() {
                let ct = this;
                ct.commentsLoading = true;
                ct.showComments = !ct.showComments;
                let url = `${process.env.ROOT_API}/api/v1/comments/post/` + ct.postId;
                axios.get(url, ct.headers)
                    .then(res => {
                        ct.commentsLoading = false;
                        ct.items = res.data.comments;
                    })
                    .catch(err => {
                        ct.commentsLoading = false;
                        ct.snackBar = true;
                        ct.snackbarText = err.response.data.error;
                    })
            },

            like_post() {
                let ct = this;
                ct.likeLoading = true;
                const url = `${process.env.ROOT_API}/api/v1/likes/post/` + ct.postId
                axios.post(url, {}, ct.headers)
                    .then((response) => {
                        ct.likeLoading = false;
                        ct.likePlural = ct.likeCount > 1;
                        if (ct.isActive) {
                            ct.likeCount = ct.likeCount - 1
                            ct.likePlural = ct.likeCount > 1
                            ct.isActive = false;
                        } else {
                            ct.likeCount = ct.likeCount + 1
                            ct.isActive = true;
                            ct.likePlural = ct.likeCount > 1
                        }

                    })
                    .catch((error) => {
                        ct.likeLoading = false;
                        ct.snackBar = true;
                        ct.snackbarText = error.response.data.error;
                    })
            },

            bookmark_post() {
                let bk_context = this;
                bk_context.bookmarkLoading = true;
                const url = `${process.env.ROOT_API}/api/v1/bookmarks/posts/` + bk_context.postId
                axios.post(url, {}, bk_context.headers)
                    .then((response) => {
                        bk_context.bookmarkLoading = false;
                        bk_context.bookmarked = !bk_context.bookmarked
                        bk_context.snackBar = true;
                        bk_context.snackbarText = response.data.message;
                    })
                    .catch((error) => {
                        bk_context.bookmarkLoading = false;
                        bk_context.snackBar = true;
                        bk_context.snackbarText = error.response.data.error;
                    })
            }
        }
    }
</script>


<style>
    .post-image {
        height: auto;
        width: auto;
        max-width: 100%;
        max-height: 350px;
        display: block;
        margin: 0 auto !important;
    }

    .img-container {
        width: 100%;
        margin: 0 auto !important;
        text-align: center;
        overflow: hidden;
        max-width: 100%;
        padding: 0;
    }

    .post-header {
        padding-top: 14px;
        padding-left: 14px;
        padding-right: 14px;
        width: 100%;
        display: inline-block;
        overflow: hidden;
    }

    .whole-card {
        width: 100% !important;
        max-width: 100%;
        overflow: hidden;
        align-self: center;
    }

    .time-text {
        text-align: end;
        float: right;
        vertical-align: middle;
        padding-top: 14px;
        font-size: 0.9rem;
    }

    .no-padding {
        padding: 0;
    }

    .full-size {
        width: 100%;
        height: 100%;
    }

    .text-color-black {
        color: #333;
    }

    .account-image {
        width: 100%;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        display: block;
    }
</style>
