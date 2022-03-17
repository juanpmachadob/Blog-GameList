<template>
  <div class="game-item">
    <figure class="game-image" style="max-height: 250px">
      <img
        :src="`${axios.defaults.baseURL}/uploads/games/${_id}`"
        :alt="title"
      />
      <figcaption @click="sendShowPage()">
        <i class="fas fa-thumbs-up"></i> {{ likes }}
      </figcaption>
    </figure>
    <div class="game-description">
      <h3>{{ title }}</h3>
      <p>{{ String(description).substring(0, 120) + "..." }}</p>
      <div class="game-btn">
        <router-link
          :to="{ name: 'games.show', params: { id: _id } }"
          class="btn btn-primary"
          >View</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameItem",
  props: {
    _id: { type: String, default: "" },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    likes: { type: Number, default: 0 },
  },
  methods: {
    sendShowPage() {
      this.$router.push({
        name: "games.show",
        params: {
          id: this._id,
        },
      });
    },
  },
};
</script>