<!--
 * @Author: mn
 * @Date: 2020-12-11 14:17:35
 * @Description: crud主文件
-->
<template>
  <div>
    <!-- 搜索组件 -->
    <HeaderSearch> </HeaderSearch>
    <!-- 表格主体 -->
    <el-table :data="list">
      <Column :columnOption="tableColumn" :tableOption="tableOption">
        <template v-slot:menu="{ row }">
          <slot name="menu" :row="row"></slot>
        </template>
      </Column>
    </el-table>
    <!-- 分页 -->
    <Page></Page>
  </div>
</template>

<script type="text/javascript">
import Column from "./column";
import HeaderSearch from "./headerSearch";
import Page from "./page";
import create from "../../core/create";
export default create({
  name: "crud",
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
  components: { Column, Page, HeaderSearch },
  data() {
    return {
      tableColumn: [], // 表格列
      list: [], // 表格展示的数据
      tableOption: {}, //配置项
      searchOption: [], // 搜索的配置
      DIC: {}, // 字典集合
    };
  },
  created() {
    //1.初始化列表数据
    this.dataInit();
    //2.初始化列
    this.initTableColumn();
    //3.获取配置项
    this.configInit();
  },
  computed: {
    // 列的配置集合
    columnOption() {
      return this.tableOption.column || [];
    },
    // 返回所有的配置项  包括children里面的配置
    propOption() {
      let result = [];
      const ctx = this;
      // 递归查找所有的属性配置
      function findProp(list) {
        list.forEach((ele) => {
          if (ele.prop) {
            result.push(ele);
          }
          if (ele.children) {
            ctx.isChild = true;
            findProp(ele.children);
          }
        });
      }
      findProp(this.columnOption);
      return result;
    },
  },
  mounted() {},
  methods: {
    //1.初始化列表数据
    dataInit() {
      this.list = this.data;
    },
    //2.初始化表格列
    initTableColumn() {
      this.tableColumn = this.option.column.filter((o) => o.hide !== true);
    },
    //3.获取配置项
    configInit() {
      this.tableOption = this.deepClone(this.option);

      // 初始化搜索配置
      this.initSearchOption();
    },
    // 4.初始化搜索配置
    initSearchOption() {
      const option = this.deepClone(this.propOption || []).filter(
        (item) => item.search === true
      );
      this.searchOption = option;
      console.log("搜索配置", this.searchOption);
    },
  },
});
</script>

<style lang="scss" scoped></style>
