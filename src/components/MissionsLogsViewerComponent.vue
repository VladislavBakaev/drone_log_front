<template>
    <div class='content-div-style'>
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
</template>

<script>
export default {
    props:{
        missionsData:{
            type: Array
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
</style>