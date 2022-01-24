<template>
    <modal-create-form-component
        :show="show"
        @update:show="dialogHidden"
        :width="40"
    >
        <h3>Выгрузка полетного задания</h3>
        <input v-model="mission_name" class="form__input" type="text" placeholder="Название миссии"/>
        <input v-model="author" class="form__input" type="text" placeholder="Автор"/>
        <textarea v-model="mission_description" class="form__input" placeholder="Описание задания" cols="40" rows="3"/>
        <label for="formFileSm" class="form-label form__label">Выберете файл полетного задания в формате .BIN (формат Воробьева Ю.Д.) или .waypoints</label>
        <input @change="loadFile" class="form-control form-control-sm form__file" id="formFileSm" type="file" accept=".BIN, .waypoints"/>
        <label class="form-label form__label">Выберете протокол выбранного файла полетного задания</label>

        <select class="form__file" v-model="selected_type">
            <option selected value="YD">Формат Воробьева Ю.Д.</option>
            <option value="ML">MavLink</option>
            <option value="PX4">PX4</option>
        </select>
        <button @click="sendFile" type="button" class="btn btn-secondary form__button">Отправить</button>
        <div class="div__info" v-if="isUnfillField"><strong>Заполните все поля</strong></div>
    </modal-create-form-component>
</template>

<script>
import axios from "axios"

export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            mission_name: '',
            mission_description: '',
            author: '',
            isUnfillField: false,
            file: null,
            selected_type: 'YD'

        }
    },
    methods: {
        dialogHidden() {
            this.$emit("update:show", false)
            this.mission_name = ''
            this.mission_description = ''
            this.author = ''
            this.isUnfillField = false
            this.file = null
            this.selected_type = 'YD'
        },
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
                             author: this.author,
                             protocol_type: this.selected_type}))
            axios.post('http://127.0.0.1:8000/api/drone/mission/load', formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            }).then(function (){
                alert('Миссия успешно загружена')
            }).catch(function (error) {
                if (error.response) {
                    alert(error.response.data['message']);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            });
        }
    }
}
</script>

<style scoped>
.form__input{
    padding: 10px 15px;
    margin-top: 15px;
    margin-right: 10px;
    margin-left: 10px;
    border-radius: 2px;
    background: rgba(122, 123, 124, 0.616);
    color: white;
}
.form__input::placeholder{
    color: #bec0c9;
}
.form__label{
    margin-top: 20px;
    margin-right: auto;
    margin-left: auto;
    color: white;
    text-align: center;
}
.form__file{
    margin-left: auto;
    margin-right: auto;
    height: 30px;
    width: 95%;
    background: rgba(128, 128, 128, 0.616);
    color: white;
}
.form__button{
    padding: 10px 15px;
    margin:15px 10px;
}
.div__info{
    margin: 15px auto 10px auto;
    color: rgba(172, 0, 0, 0.897);
}
h3{
    color: white;
    align-self: center;
}
</style>