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
export default create({
  name: "input",
  mixins: [props(), event()],
  data() {
    return {
      labelText: this.multiple ? [] : "",
    };
  },
  props: {
    showWordLimit: {
      type: Boolean,
      default: false,
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
  },
  watch: {
    text: {
      handler() {
        this.handleChange(this.text);
      },
      immediate: true,
    },
  },
  computed: {
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
  methods: {
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
