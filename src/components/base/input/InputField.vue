<template>
  <div class="m-input m-font-content">
    <!-- Text Input -->
    <div class="m-input-text">
      <label class="m-font-title-2" for=""
        >{{ labelTextField }}
        <span v-if="isRequire" class="require">*</span></label
      >
      <input
        class="m-text-field"
        type="text"
        v-model="inputValue"
        :placeholder="descriptionInputField"
        :style="cssVars"
        :class="errFieldData.isValid ? '' : 'm-not-valid-field'"
        :title="errFieldData.isValid ? '' : errFieldData.description"
        @click="hideStyleErr"
      />
    </div>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  name: "SearchField",
  props: {
    isRequire: {
      Type: Boolean,
      default: false,
    },
    descriptionInputField: {
      Type: String,
      default: "",
    },
    labelTextField: {
      Type: String,
      default: "",
    },
    inputSize: {
      Type: String,
      default: "100%",
    },
    initValue: {
      Type: [String, Date, Number],
      default: "",
    },
    focusField: {
      Type: Boolean,
      default: false,
    },
    errFieldData: {
      Type: Object,
      default: {
        isValid: true,
        description: "",
      },
    },
  },
  data() {
    return {
      inputValue: "",
      cssVars: {
        "--width": this.inputSize,
      },
    };
  },
  methods: {
    /**
     * Gửi event, cập nhật field là hợp lệ
     * CreatedBy: dsthuyr(29/6/2022)
     */
    hideStyleErr() {
      this.$emit("changeFieldToValid");
    },
  },
  mounted() {
    if (this.focusField) {
      document.querySelector(".m-text-field").focus();
    }
  },
  /**
   * Khởi tạo giá trị nếu có giá trị đầu vào
   * CreatedBy: dsthuyr (26/06/2022)
   */
  created() {
    this.inputValue = this.initValue;
  },
  watch: {
    /**
     * Đồng bộ giá trị khởi tạo với giá trị của input
     * CreatedBy: dsthuyr (26/06/2022)
     */
    initValue(newValue) {
      this.inputValue = newValue;
    },
    /**
     * Gửi giá trị input lên cho component cha qua event
     * CreatedBy: dsthuyr (26/06/2022)
     */
    inputValue(newValue) {
      this.$emit("getValue", newValue);
    },
  },
};
</script>
<style scoped>
.m-input {
  position: relative;
  margin-right: 6px;
  box-sizing: border-box;
}
.m-text-field {
  height: 32px;
  width: var(--width);
  border-radius: 2px;
  border: 1px #babec5 solid;
  padding: 8px;
  background: url() no-repeat;
  box-sizing: border-box;
}
.m-text-field:focus {
  border: 1px #2ca01c solid;
  outline: unset;
}
.m-input-text {
  padding-bottom: 12px;
}
.m-input-text label {
  padding-bottom: 4px;
}
.require {
  color: red;
}
label {
  display: block;
  font-size: 13px;
}
.m-not-valid-field {
  border-color: #ff4747;
}
</style>
