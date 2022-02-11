<template>
  <main id="home" class="home">
    <div class="container">
      <div class="popular-desc">
        <h1>Popular games</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero,
          temporibus.
        </p>
      </div>
      <div class="popular-games flex-row">
        <div v-for="index in 4" :key="index" class="game-item">
          <figure class="game-image">
            <img
              src="@/assets/images/jumping-planet.jpg"
              alt="Jumping Planet"
            />
            <figcaption>250 <i class="fas fa-thumbs-up"> </i></figcaption>
          </figure>
          <div class="game-description">
            <h3>Jumping Planet</h3>
            <p>Lorem ipsum, dolor sit amet consectetur...</p>
            <div>
              <a href="" class="btn btn-primary">Ver</a>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination">
        <a href="#">❮</a>
        <a href="#">❯</a>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "Home",
};
</script>
