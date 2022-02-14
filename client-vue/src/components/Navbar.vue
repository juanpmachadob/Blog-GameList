<template>
  <header class="navbar">
    <div class="container navbar-content">
      <div class="navbar-head">
        <router-link to="/" class="logo">My game List</router-link>
        <div class="mobile">
          <div class="search">
            <input class="search-btn" type="search" placeholder="Search..." aria-valuemax="10"/>
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
      <router-link :to="{ name: 'Home' }" class="nav-item nav-separator">Games</router-link>
      <router-link :to="{ name: 'Login' }" class="nav-item">Sign In</router-link>
      <router-link :to="{ name: 'Register' }" class="nav-item">Sign Up</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "Navbar",
  data: () => ({
    menuOpen: false,
  }),
};
</script>