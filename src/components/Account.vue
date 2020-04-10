<template>
  <div>
    <ToolBar></ToolBar>
      <template>
        <v-card flat outlined class="mx-auto my-1" max-width="98%">
          <img v-if="profile_image" :src="profile_image" class="pt-2 account-image"/>
          <img v-else src="@/assets/idea.svg" class="pt-2 account-image"/>
          <div v-show="getShowEditForm">
            <v-form @submit.prevent="saveEditedDetail">
              <v-container>
                <v-row>
                  <v-col cols="12" md="1">
                    <v-file-input filled accept="image/*" v-model="profile_img" label="Change Your Profile Picture" prepend-icon="mdi-camera"></v-file-input>
                  </v-col>
                  <v-col cols="12" md="1">
                    <v-text-field v-model="user_name" label="Name" required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="1">
                    <v-text-field v-model="user_email" :rules="emailRules" label="E-mail" required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="1">
                    <v-text-field v-model="user_about" label="About Yourself" required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="1">
                    <v-btn class="ml-4 px-2" @click="showEditForm = !showEditForm" outlined large text >Cancel</v-btn>
                    <v-btn :loading="loading" class="on-the-right mr-4 px-2" type="submit" outlined large color="primary" text >Update Profile Info</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </div>
          <v-card-title>
            {{getName}} <v-spacer/><div class="my-2">
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
              <v-divider></v-divider>
              <v-row no-gutters class="pt-5">
                <v-col>
                  <v-card class="pa-0" tile elevation="0">
                    <v-btn @click="showBookmarkedPosts" text class="full-size">
                      <v-icon class="mx-1" color="grey darken-2">mdi-bookmark-outline</v-icon>
                    </v-btn>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card class="pa-0" tile elevation="0">
                    <v-btn @click="getUserShop" text class="full-size">
                      <v-icon outline class="mx-1" color="grey darken-2">mdi-storefront</v-icon>
                    </v-btn>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card class="pa-0" tile elevation="0">
                    <v-btn @click="showUserPosts" text class="full-size">
                      <v-icon outline class="mx-1" color="grey darken-2">mdi-face</v-icon>
                    </v-btn>
                  </v-card>
                </v-col>
              </v-row>
          </v-container>
          <div v-show="getHideShop">
            <Post v-if="getShowUserPosts" :posts="getAllPosts" :url="userPostsUrl"/>
            <Post v-else :posts="getAllPosts" :url="userBookmarkedPostsUrl"/>
          </div>
          <div v-show="showShopDetails">
            <div v-if="isShopOwner" @load="getUserShop">
              <v-card class="mx-auto" flat max-width="98%">
                <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"/>
                <v-card-title>
            {{shop.name}} <v-spacer/><div class="my-2">
                  <v-btn @click="showEditForm = !showEditForm" class="mx-2" color="primary" icon dark>
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn color="purple lighten-2" class="mx-2" icon outlined text>
                    <v-icon>mdi-share-variant</v-icon>
                  </v-btn>
                </div>
          </v-card-title>
                <div class="mx-4 my-2">
                  <span text class="subtitle-1">Tel:</span> {{shop.telephone}} <br/>
                </div>
                <div class="mx-4 my-2">
                  <span text class="subtitle-1">Address:</span> {{shop.address}} <br/>
                </div>
                <div class="mx-4 my-2">
                  <span text class="subtitle-1">Delivery:</span> {{shop.delivery}} <br/>
                </div>
                <v-expand-transition>
                  <div>
                    <v-card-text>
                      {{shop.description}}
                    </v-card-text>
                    <v-divider></v-divider>
                  </div>
                </v-expand-transition>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="mt-4 mb-2" text color="primary" outlined @click="show_add_category_flag = !show_add_category_flag"><v-icon>mdi-plus</v-icon> Product Category</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
                

                <div v-show="show_add_category">
                <v-row align="center">
                  <v-col class="mx-6" max-width="100%">
                      <v-card-text text class="title"> New Category Detail </v-card-text>
                        <v-form ref="form" class="mt-4" width="100%" @submit.prevent="createNewCategory">
                          <v-text-field v-model="newCategoryName" label="Name" required/>
                          <v-row>
                            <v-col>
                              <v-btn @click.prevent="show_add_category_flag = !show_add_category_flag" class="mx-2" large text type="submit"> Cancel </v-btn>
                              <v-btn :loading="loading" class="mx-2" large color="primary" text outlined type="submit"> Save Category </v-btn>
                            </v-col>
                          </v-row>
                        </v-form>
                  </v-col>
              </v-row>
              </div>


              <div v-for="category in shop.categories" :key="category.id">
                  <CategoryDetailCard :category="category"/>
              </div>


                  </v-card>
                </div>
                <div v-else>
                  <div v-show="!show_create_shop" class="my-4 mx-4">
                    <v-btn large @click="show_create_shop_flag = !show_create_shop_flag">Create a Shop</v-btn>
                  </div>
                  <div v-show="show_create_shop">
                    <v-row align="center">
                      <v-col class="mx-6" max-width="100%">
                          <v-card-text text class="title"> New Shop Detail </v-card-text>
                            <v-form ref="form" class="mt-4" width="100%" @submit.prevent="create_new_shop">
                              <v-text-field v-model="newShopName" label="Name" required/>
                              <v-text-field v-model="newShopTelephone" label="Telephone" required/>
                              <v-text-field v-model="newShopDescription" label="Describe your shop to clients" required/>
                              <v-text-field v-model="newShopDeliveries" label="Do you make deliveries?" required/>
                              <v-text-field v-model="newShopAddress" label="Address" required/>
                              <v-row>
                                <v-col>
                                  <v-btn @click.prevent="show_create_shop_flag = !show_create_shop_flag" class="mx-2" large text type="submit"> Cancel </v-btn>
                                  <v-btn :loading="loading" class="mx-2" large color="primary" text outlined type="submit"> Create Shop  </v-btn>
                                </v-col>
                          </v-row>
                        </v-form>
                  </v-col>
              </v-row>
              </div>
            </div>
          </div>
          <br/>
        </v-card>
      </template>
      <v-snackbar v-model="snackbar" :multi-line="multiLine">
        {{ snackbarText }}
        <v-btn color="red" text  @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
  <br/> <br/><br/>
  <BottomNavigation></BottomNavigation>
  </div>
