<template>
  <!-- CreatedBy: dsthuyr(20/06/2022) -->
  <!-- Main Page - Trang chính -->
  <TheContent>
    <!-- Page Header - Tiêu đề trang -->
    <template v-slot:headerPage>
      <PageHeader
        :dataHeaderContent="dataHeaderContent"
        @handleDisplayDialog="handleDisplayDialog"
      ></PageHeader>
    </template>

    <!-- Table Toolbar - Thanh công cụ -->
    <TableToolbar
      :descriptionInputField="descriptionInputField"
      @refreshTable="refreshTable"
      @getSearchText="getSearchText"
      @deleteSelectItems="deleteSelectItems"
      @listDeleteItems="listDeleteItems"
    ></TableToolbar>

    <!-- Table Content - Nội dung trang -->
    <div v-if="isLoading">
      <LoadingDefault></LoadingDefault>
    </div>
    <div v-else>
      <TableContent
        :tableHeaderDatas="tableHeaderDatas"
        :tableBodyDatas="tableBodyDatas"
        :pageInfo="pageInfo"
        @handleDisplayDialogForEdit="handleDisplayDialogForEdit"
        @displayDropdownMenu="displayDropdownMenu"
        @updateTableData="updateTableData"
        @listDeleteItems="listDeleteItems"
      >
        <LoadingTable v-if="isLoadingTableData"></LoadingTable>
        <TableEmptyData v-if="isTableEmptyData"></TableEmptyData>
      </TableContent>
    </div>

    <!-- Dropdown table - Ô sổ xuống chức năng của bảng  -->
    <div v-if="isShowDropdownTable">
      <!-- <div v-click-outside="hideDropdownTable"> -->
      <DropdownTable
        :dropdownData="dropdownData"
        @deleteComplete="deleteComplete"
        @createReplication="createReplication"
      ></DropdownTable>
      <!-- </div> -->
    </div>
  </TheContent>

  <!-- Dialog Detail Employee - Form chi tiết nhân viên -->
  <div v-if="isShowEmployeeDialog">
    <DialogEmployeeDetail
      @handleDisplayDialog="handleDisplayDialog"
      @refreshTable="refreshTable"
      :employeeInput="employeeInput"
      :isNewDialog="isNewDialog"
      :isReplicationDialog="isReplicationDialog"
    ></DialogEmployeeDetail>
  </div>
</template>
<script>
import axios from "axios";
import TheContent from "../components/layout/TheContent.vue";
import TableContent from "../components/base/table/TableContent.vue";
import TableToolbar from "../components/base/table/TableToolbar.vue";
import LoadingDefault from "../components/base/loading/LoadingDefault.vue";
import DialogEmployeeDetail from "../components/base/dialog/DialogEmployeeDetail.vue";
import PageHeader from "../components/base/header/PageHeader.vue";
import DropdownTable from "../components/base/dropdown/DropdownTable.vue";
import LoadingTable from "../components/base/loading/LoadingTable.vue";
import TableEmptyData from "../components/base/table/TableEmptyData.vue";
import { pageResource } from "../../resourse.js";

