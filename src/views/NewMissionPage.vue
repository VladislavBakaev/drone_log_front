<template>
    <div>
        <form class="mission__form">
            <input v-model="mission_name" class="form__input" type="text" placeholder="Название миссии"/>
            <input v-model="author" class="form__input" type="text" placeholder="Автор"/>
            <textarea v-model="mission_description" class="form__input" placeholder="Описание задания" cols="40" rows="3"/>
            <label for="formFileSm" class="form-label form__label">Выберете файл полетного задания в формате .BIN</label>
            <input @change="loadFile" class="form-control form-control-sm form__file" id="formFileSm" type="file" accept=".BIN"/>
            <button @click="sendFile" type="button" class="btn btn-secondary form__button">Отправить</button>
            <div class="div__info" v-if="isUnfillField"><strong>Заполните все поля</strong></div>
        </form>
    </div>
</template>

<script>
import axios from "axios"
export default {
    data() {
        return {
            mission_name: '',
            mission_description: '',
            author: '',
            isUnfillField: false,
            file: null
        }
    },
    methods: {
        loadFile(event) {
            if(event.target.files[0] === undefined){
                this.file = null
            }
            else{
                this.file = event.target.files[0]
            }
        },
        sendFile() {
            if (this.mission_name == '' ||
                this.mission_description == '' ||
                this.author == '' ||
                this.file == null){
                    this.isUnfillField = true
                    return
                }
            else{
                this.isUnfillField = false
            }
            var formData = new FormData();
            formData.append("mission", this.file);
            formData.append("info", JSON.stringify({mission_name: this.mission_name,
                             mission_description: this.mission_description,
                             author: this.author}))
            axios.post('http://127.0.0.1:8000/api/yd/flightmission/load', formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            }).then(function (){
                alert('Миссия успешно загружена')
            }).catch(function (error) {
                if (error.response) {
                // Request made and server responded
                alert(error.response.data['message']);
                } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
                } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                }
            });
        }
    }
}
</script>

<style scoped>
.mission__form {
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    border: 2px solid gray;
    width: 40%;
    border-radius: 5px;
}
.form__input{
    padding: 10px 15px;
    margin-top: 15px;
    margin-right: 10px;
    margin-left: 10px;
}
.form__label{
    margin-top: 20px;
    margin-right: auto;
    margin-left: auto;
}
.form__file{
    margin-left: auto;
    margin-right: auto;
    width: 95%;
}
.form__button{
    padding: 10px 15px;
    margin:15px 10px;
}
.div__info{
    margin: 15px auto 10px auto;
    color: red;
}
</style>