<template>
  <div>
    <el-container>
      <el-main>
        <!-- User Profile -->
        <el-row type="flex" justify="space-around" :gutter="10">
          <el-col :xs="1" :sm="5" :md="6" :lg="7" :xl="8"></el-col>
          <el-col :xs="22" :sm="14" :md="12" :lg="10" :xl="8">
            <div>
              <h1>User Profile</h1>
              <!-- User Avatar -->
              <img :src="loggedInUser.avatarImgUrl" alt="User Avatar" class="avatar-image">
              <!-- User Update Form -->
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
                <el-input placeholder="Password" type="password" v-model="password" :value="password"></el-input>
                <el-input placeholder="Phone Number" type="tel" v-model="phoneNumber"></el-input>
                <el-input placeholder="Avatar URL" type="text" v-model="avatarImgUrl"></el-input>
                <el-row id="submit-button">
                  <el-button type="primary" icon="el-icon-check" @click="updateUser">Update</el-button>
                </el-row>
                <el-row>
                  <el-button icon="el-icon-d-arrow-left" @click="logout" class="logout-button">Logout</el-button>
                </el-row>
              </form>
            </div>
          </el-col>
          <el-col :xs="1" :sm="5" :md="6" :lg="7" :xl="8"></el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import UserService from "@/services/UserService.js";
export default {
  name: "userProfile",
  props: {
    loggedInUser: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      firstName: this.loggedInUser.firstName,
      lastName: this.loggedInUser.lastName,
      email: this.loggedInUser.email,
      password: this.loggedInUser.password,
      phoneNumber: this.loggedInUser.phoneNumber,
      avatarImgUrl: this.loggedInUser.avatarImgUrl,
      errors: []
    };
  },
  created() {
    // If user profile builds and no logged in user email is detected re-route home (invalid session):
    if (!this.loggedInUser.email) {
      console.log("Invalid session");
      this.$router.push({ name: "home" });
    }
  },
  methods: {
    updateUser() {
      // empty errors array if any existing errors:
      this.errors = [];

      // validate submission (front-end validations only):
      this.errors = this.validateUpdate(this);

      // if validation passes:
      if (this.errors.length === 0) {
        let userToUpdate = {
          id: this.id,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phoneNumber: this.phoneNumber,
          avatarImgUrl: this.avatarImgUrl,
          password: this.password
        };

        UserService.putUser(this.loggedInUser.id, userToUpdate)
          .then(response => {
            console.log(response.data);
            // update logged in user:
            this.$emit("updateGlobalUser", response.data);
          })
          .catch(error => {
            console.log("Error updating user: " + error.response);
            console.log(error.response);
          });
      }
    },
    validateUpdate(user) {
      let errors = [];
      // first and last name required and at least 2 characters:
      if (!user.firstName || !user.lastName) {
        errors.push("First and last name are both required.");
      } else if (user.firstName.length < 2 || user.lastName.length < 2) {
        errors.push("First and last name must be at least 2 characters.");
      }
      // email required and at least 5 characters:
      if (!user.email) {
        errors.push("Email is required.");
      } else if (user.email.length < 5) {
        errors.push("Email must be at least 5 characters.");
      }
      // Password cannot be empty and must be greater than 6 characters:
      if (!user.password) {
        errors.push("Password cannot be empty.");
      } else if (user.password.length < 6) {
        errors.push("Password must be at least 6 characters.");
      }
      // phone number required, at least 10 characters:
      if (!user.phoneNumber) {
        errors.push("Phone number is required.");
      } else if (user.phoneNumber.length < 10) {
        errors.push("Phone number must be at least 10 characters");
      }
      return errors;
    },
    logout() {
      this.$emit("logout");
    }
  }
};
</script>

<style>
</style>
