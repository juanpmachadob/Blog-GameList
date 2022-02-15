<template>
  <section class="login">
    <div class="container">
      <div class="card">
        <form class="card-white" @submit.prevent="login(user)">
          <h2>Log in</h2>
          <div class="form-item">
            <label for="email">Email</label>
            <input type="email" v-model="user.email" name="email" id="email" />
          </div>
          <div class="form-item">
            <label for="password">Password</label>
            <input
              type="password"
              v-model="user.password"
              name="password"
              id="password"
            />
          </div>
          <input type="submit" value="Sign In" class="btn btn-primary" />
          <span class="or">OR</span>
          <a href="" class="btn btn-primary">Google</a>
        </form>
        <div class="card-color">
          <h2>New here?</h2>
          <p>Sign up with your data and get started with us.</p>
          <router-link :to="{ name: 'Register' }" class="btn btn-secondary"
            >Sign Up</router-link
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data: () => ({
    user: {
      email: "",
      password: "",
    },
  }),
  methods: {
    ...mapActions(["saveToken"]),
    login() {
      this.axios
        .post("/auth/login", this.user)
        .then((res) => {
          this.saveToken(res.data.token);
          this.$router.push("/");
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
};
</script>