/*
 * @Author: Mx
 * @Date: 2023-03-24 11:27:14
 * @Description: mock
 */
import Mock from 'mockjs';
import { successResponseWrap } from '@/utils';
let homePageDate = {
  total: 10,
  currentPage: 1,
  results: [
    {
      date: '2016-05-02 00:00:00',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
      status: 0,
      selectType: 1,
    },
    {
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄',
      status: 1,
      selectType: 2,
    },
    {
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄',
      status: 1,
      selectType: 3,
    },
    {
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄',
      status: 2,
      selectType: 2,
    },
  ],
};
console.log('homePageDate', homePageDate);
const { Random } = Mock;

const data = Mock.mock({
  'results|15': [
    {
      id: '@increment(1)',
      date: Random.date(),
      'name|4-8': /[A-Z]/,
      address: '深圳市南山区深南大道腾讯大厦',
      'status|1': [1, 2, 3],
      'selectType|1': [1, 2, 3],
    },
  ],
});

/** 首页数据 */
Mock.mock(new RegExp('/api/homePageData'), (params) => {
  const { currentPage = 1, pageSize = 10 } = JSON.parse(params.body);
  const p = currentPage;
  const ps = pageSize;
  return successResponseWrap({
    total: 15,
    currentPage: currentPage || 1,
    results: data.results.slice((p - 1) * ps, p * ps),
  });
});
/** 删除数据 */
Mock.mock(new RegExp('/api/deleteData'), (params) => {
  const { id } = JSON.parse(params.body);
  console.log('id',id);
  // 数据库拿到id做对应的逻辑删除
  return successResponseWrap({
    data:true
  });
});

/** 新增数据 */
Mock.mock(new RegExp('/api/addHomePageData'), (params) => {
  const data = JSON.parse(params.body);
  console.log('新增数据',data);
  // 数据库拿到数据做对应的添加
  return successResponseWrap({
    data:true
  });
});

/** 编辑数据 */
Mock.mock(new RegExp('/api/updateHomePageData'), (params) => {
  const data = JSON.parse(params.body);
  console.log('编辑数据',data);
  // 数据库拿到数据做对应的添加
  return successResponseWrap({
    data:true
  });
});