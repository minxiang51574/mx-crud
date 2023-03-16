<!--
 * @Author: Mx
 * @Date: 2023-03-16 17:40:18
 * @Description: Select
-->
<template>
  <div :class="b()">
    <el-select
      v-model="text"
      :loading="loading"
      :size="size"
      loading-text="查询中..."
      :multiple="multiple"
      :clearable="disabled ? false : clearable"
      :placeholder="placeholder"
      :multiple-limit="limit"
      :value-key="valueKey || 'id'"
      :disabled="disabled"
      @focus="handleFocus"
      @blur="handleBlur"
      @click.native="handleClick"
      @change="handleChange"
    >
      <el-option label="全部" :value="''" v-if="hasAll"></el-option>
      <el-option
        v-for="(item, index) in dicData"
        :key="index"
        :disabled="item[disabledKey]"
        :label="getLabelText(item)"
        :value="item[valueKey]"
      >
      </el-option>
    </el-select>
  </div>
</template>
<script>
import create from "../../core/create";
import props from "../../core/props.js";
import event from "../../core/event.js";
export default create({
  name: "select",
  mixins: [props(), event()],
  props: {
    value: [Object, Array, Number, String],
    //  下拉分组数据子集的key，分组时必传
    groupChildren: {
      type: String,
      default: "",
    },
    remote: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: Boolean,
      default: true,
    },
    allowCreate: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Number,
      default: 99,
    },
    filterable: {
      type: Boolean,
      default: false,
    },
    multipleAll: {
      type: Boolean,
      default: false,
    },
    isSearch: {
      type: Boolean,
      default: false,
    },
    useAlone: {
      type: Boolean,
      default: false,
    },
    reserveKeyword: {
      type: Boolean,
      default: true,
    },
    isLoadMore: {
      type: Boolean,
      default: false,
    },
    dicQueryFormat: {
      type: Function,
    },
    dicData: {
      type: Array,
    },
  },
  computed: {
    valueKey() {
      return this.props.value;
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {},
});
</script>
<style scoped lang="scss"></style>
