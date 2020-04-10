<template>
    <div>
        <v-card v-show="notDeleted" class="mx-auto my-3" width="98%" flat outlined>
            <v-card-text>
                <v-row>
                    <v-col>
                        <p class="display-1 text--primary">
                            {{name}}
                        </p>
                    </v-col>
                    <v-col>
                        <v-btn text class="full-size" @click="showProductDetailFlag = !showProductDetailFlag">
                            <v-icon>{{ showProductDetail ? 'fa fa-caret-up' : 'fa fa-caret-down' }}</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn text :color="hasRunningAd" class="full-size"
                               @click="showCreateAdFormFlag = !showCreateAdFormFlag">
                            <v-icon class="mr-1">fa fa-tag</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <div v-show="showCreateAdForm">
                    <v-form @submit.prevent="saveNewAd">
                        <v-row>
                            <v-col cols="12" md="1">
                                <v-text-field v-model="adDescription" label="Describe Offer" required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="1">
                                <v-text-field v-model="discounted_price" label="Discounted Price"
                                              required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="1">
                                <div width="100%">
                                    <datepicker width="100%" placeholder="Select offer end date" v-model="adEndDate"
                                                calendar-button-icon="fa fa-calendar"
                                                :calendar-button="showCalendarIcon"></datepicker>
                                </div>
                            </v-col>
                            <v-col cols="12" md="1">
                                <v-btn class="ml-4 px-2" @click.prevent="showCreateAdFormFlag = !showCreateAdFormFlag" large text>Cancel
                                </v-btn>
                                <v-btn :loading="loading" class="on-the-right mr-4 px-2" type="submit" outlined large
                                       color="primary" text>Save New Ad
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </div>
                <div v-show="showProductDetail">
                    <div v-show="hideProductActionsMenu">
                    <v-row>
                        <v-col>
                            <v-btn @click.prevent="deleteProduct" :loading="loading" text class="full-size">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col>
                            <v-btn text class="full-size"
                                   @click="showUpdateProductFormFlag = !showUpdateProductFormFlag">
                                <v-icon>fa fa-edit</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col>
                            <v-btn text class="full-size" @click="addProductImageFormFlag = !addProductImageFormFlag">
                                <img src='@/assets/add_photo_alternate.svg' alt=""/>
                            </v-btn>
                        </v-col>
                    </v-row>
                    </div>
                    <div v-show="addProductImageForm">
                        <v-card class="pa-4 ma-1" style="overflow:hidden; display: block;" flat outlined>
                            <form @submit.prevent="saveImageFile">
                                <v-row>
                                    <v-col cols="12" class="py-0 my-0">
                                        <v-file-input v-model="addedImage" label="Select Image (JPG/PNG)" accept="image/*"
                                                      prepend-icon="mdi-camera" outlined dense></v-file-input>
                                    </v-col>
                                </v-row>
                                <v-row class="align-content-center">
                                    <v-col class="py-0 my-0 align-center">
                                        <v-btn class="mx-auto" outlined @click="addProductImageFormFlag = !addProductImageFormFlag"> Cancel</v-btn>
                                    </v-col>
                                    <v-col class="py-0 my-0">
                                        <v-btn class="mx-auto" color="primary" :loading="loading" type="submit"> Add Image</v-btn>
                                    </v-col>
                                </v-row>
                            </form>
                        </v-card>
                    </div>
                    <div v-show="showUpdateProductForm">
                        <v-form @submit.prevent="updateProduct">
                            <v-row>
                                <v-col cols="12" md="1">
                                    <v-text-field v-model="name" label="Name" required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="1">
                                    <v-text-field v-model="use_status" label="Use status" required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="1">
                                    <v-text-field v-model="price" label="Price" required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="1">
                                    <v-text-field v-model="description" label="Description" required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="1">
                                    <v-btn class="ml-4 px-2"
                                           @click.prevent="showUpdateProductFormFlag = !showUpdateProductFormFlag"
                                           outlined large text>Cancel
                                    </v-btn>
                                    <v-btn :loading="loading" class="on-the-right mr-4 px-2" type="submit" outlined
                                           large color="primary" text>Update Product
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </div>
                    <p>{{use_status}}</p>
                    <p>{{price}}</p>
                    <p>{{description}}</p>
                    <div class="imageContainer" v-for="(image, index) in getImagesAvailable" :key="index">
                        <ImageShopProductCard :image="image"/>
                    </div>

                </div>
            </v-card-text>
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
    import axios from 'axios';
    import datepicker from 'vuejs-datepicker';
    import {returnStatement} from '@babel/types';
    import ImageShopProductCard from '@/components/shared/userCategory/ImageShopProductCard'

    export default {
        components: {datepicker, ImageShopProductCard},
        data: () => ({
            showUpdateProductFormFlag: false,
            name: '',
            use_status: '',
            price: '',
            description: '',
            addedImage: null,
            showCalendarIcon: true,
            showProductDetailFlag: false,
            showCreateAdFormFlag: false,
            hasRunningAdFlag: false,
            addProductImageFormFlag: false,
            images: [],
            adEndDate: '',
            discounted_price: '',
            adDescription: '',
            loading: false,
            snackBar: false,
            snackbarText: '',
            multiLine: true,
            notDeletedFlag: true,
            headers: {
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                }
            },
        }),
        props: ["product"],
        computed: {
            showProductDetail() {
                return this.showProductDetailFlag;
            },
            notDeleted() {
                return this.notDeletedFlag;
            },
            showUpdateProductForm() {
                return this.showUpdateProductFormFlag;
            },
            showCreateAdForm() {
                return this.showCreateAdFormFlag;
            },
            hasRunningAd() {
                return this.hasRunningAdFlag ? 'warning' : 'primary';
            },
            addProductImageForm() {
                return this.addProductImageFormFlag;
            },
            getImagesAvailable() {
                return this.images;
            },
            hideProductActionsMenu(){
                return !this.addProductImageFormFlag;
            }
        },
        created() {
            this.name = this.product.name;
            this.use_status = this.product.use_status;
            this.price = this.product.price;
            this.description = this.product.description;
            this.images = this.product.images;
        },
        methods: {
            deleteProduct() {
                const ct = this;
                ct.loading = true;
                const url = `${process.env.ROOT_API}/api/v1/shops/categories/products/` + ct.product.id;
                axios.delete(url, ct.headers)
                    .then(res => {
                        ct.loading = false;
                        ct.snackBar = true;
                        ct.notDeletedFlag = false;
                        ct.snackbarText = res.data.message;
                    })
                    .catch(err => {
                        ct.loading = false;
                        ct.snackBar = true;
                        ct.snackbarText = err.response.data.error;
                    })
            },
            updateProduct() {
                const ct = this;
                ct.loading = true;
                var url = `${process.env.ROOT_API}/api/v1/shops/categories/products/` + ct.product.id;
                axios.put(url, {
                    product: {
                        name: ct.name,
                        use_status: ct.use_status,
                        description: ct.description,
                        price: ct.price,
                    }
                }, ct.headers)
                    .then(res => {
                        ct.loading = false;
                        ct.snackBar = true;
                        ct.snackbarText = res.data.message;
                    })
                    .catch(err => {
                        ct.loading = false;
                        ct.snackBar = true;
                        ct.snackbarText = err.response.data.error;
                    })
            },

            saveImageFile() {
                let ct = this;
                ct.loading = true;
                if (ct.addedImage == null) {
                    ct.loading = false;
                    ct.snackBar = true;
                    ct.snackbarText = "First select an image to save first.";
                } else {
                    const url = `${process.env.ROOT_API}/api/v1/products/${ct.product.id}/images`;
                    let formData = new FormData();
                    formData.append('image', ct.addedImage);
                    axios.post(url, formData, {
                        'headers': {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': localStorage.getItem('token'),
                        }
                    },)
                        .then(res => {
                            ct.loading = false;
                            ct.snackBar = true;
                            ct.snackbarText = res.data.message;
                            ct.images = ct.images.concat(res.data.image);
                            ct.addProductImageFormFlag = !ct.addProductImageFormFlag;
                        })
                        .catch(err => {
                            ct.loading = false;
                            ct.snackBar = true;
                            ct.snackbarText = err.response.data.error;
                        })
                }
            },
            saveNewAd() {
                const ct = this;
                ct.loading = true;
                const url = `${process.env.ROOT_API}/api/v1/ads`;
                axios.post(url, {
                    ad: {
                        description: ct.adDescription,
                        product_id: ct.product.id,
                        discounted_price: ct.discounted_price,
                        duration: ct.adEndDate,
                        shop_id: localStorage.getItem('shop_id')
                    }
                }, ct.headers)
                    .then(res => {
                        ct.loading = false;
                        ct.snackBar = true;
                        ct.hasRunningAdFlag = true;
                        ct.snackbarText = res.data.message;
                        ct.showCreateAdFormFlag = false;
                        ct.adEndDate = '';
                        ct.discounted_price = '';
                        ct.adDescription = '';
                    })
                    .catch(err => {
                        ct.loading = false;
                        ct.snackBar = true;
                        ct.snackbarText = err.response.data.error;
                    })
            },
        }
    }
</script>

<style scoped>
    .example {
        background: #f2f2f2;
        border: 1px solid #ddd;
        padding: 0em 1em 1em;
        margin-bottom: 2em;
    }

    .imageContainer {
        width: 100%;
        display: block;
        overflow: hidden;
        margin: 0 auto !important;
    }
</style>
