<template>
  <div class="m-input m-font-content">
    <div class="m-input-checkbox">
      <label class="m-font-title-2" for=""
        >{{ labelTextField }}
        <span v-if="isRequire" class="require">*</span></label
      >
      <div class="m-checkbox-field">
        <label class="m-radio-container"
          >Nam
          <input
            type="radio"
            id="male"
            name="gender"
            value="1"
            v-model="inputValue"
          />
          <span class="m-radio-checkmark"></span>
        </label>
        <label class="m-radio-container"
          >Nữ
          <input
            type="radio"
            id="female"
            name="gender"
            value="0"
            v-model="inputValue"
          />
          <span class="m-radio-checkmark"></span>
        </label>
        <label class="m-radio-container"
          >Khác
          <input
            type="radio"
            id="other"
            name="gender"
            value="2"
            v-model="inputValue"
          />
          <span class="m-radio-checkmark"></span>
        </label>
      </div>

      <!-- <form class="m-checkbox-field">
        <div class="m-radio-container">
        <input
          type="radio"
          id="male"
          name="gender"
          value="1"
          v-model="inputValue"
        />
        <label for="male">Nam</label><br />
        <input
          type="radio"
          id="female"
          name="gender"
          value="0"
          v-model="inputValue"
        />
        <label for="female">Nữ</label><br />
        <input
          type="radio"
          id="other"
          name="gender"
          value="2"
          v-model="inputValue"
        />
        <label for="other">Khác</label>
      </form> -->
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
    initValue: {
      Type: [String, Date, Number],
      default: "",
    },
    focusField: {
      Type: Boolean,
      default: false,
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
.m-input-checkbox {
  padding-bottom: 12px;
}
.m-input-checkbox label {
  padding-bottom: 4px;
}
.m-checkbox-field {
  padding-top: 6px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
}
.m-input-checkbox {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  margin-left: 10px;
}
.m-checkbox-field label {
  padding-right: 26px;
}
.require {
  color: red;
}
label {
  display: block;
  font-size: 13px;
}

/* CSS Radio ---------------------*/
.m-radio-container {
  display: block;
  position: relative;
  /* margin-right: 20px; */
  padding-left: 25px;
  /* margin-bottom: 12px; */
  cursor: pointer;
  /* font-size: 22px; */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.m-radio-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.m-radio-checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #babec5;
}

/* On mouse-over, add a grey background color */
.m-radio-container:hover input ~ .m-radio-checkmark {
  background-color: #fff;
}

/* When the radio button is checked, add a border color */
.m-radio-container input:checked ~ .m-radio-checkmark {
  border: 1px solid #2ca01c;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.m-radio-checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.m-radio-container input:checked ~ .m-radio-checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.m-radio-container .m-radio-checkmark:after {
  width: 10px;
  height: 10px;
  top: 4px;
  left: 4px;
  border-radius: 50%;
  background: #2ca01c;
}
</style>
