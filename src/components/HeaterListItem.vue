<template>
  <div class="heater border border-secondary rounded p-2 mb-2" :class="{expanded: isExpanded}">
    <div class="top-row d-flex" @click="toggleExpand">
      <div class="heater-name fw-bold pe-3">{{ heater.name }}</div>
      <div class="room-name text-muted">power: <strong>{{ heater.power }}</strong></div>

      <div class="open-status ms-4" :class="{open: isHeaterOn, closed: !isHeaterOn}">
        <template v-if="isHeaterOn">
          <span class="icon">&#x2B24;</span> On
        </template>
        <template v-else>
          <span class="icon">&#x2716;</span> Off
        </template>
      </div>

      <div class="expand-button ms-auto">
        {{ isExpanded ? '&#9660;' : '&#9658;' }}
      </div>
    </div>
    <template v-if="isExpanded">
      <hr/>
      <div class="details-footer d-flex">
        <button type="button" v-bind:class="isHeaterOn ? 'btn-secondary' : 'btn-success'" class="btn"
                @click="switchHeater">{{ isHeaterOn ? 'On' : 'Off' }} heater
        </button>
        <button type="button" class="btn btn-danger" @click="deleteHeater(heater.id)">Delete heater</button>
        <button type="button" class="btn btn-warning" @click="showRenameModal=true">Rename Heater</button>
      </div>
    </template>
  </div>
  <rename-heater-modal
      :open="showRenameModal"
      @onClose="showRenameModal=false"
      :heater="heater"
      @heater-renamed="renameHeater"
  ></rename-heater-modal>
</template>

<script>
import axios from 'axios';
import {API_HOST} from '../config';
import renameHeaterModal from "@/components/RenameHeaterModal";

export default {
  name: 'HeatersListItem',
  props: ['heater'],
  components: {
    renameHeaterModal
  },
  data: function () {
    return {
      isExpanded: false,
      showRenameModal: false
    }
  },
  computed: {
    isHeaterOn: function () {
      return this.heater.status === 'ON';
    }
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
    async switchHeater() {
      let response = await axios.put(`${API_HOST}/api/rooms/${this.$route.params.id}/heaters/${this.heater.id}/switch`);
      let updatedHeater = response.data;
      this.$emit('heater-updated', updatedHeater);
    },
    async deleteHeater(heaterId) {
      let response = await axios.delete(`${API_HOST}/api/rooms/${this.$route.params.id}/heaters/${heaterId}`)
          .catch(function (error) {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
              return 0;
            }
          });
      // console.log(response);
      if (response) this.$emit('heater-delete', heaterId);
      // let updatedHeater = response.data;
    },
    renameHeater(newHeater) {
      this.$emit("heater-updated", newHeater);
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

.heater {
  .top-row {
    cursor: pointer;
  }
}

.details-footer {
  display: flex;
  gap: 20px;
}
</style>
