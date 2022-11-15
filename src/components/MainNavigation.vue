<template>
  <ul class="nav nav-tabs" id="roomTab">
    <li class="nav-item" v-on:click="tabClick(0)">
      <a class="nav-link tab active" href="#windows">Windows</a>
    </li>
    <li class="nav-item" v-on:click="tabClick(1)">
      <a class="nav-link tab" href="#heaters">Heaters</a>
    </li>
  </ul>
</template>


<script>
export default {
  name: 'MainNavigation',
  methods: {
    tabClick(element) {
      for (let i = 0; i < tab.length; i++) {
        if (i == element) {
          this.showTabsContent(i);
          break;
        }
      }
    },
    hideTabsContent(a) {
      for (let i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add("hide");
        tab[i].classList.remove('active');
      }
    },
    showTabsContent(b) {
      if (tabContent[b].classList.contains('hide')) {
        this.hideTabsContent(0);
        tab[b].classList.add('active');
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
      }
    }
  }
}

let tab;
let tabContent;

window.onload = function () {
  tabContent = document.getElementsByClassName('tabContent');
  tab = document.getElementsByClassName('tab');
}

</script>

