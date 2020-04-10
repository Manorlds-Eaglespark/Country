<template>
    <div>
        <div v-for="ad in ads" :key="ad.id">
            <adCard :ad="ad" />
        </div>
    </div>
</template>

<script>
import adCard from '@/components/shared/ads/adCard'
export default {
    name: "adsContainer",
    props: ["ads"],
    components: {adCard,}
}
</script>
