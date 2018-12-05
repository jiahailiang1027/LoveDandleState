<template>
<div>
<el-button @click="addUser" type="primary" plain style="float:left"  >添加用户</el-button>
<div class="demo-input-size">
<el-input
    @blur="searchText"
    size="small"
    placeholder="请输入内容"
    suffix-icon="el-icon-date"
    v-model="input8">
  </el-input>
</div>
<el-dialog title="添加用户" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="用户名" :label-width="formLabelWidth">
      <el-input v-model="form.userAcount" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="姓名" :label-width="formLabelWidth">
      <el-input v-model="form.userName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话" :label-width="formLabelWidth">
      <el-input v-model="form.userPhone" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" :label-width="formLabelWidth">
      <el-input v-model="form.userMail" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item v-if="isAdd === false" label="状态" :label-width="formLabelWidth">
      <el-input v-model="form.userStatus" auto-complete="off"></el-input>
    </el-form-item>
    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="clickCancel">取 消</el-button>
    <el-button type="primary" @click="clickConfirm">确 定</el-button>
  </div>
</el-dialog>

  <el-table
  align = "center"
    :data="this.$store.state.users.rows"
    style="width: 100%">
    <el-table-column
      label="用户名"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.userAcount }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>电话: {{ scope.row.userPhone }}</p>
          <p>邮箱: {{ scope.row.userMail }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.userName }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="角色"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.userType }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="状态"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.userStatus }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[5, 7, 9, 11]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.$store.state.users.total">
    </el-pagination>
  </div>
   </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  mounted() {
    this.getEmpByAll();
  },
  data() {
    return {
      input8: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        userAcount: "",
        userName: "",
        userPhone: "",
        userMail: "",
        id: "",
        userStatus:""
      },
      formLabelWidth: "120px",
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      isAdd: false
    };
  },
  methods: {
    searchText() {
      this.getSearch({ userAcount: this.input8 });
    },
    handleEdit(index, row) {
      if (index >= 0) {
        this.dialogFormVisible = true;
        this.form.userAcount = row.userAcount;
        this.form.userName = row.userName;
        this.form.userPhone = row.userPhone;
        this.form.userMail = row.userMail;
        this.form.id = row._id;
        this.form.userStatus = row.userStatus;
      }
    },
    addUser() {
      this.dialogFormVisible = true;
      this.isAdd = true;
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.deletUsers(row._id);
          this.getEmpByAll();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    clickCancel() {
      this.dialogFormVisible = false;
      this.form.userAcount = "";
      this.form.userName = "";
      this.form.userPhone = "";
      this.form.userMail = "";
      this.isAdd = false;
    },
    clickConfirm() {
      if (this.isAdd) {
        let obj = {
          userAcount: this.form.userAcount,
          userName: this.form.userName,
          userPhone: this.form.userPhone,
          userMail: this.form.userMail,
          userType: "门店管理员",
          userStatus: "1"
        };
        this.addUsers(obj);
        this.isAdd = false;
        this.getEmpByAll();
      } else {
        let obj = {
          userAcount: this.form.userAcount,
          userName: this.form.userName,
          userPhone: this.form.userPhone,
          userMail: this.form.userMail,
          userType: "门店管理员",
          userStatus: this.form.userStatus,
          id: this.form.id
        };
        this.updateUsers(obj);
        this.getEmpByAll();
      }
      this.dialogFormVisible = false;
      this.form.userAcount = "";
      this.form.userName = "";
      this.form.userPhone = "";
      this.form.userMail = "";
    },
    handleSizeChange(val) {
      if (this.input8) {
        this.getSearch({ eachpage: val, userAcount: this.input8 });
      } else {
        this.getEmpByAll({ eachpage: val });
      }
    },
    handleCurrentChange(val) {
      if (this.input8) {
        this.getSearch({ curpage: val, userAcount: this.input8 });
      } else {
        this.getEmpByAll({ curpage: val });
      }
    },
    ...mapActions("users", [
      "getEmpByAll",
      "addUsers",
      "getSearch",
      "updateUsers",
      "deletUsers"
    ])
  },
  computed: {
    ...mapState("users", ["curpage", "eachpage", "maxpage", "total", "rows"])
  }
};
</script>

<style>
.block {
  margin-top: 20px;
}
.demo-input-size {
  width: 300px;
  float: left;
  margin-left: 30px;
}
</style>
