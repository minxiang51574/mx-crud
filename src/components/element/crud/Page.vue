<!--
 * @Author: Mx
 * @Date: 2022-08-01 22:28:44
 * @Description: 
-->
<template>
  <div>
    <el-pagination
      element-loading-spinner="el-icon-loading"
      element-loading-text="页码数据加载中..."
      :current-page.sync="defaultPage.currentPage"
      :page-size="defaultPage.pageSize"
      :page-sizes="defaultPage.pageSizes"
      @size-change="sizeChange"
      @current-change="currentChange"
      layout="total, sizes, prev, pager, next, jumper"
      :total="defaultPage.total"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: "mx-page",
  data() {
    return {
      defaultPage: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
        pageSizes: [10, 20, 30, 40, 50, 100],
        background: true, // 背景颜色
      },
    };
  },
  methods: {
    // pageSize 改变
    sizeChange(val) {
      this.defaultPage.currentPage = 1;
      this.defaultPage.pageSize = val;
    },
    // currentPage 改变
    currentChange() {},
  },
};
</script>
<style scoped lang="scss"></style>