export default {
  components: {
    TheContent,
    TableContent,
    TableToolbar,
    LoadingDefault,
    LoadingTable,
    DialogEmployeeDetail,
    PageHeader,
    DropdownTable,
    TableEmptyData,
  },
  data() {
    return {
      pageInfo: {
        // Số trang
        pageIndex: 1,
        // Số bản ghi trên mỗi trang
        pageSize: 10,
        // Chuỗi tìm kiếm nhân viên
        employeeFilter: "",
        // Tổng số bản ghi
        totalRecord: 0,
        // Tổng số trang
        totalPage: 0,
      },
      // Nội dung phần tiêu đề trang
      dataHeaderContent: {
        titlePage: pageResource.VI.header.titleEmployeePage,
        actionButton: "btnDetailEmployee",
      },
      // Danh sách nhân viên lấy qua API
      employees: [],
      // Đối tượng nhân viên đang được chỉnh sửa
      employeeInput: {},
      // Dữ liệu bindding cho ô sổ xuống chức năng của bảng (id, pageX, pageY)
      dropdownData: {},
      // Text mô tả ô filter dữ liệu
      descriptionInputField:
        pageResource.VI.placehoderText.descriptionInputField,
      // Dữ liệu header của bảng
      tableHeaderDatas: [
        {
          text: pageResource.VI.tableHeader.employeeCode,
          size: 1,
          alignText: "left",
        },
        {
          text: pageResource.VI.tableHeader.employeeName,
          size: 2,
          alignText: "left",
        },
        {
          text: pageResource.VI.tableHeader.gender,
          size: 1,
          alignText: "left",
        },
        {
          text: pageResource.VI.tableHeader.dob,
          size: 1,
          alignText: "left",
        },
        {
          text: pageResource.VI.tableHeader.identityNumber,
          size: 1,
          alignText: "left",
        },
        {
          text: pageResource.VI.tableHeader.position,
          size: 1,
          alignText: "left",
        },
        {
          text: pageResource.VI.tableHeader.departmentName,
          size: 2,
          alignText: "left",
        },
        {
          text: pageResource.VI.tableHeader.bankAccountNumber,
          size: 1,
          alignText: "left",
        },
        {
          text: pageResource.VI.tableHeader.bankName,
          size: 2,
          alignText: "left",
        },
        {
          text: pageResource.VI.tableHeader.branchName,
          size: 2,
          alignText: "left",
        },
      ],
      // Dữ liệu body của bảng
      tableBodyDatas: [],
      // Hiển thị icon load trang ban đầu
      isLoading: true,
      // Hiển thị form chi tiết nhân viên
      isShowEmployeeDialog: false,
      // Form chi tiết nhân viên mới
      isNewDialog: true,
      // Hiển thị ô sổ xuống của bảng (chức năng xóa,...)
      isShowDropdownTable: false,
      // Hiển thị load dữ liệu bảng
      isLoadingTableData: true,
      // Hiển thị mô tả bảng trống
      isTableEmptyData: false,
      // Có phải dialog sử dụng trong chức năng nhân bản không
      isReplicationDialog: false,
      // Danh sách đối tượng xóa hàng loạt
      deleteItems: "",
    };
  },
  created() {
    this.getEmployeeDatas();
  },
  methods: {
    /**
     * Lấy danh sách nhân viên qua API
     * CreatedBy: dsthuyr(20/06/2022)
     */
    getEmployeeDatas() {
      this.employees = [];
      var me = this;
      me.isLoadingTableData = true;
      axios
        .get(
          `https://localhost:7252/api/v1/Employees/filter?pageIndex=${me.pageInfo.pageIndex}&pageSize=${me.pageInfo.pageSize}&employeeFilter=${me.pageInfo.employeeFilter}`
        )
        .then((response) => {
          me.pageInfo.totalRecord = response.data.TotalRecord;
          me.pageInfo.totalPage = response.data.TotalPage;
          me.employees = response.data.DataReceived;
          // Ẩn loading table và loading page
          me.isLoadingTableData = false;
          me.isLoading = false;
          // Nếu danh sách nhân viên trống thì hiển thị là bảng trống
          if (me.employees.length == 0) {
            me.isTableEmptyData = true;
          } else {
            me.isTableEmptyData = false;
          }
          // Cập nhật dữ liệu bảng
          me.getTableBodyDatas();
        })
        .catch((response) => {
          console.log(response);
        });
    },
    /**
     * Lấy nhân viên theo Id
     * CreatedBy: dsthuyr(20/06/2022)
     */
    async getEmployeeById(employeeId) {
      var me = this;
      await axios
        .get(`https://localhost:7252/api/v1/Employees/${employeeId}`)
        .then((response) => {
          me.employeeInput = response.data;
        })
        .catch((response) => {
          console.log(response);
        });
    },
    /**
     * Gán dữ liệu cho biến chứa dữ liệu bảng
     * CreatedBy: dsthuyr(20/06/2022)
     */
    getTableBodyDatas() {
      this.tableBodyDatas = [];
      var employees = this.employees;
      if (employees !== undefined) {
        for (let i = 0; i < employees.length; i++) {
          this.tableBodyDatas.push([]);
          this.tableBodyDatas[i].push(employees[i].EmployeeId);
          this.tableBodyDatas[i].push(employees[i].EmployeeCode);
          this.tableBodyDatas[i].push(employees[i].EmployeeName);
          this.tableBodyDatas[i].push(this.formatGender(employees[i].Gender));
          this.tableBodyDatas[i].push(
            this.formatDate(employees[i].DateOfBirth)
          );
          this.tableBodyDatas[i].push(employees[i].IdentityNumber);
          this.tableBodyDatas[i].push(employees[i].EmployeePosition);
          this.tableBodyDatas[i].push(employees[i].DepartmentName);
          this.tableBodyDatas[i].push(employees[i].BankAccountNumber);
          this.tableBodyDatas[i].push(employees[i].BankName);
          this.tableBodyDatas[i].push(employees[i].BankBranchName);
        }
      }
    },
    /**
     * Xử lí ẩn hiện form chi tiết nhân viên mới
     * CreatedBy: dsthuyr(20/06/2022)
     */
    handleDisplayDialog(variable) {
      this.isNewDialog = true;
      this.isReplicationDialog = false;
      this.isShowEmployeeDialog = variable;
    },
    /**
     * Xử lí ẩn hiện form nhân viên khi chỉnh sửa bản ghi
     * CreatedBy: dsthuyr(20/06/2022)
     */
    handleDisplayDialogForEdit(variable) {
      this.isNewDialog = false;
      this.isReplicationDialog = false;
      this.isShowEmployeeDialog = true;
      this.employeeInput = variable;
    },
    /**
     * Hiển thị dropdown và gán dữ liệu
     * CreatedBy: dsthuyr(20/06/2022)
     */
    displayDropdownMenu(variable) {
      this.isShowDropdownTable = this.isShowDropdownTable ? false : true;
      this.dropdownData = variable;
    },
    /**
     * Refresh dữ liệu bảng
     * CreatedBy: dsthuyr(20/06/2022)
     */
    refreshTable(variable) {
      if (variable == true) {
        this.getEmployeeDatas();
      }
    },
    /**
     * Ẩn dropdown, hiện thông báo xóa thành công và refresh bảng
     * CreatedBy: dsthuyr(20/06/2022)
     */
    deleteComplete() {
      this.isShowDropdownTable = false;
      this.refreshTable(true);
    },
    /**
     * Lấy nhân viên được sử dụng để nhân bản theo Id, truyền vào và hiển thị dialog, ẩn dropdownTable
     * CreatedBy: dsthuyr(26/06/2022)
     */
    async createReplication(variable) {
      await this.getEmployeeById(variable);
      this.isReplicationDialog = true;
      this.isShowEmployeeDialog = true;
      this.isShowDropdownTable = false;
    },
    /**
     * Cập nhật dữ liệu bảng theo số trang và số bản ghi trên trang
     * CreatedBy: dsthuyr(20/06/2022)
     */
    updateTableData(variable) {
      this.pageInfo.pageIndex = variable.pageIndex;
      this.pageInfo.pageSize = variable.pageSize;
      this.getEmployeeDatas();
    },
    /**
     * Xử lí khi người dùng tìm kiếm
     * CreatedBy: dsthuyr(20/06/2022)
     */
    getSearchText(variable) {
      this.pageInfo.employeeFilter = variable;
      this.getEmployeeDatas();
    },
    /**
     * Xử lí dữ liệu ngày tháng
     * CreatedBy: dsthuyr(20/06/2022)
     */
    formatDate(dateInput) {
      dateInput = new Date(dateInput);
      let day = dateInput.getDate();
      day = day < 10 ? `0${day}` : day;
      let month = dateInput.getMonth() + 1;
      month = month < 10 ? `0${month}` : month;
      let year = dateInput.getFullYear();
      return `${day}/${month}/${year}`; // VD: 13-05-2022
    },
    /**
     * Xử lí dữ liệu giới tính
     * CreatedBy: dsthuyr(20/06/2022)
     */
    formatGender(gender) {
      if (gender == "0") {
        return pageResource.VI.gender.female;
      } else if (gender == "1") {
        return pageResource.VI.gender.male;
      }
      return pageResource.VI.gender.other;
    },

    /**
     * Ẩn dropdown khi click outside (Còn lỗi)
     * CreatedBy: dsthuyr(26/06/2022)
     */
    hideDropdownTable() {
      this.isShowDropdownTable = false;
    },
    /**
     * Xóa các đối tượng đã chọn trong bảng
     * CreatedBy: dsthuyr(26/06/2022)
     */
    deleteSelectItems() {
      var me = this;
      let urlForDelete = `https://localhost:7252/api/v1/Employees/${me.deleteItems}`;
      console.log(urlForDelete);
      // axios
      //   .delete(urlForDelete)
      //   .then(function (response) {
      //     console.log(response)
      //     this.refreshTable()
      //   })
      //   .catch(function (response) {
      //     console.log(response);
      //   });
    },
    /**
     * Hàm lấy danh sách đối tượng xóa hàng loạt
     * CreatedBy: dsthuyr(26/06/2022)
     */
    listDeleteItems(items) {
      let tempString = "";
      items.forEach((item) => {
        tempString += item + ";";
      });
      tempString = tempString.substring(0, tempString.length - 1);
      this.deleteItems = tempString;
    },
  },
};
</script>

<style scoped></style>
