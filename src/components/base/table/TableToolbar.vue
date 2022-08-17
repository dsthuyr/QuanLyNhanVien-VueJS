<template>
  <div class="m-table-toolbar">
    <div class="m-table-left">
      <ButtonDropdown @deleteSelectItems="deleteSelectItems"></ButtonDropdown>
    </div>
    <div class="m-table-right">
      <div class="m-table-InputField">
        <SearchField
          :inputSize="'240px'"
          :descriptionInputField="descriptionInputField"
          :typeInput="'searchField'"
          @getSearchText="getSearchText"
        ></SearchField>
      </div>
      <div
        class="m-table-refresh icon-refresh"
        @click="refreshTable"
        :title="btnRefreshText"
      ></div>
      <a
        href="https://localhost:7252/api/v1/Employees/export"
        class="m-excel-export icon-excel"
        :title="btnExportExcel"
      ></a>
    </div>
  </div>
</template>

<script>
import { pageResource } from "../../../../resourse.js";
import SearchField from "../input/SearchField.vue";
import ButtonDropdown from "../button/ButtonDropdown.vue";

export default {
  name: "TableToolbar",
  props: {
    descriptionInputField: {
      Type: String,
      default: "",
    },
  },
  data() {
    return {
      // Resource variable
      btnRefreshText: pageResource.VI.textButton.btnRefreshText,
      btnExportExcel: pageResource.VI.textButton.btnExportExcel,
    };
  },
  components: {
    // InputField,
    SearchField,
    ButtonDropdown,
  },
  methods: {
    /**
     * Làm mới dữ liệu bảng
     * CreatedBy: dsthuyr(20/06/2022)
     */
    refreshTable() {
      this.$emit("refreshTable", true);
    },
    /**
     * Lấy dữ liệu tìm kiếm
     * CreatedBy: dsthuyr(20/06/2022)
     */
    getSearchText(variable) {
      this.$emit("getSearchText", variable);
    },
    /**
     * Gửi event lên component cha để xóa các đối tượng đã chọn trong bảng
     * CreatedBy: dsthuyr(20/06/2022)
     */
    deleteSelectItems() {
      this.$emit("deleteSelectItems");
    },
  },
};
</script>

<style scoped>
.m-table-toolbar {
  display: flex;
  justify-content: space-between;
  padding: 16px 30px 16px 16px;
  align-items: center;
  box-sizing: border-box;
}
.m-table-refresh,
.m-excel-export {
  margin-left: 16px;
  cursor: pointer;
}
.m-table-left {
  display: flex;
  justify-content: flex-start;
  /* align-items: center;
  box-sizing: border-box; */
}
.m-table-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
}
</style>
