<template>
    <GoogleMap
        :api-key='api_key'
        :style="style"
        :center="center"
        :zoom="17"
    >
        <Polyline :options="{ path: path }" />
        <Marker v-for="(point, index) in path"
                :key="point"
                :options="{position: point, label: `${index+1}`}"
        />
    </GoogleMap>
</template>

<script>
import { GoogleMap, Polyline, Marker } from 'vue3-google-map'

export default {
    components: { 
        GoogleMap, Polyline, Marker
    },
    props: {
        api_key: String,
        center: Object,
        path: Object,
        style: String
    }
}
</script>

<style scoped>

</style>