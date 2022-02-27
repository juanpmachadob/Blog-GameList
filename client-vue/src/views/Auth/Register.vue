<template>
  <section class="register">
    <div class="container">
      <div class="multi-card">
        <form class="card-white" @submit.prevent="register()">
          <h2>Create account</h2>
          <div class="form-item">
            <label for="name">Name</label>
            <input type="text" v-model="user.name" name="name" id="name" />
            <span class="errors" v-if="errors.has('name')">{{
              errors.get("name")
            }}</span>
          </div>
          <div class="form-item">
            <label for="email">Email</label>
            <input type="email" v-model="user.email" name="email" id="email" />
            <span class="errors" v-if="errors.has('email')">{{
              errors.get("email")
            }}</span>
          </div>
          <div class="form-50">
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
            <div class="form-item">
              <label for="passwordConfirmation">Confirm password</label>
              <input
                type="password"
                v-model="user.passwordConfirmation"
                name="passwordConfirmation"
                id="passwordConfirmation"
              />
              <span class="errors" v-if="errors.has('passwordConfirmation')">{{
                errors.get("passwordConfirmation")
              }}</span>
            </div>
          </div>
          <input type="submit" value="Sign Up" class="btn btn-primary" />
          <span class="or">OR</span>
          <a href="" class="btn btn-primary">Google</a>
        </form>
        <div class="card-color">
          <h2>Welcome again!</h2>
          <p>
            If you already have an account, please login with your information.
          </p>
          <router-link :to="{ name: 'login' }" class="btn btn-secondary"
            >Sign In</router-link
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
  name: "Register",
  data: () => ({
    errors: new Errors(),
    user: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  }),
  methods: {
    ...mapActions(["saveToken"]),
    register() {
      this.errors.clearAll();
      this.axios
        .post("/auth/register", this.user)
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
            text: msg
          });
        });
    },
  },
};
</script>