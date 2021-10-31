<template>
  <div>
        <table-find-parameter-component
            v-model:date_range='search_date_range'
            v-model:author='search_author'
            v-model:mission_name="search_mission_name"
        />
        <missions-viewer
            :missions="sortSearchMission"
            v-model:sortedParam="sortedParam"
            @change_direction="updateSortedDirection"
        />
  </div>
</template>

<script>
import MissionsViewer from "@/components/MissionsViewer.vue"
import TableFindParameterComponent from "@/components/TableFindParameterComponent.vue"
import axios from 'axios'

export default {
    components: {
        MissionsViewer,
        TableFindParameterComponent
    },
    data() {
        return {
            missions: [],
            sortedParam: 'mission_name',
            sortedDirection: 1,
            search_date_range: ['', ''],
            search_author: '',
            search_mission_name: ''
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
        updateSortedDirection(direction) {
            this.sortedDirection = direction
        }
    },
    computed: {
        sortMission() {
            return [...this.missions].sort((mission1 , mission2)=>{
                return mission1[this.sortedParam]>mission2[this.sortedParam] ? 1*this.sortedDirection : -1*this.sortedDirection
            })
        },
        sortSearchMission() {
            var serch_and_sort = this.sortMission.filter(mission=>mission.mission_name.toLowerCase().includes(this.search_mission_name.toLowerCase()))
                                                 .filter(mission=>mission.user_info.toLowerCase().includes(this.search_author.toLowerCase()))
            if (!(this.search_date_range[0] == '' && this.search_date_range[1] == '')){
                serch_and_sort = serch_and_sort.filter(mission=>Date.parse(mission.at_create)>Date.parse(this.search_date_range[0])&&
                                           Date.parse(mission.at_create)<Date.parse(this.search_date_range[1]))
            }
            return serch_and_sort
        }
    },
    mounted() {
        this.fetchMissions()
    }
}
</script>

<style scoped>
</style>