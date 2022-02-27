<template>
  <main class="game-page">
    <div class="container">
      <div class="game-main card">
        <figure class="game-image">
          <img
            :src="`${axios.defaults.baseURL}/uploads/games/${this.$route.params.id}`"
            :alt="game.title"
          />
          <figcaption>
            {{ game.likes }} <i class="fas fa-thumbs-up"> </i>
          </figcaption>
        </figure>

        <article class="game-info">
          <h1>
            {{ game.title }}
          </h1>
          <p>{{ game.description }}</p>
        </article>
      </div>
      <aside class="game-aside">
        <div class="card">
          <h2>About game</h2>
          <div class="game-info">
            <div>
              <b>Category:</b>
              <p>{{ game.category.name }}</p>
            </div>
            <div>
              <b>Added by:</b>
              <p>{{ game.user.name }}</p>
            </div>
          </div>
          <div class="form-50 buttons" v-if="token && canManage">
            <router-link
              :to="{
                name: 'games.edit',
                params: { id: this.$route.params.id },
              }"
              class="btn btn-primary"
              >Modify game</router-link
            >
            <a @click="deleteGameAlert()" class="btn btn-secondary"
              >Delete game</a
            >
          </div>
        </div>
      </aside>
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    game: {
      title: "",
      category: {},
      user: {},
    },
    canManage: false,
  }),
  mounted() {
    this.getGame();
  },
  methods: {
    getGame() {
      this.axios
        .get(`/games/${this.$route.params.id}`)
        .then((res) => {
          this.game = res.data.game;
          this.canManage = res.data.canManage;
        })
        .catch((err) => {
          this.$router.push({
            name: "404",
          });
        });
    },
    deleteGameAlert() {
      this.$swal({
        title: "¿Are you sure?",
        text: `The game '${this.game.title}' will be removed.`,
        icon: "warning",
        showCancelButton: true,
      })
        .then((result) => {
          if (result.isConfirmed) {
            return this.deleteGame();
          }
        })
        .catch((err) => {
          this.$swal({
            icon: "error",
            title: "An error has ocurred.",
            text: err.response.data.msg ? err.response.data.msg : err,
          });
        });
    },
    deleteGame() {
      return this.axios
        .delete(`/games/${this.$route.params.id}`, {
          headers: {
            "x-token": this.token,
          },
        })
        .then((res) => {
          this.$swal({
            icon: "success",
            title: `The game '${res.data.game.title}' was removed.`,
          });
          this.$router.push("/");
        });
    },
  },
  computed: {
    ...mapState(["token"]),
  },
};
</script>