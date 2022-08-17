<template>
  <TheNavbar></TheNavbar>
  <TheHeader :brandName="brandName" :customerName="customerName"></TheHeader>

  <router-view></router-view>
</template>

<script>
import TheNavbar from "./components/layout/TheNavbar.vue";
import TheHeader from "./components/layout/TheHeader.vue";
import { pageResource } from "../resourse.js";

export default {
  name: "App",
  components: {
    TheNavbar,
    TheHeader,
    // TheContent
  },
  data() {
    return {
      brandName: pageResource.VI.others.brandName,
      customerName: pageResource.VI.others.customerName,
    };
  },
};
</script>

<style>
@import url("./css/fonts.css");
@import url("./css/icon.css");
</style>
