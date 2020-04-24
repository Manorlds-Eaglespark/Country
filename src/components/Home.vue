<template>
    <div>
        <ToolBar></ToolBar>

        <div class="mt-8">
            <v-text-field @keyup.enter="querySearch" class="mx-2 my-0" outlined v-model="search"
                          label="Search something .." required/>
        </div>
        <v-container v-if="searchActive">
            <v-row>
                <v-col cols="mx-12" offset="7">
                    <v-btn text class="text-capitalize" outlined
                           @click="searchActiveFlag = !searchActiveFlag">Close results
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-tabs grow v-model="tab">
                        <v-tab>{{getSearchUsersNumber}} &nbsp;
                            <v-icon class="mx-2">mdi-account-outline</v-icon>
                        </v-tab>
                        <v-tab>{{getSearchPostsNumber}} &nbsp;
                            <v-icon class="mx-2" outline color="grey darken-2">mdi-timeline-outline</v-icon>
                        </v-tab>
                    </v-tabs>

                    <v-tabs-items v-model="tab">
                        <v-tab-item>
                            <v-card>
                                <v-card-text>
                                    <div v-if="searchUsers.length > 0">
                                        <Users :users="getSearchUsers"/>
                                    </div>
                                    <div v-else class="align-center pa-4 error--text body-1">
                                        No users with that name found.
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card>
                                <Post :posts="getSearchPosts" :url="searchUrl"/>
                            </v-card>
                        </v-tab-item>
                    </v-tabs-items>
                </v-col>
            </v-row>
        </v-container>

        <Post :posts="posts" :url="url"></Post>
        <div class="text-center">
            <v-snackbar
                    v-model="snackbar"
                    :multi-line="multiLine"
            >
                {{ snackbar_text }}
                <v-btn
                        color="red"
                        text
                        @click="snackbar = false"
                >
                    Close
                </v-btn>
            </v-snackbar>
        </div>
        <br/>
        <br/>
        <br/>
        <BottomNavigation></BottomNavigation>
    </div>
</template>

<script>
    import ToolBar from '@/components/shared/ToolBar'
    import Post from '@/components/shared/Post'
    import axios from 'axios'
    import BottomNavigation from '@/components/shared/BottomNavigation'
    import Users from '@/components/shared/Users'

    export default {

        components: {ToolBar, BottomNavigation, Post, Users},
        data: () => ({
            search: '',
            searchActiveFlag: false,
            usersResultsNumber: 0,
            postsResultsNumber: 0,
            searchUsers: [],
            searchPosts: [],
            tab: null,
            searchUrl: `${process.env.ROOT_API}/api/v1/search?page=`,
            posts: [],
            snackbar: false,
            multiLine: true,
            snackbar_text: '',
            url: `${process.env.ROOT_API}/api/v1/posts/country?page=`,
        }),

        created() {
            let ct = this;
            axios.get(ct.url+1,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token')
                    }
                })
                .then(res => {
                    ct.posts = res.data.posts;
                })
                .catch(err => {
                    ct.snackbar = true;
                    ct.snackbar_text = err.response.data.error;
                });
        },

        computed: {
            getSearchUsersNumber() {
                return this.usersResultsNumber;
            },
            getSearchPostsNumber() {
                return this.postsResultsNumber;
            },
            getSearchPosts() {
                return this.searchPosts;
            },
            getSearchUsers() {
                return this.searchUsers;
            },
            searchActive() {
                return this.searchActiveFlag;
            }
        },

        methods: {
            querySearch: function () {
                let ct = this;
                ct.searchUsers = [];
                ct.searchPosts = [];
                const headers = {
                    'headers': {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token'),
                    }
                };
                const url = `${process.env.ROOT_API}/api/v1/search`;
                if (ct.search.length < 1) {
                    ct.snackbar = true;
                    ct.snackbar_text = "We can only search for something.";
                } else {
                    axios.post(url, {"search": ct.search}, headers)
                        .then(res => {
                            ct.searchActiveFlag = true;
                            ct.usersResultsNumber = res.data.people_number;
                            ct.postsResultsNumber = res.data.posts_number;
                            ct.searchUsers = res.data.people;
                            ct.searchPosts = res.data.posts;
                            ct.search = '';
                        })
                        .catch(err => {
                            ct.snackbar = true;
                            ct.snackbar_text = err.response.data.error;
                        });
                }
            },
        },
    }
</script>

<style>
    body {
        width: 100%;
        max-width: 100%;
        padding: 0;
        margin: 0;
    }

    .close {
        display: inline;
    }

    .full {
        width: 100%;
        display: block;
        max-width: 100%;
    }
</style>
