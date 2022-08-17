<template>
  <div class="m-nav-pagination">
    <div class="m-nav-pagination-left">
      Tổng số: <strong>{{ pageInfo.totalRecord }}</strong> bản ghi
    </div>
    <div class="m-nav-pagination-right">
      <select v-model="pageSize" class="m-nav-pagination-select">
        <option
          v-for="(navData, index) in navDatas"
          :value="navData.value"
          :key="index"
        >
          {{ navData.value }} bản ghi trên 1 trang
        </option>
      </select>
      <Paginate
        v-model="pageIndex"
        :page-count="pageInfo.totalPage"
        :click-handler="updateTableData"
        :prev-text="'Trước'"
        :next-text="'Sau'"
        :container-class="'m-nav-pagination-container'"
        :page-class="'m-nav-pagination-item'"
        :prev-class="'m-nav-pagination-item-prev'"
        :next-class="'m-nav-pagination-item-next'"
      >
      </Paginate>
    </div>
  </div>
</template>

<script>
import Paginate from "vuejs-paginate-next";
export default {
  name: "TableNav",
  components: {
    Paginate,
  },
  props: {
    pageInfo:{
      Type: Object,
      default: {}
    }
  },
  data() {
    return {
      pageIndex: 1,
      pageSize: 10,
      navDatas: [
        {
          value: 10,
        },
        {
          value: 20,
        },
        {

          value: 30,
        },
        {
          value: 40,
        },
      ],
    };
  },
  methods: {
    updateTableData(){
      let tableConfig = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      this.$emit("updateTableData",tableConfig);
    },
  },
  watch: {
    pageSize(){
      this.updateTableData()
    }    
  }
};
</script>

<style >
.m-nav-pagination {
  display: flex;
  align-items: center;
  height: 60px;
  margin-top: auto;
  margin-left: 16px;
  margin-right: 30px;
  justify-content: space-between;
}

.m-nav-pagination-right {
  display: flex;
  align-items: center;
}


.m-nav-pagination-container {
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  margin: 0 16px;
  list-style: none;
}

.m-nav-pagination-item {
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  box-sizing: border-box;
}

li.m-nav-pagination-item.active {
  border: 1px solid #e0e0e0;
  font-weight: 700;
}

.m-nav-pagination-item-next {
  margin-left: 16px;
}
.m-nav-pagination-item-prev {
  margin-right: 16px;
}

.m-nav-pagination-select {
  height: 32px;
  width: 200px;
  border-radius: 2px;
  border: 1px #babec5 solid;
  padding: 0 8px;
  background: url() no-repeat;
  box-sizing: border-box;
}

.m-nav-pagination-select:focus {
  border: 1px #2ca01c solid;
  outline: unset;
}

</style>
