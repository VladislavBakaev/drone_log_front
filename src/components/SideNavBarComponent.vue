<template>
    <nav class="navbar-dark bg-dark navbar-style">
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenus">
            <span class="navbar-toggler-icon"></span>
        </button>
    </nav>
    <div class="offcanvas offcanvas-start navbar-dark bg-dark" id="offcanvasMenus" style="width: 300px; border:1px solid gray">
        <div class='logo-div-style'>
            <img class='logo-style' src="@/assets/logo.png"/>
        </div>
        <hr style="color:gray; margin:0;"/>
        <ul class="navbar-nav">
            <li class="nav-item nav-item-style">
                <a href="#" class="nav-link px-4">Полетные задания и логи</a>
            </li>
            <li class="nav-item nav-item-style">
                <a href="#" class="nav-link px-4">Выгрузить полетное задание</a>
            </li>
            <li class="nav-item nav-item-style">
                <a href="#" class="nav-link px-4">Вышрузить логи полетного задания</a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {

}
</script>

<style scopen>
.navbar-style{
    padding: 5px;
}
.logo-style{
    width: 100%;
    height: 100%;
}
.logo-div-style{
    width: 100px;
    height: 100px;
    margin: 20px auto 20px auto;
}
.nav-item-style{
    margin-top: 10px;
}
.nav-item-style:hover{
    background: rgba(97, 97, 97, 0.39);
    border-radius: 20px;
}
</style>