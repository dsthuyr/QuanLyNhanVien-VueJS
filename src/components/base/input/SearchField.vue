<template>
  <div class="m-input">
    <div class="m-input-search">
      <input
        class="m-search-field"
        type="text"
        v-model="inputValue"
        :placeholder="descriptionInputField"
        @keyup="getSearchText"
        :style="cssVars"
      />
      <div class="icon-search"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: "",
      searchData: [],
      cssVars: {
        "--width": this.inputSize,
      },
    };
  },
  props: {
    descriptionInputField: {
      Type: String,
      default: "",
    },
    inputSize: {
      Type: String,
      default: "100px",
    },
  },
  methods: {
     /**
     * Lấy giá trị của input gửi lên component cha qua event
     * CreatedBy: dsthuyr (26/06/2022)
     */
    getSearchText() {
      var me = this;
      clearTimeout(me.timeout);
      me.timeout = setTimeout(function () {
        me.$emit("getSearchText", me.inputValue);
      }, 500);
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

.m-search-field {
  height: 32px;
  border-radius: 2px;
  border: 1px #babec5 solid;
  padding: 8px;
  padding-right: 40px;
  background: url() no-repeat;
  box-sizing: border-box;
  width: var(--width);
}
.m-search-field::placeholder {
  font-family: Notosans-italic;
  font-size: 13px;
}
.icon-search {
  position: absolute;
  top: 8px;
  right: 0;
}
.m-search-field:focus {
  border: 1px #2ca01c solid;
  outline: unset;
}
</style>
