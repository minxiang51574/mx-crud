<!--
 * @Author: your name
 * @Date: 2020-12-12 14:45:39
 * @Description: In User Settings Edit
-->
<template>
  <div>
    <!--表格所有列-->
    <template v-for="(column, index) in columnOption">
      <template>
        <el-table-column :key="`col_${index}`" :prop="column.prop" :label="column.label">
        </el-table-column>
      </template>
    </template>
    <!-- 操作列 -->
    <el-table-column
      fixed="right"
      label="操作"
      width="200px"
      v-if="tableOption.isShowmenu || tableConfig.isShowmenu"
    >
      <template v-slot="{ row, $index }">
        <!-- 查看按钮 -->
        <el-button
          type="text"
          @click="view(row, $index)"
          v-if="vaildData(tableOption.isViewBtn, tableConfig.isViewBtn)"
          >查看</el-button
        >
        <!-- 编辑按钮 -->
        <el-button
          type="text"
          @click="rowEdit(row, $index)"
          v-if="vaildData(tableOption.isEditBtn, tableConfig.isEditBtn)"
          >编辑</el-button
        >
        <!-- 删除按钮 -->
        <el-button
          type="text"
          @click="rowDel(row, $index)"
          v-if="vaildData(tableOption.isDelBtn, tableConfig.isDelBtn)"
          >删除</el-button
        >
        <slot name="menu" :row="row"></slot>
      </template>
    </el-table-column>
  </div>
</template>

<script type="text/javascript">
import tableConfig from "./tableConfig.js";
export default {
  name: "mx-column",
  props: {
    columnOption: {
      type: Array,
      default: () => {
        return [];
      },
    },
    tableOption: {
      type: Object,
    },
  },
  data() {
    return {
      tableConfig,
    };
  },
  methods: {
    // 查看
    view(row, index) {
      console.log("row", row, index);
      this.$emit("rowView", row, index);
    },
    // 编辑
    rowEdit(row, index) {
      this.$emit("rowEdit", row, index);
    },
    // 查看
    rowDel(row, index) {
      console.log("row", row, index);
      this.$emit("rowDel", row, index);
    },
  },
};
</script>

<style lang="scss" scoped></style>
