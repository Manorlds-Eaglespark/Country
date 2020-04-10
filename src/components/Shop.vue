<template>
    <div>
        <ToolBar></ToolBar>
        <div class="mt-8">
            <v-text-field @keyup.enter="()=>{}" class="mx-2 my-0" elevation="0" outlined v-model="search" :rules="searchRules" label="Search something .." required/>
        </div>

        <adsContainer :ads="ads" />

         <v-snackbar
            v-model="snackbar"
            :multi-line="multiLine"
          >
            {{ snackbarText }}
            <v-btn
              color="red"
              text
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </v-snackbar>
        
        <BottomNavigation></BottomNavigation>
    </div>
</template>

<script>
import BottomNavigation from '@/components/shared/BottomNavigation';
import ToolBar from '@/components/shared/ToolBar';
import axios from 'axios'
import adsContainer from '@/components/shared/ads/adsContainer'
export default {
    name: "Shop",
    components: {BottomNavigation, ToolBar, adsContainer,},
    data:()=>({
        search: '',
        searchRules: [
        v => !!v || 'Key word required to search',
        ],
        ads: {},
        multiLine: true,
        snackbar: false,
        snackbarText: '',
    }),
    created(){
        let ct = this;
        const url =  `${process.env.ROOT_API}/api/v1/ads`;
        axios.get(url,
        {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        .then(res =>{
            ct.ads = res.data.ads;
            })
        .catch(err => {
            ct.snackbar = true;
            ct.snackbarText = err.response.data.error;
        });
        },
}
</script>
