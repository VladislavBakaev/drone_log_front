<template>
    <div class="navbar-dark bg-dark navbar-style">
        <div class="toggle-div" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenus">
            <i class="bi bi-list nav-toggle-style"></i>
        </div>
    </div>
    <div class="offcanvas offcanvas-start navbar-dark bg-dark" id="offcanvasMenus" style="width: 300px; border:1px solid gray">
        <div class='logo-div-style'>
            <img class='logo-style' src="@/assets/logo.png"/>
        </div>
        <hr style="color:gray; margin:0;"/>
        <ul class="navbar-nav">
            <li class="nav-item nav-item-style">
                <i class="bi bi-globe icon-style"></i>
                <a class="nav-link nav-item-text-style">Полетные задания и логи</a>
            </li>
            <li class="nav-item nav-item-style">
                <i class="bi bi-geo-alt-fill icon-style"></i>
                <a class="nav-link nav-item-text-style">Выгрузить полетное задание</a>
            </li>
            <li class="nav-item nav-item-style">
                <i class="bi bi-geo-fill icon-style"></i>
                <a class="nav-link nav-item-text-style">Выгрузить логи полетного задания</a>
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
    padding: 8px;
}
.nav-toggle-style{
    font-size: 2rem; 
    color: gray;
    margin: auto;
}
.toggle-div:hover{
    background: rgba(128, 128, 128, 0.24);
}
.toggle-div{
    width: 50px;
    height: 50px;
    display: flex;
    transition: all 0.3s ease;
    border-radius: 25px ;
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
    display: flex;
    flex-direction: row;
    padding: 5px 15px;
}
.nav-item-style:hover{
    background: rgba(97, 97, 97, 0.39);
    border-radius: 20px;
}
.icon-style{
    color: gray;
    align-self: center;
    margin-right: 15px;
}
</style>