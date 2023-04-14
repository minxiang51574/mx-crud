# Vue2管理系统一键配置crud提升效率300%
> 本文主要基于element-ui深度封装，旨在快速完成列表查询、增删改查、弹窗表单。可以看到下面完整示例中包含了 Vue2后台管理系统中日常基本功能，代码量却非常少，可复用性非常高，6点下班美滋滋。

[github地址](https://github.com/minxiang51574/mx-crud) 不断更新维护，如果对你有帮助，帮忙加个star~
## 一、完整示例

![image1.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d3d73b60ca7a4a2aaa5b6e4af9f68dbc~tplv-k3u1fbpfcp-watermark.image?)
> 包含列表table、分页、搜索条件查询、新增、编辑、删除

``` html
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
      @search-reset="resetList">
      <template v-slot:zdy="{ row }">
        {{ row.id }}
      </template>
      <template v-slot:menu="{ row }"> menu插槽{{row}} </template>
</mx-crud>
```

```js
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
        ],
      };
    },
```
> [详情示例](https://github.com/minxiang51574/mx-crud/blob/main/src/views/home/HomeView.vue)

## 二、属性方法介绍
这些属性方法使用频率较高，方法和属性都是在组件里抛出，当我们需要某些功能和配置
时，添加即可

### Crud
| 参数  | 说 明   | 类型   | 默认值     |
| ------------------------- | ----------------------------------------------------------------------- | --------------- | ---------- |
| data | 列表数据 |  array |  |
| option | 表单配置项 参考Option配置 | object |  |
| page | 分页变量 参考Page参数 |  object |  |
| table-loading | 表格loading|  boolean | boolean |

### Option
| 参数  | 说 明   | 类型   | 默认值     |
| ------------------------- | ----------------------------------------------------------------------- | --------------- | ---------- |
| index | 是否有序号 |  boolean |  |
| align | 列表对齐方式 | string |  'center' |
| isShowmenu | 是否显示操作栏 |  boolean |  false |
| isViewBtn  | 是否显示查看按钮 |  boolean | false |
| isEditBtn  | 是否显示编辑按钮 |  boolean |  false|
| isDelBtn   | 是否显示删除按钮 |  boolean |  false|
| exportBtn  | 是否显示导出按钮 |  boolean |  |
| exportRecordBtn  | 是否显示导出记录按钮 |  boolean |  |
| customAdd  | 是否自定义新增回调 |  boolean |  |
| customView  | 是否自定义查看回调 |  boolean |  |
| customEdit  | 是否自定义编辑回调 |  boolean |  |
| titleAliasEdit  | 自定义新增编辑弹窗title |  string |  |

### Column属性

| 参数  | 说 明   | 类型   | 默认值     |
| ------------------------- | ----------------------------------------------------------------------- | --------------- | ---------- |
| label | 列标题 |  string |  |
| prop  | 列标题对应字段 |  string |  |
| width  | 对应列的宽度  |  string |  |
| search | 是否为搜索项   |  Boolean |  |
| rules | 弹窗表单校验规则   |  object |  |
| hide  | 列表项是否显示   |  Boolean | false |
| addDisplay  | 表单新增时项是否显示   |  Boolean |  |
| editDisplay  | 表单编辑时项是否显示   |  Boolean |  |
| viewDisplay  | 表单查看时项是否显示   |  Boolean |  |
| formatter  | 用来格式化列内容   |  function |  |
| dicData  | 数据字典值   |  array |  |

### Events
| 事件名称  | 说 明   | 类型   | 
| ------------------------- | ----------------------------------------------------------------------- | --------------- | 
| size-change | pageSize 改变时会触发 |  每页条数 |  
| current-change  | currentPage 改变时会触发 |  当前页 |  
| search-change  | 点击搜索触发该事件  |   |  
| search-reset  | 点击重置触发该事件   |   |  
| row-save | 新增数据确定触发该事件   |   |  
| row-update | 更新数据确定触发该事件   |   |  
| row-del  | 行数据删除时触发该事件   |   |  
| custom-add  | 自定义新增触发该事件  |   |  
| custom-edit | 自定义编辑触发该事件    |   |  
| custom-view | 自定义查看触发该事件    |   |  

## 三、搜索 & 分页

### 控制column是否搜索
> search变量控制列表项是否搜索
```js
listOption:{
    column: [{
        label: '姓名',
        prop: 'name',
        search:true, // 控制column是否搜索
    }]
}
```
### 搜索方法
> search-change:点击搜索触发该事件  search-reset: 点击重置触发该事件
```html
<mx-crud
    :data="tableList"
    :option="listOption"
    :page="page"
    :table-loading="loading"
    @search-change="searchChange"
    @search-reset="resetList">
</mx-crud>
```

### 自定义列搜索
> 配置searchslot为true即可开启自定义，列的prop加Search作为卡槽的名称

```html
<mx-crud :option="listOption" :data="tableList" >
     <!-- 搜索 自定义slot -->
      <template v-slot:ageSearch="{ column }"> {{ column.prop }} </template>
</mx-crud>

listOption:{
    column: [{
        label: "自定义列搜索",
        prop: "age",
        search: true,
        searchslot: true,
    }]
}
```
![image2.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0241d43f2ab94919a4c693afd9f5b65c~tplv-k3u1fbpfcp-watermark.image?)

### 页码和条数
> currentPage当前页码，total总条数，pageSize每页多少条数据

## 四、操作栏设置 & 表格列配置

### 操作栏隐藏 & 其他属性
> isShowmenu属性接受一个Boolean属性显示隐藏操作栏，默认为false
> menuWidth属性设置操作栏宽度

### 自定义操作栏
> menu为操作栏自定义
```html
<!-- 操作栏配置-自定义操作栏 -->
<template #menu="{ row }"> menu插槽 {{ row.name }}</template>
```

![image3.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6398b3342ee6481890423cf4188e5d49~tplv-k3u1fbpfcp-watermark.image?)

### 操作栏查看、编辑、删除按钮设置
> isViewBtn是否显示查看按钮,默认false;
> isEditBtn是否显示编辑按钮,默认false;
> isDelBtn 是否显示删除按钮,默认false;

### 列配置隐藏 & 其他属性
> hide属性接受一个Boolean属性显示隐藏表格列，默认为false
> width属性控制每列的宽度
> align属性控制每列的对齐方式
> overHidden设置true超出列表宽度内容以省略号显示

### 自定义列
> 设置列的属性slot为true时，在卡槽中用prop作为卡槽的名字即可
```html
<template v-slot:zdy="{ row }">
    {{ row.prop }}
</template>
{
  label: "自定义列",
  prop: "zdy",
  slot: true, // 表格列配置-自定义列
},
```

![image4.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa8a0d21fa8f427a8406e67dad6a0a17~tplv-k3u1fbpfcp-watermark.image?)

### 列内容格式化
> formatter方法格式化内容
```js
{
label: "状态formatter",
prop: "status",
formatter: (row) => {
    const map = new Map([
    [1, `<i class="class1"></i> 未开始`],
    [2, `<i class="class2"></i> 成功`],
    [3, `<i class="class3"></i> 已完成`],
     ]);
    return map.get(row.status);
 }
}
```

![image5.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c57b549abd20400b94c750d4cdc7b909~tplv-k3u1fbpfcp-watermark.image?)


## 五、顶部按钮 & 自定义回调
### 顶部按钮控制
> addBtn 属性设置是否显示新增按钮,默认true;
> 利用了menuLeft卡槽自定义顶部按钮

### 自定义回调
> customAdd 自定义新增回调
```js
<mx-crud
  ref="crud"
  :data="tableList"
  :option="listOption"
  @custom-add="rowCustomAdd">
</mx-crud>
listOption() {
  return {
      customAdd: true, // 自定义新增回调
  }
}
```
未设置时，默认打开新增弹窗表单；设置customAdd为ture时,增加custom-add回调,增加自定义处理。

> customEdit 自定义编辑回调
```js
<mx-crud
  ref="crud"
  :data="tableList"
  :option="listOption"
  @custom-edit="rowCustomEdit">
</mx-crud>
listOption() {
  return {
      customEdit: true, // 自定义编辑回调
  }
}
```
未设置时，默认打开编辑弹窗表单；设置customEdit为ture时,增加custom-edit回调,增加自定义处理。

> customView 自定义查看回调
```js
<mx-crud
  ref="crud"
  :data="tableList"
  :option="listOption"
  @custom-view="rowCustomView">
</mx-crud>
listOption() {
  return {
      customView: true, // 自定义查看回调
  }
}
```
未设置时，默认打开新增弹窗；设置customView为ture时,增加custom-view回调,增加自定义处理。


## 六、提取Mixins & 增删改查封装

### 公共Mixins
> 提取公共Mixins,减少各个业务页面重复代码，包含page、tableList、loading属性，sizeChange、currentChange、增删改查方法等。自此业务开发时，只需要配置对应的option，及crud接口即可完成基本业务开发，效率提升杠杠的，重复低质的工作大幅度较少。

### 配置接口 & 增删改查封装
crud逻辑相对固定，抽取到mixin做相应封装处理。业务页面配置接口，mixin中调用
```js
  mixins: [mixin],
  data() {
    return {
      COM_HTTP: {  // 配置接口
        reqList: queryHomePageData, // 列表查询
        reqDel: deleteHomePageData, //删除
        reqAdd: addHomePageData, //新增
        reqUpdate: updateHomePageData, //编辑
      }
    }
  }
```
### 完整mixins
> [详情](https://github.com/minxiang51574/mx-crud/tree/main/packages/src/mixins)
```js
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
```

## 七、其他功能 & 后续

整个基本查询、列表、分页增删改查已基本完成。当然功能没有面面俱到，如很多table的属性配置和方法，到组件源码中增加对应的配置即可
如需请留言我会补上你所需的功能场景。后续：逐步完善功能，如果有人看，继续封装一个Vue3版本。

### 引入方法
初步发布了一个npm包，大家可下载使用，更建议下载整个项目，结合示例看懂源码
```js
// 组件库
import mxCrud from "mx-crud";
import 'mx-crud/lib/mx-crud.css';
// 调试或者自定义crud
// import mxCrud from "../packages/src/index";
```


## 八、最后
我更推荐的是屏幕前的你看懂封装的思路，几年前的我初次使用和浏览时，直呼666，算是小开了眼界；整个代码量不是很大，逻辑也比较简单，一两把游戏的时间足已；看懂之后增加日常业务开发需求的功能，信手拈来。将整体完全消化吸收，逐步拓展成公司组件库，妥妥的KPI，提高整体前端的开发效率。

[github地址](https://github.com/minxiang51574/mx-crud) 不断更新维护，如果对你有帮助，帮忙加个star~

