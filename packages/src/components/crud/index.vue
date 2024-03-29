<!--
 * @Author: Mx
 * @Date: 2023-03-22 10:09:58
 * @Description: Crud
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
          type="primary"
          plain
          @click="exportExcel"
          :size="controlSize"
          :loading="exportLoading"
          v-if="vaildData(tableOption.exportBtn, false)"
          >导出</el-button
        >
        <el-button
          type="primary"
          plain
          @click="exportRecord"
          :size="controlSize"
          :loading="exportLoading"
          v-if="vaildData(tableOption.exportRecordBtn, false)"
          >导出记录</el-button
        >
        <el-button
          type="info"
          @click="searchReset"
          :size="controlSize"
          v-if="vaildData(tableOption.search, true)"
        >
          重置
        </el-button>
        <!-- 自定义按钮 -->
        <slot name="menuLeft"></slot>
      </div>

      <div :class="b('right')"></div>
    </div>
    <!-- 搜索组件 -->
    <HeaderSearch v-model="searchForm" ref="headerSearch">
      <template
        v-for="item in searchOption"
        slot-scope="{ column }"
        :slot="item.prop + 'Search'"
      >
        <!-- 搜索 自定义slot -->
        <slot v-if="item.searchslot" :column="column" :name="item.prop + 'Search'"></slot>
      </template>
    </HeaderSearch>
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
        @custom-view="customView"
        @row-edit="rowEdit"
        @custom-edit="customEdit"
      >
        <!-- 每列 自定义slot -->
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
    <Page ref="tablePage"></Page>

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
    exportLoading: {
      type: Boolean,
      default: false,
    },
  },
  components: { Column, Page, HeaderSearch, DialogForm },
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
  watch: {
    data() {
      this.dataInit();
    },
    // 分页参数配置项
    page: {
      handler() {
        this.$refs.tablePage.pageInit();
      },
      deep: true,
    },
  },
  data() {
    return {
      config,
      tableColumn: [], // 表格列
      list: [], // 表格展示的数据
      tableForm: {}, // 弹窗表单
      searchForm: {}, // 搜索表单
      tableOption: {}, //配置项
      searchOption: [], // 搜索的配置
      tableIndex: -1, // 当前处理行的索引
      DIC: {}, // 字典集合
      functionName: "", // 当前模块的名字
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
    // 查看
    rowView(row, index) {
      this.tableForm = this.rowClone(row);
      this.$emit("input", this.tableForm);
      this.tableIndex = index;
      this.$refs.dialogForm.show("view");
    },
    // 自定义查看
    customView(row, index) {
      this.$emit("custom-view", row, index);
    },
    // 编辑
    rowEdit(row, index) {
      this.tableForm = this.rowClone(row);
      this.$emit("input", this.tableForm);
      this.tableIndex = index;
      this.$refs.dialogForm.show("edit", index);
    },
    // 自定义编辑
    customEdit(row, index) {
      this.$emit("custom-edit", row, index);
    },
    // 新增
    rowAdd() {
      if (this.tableOption.customAdd) {
        // 自定义新增
        this.$emit("custom-add");
      } else {
        // 默认新增
        this.$refs.dialogForm.show("add");
      }
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
      this.initSearchOption();
      this.titleInit();
    },
    /** 4.初始化搜索配置 */
    initSearchOption() {
      const option = this.deepClone(this.propOption || []).filter(
        (item) => item.search === true
      );
      this.searchOption = option;
      console.log("搜索配置", this.searchOption);
    },
    /** 初始化标题 */
    titleInit(title = "") {
      this.functionName = title || this.$route.meta.title;
    },
    // 搜索
    searchChange() {
      this.$refs.headerSearch.searchChange();
    },
    // 重置搜索条件
    searchReset() {
      this.$refs.headerSearch.searchReset();
    },
    // 导出excel
    exportExcel() {
      console.log("exportExcel");
    },
    // 导出记录
    exportRecord() {
      console.log("exportRecord");
    },
  },
});
</script>

<style lang="scss" scoped></style>
