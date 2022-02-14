<template>
  <section class="register">
    <div class="container">
      <div class="card">
        <form class="card-white" @submit.prevent="register()">
          <h2>Create account</h2>
          <div class="form-item">
            <label for="name">Name</label>
            <input type="text" v-model="user.name" name="name" id="name" />
          </div>
          <div class="form-item">
            <label for="email">Email</label>
            <input type="email" v-model="user.email" name="email" id="email" />
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
            </div>
            <div class="form-item">
              <label for="confirmPassword">Confirm password</label>
              <input
                type="password"
                v-model="user.confirmPassword"
                name="confirmPassword"
                id="confirmPassword"
              />
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
          <router-link :to="{ name: 'Login' }" class="btn btn-secondary"
            >Sign In</router-link
          >
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import Storage from "../../utilities/Storage";
export default {
  name: "Register",
  data: () => ({
    user: {
      name: "Test 1",
      email: "prueba@test.com",
      password: "Abc123456.",
      confirmPassword: "Abc123456.",
    },
    errors: {},
  }),
  methods: {
    register() {
      this.axios
        .post("/auth/register", this.user)
        .then((res) => {
          Storage.record("x-token", res.data.token);
          this.$router.push("/");
        })
        .catch((err) => {
          const errors = err.response.data.errors;
          if (errors) {
            console.log(errors);
            this.errors = errors;
          } else {
            console.log(err.response.data);
          }
        });
    },
  },
};
</script>