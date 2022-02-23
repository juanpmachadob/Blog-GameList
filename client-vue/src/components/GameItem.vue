<template>
  <div class="game-item">
    <figure class="game-image">
      <img
        :src="`${axios.defaults.baseURL}/uploads/games/${_id}`"
        :alt="title"
      />
      <figcaption>{{ likes }} <i class="fas fa-thumbs-up"> </i></figcaption>
    </figure>
    <div class="game-description">
      <h3>{{ title }}</h3>
      <p>{{ String(description).substring(0, 120) + "..." }}</p>
      <div class="game-btn">
        <a href="" class="btn btn-primary">Ver</a>
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