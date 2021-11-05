<template>
    <yandex-map :settings="settings"
        :coords="center"
        style="width: 100%; height:100%"
        map-type="hybrid"
        :controls="controls"
        :zoom="6"
    >
    </yandex-map> 
</template>

<script>
import { yandexMap } from 'vue-yandex-maps'

export default {
    components: {
        yandexMap,
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
            center: [55.652555002, 37.537864359],
            controls: ['geolocationControl', 'rulerControl', 'typeSelector', 'zoomControl']
        }
    }
}
</script>

<style>

</style>