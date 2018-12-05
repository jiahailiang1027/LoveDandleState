<template>
    <div class="container">
        <h1>登录页面</h1>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号：" prop="name">
                <el-input v-model="ruleForm.name" type="text"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="psw">
                <el-input v-model="ruleForm.psw" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                <el-button @click="goReg">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        name: "",
        psw: ""
      },
      rules: {
        name: [{ required: true, message: "请输入账号", trigger: "blur" }],
        psw: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    getStorage(key) {
      if (!localStorage[key]) {
        return [];
      }
      return JSON.parse(localStorage[key]);
    },
    saveStorage(key, getArr) {
      return (localStorage[key] = JSON.stringify(getArr));
    },
    ...mapActions("Reg", ["getUsers"]),
    goReg() {
      this.$router.push("reg");
    },
    async submitForm(formName) {
      let userPhone = this.ruleForm.name;
      let usePwd = this.ruleForm.psw;
      let obj = { userPhone, usePwd };
      await this.getUsers(obj);
      this.$refs[formName].validate(valid => {
        if (this.$store.state.Reg.reg) {
          this.saveStorage("users",this.$store.state.Reg.reg)
          this.$router.push("/info");
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
}
.container {
  width: 300px;
  margin: 0 auto;
}
</style>
