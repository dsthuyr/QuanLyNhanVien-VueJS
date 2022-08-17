<template>
  <div class="m-input m-font-content">
    <div class="m-input-selectBox">
      <label class="m-font-title-2" for=""
        >{{ labelTextField }}
        <span v-if="isRequire" class="require">*</span></label
      >
      <select
        v-model="inputValue"
        :style="cssVars"
        class="m-selectBox-field"
        :class="errFieldData.isValid ? '' : 'm-not-valid-field'"
        :title="errFieldData.isValid ? '' : errFieldData.description"
        @click="hideStyleErr"
      >
        <option
          v-for="(selectBoxData, index) in selectBoxDatas"
          :key="index"
          :value="`${selectBoxData.valueOption}`"
        >
          {{ selectBoxData.text }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>

export default {

  props: {
    isRequire: {
      Type: Boolean,
      default: false,
    },
    labelTextField: {
      Type: String,
      default: "",
    },
    selectBoxDatas: {
      Type: Array,
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
      isNotValidCopy: this.isNotValid,
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
.m-selectBox-field {
  height: 32px;
  width: var(--width);
  border-radius: 2px;
  border: 1px #babec5 solid;
  padding: 8px;
  background: url() no-repeat;
  box-sizing: border-box;
}
.m-selectBox-field:focus {
  border: 1px #2ca01c solid;
  outline: unset;
}
.m-input-selectBox {
  padding-bottom: 12px;
}
.m-input-selectBox label {
  padding-bottom: 4px;
}
.require {
  color: red;
}
label {
  display: block;
  font-size: 13px;
}

.m-input-checkbox {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  margin-left: 10px;
}

.m-selectBox-field {
  height: 32px;
  width: var(--width);
  border-radius: 2px;
  border: 1px #babec5 solid;
  padding: 0 8px;
  background: url() no-repeat;
  box-sizing: border-box;
}
.m-not-valid-field {
  border-color: #ff4747;
}
</style>
