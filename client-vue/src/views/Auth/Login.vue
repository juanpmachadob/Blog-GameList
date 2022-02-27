<template>
  <section class="login">
    <div class="container">
      <div class="multi-card">
        <form class="card-white" @submit.prevent="login(user)">
          <h2>Log in</h2>
          <div class="form-item">
            <label for="email">Email</label>
            <input type="email" v-model="user.email" name="email" id="email" />
            <span class="errors" v-if="errors.has('email')">{{
              errors.get("email")
            }}</span>
          </div>
          <div class="form-item">
            <label for="password">Password</label>
            <input
              type="password"
              v-model="user.password"
              name="password"
              id="password"
            />
            <span class="errors" v-if="errors.has('password')">{{
              errors.get("password")
            }}</span>
          </div>
          <input type="submit" value="Sign In" class="btn btn-primary" />
          <span class="or">OR</span>
          <a href="" class="btn btn-primary">Google</a>
        </form>
        <div class="card-color">
          <h2>New here?</h2>
          <p>Sign up with your data and get started with us.</p>
          <router-link :to="{ name: 'register' }" class="btn btn-secondary"
            >Sign Up</router-link
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import Errors from "@/utilities/Errors";
export default {
  name: "Login",
  data: () => ({
    errors: new Errors(),
    user: {
      email: "",
      password: "",
    },
  }),
  methods: {
    ...mapActions(["saveToken"]),
    login() {
      this.errors.clearAll();
      this.axios
        .post("/auth/login", this.user)
        .then((res) => {
          this.saveToken(res.data.token);
          this.$router.push("/");
        })
        .catch((err) => {
          const errorData = err.response.data;
          let msg = "";

          if (errorData.errors) {
            this.errors.record(errorData.errors);
            msg = "The fields are not valid";
          } else if (errorData.msg) {
            msg = errorData.msg;
          } else {
            msg = err;
          }

          this.$swal({
            icon: "error",
            title: "An error has ocurred.",
            text: msg,
          });
        });
    },
  },
};
</script>