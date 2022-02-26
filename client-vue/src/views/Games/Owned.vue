<template>
  <main>
    <div id="all-games" class="container">
      <div class="description">
        <h2>Games added by you</h2>
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
        @updatePage="getOwnedGames()"
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
    this.getOwnedGames();
  },
  methods: {
    getOwnedGames() {
      const page = parseInt(this.$route.query.page) || 1;
      this.axios
        .get(`/games/owned?page=${page}&limit=${this.limit}`, {
          headers: { "x-token": this.token },
        })
        .then((res) => {
          this.total = res.data.total;
          this.games = res.data.games;
        })
        .catch((err) => {
          if (err.response.status === 400) {
            console.log(err.response.data.errors);
          } else {
            console.log(err.response.data.msg);
          }
        });
    },
  },
  computed: {
    ...mapState(["token"]),
  },
};
</script>