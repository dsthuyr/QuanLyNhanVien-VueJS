<template>
  <div class="m-page-header">
    <div class="m-font-title-1">{{ dataHeaderContent.titlePage }}</div>
    <div v-if="dataHeaderContent.actionButton !== undefined">
      <div class="m-page-button">
        <ButtonDefault
          :actionButton="dataHeaderContent.actionButton"
          @handleDisplayDialog="handleDisplayDialog"          
        ></ButtonDefault>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonDefault from "../button/ButtonDefault.vue";
export default {
  components: {
    ButtonDefault,
  },
  props: {
    dataHeaderContent: {
      Type: Object,
      default: {},
    },
  },
  methods: {
    handleDisplayDialog(variable){
      this.$emit("handleDisplayDialog", variable)
    },
  },
};
</script>

<style>
.m-page-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}
</style>
