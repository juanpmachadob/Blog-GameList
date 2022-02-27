<template>
  <main class="container">
    <div class="description">
      <h1>Popular games</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero,
        temporibus.
      </p>
    </div>
    <div class="popular-games flex-row" id="game-overflow">
      <GameItem
        v-for="(game, key) in games"
        :key="key"
        :_id="game._id"
        :title="game.title"
        :description="game.description"
        :likes="game.likes"
      />
    </div>
    <div class="pagination">
      <a href="#" @click="moveOverflow(-80)">❮</a>
      <a href="#" @click="moveOverflow(80)">❯</a>
    </div>
  </main>
</template>

<script>
import GameItem from "@/components/GameItem.vue";

export default {
  name: "PopularGames",
  components: {
    GameItem,
  },
  data: () => ({
    games: [],
  }),
  mounted() {
    this.getPopularGames();
  },
  methods: {
    moveOverflow: (pixels) => {
      let popularGames = document.querySelector("#game-overflow");
      popularGames.scrollLeft += pixels;
      event.preventDefault();
    },
    getPopularGames() {
      this.axios
        .get("/games/popular?limit=10")
        .then((res) => {
          this.games = res.data.games;
        })
        .catch((err) => {
          this.$swal({
            icon: "error",
            title: "An error has ocurred.",
            text: err,
          });
        });
    },
  },
};
</script>