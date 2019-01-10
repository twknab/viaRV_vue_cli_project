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
      <el-input placeholder="Password" type="password" v-model="password"> </el-input>
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

        // find user by email and validate password:
        UserService.getUserByEmail(findUser.email)
          .then(response => {
            console.log("$$$$");
            console.log(response.data);
            if (response.data.length > 0) {
              console.log("User found, validating login...");
              // validate password;
              if (
                this.validatePassword(
                  findUser.password,
                  response.data[0].password
                )
              ) {
                // password is correct, update global user:
                this.$emit("updateGlobalUser", response.data[0]);

                // redirect to user profile:
                this.$router.push({ name: "userProfile" });
              } else {
                this.errors.push("Username or password is incorrect.");
              }
            } else {
              this.errors.push("Username or password is incorrect.");
            }
          })
          .catch(error => {
            console.log("Error logging in:");
            console.log(error.response);
          });
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
