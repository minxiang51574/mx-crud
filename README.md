<!--
 * @Author: Mx
 * @Date: 2022-08-01 21:13:20
 * @Description: 
-->
# Vue后台管理系统—— 提升工作效率300%一键配置crud

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

## 三、搜索

## 四、操作栏设置

## 五、增删改查

## 六、配置接口

## 七、按钮自定义

## 八、列配置
