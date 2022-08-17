<template>
  <!-- <div class="m-contain-content"> -->
  <TheContent>
    <template v-slot:headerPage>
      <PageHeader
        :dataHeaderContent="dataHeaderContent"
      ></PageHeader>
    </template>
  </TheContent>
</template>
<script>
import TheContent from "../components/layout/TheContent.vue";
import PageHeader from '../components/base/header/PageHeader.vue'

export default {
  components: {
    TheContent,
    PageHeader
  }, 
  data() {
    return {
      dataHeaderContent: {
        titlePage: "Trang trống",
      },
      employees: [],
      isShowEmployeeDialog: "false",
    };
  }
};
</script>
<style scoped>
.m-contain-content {
  width: calc(100% - 178px);
  background-color: #eceef1;
  padding: 24px;
  padding-bottom: 0;
  height: calc(100vh - 48px);
  box-sizing: border-box;
  position: absolute;
  left: 178px;
  top: 48px;
}
</style>
