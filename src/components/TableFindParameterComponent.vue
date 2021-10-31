<template>
    <div class="parameter__plaser">
        <h3 class="parameter__header">Параметры поиска</h3>
        <div class="input__plaser">
            <input class="find__input" type="text" :value="mission_name" @input="updateMissionName" placeholder="Название миссии"/>
            <input class="find__input" type="text" :value="author" @input="updateAuthor" placeholder="Автор"/>
        </div>
        <datepicker
            :modelValue='date_range'
            @update:modelValue='updateDate'
            range
            twoCalendars
            class="datepicker__class"
        />
    </div>
</template>

<script>
export default {
    props: {
        date_range: Array,
        author: String,
        mission_name: String
    },
    methods: {
        updateDate(event) {
            if (event != null){
                this.$emit('update:date_range', [event[0],event[1]])
            }
            else{
                this.$emit('update:date_range', ['', ''])
            }
        },
        updateAuthor(event) {
            this.$emit('update:author', event.target.value)
        },
        updateMissionName(event){
            this.$emit('update:mission_name', event.target.value)
        }
    }
}
</script>

<style scoped>
.parameter__plaser{
    display: flex;
    flex-direction: column;
    border: 1px solid gray;
    border-radius: 5px;
    margin: 15px auto 0 auto;
    padding: 10px;
    width: 70%;
}
.input__plaser{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.find__input{
    border: 1px solid black;
    border-radius: 2px;
    padding: 10px 10px;
    width: 45%;
}
.datepicker__class{
    margin-top: 15px;
}
.parameter__header{
    margin: 0 auto 15px auto;
}
</style>