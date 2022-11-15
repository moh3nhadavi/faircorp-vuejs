<template>
  <div id="app">
    <header>
      <div class="description">{{ description }}</div>
    </header>

    <section class="main-content w-50 mx-auto" id="building-section">
      <div v-if="alertCheck" class="alert alert-danger alert-dismissible fade show mt-4" role="alert">
        {{ alertText }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      <div class="card">
        <div class="card-body">
          <div>
            <input v-model="building_username" placeholder="Building username" class="form-control"/>
          </div>
          <div class="mt-3">
            <button v-on:click="findBuilding" class="btn btn-success">Find Building</button>
          </div>
        </div>
      </div>


    </section>
    <hr>
    <!--    <div id="roomList"></div>-->
    <room-list v-if="check" :building_username="building_username"></room-list>
  </div>
</template>

<script>
import axios from 'axios';
import {API_HOST} from '../config';
import RoomList from "@/components/RoomList";

export default {
  name: "BuildingInput",
  components: {
    RoomList
  },
  data: function () {
    return {
      building_username: '',
      alertText: 'Username not found',
      check: false,
      alertCheck: false,
      description: ' Please enter the building username. (suggestion: mmm)'
    }
  },

  methods: {
    findBuilding: async function () {
      let response = await axios.get(`${API_HOST}/api/buildings/${this.building_username}`);
      let building = response.data;
      if (building === '') {
        this.alertCheck = true;
      }else{
        this.building_username = building.username;
        this.check = true;
        this.description = `Welcome to ${building.name}. Outside temperature is ${building.out_temperature}`;
        document.getElementById("building-section").remove();
      }
    }
  }

}
</script>
