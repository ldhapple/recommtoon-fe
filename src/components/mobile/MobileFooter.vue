<script>
export default {
  name: 'MobileFooter',
  data() {
    return {
      isMenuVisible: false,
      activeMenu: '',
      menus: [
        {name: '전체웹툰', path: '/allWebtoons'},
        {name: '평가하기', path: '/evaluate'},
        {name: 'AI추천', path: '/recommendation'},
        {name: '친구의웹툰', path: '/friendWebtoon'},
      ],
    };
  },
  methods: {
    setActiveMenu(menuName) {
      this.activeMenu = menuName;
      this.isMenuVisible = false; // Close the navbar-collapse on click
    }
  }
}
</script>

<template>
  <footer class="d-flex justify-content-center py-3">
    <ul class="nav nav-pills">
      <li v-for="menu in menus" :key="menu.name" class="nav-item">
        <router-link :to="menu.path" class="nav-link" :class="{ 'active': activeMenu === menu.name }"
                     @click="setActiveMenu(menu.name)">
          {{ menu.name }}
        </router-link>
      </li>
    </ul>
  </footer>
</template>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #f8f9fa;
  z-index: 100;
}

.nav-link {
  font-size: 0.775rem;
}
</style>