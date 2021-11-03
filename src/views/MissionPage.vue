<template>
    <div class="mission_style">
        <div class="mission__info">
            <h3>Название мисии</h3>
            <p> {{ mission_data.mission_name }} </p>
            <h4>Автор</h4>
            <p> {{ mission_data.user_info}} </p>
            <h4>Описание</h4>
            <p> {{ mission_data.description }}</p>
            <h4>Дата создания полетного задания</h4>
            <p> {{ mission_data.at_create }} </p>
            <button class="btn btn-outline-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                Точки полетного задания
            </button>
            <div class="collapse" id="collapseExample">
                <div class="card card-body">
                    <div v-for="(point, index) in path"
                        :key="index"
                    >
                        {{index+1}}. Широта: {{point.lat}}   Долгота: {{point.lng}}
                    </div>
                </div>
            </div>
        </div>
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
            center: {lat: 55.652555002, lng: 37.537864359},
            path: [],
            api_key: 'AIzaSyADcUgUKhzdHE6bHZpJFUgDjRxmIDw7JA0',
            mission_id: '',
            mission_data: '',
            mapStyle: 'widht: 100%; height: 600px;'
        }
    },
    methods: {
        async fetchMissionParameter(){
            try{
                const response = await axios.get(`http://127.0.0.1:8000/api/yd/mission/${this.mission_id}`)
                this.mission_data = response.data['result']
                if (this.mission_data.points.length != 0){
                    this.center = {lat: parseFloat(this.mission_data.points[0].targetLat),
                                   lng: parseFloat(this.mission_data.points[0].targetLon)}
                    for(var point of this.mission_data.points){
                        this.path.push(
                            {lat: parseFloat(point.targetLat),
                            lng: parseFloat(point.targetLon)}
                        )
                    }
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
    margin: auto 15px auto 15px;
    padding: 5px;
}
.mission_style{
    display: flex;
    flex-direction: row;
    margin: 15px auto 0 auto;
    width: 90%;
    border: 2px solid gray;
    border-radius: 5px;
    padding: 5px;
}
.mission__info{
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}
</style>