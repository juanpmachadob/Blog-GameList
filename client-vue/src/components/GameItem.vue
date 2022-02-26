<template>
  <div class="game-item">
    <figure class="game-image" style="max-height: 250px">
      <img
        :src="`${axios.defaults.baseURL}/uploads/games/${_id}`"
        :alt="title"
      />
      <figcaption>{{ likes }} <i class="fas fa-thumbs-up"> </i></figcaption>
    </figure>
    <div class="game-description">
      <h3>{{ title.charAt(0).toUpperCase() + title.slice(1) }}</h3>
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
};
</script>