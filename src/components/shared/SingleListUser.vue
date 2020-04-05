<template>
    <v-card class="mx-auto whole-card" flat outlined>
        <div class="post-header">
            <v-avatar color="purple lighten-5" size="48">
                <span class="white--text headline"><v-icon>fa fa-user</v-icon></span>
            </v-avatar> &nbsp;
            <strong>{{user.name}}</strong>
        </div>
    </v-card>
</template>

<script>
export default {
    props:["user"],
}
</script>

<style>
    .post-header{
        padding-top: 14px;
        padding-left: 14px;
        padding-right: 14px;
        width: 100%;
        display: inline-block;
        overflow: hidden;
    }
    .whole-card{
        width:98%;
        margin-top: 14px;
        overflow: hidden;
    }
</style>

