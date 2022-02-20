<template>
  <header class="navbar">
    <div class="container navbar-content">
      <div class="navbar-head">
        <router-link to="/" class="logo">My game List</router-link>
        <div class="mobile">
          <div class="search">
            <input
              class="search-btn"
              type="search"
              placeholder="Search..."
              aria-valuemax="10"
            />
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <div class="mobile-menu">
            <a v-on:click="menuOpen = !menuOpen">
              <i class="fas fa-bars"></i>
            </a>
          </div>
        </div>
      </div>
      <nav
        class="navigation"
        v-bind:class="{ 'mobile-menu-active': !menuOpen }"
      >
        <router-link :to="{ name: 'home' }" class="nav-item nav-separator"
          >Games</router-link
        >
        <router-link v-if="!token" :to="{ name: 'login' }" class="nav-item"
          >Sign In</router-link
        >
        <router-link v-if="!token" :to="{ name: 'register' }" class="nav-item"
          >Sign Up</router-link
        >
        <router-link v-if="token" @click="logout()" to="/" class="nav-item red"
          >Logout</router-link
        >
      </nav>
    </div>
  </header>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Navbar",
  data: () => ({
    menuOpen: false,
  }),
  methods: {
    ...mapActions(["deleteToken"]),
    logout() {
      this.deleteToken();
    },
  },
  computed: {
    ...mapState(["token"]),
  },
};
</script>

<style>
a.red {
  color: #eb626b;
}
</style>