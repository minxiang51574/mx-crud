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
  created() {
    // 初始化分页
    this.pageInit();
  },
  methods: {
    // 初始化
    pageInit() {
      this.defaultPage.total = this.$parent.page.total || 0;
      this.defaultPage.currentPage = this.$parent.page.current || 1;
      this.defaultPage.pageSize = this.$parent.page.size || 10;
      this.defaultPage.pageSizes = this.$parent.page.sizes || [
        10, 20, 30, 40, 50, 100,
      ];
      this.defaultPage.background = this.$parent.page.background || true;
    },
    // pageSize 改变
    sizeChange(val) {
      this.defaultPage.currentPage = 1;
      this.defaultPage.pageSize = val;
      this.$parent.$emit("size-change", val);
    },
    // currentPage 改变
    currentChange(val) {
      this.$parent.$emit("current-change", val);
    },
  },
};
</script>
<style scoped lang="scss">
.el-pagination {
  text-align: right;
}
</style>
