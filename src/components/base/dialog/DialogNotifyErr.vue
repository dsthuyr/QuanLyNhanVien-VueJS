<template>
  <div class="m-dialog-err">
    <div class="m-dialog-err-container">
      <div class="m-dialog-err-body">
        <div class="icon-alert m-dialog-err-icon"></div>
        <div
          class="m-dialog-err-content"
          v-for="(errText, index) in errInformations"
          :key="index"
        >
          <div class="m-dialog-err-text">
            {{ errText }}
          </div>
        </div>
      </div>
      <div class="m-dialog-err-line"></div>
      <div class="m-dialog-err-footer">
        <ButtonDefault
          :actionButton="'btnClose'"
          @handleDisplayNotify="handleDisplayNotify"
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
    errInformations: {
      Type: Array,
      default: [],
    },
  },
  methods: {
    /**
     * Hiển thị dialog thông báo lỗi
     * CreatedBy: dsthuyr(26/06/2022)
     */
    handleDisplayNotify(variable) {
      this.$emit("handleDisplayNotify", variable);
    },
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
  justify-content: center;
}
</style>
