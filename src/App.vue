<template>
  <div id="app">
    <div v-show="!isLoading">
        <router-view/>
    </div>
    <div v-show="isLoading">
        <loading-page/>
    </div>
  </div>
</template>

<script>
import LoadingPage from '@/components/LoadingPage.vue';

export default {
    components: { 
        LoadingPage
    },
    data() {
        return {
            isLoading: false
        }
    },
    mounted(){
        setTimeout(()=>{
            this.isLoading = false;
        }, 3000)
    }
}
</script>

<style>

</style>
