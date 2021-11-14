<template>
    <yandex-map :settings="settings"
        :coords="center"
        style="width: 100%; height:100%"
        map-type="hybrid"
        :controls="controls"
        :zoom="zoom"
        @boundschange="changeZoom($event), changeCenterMap($event)"
    >
        <div v-for="(mission, mIndex) in missionsData" :key="mission.id">
            <div v-if='visibleMissionKey[mIndex]'>
                <div v-if="openMissionKey[mIndex]">
                    <ymap-marker v-for="(marker,index) in mission.points"
                        :key="marker"
                        :coords="marker" 
                        :marker-id="mIndex+':'+index" 
                        :hint-content="`Миссия: ${mIndex+1}. Точка: ${index+1}`"
                        :icon="{ color: 'blue',
                                content:`Миссия ${mIndex+1}:${index+1}`}"
                        @click="clikOnMission"
                    />
                    <ymap-marker 
                        marker-type="polyline"
                        :coords="mission.points"
                        :marker-id="Date.now()" 
                        :marker-stroke="{color: '#0044ff', width: 3}"
                    />
                </div>
                <div v-else>
                    <ymap-marker
                        :coords="mission.points[Math.ceil(mission.points.length/2)]" 
                        :marker-id="mIndex+':mission'" 
                        :hint-content="`Миссия: ${mIndex+1}`"
                        :icon="{ color: 'red',
                                content:`Миссия ${mIndex+1}`}"
                        @click="clikOnMission"
                    />
                </div>
            </div>
        </div>
        <div v-for="(log, lIndex) in logsData" :key="log.at_create">
            <div v-if='visibleLogsKey[lIndex]'>
                <div v-if="openLogKey[lIndex]">
                    <ymap-marker
                        :coords="log.points[0]"
                        :marker-id="lIndex+':start'"
                        :hint-content="`Лог ${lIndex+1}. Старт.`"
                        :icon="{ color: 'yellow',
                            content:`Лог ${lIndex+1}. Старт.`}"
                        @click="clikOnLog"
                    />
                    <ymap-marker
                        :coords="log.points[log.points.length-1]"
                        :marker-id="lIndex+':stop'"
                        :hint-content="`Лог ${lIndex+1}. Финиш.`"
                        :icon="{ color: 'yellow',
                            content:`Лог ${lIndex+1}. Финиш.`}"
                        @click="clikOnLog"
                    />
                    <ymap-marker
                        marker-type="polyline"
                        :coords="log.points"
                        :marker-id="Date.now()" 
                        :hint-content="`Лог ${lIndex+1}`"
                        :marker-stroke="{color: '#ff0000', width: 4}"
                    />
                </div>
                <div v-else>
                    <ymap-marker
                        :coords="log.points[Math.ceil(log.points.length/2)]"
                        :marker-id="lIndex+':marker'"
                        :hint-content="`Лог ${lIndex+1}`"
                        :icon="{ color: 'green',
                            content:`Лог ${lIndex+1}`}"
                        @click="clikOnLog"
                    />
                </div>
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
        logsData: {
            type: Array
        },
        openMissionKey: {
            type: Array
        },
        openLogKey: {
            type: Array
        },
        zoom: {
            type: Number
        },
        center: {
            type: Array
        },
        visibleMissionKey: {
            type: Array
        },
        visibleLogsKey: {
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
        clikOnMission(event){
            this.$emit('markerClik', event.originalEvent.target.properties._data.markerId)
        },
        clikOnLog(event){
            this.$emit('logClik', event.originalEvent.target.properties._data.markerId)
        }
    }
}
</script>

<style>
h1{
    color: #ff0000;
}
</style>