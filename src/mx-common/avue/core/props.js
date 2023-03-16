import { initVal } from './dataformat';
/**
 * 供各小组件混入
 */
export default function () {
  // column.props配置，字典的变量名
  const propsDefault = {
    id: 'id', 
    label: 'label',
    value: 'value',
    children: 'children',
    disabled: 'disabled'
  };
  // httpProps配置
  const propsHttpDefault = {
    name: 'name',
    url: 'url',
    res: ''
  };
  return {
    data() {
      return {
        text: undefined,
        propsHttpDefault: propsHttpDefault,
        propsDefault: propsDefault
      };
    },
    props: {
      blur: Function,
      focus: Function,
      change: Function,
      click: Function,
      clear: Function, // 目前只针对network有效
      input: Function, // 目前只针对文本框有效
      tpyeformat: Function,
      value: [Object, Array, Number, String],
      column: {
        type: Object,
        default: () => { }
      },
      typeslot: { //  是否启用模板插槽
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        default: ''
      },
      allowCreate: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: ''
      },
      tip: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      dataType: {
        type: String
      },
      clearable: {
        type: Boolean,
        default: true
      },
      type: {
        type: String,
        default: ''
      },
      dicUrl: {
        type: String,
        default: ''
      },
      dicMethod: {
        type: String,
        default: ''
      },
      dicQuery: {
        type: Object,
        default: () => {
          return {}
        }
      },
      dicHeaders: {
        type: Object,
        default: () => {
          return {}
        }
      },
      dic: {
        type: Array,
        default: () => {
          return [];
        }
      },
      placeholder: {
        type: String,
        default: ''
      },
      rules: {
        type: Array
      },
      min: {
        type: Number
      },
      max: {
        type: Number
      },
      multiple: {
        type: Boolean,
        default: false
      },
      row: {
        type: Boolean,
        default: false
      },
      prop: { //  变量名
        type: String,
        default: ''
      },
      border: { //  表格边框
        type: Boolean,
        default: false
      },
      hasAll: {
        type: Boolean,
        default: true
      },
      propsHttp: {
        type: Object,
        default: () => propsHttpDefault
      },
      props: {
        type: Object,
        default: () => propsDefault
      },
      pickerOptions: {
        type: Object,
        default: () => {}
      },
      selectDic: {
        type: Array,
        default: () => []
      }
    },
    watch: {
      value: {
        handler() {
          this.initVal(); // 监听并重新初始化数据
        },
        immediate: true
      }
    },
    computed: {
      required() {
        return !this.validatenull(this.rules);
      },
      isArray() {
        return this.dataType === 'array';
      },
      isString() {
        return this.dataType === 'string';
      },
      isNumber() {
        return this.dataType === 'number';
      },
      nameKey: function () {
        return this.propsHttp.name || this.propsHttpDefault.name;
      },
      urlKey: function () {
        return this.propsHttp.url || this.propsHttpDefault.url;
      },
      resKey: function () {
        return this.propsHttp.res || this.propsHttpDefault.res || this.props.res;
      },
      valueKey: function () {
        return this.props.value || this.propsDefault.value;
      },
      labelKey: function () {
        return this.props.label || this.propsDefault.label;
      },
      childrenKey: function () {
        return this.props.children || this.propsDefault.children;
      },
      disabledKey: function () {
        return this.props.disabled || this.propsDefault.disabled;
      },
      idKey: function () {
        return this.props.id || this.propsDefault.id;
      },
      valueObj: function () {
        return this.props.valueObj || false;
      }
    },
    created() { },
    methods: {
      initVal() {
        this.text = initVal({
          type: this.type,
          multiple: this.multiple,
          dataType: this.dataType,
          value: this.value
        });
        // console.log('-----------------------------');
        // console.log(this.type, this.value)
        // console.log('this.text', this.value)
      }
    }
  };
}
