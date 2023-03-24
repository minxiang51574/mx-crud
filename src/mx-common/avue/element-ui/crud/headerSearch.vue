<!--
 * @Author: Mx
 * @Date: 2022-09-04 16:49:20
 * @Description: 
-->
<template>
  <div class="table-search" ref="tableSearch">
    <el-form
      :class="b('search')"
      :model="searchForm"
      :inline="true"
      :label-position="config.labelPosition"
      ref="searchForm"
      @keyup.enter.native="searchChange"
    >
      <template v-for="(column, index) in $parent.searchOption">
        <el-form-item :key="index" :prop="column.prop">
          <!-- 自定义标签 -->
          <template slot="label">
            <span
              :title="column.label ? (column.labelAlias || column.label) + ' :' : ''"
              v-if="column.labelAlias || column.label"
              >{{ column.label ? (column.labelAlias || column.label) + " :" : "" }}</span
            >
          </template>
          <component
            v-model="searchForm[column.prop]"
            :ref="column.prop"
            :is="getSearchType(column.type)"
            :clearable="column.searchClearable"
            :defaultTime="
              column.searchDefaultTime || (column.more ? ['00:00:00', '23:59:59'] : '')
            "
            :disabled="column.searchDisabled"
            :dic="$parent.DIC[column.prop]"
            :filterable="column.searchFilterable"
            :editable="column.editable"
            :format="column.format"
            :multiple="
              config.searchMultiple.includes(column.type) &&
              vaildData(column.searchMmultiple, false)
            "
            :placeholder="column.searchPlaceholder || ''"
            :prop="column.prop"
            :props="column.props || $parent.tableOption.props"
            :size="$parent.controlSize"
            :type="getType(column)"
            :value-format="column.valueFormat"
            :tpyeformat="column.tpyeformat"
            :dicData="column.dicData"
            :pickerOptions="column.pickerOptions"
            :isSearch="true"
            :clear="column.clear"
            :maxlength="column.maxlength"
          ></component>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>
<script>
import config from "./config.js";
import { getSearchType, getType } from "../../utils";
import { formInitVal } from "../../core/dataformat";
import create from "../../core/create";
export default create({
  name: "crud",
  data() {
    return {
      config,
      searchForm: {},
    };
  },
  created() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      this.getSearchType = getSearchType;
      this.getType = getType;
      this.dataformat();
    },
    // 搜索回调
    searchChange() {
      this.$parent.$emit("search-change", this.searchForm);
    },
    // 搜索清空
    searchReset() {
      this.$refs["searchForm"].resetFields();
      this.$parent.$emit("search-reset");
    },
    // 过滤searchForm默认
    dataformat() {
      this.searchForm = this.deepClone(formInitVal(this.$parent.searchOption).searchForm);
    },
  },
});
</script>
<style scoped lang="scss"></style>
