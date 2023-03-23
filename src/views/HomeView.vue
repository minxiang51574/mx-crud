<!--
 * @Author: Mx
 * @Date: 2022-08-01 21:12:59
 * @Description: 
-->
<template>
  <div class="home">
    <mx-crud
      :data="tableData"
      :option="listOption"
      :page.sync="page"
      @size-change="sizeChange"
      @current-change="currentChange"
      @search-change="searchChange"
      @row-del="rowDel"
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
export default {
  name: "HomeView",
  mixins: [mixin],
  data() {
    return {
      tableData: [],
    };
  },
  computed: {
    listOption() {
      return {
        isShowmenu: true, // 操作栏配置-是否显示操作栏
        isViewBtn: true, // 操作栏配置-是否显示查看
        isEditBtn: true, // 操作栏配置-是否显示编辑
        isDelBtn: true, // 操作栏配置-是否显示删除
        align: "center", // 表格列配置-对齐方式
        index: true, // 表格列配置-索引
        column: [
          {
            label: "姓名1",
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
          },
          {
            label: "多选框",
            prop: "selectType",
            // multiple: true,
            search: true,
            searchType: "select", // 搜索-定义类型
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
                [0, `紧急公告`],
                [1, `上线公告`],
                [2, `业务公告`],
              ]);
              return map.get(row.selectType);
            },
          },
          {
            label: "时间",
            prop: "date",
            hide: true,
            search: true,
            searchType: "date", // 搜索-定义类型
          },
          {
            label: "状态formatter",
            prop: "status",
            viewDisplay: false, // 弹窗表单配置-查看是否显示
            editDisplay: false, // 弹窗表单配置-编辑是否显示
            formatter: (row) => {
              // 表格列配置-筛选
              const map = new Map([
                [0, `<i class="class1"></i> 未开始`],
                [1, `<i class="class2"></i> 成功`],
                [2, `<i class="class3"></i> 已完成`],
              ]);
              return map.get(row.status);
            },
          },
          {
            label: "列隐藏",
            prop: "lyc",
            viewDisplay: false, // 弹窗表单配置-查看是否显示
            editDisplay: false, // 弹窗表单配置-编辑是否显示
            hide: true, // 表格列配置-列隐藏
          },
          {
            label: "日期2",
            prop: "date2",
            viewDisplay: false, // 弹窗表单配置-查看是否显示
            editDisplay: false, // 弹窗表单配置-编辑是否显示
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
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.tableData = [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          status: 0,
          selectType: 1,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          status: 1,
          selectType: 2,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          status: 1,
          selectType: 3,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          status: 2,
          selectType: 2,
        },
      ];
      this.page.total = this.tableData.length;
    },
  },
};
</script>
