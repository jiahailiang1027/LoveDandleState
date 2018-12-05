<template>
  <div>
    <!-- 详情框 -->
    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      width="50%">
      <div class="my-modal">
        <ul v-for="(item , index) in form.havePet" :key="item.index">
          <li>
            <span>宠物名:{{item.name}}</span>
            <span>宠物类型:{{item.varieties}}</span>
          </li>
          <li>
            <span>出生日期:{{item.time}}</span>
            <span>宠物性格:{{item.personality}}</span>
          </li>
        </ul>
      </div>
    </el-dialog>
    <!-- 编辑框 -->
    <el-dialog title="编辑宠物" :visible.sync="dialogFormVisibless">
      <el-form :model="form">
        <el-form-item label="会员卡" :label-width="formLabelWidth">
          <el-input v-model="form.menberCard" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.memberAcount" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" :label-width="formLabelWidth">
          <el-input v-model="form.memberName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.memberPhone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="区域" :label-width="formLabelWidth">
          <el-input v-model="form.memberArea" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="积分" :label-width="formLabelWidth">
          <el-input v-model="form.memberPoint" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-for="item in form.havePet" :key="item.index" label="拥有宠物" :label-width="formLabelWidth">
          <el-input style="padding:5px 0" v-model="item.name" auto-complete="off" placeholder="输入宠物姓名"></el-input>
          <el-input style="padding:5px 0"  v-model="item.varieties" auto-complete="off" placeholder="输入宠物种类"></el-input>
          <div style="padding:5px 0" >
            <el-date-picker
              v-model="item.time"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="出生日期">
            </el-date-picker>
          </div>
          <el-input v-model="item.personality" auto-complete="off" placeholder="输入宠物性格"></el-input>
        </el-form-item>
        <el-form-item label="新增" :label-width="formLabelWidth">
          <el-button plain @click="addPet">增加宠物</el-button>
        </el-form-item>
        <el-form-item label="送货地址" :label-width="formLabelWidth">
          <el-select v-model="form.memberAdd" placeholder="请选择活动区域">
            <el-option label="鱼塘村" value="鱼塘村"></el-option>
            <el-option label="荷塘村" value="荷塘村"></el-option>
            <el-option label="荷花村" value="荷花村"></el-option>
            <el-option label="骚炮村" value="骚炮村"></el-option>
            <el-option label="良民村" value="良民村"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="() => {dialogFormVisibless = false
          clearInputValue()}">取 消</el-button>
        <el-button type="primary" @click="() => {
            dialogFormVisibless = false
            updateData()
            dialogFormVisibless = false}">确 定</el-button>
      </div>
    </el-dialog>
      <div style="margin:10px 0">
        <!-- 搜索 -->
        <el-autocomplete
          v-model="state4"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          value-key="memberName"
          @select="handleSelect">
        </el-autocomplete>
        <!-- 增加框 -->
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="dialogFormVisibles = true">增加</el-button>
        <el-dialog title="增加宠物" :visible.sync="dialogFormVisibles">
          <el-form :model="form">
            <el-form-item label="会员卡" :label-width="formLabelWidth">
              <el-input v-model="form.menberCard" auto-complete="off" placeholder="输入会员卡"></el-input>
            </el-form-item>
            <el-form-item label="昵称" :label-width="formLabelWidth">
              <el-input v-model="form.memberAcount" auto-complete="off" placeholder="输入昵称"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" :label-width="formLabelWidth">
              <el-input v-model="form.memberName" auto-complete="off" placeholder="输入真实姓名"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
              <el-input v-model="form.memberPhone" auto-complete="off" placeholder="输入电话"></el-input>
            </el-form-item>
            <el-form-item label="区域" :label-width="formLabelWidth">
              <el-input v-model="form.memberArea" auto-complete="off" placeholder="输入区域"></el-input>
            </el-form-item>
            <el-form-item label="积分" :label-width="formLabelWidth">
              <el-input v-model="form.memberPoint" auto-complete="off" placeholder="输入积分"></el-input>
            </el-form-item>
            <el-form-item v-for="item in form.havePet" :key="item.index" label="拥有宠物" :label-width="formLabelWidth">
              <el-input style="padding:5px 0" v-model="item.name" auto-complete="off" placeholder="输入宠物姓名"></el-input>
              <el-input style="padding:5px 0"  v-model="item.varieties" auto-complete="off" placeholder="输入宠物种类"></el-input>
              <div style="padding:5px 0" >
                <el-date-picker
                  v-model="item.time"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="出生日期">
                </el-date-picker>
              </div>
              <el-input v-model="item.personality" auto-complete="off" placeholder="输入宠物性格"></el-input>
            </el-form-item>
            <el-form-item label="新增" :label-width="formLabelWidth">
              <el-button plain @click="addPet">增加宠物</el-button>
            </el-form-item>
            <el-form-item label="送货地址" :label-width="formLabelWidth">
              <el-select v-model="form.memberAdd" placeholder="请选择活动区域">
                <el-option label="鱼塘村" value="鱼塘村"></el-option>
                <el-option label="荷塘村" value="荷塘村"></el-option>
                <el-option label="荷花村" value="荷花村"></el-option>
                <el-option label="骚炮村" value="骚炮村"></el-option>
                <el-option label="良民村" value="良民村"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="() => {dialogFormVisibles = false
              this.clearInputValue()}">取 消</el-button>
            <el-button type="primary" @click="() => {
                dialogFormVisibles = false
                addData()
                dialogFormVisibles = false}">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <el-table
        :data="rows"
        border
        style="width: 100%">
        <el-table-column
        align="center"
          fixed
          prop="menberCard"
          label="会员卡">
        </el-table-column>
        <el-table-column
        align="center"
          prop="memberAcount"
          label="昵称">
        </el-table-column>
        <el-table-column
        align="center"
          prop="memberName"
          label="真实姓名">
        </el-table-column>
        <el-table-column
        align="center"
          prop="memberPhone"
          label="电话">
        </el-table-column>
        <el-table-column
        align="center"
          prop="memberAdd"
          label="送货地址">
        </el-table-column>
        <el-table-column
        align="center"
          prop="memberArea"
          label="区域">
        </el-table-column>
        <el-table-column
        align="center"
          prop="memberPoint"
          label="积分">
        </el-table-column>
        <el-table-column
          align="center"
          width="100"
            label="拥有宠物">
            <template slot-scope="scope">
              <el-button type="text" @click="() => {
                  dialogVisible = true
                  seeDetails(scope.row)
                }">详情</el-button>
            </template>
          </el-table-column>
        <el-table-column
          align="center"
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="() => {
              updateBtn(scope.row)
              dialogFormVisibless = true}">编辑</el-button>
            <el-button type="text" @click="deleteData(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="curPage"
      :page-sizes="[5, 20, 30, 40]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "master",
  data() {
    return {
      dialogVisible: false,
      dialogFormVisibless: false,
      dialogFormVisibles:false,
      formLabelWidth: "120px",
      form: {
        memberPhone: "",
        memberAcount: "",
        memberName: "",
        menberCard: "",
        memberImg: "",
        memberAdd: "",
        memberArea: "",
        memberPoint: "",
        havePet:[{
          name:"",
          varieties:"",
          time:"",
          personality:""
        }],
        _id:''
      },
      restaurants: [],
        state4: '',
        timeout:  null
    };
  },
  computed: {
    ...mapState("master", ["curPage", "eachPage", "rows", "maxpage", "total"])
  },
  created(){
    this.asyncGetMaster();
  },
  watch: {
    curPage() {
      this.asyncGetMaster();
    },
    eachPage() {
      this.asyncGetMaster();
    }
  },
  methods: {
    seeDetails(params){
      this.$data.form = params
    },
    addPet(){
      this.$data.form.havePet.push({
          name:"",
          varieties:"",
          time:"",
          personality:""
        })
    },
    handleSizeChange(val) {
      this.setEachPage(val);
    },
    handleCurrentChange(val) {
      this.setCurPage(val);
    },
    deleteData(id) {
      this.$confirm("此操作将永久删除该会员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.asyncDeleteData(id);
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
    updateBtn(params){
      this.$data.form = JSON.parse(JSON.stringify(params))
    },
    updateData(){
      this.asyncUpdateData(this.$data.form)
      this.clearInputValue()
    },
    addData(){
      this.asyncAddData(this.$data.form)
      this.clearInputValue()
    },
    clearInputValue(){
      this.$data.form = JSON.parse(JSON.stringify({
        memberPhone: "",
        memberAcount: "",
        memberName: "",
        menberCard: "",
        memberImg: "",
        memberAdd: "",
        memberArea: "",
        memberPoint: "",
        havePet:[{
          name:"",
          varieties:"",
          time:"",
          personality:""
        }],
        _id:''
      }))
    },
    // getDetails(params){

    // },
    ...mapActions("master", ["asyncGetMaster", "asyncDeleteData","asyncUpdateData","asyncAddData"]),
    ...mapMutations("master", ["setCurPage", "setEachPage","getMaster","filterData"]),
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        if(!queryString){
          this.asyncGetMaster();
          return;
        }
        var results = restaurants.filter(this.createStateFilter(queryString));
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.memberName.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
        };
      },
      handleSelect(item) {
        this.filterData(item)
      }
    },
     async mounted() {
      await this.asyncGetMaster();
      this.restaurants = this.rows
    }
  
};
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.my-modal ul {
  padding: 10px 0;
}
.my-modal ul li {
  list-style: none;
  display: flex;
  justify-content: space-around;
  padding: 5px 0;
}
.my-modal ul li span {
  width: 160px;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
