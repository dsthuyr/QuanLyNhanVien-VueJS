<template>
  <div class="m-table-empty">
    <div class="m-empty-notify">
      <img
        src="../../../assets/img/bg_report_nodata.76e50bd8.svg"
        alt="empty-table"
        class="m-empty-image"
      />
      <div class="m-empty-text">Không có dữ liệu</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.m-table-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100% - 150px);
  width: 100%;
}
.m-empty-text {
  margin-top: 24px;
  text-align: center;
}
.m-empty-image {
  width: 264px;
  height: 150px;
}
</style>
