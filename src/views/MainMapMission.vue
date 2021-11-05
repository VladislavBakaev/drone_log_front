<template>
    <div class="main-page-style">
        <side-nav-bar-component
            @missionCreateEvent="missionCreateEvent"
            @logCreateEvent="logCreateEvent"
            @missionAndLogEvent="missionAndLogEvent"
        />
        <yandex-map-component/>
        <mission-create-component
            v-model:show="missionCreateDislogShow"
        />
        <log-create-component
            v-model:show="logCreateDialogShow"
        />
        <mission-log-searcher-component
            v-model:show="missionLogSearcherShow"
        />
    </div>
</template>

<script>
import YandexMapComponent from '@/components/YandexMapComponent.vue'
import SideNavBarComponent from "@/components/SideNavBarComponent.vue"
import MissionCreateComponent from '@/components/MissionCreateComponent.vue'
import LogCreateComponent from '@/components/LogCreateComponent.vue'
import MissionLogSearcherComponent from '@/components/MissionLogSearcherComponent.vue'

export default {
    components: {
        YandexMapComponent,
        SideNavBarComponent,
        MissionCreateComponent,
        LogCreateComponent,
        MissionLogSearcherComponent
    },
    data() {
        return {
            missionCreateDislogShow: false,
            logCreateDialogShow: false,
            missionLogSearcherShow: false
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
        }
    }
}
</script>

<style>
.main-page-style{
    height: 100vh;
    display: flex;
    flex-direction: row;
}
</style>