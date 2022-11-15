<template>
  <div class="tabContent hide" id="heaters">
    <div class="mt-3">
      <button class="btn btn-primary" type="button" @click="showModal=true">Create Heater</button>
    </div>
    <div class="heaters-list pt-3">
      <heaters-list-item
          v-for="heater in heaters"
          :heater="heater"
          :key="heater.id"
          :room_id="this.$route.params.id"
          @heater-updated="updateHeater"
          @heater-delete="deleteHeater"
      >
      </heaters-list-item>
    </div>
  </div>
  <create-heater-modal
      :open="showModal"
      @onClose="showModal=false"
      :room_id="this.$route.params.id"
      @heater-created="createHeater"
  ></create-heater-modal>
</template>


<script>
import axios from 'axios';
import {API_HOST} from '../config';
import HeatersListItem from './HeaterListItem';
import createHeaterModal from "@/components/CreateHeaterModal";

export default {
  components: {
    HeatersListItem,
    createHeaterModal
  },
  name: 'HeatersList',
  data: function () {
    return {
      heaters: [],
      showModal: false
    }
  },
  created: async function () {
    let response = await axios.get(`${API_HOST}/api/rooms/${this.$route.params.id}/heaters`);
    this.heaters = response.data;
  },
  methods: {
    updateHeater(newHeater) {
      let index = this.heaters.findIndex(heater => heater.id === newHeater.id);
      this.heaters.splice(index, 1, newHeater);
    },
    deleteHeater(heaterId) {
      let index = this.heaters.findIndex(heater => heater.id === heaterId);
      this.heaters.splice(index, 1);
    },
    createHeater(newHeater) {
      this.heaters.splice(this.heaters.length - 1, 0, newHeater);
    }
  }
}
</script>
<style lang="scss" scoped>
.hide{
  display: none;
}
.show{
  display: block;
}
</style>
