<template>
  <div>
    <h1>Login</h1>
    <p>{{ msg  }}</p>
    <form>
      <div v-if="errors.length" class="errors">
        <el-alert v-for="error in errors" :key="errors.indexOf(error)"
          :title="error"
          type="error">
        </el-alert>
      </div>
      <el-input placeholder="Email" v-model="email"> </el-input>
      <el-input placeholder="Password" v-model="password"> </el-input>
      <el-row id="submit-button">
        <el-button type="primary" icon="el-icon-d-arrow-right" @click="loginUser">Login</el-button>
      </el-row>
    </form>
  </div>
</template>

<script>
import UserService from "@/services/UserService.js";
export default {
  name: "Login",
  props: {
    msg: {
      type: String
    }
  },
  data() {
    return {
      email: null,
      password: null,
      errors: []
    };
  },
  methods: {
    loginUser() {
      // begin validation:

      // empty errors array if any existing errors:
      this.errors = [];

      // validate submission (front-end validations only):
      this.errors = this.validateLogin(this);

      // If validation passes:
      if (this.errors.length === 0) {
        // capture user details to find:
        let findUser = {
          email: this.email,
          password: this.password
        };

        // reset values to null after form submission:
        this.email = null;
        this.password = null;
      }
    },
    validateLogin(user) {
      // create array to store errors:
      let errors = [];
      // email and password required, password at least 6 characters:
      if (!user.email || !user.password) {
        errors.push("Email and password are both required.");
        return errors;
      } else if (user.password.length < 6) {
        errors.push("Password must be at least 6 characters.");
      }
      // store our user supplied password because `user.password` does not seem to be accessible within our promises below.
      let suppliedPassword = user.password;
      UserService.getUser(user.email)
        .then(response => {
          console.log(response.data);
          if (response.data.length > 0) {
            console.log("User found, validating login...");
            // validate password;
            if (
              this.validatePassword(suppliedPassword, response.data[0].password)
            ) {
              // Password correct load profile:
              // update global user:
              this.$emit("login-user", response.data[0]);

              // redirect to user profile:
              this.$router.push({ name: "userProfile" });
            } else {
              errors.push("Username or password is incorrect.");
            }
          } else {
            errors.push("Username or password is incorrect.");
          }
        })
        .catch(error => {
          console.log("Error logging in: " + error.response);
        });
      return errors;
    },
    validatePassword(submittedPassword, foundPassword) {
      return submittedPassword == foundPassword;
    }
  }
};
</script>

<style>
</style>
