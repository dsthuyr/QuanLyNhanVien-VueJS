<template>
  <!-- Navbar  -->
  <div class="m-navbar m-font-content">
    <router-link class="m-link" to="/">
      <div class="m-navbar-header">
        <div class="icon-home"></div>
        <img
          class="m-logo"
          src="../../assets/img/Logo_Module_TiengViet_White.66947422.svg"
          alt="Logo"
        />
      </div>
    </router-link>
    <div class="m-navbar-body">
      <div v-for="(item, index) in items" :key="index">
        <router-link :to="`/${item.slug}`">
          <div
            class="m-navbar-item"
            :class="item.isActive ? 'active' : ''"
            @click="show(index)"
          >
            <div :class="item.icon"></div>
            <div class="m-navbar-text">{{ item.text }}</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { pageResource } from "../../../resourse";
export default {
  name: "TheNavbar",
  data() {
    return {
      // Dữ liệu navbar
      items: [
        {
          icon: "icon-overview",
          text: pageResource.VI.navbarText.overview,
          // isActive : true,
          slug: "emptypage",
        },
        {
          icon: "icon-employee",
          text: pageResource.VI.navbarText.employee,
          slug: "employeepage",
        },
        {
          icon: "icon-cash",
          text: pageResource.VI.navbarText.tax,
          slug: "emptypage",
        },
        {
          icon: "icon-deposits",
          text: pageResource.VI.navbarText.deposits,
          slug: "emptypage",
        },
        {
          icon: "icon-buy",
          text: pageResource.VI.navbarText.buy,
          slug: "emptypage",
        },
        {
          icon: "icon-sell",
          text: pageResource.VI.navbarText.sell,
          slug: "emptypage",
        },
        {
          icon: "icon-bill",
          text: pageResource.VI.navbarText.bill,
          slug: "emptypage",
        },
        {
          icon: "icon-warehouse",
          text: pageResource.VI.navbarText.warehouse,
          slug: "emptypage",
        },
        {
          icon: "icon-tool",
          text: pageResource.VI.navbarText.tool,
          slug: "emptypage",
        },
        {
          icon: "icon-asset",
          text: pageResource.VI.navbarText.asset,
          slug: "emptypage",
        },
        {
          icon: "icon-tax",
          text: pageResource.VI.navbarText.tax,
          slug: "emptypage",
        },
        {
          icon: "icon-price",
          text: pageResource.VI.navbarText.price,
          slug: "emptypage",
        },
        {
          icon: "icon-general",
          text: pageResource.VI.navbarText.general,
          slug: "emptypage",
        },
        {
          icon: "icon-budget",
          text: pageResource.VI.navbarText.budget,
          slug: "emptypage",
        },
        {
          icon: "icon-report",
          text: pageResource.VI.navbarText.report,
          slug: "emptypage",
        },
        {
          icon: "icon-analysis",
          text: pageResource.VI.navbarText.analysis,
          slug: "emptypage",
        },
      ],
    };
  },
  methods: {
    /**
     * Hàm xử lí khi click vào navbar item
     * CreatedBy: dsthuyr(20/06/2022)
     */
    show(index) {
      this.items.forEach((item, idx) => {
        if (index == idx) {
          item.isActive = true;
        } else {
          item.isActive = false;
        }
      });
    },
  },
};
</script>
<style lang="scss"></style>
<style scoped>
.m-navbar {
  /* position: relative; */
  width: 178px;
  height: 100vh;
  overflow: auto;
  background-color: #393a3d;
}
.m-navbar-header {
  height: 48px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.m-navbar-body {
  padding-top: 14px;
}
.m-navbar-item {
  height: 42px;
  width: 100%;
  display: flex;
  align-items: center;
  color: #fff;
  padding-left: 16px;
  box-sizing: border-box;
  border-left: 6px solid transparent;
  cursor: pointer;
}
.m-navbar-item:hover {
  background-color: #58595d;
  transition: all 0.2s ease;
}
.active {
  background-color: #58595d;
  border-left-color: rgb(44, 160, 28);
  /* font-weight: 500; */
}
.m-logo {
  height: 32px;
}
a {
  text-decoration: none !important;
}
</style>
