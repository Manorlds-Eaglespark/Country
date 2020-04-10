<template>
<div v-show="isCategoryNotDeleted">
    <v-card flat outlined class="mx-auto my-2" max-width="98%">
                  <v-card-text>
                    <p class="headline text--primary">
                      {{name}}
                    </p>
                     <div v-show="showEditCategory">
                        <v-form @submit.prevent="updateCategory">
                        <v-row>
                        <v-col cols="12" md="1">
                            <v-text-field v-model="name" label="Name" required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="1">
                            <v-btn class="ml-4 px-2" @click.prevent="showEditCategoryFlag = !showEditCategoryFlag" outlined large color="warning" text >Cancel</v-btn>
                            <v-btn :loading="loading" class="on-the-right mr-4 px-2" type="submit" outlined large color="primary" text >Update Category</v-btn>
                        </v-col>
                        </v-row>
                        </v-form>
                    </div>

                    <div v-show="getShowCreateProductForm">
                      <v-form @submit.prevent="createNewProduct">
                        <v-container>
                          <v-row>
                            <v-card-text text class="title"> New Product Form </v-card-text>
                            <v-col cols="12" md="1">
                              <v-text-field v-model="pName" label="Name" required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="1">
                              <v-text-field v-model="pUseStatus" label="Use status" required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="1">
                              <v-text-field v-model="pPrice" label="Price" required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="1">
                              <v-text-field v-model="pDescription" label="Description" required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="1">
                              <v-btn class="ml-4 px-2" @click="getShowCreateProductFormFlag = !getShowCreateProductFormFlag" outlined large color="warning" text >Cancel</v-btn>
                              <v-btn :loading="loading" class="on-the-right mr-4 px-2" type="submit" outlined large color="primary" text >Create Product</v-btn>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-form>
                    </div>
                  </v-card-text>
                   <v-row no-gutters class="pt-2">
                  <v-col>
                    <v-card class="pa-0" tile elevation="0">
                      <v-btn text class="full-size" @click.prevent="deleteCategory">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-card>
                  </v-col>
                  <v-col>
                    <v-card class="pa-0" tile elevation="0">
                      <v-btn text class="full-size" @click="showEditCategoryFlag = !showEditCategoryFlag">
                        <v-icon>fa fa-edit</v-icon>
                      </v-btn>
                    </v-card>
                  </v-col>
                  <v-col>
                    <v-card class="pa-0" tile elevation="0">
                      <v-btn @click="getShowCreateProductFormFlag = !getShowCreateProductFormFlag" text class="full-size">
                        <v-icon>mdi-plus-circle-outline</v-icon>
                      </v-btn>
                    </v-card>
                  </v-col>
                  <v-col>
                    <v-card class="pa-0" tile elevation="0">
                      <v-btn :loading="loading" @click="getCategoryProducts(category.id)" class="full-size body-1" text>
                        <v-icon>{{ showProducts ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                      </v-btn>
                    </v-card>
                  </v-col>
                </v-row>
                <div v-show="showProducts" v-for="product in categoryProducts" :key="product.id">
                  <CategoryProductCard :product="product"/>
                </div>

                <div class="text-center">
                  <v-snackbar v-model="snackBar" :multi-line="multiLine">
                    {{ snackbarText }}
                    <v-btn color="red" text  @click="snackBar = false">
                      Close
                    </v-btn>
                  </v-snackbar>
                </div>
    </v-card>
</div>
</template>

<script>
import axios from 'axios';
import CategoryProductCard from '@/components/shared/userCategory/CategoryProductCard';

export default {
    data:()=>({
      pName: '',
      pUseStatus: '',
      pPrice: '',
      pDescription: '',
      name: '',
      showEditCategoryFlag: false,
      categoryProducts: {},
      isCategoryNotDeletedFlag: true,
      getShowCreateProductFormFlag: false,
      multiLine: true,
      snackBar: false,
      snackbarText: '',
      loading: false,
      show_products_flag: false,
      headers: {
                'headers':{
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('token'),
                          }
                },
    }),
    props: ["category"],
    components:{CategoryProductCard},
    computed:{
      showProducts(){return this.show_products_flag;},
      isCategoryNotDeleted(){return this.isCategoryNotDeletedFlag;},
      showEditCategory(){return this.showEditCategoryFlag;},
      getShowCreateProductForm(){return this.getShowCreateProductFormFlag;}
    },
    created(){
      this.name = this.category.name;
    },
    methods: {
      deleteCategory(){
            const ct = this;
            ct.loading = true;
            var url = `${process.env.ROOT_API}/api/v1/shops/categories/`+ct.category.id;
            axios.delete(url, ct.headers)
            .then(res=>{
                ct.loading = false;
                ct.snackBar = true;
                ct.isCategoryNotDeletedFlag = false;
                ct.notDeletedFlag = false;
                ct.snackbarText = res.data.message;
            })
            .catch(err=>{
                ct.loading = false;
                ct.snackBar = true;
                ct.snackbarText = err.response.data.error;
          })
        },
         updateCategory(){
            const ct = this;
            ct.loading = true;
            var url = `${process.env.ROOT_API}/api/v1/shops/categories/`+ct.category.id;
            axios.put(url,{
                category: {
                    name: ct.name,
                }
            }, ct.headers)
            .then(res=>{
              ct.showEditCategoryFlag = false;
              ct.loading = false;
              ct.snackBar = true;
              ct.snackbarText = res.data.message;
            })
            .catch(err=>{
                ct.loading = false;
                ct.snackBar = true;
                ct.snackbarText = err.response.data.error;
          })
        },
        createNewProduct(){
            const ct = this;
            ct.loading = true;
            var url = `${process.env.ROOT_API}/api/v1/shops/categories/${ct.category.id}/products`;
            axios.post(url,{
                product: {
                    name: ct.pName,
                    use_status: ct.pUseStatus,
                    price: ct.pPrice,
                    description: ct.pDescription
                }
            }, ct.headers)
            .then(res=>{
              ct.getShowCreateProductFormFlag = false;
              ct.loading = false;
              ct.snackBar = true;
              ct.snackbarText = res.data.message;
            })
            .catch(err=>{
                ct.loading = false;
                ct.snackBar = true;
                ct.snackbarText = err.response.data.error;
          })
        },
        
        getCategoryProducts(category_id){
            const ct =this;
            ct.show_products_flag = !ct.show_products_flag;
            ct.loading = true;
            if(ct.show_products_flag){
              ct.categoryProducts = {};
              axios.get(`${process.env.ROOT_API}/api/v1/shops/categories/${category_id}/products`,ct.headers)
              .then(res =>{
                ct.loading = false;
                ct.categoryProducts = res.data.products;
              })
              .catch(err => {
                ct.snackbar = true;
                ct.snackbarText = error.response.data.error;
              });
            }
            else{
                ct.loading = false;
            }
        },
    }
}
</script>
