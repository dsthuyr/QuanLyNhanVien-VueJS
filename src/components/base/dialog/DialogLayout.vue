<template>
  <div class="m-dialog">
    <div class="m-dialog-container">
      <div class="m-dialog-header m-font-title-1" v-if="isHeaderDialog">
        <div class="m-dialog-title">
          {{ dialogTitle }}
          <slot name="dialogHeader"/>
        </div>
        <div class="m-dialog-close">
          <div class="icon-question"></div>
          <!-- <div class="icon-close" @click="handleDisplayDialog"></div> -->
          <div class="icon-close" @click="checkDialogIsEdit"></div>
        </div>
      </div>

      <div class="m-dialog-body">
        <div class="m-dialog-content">
          <slot />
        </div>
        <div class="m-dialog-footer">
          <div class="m-divide"></div>
          <div class="m-button-field">
            <div class="m-button-field-left">
              <slot name="footerLeft" />
            </div>
            <div class="m-button-field-right">
              <slot name="footerRight" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isHeaderDialog: {
      Type: Boolean,
      default: false,
    },
    dialogTitle: {
      Type: String,
      default: "",
    },
  },
  methods: {
    /**
     * Ẩn hiện dialog
     * CreatedBy: dsthuyr(26/06/2022)
     */
    handleDisplayDialog() {
      this.$emit("handleDisplayDialog", false);
    },
    /**
     * Gửi event lên component cha
     * CreatedBy: dsthuyr(26/06/2022)
     */
    checkDialogIsEdit() {
      this.$emit("checkDialogIsEdit");
    }
  }
};
</script>

<style scoped>
.m-dialog {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  /* display: none; */
}
.m-dialog-container {
  position: absolute;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;

}

.m-dialog-header {
  width: 100%;
  height: 73px;
  padding-left: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.m-dialog-close {
  display: flex;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  text-align: center;
  width: 73px;
  height: 73px;
  padding: 12px;
  box-sizing: border-box;
}
.icon-question {
  padding-right: 8px;
}

.m-dialog-body {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 32px 0;
  overflow: auto;
  box-sizing: border-box;
}

.m-dialog-footer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  margin-bottom: 17px;
  box-sizing: border-box;
}
.m-divide {
  width: 100%;
  border-top: 1px solid #e0e0e0;
  margin: 32px 0 20px;
  position: relative;
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
.icon-question,.icon-close{
  cursor: pointer;
}
.m-dialog-title {
  display: flex;
}
</style>
