<template>
  <div class="m-container-table">
    <div class="m-page-table m-font-content">
      <table class="m-table">
        <thead>
          <tr>
            <th class="text-align-center column-size-0">
              <CheckboxAll @addDeleteAllItem="addDeleteAllItem" @removeDeleteAllItem="removeDeleteAllItem"></CheckboxAll>
            </th>
            <th
              v-for="(tableHeaderData, index) in tableHeaderDatas"
              :key="index"
              :class="`column-size-${tableHeaderData.size} text-align-${tableHeaderData.alignText}`"
            >
              {{ tableHeaderData.text }}
            </th>
            <th class="text-align-center column-size-1 m-function-column">
              <div class="m-function-column-text">CHỨC NĂNG</div>
            </th>
          </tr>
        </thead>
        <div></div>
        <tbody>
          <tr
            class="tr-hover"
            v-for="(tableBodyData, index) in tableBodyDatas"
            :key="index"
          >
            <!-- <td>
              <input type="checkbox" name="" id="" />
            </td> -->
            <td>
              <CheckboxDefault :isAddAllItem="isAddAllItem" :idData="tableBodyData[0]" @addDeleteItem="addDeleteItem" @removeDeleteItem="removeDeleteItem"></CheckboxDefault>
            </td>
            <td
              v-for="i in tableBodyData.length - 1"
              :key="i"
              class="text-align-left"
            >
              {{ tableBodyData[i] }}
            </td>

            <td class="text-align-center m-function-table">
              <!-- Nút sửa  -->
              <ButtonDefault
                :requestUrl="'https://localhost:7252/api/v1/Employees/'"
                :idEntity="tableBodyData[0]"
                :actionButton="'btnEdit'"
                @handleDisplayDialogForEdit="handleDisplayDialogForEdit"
              ></ButtonDefault>

              <!-- Dropdown Menu  -->
              <div class="m-dropdown">
                <!-- Nút hiển thị dropdown Menu  -->
                <div class="icon-arrow-down" @click="displayDropdownMenu(tableBodyData[0], $event)"></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Vị trí hiển thị bảng thông báo dữ liệu trống hoặc hiển thị refresh bảng -->
      <slot></slot>
    </div>
    <!-- Table Navigation -->
    <TableNav class="m-nav-table" :pageInfo=pageInfo @updateTableData="updateTableData"></TableNav>
  </div>
</template>

<script>
import ButtonDefault from "../button/ButtonDefault.vue";
import TableNav from "../table/TableNav.vue";
import CheckboxDefault from "../input/CheckboxDefault.vue"
import CheckboxAll from "../input/CheckboxAll.vue"

export default {
  name: "TableContent",
  components: {
    ButtonDefault,
    TableNav,
    CheckboxDefault,
    CheckboxAll
  },
  props: {
    tableHeaderDatas: {
      Type: Array,
      default: [],
    },

    tableBodyDatas: {
      Type: Array,
      default: [],
    },
    pageInfo: {
      Type: Object,
      default: {},
    },
  },
  data() {
    return {
      isLoading: true,
      deleteItems: [],
      isAddAllItem: false,
    };
  },
  methods: {
    /**
     * Emit event hiển thị form chỉnh sửa
     * CreatedBy: dsthuyr (26/06/2022)
     */
    handleDisplayDialogForEdit(variable) {
      this.$emit("handleDisplayDialogForEdit", variable)
    },
    /**
     * Emit event hiển thị dropdown menu, dropdownData gồm id đối tượng, tọa độ x click trên trang, tọa độ y click trên trang
     * CreatedBy: dsthuyr (26/06/2022)
     */
    displayDropdownMenu(variable, event) {
      let dropdownData = {
        idEntity: variable,
        pageX: event.pageX,
        pageY: event.pageY
      }
      this.$emit("displayDropdownMenu", dropdownData)
    },
    /**
     * Cập nhật dữ liệu bảng
     * CreatedBy: dsthuyr (26/06/2022)
     */
    updateTableData(variable) {
      this.$emit("updateTableData", variable)
    },
    /**
     * Thêm đối tượng vào danh sách thực hiện xóa
     * CreatedBy: dsthuyr (26/06/2022)
     */
    addDeleteItem(variable) {
      this.deleteItems.push(variable)
      this.$emit("listDeleteItems", this.deleteItems)
    },
    /**
     * Xóa đối tượng khỏi danh sách thực hiện xóa
     * CreatedBy: dsthuyr (26/06/2022)
     */
    removeDeleteItem(variable) {
      var index = this.deleteItems.indexOf(variable);
      if (index !== -1) {
        this.deleteItems.splice(index, 1);
      }
      this.$emit("listDeleteItems", this.deleteItems)
    },
    /**
     * Thêm tất cả đối tượng vào danh sách thực hiện xóa
     * CreatedBy: dsthuyr (26/06/2022)
     */
    addDeleteAllItem() {
      this.isAddAllItem = true
      this.tableBodyDatas.forEach(tableBodyData => {
        this.deleteItems.push(tableBodyData[0])
      });
      this.$emit("listDeleteItems", this.deleteItems)
    },
    /**
     * Xóa tất cả đối tượng khỏi danh sách thực hiện xóa
     * CreatedBy: dsthuyr (26/06/2022)
     */
    removeDeleteAllItem() {
      this.isAddAllItem = false
      this.deleteItems = []
      this.$emit("listDeleteItems", this.deleteItems)
    },
  },
};
</script>

