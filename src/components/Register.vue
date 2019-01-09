<template>
  <div>
    <h1>Register</h1>
    <p>{{ msg  }}</p>
    <form>
      <div v-if="errors.length" class="errors">
        <el-alert v-for="error in errors" :key="errors.indexOf(error)"
          :title="error"
          type="error">
        </el-alert>
      </div>
      <el-input placeholder="First Name" v-model="firstName"></el-input>
      <el-input placeholder="Last Name" v-model="lastName"></el-input>
      <el-input placeholder="Email" type="email" v-model="email"></el-input>
      <el-input placeholder="Password" type="password" v-model="password"></el-input>
      <el-input placeholder="Phone Number" type="tel" v-model="phoneNumber"></el-input>
      <el-row id="submit-button">
        <el-button type="primary" icon="el-icon-plus" @click="registerUser">Register</el-button>
      </el-row>
    </form>
  </div>
</template>

<script>
import UserService from "@/services/UserService.js";
export default {
  name: "Register",
  props: {
    msg: {
      type: String
    }
  },
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      phoneNumber: null,
      errors: []
    };
  },
  methods: {
    registerUser() {
      // begin validation:

      // empty errors array if any existing errors:
      this.errors = [];

      // validate submission (front-end validations only):
      this.errors = this.validateRegistration(this);

      // if validation passes:
      if (this.errors.length === 0) {
        // capture new user details:
        let newUser = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          phoneNumber: this.phoneNumber
        };

        // reset values to null after form submission:
        this.firstName = null;
        this.lastName = null;
        this.email = null;
        this.password = null;
        this.phoneNumber = null;

        // emit to global function and send new User to update global scope:
        UserService.postUser(newUser)
          .then(response => {
            console.log(response.data);
            // update logged in user:
            this.$emit("login-user", newUser);
            // load profile:
            this.$router.push({ name: "userProfile" });
          })
          .catch(error => {
            console.log("there was an error" + error.response);
          });
      }
    },
    validateRegistration(user) {
      // create array to store errors:
      let errors = [];
      // first and last name required and at least 2 characters:
      if (!user.firstName || !user.lastName) {
        errors.push("First and last name are both required.");
      } else if (user.firstName.length < 2 || user.lastName.length < 2) {
        errors.push("First and last name must be at least 2 characters.");
      }
      // email and password required, password at least 6 characters:
      if (!user.email || !user.password) {
        errors.push("Email and password are both required.");
      } else if (user.password.length < 6) {
        errors.push("Password must be at least 6 characters.");
      } else if (user.email.length < 5) {
        errors.push("Email must be at least 5 characters.");
      }
      // phone number required, at least 10 characters:
      if (!user.phoneNumber) {
        errors.push("Phone number is required.");
      } else if (user.phoneNumber.length < 10) {
        errors.push("Phone number must be at least 10 characters");
      }
      return errors;
    }
  }
};
</script>

<style>
</style>
