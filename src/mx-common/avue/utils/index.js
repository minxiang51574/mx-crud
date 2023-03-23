/**
 * 对象深拷贝
 */
import { COMPONENTNAME } from "../core/constant";

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
  return COMPONENTNAME + result;
};

/**
 * 动态获取组件
 */
export const getComponent = (type, component) => {
  // 原avue组件
  let result = "input";
  if (!validatenull(component)) {
    result = component;
  } else if (type === "select") {
    result = "select";
  } else if (type === "radio") {
    result = "radio";
  } else if (type === "checkbox") {
    result = "checkbox";
  } else if (["time", "timerange"].includes(type)) {
    result = "time";
  } else if (
    [
      "dates",
      "date",
      "datetime",
      "datetimerange",
      "daterange",
      "week",
      "month",
      "dategrpup",
      "year",
    ].includes(type)
  ) {
    result = "date";
  } else if (type === "cascader") {
    result = "cascader";
  } else if (type === "number") {
    result = "input-number";
  } else if (type === "password") {
    result = "input";
  } else if (type === "switch") {
    result = "switch";
  } else if (type === "rate") {
    result = "rate";
  } else if (type === "upload") {
    result = "upload";
  } else if (type === "silder") {
    result = "silder";
  }
  return COMPONENTNAME + result;
};

/**
 * 获取动态组件ttpe
 */
export const getType = (column) => {
  const searchType = column.searchType;
  return searchType;
};

/**
 * 设置px
 */
export const setPx = (val, defval = "") => {
  if (validatenull(val)) val = defval;
  if (validatenull(val)) return "";
  val = val + "";
  if (val.indexOf("%") === -1) {
    val = val + "px";
  }
  return val;
};
