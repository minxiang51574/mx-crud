<!--
 * @Author: Mx
 * @Date: 2022-08-01 21:12:59
 * @Description: 
-->
<template>
  <div class="home">
    <mx-crud
      :data="tableList"
      :option="listOption"
      :page="page"
      :table-loading="loading"
      @size-change="sizeChange"
      @current-change="currentChange"
      @search-change="searchChange"
      @row-del="rowDel"
      @custom-add="rowCustomAdd"
      @custom-view="rowCustomView"
      @custom-edit="rowCustomEdit"
      @search-reset="resetList"
    >
      <template v-slot:zdy="{ row }">
        {{ row }}
      </template>
      <!-- 操作栏配置-自定义操作栏 -->
      <template #menu>
        <el-button type="primary" size="mini">menu插槽按钮</el-button>
      </template>
    </mx-crud>
  </div>
</template>

<script>
import mixin from "@/mx-common/mixins/mixin";
import { queryHomePageData } from "@/api";
export default {
  name: "HomeView",
  mixins: [mixin],
  data() {
    return {
      COM_HTTP: {
        //当前页面请求
        reqList: queryHomePageData,
      },
    };
  },
  computed: {
    listOption() {
      return {
        isShowmenu: true, // 操作栏配置-是否显示操作栏
        isViewBtn: true, // 操作栏配置-是否显示查看
        isEditBtn: true, // 操作栏配置-是否显示编辑
        isDelBtn: true, // 操作栏配置-是否显示删除
        exportBtn: true, // 操作栏配置-导出
        exportRecordBtn: true, // 操作栏配置-导出记录
        align: "center", // 表格列配置-对齐方式
        index: true, // 表格列配置-索引
        customAdd: true, // 自定义新增
        customView: true, // 自定义查看
        customEdit: false, // 自定义编辑
        titleAliasEdit: "自定义title",
        column: [
          {
            label: "姓名1",
            labelAlias: "自定义label别名", // 弹窗表单配置 - 自定义label别名
            prop: "name",
            search: true, // 表格列配置-是否搜索
            width: 200, // 表格列配置-宽度
          },
          {
            label: "自定义列",
            prop: "zdy",
            slot: true, // 表格列配置-自定义列
            viewDisplay: false, // 弹窗表单配置-查看是否显示
            editDisplay: false, // 弹窗表单配置-编辑是否显示
            addDisplay: false, // 弹窗表单配置-新增是否显示
          },
          {
            label: "多选框",
            prop: "selectType",
            // multiple: true,
            search: true,
            type: "select", // 搜索-定义类型
            dicData: [
              {
                label: "紧急公告",
                value: 1,
              },
              {
                label: "上线公告",
                value: 2,
              },
              {
                label: "业务公告",
                value: 3,
              },
            ],
            formatter: (row) => {
              // 表格列配置-筛选
              const map = new Map([
                [1, `紧急公告`],
                [2, `上线公告`],
                [3, `业务公告`],
              ]);
              return map.get(row.selectType);
            },
          },
          {
            label: "时间",
            prop: "date",
            search: true,
            type: "date", // 搜索-定义类型
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
          },
          {
            label: "状态formatter",
            prop: "status",
            viewDisplay: false, // 弹窗表单配置-查看是否显示
            editDisplay: false, // 弹窗表单配置-编辑是否显示
            addDisplay: false, // 弹窗表单配置-新增是否显示
            formatter: (row) => {
              // 表格列配置-筛选
              const map = new Map([
                [1, `<i class="class1"></i> 未开始`],
                [2, `<i class="class2"></i> 成功`],
                [3, `<i class="class3"></i> 已完成`],
              ]);
              return map.get(row.status);
            },
          },
          {
            label: "列隐藏",
            prop: "lyc",
            viewDisplay: false, // 弹窗表单配置-查看是否显示
            editDisplay: false, // 弹窗表单配置-编辑是否显示
            addDisplay: false, // 弹窗表单配置-新增是否显示
            hide: true, // 表格列配置-列隐藏
          },
          {
            label: "日期2",
            prop: "date2",
            hide: true,
            viewDisplay: false, // 弹窗表单配置-查看是否显示
            editDisplay: false, // 弹窗表单配置-编辑是否显示
            addDisplay: false, // 弹窗表单配置-新增是否显示
            align: "left", // 表格列配置-对齐方式
          },
          {
            label: "地址3",
            prop: "address",
            overHidden: true, // 表格列配置-内容超出隐藏
            width: 100, // 表格列配置-宽度
          },
        ],
      };
    },
  },
  methods: {
    /**
     * 自定义新增
     */
    rowCustomAdd() {
      console.log("自定义新增");
    },
    /**
     * 自定义查看
     */
    rowCustomView() {
      console.log("自定义查看");
    },
    /**
     * 自定义编辑
     */
    rowCustomEdit() {
      console.log("自定义编辑");
    },
  },
};
</script>
