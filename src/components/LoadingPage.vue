<template>
  <div class="loading-page">
      <img class="loading-img-style" src="@/assets/logo.png">
  </div>
</template>

<script>
export default {

}
</script>

<style>
.loading-page{
    background: rgb(26, 26, 26);
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.loading-img-style{
    height: 350px;
    width: 350px;
    animation-name: Appearance;
    animation-duration: 2s;
    animation-timing-function: cubic-bezier(.1,-.6,.2,0);
}

@-webkit-keyframes Appearance {
  0% {opacity: 0;}
  100% {opacity: 1;}
}

@-o-keyframes Appearance {
  0% {opacity: 0;}
  100% {opacity: 1;}
}

@-moz-keyframes Appearance {
  0% {opacity: 0;}
  100% {opacity: 1;}
}
</style>