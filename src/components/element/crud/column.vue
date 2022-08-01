<!--
 * @Author: your name
 * @Date: 2020-12-12 14:45:39
 * @Description: In User Settings Edit
-->
<template>
  <div>
    <template v-for="(column, index) in columnOption">
      <template>
        <el-table-column
          :key="`col_${index}`"
          :prop="column.prop"
          :label="column.label"
        >
        </el-table-column>
      </template>
    </template>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "mx-column",
  props: {
    columnOption: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
