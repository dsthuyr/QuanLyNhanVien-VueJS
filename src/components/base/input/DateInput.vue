<template>
  <div class="m-input m-font-content">
    <div class="m-input-date">
      <label class="m-font-title-2" for=""
        >{{ labelTextField }}
        <span v-if="isRequire" class="require">*</span>
      </label>
      <!-- <input
        class="m-date-field"
        type="date"
        v-model="inputValue"
        :style="cssVars"
        :class="errFieldData.isValid ? '' : 'm-not-valid-field'"
        :title="errFieldData.isValid ? '' : errFieldData.description"
        @click="hideStyleErr"
        input-class="m-date-field"
      /> -->

      <date-picker
        v-model:value="inputValue"
        format="DD/MM/YYYY"
        input-class="m-date-field"
        :style="cssVars"
        :class="errFieldData.isValid ? '' : 'm-not-valid-field'"
        :title="errFieldData.isValid ? '' : errFieldData.description"
        @click="hideStyleErr"
      ></date-picker>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";

export default {
  components: {
    DatePicker,
  },
  props: {
    isRequire: {
      Type: Boolean,
      default: false,
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
    this.inputValue = new Date(this.initValue);
  },
  watch: {
    /**
     * Đồng bộ giá trị khởi tạo với giá trị của input
     * CreatedBy: dsthuyr (26/06/2022)
     */
    initValue(newValue) {
      this.inputValue = new Date(newValue);
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

<style>
.m-input {
  position: relative;
  margin-right: 6px;
  box-sizing: border-box;
}
.m-input-date {
  position: relative;
  padding-bottom: 12px;
}
.m-input-date label {
  padding-bottom: 4px;
}
.m-date-field {
  height: 30px;
  width: var(--width);
  border-radius: 2px;
  border: 1px #babec5 solid;
  padding: 8px;
  background: url() no-repeat;
  box-sizing: border-box;
}

.mx-input-wrapper,
.mx-datepicker {
  width: 167px;
  height: 32px;
}

.m-date-field:focus {
  border: 1px #2ca01c solid;
  outline: unset;

}
.require {
  color: red;
}
label {
  display: block;
  font-size: 13px !important;
}
.m-not-valid-field {
  border-radius: 2px;
  border: 1px solid #ff4747;
  box-sizing: border-box;
}
.m-calendar-class {
  padding: 16px;
}
</style>
