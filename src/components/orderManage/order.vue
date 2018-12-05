<template>
  <div>
    <div style="margin-top: 15px;">
     <el-input placeholder="请输入内容" v-model="form.searchName" class="input-with-select">
    <el-button slot="append" @click="search" icon="el-icon-search"></el-button>
  </el-input>
   </div>
    <el-table
    :data="rows"
    border
    style="width: 100%">
    <el-table-column
      prop="_id"
      label="订单编号"
       width="300">
    </el-table-column>
    <el-table-column
      prop="name"
      label="买家姓名">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="买家电话">
    </el-table-column>
    <el-table-column
      prop="address"
      label="家庭地址">
    </el-table-column>
     <el-table-column
      prop="goodsName"
      label="商品名称">
    </el-table-column>
     <el-table-column
      prop="goodsNumber"
      label="商品数量">
    </el-table-column>
     <el-table-column
      prop="price"
      label="商品价格">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
         <el-button type="primary" @click="() => {
            dialogFormVisible = true
            updateData(scope.row)
        }">修改</el-button>
       <el-dialog title="订单修改" :visible.sync="dialogFormVisible">
      <el-form :model="form">
      <el-form-item label="买家姓名" :label-width="formLabelWidth">
      <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      </el-form>
       <el-form :model="form">
      <el-form-item label="买家电话" :label-width="formLabelWidth">
      <el-input v-model="form.phone" auto-complete="off"></el-input>
      </el-form-item>
      </el-form>
      <el-form :model="form">
      <el-form-item label="家庭地址" :label-width="formLabelWidth">
      <el-input v-model="form.address" auto-complete="off"></el-input>
      </el-form-item>
      </el-form>
      <el-form :model="form">
      <el-form-item label="商品名称" :label-width="formLabelWidth">
      <el-input v-model="form.goodsName" auto-complete="off"></el-input>
      </el-form-item>
      </el-form>
      <el-form :model="form">
      <el-form-item label="商品价格" :label-width="formLabelWidth">
      <el-input v-model="form.price" auto-complete="off"></el-input>
      </el-form-item>
      </el-form>
      <el-form :model="form">
      <el-form-item label="商品数量" :label-width="formLabelWidth">
      <el-input v-model="form.goodsNumber" auto-complete="off"></el-input>
      </el-form-item>
      </el-form>
     <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirm">修改</el-button>
  </div>
</el-dialog>

      </template>
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
      :current-page="curpage"
      :page-size="eachpage"
      @size-change = " handleSizeChange"
      @current-change = "handleCurrentChange"
      :page-sizes="[5,10,15,20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "order",
  created() {
    this.asyncGetOrderByPage();
  },
  computed: {
    ...mapState("order", ["curpage", "eachpage", "maxpage", "total", "rows"])
  },
  watch: {
    curpage() {
      this.asyncGetOrderByPage();
    },
    eachpage() {
      this.asyncGetOrderByPage();
    }
  },
  methods: {
    ...mapMutations("order", ["setCurPage", "setEachPage","searchName"]),
    ...mapActions("order", ["asyncGetOrderByPage","asyncUpdateOrder"]),
    handleSizeChange(val) {
      this.setEachPage(val);
    },
    handleCurrentChange(val) {
      this.setCurPage(val);
    },
    updateData(params) {
      this.form.name = params.name;
      this.form.phone = params.phone;
      this.form.address = params.address;
      this.form.goodsName = params.goodsName;
      this.form.price = params.price;
      this.form.goodsNumber = params.goodsNumber;
      this.form.id=params._id
    },
    confirm(){
        this.dialogFormVisible = false
        this.asyncUpdateOrder(this.form);
        this.asyncGetOrderByPage();
    },
    search(){
        this.asyncGetOrderByPage({name:this.form.searchName});
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        phone: "",
        address: "",
        goodsName: "",
        price: "",
        goodsNumber: "",
        id:"",
        searchName:"",
      },
      formLabelWidth: "80px"
    };
  },
};
</script>

<style>
</style>
