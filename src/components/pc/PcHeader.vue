<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Recommtoon</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"
                @click="isMenuVisible = !isMenuVisible">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" :class="{ 'show': isMenuVisible }" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li v-for="menu in menus" :key="menu.name" class="nav-item">
              <router-link :to="menu.path" class="nav-link" :class="{ 'active': activeMenu === menu.name }"
                           @click="setActiveMenu(menu.name)">
                {{ menu.name }}
              </router-link>
            </li>
          </ul>
          <div class="text-end">
            <button type="button" class="btn btn-outline-light me-2" @click="$router.push('/login')">Login</button>
            <button type="button" class="btn btn-warning" @click="$router.push('/register')">회원 가입</button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'PcHeader',
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

<style scoped>
</style>