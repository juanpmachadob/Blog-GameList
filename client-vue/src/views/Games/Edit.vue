<template>
  <section class="login">
    <div class="container">
      <div class="card">
        <form @submit.prevent="editGame()">
          <h2>Edit game</h2>
          <div class="form-item">
            <label for="title">Title</label>
            <input type="text" v-model="game.title" name="title" id="title" />
          </div>
          <div class="form-item">
            <label for="description">Description</label>
            <input
              type="text"
              v-model="game.description"
              name="description"
              id="description"
            />
          </div>
          <div class="form-item">
            <label for="Category">Category</label>
            <select name="category" id="category" v-model="game.category">
              <option disabled value="">Select category...</option>
              <option
                v-for="(category, index) in categories"
                :key="index"
                v-bind:value="category._id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
          <div class="form-item">
            <label for="file">Image file</label>
            <input
              @change="handleFileUpload($event)"
              type="file"
              name="file"
              id="file"
            />
            <div class="image-preview">
              <figure v-if="filePreview && file">
                <img :src="filePreview" :alt="file.name" />
              </figure>
              <figure v-else>
                <img :src="game.img" :alt="game.title" />
              </figure>
            </div>
          </div>
          <div class="form-50 buttons">
            <router-link :to="{ name: 'home' }" class="btn btn-secondary"
              >Back</router-link
            >
            <input type="submit" value="Edit game" class="btn btn-primary" />
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    game: {
      title: "",
      description: "",
      category: "",
    },
    filePreview: null,
    file: null,
    categories: [],
  }),
  mounted() {
    this.getGame();
    this.getCategories();
  },
  methods: {
    getGame() {
      this.axios.get(`/games/${this.$route.params.id}`).then((res) => {
        this.game = res.data.game;
        this.game.category = res.data.game.category._id;
      });
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.file = file;
      console.log(file);

      // File preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.filePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    getCategories() {
      this.axios
        .get("/categories")
        .then((res) => {
          this.categories = res.data.categories;
        })
        .catch((err) => {
          if (err.response.status === 400) {
            console.log(err.response.data.errors);
          } else {
            console.log(err.response.data.msg);
          }
        });
    },
    editGame() {
      this.axios
        .put(`/games/${this.$route.params.id}`, this.game, {
          headers: { "x-token": this.token },
        })
        .then((res) => {
          if (this.file) {
            return this.uploadImage(res.data.newGame._id);
          }
        })
        .then((res) => {
          this.$swal({
            icon: "success",
            title: "Game modified successfully!",
          });
          this.$router.push({
            name: "games.index",
            params: { id: this.$route.params.id },
          });
        })
        .catch((err) => {
          const errors = err.response.data.errors;
          if (errors) {
            console.log(errors);
            this.errors = errors;
          } else {
            console.log(err.response);
          }
        });
    },
    uploadImage(_id) {
      const formData = new FormData();
      formData.append("file", this.file);
      return this.axios.put(`/uploads/games/${_id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-token": this.token,
        },
      });
    },
  },
  computed: {
    ...mapState(["token"]),
  },
};
</script>