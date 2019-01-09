<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/viarv-logo.png" class="logo">
    <el-container>
      <el-main>
        <!-- Login -->
        <el-row type="flex" justify="space-around" :gutter="10">
          <el-col :xs="1" :sm="6" :md="8" :lg="7" :xl="8"></el-col>
          <el-col :xs="22" :sm="12" :md="8" :lg="10" :xl="8">
            <div>
            <Login msg="If you're an existing user, login below:" :login-user="loginNewUser"/>
            </div>
          </el-col>
          <el-col :xs="1" :sm="6" :md="8" :lg="7" :xl="8"></el-col>
        </el-row>
        <!-- Registration -->
        <el-row type="flex" justify="space-around" :gutter="10">
          <el-col :xs="1" :sm="6" :md="8" :lg="7" :xl="8"></el-col>
          <el-col :xs="22" :sm="12" :md="8" :lg="10" :xl="8">
            <div>
            <Register msg="Otherwise, go ahead and register here:" :login-user="loginNewUser"/>
            </div>
          </el-col>
          <el-col :xs="1" :sm="6" :md="8" :lg="7" :xl="8"></el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";

export default {
  name: "home",
  components: {
    Login,
    Register
  }
};
</script>
