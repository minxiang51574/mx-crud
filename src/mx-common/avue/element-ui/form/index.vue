<!--
 * @Author: Mx
 * @Date: 2023-03-23 10:39:08
 * @Description: Form
-->
<template>
  <div :class="b()" :style="{ width: '100%' }">
    <el-form
      ref="form"
      :model="form"
      :label-position="vaildData(formOption.labelPosition, config.labelPosition)"
      :size="formOption.size"
      :label-width="setPx(formOption.labelWidth, config.labelWidth)"
      :rules="formRules"
    >
      <el-row>
        <template v-for="(column, cindex) in formOption.column">
          <el-col :span="12" :key="cindex">
            <el-form-item
              v-if="vaildDisplay(column)"
              :prop="column.prop"
              :class="
                b(
                  'item--' +
                    (column.labelPosition || column.span === 24
                      ? 'inline'
                      : column.span
                      ? column.span
                      : '')
                )
              "
              :label-width="getLabelWidth(column)"
              :label="column.labelAlias || column.label"
            >
              <component
                v-model="form[column.prop]"
                :ref="column.prop"
                :is="getComponent(column.type)"
                :clearable="column.searchClearable"
                :defaultTime="
                  column.searchDefaultTime ||
                  (column.more ? ['00:00:00', '23:59:59'] : '')
                "
                :disabled="vaildDisabled(column)"
                :filterable="column.searchFilterable"
                :editable="column.editable"
                :format="column.format"
                :multiple="column.multiple"
                :placeholder="column.searchPlaceholder || ''"
                :prop="column.prop"
                :size="$parent.controlSize"
                :type="column.type"
                :value-format="column.valueFormat"
                :tpyeformat="column.tpyeformat"
                :dicData="column.dicData"
                :pickerOptions="column.pickerOptions"
                :isSearch="true"
                :clear="column.clear"
                :maxlength="column.maxlength"
              ></component>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script type="text/javascript">
import create from "../../core/create";
import config from "../crud/config";
import { getComponent } from "../../utils";
import { formInitVal } from "../../core/dataformat";
export default create({
  name: "form",
  props: {
    formOption: {
      // 列表配置项
      type: Object,
      required: true,
      default: () => {
        return {};
      },
    },
    value: {
      type: Object,
      required: true,
      default: () => {
        return {};
      },
    },
  },

  data() {
    return {
      config,
      form: {},
      formRules: {},
    };
  },
  computed: {
    // 弹窗类型
    boxType() {
      return this.formOption.boxType;
    },
  },
  watch: {
    value: {
      handler() {
        this.formVal();
      },
      deep: true,
    },
  },
  created() {
    // 初始化表单
    this.dataformat();
    // 初始化弹窗表单规则
    this.rulesInit();
  },

  methods: {
    getComponent,
    /** 初始化表单 */
    dataformat() {
      this.form = this.deepClone(formInitVal(this.formOption.column).tableForm);
      this.formVal();
    },
    /** 表单数据处理 */
    formVal() {
      Object.keys(this.value).forEach((ele) => {
        this.$set(this.form, ele, this.value[ele]);
      });
      this.$emit("input", this.form);
    },
    /** 验证表单是否禁止 */
    vaildDisabled(column) {
      if (!this.validatenull(column.disabled)) {
        return this.vaildData(column.disabled, false);
      } else if (this.boxType === "add") {
        return this.vaildData(column.addDisabled, false);
      } else if (this.boxType === "edit") {
        return this.vaildData(column.editDisabled, false);
      } else if (this.boxType === "view") {
        return true;
      } else {
        return false;
      }
    },
    /** 验证表单是否显隐 */
    vaildDisplay(column) {
      if (!this.validatenull(column.display)) {
        return this.vaildData(column.display, true);
      } else if (this.boxType === "add") {
        return this.vaildData(column.addDisplay, true);
      } else if (this.boxType === "edit") {
        return this.vaildData(column.editDisplay, true);
      } else if (this.boxType === "view") {
        return this.vaildData(column.viewDisplay, true);
      } else {
        return true;
      }
    },
    getLabelWidth(column) {
      const result = column.labelWidth || this.formOption.labelWidth;
      return this.setPx(result);
    },
    /** 校验表单的回调 */
    validate(callback) {
      this.$refs["form"].validate((valid) => callback(valid));
    },
    /**规则初始化 */
    rulesInit() {
      this.formOption.column.forEach((column) => {
        if (column.rules && column.display !== false) {
          this.$set(this.formRules, column.prop, column.rules);
        }
      });
    },
  },
});
</script>

<style lang="scss" scoped></style>
