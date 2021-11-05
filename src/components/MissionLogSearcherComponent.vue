<template>
    <modal-create-form-component
        :show="show"
        @update:show="dialogHidden"
        :width="60"
    >
        <h4>Поиск и отображение загруженных файлов полетных заданий и логов</h4>
        <div class="content-div">
            <div class="search-elem-div">
                <h5>Полетные задания</h5>
                <p>Выберете парметры поиска полетных заданий</p>
                <check-box-component v-model:state="missionNameSearchState">
                    По имени миссии
                </check-box-component>
            </div>
            <div class="search-elem-div">
                <h5>Логи</h5>
                <p>Выберете парметры поиска логов</p>
            </div>
        </div>
    </modal-create-form-component>
</template>

<script>
import CheckBoxComponent from "@/components/UI/CheckBoxComponent.vue"
export default {
    components:{
        CheckBoxComponent
    },
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return{
            missionNameSearchState: false
        }
    },
    methods: {
        dialogHidden() {
            this.$emit("update:show", false)
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
}
</style>