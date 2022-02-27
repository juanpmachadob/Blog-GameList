<template>
  <main>
    <div id="all-games" class="container">
      <div class="description">
        <h2>All games</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, nemo!
        </p>
        <router-link
          v-if="token"
          :to="{ name: 'games.add' }"
          class="btn btn-primary"
          >Add new game</router-link
        >
      </div>
      <div class="game-list">
        <GameItem
          v-for="(game, key) in games"
          :key="key"
          :_id="game._id"
          :title="game.title"
          :description="game.description"
          :likes="game.likes"
        />
      </div>
      <Paginator
        :key="total"
        :total="total"
        :limit="limit"
        @updatePage="getGames()"
      />
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";
import GameItem from "@/components/GameItem.vue";
import Paginator from "@/components/Paginator.vue";
export default {
  components: {
    GameItem,
    Paginator,
  },
  data: () => ({
    total: 0,
    limit: 10,
    games: [],
  }),
  mounted() {
    this.getGames();
  },
  methods: {
    getGames() {
      const page = parseInt(this.$route.query.page) || 1;
      this.axios
        .get(`/games?page=${page}&limit=${this.limit}`)
        .then((res) => {
          this.total = res.data.total;
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
  computed: {
    ...mapState(["token"]),
  },
};
</script>