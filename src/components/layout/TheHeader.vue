<template>
  <!-- Layout Header Page  -->
  <div class="m-header">
    <div class="icon-toggle"></div>
    <div class="m-header-left">
      <div class="m-header-branch">
        <div class="m-header-text m-font-title-2">{{brandName}}</div>
      </div>
    </div>
    <div class="m-header-right">
      <div class="icon-bell"></div>
      <div class="m-header-user">
        <div class="icon-default-avatar"></div>
        <div class="m-header-username m-font-title-2">{{customerName}}</div>
      </div>
      <div class="icon-down"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
  props: {
    brandName: {
      Type: String,
      default: ""
    },
    customerName: {
      Type: String,
      default: ""
    }
  },
};
</script> 

<style scoped>

.m-header {
  height: 48px;
  width: calc(100% - 178px);
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 24px;
  box-sizing: border-box;
  position: absolute;
  left: 178px;
  top: 0;
}
.m-header .m-header-user {
  display: flex;
  align-items: center;
  align-content: center;
  margin-right: 24px;
  margin-left: 24px;
}
.m-header .m-header-right {
  display: flex;
  height: 48px;
  /* line-height: 48px; */
  margin-left: auto;
  align-items: center;
}
.m-header .icon-default-avatar {
  border-radius: 50%;
  margin-left: 10px;
}
</style>
