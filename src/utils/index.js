/*
 * @Author: Mx
 * @Date: 2022-08-14 21:12:36
 * @Description:
 */
/**
 * 对象深拷贝
 */
export const deepClone = (data) => {
  var type = getObjType(data);
  var obj;
  if (type === "array") {
    obj = [];
  } else if (type === "object") {
    obj = {};
  } else {
    // 不再具有下一层次
    return data;
  }
  if (type === "array") {
    for (var i = 0, len = data.length; i < len; i++) {
      delete data[i].$parent;
      obj.push(deepClone(data[i]));
    }
  } else if (type === "object") {
    for (var key in data) {
      delete data.$parent;
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
};

/*
 *@Description: 变量类型判断
 */
export const getObjType = (obj) => {
  var toString = Object.prototype.toString;
  var map = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object",
  };
  if (obj instanceof Element) {
    return "element";
  }
  return map[toString.call(obj)];
};

/*
 *@Description: 检测真值 不为真 返回默认值
 */
export const vaildData = (val, dafult) => {
  // console.log('vaildData')
  if (typeof val === "boolean") {
    return val;
  }
  return !validatenull(val) ? val : dafult;
};

/*
 *@Description: 判断是否为空
 *@param {arg} any
 *@return [type] 空值返回真 其他返回假
 */
export function validatenull(val) {
  if (typeof val === "boolean") {
    return false;
  }
  if (typeof val === "number") {
    return false;
  }
  if (val instanceof Array) {
    if (val.length === 0) return true;
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === "{}") return true;
  } else {
    if (
      val === "null" ||
      val == null ||
      val === "undefined" ||
      val === undefined ||
      val === ""
    ) {
      return true;
    }
    return false;
  }
  return false;
}
/**
 * 日期控件集合
 */
export const dateList = [
  "dates",
  "date",
  "datetime",
  "datetimerange",
  "daterange",
  "week",
  "month",
  "dategrpup",
  "year",
];
/**
 * 搜索框获取动态组件
 */
export const getSearchType = (type) => {
  console.log("111", type);

  // yl新组件
  if (type && type.includes("yl-")) return type.replace("yl-", "");
  // 原avue组件
  let result = "input";
  if (["select", "radio", "checkbox", "switch"].includes(type)) {
    result = "select";
  } else if (["time", "timerange"].includes(type)) {
    result = "time";
  } else if (dateList.includes(type)) {
    result = "date";
  } else if (["cascader"].includes(type)) {
    result = "cascader";
  } else if (["number"].includes(type)) {
    result = "input-number";
  } else if (type === "network") {
    result = "network";
  } else if (type === "dimension") {
    result = "dimension";
  }
  return "mx-" + result;
};
