<template>
    <modal-create-form-component
        :show="show"
        @update:show="dialogHidden"
        :width="70"
    >
        <h4>Поиск и отображение загруженных файлов полетных заданий и логов</h4>
        <div class="content-div">
            <div class="search-elem-div">
                <h5>Полетные задания</h5>
                <p>Выберете парметры поиска полетных заданий</p>
                <check-box-component v-for="checkBoxParam in checkBoxMissionParams"
                                     :key="checkBoxParam.key"
                                     v-model:state="checkBoxParam.param">
                    {{checkBoxParam.label}}
                </check-box-component>
                <div class="parameter__plaser">
                    <div class="input__plaser">
                        <input v-if="checkBoxMissionParams[0].param" class="find__input" type="text" v-model="mission_name_m" placeholder="Название миссии"/>
                        <input v-if="checkBoxMissionParams[1].param" class="find__input" type="text" v-model="author_name_m" placeholder="Автор"/>
                    </div>
                    <datepicker
                        v-if="checkBoxMissionParams[2].param"
                        v-model="date_range_m"
                        range
                        twoCalendars
                        class="datepicker__class"
                    />
                </div>
            </div>
            <div class="search-elem-div">
                <h5>Логи</h5>
                <p>Выберете парметры поиска логов</p>
                <check-box-component v-for="checkBoxParam in checkBoxLogParams"
                                     :key="checkBoxParam.key"
                                     v-model:state="checkBoxParam.param">
                    {{checkBoxParam.label}}
                </check-box-component>
                <div class="parameter__plaser">
                    <div class="input__plaser">
                        <input v-if="checkBoxLogParams[0].param" class="find__input" type="text" v-model="mission_name_l" placeholder="Название миссии"/>
                    </div>
                    <datepicker
                        v-if="checkBoxLogParams[1].param"
                        v-model="date_range_l"
                        range
                        twoCalendars
                        class="datepicker__class"
                    />
                </div>
            </div>
        </div>
        <button @click="getMissionsData(); getLogsData(); dialogHidden(); $emit('openViewerDiv')" type="button" class="btn btn-secondary btn-style">Получить данные</button>
        <p class="info-label">*Поиск идет по частичному совпадению названия миссии и автора. В случае, когда не выбран ни один параметр поиска, загружаются данные о всех миссиях и логах.</p>
    </modal-create-form-component>
</template>

<script>
import CheckBoxComponent from "@/components/UI/CheckBoxComponent.vue"
import axios from 'axios'

export default {
    components:{
        CheckBoxComponent
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        missionsData: {
            type: Array
        }
    },
    data() {
        return{
            checkBoxMissionParams: [
                    {key: 'mission', label: "По имени миссии", param: false},
                    {key: 'author', label: "По имени автора", param: false},
                    {key: 'date_range', label: "По временному промежутку создания миссии", param: false},
                ],
            mission_name_m: '',
            author_name_m: '',
            date_range_m: ['',''],
            checkBoxLogParams: [
                    {key: 'mission', label: "По имени миссии", param: false},
                    {key: 'date_range', label: "По временному промежутку полета", param: false},
                ],
            mission_name_l: '',
            author_name_l: '',
            date_range_l: ['',''],
            isLoadingData: false,
            viewMissionsLogData: false
        }
    },
    methods: {
        dialogHidden() {
            this.$emit("update:show", false)
            for(let el of this.checkBoxMissionParams){
                el.param = false;
            }
            for(let el of this.checkBoxLogParams){
                el.param = false;
            }
            this.mission_name_m = ''
            this.mission_name_l = ''
            this.author_name_m = ''
            this.date_range_m = ['', '']
            this.date_range_l = ['', '']
        },
        async getMissionsData(){
            var get_params = {params:{}}
            if (this.checkBoxMissionParams[0].param){
                get_params.params.name = this.mission_name_m
            }
            if (this.checkBoxMissionParams[1].param){
                get_params.params.user = this.author_name_m
            }
            if (this.checkBoxMissionParams[2].param){
                get_params.params.start_date = this.date_range_m[0]
                get_params.params.end_date = this.date_range_m[1]
            }
            this.isLoadingData = true
            axios.get('http://127.0.0.1:8000/api/yd/mission', get_params)
            .then((response)=>{
                this.$emit('update:missionsData', response.data.result)
                this.isLoadingData = false
            })
            .catch(function (error) {
                if (error.response) {
                    alert(error.response.data['message']);
                } else if (error.request) {
                    alert('Error connect to server');
                } else {
                    alert('Error', error.message);
                }
            });
        },
        async getLogsData(){
            var get_params = {params:{}}
            if (this.checkBoxLogParams[0].param){
                get_params.params.name = this.mission_name_m
            }
            if (this.checkBoxLogParams[1].param){
                get_params.params.start_date = this.date_range_m[0]
                get_params.params.end_date = this.date_range_m[1]
            }
            this.isLoadingData = true
            axios.get('http://127.0.0.1:8000/api/yd/logs', get_params)
            .then((response)=>{
                this.$emit('update:logsData', response.data.result)
                this.isLoadingData = false
            })
            .catch(function (error) {
                if (error.response) {
                    alert(error.response.data['message']);
                } else if (error.request) {
                    alert('Error connect to server');
                } else {
                    alert('Error', error.message);
                }
            });
        }
    }
}
</script>

<style scoped>
h4{
    color: white;
    text-align: center;
}
h5{
    color: white;
    text-align: center;
}
p{
    color: white;
}
.info-label{
    text-align: center;
    color: gray;
    margin-top: 10px;
}
.content-div{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 10px;
}
.search-elem-div{
    display: flex;
    flex-direction: column;
    width: 50%;
    border: 1px solid gray;
    margin: 0 10px 0 10px;
    padding: 10px;
    border-radius: 2px;
}
.parameter__plaser{
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    padding: 10px;
}
.input__plaser{
    display: flex;
    flex-direction: column;
}
.find__input{
    border: 1px solid black;
    border-radius: 2px;
    padding: 10px 10px;
    background: rgba(122, 123, 124, 0.616);
    color: white;
}
.find__input::placeholder{
    color: #bec0c9;
}
.datepicker__class{
    margin-top: 15px;
}
.btn-style{
    margin: 15px auto 0 auto;
    width: 50%;
}
</style>