<template>
  <header>
    <h5 class="description">{{ description }}</h5>
  </header>

  <!--  <home-section>-->
  <section class="main-content w-50 mx-auto">

    <main-navigation ></main-navigation>
    <div class="tab-content">
      <windows-list></windows-list>
      <heater-list></heater-list>
    </div>
  </section>
  <!--  </home-section>-->


</template>

<script>

import MainNavigation from "@/components/MainNavigation";
import WindowsList from "@/components/WindowsList";
import HeaterList from "@/components/HeaterList";
import axios from "axios";
import {API_HOST} from "@/config";

export default {
  name: "RoomSection",
  components: {
    MainNavigation,
    WindowsList,
    HeaterList
    // BuildingInput
  },
  data: function () {
    return {
      description: ''
    }
  },
  created: async function () {
    let response = await axios.get(`${API_HOST}/api/rooms/${this.$route.params.id}`);
    if(response){
      let room = response.data;
      this.description = room.building_name + ': Welcome to ' + room.name;
    }
  }
}
</script>

<style scoped>
.hide{
  display: none;
}
.show{
  display: block;
}
</style>