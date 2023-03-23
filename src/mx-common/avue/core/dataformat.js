/*
 * @Author: Mx
 * @Date: 2023-03-16 10:08:57
 * @Description: 
 */
import { validatenull } from '../utils';
/**
* 日期控件集合
*/
export const dateList = [
  'dates',
  'date',
  'datetime',
  'datetimerange',
  'daterange',
  'week',
  'month',
  'dategrpup',
  'year'
];
/**
 * 初始化数据格式
 * value变化时调用
 * 当特殊组件的value变化时，格式化为期望的 string[]、number[]
 */
export const initVal = ({ type, multiple, dataType, value }) => {
  if (
    (['select', 'tree'].includes(type) && multiple) ||
    ['checkbox'].includes(type)
  ) {
    if (Array.isArray(value)) return value;
    else if (!validatenull(value)) {
      const list = (value || '').split(',') || [];
      if (dataType === 'number') {
        return list.map(ele => Number(ele));
      } else {
        return list;
      }
    } else {
      return [];
    }
  }
  return value;
};



/**
 * 表格初始化值
 */
export const formInitVal = (list = []) => {
  const tableForm = {};
  const searchForm = {};
  list.forEach(ele => {
    if (
      ele.type === 'checkbox' ||
      ele.type === 'cascader' ||
      ele.type === 'dynamic' ||
      ele.type === 'dates' ||
      (ele.type === 'upload' && ele.listType !== 'picture-img') ||
      ele.multiple ||
      ele.range ||
      ele.dataType === 'array'
    ) {
      tableForm[ele.prop] = [];
      if (ele.search) searchForm[ele.prop] = [];
    } else if (
      ['number', 'rate', 'silder'].includes(ele.type) ||
      ele.dataType === 'number'
    ) {
      tableForm[ele.prop] = 0;
      if (ele.search) {
        searchForm[ele.prop] = 0;
      }
    } else {
      tableForm[ele.prop] = '';
      if (ele.search) {
        searchForm[ele.prop] = '';
      }
    }
    // 表单默认值设置
    if (!validatenull(ele.valueDefault)) tableForm[ele.prop] = ele.valueDefault;
    // 搜索表单默认值设置
    if (!validatenull(ele.searchDefault)) {
      searchForm[ele.prop] = ele.searchDefault;
    }
  });
  return {
    tableForm,
    searchForm
  };
};
