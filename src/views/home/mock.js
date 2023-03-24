/*
 * @Author: Mx
 * @Date: 2023-03-24 11:27:14
 * @Description: mock
 */
import Mock from "mockjs";
import { successResponseWrap } from '@/utils';
let homePageDate = {
    total:10,
    current:1,
    results:[
        {
         date: "2016-05-02 00:00:00",
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
       }
    ]
}
console.log('homePageDate',homePageDate);
const { Random } = Mock;

const data = Mock.mock({
    'results|15': [
      {
        date: Random.date(),
        'name|4-8': /[A-Z]/,
        address: "深圳市南山区深南大道腾讯大厦",
        'status|1': [1, 2, 3],
        'selectType|1': [1, 2, 3],
      },
    ],
  });
  
/** 首页数据 */
Mock.mock(new RegExp('/api/homePageData'),(params) => {
    const { page = 1, size = 10 } = JSON.parse(params.body);
    const p = page ;
    const ps = size ;
        return successResponseWrap({
        total:15,
        current:1,
        results:data.results.slice((p - 1) * ps, p * ps)
    });
})