<template>
    <div class="main-page-style">
        <side-nav-bar-component
            @missionCreateEvent="missionCreateEvent"
            @logCreateEvent="logCreateEvent"
            @missionAndLogEvent="missionAndLogEvent"
        />
        <yandex-map-component :key="mapKey"/>
        <missions-logs-viewer-component
            v-if="missionsLogsViewerShow"
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
            missionsData: []
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