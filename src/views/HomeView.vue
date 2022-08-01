<!--
 * @Author: Mx
 * @Date: 2022-08-01 21:12:59
 * @Description: 
-->
<template>
  <div class="home">
    <mx-crud :data="tableData" :option="listOption" :page.sync="page"></mx-crud>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      page: {
        total: 100,
        currentPage: 1,
        pageSize: 10,
      },
    };
  },
  computed: {
    listOption() {
      return {
        column: [
          {
            label: "日期",
            prop: "date",
          },
          {
            label: "姓名",
            prop: "name",
          },
          {
            label: "地址",
            prop: "address",
          },
        ],
      };
    },
  },
};
</script>
