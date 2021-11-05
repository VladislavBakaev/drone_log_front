<template>
    <div class="form-check box-style">
        <input class="form-check-input" type="checkbox" :checked="state" @change="changeBoxState">
        <label class="form-check-label text-color" for="flexCheckDefault">
            <slot></slot>
        </label>
    </div>
</template>

<script>
export default {
    props:{
        state: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return{
        }
    },
    methods:{
        changeBoxState(event){
            this.$emit('update:state', event.target.checked)
        }
    }
}
</script>

<style scoped>
.text-color{
    color: white;
}
.box-style{
    margin-left: 15px;
}
</style>