<!--
 * @Author: Mx
 * @Date: 2023-03-22 10:09:58
 * @Description: 
-->
<template>
  <div :class="b()">
    <!-- 顶部操作栏 -->
    <div :class="b('menu')">
      <div :class="b('left')">
        <el-button
          type="primary"
          @click="rowAdd"
          :icon="config.addBtnIcon"
          :size="controlSize"
          :disabled="tableOption.addDisabled"
          v-if="vaildData(tableOption.addBtn, true)"
          >新增</el-button
        >
        <el-button
          type="primary"
          @click="searchChange"
          :icon="config.searchBtnIcon"
          :size="controlSize"
          :loading="tableLoading"
          class="btn-query"
          v-if="vaildData(tableOption.search, true)"
          >查询</el-button
        >
        <el-button
          type="info"
          @click="exportExcel"
          icon="iconfont icondaochu1"
          :size="controlSize"
          :loading="exportLoading"
          v-if="vaildData(tableOption.exportBtn, false)"
          >导出</el-button
        >
      </div>
      <div :class="b('right')"></div>
    </div>
    <!-- 搜索组件 -->
    <HeaderSearch v-model="searchForm" ref="headerSearch"> </HeaderSearch>
    <!-- 表格主体 -->
    <el-table
      :data="list"
      v-loading="tableLoading"
      :border="vaildData(tableOption.border, config.border)"
    >
      <Column
        :tableColumn="tableColumn"
        :tableOption="tableOption"
        @row-del="rowDel"
        @row-view="rowView"
      >
        <!-- 每列的自定义slot -->
        <template v-for="item in propOption" slot-scope="scope" :slot="item.prop">
          <slot :row="scope.row" :name="item.prop"></slot>
        </template>

        <!-- 操作栏 自定义slot-->
        <template v-slot:menu="{ row }">
          <slot name="menu" :row="row"></slot>
        </template>
      </Column>
    </el-table>
    <!-- 分页 -->
    <Page></Page>

    <!-- 表单 -->
    <Dialog-form v-model="tableForm" ref="dialogForm" :class="dialogClass"> </Dialog-form>
  </div>
</template>

<script type="text/javascript">
import Column from "./column";
import HeaderSearch from "./headerSearch";
import DialogForm from "./dialog-form";
import Page from "./page";
import create from "../../core/create";
import config from "./config.js";
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
    tableLoading: {
      // 表格loading
      type: Boolean,
      default: false,
    },
    option: {
      // 列表配置项
      type: Object,
      required: true,
      default: () => {
        return {};
      },
    },
    dialogClass: {
      type: String,
    },
  },
  components: { Column, Page, HeaderSearch, DialogForm },
  data() {
    return {
      config,
      tableColumn: [], // 表格列
      list: [], // 表格展示的数据
      tableForm: {}, // 弹窗表单
      searchForm: {}, // 搜索表单
      tableOption: {}, //配置项
      searchOption: [], // 搜索的配置
      boxType: "add", // 弹窗类型
      tableIndex: -1, // 当前处理行的索引
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
    controlSize() {
      return this.tableOption.size || "small";
    },
  },
  mounted() {},
  methods: {
    // 对象克隆
    rowClone(row) {
      const rowData = {};
      Object.keys(row).forEach((ele) => {
        if (!["_parent", "children"].includes(ele)) {
          rowData[ele] = row[ele];
        }
      });
      return rowData;
    },
    // 删除
    rowDel(row, index) {
      this.$emit("row-del", row, index);
    },
    //查看
    rowView(row, index) {
      this.tableForm = this.rowClone(row);
      this.$emit("input", this.tableForm);
      this.tableIndex = index;
      this.$refs.dialogForm.show("view");
    },
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
    // 添加
    rowAdd() {
      if (!this.tableOption.customAdd) {
        this.$refs.dialogForm.show("add");
      } else {
        this.$emit("custom-add");
      }
    },
    // 搜索
    searchChange() {
      this.$refs.headerSearch.searchChange();
    },
  },
});
</script>

<style lang="scss" scoped></style>
