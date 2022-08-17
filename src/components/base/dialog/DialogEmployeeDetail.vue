<template>
  <!-- Dialog employee detail - Form chi tiết nhân viên -->
  <DialogLayout
    :isHeaderDialog="isHeaderDialog"
    :dialogTitle="dialogTitle"
    @checkDialogIsEdit="checkDialogIsEdit"
  >
    <!-- Dialog header  -->
    <template v-slot:dialogHeader>
      <CheckboxDefault
        class="m-checkbox-role"
        :checkboxText="'Là khách hàng'"
      ></CheckboxDefault>
      <CheckboxDefault
        class="m-checkbox-role"
        :checkboxText="'Là nhà cung cấp'"
      ></CheckboxDefault>
    </template>
    <!-- Dialog body  -->
    <div class="m-dialog-content-top">
      <div class="m-content-top-left">
        <InputField
          :inputSize="'151px'"
          :typeInput="'textField'"
          :labelTextField="'Mã'"
          :isRequire="true"
          @getValue="getEmployeeCode"
          :focusField="true"
          :initValue="employeeData.EmployeeCode"
          :errFieldData="errField.employeeCode"
          @changeFieldToValid="changeEmployeeCodeFieldToValid"
        ></InputField>
        <InputField
          :inputSize="'235px'"
          :typeInput="'textField'"
          :labelTextField="'Tên'"
          :isRequire="true"
          @getValue="getEmployeeName"
          :initValue="employeeData.EmployeeName"
          ref="txtName"
          :errFieldData="errField.employeeName"
          @changeFieldToValid="changeEmployeeNameFieldToValid"
        ></InputField>
        <SelectBoxInput
          :inputSize="'392px'"
          :typeInput="'selectBox'"
          :selectBoxDatas="departmentCompactDatas"
          :labelTextField="'Đơn vị'"
          :isRequire="true"
          @getValue="getDepartmentId"
          :initValue="employeeData.DepartmentId"
          :errFieldData="errField.department"
          @changeFieldToValid="changeDepartmentFieldToValid"
        ></SelectBoxInput>
        <InputField
          :inputSize="'392px'"
          :typeInput="'textField'"
          :labelTextField="'Chức danh'"
          @getValue="getEmployeePosition"
          :initValue="employeeData.EmployeePosition"
        ></InputField>
      </div>
      <div class="m-content-top-right">
        <DateInput
          :inputSize="'167px'"
          :labelTextField="'Ngày sinh'"
          @getValue="getDateOfBirth"
          :initValue="formatDataForDateInput(employeeData.DateOfBirth)"
          :errFieldData="errField.dob"
          @changeFieldToValid="changeDOBFieldToValid"
        ></DateInput>
        <CheckboxGenderField
          :inputSize="'245px'"
          :labelTextField="'Giới tính'"
          @getValue="getGender"
          :initValue="employeeData.Gender"
        >
        </CheckboxGenderField>
        <InputField
          :inputSize="'245px'"
          :typeInput="'textField'"
          :labelTextField="'Số CMND'"
          @getValue="getIdentityNumber"
          :initValue="employeeData.IdentityNumber"
        ></InputField>
        <DateInput
          :inputSize="'167px'"
          :typeInput="'dateField'"
          :labelTextField="'Ngày cấp'"
          @getValue="getIdentityDate"
          :initValue="formatDataForDateInput(employeeData.IdentityDate)"
        >
        </DateInput>
        <InputField
          :inputSize="'418px'"
          :labelTextField="'Nơi cấp'"
          @getValue="getIdentityPlace"
          :initValue="employeeData.IdentityPlace"
        ></InputField>
      </div>
    </div>
    <div class="m-dialog-content-bottom">
      <InputField
        :inputSize="'842px'"
        :typeInput="'textField'"
        :labelTextField="'Địa chỉ'"
        @getValue="getAddress"
        :initValue="employeeData.Address"
      ></InputField>
      <InputField
        :inputSize="'210px'"
        :typeInput="'textField'"
        :labelTextField="'ĐT di động'"
        @getValue="getPhoneNumber"
        :initValue="employeeData.PhoneNumber"
      ></InputField>
      <InputField
        :inputSize="'210px'"
        :typeInput="'textField'"
        :labelTextField="'ĐT cố định'"
        @getValue="getTelephoneNumber"
        :initValue="employeeData.TelephoneNumber"
      ></InputField>
      <InputField
        :inputSize="'210px'"
        :typeInput="'textField'"
        :labelTextField="'Email'"
        @getValue="getEmail"
        :initValue="employeeData.Email"
        :isNotValid="errField.email"
        :errFieldData="errField.email"
        @changeFieldToValid="changeEmailFieldToValid"
      ></InputField>
      <InputField
        :inputSize="'210px'"
        :typeInput="'textField'"
        :labelTextField="'Tài khoản ngân hàng'"
        @getValue="getBankAccountNumber"
        :initValue="employeeData.BankAccountNumber"
      ></InputField>
      <InputField
        :inputSize="'210px'"
        :typeInput="'textField'"
        :labelTextField="'Tên ngân hàng'"
        @getValue="getBankName"
        :initValue="employeeData.BankName"
      ></InputField>
      <InputField
        :inputSize="'210px'"
        :typeInput="'textField'"
        :labelTextField="'Chi nhánh'"
        @getValue="getBankBranchName"
        :initValue="employeeData.BankBranchName"
      ></InputField>
    </div>

    <!-- Dialog footer  -->
    <template v-slot:footerLeft>
      <ButtonDefault
        @handleDisplayDialog="handleDisplayDialog"
        :actionButton="btnCancel"
      ></ButtonDefault>
    </template>
    <template v-slot:footerRight>
      <ButtonDefault
        :isEditMode="isEditMode"
        @handleDisplayDialog="handleDisplayDialog"
        @refreshTable="refreshTable"
        @handleErrorInput="handleErrorInput"
        :submitData="employeeData"
        :requestUrl="'https://localhost:7252/api/v1/Employees'"
        :actionButton="btnStorage"
        class="m-button-storage"
      ></ButtonDefault>
      <ButtonDefault
        :isEditMode="isEditMode"
        @refreshDialog="refreshDialog"
        @refreshTable="refreshTable"
        @handleErrorInput="handleErrorInput"
        :submitData="employeeData"
        :requestUrl="'https://localhost:7252/api/v1/Employees'"
        :actionButton="btnStorageAndAdd"
      ></ButtonDefault>
    </template>

    <!-- Dialog hiển thị lỗi  -->
    <DialogNotifyErr
      v-if="isDisplayErrDialog"
      :errInformations="errInformations"
      @handleDisplayNotify="handleDisplayNotify"
    ></DialogNotifyErr>

    <!-- Dialog hiển thông báo đóng form  -->
    <DialogNotifyClose
      v-if="isDisplayCloseDialog"
      :noitifyText="'Dữ liệu đã bị thay đổi, bạn có muốn cất không?'"
      @handleConfirmClose="handleConfirmClose"
      @handleConfirmStorage="handleConfirmStorage"
      @handleConfirmCancel="handleConfirmCancel"
    ></DialogNotifyClose>
  </DialogLayout>
