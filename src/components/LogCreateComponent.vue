<template>
    <modal-create-form-component
        :show="show"
        @update:show="dialogHidden"
        :width="40"
    >
        <h3>Выгрузка лога полетного задания</h3>
        <input v-model="mission_name" class="form__input" type="text" placeholder="Название выполненной миссии"/>
        <textarea v-model="mission_description" class="form__input" placeholder="Описание полета" cols="40" rows="3"/>
        <div class="data__picker">
            <p class="datapicker-text">Выберете время и дату выполнения полета</p>
            <datepicker
                v-model="picked"
            />
        </div>
        <label for="formFileSm" class="form-label form__label">Выберете файл лога полета в формате .LOG (Формат Воробьева Ю.Д) или .BIN (MavLink, PX4)</label>
        <input @change="loadFile" class="form-control form-control-sm form__file" id="formFileSm" type="file" accept=".LOG, .BIN"/>
        <label class="form-label form__label">Выберете протокол выбранного лог файла</label>

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
        return{
            picked: '',
            mission_name: '',
            mission_description: '',
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
            this.isUnfillField = false
            this.picked = ''
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
            if (this.mission_description == '' ||
                this.picked == '' ||
                this.file == null){
                    this.isUnfillField = true
                    return
                }
            else{
                this.isUnfillField = false
            }
            var formData = new FormData();
            formData.append("log", this.file);
            formData.append("info", JSON.stringify({mission_name: this.mission_name,
                             mission_description: this.mission_description,
                             flight_data: this.picked,
                             protocol_type: this.selected_type}))
            axios.post('http://127.0.0.1:8000/api/drone/log/load', formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            }).then(function (){
                alert('Лог успешно загружен')
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
    color: white;
    text-align: center;
}
.form__file{
    margin-left: auto;
    margin-right: auto;
    width: 95%;
    height: 30px;
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
.data__picker{
    display: flex;
    flex-direction: row;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 15px;
    justify-content: space-around;
    align-content: center;
    color: white;
}
h3{
    color: white;
    align-self: center;
}
</style>