<template>
  <div class="m-loading">
    <div class="icon-loading m-icon-page">
    </div>
  </div>
</template>

<script>
export default {
    name: "LoadingDefault",
}
</script>

<style>
.m-loading {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.m-icon-page {
  position: absolute;
  top: 50%;
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
