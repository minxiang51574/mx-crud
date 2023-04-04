<!--
 * @Author: Mx
 * @Date: 2022-08-01 22:28:44
 * @Description: 
-->
<template>
  <div :class="b('pagination')">
    <el-pagination
      element-loading-spinner="el-icon-loading"
      element-loading-text="页码数据加载中..."
      :current-page.sync="defaultPage.current"
      :page-size="defaultPage.pageSize"
      :page-sizes="defaultPage.sizes"
      @size-change="sizeChange"
      @current-change="currentChange"
      layout="total, sizes, prev, pager, next, jumper"
      :total="defaultPage.total"
    ></el-pagination>
  </div>
</template>
<script>
import create from '../../core/create';
export default create({
  name: 'page',
  data() {
    return {
      defaultPage: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
        sizes: [10, 20, 30, 40, 50, 100],
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
      this.defaultPage.pageSize = this.$parent.page.pageSize || 10;
      this.defaultPage.sizes = this.$parent.page.sizes || [
        10, 20, 30, 40, 50, 100,
      ];
      this.defaultPage.background = this.$parent.page.background || true;
    },
    // 选择分页条数
    sizeChange(val) {
      this.defaultPage.currentPage = 1;
      this.defaultPage.pageSize = val;
      this.$parent.$emit('size-change', val);
    },
    // 跳转页码
    currentChange(val) {
      this.$parent.$emit('current-change', val);
    },
  },
});
</script>
<style scoped lang="scss">
.el-pagination {
  text-align: right;
}
</style>
