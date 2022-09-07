<template>
  <div>
    <!-- <h1 v-upper='msg'></h1> -->
    <Header></Header>
    <!-- 路由出口的地方 -->
    <router-view></router-view>
    <!-- 在Home Search时显示，在登陆注册时隐藏 -->
    <Footer v-show='$route.meta.show'></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: { Header, Footer },
  mounted() {
     // 通知vuex发请求，获取数据，存储在仓库之中、三级列表的数据
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
</style>
