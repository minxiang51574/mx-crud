/*
 * @Author: Mx
 * @Date: 2023-03-22 10:09:58
 * @Description: mixins
 */
import { RESPONSE_CODE } from '../core/constant';
export default {
  data() {
    return {
      COM_HTTP: {}, // 当前默认请求
      tableList: [], // 表格列表数据
      loading: false, // 加载控制
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },
  mounted() {
    this.searchFun();
  },
  methods: {
    // 选择分页条数
    sizeChange(val) {
      this.page.currentPage = 1;
      this.page.pageSize = val;
      this.searchFun();
    },
    // 跳转页码
    currentChange(val) {
      this.page.currentPage = val;
      this.searchFun();
    },
    // 触发按钮查询
    searchChange(params) {
      this.searchFun(params, 1);
    },
    /** 查询方法 */
    async searchFun(params, currentPage) {
      this.loading = true;
      // 传入参数有current
      if (currentPage) {
        this.page.currentPage = currentPage;
      }
      const filnalParams = this.searchFunParamsHandle(params);
      console.log('最后的请求参数filnalParams:', filnalParams);
      const { data: res } = await this.COM_HTTP.reqList(filnalParams);
      // 没做axios数据拦截 多一层结构
      if (res.code === RESPONSE_CODE.SUCCESS) {
        this.tableList = res.data.results || [];
        this.page.total = res.data.total || 0;
        this.page.currentPage = res.data.currentPage || 1;
      } else {
        this.$message.error(res.msg);
      }
      this.loading = false;
    },
    /** 列表查询参数处理 */
    searchFunParamsHandle(params) {
      let filnalParams = Object.assign(
        { page: this.page.currentPage, pageSize: this.page.pageSize },
        params
      );
      return filnalParams;
    },
    // 删除 - 提示弹窗
    rowDel(row, index) {
      const delTipMsg =
        this.customDelMsg || this.delTipMsg || '确定删除该条数据?';
      this.$confirm(delTipMsg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning',
      })
        .then(() => {
          // 开始删除
          this.deleteFun(row, index);
        })
        .catch(() => {});
    },
    /**
     * 增加方法
     * @param {*} item  新增数据
     * @param {*} doneCallback  执行完成回调
     */
    async addFun(item, doneCallback){
      const { data: res } = await this.COM_HTTP.reqAdd(item)
      // 没做axios数据拦截 多一层结构
        if (res.code === RESPONSE_CODE.SUCCESS) {
            this.$message.success('新增成功')
            this.searchFun()
            doneCallback()
        } else {
          this.$message.error(res.msg);
        }
    },
    /**
     * 编辑更新方法
     * @param {*} item  新增数据
     * @param {*} doneCallback  执行完成回调
     */
    async updateFun(item, doneCallback){
      const { data: res } = await this.COM_HTTP.reqUpdate(item)
      // 没做axios数据拦截 多一层结构
        if (res.code === RESPONSE_CODE.SUCCESS) {
            this.$message.success('新增成功')
            this.searchFun()
            doneCallback()
        } else {
          this.$message.error(res.msg);
        }
    },
    // 删除方法
    async deleteFun(item) {
      // 调接口
      const { data: res } = await this.COM_HTTP.reqDel(item)
       // 没做axios数据拦截 多一层结构
      if (res.code === RESPONSE_CODE.SUCCESS) {
        this.$message.success('删除成功')
      } else {
        this.$message.error(res.msg);
      }
   
    },
    // 搜索清空
    resetList() {
      console.log('resetList');
    },
  },
};
