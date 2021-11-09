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
                class="element-div-style"
            >
                <div>{{index+1}}. {{mission.mission_name}}</div>
                <div class="element-secondary-style">
                    <p>Автор: {{mission.user_info}}</p>
                    <p>Дата создания: {{mission.at_create.split('T')[0]}}</p>
                </div>
            </div>
        </div>
        <div v-else>
            <div
                v-for="(log, index) in logsData"
                :key="log"
                class="element-div-style"
            >
                <div>{{index+1}}.</div>
                <div class="element-secondary-style">
                    <p>Имя миссии: {{ log.mission===null?('Без привязки к миссии'):(log.mission) }}</p>
                    <p>Дата полета: {{log.flight_data.split('T')[0]}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        missionsData:{
            type: Array
        },
        logsData:{
            type: Array
        }
    },
    data() {
        return{
            currentPage: 'missions'
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
    flex-direction: column;
    margin-top: 10px;
    margin-right: 10px;
    margin-left: 10px;
    font-size: 15px;
    text-align: center;
    border: 1px solid rgb(80, 80, 80);
    border-radius: 3px;
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
</style>