<template>
  <div class="room border border-secondary rounded p-2 mb-2" :class="{expanded: isExpanded}">
    <div class="top-row d-flex" @click="toggleExpand">
      <div class="room-name fw-bold pe-3">{{ room.name }}</div>
      <div class="room-floor text-muted"><strong>floor: </strong> {{ room.floor }}</div>

      <!--      <div class="open-status ms-4" :class="{open: isWindowOpen, closed: !isWindowOpen}">-->
      <!--        <template v-if="isWindowOpen">-->
      <!--          <span class="icon">&#x2B24;</span> Open-->
      <!--        </template>-->
      <!--        <template v-else>-->
      <!--          <span class="icon">&#x2716;</span> Closed-->
      <!--        </template>-->
      <!--      </div>-->

      <div class="expand-button ms-auto">
        {{ isExpanded ? '&#9660;' : '&#9658;' }}
      </div>
    </div>
    <template v-if="isExpanded">
      <hr/>
      <div class="room-expanded-section details d-flex">
        <div class="details-body">
          <div class="temperature">
            Current Temperature: <h4>{{ room.current_temperature }}</h4>
          </div>
          <div class="temperature">
            Target Temperature: <h4>{{ room.target_temperature }}</h4>
          </div>
        </div>
        <div class="details-footer">
          <router-link v-bind:to="'/rooms/' + room.id" class="btn btn-success">View Room</router-link>
          <!--        <button type="button" class="btn btn-secondary me-2" @click="switchWindow">{{ isWindowOpen ? 'Close' : 'Open' }} window</button>-->
          <button type="button" class="btn btn-danger" @click="deleteRoom(room.id)">Delete room</button>
          <button type="button" class="btn btn-warning" @click="showRenameModal=true">Rename Room</button>

        </div>
      </div>
    </template>
  </div>
  <rename-room-modal
      :open="showRenameModal"
      @onClose="showRenameModal=false"
      :room="room"
      :building_username="building_username"
      @room-renamed="renameRoom"
  ></rename-room-modal>
</template>

<script>
import axios from 'axios';
import {API_HOST} from '../config';
import renameRoomModal from "@/components/RenameRoomModal";

export default {
  name: 'RoomListItem',
  props: ['room','building_username'],
  components:{
    renameRoomModal,
  },
  data: function () {
    return {
      isExpanded: false,
      showRenameModal: false,
    }
  },
  computed: {
    isWindowOpen: function () {
      // return this.window.windowStatus === 'OPEN';
      return true;
    }
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
    // async switchWindow() {
    //   let response = await axios.put(`${API_HOST}/api/windows/${this.window.id}/switch`);
    //   let updatedWindow = response.data;
    //   this.$emit('window-updated', updatedWindow);
    // }
    async deleteRoom(roomId) {
      console.log(roomId);
      let response = await axios.delete(`${API_HOST}/api/buildings/${this.building_username}/rooms/${this.room.id}`)
          .catch(function (error) {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
              return 0;
            }
          });
      // console.log(response);
      if (response) this.$emit('room-delete', roomId);
      // let updatedWindow = response.data;
    },
    renameRoom(newRoom) {
      this.$emit("room-updated", newRoom);
      // let index = this.rooms.findIndex(room => room.id === newRoom.id);
      // this.rooms.splice(index, 1, newRoom);
    },
  }
}
</script>

<style lang="scss" scoped>
.room-expanded-section {
  flex-direction: column;
  align-items: flex-start;

  .details-body {
    flex-direction: row;
    display: flex;
    gap: 40px;
    margin-bottom: 20px;

    .temperature {
      flex-direction: row;
      display: flex;
      gap: 10px;
    }
  }

  .details-footer {
    display: flex;
    gap: 20px;
  }
}

.open-status {
  .icon {
    position: relative;
  }

  &.open {
    color: #198754;

    .icon {
      font-size: 12px;
      top: -3px;
    }
  }

  &.closed {
    color: #dc3545;
  }
}

.room {
  .top-row {
    cursor: pointer;
  }
}
</style>