<style scoped>
.m-container-table {
  position: relative;
  height: calc(100vh - 136px - 48px - 6px);
  padding: 0 30px 0 16px;
  box-sizing: border-box;
}
.m-page-table {
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  z-index: 1;
}

.m-table {
  border-spacing: 0;
  overflow: auto;
  padding-bottom: 60px;
  box-sizing: border-box;
}

th {
  border-right: 1px solid #c7c7c7;
  border-bottom: 1px solid #c7c7c7;
  position: sticky;
  z-index: 3;
  top: 0;
  background-color: #e5e8ec;
  vertical-align: middle;
  height: 33px;
  padding-left: 10px;
  box-sizing: border-box;
}

td {
  padding: 0 10px;
  border-bottom: 1px solid #c7c7c7;
  border-right: 1px dotted #c7c7c7;
  white-space: pre-wrap;
  height: 44px;
  box-sizing: border-box;
}

tr {
  z-index: 2;
}

tr:hover {
  background-color: #f2f9ff;
  cursor: pointer;
  transition: all .2s ease;
}
.tr-hover:hover td {
  background-color: #f2f9ff;
  cursor: pointer;
  transition: all .2s ease;
}

td:last-child {
  border-left: 1px dotted #c7c7c7;
}

th:last-child {
  border-left: 1px solid #c7c7c7;
  border-bottom: 1px solid #c7c7c7;
}
td:first-child {
  /* border-right: 1px solid #c7c7c7; */
  border-bottom: 1px solid #c7c7c7;
  position: sticky;
  z-index: 2;
  left: 0;
  background-color: #fff;
  vertical-align: middle;
}

td:last-child {
  /* border-left: 1px solid #c7c7c7; */
  border-bottom: 1px solid #c7c7c7;
  position: sticky;
  z-index: 2;
  right: 0;
  background-color: #fff;
  vertical-align: middle;
}

th:first-child {
  z-index: 4;
  left: 0;
  top: 0;
  padding-left: 10px;
  padding-bottom: 18px;
}

th:last-child {
  z-index: 4;
  right: 0;
  top: 0;
}

.icon-arrow-down {
  margin-left: 20px;
}

.text-align-left {
  text-align: left !important;
}

.text-align-right {
  text-align: right !important;
}

.text-align-center {
  text-align: center !important;
}

.column-size-0 {
  min-width: 40px;
}

.column-size-1 {
  min-width: 120px;
}

.column-size-2 {
  min-width: 200px;
}

.m-page-table::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.m-page-table::-webkit-scrollbar-thumb {
  background: #b8bcc3;
}
.m-nav-table {
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 9;
  width: calc(100% - 56px);
  background-color: #fff;
  padding-right: 16px;
  box-sizing: border-box;
}

.m-function-table {
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  color: #0075c0;
}
</style>
