<template>
  <div :class="b()">
    <el-input
      :size="size"
      :clearable="disabled ? false : clearable"
      v-model="text"
      @click.native="handleClick"
      :type="typeParam"
      :maxlength="maxlength"
      :minlength="minlength"
      :autosize="{ minRows: minRows, maxRows: maxRows }"
      :prefix-icon="prefixIcon"
      :suffix-icon="suffixIcon"
      :readonly="readonly"
      :placeholder="placeholder"
      :show-word-limit="showWordLimit"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
      :disabled="disabled"
      :autocomplete="autocomplete"
    >
      <template slot="prepend" v-if="prepend"
        ><span @click="prependClick()">{{ prepend }}</span></template
      >
      <template slot="append" v-if="append"
        ><span @click="appendClick()">{{ append }}</span></template
      >
    </el-input>
  </div>
</template>

<script>
import create from "../../core/create";
import props from "../../core/props.js";
import event from "../../core/event.js";
import { validatenull } from "../../utils";
export default create({
  name: "input",
  mixins: [props(), event()],
  data() {
    return {
      treeStyle: {
        left: 0,
        top: 0,
      },
      filterText: "",
      box: false,
      labelText: this.multiple ? [] : "",
    };
  },
  props: {
    nodeClick: Function,
    checked: Function,
    value: {},
    showWordLimit: {
      type: Boolean,
      default: false,
    },
    filter: {
      type: Boolean,
      default: true,
    },
    checkStrictly: {
      type: Boolean,
      default: false,
    },
    accordion: {
      type: Boolean,
      default: false,
    },
    parent: {
      type: Boolean,
      default: true,
    },
    defaultExpandAll: {
      type: Boolean,
      default: true,
    },
    prefixIcon: {
      type: String,
    },
    suffixIcon: {
      type: String,
    },
    prependClick: {
      type: Function,
      default: () => {},
    },
    prepend: {
      type: String,
    },
    appendClick: {
      type: Function,
      default: () => {},
    },
    append: {
      type: String,
    },
    minlength: {
      type: Number,
    },
    maxlength: {
      type: Number,
    },
    minRows: {
      type: Number,
      default: 5,
    },
    maxRows: {
      type: Number,
      default: 10,
    },
    autocomplete: {
      type: String,
    },
  },
  watch: {
    text: {
      handler() {
        this.handleChange(this.text);
      },
      immediate: true,
    },
    value() {
      this.initVal();
      this.init();
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  computed: {
    dicList() {
      function addParent(result, parent) {
        result.forEach((ele) => {
          const children = ele.children;
          if (children) {
            addParent(children, ele);
          }
          if (parent) {
            ele.$parent = parent;
          }
        });
      }
      const list = this.dic;
      addParent(list);
      return list;
    },
    keysList() {
      return this.multiple ? this.text : [];
    },
    isTree() {
      return this.type === "tree";
    },
    labelShow() {
      return this.multiple
        ? (this.labelText || []).join(" | ").toString()
        : this.labelText;
    },
    textShow() {
      if (this.textLen === 11) {
        return `${this.text.substr(0, 3)} ${this.text.substr(3, 4)} ${this.text.substr(
          7,
          4
        )}`;
      }
      return this.text;
    },
    textLen() {
      return (this.text || "").length || 0;
    },
    typeParam: function () {
      if (this.type === "textarea") {
        return "textarea";
      } else if (this.type === "password") {
        return "password";
      } else {
        return "text";
      }
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    closeBox() {
      this.box = false;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data[this.labelKey].indexOf(value) !== -1;
    },
    init() {
      if (this.isTree) {
        if (this.multiple) {
          this.labelText = ["获取字典中..."];
        } else {
          this.labelText = "获取字典中...";
        }
        const check = setInterval(() => {
          if (validatenull(this.dic)) {
            this.labelText = "";
            clearInterval(check);
            return;
          }
          // 是否禁止父类
          !this.parent && this.disabledParentNode(this.dic);
          if (this.multiple) {
            this.labelText = [];
            if (!validatenull(this.text)) {
              this.text.forEach((ele) => {
                this.findLabelNode(this.dic, ele, this.props);
              });
            }
          } else {
            this.labelText = "";
            if (!validatenull(this.text)) {
              this.labelText = this.text;
              this.findLabelNode(this.dic, this.text, this.props);
            }
          }
          setTimeout(() => {
            this.$parent.$parent.clearValidate();
          }, 0);
          clearInterval(check);
        }, 500);
      }
    },
    findLabelNode(dic, value, props) {
      const labelKey = props.label || "label";
      const valueKey = props.value || "value";
      const childrenKey = props.children || "children";
      dic.forEach((ele) => {
        const children = ele[childrenKey];
        if (ele[valueKey] === value) {
          const label = ele[labelKey];
          this.multiple ? this.labelText.push(label) : (this.labelText = label);
        } else if (!validatenull(children)) {
          this.findLabelNode(children, value, props);
        }
      });
    },
    disabledParentNode(dic) {
      dic.forEach((ele) => {
        const children = ele[this.childrenKey];
        if (!validatenull(children)) {
          ele.disabled = true;
          this.disabledParentNode(children);
        }
      });
    },
    handleNodeClick(data) {
      const callback = () => {
        this.box = false;
      };
      if (typeof this.nodeClick === "function") this.nodeClick(data);
      if (this.multiple) return;
      if ((validatenull(data[this.childrenKey]) && !this.multiple) || this.parent) {
        const value = data[this.valueKey];
        const label = data[this.labelKey];
        const result = this.isString && this.multiple ? value.join(",") : value;
        this.text = value;
        this.labelText = label;
        this.$emit("input", result);
        this.$emit("change", result);
        callback();
      }
    },
    handleClick() {
      const result = this.isString && this.multiple ? this.text.join(",") : this.text;
      if (typeof this.click === "function") {
        this.click({ value: result, column: this.column });
      }
    },
    handleChange(value) {
      // const text = this.text;
      const result = this.isString && this.multiple ? value.join(",") : value;
      if (typeof this.change === "function") {
        this.change({ value: result, column: this.column });
      }
      this.$emit("input", result);
      this.$emit("change", result);
    },
  },
});
</script>
