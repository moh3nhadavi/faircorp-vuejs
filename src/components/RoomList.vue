<template>
  <div>
    <button class="btn btn-primary" type="button" @click="showModal=true">Create Room</button>
  </div>
  <div class="room-list pt-3">
    <room-list-item
        v-for="room in rooms"
        :room="room"
        :key="room.id"
        :building_username="building_username"
        @room-updated="updateRoom"
        @room-delete="deleteRoom"
    >
    </room-list-item>
  </div>

  <create-room-modal
      :open="showModal"
      @onClose="showModal=false"
      :header="header"
      :building_username="building_username"
      @room-created="createRoom"
  ></create-room-modal>

</template>


<script>
import axios from 'axios';
import {API_HOST} from '../config';
import RoomListItem from "@/components/RoomListItem";
import createRoomModal from "@/components/CreateRoomModal";


export default {
  components: {
    RoomListItem,
    createRoomModal,
  },
  name: 'RoomList',
  props: ['building_username'],
  data: function () {
    return {
      rooms: [],
      header: 'Create Room',
      showModal: false,
    }
  },

  created: async function () {
    let response = await axios.get(`${API_HOST}/api/buildings/${this.building_username}/rooms`);
    this.rooms = response.data;
  },
  methods: {
    updateRoom(newRoom) {
      let index = this.rooms.findIndex(room => room.id === newRoom.id);
      this.rooms.splice(index, 1, newRoom);
    },
    deleteRoom(roomId) {
      let index = this.rooms.findIndex(room => room.id === roomId);
      this.rooms.splice(index, 1);
    },
    createRoom(newRoom) {
      this.rooms.splice(this.rooms.length - 1, 0, newRoom);
    }
  }
}

</script>
