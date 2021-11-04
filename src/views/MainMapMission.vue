<template>
    <div class="main-page-style">
        <side-nav-bar-component/>
        <yandex-map-component/>
    </div>
</template>

<script>
import YandexMapComponent from '@/components/YandexMapComponent.vue'
import SideNavBarComponent from "@/components/SideNavBarComponent.vue"
export default {
    components: {
        YandexMapComponent,
        SideNavBarComponent
    },
}
</script>

<style>
.main-page-style{
    height: 100vh;
    display: flex;
    flex-direction: row;
}
</style>