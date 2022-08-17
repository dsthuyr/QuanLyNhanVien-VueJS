<template>
  <div class="m-dialog-close">
    <div class="m-dialog-close-container">
      <div class="m-dialog-close-body">
        <div class="icon-question-notify m-dialog-close-icon"></div>
        <div class="m-dialog-close-content">
          <div class="m-dialog-close-text">
            {{ noitifyText }}
          </div>
        </div>
      </div>
      <div class="m-dialog-close-line"></div>
      <div class="m-dialog-close-footer">
        <div class="m-button-field">
          <div class="m-button-field-left">
            <ButtonDefault
              :actionButton="'btnCancel'"
              @click="handleConfirmCancel"
            ></ButtonDefault>
          </div>
          <div class="m-button-field-right">
            <ButtonDefault
              :actionButton="'btnConfirmNo'"
              @click="handleConfirmClose"
            ></ButtonDefault>
            <div class="m-spacing-1"></div>
            <ButtonDefault
              :actionButton="'btnConfirmYes'"
              @click="handleConfirmStorage"
            ></ButtonDefault>
          </div>
        </div>
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
     * Xác nhận đóng dialog và không lưu
     * CreatedBy: dsthuyr(26/06/2022)
     */
    handleConfirmClose() {
      this.$emit("handleConfirmClose")
    },
    /**
     * Xác nhận đóng dialog và và lưu
     * CreatedBy: dsthuyr(26/06/2022)
     */
    handleConfirmStorage() {
      this.$emit("handleConfirmStorage")
    },
    /**
     * Đóng dialog thông báo và tiếp tục chỉnh sửa
     * CreatedBy: dsthuyr(26/06/2022)
     */
    handleConfirmCancel() {
        this.$emit("handleConfirmCancel")
    },
  },
};
</script>

<style scoped>
.m-dialog-close {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}
.m-dialog-close-container {
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

.m-dialog-close-icon {
  position: absolute;
}
.m-dialog-close-content {
  padding-left: 55px;
}
.m-dialog-close-line {
  height: 1px;
  background: #b8bcc3;
  margin-top: 30px;
  margin-bottom: 20px;
}
.m-dialog-close-text {
  margin-top: 5px;
}

.m-dialog-close-footer {

}

.m-button-field {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.m-button-field-left {
  display: flex;
  justify-content: flex-start;
}
.m-button-field-right {
  display: flex;
  justify-content: flex-end;
}
.m-spacing-1 {
    width: 10px;
}
</style>
