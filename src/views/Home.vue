<template>
<!--  <home-section>-->
    <section class="main-content w-50 mx-auto">

      <!--      <main-navigation></main-navigation>-->
      <!--      <windows-list></windows-list>-->
      <building-input></building-input>
    </section>
<!--  </home-section>-->
</template>

<script>
import BuildingInput from "@/components/BuildingInput";

export default {
  name: "HomeSection",
  components: {
    // MainNavigation,
    // WindowsList
    BuildingInput
  },
  data: function() {
    return {
      // title: 'Faircorp Application',
      description: 'Application to manage buildings.'
    }
  }
}
</script>

<style scoped>

</style>