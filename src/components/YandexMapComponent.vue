<template>
    <yandex-map :settings="settings"
        :coords="center"
        style="width: 100%; height:100%"
        map-type="hybrid"
        :controls="controls"
        :zoom="zoom"
        @boundschange="changeZoom($event), changeCenterMap($event)"
    >
        <div v-for="(mission) in missionsData" :key="mission">
            <ymap-marker v-for="(marker,index) in mission.points"
                :key="marker"
                :coords="marker" 
                :marker-id="Date.now()" 
                hint-content="some hint"
                :icon="{content:index+1}"
            />
            <ymap-marker 
                marker-type="polyline"
                :coords="mission.points"
                :marker-id="Date.now()" 
                hint-content="Hint content 1"
                :marker-stroke="{color: '#0044ff', width: 3}"
            />
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
        }
    }
}
</script>

<style>
h1{
    color: #0044ff;
}
</style>