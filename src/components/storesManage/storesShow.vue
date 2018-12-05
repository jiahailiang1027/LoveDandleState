<template>   
  <el-main>
    <el-dialog append-to-body title="修改" :visible.sync="putVisible" width="50%" :before-close="handleClose">
      <el-form  :model="putValue" style="width:500px" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="门店名称">
        <el-input v-model="putValue.shopName" style="width:300px" type="text"></el-input>
        </el-form-item>
        <el-form-item label="营业执照号码">
          <el-input v-model="putValue.shopLicenceNum" style="width:300px" type="text"></el-input>
        </el-form-item>
        <el-form-item label="营业地址">
          <el-input v-model="putValue.shopAdd" style="width:300px" type="text"></el-input>
        </el-form-item>
        <el-form-item label="定位">
          <el-input v-model="putValue.shopLocation" style="width:300px" type="text"></el-input>
        </el-form-item>
          <el-form-item label="法人">
            <template>
              <el-select v-model="putValue.usersId" placeholder="请选择">
                <el-option
                  v-for="item in usersData"
                  :key="item._id"
                  :label="item.userName"
                  :value="item._id">
                </el-option>
              </el-select>
          </template>
        </el-form-item>
        <el-form-item label="特色">
          <el-input v-model="putValue.shopFeature" style="width:300px" type="text"></el-input>
        </el-form-item>
        <el-form-item label="店员属性">
          <el-input v-model="putValue.shopEmployee" style="width:300px" type="text"></el-input>
        </el-form-item>
      </el-form>
      <div style="position: absolute;right:50px;top:80px">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8081/stores/changeUploadAdd"
          :show-file-list="false"
          :on-success="changeShopImg">
          <img v-if="putValue.shopLicenceImg" :src="putValue.shopLicenceImg" class="avatar">
          <h1 style="width:160px;font-size:20px">点击添加营业执照图片</h1>
        </el-upload>
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8081/stores/changeUploadAdd"
          :show-file-list="false"
          :on-success="changeShopImgSuccess">
          <img v-if="putValue.shopImg" :src="putValue.shopImg" class="avatar">
          <h1 style="width:160px;font-size:20px">点击添加头图</h1>            
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="putVisible = false">取 消</el-button>
        <el-button type="primary"  @click="() => {
        putVisible = false
        affirm()
        }">确 定</el-button>
      </span>
    </el-dialog>
    <div class="div">
      <el-button type="primary" @click="() => {
          addStores()
          dialogVisible = true
        }" style="margin-right:20px"><i class="el-icon-plus"></i>添加门店</el-button>
      <el-dialog title="添加门店" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
        <el-form  :model="inputValue" style="width:500px" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="门店名称">
            <el-input v-model="inputValue.shopName" style="width:300px" type="text"></el-input>
          </el-form-item>
          <el-form-item label="营业执照号码">
            <el-input v-model="inputValue.shopLicenceNum" style="width:300px" type="text"></el-input>
          </el-form-item>
          <el-form-item label="营业地址">
            <el-input v-model="inputValue.shopAdd" style="width:300px" type="text"></el-input>
          </el-form-item>
          <el-form-item label="定位">
            <el-input v-model="inputValue.shopLocation" style="width:300px" type="text"></el-input>
          </el-form-item>
          <el-form-item label="法人">
            <template>
              <el-select v-model="inputValue.usersId" placeholder="请选择">
                <el-option
                  v-for="item in usersData"
                  :key="item._id"
                  :label="item.userName"
                  :value="item._id">
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item label="特色">
            <el-input v-model="inputValue.shopFeature" style="width:300px" type="text"></el-input>
          </el-form-item>
          <el-form-item label="店员属性">
            <el-input v-model="inputValue.shopEmployee" style="width:300px" type="text"></el-input>
          </el-form-item>
        </el-form>
        <div style="position: absolute;right:50px;top:80px">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8081/stores/uploadAdd"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <img v-if="inputValue.shopLicenceImg" :src="inputValue.shopLicenceImg" class="avatar">
            <h1 style="width:160px;font-size:20px">点击添加营业执照图片</h1>
          </el-upload>
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8081/stores/uploadAdd"
            :show-file-list="false"
            :on-success="shopImgSuccess">
            <img v-if="inputValue.shopImg" :src="inputValue.shopImg" class="avatar">
            <h1 style="width:160px;font-size:20px">点击添加头图</h1>
          </el-upload>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary"  @click="() => {
            dialogVisible = false
            OK()}">确 定</el-button>
        </span>
      </el-dialog>
      <div style="border: 1px solid green;border-radius: 5px;background:green">
        <el-input  v-model="searchValue" @keyup.enter.native="searchBtn" style="width:200px" placeholder="请输入门店名称"></el-input>
        <el-button @click="searchBtn"  type="success"><i class="el-icon-search"></i> 搜索门店</el-button>
      </div>
    </div>
    <el-table
      :data="rows"
      ref="currentRowTable"
      height="500px"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="门店名称" style="display:block;margin:0;margin:0">
              <span>{{ props.row.shopName }}</span>
            </el-form-item>
            <el-form-item label="营业执照号码：" style="display:block;margin:0;margin:0">
              <span>{{ props.row.shopLicenceNum }}</span>
            </el-form-item>
            <el-form-item label="营业执照图片：" style="display:block;margin:0">
              <span>{{ props.row.shopLicenceImg }}</span>
            </el-form-item>
            <el-form-item label="营业地址：" style="display:block;margin:0">
              <span>{{ props.row.shopAdd }}</span>
            </el-form-item>
            <el-form-item label="定位：" style="display:block;margin:0">
              <span>{{ props.row.shopLocation }}</span>
            </el-form-item>
            <el-form-item label="法人：" style="display:block;margin:0">
              <span>{{ props.row.shopCorporate }}</span>
            </el-form-item>
            <el-form-item label="联系电话：" style="display:block;margin:0">
              <span>{{ props.row.shopTel }}</span>
            </el-form-item>
            <el-form-item label="头图：" style="display:block;margin:0">
              <span>{{ props.row.shopImg }}</span>
            </el-form-item>
                  <el-form-item label="特色：" style="display:block;margin:0">
              <span>{{ props.row.shopFeature }}</span>
            </el-form-item>
                  <el-form-item label="店员属性：" style="display:block;margin:0">
              <span>{{ props.row.shopEmployee }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column >
      <el-table-column prop="shopName" label="门店名称"></el-table-column>
      <el-table-column prop="shopLicenceNum" label="营业执照号码"></el-table-column>
      <el-table-column prop="shopAdd" label="营业地址"></el-table-column>
      <el-table-column prop="shopLocation" label="定位"></el-table-column>
      <el-table-column prop="shopCorporate" label="法人"></el-table-column>
      <el-table-column prop="shopTel" label="联系电话"></el-table-column>
      <el-table-column prop="shopFeature" label="特色"></el-table-column>
      <el-table-column prop="shopEmployee" label="店员属性"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)" size="small"><el-button type="primary" plain>删除</el-button></el-button>
          <el-button type="text"  @click="()=>{putVisible = true,put(scope.row)}" style="margin-right:20px"><el-button type="warning" plain>编辑</el-button></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :current-page="curpage"
        :page-size="eachpage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5,10,15,20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </el-main>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      dialogVisible: false,
      putVisible: false,
      searchValue: "",
      userStatus:1,
      usersId:"",
      use:"",
      inputValue: {
        shopName: "",
        shopLicenceImg: "",
        shopLicenceNum: "",
        shopAdd: "",
        shopLocation: "",
        shopCorporate: "",
        shopImg: "",
        shopTel: "",
        shopFeature: "",
        shopEmployee: "",
        usersId: ""
      },
      usersData: [],
      putValue: {
        shopName: "",
        shopLicenceImg: "",
        shopLicenceNum: "",
        shopAdd: "",
        shopLocation: "",
        shopCorporate: "",
        shopImg: "",
        shopTel: "",
        shopFeature: "",
        shopEmployee: "",
        usersId: ""
      }
    };
  },
  created() {
    this.usersId = this.getStorage("users")
    this.asyncGetEmpByPage({usersId:this.usersId._id,use:this.usersId.use});
  },
  computed: {
    ...mapState("stores", [
      "curpage",
      "eachpage",
      "maxpage",
      "total",
      "rows",
      "master"
    ])
  },
  watch: {
    curpage() {
      this.asyncGetEmpByPage();
    },
    eachpage() {
      this.asyncGetEmpByPage();
    }
  },
  methods: {
     getStorage(key) {
      if (!localStorage[key]) {
        return [];
      }
      return JSON.parse(localStorage[key]);
    },
    async addStores() {
      await this.asyncGetMaster({userStatus:this.userStatus});
      this.usersData = this.master;
    },
    handleEdit(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          let id = row._id;
          this.delete(id);
          this.asyncGetEmpByPage();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChange(val) {
      this.setEachPage(val);
    },
    handleCurrentChange(val) {
      this.setCurPage(val);
    },
    ...mapMutations("stores", ["setCurPage", "setEachPage"]),
    ...mapActions("stores", [
      "asyncGetEmpByPage",
      "delete",
      "add",
      "putShop",
      "asyncGetMaster"
    ]),

    handleClose(done) {
      done();
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    OK() {
      let arr = [];
      this.usersData.map(item => {
        if (item._id == this.inputValue.usersId) {
          arr = item;
          return arr;
        }
      });
      this.inputValue.shopTel = arr.userPhone;
      this.inputValue.shopCorporate = arr.userName;
      this.add(this.inputValue);
      this.asyncGetEmpByPage({usersId:this.usersId._id,use:this.usersId.use});
      this.inputValue.shopName = "";
      this.inputValue.shopLicenceImg = "";
      this.inputValue.shopLicenceNum = "";
      this.inputValue.shopAdd = "";
      this.inputValue.shopLocation = "";
      this.inputValue.shopCorporate = "";
      this.inputValue.shopTel = "";
      this.inputValue.shopFeature = "";
      this.inputValue.shopEmployee = "";
    },

    async put(row) {
      await this.asyncGetMaster({userStatus:this.userStatus});
      this.putValue.usersId = row.usersId;
      this.usersData = this.master;
      this.putValue.shopLicenceImg = row.shopLicenceImg;
      this.putValue.shopName = row.shopName;
      this.putValue.shopLicenceNum = row.shopLicenceNum;
      this.putValue.shopAdd = row.shopAdd;
      this.putValue.shopImg = row.shopImg;
      this.putValue.shopLocation = row.shopLocation;
      this.putValue.shopFeature = row.shopFeature;
      this.putValue.shopEmployee = row.shopEmployee;
      this.putValue.id = row._id;
    },
    affirm() {
      this.usersData = this.master;
      let arr = [];
      this.usersData.map(item => {
        if (item._id == this.putValue.usersId) {
          arr = item;
          return arr;
        }
      });
      this.putValue.usersId = arr._id;
      this.putValue.shopTel = arr.userPhone;
      this.putValue.shopCorporate = arr.userName;
      this.putShop(this.putValue);
      this.asyncGetEmpByPage();
    },
    searchBtn() {
      this.asyncGetEmpByPage({ shopName: this.searchValue });
    },

    handleAvatarSuccess(res, file) {
      this.inputValue.shopLicenceImg = file.response;
    },

    changeShopImg(res, file) {
      this.putValue.shopLicenceImg = file.response;
    },

    shopImgSuccess(res, file) {
      this.inputValue.shopImg = file.response;
    },
    changeShopImgSuccess(res, file) {
      this.putValue.shopImg = file.response;
    }
  }
};
</script>
<style>
.div {
  display: flex;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  font-size: 20px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
