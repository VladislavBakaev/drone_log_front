<template>
  <!-- <nav-bar-component/> -->
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// import NavBarComponent from '@/components/NavBarComponent.vue'

export default {
  components: {
    // NavBarComponent
  }
}
</script>

<style>
#app {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