</template>

<script>
  import axios from 'axios';
  import BottomNavigation from '@/components/shared/BottomNavigation';
  import ToolBar from '@/components/shared/ToolBar';
  import Post from '@/components/shared/Post';
  import CategoryDetailCard from '@/components/shared/userCategory/CategoryDetailCard'
  
export default {

    components:{ToolBar, BottomNavigation, Post, CategoryDetailCard},
    data: () => ({
      newShopName: '',
      newShopTelephone: '',
      newShopDeliveries: '',
      newShopAddress: '',
      newShopDescription:'',
      newCategoryName: '',
      show: false,
      snackbar: false,
      hide_shop: true,
      emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      tab: null,
      profile_img: [],
      showEditForm: false,
      show_user_posts: false,
      show_create_shop_flag: false,
      show_add_category_flag: false,
      user_data: {},
      loading: false,
      shopOwner: false,
      userPostsUrl: `${process.env.ROOT_API}/api/v1/posts/user?page=1`,
      userBookmarkedPostsUrl:`${process.env.ROOT_API}/api/v1/posts/bookmarked?page=`,
      snackbarText: '',
      user_name: '',
      user_email: '',
      user_country: '',
      profile_image: {},
      shop:{},
      allPosts: [],
      multiLine: false,
      user_about: '',
      headers: {
                'headers':{
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('token'),
                          }
                },
        
    }),
    computed:{
      show_add_category(){
        return this.show_add_category_flag;
      },
      show_create_shop(){
        return this.show_create_shop_flag;
      },
      isShopOwner(){
        return this.shopOwner
      },
      showShopDetails(){
        return !this.hide_shop
      },
      getHideShop(){
        return this.hide_shop;
      },
      getShowEditForm(){
        return this.showEditForm;
      },
      getName(){
        return this.user_name;
      },
      getEmail(){
        return this.user_email;
      },
      getAbout(){
        return this.user_about;
      },
      getCountry(){
        return this.user_country;
      },
      getAllPosts(){
        return this.allPosts;
      },
      getShowUserPosts(){
        return this.show_user_posts;
      }
    },
    created(){
        let ct = this;
        ct.shopOwner = (parseInt(localStorage.getItem('shopOwner')) === 1);
        const url = `${process.env.ROOT_API}/api/v1/user`;
        axios.get(url, ct.headers)
        .then(res=>{
          ct.user_data = res.data.user;
          ct.user_name = ct.user_data.name;
          ct.user_email = ct.user_data.email;
          ct.user_about = ct.user_data.about;
          ct.user_country = ct.user_data.country.name;
          ct.profile_image = ct.user_data.profile_img;
        })
        .catch(err=>{
          console.log(err.response.data);
        })

        axios.get(`${process.env.ROOT_API}/api/v1/posts/bookmarked?page=1`,ct.headers)
        .then(res =>{
          ct.allPosts = res.data.bookmarked_posts;
          })
        .catch(err => {
          console.log(err.response.data.error);
        });
    },
    methods:{
      getUserPosts(){
        let ct = this;
        const url = `${process.env.ROOT_API}/api/v1/posts/user`;
        axios.get(url, ct.headers)
        .then(res=>{
          ct.allPosts = res.data.posts;
        })
        .catch(err=>{
          console.log(err.response.data);
        })
      },

      getUserShop(){
        let ct = this;
        ct.hide_shop = !ct.hide_shop;
        const url = `${process.env.ROOT_API}/api/v1/shops`;
        axios.get(url, ct.headers)
        .then(res=>{
          ct.shop = res.data.shop;
          localStorage.setItem('shop_id', ct.shop.id);
        })
        .catch(err=>{
        })
      },

      saveEditedDetail(){
        let ct = this;
        const url = `${process.env.ROOT_API}/api/v1/user/edit`;
        ct.loading = true;
        
        let formdata = new FormData();

        if(ct.user_data.name != ct.user_name){
        formdata.append('name', ct.user_name);
        }
        if(ct.user_data.email != ct.user_email){
          formdata.append('email', ct.user_email);
        }
        if(ct.user_data.about != ct.user_about){
          formdata.append('about', ct.user_about);
        }
        if(ct.user_data.profile_img != ct.profile_img){
          formdata.append('profile_image', ct.profile_img);
        }
        
        axios.put(url, formdata, ct.headers)
        .then(res=>{
          ct.loading = false;
          ct.showEditForm = false;
          ct.snackbar = true;
          ct.snackbarText = res.data.message
        })
        .catch(err=>{
          ct.loading = false;
          ct.snackbar = true;
          ct.snackbarText = err.response.error;
        })
      },

      getBookmarkedPosts(){
        let ct = this;
        axios.get(`${process.env.ROOT_API}/api/v1/posts/bookmarked?page=1`,ct.headers)
        .then(res =>{
          ct.allPosts = res.data.bookmarked_posts;
          })
        .catch(err => {
          console.log(err.response.data.error);
        });
      },
      
      showUserPosts(){
        this.hide_shop = true;
        this.getUserPosts();
        this.show_user_posts = true;
      },
      showBookmarkedPosts(){
        this.hide_shop = true;
        this.getBookmarkedPosts();
        this.show_user_posts = false;
      },

      create_new_shop(){
        let ct = this;
        ct.loading = true;
        if(ct.newShopName == '' || ct.newShopTelephone =='' || ct.newShopDeliveries == '' || ct.newShopAddress == ''){
            ct.snackbar=true;
            ct.snackbarText = "Kindly fill in required details.";
            ct.loading=false;
        }
        else{
          const url = `${process.env.ROOT_API}/api/v1/shops`
          axios.post(url, {
              shop:{
		            name: ct.newShopName,
		            telephone: ct.newShopTelephone,
		            delivery: ct.newShopDeliveries,
                address: ct.newShopAddress,
                description: ct.newShopDescription
	            }
            },
            { headers: ct.headers
            })
          .then(function (response) {
            ct.snackbar=true;
            ct.loading = false;
            ct.snackbarText = response.data.message;
            localStorage.setItem('shopOwner', 1);
            ct.shopOwner = !ct.shopOwner;
            })
          .catch(function (error) {
            ct.snackbar = true
            ct.loading = false
            ct.snackbarText = error.response.data.error
          });
        }
      },
      createNewCategory(){
        let ct = this;
        ct.loading = true;
        if(ct.newCategoryName == ''){
            ct.snackbar = true;
            ct.snackbarText = "Add a category name first.";
            ct.loading = false;
        }
        else{
          const url = `${process.env.ROOT_API}/api/v1/shops/categories`;
          axios.post(url, {
              category: {
		            name: ct.newCategoryName,
		            shop_id: ct.shop.id
	            },
            },
              ct.headers,
            )
          .then(function (response) {
            ct.snackbar = true;
            ct.loading = false;
            ct.snackbarText = response.data.message;
            ct.show_add_category_flag = !ct.show_add_category_flag;
            })
          .catch(function (error) {
            ct.snackbar = true;
            ct.loading = false;
            ct.snackbarText = error.response.data.error;
          });
        }
      },
    }
}
</script>

<style>
  body{
    width: 100%;
    max-width: 100%;
    color: #333;
  }
  .account-image{
    height: auto;
    width: auto;
    max-width: 100%;
    max-height: 100%;
    display: block;
    margin: 0 auto !important;
  }
  .on-the-right{
    float: right;
  }
</style>
