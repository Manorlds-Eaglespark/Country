<template>
<div>
<ToolBar></ToolBar>
<br />
<br />
    <v-container fluid>
      <div v-bind:class="{ disappear: removeTips }">
        <v-card class="mx-auto center-element container-padding" outlined>
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
            <v-btn @click="hideTips" color="orange" text>GOT IT</v-btn>
          </v-card-actions>
        </v-card>
       </div>

      <div v-bind:class="{ align_question_card: removeTips }">
        <v-card class="mx-auto  center-element container-padding">    
            <v-form v-model="valid" @submit="submit_post">
            <v-card-subtitle class="pb-0">  
                <v-row>
                <div class="container-padding">
                    <v-avatar color="purple lighten-5">
                    <v-icon>fa fa-user-circle</v-icon>
                    </v-avatar>
                    Share your mind ..
                </div>
                </v-row>
            </v-card-subtitle>
                <v-card-text class="text--primary">
                    <v-container>
                    <v-row>
                        <v-col cols="12" md="12">
                        <v-text-field v-model="question" label="Write here" required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-file-input
                                v-model="imageFiles"
                                placeholder="Attach some pictures"
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
                    <v-btn color="orange" type="submit" text>
                        Done
                    </v-btn>
                    
                <v-spacer></v-spacer>
                </v-card-actions>
            </v-form>
        </v-card>
      </div>
    </v-container>
    <br/><br/><br/>
    <br/><br/><br/>
    <BottomNavigation></BottomNavigation>
</div>
</template>

<script>
import ToolBar from '@/components/shared/ToolBar'
// import axios from axios
import BottomNavigation from '@/components/shared/BottomNavigation'
export default {
    components: {ToolBar, BottomNavigation},
    data: () => ({
      imageFiles: [],
      valid: false,
      removeTips: false,
      question: '',
    }),
    methods:({
      hideTips: function (e) {
          e.preventDefault();
        this.removeTips = !this.removeTips
    },
    
    submit_post: function(event){
        let ct = this;
        // userId = localStorage.getItem('user_id'):localStorage.getItem('user_id') ? 
        event.preventDefault()
        const url = 'https://wellcareapp.azurewebsites.net/api/SaveQuestionDetails?code=6NTBDfOz5DCwW62Y3G1ZY1Is7V1xreItWoFPFMqveBnup44gg7iSug=='
        axios.post(url, {
            "Id": 0,
            "UserId": "testUser",
            "QnDetails": "Test Question",
            "QnAttachments": [
                "Url_1",
                "Url_2"
            ],
            "ForumId": "testForum"
          },
          { headers: { 'Content-Type': 'application/json'}},
          )
        .then(function (response) {
          ct.snackbar=true
          ct.snackbar_text = response.data.message
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('country', response.data.country);
          router.push("/home");
          })
        .catch(function (error) {
          ct.snackbar=true
          ct.snackbar_text = error.response.data.error
        });
      }})
  }
</script>



<style>
.center-element{
  margin: 0 auto !important;
}
.container-padding{
    padding: 1px;
    margin: 1.75px !important;
}
.disappear{
  display: none;
}
.align_question_card{
  margin-top: 30% !important;
  margin-bottom: 50% !important;
  width: 100%;
}
</style>
