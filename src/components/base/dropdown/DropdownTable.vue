<template>
  <!-- Dropdown Menu  -->
  <div class="m-dropdown-menu" :style="cssVars">
    <div class="m-context-item" @click="createReplication">Nhân bản</div>
    <div class="m-context-item" @click="deleteById">Xóa</div>
    <div class="m-context-item">Ngừng sử dụng</div>
  </div>
  <DialogNotifyDelete
    v-if="isDisplayDialog"
    @handleCancelDelete="handleCancelDelete"
    @handleConfirmDelete="handleConfirmDelete"
    :noitifyText="'Bạn có thực sự muốn xóa không?'"
  ></DialogNotifyDelete>
</template>

<script>
import axios from "axios";
import DialogNotifyDelete from "../dialog/DialogNotifyDelete.vue";

export default {
  emits: ['deleteComplete', 'createReplication'],
  components: {
    DialogNotifyDelete,
  },
  props: {
    dropdownData: {
      Type: Object,
      default: null,
    },
  },
  data() {
    return {
      cssVars: {
        "--pageX": this.dropdownData.pageX - 280 + "px",
        "--pageY": this.dropdownData.pageY - 38 + "px",
      },
      isDisplayDialog: false,
    };
  },
  methods: {
    /**
     * Hiển thị bảng xác nhận xóa hay không
     * CreatedBy: dsthuyr(26/06/2022)
     */
    deleteById() {
      this.isDisplayDialog = true;
    },
    /**
     * Xóa bản ghi được chọn
     * CreatedBy: dsthuyr(26/06/2022)
     */
    handleConfirmDelete() {
      let me = this;
      let urlForDelete = `https://localhost:7252/api/v1/Employees/${me.dropdownData.idEntity}`;
      axios
        .delete(urlForDelete)
        .then(function (response) {
          console.log(response)
          me.isDisplayDialog = false
          me.$emit("deleteComplete")
        })
        .catch(function (response) {
          console.log(response);
        });
    },
    /**
     * Gửi lên component cha event, với variable là id của bản ghi muốn nhân bản
     * CreatedBy: dsthuyr(26/06/2022)
     */
    createReplication() {
      this.$emit("createReplication", this.dropdownData.idEntity)
    },
    /**
     * Hủy không xóa bản ghi, đóng form
     * CreatedBy: dsthuyr(26/06/2022)
     */
    handleCancelDelete() {
      this.isDisplayDialog = false;
    },
  },
};
</script>

<style>
.m-dropdown-menu {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: var(--pageY);
  left: var(--pageX);
  border: 1px solid #babec5;
  width: 120px;
  height: 89px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 20;
}
.m-context-item {
  flex: 1;
  cursor: pointer;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #fff;
}
.m-context-item:hover {
  transition: all 0.2s ease;
  background-color: #f1f1f1;
  color: #08bf1e;
}
</style>
