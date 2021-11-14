<template>
    <div class="info-bar-style">
        <div class="toggle-close-div">
            <i @click="closeInfo" class="bi bi-chevron-right toggle-close-style"></i>
        </div>
        <hr style="color: gray;" />
        <div class="info-elements-div-style"
            v-if="infoViewerKey=='mission'"
        >
            <p>Название миссии:<br> {{infoViewer.mission_name}}</p>
            <p>Автор: <br> {{infoViewer.user_info}}</p>
            <p>Описание мисии: <br> {{infoViewer.description}}</p>
            <p>Дата создания: <br> {{infoViewer.at_create.split('T')[0]}}</p>
            <a href="#" :download="infoViewer.flight_mission_file.split('/')[1]">
                <button type="button" class="btn btn-secondary">Скачать файл полетного задания в формате .BIN</button>
            </a>
            <hr style="color: gray;" />
        </div>

        <div v-if="infoViewerKey=='log'"
            class="info-elements-div-style"
        >
            <p>Название миссии: <br> {{infoViewer.mission}}</p>
            <p>Описание лога: <br> {{infoViewer.description}}</p>
            <p>Дата создания: <br> {{infoViewer.at_create.split('T')[0]}}</p>
            <p>Дата выполнения полета: <br> {{infoViewer.flight_data.split('T')[0]}}</p>
            <a href="#" :download="infoViewer.upload.split('/')[1]">
                <button type="button" class="btn btn-secondary">Скачать файл лога в формате .LOG</button>
            </a>
            <hr style="color: gray;"/>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        infoViewer: {
            type: Object
        },
        infoViewerKey: {
            type: String
        }
    },
    methods: {
        closeInfo(){
            this.$emit('closeInfo')
        }
    }
}
</script>

<style>
.info-bar-style{
    top: 0;
    bottom: 0;
    right: 0;
    position: fixed;
    display: flex;
    background: rgba(32,37,41,1);
    width: 350px;
    color: white;
    overflow-y: scroll;
    overflow-wrap: break-word;
    flex-direction: column;
}
.toggle-close-style{
    font-size: 2rem; 
    color: gray;
}
.toggle-close-div:hover{
    background: rgba(128, 128, 128, 0.24);
}
.toggle-close-div{
    margin: 5px;
    width: 46px;
    height: 46px;
    transition: all 0.3s ease;
    border-radius: 23px ;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}
.info-elements-div-style{
    display: flex;
    flex-direction: column;
    padding: 5px;
    text-align: center;
}
.info-elements-div-style > p{
    margin-top: 10px;
    margin-bottom: 0;
}
.info-elements-div-style > a{
    margin-top: 10px;
    margin-bottom: 0;
}
</style>