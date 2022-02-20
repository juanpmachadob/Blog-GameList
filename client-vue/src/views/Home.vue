<template>
  <main>
    <PopularGames />
    <GameContainer />
  </main>
</template>

<script>
import PopularGames from "@/components/PopularGames.vue";
import GameContainer from "@/components/GameContainer.vue";
export default {
  name: "Home",
  components: {
    PopularGames,
    GameContainer,
  },
};
</script>
