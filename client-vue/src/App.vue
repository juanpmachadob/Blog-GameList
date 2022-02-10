<template>
  <Navbar />
  <router-view></router-view>
  <Footer />
</template>

<script>
import "@/assets/css/normalize.css";
import "@/assets/css/styles.css";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
    components: {
    Navbar,
    Footer,
  },
};
</script>