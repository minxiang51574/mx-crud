<!--
 * @Author: Mx
 * @Date: 2023-03-16 20:41:50
 * @Description: 日期时间组件
-->
<template>
  <div :class="b()">
    <el-date-picker
      :type="type"
      v-model="text"
      :size="size"
      placement="bottom-start"
      :readonly="readonly"
      range-separator="至"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
      :format="type === 'week' ? 'yyyy 第 WW 周' : format"
      :clearable="disabled ? false : clearable"
      :picker-options="pickerOptions"
      :value-format="valueFormat"
      :default-time="defaultTime"
      :placeholder="placeholder"
      :editable="editable"
      @change="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
      @click.native="handleClick"
      :disabled="disabled"
    >
    </el-date-picker>
  </div>
</template>
<script>
import create from "../../core/create";
import props from "../../core/props.js";
import event from "../../core/event.js";
export default create({
  name: "date",
  mixins: [props(), event()],
  data() {
    return {
      text: "",
    };
  },
  props: {
    default: {
      type: Boolean,
      default: false,
    },
    value: {},
    startPlaceholder: {
      type: String,
      default() {
        return "开始日期";
      },
    },
    endPlaceholder: {
      type: String,
      default() {
        return "结束日期";
      },
    },
    defaultTime: {
      type: [Array, String],
    },
    pickerOptions: {
      type: Object,
      default: () => {},
    },
    type: {
      type: String,
      default: "date",
    },
    valueFormat: {
      type: String,
      default: "yyyy-MM-dd HH:mm:ss",
    },
    format: {},
    editable: {
      type: Boolean,
      default: true,
    },
  },
  methods: {},
});
</script>
<style scoped lang="scss"></style>
