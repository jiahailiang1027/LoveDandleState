<template>
    <div>
        <div>
          <el-button type="primary" @click="addService" icon="el-icon-plus" >增加</el-button>
        <!-- 搜索框 -->
          <el-input v-model="input" style="width: 550px;" placeholder="请输入内容" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:120px">
              <el-option label="名称" value="serviceName"></el-option>
              <el-option label="价格" value="servicePrice"></el-option>
              <el-option label="服务类别" value="serviceType"></el-option>
              <el-option label="服务员等级" value="serviceLevel"></el-option>
            </el-select>
            <el-button @click = 'searchBtn' slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>

      <!-- 添加弹窗 -->
      <el-dialog title="添加服务" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="商家名称" :label-width="formLabelWidth">
              <el-select v-model="form.vendorName" clearable placeholder="请选择商家">
                <el-option
                  v-for="item in users"
                  :key="item._id"
                  :label="item.userName"
                  :value="item._id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="服务名称" :label-width="formLabelWidth">
              <el-input v-model="form.serviceName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="服务类别" :label-width="formLabelWidth">
              <el-input v-model="form.serviceType" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="排期" :label-width="formLabelWidth">
              <el-input v-model="form.serviceSchedule" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="适用规格" :label-width="formLabelWidth">
              <el-input v-model="form.serviceCanFor" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="耗时" :label-width="formLabelWidth">
              <el-input v-model="form.serviceTime" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="服务规格" :label-width="formLabelWidth">
              <el-input v-model="form.serviceDetial" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="服务员等级" :label-width="formLabelWidth">
              <el-input v-model="form.serviceLevel" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="价格" :label-width="formLabelWidth">
              <el-input v-model="form.servicePrice" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="serviceSumit">确 定</el-button>
          </div>
      </el-dialog>

      <!-- 列表 -->
        <el-table
            :data="rows"
            style="width: 100%">
            <el-table-column
            fixed
            align="center"
             width="160"
            prop="serviceName"
            label="服务名称">
            </el-table-column>
            <el-table-column
            align="center"
             width="160"
            prop="serviceType"
            label="服务类型">
            </el-table-column>
            <el-table-column
            align="center"
             width="160"
            prop="serviceSchedule"
            label="排期">
            </el-table-column>
            <el-table-column
            align="center"
             width="160"
            prop="serviceDetial"
            label="服务规格">
            </el-table-column>
            <el-table-column
            align="center"
             width="160"
            prop="serviceCanFor"
            label="适用规格">
            </el-table-column>
            <el-table-column
            align="center"
             width="160"
            prop="serviceTime"
            label="耗时">
            </el-table-column>
            <el-table-column
            align="center"
             width="160"
            prop="serviceLevel"
            label="服务员等级">
            </el-table-column>
            <el-table-column
            align="center"
             width="160"
            prop="servicePrice"
            label="价格">
            </el-table-column>
            <el-table-column width="160" align="center" label="操作" fixed="right" >
              <template slot-scope="scope">
                <el-button size="mini" @click="serivceUpdata(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
        </el-table>

        <el-pagination
        @size-change="setEachPage"
        @current-change="setCurPage"
        :current-page="curpage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>
    </div>
</template>

 <script>
import { mapActions, mapState, mapMutations} from "vuex";
export default {
  name: "service",
  mounted() {
    this.usersId = this.getStorage("users")
    this.asyncGetServiceByPage({vendorName:this.usersId._id,use:this.usersId.use});
  },
  computed: {
    ...mapState("service", ["curpage", "eachpage", "maxpage", "total", "rows","users"]),
  },
  watch: {
    curpage() {
      this.asyncGetServiceByPage({vendorName:this.usersId._id,use:this.usersId.use});
    },
    eachpage() {
      this.asyncGetServiceByPage({vendorName:this.usersId._id,use:this.usersId.use});
    }
  },
  methods: {
     getStorage(key) {
      if (!localStorage[key]) {
        return [];
      }
      return JSON.parse(localStorage[key]);
    },
    ...mapMutations("service", ["setCurPage", "setEachPage"]),
    ...mapActions("service", ["asyncGetServiceByPage","asyncAddService","asyncUpdataService","asyncHandleDelete","asyncVendorName"]),
     previousPage() {
      if (this.curpage > 1) {
        this.asyncGetServiceByPage({vendorName:this.usersId._id,use:this.usersId.use,curpage: this.curpage - 1 });
      }
    },
    nextPage() {
      if (this.curpage < this.maxpage) {
         this.asyncGetServiceByPage({vendorName:this.usersId._id,use:this.usersId.use,curpage: this.curpage + 1 });
      }
    },

    //删除方法
     handleDelete(index, row) {
        this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.asyncHandleDelete(row._id),
           this.asyncGetServiceByPage({vendorName:this.usersId._id,use:this.usersId.use }),
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
    //查询
    searchBtn(){
       this.asyncGetServiceByPage({vendorName:this.usersId._id,use:this.usersId.use,type:this.select,text:this.input  });
         this.input = ""
		    }, 

    //添加服务按钮
    addService(){
      this.form.serviceName = "",
      this.form.serviceType = "",
      this.form.serviceSchedule = "",
      this.form.serviceCanFor = "",
      this.form.serviceTime = "",
      this.form.serviceDetial = "",
      this.form.serviceLevel = "",
      this.form.servicePrice = "",
      this.asyncVendorName(),
      this.dialogFormVisible = true,
      this.type = "add"
    },
    //添加服务 确认按钮
    serviceSumit(){
      if(this.type === "add"){
        this.asyncAddService(this.form)
        this.dialogFormVisible = false
         this.asyncGetServiceByPage({vendorName:this.usersId._id,use:this.usersId.use});
      }
      if(this.type === "updata"){
        this.asyncUpdataService(this.form)
        this.dialogFormVisible = false
        this.asyncGetServiceByPage({vendorName:this.usersId._id,use:this.usersId.use});
      }
    },
    //编辑按钮
    serivceUpdata(params){
      this.dialogFormVisible = true,
      this.type = "updata",
      this.asyncVendorName(),
      this.form.serviceName = params.serviceName,
      this.form.serviceType = params.serviceType,
      this.form.serviceSchedule = params.serviceSchedule,
      this.form.serviceCanFor = params.serviceCanFor,
      this.form.serviceTime = params.serviceTime,
      this.form.serviceDetial = params.serviceDetial,
      this.form.serviceLevel = params.serviceLevel,
      this.form.servicePrice = params.servicePrice,
      this.form.vendorName = params.vendorName,
      this.form.id = params._id
    }
  },
    data() {
      return {
        dialogTableVisible: false,
        dialogFormVisible: false,
        usersId:"",
        use:"",
        form: {
          serviceName: "",
          serviceType: "",
          serviceSchedule: "",
          serviceCanFor: "",
          serviceTime: "",
          serviceDetial:"",
          serviceLevel: "",
          servicePrice: "",
          vendorName:"",
        },
        
          select: "",
          input:"",
        formLabelWidth: "100px"
      };
    }
};
</script>

<style scoped>

</style>
