<template>
  <div class="window border border-secondary rounded p-2 mb-2" :class="{expanded: isExpanded}">
    <div class="top-row d-flex" @click="toggleExpand">
      <div class="window-name fw-bold pe-3">{{window.name}}</div>
<!--      <div class="room-name text-muted">{{window.room_name}}</div>-->

      <div class="open-status ms-4" :class="{open: isWindowOpen, closed: !isWindowOpen}">
        <template v-if="isWindowOpen">
          <span class="icon">&#x2B24;</span> Open
        </template>
        <template v-else>
          <span class="icon">&#x2716;</span> Closed
        </template>
      </div>

      <div class="expand-button ms-auto">
        {{ isExpanded ? '&#9660;' : '&#9658;' }}
      </div>
    </div>
    <template v-if="isExpanded">
      <hr/>
      <div class="details-footer d-flex">
        <button type="button" v-bind:class="isWindowOpen ? 'btn-secondary' : 'btn-success'" class="btn" @click="switchWindow">{{ isWindowOpen ? 'Close' : 'Open' }} window</button>
        <button type="button" class="btn btn-danger" @click="deleteWindow(window.id)">Delete window</button>
        <button type="button" class="btn btn-warning" @click="showRenameModal=true">Rename Window</button>
      </div>
    </template>
  </div>
  <rename-window-modal
      :open="showRenameModal"
      @onClose="showRenameModal=false"
      :window="window"
      @window-renamed="renameWindow"
  ></rename-window-modal>
</template>

<script>
import axios from 'axios';
import {API_HOST} from '../config';
import renameWindowModal from "@/components/RenameWindowModal";

export default {
  name: 'WindowsListItem',
  props: ['window'],
  components:{
    renameWindowModal
  },
  data: function() {
    return {
      isExpanded: false,
      showRenameModal:false
    }
  }, 
  computed: {
    isWindowOpen: function() {
      return this.window.status === 'OPEN';
    }
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
    async switchWindow() {
      let response = await axios.put(`${API_HOST}/api/rooms/${this.$route.params.id}/windows/${this.window.id}/switch`);
      let updatedWindow = response.data;
      this.$emit('window-updated', updatedWindow);
    },
    async deleteWindow(windowId) {
      let response = await axios.delete(`${API_HOST}/api/rooms/${this.$route.params.id}/windows/${windowId}`)
          .catch(function (error) {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
              return 0;
            }
          });
      // console.log(response);
      if (response) this.$emit('window-delete', windowId);
      // let updatedWindow = response.data;
    },
    renameWindow(newWindow) {
      this.$emit("window-updated", newWindow);
      // let index = this.rooms.findIndex(room => room.id === newRoom.id);
      // this.rooms.splice(index, 1, newRoom);
    },
  }
}
</script>

<style lang="scss" scoped>

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

.window {
  .top-row {
    cursor: pointer;
  }
}
.details-footer {
  display: flex;
  gap: 20px;
}
</style>
