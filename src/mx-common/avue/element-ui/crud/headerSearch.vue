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
            :is="getSearchType(column.searchType)"
            :clearable="column.searchClearable"
            :defaultTime="
              column.searchDefaultTime || (column.more ? ['00:00:00', '23:59:59'] : '')
            "
            :disabled="column.searchDisabled"
            :defaultExpandAll="column.defaultExpandAll"
            :dic="$parent.DIC[column.prop]"
            :filterable="column.searchFilterable"
            :selectDic="column.selectDic"
            :groupChildren="column.groupChildren"
            :filter-method="column.searchFilterMethod"
            :editable="column.editable"
            :format="column.format"
            :checkStrictly="column.searchCheckStrictly || column.checkStrictly"
            :change="column.change"
            :separator="column.separator"
            :showAllLevels="column.showAllLevels"
            :multiple="
              config.searchMultiple.includes(column.searchType) &&
              vaildData(column.searchMmultiple, false)
            "
            :parent="column.parent"
            :placeholder="column.searchPlaceholder || ''"
            :props="column.props || $parent.tableOption.props"
            :size="$parent.isMediumSize"
            :type="getType(column)"
            :tags="column.searchTags"
            :value-format="column.valueFormat"
            :tpyeformat="column.tpyeformat"
            :dicData="column.dicData"
            :dicQuery="column.dicQuery"
            :dicMethod="column.dicMethod"
            :dicHeaders="column.dicHeaders"
            :isLoadMore="column.isLoadMore"
            :dicQueryFormat="column.dicQueryFormat"
            :pickerOptions="column.pickerOptions"
            :isSearch="true"
            :hasAll="column.hasAll === false ? false : true"
            :useCurNetworkInfo="column.useCurNetworkInfo"
            :isAll="column.isAll"
            :treeQuery="column.treeQuery"
            :remoteQuery="column.remoteQuery"
            :filterData="column.filterData"
            :beforeClearAll="column.beforeClearAll"
            :treeUrl="column.treeUrl"
            :remoteUrl="column.remoteUrl"
            :useClearMessage="column.useClearMessage"
            :clearMessageInfo="column.clearMessageInfo"
            :beforeSelect="column.beforeSelect"
            :afterSelect="column.afterSelect"
            :valueDefaultYl="column.valueDefaultYl"
            :clear="column.clear"
            :input="column.input"
            :reserveKeyword="column.reserveKeyword"
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
      console.log(this.$parent);
      this.$parent.$emit("search-change", this.searchForm);
    },
    // 过滤searchForm默认
    dataformat() {
      this.searchForm = this.deepClone(formInitVal(this.$parent.searchOption).searchForm);
    },
  },
});
</script>
<style scoped lang="scss"></style>
