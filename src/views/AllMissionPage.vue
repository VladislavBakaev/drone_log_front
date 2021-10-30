<template>
  <div class="mission__viewer">
      <missions-viewer
        :missions="missions"
      />
  </div>
</template>

<script>
import MissionsViewer from "@/components/MissionsViewer.vue"
import axios from 'axios'

export default {
    components: {
        MissionsViewer
    },
    data() {
        return {
            missions: []
        }
    },
    methods: {
        async fetchMissions() {
            try{
                this.isPostLoading = true;
                const response = await axios.get("http://127.0.0.1:8000/api/yd/mission/get")
                this.missions = response.data['result']
            }
            catch (e){
                alert("Error")
            }
        },
    },
    mounted() {
        this.fetchMissions()
    }
}
</script>

<style scoped>
</style>