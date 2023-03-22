<template>
  <el-dialog
    lock-scroll
    :class="b('dialog')"
    :title="title"
    :custom-class="$parent.tableOption.customDialogClass"
    append-to-body
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    width="900px"
    :visible.sync="boxVisible"
    @close="closeDialog"
  >
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button :size="$parent.controlSize" @click="closeDialog">取 消</el-button>
      <el-button type="primary" :size="$parent.controlSize" @click="dialogVisible = false"
        >保 存</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
import create from "../../core/create";
import config from "./config";
export default create({
  name: "crud",
  data() {
    return {
      config,
      boxType: "", //弹窗类型
      boxVisible: false,
      title: "",
    };
  },
  methods: {
    closeDialog() {
      this.tableForm = {};
      this.boxVisible = false;
    },
    // 显示表单
    show(type, index = -1) {
      this.index = index;
      this.boxType = type;
      const boxTypeMap = new Map([
        ["view", "查看"],
        ["edit", "编辑"],
        ["add", "新增"],
      ]);
      this.title = boxTypeMap.get(this.boxType);
      this.$nextTick(() => {
        this.boxVisible = true;
      });
    },
  },
});
</script>
<style scoped lang="scss"></style>
