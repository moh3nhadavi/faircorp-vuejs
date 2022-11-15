<template>
  <div id="app">
    <header>
      <!--      <div class="title">{{title}}</div>-->
      <div class="mb-3">
        <router-link to="/" class="btn btn-outline-primary">Home</router-link>
      </div>
      <img src="../src/assets/ic_logo.png" alt="faircorp" width="200">
      <div class="description">{{ description }}</div>

    </header>
    <router-view></router-view>
    <!--    <section class="main-content w-50 mx-auto">-->
    <!--&lt;!&ndash;      <main-navigation></main-navigation>&ndash;&gt;-->
    <!--&lt;!&ndash;      <windows-list></windows-list>&ndash;&gt;-->
    <!--&lt;!&ndash;      <building-input></building-input>&ndash;&gt;-->
    <!--    </section>-->
  </div>
</template>

<script>
// import MainNavigation from './components/MainNavigation.vue';
// import WindowsList from './components/WindowsList.vue';
// import BuildingInput from "@/components/BuildingInput";
// import {routerLink, routerView} from 'vue-router'

export default {
  name: 'App',
  components: {
    // MainNavigation,
    // WindowsList
    // BuildingInput
    // routerLink,
    // routerView
  },
  data: function () {
    return {
      // title: 'Faircorp Application',
      description: 'Application to manage buildings.'
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
