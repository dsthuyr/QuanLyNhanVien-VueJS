<template>
  <div class="m-loading-table">
    <div class="icon-loading m-icon-table">
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.m-loading-table{
  height: 100%;
  width: 100%;
}

.m-icon-table {
  position: relative;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>