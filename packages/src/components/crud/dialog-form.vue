<template>
  <el-dialog
    lock-scroll
    :class="b('dialog')"
    :title="titleAlias || title"
    :custom-class="$parent.tableOption.customDialogClass"
    append-to-body
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    width="940px"
    :visible.sync="boxVisible"
    @close="closeDialog"
  >
    <el-scrollbar style="height: 100%">
      <mx-form
        v-model="tableForm"
        v-if="boxVisible"
        ref="tableForm"
        :formOption="formOption"
      >
      </mx-form>
    </el-scrollbar>
    <span slot="footer" class="dialog-footer">
      <template v-if="boxType === 'view'">
        <el-button type="primary" :size="$parent.controlSize" @click="boxVisible = false"
          >确 定</el-button
        >
      </template>
      <template v-else>
        <el-button :size="$parent.controlSize" @click="closeDialog">取 消</el-button>
        <el-button
          type="primary"
          :size="$parent.controlSize"
          v-if="boxType === 'edit'"
          @click="rowUpdate"
          >保 存</el-button
        >
        <el-button
          type="primary"
          :size="$parent.controlSize"
          v-if="boxType === 'add'"
          @click="rowSave"
          >保 存</el-button
        >
      </template>
    </span>
  </el-dialog>
</template>
<script>
import create from "../../core/create";
import config from "./config";
export default create({
  name: "crud",
  props: {
    value: {
      type: Object,
      default: () => {
        return {};
      },
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
  data() {
    return {
      config,
      boxType: "", //弹窗类型
      boxVisible: false,
      title: "",
      titleAlias: "", // 自定义title
      tableForm: {},
    };
  },
  computed: {
    formOption() {
      const option = this.deepClone(this.$parent.tableOption);
      option.boxType = this.boxType;
      return option;
    },
  },
  methods: {
    closeDialog() {
      this.tableForm = {};
      this.boxVisible = false;
    },
    formVal() {
      Object.keys(this.value).forEach((ele) => {
        this.tableForm[ele] = this.value[ele];
      });
      this.$emit("input", this.tableForm);
    },
    // 显示表单
    show(type, index = -1) {
      this.index = index;
      this.boxType = type;
      this.handlerTitle();
      this.$nextTick(() => {
        this.boxVisible = true;
      });
    },
    /** 标题处理 */
    handlerTitle() {
      const boxTypeMap = new Map([
        ["view", "查看"],
        ["edit", "编辑"],
        ["add", "新增"],
      ]);
      if (this.boxType === "view") {
        this.titleAlias = this.$parent.tableOption.titleAliasView;
      } else if (this.boxType === "edit") {
        this.titleAlias = this.$parent.tableOption.titleAliasEdit;
      } else if (this.boxType === "add") {
        this.titleAlias = this.$parent.tableOption.titleAliasAdd;
      }
      this.title = this.$parent.functionName + boxTypeMap.get(this.boxType);
    },
    // 更新
    rowUpdate() {
      this.$refs["tableForm"].validate((vaild) => {
        if (vaild) {
          this.$parent.$emit(
            "row-update",
            this.deepClone(this.tableForm),
            this.closeDialog
          );
        }
      });
    },
    // 保存
    rowSave() {
      this.$refs["tableForm"].validate((vaild) => {
        if (vaild) {
          this.$parent.$emit(
            "row-save",
            this.deepClone(this.tableForm),
            this.closeDialog
          );
        }
      });
    },
  },
});
</script>
<style scoped lang="scss"></style>
