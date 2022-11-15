<template>
  <div class="tabContent show">
    <div class="mt-3">
      <button class="btn btn-primary" type="button" @click="showModal=true">Create Window</button>
    </div>
    <div class="windows-list active pt-3" id="windows">
      <windows-list-item
          v-for="window in windows"
          :window="window"
          :key="window.id"
          :room_id="this.$route.params.id"
          @window-updated="updateWindow"
          @window-delete="deleteWindow"
      >
      </windows-list-item>
    </div>
  </div>
  <create-window-modal
      :open="showModal"
      @onClose="showModal=false"
      :room_id="this.$route.params.id"
      @window-created="createWindow"
  ></create-window-modal>
</template>


<script>
import axios from 'axios';
import {API_HOST} from '../config';
import WindowsListItem from './WindowsListItem';
import createWindowModal from "@/components/CreateWindowModal";

export default {
  components: {
    WindowsListItem,
    createWindowModal
  },
  name: 'WindowsList',
  data: function () {
    return {
      /* Initialize windows with an empty array, while waiting for actual data to be retrieved from the API */
      windows: [],
      showModal: false
    }
  },
  created: async function () {
    let response = await axios.get(`${API_HOST}/api/rooms/${this.$route.params.id}/windows`);
    this.windows = response.data;
  },
  methods: {
    updateWindow(newWindow) {
      /* Find the place of window object with the same Id in the array, and replace it */
      let index = this.windows.findIndex(window => window.id === newWindow.id);
      this.windows.splice(index, 1, newWindow);
    },
    deleteWindow(windowId) {
      let index = this.windows.findIndex(window => window.id === windowId);
      this.windows.splice(index, 1);
    },
    createWindow(newWindow) {
      this.windows.splice(this.windows.length - 1, 0, newWindow);
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