<template>
  <!-- Layout Content Page  -->
  <div class="m-contain-content m-font-content">
    <slot name="headerPage" />
    <div class="m-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "TheContent",
};
</script>

<style scoped>

.m-content {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 100%;
  height: calc(100vh - 48px - 72px);
  box-sizing: border-box;
}

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

  overflow: auto;
  scroll-behavior: smooth;
  flex: 1;
  min-height: 0;

    /* display: flex;
    flex-direction: column;
    height: calc(100vh - 48px); */
}

.m-contain-content::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

.m-contain-content::-webkit-scrollbar-thumb {
    background: #b8bcc3;
}

</style>
