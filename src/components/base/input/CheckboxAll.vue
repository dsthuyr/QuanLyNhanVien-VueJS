<template>
    <label class="m-checkbox-container m-font-content">
        <input type="checkbox" :class="`m-idcheckbox-all`" >
        <span class="m-checkbox-checkmark" @click="isChecked"></span>
        {{ checkboxText }}
    </label>
</template>

<script>
export default {
  props: {
    checkboxText: {
      Type: String,
      default: "",
    },
  },
  methods: {
    /**
     * Kiểm tra tình trạng checkbox
     * CreatedBy: dsthuyr(03/07/2022)
     */
    isChecked(){
      // cb = false tức là trạng thái trước khi click là false
      // => hiện tại giá trị của nó là true
      let cb = !document.querySelector(`.m-idcheckbox-all`).checked;
      if(cb){
        this.$emit("addDeleteAllItem")
      }
      else{
        this.$emit("removeDeleteAllItem")
      }
    }
  },
};
</script>

<style scoped>
/* The m-checkbox-container */
.m-checkbox-container {
  display: block;
  position: relative;
  cursor: pointer;
  font-size: 14px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-weight: 400;
  box-sizing: border-box;
  padding-left: 25px;
}

/* Hide the browser's default checkbox */
.m-checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.m-checkbox-checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 16px;
  width: 16px;
  border: 1px #babec5 solid;
  margin-right: 10px;
}

/* On mouse-over, add a grey background color */
/* .m-checkbox-container:hover input ~ .m-checkbox-checkmark {
  background-color: #ccc;
} */

/* When the checkbox is checked, add a blue background */
/* .m-checkbox-container input:checked ~ .m-checkbox-checkmark {
  background-color: #2196F3;
} */

/* Create the m-checkbox-checkmark/indicator (hidden when not checked) */
.m-checkbox-checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the m-checkbox-checkmark when checked */
.m-checkbox-container input:checked ~ .m-checkbox-checkmark:after {
  display: block;
}

/* Style the m-checkbox-checkmark/indicator */
.m-checkbox-container .m-checkbox-checkmark:after {
  left: 4px;
  top: 0px;
  width: 5px;
  height: 10px;
  border: solid #35bf22;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
