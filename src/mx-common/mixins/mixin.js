/*
 * @Author: Mx
 * @Date: 2023-03-22 10:09:58
 * @Description: 
 */
export default {
  data() {
    return {
      COM_HTTP: {},// 当前默认请求
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
    // 删除 - 提示弹窗
    rowDel(row, index){
      console.log(row,index);
      const delTipMsg = this.customDelMsg || this.delTipMsg || '确定删除该条数据'
      this.$confirm(delTipMsg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        // 开始删除
        this.deleteFun(row, index)
      }).catch(() => {         
      });
    },
    // 删除方法
    async deleteFun(item, index) {
      // 调接口
      console.log('item, index',item, index);
      // const res = await this.COM_HTTP.reqDel(item)
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
    },
    // 搜索清空
    resetList() {
      console.log('resetList');
    },

  },
};
