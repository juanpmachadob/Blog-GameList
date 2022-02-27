<template>
  <header class="navbar">
    <div class="container navbar-content">
      <div class="navbar-head">
        <router-link to="/" class="logo">My game List</router-link>
        <div class="mobile">
          <div class="search">
            <input
              v-on:keyup.enter="search()"
              v-model="searchTerm"
              class="search-btn"
              type="search"
              placeholder="Search..."
              aria-valuemax="10"
            />
            <i
              @click="showSearchInput()"
              class="fa-solid fa-magnifying-glass"
            ></i>
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
        <router-link :to="{ name: 'games' }" class="nav-item nav-separator-left"
          >All games</router-link
        >
        <router-link :to="{ name: 'games.owned' }" class="nav-item"
          >My games</router-link
        >
        <router-link
          v-if="token"
          @click="logout()"
          to="/"
          class="nav-item red nav-separator-left"
          >Logout</router-link
        >
        <router-link
          v-if="!token"
          :to="{ name: 'login' }"
          class="nav-item nav-separator-left"
          >Sign In</router-link
        >
        <router-link v-if="!token" :to="{ name: 'register' }" class="nav-item"
          >Sign Up</router-link
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
    searchTerm: "",
  }),
  methods: {
    ...mapActions(["deleteToken"]),
    logout() {
      this.deleteToken();
    },
    showSearchInput() {
      if (window.innerWidth <= 768) {
        this.$swal({
          title: "hola",
          input: "text",
          showCancelButton: true,
          confirmButtonText: "Search",
          showLoaderOnConfirm: true,
        }).then((result) => {
          if (result.isConfirmed){
            this.searchTerm = result.value;
            this.search();
          }
        });
      } else {
        this.search();
      }
    },
    search() {
      if (this.searchTerm) {
        this.$router.push({
          name: "games.search",
          params: { term: this.searchTerm },
        });
      }
    },
  },
  computed: {
    ...mapState(["token"]),
  },
};
</script>