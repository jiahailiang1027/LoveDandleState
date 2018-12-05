<template>
    <el-card class="box-card">
<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
    <el-form-item label="登录名" prop="userAcount">
    <el-input v-model.number="ruleForm2.userAcount"></el-input>
  </el-form-item>
  <el-form-item label="手机号" prop="userPhone">
    <el-input v-model.number="ruleForm2.userPhone"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="userMail">
    <el-input v-model.number="ruleForm2.userMail"></el-input>
  </el-form-item>
  <el-form-item label="真实姓名" prop="userName">
    <el-input v-model.number="ruleForm2.userName"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
    <el-button @click="resetForm('ruleForm2')">重置</el-button>
  </el-form-item>
</el-form>
    </el-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "reg",
  data() {
    var checkuserAcount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    var checkuserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("姓名不能为空"));
      } else {
        callback();
      }
    };
    var checkuserPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("电话不能为空"));
      }
      setTimeout(() => {
        let reg = /^1[0-9]{10}$/;
        if (!reg.test(value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      }, 1000);
    };
    var checkuserMail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        let reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        if (!reg.test(value)) {
          callback(new Error("请输正确的邮箱"));
        } else callback();
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.length < 6 || value.length > 11) {
          callback(new Error("请输正确的邮箱"));
        } else {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        pass: "",
        checkPass: "",
        userAcount: "",
        userName: "",
        userPhone: "",
        userMail: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        userAcount: [{ validator: checkuserAcount, trigger: "blur" }],
        userName: [{ validator: checkuserName, trigger: "blur" }],
        userPhone: [{ validator: checkuserPhone, trigger: "blur" }],
        userMail: [{ validator: checkuserMail, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapActions("Reg", ["addUsers"]),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let obj = {
            userAcount: this.ruleForm2.userAcount,
            userName: this.ruleForm2.userName,
            userPhone: JSON.stringify(this.ruleForm2.userPhone),
            userMail: this.ruleForm2.userMail,
            usePwd: this.ruleForm2.pass,
            userType: "门店管理员",
            userStatus: "0",
            use: "merchants"
          };
            this.addUsers(obj)
          alert("注册成功");
          this.$router.push("/");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
}
.box-card {
  width: 600px;
  height: 500px;
  margin: 100px auto;
}
</style>