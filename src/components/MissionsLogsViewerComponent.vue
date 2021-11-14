<template>
    <div class='content-div-style'>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid nav-link-style">
                <div class="navbar-nav">
                    <a :class="{active: currentPage==='missions'}"
                        @click="currentPage='missions'"
                        class="nav-link">Миссии</a>
                    <a :class="{active: currentPage==='logs'}"
                        @click="currentPage='logs'"
                        class="nav-link">Логи</a>
                </div>
            </div>
        </nav>
        <hr style="margin:0;">
        <div v-if="currentPage==='missions'">
            <div
                v-for="(mission, index) in missionsData"
                :key="mission.id"
                :id='index'
                class="element-div-style"
                @click="missionClick"
            >
                <div style="margin-right: 15px">
                    <check-box-component :id_box="(index+1)*10000" :state="visibleMissionsKey[index]" @click="updateMissionViewerEvent" @click.stop/>
                </div>
                <div class='discription-div-style'>
                    <div style='text-align: center;'>{{index+1}}. {{mission.mission_name}}</div>
                    <div class="element-secondary-style">
                        <p>Автор: {{mission.user_info}}</p>
                        <p>Дата создания: {{mission.at_create.split('T')[0]}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div
                v-for="(log, index) in logsData"
                :key="index"
                :id='index'
                class="element-div-style"
                @click="logClick"
            >
                <div style="margin-right: 15px">
                    <check-box-component :id_box="index" :state="visibleLogsKey[index]" @click="updateLogViewerEvent" @click.stop/>
                </div>
                <div class='discription-div-style'>
                    <div style='text-align: center;' >{{index+1}}.</div>
                    <div class="element-secondary-style">
                        <p>Имя миссии: {{ log.mission===null?('Без привязки к миссии'):(log.mission) }}</p>
                        <p>Дата полета: {{log.flight_data.split('T')[0]}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CheckBoxComponent from '@/components/UI/CheckBoxComponent.vue'
export default {
  components: { CheckBoxComponent },
    props:{
        missionsData:{
            type: Array
        },
        logsData:{
            type: Array
        },
        visibleLogsKey:{
            type: Array
        },
        visibleMissionsKey: {
            type: Array
        }
    },
    data() {
        return{
            currentPage: 'missions'
        }
    },
    methods: {
        updateLogViewerEvent(event){
            let data = event.target.checked;
            let id = parseInt(event.target.id);
            if (data != undefined && id != undefined){
                this.$emit('logVisibleUpdate', {'id': id, 'state':data})
            }
        },
        updateMissionViewerEvent(event){
            let data = event.target.checked;
            let id = parseInt(event.target.id)/10000-1;
            if (data != undefined && id != undefined){
                this.$emit('misionVisibleUpdate', {'id': id, 'state':data})
            }
        },
        logClick(event){
            let id = event.currentTarget.id
            this.$emit('missionLogClick', {type: 'log', id: parseInt(id)})
        },
        missionClick(event){
            let id = event.currentTarget.id
            this.$emit('missionLogClick', {type: 'mission', id: parseInt(id)})
        }
    }
}
</script>

<style scope>
.content-div-style{
    background: rgba(32,37,41,1);
    min-width: 350px;
    color: white;
    overflow-y: scroll;
}
.element-div-style{
    padding: 10px;
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    margin-right: 10px;
    margin-left: 10px;
    font-size: 15px;
    border: 1px solid rgb(80, 80, 80);
    border-radius: 3px;
    align-items: center;
    transition: 0.3s;
    cursor: pointer;
}
.element-div-style:hover{
    background: rgba(97, 97, 97, 0.39);
}
.element-secondary-style{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 12px;
    margin-top: 5px;
}
.element-secondary-style > p{
    margin: 0;
}
.nav-link-style{
    justify-content: space-around!important;
    cursor: pointer;
}
.discription-div-style{
    width: -webkit-fill-available;
}
</style>