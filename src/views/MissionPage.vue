<template>
    <div class="mission_style">
        <div class="map__style">
            <google-map-component
                :api-key="api_key"
                :center="center"
                :path="path"
                :style="mapStyle"
            />
        </div>
    </div>
</template>

<script>
import GoogleMapComponent from "@/components/GoogleMapComponent.vue"
import { useRoute } from 'vue-router'
import axios from 'axios'

export default {
    components: {
        GoogleMapComponent
    },
    data() {
        return { 
            center: {},
            path: [],
            api_key: 'AIzaSyADcUgUKhzdHE6bHZpJFUgDjRxmIDw7JA0',
            mission_id: '',
            mission_data: '',
            mapStyle: 'widht: 100%; height: 600px'
        }
    },
    methods: {
        async fetchMissionParameter(){
            try{
                const response = await axios.get(`http://127.0.0.1:8000/api/yd/mission/${this.mission_id}`)
                this.mission_data = response.data['result']
                this.center = {lat: parseFloat(this.mission_data.points[0].targetLat),
                               lng: parseFloat(this.mission_data.points[0].targetLon)}
                for(var point of this.mission_data.points){
                    this.path.push(
                        {lat: parseFloat(point.targetLat),
                         lng: parseFloat(point.targetLon)}
                    )
                }
            }
            catch (e){
                alert("Error")
            }
        }
    },
    mounted(){
        const route = useRoute();  
        this.mission_id = route.params.id
        this.fetchMissionParameter()
    }
}
</script>

<style scoped>
.map__style{
    width: 70%;
    margin: 15px auto 0 auto;
}
.mission_style{
    display: flex;
    flex-direction: column;
}
</style>