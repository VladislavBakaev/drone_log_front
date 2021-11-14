<template>
    <div class="info-bar-style">
        <div class="toggle-close-div">
            <i @click="closeInfo" class="bi bi-chevron-right toggle-close-style"></i>
        </div>
    </div>
</template>

<script>
export default {
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
    min-width: 350px;
    color: white;
    overflow-y: scroll;
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
</style>