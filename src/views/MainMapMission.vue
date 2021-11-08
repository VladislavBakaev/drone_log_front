<template>
    <div class="main-page-style">
        <side-nav-bar-component
            @missionCreateEvent="missionCreateEvent"
            @logCreateEvent="logCreateEvent"
            @missionAndLogEvent="missionAndLogEvent"
        />
        <yandex-map-component 
            :key="mapKey"
            :missionsData="missionDataConvert"
            v-model:zoom="mapZoom"
            v-model:center="centerOfMap"
        />
        <missions-logs-viewer-component
            v-if="missionsLogsViewerShow"
            :missionsData="missionsData"
        />
        <mission-create-component
            v-model:show="missionCreateDislogShow"
        />
        <log-create-component
            v-model:show="logCreateDialogShow"
        />
        <mission-log-searcher-component
            v-model:show="missionLogSearcherShow"
            @openViewerDiv="missionsLogsViewerShowEvent"
            @update:missionsData="setMissionKeyState"
            v-model:missionsData="missionsData"
        />
    </div>
</template>

<script>
import YandexMapComponent from '@/components/YandexMapComponent.vue'
import SideNavBarComponent from "@/components/SideNavBarComponent.vue"
import MissionCreateComponent from '@/components/MissionCreateComponent.vue'
import LogCreateComponent from '@/components/LogCreateComponent.vue'
import MissionLogSearcherComponent from '@/components/MissionLogSearcherComponent.vue'
import MissionsLogsViewerComponent from '@/components/MissionsLogsViewerComponent.vue'

export default {
    components: {
        YandexMapComponent,
        SideNavBarComponent,
        MissionCreateComponent,
        LogCreateComponent,
        MissionLogSearcherComponent,
        MissionsLogsViewerComponent
    },
    data() {
        return {
            missionCreateDislogShow: false,
            logCreateDialogShow: false,
            missionLogSearcherShow: false,
            missionsLogsViewerShow: false,
            yandexMapShow: true,
            mapKey: 0,
            missionsData: [],
            openMissionKey: [],
            mapZoom: 6,
            centerOfMap: [55.652555002, 37.537864359] 
        }
    },
    methods: {
        missionCreateEvent() {
            this.missionCreateDislogShow = true
        },
        logCreateEvent() {
            this.logCreateDialogShow = true
        },
        missionAndLogEvent() {
            this.missionLogSearcherShow = true
        },
        missionsLogsViewerShowEvent() {
            this.missionsLogsViewerShow = true
            this.mapKey = 1
        },
        setMissionKeyState(data) {
            this.openMissionKey = []
            for(let i=0; i<data.length; i++){
                this.openMissionKey.push(false)
            }
        }
    },
    computed: {
        missionDataConvert(){
            var missionDataConvert = []
            for(let i=0; i<this.missionsData.length; i++){
                missionDataConvert.push(JSON.parse(JSON.stringify(this.missionsData[i])))
                if(this.openMissionKey[i]){
                    for(let j=0; j<missionDataConvert[i].points.length; j++){
                        missionDataConvert[i].points[j] = [parseFloat(this.missionsData[i].points[j].targetLat),
                                                           parseFloat(this.missionsData[i].points[j].targetLon)]
                    }
                }
                else{
                    missionDataConvert[i].points = [[parseFloat(this.missionsData[i].points[0].targetLat),
                                                    parseFloat(this.missionsData[i].points[0].targetLon)]]
                }
            }
            return missionDataConvert
        }
    }
}
</script>

<style>
.main-page-style{
    height: 100vh;
    max-width: 100vw;
    display: flex;
    flex-direction: row;
}
</style>