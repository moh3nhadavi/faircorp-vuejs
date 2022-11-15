<script>
import axios from 'axios';
import {API_HOST} from '../config';

export default {
  name: "createRoomModal",
  props: {
    // modelValue: false,
    header: String,
    open: Boolean,
    building_username: String,
    room: Object,
  },
  emits: ['onClose', 'room-created'],
  data: function () {
    return {
      name: '',
      floor: 1,
      target_temperature: null,
      current_temperature: null,
    }
  },
  methods: {
    handleCloseModal() {
      this.$props.open = false;
      this.$emit("onClose");
    },
    async createRoom() {
      console.log(this.floor)
      let response = await axios.post(`${API_HOST}/api/buildings/${this.building_username}/rooms/create`, {
        "name": this.name,
        "floor": this.floor,
        "target_temperature": this.target_temperature,
        "current_temperature": this.current_temperature
      })
          .catch(function (error) {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
              return 0;
            }
          });
      if (response) {
        this.$emit("room-created", response.data);
        this.handleCloseModal();
      }
    }
  }
}
</script>
<template>
  <div v-show="open" class="modal_container">
    <div class="backdrop"></div>
    <div class="modal_main">
      <div class="modal_header">
        <div>
          Create new room
        </div>
        <span class="close_wrapper cursor-pointer" @click="handleCloseModal">
          x
        </span>
      </div>
      <div class="modal_body">
        <div class="mb-3">
          <label for="buildingUsername" class="form-label">Building Username</label>
          <input type="text" class="form-control" id="buildingUsername" readonly v-bind:value="building_username">
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" class="form-control" id="name" placeholder="Name" v-model="name"
                 required>
        </div>
        <div class="mb-3">
          <label for="floor" class="form-label">Floor</label>
          <input type="number" class="form-control" id="floor" placeholder="1" v-model="floor">
        </div>
        <div class="mb-3">
          <label for="current_temperature" class="form-label">Current Temperature</label>
          <input type="number" step="0.1" class="form-control" id="current_temperature"
                 v-model="current_temperature" placeholder="0">
        </div>
        <div class="mb-3">
          <label for="target_temperature" class="form-label">Target Temperature</label>
          <input type="number" step="0.1" class="form-control" id="target_temperature"
                 v-model="target_temperature" placeholder="0">
        </div>

        <div class="mb-3">
          <button type="button" class="btn btn-primary" @click="createRoom">Submit</button>
        </div>

      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.cursor-pointer {
  cursor: pointer;
}

.modal_container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;

  .backdrop {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.8;
    background-color: #2c3e50;
  }

  .modal_main {
    padding: 1rem;

    .modal_header {
      width: 100%;
      padding: 16px 20px;
      background-color: white;
      border-radius: 16px;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 700;
      font-size: 14px;
      max-width: 20.5rem;
      min-width: 20.5rem;
    }

    .modal_body {
      width: 100%;
      padding: 20px;
      background-color: white;
      border-radius: 16px;
    }
  }
}
</style>
