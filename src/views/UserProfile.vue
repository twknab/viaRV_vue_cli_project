<template>
  <div>
    <h1>User Profile</h1>
    <el-button @click="logout">Logout</el-button>
    <!-- <form action="" @submit.prevent="updateUser">
      <div v-if="errors.length" class="errors">
        <el-alert v-for="error in errors" :key="errors.indexOf(error)"
          :title="error"
          type="error">
        </el-alert>
      </div>
      <img :src="loggedInUser.avatarImgUrl" alt="User Avatar">
      <br/>
      <input v-model="firstName" type="text" name="firstName" id="firstName" :placeholder="loggedInUser.firstName">
      <br/>
      <input v-model="lastName" type="text" name="lastName" id="lastName" :placeholder="loggedInUser.lastName">
      <br/>
      <input v-model="email" type="text" name="email" id="email" :placeholder="loggedInUser.email">
      <br/>
      <input v-model="phoneNumber" type="tel" name="phone" id="phone" :placeholder="loggedInUser.phoneNumber">
      <br/>
      <input v-model="avatarImgUrl" type="text" name="avatarImgUrl" id="avatarImgUrl" :placeholder="loggedInUser.avatarImgUrl">
      <br/>
      <input type="submit" value="Update">
    </form> -->
  </div>
</template>

<script>
export default {
  name: "userProfile",
  props: {
    // loggedInUser: {
    //   type: Object,
    //   required: true
    // }
  },
  data() {
    return {
      firstName: this.loggedInUser.firstName,
      lastName: this.loggedInUser.lastName,
      email: this.loggedInUser.email,
      phoneNumber: this.loggedInUser.phoneNumber,
      avatarImgUrl: this.loggedInUser.avatarImgUrl,
      errors: []
    };
  },
  methods: {
    updateUser() {
      // empty errors array if any existing errors:
      this.errors = [];

      // validate submission (front-end validations only):
      this.errors = this.updateUserValidation(this);

      // if validation passes:
      if (this.errors.length === 0) {
        let updatedUser = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phoneNumber: this.phoneNumber,
          avatarImgUrl: this.avatarImgUrl
        };
        this.$emit("update-user", updatedUser);
      }
    },
    updateUserValidation(user) {
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
      // phone number required, at least 10 characters:
      if (!user.phoneNumber) {
        errors.push("Phone number is required.");
      } else if (user.phoneNumber.length < 10) {
        errors.push("Phone number must be at least 10 characters");
      }
      return errors;
    },
    logout() {
      console.log("logging out");
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style>
</style>
