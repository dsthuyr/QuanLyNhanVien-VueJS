<template>
  <button
    class="m-font-content"
    :class="
      isTertiary
        ? 'm-btn-tertiary'
        : isSecondary
        ? 'm-btn-secondary'
        : 'm-btn-default'
    "
    @click="checkAction()"
  >
    {{ textButton }}
  </button>
</template>

<script>
import axios from "axios";
import { pageResource } from "../../../../resourse.js";
import { isEmail, isDOBValid } from "../../../js/Validate.js";
export default {
  name: "ButtonDefault",
  props: {
    /**
     * Hành động mà button sẽ thực hiện
     * Author: dsthuyr (13/06/2022)
     */
    actionButton: {
      Type: String,
      default: "",
    },
    /**
     * Url request khi tương tác đến API
     * Author: dsthuyr (13/06/2022)
     */
    requestUrl: {
      Type: String,
      default: "",
    },
    /**
     * Dữ liệu gửi lên (VD như Edit, thêm mới dữ liệu)
     * Author: dsthuyr (13/06/2022)
     */
    submitData: {
      Type: Object,
      default: {},
    },
    /**
     * id của thực thể (dùng trong việc lấy dữ liệu để chỉnh sửa
     * Author: dsthuyr (13/06/2022)
     */
    idEntity: {
      Type: String,
      default: {},
    },
    /**
     * Biến để xác định xem, Nút cất, cất và thêm đang ở form thêm hay form chỉnh sửa
     * Author: dsthuyr (13/06/2022)
     */
    isEditMode: {
      Type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // Nội dung mà Button sẽ hiển thị
      textButton: "",
      // CSS nút dạng 2
      isSecondary: false,
      // CSS nút dạng 3
      isTertiary: false,
      // Dữ liệu của đối tượng sau khi lấy từ API
      entityData: {},
    };
  },
  /**
   * Gán text và CSS cho các nút theo actionButton
   * CreatedBy: dsthuyr(26/06/2022)
   */
  created() {
    var me = this;
    if (me.actionButton == "btnDetailEmployee") {
      me.textButton = pageResource.VI.textButton.btnDetailEmployee;
    } else if (me.actionButton == "btnStorage") {
      me.textButton = pageResource.VI.textButton.btnStorage;
      me.isSecondary = true;
    } else if (me.actionButton == "btnStorageAndAdd") {
      me.textButton = pageResource.VI.textButton.btnStorageAndAdd;
    } else if (me.actionButton == "btnCancel") {
      me.textButton = pageResource.VI.textButton.btnCancel;
      me.isSecondary = true;
    } else if (me.actionButton == "btnConfirm") {
      me.textButton = pageResource.VI.textButton.btnConfirm;
    } else if (me.actionButton == "btnEdit") {
      me.textButton = pageResource.VI.textButton.btnEdit;
      me.isTertiary = true;
    } else if (me.actionButton == "btnClose") {
      me.textButton = pageResource.VI.textButton.btnClose;
    } else if (me.actionButton == "btnConfirmYes") {
      me.textButton = pageResource.VI.textButton.btnConfirmYes;
    } else if (me.actionButton == "btnConfirmNo") {
      me.textButton = pageResource.VI.textButton.btnConfirmNo;
      me.isSecondary = true;
    }
  },
  methods: {
    /**
     * Hàm kiểm tra xem nút thực hiện chức năng gì và thực hiện nó
     * CreatedBy: dsthuyr(26/06/2022)
     */
    checkAction() {
      var me = this;
      // Xử lí hành động nút Thêm nhân viên trong form Chi tiết nhân viên
      if (me.actionButton == "btnDetailEmployee") {
        me.$emit("handleDisplayDialog", true);
      }
      // Xử lí hành động nút Cất trong form Chi tiết nhân viên
      else if (me.actionButton == "btnStorage") {
        // Validate dữ liệu
        let errResponse = {};
        errResponse = this.validateEmployeeDatas();
        if (errResponse.errText.length != 0) {
          this.$emit("handleErrorInput", errResponse);
          return;
        }
        if (me.requestUrl != "") {
          let jsonSubmitData = JSON.stringify(me.submitData);
          console.log(jsonSubmitData);
          // Kiểm tra xem chức năng của nút là chỉnh sửa hay thêm mới
          if (me.isEditMode) {
            let urlForEdit = `${me.requestUrl}`;
            axios
              .put(urlForEdit, jsonSubmitData, {
                headers: { "Content-Type": "application/json" },
              })
              .then(function (response) {
                console.log(response);
                me.$emit("handleDisplayDialog", false);
                me.$emit("refreshTable", true);
              })
              .catch(function (response) {
                console.log(response);
                errResponse.errText.push(
                  response.response.data.data.detailErr[0]
                );
                me.$emit("handleErrorInput", errResponse);
              });
          } else {
            console.log("aa");
            axios
              .post(me.requestUrl, jsonSubmitData, {
                headers: { "Content-Type": "application/json" },
              })
              .then(function (response) {
                console.log(response);
                me.$emit("handleDisplayDialog", false);
                me.$emit("refreshTable", true);
              })
              .catch(function (response) {
                console.log(response);
                errResponse.errText.push(
                  response.response.data.data.detailErr[0]
                );
                me.$emit("handleErrorInput", errResponse);
              });
          }
        }
      }
      // Xử lí hành động nút Cất và thêm trong form Chi tiết nhân viên
      else if (me.actionButton == "btnStorageAndAdd") {
        // Validate dữ liệu
        let errResponse = {};
        errResponse = this.validateEmployeeDatas();
        if (errResponse.errText.length != 0) {
          this.$emit("handleErrorInput", errResponse);
          return;
        }
        if (me.requestUrl != "") {
          let jsonSubmitData = JSON.stringify(me.submitData);
          console.log(jsonSubmitData);
          // Kiểm tra xem chức năng của nút là chỉnh sửa hay thêm mới
          if (me.isEditMode) {
            let urlForEdit = `${me.requestUrl}`;
            axios
              .put(urlForEdit, jsonSubmitData, {
                headers: { "Content-Type": "application/json" },
              })
              .then(function (response) {
                console.log(response);
                me.$emit("refreshDialog", true);
                me.$emit("refreshTable", true);
              })
              .catch(function (response) {
                console.log(response);
                errResponse.errText.push(
                  response.response.data.data.detailErr[0]
                );
                me.$emit("handleErrorInput", errResponse);
              });
          } else {
            axios
              .post(me.requestUrl, jsonSubmitData, {
                headers: { "Content-Type": "application/json" },
              })
              .then(function (response) {
                console.log(response);
                me.$emit("refreshDialog", true);
                me.$emit("refreshTable", true);
              })
              .catch(function (response) {
                console.log(response);
                errResponse.errText.push(
                  response.response.data.data.detailErr[0]
                );
                me.$emit("handleErrorInput", errResponse);
              });
          }
        }
      }
      // Xử lí hành động nút Hủy trong form Chi tiết nhân viên
      else if (me.actionButton == "btnCancel") {
        me.$emit("handleDisplayDialog", false);
      }
      // Xử lí hành động đóng dialog notify
      else if (me.actionButton == "btnClose") {
        me.$emit("handleDisplayNotify", false);
      }
      //
      else if (me.actionButton == "btnConfirm") {
        //
      }
      // Nút xác nhận có thực hiện hành động
      else if (me.actionButton == "btnConfirmYes") {
        // this.$emit("handleConfirmDelete");
      }
      // Nút xác nhận không thực hiện hành động
      else if (me.actionButton == "btnConfirmNo") {
        // this.$emit("handleCancelDelete");
      }

      // Xử lí hành động Sửa trong Bảng nhân viên
      else if (me.actionButton == "btnEdit") {
        axios.get(`${me.requestUrl}${me.idEntity}`).then((res) => {
          me.entityData = res.data;
          me.$emit("handleDisplayDialogForEdit", me.entityData);
        });
      }
    },
    // Validate Dữ liệu người dùng nhập vào
    validateEmployeeDatas() {
      let eCode = this.submitData.EmployeeCode;
      let eDepartment = this.submitData.DepartmentId;
      let eName = this.submitData.EmployeeName;
      let eDOB = this.submitData.DateOfBirth;
      let eEmail = this.submitData.Email;
      let errText = [];
      let errField = {
        employeeCode: {
          isValid: true,
          description: pageResource.VI.message.employeeCodeEmpty,
        },
        employeeName: {
          isValid: true,
          description: pageResource.VI.message.employeeNameEmpty,
        },
        department: {
          isValid: true,
          description: pageResource.VI.message.departmentEmpty,
        },
        email: {
          isValid: true,
          description: pageResource.VI.message.emailNotValid,
        },
        dob: {
          isValid: true,
          description: pageResource.VI.message.dobNotValid,
        },
      };
      if (eCode == undefined || eCode == "") {
        errText.push(pageResource.VI.message.employeeCodeEmpty);
        errField.employeeCode.isValid = false;
      }
      if (eDepartment == undefined || eDepartment == "") {
        errText.push(pageResource.VI.message.departmentEmpty);
        errField.department.isValid = false;
      }
      if (eName == undefined || eName == "") {
        errText.push(pageResource.VI.message.employeeNameEmpty);
        errField.employeeName.isValid = false;
      }
      try {
        if (!isDOBValid(eDOB)) {
          errText.push(pageResource.VI.message.dobNotValid);
          errField.dob.isValid = false;
        }
      } catch (error) {
        console.log(error);
      }
      try {
        if (!isEmail(eEmail)) {
          errText.push(pageResource.VI.message.emailNotValid);
          errField.email.isValid = false;
        }
      } catch (error) {
        console.log(error);
      }
      let errResponse = {
        errText,
        errField,
      };
      console.log(errResponse);
      return errResponse;
    },
  },
};
</script>

<style scoped>
.m-btn-default {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  color: #fff;
  background-color: #2ca01c;
  font-weight: 600;
  border-radius: 3px;
  cursor: pointer;
  height: 36px;
  min-width: 55px;
  padding: 6px 16px;
}
.m-btn-default:hover {
  background-color: #35bf22;
  transition: all 0.2s ease;
}
.m-btn-secondary {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  background-color: #fff;
  border: 1px #bbb solid;
  font-weight: 600;
  border-radius: 3px;
  cursor: pointer;
  height: 36px;
  min-width: 55px;
  padding: 6px 16px;
  box-sizing: border-box;
}
.m-btn-secondary:hover {
  background-color: #d2d3d6;
  transition: all 0.2s ease;
}
.m-btn-tertiary {
  outline: none;
  border: none;
  /* padding: 6px 1px 6px 16px!important; */
  color: #0075c0;
  border-radius: 3px 0 0 3px;
  height: 36px;
  cursor: pointer;
  background-color: unset;
}
</style>
