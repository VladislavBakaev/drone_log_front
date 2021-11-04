<template>
    <div class="main-page-style">
        <side-nav-bar-component
            @missionCreateEvent="missionCreateEvent"
        />
        <yandex-map-component/>
        <mission-create-component
            v-model:show="missionCreateDislogShow"
        />
    </div>
</template>

<script>
import YandexMapComponent from '@/components/YandexMapComponent.vue'
import SideNavBarComponent from "@/components/SideNavBarComponent.vue"
import MissionCreateComponent from '@/components/MissionCreateComponent.vue'


export default {
    components: {
        YandexMapComponent,
        SideNavBarComponent,
        MissionCreateComponent,
    },
    data() {
        return {
            missionCreateDislogShow: false
        }
    },
    methods: {
        missionCreateEvent() {
            this.missionCreateDislogShow = true
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