</template>

<script>
import axios from "axios";
import DialogLayout from "./DialogLayout.vue";
import ButtonDefault from "../button/ButtonDefault.vue";
import InputField from "../input/InputField.vue";
import CheckboxDefault from "../input/CheckboxDefault.vue";
import DialogNotifyErr from "../dialog/DialogNotifyErr.vue";
import DialogNotifyClose from "../dialog/DialogNotifyClose.vue";
import DateInput from "../input/DateInput.vue";
import CheckboxGenderField from "../input/CheckboxGenderField.vue";
import SelectBoxInput from "../input/SelectboxInput.vue";
import { pageResource } from "../../../../resourse.js";

export default {
  data() {
    return {
      // Dialog có header hay là không
      isHeaderDialog: true,
      // Tiêu đề header
      dialogTitle: pageResource.VI.header.dialogEmployeeTitle,
      // Gán tên actionButton
      btnStorage: "btnStorage",
      btnStorageAndAdd: "btnStorageAndAdd",
      btnCancel: "btnCancel",
      // Dữ liệu phòng ban lấy từ API
      departmentDatas: [],
      // Dữ liệu nhân viên khi chỉnh sửa form
      employeeData: {},
      // Dữ liệu phòng ban thu gọn
      departmentCompactDatas: [],
      // isDataValid: false,
      // Form đang thực hiện chức năng chỉnh sửa hay là thêm
      isEditMode: false,
      // Thông tin lỗi khi validate
      errInformations: [],
      // Thông tin các trường lỗi khi validate
      // errField: {},
      errField: {
        employeeCode: {
          isValid: true,
          description: "",
        },
        employeeName: {
          isValid: true,
          description: "",
        },
        department: {
          isValid: true,
          description: "",
        },
        email: {
          isValid: true,
          description: "",
        },
        dob: {
          isValid: true,
          description: "",
        },
      },
      // Hiển thị dialog thông báo lỗi hay là không
      isDisplayErrDialog: false,
      // Lưu giá trị khởi tạo của dữ liệu trên form
      employeeDataInitialJSON: "",
      // Hiển thị dialog hỏi đóng form hay không
      isDisplayCloseDialog: false,
    };
  },
  props: {
    // Dữ liệu nhân viên đang được chỉnh sửa
    employeeInput: {
      Type: Object,
      default: {},
    },
    // Có thực hiện tạo dialog mới hay không
    isNewDialog: {
      Type: Boolean,
      default: false,
    },
    // Có phải dialog nhân bản hay không
    isReplicationDialog: {
      Type: Boolean,
      default: false,
    },
  },
  created() {
    /**
     * Dialog nhân bản
     * CreatedBy: dsthuyr(26/06/2022)
     */
    if (this.isReplicationDialog == true) {
      this.employeeData = this.employeeInput;
      this.getNewEmployeeCode();
      this.isEditMode = false;
    } else if (this.isNewDialog == true) {
      /**
       * Dialog mới
       * CreatedBy: dsthuyr(26/06/2022)
       */
      this.employeeData = {};
      this.getNewEmployeeCode();
      this.isEditMode = false;
    } else {
      /**
       * Dialog với dữ liệu
       * CreatedBy: dsthuyr(26/06/2022)
       */
      this.employeeData = this.employeeInput;
      this.isEditMode = true;
      // Lưu trạng thái data khởi tạo của form dưới dạng JSON string
      this.employeeDataInitialJSON = JSON.stringify(this.employeeData);
    }
    /**
     * Lấy dữ liệu phòng ban
     * CreatedBy: dsthuyr(26/06/2022)
     */
    let me = this;
    axios
      .get("https://localhost:7252/api/v1/Departments")
      .then((response) => {
        me.departmentDatas = response.data;
        me.departmentCompactDatas = me.departmentDatas.map((departmentData) => {
          return {
            text: departmentData.DepartmentName,
            valueOption: departmentData.DepartmentId,
          };
        });
      })
      .catch((response) => {
        console.log(response);
      });
  },
  components: {
    DialogLayout,
    ButtonDefault,
    InputField,
    CheckboxDefault,
    DialogNotifyErr,
    DateInput,
    CheckboxGenderField,
    SelectBoxInput,
    DialogNotifyClose,
  },
  methods: {
    /**
     * Kiểm tra dialog có được chỉnh sữa không
     * CreatedBy: dsthuyr(26/06/2022)
     */
    checkDialogIsEdit() {
      let initialJSON = this.employeeDataInitialJSON;
      let dataJSON = JSON.stringify(this.employeeData);
      if (initialJSON != dataJSON) {
        this.isDisplayCloseDialog = true;
      } else {
        this.handleDisplayDialog(false);
      }
    },
    handleConfirmClose() {
      this.isDisplayCloseDialog = false;
      this.handleDisplayDialog(false);
    },
    handleConfirmStorage() {
      this.isDisplayCloseDialog = false;
      document.querySelector(".m-button-storage").click();
    },
    handleConfirmCancel() {
      this.isDisplayCloseDialog = false;
    },
    /**
     * Cập nhật trạng thái các trường input về hợp lệ
     * CreatedBy: dsthuyr(29/06/2022)
     */
    changeEmployeeCodeFieldToValid() {
      this.errField.employeeCode.isValid = true;
    },
    changeEmployeeNameFieldToValid() {
      this.errField.employeeName.isValid = true;
    },
    changeDepartmentFieldToValid() {
      this.errField.department.isValid = true;
    },
    changeEmailFieldToValid() {
      this.errField.email.isValid = true;
    },
    changeDOBFieldToValid() {
      this.errField.dob.isValid = true;
    },

    /**
     * Ẩn hiện dialog chi tiết nhân viên
     * CreatedBy: dsthuyr(26/06/2022)
     */
    handleDisplayDialog(variable) {
      this.$emit("handleDisplayDialog", variable);
    },
    /**
     * Ẩn hiện dialog thông báo lỗi
     * CreatedBy: dsthuyr(26/06/2022)
     */
    handleDisplayNotify(variable) {
      this.isDisplayErrDialog = variable;
    },
    /**
     * Làm mới form chi tiết nhân viên
     * CreatedBy: dsthuyr(26/06/2022)
     */
    refreshDialog() {
      this.employeeData = {};
      this.getNewEmployeeCode();
    },
    /**
     * Làm mới dữ liệu bảng
     * CreatedBy: dsthuyr(26/06/2022)
     */
    refreshTable(variable) {
      this.$emit("refreshTable", variable);
    },
    /**
     * Lấy mã nhân viên mới
     * CreatedBy: dsthuyr(26/06/2022)
     */
    getNewEmployeeCode() {
      let me = this;
      axios
        .get("https://localhost:7252/api/v1/Employees/GetNewCode")
        .then((response) => {
          console.log(response.data);
          me.employeeData.EmployeeCode = response.data;
          // Lưu trạng thái data khởi tạo của form dưới dạng JSON string
          me.employeeDataInitialJSON = JSON.stringify(me.employeeData);
        })
        .catch((response) => {
          console.log(response);
        });
    },
    /**
     * Xử lí hiển thị lỗi người dùng nhập dữ liệu vào form
     * CreatedBy: dsthuyr(26/06/2022)
     */
    handleErrorInput(variable) {
      if (variable.length != 0) {
        this.isDisplayErrDialog = true;
        this.errInformations = variable.errText;
        this.errField = variable.errField;
      }
    },

    /**
     * Các hàm lấy dữ liệu từ input, đưa vào biến employeeData
     * CreatedBy: dsthuyr(26/06/2022)
     */
    getEmployeeCode(variable) {
      this.employeeData.EmployeeCode = variable;
    },
    getEmployeeName(variable) {
      this.employeeData.EmployeeName = variable;
    },
    getDepartmentId(variable) {
      this.employeeData.DepartmentId = variable;
      // Khởi tạo kèm mã vị trí, vì trong code ko nhập vào trường này
      this.employeeData.PositionId = "148ed882-32b8-218e-9c20-39c2f00615e8";
    },
    getEmployeePosition(variable) {
      this.employeeData.EmployeePosition = variable;
    },
    getDateOfBirth(variable) {
      this.employeeData.DateOfBirth = variable;
    },
    getGender(variable) {
      this.employeeData.Gender = variable;
    },
    getIdentityNumber(variable) {
      this.employeeData.IdentityNumber = variable;
    },
    getIdentityDate(variable) {
      this.employeeData.IdentityDate = variable;
    },
    getIdentityPlace(variable) {
      this.employeeData.IdentityPlace = variable;
    },
    getAddress(variable) {
      this.employeeData.Address = variable;
    },
    getPhoneNumber(variable) {
      this.employeeData.PhoneNumber = variable;
    },
    getTelephoneNumber(variable) {
      this.employeeData.TelephoneNumber = variable;
    },
    getEmail(variable) {
      this.employeeData.Email = variable;
    },
    getBankAccountNumber(variable) {
      this.employeeData.BankAccountNumber = variable;
    },
    getBankName(variable) {
      this.employeeData.BankName = variable;
    },
    getBankBranchName(variable) {
      this.employeeData.BankBranchName = variable;
    },
    getResponseAction(variable) {
      console.log(variable);
    },
    /**
     * Hàm xử lí ngày tháng để đưa lên form
     * CreatedBy: dsthuyr(26/06/2022)
     */
    formatDataForDateInput(dateInput) {
      if (dateInput != null) {
        dateInput = new Date(dateInput);
        let day = dateInput.getDate();
        day = day < 10 ? `0${day}` : day;
        let month = dateInput.getMonth() + 1;
        month = month < 10 ? `0${month}` : month;
        let year = dateInput.getFullYear();
        return `${year}-${month}-${day}`; // VD: 2022-05-13
      } else {
        return "";
      }
    },
  },
};
</script>

<style scoped>
.m-dialog-content-top {
  display: flex;
  padding-bottom: 12px;
}
.m-content-top-left {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  padding-right: 26px;
}
.m-content-top-right {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.m-dialog-content-bottom {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.m-dialog-footer {
  display: flex;
  justify-content: space-between;
}
.m-button-storage {
  margin: 0 10px;
}
.m-checkbox-role {
  margin-left: 20px;
  margin-top: 10px;
}
</style>
