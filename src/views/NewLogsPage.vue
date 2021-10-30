<template>
    <div>
        <form class="mission__form">
            <input v-model="mission_name" class="form__input" type="text" placeholder="Название выполненной миссии"/>
            <textarea v-model="mission_description" class="form__input" placeholder="Описание полета" cols="40" rows="3"/>
            <div class="data__picker">
                <p>Выберете время и дату выполнения полета</p>
                <datepicker
                    v-model="picked"
                />
            </div>
            <label for="formFileSm" class="form-label form__label">Выберете файл лога полета в формате .LOG</label>
            <input @change="loadFile" class="form-control form-control-sm form__file" id="formFileSm" type="file" accept=".LOG"/>
            <button type="button" class="btn btn-secondary form__button">Отправить</button>
        </form>
    </div>
</template>

<script>
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css'
export default {
    components: {
        Datepicker
    },
    data() {
        return {
            picked: '',
            mission_name: '',
            mission_description: '',
            file: null
        }
    },
    methods: {
        loadFile(event) {
            this.file = event.target.files[0]
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
    border: 1px solid black;
    border-radius: 5px;
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
.data__picker{
    display: flex;
    flex-direction: row;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 15px;
    justify-content: space-around;
    align-items: center;
}
</style>