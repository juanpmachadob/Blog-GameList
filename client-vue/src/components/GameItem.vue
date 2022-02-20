<template>
  <div class="game-item">
    <figure class="game-image">
      <img src="@/assets/images/jumping-planet.jpg" alt="Jumping Planet" />
      <figcaption>{{ likes }} <i class="fas fa-thumbs-up"> </i></figcaption>
    </figure>
    <div class="game-description">
      <h3>{{ title }}</h3>
      <p>{{ String(description).substring(0, 120) + "..." }}</p>
      <div>
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