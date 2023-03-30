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
      @row-save="addFun"
      @row-update="updateFun"
      @row-del="rowDel"
      @custom-add="rowCustomAdd"
      @custom-view="rowCustomView"
      @custom-edit="rowCustomEdit"
      @search-reset="resetList"
    >
      <template v-slot:zdy="{ row }">
        {{ row.id }}
      </template>
      <!-- 搜索 自定义slot -->
      <template v-slot:ageSearch="{ column }"> {{ column.prop }} </template>
      <!-- 操作栏配置-自定义操作栏 -->
      <template #menu="{ row }"> menu插槽 {{ row.name }}</template>
    </mx-crud>
  </div>
</template>

<script>
import mixin from "@/mx-common/mixins/mixin";
import {
  queryHomePageData,
  deleteHomePageData,
  addHomePageData,
  updateHomePageData,
} from "@/api";
export default {
  name: "HomeView",
  mixins: [mixin],
  data() {
    return {
      COM_HTTP: {
        //当前页面请求
        reqList: queryHomePageData, // 列表查询
        reqDel: deleteHomePageData, //删除
        reqAdd: addHomePageData, //新增
        reqUpdate: updateHomePageData, //编辑
      },
    };
  },
  computed: {
    listOption() {
      return {
        isShowmenu: true, // 操作栏配置-是否显示操作栏
        menuWidth: 300, // 操作栏宽度
        isViewBtn: true, // 操作栏配置-是否显示查看
        isEditBtn: true, // 操作栏配置-是否显示编辑
        isDelBtn: true, // 操作栏配置-是否显示删除
        exportBtn: true, // 操作栏配置-导出
        exportRecordBtn: true, // 操作栏配置-导出记录
        align: "center", // 表格列配置-对齐方式
        index: true, // 表格列配置-索引
        customAdd: false, // 自定义新增
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
            rules: {
              required: true,
              message: "请输入",
              trigger: ["blur", "change"],
            },
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
            rules: {
              required: true,
              message: "请选择",
              trigger: ["blur", "change"],
            },
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
            rules: {
              required: true,
              message: "请选择",
              trigger: ["blur", "change"],
            },
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
            rules: {
              required: true,
              message: "请输入",
              trigger: ["blur", "change"],
            },
          },
          {
            label: "自定义列搜索",
            prop: "age",
            search: true,
            searchslot: true,
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
