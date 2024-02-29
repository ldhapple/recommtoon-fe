<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'MobileFooter',
  data() {
    return {
      isMenuVisible: false,
      activeMenu: '',
      menus: [
        {name: 'Features', path: '/'},
        {name: 'Pricing', path: '/'},
        {name: 'FAQs', path: '/'},
        {name: 'About', path: '/'},
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

</style>