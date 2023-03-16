export default {
  data() {
    return {
      page: {
        current: 1,
        size: 20,
        total: 0,
      },
    };
  },
  methods: {
    // 选择分页条数
    sizeChange(val) {
      this.page.current = 1;
      this.page.size = val;
      this.searchFun();
    },
    // 跳转页码
    currentChange(val) {
      this.page.current = val;
      this.searchFun();
    },
    // 触发按钮查询
    searchChange(params) {
      this.searchFun(params, 1);
    },
    // 查询方法
    async searchFun(params, currentPage) {
      this.loading = true;
      // 传入参数有current
      if (currentPage) {
        this.page.currentPage = currentPage;
      }
      const filnalParams = this.searchFunParamsHandle(params);
      console.log('最后的请求参数filnalParams:', filnalParams);
    },
    // 列表查询参数处理
    searchFunParamsHandle(params) {
      let filnalParams = Object.assign(
        { page: this.page.current, size: this.page.size },
        params
      );
      return filnalParams;
    },
  },
};
