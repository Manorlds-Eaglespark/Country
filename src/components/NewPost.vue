<template>
    <div>
        <ToolBar></ToolBar>
        <v-container fluid>
            <div v-bind:class="{ align_question_card: removeTips }">
                <v-card flat outlined class="mx-auto mb-4 center-element">
                    <v-form v-model="valid" @submit.prevent="submit_post">
                        <v-card-text class="text--primary">
                            <v-row>
                                <v-col>
                                    <div class="mb-4">
                                        <v-avatar color="blue lighten-5" class="mx-2">
                                            <img src="@/assets/idea.svg" class="pa-1"/>
                                        </v-avatar>
                                        Share your mind
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row class="pb-0 ma-0">
                                <v-col class="pb-0 ma-0">
                                    <v-textarea class="pb-0 ma-0"
                                                dense
                                                prepend-icon="mdi-comment-outline" flat outlined solo v-model="message"
                                                autofocus required/>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="mb-4">
                                    <template>
                                        <v-container fluid>
                                            <v-combobox
                                                    v-model="tags"
                                                    prepend-icon="fa fa-hashtag"
                                                    hide-selected
                                                    hint="Maximum of 5 tags"
                                                    label="Tags"
                                                    multiple
                                                    outlined
                                                    dense
                                                    :single-line="!multiLine"
                                                    persistent-hint
                                                    small-chips
                                            >
                                                <template v-slot:no-data>
                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-title>
                                                                Press <kbd>enter</kbd> to add a new one
                                                            </v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </template>
                                            </v-combobox>
                                        </v-container>
                                    </template>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-file-input
                                            v-model="imageFiles"
                                            placeholder="Attach images"
                                            label="Images"
                                            multiple
                                            filled
                                            accept="image/*"
                                            dense
                                            prepend-icon="mdi-camera"
                                    >
                                        <template v-slot:selection="{ text }">
                                            <v-chip small label color="primary">
                                                {{ text }}
                                            </v-chip>
                                        </template>
                                    </v-file-input>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <div class="ma-4">
                                <v-btn :loading="loading" type="submit" class="mx-2" fab dark large color="primary">
                                    <v-icon dark>mdi-send</v-icon>
                                </v-btn>
                            </div>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </div>
            <div v-bind:class="{ disappear: removeTips }">
                <v-card flat class="mx-auto mb-2 center-element container-padding" outlined>
                    <v-list-item three-line>
                        <v-list-item-content>
                            <v-list-item-title class="text my-4">Guidelines for great posts</v-list-item-title>
                            <div class="container-padding">
                                <v-list-item-subtitle>
                                    <v-icon>fa fa-star</v-icon>
                                    Be nice
                                </v-list-item-subtitle>
                            </div>
                            <div class="container-padding">
                                <v-list-item-subtitle>
                                    <v-icon>fa fa-star</v-icon>
                                    Respect other users
                                </v-list-item-subtitle>
                            </div>
                            <div class="container-padding">
                                <v-list-item-subtitle>
                                    <v-icon>fa fa-star</v-icon>
                                    Use respectful language.
                                </v-list-item-subtitle>
                            </div>
                        </v-list-item-content>
                    </v-list-item>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="hideTips" class="mr-4" color="primary" text>Dismiss</v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </v-container>
        <div class="text-center">
            <v-snackbar v-model="snackbar" :multi-line="multiLine">
                {{ snackbarText }}
                <v-btn color="red" text @click="snackbar = false">
                    Close
                </v-btn>
            </v-snackbar>
        </div>
        <br/><br/><br/>
        <br/><br/><br/>
        <BottomNavigation></BottomNavigation>
    </div>
</template>

<script>
    import ToolBar from '@/components/shared/ToolBar';
    import axios from 'axios';
    import router from '../router';
    import BottomNavigation from '@/components/shared/BottomNavigation';

    export default {
        components: {ToolBar, BottomNavigation},
        data: () => ({
            imageFiles: [],
            tags: null,
            loading: false,
            valid: false,
            removeTips: false,
            message: '',
            multiLine: true,
            snackbar: false,
            snackbarText: '',
        }),
        methods: ({
            hideTips: function (e) {
                e.preventDefault();
                this.removeTips = !this.removeTips
            },

            submit_post: function () {
                let ct = this;
                ct.loading = true;
                const url = `${process.env.ROOT_API}/api/v1/posts`;
                const headers = {
                    'headers': {
                        'Authorization': localStorage.getItem('token'),
                        'Content-Type': 'multipart/form-data',
                    }
                };
                const imagesNumber = ct.imageFiles.length;
                let formData = new FormData();
                if(ct.message==='' && imagesNumber === 0){
                    ct.loading = false;
                    ct.snackbar = true;
                    ct.snackbarText = "You can not share an empty post."
                }else {
                    formData.append('message', ct.message);
                    formData.append('time_posted', new Date().toLocaleString());
                    console.log(formData.get('time_posted'));
                    formData.append('images_number', imagesNumber.toString());
                    formData.append('tags', ct.tags ?ct.tags.join('_+_'):'');
                    for (let i = 0; i < imagesNumber; i++) {
                        formData.append("image" + i, ct.imageFiles[i])
                    }
                    axios.post(url, formData, headers)
                        .then(response => {
                            ct.loading = false;
                            ct.snackbar = true;
                            ct.snackbarText = response.data.message;
                            setTimeout(() => router.push("/home"), 500);
                        })
                        .catch(error => {
                            ct.loading = false;
                            ct.snackbar = true;
                            ct.snackbarText = error.response.data.error;
                        });
                }
            }
        })
    }
</script>

<style>
    .center-element {
        margin: 0 auto !important;
        overflow: hidden;
    }

    .disappear {
        display: none;
    }

    .align_question_card {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        width: 100%;
    }
</style>
