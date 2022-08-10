<!--
 * @Author: mn
 * @Date: 2020-12-11 14:17:35
 * @Description: crud主文件
-->
<template>
  <div>
    <!-- 表格主体 -->
    <el-table :data="list">
      <Column :columnOption="tableColumn"> </Column>
    </el-table>
    <!-- 分页 -->
    <Page></Page>
  </div>
</template>

<script type="text/javascript">
import Column from "./column";
import Page from "./Page";

export default {
  name: "mx-crud",
  props: {
    data: {
      type: Array,
      require: true,
      default: () => {
        return [];
      },
    },
    page: {
      // 列表配置项
      type: Object,
    },
    option: {
      // 列表配置项
      type: Object,
      required: true,
      default: () => {
        return {};
      },
    },
  },
  components: { Column, Page },
  data() {
    return {
      tableColumn: [], // 表格列配置
      list: [], // 表格展示的数据
    };
  },
  created() {
    //1.初始化列表数据
    this.dataInit();
    //2.初始化列配置
    this.initTableColumn();
  },
  mounted() {},
  methods: {
    //1.初始化列表数据
    dataInit() {
      this.list = this.data;
    },
    //2.初始化列配置
    initTableColumn() {
      this.tableColumn = this.option.column.filter((o) => o.hide !== true);
    },
  },
};
</script>

<style lang="scss" scoped></style>
