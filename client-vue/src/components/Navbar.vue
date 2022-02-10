<template>
  <header class="navbar">
    <div class="container navbar-content">
      <div class="navbar-head">
        <a href="#" class="logo">My Game List</a>
        <div class="mobile">
          <div class="search">
            <input class="search-btn" type="search" placeholder="Search..." />
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
        <a href="" class="nav-item">Sign In</a>
        <a href="" class="nav-item">Sign Up</a>
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