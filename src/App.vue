<template>
  <div id="app">
    <router-view @updateGlobalUser="updateGlobalUser" @logout="logout" :loggedInUser="loggedInUser" />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      loggedInUser: {
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        phoneNumber: null,
        avatarImgUrl: null
      }
    };
  },
  methods: {
    updateGlobalUser(user) {
      this.loggedInUser.id = user.id;
      this.loggedInUser.firstName = user.firstName;
      this.loggedInUser.lastName = user.lastName;
      this.loggedInUser.email = user.email;
      this.loggedInUser.password = user.password;
      this.loggedInUser.phoneNumber = user.phoneNumber;
      this.loggedInUser.avatarImgUrl = user.avatarImgUrl;
      console.log("This is the logged in user: ", this.loggedInUser);
    },
    logout() {
      // clear logged in user
      // there is probably a better way to "reset" this component to its original data state
      this.loggedInUser = {
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        phoneNumber: null,
        avatarImgUrl: null
      };
      // redirect home
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
