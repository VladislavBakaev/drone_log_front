<template>
    <div class="main-page-style">
        <side-nav-bar-component
            @missionCreateEvent="missionCreateEvent"
            @logCreateEvent="logCreateEvent"
        />
        <yandex-map-component/>
        <mission-create-component
            v-model:show="missionCreateDislogShow"
        />
        <log-create-component
            v-model:show="logCreateDialogShow"
        />
    </div>
</template>

<script>
import YandexMapComponent from '@/components/YandexMapComponent.vue'
import SideNavBarComponent from "@/components/SideNavBarComponent.vue"
import MissionCreateComponent from '@/components/MissionCreateComponent.vue'
import LogCreateComponent from '@/components/LogCreateComponent.vue'

export default {
    components: {
        YandexMapComponent,
        SideNavBarComponent,
        MissionCreateComponent,
        LogCreateComponent,
    },
    data() {
        return {
            missionCreateDislogShow: false,
            logCreateDialogShow: false
        }
    },
    methods: {
        missionCreateEvent() {
            this.missionCreateDislogShow = true
        },
        logCreateEvent() {
            this.logCreateDialogShow = true
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