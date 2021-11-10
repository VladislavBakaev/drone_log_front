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
            :logsData="logsData"
            v-model:zoom="mapZoom"
            v-model:center="centerOfMap"
            :openMissionKey="openMissionKey"
            :openLogKey="openLogsKey"
            @markerClik="markerClickEvent"
            @logClik="logClikEvent"
        />
        <missions-logs-viewer-component
            v-if="missionsLogsViewerShow"
            :missionsData="missionsData"
            :logsData="logsData"
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
            @update:logsData="setLogKeyState"
            v-model:missionsData="missionsData"
            v-model:logsData="logsData"
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
            logsData: [],
            openMissionKey: [],
            openLogsKey: [],
            mapZoom: 15,
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
            this.mapKey += 1
            setTimeout(()=>{this.mapKey += 1},50)
        },
        setMissionKeyState(data) {
            this.openMissionKey = []
            for(let i=0; i<data.length; i++){
                this.openMissionKey.push(false)
            }
        },
        setLogKeyState(data){
            this.openLogsKey = []
            for(let i=0; i<data.length; i++){
                this.openLogsKey.push(false)
            }
        },
        markerClickEvent(markerId){
            let missionId = parseInt(markerId.split(':'))
            this.openMissionKey[missionId] = !this.openMissionKey[missionId]
            this.mapKey +=1
        },
        logClikEvent(markerId){
            let logId = parseInt(markerId.split(':'))
            this.openLogsKey[logId] = !this.openLogsKey[logId]
            this.mapKey +=1            
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