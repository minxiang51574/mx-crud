<template>
  <div :class="b()">
    <!-- 序号 -->
    <el-table-column
      v-if="vaildData(tableOption.index, false)"
      type="index"
      width="60"
      :fixed="vaildData(tableOption.indexFixed, 'left')"
      align="center"
      :label="tableOption.indexLabel || config.indexLabel"
    >
    </el-table-column>

    <!-- 占位列解决ele固定列导致列表顺序错乱 -->
    <el-table-column
      width="1px"
      v-show="false"
      class-name="hidden-column"
    ></el-table-column>
    <!--表格所有列-->

    <el-table-column
      :key="index"
      :prop="column.prop"
      :label="column.label"
      :align="column.align || tableOption.align"
      :width="column.width"
      :show-overflow-tooltip="column.overHidden"
      v-for="(column, index) in tableColumn"
    >
      <template v-slot="scope">
        <slot :row="scope.row" :name="column.prop" v-if="column.slot"></slot>
        <template v-else>
          <span v-html="handleDetail(scope.row, column)"></span>
        </template>
      </template>
    </el-table-column>

    <!-- 操作列 -->
    <el-table-column
      fixed="right"
      label="操作"
      :width="vaildData(tableOption.menuWidth, config.menuWidth)"
      v-if="vaildData(tableOption.isShowmenu, config.isShowmenu)"
    >
      <template v-slot="{ row, $index }">
        <!-- 查看按钮 -->
        <el-button
          type="text"
          @click="rowView(row, $index)"
          v-if="vaildData(tableOption.isViewBtn, config.isViewBtn)"
          >查看</el-button
        >
        <!-- 编辑按钮 -->
        <el-button
          type="text"
          @click="rowEdit(row, $index)"
          v-if="vaildData(tableOption.isEditBtn, config.isEditBtn)"
          >编辑</el-button
        >
        <!-- 删除按钮 -->
        <el-button
          type="text"
          @click="rowDel(row, $index)"
          v-if="vaildData(tableOption.isDelBtn, config.isDelBtn)"
          >删除</el-button
        >
        <slot name="menu" :row="row"></slot>
      </template>
    </el-table-column>
  </div>
</template>

<script type="text/javascript">
import create from "../../core/create";
import config from "./config.js";
export default create({
  name: "column",
  props: {
    tableColumn: {
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
      config,
    };
  },
  methods: {
    // 查看
    rowView(row, index) {
      if (this.tableOption.customView) {
        // 自定义查看
        this.$emit("custom-view", row, index);
      } else {
        // 默认查看
        this.$emit("row-view", row, index);
      }
    },
    // 编辑
    rowEdit(row, index) {
      if (this.tableOption.customEdit) {
        // 自定义编辑
        this.$emit("custom-edit", row, index);
      } else {
        // 默认查看
        this.$emit("row-edit", row, index);
      }
    },
    // 删除
    rowDel(row, index) {
      this.$emit("row-del", row, index);
    },
    /*
     *@Description: 处理文字
     */
    handleDetail(row, column) {
      // 自定义的格式化函数
      if (typeof column.formatter === "function") {
        return this.getValue(column.formatter(row));
      }
      return this.getValue(row[column.prop]);
    },
    getValue(data) {
      return this.validatenull(data) ? "--" : data;
    },
  },
});
</script>

<style lang="scss" scoped></style>
