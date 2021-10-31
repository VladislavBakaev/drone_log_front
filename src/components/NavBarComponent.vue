<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark navbar-style">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <router-link class="nav-link" to="/">Просмотр миссий</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/mission_create">Создать новую миссию</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/log_create">Добавить файлы логов к миссиям</router-link>
                </li>
            </ul>
            </div>
        </nav>
    </div>
</template>

<script>
export default {

}
</script>

<style scope>
.navbar-style{
    font-size: 20px;
}
</style>