<template>
<div>
    <div  v-for="user in users" :key="user.index" >
      <SingleListUser :user = "user"/>
    </div> 
</div> 
</template>
<script>
import SingleListUser from '@/components/shared/SingleListUser'
export default {
    props:["users"],
    components:{SingleListUser}
}
</script>
