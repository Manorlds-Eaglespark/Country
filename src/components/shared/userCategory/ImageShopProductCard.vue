<template>
    <div v-show="showImage">
        <v-card class="ma-2" style="width:70%; !important; overflow: hidden">
            <img style="width: 100%;" :src="image.imageUrl" alt=""/>
            <div class="text-right">
                <v-btn :loading="loading" class="ma-2" fab light small @click.prevent="deleteImage">
                    <v-icon dark>mdi-delete</v-icon>
                </v-btn>
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
    import axios from 'axios';

    export default {
        name: "ImageShopProductCard",
        props: ["image"],
        data: () => ({
            showImage: true,
            loading: false,
            multiLine: true,
            snackBar: false,
            snackbarText: '',
        }),
        methods: {
            deleteImage() {
                const ct = this;
                const url = `${process.env.ROOT_API}/api/v1/products/images/${ct.image.id}`;
                ct.loading = true;
                axios.delete(url,{
                    'headers': {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token'),
                    }
                },)
                    .then(res => {
                        ct.loading = false;
                        ct.snackBar = true;
                        ct.snackbarText = res.data.message;
                        ct.showImage = false;
                    })
                    .catch(err => {
                        ct.loading = false;
                        ct.snackBar = true;
                        ct.snackbarText = err.response.data.error;
                    })
            }
        }
    }
</script>
