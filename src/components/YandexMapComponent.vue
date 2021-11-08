<template>
    <yandex-map :settings="settings"
        :coords="center"
        style="width: 100%; height:100%"
        map-type="hybrid"
        :controls="controls"
        :zoom="zoom"
        @boundschange="changeZoom($event), changeCenterMap($event)"
    >
        <div v-for="(mission, mIndex) in missionsData" :key="mission">
            <div>
                <ymap-marker v-for="(marker,index) in mission.points"
                    :key="marker"
                    :coords="marker" 
                    :marker-id="mIndex+':'+index" 
                    :hint-content="`Миссия: ${mIndex+1}`+`\nТочка: ${index+1}`.repeat(+openMissionKey[mIndex])"
                    :icon="{ color: 'blue'.repeat(+openMissionKey[mIndex])+'red'.repeat(+!openMissionKey[mIndex]),
                            content:`${mIndex+1}`+`:${index+1}`.repeat(+openMissionKey[mIndex])}"
                    @click="clikOnMarker"
                />
                <ymap-marker 
                    marker-type="polyline"
                    :coords="mission.points"
                    :marker-id="Date.now()" 
                    hint-content="Hint content 1"
                    :marker-stroke="{color: '#0044ff', width: 3}"
                />
            </div>
        </div>
    </yandex-map> 
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps'

export default {
    components: {
        yandexMap,
        ymapMarker
    },
    props:{
        missionsData: {
            type: Array
        },
        openMissionKey: {
            type: Array
        },
        zoom: {
            type: Number
        },
        center: {
            type: Array
        }
    },
    data() {
        return{
            settings: {
                    apiKey: '',
                    lang: 'ru_RU',
                    coordorder: 'latlong',
                    enterprise: false,
                    version: '2.1'
                    },
            controls: ['geolocationControl', 'rulerControl', 'typeSelector', 'zoomControl'],
        }
    },
    methods: {
        changeZoom(event){
            this.$emit('update:zoom', event.originalEvent.newZoom)
        },
        changeCenterMap(event){
            this.$emit('update:center', event.originalEvent.newCenter)
        },
        clikOnMarker(event){
            this.$emit('markerClik', event.originalEvent.target.properties._data.markerId)
        }
    }
}
</script>

<style>
h1{
    color: #ff0000;
}
</style>