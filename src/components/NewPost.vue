<template>
<div>
<ToolBar></ToolBar>
    <v-container fluid>
    
      <div v-bind:class="{ align_question_card: removeTips }">
        <v-card flat outlined class="mx-auto mb-4 center-element container-padding">    
            <v-form v-model="valid" @submit.prevent="submit_post">
            <v-card-subtitle class="pb-0">  
                <v-row>
                  <v-col cols="12" md="6">
                    <div class="container-padding">
                        <v-avatar color="purple lighten-5">
                        <v-icon>fa fa-user-circle</v-icon>
                        </v-avatar>
                        Share your mind ..
                    </div>
                  </v-col>
                </v-row>
            </v-card-subtitle>
                <v-card-text class="text--primary">
                    <v-container>
                      <v-row>
                          <v-col cols="12" md="6">
                            <v-textarea flat solo v-model="message" autofocus required />
                          </v-col>
                      </v-row>
                      <v-row>
                          <v-col cols="12" md="6">
                              <v-file-input
                                  v-model="imageFiles"
                                  placeholder="Attach an image"
                                  label="Images"
                                  multiple
                                  accept="image/png, image/jpeg, image/bmp"
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
                    </v-container>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                    <v-btn color="orange" outlined class= "mb-2 mr-4 subtitle-1 center-element" type="submit" text>
                      Share 
                    <v-icon outline color="orange">mdi-send-outline</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
      </div>
      <div v-bind:class="{ disappear: removeTips }">
        <v-card flat class="mx-auto mb-2 center-element container-padding" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">Guidelines for better posts</v-list-item-title>
                <div class="container-padding"><v-list-item-subtitle><v-icon>fa fa-star</v-icon> Use respectful language.</v-list-item-subtitle></div>
                <div class="container-padding"><v-list-item-subtitle><v-icon>fa fa-star</v-icon> Respect other users</v-list-item-subtitle></div>
                <div class="container-padding"><v-list-item-subtitle><v-icon>fa fa-star</v-icon> Be nice</v-list-item-subtitle></div>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="hideTips" class="pa-2 mb-2 mr-4" color="orange" text>Dismiss</v-btn>
          </v-card-actions>
        </v-card>
       </div>
    </v-container>
        <div class="text-center">
      <v-snackbar v-model="snackbar" :multi-line="multiLine">
        {{ snackbarText }}
        <v-btn color="red" text  @click="snackbar = false">
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
      valid: false,
      removeTips: false,
      message: '',
      multiLine: true,
      snackbar: false,
      snackbarText:'',
    }),
    methods:({
      hideTips: function (e) {
          e.preventDefault();
        this.removeTips = !this.removeTips
    },
    
    submit_post: function(){
        let ct = this;
        event.preventDefault()
        const url = 'http://127.0.0.1:5000/api/v1/posts';
        const headers = {
                  'headers':{
                              'Content-Type': 'application/json',
                              'Authorization': localStorage.getItem('token'),
                            }
                        };
        let formdata = new FormData();
        formdata.append('message', ct.message);
        axios.post(url, formdata, headers)
        .then(response => {
          ct.snackbar=true
          ct.snackbarText = response.data.message
          setTimeout(()=>router.push("/home"), 1500);
          })
        .catch(error => {
          ct.snackbar=true
          ct.snackbarText = error.response.data.error
        });
      }})
  }
</script>

<style>
.center-element{
  margin: 0 auto !important;
  overflow: hidden;
}
.container-padding{
    padding: 0.75px;
    margin: 1.75px !important;
}
.disappear{
  display: none;
}
.align_question_card{
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  width: 100%;
}
</style>
