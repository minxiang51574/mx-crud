import find from 'lodash/find'
/**
 * 供各小组件混入
 */
export default function () {
  return {
    methods: {
      // 获取焦点事件
      handleFocus() {
        const result = this.isString && this.multiple ? this.text.join(',') : this.text;
        typeof this.focus === 'function' && this.focus({ value: result, column: this.column })
      },
      // 失去焦点事件
      handleBlur() {
        const result = this.isString && this.multiple ? this.text.join(',') : this.text;
        typeof this.blur === 'function' && this.blur({ value: result, column: this.column })
      },
      // 点击事件
      handleClick() {
        const result = this.isString && this.multiple ? this.text.join(',') : this.text;
        if (typeof this.click === 'function') {
          this.click({ value: result, column: this.column });
        }
      },
      // 输入事件
      handleInput() {
        if (typeof this.input === 'function') {
          this.input({ value: this.text, column: this.column });
        }
      },
      // 变更事件
      handleChange(value) {
        let result = value;
        if ((this.isString || this.isNumber) && (this.multiple || ['checkbox', 'cascader', 'dynamic'].includes(this.type))) {
          result = value.join(',')
        }
        // 字段配置了change函数
        if (typeof this.change === 'function') {
          const result = (this.isString && this.multiple) ? value.join(',') : value;
          // 多选逻辑
          if (Array.isArray(result)) {
            const valueObj = []
            result.forEach((item) => {
              valueObj.push(find(this.netDic || this.dic, (o) => o[this.valueKey] === item))
            })
            this.change({ value: result, column: this.column, valueObj });
          } else {
            // 单选逻辑
            const valueObj = find(this.netDic, (o) => o[this.valueKey] === value);
            this.change({ value: result, column: this.column, valueObj, isSearch: this.isSearch });
          }
        }
        // 多选有"全部"选项逻辑
        if (this.multipleAll && this.multiple) {
          // 先选了All 再选其他 清除All保留其他
          if (value && value.length > 1 && value[0].multipleAll) {
            const result1 = value.filter((o) => o.multipleAll === undefined)
            this.$emit('input', result1);
            this.$emit('change', result1);
            return
          }
          // 先选了其他 再选All 清除其他保留All
          const all = value.filter((o) => o.multipleAll === true)
          if (!value[0].multipleAll && all.length) {
            this.$emit('input', all);
            this.$emit('change', all);
            return
          }
        } else {
          // 常规逻辑直接双向绑定值
          this.$emit('input', result);
          this.$emit('change', result);
        }
      },
      // 自定义选项文字
      getLabelText(item) {
        if (typeof this.tpyeformat === 'function') {
          return this.tpyeformat(item, this.labelKey, this.valueKey);
        }
        return item[this.labelKey]
      }
    },
    destroyed() {
      this.netDic = []
    }
  };
}
