
# Vue后台管理系统—— 提升工作效率300%一键配置crud
> 本文主要基于element-ui深度封装，旨在快速完成列表查询、增删改查、弹窗表单。可以看到下面示例中包含了 Vue2后台管理系统中日常基本功能，代码量却非常少，
可复用性非常高。
## 一、基础表格

![使用场景](./src/assets/1.png)

**主体**
```js
<mx-crud :data="tableData" :option="listOption"> </mx-crud>
```
<details>
    <summary><font color=0094ff>数据及配置</font></summary> 

```js
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

```
</details>

更新时间：2022/08/01

## 二、表格+分页
![使用场景](./src/assets/2.png)
**主体**
```js
 <mx-crud
      :data="tableData"
      :option="listOption"
      :page.sync="page"
      @size-change="changeSize"
      @current-change="currentChange"
></mx-crud>
```
<details>
    <summary><font color=0094ff>数据及配置</font></summary> 

```js

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

```
</details>

更新时间：2022/08/13

## 三、搜索


## 四、操作栏设置
更新时间：2022/08/14
## 五、增删改查

## 六、配置接口

## 七、按钮自定义

## 八、列配置
