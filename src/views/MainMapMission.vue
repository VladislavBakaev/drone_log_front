<template>
    <div class="main-page-style">
        <side-nav-bar-component
            @missionCreateEvent="missionCreateEvent"
            @logCreateEvent="logCreateEvent"
            @missionAndLogEvent="missionAndLogEvent"
        />
        <yandex-map-component 
            :key="mapKey"
            :missionsData="missionDataConvertCoord"
            :logsData="logsData"
            v-model:zoom="mapZoom"
            v-model:center="centerOfMap"
            :openMissionKey="openMissionKey"
            :openLogKey="openLogsKey"
            :visibleMissionKey="visibleMissionKey"
            :visibleLogsKey="visibleLogsKey"
            @markerClik="markerClickEvent"
            @logClik="logClikEvent"
        />
        <missions-logs-viewer-component
            v-if="missionsLogsViewerShow"
            :missionsData="missionsData"
            :logsData="logsData"
            :visibleLogsKey="visibleLogsKey"
            :visibleMissionsKey='visibleMissionKey'
            @logVisibleUpdate="logVisibleUpdateEvent"
            @misionVisibleUpdate="misionVisibleUpdateEvent"
            @missionLogClick="missionLogClickEvent"
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
        <transition name="slide-fade">
            <log-mission-info-component
                v-show="missionLogInfoViewerShow"
                @closeInfo="closeMissionLogInfo"
                :infoViewerKey="infoViewerKey"
                :infoViewer="infoViewer"
            />
        </transition>
    </div>
</template>

<script>
import YandexMapComponent from '@/components/YandexMapComponent.vue'
import SideNavBarComponent from "@/components/SideNavBarComponent.vue"
import MissionCreateComponent from '@/components/MissionCreateComponent.vue'
import LogCreateComponent from '@/components/LogCreateComponent.vue'
import MissionLogSearcherComponent from '@/components/MissionLogSearcherComponent.vue'
import MissionsLogsViewerComponent from '@/components/MissionsLogsViewerComponent.vue'
import LogMissionInfoComponent from '@/components/LogMissionInfoComponent.vue'

export default {
    components: {
        YandexMapComponent,
        SideNavBarComponent,
        MissionCreateComponent,
        LogCreateComponent,
        MissionLogSearcherComponent,
        MissionsLogsViewerComponent,
        LogMissionInfoComponent
    },
    data() {
        return {
            missionCreateDislogShow: false,
            logCreateDialogShow: false,
            missionLogSearcherShow: false,
            missionsLogsViewerShow: false,
            missionLogInfoViewerShow: false,
            yandexMapShow: true,
            mapKey: 0,
            missionsData: [],
            logsData: [],
            openMissionKey: [],
            visibleMissionKey: [],
            visibleLogsKey: [],
            openLogsKey: [],
            infoViewerKey: '',
            infoViewer: {},
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
                this.visibleMissionKey.push(true)
            }
        },
        setLogKeyState(data){
            this.openLogsKey = []
            for(let i=0; i<data.length; i++){
                this.openLogsKey.push(false)
                this.visibleLogsKey.push(true)
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
        },
        logVisibleUpdateEvent(data){
            this.visibleLogsKey[data.id] = data.state
            this.mapKey +=1;
        },
        misionVisibleUpdateEvent(data){
            this.visibleMissionKey[data.id] = data.state
            this.mapKey +=1;
        },
        missionLogClickEvent(data){
            this.missionLogInfoViewerShow = true
            this.infoViewerKey = data.type
            if(this.infoViewerKey === 'mission'){
                this.infoViewer = this.missionsData[data.id]
                let id = Math.ceil(this.missionDataConvertCoord[data.id].points.length/2)
                this.centerOfMap = this.missionDataConvertCoord[data.id].points[id]
            }
            else{
                this.infoViewer = this.logsData[data.id]
                let id = Math.ceil(this.logsData[data.id].points.length/2)
                this.centerOfMap = this.logsData[data.id].points[id]
            }
        },
        closeMissionLogInfo(){
            this.missionLogInfoViewerShow = false
        }
    },
    computed: {
        missionDataConvertCoord(){
            var missionDataConvert = []
            for(let i=0; i<this.missionsData.length; i++){
                missionDataConvert.push(JSON.parse(JSON.stringify(this.missionsData[i])))
                for(let j=0; j<missionDataConvert[i].points.length; j++){
                    missionDataConvert[i].points[j] = [parseFloat(this.missionsData[i].points[j].targetLat),
                                                        parseFloat(this.missionsData[i].points[j].targetLon)]
                }
            }
            return missionDataConvert
        },
        missionDataVision(){
            var missionData = []
            for(let i=0; i<this.missionsData.length; i++){
                missionData.push({...this.missionsData[i],...{'visible':this.visibleMissionKey[i]}})
            }
            return missionData
        },
        logsDataVision(){
            var logsData = []
            for(let i=0; i<this.logsData.length; i++){
                logsData.push({...this.logsData[i],...{'visible':this.visibleLogsKey[i]}})
            }
            return logsData
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
.slide-fade-leave-active {
  transition: all 1s ease
}
.slide-fade-leave-to {
  transform: translateX(350px);
}
</style>