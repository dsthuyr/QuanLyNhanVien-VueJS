<template>
  <div class="m-dialog-err">
    <div class="m-dialog-err-container">
      <div class="m-dialog-err-body">
        <div class="icon-alert m-dialog-err-icon"></div>
        <div
          class="m-dialog-err-content"
        >
          <div class="m-dialog-err-text">
            {{ noitifyText }}
          </div>
        </div>
      </div>
      <div class="m-dialog-err-line"></div>
      <div class="m-dialog-err-footer">
        <ButtonDefault
          :actionButton="'btnConfirmNo'"
          @click="handleCancelDelete"
        ></ButtonDefault>
        <ButtonDefault
          :actionButton="'btnConfirmYes'"
          @click="handleConfirmDelete"
        ></ButtonDefault>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonDefault from "../button/ButtonDefault.vue";
export default {
  components: {
    ButtonDefault,
  },
  data() {
    return {};
  },
  props: {
    noitifyText: {
      Type: String,
      default: "",
    },
  },
  methods: {
    /**
     * Xác nhận xóa bản ghi 
     * CreatedBy: dsthuyr(26/06/2022)
     */
    handleConfirmDelete() {
        this.$emit("handleConfirmDelete")
    },
    /**
     * Hủy không xóa bản ghi
     * CreatedBy: dsthuyr(26/06/2022)
     */
    handleCancelDelete() {
        this.$emit("handleCancelDelete")
    }
  },
};
</script>

<style scoped>
.m-dialog-err {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}
.m-dialog-err-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 444px;
  min-width: 444px;
  padding: 32px;
  box-sizing: border-box;
  background-color: #fff;
}

.m-dialog-err-icon {
    position: absolute;
}
.m-dialog-err-content {
    padding-left: 55px;
}
.m-dialog-err-line {
  height: 1px;
  background: #b8bcc3;
  margin-top: 30px;
  margin-bottom: 20px;
}
.m-dialog-err-text {
    margin-top: 5px;
}

.m-dialog-err-footer {
  display: flex;
  justify-content: space-between;
}
</style>
