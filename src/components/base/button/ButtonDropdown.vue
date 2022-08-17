<template>
  <button class="m-font-content m-btn-secondary" @click="displayDropdown()">
    Thực hiện hàng loạt
    <div class="m-dropdown-feature" style="display:none" >
      <div class="m-dropdown-item" @click="deleteSelectItems">Xóa</div>
    </div>
  </button>
  <DialogNoitifyFeature v-if="isDisplayDialog" @handleDisplayNotifyFeature="handleDisplayNotifyFeature"></DialogNoitifyFeature>
</template>

<script>
import DialogNoitifyFeature from "../dialog/DialogNoitifyFeature.vue"

export default {
  emits: ['deleteSelectItems'],

  data() {
    return {
      isDisplayDialog: false
    }
  },
  components: {
    DialogNoitifyFeature
  },
  methods: {
    displayDropdown() {
        let btnDropdown = document.querySelector(".m-dropdown-feature")
        if(btnDropdown.style.display == "block" || btnDropdown.style.display == "=") {
            btnDropdown.style.display= "none";
        }
        else {
            btnDropdown.style.display= "block";
        }
    },
    deleteSelectItems() {
        this.isDisplayDialog = true
        this.$emit("deleteSelectItems")
    },
    handleDisplayNotifyFeature() {
      this.isDisplayDialog = false
    }
  },
};
</script>

<style>
.m-btn-secondary {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  background-color: #fff;
  border: 1px #bbb solid;
  font-weight: 600;
  border-radius: 3px;
  cursor: pointer;
  height: 36px;
  min-width: 55px;
  padding: 6px 16px;
  box-sizing: border-box;
}
.m-btn-secondary:hover {
  background-color: #d2d3d6;
  transition: all 0.2s ease;
}

.m-dropdown-feature {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 38px;
  left: 62px;
  border: 1px solid #babec5;
  min-width: 90px;
  height: 36px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  z-index: 20;
  box-sizing: border-box;
}
.m-dropdown-item {
  flex: 1;
  cursor: pointer;
  padding: 8px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #fff;
}
.m-dropdown-item:hover {
  transition: all 0.2s ease;
  background-color: #f1f1f1;
  color: #08bf1e;
}
</style>
