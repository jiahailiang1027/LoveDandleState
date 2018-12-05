<template>
    <div>
        <div>
            <el-button type="primary" icon="el-icon-plus" @click="addGoodsName">添加商品</el-button>
            <el-input  placeholder="请输入商品名称" v-model="searchGood"  clearable style="width:300px;margin:0 5px"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="searchGoodsName">搜索商品</el-button>
        </div> 
        <div style="margin-top:10px">
            <el-table           
                :data="rows"
                height="500px"
                style="width: 100%">
                <el-table-column
                property="goodsName"
                label="名称">
                </el-table-column>
                <el-table-column
                property="goodsType"
                label="品类" >
                </el-table-column>
                <el-table-column
                property="goodsTaste"
                label="口味">
                </el-table-column>
                <el-table-column
                property="goodsRegion"
                label="产地">
                </el-table-column>
                <el-table-column
                property="goodsSupplier"
                label="供应商">
                </el-table-column>
                <el-table-column
                property="goodsPrice"
                label="价格">
                </el-table-column>
                  <el-table-column
                fixed="right"
                width="200px"
                label="操作">
                <template slot-scope="scope">
                  <el-button @click="deleteGoodsName(scope.row)" type="button" size="small">删除</el-button>
                  <el-button  @click="updataGoodsName(scope.row)"  type="button" size="small">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
        </div>
         <div class="block">
              <el-pagination
              :current-page="curpage"
              :page-size="eachpage"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[5, 7, 10]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        
              <el-dialog title="添加商品" :visible.sync="dialogFormVisible" :before-close="cleares">
              <el-form :model="form">
              <el-form-item label="商品名称" :label-width="formLabelWidth">
              <el-input v-model="form.goodsName" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品品类" :label-width="formLabelWidth">
              <el-select v-model="form.goodsType" placeholder="请选择商品品类">
              <el-option label="狗粮" value="狗粮"></el-option>
              <el-option label="猫粮" value="猫粮"></el-option>
              <el-option label="其他" value="其他"></el-option>
              </el-select>
              </el-form-item>
               <el-form-item label="商家" :label-width="formLabelWidth">
              <el-select v-model="form.user" placeholder="请选择商家">
                <el-option 
                    v-for="item in users"  
                    :label="item.userName"
                    :value="item._id"
                    :key="item._id">
                </el-option>
              
              </el-select>
              </el-form-item>
               <el-form-item label="口味" :label-width="formLabelWidth">
              <el-input v-model="form.goodsTaste" auto-complete="off"></el-input>
              </el-form-item>
               <el-form-item label="产地" :label-width="formLabelWidth">
              <el-input v-model="form.goodsRegion" auto-complete="off"></el-input>
              </el-form-item>
                 <el-form-item label="供应商" :label-width="formLabelWidth">
              <el-input v-model="form.goodsSupplier" auto-complete="off"></el-input>
              </el-form-item>
               <el-form-item label="特色说明" :label-width="formLabelWidth">
              <el-input v-model="form.goodsIntro" auto-complete="off"></el-input>
              </el-form-item>
                <el-form-item label="价格" :label-width="formLabelWidth">
              <el-input v-model="form.goodsPrice" auto-complete="off"></el-input>
              </el-form-item>
               <el-form-item label="添加图片" :label-width="formLabelWidth">
               <el-upload
               class="avatar-uploader"
                    action="/goods/uploadAdd"
                    :show-file-list="false"
                    :on-success="addImage">
                    <img v-if="form.imageUrl" :src="form.imageUrl"  alt="" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
              </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
              <el-button @click="shutDown">取 消</el-button>
              <el-button type="primary" @click="submit ">确 定</el-button>
              </div>
              </el-dialog>
      
    </div>     
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  created() {
    this.usersId = this.getStorage("users")
    this.asyncGetEmpByPage({user:this.usersId._id,use:this.usersId.use});
  },
  computed: {
    ...mapState("goods", [
      "curpage",
      "eachpage",
      "maxpage",
      "total",
      "rows",
      "users"
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
    //上传图片                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       z
    addImage(file) {
      this.form.imageUrl = file;
    },

    handleSizeChange(val) {
      this.setEachPage(val);
    },
    handleCurrentChange(val) {
      this.setCurPage(val);
    },
    cleares() {
      this.type = "";
      this.form.goodsPrice = "";
      this.form.goodsSupplier = "";
      this.form.goodsTaste = "";
      this.form.goodsRegion = "";
      this.form.goodsName = "";
      this.form.goodsType = "";
      this.form.goodsIntro = "";
      this.form.id = "";
      this.form.imageUrl = "";
      this.form.user = "";
      this.dialogFormVisible = false;
    },
    searchGoodsName() {
      this.searchGoods(this.searchGood);
      this.asyncGetEmpByPage();
    },
    addGoodsName() {
      this.associatedUser();
      this.dialogFormVisible = true;
      this.type = "add";
    },
    submit() {
      if (this.type === "add") {
        this.addGoods(this.form);
        this.dialogFormVisible = false;
        this.asyncGetEmpByPage({user:this.usersId._id,use:this.usersId.use});
      }
      if (this.type === "updata") {
        this.updataGoods(this.form);
        this.dialogFormVisible = false;
        this.asyncGetEmpByPage({user:this.usersId._id,use:this.usersId.use});
      }
      this.type = "";
      this.form.goodsPrice = "";
      this.form.goodsSupplier = "";
      this.form.goodsTaste = "";
      this.form.goodsRegion = "";
      this.form.goodsName = "";
      this.form.goodsType = "";
      this.form.imageUrl = "";
      this.form.goodsIntro = "";
      this.form.id = "";
      this.form.user = "";
    },
    updataGoodsName(row) {
      this.associatedUser();
      this.dialogFormVisible = true;
      this.type = "updata";
      this.form.goodsPrice = row.goodsPrice;
      this.form.goodsSupplier = row.goodsSupplier;
      this.form.goodsTaste = row.goodsTaste;
      this.form.goodsRegion = row.goodsRegion;
      this.form.goodsName = row.goodsName;
      this.form.goodsType = row.goodsType;
      this.form.goodsIntro = row.goodsIntro;
      this.form.imageUrl = row.imageUrl;
      this.form.user = row.user;
      this.form.id = row._id;
    },
    shutDown() {
      this.dialogFormVisible = false;
      this.type = "";
      this.form.goodsPrice = "";
      this.form.goodsSupplier = "";
      this.form.goodsTaste = "";
      this.form.goodsRegion = "";
      this.form.goodsName = "";
      this.form.goodsType = "";
      this.form.goodsIntro = "";
      this.form.imageUrl = "";
      this.form.id = "";
      this.form.user = "";
    },
    deleteGoodsName(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteGoods(row._id);
          this.asyncGetEmpByPage();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    ...mapMutations("goods", ["setCurPage", "setEachPage", "searchGoods"]),
    ...mapActions("goods", [
      "asyncGetEmpByPage",
      "deleteGoods",
      "addGoods",
      "updataGoods",
      "associatedUser"
    ])
  },

  data() {
    return {
      type: "",
      searchGood: "",
      dialogVisible: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      currentRow: null,
      usersId:"",
      use:"",
      form: {
        id: "",
        goodsPrice: "",
        goodsSupplier: "",
        goodsTaste: "",
        goodsRegion: "",
        goodsName: "",
        goodsType: "",
        imageUrl: "",
        goodsIntro: "",
        user: ""
      },
      formLabelWidth: "100px"
    };
  }
};
</script>

<style scoped>
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
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  border-radius: 6px;
  display: block;
}
</style>
